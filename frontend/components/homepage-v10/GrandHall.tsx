import Link from 'next/link';
import Image from 'next/image';
import ToolVignette from '@/components/homepage-v6/ToolVignette';
import WeighBench from '@/components/homepage-v10/WeighBench';
import OpenNumberLine from '@/components/homepage-v10/OpenNumberLine';
import type { ShowcaseDeck } from '@/lib/showcase-decks';
import type { HeroStrings } from '@/components/homepage-v10/hero-strings';

/* ───────────────────────────────────────────────────────────────────────────
   THE GRAND HALL — the hero of homepage v10 "The Gallery of Lessons".
   v10.1 (2026-09-03): the placard band.

   ONE composition at every viewport from 320 to 2560. Not a responsive
   rearrangement: the same picture, scaled. The poster is 2:1 (it was 3:2
   until v10.1), capped at 1600px, and every coordinate below is in POSTER
   UNITS (1 unit = 1% of the poster's own width, both axes) so the picture is
   rigid. A 2:1 poster is 100 × 50 units.

   The gallery is drawn (CSS). The art is real — every frame holds a
   published worksheet in the visitor's own language, and every plinth
   carries a working instrument.

   WHY 2:1. Measured on production at 1366×768 (the commonest laptop fold):
   the 3:2 poster ended at y≈700 and the primary CTA's bottom edge sat at
   801px — the visitor saw a picture and a poetic headline and NOTHING that
   said what the site is. The v10 poster also carried ~200px of empty green
   between the headline and the plinth tops. Widening the ratio removes that
   dead centre and, together with reserving the band in the fold budget
   (homepage-v10.css `--g10-band`), puts the headline, the four placards and
   the primary CTA inside the fold while the frames and instruments stay the
   same size they were.

   THE PLACARD BAND. Only the H1 lives inside the poster. Everything that must
   be real-size text — the four museum wall-labels naming what the site holds
   and the two CTAs — lives in `.hv10-below`, on the wall directly under the
   picture. Poster-unit text at 390px would be ~6px; px floors inside the
   poster would break the identity law (the same reason the CTAs left the
   poster in v10). `scripts/audit-hero-identity.js` now asserts that the type
   layer holds exactly one child (the H1) and that no band element strays
   into the stage; `scripts/audit-hero-fold.js` asserts the fold itself.
   ─────────────────────────────────────────────────────────────────────── */

/* The floor line. The rooms below keep their own horizon (48 on a 3:2
   poster); the hero's is 39 on a 2:1 poster — the same proportion of the
   picture's height (0.78), so the room still reads as one building. */
const HORIZON = 39;

/* The poster is 2:1, so its height is exactly 50 poster units. Pieces are
   anchored from the bottom edge, which needs this. */
const POSTER_H = 50;

/* The salon hang. Portrait 3:4, the shape a worksheet already renders at.
   Six works: one large inboard-anchored piece and two small ones per wall,
   all above the chair rail (y 33), none touching another or the clock.
   v10 pushed the largest works to the extremes and let the small frame
   overlap the large one; a curator hangs nothing across anything. The
   identity gate now measures pairwise overlap, so this table cannot regress
   silently. */
const FRAMES = [
  { x: 2.5, y: 9.6, w: 11, tilt: '-1.1deg' },
  { x: 15.2, y: 8.6, w: 7.4, tilt: '0.9deg' },
  { x: 15.2, y: 20.2, w: 7.4, tilt: '-0.6deg' },
  { x: 77.4, y: 8.6, w: 7.4, tilt: '-0.9deg' },
  { x: 86.5, y: 9.6, w: 11, tilt: '1.1deg' },
  { x: 77.4, y: 20.2, w: 7.4, tilt: '0.6deg' },
] as const;

/* Plinths stand FORWARD of the wall (y 42.5 against a horizon of 39) so their
   lit top face reads as a separate plane rather than merging into the
   skirting. Shorter than v10 (6.5 against 9): the tall tapered slabs read as
   paper bags. One even rank, six-unit gaps, symmetric margins. */
const PLINTH_Y = 42.5;
const PLINTH_H = 6.5;
/* The four instruments were chosen because they are recognisable OBJECTS at
   ~110px — a clock, a counting frame, a number line, a balance. Their
   keyframes are rotation/scale/opacity only, so they resize by scoped cqw
   override without desynchronising (homepage-v10.css). */
/* `seat` = poster units the instrument's box is lowered so the part that
   actually touches the plinth (the rekenrek's lower rail, the number line's
   axis) sits ON the lit top face rather than hovering above it. Measured on
   the render: the rekenrek carries 0.5 units of its own padding, the number
   line keeps its axis 1.9 units above its box bottom. The clock and the
   weigh bench already end on their contact edge. */
const PLINTHS = [
  { id: 'clock', x: 6, w: 15, pieceW: 11, seat: 0 },
  { id: 'rekenrek', x: 27.5, w: 22, pieceW: 21, seat: 0.9 },
  { id: 'onl', x: 55.5, w: 16, pieceW: 16, seat: 1.6 },
  { id: 'weigh', x: 78, w: 16, pieceW: 16, seat: 0 },
] as const;

type Props = {
  locale: string;
  decks: ShowcaseDeck[];
  strings: HeroStrings;
};

/* Each placard is a link to the hub it names, in the pillar order the copy
   panel locked: the library first (the number is the anchor), the
   differentiator last. */
const PILLAR_HREFS = ['worksheets', 'activities', 'tools', 'worksheet-makers'] as const;

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
                  /* The frames never render wider than ~180px even at 2560,
                     so a full-size 480x620 PNG was ~130KB of waste each. */
                  sizes="(max-width: 640px) 26vw, 200px"
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
                    '--b': POSTER_H - PLINTH_Y - p.seat,
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

        {/* ── the type layer: real DOM text, never inside a scaled subtree.
            EXACTLY ONE CHILD — the identity gate asserts it. ── */}
        <div
          className="hv10-type"
          style={{ '--x': 23, '--y': 10.5, '--w': 54 } as React.CSSProperties}
        >
          <h1 className="hv10-h1">{strings.h1}</h1>
        </div>

        {/* The step: the stone nosing at the picture's foot, so the band
            below sits on a ledge rather than on a wall that resumes under a
            floor. Bleeds like the other architecture. */}
        <div className="hv10-step" aria-hidden="true" data-bleed />
      </div>

      {/* ── THE PLACARD BAND: what the site holds, in four museum labels ──
          Real-size text on the wall under the picture. The lead label carries
          the one numeral the marketing surface allows. Each label is a link
          to the hub it names. The band is reserved in the poster's fold
          budget (homepage-v10.css `--g10-band`) so that at 1366×768 the
          headline, all four labels and the primary CTA are inside the fold. */}
      <div className="hv10-below">
        <nav aria-label={strings.scope}>
          <ul className="hv10-placards">
            {strings.pillars.map((p, i) => (
              <li key={PILLAR_HREFS[i]}>
                <Link
                  href={`/${locale}/${PILLAR_HREFS[i]}`}
                  className={`hv10-placard${p.count ? ' is-lead' : ''}`}
                >
                  {p.count ? (
                    <strong className="hv10-placard-count">{p.count}</strong>
                  ) : null}
                  <span className="hv10-placard-title">{p.label}</span>
                  <span className="hv10-placard-gloss">{p.gloss}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="hv10-ctas">
          <Link href={`/${locale}/worksheets`} className="hv10-cta is-primary">
            {strings.ctaWorksheets}
          </Link>
          <Link href={`/${locale}/activities`} className="hv10-cta is-ghost">
            {strings.ctaActivities}
          </Link>
        </div>
        <p className="hv10-scope">{strings.scope}</p>
      </div>
    </header>
  );
}
