# K-320 `ordinal-numbers` : the FIVE variation faces (Phase 2, 2026-09-14)

Built from `K-320-ordinal-numbers.md` §3 + §5 under `_FACE-BRIEF.md`, on the base of `_work/K-320-build.md`. Ids from `_records/b3var-id-allocation.json`. Nothing shared was edited; nothing was committed.

## Files

| file | what |
|---|---|
| `scripts/worksheet-gen/tools/b3var-rows/ordinal-numbers.js` | NEW: the five rows (+ `HANDWRITTEN: []`) |
| `scripts/worksheet-gen/types/g1/G1-315-ordinal-numbers-write.js` · `G1-316-ordinal-numbers-words.js` · `G1-317-ordinal-numbers-which-place.js` · `G1-318-ordinal-numbers-race.js` · `types/k/K-336-ordinal-numbers-either-end.js` | emitted by `node tools/gen-b3var-specs.js` |
| `scripts/worksheet-gen/types/k/K-320-ordinal-numbers.js` | the additive `layout` knob (`'write' \| 'words' \| 'where' \| 'race'`): `_buildWith` dispatches to `buildFace()` BEFORE the base path, so a config without `layout` is byte-identical; `verify(page)` branches on `data-lcs-face` (stamped only by the faces); the base branch is the shipped code with the strip/tile checks factored into `checkStrip()` |
| `scripts/worksheet-gen/templates/components-b3/ordinal-numbers.js` | additive only: `lineUpStrip` gains `answers[]` (+ `data-lcs-box="<idx>"` on every cell, stamped only when `answers` is passed); `lineUpPanel` gains `justify` (default `space-between`); `raceLane` gains `mirror`; `queryCell` width = its parts (188, was a fixed 180 its content overflowed). `blankNumeralBox` untouched. The two exports other families consume (`lineUpStrip` via G1-308's alias, `blankNumeralBox` via all-about-me + hundreds-chart-puzzles) render byte-identically for every existing call — `b3-baseline --check --quick` PASS below is the proof. |
| `scripts/worksheet-gen/data/b3/ordinals.js` | EN block gains `lookalikes` (per fan theme), `racers`, `facing`, `noRace`; F1 title changed (deviation 1) |
| `scripts/worksheet-gen/qa/verify-b3-ordinal-numbers.js` | section E (faces) + 21 face poisons; the 4 base-deferred poisons now counted |

## The five faces

| face | id | dir | kind | knob / override | what the child does |
|---|---|---|---|---|---|
| F1 | **G1-315** | g1 | CODE | `layout:'write'` + `{strips:3, n:8, tile:76, pic:60, gap:5, given:4, blank:4}` | 3 strips of 8 pictures; under every tile a numeral cell — 4 solid cells print the notation (1st … the pattern to copy), 4 dashed cells are open; the child writes the missing ordinals counting from the flag. Position 1 always given, never 4 blanks in a row, the blank set differs per strip (12 writes = the G1 cap). |
| F2 | **G1-316** | g1 | CODE | `layout:'words'` + `{strips:2, n:8, tile:76, pic:60, gap:5, words:5}` | 2 strips of 8; under each, a bank row of 5 ordinal-WORD chips (first … eighth) in a shuffled order that is never the position order; the child draws a line from each word up to the picture in that place (10 lines). Chip size = the bank's `wordPx` (22; fr/fi 20). |
| F3 | **G1-317** | g1 | CODE | `layout:'where'` + `{strips:3, n:8, tile:76, pic:64, gap:5, queries:2, clone:56}` | 3 strips of 8; under each, two `[clone 56][arrow][box]` queries; the child finds the pictured noun in its line and writes its place (6 writes). The strip is built so no two nouns of one `lookalikes` group share a strip (the base record's open item 1). |
| F4 | **K-336** | k | PARAM | `{...base.difficulty[2], start:'mixed'}` | the base page; on some strips the flag stands at the RIGHT edge with the arrow pointing left (every page has >= 1 left and >= 1 right); the child must read the flag before counting. No new code. |
| F5 | **G1-318** | g1 | CODE | `layout:'race'` + `{lanes:6, sep:44, pic:64, rowH:96, laneW:543, step:88, jitter:12, x0:26}`; extra `themeAxis.only` = the racer list | 6 white lanes, a runner per lane at a distinct distance from a chequered finish on the right (dashed trail behind it); the child writes 1st … 6th by distance (nearest = 1st). Theme must be a `racer` (fan set minus fruits, toys); left-facing art is mirrored per the bank's `facing` table. |

All four G1 faces carry `extra {gradeBand:'G1'}` (the base is K; `qa/lints.js` + `emit/manifest.js` read it). EN title/instruction of every face = the bank's `strings.F1..F5` verbatim (the gate asserts one source).

## Renders (looked at, every one, lints + verify clean)

`scripts/worksheet-gen/out/dev/`:
- `G1-315-animals-d2-en.png` (+ `G1-315-toys-d2-en.png`) — three strips, 8 white tiles at 60, the arrow row, 4 solid + 4 dashed cells per strip centred under their tiles; 1st always solid; blank sets 3/4/5/7, 3/5/6/8, 2/4/5/6 on the exemplar seed; no clipping, nothing under the footer.
- `G1-316-animals-d2-en.png` (+ `G1-316-birds 2-d2-en.png`) — two strips, five word chips (h 44, Baloo 22) in a shuffled order at the bottom of each panel, a tall empty zone between strip and chips for the lines (>= 60 by construction; ~200 on the shipped 2-line chrome).
- `G1-317-animals-d2-en.png` (+ `-vehicles-`, `-fruits-`) — three strips at pic 64, two clone+arrow+box queries per strip (clone 56 on a 68 white cell, box 72x44); fruits strips carry ONE orange-round and ONE red-round fruit each (the lookalike ban holds); vehicles never seat boat+ship+ferry / car+jeep / airplane+jet together.
- `K-336-animals-d2-en.png` — the base page with flags left / right / right on the exemplar seed; the right-flag arrow points left, the chips read 1st/5th · 6th/7th · 3rd/4th.
- `G1-318-<theme>-d2-en.png` for all 8 racers — every runner heads for the finish after the facing table (horse / camel / fish / hippo / dinosaurs / submarine / motorcycle / ambulance were drawn facing LEFT in the library and are mirrored; duck, chick, bicycle, bulldozer, forklift, rocket, yacht, right-facing birds and forest insects are not). Six lanes h ~120 on the shipped chrome (min 96), finish chequer per lane aligned into one line, box 72x44.
- gate renders under `out/dev/k320-gate/` (`<id>-<theme>-d2-en`, `-longchrome` 733, `-worstchrome` 710, `-seedN`, `K-320-poison-*`).

## Deviations from §3 (each measured)

1. **F1 title "Write the Ordinal Numbers 1st to 10th" -> "Write the Missing Ordinal Numbers"** (bank `strings.F1.title` + the row). The shipped d2 page has 8 tiles, so it reaches 8th; only the design's d3 (2 x 10, not shipped — the waves ship d2 only) reaches 10th. A title promising 1st..10th over a sheet that stops at 8th is the "title overclaims the sheet" defect; the instruction and meta MIDDLE are unchanged. The SEO plan's "1st to 10th" query face (§6) is a landing decision for Phase 4 — either honest with a 10-tile face or dropped.
2. **Panel minima carry the measured 24 px arrow row** (base deviation 2): F1 **176** (design 174), F2 **232** (228), F3 **208** (204). Stacks 552 / 476 / 648 fit the WORST body 710 (gate-rendered at 733 and 710 for every face).
3. **`queryCell` is 188 wide, not 180.** The design's sum `[pic 56 on white 68][12][arrow 24][12][answerBox 72]` is 188; the shipped component fixed `width:180px` and its answer box overflowed the cell by 8 px. Width now derives from the parts; the gate asserts every query part sits inside its cell. Two queries + gap 40 = 416 <= 647.
4. **F5 runner geometry re-based to the lane.** The design's "6-slot grid over 60..500 (step 88) +-12" put a 64 px runner's right edge at 576 on a 543 lane. `x` = the runner's LEFT edge on slots `26 + i*88` (i 0..5) +-12 -> left in [14, 478], right edge <= 542 <= 543; pairwise >= 88 - 24 = 64 >= sep 44 (asserted at build and in verify). The dashed trail runs 6..x BEHIND the runner (where it came from); the empty lane ahead is the distance the child reads.
5. **F5 finish = one 16 px chequer per lane row** (the six align into one line across the 8 px gaps) rather than one strip spanning the grid — rows are separate white cards, so a spanning strip would need a second layer; verify asserts exactly one `[data-lcs-finish]` per lane.
6. **F5 facing table authored** (design: "an additive mirror knob added only where needed"). Read off every racer picture (ten labelled montages of the fan pools, all opened): most side-view art in this library looks LEFT, so each racer theme carries `default:'left'` (mirror) + the right-facers by name (+ `front` where the mirror is moot). `noRace: {vehicles:['taxi']}` — the TAXI sign would print backwards. A mirrored ambulance keeps a symmetric cross.
7. **F5 theme allowlist is a build refusal, not an enumerator filter.** `enumerate.js eligibleThemes` has no per-spec allowlist (measured), so `themeAxis.only` on G1-318 is informational: the wave must `themeOverrides['G1-318'] = <racer>`; an unpinned round-robin onto fruits/toys THROWS `not a racer` (P26) and `cli.js` will substitute an alternative eligible theme for an UNPINNED slot — that alternative may itself be fruits/toys, so pin.
8. **F2 config key is `strips`, not `blocks`** (one guard vocabulary across the faces); `wordPx` is read from the BANK (a locale property the validator measures), not from the row.
9. **F3 lookalike table** (base record open item 1) lives in the bank (`lookalikes.<theme>`), noun-keyed, language-independent — the panels do not touch it. Groups from the montage read: animals jaguar+leopard · antelope+reindeer · cat+tiger · dolphin+whale; zoo antelope+gazelle+reindeer · jaguar+leopard+cheetah · chimpanzee+gorilla · monkey+orangutan · meerkat+otter · tiger+hyena; farm chicken+hen · chick+duckling+duck · calf+cow · foal+horse · lamb+sheep · bull+ox; pets fish+goldfish · gecko+iguana · hamster+gerbil+mouse · tortoise+turtle · cockatiel+finch; vehicles boat+ship+ferry · car+jeep · airplane+jet · bulldozer+excavator+crane · truck+van; toys doll+girl · dice+domino · blocks+lego · airplane+helicopter · train+truck; dinosaurs argentinosaurus+brontosaurus · diplodocus+therizinosaurus · maiasaura+parasaurolophus · carnotaurus+deinonychus+mosasaurus; birds 2 chicken+hen · crane+seagull · goose+swan · canary+finch · swallow+sparrow+magpie · robin+quail · macaw+parrot; forest chipmunk+squirrel · frog+toad · hedgehog+porcupine · bear+beaver · gopher+weasel · snail+slug · deer+moose · eagle+hawk · ant+spider; fruits the 7 orange-round · the 5 red-round · lemon+lime · blackberry+raspberry. Only F3 reads it (the base / F1 / F2 / F4 / F5 count positions or distances).
10. **F2 line zone is the panel slack** (design: "at 722 the line zone takes the slack"): `lineUpPanel` space-between with min 232 => the zone is >= 60 at the worst chrome and ~200 on the shipped 2-line chrome. Recorded, not a defect: the lines from 5 chips to 8 tiles need the height to stay distinguishable.

## Per-locale refusals visible from the bank shape (Phase 4 lowers `hub-expectations.json` explicitly)

- **None measured today.** Notation + words are panel literals in all 11; no picture noun is printed by any face; every fan theme holds >= 19 safe nouns per locale (base gate B); F3's lookalike walk needs 8 group-free nouns per strip — the tightest fan theme is fruits (28 nouns, 2 big groups: 28 - 7 - 5 + 2 = 18 seatable >= 8) and the ban is noun-keyed, so it holds in every locale.
- **F2 fr / fi at 20 px, not a refusal:** measured in the real font, worst 5-of-8 row (k <= 8): en 505.8 @22; fi 659.6 @22 > 647 -> 615.6 @20 (design (m) 660 / 616 — reproduced). The validator sets `wordPx:20` for fr/fi; the gate FAILS a fi block left at 22 (P17) and asserts the row <= 647 for every block present.
- **F1 under `genderPolicy:'noun'`** (a panel option for es/pt/it only): every position's numeral takes the tile noun's vocab gender via `notationF`; a block that sets `'noun'` without the full `notationF` is refused by the bank check AND at build (`ordinalFor` throws on a missing feminine). Default `'position'` everywhere.
- **F5 theme pinning** (deviation 7): a wave that does not pin a racer for G1-318 has a per-locale chance of a fruits/toys round-robin -> refusal + cli substitution. Pin in every locale's wave file.
- **de `capital:true`** (der Erste): F2 chips print the bank word as authored (the gate's lowercase check is lifted only with `capital:true`); the panel decides the citation form.

## Open items for the panels / Phase 4

1. Non-EN blocks: `words` x10 (+ `f`), `notation`/`notationF`, `where.label`, `wordPx` (22 or the validator's 20), six `strings` — and the panel audits the EN `strings` as the SOURCE (relation-word rule in THEIR language; F4's "either end" copy is the trap).
2. `hub-expectations.json`: 6 rows x 11 = 66 stays unless a panel refuses; the landing for F1 should not claim "1st to 10th" (deviation 1).
3. `tools/validate-b3-draft.js` (absent, m): must carry the gate's bank rules incl. the Phase-2 tables (lookalikes nouns in pool / racers ⊂ fan minus fruits+toys / facing values / noRace) and the rendered worst-row measurement (`worstWordRow` is exported from the gate for it).
4. Reviewer merge: `lineUpStrip`/`pictureStrip` and `blankNumeralBox` single-owner (base record open item 2) — both extended additively here; no other family's output changes (baseline PASS).
5. `G1-318` wave file: `themeOverrides` per locale = a racer; do not rely on the cli retry.

## Gate output

Quick (`node qa/verify-b3-ordinal-numbers.js --quick`, 6 seeds, 3 fan themes for F1/F2/F4, exemplar + vehicles + fruits for F3, all 8 racers for F5, LONG 733 + WORST 710 chrome per face):
```
K-320 gate (base + 5 faces): PASS (6431 assertions, 44/44 poisons killed)
```
Full (20 seeds, 10 fan themes; `node qa/verify-b3-ordinal-numbers.js`):
```
K-320 gate (base + 5 faces): PASS (16077 assertions, 44/44 poisons killed)
```
Poisons killed 44/44: the base's 23 + P5 F5 30 px apart · P11 F1 position 1 blank · P11b blank:7 refused at build · P11c given literal "3." (the page check passes — carries 3 — only the bank check catches it) · P11d a blank prints its answer · P12 F3 query noun absent · P12b jaguar+leopard in one strip · P12c clone src != tile · P17 fi at 22 px (659.6 > 647; 615.6 at 20 = the control) · P22 chips in position order · P23 chip inside a tile · P24 chip text != bank · P25 rank answers swapped · P26 fruits refused · P27 left-facing art unmirrored · P28 runner drawn 40 px off its stamp · P29 K-336 all flags left · P30 G1 pictures at 40 · P31 lookalike noun unknown · P32 fruits as racer · P33 facing "up".

Distinctness (`node tools/gate-variation-distinct.js --batch=b3 --diffs=2 --family=ordinal-numbers`):
```
[b3:ordinal-numbers] compared 15 pairs over 5 faces against their bases + pairwise within family
every variation differs from the deck its base publishes and from its siblings
```
Baseline (`node tools/b3-baseline.js --check --quick`, after every edit incl. the component file):
```
checked build 2968 + enum 211 in 16s: 0 drifted (0 expected), 0 missing
PASS
```
`node i18n/build-en.js` -> `build-en: 518 types (title lint clean)`; `i18n/strings.en.json` restored with `git checkout --`.
