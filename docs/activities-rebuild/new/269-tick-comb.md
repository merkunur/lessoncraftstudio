# New 269 — The Tick Comb: a comb whose teeth fit the ticks, pulled out of the nearest printed number (2.MD.B.6)

## 0. Identity
- **id** `tick-comb.play.2-md-b-6` · grade 2 · CCSS 2.MD.B.6 · strand Measurement & Data · key `tick-comb` → `tick-comb-core.js`, `tick-comb-activity.js`, `tick-comb-activity.html`, `tick-comb-activities.json`. Start with `node scripts/new-activity.js --num=269`.
- **Worksheets covered:** G2-305 "Where on the Number Line? 40 to 60" (min 40, max 60, tick 1, label every 5) · G2-310 "Where on the Number Line? 60 to 100" (min 60, max 100, tick 1, label every 5). Both are variations of G1-248 (arrows on unlabelled ticks, write the number) — this instrument does that (read) and its reverse (place).
- New instrument; no old activity.

## 1. The pitch
"The line only prints every fifth (or tenth) number — so you pull a comb out of the nearest printed number, its teeth drop onto the ticks one by one, and the tooth that touches the dot tells you how many steps on or back you went."

## 2. Why a child will want it again
- **A comb is a toy.** It is a wooden comb (drawn apparatus, honey colour, 2 px ink) folded up inside every printed number's tick like a pocket knife. Grab a printed number and pull: the comb slides out along the line and **each tooth drops onto its tick with a tiny click** (a 40 ms dip, a 600 Hz tick), so the child *feels* one tick = one step. Pull back and the teeth fold up again, click-click-click, into the label. Children comb back and forth just for the clicks.
- **It counts back too.** Pull the comb out to the *left* of a printed number and the teeth drop leftwards — the bubble at the comb's tip reads "−2" instead of "+3". Discovering that 58 is "60, two back" is a small secret the comb gives away.
- **The dot earns its own label.** When a dot is read right, a printed-number tag stamps onto its tick (220 ms) and stays: the child's own number is now a landmark, and the second task of the round can be combed out of it. Their answer becomes part of the instrument.
- **The end-of-round show:** the comb sweeps once along the whole window from the left label to the right label, every tooth lighting in turn, and the two numbers the child earned glow as the sweep passes them.
- **Free play:** between rounds (and after the round's show) every printed number — and every earned tag — can be combed; the comb never judges. On every-10 lines the medium (5) tick carries no comb: a child who says "that's 45, half way" and counts on from there is reasoning, and the comb from 40 or 50 then proves it (five teeth either way) — the bubble at the 5th tooth reads +5 exactly on the medium tick.

## 3. The skill and the misconception
- **Skill:** read and place whole numbers on a number line whose ticks are 1 apart, that does not start at 0 and prints only every 5th or 10th number (2.MD.B.6; G2-305/310 "count on from the nearest printed number").
- **Misconception 1 — counting the printed tick as 1** (from 40, the child says "one" on 40, "two" on 41, and writes 41 for the dot on 42). **Pushback:** the printed tick sits under the comb's *handle*; there is no tooth on it. The first tooth lands on the *next* tick and reads +1. The comb physically cannot start counting on the label.
- **Misconception 2 — counting from the left end (or from 0).** **Pushback:** the comb comes out of any printed number; miss 1 pulls the *nearest* one out for the child. Combing from the far end gives a long comb and the same number — the child sees nearer is shorter.
- **Misconception 3 — every tick is worth ten because the printed numbers go up in tens** (on a 60, 70, 80 line the third tick after 70 is read "100"). **Pushback:** the teeth are the ticks; the bubble reads +1, +2, +3 — never +10. On every-10 lines the comb from 70 reaches 80 after exactly ten teeth; the tenth tooth lands *on* the printed 80 and the bubble reads +10: the comb proves what one tick is worth.

## 4. The stage
**At 704 px (stacked; the line is the hero):**
- **Task line** (≤ 24 px, ≤ 2 lines) — EN read: **"Where is the dot? Pull a comb out of a printed number."** · place: **"Put the dot on {n}."**
- **The line:** a cream rail 640 px long, 8 px thick, centred, top third of the stage. Ticks every 1, 2 px ink: short 18 px; medium 26 px on every 5 when numbers are printed every 10; tall 36 px at printed numbers. Printed numerals 22 px Baloo 2 above the tall ticks. Spacing: 40–60 and every 20-wide window → 32 px per tick; 60–100 → 16 px. The two ends are printed numbers; the line ends in short drawn end-caps, **no arrowheads**.
- **The dot:** coral disc 22 px on its tick, 44 px invisible hit area, a soft pulse ring at rest.
- **The comb** (folded at rest): a 10 px brass hinge under every printed tick. Out, the comb is a 14 px honey strip under the rail with 2 px teeth reaching the rail at every tick it covers; its grip is a 44 × 40 px rounded handle under the printed number. A tip bubble (36 × 28 px, white, 18 px numerals) rides at the far end: "+3" or "−2".
- **Earned tags:** a teal printed-number tag on the dot's tick, same 22 px numerals, a small star corner.
- **Read task:** an answer box 96 × 56 px under the line's middle; keypad 0–9 + ⌫ (keys 52 × 52, two rows of six) below; **Check** 120 × 52 at the right end of the keypad. **Place task:** no keypad; the dot waits in a cream cradle under the line's left end.
- **No words on the apparatus** — numerals, ticks, the comb.

**At 360 px:**
- Line 328 px. 40–60 and 20-wide windows: 16.4 px per tick, one row. **60–100 is drawn in two rows**: 60–80 above, 80–100 below, each 328 px (16.4 px per tick), 80 printed at the end of row 1 and the start of row 2, joined by a thin drawn arc on the right edge ("the line goes on below"). 80 is printed in both label settings, so no comb ever crosses the bend.
- Comb teeth follow the spacing; grip 44 × 40. Keypad full width (keys 52 × 46); Check full width under it. Place task: dragging the dot shows a **loupe** — a 96 px circle above the finger magnifying the ticks ×2.5 — and the dot snaps to the nearest tick.
- At 320: line 296 px (14.8 px per tick), keys 46 × 44. Budget at 320 × 640 for the two-row case: header 56 + task 52 + line block 200 + box 56 + keypad 96 + Check 52 = 512 px — above the fold.

## 5. The hand
- **Pull a comb:** pointerdown on a printed number, its tick or its hinge grabs the grip. Dragging slides the comb out on the side the finger goes; teeth = round(|dx| / spacing), capped at the next printed number on that side (a comb is exactly one label-gap long: 5 or 10 teeth). Each new tooth drops in 40 ms with a click; the bubble updates in the same frame. Release leaves the comb out; a tap on the grip folds it (25 ms per tooth). One comb at a time; grabbing another label folds the first.
- **The comb finds the dot:** when the tip tooth is on the dot's tick, tooth and dot flash white for 300 ms. Nothing is said; the number is still the child's to write.
- **Read:** type up to 3 digits; ⌫ erases; Check. **Place:** drag the dot from the cradle onto the line; on release it snaps to the nearest tick (60 ms) with a soft "plip"; it can be moved again until Check. The comb still works while placing (comb out from 45 to find where 48 lives).
- **Keyboard:** Tab cycles printed numbers; ←/→ pulls the focused comb one tooth on that side; Backspace folds it; digits type; Enter = Check. Place: Tab to the dot, ←/→ moves it one tick.
- **Sound** (bonus): clicks rise a semitone per tooth to the right, fall to the left; TTS reads the bubble where a voice exists.

## 6. The rounds
One round = one window with **two tasks**: first **read** a dot (type its number), then **place** a number (drag the dot). The read dot keeps its earned tag, so the place task can be combed from it. Never a dot on a printed number or an end, never 0, the two numbers differ by ≥ 2. All 48 rounds written out and measured (`work-32/comb.js`):

| level (Window · Printed) | rounds as [read, place] |
|---|---|
| 40–60 · every 5 | [43, 57] [48, 41] [52, 46] [59, 44] [41, 53] [56, 49] [47, 58] [54, 42] |
| 40–60 · every 10 | [43, 57] [48, 52] [56, 44] [41, 59] [53, 47] [58, 42] [46, 54] [51, 49] |
| 60–100 · every 5 | [63, 87] [78, 91] [84, 66] [97, 72] [71, 94] [89, 62] [66, 83] [92, 79] |
| 60–100 · every 10 | [63, 88] [78, 91] [86, 66] [97, 72] [71, 94] [89, 62] [65, 83] [92, 79] |
| any 20 · every 5 | 20–40 [27, 33] · 30–50 [44, 31] · 50–70 [53, 69] · 70–90 [88, 76] · 80–100 [91, 98] · 10–30 [18, 22] · 50–70 [61, 57] · 30–50 [36, 48] |
| any 20 · every 10 | 20–40 [27, 33] · 30–50 [44, 38] · 50–70 [53, 69] · 70–90 [88, 72] · 80–100 [96, 84] · 10–30 [18, 22] · 50–70 [61, 57] · 30–50 [35, 49] |

- **Measured balance (16 dots per level):** "count on is shorter" vs "count back is shorter" = 8/8 (both 40–60 levels), 9/7 (60–100 every 5), 8/7 + one halfway (60–100 every 10), 8/8 and 7/8 + one halfway (any 20) — every level has ≥ 7 dots where counting **back** is the short way (the dossier asked ≥ 3). Position by thirds of the window: 6/5/5 · 5/6/5 · 6/4/6 · 6/4/6 · 4/7/5 · 4/7/5 — no third holds more than 7 of 16. Ones digits 1–9 each appear 1–4 times per level.
- **No neighbour tell:** the place number is never next to the read dot (|a − b| ≥ 2); the only dots on a medium (every-5) tick in every-10 levels are the two declared halfway dots (65, 35).
- **Order:** order-only reshuffle per pass, never the same order twice; inside a round it stays read → place.

## 7. Check, the misses, the success
- **Check with nothing typed / the dot still in its cradle** → bubble "Type the number at the dot." / "Drag the dot onto the line." (no miss).
- **Miss 1 — the comb comes out for them:** the nearest printed number pulses twice, then its comb slides out by itself towards the dot (90 ms per tooth) and stops with its tip on the dot showing "+2" or "−3". Place task: the comb comes out of the printed number nearest the child's *dropped* dot and stops on it, so the bubble shows where the child put it. EN read: **"Start at {label}. Count the teeth to the dot."** · place: **"Your dot is {label} and {k} more. Is that {n}?"** / **"Your dot is {k} before {label}. Is that {n}?"**
- **Miss 2 — every tick gets its number:** between the two printed numbers around the dot (read) or around the target (place), each tick gets a faint 13 px numeral for 4 s; the dot's own numeral (read) is drawn last and brighter. EN: **"Each tick is one more. Read the tick under the dot."** (place: **"Each tick is one more. Find {n}."**)
- A new key, comb pull or drag takes the help away until the next Check.
- **Success (read):** the dot stamps its teal tag onto its tick; EN **"{n} — {label} and {k} more!"** or **"{n} — {k} before {label}!"** (whichever way is shorter). **Success (place):** the dot clicks into the tick, takes its tag, and the end-of-round sweep runs; EN **"{n} is right there!"**

## 8. Settings
1. **Window:** 40 to 60 (default) / 60 to 100 / any 20 numbers — changes the printed numbers and the tick spacing at rest.
2. **Printed numbers:** every 5 (default) / every 10 — changes how many printed numbers and medium ticks show at rest.

## 9. Words (EN source)
- title **"The Tick Comb"**
- instruction (read) **"Where is the dot? Pull a comb out of a printed number."** · (place) **"Put the dot on {n}."**
- hints **"Type the number at the dot."** · **"Drag the dot onto the line."** · **"Start at {label}. Count the teeth to the dot."** · **"Your dot is {label} and {k} more. Is that {n}?"** · **"Your dot is {k} before {label}. Is that {n}?"** · **"Each tick is one more. Read the tick under the dot."** · **"Each tick is one more. Find {n}."**
- celebrations **"{n} — {label} and {k} more!"** · **"{n} — {k} before {label}!"** · **"{n} is right there!"**
- settings **"Window"**: "40 to 60" / "60 to 100" / "any 20 numbers" · **"Printed numbers"**: "every 5" / "every 10"
- aria: line `"number line from {lo} to {hi}, printed numbers {list}, a dot on one tick"`; comb `"comb from {label}, {k} teeth to the right"`.
- **Locale traps:** (a) **The line's name** differs (de *Zahlenstrahl* is a ray from 0, *Zahlengerade* a line; fr *droite graduée*; nl *getallenlijn*; sv *tallinje*; fi *lukusuora*) — the instruction never names it. (b) **"printed number"** is the hard phrase: the textbook word for a labelled tick (de *die Zahl, die dasteht*; fr *un nombre écrit*; sv *ett utskrivet tal*; fi *merkitty luku*) — native authors choose, never a calque of "printed". (c) **"before {label}"** must be the counting-back register (de *{k} vor {label}*; fr *{k} avant {label}*; es *{k} antes de {label}*; fi needs case: *{k} ennen lukua {label}* — author the frame whole). (d) **"comb"**: fi *kampa*, sv *kam*, da/no *kam*, nl *kam*, de *Kamm* — fine; the verb "pull out" must be native. (e) Numerals only, no separators (≤ 100). (f) The bubble's minus is U+2212, never a hyphen.

## 10. Sound off, access, phones
- Sound off: teeth dropping, the tip bubble, the flash when a tooth finds the dot, the comb sliding out by itself, faint numerals — all visible.
- Keyboard path as §5; focus ring 3 px teal on printed numbers, the dot and keys; aria-live polite on the bubble.
- Taps: grips 44 × 40, dot hit 44, keys ≥ 46 × 44. No library pictures (pure apparatus — the picture floors do not apply).
- Check above the 360 × 740 and 320 × 640 folds, including the two-row 60–100 layout (§4 budget).

## 11. Distinct from
- **Row 157 The Spring and the Landing Pad (designed, also 2.MD.B.6):** Hopper's spring loaded with tens and ones, a pad floated where you predict he lands — sums and differences as jumps on a line. Here nothing jumps: the line is read and filled tick by tick from the nearest printed number. **cold-line (tool):** a scale through zero and the distance between two marks. **landing-strip (tool):** nearest post and opening a ten — rounding, no tick counting. **number-line / open-number-line (tools):** jumps the child draws freely. Here every tick is 1 and the comb's teeth *are* the ticks.
- **New 252 The Washing Line:** equal bags hung end to end, a wrong tag runs to its home peg — skip counting with every step labelled. Here labels are sparse and the child counts single ticks from a landmark.
- **New 251 Chart Patches** (hundreds chart), **#3 Peek Path, #5 Fading Line** (counting on by ones, no sparse labels) — different skill surfaces.
- **Batch siblings:** 141 (skip counting on split-flap pads), 271 (what one mark on a scale is *worth*, found with a step chip). Here every mark is worth 1; the skill is counting on or back from a landmark.

## 12. Build plan
- **Core state:** `{ lo, hi, label, read:{v, typed, done}, place:{v, at, done}, comb:{from, dir, teeth}|null, earned:[v] }`.
- **Functions:** `labels(lo, hi, label)`, `isLabel(v)`, `pullComb(from, dir, teeth)` (clamped to the label gap), `combTip()` = from ± teeth, `nearestLabel(v)` (smaller distance; tie → lower), `typeDigit/erase`, `dropDot(x)` → snapped tick, `check()` → `{ok}` | `{miss, level}`.
- **Gate's own truth (`verify-tick-comb-core.js`, independent arithmetic):** over all 48 rounds — no dot on a label or end; |a − b| ≥ 2; ≥ 7 count-back-shorter dots per level; ≤ 7 dots in any third; comb never longer than the label gap; tip of k teeth right of L = L + k, left = L − k; on every-10 lines the 10th tooth lands on the next printed number; earned tag = read value; the phone 60–100 layout splits at 80 and both rows print 80.
- **Mutations (each killed):** first tooth on the printed tick · bubble shows teeth × 10 on every-10 lines · comb not clamped at the next printed number · `nearestLabel` returns the window's left end · a dot on a printed number · no earned tag after a right read · 60–100 on phones squeezed to one 8 px row · place snaps to the nearest label instead of the nearest tick · miss-1 comb starts at the window end · same order twice · minus drawn as a hyphen.
- **Pictures:** none. **Risks:** 16.4 px phone spacing (loupe + snap carry it); native check of "printed number" and "before". Nothing blocked.

## 13. The four questions
1. **Choose it again?** Yes — the clicking comb that folds out of a number and back is a fidget toy, and the child's own numbers become labels on the line.
2. **Teacher on the board?** Yes — it is what a teacher does with a finger ("start at 40, count the ticks"), except the comb cannot count the printed tick as one and shows +10 only when it reaches the next printed number.
3. **Parent trust?** Calm, numerals only, no timer; works on a phone with a loupe.
4. **Invention:** a comb whose teeth fit the ticks folds out of any printed number — reading an unlabelled tick is pulling the nearest comb out and reading its tip.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 4→5 · completeness 5→5 · correctness 5→5 · distinctness 4→5 · reality 5→5
What changed:
- Re-solved all 48 rounds with my own script (`work-c32/comb.js`): no dot on a printed number, a window end or (every-10 levels) a medium tick except the two declared halfway dots 65 and 35; |read − place| ≥ 2 everywhere; count-back-shorter dots 8 · 8 · 7 · 7 (+1 tie) · 8 · 8 (+1 tie) of 16 per level; thirds 6/5/5 · 5/6/5 · 6/4/6 · 6/4/6 · 4/7/5 · 4/7/5; ones digits spread — every claim in §6 holds.
- Free play widened: earned tags can be combed too, and the every-10 medium tick is explained as the place where a child's own "half way" reasoning is proved by the comb (the 5th tooth reads +5 exactly there) — the instrument rewards the smarter strategy instead of ignoring it.
- Distinctness spelled out against the one design sharing its standard (Row 157 The Spring and the Landing Pad, 2.MD.B.6 — jumps and sums) and the cold-line tool.
