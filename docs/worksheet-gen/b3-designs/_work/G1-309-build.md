# G1-309 `rhyming-words` — BASE build record (2026-09-14)

Built from `G1-309-rhyming-words.md` §2 + §5 under `_BUILD-BRIEF.md` + `_SUBSTRATE.md` + the README cross-type rulings. EN only; the K shape (sv/da/no level key) is implemented and rendered on the EN bank, but a non-EN locale REFUSES (`bank()` throws — measured with a `de` build: "has no de block … refuse, never fall back to en"; gate poison PL).

## Files (all type-scoped; nothing shared edited)

| file | what |
|---|---|
| `scripts/worksheet-gen/types/g1/G1-309-rhyming-words.js` | the spec: `themeAxis:{applicable:false}`, `unitAxis:{applicable:true, units, exemplar, tokens}`, the d1-d3 ladder + `BAND_SHAPE.K`, `build()` (bank + `fileUri` only), `_buildWith()` (the gate's poison / band seam), `verify(page)` |
| `scripts/worksheet-gen/templates/components-b3/rhyming-words.js` | exactly the four NEW names the base consumes: `rhymeMark · anchorTile · choiceRing · rhymeRow` (namespace merge verified: 66 names, no duplicate; the six face components of §2 — `yesNoChips pairCardRhyme rhymeBins coupletCard stringLane ownRhymeCard` — are Phase 2 and stay free) |
| `scripts/worksheet-gen/data/b3/rhyming-words.js` | `RHYMING_WORDS.en` — 35 rhyme classes by SOUND, 92 pictured members, 46 near-miss foils, 10 couplets, the base strings (gitignored; force-add) |
| `scripts/worksheet-gen/qa/verify-b3-rhyming-words.js` | the gate (`--quick` skips the 20-seed sweep) |
| `scripts/worksheet-gen/out/dev/G1-309-*.png` | renders + the three picture contact sheets (below) |

Design §5 names the bank `data/b3/rhymes.js` and the gate `qa/verify-b3-rhymes.js`; the brief's `data/b3/<key>.js` / `verify-b3-<key>.js` rule wins, so both carry the family key (`bank('rhyming-words', loc)`).

## What was built (the page)

`cardGrid({cols:1, rows, numbered})` of cream rows. Each row = `rhymeRow`: `[margin 20 (badge clearance)] anchorTile (white, teal 2 solid, r12, picture) · 10 · rhymeMark (three teal arcs, 20×24, aria-hidden) · 10 · choices (choiceRing × N: white disc, T.grid 1.5 DASHED ring = the circle target, picture) · ≥14 · writingRow lane (x-height school lines)` — one flex row, vertically centred, the lane flush right (`margin-left:auto`) so the card's slack opens between the rings and the lane, never inside the ring group. `.ws-card-stage` padding overridden to 0 (its default `6px 4px` ate 8 px of the 647 budget). d1's lane is a one-row `rulingBlock` printing the FIRST GLYPH of the answer in inkSoft (`data-lcs-starter`, the design's d1 scaffold); nothing else is ever printed — the written word is a picture's name.

**Stamps.** Root `[data-lcs-rhyming]` with the resolved config (`rows · choices · min-icon · lane-w · lane-h · glyph-h · starter · near-miss · pos-max · band`, `data-lcs-unit` only when a unit is configured — the base is byte-identical); row stage `.ws-card-stage[data-ws-content][data-lcs-anchor][data-lcs-class][data-lcs-anchor-word]`; ring `[data-lcs-choice][data-lcs-class][data-lcs-word][data-lcs-rhyme="1|0"]` (+ `data-lcs-foil="1"` at d3); the lane carries nothing. `meta.answers` = the partner words (bank citation form = `displayWord`-cased).

**Ladder as built (resolved config; guards key on it, never the level):**

| key | d1 | d2 (ships) | d3 |
|---|---|---|---|
| rows / choices / numbered | 5 / 2 / true | 6 / 3 / true | 7 / 4 / true |
| anchorTile / pic | 100 / 84 | 76 / 64 | 60 / 50 |
| choiceTile / pic | 88 / 72 | 76 / 60 | 56 / 46 |
| laneW / laneH / glyphH | 287 / 72 / 32 | 240 / 64 / 28 | 245 / 56 / 26 |
| starter / nearMiss / maxLetters | first glyph / false / 9 | none / false / 10 | none / true (one foil per row) / 11 |
| row width (badge 20 + tiles + gaps + lane) | **647** | **638** | **633** |
| K shape (sv da no; merged last) | 4 rows · 2 choices · no badge · 120/100 · 96/80 · lane 271×88 g44 · maxLetters 6 | 5 rows · 3 · 100/84 · 80/64 · 233×80 g40 · 7 (design) | 6 rows · 4 · **76/62** · 64/56 · 227×72 g40 · 6 |

**Sampling (build).** Eligible anchor classes = ≥ 2 WRITABLE members (`sameSpelling:true` where `orthographyTrusted:false`, `/^[\p{L}\-']+$/u`, ≤ maxLetters) + ≥ 1 near-miss at d3. Class set: no unit → the bank's `exemplar` (`at og un ar ee oat`) — d2 exactly, d1 its first five, d3 the six + one sampled; unit → `[unit] + (rows−1)` sampled. Rows shuffled. Per attempt: the rhyming pair per row from the unused writable members → (d3) the foil per row, preferring the ANCHOR's onset (cat → cap; when only the partner's onset matches, the pair swaps roles) → distractors: unused members of OTHER classes, from distinct classes, never a near-miss of the anchor's class at d1/d2 (a chance near-miss would make d2 a de-facto d3); every word once per page. An attempt that cannot complete returns null; the non-fixed classes and the picks are re-sampled up to 40 times under the seed, then the page REFUSES — never a filler. Rhyme position re-rolled until every slot is used 1..`ceil(rows/choices)+1` times (d2 = 1..3 as designed).

## Measured (not assumed)

- **Contact sheets** (`out/dev/G1-309-pictures-sheet-{1,2,3}.png`, 309 cells = every cached colour picture of every candidate word + foil; `G1-309-pictures-zoom.png` = 20 doubtful ones at 220 px). Rulings are the gate's `OPENED` table (198 accepted refs, 35 refused). Dropped for the PICTURE, not the sound: knee (a bent leg) · hair (a girl's face with an arrow) · rain (a smiling cloud) · trail / lake (landscapes) · ice (an ice sheet) · rice (a carton) · quail / stork / dove ("a bird") · cook (a chef) · ox ("a cow") · lip (lips, plural) · blouse ("a shirt") · tart ("a pie") · jet ("a plane") · fig · chess (a king piece) · heel (a foot) · scale · lamb (reads as sheep, an -eep member) · toad (reads as frog) · pilot (a plane) · crocus / bud (flowers) · ribbon (a bow) · sack ("a bag") · cape · neck · heater · bull. Pinned away from the wrong file: `kitchen tools/pan` (a lidded pot → `around the house/pan`), `around the house/rug` (a polka-dot frame → `furniture/rug`), `birds 2/crane` (the bird → `vehicles/crane`, both "crane" in en), `body parts/heart` (anatomical → `shapes/heart`), `tools/nail` (not the fingernail). **`christmas/tree` is the library's ONLY `tree`** (a decorated Christmas tree; K-232 ships the same file for bee/tree; kept — "tree" / "Christmas tree" both end in /triː/ — and flagged here).
- **Bank vs the design's census.** Design (orthographic draft, m): 52 / 14 / 3 classes ≥ 2 / ≥ 3 / ≥ 4, 122 words. Authored by SOUND after the picture rulings: **35 / 16 / 6 classes, 92 pictured members** (`node`: every member is an `entriesFor` entry of its pinned theme, `word === displayWord`, in `approved-words-en.json` with the same spelling, `traceable()`; 0 bad). Sound merges the draft's spelling classes: `-ed` + `-ead` (bed sled bread head), `-ain` + crane, `-ail` + whale, `-ee` + key, `-ear` = pear bear chair (not `ear`), `-um` + thumb, `-ie` + eye; the draft's `swan` (/swɑn/) and `wand` (/wɑnd/) leave `-an` / `-and`; colour and other adjectives (red pink blue hot gray black brown us) never enter. All 8 K-232 pairs land in one class each (rule 8): at og un ar ee oat ed ag. `-eg` keeps egg (sameSpelling:false — "egg" does not end in "eg") + leg, so it supplies distractors but cannot anchor a write row.
- **Near-miss foils:** 46 over 29 classes (`-ake -ing -amp -irt -ool -ate` have none → those six units refuse at d3 only, legal). Every foil is pictured, opened, not in its class, and its owner class never shares the sound.
- **Row widths** (design: 638 ≤ 647 at d2): d1 647 (the lane lands flush on the card box with 0 px to spare — gap ring→lane exactly the 14 px minimum), d2 638 (gap 23), d3 633 (gap 28); K 647 / 647 / 643 (gaps 14 / 14 / 18). verify() asserts every slot inside the card's content box (`.ws-card` is `overflow:hidden`, so an over-wide row is CLIPPED silently — poison PC proves the check fires).
- **Body / stack at the chrome floors:** the real EN strings give body **766** (2-line title + 2-line instruction). A 70-char de or fi title + a 150-char instruction (3-line title + 2-line instruction) give body **733**, head 112 (K-319 / G1-307 measured the same; the README's 722 needs a 3-line INSTRUCTION, which no legal 150-char string produced — a 67-char fi title of long compounds also wraps to three). Card inner at 733: d1 107 / d2 83 / d3 65 (K 145 / 107 / 83) — every stack fits, lints clean, verify clean. At the README's 722 by arithmetic: G1 d3 inner 63 ≥ anchor 60; K d3 inner 80 ≥ 76 (the reason the K d3 anchor is 76/62, deviation 5).
- **Floors (MEASURED on every render):** G1 pictures 72 / 60 / 46 ≥ 44, glyphH 32 / 28 / 26 ≥ 26; K pictures 80 / 64 / 56 ≥ 56, glyphH 44 / 40 / 40 ≥ 40. Smallest printed text = the d1 starter at `0.78·32 = 25 px`.
- **Sweep (20 seeds × d1-3):** 20 / 20 / 20 distinct pages, 15 / 19 / 20 distinct position patterns, 0 repeated words, 0 repeated classes, exemplar set on every no-unit page; K shape 60/60 builds; units buildable 96 / 102 (34 units × 3 levels; the 6 d3 refusals above).
- **Answer-hiding:** verify walks every text node of the root — no node equals a stamped word (case-folded); the only text on a row is the d1 starter glyph.

## Deviations from the design file (each with the reason)

1. **Bank / gate file names** carry the family key (`rhyming-words`), not `rhymes` — the brief's `data/b3/<key>.js` + `bank('<key>', loc)` contract.
2. **`nearMiss` entries are member-shaped objects** `{vocabKey, word, pic, picOpened}`, not bare keys: the page may never read `image-vocabulary.js` at render, and a foil needs a word (answer key, the no-text-equals-a-word check) and a picture. A foil stamps its owner class or `''` when it is a member of no class; verify treats `''` as unique.
3. **Write-face pairing = `sameSpelling:true` only for the anchor + partner** (config `sameSpellingOnly:true` on all three levels; the base is a write face per §1). Distractors — never written, never rhyming — may be any member. §4's "write faces use sameSpelling:true members only" is read as "the pair the child writes from"; a sameSpelling:false member as a plain distractor is harmless and keeps `key`, `bread`, `whale`, `chair`, `thumb`, `eye`, `crane`, `head`, `egg` in the pool. Poison PW proves the pair never draws `key` for `bee` over 20 seeds and that the node cross-check fails a page that does.
4. **Plain distractors exclude the anchor class's near-miss keys at every level** (design says nearMiss only at d3; without this rule a random distractor could be one). Poison PN.
5. **K shape d1 / d3 derived** (the design gives d2 only: rows 5, 100/84, 80/64, lane 233×80 g40, maxLetters 7, numbered false — kept verbatim): d1 4 rows, 120/100, 96/80, lane 271×88 g44, maxLetters 6; d3 6 rows, **anchor 76/62** (not 80), rings 64/56, lane 227×72 g40, maxLetters 6 — 76 so the row still fits a 722 body ((722−70)/6 − 28 = 80 inner; 80 would leave 0 px). K rows 4/5/6 = the design's `BAND_SHAPE.K` row ladder.
6. **d3 foil prefers the anchor's onset** and swaps the pair's roles when only the partner's onset matches — the class-level `nearMiss` list (design) is a pool; a `lock` foil beside a `dog` anchor is a vowel-only near miss, `doll` is the real one.
7. **d1 has 5 rows** (design ladder) although the G1 density table says items [6,12]; the design trades a row for 100-px anchors (6 rows × 128 = 838 > 814). The guard is rows 4..12 (K needs 4); recorded, not changed.
8. **Rhyme-position cap generalised** to `ceil(rows/choices)+1` (design states "≥ 1 and ≤ 3" for d2 only): d1 1..4, d2 1..3, d3 1..3; K 1..3 / 1..3 / 1..3.
9. **fi rule 6** is implemented as "the class rime = the last ONE or TWO syllables of the approved `split`, on a boundary" — the design's literal "the last two syllables of the split, identical" makes every 2-syllable word (`ta-lo`, `pa-lo`) unusable. OPEN for the fi panel (see below). Poison P7 (a fi rime off the boundary) fails.
10. **P8** ("F1 non-rhyming pair drawn from one class") is Phase 2; the base analogue — two distractors of one row from ONE class, which "read as a pair" (design §2) — is the poison here, and it fails in `verify()`.
11. **The node gate `tools/gate-rhyming-data.js`** of §2 is folded into the qa gate as `crossCheck` (the G1-307 precedent), plus the design's bank validator as `validateBank` (rules 1-11, exported for `tools/validate-b3-draft.js`).
12. **Every bank picture is resolved BEFORE any draw** (member + foil): poison P2 (`lynx`, unpictured) was SILENT while pictures resolved lazily on the rows that drew them; a locale bank with one dead picture now refuses every page.
13. **`unitAxis.exemplar(loc)` returns `bank.exemplar[0]`** (a string, the unit-axis contract); the exemplar SET is `bank.exemplar`. `units(loc)` = every class with ≥ 2 writable members in bank order (34 in en); `tokens` = the class rime (`-ock`) for `{U}{L}{UNIT}` (no token in the base strings; the landing may use it).
14. **Ten EN couplets authored now** (F3 is Phase 2): the shape is concrete for the panels and the gate's rule 9 (blank once, answer never printed, `rhymeWith` in the class, 45 / 40 caps) runs on real data. Poison P4.
15. **Title wraps to two lines** ("Write" alone) in the ~375 px title column — legal (three-line titles are budgeted); left as the design's genre head.

## Gate

```
node qa/verify-b3-rhyming-words.js
PASS (1800 assertions, 23/23 poisons killed)
node qa/verify-b3-rhyming-words.js --quick
PASS (1377 assertions, 23/23 poisons killed)
```

Instruments: `validateBank` (rules 1-11 + the OPENED record) · real pipeline renders (`render/render-instance.js`) d1/d2/d3 en · d1-3 under de + fi 70/150 chrome · d1-3 under a 3-line en title · d1-3 under a fi long-compound title · K shape d1-3 (+ under the fi title) · units `ock`/d2 + `oon`/d3 — each: `verify()` empty, `qa/lints.js` clean (incl. the visible-"free" lint), floors measured (44 / 56, glyphH 26 / 40), rows === config, lane === config, every row slot inside its card box and above the footer band, band stamp, node cross-check (stamps verbatim vs the bank, foils in nearMiss, the pair writable, no near-miss as a plain distractor, the unit on the page) · 20-seed sweep · unitAxis reads the bank.

**Poisons killed (23/23; the correct EN bank is the control on every instrument):** P1 a distractor from the anchor's own class (verify "2 rings of the anchor's class" + the gate) · P2 `lynx` unpictured (bank rule 1 + build refusal) · P3 `dog` in -og and -ock (rule 3 + the spec refuses) · P4 a couplet printing its answer · P5 a `zoo animals bw` picture (rule 2 + build refusal + verify on the rendered src) · P6 bee/tree split across two classes (rule 8) · P7 a fi rime off the split boundary (synthetic fi block) · P8 two distractors of one row from one class · P9 da title "Rim og ramser" (synthetic da block) · P10 a fixed 760-px stack under the 3-line chrome → the footer lint · P11 the word `cat` under two vocabKeys in one class · PA the rhyming word printed on the page · PP every rhyme in slot 1 · PS a d1 starter ≠ the answer's first glyph · PF a d3 foil outside the anchor's nearMiss (node; verify is bank-blind by design) · PN a plain d2 distractor that is a near-miss · PW `key` written for `bee` (node) + the spec never draws it · PU a unit that anchors no row + an unknown unit · PC a 320-px lane (guard 718 > 647; verify + gate "outside the card box") · PI a 36-px picture (guard + verify + gate floor) · PD rows < choices + an exemplar naming a class twice · PX an exemplar class with one writable member (bank rule 11 + build refusal) · PL an unauthored locale refuses.

## Renders (looked at, every one)

`scripts/worksheet-gen/out/dev/`: `G1-309-null-d1-en.png` · `G1-309-null-d2-en.png` · `G1-309-null-d3-en.png`; gate renders `G1-309-gate-d{1,2,3}-en.png`, `-longchrome-de`, `-longchrome-fi`, `-threeline`, `-fititle`, `-Kshape`, `-Kshape-fititle`, `G1-309-gate-d2-en-uock.png`, `G1-309-gate-d3-en-uoon.png`; contact sheets `G1-309-pictures-sheet-{1,2,3}.png`, `G1-309-pictures-zoom.png`. Fixes made from looking: the d3 foil pool was exhausted by a sampled `-art` pair (`cart`, the only `-ar` foil) → the attempt/retry structure; `lock` beside `dog` → the onset-preferring foil; the picture rulings above.

## Open items for the faces / panels

- **fi rhyme rule (§4 / §5 rule 6):** the panel must state `loppusointu` for the bank: the literal "last two syllables identical" cannot be met by the 2-syllable words the K-1 pool is made of; the gate currently accepts a rime that is the last 1-2 syllables on a split boundary (`ta-lo` → `-lo` or `-talo`), same vowel length is the panel's call.
- **`-ear` rime label** (pear bear chair, sound ɛr): the label follows the majority spelling; the sound field is authoritative. Panels author `rime` as the spelling their children see and `sound` as IPA.
- **K locales (sv da no):** maxLetters 6 / 7 / 6 — the panel's writable pair members must be ≤ 7 glyphs at d2 (≤ 6 at d1/d3); `tree`-class pictures: every panel opens its own (the `christmas/tree` ruling is en's).
- **d3 needs a near-miss per anchor class**: a class without `nearMiss` cannot anchor at d3 (6 en classes) — panels author ≥ 1 per class where a pictured onset+vowel neighbour exists, else the class ships at d1/d2 only.
- **Couplets (F3):** ≥ 8 per locale, line 1 ≤ 45 ends in the printed partner, line 2 ≤ 40 before the one `___`, answer never printed — the en 10 are the source to audit.
- **Faces (Phase 2):** the six face components are unwritten; `strings` carries only `G1-309`; `data-lcs-mode` is never stamped on the base.
- The design's `tools/validate-b3-draft.js` rhymes block = `validateBank` here (exported); `tools/apply-b3-locale.js` is the batch's shared tool.

## Baseline

```
node tools/b3-baseline.js --check --quick
checked build 2820 + enum 200 in 16s: 11 drifted (0 expected), 0 missing
```
The 11 drifts are the legacy `wave:wave-001..011` enum lines (ignored per the brief); **build section: 0 drift on 2,820 hashes** — nothing shared was touched. `node i18n/build-en.js` → "494 types … (title lint clean)"; `strings.en.json` restored with `git checkout --`.
