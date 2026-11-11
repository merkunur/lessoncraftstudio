/* The units hub: /<locale>/units (Daily Teaching System, Part 4.4).
 *
 * Every unit of the language, by grade and then by subject, in teaching order (the order of the year plan when the
 * grade and subject have one). Everything on it is generated from content/units/units.<loc>.json; the only prose is
 * the page's own strings (content/units/ui.<loc>.json). The same page for everyone: no cookie, no query. */
import '@/components/units/units.css';
import { baloo2, nunito } from '@/lib/fonts/direction-a';
import { getTranslations } from 'next-intl/server';
import { getCurriculumUi, listedCurriculumPages } from '@/lib/curriculum-pages';
import { canonicalUrl, localePath } from '@/lib/seo/url';
import { buildBreadcrumbSchema } from '@/lib/seo/breadcrumb-schema';
import { getHreflangCode } from '@/lib/seo/hreflang';
import BreadcrumbTrail from '@/components/breadcrumbs/BreadcrumbTrail';
import { GRADE_ORDER, SUBJECT_ORDER, Unit, UnitPlan, UnitUi, fill } from '@/lib/units';

export const LEVEL_KEY: Record<string, string> = { P: 'preschool', K: 'kindergarten', '1': 'grade_1', '2': 'grade_2', '3': 'grade_3', '4': 'grade_4', '5': 'grade_5' };

export default async function UnitsHub({ locale, ui, units, plans, live }: { locale: string; ui: UnitUi; units: Unit[]; plans: UnitPlan[]; live: boolean }) {
  const [tLevel, tTier, tBreadcrumb] = await Promise.all([
    getTranslations({ locale, namespace: 'seo.educational_level' }),
    getTranslations({ locale, namespace: 'pricingPage.tier' }),
    getTranslations({ locale, namespace: 'topicPage.breadcrumb' }),
  ]);
  const gradeLabel = (g: string) => (LEVEL_KEY[g] ? tLevel(LEVEL_KEY[g]) : g);
  const [cuListed, cuUi] = await Promise.all([listedCurriculumPages(locale), getCurriculumUi(locale)]);
  const checklists = cuListed.live && cuUi ? cuUi.hubTitle : null;
  const subjectLabel = (s: string) => ui[`subject_${s}`] || s;
  const url = canonicalUrl(localePath(locale, 'units'));

  // grade → subject → units in teaching order
  const grades = GRADE_ORDER.filter((g) => units.some((u) => u.grade === g)).map((g) => ({
    grade: g,
    subjects: SUBJECT_ORDER.filter((s) => units.some((u) => u.grade === g && u.subject === s)).map((s) => {
      const plan = plans.find((p) => p.grade === g && p.subject === s) ?? null;
      const own = units.filter((u) => u.grade === g && u.subject === s);
      const ordered = plan ? [...own].sort((a, b) => plan.units.findIndex((r) => r.id === a.id) - plan.units.findIndex((r) => r.id === b.id)) : own;
      return { subject: s, plan, units: ordered };
    }),
  }));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: ui.hubTitle,
    description: ui.hubMetaDescription,
    url,
    inLanguage: getHreflangCode(locale),
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: units.length,
      itemListElement: grades.flatMap((g) => g.subjects.flatMap((s) => s.units)).map((u, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: canonicalUrl(localePath(locale, 'units', u.slug)),
        name: u.title,
      })),
    },
  };
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: tBreadcrumb('home'), path: localePath(locale) },
    { name: ui.hubCrumb, path: localePath(locale, 'units') },
  ]);

  return (
    <main className={`un ${baloo2.variable} ${nunito.variable}`}>
      <div className="un-wrap">
        <BreadcrumbTrail locale={locale} trail={[{ label: ui.hubCrumb }]} />
        {live ? null : <p className="un-pilot" role="note">{ui.pilotBanner}</p>}

        <header className="un-head">
          <p className="un-eyebrow">{ui.hubEyebrow}</p>
          <h1 className="un-title">{ui.hubTitle}</h1>
          <p className="un-hub-lead">{ui.hubLead}</p>
          <p className="un-facts">
            <span>{fill(ui.hubFactUnits, { n: units.length })}</span>
            <span>{fill(ui.factLessons, { n: units.reduce((n, u) => n + u.lessons.length, 0) })}</span>
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
            {g.subjects.map((s) => (
              <div key={s.subject} className="un-hub-subject">
                <h3 className="un-hub-subject-title">{subjectLabel(s.subject)}</h3>
                {s.plan ? (
                  <p className="un-hub-plan"><a href={`/${locale}/units/${s.plan.slug}`}>{fill(ui.hubPlanLink, { title: s.plan.title })}</a></p>
                ) : null}
                <ol className="un-hub-units">
                  {s.units.map((u) => (
                    <li key={u.id} className="un-hub-unit">
                      <h4 className="un-hub-unit-title"><a href={`/${locale}/units/${u.slug}`}>{u.title}</a></h4>
                      <p className="un-hub-unit-facts">
                        {[fill(ui.factLessons, { n: u.lessons.length }), u.weeks === 1 ? ui.factWeek : fill(ui.factWeeks, { n: u.weeks })].join(' · ')}
                      </p>
                      <p className="un-hub-unit-lessons">{fill(ui.hubUnitLessons, { list: u.lessons.map((l) => l.title).join(' · ') })}</p>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </section>
        ))}

        <p className="un-hub-note">{fill(ui.hubPlanNote, { plan: tTier('name') })}</p>
        {/* the standards checklists of the language (Part 6), once they are published */}
        {checklists ? <p className="un-hub-note"><a href={`/${locale}/curriculum`}>{checklists}</a></p> : null}
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, '\\u003c') }} />
    </main>
  );
}
