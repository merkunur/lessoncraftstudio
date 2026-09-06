import Image from 'next/image';
import ToolVignette from '@/components/homepage-v6/ToolVignette';
import OpenNumberLine from '@/components/homepage-v10/OpenNumberLine';
import WeighBench from '@/components/homepage-v10/WeighBench';
import Slip from '@/components/homepage-v11/Slip';
import type { ShowcaseDeck } from '@/lib/showcase-decks';

/* THE EXIT SHELF — the page ends where it began.

   The four instruments that work on the hero's plinths (clock, rekenrek,
   open number line, weigh bench) stand on one shelf by the door, still
   running — the same components, on the same coprime periods (12/9/17/13s),
   at the same poster-relative sizes: `.hv11-shelf` is its own inline-size
   container and carries a copy of the hero's cqw overrides, so this is the
   hero's picture echoed, not a smaller imitation of it. At the end of the
   shelf hangs the traveller — the one worksheet the visitor has followed
   through the whole gallery — with the v6 pen-note that closes its story.

   ⚠ Not `.hv10-stage`: three gates key on that selector as THE hero, and a
   second instance would corrupt every one of them. */

export type ShelfItem = { key: string; name: string };

const ORDER = ['learning-clock', 'rekenrek', 'open-number-line', 'measurement-bench'] as const;

function piece(key: string) {
  if (key === 'learning-clock') return <ToolVignette variant="clock" />;
  if (key === 'rekenrek') return <ToolVignette variant="rekenrek" />;
  if (key === 'open-number-line') return <OpenNumberLine />;
  return <WeighBench />;
}

export default function ExitShelf({
  items,
  traveller,
  travellerNote,
  travellerAlt,
}: {
  /** learning-clock · rekenrek · open-number-line · measurement-bench, native names. */
  items: ShelfItem[];
  traveller?: ShowcaseDeck;
  travellerNote: string;
  travellerAlt: string;
}) {
  const nameOf = (key: string) => items.find((i) => i.key === key)?.name || '';
  return (
    <div className="hv11-shelf">
      {ORDER.map((key) => (
        <div key={key} className="hv11-shelf-item">
          <div className="hv11-shelf-slot">{piece(key)}</div>
          <span className="hv11-shelf-plaque">{nameOf(key)}</span>
        </div>
      ))}
      {traveller ? (
        <div className="hv11-shelf-item is-traveller">
          <div className="hv11-shelf-slot">
            <a
              className="hv11-shelf-frame"
              href={`https://www.lessoncraftstudio.com/${traveller.language}/decks/${traveller.slug}/`}
            >
              <Image src={traveller.thumbnailUrl} alt={travellerAlt} width={480} height={620} sizes="120px" quality={70} />
            </a>
          </div>
          <Slip text={travellerNote} className="hv11-shelf-plaque is-slip" />
        </div>
      ) : null}
      <div className="hv11-shelf-plank" aria-hidden="true" />
    </div>
  );
}
