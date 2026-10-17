# Row 190 — Marigold's Knowing Machine → THE ACT-IT-OUT GAUGES (L.2.4.b)

## 0. Identity
- id `affix.apply.l-2-4-b` (KEPT; slugs en de fr es pt it nl sv, titles and intros frozen) · grade 2 · Common Core L.2.4.b (determine the meaning of the new word formed when a known prefix is added to a known word) · strand Vocabulary Acquisition and Use · page title (frozen) "Marigold's Knowing Machine — Prefixes & Suffixes Word Meaning (Grade 2)" · own files `mini tools/knowing-machine-core.js`, `knowing-machine-activity.js`, `knowing-machine-activity.html`; the manifest row stays in `affix-activities.json` with `tool` repointed. da/no/fi need new slug/title/intro at build.
- worksheets it covers: **G2-320** Antonyms with un-, dis-, in- (→ the SWITCH gauge, Level 1–2) · **G2-376** Prefixes re-, pre- and mis-: Pick by Meaning (→ LOOP / TIMELINE / TARGET gauges, Level 2, and the *Pick the part* task, which is exactly the sheet's "find its prefix in the key") · **G3-398** Who Does It? The Person Word (→ the PERSON gauge, Level 3).
- **what the old activity did:** showed a built word ("unkind") and three meaning phrases to tap (root alone / right meaning / the opposite affix's meaning), plus three "which affix" rounds. **Kept:** every word of all eight locales' rounds (en unkind … spotless, careful/useless/retie; de mutlos … unglücklich; fr refaire … nuageux; es desordenar … cariñoso; pt desarrumar … carinhoso; it disordinato … rumoroso; nl ongelukkig … hoopvol; sv osnäll … fantasifull) — they become the Level 1 apply rounds and the "which" rounds of their locale. **Fixed (measured on the live manifest, `work-36`):** (1) in en, de, nl and sv every apply round offers the bare root ("kind") as an option and it is never right, and the right meaning is never the shortest option — a "skip the shortest" rule wins half the time; nl's right answer is the longest option in 6 of 8 rounds, sv in 5 of 8; (2) fr, es, pt and it distractors include meaningless phrases ("plein de faire", "lleno de ordenar", "cheio de arrumar", "pieno di libri", "ordinato di nuovo") that a child can strike out as nonsense without knowing the prefix. Both disappear by construction: the answer is no longer a phrase to pick but a gauge to set.

## 1. The pitch
"Marigold's Knowing Machine has a gauge for every kind of word part — a jar for *full of* and *without*, a switch for *not*, a loop for *again*, a slider for *before*, a target for *wrongly*, a badge for *a person who* — so you show what the new word means by setting the right gauge, and the machine checks by turning the same gauge itself."

## 2. Why a child will want it again (the fun)
- **Six chunky, clicky gauges** on a brass-and-teal machine panel, each a toy: the **jar** has a lever that pours drawn little tokens of the root in or out (*clink-clink*), the **switch** is a fat toggle that snaps over with a *thunk*, the **loop** is a bead on a round track that runs round a second time with a *whirr*, the **timeline** slider glides left of the "now" post, the **target** lets you drag the arrow out of the bullseye (*twang*), the **badge** frame flips round to show a person. Children will flick them for fun.
- **The machine answers back with its own hand.** At Check, a second needle — Marigold's, in brass — moves on the gauge the word part really drives; if the child's setting and the brass needle meet, the gauge lamp glows and the machine prints a little ticket strip with the word and its meaning ("fearless — without any fear").
- **End-of-round show:** every right word's ticket is clipped onto a string across the top of the machine; after a pass the string of tickets lifts and the machine plays a short run of its own sounds — clink, thunk, whirr, twang — one per gauge used.
- **Free play:** between rounds every gauge can be flicked; the word window then builds the matching word from the round's root if the machine knows one ("care" + jar empty → **careless** appears, faint), so a child can explore "what would this make?" — no recording, no checking.
- No timer, score, streak or lives.

## 3. The skill and the misconception
- **Skill:** a known word + a prefix/suffix makes a new word whose meaning is built from both: un-/dis-/in- = not / the opposite; re- = again; pre- = before; mis- = wrongly; -ful = full of; -less = without; -er = a person who. Read the new word, find the part, know what it adds. (Each locale's own parts, §9.)
- **Misconception 1 — -ful and -less mixed up** (helpful vs helpless). Pushback: both drive the SAME jar, in opposite directions — full vs empty — so the mistake is the jar standing full when the brass needle runs to empty. The two ends of one gauge make the opposites visible.
- **Misconception 2 — every prefix means "not"** (re- read as un-). Pushback: re- does not move the switch at all; the brass needle runs round the loop. A child who flips the switch for *retell* sees the switch stay dark and the loop light.
- **Misconception 3 — the new word means the root** (unkind = kind). Pushback: every gauge starts at its resting state = the root as it is (switch on the root, jar half, loop once, slider at now, arrow in the bullseye, badge empty); "doing nothing" is never right, so the old trap answer ("kind") is the gauge left untouched and Check says so by moving the brass needle away from rest.
- **Misconception 4 — a person word is just another word ending** (baker = "to bake"). Pushback: the PERSON badge needs a PERSON: three library people, the one who does the root.

## 4. The stage
**Layout: stacked at every width** (layout check 2026-10-17: no `layout:'split'` — its stage column is only ≈ 370 px at 704, too narrow for this apparatus). The stage takes the full card width, ≈ 648 px at 704 (≈ 656 at 1024); whatever §4 places in a left, right, side or bubble column stays side by side inside the stage when the activity draws it, while the shell's bubble, keypad and Check sit under the stage. Sizes written for a wider stage fit the 648 px by closing margins and gaps first; no picture drops below 96 px, no tap below 44, no data mark or grid cell below 40.

**At 704 px**
- **The machine** (stage 470 × 470): a drawn panel (cream, 3 px teal frame, four brass rivets). Top: the **word window** (430 × 72) showing the built word in Baloo 2, 40 px; under it the **root plate** (the known word, Nunito 20 px, e.g. "fear") — the root is given, the meaning is the task.
- **Gauge bay** (2 rows × 3 cells of 140 × 150; L1 uses 2 or 3 cells, L2 4–5, L3 adds the badge): each gauge is drawn geometry with the ROOT word printed on it where meaning needs it:
  - **JAR** — a glass jar 80 × 110 with a lever at the side; states *empty* / *half (rest)* / *full* (and *overflowing* where the locale has an "over/too much" part, §9); the jar fills with up to 12 drawn tokens (teal discs 10 px) and its label reads the root ("fear").
  - **SWITCH** — a toggle 60 px on a plate 120 × 60; the left end of the plate shows the root word, the right end is an empty hollow bracket; rest = lever toward the root.
  - **LOOP** — a round track 100 px with a bead; two notches "1" and "2" (numerals are content); rest = 1.
  - **TIMELINE** — a rail 120 px with a centre post and a slider; three click positions *before* (left) / *now* (rest) / *after* (right); post ends drawn as a small sun-up and sun-down arc (geometry).
  - **TARGET** — rings 90 px with an arrow; rest = arrow in the centre; drag it to the outer ring = *off the mark*.
  - **BADGE** (Level 3) — a frame 110 × 110 that, when tapped, opens to three library people (96 × 96 each in a small tray below the machine) to put in it.
  - Locale-only gauges (§9): **DOOR** (a drawn door frame with a token that can stand inside / outside / joined to a group of tokens — the last state is nl *mee-* "together"), **SHELF** (a line with a token above / on / below it). (The designer's TURN gauge is dropped: its only users, de *um-* words, mean *change* in the bank glosses.)
- **Clip tray** (task *Pick the part* only): three clips (110 × 52, Baloo 2 26 px) carrying word parts ("re", "pre", "mis"), and a socket on each side of the root plate (prefix left, suffix right).
- **Ticket string** (top edge, 30 px): tickets of solved words (drawn paper strips with the word, Nunito 13 px — a record, not a picture).
- **Task line (≤ 24 px):** *Show it* "Set the machine to show what the new word means." · *Pick the part* "The machine shows a meaning. Clip on the part that makes it."

**At 360 px** (stacked): word window 340 × 60 (Baloo 2, 32 px), root plate 18 px; gauge bay 2 columns of 160 × 132 (Level 2's five gauges → 3 rows; the jar 64 × 90, tokens 8 px; switch 52 px; loop 84; target 76), badge tray of three people at 96 × 96 in a row (3 × 96 + gaps = 312) — at 320 the people are 88 × 88 (≥ 64). Check bottom at 360 × 740: header 56 + task 52 + window 68 + root 30 + bay (3 × 140) + Check 52 = 678 ≤ 740; at 320 × 640 the bay cells drop to 120 → 618.
- Library pictures: only the occupation people of the badge (≥ 96 at 704 and 360). Everything else is drawn apparatus. The only words on the apparatus are the built word, the root and the part clips — all content.

## 5. The hand
- **Jar lever:** drag down = fill, up = empty; three (four) detents with a click; tokens drop in/out with a tiny clink each (each token 25 ms). Tap the jar = cycle states. Keyboard: focus, Up/Down.
- **Switch:** tap or drag; *thunk*; the lever animates 120 ms.
- **Loop:** drag the bead round the track or tap the "2" notch; the bead runs a full lap (300 ms, *whirr*) to arrive at 2.
- **Timeline:** drag the slider; three detents.
- **Target:** drag the arrow; it snaps to centre or outer ring; *twang*.
- **Badge:** tap the frame → the three people slide up from below; tap one → it flies into the frame (200 ms); tap the frame again to empty it.
- **Clips (Pick the part):** drag a clip to the socket on the side where it belongs (a prefix clip only snaps to the left socket, a suffix clip only to the right — the side is shape, not a test); the word window shows the joined word.
- Only one gauge counts per round, but the child may move several; Check compares ALL gauges with the word: every gauge must stand at rest except the one the word part drives, which must stand at its meaning (so "flick everything" never passes).
- Everything is movable until Check; after success the round locks.

## 6. The rounds
Settings: **Word parts** (3 levels) × **Task** (*Show it* / *Pick the part*). Order-only reshuffle per pass; never the previous order; never the same gauge as the answer three rounds running.

**EN — Level 1 · un- / -ful / -less** (gauges: SWITCH, JAR)
*Show it* (9): unkind → SWITCH not · unhappy → SWITCH · unlucky → SWITCH · colorful → JAR full · helpful → JAR full · careful → JAR full · fearless → JAR empty · spotless → JAR empty · useless → JAR empty. (switch / full / empty = 3 / 3 / 3; a "flip the switch every time" bot = 3 of 9, "always fill the jar" = 3 of 9.)
*Pick the part* (9; the gauge is pre-set by the machine, the root on the plate, clips un · ful · less): kind + SWITCH → un · care + JAR full → ful · use + JAR empty → less · happy + SWITCH → un · color + JAR full → ful · spot + JAR empty → less · help + JAR empty → less (helpless) · lucky + SWITCH → un · joy + JAR full → ful. Right clip's tray slot top/middle/bottom dealt 3/3/3 per pass.

**EN — Level 2 · re- / pre- / mis- / dis- / in-** (gauges: LOOP, TIMELINE, TARGET, SWITCH) — words from the G2-376 bank (`data/b5/word-parts.js prefixKey`, native-signed glosses) and G2-320:
*Show it* (12): reread → LOOP 2 · refill → LOOP 2 · retell → LOOP 2 · preheat → TIMELINE before · preview → TIMELINE before · prepay → TIMELINE before · misspell → TARGET off · miscount → TARGET off · misplace → TARGET off · dislike → SWITCH not · dishonest → SWITCH not · incorrect → SWITCH not. (3 / 3 / 3 / 3.)
*Pick the part* (9; clips = the right part + two others chosen with the bank's `crossCheck`, so one distractor often makes a real word that does NOT fit the gauge — e.g. root *read* with LOOP 2: re ✓, mis (misread is a word, but the arrow is in the bullseye), pre (not a word)): read+LOOP → re · heat+TIMELINE → pre · spell+TARGET → mis · like+SWITCH → dis · count+TARGET → mis · view+TIMELINE → pre · fill+LOOP → re · correct+SWITCH → in · tell+LOOP → re. No root accepts two clips that both fit its gauge (gate).

**EN — Level 3 · person words -er** (BADGE + review)
*Show it* (12 a pass): **6 person words** drawn from the pool baker · singer · farmer · gardener · runner · dancer · photographer · teacher (the BADGE: pick the person; the pool rotates so all 8 appear within two passes) + **6 review words, one per other gauge** — helpless (JAR empty) · careful (JAR full) · unlucky (SWITCH) · retell (LOOP) · preheat (TIMELINE) · misspell (TARGET). Critic-measured: "always open the badge" = 6/12 and even then the person must be right; no other gauge > 1/12. Badge trays (right person + 2): baker {baker, farmer, teacher} · singer {singer, gardener, photographer} · farmer {farmer, ballerina, baker} · gardener {gardener, athlete, singer} · runner {athlete, photographer, farmer} · dancer {ballerina, teacher, gardener} · photographer {photographer, baker, athlete} · teacher {teacher, singer, ballerina}; the right person's tray place is DEALT per pass from a balanced deck (left/middle/right 2/2/2 of the 6 person rounds), never fixed to the tray listing order. Rules: occupations/singer and occupations/musician both hold guitars — never together; teacher and librarian both hold red books — librarian never used; no answer depends on the person's sex (the cast is stereotyped, §PICTURE-RULINGS). Seen on the occupations contact sheet: athlete = a woman sprinting (a runner), ballerina = a dancer, singer = a man with guitar + microphone, photographer = a man with a camera, gardener = a man with a spade, teacher = a woman.
*Pick the part* (9): the machine pre-sets the gauge and the root plate; clips **-er · -ful · -less** in every round. **3 person rounds** (badge holds the person, root "bake" / "sing" / "farm" → -er) + **3 JAR-full** (care, joy, color → -ful) + **3 JAR-empty** (help, fear, spot → -less). A constant "always clip -er" bot = 3/9 (it was 8/8 — every L3 round had answer -er — in the designer's draft). Spelling changes are done by the machine: bake+er → baker, run+er → runner; the word window shows the real spelling.

**Other locales** — the machine keeps every live round (§0) and fills levels from the native-signed bank:
| locale | Level 1 (gauges) | Level 2 (gauges) | Level 3 person words |
|---|---|---|---|
| de | un-, -los, -voll (SWITCH, JAR) — live: mutlos, fehlerlos, kraftlos, liebevoll, hoffnungsvoll, respektvoll, unfreundlich, unglücklich (+ the 3 "which") | ein- (DOOR in), aus- (DOOR out), vor- (TIMELINE before), wieder- (LOOP) — see the word map below; **um- is NOT used** (bank meaning "anders oder herum": umziehen/umbauen mean *change*, not *turn* — no honest gauge) | Bäcker, Sänger, Gärtner, Läuferin (the athlete is a woman), Tänzerin, Lehrerin, Musiker, Apotheker — gender follows the picture |
| fr | dé-/in- (SWITCH), re- (LOOP), -eux (JAR full) — live: refaire, relire, rejouer, défaire, démonter, courageux, peureux, nuageux | re- (LOOP), pré- (TIMELINE), sur- split by meaning (SHELF above / JAR overflowing) — word map below | **-eur/-euse, -ier** (enabled — the printable bank refuses `who-does-it` only because its `agents` portrait list is empty, not because French lacks agent nouns): chanteur (singer), danseuse (ballerina), coureuse (athlete), jardinier (gardener), fermier (farmer), enseignante (teacher) — gender follows the picture; boulanger/photographe excluded (root not a known word / no suffix) |
| es | des-/in- (SWITCH), re- (LOOP), -oso (JAR full) — live rounds | re-, pre-, sobre- split by meaning (SHELF above / JAR overflowing) — word map below | **-dor/-dora, -ero/-era, -ante** (enabled; same empty-`agents` reason as fr): cantante (singer), bailarina (ballerina), corredora (athlete), jardinero (gardener), granjero (farmer), panadero (baker), cajera (cashier — a woman) |
| pt | des- (SWITCH), re- (LOOP), -oso (JAR full) — live | re-, pre-, sub- (SHELF below) | cantor, dançarina, costureira, jardineiro, fazendeiro, cozinheiro… (-or/-eiro) — gender follows the picture |
| it | dis-/in- (SWITCH), ri- (LOOP), -oso (JAR full) — live | ri-, pre-, sotto- (SHELF below) | panettiere, insegnante, cassiera, farmacista, musicista… |
| nl | on- (SWITCH), -loos (JAR empty), -vol (JAR full) — live | her- (LOOP), mee- (DOOR together: token joins a group), uit- (DOOR out / JAR empty for *uitdrinken*) | bakker, hardloopster, danseres, kapper… |
| sv | o- (SWITCH), -lös, -full (JAR) — live | åter- (LOOP), miss- (TARGET), över- (JAR overflowing) | lärare, sångare, löpare, dansare, apotekare, läkare |
| da | u- (SWITCH), -løs, -fuld (JAR) — new, from the bank's families | gen- (LOOP), ind- (DOOR in), ud- (DOOR out) | bager, sanger, løber, danser, lærer, apoteker |
| no | u- (SWITCH), -løs, -full (JAR) — new | gjen- (LOOP), mis- (TARGET), over- (JAR overflowing) | baker, lærer, sanger, løper, danser, syer |
| fi | epä- (SWITCH), -ton/-tön (JAR empty), -kas/-käs (JAR full) — new (voimaton/voimakas, epäreilu …) | refused (no prefix family in Finnish; the bank refuses `prefix-key`) — Level 2 hidden in fi | leipuri, opettaja, laulaja, puutarhuri, valokuvaaja, juoksija, tanssija |
Each locale level has ≥ 9 *Show it* and ≥ 8 *Pick the part* rounds; gauge/state balance as in EN (no state > 40 % of a level); the native author fills any gap from `word-parts.<loc>.json` families, never inventing a word.

**Level 2 word map — every bank word gets its own gauge or is left out (critic, checked against each `word-parts.<loc>.json` gloss).** A part with two meanings is never mapped blindly.
- **de** (bank has only ein/aus/um; the native author adds real words for vor-/wieder-, reviewer-signed): DOOR in — einsteigen, eintreten, einpacken, einatmen · DOOR out — aussteigen, auspacken, ausatmen · JAR empty — austrinken · TIMELINE before — vorheizen, vorwärmen, vorbestellen · LOOP — wiederkommen, wiederfinden. Left out: einschlafen, einkaufen (ein- is not "in" there), ausschalten (off, not out), all um- words.
- **fr**: LOOP — relire, refaire, recoller, revenir · TIMELINE — préchauffer, prédire, prévoir · SHELF above — survoler, surélever · JAR overflowing — surcharger.
- **es**: LOOP — releer, rellenar, rehacer, recontar · TIMELINE — precalentar, prever, predecir · SHELF above — sobrevolar · JAR overflowing — sobrecargar. Left out: sobrepasar (go beyond a line).
- **pt**: LOOP — reler, refazer, recontar, reescrever · TIMELINE — prever, predizer, preaquecer · SHELF below — subsolo, subtítulo, subchefe.
- **it**: LOOP — rileggere, rifare, riscrivere, ricontare · TIMELINE — prevedere, predire, prevendita · SHELF below — sottosuolo, sottobosco, sottomarino, sottotetto.
- **nl**: LOOP — herlezen, hertellen, herbouwen · DOOR together — meezingen, meenemen, meehelpen · DOOR out — uitpakken, uittrekken · JAR empty — uitdrinken. Left out: uitblazen (blow OUT = put out; no honest gauge).
- **sv**: LOOP — återanvända, återberätta, återbesöka · TARGET — missförstå, misslyckas · JAR overflowing — överfylla, överkoka, överdriva. Left out: återfå, återvända (back, not again).
- **da**: LOOP — genbruge, genlæse, genfortælle, genåbne · DOOR in — indånde, indpakke, indsætte · DOOR out — udlåne, udklippe. Left out: udskifte (replace).
- **no**: LOOP — gjenbruke, gjenfortelle, gjenåpne, gjenfinne · TARGET — misforstå, mislykkes · JAR overflowing — overspise, overfylle, overkoke, overdrive.
- **fi**: no Level 2 (the bank refuses prefix-key; Finnish has no productive prefix family for G2) — hidden.
Where a locale's honest list is below 9 *Show it* rounds, the level repeats its words across both tasks rather than adding a dubious word; the gate counts honest words only.

## 7. Check, the misses, the success
- **Check with every gauge at rest** (and no clip) → hint, no miss: "Move the gauge that shows what the new word means." The brass needle stays still.
- **Miss 1:** the word part in the word window gets a coral outline (the *less* of *fearless*) and a drawn cable lights from it to the gauge it drives (the jar) — that gauge's lamp blinks; any other gauge the child moved swings back to rest. Hint: "This part of the word works the glowing gauge. What does it do?" (*Pick the part*: the wrong clip pops off and the sockets glow on the side the right part goes.)
- **Miss 2:** on the driven gauge a faint brass ghost marks the right state (the jar shows a dotted line at *empty*; the loop a ghost bead at 2). Hint: "Move it to the faint mark." (*Pick the part*: the right clip's outline pulses once.)
- A new move clears the help until the next Check.
- **Success:** the brass needle moves on the driven gauge and meets the child's; the lamp glows; the machine prints the ticket: "{word} — {meaning}." e.g. "fearless — without any fear." / "reread — to read it again." / "baker — a person who bakes." (meanings are authored per word; Level 2 EN uses the bank's glosses shortened to ≤ 6 words).

## 8. Settings (each visibly changes the board at rest)
1. **Word parts:** *Level 1* (2–3 gauges) / *Level 2* (4–5 gauges) / *Level 3 — person words* (the badge appears). Labels per locale name the parts (en "un-, -ful, -less" / "re-, pre-, mis-, dis-" / "-er person words"). Default: Level 1.
2. **Task:** *Show it* (gauges free) / *Pick the part* (gauge pre-set, clip tray visible). Default: Show it.

## 9. Words (EN source)
- Title (frozen). Instruction: "Read the new word. Set Marigold's machine to show what it means — or clip on the part that makes the meaning."
- Task lines (§4). Hints: `rest` "Move the gauge that shows what the new word means." · `miss1` "This part of the word works the glowing gauge. What does it do?" · `miss1Pick` "That part makes something else. Look at the glowing side." · `miss2` "Move it to the faint mark." · `miss2Pick` "Try the part that is glowing."
- Gauge aria names (not shown): "jar: how much {root}" · "switch: {root} or the opposite" · "loop: how many times" · "timeline: before, now, after" · "target: on the mark or off it" · "badge: who does it".
- Tickets: `{word} — {meaning}.` (per word, authored). Set end: "The machine knows all your words!"
- Settings labels as §8.
- **Locale traps.** (1) The parts differ per language (§6 table) — the machine shows only that locale's gauges; Finnish has no prefixes beyond *epä-* and builds "without" with the suffix *-ton/-tön* (vowel harmony: voimaton / ystävätön) — the JAR works for suffixes as well as prefixes. (2) Romance re-/ri-: *ri-* in Italian, *re-* fr/es/pt; French *ré-* before a vowel (réécrire) — the machine shows the real spelling. (3) Opposites: fr dé-/dés-/in-/im-, es/pt des-/in-, it dis-/in-, nl on-, sv o-, da/no u-, de un- — the SWITCH covers all; words like de *unheimlich* whose root is not a known word are excluded. (4) Gendered person words follow the picture (de Bäcker but Läuferin/Tänzerin/Lehrerin; pt dançarina; it cassiera) — the word on the window is authored to agree with the person shown; labels from image-vocabulary are NOT used for this (the vocab label for the woman teacher is the masculine form in de/es/pt). (5) Spelling changes at a join (bake → baker, run → runner, fr nuage → nuageux, es miedo → miedoso) are shown by the machine; children are not asked to spell. (6) Only fi refuses a level (Level 2) — the setting hides it rather than showing an empty level; fr and es DO get Level 3 (agent nouns -eur/-euse, -dor/-dora/-ero are productive and taught at this age; the printable refused only for lack of portraits).

## 10. Sound off, access, phones
- Legible with the sound off: the cable, lamp, ghost mark and brass needle say everything; sounds are toy sounds; TTS (optional) reads the word and the ticket.
- Keyboard: Tab through gauges (each with Up/Down or Space), clips (Enter, then Left/Right for the socket), people (arrows + Enter); aria-live bubble.
- Taps: every gauge handle ≥ 44 × 44 (jar lever grip 44 × 56; switch 52; loop bead hit 48; slider knob 44; arrow nock 48); clips 52 tall; people 96.
- Pictures: people 96 px at 704 and 360, 88 at 320.
- Phone: §4.

## 11. Distinct from
- **Row 186 The Root Bulb (L.2.4.c):** the root sinks into a bulb and the rest must be a real part — finding the root. Here the root is given and the job is the MEANING the part adds; nothing is split.
- **Row 180 The Three Doors (L.2.1.d, past tense)**, **Row 178 The Tail Plugs (plural endings)**, **New 279 The Rule Stencil (spelling rules):** endings as spelling/grammar, not meaning.
- **Row 187 The Weld (compounds)**, **Row 189 The Echo Canyon (shades of meaning)**, **New 258 The Unchanging Picture (synonyms)**.
- Batch siblings share nothing: #190 is the only meaning-of-word-parts instrument.

## 12. Build plan
- **Model (core):** `gauges = {jar:'empty'|'half'|'full'|'over', sw:'root'|'not', loop:1|2, time:'before'|'now'|'after', target:'on'|'off', badge:null|personId, door, turn, shelf}`; `REST` constant; round `{word, root, part, drives:{gauge, state}, meaning, clips?, tray?}`; `check(gauges, round) → {ok, wrongGauges:[...], drivenOk}` (ok iff every gauge equals REST except `drives.gauge`, which equals `drives.state`); `pickCheck(clip, side)`; `dealSlots(pass)`.
- **Gate (`verify-knowing-machine-core.js`, own oracle):** an independent table part → (gauge, state) per locale written in the gate (not read from the core); every round's `drives` matches it; untouched machine never passes; "all gauges moved" never passes; Level state balance (no state > 40 %), "same gauge 3 running" never in a dealt order; every live round of the old manifest appears in its locale (ids preserved); *Pick the part*: exactly one clip fits each (root, gauge) using the bank's crossCheck; tray/badge slot balance per pass; badge trays never contain singer + musician or the librarian; every Level-3 word agrees with its picture's gender in gendered locales (author table); the fi Level 2 hidden; fr/es Level 3 present with gender agreeing with each picture; every L2 word appears in the per-word map and no left-out word (de um-, einschlafen, einkaufen, ausschalten; es sobrepasar; nl uitblazen; sv återfå, återvända; da udskifte) is ever dealt; "always clip -er" ≤ 3/9 in L3 Pick the part.
- **Mutations:** accept the gauge left at rest · accept a second moved gauge · map -less to JAR full · map re- to SWITCH · badge accepts any person · clip can snap on the wrong side · right clip always top · the ticket shows before success · miss 1 doesn't reset other moved gauges · fi shows an empty Level 2.
- **Pictures to verify:** occupations/baker, singer, farmer, gardener, athlete, ballerina, photographer, teacher (labels ×11 checked; seen on the occupations sheet). New ruling appended (singer + musician both hold guitars; the teacher is a woman with masculine labels in de/es/pt).
- **Risks:** many gauges at 360 — Level 2 shows at most five; locale-only gauges (DOOR, SHELF) need native sign-off that they show the part's meaning honestly (de *aus-* has two meanings in the bank — each word is mapped individually, never the part blindly); no mole picture exists (Marigold appears in the title and text only — no drawn mole).
- Nothing blocked.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Clicky levers, a jar that clinks, a bead that whirrs round a loop and an arrow you can knock off its target — the machine is a toy, and the brass needle answering is a satisfying "the machine agrees with me".
2. **Would a teacher put it on the board?** Yes: each gauge IS the meaning (full vs empty on one jar, again as a second lap, before as left of now), the classic confusions are physical opposites on one gauge, the live tells are gone, and every locale uses its own word parts.
3. **Would a parent trust it?** Real words from a native-signed bank, calm design, no score, nothing to buy.
4. **The invention in one sentence:** every word part drives its own gauge, so you show what *fearless* means by emptying the jar of fear — and the machine checks by moving the same gauge itself.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 3→5 · distinctness 5→5 · reality 4→5
What changed:
- Level 3 had a one-answer shortcut: in *Pick the part* every round's answer was -er (constant bot 8/8), and in *Show it* the badge was the answer 8 of 12. Rebalanced: Pick the part = 3 person (-er) + 3 jar-full (-ful) + 3 jar-empty (-less) → constant bot 3/9; Show it = 6 person + 6 review words, one per other gauge; the person's tray place is now dealt 2/2/2, not fixed.
- Checked every Level-2 bank word against its native gloss (`word-parts.<loc>.json prefixKey`) and wrote a per-word gauge map: the designer's "de um- = TURN" was false (umziehen/umbauen = change) — de Level 2 now uses ein-/aus- (DOOR) + vor- (TIMELINE: vorheizen…) + wieder- (LOOP); fr sur- and es sobre- split into SHELF-above (survoler, surélever, sobrevolar) and JAR-overflowing (surcharger, sobrecargar); words with no honest gauge are named and excluded (einschlafen, einkaufen, ausschalten, sobrepasar, uitblazen, återfå, återvända, udskifte). TURN gauge dropped; DOOR gains the nl "together" state.
- "fr has no productive agent suffix" was linguistically false: the printable refused only because its portrait list is empty. fr (-eur/-euse, -ier) and es (-dor/-dora, -ero/-era, -ante) now get Level 3 with gender agreeing with the picture (coureuse, danseuse, enseignante, corredora, cajera). Only fi hides a level (Level 2).
- Looked at the occupations contact sheet: athlete is a woman sprinting (runner/Läuferin ✓), ballerina a dancer, singer a man with guitar + mic (never beside musician), teacher a woman (labels masculine in de/es/pt — words authored, not labels).
- Layout check (2026-10-17): switched to stacked — split stage column is ~370 px at 704.
