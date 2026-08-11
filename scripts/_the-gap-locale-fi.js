'use strict';
/* Finnish — TOOL #56, round 2. Authored by the native panel, verbatim.
   ---------------------------------------------------------------------
   ONLY the keys that change against the `fi:` block currently in
   `scripts/_the-gap-strings.js`. Verified before authoring: that block and
   the applied `mini tools/the-gap.js` are byte-identical across all 30
   keys (0 divergences), so either is the same current state.

   OMITTED BECAUSE THEY ARE ALREADY CORRECT, NOT BECAUSE THEY WERE MISSED:
     test        — 'Kokeile lukua' STAYS. `kokeilla` governs the PARTITIVE,
                   so a bare digit object is spoken `kokeile viisi` where
                   Finnish needs `viittä` — which a digit cannot express.
                   The head noun `lukua` carries the case so the numeral
                   stays in citation form. English could drop the noun only
                   because English has no case. Do NOT follow it.
     ariaEnd     — sentence form STAYS beside `ariaTry`'s colon form. That
                   is correct, not drift: `ariaEnd`'s {m} sits after the
                   head noun `merkkejä`, which carries the case, so
                   `merkkejä 1` is grammatical; `ariaTry`'s {m} sat in
                   total-object position, where `yksi` must inflect.
     again       — 'Uusi näytös' STAYS, and so `saidDealt` stays with it
                   (the two are lexically bound; `saidDealt` opens with the
                   same words). It is already a noun phrase, so the
                   declarative-on-a-button defect does not exist here, and
                   `näytös` (a new ACT) covers what `_again` actually does:
                   `newState()` picks a whole scene — a new n AND a new
                   hidden k — not just new marks.
     saidTryOff · saidLocked · gateCta · gateClose · instruction · ariaGap
                 — already applied and verified in the live file.
   ===================================================================== */
module.exports = {

  /* ⚠⚠ GRAMMAR, NOT TASTE. Bare `Luokka laski {m}` puts the numeral in
     TOTAL-OBJECT position, where Finnish `yksi` must inflect (`laski
     yhden`, never *`laski yksi`) while `kaksi`/`kolme`/... stay in the
     nominative. {m}=1 is reachable in 22 of 240 legal scenes (9.2%), so a
     screen reader speaks the ungrammatical form once every ten scenes.
     The colon quotes the numeral out of the case system entirely, which is
     the same escape `sayBefore`/`sayAfter` already use in this locale.
     ⚠ DEFECT-ONLY FORM: `Alussa` is RETAINED. I ruled it temporal and safe
     in the positional check, so changing it to `Ennen väliaikaa` is pure
     harmonisation — reported as taste, deliberately NOT applied here.
     Taste variant, one edit away if the operator wants it:
     'Kokeillaan lukua {k}. Ennen väliaikaa maassa oli merkkejä {n}, ja tämä ehdotus päätyy lukuun {r}. Luokka laski: {m}.' */
  ariaTry: 'Kokeillaan lukua {k}. Alussa maassa oli merkkejä {n}, ja tämä ehdotus päätyy lukuun {r}. Luokka laski: {m}.',

  /* ⚠ FIRES FROM TWO CALL SITES — `_run` and `_again` both call
     `_refuse('busy', ...)`. The old value named only the first, so a
     teacher who pressed `Uusi näytös` was refused for a väliaika they had
     not pressed. This is true from both, and names no control at all.
     Impersonal `odotetaan` is the Finnish classroom voice and avoids the
     singular/plural address clash with `saidDealt`'s `Laskekaa`.
     ⚠ NO PLACEHOLDER, and none is possible: `_refuse` calls
     `api.announce(api.t(msg))` with no `_fmt`. */
  saidMidRun: 'Odotetaan, kunnes väliaika on ohi.',

  /* ⚠ THE OLD VALUE PROMISED TWO BANDS. `_buildSheet` builds
     `[s.n, s.m]` only in phase `after`; in `before` and `gap` the sheet
     carries ONE band, which the header calls the legitimate setup print.
     PAST `näki` is the only tense true both when one band prints and when
     two do — present `näkee` would be false of the before-band in phase
     `after`. `sellaisena kuin` is this shelf's own shipped Finnish idiom
     for exactly this job (measured 2 hits, both printable-sheet titles).
     No trailing period, matching the key's existing shape. */
  sheetTitle: 'Maa sellaisena kuin luokka sen näki, ja tilaa kirjoittaa mitä tapahtui',

  /* ⚠ CHANGED FOR FINNISH'S OWN REASON, not because the English moved.
     The worksheet-convention defence (which Italian used legitimately)
     does NOT transfer here: my old relative clause `jota luokka katsoi`
     — "that the class watched" — made the caption RETROSPECTIVE, so it
     did assert something about the gaps watched, against a fixed six
     ruled lines (`for (i = 0; i < 6; i++)`). `jokaista väliaikaa kohden`
     is allocative and cannot be read as a claim about how many lines
     exist. Rebuilt on the shelf's shipped Finnish sheet-hint register
     (`Täytetään yksi rivi aina, kun jaamme jotakin.`), NOT on the English
     imperative.
     ⚠ `lasku` is this shelf's word for a number sentence (`kaikki
     jäljellä olevat laskut`); the precise OPS 2014 term is `laskulause`
     if the operator prefers the technical register. */
  sheetHint: 'Täytetään yksi rivi jokaista väliaikaa kohden ja kirjoitetaan siihen kuuluva lasku.',

  /* TWO defects fixed; everything else in the string is byte-identical so
     the diff stays auditable.
     (1) `juuri se maa ennen ja jälkeen, jota luokka katsoi` promised two
         bands in the sentence a teacher BUYS the plan on, and then the
         setup print delivers one. Now carries the SAME phrase as
         `sheetTitle`, so the sales panel and the paper name ONE artefact
         in ONE wording.
     (2) `viivat lauseille, jotka luokka kirjoitti` was PAST, but the sheet
         prints BLANK — nothing is written at print time. Now present.
     ✅ TIER CLAIM RE-VERIFIED BEFORE TOUCHING THIS SENTENCE: `premium`
     gates the printed sheet ONLY (the print button's `is-off`, the
     `beforeprint` blanking, the `_print` refusal, the gate panel). Run,
     again, clear and the ENTIRE rail are ungated, so "koko väline on
     maksuton — jokainen näytös, jokainen väliaika, maa ja niin monta
     ehdotusta" is TRUE and is retained unchanged.
     ⚠ `Täällä` (a shop-front gesture) and `maksuton` (3 shelf hits against
     `ilmainen`'s 47) remain REPORTED TASTE and are deliberately NOT
     applied. No efficacy claim; the plan name is `Opettajatilaus`, never
     "Premium" (53 Finnish shelf strings still carry that dead name). */
  lockedBody: 'Täällä koko väline on maksuton — jokainen näytös, jokainen väliaika, maa ja niin monta ehdotusta kuin luokka haluaa kokeilla. Opettajatilaus tuo lisäksi paperipohjan, jossa on maa sellaisena kuin luokka sen näki, ja viivat, joille luokka kirjoittaa lauseensa.'
};
