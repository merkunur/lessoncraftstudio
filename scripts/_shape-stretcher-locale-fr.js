/* fr — linguist vetoed étiquette/marque/repère/vignette (owned, or a reward sticker) and ruled LE TÉMOIN, LA VITRE, LA FORME; the CP/CE1 teacher reordered the routine (make a témoin hold BEFORE turning — at open one holds ~2% of the time) and made the right-angle line number-neutral (a triangle only ever has ONE); marketing took « l’abonnement Enseignant », never "Premium". */
module.exports = {
  /* L’ÉTIRE-FORME — a French V+N compound (tire-bouchon, essuie-glace), 0 hits
     on both surfaces. « Le Penche-forme » was vetoed: one phoneme from
     « la plate-forme ». */
  title: "L’Étire-forme",

  /* REBUILT, not translated. The English says "watch the tags" first — but a
     témoin holds at open with probability ≈2%, so 98% of classes are told to
     watch nothing. Make one hold FIRST, then turn. */
  instruction: "Étirez la forme ou penchez-la jusqu’à ce qu’un témoin tienne. Tournez-la ensuite autant que vous voulez : aucun témoin ne s’en va. Gardez une forme à côté sur la vitre, et vous en avez deux sous les yeux en même temps.",

  /* the three tracks — parallel infinitives, 6/7/7 characters.
     « Pencher » carries the shear honestly in French: l’écriture penchée is
     exactly a slant, not a rotation. « Étirer », not « allonger » — you stretch
     dough and it thins; the whole never grows, so « allonger » would be false
     (and « s’allonger » is already a vetoed verb on this shelf). */
  lenLabel: "Étirer",
  skewLabel: "Pencher",
  turnLabel: "Tourner",

  /* controls — house infinitive style */
  keep: "Garder celle-ci à côté",
  drop: "Ranger la forme gardée",
  deal: "Partir d’une autre forme",
  quarter: "Un quart de tour",
  print: "Imprimer la fiche",

  /* aria. NO pose token and NO pose CLAIM. The English now says "leaning",
     which is false at the one state that matters most — rot=0, theta=90, k=0,
     the upright square the child has just built — and it borrows `skewLabel`'s
     own verb (Lean) as a constant, so it asserts a skew the model may not have.
     Pose-neutrality is this tool's whole theorem; the aria states what the
     shape IS and lets the tags line, appended immediately after in _paint,
     carry everything that is actually true. */
  ariaShape3: "Une forme à trois côtés.",
  ariaShape4: "Une forme à quatre côtés.",

  /* both témoins together is reachable ONLY at n=4, k=0, theta=90 (no right
     equilateral triangle exists), so the plural is safe here — and here only. */
  /* ⚠ FOLD REPAIR (not the panel's wording): the authored value described
     the right-angle témoin as « les angles sont droits » while `Right`
     below describes the SAME témoin as « l’angle droit est marqué ». The
     new English exists precisely to end that split ("the SAME tag was
     described two ways depending on whether the other tag happened to be
     holding"), and the only channel that hears this sentence has no
     picture to reconcile the two against. The right-clause is therefore
     the panel's OWN `Right` clause, verbatim — nothing new is written. */
  sayTagsBoth: "Les deux témoins tiennent : tous les côtés ont la même longueur, et l’angle droit est marqué.",
  sayTagsEqual: "Un témoin tient : tous les côtés ont la même longueur.",
  /* COUNT-FREE, and deliberately not existential. Reachable counts are exactly
     one (n=3) and exactly four (n=4, theta=90, k≠0), so any count is wrong at
     one end — and French `un` is article AND numeral, so "il y a UN angle
     droit" is heard as a count at the four-corner end. The adjective route is
     booby-trapped: `rectangle` is French for right-angled (un triangle
     rectangle) but names a different quadrilateral, and at n=4 it would also
     classify the shape aloud, which is the child's job. Definite `l’` is
     unambiguous, and naming the MARK is exactly what the aria consumer needs. */
  sayTagsRight: "Un témoin tient : l’angle droit est marqué.",
  sayTagsNone: "Aucun témoin ne tient.",
  ariaKept: "Une forme gardée est posée à côté, pour comparer.",

  /* a property, never a performance — and exactly as loud coming back as going.
     s’en va / revient is a perfectly symmetric French pair; the English
     "let go" / "went back on" is not, which quietly breaks the tool's own
     T_POP === T_SEAT law in the copy. */
  saidPop: "Un témoin s’en va.",
  saidSeat: "Un témoin revient.",
  /* always exactly a quarter turn (the ⟳ button and Enter on the rail both go
     through the same reducer), and true even when nothing is holding. */
  saidTurn: "Un quart de tour : rien ne change pour les témoins.",
  saidKept: "Gardée. Bougez l’autre, et regardez-les toutes les deux en même temps.",
  saidNoKeep: "Il y en a déjà une gardée à côté.",
  /* the English tells the class to turn it first, which shows nothing on a
     fresh shape. Make a témoin hold first. */
  saidDealt: "Une autre forme. Faites d’abord tenir un témoin, puis tournez-la.",

  /* settings */
  sidesLabel: "Combien de côtés",
  sidesFour: "quatre côtés",
  sidesThree: "trois côtés",

  /* the sheet draws ONE shape whenever nothing is kept — which is the default —
     so the French names the vitre instead of counting shapes. */
  sheetTitle: "La vitre telle que la classe l’a laissée, et de quoi écrire",
  /* ⚠ FOLD REPAIR (not the panel's wording): « une forme ... sur chaque
     ligne » promised one shape per ruled line; the lines are blank and the
     sheet draws none on them. The false NP is excised and the panel's own
     « ce qu’on peut ... dire » kept, its dangling « en » resolved to the
     panel's own noun « la forme ». NEEDS NATIVE SIGN-OFF. */
  sheetHint: "Sur chaque ligne, ce qu’on peut dire de la forme.",

  /* verified against the code: `premium` gates _print and _buildSheet ONLY —
     every form, all three movements, the témoins and the kept shape are free.
     The claim is true. */
  lockedTitle: "La fiche fait partie de l’abonnement Enseignant",
  lockedBody: "Tout l’appareil est gratuit : chaque forme, les trois mouvements, les témoins et la forme gardée. L’abonnement Enseignant ajoute la fiche imprimée, qui reprend la vitre telle que la classe l’a laissée, avec des lignes pour écrire.",
  /* ⚠ FOLD: `gateClose` deleted — the tool does not declare it (the paid
     gate is an inline panel with no overlay and no close control). */
  gateCta: "Voir l’abonnement Enseignant"
};
