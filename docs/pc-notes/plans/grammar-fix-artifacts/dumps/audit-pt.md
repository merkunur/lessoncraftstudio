# Audit — pt (Brazilian Portuguese, você-form canonical) — ROUND 2

VERDICT: CLEAN

All round-1 findings verified fixed in the regenerated dump:

- **E1 fixed** (line 498): letter-spotting template now você-form — "Encontre todas as imagens que começam com a letra {letter}." ✓
- **E2 fixed** (line 525): header now "Conte os objetos e escreva o número!" ✓
- **M1 fixed** (lines 533, 628): both pt STRINGS_ALL blocks now "correct":"corretas" and "score":"{n} de {total} corretas" ✓
- **M2 fixed**: [above] frames now offer "acima de / dentro de / embaixo de" (no "em cima de"); [on top of] frames offer "em cima de / dentro de / embaixo de" (no "acima de") — the near-synonym pair is structurally excluded from each other's distractor pools in every block checked (circle, cube, cylinder, heart, hexagon, square, star, triangle, all customs) ✓
- **M3 fixed**: every [in] frame now reads "está dentro de um/uma …" with typed answer "dentro de" — the canonical BR spatial-notions term ✓
- Prepositions runtime title now "Prática de preposições" (sentence case, consistent with es/fr siblings) ✓

## OK-NOTES (no change needed)

1. **New block "todas as avestruzes"** (lines 26–29, tag it-s-impura-masc): "avestruz" is registered in BR dictionaries (Michaelis, Aulete) as both masculine and feminine; feminine "a avestruz / todas as avestruzes" is fully acceptable — agreement is consistent (todas as … avestruzes). No fix.
2. **New landmark "ovo cozido"** (lines 455–486): all frames correct, including plural adjective agreement in the between-frame "entre dois ovos cozidos".
3. dois/duas, todos os/todas as, Quantos/Quantas agreement remains correct throughout; "em cima de um", "na frente de um", "embaixo de" (one word), uncontracted "de um/uma" all correct BR forms; all static pt strings (headers, SR templates, runtime UI, vocab-filter warning) remain correct você-form BR register.
