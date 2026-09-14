# K-317 `letter-of-the-week` — the FIVE variation faces (build record, 2026-09-14)

Built from `K-317-letter-of-the-week.md` §3 (+ §1/§4/§5) under `_FACE-BRIEF.md`, on the base of `_work/K-317-build.md`. Nothing shared was edited; nothing committed. Ids are the allocation's: **K-325 · K-326 · K-327 · G1-311 · K-328**.

## Files
| file | what |
|---|---|
| `scripts/worksheet-gen/tools/b3var-rows/letter-of-the-week.js` | NEW — 4 rows (K-325/326/327/328) + 1 HANDWRITTEN (G1-311); read by `gen-b3var-specs.js` |
| `scripts/worksheet-gen/types/k/K-325-…-words-with.js` · `K-326-…-beginning-middle-end.js` · `K-327-…-circle-and-count.js` · `K-328-…-m-or-n.js` | emitted by `node tools/gen-b3var-specs.js` (spread base d2 + the knob) |
| `scripts/worksheet-gen/types/g1/G1-311-sound-of-the-week.js` | HANDWRITTEN (base K-317): its own `unitAxis` over `bank.units` (function values a row cannot carry) |
| `scripts/worksheet-gen/types/k/K-317-letter-of-the-week.js` | additive knobs read by `_buildWith` + a `verify()` branch per face (see "Knobs"); the base's default path is byte-identical (baseline PASS below) |
| `scripts/worksheet-gen/templates/components-b3/letter-of-the-week.js` | NEW exports `positionKey`, `positionCard` (face 3), `letterChips` (face 6); `letterCard`/`huntCard` untouched |
| `scripts/worksheet-gen/data/b3/letter-of-the-week.js` | EN bank: `unitExemplar:'sh'` + `units` sh/ch/th (17/8 · 17/6 · 12/8 items/foils, every picture opened on `out/dev/K-317-sheet-f5-{sh,ch,th}.png`) + face strings (`K-325…K-328`, `G1-311`) |
| `scripts/worksheet-gen/qa/verify-b3-letter-of-the-week.js` | the gate grows: face capacity per letter, face renders + long chrome, face sweeps, poisons P7–P14 |

## Knobs (all ADDITIVE in the base spec; stamped `data-lcs-face` only when declared)
`trace.lanes:'upper'` (slim zone 1 = letterCard 110×110 glyphH 38 + ONE capital lane 536×80) · `write:null` (no write rows) · `hunt.minMedial` (face 2, stamped `data-lcs-min-medial`) · `positions:{…}` · `wordHunt:{…}` · `pair:{…}` · `unit:{huntPos, foilPolicy}`.

## The five faces

### K-325 — Words with {U}: Hear It Anywhere — **PARAM**
- **knob:** `hunt:{n:8,hits:4,cols:4,cardW:156,cardH:140,iconPx:100,foilPolicy:'avoid',hitPos:'noninitial',minMedial:2}` (base d2 spread; the row must restate the whole `hunt` object because the spread is shallow).
- **child does:** traces Mm (full zone 1), circles the four pictures whose name carries the M sound NOT at the start (≥ 2 medial + the rest final), foils begin with the confusable `avoid` letters (n/w); writes a row of each. Stamp `data-lcs-scope="anywhere"`.
- **gate:** hits === 4 with `graphemes.indexOf(L) > 0`, foils NFD-free of L and avoid-initial, `medial hits ≥ 2` re-derived; sweep: 20 seeds every page carries ≥ 2 medial hits. Poisons **P7** (an m-INITIAL word "map" stamped as an anywhere hit → `verify()`), **P8** (a bank with no medial m words → the spec REFUSES + bank rule 9).
- **PNG:** `scripts/worksheet-gen/out/dev/K-325-null-d2-en.png` (jam · lamp · camel · hammer hits; net · window · necklace · watch foils). Gate renders `K-325-gate-d2-en{,-us,-ut,-ub,-longchrome}.png`.
- **deviation:** `pickHits` now samples the `minMedial` quota FIRST (the design's verify text "≥ 2 medial" is a page property, the base only checked the pool) — this branch is unreachable on the base (hitPos initial), 0 drift.

### K-326 — Beginning, Middle or End: Where Is the {U}? — **CODE** `positions`
- **knob:** `{...SLIM, positions:{cards:6, cols:2, split:[2,2,2], cardW:323, cardH:180, iconPx:96, boxPx:44, glyphH:30, laneH:42}}`; `mode` defaults to the bank's `positionMode` (en letter; fi syllable per §1), `showWord` = the bank's `showWordInPositions` (en true → the word as a stroke-glyph model above the boxes, never `<text>`).
- **child does:** says the picture, colours the dashed coral box under the `positionKey` pictogram (three cells, one filled) where the M is heard; the letter occurs exactly ONCE in every word (mushroom/hammer excluded), 2 beginning / 2 middle / 2 end shuffled.
- **gate:** each card's `data-lcs-pos` re-derived from `graphemes` (or `data-lcs-split` in syllable mode), letter-once, 2/2/2, boxes empty and 44 ≥ 30 px floor, showWord ⇔ one `trace-word` lane printing the stamped word; sweep: every position lands in 6/6 slots. Poisons **P9** ("map" stamped pos 1 → `verify()`), **P10** ("hammer", m twice → `verify()`), **P14** (box forced to 24 px → the gate's floor; verify + lints blind).
- **PNG:** `scripts/worksheet-gen/out/dev/K-326-null-d2-en.png` (tomato · lamp · mailbox · mountain · worm · broom). Long chrome: 20 px above the footer at the 733 px body.
- **deviation:** measured stack 705 px including the `space-evenly` air (design 688 pure stack); syllable mode is CODE-ready (`positionOf` over `split`, `data-lcs-split` stamped) but exercised only by the validator's capacity count until fi is authored.

### K-327 — Circle the {U} in the Words and Count — **CODE** `wordHunt`
- **knob:** `{...SLIM, wordHunt:{rows:6, capsRows:2, maxLetters:9, occ:[1,2], minTotal:8, iconPx:72, laneW:440, laneH:56, glyphH:40, boxPx:56, gap:10}}`.
- **child does:** six rows picture + the word as a solid stroke-glyph model (same hand as the traced forms) + an `answerBox`; circles every M/m and writes the count; 2 rows in block capitals (`toLocaleUpperCase` then re-`traceable()`, the K-284 lesson). The picker takes enough two-occurrence words to reach `minTotal` (m has exactly two — hammer, mushroom — so 4×1 + 2×2 = 8 is the honest EN ceiling), then fills.
- **gate:** target recounted per row case-insensitively (1..2), `data-lcs-count` and the box's `data-lcs-answer` === the recount, caps rows all-capital and exactly 2, total === stamp ≥ 8, no `<text>`, box 56 ≥ 30. Poison **P11** (count stamp one short + a lower row re-stamped upper → three `verify()` messages).
- **PNG:** `scripts/worksheet-gen/out/dev/K-327-null-d2-en.png` (mask · mitten · HAMMER · MONKEY · arm · mushroom = 8). Long chrome: 23 px above the footer.
- **deviation:** rows are 84 px cards (picture 72 + 4 px padding + 2 px border × 2), not bare 72 px rows — the design's 606 becomes 678 + slack, still ≤ 722 (first cut at 6 px padding left 15 px under the worst chrome; tightened to 4 px).

### G1-311 — Sound of the Week: {L} — **HANDWRITTEN** (CODE knob `unit`)
- **knob:** `{...base.difficulty[2], unit:{huntPos:'any', foilPolicy:'components'}}`; `unitAxis.units = bank.units[].u`, `exemplar = bank.unitExemplar` ('sh'), `tokens → {U:'Sh', L:'sh', UNIT:'sh'}`. `gradeBand:'G1'` (the id band; the landing level per locale comes from `units[].band` — en sh/ch/th `band:'K'`, readiness, no CCSS code).
- **child does:** the base page with the unit: letterCard "Sh", lanes Sh / sh, the hunt = 4 pictures carrying the unit as ONE grapheme (anywhere) + 4 foils carrying s AND h separately with no "sh" substring (horse, house, hose, hamster, whisk, ghost, sleigh, handsaw), write rows Sh / sh.
- **gate:** hit ⇔ `graphemes.includes(unit)`, foil ⇔ no unit grapheme AND no unit substring AND every component letter present; bank rule 11 extended (unit as one grapheme in ≥ 8 items, `pos` = its index, ≥ 6 foils free of the substring, pictures pinned, `upper` ↔ `u`, band ∈ K/G1/G2, ≥ 3 units or `refuse.F5`); an unauthored unit REFUSES. Rendered for sh + ch + th + long chrome. Poison **P12** ("shark" authored s·h → rule 11; "grasshopper" as an sh foil → rule 5(F5); every item split → the spec REFUSES; a "grasshopper" foil card past the spec → `verify()`).
- **PNG:** `scripts/worksheet-gen/out/dev/G1-311-null-d2-en.png` (sh: shovel · shoe · radish · starfish + hamster · ghost · horse · whisk), `G1-311-null-d2-en-uch.png`, `G1-311-null-d2-en-uth.png`.
- **deviations:** (a) the card shows the UPPER form only ("Sh", as the design's "showing Sch"); (b) title `Sound of the Week: {L}` — one unit per deck, so the §6 head "sh, ch, th" belongs to the landing, not the sheet; (c) reps stay 5 for en (measured: 'Sh' 101.5 units × 52/68 = 78 px inside 99 px segments) and the build shrinks reps only when a unit would overlap its own dashed reps ('Sch' 145.5 units → 111 px; card 169, lane 477: 5 reps = 95 px segments overlap, so de gets 3 reps (measured: Sh/Ch/Ei/Au stay at 5)) — a unit-face-only branch, 0 drift; (d) EN `graphemes` mark the digraph as one grapheme and every other letter singly; morpheme-seam words (grasshopper, lighthouse, mishap-class) and non-/tʃ/ ch (architect, chef, mechanic, orchid, yacht) were excluded BY HAND — the en panel still owns the marking (critic item 4); "feather" (voiced th) sits beside voiceless th items (both are the th digraph; K readiness, no code).

### K-328 — M or N? Hear the Difference — **CODE** `pair`
- **knob:** `{...SLIM, pair:{cards:8, cols:4, split:[4,4], cardW:156, cardH:184, iconPx:100, chipPx:48}}`.
- **child does:** 8 pictures, 4 beginning with m + 4 with n (the block's pair-initial foils: nest, nose, nut, net, necklace, nurse, notebook), `letterChips` m | n (fixed order, 48 px white chips, Baloo 2 teal) under each; circles one. The build refuses a pair letter outside `alphabets[loc]`.
- **gate:** `data-lcs-answer` re-derived from `graphemes[0]` (sound) / `word[0]` (letter), 4/4, a b-word never contains a, chips exactly a|b and printing themselves, chip 48 ≥ 30; sweep: each letter lands in 8/8 slots. Validator: ≥ 4 pair-initial foils per letter (a FAIL for the exemplar, a reported DROP for other letters), sound-level pair-initial foils must carry `graphemes` (a digraph onset like de "Schaf" must not read as an s-word). Poisons **P13** ("mask" stamped n + the chips swapped → two `verify()` messages), **P14** (chip forced to 24 px → the gate's floor).
- **PNG:** `scripts/worksheet-gen/out/dev/K-328-null-d2-en.png` (nest · necklace · moon · nose · medal · milk · nurse · mitten). Stack 504 → the page carries visible air with a one-line chrome (the design's own 504 budget; 81 px above the footer under long chrome).
- **deviation:** the EN title names the exemplar pair LITERALLY ("M or N?") — `lib/unit-axis.js` (shared) resolves only `{U}{L}{UNIT}`, so there is no pair token; the wave ships the exemplar only (design: "the wave panel writes the exemplar literally"). A future LETTER fan of K-328 would print "M or N?" on the s page — see open items.

## Gate / distinctness / baseline (final lines)
```
node qa/verify-b3-letter-of-the-week.js
  bank en: exemplar m, letters m:16i/8m/6e/20f s:16i/9m/5e/17f t:16i/8m/8e/19f b:16i/8m/5e/19f, units sh:17/8 ch:17/6 th:12/8
  face capacity en: m[F3 ok 15/7/6 · F4 ok 30w+2 · F6 ok 7] s[F3 ok 14/8/5 · F4 ok 28w+2 · F6 ok 8] t[F3 ok 9/3/8 · F4 ok 31w+11 · F6 ok 7] b[F3 ok 16/6/5 · F4 ok 29w+2 · F6 ok 8]
  render K-325 m/s/t/b · K-326 m/s/t/b · K-327 m/s/t/b · K-328 m/s/t/b · G1-311 sh/ch/th, each + long chrome: verify 0 lints 0
  sweep: hits in 8/8 slots, 20 distinct hit sets
  sweep faces: K-326 positions in 6 · 6 · 6 of 6 slots, K-328 letters in 8 · 8 of 8 slots, K-325 medial hits >= 2
  poison: P1 bank/build/verify · P2 · P3 · P4 · P5 · P6 · P7 · P8 build/bank · P9 · P10 · P11 count/caps/caps-n · P12 bank item/bank foil/build/verify · P13 answer/chips · P14 box/chip — all KILLED
PASS (677 assertions, 14/14 poisons killed)          (--quick: PASS (652 assertions, 14/14 poisons killed, --quick: sweep skipped))

node tools/gate-variation-distinct.js --batch=b3 --diffs=2 --family=letter-of-the-week
[b3:letter-of-the-week] compared 15 pairs over 5 faces against their bases + pairwise within family
every variation differs from the deck its base publishes and from its siblings

node tools/b3-baseline.js --check --quick
checked build 2968 + enum 211 in 21s: 0 drifted (0 expected), 0 missing
PASS

node i18n/build-en.js → build-en: 518 types -> strings.en.json (title lint clean)   (then git checkout -- i18n/strings.en.json)
```

## Renders read (every PNG opened)
`out/dev/K-325-null-d2-en.png` · `K-326-null-d2-en.png` · `K-327-null-d2-en.png` · `K-328-null-d2-en.png` · `G1-311-null-d2-en.png` (+ `-uch`, `-uth`) · the gate's `K-32{5,6,7,8}-gate-d2-en{,-us,-ut,-ub,-longchrome}.png` and `G1-311-gate-d2-en{,-uch,-uth,-longchrome}.png` · contact sheets `K-317-sheet-f5-{sh,ch,th}.png` (every unit item and foil picture opened; dropped after opening: shampoo (a pump bottle), grasshopper (seam s+h), chin/chipmunk (ambiguous), athlete/author/theater/smoothie/thunderstorm (a child names them otherwise), harvest/sphere as foils). Nothing clipped, nothing under the footer, floors hold (icons 100/96/72, boxes 44/56, chips 48), every face does what its title says.

## Per-locale refusals / lowered expectations visible from the bank shape (Phase 4 `hub-expectations.json`)
- **es K-326 (positions):** the design's es exemplar is M, and Spanish has ~no picturable word ENDING in m (álbum) → 2/2/2 cannot fill for m. Not a refusal: pin a different letter for that face with `unitOverrides:{'K-326':'<letter>'}` (the wave knob is per type id), or the es panel picks an exemplar with finals. Same check for any locale whose exemplar has < 2 final items — the validator FAILs the exemplar and reports every other letter's F3/F4/F6 capacity.
- **fi K-326:** letter mode refused by design → `positionMode:'syllable'` (built: `positionOf` over the approved `split`, `data-lcs-split` stamped, letter once per syllable index); capacity is measured by the validator when the fi block lands (refuse below 8 letters per §3).
- **G1-311 units:** de `eu` (7) and sv `sj` (8) refused by design; no `kj/sj` = 2. trinn; da units at 1. klasse or refuse — each locale's `units[].band` drives the landing level; a locale with < 3 units must set `refuse.F5` (validator).
- **K-328 pairs:** es b/v never a pair (validator can't see phonology — panel rule); every pair letter needs ≥ 4 pair-initial FOILS in the letter block (the base's rule 8 asked for 2) — panels must author 4, with `graphemes` on those foils in sound-level locales.
- **fi K-327:** fi "double letter = one unit" (§1) vs circle-and-count counting letters: `lammas` prints two m's the child circles — the fi panel decides whether the count is letters (2) or units (1); the code counts letters (chunk-layer own-grapheme rule applies to de/nl/sv/no only).
- **en:** no refusal; 6 rows.

## Open items
1. **K-328 letter fan needs a pair token** — `lib/unit-axis.js` (shared) resolves `{U}{L}{UNIT}` only; either add `{P}/{PL}` there (one-line `TOKEN_RE` change, shared → reviewer) or make K-328 handwritten with `tokens → {UNIT: pairUpper}` and the title `{U} or {UNIT}?`. Until then the face is correct for the exemplar only.
2. **en F5 grapheme marking** stays the en panel's call (critic item 4): th voiced/voiceless both included; `ch` = /tʃ/ only.
3. **d1/d3 ladders of §3** (F2 d1 `hitPos:'any'`/6 cards, F3 d1 two boxes, F4 d3 three occurrences, F5 d3 near-unit foils, F6 d3 three chips) are NOT built — the emitter ships ONE config for all levels (`difficulty:{1:D,2:D,3:D}`); the knobs would take them (occ/[1,3], split, chips) but no wave asks.
4. **Non-EN banks:** `apply-b3-locale.js` must copy `unitExemplar`, `units[].{u,upper,band,items,foils}` and the six string ids; the validator expects `strings[<faceId>]` for every face.
5. The bank's face strings duplicate the rows' i18n — the gate asserts equality (a drift is a FAIL), so either copy may be edited first but both must move.
