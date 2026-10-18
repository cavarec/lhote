import type { ServiceRequest } from '../durable/service';
import { ApiError, type ServiceResponse } from '../utils/errors';
import { parseResolveBody, readJsonBody } from '../utils/validate';

/** Ce que le routeur sait appeler : le Durable Object d'un joueur (ou un double en test). */
export interface ChronologyRpc {
  handle(request: ServiceRequest): Promise<ServiceResponse>;
}

export interface RouteContext {
  request: Request;
  playerId: string;
  chronology: ChronologyRpc;
}

// Les routes se contentent de valider l'entrée puis de déléguer au DO, qui détient l'état.

/** POST /api/leap */
export function leap({ playerId, chronology }: RouteContext): Promise<ServiceResponse> {
  return chronology.handle({ op: 'leap', playerId });
}

/** POST /api/resolve */
export async function resolve({
  request,
  playerId,
  chronology,
}: RouteContext): Promise<ServiceResponse> {
  const parsed = parseResolveBody(await readJsonBody(request));
  if (!parsed.ok) {
    throw new ApiError(422, 'invalid_request', 'Requête invalide.', {
      details: parsed.issues,
    });
  }
  return chronology.handle({ op: 'resolve', playerId, body: parsed.value });
}

/** GET /api/state */
export function state({ playerId, chronology }: RouteContext): Promise<ServiceResponse> {
  return chronology.handle({ op: 'state', playerId });
}

/** GET /api/export */
export function exportData({
  playerId,
  chronology,
}: RouteContext): Promise<ServiceResponse> {
  return chronology.handle({ op: 'export', playerId });
}

/** DELETE /api/state */
export function deleteState({
  playerId,
  chronology,
}: RouteContext): Promise<ServiceResponse> {
  return chronology.handle({ op: 'delete', playerId });
}
