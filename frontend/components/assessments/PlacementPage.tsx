/* A placement check of one skill path: /<locale>/assessments/placement/<slug> (Daily Teaching System, Part 7.8, Stage C-3).
 * The ladder of steps across grades (each the unit and lesson it comes from, linked to the lesson on the unit's page), the
 * stop rule, the two student forms (printables, counted like any download) and the Teacher-only files (answer keys, teacher
 * pages with where to start). Everything shown is generated (content/assessments/placement.<loc>.json,
 * content/units/units.<loc>.json); the only prose is the strings of content/assessments/ui.<loc>.json. The page says what
 * the check is not. The same page for everyone: no cookie, no query. */
import '@/components/units/units.css';
import '@/components/assessments/assessments.css';
import { baloo2, nunito } from '@/lib/fonts/direction-a';
import { getTranslations } from 'next-intl/server';
import { canonicalUrl, localePath } from '@/lib/seo/url';
import { buildBreadcrumbSchema } from '@/lib/seo/breadcrumb-schema';
import { getHreflangCode } from '@/lib/seo/hreflang';
import BreadcrumbTrail from '@/components/breadcrumbs/BreadcrumbTrail';
import { AssessmentUi, PlacementCheck, checkFormHref } from '@/lib/assessments';
import { teacherFileHref } from '@/lib/teacher-files';
import { Unit, fill } from '@/lib/units';
import { LEVEL_KEY } from '@/components/units/UnitsHub';
import { TeacherFileClicks } from '@/components/tracking/PathEvents';
import TeacherGate from '@/components/teacher-gate/TeacherGate';
import { getTeacherGate } from '@/lib/teacher-gate';

export default async function PlacementPage({ locale, ui, check, units }: { locale: string; ui: AssessmentUi; check: PlacementCheck; units: Unit[] }) {
  const [tLevel, tTier, tBreadcrumb, gate] = await Promise.all([
    getTranslations({ locale, namespace: 'seo.educational_level' }),
    getTranslations({ locale, namespace: 'pricingPage.tier' }),
    getTranslations({ locale, namespace: 'topicPage.breadcrumb' }),
    getTeacherGate(locale),
  ]);
  const planName = tTier('name');
  const gradeLabel = (g: string) => (LEVEL_KEY[g] ? tLevel(LEVEL_KEY[g]) : g);
  const title = ui[`placeMetaTitle_${check.path}`];
  const crumb = ui[`placePath_${check.path}`];
  const url = canonicalUrl(localePath(locale, 'assessments', 'placement', check.slug));
  const tasks = (n: number) => (n === 1 ? ui.taskOne : fill(ui.taskMany, { n }));
  const pages = (n: number) => (n === 1 ? ui.pagesOne : fill(ui.pagesMany, { n }));
  const unitOf = (id: string) => units.find((u) => u.id === id) ?? null;
  const file = (name: string) => teacherFileHref(locale, `checks/${check.id}/${name}`);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LearningResource',
    name: title,
    description: ui[`placeMeta_${check.path}`],
    url,
    inLanguage: getHreflangCode(locale),
    educationalLevel: check.grades.map(gradeLabel),
    learningResourceType: 'assessment',
    provider: { '@type': 'Organization', name: 'LessonCraftStudio', url: 'https://www.lessoncraftstudio.com' },
    // the page and the student forms are open to everyone; the answer keys and teacher pages (".un-year-teacher") are not
    isAccessibleForFree: false,
    hasPart: [{ '@type': 'WebPageElement', isAccessibleForFree: false, cssSelector: '.un-year-teacher' }],
  };
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: tBreadcrumb('home'), path: localePath(locale) },
    { name: ui.hubCrumb, path: localePath(locale, 'assessments') },
    { name: crumb, path: localePath(locale, 'assessments', 'placement', check.slug) },
  ]);

  return (
    <main className={`un ${baloo2.variable} ${nunito.variable}`}>
      {gate ? <TeacherGate locale={locale} plan={planName} surface="unit" gate={gate} /> : <TeacherFileClicks surface="unit" />}
      <div className="un-wrap">
        <BreadcrumbTrail locale={locale} trail={[{ label: ui.hubCrumb, href: `/${locale}/assessments` }, { label: crumb }]} />

        <header className="un-head">
          <p className="un-eyebrow">{ui.placeEyebrow}</p>
          <h1 className="un-title un-title-wide">{title}</h1>
          <p className="un-hub-lead">{ui.placePageLead}</p>
          <p className="un-check-honest">{ui.placeHonest}</p>
        </header>

        <section className="un-check" id="steps" aria-labelledby="steps-title">
          <h2 id="steps-title">{fill(ui.placeCheckTitle, { path: crumb })}</h2>
          <p className="un-check-lead"><b>{ui.placeStop}</b>{check.steps.some((s) => s.tasks === 1) && ui.placeStopOne ? <> {ui.placeStopOne}</> : null}</p>
          <ol className="un-check-parts">
            {check.steps.map((s) => {
              const u = unitOf(s.unit);
              const line = fill(ui.placeStepLine, { step: s.step, grade: gradeLabel(s.grade), unit: u?.title ?? s.unit, lesson: s.lesson, title: s.title });
              return (
                <li key={s.step}>
                  {u ? <a href={`/${locale}/units/${u.slug}#lesson-${s.lesson}`}>{line}</a> : <b>{line}</b>}{' '}
                  <span>({tasks(s.tasks)})</span>
                </li>
              );
            })}
            {check.writing && ui.placeWritingLine ? <li><span>{fill(ui.placeWritingLine, { n: check.writing.points.length })}</span></li> : null}
          </ol>
          <div className="un-check-files">
            <a className="un-check-btn" href={checkFormHref(locale, check.id, 'a')} rel="nofollow">{ui.formA} · {pages(check.forms.A.pages)}</a>
            <a className="un-check-btn" href={checkFormHref(locale, check.id, 'b')} rel="nofollow">{ui.formB} · {pages(check.forms.B.pages)}</a>
          </div>
          <p className="un-check-note">{ui.yearFormsUse} {ui.formsNote}</p>
          <div className="un-check-files un-year-teacher">
            <a className="un-check-btn un-check-btn-line" href={file('key-a')} rel="nofollow">{ui.keyA}</a>
            <a className="un-check-btn un-check-btn-line" href={file('key-b')} rel="nofollow">{ui.keyB}</a>
            <a className="un-check-btn un-check-btn-line" href={file('teacher-pages')} rel="nofollow">{ui.placeTeacherPages}</a>
          </div>
          <p className="un-check-note">{fill(ui.teacherNote, { plan: planName })}</p>
        </section>

        <p className="un-hub-note"><a href={`/${locale}/assessments`}>{ui.hubCrumb}</a> · <a href={`/${locale}/units`}>{ui.hubUnitsLink}</a></p>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, '\\u003c') }} />
    </main>
  );
}
