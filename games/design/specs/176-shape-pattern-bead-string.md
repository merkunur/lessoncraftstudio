# 176 — Bead String Pattern

## Identity
- Slug: `shape-pattern-bead-string`
- Subject / topic: Mathematics / repeating patterns with two attributes — every bead changes colour AND shape together, and the child extends the pattern by three beads
- Age band: `6-8`
- Interaction pattern: `P2` — tap to place (tap a bead in the tray, then tap an empty slot on the string), judged on Check
- Estimated build size: ~470 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md` §1-§14. Pattern contract: `catalogue/PATTERNS.md` P2 (whole-arrangement judgement on a Check tile). Deliberate sibling of game 043 Pattern Train: 043 is the 5-6 one-attribute extend; this is the 6-8 two-attribute stretch with mid-unit endings (F-116).

## Learning
- Objective: Extends a repeating bead pattern whose beads differ in both shape and colour by placing the next three beads from a tray of bead types, including patterns that stop in the middle of a unit.
- Prerequisites: Has extended a simple AB / ABB pattern (game 043); recognises circle, square, triangle. Reads nothing beyond the OK button.
- Curriculum links: F-1 (patterns in 7 of 15 sources), F-4 (repeating patterns, 2- and 4-part, in the EYFS/Y1 core), F-21 (repeating patterns in all 12 systems), F-31 row "Sort by attribute; repeating patterns" — conservative 6-7, earliest 4 → the two-attribute, mid-unit form sits at 6-8 (US 1.OA / K.MD "patterns" via state standards; England Y1 "sequence … repeating patterns"; Germany Klasse 1 "Muster und Strukturen"; France CP "suites organisées / algorithmes"; Netherlands groep 3 "patronen"; Spain 1º ciclo "series"; Brazil EF01MA09-10 "sequências recursivas"; Italy prima "ritmi"; Sweden åk 1 "mönster"; Denmark 1. klasse "mønstre"; Norway 2. trinn "mønster"; Finland grade 1-2 "säännönmukaisuudet").
- Common misconceptions (F-116), each with this game's response:
  1. **Extending by copying the last bead (A B B A B B → B B B).** Response: on Check the placed beads that break the pattern `ANIM.nudge` and glide back to the tray; then `ART.unitBracket` appears over the FIRST unit of the string and steps along the string one unit at a time (`ANIM.bracketStep`, `tone("tap", k)`), landing over the three slots — the pattern is a unit that repeats, not a bead that repeats.
  2. **Wrong unit (reading A A B A A B as A A / B A …).** Response: the same bracket walk: the bracket is exactly one unit wide, so a 3-bead bracket walking over a 3-bead unit shows where the unit boundaries are.
  3. **Mid-unit endings — the string stops inside a unit and the child restarts the unit from the beginning (A B B A B B A → A B B instead of B B A).** Response: L3 items end mid-unit; the bracket walk ends with a PARTIAL bracket (`ART.unitBracketPart`) over the leftover beads, which extends into the first slots — the child sees that the unit is already begun.
  4. **Attending to one attribute only (following the colours, or the shapes).** Response: every bead type is a fixed shape + colour pair (a teal circle, a coral square, a green triangle, a cream diamond); the two attributes always change together, so a child who follows either one gets the same answer — and a child with a colour-vision deficiency follows the shapes. L3's tray adds a fourth type that is in NO pattern, so "a shape I have not seen yet" is never the answer by elimination.

## How it plays
1. **Start screen**: title "Bead String Pattern", the parrot (`ART.parrot`) at (360, 200), Start, picker (hidden under `?embed=1`).
2. **Item 1 (L1: A B A B A B _ _ _, tray A, B, C)**: rail of 10 dots (§6) at y = 28; `t("question_x_of_y")` at (360, 48), 18 px `THEME.colour.inkSoft`. Zone A: the string (`ART.stringLine`, a thin bar from x = 40 to x = 680 at y = 170) with six given beads on it (circle, square, circle, square, circle, square — `ART.beadA` / `ART.beadB`) from x = 90 at pitch 56, and three empty slots (`ART.slot`, 56 × 56 dashed `makeTile`s) after them at pitch 68 (x = 458 / 526 / 594); the parrot perches at (660, 110). Zone B: the tray — one `makeTile` per bead type (`ART.beadTile`, 80 × 80) at y = 390, x = 240 / 360 / 480 (three types) or 180 / 300 / 420 / 540 (four types), each showing its bead at full size; a source is never used up. Zone C: Check (`makeButton ok`) at (360, 510), disabled until all three slots hold a bead. Caption `S("whatNext")` ("What comes next?") at (360, 290), 24 px `THEME.font.body` `THEME.colour.inkSoft`.
3. **Placing**: tap a tray bead (it lifts: `api.setSelected(true)`, `ANIM.lift`, `tone("tap")`) then tap a slot: a copy glides (`ANIM.glide`) into the slot and threads onto the string (`ANIM.thread`, a small settle). The source stays selected so the next slot tap places the same type again; tapping another source switches. Tapping a placed bead sends it back (undo, free). A full slot refuses a second bead (springs back, `ANIM.nudge`, no message). Check enables when the three slots are full.
4. **Check**: the child taps OK.
   - **Correct**: the three new beads `ANIM.pop` in turn (`tone("tap", k)`), `tone("correct")`, praise pop (next key in rotation); `ART.unitBracket` sweeps once along the whole string as confirmation (`ANIM.bracketStep`, 180 ms per unit); the parrot `ANIM.bob`s; rail dot fills; next item after 900 ms (`ANIM.appear`).
   - **Wrong**: `tone("nudge")`; every placed bead that differs from the correct bead `ANIM.nudge`s and glides back to the tray (correct ones stay); then the **bracket walk**: `ART.unitBracket` appears over the first unit (`ANIM.appear`) and steps unit by unit along the given beads (`ANIM.bracketStep`, 350 ms per step, `tone("tap", k)`), and if the string ends mid-unit the partial bracket `ART.unitBracketPart` covers the leftover beads and the slots that complete that unit; the bracket holds 900 ms over the slots and fades (`ANIM.fadeOut`). Check disables until the slots are full again. Attempt 2.
   - **Second wrong Check**: the walk again, then the show-me: ghost beads (`ART.ghostA` … the dashed outline of the correct type) appear in the three slots (`ANIM.appear`) and OK gains the show-me ring (`ART.showRing`, `ANIM.showMe`); placing the matching beads on the ghosts and checking completes the item as solved-with-help (no praise pop).
5. **A full worked session**: item 1 (L1 AB) ✓ · item 2 (L1 ABB: A B B A B B _ _ _) child places A B B ✓ → step up · item 3 (L2 ABC) ✓ · item 4 (L2 AABB: A A B B A A B B _ _ _) child places A A B ✓ → step up · item 5 (L3, mid-unit: A B B A B B A _ _ _) child places A B B ✗ → the A glides back (B B A is correct), the bracket walks A B B | A B B | A _ _ and the partial bracket shows the last A beginning a unit; child places B B A ✓ (helped: not first-try) → step down · item 6 (L2 ABC) ✓ · item 7 (L2) ✓ → step up · items 8-10 (L3) ✓ ✓ ✓ → Finish.
6. **Finish**: `t("all_done")` (360, 110); the parrot (360, 200) `ANIM.celebrate`; the summary = the ten completed strings drawn small (`ART.miniString`, bead glyphs at size 16, pitch 18) in two columns of five (x = 200 and 520; y = 320 + i × 34), the three beads the child placed drawn with `ART.miniRing` around them — the patterns the child extended; optional `t("question_x_of_y")` with n = first-try items at (360, 470); `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 6 minutes.

## Art registry
```js
const ART = {
  parrot:          { kind: "emoji", value: "🦜", size: 80 },                     // Unicode 12
  stringLine:      { kind: "shape", shape: "rect", w: 640, h: 4, fill: "inkSoft" },
  // bead types — each a FIXED shape + colour pair; the type letter is the pattern symbol
  beadA:           { kind: "shape", shape: "circle", r: 22, fill: "structure", stroke: "ink", strokeWidth: 2 },                    // teal circle
  beadB:           { kind: "shape", shape: "rect", w: 40, h: 40, fill: "accent", stroke: "ink", strokeWidth: 2 },                   // coral square
  beadC:           { kind: "shape", shape: "polygon", points: [[0,-24],[22,16],[-22,16]], fill: "good", stroke: "ink", strokeWidth: 2 },   // green triangle
  beadD:           { kind: "shape", shape: "polygon", points: [[0,-26],[22,0],[0,26],[-22,0]], fill: "surface2", stroke: "structure", strokeWidth: 3 },   // cream diamond
  ghostA:          { kind: "shape", shape: "circle", r: 22, stroke: "structure", strokeWidth: 2 },                                   // dashed: lineDash [6,4]
  ghostB:          { kind: "shape", shape: "rect", w: 40, h: 40, stroke: "structure", strokeWidth: 2 },
  ghostC:          { kind: "shape", shape: "polygon", points: [[0,-24],[22,16],[-22,16]], stroke: "structure", strokeWidth: 2 },
  ghostD:          { kind: "shape", shape: "polygon", points: [[0,-26],[22,0],[0,26],[-22,0]], stroke: "structure", strokeWidth: 2 },
  slot:            { kind: "shape", shape: "roundRect", w: 56, h: 56, fill: "surface2", stroke: "line", strokeWidth: 2, radius: 28 },   // dashed while empty
  beadTile:        { kind: "shape", shape: "roundRect", w: 80, h: 80, fill: "surface", stroke: "line", strokeWidth: 2, radius: 14 },
  unitBracket:     { kind: "shape", shape: "roundRect", w: 112, h: 64, stroke: "accent", strokeWidth: 4, radius: 14 },              // width = unit length × pitch at runtime
  unitBracketPart: { kind: "shape", shape: "roundRect", w: 60, h: 64, stroke: "accent", strokeWidth: 4, radius: 14 },              // dashed: lineDash [8,6]; spans the leftover beads + the completing slots
  showRing:        { kind: "shape", shape: "roundRect", w: 232, h: 84, stroke: "structure", strokeWidth: 4, radius: 22 },
  miniString:      { kind: "shape", shape: "rect", w: 200, h: 2, fill: "inkSoft" },
  miniRing:        { kind: "shape", shape: "circle", r: 10, stroke: "accent", strokeWidth: 2 },
  dotEmpty:        { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:         { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
`ART.parrot` is Unicode 12 (2019) — the newest allowed without a fallback. Colour-blind safety by construction: the four types differ in shape (circle / square / triangle / diamond) as well as colour; no two types share a shape. The bracket is coral AND an outline with a position.

## Animation registry
```js
const ANIM = {
  lift:        { y: "-=8", scale: 1.06, duration: 120, ease: "Sine.Out", trigger: "tray bead selected" },
  glide:       { duration: 260, ease: "Sine.InOut", trigger: "bead copy to a slot / back to the tray (x,y set at call)" },
  thread:      { scale: 1.0, y: "+=0", duration: 120, ease: "Back.Out", trigger: "bead settles onto the string from scale 1.15" },
  nudge:       { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "refused placement; a wrong bead before it returns" },
  pop:         { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "each new bead on a correct Check, 120 ms apart" },
  bracketStep: { x: "+=112", duration: 350, ease: "Sine.InOut", trigger: "unitBracket moves one unit to the right (distance = unit length × pitch, set at call)" },
  appear:      { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "bracket; ghost beads; new item (from alpha 0, scale 0.6)" },
  fadeOut:     { alpha: 0, duration: 300, ease: "Sine.In", trigger: "bracket after its hold" },
  bob:         { y: "-=12", duration: 140, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "parrot on a correct Check" },
  showMe:      { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "ring around OK during show-me (from alpha 0.2)" },
  celebrate:   { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish parrot" }
};
```

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]          ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28; "1 of 10" y=48 │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │                                                 parrot(660,110)│
      │  ──●──■──●──■──●──■──( )──( )──( )────────────  string y=170  │  zone A
      │   x=90 pitch 56 (given)     slots x=458/526/594 (56×56)       │
260   ├──────────────────────────────────────────────────────────────┤
      │                 "What comes next?" (360,290)                  │
      │          [ ● ]        [ ■ ]        [ ▲ ]     tray y=390       │  zone B
      │         x=240        x=360        x=480     (80×80)           │
480   ├──────────────────────────────────────────────────────────────┤
      │                    [   OK   ] (360,510)                       │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Given beads: G beads from x = 90 at pitch 56 (G = 6, 7 or 8 → the last given bead is at x = 90 + 56 × (G − 1)); the three slots start 40 px after the last given bead at pitch 68 (with G = 8: last given at 482, slots at 522 / 590 / 658 — the string extends to x = 680, so the third slot's right edge is 686; OK). Fixed layout, FIT scaling.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 10 × `ART.dotEmpty` at y = 28 (x = 261 + i × 22) → `ART.dotFull`; `t("question_x_of_y")` at (360, 48).
- `ART.stringLine` centred (360, 170); given beads drawn as `ART.beadA` / `ART.beadB` / `ART.beadC` / `ART.beadD` at their x on y = 170 (not tappable); slots are `makeTile` 56 × 56 with `ART.slot` tokens (dashed while empty); a placed bead is drawn at full size on the slot and the slot's dashed stroke disappears.
- Tray: `makeTile` 80 × 80 with `ART.beadTile` tokens and the type's bead centred; selection persists across slot taps.
- `ART.unitBracket` centred on the unit it covers at y = 170, its width = unit length × 56 for given beads (or × 68 across the slots); `ART.unitBracketPart` for the leftover-plus-slots span; ghost beads (`ART.ghostA` for type A, `ART.ghostB` for B, `ART.ghostC` for C, `ART.ghostD` for D) in the slots during show-me; `ART.showRing` around OK.
- `ART.parrot` at (660, 110). Check `makeButton` `ok` at (360, 510), alpha 0.5 while disabled. Caption `S("whatNext")` at (360, 290), `wordWrap` 500, max 2 lines.
- Tap floors: tray 80, slots 56 (≥ 56), OK 220 × 72. Gaps: slots 12, tray ≥ 40.
- Tab order: tray tiles left to right, then the three slots, then OK.
- During the bracket walk (≈ 0.35 × units + 1.2 s) every tile is `setEnabled(false)`.

## Content
Language-neutral (shapes only; one caption string). Bead type letters map to ART: A = `ART.beadA` (teal circle), B = `ART.beadB` (coral square), C = `ART.beadC` (green triangle), D = `ART.beadD` (cream diamond). Each item = (given beads; answer = the next three; tray types). Given beads are listed left to right.

- **L1** (2- and 3-bead units, the string ends on a complete unit, three tray types): (A B A B A B; A B A; A B C) · (A B B A B B; A B B; A B C) · (A A B A A B; A A B; A B C) · (B A B A B A; B A B; A B C) · (B C C B C C; B C C; A B C) · (C A C A C A; C A C; A B C)
- **L2** (3- and 4-bead units, complete-unit endings, three or four tray types): (A B C A B C; A B C; A B C) · (A A B B A A B B; A A B; A B C) · (B C A B C A; B C A; A B C) · (A B B C A B B C; A B B; A B C D) · (C C A C C A; C C A; A B C D) · (A B C D A B C D; A B C; A B C D)
- **L3** (the string ends MID-unit; four tray types including one that is in no pattern): (A B B A B B A; B B A; A B C D) · (A B C A B; C A B; A B C D) · (A A B B A A; B B A; A B C D) · (A B C D A B C; D A B; A B C D) · (B B A B B A B B; A B B; A B C D) · (C A A C A A C; A A C; A B C D)

Play list of 10 per Rules (shuffle within level; levels in order; no item repeats); tray order shuffled per item; the correct first bead is never the leftmost tray tile on two consecutive items.

## Rules
- Item count: 10.
- Difficulty progression: 2 consecutive first-Check correct → next level (cap L3).
- Adaptation: a wrong Check, or wrong first-Check on 2 consecutive items → next item one level down (floor L1).
- What happens on a correct answer: new beads `ANIM.pop` in turn with rising tones, `tone("correct")`, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"] (first-try items), the bracket sweeps the whole string once, parrot `ANIM.bob`, rail dot, next item after 900 ms.
- What happens on a wrong answer (each begins with `tone("nudge")` and the wrong beads gliding back):
  - Last bead copied (A B B → B B B): the bracket walk over the given units, ending over the slots — the unit, not the bead, repeats.
  - Wrong unit boundary (A A B read as A A / B A): the same walk; the bracket's fixed width shows the true unit.
  - Unit restarted after a mid-unit ending (L3): the walk ends with the dashed partial bracket spanning the leftover bead(s) and the slots that complete the unit.
  - A bead of the fourth (never-used) type placed: it glides back with the others; the walk shows the pattern uses only its own types.
  - A bead placed on a full slot: refused, `ANIM.nudge`, no message, not an attempt.
- Retry behaviour: attempt 1 → attempt 2 after the bracket walk → attempt 3 with ghost beads in the slots and the ringed OK; matching the ghosts is solved-with-help. Undo is free. No attempt 4.
- Finish condition: 10 items. No losing state; no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("ok")`, `t("question_x_of_y")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Bead String Pattern"; `whatNext` = "What comes next?".

## Sound
`tone("tap")` on selecting a tray bead; `tone("tap", k)` when the k-th slot fills; `tone("tap", k)` per bracket step; `tone("correct")` on a correct Check; `tone("nudge")` on a wrong Check; `tone("finish")` once. Silent under `?sound=off`. Nothing is spoken.

## Testing checklist
- [ ] Works in all 11 languages (OK, "Question 1 of 10", All done, Play again, Menu, praise; the caption once translated).
- [ ] Works at narrow width (400-px iframe: eight given beads, three slots, four tray tiles and OK fully visible; slots remain separate targets).
- [ ] Keyboard operable (Tab: tray tiles, then slots, then OK; Enter selects / places / removes / checks).
- [ ] Never auto-starts.
- [ ] No losing state (wrong Checks never end the session; the ghost beads and ringed OK always complete the item).
- [ ] Every bead type has its own shape as well as its own colour; no two types share a shape.
- [ ] Tapping a tray bead then a slot threads a copy onto the string; the tray bead is not used up.
- [ ] OK is dimmed until all three slots are filled.
- [ ] Placing B B B after A B B A B B sends the first two beads back, then a coral bracket walks along the string unit by unit and rests over the three slots.
- [ ] At level 3 a string ending mid-unit shows a dashed bracket over the leftover bead and the slots that finish its unit.
- [ ] At level 3 the tray contains a fourth bead type that never belongs; placing it sends it back.
- [ ] After two wrong Checks dashed ghost beads appear in the slots and OK gains a pulsing ring.
- [ ] Two first-Check corrects in a row bring longer units; a wrong Check brings shorter units next.
- [ ] The finish screen shows the ten strings with the child's three beads ringed and no score beyond the optional "n of 10".
- [ ] With `?sound=off` nothing is audible.
