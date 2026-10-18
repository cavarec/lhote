export type EngineErrorCode =
  | 'empty_catalog'
  | 'insufficient_characters'
  | 'unknown_fracture'
  | 'invalid_mutations'
  | 'duplicate_id'
  | 'artifact_in_transit'
  | 'leap_mismatch'
  | 'leap_in_progress';

/** Erreur métier du moteur. Le Worker la traduit en réponse HTTP (409, 422...) via `code`. */
export class EngineError extends Error {
  readonly code: EngineErrorCode;

  constructor(code: EngineErrorCode, message: string) {
    super(message);
    this.name = 'EngineError';
    this.code = code;
  }
}
