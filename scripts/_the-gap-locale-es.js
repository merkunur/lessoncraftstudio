'use strict';
/* Spanish — TOOL #56, round 2. Authored by the native panel, verbatim.
   ONLY the keys that change against the current `es:` block in
   scripts/_the-gap-strings.js. Everything omitted is deliberately held.

   Held after review, with reasons (do NOT "fix" these later):
   - test  = 'Probar con'  : «Probar 3» reads as *attempt number 3*, the
             same trap Italian named for *Prova 3*. Spanish needs the
             preposition; the concatenation yields «Probar con 3».
   - ariaEnd: label form kept on Spanish grounds, not English's — prose
             breaks at m=1 («hay 1 marcas») and Spanish has no light
             escape equivalent to Swedish *antalet*.
   - again = 'Empezar con otras marcas' : already an INFINITIVE control
             label, so it never carried the English declarative defect.
             `newState()` picks a whole scene (new n AND new hidden k),
             and «Empezar» frames a new ROUND rather than new dots — so
             the under-description that sank 'New marks' does not apply.
             An earlier «Otras marcas» proposal of mine is WITHDRAWN for
             exactly the reason 'New marks' was reversed: it names only
             the marks. Alternatives clash with `run` («Pasar por el
             parpadeo») on the *pasar/parpadeo* lexicon.
   - saidDealt: «Otras marcas» is a true announcement of what changed on
             the ground and claims nothing about the hidden k.
   - lockedTitle: already correct.
   - saidTryOff / saidLocked / gateCta / gateClose: already shipped
             verbatim as authored; no change. */
module.exports = {
  /* «mientras nadie miraba» was already repaired upstream; what remains
     is (a) «las marcas que hay» to match the instruction's own subject,
     (b) «ninguna» once *marcas* is established, and (c) the agreement
     fix: «cuánto» is mass/uncountable and wrong over countable *marcas*
     — the same defect class as Danish *hvor meget* and Portuguese
     *quanto*. Feminine plural «cuántas» agrees with *marcas*. */
  instruction: 'Cuenten en voz alta las marcas que hay sobre el suelo. En el parpadeo no queda ninguna a la vista: lo único que se sigue viendo es el suelo, y el suelo solo dice si algo entró o si algo salió, nunca cuántas. Cuando el parpadeo termina, vuelvan a contar y averigüen qué pasó mientras las marcas no se veían.',

  /* Fires from BOTH `_run` and `_again`. The old text ended "empiecen con
     otras marcas", which is the label of the very button that fires it
     from the second site — circular in the easier branch to hit. True at
     both sites, carries no placeholder, and no longer collides with
     `gateClose` («Ahora no»). */
  saidMidRun: 'Esperen a que termine el parpadeo.',

  /* `bands = (s.phase === 'after') ? [s.n, s.m] : [s.n]` — in `before`
     and `gap` the sheet carries ONE band, so «antes y después» was false
     in two of three phases. True in all three. */
  sheetTitle: 'El suelo tal como lo vio la clase, y espacio para escribir qué pasó',

  /* `_buildSheet` builds SIX fixed ruled lines (`for (i = 0; i < 6; i++)`),
     so the descriptive reading («Una línea para cada parpadeo…») states an
     allocation the paper does not honour. The ustedes imperative is this
     tool's own register — «Cuenten», «vuelvan», «averigüen», «Cuéntenlas»,
     «Esperen» — so this is Spanish's house voice, not an English shape. */
  sheetHint: 'Usen una línea para cada parpadeo que vio la clase y escriban la operación que le corresponde.',

  /* Two fixes. «Aquí todo es gratis» was contradicted by its own next
     sentence (the sheet is not free); the English scoped the claim to the
     apparatus and Spanish had widened it. And «el antes y el después»
     repeated the one-band over-promise from `sheetTitle` — on the one
     sentence the money is taken on. Now repeats `sheetTitle` verbatim so
     the sales panel and the printed sheet name ONE artefact. */
  lockedBody: 'Usar el instrumento es gratis: cada parpadeo, el suelo y todas las ideas que la clase quiera probar. El plan Docente añade la hoja impresa, que lleva el suelo tal como lo vio la clase, con renglones para escribir qué pasó.'
};
