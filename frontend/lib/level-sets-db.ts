/**
 * level-sets-db.ts — loaders for the ladder model (server only).
 *
 * One findMany per locale per ISR hour, the same shape the worksheets hub
 * already runs; a failed read yields an empty list (the page degrades to its
 * pre-ladder render, never 500s).
 */
import { prisma } from '@/lib/prisma';
import { getMonolingualLandings } from '@/lib/seo/landing-content';
import { buildLadders, landingByCode, type Ladder, type LadderDeckRow } from '@/lib/level-sets';

const SELECT = { slug: true, title: true, exerciseType: true, exerciseMode: true, answerKeyUrl: true, indexable: true } as const;

/** Every ladder of a locale (≈650 per locale). */
export async function loadLadders(locale: string): Promise<Ladder[]> {
  try {
    const rows = await prisma.deck.findMany({
      where: { language: locale, status: 'published', contentLanguage: null },
      select: SELECT,
    });
    return buildLadders(locale, rows as LadderDeckRow[], landingByCode(getMonolingualLandings(locale)));
  } catch (err) {
    console.warn('[level-sets] loadLadders failed:', (err as Error).message);
    return [];
  }
}

/** Build ladders from rows a page has already fetched (the hub's one deck query). */
export function laddersFromRows(locale: string, rows: LadderDeckRow[]): Ladder[] {
  return buildLadders(locale, rows, landingByCode(getMonolingualLandings(locale)));
}

/** One ladder by variation code, or null when the locale has no such face (or only one page). */
export async function loadLadder(locale: string, code: string): Promise<Ladder | null> {
  if (!/^(?:k|g\d)\d{3}$/.test(code)) return null;
  try {
    const rows = await prisma.deck.findMany({
      where: {
        language: locale,
        status: 'published',
        contentLanguage: null,
        OR: [{ slug: { endsWith: `-${code}` } }, { slug: { contains: `-${code}-` } }],
      },
      select: SELECT,
    });
    const ladders = buildLadders(locale, rows as LadderDeckRow[], landingByCode(getMonolingualLandings(locale)));
    return ladders.find((l) => l.code === code) || null;
  } catch (err) {
    console.warn('[level-sets] loadLadder failed:', (err as Error).message);
    return null;
  }
}

/** Every ladder of one exercise type (the set page's "more sets of this type"). */
export async function loadLaddersOfType(locale: string, type: string): Promise<Ladder[]> {
  try {
    const rows = await prisma.deck.findMany({
      where: { language: locale, status: 'published', contentLanguage: null, exerciseType: type },
      select: SELECT,
    });
    return buildLadders(locale, rows as LadderDeckRow[], landingByCode(getMonolingualLandings(locale)));
  } catch (err) {
    console.warn('[level-sets] loadLaddersOfType failed:', (err as Error).message);
    return [];
  }
}
