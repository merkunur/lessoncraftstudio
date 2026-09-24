# Audit — Norwegian (bokmål) — dump-no.txt — ROUND 2

VERDICT: CLEAN

## Round-1 fixes verified applied

1. Deck runtime title now "Finn og tell" (line 533) — Norwegian single-capital title convention. ✓
2. Header description now "Tell gjenstandene og skriv tallet!" (line 529) and fallback now "Finn de skjulte gjenstandene i bildet nedenfor:" (line 515). ✓
3. Vocab-filter warning now "…og er byttet ut med enkle figurer." (line 639). ✓
4. oppå ↔ over structural exclusion verified across ALL preposition blocks: every "on top of" item offers `oppå / i / under` (never "over"); every "above" item offers `over / i / under` (never "oppå"). No option set anywhere pairs the answer with a near-synonym. ✓

## New round-2 material checked

- `[it-s-impura-masc]` "Sett ring rundt / Stryk over / Tell alle strutser" — struts → strutser is the correct plural; all four templates correct.
- `[custom-boiled-egg]` "et kokt egg" — correct neuter participle-adjective agreement (kokt, not kokte, in neuter singular); "mellom to kokte egg" — correct plural adjective "kokte" + correct zero-plural "egg". All eight frames grammatical; typed answers unchanged and correct.

## OK-NOTE (no change required)

- The bare indefinite plural in Find-and-Count instructions ("Sett ring rundt alle katter") stands per the no-derived-morphology design lock. It is grammatical bokmål; the definite "alle kattene" remains the marginally more idiomatic classroom form, recorded here only as an acknowledged design trade-off.

## Re-verified clean

- en/et agreement throughout, incl. conservative "en stjerne" (accepted masculine-declension treatment of a feminine noun).
- All "mellom to …" plurals: sirkler, terninger, sylindere, hjerter, sekskanter, kvadrater, stjerner, trekanter, katter, tulipaner, elefanter, kokte egg.
- "Hvor mange katter/stjerner/elefanter/piggsvin/sakser?" — all correct (zero-plural piggsvin, plural sakser).
- Typed answers i / oppå / under / ved siden av / bak / mellom / over / foran — exactly teacher-acceptable, invariant forms.
- Static strings: blInstructions no, SR_Q_PREFIX "Oppgave {n}:", prepositions header ("Fullfør hver setning…", "Ring inn bildet…"), SR templates, "Preposisjonsøving", and all deck UI strings — correct and natural.
