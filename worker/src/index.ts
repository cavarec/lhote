// Squelette de l'étape 1. Le routeur complet (auth, rate limit, routes) arrive à l'étape 3.
export { Chronology } from './durable/Chronology';

interface Env {
  CHRONOLOGY: DurableObjectNamespace;
  TRACES: KVNamespace;
}

export default {
  async fetch(request) {
    const { pathname } = new URL(request.url);

    if (pathname === '/api/health') {
      return Response.json({ ok: true, version: 'dev' });
    }

    return Response.json(
      { error: { code: 'not_implemented', message: 'Route non implémentée.' } },
      { status: 501 },
    );
  },
} satisfies ExportedHandler<Env>;
