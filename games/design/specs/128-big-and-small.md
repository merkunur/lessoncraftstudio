# 128 — Big and Small

## Identity
- Slug: `big-and-small`
- Subject / topic: Mathematics / sorting by size — big or small as DRAWN, regardless of what the thing is
- Age band: `5-6`
- Interaction pattern: `P8` — sort into bins (tap the object, then tap a bin; one object at a time, two bins)
- Estimated build size: ~420 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P8 (judged per item). Content is language-neutral (emoji objects in two drawn sizes; the bins carry a big circle and a small circle, no words); no `LOCALE_DATA`. The words "big" and "small" are never written or spoken — the two circles are the prompt in every locale.

## Learning
- Objective: Sorts each object into the big bin or the small bin by the size it is DRAWN — putting a small-drawn elephant in the small bin and a big-drawn mouse in the big bin.
- Prerequisites: None beyond tapping. The first item is discoverable: the object pops when tapped and the two bins are large dashed targets with a big and a small circle on them.
- Curriculum links: F-103 (comparing quantities — "bigger object = more", length/area instead of the compared attribute; response: object size varied independently of everything else from level 2), F-21 ("comparing/ordering quantities" and "sort by attribute" in all twelve systems), F-31 rows "Sort by attribute" and "Compare more/fewer/same" — conservative 6-7, earliest 4 → 5-6 (US K.MD.A.2 "directly compare two objects with a measurable attribute in common"; England Reception ELG "compare … size"; Germany Klasse 1 "groß/klein vergleichen und ordnen"; France GS "comparer des objets selon leur taille"; Netherlands groep 1-2 "groot/klein"; Spain Infantil "grande/pequeño"; Brazil EI03ET01; Sweden förskoleklass "jämförelser av storlek"; Finland esiopetus). Feedback is enacted (F-43), an invalid placement is refused (F-61), tap-then-tap replaces drag (F-49).
- Common misconceptions (F-103 size-and-quantity confusions; the responses rest on F-43), each with this game's response:
  1. **Sorting by what the thing IS, not how big it is drawn ("an elephant is big" — so the small-drawn elephant goes in the big bin).** Response: the object glides to the bin's circle and is laid over it (`ANIM.glide` to the icon); the small elephant sits inside the big circle with a coral ring of empty space around it (`ART.gapRing`, the space between the object's own size ring and the big circle) — it does not fill the big circle; then it glides back to the belt with `ANIM.nudge`. L2 introduces a small elephant and a big mouse on purpose.
  2. **A big-drawn small thing goes in the small bin ("a mouse is small").** Response: the big mouse is laid over the small circle and sticks out all round it — the part outside the small circle is outlined by `ART.sizeRing` (the object's own size, accent) so the overhang is visible; then it returns.
  3. **Judging by the bin's side (always the left bin, or the bin used last time).** Response: at L3 the two bins swap sides between items (the icons move with them), so position never sorts; the icon is the only cue.
  4. **Tapping a bin before an object.** Response: the bin's circle icon `ANIM.pop`s as a harmless preview; nothing else. Tapping the object twice de-selects it (no error).
  5. **Treating "small" as "fewer" or "big" as "more" (F-103).** Response: every item is exactly ONE object, so there is never a quantity to confuse with size.

## How it plays
1. **Start screen**: title "Big and Small", the lion (`ART.lion`) at (360, 200), Start, picker (hidden under `?embed=1`).
2. **Item 1 (L1: a big apple)**: rail of 10 dots (§6). Zone A: a conveyor strip (`ART.belt`) across zone A at y = 190; the lion at the left end (80, 170); the first object slides in from the right (`ANIM.slideIn`) to (360, 170) as a `makeTile` 120 × 120 (transparent body, `ART.objTile` tokens) whose label is the object emoji drawn through ART at its DRAWN size: big = 96 px, small = 44 px. Zone B: two bins (`ART.bin`, 200 × 120) at y = 390, x = 220 (big bin) and x = 500 (small bin) — `makeTile`s; each carries its icon at its centre-top: `ART.iconBig` (a circle r 40) or `ART.iconSmall` (a circle r 16), both plain ink outlines; below the icon a row of `ART.binDot`s grows as objects are sorted (one dot per object; no numeral). No caption; no words anywhere.
3. **Sorting**: tap the object (it lifts: `api.setSelected(true)`, `ANIM.lift`, `tone("tap")`), then tap a bin. The object glides (`ANIM.glide`) toward the bin.
   - **Correct bin**: the object shrinks into the bin (`ANIM.shrinkIn`, scale to 0.3 while gliding), a new `ART.binDot` appears on the bin (`ANIM.appear`), `ANIM.pop` on the bin, `tone("correct")`; every second correct sort plays a praise pop (`GameCore.showPraise`, next key in rotation) so ten items do not bring ten pops; the rail dot fills; the next object slides in after 400 ms. First-try correct.
   - **Wrong bin**: the object glides to the bin's icon and is laid over the circle; `ART.sizeRing` (a circle of the object's own size: r 48 for big, r 22 for small, accent stroke 4) appears around it and, for a small object over the big circle, `ART.gapRing` (the annulus between r 22 and r 40, accent 35 % fill) shows the empty space; `tone("nudge")`; after 1000 ms the rings fade (`ANIM.fadeOut`) and the object glides back to (360, 170) with `ANIM.nudge`. Attempt 2. Both bins `setEnabled(false)` during the cue.
   - **Second wrong bin**: the cue again, then the correct bin's icon gains the show-me ring (`ART.showRing`, `ANIM.showMe`); placing the object there completes the item as solved-with-help (no praise pop).
   - Tapping a bin with nothing selected: its icon `ANIM.pop`s. Tapping the selected object again: de-selects, `tone("tap")`.
4. **Items 2-10**: per Content/Rules. L1: different kinds, drawn size matching what the child expects (big tree, small ant); L2: the SAME kind in both sizes on consecutive items (a big apple, then a small apple) and the two traps — a small elephant and a big mouse; L3: more traps (a small whale, a big ant, a small house, a big ladybird) and the bins swap sides between items.
5. **Finish**: `t("all_done")` (360, 110); the lion (360, 200) `ANIM.celebrate`; the summary = the two bins at y = 400 (x = 220 and 500) each showing every object it received drawn at 28 px in a row inside it (`ART.summaryRow` positions) — a big-bin row and a small-bin row, not a score; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`; `GameCore.reportHeight()`.

Session ≈ 4 minutes (10 items × 15-25 s).

## Art registry
```js
const ART = {
  lion:        { kind: "emoji", value: "🦁", size: 80 },
  objApple:    { kind: "emoji", value: "🍎", size: 96 },     // size at draw time = 96 (big) or 44 (small) per item
  objBall:     { kind: "emoji", value: "⚽", size: 96 },
  objTree:     { kind: "emoji", value: "🌳", size: 96 },
  objBalloon:  { kind: "emoji", value: "🎈", size: 96 },
  objFish:     { kind: "emoji", value: "🐟", size: 96 },
  objMushroom: { kind: "emoji", value: "🍄", size: 96 },
  objCar:      { kind: "emoji", value: "🚗", size: 96 },
  objChick:    { kind: "emoji", value: "🐥", size: 96 },
  objElephant: { kind: "emoji", value: "🐘", size: 96 },
  objMouse:    { kind: "emoji", value: "🐭", size: 96 },
  objAnt:      { kind: "emoji", value: "🐜", size: 96 },
  objHouse:    { kind: "emoji", value: "🏠", size: 96 },
  objWhale:    { kind: "emoji", value: "🐳", size: 96 },
  objLadybird: { kind: "emoji", value: "🐞", size: 96 },
  belt:        { kind: "shape", shape: "roundRect", w: 600, h: 24, fill: "surface2", stroke: "line", strokeWidth: 2, radius: 12 },
  objTile:     { kind: "shape", shape: "roundRect", w: 120, h: 120, fill: "bg", stroke: "bg", strokeWidth: 0, radius: 16 },   // invisible tile body; selected look = structure 3 px outline
  bin:         { kind: "shape", shape: "roundRect", w: 200, h: 120, fill: "surface", stroke: "line", strokeWidth: 2, radius: 14 },   // dashed (lineDash [8,6]) until the first object lands, then solid
  iconBig:     { kind: "shape", shape: "circle", r: 40, stroke: "ink", strokeWidth: 3 },
  iconSmall:   { kind: "shape", shape: "circle", r: 16, stroke: "ink", strokeWidth: 3 },
  binDot:      { kind: "shape", shape: "circle", r: 6, fill: "structure" },                       // one per sorted object, 16 px apart along the bin's bottom
  sizeRing:    { kind: "shape", shape: "circle", r: 48, stroke: "accent", strokeWidth: 4 },        // r 48 (big) or r 22 (small); the object's own size, shown over the wrong bin's icon
  gapRing:     { kind: "shape", shape: "arc", r: 40, fill: "accent" },                             // the annulus r 22-40 (drawn as a full arc with a hole), 35 % alpha
  showRing:    { kind: "shape", shape: "circle", r: 52, stroke: "structure", strokeWidth: 4 },
  summaryRow:  { kind: "shape", shape: "roundRect", w: 180, h: 40, fill: "structureSoft", stroke: "structure", strokeWidth: 1, radius: 8 },   // finish: holds up to 6 objects at 28 px, 30 px apart
  dotEmpty:    { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:     { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
Every object entry is drawn at 96 px when the item says "big" and 44 px when it says "small"; the registry `size` is the big size. All emoji are Unicode 12 or older; no fallbacks needed. The two bin icons differ by SIZE only, in one colour — the property being sorted is the only difference between them.

## Animation registry
```js
const ANIM = {
  slideIn:   { x: 360, duration: 400, ease: "Sine.Out", trigger: "a new object entering along the belt (from x = 760)" },
  lift:      { y: "-=8", scale: 1.06, duration: 120, ease: "Sine.Out", trigger: "object selected" },
  glide:     { duration: 300, ease: "Sine.InOut", trigger: "object to a bin's icon / back to the belt (x,y set at call)" },
  shrinkIn:  { scale: 0.3, alpha: 0, duration: 300, ease: "Sine.In", trigger: "object entering the correct bin" },
  pop:       { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "the bin on a correct sort; a bin icon tapped with nothing selected" },
  nudge:     { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "object back on the belt after a wrong bin" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "a new bin dot; size ring and gap ring (from alpha 0, scale 0.6)" },
  fadeOut:   { alpha: 0, duration: 300, ease: "Sine.In", trigger: "rings after the cue" },
  swap:      { duration: 400, ease: "Sine.InOut", trigger: "the two bins trading x positions at L3 (x set at call)" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "show-me ring on the correct bin's icon (from alpha 0.2)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish lion" }
};
```
No flashing: `showMe` at 1 Hz; rings appear once and fade.

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]           ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28                │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │  lion (80,170)          [ object (360,170) 120×120 ]         │  zone A
      │  ═══════════════════ belt y=190 ═══════════════════════════  │
260   ├──────────────────────────────────────────────────────────────┤
      │   ┌────────────────┐            ┌────────────────┐           │
      │   │   (   O   )    │            │      ( o )     │  bins     │  zone B
      │   │   • • •        │            │      • •       │  y=390    │
      │   └────────────────┘            └────────────────┘  200×120  │
      │        x=220                          x=500                  │
480   ├──────────────────────────────────────────────────────────────┤
      │                 (praise pop appears centred)                 │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Fixed layout, FIT scaling. At L3 the two bins swap x positions between items (`ANIM.swap`), icons and dots travelling with them.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 10 × `ART.dotEmpty` at y = 28 (x = 261 + i × 22) → `ART.dotFull`.
- `ART.lion` (80, 170); `ART.belt` centred (360, 190).
- Object: `makeTile` 120 × 120 with `ART.objTile` tokens at (360, 170); label = the item's object emoji through ART at 96 px (big) or 44 px (small); selected look = library outline + `ANIM.lift`.
- Bins: `makeTile` 200 × 120 with `ART.bin` tokens at (220, 390) and (500, 390); `ART.iconBig` / `ART.iconSmall` centred at bin (0, −14); `ART.binDot`s along bin (−40 + i × 16, 40); `ART.showRing` around the correct bin's icon on attempt 3.
- Cue: the object laid at the wrong bin's icon centre; `ART.sizeRing` around it; `ART.gapRing` beneath a small object on the big circle.
- Tap floors: the object 120, bins 200 × 120 (≥ 80); gap between bins 80. Tab order: the object, then the big bin, then the small bin (whatever their sides). Under `?embed=1` the picker is not created. No text on the play screen.

## Content
Language-neutral. Item = (object; drawn size). Objects by ART key: `ART.objApple`, `ART.objBall`, `ART.objTree`, `ART.objBalloon`, `ART.objFish`, `ART.objMushroom`, `ART.objCar`, `ART.objChick`, `ART.objElephant`, `ART.objMouse`, `ART.objAnt`, `ART.objHouse`, `ART.objWhale`, `ART.objLadybird`.

- **L1** (kinds that carry no size expectation, or the expected size):
  `ART.objApple` big · `ART.objBall` small · `ART.objTree` big · `ART.objBalloon` small · `ART.objFish` big · `ART.objMushroom` small · `ART.objCar` big · `ART.objChick` small
- **L2** (the same kind in both sizes on consecutive items; the first traps):
  `ART.objApple` big · `ART.objApple` small · `ART.objElephant` small · `ART.objMouse` big · `ART.objFish` small · `ART.objFish` big · `ART.objTree` small · `ART.objAnt` big
- **L3** (traps only; bins swap sides between items):
  `ART.objWhale` small · `ART.objAnt` big · `ART.objMouse` big · `ART.objElephant` small · `ART.objHouse` small · `ART.objLadybird` big · `ART.objBall` big · `ART.objMushroom` small

Play list of 10 per Rules: start at L1; within L1 and L3 take items in a shuffled order without repeats; within L2 keep the listed pairs adjacent (apple big then apple small; fish small then fish big) but shuffle the pair order. Two consecutive items never have the same correct bin more than three times running (§13 — the drawn sizes alternate often enough that neither bin becomes a habit). At L3 the bins swap sides before every item (even items: big bin left; odd: big bin right).

Worked example: item 1 (apple big) taps the apple, then the big bin — first-try · item 2 (ball small) first-try → L2 · item 3 (elephant small) taps the big bin: the small elephant sits inside the big circle with a coral ring of empty space around it, then slides back; taps the small bin (helped) → L1 · item 4 (tree big) first-try · item 5 (balloon small) first-try → L2 · item 6 (mouse big) taps the small bin: the big mouse sticks out all round the small circle inside its coral ring, then returns; taps the big bin (helped) → L1 · items 7-8 first-try → L2 · item 9 (fish small) first-try · item 10 (fish big) first-try · Finish shows both bins with their objects.

## Rules
- Item count: 10.
- Difficulty progression: 2 consecutive first-try sorts → next level (cap L3).
- Adaptation: any wrong bin on an item, or wrong first-try on 2 consecutive items → next item one level down (floor L1). The current item is never abandoned.
- What happens on a correct answer: `ANIM.shrinkIn`, a new bin dot, `ANIM.pop` on the bin, `tone("correct")`; a praise pop on every second correct sort, rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"]; rail dot; next object after 400 ms.
- What happens on a wrong answer (per anticipated mistake):
  - Small-drawn object put in the big bin (sorted by kind — the small elephant): it is laid on the big circle, `ART.sizeRing` (r 22) around it and `ART.gapRing` showing the empty space, `tone("nudge")`, 1000 ms, then back to the belt with `ANIM.nudge`.
  - Big-drawn object put in the small bin (the big mouse): laid on the small circle, `ART.sizeRing` (r 48) shows it overhanging all round, tone, back to the belt.
  - Same bin as last time out of habit (L3): the same cue for whichever size it is; the bins have already swapped sides, so the habit is visibly broken.
  - Bin tapped first: the icon pops; no attempt counted.
- Retry behaviour: attempt 1 unaided → attempt 2 after the size-ring cue → attempt 3 with the show-me ring on the correct bin's icon; placing the object there completes the item as solved-with-help. No attempt 4. An item completed after any wrong bin does not count as first-try.
- Finish condition: 10 items. No losing state; no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific (`STRINGS.en`, via `S(key)`): `title` = "Big and Small". No words on the play screen; the words big/small are never displayed (declared out of scope — the two circles are the prompt in every locale).

## Sound
`tone("tap")` on selecting or de-selecting the object; `tone("tap", 4)` when it lands in a bin; `tone("correct")` on a correct sort; `tone("nudge")` on a wrong bin; `tone("finish")` once. Silent under `?sound=off`; no audio files. Nothing is spoken; the rings carry the meaning.

## Testing checklist
- [ ] Works in all 11 languages (Start, All done, Play again, Menu and praise change with the picker; the play screen has no words in any language).
- [ ] Works at narrow width (400-px iframe: lion, belt, the object and both bins fully visible; bins remain separate targets).
- [ ] Keyboard operable (Tab reaches the object then the two bins; Enter selects the object, Enter on a bin places it).
- [ ] Never auto-starts.
- [ ] No losing state (10 wrong bins in a row still reach All done via the show-me ring).
- [ ] The big bin's icon is a large circle and the small bin's a small circle, both in the same colour.
- [ ] A small-drawn elephant placed in the big bin sits inside the big circle with a coral ring of space around it, then slides back.
- [ ] A big-drawn mouse placed in the small bin sticks out all round the small circle inside a coral ring, then slides back.
- [ ] At level 2 the same kind of object appears big and then small on consecutive items.
- [ ] At level 3 the two bins trade sides before each item, taking their icons and dots with them.
- [ ] Each sorted object adds one dot to its bin; no numerals appear anywhere on the play screen.
- [ ] Tapping a bin before the object makes the bin's circle pop and nothing else.
- [ ] The finish screen shows the two bins with the objects each received and no score.
- [ ] With `?sound=off` nothing is audible.
