/**
 * LevelSetsSection — the ADDITIVE "Level Sets" block that indexed hubs carry
 * (worksheets hub, topic pages, subject×grade hubs; operator decision 1,
 * 2026-10-15). Heading + one-sentence intro + a grid of ladder cards + a
 * link to the sets index. Adds content and internal links; touches nothing
 * about the page's identity (URL / title / meta / h1 / canonical).
 *
 * Presentational: the page builds the card props (lib/level-sets-view.ts).
 */
import Link from 'next/link';
import LadderCard, { type LadderCardProps } from '@/components/worksheets/LadderCard';

export interface LevelSetsSectionProps {
  heading: string;
  intro?: string;
  cards: LadderCardProps[];
  allHref: string;
  allLabel: string;
  /** Heading level: the hub uses h2; a page whose grid already has h2s may pass 'h3'. */
  as?: 'h2' | 'h3';
  /** An id for in-page anchors. */
  id?: string;
}

export default function LevelSetsSection({ heading, intro, cards, allHref, allLabel, as = 'h2', id = 'level-sets' }: LevelSetsSectionProps) {
  if (cards.length === 0) return null;
  const H = as;
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="mb-10 md:mb-12 scroll-mt-24">
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2 mb-4">
        <div className="max-w-2xl">
          <H id={`${id}-heading`} className="font-lcsDisplay font-extrabold text-2xl md:text-3xl text-lcs-teal leading-tight">
            {heading}
          </H>
          {intro && <p className="mt-1.5 font-lcsBody text-sm md:text-[0.95rem] text-lcs-teal/80 leading-relaxed">{intro}</p>}
        </div>
        <Link href={allHref} prefetch={false} className="font-lcsBody text-sm font-bold text-lcs-coral-deep hover:underline whitespace-nowrap">
          {allLabel} →
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {cards.map((c) => <LadderCard key={c.href} {...c} />)}
      </div>
    </section>
  );
}
