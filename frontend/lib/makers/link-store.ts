/**
 * The worksheet makers' link store — the website side of what scripts/makers/local-store.js stands in for locally
 * (ARCHITECTURE §8; INTERACTIVE-AND-SHARING §C; task 2 of the ten, 2026-11-01).
 *
 * This module is the CONTRACT the student play route (frontend/app/s/[id]/route.ts) and the deck-preset route
 * (frontend/app/api/makers/preset/[deckId]/route.ts) read through. It ships UNBACKED: every function answers "not
 * found" until task 3 (release wiring) implements it over the Prisma models of ARCHITECTURE §8.1 — MakerShareLink →
 * MakerRecipe → User.subscription. Nothing here touches Prisma on purpose (README rule 3: a migration is a file,
 * applied to nothing; the models do not exist yet).
 *
 * What task 3 implements, exactly:
 *   getLink(linkId)
 *     SELECT the MakerShareLink by linkId (12 chars, the generateHostedLinkId alphabet) with its recipe and the
 *     recipe's teacher (isAdmin + subscription). Return null when the link is missing, revokedAt is set, the recipe is
 *     soft-deleted, or the recipe's maker folder is unknown. `meter` = !isSubscriptionUsable(teacher) — computed at
 *     READ time, so a lapsed teacher's links become metered and a renewed one's skip the meter again (operator ruling
 *     2026-11-01 D.4-4: a subscribing teacher's student links skip the per-device play meter; free accounts' keep it).
 *     Cache: the route sets `public, s-maxage=300` — a revoke propagates within 5 minutes (CLAUDE.md §15.8).
 *   presetForDeck(deckId)
 *     SELECT the published Deck by id (status 'published'), read its manifest.json from
 *     /var/www/lcs-media/decks/<language>/<slug>/manifest.json and return
 *     presetFromManifest(manifest, makerOf) from scripts/makers/play/preset.js (makerOf = play/makers-index.js);
 *     null for a deck that is not a worksheet-gen printable (no settings.worksheet_type) or whose template no maker owns.
 *     Cache: the route sets `public, s-maxage=3600` (ARCHITECTURE §13 step 3: edge-cached 1 h).
 */

export type MakerLinkKind = 'student' | 'colleague';

/** the recipe as the maker screen saves it (scripts/makers/shell/recipe.js) — opaque here */
export interface MakerRecipeJson {
  v: number;
  maker: string;
  makerVersion: string;
  dataVersion: string;
  lang: string;
  paper: 'letter' | 'a4';
  title: string;
  answerKey: boolean;
  pages: Array<{ template: string; level: number; seed: string; theme: string | null; unit: string | null; [k: string]: unknown }>;
  [k: string]: unknown;
}

export interface MakerLinkRecord {
  linkId: string;
  kind: MakerLinkKind;
  recipe: MakerRecipeJson;
  /** false = the teacher who owns the recipe is a subscriber: the play page skips the per-device play meter */
  meter: boolean;
  title: string;
  maker: string;
  lang: string;
}

export interface MakerPreset {
  maker: string;
  lang: string;
  template: string;
  level: number;
  theme: string | null;
  unit: string | null;
  variant: number;
  deckId: string | null;
  title: string | null;
}

/** A student / colleague link by its id — null when unknown, taken back or deleted. UNBACKED until task 3. */
export async function getLink(_linkId: string): Promise<MakerLinkRecord | null> {
  return null;
}

/** A published deck's maker preset ("Make your own"). UNBACKED until task 3. */
export async function presetForDeck(_deckId: string): Promise<MakerPreset | null> {
  return null;
}

/** the link-id shape every route validates before touching the store */
export const LINK_ID_RE = /^[a-z0-9]{6,20}$/i;
