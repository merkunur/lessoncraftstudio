/**
 * /[locale]/worksheets/sets/[code] — the SET PAGE of one Level Set ladder
 * (Level Sets v2, 2026-10-15; operator decision 3).
 *
 * One worksheet type face, every page it has at every level: the easy pages,
 * the core page (the published, indexed worksheet) with its copies, the hard
 * pages. Each page is the same card the hub uses, with the metered PDF /
 * answer-key links and the play mark. This is the page a teacher bookmarks
 * and shares; nothing on it changes the meter or the plan.
 *
 * NOINDEX, FOLLOW — never in a sitemap, never a canonical: the ladder is an
 * additive browse structure (red line 1: no new indexable URL, no thin page
 * added to the index). The indexed surface of a face stays its landing.
 *
 * Routing: nginx captures `/<loc>/worksheets/<one-segment>` for the static
 * landings; two segments fall through to Next, and the static `sets` segment
 * wins over `[slug]`. Deck links are nginx URLs → plain <a> (§15.7).
 */
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Baloo_2, Nunito } from 'next/font/google';
import { getTranslations } from 'next-intl/server';
import { getAxisName, getAxisSlug } from '@/lib/taxonomy';
import { localePath } from '@/lib/seo/url';
import { buildBreadcrumbSchema } from '@/lib/seo/breadcrumb-schema';
import { wwwImg } from '@/lib/img-host';
import { deckAssets } from '@/lib/seo/landing-content';
import { levelChip, worksheetSubject } from '@/lib/worksheets-catalog';
import { dlHref } from '@/lib/metered-download';
import { RUNGS, setPath, setsIndexPath, teacherSheetHref, type Ladder, type Rung } from '@/lib/level-sets';
import { loadLadder, loadLadders, teacherSheetExists } from '@/lib/level-sets-db';
import { ladderCardProps, rungWord } from '@/lib/level-sets-view';
import { pathwayNeighbours, strandAnchor } from '@/lib/level-set-pathways';
import BreadcrumbTrail from '@/components/breadcrumbs/BreadcrumbTrail';
import WorksheetCatalogCard from '@/components/worksheets/WorksheetCatalogCard';
import LadderCard from '@/components/worksheets/LadderCard';
import '@/styles/catalog-cards.css';

export const revalidate = 3600;

const baloo2 = Baloo_2({ weight: ['400', '500', '600', '700', '800'], subsets: ['latin', 'latin-ext'], variable: '--font-baloo-2', display: 'swap' });
const nunito = Nunito({ weight: ['400', '500', '600', '700'], subsets: ['latin', 'latin-ext'], variable: '--font-nunito', display: 'swap' });

const RUNG_INTRO_KEY: Record<Rung, string> = { easy: 'rungEasy', core: 'rungCore', hard: 'rungHard' };

export async function generateMetadata({ params }: { params: { locale: string; code: string } }): Promise<Metadata> {
  const { locale, code } = params;
  const ladder = await loadLadder(locale, code);
  if (!ladder) return { robots: { index: false, follow: false } };
  const t = await getTranslations({ locale, namespace: 'levelSets' });
  return {
    title: `${t('setTitle', { title: ladder.title })} | LessonCraftStudio`,
    description: t('setDescription', { title: ladder.title }),
    // Noindex by design — the ladder is a browse structure, its indexed face is the landing.
    robots: { index: false, follow: true },
  };
}

export default async function LevelSetPage({ params }: { params: { locale: string; code: string } }) {
  const { locale, code } = params;
  const ladder = await loadLadder(locale, code);
  if (!ladder) notFound();

  const [t, tWs, tBreadcrumb, tNav] = await Promise.all([
    getTranslations({ locale, namespace: 'levelSets' }),
    getTranslations({ locale, namespace: 'worksheetsPage' }),
    getTranslations({ locale, namespace: 'topicPage.breadcrumb' }),
    getTranslations({ locale, namespace: 'nav.categories' }),
  ]);
  // every ladder of the locale: the pathway neighbours (phase 3) need the whole subject × grade sequence
  const allLadders = await loadLadders(locale);
  const siblings = allLadders.filter((l) => l.type === ladder.type && l.code !== ladder.code);
  const nb = pathwayNeighbours(locale, allLadders, ladder.code);

  const typeLabel = getAxisName('exercise-type', ladder.type, locale) || ladder.type;
  const typeSlug = getAxisSlug('exercise-type', ladder.type, locale) || ladder.type;
  const subject = worksheetSubject(ladder.type);
  const cardLabels = {
    pdf: tWs('card.pdf'),
    answerKey: tWs('card.answerKey'),
    printOnly: tWs('card.printOnly'),
    pdfAria: (title: string) => tWs('card.pdfAria', { title }),
    answerKeyAria: (title: string) => tWs('card.answerKeyAria', { title }),
    interactiveMark: tWs('card.interactiveMark'),
  };
  const cardStrings = { interactiveMark: tWs('card.interactiveMark'), printOnly: tWs('card.printOnly') };

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: tBreadcrumb('home'), path: localePath(locale) },
    { name: tNav('worksheets'), path: localePath(locale, 'worksheets') },
    { name: t('heading'), path: setsIndexPath(locale) },
    { name: ladder.title, path: setPath(locale, ladder.code) },
  ]);

  const present = RUNGS.filter((r) => ladder.pages[r].length > 0);
  // Themeless copies are numbered ONCE across levels by the generator (easy 7, 8, 9 …), which reads as nonsense
  // to a teacher — label them by their POSITION within the level instead (Set 1, 2, 3). Mirrors deck-ladder.js.
  const pageLabel = (p: { title: string; theme: string | null }, pos: number, rungSize: number) =>
    p.theme ? `${ladder.title} — ${p.theme}` : (rungSize > 1 ? `${ladder.title} · ${t('setWord', { n: pos })}` : ladder.title);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <main className={`${baloo2.variable} ${nunito.variable} font-lcsBody bg-lcs-cream min-h-[calc(100vh-200px)] py-6 px-3 md:py-10 md:px-6`}>
        <div className="mx-auto max-w-6xl">
          <BreadcrumbTrail
            locale={locale}
            trail={[
              { label: tNav('worksheets'), href: localePath(locale, 'worksheets') },
              { label: t('heading'), href: setsIndexPath(locale) },
              { label: ladder.title },
            ]}
          />

          <header className="mb-7 md:mb-9 max-w-3xl">
            <p className="font-lcsBody text-xs font-bold uppercase tracking-wide text-lcs-coral-deep mb-2">{t('heading')}</p>
            <h1 className="font-lcsDisplay font-extrabold text-3xl md:text-4xl text-lcs-teal leading-tight mb-2.5">{ladder.title}</h1>
            <span aria-hidden="true" className="block w-16 h-1.5 rounded-full bg-lcs-coral mb-3.5" />
            <div className="flex flex-wrap items-center gap-2 mb-3 font-lcsBody text-[0.78rem] font-bold">
              {ladder.level && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-lcs-teal/10 text-lcs-teal">{levelChip(ladder.level, locale)}</span>
              )}
              <Link href={`${localePath(locale, 'topic', typeSlug)}/`} prefetch={false} className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#FFFDF8] ring-1 ring-lcs-teal/20 text-lcs-teal hover:underline">
                {typeLabel}
              </Link>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-lcs-teal text-lcs-cream">{t('levels', { count: ladder.rungCount })}</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#FFFDF8] ring-1 ring-lcs-teal/20 text-lcs-teal">{t('pages', { count: ladder.pageCount })}</span>
            </div>
            {/* Phase 3: where this set sits in the subject × grade PATHWAY — strand + previous / next set.
                "Next" never dead-ends before the catalogue does (it crosses into the next grade's same strand). */}
            {nb && (
              <nav aria-label={t('pathway')} className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-1 font-lcsBody text-sm text-lcs-teal/80">
                <span>
                  <span className="font-bold text-lcs-teal">{t('pathway')}:</span>{' '}
                  <Link href={`${setsIndexPath(locale)}#${strandAnchor(nb.subject, nb.grade, nb.strand)}`} prefetch={false} className="hover:underline">{nb.strandLabel}</Link>
                </span>
                {nb.previous && (
                  <Link href={setPath(locale, nb.previous.code)} prefetch={false} className="hover:underline">
                    ← <span className="sr-only">{t('previousSet')}: </span>{nb.previous.title}
                  </Link>
                )}
                {nb.next && (
                  <Link href={setPath(locale, nb.next.code)} prefetch={false} className="font-bold text-lcs-coral-deep hover:underline">
                    <span className="sr-only">{t('nextSet')}: </span>{nb.next.title} →
                  </Link>
                )}
              </nav>
            )}
            <p className="font-lcsBody text-sm md:text-base text-lcs-teal/80 leading-relaxed">{t('setIntro')}</p>
            <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1 font-lcsBody text-sm text-lcs-teal/75">
              {ladder.answerKeyCount > 0 && <li>✓ {t('answerKeys', { count: ladder.answerKeyCount })}</li>}
              {ladder.interactiveCount > 0 && <li>▶ {t('interactiveCount', { count: ladder.interactiveCount })}</li>}
            </ul>
            {/* The set's TEACHER SHEET (phase 2): placement rule + class grid, one light PDF per set behind
                the metered proxy (counts as a PDF download, policy unchanged). Shown only where the file
                exists on this server. Plain <a>: the proxy 302s. */}
            {teacherSheetExists(locale, ladder.code) && (
              <p className="mt-4">
                <a
                  href={teacherSheetHref(locale, ladder.code)}
                  rel="nofollow"
                  target="_blank"
                  aria-label={t('teacherSheetAria', { title: ladder.title })}
                  className="inline-flex items-center gap-2 rounded-full border-2 border-lcs-teal bg-[#FFFDF8] px-4 py-2 font-lcsBody text-sm font-bold text-lcs-teal hover:bg-lcs-teal/10"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M12 4v11" /><path d="m7 11 5 5 5-5" /><path d="M5 20h14" />
                  </svg>
                  {t('teacherSheet')}
                </a>
              </p>
            )}
          </header>

          {/* Jump strip: one chip per rung, anchored to its section. */}
          <nav aria-label={t('heading')} className="mb-6 flex flex-wrap gap-2 font-lcsBody text-sm font-bold">
            {present.map((r, i) => (
              <a key={r} href={`#level-${r}`} className="inline-flex items-center gap-2 rounded-full bg-[#FFFDF8] ring-1 ring-lcs-teal/20 px-3 py-1.5 text-lcs-teal hover:bg-lcs-teal/10">
                <span className="grid place-items-center w-5 h-5 rounded-full bg-lcs-teal text-lcs-cream text-[0.7rem]">{i + 1}</span>
                {rungWord(r, locale, t)}
                <span className="text-lcs-teal/60 font-semibold">· {t('pages', { count: ladder.pages[r].length })}</span>
              </a>
            ))}
          </nav>

          {present.map((r, i) => (
            <section key={r} id={`level-${r}`} className="mb-10 scroll-mt-24">
              <h2 className="font-lcsDisplay font-extrabold text-2xl text-lcs-teal leading-tight mb-1 flex items-center gap-3">
                <span className="grid place-items-center w-8 h-8 rounded-full bg-lcs-teal text-lcs-cream text-base">{i + 1}</span>
                {t('levelN', { n: i + 1 })}: {rungWord(r, locale, t)}
              </h2>
              <p className="font-lcsBody text-sm text-lcs-teal/75 mb-4 ml-11">{t(RUNG_INTRO_KEY[r])} · {t('pages', { count: ladder.pages[r].length })}</p>
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {ladder.pages[r].map((p, j) => {
                  const assets = deckAssets(locale, p.slug);
                  return (
                    <WorksheetCatalogCard
                      key={p.slug}
                      href={assets.deckDir}
                      external
                      thumbnailSrc={wwwImg(assets.thumbnail)}
                      title={pageLabel(p, j + 1, ladder.pages[r].length)}
                      levelLabel={rungWord(r, locale, t)}
                      typeLabel={typeLabel}
                      subject={subject}
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
          ))}

          {siblings.length > 0 && (
            <section className="mt-4 mb-10">
              <h2 className="font-lcsDisplay font-extrabold text-2xl text-lcs-teal leading-tight mb-4">{t('moreOfType')}</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {siblings.slice(0, 8).map((l) => (
                  <LadderCard key={l.code} {...ladderCardProps(l, locale, t, cardStrings)} />
                ))}
              </div>
            </section>
          )}

          <p className="font-lcsBody text-sm font-bold">
            <Link href={setsIndexPath(locale)} prefetch={false} className="text-lcs-teal hover:underline">{t('allSets')}</Link>
            <span aria-hidden="true" className="mx-2 text-lcs-teal/30">·</span>
            <Link href={localePath(locale, 'worksheets')} prefetch={false} className="text-lcs-teal hover:underline">{t('backToHub')}</Link>
          </p>
        </div>
      </main>
    </>
  );
}
