# #164 — Pip's Market Stall: Counting Coins & Making Change → THE WORTH TILL (2.MD.C.8; all 11 locales)

ORDER row 164 · id `coin-stall.money.2-md-c-8` (kept). Design: `designs/164-coin-stall.md`.

## The invention
- **A till that knows what coins are worth.** It has one cup per coin worth, with the biggest worth on the left, and a cup takes only the coin it is named for. A coin dropped in the wrong cup bounces back, however big it looks.
  - The coins are drawn at the real coins' relative sizes and in their real metals: reeded dime and quarter, holes in da 1/2/5 kr and no 1/5 kr, bimetal 1 €, 2 €, R$1 and the Mexican pesos.
  - US coins carry no numeral, like the real ones; every other locale's coins show their worth numeral, as their real coins do. In en, a coin that bounces twice shows a faint ghost of its worth.
  - The size trap is real in 10 of 11 locales; in es, Mexican coins grow with their worth.
- **The money is already in order.** Once in the till it lies biggest-first, so counting on is the natural way to count.
- **Level 1 — count the coins:** sort a spilled till, then set the total on a two-wheel dial.
- **Level 2 — pay Pip from a purse,** in four ways:
  - exact;
  - fewest coins;
  - a trade (the offered coin sits in a dish, and its own cup is lidded);
  - a second way (Pip's way is shown).
- **Level 3 — change, enough, and which purse:**
  - change: the till starts full, and tapping a cup gives its top coin to the customer's dish;
  - "Is the money in this purse enough?";
  - "Which purse holds more money?", with the purse side drawn 50/50 per showing.
- **What a miss shows.**
  - Miss 1 parades the money worth-first under the counter.
  - Miss 2 adds the running totals. The last total is hidden as "?" on count rounds; change rounds count up from the price to the payment.
  - Check again with nothing changed is a reminder, never a second miss.
- **Settings:** Level (1/2/3); Coin key (on: the coin itself sits on each cup's lip, never its numeral).

## Deviations from the design
- **Two "fewest" purses were widened.** Measured: EURF 35 and DKK 32 each had exactly ONE way to pay, so "use the fewest coins" was no choice. Both now admit a longer way, and the fewest set is still unique. Gated, and mutated.
- **Two-ways purses** were not specified in the design; authored per family so that another way always exists. Gated.
- **The prompt says "This costs {price}."** The item and its price tag are shown, so no article is ever generated across 11 locales.
- **The trade prompt says "this coin"** instead of naming it, so the en knowledge test is not given away.
- **No free-play mode and no paper-bag folding animation.** Success shows Pip hopping, a bag over the item and a shut drawer; the till is live in every round.
- **Coin key defaults to "on"** (no automatic switch-off after the first pass).
- **The till steps aside in "which purse" rounds** (no coin can go into it there). The emptied counter steps aside in count rounds.
- **On phones:** the dial lies flat (▼ digit ▲), the cups share the drawer width (never below 44 px), and the da level-1 prompt was shortened by one clause so it fits at 320 × 640.
- **The plan's fallback for a stuck random source** rotates the last order until it is valid and new. A mutation proved the old fallback could repeat the previous order.
- **Metadata:** frozen en–nl; sv/da/no/fi slugs, titles and intros are new. Old params dropped.

## Review (one native + pedagogy reviewer, all 11 locales) — all fixed at the source
- **The verdict:** coin-size claims are true in every locale; money writing is sound; each locale names its own framework.
- **SEVERE ×11:** the instruction said Check always lines the money up; it only does so after a miss. Fixed in all 11 and gated.
- **Minor:**
  - de: «passend bezahlen», «Otto möchte diese Münze wechseln» (Wechselgeld means change after a purchase), «10-ct-Münze» (coupled compound, gated).
  - fr: «en prenant dans la caisse».
  - es: «la cantidad exacta».
  - it: «il minor numero di monete».
  - da: «det præcise beløb», «Et retfærdigt bytte», infinitives in the prose.
  - no: infinitives in the prose.
  - fi: «Vaihtoraha on», «Tämä lokero on kolikoille …», «vaihtaa … pienemmiksi», nominal prose.

## Gates
- **Logic:**
  - `verify-worth-till-core.js` 3,608/0, with its own ground truth: the design tables re-stated in their own notation and re-derived. It checks:
    - totals distinct per family;
    - every fewest answer unique, with a longer way existing;
    - trade purses lack the offered coin;
    - change payable from the till;
    - enough rounds 2 yes (one exact) and 2 no (1–5 short);
    - R7 more-coins-loses and R8 more-coins-wins;
    - every coin × every cup in 8 families;
    - every verdict, the plan (incl. a stuck random source), strings, money words, and the manifest row.
  - `mutate-worth-till.js` 27/27 killed, and the control passes.
- **Browser:**
  - `local-test-worth-till.js` 3,179/0 in 11 locales: real drags (a wrong cup bounces), real taps, the keyboard, every level, plus 8 states × 8 widths.
  - visual-qa 192 renders each in en/de/fi/fr/da; hierarchy 866/0; settings efficacy 2 live.
- **Content gates:** prose-claims, SERP copy, content tells, preflight routes, next-delay all PASS.
