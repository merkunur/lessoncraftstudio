/* ToolVignette — miniature WORKING classroom apparatus built from pure CSS
   divs (homepage-v6.css keyframes). v9 signature: the tool cards ARE these
   machines — nine variants, each quietly doing its job on the page.

   Every vignette is decorative (aria-hidden); any caption is real text
   rendered by the caller. Under prefers-reduced-motion each freezes at a
   composed pose that still tells its story (see the reduced-motion block
   in the CSS).

   Server component. No images, no iframes, no JS. */

export type VignetteVariant =
  | 'rekenrek'
  | 'balance'
  | 'letter-tiles'
  | 'clock'
  | 'choral'
  | 'sieve'
  | 'lids'
  | 'planks'
  | 'draw-bag';

function Rekenrek() {
  // Two rails × 10 beads (5 coral + 5 teal, like the wooden original).
  // Row 1 pushes 3 beads left; row 2 pushes 4 on a delayed wave: the class
  // "sees" 3, then 7 — then the frame resets.
  const bead = (row: number, i: number) => {
    const isTeal = i >= 5;
    const pushed = row === 0 ? i < 3 : i < 4;
    return (
      <span
        key={i}
        className={`hv6-rek-bead${isTeal ? ' is-t' : ''}${pushed ? ' is-push' : ''}`}
        style={
          // --push comes from the stylesheet (computed from the rail's own
          // slack via container query — beads can never escape the stage).
          pushed
            ? ({ '--i': i, '--wave': row === 0 ? 0 : 2.2 } as React.CSSProperties)
            : undefined
        }
      />
    );
  };
  return (
    <div className="hv6-rek" aria-hidden="true">
      <div className="hv6-rek-rail">{Array.from({ length: 10 }, (_, i) => bead(0, i))}</div>
      <div className="hv6-rek-rail">{Array.from({ length: 10 }, (_, i) => bead(1, i))}</div>
    </div>
  );
}

function Balance() {
  // The beam tips under one cube, a second cube drops into the light pan,
  // and the beam settles level — nobody had to say "wrong".
  return (
    <div className="hv6-bal" aria-hidden="true">
      <div className="hv6-bal-beam">
        <div className="hv6-bal-pan is-l">
          <span className="hv6-bal-cube drops" />
        </div>
        <div className="hv6-bal-pan is-r">
          <span className="hv6-bal-cube in-pan-r" />
          <span className="hv6-bal-cube in-pan-r" />
        </div>
      </div>
      <div className="hv6-bal-post" />
      <div className="hv6-bal-foot" />
    </div>
  );
}

function LetterTiles() {
  // c · a · t drop into their slots; a chalk rule sweeps under the word.
  const letters = ['c', 'a', 't'];
  return (
    <div className="hv6-tiles" aria-hidden="true">
      {letters.map((ch, i) => (
        <span key={ch} className="hv6-tile-slot">
          <span className="hv6-tile" style={{ '--i': i } as React.CSSProperties}>
            {ch}
          </span>
        </span>
      ))}
      <span className="hv6-tiles-rule" />
    </div>
  );
}

function Clock() {
  // Sweeps 9:00 → 9:15 → 9:30: the lesson moves on.
  return (
    <div className="hv6-clock" aria-hidden="true">
      {Array.from({ length: 12 }, (_, i) => (
        <span key={i} className="hv6-clock-tick" style={{ transform: `rotate(${i * 30}deg)` }} />
      ))}
      <span className="hv6-clock-hand is-hour" />
      <span className="hv6-clock-hand is-min" />
      <span className="hv6-clock-dot" />
    </div>
  );
}

function Choral() {
  // A 5×4 counting chart writes itself one cell at a time; the decades pop
  // coral — the pattern the whole class chants toward.
  return (
    <div className="hv6-choral" aria-hidden="true">
      {Array.from({ length: 20 }, (_, i) => {
        const n = i + 1;
        return (
          <span
            key={n}
            className={`hv6-choral-cell${n % 10 === 0 ? ' is-decade' : ''}`}
            style={{ '--i': i } as React.CSSProperties}
          >
            {n}
          </span>
        );
      })}
    </div>
  );
}

const PRIMES = new Set([2, 3, 5, 7, 11, 13, 17, 19]);

function Sieve() {
  // The number sieve: a 5×4 field of 2–21; the clue card runs and the
  // non-primes go dark, one after another — the survivors stay alight.
  return (
    <div className="hv9-sieve" aria-hidden="true">
      {Array.from({ length: 20 }, (_, i) => {
        const n = i + 2;
        const keep = PRIMES.has(n);
        return (
          <span
            key={n}
            className={`hv9-sieve-cell ${keep ? 'is-keep' : 'is-out'}`}
            style={{ '--i': i } as React.CSSProperties}
          >
            {n}
          </span>
        );
      })}
    </div>
  );
}

function Lids() {
  // The lid flips open; the three counters were there all along.
  return (
    <div className="hv9-lids" aria-hidden="true">
      <span className="hv9-lids-table" />
      {[1, 2, 3].map((n, i) => (
        <span key={n} className={`hv9-lid-counter is-c${n}`} style={{ '--i': i } as React.CSSProperties} />
      ))}
      <span className="hv9-lid" />
    </div>
  );
}

function Planks() {
  // Two planks morph past each other; the chevron flips to keep pointing
  // at the longer one — the comparison stays true through the change.
  return (
    <div className="hv9-planks" aria-hidden="true">
      <span className="hv9-plank is-a" />
      <span className="hv9-plank is-b" />
      <span className="hv9-plank-mark" />
    </div>
  );
}

function DrawBag() {
  // A token pops out of the bag and the record writes itself, one tally
  // stroke per draw.
  return (
    <div className="hv9-bag-stage" aria-hidden="true">
      <span className="hv9-bag" />
      <span className="hv9-bag-token" />
      <span className="hv9-tally-strip">
        <span className="hv9-tally is-t1" />
        <span className="hv9-tally is-t2" />
        <span className="hv9-tally is-t3" />
        <span className="hv9-tally is-t4" />
      </span>
    </div>
  );
}

const VIGNETTES: Record<VignetteVariant, () => JSX.Element> = {
  rekenrek: Rekenrek,
  balance: Balance,
  'letter-tiles': LetterTiles,
  clock: Clock,
  choral: Choral,
  sieve: Sieve,
  lids: Lids,
  planks: Planks,
  'draw-bag': DrawBag,
};

interface ToolVignetteProps {
  variant: VignetteVariant;
}

/* v9 renders every vignette bare — the caller owns the stage (tool card
   art, keep-band choral card, make-band tiles strip). */
export default function ToolVignette({ variant }: ToolVignetteProps) {
  const V = VIGNETTES[variant];
  return <V />;
}
