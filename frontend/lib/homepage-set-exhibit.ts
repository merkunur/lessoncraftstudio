/**
 * homepage-set-exhibit.ts — the ONE Level Set the homepage hangs in full
 * (v10.2, 2026-10-15): three real pages of one face ladder — easier, core,
 * harder — beside the set's class sheet. It is the product unit the Level
 * Sets v2 restructure made visible, shown where most visitors first arrive.
 *
 * The set is FIXED (EXHIBIT_CODE) rather than ranked per locale, for two
 * reasons: the class-sheet art is committed per locale under
 * /homepage/<loc>/class-sheet.webp and must belong to the set beside it, and
 * the hero's triptych and the plans room's miniature show the same set, so
 * the page tells one story. g1209 ("Fact Family Houses", grade 1) ships all
 * three levels, a screen version of every page and a class sheet in all
 * eleven locales (measured 2026-10-15 against the exported ladders).
 *
 * Server only: it reads the ladders through level-sets-db. When the locale
 * has no such ladder (or the DB is unreachable) it falls back to the best
 * three-rung ladder the locale has, and finally to the committed EN pages,
 * so the exhibit never renders empty.
 */
import { loadLadders } from '@/lib/level-sets-db';
import { setHref, setsIndexPath, type Ladder, type Rung } from '@/lib/level-sets';
import { featuredLadders, rungWord, type LevelSetsT } from '@/lib/level-sets-view';
import { typePosition, pathwayGradeKey } from '@/lib/level-set-pathways';
import { localizeStrand } from '@/lib/seo/strand-names';
import { getAxisName } from '@/lib/taxonomy';
import { levelChip } from '@/lib/worksheets-catalog';
import { deckAssets } from '@/lib/seo/landing-content';
import { wwwImg } from '@/lib/img-host';

export const EXHIBIT_CODE = 'g1209';

export interface ExhibitPage {
  rung: Rung;
  slug: string;
  /** The deck page (nginx-served; a plain <a>). */
  href: string;
  thumbnailUrl: string;
  /** "Level 1 · Easy", in the page locale. */
  levelLabel: string;
}

export interface SetExhibit {
  code: string;
  title: string;
  typeLabel: string;
  gradeLabel: string;
  /** The strand of the pathway the set sits in, localized; '' when unplaced. */
  strandLabel: string;
  href: string;
  indexHref: string;
  /** The committed class-sheet art, or null when the shown set is not EXHIBIT_CODE. */
  sheetSrc: string | null;
  pages: ExhibitPage[];
}

const RUNG_ORDER: Rung[] = ['easy', 'core', 'hard'];

/* The en taxonomy names grades in lowercase ('grade 1'); a museum label gets an initial capital. */
function cap(s: string): string {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
}

function sheetArt(locale: string): string {
  return locale === 'en' ? '/homepage/class-sheet.webp' : `/homepage/${locale}/class-sheet.webp`;
}

function levelLabel(rung: Rung, n: number, locale: string, t: LevelSetsT): string {
  return `${t('levelN', { n })} · ${rungWord(rung, locale, t)}`;
}

function fromLadder(ladder: Ladder, locale: string, t: LevelSetsT): SetExhibit {
  const pos = typePosition(ladder.type);
  const gradeKey = pathwayGradeKey(ladder, locale);
  return {
    code: ladder.code,
    title: ladder.title,
    typeLabel: getAxisName('exercise-type', ladder.type, locale) || ladder.type,
    gradeLabel: cap(ladder.level ? levelChip(ladder.level, locale) : getAxisName('educational-level', gradeKey, locale) || ''),
    strandLabel: pos ? localizeStrand(pos.strand, locale) : '',
    href: setHref(locale, ladder.type, ladder.code),
    indexHref: setsIndexPath(locale),
    sheetSrc: ladder.code === EXHIBIT_CODE ? sheetArt(locale) : null,
    pages: RUNG_ORDER.map((rung, i) => {
      const page = ladder.pages[rung][0];
      const a = deckAssets(locale, page.slug);
      return {
        rung,
        slug: page.slug,
        href: a.deckDir,
        thumbnailUrl: wwwImg(a.thumbnail),
        levelLabel: levelLabel(rung, i + 1, locale, t),
      };
    }),
  };
}

/* The committed EN fallback — the same set, so the class-sheet art matches.
   Slugs verified 200 on production 2026-10-15. */
const FALLBACK_EN: Array<[Rung, string]> = [
  ['easy', 'fact-families-easy-g1209-7'],
  ['core', 'fact-families-g1209'],
  ['hard', 'fact-families-hard-g1209-12'],
];

export function fallbackExhibit(locale: string, t: LevelSetsT): SetExhibit {
  return {
    code: EXHIBIT_CODE,
    title: 'Fact Family Houses: Four Facts from Three Numbers',
    typeLabel: getAxisName('exercise-type', 'fact-families', locale) || 'Fact families',
    gradeLabel: cap(getAxisName('educational-level', 'grade-1', locale) || 'Grade 1'),
    strandLabel: localizeStrand('Operations & Algebraic Thinking', locale),
    href: setHref('en', 'fact-families', EXHIBIT_CODE),
    indexHref: setsIndexPath(locale),
    sheetSrc: sheetArt(locale),
    pages: FALLBACK_EN.map(([rung, slug], i) => {
      const a = deckAssets('en', slug);
      return { rung, slug, href: a.deckDir, thumbnailUrl: wwwImg(a.thumbnail), levelLabel: levelLabel(rung, i + 1, locale, t) };
    }),
  };
}

/** The exhibit for a locale: EXHIBIT_CODE when it has all three levels, else the strongest three-rung ladder, else the EN fallback. */
export async function loadSetExhibit(locale: string, t: LevelSetsT): Promise<SetExhibit> {
  const ladders = await loadLadders(locale);
  const fixed = ladders.find((l) => l.code === EXHIBIT_CODE && l.rungCount === 3);
  const pick = fixed || featuredLadders(ladders.filter((l) => l.rungCount === 3), 1)[0];
  return pick ? fromLadder(pick, locale, t) : fallbackExhibit(locale, t);
}
