---
name: project_wide_viewport_program
description: "The per-tool wide-viewport fan-out — recipe, the caps-belong-to-the-configuration rule, and the six defect classes it uncovered that had nothing to do with width"
metadata: 
  node_type: memory
  type: project
  originSessionId: 0659bc9a-5926-456b-9317-b43c5e8c06d9
  modified: 2026-08-03T16:46:37.609Z
---

Operator report (2026-08-03): *"The tool covers a very small part of the screen and when I
click on fullscreen icon it covers even a smaller part. This is the same in almost all tools
and activities."* Scoping ruling, given after I proposed a single global mechanism:
**"It should be individually done for each tool and activity. Do professional work! Don't try
to find shortcuts."** So: no global zoom. Every tool gets its own measured caps.

## Root cause (measured, part 1 — shipped `d74e8e0e`)
`lcs-shell.css:72` capped the card at 720px, and `lcs-shell.js:527` called
`requestFullscreen()` on that same capped element — so the UA's
`:not(:root):fullscreen{max-width:none !important}` blew the frame open while every per-tool
descendant cap survived. Fullscreen retargeted to `documentElement` (`:root` is EXCLUDED from
that UA rule) → fullscreen now renders identically to windowed on all 48. Two generic card
tiers keyed on **width AND height together**, with specificity that loses to
`body.<ns>-wide .lcs-app` (0,1,1) and `.lcs-app.activity` (0,2,0). 17 of 48 widened for free.

## The per-tool recipe
1. `derive-tool-wide-tiers.js --tool=<key>` (German, gate panel OPEN — measures the LONGEST
   chrome, not the opening frame). 2. `shippedCap = min(verticalCeiling, cardUsableWidth)`;
   show the arithmetic in a comment. 3. Tiers AFTER the tool's existing media block, prefixed
   `body.<pfx>-wide`. 4. Invent the chrome caps if absent. 5. Ramp only type that does NOT
   self-scale. 6. `classList.add('<pfx>-wide')` in init — the one-line rollback. 7. **Bump the
   tool's OWN `?v=`.** 8. Widen its `local-test` + `locale-layout` sweeps to the tier FLOORS.
   9. Full suite → `audit-tool-wide-viewport --tool=<key>` → read the 1920 and 2560 renders.

## ⭐⭐ THE CAP BELONGS TO THE CONFIGURATION, NOT ONLY THE TIER
Twice, independently. `number-sieve`: all three boards are ten columns, so width says nothing
— what differs is ROWS, and at 12 rows a 46px cell already stands 878 of an 880 viewport
while the 2-row board has room for three times that. `arrow-strip`: the mat is square and its
side is cols×cell, so one ceiling sized the 6×6 mat at 788px against a 1138px budget. Both
now carry a ceiling per configuration (`nsv-f20/f100/f120`, `arw-n4/n6/n8`).

## ⭐⭐ KEY A WIDTH-BOUND CAP ON THE SHELL'S CARD LADDER, NOT ON A HEIGHT TIER
The shell widens the card at 1367/880→1240 and 1800/1150→1800. A per-tool tier keyed
1800/**1000** fires in the gap where the card has NOT grown. I shipped exactly that and
number-sieve drew a **1351px field inside a 1240px card at 1920×1080, gate 8/8 green.**

## ⭐ A MIDDLE TERM IS ONLY "GENEROUS" RELATIVE TO ITS CEILING
`clamp(34px, 9vmin, 176px)` at 2560×**1440** → vmin is the SHORT side → 129.6px, and the
derived 176 ceiling never bound. A cap you derived and then let a vmin term overrule is not a
cap. Use a middle term past every ceiling (40vmin) so the measured number is what binds.

## The six defect classes found — none of them about width
1. **37 dead CSS declarations.** `font:700 22px Baloo 2,…` — an unquoted family whose
   identifier starts with a digit is invalid, and that invalidates the WHOLE shorthand:
   measured 16px/400/Times. Invisible three ways (nothing errors; the family looks right
   under an inherited Baloo; SVG still SCALES correctly off the wrong base). Gate:
   `audit-font-shorthand.js`, in `deploy.sh`, ratcheted, poisoned both directions.
2. **`arrow-strip` printed the literal word "instruction"** as subtitle AND aria label in all
   11 locales — `lcs-shell.js:449` reads a string the tool never declared. 9th check in
   `preflight-tool-registration`; its first honest run found `heart-words` at ten locales.
3. **The print roster was 5 tools; 25 call `window.print()`.** `--tool=arrow-strip` matched
   nothing and printed *"PASS — 0 checks"*. Roster now derived from source; unmatched filter
   exits 1. Found **`arrow-strip`, `draw-bag`, `lids` calling `window.print()` with NO
   `@media print` block** — they print the whole web page. Ratcheted, shrink-only.
4. **Hardcoded-900 FIT budgets in five per-tool gates** — a tool fitting a 1440 board reports
   CUT OFF. And `draw-bag` shipped three tiers with a sweep that stopped at 1366.
5. **A gate blind spot on unit-handle**, found by a poison that correctly REFUSED to fire:
   `.unh-tapes` is fixed-height with absolutely-positioned tapes, so a pitch/container
   disagreement renders a tape OUTSIDE its box without changing the card height — invisible
   to every FIT, containment and overlap assertion on the platform.
6. **The shared gate never asked whether the apparatus fits its card**, and its numeral scan
   was vacuous twice: it scored `<style>`/`<script>` as numerals, and for SVG text it read
   computed font-size (USER UNITS — 16 computed, 38 rendered).

## FILL asks the BINDING axis
The 45/50% floors are a WIDTH share, right for a bench and wrong for a 1:1 apparatus: at
2560×1440 the largest honest square is ~840px — 32% of the width, 56% of the height. A
squarish apparatus is judged on height share. Both floors keep their values. When a tool
still misses, **add the missing tier step** (arrow-strip gained a 4th, lids a 5th) — lowering
the floor is the forbidden answer.

## Traps I walked into, each caught by measurement not reasoning
⚠ **Never run an `apply-<tool>-locales.js` speculatively — it MUTATES.** It regenerated the
strings block and erased my `instruction` repair; the fix belongs in the panel SoT +
`KEYS`. · ⚠ A probe that forces `--arw-cols=8` while leaving the `arw-n6` CLASS attached
tests a state the tool can never produce (reported 5 false CUT-OFFs). · ⚠ `\s` inside a JS
string literal degrades to a bare `s` — condemned all 47 tools **and satisfied its own poison
for the wrong reason**; a poison that passes because the check is universally true has proved
nothing. · ⚠ Comparing an OLD build in English against a NEW one in German "proved" a 2px
overflow was mine; like for like it was pre-existing. · ⚠ `.scratch/shot.js` served only
`mini tools/`, so artwork 404'd and an empty bench read exactly like a sparse-at-wide defect.
· ⚠ Bash heredocs eat backslash levels — use the Write/Edit tool for regex-bearing edits.

## ⚠ DO NOT PICK BATCH TARGETS OFF THE FILL PERCENTAGE WITHOUT CHECKING WHAT IT MEASURED
The baseline's "worst offenders" list is partly an artefact of the apparatus finder. It
counts an element only if it DRAWS (background / border / svg) or carries an author
`max-width`, so a transparent layout container is skipped and the number falls back to the
widest INKED thing — often a button. name-sticks reads 11.7% at 2560; measured, its
`.nsk-strip` is 992px inside a 1040px card, i.e. **95% of its card and 38.8% of the screen**.
Its real fan-out is raising its own `body.nsk-wide .lcs-app{max-width:min(1040px,96vw)}`
self-widen cap, not enlarging an instrument that already fills what it is given. Check the
`apparatusEl` column, not just the percentage.

⚠ AND `ten-frame-core.js` IS A SHARED ACTIVITY ENGINE (`ten-frame-activity.js` and
`ten-frame-tank-core.js` consume it). A tier written there leaks into the activities pass —
the tool's tier belongs in `ten-frame.js` with a `body.<pfx>-wide` scope, 0 core lines.

## Not defects, though the first screenshot suggested they were
unit-handle's "empty bench" (short crayon on a shared scale — the ladder fills it);
comparison-planks' 55% (the deck reaches 96%, the opening pair is just short); lids' counters
(percentage-sized, they scale). **Cycle the whole deck before calling a bench sparse.**

Related: [[feedback-visual-qa-container-containment]] · [[project_premium_tools_v4_catalog]]

## Batch 3 — the shapes that are NOT "raise a max-width"

Five distinct mechanisms turned up, and only one of them was a CSS cap:

- **A JS ceiling.** `measurement-bench`'s `_fitStage` was `Math.min(1, avail/660)` — it could
  shrink to a phone and never grow past its design size. `rekenrek`'s bead was a JS constant
  table. Both now read a ceiling from CSS (`--mb-maxscale`, `--rkr-dmax`) so the tiers can key
  it on width AND height together; **a JS width test cannot see the height condition**, so a
  wide-but-short board would scale past its own budget.
- **A shared protected core.** `ten-frame`'s geometry lives in `ten-frame-core.js`, which the
  activity sibling consumes. The tier went in the tool WRAPPER with a `tf-wide` class only the
  free-play variant sets — verified structurally (`ten-frame.js` is loaded by `ten-frame.html`
  and nothing else), not assumed.
- **A layout that had to change shape.** `money-mat` at 1680px wide was a barn with a carrot in
  it: three objects at fixed percent positions. Above 1367 the column becomes two — shop card
  beside a coin tray. **Growing a box that has no content to fill is the rekenrek bead defect
  in another dress.**
- **A unit and its ratios.** `place-value-lab`: nine sites now derive from `--pvl-u`, because
  ramping them separately would let a rod stop being exactly ten cubes tall and **nothing in
  the suite measures that** — the pieces are drawn art, not a computed model.
- **One cap, genuinely.** `open-number-line` — a viewBox SVG; raise `.onl-sheet` and the axis,
  marks, arcs and numbers all scale. Only the fixed-px HTML BESIDE it needs hand-ramping.

## ⚠⚠ THE MEASUREMENT WAS WRONG BEFORE THE TOOLS WERE
`draws()` counted ANY `<svg>` as ink. place-value-lab's carry-arc overlay is
`position:absolute;inset:0` and EMPTY at rest, so the apparatus measured 1704px while the
blocks spanned 1110 — FILL said 66.6% for a board really at 43.4%. Now an svg must have
`childElementCount > 0`. Fixed in BOTH copies (probe ×2 sites, gate ×1) — the same rule in two
files gets half-fixed. Blast radius measured, not assumed: a 48-tool run moved exactly two
results, one of which (**lids `.lid-mark` pinned at 44px while only its font grew**) was a real
defect the old rule had been hiding.

## ⚠⚠ `--measure --tool=<k>` OVERWROTE THE 48-TOOL BASELINE WITH ONE ENTRY
Silently, reporting success. That file is the only thing the CONTROL cell compares against.
A filtered run now refuses to write; so does any run with <40 rows. **The filter is for
READING one tool; writing is a whole-catalogue act.**

## ⭐⭐ A "NOT SMALLER" ASSERTION PASSES ON A FROZEN INSTRUMENT
rekenrek's new permanent bead check first said `bead >= bead@1366` — and PASSED on the
un-fixed build where the bead is a frozen 64px at every width, the exact defect it was written
to catch. Strict `>` fails 12/12 there, passes 12/12 here. **Poison every new gate against the
state it was written to catch, before trusting it.**

## Other instrument fixes bought in batch 3
`--set=key:value` on the probe reaches a NON-DEFAULT configuration (place-value-lab's third
column, ten-frame's double frame) and THROWS on an unknown key rather than silently measuring
the default · a run whose cells FAILED TO BOOT says so and exits 1 (the --set poison made all
six throw and the summary still printed a tidy "6 CUT OFF") · a TYPE failure now names the
element that owns the small numeral · `scripts/shot-tool-wide.js` exists so the render read is
a step, not an improvisation.

## Found, NOT fixed (each wants its own commit)
- **ten-frame in DOUBLE-frame mode at 1366x900**: two frames measure 775px against a 720px
  card (108%). Confirmed pre-existing by measuring HEAD. Fixing it means touching the shared
  core or moving layout at 1366, and the programme's safety property is that nothing at or
  below 1366 moves.
- `audit-tool-control-liveness` cannot resolve a prefix for `ten-frame` (a pre-v4 tool with no
  `<pfx>-wrap` in its own file). Pre-existing.

## Batch 4 — and the tools' own gates start pushing back

- ⚠⚠ **A TOOL'S OWN GATE CAN BAN THE SHELL'S SANCTIONED HOOK.** `verify-class-graph`'s C13
  greps for any `.lcs-*` selector, so `body.cgr-wide .lcs-app{max-width}` tripped it — but
  `lcs-shell.css:99-106` states that specificity IS the design: the shell's card tiers are
  `.lcs-app` (0,1,0) *precisely so* `body.<ns>-wide .lcs-app` (0,1,1) beats them, which is how
  18 tools already self-widen. The check was banning the documented extension point. Narrow
  what it TESTS (strip the body-scoped form, ban what remains), poison both ways, never
  weaken it. **Verify the shell claim by reading lcs-shell.css — do not assert it.**
- ⚠⚠ **`\b` WRITTEN THROUGH PYTHON BECOMES A LITERAL BACKSPACE BYTE.** The regex read
  `/body\.cgr-wide\s+\.lcs-app<0x08>/` — impossible to match, and it LOOKED right in the
  editor and in grep. Tell: `SRC.length - SRC_UNSCOPED.length === 0` while the same strip
  worked perfectly in isolation. Same family as the backtick-in-heredoc trap. `cat -A`.
- ⚠ **THE `vmin` TERM MUST RISE WITH THE CLAMP CEILING, or the ceiling never engages.**
  `clamp(26px, 4.4vmin, 78px)` computes 63px at 1440 tall, so a tier that raises only the
  ceiling changes nothing measurable. class-graph's first tier did exactly that.
- ⚠ **A "NOT SMALLER" ASSERTION PASSES ON A FROZEN INSTRUMENT** (rekenrek), and **a 0.5px
  epsilon is inside the layout noise** (letter-tiles: "94 -> 94" scraped past, poison fired at
  1 of 3 cells). Require strict growth with a margin justified by the MECHANISM — letter-tiles'
  smallest tier step is +19% against sub-1% noise.
- ⚠ **TWO SIZES FOR THE SAME OBJECT WILL DIVERGE.** story-line's slot is JS
  (`maxW * --stl-cardmax`) and its tray card is CSS `116x148`; ramping only the slot left the
  child dragging a 116px card into a 351px slot. One variable now drives both.
- ⚠ **WHEN THE INSTRUMENT IS EMPTY AT REST THE HOLLOW CHECK MEASURES THE PALETTE.**
  letter-tiles has no tiles until one is dropped, so the only repeated class is the 28-letter
  tray. Named ratchet entry `HOLLOW_ELSEWHERE`, pointing at local-test D2, which places real
  tiles through the tool's own `_dropNew`. Ramping the tray was MEASURED and rejected: it is
  flex-wrap, and 56 -> 70px tips it into another row costing 108px of height in German.
- ⭐ New shared assertion: **anisotropy of `preserveAspectRatio="none"` SVGs**, compared
  against the 1366 control (not an invented threshold). Narrowed to SVGs that CONTAIN TEXT —
  story-line's rope is *supposed* to stretch; the defect being guarded is a squashed numeral.

## The five mechanisms, as a checklist for the remaining tools
1. a CSS cap (`open-number-line`, `class-graph`, `estimation-jar`, `folding-sheet`)
2. a **JS ceiling** — read it from CSS instead (`measurement-bench`, `rekenrek`,
   `letter-tiles`, `story-line`)
3. a **shared protected core** — tier goes in the tool wrapper with a variant-only class
   (`ten-frame`)
4. **the layout must change shape** because the content cannot fill a wider box (`money-mat`)
5. **one unit and its ratios** (`place-value-lab`)

## SCOPE (operator, mid-session): ACTIVITIES ARE OUT
"the activities are good. So, it is only the tools. You don't need to do anything about the
activities." The ~204-activity fan-out is **cancelled**. The programme is the ~48 TOOLS only,
and the single batch deploy at the end is the finish line, not a checkpoint.

## Batch 5 — the same trap, four more dresses
⭐ **`vmin` MIDDLE TERM vs CEILING** hit class-graph, folding-sheet, sound-boxes AND
blending-board in a row: `clamp(26px, 4.4vmin, 78px)` computes 63px at 1440, so raising only
the ceiling is DEAD CODE. **Raise both, then measure that the value actually moved.**

⭐ **AN INLINE STYLE BEATS ANY TIER.** number-talk-easel writes `d.style.width = size+'px'`
from `var size = q <= 6 ? 64 : 52`, so a `body.nte-wide .nte-dot{width:121px}` rule was dead
and the gate correctly reported the dot at 64px on both boards. Fourth JS-ceiling tool; the
fix is always the same — read a scale from CSS so the tiers can key it on width AND height.

⚠ **A BARE STATE CLASS IS CHROME.** The CHROME pattern required a leading hyphen, so
number-talk-easel's standalone `locked` (on `nte-pen`, `nte-clearbtn`) became the "repeated
unit" and HOLLOW reported the instrument frozen when what was frozen was a row of lock
badges. Anchored on start-or-whitespace so `unlocked-thing` does not match; poison-tested
against the real unit class of every tool fanned out so far.

⚠ **CHANGING WHAT `draws()`/CHROME MEASURES SHIFTS THE 1366 BASELINE.** Second time. Always:
measure HEAD's unchanged file under the NEW gate — if it gives the same number, the shift is
the instrument and the baseline row may be corrected; if not, it is a regression. Then run
`--all` for the blast radius before touching anything.

⚠ **KEEP A POISON'S BACKUP IN ONE FILESYSTEM NAMESPACE.** `fs.writeFileSync('/tmp/x')` from
node resolves to `C:\tmp`; bash `cp /tmp/x` reads the msys path. The restore failed silently
and left the gate holding a poisoned selector — caught only because the MUST-PASS run after it
failed.

⭐ **A SECOND FORM OF FILL_EXEMPT** (estimation-jar): when the apparatus is ONE object inside a
frame, the exemption carries a SELECTOR and a size floor and the probe measures it
(`FILL_EXEMPT_SEL`). Poisoned both ways — shrinking the jar fires, and a selector that matches
nothing fires UNMEASURED rather than passing in place of the floor it replaces.

⭐ **MEASURE BEFORE FILING A RENDER DEFECT.** Three false alarms this batch: wodb's shape
(steady 56% of its cell — I was reading the triangle's INK, not its box), sound-boxes'
counters (84 -> 130, I misjudged browser scale), and ruler's bar gap (proportionally unchanged
at 27.5% -> 26.2%, so pre-existing, not the tier's doing).

## Batch 6 — a rule can be PRESENT and still do nothing (three ways, all found by measuring)
1. ⚠⚠ **THE BLOCK LANDED INSIDE `@media print`.** our-day: I anchored on `+ '}';`, which was the
   PRINT block's closing brace, not the end of the stylesheet. The tiers applied on paper and
   nowhere else; nothing errored and `--od-cardscale` simply read EMPTY at 2560. The recorded
   nginx lesson in CSS — **anchor on the block it must affect, not the first plausible match.**
2. ⚠⚠ **`max-width` ON A CONTENT-SIZED FLEX ITEM DOES NOTHING.** `.od-wrap` is a flex item of
   the stage, so it sizes to content: 980 → 1660 left it at 965px and the tool sat in the middle
   of the board. It needs `width:100%` to claim the cap.
3. ⚠⚠ **AN INLINE STYLE BEATS ANY TIER** (number-talk-easel's dots) — recorded in batch 5, hit
   again. **Always confirm with `getComputedStyle`, never from the file.**

⚠⚠ **`flex-shrink:0` DOES NOT FORCE A WRAP IF `max-width` IS SMALLER.** build-plan's caption
flowed up beside the bench; `flex:0 0 100%` applied (computed basis 100%, shrink 0) and it
still rendered 620px on the same line. A flex item's HYPOTHETICAL MAIN SIZE is the base size
**clamped by min/max-width**, and line-breaking uses the hypothetical size — so `max-width:620px`
decided the wrap before flex-basis got a say. Raise the CAP past the leftover space.

⚠⚠ **`preserveAspectRatio="slice"` MEANS A WIDER BOX SHOWS *LESS*.** hush-owl's scene covers a
1600x900 viewBox; widening the card while leaving `height:clamp(…,600px)` would have given a
2.84 aspect and sliced the owl's top and bottom off. Bigger box, less owl, and every measurement
would have called it a success. Pin the stage to the scene's aspect and derive its WIDTH from
the height budget.

⭐ **A `vh` TERM IS THE RIGHT HEIGHT GUARD FOR A SQUARE OR FIXED-ASPECT APPARATUS** —
learning-clock (`min(52vh,66vw,460px)`) and hush-owl both need NO fourth height-keyed step
because the vh term already binds correctly at every tier FLOOR. Raise the flat ceiling, nudge
the vh coefficient, leave it as the binder.

⚠ **A DEFINITE `minmax(a,b)` TRACK NEVER FILLS FREE SPACE** — center-board's n2/n3 grids sat at
1136px inside a 1704 wrap. Use `minmax(a, 1fr)` at the tiers.

## Remaining (11): asking-bench · choral-counting · class-timer · dictation-desk ·
## feelings-check-in · heart-words · home-language-bridge · letter-studio · name-sticks ·
## reading-easel · (plus a re-sweep of anything the shell tiers alone already covered)

## FINAL BATCH — every tool fanned out (54 commits, nothing pushed)

⚠⚠ **`+ '}';` IS ALMOST ALWAYS THE `@media print` CLOSING BRACE IN THIS CODEBASE.** It caught
me TWICE (our-day, heart-words): the tier block nests inside @media print, applies on paper,
errors nowhere, and the measured element simply never changes. **Anchor on the block the rule
must affect** — and confirm with `getComputedStyle`, never from the file.

⚠⚠ **A MARGIN THAT DOES NOT DISCRIMINATE IS NOT A GATE.** name-sticks' jar check passed on
HEAD at a 1.05x margin, because the un-tiered build already grows 234→300px when its own
`clamp(200px,30vmin,300px)` reaches its ceiling on a tall board (28%). The tiers give
75/97/122%. Margin set to **1.5x from BOTH measurements**, then re-poisoned: 3/3 fail on HEAD,
3/3 pass here. Same lesson as letter-tiles' 0.5px epsilon, one step harder.

⚠ **RAISE EVERY BOX IN THE CHAIN.** letter-studio's sheet burst out of `.ls-card` (its own
620px cap) and hid the chips above and the controls below. The shared gate's escapes-its-card
assertion measures `.lcs-app`, not an inner container — found only in the render.

⚠ **MY OWN SHELL CHECK LIED**: `[ -f x ] && … || echo FAIL` reports FAIL for a file that does
not exist. Two asking-bench "failures" were gates that were never written. Use if/else.

## THE FILL EXEMPTION NOW HAS FOUR FORMS (a ratchet — entries may only leave)
| form | tool | measure instead |
|---|---|---|
| `minType` | syllable-splitter | rendered type of the apparatus (it IS a word) |
| `minEl` + `sel` | estimation-jar | rendered WIDTH of the one object inside a frame |
| `minFont` + `sel` | asking-bench | rendered FONT SIZE (the apparatus is a sentence) |
| `checkedElsewhere` | name-sticks | skip FILL; the jar is measured in the POPULATED state by local-test section W |
Every one poison-tested in both directions, including "selector matches nothing → UNMEASURED,
never a silent pass".

## Also permanent now
`HOLLOW_ELSEWHERE` (letter-tiles — board empty at rest, the only repeated class is the
palette) · the anisotropy guard for text-bearing `preserveAspectRatio="none"` SVGs ·
`--set=key:value` on the probe · `shot-tool-wide.js` · CHROME treats a bare `locked`/`disabled`
as chrome · a filtered `--measure` refuses to write the baseline.

## STATE: all ~48 tools done. ONE batch deploy remains (§20.4: git pull → cp "mini tools"/* to
## /var/www/lcs-media/mini-tools/ INCLUDING *.json, BEFORE deploy.sh runs the build).
