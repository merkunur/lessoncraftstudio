/* The curriculum hub: /<locale>/curriculum (Daily Teaching System, Part 6).
 *
 * Every curriculum page of the language, by framework and subject and then by grade. Everything on it is generated
 * from content/curriculum-pages/pages.<loc>.json; the only prose is the page's own strings (ui.<loc>.json).
 * The same page for everyone: no cookie, no query. Same look as the units hub (components/units/units.css). */
import '@/components/units/units.css';
import '@/components/curriculum/curriculum.css';
import { baloo2, nunito } from '@/lib/fonts/direction-a';
import { getTranslations } from 'next-intl/server';
import { canonicalUrl, localePath } from '@/lib/seo/url';
import { buildBreadcrumbSchema } from '@/lib/seo/breadcrumb-schema';
import { getHreflangCode } from '@/lib/seo/hreflang';
import BreadcrumbTrail from '@/components/breadcrumbs/BreadcrumbTrail';
import { fill } from '@/lib/units';
import { CurriculumPageData, CurriculumUi, curriculumSets } from '@/lib/curriculum-pages';

const LEVEL_KEY: Record<string, string> = { P: 'preschool', K: 'kindergarten', '1': 'grade_1', '2': 'grade_2', '3': 'grade_3', '4': 'grade_4', '5': 'grade_5' };

export default async function CurriculumHub({ locale, ui, pages, live }: { locale: string; ui: CurriculumUi; pages: CurriculumPageData[]; live: boolean }) {
  const [tLevel, tBreadcrumb] = await Promise.all([
    getTranslations({ locale, namespace: 'seo.educational_level' }),
    getTranslations({ locale, namespace: 'topicPage.breadcrumb' }),
  ]);
  const gradeLabel = (g: string) => (LEVEL_KEY[g] ? tLevel(LEVEL_KEY[g]) : g);
  const url = canonicalUrl(localePath(locale, 'curriculum'));
  const sets = curriculumSets(pages);
  const setTitle = (s: { frameworkShort: string; subject: string }) => `${s.frameworkShort} · ${ui[`subject_${s.subject}`] || s.subject}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: ui.hubTitle,
    description: ui.hubMetaDescription,
    url,
    inLanguage: getHreflangCode(locale),
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: pages.length,
      itemListElement: pages.map((p, i) => ({ '@type': 'ListItem', position: i + 1, url: canonicalUrl(localePath(locale, 'curriculum', p.slug)), name: p.title })),
    },
  };
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: tBreadcrumb('home'), path: localePath(locale) },
    { name: ui.hubCrumb, path: localePath(locale, 'curriculum') },
  ]);

  return (
    <main className={`un cu ${baloo2.variable} ${nunito.variable}`}>
      <div className="un-wrap">
        <BreadcrumbTrail locale={locale} trail={[{ label: ui.hubCrumb }]} />
        {live ? null : <p className="un-pilot" role="note">{ui.pilotBanner}</p>}

        <header className="un-head">
          <p className="un-eyebrow">{ui.hubEyebrow}</p>
          <h1 className="un-title">{ui.hubTitle}</h1>
          <p className="un-hub-lead">{ui.hubLead}</p>
          <p className="un-facts">
            <span>{fill(ui.hubFactPages, { n: pages.length })}</span>
          </p>
          <nav className="un-hub-jump" aria-label={ui.hubJumpTitle}>
            <ul>
              {sets.map((s) => <li key={s.key}><a href={`#set-${s.key}`}>{setTitle(s)}</a></li>)}
            </ul>
          </nav>
        </header>

        {sets.map((s) => (
          <section key={s.key} className="un-hub-grade" id={`set-${s.key}`} aria-labelledby={`set-${s.key}-title`}>
            <h2 id={`set-${s.key}-title`} className="un-hub-grade-title">{setTitle(s)}</h2>
            <ol className="un-hub-units">
              {s.pages.map((p) => (
                <li key={p.id} className="un-hub-unit">
                  <h3 className="un-hub-unit-title"><a href={`/${locale}/curriculum/${p.slug}`}>{p.title}</a></h3>
                  <p className="un-hub-unit-facts">{gradeLabel(p.grade)} · {fill(ui.hubPageFacts, { taught: p.counts.taught, objectives: p.counts.objectives })}</p>
                  <p className="un-hub-unit-lessons">{p.groups.filter((g) => g.items.length).map((g) => g.title).join(' · ')}</p>
                </li>
              ))}
            </ol>
          </section>
        ))}

        {ui.hubMissing ? (
          <section className="cu-missing" aria-labelledby="cu-missing-title">
            <h2 id="cu-missing-title">{ui.hubMissingTitle}</h2>
            <p>{ui.hubMissing}</p>
          </section>
        ) : null}

        <p className="un-hub-note">{ui.hubNote}</p>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, '\\u003c') }} />
    </main>
  );
}
