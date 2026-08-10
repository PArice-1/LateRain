function normalizePath(path: string): string {
  const rooted = path.startsWith('/') ? path : `/${path}`;
  const withoutTrailingSlash = rooted.replace(/\/+$/, '');

  return withoutTrailingSlash || '/';
}

function removeBasePath(pathname: string, base: string): string {
  const normalizedPathname = normalizePath(pathname);
  const normalizedBase = normalizePath(base);

  if (normalizedBase === '/') return normalizedPathname;
  if (normalizedPathname === normalizedBase) return '/';
  if (normalizedPathname.startsWith(`${normalizedBase}/`)) {
    return normalizePath(normalizedPathname.slice(normalizedBase.length));
  }

  return normalizedPathname;
}

export function isNavigationItemActive(pathname: string, itemHref: string, base = '/'): boolean {
  const currentPath = removeBasePath(pathname, base);
  const targetPath = normalizePath(itemHref);

  if (targetPath === '/') return currentPath === '/';

  return currentPath === targetPath || currentPath.startsWith(`${targetPath}/`);
}
