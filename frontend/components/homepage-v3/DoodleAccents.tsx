/* DoodleAccents — small SVG marks for hand-drawn warmth.
   All deliberately IRREGULAR (paths slightly off, ends not aligned, slight
   wobble) to read as hand-drawn rather than geometric. Used sparingly: at
   most 1-3 per section.
   Coral (#F2784B) is the default accent color; pass className for overrides. */

interface DoodleProps {
  className?: string;
  size?: number;
  rotate?: number;
}

/* ─── Sparkle — 4-point star with off-center positioning ────────────── */
export function Sparkle({ className = 'text-lcs-coral', size = 20, rotate = 0 }: DoodleProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      style={{ transform: `rotate(${rotate}deg)` }}
      aria-hidden="true"
    >
      {/* main 4-point burst — uneven arms so it reads hand-drawn */}
      <path
        d="M 12 1.5
           C 12.2 5, 13.5 8, 16 10
           C 18.5 11.8, 21.5 11, 22.5 12
           C 21 12.8, 18.2 12.8, 16.2 14.5
           C 13.8 16.2, 12.8 19.5, 12.3 22.5
           C 11.5 19.2, 10.8 16.2, 8.5 14.2
           C 6.2 12.5, 2.8 12.8, 1.5 12
           C 3 11, 6.2 11.3, 8.8 9.5
           C 11.2 7.8, 11.6 4.5, 12 1.5 Z"
        fill="currentColor"
      />
      {/* tiny offset dot — adds asymmetry */}
      <circle cx="20" cy="5" r="1.4" fill="currentColor" opacity="0.7" />
    </svg>
  );
}

/* ─── Squiggle — wavy hand-drawn underline ──────────────────────────── */
export function Squiggle({
  className = 'text-lcs-coral',
  width = 120,
  height = 12,
  strokeWidth = 3.5,
}: { className?: string; width?: number; height?: number; strokeWidth?: number }) {
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      className={className}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d={`M 2 ${height * 0.7}
            Q ${width * 0.15} ${height * 0.2}, ${width * 0.3} ${height * 0.6}
            T ${width * 0.55} ${height * 0.5}
            T ${width * 0.8} ${height * 0.7}
            T ${width - 2} ${height * 0.4}`}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ─── Arrow — short hand-drawn arrow with curve + arrowhead ─────────── */
export function Arrow({
  className = 'text-lcs-coral',
  width = 90,
  height = 60,
  rotate = 0,
  strokeWidth = 2.4,
}: { className?: string; width?: number; height?: number; rotate?: number; strokeWidth?: number }) {
  return (
    <svg
      viewBox="0 0 90 60"
      width={width}
      height={height}
      className={className}
      style={{ transform: `rotate(${rotate}deg)` }}
      aria-hidden="true"
    >
      {/* the curving body — wavy hand-drawn */}
      <path
        d="M 5 10 Q 20 5, 35 18 T 65 35 Q 70 38, 78 45"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      {/* arrowhead — two strokes, asymmetric */}
      <path
        d="M 78 45 L 70 40 M 78 45 L 76 36"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ─── HandCheck — wavy hand-drawn check mark ────────────────────────── */
export function HandCheck({ className = 'text-lcs-coral', size = 22 }: DoodleProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-hidden="true">
      <path
        d="M 3 13 Q 5 12, 8 16 T 11 17 Q 13 13, 16 9 T 22 4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ─── DoodleBullet — small loop or dot mark used in supporting-line lists  */
export function DoodleBullet({
  className = 'text-lcs-coral',
  size = 18,
  variant = 'loop',
}: { className?: string; size?: number; variant?: 'loop' | 'dot' | 'star' }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-hidden="true">
      {variant === 'loop' && (
        <path
          d="M 8 12 C 8 7, 16 7, 16 12 C 16 16, 9 17, 7 14"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
      )}
      {variant === 'dot' && (
        <circle cx="12" cy="12" r="4" fill="currentColor" />
      )}
      {variant === 'star' && (
        <path
          d="M 12 4 L 14 10 L 20 11 L 15 15 L 17 21 L 12 17 L 7 21 L 9 15 L 4 11 L 10 10 Z"
          fill="currentColor"
        />
      )}
    </svg>
  );
}

/* ─── Pencil — small hand-drawn pencil icon ─────────────────────────── */
export function Pencil({ className = 'text-lcs-coral', size = 28, rotate = -8 }: DoodleProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      className={className}
      style={{ transform: `rotate(${rotate}deg)` }}
      aria-hidden="true"
    >
      {/* shaft */}
      <path
        d="M 6 25 L 22 9 L 26 13 L 10 29 Z"
        fill="currentColor"
        opacity="0.92"
      />
      {/* tip */}
      <path
        d="M 6 25 L 4 30 L 10 29 Z"
        fill="#3A352B"
      />
      {/* eraser end */}
      <path
        d="M 22 9 L 24 7 L 28 11 L 26 13 Z"
        fill="#F2C9B8"
        stroke="#D9633A"
        strokeWidth="1"
      />
      {/* highlight line */}
      <line x1="9" y1="22" x2="23" y2="10" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
