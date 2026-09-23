# nt10-E landing-panel findings, round 1 (en · de · es · pt, 2026-09-23)

Raw per-locale lists: `scripts/worksheet-gen/out/b5-findings-<loc>.txt` (the `findings` array of
`i18n/.landing-b5-<loc>.json`). This file sorts them into LOCALE-NEUTRAL generator/gate defects
(fixed once, for every locale) and LOCALE DATA defects (fixed per locale by a native hand).

## A. Locale-neutral: generator + gate (confirmed by ≥2 panels unless noted)

| id | defect | fix direction |
|---|---|---|
| G1-383 | square riddle never offered with rectangle (hard-coded) → only corner-counting; two riddles of one shape state one fact; bank riddles fit rhombus/parallelogram in de/pt | the confusable neighbour is always among the options (square↔rectangle, circle↔oval if drawn); ≤1 riddle per shape-fact per page; ≥4 distinct answers per page; bank rule in EVERY locale: square/rectangle riddles state right ("book") corners |
| K-372 | K dot-paper given edges tilted (above K band, de/en/es) | axis-aligned given edges at K |
| K-371 / G1-381 | rounded-corner tablet is a "rectangle" on K-371 and "not real" on G1-381 | drop rounded-corner objects from K-371 |
| K-374 | two "look left" cards differ only by arrow style → steps swappable | no two cards may carry the same action; redesign the sequence so every card is visibly distinct |
| G2-366 | answer boxes 2/4/2 reveal stage counts; strings call eggs/pupae "young animals" (en/de/es/pt) | equal group sizes (G2-360 precedent); strings say "stage" |
| G1-376 | fruit tag and seed tag both on the pea pod, ~5 px apart; fruit ring reads as a seed | fruit tag on the pod tip/wall; gate: label targets ≥ min distance, never both inside one organ outline |
| G2-363 | pea picture = open pod (the fruit) while the answer is seed | picture/answer agree |
| G1-379 | 6 legend symbols, 5 count boxes (bench uncounted) | a count box for every legend symbol, or the legend lists only counted symbols |
| G2-371 | no legend; house/tent symbols unnamed; tent X reads "wrong" | a legend; no unnamed symbol |
| G1-378 | a fact names a column head (de "um die Erde"); "is a star" + "own light" = one fact twice | gate every locale: no fact contains any column-head name; facts carry a concept id, ≤1 per concept per page |
| G1-397 | the answer is always the longest word (es; check all) | gate: answer strictly-longest share ≤ 60 % per page, per locale |
| G2-376 | every definition contains the key's meaning word (en/es) | bank rule every locale: the definition may not contain the key gloss |
| G2-374 | "said" frames where "said" cannot stand (en 4/6) | bank rule: every frame grammatical with the plain verb |
| K-370 | bottom third blank (en) | FILL ≥ 85 % |
| G1-387 | 13 frames, 12 name lines; bare twig reads as a missing frame | one line per frame; no orphan twig |
| G2-364 | "bright colours" on uncoloured line art | strings describe what is drawn (or colour the petals) |
| G3-398 | "at work" over children at play; not all items are -er agents (en music→musician, de Foto→Fotograf) | items obey the family's agent rule per locale; instruction names what is drawn |
| G3-399 / G2-373 | instructions name a stone / socks the render does not draw (de/es/pt) | strings name the drawn apparatus (plates, cards) |

## B. Locale data (native fixers, per locale)
de: G2-359 stem case (Spiel vs wohn), G2-375 example "Arbeit" vs bound stems, G2-367 adjective vs name + two lines for one word, G2-362 Klasse-2 register, G1-396 "vergöttern", G2-358 brüllen → two answers, G2-361 "Kinder" pulls to Z 136, G1-394 Schaf reads as Lamm, G1-380/397 Rutsche picture reads Klettergerüst, K-369 "was du tun musst" over car lights.
es (es-MX): G2-375 marinero/marino/marítimo share "mari", G2-361 row 1 fits the crossing sign, G2-367 cuarto creciente, G3-392 tallo vs "part of a flower", K-376 singular "la planta", G3-399 "la piedra" (two stones), G1-396 aporrear, G2-359 panero, G2-373 repeats base pairs.
pt: G2-358 bravo = brave AND angry (two right answers), G2-375 card 7 escola/escolar/extraescolar share "escol", G3-399 "da pedra" ambiguous with the root pedra, G1-382 reuse note, K-376 singular.
en: G1-384 school vs crosswalk meanings overlap, G2-370/G3-396 Oceania vs Australia, G1-380 bathtub "tub", G1-392/394 shell vs seashell, word-parts compounds (playtime, sleepover, armrest), G1-397 flour foil for flower (homophone), G2-358 grumpy/angry.
