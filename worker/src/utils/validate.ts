import type { ResolveRequest } from '../../../src/lib/api/types';
import { ApiError } from './errors';

const UUID_V4 = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const SAFE_ID = /^[A-Za-z0-9._-]{1,100}$/;

export const MAX_TEXT_LENGTH = 500;
export const MAX_BODY_BYTES = 8 * 1024;
const MAX_CHOICES = 50;
const MAX_BEATS = 20;

export function isUuidV4(value: unknown): value is string {
  return typeof value === 'string' && UUID_V4.test(value);
}

/** Retire le HTML et les caractères de contrôle, puis tronque (§5.6 : 500 caractères max). */
export function sanitizeText(input: string, max: number = MAX_TEXT_LENGTH): string {
  let text = input;
  // Boucle : « <<b>script> » redevient une balise après un premier passage.
  for (let previous = ''; previous !== text;) {
    previous = text;
    text = text.replace(/<[^>]*>/g, '');
  }
  let cleaned = '';
  for (const char of text.replace(/[<>]/g, '')) {
    const code = char.codePointAt(0) ?? 0;
    cleaned += code < 32 || code === 127 ? ' ' : char;
  }
  return cleaned.replace(/\s+/g, ' ').trim().slice(0, max);
}

export interface FieldIssue {
  field: string;
  message: string;
}

export type ParseResult<T> = { ok: true; value: T } | { ok: false; issues: FieldIssue[] };

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/** Validation manuelle et stricte du corps de `POST /api/resolve`. */
export function parseResolveBody(raw: unknown): ParseResult<ResolveRequest> {
  if (!isPlainObject(raw)) {
    return {
      ok: false,
      issues: [{ field: 'body', message: 'Un objet JSON est attendu.' }],
    };
  }
  const issues: FieldIssue[] = [];

  const { leapId, resolutionId, suspicion, choices, visitedBeats } = raw;
  if (!isUuidV4(leapId)) {
    issues.push({ field: 'leapId', message: 'UUID v4 attendu.' });
  }
  if (typeof resolutionId !== 'string' || !SAFE_ID.test(resolutionId)) {
    issues.push({ field: 'resolutionId', message: 'Identifiant invalide.' });
  }
  if (
    suspicion !== undefined &&
    (typeof suspicion !== 'number' ||
      !Number.isInteger(suspicion) ||
      suspicion < 0 ||
      suspicion > 100)
  ) {
    issues.push({ field: 'suspicion', message: 'Entier entre 0 et 100 attendu.' });
  }

  let cleanChoices: Record<string, string> | undefined;
  if (choices !== undefined) {
    if (!isPlainObject(choices) || Object.keys(choices).length > MAX_CHOICES) {
      issues.push({
        field: 'choices',
        message: `Objet de ${MAX_CHOICES} entrées maximum.`,
      });
    } else if (!Object.values(choices).every((v) => typeof v === 'string')) {
      issues.push({ field: 'choices', message: 'Les valeurs doivent être des chaînes.' });
    } else {
      cleanChoices = {};
      for (const [key, value] of Object.entries(choices)) {
        cleanChoices[sanitizeText(key, 100)] = sanitizeText(String(value), 100);
      }
    }
  }

  if (
    visitedBeats !== undefined &&
    (!Array.isArray(visitedBeats) ||
      visitedBeats.length > MAX_BEATS ||
      !visitedBeats.every((n) => Number.isInteger(n) && n >= 0 && n <= MAX_BEATS))
  ) {
    issues.push({
      field: 'visitedBeats',
      message: 'Tableau d’entiers (0 à 20) attendu.',
    });
  }

  if (issues.length > 0) return { ok: false, issues };

  return {
    ok: true,
    value: {
      leapId: leapId as string,
      resolutionId: resolutionId as string,
      ...(suspicion !== undefined ? { suspicion: suspicion as number } : {}),
      ...(cleanChoices ? { choices: cleanChoices } : {}),
      ...(visitedBeats !== undefined ? { visitedBeats: visitedBeats as number[] } : {}),
    },
  };
}

/** Lit un corps JSON borné. 400 si illisible, 413 si trop gros. */
export async function readJsonBody(
  request: Request,
  maxBytes: number = MAX_BODY_BYTES,
): Promise<unknown> {
  const text = await request.text();
  if (new TextEncoder().encode(text).length > maxBytes) {
    throw new ApiError(413, 'payload_too_large', 'Corps de requête trop volumineux.');
  }
  try {
    return JSON.parse(text);
  } catch {
    throw new ApiError(400, 'invalid_json', 'Le corps n’est pas du JSON valide.');
  }
}
