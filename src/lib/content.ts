type DatedEntry = { data: { publishDate: Date } };
type TaggedEntry = { id: string; data: { tags: string[] } };

export function readingMinutes(body: string, wordsPerMinute = 200): number {
  const wordCount = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}

export function sortByDateDesc<T extends DatedEntry>(entries: T[]): T[] {
  return [...entries].sort(
    (left, right) => right.data.publishDate.getTime() - left.data.publishDate.getTime(),
  );
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
