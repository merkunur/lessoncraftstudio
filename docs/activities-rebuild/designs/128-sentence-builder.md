# Row 128 — The Sentence Stage (L.1.1.j)

## 0. Identity
- id `sentence-builder.build-a-sentence.l-1-1-j` (KEPT) · grade 1 · Common Core L.1.1.j (produce and expand complete simple and compound declarative, interrogative, imperative, and exclamatory sentences) and L.K.1.b (nouns and verbs) · strand Language · page title (frozen) "Wiggles' Sentence Builder — Build a Sentence (Grade 1)" · own files `mini tools/sentence-stage-core.js`, `sentence-stage-activity.js`, `sentence-stage-activity.html`; the manifest row stays in `sentence-builder-activities.json` (id, slugs en/de/fr/es/pt/it/nl/sv, title, intro frozen), `tool` repointed; `sentence-builder-core.js` untouched. New da/no/fi metadata at build.
- worksheets it covers: **G1-249** Unscramble the Sentence · **G1-282** Unscramble the Sentence: With Clues · **G1-283** Unscramble the Sentence: No Clues · **G1-302** Unscramble the Sentence: Find the Beginning · **G2-278** Write About the Picture · **G2-299** Write About the Picture: What You See · **G2-300** Write About the Picture: Your Own Words.
- what the old activity did: four scrambled word tiles (*runs. / big / The / dog*), tap them into order; the subject's library picture shown. **Kept:** every canonical sentence of every locale (en *The big dog runs. / A little cat naps. / The hot sun shines. / Six brown hens peck. / The fast bus stops. / My green frog hops. / The pink pig digs. (live; was *wet*) / Two black bats fly. / The old van honks.*; de/fr/es/pt/it/nl/sv lists) and their library subjects; the seeds (deterministic scrambles). **Fixed at source (a colour word must be true of the picture) — ALREADY FIXED LIVE by the orchestrator 2026-10-17 (commit 6ae3148a), and this design now matches the live data exactly:** `vehicles/bus` is **blue** (de *Der blaue Bus fährt.*, fr *Le bus bleu roule.*, es *El camión azul avanza.* — es-MX *camión* = bus, pt *O ônibus azul anda.*, it *Il pulmino blu parte.*, sv *En blå buss tutar.*); `animals/cat` is an **orange tabby** (fr *Le chat roux dort.*, es *La gata naranja*, pt *A gata laranja*, it *La gatta arancione*); the hen is **white with a brown wing** — `birds-2/hen` in en/de/fr/nl/sv/da/no/fi and `farm-animals/hen` (all white) in es/pt/it — so every locale says WHITE (en *Six white hens peck.*, de *Die weiße Henne pickt.*, fr *La poule blanche picore.*, nl *De witte kip pikt.*, sv *En vit höna pickar.*); `spring/flower` is **red** (de *Die rote Blume blüht.*, fr *La fleur rouge pousse.*, es *La flor roja*, pt *A flor vermelha*, it *Il fiore rosso*, sv *En röd blomma doftar.*); `animals/pig` is **pink** (en *The pink pig digs.* — the old *wet* replaced; fr/es/pt/it/nl/sv *rose/rosa/roze*). ⚠ One live attribute still contradicts its picture (critic 2026-10-17): sv *En randig fisk simmar.* — `animals/fish` is red-orange with patches, not striped (*randig*); reported to the orchestrator for an immediate live fix to *En röd fisk simmar.* (this design uses *röd*).

## 1. The pitch
"The sentence is a script and the stage acts it out word by word — the capital word opens the curtain, *big* makes the spotlight big, *dog* brings the dog on, *runs* makes it run, the full stop closes the curtain — and the show stops dead at the first word that is in the wrong place."

## 2. Why a child will want it again (the fun)
- **A toy theatre.** The top of the stage is a little proscenium: two drawn curtains (rounded rectangles in coral, with fold lines), a floorboard stage, a single spotlight rig. Below it lies the **script line**: a row of empty word slots.
- **Words that do things.** Word blocks wait in the wings (the tray). Lay them on the script line and press Check: the stage plays the script. A reading light sweeps along the script left to right and every word *acts*:
  - **The** (or *A*, *My*) — a round spotlight clicks on, empty;
  - **Two / Six** — that many spotlights;
  - **big / little** — the spotlight swells or shrinks; **brown / green / black / white / pink** — the spotlight's pool takes that colour; **hot / old / fast** — a small effect (warm shimmer / drops / a dusty haze / speed lines — all drawn geometry);
  - **dog** — the library dog drops into the spotlight (one per spotlight);
  - **runs** — the dog runs across the stage; *naps* — it tilts and the light dims; *shines* — the sun glows; *pecks* — the hens dip; *hops* — the frog bounces; *flies* — the bats rise; *honks* — the van shakes; *digs* — the pig wiggles down;
  - **the full stop** — the curtains swish shut.
- **The freeze.** If a word is out of place, the play runs up to it and stops: the reading light flickers on that block, the actor freezes mid-step, a soft *bonk*. *The dog big runs* — the dog has walked on, and *big* has nothing left to make big; the show freezes at *big*. The child sees exactly where the sentence broke.
- **Curtain call.** A finished sentence plays all the way: curtains close, then reopen for a bow (the actor bobs twice), and the sentence is pinned to the theatre's poster board beside the stage (a small strip). After a pass the poster board shows the whole programme.
- **Write about the picture.** In the last level a framed library photo hangs beside the stage; the child writes their own sentence from a word bank, and the stage acts it out next to the photo — when what the stage shows matches the photo, the photo and the stage light up together.
- No timer, score, streak or lives.

## 3. The skill and the misconception
- **Skill:** a complete sentence starts with a capital letter, has a naming part (noun) and a doing part (verb), puts the words in the language's order, and ends with an end mark (. ? !); scrambled words can be put in order; a picture can be described in a complete sentence using a word bank and a starter.
- **Misconception 1 — any order is fine if all the words are there.** The play acts word by word; a describing word after its noun in English has nothing to act on; a verb before any actor has nobody to do it. The show freezes at the first misplaced word.
- **Misconception 2 — the capital is decoration / the first tile is the start.** Only a word with a capital can open the curtain (G1-302 "find the beginning"): the reading light will not start on a lowercase word; the scramble often puts the capital word last, so "take the first tile" fails.
- **Misconception 3 — no end mark.** Without the full stop the curtains never close: the actor keeps going round and round in the light, and the bow never comes.
- **Misconception 4 — a sentence fragment is a sentence** (*The big dog.*). With no verb the dog stands in the light, waiting; nothing happens; the curtain closes on a still stage — and the hint names the missing doing word.
- **Misconception 5 (write about the picture) — writing something that is not in the picture.** The stage shows what the sentence says; if it says *green dog*, the spotlight pool turns green under a brown dog, beside a photo that has none.

## 4. The stage
**Layout: stacked at every width** (layout check 2026-10-17: no `layout:'split'` — its stage column is only ≈ 370 px at 704, too narrow for this apparatus). The stage takes the full card width, ≈ 648 px at 704 (≈ 656 at 1024); whatever §4 places in a left, right, side or bubble column stays side by side inside the stage when the activity draws it, while the shell's bubble, keypad and Check sit under the stage. Sizes written for a wider stage fit the 648 px by closing margins and gaps first; no picture drops below 96 px, no tap below 44, no data mark or grid cell below 40.

**At 704 px** (stage 480 × 470):
- **The theatre** (y 0–260): proscenium frame 464 × 250 (drawn: 6 px ink frame, top valance with scallops), curtains open by default; stage floor (cream boards). **The actor: the round's library picture, 128 px** (number words: up to 6 instances at 72 px in a row of spotlights; *Two* = 2 × 112 px). Spotlight pools are ellipses 140 × 40 on the floor.
- **The script line** (y 280–350): a wooden rail 464 × 70 with N slots (N = words + the end mark when separate), each slot 96 × 56; filled slots hold blocks.
- **The wings / word tray** (y 364–470): the scrambled blocks (Baloo 2, 28 px; 96 × 56, at most 6 per row, two rows max). The capital is shown as written (*The*); the end mark is its own block (· ? !) from level 3 on (levels 1–2 attach it to the last word, as the old canonical did: *runs.*).
- **Level 5 picture frame** (right column top, 200 × 170): the framed library photo (**128 px** picture) the child writes about.
- **Task line** above (≤ 24 px). **Bubble** under the poster board.

**At 360 px** (stacked; stage 360 × 580): theatre 344 × 200 (actor **96 px**, six-actor rounds 52 px — the six-hens round shows two rows of three at 64 px); script line 344 × 64 (slots 72 × 50, 24 px words; 5+ words wrap the rail onto two rows); tray 344 × 120 (blocks 72 × 48); level-5 photo above the theatre (96 px); Check below. Check bottom ≤ 710 at 360 × 740, ≤ 630 at 320 × 640 (at 320 the valance hides; actor 80 px).

No words on the apparatus except content (the word blocks, the end marks).

## 5. The hand
- **Lay a block:** drag from the wings to any slot (or tap a block → it fills the first empty slot, 180 ms). Drop on a filled slot → the blocks swap. Drag a block back to the wings to remove it.
- **Preview a word (free play):** tap a block in the wings → it acts alone for 1 s on the empty stage (*big* swells an empty spotlight; *dog* brings the dog on and off; *runs* makes a dotted runner streak; *.* swishes the curtains). Children learn what each kind of word does.
- **Play (Check):** the reading light sweeps the script at 450 ms per word; each word's act (200–400 ms) begins as the light reaches it; a freeze stops the sweep there (§7).
- **Replay:** after success, tapping the stage replays the whole show.
- **Level 5 (write):** drag a starter (optional) and bank words onto the script line; extra words stay in the wings.

## 6. The rounds
One round = one sentence to build (levels 1–4) or one picture to write about (level 5).

**Level 1 — With clues (G1-282, G1-249), 9 rounds.** The actor is visible on the stage from the start (the clue); end mark attached to the last word.

| # | blocks (scrambled by seed) | canonical | actor | the act |
|---|---|---|---|---|
| 1 | runs. / big / The / dog | The big dog runs. | animals/dog | big spotlight, dog runs |
| 2 | naps. / cat / little / A | A little cat naps. | animals/cat | small spotlight, cat tilts, light dims |
| 3 | sun / shines. / The / hot | The hot sun shines. | beach/sun | warm shimmer, sun glows |
| 4 | hens / peck. / Six / white | Six white hens peck. | birds-2/hen (white, brown wing — as live) | six spotlights, hens dip |
| 5 | stops. / The / bus / fast | The fast bus stops. | vehicles/bus | speed lines, bus slides then stops |
| 6 | green / hops. / frog / My | My green frog hops. | camping/frog | green pool, frog bounces |
| 7 | pig / The / digs. / pink | The pink pig digs. | animals/pig | pink pool, pig wiggles down |
| 8 | bats / black / Two / fly. | Two black bats fly. | animals/bat | two dark pools, bats rise |
| 9 | old / honks. / van / The | The old van honks. | vehicles/van | dusty haze, van shakes |

(Rows 4 and 7 are exactly the live canonicals after today's fix: *Six white hens peck.* on `birds-2/hen`, *The pink pig digs.* on `animals/pig`. `farm-animals/hen` is the same white bird and may replace it if a pass needs the farm sheet; `birds-2/hen` carries a brown wing, so the word is *white*, never *brown*.) **Scrambles:** the old seeds, re-drawn where needed so that (a) the scramble is never the canonical order, (b) the capital word is NOT in the first tray position in at least 6 of 9 rounds, (c) the end-mark word is not in the last position in at least 6 of 9.

**Level 2 — No clues (G1-283), 9 rounds.** Same mechanic; the stage is EMPTY until the noun acts — the child has to read the words, not the picture. New sentences (one per kind of act): The little bird sings. (spring/bird) · A big cow eats. (farm-animals/cow — white with brown patches, so no colour word) · Three red apples fall. (at-the-supermarket/apple — red on the sheet) · The happy duck swims. (farm-animals/duck) · My big kite flies. (toys/kite — it is red AND yellow, so the draft's *yellow kite* was half-false) · The small mouse hides. (forest-creatures/mouse) · Two brown horses run. (farm-animals/horse — brown) · The white goose honks. (farm-animals/goose — white; the draft's *pink pig* duplicated level 1's subject) · A white sheep sleeps. (farm-animals/sheep — white). Every colour word is checked against the picture in the gate's per-picture colour list (§12).

**Level 3 — Find the beginning and the end (G1-302), 9 rounds.** The end mark is its own block (`.`); five to six blocks; the start word carries the only capital. Five words plus the end mark, so the order puzzle grows (a doing-word helper — *fast, today, now, again, away* — acts as a little flourish after the verb): The big dog runs fast. · A little cat naps today. · The hot sun shines again. · My green frog hops away. · The fast bus stops now. · The pink pig digs again. · Two black bats fly away. · The old van honks now. · The little bird sings today.

**Level 4 — Ask and shout (L.1.1.j interrogative/exclamatory), 9 rounds.** End blocks `?` and `!` join `.`. Questions change the order: *Can the dog run?* — on stage the dog steps forward, stops and looks out (a question pause: it tilts, two soft beeps); *The dog runs so fast!* — the run plays twice as big with a burst of drawn stars; `?` on a statement order (*The dog can run?*) is accepted only where the language allows intonation questions — in en grade 1 it is refused (the round's canonical decides). Rounds: Can the cat jump? · Is the sun hot? · Can the frog hop? · Does the bus stop? · The bats fly so high! · The dog runs so fast! · Can the hens peck? · The pig digs so deep! · Is the van old?

**Level 5 — Write about the picture (G2-278, G2-299, G2-300), 9 rounds.** A library photo in the frame (one subject, clear colour, clear action implied by the picture): activities/running (a girl in red running — TRUE adj {little, happy}, verb {runs}) · farm-animals/duck (yellow — {yellow, little}, {swims, walks}) · animals/dog (brown and white — {brown, happy, little}, {runs, sits}) · toys/kite (red and yellow — {red, yellow, big}, {flies}) · beach/sun ({yellow, hot, big}, {shines}) · vehicles/bus (blue — {blue, big}, {stops, drives}) · farm-animals/sheep (white — {white, woolly, little}, {eats, stands}) · forest-creatures/snail (orange-red shell — {little, slow}, {crawls}) · farm-animals/horse (brown — {brown, big}, {runs, stands}). The false describing words are plainly false of the photo (never a shade argument: no *orange* for the red apple, no *grey* for the blue bus). The bank: 2 starters (*I see / Look at* — G2-299 "what you see"; starters can be skipped — G2-300 "your own words"), 3 determiners/numbers (*a, the, two*), 4 describing words (2 true of the picture, 2 false), 2 nouns (1 true), 3 verbs (1–2 true), end marks. **Right = the stage matches the photo:** the noun is the photo's, the number is right (*a/the* = 1), every describing word is in the round's TRUE set, the verb is in the TRUE set, the sentence plays without a freeze and ends with an end mark. Many sentences are right (*The yellow duck swims.* / *I see a yellow duck.* / *Look at the little duck!*); the TRUE sets are authored per picture and checked by the reviewer. Starter sentences have their own acts: *I see* opens the curtain and points the spotlight at the photo; *Look at* swings the spotlight onto the stage.

**Answer position.** Unscramble rounds: the scramble constraints in level 1 (above) apply to every level; the gate measures bots: *keep the given order* (0/9), *capital first, end mark last, rest as given* (≤ 1/9 per level), *capital first, then shortest to longest* (≤ 1/9). Level 5: the bank order is shuffled; the bot *first starter + first det + first adj + first noun + first verb + .* must be right in ≤ 2/9 (true/false words are shuffled independently).
**Order:** order-only reshuffle per pass.

## 7. Check, the misses, the success
- **Check with an empty script:** hint, no miss — "Put the words on the script line. Which word can open the curtain?"
- **Miss 1:** the show plays and freezes at the first misplaced word; that block flickers; the stage shows the frozen moment:
  - *lowercase start:* the reading light will not start; the first slot's block shakes · "The curtain only opens for a word with a capital letter."
  - *describing word after its noun (en/de/nl/sv/da/no):* the actor is on stage, the describing word has nothing to act on · "{word} tells about the {noun}. Put it before the {noun}." (fr/es/it/pt: the reverse rule for colour adjectives — §9)
  - *verb before the actor:* the doing-light flashes on an empty stage · "Who is doing it? Bring the actor on first."
  - *missing end mark / end mark not last:* the actor keeps going round in the light, curtains stay open · "How does the show end? The full stop closes the curtain."
  - *level 5, false word:* the stage acts it (green pool under a brown dog) beside the photo; the false word's block and the photo both pulse · "Look at the photo. Is the dog green?"
- **Miss 2:** the next right block (the one that belongs in the frozen slot) lifts 6 px in the wings with a teal glow; in level 5 the true words in the bank get a faint teal underline · "Try the glowing word here."
- **A new move takes the help away** until the next Check.
- **Success:** the whole show plays, the curtains close, reopen for a bow, the sentence flies to the poster board · en "The big dog runs. — a capital to start, a dog, what it does, and a full stop!" (level 4: "Can the cat jump? — a question ends with a question mark!"; level 5: "The yellow duck swims. — that's just what the picture shows!")

## 8. Settings
1. **Sentences:** With clues (L1) · No clues (L2) · Beginning and end (L3) · Ask and shout (L4) · About the picture (L5) — the level picker; the stage at rest shows the actor (L1), an empty stage (L2–4) or the photo frame (L5).
2. **Speed of the show:** Slow (default, 450 ms a word) · Quick (250 ms) — the reading light's pace (slow lets a beginner read along; quick for confident readers); a visible metronome dot on the rail shows the speed at rest.

## 9. Words (EN source)
- title (shell): **Wiggles' Sentence Builder** (frozen) · instruction: "Put the words in order, then watch the stage act out your sentence."
- task lines: L1 "Build the sentence. The stage will act it out." · L2 "Build it — who will come on stage?" · L3 "Find the start and the end." · L4 "Ask it or shout it." · L5 "Write a sentence about the picture."
- hints and celebrations: §7 exactly.
- settings: "Sentences", "With clues", "No clues", "Beginning and end", "Ask and shout", "About the picture", "Speed of the show", "Slow", "Quick"
- aria: "Script: {words in slots}", "Block {word}", "The stage: {what happened}", "The show stopped at {word}."

**Locale traps (canonical sentences literal per locale; word-order templates per locale drive the freeze):**
- **Adjective position.** en/de/nl/sv/da/no/fi: before the noun. fr/es/it/pt: colour and most adjectives AFTER the noun (*Le chien brun aboie*, *El perro café ladra*) while *petit/grand, pequeño, piccolo* often go before — each round's canonical order decides, and the per-locale template allows the act to run in that language's order (in fr *brun* acting after *chien* is correct and tints the dog's pool).
- **Agreement shows on the blocks** (de *große/großen*, fr *verte* for *grenouille*, es *gata naranja*): blocks are whole words from the canonical — nothing is assembled.
- **German nouns are capitalised everywhere** — so in de "find the beginning" cannot be "the only capital": the start word is the one that ALSO comes first in meaning; the level-3 de rounds start with a determiner (*Der*), whose capital is the only capital on a NON-noun — the hint for de says "Welches Wort fängt den Satz an?" and the curtain opens for the capitalised determiner, never for a capitalised noun in first place unless the canonical starts with it. sv/da/no/fi/nl: only the first word and names are capitalised.
- **Questions:** en inverts with do/can/is (*Can the cat jump?*); de/nl/sv/da/no/fi invert the verb (*Springt die Katze?*, *Hoppar katten?*); fr uses *Est-ce que…?* or inversion — grade-1 fr uses *Est-ce que le chat saute ?* (multi-word block *Est-ce que*); es/pt/it ask by intonation with the same order (*¿El gato salta?*) — es needs the opening **¿** and **¡** blocks at the start AND the closing marks at the end. fr typography puts a space before ? and ! (rendered with a thin no-break space inside the block).
- **fi**: free word order exists, but the canonical SVO with adjective before noun is the one taught and the only one accepted; plural numerals take the partitive singular (*kaksi mustaa lepakkoa*) — blocks are literal.
- **Colour words must be true of the picture in every locale** (§0 fixes); the gate checks each round's colour word against a per-picture colour list the build records from the contact sheet.
- Sound off: the acted stage carries the meaning; TTS reads the finished sentence only.

## 10. Sound off, access, phones
- Silent legibility: the stage acts every word; the freeze shows exactly where the order broke; the curtains show the end mark.
- Keyboard: Tab through wing blocks, Enter puts one in the next empty slot; Tab to a slot block, ←/→ moves it; Backspace returns it; Enter on the stage replays.
- aria-live: "The show stopped at big. The dog is already on stage." / "The curtains closed. The big dog runs."
- Taps: blocks 96 × 56 (72 × 48 at 360); slots accept drops in their full 96 × 56 (72 × 50).
- Pictures: actor 128 px at 704, 96 px at 360 (multi-actor rounds ≥ 64 px at 360 — the six-hens round wraps to two rows of three at 64 px); level-5 photo 128 / 96.
- Phone: stacked; the script rail wraps to two rows for 5+ words; the poster board becomes a strip of small icons under the stage.

## 11. Distinct from
- **Row 73 Writing Carriage, New 218 Word Ribbon** — writing letters left to right on a moving line; here whole words are ordered and the stage acts them.
- **New 211 Toy Box Room** (put a toy where the word says) — a position word acts on one toy; here every word in a sentence acts in sequence and order is the skill.
- **Tool reading-easel** (scoop a line into phrases) and **story-line** (order story beats) — no word-by-word acting and no freeze.
- **#10 Animal Train** — counting carriages; no relation despite "a row of slots".
- No instrument acts out a sentence word by word and stops at the first misplaced word.

## 12. Build plan
- **Data:** per locale, levels of rounds `{id, seed, canonical:[{w, role:'det'|'num'|'adj'|'noun'|'verb'|'adv'|'start'|'end'|'q'|'excl', act?}], actor:{key, n}, colourTruth?}`; per-locale order templates (en `start? det|num adj* noun verb adv? end`; fr `det noun adj* verb … end` with a pre-noun list for *petit, grand, bon, beau*; es/it/pt similar; question templates per locale); level 5 `{photoKey, truthSets:{noun, n, adj[], verb[]}, bank:[…]}`.
- **Core state:** `{level, round, slots:[], wings:[], speed, misses}`; functions `put(b, i)`, `take(i)`, `swap(i, j)`, `play()` → `[{word, act, ok}]` up to the first `ok:false` (pure: walks the slots against the template and the canonical), `check()` → `{ok, frozenAt, reason}`; level 5 `check()` validates template + truth sets.
- **Gate's own ground truth** (`verify-sentence-stage-core.js`): it re-derives correctness from its own copy of each canonical (levels 1–4: slots === canonical; the freeze index = first index where slots differ AND the template rejects) and asserts: `play()` never freezes on the canonical; it freezes exactly at the first divergent word for 200 random permutations per round; a lowercase start never opens the curtain; no end mark → no curtain close; scramble constraints (never canonical, capital-first ≤ 3/9, end-last ≤ 3/9); bots under caps; every colour word is in its picture's recorded colour list (the §0 fixes are asserted: no *gelbe Bus*, no *bus rouge*, no *chat noir*); es questions carry both ¿ and ?; level-5 truth sets non-empty and every bank false word is NOT in the truth set; every picture exists.
- **Mutations:** play accepts adjective-after-noun in en · play rejects post-nominal colour in fr · lowercase start opens the curtain · missing end mark closes the curtain · scramble equals canonical · capital always first in the tray · level 5 accepts a false colour word · es question without ¿ accepted · colour truth check removed (the *gelbe Bus* returns).
- **Pictures** (critic, contact sheets 2026-10-17; every key exists): vehicles bus (blue/grey), van (orange/cream), school_bus (yellow, printed English — never used); farm-animals hen (white), cow (white, brown patches), duck (yellow), horse (brown), sheep (white), goose (white); birds-2/hen (white with a brown striped wing — *white*); animals dog (orange-brown and white), cat (orange tabby), bat (dark grey, pink wings — *black* is acceptable for a dark bat; the gate's colour list records {black, grey}), pig (pink), fish (red-orange with patches — not striped); camping/frog (green, spotted); beach/sun (yellow-orange); spring/bird (orange breast, dark wings); spring/flower (RED); toys/kite (red and yellow); forest-creatures mouse (blue-grey), snail; at-the-supermarket/apple (red); activities/running (a girl in a red top).
- **Risks:** six actors at 360 (two rows of three at 64 px) must fit the 200 px theatre — the multi-actor rounds raise the theatre to 230 px at 360. The live colour defects are fixed in the CURRENT activity's data the moment this design is accepted (standing rule), independent of the rebuild.
- **Blocked:** none.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — a toy theatre where your words make a dog run, a spotlight swell and the curtains close, and a show that freezes, comically, at the word you put in the wrong place.
2. **Would a teacher put it on the board?** Yes — "a sentence is a script: it needs someone, something they do, a capital to start and a full stop to end" is acted out live; the freeze points at the exact error; the write-about-the-picture level checks truth against the photo.
3. **Would a parent trust it?** Yes — real sentences in their language's own word order, colour words that are true of the picture (fixed where the old ones were not), no scores.
4. **The invention:** the stage acts out the sentence word by word — the capital opens the curtain, the full stop closes it — and the show freezes at the first word in the wrong place.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 4→5 · distinctness 5→5 · reality 3→5
What changed:
- **Made consistent with today's live colour fix:** §0 now records the fixes as done and lists the live wording per locale (bus blue, cat orange/roux, hen white, flower red, pig pink); level 1 rows 4 and 7 are the live canonicals (*Six white hens peck.* on birds-2/hen, *The pink pig digs.*), and the knock-on *wet pig* sentences in levels 3 and 4 follow.
- **Two more false/half-false attributes removed from level 2:** *My yellow kite* (the kite is red and yellow) → *My big kite*; level 2 no longer repeats the pink pig (→ *The white goose honks.*).
- **One live defect found that the colour sweep missed:** sv *En randig fisk simmar.* — the fish has patches, not stripes. Reported for an immediate live fix (*En röd fisk*); appended to PICTURE-RULINGS.
- **Level 5 made buildable:** every photo now has its TRUE describing-word and verb sets written out, and the false words are required to be plainly false (no shade arguments).
- Layout check (2026-10-17): switched to stacked — split stage column is ~370 px at 704.
