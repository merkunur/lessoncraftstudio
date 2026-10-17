# Row 32 — The Measuring Stations (K.MD.A.1)

## 0. Identity
- id `choice-board.describe-attribute.k-md-a-1` (KEPT; slugs, titles, intros frozen in all 11 locales) · grade K · CCSS K.MD.A.1 · Measurement & Data · own files `measure-stations-core.js`, `measure-stations-activity.js`, `measure-stations-activity.html`, `measure-stations-activities.json` (the row leaves `choice-board-activities.json`).
- worksheets covered: K-032 Big and Small · K-040 Big Ones Only · K-079 Big Shapes, Small Shapes (big/small classification). K-035 Tall and Short and K-037 Long and Short are covered by #34 (direct comparison); this row covers what "long", "tall", "heavy" and "big" MEAN.
- old activity: one picture, tap the word long / tall / heavy. **Kept**: the K.MD.A.1 idea (one object, name the attribute), the object pool pencil, giraffe, rock, ruler, pumpkin, carrot, cucumber, sunflower. **Dropped**: crayon and marker as "long" (the library crayon is a short stub — calling it long teaches nonsense), the word buttons.

## 1. The pitch
"Long, tall and heavy are three different ways to measure — so the child finds out by putting the thing on the right measuring station: lay it on the track, stand it at the post, or hang it on the spring."

## 2. Why a child will want it again
- Three measuring machines, each with its own satisfying physics: the **track** — a slider zips from the end-stop along the object and leaves a bright bar; the **post** — a cap slides down and clunks onto the top; the **spring** — the pan drops, the spring stretches and bobs ("boing") before it settles.
- The comic, kind surprise: put the giraffe on the track and it gently tips over and lies down along it — the track measures how LONG it is lying down, which is not what was asked. Children love it and remember why "tall" is about standing up.
- After a "two ways" round, a little measure card drops into an album strip with the object's picture and two badges (e.g. ↔ long · ⚖ light) — a collection that grows.
- Size window rounds have their own toy: a square window frame glides over each picture; big ones poke out of all four sides with a golden glow, small ones rattle loose inside.
- Free play: between rounds any object can go to any station — weigh the lighthouse, lay the sunflower down — just to watch.

## 3. The skill and the misconception
- Skill (K.MD.A.1): describe measurable attributes of objects — length, height, weight — and describe several attributes of one object (the carrot is long AND light). Worksheets K-032/K-040/K-079: tell big from small, find all the big ones (pictures and shapes).
- Misconceptions: (a) "long" and "tall" are the same word for "big" (orientation is invisible to the child); (b) "heavy" means "big" (a kite is big but light); (c) a size word is judged by picture position or by a single dimension.
- Push-back by the material: every station measures ONE attribute and shows it with its own bar direction and icon (↔ horizontal bar, ↕ vertical bar, ⚖ spring stretch). A wrong station still measures — honestly — but it measures the wrong thing, and its icon flag stands next to the question's icon, not matching. The giraffe lying down on the track is the physics of "long is end to end lying down; tall is bottom to top standing up". The spring shows a big kite barely stretching it. In size rounds the window, not a message, proves big (pokes out) and small (fits with room).

## 4. The stage
**Station mode** at 704 (split layout ≈ 660 × 480):
- **Question card** top-left: 110 × 110 cream card, teal outline; a drawn icon 64 px: ↔ (long: two-headed horizontal arrow over a floor line), ↕ (tall: two-headed vertical arrow standing on a floor line), or a downward weight arrow under a hook (heavy). No words on it.
- **The object** top-centre on a drawn round plinth (170 × 18): library picture fitted by ink box into 160 × 160.
- **Album strip** top-right (two-ways rounds only): 3 card sockets 56 × 70.
- **The three stations** in a row along the bottom, each a 210 × 250 drawn bay (cream, 3 px teal outline, 14 radius), gap 15:
  1. **Track** — a floor rail 194 px with an end-stop block at its left; the object is laid along it (rotated so its long axis is horizontal — angle precomputed per noun, §12), scaled to fit 180 px; the slider runs from the end-stop to the object's far end and leaves a coral bar under it.
  2. **Post** — a vertical post 214 px with a base plate; the object stands on the plate in its natural upright orientation, scaled to fit 190 px tall; the cap slides down onto its top; a teal bar fills the post from base to cap.
  3. **Spring** — a drawn coil hanging from a top bar, a pan under it; the object sits in the pan (fit 110 px); the spring stretches by the object's weight class (light 14 px, heavy 62 px) with a 2-bob settle; a pointer moves down a short scale strip beside it whose lower third is tinted gold.
- Station icons ↔ ↕ ⚖ (36 px) sit on each bay's top edge — apparatus symbols, not words.

At 360 (stacked ≈ 336 wide): question card 72 + object 120 in one row (the album strip collapses into a 3-socket row under it); stations in one row of three bays 104 × 160 (gap 12): track 96 px rail (object ≤ 88 px laid), post 140 px (object ≤ 120 px), pan object 64 px. Stage height ≈ 132 + 10 + 160 = 302 px → above the fold at 360 × 740 and 320 × 640 (at 320: bays 96 × 150).

**Size-window mode** at 704: a single row of picture cards on a shelf line (2 cards: 180 px pictures; 5–6 cards: 104 px pictures, the small ones at 0.56 of the big size, all standing on one floor line); the **size window** (a drawn square frame, 4 px teal, side = 0.80 × big ink side) waits at the left end. Check under the row. At 360: 2 cards at 132 px; rows of 5–6 in 2 lines of 3, big 88 px / small 50 px (tap cards 88 px wide regardless of picture size → taps ≥ 44 even for small pictures).

Library pictures (all verified in `mini tools/pictures/<theme>.json`, contact sheets 2026-10-17): classroom/pencil, classroom/ruler, vegetables/carrot, vegetables/cucumber, bakery/baguette, toys/train (long) · zoo-animals/giraffe, flowers/sunflower, beach/lighthouse, tools/ladder, space/rocket, kitchen-tools/bottle (tall) · camping/rock, vegetables/pumpkin, vegetables/cabbage, around-the-house/toolbox (heavy) · toys/kite (big but light) · size rounds: toys/ball, fruits/apple, farm-animals/pig, bakery/cupcake, toys/kite, vegetables/pumpkin. Contact sheet note: pencil, ruler and marker are drawn diagonally — they are laid flat by the per-noun angle; the crayon is a short upright stub (dropped); space/rocket is drawn diagonally too, so it carries a per-noun stand angle that turns it upright on the post; fruits/watermelon is a SLICE (not used as heavy — a slice is not a heavy thing); toys/balloon is a small balloon on a string (not big-looking — the kite carries the big-but-light lesson). Shapes for K-079 are drawn SVG (circle, square, triangle, star, hexagon) in one fill (#9ED9CF).

Task line (EN): "How long? Find out!" · "How tall? Find out!" · "How heavy? Find out!" · size: "Tap the big one." / "Tap all the big ones." (two-ways rounds show the first question, then the second).

## 5. The hand
- **Drag the object** from the plinth (lift 80 ms) and **drop it on a station bay** (any point inside the bay). Tap-tap alternative: tap the object (ringed), tap a bay.
  - Track: the object rotates to lie flat (220 ms; the giraffe and lighthouse visibly tip over on their side), settles against the end-stop; the slider zips to its far end (420 ms, rising "zzip" 400→900 Hz) leaving the coral bar.
  - Post: the object stands on the plate; the cap slides down to its top (380 ms, ease-out, "clunk" 180 Hz); the teal bar fills the post.
  - Spring: the object drops into the pan; the spring stretches to its weight class with 2 damped bobs (600 ms, "boing" 300→200 Hz); the pointer follows.
  - Then the result (§7) and the object glides back to the plinth (300 ms), the station keeps its bar faintly (30 %) until the next drop so the child can compare.
- **Size mode**: tap a card → teal ring (tap again → ring off). Check sends the window gliding card to card (240 ms per card, pausing 300 ms on each).
- Free play: after a round's success, every station accepts any object of the round's pool (a small tray of 3 more objects slides in under the plinth); nothing is graded.
- Optional TTS: tapping the question card speaks "How long?" etc.; tapping the object speaks its noun.

## 6. The rounds
**Measure — one way** (K.MD.A.1). One object, one question; the right bay is the only one whose attribute matches.
| # | object | question | weight class | track/post fit |
|---|---|---|---|---|
| 1 | classroom/pencil | long | light | laid 180 / stood 26 |
| 2 | zoo-animals/giraffe | tall | heavy | laid 150 / stood 190 |
| 3 | camping/rock | heavy | heavy | laid 120 / stood 80 |
| 4 | vegetables/carrot | long | light | laid 180 / stood 40 |
| 5 | beach/lighthouse | tall | heavy | laid 180 / stood 190 |
| 6 | vegetables/pumpkin | heavy | heavy | laid 130 / stood 100 |
| 7 | toys/train | long | light | laid 180 / stood 90 |
| 8 | flowers/sunflower | tall | light | laid 170 / stood 190 |
| 9 | vegetables/cabbage | heavy | heavy | laid 130 / stood 120 |
Spare pool (used by reshuffle variety and free play): classroom/ruler long · vegetables/cucumber long · bakery/baguette long · tools/ladder tall · space/rocket tall · kitchen-tools/bottle tall · around-the-house/toolbox heavy.

**Measure — two ways** (describe several attributes of one object). Two questions in sequence on the same object; both must be measured; the album card shows both badges. Badges read from the authored classes (long/short, tall/short, heavy/light).
| # | object | question 1 → badge | question 2 → badge |
|---|---|---|---|
| 1 | vegetables/carrot | long → long | heavy → light |
| 2 | zoo-animals/giraffe | tall → tall | heavy → heavy |
| 3 | toys/kite | heavy → light | tall → tall |
| 4 | classroom/pencil | heavy → light | long → long |
| 5 | beach/lighthouse | tall → tall | heavy → heavy |
| 6 | toys/train | long → long | heavy → light |
| 7 | camping/rock | heavy → heavy | tall → short |
| 8 | bakery/baguette | long → long | heavy → light |
| 9 | around-the-house/toolbox | heavy → heavy | tall → short |
(Round 3 is the big-but-light lesson: the biggest-looking object of the deck barely moves the spring.)

**Size window — two pictures** (K-032): one noun at big (1.0) and small (0.56); "Tap the big one." Big on the left in 4 of 9 rounds, right in 5: toys/ball (R) · fruits/apple (L) · farm-animals/pig (R) · bakery/cupcake (L) · circle (R) · toys/kite (R) · star (L) · vegetables/pumpkin (L) · square (R).

**Size window — a whole row** (K-040, K-079): one noun or shape, two sizes only; "Tap all the big ones." (slots 1→6 reading order, B = big, s = small)
| # | item | row |
|---|---|---|
| 1 | toys/ball | s B s B s |
| 2 | fruits/apple | B s s B B s |
| 3 | triangle | s s B s B |
| 4 | farm-animals/pig | B s B s s B |
| 5 | star | s B B s s |
| 6 | bakery/cupcake | s B s s B B |
| 7 | hexagon | B s s B s |
| 8 | toys/kite | s s B B s B |
| 9 | circle | B B s s B s |
2–3 big per row, never all, never one; no two rows alike.
- **Answer position**: station mode — the bays are fixed (track, post, spring left to right) and the questions balance: across the one-way pass each bay is the answer 3 of 9; no bay answers 3 rounds in a row (gate). Size mode — the big card's slot balance is gated over a pass (each slot big 35–65 % of the times it exists; two-picture rounds 4/5).
- **Order**: order-only reshuffle per pass (`nextTask`); size rows also mirror left-right on alternate passes (same counts, new positions).

## 7. Check, the misses, the success
Station mode has no Check button: the station itself answers.
- nothing for 20 s → bubble "Drag the picture onto a measuring station." (no miss)
- **miss 1** (wrong station): the station measures honestly, then its icon flag (↔/↕/⚖, 40 px) pops up beside the bar and the question card's icon pulses next to it — two different icons side by side. Hint EN, by case: "The track shows how long. The question is how tall." (all six pairings authored: long/tall/heavy × wrong station).
- **miss 2**: the matching station's bay glows softly (teal edge, 2 pulses) as the object returns. Hint "Try the station with this sign." (the question icon shown in the bubble).
- a new drop takes the glow away.
- **success**: the bar flashes gold, the question card's icon fills in the station's colour, the object does a small happy hop on the station. Bubble: long "Yes — the track shows how long it is!" · tall "Yes — the post shows how tall it is!" · heavy "Yes — the spring shows how heavy it is!" In two-ways rounds after question 2: the album card drops in with both badges and the bubble says "You measured it two ways: {badge1} and {badge2}!"

Size mode:
- Check with nothing tapped → "Tap the big ones first." (no miss)
- **miss 1**: the window visits every card: big ones poke out of all four sides (overhang glows gold), small ones sit inside with a visible margin. Wrongly ringed small cards: the window sits loose and rattles (2 × 4 px shake); missed big cards: their gold overhang pulses. Hint "The window shows it: big ones stick out, small ones fit inside."
- **miss 2**: the window stays parked on the first misjudged card; hint "Look at this one in the window."
- **success**: every big card's overhang flashes gold together, small ones shrink-bounce once. Bubble: "Yes — {n} big ones!" (two-picture rounds: "Yes — that is the big one!").

## 8. Settings
1. **Measure**: Long, tall, heavy / Big or small — switches the stage at rest (three station bays vs the size-window row).
2. **Harder**: one question / two questions — station mode: one-way vs two-ways rounds (the album strip appears at rest); size mode: two pictures vs a whole row.

## 9. Words (EN source)
- title (page frozen; instrument title on stage) "The Measuring Stations"
- instruction "Long, tall or heavy? Put the picture on the station that can find out."
- prompts: "How long? Find out!" · "How tall? Find out!" · "How heavy? Find out!" · "Tap the big one." · "Tap all the big ones."
- hints: "Drag the picture onto a measuring station." · "The track shows how long. The question is how tall." · "The track shows how long. The question is how heavy." · "The post shows how tall. The question is how long." · "The post shows how tall. The question is how heavy." · "The spring shows how heavy. The question is how long." · "The spring shows how heavy. The question is how tall." · "Try the station with this sign." · "Tap the big ones first." · "The window shows it: big ones stick out, small ones fit inside." · "Look at this one in the window."
- celebrations: "Yes — the track shows how long it is!" · "Yes — the post shows how tall it is!" · "Yes — the spring shows how heavy it is!" · "You measured it two ways: {badge1} and {badge2}!" · "Yes — {n} big ones!" · "Yes — that is the big one!"
- badges: "long" · "short" · "tall" · "heavy" · "light"
- settings: "Measure" — "Long, tall, heavy" / "Big or small" · "Harder" — "One question" / "Two questions"
- aria: bays "Track — measures how long", "Post — measures how tall", "Spring — measures how heavy"; window "Size window".

Locale traps:
- **The long/tall split does not exist the same way everywhere.** de "lang" vs "hoch/groß" (a giraffe is "groß", a tower "hoch"); fr "long" vs "haut/grand"; es "largo" vs "alto"; pt "comprido" vs "alto"; it "lungo" vs "alto"; nl "lang" vs "hoog" (and "lang" also = tall for people!); sv "lång" (also tall for people) vs "hög"; da "lang" vs "høj"; no "lang" vs "høy"; fi "pitkä" (both long AND tall for people) vs "korkea". The stations solve it: the question card is an ICON (↔ / ↕), and each locale's prompt uses its own word for the vertical measure of THINGS ("hoch", "haut", "alto", "hoog", "hög", "høj", "høy", "korkea") — the native reviewer confirms. This is exactly why the giraffe tipping over helps in fi/sv/nl, where one word covers both.
- Badges are single adjectives in their dictionary (masculine / common) form, never a sentence about the noun — avoids gender agreement (fr longue/légère, es/pt/it -a, sv/da/no neuter -t) and the Nordic definite suffix the vocab does not carry. "short" splits by question: de "kurz" (length) vs "niedrig/klein" (height), fr "court" vs "bas/petit", es "corto" vs "bajo", it "corto" vs "basso", pt "curto" vs "baixo", nl "kort" vs "laag", sv "kort" vs "låg", da "kort" vs "lav", no "kort" vs "lav", fi "lyhyt" vs "matala" — the badge key is `shortLength` / `shortHeight`.
- "heavy/light": "leicht" de, "léger" fr, "ligero/liviano" es (es-MX: "ligero"), "leve" pt, "leggero" it, "licht" nl, "lätt" sv, "let" da, "lett" no, "kevyt" fi.
- `{n}` big ones: plural noun phrase; fi "isoja on {n}" (partitive) — author a frame per locale.

## 10. Sound off, access, phones
- Silent-legible: bars, bar direction, icons, the tipping giraffe, the spring stretch, the window overhang and margin carry everything.
- Keyboard: Tab to the object, Enter lifts, arrow keys choose a bay (focus ring moves across bays), Enter drops; size mode: Tab across cards, Space rings, Tab to Check.
- aria-live on the bubble; each station result announced ("Track: long bar").
- Taps: bays ≥ 96 px wide; size cards ≥ 88 px wide even when the small picture is 50 px. Pictures: object 160 at 704 / 120 at 360; station pictures ≥ 64 on phones except the lying pencil (88 × 18 — it is a pencil lying down; its tap target is the whole bay).
- Phone: stations in one row of three under the object; no Check in station mode; size mode Check under 2 rows, above the 320 × 640 fold.
- prefers-reduced-motion: no bob, no tip animation (the object appears lying down).

## 11. Distinct from
- #34 The Drop-Down Stands (row 34, this batch): compares two or more objects directly (taller/longer, tallest in a row); here ONE object and WHICH measurement a word means.
- #208 The Marble Stairs: ordering by size.
- #209 The Market Scale: compares two weights on a balance; here a single object's weight is one of three attributes, shown on a spring (no comparison, no balance).
- `measurement-bench` tool: paperclip lengths, beakers, balance — measuring amounts; here naming the attribute by choosing the measuring action.
- Registry: no built activity uses measuring stations or a size window.

## 12. Build plan
- **Core state**: `{mode:'stations'|'size', round, step(0|1), placed:{bay, result}, rings:Set, misses}`; functions `stationFor(attr)`, `drop(bay)` → `{matches, measured:{attr, value}}`, `badge(object, attr)`, `sizeCheck(rings)` → `{wrongSmall:[], missedBig:[]}`, `windowSide(round)` (0.80 × big ink side; asserts big poke-out > 0 and small margin > 0), `nextTask`.
- **Per-noun data** `measure-stations-objects.json`: `{noun, theme, lieAngleDeg, standAngleDeg:0, laidFit, stoodFit, weightClass, lengthClass, heightClass}` — `lieAngleDeg` computed offline from the ink mask's principal axis (`cache/themes-512`, PCA of alpha) and then eyeballed on a contact sheet of the laid-flat renders.
- **Gate's own ground truth** (`verify-measure-stations-core.js`): re-derives the answer bay from the round table's question word; asserts each bay answers 3/9 one-way rounds, no bay 3 in a row; every two-ways round's badges equal the noun's authored classes; ink-box measurement (from source files, not the core) gives every size-row big/small ratio 0.56 ± 0.02 and window poke-out ≥ 6 % of the big side and small margin ≥ 6 % of the window; rows have 2–3 big; no crayon/marker as long; no B&W theme.
- **Mutations**: track measures height · giraffe stands on the track · spring stretch ignores weight class · kite classed heavy · bay answer streak of 3 · window equals big size (no poke-out) · a row with one big · small ringed counted right · badge "short" uses the length word on a height question · aria label leaks the answer.
- **Local test**: real drags to each bay, tap-tap path, both settings, all rounds, 7 widths × 11 locales; asserts bar orientation per bay and overhang/margin geometry in size mode.
- **Pictures to verify on the laid-flat contact sheet**: pencil, ruler, carrot, cucumber, baguette, train lying flat; giraffe and lighthouse tipped (should look like lying down, not broken).
- **Risks**: the per-noun lie angle (diagonal library art); weight classes are authored judgements — native/pedagogy reviewer confirms each (toy train = light, ladder not used for weight).
- Nothing BLOCKED.

## 13. The four questions
1. Yes — three little machines that zip, clunk and boing, a giraffe that lies down on a track, and an album of measure cards.
2. Yes — it teaches that long, tall and heavy are different MEASUREMENTS (the K.MD.A.1 idea, including "several attributes of one object"), it solves the long/tall word trap in nl/sv/fi, and big-but-light is shown, not told.
3. Yes — library pictures, drawn instruments, no numbers, no words on the stage, nothing scored.
4. Long, tall and heavy are found out by choosing the right measuring station — lay it on the track, stand it at the post, or hang it on the spring.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 5→5 · correctness 4→5 · distinctness 5→5 · reality 3→5
What changed:
- Contact sheet: fruits/watermelon is a SLICE — it was the "heavy" object in one-way round 9 and two-ways round 9. Replaced by vegetables/cabbage (one-way) and around-the-house/toolbox (two-ways; heavy, short), both whole and heavy-looking.
- Contact sheet: toys/balloon is a small balloon on a string, so it cannot carry "big but light". The kite (a big diamond with a tail, clearly taller than wide) carries the lesson in two-ways round 3 and in §3.
- space/rocket (spare tall) is drawn diagonally like the pencil: it gets a per-noun stand angle so it stands upright on the post (added to the contact-sheet note and the per-noun data).
- Checked: size-row big-slot balance is 3–4 per slot (44 % each, slot 6 60 %), each bay answers 3 of 9 one-way rounds; #34 and #208 stay distinct (this row names WHICH measurement a word means on one object; #34 compares, #208 orders).
