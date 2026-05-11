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
  'numeral-cards': { status: 'deferred' },
  'picture-cards': { status: 'shipped', shippedAnchor: '#picture-cards' },
  'sentence-strips': { status: 'substrate-gap' },
  'manipulative-cut-outs': { status: 'substrate-gap' },
  'parent-take-home-letter': { status: 'substrate-gap' },
  'answer-key': { status: 'substrate-gap' },
  'matching-mat': { status: 'substrate-gap' },
  'vocabulary-tracing-strips': { status: 'substrate-gap' },
  'math-mat': { status: 'substrate-gap' },
};

export function getMaterialStatus(materialSlug: string): MaterialStatusEntry {
  return MATERIAL_STATUS[materialSlug] ?? { status: 'substrate-gap' };
}
