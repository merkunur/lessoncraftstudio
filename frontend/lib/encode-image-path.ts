/** URL-encode each path segment of a /samples/... or /image-library/... image path.
 *  Idempotent: decodes first to avoid double-encoding (e.g. %20 → %2520). */
export function encodeImagePath(path: string): string {
  if (!path || (!path.startsWith('/samples/') && !path.startsWith('/image-library/'))) return path;
  return path
    .split('/')
    .map((seg, i) => (i === 0 ? seg : encodeURIComponent(decodeURIComponent(seg))))
    .join('/');
}
