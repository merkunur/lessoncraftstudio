# 108 — Five-Minute Ring

## Identity
- Slug: `five-minute-ring`
- Subject / topic: Mathematics / reading a clock to five minutes by counting the minute ring in fives from 12
- Age band: `8-9`
- Interaction pattern: `P3` — tap to count (the ledge stations, in order from 12), with a P1 choice of the window on the delivery leg
- Frame: THE ROUNDS
- Estimated build size: ~640 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P3. Mission contract: `design/MISSIONS.md` FRAME 5 and `design/GAME-DESIGN-LAW.md`. Time rule (F-113): hands differ in length AND shape AND colour; the hour sector shades on a wrong hour. Locale rule (F-113, F-211): nothing is spoken and no idiom is rendered; the answer is a digital numeral "h:mm" (12-hour, no am/pm, language-neutral; the 24-hour display some locales use for afternoons is out of scope — a clock face has no afternoon). Skip counting in fives is the mechanism (F-109): the ring is counted, never guessed.

**Note on the Objective's last clause, carried verbatim below.** "Taps the digital time that matches" now denotes the **delivery leg**: the time is the ordered pair *(the station the flame stands in, the window the hour arm is inside)*, and the numeral "h:mm" is written on the lamp's own plate at the instant the resident takes it. The notation is present in the same frame as the fiction at the moment of the answer (GAME-DESIGN-LAW §2.5); what is gone is the row of answer tiles, not the numeral.

## Learning
- Objective: Counts the minute ring in fives from 12 to the minute hand by tapping each mark in turn (5, 10, 15 …), then taps the digital time that matches, keeping the hour from the short hand.
- Prerequisites: Skip counts in fives to 60 (game 040 territory); reads o'clock and half-past times (105, 106). No reading beyond one caption.
- Curriculum links: F-1 (telling time in 8 of 15 sources), F-28 (quarter/5-minute: EN 6, US/FR/NL/DE 7 — the second clock tier), F-109 (skip counting; "rote chant not tied to groups" — here each chant word is a tapped mark), F-31 row "Clock quarter/5-min/minute" — conservative 8 → 8-9 (US 2.MD.C.7 "to the nearest five minutes"; England Y2 "five minutes"; Germany Klasse 2/3 "Minuten"; France CE2; Netherlands groep 5 "minuten"; Spain 2º/3º; Brazil EF03MA23; Nordic/IT local practice). F-113 (minute hand read as the numeral is the target error; level order ends at 5-minute).
- Common misconceptions (F-113, F-109), each with this game's response:
  1. **The minute hand's numeral read as the minutes ("big hand on 2 → 2 past").** Response: re-staged as the **impulse**, not the commit. The child's first step of an item goes straight to the station the flame stands in instead of walking round from 12. That stone does not bear weight (`ANIM.tip`, `tone("nudge")`); the world freezes and the stations from 12 up to the flame light in turn, each pressing its running total into the ring-gap (`ART.countStamp`, `ANIM.stampReplay`, 300 ms apart, `tone("tap", k)` climbing); the last stamp holds and pulses (`ANIM.stampHold`) while the dial numeral 37 px inboard **on the same spoke** pulses with it (`ANIM.numeralPulse`). Two numbers, one place, one moment. ~1600 ms, frozen. **Honest flag:** this error can no longer be *committed* as a final answer, because the ledge produces the minutes and "2 minutes" is not expressible anywhere in the world (see Rules → the lit-window set, part 1, and Risks). It is diagnosed at the impulse and corrected there. The unbuilt variant that would make it committable is specified in Risks.
  2. **Hour hand read as the nearest numeral — at 6:40 the short hand is near 7, so 7:40.** Response: the tortoise knocks at window h+1 (`ANIM.knock`) and the shutter stays shut. The world freezes; `ART.hourSector` shades the wedge from numeral h to the hour arm (`ANIM.sectorIn`) and the "h" numeral pulses (`ANIM.numeralPulse`) — and the arm is visibly still short of h+1, which is now a physical fact about a door the child is standing at rather than a shaded hint. ~1400 ms. The same response serves a knock at window h−1 (the numeral the arm has already left): the sector still runs numeral-h-to-arm, and the child sees the arm has moved on past their own door.
  3. **Counting in ones, or losing the count (5, 10, 15, 25).** Response: two halves, both enacted. (a) A station further round refuses to bear weight (`ANIM.tip`, `tone("nudge")`) — only the next station takes the tortoise's foot, so a skipped stone is refused by the stone; each step that does land presses its running total under the tortoise's feet with a rising tone (F-109 "each chant word lights a group"). (b) **New, and it catches the child who counted right and stopped early:** raising the lamp short of the flame lights nothing (`ANIM.raiseLamp` with no `ANIM.catch`), the world freezes, and the remaining stations between the tortoise and the flame light in turn with their stamps, the last one holding under the flame. ~1400 ms. The shortfall becomes the remainder of the correct method.
  4. **Starting the count at 1 on the first mark (mark 1 = "1", so the hand on 7 = "7 minutes").** Response: structural, as before and for the same reason. The ledge stones are blank until stepped on (`ART.ledgeStone` carries no numeral), the first stamp after 12 always reads "5", and the count does not begin until the body has passed 12 — which is a thing the child does, not a rule they are told. The "1" they might have read is now unmistakably somewhere else: on the dial at r = 62, inboard on the spoke, and it is a **house number**.
  5. **Hands swapped — the long hand's mark read as the hour (7:05 read as 1:35).** Response: available at **every** level now, not only L3. The tortoise knocks at the window the flame points at; the shutter stays shut; the resident (`ART.resident`) holds the tortoise's lamp up beside their own numeral so the same number is seen sitting in the wrong slot, the coral arm dims (`ANIM.dimHand`) and `ART.hourSector` shades numeral h to the hour arm. ~1400 ms.

## Mission
**Mission, as the child would say it.** *Get a lamp to every window before you climb back up to the owl.*

**Hero.** A tortoise (`ART.tortoise`), kept from the original roster — a creature that goes round a dial one deliberate step at a time **is** a clock hand, which is the thing being learned. It walks the tower's outer ledge, one station per tap, **always clockwise**, carrying a bundle of unlit lamps on its shell (`ART.bundleFull`) and one lamp in its paws (`ART.lamp`).

**Want (the visible lack, legible as one still frame).** A round tower whose twelve windows are all dark, a tortoise on the ledge with unlit lamps on its shell, and an owl at the top holding a dark lantern. No motion, no words: something is unlit and somebody is carrying the means to light it. The lack is the darkness; the resolution is visibly in the hero's own hands.

**Goal / the waiting party (Device 1).** The tower's great lantern (`ART.crownLamp`, dark) at (360, 72) with the owl (`ART.owl`) at (306, 72). It is on screen from the first tap, its coordinates never change, and it changes **only** at the finish — because the great lantern catches only from the twelve below it. It is never an approval meter: it does not react to a correct item.

**The single state variable.** `S` = **where the tortoise stands on the ledge** — its station, an integer 1-12 round the ring, plus which leg of the round it is walking.

- **Mathematical reading.** The number that station carries. The ledge and the dial put **two** numbers on every spoke, and which one `S` means depends on the leg. On the **counting leg**, station *k* is *5k* minutes past — the stamp the ledge presses under its feet. On the **delivery leg**, station *k* is *k o'clock* — the numeral painted inboard on the same spoke. The tortoise's position **is** a number; the clock's whole difficulty is that one position carries two of them, and this game makes the child stand on both.
- **Physical reading.** How far round the ledge it has walked from the top, and which window it is standing outside.

**The isomorphism — reading the clock is walking the clock.** The minute track is not drawn beside the tortoise; the minute track **is** the ledge it is standing on, and its own position on it is the minute count.

*The counting leg.* The tortoise steps station to station, clockwise, from the top. Each step presses a stamp into the ring-gap on that spoke: 5, 10, 15 … The count does not begin until it passes 12, because that is where a count of minutes begins. Only the **next** station bears weight. The minute arm is drawn out to r = 140 — across the ledge, correct clock design, since a minute hand points at the minute track — and its pointed coral tip is a flame. **The lamp catches only where the flame is.** So the minutes are never compared against a stored value: the child walks until the world will light what it is carrying, and the number sealed on the lamp's plate is the number under its feet at that moment.

*The delivery leg.* The lamp now reads " :10" and needs an hour. Two or three windows show a light behind them. The tortoise walks to one and knocks. **The shutter opens only for the window the hour arm has passed and not yet reached past** — which is the definition of the hour, enacted as a door. The teal hour arm is short and points at the numerals inboard; the child reads which house it has *left*, not which it is nearest. The plate fills to "3:10" as the resident takes the lamp.

**The commit is a position, both times.** There is no tile, no keypad, no Check. `answer = f(hero.station)`, twice, and the tap that carries the answer is a tap on **the tortoise** — *act where you stand* — so the handler cannot read anything but a position:

```
lightLamp()  // tapping the tortoise on the counting leg
  accept  iff  flameStation(minuteArm.angleDeg) === hero.station     // does the flame reach me
knock()      // tapping the tortoise on the delivery leg
  accept  iff  hourArm.angleDeg >= hero.station * 30
          &&   hourArm.angleDeg <  (hero.station + 1) * 30           // has the hour arm passed my door
```

Nothing anywhere in the game stores an `answer` field. Both handlers ask the world whether it will accept the move (MISSIONS.md 1.1); both are a transition of `S`.

**Two verbs, learned once.** Tap a place to go there. Tap the tortoise to act.

**The mark that stays (Device 2).** A lit lamp in a window. It burns for the rest of the session and nothing ever puts it out.

## World
Stage **720 × 560** — the canonical stage. The original spec's 720 × 640 is given up, and that is what forces the single-ring geometry: two concentric rings of twelve 56 px targets need r_inner ≥ 131 and r_outer ≥ 191, i.e. 438 px of vertical against zone W's 364. So the hour houses and the minute stones are **the same twelve tiles wearing two roles**, which turned out to be the best idea in the design and arrived as a forced move.

```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang 16,16]        owl(306,72)  crown lantern(360,72)        │  zone T  0-56
 56   ├──────────────────────────────────────────────────────────────┤
      │            station 12 (360,116)                               │
      │     st 11 (287,136)                      st 1 (433,136)       │
      │  st 10 (234,189)    ╭ dial (360,262) ╮        st 2 (486,189)   │  zone W
      │  st 9 (214,262)     │  face r=80     │        st 3 (506,262)   │  56-420
      │  st 8 (234,335)     ╰────────────────╯        st 4 (486,335)   │  THE WORLD
      │     st 7 (287,388)                       st 5 (433,388)       │
      │            station 6 (360,408)  [tile reaches y=436]           │
420   ├──────────────────────────────────────────────────────────────┤
      │        caption (360,470)   ·   tower shadow (360,444)          │  zone H
      │        no controls of any kind                                 │  420-560
560   └──────────────────────────────────────────────────────────────┘
```

**Zone W — the world.** The tower is seen from directly above; its clock face is its roof. `ART.towerWall` is a low-contrast wash disc, r = 176, centred (360, 262) — the one scene element (ART-BIBLE §4). The dial sits on its roof: `ART.face` r = 80, twelve `ART.tickMajor` at r = 74, `ART.numeral` at r = 62 (all twelve at L1/L2, only "12" at L3), `ART.hourArm` length 48, `ART.minuteArm` length 140, `ART.pin` r = 6.

**The ledge** is twelve stations at r = 146, each a 56 × 56 tap target (the 8-9 floor), centre to centre 2 × 146 × sin 15° = **75.6 px**, so the gap is **19.6 px** (floor 12). Station *k* is centred at (360 + 146 sin(30k°), 262 − 146 cos(30k°)): 12 (360, 116) · 1 (433, 136) · 2 (486, 189) · 3 (506, 262) · 4 (486, 335) · 5 (433, 388) · 6 (360, 408) · 7 (287, 388) · 8 (234, 335) · 9 (214, 262) · 10 (234, 189) · 11 (287, 136). Each is a doorstep (`ART.ledgeStone`) with a shuttered window above it (`ART.window`). **Station 6's tile reaches y = 436, sixteen pixels into zone H** — declared, and exactly what *"the world gets the height"* means.

**The count stamp** is a 32 px disc at r = 99, in the clean 38 px band between the face edge (r = 80) and a tile's inner edge (r = 118). So along **one radius**, from the middle out, the child sees: the hour numeral at r = 62, the minute stamp at r = 99, the doorstep at r = 146. The whole lesson lies on a single spoke, and misconception 1 becomes two objects 37 px apart rather than an argument.

**The goal** is present from tap one and unchanged until the finish: `ART.crownLamp` (dark) at (360, 72), 26 px, with `ART.owl` at (306, 72), 28 px — both above station 12, where the tortoise begins and ends every lap.

**The hero** stands **on** a station, 46 px, and its own tap target is the 56 × 56 tile it occupies. Two targets never share a place: you cannot travel to where you already are, so the tile under the tortoise is the *act* target and never a *travel* target.

**Zone H — the hand — is EMPTY of controls, and that is the point: the world is the hand.** It carries the caption at (360, 470) (one phrase, swapping with the leg), `ART.towerShadow` at (360, 444), and the lower arc of the ledge reaching 16 px into it. No tray, no keypad, no answer row, no Check, no OK. Every interactive thing in this game is a place in the world or the hero itself, so apparatus and character are never more than one saccade apart and no panel ever slides over the tower (F-42 check F3).

**Interactive element count, worst case simultaneously live:** the ledge as ONE instrument (during a count exactly one station bears weight; the child learns it once) + up to 3 lit windows as independent candidates + the tortoise = **5**, inside the F-69 budget of 10 with room to spare. The original spec, at twelve ring marks plus four tiles, was at sixteen.

**Progress is diegetic and there is no dot rail on the play surface** (BUILD-CONVENTIONS §6 as amended 2026-09-06). What accumulates: **lit windows**, permanently. What shrinks: the bundle of unhung lamps on the shell (`ART.bundleFull` → `ART.bundlePart` → `ART.bundleLast`), in stages, never as a number and never as dots. What waits: the owl's dark lantern. A still frame at 400 px reads *"most of the way round, four windows still dark"* with nothing moving.

## How it plays
1. **Start screen.** `S("title")` ("Light the Tower"), the tower drawn dark with `ART.tortoise` on station 12 and `ART.owl` beside the unlit `ART.crownLamp`, `S("premise")` at (360, 356), `makeButton` `t("start")` at (360, 452), language picker at (16, 16). A breathing idle (2 % scale, 3 s) is permitted here and on Finish only. **Never auto-starts.**
2. **Item 1 opens (L1, 3:10).** The hands are set: hour arm at 3 × 30° + 10 × 0.5° = 95°, minute arm at 10 × 6° = 60°, so the flame stands in station 2. The tortoise is on station 12 with `ART.lamp` in its paws, plate blank. Caption reads `S("countFives")`. Every window is dark. **Frozen: zero tweens running, two targets live** — station 1 (the next stone) and the tortoise's own tile.
   - **The one sanctioned demonstration (F-42, R4).** On item 1 only, if nothing is tapped for 1200 ms, the tortoise steps once to station 1 (stamping "5") and raises and lowers its lamp once (`ANIM.raiseLamp`), then holds. It teaches both verbs wordlessly, fires once per session, is not an attempt, and produces no refusal cue. If the child taps first it never fires.
3. **The counting leg.** Tapping station 1 hops the tortoise there (`ANIM.step`, 130 ms), `tone("tap", 1)`, and presses `ART.countStamp` reading "5" into the ring-gap at r = 99 on that spoke (`ANIM.stampIn`); the stone it left becomes `ART.ledgeStoneDone`. Station 2 becomes the live stone. Tapping station 2 → "10", `tone("tap", 2)`. The pitch climbs round the ring (F-109, F-213).
   - **Tapping a station further round** (skipping): it tips 6° and settles (`ANIM.tip`), `tone("nudge")`, the tortoise's foot withdraws, the stone is still a stone and still there. **Not an attempt.** If the station tapped is the one the flame stands in, misconception 1's correction plays; otherwise misconception 3(a)'s.
   - **Tapping a station already stamped:** nothing. One-to-one, enforced by the stone.
4. **Lighting the lamp.** With the tortoise on station 2, the child taps **the tortoise**. It raises the lamp (`ANIM.raiseLamp`) into the flame, the wick takes (`ANIM.catch`, `ART.lamp` → `ART.lampAlight`, `tone("tap", 12)` — the top of the climb), and the plate seals with " :10". Caption swaps to `S("whichWindow")`. **Two or three windows now show a light** (`ART.window` → `ART.windowLit`), chosen by the hands and not by the layout: window 3 (the true hour), window 4 (h+1) and window 2 (the station the flame is in). 300 ms. Frozen again.
   - **Raising the lamp short of the flame** (the tortoise is on station 1, say): it lifts and the wick **does not take**. Nothing is dropped; the lamp is still in its paws. The world freezes and station 2 lights with its stamp "10", holding under the flame (misconception 3(b), ~1400 ms). The child then walks on. First-try is forfeit for this item.
5. **The delivery leg.** Tapping a lit window glides the tortoise **clockwise** along the ledge to it (`ANIM.glide`, capped 600 ms whatever the arc). It never travels anticlockwise at any point in the session. Then the child taps **the tortoise** to knock (`ANIM.knock`).
   - **Correct — window 3.** The shutter rises and stays up (`ANIM.shutterUp`, 500 ms). `ART.resident` takes the lamp; the plate fills to "3:10"; the lamp glides into the opening (`ANIM.lampIn`) and becomes `ART.lampHung`, **lit for the rest of the session**. `tone("correct")`, `GameCore.showPraise` with the next praise key on a first-try item. The shell bundle steps down a stage where the threshold is crossed (`ANIM.appear`). Then the tortoise glides on clockwise to station 12 (`ANIM.glide`, capped 600 ms) while the stamps clear behind it and the hands turn to the next item's angles (`ANIM.handsTurn`, concurrent — it costs no extra time).
   - **Wrong — window 4 (nearest-numeral hour).** Misconception 2's response. ~1400 ms, frozen, cannot be tapped through. The tortoise still holds the lamp; it may walk on.
   - **Wrong — window 2 (hands swapped).** Misconception 5's response. ~1400 ms, frozen.
   - **Second wrong knock:** the matching response again.
   - **Third attempt — the show-me.** The correct window's shutter opens once in a single 500 ms move (`ANIM.shutterUp`) and then **stays open and bright, static** — `ART.showRing` appears round it with `ANIM.appear` and does **not** pulse, because nothing may animate while a choice is open (F-42 check F1; this is a named, deliberate departure from BUILD-CONVENTIONS §8's pulsing show-me). Walking there and knocking completes the item as solved-with-help. **The item always completes.**
   - **Knocking with a lamp already delivered, or tapping an unlit window:** nothing happens; an unlit window is not a candidate.
6. **Items 2-12** per Content and Rules. The tortoise begins item *k+1* exactly where it ended item *k* — station 12 — so persistence holds by construction, and it has walked one continuous clockwise procession all session.
7. **Finish.** The twelfth lamp is hung; the tortoise glides its last arc to station 12 and stands beside the owl with its shell empty. The owl lowers the great lantern to the nearest lit window and **it catches** (`ART.crownLamp` → `ART.crownLit`, `ANIM.crownCatch`) — the only thing in the game that has been waiting since the first tap. `ART.tortoiseHappy` plays `ANIM.celebrate` once. The Finish scene re-draws the **same tower at the same play coordinates** (MISSIONS.md §9.1 rule 6): the twelve stations, the lamps burning where the child hung them. The dial's hands, ticks, numerals and pin are removed — the clock has been read — and `t("all_done")` sits inside the empty face at (360, 262), 36 px, `wordWrap` 150, at most two lines. Each hung lamp's `ART.plate` is drawn out from its window to r = 192 (56 × 20, or 56 × 34 for a window that took two lamps), 20 px display, so all twelve times read at once — **the world the child made is the summary**, so the original spec's twelve chips are not printed anywhere; they are already on the tower. A small `ART.dotFull` (first try) or `ART.dotEmpty` (helped) sits at each plate's left edge, which §10 permits on Finish and nowhere else. `makeButton` `play_again` at (170, 505) and `menu` at (550, 505) — placed left and right of centre so they clear station 6's plate at x 332-388. `tone("finish")` once. No score, no stars, no count of anything.

Session ≈ 6-7 minutes.

## Art registry
```js
const ART = {
  /* --- the hero, the residents, the waiting party --- */
  tortoise:      { kind: "svg", value: LCSArt.get("tortoise.idle"),  size: 46, fallback: "🐢" },
  tortoiseWalk:  { kind: "svg", value: LCSArt.get("tortoise.walk"),  size: 46 },
  tortoiseAct:   { kind: "svg", value: LCSArt.get("tortoise.act"),   size: 46 },   // lamp raised
  tortoiseHappy: { kind: "svg", value: LCSArt.get("tortoise.happy"), size: 46 },   // finish only
  owl:           { kind: "svg", value: LCSArt.get("owl.idle"),       size: 28, fallback: "🦉" },
  resident:      { kind: "svg", value: LCSArt.get("mouse.idle"),     size: 18, fallback: "🐭" },
  /* --- the tower --- */
  towerWall:     { kind: "shape", shape: "circle", r: 176, fill: "surface2", stroke: "line", strokeWidth: 3 },
  towerShadow:   { kind: "shape", shape: "ellipse", w: 300, h: 22, fill: "ink" },        // alpha 0.08
  ledgeStone:    { kind: "shape", shape: "roundRect", w: 56, h: 56, fill: "surface", stroke: "line", strokeWidth: 2, radius: 12 },
  ledgeStoneDone:{ kind: "shape", shape: "roundRect", w: 56, h: 56, fill: "structureSoft", stroke: "structure", strokeWidth: 3, radius: 12 },
  window:        { kind: "shape", shape: "roundRect", w: 30, h: 34, fill: "inkSoft", stroke: "ink", strokeWidth: 2, radius: 6 },
  windowLit:     { kind: "shape", shape: "roundRect", w: 30, h: 34, fill: "surface", stroke: "ink", strokeWidth: 2, radius: 6 },
  showRing:      { kind: "shape", shape: "roundRect", w: 44, h: 48, stroke: "structure", strokeWidth: 4, radius: 10 },
  /* --- the dial --- */
  face:          { kind: "shape", shape: "circle", r: 80, fill: "surface", stroke: "structure", strokeWidth: 4 },
  tickMajor:     { kind: "shape", shape: "rect", w: 4, h: 10, fill: "ink" },              // 12 of them, r = 74
  numeral:       { kind: "text",  value: "", size: 20, font: "display", color: "ink" },   // 1-12 at r = 62 (L1-L2); "12" only (L3)
  hourArm:       { kind: "shape", shape: "roundRect", w: 12, h: 48, fill: "structure", radius: 6 },   // SHORT, WIDE, ROUNDED, TEAL
  minuteArm:     { kind: "shape", shape: "polygon", points: [[-4,0],[4,0],[4,-118],[9,-118],[0,-140],[-9,-118],[-4,-118]], fill: "accent", stroke: "inkOnAccent", strokeWidth: 1 },  // LONG, THIN, FLAME-TIPPED, CORAL
  pin:           { kind: "shape", shape: "circle", r: 6, fill: "ink" },
  hourSector:    { kind: "shape", shape: "arc", r: 76, fill: "structureSoft", stroke: "structure", strokeWidth: 2 },   // wedge numeral h -> hour arm
  countStamp:    { kind: "shape", shape: "circle", r: 16, fill: "structure" },            // "5","10",… 20 px display in bg
  /* --- the lamps --- */
  lamp:          { kind: "svg", value: LCSArt.get("lamp.unlit"),  size: 20 },
  lampAlight:    { kind: "svg", value: LCSArt.get("lamp.lit"),    size: 20 },
  lampHung:      { kind: "svg", value: LCSArt.get("lamp.hung"),   size: 16 },
  plate:         { kind: "shape", shape: "roundRect", w: 56, h: 20, fill: "surface", stroke: "structure", strokeWidth: 2, radius: 6 },   // "h:mm", 20 px display ink
  bundleFull:    { kind: "svg", value: LCSArt.get("lampBundle.full"), size: 26 },   // 12-7 unhung
  bundlePart:    { kind: "svg", value: LCSArt.get("lampBundle.part"), size: 22 },   // 6-2 unhung
  bundleLast:    { kind: "svg", value: LCSArt.get("lampBundle.last"), size: 16 },   // 1 unhung
  crownLamp:     { kind: "svg", value: LCSArt.get("lantern.dark"), size: 26 },
  crownLit:      { kind: "svg", value: LCSArt.get("lantern.lit"),  size: 26 },
  /* --- Finish screen only (BUILD-CONVENTIONS §6 as amended: the first-try record survives here) --- */
  dotEmpty:      { kind: "shape", shape: "circle", r: 6, stroke: "line", strokeWidth: 2 },
  dotFull:       { kind: "shape", shape: "circle", r: 6, fill: "structure" }
};
```
**Colour discipline.** The palette carries no red (ART-BIBLE §10.2). The tortoise and the owl are drawn from the `surface2` and `structureSoft` tint pairs with a 3 px `ink` outline — never a `structure` fill, because teal already means *counted / chosen*, and never an `accent` tint, because the one coral thing on this screen must be the flame. `ART.hourSector` therefore uses a teal wash rather than the original's coral: the sector belongs to the teal hour arm, and reserving coral for the flame keeps ART-BIBLE §2's "ONE warm highlight per screen" true at every frame. A lit window reads by **value and shape** (open shutter, white pane against the wash) as well as hue, so meaning is never carried by colour alone (§12).

**F-113's three differences, re-asserted against the new lengths.** Length 48 against 140; shape a rounded bar against a flame point; colour teal against coral. All three hold, and more strongly than before. The minute arm being longer than the face (140 against r = 80) is correct clock design — a minute hand points at the minute track, and here the minute track is the ledge.

**Depth order.** towerShadow → towerWall → ledgeStone/ledgeStoneDone → window/windowLit → lampHung → face → tickMajor → numeral → hourSector → hourArm → minuteArm → pin → countStamp (above the arms, so the flame's own spoke never occludes its number) → tortoise → crownLamp/crownLit → owl → language picker (depth 1500, §3.2).

## Animation registry
```js
const ANIM = {
  step:         { duration: 130, ease: "Sine.InOut", trigger: "the tortoise hops to the next station (x,y set by the game)" },
  glide:        { duration: 600, ease: "Sine.InOut", trigger: "the tortoise travels clockwise along the ledge; CAPPED at 600 ms whatever the arc length" },
  stampIn:      { alpha: 1, scale: 1, duration: 160, ease: "Back.Out", trigger: "a countStamp pressed into the ring-gap (from alpha 0, scale 0.5)" },
  stampReplay:  { alpha: 1, scale: 1, duration: 150, ease: "Back.Out", trigger: "each countStamp re-appearing in order during a frozen correction, 300 ms apart (from alpha 0, scale 0.5)" },
  stampHold:    { scale: 1.35, duration: 220, ease: "Back.Out", yoyo: true, trigger: "the last stamp of a correction, under the flame" },
  raiseLamp:    { y: "-=14", duration: 200, ease: "Back.Out", yoyo: true, trigger: "the tortoise lifts its lamp — ALWAYS caused by a tap, never an idle" },
  catch:        { scale: 1.25, duration: 300, ease: "Back.Out", yoyo: true, trigger: "the wick takes at the flame" },
  tip:          { angle: 6, duration: 90, ease: "Sine.InOut", yoyo: true, trigger: "a station that will not bear weight" },
  knock:        { scale: 1.06, duration: 110, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "the tortoise knocks at a window" },
  shutterUp:    { y: "-=30", duration: 500, ease: "Sine.Out", trigger: "a shutter opens and STAYS open — correct knock, and the third-attempt show-me" },
  lampIn:       { duration: 260, ease: "Sine.InOut", trigger: "the lamp glides into the window opening" },
  numeralPulse: { scale: 1.4, duration: 250, ease: "Back.Out", yoyo: true, repeat: 1, trigger: "the hour numeral during a sector correction; the dial numeral on the flame's spoke during misconception 1" },
  sectorIn:     { alpha: 0.35, duration: 250, ease: "Sine.Out", yoyo: true, hold: 1200, trigger: "hourSector wedge numeral-h-to-arm (from alpha 0), then fades" },
  dimHand:      { alpha: 0.3, duration: 250, ease: "Sine.Out", yoyo: true, hold: 1200, trigger: "the minute arm during the swapped-hands correction" },
  handsTurn:    { duration: 500, ease: "Sine.InOut", trigger: "both arms rotate clockwise to the next item's angles, CONCURRENT with the return glide" },
  appear:       { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "showRing; the shell bundle changing stage (from alpha 0, scale 0.6)" },
  lift:         { y: "-=8", duration: 200, ease: "Sine.InOut", yoyo: true, trigger: "the idle cue — ONE lift-and-settle after 8 s of no tap, never a loop" },
  crownCatch:   { scale: 1.2, duration: 400, ease: "Back.Out", yoyo: true, trigger: "the great lantern catching, finish only" },
  celebrate:    { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "the finish tortoise" }
};
```
Poses are discrete swaps, not tweens: `ART.tortoise` (idle, standing) ↔ `ART.tortoiseWalk` (during `step` and `glide`) ↔ `ART.tortoiseAct` (during `raiseLamp` and `knock`) ↔ `ART.tortoiseHappy` (finish). **The tortoise's own state never changes on an error** — no fall, no sag, no sorry face: only the apparatus answers (GAME-DESIGN-LAW §3.0).

## Screen layout
Stage **720 × 560**, `Scale.FIT`, fixed layout, nothing reflows.

```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang 16,16]      ART.owl (306,72)   ART.crownLamp (360,72)   │  zone T   0- 56
 56   ├──────────────────────────────────────────────────────────────┤
      │                  station 12 (360,116)                         │
      │       st 11 (287,136)                    st 1 (433,136)       │
      │   st 10 (234,189)   ART.face r=80 (360,262)   st 2 (486,189)  │
      │   st  9 (214,262)   numerals r=62 · ticks r=74  st 3 (506,262)│  zone W
      │   st  8 (234,335)   ART.countStamp r=99         st 4 (486,335)│  56-420
      │       st  7 (287,388)                    st 5 (433,388)       │
      │                  station  6 (360,408)  tile bottom y=436       │
420   ├──────────────────────────────────────────────────────────────┤
      │      ART.towerShadow (360,444) · caption (360,470) 22 px      │  zone H
      │                    no controls at all                          │  420-560
560   └──────────────────────────────────────────────────────────────┘
```

- **Station geometry.** Twelve `makeTile` 56 × 56 at r = 146 round (360, 262), station *k* at 30*k*° clockwise from 12. Centre to centre 75.6 px, gap 19.6 px (floor 12, §3). Station 6's tile occupies y 380-436, sixteen pixels below the zone boundary — deliberate and declared.
- **The hero's target is the tile it stands on.** No two targets ever occupy the same place: the occupied tile is the *act* target and is removed from the travel set.
- **Live targets, counting leg:** the next station, plus the tortoise. **Live targets, delivery leg:** the two or three lit windows (their 56 × 56 station tiles), plus the tortoise. Nothing else on the stage is tappable.
- **Tab order:** the tortoise first, then the live stations clockwise starting from 12. Enter / Space taps. Arrow keys move the focus ring (library behaviour, §3).
- **Caption** at (360, 470), 22 px `THEME.font.body` `THEME.colour.inkSoft`, `wordWrap` 560, one line — `S("countFives")` on the counting leg, `S("whichWindow")` on the delivery leg. It is the only text on the play surface.
- **Safe margins:** the leftmost art is station 9's tile at x = 186, the rightmost station 3's at x = 534, both far inside the 16 px margin. The topmost art is the crown lantern at y = 59.
- **Narrow width.** At a 400 px iframe the FIT scale is 0.556: a 56 px tile renders 31 px, a 20 px numeral 11 px, the whole tower 196 px across. The checklist measures this.

## Visual specification
- Background `THEME.colour.bg`. Zone T carries the language picker at (16, 16) and, above the tower, `ART.owl` (306, 72) and `ART.crownLamp` (360, 72). **Progress is diegetic: nothing abstract is drawn along the top.**
- `ART.towerWall` at (360, 262), r 176, `surface2` fill with a `line` edge — the single scene element, a low-contrast wash (ART-BIBLE §4). `ART.towerShadow` at (360, 444), `ink` at alpha 0.08.
- Twelve `ART.ledgeStone` at the station coordinates; a station the tortoise has stepped on swaps to `ART.ledgeStoneDone` for the rest of the lap (structureSoft fill **and** a 3 px `structure` stroke — two cues, never colour alone).
- `ART.window` sits 22 px inboard of each station's centre, 30 × 34; a candidate window swaps to `ART.windowLit` with `ART.resident` drawn behind the pane; a delivered window keeps `ART.windowLit` plus `ART.lampHung` for the remainder of the session and never reverts.
- The dial at (360, 262): `ART.face` r 80, twelve `ART.tickMajor` at r 74, `ART.numeral` 20 px at r 62 (all twelve at L1-L2; only "12" at L3), `ART.hourArm` at (h mod 12) × 30° + m × 0.5°, `ART.minuteArm` at m × 6°, `ART.pin`. `ART.hourSector` sits at alpha 0 until a correction.
- `ART.countStamp` at r 99 on a stepped spoke, with its running total in 20 px `THEME.font.display` `THEME.colour.bg`, drawn **above** the arms so the flame's own spoke never occludes its number. Stamps clear during the return glide at the end of an item; hung lamps never clear.
- The tortoise, 46 px, centred on its station; `ART.lamp` in its paws with `ART.plate` below it (blank, then " :mm", then "h:mm"); the shell carries `ART.bundleFull` / `ART.bundlePart` / `ART.bundleLast` by threshold, and nothing when the last lamp is in its paws.
- `ART.showRing` 44 × 48 round the show-me window, static, alpha 1, no repeat.
- Tap floors: every target 56 × 56 with a 19.6 px gap, at the 8-9 band floor of 56. Contrast: `bg` numerals on `structure` stamps; `ink` on `surface` plates; never `surface` on `accent`.

## Content
Language-neutral (a clock face, digital numerals, three short captions). An item is a time; the candidate windows are computed from the hands, not authored.

**THE LIT-WINDOW SET (the candidate rule).** For a time *h:mm* the lit windows are the union of `h` (the true hour), `h+1` (the nearest-numeral hour, wrapping 12→1) and `mm/5` (the station the flame stands in — the swapped-hands hour). If that union has fewer than three members, `h−1` is lit as well (the numeral the arm has already left, a real reading error at small minute values, wrapping 1→12). Positions are fixed forever, because the tower is a place; **identity changes every item**, which is the anti-guessing property (MISSIONS.md §6).

- **L1** (minutes 5-30, the short arm in the first half of its hour; full numerals): **3:10** lit {3, 4, 2} · **7:25** {7, 8, 5} · **1:05** {1, 2, 12} *(h+1 and the flame both fall on 1-adjacent houses, so h−1 = 12 joins — the only item in the pool that needs the fourth clause)* · **10:20** {10, 11, 4} · **4:15** {4, 5, 3} · **8:30** {8, 9, 6}
- **L2** (minutes 35-55, the short arm close to the NEXT numeral — the nearest-numeral trap): **2:50** {2, 3, 10} · **6:40** {6, 7, 8} · **9:55** {9, 10, 11} · **11:35** {11, 12, 7} · **5:45** {5, 6, 9} · **1:50** {1, 2, 10}
- **L3** (the face carries only "12", so the house must be counted round from the top; minutes with a leading zero): **7:05** {7, 8, 1} · **3:55** {3, 4, 11} · **12:20** {12, 1, 4} · **10:40** {10, 11, 8} · **6:10** {6, 7, 2} · **4:35** {4, 5, 7}

Every set has exactly three members, so a random knock is right about one time in three at every level (F-65).

Note on **1:05**: the flame stands in station 1, which is also the true hour — the swapped-hands error is invisible on this item, and the world says so honestly by lighting 12 instead. Note on **2:50**: the flame stands in station 10, and "2:10" was the original spec's trap tile; here the trap survives as a lit window at 10 and is refused by a shut shutter.

Play list: 12 items, shuffled within level, levels in order per Rules; no time repeats within a session; **no hour is the correct window on two consecutive items** — the fixed-world form of §13's "never the same slot twice running" (MISSIONS.md §9.1 rule 5). Where the same hour recurs across levels its window takes a second lamp on the same hook and its Finish plate carries two lines.

## Rules
- **Item count**: 12.
- **Difficulty progression**: 3 consecutive first-try correct → next level (cap L3). "First-try" = the first knock of the item opened the shutter, and the lamp caught at the first raise. Out-of-order station taps during the count are refused, not judged, and do not count against it.
- **Adaptation**: a wrong knock, a short raise, or a wrong first-try on 2 consecutive items → next item one level down (floor L1). The current item is never abandoned.
- What happens on a **correct answer**: the shutter rises and stays (`ANIM.shutterUp`), the resident takes the lamp, the plate fills to "h:mm", the lamp becomes `ART.lampHung` and burns for the rest of the session, `tone("correct")`, `GameCore.showPraise` with the rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"] on first-try items, the shell bundle steps down where a threshold is crossed, then the tortoise glides clockwise to station 12 while the stamps clear and the arms turn (`ANIM.handsTurn`, concurrent).
- What happens on a **wrong answer** (per anticipated mistake), always frozen, never tappable through, and never touching the tortoise's own state:
  - **A station further round tapped during the count**: `ANIM.tip` + `tone("nudge")`. If it is the flame's station, misconception 1's ~1600 ms correction; otherwise misconception 3(a)'s. **Not an attempt.**
  - **The lamp raised short of the flame**: it does not catch; misconception 3(b)'s ~1400 ms remainder count. Costs first-try; the item continues.
  - **A knock at window h+1 or h−1**: the shutter stays shut; misconception 2's ~1400 ms sector correction.
  - **A knock at the flame's window**: the shutter stays shut; misconception 5's ~1400 ms swapped-hands correction.
  - Nothing is ever dropped, taken back, extinguished or moved further away, and no resident goes away.
- **Retry behaviour**: attempt 1 → the matching correction → attempt 2 → the correction again → attempt 3 is the show-me (the correct window's shutter opens once and stays open and static, `ART.showRing` round it). Knocking there completes the item as solved-with-help. No attempt 4. **Success is certain.**
- **Anti-brute-force guard, by name: THE LIT-WINDOW SET.** P1's tile re-shuffle is impossible in a persistent world — a station that jumps when you knock on it destroys the world's constancy, which is the thing that makes it a place — so the guard is three interlocking parts:
  1. **The minutes cannot be guessed at all.** There are no minute candidates anywhere on the stage. The count *produces* the number: the ledge is one-way within a lap, only the next station bears weight, a stamped stone cannot be un-stamped, and the minute arm lying across the ledge means the station under the flame is the last live one, so **the child cannot walk past the answer**. The only reachable error is stopping short, which costs first-try and plays the frozen remainder count.
  2. **The hour candidate set is chosen by the hands, not by the layout** (Content). Positions are fixed forever; identity varies every item; a random knock is right one time in three.
  3. **The knock is a one-way door.** Any wrong knock forfeits first-try for that item permanently and triggers a ~1400 ms frozen correction that cannot be tapped through. Walking on to another window does not un-knock. A random tapper therefore reaches the show-me ladder on roughly two items in three and gains nothing by speed, because the corrections are the slowest thing in the game.
- **The ratchet.** Nothing in this world decays. Every lamp hung stays lit, every stamp pressed stays until its own lap ends by completion, the goal never moves, no path closes, no resident leaves, and there is no meter to empty.
- **Idle cue** (never any kind of clock but the one being read): after 8 s without a tap, the tortoise plays **one** `ANIM.lift` and settles. It never loops. This and the item-1 demonstration are the only two motions the child did not cause, both named deliberate concessions under MISSIONS.md R4, both one-shot.
- **Motion budget (F-42 two-beat cycle).** DECIDE is frozen — zero tweens running whenever any target is enabled. ACT is always caused by a tap and is capped: up to 11 hops × 130 ms = 1430 ms, catch 300, delivery glide ≤ 600, knock 400, return glide ≤ 600, hands turning concurrently. Worst case ≈ 3.3 s, typical 2.6-3.2 s; **× 12 items ≈ 31-38 s of traversal, plus ~6 corrections at 1.4-1.6 s ≈ 9 s, total ≈ 45 s** against MISSIONS.md M6's 60 s ceiling. The 600 ms glide caps are part of the spec, not decoration: a glide allowed to scale with arc length blows the budget.
- **Finish condition**: 12 items. No losing state; no way for a session to end other than by finishing; no clock of any kind except the one being read.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific `STRINGS`, all 11 locales at build time (§17):
  - `title` = "Light the Tower"
  - `premise` = "The tower is dark. Count the ledge in fives and take each lamp to the window the clock names." — **start screen only**, two short sentences, the whole 8-9 text budget for the mission premise included (F-42 check F6).
  - `countFives` = "Count in fives" — the counting-leg caption.
  - `whichWindow` = "Which window?" — the delivery-leg caption.
- At no moment does the play surface carry more than one caption of three words or fewer. The premise never reappears during play.

## Sound
`tone("tap", k)` on the *k*-th stamp, so the pitch climbs round the ring — one note per group of five (F-109, F-213); `tone("tap", 12)` as the wick takes, the top of the climb; `tone("nudge")` on a stone that will not bear weight, a raise that does not catch, or a shutter that stays shut; `tone("correct")` when a shutter opens; `tone("finish")` once when the great lantern catches. Silent under `?sound=off`, and nothing sound carries is absent from the screen. No time is spoken and no idiom is rendered (F-211).

## Testing checklist
- [ ] Works in all 11 languages (All done, Play again, Menu, praise change; "Count in fives", "Which window?" and the start premise change once translated; the premise fits its box at 1.6 × the English width).
- [ ] Works at narrow width (400-px iframe: the whole tower, all twelve stations, the dial numerals and the caption legible; nothing clipped at the 0.556 FIT scale).
- [ ] Keyboard operable (Tab reaches the tortoise then the live stations clockwise from 12; Enter acts where it stands; Enter on a dead station does nothing).
- [ ] Never auto-starts.
- [ ] No losing state (a wrong knock never ends the session; the show-me always completes the item; there is exactly one way for a session to end and it is finishing).
- [ ] **Mission.** The goal (`ART.crownLamp` at 360, 72) is drawn from the first tap, its coordinates never change, and it changes only at the finish. The tortoise's station changes on at least 11 of 12 items. Deleting `mission.hero` and `mission.goal` (`_tools/mutate-mission.js`) makes the game **fail to complete a single item**, because both commit handlers read `hero.station`.
- [ ] **Ratchet.** Drive a full session answering wrongly on every item: the number of lit windows never decreases, no stamp is removed before its own lap completes by success, no resident leaves, and `mission.progress` is monotone.
- [ ] **Instant-cut (Test C).** Patch `ANIM.step`, `ANIM.glide`, `ANIM.lampIn` and `ANIM.handsTurn` to `duration: 0`. The item log must be **identical** — nothing in this game reads a duration, no timing window exists, and nothing is gated on an animation finishing. Report the seconds removed (expect ≈ 31-38 s of a 6-7 minute session).
- [ ] **Freeze (F-42).** At every decision point of a `qa-game` session, whenever any target is enabled the running tween count is zero — except the two named one-shots (the item-1 demonstration, the 8 s lift), which fire when no tap has occurred and are each measured once.
- [ ] The first stamp of every lap reads "5", never "1", and each next stamp reads five more.
- [ ] A station further round refuses to bear weight and stamps nothing; a stamped station does nothing; the tortoise never moves anticlockwise at any point in a session.
- [ ] Raising the lamp before the flame lights nothing and replays the remaining stations' stamps, the last holding under the flame; the lamp is still in the tortoise's paws afterwards.
- [ ] For a 3:10 face, tapping station 2 first tips it and pulses the "10" stamp beside the dial's "2" on the same spoke.
- [ ] For a 6:40 face, knocking at window 7 leaves the shutter shut and shades a wedge from the "6" to the hour arm with the "6" pulsing.
- [ ] For a 7:05 face, knocking at window 1 (the flame's) leaves the shutter shut, the resident holds the lamp beside their numeral, and the coral arm dims.
- [ ] The lit set has exactly three members on every one of the 18 items, and the correct window differs from the previous item's.
- [ ] A hung lamp is still lit at the end of the session, and a window that took two lamps shows both.
- [ ] The great lantern is dark for the whole session and catches exactly once, at the finish.
- [ ] Total ACT time per session ≤ 60 s (M6), measured, with the 600 ms glide caps enforced whatever the arc.
- [ ] The Finish screen re-draws the tower at its play coordinates with the twelve plates read out to r = 192, filled dots for first-try and hollow for helped, and no score.
- [ ] With `?sound=off` nothing is audible.
