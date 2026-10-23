# #81 — Find the Total → THE COVERED BASKET (1.OA.A.1, all 11 locales)

ORDER row 81 · id `numberbond.find-the-total.1-oa-a-1` (kept). Design: `designs/081-numberbond.md`.

## Files and wiring
- **New files:** `mini tools/bond-basket-core.js`, `bond-basket-activity.js`, `bond-basket-activity.html`. CSS prefix `bb-`.
- **Pictures:** through `lcs-pictures.js` — toys/ball (a football), fruits/strawberry, insects-and-bugs/ladybug, desserts-and-sweets/cookie, toys/car, vegetables/carrot, fruits/banana; drawn counters (ten frame, dice) when a part is bigger than the bowl holds (6 at 704, 4 on a phone) or when the coat setting asks for them.
- **Manifest:** the row stays in `number-bond-activities.json` (no MANIFEST_FILES change).
  - `tool` is repointed; `params` became a mirror of the core (every face's rounds and kinds);
  - slug, title and intro are frozen in all 11 locales (sha1 = `27d9385c…`, checked unchanged by the script).
- **Route:** grade 1 already in all 11 locales (no override); strand from `strand-names.ts`; `ACTIVITY_WRAPPER_VERSION` 9.822.
- **The shared `number-bond-core.js` is untouched** (rows 83/84/85 keep it). `verify-number-bond-core.js` skips rows that left the engine; `local-test-number-bond.js` drops this row with a pointer.
- **Sources:** scratchpad `bb-manifest.js`, `bb-prose.json` (via `apply-activity-prose.js`), `bb-dump.md` (the reviewer's text), `bb-fix1.py` (reviewer fixes).

## The invention
- **The pour:** tap a bowl — its things fall into the basket while the tag counts them, then a checked cloth drops over them and only the number stays.
- **The post:** each tap on the other bowl posts ONE thing through the slot; a dimple stays where it was; the cloth bulges. The running count is never shown, so the only way to the total is to count on from the cloth.
- **Which bowl first** is the child's choice; pouring the smaller first brings "Try pouring the bowl with more first" on the next round, once per pass.
- **Misses:** the tick before a pour / with things waiting / with nothing typed is a hint, no miss. Miss 1 writes the counting-on numbers over the posted things, starting ONE AFTER the cloth (8 → 9, 10, 11). Miss 2 lifts the cloth: two-colour ten-frame rows and a pencil outline of the total. A new move hides the help.
- **Make the whole:** the cloth already holds the given part, the whole sits on a rim tag, the tray holds the answer + 2; a post past the whole rolls off; the child types how many were posted.
- **Settings:** task (find the total · bonds within 10 · make the whole · bigger totals to 20) · parts look like (pictures · dots · ten frames). Peek: a long press on the cloth (or P) lifts a corner for 600 ms on a jumbled pile. Empty: the round arrow.

## Rulings this build made
- Two data changes to the design so every face has ≥ 7 different answers: bonds 7·2 → 2·2; to 20 re-chosen (4·10, 9·7, 8·9, 6·9, 10·9, 7·6, 9·9, 5·8). Bigger bowl: total L4 R5 E1.
- "Bigger bowl" became "the bowl with MORE" — the bowls are the same size.
- The posting bowl is one big button (each tap posts the next thing), so counters in a ten frame never need a 44 px target of their own.
- A control that goes disabled under focus hands focus to the wrap, so typed digits still land.
- **Reviewer fixes** (one reviewer, all 11 locales): make-the-whole miss 1 no longer says "count on: 8, 9, 10" (the arc ends on the whole and invited typing 10) — it lists every counted number and asks how many numbers that is (`hMiss1w`, gated + mutated); "bonds within 10" (en "bonds to 10" means pairs that make 10); "the basket is full when it holds {whole}" (it was shown while NOT full); es/it/pt «cuántas / quante / quantas» (agree with cosas/cose/coisas); nl «zijn het er samen»; no «helheten» (hele tallet = the integer); da «dugen»; fi «Muutama odottaa»; en tTotal "post the other bowl's things", promptAdd "post", "bigger totals to 20", "dots (like dice)"; fr/it/nl setting labels as names; fr/da/fi prose.

## Gates
| Gate | Result |
|---|---|
| verify-bond-basket-core (own round table; Check exhaustive over every pour × posts × typed 0–20) | 28,962 / 0 |
| mutate-bond-basket | 17 / 17 killed, control survives |
| local-test-bond-basket (11 locales × 320–1366, real clicks + long press + keyboard, every round of every task at rest and solved) | 22,387 / 0 |
| visual-qa | 60 renders green |
| hierarchy | 718 / 0 |
| settings-efficacy | 2 live |
| preflight, prose-claims, serp-copy | green |

## Open (page metadata — for the operator)
- Every frozen intro describes a number-bond DIAGRAM the game no longer shows (en "a number bond shows two parts", de Zahlenbild, nl splitsing, da taldeling, sv talkompisdiagram, no tallvennbilde, es/pt diagrama de partes y todo, it legame tra numeri, fi lukukolmio, fr arbre des nombres); fr also says «sans inscription» (a no-sign-up claim). Not changed — metadata.
