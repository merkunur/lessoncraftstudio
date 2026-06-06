/**
 * SEO landing-page content access — Phase 5 pilot (Math × Kindergarten × EN).
 *
 * Reads the gated, ensemble-reviewed pilot copy (frontend/content/seo-landing/en.json,
 * authored against docs/seo-landing/mechanic-ledger-mathK.md, similarity-gated by
 * scripts/seo-landing/gate.js). EN-only this gate; other locales resolve to null →
 * the route 404s for them (pilot is not a fan-out).
 *
 * Deck-asset URLs are derived deterministically from the coordinate's CANONICAL deck
 * slug (earliest-publishedAt per the 4-tuple, precomputed in the content file) using the
 * nginx deck-asset path convention (§15.7 / §15.14): trailing-slash dir, slug-prefixed PDFs.
 * Landing self-URL uses the no-trailing-slash Next convention (§A.10 / next.config).
 */
import enData from '@/content/seo-landing/en.json';
import { CANONICAL_HOST } from '@/lib/seo/url';

export interface LandingCarouselItem { label: string; href: string }
export interface LandingCoordinate { type: string; mode: string | null; theme: string; level: string }
export interface Landing {
  slug: string;
  variantShape: 'singleton' | 'collapsed';
  coordinate: LandingCoordinate;
  eyebrow: string;
  h1: string;
  strand: string;
  p1: string; p2: string; p3: string;
  canonicalDeckSlug: string;
  collapseSiblings?: string[];
  carousel: LandingCarouselItem[];
}

interface LandingFile { landings: Landing[] }

const FILES: Record<string, LandingFile> = { en: enData as unknown as LandingFile };

export function getLandingLocales(): string[] {
  return Object.keys(FILES);
}

export function getLandingSlugs(locale: string): string[] {
  const f = FILES[locale];
  return f ? f.landings.map((l) => l.slug) : [];
}

export function getLandingBySlug(locale: string, slug: string): Landing | null {
  const f = FILES[locale];
  if (!f) return null;
  return f.landings.find((l) => l.slug === slug) || null;
}

export function getAllLandings(locale: string): Landing[] {
  const f = FILES[locale];
  return f ? f.landings : [];
}

/** Deck-asset URLs (nginx-served; trailing-slash dir; slug-prefixed PDFs). */
export interface DeckAssets { deckDir: string; deckHtml: string; thumbnail: string; pdf: string; answerKey: string }
export function deckAssets(locale: string, deckSlug: string): DeckAssets {
  const dir = `${CANONICAL_HOST}/${locale}/decks/${deckSlug}/`;
  return {
    deckDir: dir,
    deckHtml: `${dir}deck.html`,
    thumbnail: `${dir}thumbnail.png`,
    pdf: `${dir}${deckSlug}-printable.pdf`,
    answerKey: `${dir}${deckSlug}-answer-key.pdf`,
  };
}
