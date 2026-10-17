# Row 51 — The Syllable-Family Lock / O Cadeado das Famílias (RF.K.2.B, pt-BR)

## 0. Identity
- id `syllable-builder.forme-as-silabas.rf-k-2-b` (KEPT) · grade K (educação infantil / 1º ano entry) · Common Core RF.K.2.B; the page names BNCC (§20.10: framework NAME only) · strand Reading: Foundational Skills · page title (frozen, pt) "Forme as sílabas — Fonética no pré-escola", intro (frozen, pt) "Olhe a imagem e forme a palavra colocando as sílabas em ordem…".
- own files `mini tools/family-lock-core.js`, `family-lock-activity.js`, `family-lock-activity.html`; the manifest row stays in `syllable-builder-activities.json` (id, slug `forme-as-silabas`, title, intro frozen) with `tool` repointed. `word-builder-core.js` and `syllable-builder-activity.js` are not touched (they still serve the other syllable rows until each is rebuilt).
- **Locale scope (deliberate, §20.2):** this row is the Brazilian-Portuguese member of the E8 syllable family; es/it/fr/fi have their own rows (50, 49, 52, 53) and de/nl/sv/da/no/en theirs (44–48). It ships **pt only** — the invention is built on the Brazilian *família silábica*, which no other locale teaches this way. No sv/da/no/fi metadata is created for this id.
- worksheets it covers: none mapped.
- what the old activity did: a picture, a row of empty slots, the word's syllable tiles shuffled below; tap tiles into order, TTS per tile, the blend on success; 28 words. **Kept:** all 28 words and their gated splits (every split re-read from `approved-words-pt.json`, never re-typed), "put the syllables in order" as Level 3, the picture as the prompt. **Fixed:** `sapo` pointed at a picture that does not exist (`forest creatures/toad` — the library has no toad) → replaced by `pato` (animals/duck). **`pêssego` is retired, not kept:** both library peaches (`fruits/peach`, `at-the-supermarket/peach`) are drawn as red apples (PICTURE-RULINGS; seen on the contact sheets 2026-10-17), so a child would read *maçã* and be marked wrong — its Level 3 slot goes to `jacaré` (reptiles-and-amphibians/alligator, `ja-ca-ré`, TeX+rule+vocab agreed). 27 of the 28 legacy words stay; the 28th cannot honestly be pictured.

## 1. The pitch
"The word is a combination lock: every wheel is one syllable family — ga, ge, gi, go, gu — and the lock only opens when each wheel shows the syllable the picture's name needs."

## 2. Why a child will want it again (the fun)
- **A real lock in the hand.** Each wheel is a fat brass drum the child flicks up or down; it clicks one syllable at a time (a crisp ratchet tick, 40 ms), the neighbours peeking above and below like a real cylinder. A hard flick spins it three or four steps and it coasts to a stop on a syllable.
- **The lock talks back.** Under the wheels a brass plate always reads what the wheels say *right now* — "gi·to", "gu·to", "ga·to" — so every flick makes a new, often silly word. Children spin for the joy of "bu·la, be·la, bo·la!".
- **The case opens.** The picture sits behind glass in a little display case. When the code is right and the child presses Check, the shackle pops up with a *clack*, the glass slides away, the picture rises and turns once, and the wheels light gold one by one while the plate spells "ga · to → gato".
- **The family fan.** Tap the small family tag on a wheel and the whole *família silábica* fans out like a hand of cards — ba be bi bo bu — the chart every Brazilian classroom has on its wall, now in the child's fingers.
- **A keyring for the pass.** Each opened lock drops a drawn brass key onto a keyring along the top, the word engraved on its bow (content letters, never a shrunken picture — the 64/96 px floor); tap a key and the plate reads its word again; a full keyring jingles when tapped. No score, no timer, no streak, no lives.

## 3. The skill and the misconception
- **Skill (RF.K.2.B; the BNCC EI/1º ano syllable work):** blend syllables into a spoken word and segment the word into its syllables; in the Brazilian method, read each syllable as consonant + vowel (*família silábica*) and join them in order.
- **Misconception 1 — "the letter is the syllable".** Children see *g* and say "gato" without hearing that *ga* and *gi* are different syllables. On a wheel the consonant never changes — only the vowel does — so the child must attend to the whole syllable. "gi·to" on the plate is visibly (and audibly) not *gato*.
- **Misconception 2 — blending is listing; order is free.** The plate always joins the wheels left to right into one word; in Level 3 the right syllables in the wrong order read "to·ga" and the lock stays shut.
- **Misconception 3 — every word has two parts.** Level 2 locks carry three and four wheels; Level 3 makes the child decide which wheels belong (one decoy from the same family).
- **How the material pushes back:** by the lock. A wrong wheel does not turn red. On Check the right wheels drop their brass pin and go still; the wrong wheel stays loose and wobbles; the case stays shut; the plate keeps showing the word the child really dialled.

## 4. The stage
**Layout: stacked at every width** (layout check 2026-10-17: no `layout:'split'` — its stage column is only ≈ 370 px at 704, too narrow for this apparatus). The stage takes the full card width, ≈ 648 px at 704 (≈ 656 at 1024); whatever §4 places in a left, right, side or bubble column stays side by side inside the stage when the activity draws it, while the shell's bubble, keypad and Check sit under the stage. Sizes written for a wider stage fit the 648 px by closing margins and gaps first; no picture drops below 96 px, no tap below 44, no data mark or grid cell below 40.

**At 704 px (stage 704 × 480):**
- **The keyring** (top band 704 × 44): a thin brass rail; each opened lock hangs a drawn brass key (28 × 40, the word engraved at 12 px) — a record in apparatus geometry, never a shrunken library picture.
- **The display case** (left column, x 24–344, y 52–272): a rounded glass box 300 × 220 (2.5 px ink `#2B3A3A`, glass tint `rgba(180,220,230,.25)`, one diagonal highlight). The **library picture** inside at **176 px** short side.
- **The lock** (x 24–344, y 296–456): a padlock body 300 × 150 (brass `#D9A441`, 3 px ink); the shackle rises into the case's lid hinge. In the body, **N wheels** (N = syllable count). Wheel window **64 × 108 px** for N ≤ 3 (gap 10), **56 × 100** for N = 4. The window shows the current syllable at **36 px** Baloo 2 bold, with the previous/next family member above and below at **20 px**, 45 % opacity, under a drum-curve gradient. Above each wheel a family tag (brass oval 30 × 20) shows the onset letters — "g", "br", "nh" (content letters).
- **Nubs:** a chevron 44 × 28 above and below each wheel (drawn geometry).
- **The plate** (right column x 368–680, y 120–192): engraved brass 312 × 72 reading the current wheels joined with a middle dot, "ga·to", at **32 px**; a 36 px speaker at its end.
- **The bubble** (right column, y 216–330) for hints and the success line.
- **Task line** above the stage (≤ 24 px, ≤ 2 lines). No other words on the apparatus.

**At 360 px (stage 360 × 640):** keyring 360 × 32 (keys 20 × 30, wraps after 12); case 300 × 180, picture **128 px**; lock 320 × 140; wheel windows **60 × 96** (N ≤ 3), **52 × 90** with 28 px syllables (N = 4); plate 320 × 56 (26 px) under the lock; bubble; Check. Check bottom ≤ 700 at 360 × 740 and ≤ 620 at 320 × 640 (320: case 260 × 150, picture 112 px, wheels 54 × 88 / 46 × 84). Level 3 (loose wheels, up to 5 for `helicóptero`): sockets 52 × 80 at 360, 46 × 76 at 320 with 22 px syllables; wheels do not roll in Level 3, so no nubs are needed there.

## 5. The hand
- **Roll a wheel:** vertical drag follows the finger 1:1, snaps to the nearest syllable on release (ease-out 140 ms, one tick per syllable passed); a fling coasts (velocity × 0.9 per frame) and stops on a syllable. A nub tap = one step (120 ms). The plate updates within 16 ms of every settled step. The reel order is always the family order **a e i o u** (the *ç* family **a o u**, a three-face wheel — §9) and wraps around.
- **Hear it:** the plate speaker reads the current reading (TTS pt-BR where the browser has it; otherwise nothing is lost — the letters carry the task).
- **Family fan:** tap the family tag → its syllables fan out above the wheel (220 ms); tap one to jump there; tap outside to fold.
- **Level 3 (loose wheels):** wheels lie in a tray under the lock, each already set to its syllable. Drag one into an empty socket (snap 120 ms, *clunk*); drag a seated wheel to the tray or onto another socket to swap. The plate reads sockets left to right, an empty socket shown as a gap "ga·_".
- **Undo:** every action reverses with the same gesture.
- **Free play:** after a lock opens, all wheels spin freely for 6 s and the plate keeps reading; keyring keys can be tapped to see (and hear) their word on the plate.

## 6. The rounds
One round = one picture + one lock. A pass = a level's table, order-only reshuffled per pass (pass 1 shuffled too; never the same order twice).

**Level 1 — Duas sílabas (two rolling wheels, consonant + one vowel).**

| # | word | split | picture (themeDir/noun) | pass-1 start faces |
|---|---|---|---|---|
| 1 | gato | ga-to | animals/cat | gu · ti |
| 2 | bola | bo-la | toys/ball | ba · lu |
| 3 | casa | ca-sa | miscellaneous/house | co · si |
| 4 | pato | pa-to | animals/duck | pi · te |
| 5 | mesa | me-sa | around the house/table | mo · so |
| 6 | luva | lu-va | accessories/glove | li · ve |
| 7 | pipa | pi-pa | beach/kite | pe · po |
| 8 | vela | ve-la | christmas/candle | vu · le |
| 9 | cama | ca-ma | around the house/bed | ci · mo |
| 10 | vaca | va-ca | farm animals/cow | vo · cu |

**Level 2 — Palavras maiores (three to four rolling wheels; a coda stays fixed on its wheel: *bar ber bir bor bur*).**

| # | word | split | picture | pass-1 start faces |
|---|---|---|---|---|
| 1 | girafa | gi-ra-fa | animals/giraffe | ge · ru · fo |
| 2 | borboleta | bor-bo-le-ta | insects and bugs/butterfly | bur · ba · li · te |
| 3 | girassol | gi-ras-sol | flowers/sunflower | gu · ris · sal |
| 4 | morango | mo-ran-go | fruits/strawberry | mi · ron · gu |
| 5 | bicicleta | bi-ci-cle-ta | vehicles/bicycle | be · co · cla · tu |
| 6 | elefante | e-le-fan-te | animals/elephant | a · lo · fen · ti |
| 7 | tartaruga | tar-ta-ru-ga | animals/turtle | tor · te · ra · go |
| 8 | sapato | sa-pa-to | clothing/shoe | se · po · ta |
| 9 | macaco | ma-ca-co | zoo animals/monkey | mi · ce · cu |
| 10 | janela | ja-ne-la | around the house/window | jo · ni · lu |
| 11 | farol | fa-rol | beach/lighthouse | fu · ral |
| 12 | panela | pa-ne-la | around the house/pot | po · nu · li |

**Level 3 — Monte o cadeado (loose wheels in order, plus one decoy wheel).** Words whose syllables cannot roll through a plain five-vowel family (accents, tildes, *nh*, *gu*, diphthongs) live here, so none of the 28 is lost. The decoy is a sibling from the family of one of the word's own syllables, so the child must read, not just count.

| # | word | split | picture | decoy wheel |
|---|---|---|---|---|
| 1 | maçã | ma-çã | fruits/apple | mo |
| 2 | cenoura | ce-nou-ra | vegetables/carrot | ri |
| 3 | abóbora | a-bó-bo-ra | vegetables/pumpkin | ba |
| 4 | jacaré | ja-ca-ré | reptiles-and-amphibians/alligator | co |
| 5 | helicóptero | he-li-cóp-te-ro | vehicles/helicopter | la |
| 6 | pinguim | pin-guim | animals/penguin | pan |
| 7 | balão | ba-lão | toys/balloon | bo |
| 8 | golfinho | gol-fi-nho | animals/dolphin | nha |
| 9 | trator | tra-tor | vehicles/tractor | tro |
| 10 | tigre | ti-gre | animals/tiger | gri |
| 11 | zebra | ze-bra | animals/zebra | bri |
| 12 | panda | pan-da | animals/panda | do |

27 of the 28 legacy words are present (L1: gato, bola, casa, mesa, luva, pipa, vela; L2: girafa, borboleta, girassol, farol, morango, bicicleta, elefante, tartaruga; L3: maçã, cenoura, abóbora, helicóptero, pinguim, balão, golfinho, trator, tigre, zebra, panda); `pato` replaces the broken `sapo`, `jacaré` replaces `pêssego` (no peach picture reads as a peach), and the new family words (cama, vaca, sapato, macaco, janela, panela) take their splits from `approved-words-pt.json`.

**Answer position (measured):**
- L1/L2: the answer is a reel face. A wheel never starts on its answer. Over a pass, each wheel's start offset from its answer is drawn so that **+1, +2, −1, −2** (wrap-aware; ±1 only on a three-face wheel) occur equally (± 1 per pass). The table's start faces are pass-1 values that satisfy this. The gate fails if any offset class exceeds 35 % of a level's wheels or any wheel starts on its answer — so "always spin down" and "leave it" both fail.
- L3: the tray order is a derangement of the correct order with the decoy at a uniformly drawn tray position; across a pass the first socket's wheel sits in every tray position at least once and in tray slot 1 at most 30 %.

## 7. Check, the misses, the success
- **Check with nothing moved** (L1/L2 every wheel on its start face) → hint, no miss: "Roll the wheels until the plate says the picture's name." L3 with an empty socket → "A syllable is still missing."
- **Miss 1 — the pins:** every wheel showing its right syllable drops a brass pin into its top (*tk*) and goes still; each wrong wheel wobbles twice (±6°, 300 ms). The shackle lifts 4 px and falls back (the lock tried). The plate stays as dialled. Hint: "The wheels with a pin are right. Roll the wheel that wobbles." L3: right-socketed wheels pin; a wheel in the wrong socket wobbles; a seated decoy wobbles and its family tag dims.
- **Miss 2 — the notch:** on each still-wrong wheel a small gold notch appears on the drum edge beside its right face, so the child rolls until the notch is in the window; the plate shows the picture's word as a faint engraved ghost under the current reading, split into its syllables. Hint: "Roll until the little gold mark is in the window." L3: the ghost on the plate shows the syllables in order.
- **A new move takes the help away:** touching a pinned wheel lifts its pin; any roll hides the notch and the ghost until the next Check.
- **Success:** the pins drop in a left-to-right ripple (80 ms apart), the shackle pops (*clack*), the glass slides up, the picture rises 12 px and turns once (600 ms), the wheels light gold one by one while the plate shows "ga · to" and closes up into "gato" (TTS reads the syllables, then the word). Bubble: "{syllables}: {word}! You built the word." → "ga-to: gato! Você formou a palavra." The picture then flies onto the keyring.

## 8. Settings
1. **Level:** Two syllables · Longer words · Build the lock — the lock shows 2 rolling wheels / 3–4 rolling wheels / empty sockets with a wheel tray, at rest.
2. **Gold mark help:** after two tries (default) · always — with "always" the notches are on the drums at rest.

## 9. Words (EN source; the build authors pt by hand, then one native pt-BR + pedagogy reviewer)
- title (shell, frozen): "Forme as sílabas" · instruction: "Roll each wheel to the right syllable. When the plate says the picture's name, press Check."
- task lines: L1/L2 "Roll the wheels to make the picture's name." · L3 "Put the wheels in the lock in the right order. One wheel is extra."
- hints / celebration: §7. Settings: "Level", "Two syllables", "Longer words", "Build the lock", "Gold mark help", "After two tries", "Always".
- aria: "Wheel {n} of {total}, family {onset}, showing {syllable}." · "The plate reads {reading}." · "Lock open. The word is {word}." · "Keyring: {count} pictures."

**Locale traps (the activity is pt-BR only):**
- **Orthographic families.** *ga ge gi go gu* and *ca ce ci co cu* are spelling families — the consonant sound changes before e/i, and that is exactly how Brazilian classrooms teach them. The plate reads what is spelled. The gate dumps every reachable reading of every L1/L2 lock for the native reviewer, who strikes any combination that is a rude or upsetting word (that face is then skipped on that wheel).
- **The *ç* family has three members** (ça, ço, çu); *ce/ci* never take a cedilla. The core supports a three-face wheel.
- **Digraph onsets** (*ch, lh, nh*) make real five-member families (*nha nhe nhi nho nhu*) and the core supports them; *gue/gui* and *que/qui* do not, so those words stay in Level 3.
- **Accents and tildes** (*bó, cóp, ês, ã, ão*) cannot roll through a plain reel → Level 3 only. Never strip an accent to make a word fit.
- **Diphthongs and hiatus** follow the gate's split (`ce-nou-ra`, `lu-a`); a diphthong syllable never goes on a rolling wheel.
- **Register:** Brazilian (*figura*, *aperte*, *rodinha*); reuse the shell's pt "Verificar".
- **Sound off:** the plate's letters carry everything; TTS is a bonus.

## 10. Sound off, access, phones
- Silent legibility: the plate always shows the reading; pins, wobble, notch and ghost are visual.
- Keyboard: Tab moves between wheels; ↑/↓ roll one step; Enter opens the family fan, ←/→ choose; in L3 Space picks up a tray wheel, ←/→ choose a socket, Space drops; Enter = Check.
- aria-live announces the plate after each settled step (debounced 400 ms).
- Taps: nub hit area 44 × 44; wheels ≥ 46 px wide; family tag hit area 44 × 44.
- Pictures 176 px at 704, 128 px at 360, 112 px at 320.
- Phone: column stack case → lock → plate → bubble → Check; keyring keys 20 × 30 (drawn).

## 11. Distinct from
- **Rows 44–50, 52, 53** (the other syllable rows) — each is its own language's instrument; this is the only *família silábica* lock. Row 52 (fr) develops a photograph from syllable tiles; row 53 (fi) rolls a marble over syllable track pieces.
- **New 215 Bead Rail** — beats syllables to drop beads (counting), no wheels.
- **Premium `syllable-splitter`** (drum, arcs, rebuild) and **`blending-board`** (letter cards, sweep) — whole-syllable wheels are neither.
- **Built / designed registries:** no lock, wheel or reel among #1–#22 or the designed list.

## 12. Build plan
- **Core state:** `{level, round:{word, split[], picture, wheels:[{onset, coda, faces[], answerIdx, idx, pinned}] | sockets[], tray[], decoy}, misses, help:{notch, ghost}}`. Functions: `familyFaces(syllable)` → `{onset, vowel, coda, faces}` or `null`; `roll(w, ±1)`, `setFace(w, i)`, `reading()`; `seat(wheelId, socket)`, `unseat(socket)`; `check()` → `{ok, pinned[], wobble[]}`; `startOffsets(level, pass)`.
- **Gate's own ground truth (`verify-family-lock-core.js`):** every split equals `approved-words-pt.json` for that key (read the file); every L1/L2 syllable has exactly one plain vowel letter, an onset not ending in *u*, no accent — and its faces are rebuilt from a vowel list written in the gate; the answer face is in the reel; the answer reading equals the word; no wheel starts on its answer; the offset distribution per level ≤ 35 % per class; the L3 decoy differs from every syllable of its word and belongs to the family of one of them; the L3 tray order is a derangement; every picture exists in `mini tools/pictures/<theme>.json` and is a colour theme; each of the 27 kept legacy words appears in exactly one level and `pêssego` appears nowhere; 8 hand-picked wrong readings return `ok:false`.
- **Mutations:** start a wheel on its answer · reel order not a-e-i-o-u · open with one wrong wheel · pin a wrong wheel at miss 1 · show the notch before miss 2 · keep the notch after a roll · plate reads right to left · accept the decoy in a socket · tray order = correct order · drop a legacy word · a split not from approved-words · pass 2 order = pass 1 · a five-face *ç* wheel.
- **Pictures to verify on a contact sheet:** animals cat, duck, giraffe, elephant, turtle, penguin, dolphin, tiger, zebra, panda; toys ball, balloon; miscellaneous house; around the house table, bed, window, pot; accessories glove; beach kite, lighthouse; christmas candle; farm animals cow; insects and bugs butterfly; flowers sunflower; fruits strawberry, apple; reptiles and amphibians alligator; vehicles bicycle, helicopter, tractor; vegetables carrot, pumpkin; clothing shoe; zoo animals monkey. (Seen 2026-10-17: the animals and around-the-house sheets are clean single objects; the build opens the rest from `scratchpad/des/contact/`.)
- **Risks:** a fling on a phone scrolling the page → `touch-action:none` on the lock body only; nonsense readings that are rude in pt → the reviewer reads the dump.
- **BLOCKED:** nothing (a library toad would let `sapo` return; `pato` replaces it honestly).

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — a clicking lock, a plate that says silly words back, a case that pops open, a keyring to fill.
2. **Would a teacher put it on the board?** Yes — it is the *família silábica* chart made into a machine: change the vowel, see and hear the syllable change, join the syllables in order; the lock refuses anything else.
3. **Would a parent trust it?** Yes — calm, library pictures only, every split from the gated list, no score, works with the sound off.
4. **The invention:** a combination lock whose wheels are syllable families — it opens only when every wheel shows the syllable the picture's name needs.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 5→5 · correctness 4→5 · distinctness 5→5 · reality 3→5
What changed:
- Every one of the 34 splits re-checked against `approved-words-pt.json` (all equal) and every picture label against `mini tools/pictures/*.json` (pt label = target word in all 34).
- `pêssego` retired: both library peaches are drawn as red apples (contact sheets) — Level 3 slot given to `jacaré` (alligator, TeX-agreed `ja-ca-ré`, decoy *co*). 27 of 28 legacy words kept; the loss is stated, not hidden.
- The keyring of 36/24 px pictures broke the 96/64 px floor → drawn brass keys with the word engraved; tapping a key re-reads it on the plate.
- Família silábica claims verified: *ga ge gi go gu* / *ca ce ci co cu* are spelling families as Brazilian classrooms teach them, *ça ço çu* is a three-face wheel, coda families (*bar ber bir bor bur*, *fan fen fin fon fun*) and *nha nhe nhi nho nhu* are taught families; accented/tilde/*gu* syllables stay in Level 3 — correct.
- Layout check (2026-10-17): switched to stacked — split stage column is ~370 px at 704.
