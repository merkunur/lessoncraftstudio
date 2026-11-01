/**
 * The worksheet makers' link store — the website side of what scripts/makers/local-store.js stands in for locally
 * (ARCHITECTURE §8; INTERACTIVE-AND-SHARING §C; task 2 wrote the contract, task 3 backs it, 2026-11-01).
 *
 * The student play route (frontend/app/s/[id]/route.ts) and the deck-preset route
 * (frontend/app/api/makers/preset/[deckId]/route.ts) read through here:
 *
 *   getLink(linkId)
 *     MakerShareLink by linkId (12 chars, the generateHostedLinkId alphabet) with its recipe and the recipe's teacher
 *     (isAdmin + subscription), through store.ts linkRecord over the Prisma db. Null when the link is missing,
 *     revokedAt is set, the recipe is soft-deleted, or the recipe's maker is not released on this server.
 *     `meter` = !isSubscriptionUsable(teacher), computed at READ time (operator ruling 2026-11-01 D.4-4: a subscribing
 *     teacher's student links skip the per-device play meter; a lapsed teacher's links become metered, a renewed
 *     one's skip it again). Cache: the route sets `public, s-maxage=300` — a revoke propagates within 5 minutes.
 *   presetForDeck(deckId)
 *     the published Deck by id, its manifest.json from DECKS_DIR/<language>/<slug>/manifest.json (the slug symlink →
 *     the current version folder, CLAUDE.md §15.7), then presetFromManifest(manifest, makerOf) from
 *     scripts/makers/play/preset.js — makerOf over the RELEASED makers (released.ts), so a deck opens a preset only in
 *     a maker this server serves. Null for a deck that is not a worksheet-gen printable (no settings.worksheet_type)
 *     or whose template no released maker offers. Cache: the route sets `public, s-maxage=3600`.
 */
import fs from 'fs';
import path from 'path';
import { prisma } from '@/lib/prisma';
import { prismaMakerDb } from './db';
import { linkRecord } from './store';
import { isReleased, makerOf } from './released';
import * as preset from '../../../scripts/makers/play/preset.js';

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

export const DECKS_DIR = process.env.DECKS_DIR || '/var/www/lcs-media/decks';

/** A student / colleague link by its id — null when unknown, taken back, deleted, or its maker is not released here. */
export async function getLink(linkId: string): Promise<MakerLinkRecord | null> {
  const r = await linkRecord(prismaMakerDb, linkId);
  if (!r || !isReleased(r.maker)) return null;
  return { linkId: r.linkId, kind: r.kind, recipe: r.recipe as unknown as MakerRecipeJson, meter: r.meter, title: r.title, maker: r.maker, lang: r.lang };
}

/** A published deck's maker preset ("Make your own"). */
export async function presetForDeck(deckId: string): Promise<MakerPreset | null> {
  if (!/^[A-Za-z0-9_-]{1,80}$/.test(deckId)) return null;
  const deck = await prisma.deck.findFirst({ where: { id: deckId, status: 'published' }, select: { language: true, slug: true } });
  if (!deck || !/^[a-z]{2}$/.test(deck.language) || !/^[a-z0-9-]+$/.test(deck.slug)) return null;
  const file = path.join(DECKS_DIR, deck.language, deck.slug, 'manifest.json');
  let manifest: unknown;
  try { manifest = JSON.parse(fs.readFileSync(file, 'utf8')); } catch { return null; }
  return preset.presetFromManifest(manifest, makerOf) as MakerPreset | null;
}

/** the link-id shape every route validates before touching the store */
export const LINK_ID_RE = /^[a-z0-9]{6,20}$/i;
