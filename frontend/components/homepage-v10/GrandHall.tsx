import Link from 'next/link';
import Image from 'next/image';
import ToolVignette from '@/components/homepage-v6/ToolVignette';
import WeighBench from '@/components/homepage-v10/WeighBench';
import OpenNumberLine from '@/components/homepage-v10/OpenNumberLine';
import type { ShowcaseDeck } from '@/lib/showcase-decks';

/* ───────────────────────────────────────────────────────────────────────────
   THE GRAND HALL — the hero of homepage v10 "The Gallery of Lessons".

   ONE composition at every viewport from 320 to 2560. Not a responsive
   rearrangement: the same picture, scaled. The poster is 3:2, capped at
   1600px, and every coordinate below is in POSTER UNITS (1 unit = 1% of the
   poster's own width, both axes) so the picture is rigid.

   The gallery is drawn (CSS). The art is real — every frame holds a
   published worksheet in the visitor's own language, and every plinth
   carries a working instrument.

   The four instruments were chosen because their keyframes are
   rotation/scale/opacity only, with no pixel offsets, so they resize by
   scoped cqw override without desynchronising. See homepage-v10.css.

   FOLD RULE (measured, binding): at 1366×768 the real fold is ~578px while
   the poster is ~911px tall, so the H1 must end by poster-y 36.7 (55%) and
   the CTAs by 41.3 (62%). The instruments sit at y≈35-46 so the tools are
   genuinely SEEN working in the fold.
   ─────────────────────────────────────────────────────────────────────── */

/* The floor line — constant in every room of the building, so scrolling
   reads as walking. At 46 the floor took a third of the picture and read as
   a slab; 50 puts it at a quarter, which is what a room actually looks like. */
const HORIZON = 48;

/* The poster is 3:2, so its height is exactly 66.667 poster units. Pieces are
   anchored from the bottom edge, which needs this. */
const POSTER_H = 200 / 3;

/* The salon hang. Portrait 3:4, the shape a worksheet already renders at.
   Six works, deliberately not eight: a composition that must read at 320px
   cannot hold tiny specks, and restraint is what lets one picture survive
   the whole range. Density belongs in the Print Room, not the hall. */
/* Shifted down to clear the cornice, and enlarged: at 11–12 units the work
   was undersized and the wall read as empty green. The law is that the
   product dominates, so the works grow rather than the wall gaining
   ornament. */
const FRAMES = [
  { x: 1.5, y: 9.5, w: 13.5, tilt: '-1.3deg' },
  { x: 15.5, y: 12.5, w: 7.5, tilt: '1.1deg' },
  { x: 3, y: 24, w: 13, tilt: '0.8deg' },
  { x: 77, y: 12.5, w: 7.5, tilt: '-1.1deg' },
  { x: 86, y: 9.5, w: 12, tilt: '1.3deg' },
  { x: 84.5, y: 24, w: 13, tilt: '-0.8deg' },
] as const;

/* Plinths stand on the floor; the instrument sits on the lit top face.
   `pieceTop` = plinth y minus the instrument's own rendered height in poster
   units, derived from each machine's native geometry × the override ratio in
   homepage-v10.css — not eyeballed:
     clock     14cqw square                                        → 14
     rekenrek  2×(30 rail) + 26 gap + 2×(10 pad) = 106px × 0.04893 → 5.19
     planks    2×14 + 14 gap + 22 mark + 2 margin  = 66px × 0.08824 → 5.82
     lids      110px × 0.09333                                     → 10.27
   The centre stays open under the type — a room needs somewhere to stand. */
/* Plinths stand FORWARD of the wall (y 53 against a horizon of 48) so their
   lit top face reads as a separate plane rather than merging into the
   skirting — which is exactly what happened at y = HORIZON. Shorter than
   before, too: at h 12 they filled nearly three quarters of the floor and
   the whole lower band went heavy. */
const PLINTH_Y = 53;
const PLINTH_H = 9;
/* planks and lids were replaced here: at ~110px the planks read as two
   coloured bars and a chevron, and the lids as an orange blob — neither says
   "teaching instrument" to anyone who has not met the tool. The clock and the
   rekenrek work because they are recognisable objects, so the two
   replacements are chosen the same way: a balance and a weighing scale. */
const PLINTHS = [
  { id: 'clock', x: 4, w: 15, pieceW: 14 },
  { id: 'rekenrek', x: 21, w: 22, pieceW: 21 },
  { id: 'onl', x: 59, w: 16, pieceW: 15 },
  { id: 'weigh', x: 80, w: 16, pieceW: 15 },
] as const;

type Props = {
  locale: string;
  decks: ShowcaseDeck[];
  strings: {
    h1: string;
    sub: string;
    ctaTools: string;
    ctaWorksheets: string;
    hallLabel: string;
    countsLine: string;
  };
};

export default function GrandHall({ locale, decks, strings }: Props) {
  return (
    <header className="hv10-field" data-testid="hero-section">
      <div
        className="hv10-stage"
        style={{ ['--g10-horizon' as string]: HORIZON }}
        role="img"
        aria-label={strings.hallLabel}
      >
        {/* ── the drawn building ── */}
        {/* The room's fabric runs to the screen edges, so a wide viewport
            shows MORE ROOM rather than a picture pasted on a wall.
            data-bleed is the responsive gate's semantic exemption hook. */}
        <div className="hv10-cornice" aria-hidden="true" data-bleed />
        <div className="hv10-dado" aria-hidden="true" data-bleed />
        <div className="hv10-floor" aria-hidden="true" data-bleed />

        {/* ── the salon hang: real published worksheets ── */}
        {FRAMES.map((f, i) => {
          const deck = decks[i % Math.max(decks.length, 1)];
          return (
            <div
              key={i}
              className="hv10-frame"
              style={
                {
                  '--x': f.x,
                  '--y': f.y,
                  '--w': f.w,
                  '--tilt': f.tilt,
                  zIndex: 2,
                } as React.CSSProperties
              }
            >
              {deck ? (
                <Image
                  src={deck.thumbnailUrl}
                  alt=""
                  width={480}
                  height={620}
                  /* The frames never render wider than ~216px even at 2560,
                     so a full-size 480x620 PNG was ~130KB of waste each. */
                  sizes="(max-width: 640px) 26vw, 220px"
                  priority={i < 2}
                  quality={72}
                />
              ) : (
                <div className="hv10-frame-art" />
              )}
            </div>
          );
        })}

        {/* ── the plinths, and the instruments working on them ── */}
        {PLINTHS.map((p) => {
          const box = {
            '--x': p.x,
            '--y': PLINTH_Y,
            '--w': p.w,
            '--h': PLINTH_H,
          } as React.CSSProperties;
          return (
            <div key={p.id}>
              <div
                className="hv10-plinth-shadow"
                aria-hidden="true"
                style={{ ...box, zIndex: 3 }}
              />
              <div className="hv10-plinth" aria-hidden="true" style={{ ...box, zIndex: 4 }} />
              <div
                className="hv10-piece"
                style={
                  {
                    // centred on the plinth, and seated on its top face by
                    // bottom-anchoring rather than an estimated height
                    '--x': p.x + (p.w - p.pieceW) / 2,
                    '--b': POSTER_H - PLINTH_Y,
                    '--w': p.pieceW,
                    zIndex: 5,
                  } as React.CSSProperties
                }
              >
                {p.id === 'weigh' ? (
                  <WeighBench />
                ) : p.id === 'onl' ? (
                  <OpenNumberLine />
                ) : (
                  <ToolVignette variant={p.id} />
                )}
              </div>
            </div>
          );
        })}

        {/* ── the type layer: real DOM text, never inside a scaled subtree ── */}
        <div
          className="hv10-type"
          style={{ '--x': 22, '--y': 15, '--w': 56 } as React.CSSProperties}
        >
          <h1 className="hv10-h1">{strings.h1}</h1>
        </div>
      </div>

      {/* On the wall below the picture. The sub lives out here with the
          buttons because it is real, natively-authored copy of unpredictable
          length — inside the poster its height could not scale with the
          picture, and at 412px it ran through the floor. Out here it can be
          as long as any of the eleven languages needs. */}
      <div className="hv10-below">
        <p className="hv10-sub">{strings.sub}</p>
        {/* The pillar line names the ACTIVITIES — "ready-to-play activities" /
            "Aktivitäten zum Losspielen" / "heti pelattavat tehtävät". It was
            already authored natively in all eleven languages and already
            de-numbered under the no-counts law, so activities are named in the
            hero in every language without a word being translated. */}
        <p className="hv10-pillars">{strings.countsLine}</p>
        <div className="hv10-ctas">
          <Link href={`/${locale}/tools`} className="hv10-cta is-primary">
            {strings.ctaTools}
          </Link>
          <Link href={`/${locale}/worksheets`} className="hv10-cta is-ghost">
            {strings.ctaWorksheets}
          </Link>
        </div>
      </div>
    </header>
  );
}
