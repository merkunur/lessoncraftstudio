/**
 * material-status.ts — Status classifier per material slug.
 *
 * Per Phase 1 substrate audit (Phase 2.5b): only 1 of 7 materials has a
 * shipped runtime generator + mass-run output. Others have specs in
 * frontend/config/materials-catalog.json but no generator pipeline yet.
 *
 * Returned status drives the materials-list rendering: SHIPPED materials
 * link to their actual output; SUBSTRATE-GAP materials get visible status
 * label so operator quality-evaluation sees "generator pending" rather
 * than mistaking inert rendering for buggy generator output.
 */

export type MaterialStatus = 'shipped' | 'deferred' | 'substrate-gap';

export interface MaterialStatusEntry {
  status: MaterialStatus;
  shippedAnchor?: string; // section anchor for SHIPPED materials (e.g., '#flashcards')
}

const MATERIAL_STATUS: Record<string, MaterialStatusEntry> = {
  flashcards: { status: 'shipped', shippedAnchor: '#flashcards' },
  'numeral-cards': { status: 'shipped', shippedAnchor: '#numeral-cards' },
  'picture-cards': { status: 'shipped', shippedAnchor: '#picture-cards' },
  'sentence-strips': { status: 'shipped', shippedAnchor: '#sentence-strips' },
  'manipulative-cut-outs': { status: 'shipped', shippedAnchor: '#manipulative-cut-outs' },
  'parent-take-home-letter': { status: 'shipped', shippedAnchor: '#parent-letter' },
  'answer-key': { status: 'shipped', shippedAnchor: '#answer-key' },
  'matching-mat': { status: 'shipped', shippedAnchor: '#matching-mat' },
  'vocabulary-tracing-strips': { status: 'substrate-gap' },
  'math-mat': { status: 'substrate-gap' },
};

export function getMaterialStatus(materialSlug: string): MaterialStatusEntry {
  return MATERIAL_STATUS[materialSlug] ?? { status: 'substrate-gap' };
}
