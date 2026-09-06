import Image from 'next/image';
import type { ShowcaseDeck } from '@/lib/showcase-decks';

/* THE THRESHOLD — the doorway between the Grand Hall and Room I.

   The signature move of homepage v11, used exactly once. A full-bleed cream
   wall carries a drawn archway (the `.hv10-arch` profile that homepage-v10.css
   designed for a room threshold and never used). The opening is a clip-path
   window over Room I's terracotta wall; it widens under a CSS view() timeline
   as the visitor scrolls toward it, so "scrolling reads as walking" becomes
   literally true — you pass through the door into the next room.

   Wordless and decorative (aria-hidden): there is nothing to read here, so it
   costs no string in any of the eleven languages. A <div>, never a
   `section.hv10-room[id]`, so scripts/audit-room-order.js — which walks the
   numbered rooms — does not see it.

   Base pose (no JS, no scroll timelines, reduced motion): the door stands
   open. The stylesheet only ever ADDS the closing-and-opening on top.
   Cornice + skirting are the room fabric and bleed to the screen edges like
   every other trim on the page (`data-bleed` is the responsive gate's hook). */

/* Two works on the far wall of the room beyond, in the poster's own frame
   language. Real published worksheets (the wall's decks), so what the door
   shows is product. */
const WORKS = [
  { x: '19%', y: '19%', w: '20%', tilt: '-1deg' },
  { x: '61%', y: '16%', w: '20%', tilt: '0.9deg' },
] as const;

export default function Threshold({ decks = [] }: { decks?: ShowcaseDeck[] }) {
  return (
    <div className="hv11-threshold" aria-hidden="true" data-scrub data-enter>
      <div className="hv10-room-cornice" data-bleed />
      <div className="hv11-threshold-wall">
        <div className="hv11-threshold-jamb" />
        <div className="hv11-threshold-arch">
          <div className="hv11-threshold-room">
            {WORKS.map((f, i) =>
              decks[i] ? (
                <div
                  key={decks[i].id}
                  className="hv11-threshold-work"
                  style={{ ['--x' as string]: f.x, ['--y' as string]: f.y, ['--w' as string]: f.w, ['--tilt' as string]: f.tilt }}
                >
                  <Image src={decks[i].thumbnailUrl} alt="" width={480} height={620} sizes="160px" quality={70} />
                </div>
              ) : null,
            )}
            <div className="hv11-threshold-room-dado" />
            <div className="hv11-threshold-room-floor" />
          </div>
        </div>
        <div className="hv11-threshold-sill" />
      </div>
      <div className="hv11-threshold-dado" data-bleed />
    </div>
  );
}
