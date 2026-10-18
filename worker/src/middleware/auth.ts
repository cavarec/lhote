import { ApiError } from '../utils/errors';
import { isUuidV4 } from '../utils/validate';

export const PLAYER_HEADER = 'X-Player-Id';

/** `X-Player-Id` absent : 400 ; présent mais pas un UUID v4 : 401 (§10.2). */
export function requirePlayerId(request: Request): string {
  const value = request.headers.get(PLAYER_HEADER);
  if (value === null || value === '') {
    throw new ApiError(400, 'missing_player_id', `En-tête ${PLAYER_HEADER} manquant.`);
  }
  if (!isUuidV4(value)) {
    throw new ApiError(
      401,
      'invalid_player_id',
      `${PLAYER_HEADER} doit être un UUID v4.`,
    );
  }
  return value.toLowerCase();
}
