# G2-358 `synonyms` : editor-critic record (2026-09-23)

Inputs: `_work/G2-358-pedagogy.md`, `_work/G2-358-design-A.md` ("Linked Words"), `_work/G2-358-design-B.md` ("Sock Twins"). Output: `../G2-358-synonyms.md`. Rule applied: measured buildability > preference; the brief > both. Editor measurements: `scratchpad/G2-358-crit-measure.js` (puppeteer, shell woff2 from `file://`, Baloo 2 700 + Nunito 800 confirmed `loaded`; includes a mock `.ws-card` built from `page/page.css` with A's band + 2 x 2 tags), `scratchpad/G2-358-crit-pics.png` (16 pictures opened), read-only node over the opposites bank ×11, the live landings ×11, the taxonomy, `strand-names.ts`, `lib/b5-common.js`, `components-b5.js`, `validate-b5-draft.js`, `card-grid.js`, `cloze.js`, `page.css`.

## 1 Contradictions + resolutions

| # | pedagogy said | design said | ruling | why (doctrine) |
|---|---|---|---|---|
| 1 | base d2 = one lane: plate 150 + 4 chips in a row (est. 646 > 639, "engineer measures") | A: 2 x 2 tag square on a card, 4 choices; B: washing line, **3** choices because 4 do not fit one line (measured worst 758 > 643) | **A.** 4 choices kept, fit PROVED: mock card renders 158 x 330.5, tag cell 144.3 / client 140, `ausgezeichnet` (13 glyphs) 117.8 at Baloo 18 → scrollWidth = clientWidth, no clip | measured buildability; the pedagogy's 4-chip difficulty survives without a per-locale font drop; B's reduction to 3 raises the guess rate from 1/4 to 1/3 for a layout reason only |
| 2 | (no visual) | A: calm twin cards; B: 8 ropes x 4 socks + 32 pegs, absolute placement along a quadratic sag, a throw guard that fires on an 11-char target with 11-char answers | **A for the base.** B's charm is kept where it IS the move (F2) | brief: "one calm, generous page"; the base is the bare-head landing, the page most teachers see; B's own §9 names "busy-ness" as the one risk a lint cannot judge |
| 3 | F2 two columns + lines | A: half-ring tags (the ring closes when the line is drawn); B: mirrored sock columns, "pair up the socks" | **B's sock, specified exactly, with a hard render check; A's half-ring as the recorded fallback** | the sock metaphor = the pairing move (a real "synonym socks" classroom routine), the most memorable apparatus for 7-8-year-olds in either file; bounded risk: one face, one primitive variant, and a failed check swaps to A's tag at no row cost |
| 4 | F3 order 1-2-3, 3-step bar icon | A: strength key (3 rising blocks + 1 2 3) + ramp + tags over boxes; B: size key of 3 socks growing in width | **A** | a SIZE key made of socks conflates strength with size words (big / huge / gigantic are themselves F3 scales); blocks are neutral and height carries the order in greyscale |
| 5 | F4 bank 6, lanes 6 x ~96 = 645 est. | A: speech bubble with struck "said", 647 ≤ 677; B: bank as 2 ropes of socks, 684 > 677, **F4 REFUSED in fi at the four-line chrome** | **A. The fi F4 refusal is removed by layout** (647 fits 677 in every locale) | brief: avoid a refusal by layout where honestly possible; a refusal caused by the design, not by the language, is not a refusal the doctrine accepts |
| 6 | F5 lined bins, reuse ruleBins / qwBins | A: two fenced fields with a sign; B: two laundry baskets (`around the house/laundry_basket`, vocabKey null, opened) wrapping `ruleBins` | **A** | the fenced FIELD is the literal picture of "word field" in all 11 languages (Wortfeld, champ, campo, ordfält, sanakenttä); no library picture needed; B's baskets only make sense inside the laundry world the base no longer uses |
| 7 | F1 "fast" = `zoo animals/cheetah` ("standing cub") | A: `vehicles/race_car` ("the cheetah is a sitting-still cub"); B: cheetah "standing cub" | **race_car.** Editor opened both: the cheetah is a STANDING cub (A misdescribed it) but shows no motion; the green open-wheel racer reads as speed and carries no baked text | a concept picture must carry the concept; A's reason was half wrong, its choice right |
| 8 | base floor ≥ 16 groups (8 adj + 6 verb) | A / B silent | **≥ 21 groups (≥ 13 adj + ≥ 8 verb)** + a 20-seed build probe | arithmetic: a d2 page shows 8 cards x 5 words = **40** words; with every word distinct (B's rule, kept) the 5 adj cards need 25 adj words and the 3 verb cards 15 verbs; 16 two-word groups hold 32 words and cannot fill one page |
| 9 | base title de "Wortfeld: Wörter mit gleicher Bedeutung finden" (lock: de head = Wortfeld) | A / B used it | **type name de "Wortfelder und Synonyme"** (the lock's head first); base title "Synonyme: Wörter mit gleicher Bedeutung finden"; F4 owns „Wortfeld sagen“ and F5 „Wortfelder gehen und sehen“ | a Wortfeld is a set of words around ONE concept (sagen), which is F4 / F5's move, not "circle the same word"; the per-verb Wortfeld queries are the WINNABLE de heads (Germanic SEO panel) and three titles opening "Wortfeld" would compete; OPEN item 2 for the de panel |
| 10 | base d3 `write:true` | A: not designed (840 > 722); B: d3 4 answers at ≤ 8 chars | d3 = tier-2 words + one same-domain foil per card, same apparatus, not shipped | a writing line per card costs 160 px (668 + 160 > 677) |
| 11 | (none) | A: rows via `cardGrid` with `minmax(158px, 1fr)` and the CSS gap 14 → 674 | **own `synTwinGrid`, row-gap 12 → 668** | m: `cardGrid` hard-codes `minmax(0,1fr)` and takes no gap; `.ws-card` is `overflow:hidden`; at gap 14 the 677 body leaves 158.75 px rows for 158 px of content, a silent clip 0.75 px away |
| 12 | F3 6 rows x 96 = 576 est. | A: lane 96 → 672 | **lane 94 → 660** (box 40 x 32, lane padding 4 16) | A's lane sum 44 + 6 + 32 + 12 + 2 omits the second border (`.ws-lane` border 2 each side, m): true 98 → **684 > 677** |
| 13 | (none) | A: F5 plot border `#F0E4CB` | creamDeep `#F5E9D2` | off-token; `#F0E4CB` lives in `page.css` only (m); the shared palette lint reads SVG attributes only (`qa/lints.js:92`, m), so the type gate scans inline styles |
| 14 | (none) | A: F4 bubble wraps `wordBank` and re-uses `gapBank`'s two-row guard | banner frame neutralised inline; own guard over the bubble's inner 642 | m: `.ws-scene-banner` draws a coral dashed border (`page.css:274`), a second frame inside the bubble; `gapBank` checks against `BANK_INNER = 651` (`cloze.js:109`), wider than the bubble |
| 15 | (none) | B: sock variants target / answer / key | one variant (white body, creamDeep cuff + toe, grid ribs) | only F2 uses the sock; unused variants are unreviewed art |
| 16 | F1 chips 18, 2 x 2 | A: 19 px, 44 high, 2 x 2; B: pegged photo + 4 socks in a line at 17 px, 696 min (fi needs a shrinking frame) | **A** (666 ≤ 677, fixed geometry) | measured fit without a conditional shrink |
| 17 | F2 d2 6 pairs | A / B 6 pairs | **8 pairs** (528 ≤ 677) | G2 density floor 8-16 items; 6 was under the floor and 8 fits |
| 18 | F4 rows 6 | A / B 6 | **6, recorded as a density deviation** | 8 lanes = 819 > 677; a signable permutation needs a field of 6-7; the honest ceiling is stated, not hidden |
| 19 | G1-337 treats hot ~ warm as "the same"; F3 teaches they differ | A / B silent | no F3 title / instruction says "same" (validator rule 12); no page contradicts; re-signing the opposites `syn.a` shades is OPEN item 4 | m: the opposites bank carries a near-synonym per pair (en 12 · de 10 · es 12 · pt 12 · fr 14 · it 16 · nl 10 · sv 10 · da 10 · no 10 · fi 14), several of them shades |
| 20 | component names unspecified | A: `sameLink`, `twinCard`, …; B: `sockChip`, … | every export prefixed `syn` | m: `templates/components-b5.js` throws on a duplicate export name across the ten b5 families |
| 21 | seed locale-neutral, lexicon per locale | silent | CONCEPT ids in `data/b5/synonyms.js`; the seed walks concepts, each locale fills the ones it signed | brief: the same seed renders the same content in all 11; the only way a lexicon-driven page can honour it |

## 2 Claims removed or downgraded as unverified

- A: "the cheetah is a sitting-still cub" → false (opened: standing). The ruling (race car) stands on a different reason.
- A: "674 fits the fi 677 with 3 px to spare" → true by arithmetic but the grid it named (`cardGrid`, `minmax(158px,1fr)`) cannot be configured that way; replaced.
- A: F3 "672 ≤ 677" → false (684); corrected to 660.
- A: F5 pile "2 rows, 109 est." → downgraded: de / fi ten-verb piles can wrap to 3 rows (*est.* sum ~1,160 px over a 646 inner); budgeted at 3 rows (167), stack 615.
- B: "four answers do not fit one line" → true, and irrelevant once the answers are a 2 x 2 square (row 1).
- B: "F4 refused at the fi four-line chrome" → an artefact of B's rope bank, not of Finnish; removed.
- B: F2 "left column cuffs facing right" while the primitive draws the cuff on the LEFT → contradictory; fixed as `mirror:true` on the left column.
- Pedagogy: "floor ≥ 16 groups" → cannot fill a d2 page with distinct words (row 8).
- Pedagogy: level keys and the opposites `syn` counts → re-measured, confirmed.
- Pedagogy: "no refusal is certain" → confirmed; all five contingencies are data counts, none is layout.

## 3 Numbers re-measured (which won)

| quantity | pedagogy | A | B | editor (m) | won |
|---|---|---|---|---|---|
| base card height | - | 158 (css math) | - | **158** (mock render) | A |
| base tag cell / client width | - | 144.2 / text room 123 | - | **144.3 / 140** | A |
| `ausgezeichnet` Baloo 700 18 (13 glyphs) | - | Schmetterling est. 114.1 | - | **117.8**, no clip | A (cap 13 holds) |
| `hämmästynyt` Baloo 700 24 / 18 | - | 149.1 / est. 110.9 | 124 at 20 | **149.1 / 111.9** | A / B agree |
| `ausgezeichnet` Nunito 800 18 | - | - | est. 0.55 x 18 x 13 = 128.7 | **120.6** | B's estimator is conservative (holds) |
| base stack at 677 | 672 est. | 674 | 644 (3 answers) | **668** (own grid, row-gap 12) | editor |
| F1 stack | - | 670 | 696 (fi: shrinking frame) | **666** | A (row-gap 12) |
| F2 stack (8 pairs) | - | 524 (6 pairs) | 512 (6 pairs) | **528** | editor |
| F3 lane / stack | 96 / 576 | 96 / 672 | 70-76 / 560-596 | **94 / 660** | editor (A corrected) |
| F4 stack | 645 | 647 | 684 (fi refused) | **647** | A |
| F5 stack | - | 551 | 592 | **615** (3-row pile budget) | editor |
| opposites `syn.a` per locale | en 12 de 10 es 12 pt 12 fr 14 it 16 nl 10 sv 10 da 10 no 10 fi 14 | - | - | **identical** | pedagogy |
| opposites pos | - | - | - | **adj (+ some nouns); no verbs** | editor: the antonym ban covers adjectives only; verb antonyms (come / go) must be panel-listed in `near` or `ban` |
| `apps.synonyms` | absent | - | - | **present (EN), `83556185`** | editor |
| `Vocabulary Acquisition and Use` strand | - | - | - | **10 locales; `no` missing** | editor |

## 4 OPEN items

1. **The whole lexicon.** No synonym bank exists in any locale; every group, `near`, `ban`, scale, field, F4 fit row and F1 `falseOf` is panel work with two signers. The design is only as good as that data; `validateBank` + the 20-seed build probe are the gate.
2. **de head naming.** Type name "Wortfelder und Synonyme", base "Synonyme …", F4 / F5 "Wortfeld(er) …": the de panel confirms or rewrites (the lock said "de head = Wortfeld"; this keeps it first in the type name and gives the per-verb heads to the faces that teach them).
3. **Render checks before the family is built:** (a) the sock sheet at 100 % on a greyscale school laser printer reads "a sock" (else F2 uses the half-ring fallback); (b) the joined rings read as "joined" at 30 x 18 (else 36 x 22).
4. **Opposites `syn.a` shades** (hot ~ warm treated as the same in G1-337) contradict F3's teaching in spirit. Not a synonyms defect; a re-sign of the opposites bank at its next touch.
5. **F1 in es-MX and de** (second register-clean word for sad / angry) and F3 scale counts everywhere: known only after authoring; the hub matrix drops the face per locale by validator count.
6. **nl strand literal** "Woordenschat en woordvorming" names morphology; the nl panel decides whether synonyms pages carry it or a bare "Woordenschat" (additive row change).
7. **F4 density** 6 items under the G2 8-item floor (row 18): the operator may prefer to accept it (recorded) or to move F4 to G1 with its G1 floor (6-12); I kept G2 because L.2.5.b is the honest code.

## 5 Quality verdict

I would print the base and F4 for my second graders tomorrow: eight calm cards, one big word each, four same-looking choices with room for a pencil loop, and a "said" page with a struck word in a speech bubble is exactly how I teach the Wortfeld routine. F2 is the page my class would remember, because "find the other sock" needs no explanation, but I will not trust it until I have seen the sock printed in grey on our copier. What would embarrass me is not the layout, which is measured, but a card with two right answers: "big" with "large" AND "huge" on it, or a regional pair a Mexican child reads as two different things. That risk lives entirely in the panels' word lists, so the validator's closed groups, the `near` list, the antonym ban read from the opposites bank and the two-signer rule are the parts of this design I care about most. I would also be uneasy handing a Grade 1 child F1's elephant calf for "big"; it works only because the concept is carried by the word, and the page caps concept pictures at two.
