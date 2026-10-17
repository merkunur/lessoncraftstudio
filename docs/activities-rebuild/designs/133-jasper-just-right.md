# Row 133 — The What-For Tags (L.1.5.c)

## 0. Identity
- id `jasper-just-right.real-life.l-1-5-c` (KEPT) · grade 1 · Common Core L.1.5.c (identify real-life connections between words and their use — e.g. note places at home that are cozy) · strand Language · page title (frozen) "Jasper's Just-Right Bag — Which One Would You Use? (Grade 1)" · own files `mini tools/what-for-tags-core.js`, `what-for-tags-activity.js`, `what-for-tags-activity.html`; manifest row stays in `jasper-just-right-activities.json` (id, slugs en..nl, page_title, page_intro unchanged), `tool` repointed. sv/da/no/fi get new slug/title/intro at build.
- worksheets it covers: none mapped.
- what the old activity did: one situation sentence ("It is raining outside. What do you use to stay dry?") and three library pictures; tap one. **Kept:** the eight situations and their right objects (cup, umbrella, sock, pencil, apple, fan, bed), their per-locale sentences (de/fr/es/pt/it/nl) as seed text; the frozen promise ("read what is happening, then tap what you would use"). **Fixed:** the old "cut the paper → scissors" round and three distractors pointed at `around the house/scissors`, which does not exist in the library (a broken tile in every locale) — the cutting moment is dropped and scissors never appear; "crayon" from a non-existent "classroom" path is re-pointed to classroom/crayon (exists). **Gone:** one-question-three-pictures with nothing to discover.

## 1. The pitch
"Everything in Jasper's bag wears a little tag that says what it is FOR — hang it on a moment of the day, and when the day plays the tags flip over: the right thing clicks into its moment, and a wrong one shows you the moment it really belongs to."

## 2. Why a child will want it again (the fun)
- **A whole day to pack, not one question.** Each round is one of Jasper's days — a rainy school day, a snow day, a beach day, bedtime — four moments in a row like windows, and a bag of six things. The child hangs one thing under each moment.
- **The day plays.** Press Go and a little sun disc rises over the first window and travels left to right to a moon over the last; as it passes each moment, the hanging thing's tag flips over with a paper *flick*. A match clicks: the thing slides up into the window and the moment glows warm. A mismatch: the tag shows *its* moment (a sock's tag shows a cold foot), the thing swings off its hook and drops back into the bag with its tag left open — now the child knows what it is for.
- **Finding the second use is a surprise:** in Level 2 the umbrella's tag shows two moments (rain AND the blazing beach sun) — "it's for both!"
- **End-of-round show:** with all four moments glowing, Jasper's day-strip rolls up like a scroll and joins a little shelf of "days" — a growing week. The bag's leftover things wave their open tags.
- No timer, score, streak or lives.

## 3. The skill and the misconception
- **Skill:** connect a word for a thing with its real use and the moments it belongs to (L.1.5.c): what you use when it rains, when your feet are cold, when you want to write; which things can serve more than one moment; and which places/things are cozy, cold or wet (the standard's own describing example).
- **Misconception 1 — association by place, not by use** (rain → the sock, because both are "outside clothes"; writing → the cup, because both are on the desk). Pushback: the tag flip shows each thing's real moment — the sock's tag shows a cold foot, not rain.
- **Misconception 2 — one thing has only one use.** Pushback (Level 2): tags of multi-use things show two moments; the child has to hang the thing on every moment it helps.
- **Misconception 3 — any nice thing is "cozy"** (a sunny rock is warm but not cozy). Pushback (Level 3): the feel tags read cozy / cold / wet / loud — a hard rock's tag says "hard", it will not sit in the cozy window.

## 4. The stage
`layout:'split'` at ≥ 700 px: stage left (480 × 470), bubble column right (200 px; the week shelf sits under the bubble).

**At 704 px:**
- **The day board** (top, 460 × 190): a long cream frame with four **moment windows** (104 × 150 each, 10 px gaps). Each window: a library **moment picture** **96 px** (the situation, never the answer object), and under it the **moment sentence** in 16 px, ≤ 3 short lines ("It is raining."). Above the board, a thin sky track for the sun disc (drawn: a 28 px circle that becomes a crescent at the last window).
- **Hooks:** a drawn brass hook under each window (24 px), with a hit area 104 × 96 where a thing hangs.
- **The bag** (bottom, 460 × 170): a drawn open bag shape (geometry: a wide rounded trapezoid with two handle arcs, `#C98A4B`, 3 px ink) holding **six things** in two rows of three: library pictures **96 px**, each with a small paper **tag** on a string (tag 44 × 28, folded corner; the face of the tag shows a dot pattern only — blank — until flipped).
- **A flipped tag** shows its use in WORDS only (14 px, ≤ 2 lines: "for rain", "for cold feet", "for writing") on a coloured tag face — no little pictures (a 32 px picture would break the 64/96 px floor, and the words are the vocabulary being taught). A tried tag stays open, word side up.
- **Go** = Check (a 64 px round button with a drawn sun).
- **Task line** above; **bubble** right.

**At 360 px** (stacked): day board as a 2 × 2 grid of windows (156 × 150 each, moment picture **64 px**, sentence 14 px); hooks under each; the bag as a 3 × 2 grid of things at **64 px** with tags 40 × 26; the hanging thing on a hook shows at 64 px. Go button 56 px under the bag; Go bottom ≤ 690 at 360 × 740, ≤ 610 at 320 × 640 (at 320 the windows go 150 × 132 and the sentence stays at 13 px, measured to fit three lines in every locale — the sentence is the task, so it never hides).

Pictures (library, colour; theme JSON verified — `around the house/scissors` is in the image cache but has NO label, so it is not usable): moments — weather/rainy, winter/icicle (cold — never weather/cold, a penguin wearing a scarf), weather/hot, weather/sunny, weather/snowflake, camping/moon, emotions/tired, body-parts/foot, hand, tooth, head, eye, mouth, activities/writing, activities/baking, summer/sand, summer/swimming, at-the-supermarket/milk, breakfast/cereal, breakfast/pancake; things — accessories/umbrella, sock, mitten, beanie, sunglasses, scarf, cap; around-the-house/cup, pencil, pillow, bed, lamp, comb, toothbrush, fan, spoon, mirror; kitchen-tools/whisk, glass, spatula; beach/spade, swimsuit (also summer); at-the-supermarket/water, apple; camping/flashlight; clothing/raincoat, coat, shoe; classroom/book, glue; Level 3 — around-the-house/couch, cushion, rug, fireplace; winter/icicle, snowman; weather/puddle, raindrop; beach/rock; tools/hammer; music/drum, trumpet (never music/cymbals — it is drawn as a whole drum kit).

## 5. The hand
- **Drag a thing** from the bag onto a hook (or tap the thing, then tap a hook): it lifts (scale 1.08, shadow) and swings onto the hook with a little pendulum settle (two swings, 400 ms). A hook holds one thing; dropping on a full hook swaps (the old one swings back to the bag).
- **Drag a hanging thing** back to the bag or to another hook. Tap a moment window to hear its sentence (TTS bonus).
- **Press Go** (= Check; enabled when every hook holds something): the sun disc travels the sky track (500 ms per window). At each window the hanging thing's tag flips (180 ms):
  - tag shows this moment → the thing slides up into the window, sits over the moment picture's corner (64 px), the window glows warm; *click*;
  - tag shows another moment → the thing swings off and arcs back to the bag (500 ms); its tag stays flipped (open) from now on in this round.
- **Open tags stay open** for the rest of the round; closed tags of untried things stay closed (nothing is revealed that the child did not try).
- **Free play:** after a round, tap any thing in the bag to flip its tag and read what it is for; days on the week shelf can be unrolled to see them again.

## 6. The rounds
One round = one day: four moments, six things (four right, two that belong to moments of other days). Exactly one right thing per moment in Level 1 (asserted: no extra thing's tag shows any of today's moments).

**Level 1 — Pack Jasper's day**, 8 days (en):

| day | moment (picture) — sentence → right thing | extras (their tags) |
|---|---|---|
| 1 Rainy school day | rainy — "It is raining outside." → umbrella · writing — "You want to write your name." → pencil · mouth — "You want a drink of water." → cup · moon — "It is bedtime." → bed | sock (cold foot) · sunglasses (sunny) |
| 2 Snow day | snowflake — "Snow is falling on your head." → beanie · hand — "Your hands are cold." → mitten · foot — "Your feet are cold." → sock · moon — "It is dark in your room." → lamp | fan (hot) · spade (sand) |
| 3 Beach day | sunny — "The sun is very bright." → sunglasses · sand — "You want to dig in the sand." → spade · swimming — "You want to swim." → swimsuit · mouth — "You are thirsty." → water | mitten (cold hand) · pillow (tired) |
| 4 Baking day | baking — "You mix the cake batter." → whisk · milk — "You want to drink milk." → glass · cereal — "You eat your cereal." → spoon · pancake — "You flip the pancake in the pan." → spatula | umbrella (rainy) · comb (head) |
| 5 Morning | tooth — "Time to brush your teeth." → toothbrush · head — "Your hair is messy." → comb · eye — "You want to see how you look." → mirror · foot — "You go outside." → shoe | fan (hot) · whisk (baking) |
| 6 Hot day | hot — "It is a very hot day. You want to cool down." → fan · head — "The sun shines on your head." → cap · mouth — "You are hungry." → apple · eye — "The light is too bright." → sunglasses | scarf (cold) · toothbrush (tooth) |
| 7 Camping night | moon — "It is dark outside the tent." → flashlight · tired — "You are sleepy." → pillow · cold (winter/icicle) — "The night is cold." → coat · mouth — "You are thirsty after the walk." → water | spade (sand) · sunglasses (sunny) |
| 8 Art time | writing — "You want to write a word." → pencil · eye — "You want to read a story." → book · hand — "You want to stick two papers together." → glue · mouth — "You want a drink." → cup | fan (hot) · beanie (snowflake) |

(The old eight situations live inside days 1, 2, 3, 6, 7 and 8 with their old right objects; "eat → apple" is day 6, "hot → fan" day 6, "sleep → bed" day 1.)

**Level 2 — More than one use**, 8 rounds: one thing in the middle of the board, five moment windows around it; the child hangs a copy of the thing on EVERY moment it helps (2 or 3 right). Go flips the thing's single tag, which shows all its moments; windows it belongs to glow, windows it does not belong to drop their copy.
Window sentences come from the Level 1 table unless written here. 1 pencil → writing ("You want to write your name."), hand ("You want to draw a picture.") · not: rainy, moon, foot · 2 cup → mouth ("You want a drink of water."), milk · not: foot, sand, rainy · 3 scarf → cold (winter/icicle, "The wind is cold on your neck."), snowflake · not: hot, swimming, tooth · 4 sunglasses → sunny, eye ("The light is too bright.") · not: moon, rainy, cold · 5 spoon → cereal ("You eat your cereal."), mouth ("You eat your soup.") · not: writing, foot, sand · 6 lamp → moon ("It is dark in your room."), eye ("You want to read in bed.") · not: swimming, hot, foot · 7 coat → cold ("The night is cold."), snowflake · not: hot, swimming, tooth · 8 pillow → tired, moon ("It is bedtime.") · not: mouth, sand, writing. (The umbrella is NOT a multi-use thing here: "umbrella for the sun" is a different word in most locales — de Sonnenschirm/Regenschirm, fr parasol/parapluie, nl parasol/paraplu — so it would teach a false connection.)
(Each "not" window is chosen so the thing is plausible by place but not by use.)

**Level 3 — Cozy, cold or wet?** (the standard's own example), 8 rounds: three **feel windows** labelled with a describing word (content) — "cozy", "cold", "wet" (rounds 1–4), then "soft", "hard", "loud" (rounds 5–8) — and six things to hang, two per window. Go flips the feel tags.
| # | words | pairs |
|---|---|---|
| 1 | cozy · cold · wet | couch, cushion · icicle, snowman · puddle, raindrop |
| 2 | cozy · cold · wet | fireplace, rug · snowflake, icicle · raindrop, puddle (new partners on screen) |
| 3 | cozy · cold · wet | pillow, bed · snowman, snowflake · puddle, raindrop |
| 4 | cozy · cold · wet | couch, fireplace · icicle, snowman · raindrop, puddle |
| 5 | soft · hard · loud | pillow, beanie · rock, spoon · drum, trumpet |
| 6 | soft · hard · loud | rug, beanie · hammer, rock · trumpet, drum |
| 7 | soft · hard · loud | cushion, beanie · spoon, hammer · drum, trumpet |
| 8 | soft · hard · loud | pillow, rug · rock, hammer · trumpet, drum |

Words the design ruled out: a swimsuit as "wet" (not always wet), a lamp as "hard" (not a touch word for a child). The wet and loud pairs repeat because the library holds only two clear pictures for each — the other words rotate partners.
Each thing's feel word is fixed in data after looking at the picture (a rock is hard, not cold; a snowman is cold).

**Answer position:** Level 1 — right things are spread over the bag's six slots so that each slot holds a right thing 5 or 6 times in 8 days (32 right placements / 6 slots), extras rotate; the bag is re-shuffled per render keeping the balance per pass; bots "hang the first four things in order", "hang things by matching bag row to window order" ≤ 2/8 days fully right. Level 2 — the 2–3 right windows are in different positions each round (balanced). Level 3 — pair placement shuffled.
**Order:** order-only reshuffle per pass.

## 7. Check, the misses, the success
- **Go with an empty hook:** hint, no miss — the empty hooks swing: "Hang one thing under every moment."
- **Miss 1** — the day plays: wrong things show their real moment on their open tags and drop back into the bag; right ones click into their windows. Hint: "{thing} is for {its moment}. What helps when {this moment}?" — written per moment as authored phrases (e.g. "The sock is for cold feet. What helps when it rains?").
- **Miss 2** — the stronger showing: for each window still empty, the bag nudges once: every thing whose tag is still CLOSED gives a small hop (the right one is among the untried things — never pointed at directly), and the moment's key words in its sentence light ("raining"). Hint: "Try a thing you have not tried yet. Read the glowing word."
- **A new move takes the help away** until the next Go.
- **Success:** four windows glow, the sun reaches the moon, the day-strip rolls up onto the week shelf. Bubble: "Just right! Umbrella for the rain, pencil for writing, cup for a drink, bed for bedtime." (authored per day; list per the locale's list rule). Level 2: "An umbrella is for rain — and for sun, too!" Level 3: "Cozy: couch, cushion. Cold: icicle, snowman. Wet: puddle, raindrop."

## 8. Settings
1. **Things in the bag:** 6 (default: 4 right + 2 extra) · 8 (4 extra). Visible at rest: the bag holds six or eight things.
2. **Moment words:** sentence (default) · picture only (the sentence hides; for pre-readers with an adult). Visible at rest: the windows show or hide the sentence.
(The shell level picker: Pack Jasper's day / More than one use / Cozy, cold or wet?)

## 9. Words (EN source)
- title: "Jasper's Just-Right Bag".
- instruction: "Read each moment of Jasper's day. Hang the thing he would use under it, then press Go."
- task lines: L1 "Read what is happening — what would Jasper use?" (keeps the old prompt) · L2 "Hang it on every moment where it helps." · L3 "Is it cozy, cold or wet? Hang each thing under its word."
- moment sentences and tag words ("for rain", "for cold feet", "for writing", "for a drink", …): as in §6, authored per locale.
- hints/celebrations: §7. Labels: "Go", settings names.
- aria: "Moment {n}: {sentence}", "Hook {n}: {thing}", "{thing}'s tag: for {moment}", "Window {n} is just right".

**Locale traps:**
- **Moments are rebuilt per locale, not translated, where daily life differs:** breakfast is cereal in en but bread/porridge/yogurt in de/sv/no/da/fi (breakfast/porridge exists) — the reviewer picks the moment picture, keeping the spoon as the answer (it fits porridge and yogurt); a beach day in fi/sv/no is a lake day (summer/swimming stays); "sun on your head → cap" stays the cap picture everywhere. **Rain — SETTLED (critic):** a day with a rain moment never holds both the umbrella and the raincoat (gate rule), so every locale has exactly one rain thing. In **nl and da** (children cycle to school in the rain) day 1's rain answer is the **raincoat** (clothing/raincoat — regenjas / regnfrakke) and the umbrella leaves day 1 entirely; in the nine other locales day 1 keeps the umbrella. Day 7 has no rain moment at all (see the table), so the coat can never be argued for rain.
- **Articles and possessives in moment sentences:** "Your feet are cold" — de "Deine Füße sind kalt", fr "Tu as froid aux pieds" (idiom, not word for word), es "Tienes los pies fríos", fi "Varpaitasi palelee" (impersonal construction) — authored whole.
- **Tag words "for …"** are short noun phrases per locale (de "für den Regen", fr "pour la pluie", fi "sateelle" — allative case, one word); authored, never composed.
- **Feel words (Level 3):** "cozy" has no exact word in several languages (de gemütlich, da hyggelig, no koselig, sv mysig, nl gezellig, fi kodikas, fr douillet, es acogedor, it accogliente, pt aconchegante) — fine, all exist and children know them; they are cultural treasures, the reviewer keeps them.
- **Plural/gender agreement in the celebration list** authored per day.

## 10. Sound off, access, phones
- Silent legibility: moment pictures + sentences, the tag flip, the glow, the drop back — all visible.
- Keyboard: Tab to a bag thing, Enter picks it up, arrows choose a hook, Enter hangs; G or Enter on Go plays the day.
- aria-live narrates the day: "Moment 1: umbrella — just right. Moment 2: sock is for cold feet — back in the bag."
- Taps ≥ 44 px (things 64–96, hooks 96 hit areas, Go 56–64).
- Pictures 96 px (things and moments) at 704; 64 px at 360; tags carry words, never pictures.
- Phone: 2 × 2 windows; the sun disc travels in reading order (row by row).

## 11. Distinct from
- **Our Day (premium tool)** — builds a classroom schedule; nothing to match or discover.
- **Story Line (premium tool)** — pegs story beats in order on a clothesline; here the order is given (the day) and the task is use-to-moment.
- **New 220 The Wash Basin / New 221 The Everyday Plate** — health routines with order/balance physics; here vocabulary-to-use connections across many situations.
- **Row 131/132** — categories (kinds); here uses (what for).
- Not a reused invention: no registered design uses flip-over "what-for" tags that stay open after a try.

## 12. Build plan
- **Data:** `what-for-tags-rounds.json` per locale: `moments` (id → picture, sentence, keyWords, tagWords), `things` (noun → moments:[ids], feel:[ids]), `days:[{id, moments:[4 ids], right:[4 nouns], extras:[2–4 nouns], celebration}]`, `multi:[{thing, windows:[5 ids]}]`, `feels:[{words:[3], pairs:[…]}]`.
- **Core state** `{level, round, hooks:[noun|null], openTags:Set, played:null|[{ok}], misses}`; functions `hang(noun, hook)`, `unhang(hook)`, `go()` → per window `{ok, tagMoments}`, `isDone()`.
- **Gate's own ground truth** (`verify-what-for-tags-core.js`): its own use table (noun → moments) written in the gate; for every day: exactly one thing in the bag has each of today's moments; no extra's tag shows a today-moment; the four moment pictures of a day are all different and no extra's tag picture equals a today-moment picture (a hand icon may mean cold hands on one day and sticky hands on another, never both in one day); `go()` ok iff the gate's table says so; tags open only for tried things; Level 2 right windows = the gate's table; Level 3 each thing in exactly one of the round's three feel windows; slot balance; bots ≤ 2/8; every picture exists (the gate fails on any path not in the theme JSON — the scissors class of defect).
- **Mutations:** extra thing allowed a today-moment · tag of an untried thing opens at Go · wrong thing stays hung · Level 2 accepts a missing use · Level 3 thing in two windows · bag order not shuffled · a picture path missing from the JSON (must fail the gate).
- **Pictures verified on contact sheets (critic 2026-10-17):** weather/rainy is a rain cloud (no umbrella in it); weather/cold is a PENGUIN WEARING A SCARF — it shows an answer, so the cold moment uses winter/icicle; weather/hot is a smiling sun; summer/sand is a sand pile and summer/swimming a swimmer (no spade, no swimsuit drawn); activities/baking a cook with a tray (no whisk); breakfast/cereal is a full red BOWL — so it is never a moment whose answer is the bowl; breakfast/pancake a pancake; around-the-house/mirror, comb, toothbrush, lamp, pillow, cushion, couch, rug, fireplace; kitchen-tools/whisk, spatula, glass (the tumbler; around-the-house/glass is a wine glass, never used); tools/hammer; music/drum, trumpet (music/cymbals is a whole drum kit — not used); classroom/glue; winter/icicle, snowman.
- **Risks:** moment pictures that show the answer (activities/reading shows a book — so "read a story" uses the eye picture, never the reading picture); the moment sentence must fit three lines at 13–16 px in every locale (local-test measures).
- **Blocked:** none (scissors are absent from the library, so cutting is not taught here).

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — packing a whole day, watching the sun travel and the tags flip, and filling a week of days is a little world.
2. **Would a teacher put it on the board?** Yes — "what is it for?" is the heart of L.1.5.c, the open tags start conversations ("why not the sock?"), and multi-use things and the "cozy" level go past naming into real connections.
3. **Would a parent trust it?** Yes — everyday family life, library pictures, no scores, nothing broken (every picture verified).
4. **The invention:** every thing wears a tag saying what it is for — hang it on a moment, play the day, and the tags flip to show where each thing really belongs.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 3→5 · distinctness 5→5 · reality 3→5
What changed:
- Four Level 1 days had two right things or a moment picture that showed the answer: day 4 "sticky hands → sponge" (weak) is now "flip the pancake → spatula"; day 5 "breakfast → bowl" used breakfast/cereal, which IS a bowl, now "see how you look → mirror"; day 7 had coat AND raincoat with a rain moment (the design's own Level 2 said a coat is for rain) — the rain moment is gone (thirsty → water) and the extra cup that matched it is now sunglasses; day 8 had pencil AND crayon (both write and colour) — now "stick paper → glue".
- weather/cold is a penguin wearing a scarf: the cold moment is winter/icicle everywhere. Level 2's "umbrella for the sun" taught a false connection in most locales (Sonnenschirm/parasol are different words): replaced by the pencil (write AND draw); every Level 2 window sentence is now written.
- Level 3: pillow and cushion share one word in 7 locales — never together now; the shoe (a soft loafer) is not "hard" — the hammer replaces it (music/cymbals was considered as a third loud thing and refused: it is drawn as a whole drum kit).
- Sizes: moment pictures 96 px at 704, tags carry words only (no 32 px pictures). The nl/da rain decision is settled: raincoat in nl/da, umbrella elsewhere, never both in one day.
