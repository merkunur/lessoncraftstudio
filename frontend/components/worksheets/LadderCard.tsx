/**
 * LadderCard — one card per Level Set LADDER (a worksheet type face with its
 * easy / core / hard pages), the unit the Level Sets v2 restructure makes
 * visible (2026-10-15).
 *
 * Same paper card as WorksheetCatalogCard (`.actcat-card`, Direction A), so a
 * ladder card sits in the hub grid beside single-worksheet cards without a
 * second visual vocabulary. What differs is the content: ONE thumbnail (the
 * core page) under a "3 levels" ribbon, and below the title a three-row ledger
 * — level word · page count — that is the whole point of the card: a teacher
 * reads "Easy 5 · Core 6 · Hard 5" and knows the set covers her class.
 *
 * The card is one link to the set page (noindex). It offers no downloads of
 * its own: the set page is where the pages are, and the metered links live
 * there. Presentational + server-rendered; every string is passed in.
 */
import Link from 'next/link';
import Image from 'next/image';
import { SUBJECT_STYLE, type Subject } from '@/lib/activities-catalog';

export interface LadderRungVM {
  /** The level word: "Easy" / "Core" / "Hard" in the page locale. */
  label: string;
  /** "{n} pages", already pluralised. */
  pagesLabel: string;
  count: number;
}

export interface LadderCardProps {
  href: string;
  thumbnailSrc: string;
  title: string;
  levelLabel: string;
  typeLabel: string;
  subject: Subject;
  /** "3 levels" — the ribbon on the thumbnail. */
  levelsLabel: string;
  rungs: LadderRungVM[];
  /** Interactive mark (play disc) when at least one page plays in the browser. */
  interactive: boolean;
  interactiveMark: string;
  printOnly: string;
  openSet: string;
  eager?: boolean;
}

export default function LadderCard({
  href, thumbnailSrc, title, levelLabel, typeLabel, subject, levelsLabel, rungs,
  interactive, interactiveMark, printOnly, openSet, eager = false,
}: LadderCardProps) {
  const s = SUBJECT_STYLE[subject];
  return (
    <div className="actcat-card group flex flex-col rounded-3xl p-3.5 md:p-4">
      <Link
        href={href}
        prefetch={false}
        className="flex flex-col flex-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-lcs-coral focus-visible:ring-offset-2 focus-visible:ring-offset-lcs-cream rounded-2xl"
      >
        <div className={`relative overflow-hidden rounded-2xl ${s.panel} aspect-[4/5] mb-3.5`}>
          <span className={`absolute left-0 right-0 top-0 z-10 h-1.5 ${s.edge}`} aria-hidden="true" />
          {/* Two offset paper edges behind the thumbnail read as "a stack of pages". */}
          <span aria-hidden="true" className="absolute inset-x-5 top-5 bottom-1 rounded-xl bg-[#FFFDF8]/70 shadow-[0_1px_3px_rgba(20,107,94,0.18)]" />
          <span aria-hidden="true" className="absolute inset-x-3 top-3 bottom-2 rounded-xl bg-[#FFFDF8]/85 shadow-[0_1px_3px_rgba(20,107,94,0.18)]" />
          <Image
            src={thumbnailSrc}
            alt={title}
            fill
            sizes="(max-width:639px) 45vw, (max-width:1023px) 30vw, (max-width:1279px) 30vw, 250px"
            loading={eager ? 'eager' : 'lazy'}
            className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]"
          />
          <span className="absolute left-2 top-3.5 z-10 inline-flex items-center rounded-full bg-lcs-teal px-2.5 py-[3px] text-[0.66rem] font-lcsBody font-bold text-lcs-cream shadow-[0_1px_4px_rgba(20,107,94,0.3)]">
            {levelsLabel}
          </span>
          {interactive ? (
            <span
              className="absolute bottom-2 right-2 z-10 grid place-items-center w-8 h-8 rounded-full bg-lcs-teal shadow-[0_2px_6px_rgba(20,107,94,0.3)]"
              aria-label={interactiveMark}
              role="img"
            >
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 ml-0.5 text-lcs-cream" fill="currentColor" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          ) : (
            <span className="absolute bottom-2 right-2 z-10 inline-flex items-center gap-1 rounded-full bg-[#FFFDF8] px-2 py-[3px] text-[0.62rem] font-lcsBody font-bold text-lcs-teal shadow-[0_1px_4px_rgba(20,107,94,0.22)] ring-1 ring-lcs-teal/20">
              {printOnly}
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
        <p className="font-lcsBody text-xs text-lcs-teal/65 leading-snug mb-3">{typeLabel}</p>

        {/* The ledger: one row per rung the set actually has. */}
        <ul className="mt-auto space-y-1 font-lcsBody text-[0.8rem] text-lcs-teal/85">
          {rungs.map((r) => (
            <li key={r.label} className="flex items-center justify-between gap-2 border-t border-lcs-teal/12 pt-1">
              <span className="font-semibold">{r.label}</span>
              <span className="tabular-nums text-lcs-teal/70">{r.pagesLabel}</span>
            </li>
          ))}
        </ul>
        <span className="mt-3 inline-flex items-center gap-1 font-lcsBody text-[0.8rem] font-bold text-lcs-coral-deep group-hover:underline">
          {openSet}
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14" /><path d="m13 6 6 6-6 6" />
          </svg>
        </span>
      </Link>
    </div>
  );
}
