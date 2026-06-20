/* maker-samples.ts — server helper for the "See what you can make" section on the
 * worksheet-generator (maker) landing pages (/[locale]/tools/<slug>).
 *
 * For a maker it returns, in the page's language, one playable sample deck per REAL
 * exercise MODE the generator produces (so a teacher sees what each mode looks like) +
 * — for the crossword/wordsearch/matching makers — a few cross-language ("learn a
 * language") samples.
 *
 * Substrate-honesty:
 *  - the mode set is derived from the published catalog (groupBy exerciseMode), never a
 *    hardcoded list — only modes that really exist are shown.
 *  - per-mode EN fallback when the page locale has no deck for a mode (the chip then shows
 *    the sample's real language); a mode is dropped only if no locale has it.
 *  - PDF-only makers (coloring/writing/draw-and-color/drawing-lines) have no interactive
 *    deck → kind:'none' → the section renders nothing.
 */
import { prisma } from '@/lib/prisma';
import { deckAssets } from '@/lib/seo/landing-content';
import { wwwImg } from '@/lib/img-host';
import { fetchCrossLanguageTargets, fetchCrossLanguageDecks } from '@/lib/cross-language-decks';
import { targetLangName, targetLangSlug } from '@/lib/target-language';
import { localePath } from '@/lib/seo/url';
import type { MakerKey } from '@/lib/seo/maker-content';

// The 3 makers that also surface cross-language samples. SoT for the trio is
// app/[locale]/learn/_shared.tsx CROSS_LANG_TYPES — kept in sync here (a lib must not
// import a page module). If the cross-language exercise set ever changes, update both.
const CROSS_LANG_SAMPLE_TYPES = new Set(['crossword', 'wordsearch', 'matching']);

// maker key → the exerciseType value(s) its decks carry. 1:1 except picture-path, whose
// EN decks are emitted under the locale-conditional `picture-trail` type (§15.10).
const EXERCISE_TYPES_FOR_MAKER: Partial<Record<string, string[]>> = {
  'picture-path': ['picture-path', 'picture-trail'],
};
function exerciseTypesFor(makerKey: string): string[] {
  return EXERCISE_TYPES_FOR_MAKER[makerKey] ?? [makerKey];
}

// The mode key used for a null exerciseMode in the content `modes`/`modeNames` maps.
export const DEFAULT_MODE_KEY = 'default';
const NAMED_MODE_MIN_DECKS = 5;        // a named mode below this (catalog-wide) is a straggler
const NULL_INCLUDE_RATIO = 0.25;       // include the null mode only if it's a genuine co-equal variant
const SINGLE_MODE_SAMPLE_COUNT = 3;    // theme-varied samples for a single-mode maker

export type MakerSampleKind = 'interactive' | 'pdf' | 'none';

export interface MakerSample {
  /** the exerciseMode string, or DEFAULT_MODE_KEY for the null mode, or null for single-mode/theme cards */
  modeKey: string | null;
  deckSlug: string;
  deckLocale: string;        // page locale, or 'en' on fallback — drives the honest locale chip
  title: string;            // localized deck title (theme/pdf cards show this instead of a mode name)
  thumbnailUrl: string;
  deckUrl: string;          // playable deck.html (interactive)
  pdfUrl?: string;          // present for the pdf variant only
}

export interface MakerCrossLangSample {
  targetIso: string;
  targetName: string;        // targetLangName(iso, locale)
  learnHref: string;         // /<locale>/learn/<targetSlug>/
  sample: MakerSample;
}

export interface MakerSamplesResult {
  kind: MakerSampleKind;
  multiMode: boolean;        // true → cards are per-mode; false → theme-varied cards of one mode
  samples: MakerSample[];
  crossLanguage: MakerCrossLangSample[];
}

interface DeckRow {
  slug: string;
  language: string;
  title: unknown;
  exerciseMode: string | null;
  subjectTags: string[];
}

const MONO = { status: 'published', contentLanguage: null } as const;

function localizedTitle(title: unknown, locale: string, slug: string): string {
  if (title && typeof title === 'object') {
    const t = title as Record<string, string>;
    return t[locale] ?? t.en ?? slug;
  }
  return typeof title === 'string' ? title : slug;
}

function toSample(row: DeckRow, modeKey: string | null, pageLocale: string): MakerSample {
  const a = deckAssets(row.language, row.slug);
  return {
    modeKey,
    deckSlug: row.slug,
    deckLocale: row.language,
    title: localizedTitle(row.title, pageLocale, row.slug),
    thumbnailUrl: wwwImg(a.thumbnail),
    deckUrl: a.deckHtml,
  };
}

const ROW_SELECT = { slug: true, language: true, title: true, exerciseMode: true, subjectTags: true } as const;

/**
 * Resolve the per-mode samples for a maker in a locale.
 * Returns kind:'none' when the maker has no interactive decks at all (PDF-only makers).
 */
export async function fetchMakerSamples(makerKey: MakerKey, locale: string): Promise<MakerSamplesResult> {
  const types = exerciseTypesFor(makerKey);
  const typeWhere = types.length === 1 ? { exerciseType: types[0] } : { exerciseType: { in: types } };

  // 1) Catalog-wide mode universe for this maker (all locales) → decides which modes are real.
  const grouped = await prisma.deck.groupBy({
    by: ['exerciseMode'],
    where: { ...typeWhere, ...MONO },
    _count: { _all: true },
  });
  if (grouped.length === 0) {
    return { kind: 'none', multiMode: false, samples: [], crossLanguage: [] };
  }

  const namedCounts = grouped.filter((g) => g.exerciseMode !== null).map((g) => ({ mode: g.exerciseMode as string, n: g._count._all }));
  const nullCount = grouped.find((g) => g.exerciseMode === null)?._count._all ?? 0;
  const namedReal = namedCounts.filter((m) => m.n >= NAMED_MODE_MIN_DECKS).sort((a, b) => b.n - a.n);
  const maxNamed = namedReal.length ? namedReal[0].n : 0;
  const includeNull = namedReal.length === 0 ? nullCount > 0 : nullCount >= NULL_INCLUDE_RATIO * maxNamed;

  const crossLanguage = await fetchCrossLanguage(makerKey, locale);

  // SINGLE-MODE maker (only a null mode, or no named modes survive) → theme-varied samples.
  if (namedReal.length === 0) {
    const samples = await fetchThemeVariedSamples(typeWhere, locale);
    return { kind: 'interactive', multiMode: false, samples, crossLanguage };
  }

  // MULTI-MODE maker → one representative per mode (+ the null mode as DEFAULT when co-equal).
  const wantedModes: Array<string | null> = namedReal.map((m) => m.mode);
  if (includeNull) wantedModes.push(null);

  // Bucket recent locale decks by mode in one query; EN-fallback fills the rest.
  const localeRows = (await prisma.deck.findMany({
    where: { ...typeWhere, ...MONO, language: locale },
    select: ROW_SELECT,
    orderBy: [{ publishedAt: 'desc' }, { id: 'asc' }],
    take: 200,
  })) as DeckRow[];
  const localeByMode = bucketByMode(localeRows);

  const missing = wantedModes.filter((m) => !localeByMode.has(m === null ? DEFAULT_MODE_KEY : m));
  let enByMode = new Map<string, DeckRow>();
  if (missing.length && locale !== 'en') {
    const enRows = (await prisma.deck.findMany({
      where: { ...typeWhere, ...MONO, language: 'en' },
      select: ROW_SELECT,
      orderBy: [{ publishedAt: 'desc' }, { id: 'asc' }],
      take: 200,
    })) as DeckRow[];
    enByMode = bucketByMode(enRows);
  }

  const samples: MakerSample[] = [];
  for (const m of wantedModes) {
    const key = m === null ? DEFAULT_MODE_KEY : m;
    const row = localeByMode.get(key) ?? enByMode.get(key);
    if (row) samples.push(toSample(row, key, locale));
  }
  return { kind: 'interactive', multiMode: true, samples, crossLanguage };
}

function bucketByMode(rows: DeckRow[]): Map<string, DeckRow> {
  const m = new Map<string, DeckRow>();
  for (const r of rows) {
    const key = r.exerciseMode === null ? DEFAULT_MODE_KEY : r.exerciseMode;
    if (!m.has(key)) m.set(key, r);
  }
  return m;
}

/** Single-mode makers: pick SINGLE_MODE_SAMPLE_COUNT decks with distinct themes for visual variety. */
async function fetchThemeVariedSamples(typeWhere: Record<string, unknown>, locale: string): Promise<MakerSample[]> {
  const pick = (rows: DeckRow[]): MakerSample[] => {
    const out: MakerSample[] = [];
    const seenTheme = new Set<string>();
    for (const r of rows) {
      const theme = r.subjectTags?.[0] ?? '';
      if (seenTheme.has(theme)) continue;
      seenTheme.add(theme);
      out.push(toSample(r, null, locale));
      if (out.length >= SINGLE_MODE_SAMPLE_COUNT) break;
    }
    return out;
  };
  const localeRows = (await prisma.deck.findMany({
    where: { ...typeWhere, ...MONO, language: locale },
    select: ROW_SELECT,
    orderBy: [{ publishedAt: 'desc' }, { id: 'asc' }],
    take: 60,
  })) as DeckRow[];
  let out = pick(localeRows);
  if (out.length < SINGLE_MODE_SAMPLE_COUNT && locale !== 'en') {
    const enRows = (await prisma.deck.findMany({
      where: { ...typeWhere, ...MONO, language: 'en' },
      select: ROW_SELECT,
      orderBy: [{ publishedAt: 'desc' }, { id: 'asc' }],
      take: 60,
    })) as DeckRow[];
    const have = new Set(out.map((s) => s.deckSlug));
    for (const s of pick(enRows)) {
      if (out.length >= SINGLE_MODE_SAMPLE_COUNT) break;
      if (!have.has(s.deckSlug)) out.push(s);
    }
  }
  return out;
}

/** Cross-language samples for the crossword/wordsearch/matching makers (top 3 target languages). */
async function fetchCrossLanguage(makerKey: string, locale: string): Promise<MakerCrossLangSample[]> {
  if (!CROSS_LANG_SAMPLE_TYPES.has(makerKey)) return [];
  let targets;
  try {
    targets = await fetchCrossLanguageTargets(locale);
  } catch {
    return [];
  }
  const out: MakerCrossLangSample[] = [];
  for (const tg of targets.slice(0, 3)) {
    try {
      const { decks } = await fetchCrossLanguageDecks(locale, tg.iso, { type: makerKey, pageSize: 1 });
      const d = decks[0] as unknown as DeckRow | undefined;
      if (!d) continue;
      out.push({
        targetIso: tg.iso,
        targetName: targetLangName(tg.iso, locale),
        learnHref: localePath(locale, 'learn', targetLangSlug(tg.iso, locale)),
        sample: toSample(d, null, locale),
      });
    } catch {
      /* skip this target */
    }
  }
  return out;
}
