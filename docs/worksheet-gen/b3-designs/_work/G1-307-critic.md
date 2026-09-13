# G1-307 `opposites` : editor-critic record (2026-09-13)

Inputs: `_STUDIO-BRIEF.md`, `_SUBSTRATE.md`, `_PANEL-FINDINGS.md` §6, siblings `K-317-letter-of-the-week.md` + `G1-305-syllable-split.md`, `_work/G1-307-pedagogy.md` (P), `_work/G1-307-design.md` (D). Repo reads: `templates/components-b2.js` (exports at :26-297), `templates/components.js:130`, `templates/layouts/card-grid.js`, `page/page.css:16-24, 119-163, 274, 354-422`, `primitives/trace-path.js:681-713`, `primitives/jug.js:15-54`, `primitives/_tokens.js:65-71`, `types/_shared/size-compare.js:14`, `types/_shared/lit-vocab-match.js:35-60`, `types/g2/G2-275-word-classes.js`, `data/b2/word-classes.js` + `sentences.js` (node), `lib/b2-common.js:35-69`, `data/science/hot-vs-cold.json` + `day-vs-night.json`, `frontend/config/topics-taxonomy.json`, `scripts/seo-landing/gen-b2var-landings.js:112-124`, `tools/gate-variation-distinct.js:28-36`, `enumerate.js`. Output: `../G1-307-opposites.md`.

## 1 Contradictions + resolutions

| # | topic | P said | D said | ruling + why |
|---|---|---|---|---|
| 1 | K picture-match face | 9 pictureable pairs (+2 est.); F1 at K | only 3 picture kinds (scale, sun/snowflake, faces); a picture base collapses into comparing-sizes; no K face | **P wins, corrected to 7.** Opened 21 pictures (section 3): 7 honest pairs, one scale pair per page. D never opened the pictures (it wrote "UNKNOWN until opened"); its "collapses into comparing-sizes" holds only for a page that repeats big/small, which the one-scale-per-page rule forbids. F1 ships at K and carries the en/nl K head. |
| 2 | hot/cold art | `weather/hot` = a second sun, `weather/cold` = a penguin; use sun/snowflake | UNKNOWN | P's read confirmed by my own open. But `sun` backs day/night too, so hot/cold = `camping/campfire` + `weather/snowflake` (campfire opened: a clean fire on logs), freeing `sun` for day/night. |
| 3 | full/empty via `jug` | pictureable | not listed | **Refused.** `jug()` prints graduation numerals + a unit label (`jug.js:8, 54`); a measurement instrument on a K vocabulary page, and the measurement family owns it. |
| 4 | black/white, sweet/sour | *est.* | not listed | black = a black drop (reads "drop"), white = a pale grey drop invisible on cream: **refused**. candy = a red wrapped sweet, lemon = a lemon: **reserve**, panel per locale. |
| 5 | base d2 pictures | 8 cards, >= 3 pictured | no pictures at d2 | **D wins.** 7 pictured pairs with clash rules make a half-pictured page (D's Alt B objection); uniform cards; pictures at d1 only. |
| 6 | F2 frames | whole authored sentences, stored answer, NO `{name}` | `{name}`/`{adj}` with masc. names forced in es/pt/it/fr | **P's shape wins; `{name}` allowed per locale.** Frames are whole literals with a stored answer; `{name}` permitted only where the predicative adjective does not inflect for gender: en de nl fi (uninflected) + sv da no (person = common gender sg = citation form); FORBIDDEN in es pt it fr (`nameSlot:false`, validator rule 5). D's "force masc. names" would print a boy on every Romance frame. |
| 7 | fifth judging face | F4 synonym decoy (circle the antonym) | Face 5 family intruder (odd one out) | **P wins, against the commissioner's lean ("family intruder now").** `[big, small, red]` is solved by category without the antonym relation (a category bot scores 100 %, the sv-fan-out "solvable without reading" class); P's own rejection of synonym odd-one-out (two answers) stands. The synonym bank does not exist, but neither does the pairs bank: `syn.a` is authored in the same draft, >= 8 per locale or F4 refused there. "Same or opposite?" is therefore F4 itself, not a future face. |
| 8 | F3 pair-up | draw lines in a 4x3 chip mesh | 12 chips, write the 6 pairs on lanes | **D wins.** Six lines crossing inside a 4x3 block cannot be read back; P's own adjacency assertion admits it. |
| 9 | F5 rows | 8 rows, prefix chip once | 6 rows + legend (724 px) | **8 rows.** G2 density floor is 8-16 items (`_tokens.js:70`); 8 rows x 80 + legend 56 = 750 fits (re-measured). |
| 10 | F4 layout | 8 single-line rows, 3 chips | n/a | Re-measured: 3 pills of 11 letters + a target column = 764 > 639. **6 two-line rows** (target above the pills); 8 rows at d3 with 20 px pills. |
| 11 | bank height | 44 (one row) | <= 122 (two rows) | 8 words of 5-9 letters at 18 px ≈ 760 px of pills: two rows. *est.* 100-112 from the CSS (`.ws-bankword` padding 6 14 + `.ws-bank` padding 8 12 + border 2.5); engineer measures. Card row therefore 158, inner 302x130 (D said 145/121 with a 122 bank). |
| 12 | en CCSS | L.K.5.b (K), L.1.5 umbrella, L.1.4.b | L.1.5.d | **P.** L.1.5.d is shades of meaning, not antonymy. |
| 13 | bands | F1 K, F5 G2 | all five G1 | **P.** F1 K (the head + the only antonym code), F5 G2 (en "antonyms 2nd grade"; fr CE1 / it classe seconda / fi 2. luokka agree). |
| 14 | `answerBox` in F2 | 150x44 dashed box | inline `writingRow` | **D.** Words go on school lines (brief); a box invites a numeral. |
| 15 | loud/quiet in the bank | en de nl sv no fi (4 pairs each) | "only en/de/fi" | **P** (m): nl `luid/stil`, sv `hög/tyst`, no `høy/stille` are in the bank. |
| 16 | theme axis | off | off | agreed; measured 4 themes with >= 1 pair, none reaching a page. |

## 2 Claims removed as unverified or wrong
- D: "only big/small, hot/cold, happy/sad exist" as picture pairs (refuted by opening the art).
- D: `L.1.5.d` (wrong code).
- D: bank pill estimate `26 + 0.62*18*len + 10` kept, but its "2 rows ≈ 110-122" is *est.*, not measured; flagged.
- P: "full/empty = `jug` at max / 0" (prints numerals + `ml`).
- P: "9 pictured pairs + 2 est." -> 7 + 2 reserve after the one-noun rule and the opens.
- P: pt bank pairs = 3; measured 3 + `barulhento/quieto` (quieto = still); left to the panel.
- Both: `K-3xx`/`G1-3xx` ids stay TBD by the emitter (brief).
- Neither file measured chip widths at 20-22 px for `kovaääninen` (11) or `ked af det`; marked *est.* (OPEN 3).

## 3 Pictures opened (`scripts/worksheet-gen/cache/themes-512/<theme>/<noun>@3x.webp`; the `image-cache/cache/...` path in the task does not exist, the cache is `cache/themes` + `cache/themes-512`)

| file | shows | verdict |
|---|---|---|
| weather/hot | a smiling sun with red heat-bar marks | NOT "hot": a sun. Refused for hot/cold |
| weather/cold | a penguin in a red bobble hat and scarf | NOT "cold": a penguin. Refused |
| weather/sun | a smiling yellow sun, transparent | day (day/night) |
| weather/sunny | a smiling sun with orange ray bars, near-duplicate of `sun` | reserve only (sunny/cloudy) |
| weather/snowflake | a clean blue six-arm snowflake | cold |
| weather/cloudy | a dark blue-grey cloud cluster | cloudy (reserve) |
| weather/cloud | a PINK cloud with a face | not used |
| camping/campfire | flames on crossed logs, transparent | hot |
| zoo animals/cheetah | a standing spotted cheetah (cartoon; a child may say leopard, irrelevant: the noun is never printed) | fast |
| forest creatures/snail | a snail with a striped shell | slow |
| zoo animals/elephant | a sitting cartoon elephant | heavy (also the sole scale candidate; one-noun rule) |
| easter/feather | a red/yellow/blue feather | light |
| space/moon | a full moon with craters | night |
| space/sun | an orange sun on an OPAQUE BLACK SQUARE | refused (no transparency) |
| around the house/pillow | a white pillow with red ends | soft |
| camping/rock | a grey boulder (vocab word fi `kallio`, sv `klippa` = crag; never printed here) | hard |
| emotions/happy | a laughing yellow face | happy |
| emotions/sad | a frowning yellow face | sad |
| At the Supermarket/candy | a red wrapped sweet | sweet (reserve) |
| fruits/lemon | a lemon | sour (reserve) |
| colors/black | a black paint drop | refused (reads "drop") |
| colors/white | a pale grey drop | refused (invisible on cream) |

Every picture noun above has a vocab entry via `entriesFor` (m); `B2_EXCLUDE` touches none of them.

## 4 Numbers re-measured (node, 2026-09-13)
- Adjective bank: en 28 · de 30 · es 30 · fr 30 · pt 32 · it 30 · nl 30 · sv 30 · da 30 · no 31 · fi 28 (D's list confirmed; P's "28-32" range confirmed).
- Complete antonym pairs in the bank: en 4 · de 4 · es 3 · pt 3 (+1 borderline) · fr 4 · it 3 · nl 4 · sv 4 · da 3 · no 6 · fi 4 (P wins over D on loud/quiet).
- Names per locale: 8 in all 11 (`SENTENCES[loc].names`); frames 19-23 (not used by this type).
- `SCALE_LADDER = [0.42, 0.58, 0.76, 1.0, 1.3]`; 1.0 vs 0.42 = ratio 2.4 >= 1.3.
- Density: K 56/30/[4-8], G1 44/26/[6-12], G23 36/22/[8-16].
- `.ws-lane` inner width 639 (padding 16 + border 2 each side); with padding 12: 647. `.ws-card` inner = card - 28.
- `topics-taxonomy.json`: `opposites` absent (0 hits); `word-classes` present as the shape precedent (`default_age_range:'7-9'`).
- Absent files: `templates/components-b3.js`, `tools/apply-b3-locale.js`, `tools/validate-b3-draft.js`, `tools/register-b3-en-content.js`, `scripts/verify-hub-type-rows.js`. Present: `tools/gate-variation-distinct.js` (reads `waves/wave-b2-en.json` + `wave-b2var-en.json` + `gen-b2var-specs.js ROWS`), `tools/apply-b2-locale.js`, `tools/register-b2-taxonomy.js`, `qa/lints.js`.
- Layouts re-computed in the design: base 112 + 14 + 4x158 = 760; F1 itemH 114; F2 lane 106 (inner 90 >= 84); F3 620; F4 6 rows x 116 (pills 603 <= 639); F5 750.

## 5 OPEN items
Engineer
1. Measure `wordBank` height for 8 words at 18 px in fi and de renders; if > 112, drop `wordPx` to 17 before any row change (never a 3rd row).
2. Measure `writingRow` glyph capacity at glyphH 28 (G1-305 estimate ~14 glyphs at 21 px) and set `maxLetters` from it.
3. Measure `.ws-tile` (20 px) and `.ws-pill` (22 px) widths for `kovaääninen` (11) and `ked af det`; F4 pill cap 11 letters is *est.*
4. Confirm a 44 px scaled "small" icon on F1 is legible at 11.6 mm; if not, F1 scale pair becomes 96 vs 56 and itemH is re-derived.
5. Write `templates/components-b3.js` entries `oppositeArrow pairCard matchColumns frameRow pairLane choiceRow prefixChips` (names shared with the batch; the first design to build wins the file).
6. `tools/gate-opposites-data.js` + `qa/verify-b3-opposites.js` with the 8 poison cases; P3 needs `picOpened` in the schema.
7. `scripts/verify-hub-type-rows.js` does not exist: write + poison-test before `apps.opposites` is registered.
8. `gate-variation-distinct.js` reads the b2 wave files only: a b3 wave file / rows list is required before it sees G1-307 (same as G1-305 OPEN 11).
Panels
9. es: chico vs pequeño (MX); one member, declared override for validator rule 8.
10. pt: BNCC habilidade for antonímia (name the framework if unknown); `quieto` vs `silencioso`.
11. nl: warm/koud vs heet/koud for groep 3.
12. sv/da/no: confirm every frame subject is common-gender singular when `{name}` is used; sv bans `rolig` in F5; da confirms `urolig`.
13. All: >= 8 `syn.a` G1-legible near-synonyms, or refuse F4 (recorded); reserve pairs sweet/sour, sunny/cloudy in or out per locale; every kept `pic` opened.
14. fr/it/fi: F5 band (CE1 / classe seconda / 2. luokka are all G2 keys; refusal allowed).
Pipeline
15. Register `apps.opposites` + `axes['exercise-type'].opposites` x11 (registrar clone of `register-b2-taxonomy.js NEW_FAMILIES`).
16. `topicMeta.opposites` + `skill-sentences` entries; the "Free printable" meta lead is a standing tier-truth item, not this type's.
17. The emitter assigns `K-325+` (F1) and `G2-320+` (F5); the band is stated, the id is not.

## 6 Verdict (a critical first-grade teacher)
Six real moves, each a different thing my class does with a pair of words: match pictures, write from a bank, finish a "not" sentence, hunt the pairs, beat a look-alike, build with a prefix. The two things that would have embarrassed me are gone: a "cold" that is a penguin, and an odd-one-out my weakest reader can solve by spotting the colour word. What I still cannot see is whether eight pills and a bank of eight really fit a German page; that is measured next, not assumed.
