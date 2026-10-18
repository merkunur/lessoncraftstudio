/**
 * /[locale]/worksheets/sets — RETIRED 2026-10-18 (operator: "a separate level
 * sets page is unnecessary"). Level Sets are now sub-categories of their
 * worksheet type on the hub, so the old index answers with a permanent
 * redirect to the hub. The route stays because the deck-page strips and the
 * landings link it (scripts/lib/deck-ladder.js); it was noindex, so no ranking
 * is lost.
 */
import { permanentRedirect } from 'next/navigation';
import { setsIndexPath } from '@/lib/level-sets';

export default function LevelSetsIndexRedirect({ params }: { params: { locale: string } }) {
  permanentRedirect(setsIndexPath(params.locale || 'en'));
}
