# Audit — Italian (it) — ROUND 2

VERDICT: 2 ERRORS, 2 MINOR

Auditor: native Italian linguist + scuola primaria educator. Full regenerated dump re-read line by line.

## Round-1 fixes verified as APPLIED and correct
- **E2 fixed:** `"correct":"corrette"`, `"score":"{n} su {total} corrette"` in BOTH apps' STRINGS_ALL. Correct. ("Tutto corretto!" rightly left as is.)
- **M2 fixed:** *in* → **dentro** throughout ("è dentro un cerchio/cubo/…", typed answer "dentro", tap option "dentro"). All frames grammatical; *dentro* + noun without *a* is correct.
- **M1 fixed:** the *above* pools are now `al di sopra di / dentro / sotto` and the *on-top-of* pools `sopra / dentro / sotto` — "sopra" and "al di sopra di" never appear in each other's pools. Verified across every shape and custom landmark.
- **M4 fixed:** "Controlla le risposte" / "Silenzia i suoni" / "Attiva i suoni" in both apps.
- **M5 fixed:** `youDidIt: "Ce l'hai fatta!"` in both apps.
- **Fixture gap closed:** `[it-s-impura-masc]` "Cerchia tutti gli struzzi" etc. — **gli** before s-impura correct in all four instruction variants.
- New irregular plural handled correctly in the *between* frame: "tra **due uova sode**" (le uova, fem. pl. + agreeing adjective) — correct.

---

## ERRORS

### E1 (NEW) — "un'uovo sodo" is ungrammatical (custom-boiled-egg, lines 455–486, 7 occurrences)
> `worksheet: {img} è __________ un'uovo sodo.` / `answered: {img} è dentro un'uovo sodo.` (and sopra/sotto/accanto a/dietro/al di sopra di/davanti a variants)

**Uovo is MASCULINE** (l'uovo, un uovo; only the plural *le uova* is feminine). The elided article **un'** is exclusively feminine (un'ape, un'isola). Before a masculine noun starting with a vowel the correct form is bare **un**: **"un uovo sodo"** — exactly the rule the engine already applies correctly to "un elefante" and "un esagono". This looks like the engine (or the vocab gender field) treating *uovo* as feminine, perhaps inferred from the feminine plural *uova*; the *between* frame ("due uova sode") is correct, so the singular gender datum is the defect.

**Fix (all 7 singular lines):** `un'uovo sodo` → `un uovo sodo`. Verify *uovo* is marked masculine-singular in the vocab/gender source; if the engine derives singular gender from the plural form, that derivation is unsafe for the uovo/braccio/dito class.

### E2 (CARRIED, escalated to operator) — plural "iguana" (lines 42–45)
> `Cerchia tutti i gatti e tutte le iguana`

Still present; image-vocabulary.js is operator-locked and the question is flagged to the operator. For the record: standard dictionaries (Treccani, Zingarelli) give *iguana* s.f., **pl. iguane** — it is NOT invariable. "Tutte le iguana" should be **"tutte le iguane"**. The "tutte le" selection is correct either way.

---

## MINOR

### M1 (CARRIED — reported applied but NOT in the dump) — "Vedo Vedo" (line 524)
> `it: { title: 'Vedo Vedo', description: ... }`

The coordinator's round-2 note says M3 ("Vedo vedo") was applied, but the regenerated dump still reads **'Vedo Vedo'** — the Spanish sibling WAS lowercased ('Veo, veo') while Italian was not. Fix: **'Vedo vedo'**.

### M2 (NEW — same convention, other title) — "Trova e Conta" (STRINGS_ALL, line 533)
> `"it":{"title":"Trova e Conta", ...}`

Round 2 harmonized sibling titles to sentence case ("Trouve et compte", "Encuentra y cuenta", "Finn og tell", "Etsi ja laske") but the Italian deck title kept mid-title capitalization. Italian does not capitalize subsequent words in titles: **"Trova e conta"**.

---

## OK-NOTES (no change)
- Article/quantifier engine correct on all stress cases including the new masculine s-impura set: *tutti i gatti / tutte le stelle / tutti gli elefanti / tutti gli zaini / tutti gli struzzi / tutte le fragole / tutti i ricci / tutti i gufi / tutte le forbici*.
- Indefinites correct everywhere except the uovo case above: "dentro **un** esagono", "**un** elefante", "**una** stella", "accanto a **un** cubo", "davanti a **un** triangolo", "al di sopra di **una** stella".
- "tra due cerchi/cubi/stelle/uova sode" all correct.
- Quanti/Quante legend questions all correct.
- Static strings (blInstructions, defaultInstruction, prepositions headers, SR templates, vocab-filter warning) unchanged for it and remain clean.
