# Audit FR — dump-fr.txt — ROUND 2 (native French linguist + professeur des écoles, cycles 1-2)

VERDICT: 1 ERROR, 1 MINOR

## Round-1 fixes verified as applied (all correct)

- **E1 fixed** — header now `Compte les objets et écris le nombre !` (espace before `!`). ✓
- **E2 fixed** — fallback now `Trouve les objets cachés dans l'image ci-dessous :` (espace before `:`). ✓
- **M1 applied** — `"score":"{n} bonnes réponses sur {total}"` and `"correct":"correctes"` in BOTH STRINGS_ALL. ✓ grammatical for n ≥ 2 — but see E3 below for the n = 1 edge.
- **M2 fixed** — `"title":"Trouve et compte"`. ✓
- **M4 applied** — square consigne is now `Encadre tous les / toutes les …` on every line (3, 7, 11, 15, 19, 23, 27, 31, 35, 39, 43, 47), with tous/toutes agreement intact throughout. ✓
- **Distractor exclusion verified** — every «on top of» item offers `sur / dans / sous` (no au-dessus) and every «above» item offers `au-dessus / à côté / au-dessous` (no sur); «sous» and «au-dessous» still never co-occur. No near-synonym ambiguity remains in any tap pool. ✓

## ERROR

### E3 — Score template ungrammatical at n = 1 (and strictly at n = 0) — both STRINGS_ALL, fr
Dump lines: find-and-count and prepositions `"score":"{n} bonnes réponses sur {total}"`.
A child scoring one out of five sees «1 bonnes réponses sur 5» — a visible agreement error on the celebration/score line (and purist French uses singular after zéro too: «0 bonne réponse»). Introduced by the round-1 M1 fix; my earlier suggestion did not guard the singular.
Fix (agreement-free, no pluralization logic needed): `"score":"Bonnes réponses : {n} sur {total}"` — the noun becomes a label, so any n renders correctly. (Alternative if the engine supports plural forms: `1 bonne réponse sur {total}` / `{n} bonnes réponses sur {total}`.)

## MINOR

### M3 (carried, deferred by coordinator) — find-and-count title «Je vois, je vois»
Grammatical and recognizable; the established French genre label for count-the-hidden-objects material is «Cherche et trouve». Product-naming decision — already flagged to operator; no further action from this audit.

## New round-2 content checked (clean)

- **`it-s-impura-masc` — «toutes les autruches»**: *autruche* is FEMININE in French, so `toutes` is the correct agreement (the "masc" in the case label refers to the Italian trigger noun, not the French one). Entoure/Encadre/Barre/Compte lines all correct.
- **`custom-boiled-egg` — «un œuf à la coque»**: all eight frames grammatical — `dans / sur / sous / derrière / devant un œuf à la coque`, `à côté d'un œuf à la coque`, `au-dessus d'un œuf à la coque`, `entre deux œufs à la coque` (correct compound plural *œufs*, invariable *à la coque*). Elision `d'un œuf` correct. («dans un œuf à la coque» is semantically whimsical but that is operator content — same standing OK-NOTE as *dans un chat*.)
- All other fr statics re-checked and unchanged-or-fine: blInstructions, SR_Q_PREFIX `Question {n} :`, prepositions headers, SR_PREP_TPL (all French colon/exclamation spacing correct), vocab-filter warning, «Combien de hérissons ?» h-aspiré still handled correctly.
