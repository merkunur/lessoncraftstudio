/* A unit's page: /<locale>/units/<slug> (Daily Teaching System, Parts 3 and 4).
 *
 * Everything on it is generated from the unit's data (content/units/units.<loc>.json): the lesson list, the pages,
 * tools, activities and makers of each lesson, the national objective. The only prose is the teacher note of each
 * teaching point. Anonymous visitors, signed-in teachers and crawlers get the same page; the two Teacher-only files
 * are links to the gate (/api/quota/dl?kind=teacher), which answers everybody but a subscriber with a redirect. */
import '@/components/units/units.css';
import { baloo2, nunito } from '@/lib/fonts/direction-a';
import { getTranslations } from 'next-intl/server';
import { canonicalUrl, localePath } from '@/lib/seo/url';
import { buildBreadcrumbSchema } from '@/lib/seo/breadcrumb-schema';
import { getHreflangCode } from '@/lib/seo/hreflang';
import BreadcrumbTrail from '@/components/breadcrumbs/BreadcrumbTrail';
import { makerAppUrl } from '@/lib/makers/landings';
import { teacherFileHref } from '@/lib/teacher-files';
import { Unit, UnitLesson, UnitUi, fill, pageHref, pageThumb, unitGuideFile, unitPdfList } from '@/lib/units';
import UnitBundleButton from '@/components/units/UnitBundleButton';
import SaveToCollectionsButton from '@/components/units/SaveToCollectionsButton';

const LEVEL_KEY: Record<string, string> = { P: 'preschool', K: 'kindergarten', '1': 'grade_1', '2': 'grade_2', '3': 'grade_3', '4': 'grade_4', '5': 'grade_5' };

function Standards({ lesson, ui }: { lesson: UnitLesson; ui: UnitUi }) {
  if (!lesson.standards.length) return null;
  const label = { teaches: ui.standardTeaches, reviews: ui.standardReviews, ahead: ui.standardAhead, prepares: ui.standardPrepares, extends: ui.standardExtends };
  return (
    <ul className="un-standards">
      {lesson.standards.map((s, i) => (
        <li key={i} className={`un-standard un-standard-${s.rel}`}>
          <span className="un-standard-rel">{label[s.rel]}</span>
          <span className="un-standard-code">{[s.framework, s.code].filter(Boolean).join(' ')}</span>
          {s.title ? <span className="un-standard-title">{s.title}</span> : null}
        </li>
      ))}
    </ul>
  );
}

function Lesson({ lesson, locale, ui }: { lesson: UnitLesson; locale: string; ui: UnitUi }) {
  return (
    <section className="un-lesson" id={`lesson-${lesson.n}`} aria-labelledby={`lesson-${lesson.n}-title`}>
      <header className="un-lesson-head">
        <p className="un-lesson-no">{fill(ui.lessonWord, { n: lesson.n })}</p>
        <h3 id={`lesson-${lesson.n}-title`} className="un-lesson-title">{lesson.title}</h3>
        <p className="un-lesson-objective">{lesson.objective}</p>
        <Standards lesson={lesson} ui={ui} />
      </header>

      <div className="un-slots">
        {lesson.tool ? (
          <div className="un-slot">
            <h4 className="un-slot-name">{ui.slotTool}</h4>
            <p className="un-slot-text">
              <a href={`/${locale}/tools/${lesson.tool.slug}`}>{fill(ui.slotToolText, { name: lesson.tool.name })}</a>
            </p>
          </div>
        ) : null}

        <div className="un-slot un-slot-paper">
          <h4 className="un-slot-name">{ui.slotPaper}</h4>
          <ul className="un-pages">
            {lesson.paper.map((p) => (
              <li key={p.type} className="un-page">
                <a className="un-page-thumb" href={pageHref(locale, p.core, p.landing)} aria-hidden="true" tabIndex={-1}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={pageThumb(locale, p.core)} alt="" width={120} height={155} loading="lazy" decoding="async" />
                </a>
                <div className="un-page-body">
                  <p className="un-page-title">{p.title}</p>
                  <p className="un-page-levels">
                    <a href={pageHref(locale, p.core, p.landing)}>{ui.levelCore}</a>
                    {p.easy ? <a href={pageHref(locale, p.easy)}>{ui.levelEasy}</a> : null}
                    {p.hard ? <a href={pageHref(locale, p.hard)}>{ui.levelHard}</a> : null}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {lesson.screen ? (
          <div className="un-slot">
            <h4 className="un-slot-name">{ui.slotScreen}</h4>
            <p className="un-slot-text">
              {lesson.screen.kind === 'activity'
                ? <a href={`/${locale}/activities/${lesson.screen.slug}`}>{lesson.screen.title}</a>
                : <a href={pageHref(locale, lesson.screen.slug)}>{fill(ui.slotScreenPage, { title: lesson.screen.title })}</a>}
            </p>
          </div>
        ) : null}

        {lesson.exit ? (
          <div className="un-slot">
            <h4 className="un-slot-name">{ui.slotExit}</h4>
            <p className="un-slot-text"><a href={pageHref(locale, lesson.exit.slug)}>{fill(ui.slotExitText, { title: lesson.exit.title })}</a></p>
          </div>
        ) : null}

        {lesson.maker ? (
          <div className="un-slot">
            <h4 className="un-slot-name">{ui.slotMaker}</h4>
            <p className="un-slot-text"><a href={makerAppUrl(lesson.maker.id, locale, lesson.maker.template)}>{fill(ui.slotMakerText, { name: lesson.maker.name })}</a></p>
          </div>
        ) : null}
      </div>

      <aside className="un-note" aria-label={ui.noteTitle}>
        <p className="un-note-title">{ui.noteTitle}</p>
        <dl>
          <dt>{ui.noteMistake}</dt><dd>{lesson.note.mistake}</dd>
          <dt>{ui.noteWords}</dt><dd>{lesson.note.words}</dd>
          <dt>{ui.noteWatch}</dt><dd>{lesson.note.watch}</dd>
        </dl>
      </aside>
    </section>
  );
}

export default async function UnitPage({ locale, unit, ui }: { locale: string; unit: Unit; ui: UnitUi }) {
  const [tLevel, tTier] = await Promise.all([
    getTranslations({ locale, namespace: 'seo.educational_level' }),
    getTranslations({ locale, namespace: 'pricingPage.tier' }),
  ]);
  const plan = tTier('name');
  const gradeLabel = LEVEL_KEY[unit.grade] ? tLevel(LEVEL_KEY[unit.grade]) : unit.grade;
  const subjectLabel = ui[`subject_${unit.subject}`] || unit.subject;
  const url = canonicalUrl(localePath(locale, 'units', unit.slug));

  const count = {
    lessons: unit.lessons.length,
    pages: unit.lessons.reduce((n, l) => n + l.paper.reduce((m, p) => m + 1 + (p.easy ? 1 : 0) + (p.hard ? 1 : 0), 0), 0),
    tools: new Set(unit.lessons.map((l) => l.tool?.key).filter(Boolean)).size,
    screen: unit.lessons.filter((l) => l.screen).length,
    exit: unit.lessons.filter((l) => l.exit).length,
    makers: unit.lessons.filter((l) => l.maker).length,
  };
  const inside = [
    fill(ui.insideLessons, { n: count.lessons }),
    fill(ui.insidePages, { n: count.pages }),
    count.tools ? fill(ui.insideTools, { n: count.tools }) : null,
    count.screen ? fill(ui.insideScreen, { n: count.screen }) : null,
    count.exit ? fill(ui.insideExit, { n: count.exit }) : null,
    count.makers === count.lessons ? ui.insideMakers : null,
  ].filter(Boolean) as string[];

  const guideHref = teacherFileHref(locale, unitGuideFile(unit));
  const pdfs = unitPdfList(locale, unit);

  const teaches = [...new Set(unit.lessons.flatMap((l) => l.standards.filter((s) => s.rel === 'teaches' && s.code).map((s) => `${s.framework} ${s.code}`)))];
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: unit.title,
    description: unit.metaDescription,
    url,
    inLanguage: getHreflangCode(locale),
    educationalLevel: gradeLabel,
    about: subjectLabel,
    provider: { '@type': 'Organization', name: 'LessonCraftStudio', url: 'https://www.lessoncraftstudio.com' },
    teaches: unit.lessons.map((l) => l.objective),
    ...(teaches.length ? { educationalAlignment: teaches.map((t) => ({ '@type': 'AlignmentObject', alignmentType: 'teaches', targetName: t })) } : {}),
    // the page is open to everyone; the two files of the box ".un-teacher" are not (PLAN.md §5 rule 10)
    isAccessibleForFree: false,
    hasPart: [
      ...unit.lessons.map((l) => ({ '@type': 'LearningResource', name: l.title, position: l.n, url: `${url}#lesson-${l.n}`, learningResourceType: 'lesson plan' })),
      { '@type': 'WebPageElement', isAccessibleForFree: false, cssSelector: '.un-teacher' },
    ],
  };
  const tBreadcrumb = await getTranslations({ locale, namespace: 'topicPage.breadcrumb' });
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: tBreadcrumb('home'), path: localePath(locale) },
    { name: unit.title, path: localePath(locale, 'units', unit.slug) },
  ]);

  return (
    <main className={`un ${baloo2.variable} ${nunito.variable}`}>
      <div className="un-wrap">
        <BreadcrumbTrail locale={locale} trail={[{ label: unit.title }]} />
        {unit.status === 'pilot' ? <p className="un-pilot" role="note">{ui.pilotBanner}</p> : null}

        <header className="un-head">
          <p className="un-eyebrow">{[gradeLabel, subjectLabel, ui.unitWord].join(' · ')}</p>
          <h1 className="un-title">{unit.title}</h1>
          <p className="un-facts">
            <span>{fill(ui.factLessons, { n: count.lessons })}</span>
            <span>{unit.weeks === 1 ? ui.factWeek : fill(ui.factWeeks, { n: unit.weeks })}</span>
          </p>
        </header>

        <div className="un-top">
          <section className="un-inside" aria-labelledby="un-inside-title">
            <h2 id="un-inside-title">{ui.insideTitle}</h2>
            <ul>{inside.map((s) => <li key={s}>{s}</li>)}</ul>
            <nav className="un-jump" aria-label={ui.jumpTitle}>
              <ol>
                {unit.lessons.map((l) => <li key={l.n}><a href={`#lesson-${l.n}`}>{l.title}</a></li>)}
              </ol>
            </nav>
          </section>

          <section className="un-teacher" aria-labelledby="un-teacher-title">
            <h2 id="un-teacher-title">{ui.teacherTitle}</h2>
            <p>{ui.teacherLead}</p>
            <UnitBundleButton
              locale={locale}
              guideHref={guideHref}
              pdfs={pdfs}
              fileName={`${unit.slug}.pdf`}
              labels={{ button: ui.bundleBtn, working: ui.bundleWorking, done: ui.bundleDone, failed: ui.bundleFailed }}
            />
            <a className="un-btn un-btn-ghost" href={guideHref} rel="nofollow">{ui.guideBtn}</a>
            <SaveToCollectionsButton locale={locale} kind="unit" slug={unit.slug} labels={{ button: ui.saveBtn, done: ui.saveDone, open: ui.saveOpen, failed: ui.saveFailed }} />
            <p className="un-teacher-plan">{fill(ui.planNote, { plan })}</p>
            <p className="un-teacher-how">{ui.bundleHow}</p>
          </section>
        </div>

        <h2 className="un-lessons-title">{ui.lessonsTitle}</h2>
        {unit.lessons.map((l) => <Lesson key={l.n} lesson={l} locale={locale} ui={ui} />)}
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, '\\u003c') }} />
    </main>
  );
}
