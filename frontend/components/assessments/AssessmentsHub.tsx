/* The assessments hub: /<locale>/assessments (Daily Teaching System, Part 7.4).
 *
 * Every live unit check of the language, by grade and then by subject, in the teaching order of its unit. Everything
 * on it is generated (content/assessments/checks.<loc>.json and content/units/units.<loc>.json); the only prose is the
 * page's own strings (content/assessments/ui.<loc>.json). The page says what a unit check is and what it is not.
 * The same page for everyone: no cookie, no query. */
import '@/components/units/units.css';
import { baloo2, nunito } from '@/lib/fonts/direction-a';
import { getTranslations } from 'next-intl/server';
import { canonicalUrl, localePath } from '@/lib/seo/url';
import { buildBreadcrumbSchema } from '@/lib/seo/breadcrumb-schema';
import { getHreflangCode } from '@/lib/seo/hreflang';
import BreadcrumbTrail from '@/components/breadcrumbs/BreadcrumbTrail';
import { AssessmentUi, UnitCheck, checkFormHref } from '@/lib/assessments';
import { GRADE_ORDER, SUBJECT_ORDER, Unit, UnitPlan, fill, getUnitUi } from '@/lib/units';
import { LEVEL_KEY } from '@/components/units/UnitsHub';

export default async function AssessmentsHub({ locale, ui, checks, units, plans }: { locale: string; ui: AssessmentUi; checks: UnitCheck[]; units: Unit[]; plans: UnitPlan[] }) {
  const [tLevel, tTier, tBreadcrumb, unitUi] = await Promise.all([
    getTranslations({ locale, namespace: 'seo.educational_level' }),
    getTranslations({ locale, namespace: 'pricingPage.tier' }),
    getTranslations({ locale, namespace: 'topicPage.breadcrumb' }),
    getUnitUi(locale),
  ]);
  const gradeLabel = (g: string) => (LEVEL_KEY[g] ? tLevel(LEVEL_KEY[g]) : g);
  const subjectLabel = (s: string) => unitUi?.[`subject_${s}`] || s;
  const url = canonicalUrl(localePath(locale, 'assessments'));
  const tasksOf = (c: UnitCheck) => c.parts.reduce((n, p) => n + p.tasks, 0);
  const tasks = (n: number) => (n === 1 ? ui.taskOne : fill(ui.taskMany, { n }));
  const pages = (n: number) => (n === 1 ? ui.pagesOne : fill(ui.pagesMany, { n }));

  // a check belongs to a live unit (gate T3); grade → subject → checks in the teaching order of their units
  const rows = checks.map((c) => ({ check: c, unit: units.find((u) => u.id === c.unit) })).filter((r): r is { check: UnitCheck; unit: Unit } => !!r.unit);
  const grades = GRADE_ORDER.filter((g) => rows.some((r) => r.unit.grade === g)).map((g) => ({
    grade: g,
    subjects: SUBJECT_ORDER.filter((s) => rows.some((r) => r.unit.grade === g && r.unit.subject === s)).map((s) => {
      const plan = plans.find((p) => p.grade === g && p.subject === s) ?? null;
      const own = rows.filter((r) => r.unit.grade === g && r.unit.subject === s);
      const at = (r: { unit: Unit }) => (plan ? plan.units.findIndex((x) => x.id === r.unit.id) : units.indexOf(r.unit));
      return { subject: s, rows: [...own].sort((a, b) => at(a) - at(b)) };
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
      numberOfItems: rows.length,
      itemListElement: grades.flatMap((g) => g.subjects.flatMap((s) => s.rows)).map((r, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `${canonicalUrl(localePath(locale, 'units', r.unit.slug))}#unit-check`,
        name: fill(ui.hubCheckName, { unit: r.unit.title }),
      })),
    },
  };
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: tBreadcrumb('home'), path: localePath(locale) },
    { name: ui.hubCrumb, path: localePath(locale, 'assessments') },
  ]);

  return (
    <main className={`un ${baloo2.variable} ${nunito.variable}`}>
      <div className="un-wrap">
        <BreadcrumbTrail locale={locale} trail={[{ label: ui.hubCrumb }]} />

        <header className="un-head">
          <p className="un-eyebrow">{ui.hubEyebrow}</p>
          <h1 className="un-title">{ui.hubTitle}</h1>
          <p className="un-hub-lead">{ui.hubLead}</p>
          <p className="un-facts">
            <span>{fill(ui.hubFactChecks, { n: rows.length })}</span>
            <span>{ui.hubFactForms}</span>
          </p>
          <p className="un-check-honest">{ui.hubHonest}</p>
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
                <ol className="un-hub-units">
                  {s.rows.map(({ check, unit }) => (
                    <li key={unit.id} className="un-hub-unit">
                      <h4 className="un-hub-unit-title"><a href={`/${locale}/units/${unit.slug}#unit-check`}>{fill(ui.hubCheckName, { unit: unit.title })}</a></h4>
                      <p className="un-hub-unit-facts">
                        {[fill(ui.hubFactParts, { n: check.parts.length }), tasks(tasksOf(check)), fill(ui.hubFactPages, { pages: pages(check.forms.A.pages) })].join(' · ')}
                      </p>
                      <p className="un-hub-unit-lessons">{fill(ui.hubCheckParts, { list: check.parts.map((p) => p.title).join(' · ') })}</p>
                      <p className="un-check-files">
                        <a className="un-check-btn un-check-btn-line" href={checkFormHref(locale, check.unit, 'a')} rel="nofollow">{ui.formA}</a>
                        <a className="un-check-btn un-check-btn-line" href={checkFormHref(locale, check.unit, 'b')} rel="nofollow">{ui.formB}</a>
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </section>
        ))}

        <p className="un-hub-note">{ui.formsNote} {fill(ui.teacherNote, { plan: tTier('name') })}</p>
        <p className="un-hub-note">{ui.hubCoverage}</p>
        <p className="un-hub-note"><a href={`/${locale}/units`}>{ui.hubUnitsLink}</a></p>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, '\\u003c') }} />
    </main>
  );
}
