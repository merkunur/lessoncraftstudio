/**
 * PathwaySection — the ORDERED "Level Sets" block of a subject × grade hub (Level Sets v2
 * phase 3, 2026-10-15): strands in teaching order (the national framework's domain names,
 * lib/seo/strand-names.ts), each with up to `perStrand` ladder cards and a link to the rest
 * on the sets index. Additive on an indexed page; identity fields untouched. Capped per strand
 * so the hub's DOM stays small (a grade can hold 150 ladders).
 */
import Link from 'next/link';
import LadderCard, { type LadderCardProps } from '@/components/worksheets/LadderCard';

export interface PathwayStrandVM {
  key: string;
  heading: string;
  cards: LadderCardProps[];
  /** Total ladders in the strand (cards may be a cap). */
  total: number;
  /** Link to the full strand on the sets index when total > cards.length. */
  allHref?: string;
  allLabel?: string;
}

export interface PathwaySectionProps {
  heading: string;
  intro?: string;
  strands: PathwayStrandVM[];
  allHref: string;
  allLabel: string;
  id?: string;
}

export default function PathwaySection({ heading, intro, strands, allHref, allLabel, id = 'level-sets' }: PathwaySectionProps) {
  if (strands.length === 0) return null;
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="mb-10 md:mb-12 scroll-mt-24">
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2 mb-5">
        <div className="max-w-2xl">
          <h2 id={`${id}-heading`} className="font-lcsDisplay font-extrabold text-2xl md:text-3xl text-lcs-teal leading-tight">{heading}</h2>
          {intro && <p className="mt-1.5 font-lcsBody text-sm md:text-[0.95rem] text-lcs-teal/80 leading-relaxed">{intro}</p>}
        </div>
        <Link href={allHref} prefetch={false} className="font-lcsBody text-sm font-bold text-lcs-coral-deep hover:underline whitespace-nowrap">
          {allLabel} →
        </Link>
      </div>
      <ol className="space-y-8">
        {strands.map((s, i) => (
          <li key={s.key}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-3">
              <h3 className="font-lcsDisplay font-bold text-lg md:text-xl text-lcs-teal flex items-center gap-2.5">
                <span className="grid place-items-center w-7 h-7 rounded-full bg-lcs-teal text-lcs-cream text-sm font-lcsBody">{i + 1}</span>
                {s.heading}
              </h3>
              {s.allHref && s.allLabel && s.total > s.cards.length && (
                <Link href={s.allHref} prefetch={false} className="font-lcsBody text-sm font-semibold text-lcs-teal hover:underline">
                  {s.allLabel} →
                </Link>
              )}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {s.cards.map((c) => <LadderCard key={c.href} {...c} />)}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
