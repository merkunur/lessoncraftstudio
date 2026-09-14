# G1-305 `syllable-split` — BASE build report (2026-09-14)

Built from `G1-305-syllable-split.md` §2 + §5 under `_BUILD-BRIEF.md`. Nothing shared was edited; nothing committed (`data/` is gitignored — the reviewer force-adds the bank).

## Files (all new, type-scoped)

| file | what |
|---|---|
| `scripts/worksheet-gen/types/g1/G1-305-syllable-split.js` | the spec: `eligible(loc, theme, opts)` (PURE, exported for the gate), `cellFor`, `build`, `verify` |
| `scripts/worksheet-gen/data/b3/syllable-split.js` | EN bank block (`SYLLABLE_SPLIT.en`): `mark:'arc'`, `casing:'lower'`, `kings:false`, `refuse:{finalMuteE:false}`, `sortLabels`, `example:{vocabKey:'rabbit'}` (rab-bit, TeX-agreed, count 2), `exclude:[]` — no words: they are joined at render |
| `scripts/worksheet-gen/templates/components-b3/syllable-split.js` | exactly the §2 NEW names: `syllableWord`, `syllableArcsForWord`, `hyphenLane`, `vowelDot` (namespace merge verified alongside K-317 / K-318 / G1-306 — no duplicate export) |
| `scripts/worksheet-gen/primitives/syllable-arcs.js` | NEW primitive `syllableArcs({spans, w, h=26, mode:'printed'|'blank'|'dotted', dots=0, strokeW=3})`; also accepts K-318's `{spans, gap, h}` call shape (`gap` ignored, mode defaults to `printed`). K-318's component file defers to this primitive by name. |
| `scripts/worksheet-gen/qa/verify-b3-syllable-split.js` | the gate (A data · B render · C chrome · D poisons) |

`node i18n/build-en.js` → `build-en: 482 types -> strings.en.json (title lint clean)`. Title "Syllable Division" (18 chars, unique in G1, no worksheet-word).

## Gate line

Full run (12 wave themes × d1-3 through `render/render-instance.js`, 5 seed epochs on the exemplar, the long-chrome sweep, 16 poisons):

```
G1-305 gate: 1010 assertions, 0 failed, poisons all killed, 49s → PASS
```
`--quick` (exemplar × d1-3 + chrome + poisons): `G1-305 gate: 513 assertions, 0 failed, poisons all killed, 16s → PASS`.

**Poisons killed 16/16** (each FAILS; the correct page/bank is the control and passes): not-approved word (`zebra/"sebra"`) · stamped split `kam|era` · count 4 on the d2 face · en `acorn` (rule + vocab-phonics-syl) on a `pool:'tex'` face (and passes the count-only base — control) · da `policy_managed:true` · fr `voiture` final mute-e · a separated form of the word printed · a printed `<path>` in the base arc zone · a duplicate word · a d1 dot moved onto the syllable boundary · a wrong `data-lcs-cards` stamp · a stray visible letter · `data-lcs-arcs` leaking the count · a 30 px `W` (25.5 px) in a 24 cell · en `body parts` d2 (pool 6 < 8) must REFUSE · a locale without a bank block (de) must REFUSE.

What the gate measures that the design left OPEN (critic OPEN 1, rule 9): **Baloo 2 700 advance in the real render** — widest glyph is `W` at 0.85·size: `W@34=28.9 m@34=28.6` vs cell−2 = 34; `W@30=25.5` vs 30; `W@27=22.9` vs 27; `W@26=22.1` vs 26; `W@24=20.4` vs 24 — every cell used clears with ≥ 3.5 px; de capitals `Ä Ö Ü Å` are narrower than `W`. Every printed letter's advance and its ink box (canvas `measureText`) are asserted inside its cell on every render; the widest printed letter on any sheet reached 84 % of cell−2.

## Renders for the reviewer (`scripts/worksheet-gen/out/dev/`)

Exemplar + one more theme via `render/one.js` (all lints clean, verify clean):
`G1-305-animals-d1-en.png` · `G1-305-animals-d2-en.png` · `G1-305-animals-d3-en.png` · `G1-305-forest creatures-d1-en.png` · `G1-305-forest creatures-d2-en.png` (holds the 11-letter `grasshopper` at cell 26) · `G1-305-forest creatures-d3-en.png`.
Gate renders: `G1-305-gate-<theme>-d<N>-en[-e<epoch>].png` for every wave theme, and the three-line-chrome test `G1-305-gate-longchrome-d{1,2,3}-en.png`.

I read every one of the six `one.js` PNGs and the three long-chrome PNGs. What I saw and fixed: **descenders (p g y j q) clipped at the bottom of the letter box** on the first render — see deviation 1.

## Deviations from the design file (each with the measurement)

1. **Letter anchor `y`.** Design: `label({y: cell+2})` in a `cell+12` box. `label()` uses `dominant-baseline:central`; Baloo 2 700 measured in the real render (canvas, 22–34 px): ink reaches 0.60·size above the central anchor (`Å`) and 0.49·size below it (`g`); with `y = cell+2` the bottom of `g` lands at 1.5·cell+1 > cell+12 → every descender was cut (seen on `dolphin`, `tiger`, `penguin`). Now `y = (cell+12)/2 + 0.06·size`, which centres the measured ink with ≥ 5 px spare at every cell; the gate asserts ink containment per letter.
2. **`minLongCards` is honoured as a floor the pool can meet**, stamped `data-lcs-long` (= `min(minLongCards, long pool)`), and the gate re-derives it. Measured d2 cells with fewer than 2 three-syllable words: `animals` nl 0 / da 0 / fr 1 / no 1, `clothing` no 1, `vehicles` fr 1, `ocean life` fr 1, `pets` fr 1, `body parts` fr 0 / no 0. Refusing those would contradict the file's own "animals 11/11" ship line, so the shortfall is recorded on the page instead of hidden (and `verify()` checks `rendered long ≥ floor`; the first full run caught my own `===` bug there — the free picks can add more long words).
3. **Refusal floor on the face pool** = `max(cards, minPool)` with `minPool` in the resolved config (`d1 6 · d2 8 · d3 8`; the design names only `sampleEntries(…, d.cards)` but §1 says minNouns is checked on the FACE pool, and a 6-word pool under a 6-card face would print the same words under every seed). Consequence beyond the design's d2 table: d1 refusals `fruits` en 4 / da 4 / fi 3, `zoo animals` da 4, `vehicles` da 5, `ocean life` da 5 / fi 5, `pets` de 4 / sv 5 / da 4 / no 5, `body parts` en 4 / da 2 (d1 = count 2 only, ≤ 8 letters); d3 refusals are the same cells as d2 (da thin, no pets, en body).
4. **Design table vs its own refused list:** `zoo animals` is listed 11/11 at d2 but da zoo is in the same file's refused list — measured **6 < 8** on the strict pool → REFUSED; the gate asserts zoo = 10/11. Every other row of the d2 table holds exactly (house/supermarket/clothing/forest/toys/animals 11/11; fruits/vehicles/ocean 10/11 da; pets 9/11 da+no; body 9/11 en+da; farm animals refused everywhere it matters).
5. **`data-lcs-arcs` is `0` in blank mode** (design: `=n`), plus `data-lcs-dots`; a non-zero `n` in the base would leak the count through a hidden attribute — `verify()` fails on it (poison-tested).
6. **d1 dot/boundary coincidence filter.** Evenly spaced dots at `w·(i+0.5)/2` sit exactly on a boundary for a 1|3 split of a 4-letter word or a 2|6 split of an 8-letter word (`o-ven`); the design's verify rule says "never on a boundary", so `eligible()` drops those words when `dots:true` (keyed on the resolved config). Cost: en `fruits` d1 5 → 4.
7. **Body height.** README: 722 with a three-line title + three-line instruction. Measured in this chrome: title 99 px (3 × 33) + instruction 69 px → **body 710 px**. d3 at 710: card inner 139 vs the stack's 150 → the picture is `flex:0 1 auto; min-height:max(44, 0.75·pic)` and shrinks to **45 px** (≥ the G1 floor 44; d1/d2 keep 120/88). Nothing is clipped (verify asserts card containment; the card's `overflow:hidden` hides clipping from the page lint, so this check lives in `verify()`).
8. **Extra stamps** on the root (`data-lcs-cards mincount maxcount maxletters long longwant dotsmode cellmax arch`) and `data-lcs-mark` (the bank's `arc|bar`) on each stage, so `verify()` re-derives against the resolved config and never a level index.
9. `mark:'bar'` locales (es/pt/it/fi) currently render the same 1 px blank shelf as `arc` locales — the design says `mark` "draws the base's blank zone only" without a bar-specific drawing; **panel question** (a shelf is also where a bar-marker would draw). No code branch until a panel asks.

## Pool record (design §5 rule 10; d2 = the shipping shape, en real bank, others PROVISIONAL bank per §4)

```
theme                en de es pt fr it nl sv da no fi
around the house     38 42 54 49 20 50 34 38 17 29 50
At the Supermarket   38 37 51 50 24 54 31 34 11 27 55
zoo animals          19 20 21 24 12 24 16 19  6✗16 25
clothing             20 17 27 27 10 24 14 21 10 15 24
forest creatures     19 20 29 23 17 30 16 22  9 13 24
toys                 13 19 22 20 14 20 15 16  8 15 18
animals              17 13 28 27 16 28 15 16  8 11 28
fruits               17 15 20 20 10 22 12 16  5✗13 17
vehicles             14 11 14 15 11 11 11 15  7✗ 9 14
ocean life           15 18 16 12 10 15 16 14  5✗14 11
pets                 11 11 15 11 10 13 10  8  5✗ 6✗13
body parts            6✗16 31 25 10 32 13 13  2✗13 29
```
Matches the design's measured numbers cell for cell. Other colour themes at d2 (en): 4th of July 6✗, colors 5✗, dinosaurs 0✗, farm animals 7✗, miscellaneous 7✗, post office 4✗, reptiles 3✗, shapes 7✗, tools 6✗, tree 5✗ — a round-robin wave landing on one of these throws REFUSED and the cli's non-pinned retry moves on (wave-001's round-robin gives G1-305 `toys` + `shapes`).

## `node tools/b3-baseline.js --check --quick`

```
checked build 2760 + enum 200 in 19s: 11 drifted (0 expected), 0 missing
FAIL
```
**Both drift classes are batch-level, not G1-305 defects — the reviewer decides:**
- **enum (all 11 waves):** every wave is `types:"all"`, and `enumerate.js` round-robins themes by the spec's POSITION in `loadAllTypes()` order (`ok[(idx + k) % n]`). Inserting a spec in `types/g1` shifts `idx` for every g2/g3 spec. Measured on wave-001: with G1-305 alone **65 existing deckId lines change**; with all four b3 specs on disk (K-317, K-318, G1-305, G1-306) **179**. Any new k/g1 spec does this; the fix (a position-independent round-robin key) is in a shared file and not mine to make. Multi-locale waves additionally `ERR` because `syllable-split` has taxonomy slug/name for `en` only until the panels land (`enumerate.js:128`).
- **build (0 or ~24 types depending on the moment):** the committed `i18n/strings.en.json` lacks 40 nt20-B-VAR entries (K-308…G2-314) whose specs are on disk; the baseline hashed them with `strings.source:'spec'`, and `build-en.js` (a prescribed step, being run by four agents in parallel) adds them → `source:'en'` → a hash change with a byte-identical body. A `--types=G1-305,G1-244,K-284,K-233,G1-249` run shows 0 build drift.

## Open items for the faces / panels

- Faces 2-6 knobs the base already carries: `syllableWord({blank})` (4-cell box, index 0 re-lay verified), `syllableArcsForWord({mode:'printed'})`, `hyphenLane` (no ticks), `vowelDot`; `eligible(…, {pool:'tex'})` is the boundary-face door (poison-tested with en `acorn`). Critic OPEN 2 (lane capacity) and OPEN 5 (three tiles in 280) are face measurements, not taken here.
- `example.vocabKey:'rabbit'` in en is TeX-agreed but `kings:false` — the validator's "king-eligible" clause needs a `kings:false` exemption for en/fr.
- fr `refuse.finalMuteE:true` is the §4 default — the fr panel block must set it (the spec reads the bank; there is no fr hard-code).
- `qa/lints.js` changed on disk during this session (a free-claim lint added by someone else); my renders pass it.
- Register step for the reviewer: `data/b3/syllable-split.js` is gitignored (`git add -f`); the en taxonomy entry already exists (`apps.syllable-split` + `axes['exercise-type'].syllable-split.{slug,name}.en`).
