import { describe, expect, it } from 'vitest';
import { clampReadingProgress, getFilterMotionTiming, nextTheme, resolveInitialTheme } from '../src/lib/ui';

describe('theme helpers', () => {
  it('defaults to dark and restores only valid saved themes', () => {
    expect(resolveInitialTheme(null)).toBe('dark');
    expect(resolveInitialTheme('light')).toBe('light');
    expect(resolveInitialTheme('dark')).toBe('dark');
    expect(resolveInitialTheme('sepia')).toBe('dark');
  });

  it('toggles between dark and light themes', () => {
    expect(nextTheme('dark')).toBe('light');
    expect(nextTheme('light')).toBe('dark');
  });
});

describe('reading progress', () => {
  it('clamps progress to the zero-to-one-hundred range', () => {
    expect(clampReadingProgress(-10, 500)).toBe(0);
    expect(clampReadingProgress(250, 500)).toBe(50);
    expect(clampReadingProgress(800, 500)).toBe(100);
    expect(clampReadingProgress(0, 0)).toBe(0);
  });
});

describe('filter motion', () => {
  it('uses a short exit and a slightly longer entrance for responsive switching', () => {
    expect(getFilterMotionTiming(false)).toEqual({ exit: 110, enter: 220, distance: 6 });
  });

  it('switches immediately when reduced motion is requested', () => {
    expect(getFilterMotionTiming(true)).toEqual({ exit: 0, enter: 0, distance: 0 });
  });
});
