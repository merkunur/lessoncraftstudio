/* ToolVignette — miniature WORKING classroom apparatus built from pure CSS
   divs (homepage-v6.css keyframes). The Lesson Line's signature: at the seams
   between moments, a real instrument sits on the line, quietly doing its job.

   Every vignette is decorative (aria-hidden) with a visible caption that IS
   real text. Under prefers-reduced-motion each freezes at a composed pose
   that still tells its story (see the reduced-motion block in the CSS).

   Server component. No images, no iframes, no JS. */

export type VignetteVariant = 'rekenrek' | 'balance' | 'letter-tiles' | 'clock' | 'choral';

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
          pushed
            ? ({ '--i': i, '--wave': row === 0 ? 0 : 2.2, '--push': '-92px' } as React.CSSProperties)
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

const VIGNETTES: Record<VignetteVariant, () => JSX.Element> = {
  rekenrek: Rekenrek,
  balance: Balance,
  'letter-tiles': LetterTiles,
  clock: Clock,
  choral: Choral,
};

interface ToolVignetteProps {
  variant: VignetteVariant;
  /** Optional pen-note caption under the stage (the teacher's-pen voice). */
  caption?: string;
  /** Render bare (no stage card) — used inside the hero's own stage. */
  bare?: boolean;
}

export default function ToolVignette({ variant, caption, bare = false }: ToolVignetteProps) {
  const V = VIGNETTES[variant];
  if (bare) return <V />;
  return (
    <div className="hv6-seam">
      <div className="hv6-stage">
        <V />
      </div>
      {caption && <p className="hv6-pen">{caption}</p>}
    </div>
  );
}
