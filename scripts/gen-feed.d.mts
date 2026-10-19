export interface FeedEntry {
  version: string;
  date: string;
  body: string;
}
export function parseChangelog(text: string): FeedEntry[];
export function buildFeed(entries: FeedEntry[]): string;
