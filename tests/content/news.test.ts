import { describe, expect, it } from 'vitest';
import { news } from '../../content/news';

describe('nouveautés', () => {
  it('sont datées, tutoient et ne sont pas vides', () => {
    expect(news.length).toBeGreaterThan(0);
    for (const item of news) {
      expect(item.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(item.title.length).toBeGreaterThan(0);
      expect(`${item.title} ${item.text}`).not.toMatch(/\bvous\b|\bvotre\b/i);
    }
  });
});
