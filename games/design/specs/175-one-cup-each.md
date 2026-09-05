# 175 — One Cup Each

## Identity
- Slug: `one-cup-each`
- Subject / topic: Mathematics / one-to-one correspondence — every animal gets exactly one cup, then "enough" or "not enough"
- Age band: `5-6`
- Interaction pattern: `P2` — tap to place (tap a cup, then tap an animal's mat); the enough / not-enough decision is a two-tile tap
- Estimated build size: ~460 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md` §1-§14. Pattern contract: `catalogue/PATTERNS.md` P2 (placement is always valid onto an EMPTY mat; a full mat refuses). The objective is the pairing itself; the enough / not-enough tap is how the child reads what the pairing showed.

## Learning
- Objective: Gives each animal at the table exactly one cup by tapping a cup and then an animal's mat, then taps "enough" or "not enough" according to whether every animal got a cup.
- Prerequisites: None beyond tapping. No counting is required — the pairing decides; no reading; nothing spoken.
- Curriculum links: F-1 (counting to 10 incl. one-to-one in 13 of 15 sources), F-4 (more/less/fewer, ordering in the EYFS core), F-21 (counting and cardinality; comparing quantities in all 12 systems), F-31 row "Count to 10-20, one-to-one, subitise to 5" — conservative 6, earliest 4 → 5-6 (US K.CC.B.4a "pairing each object with one and only one number name" and K.CC.C.6 "identify whether the number of objects in one group is greater than, less than, or equal to … by using matching"; England Reception ELG "compare quantities"; Germany Vorschule "Eins-zu-eins-Zuordnung"; France GS "correspondance terme à terme"; Spain Infantil; Brazil EI03ET07; Italy infanzia; Netherlands groep 2 "één-op-één"; Sweden förskoleklass; Denmark 0. klasse; Norway 1. trinn; Finland esiopetus "lukumäärien vertailu").
- Common misconceptions (F-101, F-103), each with this game's response:
  1. **One-to-one failure — giving one animal two cups, or skipping an animal (F-101 double-count / skip).** Response: a mat that already holds a cup REFUSES a second one (the cup springs back, `ANIM.nudge`, no message — F-61); an animal with an empty mat is visible as an empty mat; when the child answers, empty mats and spare cups are what the pairing lines point at.
  2. **Judging "enough" by which row looks longer (F-103 length / spread bias).** Response: at L3 the cups on the tray are spaced differently from the animals (five cups spread wide against six animals bunched, four animals spread against five cups bunched); on a wrong answer `ART.pairLine`s draw from each cup to the animal it went to (`ANIM.lineDraw`, one per pair, `tone("tap", k)`) and the unmatched animal's mat (or the spare cup) `ANIM.pulse`s — length says nothing, the pairing says everything.
  3. **"Bigger animals need more" (bigger object = more).** Response: animals are drawn at one size, and the bear gets one cup like the mouse; a second cup on the bear's mat is refused exactly as on any other.
  4. **Answering "enough" because the tray is empty (confusing "all cups used" with "everyone has one").** Response: when cups run out with an animal still without a cup, that animal's mat pulses once as the question tiles appear (`ANIM.pulse` on `ART.mat`), so the empty mat is on screen while the child decides.

## How it plays
1. **Start screen**: title "One Cup Each", the bear (`ART.bear`) at (360, 200), Start, picker (hidden under `?embed=1`).
2. **Item 1 (L1: 3 animals, 3 cups)**: rail of 8 dots (§6) at y = 28. Zone A: the table (`ART.table`, 600 × 56) centred at (360, 232); three animals (`ART.bear`, `ART.rabbit`, `ART.cat`, size 64) sitting behind it at y = 150, x = 250 / 360 / 470 (pitch 110); under each animal, on the table, its mat (`ART.mat`, 80 × 56, `makeTile`, dashed while empty) at y = 232. Zone B: the tray (`ART.tray`, 620 × 110) centred at (360, 390) holding three cups (`ART.cup`, 80 × 80 `makeTile`s) at y = 390, x = 260 / 360 / 460 (pitch 100). Zone C: empty until the question.
3. **Placing**: the child taps a cup (it lifts: `api.setSelected(true)`, `ANIM.lift`, `tone("tap")`), then taps a mat. The cup glides (`ANIM.glide`) onto the mat (drawn at size 44 on the mat, which swaps to its solid look `ART.matFull`); `tone("tap", k)` where k = number of mats now full. Tapping a placed cup sends it back to the tray (undo, free). A second cup sent to a full mat springs back (`ANIM.nudge`), no message, not an attempt. Tapping an animal does the same as tapping its mat.
4. **The question**: as soon as the tray is empty OR every mat is full, two answer tiles `ANIM.appear` in zone C: `ART.enoughTile` (a small solid mat with a cup on it) at (270, 512) and `ART.notEnoughTile` (a small dashed empty mat) at (450, 512), 120 × 80 each. If an animal is still without a cup at that moment, its mat `ANIM.pulse`s once. Spare cups stay visible on the tray.
   - **Correct**: the tile `ANIM.pop`s, `tone("correct")`, praise pop (next key in rotation); for "enough" the animals `ANIM.sip` (a small bob) one after another; for "not enough" the empty mat's animal `ANIM.look` (a small tilt) and a cup `ANIM.appear`s on its mat from nowhere (the bear host brings it — the story resolves, no one is left out); rail dot fills; next item after 900 ms.
   - **Wrong**: `tone("nudge")`, the tile `ANIM.nudge`s; then the **pairing cue**: `ART.pairLine`s draw one by one from each placed cup up to its animal (`ANIM.lineDraw`, 250 ms apart, `tone("tap", k)`); then the unmatched thing pulses — an empty mat (`ANIM.pulse` on the mat) or the spare cups on the tray (`ANIM.pulse`); the lines hold 900 ms and fade. Attempt 2.
   - **Second wrong**: the cue again, then the correct answer tile gains the show-me ring (`ART.showRing`, `ANIM.showMe`); tapping it completes the item as solved-with-help.
   - The answer tiles disappear again if the child changes the table (returns a cup) before answering, and reappear when the condition holds again.
5. **A full worked session**: item 1 (3/3) bear ✓ rabbit ✓ cat ✓ → enough ✓ · item 2 (4/4) ✓ → enough ✓ → step up · item 3 (L2: 4 animals, 3 cups) three placed, tray empty, the dog's mat pulses → "enough" ✗ → three pairing lines draw, the dog's mat pulses → not enough ✓ (retried) · item 4 (L1: 2/2) enough ✓ · item 5 (L1: 5/5) enough ✓ → step up · item 6 (L2: 3 animals, 4 cups) mats full, one cup left on the tray → enough ✓ · item 7 (L2: 5 animals, 4 cups) not enough ✓ → step up · item 8 (L3: 6 animals bunched, 5 cups spread) → not enough ✓ → Finish.
6. **Finish**: `t("all_done")` (360, 110); the bear (360, 200) `ANIM.celebrate` holding up a cup (`ART.cup` at (410, 190), size 40); the summary = a long table (`ART.table` at y = 400) with eight `ART.matFull` mini mats (56 × 40) for the eight items, each with the item's animal count drawn as that many tiny cups (`ART.miniCup`, 10 px apart) above it and, for "not enough" items, one `ART.miniMatEmpty` beside them — the visual summary; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 5 minutes.

## Art registry
```js
const ART = {
  bear:         { kind: "emoji", value: "🐻", size: 64 },
  rabbit:       { kind: "emoji", value: "🐰", size: 64 },
  cat:          { kind: "emoji", value: "🐱", size: 64 },
  dog:          { kind: "emoji", value: "🐶", size: 64 },
  mouse:        { kind: "emoji", value: "🐭", size: 64 },
  frog:         { kind: "emoji", value: "🐸", size: 64 },
  cup:          { kind: "emoji", value: "🥛", size: 56 },                         // Unicode 9; drawn at 44 on a mat
  table:        { kind: "shape", shape: "roundRect", w: 600, h: 56, fill: "surface2", stroke: "structure", strokeWidth: 3, radius: 12 },
  mat:          { kind: "shape", shape: "roundRect", w: 80, h: 56, fill: "surface", stroke: "line", strokeWidth: 2, radius: 10 },       // dashed while empty: lineDash [8,6]
  matFull:      { kind: "shape", shape: "roundRect", w: 80, h: 56, fill: "structureSoft", stroke: "structure", strokeWidth: 3, radius: 10 },
  tray:         { kind: "shape", shape: "roundRect", w: 620, h: 110, fill: "surface", stroke: "line", strokeWidth: 2, radius: 18 },
  cupTile:      { kind: "shape", shape: "roundRect", w: 80, h: 80, fill: "surface2", stroke: "line", strokeWidth: 2, radius: 14 },
  enoughTile:   { kind: "shape", shape: "roundRect", w: 120, h: 80, fill: "surface", stroke: "structure", strokeWidth: 3, radius: 16 },   // icon: miniMatFull + miniCup centred
  notEnoughTile:{ kind: "shape", shape: "roundRect", w: 120, h: 80, fill: "surface", stroke: "structure", strokeWidth: 3, radius: 16 },   // icon: miniMatEmpty centred
  miniMatFull:  { kind: "shape", shape: "roundRect", w: 44, h: 30, fill: "structureSoft", stroke: "structure", strokeWidth: 2, radius: 6 },
  miniMatEmpty: { kind: "shape", shape: "roundRect", w: 44, h: 30, fill: "surface", stroke: "inkSoft", strokeWidth: 2, radius: 6 },       // dashed: lineDash [5,4]
  miniCup:      { kind: "emoji", value: "🥛", size: 22 },
  pairLine:     { kind: "shape", shape: "line", w: 3, stroke: "accent", strokeWidth: 4 },   // from a mat's cup up to its animal, length set at runtime (≈ 60)
  showRing:     { kind: "shape", shape: "roundRect", w: 132, h: 92, stroke: "structure", strokeWidth: 4, radius: 20 },
  dotEmpty:     { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:      { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
Colour-blind safety: an empty mat is dashed and a full mat is solid with a cup on it — state is shape, not colour; the two answer tiles differ by icon geometry (a mat with a cup vs a dashed empty mat), never by colour.

## Animation registry
```js
const ANIM = {
  lift:      { y: "-=8", scale: 1.06, duration: 120, ease: "Sine.Out", trigger: "cup selected" },
  glide:     { duration: 260, ease: "Sine.InOut", trigger: "cup to a mat / back to the tray (x,y set at call)" },
  nudge:     { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "a second cup refused by a full mat; a wrong answer tile" },
  pop:       { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "correct answer tile" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "answer tiles; the host's extra cup; new item (from alpha 0, scale 0.6)" },
  vanish:    { alpha: 0, scale: 0.6, duration: 160, ease: "Sine.In", trigger: "answer tiles hiding when the table changes" },
  lineDraw:  { scaleY: 1, alpha: 1, duration: 220, ease: "Sine.Out", trigger: "each pairLine growing from the cup up to its animal (from scaleY 0 anchored at the cup), 250 ms apart" },
  pulse:     { scale: 1.15, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "an empty mat / the spare cups when the question appears and after a wrong answer" },
  fadeOut:   { alpha: 0, duration: 300, ease: "Sine.In", trigger: "pairing lines after the hold" },
  sip:       { y: "-=10", duration: 140, ease: "Sine.InOut", yoyo: true, trigger: "each animal in turn after a correct 'enough', 120 ms apart" },
  look:      { angle: 12, duration: 200, ease: "Sine.InOut", yoyo: true, trigger: "the cupless animal after a correct 'not enough', before its cup appears" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "ring on the correct answer tile (from alpha 0.2)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish bear" }
};
```

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]            ○ ○ ○ ○ ○ ○ ○ ○  rail y=28                   │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │            bear      rabbit      cat      animals y=150       │
      │           (250)      (360)      (470)     pitch 110           │  zone A
      │  ┌────────[ mat ]────[ mat ]────[ mat ]──────────┐ table y=232│
      │  └──────────────────────────────────────────────┘ mats 80×56 │
260   ├──────────────────────────────────────────────────────────────┤
      │  ┌─────────────────────────────────────────────────────────┐ │
      │  │        [cup]      [cup]      [cup]    tray y=390        │ │  zone B
      │  │        x=260      x=360      x=460    cups 80×80        │ │
      │  └─────────────────────────────────────────────────────────┘ │
480   ├──────────────────────────────────────────────────────────────┤
      │        [ enough ] (270,512)      [ not enough ] (450,512)     │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Animal x for N animals at pitch p: x = 360 − (N − 1) × p / 2 + i × p; mats share the animal's x. Cup x for M cups at pitch q: same formula. Fixed layout, FIT scaling.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 8 × `ART.dotEmpty` at y = 28 (x = 283 + i × 22) → `ART.dotFull`.
- `ART.table` centred (360, 232). Animals at y = 150 (size 64), each a `makeTile` 80 × 80 with transparent fill whose tap acts on its own mat. Mats: `makeTile` 80 × 56 with `ART.mat` tokens (dashed) → `ART.matFull` when holding a cup; the cup on a mat is drawn at size 44 at the mat's (0, −4).
- `ART.tray` centred (360, 390); cups are `makeTile` 80 × 80 with `ART.cupTile` tokens and `ART.cup` centred; an emptied cup slot leaves nothing behind (the tile is destroyed; remaining cups do not close up, so the row's length stays the false cue it was).
- Answer tiles: `makeTile` 120 × 80 with `ART.enoughTile` tokens showing `ART.miniMatFull` + `ART.miniCup` at its centre, and `ART.notEnoughTile` tokens showing `ART.miniMatEmpty` (dashed) at its centre. Which is left is fixed for the whole session (chosen at random once) so the child does not learn a slot.
- `ART.pairLine` from the cup on each mat (x, 210) up to its animal (x, 182); `ART.showRing` around the correct answer tile.
- Tap floors: cups 80, mats 80 × 56 with the animal tile 80 × 80 stacked above as the second target for the same mat (together ≥ 80 tall), answer tiles 120 × 80. Gaps: mats ≥ 12 (pitch ≥ 92), cups ≥ 12.
- Tab order: cups left to right, then mats left to right, then the two answer tiles.
- During a cue (≈ 1.2 + 0.25 × pairs s) every tile is `setEnabled(false)`.
- Text budget (5-6): zero words on the play screen.

## Content
Language-neutral (pictures only). Each item = (animals in order; cups; animal pitch p; cup pitch q; answer). Animals are drawn from `ART.bear`, `ART.rabbit`, `ART.cat`, `ART.dog`, `ART.mouse`, `ART.frog` in the order listed (the first N).

- **L1** (equal numbers; both rows at the same pitch): (3 animals; 3 cups; 110; 100; enough) · (4; 4; 110; 100; enough) · (2; 2; 140; 120; enough) · (5; 5; 100; 100; enough)
- **L2** (one more or one fewer; same pitch): (4; 3; 110; 100; not enough) · (3; 4; 110; 100; enough) · (5; 4; 100; 100; not enough) · (4; 5; 110; 100; enough)
- **L3** (length bias — F-103: the shorter row is not the smaller number): (6 animals bunched; 5 cups spread; 92; 120; not enough) · (4 animals spread; 5 cups bunched; 150; 92; enough) · (5 spread; 5 bunched; 130; 92; enough) · (6 bunched; 5 spread; 92; 116; not enough) · (5 bunched; 6 spread; 92; 100; enough)

Play list of 8 per Rules (shuffle within level; levels in order; no item repeats); animal order shuffled per item; the answer is never the same on more than two consecutive items.

## Rules
- Item count: 8.
- Difficulty progression: 2 consecutive items answered first-try → next level (cap L3).
- Adaptation: a wrong answer, or wrong first-try on 2 consecutive items → next item one level down (floor L1).
- What happens on a correct answer: tile `ANIM.pop`, `tone("correct")`, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"], animals `ANIM.sip` ("enough") or the cupless animal `ANIM.look`s and receives a cup (`ANIM.appear`) ("not enough"), rail dot fills, next item after 900 ms.
- What happens on a wrong answer (each begins with `tone("nudge")` and `ANIM.nudge` on the tapped tile):
  - "Enough" when an animal has no cup (tray-empty confusion, or length bias): pairing lines draw cup → animal for every full mat, then the empty mat pulses.
  - "Not enough" when every animal has a cup (spare cups mistaken for a shortage, or length bias): pairing lines draw for every mat, then the spare cups on the tray pulse — every animal is paired.
  - A second cup onto a full mat: refused with `ANIM.nudge`, no message, not an attempt (one-to-one enforced by the mat).
  - A cup returned to the tray: free undo; the answer tiles hide until the condition holds again.
- Retry behaviour: attempt 1 → attempt 2 after the pairing cue → attempt 3 with `ART.showRing` on the correct tile; tapping it is solved-with-help. No attempt 4.
- Finish condition: 8 items. No losing state; no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "One Cup Each". No words on the play screen; "enough" and "not enough" are icons.

## Sound
`tone("tap")` on selecting a cup; `tone("tap", k)` when the k-th mat fills (the pitch climbs as the table fills); `tone("tap", k)` per pairing line in the cue; `tone("correct")` on a correct answer; `tone("nudge")` on a wrong answer; `tone("finish")` once. Silent under `?sound=off`. Nothing is spoken.

## Testing checklist
- [ ] Works in all 11 languages (All done, Play again, Menu and praise change with the picker; the play screen has no words).
- [ ] Works at narrow width (400-px iframe: six animals, six mats, six cups and both answer tiles fully visible and separate).
- [ ] Keyboard operable (Tab: cups, then mats, then the two answer tiles; Enter selects / places / answers).
- [ ] Never auto-starts.
- [ ] No losing state (wrong answers never end the session; the ring always leads to completion).
- [ ] Tapping a cup then a mat moves the cup onto the mat; tapping the animal above the mat does the same.
- [ ] A second cup sent to a mat that already has one springs back silently; the mat keeps one cup.
- [ ] The answer tiles appear only when the tray is empty or every mat is full, and hide again if a cup is returned.
- [ ] With four animals and three cups, the last animal's mat pulses as the tiles appear; answering "enough" draws three lines from cups to animals and pulses the empty mat.
- [ ] With three animals and four cups, the spare cup stays on the tray and "enough" is correct.
- [ ] At level 3 the row of five spread cups is longer than the row of six bunched animals, and "not enough" is correct.
- [ ] After a correct "not enough" the animal without a cup gets one before the next item.
- [ ] The finish screen shows eight mini mats with tiny cups and no score.
- [ ] With `?sound=off` nothing is audible; with sound on, each filled mat is a higher note.
