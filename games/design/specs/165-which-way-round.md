# 165 — Which Way Round

## Identity
- Slug: `which-way-round`
- Subject / topic: Literacy / letter orientation — b, d, p and q are the same shape facing different ways; the child picks the one that faces the same way as the model
- Age band: `5-6`
- Interaction pattern: `P1` — tap one of N (2, 3, then 4 tiles)
- Estimated build size: ~380 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P1. Locale note: b, d, p, q exist in every one of the 11 Latin-script alphabets, so the content is language-neutral (A-15); no letter names or sounds are involved and nothing is spoken. Game 006 (Letter Lantern) mixes many confusable letters; this game isolates ONE thing — orientation of one shape — and is its deliberate companion (F-41).

## Learning
- Objective: Given a model letter (b, d, p or q) shown large, taps the tile showing the letter that faces the same way as the model, among tiles showing its mirror form and its upside-down form.
- Prerequisites: None. No reading, no letter names; the task is visual — "find the one that faces this way". Discoverable by tapping: the first item has only two tiles.
- Curriculum links: F-22 (letter recognition taught explicitly at 5-7 in all 12 systems), F-31 row "Upper/lowercase link; letter formation (print)" — conservative 6-7, earliest 4 → 5-6, F-1 (letter recognition in 9 of 15 sources), F-25 (print forms only). US RF.K.1.d; England Reception/Y1 letter formation and recognition; Germany Klasse 1 Buchstaben (b/d/p/q Verwechslung); France GS-CP "reconnaître les lettres, orientation"; Spain Infantil-1º; Brazil EF01LP04-05; Netherlands groep 3 letterkennis; Sweden förskoleklass; Finland esiopetus.
- Common misconceptions (F-121, F-102), each with this game's response:
  1. **Mirror reversal — d is tapped for b (or q for p): mirror invariance has not been unlearned, which is normal to ~7.** Response: the tapped tile and the model both gain `ART.bellyDot` (a coral dot on the round part) and `ART.sideArrow` beneath them pointing toward the belly side (`ANIM.cueShow`, 1400 ms): on b the belly is on the right, on d on the left. The child sees the one thing that differs. Never treated as a hard error; the item counts as retried.
  2. **Up-down flip — p is tapped for b (or q for d): the stick is on the wrong end.** Response: `ART.stickMark` (a coral line along the straight stroke) appears on both letters with `ART.upArrow` / `ART.downArrow` beside the model's stick: on b the stick goes UP, on p it goes DOWN.
  3. **Both flipped — q for b, p for d.** Response: both cues together (belly dot + side arrow, stick mark + up/down arrow).
  4. **Choosing by position (always the first tile) or by brute force.** Response: the correct tile's slot is shuffled and never repeats twice running (§13); an item solved after a wrong tap never counts as first-try (F-65); after two wrong taps the show-me ring identifies the tile.

## How it plays
1. **Start screen**: title "Which Way Round", the mouse (`ART.mouse`) at (360, 200), Start, picker.
2. **Item 1 (L1: model b; tiles b, d)**: rail of 10 dots (§6) at y = 28. Zone A: the model card (`ART.modelCard`, 200 × 170) centred at (360, 160) showing the model letter (`ART.modelLetter`, 110 px, `THEME.font.display`, `THEME.colour.structure`); the mouse sits at (200, 210) looking at the card. Zone B: two letter tiles (`ART.letterTile`, 100 × 100) at y = 380, x = 300 / 420, each showing one letter at 64 px (`THEME.font.display`, `THEME.colour.ink`), shuffled. No caption — the big letter IS the prompt: find this one.
3. **Answering**: the child taps a tile.
   - **Correct**: `ANIM.pop`, `tone("correct")`, praise pop (rotation); a copy of the tile's letter glides (`ANIM.glide`) up beside the model on the card and the two sit side by side for 500 ms (`ART.matchGlow` behind them, `ANIM.glow`) — the same letter, facing the same way; the mouse `ANIM.hop`s; rail dot fills; next item after 700 ms (tiles `ANIM.appear`).
   - **Wrong — mirror twin**: `ANIM.nudge`, `tone("nudge")`, then the belly cue (misconception 1). Attempt 2.
   - **Wrong — flip**: nudge, tone, then the stick cue (misconception 2). Attempt 2.
   - **Wrong — both flipped**: nudge, tone, both cues. Attempt 2.
   - **Second wrong**: the cue again, then the correct tile gains the show-me ring (`ART.showRing`, `ANIM.showMe`); tapping it completes the item as solved-with-help.
4. **Items 2-10**: per Content/Rules. L1 = two tiles (the model and its mirror twin); L2 = three tiles (model, mirror twin, flipped form); L3 = four tiles (all four orientations).
5. **A full worked session**: item 1 b: (d, b) → b ✓ · item 2 d: (d, b) → b ✗ → coral dots on the bellies of the d on the card and the tapped b, arrows under each pointing to the belly side; d ✓ (retried) · item 3 p: (q, p) → p ✓ · item 4 q ✓ · item 5 b ✓ → step up · item 6 (L2) d: (q, d, b) → q ✗ → stick marks on both with a down-arrow by the model's stick and an up-arrow by the tapped q's stick, plus the belly dots; d ✓ · item 7 (L2) p ✓ · item 8 (L2) b ✓ · item 9 (L2) q ✓ → step up · item 10 (L3) b: (p, d, b, q) → b ✓ → Finish.
6. **Finish**: `t("all_done")` (360, 110); the mouse (360, 200) `ANIM.celebrate`; the summary = the ten model letters in the order played, each drawn at 40 px (`ART.foundLetter`) in a row at y = 380 (x = 360 − 4.5 × 60 + i × 60) on a `ART.shelf` bar — a row of letters all facing their own way; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 4 minutes.

## Art registry
```js
const ART = {
  mouse:        { kind: "emoji", value: "🐭", size: 72 },
  modelCard:    { kind: "shape", shape: "roundRect", w: 200, h: 170, fill: "surface", stroke: "structure", strokeWidth: 4, radius: 22 },
  modelLetter:  { kind: "text",  value: "", size: 110, font: "display", color: "structure" },
  matchGlow:    { kind: "shape", shape: "roundRect", w: 216, h: 186, fill: "accent", radius: 26 },   // behind the card at alpha 0; ANIM.glow raises it to 0.3 briefly
  letterTile:   { kind: "shape", shape: "roundRect", w: 100, h: 100, fill: "surface", stroke: "line", strokeWidth: 2, radius: 14 },   // letter 64 px display ink
  // orientation cues
  bellyDot:     { kind: "shape", shape: "circle", r: 8, fill: "accent" },
  sideArrow:    { kind: "shape", shape: "polygon", points: [[-16,-6],[4,-6],[4,-14],[18,0],[4,14],[4,6],[-16,6]], fill: "accent" },   // points right; flipped (scaleX −1) to point left
  stickMark:    { kind: "shape", shape: "line", w: 46, stroke: "accent", strokeWidth: 6 },              // vertical, along the straight stroke
  upArrow:      { kind: "shape", shape: "polygon", points: [[-6,16],[6,16],[6,-4],[14,-4],[0,-18],[-14,-4],[-6,-4]], fill: "accent" },
  downArrow:    { kind: "shape", shape: "polygon", points: [[-6,-16],[6,-16],[6,4],[14,4],[0,18],[-14,4],[-6,4]], fill: "accent" },
  showRing:     { kind: "shape", shape: "roundRect", w: 112, h: 112, stroke: "structure", strokeWidth: 4, radius: 18 },
  foundLetter:  { kind: "text",  value: "", size: 40, font: "display", color: "structure" },
  shelf:        { kind: "shape", shape: "roundRect", w: 620, h: 10, fill: "structureSoft", radius: 5 },
  dotEmpty:     { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:      { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
The only emoji is the mouse. Colour-blind safety: the cues are dots, lines and arrows (shape + position), and the belly/stick difference is the letter's own geometry; the coral is a highlight, not the meaning.

## Animation registry
```js
const ANIM = {
  pop:       { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "correct tile" },
  nudge:     { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "wrong tile" },
  glide:     { duration: 260, ease: "Sine.InOut", trigger: "a copy of the correct letter up to (410,160) beside the model (x,y at call)" },
  glow:      { alpha: 0.3, duration: 220, ease: "Sine.Out", yoyo: true, trigger: "matchGlow behind the card on correct" },
  cueShow:   { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", yoyo: true, hold: 1400, trigger: "bellyDot / sideArrow / stickMark / upArrow / downArrow on the model and the tapped tile (from alpha 0, scale 0.5), hold, then fade" },
  hop:       { y: "-=14", duration: 130, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "mouse on correct" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "new tiles and model (from alpha 0, scale 0.6)" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "ring on the correct tile (from alpha 0.2)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish mouse" }
};
```

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]          ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28                 │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │                       ┌──────────────┐                        │
      │   mouse (200,210)     │      b       │  model card (360,160)  │  zone A
      │                       │              │  200×170, letter 110 px│
      │                       └──────────────┘                        │
260   ├──────────────────────────────────────────────────────────────┤
      │              [ d ]          [ b ]        tiles y=380           │  zone B
      │             x=300          x=420         (100×100)            │
480   ├──────────────────────────────────────────────────────────────┤
      │                                                              │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Three tiles (L2): x = 240 / 360 / 480. Four tiles (L3): x = 180 / 300 / 420 / 540. Fixed layout, FIT scaling.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 10 × `ART.dotEmpty` at y = 28 (x = 261 + i × 22) → `ART.dotFull`.
- `ART.matchGlow` behind `ART.modelCard`, both centred (360, 160); `ART.modelLetter` centred in the card; `ART.mouse` at (200, 210).
- Tiles: `makeTile` 100 × 100 with `ART.letterTile` tokens; letter label 64 px `THEME.font.display` `THEME.colour.ink`. Two tiles at x = 300 / 420; three at 240 / 360 / 480; four at 180 / 300 / 420 / 540; all at y = 380.
- Cue geometry (offsets from the letter's centre; model offsets are scaled × 1.7 for the 110-px letter): `ART.bellyDot` — b (+12, +8), d (−12, +8), p (+12, −6), q (−12, −6); `ART.sideArrow` 44 px below the letter, pointing right for b and p, left (scaleX −1) for d and q; `ART.stickMark` — b (−12, −6), d (+12, −6), p (−12, +8), q (+12, +8), vertical, 46 px long; `ART.upArrow` beside the stick of b and d (at the stick's x ± 26, y −10); `ART.downArrow` beside the stick of p and q (at the stick's x ± 26, y +10).
- `ART.showRing` behind the correct tile. Tap floor 100 ≥ 80; gaps ≥ 20.
- Font: letters MUST render in `THEME.font.display` (Baloo 2, single-storey forms) so b/d/p/q are exact mirror and flip pairs of one another.
- Tab order: tiles left to right. During a cue (≈ 1.8 s) all tiles are `setEnabled(false)`.

## Content
Language-neutral: the four lowercase letters b, d, p, q, present in every one of the 11 alphabets. Items = (model; distractor tiles) — the correct tile is the model letter itself. Relation table (used by the cue): mirror twins b↔d, p↔q; flips b↔p, d↔q; both b↔q, d↔p.
- **L1** (two tiles: the model and its mirror twin): (b; d) · (d; b) · (p; q) · (q; p)
- **L2** (three tiles: model, mirror twin, flipped form): (b; d, p) · (d; b, q) · (p; q, b) · (q; p, d)
- **L3** (four tiles: all four orientations): (b; d, p, q) · (d; b, p, q) · (p; b, d, q) · (q; b, d, p)

Play list: 10 items; L1 → L2 → L3 by Rules; the same model is never used twice running; the correct slot never repeats twice running; the first item of a session is always L1 with model b or d.

## Rules
- Item count: 10.
- Difficulty progression: 3 consecutive first-try correct → next level (cap L3). (Three: items take ~8-12 s.)
- Adaptation: a wrong tap, or wrong first-try on 2 consecutive items → next item one level down (floor L1).
- What happens on a correct answer: `ANIM.pop`, `tone("correct")`, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"] on every second correct item and on the tenth, the letter copy glides beside the model with `ANIM.glow`, mouse `ANIM.hop`, rail dot, next item after 700 ms.
- What happens on a wrong answer (each begins with `ANIM.nudge` + `tone("nudge")`):
  - Mirror twin tapped (d for b, b for d, q for p, p for q): `ART.bellyDot` on the model and the tapped letter, `ART.sideArrow` under each pointing to its belly side, `ANIM.cueShow`.
  - Flipped form tapped (p for b, q for d, b for p, d for q): `ART.stickMark` along both sticks with `ART.upArrow` / `ART.downArrow` beside each, `ANIM.cueShow`.
  - Both-flipped form tapped (q for b, p for d, d for q, b for p): both cues at once.
  - Position habit (any wrong tile): no extra cue; the show-me ring after the second wrong tap.
- Retry behaviour: attempt 1 → attempt 2 after the cue → attempt 3 with the show-me ring; solved-with-help. No attempt 4.
- Finish condition: 10 items. No losing state, no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Which Way Round". No words on the play screen; the letters are content, not text.

## Sound
`tone("correct")` on a correct tap; `tone("nudge")` on a wrong tap; `tone("tap")` when a cue starts; `tone("tap", 5)` when the letter copy settles beside the model; `tone("finish")` once. Silent under `?sound=off`. Letter names and sounds are NOT spoken (no audio files); the game is purely visual by design.

## Testing checklist
- [ ] Works in all 11 languages (All done, Play again, Menu, praise change with the picker; the play screen has no words).
- [ ] Works at narrow width (400-px iframe: model card and four tiles fully visible with gaps).
- [ ] Keyboard operable (Tab across the tiles; Enter picks).
- [ ] Never auto-starts.
- [ ] No losing state (wrong taps never end the session; the show-me ring always completes the item).
- [ ] The first item has exactly two tiles; three tiles appear after three first-try corrects; four at the third level.
- [ ] Tapping d when the card shows b puts a coral dot on the round part of both letters and an arrow under each pointing to that side (right for b, left for d).
- [ ] Tapping p when the card shows b draws a coral line along both sticks with an up-arrow by the b and a down-arrow by the p.
- [ ] Tapping q when the card shows b shows both the dots and the stick lines.
- [ ] The correct tile is never in the same position twice in a row, and the same model letter never appears twice in a row.
- [ ] Letters render in the rounded display font so that b, d, p and q are exact mirror and flip images of one another.
- [ ] The finish screen shows the ten model letters in a row on a shelf and no score.
- [ ] With `?sound=off` nothing is audible.
