# 098 — Five Senses

## Identity
- Slug: `five-senses-sort`
- Subject / topic: Science / the five senses — sorting everyday things by the sense you mainly use to notice them (see, hear, smell, taste, touch)
- Age band: `6-8`
- Interaction pattern: `P8` — sort into bins (tap the object, then tap a bin labelled by a sense organ)
- Estimated build size: ~480 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P8. Science scope per F-23 / F-218: the sense organs as external, observable body parts (eyes, ears, nose, tongue, hands); nothing about nerves or the brain.

## Learning
- Objective: Sorts pictured everyday objects into the bin of the sense mainly used to notice them — a bell to the ear, a rainbow to the eyes, a rose to the nose, a lemon to the tongue, an ice cube to the hand.
- Prerequisites: Knows the external body parts (game 097); recognises common objects from pictures. Reads nothing.
- Curriculum links: F-23 (human body parts and the senses in all 12 systems at 5-8), F-30, F-218, F-5. US K-LS1 / 1-LS1-1 (body parts used to sense); England Y1 "which part of the body is associated with each sense"; Germany Sachunterricht Klasse 1-2 "die fünf Sinne"; France CP "les cinq sens"; Spain Conocimiento del Medio 1º "los sentidos"; Brazil EF01CI (o corpo humano — os sentidos); Sweden åk 1-3 "människans sinnen"; Finland ympäristöoppi 1-2 "aistit".
- Common misconceptions (F-23; sorting errors observed in sense units), each with this game's response:
  1. **"You notice everything with your eyes" (the bell, the rose and the lemon all go to the eye bin because you can see them).** Response: from L1 the eye bin is present and is the most tempting bin; an object put there wrongly glides back and performs the thing it is FOR — the bell rings (`ANIM.ring`, with `ART.soundWave` arcs spreading from it), the rose gives off `ART.scentWave`s (`ANIM.waft`), the lemon puckers (`ANIM.pucker`, a squash) — then the correct organ's badge (`ART.organBadge`, a copy of the bin icon) appears beside the object and the correct bin `ANIM.pulse`s. Only things you notice by LOOKING (a rainbow, a picture, the moon) stay in the eye bin.
  2. **Smell and taste confused (the rose to the tongue; the lemon to the nose).** Response: the two cues are distinct — smell is waves rising from the object toward a nose badge (`ANIM.waft`), taste is the tongue badge gliding to touch the object (`ANIM.lick`) — and L2 puts the nose and tongue bins side by side so the distinction is met.
  3. **Touch treated as "anything you can hold" (the bell, the rose to the hand).** Response: the touch bin is introduced last (L3) and its objects are ones you notice by FEEL — cold ice, a soft teddy, a prickly cactus, a squashy sponge; a wrong touch pair shows the hand badge glide to the object and the object `ANIM.shiver` (ice) / `ANIM.squash` (sponge, teddy) / `ANIM.prick` (cactus: the hand badge bounces off).
  4. **Sorting by object category (all food to one bin) rather than by sense.** Response: L3 mixes a lemon (taste) with garlic (smell) and ice (touch) in the same round, so "food" is never a working rule; the cue always names the sense by organ badge and action.

## How it plays
1. **Start screen**: title "Five Senses", the dog (`ART.dog`) at (360, 200), Start, picker.
2. **Item 1 (L1)**: rail of 12 dots (§6) at y = 28; `t("question_x_of_y")` at (360, 48), 18 px `THEME.colour.inkSoft`. Zone A: a conveyor strip (`ART.belt` at y = 170) with the dog at the left end (80, 150); the first object — `ART.bell` — slides in from the right (`ANIM.slideIn`) to the centre (360, 170) as a `makeTile` 120 × 120 (transparent fill; emoji inside). Zone B: three bins (`ART.bin`, 160 × 116) at y = 390, x = 180 / 360 / 540, each with a sense-organ icon on its front (`ART.iconEye` / `ART.iconEar` / `ART.iconTongue`) at (0, −16) and a count sub-label `ART.binCount` "0" at (0, +40). Bin order shuffled per round. Zone C: the feedback line (22 px `THEME.colour.inkSoft`) at (360, 500), empty.
3. **Sorting**: tap the object (it lifts, `ANIM.lift`, `tone("tap")`), then tap a bin. The object glides (`ANIM.glide`) into the bin.
   - **Correct bin**: count +1, `ANIM.pop` on the bin, `tone("correct")`; every third correct item (and the twelfth) gets a praise pop; rail dot fills; next object slides in after 400 ms.
   - **Wrong bin**: the object glides back to the centre, `tone("nudge")`; then the enacted cue for the object's sense (Rules) — the object's own action, the `ART.organBadge` with the correct organ at the object's top-right (`ANIM.badgeIn`), the correct bin's icon `ANIM.pulse`; `t("look_carefully")` on the feedback line. Attempt 2.
   - **Second wrong bin**: the cue again, then the correct bin gains the show-me ring (`ART.showRing`, `ANIM.showMe`); placing the object there completes the item as solved-with-help.
   - Tapping a bin with no object selected: the bin's icon `ANIM.pop`s (preview); nothing else.
4. **A full worked session (a child who sends everything to the eye)**: item 1 bell → eye ✗: back; the bell swings and sound arcs spread; the ear badge appears; the ear bin pulses → ear ✓ · item 2 rainbow → eye ✓ · item 3 lemon → tongue ✓ · item 4 drum → ear ✓ → step up · item 5 (L2, four bins) rose → eye ✗: scent waves rise to a nose badge; nose bin pulses → nose ✓ · item 6 (L1) picture → eye ✓ · item 7 (L1) lollipop → tongue ✓ → step up · item 8 (L2) soap → nose ✓ · item 9 (L2) trumpet → ear ✓ → step up · item 10 (L3, five bins) ice → tongue ✗: the hand badge glides to the ice and the ice shivers; hand bin pulses → hand ✓ · item 11 (L2) cake → tongue ✓ · item 12 (L2) moon → eye ✓ → Finish.
5. **Finish**: `t("all_done")` (360, 110); the dog (360, 200) `ANIM.celebrate`; the five bins in a row at y = 410 (x = 96 / 228 / 360 / 492 / 624, 120 × 100) showing their final counts with the objects each received drawn as 28 px copies in a row above (y = 340, 34 px apart) — the visual summary; `t("question_x_of_y")` with n = first-try items, total 12, at (360, 470); `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 5-6 minutes.

## Art registry
```js
const ART = {
  dog:        { kind: "emoji", value: "🐶", size: 80 },
  belt:       { kind: "shape", shape: "roundRect", w: 600, h: 24, fill: "surface2", stroke: "line", strokeWidth: 2, radius: 12 },
  // see
  rainbow:    { kind: "emoji", value: "🌈", size: 84 },
  picture:    { kind: "emoji", value: "🖼️", size: 84 },                          // Unicode 7 (framed picture)
  moon:       { kind: "emoji", value: "🌙", size: 84 },
  telescope:  { kind: "emoji", value: "🔭", size: 84 },
  trafficLight:{ kind: "emoji", value: "🚦", size: 84 },
  // hear
  bell:       { kind: "emoji", value: "🔔", size: 84 },
  drum:       { kind: "emoji", value: "🥁", size: 84 },                          // Unicode 9
  trumpet:    { kind: "emoji", value: "🎺", size: 84 },
  megaphone:  { kind: "emoji", value: "📣", size: 84 },
  headphones: { kind: "emoji", value: "🎧", size: 84 },
  // smell
  rose:       { kind: "emoji", value: "🌹", size: 84 },
  soap:       { kind: "emoji", value: "🧼", size: 84 },                          // Unicode 11
  garlic:     { kind: "emoji", value: "🧄", size: 84 },                          // Unicode 11
  hibiscus:   { kind: "emoji", value: "🌺", size: 84 },
  onion:      { kind: "emoji", value: "🧅", size: 84 },                          // Unicode 11
  // taste
  lemon:      { kind: "emoji", value: "🍋", size: 84 },
  lollipop:   { kind: "emoji", value: "🍭", size: 84 },
  cake:       { kind: "emoji", value: "🍰", size: 84 },
  chilli:     { kind: "emoji", value: "🌶️", size: 84 },                          // Unicode 7
  honey:      { kind: "emoji", value: "🍯", size: 84 },
  // touch
  ice:        { kind: "emoji", value: "🧊", size: 84 },                          // Unicode 12
  teddy:      { kind: "emoji", value: "🧸", size: 84 },                          // Unicode 11
  yarn:       { kind: "emoji", value: "🧶", size: 84 },                          // Unicode 11
  cactus:     { kind: "emoji", value: "🌵", size: 84 },
  sponge:     { kind: "emoji", value: "🧽", size: 84 },                          // Unicode 11
  // bins and organ icons (the sense organ = the bin label)
  bin:        { kind: "shape", shape: "roundRect", w: 160, h: 116, fill: "surface", stroke: "line", strokeWidth: 2, radius: 14 },
  iconEye:    { kind: "emoji", value: "👁️", size: 44, fallback: "👀" },          // Unicode 7 (text-default glyph); pair-of-eyes fallback
  iconEar:    { kind: "emoji", value: "👂", size: 44 },
  iconNose:   { kind: "emoji", value: "👃", size: 44 },
  iconTongue: { kind: "emoji", value: "👅", size: 44 },
  iconHand:   { kind: "emoji", value: "✋", size: 44 },
  binCount:   { kind: "text",  value: "0", size: 22, font: "display", color: "inkSoft" },
  // cues
  organBadge: { kind: "shape", shape: "circle", r: 26, fill: "surface", stroke: "accent", strokeWidth: 3 },   // holds a copy of the correct organ icon at size 30
  soundWave:  { kind: "shape", shape: "arc", r: 40, stroke: "accent", strokeWidth: 4 },                        // drawn 3× at r 40/56/72, 60° arcs to the object's right
  scentWave:  { kind: "shape", shape: "polygon", points: [[0,20],[6,10],[0,0],[6,-10],[0,-20]], stroke: "accent", strokeWidth: 3 },   // a wavy line; drawn 3× at x −16/0/+16 above the object
  eyeRay:     { kind: "shape", shape: "line", w: 60, stroke: "accent", strokeWidth: 3 },                       // 2 lines from the eye badge to the object's edges
  showRing:   { kind: "shape", shape: "roundRect", w: 172, h: 128, stroke: "structure", strokeWidth: 4, radius: 18 },
  dotEmpty:   { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:    { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
Every object glyph names one everyday thing unambiguously in English (the key is the intended word). `ART.iconEye` is the only glyph with a fallback (its single-eye form is text-default on some platforms; the builder (Claude Code) applies the §4 width test). Colour-blind safety: bins share tokens and differ by organ icon; the badge is coral AND ringed; each sense cue is a different motion, never a colour.

## Animation registry
```js
const ANIM = {
  slideIn:   { x: 360, duration: 320, ease: "Sine.Out", trigger: "new object from x = 760 to the belt centre" },
  lift:      { y: "-=8", scale: 1.06, duration: 120, ease: "Sine.Out", trigger: "object selected" },
  glide:     { duration: 260, ease: "Sine.InOut", trigger: "object to bin / back to centre; the organ badge to the object for touch and taste (x,y at call)" },
  pop:       { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "bin receives a correct object; bin icon preview tap" },
  badgeIn:   { alpha: 1, scale: 1, duration: 220, ease: "Back.Out", trigger: "organBadge at the object's top-right (from alpha 0, scale 0.4)" },
  ring:      { angle: 14, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "a hearing object swings; soundWave arcs appear 150 ms apart" },
  waveOut:   { alpha: 0, scale: 1.3, duration: 500, ease: "Sine.Out", trigger: "each soundWave arc spreads and fades (from alpha 1, scale 1)" },
  waft:      { y: "-=30", alpha: 0, duration: 700, ease: "Sine.Out", trigger: "each scentWave rises from a smell object toward the nose badge (from alpha 1), 200 ms apart" },
  pucker:    { scaleX: 0.8, scaleY: 1.15, duration: 160, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "a taste object squashes as the tongue badge touches it" },
  lick:      { duration: 300, ease: "Sine.InOut", trigger: "the tongue badge glides from the object's top-right to its edge and back (yoyo via a second glide)" },
  gaze:      { alpha: 1, duration: 300, ease: "Sine.Out", yoyo: true, hold: 600, trigger: "two eyeRay lines from the eye badge to the object (from alpha 0), hold, fade" },
  shiver:    { x: "+=4", duration: 60, ease: "Sine.InOut", yoyo: true, repeat: 5, trigger: "ice when the hand badge touches it" },
  squash:    { scaleY: 0.85, duration: 180, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "sponge, teddy, yarn when the hand badge touches them" },
  prick:     { x: "-=30", duration: 120, ease: "Back.Out", yoyo: true, trigger: "the hand badge bounces off the cactus" },
  pulse:     { scale: 1.15, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "the correct bin's icon after the cue" },
  fadeOut:   { alpha: 0, duration: 300, ease: "Sine.In", trigger: "badge and cue shapes at the end of a cue" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "showRing around the correct bin (from alpha 0.2)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish dog" }
};
```

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]        ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28  "1 of 12" y=48│  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │ dog(80,150)  ═══════════ belt y=170 ═══════════   object enters→│  zone A
      │                       [ object (360,170) ]  badge (+50,−40)   │
260   ├──────────────────────────────────────────────────────────────┤
      │   ┌────────┐        ┌────────┐        ┌────────┐  bins y=390  │
      │   │  eye   │        │  ear   │        │ tongue │  x=180/360/  │  zone B
      │   │   0    │        │   0    │        │   0    │  540 (160×116)│
      │   └────────┘        └────────┘        └────────┘              │
480   ├──────────────────────────────────────────────────────────────┤
      │              feedback line (360,500)                          │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
L2 uses four bins at x = 105 / 275 / 445 / 615 (150 × 116, gap 20); L3 five bins at x = 96 / 228 / 360 / 492 / 624 (120 × 116, gap 12). Fixed layout, FIT scaling.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 12 × `ART.dotEmpty` at y = 28 (x = 239 + i × 22) → `ART.dotFull`; `t("question_x_of_y")` at (360, 48).
- `ART.dog` (80, 150); `ART.belt` centred (390, 170).
- The object: a `makeTile` 120 × 120 at (360, 170), transparent (fill and stroke passed as `THEME.colour.bg`), the emoji as a child at (0, 0). Selected look: `ANIM.lift` + the library outline (`THEME.colour.structure`, 3 px).
- Bins: `makeTile` with `ART.bin` tokens at the widths above; the organ icon (`ART.iconEye` / `ART.iconEar` / `ART.iconNose` / `ART.iconTongue` / `ART.iconHand`) centred at (0, −16); `ART.binCount` at (0, +40).
- Cues: `ART.organBadge` at the object's (+50, −40) holding a size-30 copy of the correct organ icon; `ART.soundWave` arcs centred on the object; `ART.scentWave`s above the object at (−16, −50), (0, −50), (+16, −50); `ART.eyeRay` × 2 from the badge to the object's left and right edges; `ART.showRing` around the correct bin.
- Tap floors: object 120, bins 120-160 × 116 (≥ 56). Gaps ≥ 12.
- Tab order: the object, then the bins left to right.
- During a cue (≈ 1.8 s) the object and bins are `setEnabled(false)`.

## Content
Language-neutral (pictures only). Each item = (ART key; sense). Senses: `see`, `hear`, `smell`, `taste`, `touch`. The bins present per level are listed with the level; every item's sense is always among the bins.

- **L1** (three bins: see / hear / taste): (`ART.bell`; hear) · (`ART.rainbow`; see) · (`ART.lemon`; taste) · (`ART.drum`; hear) · (`ART.picture`; see) · (`ART.lollipop`; taste) · (`ART.trumpet`; hear) · (`ART.moon`; see)
- **L2** (four bins: see / hear / smell / taste): (`ART.rose`; smell) · (`ART.soap`; smell) · (`ART.cake`; taste) · (`ART.megaphone`; hear) · (`ART.telescope`; see) · (`ART.hibiscus`; smell) · (`ART.honey`; taste) · (`ART.headphones`; hear) · (`ART.trafficLight`; see)
- **L3** (five bins: all senses; food items span three senses so "food" is never the rule): (`ART.ice`; touch) · (`ART.teddy`; touch) · (`ART.garlic`; smell) · (`ART.chilli`; taste) · (`ART.cactus`; touch) · (`ART.onion`; smell) · (`ART.sponge`; touch) · (`ART.yarn`; touch)

Play list of 12 per Rules (shuffle within level; the first item of a session is always `ART.bell` or `ART.rainbow`); no object repeats within a session; no more than two consecutive items of the same sense; the correct bin is never in the same slot twice running.

## Rules
- Item count: 12.
- Difficulty progression: 2 consecutive first-try correct → next level (cap L3).
- Adaptation: a wrong bin, or wrong first-try on 2 consecutive items → next item one level down (floor L1).
- What happens on a correct answer: object glides into the bin, bin `ANIM.pop`, count +1, `tone("correct")`; praise pop (rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"]) on every third correct item and on the twelfth; rail dot fills; next object after 400 ms.
- What happens on a wrong answer (each begins with the object gliding back and `tone("nudge")`, ends with the correct bin's icon `ANIM.pulse` and `t("look_carefully")`; the `ART.organBadge` shows the correct organ throughout):
  - A hearing object (bell, drum, trumpet, megaphone, headphones) in any other bin — "you see it, so it is for the eyes": the object `ANIM.ring`s and three `ART.soundWave` arcs `ANIM.waveOut` with `tone("tap", 3)`; ear badge.
  - A seeing object (rainbow, picture, moon, telescope, traffic light) in any other bin: eye badge; two `ART.eyeRay`s `ANIM.gaze` from the badge to the object.
  - A smelling object (rose, soap, hibiscus, garlic, onion) in the tongue bin (or any other) — smell/taste confusion: nose badge; three `ART.scentWave`s `ANIM.waft` up toward it.
  - A tasting object (lemon, lollipop, cake, honey, chilli) in the nose bin (or any other): tongue badge `ANIM.lick`s to the object's edge; the object `ANIM.pucker`s.
  - A touching object in any other bin — "anything you hold is touch" reversed: hand badge glides to the object; ice `ANIM.shiver`s, sponge / teddy / yarn `ANIM.squash`, cactus makes the badge `ANIM.prick` away.
- Retry behaviour: attempt 1 → attempt 2 after the cue → attempt 3 with `ART.showRing` on the correct bin; placing the object there completes it as solved-with-help (no praise pop). No attempt 4.
- Finish condition: 12 items. No losing state, no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("question_x_of_y")`, `t("look_carefully")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Five Senses". No other words on the play screen (bin counts are numerals).

## Sound
`tone("tap")` on selecting an object; `tone("correct")` on a correct bin; `tone("nudge")` on a wrong bin; `tone("tap", 3)` with the sound-wave cue (the one cue that IS about sound — the screen shows the arcs as well, so the meaning never depends on hearing it); `tone("finish")` once. Silent under `?sound=off`. Nothing is spoken.

## Testing checklist
- [ ] Works in all 11 languages ("Question 1 of 12", Look carefully, All done, Play again, Menu, praise change with the picker).
- [ ] Works at narrow width (400-px iframe: belt, object and five bins at level 3 fully visible and separate).
- [ ] Keyboard operable (Tab: the object, then the bins left to right; Enter selects / drops).
- [ ] Never auto-starts.
- [ ] No losing state (wrong bins never end the session; the show-me ring always leads to completion).
- [ ] Each bin shows one sense organ (eye, ear, nose, tongue, hand) and a count; no bin shows a word.
- [ ] Putting the bell in the eye bin sends it back, swings it with three spreading arcs, shows an ear badge beside it and pulses the ear bin.
- [ ] Putting the rose in the tongue bin shows wavy lines rising from it to a nose badge; putting the lemon in the nose bin makes a tongue badge dab it and the lemon squash.
- [ ] Putting the ice in the tongue bin makes a hand badge glide to it and the ice shiver; the cactus makes the hand badge bounce away.
- [ ] The first object of a session is always the bell or the rainbow; the touch bin never appears before the third level.
- [ ] Two first-try corrects in a row bring four bins with the nose, then five bins with the hand; a wrong bin brings three bins next.
- [ ] The finish screen shows the five bins with the objects they received and "Question n of 12" where n counts first-try items — no score word.
- [ ] If the single-eye glyph is missing on the device, a pair of eyes appears on the eye bin instead.
- [ ] With `?sound=off` nothing is audible and every cue still shows on screen.
