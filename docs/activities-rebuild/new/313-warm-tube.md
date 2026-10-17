# New 313 — The Warm Tube → THE MARKER RING: type what you read and a brass ring clamps onto the tube at YOUR number — it only meets the top of the liquid if you counted the marks right (NGSS 3-ESS2-1)

## 0. Identity
- **id** `warm-tube.play.3-ess2-1` · grade 3 · NGSS 3-ESS2-1 (represent data to describe typical weather; here: read the instrument that makes the data) · strand Science · key `warm-tube` → `warm-tube-core.js`, `warm-tube-activity.js`, `warm-tube-activity.html`, `warm-tube-activities.json`; framework via `frontend/lib/frameworks.ts` (NGSS). Scaffold: `node scripts/new-activity.js --num=313`.
- **Worksheet covered:** G3-345 "Hot or Cold?" (read each thermometer, write the temperature; L1 marks every 10 all numbered, L2 marks every 5, L3 marks every 1 numbered every 5). This instrument reads *and* sets, on scales whose marks are worth **1 (numbered every 5 — the worksheet's L3)**, 2, 5 or 10, with the numbered marks sparse, and adds below zero.
- **Honest alignment note:** the activity teaches the *instrument* behind 3-ESS2-1 (reading the thermometer that makes weather data) and the representing half (the child's ten readings become a line graph). The readings are the child's, not a claim about any real place's weather — the record card never calls them "typical weather".
- New instrument; no old activity.

## 1. The pitch
"The liquid stops somewhere between the numbers — type the temperature you read and a brass marker ring slides down the glass and clamps exactly where YOUR number belongs on this scale: if it lands on the top of the liquid you read it right; if it stops short of the liquid — or between two marks — you counted each mark as one."

## 2. Why a child will want it again
- **You make the weather.** A sun (`weather/sunny`) and a snowflake (`weather/snowflake`) wait beside the bulb. Drag the sun onto the bulb and hold: the red liquid climbs, one degree at a time, with a faint tick per degree and a fuller "tock" each time it passes a mark; let go and it stops. The snowflake brings it down. A single tap on either source is exactly one degree — so children discover that on a by-5 scale it takes **five taps to climb one mark**. That discovery *is* the lesson.
- **The marker ring is satisfying.** A real lab thermometer has a sliding marker ring; ours is a brass collar with a coral grip. After Check it slides down the glass and clamps with a "clack". On the liquid top: ring and liquid lock, the ring flashes gold and the bulb glows. Off it: the gap between ring and liquid is drawn as a coral span — a picture of exactly how far off you were and in which direction.
- **Frost you can see.** Below the zero mark the tube's backing is pale ice-blue with frost crystals at the edge, and a little glass of water stands beside the bulb: when the liquid is at or below 0 the water in the glass is white ice; above 0 it is blue water. When the reading is "−6", the child sees ice; if they type "6", the ring clamps above zero, on the warm side, far from the frosty liquid top.
- **The end-of-pass show — the reading card.** Every round is one reading ("day 1 … day 10" on the card, as in a class weather chart). Its temperature is pinned as a dot on a small 10-slot line graph beside the tube (the child's own readings and settings). After reading 10 the graph draws its line through the dots, the warmest dot grows a drawn sun token and the coldest a drawn star token, and the bubble reads them out — a table of readings turned into a graph, which is the data practice 3-ESS2-1 names.
- **Free play:** between rounds the sun and snowflake work freely, the ring can be dragged along the glass (it snaps to marks and shows nothing — a pointer, not an answer), and the glass of water freezes and thaws on demand.

## 3. The skill and the misconception
- **Skill:** read a thermometer whose marks are worth 2, 5 or 10 and whose numbers are printed only every 10 or 20 marks' worth; read below zero; and set the liquid to a stated temperature. Every temperature lies on a mark (no estimating between marks), as on the worksheet.
- **Misconception 1 — counting each unnumbered mark as 1** (on a by-2 scale, 10 and three marks → "13"; the truth is 16). **Pushback:** the ring goes where 13 truly lives — between two marks, a half-mark above the 12 mark — so the ring sits in empty glass *below* the liquid top. The child sees their number does not even sit on a mark. On by-5 the gap is larger still. In set mode the same misconception stops the liquid at the wrong mark (asked for 16, the child climbs six marks from 10 and stops at 22): on Check the ring clamps on the liquid top and **reads back what the child made — "22 °C" on its tag, beside the target chip "16 °C"** — so the error is shown as two numbers that disagree, and the target's place on the tube is never given away.
- **Misconception 2 — reading −5 as 5.** **Pushback:** typed without the minus, the ring clamps on the warm side of the thick zero line, while the liquid top is in the frost band and the glass of water is ice. The keypad's "−" key sits *first*, left of 1 — the number line's own order.
- **Misconception 3 — below zero, numbers grow downwards in the wrong direction** (between −10 and 0 a child counts "−10, −8, −6…" correctly, but between 0 and −10 says "−2, −4" from the −10 end up). **Pushback:** same ring; plus miss 2 numbers every mark in the gap around the liquid top, so "−4 is two marks below 0" is visible.

## 4. The stage
**At 704 px (split, `layout:'split'`; the tube is the hero):**
- **Task line** (≤ 24 px): read **"Read the thermometer. Type the temperature."** · set **"Make it {t} °C. Warm it with the sun or cool it with the snowflake."**
- **Left column (320 px): the thermometer.** Glass tube 44 px wide, 440 px from the bulb's top to the tube's end; bulb 72 px. Liquid red (coral token), always the same colour (the colour never tells warm/cold). Marks: 2 px ink, 22 px long on the tube's right side; **numbered marks** 34 px long with Baloo 2 700 22 px numerals to their right ("−10", "0", "10" …, minus U+2212); the **zero mark** is 4 px thick. "°C" sits once above the scale top (18 px). Mark spacing per level: by 2 → 15 gaps × 28 px; by 5 → 8 or 12 gaps × 52 / 35 px; by 10 → 6 or 10 gaps × 70 / 42 px (always ≥ 26 px — fat enough to tap and to see).
- **Frost band:** for ranges that go below zero, the tube's backing below 0 is ice-blue with a 6 px frosted edge.
- **The marker ring:** a brass collar 60 × 14 px round the glass, coral grip 44 × 44 on its left; parked above the scale top at rest.
- **Beside the bulb:** the **sun** (96 px) above-left and the **snowflake** (96 px) below-left, each on a round cream pad (104 px); the **glass of water** (drawn tool-grade: a 40 × 56 glass outline with a blue or white fill band, no face, no text) right of the bulb.
- **Right column (320 px):** the **diary graph** (300 × 170: 10 day slots numbered 1–10 under a baseline; the round's own range on the y side, no labels but the zero line if present); under it the **answer box** 120 × 60 with "°C" after it (read mode) or the **target chip** "{t} °C" 120 × 52 (set mode); under that the **keypad**: "−", 0–9, ⌫ in two rows of six (keys 48 × 48); **Check** 140 × 52 under the keypad.

**At 360 px (stacked):**
- Row 1: tube (left, 120 px wide incl. numerals; tube height 300 px: mark spacing ≥ 20 px in every level) and a right column (200 px) holding the sun and snowflake (64 px each, side by side on 72 px pads), the glass of water (32 × 44), the answer box / target chip (120 × 52).
- Row 2: keypad two rows of six (keys 52 × 46). Row 3: Check full width 48 px.
- The diary graph moves below Check (it is the reward, not the task) at 328 × 120.
- **Fold budget 360 × 740:** header 56 + task 52 + row 1 320 + keypad 100 + Check 48 + gaps 24 = 600. **320 × 640:** tube 260 px (spacing ≥ 17 px; the ring's 44 px grip carries the tap), keys 46 × 44 → 548. Check above both folds.

## 5. The hand
- **Warm / cool (set mode, and free play):** drag the sun or snowflake onto the bulb: while it touches, the liquid moves 1° every 150 ms (after 2 s: every 70 ms); it never passes the scale ends (the source bounces off with a soft thud). **Tap** a source = exactly 1°. Each degree: a tiny tick; each mark passed: a "tock" and the mark blinks. The glass of water freezes (220 ms white wipe) on crossing to ≤ 0 and thaws on crossing above.
- **Read mode:** the liquid has already stopped; the sources are dimmed (still playable after Check); type with the keypad. "−" toggles a leading minus; up to 2 digits.
- **Check:** the ring slides down from its park (400 ms ease-in) to the child's number's **true height on this scale** — including between marks if the number is not on a mark — and clamps (40 ms squash, "clack"). In set mode the ring clamps on the **liquid top** and its tag shows the temperature the liquid really reads there (the read-back); the target's position is never drawn before success.
- **Undo:** any key, a warm/cool touch, or dragging the ring lifts it back to its park (200 ms).
- **Keyboard:** ↑ / ↓ = warm / cool 1° (set mode); digits and "-" type; Backspace erases; Enter = Check; Tab: keypad → sources → ring → Check.
- **Sound (bonus):** ticks and tocks, the clack, a shimmering chord on lock; TTS reads "minus six degrees" in voiced locales.

## 6. The rounds
One round = one day: a **read** or **set** task, alternating (read on odd days, set on even). In set rounds the liquid starts at the previous day's temperature and the target is this day's — so every set round needs at least one mark of travel (1–12, see below). Every temperature lies on a mark, never on the scale's ends, never 0, never the same as the day before. Measured (`work-42/tube.js`):

| level (mark worth · numbered every · range) | days 1–10 (R S R S …) | off a numbered mark | below zero |
|---|---|---|---|
| by 1 · 5 · 0 to 20 (worksheet L3) | 7, 12, 3, 18, 14, 9, 16, 4, 11, 13 | 10 / 10 | — |
| by 1 · 5 · −10 to 10 | −4, 3, −8, 7, −3, 2, 6, −6, −2, 4 | 10 / 10 | 5 (read: 4) |
| by 2 · 10 · 0 to 30 | 14, 22, 18, 6, 20, 12, 28, 16, 10, 24 | 8 / 10 | — |
| by 2 · 10 · −10 to 20 | 4, −6, 8, −2, 14, 2, −8, 16, −4, 12 | 10 / 10 | 4 (read: 2) |
| by 5 · 20 · 0 to 40 | 15, 25, 10, 35, 5, 30, 20, 15, 35, 25 | 9 / 10 | — |
| by 5 · 20 · −20 to 40 | −5, 15, −15, 25, 5, −10, 35, 10, −5, 30 | 10 / 10 | 4 (read: 3) |
| by 10 · 20 · 0 to 60 | 30, 10, 50, 20, 30, 40, 10, 50, 30, 10 | 8 / 10 | — |
| by 10 · 20 · −40 to 60 | −10, 30, −30, 10, 50, −10, 20, −30, 30, 10 | 9 / 10 | 4 (read: 2) |

- **Bots (all levels):** (by 1 is the entry scale — counting marks as 1 is *correct* there; its bot is *"say the nearest printed number"*: 0/10) *"count each mark as 1 from the number below"* right only on the numbered days (0–2 of 10); *"say the nearest printed number"* the same 0–2; *"drop the minus"* fails every below-zero day. The dossier's "off the numbered marks in ≥ 60 %" holds at 80–100 %.
- **by 10 · 0 to 60** has only five possible values (10–50); days repeat (never two days running) — the honest cost of a coarse scale; it is the easiest setting.
- **Set rounds' travel in the authored order (marks):** by 2: 4, 6, 4, 6, 7 and 5, 5, 6, 12, 8 · by 5: 2, 5, 5, 1, 2 and 4, 8, 3, 5, 7 · by 10: 2, 3, 1, 4, 2 and 4, 4, 6, 5, 2. The one-mark set rounds are deliberate on the coarse scales (on by 5 a one-mark climb is five sun taps — the discovery). Directions per level are 2 up / 3 down or 3 / 2.
- **Answer position:** typed / set by the liquid, so there is no tap position to guess. Up/down direction of set rounds per level: 3 up / 2 down or 2 / 3 (measured from the table).
- **Order:** the 10 days keep their day order *within* a pass (it is a diary), and the **level's pool of 10 is re-dealt in a different day order every pass** (order-only reshuffle; never the same order twice) under one constraint: **no two equal temperatures on neighbouring days** (by 10 repeats values), so every set round has ≥ 1 mark of travel; the read/set alternation is recomputed from the new order and each set round's start = the new previous day.

## 7. Check, the misses, the success
- **Check with nothing typed** (read) → **"Type the temperature you read."** · **liquid not moved** (set) → **"Drag the sun or the snowflake onto the bulb."** (no miss).
- **Miss 1 — the ring shows where your number lives:** the ring clamps at the child's number's true height (read) or on the liquid top with its read-back tag (set); the gap to the liquid top is a coral span with a small up or down chevron. If the number falls *between* marks, the two nearest marks blink. Hints EN: read, ring above → **"Your number is higher up the tube than the liquid. What is each mark worth?"** · ring below → **"Your number is lower down the tube than the liquid. What is each mark worth?"** · ring on the other side of 0 → **"Look at the zero line. Is the liquid above it or below it?"** · set → **"The liquid shows {r} °C. You need {t} °C. Warm it or cool it."** ({r} = the read-back)
- **Miss 2 — every mark gets its number:** between the two numbered marks around the liquid top (both modes — in set mode around where the child stopped, never around the target), each mark shows a faint 14 px numeral for 4 s ("12, 14, 16, 18"), the one at the liquid top drawn last and brighter. Hint EN: **"Here every mark is worth {m}. Count the marks from {label}."**
- A new key, a warm/cool touch or a ring drag takes the help away until the next Check.
- **Success:** ring and liquid lock, gold flash; the day's dot drops onto the diary graph with its number; bubble EN read **"{t} °C — well read!"** · set **"{t} °C — just right!"**. After day 10: the line through the dots, sun on the warmest, snowflake on the coldest: **"Warmest: day {a}, {ta} °C. Coldest: day {b}, {tb} °C."**

## 8. Settings
1. **Scale:** marks worth 1 / 2 (default) / 5 / 10 — changes the marks, the numbers and the spacing at rest (by 1: 20 gaps × 22 px at 704, × 15 px at 360; the numerals every 5 are the only labels).
2. **Range:** 0 and above (default) / below zero too — adds the zero line, the frost band and the negative numbers at rest.

## 9. Words (EN source)
- title **"The Warm Tube"**
- instructions **"Read the thermometer. Type the temperature."** · **"Make it {t} °C. Warm it with the sun or cool it with the snowflake."**
- hints **"Type the temperature you read."** · **"Drag the sun or the snowflake onto the bulb."** · **"Your number is higher up the tube than the liquid. What is each mark worth?"** · **"Your number is lower down the tube than the liquid. What is each mark worth?"** · **"Look at the zero line. Is the liquid above it or below it?"** · **"The liquid shows {r} °C. You need {t} °C. Warm it or cool it."** · **"Here every mark is worth {m}. Count the marks from {label}."**
- celebrations **"{t} °C — well read!"** · **"{t} °C — just right!"** · **"Warmest: day {a}, {ta} °C. Coldest: day {b}, {tb} °C."** · set-miss hint **"The liquid shows {r} °C. You need {t} °C. Warm it or cool it."**
- settings **"Scale"**: "marks worth 1" / "marks worth 2" / "marks worth 5" / "marks worth 10" · **"Range"**: "0 and above" / "below zero too"
- aria: tube `"thermometer from {lo} to {hi} degrees, marks every {m}, numbers every {num}, liquid at a mark"` (read mode never speaks the value); ring `"marker ring at {v} degrees"`.
- **Locale traps:** (a) **Celsius everywhere, en included** — the unit shows as "°C" with a (narrow no-break) space before it in fr/de/sv/da/no/fi/nl/es/it/pt and en ("14 °C"); a Fahrenheit scale is NOT offered (a °F build would need its own tables). (b) **Minus sign** U+2212 on the scale and in sentences, never a hyphen; fr/es/pt write "−6 °C" the same. (c) **"below zero"**: de *unter null*, fr *en dessous de zéro*, es *bajo cero*, pt *abaixo de zero*, it *sotto zero*, nl *onder nul*, sv *under noll* / *minusgrader*, da/no *minusgrader*, fi *pakkasta* (fi says "6 astetta pakkasta" — the sentence frames must be authored whole; the ring aria in fi uses "−6 astetta"). (d) **"mark"** = the scale's tick: de *Strich*, fr *graduation* / *trait*, es *marca* / *rayita*, sv *streck*, da *streg*, no *strek*, fi *viiva*, nl *streepje* — the panel uses the classroom word. (e) **Day numbers** "day 7" not weekday names (no week-start trap). (f) Numbers ≤ 60, no separators.

## 10. Sound off, access, phones
- Sound off: the liquid's motion, blinking marks, the ring's clamp, the coral gap span, the frost band and the freezing glass, the numbered marks of miss 2 and the diary dots are all visible.
- Keyboard path §5; focus ring 3 px teal; aria-live polite on the bubble.
- Taps: ring grip 44, sources ≥ 64, keys ≥ 44.
- Pictures: `weather/sunny` and `weather/snowflake` 96 px at 704, 64 px at 360 (the picture floors are met); the diary's warmest/coldest marks are drawn tokens (a small sun disc with rays / a six-armed star in tool colours, 18 px) per the record ruling, not shrunken pictures.
- Check above both folds (§4).

## 11. Distinct from
- **New 239 The Weather Window** (K: no-numeral thermometer bands, clothes on the sill): there the liquid's colour band is read as cold/warm/hot; here the numbers and the worth of a mark are the whole skill. The clothes delight is NOT reused.
- **New 271 The Gram Balance** (the step chip numbers the first gap of a dial): the child declares a mark's worth. Here the child never declares it; the ring tests the reading.
- **New 269 The Tick Comb** (every tick is 1, count teeth from a label): here marks are worth 2, 5 or 10 and the instrument is vertical with negatives.
- **cold-line tool** (a draggable scale above/below zero, two marks, the distance): a measuring instrument for differences; here a single reading checked by a ring, made with sources.
- No reuse of a built invention.

## 12. Build plan
- **Core state:** `{ level:{m, num, lo, hi}, day, mode:'read'|'set', temp, start, liquid, typed:{neg, digits}, ring:null|v, checks, help, diary:[v] }`.
- **Functions:** `yOf(v)` linear on the tube; `marks()`; `isMark(v) = (v − lo) % m === 0`; `warm()/cool()` ±1 clamped to (lo, hi); `typedValue()`; `check()` → read: ring = typed; set: ring = liquid, tag = liquid value, compare with target → `{ok}` | `{miss, dir:'above'|'below'|'acrossZero', betweenMarks}`; `diaryAdd(v)`; `extremes()`.
- **Gate's own truth (`verify-warm-tube-core.js`):** all 80 days (8 levels × 10) lie on a mark, inside (lo, hi), ≠ 0, no day equals the day before; off-numbered share ≥ 0.6 per level (measured 0.8–1.0); ≥ 2 negative read days in every below-zero level; the count-marks-as-1, nearest-number and drop-the-minus bots score only on the declared days; a typed `t + m/2` places the ring between marks; a typed `−t` vs `t` lands on opposite sides of the zero line; tapping a source moves exactly 1°; set rounds start at the previous day; extremes() picks the right days.
- **Mutations (each killed):** the set-mode miss drawing the ring (or any mark) at the target's position · ring placed at the nearest mark instead of the true value · warm moves one *mark* instead of one degree · minus dropped by `typedValue` · liquid colour changes with temperature · set round compared with the typed field instead of the liquid · frost glass freezes at < 0 instead of ≤ 0 · a day on a scale end · two equal days running · numbered-mark days > 40 % in any level · the ring drag in free play reveals a number.
- **Pictures to verify:** `weather/sunny` (labelled; a smiling sun — not `weather/sun`, which has no label, nor `weather/hot`), `weather/snowflake` (labelled, pale blue six-armed flake) — both seen on the contact sheet. The thermometer itself is apparatus (the library `weather/thermometer` is NOT used). Risks: fi case frames; nothing blocked.

## 13. The four questions
1. **Choose it again?** Yes — you make it hot and cold with your finger, ice forms in the glass, and a brass ring clacks into place.
2. **Teacher on the board?** Yes — the ring answers the classroom question "what is each mark worth?" with a picture of the error, and the reading card turns ten readings into a graph (the data practice of 3-ESS2-1).
3. **Parent trust?** Calm, library pictures only, Celsius, no timer; works on a phone.
4. **Invention:** a marker ring that clamps onto the thermometer at the child's own reading, so a misread scale shows as a gap between ring and liquid.

## 14. Critic review (2026-10-17)
Scores before → after: invention 4→5 · fun 5→5 · completeness 4→5 · correctness 3→5 · distinctness 5→5 · reality 5→5
What changed:
- Re-measured every level with an independent script (`work-c42/c-tube.js`): all days on a mark, inside the range, never 0, never equal to the day before; off-numbered 8–10/10; negative read days 2–4 per below-zero level; set travel ≥ 1 mark. Confirmed.
- **Set mode gave the answer away:** miss 1 clamped the ring at the TARGET's place, so a child could ignore the scale and just warm the liquid up to the ring. Now the ring clamps on the liquid top and reads back what the child made ("22 °C" beside the target "16 °C"); miss 2 numbers the marks around the child's stop, never the target; a mutation guards it.
- **Missing worksheet level:** G3-345 L3 is marks worth 1 numbered every 5; added scale "marks worth 1" with two measured 10-day tables (0–20, −10–10, 4 negative reads).
- The pitch said a mark-as-1 reading lands "half a mark above" — it lands short of the liquid (a smaller number); fixed.
- **Alignment overclaim removed:** shuffled readings are not "real 3-ESS2-1 weather data"; the end show is now an honest reading card (ten readings → a graph), and the identity names what is and is not taught.
