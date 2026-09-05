# 094 — Animal Features

## Identity
- Slug: `animal-features-sort`
- Subject / topic: Science / classifying animals by an OBSERVABLE feature — feathers, fur, fins, six legs — never by where they live or how they move
- Age band: `6-8`
- Interaction pattern: `P8` — sort into bins (tap the animal, then tap a bin)
- Estimated build size: ~480 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P8. Science scope per F-218 / A-11: observable body features only; the game never names a class (bird, mammal, fish, insect) — the bins ARE the features.

## Learning
- Objective: Sorts pictured animals into bins labelled by a body feature (feathers, fur, fins, six legs), including the animals whose home or movement misleads (a penguin swims but has feathers; a bat flies but has fur; a whale lives in the sea and has fins; a butterfly flies and has six legs).
- Prerequisites: Recognises common animals from pictures; can count to 6 (the leg count is enacted, not required). Reads nothing.
- Curriculum links: F-23 (animal features and common species in all 12 systems at 5-8), F-30, F-218, F-5. US 1-LS1-1 / K-LS1-1 (external parts of animals); England Y1 "identify and name common animals; structure of animals"; Germany Sachunterricht Klasse 1-2 "Tiere und ihre Merkmale"; France CP-CE1 "caractéristiques du vivant"; Spain Conocimiento del Medio 1º ciclo; Brazil EF02CI (características dos animais); Sweden åk 1-3 "djurs egenskaper"; Finland ympäristöoppi 1-2.
- Common misconceptions (F-133), each with this game's response:
  1. **"Anything in the water is a fish" (a penguin, a duck, a whale, a dolphin).** Response: the bins are features, not homes. A penguin put in the fins bin glides back; `ART.featureBadge` (a copy of the correct bin's icon) appears at the penguin's shoulder (`ANIM.badgeIn`) and `ART.legDot`s appear under it one at a time with `tone("tap", k)` — two dots for two legs; then the feathers bin's icon `ANIM.pulse`s. The whale in L3 goes to the FINS bin — that is observably true and the game never claims "fish" — while the penguin and the duck do not; the child learns to look at the body, not the water.
  2. **"Anything that flies is a bird" (a bat, a butterfly, a bee).** Response: a bat put in the feathers bin glides back; the fur icon badge appears and four leg dots count under it; the fur bin pulses. A butterfly put in the feathers bin gets the six-legs badge and six dots counting up with rising tones.
  3. **"Only big land animals are animals" — small creatures (bee, ant, ladybird) are sorted at random.** Response: every insect placed wrongly gets the six-dot count under it, always six, so the rule "six legs" is enacted each time; L1 includes a ladybird and a bee from the start.
  4. **Sorting by size or colour.** Response: item art size is constant (84 px) for a whale and a ladybird alike; bins share fill and stroke and differ only by icon; the feature badge and the leg count are the only cues ever shown.

## How it plays
1. **Start screen**: title "Animal Features", the hedgehog (`ART.hedgehog`) at (360, 200), Start, picker.
2. **Item 1 (L1)**: rail of 12 dots (§6) at y = 28; `t("question_x_of_y")` at (360, 48), 18 px `THEME.colour.inkSoft`. Zone A: a conveyor strip (`ART.belt` at y = 170) with the hedgehog at the left end (80, 150); the first animal — `ART.chicken` — slides in from the right (`ANIM.slideIn`) to the centre (360, 170) as a `makeTile` 120 × 120 (transparent fill; emoji inside). Zone B: three bins (`ART.bin`, 160 × 116) at y = 390, x = 180 / 360 / 540, each with a feature icon on its front (`ART.iconFeather` / `ART.iconFur` / `ART.iconFin` / `ART.iconSixLegs` — three of the four per round, Content) at (0, −16) and a count sub-label `ART.binCount` "0" at (0, +40). Bin order left-to-right shuffled per round. Zone C: the feedback line (22 px `THEME.colour.inkSoft`) at (360, 500), empty.
3. **Sorting**: tap the animal (it lifts, `ANIM.lift`, `tone("tap")`), then tap a bin. The animal glides (`ANIM.glide`) into the bin.
   - **Correct bin**: count +1, `ANIM.pop` on the bin, `tone("correct")`; every third correct item (and the twelfth) gets a praise pop; rail dot fills; next animal slides in after 400 ms.
   - **Wrong bin**: the animal glides back to the centre, `tone("nudge")`; then the enacted cue (Rules): `ART.featureBadge` shows the correct feature icon at the animal's top-right (`ANIM.badgeIn`), the animal's legs are counted as `ART.legDot`s under it (0, 2, 4 or 6 dots, 250 ms apart, `tone("tap", k)`), `ART.legCount` shows the number beside the dots, and the correct bin's icon `ANIM.pulse`s; `t("look_carefully")` on the feedback line. Attempt 2.
   - **Second wrong bin**: the cue again, then the correct bin gains the show-me ring (`ART.showRing`, `ANIM.showMe`); placing the animal there completes the item as solved-with-help.
   - Tapping a bin with no animal selected: the bin's icon `ANIM.pop`s (preview); nothing else.
4. **A full worked session (a child who sorts by where things live)**: item 1 chicken → feathers ✓ · item 2 goldfish → fins ✓ · item 3 ladybird → fur ✗: back, six-legs badge, six dots count "6", six-legs bin pulses; → six legs ✓ · item 4 dog → fur ✓ · item 5 owl → feathers ✓ → step up · item 6 (L2) shark → fins ✓ · item 7 (L2) parrot → feathers ✓ → step up · item 8 (L3) penguin → fins ✗: back, feathers badge, two dots "2", feathers bin pulses; → feathers ✓ → step down · item 9 (L2) ant → six legs ✓ · item 10 (L2) fox → fur ✓ → step up · item 11 (L3) bat → feathers ✗: fur badge, four dots "4"; → fur ✓ · item 12 (L3) whale → fins ✓ → Finish.
5. **Finish**: `t("all_done")` (360, 110); the hedgehog (360, 200) `ANIM.celebrate`; the four bins in a row at y = 410 (x = 120 / 280 / 440 / 600, 140 × 100) showing their final counts, with the animals each bin received drawn as 32 px copies in a row above it (y = 340, 38 px apart) — the visual summary; `t("question_x_of_y")` with n = first-try items, total 12, at (360, 470) in 18 px `THEME.colour.inkSoft`; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 5-6 minutes.

## Art registry
```js
const ART = {
  hedgehog:    { kind: "emoji", value: "🦔", size: 80 },                          // Unicode 11
  belt:        { kind: "shape", shape: "roundRect", w: 600, h: 24, fill: "surface2", stroke: "line", strokeWidth: 2, radius: 12 },
  // feathers (2 legs)
  chicken:     { kind: "emoji", value: "🐔", size: 84 },
  bird:        { kind: "emoji", value: "🐦", size: 84 },
  owl:         { kind: "emoji", value: "🦉", size: 84 },                          // Unicode 9
  duck:        { kind: "emoji", value: "🦆", size: 84 },                          // Unicode 9
  parrot:      { kind: "emoji", value: "🦜", size: 84 },                          // Unicode 11
  eagle:       { kind: "emoji", value: "🦅", size: 84 },                          // Unicode 9
  penguin:     { kind: "emoji", value: "🐧", size: 84 },
  // fur (4 legs)
  dog:         { kind: "emoji", value: "🐶", size: 84 },
  cat:         { kind: "emoji", value: "🐱", size: 84 },
  rabbit:      { kind: "emoji", value: "🐰", size: 84 },
  bear:        { kind: "emoji", value: "🐻", size: 84 },
  fox:         { kind: "emoji", value: "🦊", size: 84 },                          // Unicode 9
  mouse:       { kind: "emoji", value: "🐭", size: 84 },
  koala:       { kind: "emoji", value: "🐨", size: 84 },
  bat:         { kind: "emoji", value: "🦇", size: 84 },                          // Unicode 9
  // fins (0 legs)
  goldfish:    { kind: "emoji", value: "🐟", size: 84 },
  tropicalFish:{ kind: "emoji", value: "🐠", size: 84 },
  shark:       { kind: "emoji", value: "🦈", size: 84 },                          // Unicode 9
  whale:       { kind: "emoji", value: "🐳", size: 84 },
  dolphin:     { kind: "emoji", value: "🐬", size: 84 },
  // six legs
  ladybird:    { kind: "emoji", value: "🐞", size: 84 },
  bee:         { kind: "emoji", value: "🐝", size: 84 },
  ant:         { kind: "emoji", value: "🐜", size: 84 },
  butterfly:   { kind: "emoji", value: "🦋", size: 84 },                          // Unicode 9
  cricket:     { kind: "emoji", value: "🦗", size: 84 },                          // Unicode 10
  // bins and feature icons (shapes — a feature, never an animal)
  bin:         { kind: "shape", shape: "roundRect", w: 160, h: 116, fill: "surface", stroke: "line", strokeWidth: 2, radius: 14 },
  iconFeather: { kind: "shape", shape: "polygon", points: [[0,-26],[14,-10],[12,14],[0,26],[-12,14],[-14,-10]], fill: "structureSoft", stroke: "ink", strokeWidth: 3 },   // a feather: leaf outline + ART.featherSpine down its middle
  featherSpine:{ kind: "shape", shape: "line", w: 48, stroke: "ink", strokeWidth: 3 },                                                                                      // drawn vertical through iconFeather
  iconFur:     { kind: "shape", shape: "circle", r: 16, fill: "structureSoft", stroke: "ink", strokeWidth: 3 },                                                             // a paw pad; ART.furToe drawn 3× above it
  furToe:      { kind: "shape", shape: "circle", r: 6, fill: "ink" },                                                                                                       // at (−16,−22), (0,−26), (16,−22)
  iconFin:     { kind: "shape", shape: "polygon", points: [[-26,16],[4,-26],[26,16]], fill: "structureSoft", stroke: "ink", strokeWidth: 3 },                             // a fin: a leaning triangle
  iconSixLegs: { kind: "shape", shape: "ellipse", w: 36, h: 22, fill: "structureSoft", stroke: "ink", strokeWidth: 3 },                                                     // a body; ART.legLine drawn 6× (3 each side)
  legLine:     { kind: "shape", shape: "line", w: 16, stroke: "ink", strokeWidth: 3 },                                                                                      // at (±24,−10), (±26,0), (±24,10), angled outward
  binCount:    { kind: "text",  value: "0", size: 22, font: "display", color: "inkSoft" },
  // cues
  featureBadge:{ kind: "shape", shape: "circle", r: 26, fill: "surface", stroke: "accent", strokeWidth: 3 },                                                                // holds a copy of the correct bin icon at scale 0.7
  legDot:      { kind: "shape", shape: "circle", r: 7, fill: "accent" },
  legCount:    { kind: "text",  value: "", size: 26, font: "display", color: "accent" },
  showRing:    { kind: "shape", shape: "roundRect", w: 172, h: 128, stroke: "structure", strokeWidth: 4, radius: 18 },
  dotEmpty:    { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:     { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
No emoji newer than Unicode 12; no fallback needed. Every animal glyph names one animal unambiguously in English (the key is the intended word). Bin icons are drawn shapes so that no bin shows an animal — a bin with a bird on it would invite "is it a bird?" instead of "does it have feathers?". Colour-blind safety: bins share tokens and differ by icon geometry; the badge is coral AND ringed; leg dots are counted, not coloured.

## Animation registry
```js
const ANIM = {
  slideIn:   { x: 360, duration: 320, ease: "Sine.Out", trigger: "new animal from x = 760 to the belt centre" },
  lift:      { y: "-=8", scale: 1.06, duration: 120, ease: "Sine.Out", trigger: "animal selected" },
  glide:     { duration: 260, ease: "Sine.InOut", trigger: "animal to bin / back to centre (x,y set at call)" },
  pop:       { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "bin receives a correct animal; bin icon preview tap" },
  badgeIn:   { alpha: 1, scale: 1, duration: 220, ease: "Back.Out", trigger: "featureBadge at the animal's top-right (from alpha 0, scale 0.4)" },
  dotIn:     { alpha: 1, scale: 1, duration: 160, ease: "Back.Out", trigger: "each legDot in turn (from alpha 0, scale 0.4), 250 ms apart" },
  pulse:     { scale: 1.15, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "the correct bin's icon after the leg count" },
  fadeOut:   { alpha: 0, duration: 300, ease: "Sine.In", trigger: "badge, dots and legCount at the end of a cue" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "showRing around the correct bin (from alpha 0.2)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish hedgehog" }
};
```

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]        ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28  "1 of 12" y=48│  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │ hedgehog(80,150) ════════ belt y=170 ═════════   animal enters→│  zone A
      │                       [ animal (360,170) ]  badge (+50,−40)   │
      │                       • • • • • •  legDots y=232   "6"        │
260   ├──────────────────────────────────────────────────────────────┤
      │   ┌────────┐        ┌────────┐        ┌────────┐  bins y=390  │
      │   │feather │        │  paw   │        │  fin   │  x=180/360/  │  zone B
      │   │   0    │        │   0    │        │   0    │  540 (160×116)│
      │   └────────┘        └────────┘        └────────┘              │
480   ├──────────────────────────────────────────────────────────────┤
      │              feedback line (360,500)                          │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
L3 uses four bins at x = 105 / 275 / 445 / 615 (150 × 116, gap 20). Fixed layout, FIT scaling.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 12 × `ART.dotEmpty` at y = 28 (x = 239 + i × 22) → `ART.dotFull`; `t("question_x_of_y")` at (360, 48).
- `ART.hedgehog` (80, 150); `ART.belt` centred (390, 170).
- The animal: a `makeTile` 120 × 120 at (360, 170), transparent (fill and stroke passed as `THEME.colour.bg`), the emoji as a child at (0, 0). Selected look: `ANIM.lift` + the library outline (`THEME.colour.structure`, 3 px).
- Bins: `makeTile` 160 × 116 (`ART.bin` tokens); icon centred at (0, −16): feathers = `ART.iconFeather` + `ART.featherSpine`; fur = `ART.iconFur` + 3 × `ART.furToe`; fins = `ART.iconFin`; six legs = `ART.iconSixLegs` + 6 × `ART.legLine`. `ART.binCount` at (0, +40).
- Cues: `ART.featureBadge` at the animal's (+50, −40) holding a 0.7-scale copy of the correct bin's icon; `ART.legDot`s in a row at y = 232 centred on x = 360, 22 px apart; `ART.legCount` at (360 + 12 + n × 11, 232) beside the last dot (for 0 legs, only `ART.legCount` "0" at (360, 232)); `ART.showRing` around the correct bin.
- Tap floors: animal 120, bins 150-160 × 116 (≥ 56). Gaps ≥ 20.
- Tab order: the animal, then the bins left to right.
- During a cue (badge 220 ms + dots up to 1500 ms + pulse 900 ms + hold 400 ms ≈ 3 s for six legs, ≈ 1.8 s for two) the animal and bins are `setEnabled(false)`.

## Content
Language-neutral (pictures only). Each item = (ART key; feature; legs). Features: `feathers`, `fur`, `fins`, `six`. The bins present in a round are the item's feature plus two (L1, L2) or three (L3) others, listed per item so that the item's feature is always present and the bin set never repeats twice running.

- **L1** (clear cases, three bins): (`ART.chicken`; feathers; 2 · bins feathers/fur/fins) · (`ART.goldfish`; fins; 0 · fins/fur/six) · (`ART.ladybird`; six; 6 · six/feathers/fur) · (`ART.dog`; fur; 4 · fur/fins/feathers) · (`ART.owl`; feathers; 2 · feathers/six/fins) · (`ART.cat`; fur; 4 · fur/six/fins) · (`ART.bee`; six; 6 · six/fur/feathers) · (`ART.tropicalFish`; fins; 0 · fins/feathers/six)
- **L2** (less familiar animals, three bins): (`ART.shark`; fins; 0 · fins/fur/six) · (`ART.parrot`; feathers; 2 · feathers/fur/fins) · (`ART.ant`; six; 6 · six/fins/feathers) · (`ART.fox`; fur; 4 · fur/feathers/six) · (`ART.rabbit`; fur; 4 · fur/fins/feathers) · (`ART.eagle`; feathers; 2 · feathers/six/fur) · (`ART.cricket`; six; 6 · six/fur/fins) · (`ART.mouse`; fur; 4 · fur/six/feathers)
- **L3** (the deliberate traps, four bins): (`ART.penguin`; feathers; 2) · (`ART.bat`; fur; 4) · (`ART.whale`; fins; 0) · (`ART.butterfly`; six; 6) · (`ART.duck`; feathers; 2) · (`ART.dolphin`; fins; 0) · (`ART.koala`; fur; 4) · (`ART.bear`; fur; 4) · (`ART.bird`; feathers; 2)

Play list of 12 per Rules (shuffle within level; the first item of a session is always `ART.chicken` or `ART.dog`); no animal repeats within a session; no more than two consecutive items with the same feature; the correct bin is never in the same slot twice running.

## Rules
- Item count: 12.
- Difficulty progression: 2 consecutive first-try correct → next level (cap L3).
- Adaptation: a wrong bin, or wrong first-try on 2 consecutive items → next item one level down (floor L1).
- What happens on a correct answer: animal glides into the bin, bin `ANIM.pop`, count +1, `tone("correct")`; praise pop (rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"]) on every third correct item and on the twelfth; rail dot fills; next animal after 400 ms.
- What happens on a wrong answer (each begins with the animal gliding back and `tone("nudge")`, then `ART.featureBadge` with the correct icon, the leg count, the correct bin's `ANIM.pulse`, and `t("look_carefully")`):
  - A swimmer with feathers (penguin, duck) put in the fins bin — "in water = fish": feathers badge; two `ART.legDot`s with `tone("tap", 1..2)`; `ART.legCount` "2".
  - A flyer with fur (bat) put in the feathers bin — "flies = bird": fur badge; four dots; "4".
  - An insect (butterfly, bee, ladybird, ant, cricket) put in the feathers or fur bin: six-legs badge; six dots with rising tones; "6".
  - A sea mammal (whale, dolphin) put in the fur bin (the child "knows" it is not a fish): fins badge; no dots; `ART.legCount` "0" — the game sorts by the visible fin, and never claims a class.
  - Any other wrong bin: the same shape of cue with the animal's true feature and leg count.
- Retry behaviour: attempt 1 → attempt 2 after the cue → attempt 3 with `ART.showRing` on the correct bin; placing the animal there completes it as solved-with-help (no praise pop). No attempt 4.
- Finish condition: 12 items. No losing state, no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("question_x_of_y")`, `t("look_carefully")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Animal Features". No other words on the play screen (bin counts and the leg count are numerals).

## Sound
`tone("tap")` on selecting an animal; `tone("correct")` on a correct bin; `tone("nudge")` on a wrong bin; `tone("tap", k)` per leg dot (k = 1 … 6, so six legs climb further than two); `tone("finish")` once. Silent under `?sound=off`. Nothing is spoken.

## Testing checklist
- [ ] Works in all 11 languages ("Question 1 of 12", Look carefully, All done, Play again, Menu, praise change with the picker).
- [ ] Works at narrow width (400-px iframe: belt, animal, four bins at level 3 and the leg-dot row fully visible).
- [ ] Keyboard operable (Tab: the animal, then the bins left to right; Enter selects / drops).
- [ ] Never auto-starts.
- [ ] No losing state (wrong bins never end the session; the show-me ring always leads to completion).
- [ ] No bin shows an animal; each bin shows a drawn feather, paw, fin or six-legged body.
- [ ] Putting the ladybird in the fur bin sends it back, shows the six-legs badge, counts six coral dots under it with rising tones and the number 6, then the six-legs bin pulses.
- [ ] Putting the penguin in the fins bin shows the feathers badge, two dots and the number 2.
- [ ] Putting the whale in the fur bin shows the fins badge and the number 0 with no dots.
- [ ] The first animal of a session is always a chicken or a dog.
- [ ] Bin positions shuffle between items; the correct bin is never in the same place twice running.
- [ ] Two first-try corrects in a row bring rarer animals, then four bins with the penguin, bat, whale and butterfly; a wrong bin brings clear cases next.
- [ ] The finish screen shows the four bins with the animals they received and "Question n of 12" where n counts first-try items — no score word.
- [ ] With `?sound=off` nothing is audible.
