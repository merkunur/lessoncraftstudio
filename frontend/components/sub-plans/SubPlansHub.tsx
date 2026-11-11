/* The sub plans hub: /<locale>/sub-plans (Daily Teaching System, Part 5).
 *
 * Every sub pack of the language by grade and then by time of year. Everything on it is generated from
 * content/sub-plans/packs.<loc>.json; the only prose is the page's own strings (content/sub-plans/ui.<loc>.json).
 * The same page for everyone: no cookie, no query. Same look as the units hub (components/units/units.css). */
import '@/components/units/units.css';
import '@/components/sub-plans/sub-plans.css';
import { baloo2, nunito } from '@/lib/fonts/direction-a';
import { getTranslations } from 'next-intl/server';
import { canonicalUrl, localePath } from '@/lib/seo/url';
import { buildBreadcrumbSchema } from '@/lib/seo/breadcrumb-schema';
import { getHreflangCode } from '@/lib/seo/hreflang';
import BreadcrumbTrail from '@/components/breadcrumbs/BreadcrumbTrail';
import { GRADE_ORDER, fill } from '@/lib/units';
import { POSITION_ORDER, SubPack, SubUi } from '@/lib/sub-plans';

const LEVEL_KEY: Record<string, string> = { P: 'preschool', K: 'kindergarten', '1': 'grade_1', '2': 'grade_2', '3': 'grade_3', '4': 'grade_4', '5': 'grade_5' };

export default async function SubPlansHub({ locale, ui, packs, live }: { locale: string; ui: SubUi; packs: SubPack[]; live: boolean }) {
  const [tLevel, tTier, tBreadcrumb] = await Promise.all([
    getTranslations({ locale, namespace: 'seo.educational_level' }),
    getTranslations({ locale, namespace: 'pricingPage.tier' }),
    getTranslations({ locale, namespace: 'topicPage.breadcrumb' }),
  ]);
  const gradeLabel = (g: string) => (LEVEL_KEY[g] ? tLevel(LEVEL_KEY[g]) : g);
  const url = canonicalUrl(localePath(locale, 'sub-plans'));

  // grade → time of year → the days of that time, in the order of the file
  const grades = GRADE_ORDER.filter((g) => packs.some((p) => p.grade === g)).map((g) => ({
    grade: g,
    positions: POSITION_ORDER.filter((pos) => packs.some((p) => p.grade === g && p.position === pos)).map((pos) => ({
      position: pos,
      packs: packs.filter((p) => p.grade === g && p.position === pos),
    })),
  }));
  const ordered = grades.flatMap((g) => g.positions.flatMap((p) => p.packs));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: ui.hubTitle,
    description: ui.hubMetaDescription,
    url,
    inLanguage: getHreflangCode(locale),
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: ordered.length,
      itemListElement: ordered.map((p, i) => ({ '@type': 'ListItem', position: i + 1, url: canonicalUrl(localePath(locale, 'sub-plans', p.slug)), name: p.title })),
    },
  };
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: tBreadcrumb('home'), path: localePath(locale) },
    { name: ui.hubCrumb, path: localePath(locale, 'sub-plans') },
  ]);

  return (
    <main className={`un sp ${baloo2.variable} ${nunito.variable}`}>
      <div className="un-wrap">
        <BreadcrumbTrail locale={locale} trail={[{ label: ui.hubCrumb }]} />
        {live ? null : <p className="un-pilot" role="note">{ui.pilotBanner}</p>}

        <header className="un-head">
          <p className="un-eyebrow">{ui.hubEyebrow}</p>
          <h1 className="un-title">{ui.hubTitle}</h1>
          <p className="un-hub-lead">{ui.hubLead}</p>
          <p className="un-facts">
            <span>{fill(ui.hubFactPacks, { n: ordered.length })}</span>
          </p>
          <nav className="un-hub-jump" aria-label={ui.hubJumpTitle}>
            <ul>
              {grades.map((g) => <li key={g.grade}><a href={`#grade-${g.grade.toLowerCase()}`}>{gradeLabel(g.grade)}</a></li>)}
            </ul>
          </nav>
        </header>

        {grades.map((g) => (
          <section key={g.grade} className="un-hub-grade" id={`grade-${g.grade.toLowerCase()}`} aria-labelledby={`grade-${g.grade.toLowerCase()}-title`}>
            <h2 id={`grade-${g.grade.toLowerCase()}-title`} className="un-hub-grade-title">{gradeLabel(g.grade)}</h2>
            {g.positions.map((pos) => (
              <div key={pos.position} className="un-hub-subject">
                <h3 className="un-hub-subject-title">{ui[`position_${pos.position}`]}</h3>
                <ol className="un-hub-units">
                  {pos.packs.map((p) => (
                    <li key={p.id} className="un-hub-unit">
                      <h4 className="un-hub-unit-title"><a href={`/${locale}/sub-plans/${p.slug}`}>{p.title}</a></h4>
                      <p className="un-hub-unit-facts">{fill(ui.hubPackFacts, { n: p.blocks.length, minutes: p.minutes })}</p>
                      <p className="un-hub-unit-lessons">{fill(ui.hubPackBlocks, { list: p.blocks.map((b) => b.title).join(' · ') })}</p>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </section>
        ))}

        <p className="un-hub-note">{fill(ui.hubNote, { plan: tTier('name') })}</p>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, '\\u003c') }} />
    </main>
  );
}
