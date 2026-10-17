# New 208 — The Marble Stairs (1.MD.A.1)

## 0. Identity
- id `size-risers.play.1-md-a-1` · grade K (stretch standard CCSS 1.MD.A.1, ordered as the K worksheets K-033/034/036 do) · Measurement & Data · key `size-risers` (files `size-risers-core.js`, `size-risers-activity.js`, `size-risers-activity.html`, `size-risers-activities.json`). The key keeps its planned name; the instrument is renamed from "The Class Photo Risers" — the class photo survives as the end-of-round show.
- worksheets covered: K-033 Small, Medium, Big (3) · K-034 Smallest to Biggest (5) · K-036 Short to Tall (4).
- new instrument (no old activity). From the coverage sketch it keeps one floor line, ink-box-measured sizes ≥ 18 % apart, the swap-the-pair repair and the photo; it replaces the camera "check" with a marble that tests every step physically.

## 1. The pitch
"Line the pictures up from smallest to biggest, then let the marble go: it hops down the tops step by step into the cup — and wherever a step goes UP instead of down, it gets stuck."

## 2. Why a child will want it again
- A marble on a staircase is a toy every child understands: it hops from the biggest picture's top down to the next, "tik, tik, tik", and drops into the cup with a "plink".
- When it gets stuck, it is funny, not shaming: the marble bumps against a top that is too high, wobbles, and the two pictures lean towards each other as if to say "swap us". One tap on the pair and they swap.
- The shelf behaves like a real shelf: drop a picture between two others and they shuffle apart to make room — arranging feels like tidying books.
- Success earns the class photo: a white flash, the row freezes into a little polaroid that slides up into an album strip — after a few rounds the album is a row of tidy staircases.
- The "different things" rounds have a joke in them: the fat pumpkin LOOKS biggest, but the thin candle is taller — the marble does not care how wide anything is.
- Free play: once the round is done the child can mix the pictures into a "mountain" and send the marble again to watch where it stops.
- Order flips with the setting — "biggest first" turns the staircase the other way and moves the marble and cup.

## 3. The skill and the misconception
- Skill (1.MD.A.1 at K level; K-033, K-034, K-036): order three to five objects by length/height (or size) by comparing them directly, smallest (shortest) first or biggest (tallest) first.
- Misconceptions: (a) placing only the two extremes correctly and dropping the middle ones anywhere; (b) comparing only some neighbours; (c) judging height by WIDTH (the fat thing looks tallest); (d) judging from the bottom of the picture box rather than from a common floor (library pictures have different whitespace).
- Push-back by physics: the marble tests EVERY neighbouring pair, in order, from the big end — a middle mistake stops it exactly at that pair, with nothing said. It rides on the TOPS only, so width is irrelevant to it: in the "different things" rounds the widest picture is never the tallest (gated), and a child who orders by width gets the marble stuck. All pictures stand on one floor line (ink-box bottoms, measured), so tops are honestly comparable. The two lean together at the stuck step: the repair is shown by the apparatus.

## 4. The stage
At 704 (stacked, stage ≈ 660 × 480):
- **The shelf**: a drawn plinth bar 640 × 14 (cream, 3 px ink) — the floor line. Placed pictures stand on it shoulder to shoulder, 12 px apart, the row centred, each with its ink bottom exactly on the line. While places are free, n small dashed **place dots** (12 px) sit on the shelf front, one per picture still to come (so the child sees how many go there); they disappear as pictures arrive.
- **The marble post** at the big end (right end in "smallest first"; left in "biggest first"): a slim drawn post with the **marble** (a 26 px glass-gold circle with a white highlight) resting on top; the post grows to just above the tallest top when the marble is launched.
- **The cup** at the small end: a drawn cup 44 × 36 on the floor line beyond the row.
- **The direction arrow**: a faint dashed staircase line above the shelf stepping down from the post towards the cup — apparatus, no words.
- **The tray** below the shelf: the n pictures in the round's tray order, standing on a tray line, 12 px apart.
- **Roll button** (replaces Check) under the tray, right: 56 px round with a marble icon; enabled when the tray is empty.
- **Album strip**: top-right, sockets 64 × 48 for the round's photos (this visit only).
- **Picture size (one rule for every round and width)**: the round's tallest picture is drawn B px tall and every other picture at its round factor × B, where B = min(Bmax, (W − (n−1)·g) / Σ(factorᵢ × aspectᵢ)) — aspect = ink-box width ÷ height, measured from `scripts/worksheet-gen/data/art-extents.json`; Bmax 220 (704) / 160 (360); W 640 / 320; g 12 / 8. So the row always fits the shelf AND the tray without overlap. Every round in §6 is chosen so the SMALLEST picture's long side is ≥ 96 px at 704 and ≥ 64 px at 360 and 320 (gated per round per width — a round that fails is a gate failure, not a smaller picture).
At 360 (stage ≈ 336 wide): shelf 320; Bmax 160; tray identical below (pictures at the same sizes, since size is the content); Roll 56 px; album strip collapses into a 3-socket row above the shelf. Stage ≈ 170 + 24 + 170 + 56 = 420 px → above the 360 × 740 and 320 × 640 folds (at 320: shelf 296, W 296).

Library pictures (verified in `mini tools/pictures/*.json`, seen on contact sheets `des/contact/b5-tall.png`, `b5c-misc.png`, `b5c-misc2.png`, `classroom.png`, `vegetables.png`, 2026-10-17): upright — zoo-animals/giraffe, christmas/candle, beach/lighthouse, flowers/sunflower, kitchen-tools/bottle, tools/ladder, tree/coconut (a palm), vegetables/corn, classroom/crayon (an upright stub), classroom/glue; round — fruits/apple, toys/ball, farm-animals/pig, bakery/cupcake; wide-and-low (different-things rounds only) — vegetables/pumpkin, toys/train, around-the-house/toolbox, farm-animals/pig. Contact-sheet rulings: space/rocket and vegetables/carrot are drawn DIAGONALLY (their "height" is a tilted nose — not used); round objects are too wide for four or five in a row on a phone at ≥ 64 px, so they appear only in three-picture rounds. Shelf, place dots, post, marble, cup, arrow and album are drawn apparatus. No words on the apparatus.

Task line (EN): "Line them up from smallest to biggest. Then roll the marble!" · "Line them up from shortest to tallest. Then roll the marble!" · biggest-first: "Line them up from biggest to smallest. Then roll the marble!" · "Line them up from tallest to shortest. Then roll the marble!"

## 5. The hand
- **Drag a picture from the tray onto the shelf** → it lifts (80 ms); on release it slides into the row at the place it was dropped — between the two pictures either side of the drop point (or at either end) — and the others shuffle apart to make room (160 ms, soft "tup", bounce 2 px). Tap-tap alternative: tap a tray picture, then tap a gap in the row (gaps between placed pictures glow as 24 px targets while a picture is lifted; the end gaps too).
- **Drag a placed picture** to another gap → it moves there (insertion); drag it back onto the tray → it leaves the row.
- **Roll** (tray empty) → the post rises (200 ms) to just above the tallest top, the marble rolls off onto the top of the picture at the big end and hops along: for each next picture, if its top is LOWER, the marble hops down onto it (a 260 ms arc, "tik" whose pitch steps down a note each hop); after the last picture it drops into the cup ("plink", 1.4 kHz). If the next top is HIGHER (or equal within 2 px — sizes are ≥ 18 % apart so this cannot happen by data, but the code handles it), the marble bumps (an 80 ms knock "tonk", 200 Hz), wobbles twice and rests against it: **stuck**.
- **Stuck repair**: the two pictures at the stuck step lean towards each other (4°, 300 ms, twice). Tapping either of the leaning pair swaps them (240 ms crossover). Any drag also works. The marble returns to the post when anything moves.
- Keyboard: Tab cycles tray pictures, then the gaps of the row; Enter picks / places; on a placed picture ArrowLeft/ArrowRight moves it one place; Space on the Roll button rolls; on a stuck pair Enter swaps.
- Free play after success: all pictures stay draggable; the marble can be rolled again on any arrangement (nothing graded).
- Optional TTS: none needed; the speaker reads the task line.

## 6. The rounds
One round = n pictures. **One-kind rounds**: n uniform scales of ONE picture (H = height wording, S = size wording; uniform scaling makes "bigger" and "taller" the same fact). **Different-things rounds** (M): n DIFFERENT pictures, each drawn so its ink height equals factor × B — height wording only — chosen so the widest picture is never the tallest and ordering by width gives a wrong row (gated from art-extents). Factor sets (each ≥ 18 % above the next smaller): n = 3 → 1.00 / 0.78 / 0.60 · n = 4 → 1.00 / 0.82 / 0.66 / 0.54 · n = 5 → 1.00 / 0.84 / 0.70 / 0.58 / 0.48. Tray order is written as size ranks (1 = smallest … n = biggest), left to right.

**Pictures: 3** (K-033) — 12 rounds
| # | picture(s) (smallest → biggest for M) | kind | tray order | biggest at |
|---|---|---|---|---|
| 1 | zoo-animals/giraffe | H | 3 1 2 | 1 |
| 2 | fruits/apple | S | 2 1 3 | 3 |
| 3 | christmas/candle | H | 1 3 2 | 2 |
| 4 | toys/ball | S | 2 3 1 | 2 |
| 5 | beach/lighthouse | H | 3 1 2 | 1 |
| 6 | farm-animals/pig | S | 2 1 3 | 3 |
| 7 | flowers/sunflower | H | 1 3 2 | 2 |
| 8 | bakery/cupcake | S | 2 3 1 | 2 |
| 9 | kitchen-tools/bottle | H | 3 1 2 | 1 |
| M1 | vegetables/pumpkin · kitchen-tools/bottle · christmas/candle | M | 3 1 2 | 1 |
| M2 | toys/train · flowers/sunflower · beach/lighthouse | M | 2 3 1 | 2 |
| M3 | farm-animals/pig · tools/ladder · zoo-animals/giraffe | M | 1 3 2 | 2 |

**Pictures: 4** (K-036 Short to Tall — heights only) — 12 rounds
| # | picture(s) | kind | tray order | biggest at |
|---|---|---|---|---|
| 1 | tools/ladder | H | 2 4 1 3 | 2 |
| 2 | christmas/candle | H | 3 1 4 2 | 3 |
| 3 | tree/coconut | H | 4 1 3 2 | 1 |
| 4 | kitchen-tools/bottle | H | 1 4 2 3 | 2 |
| 5 | zoo-animals/giraffe | H | 2 3 4 1 | 3 |
| 6 | vegetables/corn | H | 3 4 1 2 | 2 |
| 7 | beach/lighthouse | H | 1 3 4 2 | 3 |
| 8 | flowers/sunflower | H | 4 2 1 3 | 1 |
| 9 | classroom/crayon | H | 2 1 3 4 | 4 |
| M1 | around-the-house/toolbox · vegetables/pumpkin · kitchen-tools/bottle · beach/lighthouse | M | 3 1 4 2 | 3 |
| M2 | toys/train · christmas/candle · flowers/sunflower · zoo-animals/giraffe | M | 2 4 1 3 | 2 |
| M3 | farm-animals/pig · kitchen-tools/bottle · tools/ladder · beach/lighthouse | M | 4 2 3 1 | 1 |

**Pictures: 5** (K-034 Smallest to Biggest) — 11 rounds; one-kind pictures here are slim upright pictures (ink aspect ≤ 0.60), the only ones that fit five in a phone row at ≥ 64 px
| # | picture(s) | kind | tray order | biggest at |
|---|---|---|---|---|
| 1 | kitchen-tools/bottle | S | 2 5 3 1 4 | 2 |
| 2 | beach/lighthouse | H | 4 1 3 5 2 | 4 |
| 3 | christmas/candle | S | 5 2 4 1 3 | 1 |
| 4 | flowers/sunflower | H | 3 1 5 2 4 | 3 |
| 5 | vegetables/corn | S | 1 4 2 5 3 | 4 |
| 6 | tools/ladder | H | 3 5 1 4 2 | 2 |
| 7 | classroom/crayon | S | 2 4 5 3 1 | 3 |
| 8 | classroom/glue | S | 5 3 1 2 4 | 1 |
| 9 | christmas/candle | H | 1 3 4 2 5 | 5 |
| M1 | around-the-house/toolbox · christmas/candle · kitchen-tools/bottle · tools/ladder · beach/lighthouse | M | 3 5 1 4 2 | 2 |
| M2 | farm-animals/pig · vegetables/corn · classroom/crayon · flowers/sunflower · tools/ladder | M | 2 4 1 5 3 | 4 |

Rules (all gated):
- No tray is already sorted or reverse-sorted. The biggest sits in every tray position at least once per level (n = 3: positions 1/2/3 = 4/6/2; n = 4: 3/4/4/1; n = 5: 2/3/2/3/1).
- Pictures already in their final place: for n = 4 and 5, at most 4 rounds per level (in either direction) start with the biggest or the smallest already in its final place (n = 4: 3 smallest-first / 4 biggest-first of 12; n = 5: 2 / 3 of 11). With three pictures every legal tray (132, 213, 231, 312) has exactly one picture in place in one of the two directions — that is arithmetic, not a tell; the gate asserts only "never sorted, never reversed" for n = 3.
- Every M round: widest (ink width × factor) ≠ tallest, and the width order ≠ the height order.
- Every round, every width: smallest long side ≥ 96 px at 704, ≥ 64 px at 360 and 320, nothing overlaps on shelf or tray (from the §4 formula).
- **Answer position**: the right ARRANGEMENT is fixed by the sizes; what must not be guessable is the tray (rules above), so dragging the tray across unchanged never works.
- **Order**: order-only reshuffle per pass (`nextTask`); the tray order of each round reverses on alternate passes (still never sorted, never reversed).

## 7. Check, the misses, the success
The Roll button is the check.
- Roll with pictures still in the tray → the button is disabled; tapping it makes the place dots pulse; bubble "Put every picture on the shelf first." (no miss)
- **miss 1** (marble stuck): the stuck pair leans together. Bubble "The marble can't climb up here. Swap these two?"
- **miss 2** (stuck again in the same round): faint horizontal guide lines appear behind the row at every picture's top, so the steps that go up are plain to see; bubble "Look at the lines: every step must go down."
- a new move takes the guide lines away until the next stuck roll.
- **Success**: the marble plinks into the cup; a soft white flash (120 ms) — the row becomes a polaroid (the shelf area scaled into a 64 × 48 card with a white border) that slides up into the album strip (400 ms). Bubble: "Yes — from the smallest to the biggest!" · "Yes — from the shortest to the tallest!" · "Yes — from the biggest to the smallest!" · "Yes — from the tallest to the shortest!" — and after every M (different things) round one more line, stating the fact on the screen: "The widest one was not the tallest!"

## 8. Settings
1. **Pictures**: 3 / 4 / 5 — the number of place dots on the shelf and pictures in the tray change at rest.
2. **Order**: Smallest first / Biggest first — at rest the marble post, the cup and the dashed staircase swap ends.

## 9. Words (EN source)
- title "The Marble Stairs"
- instruction "Put the pictures in order on the shelf, then roll the marble down the steps."
- prompts: "Line them up from smallest to biggest. Then roll the marble!" · "Line them up from shortest to tallest. Then roll the marble!" · "Line them up from biggest to smallest. Then roll the marble!" · "Line them up from tallest to shortest. Then roll the marble!"
- Roll button aria "Roll the marble"
- hints: "Put every picture on the shelf first." · "The marble can't climb up here. Swap these two?" · "Look at the lines: every step must go down."
- celebrations: "Yes — from the smallest to the biggest!" · "Yes — from the shortest to the tallest!" · "Yes — from the biggest to the smallest!" · "Yes — from the tallest to the shortest!" · "The widest one was not the tallest!"
- settings: "Pictures" — "3" / "4" / "5" · "Order" — "Smallest first" / "Biggest first"
- aria: place "Place {i}, {empty|noun}"; marble "Marble"; album "Photos".

Locale traps:
- "short → tall" for THINGS: de "vom kleinsten bis zum größten" / "vom niedrigsten zum höchsten" (the reviewer picks per noun kind; "größten" is safest for upright things), fr "du plus petit au plus grand" (works for both height and size — fr may use one pair for H and S), es "del más pequeño al más grande" / "del más bajo al más alto", pt "do menor para o maior" / "do mais baixo para o mais alto", it "dal più piccolo al più grande" / "dal più basso al più alto", nl "van klein naar groot" / "van laag naar hoog" (NOT "kort naar lang" for a giraffe), sv "från minst till störst" / "från lägst till högst", da "fra mindst til størst" / "fra lavest til højest", no "fra minst til størst" / "fra lavest til høyest", fi "pienimmästä suurimpaan" / "matalimmasta korkeimpaan". Two keys per direction (H, S) let each locale collapse them if natural.
- "widest … tallest" (the M-round line): de "Das breiteste war nicht das höchste!", fr "Le plus large n'était pas le plus haut !", fi "Levein ei ollut korkein!" — superlatives without a noun, native-checked.
- Superlatives in "from the smallest to the biggest" agree with an implied noun in Romance languages — the frames are written without a noun (masculine default is the natural neutral there); the native reviewer confirms.
- "roll the marble": marble = "Murmel" de, "bille" fr, "canica" es-MX, "bolinha de gude" pt, "biglia" it, "knikker" nl, "kula" sv, "kugle/glaskugle" da, "klinkekule" no, "kuula/marmorikuula" fi.
- Numbers 3/4/5 in settings are numerals (no number words).

## 10. Sound off, access, phones
- Silent-legible: the marble's path, the stuck bump, the leaning pair, the guide lines, the photo flash.
- Keyboard path in §5; aria-live: "Marble stuck between place 2 and place 3" / "Marble in the cup".
- Taps: tray pictures' tap boxes are at least 64 × 64 even when the picture is slim (the box extends invisibly around it); row gaps light up as 24 px wide × full-height targets while dragging, and the tap-tap path places into the nearest gap; Roll 56 px.
- Pictures: the smallest long side is ≥ 96 px at 704 and ≥ 64 px at 360/320 in every round (§4 formula, gated); size IS the content, so the slim pictures are narrower than 64 on their short side — their tap box is not.
- Phone: shelf above tray, Roll under the tray — above both folds.
- prefers-reduced-motion: the marble jumps from top to top without arcs; the stuck pair outlines instead of leaning.

## 11. Distinct from
- #22 The Nesting Pots: orders NUMERALS by nesting; here physical sizes on a floor with a marble test.
- #34 The Drop-Down Stands: choose the tallest/longest after aligning starts; here put ALL in order, and every neighbour pair is tested.
- #32 The Measuring Stations: naming attributes.
- `pattern-bench` / `arrow-strip` tools: nothing ordered by size; no marble mechanic among the tools (checked `cov/tools.txt`).
- Registry: no built activity uses a marble run or a staircase test.

## 12. Build plan
- **Core state**: `{round, n, direction, tray:[ids], row:[ids], misses, stuckAt}`; functions `heightOf(id)` (factor × B from the layout), `widthOf(id)` (aspect × height), `layout(width)` → B and every x position (the §4 formula), `insert(id, gapIndex)`, `remove(id)`, `roll()` → `{ok, stuckAt}` (walk from the big end; stuck at the first rise), `swapPair(i)`, `nextTask` (reverse tray on alternate passes).
- **Gate's own ground truth** (`verify-size-risers-core.js`): re-derives the sorted order from the factor literals and the direction; asserts neighbour ratios ≥ 1.19 after ink-box measurement (from art-extents, not the core); trays never sorted or reversed; the biggest's tray positions as listed; the in-place counts for n = 4 / 5; every M round's widest ≠ tallest and width order ≠ height order; for every round at 320 / 360 / 704 the smallest long side ≥ 64 / 64 / 96 px and no two pictures overlap on shelf or tray; the roll walk equals an independent "first adjacent rise" scan for 10 000 random arrangements; a correct arrangement always reaches the cup; every picture's ink bottom sits on the floor line within 1 px; no space/rocket, no vegetables/carrot, no round object in an n ≥ 4 one-kind round.
- **Mutations**: roll checks only the two ends · roll ignores the last pair · tops measured from the image box (whitespace) · roll compares widths · a tray already sorted · an M round where the widest is the tallest · layout ignores aspect (pictures overlap at 360) · direction setting not flipping the post · swapPair swaps the wrong pair · insertion drops the displaced picture · equal-height pair passes · sizes 10 % apart · marble starts at the small end.
- **Local test**: real drags tray → shelf gaps, re-insertion, drag back to tray, tap-tap gaps, roll stuck / roll success, pair swap, both settings × 3 counts, every round, 7 widths × 11 locales; asserts the marble's resting coordinates and zero picture overlap.
- **Contact sheet at build**: each one-kind noun at its smallest factor on one floor line (no floating feet, recognizable at 0.48), and each M round side by side at its heights (the widest visibly not the tallest).
- **Risks**: art-extents must hold an aspect for every noun used (verify before building; classroom/glue and vegetables/corn were not in an earlier size program).
- Nothing BLOCKED.

## 13. The four questions
1. Yes — a marble that hops down a staircase you built, a funny stuck bump, a fat pumpkin that turns out to be the shortest, and a photo album of finished rows.
2. Yes — every neighbour comparison is tested (the "middle ones anywhere" error is caught exactly where it is), width cannot fool the marble, on one honest floor line, covering three worksheets.
3. Yes — library pictures, drawn shelf and marble, no numbers, no words on the stage, nothing scored.
4. Line the pictures up, then let a marble hop down their tops — it reaches the cup only if every step goes down.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 4→5 · completeness 3→5 · correctness 3→5 · distinctness 5→5 · reality 3→5
What changed:
- The layout could not be built: five round pictures (apple, pig, pumpkin…) at the stated sizes are ~720 px wide on a 600 px stand at 704 and on fixed 64 px phone spots a 134 px apple overlapped both neighbours; the smallest of five reached 58 px on phones (< 64). Now one sizing rule (B from the measured ink aspects) fits every row on shelf and tray, every round is gated for the smallest picture ≥ 96 / 64 px and zero overlap, round objects appear only in three-picture rounds, and the five-picture level uses slim upright pictures. The fixed "spots" became a shelf with insertion (pictures shuffle apart to make room), which also fits different widths.
- The dossier's second misconception — judging by WIDTH — had no round that could catch it (uniformly scaled copies of one picture make width and height agree). Added 3 "different things" rounds at n = 3 and n = 4 and 2 at n = 5 (pumpkin / bottle / candle, train / sunflower / lighthouse, toolbox…, pig…), gated so the widest is never the tallest — the true 1.MD.A.1 case (order three different objects) and a joke the marble tells.
- Contact sheet: space/rocket and vegetables/carrot are drawn diagonally — removed from height rounds (tree/coconut, vegetables/corn, classroom/crayon, classroom/glue instead).
- The "never in final position more than 3 in 9" rule is impossible with three pictures (every legal tray of three has one picture in place in one direction) — restated honestly; n = 4/5 counts written out.
