// SHA-256 via SubtleCrypto : disponible à l'identique dans le navigateur et dans les Workers.

const encoder = new TextEncoder();

async function sha256Bytes(input: string): Promise<Uint8Array> {
  const digest = await crypto.subtle.digest('SHA-256', encoder.encode(input));
  return new Uint8Array(digest);
}

/** Empreinte SHA-256 complète, en hexadécimal minuscule (64 caractères). */
export async function sha256Hex(input: string): Promise<string> {
  const bytes = await sha256Bytes(input);
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
}

/** Identifiant anonymisé pour les clés KV `trace:{playerIdHash}:{leapId}` (§5.4) : 16 hex. */
export async function playerIdHash(playerId: string): Promise<string> {
  return (await sha256Hex(playerId)).slice(0, 16);
}

/**
 * Seed d'un saut : les 4 premiers octets (big-endian) de SHA-256(`playerId:leapIndex`).
 * `leapIndex` vaut `history.length` au moment de générer le saut (§5.8).
 */
export async function leapSeed(playerId: string, leapIndex: number): Promise<number> {
  const bytes = await sha256Bytes(`${playerId}:${leapIndex}`);
  return new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength).getUint32(0);
}
