# 190 — Clock Order

## Identity
- Slug: `clock-order`
- Subject / topic: Mathematics / ordering four analogue clock times from earliest to latest through one day, using a sky cue for morning / noon / afternoon / evening / night
- Age band: `8-9`
- Interaction pattern: `P4` — tap in order (per-tap judgement; tapped faces glide onto a day strip)
- Estimated build size: ~500 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P4 (per-tap judgement — an error is caught at once; a tile tapped out of turn nudges and stays). Content is language-neutral (clock faces, numerals, sky cards); no `LOCALE_DATA`. **No spoken time idiom appears anywhere** (F-113: "half seven" is 6:30 in de/nl/sv/da/no/fi and 7:30 in en — this game shows only faces and, on the strip, digital 24-hour labels, which are the same in every locale). Hands obey F-113: the hour hand is SHORT, THICK, ROUNDED and teal; the minute hand is LONG, THIN, ARROW-TIPPED and coral — they differ in length AND shape AND colour.

## Learning
- Objective: Reads four analogue clock faces, each with a sky card saying which part of the day it belongs to, and taps them in order from the earliest time of the day to the latest, placing each on a four-slot day strip.
- Prerequisites: Reads o'clock and half-past times (games 105-106) and, at L3, quarter and five-minute times (games 107-108); knows that the day runs morning → noon → afternoon → evening → night (game 101). Reads 24-hour digital labels (the strip's confirmation only; not required to answer).
- Curriculum links: F-113 (telling time misconceptions: hour hand read as the nearest numeral, minute hand read as the numeral, hands swapped, counter-clockwise reading — and the locale idiom trap), F-28 (clock granularity: whole/half at 6-8 everywhere; quarter / 5-minute at 8 in 7 of 12 systems → this game's L3 is 8-9 content and its L1-L2 rests on the universal tier), F-21 ("the analogue clock at least to whole/half hours" in all twelve), F-31 rows "Calendar days/months; clock to hour/half" (6-8) and "Clock quarter/5-min/minute" (8-9) (US 2.MD.C.7 / 3.MD.A.1; England Y2 "sequence intervals of time", Y3 "tell and write the time … 24-hour clocks"; Germany Klasse 2-3 "Uhrzeiten ordnen, Tagesablauf"; France CE1-CE2 "lecture de l'heure, journée"; Netherlands groep 4-5 "klokkijken, dagindeling"; Spain 2º-3º; Brazil EF02MA18-19; Sweden åk 2-3 "klockan, dygnet"; Finland grade 2-3 "kellonajat, vuorokausi"). F-129 (sequencing by salience rather than time), F-134 (day sequence only — no astronomy causation; the sky card is an observable cue).
- Common misconceptions (F-113, F-129), each with this game's response:
  1. **Hour hand read as the nearest numeral (7:30 read as 8:30, so 7:30 is tapped AFTER 8:00).** Response: the wrong face nudges; on the second wrong tap for the same slot the hour-hand SECTOR shades on both faces in question (`ART.hourSector`, the wedge from the hour mark to the next, `ANIM.sectorIn`): 7:30's hand sits inside the 7 wedge, 8:00's on the 8 line — "still in 7's hour".
  2. **Minute hand read as the numeral (big hand on 6 → "6 o'clock"; big hand on 3 → "3 past").** Response: on error the minute ring (`ART.minuteRing`, 5-marks 5, 10 … 55 around the rim) reveals for 1200 ms on the tapped face with the minute hand's mark highlighted (`ART.minuteDot`) — the big hand points at 30, not at 6.
  3. **Hands swapped (the long hand taken for the hour).** Response: the hands never look alike (length + shape + colour); on error the hour hand `ANIM.pulse`s alone first, then the minute hand, with the sector and ring cues respectively, so each hand is tied to its own cue.
  4. **The sky ignored — 12-hour faces ordered by their numerals only (3:00 pm tapped before 11:00 am because 3 < 11; or 11:00 am and 1:00 pm swapped).** Response: every face carries its sky card; a wrong tap that would be right WITHOUT the sky (the numerals alone are in order) makes the two faces' sky cards `ANIM.pulse` together and `ART.strip`'s sky band glows under the correct slot — the day runs left to right, and a face in the afternoon band cannot come before a face in the morning band whatever its numerals. L3 pairs 11:00 (morning card) with 1:00 (afternoon card) and 6:30 (dawn) with 6:30 (sunset).
  5. **Ordering by salience — the "prettiest" or the first-seen face first (F-129).** Response: per-tap judgement refuses it at once; the faces' positions on the shelf are shuffled and never mirror the answer order; `ART.nextArrow` slides from the last filled slot to the next free slot on every error so the direction of "next" is enacted.
  6. **Undoing: wanting to take a face back.** Response: a placed face is still a tile; tapping it returns it to the shelf (`ANIM.glide` back); no penalty.

## How it plays
1. **Start screen**: title "Clock Order", the rooster (`ART.rooster`) at (360, 200) beside a clock face (`ART.face`) at (460, 200), Start, picker (hidden under `?embed=1`).
2. **Item 1 (L1: 7:00 dawn, 12:00 noon, 4:00 afternoon, 9:00 night)**: rail of 10 dots (§6) at y = 28; `t("question_x_of_y")` at (360, 48), 18 px `THEME.colour.inkSoft`. Zone A: the shelf — four clock tiles (`makeTile` 130 × 150 with `ART.clockTile` tokens) at y = 168, x = 135 / 285 / 435 / 585, in a shuffled order; each tile holds a face (`ART.face`, r 50) with the twelve hour numerals (`ART.hourNumeral`, 13 px, at r 38), the hour hand (`ART.hourHand`) and the minute hand (`ART.minuteHand`) set to the time, and its sky card (`ART.skyCard`, 56 × 30) at the tile's top (0, −62) showing the part of the day: a horizon line with `ART.sunDisc` low-left (dawn), mid-left (morning), high (noon), mid-right (afternoon), half-set low-right (sunset), or `ART.moonDisc` high (night). The rooster at (60, 260). Zone B: the day strip (`ART.strip`, 640 × 90) centred at (360, 380) — its background is a left-to-right band of six sky panels (`ART.stripPanel`: dawn, morning, noon, afternoon, sunset, night) 106 px wide each, so the strip itself reads as the day; on it four empty slots (`ART.slot`, 110 × 70) at x = 135 / 285 / 435 / 585, y = 380, with position numerals 1-4 (`ART.slotNumeral`) at their top-left; `ART.startMark` (a small flag) at (80, 330) above slot 1. Caption `S("earliestFirst")` ("Earliest first") at (360, 288), 22 px `THEME.colour.inkSoft`.
3. **Tapping in order**: the child taps a face.
   - **Correct next (the earliest remaining time)**: `tone("tap", k)` (k = the slot number), `ANIM.pop`; the tile glides (`ANIM.glide`) into slot k and shrinks to fit (`ANIM.shrinkToSlot`); its sky card stays on it; the slot numeral turns solid and a digital 24-hour label (`ART.digitalLabel`, e.g. "07:00") `ANIM.appear`s under the slot — the confirmation, never the prompt. The placed tile remains a `makeTile`: tapping it returns it to the shelf.
   - **Item complete (slot 4 filled)**: `tone("correct")`, praise pop (`GameCore.showPraise`, next key in rotation), the rooster `ANIM.crow`, the rail dot fills; `ART.readBar` sweeps under the four slots left to right (`ANIM.readSweep`, 900 ms); then the next item builds (`ANIM.appear`). First-try if no wrong tap occurred.
   - **Wrong (a face that is not the earliest remaining)**: `ANIM.nudge` on the tile, `tone("nudge")`, the tile stays; `ART.nextArrow` slides from the last filled slot (or `ART.startMark`) to the next free slot (`ANIM.handOff`), then the error-class cue plays on the tapped face and the correct face (Rules: sector shading / minute ring / sky pulse). All shelf tiles disabled during the cue (≈ 1.5 s). Attempt 2 for this slot.
   - **Wrong again on the same slot**: the cue again, then the correct next face gains the show-me ring (`ART.showRing`, `ANIM.showMe`); tapping it fills the slot as solved-with-help (the item still completes; no praise pop; the rooster still crows).
4. **Items 2-10**: per Content/Rules. L1 = o'clock times, four distinct sky cards; L2 = o'clock and half past, with two faces sharing a sky card and the 7:30-vs-8:00 hour-hand trap; L3 = quarter and five-minute times, the 11:00-morning vs 1:00-afternoon wrap and the 6:30-dawn vs 6:30-sunset pair.
5. **Finish**: `t("all_done")` (360, 110); the rooster (360, 200) `ANIM.celebrate`; the summary = the last item's full strip re-drawn (four faces in order with their labels at y = 360) and, above it, ten tiny four-slot strips (`ART.miniStrip`, 60 × 14, filled left to right) in a row at y = 300, with `ART.dotFull` under first-try items and `ART.dotEmpty` under helped ones; optionally `t("question_x_of_y", {n: first-try, total: 10})` at (360, 460); `play_again` (250, 510), `menu` (470, 510); `tone("finish")`; `GameCore.reportHeight()`.

Session ≈ 6 minutes.

## Art registry
```js
const ART = {
  rooster:      { kind: "emoji", value: "🐓", size: 72 },
  clockTile:    { kind: "shape", shape: "roundRect", w: 130, h: 150, fill: "surface", stroke: "line", strokeWidth: 2, radius: 14 },
  face:         { kind: "shape", shape: "circle", r: 50, fill: "surface", stroke: "structure", strokeWidth: 3 },
  hourNumeral:  { kind: "text",  value: "", size: 13, font: "display", color: "ink" },              // 1-12 at radius 38
  tick:         { kind: "shape", shape: "rect", w: 2, h: 6, fill: "structure" },                    // twelve hour ticks at radius 46
  hourHand:     { kind: "shape", shape: "roundRect", w: 8, h: 30, fill: "structure", radius: 4 },   // SHORT, THICK, rounded, teal; pivot at its base
  minuteHand:   { kind: "shape", shape: "rect", w: 3, h: 44, fill: "accent" },                      // LONG, THIN, coral; pivot at its base
  minuteTip:    { kind: "shape", shape: "polygon", points: [[0,-8],[-5,4],[5,4]], fill: "accent" },  // arrow head at the minute hand's tip
  pivot:        { kind: "shape", shape: "circle", r: 4, fill: "ink" },
  skyCard:      { kind: "shape", shape: "roundRect", w: 56, h: 30, fill: "surface2", stroke: "line", strokeWidth: 1, radius: 6 },   // a 1-px line horizon at y = +8
  sunDisc:      { kind: "shape", shape: "circle", r: 7, fill: "accent", stroke: "inkOnAccent", strokeWidth: 1 },   // positions: dawn (−16,+8, lower half clipped) · morning (−12,−2) · noon (0,−8) · afternoon (+12,−2) · sunset (+16,+8, lower half clipped)
  moonDisc:     { kind: "shape", shape: "circle", r: 7, fill: "structure", stroke: "ink", strokeWidth: 1 },       // night: (0,−6) with a bg circle r 6 at (+4,−8) cut out to make a crescent
  strip:        { kind: "shape", shape: "roundRect", w: 640, h: 90, fill: "surface2", stroke: "structure", strokeWidth: 2, radius: 16 },
  stripPanel:   { kind: "shape", shape: "rect", w: 106, h: 90, fill: "surface2" },                  // six across the strip; each carries the matching sunDisc/moonDisc at 60 % scale, top-centre
  slot:         { kind: "shape", shape: "roundRect", w: 110, h: 70, fill: "surface", stroke: "line", strokeWidth: 2, radius: 10 },     // dashed [8,6] while empty
  slotNumeral:  { kind: "text",  value: "", size: 14, font: "display", color: "inkSoft" },          // "1".."4"; turns structure when filled
  digitalLabel: { kind: "text",  value: "", size: 16, font: "display", color: "structure" },        // "07:00", "16:30" — 24-hour, under a filled slot
  startMark:    { kind: "shape", shape: "polygon", points: [[-10,-14],[12,-6],[-10,2]], fill: "accent", stroke: "inkOnAccent", strokeWidth: 1 },   // flag above slot 1, with a 2-px ink pole
  nextArrow:    { kind: "shape", shape: "polygon", points: [[-16,-6],[4,-6],[4,-12],[16,0],[4,12],[4,6],[-16,6]], fill: "accent", stroke: "inkOnAccent", strokeWidth: 1 },
  hourSector:   { kind: "shape", shape: "arc", r: 46, fill: "structureSoft" },                      // wedge from the hour mark to the next (30°), drawn under the hands
  minuteRing:   { kind: "text",  value: "", size: 10, font: "display", color: "accent" },           // "5","10",…,"55" at radius 58 around the face (twelve labels; "60" is not drawn)
  minuteDot:    { kind: "shape", shape: "circle", r: 6, fill: "accent" },                           // on the ring at the minute hand's mark
  skyGlow:      { kind: "shape", shape: "roundRect", w: 106, h: 90, stroke: "accent", strokeWidth: 4, radius: 8 },   // around the strip panel the correct face belongs to
  readBar:      { kind: "shape", shape: "rect", w: 120, h: 6, fill: "structure" },
  showRing:     { kind: "shape", shape: "roundRect", w: 142, h: 162, stroke: "structure", strokeWidth: 4, radius: 18 },
  miniStrip:    { kind: "shape", shape: "roundRect", w: 60, h: 14, fill: "structureSoft", stroke: "structure", strokeWidth: 1, radius: 4 },
  dotEmpty:     { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:      { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
Hand angles: minute hand = minutes × 6°; hour hand = (hours mod 12) × 30° + minutes × 0.5° — the hour hand ALWAYS advances with the minutes (7:30's hour hand sits half-way between 7 and 8), which is what the sector cue relies on. Sky bands by time: dawn 5:00-7:59 · morning 8:00-11:59 · noon 12:00-12:59 · afternoon 13:00-16:59 · sunset 17:00-19:59 · night 20:00-4:59. Nothing else is tinted with `accent` except the minute hand, the sun, the arrows and the cue shapes named above.

## Animation registry
```js
const ANIM = {
  pop:          { scale: 1.08, duration: 140, ease: "Back.Out", yoyo: true, trigger: "a correct face tapped" },
  nudge:        { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "a wrong face tapped" },
  glide:        { duration: 300, ease: "Sine.InOut", trigger: "face to its slot / back to the shelf (x,y set at call)" },
  shrinkToSlot: { scale: 0.62, duration: 300, ease: "Sine.InOut", trigger: "face landing in a slot (runs with glide); reversed on return" },
  handOff:      { duration: 400, ease: "Sine.InOut", trigger: "nextArrow slides from the last filled slot (or the flag) to the next free slot at y = 330 (x set at call; alpha 0 → 1 over the first 100 ms)" },
  sectorIn:     { alpha: 1, duration: 300, ease: "Sine.Out", yoyo: true, hold: 1200, trigger: "hourSector on the tapped face and the correct face (from alpha 0), then fades" },
  ringIn:       { alpha: 1, duration: 300, ease: "Sine.Out", yoyo: true, hold: 1200, trigger: "minuteRing labels and minuteDot on the tapped face (from alpha 0), then fade" },
  pulse:        { scale: 1.2, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "the hour hand, then the minute hand (400 ms later) in a hands cue; two sky cards together in a sky cue" },
  glow:         { alpha: 1, duration: 300, ease: "Sine.Out", yoyo: true, hold: 1200, trigger: "skyGlow around the strip panel of the correct face (from alpha 0), then fades" },
  readSweep:    { x: 640, duration: 900, ease: "Sine.InOut", trigger: "readBar slides under the slots from x = 80 to x = 640 when an item completes" },
  crow:         { angle: 8, duration: 110, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "rooster on item completion" },
  fadeOut:      { alpha: 0, duration: 300, ease: "Sine.In", trigger: "nextArrow after a cue" },
  appear:       { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "new faces; digital labels (from alpha 0, scale 0.6)" },
  showMe:       { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "ring on the correct next face (from alpha 0.2)" },
  celebrate:    { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish rooster" }
};
```
No flashing: `showMe` at 1 Hz; every cue is one fade with a hold.

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]        ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28; "3 of 10" y=48  │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │   [sky]      [sky]      [sky]      [sky]     cards y=106      │
      │  ┌─────┐    ┌─────┐    ┌─────┐    ┌─────┐                    │
      │  │ (o) │    │ (o) │    │ (o) │    │ (o) │   faces y=168       │  zone A
      │  └─────┘    └─────┘    └─────┘    └─────┘   x=135/285/435/585 │
      │  rooster (60,260)   "Earliest first" (360,288)   (130×150)    │
260   ├──────────────────────────────────────────────────────────────┤
      │  flag(80,330)  → nextArrow travels at y=330                   │
      │ ┌dawn──┬morning┬noon──┬aftern┬sunset┬night─┐  strip (360,380) │  zone B
      │ │ [ 1 ]   [ 2 ]   [ 3 ]   [ 4 ]  slots y=380, x=135/285/435/585│
      │ └──────┴───────┴──────┴──────┴──────┴──────┘  (640×90)        │
      │   07:00   labels under filled slots y=430                    │
480   ├──────────────────────────────────────────────────────────────┤
      │                 (praise pop appears centred)                 │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Fixed layout, FIT scaling. The strip spans x = 40 … 680; its six panels sit at x = 93 + 106 i. A slot's position is fixed (slot k at the k-th x); the panel behind a slot is NOT tied to the slot — the panels are a background scale, and `ART.skyGlow` marks whichever panel the correct face's sky belongs to.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 10 × `ART.dotEmpty` (x = 261 + i × 22) → `ART.dotFull`; `t("question_x_of_y")` at (360, 48).
- Shelf tiles: `makeTile` 130 × 150 (`ART.clockTile`) at y = 168; inside each: `ART.skyCard` at (0, −62) with its `ART.sunDisc` / `ART.moonDisc`; `ART.face` at (0, +8) with twelve `ART.tick`s, twelve `ART.hourNumeral`s, `ART.hourSector` (hidden until a cue), `ART.hourHand` then `ART.minuteHand` + `ART.minuteTip`, `ART.pivot` on top; `ART.minuteRing` labels and `ART.minuteDot` hidden until a cue. Selected look = the library outline + `ANIM.pop`.
- Strip: `ART.strip` at (360, 380) with six `ART.stripPanel`s and their 60 %-scale sky discs; four `ART.slot`s (dashed while empty) at y = 380 as `makeTile`s 110 × 70 (so a placed face is keyboard-reachable for undo; empty slots do nothing when tapped); `ART.slotNumeral` at each slot's (−45, −25); `ART.digitalLabel` at (slot x, 430) once filled; `ART.startMark` at (80, 330); `ART.nextArrow` travels at y = 330; `ART.readBar` at y = 424; `ART.skyGlow` around a panel; `ART.showRing` behind a shelf tile.
- Caption `S("earliestFirst")` 22 px `THEME.font.body` `THEME.colour.inkSoft` at (360, 288). `ART.rooster` at (60, 260).
- Tap floors: shelf tiles 130 × 150, slots 110 × 70 (≥ 56); gaps 20 between tiles, 40 between slots. Tab order: shelf tiles left to right, then the strip slots left to right (filled slots only respond). While a cue plays (≈ 1.5 s) all shelf tiles are `setEnabled(false)`.

## Content
Language-neutral. Items list four times in 24-hour form with their sky band; the shelf order is shuffled per item and never equals the answer order. "Trap" names the pair the item is built around.
- **L1** (o'clock; four distinct sky bands): (07:00 dawn, 12:00 noon, 16:00 afternoon, 21:00 night) · (06:00 dawn, 09:00 morning, 14:00 afternoon, 18:00 sunset) · (08:00 morning, 12:00 noon, 17:00 sunset, 22:00 night) · (05:00 dawn, 10:00 morning, 15:00 afternoon, 20:00 night) · (09:00 morning, 13:00 afternoon, 19:00 sunset, 23:00 night)
- **L2** (o'clock and half past; two faces share a band; the hour-hand trap): (07:30 dawn, 08:00 morning, 15:00 afternoon, 20:30 night; trap 07:30 vs 08:00) · (06:00 dawn, 10:30 morning, 11:00 morning, 19:00 sunset; trap 10:30 vs 11:00) · (09:00 morning, 13:30 afternoon, 14:00 afternoon, 21:30 night; trap 13:30 vs 14:00) · (05:30 dawn, 06:00 dawn, 12:30 noon, 18:30 sunset; trap 05:30 vs 06:00) · (08:30 morning, 12:00 noon, 16:30 afternoon, 17:00 sunset; trap 16:30 vs 17:00)
- **L3** (quarter and five-minute times; the 12-hour wrap; same face, different sky): (11:00 morning, 13:00 afternoon, 16:15 afternoon, 22:00 night; trap 11:00 vs 13:00 — same "big" numeral order broken by the sky) · (06:30 dawn, 09:45 morning, 14:20 afternoon, 18:30 sunset; trap 06:30 dawn vs 18:30 sunset — identical faces) · (07:15 dawn, 07:45 dawn, 12:05 noon, 20:50 night; trap 07:15 vs 07:45 — the hour hand nearer 8 on 07:45) · (10:10 morning, 10:50 morning, 15:35 afternoon, 21:25 night; trap 10:50 read as 11:50) · (08:40 morning, 11:55 morning, 13:00 afternoon, 19:05 sunset; trap 11:55 vs 13:00 — the wrap through noon)

Play list of 10 per Rules; no item repeats within a session; the correct first face never sits in the same shelf slot twice running (§13).

Worked example: item 1 (L1) all first-try · item 2 first-try → L2 · item 3 (07:30, 08:00, 15:00, 20:30) taps 08:00 first → nudge, the arrow slides from the flag to slot 1; taps 08:00 again → the 7 wedge shades on the 07:30 face and the 8 line on the 08:00 face, the 07:30 face gains the ring; taps it (helped), then 08:00, 15:00, 20:30 → L1 · item 4 first-try · item 5 first-try → L2 · items 6-7 first-try → L3 · item 8 (11:00, 13:00, 16:15, 22:00) taps 11:00, then 16:15 → nudge, the two sky cards (13:00 afternoon and 16:15 afternoon) pulse and the afternoon panel glows under the strip; taps 13:00 → helped · items 9-10 first-try → Finish shows ten mini strips and the last strip in full.

## Rules
- Item count: 10.
- Difficulty progression: 2 consecutive first-try items → next item from the next level up (cap L3).
- Adaptation: any wrong tap on an item, or wrong first-try on 2 consecutive items → next item one level down (floor L1). The current item is never abandoned.
- What happens on a correct answer: per placed face `tone("tap", k)` + `ANIM.pop` + glide into slot k with the digital label appearing; on item completion `tone("correct")`, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"], `ANIM.readSweep`, rooster `ANIM.crow`, rail dot fills, next item after 900 ms.
- What happens on a wrong answer (per anticipated mistake; each begins with `ANIM.nudge` + `tone("nudge")` and `ART.nextArrow` sliding to the next free slot):
  - The later of a same-hour pair tapped first (7:30 read as 8:30 / hour hand read as the nearest numeral): `ART.hourSector` shades on both faces (`ANIM.sectorIn`) — the tapped face's hand inside its wedge, the correct face's hand where it is.
  - A face tapped whose minute hand was read as a numeral (a :30 face taken as "6 o'clock" and placed before a :00 face of a lower hour, or a :15 / :45 confusion): `ART.minuteRing` and `ART.minuteDot` reveal on the tapped face (`ANIM.ringIn`) after the hands pulse in turn (hour first, then minute).
  - A face tapped whose numerals are in order but whose sky is later (3:00 before 11:00; 13:00 vs 11:00; 18:30 before 06:30): both sky cards `ANIM.pulse` together and `ART.skyGlow` marks the correct face's panel on the strip.
  - Any other out-of-turn face: the arrow cue only.
  - A placed face tapped: returns to the shelf (undo, no penalty, not an attempt).
- Retry behaviour: per slot — attempt 1 unaided → attempt 2 after the arrow-and-cue → attempt 3 with the show-me ring on the correct face; the ringed face fills the slot as solved-with-help. No attempt 4. An item with any wrong tap does not count as first-try.
- Finish condition: 10 items. No losing state; no clock of any kind other than the faces being ordered (nothing counts down).

## Strings
- `GameCore.t()` keys: `t("start")`, `t("question_x_of_y")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific (`STRINGS.en`, via `S(key)`): `title` = "Clock Order"; `earliestFirst` = "Earliest first". Digital labels are numerals and a colon; no am/pm text, no spoken-idiom text anywhere.

## Sound
`tone("tap", k)` when a face lands in slot k (pitch climbs through the day, F-213); `tone("tap")` on an undo; `tone("correct")` on item completion; `tone("nudge")` on a wrong tap; `tone("finish")` once. Silent under `?sound=off`; no audio files. Nothing is spoken; the hands, the sector, the ring and the sky carry the meaning.

## Testing checklist
- [ ] Works in all 11 languages (Question x of y, All done, Play again, Menu, praise and the caption change with the picker; the faces and the 24-hour labels do not).
- [ ] Works at narrow width (400-px iframe: four shelf tiles with their sky cards, the full strip with four slots and the flag visible; a placed face fits its slot).
- [ ] Keyboard operable (Tab walks the shelf tiles then the strip slots; Enter places / returns; empty slots do nothing).
- [ ] Never auto-starts.
- [ ] No losing state (any number of wrong taps still ends with a full strip via the show-me ring).
- [ ] The hour hand is short, thick, rounded and teal; the minute hand is long, thin, arrow-tipped and coral, on every face.
- [ ] On a 07:30 face the hour hand sits half-way between 7 and 8; tapping 08:00 before it twice shades the 7 wedge on the 07:30 face and rings it.
- [ ] Tapping the correct face makes it glide into the next slot, shrink, and show its 24-hour label; tapping it there sends it back to the shelf.
- [ ] At the third level an item holds 11:00 with a morning card and 13:00 with an afternoon card; tapping 13:00 first pulses both sky cards and glows the morning panel on the strip.
- [ ] At the third level two faces can look identical (06:30 dawn and 18:30 sunset) and only the sky card orders them.
- [ ] A wrong tap involving a half-past or five-minute face reveals the 5-10-…-55 ring on that face with a dot at the minute hand's mark.
- [ ] Two first-try items in a row bring half-past then five-minute faces; a wrong tap brings o'clock faces next.
- [ ] No "am", "pm" or spoken-time words appear anywhere; the strip's labels are 24-hour numerals only.
- [ ] The finish screen shows ten little strips with filled dots for unaided items and the last item's ordered faces; no score.
- [ ] With `?sound=off` nothing is audible.
