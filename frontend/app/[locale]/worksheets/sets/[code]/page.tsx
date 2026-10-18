/**
 * /[locale]/worksheets/sets/[code] — RETIRED 2026-10-18. A Level Set now lives
 * on the hub as a sub-category of its type: `/<loc>/worksheets?set=<code>&type=<t>`
 * (lib/level-sets.ts setHref). This route answers with a permanent redirect so
 * the ~108k deck pages and the landings that link the old URL (and their
 * `#level-<rung>` anchors, which the browser carries across the redirect) land
 * on the same set. An unknown code goes to the hub. The page was noindex.
 */
import type { Metadata } from 'next';
import { permanentRedirect } from 'next/navigation';
import { setHref, setsIndexPath } from '@/lib/level-sets';
import { loadLadder } from '@/lib/level-sets-db';

export const revalidate = 3600;

// The route only redirects; if it ever renders, it is a utility surface (§21.7).
export const metadata: Metadata = { robots: { index: false, follow: true } };

export default async function LevelSetRedirect({ params }: { params: { locale: string; code: string } }) {
  const locale = params.locale || 'en';
  const ladder = await loadLadder(locale, params.code);
  permanentRedirect(ladder ? setHref(locale, ladder.type, ladder.code) : setsIndexPath(locale));
}
