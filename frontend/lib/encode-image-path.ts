/** URL-encode each path segment of a /samples/... image path */
export function encodeImagePath(path: string): string {
  if (!path || !path.startsWith('/samples/')) return path;
  return path
    .split('/')
    .map((seg, i) => (i === 0 ? seg : encodeURIComponent(seg)))
    .join('/');
}
