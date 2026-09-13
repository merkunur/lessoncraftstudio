# K-318 `sound-boxes` - editor-critic record (2026-09-13)

Inputs: `_work/K-318-pedagogy.md` (P) and `_work/K-318-design.md` (D). Output: `K-318-sound-boxes.md`. Doctrine applied: measured buildability beats preference; the brief's rules beat both.

## (a) Contradictions found and how resolved

| # | P said | D said | resolution + reason |
|---|---|---|---|
| 1 | base = 6 full-width rows, boxes 60 | base = 2x3 cards, boxes 48, picture 104 | D (px authority per the merge rules). D's card page also holds 6 items at K density and leaves whitespace. |
| 2 | base d2 = 3-5 graphemes | base d2 = 3-4 graphemes | P's range. MEASURED: at 3-4 the base pool is < 8 in most cells (it animals 6, fr animals 5, fi animals 7, pt house 8, es house 9); at 3-5 animals / house / forest reach >= 8 in 11/11. D's fit rule already admits n=5 with <= 2 wide boxes. |
| 3 | minNouns 8 | minNouns 6 | 8 (G1-244 precedent `minNouns:8`; a 6-item page from a 6-word pool renders the same page under every seed). Checked on the face pool after segmentation (both agreed on that). |
| 4 | F1 = 6 uniform dots the child colours, writes nothing | (a) = a blank lane + numeral answerBox | D's mechanic. A colouring target is a K element (floor 56 px); 6 x 56 > 302 card width. The lane keeps "one dot per sound" as a free pencil act and the numeral gives verify() a unique answer. Range = P's 2-5 (measured 11/11 on animals / house / forest / farm). |
| 5 | F3 = 6-box strip on `cardGrid` 2x4, boxes 44 | no strip face; (c) "Where do you hear it" | P's strip face, on 6 full-width rows. 6 x 44 + 40 = 304 > 302 (a 2-col card cannot hold the strip; P's layout claim removed). D's (c) rejected: K-221/K-226/K-227 already own Anlaut/Inlaut/Auslaut in every locale (de titles measured: Anlaute, Auslaute, Inlaute) and its target yield is unmeasured. |
| 6 | F4 = 2-3 syllables, <= 7 graphemes, rows | (e) = 2 syllables, 4-5 graphemes, cards | P's range on rows. MEASURED: D's card config leaves en house 3, en animals 5, nl house 7, da 5 (< 8 in 3-5 locales per theme); P's rows config reaches >= 8 in 11/11 on house and animals. 7 boxes need 384 px, so rows, not cards. |
| 7 | F5 Blend (printed boxes, circle 1 of 3) | absent | kept (genuine reverse move; nl "plakken" is half the head; buildable 11/11 on animals / house / forest). `soundBoxes.printed` added as a NEW option. |
| 8 | multigraph face rejected on measurement | (d) "Two Letters, One Sound", theme-free, refusable | rejected (brief rule 3: unbuildable in >= 4 locales). MEASURED whole-pool words with a multigraph: sv 99, no 93; per theme 0-6. |
| 9 | `tools/gate-sound-boxes-data.js` | `tools/gate-sound-boxes-bank.js` | one node gate, `gate-sound-boxes-data.js`, with D's bank assertions folded in (§5). |
| 10 | `data/b3/sound-boxes.js` with `mode:'rule'` (greedy longest-match over a panel digraph list at runtime) | per-word literal bank `data/b3/sound-boxes-<loc>.json`, "code never infers digraphs" | D's literal bank (the substrate line 34 says "never code inference"). P's rule survives only as an OFFLINE drafting aid that proposes bank rows for the panel to confirm. One module `data/b3/sound-boxes.js` holds both the flags and the bank. |
| 11 | de `remergeAcrossSyllable:['tz']` as a data flag | bank may only merge INSIDE a verified syllable | both kept: the flag exists, default EMPTY, and the validator exempts exactly the listed seams; whether `tz` is one box is a de panel ruling (OPEN 6). |
| 12 | da strict = `policy_managed` ABSENT (402) | da `policy_managed !== true` | equivalent; MEASURED 392 `true`, 0 `false`, 402 absent. The CLAUDE.md §20.7 wording (`policy_managed:false` pool) is stale; P was right. |
| 13 | sv/no multigraph words "99/993, 93/829" | "sv 19 / no 29" | P's numbers are the whole pool (measured 99 / 93). D's 19 / 29 are an unstated subset (probably 2-5-grapheme words); dropped as unverified. Same for de: P's 545 measured; D's 163 dropped. |
| 14 | strand = `strand-names.ts` de "Laute & Silben" | not stated | removed: `strand-names.ts` has no such string; the row is `'Phonological Awareness'` with de "Phonologische Bewusstheit" (line 155-166). |

## (b) Claims removed as unverified or wrong

1. D §2: "n=5, 2 wide -> 45 (296)". 3x45 + 2x68 + 32 + 2 = 305 > 302. Corrected fit rule gives 44 (298), on the floor.
2. D §2: card inner 302 usable by the stack. `page/page.css:156` gives `.ws-card-stage {padding:6px 4px}` -> 294. Fixed by an inline `padding:6px 0` (precedent `G1-244` line with `style="...padding:6px 6px 2px"`).
3. D §7 (c) and (d): rejected faces (see a-5, a-8).
4. P §B: F3 on `cardGrid 2x4` (see a-5); F4 "6 rows" of cards with 7 boxes at 44 in a 302 card (impossible; rows now).
5. P §A: "registrar pattern `tools/register-b2-taxonomy.js`" is real, but P's `apps.sound-boxes` shape was not stated; the file writes `{default_subject, default_age_range, exercise_type_axis_key}` (verified on `write-the-word`).
6. P §E: strand "Laute & Silben" (see a-14).
7. P §E and D: every Jaccard number is an estimate; marked *est.* and left to `scripts/seo-landing/gate.js`.
8. D §5: `answerBox({w:56,h:56})` exists (`components.js:105`) but its answer travels in `data-lcs-answer`, which D did not name; added.
9. D §0: "Whole-pool words with 2 to 5 graphemes: de 349, nl 410, sv 371, no 343" verified exactly; kept out of the design (no face uses that range).
10. Both: `scripts/verify-hub-type-rows.js` cited as the gate; it does not exist (measured). Stated as such in §7 with the two sibling scripts that do.
11. Both: `tools/gate-variation-distinct.js` is b2-bound (reads `waves/wave-b2-en.json` and `gen-b2var-specs.js ROWS`); it cannot see a b3 type until generalised.

## (c) Numbers re-measured (node, read-only, 2026-09-13)

- Nested `chunks`: de 1028/1028 · nl 1062/1062 · sv 993/993 · no 829/829 · en/es/fr/pt/it/da/fi 0 (flat = `split`). Confirms both files and the corrected substrate paragraph.
- `total_agreed < 3`: en 401 · es 210 · pt 179 · fr 430 · it 146 · fi 130 · de/nl/sv/no/da 0 (all carry `rule_authoritative` where < 3). P's "401/910 en, 130-210 es/pt/it/fi" confirmed; fr 430 was not in P.
- da `policy_managed`: true 392 · false 0 · absent 402.
- Multigraph-bearing words, whole pool: de 545 · nl 585 · sv 99 · no 93.
- Sample entries: de `Katze` k,a,t / z,e · de `Fuchs` f,u,ch,s · de `Fisch` f,i,sch · sv `katt` k,a,t,t · sv `kyckling` k,y,c,k / l,i,ng · nl `iJs` ij,s · da `hund` policy_managed true (excluded from K) · da `fisk` strict · fi `kissa` flat kis / sa.
- Per-face cells (10 themes x 11 locales) at each resolved d2; the design file quotes the >= 8 verdicts. P's F0 refusal list (de fruits 6, de vehicles 7, es clothing 7, it clothing 5, sv fruits 4, da fruits 2, no fruits 3, fi fruits 4) reproduced exactly; P's da strict pools (animals 12, house 24, zoo 7, clothing 7, vehicles 6, toys 6, fruits 2) reproduced except house 22 (word-distinct + join check).
- Layout: `.ws-page` padding 0 14 · `.ws-cardgrid` gap 14 · `.ws-card` padding 12, border 2 · `.ws-card-stage` padding 6 4 (page.css lines 16-160).
- Sibling titles: de K-221 Anlaute · K-226 Auslaute · K-227 Inlaute · K-224 Fehlender Laut · K-231 Wörter bauen · K-233 Silben zählen; nl K-224 Ontbrekende klank · K-227 Middenklanken · K-233 Tel de lettergrepen.
- Taxonomy: `apps.sound-boxes` and `axes['exercise-type'].sound-boxes` both absent.

Caveats on my own numbers: es/pt/it/fi/da cells used P's closed digraph list as a draft rule (the panel bank will shift them by a few words); en/fr cells count letters (upper bounds; `horse` = 5 there, 3 after whitelisting). The body height 760 is the substrate's "≈"; the engineer must measure the real card height before trusting the 216 / 87 inner heights.

## (d) OPEN items

Engineer:
1. Measure the real body height and card inner heights at rows 3 / rows 4 / rows 6 (the 216, 151, 87 figures derive from "≈ 760").
2. Write `templates/components-b3.js` (`soundBoxes` with `starter` / `printed` / `uniform`, `hakDots`, `soundLane`) and `primitives/syllable-arcs.js`; render one exemplar per face in de (nested data) and en (bank stub) before any panel work.
3. Generalise or clone `tools/gate-variation-distinct.js` for b3 (a `waves/wave-b3-en.json` + a ROWS source); poison it with First Sound Given minus `starter`.
4. Write `scripts/verify-hub-type-rows.js` (6 rows per key per locale; poison: 5 rows, wrong `coordinate.type`) and `tools/register-b3-taxonomy.js` (`sound-boxes`: letters, 5-7, "Sound Boxes").
5. Write `tools/validate-b3-draft.js` / `apply-b3-locale.js` / `gate-sound-boxes-data.js` with the poison cases in §5; the mutation "bank row merges across a syllable seam not in `remergeAcrossSyllable`" must FAIL.
6. Blend distractor rule: forbid only identical words (P OQ9) or also minimal pairs? Default = identical only; a minimal pair (`kat` / `kar`) is pedagogically the better distractor. Confirm with the pedagogue.
7. Count face at K with 5 sounds cites RF.K.2.d (CVC isolation); if the pedagogue objects, narrow d2 to 2-4 (animals then drops below 8 in pt/fr/it/fi: 6 / 5 / 6 / 7) or keep 2-5 and cite L.K.2.d.

Native panels:
8. de: box 1 width for `Sch` / `Pf` (72 px at 26 px Baloo holds 3 letters; verify by render); `tz` / `chs` across a syllable seam: one box or two (`remergeAcrossSyllable`).
9. sv / no: `mergeDoubles` (`katt` 3 or 4 boxes; ljudning teaches one long sound); sv `ck` per-word override or not.
10. fi: kirjain vs äänne (`kissa` 5 or 4 boxes) per OPS 2014; `[NSR-FLAG][fi]`.
11. da: K faces reach 8 only on animals + house under the strict pool; widen the pool (panel-reviewed `policy_managed:true` words for the G1 faces only) or ship two themes.
12. en / fr: author the per-word whitelist bank for animals, around the house, forest creatures first (en animals 19, fr animals 13 candidates); yield UNKNOWN until authored; magic-e (en) and mute finals (fr) policy.
13. es / pt / it: confirm the closed digraph lists and the `qu`/`gu` (es, pt) and `gl`/`sc` (it) positional rules; decide whether it doubles are one box.
14. All: rename the six titles to the genre heads teachers type (P's heads are proposals); check the sv definite-form trap on every theme noun in a title (`djur` safe; `bana` -> `banan`).
15. All: 2-source words (`rule_authoritative`; en 401, fr 430, es 210, pt 179, it 146, fi 130): trust the v1.1 gate (default) or refuse < 3 for this type (P OQ6). Default = trust; the bank check (join == word, per-syllable join == split) is a stronger local guard than the source count.

## (e) Quality verdict

Top quality for a 5-7-year-old: yes, on the K faces the page is one calm act (say it, stretch it, one pencil mark per sound), 48 px boxes and a 104 px picture, no letters to read, and the six faces are six different things the child does rather than six ranges.
A critical teacher would say: the wide box + tie arc must be explained once in the instruction or children will write two letters in a normal box and one in the wide one; and on the Sound Strip face some children will fill all six boxes, so the instruction must say "leave the rest empty" in the child's own words.
Risk the teacher would not see but the operator should: seven locales have no grapheme data, so the whole type's quality there is exactly the quality of a hand-authored bank; ship de/nl/sv/no first and let each bank earn its locale.
