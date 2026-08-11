'use strict';
/* =====================================================================
   Italian — TOOL #56 "THE GAP", round 3. Authored by the native panel,
   verbatim. ONLY the keys that change from `_the-gap-strings.js` it:.
   LA RIVA · I SASSI · IL FRATTEMPO · la prova.
   ---------------------------------------------------------------------
   ⚠ SCOPE OF THIS REVISION: ONE KEY. Baseline re-read immediately before
   writing (md5 ae04d0e5cb8a6d5c3081f0c76e744ddf): the round-2 eight are
   ALREADY MERGED, so `ariaEnd`, `saidMidRun`, `again`, `saidDealt`,
   `sheetTitle`, `sheetHint` and `lockedBody` are unchanged and are
   deliberately ABSENT here rather than re-sent — re-sending a merged
   value invites a second merge that could clobber a later edit.
   ===================================================================== */
module.exports = {

  /* `mai quanto` -> `mai quanti sassi`. THREE findings in one fix:

     1. QUANTO IS WRONG FOR THE MATHS. Invariable `quanto` is the mass /
        neuter quantity ("non so quanto"), and it is grammatically
        defensible after `qualcosa` — but it construes the change as an
        AMOUNT. What crosses the riva is a count of discrete sassi
        (k in [2,15]), and the whole point of the routine is that the
        class recovers a CARDINALITY. Italian for that over a countable
        is `quanti`. Same correction as da (hvor meget -> hvor mange) and
        pt (quanto -> quantas).

     2. ⚠ MASCULINE, NOT FEMININE — DO NOT CROSS-APPLY SPANISH. es agrees
        with `marcas` (f) and correctly wrote `cuántas`; Italian agrees
        with `sassi` (m) and takes `quanti`. Per-locale gender authority
        (§A.13.58): the neighbouring locale's form is evidence about that
        locale only.

     3. ⭐ ITALIAN NEEDS THE NOUN WHERE ENGLISH DOES NOT — this is the
        rebuild, not the translation. English "never how many" is bare
        because "how many" does not inflect. Italian `quanti` must choose
        number, and the nearest subject is `qualcosa` (SINGULAR), so a
        bare `mai quanti` leaves a plural dangling against a singular
        antecedent with its real referent a full sentence away. Naming
        `sassi` licenses the plural outright. The repetition is a feature
        in an instruction read aloud to six-year-olds, not a blemish. */
  instruction: 'Contate i sassi sulla riva. Poi arriva il frattempo e i sassi non si vedono più: la riva resta, e dice soltanto se qualcosa è entrato o se è uscito, mai quanti sassi. Quando il frattempo è passato, contate di nuovo e ragionate su che cosa è successo mentre i sassi non si vedevano.'

};
