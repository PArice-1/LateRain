import { describe, expect, it } from 'vitest';
import { joinBasePath } from '../src/lib/urls';

describe('joinBasePath', () => {
  it('keeps project-page links inside a GitHub Pages repository path', () => {
    expect(joinBasePath('/personnal-blog', '/projects')).toBe('/personnal-blog/projects');
  });

  it('returns a rooted link when the site is hosted at the domain root', () => {
    expect(joinBasePath('/', '/posts')).toBe('/posts');
  });
});
