'use strict';
/* French — TOOL #56, round 2. Authored by the native panel, verbatim.
 *
 * ONLY the keys that change from the `fr` block currently in
 * `scripts/_the-gap-strings.js`. Everything else there is correct and is
 * deliberately absent — including the round-1 values that have already
 * landed (`ariaGap`, `saidTryOff`, `saidLocked`, `gateCta`, `gateClose`).
 *
 * DELIBERATELY NOT CHANGED, each judged on French's own merits rather than
 * following the English:
 *   test      stays 'Essayer le nombre'. English shortened to the bare
 *             imperative 'Try', but the one call site concatenates a
 *             numeral onto it, and French wants the noun there:
 *             « Essayer le nombre 3 ». « Essayer 3 » is thinner for no gain.
 *   ariaEnd   already carries the label-then-colon shape, and it is what
 *             keeps it grammatical at the reachable {m} = 1, where the
 *             English's older « has {m} marks » form was not.
 *   sheetHint the English became an imperative naming a per-gap
 *             correspondence; the French describes the lines instead and
 *             makes no count claim, which stays true against the SIX fixed
 *             ruled lines the sheet actually builds.
 *
 * Placeholder sets match the English exactly. `again`, `saidDealt` and
 * `saidMidRun` carry none, as `_refuse` and the `saidDealt` announce both
 * call `api.t(...)` with no `_fmt`.
 */
module.exports = {

  /* Tail rot. The shipped tail « pendant qu’on ne voyait rien » says we
     could see nothing, contradicting « le sol, lui, reste visible » two
     clauses earlier in the same sentence. Only the tail moves. */
  instruction: 'Comptez les billes sur le sol. L’éclipse passe et couvre les billes un instant : le sol, lui, reste visible et montre seulement si quelque chose est entré ou sorti, jamais combien. Quand l’éclipse est finie, comptez de nouveau et cherchez ensemble ce qui s’est passé pendant que les billes étaient cachées.',

  /* « Une autre scène » named a FOURTH PART. The file's own law, line 7:
     "THE GROUND · THE MARKS · THE GAP. Three named parts, nothing else."
     But the replacement may not name the marks either — `newState()`
     returns {n, k, m}, so this control re-deals the HIDDEN k as well, and
     a label naming only the dots under-describes it. So: no noun at all.
     A verb phrase, like the English, arrived at for the same two reasons.
     « autrement » carries "something ELSE happens" — a different
     configuration, not a repeat — and the verb matches the other labels
     (Lancer…, Effacer…, Imprimer…). */
  again: 'Recommencer autrement',

  /* Was false in half its branches. `_refuse('busy', …)` fires from BOTH
     `_run` and `_again`, and « Ce n’est pas le moment de lancer l’éclipse »
     names only the first — so a teacher who pressed the re-deal was
     refused for a thing she had not pressed. This names no control. */
  saidMidRun: 'Attendez la fin de l’éclipse.',

  /* The second and only other occurrence of the fourth noun, and
     lexically bound to `again`: « On recommence » shares the verb root
     with « Recommencer autrement ». Also takes the « sur le sol »
     precision — you count what is ON the ground, not the ground. */
  saidDealt: 'On recommence. Comptez les billes sur le sol avant de lancer l’éclipse.',

  /* Promised two bands. `_buildSheet` does
     `bands = (s.phase === 'after') ? [s.n, s.m] : [s.n]`, so in phases
     `before` and `gap` the printed sheet carries ONE. True at one and at two. */
  sheetTitle: 'Le sol comme la classe l’a vu, et de la place pour écrire ce qui s’est passé',

  /* THE SAME PROMISE, from the same line of code, in the string that
     SELLS the sheet: « elle reprend l’avant et l’après ». A teacher reads
     it in the paywall panel, subscribes, prints during setup, gets one
     band. Now shares its phrasing with `sheetTitle`, so the panel and the
     sheet describe the paid thing identically. */
  lockedBody: 'Tout l’outil est gratuit — chaque éclipse, le sol et autant d’essais que la classe veut. L’abonnement Enseignant ajoute la fiche imprimée : elle reprend le sol comme la classe l’a vu, avec des lignes réglées pour écrire ses phrases.'

};
