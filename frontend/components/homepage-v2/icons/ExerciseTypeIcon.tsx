/**
 * ExerciseTypeIcon — Alt A above-the-fold visible-at-a-glance glyph set per
 * Arc 2 A2 operator-locked adjudication (2026-05-06; commit pending).
 *
 * 29 single-color, currentColor-friendly, hand-authored inline SVG glyphs
 * — one per §14.10 canonical exercise-type. Per-glyph spec:
 *   - viewBox="0 0 24 24"
 *   - stroke + fill via currentColor (Tailwind `text-*` cascades)
 *   - stroke-width 1.75
 *   - stroke-linecap="round", stroke-linejoin="round"
 *   - no gradients, no multi-color, no detailed scenes
 *   - recognizable at 32×32 render size (squint-test: silhouette signals
 *     the concept even when fine detail blurs)
 *   - one consistent style family across all 29 — stroke-led with sparse
 *     fills only where it disambiguates (e.g., a number badge)
 *
 * Style family (locked at this commit): stroke-led 1.75 with rounded caps;
 * fills used sparingly for marker-dots, plus-signs, X-marks, and similar
 * concept-anchors that read better filled. No outlines on filled glyphs.
 *
 * Shape choices anchor in the operator's suggested glyph palette where
 * given; CC-adjudicated where the suggestion was open or where a clearer
 * alternative emerged during authoring.
 *
 * Dispatch: <ExerciseTypeIcon name={axisKey} className="..." /> renders the
 * glyph for the given §14.10 canonical name. Unknown names log a console
 * warn and fall through to a neutral placeholder so partial-publish states
 * don't render as broken.
 */

import type { CanonicalExerciseType } from '@/lib/catalog-axes';

// Common SVG props shared by all 29 glyphs. Stroke-led; rounded caps for
// the warm K-3 aesthetic; viewBox locked to 24×24 per spec.
const ICON_BASE_PROPS = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  xmlns: 'http://www.w3.org/2000/svg',
};

type IconRenderer = () => React.ReactElement;

// ─────────────────────────────────────────────────────────────────────────
// 29 §14.10 canonical exercise-type glyphs
// Order mirrors CANONICAL_29_EXERCISE_TYPES in catalog-axes.ts for
// maintenance parity.
// ─────────────────────────────────────────────────────────────────────────

const ICONS: Record<CanonicalExerciseType, IconRenderer> = {
  // addition — bold plus sign in a soft-rounded square
  addition: () => (
    <>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <line x1="12" y1="8" x2="12" y2="16" />
      <line x1="8" y1="12" x2="16" y2="12" />
    </>
  ),

  // alphabet-train — locomotive silhouette + letter blocks (A B C cars)
  'alphabet-train': () => (
    <>
      {/* engine cab */}
      <rect x="2" y="11" width="6" height="6" rx="0.5" />
      <line x1="5" y1="11" x2="5" y2="9" />
      <circle cx="5" cy="8" r="0.75" fill="currentColor" stroke="none" />
      {/* car 1 + 2 */}
      <rect x="9" y="12" width="5" height="5" />
      <rect x="15" y="12" width="5" height="5" />
      {/* wheels */}
      <circle cx="4" cy="19" r="1.25" />
      <circle cx="11" cy="19" r="1.25" />
      <circle cx="17" cy="19" r="1.25" />
      {/* letter glints */}
      <line x1="11" y1="14" x2="12" y2="14.5" />
      <line x1="17" y1="14" x2="18" y2="14.5" />
    </>
  ),

  // big-small — paired squares, large + small, comparison
  'big-small': () => (
    <>
      <rect x="3" y="6" width="9" height="12" rx="1" />
      <rect x="14" y="11" width="6" height="7" rx="1" />
    </>
  ),

  // bingo — 3×3 stencil with center marked
  bingo: () => (
    <>
      <rect x="3" y="3" width="18" height="18" rx="1.5" />
      <line x1="9" y1="3" x2="9" y2="21" />
      <line x1="15" y1="3" x2="15" y2="21" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="3" y1="15" x2="21" y2="15" />
      <circle cx="12" cy="12" r="1.75" fill="currentColor" stroke="none" />
    </>
  ),

  // chart-count — three vertical bars increasing
  'chart-count': () => (
    <>
      <line x1="3" y1="20" x2="21" y2="20" />
      <rect x="5" y="14" width="3.5" height="6" />
      <rect x="10.25" y="10" width="3.5" height="10" />
      <rect x="15.5" y="6" width="3.5" height="14" />
    </>
  ),

  // code-addition — plus inside a key/lock; the secret-word reveal mode
  'code-addition': () => (
    <>
      <circle cx="9" cy="12" r="4" />
      <line x1="13" y1="12" x2="21" y2="12" />
      <line x1="18" y1="12" x2="18" y2="15" />
      <line x1="20" y1="12" x2="20" y2="14" />
      <line x1="7.5" y1="10.5" x2="10.5" y2="13.5" />
      <line x1="10.5" y1="10.5" x2="7.5" y2="13.5" />
    </>
  ),

  // crossword — interlocking word-grid cross pattern
  crossword: () => (
    <>
      <rect x="3" y="9" width="18" height="6" />
      <rect x="9" y="3" width="6" height="18" />
      <line x1="9" y1="9" x2="9" y2="15" />
      <line x1="15" y1="9" x2="15" y2="15" />
      <line x1="9" y1="9" x2="15" y2="9" />
      <line x1="9" y1="15" x2="15" y2="15" />
    </>
  ),

  // cryptogram — letter substitutes for a symbol (A → ★)
  cryptogram: () => (
    <>
      <text x="3" y="15.5" fontFamily="serif" fontSize="9" fontWeight="700" fill="currentColor" stroke="none">A</text>
      <line x1="10.5" y1="12" x2="14.5" y2="12" />
      <polyline points="13,10 14.5,12 13,14" />
      <polygon points="18.5,9.5 19.4,11.6 21.5,11.7 19.8,13 20.5,15 18.5,13.8 16.5,15 17.2,13 15.5,11.7 17.6,11.6" fill="currentColor" stroke="none" />
    </>
  ),

  // find-and-count — magnifier with a number badge
  'find-and-count': () => (
    <>
      <circle cx="10" cy="10" r="6" />
      <line x1="14.5" y1="14.5" x2="20" y2="20" />
      <text x="6.5" y="13" fontFamily="sans-serif" fontSize="7" fontWeight="700" fill="currentColor" stroke="none">3</text>
    </>
  ),

  // find-objects — plain magnifier (no count)
  'find-objects': () => (
    <>
      <circle cx="10" cy="10" r="6" />
      <line x1="14.5" y1="14.5" x2="20" y2="20" />
      <line x1="7" y1="10" x2="13" y2="10" />
    </>
  ),

  // grid-match — two grids, one with shaded cell pattern echoing the other
  'grid-match': () => (
    <>
      <rect x="3" y="3" width="8" height="8" />
      <line x1="3" y1="7" x2="11" y2="7" />
      <line x1="7" y1="3" x2="7" y2="11" />
      <rect x="13" y="13" width="8" height="8" />
      <line x1="13" y1="17" x2="21" y2="17" />
      <line x1="17" y1="13" x2="17" y2="21" />
      <rect x="3" y="3" width="4" height="4" fill="currentColor" stroke="none" />
      <rect x="13" y="13" width="4" height="4" fill="currentColor" stroke="none" />
    </>
  ),

  // matching — two dots connected by a curved line
  matching: () => (
    <>
      <circle cx="5" cy="7" r="2" fill="currentColor" stroke="none" />
      <circle cx="19" cy="17" r="2" fill="currentColor" stroke="none" />
      <path d="M 6.5 8.5 Q 12 8 12 13 Q 12 17 17.5 16.5" />
    </>
  ),

  // math-puzzle — puzzle piece with an = sign
  'math-puzzle': () => (
    <>
      <path d="M 4 6 L 4 18 L 16 18 L 16 14 Q 19 14 19 12 Q 19 10 16 10 L 16 6 Z" />
      <line x1="8" y1="11" x2="12" y2="11" />
      <line x1="8" y1="13" x2="12" y2="13" />
    </>
  ),

  // math-worksheet — paper with math equation
  'math-worksheet': () => (
    <>
      <rect x="5" y="3" width="14" height="18" rx="1" />
      <line x1="8" y1="8" x2="11" y2="8" />
      <line x1="13" y1="8" x2="16" y2="8" />
      <line x1="8" y1="12" x2="16" y2="12" />
      <text x="8.5" y="18" fontFamily="sans-serif" fontSize="6" fontWeight="700" fill="currentColor" stroke="none">2+3</text>
    </>
  ),

  // missing-pieces — puzzle piece outline with a gap (the missing piece)
  'missing-pieces': () => (
    <>
      <path d="M 3 6 L 3 18 L 11 18 Q 11 14 13 14 Q 15 14 15 18 L 21 18 L 21 12 Q 19 12 19 10 Q 19 8 21 8 L 21 6 Z" />
      <rect x="13" y="6" width="3" height="3" strokeDasharray="1.5 1" />
    </>
  ),

  // more-less — < and > symbols
  'more-less': () => (
    <>
      <polyline points="8,5 4,12 8,19" />
      <polyline points="16,5 20,12 16,19" />
    </>
  ),

  // odd-one-out — three circles + one square
  'odd-one-out': () => (
    <>
      <circle cx="6" cy="7" r="2.25" />
      <circle cx="18" cy="7" r="2.25" />
      <circle cx="6" cy="17" r="2.25" />
      <rect x="15" y="14.5" width="6" height="5" rx="0.5" />
    </>
  ),

  // pattern-train — train + repeating triangle/circle/square pattern
  'pattern-train': () => (
    <>
      <rect x="2" y="13" width="4" height="4" />
      <rect x="7" y="13" width="4" height="4" />
      <rect x="12" y="13" width="4" height="4" />
      <rect x="17" y="13" width="4" height="4" />
      <circle cx="3.5" cy="20" r="1" />
      <circle cx="9" cy="20" r="1" />
      <circle cx="14" cy="20" r="1" />
      <circle cx="19" cy="20" r="1" />
      <circle cx="4" cy="15" r="0.6" fill="currentColor" stroke="none" />
      <polygon points="9,11.5 7.5,15 10.5,15" fill="currentColor" stroke="none" />
      <rect x="13" y="13.5" width="2" height="2" fill="currentColor" stroke="none" />
      <circle cx="19" cy="15" r="0.6" fill="currentColor" stroke="none" />
    </>
  ),

  // pattern-worksheet — repeating ABC ABC pattern
  'pattern-worksheet': () => (
    <>
      <text x="3" y="15" fontFamily="sans-serif" fontSize="6.5" fontWeight="700" fill="currentColor" stroke="none">ABC</text>
      <text x="13" y="15" fontFamily="sans-serif" fontSize="6.5" fontWeight="700" fill="currentColor" stroke="none">AB?</text>
      <line x1="3" y1="18" x2="21" y2="18" />
    </>
  ),

  // picture-path — winding line through dots (like a maze trail)
  'picture-path': () => (
    <>
      <circle cx="4" cy="6" r="1.25" fill="currentColor" stroke="none" />
      <circle cx="20" cy="18" r="1.25" fill="currentColor" stroke="none" />
      <path d="M 4 6 L 9 6 L 9 12 L 15 12 L 15 18 L 20 18" />
    </>
  ),

  // picture-sort — items being sorted into bins (two bins + an item arrow)
  'picture-sort': () => (
    <>
      <rect x="3" y="13" width="7" height="7" rx="0.75" />
      <rect x="14" y="13" width="7" height="7" rx="0.75" />
      <circle cx="12" cy="6" r="2" />
      <line x1="12" y1="8" x2="6" y2="13" />
      <polyline points="6.5,11.5 5.5,13 7,13.5" />
    </>
  ),

  // prepositions — box with arrow above (concept of over/under positions)
  prepositions: () => (
    <>
      <rect x="6" y="13" width="12" height="6" rx="0.5" />
      <line x1="12" y1="10" x2="12" y2="4" />
      <polyline points="9,7 12,4 15,7" />
    </>
  ),

  // shadow-match — object + its shadow silhouette below
  'shadow-match': () => (
    <>
      <circle cx="9" cy="8" r="3" />
      <line x1="9" y1="11" x2="9" y2="14" />
      <ellipse cx="9" cy="17" rx="5" ry="1.25" fill="currentColor" stroke="none" opacity="0.6" />
      <circle cx="18" cy="8" r="3" strokeDasharray="1.5 1" />
      <ellipse cx="18" cy="17" rx="3.5" ry="1" fill="currentColor" stroke="none" opacity="0.6" />
    </>
  ),

  // subtraction — minus sign in a soft-rounded square (mirrors addition)
  subtraction: () => (
    <>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <line x1="8" y1="12" x2="16" y2="12" />
    </>
  ),

  // sudoku — 4×4 picture-sudoku grid with one filled cell (per §14.10 picture-sudoku canonical)
  sudoku: () => (
    <>
      <rect x="3" y="3" width="18" height="18" rx="0.5" />
      <line x1="8.25" y1="3" x2="8.25" y2="21" />
      <line x1="12" y1="3" x2="12" y2="21" />
      <line x1="15.75" y1="3" x2="15.75" y2="21" />
      <line x1="3" y1="8.25" x2="21" y2="8.25" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="15.75" x2="21" y2="15.75" />
      <rect x="4.5" y="4.5" width="2.25" height="2.25" fill="currentColor" stroke="none" />
      <rect x="13.5" y="13.5" width="2.25" height="2.25" fill="currentColor" stroke="none" />
    </>
  ),

  // treasure-hunt — X marks the spot on a map fragment
  'treasure-hunt': () => (
    <>
      <path d="M 4 5 L 8 4 L 12 6 L 16 4 L 20 5 L 20 19 L 16 20 L 12 18 L 8 20 L 4 19 Z" />
      <line x1="9" y1="11" x2="13" y2="15" />
      <line x1="13" y1="11" x2="9" y2="15" />
    </>
  ),

  // word-guess — speech bubble with a question mark
  'word-guess': () => (
    <>
      <path d="M 3 6 Q 3 4 5 4 L 19 4 Q 21 4 21 6 L 21 14 Q 21 16 19 16 L 11 16 L 7 20 L 7 16 L 5 16 Q 3 16 3 14 Z" />
      <text x="9.5" y="13" fontFamily="sans-serif" fontSize="9" fontWeight="700" fill="currentColor" stroke="none">?</text>
    </>
  ),

  // word-scramble — letters jumbled at varying angles
  'word-scramble': () => (
    <>
      <text x="3" y="11" fontFamily="serif" fontSize="7" fontWeight="700" fill="currentColor" stroke="none" transform="rotate(-12 6 11)">C</text>
      <text x="9" y="13" fontFamily="serif" fontSize="7" fontWeight="700" fill="currentColor" stroke="none" transform="rotate(8 12 13)">A</text>
      <text x="14" y="10" fontFamily="serif" fontSize="7" fontWeight="700" fill="currentColor" stroke="none" transform="rotate(-6 17 10)">T</text>
      <line x1="3" y1="18" x2="21" y2="18" strokeDasharray="2 1.5" />
    </>
  ),

  // wordsearch — letter grid with diagonal highlight
  wordsearch: () => (
    <>
      <rect x="3" y="3" width="18" height="18" rx="0.5" />
      <line x1="9" y1="3" x2="9" y2="21" />
      <line x1="15" y1="3" x2="15" y2="21" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="3" y1="15" x2="21" y2="15" />
      <line x1="5" y1="5" x2="19" y2="19" strokeWidth="2.5" />
    </>
  ),
};

/**
 * <ExerciseTypeIcon name={axisKey} className="..." />
 *
 * Renders the §14.10 canonical glyph for the given exercise-type axis-key.
 * className is forwarded to the outer <svg> so callers can size + color
 * via Tailwind utility classes (e.g., "w-7 h-7 text-ink-700").
 *
 * Unknown name → empty SVG with console warn (debug-only side-effect; does
 * not throw so partial-publish states render gracefully).
 */
export function ExerciseTypeIcon({
  name,
  className,
}: {
  name: CanonicalExerciseType | string;
  className?: string;
}) {
  const renderer = ICONS[name as CanonicalExerciseType];
  if (!renderer) {
    if (typeof window !== 'undefined') {
      console.warn(`[ExerciseTypeIcon] Unknown axis-key: ${name}`);
    }
    return (
      <svg {...ICON_BASE_PROPS} className={className} aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="3" />
      </svg>
    );
  }
  return (
    <svg {...ICON_BASE_PROPS} className={className} aria-hidden="true">
      {renderer()}
    </svg>
  );
}
