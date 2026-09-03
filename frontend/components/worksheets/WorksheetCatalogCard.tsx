/**
 * WorksheetCatalogCard — the grid card of the worksheets hub.
 *
 * A Direction A paper card (dual-shadow cream, `.actcat-card` — the same visual
 * vocabulary as ActivityCatalogCard on /[locale]/activities/) whose thumbnail is
 * the deck's real rendered worksheet, slug-derived (drift-proof per the
 * SEO-recovery 2026-06-25 rule).
 *
 * THE FORMAT MARK — the point of this card.
 * Every thumbnail carries exactly ONE mark, bottom-right:
 *   interactive → the site's existing play button (teal disc, cream triangle)
 *   print-only  → a "PDF only" chip
 * Same slot, same size, opposite meaning. Nothing is added to the card; the mark
 * that used to lie on a tracing sheet is replaced by one that tells the truth.
 * Only the exception is labelled, so the Interactive tab renders a chip-free
 * grid instead of a wall of redundant "Interactive" badges. The chip is a SOLID
 * hairline, never dashed — dashed already means "aligned standard coming soon"
 * elsewhere in this system, and reusing it here would read as unfinished.
 *
 * STRUCTURE — why the card is not one link.
 * `styles/catalog-cards.css` sets `.actcat-card > * { position: relative }`, so
 * a stretched-link `::before{inset:0}` inside the title would size itself to the
 * <h3> instead of the card: a silently tiny hit area. Instead the card root is a
 * plain <div> with exactly two children — an <a> covering thumbnail + title +
 * metadata, and a sibling action row. Valid HTML, no nested anchors, no client
 * JS, and `.actcat-card:hover` still lifts the whole card.
 *
 * THE ACTION ROW is what finally gives the ~1,057 worksheets per locale that
 * have no landing page a download at all. PDF is always present; Answer key
 * only when the deck actually has one (`answerKeyUrl` non-null — the same guard
 * DeckGridClient already uses). Both point at the metered proxy, which 302s
 * subscribers and crawlers straight to the file and meters everyone else, so the
 * hub cannot become an unmetered hole in the download limit. They are plain
 * <a href>, so the meter works with no JavaScript.
 *
 * Rate-limit frugality (broken-thumbnails fix 2026-07-06): images are lazy
 * beyond the first visible rows (`eager`) and the Link never prefetches.
 *
 * Presentational + server-rendered: every localized string is passed in, so this
 * file needs no i18n context.
 */
import Link from 'next/link';
import Image from 'next/image';
import { SUBJECT_STYLE, type Subject } from '@/lib/activities-catalog';

export interface WorksheetCardLabels {
  /** Action-row link text. */
  pdf: string;
  answerKey: string;
  /** The print-only chip, e.g. "PDF only". Kept short — it sits on a 160px card. */
  printOnly: string;
  /**
   * The format mark is `role="img"`, so its accessible name must be a NOUN —
   * an imperative there announces "Play <title>, image", an instruction
   * attached to a graphic, which a native panel caught by reading the markup
   * rather than the copy.
   *
   * It gets its OWN key rather than reusing the Interactive tab label. Reusing
   * it was the first attempt and a second panel rejected it: a tab label can be
   * a bare adjective (Swedish "Interaktivt"), which is a thin accessible name
   * standing alone as the only format signal an interactive card carries.
   */
  interactiveMark: string;
  /** Accessible names for the action links; each receives the worksheet title. */
  pdfAria: (title: string) => string;
  answerKeyAria: (title: string) => string;
}

export interface WorksheetCatalogCardProps {
  href: string;
  thumbnailSrc: string;
  title: string; // doubles as the image alt
  levelLabel: string;
  typeLabel: string;
  subject: Subject; // teal (math family) / coral (literacy) tint
  labels: WorksheetCardLabels;
  /** No browser-playable version: shows the chip instead of the play button. */
  printOnly: boolean;
  /** Metered PDF link. Null only when the deck row could not be resolved. */
  pdfHref: string | null;
  /** Metered answer-key link; null when this worksheet has no answer key. */
  answerKeyHref: string | null;
  eager?: boolean;
  /**
   * True when href is an nginx-served deck URL (`/<locale>/decks/<slug>/`)
   * rather than a Next route. Those must be a plain <a>: a Next <Link> would
   * client-side route to an app route that does not exist (§15.7).
   */
  external?: boolean;
}

export default function WorksheetCatalogCard({
  href,
  thumbnailSrc,
  title,
  levelLabel,
  typeLabel,
  subject,
  labels,
  printOnly,
  pdfHref,
  answerKeyHref,
  eager = false,
  external = false,
}: WorksheetCatalogCardProps) {
  const s = SUBJECT_STYLE[subject];
  const Body = external ? 'a' : Link;
  const bodyProps = external ? { href } : { href, prefetch: false as const };

  return (
    <div className="actcat-card group flex flex-col rounded-3xl p-3.5 md:p-4">
      <Body
        {...bodyProps}
        className="flex flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-lcs-coral focus-visible:ring-offset-2 focus-visible:ring-offset-lcs-cream rounded-2xl"
      >
        {/* Thumbnail: the deck's real 480×620 worksheet render (portrait 4/5),
            top-cropped so the title band of the sheet shows. */}
        <div className={`relative overflow-hidden rounded-2xl ${s.panel} aspect-[4/5] mb-3.5`}>
          <span className={`absolute left-0 right-0 top-0 z-10 h-1.5 ${s.edge}`} aria-hidden="true" />
          <Image
            src={thumbnailSrc}
            alt={title}
            fill
            sizes="(max-width:639px) 45vw, (max-width:1023px) 30vw, (max-width:1279px) 30vw, 250px"
            loading={eager ? 'eager' : 'lazy'}
            className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]"
          />

          {/* THE FORMAT MARK — one slot, two states. */}
          {printOnly ? (
            <span className="absolute bottom-2 right-2 z-10 inline-flex items-center gap-1 rounded-full bg-[#FFFDF8] px-2 py-[3px] text-[0.62rem] font-lcsBody font-bold text-lcs-teal shadow-[0_1px_4px_rgba(20,107,94,0.22)] ring-1 ring-lcs-teal/20">
              <svg viewBox="0 0 24 24" className="w-2.5 h-2.5" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M6 9V2h12v7" />
                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                <path d="M6 14h12v8H6z" />
              </svg>
              {labels.printOnly}
            </span>
          ) : (
            <span
              className="absolute bottom-2 right-2 z-10 grid place-items-center w-8 h-8 rounded-full bg-lcs-teal shadow-[0_2px_6px_rgba(20,107,94,0.3)]"
              aria-label={labels.interactiveMark}
              role="img"
            >
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 ml-0.5 text-lcs-cream" fill="currentColor" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          )}
        </div>

        <h3 className="font-lcsDisplay font-bold text-base md:text-[1.05rem] text-lcs-teal leading-snug mb-2 line-clamp-2 min-h-[2.6rem]">
          {title}
        </h3>

        <div className="flex flex-wrap items-center gap-1.5 mb-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-lcs-teal/10 text-lcs-teal text-[0.7rem] font-lcsBody font-bold">
            {levelLabel}
          </span>
        </div>

        <p className="font-lcsBody text-xs text-lcs-teal/65 leading-snug mb-3">
          {typeLabel}
        </p>
      </Body>

      {/* Action row — the downloads. Sibling of the body link, never nested. */}
      <div className="mt-auto pt-2.5 border-t border-lcs-teal/12 flex flex-wrap items-center gap-x-2 gap-y-1 font-lcsBody text-[0.8rem] font-semibold">
        {pdfHref && (
          <a
            href={pdfHref}
            rel="nofollow"
            target="_blank"
            aria-label={labels.pdfAria(title)}
            className="text-lcs-teal/85 hover:text-lcs-teal hover:underline"
          >
            {labels.pdf}
          </a>
        )}
        {pdfHref && answerKeyHref && (
          <span aria-hidden="true" className="text-lcs-teal/30">·</span>
        )}
        {answerKeyHref && (
          <a
            href={answerKeyHref}
            rel="nofollow"
            target="_blank"
            aria-label={labels.answerKeyAria(title)}
            className="text-lcs-teal/85 hover:text-lcs-teal hover:underline"
          >
            {labels.answerKey}
          </a>
        )}
      </div>
    </div>
  );
}
