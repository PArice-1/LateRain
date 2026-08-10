export type Theme = 'dark' | 'light';

export function resolveInitialTheme(savedTheme: string | null): Theme {
  return savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : 'dark';
}

export function nextTheme(currentTheme: Theme): Theme {
  return currentTheme === 'dark' ? 'light' : 'dark';
}

export function clampReadingProgress(scrollTop: number, scrollableHeight: number): number {
  if (scrollableHeight <= 0) return 0;
  return Math.min(100, Math.max(0, (scrollTop / scrollableHeight) * 100));
}
