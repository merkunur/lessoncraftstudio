/* One page of the reader hubs: /<locale>/readers/set-<n> (decodable readers of one phonics set) or
 * /<locale>/readers/level-<a|b|c> (picture readers about one level). Daily Teaching System, Part 8.2.
 *
 * The books of the set or level with their pages, what the set teaches, how to fold and use the books, and the way to
 * the other sets or levels. Generated from content/readers/hubs.<loc>.json; the prose is content/readers/ui.<loc>.json.
 * The same page for everyone. */
import '@/components/units/units.css';
import '@/components/readers/readers.css';
import { baloo2, nunito } from '@/lib/fonts/direction-a';
import { getTranslations } from 'next-intl/server';
import { localePath } from '@/lib/seo/url';
import { buildBreadcrumbSchema } from '@/lib/seo/breadcrumb-schema';
import BreadcrumbTrail from '@/components/breadcrumbs/BreadcrumbTrail';
import { ReaderGroup, ReaderHubs, ReaderUi, fillReader, soundsText } from '@/lib/readers';
import { BookCard, FoldSteps, HowToUse, JsonLd, SetSounds, booksJsonLd } from '@/components/readers/ReaderParts';

/** the heading, crumb and lead of a set or level page */
export function readerGroupText(group: ReaderGroup, ui: ReaderUi) {
  if (group.kind === 'set') {
    const s = group.set;
    return {
      eyebrow: ui.setEyebrow,
      title: fillReader(ui.setTitle, { n: s.n, skill: s.skill }),
      crumb: fillReader(ui.setHeading, { n: s.n, skill: s.skill }),
      lead: s.n === 1 ? ui.setLeadFirst : fillReader(ui.setLead, { n: s.n, range: s.n === 2 ? ui.setRangeTwo : fillReader(ui.setRangeMany, { n: s.n }) }),
    };
  }
  const l = group.level;
  return {
    eyebrow: l.level === 'C' ? ui.levelEyebrowK1 : ui.levelEyebrowK,
    title: fillReader(ui.levelTitle, { level: l.level }),
    crumb: fillReader(ui.levelHeading, { level: l.level }),
    lead: ui[`levelLead${l.level}`],
  };
}

export default async function ReaderGroupPage({ locale, hubs, group, ui }: { locale: string; hubs: ReaderHubs; group: ReaderGroup; ui: ReaderUi }) {
  const tBreadcrumb = await getTranslations({ locale, namespace: 'topicPage.breadcrumb' });
  const slug = group.kind === 'set' ? group.set.slug : group.level.slug;
  const books = group.kind === 'set' ? group.set.books : group.level.books;
  const path = localePath(locale, 'readers', slug);
  const text = readerGroupText(group, ui);
  const breadcrumb = buildBreadcrumbSchema([
    { name: tBreadcrumb('home'), path: localePath(locale) },
    { name: ui.crumb, path: localePath(locale, 'readers') },
    { name: text.crumb, path },
  ]);
  // the other pages of the same series, in order
  const others = group.kind === 'set'
    ? hubs.sets.filter((s) => s.hasPage).map((s) => ({ slug: s.slug, label: fillReader(ui.setHeading, { n: s.n, skill: s.skill }) }))
    : hubs.levels.filter((l) => l.hasPage).map((l) => ({ slug: l.slug, label: fillReader(ui.levelHeading, { level: l.level }) }));
  const kind = group.kind;

  return (
    <main className={`un rd ${baloo2.variable} ${nunito.variable}`}>
      <div className="un-wrap">
        <BreadcrumbTrail locale={locale} trail={[{ label: ui.crumb, href: `/${locale}/readers` }, { label: text.crumb }]} />

        <header className="un-head">
          <p className="un-eyebrow">{text.eyebrow}</p>
          <h1 className="un-title un-title-wide">{text.title}</h1>
          <p className="un-hub-lead">{text.lead}</p>
          <p className="un-facts"><span>{fillReader(ui.factBooks, { n: books.length })}</span></p>
        </header>

        {group.kind === 'set' ? (
          <section className="rd-new" aria-labelledby="rd-new-title">
            <h2 id="rd-new-title" className="rd-h3">{fillReader(ui.setNewTitle, { n: group.set.n })}</h2>
            <SetSounds set={group.set} ui={ui} />
            {group.set.before.length ? <p className="rd-before">{fillReader(ui.setBefore, { list: group.set.before.map((b) => fillReader(ui.setBeforeItem, { n: b.n, sounds: soundsText(b.sounds, ui) })).join('; ') })}</p> : null}
          </section>
        ) : null}

        <section className="rd-group" aria-labelledby="rd-books-title">
          <h2 id="rd-books-title" className="rd-h2">{ui.booksTitle}</h2>
          <ul className="rd-books">
            {books.map((b) => <BookCard key={b.id} locale={locale} book={b} ui={ui} kind={kind} as="h3" />)}
          </ul>
        </section>

        <div className="rd-panels">
          <HowToUse ui={ui} show={kind} />
          <FoldSteps ui={ui} id="fold" />
        </div>

        <nav className="rd-others" aria-label={kind === 'set' ? ui.otherSets : ui.otherLevels}>
          {others.length > 1 ? (
            <>
              <p className="rd-others-title">{kind === 'set' ? ui.otherSets : ui.otherLevels}</p>
              <ul className="rd-others-list">
                {others.map((o) => (
                  <li key={o.slug}>
                    {o.slug === slug ? <span aria-current="page">{o.label}</span> : <a href={`/${locale}/readers/${o.slug}`}>{o.label}</a>}
                  </li>
                ))}
              </ul>
            </>
          ) : null}
          <p className="rd-back"><a href={`/${locale}/readers`}>{ui.backToIndex}</a></p>
        </nav>
      </div>
      <JsonLd data={booksJsonLd({ locale, name: text.title, description: group.kind === 'set' ? group.set.metaDescription : group.level.metaDescription, path, books })} />
      <JsonLd data={breadcrumb} />
    </main>
  );
}
