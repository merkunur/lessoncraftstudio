/**
 * /[locale]/worksheets/sets — the SETS INDEX: every Level Set ladder of the
 * locale, grouped by subject then exercise type (Level Sets v2, 2026-10-15).
 *
 * NOINDEX, FOLLOW (red line 1: no new indexable URL). ≈650 ladders per
 * locale from ONE deck query per ISR hour, the same shape the hub runs.
 */
import type { Metadata } from 'next';
import Link from 'next/link';
import { Baloo_2, Nunito } from 'next/font/google';
import { getTranslations } from 'next-intl/server';
import { getAxisName, getAxisSlug, listSubjectKeys, getSubjectName, exerciseTypeKeysForSubject } from '@/lib/taxonomy';
import { localePath } from '@/lib/seo/url';
import { buildBreadcrumbSchema } from '@/lib/seo/breadcrumb-schema';
import { setsIndexPath, type Ladder } from '@/lib/level-sets';
import { loadLadders } from '@/lib/level-sets-db';
import { ladderCardProps } from '@/lib/level-sets-view';
import BreadcrumbTrail from '@/components/breadcrumbs/BreadcrumbTrail';
import LadderCard from '@/components/worksheets/LadderCard';
import '@/styles/catalog-cards.css';

export const revalidate = 3600;

const baloo2 = Baloo_2({ weight: ['400', '500', '600', '700', '800'], subsets: ['latin', 'latin-ext'], variable: '--font-baloo-2', display: 'swap' });
const nunito = Nunito({ weight: ['400', '500', '600', '700'], subsets: ['latin', 'latin-ext'], variable: '--font-nunito', display: 'swap' });

// picture-trail is the en key of the picture-path app and has no default_subject (hub precedent).
const SUBJECT_ALIAS: Record<string, string> = { 'picture-trail': 'picture-path' };

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

  // subject → type → ladders
  const subjectOfType = new Map<string, string>();
  for (const s of listSubjectKeys()) for (const k of exerciseTypeKeysForSubject(s)) subjectOfType.set(k, s);
  const subjectFor = (k: string) => subjectOfType.get(k) || subjectOfType.get(SUBJECT_ALIAS[k] || '') || 'other';
  const groups = new Map<string, Map<string, Ladder[]>>();
  for (const l of ladders) {
    const s = subjectFor(l.type);
    if (!groups.has(s)) groups.set(s, new Map());
    const byType = groups.get(s)!;
    if (!byType.has(l.type)) byType.set(l.type, []);
    byType.get(l.type)!.push(l);
  }
  const subjectOrder = [...listSubjectKeys(), 'other'].filter((s) => groups.has(s));

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

          {/* In-page type index so a 650-card page is navigable. */}
          <nav aria-label={t('heading')} className="mb-8 flex flex-wrap gap-2 font-lcsBody text-[0.8rem] font-bold">
            {subjectOrder.map((s) => (
              <a key={s} href={`#subject-${s}`} className="inline-flex items-center rounded-full bg-[#FFFDF8] ring-1 ring-lcs-teal/20 px-3 py-1.5 text-lcs-teal hover:bg-lcs-teal/10">
                {s === 'other' ? '…' : (getSubjectName(s, locale) || s)}
                <span className="ml-1.5 text-lcs-teal/60">{[...groups.get(s)!.values()].reduce((n, a) => n + a.length, 0)}</span>
              </a>
            ))}
          </nav>

          {subjectOrder.map((s) => {
            const byType = [...groups.get(s)!.entries()]
              .map(([type, ls]) => ({ type, label: getAxisName('exercise-type', type, locale) || type, ladders: ls }))
              .sort((a, b) => a.label.localeCompare(b.label, locale));
            return (
              <section key={s} id={`subject-${s}`} className="mb-12 scroll-mt-24">
                <h2 className="font-lcsDisplay font-extrabold text-2xl md:text-3xl text-lcs-teal leading-tight mb-5">
                  {s === 'other' ? '…' : (getSubjectName(s, locale) || s)}
                </h2>
                {byType.map((g) => (
                  <div key={g.type} className="mb-8">
                    <h3 className="font-lcsDisplay font-bold text-lg text-lcs-teal mb-3">
                      <Link href={`${localePath(locale, 'topic', getAxisSlug('exercise-type', g.type, locale) || g.type)}/`} prefetch={false} className="hover:underline">
                        {g.label}
                      </Link>
                      <span className="ml-2 inline-flex items-center rounded-full bg-lcs-teal/10 px-2 py-0.5 font-lcsBody text-xs font-bold text-lcs-teal tabular-nums">{g.ladders.length}</span>
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                      {g.ladders.map((l) => <LadderCard key={l.code} {...ladderCardProps(l, locale, t, cardStrings)} />)}
                    </div>
                  </div>
                ))}
              </section>
            );
          })}
        </div>
      </main>
    </>
  );
}
