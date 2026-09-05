# 045 — Growing Steps

## Identity
- Slug: `growing-steps`
- Subject / topic: Mathematics / growing patterns (+1, +2) — building the next term of a staircase from the difference between terms
- Age band: `6-8`
- Interaction pattern: `P6` — build on a grid (fill a column of cells; Check compares it with the target term)
- Estimated build size: ~460 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P6 (grid fill with Check; missing cells pulse, extra cells are shown).

## Learning
- Objective: Builds the next (or a missing) term of a growing staircase pattern on a grid so that the difference between consecutive terms stays constant (+1 or +2).
- Prerequisites: Counts to 8; compares two towers by height; has met repeating patterns (game 043).
- Curriculum links: F-1 (patterns in 7 of 15 sources), F-21 ("repeating (and growing) patterns" named in all twelve systems by age 8), F-31 row "Sort by attribute; repeating patterns" extended to growing patterns → 6-8 (US 1.OA / 2.OA pattern work in state standards, 4.OA.C.5 formalises later; England Y1-2 "count in steps" + "patterns"; Germany Klasse 1-2 "Muster und Strukturen: wachsende Muster"; France CP-CE1 "suites de nombres"; Netherlands groep 3-4 "groeipatronen"; Spain 1º ciclo "series crecientes"; Brazil EF02MA11 "sequências recursivas"; Sweden åk 1-3 "hur enkla mönster … konstrueras"; Norway 2. trinn "mønster"; Finland grade 1-2).
- Common misconceptions (F-116 — extending by copying; the unit/rule not identified — and F-109 for the step as a count-on), each with this game's response:
  1. **Copying the last term (after 1, 3, 5 the child builds 5 again).** Response: on Check the difference tags appear between the GIVEN terms first (`ART.diffTag` "+2", "+2", `ANIM.appear`, `tone("tap", k)`), then between the last given term and the child's tower the ACTUAL difference appears in a coral tag (`ART.diffTagWrong` "+0"), and the missing cells pulse an outline (`ART.needCell`, `ANIM.pulse`). The child sees "+2, +2, +0" — the break in the rule — and adds blocks.
  2. **Adding one by default (builds 6 for 1, 3, 5, _).** Response: the same tags: "+2, +2, +1"; the one missing cell pulses.
  3. **Treating the growing pattern as repeating (builds 1 again, "it starts over").** Response: the tags read "+2, +2, −4" (the coral tag carries its sign); the missing four cells pulse.
  4. **Overshooting (builds 8 for 1, 3, 5, _).** Response: "+2, +2, +3"; the extra cell is outlined in coral (`ART.extraRing`) and pulses; the child removes it (tapping a filled cell removes the top block). The game never removes blocks for the child before the show-me step.
  5. **Filling cells anywhere (a tower with holes).** Response: structurally impossible — tapping any empty cell fills the LOWEST empty cell of the column (the tower grows from its base, as blocks do); tapping a filled cell removes the TOP block. F-48: mirror the physical manipulative.

## How it plays
1. **Start screen**: title "Growing Steps", the chipmunk (`ART.chipmunk`) at (360, 240), Start, picker.
2. **Item 1 (L1: towers 1, 2, 3; build 4)**: rail of 10 dots (§6) at y = 28; `t("question_x_of_y")` at (360, 48), 18 px `THEME.colour.inkSoft`. The caption `S("buildNext")` ("Build the next step") at (360, 84), 24 px `THEME.colour.inkSoft`. The staircase area: four columns at x = 180, 300, 420, 540; each column is a stack of up to eight cell positions with centres y = 550 − r × 60 (r = 0 … 7, r = 0 at the base). Columns 1-3 show the given terms as blocks (`ART.block`, 56 × 56) — 1, 2 and 3 blocks; column 4 is the build column: eight `ART.cellEmpty` tiles (`makeTile`, 56 × 56, dashed). Under every column its term label (`ART.termNum`, 28 px) at y = 598 — "1", "2", "3" and, for the build column, "?" (`ART.termQuery`). At L1 the difference tags (`ART.diffTag` "+1") are shown from the start between columns 1-2 and 2-3, at the midpoint x and 24 px above the taller tower's top; and the build column shows a faint ghost of the previous term's height (`ART.ghostCell` over its first 3 positions). The base line (`ART.baseLine`) runs under the columns at y = 582. The chipmunk sits at (80, 560). Zone C (y 640-720): Check (`makeButton ok`) at (360, 672), disabled until at least one block is placed.
3. **Building**: tap any cell in the build column → the lowest empty position fills with `ART.block` (`ANIM.blockIn`, `tone("tap", k)` with k = the tower's height); tap a filled cell → the top block is removed (`ANIM.blockOut`, `tone("tap", k)` at the new height). Check enables at one block.
4. **Check**: tap OK. Let T be the target and n the built height.
   - **Correct (n = T)**: the difference tags appear between every consecutive pair (`ANIM.appear`, 250 ms apart, `tone("tap", k)`), the new tower `ANIM.pop`s, the "?" label becomes the numeral (`ANIM.appear`), `tone("correct")`, praise pop (rotation), the chipmunk `ANIM.hop`, the rail dot fills; after 900 ms the staircase clears (`ANIM.blockOut` on every block together) and the next item `ANIM.appear`s.
   - **Too few (n < T)**: the tags between the given terms appear, then `ART.diffTagWrong` with the actual difference (e.g. "+0", "+1", "−4") between the last given term and the built tower; the T − n missing cells pulse `ART.needCell`; `tone("nudge")`; Check disables until the tower changes. The coral tag and outlines stay until the tower changes. Attempt 2.
   - **Too many (n > T)**: the tags, then the coral tag (e.g. "+3"), and the n − T extra blocks are outlined by `ART.extraRing` and pulse; `tone("nudge")`; Check disables until the tower changes. Attempt 2.
   - **Second wrong Check**: the same enactment, then the show-me — the build column fills or empties itself to T (`ANIM.blockIn` / `ANIM.blockOut` 200 ms apart with tones) while all tags show the rule; OK gains `ART.showRing` (`ANIM.showMe`); tapping OK completes the item as solved-with-help (no praise pop).
   - For an interior gap (L3) the build column is column 3 (x = 420) and the tags are computed on both sides of it: "+2, ?, +2" on the given side and the actual differences left and right of the built tower on a wrong Check.
5. **Items 2-10**: per Content/Rules. L1 = +1 with tags and ghost shown; L2 = +2 and +1 mixed, tags hidden until Check, no ghost; L3 = interior gaps and numerals-only items (the given towers are hidden — only their labels show — until Check reveals them with `ANIM.appear`, the F-46 cue-fading step).
6. **Finish**: `t("all_done")` (360, 110); the chipmunk (360, 220) 96 px `ANIM.celebrate`; the summary = ten `ART.stairChip`s (150 × 44) in two rows of five (y = 360 and y = 420; x = 120 + i × 120) each reading the four terms "1 3 5 7" in 20 px `THEME.font.display` `THEME.colour.ink`, with a filled `ART.dotFull` at the left for first-Check items and a hollow `ART.dotEmpty` for helped ones; `play_again` (250, 660), `menu` (470, 660); `tone("finish")`.

Session ≈ 6 minutes.

## Art registry
```js
const ART = {
  chipmunk:     { kind: "emoji", value: "🐿️", size: 64, fallback: "🐹" },
  block:        { kind: "shape", shape: "roundRect", w: 56, h: 56, fill: "structure", stroke: "bg", strokeWidth: 2, radius: 8 },
  cellEmpty:    { kind: "shape", shape: "roundRect", w: 56, h: 56, fill: "surface2", stroke: "line", strokeWidth: 2, radius: 8 },       // dashed: lineDash [8,6]
  ghostCell:    { kind: "shape", shape: "roundRect", w: 56, h: 56, fill: "structureSoft", radius: 8 },                                   // L1 only, alpha 0.6
  needCell:     { kind: "shape", shape: "roundRect", w: 60, h: 60, stroke: "accent", strokeWidth: 4, radius: 10 },
  extraRing:    { kind: "shape", shape: "roundRect", w: 60, h: 60, stroke: "accent", strokeWidth: 4, radius: 10 },   // same look as needCell; it sits on a FILLED block, needCell on an EMPTY cell — position is the cue
  baseLine:     { kind: "shape", shape: "rect", w: 480, h: 4, fill: "line" },
  termNum:      { kind: "text",  value: "", size: 28, font: "display", color: "ink" },
  termQuery:    { kind: "text",  value: "?", size: 28, font: "display", color: "accent" },
  diffTag:      { kind: "text",  value: "", size: 22, font: "display", color: "structure" },   // "+1" / "+2" between given terms
  diffTagWrong: { kind: "text",  value: "", size: 22, font: "display", color: "accent" },      // the actual difference, with sign
  showRing:     { kind: "shape", shape: "roundRect", w: 232, h: 84, stroke: "structure", strokeWidth: 4, radius: 22 },
  stairChip:    { kind: "shape", shape: "roundRect", w: 150, h: 44, fill: "structureSoft", stroke: "structure", strokeWidth: 1, radius: 10 },
  dotEmpty:     { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:      { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```

## Animation registry
```js
const ANIM = {
  blockIn:   { alpha: 1, scale: 1, duration: 140, ease: "Back.Out", trigger: "a block placed (from alpha 0, scale 0.5); show-me fill; reveal of hidden towers" },
  blockOut:  { alpha: 0, scale: 0.5, duration: 140, ease: "Sine.In", trigger: "a block removed; staircase clearing; show-me emptying" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "difference tags, term labels, new staircase (from alpha 0, scale 0.6)" },
  pulse:     { scale: 1.1, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "needCell outlines; extraRing outlines" },
  pop:       { scale: 1.08, duration: 160, ease: "Back.Out", yoyo: true, trigger: "the built tower (as one container) on a correct Check" },
  hop:       { y: "-=24", duration: 160, ease: "Sine.Out", yoyo: true, trigger: "chipmunk on a correct Check" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "showRing around OK (from alpha 0.2)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish chipmunk" }
};
```

## Screen layout
This game declares the taller stage **720 × 720** (BUILD-CONVENTIONS §2); the Phaser config `height` is 720 and nothing else changes.

```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]        ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28; "3 of 10" y=48   │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │              "Build the next step" (360,84)                   │
      │                                          ┊  ┊  r=7 y=130      │
      │                                          ┊  ┊                 │
      │                              +2          ┊  ┊   tags 24 px    │
      │                    +2      ▐██▌          ┊  ┊   above tops    │  the staircase
      │           ▐██▌     ▐██▌    ▐██▌          ┊  ┊                 │
      │  (chip)   ▐██▌     ▐██▌    ▐██▌          ┊  ┊  r=0 y=550      │
      │  (80,560) ─────────────────────────────────── base y=582      │
      │            1        3        5         ?       labels y=598   │
      │          x=180    x=300    x=420    x=540   (cells 56×56)     │
640   ├──────────────────────────────────────────────────────────────┤
      │                    [   OK   ] (360,672)                       │  zone C
720   └──────────────────────────────────────────────────────────────┘
```
Fixed layout, FIT scaling. The build column is column 4 (x = 540) except for L3 interior-gap items, where it is column 3 (x = 420) and column 4 shows the fourth term.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 10 × `ART.dotEmpty` (x = 261 + i × 22) → `ART.dotFull`; `t("question_x_of_y")` at (360, 48); caption 24 px `THEME.font.body` `THEME.colour.inkSoft` at (360, 84).
- `ART.baseLine` centred (360, 582); `ART.chipmunk` at (80, 560).
- Given towers: `ART.block`s stacked from y = 550 upward at pitch 60 in their column; `ART.termNum` at (column x, 598).
- Build column: eight `makeTile` 56 × 56 with `ART.cellEmpty` tokens (dashed) at y = 550 − r × 60; a filled position draws `ART.block` on it; `ART.ghostCell` at alpha 0.6 on positions 0 … (previous term − 1) at L1 only; `ART.termQuery` at (column x, 598) until solved.
- Tags: `ART.diffTag` / `ART.diffTagWrong` at the midpoint between two columns, y = (taller tower's top cell centre) − 52.
- `ART.needCell` centred on each missing position; `ART.extraRing` centred on each extra block. Check `makeButton` `ok` at (360, 672), alpha 0.5 while disabled; `ART.showRing` around it.
- Tap floors: cells 56 ≥ 56; vertical gap 4 — accepted, because a mis-tap on a neighbouring cell has the same effect (any empty cell fills the lowest empty; any filled cell removes the top).
- Keyboard: Up/Down arrows move the focus ring within the build column, Enter fills / removes per the same rule; Tab reaches OK.

## Content
Language-neutral apart from one caption. Items as (given terms with the gap marked _; the answer; notes).
- **L1** (+1; tags and ghost shown from the start): (1, 2, 3, _ ; 4) · (2, 3, 4, _ ; 5) · (3, 4, 5, _ ; 6) · (4, 5, 6, _ ; 7) · (5, 6, 7, _ ; 8)
- **L2** (+2 and +1 mixed; tags hidden until Check; no ghost): (1, 3, 5, _ ; 7) · (2, 4, 6, _ ; 8) · (4, 5, 6, _ ; 7) · (1, 2, 3, _ ; 4) · (2, 3, 4, _ ; 5) · (3, 4, 5, _ ; 6)
- **L3** (interior gaps; numerals-only items): (1, 3, _, 7 ; 5) · (2, 4, _, 8 ; 6) · (1, 2, _, 4 ; 3) · (2, 3, _, 5 ; 4) · (4, 5, _, 7 ; 6) · (1, 3, 5, _ ; 7 — numerals only, towers revealed on Check) · (2, 4, 6, _ ; 8 — numerals only)

Every target is ≤ 8, so the build column's eight positions always suffice. Play list of 10 per Rules; shuffle within level, levels in order; no item repeats; two consecutive items never share the same target.

## Rules
- Item count: 10.
- Difficulty progression: 2 consecutive first-Check correct → next level (cap L3).
- Adaptation: a wrong Check, or non-first-Check on 2 consecutive items → next item one level down (floor L1).
- What happens on a correct answer: difference tags appear between every pair with `tone("tap", k)`, tower `ANIM.pop`, "?" becomes the numeral, `tone("correct")`, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"], chipmunk `ANIM.hop`, rail dot, next item after 900 ms.
- What happens on a wrong answer (each begins with `tone("nudge")`; Check disables until the tower changes):
  - Copied the last term (built 5 for 1, 3, 5, _): tags "+2, +2" then coral "+0"; two missing cells pulse.
  - Added one by default (built 6): "+2, +2, +1"; one missing cell pulses.
  - Started over (built 1): "+2, +2, −4"; four missing cells pulse.
  - Overshoot (built 8): "+2, +2, +3"; the extra block is ringed and pulses; the child removes it.
  - Interior gap wrong (built 3 for 1, 3, _, 7): coral tags on both sides "+0" and "+4" against the given "+2"; the two missing cells pulse.
- Retry behaviour: attempt 1 → attempt 2 after the tags and outlines → attempt 3 = the show-me (the column fills / empties itself to the target, OK ringed); solved-with-help. No attempt 4.
- Finish condition: 10 items. No losing state, no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("ok")`, `t("question_x_of_y")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Growing Steps"; `buildNext` = "Build the next step". Tags are numerals with signs, never words.

## Sound
`tone("tap", k)` on each block placed or removed (k = the tower's height, so the pitch follows the tower — F-213); `tone("tap", k)` per difference tag revealed; `tone("correct")` on a correct Check; `tone("nudge")` on a wrong Check; `tone("finish")` once. Silent under `?sound=off`.

## Testing checklist
- [ ] Works in all 11 languages ("Build the next step", OK, Question x of y, All done, Play again, Menu and praise change with the picker).
- [ ] Works at narrow width (400-px iframe: all four columns, eight build cells, labels and OK visible; the stage is 720 × 720 and scales as one).
- [ ] Keyboard operable (Up/Down move within the build column, Enter fills or removes; Tab reaches OK; Enter checks).
- [ ] Never auto-starts.
- [ ] No losing state (wrong Checks never end the session; the column builds itself and OK completes the item).
- [ ] Tapping any empty cell of the build column fills the lowest empty cell; tapping any filled cell removes the top block.
- [ ] At level 1 "+1" tags are visible between the given towers and a faint outline of the previous tower's height sits in the build column.
- [ ] Checking 5 blocks for 1, 3, 5, _ shows "+2, +2" then a coral "+0" and two pulsing empty cells; OK dims until the tower changes.
- [ ] Checking 8 blocks shows a coral "+3" and rings the top block; removing it and checking again completes the item.
- [ ] At level 3 the missing term can be in the middle; a wrong tower shows coral differences on both sides of it.
- [ ] In a numerals-only item the given towers are absent until OK, then appear.
- [ ] A second wrong Check makes the column fill itself to the right height and puts a pulsing ring on OK.
- [ ] Two first-Check corrects in a row bring +2 patterns with hidden tags; a wrong Check brings a +1 pattern next.
- [ ] The finish screen lists the ten staircases as "1 3 5 7" chips with filled or hollow dots; no score, no time.
- [ ] With `?sound=off` nothing is audible.
