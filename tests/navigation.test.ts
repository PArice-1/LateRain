import { describe, expect, it } from 'vitest';
import { isNavigationItemActive } from '../src/lib/navigation';

describe('isNavigationItemActive', () => {
  it('matches a section list page with or without a trailing slash', () => {
    expect(isNavigationItemActive('/projects', '/projects')).toBe(true);
    expect(isNavigationItemActive('/projects/', '/projects')).toBe(true);
  });

  it('keeps a section active on its detail pages', () => {
    expect(isNavigationItemActive('/projects/mini-agent/', '/projects')).toBe(true);
    expect(isNavigationItemActive('/posts/my-article', '/posts')).toBe(true);
  });

  it('only marks the home item active on the home page', () => {
    expect(isNavigationItemActive('/', '/')).toBe(true);
    expect(isNavigationItemActive('/projects', '/')).toBe(false);
  });

  it('removes a GitHub Pages base path before matching', () => {
    expect(isNavigationItemActive('/personnal-blog/projects/', '/projects', '/personnal-blog')).toBe(true);
    expect(isNavigationItemActive('/personnal-blog/', '/', '/personnal-blog')).toBe(true);
  });
});
