export const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

/** Minuteur annulable : renvoie la fonction qui l'annule. */
export interface Timers {
  set(callback: () => void, ms: number): () => void;
}

export const realTimers: Timers = {
  set(callback, ms) {
    const id = setTimeout(callback, ms);
    return () => clearTimeout(id);
  },
};
