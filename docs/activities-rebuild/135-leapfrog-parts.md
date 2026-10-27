# #135 — Add It Both Ways → THE LEAPFROG PARTS (1.OA.B.3; all 11 locales)

ORDER row 135 · id `match-pairs.add-it-both-ways.1-oa-b-3` (kept). Design: `designs/135-match-pairs.md`.

## The invention
The two numbers on every card are blocks of snap-cubes, with the smaller part always coral and the larger always teal. The child taps a card. It lifts, but **nothing changes yet**; commutativity has to be the child's prediction. Then the child taps the card they think is its twin. The lifted card's two blocks leapfrog over the "+": 4 + 7 becomes 7 + 4, and the total bar never changes length. The card is laid on the chosen one:
- **a twin** fits cube on cube and both cards turn into a twin plate on the shelf;
- **a same-total impostor** glows at exactly the cubes where the colours disagree. In most rounds all six cards make the same total, so the total alone never finds a twin;
- **a different total** shows the row that sticks out.

Take-away cards (11 − 4 = 7) swap their two parts across the "=" while the whole stays first. Tap the "−" and the whole bounces back: it never jumps over its own part.

## Files and wiring
- **New files:**
  - `mini tools/leapfrog-parts-core.js` (`LeapfrogPartsCore`) holds the model:
    - **Rounds:** 9 per kind, turnarounds and take-away twins, each to 10 and to 20. Every old pair still appears, with no doubles and no 0. "Mixed" alternates the kinds, which never mix inside a round.
    - **pick():** the first tap only lifts the card. A wrong twin hops home with the hint "same total" or "one row sticks out" ("same whole" on take-away cards). Miss 2 with the same card keeps it lifted and leapfrogged as the help. Putting it down takes the help away.
    - **Also:** `compare()` gives the glowing cubes and the overhang, `minusSwap()` always refuses, and `unmatch()` takes a twin plate apart.
    - **The plan:** a fresh round order every pass whose first round is never a talking round (mixed totals). The six places are a uniform shuffle, so the twin touches its card exactly as often as any other card does.
  - `leapfrog-parts-activity.js` draws the cards: numerals riding on their cube blocks, the "+" at the junction, the total bar. Take-away cards show the whole in a frame with the taken part lifted and dashed. The leapfrog arc animates in flight.
    - Phones: one column of six cards, and a solved round folds the cards away to show the three twin plates large.
    - Keyboard: L leapfrogs the lifted card in place (never a pick), Esc puts it down.
    - CSS prefix `lp-`, `apparatusClasses: ['lp-art']`.
  - `leapfrog-parts-activity.html` loads core and activity at `?v=1`.
- **Manifest:** the row stays in `match-pairs-activities.json` beside the other match-pairs rows. Its id, slug, title and intro are frozen in all 11 locales. `tool` → `leapfrog-parts-activity`; `params` = `{num: [10, 20], cards: [add, take, mix], rounds: 9}`. The other rows in the file are untouched (gated).
- **Route:** `ACTIVITY_WRAPPER_VERSION` 9.879 → 9.880.
- **Prose ×11:** all replaced. Each quotes the twins the cards really show (4 + 7 / 7 + 4, 11 − 4 = 7 / 11 − 7 = 4).
- **Deviations from the design:**
  - the row stays in the shared manifest instead of its own file, so the route's manifest list is untouched;
  - the "Cube box" free play and the long-press test leapfrog are left out (the L key does the test leapfrog);
  - the to-10 turnaround round 7 became 1 + 8 · 3 + 6 · 4 + 5 (all 9) on the reviewer's advice, because one pair stood out by total.

## Native + pedagogy review (one reviewer, all 11 locales)
Every finding was fixed at the source (`lp-strings.js`, prose, core).
- **Italian:** "il {w}" broke for 11 and 8 (l'11, l'8). The line now reads "il numero {w} è rimasto al suo posto".
- **Swedish, Danish and Norwegian:** "helt tal" means INTEGER, not the whole. "Det hela", "det hele" and "kokonainen" became the school terms helheten / helheden / helheten / kokonaisuus.
- **Swedish:** "vända tal" reads as reversing a number's digits, so it became "byta ordning".
- **German:** the prose named Umkehraufgaben (the inverse operation), which this activity never does; now "Aufgabenfamilien".
- **Dutch:** "tweeling" is the pair, so a single card is now a "tweelingkaart".
- **New hint lines:** take-away impostors get their own "same whole" lines in all 11 locales.
- **Smaller fixes:** es gets a subject for its framework sentence, and es, pt, it, sv and fi say "across" the equals sign instead of "on the other side". Also fixed: fr emboîtent and en premier, pt "toque em um", de "ragt heraus", no "kube på kube", fi "Vaihdetut yhteenlaskut".
- **Kept as designed:** the four deliberate "talking rounds" with mixed totals. The plan never opens a pass on one.

## Gates
- **`verify-leapfrog-parts-core.js`:** 27,887 checks, 0 fail. Its own leapfrog, cube colours and the old pairs read from git. It checks:
  - every card has exactly one twin, with no 0, no doubles and kinds never mixed;
  - for every ordered pair in every round, twins iff the gate's leapfrog matches, and the glow sits exactly where the gate's colours disagree;
  - the model (a pick only lifts, miss / miss 2 / help / take-apart / done, the minus refuses);
  - all 15 pairings at 6.7 ± 1 % and the twin touching its card at 46.7 % over 10,800 shuffles per setting. A linear congruential stream was too correlated for this test, so the gate uses mulberry32;
  - the success lines filled and checked true, strings ×11, prose and the manifest.
- **`mutate-leapfrog-parts.js`:** 20/20 killed, control passes. The mutations include "leapfrogs on the first tap", "twins by total only", "the minus swaps" and "the twin always beside its card".
- **`local-test-leapfrog-parts.js`:** 10,450 pass, 0 fail. Real pointer, 11 locales.
  - At 1024: lift-only, the impostor glow count, miss 2 help, the twin plate and its undo, the round line + Next 0.5 s, the overhang, the minus bounce, L, numbers to 10.
  - Then every round (turnarounds and take-aways, to 10 and to 20) at rest, at miss 2 and solved, through 320…1366. Cubes are never below 11 px.
- **`visual-qa-activity`:** 216 renders pass. The first run caught Next below the fold on solved phone rounds, which the cards now fold away to fix. Phase driver `visual-qa-phases/match-pairs.add-it-both-ways.1-oa-b-3.js`.
- **`audit-activity-hierarchy`:** 434 / 0. It caught the undeclared card drawings.
- **`audit-settings-efficacy`:** numbers and cards are both live.
- **`audit-activity-next-delay`:** pass. Content ×11, prose claims, SERP copy, content tells and route preflight: pass.
- **0 lines** in shared cores or `lcs-shell`.

## Live
`live-verify-leapfrog-parts.js` on production, 2026-10-27: **52 pass, 0 fail.** All 11 pages return 200, and en, de, sv and fi at 1366 and 390 embed leapfrog-parts-activity.html at wrapper 9.880. With a real pointer, a card laid on a same-total impostor makes the impostor glow and the hint says "same total"; every card + its true twin gives three twin plates and the round line; the iframe grows with the card. The first run fell in the cache window (some pages still served the old embed); once curl showed 9.880 in every checked locale, the second run was clean.
