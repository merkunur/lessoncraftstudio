# 174 — Loud or Soft

## Identity
- Slug: `sound-loud-soft`
- Subject / topic: Science / sounds by loudness (observation) — sorting pictured sound sources into loud and soft
- Age band: `5-6`
- Interaction pattern: `P8` — sort into bins (tap the item, then tap a bin)
- Estimated build size: ~440 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md` §1-§14. Pattern contract: `catalogue/PATTERNS.md` P8 (two bins, one item at a time). Science scope per F-218: loudness as something a child has heard, sorted from pictures. **No audio exists and none is simulated** — the loudness of each source is shown by the size of its drawn sound waves; the game's own tones are the usual chrome tones and never stand for the pictured sound.

## Learning
- Objective: Sorts pictured sound sources (a drum, a mouse, a fire engine, a leaf …) into a loud bin and a soft bin according to the loudness of the sound each one makes.
- Prerequisites: Has heard, or seen pictures of, everyday things that make sounds. The bins carry wave icons (big waves / a small wave), so nothing needs reading. Nothing is spoken.
- Curriculum links: F-23 (sound as an observable phenomenon before 9 in EN, US, NL; everywhere else it sits inside the observational world-knowledge core — "the senses", hearing), F-30 (science integrated into HSU / Questionner le monde / ympäristöoppi / Conocimiento del Medio / natur/teknologi / naturfag at 5-8; no causation here), F-218 (observational core only), F-31 row "Body parts; senses" — conservative 7-8, earliest 4 → 5-6 for a sort by what the ear notices (US 1-PS4-1 "vibrating materials can make sound" is 6-7; England Y1 "identify … the part of the body associated with each sense" and Y4 sound; Germany HSU Klasse 1-2 "Hören"; France GS "les cinq sens"; Finland esiopetus "aistit"); F-5 (no game supply — the game covers the curriculum).
- Common misconceptions — sound has no row of its own in the F-1xx catalogue; the errors below are the documented transfer errors from neighbouring rows, each with this game's response:
  1. **Bigger thing = louder thing (F-103 "bigger object = more").** Response: L3 pairs a small loud source (a firecracker) with a big soft one (a tree rustling); when a small loud source is put in the soft bin, it glides back and its waves draw BIG (`ART.waveBig` × 3, `ANIM.waveOut`) — the waves, not the picture, are the size that matters.
  2. **Judging the object, not the sound it makes (F-136 object/property confusion — "a hammer is small and hard", "a cat is soft to touch").** Response: the cue is always the drawn waves of that source (big for a hammer, tiny for a purring cat); the wave icon on the correct bin then pulses; the child sorts by what the thing DOES, not what it is.
  3. **"Soft" taken as "makes no sound" or "is soft to touch" (a feather put in the loud bin "because it doesn't sound").** Response: very quiet sources (feather, butterfly, falling leaf) belong in the soft bin by design; their cue draws one faint small wave (`ART.waveSmall`, `ANIM.waveOutSmall`) — a very small sound is still a soft sound.
  4. **Sorting by liking / fear ("the lion is scary so it is loud" — right for the wrong reason; "the drum is fun so it is soft").** Response: the varied set (a friendly fire engine is loud, a scary thunder cloud is loud, a cute mouse is soft, a cute drum is loud) keeps the affect cue useless; the waves are the only consistent rule.

## How it plays
1. **Start screen**: title "Loud or Soft", the rabbit (`ART.rabbit`, big ears) at (360, 200), Start, picker (hidden under `?embed=1`).
2. **Item 1 (L1)**: rail of 10 dots (§6) at y = 28. Zone A: a conveyor strip (`ART.belt`, a rounded bar across zone A at y = 170) with the rabbit at the left end (80, 150); the first item — the drum (`ART.drum`) — slides in from the right (`ANIM.slideIn`) to the centre (360, 170) as a `makeTile` 120 × 120 (transparent fill; the emoji drawn inside at size 84). Zone B: two bins (`ART.bin`, 200 × 120) at y = 390, x = 230 and x = 490. The loud bin's front carries `ART.iconLoud` (three nested big arcs beside a small dot); the soft bin's front carries `ART.iconSoft` (one small arc beside the same dot). Each bin has a count sub-label `ART.binCount` "0" at (0, +40). Which bin is left and which is right is decided once per session at random and never changes during the session. No caption.
3. **Sorting**: tap the item (it lifts, `ANIM.lift`, `tone("tap")`), then tap a bin. The item glides (`ANIM.glide`) into the bin.
   - **Correct bin**: the bin's count goes up by one, `ANIM.pop` on the bin, `tone("correct")`; every third correct item (and the tenth) gets a praise pop; the rail dot fills; the next item slides in after 400 ms.
   - **Wrong bin**: the item glides back to the centre, `tone("nudge")`; then the **wave cue** for that item's class plays for ≈ 1.4 s with the item tile disabled: a loud source draws three big arcs expanding from its right side (`ART.waveBig`, `ANIM.waveOut`, 200 ms apart); a soft source draws one small faint arc (`ART.waveSmall`, `ANIM.waveOutSmall`); then the correct bin's icon `ANIM.pulse`s. Attempt 2.
   - **Second wrong bin**: the cue again, then the correct bin gains the show-me ring (`ART.showRing`, `ANIM.showMe`); placing the item there completes it as solved-with-help.
   - Tapping a bin with no item selected: the bin's icon does `ANIM.pop` (a harmless preview); nothing else.
4. **A full worked session (a child who sorts by size)**: item 1 drum → loud ✓ · item 2 mouse → soft ✓ · item 3 fire engine → loud ✓ → step up · item 4 (L2) cat → loud ✗ (a tiny arc draws by the cat; the soft bin's icon pulses) → soft ✓ (retried) · item 5 (L1) feather → soft ✓ · item 6 (L1) plane → loud ✓ · item 7 (L1) leaf → soft ✓ → step up · item 8 (L2) thunder → loud ✓ · item 9 (L2) rain → soft ✓ · item 10 (L2) rooster → loud ✓ → Finish.
5. **Finish**: `t("all_done")` (360, 110); the rabbit (360, 200) `ANIM.celebrate`; the two bins at y = 400 (x = 230 / 490) with their final counts and the items each received drawn above it as a row of 36 px copies (y = 320, 44 px apart, centred on the bin) — the visual summary; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 4-5 minutes.

## Art registry
```js
const ART = {
  rabbit:      { kind: "emoji", value: "🐰", size: 80 },
  belt:        { kind: "shape", shape: "roundRect", w: 600, h: 24, fill: "surface2", stroke: "line", strokeWidth: 2, radius: 12 },
  // loud sources
  drum:        { kind: "emoji", value: "🥁", size: 84 },                         // Unicode 9
  lion:        { kind: "emoji", value: "🦁", size: 84 },                         // Unicode 8
  plane:       { kind: "emoji", value: "✈️", size: 84 },
  fireEngine:  { kind: "emoji", value: "🚒", size: 84 },
  thunder:     { kind: "emoji", value: "⛈️", size: 84 },
  trumpet:     { kind: "emoji", value: "🎺", size: 84 },
  rooster:     { kind: "emoji", value: "🐓", size: 84 },
  hammer:      { kind: "emoji", value: "🔨", size: 84 },
  fireworks:   { kind: "emoji", value: "🎆", size: 84 },
  train:       { kind: "emoji", value: "🚂", size: 84 },
  elephant:    { kind: "emoji", value: "🐘", size: 84 },
  firecracker: { kind: "emoji", value: "🧨", size: 84 },                         // Unicode 11
  // soft sources
  mouse:       { kind: "emoji", value: "🐭", size: 84 },
  cat:         { kind: "emoji", value: "🐈", size: 84 },
  leaf:        { kind: "emoji", value: "🍃", size: 84 },
  bee:         { kind: "emoji", value: "🐝", size: 84 },
  rain:        { kind: "emoji", value: "🌧️", size: 84 },
  clock:       { kind: "emoji", value: "🕰️", size: 84 },                        // Unicode 7
  butterfly:   { kind: "emoji", value: "🦋", size: 84 },                         // Unicode 9
  feather:     { kind: "emoji", value: "🪶", size: 84, fallback: "🌾" },         // Unicode 13 → a grass stalk
  bird:        { kind: "emoji", value: "🐦", size: 84 },
  tree:        { kind: "emoji", value: "🌳", size: 84 },
  // bins and icons
  bin:         { kind: "shape", shape: "roundRect", w: 200, h: 120, fill: "surface", stroke: "line", strokeWidth: 2, radius: 14 },
  iconDot:     { kind: "shape", shape: "circle", r: 6, fill: "ink" },            // the "source" dot at the left of both icons
  iconLoud:    { kind: "shape", shape: "arc", r: 16, stroke: "ink", strokeWidth: 4 },   // drawn three times at r 16, 28, 40, from −60° to 60°, to the right of iconDot
  iconSoft:    { kind: "shape", shape: "arc", r: 12, stroke: "ink", strokeWidth: 3 },   // drawn once, from −45° to 45°
  binCount:    { kind: "text",  value: "0", size: 22, font: "display", color: "inkSoft" },
  // wave cues
  waveBig:     { kind: "shape", shape: "arc", r: 40, stroke: "structure", strokeWidth: 6 },  // three copies expand to r 40, 70, 100 from the item's right edge, −60° to 60°
  waveSmall:   { kind: "shape", shape: "arc", r: 14, stroke: "inkSoft", strokeWidth: 2 },    // one copy, −40° to 40°, 60% alpha
  showRing:    { kind: "shape", shape: "roundRect", w: 212, h: 132, stroke: "structure", strokeWidth: 4, radius: 18 },
  dotEmpty:    { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:     { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
Colour-blind safety: the two bins share fill and stroke; they differ by icon geometry (three big arcs vs one small arc) and by position, never by colour. The loud cue and the soft cue differ in arc count, radius AND stroke width. The rabbit is a listener, not a person.

## Animation registry
```js
const ANIM = {
  slideIn:      { x: 360, duration: 320, ease: "Sine.Out", trigger: "new item from x = 760 to the belt centre" },
  lift:         { y: "-=8", scale: 1.06, duration: 120, ease: "Sine.Out", trigger: "item selected" },
  glide:        { duration: 260, ease: "Sine.InOut", trigger: "item to bin / back to centre (x,y set at call)" },
  pop:          { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "bin receives a correct item; bin icon preview tap" },
  waveOut:      { scale: 2.5, alpha: 0, duration: 700, ease: "Sine.Out", trigger: "each waveBig copy grows from scale 1 / alpha 1 and fades, 200 ms apart (loud cue)" },
  waveOutSmall: { scale: 1.4, alpha: 0, duration: 500, ease: "Sine.Out", trigger: "the single waveSmall grows a little and fades (soft cue)" },
  pulse:        { scale: 1.15, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "the correct bin's icon after the wave cue" },
  showMe:       { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "showRing around the correct bin (from alpha 0.2)" },
  celebrate:    { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish rabbit" }
};
```
The wave cue changes scale and alpha smoothly; nothing blinks.

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]          ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28                 │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │ rabbit(80,150) ═══════════ belt y=170 ══════════  item enters→│  zone A
      │                        [ item (360,170) ] )))  waves to the right│
260   ├──────────────────────────────────────────────────────────────┤
      │      ┌─────────────┐              ┌─────────────┐  bins y=390  │
      │      │  • )))      │              │    • )      │  x=230/490   │  zone B
      │      │      0      │              │      0       │  (200×120)   │
      │      └─────────────┘              └─────────────┘              │
480   ├──────────────────────────────────────────────────────────────┤
      │                                                              │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
(The bin fronts in the diagram stand for `ART.iconDot` + `ART.iconLoud` ×3 and `ART.iconDot` + `ART.iconSoft`.) Fixed layout, FIT scaling.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 10 × `ART.dotEmpty` at y = 28 (x = 261 + i × 22) → `ART.dotFull`.
- `ART.rabbit` (80, 150); `ART.belt` centred (390, 170).
- The item: a `makeTile` 120 × 120 at (360, 170) with transparent fill and no stroke (fill and stroke passed as `THEME.colour.bg`); the item emoji is a child of the tile container at (0, 0). Selected look: `ANIM.lift` plus the library selected outline (`THEME.colour.structure`, 3 px).
- Bins: `makeTile` 200 × 120 (`ART.bin` tokens) at (230, 390) and (490, 390). Loud bin front: `ART.iconDot` at (−50, −14), `ART.iconLoud` arcs centred at (−50, −14) with r 16 / 28 / 40. Soft bin front: `ART.iconDot` at (−20, −14), `ART.iconSoft` centred at (−20, −14). `ART.binCount` at (0, +40) on both.
- Wave cue: `ART.waveBig` copies centred at the item's (+40, 0) (its right edge), drawn from −60° to 60°; `ART.waveSmall` centred at (+40, 0), from −40° to 40°, alpha 0.6.
- `ART.showRing` around the correct bin.
- Tap floors: item tile 120, bins 200 × 120 (≥ 80). Gap between bins 60.
- Tab order: the item tile, then the left bin, then the right bin.
- While a cue plays (≈ 1.4 s) the item tile and both bins are `setEnabled(false)`.
- Text budget (5-6): zero words on the play screen; the bin counts are numerals.

## Content
Language-neutral (pictures only). Each item = (ART key; class). Classes: L = loud, S = soft.

- **L1** (clear extremes): (`ART.drum`; L) · (`ART.lion`; L) · (`ART.plane`; L) · (`ART.fireEngine`; L) · (`ART.mouse`; S) · (`ART.leaf`; S) · (`ART.butterfly`; S) · (`ART.feather`; S)
- **L2** (a paired weather contrast; sources whose picture is cute or scary): (`ART.thunder`; L) · (`ART.trumpet`; L) · (`ART.rooster`; L) · (`ART.fireworks`; L) · (`ART.rain`; S) · (`ART.cat`; S) · (`ART.clock`; S) · (`ART.bird`; S)
- **L3** (size traps — small and loud, big and soft): (`ART.firecracker`; L) · (`ART.hammer`; L) · (`ART.train`; L) · (`ART.elephant`; L) · (`ART.bee`; S) · (`ART.tree`; S) · (`ART.mouse`; S) · (`ART.feather`; S)

Play list of 10 per Rules (shuffle within level; levels in order); the first two items of a session are always one L1 loud source and one L1 soft source, in either order (F-40); no item repeats within a session (`ART.mouse` and `ART.feather` appear in two pools but are drawn at most once); no more than two consecutive items of the same class; the bin sides are fixed for the whole session.

## Rules
- Item count: 10.
- Difficulty progression: 3 consecutive first-try correct → next level (cap L3). (Three, not two: items take ~15 s.)
- Adaptation: a wrong bin, or wrong first-try on 2 consecutive items → next item one level down (floor L1).
- What happens on a correct answer: item glides into the bin, bin `ANIM.pop`, count +1, `tone("correct")`; praise pop (rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"]) on every third correct item and on the tenth; rail dot fills; next item after 400 ms.
- What happens on a wrong answer (each begins with the item gliding back and `tone("nudge")`):
  - A loud source in the soft bin (small-thing bias: firecracker, rooster, hammer; or affect: "the drum is fun"): three `ART.waveBig` arcs expand from the item (`ANIM.waveOut`), then the loud bin's icon `ANIM.pulse`s.
  - A soft source in the loud bin (big-thing bias: tree, elephant-sized thinking; or "soft means silent": feather, butterfly): one `ART.waveSmall` arc grows a little and fades (`ANIM.waveOutSmall`), then the soft bin's icon pulses.
  - The two cues are distinct in arc count, size and stroke; the same item always gets the same cue.
- Retry behaviour: attempt 1 → attempt 2 after the cue → attempt 3 with `ART.showRing` on the correct bin; placing the item there completes it as solved-with-help (no praise pop). No attempt 4.
- Finish condition: 10 items. No losing state; no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Loud or Soft". No text on the play screen.

## Sound
`tone("tap")` on selecting an item; `tone("correct")` on a correct bin; `tone("nudge")` on a wrong bin; `tone("finish")` once. The wave cue is SILENT on purpose — the game never pretends to play the pictured sound (no audio files, and a chrome tone must not stand for a drum or a mouse). Silent under `?sound=off`. Nothing is spoken.

## Testing checklist
- [ ] Works in all 11 languages (All done, Play again, Menu and praise change with the picker; the play screen has no words).
- [ ] Works at narrow width (400-px iframe: belt, item, both bins and the wave cue fully visible).
- [ ] Keyboard operable (Tab: the item, then the two bins; Enter selects the item / drops it in a bin).
- [ ] Never auto-starts.
- [ ] No losing state (wrong bins never end the session; the show-me ring always leads to completion).
- [ ] The first two items are one clearly loud and one clearly soft source.
- [ ] Putting the mouse in the loud bin sends it back and draws one small faint arc beside it, then the soft bin's icon pulses.
- [ ] Putting the drum in the soft bin sends it back and draws three big expanding arcs, then the loud bin's icon pulses.
- [ ] At level 3 the firecracker (small) is loud and the tree (big) is soft; each gets the matching cue when mis-sorted.
- [ ] No sound plays during the wave cue even with sound on; the only tones are tap, correct, nudge and finish.
- [ ] Bin sides do not swap during a session; the bins have identical colours and differ only by their icons.
- [ ] Bin counts go up only on correct sorts; the finish screen shows the items each bin received and no score.
- [ ] If the feather emoji is missing on the device, a grass stalk appears instead.
- [ ] With `?sound=off` nothing is audible.
