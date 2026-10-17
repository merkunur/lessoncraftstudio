# Row 183 — The Turning Line (L.2.2.b)

## 0. Identity
- id `pim-comma-mail.letter-commas.l-2-2-b` (KEPT) · grade 2 · Common Core L.2.2.b (use commas in greetings and closings of letters) · strand Language · page title (frozen) "Pim's Comma Mail — Commas in Greetings & Closings (Grade 2)" · own files `mini tools/comma-mail-core.js`, `comma-mail-activity.js`, `comma-mail-activity.html`; the manifest row stays in `pim-comma-mail-activities.json` (id, slugs en de fr es pt it nl, titles, intros unchanged), `tool` repointed. sv/da/no/fi get new slug/title/intro at build (greetings only — §9).
- worksheets it covers: none mapped.
- what the old activity did: three finished greetings or closings ("Dear Sam," / "Dear Sam" / "Dear, Sam"); tap the punctuated one. **Kept:** every greeting and closing in all seven authored locales as round content (Sam, Grandma, Mr. Fox, Aunt Mia; Your friend, Love, Your pal, Yours truly; de Liebe Oma … Lieber Herr Fuchs; fr Cher Papa … À bientôt; es Querida abuela: … Tu amiga,; pt, it, nl likewise), the "comma after the first word" trap (Dear, Sam) and the "Mr. has a dot, not a comma" trap. **Changed:** the child no longer recognises a finished form — they PLACE the mark in a real letter, and the letter shows what the mark does. **Dropped, with reason:** the full-stop distractors ("Love.") — teaching "a stop ends a letter" would be false; de "Hallo Ben," and es "Hola, Diego:" — both need a second, vocative comma (Duden also allows "Hallo, Ben,"), so one mark can never be the single right answer.

## 1. The pitch
"A comma at the end of the greeting turns the line — everything after it drops down to become the letter — so if the comma is in the wrong place, the name falls into the letter, Pim can't read who it's for, and the letter comes back."

## 2. Why a child will want it again (the fun)
- **The letter arrives scrambled.** The greeting and the first words of the letter come as ONE long line of word tiles, like a note written in a hurry: "Dear Grandma and Grandpa I can swim now!" The child holds a big brass comma — heavy, glinting, satisfying to drop — and slots it into a gap.
- **Send makes it real.** The line *turns* at the comma: the words before it stay up on the greeting line, everything after it swings down to the next line and indents, like a pen jumping to a new line. The paper folds itself into an envelope; the name the greeting ended on appears in the envelope window.
- **Pim flies.** Pim the pigeon (library picture) takes the envelope and flies down a little street of mailboxes, dipping at each name plate. Right comma → the envelope drops into the right mailbox, the mailbox bounces, and a stamp thumps onto the letter. Too early → "Grandma" gets the letter and Grandpa's mailbox stays empty, while "and Grandpa I can swim now!" sits stranded at the top of the letter. No comma → the line runs right off the edge of the paper and Pim hovers, puzzled.
- **End-of-round show:** the delivered letter unfolds on the paper in its proper shape — greeting line, comma glowing coral, letter below — and a drawn envelope token drops into Pim's mail bag along the bottom; after the round set, the bag tips out and every letter flutters to its mailbox at once.
- **Free play:** once a letter is delivered, the child may drag the comma to any other gap and press Send again — Pim cheerfully delivers to whoever the greeting now names (or brings it back). Children try every gap just to watch him.
- No timer, score, streak or lives.

## 3. The skill and the misconception
- **Skill:** a letter's greeting ends with a comma (es: a colon), and so does its closing; the mark sits at the END of the whole greeting or closing, wherever that is, and what follows starts a new line (the letter, the signature).
- **Misconception 1 — the comma goes after the first word** ("Dear, Sam"; "Your, friend"). Pushback: the line turns after "Dear" — the name drops into the letter ("Sam I miss you and Rex."), the envelope window is empty, and Pim brings the letter back.
- **Misconception 2 — the comma goes after the first name of a longer greeting** ("Dear Grandma, and Grandpa …", "Happy Birthday, Max and Lily" → "Max, and Lily"). Pushback: the letter IS delivered — to Grandma only. Grandpa's mailbox, named on its plate, stays empty, and "and Grandpa" opens the letter.
- **Misconception 3 — no mark at all.** Pushback: the line cannot turn; it runs off the paper's right edge and Pim cannot find where the name ends.
- **Misconception 4 — the dot in "Mr." ends the greeting** (en). Pushback: comma after "Mr." → the envelope window reads "Mr.", no mailbox is just "Mr.", and "Fox Your hens…" opens the letter.
- **Misconception 5 — the signature belongs to the closing** (comma after the name — dropped in the closing ribbon's END slot). Pushback: the closing line keeps the name and the signature line under it is empty — Pim has no one to take the reply back to and flies back with the envelope.

## 4. The stage
Stacked layout (the street needs the full width).

**At 704 px:**
- **The letter paper** (top, 600 × 230, drawn: cream sheet `#FFFDF6`, 2 px ink outline, faint ruled lines every 44 px, a drawn fold crease). The **ribbon** sits on its first ruled line — word tiles, Nunito 22 px, 44 px tall, natural width + 12 px padding, no tile borders (they are words, not buttons), wrapping to a second ruled line if needed. Between every two words is a **gap slot** (Closings and the closing ribbon of Whole letter also get one **end slot** after the last word, so the "comma after the name" error can really be made): 18 px visible, hit area 44 × 44 centred on the gap (overlapping tile edges); a placed comma widens its gap to 26 px.
- **The mark tray** (right of the paper's bottom edge, 72 × 72): the brass comma, a 56 px glyph drawn as geometry (filled teardrop with a tail, `#C98A2B`, lighter highlight). Whole letter: two marks wait. es greetings: the tray holds the colon (two brass dots).
- **The street** (below the paper, full width 656 × 200): four mailboxes — library **post-office/mailbox**, 96 px tall, 150 px apart, each on a drawn kerb; under each a **name plate** (drawn cream tag 132 × 36, Nunito 18 px bold, the recipient's name — content). Above, a drawn wire on which **Pim** (library **birds-2/pigeon**, 96 px) perches at the right end.
- **Send** (the shell's Check, relabelled) and the bubble under the street.
- **Task line** (above the paper, ≤ 24 px, ≤ 2 lines): Greetings "Put the comma where the greeting ends. Then send it!" · Closings "Put the comma where the closing ends. Then send it!" · Whole letter "Put a comma where the greeting ends and where the closing ends."

**At 360 px:** paper 336 wide (tiles 18 px, 44 px tall, wrapping to 2–3 ruled lines; every gap keeps a 44 × 44 hit area; a gap at a line wrap shows at the end of the line); tray 60 × 60 under the paper's right corner; the street becomes a 2 × 2 grid of mailboxes at 72 px (plates 150 × 36, 16 px); Pim 64 px on a wire above the grid. Send bottom ≤ 690 at 360 × 740 and ≤ 620 at 320 × 640 (at 320 the mailboxes are 64 px and the plates 140 × 36).

Pictures (library, colour, seen on the post-office and birds-2 contact sheets): post-office/mailbox (red-brown box on a post), birds-2/pigeon (grey, facing left — he flies leftward down the street, so he is only mirrored on the way back, which is safe: no text), post-office/envelope (the flying envelope, 96 / 64 px), post-office/stamp (the success stamp, 96 / 64 px; its printed "201" is decoration and language-neutral). NOT used: post-office/truck (prints "POST") and post-office/post_office (prints "post office").

## 5. The hand
- **Drag the comma** from the tray onto a gap (or tap a gap, then tap the tray; keyboard: arrows walk a gap cursor, Enter drops). It snaps in 60 ms with a soft paper *tick*; the gap widens. Drag a placed comma to another gap or back to the tray at any time; tapping a placed comma returns it.
- **Nothing previews.** Placing the comma changes nothing else until Send — the turn is the consequence, not a hint.
- **Send:** (1) the turn, 600 ms — the words after the comma lift and swing down to the next ruled line, indenting 32 px (de: the first body word keeps its lower-case letter, §9); (2) the fold, 400 ms — the paper folds into the envelope picture; the envelope window (a drawn label) shows the words of the greeting after its opening word (closings: the signature line); (3) the flight, 1.2–2.0 s — Pim takes off, flies over each mailbox in turn, dips at every plate (120 ms), and drops the envelope where the plate matches EXACTLY; no match → he reaches the last box, turns and flies back to the wire with the envelope, which gets a drawn "?" stamp. A soft wing-flap sound; a *clunk* at the mailbox.
- **Undo:** after a miss the letter unfolds back to the ribbon with the comma where the child left it.
- **Free play:** after a correct delivery any gap may be tried and sent (nothing is recorded).

## 6. The rounds
One round = one letter part. One right gap per mark. Level picker: **Greetings · Closings · Whole letter**.

**Greetings (EN, 10 rounds)** — ribbon = greeting + the start of the letter; ‖ marks the right gap (gap k = after word k); plates are the four mailboxes (right one listed first; shuffled on screen).

| # | ribbon | right gap | plates |
|---|---|---|---|
| 1 | Dear Sam ‖ I miss you and Rex. | 2 of 6 | Sam · Rex · Mia · Ben |
| 2 | Dear Grandma ‖ Mom and I love the kite. | 2 of 7 | Grandma · Mom · Grandpa · Leo |
| 3 | Dear Dad ‖ The cake was the best! | 2 of 6 | Dad · Mom · Grandma · Sam |
| 4 | Dear Mr. Fox ‖ Your hens are with Pip. | 3 of 7 | Mr. Fox · Pip · Ms. Lopez · Coach Kim |
| 5 | Dear Aunt Mia ‖ We got a puppy named Bo! | 3 of 8 | Aunt Mia · Bo · Uncle Ben · Mia |
| 6 | Dear Ms. Lopez ‖ Here is my story about Spot. | 3 of 8 | Ms. Lopez · Spot · Mr. Fox · Lily |
| 7 | Dear Max and Lily ‖ Come to my party on Monday! | 4 of 9 | Max and Lily · Max · Lily · Sam |
| 8 | Dear Grandma and Grandpa ‖ I can swim now! | 4 of 7 | Grandma and Grandpa · Grandma · Grandpa · Dad |
| 9 | Dear Mr. and Mrs. Hill ‖ Your dog is in my yard. | 5 of 10 | Mr. and Mrs. Hill · Mrs. Hill · Mr. Fox · Ana |
| 10 | Dear Coach Kim and team ‖ We won on Friday! | 5 of 8 | Coach Kim and team · Coach Kim · Kim · Leo |

Plates are chosen so a too-early comma often DELIVERS — to the wrong person (rounds 7, 8, 9, 10) — and body names (Rex, Pip, Spot, Bo) have plates, so "comma before the last capital word" sends the letter to a pet. Round 5's "Mia" plate catches "Dear Aunt, Mia".

**Closings (EN, 10 rounds)** — ribbon = closing + signature; Pim takes the reply back to whoever signed.

| # | ribbon | right gap | plates |
|---|---|---|---|
| 1 | Your friend ‖ Maya | 2 of 2 | Maya · Ana · Leo · Sam |
| 2 | Merry Christmas ‖ Aunt Mia | 2 of 3 | Aunt Mia · Mia · Max · Grandma Rose |
| 3 | Happy New Year ‖ Ben | 3 of 3 | Ben · Lily · Nora · Leo |
| 4 | With love ‖ the Lee family | 2 of 4 | the Lee family · Grandpa Joe · Ana · Sam |
| 5 | Happy Birthday ‖ Max and Lily | 2 of 4 | Max and Lily · Lily · Max · Sam |
| 6 | Love ‖ the Hill family | 1 of 3 | the Hill family · Mr. Fox · Ben · Nora |
| 7 | Your best friend ‖ Ana | 3 of 3 | Ana · Maya · Nora · Leo |
| 8 | Get well soon ‖ Grandpa Joe | 3 of 4 | Grandpa Joe · Joe · Grandma Rose · Sam |
| 9 | Love ‖ your class | 1 of 2 | your class · Ms. Lopez · Max · Leo |
| 10 | See you soon ‖ Grandma Rose | 3 of 4 | Grandma Rose · Rose · Grandpa Joe · Lily |

**Whole letter (EN, 8 rounds):** a letter card with a greeting ribbon at the top, two fixed body lines (not editable), a closing ribbon at the bottom; TWO commas in the tray. Pim delivers to the greeting's name, then flies the reply back to the signer — both must resolve. Pairs (greeting / closing): G4/C2 · G8/C4 · G1/C7 · G9/C6 · G7/C10 · G3/C9 · G5/C8 · G6/C1.

**Answer position (measured — `work-28/m183.js`, `opt183.js`):**
- Greetings: right gap = after word 2 / 3 / 4 / 5 in 3 / 3 / 2 / 2 rounds, never the last gap. Bots: "after word 2" 3/10 · "after word 3" 3/10 · "before the last capitalised word" 3/10 · "before the first capital after word 2" 3/10 · "middle gap" 2/10.
- Closings: right gap = 1 / 2 / 3 in 2 / 4 / 4 rounds; the END slot is never right. Bots (critic re-measured, `work-c28/m.js`, counting the end slot): "before the first capital after the opening word" 4/10 · "end slot" 0/10 · "gap before the last word" 3/10 · "middle gap" 4/10 · "second-to-last word gap" 4/10 — every bot at or under the 40 % bound. Signatures that start lower-case ("the Lee family", "your class") and closings with capitals inside ("Merry Christmas", "Happy New Year") exist precisely to break the "comma before the capital" shortcut.
- The gate re-measures every shipped locale with the same bots; each must be ≤ 40 % of the level's rounds.
- **Order:** order-only reshuffle per pass (never the same order twice); plates shuffled per render.

## 7. Check, the misses, the success
- **Send with no mark:** hint, no miss — the ribbon slides right off the paper edge and back. "Where does the greeting end? Put the comma there." (closings: "…the closing end?")
- **Miss 1** — the turn and the flight ARE the showing (§2, §3). The paper stays unfolded beside the street for 2 s so the stranded words can be read. Hints: comma too early — "{words} fell into the letter. Who is the letter for?"; too late — "The greeting took words from the letter. Where does the letter begin?"; closing, comma after the name — "The name stayed in the closing. Who signed the letter?"
- **Miss 2** — the stronger showing: the right mailbox's plate glows, and the matching words in the ribbon get a soft coral underline (the whole name — "Grandma and Grandpa", "Mr. Fox"). Hint: "The letter is for {name}. Put the comma right after the name." (closings: "{name} signed it. Put the comma right before the name.")
- **A new move takes the help away** until the next Send.
- **Success:** delivery, bounce, stamp; the letter unfolds in its proper shape. Bubble: "{greeting}, — the comma ends the greeting, and the letter starts on the next line!" · closing: "{closing}, — the comma ends the closing, and {name} signs below it!" · whole letter: "Two commas: {greeting}, at the top and {closing}, at the bottom!"

## 8. Settings
1. **Name plates:** shown (default) · hidden until Pim lands. Hidden makes the child read the greeting instead of matching it to a plate. Visible at rest: the plates carry names or are blank cream tags.
2. **Letter length:** short (default — the letter part of a greeting ribbon is cut to its first 3–4 words) · long (the whole first sentence, as in the tables). Visible at rest: the ribbon's length.

## 9. Words (EN source)
- title "Pim's Comma Mail".
- instruction "Every letter needs its commas in the right place. Drop the comma where the greeting or the closing ends, then send the letter with Pim."
- task lines §4 · hints and celebrations §7 · button "Send" · settings "Name plates: shown / hidden", "Letter: short / long".
- aria: "Gap after {word}" · "Comma after {word}" · "Pim delivered the letter to {name}" · "Pim could not find {words} — the letter came back".

**Locale traps — each locale's letters are rebuilt by its native author, never translated:**
- **es — the greeting ends with a COLON** ("Querida abuela:"), the closing with a comma ("Con cariño,"); every es hint and task line names *los dos puntos* in Greetings ("Pon los dos puntos donde termina el saludo"). The tray holds the colon in Greetings and a comma in Closings; Whole letter holds one of each. (A comma after an es greeting is the classic anglicism — the comma is simply never offered for es greetings.) Kept: Querida abuela · Querido papá · Querida mamá · Estimada maestra Ruiz; Con cariño · Un abrazo · Tu amiga. "Hola, Diego:" dropped (two marks). New es rounds bring every level to ≥ 7.
- **de — the letter begins with a LOWER-CASE word after the comma** (Duden: "Liebe Oma, / wie geht es dir?"; nouns and names keep their capital). The ribbon is written that way, so after the turn the child sees the real German convention. **German closings take NO comma** ("Liebe Grüße / Anna") — Closings and Whole letter are hidden in de (a recorded refusal; the old de set already had greetings only). Kept: Liebe Oma · Lieber Papa · Liebe Mama · Lieber Opa · Liebe Anna · Liebe Tante Mia · Lieber Herr Fuchs, plus "Liebe Frau Sommer", "Liebe Klasse 2b", "Lieber Max und liebe Lily" (the comma comes after the whole double greeting) = 10. "Hallo Ben" dropped.
- **fr / nl / it / pt-BR** — comma after the greeting and after the closing; the letter begins with a capital. Kept as authored (fr Cher Papa · Chère Mamie · Chère Léa · Cher Monsieur Renard; Bisous · Amitiés · À bientôt · Ton ami; pt Querida vovó … Sua amiga; it Caro Nonno … Con affetto; nl Beste oma … Je vriend), topped up to ≥ 7 per level with double greetings.
- **sv / da / no / fi** — new pages, Greetings only. All four languages ACCEPT more than one mark after a letter greeting (Språkrådet, Dansk Sprognævn, Språkrådet NO, Kielitoimisto: comma, exclamation mark, or none), so the activity never claims one mark is the only correct one — the tray holds the mark children meet in school letters and the round's single right answer is the GAP, not the mark: **sv "!"** (Kära mormor! / Hej-free), **no "!"** (Kjære mormor!), **da ","** (Kære mormor,), **fi "!"** (Hyvä mummo!). The task line and hints name that mark ("Sätt utropstecknet där hälsningen slutar"); the celebration says "the mark ends the greeting", never "a comma is wrong". The body after the greeting starts with a capital in all four. 8 greetings per locale by the native author (kin + teacher + double greeting "Kära mormor och morfar!"), plates from the locale name list. Greetings beginning with Hej / Hei / Hallo are never used (vocative comma). Closings refused in all four (Hälsningar / Hilsen / Terveisin stand without a mark, name on the next line).
- **Titles and abbreviations:** the "dot is not the comma" trap is English-only (Mr., Ms., Mrs.); other locales spell titles out (Herr, Monsieur, meneer, signora, professora), so their traps come from double greetings and two-word names.
- **Names** on plates are locale-native (Oma/Opa, Mamie, Nonno/Nonna, vovó/papai, oma/papa, mormor, mummo). A plate never holds anything but a name or a family address.

## 10. Sound off, access, phones
- Silent legibility: the turn, the envelope window, Pim's flight and the empty or filled mailbox say everything; TTS reads the ribbon and the plates as a bonus.
- Keyboard: Tab to the ribbon; Left/Right walk a gap cursor (3 px coral ring); Enter drops or lifts the comma; Tab to Send.
- aria-live per §9. Taps ≥ 44 px (gap hit areas 44 × 44, comma 56+, Send 48). Pictures ≥ 96 px at 704 (mailbox, pigeon, envelope, stamp) and ≥ 64 px at 360/320.
- Phone: the street becomes a 2 × 2 grid; Pim's flight snakes the grid row by row and never crosses the paper.

## 11. Distinct from
- **Row 129 The Divider Case (L.1.2.b)** — commas in a LIST drop walls so each item gets a pocket; here a comma ENDS a part of a letter and turns the line — a boundary, not a separation of items.
- **Row 73 The Writing Carriage** — writing moves under a fixed window; nothing about letter conventions.
- **Row 122 The Hook Tile** — apostrophe-s possessive; different mark, different job.
- Not a reused invention: no registered design makes a punctuation mark re-flow a document and then routes the result by what it now says.

## 12. Build plan
- **Data** `comma-mail-rounds.json` per locale: `greetings:[{id, words:[…], end:k, plates:[…], mark}]`, `closings:[{…}]`, `letters:[{greeting, closing, body:[line, line]}]`, `lowerBody` (de), `levels`.
- **Core state** `{level, round, marks:{gap:char}, sent:null, misses}`; functions `place(gap, mark)`, `lift(gap)`, `turn()` → `{greetingLine, bodyLines}`, `address()` → the words after the opening word (greetings) or the signature line (closings), `deliver()` → `{plate|null}`, `isRight()`.
- **Gate's own ground truth** (`verify-comma-mail-core.js`): for every round and every gap the gate computes the turn itself and asserts — `deliver()` is the right plate ONLY at the right gap; at every other gap it is null or a DIFFERENT plate; every plate is in the locale's name list; the §6 bots are each ≤ 40 %; de bodies start lower-case unless the first word is on the reviewer-signed noun/name list; es greetings never offer ","; no ribbon starts with Hallo / Hej / Hei / Hola / Hi / Hello; every shipped level has ≥ 7 rounds.
- **Mutations (one per rule):** the turn happens at the right gap whatever the child chose · `deliver` matches plates by prefix ("Grandma" accepts "Grandma and Grandpa") · the last gap counts as right · es greeting accepts "," · de closings shown · lifting a comma leaves the gap widened · Send with no mark counts as a miss · plates rendered in data order (right plate always first).
- **Pictures confirmed on contact sheets:** post-office/mailbox, post-office/envelope, post-office/stamp, birds-2/pigeon.
- **Risks:** long es/pt greetings at 320 px (the ribbon may need three lines — measured in local-test at every width); Pim's path on the phone grid.
- **Blocked:** none.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — a heavy comma to drop, a letter that swings into shape, a pigeon who either delivers or comes back puzzled; free play lets them send the letter to the dog on purpose.
2. **Would a teacher put it on the board?** Yes — "where does the greeting end?" is exactly the conversation L.2.2.b needs, the misplaced comma's consequence is visible to the whole class, and the double greetings ("Dear Max and Lily") are the case worksheets never test.
3. **Would a parent trust it?** Yes — library pictures, calm motion, real letters in each language's own convention (a German letter really starts small after the comma; a Spanish greeting really ends with a colon).
4. **The invention:** the comma turns the line — what follows it becomes the letter, and the words left before it tell Pim who it's for.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 4→5 · distinctness 5→5 · reality 4→5
What changed:
- Closings got an END slot after the signature, so misconception 5 (comma after the name) can actually be made and shown; closing bots re-measured with it (all ≤ 40 %, end slot never right).
- sv/da/no/fi: the draft left "the reviewer names the mark" open. Decided per locale (sv/no/fi "!", da ","), with the honest note that all four accept several marks — the round's one right answer is the GAP; no copy ever calls another mark wrong.
- es hints/task lines name los dos puntos; post-office/stamp re-checked on the contact sheet (in the index; its "201" is decoration).
