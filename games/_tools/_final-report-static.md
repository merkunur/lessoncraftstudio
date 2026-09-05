## Assumptions and how each resolved

| # | Assumption (research/ASSUMPTIONS.md) | Resolution |
|---|---|---|
| A-1 | The brief says both "stop for approval" and "run straight through". | Ran straight through; the one approval was the implementation plan (plan mode, 2026-09-05). No mid-run approval was requested; the operator paused once for a session limit and said "continue". |
| A-2 | The project doctrine said games were cancelled. | Superseded by this brief on the operator's word; the old premium-games catalog was NOT used as a seed (operator ruling); the 204 live free activities were treated as prior art to avoid (A-22). |
| A-3 | Stage 720 × 560, FIT scaling, tap floors 56 / 80 logical px. | Held in every spec (BUILD-CONVENTIONS §2-§3). Risk stands: below ~560 px iframe width targets fall under 44 px real. |
| A-4 | Four helpers added to `game-core.js`. | `makeTile`, `playAnim`, `tone(name, step)`, `setSoundEnabled` shipped with 69 passing tests; every spec uses them. The `step` argument was added later for pitch-per-object counting (F-213). |
| A-5 | The real `t()` key set is the ~50 keys in ui-strings.js. | Linted on every spec; no spec uses a non-existent key. |
| A-6 | Emoji newer than Unicode 12 need a fallback. | Enforced by the batch gate (Unicode 13+ code points, A-24); fallback entries declared wherever needed; older glyphs preferred (the top-12 emoji are all Unicode ≤ 8). |
| A-7 | PROGRESS.md lines are written on verification, not drafting. | Held: writer agents never touched PROGRESS.md; the gate appended lines only after lint + catalogue-match; the file stayed numerically sorted and survived one session-limit restart (26 orphan specs were on disk, all gated in). |
| A-8 / A-19 | Money games use real per-locale denominations; Nordic curricula do not require money. | 116/117/118 declare all eleven coin sets; SE/DK/NO rows carry the "not before 10" caveat; prices elsewhere (018, 140) are bare numerals. |
| A-9 | 001-010 are my exemplars. | Written by me, linted, and used as the pattern exemplars for every writer batch. |
| A-10 | Specs cite research by F-id. | Linted; every spec cites at least one existing F-id; FINDINGS numbers F-1…F-218. |
| A-11 | Science interpreted as the observational world-knowledge core. | 24 science specs cover needs/growth/life cycles/features/body/senses/seasons/materials/day-night; no astronomy causation or circuits. |
| A-12 | 5-6 band = no instruction sentence. | Every 5-6 spec states "no caption"/"no words" and uses icon prompts and ≥ 80 px tiles; verified on the read samples (001, 002, 003, 005, 006, 007, 012, 043, 133, 156, 160, 175, 187). |
| A-13 | Size floor 300-800 lines. | Linted; estimates ran 380-540. |
| A-14 | Tile positions are formula-determined. | §7.1 formula cited in specs; coordinates given explicitly in every Screen layout. |
| A-15 | Literacy misconceptions are English-derived. | Every language-bound list lives in `LOCALE_DATA`; most specs carry a table; those not confident declare an "en pilot" gap honestly rather than guessing a locale list; number words, days, months and coins were authored for all eleven with [NSR-FLAG] on the Nordic/Finnish rows. |
| A-16 | Google Trends and Reddit were not fetchable. | Demand ranking built from 15 sites + SplashLearn counts + Mumsnet; mid-tier counts set by curriculum commonality. Weakness noted below. |
| A-17 | Re-queue lags are transferred, not tested. | Used as the §8 default (1 → 2-3 → 5-7 or 1 → 3 → 7); flagged for the human's child testing. |
| A-18 | Content keyed to AGE, never grade. | No spec shows a grade label; Curriculum links name each system's year for the age. |
| A-20 | Tables games are 8-9 on arrays. | 010, 049, 050 are 8-9 and open on arrays/groups; 047/048 are the 6-8 concept on-ramp. |
| A-21 | Band outcome 64 / 98 / 38. | Final distribution in the table above (computed from PROGRESS.md). |
| A-22 | "Not a free activity re-skinned" = different mechanic AND cognition. | Applied to ~35 catalogue rows; the checker's prior-art list was read row by row; no spec reproduces a free activity's mechanic on its objective. |
| A-23 | Spec-length floor measures characters. | 9,000-character floor; actual specs 12k-26k. |
| A-24 | Emoji fallback rule is Unicode 13+ by code point. | Poison-checked both ways; passed Unicode-12 glyphs, caught every newer one. |

## What I consider weak or risky

1. **Locale content is honest but incomplete.** Dozens of specs say "other locales: a native list is required — en pilot". The mechanics are universal; the word lists are not. Before any non-English launch a native author must fill `LOCALE_DATA` for those games (and review the [NSR-FLAG]ged sv/da/no/fi number words, day and month names and coin labels). Translating `STRINGS` alone will not make those games work.
2. **No audio is a real ceiling for literacy.** Every sound task is cued by a picture the child must already be able to name. In a second language, or for a child who calls the pictured object something else, the cue fails silently. Child testing should watch for children naming pictures differently from the intended word.
3. **Demand evidence has two holes.** Google Trends and teacher-forum threads (Reddit) could not be fetched; the demand ranking is robust at the top (addition, counting, subtraction, shapes, place value, tables) and weaker in the mid-tier, where the catalogue leaned on curriculum commonality instead.
4. **The FIT-scaling tap floors assume tablets and desktops.** On a phone-width iframe (< 560 px) 56-px targets fall below 44 px real. If phones become a target, a second stage geometry is needed.
5. **The adaptive rules are design choices, not measured.** 2-up/2-down (or 3-up), the three-step support ladder and the re-queue lags rest on the 80-90% success finding and preschool word-learning studies; the first ten builds should log first-try rates to check the band.
6. **P7 trace games rely on `pointermove` sampling inside an iframe.** 008, 030, 035, 036, 064, 065, 118, 171 all ship the tap-each-waypoint fallback, so nothing depends on the drag — but the drag feel is the first thing to verify on a real tablet.
7. **The builder (Claude Code) must honour the ART/ANIM contract exactly.** The linter proves a SPEC has no stray emoji; only a build-side check proves the FILE has none. A grep of each built `index.html` for emoji outside the `const ART` block is the recommended acceptance test.
8. **Three deliberate near-pairs exist** (064/065 tracing cases, 063/147 syllables/phonemes, 123/188 position words) and are annotated; if the catalogue must shrink, these are the first candidates to merge.
9. **Relaunch prompts drifted from the catalogue twice** (rows 128, 165, 170, 171, 173 were described by their pre-rebalance titles). The writers followed the binding catalogue every time, so no spec is wrong — but a prompt generated from the catalogue rows would remove the risk entirely.

## Recommended build order for the first twenty games

Ordered for the builder's learning curve (each early game introduces at most one new mechanic on top of the shared library), for demand (F-1, F-2), and so that every pattern is exercised before the second ten.

| Order | Spec | Why here |
|---|---|---|
| 1 | 002 Numeral Nest | The simplest P1 loop: prompt + three tiles + enacted count. Proves makeTile, praise, rail, finish. |
| 2 | 001 Feed the Fox | P3 tap-to-count on the same chassis; proves `tone(name, step)` and disabled-until-done tiles. |
| 3 | 005 Shape Sorter | P8 bins with icon labels and rotation; proves Phaser shape drawing from ART entries. |
| 4 | 003 Ten-Frame Fill | P6 grid toggling + a Check tile; proves the standard order rule and self-count. |
| 5 | 007 Case Pairs | P12 pair board; proves the two-selection state machine and locking. |
| 6 | 004 Bridge of Ten | P2 select-then-place; proves source/slot tiles, glide and whole-arrangement judgement. |
| 7 | 006 Letter Lantern | P1 with LOCALE_DATA letter sets; proves the locale table pattern early. |
| 8 | 008 Frog Hops | P7 trace with the tap fallback; proves pointer-path handling in an iframe. |
| 9 | 009 Balance Pans | P9 stepper + a rotating container; proves `playAnim` on angle and held-until-Check feedback. |
| 10 | 010 Array Reveal | P10 predict-then-reveal + re-queue; proves the expanding re-queue logic used by many 8-9 games. |
| 11 | 043 Pattern Train | High demand (patterns), per-placement judgement, 5-6 band discipline. |
| 12 | 028 Take-Away Tray | Subtraction (12/15 sources) on the 001 chassis — a cheap second P3. |
| 13 | 018 Tens and Ones Shop | Place value (10/15) with bundling; the most complex P2 so far. |
| 14 | 049 Times-Table Tiles | Tables (the strongest popularity signal) reusing 010's reveal as a repair. |
| 15 | 069 Sound Slide | Literacy blending with digraph tiles and LOCALE_DATA; the literacy P2 model. |
| 16 | 063 Syllable Drums | Rhythm/undo rail; a P3 with tokens the child can remove. |
| 17 | 091 Living or Not | First science; P8 with the moving-non-living trap; shows the science chassis. |
| 18 | 019 Read the Rods | First P11 keypad; proves keypad + physical keyboard handling. |
| 19 | 105 Clock Hour Match | Clock drawing (hands differ in three ways) as a P12 board. |
| 20 | 116 Coin Equivalents | First money game; proves the eleven-locale coin table and real-diameter drawing. |

After twenty, build by catalogue order within each subject, alternating maths / literacy / science batches so child-testing sessions see variety.
