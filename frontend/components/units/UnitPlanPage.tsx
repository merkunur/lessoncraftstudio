/* A year plan (scope and sequence): /<locale>/units/<plan-slug> (Daily Teaching System, Part 4.4).
 *
 * The units of one grade and subject in teaching order, with the weeks each takes, its lessons and the standards it
 * teaches. Generated from content/units/units.<loc>.json (`plans`, written by scripts/units/assemble.js). The page
 * says how many weeks its lessons take and that they do not fill a school year; it never claims more.
 * The printable plan is a Teacher-only file (a link to the gate, like a unit's teacher guide). */
import '@/components/units/units.css';
import { baloo2, nunito } from '@/lib/fonts/direction-a';
import { getTranslations } from 'next-intl/server';
import { canonicalUrl, localePath } from '@/lib/seo/url';
import { buildBreadcrumbSchema } from '@/lib/seo/breadcrumb-schema';
import { getHreflangCode } from '@/lib/seo/hreflang';
import BreadcrumbTrail from '@/components/breadcrumbs/BreadcrumbTrail';
import { teacherFileHref } from '@/lib/teacher-files';
import { UnitPlan, UnitUi, fill, planFile } from '@/lib/units';
import { LEVEL_KEY } from '@/components/units/UnitsHub';
import { TeacherFileClicks } from '@/components/tracking/PathEvents';
import TeacherGate from '@/components/teacher-gate/TeacherGate';
import { getTeacherGate } from '@/lib/teacher-gate';

export default async function UnitPlanPage({ locale, plan, ui }: { locale: string; plan: UnitPlan; ui: UnitUi }) {
  const [tLevel, tTier, tBreadcrumb] = await Promise.all([
    getTranslations({ locale, namespace: 'seo.educational_level' }),
    getTranslations({ locale, namespace: 'pricingPage.tier' }),
    getTranslations({ locale, namespace: 'topicPage.breadcrumb' }),
  ]);
  const gradeLabel = LEVEL_KEY[plan.grade] ? tLevel(LEVEL_KEY[plan.grade]) : plan.grade;
  const gate = await getTeacherGate(locale);
  const subjectLabel = ui[`subject_${plan.subject}`] || plan.subject;
  const url = canonicalUrl(localePath(locale, 'units', plan.slug));
  const lessons = plan.units.reduce((n, r) => n + r.lessons.length, 0);
  const weeksOf = (r: { from: number; to: number }) => (r.from === r.to ? fill(ui.planWeekOne, { n: r.from }) : fill(ui.planWeeksRange, { from: r.from, to: r.to }));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: plan.title,
    description: plan.metaDescription,
    url,
    inLanguage: getHreflangCode(locale),
    itemListOrder: 'https://schema.org/ItemListOrderAscending',
    numberOfItems: plan.units.length,
    itemListElement: plan.units.map((r, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: { '@type': 'Course', name: r.title, url: canonicalUrl(localePath(locale, 'units', r.slug)), educationalLevel: gradeLabel, about: subjectLabel, provider: { '@type': 'Organization', name: 'LessonCraftStudio', url: 'https://www.lessoncraftstudio.com' } },
    })),
  };
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: tBreadcrumb('home'), path: localePath(locale) },
    { name: ui.hubCrumb, path: localePath(locale, 'units') },
    { name: plan.title, path: localePath(locale, 'units', plan.slug) },
  ]);

  return (
    <main className={`un ${baloo2.variable} ${nunito.variable}`}>
      {gate ? <TeacherGate locale={locale} plan={tTier('name')} surface="year-plan" gate={gate} /> : <TeacherFileClicks surface="year-plan" />}
      <div className="un-wrap">
        <BreadcrumbTrail locale={locale} trail={[{ label: ui.hubCrumb, href: `/${locale}/units` }, { label: plan.title }]} />
        {plan.status === 'pilot' ? <p className="un-pilot" role="note">{ui.pilotBanner}</p> : null}

        <header className="un-head">
          <p className="un-eyebrow">{[gradeLabel, subjectLabel, ui.planEyebrow].join(' · ')}</p>
          <h1 className="un-title un-title-wide">{plan.title}</h1>
          <p className="un-hub-lead">{fill(ui.planLead, { units: plan.units.length, lessons, weeks: plan.weeks })}</p>
          <p className="un-plan-honest">{ui.planHonest}</p>
        </header>

        <section aria-labelledby="un-plan-table-title">
          <h2 id="un-plan-table-title" className="un-lessons-title">{ui.planTableTitle}</h2>
          <ol className="un-plan">
            {plan.units.map((r) => (
              <li key={r.id} className="un-plan-row">
                <p className="un-plan-weeks">{weeksOf(r)}</p>
                <div className="un-plan-body">
                  <h3 className="un-plan-unit"><a href={`/${locale}/units/${r.slug}`}>{r.title}</a></h3>
                  <ol className="un-plan-lessons" aria-label={ui.planColLessons}>
                    {r.lessons.map((t, i) => <li key={i}>{t}</li>)}
                  </ol>
                  {r.standards.length ? (
                    <p className="un-plan-standards">
                      <span className="un-plan-standards-name">{[ui.planColStandards, plan.framework].filter(Boolean).join(', ')}:</span>{' '}
                      {r.standards.join(', ')}
                    </p>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="un-teacher un-plan-pdf" aria-labelledby="un-plan-pdf-title">
          <h2 id="un-plan-pdf-title">{ui.planPdfTitle}</h2>
          <p>{ui.planPdfLead}</p>
          <a className="un-btn un-btn-main" href={teacherFileHref(locale, planFile(plan))} rel="nofollow">{ui.planPdfBtn}</a>
          <p className="un-teacher-plan">{fill(ui.planPdfNote, { plan: tTier('name') })}</p>
        </section>

        <p className="un-plan-back"><a href={`/${locale}/units`}>{ui.planAllUnits}</a></p>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, '\\u003c') }} />
    </main>
  );
}
