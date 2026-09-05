# 057 — Fraction Number Line

## Identity
- Slug: `fraction-number-line`
- Subject / topic: Mathematics / fractions on a number line from 0 to 1 (halves, quarters, thirds, sixths, eighths)
- Age band: `8-9`
- Interaction pattern: `P9` — set a value (tap the tick to place the marker; Check)
- Estimated build size: ~470 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P9 (tap-the-tick form; dragging the marker is also accepted, with the tick tiles as the fallback per §3). Content is language-neutral (numerals and a line); no `LOCALE_DATA`.

## Learning
- Objective: Places a given fraction (halves, quarters, thirds, sixths, eighths) at the correct tick on a 0-1 number line by counting equal jumps from 0, and checks it.
- Prerequisites: Reads the notation a/b as "a of b equal parts" (games 054-056); counts along a number line (game 008 territory).
- Curriculum links: F-112 (thirds and fifths are hard; "the whole changes but parts compared" — here the whole is always the 0-1 unit; level order halves → quarters → thirds), F-27 (formal notation at 8-9; the number line is the US grade-3 form), F-33 (US 3.NF number-line fractions), F-21, F-31 row "Fraction notation, compare, number line" — conservative 8-9 → 8-9 (US 3.NF.A.2 "represent a fraction a/b on a number line … by marking off a lengths 1/b from 0"; England Y3 "count up and down in tenths … fractions as numbers"; France CE2 "placer une fraction simple sur une demi-droite graduée"; Spain 2º ciclo; Brazil EF04MA09; Sweden åk 3 "bråk … på tallinje"; Germany/Netherlands/Finland/Italy/Norway not before 9-10 — the ticks and jumps carry the game where the notation is new).
- Common misconceptions (F-112, F-114), each with this game's response:
  1. **Counting ticks instead of intervals (placing 3/4 at the third tick counting 0 as the first).** Response: on a wrong Check the line subdivides itself: `ART.jumpArc`s draw from 0, one per equal part, each badged 1 … b (`ART.jumpBadge`, `tone("tap", k)`); the first a arcs then fill (`ANIM.arcFill`) and the correct tick pulses — the number is a count of JUMPS, and the child sees that the third jump ends at the fourth tick.
  2. **Numerator-only reading (3/4 placed at 3/8 on an eighths line, or at the third tick whatever the line).** Response: on an eighths line the subdivision cue draws the FOUR quarter jumps (each spanning two eighth ticks), not eight, so the child sees the denominator decide the jump size; the badges count to 4.
  3. **Denominator as position (3/4 placed at 4/4 = 1, or 1/3 placed at the tick nearest "3").** Response: the same jump cue; `ART.endTag` ("1") at the right end pulses when the marker was placed at 1 — the whole bar is 1; a fraction under 1 sits before it.
  4. **"A fraction is two numbers" (placing between two ticks or at 0).** Response: the marker can only sit ON a tick (ticks are the tiles; a drag snaps to the nearest tick within 40 px), so an in-between placement is impossible; a placement at 0 gets the jump cue from 0 with the badges counting up to a.
  5. **Bigger denominator = further along (1/6 placed past 1/3).** Response: L2 mixes thirds and sixths on one sixths line so both appear; on a wrong Check the jump cue shows sixths are SHORTER jumps; the re-queue (F-41) brings the paired fraction (the same point named the other way, 2/6 for 1/3) so equivalence is seen without being stated.

## How it plays
1. **Start screen**: title "Fraction Number Line", the rabbit (`ART.rabbit`) at (360, 200), Start, picker.
2. **Item 1 (L1: 1/2 on a quarters line)**: rail of 12 dots (§6); `t("question_x_of_y")` at (360, 48), 18 px `THEME.colour.inkSoft`. Zone A: the target fraction as a stacked notation (`ART.fracNum` "1" over `ART.fracBar` over `ART.fracDen` "2", 40 px numerals) inside `ART.targetCard` (120 × 120) at (360, 140); the rabbit at (110, 150). Zone B: the number line — `ART.lineBar` from x = 80 to x = 640 at y = 380 (560 px long) with `ART.tick`s at the quarter points (x = 80, 220, 360, 500, 640) and `ART.endTag`s "0" at (80, 420) and "1" at (640, 420); over every tick an invisible `makeTile` 56 × 56 (`ART.tickTile`, transparent) at (x, 380); the marker (`ART.marker`, a coral triangle pointing down onto the line with a stem) starts parked at the 0 tick; interior ticks are unlabelled. Zone C: Check (`makeButton ok`) at (360, 510), disabled until the marker has been moved. Caption `S("placeIt")` ("Put it on the line") at (360, 290), 22 px `THEME.colour.inkSoft`, `wordWrap` 600.
3. **Placing**: tap a tick tile → the marker glides (`ANIM.glide`) to that tick, `tone("tap", k)` where k = the tick's index from 0; dragging the marker moves it live and snaps to the nearest tick on release (`ANIM.snap`); the line does NOT judge while placing. Check enables after the first move.
4. **Check**: tap OK.
   - **Correct**: the marker `ANIM.pop`s and locks (`ART.markerLocked`, a filled version); the fraction label glides down from the card to sit under the tick (`ART.tickLabel`, 22 px stacked notation) with `ANIM.glide`; the jumps from 0 to the marker draw quickly as confirmation (`ART.jumpArc` ×a, `ANIM.arcIn`, 120 ms apart, `tone("tap", k)`); `tone("correct")`; praise pop (next key in rotation); the rabbit `ANIM.hop`; rail dot fills; after 900 ms the next item builds (the line clears its label and arcs with `ANIM.rise`; the marker returns to 0). First-try correct.
   - **Wrong (any other tick)**: `tone("nudge")`; the marker stays where the child left it (P9 rule); the **subdivision cue**: from 0, b `ART.jumpArc`s draw one by one along the line, each badged 1 … b with `tone("tap", k)` (300 ms apart), then the first a arcs fill (`ANIM.arcFill`) and the correct tick pulses (`ART.tickGlow`, `ANIM.pulse`); if the marker sits at 1, `ART.endTag` "1" pulses too. The arcs stay visible; Check re-enables when the child moves the marker. Attempt 2.
   - **Second wrong Check**: the cue again, then the correct tick gains the show-me ring (`ART.showRing`, `ANIM.showMe`) and the marker slowly glides there by itself (`ANIM.glide`, 800 ms); tapping OK completes the item as solved-with-help (no praise pop).
5. **Re-queue** (F-41): an item wrong on the first Check re-enters after 2 intervening items as its PAIR — the same point named in the finer unit where one exists (1/2 → 2/4 on the quarters line; 1/3 → 2/6; 3/4 → 6/8), otherwise the same item — then, if wrong again, near the end. The item count stays 12.
6. **Items 2-12**: per Content/Rules. L1: a quarters line (5 ticks) with halves and quarters; L2: a sixths line (7 ticks) with thirds and sixths; L3: an eighths line (9 ticks) with eighths, quarters and halves, and the end tag "1" withdrawn on the last three items (only "0" shown — the child must know the line ends at 1).
7. **Finish**: `t("all_done")` (360, 110); the rabbit (360, 200) `ANIM.celebrate`; the summary = one long number line (`ART.lineBar` at y = 380 from x = 80 to 640) with all twelve placed fractions as `ART.tickLabel`s under their ticks (duplicates stacked), first-try items with `ART.dotFull` at their tick and helped items with `ART.dotEmpty` — the line the child built, not a score; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`; `GameCore.reportHeight()`.

Session ≈ 6-7 minutes.

## Art registry
```js
const ART = {
  rabbit:       { kind: "emoji", value: "🐰", size: 80 },
  targetCard:   { kind: "shape", shape: "roundRect", w: 120, h: 120, fill: "surface", stroke: "structure", strokeWidth: 3, radius: 16 },
  fracNum:      { kind: "text",  value: "", size: 40, font: "display", color: "ink" },
  fracBar:      { kind: "shape", shape: "rect", w: 48, h: 4, fill: "ink" },
  fracDen:      { kind: "text",  value: "", size: 40, font: "display", color: "ink" },
  lineBar:      { kind: "shape", shape: "rect", w: 560, h: 6, fill: "structure" },
  tick:         { kind: "shape", shape: "rect", w: 4, h: 28, fill: "structure" },
  tickTile:     { kind: "shape", shape: "roundRect", w: 56, h: 56, fill: "bg", stroke: "bg", strokeWidth: 0, radius: 12 },   // invisible tap area over a tick; focus ring drawn by the library
  endTag:       { kind: "text",  value: "", size: 26, font: "display", color: "structure" },        // "0" and "1"
  marker:       { kind: "shape", shape: "polygon", points: [[0,0],[-16,-28],[16,-28]], fill: "surface", stroke: "accent", strokeWidth: 4 },   // hollow while placing; a 4-px accent stem from (0,-28) up to (0,-52)
  markerLocked: { kind: "shape", shape: "polygon", points: [[0,0],[-16,-28],[16,-28]], fill: "accent", stroke: "structure", strokeWidth: 3 },
  tickGlow:     { kind: "shape", shape: "circle", r: 22, stroke: "accent", strokeWidth: 4 },
  jumpArc:      { kind: "shape", shape: "arc", r: 0, stroke: "structure", strokeWidth: 3 },        // a half-circle arc above the line spanning one part; r = 280 / b, start 180°, end 360°
  jumpArcFill:  { kind: "shape", shape: "arc", r: 0, fill: "structureSoft" },                       // the filled version for the first a jumps
  jumpBadge:    { kind: "shape", shape: "circle", r: 11, fill: "structure" },                        // 1..b at each arc's top, 14 px display, color bg
  tickLabel:    { kind: "text",  value: "", size: 22, font: "display", color: "structure" },        // a stacked mini notation under a solved tick (num, 24×2 bar, den)
  showRing:     { kind: "shape", shape: "circle", r: 34, stroke: "structure", strokeWidth: 4 },
  dotEmpty:     { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:      { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
Tick pitch: quarters 140 px (5 ticks), sixths 93.3 px (7 ticks), eighths 70 px (9 ticks) — every tick tile is 56 wide, so the smallest gap between tiles is 14 px (≥ 12, §3). Jump arcs for denominator b have radius 280 / b and sit with their ends on consecutive ticks of the b-line, even when the drawn line is finer (quarter jumps on an eighths line span two ticks).

## Animation registry
```js
const ANIM = {
  glide:     { duration: 260, ease: "Sine.InOut", trigger: "marker to a tapped tick; the label from the card to the tick; the show-me glide (800 ms override) (x,y set at call)" },
  snap:      { duration: 120, ease: "Sine.Out", trigger: "marker to the nearest tick on drag release (x set at call)" },
  pop:       { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "marker on a correct Check" },
  arcIn:     { alpha: 1, scale: 1, duration: 160, ease: "Sine.Out", trigger: "each jump arc drawing in (from alpha 0), 120 ms apart on confirm, 300 ms apart in the cue" },
  arcFill:   { alpha: 1, duration: 200, ease: "Sine.Out", trigger: "the first a arcs gaining their fill (from alpha 0)" },
  pulse:     { scale: 1.15, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "the correct tick's glow; the end tag when the marker sits at 1" },
  rise:      { y: "-=30", alpha: 0, duration: 260, ease: "Sine.In", trigger: "arcs, badges and the label clearing between items" },
  hop:       { y: "-=18", duration: 140, ease: "Sine.Out", yoyo: true, trigger: "rabbit on a correct Check" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "new target card contents (from alpha 0, scale 0.6)" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "ring on the correct tick (from alpha 0.2)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish rabbit" }
};
```

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]      ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28; "3 of 12" y=48│  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │                        ┌──────┐                              │
      │  rabbit (110,150)      │  1   │  targetCard (360,140)         │  zone A
      │                        │  ─   │                              │
      │                        │  2   │                              │
      │                        └──────┘                              │
260   ├──────────────────────────────────────────────────────────────┤
      │                 "Put it on the line" (360,290)               │
      │            ⌒  ⌒  jump arcs above the line (cue)  y≈340       │
      │   ▼ marker                                                   │  zone B
      │ ──┼──────┼──────┼──────┼──────┼──  line y=380, x=80..640      │
      │   0                             1   end tags y=420           │
480   ├──────────────────────────────────────────────────────────────┤
      │                    [   OK   ] (360,510)                       │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Fixed layout, FIT scaling. Arcs sit above the line (their centres on the line at the midpoint between two ticks of the b-line, radius 280 / b, so the tallest arc — halves — reaches y = 240, still inside zone B's headroom because the caption is at y = 290 and is hidden while arcs draw).

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 12 × `ART.dotEmpty` (x = 239 + i × 22) → `ART.dotFull`; `t("question_x_of_y")` at (360, 48).
- `ART.targetCard` at (360, 140) with the stacked notation centred (numerator at (360, 116), bar at (360, 140), denominator at (360, 164)).
- `ART.lineBar` centred (360, 380); `ART.tick`s at the tick x-positions; `ART.endTag`s at (80, 420) "0" and (640, 420) "1" (the "1" is withdrawn on the last three L3 items); `ART.tickTile`s (`makeTile` 56 × 56, invisible) centred on each tick — the marker container is `setDraggable`; a `drag` moves it along y = 380 only; `dragend` snaps to the nearest tick within 40 px, else back to its previous tick.
- `ART.marker` centred with its point on the line at the current tick (the polygon's (0,0) is the point); `ART.markerLocked` replaces it on a correct Check; `ART.tickGlow` around the correct tick during a cue; `ART.jumpArc`/`ART.jumpArcFill` with `ART.jumpBadge`s at each arc's top; `ART.tickLabel` under a solved tick at (x, 424) (the end tag moves aside if it collides — only at 1, where the label sits at (640, 448)).
- Check `makeButton` `ok` at (360, 510), alpha 0.5 while disabled; `ART.showRing` on the correct tick during show-me.
- Caption `S("placeIt")` 22 px `THEME.font.body` `THEME.colour.inkSoft` at (360, 290), hidden while arcs are drawn.
- `ART.rabbit` at (110, 150). Tap floors 56 (tick tiles) ≥ 56; gaps ≥ 14. Keyboard: Left/Right arrows move the marker one tick (P9 rule), Enter checks; Tab also walks the tick tiles then OK.

## Content
Language-neutral. Items as (fraction; line; correct tick index from 0):
- **L1** (quarters line, 5 ticks): (1/2; quarters; 2) · (1/4; quarters; 1) · (3/4; quarters; 3) · (2/4; quarters; 2) · (4/4; quarters; 4) · (1/4; quarters; 1)
- **L2** (sixths line, 7 ticks): (1/3; sixths; 2) · (1/6; sixths; 1) · (2/3; sixths; 4) · (5/6; sixths; 5) · (3/6; sixths; 3) · (4/6; sixths; 4) · (3/3; sixths; 6)
- **L3** (eighths line, 9 ticks; the "1" end tag withdrawn on the last three items played at this level): (1/8; eighths; 1) · (3/8; eighths; 3) · (3/4; eighths; 6) · (5/8; eighths; 5) · (1/2; eighths; 4) · (7/8; eighths; 7) · (1/4; eighths; 2) · (6/8; eighths; 6)

Re-queue pairs: 1/2 → 2/4 (L1) or 4/8 (L3); 1/3 → 2/6; 2/3 → 4/6; 1/4 → 2/8 (L3); 3/4 → 6/8 (L3); otherwise the same item. Play list of 12 per Rules; no item repeats except by re-queue; the correct tick never repeats twice running (§13); the marker always starts at 0.

Worked example: item 1 (1/2; quarters) first-try · item 2 (3/4; quarters) first-try → L2 · item 3 (1/3; sixths) places the marker at tick 3 (read "3") → six arcs draw with badges 1 … 6, the first two fill and tick 2 glows; the child moves to tick 2, Check (helped) · item 4 (5/6) first-try · item 5 (2/3) first-try → L3 · item 6 = re-queued (2/6; sixths; 2) first-try · items 7-12 L3 with one miss → Finish shows the line with twelve labels, ten with filled dots.

## Rules
- Item count: 12 (re-queued pairs replace unplayed items of the same level).
- Difficulty progression: 2 consecutive first-Check correct → next level (cap L3).
- Adaptation: a wrong first Check on 2 consecutive items → next item one level down (floor L1). A single miss re-queues the pair item without changing level.
- What happens on a correct answer: marker locks with `ANIM.pop`, the label glides under the tick, the a jumps draw as confirmation with rising tones, `tone("correct")`, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"] (first-try items), rabbit `ANIM.hop`, rail dot, next item after 900 ms.
- What happens on a wrong answer (per anticipated mistake):
  - Tick-counting (marker one tick short or long of the target on the b-line): the subdivision cue — b arcs badged 1 … b, the first a filled, the correct tick glowing; `tone("nudge")`; the marker stays; attempt 2 when the child moves it and checks.
  - Numerator-only (marker at tick a on a finer line, e.g. 3/4 at tick 3 of eighths): the cue draws the FOUR quarter jumps spanning two ticks each; attempt 2.
  - Denominator-as-position (marker at 1 or at tick b of a finer line): the cue, and the "1" end tag pulses; attempt 2.
  - Marker at 0 (not moved far enough / fraction not read): the cue from 0 counting to a; attempt 2.
  - Second wrong Check: the show-me ring on the correct tick and the marker glides there by itself; OK completes the item as solved-with-help.
- Retry behaviour: attempt 1 → attempt 2 with the arcs visible → attempt 3 show-me; solved-with-help; the pair item re-queues later. No attempt 4.
- Finish condition: 12 items. No losing state; no clock (F-45).

## Strings
- `GameCore.t()` keys: `t("start")`, `t("ok")`, `t("question_x_of_y")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific (`STRINGS.en`, via `S(key)`): `title` = "Fraction Number Line"; `placeIt` = "Put it on the line". Fractions and tags are numerals.

## Sound
`tone("tap", k)` when the marker lands on tick k (pitch rises along the line); `tone("tap", k)` per jump arc in a cue or confirmation; `tone("correct")`, `tone("nudge")`, `tone("finish")` once. Silent under `?sound=off`; no audio files.

## Testing checklist
- [ ] Works in all 11 languages (OK, "Question 3 of 12", All done, Play again, Menu, praise change; the caption once translated).
- [ ] Works at narrow width (400-px iframe: the target card, the whole line with all nine ticks at level 3, the marker and OK visible; adjacent tick tiles remain separate targets).
- [ ] Keyboard operable (Left/Right arrows move the marker one tick; Tab walks the ticks then OK; Enter places / checks).
- [ ] Never auto-starts.
- [ ] No losing state (wrong Checks never end the session; the marker eventually glides to the right tick and OK completes the item).
- [ ] The marker starts at 0 on every item and OK is dimmed until it has been moved.
- [ ] Dragging the marker and releasing between ticks snaps it to the nearest tick; it can never rest between ticks.
- [ ] Placing 3/4 at the third tick of the quarters line is accepted; placing it at the third tick of the eighths line draws four quarter jumps, each two ticks wide, and the sixth tick glows.
- [ ] Placing 1/3 at 1 makes the "1" tag pulse and six arcs draw with the first two filled.
- [ ] A correct Check drops the fraction label under its tick and draws the jumps from 0 to it.
- [ ] A missed item comes back two items later named in the finer unit (1/3 comes back as 2/6) and again near the end.
- [ ] On the last three level-3 items only "0" is written at the ends of the line.
- [ ] The finish screen shows one line with all twelve fractions under their ticks and no score.
- [ ] With `?sound=off` nothing is audible; with sound on, moving the marker rightward plays higher notes.
