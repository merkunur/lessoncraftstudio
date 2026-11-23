/* The checks of the year of one grade and subject: /<locale>/assessments/<slug> (Daily Teaching System, Part 7.7,
 * Stage C-2). A check of the beginning, the middle and the end of the year (each shown when it is live), its parts with
 * the unit and the lesson each comes from (linked to the lesson on the unit's page), its two student forms (printables,
 * counted like any download) and its Teacher-only files (answer keys, teacher pages with what to re-teach).
 *
 * Everything shown is generated (content/assessments/year.<loc>.json, content/units/units.<loc>.json); the only prose is
 * the strings of content/assessments/ui.<loc>.json. The page says what the checks are not (honest copy: a classroom
 * check, no ranking of children, cut lines only a guide). The same page for everyone: no cookie, no query. */
import '@/components/units/units.css';
import '@/components/assessments/assessments.css';
import { baloo2, nunito } from '@/lib/fonts/direction-a';
import { getTranslations } from 'next-intl/server';
import { canonicalUrl, localePath } from '@/lib/seo/url';
import { buildBreadcrumbSchema } from '@/lib/seo/breadcrumb-schema';
import { getHreflangCode } from '@/lib/seo/hreflang';
import BreadcrumbTrail from '@/components/breadcrumbs/BreadcrumbTrail';
import { AssessmentUi, YearCheck, YearPage, checkFormHref } from '@/lib/assessments';
import { teacherFileHref } from '@/lib/teacher-files';
import { GRADE_ORDER, Unit, fill } from '@/lib/units';
import { LEVEL_KEY } from '@/components/units/UnitsHub';
import { TeacherFileClicks } from '@/components/tracking/PathEvents';
import TeacherGate from '@/components/teacher-gate/TeacherGate';
import { getTeacherGate } from '@/lib/teacher-gate';

export default async function YearChecksPage({ locale, ui, page, units }: { locale: string; ui: AssessmentUi; page: YearPage; units: Unit[] }) {
  const [tLevel, tTier, tBreadcrumb, gate] = await Promise.all([
    getTranslations({ locale, namespace: 'seo.educational_level' }),
    getTranslations({ locale, namespace: 'pricingPage.tier' }),
    getTranslations({ locale, namespace: 'topicPage.breadcrumb' }),
    getTeacherGate(locale),
  ]);
  const planName = tTier('name');
  const gradeLabel = (g: string) => (LEVEL_KEY[g] ? tLevel(LEVEL_KEY[g]) : g);
  const words = { grade: ui[`yearGrade_${page.grade}`], subject: ui[`yearSubject_${page.subject}`] };
  const title = fill(ui.yearPageTitle, words);
  const crumb = fill(ui.yearCrumb, words);
  const url = canonicalUrl(localePath(locale, 'assessments', page.slug));
  const tasks = (n: number) => (n === 1 ? ui.taskOne : fill(ui.taskMany, { n }));
  const pages = (n: number) => (n === 1 ? ui.pagesOne : fill(ui.pagesMany, { n }));
  const checkTitle = (c: YearCheck) => fill(ui.yearCheckTitle, { ...words, time: ui[`yearTime_${c.time}`] });
  const prevGrade = GRADE_ORDER[GRADE_ORDER.indexOf(page.grade) - 1];
  const lead = (c: YearCheck) => (c.time === 'beginning'
    ? (page.grade === 'K' ? ui[`yearLeadEntry_${page.subject}`] : fill(ui.yearLead_beginning, { prev: gradeLabel(prevGrade) }))
    : ui[`yearLead_${c.time}`]);
  const unitOf = (id: string) => units.find((u) => u.id === id) ?? null;
  const file = (c: YearCheck, name: string) => teacherFileHref(locale, `checks/${c.id}/${name}`);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LearningResource',
    name: title,
    description: ui[`yearMeta_${page.grade}_${page.subject}`],
    url,
    inLanguage: getHreflangCode(locale),
    educationalLevel: gradeLabel(page.grade),
    about: words.subject,
    learningResourceType: 'assessment',
    provider: { '@type': 'Organization', name: 'LessonCraftStudio', url: 'https://www.lessoncraftstudio.com' },
    // the page and the student forms are open to everyone; the answer keys and teacher pages (".un-year-teacher") are not
    isAccessibleForFree: false,
    hasPart: [
      ...page.checks.map((c) => ({ '@type': 'LearningResource', name: checkTitle(c), url: `${url}#${c.time}`, learningResourceType: 'assessment', educationalLevel: gradeLabel(page.grade) })),
      { '@type': 'WebPageElement', isAccessibleForFree: false, cssSelector: '.un-year-teacher' },
    ],
  };
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: tBreadcrumb('home'), path: localePath(locale) },
    { name: ui.hubCrumb, path: localePath(locale, 'assessments') },
    { name: crumb, path: localePath(locale, 'assessments', page.slug) },
  ]);

  return (
    <main className={`un ${baloo2.variable} ${nunito.variable}`}>
      {gate ? <TeacherGate locale={locale} plan={planName} surface="unit" gate={gate} /> : <TeacherFileClicks surface="unit" />}
      <div className="un-wrap">
        <BreadcrumbTrail locale={locale} trail={[{ label: ui.hubCrumb, href: `/${locale}/assessments` }, { label: crumb }]} />

        <header className="un-head">
          <p className="un-eyebrow">{ui.yearPageEyebrow}</p>
          <h1 className="un-title un-title-wide">{title}</h1>
          <p className="un-hub-lead">{ui.yearPageLead}</p>
          <p className="un-check-honest">{ui.yearHonest}</p>
          <nav className="un-hub-jump" aria-label={ui.yearPageEyebrow}>
            <ul>
              {page.checks.map((c) => <li key={c.id}><a href={`#${c.time}`}>{ui[`yearHeading_${c.time}`]}</a></li>)}
            </ul>
          </nav>
        </header>

        {page.checks.map((c) => (
          <section key={c.id} className="un-check" id={c.time} aria-labelledby={`${c.time}-title`}>
            <h2 id={`${c.time}-title`}>{ui[`yearHeading_${c.time}`]}</h2>
            <p className="un-check-lead">{lead(c)}</p>
            <ol className="un-check-parts">
              {c.parts.map((p) => {
                const u = unitOf(p.unit);
                const unitName = (u?.title ?? p.unit) + (u && u.grade !== page.grade ? ` ${fill(ui.yearPartGrade, { grade: gradeLabel(u.grade) })}` : '');
                const line = fill(ui.yearPartLine, { part: p.part, unit: unitName, lesson: p.lesson, title: p.title });
                return (
                  <li key={p.part}>
                    {u ? <a href={`/${locale}/units/${u.slug}#lesson-${p.lesson}`}>{line}</a> : <b>{line}</b>}{' '}
                    <span>({tasks(p.tasks)})</span>
                  </li>
                );
              })}
            </ol>
            <div className="un-check-files">
              <a className="un-check-btn" href={checkFormHref(locale, c.id, 'a')} rel="nofollow">{ui.formA} · {pages(c.forms.A.pages)}</a>
              <a className="un-check-btn" href={checkFormHref(locale, c.id, 'b')} rel="nofollow">{ui.formB} · {pages(c.forms.B.pages)}</a>
            </div>
            <p className="un-check-note">{ui.yearFormsUse} {ui.formsNote}</p>
            <div className="un-check-files un-year-teacher">
              <a className="un-check-btn un-check-btn-line" href={file(c, 'key-a')} rel="nofollow">{ui.keyA}</a>
              <a className="un-check-btn un-check-btn-line" href={file(c, 'key-b')} rel="nofollow">{ui.keyB}</a>
              <a className="un-check-btn un-check-btn-line" href={file(c, 'teacher-pages')} rel="nofollow">{ui.yearTeacherPages}</a>
            </div>
            <p className="un-check-note">{fill(ui.teacherNote, { plan: planName })}</p>
          </section>
        ))}

        <p className="un-hub-note"><a href={`/${locale}/assessments`}>{ui.hubCrumb}</a> · <a href={`/${locale}/units`}>{ui.hubUnitsLink}</a></p>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, '\\u003c') }} />
    </main>
  );
}
