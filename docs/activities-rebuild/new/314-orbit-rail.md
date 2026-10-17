# New 314 — The Orbit Rail → THE STRETCH TO TRUE DISTANCE: you order the planets on evenly spaced rails, then the rails slide out to where the planets really are — and in sort mode a lander and an orbit thread test what each body is (NGSS 5-ESS1-1, taught at grade 3)

## 0. Identity
- **id** `orbit-rail.play.solar-system` (critic ruling — was `…5-ess1-1`) · grade 3 · **framework READINESS-style "no alignment claimed"** (`alignment.framework: 'READINESS'`, internal code `solar-system`) · strand Science · key `orbit-rail` → `orbit-rail-core.js`, `orbit-rail-activity.js`, `orbit-rail-activity.html`, `orbit-rail-activities.json`; framework via `frontend/lib/frameworks.ts`. Scaffold: `node scripts/new-activity.js --num=314`.
- **Worksheets covered:** G3-394 "Planets in Order from the Sun" (write each planet's name on its line from the Sun outwards, using every name once) · G3-395 "Giant and Rocky Planets" (sort the names: giant planet / small rocky planet / not a planet; the not-planets are the Sun and the Moon).
- **Grade fit, honestly (critic):** NGSS 5-ESS1-1 is about the Sun looking brighter than other stars because it is nearer — it does not mention the planets, their order or rocky/giant, and no NGSS K-5 performance expectation does (planet scale and order sit in MS-ESS1-3). Claiming 5-ESS1-1 would be a false alignment, so the page claims none. The content itself fits grade 3 honestly: naming the eight planets in order and sorting rocky/giant is taught to 8–9-year-olds in many curricula (US grade-3 solar-system units, England's Year 5 "Earth and space", the national curricula behind our other locales list the solar system in grades 3–5) and it is exactly what the catalogue's grade-3 worksheets G3-394/395 ask — recall and classification, no maths beyond order. The year race and true distances are shown, never tested. (If the coverage plan must keep the old id string, keep it but set the framework to READINESS so no NGSS code is shown or emitted.)
- New instrument; no old activity.
- **⚠ BLOCKED on library art (built on the honest fallback, §12):** the space pictures for Mercury, Venus, Uranus and Neptune are scientifically wrong and Jupiter, Mars and the Sun have no labels.

## 1. The pitch
"Hang the planets on eight evenly spaced rails, nearest the Sun first — then pull the stretch lever: the rails slide out to the planets' TRUE distances, the four small rocky planets huddle right next to the Sun and the giants fly far apart; a planet on the wrong rail can't follow and is left hanging in empty space where you put it."

## 2. Why a child will want it again
- **The lever is the best moment.** Order mode starts with the rails evenly spaced — exactly how most children imagine the solar system. Pulling the brass stretch lever (Check) sends the whole system sliding outwards in 1.2 s: Mercury, Venus, Earth and Mars crowd into a tight knot by the Sun while Jupiter, Saturn, Uranus and Neptune race off towards the far edge, Neptune last of all. A round magnifier then floats over the inner knot so the four little planets can be seen. Every child gasps the first time; many want to pull it again, and between rounds they can.
- **The year race.** When the order is right, every planet starts orbiting at its true relative speed: Mercury whizzes round four times while Earth goes round once, Mars manages half a lap, Jupiter crawls a twelfth of the way, Neptune barely moves. "The ones near the Sun are fast" is something the child watches, not something they are told.
- **The lander (sort mode).** A little drawn probe (a box on three legs) can be dropped on any body: on Mercury, Venus, Earth, Mars — and the Moon — it touches down in a puff of dust and stands; on Jupiter, Saturn, Uranus, Neptune it sinks through the cloud bands and disappears, popping back to its dock a second later ("there is no ground to land on"); near the Sun it stops short in a heat shimmer and backs away. Children test everything, which is exactly the science.
- **The orbit thread.** Tap a body's thread spool and a dashed loop draws what it goes round: every planet's loop goes round the Sun; the Moon's loop goes round the Earth; the Sun has no loop — everything goes round it.
- **Free play:** after each round the lever, the lander and the threads work freely.

## 3. The skill and the misconception
- **Skill:** name the eight planets in order from the Sun (Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune); know the four inner ones are small rocky planets and the four outer ones giant planets; know the Sun (a star) and the Moon (it goes round the Earth) are not planets.
- **Misconception 1 — the planets are evenly spaced (or in random order).** **Pushback:** the work surface *is* the misconception (even rails); the lever replaces it with the truth every round — rocky planets within a few percent of the radius, giants spread out to the edge. A misplaced planet cannot follow its rail and stays hanging at the even-spacing radius, ringed in coral, while the dashed true rail it belongs on is visible further in or out (but unnamed).
- **Misconception 2 — the Moon (or the Sun) is a planet.** **Pushback (sort mode):** the Moon passes the lander test (it is rocky) but its orbit thread goes round the *Earth*, not the Sun; the Sun fails both (no ground, no orbit — it is the centre).
- **Misconception 3 — the big planets are near the Sun / size goes with order.** The giants are *outside*; the stretch shows the rocky four packed inside, the giants far out.
- **Pluto** is honestly absent until there is art (§12); when added it joins sort mode as a third not-a-planet ("dwarf planet"): the lander lands, its thread goes round the Sun, so a third test — "is it big enough to be round and clear its path?" — is NOT attempted at grade 3; Pluto would be a named, taught exception, not a tested one.

## 4. The stage
**Order mode at 704 px (the rails are the hero):**
- **Task line:** **"Put the planets in order, starting next to the Sun. Then pull the lever."**
- **The Sun:** a drawn sun edge on the stage's left (`primitives/sky-bodies.js sunEdge`, yellow, 48 px deep, the full stage height 420 px) — apparatus geometry, no face.
- **The rails:** 8 concentric arcs (2 px dashed ink, cream between) centred on a point 40 px left of the stage, radii evenly spaced from 110 to 600 px (pitch 70 px) — in the "first four" level only 4 rails, pitch 120 px. Each rail has a **slot** (a small brass cradle 64 px) at a staggered angle (alternately 18° above and below the midline) so neighbouring planets never overlap.
- **The tray** (under the rails, 660 × 112): 4–8 **planet cards**, each a glyph (box 96 px — the primitive draws its disc at 60 % of the box, so the planet itself is 58 px; Saturn's and Uranus's rings reach the box edge) above its **native name** (16 px Nunito 700, from `data/b5/locales/earth-and-space.<loc>.json → planets`). A pre-placed planet sits in its slot with a brass pin.
- **The stretch lever:** a 44 × 120 brass lever at the right edge of the rails (this is Check).
- **Stretched view:** rails redraw at r = 48 + 18.7 px × (true distance in AU): Mercury 55, Venus 61, Earth 67, Mars 76, Jupiter 145, Saturn 226, Uranus 407, Neptune 609. Planets shrink to coloured tokens (14 px drawn dots in each glyph's colour) and a **magnifier** (a 140 px lens, ×6) floats over the inner knot showing the four inner glyphs at 40 px.

**Sort mode at 704 px:**
- **Task line:** **"Sort each one: small rocky planet, giant planet, or not a planet."**
- **Three bays** across the stage (each 200 × 220, a cream tray with its label as content text: native `classLabels` — "small rocky planet" / "giant planet" / "not a planet"); a **body tray** below with 5–6 cards (glyph box 96 px + name 16 px — every body a drawn glyph, Sun = sunDisc, Moon = moonDisc).
- **The lander dock** (right edge: the probe 56 × 56, drawn tool-grade) and a **thread spool** on every card (a 24 px brass knob inside a 44 px hit area). Both are **locked (greyed) until the first Check** of the round (§7) and free in free play.

**At 360 px:**
- Order: the Sun runs along the **top** edge (sunEdge side 'top', 36 px deep); rails become horizontal arcs stacked downwards, pitch 46 px (first four: 80 px), slots staggered left/right; planet glyphs in a 64 px box (disc 38 px; the primitive refuses below 56). Tray: two rows of four cards (78 × 96). Lever: a 120 × 44 bar under the rails.
- Sort: the three bays stack as three 328 × 96 strips; bodies (64 px) in a tray of two rows.
- **Fold budget 360 × 740:** order: header 56 + task 52 + rails 8 × 46 + 40 = 408 + tray 200 → Check lever at ≈ 580. 320 × 640: rails pitch 40 (glyphs 56 overlapping the dashed line, staggered), tray cards 70 × 90 → lever at ≈ 560. Sort: 56 + 52 + 3 × 96 + tray 150 + Check 48 = 594 / 560. Above both folds.

## 5. The hand
- **Drag a planet** from the tray to a rail: it snaps into the nearest slot within 36 px (90 ms) with a soft "tunk"; dropped on an occupied slot it **bumps the other planet back to the tray** (the bumped card slides home in 200 ms). Drag a placed planet back out to the tray or to another rail. A pre-placed planet's pin keeps it fixed.
- **Pull the lever (Check, order mode):** the lever swings down (200 ms), then the stretch (1.2 s, ease-out): each correctly placed planet rides its rail to its true distance; a misplaced one stays at its even-spacing radius, ringed coral; unfilled slots stay empty. After 1.5 s (miss) the system slides back to even spacing so the child can fix it.
- **Sort mode:** drag a body into a bay; drag between bays; Check button 140 × 52 under the bays.
- **Lander (unlocked after the first Check, and in free play):** drag it onto a body card: rocky → it lands (legs touch the disc's top edge, a 6-dot dust ring); giant → it sinks into the disc (scaled to 0 inside the disc over 600 ms) and pops back to the dock; Sun → stops 20 px short, a heat-shimmer wobble, backs away. **Thread:** tap a card's spool: a dashed loop draws (500 ms) round a small Sun disc or, for the Moon, round a small Earth disc, drawn above the card.
- **Keyboard:** Tab to a card, Enter picks it up, ↑/↓ choose a rail (or ←/→ a bay), Enter drops; L = lander on the focused card, T = thread; Enter on the lever/Check.
- **Sound (bonus):** tunk on snap, the lever's ratchet, a rising whoosh for the stretch, a soft thump for landing, a bubbling sink.

## 6. The rounds
**Order mode** — one round = a run of consecutive rails (4–8) with 0–1 planet pre-placed and the rest shuffled in the tray. Tray orders are never the answer order, never reversed, and never any locale's **alphabetical** order (checked against all 11 locales' `PLANET_ALPHA`). Measured (`work-42/orbit.js`):

| # | first four (rails 1–4) | | all eight | |
|---|---|---|---|---|
| | pre-placed | tray | rails · pre-placed | tray |
| 1 | — | Earth, Mercury, Mars, Venus | 1–8 · — | Saturn, Earth, Neptune, Mercury, Mars, Uranus, Venus, Jupiter |
| 2 | Mercury | Mars, Venus, Earth | 1–8 · Earth | Uranus, Jupiter, Mercury, Neptune, Mars, Venus, Saturn |
| 3 | Earth | Venus, Mars, Mercury | 5–8 · Jupiter | Uranus, Neptune, Saturn |
| 4 | — | Mars, Earth, Mercury, Venus | 3–7 · — | Jupiter, Uranus, Earth, Saturn, Mars |
| 5 | Mars | Venus, Earth, Mercury | 1–6 · — | Mars, Saturn, Venus, Jupiter, Mercury, Earth |
| 6 | Venus | Mercury, Mars, Earth | 4–8 · Uranus | Saturn, Mars, Neptune, Jupiter |
| 7 | — | Venus, Mars, Earth, Mercury | 1–8 · Saturn | Venus, Neptune, Mars, Mercury, Uranus, Jupiter, Earth |
| 8 | — | Earth, Mars, Venus, Mercury | 2–7 · — | Saturn, Earth, Uranus, Jupiter, Venus, Mars |

- **Variety the child can see (critic — the first-four level was eight rounds of the same four answers):** in rounds 2, 4, 5, 7 (first four) and 2, 4, 6, 8 (all eight) the **Sun stands on the RIGHT** (the whole system mirrored; at 360 the Sun runs along the bottom edge) — so "Mercury goes on the left" fails and only "nearest the Sun" works. In rounds 3, 5, 7 (first four) and 1, 5, 7 (all eight) the tray also holds a **Moon card** (moonDisc + native name) and a cream **saucer** with no rail sits at the tray's end: the Moon belongs in the saucer. A Moon dropped on a rail takes the rail like any card; on Check it does not ride the stretch — its thread loops round the Earth glyph (if the Earth is placed) and it is ringed coral: "the Moon goes round the Earth, not the Sun". The Moon rounds put the not-a-planet misconception into the order task too.
- A run that does not start at rail 1 (all-eight rounds 3, 4, 6, 8) shows the rails before it as faint, already-done rails with their planets as grey tokens — the child places from the first open rail, so knowing *neighbours* matters, not just reciting from Mercury.
- **Bot "tray left-to-right onto rails inner-to-outer":** 2 of 28 placements right (first four), 3 of 46 (all eight) — at or below chance; it never completes a round.

**Sort mode** — one round = 5–6 bodies with exactly one not-a-planet (Sun or Moon):

| # | bodies (tray order) | classes |
|---|---|---|
| 1 | Earth, Moon, Mercury, Jupiter, Mars | R N R G R |
| 2 | Saturn, Venus, Sun, Earth, Neptune | G R N R G |
| 3 | Mars, Jupiter, Uranus, Moon, Venus, Saturn | R G G N R G |
| 4 | Sun, Mercury, Saturn, Earth, Uranus | N R G R G |
| 5 | Neptune, Earth, Mars, Jupiter, Moon | G R R G N |
| 6 | Venus, Uranus, Mercury, Sun, Saturn, Mars | R G R N G R |
| 7 | Jupiter, Moon, Venus, Neptune, Earth | G N R G R |
| 8 | Mercury, Saturn, Neptune, Mars, Sun, Uranus | R G G R N G |

- **Measured:** 18 rocky, 17 giant, 8 not-a-planet (4 Sun, 4 Moon); the not-a-planet card sits in tray positions 1/2/3/4/5/6 = 1/2/1/2/2/0; no three cards of one class in a row; "always rocky" bot 18/43, "always giant" 17/43.
- **Order:** order-only reshuffle per pass; inside a round the tray order is re-dealt each pass under the same three constraints (not the answer, not reversed, not alphabetical in any locale).

## 7. Check, the misses, the success
- **Check with nothing placed** → **"Drag a planet onto the rail nearest the Sun."** / sort: **"Drag each one into a bay."** · **cards left in the tray** → **"Every planet needs a rail."** / **"Sort every card."** (no miss).
- **Order — miss 1 (the stretch shows who is lost):** right planets ride out to their true distances; wrong ones stay hanging, ringed coral; the dashed true rails are visible but unnamed. Then everything slides back. Hint EN: **"The planets with a red ring are on the wrong rail. Which planet comes next after the Sun?"**
- **Order — miss 2 (the first letters):** each open rail shows the first letter of its planet in the page language on its cradle (Me / V / E / Ma / J / S / U / N — two letters where two planets share a first letter in that language), and the locale's classroom mnemonic sentence appears under the rails with those letters in bold (native, authored per locale: en "My Very Educated Mother Just Served Us Noodles"; de "Mein Vater erklärt mir jeden Sonntag unseren Nachthimmel" …). Hint EN: **"The first letters show the order. Find the planet that starts with each one."**
- **Sort — miss 1 (the tests run by themselves):** the lander visits each misplaced card and lands / sinks / backs away; then its thread draws. Hint EN: **"Watch the tests: can the lander stand on it, and what does it go round?"**
- **Sort — miss 2:** the three bays show their test on a small sign — rocky: lander standing + loop round the Sun; giant: lander sinking + loop round the Sun; not a planet: no loop round the Sun — drawn icons in tool colours. Hint EN: **"A planet goes round the Sun. Rocky ones have ground to land on."**
- A new drag takes the help away until the next Check.
- **Success (order):** the full stretch with the magnifier, then the year race for 6 s (Earth one lap). Bubble EN: **"{list} — from the Sun outwards!"** · **(sort)** each bay's cards lift and settle with their test icons, then the **size parade**: the round's planets roll out in a row at TRUE relative size (Earth 12 px, Mercury 5, Mars 6, Venus 11, Uranus 48, Neptune 47, Saturn 113, Jupiter 134 at 704; at 360 the row scrolls inside the bay strip) — "small" and "giant" become something seen, after the answer, never before it. Bubble EN: **"Rocky: {a}. Giant: {b}. Not a planet: {c}."** · Moon in the saucer (order): **"The Moon goes round the Earth — it is not a planet."**

## 8. Settings
1. **Mode:** order from the Sun (default) / rocky or giant — changes the whole board at rest (rails vs bays).
2. **Planets:** first four (default) / all eight — changes the number of rails and tray cards at rest (order mode; sort mode always uses all eight plus the Sun and the Moon).

## 9. Words (EN source)
- title **"The Orbit Rail"**
- instructions **"Put the planets in order, starting next to the Sun. Then pull the lever."** · **"Sort each one: small rocky planet, giant planet, or not a planet."**
- hints as §7; celebrations **"{list} — from the Sun outwards!"** · **"Rocky: {a}. Giant: {b}. Not a planet: {c}."**
- bay labels and body names: from `data/b5/locales/earth-and-space.<loc>.json` (`planets`, `notPlanet`, `classLabels` — already native-reviewed for G1-378).
- settings **"Mode"**: "order from the Sun" / "rocky or giant" · **"Planets"**: "first four" / "all eight"
- aria: rail `"rail {i} from the Sun, {planet | empty}"`; card `"{name}, in the tray"`; lander result `"the lander stands on {name}"` / `"the lander sinks into {name}: no ground"`.
- **Locale traps:** (a) **Planet exonyms** differ (Erde/Tierra/Terre/Maa/Jorden; Giove; Netuno pt-BR, Neptuno es) — all from the reviewed data file, never hand-typed. (b) **First-letter collisions per locale** — the cradle shows each planet's SHORTEST UNIQUE prefix in the page language, computed from the reviewed names (measured, `work-c42/c-orbit.js`): en/de **Me V E Ma J S U N** · fr/es/pt **Me V T Ma J S U N** (Terre/Tierra/Terra) · it **Me V T Ma G S U N** (Giove) · nl **Me V A Ma J S U N** (Aarde) · sv/da/no **Me V Jo Ma Ju S U N** (Jorden and Jupiter collide — the designer's list missed it) · fi **Me V Maa Mar J S U N**; the gate recomputes the prefixes and fails on any duplicate. (c) **Mnemonics are per locale and must be classroom-real** (the native panel supplies one; where none is common — fi, da — the miss-2 sentence is omitted and only the letters show). (d) **"not a planet"** gender/case: fr "pas une planète", es "no es planeta" — from the data. (e) **"Earth" with or without article** in the celebration list: fr "Mercure, Vénus, la Terre …" — the list is authored as a whole literal per locale, not joined by code. (f) Capitalisation: de/en capitalise all, fr/es/it/pt "la Terre / la Tierra" lower article; Moon/Sun capital per locale convention.

## 10. Sound off, access, phones
- Sound off: the stretch, the coral rings, the magnifier, the year race, the lander landing/sinking/backing away, the thread loops — all visible.
- Keyboard path §5; focus 3 px teal; aria-live on the bubble.
- Taps: cards ≥ 70 × 90; slots 64; lever 44 × 120; spool 44.
- Sizes: planet glyphs in a 96 px box at 704 (disc 58 px) and a 64 px box at 360 (disc 38 px — the primitive throws below 56, so 64 is the phone size, never smaller); slots 96 / 64. The Earth is the **planets.js earth glyph** and the Moon the **sky-bodies.js moonDisc** drawn at the same 60 % disc, the Sun **sunEdge** (order) / **sunDisc** (sort card) — **no library picture appears anywhere on this board** (critic: the earlier plan mixed library `space/earth`/`space/moon` with the drawn glyphs, which the art rule forbids — one style per board). When the corrected library set arrives it replaces ALL of them at once at ≥ 96 / 64 px.
- Check (lever) above both folds (§4).

## 11. Distinct from
- **New 262 The Moon Lamp** (the Moon always half lit): phases, not planets. **New 238 Season Wheel** (a wheel that only turns forward): the year's cycle, not the solar system.
- **New 208 The Marble Stairs / #22 Nesting Pots** (ordering by size): the order here is a fact about distance, and the pushback is the true-distance stretch, not a growing size.
- **New 265 The Punch-Card Key / New 263 The Rubbing** (material and covering tests): those test materials; the lander tests *ground vs gas* and the thread tests *what it orbits* — a two-question key for bodies in space.
- No premium tool covers space. No reuse of a built invention.

## 12. Build plan
- **Core state:** order `{ rails:[i], pre:i|null, placed:{rail:id}, tray:[id], checks, help }` · sort `{ bodies:[id], bays:{id:'rocky'|'giant'|'not'}, tray:[id], testsUnlocked, checks }`.
- **Functions:** `place(id, rail)` (bump), `stretch()` → per planet `{rightRail, trueR}`; `TRUE_AU = {mercury:.39, venus:.72, earth:1, mars:1.52, jupiter:5.2, saturn:9.54, uranus:19.2, neptune:30.07}`; `period(id) = AU^1.5` (year race); `cls(id)` from `SIZE_CLASS` (`data/b5/earth-and-space.js`); `lander(id)` → `land | sink | tooHot`; `orbitOf(id)` → `sun | earth | none`; `check()`.
- **Gate's own truth (`verify-orbit-rail-core.js`, its own table, not the data file's):** every order round's tray is a permutation of the open rails, ≠ answer, ≠ reverse, ≠ any of the 11 alphabetical orders; tray bot ≤ chance and never completes a round; stretch radii are monotonic in AU and the inner four fall within the first 6 % of the span; year-race speeds strictly decrease outwards (Mercury/Earth ≈ 4.15); sort rounds have exactly one not-a-planet, classes as tabled, no class run of 3; lander/thread results: Moon = land + earth, Sun = tooHot + none, giants = sink + sun, rocky = land + sun; miss-2 cradle prefixes unique per locale.
- **Mutations (each killed):** a library picture rendered on the same board as a glyph · a Moon card that rides the stretch from a rail · the mirrored rounds drawn with the Sun still on the left · duplicated cradle prefix in sv/da/no (Jo/Ju) · a misplaced planet rides the stretch anyway · stretch uses even spacing · the bumped planet vanishes instead of returning to the tray · lander lands on Saturn · Moon's thread goes round the Sun · tests unlocked before the first Check · a tray order equal to the es alphabetical order · same pass order twice · a pre-placed planet can be dragged · year race with Neptune fastest.
- **⚠ BLOCKED art — exact list (for `new/ART-NEEDS.md`):** (1) **Mercury**: library picture is banded like a gas giant → needs a grey, cratered ball; (2) **Venus**: library picture is red-and-dark banded → needs a pale yellow-white cloud-covered ball; (3) **Uranus**: orange-banded → needs pale cyan, almost featureless, with a faint vertical ring; (4) **Neptune**: dark banded → needs deep blue with one white streak; (5) **Jupiter** and **Mars** exist in the cache and look right but are NOT in `space.json` (no labels); (6) **Sun**: `space/sun` is a square tile on a dark background, unlabelled → needs a cut-out sun with no face; (7) **Pluto**: no picture; (8) `lcs-pictures` labels ×11 for all of the above (names already reviewed in `earth-and-space.<loc>.json`).
- **Honest fallback (ships now):** the eight planets as the **reviewed G1-378 glyphs** (`scripts/worksheet-gen/primitives/planets.js` — drawn discs, every glyph distinct in greyscale, native-panel-reviewed with the worksheet), the Sun as `sky-bodies.js sunEdge` (order mode) and `sunDisc` (sort card), the Earth as the planets.js earth glyph (the same Americas recipe as `sky-bodies.earthDisc`) and the Moon as `sky-bodies.moonDisc` (white, three craters) — **never the library `space/earth` / `space/moon` beside drawn glyphs**. **Rendered and looked at by the critic** (`work-c42/planets96.png`, `planets64.png`): flat discs, 2 px ink outline, palette tokens, no faces, no text — tool-grade like the accepted plant diagram, and every body tells apart at 64 px (spotted cream Mercury, white swirled Venus, teal-and-land Earth, coral Mars with a white cap, banded Jupiter with a coral spot, ringed Saturn, pale Uranus with a vertical ring, deep-teal Neptune with a white streak; the moonDisc's teal rim is the same weight). They are honest *symbols*, not portraits: the bubble never says "this is what Mars looks like". `space/saturn` is labelled and correct but is NOT mixed with the glyphs (one style per board) — it joins when the whole set is replaced. `space/planet` (a generic ringed orange planet) is never used. Pluto is left out until art exists.
- **Risks:** 64 px glyph slots at the 70 px rail pitch (staggered angles solve it); mnemonic availability per locale.

## 13. The four questions
1. **Choose it again?** Yes — the lever that flings the planets out to their real places, the year race, and a lander you can drop on anything.
2. **Teacher on the board?** Yes — it starts from the misconception (even spacing) and destroys it in one pull; the two tests are a real classification key, not a memory quiz, and the Moon and the Sun are tested, not just told.
3. **Parent trust?** Calm, accurate (true distances and speeds; no wrong planet art — the fallback glyphs are honest), no timer.
4. **Invention:** evenly spaced orbit rails that stretch to the planets' true distances on a lever, leaving any misplaced planet hanging where it doesn't belong.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 2→5 · distinctness 5→5 · reality 3→5 (on the glyph fallback; the library-art BLOCK stays recorded)
What changed:
- **False alignment removed:** NGSS 5-ESS1-1 is the Sun's apparent brightness, not planets; no NGSS K-5 PE names planet order. The row now claims no alignment (READINESS framework, id `orbit-rail.play.solar-system`), with an honest grade-3 fit statement (recall + classification, as G3-394/395 ask).
- **Art mixing removed:** the plan put library `space/earth`/`space/moon` beside drawn glyphs. Now every body is drawn from one family (planets.js glyphs, moonDisc, sunEdge/sunDisc). Critic rendered the glyphs at 96 and 64 px and looked: flat, outlined, faceless, text-free, each body tells apart — tool-grade like the accepted plant diagram. Glyph box raised to 96 px at 704 (disc 58) and 64 at 360.
- **Locale trap fixed by measurement:** sv/da/no Jorden/Jupiter collide (Jo/Ju) — the design missed it; full per-locale shortest-unique-prefix table now in §9, gated.
- **Variety:** the first-four level was eight rounds with one identical answer. Added mirrored rounds (Sun on the right) and Moon-decoy rounds with a no-rail saucer; the not-a-planet misconception now lives in order mode too.
- Re-measured all trays (`work-c42/c-orbit.js`): permutations valid, never the answer / reverse / any locale's alphabetical order; tray bot 2/28 and 3/46; sort 18 R / 17 G / 8 N, no run of three.
- Success show added to sort mode: a true-relative-size parade AFTER the answer (Jupiter 134 px beside Earth 12 px).
