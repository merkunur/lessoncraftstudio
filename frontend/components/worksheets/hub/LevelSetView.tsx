/**
 * LevelSetView — one Level Set shown INSIDE the worksheets hub, as a
 * sub-category of its worksheet type (`/<loc>/worksheets?type=<t>&set=<code>`).
 *
 * It replaces the standalone set page (`/worksheets/sets/<code>`, now a 308 to
 * here — operator 2026-10-18: "a separate level sets page is unnecessary").
 * Everything that page offered is kept, in the hub's own frame: the set's
 * title and facts, the class sheet, its place in the pathway, and its pages
 * grouped by level (easy → core → hard). The `#level-<rung>` anchors are kept
 * so links already baked into deck pages and landings still land on a level.
 *
 * The page h1 is the hub's; the set title is an h2. Filtered hub states
 * canonicalise to the bare hub, so this view adds no indexable URL.
 */
import Link from 'next/link';
import { deckAssets } from '@/lib/seo/landing-content';
import { wwwImg } from '@/lib/img-host';
import { dlHref } from '@/lib/metered-download';
import { levelChip } from '@/lib/worksheets-catalog';
import { RUNGS, setHref, teacherSheetHref, type Ladder, type Rung } from '@/lib/level-sets';
import { rungWord, type LevelSetsT } from '@/lib/level-sets-view';
import type { PathwayNeighbours } from '@/lib/level-set-pathways';
import WorksheetCatalogCard, { type WorksheetCardLabels } from '@/components/worksheets/WorksheetCatalogCard';

const RUNG_INTRO_KEY: Record<Rung, string> = { easy: 'rungEasy', core: 'rungCore', hard: 'rungHard' };

export interface LevelSetViewProps {
  locale: string;
  ladder: Ladder;
  typeLabel: string;
  t: LevelSetsT;
  cardLabels: WorksheetCardLabels;
  neighbours: PathwayNeighbours | null;
  hasTeacherSheet: boolean;
  /** Format scope: on the Interactive tab only the pages with a screen version show. */
  interactiveOnly: boolean;
}

export default function LevelSetView({
  locale,
  ladder,
  typeLabel,
  t,
  cardLabels,
  neighbours: nb,
  hasTeacherSheet,
  interactiveOnly,
}: LevelSetViewProps) {
  const pagesOf = (r: Rung) => (interactiveOnly ? ladder.pages[r].filter((p) => p.interactive) : ladder.pages[r]);
  const present = RUNGS.filter((r) => pagesOf(r).length > 0);
  // Themeless copies are numbered once across levels by the generator — label them by
  // POSITION within the level (Set 1, 2, 3), as the set page did. Mirrors deck-ladder.js.
  const pageLabel = (p: { title: string; theme: string | null }, pos: number, size: number) =>
    p.theme ? `${ladder.title} — ${p.theme}` : (size > 1 ? `${ladder.title} · ${t('setWord', { n: pos })}` : ladder.title);
  // On the card the set's name is already the header above it: the card says only what differs.
  const shortLabel = (p: { theme: string | null }, pos: number, size: number) =>
    p.theme || (size > 1 ? t('setWord', { n: pos }) : ladder.title);
  const chip = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-[0.75rem] font-bold';

  return (
    <div>
      <header className="rounded-xl bg-white border border-lcs-teal/[0.13] px-4 py-4 md:px-6 md:py-5 mb-4">
        <p className="font-lcsBody text-[0.7rem] font-bold uppercase tracking-[0.12em] text-lcs-coral-deep mb-1.5">
          {t('heading')} · {typeLabel}
        </p>
        <h2 className="font-lcsDisplay font-extrabold text-xl md:text-2xl text-lcs-teal leading-tight mb-2.5">{ladder.title}</h2>
        <div className="flex flex-wrap items-center gap-1.5 mb-3 font-lcsBody">
          {ladder.level && <span className={`${chip} bg-lcs-teal/10 text-lcs-teal`}>{levelChip(ladder.level, locale)}</span>}
          <span className={`${chip} bg-lcs-teal text-white`}>{t('levels', { count: ladder.rungCount })}</span>
          <span className={`${chip} ring-1 ring-lcs-teal/20 text-lcs-teal`}>{t('pages', { count: ladder.pageCount })}</span>
          {ladder.answerKeyCount > 0 && (
            <span className={`${chip} ring-1 ring-lcs-teal/20 text-lcs-teal`}>✓ {t('answerKeys', { count: ladder.answerKeyCount })}</span>
          )}
          {ladder.interactiveCount > 0 && (
            <span className={`${chip} ring-1 ring-lcs-teal/20 text-lcs-teal`}>▶ {t('interactiveCount', { count: ladder.interactiveCount })}</span>
          )}
        </div>
        <p className="font-lcsBody text-sm text-lcs-teal/75 leading-relaxed max-w-2xl">{t('setIntro')}</p>

        {(hasTeacherSheet || nb?.previous || nb?.next) && (
          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2.5">
            {/* The set's TEACHER SHEET: placement rule + class grid, one light PDF behind the
                metered proxy (counts as a PDF download, policy unchanged). Plain <a>: the proxy 302s. */}
            {hasTeacherSheet && (
              <a
                href={teacherSheetHref(locale, ladder.code)}
                rel="nofollow"
                target="_blank"
                aria-label={t('teacherSheetAria', { title: ladder.title })}
                className="inline-flex items-center gap-2 min-h-[44px] lg:min-h-[38px] rounded-lg bg-lcs-teal px-4 font-lcsBody text-sm font-bold text-white hover:bg-lcs-teal/90"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 4v11" /><path d="m7 11 5 5 5-5" /><path d="M5 20h14" />
                </svg>
                {t('teacherSheet')}
              </a>
            )}
            {nb && (nb.previous || nb.next) && (
              <nav aria-label={t('pathway')} className="w-full font-lcsBody text-sm">
                <p className="text-lcs-teal/60 mb-1.5">{t('pathway')}: <span className="font-semibold text-lcs-teal/80">{nb.strandLabel}</span></p>
                <div className="grid sm:grid-cols-2 gap-2">
                  {nb.previous ? (
                    <Link href={setHref(locale, nb.previous.type, nb.previous.code)} prefetch={false} className="flex items-start gap-2 min-h-[44px] rounded-lg px-3 py-2 ring-1 ring-lcs-teal/15 text-lcs-teal hover:ring-lcs-teal/40">
                      <span aria-hidden="true">←</span>
                      <span className="min-w-0"><span className="block text-[0.7rem] font-bold uppercase tracking-[0.08em] text-lcs-teal/55">{t('previousSet')}</span><span className="line-clamp-2">{nb.previous.title}</span></span>
                    </Link>
                  ) : <span className="hidden sm:block" />}
                  {nb.next && (
                    <Link href={setHref(locale, nb.next.type, nb.next.code)} prefetch={false} className="flex items-start justify-end gap-2 min-h-[44px] rounded-lg px-3 py-2 ring-1 ring-lcs-coral/30 text-right text-lcs-coral-deep hover:ring-lcs-coral/60">
                      <span className="min-w-0"><span className="block text-[0.7rem] font-bold uppercase tracking-[0.08em] text-lcs-coral-deep/70">{t('nextSet')}</span><span className="line-clamp-2 font-bold">{nb.next.title}</span></span>
                      <span aria-hidden="true">→</span>
                    </Link>
                  )}
                </div>
              </nav>
            )}
          </div>
        )}
      </header>

      {/* Jump bar: one chip per level, anchored to its section; stays in view while scrolling. */}
      {present.length > 1 && (
        <nav aria-label={t('heading')} className="sticky top-12 lg:top-3 z-10 mb-5 -mx-1 px-1 py-2 bg-lcs-cream/95 backdrop-blur-sm">
          <ul className="flex flex-wrap gap-2 font-lcsBody text-sm font-bold">
            {present.map((r, i) => (
              <li key={r}>
                <a href={`#level-${r}`} className="inline-flex items-center gap-2 min-h-[40px] rounded-full bg-white ring-1 ring-lcs-teal/20 pl-1.5 pr-3.5 text-lcs-teal hover:ring-lcs-teal/50">
                  <span className="grid place-items-center w-6 h-6 rounded-full bg-lcs-teal text-white text-[0.72rem]">{i + 1}</span>
                  {rungWord(r, locale, t)}
                  <span className="text-lcs-teal/55 font-semibold">{pagesOf(r).length}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {present.map((r, i) => {
        const pages = pagesOf(r);
        return (
          <section key={r} id={`level-${r}`} className="mb-9 scroll-mt-28">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5 mb-3">
              <h3 className="font-lcsDisplay font-bold text-lg md:text-xl text-lcs-teal leading-tight flex items-center gap-2.5">
                <span className="grid place-items-center w-7 h-7 rounded-full bg-lcs-teal text-white text-sm font-lcsBody">{i + 1}</span>
                {t('levelN', { n: i + 1 })}: {rungWord(r, locale, t)}
              </h3>
              <p className="font-lcsBody text-sm text-lcs-teal/65">{t(RUNG_INTRO_KEY[r])} · {t('pages', { count: pages.length })}</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
              {pages.map((p, j) => {
                const assets = deckAssets(locale, p.slug);
                return (
                  <WorksheetCatalogCard
                    key={p.slug}
                    href={assets.deckDir}
                    external
                    thumbnailSrc={wwwImg(assets.thumbnail)}
                    title={shortLabel(p, j + 1, pages.length)}
                    imageAlt={pageLabel(p, j + 1, pages.length)}
                    levelLabel=""
                    typeLabel=""
                    labels={cardLabels}
                    printOnly={!p.interactive}
                    pdfHref={dlHref(locale, p.slug, 'pdf')}
                    answerKeyHref={p.hasAnswerKey ? dlHref(locale, p.slug, 'answer') : null}
                    eager={i === 0 && j < 4}
                  />
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
