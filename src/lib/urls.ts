/** Creates a site-internal URL that works both locally and on GitHub Pages. */
export function joinBasePath(base: string, path = ''): string {
  const normalizedBase = base === '/' ? '' : `/${base.replace(/^\/+|\/+$/g, '')}`;
  const normalizedPath = path.replace(/^\/+/, '');

  return normalizedPath ? `${normalizedBase}/${normalizedPath}` : (normalizedBase || '/');
}

export function withBase(path = ''): string {
  return joinBasePath(import.meta.env.BASE_URL, path);
}
