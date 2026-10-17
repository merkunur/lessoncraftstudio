# Row 162 — Sprocket's Clock (to the quarter-hour) → THE HOUR BALL (2.MD.C.7)

## 0. Identity
- id `clock-digital.read-quarter-hour.2-md-c-7` (KEPT; slugs/metadata frozen en, fr — de, es, pt, it, nl, sv, da, no, fi slug, title and intro are new at build, grade 2) · CCSS 2.MD.C.7 (tell and write time from analog and digital clocks to the nearest five minutes) · strand Measurement & Data · own files `hour-ball-core.js`, `hour-ball-activity.js`, `hour-ball-activity.html`, `hour-ball-activities.json` (this row leaves `clock-digital-activities.json`; the id is unchanged; 0 lines to `clock-digital-core.js` and `lcs-shell.*`).
- page title (frozen): "Sprocket's Clock — Read the Clock to the Quarter-Hour (Grade 2)". The frozen intro promises: read an analog clock at **quarter past and quarter to**, **tap the matching digital time**, learn that the long hand on the 3 means :15 and on the 9 means :45, **and that quarter to 4 is written 3:45, not 4:45**, with Sprocket the rooster, as a step toward five minutes. **Every promise is kept, and the last one becomes the mechanism itself.**
- worksheets also covered: **G2-250** Quarter Hours (read each clock, circle the matching time) — level "Quarter hours" (default) · **G2-249** What Time Is It? (time to 5 minutes, circle the digital time) — level "Five minutes".
- what the old activity did: an analog clock and three digital options, tap one. **Kept**: all nine targets (3:15, 9:45, 6:15, 1:45, 11:15, 4:45, 8:15, 2:45, 7:15), the tap-a-digital-card answer, the "same hour, other quarter" distractor, the next-hour distractor on :45 rounds (10:45 for 9:45, 5:45 for 4:45, 3:45 for 2:45), Sprocket. **Changed**: the far distractors on :15 rounds (6:15 for 3:15, 2:15 for 6:15, 12:15 for 8:15 …) tested nothing — a different hour nowhere near the short hand. Every round now has **four** cards built as a 2 × 2 (hour right/wrong × minutes right/wrong), so every wrong card is a real reading error and no card can be ruled out by a shortcut (§6). 12:45 is added so the "quarter to" wrap past 12 is taught.
- siblings use other inventions — and this design was rebuilt by the critic so that it shares none of them: row 101 the Hour Road (rim unrolled), 102 the Digits That Ride the Hands, 103 the Pull-Back Key (wind back to the hour), 104 the Echo Slice (painted swept wedge), 158 the Day Wheel, **159 the two drum counters under the clock** (the first draft of this row used drums too — removed), **160 the Drive Cables (a card drives ghost hands — removed here: no ghost hands)**, 161 the Flip Tiles, 163 the Run-On Test. The premium Learning Clock (geared hands + arc) is a whole-class tool; this activity never draws an arc or a wedge.

## 1. The pitch
"Sprocket's clock drops a numbered ball down its chute every time the long hand reaches the 12 — so the ball in the cup is always the hour that has begun; at quarter to four the 4-ball is still waiting at the top of the chute, and the cup still holds the 3."

## 2. Why a child will want it again
- **A marble run on a clock.** Above Sprocket's clock sits a little clear hopper holding the twelve hour balls (cream marbles with a numeral). A spiral chute runs down the right side of the clock case into a brass **hour cup** under the face. In free play, drag the long hand round: the moment it passes the 12, a gate clicks open, **the next ball rolls down the spiral** (rattle, 700 ms), drops into the cup with a *clonk* and knocks the old ball out into the **tray** beside it, where the past hours line up in order. Drag the long hand backwards past the 12 and the ball rolls back up the chute (a reversed rattle) — children run the long hand round and round just to make balls drop.
- **The cards post a guess.** Each answer card is a flip-clock card. Tap one and it posts its guess onto the clock: its **hour pops up as a marble** that hovers over the cup's closed lid, and its **minutes plant a little feather pin** in the rim at that minute mark (3 for :15, 9 for :45). You can see the guess on the clock before you commit; nothing is judged yet.
- **The earned show.** At Check the lid slides open. If the card's marble matches the ball in the cup, the two click together and glow, the feather pin is touched by the long hand's tip and flicks, Sprocket (library rooster) flaps and crows on top of the hopper, and the clock **runs one more quarter** — and on every :45 round that quarter ends at the 12: the gate opens and the next ball rolls down. The child watches, every quarter-to round, the exact moment "quarter to 4" becomes 4 o'clock.
- No score, no timer, no lives.

## 3. The skill and the misconception
- Skill (2.MD.C.7; G2-250, G2-249): read an analog clock to the quarter hour (and, in level 2, to five minutes) and match it to digital time: the **minutes** are how far the long hand has gone round from the 12 (:15 on the 3, :30 on the 6, :45 on the 9; counting by fives in level 2); the **hour** is the hour that began when the long hand was last at the 12 — the last number the short hand has **passed**.
- Misconceptions and how the apparatus pushes back (each is one of the four cards in every round):
  1. **"Quarter to 4" is 4:45** (the short hand is nearly on the 4) → the 4:45 card's marble hovers over the cup; at Check the lid opens on the **3-ball**: the 4-marble bounces off and rolls back to its card, while the real 4-ball is visibly still sitting at the top of the chute behind the gate. Miss 2 runs the clock on to the 12 so the child sees the 4-ball drop **only then**, and back again. *The hour changes only when the ball drops.*
  2. **Swapping the quarters / reading the numeral as minutes** (long hand on 9 read as :15) → the card's feather pin stands in the rim at the 3 while the long hand points at the 9 — half a face apart; the long hand's tip never reaches the pin.
  3. **Naming the hour before** (2:15 for a 3:15 clock, over-applying the quarter-to rule) → the lid opens on the 3-ball and the 2-marble bounces off; the 2-ball is visibly already in the tray of past hours.
  4. **Both at once** → the marble bounces and the pin stands alone.
- What the child must do is read: the cup is lidded and the chute gate hides which ball is next until the child commits a card; the cards are the only digits on the screen.

## 4. The stage
**Layout: stacked at every width** (layout check 2026-10-17: no `layout:'split'` — its stage column is only ≈ 370 px at 704, too narrow for this apparatus). The stage takes the full card width, ≈ 648 px at 704 (≈ 656 at 1024); whatever §4 places in a left, right, side or bubble column stays side by side inside the stage when the activity draws it, while the shell's bubble, keypad and Check sit under the stage. Sizes written for a wider stage fit the 648 px by closing margins and gaps first; no picture drops below 96 px, no tap below 44, no data mark or grid cell below 40.

At 704 (stacked layout, stage ≈ 648 × 480):
- **Left column (340 px): the clock and its ball run** (all drawn apparatus).
  - **The clock**: face 280 px across, cream #FFF8E7, 6 px teal rim #146B5E, numerals 1–12 Baloo 2 30 px ink #2B2B2B, 60 minute ticks (every fifth bold), **short hand** coral #F2784B 12 px wide to 55 % radius, **long hand** teal 6 px to 88 %, brass centre 14 px. No minute numbers round the rim.
  - **The hopper** on top of the case: a clear dome 120 × 44 holding the not-yet-dropped balls in a row (only their tops show; the numerals of the waiting balls are hidden by the hopper's frosted band during a round, so the next ball's number never helps).
  - **The chute**: a 22 px brass spiral down the right side of the case (two turns), ending above the **hour cup** (a brass cup 64 × 48 centred under the face) with a sliding **lid** (closed during a round).
  - **The tray** of past hours: a short wooden rail right of the cup holding the last two balls that were knocked out (36 px marbles, numerals 18 px).
  - **Balls**: cream marbles 40 px with a 2 px ink outline and a numeral (Baloo 2 22 px). They are content (numerals), not pictures.
  - **Feather pin**: a 6 × 28 px teal pin with a coral flag, planted at the card's minute mark just outside the rim.
- **Right column (300 px): the four cards**, 2 × 2, each 140 × 96, flip-clock style (hour on coral-cream #FDE3D6, minutes on mint #DDF1EC, digits Baloo 2 40 px, colon), 3 px ink outline, 12 px radius, 14 px gaps.
- **Sprocket**: library `farm animals/rooster` (`mini tools/pictures/farm-animals.json`, dir "farm animals"; seen on the contact sheet), **96 px**, standing on the hopper.
- Task line above (≤ 24 px, ≤ 2 lines): **"Read the clock. Tap the card that shows the same time."**
- Bubble under the cards.

At 360 (stacked, stage width ≈ 336):
- clock 216 px (numerals 24 px) with the chute on its right (18 px) and Sprocket **64 px** standing on a hopper 96 × 36; cup 56 × 40 under the face with the two-ball tray beside it (balls 32 px, numerals 18 px); cards 2 × 2 at 158 × 64 (digits 30 px), gaps 10 px.
- heights: hopper + Sprocket 64 + clock 216 + cup 44 + 10 + cards 138 = 472; with header 56, task line 52, bubble 44, Check 56 → ≈ 680 < 740. At 320 × 640: Sprocket stands beside the hopper (not on it), clock 190, cup 40, cards 142 × 56 → 40 + 190 + 40 + 8 + 122 = 400 + 208 = 608 < 640.

Library pictures: `farm animals/rooster` only. Clock, hopper, chute, balls, cup, lid, pins and cards are drawn apparatus; numerals are content.

## 5. The hand
- **Tap a card** → it lifts 4 px with a teal outline (80 ms) and posts: its hour marble rises from the card and floats to hover over the cup lid (300 ms arc), its feather pin flies to the rim and plants at its minute mark with a tiny *tock*. Tap another card → the old marble and pin fly home and the new ones post. Nothing is graded until Check.
- **Check** (shell button) → the lid slides open (200 ms); the marble drops onto the cup ball (§7); the long hand's tip is compared with the pin.
- **Free play — drag the long hand** (after a round is solved, before Next — the clock is no longer the question): the long hand turns under the finger; the short hand follows (30° per lap); passing the 12 clockwise opens the gate and drops the next ball (the old one rolls to the tray); anticlockwise past the 12 the cup ball rolls back up the chute and the tray's last ball returns to the cup. Releasing snaps to the nearest quarter (level 1) or five-minute mark (level 2). During a round the hands are locked and the lid closed; Next returns the clock and the balls to the new round's time.
- **Keyboard**: arrows move the card focus; Enter/Space posts a card; Check by the shell's key; in free play, + / − step the long hand by a quarter (level 1) or five minutes (level 2).
- Sound (optional, silent works): a rattle down the chute, *clonk* in the cup, a bright click when marbles match, a short crow. TTS (optional): a card's corner speaker reads its time in words in the page locale.

## 6. The rounds
One round = the clock at a time + four flip-clock cards. The four cards are always the 2 × 2 of **hour digit {right, the neighbour hour}** × **minutes {right, the mirror minutes 60 − m}**. The neighbour hour is the hour before (h − 1) in half the rounds and the hour after (h + 1) in the other half, so neither "the bigger hour" nor "the smaller hour" is ever a strategy.

**Level 1 "Quarter hours" (default; G2-250) — 10 rounds** (the nine kept targets + 12:45)
| # | clock | the four cards | which error each wrong card is |
|---|---|---|---|
| R1 | 3:15 | 3:15 · 3:45 · 2:15 · 2:45 | quarters swapped · hour before · "quarter to 3" (past/to swapped) |
| R2 | 9:45 | 9:45 · 9:15 · 10:45 · 10:15 | quarters swapped · **next hour (the 10:45 error)** · "quarter past 10" |
| R3 | 6:15 | 6:15 · 6:45 · 7:15 · 7:45 | quarters swapped · hour after · hour after + swapped |
| R4 | 1:45 | 1:45 · 1:15 · 12:45 · 12:15 | quarters swapped · hour before · hour before + swapped |
| R5 | 11:15 | 11:15 · 11:45 · 10:15 · 10:45 | quarters swapped · hour before · "quarter to 11" |
| R6 | 4:45 | 4:45 · 4:15 · 5:45 · 5:15 | quarters swapped · **next hour** · "quarter past 5" |
| R7 | 8:15 | 8:15 · 8:45 · 9:15 · 9:45 | quarters swapped · hour after · hour after + swapped |
| R8 | 2:45 | 2:45 · 2:15 · 1:45 · 1:15 | quarters swapped · hour before · hour before + swapped |
| R9 | 7:15 | 7:15 · 7:45 · 6:15 · 6:45 | quarters swapped · hour before · "quarter to 7" |
| R10 | 12:45 | 12:45 · 12:15 · 1:45 · 1:15 | quarters swapped · **next hour (the wrap past 12)** · "quarter past 1" |

**Level 2 "Five minutes" (setting; G2-249) — 10 rounds**
| # | clock | the four cards |
|---|---|---|
| R1 | 3:20 | 3:20 · 3:40 · 2:20 · 2:40 |
| R2 | 7:40 | 7:40 · 7:20 · 8:40 · 8:20 |
| R3 | 10:05 | 10:05 · 10:55 · 11:05 · 11:55 |
| R4 | 6:35 | 6:35 · 6:25 · 5:35 · 5:25 |
| R5 | 8:25 | 8:25 · 8:35 · 9:25 · 9:35 |
| R6 | 4:55 | 4:55 · 4:05 · 3:55 · 3:05 |
| R7 | 11:45 | 11:45 · 11:15 · 12:45 · 12:15 |
| R8 | 9:15 | 9:15 · 9:45 · 8:15 · 8:45 |
| R9 | 1:50 | 1:50 · 1:10 · 2:50 · 2:10 |
| R10 | 5:10 | 5:10 · 5:50 · 4:10 · 4:50 |
In level 2 the minute mirror is the "read the long hand from the wrong side" error (3:40 for 3:20); 4:55 vs 5:05-shaped cards (R6's 4:05, R3's 11:05) are the hardest pairs: the short hands look almost the same and only the long hand decides — exactly the G2-249 skill.

**Measured balance** (`work-31/clock.js`, re-measured by the critic in `work-c31/clock.js`; re-run by the verify gate):
- every level: 10 distinct hours; minutes < 30 in 5 rounds, > 30 in 5 rounds.
- **time-rank of the right card among its four** (is it the earliest, 2nd, 3rd, latest?): level 1 = 2 / 3 / 3 / 2 rounds (counting 12 as 12) and 2 / 3 / 3 / 2 (counting 12 as 0); level 2 = 2 / 3 / 3 / 2 and 2 / 2 / 3 / 3. "Never pick the earliest/latest" fails as a strategy.
- **feature strategies** each pick a PAIR, never a card: "the minute value that appears once" — impossible, every minute value appears exactly twice; "the hour the short hand is nearest" hits 2.5 of 10 expected (it picks the wrong hour on every :35–:55 clock); "the shorter/longer card" (9:45 vs 10:45) picks a pair, ≤ 50 %.
- **screen position**: the four cards are reshuffled at every showing; the shuffle refuses the same position three rounds running; simulated over 3,000 showings: 25.4 / 25.1 / 24.9 / 24.6 %. The gate asserts each position 22–28 % over 300 showings per level, and never 3 in a row.
- **order**: order-only reshuffle per pass (`nextTask`), never the same order twice in a row; :15-type and :45-type rounds alternate at most two in a row.

## 7. Check, the misses, the success
- **Check with no card posted** → the long hand gives a small wiggle, then the short hand; bubble: "Look at both hands first. Then tap a card." (no miss)
- **Miss 1** → the apparatus shows each part on its own:
  - **hour wrong**: the lid opens on the true ball; the card's marble lands on it, does not fit (it rocks once) and bounces back to its card. If the card's hour is later, the real ball with that number is visibly behind the chute gate at the top; if earlier, it is visibly in the tray of past hours. Bubble: "The cup holds the {h}. The {h1}-ball has not dropped yet — it drops when the long hand gets back to the 12." (earlier: "The {g}-ball dropped an hour ago — it is in the tray. The cup holds the {h}.")
  - **minutes wrong**: the feather pin stays in the rim and gives two shakes; a dotted coral line runs along the rim from the long hand's tip to the pin (the gap, never an arc fill). Bubble: "The long hand is on the {n}. The pin is at the {p}. The long hand shows {mm} minutes."
  - **both wrong**: both showings; bubble: "Look at the long hand first: it is on the {n}. Then find the last number the short hand has passed."
  - a part that is right glows teal for 600 ms ("this part is right").
- **Miss 2** → **the run-on**: the card's marble and pin fly home; the clock runs forward from the round's time to the next 12 at one quarter (level 1) or one five-minute mark (level 2) per 400 ms — the rim's quarter marks (12, 3, 6, 9) blink as the tip passes them — and the gate opens exactly at the 12: the next ball rolls down. Then the clock runs back to the round's time and the ball rolls back up (600 ms). The cup is left open, showing the {h}-ball; the right card does not glow (the child still taps it). Bubble: "Watch: the {h1}-ball drops at the 12. Now it is still {h} o'clock and {mm} minutes." (level 1 :45 rounds: "It is quarter to {h1} — the {h1}-ball is still waiting.")
- A new card tap closes the lid and removes the line and the open cup until the next Check.
- **Success** → the card's marble clicks onto the cup ball (both glow), the long hand's tip touches the feather pin and it flicks, Sprocket flaps and crows (a 2-frame hop, 600 ms), and the clock **runs one more quarter** (level 1) or **on to the next quarter** (level 2): on :45 rounds that is the 12 — the gate opens, the next ball drops, the bubble reads "**3:45 — quarter to 4. One more quarter and the 4-ball drops!**" On :15 rounds: "**3:15 — quarter past 3. The long hand has gone one quarter round.**" Level 2: "**3:20 — twenty past 3.**" (the time words come from the locale's own phrase table, §9). Everything returns to the round's time before Next.

## 8. Settings
1. **Times**: Quarter hours (default) / Five minutes — the rim's marks change at rest (four bold quarter marks with the pins snapping to quarters → twelve bold five-minute marks) and the round set changes.
2. **Past hours**: Show the tray (default) / Hide the tray — the tray of earlier balls is visible or removed at rest (hidden makes "the hour before" errors rely on the cup alone).

## 9. Words (EN source; the other 10 locales authored by hand, then one native + pedagogy reviewer)
- title (frozen en): "Sprocket's Clock" (h1 kept) · instruction: "Read the clock. Tap the card that shows the same time."
- check-empty: "Look at both hands first. Then tap a card."
- miss1-hour-later: "The cup holds the {h}. The {h1}-ball has not dropped yet — it drops when the long hand gets back to the 12."
- miss1-hour-earlier: "The {g}-ball dropped an hour ago — it is in the tray. The cup holds the {h}."
- miss1-minutes: "The long hand is on the {n}. The pin is at the {p}. The long hand shows {mm} minutes."
- miss1-both: "Look at the long hand first: it is on the {n}. Then find the last number the short hand has passed."
- miss2: "Watch: the {h1}-ball drops at the 12. Now it is still {h} o'clock and {mm} minutes." · miss2-quarter-to: "It is quarter to {h1} — the {h1}-ball is still waiting."
- success: "{time} — {phrase}." + tail: quarter past "The long hand has gone one quarter round." · quarter to "One more quarter and the {h1}-ball drops!" · five minutes (no tail).
- settings: "Times" — "Quarter hours" / "Five minutes"; "Past hours" — "Show the tray" / "Hide the tray".
- aria: card "{h}:{mm}" (the digits, spoken as the locale's digital reading); clock "A clock. The short hand is between the {h} and the {h1}. The long hand points at the {n}."; cup (after Check only) "The cup holds ball {h}".
- **Locale traps** (the build must solve each):
  - **{phrase} = the locale's spoken clock idiom**, copied from the native-reviewed `positions` tables in `mini tools/learning-clock.js` (11 locales, every five minutes — e.g. nl `20:'tien voor half {N}'`, sv `40:'tjugo i {N}'`, no `45:'kvart på {N}'`, da `10:'ti minutter over {H}'`) — **never re-derived**. Many name the NEXT hour: de "Viertel vor vier" / nl "kwart voor vier" / sv "kvart i fyra" / da "kvart i fire" / no "kvart på fire" / fi "varttia vaille neljä" / fr "quatre heures moins le quart" / es "las cuatro menos cuarto" / it "le quattro meno un quarto" / pt "quinze para as quatro" for 3:45, and the half-relative five-minute idioms (nl "vijf voor half vier" = 3:25). This is the heart of the activity in those locales: the spoken hour names the ball that is still waiting; the digits name the ball in the cup.
  - **"the {h1}-ball"** is a compound in de/nl/sv/da/no/fi — every ball sentence is authored whole per locale with the numeral and the noun in the locale's form (de "die Kugel mit der 4", sv "kulan med 4:an", fi "nelospallo"/"pallo numero 4"); no {h}+"-ball" concatenation.
  - **digital format**: en 3:45 · de/nl/da/no/fi often 3.45 or 15.45 — keep the 12-hour face with a colon on the cards in all locales (24-hour reading is row 159's job); fr textbooks write 3 h 45: the cards show 3:45 and the success sentence writes the locale form ("3 h 45 — quatre heures moins le quart").
  - **"o'clock"** has no word in several locales (fi "tasan", sv "prick") — the miss2 template is authored per locale.
  - the hands are gendered nouns (de der Zeiger, fr l'aiguille f., es la manecilla, it la lancetta, pt o ponteiro, nl de wijzer, sv visaren, da viseren, no viseren, fi viisari) — authored literally, no {hand} token.
  - new metadata for de/es/pt/it/nl/sv/da/no/fi (grade 2): the national-curriculum strand name, never "Common Core".

## 10. Sound off, access, phones
- Legible with the sound off: balls roll and drop, marbles bounce or click, the pin shakes, the gap line shows, the gate opens; the crow is a hop.
- Keyboard: Tab to the card grid, arrows, Enter posts, Check by the shell key; free-play step keys + / −.
- aria-live announces the posted card's time and the miss bubble.
- Taps: cards ≥ 140 × 56 px; the long hand's grab zone 44 px round its tip (free play).
- Pictures: Sprocket 96 px at 704, 64 px at 360 and 320 (never smaller).
- Check above the fold at 360 × 740 (≈ 680) and 320 × 640 (608).
- Phone layout: stacked (hopper + Sprocket → clock with chute → cup and tray → cards → bubble).

## 11. Distinct from
- **159 Counter That Keeps Counting** (two drum counters under the clock, a crank, a ghost clock acting out the dialed number) and **160 Drive Cables** (a card drives ghost hands on a clock): this row has no counter, no crank and no ghost hands — the check is a ball that has or has not dropped, plus a pin in the rim.
- **103 Pull-Back Key** (hold a key, the clock winds back to the hour it is in): here nothing is wound back by the child; the hour is a physical record (the ball in the cup), and the demonstration runs FORWARD to show when the next ball drops.
- **101 Hour Road · 102 Digits That Ride · 104 Echo Slice · 161 Flip Tiles · 163 Run-On Test**: none has a ball run, a lidded cup or a minute pin.
- **Learning Clock** (premium tool): geared hands with an arc and spoken time; no balls, no cards, no pins.
- Built registry #1–#22: no clock at all.

## 12. Build plan
- **Core state** `{ level, round, clock:{h,m}, cards:[{h,m}×4], order:[4], posted:null|index, misses, cup:h, tray:[h−1,h−2], free:{longAngle} }`. Functions: `cardsFor(h,m,dir)` (the 2 × 2), `post(i)` (marble = card.h, pin angle = 6·card.m), `check()` → `{ok, hourOk, minOk, hourSide:'later'|'earlier'|null}`, `runOn(h,m)` (notch states to the next :00 — the cup changes only at the final step), `dropAt(prev,next)` (+1 ball / −1 ball / 0 when the long hand crosses 12 in free play), `nextTask` (order-only reshuffle per pass), `shuffleCards` (no position 3× running).
- **Gate's own ground truth** (`verify-hour-ball-core.js`): its own time→angle formula (short 30h + 0.5m, long 6m); every round has exactly one card equal to the clock; the four cards are exactly {h, H} × {m, 60 − m} with H = h ± 1 (wrapped 1..12); minute values each appear twice; 10 distinct hours per level; 5/5 minute split; time-rank distribution as §6; `runOn` never changes the cup before its last step; free play: crossing 12 forward from h:45 drops ball h + 1 exactly once, crossing back returns it; 300 shuffles per level within 22–28 % per position and no triple; the hopper's waiting-ball numerals and the cup ball are absent from the DOM text and aria before Check.
- **Mutations** (one per rule, each must be killed): next-hour card replaced by a far hour (old data) · a round with two right cards · minute mirror removed · ball dropping at :30 (half-hour carry) · ball not returning on an anticlockwise crossing · cup ball visible before Check · pin planted at 6·h instead of 6·m · shuffle allowing the same position 3× · 12:45 neighbour computed as 13 (no wrap) · Sprocket rendered < 64 px at 360.
- **Local test**: real pointer drags on the long hand in free play (cross 12 forward and back, assert one drop and one return); every round at 320 · 360 · 412 · 704 · 768 · 1024 · 1366; a wrong card at miss 1 shows exactly the showing of its wrong part(s); miss 2 ends with the clock back on the round's time and the cup open.
- **Pictures to verify on a contact sheet**: `farm animals/rooster` (already verified for row 101).
- **Risks**: the per-locale ball sentences (compound nouns) — authored whole, reviewed by the native reviewer. Nothing BLOCKED.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — a marble run on a clock is a toy; children will spin the long hand to make balls drop, and every quarter-to success ends with the next ball rolling down.
2. **Would a teacher put it on the board?** Yes — it shows with a mechanism the one thing children get wrong about quarter to (3:45, not 4:45: the 4-ball has not dropped); every wrong card is a named error; the 2 × 2 cards make guessing pointless.
3. **Would a parent trust it?** Yes — calm brass-and-cream clock, one library rooster, numerals only, works silently and on a phone.
4. **The invention in one sentence:** the clock drops a numbered ball into its cup each time the long hand reaches the 12, so quarter to four still has the 3-ball in the cup.

## 14. Critic review (2026-10-17)
Scores before → after: invention 4→5 · fun 5→5 · completeness 5→5 · correctness 5→5 · distinctness 2→5 · reality 5→5
What changed:
- **Invention replaced** — the first draft's odometer drums under the clock were row 159's counter box (hour drum + minute drum + a clunk on the carry) and its card check was row 160's ghost hands acting out the card. Now: an hour BALL run (a ball drops only when the long hand reaches 12; the lidded cup holds the hour that has begun) plus a feather pin for the minutes — the same misconception (3:45 vs 4:45), no shared device.
- Miss 1 now shows the hour part and the minute part separately (ball bounces / pin stands alone); miss 2 runs FORWARD to the 12 (distinct from 103's wind-back) and back.
- Re-measured the round tables (`work-c31/clock.js`): 10 distinct hours, 5/5 minute split, time-rank 2/3/3/2 per level (L2 2/2/3/3 with 12 = 0), positions 24.8–25.2 %; the "nearest hour" strategy gets the hour right 5 of 10 → 2.5 cards expected.
- Time-phrase source pointed at the reviewed `positions` tables in `learning-clock.js` (11 locales, five-minute aware); compound "4-ball" nouns flagged as a per-locale authoring trap; setting 2 changed to the past-hours tray (visible at rest).
- Layout check (2026-10-17): switched to stacked — split stage column is ~370 px at 704.
