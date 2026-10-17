# Row 59 — The Letter Magnet (RF.K.3.a)

## 0. Identity
- **id** `choice-board.beginning-sound.rf-k-3-a` (KEPT; slugs, titles, intros frozen in all 11 locales) · grade K · Common Core **RF.K.3.a** (the primary sound of each consonant) · strand Reading: Foundational Skills.
- **files (key `letter-magnet`)** `mini tools/letter-magnet-core.js`, `letter-magnet-activity.js`, `letter-magnet-activity.html`; the manifest row stays in `choice-board-activities.json` (id, slugs, titles, intros frozen), `tool` repointed to `letter-magnet-activity`.
- **worksheets it covers:** K-221 Beginning Sounds · K-228 Sort by Beginning Sound · K-317 Letter of the Week · K-328 M or N? Hear the Difference · G1-311 Sound of the Week · G1-380 Digraphs sh, ch, th: Which Letter Team Do You Hear? · G1-392 Missing Digraphs: Write sh, ch or th · G1-393 Read Digraph Words and Match the Pictures · G1-394 Where Is the Digraph?
- **what the old activity did:** a letter card and four pictures; tap the one whose name begins with that letter's sound; 8 rounds per locale. **Kept:** every locale's 8 rounds become the gentlest level ("One hook") unchanged in content — the panel re-checks each one. **Changed because it was wrong:** en "G → giraffe" teaches G as /dʒ/; RF.K.3.a asks for the PRIMARY sound, so the G round becomes **goat** (farm-animals/goat); the four-picture tap was a guess-friendly quiz (25 % by chance, instant retry) — now the child gathers the pictures they believe belong and switches the magnet on, and the magnet decides.

## 1. The pitch
"The letter is a magnet that only pulls pictures whose names start with its sound — gather the ones you think belong, switch it on, and watch which ones jump up and which ones stay on the table."

## 2. Why a child will want it again (the fun)
- **A real switch.** A big red horseshoe magnet hangs on a stand above a wooden table; a chunky lever sits on the stand. Flipping the lever makes the magnet hum: three curved field lines pulse out from its poles, and the pictures under it twitch — then the right ones fly up and clack onto the magnet's hooks one after another (*clack, clack, clack*, 90 ms apart). Children love throwing the switch.
- **The ones that don't belong just… don't move.** A picture that does not start with the sound sits stubbornly on the table and gives a little "nope" shiver. The magnet is honest; it is physics, not a judge.
- **Names drop out.** Once a picture hangs, its name strip unrolls beneath it with the first letter (or letter team) in coral, touching the magnet's letter — a row of words all starting with the same letter, made by the child.
- **The team magnets.** In the letter-team levels the magnet carries two welded letters (sh, ch, th). Lift a word card under it and, as the card rises, the magnet's team drops off the magnet into the card's gap with a click — the word completes itself in the air.
- **Free play:** after a round, the child can drag any table picture under the magnet and flip the switch again just to see it jump or stay — this is allowed only after the round is solved, so it never hands out the answer.
- No timer, score, streak or lives.

## 3. The skill and the misconception
- **Skill:** hear the first sound of a spoken picture name and connect it to the letter's primary sound (K-221, K-317, G1-311); sort pictures by two first sounds (K-228, K-328); hear a letter team (sh, ch, th — two letters, one sound) anywhere in a word (G1-380); find where the team is, at the front or the end, and write it into the word (G1-392, G1-394); read team words and match them to pictures (G1-393).
- **Misconception 1 — matching by meaning or by picture** ("milk" goes with the cow). The magnet ignores meaning: only the first sound pulls.
- **Misconception 2 — voicing neighbours** (b/p, d/t, f/v, m/n, k/g). The two-magnet level puts exactly these pairs side by side (K-328 m or n), so the child must listen to the start of the word, not just the shape of the mouth.
- **Misconception 3 — letter name instead of sound** ("W says double-u" → *dog*?). The magnets show the letter; the hint says "the sound of", and the success sentence lines up the words that all START with the same letter so the sound–letter link is seen.
- **Misconception 4 — two letters, two sounds** (s + h). In the S / Sh round, ship and shoe do NOT go to the S magnet: the sh magnet takes them. The material makes "sh is its own sound" physical.
- **Misconception 5 — the team is always at the front** (G1-394). Fish, brush, peach and tooth carry their team at the end; the word strips show the gap where it really is.
- **How the material pushes back:** the switch is the check; a wrong picture is simply not lifted, a missed one leaves an empty hook. The magnet never says "wrong".

## 4. The stage
`layout:'split'` at ≥ 700 px: stage left (504 wide), bubble column right (176). Stacked below 700.

**At 704 px** (stage 504 × 480):
- **The magnet stand** (top centre): a drawn ink gantry (two posts 8 px, a beam) holding the **horseshoe magnet** — a red U (`#E2533B`, 36 px thick, 200 px wide, 120 tall, rounded), silver pole tips (`#C9CFD6`, 36 × 28). On the bend of the U: the **letter**, cream disc 76 px with the letter in Baloo 2 64 px ink (capital + small, e.g. "Mm", per the Letters setting). Under the poles hangs a **hook bar** (ink line 260 px) with the round's **hooks** (one per right picture: 1, 3, or 2 per magnet), each a small teal hook 20 px. The empty hooks ARE the count of pictures to find.
- **The lever** (right of the stand): a drawn knob-lever 40 × 90 on a base, down = off (grey), up = on (field lines appear). It doubles as the Check button (the shell's Check also flips it).
- **The pull zone** (under the magnet): a dashed teal arc 300 × 110 on the table — pictures dragged into it wait there.
- **The table** (bottom, y = 300, 504 × 170): six picture cards in a 3 × 2 grid (four in the One-hook level, eight in the two-magnet level as 4 × 2), each card **132 × 132** with the library picture **112 px** on cream, 3 px ink rim, radius 16.
- **Two-magnet level:** two smaller magnets (150 wide, letter disc 64 px) side by side on one gantry, each with its own pull zone and hooks.
- **Team-in-the-word level:** three team magnets (sh · ch · th, each 140 wide, team disc 64 px) hang on the gantry with their pull zones; each table card carries its **word strip** under the picture (Nunito 24 px) with a gap (a dark rounded socket 60 × 40) at the front or the end. In the two **Read and match** rounds the three magnets carry whole WORDS on their discs (Baloo 2 30 px, e.g. ship · chick · tooth) instead of teams.
- **Task line** above (≤ 24 px, ≤ 2 lines). **Bubble** in the right column; Check under it.

**At 360 px** (stacked): magnet 150 wide (letter disc 60 px), lever 32 × 70 to its right, pull zone 300 × 80; table 3 × 2 cards **104 × 104** (pictures **88 px**; ≥ 64 floor), 8 px gaps; two-magnet level: magnets 120 wide each, table 4 × 2 cards 80 × 80 (pictures **68 px**); bubble under the table; Check bottom ≤ 700 at 360 × 740. **At 320 × 640:** cards 92 (pictures 76), two-magnet cards 72 (pictures 64), Check bottom ≤ 630.

Words on the apparatus: only the letters (content) and, in the team levels, the word strips (content).

## 5. The hand
- **Drag a picture** from the table into the pull zone (it lifts with a soft shadow, follows the finger, settles with a 120 ms bounce). Tap a picture = it hops into the pull zone (180 ms). Drag or tap it again to send it back to its table spot. Several pictures can wait in the zone; they line up under the hooks.
- **Flip the lever (Check):** the lever snaps up (100 ms), the magnet hums (a low 0.4 s tone, field lines pulse twice), then, one after another, right pictures in the zone fly up and clack onto the hooks (240 ms arc each), wrong pictures shiver (3 × 4 px, 180 ms) and stay. The lever then falls back down by itself.
- **Two magnets:** each picture is dragged into ONE of the two zones; the lever powers both.
- **Team-in-the-word level:** drag each word card into the pull zone of the team magnet you think fills its gap. Flip the lever: right cards rise, and as each one meets the magnet a copy of the magnet's team flies off the disc into the card's gap (front or end) with a click; a wrong card stays down and its gap stays dark. **Read and match:** drag each PICTURE under the word magnet that names it; only the named picture rises.
- **Speaker:** tapping a picture's corner speaker (28 px) speaks its name (TTS where available).
- **Free play:** after success, any picture can be dragged back under the magnet and the lever flipped again.

## 6. The rounds
One round = one magnet set-up. Pass = the level's rounds; order-only reshuffle per pass.

**Level 1 — One hook (K-221).** The old activity's rounds, one per letter, four pictures, one belongs, one hook. **EN (8):** D dog · F fish · M moose · R rabbit · S sock · T tiger · L lemon · **G goat** (was giraffe), each with the old distractors (the G round's distractors stay dog · fish · rabbit). Every other locale keeps its old 8 rounds (de B Ballon … T Tiger; es B béisbol … T tigre; fi H hattu … T tiikeri, etc.) after the panel's check against §9's traps.

**Level 2 — Letter of the week (K-317, G1-311), 8 rounds, EN.** One magnet, six pictures, three hooks; the three "others" include one sound-neighbour trap. (Every picture below exists in its theme JSON — checked 2026-10-17.)

| letter | belong (theme/noun) | others (trap first) |
|---|---|---|
| M | monkey (zoo-animals), mop (around-the-house), milk (at-the-supermarket) | nose (body-parts) · sun (beach) · fox (animals) |
| S | sock (accessories), sun (beach), seal (zoo-animals) | zebra (animals) · fish (animals) · bed (around-the-house) |
| T | tiger (animals), tent (camping), table (furniture) | duck (farm-animals) · cat (animals) · lemon (fruits) |
| B | ball (toys), bus (vehicles), banana (fruits) | pig (animals) · dog (animals) · hat (accessories) |
| P | panda (animals), pear (fruits), pot (around-the-house) | bed (around-the-house) · sock (accessories) · moose (animals) |
| F | fork (around-the-house), fan (around-the-house), fox (animals) | van (vehicles) · sun (beach) · mug (kitchen-tools) |
| L | lion (zoo-animals), lamp (furniture), leaf (miscellaneous) | rabbit (animals) · net (beach) · cup (kitchen-tools) |
| H | horse (animals), hammer (tools), hen (farm-animals) | apple (fruits) · owl (animals) · bus (vehicles) |

No picture starts with a letter team or a blend in these rounds (no "sheep" for S, no "frog" for F, no "tree" for T).

**Level 3 — Two magnets (K-228, K-328), 7 rounds, EN.** Two magnets, six pictures (three each), three hooks per magnet:
1. **M / N** — moose, mop, milk / nose, nest (spring), net (beach).
2. **B / P** — ball, bus, bed / pig, pen (around-the-house), pear.
3. **D / T** — dog, duck, door (around-the-house) / tiger, tent, table.
4. **F / V** — fan, fork, fish / van, violin (music), vase (around-the-house).
5. **C (k sound) / G** — cat, cup (kitchen-tools), car (toys) / goat, guitar (music), gate (around-the-house).
6. **L / R** — lion, lamp, lemon / rabbit, ring (accessories), rock (beach).
7. **S / Sh** — sock, sun, seal / ship (vehicles), shoe (clothing), sheep (farm-animals). The bridge into letter teams.
Placement balance: the two magnets' letters swap sides in alternate passes (M left in pass 1, right in pass 2).

**Level 4 — Which team do you hear? (G1-380), 7 rounds, EN.** Three magnets (sh · ch · th) on one gantry when a round contains th, otherwise two (sh · ch). Six pictures, the team anywhere in the word. Pools: **sh** ship, shoe, sheep, shirt (clothing), shovel (around-the-house), fish, brush (around-the-house — a paintbrush, still "brush"); **ch** chair (furniture), cheese (at-the-supermarket), chick (farm-animals), cherry (**at-the-supermarket**/cherry — fruits/cherry is drawn as an apple), bench (furniture, end ch), watch (accessories, end tch — one /ch/ sound written t-c-h; the strip shows the ch team after the t); **th** thermometer (weather), tooth (body-parts), mouth (body-parts) — all /θ/. Rounds 1, 4, 6 carry three magnets with two of each (th = thermometer + tooth / tooth + mouth / thermometer + mouth); the other four rounds are sh/ch three each. **Refused:** `chef` (ch says sh), activities/theater (a building scene), fruits/peach (reads as an apple), farm-animals/chicken (the same drawing as the hen — a child who says "hen" is not wrong), zoo-animals/cheetah (drawn as a near-twin of the leopard and jaguar — seen).

**Level 5 — Team in the word (G1-392, G1-394; rounds 7–8 G1-393), 8 rounds, EN.** Three table cards per round, each with its picture and its word strip with a gap; each card goes under the team magnet whose team fills its gap. Strips (gap shown as _): _ip (ship) · _eep (sheep) · fi_ (fish) · bru_ (brush) · _air (chair) · _ick (chick) · ben_ (bench) · wat_ (watch) · _ermometer (thermometer) · too_ (tooth) · mou_ (mouth) · _oe (shoe) · _eese (cheese) · _irt (shirt) · _erry (cherry). Rounds 1–6 each mix front and end gaps (at least one of each) and at least two different teams. Rounds 7–8 (**Read and match**, G1-393): the three magnets carry whole team words (7: ship · chick · tooth; 8: sheep · chair · mouth) and the table holds six pictures — the three named ones and three that share their team (fish, cheese, thermometer / shoe, bench, tooth) — so the team alone never decides; the child must read the word. Only the named picture rises.

**Answer position.** Level 1: the right picture's table slot 2/2/2/2 per pass. Levels 2–4: the right pictures' slots are spread so each of the 6 table slots holds a right picture 3–5 times per 8 rounds; gate: no slot > 60 % "right" across the pass, and no round has all its right pictures in one row. Level 3: the right magnet for each picture alternates sides as above. Level 5: front/end gaps balanced (gate: each round ≥ 1 of each; across a pass 50 ± 10 %). A bot that drags everything into the zone gets every wrong picture shivering (a miss) — gathering all is never a strategy.

**Order:** order-only reshuffle per pass; table positions re-dealt per pass by the balanced table, never randomly.

## 7. Check, the misses, the success
- **Check (lever) with nothing in the zone:** hint, no miss — the empty hooks wiggle — "Bring the pictures that start with the sound of {M} under the magnet."
- **Miss 1** (a wrong picture in the zone, or a hook still empty): the magnet lifts the right ones; each wrong one shivers and slides back to the table; empty hooks stay. · wrong: "That one stayed down. Say its name: does it start with the sound of {M}?" · empty hook: "One hook is still empty. Find one more that starts with the sound of {M}."
- **Miss 2:** each picture still on the table shows its **first-letter tab** (a small cream tab on the card's top-left corner with the letter or team its name starts with, Baloo 2 22 px) — the child can now compare the tabs with the magnet's letter while saying the names. · "Look at the little letters. Which ones match the magnet?"
- **Team level misses:** a card under the wrong team magnet stays down, its gap still dark · miss 1 "That team does not fit there. Say the word and listen for the team." · miss 2: the gap's strip lights the word's other letters and the picture's speaker pulses; two magnets' discs pulse (the right one and the child's) · "Is it this team or that one?"
- **A new move takes the help away** (tabs vanish) until the next Check.
- **Success:** every hook full; the magnet gives one bright hum, the hanging pictures sway together, and their name strips unroll below them with the first letter (team) in coral, aligned under the magnet's letter. · "{monkey}, {mop}, {milk} — they all start with the sound of {M}!" · Two magnets: "{M} pulled {moose}, {mop}, {milk}. {N} pulled {nose}, {nest}, {net}." · Teams: "{ship}, {fish}, {tooth}: you found every team, at the front and at the end."

## 8. Settings
1. **Magnets** (level): One hook · Letter of the week · Two magnets · Which team? · Team in the word — each changes the board at rest (one or two magnets, the number of hooks, the team magnets with gapped word strips, the word magnets of Read and match).
2. **Letters:** Capital and small (default "Mm") · Capital ("M") · Small ("m") — the magnet disc changes at rest; the first-letter tabs and name strips follow (name strips always in normal spelling; de nouns keep their capital).

## 9. Words (EN source)
- title (shell, frozen): **Beginning Sounds** · instruction: "Gather the pictures that start with the magnet's sound, then switch it on."
- task lines: L1 "Which picture starts with the sound of {M}?" · L2 "Find {3} pictures that start with the sound of {M}." · L3 "Which magnet will pull each picture?" · L4 "Which letter team do you hear in each word?" · L5 "Put the right letter team into each word."
- hints/celebrations: §7 exactly. Lever aria: "Magnet switch", "Magnet on".
- settings: "Magnets", "One hook", "Letter of the week", "Two magnets", "Which team?", "Team in the word", "Letters", "Capital and small", "Capital", "Small". aria: "Picture: {name}", "Under the magnet", "On a hook", "{n} hooks empty", "Gap at the front", "Gap at the end".

**Locale traps (every round is authored per locale; the panel builds each locale's Level 2–5 tables from the library — EN is the template, not a translation):**
- **The primary sound:** only pictures whose first letter makes that letter's primary sound. Refused examples: en giraffe/gem (soft g), city/cereal (soft c), knife/wrap (silent), chef (ch = sh), **one**? (not a picture); es/it/pt cebra, cereza, cigno, girafa/jirafa for G (soft before e/i — es jirafa stays under **J**), es/fr/it/pt **h** is silent → no H magnet in es/fr/it/pt (fr "hibou" etc. never used); de **V** says /f/ (Vogel) → no V magnet in de; de **St/Sp** words (Stern, Spinne) start with /ʃt/ /ʃp/ → never under S; sv/no/da **k/g/sk** before soft vowels (sv kjol, gädda, sked) are not the primary sound → refused; nl **g** = /ɣ/ is its primary sound (fine), but nl "sch" words stay out of S rounds.
- **Voicing pairs per locale for Level 3:** de M/N, B/P, D/T, G/K, F/W (W = /v/), es M/N, B/P (b and v are one sound in es → **never a B/V pair**), D/T, L/R (r initial is the trill), fr M/N, B/P, D/T, F/V, G/K, L/R, it M/N, B/P, D/T, F/V, C/G hard, L/R, pt M/N, B/P, D/T, F/V, L/R, nl M/N, B/P, D/T, F/V, sv/da/no M/N, B/P, D/T, F/V, L/R, fi M/N, K/P, T/N, L/R, S/H (fi native words rarely begin with b d f g — no Finnish B/D/F/G magnets).
- **Letter teams per locale (Levels 4–5) — only teams that write ONE sound (critic):** de **sch, ch** (Schaf, Schuh, Fisch, Buch — `St`/`Sp` are TWO sounds, /ʃ/ + /t/, a spelling rule not a sound team, so never a team magnet), nl **ch, ng** (ng end only; nl `sch` is s + ch, two sounds, as `sound-boxes-bank-nl.json` splits schip s|ch|i|p — never a team magnet), fr **ch, ou, on** (chat, loup, ballon), es **ch, ll, qu** (chocolate→ only pictures: leche, llave, queso, silla), it **ch, gn, sc** (chiave, ragno? → only library pictures; it **gn/sc** before i/e), pt **ch, lh, nh** (chave, folha, ninho — lh/nh never at the front, so pt Level 5 uses middle gaps too and its "front or end" becomes "where in the word"), sv **sj, sk (before soft vowels), tj, ng** (only where pictures exist; the panel decides), da **sj, ng** (Danish `sk` is two sounds, s + k — never a team), no **kj, skj / sk before i y øy, ng** (only library pictures), **fi has no letter teams** → fi offers Levels 1–3 only (the setting list hides 4–5; the gate allows fi's shorter list).
- **Capital letters:** de nouns are capitalised in the name strip ("Maus") even in the "Small" setting; the magnet disc follows the setting.
- **Picture names:** the name strip is the `image-vocabulary.js` label in the locale (singular, no article); a picture is used only if THAT label starts with the round's sound (en "monkey" may be fr "singe" — so fr M rounds use other pictures).
- Sound off: the hooks, the lift, the shiver, the first-letter tabs and the name strips carry everything; TTS (picture names) is a bonus.

## 10. Sound off, access, phones
- **Silent legibility:** the magnet's letter, the hooks to fill, which pictures rise, the tabs at miss 2, the name strips at success.
- **Keyboard:** Tab through table pictures; Enter moves a picture into the (focused) zone and back; in two-magnet levels Left/Right picks the zone; Space flips the lever; team levels: keys 1/2/3 send the focused card (or picture) to the first/second/third magnet's zone.
- **aria-live:** "Moose went up onto the magnet. Nose stayed down." / "All hooks are full."
- **Taps:** cards ≥ 72 px (two-magnet phone), word cards with strips ≥ 104 × 120 (88 × 104 at 360), lever 40 × 90 hit area; everything ≥ 44 px.
- **Pictures:** 112 px at 704, 88 px at 360, ≥ 64 px everywhere.
- **Phone layout:** stacked; magnet smaller above the table; bubble under the table; Check above both folds in every level (measured).

## 11. Distinct from
- **Premium `letter-tiles`** (magnetic letters you place on a board) — those magnets are letters to build words; here the magnet is a SOUND that decides which pictures it pulls; no word building except the team gaps.
- **Premium `sorting-hoops`** (hidden rule, hoops) — no hidden rule here; the rule is the letter shown.
- **Row 55 Coco's Pop-Up Sound Boxes** (batch 09; also maps G1-380/392/393/394 and G1-311, by lids popping where sounds match), **Row 58 The Word Elastic** and **New 214 The Bumpy Slide** (this batch) — none uses a powered pull that accepts or leaves pictures.
- **Other magnets:** **Row 54 The Blending Magnets** (batch 09: two bar magnets on a rail snap together when the gap — the pause — closes) and **Row 77 The Magnet Plates** (order plates that repel unless "and" joins them) use attraction/repulsion between two pieces; here a horseshoe magnet is a FILTER that lifts only what starts with its sound. The bar-magnet tiles of the first draft were removed so no piece here snaps to another piece.
- **Built registry:** no magnet; #17 Partner Bows pairs things; #13 Roll Book calls a roll — not first sounds.

## 12. Build plan
- **Core state** `{locale, level, lettersMode, round:{magnets:[{label, hooks}], cards:[{id, pic, name, first, team, teamPos, belongsTo}], strips?:[{word, gapAt, gapLen, team}]}, zone:{magnetIdx:[cardId]}, hung:{magnetIdx:[cardId]}, misses, help}`.
- **Functions:** `toZone(cardId, magnetIdx)`, `toTable(cardId)`, `flip()` → `{ok, lifted:[{card, magnet}], stayed:[card], emptyHooks:[{magnet, n}], teamWrong:[card]}`, `tabsVisible()`.
- **Gate's own ground truth** (`verify-letter-magnet-core.js`): its own per-locale first-sound table (letter → allowed initial spellings, and refused spellings: soft c/g, silent h, de V/St/Sp, sv soft k/g/sk, en kn/wr/ch-as-sh); for each card it derives the first sound from the locale label itself and asserts `belongsTo` matches; exactly `hooks` right cards per magnet; Level-2 "others" contain no card whose label starts with the magnet's letter; Level-3 pairs are the locale's allowed voicing pairs (es never B/V); Level-4 cards contain their team per the gate's team table; Level-5 strips: `strip.word.replace(gap, team) === label`, front/end balance; slot balance (no slot > 60 % right, no round with all right cards in one row); every picture exists, colour theme; `giraffe` never under G, `chef` never under ch, `theater` never used; fi levels ≤ 3.
- **Mutations:** lift a wrong picture · leave a right picture down · lift by meaning tag instead of first sound (use `theme`) · show the first-letter tabs at miss 1 · keep tabs after a new move · two-magnet level ignores which zone a card is in · a card lifted under the wrong team magnet · Read-and-match lifts a picture that only shares the team · Level-5 all gaps at the front · hooks count ≠ right cards · es B/V pair present · giraffe under G · fruits/cherry or fruits/peach referenced · de St or nl sch used as a team · right cards all in the top row.
- **Pictures to view on contact sheets before build:** zoo-animals (monkey, seal, lion, cheetah), animals (moose, panda, horse, zebra, owl), clothing (shirt, shoe), farm-animals (sheep, goat, chick, chicken, hen, duck), body-parts (nose, tooth, mouth), weather/thermometer, spring/nest, music (violin, guitar), around-the-house (door, gate, vase, shovel, brush, fork, mop, pen, fan — seen), fruits (pear, cherry, peach, lemon, banana), toys (ball, car), miscellaneous/leaf, tools/hammer. Refused already: activities/theater, occupations/chef, kitchen-tools/pan, fruits/cherry, fruits/peach, farm-animals/chicken, zoo-animals/cheetah. Seen 2026-10-17: zoo-animals (monkey, seal, lion), around-the-house (door, gate, vase, shovel, brush, fork, mop, pen, fan).
- **Risks:** some locales' Level 5 may be thin (pt lh/nh, sv soft sounds) — the panel may shorten a level to 7 rounds; the gate refuses < 7.
- **Blocked:** none.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — a lever, a humming magnet and pictures that fly up with a clack; the switch is irresistible.
2. **Would a teacher put it on the board?** Yes — "the M magnet only pulls pictures that start with mmm" is a whole-class routine; the two-magnet rounds are exactly the hear-the-difference pairs, and the hooks show how many to find.
3. **Would a parent trust it?** Yes — real pictures, each language's true first sounds (no soft-g traps), calm feedback that shows rather than scolds.
4. **The invention:** the letter is a magnet that only pulls pictures whose names start with its sound — gather, switch on, and the magnet decides.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 3→5 · distinctness 3→5 · reality 3→5
What changed:
- False sound claims removed: de St/Sp (two sounds), nl sch (s + ch, as the nl bank splits it) and da sk (s + k) are no longer team magnets; no's skj/kj and sv sj/tj/soft sk kept.
- Pictures: fruits/cherry (an apple) → at-the-supermarket/cherry; fruits/peach (an apple) → furniture/bench and accessories/watch; farm-animals/chicken (the hen drawing) and zoo-animals/cheetah (a leopard twin — seen) refused; bed re-pointed to around-the-house.
- The bar-magnet tiles (a second magnet toy that snapped into gaps, too close to Row 54's snapping magnets) are gone: Level 5 now uses the same lift — a card under the right team magnet rises and the team drops into its gap; Read-and-match uses word magnets that lift only the picture they name, with team-sharing decoys so the team alone never decides (no longer the Sticky-Name-Tag 'strip under picture' move).
- Distinct-from now names 054 Blending Magnets and 077 Magnet Plates and says why a filter magnet is a different invention.
