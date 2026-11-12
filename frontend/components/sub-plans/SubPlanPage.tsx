/* A sub pack's page: /<locale>/sub-plans/<slug> (Daily Teaching System, Parts 3 and 5).
 *
 * The page says plainly what is in the pack and shows the day and two of its pages to everyone; the pack itself (the
 * guest teacher pages and the whole day in one file) is Teacher-only and goes through the gate. Same look as a unit's
 * page (components/units/units.css) with the day as a timetable. */
import '@/components/units/units.css';
import '@/components/sub-plans/sub-plans.css';
import { baloo2, nunito } from '@/lib/fonts/direction-a';
import { getTranslations } from 'next-intl/server';
import { canonicalUrl, localePath } from '@/lib/seo/url';
import { buildBreadcrumbSchema } from '@/lib/seo/breadcrumb-schema';
import { getHreflangCode } from '@/lib/seo/hreflang';
import BreadcrumbTrail from '@/components/breadcrumbs/BreadcrumbTrail';
import { teacherFileHref } from '@/lib/teacher-files';
import { fill, pageHref, pageThumb } from '@/lib/units';
import { SubPack, SubUi, subPackPdfList, subPackScriptFile } from '@/lib/sub-plans';
import UnitBundleButton from '@/components/units/UnitBundleButton';
import SaveToCollectionsButton from '@/components/units/SaveToCollectionsButton';
import { TeacherFileClicks } from '@/components/tracking/PathEvents';

const LEVEL_KEY: Record<string, string> = { P: 'preschool', K: 'kindergarten', '1': 'grade_1', '2': 'grade_2', '3': 'grade_3', '4': 'grade_4', '5': 'grade_5' };

export default async function SubPlanPage({ locale, pack, ui, others = [] }: { locale: string; pack: SubPack; ui: SubUi; others?: SubPack[] }) {
  const [tLevel, tTier, tBreadcrumb] = await Promise.all([
    getTranslations({ locale, namespace: 'seo.educational_level' }),
    getTranslations({ locale, namespace: 'pricingPage.tier' }),
    getTranslations({ locale, namespace: 'topicPage.breadcrumb' }),
  ]);
  const plan = tTier('name');
  const gradeLabel = LEVEL_KEY[pack.grade] ? tLevel(LEVEL_KEY[pack.grade]) : pack.grade;
  const url = canonicalUrl(localePath(locale, 'sub-plans', pack.slug));
  const scriptHref = teacherFileHref(locale, subPackScriptFile(pack));
  const pdfs = subPackPdfList(locale, pack);
  const sheets = pack.blocks.reduce((n, b) => n + 1 + (b.hard ? 1 : 0) + (b.easy ? 1 : 0), 0);
  const inside = [ui.insideNote, fill(ui.insideScript, { n: pack.blocks.length }), fill(ui.insidePages, { n: sheets }), ui.insideForms, ui.insideClass];
  // two sample pages: the reading block and the math block (every pack has both)
  const samples = ['reading', 'math'].map((k) => pack.blocks.find((b) => b.key === k)).filter(Boolean) as SubPack['blocks'];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LearningResource',
    name: pack.title,
    description: pack.metaDescription,
    url,
    inLanguage: getHreflangCode(locale),
    educationalLevel: gradeLabel,
    learningResourceType: 'lesson plan',
    timeRequired: `PT${pack.minutes}M`,
    provider: { '@type': 'Organization', name: 'LessonCraftStudio', url: 'https://www.lessoncraftstudio.com' },
    // the page is open to everyone; the two files of the box ".un-teacher" are not (PLAN.md §5 rule 10)
    isAccessibleForFree: false,
    hasPart: [{ '@type': 'WebPageElement', isAccessibleForFree: false, cssSelector: '.un-teacher' }],
  };
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: tBreadcrumb('home'), path: localePath(locale) },
    { name: ui.hubCrumb, path: localePath(locale, 'sub-plans') },
    { name: pack.title, path: localePath(locale, 'sub-plans', pack.slug) },
  ]);

  return (
    <main className={`un sp ${baloo2.variable} ${nunito.variable}`}>
      <TeacherFileClicks surface="sub-plan" />
      <div className="un-wrap">
        <BreadcrumbTrail locale={locale} trail={[{ label: ui.hubCrumb, href: localePath(locale, 'sub-plans') }, { label: pack.title }]} />
        {pack.status === 'pilot' ? <p className="un-pilot" role="note">{ui.pilotBanner}</p> : null}

        <header className="un-head">
          <p className="un-eyebrow">{[gradeLabel, ui.packWord, ui[`position_${pack.position}`]].join(' · ')}</p>
          <h1 className="un-title">{pack.title}</h1>
          <p className="un-facts">
            <span>{fill(ui.factBlocks, { n: pack.blocks.length })}</span>
            <span>{fill(ui.factMinutes, { n: pack.minutes })}</span>
            <span>{ui.factReview}</span>
          </p>
        </header>

        <div className="un-top">
          <section className="un-inside" aria-labelledby="sp-inside-title">
            <h2 id="sp-inside-title">{ui.insideTitle}</h2>
            <ul>{inside.map((s) => <li key={s}>{s}</li>)}</ul>
          </section>

          <section className="un-teacher" aria-labelledby="sp-teacher-title">
            <h2 id="sp-teacher-title">{ui.teacherTitle}</h2>
            <p>{ui.teacherLead}</p>
            <UnitBundleButton
              locale={locale}
              guideHref={scriptHref}
              pdfs={pdfs}
              fileName={`${pack.slug}.pdf`}
              labels={{ button: ui.bundleBtn, working: ui.bundleWorking, done: ui.bundleDone, failed: ui.bundleFailed }}
            />
            <a className="un-btn un-btn-ghost" href={scriptHref} rel="nofollow">{ui.scriptBtn}</a>
            <SaveToCollectionsButton locale={locale} kind="sub-plan" slug={pack.slug} labels={{ button: ui.saveBtn, done: ui.saveDone, open: ui.saveOpen, failed: ui.saveFailed }} />
            <p className="un-teacher-plan">{fill(ui.planNote, { plan })}</p>
            <p className="un-teacher-how">{ui.bundleHow}</p>
          </section>
        </div>

        <section aria-labelledby="sp-day-title">
          <h2 id="sp-day-title" className="un-lessons-title">{ui.dayTitle}</h2>
          <div className="sp-day-scroll">
            <table className="sp-day">
              <thead>
                <tr><th scope="col">{ui.dayColBlock}</th><th scope="col">{ui.dayColPage}</th><th scope="col" className="sp-day-min">{ui.dayColTime}</th></tr>
              </thead>
              <tbody>
                {pack.blocks.map((b, i) => (
                  <tr key={b.key}>
                    <th scope="row"><span className="sp-day-no">{i + 1}</span>{ui[`block_${b.key}`]}</th>
                    <td>
                      <p className="sp-day-title">{b.title}</p>
                      <p className="sp-day-levels">
                        <a href={pageHref(locale, b.core)}>{ui.levelCore}</a>
                        {b.easy ? <a href={pageHref(locale, b.easy)}>{ui.levelEasy}</a> : null}
                        {b.hard ? <a href={pageHref(locale, b.hard)}>{ui.levelHard}</a> : null}
                      </p>
                    </td>
                    <td className="sp-day-min">{fill(ui.minutes, { n: b.minutes })}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {samples.length ? (
          <section aria-labelledby="sp-samples-title">
            <h2 id="sp-samples-title" className="un-lessons-title">{ui.samplesTitle}</h2>
            <ul className="sp-samples">
              {samples.map((b) => (
                <li key={b.key}>
                  <a href={pageHref(locale, b.core)} className="sp-sample">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={pageThumb(locale, b.core)} alt="" width={360} height={466} loading="lazy" decoding="async" />
                    <span className="sp-sample-name">{ui[`block_${b.key}`]}: {b.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {/* the other days of the same grade, in the order of the year: a teacher who is out again takes the next one */}
        {others.length ? (
          <nav className="sp-more" aria-labelledby="sp-more-title">
            <h2 id="sp-more-title" className="un-lessons-title">{fill(ui.moreTitle, { grade: gradeLabel })}</h2>
            <ul>
              {others.map((o) => <li key={o.id}><a href={`/${locale}/sub-plans/${o.slug}`}>{o.title}</a></li>)}
            </ul>
            <p><a href={`/${locale}/sub-plans`}>{ui.allPacks}</a></p>
          </nav>
        ) : null}
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, '\\u003c') }} />
    </main>
  );
}
