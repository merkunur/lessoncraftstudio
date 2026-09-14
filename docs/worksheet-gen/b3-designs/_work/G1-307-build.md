# G1-307 `opposites` — BASE build record (2026-09-14)

Built from `G1-307-opposites.md` §2 + §5 under `_BUILD-BRIEF.md`, the README cross-type rulings and `_SUBSTRATE.md`. Family key `opposites`, `exerciseType:'opposites'`, THEMELESS (`themeAxis:{applicable:false}`, pictures through `lib/b3-picture-index.js`), no unit axis. Nothing shared was edited (`git status`: 0 modified tracked files); nothing committed.

## Files written (all type-scoped)
| file | what |
|---|---|
| `scripts/worksheet-gen/types/g1/G1-307-opposites.js` | the spec: `difficulty{1,2,3}` as a CONFIG (`cards cols rows bank cue maxCue cuePx tiers wordPx glyphH laneH maxLetters minPerDir`), `build()` → `_buildWith(bank, …)` (the gate's poison seam; `build()` passes `b3-common.bank('opposites', loc)`, a missing locale block THROWS), bijection check over the bank, tier + length + `exclusiveWith` sample-or-throw, per-card direction re-rolled until both directions ≥ `minPerDir`, the bank deranged (no answer at its own card's index), d1 `pairCard` cues resolved through `candidates()` (BW dirs + `space/sun` BLOCKED + `B2_EXCLUDE` refused), `verify(page)` re-deriving every stamp |
| `scripts/worksheet-gen/templates/components-b3/opposites.js` | `oppositeArrow`, `pairCard`, `oppositeCard` (the base's card body; see deviation 3) |
| `scripts/worksheet-gen/data/b3/opposites.js` | EN bank (gitignored — reviewer force-adds): 20 pairs, 8 pictured, 12 `syn`, 8 frames, 9 prefix items, `strings['G1-307']` |
| `scripts/worksheet-gen/qa/verify-b3-opposites.js` | the gate: bank validator rules 1–9 (exported `validateBank`, the future `validate-b3-draft.js` opposites block) + `OPENED` (the picture record) + real-pipeline renders + G1 floors + node cross-check (`crossCheck`, the design's `gate-opposites-data.js` folded in) + 20-seed sweep + 16 poisons |
| `docs/worksheet-gen/b3-designs/_work/G1-307-build.md` | this record |

`node i18n/build-en.js` → `490 types … (title lint clean)`; `strings.en.json` then restored with `git checkout --` (the K-317/K-319 convention: the reviewer regenerates it once at commit time).

## Pictures opened (contact sheet `scripts/worksheet-gen/out/dev/G1-307-pictures-sheet.png` — EVERY colour candidate of every pair key, 69 tiles, all themes)
| pair | picture(s) pinned | what I saw | verdict |
|---|---|---|---|
| big-small (scale) | `animals/dog` at 64 / 44 | a standing brown-and-white puppy (farm animals/dog + pets/dog are the same kind of drawing) | ACCEPT — the one scale pair |
| hot-cold | `camping/campfire` + `weather/snowflake` | flames on crossed logs · a pale-blue six-arm snowflake | ACCEPT |
| happy-sad | `emotions/happy` + `emotions/sad` | laughing yellow face · frowning yellow face | ACCEPT |
| fast-slow | `zoo animals/cheetah` + `forest creatures/snail` | standing spotted cheetah · snail with a striped shell | ACCEPT |
| heavy-light | `zoo animals/elephant` + `easter/feather` | sitting grey elephant · red/yellow/blue feather | ACCEPT |
| day-night | `weather/sun` + `space/moon` | smiling yellow sun · full moon with craters | ACCEPT |
| soft-hard | `around the house/pillow` + `camping/rock` | white pillow with red ends · grey boulder | ACCEPT |
| sweet-sour (reserve, kept in en) | `At the Supermarket/candy` + `fruits/lemon` | a red wrapped sweet · a lemon | ACCEPT |
| sunny-cloudy (reserve) | — | `weather/sunny` is a near-duplicate of `sun`; a weak antonym | NOT a bank pair in en (a panel may add it; `weather/cloudy` = a dark cloud cluster is in `OPENED`) |
| `weather/hot` · `weather/cold` | — | a smiling sun with heat bars · a PENGUIN in a red bobble hat | REFUSED (in `OPENED` with no honest slot, so a pin FAILS — poison P3) |
| `space/sun` | — | an orange sun on an opaque black square | REFUSED (BLOCKED in the index) |
| `colors/black` · `colors/white` | — | a black paint drop · a pale grey drop | REFUSED |
| alternates seen | `summer/campfire`, `winter/snowflake`, `animals/elephant`, `beach/sun`, `spring/sun`, `camping/moon`, `beach/rock`, `easter/candy`, `At the Supermarket/lemon`, `insects and bugs/snail`, `spring/snail` | each is the same thing as the pinned one | recorded in `OPENED` as honest alternates (a panel may swap to one without a new open) |

No pair was dropped for a wrong picture: every picture the design kept is what its name says; every refusal is the design's own.

## Pool measured (node, `data/b3/opposites.js` en)
- 20 pairs (tier 1 = 13, tier 2 = 7); a strict bijection (20 × 2 = 40 distinct words); longest member 6 glyphs.
- **8 both-pictured pairs** (1 scale + 7 two-picture) over 15 distinct nouns — the design's "7 honest pairs" + the sweet/sour reserve; F1 pool after the one-scale rule = 8 ≥ 6 (F1 not refused in en).
- d1 pool (tier 1, ≤ 6 letters) 13 for 6 cards, 6 of them pictured; d2 pool 20 for 8; d3 pool 20 for 10.
- `syn` on 12 pairs (≥ 8 → F4 not refused); 8 frames (≥ 6); 9 prefix items (≥ 8 → F5 not refused; `happy` is both a base and a pair member → happy-sad leaves the F5 page, validator note).
- `word-classes.js` en adjectives cross-checked (rule 8): big small hot cold soft tall wet happy quiet heavy sweet loud fast slow all spelled identically.

## Gate
```
node scripts/worksheet-gen/qa/verify-b3-opposites.js
bank en: 20 pairs (tier1 13 / tier2 7), 8 pictured (F1 pool 8), 12 with syn, 8 frames, 9 prefix items
render d1: verify 0 lints 0 cards 6 icons 46 bank 60+10 rows 1 body 766 px, lowest card 921 vs foot 921
render d2: verify 0 lints 0 cards 8 bank 110+10 rows 2 body 766 px
render d3: verify 0 lints 0 cards 10 bank 0 body 766 px
render d1/d2/d3 long chrome de: verify 0 lints 0 body 733 px (head 112) card inner 184 / 115 / 107 px
render d1/d2/d3 long chrome fi: verify 0 lints 0 body 700 px (head 145, a 4-line title) card inner 173 / 107 / 101 px
sweep: distinct pair sets d1 20 / d2 20 / d3 20 over 20 seeds; d1 cued cards 55/20 pages; 0 bank-in-card-order, 0 exclusiveWith clashes
poison: P1 bank · P1 build · P2 · P3 (the picture resolves) · P4 · P5 · P6 · P7 · P8 · PL node · PA · PB · PD guard · PD verify · PX · PI guard · PI floor · PC guard · PC verify · PW — all KILLED
PASS (1351 assertions, 16/16 poisons killed)        --quick: PASS (584 assertions, 16/16)
```
What the gate asserts itself (qa/lints.js has no size lint): every `.ws-icon` ≥ 44 (G1 token floor; d1 cues render 46 / 64+44); every printed word ≥ 26 px (30 / 28 / 26 by config); every lane `glyphH` ≥ 26 and the SVG ≥ 56 high (64); card count === config; lanes inside their card and ≥ 8 px above the footer; every card row's lanes at one y (line 1 is uniform); bank ≤ 2 rows and ≤ 112 + 10 px; bank set === the answers and not in card order; cued cards === min(maxCue, pictured) and `uncuedForWidth` 0; both directions ≥ minPerDir; **node cross-check: every stamped (pair, a, b) is a bank pair VERBATIM and no two stamped pairs are exclusiveWith**; an unauthored locale REFUSES. Poisons are judged on the SPECIFIC message (WRONG REASON / SILENT both exit 1); the EN bank is the control.

Poisons killed (design §5 numbering): **P1** `small` in tall-short too → bank rule 1 "not a bijection" + the spec refuses · **P2** "The elephant is not small. It is big." → rule 5 "the answer is printed in the text" · **P3** `pic.b = weather/cold` → resolves, is a colour-index candidate, and FAILS rule 3 "opened and is NOT an honest hot-cold:b" (the human open is the gate, via `OPENED`) · **P4** sv `rolig → orolig` with `rolig` banned → rule 7 (synthetic sv block) · **P5** `syn.a = 'little'` on big-small → rule 6 "accepted answer for small — a second correct chip" (`alt.b`) · **P6** a sunny-cloudy pair on `weather/sun` beside day-night, not exclusiveWith → rule 3 "noun sun backs two pairs" · **P7** `zoo animals bw/elephant` → rule 3 B&W marker · **P8** `{name}` in a `nameSlot:false` block → rule 5 · **PL** a card stamped `small → little` → the node cross-check "not verbatim" (verify() is bank-blind by design; the design's `tools/gate-opposites-data.js` lives inside the gate) · **PA** the answer appended to its card → verify() · **PB** the bank in card order → verify() · **PD** all `ab` → the spec guard (`minPerDir` unreachable) AND verify() on a page built past it · **PX** heavy-light + bright-dark on one page → the cross-check · **PI** a 36 px cue icon → `pairCard`'s floor AND the gate's 44 floor past it (verify's own floor fires too) · **PC** a 5-card page → the spec guard AND verify() · **PW** a bank word equal to a given → verify().

`node tools/b3-baseline.js --check --quick` (committed `strings.en.json`): `checked build 2804 + enum 200 in 15s: 11 drifted (0 expected), 0 missing` — **build section 0 drift**; the 11 are exactly `wave:wave-001..011` (legacy enum lines, pre-authorised to ignore).

## Renders (LOOKED at every one)
`scripts/worksheet-gen/out/dev/`: `G1-307-null-d1-en.png` · `G1-307-null-d2-en.png` · `G1-307-null-d3-en.png` (from `render/one.js G1-307 null <d> en`, lints + verify clean; montage `G1-307-d123-sheet.png`) · `G1-307-gate-d{1,2,3}-en.png` · `G1-307-gate-d{1,2,3}-en-longchrome-de.png` (3-line title, body 733) · `G1-307-gate-d{1,2,3}-en-longchrome-fi.png` (4-line title, body 700) · `G1-307-gate-poison-{PL,PA,PB,PD,PX,PI,PC,PW}.png` · `G1-307-pictures-sheet.png` (the contact sheet).

Measured in the real render (page coords, body column x 14…689): cards 331 wide (inner 302.5 = the lane width); en chrome body 766 (K-319 measured 778 under a one-line title — this title wraps to 2 lines at 30 px); d1 card 223 / inner 195, d2 151 / 123, d3 142 / 114; bank d2 = 100 px + 10 margin (design *est.* 100–112 ✓), d1 = 50 + 10 (one row of 6); bank pills = 32 + 8.9…10.1 px per glyph at Nunito 800 18 (strong 87.7, heavy 82.5, big 58.9); Baloo 2 700 words: 28 px → small 67.3, light 58.1, weak 66.9 (0.45–0.48·px per glyph); 30 px → empty 86.6, happy 83.6; 26 px → empty 75.0. Badge box x 15…45 / y +0…30; arrow box x 48…84 after the fix (ink from 56). Lane 302 × 64, glyphH 28 = 7.4 mm.

What I fixed after looking: (1) at d1 the uncued cards' lanes sat ~50 px higher than the cued cards' (line 1 was the cue height only where a cue existed) → line 1 now takes the page's uniform height (`line1H` = the cue box height, 76 at d1) so every lane in a row shares one y (gate-asserted); (2) the card stack was centred, leaving a dead block under the lane → `justify-content:space-evenly`; (3) the arrow's ink began at x 36 while the 30 px badge spans to x 45 → a measured 5 px overlap at d3 → `margin-left:20px` on line 1 (arrow box from 48). Under the 4-line fi chrome d3 has 101 px inner for a 98 px stack (30 + 4 + 64) — tight, clean, gate-asserted.

## Deviations from the design file (each with the measurement)
1. **The d1 cue sits BESIDE the word on line 1, not stacked above the lane, and d1 `maxLetters` is 6 (design 10).** The design's d1 stack "pairCard 160×88 + 8 + lane 64 = 160 ≤ 174" omits the word line (30 px Baloo = 34 px); stacked it is 88 + 8 + 34 + 8 + 64 = 202, above the design's own 174 and above the measured 171 inner under the fi chrome (700 − 60 bank − 14 − 28 gaps = 598 / 3 − 28). Beside the word the cue costs no height (stack 76 + 4 + 64 = 144 ≤ 171 ✓) but shares the 282 px line: arrow 44 + word + 8 + cue ≤ 282 → with the scale cue (64 + 44 icons → box 138) the word may be ≤ 90 px ≈ 5–6 glyphs at 30 px (measured 16.7 px/glyph). Every tier-1 en member is ≤ 6 glyphs (closed / dirty / happy / short / night / empty / clean / small), so 6 is the honest cap; a card whose word + cue would still not fit is left uncued (`meta.uncuedForWidth`, gate-asserted 0 across the sweep). The cue box is 64 / 44 (scale) or 46 / 46 (two), all ≥ the G1 floor 44 (design 80 / 44 — 80 would need a 154 px box and a ≤ 4-glyph word).
2. **`alt` is `{a:[…], b:[…]}`, not a flat list.** The direction is random, so BOTH members are answers and the answer-key note needs a per-member list; and the P5 rule ("`syn.a` must not be a second correct chip") is only checkable when the validator knows which alternates belong to `b` (`little` ∈ `alt.b` of big-small → FAIL). The panels' drafts follow this shape.
3. **Components exported: `oppositeArrow`, `pairCard`, `oppositeCard` — not the five face components.** `matchColumns / frameRow / pairLane / choiceRow / prefixChips` are F1–F5 and nothing on the base consumes them (the K-317 / K-319 convention: export what the base uses). `oppositeCard` is NEW beyond the design's list: the card body lifted out of the spec so the gate can build a page past the spec's guards (poisons PL PA PB PD PX PC PW). `matchColumns` stays a free name for Phase 2.
4. **The stack is not budgeted to one body number.** Measured bodies: en 766, de 3-line title 733, fi 4-line title 700 (the README's flat 722 is neither). The grid rows are `minmax(0,1fr)` (cardGrid), so cards shrink with the body; the fixed parts are the 64 px lane SVG + the word line (32 / 30 at d2 / d3) + gap 4 → d2 needs 100 (inner 107 at 700), d3 needs 98 (inner 101 at 700), d1 needs 144 (inner 173 at 700). Both chrome fixtures are gate assertions, and the fi fixture must actually squeeze the body to ≤ 705 or the gate fails (a fixture that proves nothing is a fail).
5. **Bank guard coefficient 0.57·px per glyph, not the design's 0.62.** Measured pills (Nunito 800 18): 32 + 8.9…10.1 px per glyph (0.50–0.56·px); at 0.62 an 8 × 11-glyph Finnish bank (kovaääninen-class) estimates 1318 > 1302 and is refused although it renders in two rows. 0.57 sits above the widest measured glyph; verify() asserts ≤ 2 rows on the real render, so the guard can only refuse, never ship a 3rd row.
6. **`OPENED` lives in the gate, keyed `theme/noun → [pairId:slot]`** (locale-neutral pair ids, so the same record serves every panel's block). The design's P3 wording ("fails `picOpened`") is implemented as: `picOpened:true` is required AND the pinned picture must be in `OPENED` as honest for that slot — `weather/cold` is in the record with NO honest slot, so a pin fails on "opened and is NOT an honest hot-cold:b", not on "unknown". A panel that swaps a picture opens it AND the builder extends the list (a two-key lock).
7. **Frames may print either member.** The design's rule 5 reads "text contains `a` and not `answer`"; with a random base direction the frame's given word is whichever member the sentence negates ("The feather is not heavy → light" prints `a`, answers `b`; "The pillow is not hard → soft" prints `b`, answers `a`). Implemented: the text prints EXACTLY ONE member (word-bounded), never the answer, and the answer is the other member or a declared `forms` entry.
8. **`gate-opposites-data.js` is not a separate tool** — the node-side re-derivation (`crossCheck`) runs inside `verify-b3-opposites.js` (poisons PL / PX). The batch's `tools/validate-b3-draft.js` should import `validateBank` rather than re-author rules 1–9.
9. **The d3 `.ws-card-stage` gap is 4 px, not 6** (design "30 + 6 + 64 = 100"): at the 4-line fi chrome the d3 inner is 101 px, so 6 would leave 1 px of slack; 4 leaves 3 (verify + the footer lint are clean at 700).
10. **`sunny-cloudy` is NOT in the en bank** (design: reserve, "weak antonym, sun clash"); the gate's `OPENED` carries `weather/sun` as honest for `sunny-cloudy:a` and `weather/cloudy` for `:b`, so a panel that adds it must also declare it `exclusiveWith:['day-night']` (rule 3's one-noun rule, poison P6).
11. **`pillow` renders visually smaller than `rock` in the soft/hard cue** (same 46 px box; the pillow's art is a flat diagonal shape). Not a defect the gate can measure; noted for the panels' opens.

## Open items for the faces / panels
- **Phase 2 components** (`matchColumns` F1 with the derangement; `frameRow` F2 with an inline `writingRow` 200×56; `pairLane` F3 = two `writingRow`s round a 48×24 `oppositeArrow`; `choiceRow` F4; `prefixChips` F5) go into `templates/components-b3/opposites.js`; the `layout` knob + `verify()` branches key on a root `data-lcs-layout` (K-319's ruling: never reuse `data-lcs-face`). F1 (K) needs `picPx:80` cues — `pairCard` at `size:80` gives 80 / 44 (scale) and 58 / 58 (two) — and the F1 verify's ≥ 56 K floor, so F1's two-picture kind should call `pairCard` with `size ≥ 78` (round(78·0.72) = 56) or its own tile.
- **Bank validator rules (1)–(9) are in the gate**; `tools/validate-b3-draft.js` (absent) imports `validateBank` from `qa/verify-b3-opposites.js`. The design's `frames[].text` "≤ 45 chars per line" is checked per sentence.
- **Per-locale traps for the panels** (design §4): es chico/pequeño (declare `override` for rule 8); pt `quieto`; nl warm/koud; sv `rolig` in `prefix.ban` (poison P4 is exactly this); da `ked af det` (members allow spaces — `WORD_RE`); fi `kovaääninen` 11 glyphs at 28 px ≈ 148 px (0.48·28·11) fits the 282 line; a fi/de bank of 8 long words: measure with the gate (the 2-row assertion) before shipping d2.
- **`data-lcs-face` root stamp**: the base stamps `data-lcs-opposites data-lcs-cards data-lcs-min-per-dir [data-lcs-has-bank]` and nothing else (byte-identical when a face lands).
- **Hub**: `apps.opposites` + `axes['exercise-type'].opposites` ×11 are NOT registered (design §7; the registrar is the emitter's step). Expected rows 6 × 11 = 66 on the design; en measured today would be 6 (F1 pool 8, syn 12, prefix 9 — no refusal).
- **The `free printable` meta lead** stays a standing catalogue item (README ruling 1); the sheet's visible copy carries no such claim (lint clean).
