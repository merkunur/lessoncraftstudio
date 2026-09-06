# 179 — Signpost Mountain

## Identity
- Slug: `number-to-1000-line`
- Subject / topic: Mathematics / placing three-digit numbers on a 0-1000 number line marked in hundreds (and, at the top level, in tens inside the opened hundred)
- Age band: `8-9`
- Interaction pattern: `P9` — set a value (tap the stretch of the path the number lies in; Left/Right and a drag of the goat also accepted; PLANT commits)
- Frame: THE CLIMB
- Estimated build size: ~620 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md` §1-§14, with §7 replaced by the MISSION LAYOUT of `design/MISSIONS.md` 1.4 and §6's dot record confined to the Finish screen. Frame contract: `MISSIONS.md` FRAME 14 THE CLIMB. Pattern contract: `catalogue/PATTERNS.md` P9 (every control has a discrete tap alternative). Law: `design/GAME-DESIGN-LAW.md` — moving is solving, the ratchet rule, the F-42 gate. The value the child sets is **the goat's own altitude on the path**; the tappable units are the ten stretches of ground between hundred posts (a three-digit number that is not a multiple of 100 never stands at a post), so "nearest post" means "the hundred just below" — the foot of the stretch she is standing in. Content is language-neutral (numerals only).

## Learning
- Objective: Reads a three-digit number and taps the hundred-segment of a 0-1000 line in which it lies (346 → between 300 and 400), then at the top level the ten-segment inside the zoomed hundred (340 – 350), and checks it.
- Prerequisites: Reads three-digit numerals; knows 100, 200 … 1000 in order (games 038, 041); has placed numbers on a 0-100 line (game 177 territory).
- Curriculum links: F-108 (place value — digits as independent numbers; zero placeholder ignored; syntactic transcoding; de/nl/da inverted tens and ones), F-31 row "Numbers to 1000; +/− 3-digit" — conservative 8-9, earliest 6-7 → 8-9 (US 2.NBT.A.1 / 2.MD.B.6 "represent whole numbers … on a number line diagram"; England Y3 "identify, represent and estimate numbers … number line to 1000"; Germany Klasse 3 "Zahlenraum bis 1000, Zahlenstrahl"; France CE2 "placer des nombres sur une droite graduée"; Netherlands groep 5 "getallenlijn tot 1000"; Spain 2º ciclo; Brazil EF03MA01; Sweden åk 3; Denmark 3. klasse "tal op til 1000"; Norway 3. trinn; Finland grade 3), F-21, F-114 (ticks counted instead of intervals).
- Common misconceptions (F-108, F-114, F-103), each with this game's response:
  1. **Digits as independent numbers — 346 placed in the 400s or the 600s because of the 4 or the 6.** Response: `ART.digitRing` closes on the HUNDREDS digit of the plate she is carrying, and **three cairns** (`ART.cairn`) stack themselves on the ground beside her, one per hundred, 220 ms apart with rising tones. Then the stretch she is standing in opens into its switchback (`ANIM.openPath`) and the ghost plate (`ART.ghostPlate`, `ART.ghostNumeral`, `ART.offArrow` — one composite) stands off its **downhill** end, arrow pointing down the mountain: she is standing too high up. The count and the direction are both about the same digit, in front of her, on the ground she is on.
  2. **Counting ticks instead of intervals — 300 … 399 placed in the segment after the THIRD tick counted from 1 (i.e. 200 – 300) (F-114).** Response: **hoof-prints** (`ART.hoofPrint`), one per stretch, appear from the valley up to the 300 post, 220 ms apart with rising tones — each print lands on the GROUND between two posts, never on a post. *You count the walking, not the posts.* The error is enacted as its own correction. The stretch she is standing in then opens with the ghost off its uphill end.
  3. **"398 is nearly 400, so it goes in the 400s" (F-103 rounding confused with placing).** Response: the 400 – 500 stretch opens; the ghost plate "398" stands one short step **below** the 400 post, and that post `ANIM.pulsePost`s in `structure`. She is above the post; the plate belongs below it. At L3 the same point is made again inside the hundred (398 stands in the 390 – 400 leg).
  4. **Transcoding — 306 read as 36, placed in 0 – 100; 105 placed by "one hundred and five" logic in the 100s but at the ten-segment "150" (L3).** Response: the 0 – 100 stretch opens and the ghost "306" stands off its **uphill** end, arrow pointing up the mountain — it belongs far higher. `ART.digitRing` then steps along the plate's three digits left to right (`ANIM.ringStep`) with three cairn columns of 3, 0 and 6 stones, so the hundreds-tens-ones LAYOUT is the anchor and the number word never is.
  5. **Inverted tens and ones (de/nl/da: "dreihundertsechsundvierzig" → 364 → ten-segment 360 – 370 at L3).** Response: at the leg stage `ART.digitRing` moves to the TENS digit of the carried plate; the opened switchback keeps its leg tags lit and the ghost plate appears at 346's own spot inside the 340 – 350 leg, with that leg's two small posts pulsing. The layout, never the word, is the anchor.

## Mission
**Mission, as the child would say it.** *Sign the path all the way up.*

**Hero.** A goat (roster `goat`), the mountain's waymarker. She carries a pannier of numbered altitude plates and walks the path planting each one at its own height. She is never a spectator: she is the marker, and the plate she is holding is the question.

**Want (the visible lack, legible with no motion and no words).** A goat standing on a mountain path with numbered plates strapped to her, a line of bare posts running up the slope past her, and a hut at the top with someone waiting in the doorway. **The posts have numbers, the ground between them has none, and she is carrying the missing ones.**

**Destination / waiting party (Device 1).** `ART.hut` at (656, 104) with `ART.keeperIdle` — a hedgehog — standing in the doorway at (622, 116), drawn from the first frame. The keeper cannot set off down an unmarked path. **She does not move, react or approve until the finish**; a waiting party that nods at each correct answer is an approval meter, which is F-44's banned shape.

**The single state variable.** **`S` = the goat's position along the path**, i.e. how far up she has walked. It has two readings and there is no second state variable anywhere in this game:

- **Mathematical reading.** The value under her hooves. At stage 1 that is which hundred-stretch she stands in (346 → the ground between the 300 post and the 400 post); at stage 2 (L3) which ten-leg of the opened stretch (340 – 350); at the moment a plate seats, the exact metre.
- **Physical reading.** Her altitude on the mountain — literally metres of climb above the valley, because the path IS the graduated scale and its posts ARE the hundreds.

**Transition function.** Tapping a stretch (or Left/Right, or dragging her) walks her to it: `S` changes and **nothing is judged**. PLANT asks the ground one question — *is the height under her feet this plate's own height?*
**Goal predicate on `S`.** Every plate seated at its own height → the path is waymarked end to end.

**The isomorphism — the answer is how high she is.** A number on this mountain is an altitude, so a plate stamped 346 belongs at 346 metres and nowhere else, and the only way to say where 346 belongs is to go and stand there. **She plants where she stands.** The commit handler reads `goat.pathPosition` — a position, never a tile id, never a selection index, never a keypad buffer — so the Displacement rule (`GAME-DESIGN-LAW` §2.3) is satisfied at the line of code that decides correctness. The walk happens at *tap* time, is freely repeatable and costs nothing; it is not something that follows a decision, it is the decision being carried out. Three objects the original spec kept apart — the coral marker triangle, the owl at (110, 140) and the target card at (360, 130) — collapse into **one object: a goat carrying a numbered plate, standing on the line.** The numeral rides 76 px above her hooves, one saccade from the ground it names; there is no "answer" drawn anywhere on the screen.

**Why THE CLIMB and not THE CROSSING.** `MISSIONS.md` §2.15's discriminator: the Crossing's answer is a destination cell among discrete unrelated options; the Climb's altitude *is* the value, "to be read, compared and ordered — measurement, place value, comparison". That is this objective verbatim. (Sibling 177 `decade-neighbours` asks the same question one order of magnitude down and must therefore take a group-A frame, not this one.)

**The mark that stays (Device 2).** Every seated plate stands up on the path at its own metre, `ART.setPlate` with its numeral, and stays there for the rest of the session. Nothing ever un-plants.

**Diegetic progress — two counts moving in opposite directions, both wordless.** Her pannier empties by one visible plate edge every time a plate seats; the path fills with standing plates. There is no dot record during Play and no "n of 12".

⚠ **Honest limit, stated rather than dressed.** Her *altitude* is not progress — she goes up and down as the numbers demand (346, 520, 175, 730). What shrinks toward the goal is the unsigned path and the load she carries, not her distance from the hut. This is the same accommodation `MISSIONS.md` §6.1 made for the owl's cradle, and L3's "distance shrinks visibly" is met by the pannier and the filling path.

## World
**Zone W (56 – 500) — the number line is the path, and nothing else on this screen is a number line.** The stage is 720 × 640 (`BUILD-CONVENTIONS` §2 permits a taller stage up to 720 × 720; this one needs it, because a tilted 0-1000 line, a 56-px tap grid and a 60-px animal with a plate above her do not fit in 364 px — see Rules, "measured layout corrections").

**The path (the 0 – 1000 line, tilted 17.2°, graduation exactly preserved).** Eleven posts, equally spaced ALONG the path:

`P_i = (22 + 68i, 440 − 21i)`, i = 0…10 → (22,440) (90,419) (158,398) (226,377) (294,356) (362,335) (430,314) (498,293) (566,272) (634,251) (702,230).

Position of any value: **`x(v) = 22 + 0.68v`, `y(v) = 440 − 0.21v`** — one formula, used by the goat, by every planted plate and by the switchback's parent lookup. Each post is `ART.post` (a 4 × 26 `structure` bar centred on its path point) with `ART.postLeg` (a 14-px hairline hanging from its foot) and `ART.postTag` (20 px `display`, `inkSoft`: 0, 100, 200 … 1000) centred at `(min(P_i.x, 684), P_i.y + 48)`. The clamp exists so the four-digit 1000 tag stays inside the safe margin; every other tag is centred on its post. `ART.pathBar` is the 6-px `structure` line P_0 → P_10.

**The ten stretches (the tappable ground).** Stretch i is the ground between post i and post i+1; its midpoint on the path is `M_i = (56 + 68i, 429.5 − 21i)` → M_0 (56,429.5) … M_9 (668,240.5). `ART.stretchPlate`, 56 × 56, built with `makeTile`, centred 10 px uphill of M_i at `(56 + 68i, 419.5 − 21i)` — a faint band of trodden ground on the uphill edge of the path. Measured: every band sits inside x ∈ [28, 696] and y ∈ [155, 448]; **the gap between adjacent bands is exactly 12 px**; the tap target is 56 × 56, meeting the 8-9 floor with no deviation and no argument (the original spec had to plead a 52-px width).

**The goat.** 50 wide × 60 tall, hooves on the path at M_i, facing uphill. She IS the marker: `ART.marker` and `ART.markerLocked` are deleted from the registry. **Palette ruling, and it is forced:** her body is `surface2` and its two permitted tints (`ART-BIBLE` §2). A teal body is a semantic collision (teal already means chosen / counted / correct) and an `accent` body would spend the §9.4 warm-body clause, which this game cannot afford — its one warm object is the ghost composite, and during a correction that composite sits within ~40 px of her, far inside the clause's 120-px exclusion. Near-white on cream is the hen's known separation weakness, so it is mitigated deliberately: the mandatory 3-px `ink` outline, `ink` horns, and a `structure` pannier and saddle — the pannier is both the strongest separation device on her silhouette and the progress display. **She must be rendered at 384 px on the cream stage and looked at (`ART-BIBLE` §11) before she is accepted.**

**The plate she carries (the abstract notation, integrated — `GAME-DESIGN-LAW` §2.5).** `ART.plate`, 76 × 48, `surface` with a 3-px `ink` edge, centred at `(clamp(M_i.x, 62, 658), M_i.y − 76)` with `ART.plateNumeral` at 36 px. It is drawn BEFORE the goat, so her head and horns overlap its lower edge and the two register as one object (`ART-BIBLE` §10.5). The clamp is the only fudge in the layout and it is invisible: at the two extreme stretches the plate rides 6 px off-centre on the pannier frame, which reads as a slung load.

**The pannier (the progress display).** `ART.packEdge`, a 3 × 22 `structure` bar, drawn once per plate still to plant, at `(M_i.x − 22 + 4k, M_i.y − 30)` for k = 0…remaining−1 (at most 11, spanning 44 px). Seen edge-on across her flank, it visibly thins from left to right as the session runs.

**Planted plates.** `ART.plateSpike` driven into the path at `(x(v), y(v))`, carrying `ART.setPlate` (44 × 26) and `ART.setNumeral` (20 px) centred 30 px above the path point, or 58 px above when this hundred already holds one plate — two waymarker heights, so two plates in the same hundred never collide. They accumulate and are never removed (the ratchet rule).

**The mountain.** One scene element (`ART-BIBLE` §4): `ART.mountain`, a `structureSoft` wash with a `line` edge, filling everything below the path down to y = 500 and rising at the right into a summit shoulder — polygon (0,500) (0,447) (600,261) (628,132) (720,120) (720,500). Above the path is bare `bg`. This is what makes the tilt read as a slope rather than a crooked diagram, and it is what puts the hut on top of something.

**The summit hut and the keeper.** `ART.hut`, 88 × 68, centred (656, 104), sitting on the shoulder; `ART.keeperIdle` (roster `hedgehog`, `surface2` body with `inkSoft` spine strokes — a LINE treatment, so no body-fill collision with the goat) 44 px tall in the doorway at (622, 116). `ART.hutSpur`, a 2-px `line` hairline from (700, 140) to (702, 222), joins the hut to post 10 so the hut is visibly the top of *this* path. Goat and hedgehog are unmistakable at 48 px: horned quadruped against spiky ball.

**The opened switchback (the "zoom", re-authored as terrain).** Instead of a ×10 container scale, the chosen stretch **unfolds into its own switchback** — a second, shallower inclined line across the same span, which is what a steep stretch of mountain actually gets. `SB_j = (22 + 68j, 440 − 12j)`, j = 0…10, sharing its downhill anchor with post 0 and ending at (702, 320); tilt 10.0°, so it never crosses the main path. Its ten legs reuse `ART.stretchPlate` centred at `(56 + 68j, 424 − 12j)`; its small posts are `ART.legPost` at SB_j and its tags `ART.legTag` (H00, H10 … H+100) at `(min(SB_j.x, 684), SB_j.y + 48)`. The main path drops to alpha 0.35, its bands and tags hide, and the two parent posts keep full contrast. `ART.openBracket` — two hairlines, one from SB_0 to the parent's lower post and one from SB_10 to its upper post — makes the wedge between the two lines into a callout that says exactly which slice of 0 – 1000 the wide line is showing. Measured: with these two slopes neither bracket line ever crosses either path, so the busiest frame in the game has no line crossings in it at all.

**A real switchback reverses direction; this one does not**, because reversing left-to-right would put 400 to the left of 300 and teach the wrong thing. The zig is expressed by the change of slope, never by a change of numeric direction.

**Zone T (0 – 56) is chrome only** — the language picker at (16, 16), hidden under `?embed=1`. No progress dots, no "n of 12", nothing else.

**Zone H (500 – 640) — the hand, deliberately nearly empty, because on a scale the world IS the hand.**
- **Caption** at (360, 524), 20 px `THEME.font.body` `THEME.colour.inkSoft`, `wordWrap` 600, max 2 lines: `S("whereIsIt")` and, at L3's second stage, `S("nowTheTens")`. Hidden while a correction plays.
- **PLANT**, `makeButton` 220 × 72 at (360, 580), label `S("plant")`, alpha 0.5 and disabled until she is standing on a stretch. That is the whole commit surface. No keypad, no stepper, no tray.

## How it plays
1. **Start screen.** Title "Signpost Mountain"; the goat `ART.goatIdle` at (360, 250) with a full pannier and the hut behind her; `S("premise")` under the title; `makeButton` `t("start")`; language picker (hidden under `?embed=1`). The game never auto-starts. `GameCore.reportHeight()` after build.

2. **The session opens on the world, not on a question.** The mountain, the eleven posts with their tags, the ten trodden bands, the hut with the keeper in the doorway, and the goat standing at the trailhead at (30, 448), below post 0, **not yet on any stretch** — so PLANT is dim. Her first plate, 346, is already on her frame; the pannier shows eleven more edges. Per F-42's own concession (R4) the first item demonstrates itself once: she takes one step uphill onto stretch 0 unbidden, then holds. Nothing tweens after that until the child taps.

3. **Item 1 — L1, 346.** Caption `S("whereIsIt")`. The child taps the band over M_3 (260, 366.5): she walks there (`ANIM.walk`, 260 ms + 40 ms per stretch crossed, capped at 700 ms; pose swaps `ART.goatIdle` → `ART.goatWalk` → `ART.goatIdle`), `tone("tap", 3)` — the pitch rises with altitude. Nothing is judged. She may be re-tapped anywhere, any number of times, for nothing. PLANT enables the moment she is on a stretch.
   **PLANT, correct.** She swaps to `ART.goatPlant`, drives the spike (`ANIM.plantDown`, 260 ms), the plate leaves her frame and **seats** at exactly (257.3, 367.3) = (x(346), y(346)) with `ANIM.seat`, `tone("correct")`. One pannier edge disappears. She swaps to `ART.goatHappy` for 600 ms — a discrete pose, never a bob — and the next plate rises onto her frame (`ANIM.appear`). Praise (first-try items only, rotation below). She does not move: item 2 begins exactly where item 1 ended (L2 persistence).

4. **PLANT, refused — the ground will not take it.** She drives the spike, it meets solid rock, the plate lifts 6 px and settles back onto her frame (`ANIM.refuse`, two cycles, 260 ms), `tone("nudge")`. Nothing is dropped, nothing is lost, nothing is marked, and **she does not move**.
   ⭐ **Her pose does not change on a refusal.** She holds `ART.goatIdle` throughout; `ART.goatHappy` fires only when a plate seats. There is no `oops` pose in this game's registry at all. This is stricter than the original spec (which nodded the owl on success and left the wrong-answer character state loose) and it is deliberate: the reviewer check in `GAME-DESIGN-LAW` §3 is *"look at the wrong-answer screenshot — if the character's state changed, reject."* The apparatus is the consequence; the creature never is.
   Then the enacted correction plays with every target `setEnabled(false)`: the error-class cue (Rules), then the stretch she is standing in opens (`ANIM.openPath`, 500 ms) — the main path dims, the switchback and its legs and tags rise in, `ART.openBracket` draws back to the two parent posts — and the ghost composite appears off the downhill or uphill end (`ANIM.ghostIn`) with its arrow. Hold 1300 ms, `ANIM.closePath` 400 ms. Total 2.2 s against the original's 1.2 s hold, and the world is frozen for all of it (EF 0.49 is the most expensive thing in the corpus to break).
   **Every refusal answers with a DIRECTION**, which is the whole anti-brute-force design: after one refusal the child has been told which way the number lies.

5. **Attempt 2.** She is still where she was, still holding the plate, PLANT re-enables the moment she moves. One tap of a band and one tap of PLANT.

6. **Attempt 3 — the show-me.** `ART.socket` (a slot cut in the ground) opens on the correct stretch with `ANIM.showMe` (a slow alpha pulse, never a flash); she walks there by herself over 800 ms and PLANT seats the plate as solved-with-help — no praise pop, `ART.dotEmpty` beside that plate on the Finish line. There is no attempt 4, no clock, and exactly zero ways the session can end other than by finishing.

7. **L3 — two stages in one item, e.g. 872.** Stage 1 as above: she walks to the 800 – 900 stretch and PLANTs. The ground **holds** but does not take the plate yet: the stretch opens (`ANIM.openPath`) and STAYS open, the caption becomes `S("nowTheTens")`, and the switchback's ten legs now stand for 800 – 810 … 890 – 900. She steps out onto the switchback at the leg matching where she stood. The child taps the 870 – 880 leg (N_7 = (532, 350)); she walks it; PLANT seats the plate at 872's own spot inside that leg; `ANIM.closePath` returns the main path to full contrast with the new plate standing on it at (615.0, 256.9). A wrong leg is refused exactly as above, with the tens-digit cue.

8. **A full worked session.** 1 · 346 ✓ · 2 · 520 ✓ → step up · 3 · L2 398: she stands in 400 – 500, refused → 400 – 500 opens, ghost "398" one short step below the 400 post, the post pulses → she walks down to 300 – 400 ✓ (helped; 398 stands planted, and a *different* 300s number re-queues) → step down · 4 · L1 175 ✓ · 5 · 730 ✓ → step up · 6 · re-queued 301 ✓ · 7 · L2 306: she stands in 0 – 100, refused → the stretch opens, ghost "306" off its uphill end, arrow up the mountain, the digit ring steps 3-0-6 with cairn columns → 300 – 400 ✓ · 8 · 690 ✓ · 9 · 405 ✓ → step up · 10 · L3 872 ✓ ✓ · 11 · L3 263: hundred ✓, then she takes the 230 – 240 leg (inverted tens), refused → the ring moves to the tens digit, the ghost stands at 263 inside 260 – 270 → 260 – 270 ✓ · 12 · L3 705 ✓ ✓ → Finish. **Total ACT time ≈ 11 s against `MISSIONS.md` R1's 60 s ceiling.**

9. **Finish.** The same mountain at full contrast with the path waymarked end to end: twelve plates standing at their own metres, `ART.dotFull` beside first-try plates and `ART.dotEmpty` beside helped ones, her pannier empty and flat. **The keeper comes down** — the hedgehog leaves the doorway (`ART.keeperWalk`) and walks the marked path to meet the goat, once, ≤ 1500 ms, the only time the waiting party changes state all session. `t("all_done")` at (360, 96); the goat `ANIM.celebrate`; optional `t("question_x_of_y")` with n = first-try items at (360, 546); `play_again` (250, 596) and `menu` (470, 596); `tone("finish")` once. Because the finish state depends on the child's answers (`MISSIONS.md` R6) the gate asserts *properties* — twelve plates present, each within 2 px of its own metre, the keeper on the path — never a pixel match.

Session ≈ 6-7 minutes.

## Art registry
```js
const ART = {
  mountain:     { kind: "shape", shape: "polygon", points: [[0,500],[0,447],[600,261],[628,132],[720,120],[720,500]], fill: "structureSoft", stroke: "line", strokeWidth: 2 },
  pathBar:      { kind: "shape", shape: "line", points: [[-340,105],[340,-105]], stroke: "structure", strokeWidth: 6 },
  post:         { kind: "shape", shape: "rect", w: 4, h: 26, fill: "structure" },
  postLeg:      { kind: "shape", shape: "line", points: [[0,0],[0,14]], stroke: "line", strokeWidth: 1 },
  postTag:      { kind: "text",  value: "", size: 20, font: "display", color: "inkSoft" },
  stretchPlate: { kind: "shape", shape: "roundRect", w: 56, h: 56, fill: "surface2", stroke: "line", strokeWidth: 1, radius: 8 },
  goatIdle:     { kind: "svg",   value: LCSArt.get("goat.idle"),  size: 60 },
  goatWalk:     { kind: "svg",   value: LCSArt.get("goat.walk"),  size: 60 },
  goatPlant:    { kind: "svg",   value: LCSArt.get("goat.act"),   size: 60 },
  goatHappy:    { kind: "svg",   value: LCSArt.get("goat.happy"), size: 60 },
  plate:        { kind: "shape", shape: "roundRect", w: 76, h: 48, fill: "surface", stroke: "ink", strokeWidth: 3, radius: 10 },
  plateNumeral: { kind: "text",  value: "", size: 36, font: "display", color: "ink" },
  packEdge:     { kind: "shape", shape: "rect", w: 3, h: 22, fill: "structure" },
  plateSpike:   { kind: "shape", shape: "rect", w: 3, h: 17, fill: "structure" },
  setPlate:     { kind: "shape", shape: "roundRect", w: 44, h: 26, fill: "surface", stroke: "ink", strokeWidth: 2, radius: 6 },
  setNumeral:   { kind: "text",  value: "", size: 20, font: "display", color: "ink" },
  hut:          { kind: "svg",   value: "<svg viewBox='0 0 88 68'>…hut, one storey, shuttered window, open door on the downhill face…</svg>", w: 88, h: 68, size: 88 },
  hutSpur:      { kind: "shape", shape: "line", points: [[0,0],[2,82]], stroke: "line", strokeWidth: 2 },
  keeperIdle:   { kind: "svg",   value: LCSArt.get("hedgehog.idle"), size: 44 },
  keeperWalk:   { kind: "svg",   value: LCSArt.get("hedgehog.walk"), size: 44 },
  switchBar:    { kind: "shape", shape: "line", points: [[-340,60],[340,-60]], stroke: "structure", strokeWidth: 5 },
  legPost:      { kind: "shape", shape: "rect", w: 3, h: 18, fill: "structure" },
  legTag:       { kind: "text",  value: "", size: 20, font: "display", color: "structure" },
  openBracket:  { kind: "shape", shape: "line", points: [[0,0],[0,0]], stroke: "line", strokeWidth: 2 },
  digitRing:    { kind: "shape", shape: "roundRect", w: 30, h: 46, stroke: "structure", strokeWidth: 3, radius: 8 },
  cairn:        { kind: "shape", shape: "rect", w: 22, h: 22, fill: "structure", stroke: "bg", strokeWidth: 1 },
  hoofPrint:    { kind: "shape", shape: "ellipse", w: 16, h: 11, fill: "inkSoft" },
  ghostPlate:   { kind: "shape", shape: "roundRect", w: 76, h: 48, stroke: "accent", strokeWidth: 3, radius: 10 },
  ghostNumeral: { kind: "text",  value: "", size: 36, font: "display", color: "accent" },
  offArrow:     { kind: "shape", shape: "polygon", points: [[0,0],[18,-11],[18,11]], fill: "accent" },
  socket:       { kind: "shape", shape: "roundRect", w: 56, h: 16, fill: "structureSoft", stroke: "structure", strokeWidth: 4, radius: 6 },
  dotEmpty:     { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:      { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
No emoji anywhere; every character and the hut are inline SVG per `BUILD-CONVENTIONS` §4. `goat.*` and `hedgehog.walk` are new roster drawings and must pass `_tools/art-sheet.js` at 48 / 96 / 192 / 384 px on the cream stage before they enter `_lib/art.js` (`ART-BIBLE` §11). **Exactly three entries carry `accent` — `ghostPlate`, `ghostNumeral`, `offArrow` — and they are one composite that is never drawn apart**, so the screen carries one warm highlight and only during a correction; the digit ring, the cairns and the post pulse are all `structure`. Colour-blind safety: the chosen stretch is marked by a goat standing on it, hundred posts are taller than leg posts, the arrow is a directional shape, and the two plate heights differ in shape as well as position.

## Animation registry
```js
const ANIM = {
  walk:       { duration: 260, ease: "Sine.InOut", trigger: "the goat container to a tapped stretch or leg midpoint (x/y set at call; +40 ms per stretch crossed, capped 700; 800 ms override for the show-me walk)" },
  plantDown:  { y: "+=8", duration: 260, ease: "Sine.In", yoyo: true, trigger: "she drives the spike; pose swapped to goatPlant for the duration" },
  seat:       { y: "+=6", duration: 220, ease: "Back.Out", trigger: "the plate settling into the ground it was accepted by" },
  refuse:     { y: "-=6", duration: 130, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "the plate lifting off solid rock and settling back on her frame; she does NOT move and does NOT change pose" },
  openPath:   { alpha: 1, duration: 500, ease: "Sine.Out", trigger: "the switchback container, its legs, posts, tags and openBracket rising in from alpha 0 while the main path container tweens to alpha 0.35 and its bands and tags hide" },
  closePath:  { alpha: 0, duration: 400, ease: "Sine.In", trigger: "the switchback clearing; the main path returns to alpha 1" },
  ghostIn:    { x: "+=36", alpha: 1, duration: 350, ease: "Sine.Out", trigger: "the ghost composite sliding in from the end the number lies beyond (from alpha 0; −=36 at the uphill end)" },
  cairnStack: { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "each cairn in the hundreds cue, 220 ms apart, with tone('tap', k)" },
  hoofStep:   { alpha: 1, duration: 160, ease: "Sine.Out", trigger: "each hoofPrint in the count-the-walking cue, 220 ms apart, with tone('tap', k)" },
  pulsePost:  { scale: 1.25, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "the post the number lies just below or just above (398 vs 400)" },
  ringStep:   { duration: 240, ease: "Sine.InOut", trigger: "digitRing moving to the next digit of the carried plate (x set at call)" },
  appear:     { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "the next plate rising onto her frame (from alpha 0, scale 0.6 — on the WRAPPER container, never on a kind:'svg' object, ART-BIBLE §9.3)" },
  fadeOut:    { alpha: 0, duration: 300, ease: "Sine.In", trigger: "digitRing, cairns, hoofPrints and the ghost composite clearing" },
  showMe:     { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "socket on the correct stretch (from alpha 0.25)" },
  keeperWalk: { duration: 1500, ease: "Sine.InOut", trigger: "finish only: the keeper leaving the doorway and walking the marked path to the goat" },
  celebrate:  { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish screen goat only" }
};
```
Poses are discrete SVG swaps, never tweens. **Nothing animates that the child did not just cause**: whenever any target is enabled the running tween count is zero (`MISSIONS.md` §4 / F-42 gate F1). No idle bob, no ambient mountain, and the keeper is a static drawing for the whole session.

## Screen layout
```
      0                                                          720
  0   +-------------------------------------------------------------+
      | [lang 16,16]                                                |  zone T   0- 56  chrome only
 56   +-------------------------------------------------------------+
      |                                  ___                        |
      |                                 /hut\  keeper (622,116)     |
      |                            [76x48 plate]                    |
      |                                        (goat) o             |  zone W  56-500
      |                     [56 band]  [56 band]  .-'  post 10      |   the path IS the line
      |        [56 band] .-'      1000 tag (684,278)                |   the hero and the hut are
      |  .-'  [56 band]      planted plates stand on the path       |   both in here, always
      |  post 0 (22,440)   0 tag (22,488)   mountain wash below     |
500   +-------------------------------------------------------------+
      |            "Where does it belong?"   (360,524)              |  zone H 500-640
      |                    [    PLANT    ]   (360,580)              |   <= 5 controls
640   +-------------------------------------------------------------+
```
Stage 720 × 640, `Scale.FIT`, no scrolling, static camera, fixed layout. Post i at `(22 + 68i, 440 − 21i)`; stretch band i, 56 × 56, centred `(56 + 68i, 419.5 − 21i)`; the goat's hooves at `(56 + 68i, 429.5 − 21i)`. Any value stands at `x(v) = 22 + 0.68v`, `y(v) = 440 − 0.21v`. While a stretch is open the switchback runs `(22 + 68j, 440 − 12j)` with its leg bands centred `(56 + 68j, 424 − 12j)`. Progress is diegetic: the pannier thins and the path fills. Nothing counts the items on this screen.

## Visual specification
- Background `THEME.colour.bg`. `ART.mountain` first, then `ART.pathBar` centred (362, 335), then the eleven `ART.post` + `ART.postLeg` + `ART.postTag`, then the ten `ART.stretchPlate` bands (`makeTile`), then `ART.hut` (656, 104) + `ART.hutSpur` (700, 140) + `ART.keeperIdle` (622, 116), then planted `ART.plateSpike` / `ART.setPlate` / `ART.setNumeral`, then `ART.packEdge` × remaining, then `ART.plate` + `ART.plateNumeral`, then the goat pose last. Draw order is the whole of the register discipline: her head overlaps the plate's lower edge, and she occludes the dimmed line when she stands in front of it.
- Planted plate height: 30 px above the path point for the first plate in a hundred, 58 px for the second; `ART.plateSpike` is drawn at 17 px or 45 px to reach it. At most two plates per hundred ever stand (Content).
- Language picker (16, 16), depth 1500, hidden under `?embed=1`; nothing in this game is given a depth that could cover it (`BUILD-CONVENTIONS` §3.2).
- Caption `S("whereIsIt")` / `S("nowTheTens")` at (360, 524), 20 px `THEME.font.body` `THEME.colour.inkSoft`, `wordWrap` 600, max 2 lines, hidden while a correction plays. `makeButton` PLANT 220 × 72 at (360, 580), alpha 0.5 while disabled.
- Correction furniture: `ART.digitRing` on one digit of the carried plate (digit centres at plate x − 24 / x / x + 24); `ART.cairn` stacked at `(clamp(M_i.x + 52, 68, 652), M_i.y − 14 − 26k)`, k = 0…2; `ART.hoofPrint` at each M between the valley and the named post; `ART.pulsePost` on a post; the ghost composite (`ART.ghostPlate` + `ART.ghostNumeral` + `ART.offArrow` on its outer edge) at (66, 470) below the switchback's downhill end or (652, 372) below its uphill end, with the one or two `ART.legTag`s its box would touch hidden while it is up.
- `ART.socket` centred on the correct band during the show-me.
- Tap floors: bands 56 × 56 with 12-px gaps, PLANT 220 × 72 — all ≥ 44 real px at a 704-px iframe. Keyboard: Left / Right walk her one stretch (one leg while a stretch is open), Enter plants, Tab walks the bands then PLANT; the focus ring is the only thing permitted to move while a choice is open. A drag of the goat moves her along the path and snaps to the nearest midpoint on release; a drag under 8 px is ignored.
- During a correction (~2.2 s) every band and PLANT are `setEnabled(false)`.
- ⚠ Post tag "1000" at 20 px is about 11 real px in a 400-px iframe — at the 8-9 floor and no lower. It **must be checked on a rendered 400-px screenshot and read by a person** before sign-off, not asserted.

## Content
Language-neutral (numerals only; four caption strings). Each item = (number; correct hundred-stretch; at L3 also the correct ten-leg).

- **L1** (numbers well inside a hundred; hundred stage only): 346 (300–400) · 520 (500–600) · 175 (100–200) · 730 (700–800) · 460 (400–500) · 850 (800–900) · 240 (200–300) · 615 (600–700)
- **L2** (numbers within 10 of a hundred, zero tens or ones, 999; hundred stage only): 398 (300–400) · 405 (400–500) · 301 (300–400) · 690 (600–700) · 106 (100–200) · 999 (900–1000) · 550 (500–600) · 210 (200–300) · 807 (800–900) · 495 (400–500)
- **L3** (two stages: the hundred, then the ten-leg inside it; includes the inverted-digit and transcoding traps): 346 (300–400; 340–350) · 872 (800–900; 870–880) · 519 (500–600; 510–520) · 263 (200–300; 260–270) · 705 (700–800; 700–710) · 138 (100–200; 130–140) · 991 (900–1000; 990–1000) · 427 (400–500; 420–430) · 105 (100–200; 100–110) · 654 (600–700; 650–660)

Play list of 12 per Rules (shuffle within level; levels in order). **Two standing rules on the play list, both forced by the world rather than by taste:** no hundred ever receives a third plate (two heights exist, a third would collide), and the correct stretch is never the same twice running — the fixed-world form of `BUILD-CONVENTIONS` §13, which cannot shuffle positions here because the posts are the number line. Each error class (digit-confusion, boundary, transcoding, inverted tens) keeps at least two unplayed members per hundred so the re-queue below always has somewhere to go; where a hundred is exhausted the re-queue takes the same error class in the nearest hundred holding fewer than two plates.

## Rules
- **Item count**: 12. Every item ends with its plate standing on the path; success is certain.
- **Difficulty progression**: 2 consecutive first-plant correct items (both stages at L3) → next level (cap L3).
- **Adaptation**: a refused first plant on 2 consecutive items → next item one level down (floor L1). A single refusal re-queues the item without changing level.
- **What happens on a correct answer**: the plate seats at its own metre with `ANIM.seat` and stands there for the rest of the session, one pannier edge disappears, `tone("correct")`, `ART.goatHappy` for 600 ms, praise rotation `["well_done","great_job","excellent","you_did_it","keep_going"]` on first-try items only, the next plate rises onto her frame. She does not move; the next item starts where this one ended.
- **What happens on a wrong answer** (each begins with `ANIM.refuse` + `tone("nudge")`; she does not move and does not change pose; every one of them ends by naming a DIRECTION):
  - Wrong hundred by a non-hundreds digit (346 → the 400s or 600s): the digit ring on the hundreds digit, three cairns, then the stretch opens with the ghost off its downhill end.
  - Wrong hundred by one (346 → 200–300, the F-114 tick-count error): hoof-prints from the valley up to the 300 post, one per stretch, then the stretch opens with the ghost off its uphill end.
  - Nearly-a-hundred (398 → 400–500; 405 → 300–400): the stretch opens, the boundary post `ANIM.pulsePost`s, the ghost stands one short step the other side of it.
  - Transcoding (306 → 0–100): the stretch opens with the ghost off its uphill end, then the ring steps 3-0-6 with cairn columns of 3, 0 and 6.
  - Wrong ten-leg at L3 (inverted tens and ones, or nearest-ten rounding): the ring moves to the tens digit and the ghost appears at the number's own spot inside the correct leg, whose two small posts pulse.
- **Retry behaviour**: per stage — attempt 1 → attempt 2 after the correction → attempt 3 with `ART.socket` open on the correct stretch and the goat walking there herself; PLANT then seats the plate as solved-with-help. No attempt 4.
- **Re-queue (F-41), and this deviates from the original — it is flagged, not slipped in.** The original returned *the same number*. A wrongly-planted plate may not be left standing (the ratchet rule forbids a world that gets worse) and a correctly-seated one cannot be seated twice, so a missed item returns as **a different number in the same hundred and the same error class** — miss 398 and 301 or 495 comes back, both "within 10 of a boundary". That is F-41's expanding re-queue verbatim (*"the same kind of obstacle in a new place"*) and `MISSIONS.md` R5's resolution, but it is a change of content behaviour and wants signing off.
- **Anti-brute-force guard — THE ONE-WAY PLANT.** P1's tile re-shuffle is unavailable and must be: the posts ARE the number line, and a post that jumped when you knocked on it would destroy the constancy that makes this a place. Four parts, all mechanical. **(1) Walking is free; asserting costs** — moving her is never judged, because that is a child reading a number line, which is the learning; the only assertion is PLANT. **(2) Every refusal answers with a direction, so there is exactly ONE uninformed attempt per item** — after one refusal the child has been told which way the number lies, so a second plant the same way is not a guess but ignoring the world, and there is no third free guess because attempt 3 is the show-me. (P1's re-shuffle grants N−1 uninformed guesses; this grants one.) **(3)** An item completed after any refusal never counts as first-try, is marked helped on the Finish line, and re-queues. **(4)** The candidate SET varies, never the positions: the correct stretch never repeats twice running and the twelve items spread across all ten hundreds. A random walker therefore reaches the show-me ladder on nearly every item, which is F-65's own criterion — and is *told*, rather than getting away with it.
- **Finish condition**: 12 items. No losing state, no clock, no score, no stars; the only way a session ends is by finishing (F-45, F-64).
- **Measured layout corrections to the approved mission brief, recorded so they are not read as drift.** (a) The stage is 720 × 640, not 720 × 560: a 17° 0-1000 line, a 56-px tap grid, a 60-px animal and a plate above her do not fit in a 364-px zone W, and `BUILD-CONVENTIONS` §2 permits the taller stage. (b) The hut is on the summit shoulder at (656, 104) rather than directly over the path's top end, because the goat's own head and plate occupy the top-right corner whenever she stands on the highest stretch. (c) The carried plate rides at −76 px rather than −78 so it clears the taller of the two planted-plate heights. (d) The switchback's slope (12 per hundred against the path's 21) is chosen so that neither it nor either bracket hairline ever crosses the main path.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("question_x_of_y")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific (`STRINGS`, all 11 locales per `BUILD-CONVENTIONS` §17): `title` = "Signpost Mountain"; `premise` = "The path has no signs. The keeper is waiting."; `whereIsIt` = "Where does it belong?"; `nowTheTens` = "Now the tens."; `plant` = "Plant".
- Text budget: the premise sits on the Start screen only; the Play screen carries one short sentence at a time, well inside the 8-9 allowance of two short sentences. Five game strings against the original's three — `plant` is the one that could be traded back to `t("ok")` for zero new locale work, at a real cost to the fiction. **Hand the English to the native panels as a source to audit, not as a target to translate** (`GAME-DESIGN-LAW` §7 and this repo's own history).

## Sound
`tone("tap", i)` when she arrives on stretch or leg i — the pitch rises with her altitude, so the line sounds like what it is; `tone("tap", k)` per cairn and per hoof-print in a correction, rising; `tone("nudge")` when the ground refuses the plate; `tone("correct")` when a plate seats; `tone("finish")` once. Silent under `?sound=off`; no audio files; nothing is spoken, so no number words in any language and no locale can be shut out by a missing voice.

## Testing checklist
- [ ] Works in all 11 languages (Start, "Question 1 of 12", All done, Play again, Menu, praise, the four game strings; every post tag and every plate is a numeral).
- [ ] Works at narrow width (400-px iframe: the whole path with eleven tags, the ten bands, the goat with her plate, the hut and PLANT all visible — and the "1000" tag read by a person, not asserted).
- [ ] Keyboard operable (Left / Right walk her one stretch, Tab walks the bands then PLANT, Enter plants).
- [ ] Never auto-starts.
- [ ] No losing state (a refused plant never ends the session; the show-me always completes the item; there is no clock and no score).
- [ ] **Mission — deletion test B.** Remove the goat, the plates and the hut (`mutate-mission.js`): the game must FAIL to complete a single item, because she is the marker, the cargo and the commit path. (The original spec fails this test: delete its owl at (110, 140) and every tile, Check and correction still works.)
- [ ] **Deletion test A.** Strip the numerals from the plates and the tags from the posts: every stretch accepts every plate and nothing playable is left — no dodging, no timing, no chase.
- [ ] **Instant-cut, deletion test C.** Patch every traversal tween to `duration: 0`: the session plays identically and the item log is byte-identical. ⭐ This passing means the walk is not mechanism — it is what makes the CLIMB reading true, and it must never be made load-bearing, or it becomes the padding the test exists to catch.
- [ ] **Displacement.** The commit handler reads `goat.pathPosition` — never a tile id, a selection index or a buffer. Grep it.
- [ ] **Ratchet rule.** Drive a full session answering wrongly on every item: the count of standing plates never decreases, no plate is ever removed, the pannier never refills, and the keeper never leaves the doorway before the finish.
- [ ] **The character is never the consequence.** In every wrong-answer screenshot the goat is in `ART.goatIdle` at the same coordinate as before the plant; there is no `oops` pose in the registry at all.
- [ ] **Freeze (F-42).** At every decision point of a driven session, whenever any target is enabled the running tween count is zero.
- [ ] No progress dots and no "n of 12" anywhere on the Play screen; the pannier thins by exactly one edge per seated plate.
- [ ] Planting 346 in the 400s rings the hundreds digit, stacks three cairns, opens the stretch and stands the ghost off its downhill end with the arrow pointing down the mountain.
- [ ] Planting a 300s number in 200 – 300 lays hoof-prints on the GROUND between posts, never on a post, one per stretch, with rising tones.
- [ ] Planting 398 in 400 – 500 opens that stretch, pulses the 400 post and stands the ghost one short step below it.
- [ ] Planting 306 in 0 – 100 stands the ghost off the uphill end and then steps the ring 3-0-6 with cairn columns of 3, 0 and 6.
- [ ] At L3 a correct hundred keeps the stretch open and asks for the tens; 263 planted in the 230 – 240 leg rings the tens digit and stands the ghost inside 260 – 270.
- [ ] Two numbers in the same hundred stand at the two different plate heights and do not overlap; no hundred ever receives a third.
- [ ] A missed item comes back as a different number in the same hundred and the same error class, and is marked helped on the Finish line.
- [ ] Total ACT time for a full session is under 60 s.
- [ ] With `?sound=off` nothing is audible; with sound on, walking uphill plays higher notes.
- [ ] The goat and the hedgehog are rendered at 384 px on the cream stage in every pose and looked at by a person before the art is accepted.
