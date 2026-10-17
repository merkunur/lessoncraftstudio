# New 262 — The Moon Lamp → THE MOON THAT IS ALWAYS HALF LIT (NGSS 1-ESS1-1)

## 0. Identity
- **id** `moon-lamp.play.1-ess1-1` · grade 1 · NGSS **1-ESS1-1** (use observations of the sun, moon and stars to describe patterns that can be predicted) · strand Science · framework via `frontend/lib/frameworks.ts` · own files `moon-lamp-core.js`, `moon-lamp-activity.js`, `moon-lamp-activity.html`, `moon-lamp-activities.json`.
- **Worksheets covered:** G1-378 "Sun, Earth and Moon" → task FACTS · G1-391 "Moon Phases in Order" → task ORDER · G2-367 "Name the Moon Phases" → task NAME · G2-368 "Why Do We Have Day and Night?" → task DAY & NIGHT.
- **Merged:** grade 2 "The Orbit Lamp" (orbit-lamp) → the DAY & NIGHT task (turning Earth, the lamp decides) and the MAKE rounds of NAME (drag the Moon until the window shows a named phase).
- **Reused content (already native-reviewed for the printed worksheets):** `scripts/worksheet-gen/data/b5/earth-and-space.js` + `data/b5/locales/earth-and-space.<loc>.json` — the 13 fact sentences ×11 (whole sentences, gender-neutral subjects, forbidden-stem lists), the four phase names ×11 (`phaseNames` 0/2/4/6), and the locale's `hemisphere` (N everywhere, **S in pt**). The activity reads these blocks (copied into its own manifest at build) — never re-translates them.

## 1. The pitch
"The Moon on the track is always half lit — the half that faces the lamp — wherever you drag it; the round window shows how much of that bright half you can see from home, so the Moon's shapes are just you looking at a half-lit ball from different places."

## 2. Why a child will want it again
- **A real model you drive.** A lamp-sun on the left throws soft light across the stage; the library Earth sits in the middle; the Moon (a drawn half-lit disc) rides a ring track around it. Drag the Moon and it glides round the track with a little click at every stop.
- **The half-lit ball.** The Moon bead on the track carries a shadow on its far side — always the side away from the lamp — and the shadow swings round as you drag, so the bright half keeps facing the lamp like a sunflower. Children try to "catch it out" and cannot.
- **The window home.** A big round window (labelled only with a little house-pin icon) shows the Moon as seen from Earth: the Moon drawn exactly from the angle (soft-grey disc, the lit part white). Drag slowly and watch a crescent fatten into a half, a full, and shrink back — the whole month in one sweep of the finger.
- **The lamp switch.** A chunky switch on the lamp (free play): turn it off and the stage goes dusk-blue, the Moon in the window disappears — "the Moon has no light of its own" — then on again with a warm fade.
- **Earth's shadow, shown honestly.** Tap Earth to show its long shadow behind it: at the quarter stops the Moon is nowhere near it yet half dark — the dark part is the Moon's own night side.
- **Earned shows:** an ORDER round ends with the Moon walking its five nights around the track while the window flips through them like a flip-book; a NAME round ends with the window glowing and the phase name sliding under it; a DAY & NIGHT round ends with a slow turn of Earth showing each pin passing from day into night.
- No timer, score, streak or lives.

## 3. The skill and the misconception
- **Skill:** the Sun, Earth and Moon each have properties (G1-378); the Moon's shape seems to grow and shrink in a regular order that repeats (G1-391); the four main phases have names (G2-367); day and night come from Earth turning — the half facing the Sun has day (G2-368).
- **Misconception 1 — "Earth's shadow makes the phases."** The model draws Earth's shadow on demand: it points away from the lamp and the Moon is far from it at every quarter and crescent stop, yet the window still shows the Moon partly dark. The shadow on the Moon is always the Moon's own back half, visible on the track bead.
- **Misconception 2 — "the Moon makes its own light."** The lamp switch: lamp off → Moon gone from the window and the bead goes dark. The FACTS task's "It makes its own light." card can only dock under the Sun; dropped on the Moon, the little lamp in that panel switches off and the Moon fades (the material refuses, no message).
- **Misconception 3 — the order is random / a line.** The ORDER task lays nights along the track, and the check is the Moon physically walking them in its one direction; the track is a ring, so night 5 leads on to night 1 of the next month.
- **Misconception 4 — "night is when the Sun goes behind the clouds / turns off."** In DAY & NIGHT the lamp never moves or dims; only Earth turns, and a pin's day/night follows the half it is on.

## 4. The stage
`layout:'split'` at ≥ 700 px: model left, window + cards right.

**At 704 px (stage 672 × ≈ 420):**
- **The lamp-sun** — library `beach/sun` (per the picture ruling, not weather/sun or space/sun, which is an opaque square), 96 px, at the far left, vertically centred; six soft beam lines (geometry, 2 px, cream #FFF1C9 at 40 %) fan rightward across the model. A switch (geometry, 44 × 28 rocker) on the lamp's base — only active in free play / between rounds.
- **The model box** 380 × 380 to the right of the sun: background deep blue #1F3550 (the only dark area in the activity) fading to lighter at the lamp side.
  - **Earth** — library `space/earth`, 100 px, centred; a thin teal ring around it marks "home". A small coral pin (geometry, 12 px) on Earth's rim always faces the Moon — "where we look from" — with a dotted sight line (2 px, white 50 %) to the Moon. (In NAME rounds the pin and the sight line are hidden with the bead — they point at where the Moon is.)
  - **The track** — a ring, r = 130 px, dashed cream line 3 px; 8 stop ticks (4 in the 4-phase setting) as short bars; the direction of travel shown by three small chevrons on the ring (counter-clockwise, the Moon's real direction seen from above the North Pole).
  - **The Moon bead** — a DRAWN DIAGRAM disc, 96 px (critic ruling, see §12 "Moon art"): pale #ECE8DC disc, 3 px teal rim, its night half (the half facing away from the lamp) ink #10202E at 82 %. Never the library `space/moon`.
  - **Earth's shadow** (hidden until Earth is tapped): a dark band (Earth's width, 20 % ink) running right from Earth to the box edge, drawn just below the track at the full-Moon stop (the Moon's path is tilted, so it usually misses it — written in the teacher notes, not on screen).
- **The window** (right column, 230 wide): a round window 200 px diameter, frame 6 px teal with a small house-pin icon at its foot (geometry). Inside: the Moon as seen from home at 184 px, drawn by the SAME recipe as the reviewed worksheet primitive `scripts/worksheet-gen/primitives/moon-phase.js` but for a continuous θ — the whole disc in soft grey, the lit part white bounded by the terminator ellipse rx = r·|cos θ|, mirrored for hemisphere S; no craters, no face. The new Moon is a dim grey disc, never empty (the Moon is still there).
- **Task cards** under the window (per task, §6).
- **Task line** above (≤ 24 px, ≤ 2 lines).
- No words on the apparatus. The only words are content: phase-name cards (NAME), fact sentences (FACTS), "day/night" tokens are icons (sun disc / crescent), not words.

**At 360 px:** stacked. The model square 336 × 336 (sun 64 px at the left edge inside the box, ring r 100, Earth 72 px, Moon bead 64 px). The window is a **round inset** 132 px in the model box's top-right corner (frame 4 px), Moon picture 120 px. Cards row below the model (ORDER: 5 cards 60 × 60 in one row; NAME: 4 name cards 2 × 2 at 156 × 48; FACTS: 3 bodies 96 px + cards stacked; D&N: tokens tray 2 × 44). Check at ≈ 640 px. **320 × 640:** model 300, ring r 88, Moon 64, inset 116, Check at ≈ 600.

## 5. The hand
- **Drag the Moon** along the track (pointer anywhere near the ring captures it; angle from atan2): it follows within one frame; at a stop it snaps with a click (wood-block tick) when released within 12° of it (ORDER/NAME tasks snap; free play is continuous). The bead's shadow and the window update every frame (θ = angle Sun–Earth–Moon; lit fraction (1 − cos θ)/2; lit side right for 0 < θ < 180° in N, mirrored in S).
- **Tap Earth:** shows/hides Earth's shadow (300 ms fade).
- **Lamp switch** (free play): lamp off 600 ms dusk, the window's Moon fades to nothing but its faint outline; on again.
- **ORDER:** drag a phase card (a small window-copy of a phase, 72 px round, drawn by the same mask) from the tray onto a night slot; it snaps; drag again to swap.
- **NAME:** tap a name card to place it under the window (one at a time; tap another to swap). **MAKE rounds:** drag the Moon until the window shows the named phase.
- **DAY & NIGHT:** drag Earth's disc round (rotate gesture: drag on the rim) — pins ride round; drag a sun token or a moon token from the tray onto each pin.
- **FACTS:** drag a sentence card onto the Sun, the Earth or the Moon panel.
- **Keyboard:** ←/→ move the Moon one stop (Earth one 15° step in D&N); Tab cycles cards and targets; Enter places.
- **Free play** between rounds: the whole model is live (drag, lamp switch, shadow).

## 6. The rounds
Phase numbers: θ = 45° × p, p = 0 new · 1 waxing crescent · 2 first quarter · 3 waxing gibbous · 4 full · 5 waning gibbous · 6 last quarter · 7 waning crescent. Stop p sits on the track at angle 180° + 45°p (new Moon between Earth and lamp, at the left), travelling counter-clockwise.

### ORDER (G1-391) — lay the nights in the Moon's order
A rail of night slots under the window (1–5 dots above each slot, no numerals); one card is given (locked, teal frame); the others lie shuffled in the tray. **8 phases, 5 nights** — the run starts at s and goes forward:
| # | nights (p) | given slot |
|---|---|---|
| O1 | 0 1 2 3 4 | 1 |
| O2 | 4 5 6 7 0 | 2 |
| O3 | 2 3 4 5 6 | 3 |
| O4 | 6 7 0 1 2 | 4 |
| O5 | 1 2 3 4 5 | 5 |
| O6 | 5 6 7 0 1 | 1 |
| O7 | 3 4 5 6 7 | 2 |
| O8 | 7 0 1 2 3 | 3 |
| O9 | 4 5 6 7 0 | 4 |
**4 phases, 4 nights** (a week apart; cards {0,2,4,6}):
| # | nights | given slot |
|---|---|---|
| Q1 | 0 2 4 6 | 1 |
| Q2 | 4 6 0 2 | 2 |
| Q3 | 2 4 6 0 | 3 |
| Q4 | 6 0 2 4 | 4 |
| Q5 | 0 2 4 6 | 4 |
| Q6 | 2 4 6 0 | 1 |
| Q7 | 4 6 0 2 | 3 |
| Q8 | 6 0 2 4 | 2 |
The given slot varies so the child must work backward as well as forward — measured (`work-c25/m262.js`): 8-phase given slots 1/2/3/4/5 = 2/2/2/2/1, 4-phase 1/2/3/4 = 2/2/2/2 (the first draft had slot 1 in 4 of 9 rows and never slot 4). The four 4-phase runs each appear twice, always with a different given slot, so no two rounds are the same puzzle. Grow-only runs (O1, O5) and shrink-only runs (O2, O9) match the worksheet's wedge rows; the others pass through full or new.

### NAME (G2-367) — 8 per pass, NAME and MAKE alternate; named phases only (0, 2, 4, 6 — a crescent or gibbous would fit two names)
| # | kind | phase | the child |
|---|---|---|---|
| N1 | name | 4 | picks the name card for the window |
| N2 | make | 6 | drags the Moon until the window shows "last quarter" |
| N3 | name | 0 | |
| N4 | make | 2 | |
| N5 | name | 2 | |
| N6 | make | 0 | |
| N7 | name | 6 | |
| N8 | make | 4 | |
All four name cards are always on the table (each phase name used twice per pass, like the worksheet's word bank). In NAME rounds the Moon bead on the track is hidden under a cloud-grey cap so the child reads the WINDOW, not the track; it is revealed on success.

### DAY & NIGHT (G2-368) — Earth from above
Earth here is a top-view turntable: a disc 260 px (geometry: ocean blue #3D8DBF, with the North-Pole cap white in the centre — no hand-drawn continents), the half facing the lamp bright, the far half shaded 55 % ink (the shading belongs to the lamp, not to the disc, so it stays put while the disc turns). The library `space/earth` sits small in the corner as the label (96 px) with a little "seen from above" arrow (geometry). Numbered pins (coral, 26 px, numeral 16 px) stand on the rim. Angles a are measured from the point facing the lamp; day if |a| < 90°. No pin within 15° of the day/night line.
| # | pins (a°) | truth | kind |
|---|---|---|---|
| D1 | 1:160 · 2:20 · 3:250 | night · day · night | tokens |
| D2 | 1:115 · 2:300 · 3:200 · 4:45 | night · day · night · day | tokens |
| D3 | 1:340 · 2:120 · 3:230 | day · night · night | tokens |
| D4 | 1:200 · 2:0 · 3:290 · 4:135 · 5:70 | night · day · day · night · day | tokens |
| D5 | 1:150 · 2:245 · 3:30 | — | turn Earth so pin 2 has day |
| D6 | 1:250 · 2:60 · 3:330 · 4:170 | night · day · day · night | tokens |
| D7 | 1:10 · 2:200 | — | turn Earth so pin 1 has night |
| D8 | 1:180 · 2:315 · 3:30 · 4:240 · 5:110 | night · day · day · night · night | tokens |
Day 11 / night 13 across token rounds (measured). Critic fixes: the first draft numbered the pins in angle order in five rounds (Spearman ρ = 1.0 against its own < 0.6 gate) and put two pins 10° from the day/night line (D2 at 100°, D5 at 260°) against its own 15° rule; renumbered and moved — now |ρ| ≤ 0.5 in every round of ≥ 3 pins and every pin ≥ 20° from the line. TURN rounds accept any rotation that puts the pin ≥ 15° inside the asked half.

### FACTS (G1-378) — 8 per pass, three sentence cards each (one per body)
Three body panels side by side, each 160 × 170 at 704: library `beach/sun` and `space/earth` at 110 px and the FULL-Moon diagram (phase 4, 110 px, the same drawn disc as the window) with their names under them (content words from `bodies`).
| # | Sun | Earth | Moon |
|---|---|---|---|
| F1 | ownLight | liveOn | seemsToChange |
| F2 | hottest | oceans | orbitsEarth |
| F3 | biggest | air | craters |
| F4 | star | planet | smallest |
| F5 | ownLight | spinDay | orbitsEarth |
| F6 | hottest | liveOn | craters |
| F7 | biggest | oceans | seemsToChange |
| F8 | star | air | smallest |
At most one card per concept per round (the bank's `concept` field: ownLight and star share one); biggest and smallest never in the same round.

- **Answer position.** ORDER: the given slot rotates 1/2/3/4/5 (measured above); tray order shuffled so no card sits in its own slot's column more than chance (gate: per-pass share of "card already under its slot" ≤ 25 %). NAME: the four name cards sit in a fixed table order per round with the right card in slot N1→0, N2→(make), N3→1, N5→2, N7→3, then the next pass rotates by one — each slot holds the answer once per pass; each named phase twice per pass (once named, once made). D&N: day/night balanced (above); pin numbering never follows angle order (gate: Spearman |ρ| < 0.6 between pin number and angle per round). FACTS: the three cards' tray order shuffled; each body's card in each tray slot equally often per pass.
- **Order:** order-only reshuffle per pass (§A.13.60).

## 7. Check, the misses, the success
- **Check with nothing done** → no miss; a gentle wobble of the tray. Hint: "Move something first — a card, the Moon or the Earth."
- **ORDER — miss 1:** the Moon walks the track night by night from slot 1; the window shows each night's true view; at the first card that does not match, the Moon stops, and the window's true phase appears big beside that card (both 120 px), then the card floats back to the tray. Hint: "The Moon walked your nights. Look at the window where it stopped." **Miss 2:** the tray card that belongs in that slot gets a soft glow, and the track stop for that night pulses. Hint: "The Moon always moves the same way round. What does it look like one stop later?"
- **NAME — miss 1:** a faint ghost Moon travels from where the Moon is to the stop that the chosen name needs, and the window shows that phase faintly beside the real one. Hint: "That name looks like this. Which name fits the window?" **Miss 2:** the cap lifts off the bead: the child sees where the Moon is on the track. Hint: "Look where the Moon is on its track: between us and the lamp, beside us, or behind us?" **MAKE — miss 1:** the target phase appears as a faint picture in the window behind the current view. **Miss 2:** the target stop on the track pulses.
- **DAY & NIGHT — miss 1:** the lamp's beam brightens and sweeps once; each wrong token flips over to show what the lamp says (sun ↔ moon icon) for 1.5 s, then returns to the tray. Hint: "Day is on the side that faces the lamp." **Miss 2:** the day half of the disc gets a warm outline. TURN rounds — miss 1: the pin's track around the disc is drawn as a dotted circle with the day half warm. Hint: "Turn Earth until the pin is on the lamp's side."
- **FACTS — miss 1:** the body refuses in its own way — a card that is not true of it slides off and lies beside the panel; for "It makes its own light." on the Moon, the panel's lamp switches off and the Moon fades out. Hint: "Read the sentence again. Is it true of this one?" **Miss 2:** the body it belongs to pulses once. Hint: "Which one is it true of: the Sun, the Earth or the Moon?"
- A new move takes the help away until the next Check.
- **Success:**
  - ORDER — the Moon walks all the nights, the window flips through them; bubble: "Night after night, the Moon {grows|shrinks|grows and shrinks} — always in the same order."
  - NAME — the window glows, the name slides under it, the cap lifts; "This is the {phaseName}! From home we see {none|half|all} of its bright half."
  - D&N — Earth turns one slow full turn; each pin glows warm in day and blue in night as it passes; "The lamp never moves. Earth turns, so each place has day, then night."
  - FACTS — each body acts: Sun's rays pulse; Earth's day/night shadow sweeps across it; the Moon glides round Earth; "The Sun, the Earth and the Moon — every sentence found its home."

## 8. Settings
1. **Task:** Moon in order / Name the Moon / Day and night / Sun, Earth or Moon. (Board at rest: the night rail / the four name cards / the turntable / the three body panels.)
2. **Phases:** 4 / 8 — the number of track stops and ORDER cards (4: quarter stops only; 8: every 45°). NAME always uses the four named phases.
(The hemisphere is a LOCALE fact from the earth-and-space bank — pt = S, all others N — never a setting; a mirrored Moon taught to the wrong hemisphere teaches a wrong Moon.)

## 9. Words (EN source)
- title "The Moon Lamp" · page title "The Moon Lamp — Moon Phases, Day and Night (Grade 1)"
- instructions: ORDER "Put the Moon's nights in order. Then watch it walk them." · NAME "Which name fits the Moon in the window?" · MAKE "Move the Moon until the window shows the {phaseName}." · D&N "Is it day or night at each pin? The lamp is the Sun." · D&N turn "Turn the Earth so pin {n} has {day|night}." · FACTS "Is each sentence about the Sun, the Earth or the Moon?"
- hints and celebrations: §7. `{phaseName}` from `phaseNames`; fact sentences and body names from the bank.
- settings: "Task" · "Moon in order" · "Name the Moon" · "Day and night" · "Sun, Earth or Moon" · "Phases" · "4" · "8".
- aria: "Moon on its track, stop {n} of {total}" · "Window: the Moon seen from home, {litWord}" · "Pin {n}" · "Sun / Earth / Moon".
- **Locale traps.**
  - **Phase names differ in kind**: pt "lua crescente" means FIRST QUARTER (not crescent), "lua minguante" last quarter — taken verbatim from the reviewed bank, never re-derived. de "zunehmender Halbmond / abnehmender Halbmond", fr "premier / dernier quartier", fi "ensimmäinen neljännes"… all from the bank.
  - **Hemisphere:** pt renders the waxing Moon lit on the LEFT (bank `hemisphere: 'S'`); the gate asserts the window side per locale.
  - **Fact sentences have gender-neutral subjects** in de/fr/es/it/pt (the bank's `leakForms` rule: "It/Er/Sie" would give away der Mond / die Sonne / die Erde) — reuse verbatim.
  - Celebration "grows/shrinks" per locale; de capitalises Sonne/Erde/Mond; Nordic definite forms (Solen, Jorden, Månen) come from `bodies`.
  - Day/night tokens are icons (sun disc, crescent) — no words to translate on the turntable.

## 10. Sound off, access, phones
- Legible with sound off: everything is shapes, light and the window; words only on name and fact cards.
- Keyboard: ←/→ for the Moon and Earth; announcements ("Stop 3: first quarter, half lit").
- Taps ≥ 44 px (Moon bead 96/64 px; cards ≥ 48 px tall; pins 26 px drawn with a 48 px hit area; tokens 44 px).
- Pictures: Sun, Earth ≥ 96 at 704, ≥ 64 at 360; the Moon in the model, the window and on the phase cards is the drawn moon-phase diagram (80/64 px cards — apparatus, not a picture).
- Check above the fold at 360 × 740 (≈ 640) and 320 × 640 (≈ 600); on phones the window becomes the corner inset.

## 11. Distinct from
- **#227 The Shadow Lamp** (aim a lamp at shadows on a wall, readiness) — there the lamp casts silhouettes; here the lamp lights a ball and the skill is viewpoint.
- **#238 The Season Wheel** (seasons turn forward) and **#239 Weather Window** — weather and seasons, not the sky model.
- **#244 The Rising Camera** (top views of objects) — maps.
- No other space activity exists; the planets row (#314) is blocked on art.

## 12. Build plan
- **Core** `MoonLampCore`: `theta(moonAngle)`; `phaseAt(theta)` → continuous lit fraction + side by hemisphere; `stopOf(angle, stops)`; `orderGrade(slots, run)` → first mismatch index; `nameGrade(card, phase)`; `makeGrade(moonStop, phase)`; `dayAt(pinAngle, earthRotation)` → day|night (|a| < 90); `turnGrade(rotation, pin, want)` (≥ 15° margin); `factGrade(card, body)` from the bank's truth vectors.
- **Gate's own truth** (`verify-moon-lamp-core.js`): its own lit-fraction formula and side rule (independent of the core); every ORDER run is consecutive forward phases; every NAME phase ∈ {0,2,4,6}; every pin ≥ 15° from the terminator and its truth recomputed; every FACTS round has one card per body and ≤ 1 per concept, no biggest+smallest pair; pt window mirrored, others not; the window never draws an empty new Moon (grey disc present); balance numbers of §6.
- **Mutations (each killed):** the library space/moon used inside the window or a phase card · the NAME sight line left visible · waxing lit on the wrong side in N · pt not mirrored · the bead's shadow fixed instead of facing away from the lamp · ORDER accepts a backward run · NAME accepts a crescent for "first quarter" · new Moon drawn empty · a pin's day computed from the disc instead of the lamp (shading turns with the disc) · TURN accepts a pin on the line · FACTS accepts "makes its own light" on the Moon · the NAME cap missing (track gives it away) · lamp-off leaves the Moon lit.
- **Pictures:** beach/sun (lamp + FACTS Sun panel), space/earth (model + FACTS Earth panel + D&N corner label; used as a picture only, never rotated in-plane as a top view), space/moon is NOT used anywhere (FACTS shows the full-Moon diagram).
- **Moon art (critic ruling, after opening the space contact sheet):** the library `space/moon` is NOT a full disc — its left limb is shaded blue, so it already reads as a gibbous lit on the right (the earth-and-space worksheet critic refused it for exactly this; and for pt it is the wrong side). A mask can darken but never add light, so under the phase mask a FULL Moon would still show a dark left edge and the pt window would be wrong at every phase. Therefore the track bead, the window and the ORDER phase cards are a drawn DIAGRAM by the reviewed `primitives/moon-phase.js` recipe (soft-grey disc, white lit part, terminator ellipse, teal rim — a science diagram of light, like a lit-fraction chart, tool-grade, no craters, no face), and the WHOLE phase set is drawn in that one style; the library moon picture never appears at all. Sizes: window 184/120 px, bead 96/64 px, phase cards 80 px at 704 and 64 px at 360 (a crescent's lit width at 64 px is 8.6 px — the floor; never smaller).
- **Risks:** pt's window mirrored (gate per locale). The model is a view from above the North Pole in y-UP maths coordinates (stop p at 180° + 45°p, counter-clockwise) — the builder converts to screen y-down. Nothing BLOCKED.

## 13. The four questions
1. **Choose it again?** Yes — driving the Moon round, switching the Sun off and watching a crescent fatten under your finger is a toy.
2. **Teacher on the board?** Yes — it is the classic lamp-and-ball demonstration every teacher wishes they could do in daylight, with the "view from home" window built in.
3. **Parent trust?** Correct science (lit fraction from the real angle, the right side per hemisphere), library pictures, no scores.
4. **Invention:** the Moon on the track is always half lit toward the lamp, and the window shows how much of that bright half you can see from home.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 3→5 · distinctness 5→5 · reality 3→5
What changed:
- Moon art ruled: the library space/moon is shaded on its left limb (already a gibbous lit right; the earth-and-space worksheet critic refused it) — a mask cannot add light, so a "full" window would be wrong and pt wrong at every phase. Bead, window, phase cards and the FACTS Moon are now the reviewed moon-phase.js diagram (continuous θ), one style, no library moon anywhere.
- Checked against the reviewed bank `data/b5/earth-and-space.js` + locales: four phase names {0,2,4,6} (pt lua crescente = first quarter, kept), hemisphere S only in pt (waxing lit LEFT — correct), the 13 facts and their concept/size rules — every FACTS row holds ≤ 1 per concept and never biggest+smallest (verified).
- Measured with my own script (work-c25/m262.js): the draft broke its own gates — pins numbered in angle order in 5 rounds (ρ = 1.0) and two pins 10° from the day/night line; ORDER given slot was 1 in 4 of 9 rows and never 4. All fixed: |ρ| ≤ 0.5, every pin ≥ 20° from the line, day 11 / night 13, given slots 2/2/2/2/1 and 2/2/2/2; NAME answer slot fixed per round (each slot once per pass).
- NAME leak closed: the Earth pin and its sight line pointed at the hidden Moon — hidden with the bead.
