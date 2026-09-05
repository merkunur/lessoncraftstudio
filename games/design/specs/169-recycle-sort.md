# 169 — Recycle Sort

## Identity
- Slug: `recycle-sort`
- Subject / topic: Science / materials — paper, metal, glass and plastic told apart by what the object is MADE of, not by what the object is (the same bottle, cup, spoon or bag appears in different materials)
- Age band: `6-8`
- Interaction pattern: `P8` — sort into bins (tap the object, then tap a bin); 2, then 3, then 4 bins
- Estimated build size: ~480 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P8. Science scope per F-218 / A-11: naming a material from its look and feel (bends, dents, see-through, shiny); no recycling systems, no environmental message. **Bin colours are NEVER the cue**: recycling-bin colour codes differ by country (yellow / blue / green mean different things in de, fr, es, nl, se …), so all four bins share the same tokens and are told apart only by a drawn material icon and their position.

## Learning
- Objective: Sorts pictured objects into paper, metal, glass and plastic bins by the material each is made of, including the same object shown in two or three different materials (a glass bottle and a plastic bottle; a paper cup, a plastic cup and a metal cup; a paper bag and a plastic bag).
- Prerequisites: Recognises everyday objects from pictures; has handled paper, metal, glass and plastic things. Bins carry icons; the shared counter is the only text. Nothing is spoken.
- Curriculum links: F-23 (everyday materials sorted by observable property — 11 of 12 systems; FI at 9+), F-31 row "Materials by property" (conservative 8, earliest 5 → 6-8), F-136 (materials misconceptions), F-30, F-218, F-5. US 2-PS1-1 "classify materials by observable properties"; England Y1 "distinguish between an object and the material from which it is made; wood, plastic, glass, metal, water, rock"; Germany Sachunterricht Klasse 1-2 "Stoffe und ihre Eigenschaften; Müll trennen"; France CP-CE1 "les matériaux; recyclage"; Netherlands groep 3-4 "materialen"; Spain 1º ciclo "materiales y sus propiedades"; Brazil EF02CI01 (materiais e suas propriedades); Sweden åk 1-3 "material och ämnen i vardagen"; Denmark natur/teknologi 1-2 "materialer".
- Common misconceptions (F-136), each with this game's response:
  1. **Object confused with material — "a bottle is glass", "a spoon is metal", "a bag is plastic" whatever it is made of.** Response: L3 shows the SAME silhouette in two or three materials with different surface finishes (`ART.finishPaper` lines, `ART.finishPlastic` dots, `ART.finishGlass` see-through with a shine, `ART.finishMetal` rivets and a streak). A wrong bin glides the object back, the material swatch (`ART.swatchCard` carrying that finish, large) appears beside it and the object does its material's tell (`ANIM.flutter` / `ANIM.squash` / `ANIM.shine` / `ANIM.ring`); the correct bin's icon pulses.
  2. **"Shiny means metal" (a glass jar or bottle goes to the metal bin).** Response: the glass tell is `ANIM.shine` on an object drawn STROKE-ONLY — the belt shows THROUGH it — while metal objects are solid; the swatch shows the see-through finish.
  3. **"Thin and soft means paper" (a plastic bag goes to the paper bin).** Response: the plastic bag's tell is `ANIM.squash` (it springs back) whereas the paper bag `ANIM.flutter`s and creases (`ART.creaseLine` appears on it); the swatch shows the dot finish vs the line finish.
  4. **"All containers are plastic" (a paper cup and a metal can go to the plastic bin).** Response: the same-object cups at L3; the paper cup flutters, the metal cup rings; the swatch and pulse point to the right bin.

## How it plays
1. **Start screen**: title "Recycle Sort", the raccoon (`ART.raccoon`) at (360, 200), Start, picker.
2. **Item 1 (L1)**: rail of 12 dots (§6) at y = 28; `t("question_x_of_y")` at (360, 48), 18 px `THEME.colour.inkSoft`. Zone A: a conveyor belt (`ART.belt`, a rounded bar across zone A at y = 190) with the raccoon at its left end (80, 160); the first object — the newspaper (`ART.newspaper`) — slides in from the right (`ANIM.slideIn`) to the centre (360, 150) as a `makeTile` 120 × 120 (transparent fill; the picture drawn inside). Zone B: two bins (`ART.bin`, 200 × 120) at y = 390, x = 230 and x = 490: one carries `ART.iconPaper` (a sheet with lines) on its front, the other `ART.iconMetal` (a can with rivets); each has a count sub-label `ART.binCount` "0" at (0, +40). The left-to-right order of the four materials is decided once per session at random and never changes; bins not yet in play are absent and the present ones are centred. No caption.
3. **Sorting**: tap the object (it lifts, `ANIM.lift`, `tone("tap")`), then tap a bin. The object glides (`ANIM.glide`) into the bin.
   - **Correct bin**: the bin's count goes up by one, `ANIM.pop` on the bin, `tone("correct")`; every third correct item (and the twelfth) gets a praise pop; the rail dot fills; the next object slides in after 400 ms.
   - **Wrong bin**: the object glides back to the centre, `tone("nudge")`; then the cue: `ART.swatchCard` with the object's material finish `ANIM.appear`s at (200, 150) and the object plays its tell (Rules); the correct bin's icon `ANIM.pulse`s; ≈ 1.8 s with the tile disabled; then attempt 2.
   - **Second wrong bin**: the cue again, then the correct bin gains the show-me ring (`ART.showRing`, `ANIM.showMe`); placing the object there completes the item as solved-with-help.
   - Tapping a bin with no object selected: the bin's icon does `ANIM.pop` (a harmless preview); nothing else.
4. **Items 2-12**: per Content/Rules. L1 = paper and metal, two bins, obvious objects. L2 = the glass bin `ANIM.binsShift`s in (three bins, 180 × 110, x = 150 / 360 / 570) and glass objects join the stream. L3 = the plastic bin shifts in (four bins, 150 × 110, x = 105 / 275 / 445 / 615) and the stream is the same-object sets. Once a bin has appeared it stays for the rest of the session.
5. **A full worked session**: item 1 newspaper → paper ✓ · item 2 can → metal ✓ · item 3 cardboard box → metal ✗: the box glides back, a lined swatch appears beside it and the box bends and creases, the paper bin's icon pulses; paper ✓ (retried) · item 4 key → metal ✓ · item 5 envelope → paper ✓ · item 6 spanner → metal ✓ → step up · item 7 (L2, three bins) glass jar → metal ✗ → a see-through swatch appears, a light streak sweeps across the jar and the belt shows through it · glass ✓ · item 8 (L2) bolt → metal ✓ · item 9 (L2) glass bottle → glass ✓ · item 10 (L2) sheet of paper → paper ✓ → step up · item 11 (L3, four bins) plastic bag → paper ✗ → a dotted swatch appears, the bag squashes and springs back · plastic ✓ · item 12 (L3) paper cup → plastic ✗ → lined swatch, the cup flutters · paper ✓ → Finish.
6. **Finish**: `t("all_done")` (360, 110); the raccoon (360, 200) `ANIM.celebrate`; the bins in play at y = 400 with their final counts and the objects each received drawn as a row of 32 px copies above it (y = 320, 40 px apart, centred on the bin) — the visual summary; `t("question_x_of_y")` at (360, 470) with n = first-try items, total 12; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 5-6 minutes.

## Art registry
```js
const ART = {
  raccoon:    { kind: "emoji", value: "🦝", size: 80, fallback: "🐻" },         // Unicode 11 → bear
  belt:       { kind: "shape", shape: "roundRect", w: 600, h: 24, fill: "surface2", stroke: "line", strokeWidth: 2, radius: 12 },
  // obvious-material objects (emoji)
  newspaper:  { kind: "emoji", value: "📰", size: 84 },
  cardboard:  { kind: "emoji", value: "📦", size: 84 },
  envelope:   { kind: "emoji", value: "✉️", size: 84 },
  sheet:      { kind: "emoji", value: "📄", size: 84 },
  tickets:    { kind: "emoji", value: "🎟️", size: 84 },                         // Unicode 7
  can:        { kind: "emoji", value: "🥫", size: 84 },                          // Unicode 10
  spanner:    { kind: "emoji", value: "🔧", size: 84 },
  key:        { kind: "emoji", value: "🔑", size: 84 },
  bolt:       { kind: "emoji", value: "🔩", size: 84 },
  paperclip:  { kind: "emoji", value: "📎", size: 84 },
  cutlery:    { kind: "emoji", value: "🍴", size: 84 },
  bell:       { kind: "emoji", value: "🔔", size: 84 },
  gear:       { kind: "emoji", value: "⚙️", size: 84 },
  // drawn silhouettes (filled/stroked per material; a finish overlay carries the material)
  bottle:     { kind: "shape", shape: "polygon", points: [[-12,-44],[12,-44],[12,-28],[24,-14],[24,44],[-24,44],[-24,-14],[-12,-28]], fill: "surface2", stroke: "ink", strokeWidth: 3 },
  jar:        { kind: "shape", shape: "roundRect", w: 56, h: 70, fill: "surface2", stroke: "ink", strokeWidth: 3, radius: 10 },   // ART.lid on top
  lid:        { kind: "shape", shape: "rect", w: 60, h: 12, fill: "inkSoft" },
  cup:        { kind: "shape", shape: "polygon", points: [[-28,-36],[28,-36],[22,36],[-22,36]], fill: "surface2", stroke: "ink", strokeWidth: 3 },
  spoon:      { kind: "shape", shape: "ellipse", w: 26, h: 40, fill: "surface2", stroke: "ink", strokeWidth: 3 },       // bowl; ART.spoonHandle below it
  spoonHandle:{ kind: "shape", shape: "roundRect", w: 10, h: 50, fill: "surface2", stroke: "ink", strokeWidth: 3, radius: 5 },
  bag:        { kind: "shape", shape: "polygon", points: [[-30,-20],[30,-20],[34,40],[-34,40]], fill: "surface2", stroke: "ink", strokeWidth: 3 },   // ART.bagHandle above
  bagHandle:  { kind: "shape", shape: "arc", r: 16, stroke: "ink", strokeWidth: 3 },
  // material finishes (overlays on a silhouette; also the swatch and bin-icon patterns)
  finishPaper:   { kind: "shape", shape: "line", w: 36, stroke: "inkSoft", strokeWidth: 2 },                            // three horizontal lines, 10 px apart
  finishPlastic: { kind: "shape", shape: "circle", r: 3, fill: "inkSoft" },                                             // three dots in a triangle, 14 px apart
  finishGlass:   { kind: "shape", shape: "line", w: 40, stroke: "structure", strokeWidth: 4 },                          // one diagonal shine; the silhouette is drawn with NO fill (see-through)
  finishMetal:   { kind: "shape", shape: "circle", r: 4, fill: "ink", stroke: "surface", strokeWidth: 1 },              // two rivets, plus one short ART.streak
  streak:        { kind: "shape", shape: "line", w: 24, stroke: "surface", strokeWidth: 3 },
  creaseLine:    { kind: "shape", shape: "line", w: 30, stroke: "ink", strokeWidth: 2 },                                // appears across a paper object when it flutters
  // fills per material (the silhouette's fill token is swapped by material; glass = no fill)
  fillPaper:   { kind: "shape", shape: "rect", w: 1, h: 1, fill: "surface2" },
  fillPlastic: { kind: "shape", shape: "rect", w: 1, h: 1, fill: "structureSoft" },
  fillMetal:   { kind: "shape", shape: "rect", w: 1, h: 1, fill: "inkSoft" },
  // cue
  swatchCard: { kind: "shape", shape: "roundRect", w: 84, h: 84, fill: "surface", stroke: "structure", strokeWidth: 3, radius: 12 },   // holds a large finish pattern
  // bins and icons (all four bins share tokens; only the icon differs)
  bin:        { kind: "shape", shape: "roundRect", w: 200, h: 120, fill: "surface", stroke: "line", strokeWidth: 2, radius: 14 },
  iconPaper:  { kind: "shape", shape: "rect", w: 34, h: 44, fill: "surface2", stroke: "structure", strokeWidth: 3 },   // with three finishPaper lines inside
  iconPlastic:{ kind: "shape", shape: "polygon", points: [[-8,-24],[8,-24],[8,-14],[16,-6],[16,24],[-16,24],[-16,-6],[-8,-14]], fill: "structureSoft", stroke: "structure", strokeWidth: 3 },   // bottle with three finishPlastic dots
  iconGlass:  { kind: "shape", shape: "roundRect", w: 34, h: 44, stroke: "structure", strokeWidth: 3, radius: 8 },     // stroke only, one finishGlass shine inside
  iconMetal:  { kind: "shape", shape: "roundRect", w: 34, h: 44, fill: "inkSoft", stroke: "structure", strokeWidth: 3, radius: 6 },   // can with two finishMetal rivets
  binCount:   { kind: "text",  value: "0", size: 22, font: "display", color: "inkSoft" },
  showRing:   { kind: "shape", shape: "roundRect", w: 212, h: 132, stroke: "structure", strokeWidth: 4, radius: 18 },
  dotEmpty:   { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:    { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
Every emoji names one object unambiguously in English (the key is the intended word); the raccoon carries a fallback. The silhouettes exist so that ONE shape can be shown in several materials, which no emoji set allows. Colour-blind safety: materials are carried by the finish PATTERN (lines / dots / shine-and-see-through / rivets) and by the tell animation, never by fill colour alone; the four bins are identical apart from their icon and position.

## Animation registry
```js
const ANIM = {
  slideIn:   { x: 360, duration: 320, ease: "Sine.Out", trigger: "new object from x = 760 to the belt centre" },
  lift:      { y: "-=8", scale: 1.06, duration: 120, ease: "Sine.Out", trigger: "object selected" },
  glide:     { duration: 260, ease: "Sine.InOut", trigger: "object to bin / back to centre (x,y set at call)" },
  pop:       { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "bin receives a correct object; bin icon preview tap" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "swatchCard at (200,150) (from alpha 0, scale 0.6); it fades after the tell" },
  flutter:   { angle: 10, duration: 160, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "PAPER tell: the object bends side to side; a creaseLine appears across it at the second bend" },
  squash:    { scaleY: 0.78, duration: 180, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "PLASTIC tell: the object squashes and springs back" },
  shine:     { x: "+=60", alpha: 0, duration: 500, ease: "Sine.Out", trigger: "GLASS tell: a copy of finishGlass sweeps across the object (from alpha 1, x −30); the object's fill is already absent so the belt shows through" },
  ring:      { angle: 6, duration: 70, ease: "Sine.InOut", yoyo: true, repeat: 4, trigger: "METAL tell: a quick small wobble with a high ping tone; the streak on the object brightens" },
  pulse:     { scale: 1.15, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "the correct bin's icon after the tell" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "showRing around the correct bin (from alpha 0.2)" },
  binsShift: { duration: 400, ease: "Sine.InOut", trigger: "bins move to their new x and shrink when a bin joins at L2 (3 bins, 180 × 110) or L3 (4 bins, 150 × 110); x and scale set at call" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish raccoon" }
};
```

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]     ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28  "1 of 12" y=48  │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │ raccoon(80,160)  [swatch (200,150)]  [ object (360,150) ]  →  │  zone A
      │              ═══════════ belt y=190 ═══════════              │
260   ├──────────────────────────────────────────────────────────────┤
      │      ┌─────────────┐              ┌─────────────┐  bins y=390 │
      │      │  (paper)    │              │  (metal)    │  x=230/490  │  zone B
      │      │      0      │              │      0      │  (200×120)  │
      │      └─────────────┘              └─────────────┘             │
480   ├──────────────────────────────────────────────────────────────┤
      │                                                              │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Three bins (L2): 180 × 110 at x = 150 / 360 / 570. Four bins (L3): 150 × 110 at x = 105 / 275 / 445 / 615 (gap 20). Fixed layout, FIT scaling.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 12 × `ART.dotEmpty` at y = 28 (x = 239 + i × 22) → `ART.dotFull`; `t("question_x_of_y")` at (360, 48).
- `ART.raccoon` (80, 160); `ART.belt` centred (390, 190).
- The object: a `makeTile` 120 × 120 at (360, 150) with transparent fill and no stroke (fill and stroke passed as `THEME.colour.bg`); the picture is a child of the tile container: an emoji at size 84, or a silhouette (`ART.bottle` / `ART.jar` + `ART.lid` at (0, −41) / `ART.cup` / `ART.spoon` at (0, −20) + `ART.spoonHandle` at (0, 24) / `ART.bag` + `ART.bagHandle` at (0, −24)) drawn with the material's fill token (`ART.fillPaper` / `ART.fillPlastic` / `ART.fillMetal`'s fill; glass = no fill) and its finish overlay centred on it: `ART.finishPaper` × 3 at y = −12 / 0 / +12; `ART.finishPlastic` × 3 at (−8, −8), (8, −8), (0, 6); `ART.finishGlass` once from (−16, 16) to (16, −16); `ART.finishMetal` × 2 at (−10, 8) and (10, 8) with `ART.streak` at (0, −14). Selected look: `ANIM.lift` plus the library selected outline.
- Bins: `makeTile` with `ART.bin` tokens at the level's positions; the bin's icon at (0, −16) — `ART.iconPaper` with three `ART.finishPaper` lines (scaled 0.6) inside; `ART.iconPlastic` with three `ART.finishPlastic` dots; `ART.iconGlass` with one `ART.finishGlass` shine (scaled 0.5); `ART.iconMetal` with two `ART.finishMetal` rivets; `ART.binCount` at (0, +40).
- Cue: `ART.swatchCard` at (200, 150) with the finish pattern drawn at 1.6 × inside it (glass: the card is drawn stroke-only with the shine); `ART.creaseLine` across a paper object during `ANIM.flutter`; `ART.showRing` around the correct bin (scaled to the bin size + 12).
- Tap floors: object tile 120, bins ≥ 150 × 110 (≥ 56). Gap between bins ≥ 20.
- Tab order: the object tile, then the bins left to right.
- While a cue plays (≈ 1.8 s) the object tile and all bins are `setEnabled(false)`.

## Content
Language-neutral (pictures only; the only text is the shared counter). Each item = (picture; material; tell). Materials: P = paper, M = metal, G = glass, L = plastic. Tells: P → `ANIM.flutter` (+ `ART.creaseLine`), M → `ANIM.ring`, G → `ANIM.shine`, L → `ANIM.squash`. A silhouette item is written (silhouette · material).

- **L1** (paper and metal; obvious emoji objects): (`ART.newspaper`; P) · (`ART.cardboard`; P) · (`ART.envelope`; P) · (`ART.sheet`; P) · (`ART.tickets`; P) · (`ART.can`; M) · (`ART.spanner`; M) · (`ART.key`; M) · (`ART.bolt`; M) · (`ART.paperclip`; M) · (`ART.cutlery`; M) · (`ART.bell`; M)
- **L2** (glass joins; glass objects are drawn see-through): (`ART.jar` · G) · (`ART.bottle` · G) · (`ART.cup` · G) · (`ART.gear`; M) · (`ART.can`; M) · (`ART.sheet`; P) · (`ART.cardboard`; P) · (`ART.spoon` · M) · (`ART.bottle` · G) · (`ART.envelope`; P)
- **L3** (plastic joins; the SAME silhouette in two or three materials, never back to back): (`ART.bottle` · G) · (`ART.bottle` · L) · (`ART.cup` · P) · (`ART.cup` · L) · (`ART.cup` · M) · (`ART.spoon` · M) · (`ART.spoon` · L) · (`ART.bag` · P) · (`ART.bag` · L) · (`ART.jar` · G) · (`ART.jar` · L) · (`ART.can`; M)

Play list of 12 per Rules (shuffle within level; levels in order; the first two items of a session are always one L1 paper object and one L1 metal object so success starts high — F-40); no (picture, material) pair repeats within a session; no more than two consecutive items for the same bin; bins join at their fixed session position and never leave.

## Rules
- Item count: 12.
- Difficulty progression: 3 consecutive first-try correct → next level (cap L3); the level's new bin `ANIM.binsShift`s in at the step-up.
- Adaptation: a wrong bin, or wrong first-try on 2 consecutive items → next item one level down (floor L1); bins already in play stay (an eased item simply comes from an easier list).
- What happens on a correct answer: object glides into the bin, bin `ANIM.pop`, count +1, `tone("correct")`; praise pop (rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"]) on every third correct item and on the twelfth; rail dot fills; next object slides in after 400 ms.
- What happens on a wrong answer (each begins with the object gliding back and `tone("nudge")`):
  - Sorted by object, not material (a plastic bottle to glass; a paper cup to plastic; a metal spoon to plastic): `ART.swatchCard` with the object's finish `ANIM.appear`s and the object plays its material's tell; the correct bin's icon `ANIM.pulse`s.
  - "Shiny = metal" (a glass jar or bottle to metal): the see-through swatch and `ANIM.shine`; the belt is visible through the object.
  - "Thin and soft = paper" (a plastic bag to paper): the dotted swatch and `ANIM.squash`.
  - "All containers are plastic" (a paper cup or a metal can to plastic): the lined swatch + `ANIM.flutter` with `ART.creaseLine`, or the rivet swatch + `ANIM.ring`.
  - Any other wrong bin: the swatch and tell for the object's material; the correct bin's icon pulses.
- Retry behaviour: attempt 1 → attempt 2 after the cue → attempt 3 with `ART.showRing` on the correct bin; placing the object there completes it as solved-with-help (no praise pop). No attempt 4.
- Finish condition: 12 items. No losing state, no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("question_x_of_y")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Recycle Sort". No other text on the play screen (bin counts are numerals).

## Sound
`tone("tap")` on selecting an object; `tone("correct")` on a correct bin; `tone("nudge")` on a wrong bin; during a tell: paper `tone("tap", 2)`, plastic `tone("tap", 5)`, glass `tone("tap", 9)`, metal `tone("tap", 12)` (the pitch rises with hardness — the sound is a companion to the visible tell, never the only cue); `tone("finish")` once. Silent under `?sound=off`. Nothing is spoken.

## Testing checklist
- [ ] Works in all 11 languages ("Question 1 of 12", All done, Play again, Menu, praise change with the picker; nothing else is text).
- [ ] Works at narrow width (400-px iframe: belt, object, swatch and four bins fully visible with gaps).
- [ ] Keyboard operable (Tab: the object, then the bins left to right; Enter selects the object / drops it in a bin).
- [ ] Never auto-starts.
- [ ] No losing state (wrong bins never end the session; the show-me ring always leads to completion).
- [ ] The first two objects of a session are one paper thing and one metal thing.
- [ ] Putting the cardboard box in the metal bin makes it glide back, a lined swatch appears beside it, the box bends side to side and a crease shows, and the paper bin's icon pulses.
- [ ] Glass objects are drawn without a fill so the belt shows through them; putting the jar in the metal bin sweeps a light streak across it.
- [ ] Putting the plastic bag in the paper bin makes it squash and spring back with a dotted swatch.
- [ ] The glass bin appears when the second level is reached and the plastic bin at the third; bins slide apart to make room and never leave or swap places.
- [ ] At the third level the same bottle appears once see-through and once with dots, and they go to different bins.
- [ ] All bins have identical colours; they differ only by the drawn icon and its pattern (lines / dots / shine / rivets).
- [ ] Bin counts go up only on correct sorts; the finish screen shows the objects each bin received and the first-try count.
- [ ] If the raccoon glyph is missing on the device, a bear appears instead.
- [ ] With `?sound=off` nothing is audible; with sound on, the metal tell pings higher than the paper tell.
