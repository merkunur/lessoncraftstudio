/**
 * level-sets-view.ts — the view-model glue every surface that renders a
 * ladder shares (hub section, hub type view, set page, sets index, topic
 * hubs). One place for the level words, the ladder-card props and the
 * ordering, so the cards say the same thing everywhere.
 */
import { getAxisName, getExerciseModeName } from '@/lib/taxonomy';
import { deckAssets } from '@/lib/seo/landing-content';
import { wwwImg } from '@/lib/img-host';
import { levelChip, worksheetSubject } from '@/lib/worksheets-catalog';
import { RUNGS, setHref, type Ladder, type Rung } from '@/lib/level-sets';
import type { LadderCardProps } from '@/components/worksheets/LadderCard';

/** A next-intl `t` narrowed to what this module calls. */
export type LevelSetsT = (key: string, values?: Record<string, string | number>) => string;

/** The level word of a rung in the page locale: taxonomy names for easy/hard, the `levelSets.core` string for core. */
export function rungWord(rung: Rung, locale: string, t: LevelSetsT): string {
  if (rung === 'core') return t('core');
  return getExerciseModeName(rung, locale) || (rung === 'easy' ? 'Easy' : 'Hard');
}

/** The ladder's representative thumbnail: the core page (published first), else the first page. */
export function ladderThumbnailSlug(l: Ladder): string {
  for (const r of ['core', 'easy', 'hard'] as const) if (l.pages[r][0]) return l.pages[r][0].slug;
  return '';
}

export interface LadderCardStrings {
  interactiveMark: string;
  printOnly: string;
}

export function ladderCardProps(
  l: Ladder,
  locale: string,
  t: LevelSetsT,
  s: LadderCardStrings,
  eager = false,
): LadderCardProps {
  const slug = ladderThumbnailSlug(l);
  return {
    href: setHref(locale, l.type, l.code),
    thumbnailSrc: wwwImg(deckAssets(locale, slug).thumbnail),
    title: l.title,
    levelLabel: l.level ? levelChip(l.level, locale) : '',
    typeLabel: getAxisName('exercise-type', l.type, locale) || l.type,
    subject: worksheetSubject(l.type),
    levelsLabel: t('levels', { count: l.rungCount }),
    rungs: RUNGS.filter((r) => l.pages[r].length > 0).map((r) => ({
      label: rungWord(r, locale, t),
      pagesLabel: t('pages', { count: l.pages[r].length }),
      count: l.pages[r].length,
    })),
    interactive: l.interactiveCount > 0,
    interactiveMark: s.interactiveMark,
    printOnly: s.printOnly,
    openSet: t('openSet'),
    eager,
  };
}

/**
 * Ladders for a "featured" strip: one per type so eight cards show eight
 * skills, not eight faces of one type. Ranked by what a teacher sees as the
 * strongest set — all three rungs, a screen version, answer keys — with the
 * page count CAPPED at 15, so the every-theme PDF-only expansions (picture
 * cards, tracing) do not crowd out the three-level sets with screens (read on
 * the first live render, 2026-10-15).
 */
export function featuredLadders(ladders: Ladder[], max: number): Ladder[] {
  const score = (l: Ladder) =>
    l.rungCount * 100 + (l.interactiveCount > 0 ? 50 : 0) + (l.answerKeyCount > 0 ? 20 : 0) + Math.min(l.pageCount, 15);
  const seenType = new Set<string>();
  return ladders
    .slice()
    .sort((a, b) => score(b) - score(a) || a.title.localeCompare(b.title))
    .filter((l) => (seenType.has(l.type) ? false : (seenType.add(l.type), true)))
    .slice(0, max);
}
