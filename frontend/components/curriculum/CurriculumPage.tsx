/* A curriculum page: /<locale>/curriculum/<slug> (Daily Teaching System, Part 6).
 *
 * One framework, one grade, one subject: the framework's objectives by their official codes, each with OUR description
 * of what the children do, the lessons that teach it and their worksheets; the codes the site has nothing for are
 * listed too. Everything on it is generated (content/curriculum-pages/pages.<loc>.json); the only prose is the page's
 * own strings (ui.<loc>.json). The wording of an objective is never shown: the page links the official document.
 * The same page for everyone: no cookie, no query. Same look as the units (components/units/units.css). */
import '@/components/units/units.css';
import '@/components/curriculum/curriculum.css';
import { baloo2, nunito } from '@/lib/fonts/direction-a';
import { getTranslations } from 'next-intl/server';
import { canonicalUrl, localePath } from '@/lib/seo/url';
import { buildBreadcrumbSchema } from '@/lib/seo/breadcrumb-schema';
import { getHreflangCode } from '@/lib/seo/hreflang';
import BreadcrumbTrail from '@/components/breadcrumbs/BreadcrumbTrail';
import { fill, pageHref } from '@/lib/units';
import { CurriculumPageData, CurriculumUi } from '@/lib/curriculum-pages';

const LEVEL_KEY: Record<string, string> = { P: 'preschool', K: 'kindergarten', '1': 'grade_1', '2': 'grade_2', '3': 'grade_3', '4': 'grade_4', '5': 'grade_5' };
const anchor = (s: string) => 'area-' + s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export default async function CurriculumPage({ locale, page, ui, others, hubCodes }: {
  locale: string;
  page: CurriculumPageData;
  ui: CurriculumUi;
  /** the other pages the hub lists, the ones of the same framework first */
  others: CurriculumPageData[];
  /** the codes that have a standards hub of their own (/<locale>/standards/<code>), by their lower-case form */
  hubCodes: Record<string, string>;
}) {
  const [tLevel, tBreadcrumb] = await Promise.all([
    getTranslations({ locale, namespace: 'seo.educational_level' }),
    getTranslations({ locale, namespace: 'topicPage.breadcrumb' }),
  ]);
  const gradeLabel = (g: string) => (LEVEL_KEY[g] ? tLevel(LEVEL_KEY[g]) : g);
  const grade = gradeLabel(page.grade);
  const url = canonicalUrl(localePath(locale, 'curriculum', page.slug));
  const subject = ui[`subject_${page.subject}`] || page.subject;
  const taughtItems = page.groups.flatMap((g) => g.items.filter((i) => i.state === 'taught'));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: page.title,
    description: page.metaDescription,
    url,
    inLanguage: getHreflangCode(locale),
    educationalLevel: grade,
    about: { '@type': 'Thing', name: page.frameworkTitle },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: taughtItems.length,
      itemListElement: taughtItems.map((it, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: `${page.frameworkShort} ${it.code}`,
        ...(it.lessons && it.lessons[0] ? { url: canonicalUrl(localePath(locale, 'units', it.lessons[0].unit)) + `#lesson-${it.lessons[0].n}` } : {}),
      })),
    },
  };
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: tBreadcrumb('home'), path: localePath(locale) },
    { name: ui.hubCrumb, path: localePath(locale, 'curriculum') },
    { name: page.title, path: localePath(locale, 'curriculum', page.slug) },
  ]);

  return (
    <main className={`un cu ${baloo2.variable} ${nunito.variable}`}>
      <div className="un-wrap">
        <BreadcrumbTrail locale={locale} trail={[{ label: ui.hubCrumb, href: localePath(locale, 'curriculum') }, { label: page.title }]} />
        {page.status === 'pilot' ? <p className="un-pilot" role="note">{ui.pilotBanner}</p> : null}

        <header className="un-head">
          <p className="un-eyebrow">{fill(ui.eyebrow, { framework: page.frameworkShort, grade })}</p>
          <h1 className="un-title un-title-wide">{page.title}</h1>
          <p className="un-hub-lead">{fill(ui.lead, { framework: page.frameworkShort, subject, grade })}</p>
          <p className="un-facts">
            <span>{fill(ui.factTaught, { n: page.counts.taught })}</span>
            {page.counts.near ? <span>{fill(ui.factNear, { n: page.counts.near })}</span> : null}
            {page.counts.open ? <span>{fill(ui.factOpen, { n: page.counts.open })}</span> : null}
            <span>{fill(ui.factLessons, { n: page.counts.lessons })}</span>
          </p>
        </header>

        <section className="cu-how" aria-labelledby="cu-how-title">
          <h2 id="cu-how-title">{ui.howTitle}</h2>
          <p>{ui.howText}</p>
          <p>{ui.officialLead} <a href={page.officialDocument} rel="noopener">{fill(ui.officialLink, { title: page.frameworkTitle, year: page.year })}</a></p>
        </section>

        <section aria-labelledby="cu-groups-title">
          <h2 id="cu-groups-title" className="cu-groups-title">{ui.groupsTitle}</h2>
          <nav className="un-hub-jump" aria-label={ui.groupsTitle}>
            <ul>
              {page.groups.map((g) => <li key={g.title}><a href={`#${anchor(g.title)}`}>{g.title}</a></li>)}
            </ul>
          </nav>

          {page.groups.map((g) => (
            <section key={g.title} className="cu-group" id={anchor(g.title)} aria-labelledby={`${anchor(g.title)}-title`}>
              <h3 id={`${anchor(g.title)}-title`} className="cu-group-title">{g.title}</h3>
              {g.items.length ? (
                <ul className="cu-items">
                  {g.items.map((it) => {
                    const hub = hubCodes[it.code.toLowerCase()];
                    return (
                      <li key={it.code} className={`cu-item cu-item-${it.state}`}>
                        <p className="cu-code">{it.code}</p>
                        <div className="cu-body">
                          {it.state === 'near' && it.rel ? <p className="cu-rel">{ui[`rel_${it.rel}`]}</p> : null}
                          <p className="cu-text">{it.text}</p>
                          {it.lessons && it.lessons.length ? (
                            <ul className="cu-links" aria-label={ui.lessonsLabel}>
                              {it.lessons.map((l) => (
                                <li key={`${l.unit}-${l.n}`}>
                                  <a href={`/${locale}/units/${l.unit}#lesson-${l.n}`}>{fill(ui.lessonLink, { n: l.n, title: l.title })}</a>{' '}
                                  <span className="cu-unit">{l.unitGrade === page.grade ? fill(ui.lessonUnit, { unit: l.unitTitle }) : fill(ui.lessonUnitOther, { unit: l.unitTitle, grade: gradeLabel(l.unitGrade) })}</span>
                                </li>
                              ))}
                            </ul>
                          ) : null}
                          {it.papers && it.papers.length ? (
                            <p className="cu-papers"><span className="cu-papers-label">{ui.papersLabel}:</span>{' '}
                              {it.papers.map((p, i) => <span key={p.core}>{i ? ' · ' : ''}<a href={pageHref(locale, p.core)}>{p.title}</a></span>)}
                            </p>
                          ) : null}
                          {hub ? <p className="cu-hub"><a href={`/${locale}/standards/${hub}`}>{fill(ui.hubLink, { code: hub })}</a></p> : null}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              ) : null}
              {g.open && g.open.length ? (
                <div className="cu-open">
                  <h4 className="cu-open-title">{ui.openTitle}</h4>
                  <p>{ui.openLead}</p>
                  <ul className="cu-open-codes">{g.open.map((c) => <li key={c}>{c}</li>)}</ul>
                </div>
              ) : null}
            </section>
          ))}
        </section>

        {others.length ? (
          <section className="un-around" aria-labelledby="cu-more-title">
            <h2 id="cu-more-title">{ui.moreTitle}</h2>
            <ul className="cu-more">
              {others.map((p) => <li key={p.id}><a href={`/${locale}/curriculum/${p.slug}`}>{p.title}</a></li>)}
            </ul>
            <p className="cu-more-all"><a href={`/${locale}/curriculum`}>{ui.allPages}</a> · <a href={`/${locale}/units`}>{ui.unitsLink}</a></p>
          </section>
        ) : null}

        <p className="un-hub-note">{ui.hubNote}</p>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, '\\u003c') }} />
    </main>
  );
}
