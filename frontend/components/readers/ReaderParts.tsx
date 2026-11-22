/* The parts the reader hubs share (Daily Teaching System, Part 8.2): a book card, the sounds and heart words of a set,
 * the folding steps, how to use the books, and the JSON-LD of a list of books. Everything is generated from
 * content/readers/hubs.<loc>.json; the prose is content/readers/ui.<loc>.json. Server components, no state. */
import { CANONICAL_HOST, canonicalUrl } from '@/lib/seo/url';
import { getHreflangCode } from '@/lib/seo/hreflang';
import { ReaderBook, ReaderSet, ReaderUi, fillReader, readerDeckHref, readerThumb } from '@/lib/readers';

const andJoin = (xs: string[]) => xs.join(', ');

export function BookCard({ locale, book, ui, kind, as: H = 'h3' }: { locale: string; book: ReaderBook; ui: ReaderUi; kind: 'set' | 'level'; as?: 'h3' | 'h4' }) {
  const href = readerDeckHref(locale, book.pages.book);
  return (
    <li className="rd-book" id={book.id}>
      <a className="rd-book-thumb" href={href} aria-hidden="true" tabIndex={-1}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={readerThumb(locale, book.pages.book)} alt={fillReader(kind === 'set' ? ui.altDecodable : ui.altPicture, { title: book.title })} width={120} height={155} loading="lazy" decoding="async" />
      </a>
      <div className="rd-book-body">
        <H className="rd-book-title"><a href={href}>{book.title}</a></H>
        {book.line ? <p className="rd-book-line">{book.line}</p> : null}
        {book.pictureWords?.length ? <p className="rd-book-line">{fillReader(ui.pictureWords, { list: andJoin(book.pictureWords) })}</p> : null}
        {book.newWords?.length ? <p className="rd-book-line">{fillReader(ui.newWords, { list: andJoin(book.newWords) })}</p> : null}
        <p className="rd-book-links">
          <a href={href}>{ui.bookLink}</a>
          {book.pages.color ? <a href={readerDeckHref(locale, book.pages.color)}>{ui.colorLink}</a> : null}
          {book.pages.talk ? <a href={readerDeckHref(locale, book.pages.talk)}>{ui.talkLink}</a> : null}
        </p>
      </div>
    </li>
  );
}

/** the letter sounds and heart words a set adds, as chips */
export function SetSounds({ set, ui }: { set: ReaderSet; ui: ReaderUi }) {
  return (
    <dl className="rd-sounds">
      <div>
        <dt>{ui.soundsLabel}</dt>
        <dd>
          <ul className="rd-chips">
            {set.sounds.map((s, i) => (
              <li key={`${s.spelling}-${i}`} className="rd-chip rd-chip-sound">{s.example ? fillReader(ui.soundExample, { spelling: s.spelling, word: s.example }) : s.spelling}</li>
            ))}
            {set.blends ? <li className="rd-chip rd-chip-sound">{ui.blendsLabel}</li> : null}
          </ul>
        </dd>
      </div>
      {set.heart.length ? (
        <div>
          <dt>{ui.heartLabel}</dt>
          <dd>
            <ul className="rd-chips">
              {set.heart.map((h) => <li key={h} className="rd-chip rd-chip-heart">{h}</li>)}
            </ul>
          </dd>
        </div>
      ) : null}
    </dl>
  );
}

export function FoldSteps({ ui, id }: { ui: ReaderUi; id?: string }) {
  return (
    <section className="rd-panel" id={id} aria-labelledby={`${id || 'fold'}-title`}>
      <h2 id={`${id || 'fold'}-title`} className="rd-h2">{ui.foldTitle}</h2>
      <ol className="rd-steps">
        <li>{ui.fold1}</li>
        <li>{ui.fold2}</li>
        <li>{ui.fold3}</li>
      </ol>
    </section>
  );
}

/** how to use a decodable reader, a picture reader, or both */
export function HowToUse({ ui, show }: { ui: ReaderUi; show: 'set' | 'level' | 'both' }) {
  const blocks = [
    show !== 'level' ? { key: 'd', title: ui.howDecodableTitle, steps: [ui.howDecodable1, ui.howDecodable2, ui.howDecodable3] } : null,
    show !== 'set' ? { key: 'p', title: ui.howPictureTitle, steps: [ui.howPicture1, ui.howPicture2, ui.howPicture3] } : null,
  ].filter(Boolean) as { key: string; title: string; steps: string[] }[];
  return (
    <section className="rd-panel" aria-labelledby="rd-how-title">
      <h2 id="rd-how-title" className="rd-h2">{ui.howTitle}</h2>
      <div className={blocks.length > 1 ? 'rd-how rd-how-two' : 'rd-how'}>
        {blocks.map((b) => (
          <div key={b.key}>
            {blocks.length > 1 ? <h3 className="rd-h3">{b.title}</h3> : null}
            <ol className="rd-steps">{b.steps.map((s) => <li key={s}>{s}</li>)}</ol>
          </div>
        ))}
      </div>
      <h3 className="rd-h3 rd-talk-title">{ui.talkTitle}</h3>
      <p className="rd-text">{ui.talkText}</p>
      <p className="rd-print-note">{ui.printNote}</p>
    </section>
  );
}

/** CollectionPage + ItemList of the books a page lists (each item is the book's mini-book page) */
export function booksJsonLd({ locale, name, description, path, books }: { locale: string; name: string; description: string; path: string; books: ReaderBook[] }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name,
    description,
    url: canonicalUrl(path),
    inLanguage: getHreflangCode(locale),
    isPartOf: { '@type': 'WebSite', name: 'LessonCraftStudio', url: CANONICAL_HOST },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: books.length,
      itemListElement: books.map((b, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `${CANONICAL_HOST}${readerDeckHref(locale, b.pages.book)}`,
        name: b.title,
        image: readerThumb(locale, b.pages.book),
      })),
    },
  };
}

export function JsonLd({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />;
}
