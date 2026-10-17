# Row 50 — The Domino Run: La fila de fichas (RF.K.2.B, es)

## 0. Identity
- id `syllable-builder.forma-las-silabas.rf-k-2-b` (KEPT) · grade K (es: preescolar 3.º / Educación Infantil 5 años) · Common Core RF.K.2.B; the page names the official curriculum only (§20.10) · strand Reading: Foundational Skills · **locale-scoped row: ships in es only** (slug `forma-las-silabas`, page title "Forma las sílabas — Fonética en preescolar" and intro frozen).
- own files: `mini tools/domino-run-core.js`, `domino-run-activity.js`, `domino-run-activity.html`; manifest row stays in `syllable-builder-activities.json`, `tool` → `domino-run-activity`, `params` → §6. 0 lines to shared engines or `lcs-shell.*`.
- worksheets it covers: none mapped.
- what the old activity did: tap scrambled syllable tiles into slots, 28 Spanish words. **Kept:** 27 of the 28 words with their gated splits (re-checked 2026-10-17 against `approved-words-es.json`: same splits; every es picture label equals the word), the blend task (Level 2). **Fixed:** `sapo` (toad) pointed at forest creatures/toad, which does not exist (the library has no toad — it was ruled out as a near-double of the frog) → replaced by `rana` (camping/frog, label "rana"). **New:** Level 1 "Completa la palabra" (the missing syllable — the most common Spanish infantil syllable exercise) and Level 3 counting.
- **Gone:** tile tapping as the whole task.

## 1. The pitch
"Stand the syllables up as dominoes and push the first one — they topple faster and faster, and every fallen domino lands face-up a little closer to the one before, until the fallen syllables close up into the word; a gap or a wrong syllable stops the run."

## 2. Why a child will want it again (the fun)
- **Dominoes are made to be knocked over.** Ivory tiles with fat syllables stand on a wooden table; one push and they clack-clack-clack down the line with a rising rhythm. Children reset and topple again just for the sound.
- **The word assembles on the table.** There is no separate answer strip: the dominoes ARE the word. Each falling domino lands face-up on the one before it like a roof tile, its syllable still showing — slow at first and wide apart (*ma … ri …*), then quicker and closer (*po-sa*), because the cascade speeds up and each tile falls a little shorter; when the last one lands the whole fallen row slides together and the syllables touch: *mariposa*. Blending is something the child watches the dominoes themselves do.
- **A gap stops everything.** Leave a mark empty and the run halts: the domino before the gap falls flat into the hole, and everything after it stays standing. The run physically needs every syllable.
- **The earned show:** the last domino taps a little brass bell, the picture on its easel at the end of the table bounces, and the closed-up fallen row lifts as one long tile with the word on it and slides into the **domino box** in the right column, where every word of the pass stacks up as a drawn tile with its word written on it (words, never a shrunken picture).
- **Free play:** between rounds a swipe along the fallen run stands the dominoes back up (a reverse cascade, *clic-clic-clic*), and a tap knocks them down again; the word replays.
- No timer, score, streak or lives.

## 3. The skill and the misconception
- **Skill (RF.K.2.B):** find the missing syllable of a word (Level 1); blend syllables in order into a word (Level 2); count the syllables of a spoken word (Level 3). Spanish infantil reads open CV syllables early (*ma, pa, lo*), so building and completing words from written syllables is the native K practice; counting stays oral.
- **Misconception 1 — "a word without one piece is still the word"** (skipping the middle syllable: *ma·po·sa*). Pushback: the run stops at the empty mark; nothing after it falls.
- **Misconception 2 — "the missing piece is always the last one."** Pushback: the gap sits first, middle or last.
- **Misconception 3 — "any syllable of the word fits the gap"** (putting *pa* in *pa-ra-guas*'s middle gap). Pushback: the candidate set always includes another syllable OF THE SAME WORD; it falls face-up into the row, the fallen row reads a non-word, and the domino bounces back out.
- **Misconception 4 — order does not matter** (Level 2). Pushback: the fallen row reads in falling order; a wrong order lies there as a non-word and the out-of-place dominoes spring back up and hop to the box.
- **Misconception 5 — counting letters** (Level 3: *pez* is short but so is *sol*; *hipopótamo* is long). Pushback: too few dominoes → the last one throws two syllables up stuck together; too many → a blank domino falls and throws nothing.

## 4. The stage
`layout:'split'` at ≥ 700 px: the table stage left (480), bubble column right (200).

**At 704 px:**
- **The fallen row** — the table is seen from a little above (3/4 view), so a fallen domino lies face-up and its syllable stays readable (ExtraBold 30 px on the fallen face). Fallen tiles overlap by a shrinking amount along the run (20 px → 4 px); on success the row slides together edge to edge in 300 ms. No separate strip exists anywhere on the stage.
- **The table** — a wooden tabletop seen from the front, 470 × 230 px, `#E3C08F`→`#CFA56C`, front edge 18 px darker.
- **Marks** — faint rectangles on the table where dominoes stand, evenly spaced across a run length of 360 px (spacing = 360 / (n + 1)), so the run's length never depends on the word.
- **Dominoes** — standing tiles **56 × 104 px**, ivory `#FFFDF6`, 3 px ink outline, radius 8, a thin centre line; the syllable on the upper half in ExtraBold 26 px (ink), a single decorative pip on the lower half. Blank dominoes (Level 3) carry only the pip.
- **The easel** — at the run's right end: a small wooden easel holding the **library picture 120 px**; a brass **bell** (geometry, 30 px) hangs beside it. Tap the picture → the word (TTS bonus).
- **The box** — under the table, an open domino box 470 × 110 where loose dominoes lie (candidates in L1, the shuffled set in L2, a stack of blanks in L3).
- **The domino box** (right column, top): drawn tiles 64 × 28 with the finished word written on each (Nunito Bold 14 px) stack here across the pass.
- **Right column** — bubble, Check. (Check's hint text calls the act "¡Empuja!".)
- **Task line** above the stage.

**At 360 px** (stacked): table 336 × 190 with dominoes **44 × 82** (syllable 21 px), run length 250 px, easel picture **88 px** at the right end (the run and easel fit side by side: 250 + 86) — and the round picture repeated at **96 px** above the table so the picture floor holds · box 336 × 92 · bubble · Check. Check bottom ≤ 690 at 360 × 740. At 320 × 640: the upper 96 px picture shrinks to 80, dominoes 40 × 76 → Check ≤ 612. Five dominoes at 320: the run is 250 px wide, spacing 41.7 px for 40 px dominoes — they stand without touching (verified in the local test).

**Library pictures** (each checked in the theme JSON with the es label equal to the word): furniture/table, space/moon, toys/ball, animals/giraffe, insects and bugs/butterfly, flowers/sunflower, vehicles/bicycle, animals/elephant, vehicles/helicopter, animals/rabbit · animals/cat, miscellaneous/house, beach/lighthouse, vehicles/airplane, accessories/glove, animals/turtle, weather/umbrella, fruits/apple, vegetables/pumpkin, vegetables/carrot · beach/sun, animals/fish, animals/tiger, animals/dolphin, vehicles/tractor, forest creatures/snail, animals/horse, animals/penguin, animals/bat, animals/hippopotamus · spares: animals/panda, animals/zebra, fruits/strawberry, camping/frog. Contact sheets seen: animals, farm animals, beach, weather, toys, easter, christmas.

## 5. The hand
- **Stand a domino on a mark (L1, L2):** drag it from the box onto the table; it snaps to the nearest empty mark (140 ms, *toc* — a short wooden tick). Drag a standing domino back to the box, or onto another mark (they swap). Keyboard: Tab through box dominoes, Enter stands it on the first empty mark (L2) / the gap (L1), Backspace returns the last stood.
- **Stand blanks (L3):** tap the table (or the blank stack) → a blank domino stands up; all standing blanks re-space evenly along the run (160 ms). Tap a standing blank → it lies back in the box. 1–6. Keyboard + / −.
- **Push = Check.** The first domino tips; each falls onto the next (fall 160 ms; the interval shrinks from 260 ms to 120 ms along the run, so the rhythm speeds up) and lands face-up overlapping the one before, each a little closer. TTS says each syllable as its domino lands if available, then the whole word. Sound: a crisp *clac* per domino, pitch rising slightly along the run.
- **Reset:** after a run, the fallen dominoes stand back up automatically (reverse ripple, 600 ms) unless the round is solved.
- **Tap a standing domino** → it wobbles and (TTS) says its syllable.

## 6. The rounds
Order-only reshuffle per pass; never the same order twice in a row. Box order is a fresh shuffle per render.

**Level 1 — Completa la palabra (one domino missing; 3 candidates), 10 rounds.** Candidates = the answer · another syllable of the same word · a foreign syllable.

| # | picture | run (gap = _) | candidates |
|---|---|---|---|
| 1 | furniture/table | me · _ | sa · me · lo |
| 2 | space/moon | _ · na | lu · na · fa |
| 3 | toys/ball | pe · _ · ta | lo · ta · ri |
| 4 | animals/giraffe | ji · _ · fa | ra · fa · ne |
| 5 | insects and bugs/butterfly | ma · ri · _ · sa | po · ma · cle |
| 6 | flowers/sunflower | gi · ra · _ | sol · gi · ta |
| 7 | vehicles/bicycle | _ · ci · cle · ta | bi · ta · jo |
| 8 | animals/elephant | e · le · _ · te | fan · le · po |
| 9 | vehicles/helicopter | he · li · _ · te · ro | cóp · ro · na |
| 10 | animals/rabbit | co · _ · jo | ne · co · fan |

Gap position: last ×2 (1, 6), first ×2 (2, 7), middle ×6 (3, 4, 5, 8, 9, 10) — middle syllables are the classic omission, so they are the majority; "always fill the last" fails 8/10.

**Level 2 — Ordena las fichas (build the word), 10 rounds.** As many marks as syllables; the box holds the word's dominoes shuffled (never in word order); setting *Ficha trampa* adds one decoy.

| # | picture | word | dominoes | decoy |
|---|---|---|---|---|
| 1 | animals/cat | gato | ga · to | sa |
| 2 | miscellaneous/house | casa | ca · sa | to |
| 3 | beach/lighthouse | faro | fa · ro | vión |
| 4 | vehicles/airplane | avión | a · vión | ro |
| 5 | accessories/glove | guante | guan · te | tu |
| 6 | animals/turtle | tortuga | tor · tu · ga | ra |
| 7 | weather/umbrella | paraguas | pa · ra · guas | za |
| 8 | fruits/apple | manzana | man · za · na | ba |
| 9 | vegetables/pumpkin | calabaza | ca · la · ba · za | ho |
| 10 | vegetables/carrot | zanahoria | za · na · ho · ria | man |

Decoys are syllables of other pool words. The gate checks, for every mark a decoy could stand on, that it never spells the round's picture word or any other pool word that has a picture (*gasa* or *cato* may be words of the language, but no picture asks for them, so they can never be the answer).

**Level 3 — ¿Cuántas fichas? (count), 10 rounds.** Blank dominoes; one per syllable heard.

| # | picture | word | syllables | count |
|---|---|---|---|---|
| 1 | beach/sun | sol | sol | 1 |
| 2 | animals/tiger | tigre | ti · gre | 2 |
| 3 | forest creatures/snail | caracol | ca · ra · col | 3 |
| 4 | animals/fish | pez | pez | 1 |
| 5 | animals/dolphin | delfín | del · fín | 2 |
| 6 | animals/horse | caballo | ca · ba · llo | 3 |
| 7 | animals/bat | murciélago | mur · cié · la · go | 4 |
| 8 | vehicles/tractor | tractor | trac · tor | 2 |
| 9 | animals/penguin | pingüino | pin · güi · no | 3 |
| 10 | animals/hippopotamus | hipopótamo | hi · po · pó · ta · mo | 5 |

Counts: 1 ×2, 2 ×3, 3 ×3, 4 ×1, 5 ×1. Length lures: *tractor* (7 letters, 2), *pez* (3 letters, 1) vs *sol*; "always 2" solves 3/10, "always 3" 3/10.

Spares (old pool words not in the tables, used when the reviewer drops a word): panda, cebra, fresa, rana.

**Answer position.** L1: the answer's slot in the box is balanced across the level (3/3/4) and re-shuffled per render; gate: "always the left candidate" ≤ 0.4; "always the candidate that is a syllable of the word" fails by design (two candidates are). L2: "stand box dominoes in box order" ≤ 0.25; first box domino = first syllable ≤ 0.35. L3: none (blank dominoes; even spacing).

## 7. Check, the misses, the success
- **Check with nothing done:** L1 "Falta una ficha. ¿Cuál es?" ("One domino is missing. Which one?") · L2 "Pon las fichas en orden y empuja la primera." ("Put the dominoes in order and push the first.") · L3 "Pon una ficha por cada sílaba que oyes." ("Stand one domino for each syllable you hear.") — no miss.
- **L1 pushed with the gap still empty** (not a miss): the run falls up to the gap; the domino before the gap falls flat into the hole; everything after the gap stays standing. "¡La fila se para! Falta una ficha." ("The run stops! A domino is missing.")
- **L1 miss 1** — the run goes through; the wrong domino lands face-up in the fallen row, which now reads a non-word with that tile wobbling; then the wrong domino bounces back to the box (220 ms). Same-word syllable: "*{syl}* está en *{word}*, pero no aquí." ("*{syl}* is in *{word}*, but not here.") · foreign: "*{syl}* no está en *{word}*." ("*{syl}* is not in *{word}*.")
- **L1 miss 2** — the run replays slowly with TTS, pausing at the gap; the gap's mark glows and a dashed empty tile pulses in the fallen row where the missing syllable belongs. "Escucha: *{s1} … ¿? … {sn}*." ("Listen: …")
- **L2 miss 1** — the run falls; the fallen row reads the child's order; dominoes in their right place stay down; out-of-place dominoes bounce back to the box and spring back up into the box. A decoy always bounces. "Las fichas que se quedan están bien." ("The dominoes that stay are right.") · decoy: "Esa ficha no es de esta palabra." ("That domino is not from this word.")
- **L2 miss 2** — the first syllable's domino stands itself on the first mark and locks (a small brass pin appears at its foot). "La palabra empieza por *{first}*." ("The word starts with *{first}*.")
- **L3 miss 1** — the run falls; syllables fly up in order:
  - too few: the last fallen domino shows two (or more) syllables crammed on its one face with a crack line, and it wobbles; a ghost domino appears beside the run. "¡Esa ficha llevaba dos sílabas! Pon otra." ("That domino carried two syllables! Add another.")
  - too many: the extra blank dominoes fall face-up showing nothing (a puff of dust); they stay glowing. "Esa ficha no tenía sílaba." ("That domino had no syllable.")
  - then the run stands back up with the child's count.
- **L3 miss 2** — TTS claps the word while ghost dominoes appear one per syllable. "Da palmadas: una ficha por palmada." ("Clap: one domino per clap.")
- **A new move takes the help away** until the next Check.
- **Success:** the run falls in its rising rhythm, the fallen row slides together and its syllables touch into the word, the bell rings, the picture bounces, the word slides into the domino box. Bubble: L1 "¡*{word}*! Faltaba *{syl}*." ("…*{syl}* was missing.") · L2 "*{s1} + {s2} + …* = *{word}*" · L3 "*{word}*: {n} sílabas — *{s1} · {s2} …*" (n = 1: "*{word}*: una sílaba"). End of pass: every tile in the box gives a tiny hop.

## 8. Settings
1. **Ficha trampa** (Level 2): No / Sí — one decoy domino in the box. Visible at rest.
2. **Letras** (all levels): minúsculas (default) / MAYÚSCULAS — many Spanish infantil classes start with *letra de imprenta mayúscula*; every syllable is data in lowercase, uppercase is a CSS transform (accents survive: AVIÓN, HELICÓPTERO, PINGÜINO). Visible at rest.

## 9. Words (EN source; build authors es; one native es + pedagogy reviewer, who checks each word for Mexico AND Spain)
- Title frozen. Instrument name in aria: "La fila de fichas".
- Instruction: EN "Stand the syllables up as dominoes and push the first one: the dominoes fall and their syllables close up into the word." → es draft "Pon las sílabas de pie como fichas de dominó y empuja la primera: las fichas caen y sus sílabas se juntan en la palabra."
- Task lines: L1 "¿Qué sílaba falta?" ("Which syllable is missing?") · L2 "Ordena las fichas para formar la palabra." ("Order the dominoes to build the word.") · L3 "¿Cuántas sílabas tiene?" ("How many syllables does it have?")
- Hints and celebrations: §7. Settings: "Ficha trampa" / "No" / "Sí" · "Letras" / "minúsculas" / "MAYÚSCULAS". Levels: "Completa la palabra" / "Ordena las fichas" / "¿Cuántas fichas?".
- aria: "Fila de {n} fichas" · "Ficha {i}: {sílaba|en blanco|hueco}" · "Tira de la palabra: {texto}" · "Caja con {n} fichas".

**Locale traps (es):**
- **Pan-Hispanic vocabulary, no regional words.** The site's es register leans Mexico (the frozen title says *preescolar*; the printable batches are es-MX, §27), while the old manifest said `es-ES`; every round word here is the same in both. The library's es labels lean Mexican for some nouns (*durazno*, *papalote*, *catarina*, *hot cake*); none of those is used. Every round word is pan-Hispanic (gato, mesa, luna, pelota, jirafa, mariposa, girasol, bicicleta, tortuga, manzana, calabaza, zanahoria …). The reviewer confirms each for Mexico and Spain (*zanahoria* clapped za-na-ho-ria with the *ia* diphthong kept together, as both SEP and Spanish infantil teach).
- **Accent marks stay on their syllable**: a·*vión*, del·*fín*, he·li·*cóp*·te·ro, mur·*cié*·la·go, hi·po·*pó*·ta·mo; the dieresis in pin·*güi*·no. Tiles carry them; uppercase keeps them.
- **Digraphs never split**: *ll* (ca·ba·llo), *ch*, *rr*, *qu*, *gu* (guan·te, pa·ra·*guas*) — gated.
- **Diphthongs/hiatus** follow the gated split (a·*vión*, za·na·ho·*ria*); the reviewer confirms these are the splits Spanish infantil teaches (the gate's es rule was fixed for the *río* hiatus).
- **No articles** on the apparatus (el/la never appear).
- Spanish word "sílaba" is fine for 5-year-olds; "ficha" = domino tile.

## 10. Sound off, access, phones
- **Sound off:** Level 3 needs no reading; the stuck-together syllables, the dust puff of a blank domino, the stopping run at a gap are visual. TTS (syllable per fall, picture tap) is a bonus.
- **Keyboard:** §5; aria-live "La ficha {i} cayó: {sílaba}", "La fila se paró en el hueco", "Esa ficha llevaba dos sílabas", "La palabra es {word}".
- **Taps:** dominoes 56 × 104 / 44 × 82 / 40 × 76 (≥ 44 hit area by padding at 320); the table is the tap target in L3.
- **Pictures:** easel 120 px at 704; at 360 the round picture shows at 96 px above the table (easel 88).
- **Reduced motion:** the cascade becomes a fade per domino (still in order); fallen tiles appear in place without arcs.
- **Phone:** stacked; the domino box hides at 320.

## 11. Distinct from
- **Rows 44–49:** chop, roll, pull, thread, hop, hook — this is the only run that sets itself in motion and makes BLENDING a visible acceleration (slow syllables → one word), and the only one where a gap physically stops the word.
- **Row 46 Level 3 (the telescope's missing ring)** — same skill family, different physics: there a hollow ring, here a gap that halts a moving chain.
- **New #215 The Bead Rail / premium syllable-splitter** — drum and beads; none here.
- **Row 53 The Syllable Marble Run (fi)** — a marble rolls over syllable track and each syllable jumps up into a strip above it; a gap drops the marble. To keep the two apart (critic 2026-10-17) this row has NO strip: the syllables never leave the dominoes, the word is read on the fallen tiles themselves, and the acceleration that closes them up is the blend. The marble's verdict is a cup it reaches; the dominoes' is a row that closes.
- **Registry:** no built or designed activity uses toppling.

## 12. Build plan
- **Data:** `params.levels.{complete:[{noun,themeDir,word,split,gap,candidates}], order:[{…,decoy}], count:[{…}]}`; splits copied from `approved-words-es.json` with an equality assert.
- **Core state** `{level, round, marks:[domino|null], box:[…], blanks:n, misses, fallen}`; functions `stand(id, mark)`, `unstand(mark)`, `standBlank()`, `unstandBlank(i)`, `push()` → `{falls:[{i, syls:[…]|null}], stoppedAt:i|null, row:[…] (the fallen tiles, read in order), verdict, stay:[…], bounced:[…]}`.
- **Gate's own ground truth** (`verify-domino-run-core.js`): typed splits of all 34 words; L1: right iff the gap holds the answer; empty gap stops the run at the gap (never counted as a miss); candidates = answer + a same-word syllable + a foreign one; gap positions as the table; L2: right only in word order; prefix and in-place logic (in-place syllables stay — every in-place domino, not only the prefix, because a domino run reads every tile); decoy always bounces; never starts in order; decoy never equals a missing syllable of the word; L3: right iff blanks = syllables; short = leftovers thrown by the last domino; long = extra blanks throw nothing; spacing depends only on n; fall intervals strictly decrease along the run; bots as §6.
- **Mutations:** a separate word strip rendered (the fallen tiles must carry the syllables) · fallen-tile overlap not shrinking along the run · empty gap does not stop the run · gap counted as a miss · candidates without a same-word syllable · gap always last · L2 accepts any order · decoy stays · box starts in word order · L3 short spreads syllables · L3 long throws syllables from blanks · spacing tied to the word · fall interval constant (no acceleration) · `sapo` back on forest creatures/toad · an accent dropped from a tile (`avion`) · reshuffle repeats an order.
- **Pictures to verify on a contact sheet at build:** furniture/table, space/moon, flowers/sunflower, vehicles/bicycle + helicopter + airplane + tractor, accessories/glove, vegetables/pumpkin + carrot, forest creatures/snail, camping/frog, insects and bugs/butterfly.
- **Risks:** five dominoes plus the easel at 320 px (§4) — verified in the local test at 320; the decoy wording in L2's note is a gate rule, not prose for children.
- **Blocked:** none.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — knocking down dominoes is one of childhood's great pleasures, and here every run spells a word.
2. **Would a teacher put it on the board?** Yes — "completa la sílaba que falta" is the Spanish classroom's daily exercise, and the run that stops at the gap, the syllables speeding together into the word, show blending and segmenting better than any explanation.
3. **Would a parent trust it?** Yes — library pictures, pan-Hispanic words with their accents, a broken picture link fixed, no score.
4. **The invention:** syllables as dominoes — push the first and the word assembles itself, faster and faster, and a missing syllable stops the run.

## 14. Critic review (2026-10-17)
Scores before → after: invention 4→5 · fun 5→5 · completeness 5→5 · correctness 5→5 · distinctness 3→5 · reality 4→5
What changed:
- **Separated from row 53 (marble run).** Both had "each syllable jumps up to a word strip" and "a gap stops it". The strip is gone: the fallen dominoes lie face-up, each landing closer than the last as the cascade speeds up, and the row closes into the word on the tiles themselves — a domino-only blend. Mutations enforce no strip and a shrinking overlap.
- **Register fixed.** The design said es-ES; the frozen title says *preescolar* and the site's es register is es-MX. Every word was already pan-Hispanic; the reviewer now checks Mexico AND Spain, and the grade line names both systems.
- Re-verified by script: all 34 words in `approved-words-es.json` with the shown splits (accents and *güi* kept) and equal to their es picture labels; the *sapo* → *rana* fix stands (the library has no toad).
- The domino box stacks drawn tiles with words, not 30-px pictures (record ruling).
- Kept: "completa la sílaba que falta" as Level 1 (the Spanish classroom's daily exercise) with gaps first/middle/last and a same-word distractor in every candidate set; the order and count levels.

