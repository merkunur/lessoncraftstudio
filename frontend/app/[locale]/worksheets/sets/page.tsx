/**
 * /[locale]/worksheets/sets — the SETS INDEX: every Level Set ladder of the locale in PATHWAY
 * order — subject → grade → strand → type → face (Level Sets v2 phase 3, 2026-10-15; the
 * sequence in content/level-set-pathways/sequence.json, strand names from the national
 * framework table). Each strand group carries the anchor the grade hubs and set pages link to.
 *
 * NOINDEX, FOLLOW (red line 1: no new indexable URL). ≈650 ladders per locale from ONE deck
 * query per ISR hour, the same shape the hub runs.
 */
import type { Metadata } from 'next';
import Link from 'next/link';
import { Baloo_2, Nunito } from 'next/font/google';
import { getTranslations } from 'next-intl/server';
import { listSubjectKeys, getSubjectName } from '@/lib/taxonomy';
import { localePath } from '@/lib/seo/url';
import { buildBreadcrumbSchema } from '@/lib/seo/breadcrumb-schema';
import { levelChip } from '@/lib/worksheets-catalog';
import { setsIndexPath, type Ladder } from '@/lib/level-sets';
import { loadLadders } from '@/lib/level-sets-db';
import { ladderCardProps } from '@/lib/level-sets-view';
import { GRADE_ORDER, PATHWAY_SEQUENCE, gradeSlug, pathwayFor, strandAnchor, typePosition, type GradeKey } from '@/lib/level-set-pathways';
import BreadcrumbTrail from '@/components/breadcrumbs/BreadcrumbTrail';
import LadderCard from '@/components/worksheets/LadderCard';
import '@/styles/catalog-cards.css';

export const revalidate = 3600;

const baloo2 = Baloo_2({ weight: ['400', '500', '600', '700', '800'], subsets: ['latin', 'latin-ext'], variable: '--font-baloo-2', display: 'swap' });
const nunito = Nunito({ weight: ['400', '500', '600', '700'], subsets: ['latin', 'latin-ext'], variable: '--font-nunito', display: 'swap' });

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'levelSets' });
  return {
    title: `${t('indexTitle')} | LessonCraftStudio`,
    description: t('indexDescription'),
    robots: { index: false, follow: true },
  };
}

export default async function LevelSetsIndexPage({ params }: { params: { locale: string } }) {
  const locale = params.locale || 'en';
  const [t, tWs, tBreadcrumb, tNav, ladders] = await Promise.all([
    getTranslations({ locale, namespace: 'levelSets' }),
    getTranslations({ locale, namespace: 'worksheetsPage' }),
    getTranslations({ locale, namespace: 'topicPage.breadcrumb' }),
    getTranslations({ locale, namespace: 'nav.categories' }),
    loadLadders(locale),
  ]);
  const cardStrings = { interactiveMark: tWs('card.interactiveMark'), printOnly: tWs('card.printOnly') };

  // subject (sequence order, taxonomy subjects first) → grade → strands (pathway order)
  const subjects = [...listSubjectKeys(), ...Object.keys(PATHWAY_SEQUENCE)].filter((s, i, a) => a.indexOf(s) === i && PATHWAY_SEQUENCE[s]);
  const tree = subjects.map((subject) => ({
    subject,
    label: getSubjectName(subject, locale) || subject,
    grades: GRADE_ORDER.map((g) => ({ grade: g as GradeKey, label: levelChip(gradeSlug(locale, g as GradeKey), locale), strands: pathwayFor(locale, ladders, subject, g as GradeKey) }))
      .filter((g) => g.strands.length > 0),
  })).filter((s) => s.grades.length > 0);
  const count = (s: typeof tree[number]) => s.grades.reduce((n, g) => n + g.strands.reduce((m, st) => m + st.ladders.length, 0), 0);
  // a ladder whose type is not in the sequence (the gate forbids it; shown rather than lost)
  const unplaced: Ladder[] = ladders.filter((l) => !typePosition(l.type));

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: tBreadcrumb('home'), path: localePath(locale) },
    { name: tNav('worksheets'), path: localePath(locale, 'worksheets') },
    { name: t('heading'), path: setsIndexPath(locale) },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <main className={`${baloo2.variable} ${nunito.variable} font-lcsBody bg-lcs-cream min-h-[calc(100vh-200px)] py-6 px-3 md:py-10 md:px-6`}>
        <div className="mx-auto max-w-6xl">
          <BreadcrumbTrail locale={locale} trail={[{ label: tNav('worksheets'), href: localePath(locale, 'worksheets') }, { label: t('heading') }]} />
          <header className="mb-7 md:mb-8 max-w-2xl">
            <h1 className="font-lcsDisplay font-extrabold text-3xl md:text-4xl text-lcs-teal leading-tight mb-2.5">{t('heading')}</h1>
            <span aria-hidden="true" className="block w-16 h-1.5 rounded-full bg-lcs-coral mb-3.5" />
            <p className="font-lcsBody text-sm md:text-base text-lcs-teal/80 leading-relaxed">{t('indexIntro')}</p>
          </header>

          {/* In-page index: subject → grade chips, so a 650-card page is navigable. */}
          <nav aria-label={t('heading')} className="mb-8 flex flex-wrap gap-2 font-lcsBody text-[0.8rem] font-bold">
            {tree.map((s) => (
              <a key={s.subject} href={`#subject-${s.subject}`} className="inline-flex items-center rounded-full bg-[#FFFDF8] ring-1 ring-lcs-teal/20 px-3 py-1.5 text-lcs-teal hover:bg-lcs-teal/10">
                {s.label}<span className="ml-1.5 text-lcs-teal/60">{count(s)}</span>
              </a>
            ))}
          </nav>

          {tree.map((s) => (
            <section key={s.subject} id={`subject-${s.subject}`} className="mb-12 scroll-mt-24">
              <h2 className="font-lcsDisplay font-extrabold text-2xl md:text-3xl text-lcs-teal leading-tight mb-5">{s.label}</h2>
              {s.grades.map((g) => (
                <div key={g.grade} id={`${s.subject}-${g.grade}`} className="mb-9 scroll-mt-24">
                  <h3 className="font-lcsDisplay font-bold text-xl text-lcs-teal mb-4 flex items-center gap-2.5">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-lcs-teal/10 text-lcs-teal text-sm font-lcsBody font-bold">{g.label}</span>
                    <span className="font-lcsBody text-sm font-semibold text-lcs-teal/60">{t('pathway')}</span>
                  </h3>
                  <ol className="space-y-7">
                    {g.strands.map((st, i) => (
                      <li key={st.strand} id={strandAnchor(s.subject, g.grade, st.strand)} className="scroll-mt-24">
                        <h4 className="font-lcsDisplay font-bold text-lg text-lcs-teal mb-3 flex items-center gap-2.5">
                          <span className="grid place-items-center w-7 h-7 rounded-full bg-lcs-teal text-lcs-cream text-sm font-lcsBody">{i + 1}</span>
                          {st.strandLabel}
                          <span className="ml-1 inline-flex items-center rounded-full bg-lcs-teal/10 px-2 py-0.5 font-lcsBody text-xs font-bold text-lcs-teal tabular-nums">{st.ladders.length}</span>
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                          {st.ladders.map((l) => <LadderCard key={l.code} {...ladderCardProps(l, locale, t, cardStrings)} />)}
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              ))}
            </section>
          ))}

          {unplaced.length > 0 && (
            <section className="mb-12">
              <h2 className="font-lcsDisplay font-extrabold text-2xl text-lcs-teal leading-tight mb-5">…</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {unplaced.map((l) => <LadderCard key={l.code} {...ladderCardProps(l, locale, t, cardStrings)} />)}
              </div>
            </section>
          )}

          <p className="font-lcsBody text-sm font-bold">
            <Link href={localePath(locale, 'worksheets')} prefetch={false} className="text-lcs-teal hover:underline">{t('backToHub')}</Link>
          </p>
        </div>
      </main>
    </>
  );
}
