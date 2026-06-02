/**
 * Normalize a catalog asset URL to the canonical `www.` host.
 *
 * Deck `thumbnailUrl` values in the DB are a mix of apex
 * (`https://lessoncraftstudio.com/...`) and www
 * (`https://www.lessoncraftstudio.com/...`) hosts. The apex form 301-redirects
 * to www (see CLAUDE.md §A.10). When such a URL is handed to `next/image`, the
 * image optimizer would otherwise follow that 301 on every cold fetch. Both
 * hosts are whitelisted in `next.config.js images.domains`, so normalizing to
 * www is purely an optimization (one fewer redirect hop), not a correctness fix.
 */
export function wwwImg(url: string | null | undefined): string {
  if (!url) return url || '';
  return url.replace('https://lessoncraftstudio.com/', 'https://www.lessoncraftstudio.com/');
}
