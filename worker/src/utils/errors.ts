import { EngineError, type EngineErrorCode } from '../../../src/lib/engine/errors';
import type { ApiErrorBody } from '../../../src/lib/api/types';

/** Réponse interne, sérialisable : c'est ce que le Durable Object renvoie au routeur. */
export interface ServiceResponse {
  status: number;
  body: unknown;
  headers?: Record<string, string>;
}

/** Erreur HTTP typée (§10.2). Format de corps : `{ error: { code, message, details? } }`. */
export class ApiError extends Error {
  readonly status: number;
  readonly code: string;
  readonly details: unknown;
  readonly headers: Record<string, string> | undefined;

  constructor(
    status: number,
    code: string,
    message: string,
    options: { details?: unknown; headers?: Record<string, string> } = {},
  ) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
    this.details = options.details;
    this.headers = options.headers;
  }
}

export function errorBody(error: ApiError): ApiErrorBody {
  return {
    error: {
      code: error.code,
      message: error.message,
      ...(error.details !== undefined ? { details: error.details } : {}),
    },
  };
}

export function errorResponse(error: ApiError): ServiceResponse {
  return {
    status: error.status,
    body: errorBody(error),
    ...(error.headers ? { headers: error.headers } : {}),
  };
}

const ENGINE_STATUS: Readonly<Record<EngineErrorCode, number>> = {
  leap_mismatch: 409,
  leap_in_progress: 409,
  duplicate_id: 409,
  artifact_in_transit: 409,
  invalid_mutations: 422,
  // Contenu inutilisable : c'est un défaut du déploiement, pas une faute du client.
  empty_catalog: 500,
  insufficient_characters: 500,
  unknown_fracture: 500,
};

export function fromEngineError(error: EngineError): ApiError {
  const status = ENGINE_STATUS[error.code];
  const code = status === 500 ? 'content_error' : error.code;
  const message = status === 500 ? 'Le contenu du jeu est incomplet.' : error.message;
  return new ApiError(status, code, message);
}

/** Convertit n'importe quelle exception en réponse HTTP, sans jamais exposer de détail interne. */
export function toErrorResponse(error: unknown): ServiceResponse {
  if (error instanceof ApiError) return errorResponse(error);
  if (error instanceof EngineError) return errorResponse(fromEngineError(error));
  return errorResponse(new ApiError(500, 'internal_error', 'Erreur interne.'));
}
