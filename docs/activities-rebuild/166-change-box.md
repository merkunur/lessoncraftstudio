# #166 — Make Change with Coins → THE CHANGE BOX (2.MD.C.8; all 11 locales)

ORDER row 166 · id `money.make-change.2-md-c-8` (kept). Design: `designs/166-money.md`.

## The invention
- **The customer's money goes through a change box and comes out as the same money in small coins.** The box rattles and pours the pile; the child taps the change into the customer's tray (tap a tray coin to put it back). Everything left in the pile is Pip's (Filou in fr, Otto elsewhere).
- **Change is checked by conservation.** At Check Pip counts his own coins onto the price tag, biggest first with his running amount: short if too much went back (the tag ringed), over if too little (the coin that crossed the price wobbles). That count is the only total on the screen, and only at Check. Everything given back is said in words ("Pip has nothing left"), never "0".
- **Miss 2 = the count-up:** the tray empties back, the rail runs from the price to the payment, and Pip's fewest change coins are outlined in the pile; the child still taps the real coins.
- **Shops (setting):** Change (the eight old problems per locale kept) · Enough and how much more (four purses vs a price; four purses topped up from a side tray into Pip's dish) · Basket (two or three toys, then change) · Mixed (all 24). **Pip counts** at Check (default) or as you go (his live count on the dish).
- **Coins** at the real coins' relative sizes and metals; US coins carry no numerals, the others their worth; notes drawn with numeral and sign only. Families: USD en · EURF de/fr/it · EURR nl/fi (no 1/2 c) · MXN es (whole pesos) · BRL pt · SEK sv · DKK da · NOK no. Amounts of a euro / real or more are written in the grade-2 split form ("1 € 75 ct"), with the decimal form in success lines only ("(1,75 €)", nl "(€ 1,75)", pt "(R$ 1,35)").

## Deviations from the design
- **No free play** (the shell's Next follows success in 0.5 s, as in rows 164–165).
- **Toys are never named in sentences** ("This costs …", "The customer buys everything on the shelf …"): no generated articles in 11 languages; the pictures and tags carry the toys.
- **Single-coin changes:** the design says "2 per family"; measured on the kept live problems it is USD/EURF/EURR/BRL 2, MXN/SEK/DKK 1, NOK 0 — the old problems are kept and the counts are pinned in the gate. The "never two side by side" rule applies to the change rounds (a basket set has 5 such rounds of 8, which cannot be kept apart).
- **Phones:** the payment sits on the shelf (above the change box in a basket); one toy wears its tag beside it when the price is short; the box steps aside after the first Check (it is only needed for the pour) and an empty pile row disappears; Pip's dish waits during the count-up; euro / real amounts stack on the count rail ("1 euro" over "90 cent").
- **Row stays in `money-activities.json`** with row 165 (both rows rebuilt; old params dropped). Metadata frozen.

## Review (one native + pedagogy reviewer, all 11 locales) — all fixed at the source
- **SEVERE:** the Check label differed from the shell's in es/pt/it/sv (now Comprobar / Verificar / Verifica / Kontrollera everywhere they are named); the prose claimed coins drawn "at real size" in 10 locales (they are drawn to scale relative to each other); nl "bakje" named both the change box and Otto's dish; sv "Tagen tillbaka" (mynt is neuter → "Taget"); da instruction "de mønter, han får tilbage" inverted the mechanism; fi "Ne kolikot ovat vaihtorahaa" (partitive).
- **Minor:** one noun per container in de (Teller), fr (coupelle), sv/no (fat), da (fad); it Bastano / Non bastano; nl "alleen … maar", "Je hebt te veel teruggegeven", "(€ 1,40)"; de "Laufend"; fi "Kun tarkistat", "Asiakas antaa {paid}", "Oton laskeman summan"; sv idioms in the prose; en "no numerals".
- Also found while building: the "add coins" reminder was printed with the character's name unfilled; an entrance animation that started from opacity 0 left half-faded coins in screenshots; Pip's dish was pinned to a fixed height and its coins spilled over the counter.

## Gates
- `verify-change-box-core.js` 5,298/0 — ground truth parsed from the design's §6 tables (piles and changes, purses, more, baskets) and re-measured with its own solver: real coins per country; every pile = the payment and holds a price set and a change set; enough 2 yes (one equal) / 2 no (1–5 short); a "no" purse with more coins than a "yes" purse; basket totals distinct; conservation over 1,000 random move sequences per round; success iff Pip lands on the price; short/over; reminders; Check again unchanged is never a miss; the count-up; the plan incl. a stuck random source; the activity layer in node (no running total, the live setting, en faces, success lines, no 0 anywhere); strings ×11; the manifest row.
- `mutate-change-box.js` 24/24 killed, control passes.
- `local-test-change-box.js` 3,411/0 in 11 locales: real taps on pile, tray, side tray, tags and Check, the keyboard; every shop; 10 states × 8 widths with Check above the fold at rest.
- visual-qa 192 renders × 11 locales (all pass); hierarchy 776/0; settings efficacy 2 live; prose-claims, SERP copy, content tells, preflight routes, next-delay all PASS.
- **Live (2026-10-30):** live-verify-change-box en 1366 + 390 (almost all given back by real taps → Pip short of the tag; tray coins tapped back; the right change by real taps → solved) + all 11 pages 200, then de/sv/fi 37/0 once the edge cache turned over; deploy payment canary OK.
