import type { HealthResponse } from '../../../src/lib/api/types';
import type { ServiceResponse } from '../utils/errors';

export function health(version: string): ServiceResponse {
  return { status: 200, body: { ok: true, version } satisfies HealthResponse };
}
