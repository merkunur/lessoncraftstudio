# 173 — Letter Shape Fit

## Identity
- Slug: `letter-shape-fit`
- Subject / topic: Literacy / letter forms — matching a printed letter to its exact outline, including the mirror pairs b/d, p/q and the flip pairs n/u, m/w
- Age band: `5-6`
- Interaction pattern: `P2` — tap to place (tap a letter tile, then tap an outline), judged per placement
- Estimated build size: ~440 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md` §1-§14. Pattern contract: `catalogue/PATTERNS.md` P2 (immediate judgement per placement; an outline that is already filled refuses). Letters are the 26 basic Latin letters shared by all 11 alphabets; no accented or extra letters (å ä ö ñ ç æ ø) ever appear, so the content is language-neutral (F-217).

## Learning
- Objective: Places each of three letter tiles into the outline that has exactly its shape, leaving the two tiles that fit no outline (including a mirror image of a target letter) in the tray.
- Prerequisites: None beyond tapping. The child does not need to know the letter names or sounds — the task is visual form, which is why it sits in the pre-reading band. Nothing is spoken.
- Curriculum links: F-22 (letter names and forms taught explicitly at 5-7 in all 12 systems), F-25 (print forms only — cursive is out of scope; this game uses the print face of `THEME.font.body` for both outline and tile), F-31 row "Upper/lowercase link; letter formation (print)" — conservative 6-7, earliest 4 → 5-6 (US RF.K.1.d "recognize and name all upper- and lowercase letters"; England Reception "letter shapes"; Germany Vorschule "Buchstabenformen"; France GS "reconnaître les lettres … en capitales et en script"; Spain Infantil; Brazil EI03EF09; Italy prima; Netherlands groep 2 "letterherkenning"; Sweden förskoleklass "bokstäver"; Denmark 0. klasse; Norway 1. trinn; Finland esiopetus "kirjaimet").
- Common misconceptions (F-121, F-125), each with this game's response:
  1. **Mirror reversal — b and d (p and q) are "the same letter".** Response: when b is placed in d's outline the tile glides in and OVERLAPS the outline; the two bellies are on opposite sides, and two `ART.bellyMark` arcs light — one on the tile's belly, one on the outline's belly — for 900 ms before the tile glides back. The child sees the belly on the wrong side; nothing is said, nothing is marked as an error (F-121: never a hard error for a reversal).
  2. **Flip confusion — n/u and m/w read as the same shape.** Response: the same overlap; `ART.bellyMark` becomes `ART.topMark`, a bar on the closed edge of each (the top of n, the bottom of u), so the child sees which way the arch faces.
  3. **A letter "fits" any outline of about the same size (placing s in the c outline).** Response: the tile overlaps the outline and the outline's own letter `ANIM.pulse`s inside it at full strength while the tile fades to alpha 0.5 — the outline has a definite shape and the tile does not match it; then the tile returns.
  4. **Reading the letter as a picture of a familiar word / font dependence (F-125).** Response: items alternate uppercase and lowercase across the session, and L3 mixes the two cases inside one tray, so a letter is matched by its form in that case, not by a remembered word.

## How it plays
1. **Start screen**: title "Letter Shape Fit", the koala (`ART.koala`) at (360, 200), Start, picker (hidden under `?embed=1`).
2. **Item 1 (L1: outlines A, O, T; tray A, O, T, M, S)**: rail of 8 dots (§6) at y = 28. Zone A: three outline slots (`ART.outlineSlot`, 110 × 110, dashed, `makeTile`) at y = 170, x = 180 / 360 / 540, each showing its letter as a hollow outline (`ART.outlineLetter`, 72 px) centred; the koala at (70, 170). Zone B: five letter tiles (`ART.letterTile`, 90 × 90, `makeTile`) at y = 390, x = 156 / 258 / 360 / 462 / 564, each showing a solid letter (`ART.letterGlyph`, 56 px), in shuffled order. Zone C: empty. No caption.
3. **Placing**: the child taps a tile (it lifts: `api.setSelected(true)`, `ANIM.lift`, `tone("tap")`), then taps an outline. The tile glides (`ANIM.glide`) to the outline.
   - **Fits**: the letter settles centred on the outline, the outline swaps to its filled look (`ART.outlineFilled`) and `ANIM.click`s, `tone("correct")`; the tray tile empties (alpha 0.35, disabled). When all three outlines are filled: praise pop (next key in rotation), the koala `ANIM.nod`s, rail dot fills, next item after 900 ms (`ANIM.appear`).
   - **Does not fit — mirror or flip pair**: the tile overlaps the outline at alpha 0.8; `ART.bellyMark` (b/d, p/q) or `ART.topMark` (n/u, m/w) lights on the tile's belly side and on the outline's belly side (900 ms, `tone("nudge")`), then the tile glides back to the tray and de-selects. Attempt 2 for this tile.
   - **Does not fit — unrelated letter**: the tile overlaps at alpha 0.5 while the outline letter `ANIM.pulse`s (900 ms, `tone("nudge")`), then the tile glides back. Attempt 2.
   - **Outline already filled**: the tile springs back (`ANIM.nudge`), no message, not an attempt (F-61).
   - **Tapping a placed letter**: it returns to the tray (undo, free).
   - **Second wrong placement with the same tile**: the cue again, then the show-me — if the tile has an outline, that outline gains `ART.showRing` (`ANIM.showMe`); if the tile is a distractor (fits nothing), the tile itself `ANIM.nudge`s and dims to alpha 0.5, and the ring appears on the tray tile that fits the outline the child last tapped. Placing along the ring is solved-with-help.
4. **A full worked session**: item 1 (L1) A ✓ O ✓ T ✓ · item 2 (L1) E ✓ H ✓ X ✓ → step up · item 3 (L2: b o t; tray b o t d s) d → b's outline ✗ (bellies on opposite sides light) → b → b ✓ (retried), o ✓, t ✓ · item 4 (L1) S ✓ Z ✓ K ✓ · item 5 (L1) E ✓ H ✓ X ✓ → step up · item 6 (L2) p ✓ m ✓ a ✓ · item 7 (L2) d ✓ c ✓ n ✓ → step up · item 8 (L3: b n p; tray b n p d u) u → n's outline ✗ (top bars light) → n ✓, b ✓, p ✓ → Finish.
5. **Finish**: `t("all_done")` (360, 110); the koala (360, 200) `ANIM.celebrate`; the summary = the 24 filled letters of the session (three per item) as 40 × 40 `ART.outlineFilled` chips in three rows of eight (y = 340 / 390 / 440, x = 360 − 3.5 × 48 + i × 48) with their letters at 24 px, in the order they were fitted — the visual summary; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 4-5 minutes.

## Art registry
```js
const ART = {
  koala:         { kind: "emoji", value: "🐨", size: 80 },
  outlineSlot:   { kind: "shape", shape: "roundRect", w: 110, h: 110, fill: "surface2", stroke: "line", strokeWidth: 2, radius: 16 },     // dashed: lineDash [8,6]
  outlineFilled: { kind: "shape", shape: "roundRect", w: 110, h: 110, fill: "surface", stroke: "structure", strokeWidth: 3, radius: 16 },
  outlineLetter: { kind: "text",  value: "", size: 72, font: "body", color: "surface" },   // drawn with text-style stroke THEME.colour.inkSoft, strokeThickness 3 → a hollow letter
  letterTile:    { kind: "shape", shape: "roundRect", w: 90, h: 90, fill: "surface", stroke: "line", strokeWidth: 2, radius: 14 },
  letterGlyph:   { kind: "text",  value: "", size: 56, font: "body", color: "ink" },
  bellyMark:     { kind: "shape", shape: "arc", r: 22, stroke: "accent", strokeWidth: 5 },   // a half-ring hugging the bowl of b/d/p/q; side set at runtime
  topMark:       { kind: "shape", shape: "rect", w: 40, h: 6, fill: "accent" },              // a bar on the closed edge of n/u/m/w
  showRing:      { kind: "shape", shape: "roundRect", w: 122, h: 122, stroke: "structure", strokeWidth: 4, radius: 20 },
  dotEmpty:      { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:       { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
No emoji newer than Unicode 12. The outline and the tile letter use the SAME font face (`THEME.font.body`, weight 700) and the outline is drawn at 72 px while the tile is 56 px; on placement the tile's glyph scales to 72 px (`ANIM.click`) so it sits exactly on the outline. Colour-blind safety: fit/not-fit is shown by the outline changing from dashed to solid stroke and by the letter settling, never by a colour change alone; the coral marks are also arcs/bars with a position.

## Animation registry
```js
const ANIM = {
  lift:      { y: "-=8", scale: 1.06, duration: 120, ease: "Sine.Out", trigger: "letter tile selected" },
  glide:     { duration: 260, ease: "Sine.InOut", trigger: "tile to an outline / back to the tray (x,y set at call)" },
  click:     { scale: 1.29, duration: 160, ease: "Back.Out", trigger: "the placed glyph grows from 56 px to 72 px and settles exactly on the outline" },
  nudge:     { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "refused placement into a filled outline; a distractor tile during show-me" },
  markIn:    { alpha: 1, duration: 160, ease: "Sine.Out", trigger: "bellyMark / topMark appearing on tile and outline (from alpha 0), held 900 ms" },
  pulse:     { scale: 1.15, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "outline letter when an unrelated tile is placed on it" },
  fadeHalf:  { alpha: 0.5, duration: 160, ease: "Sine.Out", trigger: "the mismatched tile while the outline pulses" },
  nod:       { angle: 10, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "koala when an item completes" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "new item (from alpha 0, scale 0.6)" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "ring on the matching outline or tile (from alpha 0.2)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish koala" }
};
```

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]            ○ ○ ○ ○ ○ ○ ○ ○  rail y=28                   │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │ koala      ┌ ─ ─ ─ ┐    ┌ ─ ─ ─ ┐    ┌ ─ ─ ─ ┐                 │
      │ (70,170)   │   b   │    │   o   │    │   t   │  outlines y=170 │  zone A
      │            └ ─ ─ ─ ┘    └ ─ ─ ─ ┘    └ ─ ─ ─ ┘  110×110        │
      │             x=180         x=360         x=540                  │
260   ├──────────────────────────────────────────────────────────────┤
      │      [ d ]    [ t ]    [ b ]    [ s ]    [ o ]   tiles y=390  │  zone B
      │     x=156    x=258    x=360    x=462    x=564   (90×90)       │
480   ├──────────────────────────────────────────────────────────────┤
      │                                                              │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Fixed layout, FIT scaling; nothing reflows.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 8 × `ART.dotEmpty` at y = 28 (x = 283 + i × 22) → `ART.dotFull`.
- `ART.koala` at (70, 170).
- Outlines: `makeTile` 110 × 110 with `ART.outlineSlot` tokens (dashed), `ART.outlineLetter` centred (its hollow look comes from the text stroke); filled → `ART.outlineFilled` tokens with the placed glyph centred at 72 px `THEME.colour.ink`.
- Tiles: `makeTile` 90 × 90 with `ART.letterTile` tokens and `ART.letterGlyph` centred (56 px, weight 700). Selected = library outline + `ANIM.lift`. An emptied tile stays at alpha 0.35 and disabled.
- Marks: `ART.bellyMark` drawn as a half-ring on the bowl side of the letter — for b and p the bowl is on the RIGHT of the stem (arc from −90° to 90° centred at (+12, +8) for b, (+12, −4) for p); for d and q it is on the LEFT (arc from 90° to 270° centred at (−12, +8) for d, (−12, −4) for q); one mark on the overlapping tile glyph, one on the outline letter. `ART.topMark` sits at (0, −26) for n and m (closed edge at the top) and at (0, +26) for u and w (closed edge at the bottom).
- `ART.showRing` around the ringed outline or tile.
- Mark placement table (offsets from the letter's centre at 72 px; the same offsets scaled by 56/72 on a tray tile):

| Letter | Mark | Offset | Arc / bar |
|---|---|---|---|
| b | `ART.bellyMark` | (+12, +8) | arc −90° → 90° (bowl on the right) |
| d | `ART.bellyMark` | (−12, +8) | arc 90° → 270° (bowl on the left) |
| p | `ART.bellyMark` | (+12, −4) | arc −90° → 90° |
| q | `ART.bellyMark` | (−12, −4) | arc 90° → 270° |
| n, m | `ART.topMark` | (0, −26) | bar (closed edge at the top) |
| u, w | `ART.topMark` | (0, +26) | bar (closed edge at the bottom) |

- Tap floors: tiles 90, outlines 110 (≥ 80). Gaps: tiles 12; outlines 70.
- Tab order: tray tiles left to right, then outlines left to right.
- During a cue (≈ 1.3 s) every tile is `setEnabled(false)`.
- Text budget (5-6): the only glyphs on the play screen are the letters themselves (art, not instruction).

## Content
Language-neutral: 26 basic Latin letters only; the same trays in all 11 languages. Each item = (outline letters; tray letters — the three targets plus two that fit nothing). Distractor classes: mirror (b↔d, p↔q), flip (n↔u, m↔w), unrelated (any other letter).

- **L1** (uppercase, distinct shapes, unrelated distractors): (A, O, T; A, O, T, M, S) · (E, H, X; E, H, X, L, C) · (S, Z, K; S, Z, K, N, R) · (B, D, P; B, D, P, R, Q) · (M, W, V; M, W, V, A, T)
- **L2** (lowercase; one mirror or flip distractor + one unrelated): (b, o, t; b, o, t, d, s) · (p, m, a; p, m, a, q, e) · (d, c, n; d, c, n, b, u) · (q, e, r; q, e, r, p, w) · (u, s, k; u, s, k, n, o)
- **L3** (both distractors are mirror/flip partners; cases mixed inside one tray): (b, n, p; b, n, p, d, u) · (d, m, q; d, m, q, b, w) · (p, u, B; p, u, B, q, n) · (q, w, D; q, w, D, p, m) · (n, b, M; n, b, M, u, d)

Play list of 8 per Rules (shuffle within level, levels in order; no item repeats); tray order shuffled per item; outline order shuffled per item; the correct outline for the leftmost tray tile is never the leftmost outline on two consecutive items. Uppercase and lowercase items alternate where the level pools allow.

## Rules
- Item count: 8 (an item = three outlines filled).
- Difficulty progression: 2 consecutive items with every placement first-try → next level (cap L3).
- Adaptation: 2 wrong placements within one item, or a wrong placement in each of 2 consecutive items → next item one level down (floor L1).
- What happens on a correct answer: the glyph settles with `ANIM.click`, the outline goes solid, `tone("correct")`; when the third outline fills: praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"] (items with no wrong placement only), koala `ANIM.nod`, rail dot fills, next item after 900 ms.
- What happens on a wrong answer (each begins with the tile overlapping the outline and `tone("nudge")`):
  - Mirror pair placed (b in d, d in b, p in q, q in p): `ART.bellyMark` on both bowls (opposite sides) for 900 ms, then the tile returns.
  - Flip pair placed (n in u, u in n, m in w, w in m): `ART.topMark` on both closed edges (top vs bottom) for 900 ms, then the tile returns.
  - Unrelated letter placed: the outline letter `ANIM.pulse`s while the tile `ANIM.fadeHalf`s, 900 ms, then the tile returns.
  - A tile placed on a filled outline: refused with `ANIM.nudge`; no message; not an attempt.
- Retry behaviour: per tile — attempt 1 unaided → attempt 2 after the cue → attempt 3 with `ART.showRing` on the matching outline (or, for a distractor tile, the tile dims and the ring moves to the tray tile that fits the last-tapped outline); placing along the ring is solved-with-help. Undo (tapping a placed letter) is free. No attempt 4.
- Finish condition: 8 items. No losing state; no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Letter Shape Fit". No words on the play screen; letters are content, not text.

## Sound
`tone("tap")` on selecting a tile; `tone("tap", 6)` when a letter clicks into its outline, then `tone("correct")` on the item's third fit; `tone("nudge")` on a mismatch; `tone("finish")` once. Silent under `?sound=off`. Nothing is spoken — letter names and sounds are not part of this game.

## Testing checklist
- [ ] Works in all 11 languages (All done, Play again, Menu and praise change with the picker; the letters are identical in every language and never include accented letters).
- [ ] Works at narrow width (400-px iframe: three outlines and five tiles fully visible and separate).
- [ ] Keyboard operable (Tab: tray tiles left to right, then outlines; Enter selects / places / undoes).
- [ ] Never auto-starts.
- [ ] No losing state (wrong placements never end the session; the ring always leads to completion).
- [ ] A letter placed in its own outline grows to fill it and the dashed outline becomes solid.
- [ ] Placing d in the b outline shows two coral half-rings on opposite sides for a moment, then the tile returns; nothing turns red and no cross appears.
- [ ] Placing u in the n outline shows a coral bar at the top of the n and at the bottom of the u.
- [ ] Placing s in the c outline makes the outline letter pulse while the s fades, then the s returns.
- [ ] A tile sent to an already filled outline springs back silently.
- [ ] Tapping a placed letter returns it to the tray.
- [ ] The two spare tiles are still in the tray when the item completes; the next item starts after a short pause.
- [ ] Two clean items in a row bring lowercase trays with a mirror distractor; two mistakes in one item bring uppercase trays next.
- [ ] The finish screen shows the fitted letters in order and no score.
- [ ] With `?sound=off` nothing is audible.
