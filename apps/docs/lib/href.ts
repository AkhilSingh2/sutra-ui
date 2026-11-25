export function href(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
  const normalized = path === '/' ? '/' : path.endsWith('/') ? path : `${path}/`;
  return `${base}${normalized}`;
}
