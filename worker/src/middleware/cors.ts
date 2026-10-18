/**
 * En production le front et l'API sont sur la même origine (proxy Pages, D2) : aucun en-tête
 * CORS n'est émis. Les origines ci-dessous ne servent qu'au développement local.
 */
export const DEV_ORIGINS: readonly string[] = [
  'http://localhost:5173',
  'http://localhost:8788',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:8788',
];

export function corsHeaders(
  request: Request,
  allowedOrigins: readonly string[],
): Record<string, string> {
  const origin = request.headers.get('Origin');
  if (origin === null || !allowedOrigins.includes(origin)) return {};
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Player-Id',
    'Access-Control-Max-Age': '600',
    Vary: 'Origin',
  };
}
