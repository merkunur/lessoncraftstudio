# 003 — Ten-Frame Fill

## Identity
- Slug: `ten-frame-fill`
- Subject / topic: Mathematics / quantities 1-10 on a ten-frame (structuring numbers as 5-and-some, 10)
- Age band: `5-6`
- Interaction pattern: `P6` — build on a grid
- Estimated build size: ~400 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P6 (ten-frame fills top row left → right, F-48/F-50).

## Learning
- Objective: Builds a target quantity 1-10 on a ten-frame by filling cells in the standard order (top row left to right, then bottom row) and checks it.
- Prerequisites: Recognises numerals 1-10 (games 001/002). No reading.
- Curriculum links: F-1, F-4 (ten frame and part-part-whole are on the UK reception map), F-21, F-50 (ten-frames are an evidence-backed manipulative), F-31 rows "Count to 10-20" and "Number bonds to 10 / part-whole" — conservative ages 6-7 → 5-6 lower edge (US K.CC.B.5 / K.OA.A.4; England Reception "subitise" + Y1 "number bonds within 10"; Germany Klasse 1 Zehnerfeld; Netherlands groep 2-3 "getalbeelden"; Nordic bridge year 0-10).
- Common misconceptions (F-101, F-104), each with this game's response:
  1. **Filling cells out of order (scattered) and losing count.** Response: the frame only accepts fills in the standard order — tapping any empty cell fills the NEXT empty cell in order (top row left→right, then bottom row). The child cannot scatter; the structure teaches itself. Tapping a filled cell empties the LAST filled cell (undo), so the fill is always a contiguous run.
  2. **Off-by-one on Check (9 filled for 10, or 10 for 9).** Response: on Check the frame counts itself: each filled cell shows its numeral in turn (`ART.countBadge`, `tone("tap", k)`), the last badge grows; if the count is short, the empty cells that should be filled pulse an outline (`ART.needCell` + `ANIM.pulse`); if too many, the extra cells' counters `ANIM.rise` away one by one with a descending count.
  3. **Not seeing 5 as a unit (the top row).** Response: when the top row completes, it plays `ANIM.rowLock` (a brief scale of the whole row) and `ART.fiveMark` (a small numeral 5 badge) appears at the right of the top row; when both rows complete, `ART.tenMark` appears. The 5-and-some structure is made visible without words.
  4. **Reading the numeral 6 as 9 (mirror).** Response: the prompt numeral is shown WITH a matching dot strip below it (`ART.dotStrip`, the count as a row of small dots) so the target is readable two ways; the strip is the second cue, colour is never the only cue.

## How it plays
1. **Start screen**: title "Ten-Frame Fill", the owl (`ART.owl`) at (360, 200), Start, picker.
2. **Item 1 (L1, target 3)**: rail of 8 dots (§6). Zone A: the target numeral (`ART.targetNumeral`, 72 px) at (360, 110) with `ART.dotStrip` (3 small dots) centred beneath it at (360, 160); the owl at (110, 170). Zone B: an empty ten-frame — 2 rows × 5 cells of `ART.cell` (80 × 80, gap 8), the frame centred at (360, 372): cell centres x = 184, 272, 360, 448, 536; y = 328 (top row) and 416 (bottom row). Zone C: a Check tile (`makeButton "ok"`, label `t("ok")`) at (360, 510), disabled (dimmed) until at least one cell is filled. Caption: none (the numeral + dot strip is the whole prompt).
3. **Filling**: the child taps any cell. The next cell in order (first empty in reading order) fills: `ART.counter` (a filled circle) appears in it with `ANIM.appear` and `tone("tap", k)` (k = number filled). Tapping a filled cell removes the last counter (`ANIM.rise`) — undo, no penalty, `tone("tap", k)` at the new count. When the top row is full: `ANIM.rowLock` on the row and `ART.fiveMark` appears at (590, 328). When all ten are full: `ART.tenMark` at (590, 372) replaces it. The Check tile enables as soon as one counter is placed.
4. **Check**: the child taps OK.
   - **Correct**: the frame counts itself (badges 1..N with rising tones, 250 ms apart), the last badge `ANIM.lastBadge`, `tone("correct")`, praise pop (rotation), the owl `ANIM.blink` (a quick scale-y squash), the rail dot fills; after 700 ms the frame clears (`ANIM.rise` on all counters together) and the next target appears (`ANIM.appear`).
   - **Too few** (e.g. 2 for 3): the frame counts itself to 2, then the cells that still need counters (`ART.needCell` outline over the next N−k empty cells) pulse three times; `tone("nudge")`; the Check tile disables until the child changes the frame. Attempt 2.
   - **Too many** (e.g. 4 for 3): the frame counts itself to 3 with badges, then the extra counters `ANIM.rise` away one at a time with `tone("tap", k)` descending (4 → 3) and the frame is left holding exactly the target — but the item is NOT complete: the target numeral `ANIM.pulse`s and the child must tap OK again (attempt 2). This shows the correction without doing the child's checking for them.
   - **Attempt 3** (a second wrong Check): the show-me step — the frame plays the correct fill by itself (counters appear in order with tones up to N, `ART.needCell` guides), then the Check tile gains the show-me ring (`ART.showRing`, `ANIM.showMe`); tapping OK completes the item as solved-with-help (no praise pop).
5. **Items 2-8**: per Content/Rules. L3 targets are shown as a numeral ONLY (the dot strip is withdrawn — cue fading, F-46).
6. **Finish**: `t("all_done")` at (360, 110); the owl at (360, 200) `ANIM.celebrate`; the visual summary = eight small ten-frames (`ART.miniFrame` 60 × 24, cells 10 × 10) in a row at y = 400 showing each solved quantity as filled dots (x = 360 − 3.5 × 76 + i × 76); `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 5 minutes.

## Art registry
```js
const ART = {
  owl:           { kind: "emoji", value: "🦉", size: 96 },
  targetNumeral: { kind: "text",  value: "", size: 72, font: "display", color: "structure" },
  dotStrip:      { kind: "shape", shape: "circle", r: 6, fill: "structure" },        // repeated N times, 18 px apart, centred
  cell:          { kind: "shape", shape: "roundRect", w: 80, h: 80, fill: "surface", stroke: "line", strokeWidth: 2, radius: 10 },
  counter:       { kind: "shape", shape: "circle", r: 28, fill: "structure" },
  needCell:      { kind: "shape", shape: "roundRect", w: 84, h: 84, stroke: "accent", strokeWidth: 4, radius: 12 },
  countBadge:    { kind: "shape", shape: "circle", r: 16, fill: "bg" },              // numeral on it: 20 px display, color structure — sits ON a counter
  fiveMark:      { kind: "text",  value: "5", size: 28, font: "display", color: "inkSoft" },
  tenMark:       { kind: "text",  value: "10", size: 28, font: "display", color: "structure" },
  showRing:      { kind: "shape", shape: "roundRect", w: 232, h: 84, stroke: "structure", strokeWidth: 4, radius: 22 },
  miniFrame:     { kind: "shape", shape: "rect", w: 60, h: 24, stroke: "line", strokeWidth: 1 },  // finish summary; filled cells drawn as 8×8 structure squares
  dotEmpty:      { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:       { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```

## Animation registry
```js
const ANIM = {
  appear:    { alpha: 1, scale: 1, duration: 160, ease: "Back.Out", trigger: "a counter placed; a new target (from alpha 0, scale 0.6)" },
  rise:      { y: "-=30", alpha: 0, duration: 260, ease: "Sine.In", trigger: "a counter removed (undo, too-many correction, frame clear)" },
  rowLock:   { scale: 1.06, duration: 160, ease: "Sine.InOut", yoyo: true, trigger: "top row completes (whole-row container)" },
  lastBadge: { scale: 1.4, duration: 220, ease: "Back.Out", yoyo: true, trigger: "last badge of a self-count" },
  pulse:     { scale: 1.1, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "needCell outlines; target numeral after a too-many correction" },
  blink:     { scaleY: 0.85, duration: 90, ease: "Sine.InOut", yoyo: true, trigger: "owl on correct" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "ring around the Check tile (from alpha 0.2)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish owl" }
};
```

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]              ○ ○ ○ ○ ○ ○ ○ ○  rail y=28                 │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │  ART.owl (110,170)         ART.targetNumeral "3" (360,110)     │  zone A
      │                            ART.dotStrip • • • (360,160)         │
260   ├──────────────────────────────────────────────────────────────┤
      │      ┌────┬────┬────┬────┬────┐  top row y=328   5-mark (590,328)│
      │      │    │    │    │    │    │                                │  zone B
      │      ├────┼────┼────┼────┼────┤  bottom row y=416              │
      │      │    │    │    │    │    │  x = 184 272 360 448 536       │
      │      └────┴────┴────┴────┴────┘  cells 80×80, gap 8            │
480   ├──────────────────────────────────────────────────────────────┤
      │                    [   OK   ]  (360,510)                      │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Fixed layout; FIT scaling. The frame is the only interactive area besides OK.

## Visual specification
- Background `THEME.colour.bg`; rail per §6 with `ART.dotEmpty` / `ART.dotFull`.
- `ART.owl` (110, 170). `ART.targetNumeral` (360, 110); `ART.dotStrip` dots centred under it at y = 160, 18 px apart (withdrawn at L3).
- Ten-frame: 10 × `makeTile` 80 × 80 using `ART.cell` tokens (`fill: THEME.colour.surface`, `stroke: THEME.colour.line`), centres as in Screen layout; a filled cell draws `ART.counter` centred on it. The frame's outer border: a `THEME.colour.structure` 3 px rectangle 456 × 184 centred (360, 372).
- `ART.fiveMark` at (590, 328); `ART.tenMark` at (590, 372).
- `ART.needCell` outlines over cells; `ART.countBadge` on counters at their centre during a self-count.
- Check: `makeButton` labelled `ok`, at (360, 510); disabled look = alpha 0.5 (set via the container) when no counter is placed.
- `ART.showRing` around the Check button. Tap floor 80 px met by every cell.

## Content
Language-neutral.

Level pools (target quantity):
- **L1** (1-5, top row only): 3 · 1 · 5 · 2 · 4
- **L2** (6-10, both rows; dot strip shown): 7 · 6 · 10 · 8 · 9
- **L3** (6-10, numeral only — no dot strip): 8 · 6 · 9 · 10 · 7

Play list of 8: per Rules; no repeat of a target within a level in one session.

## Rules
- Item count: 8.
- Difficulty progression: 2 consecutive first-try correct Checks → next level (cap L3).
- Adaptation: a wrong Check, or wrong first-try on 2 consecutive items → next item one level down (floor L1).
- What happens on a correct answer: self-count with badges and rising tones, `tone("correct")`, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"], owl `ANIM.blink`, rail dot, frame clears, next target.
- What happens on a wrong answer:
  - Too few (miscount / stopped early): self-count to k, then `ART.needCell` pulses on the next N−k cells, `tone("nudge")`; Check disabled until the frame changes.
  - Too many (overshoot): self-count to N, extra counters rise away with descending tones, target numeral pulses, child must Check again.
  - Out-of-order fill: impossible by construction (next-empty-cell rule).
- Retry behaviour: attempt 1 → attempt 2 after the enacted hint → attempt 3 the frame fills itself and OK carries the show-me ring; solved-with-help. No attempt 4.
- Finish condition: 8 items. No losing state, no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("ok")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Ten-Frame Fill". No other text on the play screen.

## Sound
`tone("tap", k)` on each counter placed/removed (k = current count, so undo sounds lower); `tone("correct")`, `tone("nudge")`, `tone("finish")`. Silent under `?sound=off`.

## Testing checklist
- [ ] Works in all 11 languages (OK, All done, Play again, Menu, praise change with the picker).
- [ ] Works at narrow width (400-px iframe: all ten cells and OK visible and tappable).
- [ ] Keyboard operable (arrows move between cells, Enter fills/undoes; Tab reaches OK; Enter checks).
- [ ] Never auto-starts.
- [ ] No losing state (wrong Checks never end the session; the frame eventually fills itself and OK completes the item).
- [ ] Tapping any empty cell fills the NEXT cell in reading order, never the tapped one if it is out of order.
- [ ] Tapping a filled cell removes the LAST counter only.
- [ ] Completing the top row shows a "5" mark; completing the frame shows "10".
- [ ] OK is dimmed until at least one counter is placed.
- [ ] Too few: the missing cells get a pulsing coral outline; too many: the extra counters float away with falling notes and the target pulses.
- [ ] From the third level the small dot strip under the numeral disappears.
- [ ] The finish screen shows eight tiny ten-frames matching the solved quantities and no score.
- [ ] With `?sound=off` nothing is audible.
