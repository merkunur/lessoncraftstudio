# New 210 — The Sleeps Calendar → THE MOON BETWEEN EVERY DAY (calendar readiness)

## 0. Identity
- id `sleeps-calendar.play.calendar` · grade K (the Year ring and Short-names tasks reach grade 1) · framework: calendar readiness (non-CCSS; `alignment.framework` from `frontend/lib/frameworks.ts`) · strand Measurement & Data · files `sleeps-calendar-core.js`, `sleeps-calendar-activity.js`, `sleeps-calendar-activity.html`, `sleeps-calendar-activities.json` (scaffold `node scripts/new-activity.js --num=210`).
- worksheets covered: **K-321** Days of the Week in Order (number 1–7) → task *Number them* (week) · **K-337** Missing Days → *Fill the gaps* (week) · **G1-319** Yesterday, Today, Tomorrow → *Before & after* (week) · **G1-320** Months in Order (number 1–12) → *Number them* (year) · **G1-321** The Month Before and After → *Before & after* (year) · **G1-322** Days of the Week: Abbreviations → *Short names* (week; the year ring offers month short names too).
- merged in: grade-1 "The Year Ring" — the ring that turns one bead at a time, months threaded in order, "a bead in the wrong place will not close the ring". Kept as the Year ring and as the closing lap. Its seasons arcs are NOT here (→ #238 season-wheel).
- calendar facts come from ONE source: `scripts/worksheet-gen/data/b2/calendar.js` (`dayNames`, `dayAbbr`, `monthNames`, `monthAbbr`, `weekStart`) — copied into the activity's data at build, so the activity and the worksheets can never disagree. weekStart: 0 = Sunday for **en and pt** (pt-BR calendars start on domingo), 1 = Monday for the other nine.

## 1. The pitch
"The week is a necklace, not a line: between every two days there is one night — one moon — and there is a moon between Saturday and Sunday too."

## 2. Why a child will want it again (the fun)
- **Moons that light up when you count sleeps.** Every card clicked into place lights the two moons beside it, gold. A full ring is a ring of lit moons. "How many sleeps until Friday?" becomes something the child can see: count the moons.
- **The sun you walk.** In Before & after, the library sun sits on today. The child drags it along the rail; it hops from moon to moon with a little bounce and a tick, like a counter on a game board. Each moon it passes lights up behind it.
- **The closing lap.** When a ring is complete, the sun takes one lap round the whole ring (1 moon per 180 ms), every moon flashing as it passes, and it slows as it crosses the moon between the last day and the first — the "seam" — with a soft chime and a sparkle, then carries straight on into the first day again. The week goes round. The child sees there is no end.
- **Cards that click.** A right card snaps in with a satisfying two-step click (overshoot 6 %, 160 ms) and the rail under it glows. A wrong card bounces back with a springy wobble — never a buzzer.
- **Free play:** "Turn the ring" — the whole ring rotates under the finger, clicking one card at a time past a fixed "today" notch at the top; children love spinning the week round and round.

## 3. The skill and the misconception
- **Skill:** know the days of the week (and the months) in order; name the day before and after a given day (yesterday / tomorrow; the month before / after); know the order starts again — the week and the year repeat; read the short forms of day names.
- **Misconception 1: the week is a line that ends.** Children who learn "Monday … Sunday" as a list think nothing comes after the last day, so "the day after Sunday" (or Saturday in en/pt) fails. **Push back:** the ring is CLOSED; the moon between the last and first card is drawn exactly like every other moon, the sun walks across it like any other, and blanks and "today" positions are placed so that the seam is crossed in ≥ 3 rounds per pass.
- **Misconception 2: the middle days get muddled** (Tuesday/Thursday, mardi/mercredi, tiistai/torstai). **Push back:** a wrong card bounces and the moons from the nearest filled card to the blank light up one by one — so the child counts the sleeps from a day they know ("Tuesday … one sleep … that's Wednesday's place") instead of guessing again.
- **Misconception 3: yesterday and tomorrow are swapped.** **Push back:** the rail carries small chevrons pointing in the order of the week (the way time goes). Tomorrow is "one moon along the chevrons", yesterday "one moon against them". A sun moved the wrong way lights the moons on the wrong side, under chevrons pointing away from it.

## 4. The stage
Layout `split` at ≥ 700 px (ring left, tray column right); stacked below.

**At 704 px:**
- **Task line** above, 22 px, ≤ 2 lines.
- **The ring** (drawn geometry): an oval rail 452 × 400 px (teal #146B5E, 6 px, rounded). Day cards sit ON the rail at equal spacing, starting at the top-left and going clockwise; the first day of the locale's week (weekStart) is always the card at the top-left. Week: 7 cards 128 × 54 px (the width is set per locale from the longest name at 20 px Baloo 2 — pt "segunda-feira" needs 136 px; the build measures it). Year: 12 cards 104 × 46 px at 17 px (fi "marraskuu", es "septiembre" decide the width).
- **The moons (week ring only):** one drawn crescent (22 px) on the rail midway between every pair of neighbouring cards — 7 moons, including the seam moon between the last card and the first. Unlit: pale grey-blue #C9D3E0. Lit: gold #E8A53A with a 6 px glow.
- **The steps (year ring):** between two months there are about thirty nights, so a moon would teach something false. The year ring carries a round step-bead (18 px, same colours, unlit → lit) between neighbouring months instead, 12 beads including the seam bead between December and January. Every "moon" in this sheet means "bead" in the year ring; the year strings say *step*, never *sleep*.
- **The year ring's shape (critic: 12 cards do not fit round a 452 × 400 oval — neighbours at the top would sit 9 px apart with no room for a bead):** at 704 the year ring is a rounded-rectangle loop 640 × 420 px using the full width — 4 cards along the top, 2 down the right side, 4 along the bottom, 2 up the left side, clockwise from January at the top-left, cards 120 × 46 px (17 px text), beads in the 32 px gaps and on the four rounded corners. Because the ring takes the full width, the year tray is a strip of cards UNDER the ring (two rows of up to 6, cards 100 × 44), not a column; the bubble sits right of the strip. The week ring keeps the oval and the tray column.
- **Chevrons:** tiny teal chevrons (10 px) on the rail between moon and card, pointing clockwise — the direction of time. No arrows with words.
- **Card faces:** cream #FBF3E4 with a 3 px teal border; the name in teal ink. A blank card is a dashed outline with a faint moon-grey fill.
- **Inside the ring:** in Before & after the today notch; in Number them, nothing; otherwise empty cream (the ring is the whole stage).
- **The sun:** library picture **weather/sunny** (seen on the contact sheet: a smiling sun with rays, clean edges), 96 px, resting just inside the ring touching today's card.
- **Tray column (196 px):** the loose cards in shuffled order, stacked vertically, 8 px apart, same size as ring cards (week) or a 2-column grid (year). Below them the bubble (≤ 3 lines, 18 px) and the speaker (36 px).

**At 360 px — the racetrack:** a closed vertical racetrack 328 px wide: two columns of cards joined by a half-circle rail at top and bottom, so the loop stays visibly CLOSED. Week: left column top→bottom days 1–4, bottom turn, right column bottom→top days 5–7, top turn back to day 1 (the seam moon sits on the top turn). Year: 6 and 6. Cards 140 × 48 px (week, 18 px text) / 140 × 40 px (year, 16 px text). Moons sit on the rail between cards and on both turns. The tray becomes a horizontal scroll strip under the track (cards 140 × 48, the strip snaps), then the bubble, then Check. Check bottom ≈ 690 px (week) / ≈ 720 px (year) at 360×740. At 320×640 the year racetrack cards shrink to 128 × 36 (16 px, 2 lines allowed for fi) and the tray strip overlays the inside of the racetrack (the track's middle is empty) so Check stays at ≈ 610 px.
- The sun on phones: 64 px.

**Words on the apparatus:** only the day/month names and the numerals (in Number them) — they ARE the content. Chevrons and moons are icons.

## 5. The hand
- **Drag a tray card:** lifts within 60 ms (scale 1.05, shadow), follows the finger. Over a blank, the blank's outline turns solid teal.
- **Drop on the right blank:** snaps (160 ms, overshoot 6 %), click tone (two notes rising, E5→G5), the two moons beside it light (each 120 ms, left then right).
- **Drop on a wrong blank:** the card wobbles ±4° and springs back to the tray (300 ms); fill tasks judge **at the drop** (a drop is the commitment, like threading a bead), so a wrong drop IS the miss and shows its help at once (§7). Help clears on the next drag.
- **Drop on a filled card or empty space:** returns to the tray, no miss.
- **Drag the sun** (Before & after): the sun follows the rail, not the finger freely — it is projected onto the rail and snaps from position to position (card → moon → card); each step lands with a tick (wood block, 40 ms) and lights the moon it crossed. Releasing on a card parks it there. Dragging back un-lights moons as it returns. The sun cannot leave the rail.
- **Tap a card:** says its name (TTS where available) and the card glows 1 s.
- **Number tiles** (Number them): numeral tiles 54 × 54 px, dragged onto the small round socket (40 px) at each card's outer edge.
- **Short-name tags:** tags 72 × 40 px with the abbreviation, dragged onto the hook under each card.
- **Free play ("Turn the ring"):** drag anywhere on the rail to rotate the whole ring; it clicks one card per step past a coral notch at the top, the card under the notch reads aloud (TTS) and glows. Spin it fast and it free-wheels and slows with friction, clicking slower and slower. Offered after any finished round.

## 6. The rounds
Positions below are **offsets from the locale's first day** (0 = first day of that locale's week, 6 = last; January = 0 … December = 11), so every table works in every locale.

**Task A — Fill the gaps** (K-337). The ring shows all cards but some are blanks; the tray holds exactly the missing cards **plus one decoy** that is already on the ring (a duplicate). One right blank per card.
- Week, 2 blanks (9 rounds): {6,0} · {2,3} · {1,4} · {5,6} · {0,3} · {2,5} · {6,1} · {3,4} · {0,4}. Decoys: offsets 3, 0, 2, 3, 5, 0, 4, 6, 1 respectively (each already on the ring).
- Week, 4 blanks (9 rounds): {6,0,1,3} · {1,2,3,5} · {0,2,4,6} · {3,4,5,0} · {5,6,0,2} · {1,3,4,6} · {2,3,4,6} · {0,1,4,5} · {2,4,5,6}. Decoy: the first filled offset clockwise from blank 1.
- Year, 2 blanks: {11,0} · {3,4} · {6,7} · {1,9} · {10,11} · {0,5} · {2,8} · {4,10} · {7,8}.
- Year, 4 blanks: {11,0,1,6} · {2,3,4,9} · {5,7,8,10} · {0,3,6,9} · {1,4,7,10} · {2,5,8,11} · {9,10,11,3} · {4,5,6,0} · {6,7,8,1}.
- The seam (last→first) is touched by a blank in ≥ 3 rounds of every table (week-2: rounds 1, 4, 7 plus 5 and 9 touch day 0); the middle days (offsets 2–4 / months 4–7) are blank in ≥ 5 rounds.
- **The decoy pushback:** dropping the decoy on any blank bounces it and makes the identical card already on the ring glow and pulse twice — "it's already here". The decoy cannot be placed; at success it fades from the tray.

**Task B — Before & after** (G1-319, G1-321). The ring is full but **every card except today is turned face-down** (a plain card with a small moon dot). The sun sits on today (face-up). The task line asks tomorrow or yesterday (week) / the month after or before (year), with a chevron icon pointing along (▶) or against (◀) the order. **Step 1:** move the sun exactly one moon in the asked direction. **Step 2:** the face-down card under the sun asks for its name — the tray offers 3 face-up cards: the right name, the name on the OTHER side of today, and the name two steps along. The child drops the right one; the card flips face-up.
- Week rounds (today offset, direction): (1, after) · (6, after — crosses the seam) · (0, before — crosses the seam) · (3, before) · (4, after) · (2, before) · (5, after) · (0, after) · (6, before). Today stands on all seven days; the seam is crossed in 2 of 9; after/before 5/4.
- Year rounds: (0, before — December) · (11, after — January) · (5, after) · (8, before) · (2, after) · (9, before) · (3, before) · (6, after) · (10, after).
- Tray order for step 2 is shuffled with the right card's tray slot balanced (each slot 3/9 ± 1 per pass; the gate measures it).

**Task C — Number them** (K-321, G1-320). The ring is full and face-up; the first day of the week (or January) already carries a **1** in its socket. Numeral tiles fill the other sockets in order. Two more sockets are pre-filled in the week (so each round asks for 4 tiles) and six more in the year (so it asks for 5); the tray holds exactly those tiles plus one decoy tile (8 in the week, 13 in the year — a number that has no place, so "use every tile" is not a shortcut; it bounces with "That one is already on the ring" replaced by its own hint **"There is no place for {8} — the week has 7 days."** / **"…the year has 12 months."**). Week rounds (pre-filled offsets besides 0): {3,5} · {2,6} · {1,4} · {4,5} · {2,3} · {5,6} · {1,6} · {3,4} · {1,2}. Year rounds (asked months): {1,4,7,9,11} · {2,3,6,10,11} · {1,5,6,8,10} · {3,4,7,9,11} · {2,5,8,9,10} · {1,2,6,7,11} · {4,6,8,10,11} · {1,3,5,7,9} · {2,4,6,8,11}. When complete, the sun's closing lap counts the sockets aloud (TTS) and, crossing the seam, the 1 glows again — after 7 comes 1.

**Task D — Short names** (G1-322; week, and months in the Year ring). The ring is full with full names; a hook hangs under each card. The tray holds 4 abbreviation tags (from `dayAbbr` / `monthAbbr`); one right card each. Week rounds (offsets tagged): {0,2,4,6} · {1,3,5,0} · {2,3,4,5} · {6,1,2,4} · {0,1,3,5} · {1,2,4,6} · {3,4,6,0} · {0,2,3,5} · {1,4,5,6}. Year rounds pick 4 months per round, every month tagged at least 3 times in a pass, and every round contains one "twin start" pair where it exists in the locale (en/sv/da/no/nl: Ma**r**ch/Ma**y**, Ju**n**e/Ju**l**y; fr juin/juil; es/it/pt mar/may·mag·mai…) — the abbreviation that shares the first letters is the real reading work.

**Settings combine:** Ring (Week / Year) × Task (A–D); Task A also has Gaps (2 / 4). Every table has 9 rounds; never 0 anywhere (numbers start at 1).

**Order:** order-only reshuffle per pass via `nextTask`; never the same order twice; the seam rounds are spread (rejection-sampled so no two seam rounds are adjacent).

## 7. Check, the misses, the success
Fill-type tasks (A, C, D, and B step 2) judge at the drop; Check confirms a finished ring. Task B step 1 is judged by Check.
- **Check with nothing done:** no miss. Task A/C/D: the first blank pulses; bubble "Drag a card from the tray to an empty place." Task B: the sun wiggles; "Walk the sun one moon {forward|back}."
- **Miss 1 — a wrong drop (A/C/D):** the card springs back AND the moons from the nearest filled card to the blank light and pulse in order, one per 250 ms (counting the sleeps out), and a small numeral 1, 2 … rides on each moon as it lights. Bubble: **"Count the moons from {Tuesday} to this place."** (the named card is the nearest filled one before the blank, clockwise; year: **"Count the steps from {April} to this place."**). Number them: **"Count the moons from 1."** Short names: the tag springs back and the first letters it shares with its true card are underlined on that card (e.g. "Th" on Thursday) — **"Find the day that starts the same way."**
- **Miss 1 — Task B, sun moved wrong:** the sun stays where the child put it; the moons it crossed stay lit and the chevrons on that stretch flash coral (pointing away from the sun's path if wrong direction). Two moons away → both moons stay lit and pulse "1, 2". Bubble: **"Tomorrow is one sleep along the arrows."** / **"Yesterday is one sleep back against the arrows."** (year: "The next month is one step along the arrows." / "The month before is one step back.") The sun hops back to today.
- **Miss 2:** A/C: the right card (or tile) in the tray lifts 10 px and glows; D: the right hook glows. B step 1: the right moon pulses gold before the child moves. B step 2: the right tray card lifts. Bubble: **"This one is lifting — try it."**
- **A new move takes the help away** until the next Check / drop.
- **Success:** all cards in, every moon lit → the sun runs one closing lap, slowing over the seam moon with a chime and a sparkle, and carries on into the first day. Bubble (week): **"The week goes round: after {Saturday} comes {Sunday} again!"** (the last and first names of the locale's week). Year: **"The year goes round: after December comes January again!"** Before & after: **"Today is {Tuesday}. Tomorrow is {Wednesday}."** / **"Today is {Tuesday}. Yesterday was {Monday}."** (year: "After {May} comes {June}." / "Before {May} comes {April}.") Short names: **"{Thu} is short for {Thursday}."** for the last tag placed.

## 8. Settings
1. **Ring:** Week / Year (default Week) — the ring at rest shows 7 or 12 cards.
2. **Task:** Fill the gaps (2) / Fill the gaps (4) / Before & after / Number them / Short names (default Fill the gaps (2)) — at rest the ring shows blanks, face-down cards with the sun, sockets with a 1, or hooks.

## 9. Words (EN source)
- title: **The Sleeps Calendar**
- instruction (week): **The days go round like a necklace. Between every two days there is one night — one moon.** · instruction (year): **The months go round like a necklace. One step takes you to the next month.**
- prompts: Fill — **Put the missing days in their places.** / **Put the missing months in their places.** · Before & after — **Tomorrow: walk the sun one moon forward.** / **Yesterday: walk the sun one moon back.** / **The next month: walk the sun one step forward.** / **The month before: walk the sun one step back.** · step 2 — **Which day is it? Put its name on the card.** / **Which month is it?** · Number them — **Number the days in order, starting from 1.** / **Number the months in order, starting from 1.** · Short names — **Hang each short name under its day.** / **…under its month.**
- hints: **Drag a card from the tray to an empty place.** · **Walk the sun one moon {forward|back}.** · **Count the moons from {name} to this place.** · **Count the steps from {name} to this place.** (year) · **Count the moons from 1.** · **Find the day that starts the same way.** / **Find the month that starts the same way.** · **Tomorrow is one sleep along the arrows.** · **Yesterday is one sleep back against the arrows.** · **The next month is one step along the arrows.** · **The month before is one step back.** · **This one is lifting — try it.** · decoy: **That one is already on the ring.**
- success: **The week goes round: after {last} comes {first} again!** · **The year goes round: after December comes January again!** · **Today is {a}. Tomorrow is {b}.** · **Today is {a}. Yesterday was {b}.** · **After {a} comes {b}.** · **Before {a} comes {b}.** · **{abbr} is short for {name}.**
- free play: **Turn the ring**
- settings: **Ring** — **Week** / **Year** · **Task** — **Fill 2** / **Fill 4** / **Before & after** / **Number them** / **Short names**

**Locale traps:**
- **Week start:** Sunday for en and pt (pt-BR), Monday for the nine others — from `calendar.js`, never hard-coded. All position tables are offsets, so the seam is the locale's own last→first.
- **Capitals:** day and month names are lowercase in fr/es/it/pt/nl/sv/da/no/fi and capitalised in en/de; cards copy `calendar.js` exactly. At the start of a sentence the success frame must NOT capitalise a lowercase name mid-sentence — frames are written so a name never opens a sentence ("Today is lundi" style is avoided by locale frames like fr "Aujourd'hui, c'est mardi. Demain, ce sera mercredi.").
- **"Yesterday was / Tomorrow is"** needs tense per locale (de "Gestern war Montag", fi "Eilen oli maanantai", fr "Hier, c'était lundi"). Frames written per locale; the name is always in its dictionary form (fi "maanantai" not "maanantaina" — the frame chooses a construction that keeps the nominative).
- **Long names:** pt "segunda-feira … sexta-feira" (13 chars) — the card width is computed per locale; no abbreviation is ever substituted for a full name on a card.
- **Abbreviations:** from `calendar.js` with no dots (fr "lun", es "mié", da "tirs" but no "tir", fi two letters "ma ti ke to pe la su"). fr/es/it/pt short forms of mar/mer/mié are the real trap — round tables keep them in the same round.
- **"Sleep" for a night:** natural in en ("three sleeps"); the other locales use their natural child word for a night ("Nacht/nuit/noche/noite/notte/nacht/natt/nat/natt/yö") — the native reviewer chooses; the moon icon carries the meaning silently.
- **Seasons are not here** (no hemisphere problem).

## 10. Sound off, access, phones
- Legible silent: names, lit moons, chevrons and the moving sun carry everything.
- Keyboard: Tab to a tray card → Enter lifts → arrow keys move a focus ring round the blanks in ring order → Enter drops. The sun: Left/Right arrow keys step it one position along/against the order.
- aria: cards "{name}, place {n} of 7"; blanks "empty place after {name}"; moons decorative except in Before & after ("moon between {a} and {b}, lit"); live region reads each success line.
- Taps: cards ≥ 48 px tall, tiles 54 px, tags 72 × 40 (padded hit area 48 px), the sun 96/64 px.
- Phones: the racetrack (§4) keeps the loop closed; Check above both folds.
- Reduced motion: the closing lap lights all moons at once with one chime.

## 11. Distinct from
- **calendar-wall (premium tool)** is a morning-meeting calendar grid (date, days-in-school, weather graph) — a month grid, not a cycle of days. The Sleeps Calendar's invention is the **closed ring with a moon between every pair of days**, including the seam.
- **#3 Peek Path / #4 Constellation Thread** (what comes next with numbers, a thread joining stars) — linear number sequences; here the order is a cycle and the step is a night.
- **#238 season-wheel** (planned) owns seasons; **#273 week-drop-calendar** (planned) is a month grid with dates. No sibling in this batch uses a ring.
- **story-line (tool)** pegs story cards in a line — a line, not a loop.

## 12. Build plan
- **Core state:** `{ ring:'week'|'year', task, locale, start, names[], abbr[], order[], idx, cells:[{offset, face:'up'|'down'|'blank', socket:null|n, tag:null|abbr}], tray[], sun:{pos}, lit:Set(moonIndex), misses, helpLevel }`.
- **Functions:** `cycleNames(locale, ring)` (rotate by weekStart), `moonsBetween(a,b,dir)` (wraps mod N), `dropCard(card, cellOffset)` → `{ok, decoy, nearestFilled}`, `stepSun(dir)`, `checkSun()` → `{ok, steps, wrongDir}`, `nextTask(index)` (order-only, seam rounds non-adjacent), `lapSequence()`.
- **Gate `verify-sleeps-calendar-core.js` (own oracle):** (1) the names/abbreviations equal `calendar.js` for all 11 locales (byte-equal); (2) the first card is `dayNames[weekStart]`; en and pt start Sunday, others Monday; (3) `moonsBetween(last, first, +1) === 1` (the seam is one moon / one bead) for both rings in all locales; (3b) the year ring renders beads, never moons, and no year string contains the locale's sleep/night word; (4) each table has 9 rounds, one right cell per tray card, the decoy is always a card already on the ring; (5) seam-touching rounds ≥ 3 per Fill table, crossing rounds = 2 in each Before & after table; today covers all 7 days in the week table; (6) Before & after step-2 tray: right card in each slot 3 ± 1 per pass; (7) the success sentence names the locale's actual last and first day; (8) Short-names rounds: each abbreviation's true card is unique; (9) never 0.
- **Mutations:** start every locale on Monday; open the ring (no seam moon); let the sun cross the seam as two steps; accept the decoy; make `moonsBetween` count cards instead of moons; capitalise lowercase names; light moons on the wrong side in the miss; judge "after" as "before"; skip the face-down flip; abbreviate a full card name in pt.
- **Pictures to verify:** weather/sunny only (seen). Everything else is drawn apparatus.
- **Risks:** card widths for pt/fi (measured at build); per-locale tense frames (reviewer). Nothing BLOCKED.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — walking the sun round a ring of lighting moons and watching it run the whole lap across the seam is a game-board pleasure; spinning the ring in free play is pure fidget.
2. **Would a teacher put it on the board?** Yes — at morning meeting: "How many sleeps until Friday?" — count the moons; "What comes after Sunday?" — the sun walks across the seam in front of everyone.
3. **Would a parent trust it?** The calendar names are the same as the worksheets', correct for their country (week start, capitals); calm, no score.
4. **The invention:** the week is a closed necklace with a moon — one sleep — between every two days, the last and the first included, and the sun walks it night by night.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 3→5 · distinctness 5→5 · reality 4→5
What changed:
- **A false lesson removed:** the year ring had a "moon — one sleep" between months; there are about thirty nights between two months. The year ring now carries step-beads, its strings say *step*, and the gate forbids the sleep word in any year string.
- **The year ring now fits:** 12 full-name cards cannot sit round a 452 × 400 oval with a marker between each pair. At 704 it is a full-width rounded-rectangle loop (4 · 2 · 4 · 2, cards 120 × 46) with the tray as a strip under it.
- **Number them corrected:** with day 1 and two more sockets pre-filled the week asks for 4 tiles, not 3; the year asks for 5 with six pre-filled. Each tray gains a decoy numeral with no place (8 / 13), so "use every tile" is no shortcut and the child meets "the week has 7 days".
- Miss-1 hint no longer says "one sleep" when the gap is two or three moons; the lit moons carry small numerals instead.
- Year instruction string added.
