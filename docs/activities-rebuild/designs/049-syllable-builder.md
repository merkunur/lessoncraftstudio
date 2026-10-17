# Row 49 — The Syllable Chain: La catena delle sillabe (RF.K.2.B, it)

## 0. Identity
- id `syllable-builder.forma-la-parola-con-le-sillabe.rf-k-2-b` (KEPT) · grade K (it: scuola dell'infanzia, ultimo anno) · Common Core RF.K.2.B; the page names the Indicazioni nazionali only (§20.10) · strand Reading: Foundational Skills · **locale-scoped row: ships in it only** (slug `forma-la-parola-con-le-sillabe`, page title "Forma la parola con le sillabe — Fonetica nella scuola dell'infanzia" and intro frozen).
- own files: `mini tools/syllable-chain-core.js`, `syllable-chain-activity.js`, `syllable-chain-activity.html`; manifest row stays in `syllable-builder-activities.json`, `tool` → `syllable-chain-activity`, `params` → §6. 0 lines to shared engines or `lcs-shell.*`.
- worksheets it covers: none mapped.
- what the old activity did: tap scrambled syllable tiles into slots, 28 Italian words. **Kept:** the long-word blend task (Level 3 "Forma la parola", now with counting first) and its words (tartaruga, arcobaleno, girasole, bicicletta, elicottero, farfalla, fragola, ombrello, zebra, cane …) — all 28 re-checked 2026-10-17 against `approved-words-it.json` (same splits) and the it picture labels. **New:** the Italian classroom's own syllable game — *la catena di parole* (the last syllable of one word starts the next) — as Levels 1–2, built only from gated words with library pictures (mined from the 1,966 last→first syllable links among approved it words that have a colour picture).
- **Gone:** the tile-only task as the whole activity.

## 1. The pitch
"A chain of pictures where every hook is a syllable: the end of *pal-la* is the start of *la-ma* — find the picture that hooks on, and the shared syllable clicks shut between them."

## 2. Why a child will want it again (the fun)
- **A chain that grows across the stage.** Every right picture swings onto the chain on its own clasp with a bright metal *clink*, the chain sways and settles. Children want "one more link".
- **The hook is a real hook.** A picture whose first syllable does not match simply will not close on the clasp: it touches, the two half-rings show their two different syllables side by side (*la* | *gu*), and it swings off and drops back into the basket. A wrong guess is answered by the clasp, not by a voice.
- **The trick picture.** Every basket hides one picture that *ends* with the right syllable (*sca-la* when the clasp says *la*) — children who pick "the one with *la* in it" learn by the clasp that it has to be at the START.
- **The earned show:** a finished chain rings — each link swings in turn left to right with a rising chime — and then the whole chain flies up and hooks onto the **festone** (the garland) across the top of the stage. Across a pass the festone grows into one long garland of rings and syllables.
- **Free play:** between rounds the child can tap any festone ring to hear its chain of words and pull the festone to make it sway.
- No timer, score, streak or lives.

## 3. The skill and the misconception
- **Skill (RF.K.2.B):** segment spoken words into syllables well enough to isolate the LAST syllable of one word and the FIRST syllable of another (Levels 1–2, oral — the picture gives the word, no reading needed); count the syllables of a word and blend them in order (Level 3).
- **Misconception 1 — "a syllable anywhere in the word will do"** (picking *sca-la* for *la*). Pushback: the clasp only closes on a word that STARTS with the syllable; the position lure in every basket makes this visible.
- **Misconception 2 — the first SOUND instead of the first syllable** (picking *lu-na* for *la* because both start with l). Pushback: neutral distractors include same-first-letter words (*lu-na*, *pal-la* vs *pe-ra*), and the clasp shows the two syllables side by side when they do not match.
- **Misconception 3 — counting letters** (Level 3: *arcobaleno* has many letters, but *casa* is short). Pushback: the link's sockets must equal the beats; extra sockets stay empty and pop, too few leave two syllables crammed.
- **Misconception 4 — order** (Level 3). Pushback: tiles fill sockets left to right; the link only closes on the word.

## 4. The stage
**Layout: stacked at every width** (layout check 2026-10-17: no `layout:'split'` — its stage column is only ≈ 370 px at 704, too narrow for this apparatus). The stage takes the full card width, ≈ 648 px at 704 (≈ 656 at 1024); whatever §4 places in a left, right, side or bubble column stays side by side inside the stage when the activity draws it, while the shell's bubble, keypad and Check sit under the stage. Sizes written for a wider stage fit the 648 px by closing margins and gaps first; no picture drops below 96 px, no tap below 44, no data mark or grid cell below 40.

**At 704 px:**
- **The wall hook** — at the stage's left edge, a brass hook (geometry) 30 × 40.
- **The chain** — hangs from the hook as a gentle curve across the stage. Each **link** is an oval ring frame 112 × 128 px (cream `#FBF3E4` fill, 4 px ink outline, a brass rim) holding a **library picture 96 px**; under the picture, after the link is hooked, its word is written split in Nunito Bold 18 px (`pal · la`).
- **Clasps** — between links, a round brass clasp 40 px; the SHARED syllable is engraved on the clasp in ExtraBold 20 px once two links are joined (*la*). The open clasp at the end of the chain shows the syllable that must start the next word, in a glowing ring.
- **The basket** — under the chain, a woven-pattern tray 470 × 140 holding 3 picture cards 120 × 120 (picture **104 px**), shuffled.
- **The festone** — along the top of the stage, a thin garland 470 × 36 where each finished chain collects as a row of small drawn brass rings (geometry, 20 px) with its joint syllables written on the clasps (*la · ma*) — words and rings, never a shrunken picture (record ruling).
- **Level 3** — one big link 420 × 170 in the centre: the picture **120 px** at its left, and a row of sockets (64 × 56, dashed outline) inside it; a **+ / −** pair of round brass knobs (48 px) at its right end adds/removes sockets (1–5); syllable tiles (64 × 56, ExtraBold 24 px) appear in the basket after the count.
- **Right column** — bubble, Check. (In Levels 1–2 the pictures are on the chain and in the basket, so no separate picture frame; tap any picture = its word, TTS bonus.)
- **Task line** above.

**At 360 px** (stacked): festone strip (hidden at 320) · chain with links 80 × 92 (picture **64 px**, word 14 px), clasps 30 px; a 4-link chain curves down in a gentle U so it fits 336 px · basket 336 × 104 with cards 96 × 96 (picture **80 px**) · Level 3: link 336 × 150 (picture 80 px, sockets 52 × 48, tiles 52 × 48 at 20 px; five sockets = 52·5 + 4·4 = 276 px) · bubble · Check. Check bottom ≤ 690 at 360 × 740; at 320 × 640 links 72 × 84, cards 88 × 88 → Check ≤ 612.

**Library pictures** (each checked in the theme JSON with the it label equal to the word): toys/ball, robot · farm animals/llama, bee, bull, sheep, hen · body parts/hand, nose · easter/feather, flower · tools/ladder · At the Supermarket/pear, banana · camping/frog, moon, oar, lake · animals/cat, owl, dog, fox · flowers/rose, sunflower · beach/sun, lighthouse · ocean life/seal · fruits/blackberry, fig · around the house/broom, shovel, pen, bed, vase, key, sofa, door · vehicles/ship · insects and bugs/wasp · music/guitar, keyboard · clothing/dress · forest creatures/caterpillar, mouse · accessories/crown · birds 2/dove · kitchen tools/bottle · spring/grass · music/harp · 4th of July/cake · Level 3: animals/dog, zebra, turtle · easter/butterfly · fruits/strawberry · accessories/umbrella · easter/rainbow · vehicles/bicycle, helicopter · miscellaneous/house. Contact sheets seen: animals, farm animals, easter, beach, toys, weather, christmas.

## 5. The hand
- **Hook a picture (Levels 1–2):** drag a basket card to the open clasp (drop within 50 px). The card swings to the clasp (160 ms):
  - first syllable matches → the clasp closes with a *clink*, the card becomes a link (ring frame grows around it, 200 ms), its word appears split under it, the shared syllable is engraved on the closed clasp, and the NEW open clasp appears at its far end showing its last syllable.
  - no match → the two half-rings show their syllables side by side (*la* | *gu*) for 700 ms, the card swings back and forth twice and drops back into the basket (*tunk*). In Levels 1–2 the hook IS the check (like a key in a lock): the first wrong hook in a step is miss 1, the second is miss 2.
- **Tap a card or link** → its word (TTS bonus), the card bounces 4 px.
- **Unhook:** tap the last link → it swings off back to the basket (only the last; undo).
- **Level 3 — set the sockets:** tap **+** / **−** (or drag the link's right edge) → a socket slides in/out (160 ms, *tick*); 1–5; the link starts with 1 socket. Then **Check** ("Conta") checks the count; when right, tiles drop into the basket.
- **Level 3 — fill:** tap a tile → it flies to the first empty socket; tap a filled socket → its tile returns. Drag works too. **Check** checks the word.
- **Keyboard:** Levels 1–2: ←/→ choose a basket card, Enter hooks it, Backspace unhooks the last link. Level 3: + / − keys, Tab through tiles, Enter places, Backspace returns the last.

## 6. The rounds
Order-only reshuffle per pass; never the same order twice in a row. Basket order is a fresh shuffle per step.

**Level 1 — Catene corte (two-syllable words; the first link is given; 2 steps), 9 rounds.** Each step's basket: the answer · a POSITION lure (ends with the clasp syllable) · a neutral picture.

| # | start link | clasp → basket (answer · lure · neutral) | clasp → basket |
|---|---|---|---|
| 1 | pal·la (ball) | **la** → la·ma (llama) · sca·la (ladder) · gu·fo (owl) | **ma** → ma·no (hand) · piu·ma (feather) · ro·sa (rose) |
| 2 | a·pe (bee) | **pe** → pe·ra (pear) · vol·pe (fox) · ca·ne (dog) | **ra** → ra·na (frog) · mo·ra (blackberry) · let·to (bed) |
| 3 | gat·to (cat) | **to** → to·ro (bull) · let·to (bed) · a·pe (bee) | **ro** → ro·sa (rose) · fa·ro (lighthouse) · so·le (sun) |
| 4 | lu·na (moon) | **na** → na·so (nose) · ra·na (frog) · pe·ra (pear) | **so** → so·le (sun) · va·so (vase) · gu·fo (owl) |
| 5 | gu·fo (owl) | **fo** → fo·ca (seal) · na·ve (ship) · pal·la (ball) | **ca** → ca·ne (dog) · muc·ca (cow) · ro·sa (rose) |
| 6 | fio·re (flower) | **re** → re·mo (oar) · lu·na (moon) · to·po (mouse) | **mo** → mo·ra (blackberry) · ca·ne (dog) · so·le (sun) |
| 7 | sco·pa (broom) | **pa** → pa·la (shovel) · ar·pa (harp) · na·so (nose) | **la** → la·go (lake) · pal·la (ball) · ve·spa (wasp) |
| 8 | pen·na (pen) | **na** → na·ve (ship) · lu·na (moon) · to·ro (bull) | **ve** → ve·spa (wasp) · chia·ve (key) · ma·no (hand) |
| 9 | let·to (bed) | **to** → to·ro (bull) · gat·to (cat) · ra·na (frog) | **ro** → ro·bot (robot) · fa·ro (lighthouse) · pe·ra (pear) |

(No pictured 2-syllable word ends in *fo*, *re* or *mo* except the chain's own links, so round 5 step 1 and both steps of round 6 carry a second neutral instead of a lure; the other 15 of 18 steps carry a position lure.)

**Level 2 — Catene lunghe (2–3-syllable words; 3 steps), 9 rounds.**

| # | start | step 1 (answer · lure · neutral) | step 2 | step 3 |
|---|---|---|---|---|
| 1 | a·pe | **pe** pe·co·ra (sheep) · vol·pe · gat·to | **ra** ra·na · mo·ra · pal·la | **na** na·ve · lu·na · to·ro |
| 2 | chi·tar·ra (guitar) | **ra** ra·na · mo·ra · gu·fo | **na** na·so · lu·na · ve·spa | **so** so·fà (sofa) · va·so · pe·ra |
| 3 | gal·li·na (hen) | **na** na·ve · pen·na · ro·sa | **ve** ve·sti·to (dress) · chia·ve · ca·ne | **to** to·po (mouse) · gat·to · so·le |
| 4 | chia·ve (key) | **ve** ve·sti·to · na·ve · fo·ca | **to** to·ro · let·to · ra·na | **ro** ro·bot · fa·ro · lu·na |
| 5 | bru·co (caterpillar) | **co** co·ro·na (crown) · fi·co · pal·la | **na** na·so · ra·na · gat·to | **so** so·le · va·so · mo·ra |
| 6 | co·lom·ba (dove) | **ba** ba·na·na · er·ba (grass) · to·po | **na** na·so · lu·na · chia·ve | **so** so·fà · va·so · ca·ne |
| 7 | gat·to | **to** to·ro · let·to · pe·ra | **ro** ro·bot · fa·ro · na·so | **bot** bot·ti·glia (bottle) · so·le · gu·fo |
| 8 | por·ta (door) | **ta** ta·stie·ra (keyboard) · tor·ta (cake) · ma·no | **ra** ra·na · mo·ra · so·fà | **na** na·ve · pen·na · to·po |
| 9 | sco·pa | **pa** pa·la · ar·pa · ro·sa | **la** la·ma · sca·la · ve·spa | **ma** ma·no · piu·ma · ca·ne |

Every chain was checked to be unique: in each basket exactly one card starts with the clasp syllable (gate-asserted on the gated splits). Critic re-check 2026-10-17 (script over all 54 picture words): every word is in `approved-words-it.json` with the shown split and equals its picture's it label; every step satisfies last(prev) = first(answer); every lure ends with the clasp syllable and does not start with it.

**Level 3 — Conta e forma (count the beats, then build the word), 10 rounds.** The old activity's long words.

| # | picture | word | syllables | count | tiles (shuffled) |
|---|---|---|---|---|---|
| 1 | animals/dog | cane | ca·ne | 2 | ne, ca |
| 2 | animals/zebra | zebra | ze·bra | 2 | bra, ze |
| 3 | easter/butterfly | farfalla | far·fal·la | 3 | la, far, fal |
| 4 | fruits/strawberry | fragola | fra·go·la | 3 | go, la, fra |
| 5 | accessories/umbrella | ombrello | om·brel·lo | 3 | lo, om, brel |
| 6 | animals/turtle | tartaruga | tar·ta·ru·ga | 4 | ru, ga, tar, ta |
| 7 | flowers/sunflower | girasole | gi·ra·so·le | 4 | so, le, gi, ra |
| 8 | vehicles/bicycle | bicicletta | bi·ci·clet·ta | 4 | clet, ta, ci, bi |
| 9 | easter/rainbow | arcobaleno | ar·co·ba·le·no | 5 | ba, no, le, ar, co |
| 10 | vehicles/helicopter | elicottero | e·li·cot·te·ro | 5 | te, ro, cot, li, e |

Counts: 2 ×2, 3 ×3, 4 ×3, 5 ×2. Tiles never start in word order.

**Answer position.** Levels 1–2: the answer's basket slot is balanced (each of the 3 slots holds it 6 times per level in L1, 9 times in L2) and re-shuffled per render; gate: "always take the left card" ≤ 0.36; "always take the card whose word CONTAINS the clasp syllable anywhere" is wrong half the time on the 15 lure steps (two cards contain it), so it solves ≤ 0.6 of L1; "same first letter" bot ≤ 0.4. Level 3: count has no position; tiles: "place in basket order" ≤ 0.2.

## 7. Check, the misses, the success
- **Levels 1–2 — the hook is the check** (no Check press needed): each drop on the clasp is evaluated. With no drop, Check gives the hint "Trova l'immagine che comincia con *{syl}*." (EN "Find the picture that starts with *{syl}*.") — no miss.
- **L1/L2 miss 1** (first wrong hook in a step) — the half-rings show the card's first syllable beside the clasp's (*la* | *gu*) and it drops back. If the card was the position lure: "*{word}* finisce con *{syl}*. Serve una parola che COMINCIA con *{syl}*." ("*{word}* ends with *{syl}*. We need a word that STARTS with *{syl}*.") · otherwise: "*{word}* comincia con *{first}*, non con *{syl}*." ("*{word}* starts with *{first}*, not *{syl}*.")
- **L1/L2 miss 2** (second wrong hook) — every basket card shows its first syllable on a small tag for 1.5 s (the clasp syllable glows), and TTS says the previous word in syllables stressing the last. "Di' *{prevWord}* piano: l'ultimo pezzo è *{syl}*." ("Say *{prevWord}* slowly: the last part is *{syl}*.")
- **L3 count (Check "Conta"):** right → tiles drop into the basket. Too few sockets: the word's syllables flow in and the last socket holds two crammed side by side, with a crack line between them; "Nell'ultima casella ci sono due sillabe. Aggiungine una!" ("The last box has two syllables. Add one!") · too many: the extra sockets stay empty and pop out with a *tick*; "Questa casella non ha sillaba." ("This box has no syllable.") — then the sockets return to the child's count. **Miss 2:** TTS claps the word while one socket outline per beat lights in turn. "Batti le mani: una casella per ogni battito." ("Clap: one box for every beat.")
- **L3 build (Check):** sockets with the right tile glow and lock; wrong ones return their tiles. "Le caselle che brillano sono giuste." ("The glowing boxes are right.") · **miss 2:** the first wrong socket's tile flies in by itself. "La prossima sillaba è *{syl}*." ("The next syllable is *{syl}*.")
- **A new move takes the help away** until the next Check / hook.
- **Success:** L1/L2 — the chain rings link by link with rising chimes, the clasps' syllables light in sequence (*la … ma*), then it flies to the festone. Bubble: "*{w1}* → *{w2}* → *{w3}*: la catena è chiusa!" ("… the chain is closed!") · L3 — the link closes into a ring, its syllables slide together into the word, it joins the festone: "*{s1} · {s2} · …* = *{word}*: {n} sillabe!" ("{n} syllables!"). End of pass: the festone lights link by link.

## 8. Settings
1. **Catena** (Levels 1–2): Corta / Lunga is the level picker; the setting is **Trabocchetto** (the position lure): Sì (default) / No — without the lure, two neutral distractors (for the youngest). Visible at rest (basket contents).
2. **Sillabe sulle immagini** (Levels 1–2): Dopo l'aggancio (default — words appear only on hooked links) / Sempre (every basket card shows its word split under the picture, for early readers). Visible at rest.

## 9. Words (EN source; build authors it; one native it + pedagogy reviewer)
- Title frozen. Instrument name in aria: "La catena delle sillabe".
- Instruction: EN "Each picture hooks onto the chain with a syllable: the last syllable of one word is the first syllable of the next. Then count the beats and build the long words." → it draft "Ogni immagine si aggancia alla catena con una sillaba: l'ultima sillaba di una parola è la prima della parola dopo. Poi conta i battiti e forma le parole lunghe."
- Task lines: L1/L2 "Quale immagine si aggancia a *{syl}*?" ("Which picture hooks onto *{syl}*?") · L3 "Quante sillabe? Poi forma la parola." ("How many syllables? Then build the word.")
- Hints and celebrations: §7. Settings: "Trabocchetto" / "Sì" / "No" · "Sillabe sulle immagini" / "Dopo l'aggancio" / "Sempre". Levels: "Catene corte" / "Catene lunghe" / "Conta e forma". The L3 count button text is the shell Check; hint prose calls it "Conta".
- aria: "Catena di {n} anelli" · "Gancio aperto: {syl}" · "Immagine: {parola}" · "Anello con {n} caselle" · "Casella {i}: {sillaba|vuota}".

**Locale traps (it):**
- **Double consonants split between the two** (`gat·to`, `pal·la`, `let·to`, `far·fal·la`) — the gated rule Italian children learn ("le doppie si dividono"); the chain relies on it (*gat·to* ends in *to*).
- **Digraphs/trigraphs stay together**: `chia·ve` (chi), `co·ni·glio` (gli), `bot·ti·glia`, `sco·pa` (s impura goes with the next syllable) — all from the gated list.
- **Shared syllable = same spelling and same sound.** Every chain's joint was checked for an identical written syllable; vowel openness (ò/ó in *rosa*, *robot*) is not distinguished in Italian school syllabification, so *ro·sa* / *ro·bot* share *ro* honestly; the reviewer confirms no joint sounds different to an Italian child.
- **Accent on *so·fà*** is kept on the tile and in the word.
- **No articles** on the apparatus (il/la/lo never appear), so gender is not a trap.
- **Lowercase**; Italian school syllables are written in lowercase (*stampato minuscolo*); the reviewer may ask for UPPERCASE (*stampato maiuscolo*), which many infanzia classes use first — offered as a setting only if the reviewer asks (all strings are lowercase data; casing is a CSS transform).

## 10. Sound off, access, phones
- **Sound off:** Levels 1–2 are oral by design (the child names the pictures); the clasp's side-by-side syllables and the engraved joint are visual; no reading is required to play, reading only enriches. TTS (tap a picture) is a bonus.
- **Keyboard:** §5; aria-live "*{parola}* agganciata a *{syl}*", "*{parola}* non si aggancia: comincia con *{first}*", "La catena è chiusa".
- **Taps:** basket cards 120 / 96 / 88 px; clasp drop zone 50 px radius; + / − knobs 48 px; tiles ≥ 52 × 48.
- **Pictures:** links 96 px, basket 104 px at 704; links 64, basket 80 px at 360.
- **Phone:** the chain hangs in a U-curve; the festone hides at 320.

## 11. Distinct from
- **Rows 44–48, 50:** chop, roll, pull, thread, hop, topple — only this one links DIFFERENT words through a shared syllable (first/last syllable isolation), the Italian *catena di parole*.
- **Premium story-line** — pegs story cards in narrative order on a line; here pictures join by a syllable rule and a clasp that physically refuses a mismatch.
- **New #215 The Bead Rail / premium syllable-splitter** — counting beats with beads or a drum; Level 3 here counts by sizing a link.
- **#17 The Partner Bows (built)** — pairs that belong together by meaning; here pictures join by sound.

## 12. Build plan
- **Data:** `params.levels.{short:[{start, steps:[{syl, answer, lure|null, neutral:[…]}]}], long:[…], build:[{noun,themeDir,word,split}]}`; each picture word `{noun, themeDir, word, split}` with the split copied from `approved-words-it.json` by key.
- **Core state** `{level, round, chain:[wordId…], step, basket:[wordId…], sockets:n, tiles:[…], filled:[…], misses}`; functions `hook(wordId)` → `{closes, cardFirst, clasp, isLure}`, `unhookLast()`, `setSockets(n)`, `countCheck()` → `right|short|long`, `fill(tileId)`, `unfill(i)`, `buildCheck()` → `{right, lockedIdx:[…]}`.
- **Gate's own ground truth** (`verify-syllable-chain-core.js`): the 70-odd words with their splits typed into the gate; for every step: `last(prev) === first(answer)`; exactly one basket card has `first === clasp`; the lure (where present) has `last === clasp` and `first !== clasp`; no neutral starts with the clasp; all pictures exist with it label = word; L3: count right iff sockets = syllables; short = leftovers in the last socket; long = extras pop; build right only in word order; tiles never start in word order; slot balance and bots as §6.
- **Mutations:** a chain step whose answer is also the start link or appears twice in the same chain (`gat·to → to·ro → ro·bot → bot…` must never loop back to a picture already on the chain) · clasp closes on any word CONTAINING the syllable · clasp compares first letters instead of syllables · lure removed from all steps · two basket cards start with the clasp syllable · answer always in the left slot · unhook removes any link · L3 short spreads syllables evenly · L3 long keeps empty sockets · L3 accepts any order · miss 2 marks the answer card instead of showing every card's first syllable · reshuffle repeats an order.
- **Pictures to verify on a contact sheet at build:** farm animals/llama (seen), tools/ladder, easter/feather (seen), At the Supermarket/pear, camping/frog, oar, lake, moon, fruits/blackberry, fig, around the house/broom, shovel, pen, bed, vase, key, sofa, door, vehicles/ship, insects and bugs/wasp, music/guitar, keyboard, harp, clothing/dress, forest creatures/caterpillar, mouse, accessories/crown, birds 2/dove, kitchen tools/bottle, spring/grass, 4th of July/cake, ocean life/seal.
- **Risks:** a 4-link chain at 320 px — links 72 px in a U-curve fit (4 × 72 + 3 × 26 = 366 measured along the curve, 300 px chord) — verify in the local test; music/keyboard must read as a piano keyboard (*tastiera*), else swap chain 8 for gal·li·na → na·ve → ve·sti·to → to·ro.
- **Blocked:** none.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — a chain that clinks shut and grows into a garland is a toy, and the trick picture is a riddle children love to catch.
2. **Would a teacher put it on the board?** Yes — it is *la catena di parole*, the syllable game every Italian infanzia teacher knows, with the first-versus-last confusion answered by a clasp that will not close; the long-word level keeps the old blending content and adds counting.
3. **Would a parent trust it?** Yes — every chain is built from gated syllables and library pictures; no score; the pictures do the talking.
4. **The invention:** a chain whose hooks are syllables — the end of one word must be the start of the next, or the clasp will not close.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 5→5 · correctness 5→5 · distinctness 5→5 · reality 4→5
What changed:
- Re-verified every L1/L2 chain step and every L3 word by script against `approved-words-it.json` and the it labels (54 words, all approved, all equal to their pictures; s-impura splits *ve·spa*, *ve·sti·to*, *ta·stie·ra* are the Italian school split). Contact sheet confirms music/keyboard reads as a *tastiera* and camping/oar as a *remo*.
- The festone no longer collects 24-px pictures (record ruling): finished chains become drawn rings with the joint syllables written on their clasps.
- Added a gate rule + mutation that no chain revisits a picture already on it.
- Kept: the Italian *catena di parole* (last syllable → first syllable) with the position lure in 15 of 18 L1 steps, the clasp that physically refuses a mismatch, and the long-word count-and-build level from the old pool.
- Layout check (2026-10-17): switched to stacked — split stage column is ~370 px at 704.

