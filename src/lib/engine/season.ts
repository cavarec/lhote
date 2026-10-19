import type { Premise, Season } from '../../../content/premises/types';

const pad = (n: number): string => String(n).padStart(2, '0');

/** La date `now` (ms, UTC) tombe-t-elle dans la fenêtre de la saison ? Bornes comprises. */
export function inSeason(season: Season, now: number): boolean {
  const d = new Date(now);
  const day = `${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}`;
  return season.from <= season.to
    ? day >= season.from && day <= season.to
    : day >= season.from || day <= season.to;
}

/** Les prémisses que la date autorise : celles sans saison, et celles dont la saison est ouverte. */
export function premisesAt(premises: readonly Premise[], now: number): Premise[] {
  return premises.filter((p) => !p.season || inSeason(p.season, now));
}

/** La fête en cours, s'il y en a une (la première prémisse de saison ouverte). */
export function currentSeason(premises: readonly Premise[], now: number): Season | null {
  return premises.find((p) => p.season && inSeason(p.season, now))?.season ?? null;
}
