# 078 — Story Order

## Identity
- Slug: `story-order-cards`
- Subject / topic: Literacy / sequencing — putting the 3-4 picture panels of a short cause-and-effect story in order from first to last
- Age band: `5-6`
- Interaction pattern: `P4` — tap in order (per-tap judgement)
- Estimated build size: ~430 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P4. Content is language-neutral (picture panels only, no words — F-7 "sequencing-as-concept" transfers unchanged); the play screen carries zero instruction text (band rule). Nothing is spoken.

## Learning
- Objective: Taps three (later four) picture panels of a short story in the order they happen, so that each panel lands in the numbered rail slot that shows its place.
- Prerequisites: None beyond tapping. Recognises the numerals 1-4 as a left-to-right order (the rail badges are a cue, not a requirement — the slots also fill left to right).
- Curriculum links: F-22 (retell and sequence short narratives by 8 in all twelve systems; sequencing is the pre-reading strand of comprehension at 5-7), F-129, F-31 row "Read short text; retell/sequence; simple inference" — conservative 8, earliest 6, but the PICTURE-ONLY form is the age-5 pre-academic core in every system (US RL.K.3 / W.K.3 "narrate … in the order in which they occurred"; England Reception ELG "retell … in their own words", Y1 "sequencing sentences"; Germany Klasse 1 "Bildergeschichten ordnen"; France GS "ordonner des images séquentielles"; Netherlands groep 2 "volgorde van gebeurtenissen"; Spain Infantil "secuencias temporales"; Brazil EI03EF06; Sweden förskoleklass "berättelser"; Finland esiopetus).
- Common misconceptions (F-129, F-116), each with this game's response:
  1. **Sequencing by salience — the most exciting panel (the butterfly, the bursting balloon) is tapped first.** Response: the tapped panel nudges; then the cause→effect arrow cue: `ART.arrow` draws from the last panel already on the rail (or from rail slot 1's badge when the rail is empty) to the next EMPTY slot (`ANIM.arrowIn`) and the last rail panel `ANIM.pop`s — "what comes after THIS one?" The item counts as retried.
  2. **Reading the chain backwards (last first, right to left).** Response: the same arrow cue — its head always points to the right, into the next empty slot; the rail badges 1-2-3 and the left-to-right fill make direction visible without words.
  3. **Swapping two middle steps (snowman before snow; cake before mixing).** Response: after the second wrong tap for the same slot the correct next panel gains a soft outline (`ART.hintRing`, `ANIM.showMe`); the child taps it and the story continues (solved-with-help). On completion the arrows between all rail panels draw in turn (`ANIM.arrowIn` ×2-3), so the whole chain is shown once as cause→effect.
  4. **Not seeing that the same character appears in every panel (the chick and the hen are "different animals").** Response: every panel of a story shares the same panel background and the same object anchor (the egg/chick/hen all sit on the same `ART.ground` bar at the same y), so continuity is visual.
  5. **Not knowing what to do first (pre-reader).** Response: discoverable — after 4 s without a tap on a fresh item the correct first panel `ANIM.pulse`s once (an idle cue, never a clock); tapping anything gives an enacted response.

## How it plays
1. **Start screen**: title "Story Order", the snail (`ART.snail`) at (360, 200), Start, picker.
2. **Item 1 (L1: egg → hatching → hen)**: rail of 8 dots (§6) at y = 28; no numeric counter (5-6). Zone A: the story rail — three rail slots (`ART.railSlot`, 150 × 130, dashed) at y = 160, x = 200 / 360 / 520, each with a numeral badge (`ART.railBadge`, circle r 16 with "1", "2", "3" at 20 px) at its top-left corner (−60, −50); the snail at (80, 160) with an arrow-shaped shell direction (it faces right). Zone B: the three panels (`ART.panel`, 150 × 130) at y = 380, x = 200 / 360 / 520, shuffled, each drawing its scene: `ART.picEgg` / `ART.picHatch` / `ART.picHen` at 64 px on a `ART.ground` bar. No caption (band rule: zero words).
3. **Tapping in order**: the child taps a panel.
   - **Correct next panel**: `tone("tap", k)` (k = slot index; the pitch climbs along the rail), the panel glides (`ANIM.glide`) into the next empty rail slot; the slot's stroke turns solid. Tapping the LAST-placed rail panel returns it to its platform spot (undo, free); earlier rail panels are locked.
   - **Wrong panel**: `ANIM.nudge`, `tone("nudge")`; then the arrow cue (Learning 1): `ART.arrow` from the last rail panel (or from slot 1's badge) to the next empty slot for 1200 ms (`ANIM.arrowIn`, then fades), the last rail panel `ANIM.pop`s. Panels disabled during the cue.
   - **Second wrong tap for the same slot**: the cue again, then `ART.hintRing` on the correct next panel (`ANIM.showMe`) until it is tapped; solved-with-help.
   - **All slots filled** (only possible in the right order): the arrows between the rail panels draw left to right (`ANIM.arrowIn`, 300 ms apart), `tone("correct")`, praise pop (every second completed story and the eighth), the snail `ANIM.crawl` (slides 40 px right and back); rail dot fills; next story after 900 ms (`ANIM.appear`).
4. **Items 2-8**: L1 three-panel stories with an obvious growth/weather chain; L2 three-panel stories whose panels differ more subtly (size, position, an added sun); L3 four-panel stories (rail slots 128 × 118 at x = 150 / 290 / 430 / 570; panels the same size at y = 380 in the same four columns).
5. **Finish**: `t("all_done")` (360, 110); the snail (360, 200) `ANIM.celebrate`; the summary = the last completed story's panels in order at y = 400 (three or four small panels, `ART.miniPanel` 100 × 86, with `ART.arrow` between them) — the child's own finished chain, no score; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 4-5 minutes.

## Art registry
```js
const ART = {
  snail:     { kind: "emoji", value: "🐌", size: 80 },                     // mascot (it faces right in most fonts)
  railSlot:  { kind: "shape", shape: "roundRect", w: 150, h: 130, fill: "surface2", stroke: "line", strokeWidth: 2, radius: 14 },   // dashed (lineDash [8,6]) while empty
  railBadge: { kind: "shape", shape: "circle", r: 16, fill: "structure" },      // numeral 20 px display, color bg
  panel:     { kind: "shape", shape: "roundRect", w: 150, h: 130, fill: "surface", stroke: "structure", strokeWidth: 3, radius: 14 },
  miniPanel: { kind: "shape", shape: "roundRect", w: 100, h: 86, fill: "surface", stroke: "structure", strokeWidth: 2, radius: 10 },
  ground:    { kind: "shape", shape: "roundRect", w: 110, h: 10, fill: "structureSoft", radius: 5 },   // the shared floor inside every panel, at panel (0, +44)
  cocoon:    { kind: "shape", shape: "ellipse", w: 40, h: 60, fill: "structureSoft", stroke: "structure", strokeWidth: 3 },
  arrow:     { kind: "shape", shape: "polygon", points: [[-40,-6],[10,-6],[10,-16],[40,0],[10,16],[10,6],[-40,6]], fill: "accent" },   // 80 × 32, points right
  hintRing:  { kind: "shape", shape: "roundRect", w: 162, h: 142, stroke: "structure", strokeWidth: 4, radius: 18 },
  dotEmpty:  { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:   { kind: "shape", shape: "circle", r: 8, fill: "structure" },
  // story pictures (English gloss in the comment; each is one unambiguous object or weather state)
  picEgg:      { kind: "emoji", value: "🥚", size: 64 },   // egg
  picHatch:    { kind: "emoji", value: "🐣", size: 64 },   // hatching chick
  picChick:    { kind: "emoji", value: "🐥", size: 64 },   // chick
  picHen:      { kind: "emoji", value: "🐔", size: 64 },   // hen
  picSeed:     { kind: "emoji", value: "🌰", size: 64 },   // seed (chestnut)
  picSprout:   { kind: "emoji", value: "🌱", size: 64 },   // seedling
  picPlant:    { kind: "emoji", value: "🌿", size: 64 },   // leafy plant
  picFlower:   { kind: "emoji", value: "🌻", size: 64 },   // sunflower
  picTree:     { kind: "emoji", value: "🌳", size: 64 },   // tree
  picBug:      { kind: "emoji", value: "🐛", size: 64 },   // caterpillar
  picLeaf:     { kind: "emoji", value: "🍃", size: 48 },   // leaf
  picButterfly:{ kind: "emoji", value: "🦋", size: 64 },   // butterfly
  picCloud:    { kind: "emoji", value: "☁️", size: 64 },   // cloud
  picRain:     { kind: "emoji", value: "🌧️", size: 64 },   // rain cloud
  picSunRain:  { kind: "emoji", value: "🌦️", size: 64 },   // sun behind rain cloud
  picRainbow:  { kind: "emoji", value: "🌈", size: 64 },   // rainbow
  picSnowCloud:{ kind: "emoji", value: "🌨️", size: 64 },   // snow cloud
  picSnowman:  { kind: "emoji", value: "⛄", size: 64 },   // snowman
  picSun:      { kind: "emoji", value: "☀️", size: 48 },   // sun
  picDrop:     { kind: "emoji", value: "💧", size: 48 },   // water drop (puddle)
  picBalloon:  { kind: "emoji", value: "🎈", size: 64 },   // balloon (drawn at 32 / 72 px in the balloon story)
  picBurst:    { kind: "emoji", value: "💥", size: 64 },   // burst
  picBowl:     { kind: "emoji", value: "🥣", size: 64 },   // mixing bowl
  picMilk:     { kind: "emoji", value: "🥛", size: 48 },   // milk
  picCake:     { kind: "emoji", value: "🎂", size: 64 },   // cake
  picSlice:    { kind: "emoji", value: "🍰", size: 64 },   // slice of cake
  picIceCream: { kind: "emoji", value: "🍦", size: 64 },   // ice cream
  picSunrise:  { kind: "emoji", value: "🌅", size: 64 },   // sunrise
  picMoon:     { kind: "emoji", value: "🌙", size: 64 },   // moon
  picRocket:   { kind: "emoji", value: "🚀", size: 56 },   // rocket
  picBeach:    { kind: "emoji", value: "🏖️", size: 64 },   // beach
  picCastle:   { kind: "emoji", value: "🏰", size: 64 },   // castle (sandcastle)
  picWave:     { kind: "emoji", value: "🌊", size: 64 }    // wave
};
```
All emoji are Unicode 9 or older; no fallbacks needed. Panels compose these at the offsets given in Content.

## Animation registry
```js
const ANIM = {
  glide:     { duration: 260, ease: "Sine.InOut", trigger: "panel to a rail slot / back to its platform spot (x,y at call)" },
  nudge:     { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "wrong panel" },
  arrowIn:   { alpha: 1, x: "+=12", duration: 300, ease: "Sine.Out", trigger: "arrow from alpha 0, sliding 12 px in its pointing direction; cue arrows fade out (alpha 0, 300 ms) after 1200 ms; completion arrows stay" },
  pop:       { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "the last rail panel during the arrow cue" },
  pulse:     { scale: 1.06, duration: 350, ease: "Sine.InOut", yoyo: true, trigger: "the correct first panel after 4 s idle on a fresh item (once)" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "hintRing on the correct next panel (from alpha 0.2)" },
  crawl:     { x: "+=40", duration: 500, ease: "Sine.InOut", yoyo: true, trigger: "snail on story completion" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "new story panels and slots (from alpha 0, scale 0.6)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish snail" }
};
```

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]            ○ ○ ○ ○ ○ ○ ○ ○  rail y=28 (no counter)      │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │  snail     (1)          (2)          (3)     badges           │
      │ (80,160) ┌───────┐   ┌───────┐   ┌───────┐   slots y=160      │  zone A
      │          │       │   │       │   │       │   x=200/360/520    │
      │          └───────┘   └───────┘   └───────┘   (150×130)        │
260   ├──────────────────────────────────────────────────────────────┤
      │          ┌───────┐   ┌───────┐   ┌───────┐   panels y=380     │
      │          │  hen  │   │  egg  │   │ hatch │   (150×130)        │  zone B
      │          └───────┘   └───────┘   └───────┘   shuffled         │
480   ├──────────────────────────────────────────────────────────────┤
      │                                                              │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Four-panel stories: slots and panels 128 × 118 at x = 150 / 290 / 430 / 570 (gap 12). Fixed layout, FIT scaling. Arrows are drawn centred between neighbouring slots at y = 160 (cue arrow: from the last rail panel's right edge to the next slot's left edge).

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 8 × `ART.dotEmpty` (x = 283 + i × 22) → `ART.dotFull`. No numeric counter (5-6).
- Rail slots: `makeTile` with `ART.railSlot` tokens (dashed while empty, solid `structure` stroke when filled); `ART.railBadge` at each slot's (−60, −50) with its numeral in `THEME.colour.bg` at 20 px.
- Panels: `makeTile` with `ART.panel` tokens; inside each, `ART.ground` at (0, +44) and the story pictures at the offsets in Content (default: one picture centred at (0, 0); two pictures at (−28, 0) and (+28, 0); a small extra at (+40, −34)).
- `ART.arrow` between slots; `ART.hintRing` behind a panel; `ART.snail` at (80, 160).
- Tap floors: panels 128-150 × 118-130 (≥ 80, 5-6 floor); gaps ≥ 12. Rail slots are focusable only when they hold a panel (for undo).
- Keyboard: Tab walks the platform panels left to right, then the filled rail slots; Enter taps. During a cue (≤ 1.5 s) panels are `setEnabled(false)`.

## Content
Language-neutral (pictures only). A story = an ordered list of panels; a panel = a list of `[ART key, dx, dy, size]` drawn inside the panel. Size is the ART size unless given.

- **L1** (three panels, growth/weather chains):
  1. Egg: [`ART.picEgg`] → [`ART.picHatch`] → [`ART.picHen`]
  2. Seed: [`ART.picSprout`] → [`ART.picPlant`] → [`ART.picFlower`]
  3. Rain: [`ART.picCloud`] → [`ART.picRain`] → [`ART.picRainbow`]
  4. Caterpillar: [`ART.picBug` (−20, 0), `ART.picLeaf` (+30, +10)] → [`ART.cocoon` (0, 0), `ART.picLeaf` (+30, +10)] → [`ART.picButterfly`]
- **L2** (three panels, subtler differences — size, position, an added element):
  5. Snowman: [`ART.picSnowCloud`] → [`ART.picSnowman`] → [`ART.picSun` (+40, −34), `ART.picSnowman` (−10, +6) at size 48, `ART.picDrop` (+34, +30)]
  6. Balloon: [`ART.picBalloon` at size 32] → [`ART.picBalloon` at size 72] → [`ART.picBurst`]
  7. Cake: [`ART.picBowl`] → [`ART.picCake`] → [`ART.picSlice`]
  8. Ice cream: [`ART.picIceCream`] → [`ART.picSun` (+40, −34), `ART.picIceCream` (−10, +4)] → [`ART.picSun` (+40, −34), `ART.picDrop` (−10, +20)]
  9. Day: [`ART.picSunrise`] → [`ART.picSun` at size 64] → [`ART.picMoon`]
  10. Rocket: [`ART.picRocket` (0, +24)] → [`ART.picRocket` (0, −4)] → [`ART.picRocket` (−20, −30), `ART.picMoon` (+30, −20) at size 48]
  11. Sandcastle: [`ART.picBeach`] → [`ART.picCastle`] → [`ART.picWave`]
- **L3** (four panels):
  12. Egg 4: [`ART.picEgg`] → [`ART.picHatch`] → [`ART.picChick`] → [`ART.picHen`]
  13. Seed 4: [`ART.picSeed`] → [`ART.picSprout`] → [`ART.picPlant`] → [`ART.picTree`]
  14. Rain 4: [`ART.picCloud`] → [`ART.picRain`] → [`ART.picSunRain`] → [`ART.picRainbow`]
  15. Snowman 4: [`ART.picSnowCloud`] → [`ART.picSnowman`] → [`ART.picSun` (+40, −34), `ART.picSnowman` (−10, +6) at size 48] → [`ART.picSun` (+40, −34), `ART.picDrop` (−10, +20)]
  16. Cake 4: [`ART.picEgg` (−26, 0) at size 48, `ART.picMilk` (+26, 0)] → [`ART.picBowl`] → [`ART.picCake`] → [`ART.picSlice`]
  17. Ice cream 4: [`ART.picIceCream`] → [`ART.picSun` (+40, −34), `ART.picIceCream` (−10, +4)] → [`ART.picSun` (+40, −34), `ART.picIceCream` (−10, +4) at size 48, `ART.picDrop` (+20, +30)] → [`ART.picSun` (+40, −34), `ART.picDrop` (−10, +20)]

Locale note: the snow stories show melting, never snow as a season cue (F-135); the stories carry no holiday, text or people. Play list: 8 stories per Rules, shuffled within level, no story repeats (a 3-panel story and its 4-panel version count as the same story and never both appear).

## Rules
- Item count: 8.
- Difficulty progression: 2 consecutive stories completed without a wrong tap → next level (cap L3).
- Adaptation: a story with a wrong tap, or wrong first-try on 2 consecutive stories → next story one level down (floor L1).
- What happens on a correct answer: each correct panel glides to its slot with `tone("tap", k)`; on the last panel the arrows draw between the rail panels, `tone("correct")`, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"] on every second clean story and on the eighth, snail `ANIM.crawl`, rail dot, next story after 900 ms.
- What happens on a wrong answer:
  - Most exciting panel first (salience): nudge + the arrow cue from slot 1's badge into slot 1, 1200 ms.
  - Backwards order (last panel first, or a later panel mid-rail): nudge + the arrow cue from the last rail panel to the next empty slot; the last rail panel pops.
  - Middle swap: the same arrow cue; on the second wrong tap for that slot the correct next panel gains `ART.hintRing`.
  - Idle 4 s on a fresh story: the correct first panel `ANIM.pulse`s once (discoverability, not an error).
- Retry behaviour: per slot: attempt 1 → attempt 2 after the arrow cue → the ringed panel (solved-with-help). Undo of the last placed panel is always free.
- Finish condition: 8 stories. No losing state, no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Story Order". No words on the play screen; the rail badges are numerals.

## Sound
`tone("tap", k)` when the k-th slot fills (pitch climbs along the rail); `tone("nudge")` on a wrong panel; `tone("correct")` on a completed story; `tone("finish")` once. Silent under `?sound=off`. Nothing is spoken; the stories are pictures only.

## Testing checklist
- [ ] Works in all 11 languages (Start, All done, Play again, Menu and praise change; the play screen has no words at all).
- [ ] Works at narrow width (400-px iframe: four slots and four panels fully visible and separate).
- [ ] Keyboard operable (Tab across the panels then the filled slots; Enter places / undoes).
- [ ] Never auto-starts.
- [ ] No losing state (any number of wrong taps still ends with every panel on the rail; the hint ring always names the next panel).
- [ ] Tapping the hen first for the egg story nudges it and draws a coral arrow into slot 1 for about a second.
- [ ] Tapping the correct panels in order fills slots 1, 2, 3 left to right with rising tones; arrows then appear between them.
- [ ] Tapping the last placed rail panel returns it to the bottom row; earlier ones stay.
- [ ] After two wrong taps for the same slot the right panel gains a pulsing outline.
- [ ] Leaving a fresh story untouched for a few seconds makes the first panel pulse once.
- [ ] Two clean stories in a row bring a four-panel story; a wrong tap brings a three-panel story next.
- [ ] Every panel of a story shows the same floor bar; the snowman story ends with the sun and a puddle.
- [ ] The finish screen shows the last story's panels in order with arrows and no score.
- [ ] With `?sound=off` nothing is audible.
