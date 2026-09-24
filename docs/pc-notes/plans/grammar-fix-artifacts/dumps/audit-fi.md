# Audit — fi (Finnish) — dump-fi.txt — ROUND 2

VERDICT: CLEAN

All round-1 findings verified fixed; no new defects in the regenerated dump.

## Round-1 fixes verified

1. **E1 fixed** — prepositions deck runtime title is now `"Sijaintisanaharjoitus"` (line 628); consistent with the "Sijaintisanat" worksheet header and the sr-templates.
2. **M2 fixed** — default cylinder shape is now **lieriö**: all frames read "on lieriön …" / "kahden lieriön välissä" (lines 125-156); genitive *lieriön* correct. (The CUSTOM cylinder image path said to resolve to vocab "sylinterin" is NOT visible in this dump — no custom-cylinder block present. If it surfaces, *sylinterin* is grammatically correct, and for a photo of an everyday cylindrical object *sylinteri* is acceptable; only the abstract geometry shape needed *lieriö*.)
3. **M3 fixed** — find-and-count runtime title now `"Etsi ja laske"` (line 533).
4. **M4 fixed** — `"printMyWorksheet":"Tulosta tehtäväsivuni"` in both STRINGS_ALL blocks (lines 533, 628).
5. **M5 fixed** — `"unmute":"Laita äänet päälle"` in both STRINGS_ALL blocks.
6. **M6 fixed** — vocab-filter warning now "…ja ne on korvattu **peruskuvioilla**." (line 640); grammar and comma correct.
7. **Distractor-pool fix verified** — päällä and yläpuolella are now structurally excluded from each other's pools: every *above* frame offers "yläpuolella / sisällä / alla" and every *on top of* frame "päällä / sisällä / alla" (checked all 13 landmark sets). The contact/no-contact ambiguity is gone.

## New round-2 content checked — clean

- **[it-s-impura-masc] "…kaikki strutsit"** (lines 26-29): strutsi → **strutsit**, correct plural in all four templates.
- **[custom-boiled-egg] "keitetyn munan"** (lines 455-486): adjective + noun both in genitive singular with correct agreement (*keitetty muna → keitetyn munan*); "kahden keitetyn munan välissä" is exactly right (kahden + keitetyn + munan, all genitive). Natural.

## Standing OK-NOTES (unchanged, no action required)

- *sisällä* remains the correct 'in' postposition within the postposition-only design.
- All genitives across all landmarks re-verified correct (ympyrän, kuution, lieriön, sydämen, kuusikulmion, neliön, tähden, kolmion, kissan, tulppaanin, norsun, keitetyn munan, kahden).
- "{img} on kissan sisällä" remains semantically odd ("inside the cat") but is a locale-independent content matter.
- "Minä näen" as I Spy title: acceptable. "Sinä teit sen!": acceptable anglicism for this audience.
