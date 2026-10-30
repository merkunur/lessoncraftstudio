# #165 — Count Out the Money → THE SAY-IT SLOT (2.MD.C.8; all 11 locales)

ORDER row 165 · id `money.count-out.2-md-c-8` (kept). Design: `designs/165-money.md`.

## The invention
- **A coin box that only swallows a coin when its counter already says the new total.** The child turns the number wheels to what the box will hold with the coin inside, then drops the coin into the slot (tap the coin and the slot, drag, or keyboard).
  - The right number: the coin goes in and lands in the glass window; the counter stays where the child put it.
  - The counter not turned: the flap wiggles (no miss).
  - Any other number: the coin flips back out, the child's number flutters out on a coral slip, and the wheels roll back to the box's total (a miss). A second miss on the same coin: the box counts on by itself in the coin's natural steps (tens, then a five, then ones), then rolls back.
- **No running total anywhere.** The only number is the one the child turns.
- **The price pin.** The wheels clack at the price and cannot go below what the box holds; a coin that would pass the price is refused with a hint, never counted as a miss.
- **A real purse.** The cloth is shuffled per showing; spending small coins first can strand you (hint and a bobbing lever; a second stranding tips out and lays the cloth biggest-first). Lever = give back the last coin; ring = tip everything out.
- **Coins** are drawn at the real coins' relative sizes and metals; the US coins carry no numeral (a ghost appears on a second miss), every other locale shows the worth numeral as its real coins do. Families: USD en · EURF de/fr/it · EURR nl/fi (no 1/2 c) · MXN es (whole pesos) · BRL pt (no 1 centavo) · SEK sv (no 20 kr coin) · DKK da · NOK no (no 2 kr coin).
- **Levels:** 1 count out (the eight old targets per locale kept) · 2 fewest coins · 3 top up Pip's coins already in the box, or two trays: pick the one you think holds more, count both (each prints a slip), wrong pick → hint and the right tray glows, then tap it.
- **Success:** bell, the drawer opens, the treat (library bakery pictures) hops, the parade replays the child's own count; ≥ 100 cents adds the grade-2 split form («150 ct = 1 € 50 ct»). Next 0.5 s later.
- **Settings:** Level (1/2/3); Coins (a purse / endless piles — changing it starts a fresh round at once).

## Deviations from the design
- **No free play** before the first round or after success (the shell's Next follows success in 0.5 s, as in row 164).
- **Stranding is revealed right after the coin that makes the price unreachable**, not at the first pin clack — deterministic and earlier.
- **The miss hints say "this coin"**, not the coin's name, so the en knowledge test is never given away and no per-locale coin-name grammar is needed.
- **The compare hint** «more coins is not always more money» shows only when the tray picked holds MORE coins (R7). In R8 the tray with more coins really holds more money, so the hint there names only the two totals (reviewer finding, gated).
- **Phones:** the treat stands on the box above the price pin; the glass window sits between the lever and the ring; solved, the dead wheel pads, the lever row and the cloth step aside for the parade.
- **The pin carries no `role="img"`** (hierarchy audit); its tag shows the price as text.
- **Metadata frozen** (all 11 slugs, titles and intros kept); old params dropped; the row stays in `money-activities.json` (row 166 is still there).

## Review (one native + pedagogy reviewer, all 11 locales) — all fixed at the source
- **SEVERE ×11:** the compare hint taught the opposite of R8 (above).
- **SEVERE sv/da/no/nl/fi (+ en minor):** «the coin with the ring» pointed at the tip-out ring → «the circled coin» in every locale.
- **SEVERE no:** «Lavere kan telleverket ikke gå» (V2 word order).
- **Minor:** no «Turkis brett»; de «wirf dann die markierte Münze ein»; es «Ahora gira tú»; pt «Some o valor»; pt prose chain «50, 75, 85, 90» (counting on from the biggest); sv instruction «med ditt mynt i»; fr prose «taquet»; fi «ei saa kokoon», «enemmän rahaa».
- Checked true: every coin-size claim in the prose; no answer tells; nothing claims "free".

## Gates
- `verify-say-it-slot-core.js` 37,133/0 — ground truth parsed from the design file's own tables: every round = the design; real coins per country; L1 ≥ 2 ways (NOK R2 the listed exception), spare coins, no coin = price; L2 fewest unique with a longer way; L3 gaps, overshoot coins, R7 fewer-coins-win / R8 more-coins-win; bots (biggest-first 8/8, smallest-first stranded exactly in the design's ✱ rounds — 4/8, EURR and NOK 3/8 —, coins-as-ones 0/16, turn-to-the-pin 0/16); the slot takes exactly one counter value per (box, coin); 10,000-move fuzz per family; lever/ring/stranding/fewest/endless/compare; count-on steps; shuffle uniformity; plan incl. a stuck random source; strings ×11; the activity layer run in node (no running total, idle/spit/miss 2, the chain in the success line, faces, the compare hint, the setting reload).
- `mutate-say-it-slot.js` 33/33 killed, control passes.
- `local-test-say-it-slot.js` 3,436/0 in 11 locales: real taps on the wheels, the coin and the slot, a real drag, keyboard; every level; 9 states × 8 widths with the box and every coin above the fold at rest.
- visual-qa 192 renders each in en/de/fr/da/fi (and pt); hierarchy 536/0; settings efficacy 2 live; prose-claims, SERP copy, content tells, preflight routes, next-delay all PASS.
