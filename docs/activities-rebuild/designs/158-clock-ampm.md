# Row 158 — Sprocket's Clock: A.M. or P.M.? → THE DAY WHEEL (2.MD.C.7)

## 0. Identity
- id `clock-ampm.morning-or-night.2-md-c-7` (frozen) · Grade 2 · CCSS 2.MD.C.7 (the a.m./p.m. clause) · Measurement & Data · own files `day-wheel-core.js`, `day-wheel-activity.js`, `day-wheel-activity.html`, `day-wheel-activities.json` (row leaves `clock-ampm-activities.json`, emptied to `[]`). Title/intro frozen en..nl; sv/da/no/fi metadata new at build. Sprocket the rooster appears as the library rooster (farm-animals/rooster), never drawn.
- worksheets covered: none mapped.
- the old activity: read a sentence ("You eat breakfast.") and a time ("7:00"), tap a.m. (sun icon) or p.m. (moon icon). It had no clock at all ("an analog clock can't disambiguate a.m./p.m.") — which is exactly the idea worth teaching. Kept: the nine everyday events and their sentences/translations (breakfast, wake up (with the bed), school, dinner, sleep → bed, play after school, brush teeth before bed), the time on the ticket, the per-locale day-part words (de Vormittag / Nachmittag & Abend, fr le matin / l'après-midi et le soir, es mañana / tarde y noche, pt manhã / tarde e noite, it mattina / pomeriggio e sera, nl ochtend / middag & avond). Dropped: "The sun comes up" (sunrise is 3 a.m. or 10 a.m. in the Nordic locales) and "You look at the stars" at 9 p.m. (it is light all night in a Nordic June); the critic also dropped the draft's rooster-at-dawn, owl-at-dusk and lunch-at-12:30 cards (latitude and national meal times).

## 1. The pitch
"Every time on the clock happens twice a day — wind the hands forward from midnight and the day wheel behind the clock shows which lap you're on: stop at the 7 o'clock that has breakfast in it."

## 2. Why a child will want it again
- A big friendly clock with a round **window** at the top of its face. Behind the face turns the **day wheel**: one half gold (the a.m. lap), one half violet (the p.m. lap), with the library sun at noon and the library moon at midnight. The child drags the hour hand round and round; the minute hand whizzes; the wheel turns at half speed, so the sun creeps into the window as the morning goes by and slips away after noon.
- Winding is the fun: one lap of the hands and the window has changed colour; the badge under the clock flips from a.m. to p.m. with a little *flip*.
- At midnight the hands meet a stop pin — the day starts here — and at the second midnight a second pin stops the day.
- Success show: the event picture (cereal bowl, playground, campfire…) slides into the window and sits on its half of the wheel; the library rooster (Sprocket, farm-animals/rooster, 96 / 64 px in the corner) gives a scale-bounce and one crow for every success — the same for morning and evening (a library picture cannot tuck its head, so the first draft's "sleepy tuck" is gone).
- No timer, no score, no streak.

## 3. The skill and the misconception
- **Skill:** tell and write time using a.m. and p.m. — know that the clock face goes round twice a day, that a.m. is the lap from midnight to noon and p.m. the lap from noon to midnight, and place everyday events in the right lap.
- **Misconceptions and the pushback:**
  1. **"7 o'clock is 7 o'clock."** The child winds to the first 7, and the window shows gold; winding on, the hands come back to 7 and the window is violet. The same hand position is two different places on the wheel — visible every round.
  2. **"p.m. means night."** Afternoon events (playground 3:00, bike 4:00, piano 4:30) sit in broad daylight in the child's mind; the wheel puts them in the violet half because they are after the noon sun. Hint text says "after noon", never "night".
  3. **Noon and midnight confusion** (Level 2 riddles: 12:30 p.m. AND 12:30 a.m.). Children think "12:30 is lunchtime, so p.m." — the riddle "half an hour after midnight" lands at the very first stop of the wind, in the gold half, under the moon; "half an hour after noon" sits just past the sun, in the violet half.
  4. **Thinking the day starts at 6 or 7** (when the child wakes). Every round starts at midnight with the moon in the window; the a.m. lap includes the dark hours before waking.

## 4. The stage (what is on the screen)
**Layout: stacked at every width** (layout check 2026-10-17: no `layout:'split'` — its stage column is only ≈ 370 px at 704, too narrow for this apparatus). The stage takes the full card width, ≈ 648 px at 704 (≈ 656 at 1024); whatever §4 places in a left, right, side or bubble column stays side by side inside the stage when the activity draws it, while the shell's bubble, keypad and Check sit under the stage. Sizes written for a wider stage fit the 648 px by closing margins and gaps first; no picture drops below 96 px, no tap below 44, no data mark or grid cell below 40.

At **704 px** (stage 660 × 520):
- **Clock** (left, 380 × 380): face 360 px, cream with teal rim 10 px, numerals 1–12 Baloo 2 800 30 px, minute ticks; hour hand teal 12 px wide, 110 px long, with a 56 px round grip at its tip; minute hand coral 7 px, 160 px long (geared, not draggable). **Window**: a 150 × 70 px arch in the face between the 11 and the 1, through which the day wheel shows. **Day wheel** (behind, only the window part visible): diameter 300, left half gold `#F6D57A`, other half violet `#8C7BC4`, the sun (beach/sun, 64 px) at the noon point and the moon (camping/moon, 64 px) at the midnight point — wheel markers inside the window (apparatus marks riding the wheel, like the data-mark ruling); they are the only place these two pictures appear.
- **Lap badge** (under the clock, 160 × 48): shows the day-part word of the lap the hands are in ("a.m." / "p.m." in EN; per-locale words §9), gold or violet.
- **Digital readout** (beside the badge, 120 × 48): the set time in 12-hour form ("7:00"), so the child sees what they set.
- **Ticket** (right column, 230 × 250): the event picture 120 px (library, table §6) above the sentence (Nunito 18 px) and the target time in big numerals ("7:00", 40 px). In the "label tells" setting the picture is under a paper flap and the ticket shows "7:00 p.m." instead.
- **Legend** (under the ticket, small): two DRAWN half-circle swatches — gold "12 → 12 noon" and violet "12 noon → 12" — 18 px text, no pictures.
- **Task line** (22 px): "Wind the clock from midnight. Stop at the time this happens."
- Bubble under the clock.

At **360 px**: stacked — ticket on top (picture 72 px left of the sentence; target time 32 px), clock 300 px face (numerals 24 px, hour grip 48 px), window 120 × 56 with sun/moon 48 px markers (wheel markers are apparatus marks; the event picture that lands there is shown at 64 px overlapping the window top), badge + readout in one row under the clock, legend hidden (the badge carries it). Check above 360 × 740; at 320 × 640 the face is 260 px and the ticket picture 64 px.

## 5. The hand (every interaction)
- **Drag the hour hand** by its grip around the face: the hand follows the finger's angle; release snaps to the nearest whole hour (Level 1) or half hour (Level 2) in 120 ms; the minute hand turns twelve times faster (geared); the day wheel turns at half the hour hand's speed. Crossing 12 forward flips the lap (badge flip 150 ms, soft *tock*); crossing back flips it back. The stop pins at the start and end of the day block further winding with a bump.
- **Keyboard**: arrows step ±1 hour (L1) / ±30 min (L2); Page Up/Down ±6 hours.
- **Tap the badge**: nothing happens (it is a readout) — prevents the "tap a.m./p.m." habit.
- **Free play**: before Check and after success, winding is free across the whole day; the window, badge and readout follow.
- Every round starts at midnight (hands at 12, moon in the window, badge a.m.).

## 6. The rounds
One round = one event card. The child winds from midnight and stops at the card's time in the right lap, then Check.

**Level 1 — o'clock** (EN times; per-locale overrides below):

| # | picture | sentence (EN) | time | lap |
|---|---|---|---|---|
| 1 | furniture/bed | You wake up and get out of bed. | 6:00 | a.m. |
| 2 | breakfast/cereal | You eat breakfast. | 7:00 | a.m. |
| 3 | classroom/backpack | School starts. | 8:00 | a.m. |
| 4 | breakfast/apple | You eat an apple at break time. | 10:00 | a.m. |
| 5 | activities/playground | You play on the playground after school. | 3:00 | p.m. |
| 6 | activities/biking | You ride your bike. | 4:00 | p.m. |
| 7 | around-the-house/pot | You eat dinner. | 6:00 | p.m. |
| 8 | activities/reading | You read a bedtime story. | 7:00 | p.m. |
| 9 | furniture/bed | You go to bed. | 8:00 | p.m. |

**Level 2 — half hours, and the noon trap:**

| # | picture | sentence (EN) | time | lap |
|---|---|---|---|---|
| 1 | breakfast/croissant | You eat breakfast. | 6:30 | a.m. |
| 2 | around-the-house/toothbrush | You brush your teeth after breakfast. | 7:30 | a.m. |
| 3 | classroom/backpack | School starts. | 8:30 | a.m. |
| 4 | breakfast/apple | You eat an apple at break time. | 10:30 | a.m. |
| 5 | — (no picture: a clock riddle) | Half an hour after midnight. | 12:30 | a.m. |
| 6 | — (no picture: a clock riddle) | Half an hour after noon. | 12:30 | p.m. |
| 7 | activities/piano | You have a piano lesson after school. | 4:30 | p.m. |
| 8 | camping/campfire | You sit by the campfire. | 7:30 | p.m. |
| 9 | around-the-house/toothbrush | You brush your teeth before bed. | 8:30 | p.m. |

- **Critic changes, measured against the brief's rules (no event may depend on latitude or national meal times):** "The rooster crows" (dawn) and "The owl wakes up" (dusk — 23:00 in a Nordic June) were sky events; "You eat lunch" at 12:30 is wrong-lap in the Nordic schools (lunch ≈ 11:00, a.m.) and in Spain (≈ 14:00), and "after lunch" inherited it. They are replaced by events whose LAP is the same in every country (getting up, a bedtime story) and, for the noon trap, by two **clock riddles** — "Half an hour after midnight" (12:30 a.m.) and "Half an hour after noon" (12:30 p.m.) — which depend on nothing but the clock, and turn the one shared time into the sharpest trap of the level: 12:30 a.m. is the very FIRST stop after midnight. The riddle tickets carry no picture (the sentence and the big time only); on success the window shows the moon side or the sun side of the wheel instead of an event picture.
- **The clock alone never decides:** in L1 the hours 6, 7 and 8 appear in BOTH laps (get up 6 a.m. / dinner 6 p.m.; breakfast 7 a.m. / bedtime story 7 p.m.; school 8 a.m. / bed 8 p.m.) and the SAME picture (the bed) is in both laps; in L2 7:30, 8:30 and 12:30 appear in both laps, and the toothbrush is in both laps — only the sentence ("after breakfast" / "before bed") decides.
- **Answer balance (measured, critic's script):** a.m. 4 / p.m. 5 in L1, a.m. 5 / p.m. 4 in L2; in the reshuffled order no more than two consecutive rounds share a lap (the reshuffle rejects orders that break this). Because the child winds from midnight, the a.m. answer is always the FIRST stop at that time and p.m. the second — "always the first stop" scores 4/9 (L1) and 5/9 (L2), "always the second" the reverse; neither strategy works. (Only rounds whose time appears in both laps are "first/second" decisions; the others are still decided by the lap the child stops in.)
- **Per-locale times (the lap never changes, only the printed time):** the default times above serve en/de/fr/pt/nl/sv/da/no/fi. es moves the evening: dinner 8:00 p.m., bedtime story 9:00 p.m., bed 10:00 p.m. (L2: brush teeth before bed 9:30 p.m.); it: dinner 8:00 p.m., story 9:00 p.m., bed 10:00 p.m. (L2 brush 9:30 p.m.). The order of the day (dinner → story → bed) must survive every override; every L1 time stays on the hour and every L2 time on the half hour; each level keeps at least one time that is in both laps (es/it L1: 8 school/dinner, 10 apple/bed); the native reviewer confirms each locale's times as ordinary for a 7-year-old there. No time is ever chosen that would move an event across noon or midnight.
- **Order:** order-only reshuffle per pass within each level.

## 7. Check, the misses, the success
- **Check with nothing done** (hands still at midnight) → hint, no miss: "Wind the hour hand round to the time on the card."
- **Wrong time** (hands not at the card's time in either lap): the digital readout and the card's time both get a coral underline. Hint: **"The card says {time}. Your clock says {set}."** (a miss).
- **Miss 1** (right time, wrong lap): the event picture slides up toward the window, meets the wrong colour, and bounces back to the ticket; the sun on the wheel pulses once (the noon line). Hint: **"Does this happen before noon or after noon? Before noon is a.m., after noon is p.m."** (per-locale day-part words).
- **Miss 2**: a ghost hour hand appears and winds on (or back) one full lap to the OTHER {time}; the wheel follows in ghost, and the event picture seats itself in the window there for one second, then the ghost fades. The child's own hand stays where it was — they wind it themselves. Hint: **"Wind one more lap — the same time comes round again."** (or "one lap back").
- A new move removes underlines and ghosts.
- **Success**: the picture slides into the window and sits in its half of the wheel (a riddle round: the wheel turns its sun or moon side to the window); the badge glows; Sprocket bounces and crows. Bubble (exact EN, one per round): L1 — "6:00 a.m. — you get up in the morning!" · "7:00 a.m. — breakfast is before noon!" · "8:00 a.m. — school starts before noon!" · "10:00 a.m. — break time is still before noon!" · "3:00 p.m. — after noon, so it's p.m.!" · "4:00 p.m. — after noon, so it's p.m.!" · "6:00 p.m. — dinner is after noon!" · "7:00 p.m. — a bedtime story, after noon!" · "8:00 p.m. — bedtime is on the second lap!"; L2 — "6:30 a.m. — breakfast is before noon!" · "7:30 a.m. — teeth after breakfast, before noon!" · "8:30 a.m. — school starts before noon!" · "10:30 a.m. — break time is still before noon!" · "12:30 a.m. — half an hour after midnight is a.m.!" · "12:30 p.m. — half an hour after noon is already p.m.!" · "4:30 p.m. — after school, after noon!" · "7:30 p.m. — the campfire is after noon!" · "8:30 p.m. — teeth before bed, on the second lap!"
- **Setting "the a.m./p.m. label tells"**: the card shows "7:00 p.m." with the picture under a flap; the lap badge goes blank (colour only — otherwise the child would just match two printed words; now they must know that p.m. is the half after the noon sun); the misses work the same; on success the flap lifts and shows what happens then (e.g. 7:30 p.m. → "You sit by the campfire.").

## 8. Settings
1. **Times**: o'clock (Level 1) · half past (Level 2) — the hand snaps differently and the cards change.
2. **Clue**: what happens (picture + sentence, default) · the a.m./p.m. label (picture under a flap) — at rest the ticket visibly changes.

## 9. Words
- title: "Sprocket's Clock" (frozen)
- task line: "Wind the clock from midnight. Stop at the time this happens."
- prompt: "Stop at the right {time}."
- sentences: the 16 EN event sentences and 2 riddles in §6 (and the old translations for the kept ones: breakfast, school starts, dinner, go to bed/sleep, play after school, brush teeth before bed).
- hints: "Wind the hour hand round to the time on the card." · "The card says {time}. Your clock says {set}." · "Does this happen before noon or after noon? Before noon is a.m., after noon is p.m." · "Wind one more lap — the same time comes round again." · "Wind one lap back — the same time was there before."
- celebrations: the 18 lines in §7, authored per locale (the day-part word comes from the badge table).
- badge words (the content): en "a.m." / "p.m."; es "a. m." / "p. m."; fi "ap." / "ip." — the three locales where the two-lap words exist. Everywhere else the badge's COLOUR is the lap and its word is the locale's natural day-part word for the CURRENT hour, which must be true at night too (critic: the draft gave de "vormittags 0–12", which calls 0:30 "vormittags" — false; 12:30 a.m. is now a round). Tables (hour ranges in 24-h, the native reviewer confirms): de nachts 0–5 · morgens 5–10 · vormittags 10–12 · mittags 12–14 · nachmittags 14–18 · abends 18–24; fr du matin 0–12 · de l'après-midi 12–18 · du soir 18–24 (French really says "minuit et demie" and "une heure du matin"); it di notte 0–5 · di mattina 5–12 · del pomeriggio 12–18 · di sera 18–24; pt da madrugada 0–5 · da manhã 5–12 · da tarde 12–18 · da noite 18–24; nl 's nachts 0–6 · 's ochtends 6–12 · 's middags 12–18 · 's avonds 18–24; sv på natten 0–5 · på morgonen 5–10 · på förmiddagen 10–12 · på eftermiddagen 12–18 · på kvällen 18–24; da om natten 0–5 · om morgenen 5–10 · om formiddagen 10–12 · om eftermiddagen 12–18 · om aftenen 18–24; no om natta 0–5 · om morgenen 5–10 · på formiddagen 10–12 · på ettermiddagen 12–18 · om kvelden 18–24. Gate: every round's time gets a word from its own locale's table, and no word is used on both colours.
- settings: "Times" · "O'clock" · "Half past" · "Clue" · "What happens" · "The a.m./p.m. label"
- aria: "hour hand at {time}, {part}" · "day wheel: morning half / afternoon and evening half"
- **Locale traps:** a.m./p.m. are only native in en, es and (as ap./ip.) fi; elsewhere the 24-hour clock is normal, so the concept is taught as "the first and the second time round", with the locale's own day-part words (above). Midnight is "12" on the face in every locale. "Noon" words: de Mittag, fr midi, es mediodía, pt meio-dia, it mezzogiorno, nl de middag (12 uur), sv/da/no middag/klokken tolv (sv "mitt på dagen" — "middag" also means dinner in sv/da/no! the hint uses "klockan tolv på dagen" / "klokken tolv om dagen" to avoid it), fi keskipäivä. Dinner times differ (es/it/pt overrides §6). Time separators per locale on the ticket and readout: en/de/es/pt/it "7:00"; nl/sv/da/no/fi "7.00"; fr « 7 h » / « 7 h 30 ».

## 10. Sound off, access, phones
- Sound off: the window colour, badge, readout, bouncing picture and ghost hand carry everything; *tock*, crow and flip sounds decorate.
- Keyboard: Tab → hour hand (arrows) → Check; ticket readable by screen reader (sentence + time); aria-live bubble.
- Hour grip 56 / 48 px; pictures 120 px at 704, 72 px at 360 (≥ 64 at 320); sun/moon wheel markers 64 / 48 px are drawn-scale apparatus marks inside the window, the same pictures appear nowhere else smaller.
- Check above both folds.

## 11. Distinct from
- **#101 Hour Road** (rim unrolled into a road), **#102 digits ride the hands**, **#103 pull-back key**, **#104 echo slice**, **learning-clock** tool, **New 210 Sleeps Calendar** (moons between days), **New 238 Season Wheel** (the year turns one way) — none has a day wheel geared at half speed behind the face, and none teaches a.m./p.m. as the two laps of the hands. **#159** (24-hour counter) is its sibling: there the counter keeps counting; here the lap is the idea.

## 12. Build plan
- **Core state:** `{round, minutes:0..1440 (from midnight), miss}`; `hourHandAngle = (minutes/720)·360`, `wheelAngle = (minutes/1440)·360`, `lap = minutes < 720 ? 'am' : 'pm'`, `set12 = h12:mm`. `grade()` → `{ok, kind:'idle'|'time'|'lap'}` with truth from the card (`h24, m`).
- **Gate truth (verify):** each card's lap derived from its 24-hour time (h24 < 12 → a.m.); a.m./p.m. 4/5 (L1) and 5/4 (L2) per level and per locale after overrides; at least one shared clock time across laps per level per locale; the toothbrush in both laps in L2 and the bed in both laps in L1; the day order dinner < story < bed in every locale; no round at exactly 12:00 or 0:00; reshuffle never puts three same-lap rounds in a row; every badge word true for its hour (tables §9); every picture present in its theme JSON (verified by the critic: farm-animals/rooster, breakfast/cereal/apple/croissant, classroom/backpack, activities/playground/biking/reading/piano, around-the-house/pot/toothbrush, furniture/bed, camping/moon/campfire, beach/sun). No event card depends on the sky or a meal time that changes lap between countries.
- **Mutations:** lap ignored (any 7:00 accepted); lap flips at 6 instead of 12; wheel turns at hand speed (one turn per 12 h); stop pin missing (winding below midnight); badge tappable as an answer; noon round graded a.m.; Check at midnight counts a miss; ghost hand moves the child's hand; per-locale override breaks the 4/5 balance.
- **Pictures:** all seen on contact sheets (breakfast, classroom, activities, around-the-house, camping, beach, farm-animals); around-the-house/pot is a red cooking pot — reads as "cooking dinner" with the sentence; camping/moon is a full moon.
- **Risks:** the drag across 12 must count laps robustly (track cumulative angle, not the snapped angle). The day wheel must not imply real sky light — it is two coloured halves, never a sunrise gradient.
- **Blocked:** nothing.

## 13. The four questions
1. **Choose it again?** Yes — winding a big clock round and watching a sun creep into a window is a toy in itself, and the rooster reacts.
2. **Teacher on the board?** Yes — it is the best picture of a.m./p.m. there is: the hands go round twice, the day once.
3. **Parent trust?** Calm, library pictures, latitude-proof (no sunrise claims), works on a phone.
4. **Invention:** a day wheel geared at half speed behind the clock shows which of the two laps you have wound to.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 4→5 · completeness 4→5 · correctness 3→5 · distinctness 5→5 · reality 3→5
What changed:
- **Latitude and meal times:** the draft still had a rooster-at-dawn card, an owl-at-dusk card (dusk is 23:00 in a Nordic June) and "lunch at 12:30" (a.m. in Nordic schools, ≈14:00 in Spain — the lap itself changes by country). Replaced by country-proof events (getting up with the bed, a bedtime story) and two pure **clock riddles** — 12:30 a.m. and 12:30 p.m. — which make the noon trap sharper (12:30 a.m. is the very first stop of the wind) and depend on nothing but the clock.
- Measured with my own script, default and the es/it evening overrides: L1 a.m./p.m. 4/5, L2 5/4; shared times in both laps every level and locale (L1 6, 7, 8; L2 7:30, 8:30, 12:30); the bed and the toothbrush each appear in both laps; day order dinner → story → bed holds after every override.
- **Badge words were false at night** (de "vormittags 0–12" calls 0:30 vormittags): now per-locale tables of the CURRENT day-part, true at every hour, for de/fr/it/pt/nl/sv/da/no; en/es/fi keep their own two-lap abbreviations.
- A library picture cannot "tuck his head under his wing": Sprocket now bounces and crows for every success. All 18 celebration lines written in exact EN.
- Layout check (2026-10-17): switched to stacked — split stage column is ~370 px at 704.
