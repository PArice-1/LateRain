import { describe, expect, it } from 'vitest';
import {
  getLatestProjectCategories,
  getRelatedPosts,
  readingMinutes,
  resolveProjectCategory,
  sortByDateDesc,
} from '../src/lib/content';

describe('content helpers', () => {
  it('calculates at least one minute of reading time', () => {
    expect(readingMinutes('short note')).toBe(1);
    expect(readingMinutes('word '.repeat(401))).toBe(3);
  });

  it('sorts dated content from newest to oldest', () => {
    const entries = [
      { data: { publishDate: new Date('2025-03-01') } },
      { data: { publishDate: new Date('2025-06-20') } },
      { data: { publishDate: new Date('2025-01-05') } },
    ];

    expect(sortByDateDesc(entries).map((entry) => entry.data.publishDate.toISOString().slice(0, 10))).toEqual([
      '2025-06-20',
      '2025-03-01',
      '2025-01-05',
    ]);
  });

  it('prefers related posts that share a tag and excludes the current post', () => {
    const posts = [
      { id: 'current', data: { tags: ['AI Agent', 'Python'] } },
      { id: 'match', data: { tags: ['AI Agent'] } },
      { id: 'other', data: { tags: ['随笔'] } },
    ];

    expect(getRelatedPosts(posts, posts[0], 2).map((post) => post.id)).toEqual(['match', 'other']);
  });

  it('lists unique project categories by their newest project and limits the result', () => {
    const projects = [
      { data: { category: 'Agent', publishDate: new Date('2025-01-01') } },
      { data: { category: 'Web', publishDate: new Date('2025-06-01') } },
      { data: { category: 'Agent', publishDate: new Date('2025-07-01') } },
      { data: { category: 'Tools', publishDate: new Date('2025-05-01') } },
      { data: { category: 'Embedded', publishDate: new Date('2025-04-01') } },
      { data: { category: 'Other', publishDate: new Date('2025-03-01') } },
    ];

    expect(getLatestProjectCategories(projects)).toEqual(['Agent', 'Web', 'Tools', 'Embedded']);
  });

  it('returns no project categories when there are no projects', () => {
    expect(getLatestProjectCategories([])).toEqual([]);
  });

  it('falls back to all projects when a requested category is unavailable', () => {
    const categories = ['Agent', 'Tools'];

    expect(resolveProjectCategory('Agent', categories)).toBe('Agent');
    expect(resolveProjectCategory('Unknown', categories)).toBe('全部');
    expect(resolveProjectCategory(null, categories)).toBe('全部');
  });
});
