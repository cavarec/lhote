// Point d'entrée du Worker `lhote-api`. Le routage est dans router.ts (testable sans runtime).
import { DEV_ORIGINS } from './middleware/cors';
import type { Env } from './env';
import { handleRequest } from './router';

export { Chronology } from './durable/Chronology';

export default {
  fetch(request, env) {
    return handleRequest(request, {
      getChronology: (playerId) => {
        const stub = env.CHRONOLOGY.get(env.CHRONOLOGY.idFromName(playerId));
        return { handle: (rpc) => stub.handle(rpc) };
      },
      version: env.APP_VERSION ?? 'dev',
      // CORS réservé au développement local ; en production tout est same-origin (D2).
      allowedOrigins:
        env.APP_VERSION === undefined || env.APP_VERSION === 'dev' ? DEV_ORIGINS : [],
    });
  },
} satisfies ExportedHandler<Env>;
