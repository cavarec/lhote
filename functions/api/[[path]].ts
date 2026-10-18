// Proxy same-origin : toute requête /api/* part vers le Worker lhote-api (service binding).
// La CSP reste donc `connect-src 'self'` et le CORS ne sert qu'en dev local.
interface Env {
  API: Fetcher;
}

export const onRequest: PagesFunction<Env> = (context) =>
  context.env.API.fetch(context.request);
