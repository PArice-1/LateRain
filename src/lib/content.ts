type DatedEntry = { data: { publishDate: Date } };
type TaggedEntry = { id: string; data: { tags: string[] } };
type CategorizedEntry = { data: { category: string; publishDate: Date } };

export function readingMinutes(body: string, wordsPerMinute = 200): number {
  const wordCount = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}

export function sortByDateDesc<T extends DatedEntry>(entries: T[]): T[] {
  return [...entries].sort(
    (left, right) => right.data.publishDate.getTime() - left.data.publishDate.getTime(),
  );
}

export function getLatestProjectCategories<T extends CategorizedEntry>(entries: T[], limit = 4): string[] {
  return [...new Set(sortByDateDesc(entries).map((entry) => entry.data.category))].slice(0, limit);
}

export function resolveProjectCategory(requestedCategory: string | null, categories: string[]): string {
  return requestedCategory && categories.includes(requestedCategory) ? requestedCategory : '全部';
}

export function getRelatedPosts<T extends TaggedEntry>(posts: T[], current: T, limit = 2): T[] {
  return [...posts]
    .filter((post) => post.id !== current.id)
    .sort((left, right) => {
      const leftScore = left.data.tags.filter((tag) => current.data.tags.includes(tag)).length;
      const rightScore = right.data.tags.filter((tag) => current.data.tags.includes(tag)).length;
      return rightScore - leftScore;
    })
    .slice(0, limit);
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date).replace(/\//g, '.');
}
