# K-322 `seasons` — BASE build record (2026-09-14)

Built from `K-322-seasons.md` §2 + §5 under `_BUILD-BRIEF.md`, the README cross-type rulings (themeless picture refs, body 722, `coordinate.mode:'base'`) and `_SUBSTRATE.md`. Nothing shared was edited; nothing committed. Every number below is measured (node against the real files, or puppeteer through `render/render-instance.js` with the shell's `file://` fonts).

## Files written (all type-scoped)
| file | what |
|---|---|
| `scripts/worksheet-gen/types/k/K-322-seasons.js` | the spec: `themeAxis:{applicable:false}`, no `unitAxis`, `difficulty{1,2,3}` as a CONFIG (`perBin, rowLen, tile, iconPx, cols, maxAlignedPerRow, allowWeak, writeNames, binH, namePx, rowGap`), `build()` → `_buildWith({neutral, block}, …)` (the gate's poison seam; `build()` passes `bankModule('seasons').neutral` + `b3-common.bank('seasons', loc)`), `_pool()` (override > veto > weak filter), `verify(page)` re-deriving bins / counts / (a)-(c) / dots / icon floor / BW marker / picture = noun from the stamps and geometry |
| `scripts/worksheet-gen/templates/components-b3/seasons.js` | NEW `seasonIcon({season, px})` (token-only SVG, viewBox 64, `aria-hidden`, `data-lcs-icon`), `markerTile({theme, noun, src, season, px, tile, dot})`, `seasonBin({key, name, w, h, iconPx, namePx, writeLane})`, `seasonSortStage({top, bins, bottom, tile, rowGap, cols})`. The face components the design names (`markerRow seasonChoiceRow oddRow seasonLegend monthTile modelBank`, primitives `season-wheel.js` / `bare-tree.js`) are NOT built — Phase 2, nothing on the base consumes them |
| `scripts/worksheet-gen/data/b3/seasons.js` | the bank (gitignored — reviewer force-adds): `SEASONS = { neutral:{keys, icons:'glyph', pools{winter 8, spring 7, summer 10, autumn 8}, monthSeasonNorth, k207}, en:{names, alt, model, cycleStart, cycle, monthSeason, veto, override:{}, legend, faces, strings:{'K-322'}, strand} }` |
| `scripts/worksheet-gen/qa/verify-b3-seasons.js` | the gate (neutral + per-locale validator rules 1-8, real-pipeline renders d1/d2/d3 + two long-chrome renders, K floors, node gate, 20-seed sweep, 16 poisons); exports `validateNeutral`, `validateBlock` |
| `docs/worksheet-gen/b3-designs/_work/K-322-build.md` | this record |

`node i18n/build-en.js` → `build-en: 486 types -> strings.en.json (title lint clean)`; the committed `i18n/strings.en.json` was then restored with `git checkout --` (twice — a parallel builder re-generated it mid-session; the reviewer regenerates once at the end).

## Pictures — every pooled ref OPENED (contact sheets `out/dev/K-322-sheet-{winter,spring,summer,autumn}.png`, 120 px tiles)
| season | kept (what the picture shows) | seen but NOT pooled |
|---|---|---|
| winter 8 | snowman (top hat, red scarf + mittens) · sled (wooden sledge, empty) · sledding (child in red on a sledge) · skiing (girl in red on skis) · skating (girl in red, white skates) · snowboarding (child in yellow on a red board) · icicle (pale blue, `weak`) · ice (frozen pond with slabs, `weak`) | snowflake (the sign's own symbol) · coat / sweater / boots / scarf / beanie / fireplace (the pt override pool — opened for the P3 poisons: a pink hooded coat, a Nordic sweater, purple snow boots, a red brick fireplace, a striped scarf, a blue knit beanie) · evergreen / igloo / hockey (excluded by design) |
| spring 7 | tulip (red) · bud (a red closed bud on a green stem — reads as a tulip bud; in mono it reads as a leaf-bud, see open item 4) · chick · duckling · lamb · nest (two red-combed birds in a nest, "birds nesting") · birdhouse (`weak`) | kite (a diamond kite — excluded, holiday/season ambiguity) · robin (a European robin — the winter bird in de/UK) · butterfly / bee / umbrella / rainbow / leaf / garden / sun / flower / bunny (excluded by design) |
| summer 10 | sandcastle · popsicle · watermelon (a slice) · swimming (girl in water) · beach (umbrella, chair, palm) · flip-flops · pool (a blue pool, reads as a pool at 88) · seashell (scallop) · surfboard (a striped vertical board — reads as a surfboard; at 64 px it is the most abstract tile) · tent | swimsuit (an adult two-piece — K-207's noun anyway) · campfire / lemonade / bucket / starfish / sand (excluded by design) |
| autumn 8 | acorn · `tree/maple` (a whole red-orange TREE, `vocabKey:null` → `alt` x11) · harvest (a wheat sheaf) · `thanksgivinng/pumpkin` · `thanksgivinng/apple` (a basket of red apples) · `vegetables/mushroom` (fly agaric) · scarecrow · `forest creatures/hedgehog` | `thanksgivinng/autumn` (a red maple LEAF — a strong marker, unused: its noun IS the season word, open item 3) · haystack (a round hay pile) · persimmon (reads orange/tomato) · `tree/oak` (a generic green tree) · squirrel · corn · `vegetables/pumpkin` · bread |

Nothing pooled was dropped after opening: every kept picture is what its name says and reads as its season. 32 of 33 refs carry a vocab entry in all 11 locales (node); `tree/maple` carries `alt` x11; none is in `B2_EXCLUDE`; no pooled noun is one of K-207's 12 (`summer-vs-winter-clothes.json`: sunglasses swimsuit sandals shorts t-shirt cap coat mittens scarf boots earmuffs sweater).

EN block: names `Winter / Spring / Summer / Fall` (`alt.autumn:'Autumn'` = the vocab word — the design's OPEN 1 stays with the en panel), `veto` = hedgehog + mushroom (design §1/§4, en-US) → en d2 pools winter 6 · spring 6 · summer 10 · autumn 6 (strict = weak removed); d3 pools 8 · 7 · 10 · 6. F1/F3 floor (≥ 3) clears in en for every season.

## Gate
```
node scripts/worksheet-gen/qa/verify-b3-seasons.js
neutral: pools winter 8 (6 strict) · spring 7 (6 strict) · summer 10 (10 strict) · autumn 8 (8 strict)
bank en: cycle winter>spring>summer>autumn, model temperate-north, d2 pools winter 6 · spring 6 · summer 10 · autumn 6, names Winter / Spring / Summer / Fall
render d1 en: verify 0 lints 0 icons 100 zones [202,202] body 811 names Winter 67 / Spring 64 / Summer 82 / Fall 35
render d2 en: verify 0 lints 0 icons 88 zones [214,214] body 811 names Winter 67 / Spring 64 / Summer 82 / Fall 35
render d3 en: verify 0 lints 0 icons 64 zones [227,227] body 811 names write / write / write / write
render d1 long chrome (title 66 / instruction 150 chars): verify 0 lints 0 body 733 px zones [163,163]
render d3 long chrome (title 66 / instruction 150 chars): verify 0 lints 0 body 733 px zones [188,188]
sweep: 40 rows clean, 20 distinct item sets over 20 seeds
poison: P1 KILLED · P2a KILLED · P2b KILLED · P2c no-reason KILLED / with-reason PASSES (control) · P3a KILLED · P3b KILLED · P3c KILLED (verify 0 lints 0 — the page itself is clean) · P4 bank KILLED / P4 build KILLED (the spec refused (throw), no filler) · P5 KILLED · P6 KILLED · P9 KILLED · P10 KILLED · P11 KILLED · P13 KILLED (printemps measured 130 px at 28; control at 22 = 102 px, fits 128) · P15 KILLED · P16 KILLED
PASS (278 assertions, 16/16 poisons killed)        (--quick: 157 assertions, sweep skipped)
```
What the gate asserts ITSELF (qa/lints.js has no size lint): every `[data-lcs-item] .ws-icon` ≥ 56 (the K `minElement`) AND === the config px (100 / 88 / 64, measured `offsetWidth/Height`); tile count === 4 × perBin; 4 bins × 150 × binH; every printed bin name ≤ the 128 px inner (measured `scrollWidth` in the real render, Baloo 2 700 22: Winter 67 · Spring 64 · Summer 82 · Fall 35; the design's `printemps` 102.3 re-measured **102**) and ≥ the K label floor 18; the stage inside the body column and never into the footer band; both line zones > 0; the NODE gate — every rendered item's `data-lcs-season` === the pool the bank puts its `(theme, noun)` in for that locale (override-aware) and no neutral item noun ∈ K-207's 12. Poisons are judged on the SPECIFIC message (WRONG REASON / SILENT both exit 1); the correct EN bank is the control (0 findings, every render clean).

The four face poisons the design lists (P7 F1 two-pool card · P8 F3 two intruders · P12 F2 clockwise bank · P14 F4 `septiembre` at 200) are Phase 2 — no face code exists to poison.

## Renders (looked at every one)
`scripts/worksheet-gen/out/dev/K-322-null-d1-en.png` · `K-322-null-d2-en.png` · `K-322-null-d3-en.png` · `K-322-null-d2-en-mono.png` (the greyscale d2 the design asks for: all four signs keep identity — line-star / cluster-on-a-stem / solid disc / lobed shape — and every marker keeps its identity; icicle/ice not on this page) · gate renders `K-322-gate-d{1,2,3}-en.png`, `K-322-gate-d{1,3}-en-longchrome.png` (3-line title + 2-line instruction, body 733) · poison renders `K-322-gate-poison-P{3c,6,13,13-control,15}.png` · glyph sheet `K-322-sheet-glyphs.png` (all four at 40 / 56 / 160, colour + greyscale) · picture sheets `K-322-sheet-{winter,spring,summer,autumn}.png`.
Nothing cut off, sparse in the tile rows, tiny, or overlapping; dots sit on the sign-facing edges; the d3 writing rows fit the 128 inner width of the bins; the longest line (column 1 to bin 4) crosses only other lines.

## Deviations from the design file (each with the measured reason)
1. **Autumn glyph notches at r 17, not r 14; outline 2.5, not 2.** With the design's r 14 the leaf read as a five-point STAR at 40 px on the glyph sheet (`K-322-sheet-glyphs.png`, first render); shallower notches keep the five lobes AND the leaf identity in colour and greyscale. Tips, base, stem and veins are the design's.
2. **Spring glyph geometry tightened**: head centred (32,22) with petals at r 10, rx 7.5 / ry 10.5 (design (32,24), r 12, rx 8 / ry 12); stem 40-62 (design 36-60); leaf at (22,54) (design (23,50)). With the design's numbers the two lower petals reached y 48 and sat on the stem start (36) and the leaf (50) — a visible collision at 160 px on the first sheet. Stroke widths, fills and the coral centre are the design's.
3. **`namePx` is a difficulty-config key** (22 at every level). The design has it only as a `seasonBin` parameter; the config carries it so the gate's P13 can poison it (28 → `printemps` 130 > 128, killed by the gate's width floor AND by `verify()`).
4. **d1 tile columns = the middle two bins (1, 2)**. The design fixes d1 at 2 + 2 tiles with `maxAlignedPerRow 1` but not which bin columns the tiles sit over; the middle columns keep the tiles on the bin grid so the alignment rule is defined (lines reach at most 350 px sideways).
5. **Rule (a) is applied as "no contiguous window of 4 tiles is a rotation of the cycle"** — identical to the design at d2 (rows of 4), trivially true at d1 (rows of 2), and a conservative superset at d3 (rows of 6). `verify()` re-derives the same window test from DOM order.
6. **The bank exports `SEASONS.neutral` beside `SEASONS.en`** (the design's §5 shape). Any tool that iterates a bank's keys as locales must skip `neutral` (my gate does; `apply-b3-locale.js`, when it is written, and any generic `Object.keys(bank)` loop must too). `b3-common.bank('seasons','neutral')` would "succeed" — the spec never calls it that way.
7. **Body under the legal worst chrome measured 733, not 722**: a 66-char title wraps to 3 lines but a 150-char instruction wraps to 2 (Nunito 800 17 on ~1,200 px of text ≈ 2 lines, README: 7.4-8.1 px/char). With a 78-char (illegal, > 70) title the body dropped to 700 and the tallest stack (d1: 124 + 160 + 124 = 408) still cleared the footer with 146 px zones. Stack budget at 722: d1 408 → zones 157 · d2 384 → 169 (design ✓) · d3 358 → 182 (design ✓).
8. **The bottom row's tiles sit on the body's last pixel** (`space-between` fills the body; the footer band adds its own 10 px padding, so the tiles stay 10 px above the attribution rule). The gate's footer assertion uses the lint's own tolerance (stage bottom ≤ footer top + 0.6) — a stricter `- 0.6` failed every correct render on the first run (measured 0.0 px apart) and was corrected as a wrong measurement, not a design change.
9. **The `data-lcs-season` stamp sits on the tile** (the design: "tiles carry the season only in `data-lcs-season`"). Nothing printed leaks it; the sheet is white cream tiles, glyph + name signs, dots.
10. en `veto` applied as the design's en-US ruling (hedgehog + mushroom) even though the neutral pool keeps both — so `SEASONS.en.veto` is a real, non-empty veto and P4 builds on it (all but one autumn marker vetoed → validator "REFUSED" + the spec throws `only 1 eligible nouns, need 2`).

## `tools/b3-baseline.js --check --quick`
```
checked build 2780 + enum 200 in 16s: 11 drifted (0 expected), 0 missing
  DRIFT wave:wave-001 … wave:wave-011
FAIL
```
- **Build section: 0 drift** (2780 coordinates incl. the 4 K-322 quick coordinates, with the committed `strings.en.json` restored). While a parallel builder's regenerated `strings.en.json` was on disk the build section showed the K-317-recorded 68 `source:'spec'→'en'` flips (K-308…316, G1-285…301; title/instruction bytes identical) — restored, 0.
- **Enum section: the 11 "drifts" are a stale-baseline artefact, not a spec effect.** `out/b3-baseline.json` (gitignored) was captured 09:43; the harness gained its `plan.types === 'all'` skip at 10:42 (`aa9b16b0`). Each legacy id (`wave-001`…`wave-011`) is ALSO the `id` of the pinned `waves/wave-00N-divfix-{a,b}.json` (explicit types): the old capture let the legacy file (read last) overwrite the key, the new harness skips it, so the key now hashes the divfix wave. Verified without my spec on disk: the same 11 keys drift. A reviewer `--capture` (full run) resets it.

## Open items (faces / panels / critic / build session)
1. **OPEN 1 (en panel): `Fall` vs `Autumn` on the sign.** Shipped `Fall` (US K charts) with `alt.autumn:'Autumn'` (the vocab word, cross-checked); flip = one string.
2. **Critic: the 40 px glyph in a 150 × 160 sign reads airy** (43 px free above and below by design). 48 would still fit (48 + 6 + 28 = 82, 39 free) — a taste call, not made here.
3. **`thanksgivinng/autumn` is a red maple LEAF** (opened) — the strongest autumn marker in the library and not pooled: its noun is the vocab key `autumn` (the season word in all 11), so pooling it puts the season name into an item's vocab (F1 would then have an item whose word is the answer). Panel/critic decision; the base prints no words, so it would be safe on the base alone.
4. **`spring/bud` in greyscale reads as a leaf-bud on a stem** (`K-322-null-d2-en-mono.png`, top row) — a candidate for `weak:true` if the critic reads it as autumn in mono; kept per design (colour: a red tulip bud).
5. Phase 2: the six face components + two primitives, `tools/validate-b3-draft.js` (seasons block — the gate's `validateBlock` is the reusable core) + `apply-b3-locale.js`, the face poisons P7/P8/P12/P14, the pt-BR override pool (the P3 in-memory pt block in the gate is the design's §4 list: `winter/coat sweater boots fireplace` + `clothing/scarf beanie`, all opened on the winter sheet).
6. Registration before any wave: `apps.seasons` (`{science, 5-7, seasons}`) + `axes['exercise-type'].seasons` slug/name × 11 (§1 slugs); `verify-hub-type-rows.js` expects 6 rows per locale (pt 5-6 on F5).
7. `strings.en.json` is a collision surface between parallel builders (re-modified once during this build) — the reviewer's single regeneration at the end is the fix.
