# New 243 — The Window-Sill Pot → THE SUN YOU PULL ACROSS THE WINDOW (NGSS K-LS1-1)

## 0. Identity
- id `window-sill-pot.play.k-ls1-1` · grade K · framework NGSS K-LS1-1 (`alignment.framework` from `frontend/lib/frameworks.ts`) · strand Science · files `window-sill-pot-core.js`, `window-sill-pot-activity.js`, `window-sill-pot-activity.html`, `window-sill-pot-activities.json` (scaffold `node scripts/new-activity.js --num=243`).
- Worksheets covered: **K-376 "What Plants Need to Grow"** (in each row, circle the plant that gets both things it needs) = Compare mode. The worksheet's page mix (no water ×2 / no light ×2 / neither ×1) is the distractor mix of the Compare rounds.
- New instrument (no old activity). Soil and air are not a setting (they cannot be pictured honestly — see §3).

## 1. The pitch
"You set up the window sill — curtain, watering can, cupboard — then pull the sun across the window seven times — a week of days — and watch its beam: only the flower the beam reaches, with wet soil, climbs its stick to the flag."

## 2. Why a child will want it again
- **You are the sun.** A big drawn sun sits at the left end of a dotted arc across the top of the window. Drag it over the arc and the day happens under your finger: the sky brightens, and the sun's BEAM swings across the sill with it — sliding over the pot if the curtain is open, or stopping dead on the closed curtain or the cupboard door. At the right end the sun sets, the moon floats back across, and one of seven pebbles on the sill lights: one day. The flower answers every single day: one notch up its stick, or one shade paler, or one degree more tired. Drag the sun BACKWARDS and the day un-happens — the flower sinks back down, the colour returns. Children pull the sun to and fro just to watch the beam find (or miss) the flower.
- **Real things to do with the hand:** tip the watering can (drag it — drops fall, the soil darkens from the top down, the saucer fills), pull the curtain cord (the curtain slides, a sunbeam slants in and lands on the pot), swing the cupboard door and slide the pot in or out (inside, the pot sits in shadow).
- **The flag.** A green plant stick stands in every pot with seven ticks and a coral ribbon at the top. On day 7 a healthy flower's head touches the ribbon, the ribbon flutters and the flower gives one slow nod. That is the earned show.
- **Compare mode is a race nobody can rig:** three pots, one week, all at once. Watching two flowers fail in two DIFFERENT ways (one pale, one drooping) is the delight — and the lesson.

## 3. The skill and the misconception
- **Skill (K-LS1-1, K-376):** plants need water and light to live and grow; a plant that gets only one of them does not do well.
- **Misconceptions and how the sill pushes back (by what happens, never by a message):**
  1. *"Plants only need water"* (the common K idea: water = food). The watered pot in the cupboard or behind a closed curtain turns pale and floppy across the week while its stick tick never moves. In Compare mode 8 of 9 rounds contain a watered-but-dark pot beside the right one, so this is the comparison the child sees most.
  2. *"Sun is enough."* The sunny dry pot: the soil lightens to sand colour, cracks appear on day 3 (drawn lines), and the flower leans further each day.
  3. *"Any change means it grew."* Only the both-needs flower moves UP the stick; the others change, but never upward. Height on a ticked stick is the measure, not "looks different".
- **Honesty line (design, not screen):** a plant kept in the dark really turns pale and weak; it does not shrink. So the dark flower never gets shorter — it pales (saturation falls) and sags a little. A dry plant wilts (leans). Soil is left out (a pot of water alone also grows plants, so "no soil = no growth" would be a lie) and air cannot be pictured.

## 4. The stage
Layout stacked (the window needs the width); feedback bubble under the sill.

**At 704 px** (stage 640 × 560):
- **The window** (drawn, 600 × 300, top): a cream frame with 3 panes (in grow mode the middle pane is the pot's). Day = pale-blue sky + a drawn sun disc (geometry, 44 px) that the child drags along a dotted arc across the top (the time control, below); night = deep-blue sky + a drawn crescent. **Curtain** per pane: a coral panel (drawn rectangle with 4 fold lines) on a rail, with a round cord knob (48 px) at its side. Open curtain = a pale-yellow sunbeam (translucent drawn wedge) slanting onto the sill.
- **The sill** (drawn wood band 640 × 28) across the window bottom.
- **The pot** (drawn terracotta trapezoid, 120 w × 96 h, rim band 14) on the sill, with a **saucer** (drawn ellipse 140 × 18). Soil = an ellipse at the rim: wet `#5B3A29`, dry `#C9A778` with crack lines from day 3.
- **The flower** — a library picture standing in the pot, base anchored at the soil: start height 150 px (≈ 100 px wide, short side ≥ 96). Grows to 240 px over a perfect week (uniform scale from the base anchor).
- **The plant stick** (drawn green rod 6 px beside the flower): 7 ticks spaced so tick 7 = the flower's top at full growth; coral ribbon at tick 7.
- **The cupboard** (drawn, left edge, 150 × 260): a door that swings open on tap (250 ms); inside, a shelf in shadow (dark-teal overlay 70 %). The pot drags between sill and shelf.
- **The watering can** (drawn apparatus: rounded body, spout, handle; 110 × 80) resting on the sill at the right.
- **The sun arc** (the time control): a dotted 180° arc across the top of the window, the drawn sun disc (56 px, 64 px touch target) riding it; the sunbeam is a translucent pale-yellow wedge from the sun to the sill whose angle follows the sun, clipped by any closed curtain or the cupboard door (so the child SEES whether light reaches the pot). **Seven day pebbles** (drawn 22 px discs) along the sill's front edge light teal one per completed day.
- **Need chips** (setting 2, under each pot): a drop chip and a sun chip, 36 px, full when that need is given, hollow when not.
- **Compare mode:** each of the three panes holds one pot (96 w × 80 h; flowers 130 px → 210 px; one stick per pot). A "cupboard" pot sits behind a half-open drawn wooden door that closes its pane. Can and curtain cords are not interactive (the set-up IS the question); the sun is driven by Check (it crosses all three panes at once, its beam reaching or missing each pot).

**At 360 px** (stage 336 × 600): window 336 × 250 (panes 108 each); grow pot 100 w, flower 120 → 200 px; the cupboard moves BELOW the window as a low cupboard (150 × 110, door on top) beside the can (90 × 66); the sun arc spans the window top (sun 48 px drawn, 56 px target); pebbles 18 px. Compare: pots 84 w, flowers 104 → 170 px (short side ≥ 64). At 320: window 296 wide, flowers 100 → 160.

**Library pictures** (flowers, contact sheet `des/contact/flowers.png` opened): sunflower, tulip, zinnia, daffodil, aster, dahlia, cornflower, peony, petunia — single upright stem, one bloom, leaves on the stem. **Refused:** hydrangea, lilac, wisteria (clusters/branches that do not stand in a pot); lotus and water lily (grow in water — would contradict the soil picture); clover (no bloom); cherry blossom, azalea, hibiscus (branches); orchid (its bent stem reads as already drooping).

**Task lines** (≤ 24 px, never change): Grow "Give the flower what it needs. Then turn the week." · Compare "Which flower will reach its flag? Tap it, then press Check."

No words on the apparatus.

## 5. The hand
- **Watering can:** drag it over a pot (it tilts 35° as it nears, 80 ms). Over the pot, drawn drops (10 px) fall for 600 ms; the soil sweeps dry → wet top-down; the saucer gets a blue line. Tapping the can pours on the nearest pot. A watered pot is un-watered only by rewinding to day 0 or by the Reset chip.
- **Curtain cord:** tap or pull the knob down: the curtain slides open/closed (350 ms ease-out), the sunbeam fades in/out (200 ms). A pot under a closed curtain takes a cool shadow tint.
- **Cupboard:** tap the door → it swings open. Drag the pot: it lifts 6 px with a shadow and follows the finger; drop on the sill or the shelf (snap zones ≥ 120 px); elsewhere it glides back (200 ms).
- **The sun:** drag it along the arc (pointer projected onto the arc; the beam re-aims every frame). Reaching the right end completes the day: sunset tint, the moon glides back (300 ms), the sun reappears at the left, a pebble lights, and the flower eases into its new day state (180 ms). Releasing mid-arc lets the sun glide back to the start of that day (no half days). Tap the sun = one whole day forward (600 ms auto-crossing). Dragging the sun leftwards from its start = un-do the last day (the exact reverse). Mid-week the controls still work and the remaining days follow the new set-up (a plant moved into light recovers one shade per day — honest).
- **Sound (optional):** water patter, curtain swish, a soft click per pebble, a wooden creak for the cupboard, a two-note chime when the ribbon flutters. TTS says the flower's name when it is tapped.
- **Free play:** after success everything stays live, so a child can run "what if I take the light away now?" weeks as long as they like.

## 6. The rounds
**Grow mode — 9 rounds per pass** (one flower; the start always lacks something).
**The round opens on LAST week (diagnose first, then fix):** the sill is shown at day 7 of a week already lived with the starting set-up — the flower stands pale, leaning in cracked soil, or both, the seven pebbles lit. A small drawn "↺" beside the sun invites the child to pull it back; pulling the sun back to day 0 replays the trouble in reverse (the colour returns, the lean straightens), so the child SEES what the set-up did before touching the can, curtain or cupboard. Check is enabled only from day 0. This turns grow mode from "do everything" into "read what went wrong, then change exactly that" — and round 4/5/9 (both missing) show both troubles at once.

| # | flower | pot starts | curtain | soil | missing (= the trouble shown at day 7) |
|---|---|---|---|---|---|
| 1 | sunflower | cupboard | open | wet | light |
| 2 | tulip | sill | closed | wet | light |
| 3 | zinnia | sill | open | dry | water |
| 4 | daffodil | sill | closed | dry | both |
| 5 | aster | cupboard | open | dry | both |
| 6 | dahlia | sill | open | dry | water |
| 7 | cornflower | cupboard | closed | wet | light |
| 8 | peony | sill | open | dry | water |
| 9 | petunia | sill | closed | dry | both |
Missing light 3 / water 3 / both 3. Solved = day 7 reached with water AND light on all 7 days (flower at the flag). Round 7 needs TWO moves for light (out of the cupboard and the curtain open) — the hardest light round.

**Compare mode — 9 rounds per pass** (three identical flowers of one kind; WL = water + light, W− = light but dry, L− = watered but curtain closed, C = watered but in the cupboard, N = dry and dark):
| # | flower | pot 1 | pot 2 | pot 3 | right |
|---|---|---|---|---|---|
| 1 | tulip | WL | W− | L− | 1 |
| 2 | sunflower | L− | WL | N | 2 |
| 3 | zinnia | W− | C | WL | 3 |
| 4 | daffodil | L− | WL | W− | 2 |
| 5 | cornflower | L− | W− | WL | 3 |
| 6 | aster | WL | C | N | 1 |
| 7 | petunia | W− | N | WL | 3 |
| 8 | dahlia | WL | L− | W− | 1 |
| 9 | peony | C | WL | L− | 2 |
- Exactly one WL pot per round. 8 of 9 rounds hold a watered-but-dark pot (misconception 1); round 7 instead pits two dry pots against it.
- **Answer position:** the right pot is in slot 1, 2 and 3 exactly three times per pass (33 % < the 40 % ceiling). The gate measures over 1,000 reshuffled passes that each slot's frequency is 33 ± 3 % and that the same slot is never right more than twice in a row.
- **Order:** order-only reshuffle per pass (`nextTask`), pass 2 ≠ pass 1.

## 7. Check, the misses, the success
**Grow mode** (Check = run the week: the sun crosses by itself seven times, 400 ms per day):
- **Check before winding back to day 0** → the sun's ↺ pulses, no miss: "Turn the week back to the start first."
- **Check with nothing changed** → hint, no miss: "Change something first: the can, the curtain or the cupboard."
- **Miss 1:** the week runs and the flower shows its own trouble — pale and sagging (no light) and/or leaning in cracked soil (no water). Then the missing need's chip under the pot blinks hollow (shown on a miss even with chips hidden). Hint: "Look at the flower. What did it not get this week?"
- **Miss 2:** the CONTROL for the missing need pulses (the curtain knob / the cupboard door with the sill outline glowing / the can) and the sun runs the week back to day 0 by itself. Hint: "The flower needs water and light — both."
- A new change (can, curtain, cupboard, sun) takes the help away until the next Check.
- **Success:** the flower climbs one tick a day, touches the ribbon on day 7; the ribbon flutters, the flower nods, the seven pebbles light in a ripple. "Water and light! The {flower} grew all week."

**Compare mode** (tap a pot = put a coral flag-pin in its stick; tap another to move it):
- **Check with no pot chosen** → hint, no miss: "Tap the flower you think will grow."
- **Miss 1:** a soft shade drops over the other two panes (the answer stays hidden); only the chosen pot lives its week and fails in its own way; the week runs back. Hint: "This flower did not get everything. What was missing?"
- **Miss 2:** need chips appear under all three pots (if hidden) and every hollow chip blinks; the chosen pot's hollow chip blinks coral. Hint: "Find the flower with a full drop AND a full sun."
- **Success:** the shades lift and all three pots live the same week side by side — the chosen one climbs to its flag, the others pale or droop. "This {flower} had water and light. The others were missing something."

## 8. Settings
1. **Mode:** grow your flower / which flower will grow — at rest: one pot, cupboard, can and the sun on its arc · three pots in three panes with set-ups, no can.
2. **Need chips:** show / hide — at rest: drop and sun chips under every pot · no chips (the child reads soil and curtain). Default show in grow mode, hide in compare mode (K-376 has no icons); a miss always shows them.

## 9. Words (EN source)
- title "The Window-Sill Pot" · instruction "Give a flower water and light for a week, and watch it grow."
- promptGrow "Give the flower what it needs. Then turn the week." · promptCompare "Which flower will reach its flag? Tap it, then press Check."
- hints: hintRewind "Turn the week back to the start first." · hintGrowStart "Change something first: the can, the curtain or the cupboard." · hintGrow1 "Look at the flower. What did it not get this week?" · hintGrow2 "The flower needs water and light — both." · hintPickStart "Tap the flower you think will grow." · hintPick1 "This flower did not get everything. What was missing?" · hintPick2 "Find the flower with a full drop AND a full sun."
- celebrations: celebrateGrow "Water and light! The {flower} grew all week." · celebrateCompare "This {flower} had water and light. The others were missing something."
- aria: ariaDay "Day {n} of 7." · ariaPot "{flower}: water {yes|no}, light {yes|no}." · ariaGrew "The {flower} is at its flag." · ariaPale "The {flower} is pale." · ariaDroop "The {flower} is drooping."
- settings: setMode "Mode" · modeGrow "Grow your flower" · modeCompare "Which will grow?" · setChips "Need chips" · chipsShow "Show" · chipsHide "Hide".
- **Locale traps:** {flower} is the vocab singular; each locale frames the sentence so the noun stays in one case (fi nominative frame "{flower} kasvoi koko viikon"; de article by the entry's gender — "die Sonnenblume", "der Krokus"; fr elision "l'aster"; it "il girasole / la peonia"). The reviewer runs every flower through every frame. The week is 7 pebbles with NO weekday names, so week-start (Monday vs Sunday) never arises. "Flag" must be the ribbon/marker word, not a national flag (nl vlaggetje, sv flagga → reviewer may prefer "band"). No seasons named (southern-hemisphere safe). Regional flower names (pt-BR narciso, sv pingstros) follow the vocab labels.

## 10. Sound off, access, phones
- Legible with sound off: sky day/night, the beam reaching or stopping, the pebbles, tick height, colour, lean, soil colour and cracks, chips.
- Keyboard: Tab can → curtain knob → cupboard → pot → sun → Check; Enter pours / toggles / opens; pot: Enter lifts, ←/→ chooses sill or shelf, Enter drops; sun ←/→ = one day back/forward. Compare: ←/→ moves the flag-pin.
- aria-live per day step and per change (§9).
- Taps ≥ 44: cord knob 48, sun 64 target, can 110 × 80, cupboard door ≥ 110 tall, pots ≥ 84 wide.
- Pictures ≥ 96 short side at 704 (start size), ≥ 64 at 360.
- Fold at 360 × 740: header 56 + task 52 + window 250 + cupboard/can row 120 + Check 56 ≈ 534. At 320 × 640 ≈ 510.
- **Transform risk (the operator's flag):** scale is anchored at the soil so the flower never floats; lean rotates about the stem base, clamped at 28°, and the bloom never crosses the pane edge; pale = `saturate()` down to 0.35 plus `sepia(0.3)`. The reviewer reads all four week-7 end states (both / no light / no water / neither) at 360 and 704; none may look like a broken image.

## 11. Distinct from
- **#231 Plant Builder** (planned, blocked): plant PARTS and the water path inside the plant; this is the plant's NEEDS over time. **#264 Cycle Wheel** (planned): life-cycle stages; here there is no seed-to-fruit story.
- **#239 Weather Window** (planned): reads the weather; here the window is a light control.
- Registry: no built or designed activity makes the child the SUN whose beam visibly reaches or misses the thing being tested. The Sleeps Calendar #210 is days-as-moons (no cause and effect); **#233 Mother and Baby winds a growing-up crank** — so this design deliberately has NO crank: time is the sun's own journey, and the same gesture carries the light that is the lesson.
- Tools: `measurement-bench` measures length; the stick ticks here are only a growth readout.

## 12. Build plan
- **Core state** `{mode, chips, roundIdx, pots:[{flower, place:'sill'|'cupboard', curtain:'open'|'closed', water:boolean, log:[{water,light}×7]}], day:0..7, pick:null|0..2, help}`.
- **Functions:** `light(pot)` = place==='sill' ∧ curtain==='open'; `step(±1)` writes/reads `log`; `dayState(pot,d)` → `{tick, sat, lean, cracks}`: tick = count of days 1..d with water∧light (a day missing either adds 0); sat = clamp(1 − 0.09 × dark days + 0.09 × lit days after dark, 0.35, 1); lean = clamp(4° × dry days, 0, 28); cracks = dry days ≥ 3; `atFlag(pot)` = tick === 7; `check()`; `helpLevel()`; `hintKey()`; `layout(width)`.
- **Gate's own truth (verify-window-sill-pot-core):** an independent table `outcome(water, light)` = {TT: grows; TF: pale; FT: droops; FF: pale + droops}; every Compare round has exactly one TT pot; slot counts 3/3/3; 8 rounds contain a TF pot; Grow starts never TT and the missing kinds are 3/3/3; tick never rises on a day missing a need; tick 7 only from a full TT week; rewind to day 0 restores the exact start; sat ≥ 0.35, lean ≤ 28; every flower key is in the accepted list and exists.
- **Mutations:** the beam passes through a closed curtain or the cupboard door · a half-crossed sun counts as a day · grow round opens at day 0 instead of the lived day 7 · Check accepted mid-week · dark pot grows · dry pot grows · tick rises on a dark day · lean applied to the dark-only pot · pale applied to the dry-only pot · rewind leaves the water set · a Compare round with two right pots · right slot stuck at 1 · cupboard counted as light · closed curtain counted as light · Check with no change counts a miss · help kept after a new move · Compare miss 1 shows the other pots (shades missing).
- **Pictures to verify:** flowers/sunflower, tulip, zinnia, daffodil, aster, dahlia, cornflower, peony, petunia (seen). Pot, saucer, can, curtain, cupboard, sun arc, beam, moon, pebbles, stick, chips = drawn apparatus.
- **Risks:** the transforms (§10); keeping the dark tint dark enough to read as "dark" while the flower stays clearly visible. **Not blocked.**

## 13. The four questions
1. **Would a child choose it again?** Yes — a sun you pull across the sky to make a week happen and un-happen, a can that pours, a curtain that lets a sunbeam in, and a ribbon at the top of the stick to reach.
2. **Would a teacher put it on the board?** Yes — the classic two-plant experiment, run in seconds and rerun on demand; the watered-but-dark plant (the misconception) fails in front of the class nearly every round.
3. **Would a parent trust it?** Calm, library flowers, honest science (dark plants pale, they do not vanish), no score or timer.
4. **The invention:** the child pulls the sun across the window — each crossing is a day, and its beam visibly reaches the flower or stops at the curtain — replaying, and rewinding, what water and light do to it.

## 14. Critic review (2026-10-17)
Scores before → after: invention 4→5 · fun 5→5 · completeness 5→5 · correctness 4→5 · distinctness 3→5 · reality 5→5
What changed:
- The week crank collided with #233 Mother and Baby's growing-up crank (same wind-to-scrub-time toy). The time control is now THE SUN: the child pulls a drawn sun along an arc across the window, one crossing = one day, and its beam swings across the sill — reaching the pot or stopping on the closed curtain / cupboard door. Time and light are one gesture, so the cause (light) is seen every single day, not inferred.
- Grow mode could be solved by doing everything without reading anything. Each grow round now OPENS on last week's day 7 (the flower already pale / leaning / both); the child pulls the sun back to see the cause un-happen, then fixes exactly what was missing. Check is enabled only from day 0 (new hint + two mutations).
- Verified on `flowers.png`: all nine flowers (sunflower, tulip, zinnia, daffodil, aster, dahlia, cornflower, peony, petunia) are single upright stems with one bloom and are labelled in `flowers.json`; the refusals (hydrangea, lilac, wisteria, lotus, water lily, clover, cherry blossom, azalea, hibiscus, orchid) are right. Compare-mode slot balance 3/3/3 and the 8-of-9 watered-but-dark count re-checked.
