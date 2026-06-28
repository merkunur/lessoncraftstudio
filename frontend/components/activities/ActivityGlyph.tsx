/**
 * ActivityGlyph — a small, distinctive inline-SVG mark per activity engine.
 *
 * Activities are interactive iframes with no thumbnail; the card's visual is a
 * crafted glyph drawn from the engine's own world (a ten-frame's grid, a number
 * bond's circles, a clock face…), tinted in the subject color. currentColor
 * drives every stroke/fill, so the parent sets the hue via a text-* class.
 *
 * Engine key = the manifest `tool` with the trailing "-activity" stripped
 * (e.g. "number-bond-activity" → "number-bond"). Unknown engines fall back to
 * a neutral mark. viewBox is a 48×48 square; the parent sizes it.
 */
import type { SVGProps } from 'react';

export function engineKeyFromTool(tool: string): string {
  return (tool || '').replace(/-activity$/, '');
}

type GlyphProps = SVGProps<SVGSVGElement>;

const base = (props: GlyphProps) => ({
  viewBox: '0 0 48 48',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2.4,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
  focusable: false,
  ...props,
});

/* ── per-engine glyphs ───────────────────────────────────────────────── */

function TenFrame(p: GlyphProps) {
  // 2 rows × 5 cells; first three filled (counters).
  const cells = [];
  for (let r = 0; r < 2; r++)
    for (let c = 0; c < 5; c++) {
      const x = 4 + c * 8,
        y = 16 + r * 8;
      cells.push(<rect key={`${r}-${c}`} x={x} y={y} width={7} height={7} rx={1.5} />);
    }
  return (
    <svg {...base(p)}>
      {cells}
      <circle cx={7.5} cy={19.5} r={2.1} fill="currentColor" stroke="none" />
      <circle cx={15.5} cy={19.5} r={2.1} fill="currentColor" stroke="none" />
      <circle cx={23.5} cy={19.5} r={2.1} fill="currentColor" stroke="none" />
    </svg>
  );
}

function NumberBond(p: GlyphProps) {
  return (
    <svg {...base(p)}>
      <line x1={24} y1={17} x2={14} y2={33} />
      <line x1={24} y1={17} x2={34} y2={33} />
      <circle cx={24} cy={13} r={7} />
      <circle cx={13} cy={36} r={6.5} />
      <circle cx={35} cy={36} r={6.5} />
    </svg>
  );
}

function ArrayDots(p: GlyphProps) {
  const dots = [];
  for (let r = 0; r < 3; r++)
    for (let c = 0; c < 4; c++)
      dots.push(<circle key={`${r}-${c}`} cx={11 + c * 9} cy={14 + r * 9} r={2.6} fill="currentColor" stroke="none" />);
  return (
    <svg {...base(p)}>
      {dots}
      <rect x={5} y={8} width={38} height={32} rx={4} opacity={0.45} />
    </svg>
  );
}

function PlaceValue(p: GlyphProps) {
  // hundreds block (3×3) · tens column (3×1) · ones (1)
  const block = [];
  for (let r = 0; r < 3; r++)
    for (let c = 0; c < 3; c++) block.push(<rect key={`b${r}-${c}`} x={6 + c * 5} y={18 + r * 5} width={4} height={4} rx={1} />);
  const tens = [0, 1, 2].map((r) => <rect key={`t${r}`} x={26} y={18 + r * 5} width={4} height={4} rx={1} />);
  return (
    <svg {...base(p)}>
      {block}
      {tens}
      <rect x={38} y={28} width={4} height={4} rx={1} />
    </svg>
  );
}

function Clock(p: GlyphProps) {
  return (
    <svg {...base(p)}>
      <circle cx={24} cy={24} r={17} />
      <line x1={24} y1={24} x2={24} y2={14} />
      <line x1={24} y1={24} x2={31} y2={27} />
      <circle cx={24} cy={24} r={1.6} fill="currentColor" stroke="none" />
      <line x1={24} y1={8} x2={24} y2={10.5} />
      <line x1={40} y1={24} x2={37.5} y2={24} />
      <line x1={24} y1={40} x2={24} y2={37.5} />
      <line x1={8} y1={24} x2={10.5} y2={24} />
    </svg>
  );
}

function Fractions(p: GlyphProps) {
  return (
    <svg {...base(p)}>
      <circle cx={24} cy={24} r={16} />
      <line x1={24} y1={8} x2={24} y2={40} />
      <line x1={8} y1={24} x2={40} y2={24} />
      <path d="M24 24 L24 8 A16 16 0 0 1 40 24 Z" fill="currentColor" stroke="none" opacity={0.85} />
    </svg>
  );
}

function MatchPairs(p: GlyphProps) {
  return (
    <svg {...base(p)}>
      <rect x={5} y={14} width={14} height={20} rx={3} />
      <rect x={29} y={14} width={14} height={20} rx={3} />
      <line x1={19} y1={24} x2={29} y2={24} />
      <circle cx={19} cy={24} r={2.2} fill="currentColor" stroke="none" />
      <circle cx={29} cy={24} r={2.2} fill="currentColor" stroke="none" />
    </svg>
  );
}

function SortBins(p: GlyphProps) {
  return (
    <svg {...base(p)}>
      <path d="M6 24 L18 24 L16 40 L8 40 Z" />
      <path d="M30 24 L42 24 L40 40 L32 40 Z" />
      <rect x={9} y={7} width={8} height={8} rx={1.5} />
      <path d="M22 11 L28 11" />
      <path d="M25.5 8.5 L28 11 L25.5 13.5" />
      <rect x={31} y={7} width={8} height={8} rx={4} />
    </svg>
  );
}

function ChoiceBoard(p: GlyphProps) {
  return (
    <svg {...base(p)}>
      <rect x={6} y={6} width={16} height={16} rx={3} />
      <rect x={26} y={6} width={16} height={16} rx={3} />
      <rect x={6} y={26} width={16} height={16} rx={3} />
      <rect x={26} y={26} width={16} height={16} rx={3} />
      <path d="M29.5 34 L33 37.5 L39 30" />
    </svg>
  );
}

function LetterTiles(p: GlyphProps) {
  // cvc-builder — three letter tiles
  return (
    <svg {...base(p)}>
      <rect x={4} y={16} width={12} height={16} rx={2.5} />
      <rect x={18} y={16} width={12} height={16} rx={2.5} />
      <rect x={32} y={16} width={12} height={16} rx={2.5} />
      <line x1={8} y1={28} x2={12} y2={28} />
      <path d="M22 28 L24 21 L26 28 M22.7 25.5 L25.3 25.5" />
      <line x1={36} y1={20} x2={36} y2={28} />
      <line x1={36} y1={28} x2={40} y2={28} />
    </svg>
  );
}

function SyllableTiles(p: GlyphProps) {
  // syllable-builder — two chunks joined by a bridge
  return (
    <svg {...base(p)}>
      <rect x={5} y={17} width={16} height={14} rx={3} />
      <rect x={27} y={17} width={16} height={14} rx={3} />
      <path d="M21 24 L27 24" />
      <circle cx={13} cy={24} r={2} fill="currentColor" stroke="none" />
      <circle cx={35} cy={24} r={2} fill="currentColor" stroke="none" />
    </svg>
  );
}

/* ── per-CATEGORY glyphs (strand-keyed fallback for unmapped engines) ───── */

function CountDots(p: GlyphProps) {
  // counting & cardinality — five counters in a row
  const cx = [10, 19, 28, 37, 46];
  return (
    <svg {...base(p)}>
      {cx.slice(0, 4).map((x, i) => (
        <circle key={i} cx={x} cy={24} r={3.4} fill="currentColor" stroke="none" />
      ))}
      <circle cx={cx[3] + 9} cy={24} r={3.4} />
    </svg>
  );
}

function Operators(p: GlyphProps) {
  // operations & algebraic thinking — plus over minus
  return (
    <svg {...base(p)}>
      <line x1={16} y1={11} x2={16} y2={23} />
      <line x1={10} y1={17} x2={22} y2={17} />
      <line x1={27} y1={33} x2={39} y2={33} />
      <circle cx={33} cy={17} r={2} fill="currentColor" stroke="none" />
    </svg>
  );
}

function Shapes(p: GlyphProps) {
  // geometry — triangle, square, circle
  return (
    <svg {...base(p)}>
      <path d="M13 30 L19 18 L25 30 Z" />
      <rect x={27} y={18} width={12} height={12} rx={1.5} />
      <circle cx={20} cy={37} r={0} stroke="none" />
      <circle cx={33} cy={12.5} r={4.5} />
    </svg>
  );
}

function Ruler(p: GlyphProps) {
  // measurement & data — a ruler with ticks
  return (
    <svg {...base(p)}>
      <rect x={6} y={19} width={36} height={10} rx={2} />
      <line x1={13} y1={19} x2={13} y2={24} />
      <line x1={20} y1={19} x2={20} y2={25} />
      <line x1={27} y1={19} x2={27} y2={24} />
      <line x1={34} y1={19} x2={34} y2={25} />
    </svg>
  );
}

function Book(p: GlyphProps) {
  // reading (foundational / literature / informational) — an open book
  return (
    <svg {...base(p)}>
      <path d="M24 15 C20 12 13 12 9 14 L9 33 C13 31 20 31 24 34 C28 31 35 31 39 33 L39 14 C35 12 28 12 24 15 Z" />
      <line x1={24} y1={15} x2={24} y2={34} />
    </svg>
  );
}

function Abc(p: GlyphProps) {
  // language — letters
  return (
    <svg {...base(p)}>
      <path d="M8 31 L12.5 17 L17 31 M9.6 26.5 L15.4 26.5" />
      <path d="M22 17 L22 31 M22 17 C28 17 28 23.5 22 23.5 M22 23.5 C29 23.5 29 31 22 31" />
      <path d="M40 20 C36 16 31 19 31 24 C31 29 36 32 40 28" />
    </svg>
  );
}

function SoundWaves(p: GlyphProps) {
  // phonological awareness — a speaker with sound arcs
  return (
    <svg {...base(p)}>
      <path d="M10 20 L16 20 L23 14 L23 34 L16 28 L10 28 Z" />
      <path d="M29 19 C32 22 32 26 29 29" />
      <path d="M33 15 C38 20 38 28 33 33" />
    </svg>
  );
}

function Fallback(p: GlyphProps) {
  return (
    <svg {...base(p)}>
      <rect x={7} y={7} width={34} height={34} rx={7} />
      <path d="M24 16 L26.5 21.5 L32 24 L26.5 26.5 L24 32 L21.5 26.5 L16 24 L21.5 21.5 Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

const GLYPHS: Record<string, (p: GlyphProps) => JSX.Element> = {
  'ten-frame': TenFrame,
  'number-bond': NumberBond,
  array: ArrayDots,
  'place-value': PlaceValue,
  clock: Clock,
  fractions: Fractions,
  'match-pairs': MatchPairs,
  'sort-bins': SortBins,
  'choice-board': ChoiceBoard,
  'cvc-builder': LetterTiles,
  'syllable-builder': SyllableTiles,
};

/* strandKey (from lib/activities-catalog) → a topical glyph, so every card —
   including new clean-sibling engines with no per-engine glyph — shows a
   meaningful mark, never the bare star. */
const CATEGORY_GLYPHS: Record<string, (p: GlyphProps) => JSX.Element> = {
  counting: CountDots,
  operations: Operators,
  'base-ten': PlaceValue,
  measurement: Ruler,
  geometry: Shapes,
  reading: Book,
  phonological: SoundWaves,
  language: Abc,
};

export default function ActivityGlyph({
  tool,
  category,
  subject,
  className,
}: {
  tool: string;
  /** strandKey() value — topical fallback when the engine has no glyph */
  category?: string;
  /** 'math' | 'literacy' — last-resort topical fallback before the star */
  subject?: string;
  className?: string;
}) {
  const Glyph =
    GLYPHS[engineKeyFromTool(tool)] ??
    (category && CATEGORY_GLYPHS[category]) ??
    (subject === 'literacy' ? Book : subject === 'math' ? Operators : Fallback);
  return <Glyph className={className} />;
}
