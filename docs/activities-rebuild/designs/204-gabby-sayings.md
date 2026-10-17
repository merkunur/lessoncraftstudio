# Row 204 — Gabby's Funny Sayings: THE WORD-FOR-WORD PROJECTOR AND THE CLUE BRIDGE (L.3.5.a)

## 0. Identity
- id `gabby-sayings.idioms.l-3-5-a` (KEPT; slugs, titles, intros frozen en/de/fr/es/pt/it/nl; sv/da/no/fi slug, title and intro are new at build, grade 3) · grade 3 · CCSS L.3.5.a ("distinguish the literal and nonliteral meanings of words and phrases in context") · strand Language.
- own files at rebuild: `gabby-sayings-core.js` (replaces the use of `idiom-meaning-core.js` for this row; that core is left untouched), `gabby-sayings-activity.js`, `.html`, `gabby-sayings-activities.json`. 0 lines to `lcs-shell.*`.
- worksheets: none mapped.
- **old activity:** read a sentence containing an idiom, tap one of three cards (real meaning / literal reading / off meaning), Check. A hand-drawn SVG goose. 8 rounds in en/de/es/pt/it/nl, 9 in fr; no sv/da/no/fi rounds.
- **kept:** every idiom in every locale (en 8, de 8, fr 9, es 8, pt 8, it 8, nl 8) and the three-kind structure (correct / literal / off) — the literal foil is the heart of L.3.5.a. **changed:** the cards become phrase strips that slot INTO the sentence (substitution test); each sentence gains a context clue that rules out the off meaning; a projector draws the words literally from library pictures; a second level asks which of two sentences uses the same words for real. **dropped:** the drawn goose (Gabby is now the library farm-animals/goose), "a couch potato" (en; it asked children to call a brother lazy) — replaced.

## 1. The pitch
"Gabby's projector draws exactly what the words say — so when you slot a meaning into the sentence, a meaning that just repeats the words gets the same silly picture, and a meaning that doesn't fit the story snaps the clue bridge."

## 2. Why a child will want it again
- **The silly projector.** Above the sentence stands an old-fashioned projector screen. While the saying sits in the sentence, the screen plays what the words *literally* say, made from library pictures: cats and dogs drifting down out of a rain cloud, a horse being held, butterflies fluttering, a cat climbing out of a bag. It plays inside a puffy cloud-shaped frame — the "pretend" frame. Children laugh before they've even read the options.
- **The slot.** The saying in the sentence is a coral tile you can pull out. Drag a meaning strip into its place and the sentence closes around it and reads itself (highlighted word by word; TTS in the five reliable locales). You hear and see your own sentence.
- **The clue bridge.** One clue phrase in the sentence is underlined in teal. On Check a little rope bridge swings from the clue to your strip: if your meaning fits the story, it holds firm with a soft *twang*; if it doesn't, the planks crack in the middle and the halves droop.
- **Gabby** (the library goose) stands beside the projector and flaps happily (a scale-and-tilt bounce) when the bridge holds and the screen switches from the cloud frame to a solid "real life" frame.
- **Free play:** after a round, any strip can be slotted in to watch what the projector and bridge do with it; the saying tile can be put back to replay the silly film.
- No timer, score, streak or lives.

## 3. The skill and the misconception
- **Skill (L.3.5.a):** tell the literal meaning of a phrase (what the words say) from its nonliteral meaning (what the speaker means), using the context.
- **Misconceptions and the pushback:**
  1. *Taking the saying literally.* The literal strip ("cats and dogs falling from the sky") makes the projector show the very same film as the saying itself, and the strip and the saying tile glow in sync with their shared words lit — it is *the words again*, and the cloud frame says "pretend". The apparatus shows that a literal reading changes nothing.
  2. *Picking a meaning that ignores the story* (the off strip, e.g. "a warm, sunny day" when Mom grabbed her umbrella). The clue bridge cracks: the story's own words reject it.
  3. *Thinking a phrase is always a saying* (level 2). "A piece of cake" is literal at Grandma's birthday table and figurative about a spelling test. The projector shows the SAME picture for both sentences — only the story decides which one it fits.

## 4. The stage
**Layout: stacked at every width** (layout check 2026-10-17: no `layout:'split'` — its stage column is only ≈ 370 px at 704, too narrow for this apparatus). The stage takes the full card width, ≈ 648 px at 704 (≈ 656 at 1024); whatever §4 places in a left, right, side or bubble column stays side by side inside the stage when the activity draws it, while the shell's bubble, keypad and Check sit under the stage. Sizes written for a wider stage fit the 648 px by closing margins and gaps first; no picture drops below 96 px, no tap below 44, no data mark or grid cell below 40.

**At 704 (stacked layout).** Apparatus column 452 px, side column 200 px beside it inside the stage, bubble under the stage.
- **The projector screen** (452 × 220) on a drawn tripod: the film area 300 × 190, framed by either the puffy cloud border (pretend, 6 px coral-light scalloped edge) or a solid teal frame (real). Literal pictures appear in it at ≥ 96 px (two pictures: 110 px each; one: 150 px) with a gentle loop (drift down / float / bob — 2 s loops, transform only). To the screen's right, Gabby = farm-animals/goose at 96 px.
- **The sentence card** (452 × 150): the sentence at 22 px Nunito, max 3 lines; the saying is a coral tile inline (rounded, 2 px ink outline, its words at 22 px); the clue phrase underlined teal (3 px) when the clue setting is on. Speaker button (36 px) at the card's top-right.
- **Side column:** the **strip tray** — three phrase strips stacked (200 × 64 each, text 17 px, wrap to 2 lines), cream with ink outline, a grip notch on the left; below them the **bubble** (200 × 110) for hints and the success sentence.
- **Task line** (20 px): L1 "Slide the real meaning into the sentence." · L2 "Which sentence means exactly what the words say?"
- **Level 2 layout:** the screen shrinks to 452 × 170; two sentence cards (452 × 110 each), each with a 96 × 96 mini window at its left showing the same word-for-word picture; the side column holds the **cloud stamp** (a drawn cloud token 90 × 64, the "it's a saying" marker) and two meaning strips.
- No words on the apparatus besides the sentences and strips (the content).

**At 360 (stacked).** Screen 328 × 170 (film 220 × 150, pictures 64–96 px; two pictures at 72 px each, one at 96); Gabby at 64 px tucked at the screen's right corner; sentence card 328 × auto (20 px text, ≤ 4 lines); strips full-width 328 × 52 (16 px text), stacked; bubble under the strips; Check after the strips at ≈ y 640 (360 × 740 ✓). At 320 × 640 the screen drops to 140 tall and strips to 48 → Check ≈ 600 ✓. Level 2 on phones: mini windows 64 × 64.

## 5. The hand
- **Drag a strip** to the saying tile (or tap a strip, then tap the slot — keyboard/tap path): the tile pops up out of the sentence (it floats above the card, still visible, 150 ms), the strip slides in and the sentence reflows; the projector reacts within 100 ms:
  - strip is the **literal** one → the same film keeps playing in the cloud frame; strip and floating tile pulse together; the shared words light in both.
  - strip is the **off** one or the **correct** one → the cloud frame fades; the screen shows the round's **real scene** pictures (library, solid teal frame) — e.g. a rainy cloud + an umbrella. (The real scene does NOT tell which strip is right — it is the story's setting and appears for both non-literal strips.)
- **Drag the strip out / swap:** drag another strip onto the slot; the old one returns to the tray. Drag the floating saying tile back into the slot to restore the original sentence and the silly film.
- **Check:** the clue bridge swings (500 ms) from the underlined clue to the slotted strip; holds or cracks (§7).
- **Speaker:** reads the sentence as it currently stands.
- **Level 2:** drag the cloud stamp onto one sentence card (it frames that card's mini window with the cloud border — "this one is a saying"); a slot then opens in that card's phrase; drag one of the two meaning strips into it. The other card keeps a solid frame ("real").
- **Keyboard:** Tab to strips; Enter picks up; Tab to the slot; Enter drops. Level 2: Tab to a card, C stamps the cloud.

## 6. The rounds
**Level 1 — "What does it really mean?" (EN, 11 rounds).** Each strip must read as a grammatical sentence when slotted in (reviewer checks all three readings). `lit` = projector film pictures; `real` = real scene pictures.

| # | sentence (saying in [ ], clue underlined _ _) | correct | literal | off | lit | real |
|---|---|---|---|---|---|---|
| 1 rain | Mom _grabbed her umbrella_ and said, "It's [raining cats and dogs]!" | raining very, very hard | cats and dogs falling from the sky | a warm, sunny day | animals/cat, animals/dog | weather/rainy, accessories/umbrella |
| 2 cake | Sam _finished the puzzle in one minute_. It was [a piece of cake]! | the easiest thing ever | a real slice of cake | much too hard to do | bakery/cake | activities/puzzle |
| 3 horses | "[Hold your horses]!" said Dad. "_Stay with me until the light is green._" | Wait a moment | Hold on to your horses | Run as fast as you can | farm-animals/horse | — |
| 4 weather | Tom _stayed in bed with a cough_ because he [felt under the weather]. | felt a little sick | stood under the rain clouds | felt full of energy | weather/rainy | furniture/bed |
| 5 butterflies | _My hands were shaking_ before my song. I had [butterflies in my stomach]. | a nervous, jumpy feeling | real butterflies inside me | no worries at all | insects-and-bugs/butterfly | — |
| 6 hay | After the long hike, we _yawned_ and [hit the hay]. | went to bed | punched a pile of hay | ran a race | thanksgivinng/haystack | furniture/bed |
| 7 catbag | The party was a surprise, but Maya [let the cat out of the bag] — _now everyone knows_! | told the secret | let a cat climb out of a bag | kept it quiet | animals/cat, at-the-supermarket/bag | — |
| 8 coldfeet | Mia climbed up the diving board, then [got cold feet] and _climbed back down_. | got too scared to jump | got icy cold toes | got brave and ready | body-parts/foot, winter/snowflake | — |
| 9 apple | Grandpa _smiles every time_ he sees his puppy. She is [the apple of his eye]. | the one he loves most | an apple in his eye | a pet he forgets | fruits/apple, body-parts/eye | pets/dog |
| 10 boat | _Nobody in our class had a pencil_, so we were all [in the same boat]. | in the same trouble | sitting in one boat | lucky and ready | vehicles/boat | classroom/pencil |
| 11 bluemoon | Our town gets snow [once in a blue moon] — _maybe once in ten years_! | almost never | when the moon turns blue | every single day | space/moon | winter/snowflake |

(Kept from the old en set: rain, cake, horses, weather, butterflies, hay, catbag — sentences re-written to carry a clue and strips re-cut to fit the slot. New: coldfeet, apple, boat, bluemoon.)

**Level 2 — "Real or saying?" (EN, 9 rounds).** Two sentences with the same words; one literal (L), one figurative (F); two meaning strips for F.

| # | phrase | L sentence | F sentence | F meaning | off strip | picture |
|---|---|---|---|---|---|---|
| 1 | a piece of cake | Grandma cut me a piece of cake for my birthday. | The spelling test was a piece of cake. | very easy | very long | bakery/cake |
| 2 | hold your horses | "Hold your horses tight," the farmer told the riders at the river. | Hold your horses — the movie hasn't started yet! | wait a moment | hurry up | farm-animals/horse |
| 3 | cold feet | After playing in the snow, I had cold feet. | Leo got cold feet and did not sing in the show. | got too scared | got very excited | body-parts/foot |
| 4 | in the same boat | The two friends rowed across the lake in the same boat. | We all lost our mittens, so we are in the same boat. | have the same problem | are very happy | vehicles/boat |
| 5 | let the cat out of the bag | At the vet, Dad let the cat out of the bag. | Ben let the cat out of the bag about the party. | told the secret | kept the secret | animals/cat, at-the-supermarket/bag |
| 6 | hit the hay | The goat hit the hay with its horns. | We were so tired that we hit the hay early. | went to bed | went outside | farm-animals/goat, thanksgivinng/haystack |
| 7 | in hot water | Put the pasta in hot water. | I was in hot water for drawing on the wall. | in trouble | very proud | at-the-supermarket/pasta, kitchen-tools/pot |
| 8 | break the ice | The big ship can break the ice on the river. | A funny game helped us break the ice on the first day of school. | feel friendly with new people | feel shy | vehicles/ship |
| 9 | up in the air | Our kite was high up in the air all afternoon. | Our picnic plans are still up in the air because of the rain. | not decided yet | all finished | toys/kite |

(Round 9 was "the ball is in your court" with toys/ball — but the literal sentence says "hit it back over the net" and the library ball is a black-and-white FOOTBALL; there is no tennis ball anywhere in the index. The picture contradicted the literal sentence, so the round is replaced.)

**Other locales — keep every existing idiom, add a clue and slot-ready strips, attach literal pictures.** Proposed film pictures for the kept rounds (all verified in the theme JSONs):
- **de:** Daumen drücken → body-parts/hand · Schwein haben → farm-animals/pig · die Nase voll haben → body-parts/nose · Tomaten auf den Augen → vegetables/tomato + body-parts/eye · Katze aus dem Sack → animals/cat + at-the-supermarket/bag · Ohren spitzen → body-parts/ear · aus einer Mücke einen Elefanten → insects-and-bugs/mosquito + zoo-animals/elephant · einen Bären aufbinden → zoo-animals/bear.
- **fr:** un chat dans la gorge → animals/cat + body-parts/mouth · il pleut des cordes → NO rope picture (camping/rope unlabelled) · la chair de poule → farm-animals/hen · une faim de loup → zoo-animals/wolf (the grey wolf — animals/wolf and forest-creatures/wolf read as pups) · tomber dans les pommes → fruits/apple · être dans la lune → space/moon · une mémoire d'éléphant → zoo-animals/elephant · un poil dans la main → body-parts/hand · donner sa langue au chat → animals/cat + body-parts/mouth.
- **es (MX):** se me hizo agua la boca → body-parts/mouth + weather/raindrop · hablar hasta por los codos → NO elbow picture · estar en las nubes → weather/cloud · ponerse las pilas → NO battery picture · meter la pata → NO paw picture · hacer el oso → zoo-animals/bear · costar un ojo de la cara → body-parts/eye + body-parts/face · darle el avión → vehicles/airplane.
- **pt-BR:** água na boca → body-parts/mouth + weather/raindrop · falar pelos cotovelos → NO elbow · pisar na bola → toys/ball + body-parts/foot · pagar mico → zoo-animals/monkey · os olhos da cara → body-parts/eye + body-parts/face · no mundo da lua → space/moon · engolir sapo → pets/frog · quebrar o galho → NO branch picture.
- **it:** un gioco da ragazzi → toys/blocks · piove a catinelle → beach/bucket + weather/rainy · in bocca al lupo → zoo-animals/wolf + body-parts/mouth · la testa fra le nuvole → body-parts/head + weather/cloud · un occhio della testa → body-parts/eye + body-parts/head · tagliare la corda → NO rope · le farfalle nello stomaco → insects-and-bugs/butterfly · due piccioni con una fava → things-that-fly/pigeon.
- **nl:** in de wolken → weather/cloud · de kop in het zand steken → birds/ostrich · twee linkerhanden → body-parts/hand · de spijker op de kop → tools/nail + tools/hammer · een appeltje voor de dorst → fruits/apple · geen kaas van gegeten → breakfast/cheese · de handdoek in de ring → NO towel · iets onder de knie → NO knee picture (unlabelled).
- **Rule for rounds with NO literal picture:** the native author replaces them with a picturable idiom of the same band (preferred). If none fits, the round may stay with a word-film fallback (the saying's own words float in the cloud frame) only while the locale keeps ≥ 9 picture rounds in level 1. Each locale needs ≥ 10 level-1 rounds (de/es/pt/it/nl add 2–3 new idioms; fr adds 1).
- **sv/da/no/fi (new, authored natively, ≥ 10 + 9 each).** Picturable starting suggestions for the native author: sv *det är ingen ko på isen* ("no hurry, nothing is wrong" — farm-animals/cow), *ha tummen mitt i handen* (body-parts/hand), *ha en räv bakom örat* (zoo-animals/fox + body-parts/ear), *inte se skogen för bara träd* (camping/forest); da *der er ugler i mosen* (forest-creatures/owl), *at have en finger med i spillet* (body-parts/hand); no *ha en finger med i spillet*, *gå som katta rundt den varme grøten* (animals/cat); fi *pukki kaalimaan vartijana* (farm-animals/goat + vegetables/cabbage), *olla pihalla kuin lumiukko* (winter/snowman), *nostaa kissa pöydälle* (bring up a hard topic — animals/cat + furniture/table). (The designer's *heittää lusikka nurkkaan* means TO DIE — never in a grade-3 activity; its *det regnar småspik* is not a sure Swedish saying, so it is replaced by two that are.) The reviewer checks each is a real, grade-3-common idiom.

**Answer position.**
- Level 1: the three strips' order in the tray is assigned per pass by a balanced rotation — over each pass the correct strip sits in the top/middle/bottom place 4/4/3 times (never the old fixed 0,1,2 cycle), shuffled across rounds.
- Option length (re-measured by the critic, `work-c37/gabby.js`, with rounds 1 and 5 re-cut to "raining very, very hard" / "a nervous, jumpy feeling"): correct strip is the longest in 4 rounds, the middle length in 4, the shortest in 3, no ties (the designer's strips actually measured 4/2/5 with two ties) — the best length bot ("drop the longest, take the longer of the other two") gets 4/11. The literal strip is the longest in 8/11 by nature (it restates the words); that tells only which strip is literal, and the literal is never the answer.
- Level 2: which card (top/bottom) is the literal sentence is balanced per pass 5/4 by the same rotation; the two meaning strips' order alternates by the rotation too.
- Every locale's author runs the same length measure; a locale fails the gate if the correct strip is the longest in more than 45% of its rounds (measured on the live manifest: every old locale set has the correct card longest in only 2 rounds — the live cards are fine on length; the gate guards the NEW authoring).
- **Order:** order-only reshuffle per pass, never the same order twice.

## 7. Check, the misses, the success
- **Check with the saying still in the slot:** the slot glows; hint "Slide one of the meanings into the sentence first." No miss.
- **Miss 1:**
  - literal strip: the projector keeps the silly film in the cloud frame, and the shared words light in strip and saying together. Hint: "That just says the words again — look at the picture. Could that really happen?"
  - off strip: the clue bridge cracks; the clue phrase glows. Hint: "Read the clue: {clue}. Does your meaning fit it?"
- **Miss 2:** the failed strip keeps a small mark (a cloud mark = "just the words"; a broken-plank mark = "doesn't fit the clue"); the clue phrase stays lit; the sentence is read aloud with the current strip (TTS locales) and highlighted word by word. Hint: "Find the strip that is not the words again AND fits the clue."
- A new strip clears the marks of that strip only until the next Check.
- **Success:** the bridge holds (*twang*), the screen switches to the solid frame with the real scene, Gabby flaps. Sentence: "Yes! “{saying}” really means {meaning}." e.g. "Yes! “It's raining cats and dogs” really means it is raining very, very hard."
- **Level 2 miss 1:** cloud stamp on the literal sentence → that card's mini window turns to the solid "real life" frame and its own words light up (here the words really happen); wrong meaning strip → the clue bridge cracks as in level 1. Hint: "In this sentence the words really happen. Put the cloud on the other one."
- **Level 2 success:** "Yes! In “{F sentence}” the words are a saying: it means {meaning}."

## 8. Settings
1. **Sayings:** *what does it really mean?* (level 1: one sentence, three strips) / *real or saying?* (level 2: two sentences, cloud stamp, two strips). Visible at rest.
2. **Clue:** *underlined* / *find it yourself* (no underline; on miss 2 it lights). Visible at rest: the teal underline.

## 9. Words (EN source)
- title (frozen en): "Gabby's Funny Sayings"; header short title "Gabby's Funny Sayings".
- task lines: "Slide the real meaning into the sentence." · "Which sentence means exactly what the words say?"
- hints / success: as §7; the old `hintWrong` idea ("that is what the words say, but not what it means") is kept as the literal-miss hint.
- settings: "Sayings" — "what does it really mean?" / "real or saying?"; "Clue" — "underlined" / "find it yourself".
- aria: projector "Gabby's projector shows what the words say: {picture names}"; frame state "pretend" / "real life"; bridge "the clue bridge holds" / "the clue bridge breaks".

**Locale traps.**
- **Never translate an idiom.** Each locale has its own sayings (kept lists above); a translated English idiom is a nonsense sentence in another language.
- **Head word for "saying":** es (MX) *expresión* — never *dicho/refrán* (MX: a proverb with a moral; the old file's note stands); fr *expression*; de *Redewendung*; it *modo di dire*; pt *expressão*; nl *uitdrukking*; sv *uttryck* / *talesätt*; da *talemåde*; no *uttrykk*; fi *sanonta*.
- **Slot grammar:** strips are phrase fragments that must agree with the sentence around them (gender, number, verb form). In de/nl/sv/da/no the verb-second rule means a saying split across the clause ("Drückst du mir die Daumen?") cannot be a single tile → the author writes the sentence so the whole saying is one contiguous phrase, or the tile spans the separated part with a gap marker. In fr, elision (*l'*, *d'*) before a strip starting with a vowel must be re-checked for each strip. fi case endings: each strip is authored in the case the slot demands.
- **Clue:** the clue must rule out the off strip *for a child in that country* (e.g. an umbrella clue works everywhere; "the light is green" assumes traffic lights — fine).
- **es-MX / pt-BR registers** as in the old file; **de** *Schwein haben* is fine for children; avoid idioms with rude readings in any locale.
- Speaker TTS only in the 5 reliable locales; the projector and bridge carry everything with sound off.

## 10. Sound off, access, phones
- Sound off: the film (pictures in a cloud vs solid frame), the synced glow, the bridge — all visual. Text is read on screen.
- Keyboard path as §5; aria-live reads the sentence as it stands after every slot change and the bridge verdict.
- Taps: strips ≥ 48 px tall, slot ≥ 44 px, cloud stamp 90 × 64.
- Picture floors: film pictures ≥ 96 at 704 (110/150), ≥ 64 at 360 (72/96); Gabby 96 / 64; level-2 mini windows 96 / 64.
- Phone layout: stacked (screen → sentence → strips → bubble → Check).

## 11. Distinct from
- **New 258 The Unchanging Picture** (L.2.5.b): a picture that draws what the sentence says, swapping one word to test synonyms. Here the picture draws the words *literally* in a pretend frame to expose a literal reading, and a separate clue bridge tests fit to context — the invention is the contrast between the literal film and the clue bridge, on idioms.
- **Row 128 Sentence Stage** (acts out a sentence word by word, L.1.1.j) and **Row 116 Story Lantern** (lessons) — different skills.
- **Row 76 Question Lamp / Row 117 Marlo's Magnifier** — lights and lenses on story parts, not literal vs figurative.
- No premium tool works with idioms.
- Not in REGISTRY-BUILT.

## 12. Build plan
- **Core state:** `{ level, clueOn, round, slot:null|stripId, cloudOn:null|0|1 (L2), tray:[ids in shown order], misses, marks:{stripId→'cloud'|'crack'} }`.
- **Core functions:** `stripKind(round, id)` → `'correct'|'literal'|'off'`; `readSentence(round, slot)` → the full sentence text (the renderer and TTS use it); `projector(round, slot)` → `{frame:'pretend'|'real', pics:[…]}` (literal or empty slot → pretend + lit; else real + real pics); `bridge(round, slot)` → `'hold'|'crack'|'none'` (crack for off, none for literal, hold for correct); `trayOrder(pass, roundIndex)` (balanced rotation); `grade`.
- **verify gate (own oracle):** for every locale and level: ≥ 10 L1 rounds and ≥ 9 L2 rounds (sv/da/no/fi once authored; until then the locale is not published); exactly one correct strip per round; every L1 round has a non-empty clue that appears verbatim in the sentence; every `lit`/`real` picture exists in its theme JSON and is not in the refusal list; ≥ 9 L1 rounds per locale have a literal picture; correct-strip-longest ≤ 45% per locale; correct position per pass balanced within ±1; no two rounds share a saying; the substituted sentences contain no leftover slot markers; the literal strip shares ≥ 1 content word with the saying (the "same words" glow needs it — or is listed in an explicit per-round `sharedWords` field).
- **Mutations:** literal strip graded correct · off strip shows the pretend frame · bridge holds for the literal strip · tray order fixed (0,1,2 cycle) · clue setting off still underlines · L2 accepts the cloud on the literal sentence · success sentence uses the literal strip text · a missing picture renders as an empty frame instead of failing the gate · reshuffle repeats a pass.
- **Local test:** real drags of every strip into the slot in every round, all 11 locales (as authored), widths 320–1366; the sentence never overflows its card at 360 (longest locale sentence measured); projector loop pauses under `prefers-reduced-motion`.
- **Pictures to verify:** animals/cat, animals/dog, weather/rainy, accessories/umbrella, bakery/cake (a slice — fits "a piece of cake"), activities/puzzle, farm-animals/horse, furniture/bed, insects-and-bugs/butterfly, thanksgivinng/haystack, at-the-supermarket/bag, body-parts/foot, winter/snowflake, fruits/apple, body-parts/eye, pets/dog, vehicles/boat, classroom/pencil (diagonal — fine in a scene), space/moon (blue-shaded — perfect for "blue moon"), farm-animals/goat, at-the-supermarket/pasta, kitchen-tools/pot, vehicles/ship, toys/ball, farm-animals/goose (Gabby), plus the locale lists above.
- **Risks:** authoring load (11 locales × ~20 rounds with clues and slot grammar) — the build must budget native authoring per locale and ONE reviewer pass over the compact dump; the projector loop must be subtle enough not to distract from reading.
- **Blocked:** none for en/de/fr/es/pt/it/nl (fallback rule covers missing pictures); sv/da/no/fi wait for native authoring.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — cats and dogs falling out of a cloud, a bridge that snaps, a goose that flaps.
2. **Would a teacher put it on the board?** Yes — it teaches the two real strategies for idioms: "does it just repeat the words?" and "does it fit the story?", and level 2 shows the same words can be literal or not.
3. **Would a parent trust it?** Library pictures only (no drawn goose any more), each language's own sayings, calm, no score.
4. **The invention:** a projector that films the words literally — so a literal reading gets the same silly picture — and a clue bridge from the story that only holds for a meaning that fits.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 3→5 · distinctness 5→5 · reality 4→5
What changed:
- Measured the strips myself: the claimed 4/4/3 length balance was really 4/2/5 with two ties; re-cut two correct strips (still slot-grammatical: "It's raining very, very hard!", "I had a nervous, jumpy feeling.") → 4/4/3, no ties.
- Level-2 round 9 ("the ball is in your court … hit it back over the net") showed the library FOOTBALL — no tennis ball exists; replaced by "up in the air" (literal kite / undecided plans, toys/kite).
- Suggested idioms checked as native sayings with one meaning: fi *heittää lusikka nurkkaan* (= to die) removed; sv *det regnar småspik* (doubtful) replaced by *det är ingen ko på isen* and *ha tummen mitt i handen*. The kept de/fr/es-MX/pt-BR/it/nl lists are all real sayings with a single figurative meaning (checked against the live manifest: es *hacer el oso* and *darle el avión* are Mexican, pt *pagar mico*, *engolir sapo*, *quebrar o galho* Brazilian — the right registers).
- Every film picture checked in the theme JSONs (all present); weather/cloud has a smiling face — fine inside the pretend film, never in a "real" scene.
- Layout check (2026-10-17): switched to stacked — split stage column is ~370 px at 704.
