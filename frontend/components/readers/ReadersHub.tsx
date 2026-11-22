/* The readers hub: /<locale>/readers (Daily Teaching System, Part 8.2).
 *
 * What the two series are, every book with a live mini-book page by phonics set and by level (a set or level with a
 * page of its own links to it), how to print and fold a mini-book and how to use the books. Generated from
 * content/readers/hubs.<loc>.json; the prose is content/readers/ui.<loc>.json. The same page for everyone. */
import '@/components/units/units.css';
import '@/components/readers/readers.css';
import { baloo2, nunito } from '@/lib/fonts/direction-a';
import { getTranslations } from 'next-intl/server';
import { localePath } from '@/lib/seo/url';
import { buildBreadcrumbSchema } from '@/lib/seo/breadcrumb-schema';
import BreadcrumbTrail from '@/components/breadcrumbs/BreadcrumbTrail';
import { ReaderHubs, ReaderUi, bookCount, fillReader } from '@/lib/readers';
import { BookCard, FoldSteps, HowToUse, JsonLd, SetSounds, booksJsonLd } from '@/components/readers/ReaderParts';

export default async function ReadersHub({ locale, hubs, ui }: { locale: string; hubs: ReaderHubs; ui: ReaderUi }) {
  const tBreadcrumb = await getTranslations({ locale, namespace: 'topicPage.breadcrumb' });
  const path = localePath(locale, 'readers');
  const n = bookCount(hubs);
  const allBooks = [...hubs.sets.flatMap((s) => s.books), ...hubs.levels.flatMap((l) => l.books)];
  const breadcrumb = buildBreadcrumbSchema([
    { name: tBreadcrumb('home'), path: localePath(locale) },
    { name: ui.crumb, path },
  ]);

  return (
    <main className={`un rd ${baloo2.variable} ${nunito.variable}`}>
      <div className="un-wrap">
        <BreadcrumbTrail locale={locale} trail={[{ label: ui.crumb }]} />

        <header className="un-head">
          <p className="un-eyebrow">{ui.indexEyebrow}</p>
          <h1 className="un-title un-title-wide">{ui.indexTitle}</h1>
          <p className="un-hub-lead">{ui.indexLead}</p>
          <p className="un-facts">
            <span>{fillReader(ui.factBooks, { n })}</span>
            {hubs.sets.length ? <span>{hubs.sets.length === 1 ? ui.factSet : fillReader(ui.factSets, { n: hubs.sets.length })}</span> : null}
            {hubs.levels.length ? <span>{hubs.levels.length === 1 ? ui.factLevel : fillReader(ui.factLevels, { n: hubs.levels.length })}</span> : null}
          </p>
          <nav className="un-hub-jump" aria-label={ui.jumpTitle}>
            <ul>
              {hubs.sets.length ? <li><a href="#decodable">{ui.jumpSets}</a></li> : null}
              {hubs.levels.length ? <li><a href="#picture">{ui.jumpLevels}</a></li> : null}
              <li><a href="#fold">{ui.jumpFold}</a></li>
            </ul>
          </nav>
        </header>

        <div className="rd-kinds">
          <section className="rd-kind" aria-labelledby="rd-kind-d">
            <h2 id="rd-kind-d" className="rd-h3">{ui.kindDecodableTitle}</h2>
            <p>{ui.kindDecodableText}</p>
          </section>
          <section className="rd-kind" aria-labelledby="rd-kind-p">
            <h2 id="rd-kind-p" className="rd-h3">{ui.kindPictureTitle}</h2>
            <p>{ui.kindPictureText}</p>
          </section>
        </div>

        {hubs.sets.length ? (
          <section className="un-hub-grade" id="decodable" aria-labelledby="decodable-title">
            <h2 id="decodable-title" className="un-hub-grade-title">{ui.setsTitle}</h2>
            <p className="rd-section-lead">{ui.setsLead}</p>
            {hubs.sets.map((s) => (
              <div key={s.slug} className="rd-group" id={s.slug}>
                <h3 className="un-hub-subject-title">
                  {s.hasPage ? <a href={`/${locale}/readers/${s.slug}`}>{fillReader(ui.setHeading, { n: s.n, skill: s.skill })}</a> : fillReader(ui.setHeading, { n: s.n, skill: s.skill })}
                </h3>
                <SetSounds set={s} ui={ui} />
                <ul className="rd-books">
                  {s.books.map((b) => <BookCard key={b.id} locale={locale} book={b} ui={ui} kind="set" as="h4" />)}
                </ul>
                {s.hasPage ? <p className="rd-group-link"><a href={`/${locale}/readers/${s.slug}`}>{fillReader(ui.groupOpen, { n: s.n })}</a></p> : null}
              </div>
            ))}
          </section>
        ) : null}

        {hubs.levels.length ? (
          <section className="un-hub-grade" id="picture" aria-labelledby="picture-title">
            <h2 id="picture-title" className="un-hub-grade-title">{ui.levelsTitle}</h2>
            <p className="rd-section-lead">{ui.levelsLead}</p>
            {hubs.levels.map((l) => (
              <div key={l.slug} className="rd-group" id={l.slug}>
                <h3 className="un-hub-subject-title">
                  {l.hasPage ? <a href={`/${locale}/readers/${l.slug}`}>{fillReader(ui.levelHeading, { level: l.level })}</a> : fillReader(ui.levelHeading, { level: l.level })}
                </h3>
                <ul className="rd-books">
                  {l.books.map((b) => <BookCard key={b.id} locale={locale} book={b} ui={ui} kind="level" as="h4" />)}
                </ul>
                {l.hasPage ? <p className="rd-group-link"><a href={`/${locale}/readers/${l.slug}`}>{fillReader(ui.groupOpenLevel, { level: l.level })}</a></p> : null}
              </div>
            ))}
          </section>
        ) : null}

        <div className="rd-panels">
          <FoldSteps ui={ui} id="fold" />
          <HowToUse ui={ui} show="both" />
        </div>
      </div>
      <JsonLd data={booksJsonLd({ locale, name: ui.indexTitle, description: hubs.index.metaDescription, path, books: allBooks })} />
      <JsonLd data={breadcrumb} />
    </main>
  );
}
