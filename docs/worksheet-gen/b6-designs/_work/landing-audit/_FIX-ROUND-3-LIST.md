# nt5-F (b6) fix round 3 — findings from the pass-1 landing panels pt · it · sv · da · no · fi

Compiled 2026-09-24 from the `findings` arrays of `scripts/worksheet-gen/i18n/.landing-b6-{pt,it,sv,da,no,fi}.json`.
Each item: reproduce on the render first, fix at the SOURCE (EN generator / EN bank / gate), then the locale strings.
"×N" = number of panels that found it independently.

## A. Source defects (EN inherits them; fix EN + gate, then all 10 locales)
1. **G2-379 wash-hands reason is false (×4: sv pt no + EN).** EN `data/b6/healthy-habits.js:78`
   "It clears away the germs from all the things we touched." — hand-washing cleans the HANDS.
   → EN e.g. "It washes off the germs our hands picked up." Re-author every locale's `reasons.wash-hands`.
2. **G1-402 order words give away the numbering (×6: all panels).** Every sentence opens with its
   order word (First / Then / Next / Finally), so the numbering half solves itself from word one.
   → drop `openers4` from G1-402 sentences (keep them on G2-378, where they are writing scaffolds);
   gate: no G1-402 sentence may start with an openers4 word.
3. **G2-383 title promises "why" (×5: pt it da no fi).** Six statements test WHAT floats, none gives a reason.
   → retitle every locale (no "why"). Also: statement "All light things float" (false) cannot be checked
   from the page — no light sinker is drawn (it fi). Either draw one or drop the statement from this face.
4. **G1-408 title claims an experiment (×2: da fi).** Balances are drawn already tipped; nothing is tested.
   → drop the experiment word from G1-408 titles (and gate it like G2-383 / K-384).
5. **G3-400 (×4: sv da no fi).** Title names only the orange question; part 1 offers two (orange / clay-boat
   cargo). "What happened" prints TWO tanks with no role for the boat question.
   → title the report, not one question; decide the result area (one tank per chosen test, or labelled).
6. **G1-407 title asks the full "what do animals need to live?" (×3: sv pt no)** while the page covers food + home.
   → narrow the title in every locale (fi already reads "Ruoka ja koti").

## B. Two-right-answer / picture risks
7. **G1-398 dragonfly (×4: sv it no fi)** keyed to lake/pond is defensibly meadow (adult insect); beaver is
   defensibly forest (it). Meadow often has one animal. → replace dragonfly (frog / swan / duck per locale).
8. **G1-403 spitting card (it):** "during" or "after" both defensible. → redraw or drop the card.
9. **K-380 (pt it fi):** comb child reads as scratching the head; pt says two children use nothing
   (pyjama child, sun child without hat) — check the round-2 "use, not need" ruling against the render.
10. **da G1-406 elk** is not a wild Danish forest animal → rådyr / ræv for da.
11. **fi K-383 / G1-407 rabbit:** fi children say jänis/pupu; only kani burrows → name it "kani" in fi.
12. **fi G1-406 crab:** "rapu" = freshwater crayfish → lead with "taskurapu".
13. **no G1-399 "tang"** (pliers) also = seaweed, which floats → "nebbtang".
14. **G1-400 fence-story outsider** (pt) unreadable at print size; footprints read as pebbles (pt).

## C. Locale string fixes
15. **G1-404 title leads with the elbow cough (sv pt no; de es fr nl done in round 2; fi done in recon 2).**
16. **fi G2-380** "Sen siivet ovat evät" is false → "Sen siivet toimivat vedessä kuin evät…".
17. **fi G2-381** "Oma elinympäristöni" reads as "where I live" → "Elinympäristön tutkimus: tutki ja piirrä".
18. **no G2-377** instruction says one empty line; render has two → "på de tomme linjene under".
19. **no G1-405** "Ukeplan" collides with the school homework plan → "Vaneskjema for uka".
20. **pt G2-379 title** "Hábitos de higiene" covers 2 of 5 habits → head covering all five.
21. **pt G2-384 / G2-385** render 4 capitals / 4 pairs where the config asks 5 (page fit) — confirm intended.
22. **da G3-401** first sentence has one free line, the others two; instruction says two.
23. **it G2-386** "puntini e taglietti" rule has nothing to act on in "leone" — minor.

## D. Environment note (not a content defect)
The cursive ink-extent checks (`verify-b6-cursive-writing.js`, `cursive-metrics --check`) fail by 1–2 px on the
Linux cloud Chromium, including EN pages recorded clean on the Windows PC: font rasterisation differs. Re-run the
cursive gate on the PC before publishing; do not move the ±1.2 px tolerance.
