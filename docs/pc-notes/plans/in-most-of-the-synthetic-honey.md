# Remove the title from the maker sample-play modal header

## Context
On the worksheet-maker landing pages (`/[locale]/tools/<maker>`), clicking "Play sample" opens a modal whose header bar shows the sample's title (e.g. "Math Puzzle Practice"). The sticky CategoryNav ("Worksheets · Activities · …") renders through the modal at the same row, so the title collides with the "Worksheets" item (operator screenshot 2026-09-11). Operator ruling: **just remove the title from the modal header** — all makers, all 11 locales, regardless of overlap. Nothing else.

## Change (one file)
`frontend/components/makers/MakerSampleTile.tsx`, the modal header at lines 167-179:
- Delete the `<span … truncate>{title}</span>` (line 168).
- Change the header `div` from `justify-between` to `justify-end` so the close (×) button stays right-aligned.
- Keep `aria-label={title}` on the dialog and `title={title}` on the iframe (invisible a11y, no visual).
- Update the prop comment on line 20 (`// shown under the thumbnail (and in the modal header)` → drop the parenthetical).

The component is a single client component used by every maker page in every locale (`MakerSamples.tsx` → `MakerSampleTile`), so no per-locale work, no deck rendering, no scripts.

## Verification
- `cd frontend && npx tsc --noEmit -p .` (or the normal build) passes.
- Open `http://localhost:3000/en/tools/math-puzzle-maker` → Play sample → header shows only the × button; deck plays; ESC/× close. Spot-check one non-EN locale (e.g. `/de/tools/…`).
- Commit + push; deploy per operator instruction (standard `deploy.sh`, no mini-tools cp needed).
