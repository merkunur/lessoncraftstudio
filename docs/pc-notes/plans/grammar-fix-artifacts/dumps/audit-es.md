# Audit — Spanish (es) — dump-es.txt — ROUND 2

Auditor role: native Spanish linguist + maestro de educación infantil/primaria.

VERDICT: 0 ERRORS, 1 MINOR

## Round-1 fixes verified

- **E2 FIXED** — `in` is now "dentro de" everywhere ("{img} está dentro de un círculo", child types "dentro de"); "en" no longer appears in any answer, typed string, or tap-option pool. Checked every `in` block and every option list (lines 59–486): zero occurrences of bare "en" as an option. The option inventory is now cleanly discriminable for a child: dentro de / encima de / debajo de / al lado de / detrás de / delante de / por encima de / entre.
- **E1 FIXED** — every `above` block now reads `por encima de / dentro de / debajo de` (e.g. lines 83–86, 116–119, …, 479–482): "encima de" never appears as a distractor for "por encima de", and no `on top of` block offers "por encima de". The near-synonym pair is structurally separated.
- **M1 FIXED** — line 561: `'¡Rodea la imagen que muestra la preposición correcta!'` — consistent with the find-and-count verb.
- **M3 FIXED** — line 523: title `'Veo, veo'`.
- **M4 FIXED** — line 533 `"title":"Encuentra y cuenta"`, line 628 `"title":"Práctica de preposiciones"` — RAE-correct casing.
- **M2 acknowledged-kept** — "empiezan con la letra {letter}" (line 497). Accepted: "empezar con" is correct pan-Hispanic Spanish; "por" is only a Spain-preference. No further objection.
- **Pluralia-tantum landmarks refused** — no "tijeras"-class noun appears in any singular "un/una ___" frame; "todas las tijeras" survives only in find-and-count plural contexts (46–49, 56), where it is correct.

## New round-2 content checked

- Lines 26–29 `[it-s-impura-masc]` "todos los avestruces" — correct: "avestruz" is masculine (un avestruz — the el-before-tonic-a rule does not apply, and the noun is masculine regardless), plural "avestruces" with c, "todos los" agrees. OK.
- Lines 455–486 `custom-boiled-egg` "un huevo cocido" / "dos huevos cocidos" — noun-adjective agreement correct in singular and plural; "huevo cocido" is natural (in Spain "huevo duro" is also common, but "cocido" is fine and pan-Hispanic). "está dentro de un huevo cocido" is semantically whimsical but grammatical — same locked-design note as "dentro de un gato". OK.

## Remaining finding

### M-1 (carried over, round-1 M5) — vocab-filter warning tense mix not applied to es
Line 633: `"Algunas imágenes no se pueden usar como referencia en este idioma y se reemplazaron por figuras básicas."`
The English sibling was updated this round to "have been replaced" (line 630), but the es string still combines present "no se pueden usar" with pretérito indefinido "se reemplazaron". Grammatical, but the perfect matches the aspect better and reads more natural, especially in Spain: "…y se han sustituido por figuras básicas." (or "se han reemplazado"). MINOR — teacher-facing tooling string, not child-facing.

## OK-NOTES (no change needed)

- y→e: line 42 "…y todas las iguanas" — "y" remains correct (following word is "todas"); no dump line requires "e".
- todos los / todas las agreement re-checked across lines 2–49 including the new avestruces block: all correct.
- ¿…? / ¡…! marks all present and gender-correct (52–56, 523, 533, 560–561, 628).
- un/una and plural landmark forms all correct, including "dos huevos cocidos", "dos tulipanes", "dos corazones".
- "entre dos estrellas" frames unchanged and correct; typed answer "entre" is what a teacher would accept.
- SR templates (610–611) still say "la preposición" while the correct answers now include locutions ("dentro de", "por encima de") — in Spanish primary pedagogy these are taught as "preposiciones y locuciones preposicionales", but calling them "preposición" on a K-3 worksheet is normal simplification. No change needed.
