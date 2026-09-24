# AUDIT — Swedish (sv) — ROUND 2 (dump regenerated after fixes)

VERDICT: 0 ERRORS, 2 MINOR

## Round-1 fixes verified ✓

1. **M1 FIXED** — I-Spy header (line 527): now `Räkna föremålen och skriv antalet!` — exactly right; *antalet* is the correct quantity noun and *föremålen* is the right K-3 register.
2. **M2 FIXED** — square template (lines 3, 7, 11, 15, 19, 23, 27, 31, 35, 39, 43, 47): now `Rita en kvadrat runt …` throughout. Idiomatic.
3. **M3 FIXED** — hexagon block (lines 191-222): now `en sexhörning` / `två sexhörningar`. Correct en-gender, correct plural, and this is the standard lågstadiet term.
4. **New: ovanpå↔ovanför exclusion verified** — every *above* frame now offers `ovanför / i / under` (no *ovanpå*), every *on top of* frame offers `ovanpå / i / under` (no *ovanför*). The near-synonym trap is gone; all remaining distractor sets are unambiguous in their frames.
5. **New landmark custom-boiled-egg (lines 455-486)**: `ett kokt ägg` (correct neuter article + neuter adjective form *kokt*) and `mellan två kokta ägg` (correct plural adjective *kokta* + correct zero-plural *ägg*). Fully grammatical — this is exactly the agreement chain that could have broken, and it did not.
6. **New Find-and-Count item (lines 26-29)**: `strutsar` — correct plural of *struts*.
7. **Plurale-tantum refusal**: no plurale-tantum noun appears as a singular landmark in the sv dump (Swedish *sax* is an ordinary countable noun and appears only in the plural-based Find-and-Count lines, which are fine).

All round-1 clean areas re-checked and still clean: en/ett agreement, all plurals, "mellan två X", the indefinite design, "Hur många …?", typed answers, prepositions headers, SR templates, STRINGS_ALL, vocab-filter warning.

## Remaining findings

1. **MINOR** — line 513 (generic fallback): `Hitta de dolda objekten i bilden nedan:`
   Grammatical, but *objekten* is the same register issue the header fix just addressed — and the round-2 dump shows the sibling locales were updated (da → *ting*, no → *gjenstandene*, nl → *voorwerpen*) while sv kept *objekten*. Suggested: `Hitta de dolda föremålen i bilden nedan:` (or *sakerna*). Low priority.

2. **MINOR** — STRINGS_ALL find-and-count title (line 533): `Hitta och Räkna`
   Round 2 lowercased several sibling titles to native orthography (es "Encuentra y cuenta", fr "Trouve et compte", no "Finn og tell", fi "Etsi ja laske"), so the sv mid-title capital now sticks out. Swedish orthography: `Hitta och räkna`. Cosmetic; only worth doing if the house style is now sentence-case titles.

## OK-NOTES (unchanged, no action)

- "i en katt" / "ovanpå ett kokt ägg" etc. — semantically playful but grammatically flawless; locked cross-locale design.
- `Fråga {n}:` fine (*Uppgift* marginally more school-flavored); prepositions runtime uses `Uppgift` — both correct.
- `Vissa bilder kan inte användas som referens på det här språket och har ersatts med grundformer.` — still correct (da/no switched to "enkle figurer"; sv *grundformer* is equally fine, no change needed).
