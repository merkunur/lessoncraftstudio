# G2-315 `spelling-rules` : editor-critic record (2026-09-13)

Inputs: `_STUDIO-BRIEF.md`, `_SUBSTRATE.md`, `_PANEL-FINDINGS.md` section 5, the FINAL K-317 / G1-305 files, `_work/G2-315-pedagogy.md`, `_work/G2-315-design.md`; verified in the repo: `templates/components-b2.js`, `templates/components.js`, `page/page.css`, `primitives/trace-path.js`, `primitives/_svg.js`, `templates/layouts/card-grid.js`, `types/g1/G1-244-write-the-word.js`, `types/k/K-287-singular-plural.js`, `lib/b2-common.js`, `enumerate.js`, `emit/manifest.js`, `tools/gate-variation-distinct.js`, `tools/register-b2-taxonomy.js`, `qa/lints.js`, `frontend/lib/seo/strand-names.ts`, `frontend/config/topics-taxonomy.json`, `approved-words-<loc>.json` x11. Measurement script: scratchpad `g2315-measure.js` (not committed).

## 1 Contradictions + resolutions

| # | conflict | pedagogy | design | resolution (doctrine) |
|---|---|---|---|---|
| 1 | fifth face | F5 The Plural Changes the Spelling (refused fr/sv/no/pt = 4 = the rule-3 ceiling) | (g) look-cover-write (Lernwörter; no verify) | **Pedagogy's F5 wins, re-measured:** fr ships on `pluriel en -x` (32 pairs, CE1 orthographe head "pluriel des noms en -eau"), pt on `-ão to -ões` (31; + `-m/-ns`, `-l/-is` = 50; BNCC EF02LP); sv/no stay refused (syncope `cykel-cyklar` 43 / 13 is böjning, not a spelling rule); **nl newly refused** (its base IS the plural page: a second plural page = the base with a new title, brief rule 2). 8 of 11 ship, 3 refused < 4. Look-cover-write rejected: open-ended (brief line 11 allows no-verify only for writing templates), rule-agnostic (the rule letters "stay uncoloured in a stroke lane"), and its render is K-284's `strokeWordLane({reps:2, stack:true, emptyLast:true})` byte for byte at G2 = word-tracing relabelled. "Lernwörter üben" demand is served by the rule fan's titles, not by a copy page. |
| 2 | proof column | its own face F1 d3 knob (honest in de/nl/da/fi/it/es) | folded into (b) as a `proof` flag | Agree: the d3 `proof:true` knob on Face 2; measured honest in 6 (de 20 Verlängern / 66 Ableiten, nl 100, da 92, fi 134, it 44, es 8 or 44). |
| 3 | Rule Detective act | circle the rule grapheme + copy it into a box | circle + write the WHOLE word on a ruling | **Pedagogy:** copying the grapheme keeps the face at recognition level and off Face 5's whole-word production; writing the whole word would make Detective a scaffold-delta of Face 5 (brief rule 4). `answerBox({w:56,h:44})` from `templates/components.js`; d3 foils with an empty box. |
| 4 | Detective d2 count | 10 rows | 8 cards | **Design (8):** the design's card geometry is measured (2x4, stage 302x120); 10 full-width rows give 68 px per row at body 760, below a 48 px picture + box. d3 = 8 incl. 2 foils. |
| 5 | maxLetters at d2 | <= 10 | <= 12 (cell 24 = the 22 px floor) | **Design (12)** for the base; the pool numbers in the FINAL are quoted at <= 10 as a conservative floor (11-12-letter words add de 27 / fi 44 / nl 30 more). Face 2/3 <= 10 (word column 246/190), Face 5 <= 8. |
| 6 | base column shape | 8 full-width rows, picture 60 left, boxes 30 | 2x4 portrait stack, picture over a cell word | **Design:** the row shape caps a 12-letter word at cell 19 (font 17 < 22); the stack holds it at 24. The pedagogy's "8 rows" carried no px. |
| 7 | de base rule | Doppelkonsonanten (190) | i/ie (exemplar `ie`, 14) | **Doppelkonsonanten** (tier A, 153 usable vs 38); ck/tz inside or outside is a panel data ruling (both counts recorded). |
| 8 | fr base rule | m devant m, b, p (26) | m devant b/p (10, "thin, base only") | Kept m devant (the A head): 21 usable, base needs 10 (8 + 2 models) = ships with 11 spare, Face 2 ships with the n-contrast, Face 4 ships (>= 6 per side: m 21 / n-contrast); the design's 10 was a 15-theme count. |
| 9 | nl base derivation | gap in the PLURAL (bo-men vs bom-men) via `split` | singular open 99 / gesloten 29 | **Pedagogy:** the open/gesloten point is only visible in the plural; measured boom-bomen 75, kat-katten 138; `gapCells` fixed at 2 for both classes (1-cell vs 2-cell would leak). |
| 10 | da pool | full approved (119) | strict (45) | **Full approved** (section 1 of the FINAL): §20.7's decoration rule is a K-1 policy; at 2. klasse the `policy_managed` words are the rule words (stumt d 36 vs 8, ng 39 vs 11, F6 92 vs 47 on strict). |
| 11 | en magic e | "TWO boxes" | one `gap:{from,len}` | `gaps` is an ARRAY on the row component and the stamp (`data-lcs-gap="1:1,3:1"`); poison P9. |
| 12 | fan mechanism | `ruleAxis` = K-317 `letterAxis` | same | ONE generic `fanAxis` implementation (`axisPerType` / `axisOverrides` in the plan, `instance.axis`, `deckIdFor` suffix, `variant_id`, title token); K-317's file names the first instance `letterAxis`; no second plumbing (OPEN 1). |
| 13 | frame-uniqueness set | the rule's FULL `cands` (de 11 exclusions, nl 34, sv 22, no 29, it 19, fi 17, en 8) | the pair only, flagged for panel review | **Pedagogy's full set** in the validator (rule 4); my pair-level re-measure (0-2 collisions per rule) is the lower bound and shows the full-set exclusions cost nothing against the floors. |
| 14 | bins geometry | 2 bins of 5 lines | `ruleBins` 300x300 inline | Agree; recorded that `page.css:234` `.ws-bin` is `height:170px; max-width:260px` and the component overrides inline. |
| 15 | F6 layout | 6 rows, singular + 3 clones + gapped plural | none (face dropped) | Authored here: `.ws-lane` rows, singular column 180 (cell 22), answer cells 26; `plural` + `pluralGap` are panel literals (never computed: `Apfel -> Äpfel` differs at cell 0). |

## 2 Claims removed as unverified

- Pedagogy "en floss 19 (F1/F3 refuse)": kept the refusal but the reason is now stated (no single-consonant contrast side exists in English, the rule is absolute), not the count.
- Pedagogy "fi diftongit UNKNOWN": measured 148 usable; kept as a pattern rule (base/F3/F5 only) because a diphthong has no two-way opposition for Face 2/4.
- Pedagogy "es h muda bins need same-onset sin-h words (*est.* > 40)": left UNKNOWN for the panel; not carried as a number.
- Pedagogy "fr lettre finale muette *est.* 40-60": UNKNOWN (panel bank); F6 fr no longer depends on it (the -x plural replaces it).
- Design "sv dubbel 91 · no dobbel 90 · da dobbelt 45 · fr m devant 10 · it doppie 145 · de Doppel 90": all 15-theme counts, superseded by the 50-theme measure below.
- Design "(d) write the proof form REFUSED in sv/da/no/fr/it/es/pt (7 of 11)": wrong for da (92), it (44), es (8/44), and after re-measure fr (32) and pt (31); the proof knob is honest in 6, F6 in 8.
- Design "fi minimal pairs need TWO pictures (pair:true)": the pedagogy's measure (fi 2 pairs) kills it; removed.
- Design "`letterChips` in components-b3.js": the file does not exist yet (K-317 names it; measured absent); kept as the K-317-owned component, flagged in OPEN 2.
- Both files: "body ≈ 760" stays UNKNOWN; every stack is proven at 736.

## 3 Numbers re-measured (one regex per rule; 50 colour themes, distinct words; usable = <= 10 letters, grapheme once, no pair collision; (approved) = also in `approved-words`)

Pools: en 876 (796 approved) · de 847 (703) · es 802 (759) · pt 780 (713) · fr 771 (644) · it 805 (770) · nl 851 (732) · sv 844 (667) · da 847 (581 full / 295 strict) · no 844 (584) · fi 845 (780). Words <= 10 letters: 84 % (fi) to 96 % (en).

| loc · rule | regex (first match = the gap) | hits | usable (approved) | file carries |
|---|---|---|---|---|
| de Doppelkonsonant incl ck/tz | `([bdfglmnprst])\1\|ck\|tz` | 194 | 153 (140) | 153 (140) (pedagogy 190 = hits; design 90 = 15 themes) |
| de Doppelkonsonant excl ck/tz | `([bdfglmnprst])\1` | 151 | 120 (109) | 120 (109) |
| de Auslaut | `[bdg]$`; proof = plural `(e\|en\|er)$` with the folded stem carried | 58 | 50 (44); proof 20 (17) | 50 (44) / 20 (17) (pedagogy "44+50" was ambiguous) |
| de ie (regex draft; the bank uses `chunks`) | `ie` | 49 | 38 (31) | 38 (31) (pedagogy 37) |
| de Dehnungs-h | `(?<=[aeiouäöü])h(?=[lmnr]\|$)` | 39 | 31 (31) | 31 |
| de ss/ß | `ss\|ß` | 34 | 24 (21) | 24 |
| de äu / Ableiten | `äu`; plural has `ä\|äu`, singular none | 2 / 66 | 2 / 66 (63) | REFUSED / 66 |
| fr m devant | `(?<=[aeiouy])m(?=[mbp])` | 26 | 21 (19) | 21 (19) (pedagogy 26 = hits; design 10 = 15 themes) |
| fr o/au/eau (excl `saure`) | `eau\|au\|o(?![uin])` | 208 | 167 (136) | 167 |
| fr ch/gn/ph | `ch\|gn\|ph` | 80 | 68 (64) | 68 |
| fr pluriel en -x | plural `x$`, singular not | 32 | 32 (29) | 32 (NEW) |
| nl boom-bomen | singular `([aeou])\1[bdfgklmnprstv]$`, plural = one vowel dropped + `en` | 75 | (n/a, plural face) | 75 (pedagogy 71) |
| nl kat-katten | singular `[aeiou][bdfgklmnprst]$` (single vowel), plural = + C + `en` | 138 | | 138 (pedagogy 108) |
| nl d/t | `[dt]$`, plural `(den\|ten)$` | 108 | (100) | 100 |
| nl ei/ij · au/ou | literal | 52 · 40 | 44 (41) · 25 (19) | 44 · 25 |
| en magic e | `(?<![aeiou])[aeiou][bcdfgklmnprstvz]e$` | 80 | 77 (76); 1 collision `cape~cap` | 77 (pedagogy 72) |
| en c/k/ck · ai/ay · floss · ee/ea | `ck\|(?<!c)k\|c(?=[aou])` · `ai\|ay` · `(ff\|ll\|ss\|zz)$` · `ee\|ea` | 188 · 35 · 19 · 66 | 167 (158) · 35 (29) · 19 · 64 (60) | as usable |
| en y-ies / f-ves | plural `ies$` with `y$`, `ves$` with `fe?$` | 29 | 21 <= 10 letters (28) | 21 (29) |
| sv dubbelteckning · ng | `([bdfgklmnprstv])\1\|ck` · `ng` | 193 · 56 | 169 (149) · 46 (36) | 169 · 46 |
| sv sj · tj (drafts, upper bounds) | `sj\|skj\|stj\|sk(?=[eiyäö])` · `tj\|kj\|k(?=[eiyäö])` | 25 · 61 | 19 (18) · 55 (46) | <= 19 · <= 55, PANEL LIST |
| no dobbel · ng · kj · sj | `([bdfgklmnprstv])\1` · `ng` · `kj\|k(?=[iy])` · `sj\|skj\|sk(?=[iy])` | 223 · 44 · 42 · 35 | 190 (158) · 38 (33) · 36 (26) · 31 (28) | 190 · 38 · <= 36 · <= 31 |
| da dobbelt (between vowels) · stumt d · ng · stumt h | `(?<=V)([bdfgklmnprstv])\1(?=V)` · `(?<=V)d(?=e?$)` · `ng` · `^h(?=[jv])` | 118 · 38 · 48 · 9 | 96 (75 / strict 47) · 36 (28 / 8) · 39 (35 / 11) · 9 (8 / 3) | full-pool figures |
| da kat-katte | plural `C\1e[rn]?$`, singular no double | 92 | (66 / 47) | 92 |
| fi kaksoiskonsonantti · pitkä vokaali · ng/nk · diftongit | `([kptlmnrsdhjv])\1` · `([aeiouyäö])\1` · `ng\|nk` · 16 literal diphthongs | 271 · 172 · 36 · 228 | 210 (201) · 133 (125) · 21 (21) · 148 (143) | as usable (pedagogy 276 / 167 / 36) |
| fi astevaihtelu | singular `(kk\|pp\|tt)V$`, plural = weak grade + `t` | 134 | (132) | 134 (pedagogy 141) |
| it doppie · c/ch · g/gh · gn/gli · sc/sci · cu/qu/cqu | `([bcdfglmnprstvz])\1` · `ch(?=[ei])\|(?<!s)c(?=[ei])` · `gh(?=[ei])\|(?<!s)g(?=[ei])` · `gn\|gli` · `sc(?=[ei])` · `cqu\|qu\|cu(?=[aeio])` | 260 · 117 · 49 · 35 · 12 · 11 | 222 (216) · 98 (93) · 44 · 30 (29) · 10 · 11 | as usable; cu/qu REFUSED |
| it -chi/-ghi | singular `[cg][oa]$`, plural `(chi\|ghi\|che\|ghe)$` | 45 | 44 <= 10 letters | 44 |
| es b/v · c/qu · g/gu · ll/y · h muda · g/j | `[bv]` · `qu(?=[ei])\|c(?=[aou])` · `gu(?=[ei])\|g(?=[aou])` · `ll\|y` · `(?<!c)h` · `j\|g(?=[ei])` | 162 · 190 · 73 · 63 · 30 · 66 | 140 (136) · 171 (164) · 68 (63) · 59 (58) · 28 (27) · 61 (60) | as usable |
| es z-ces · tilde -ón/-ín/-án | plural `ces$` with `z$` · `(ón\|ín\|án)$` to `(on\|in\|an)es$` | 8 · 49 | 8 · 44 <= 10 | 8 / 44, panel choice |
| pt s/ss · r/rr · nh/lh/ch · x/ch · m antes · ç | `ss\|(?<=V)s(?=V)` · `rr\|(?<=V)r(?=V)` · `nh\|lh\|ch` · `x\|ch` · `m(?=[pb])` · `ç` | 63 · 145 · 79 · 42 · 25 · 22 | 46 (42) · 114 (102) · 72 (68) · 39 (37) · 22 (19) · 22 (21) | as usable (pedagogy s/ss 64, m 25) |
| pt -ão/-ões (+ -m/-ns, -l/-is) | singular `ão$`, plural `(ões\|ães\|ãos)$` (+ `m$`/`ns`, `l$`/`is`) | 31 (+12, +7) | 31 (25) / 50 (42) | 31 (NEW) |

The sv/no sj/tj/kj drafts over-count (`kiwi`, `kiosk`, `kirsebær`, `skilpadde`); the panel list decides whether they reach the 10-item floor. Collisions at the pair level: `cape~cap`, `palla~pala`, `ball~bal`, `matto~mato`, `blad~bla`; the FULL-set gate (validator rule 4) removes the pedagogy's larger sets (de 11 … nl 34), all within the floors.

## 4 OPEN items

Engineer:
1. Build the generic `fanAxis` (enumerate loop + `deckIdFor` suffix + `instanceSeed` + `render-instance` pass-through + `manifest.variant_id` + title token) ONCE; K-317 (`letterAxis`) and G2-315 (`ruleAxis`) both declare it; until then only the exemplar deck per face ships (K-317 critic OPEN 1 is the same item).
2. `templates/components-b3.js`, `tools/apply-b3-locale.js`, `tools/validate-b3-draft.js`, `scripts/verify-hub-type-rows.js`, and a b3 wave file / ROWS list for `gate-variation-distinct.js` (bound to `wave-b2-en.json` + `gen-b2var-specs.js ROWS`) do not exist; ownership = the first design built in the batch (K-317).
3. `gapWord` takes `gaps` as an ARRAY (en magic e) and re-lays letters after every box; poison P9.
4. Measure the exact body height (header + instruction + footer); every stack above is proven at 736 and 760.
5. Baloo 2 700 advance at 24/22 px vs cell 24 (`m w W`, de capitals, `Ä Ö Ü`): the data gate asserts advance <= cell - 2 in the browser (shared with G1-305 OPEN 1); on failure `maxLetters 11`, never a smaller font.
6. `.ws-bin` defaults (`height:170px; max-width:260px`, `page.css:234`) are overridden inline by `ruleBins`; confirm `.ws-bin-label` (absolute 56x56 at top -28) holds a 44 px chip without clipping the dashed top border.
7. Face 6 row width: 668 > 639 at the first cut; the singular column is 180 (cell 22, font 20) so the answer cells stay 26; measure once on a de render (`Fledermaus -> Fledermäuse`, 11 letters: refuse > 10 in the answer).
8. Register `apps['spelling-rules']` + `axes['exercise-type']['spelling-rules']` x11 before `enumerate` (it throws on a missing non-EN slug/name).

Panels:
9. Exemplar rule per locale (FINAL section 1 bold); de ck/tz inside or outside Doppelkonsonanten; sv/no sj/tj/kj lists (drop loanwords); fi F6 band (2. or 3. luokka); es F6 z-ces (8, marginal) or the tilde rule (44); pt F6 -ão only or with -m/-l.
10. Every item picture OPENED (sv #35 rule); `plural` + `pluralGap` authored as literals per F6 item; sv/da/no confirm no definite form slipped in; the EN source strings handed over as a source to audit.
11. `strand-names.ts` `Language` row has NO `da` and NO `no` entry (`frontend/lib/seo/strand-names.ts:170-186`, read 2026-09-13): the chip would print "Language" on a Danish / Norwegian page via the `row.en` fallback. The da/no panels author the Fælles Mål / LK20 names (da candidate "Sprog og sprogbrug", no "Språk og språkbruk"; NOT checked against the frameworks) in THIS wave, since this type is the first da/no Language page.
12. fr `lettre finale muette` bank (derived-word pairs) if the fr panel wants it as a fan rule; F6 fr no longer waits for it.

Pipeline:
13. `verify-hub-type-rows.js` expects 6 rows per locale except sv/no/nl 5 (63); it must count distinct faces once rules fan.
14. Meta lead vs "nothing is free" (K-317 critic OPEN 14 applies verbatim): confirm the live lead per locale from shipped bytes before panels write MIDDLEs.
15. The frame-uniqueness gate runs against the WHOLE locale pool (every pictured word), not the rule's items; poison P1 must use a pool word absent from the items.

## 5 Quality verdict (a critical second-grade teacher)

The base is the page I would actually put on a desk: one rule, two worked models, eight pictures, one gap each, nothing to read but the word itself; the fixed-width gap on the Which One page is the detail that stops my quick child from reading the answer off the box. The Plural page is the strongest idea in the set because it puts the rule where children really meet it (Hund, Hunde), but it will only be as good as the panel's literal plurals, and I would want to see the Danish and French pages rendered before I believe the 8-of-11 claim. My worry is French: a base with 21 words is a page that will look the same every week once the fan lands, and the m-devant rule at CE1 is a one-week topic, not a term's.
