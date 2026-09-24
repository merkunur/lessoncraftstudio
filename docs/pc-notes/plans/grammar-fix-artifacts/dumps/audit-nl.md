# Audit — Dutch (nl) — rendered worksheet sentences — ROUND 2

Auditor role: native Dutch linguist + basisschool (groep 1-4) teacher.
Scope: full line-by-line re-read of the regenerated `dump-nl.txt` (Find and Count instructions incl. new struisvogels row, legend questions, all preposition frames × 8 landmark shapes + 5 custom landmarks incl. new gekookt-ei, all static strings).

VERDICT: CLEAN

---

## Round-1 fixes verified applied

- **E1 fixed.** Prepositions nl `descriptionMultipleChoice` now reads `'Omcirkel de afbeelding die het juiste voorzetsel laat zien!'` — correct verb, now consistent with Find-and-Count's "Omcirkel".
- **M1 fixed.** Fallback now `'Zoek de verborgen voorwerpen in de afbeelding hieronder:'` — natural classroom imperative + child register.
- **M2 fixed.** I-Spy description now `'Tel de voorwerpen en schrijf het getal!'`.
- **M3 fixed.** Both STRINGS_ALL blocks now `"allCorrect":"Allemaal goed!"` (find-and-count and prepositions).
- **Structural fix verified.** *boven* and *bovenop* are now excluded from each other's distractor pools: every *above* item offers `boven / in / onder`; every *on top of* item offers `bovenop / in / onder`. No boven/bovenop co-occurrence remains anywhere in the dump. The contact/no-contact confusion risk for young children is eliminated.

## New round-2 content checked — all correct

1. **New F&C row `it-s-impura-masc`:** "Omcirkel/Zet een vierkant om/Streep … door/Tel alle struisvogels" — *struisvogels* is the correct plural; separable *doorstrepen* correctly split.
2. **New custom landmark `custom-boiled-egg`:** "een gekookt ei" — correct: *ei* is a het-noun, so the attributive adjective stays uninflected after indefinite *een* (**gekookt**, not *gekookte*). Plural frame "tussen twee gekookte eieren" — correct: inflected **gekookte** in the plural and the irregular plural **eieren**. This is exactly the inflection pattern a Dutch grammar engine must get right, and it does.
3. All previously verified material unchanged and still correct: separable-verb templates in all single/pair/triple variants, all plurals (katten, sterren, honden, appels, olifanten, rugzakken, aardbeien, egels, uilen, leguanen, scharen; cirkels, kubussen, cilinders, harten, zeshoeken, vierkanten, driehoeken, tulpen), invariant *een* frames grammatical for every landmark, "tussen twee X" plurals all correct, "Hoeveel X?" questions natural, typed answers (in, bovenop, onder, naast, achter, tussen, boven, voor) each exactly what a teacher accepts, static strings and deck UI strings natural.

## OK-NOTE (no change needed)

- "Zoeken en Tellen" (title-case second word) is app-title styling, not running text — acceptable.
- Semantic oddity "…is in een gekookt ei." is inherent to the locked custom-landmark architecture across all locales, not a Dutch defect.
