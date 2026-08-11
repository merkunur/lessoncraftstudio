'use strict';
/* Danish — TOOL #56, round 2. Authored by the native panel, verbatim.
   ONLY the keys that differ from the `da:` block currently in
   `scripts/_the-gap-strings.js`. Everything else is already correct on
   disk and is deliberately omitted — `ariaGap`, `saidTryOff`,
   `saidLocked`, `gateCta` and `gateClose` are already the panel's values.

   TWO SITES JUDGED ON DANISH'S OWN MERITS AND DELIBERATELY NOT CHANGED:
     `test` stays 'Prøv med'. The English shortened to 'Try' because
       "Try this many 7" was ungrammatical; Danish never broke there.
       It is only ever concatenated (t('test') + ' ' + |k|) -> "Prøv med 7",
       and `med` is the Danish idiom for trying a number. ⚠ It is
       grammatical ONLY in composition; surfaced standalone it dangles.
     `ariaEnd` stays full sentences. The English moved to a label:value
       form; Danish has no defect at that site — no agreement, no noun,
       grammatical at {m}=1 ("Nu er der 1 på jorden") — and full sentences
       read better through a screen reader. The colon style belongs to
       `sayBefore`/`sayAfter`, which are the VISUAL `_say` line. */
module.exports = {
  /* "aldrig hvor meget" -> "hvor mange": kastanjer are COUNTABLE, and
     Danish `hvor meget` is mass-only. Trailing "se det" -> "se dem" so
     the pronoun points at kastanjerne instead of at nothing. */
  instruction: 'Tæl kastanjerne på jorden. Så kommer mellemtiden, hvor kastanjerne ikke er at se: jorden ligger der stadig, og den røber kun, om der kom noget ind, eller om der gik noget ud — aldrig hvor mange. Når mellemtiden er forbi, så tæl igen, og find ud af, hvad der skete, mens I ikke kunne se dem.',

  /* `_again` calls newState(), which deals a whole scene — a new `n` AND
     a new hidden `k`. "Nye kastanjer" named only the dots and said
     nothing about the change that is now waiting. Parallel to `run`
     ('Lad mellemtiden gå'), so the two setup controls share one shape. */
  again: 'Lad noget andet ske',

  /* ⚠ KILLS THE `talte` HOMOGRAPH — tælle->talte (counted) and
     tale->talte (spoke) collide in Danish, and there is NO escape:
     Norwegian's fix `telte` means TENTS here. Fixed by changing the
     CONSTRUCTION, not by swapping a synonym — an existential that reuses
     the tool's own verb from `ariaStart` ("Der ligger {n} kastanjer på
     jorden"). Fronted PP gives correct V2 inversion, and it carries NO
     noun, so {m}=1 is safe (reachable in 22 of 240 scenes). */
  ariaTry: 'Forslaget er {k}. Fra {n} lander det på {r}. På jorden ligger der {m}.',

  /* follows `again`: echoes "noget andet" so the button and the thing it
     announces are one act. "dem" -> "kastanjerne" because the plural
     antecedent ("Nye kastanjer") is gone. */
  saidDealt: 'Nu er der noget andet på vej. Tæl kastanjerne på jorden, før I går i gang.',

  /* `_buildSheet`: bands = (s.phase === 'after') ? [s.n, s.m] : [s.n].
     "før og efter" promised TWO bands and is false in phases `before`
     and `gap`, which is exactly when a teacher prints during setup.
     Singular "som klassen så den" is true at one band and at two.
     `jorden` is common gender, so the pronoun is `den`. */
  sheetTitle: 'Jorden, som klassen så den — og plads til at skrive, hvad der skete',

  /* the sheet is PRINT-ONLY (.crt-sheet{display:none} + @media print), so
     this is read on paper with a pen in hand — and `_buildSheet` draws a
     FIXED SIX ruled lines. A descriptive "En linje til hver mellemtid" is
     false in both directions (three gaps leave three spare, nine run
     out). The imperative is simultaneously the truer reading AND the
     Danish worksheet convention, so there is no trade-off to weigh. */
  sheetHint: 'Brug en linje til hver mellemtid, klassen har set, og skriv det regnestykke, der hører til.',

  /* the sentence the money is taken on, carrying TWO overclaims:
     (1) "hvor jorden står før og efter" — same one-band falsehood as
         sheetTitle; now the SAME formula as sheetTitle, so the sales
         panel and the printed sheet describe ONE artefact in one voice.
     (2) "de regnestykker, klassen SKREV" — past tense implies the sheet
         carries a record. It does not; the lines are blank, and the file
         states the platform ruling verbatim ("RULED LINES, NOT A CAPTURED
         RECORD", class-graph.js:62). Now "klassen selv SKRIVER".
     ⚠ Avoids "hvor jorden er tegnet": `tegnet` is both the participle of
     `at tegne` and the definite of `et tegn` (the sign). The
     med-construction sidesteps it and reads better. */
  lockedBody: 'Alt her er gratis — hver eneste mellemtid, jorden og lige så mange forslag, som klassen har lyst til. Lærerabonnementet giver desuden det printede ark med jorden, præcis som klassen lige har set den, og med linjer til de regnestykker, klassen selv skriver.'
};
