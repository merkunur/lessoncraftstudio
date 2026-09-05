# 104 — Melt or Not

## Identity
- Slug: `melt-or-not`
- Subject / topic: Science / the states of water — ice, liquid water, steam — ordered by heating and by cooling
- Age band: `8-9`
- Interaction pattern: `P4` — tap in order (per-tap judgement; every correct placement enacts the change of state in the rail, the P10 reveal as a sub-step)
- Estimated build size: ~470 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P4. Science rule (F-218, F-136): observational only — the ice is seen to melt into a puddle, the water to bubble and give off steam, the steam to gather into drops, the drops to freeze. No particles, no temperatures in degrees, no "why". The only stuff in the game is water; "melt or not" is the question the child answers at each arrow: does heating (or cooling) change this state into the next, and into which one.

## Learning
- Objective: Given a starting state of water and a chain of heat / cool arrows, taps the states in the order they occur (ice → water → steam when heating; steam → water → ice when cooling), including chains that turn back.
- Prerequisites: Recognises ice, water and steam as pictures; reads one short caption (8-9). Has seen ice melt and a kettle steam.
- Curriculum links: F-23 (states of water named at 5-8 in SE/DK/EN/US/DE; materials by property in 11 of 12), F-30 (science integrated into world-knowledge subjects; sequences only before 9), F-31 row "Materials by property" (conservative 8) → 8-9 (England Y4 "compare and group materials … solids, liquids or gases … observe that some materials change state when heated or cooled" — placed at the 8-9 band as the most conservative; US 2-PS1-4 "some changes caused by heating or cooling can be reversed"; Germany HSU "Aggregatzustände des Wassers" Klasse 3; France cycle 2 "les états de l'eau"; Netherlands kerndoel 42; Spain "estados del agua" 3º; Brazil EF03CI01; Sweden åk 1-3 "vattnets olika former"; Denmark natur/teknologi "vandets kredsløb"; Norway naturfag 3-4; Finland ympäristöoppi 3-6). F-218.
- Common misconceptions (F-136, F-134), each with this game's response:
  1. **Heating water makes it "go away" (evaporation as disappearing, not a state).** Response: from L2 the tray holds a "nothing" tile (`ART.stateNothing`, an empty outline); tapping it after a heat arrow is refused with the enacted truth in the slot: the water bubbles (`ART.bubble` ×3, `ANIM.boilBubbles`) and a steam glyph RISES out of it (`ANIM.steamRise`) and stays as the next state — the water went somewhere visible.
  2. **Cooling steam goes straight to ice (skipping the liquid).** Response: tapping ice after steam under a single cool arrow is refused; the enacted hint shows the steam gather into drops on the slot (`ANIM.condense`: the steam glyph fades while `ART.drops` ×3 appear on the slot's inside wall and run down into a `ART.puddle`) — water first.
  3. **Ice is a different stuff from water (the melted puddle "is not the ice any more").** Response: every melt is enacted continuously: the ice glyph shrinks (`ANIM.melt`) while the puddle grows under it in the SAME slot, and the water tile then sits in that slot — nothing is swapped in from outside.
  4. **Direction of the arrow ignored — the child taps by habit (ice, water, steam) whatever the arrows say.** Response: the arrow being answered pulses its flame or snowflake (`ANIM.arrowPulse`) on every wrong tap; L3 chains reverse direction mid-chain (heat, heat, cool), so habit fails and the arrows must be read.
  5. **Steam and "cold breath / mist" confused, or freezing thought impossible for liquid water ("it just gets cold").** Response: the freeze reveal draws `ART.frostRing` around the water as it turns to the ice glyph (`ANIM.freeze`); the change is shown, not described.

## How it plays
1. **Start screen**: title "Melt or Not", the polar bear (`ART.bear`) at (360, 200), Start, picker.
2. **Item 1 (L1: start ice; one heat arrow)**: rail of 12 dots (§6; `t("question_x_of_y")` at (360, 48), 18 px `THEME.colour.inkSoft`). Zone A: the chain rail — slot 1 (`ART.slot`, 120 × 90) at (220, 190) already holding the start state (`ART.stateIce`, 56 px, with its slot marked `ART.slotLocked`); `ART.arrowShape` (a right-pointing arrow bar) at (360, 190) carrying `ART.heatGlyph` centred on it; slot 2, empty and dashed, at (500, 190). Two-step items use slots at x = 150 / 360 / 570 with arrows at 255 / 465; three-step items use slots at x = 120 / 280 / 440 / 600 (110 × 84) with arrows at 200 / 360 / 520 (arrow bar 60 wide). The bear sits at (70, 120). Zone B: the state tray — `makeTile` 110 × 110 tiles at y = 380: `ART.stateIce`, `ART.stateWater`, `ART.stateSteam` (x = 210 / 360 / 510), shuffled; from L2 a fourth tile `ART.stateNothing` joins (x = 165 / 295 / 425 / 555). Caption `S("whatNext")` ("What comes next?") at (360, 296), 22 px `THEME.colour.inkSoft`. Tray tiles are SOURCES: tapping one sends a COPY to the next empty slot; the tray tile stays (water can be needed twice in one chain).
3. **Tapping in order**: the child taps a tray tile.
   - **Correct next state**: `tone("tap", k)`, `ANIM.pop` on the tray tile, a copy glides (`ANIM.glide`) into the next empty slot; then the REVEAL enacts the change from the previous slot to this one (700-900 ms; all tiles disabled meanwhile): melt (`ANIM.melt` on the previous ice glyph + `ART.puddle` `ANIM.puddleGrow`), boil (`ANIM.boilBubbles` + `ANIM.steamRise`), condense (`ANIM.condense` + `ART.drops`), freeze (`ANIM.freeze` + `ART.frostRing`). The arrow just answered dims to alpha 0.5 (`ANIM.arrowDone`).
   - **Chain complete**: `tone("correct")`, praise pop (rotation), the bear `ANIM.nod`, rail dot fills; after 800 ms the next chain `ANIM.appear`s.
   - **Wrong state** (any tray tile that is not the next state): `ANIM.nudge` on the tray tile, `tone("nudge")`, nothing lands in the slot; the current arrow's glyph `ANIM.arrowPulse`s, and the enacted hint for that error plays IN the empty slot (Rules): boil-and-rise for a "nothing" tap under heat, condense-to-drops for ice-after-steam under cool, and for other wrong taps the previous slot's glyph performs its true change on the spot (melt / boil / condense / freeze) and returns, without filling the slot. Attempt 2 for this slot.
   - **Second wrong on the same slot**: the hint again, and the correct tray tile gains the show-me ring (`ART.showRing`, `ANIM.showMe`); tapping it fills the slot as solved-with-help (the chain still completes; no praise pop).
   - **Tapping a filled slot**: returns the LAST placed copy to nothing (the slot empties, its arrow brightens) — undo; only the last slot can be undone (earlier reveals have already happened).
4. **Items 2-12**: per Content and Rules: L1 single-step chains (four directions); L2 two-step chains with the "nothing" distractor in the tray; L3 three-step chains that reverse mid-way.
5. **Finish**: `t("all_done")` (360, 110); the bear (360, 200) `ANIM.celebrate`; the summary = the full cycle drawn once at y = 330: `ART.stateIce` (200, 330) → `ART.arrowShape` + `ART.heatGlyph` → `ART.stateWater` (360, 330) → arrow + heat → `ART.stateSteam` (520, 330), and beneath it (y = 420) the same three with cool arrows pointing the other way — the two directions the child ordered; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 6 minutes.

## Art registry
```js
const ART = {
  bear:         { kind: "emoji", value: "🐻‍❄️", size: 80, fallback: "🐻" },   // polar bear is Unicode 13 → bear fallback
  stateIce:     { kind: "emoji", value: "🧊", size: 56 },
  stateWater:   { kind: "emoji", value: "💧", size: 56 },
  stateSteam:   { kind: "emoji", value: "♨️", size: 56 },
  stateNothing: { kind: "shape", shape: "roundRect", w: 56, h: 56, stroke: "line", strokeWidth: 3, radius: 10 },   // dashed [6,6]; an empty outline: "gone"
  heatGlyph:    { kind: "emoji", value: "🔥", size: 32 },
  coolGlyph:    { kind: "emoji", value: "❄️", size: 32 },
  arrowShape:   { kind: "shape", shape: "polygon", points: [[-40,-10],[16,-10],[16,-22],[44,0],[16,22],[16,10],[-40,10]], fill: "structureSoft", stroke: "structure", strokeWidth: 2 },
  slot:         { kind: "shape", shape: "roundRect", w: 120, h: 90, fill: "surface2", stroke: "line", strokeWidth: 2, radius: 12 },   // dashed [8,6] while empty
  slotLocked:   { kind: "shape", shape: "roundRect", w: 120, h: 90, fill: "surface", stroke: "structure", strokeWidth: 3, radius: 12 },
  stateTile:    { kind: "shape", shape: "roundRect", w: 110, h: 110, fill: "surface", stroke: "line", strokeWidth: 2, radius: 14 },
  puddle:       { kind: "shape", shape: "ellipse", w: 70, h: 18, fill: "structureSoft", stroke: "structure", strokeWidth: 2 },
  bubble:       { kind: "shape", shape: "circle", r: 5, stroke: "structure", strokeWidth: 2 },
  drops:        { kind: "shape", shape: "circle", r: 5, fill: "structureSoft", stroke: "structure", strokeWidth: 2 },   // three, on the slot's inside wall
  frostRing:    { kind: "shape", shape: "circle", r: 38, stroke: "structure", strokeWidth: 3 },   // dashed [4,6]
  showRing:     { kind: "shape", shape: "roundRect", w: 122, h: 122, stroke: "structure", strokeWidth: 4, radius: 18 },
  dotEmpty:     { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:      { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
Heat and cool arrows share `ART.arrowShape`; they differ by the glyph ON the arrow (`ART.heatGlyph` / `ART.coolGlyph`), never by colour. All three state tiles use `ART.stateTile`.

## Animation registry
```js
const ANIM = {
  pop:         { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "tray tile tapped in the right turn" },
  nudge:       { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "wrong tray tile" },
  glide:       { duration: 260, ease: "Sine.InOut", trigger: "state copy from the tray to the next empty slot (x,y at call)" },
  melt:        { scaleY: 0.2, y: "+=18", alpha: 0.4, duration: 700, ease: "Sine.In", trigger: "ice glyph in the previous slot sinks into a puddle (runs with puddleGrow)" },
  puddleGrow:  { scaleX: 1, alpha: 1, duration: 700, ease: "Sine.Out", trigger: "puddle under the melting ice (from scaleX 0.2, alpha 0)" },
  boilBubbles: { y: "-=30", alpha: 0, duration: 600, ease: "Sine.Out", trigger: "three bubbles rise from the water glyph, 120 ms apart" },
  steamRise:   { y: "-=36", alpha: 1, duration: 700, ease: "Sine.Out", trigger: "steam glyph rises out of the water (from alpha 0), then glides on to its slot" },
  condense:    { alpha: 0.25, duration: 600, ease: "Sine.In", trigger: "steam glyph fades while drops appear on the slot wall (drops use appear, 150 ms apart) and run down (dropRun)" },
  dropRun:     { y: "+=26", duration: 400, ease: "Sine.In", trigger: "each drop runs down to the puddle" },
  freeze:      { scale: 1.0, duration: 600, ease: "Sine.InOut", trigger: "water glyph swaps to the ice glyph at the mid-point (from scale 0.9) while frostRing draws (frostIn)" },
  frostIn:     { alpha: 1, scale: 1, duration: 500, ease: "Sine.Out", yoyo: true, hold: 300, trigger: "frostRing around a freezing slot (from alpha 0, scale 0.6), then fades" },
  arrowPulse:  { scale: 1.25, duration: 250, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "the current arrow's heat/cool glyph after a wrong tap" },
  arrowDone:   { alpha: 0.5, duration: 200, ease: "Sine.Out", trigger: "an arrow that has been answered" },
  appear:      { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "new chain; drops; nothing-tile (from alpha 0, scale 0.6)" },
  nod:         { angle: 6, duration: 110, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "bear on chain complete" },
  showMe:      { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "ring on the correct tray tile (from alpha 0.2)" },
  celebrate:   { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish bear" }
};
```

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]       ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28; "4 of 12" y=48 │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │  bear (70,120)                                               │
      │        ┌────────┐    ┌──────┐    ┌────────┐    ┌──────┐    ┌────────┐ │  zone A
      │        │  ice   │ ═══│ heat │══> │  ...   │ ═══│ cool │══> │  ...   │ │  slots y=190
      │        └────────┘    └──────┘    └────────┘    └──────┘    └────────┘ │
      │        x=150         255        360           465         570        │
260   ├──────────────────────────────────────────────────────────────┤
      │                  "What comes next?" (360,296)                 │
      │     ┌──────┐     ┌──────┐     ┌──────┐     ┌──────┐  tray y=380 │  zone B
      │     │ ice  │     │water │     │steam │     │ (--) │  110×110    │
      │     └──────┘     └──────┘     └──────┘     └──────┘  x=165..555 │
480   ├──────────────────────────────────────────────────────────────┤
      │                                                              │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Shown: a two-step L2 chain with the four-tile tray. One-step (L1) uses slots at x = 220 / 500 with the arrow at 360 and a three-tile tray; three-step (L3) uses four slots at x = 120 / 280 / 440 / 600 (110 × 84) with arrows at 200 / 360 / 520. Fixed layout, FIT scaling.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 12 × `ART.dotEmpty` (x = 239 + i × 22) → `ART.dotFull`; `t("question_x_of_y")` at (360, 48).
- `ART.bear` (70, 120). Slots: `makeTile` with `ART.slot` tokens (dashed while empty; `ART.slotLocked` look for the start slot and for every filled slot); the state glyph centred in the slot at 56 px (48 px in the 110 × 84 slots). `ART.puddle` at the slot's (0, +26); `ART.bubble` ×3 from the glyph's (−14, 0), (0, −8), (+14, 0); `ART.drops` at the slot's (−44, −20), (−44, 0), (−44, +20) (inside left wall); `ART.frostRing` centred on the glyph.
- Arrows: `ART.arrowShape` centred at the arrow x, y = 190, with `ART.heatGlyph` or `ART.coolGlyph` centred on it (the glyph sits on the bar at (−12, 0)); answered arrows at alpha 0.5.
- Tray: `makeTile` 110 × 110 with `ART.stateTile` tokens; labels `ART.stateIce` / `ART.stateWater` / `ART.stateSteam` / `ART.stateNothing` (the nothing tile draws its dashed outline as its label). `ART.showRing` behind the correct tray tile.
- Caption at (360, 296), 22 px `THEME.font.body` `THEME.colour.inkSoft`, wordWrap 600.
- Tap floors: tray 110, slots 110-120 × 84-90 (≥ 56). Gaps ≥ 20. Tab order: tray tiles left to right, then the filled slots (for undo).

## Content
Language-neutral (pictures and arrows; the caption is the only word string). A chain = (start state; arrows in order → the states to tap in order). Arrow words: heat = `ART.heatGlyph` on `ART.arrowShape`; cool = `ART.coolGlyph` on `ART.arrowShape`. Reveal per transition: ice→water = melt; water→steam = boil; steam→water = condense; water→ice = freeze.

- **L1** (one arrow; tray ice/water/steam): (ice; heat → water) · (water; heat → steam) · (water; cool → ice) · (steam; cool → water)
- **L2** (two arrows; tray adds `ART.stateNothing`): (ice; heat, heat → water, steam) · (steam; cool, cool → water, ice) · (water; heat, cool → steam, water) · (water; cool, heat → ice, water) · (ice; heat, cool → water, ice) · (steam; cool, heat → water, steam)
- **L3** (three arrows, reversing mid-chain; tray of four): (ice; heat, heat, cool → water, steam, water) · (steam; cool, cool, heat → water, ice, water) · (water; cool, heat, heat → ice, water, steam) · (steam; cool, heat, cool → water, steam, water) · (ice; heat, cool, heat → water, ice, water) · (water; heat, cool, cool → steam, water, ice)

Play list: 12 items per Rules, shuffled within level, no chain repeated within a session (L1 has four chains — a child held at L1 for more than four items sees them reshuffled). Tray order shuffled per item; the correct first tile never sits in the same tray slot twice running.

## Rules
- Item count: 12.
- Difficulty progression: 3 consecutive chains completed with no wrong tap → next level (cap L3).
- Adaptation: a chain with any wrong tap, or 2 consecutive chains not completed cleanly → next chain one level down (floor L1).
- What happens on a correct answer: per step `tone("tap", k)`, `ANIM.pop`, copy `ANIM.glide`s to the slot, the transition is enacted in the rail (melt / boil / condense / freeze), the arrow dims; on the last step `tone("correct")`, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"], bear `ANIM.nod`, rail dot, next chain after 800 ms.
- What happens on a wrong answer (per anticipated mistake):
  - "Nothing" tapped after a heat arrow (water disappears): nudge, `tone("nudge")`, arrow glyph pulses; the water in the previous slot bubbles and a steam glyph rises and hovers over the empty slot for 700 ms, then fades. No text.
  - Ice tapped after steam under one cool arrow (skips the liquid): nudge, tone, arrow pulses; the steam fades while three drops appear on the slot wall and run into a puddle, then the slot clears.
  - Habit order against the arrow (e.g. steam tapped after water under a cool arrow): nudge, tone, the arrow's snowflake/flame pulses twice; the previous state performs its TRUE change for this arrow in place (freeze here) and returns.
  - Water tapped after ice under a cool arrow (thinks cold melts / any other wrong state): nudge, tone, arrow pulses; the previous glyph stays unchanged and the frost ring draws around it and fades ("it stays ice").
  - Second wrong tap on the same slot: the hint again + the show-me ring on the correct tray tile; solved-with-help.
- Retry behaviour: per slot: attempt 1 → attempt 2 after the enacted hint → attempt 3 with the show-me ring. No attempt 4. The last placed copy can be undone by tapping its slot; this is never an error.
- Finish condition: 12 chains. No losing state, no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("question_x_of_y")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Melt or Not"; `whatNext` = "What comes next?".

## Sound
`tone("tap", k)` on the k-th correct placement; `tone("tap", 6)` as steam rises and `tone("tap", -4)` as a freeze completes (high for heating, low for cooling — the rail shows the same); `tone("correct")` on chain complete; `tone("nudge")` on a wrong tile; `tone("tap")` on undo; `tone("finish")` once. Silent under `?sound=off`.

## Testing checklist
- [ ] Works in all 11 languages (Question 4 of 12, All done, Play again, Menu, praise change; "What comes next?" changes once translated).
- [ ] Works at narrow width (400-px iframe: a four-slot chain with three arrows and a four-tile tray fully visible).
- [ ] Keyboard operable (Tab across the tray then the filled slots; Enter places / undoes).
- [ ] Never auto-starts.
- [ ] No losing state (wrong taps never end the session; the show-me ring always completes the slot).
- [ ] The start state sits in the first slot with a solid outline; the arrows show a flame or a snowflake, never colour alone.
- [ ] Tapping water after ice under a heat arrow makes the ice shrink into a growing puddle in the same slot before the water tile settles there.
- [ ] Tapping steam after water under a heat arrow shows bubbles and the steam glyph rising out of the water.
- [ ] Tapping the empty "nothing" tile after a heat arrow is refused and steam rises over the empty slot.
- [ ] Tapping ice after steam under one cool arrow is refused; drops appear on the slot wall and run into a puddle.
- [ ] A third-level chain such as heat, heat, cool is completed only by water, steam, water; the habit order is refused at the cool arrow with the snowflake pulsing.
- [ ] Tapping the last filled slot empties it and brightens its arrow; earlier slots cannot be undone.
- [ ] Three clean chains in a row bring longer chains; a chain with a wrong tap brings a shorter one next.
- [ ] The finish screen shows the heating row and the cooling row and no score.
- [ ] If the polar bear emoji is missing on the device, a brown bear appears instead.
- [ ] With `?sound=off` nothing is audible.
