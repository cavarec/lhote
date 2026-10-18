import { corsHeaders } from './middleware/cors';
import { requirePlayerId } from './middleware/auth';
import { health } from './routes/health';
import * as routes from './routes/routes';
import { ApiError, toErrorResponse, type ServiceResponse } from './utils/errors';

export interface RouterDeps {
  /** Renvoie le Durable Object du joueur. */
  getChronology(playerId: string): routes.ChronologyRpc;
  version: string;
  allowedOrigins: readonly string[];
}

type Handler = (context: routes.RouteContext) => Promise<ServiceResponse>;

interface Route {
  handlers: Partial<Record<string, Handler>>;
}

const ROUTES: Readonly<Record<string, Route>> = {
  '/api/leap': { handlers: { POST: routes.leap } },
  '/api/resolve': { handlers: { POST: routes.resolve } },
  '/api/state': { handlers: { GET: routes.state, DELETE: routes.deleteState } },
  '/api/export': { handlers: { GET: routes.exportData } },
};

function toResponse(
  result: ServiceResponse,
  extraHeaders: Record<string, string>,
): Response {
  const headers = new Headers({
    'Cache-Control': 'no-store',
    ...extraHeaders,
    ...result.headers,
  });
  return Response.json(result.body, { status: result.status, headers });
}

export async function handleRequest(
  request: Request,
  deps: RouterDeps,
): Promise<Response> {
  const cors = corsHeaders(request, deps.allowedOrigins);
  try {
    const { pathname } = new URL(request.url);
    const method = request.method.toUpperCase();

    if (method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: cors });
    }

    if (pathname === '/api/health') {
      if (method !== 'GET') {
        throw new ApiError(405, 'method_not_allowed', 'Méthode non autorisée.', {
          headers: { Allow: 'GET, OPTIONS' },
        });
      }
      return toResponse(health(deps.version), cors);
    }

    const route = ROUTES[pathname];
    if (!route) {
      throw new ApiError(404, 'not_found', 'Route inconnue.');
    }
    const handler = route.handlers[method];
    if (!handler) {
      const allow = [...Object.keys(route.handlers), 'OPTIONS'].join(', ');
      throw new ApiError(405, 'method_not_allowed', 'Méthode non autorisée.', {
        headers: { Allow: allow },
      });
    }

    const playerId = requirePlayerId(request);
    let chronology: routes.ChronologyRpc;
    try {
      chronology = deps.getChronology(playerId);
    } catch {
      throw new ApiError(503, 'unavailable', 'Service momentanément indisponible.');
    }
    const result = await guardUnavailable(() =>
      handler({ request, playerId, chronology }),
    );
    return toResponse(result, cors);
  } catch (error) {
    return toResponse(toErrorResponse(error), cors);
  }
}

/**
 * Les erreurs métier reviennent sous forme de réponse (pas d'exception) : si le DO lève une
 * exception, c'est qu'il est injoignable. Les erreurs de validation du routeur restent telles quelles.
 */
async function guardUnavailable(
  call: () => Promise<ServiceResponse>,
): Promise<ServiceResponse> {
  try {
    return await call();
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(503, 'unavailable', 'Service momentanément indisponible.', {
      headers: { 'Retry-After': '1' },
    });
  }
}
