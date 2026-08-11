/* it — linguist ruled la figura / il riquadro / la targhetta (segno + cartellino + tacca + etichetta all measured OCCUPIED or INVERTED on this shelf); teacher rebuilt instruction + saidDealt because ~98% of openings carry NO tag, and made the right-angle strings number-neutral because "square corners" is plural-false for a triangle; marketing wrote "il piano Insegnante" (the shipped plan name — "Premium" is 24x in this file and 1x in it.json) after verifying only _print/_buildSheet is actually gated. */
module.exports = {

  /* THE TOOL. Names the two moves that change what the figure IS, and
     omits the one that changes nothing — the thesis in the title. Adds no
     fourth noun: only "figura". "La figura elastica" was REJECTED —
     unit-handle #43 ships "L'unità elastica". */
  title: "Allunga e inclina la figura",

  /* REBUILT, not translated. The English opens "watch the tags" and a tag
     is present at open with p ~ 2%: the child is told to watch a thing
     that is not there, and step 1 of the routine ("turn it — did anything
     come off?") is vacuous with nothing on. Italian therefore sends them
     to MAKE a tag appear first, then restages the turn. */
  instruction: "Gira la figura quanto vuoi: non se ne va niente. Allungala o inclinala finché non compare una targhetta, poi girala ancora e guarda che cosa succede. Tieni una figura da parte, accanto a quella che hai in mano, e le vedi tutte e due insieme.",

  /* the three tracks — 7 / 7 / 4 characters, all under the 12 the
     72px .shp-tlabel allows. Three imperatives, one part of speech.
     "Piega" refused: folding-sheet #35 is "Il foglio che si piega". */
  lenLabel: "Allunga",
  skewLabel: "Inclina",
  turnLabel: "Gira",

  /* controls. "questa" / "l'altra" agree with la figura (f). The keep
     label promises nothing about putting it back, because the tool has no
     path that does. */
  keep: "Tieni questa da parte",
  drop: "Rimetti a posto quella tenuta da parte",
  deal: "Comincia da un'altra figura",
  quarter: "Un quarto di giro",
  print: "Stampa la scheda",

  /* aria. The degree numeral is gone from the model, so it is gone here.
     ⚠ The new English appends ", leaning." and Italian does NOT follow it:
     `setRot(st,0)` is legal and `theta=90` is a Lean detent, so
     {n:4,k:20,theta:90,rot:0} — an UPRIGHT RECTANGLE — is one tap and one
     Enter away, and "leaning" is flatly false there. It also re-imports a
     POSE word into a string that states what the shape IS, in a tool whose
     theorem is that pose says nothing. A plain statement, and nothing else. */
  ariaShape3: "Una figura con tre lati.",
  ariaShape4: "Una figura con quattro lati.",

  /* ⚠⚠ BARE NOMINAL AFTER THE COLON — the label register, which is what a
     tag literally is. The peer's hazard (b) is REAL and I withdraw the
     definite singular: Italian's definite singular reads as generic only
     with no competing concrete referent, and here four right angles are on
     screen, so "l'angolo retto" picks out ONE of them — the same counting
     defect from the other end. Worse, sayTagsBoth is reachable ONLY at
     n=4 (at n=3, equal needs k=0&theta=60 while right needs theta=90 or
     theta=60&k=+/-40 — incompatible), so it is spoken EXCLUSIVELY in the
     four-right-angles state. A bare nominal carries no article, no numeral
     and no plural commitment, so it counts nothing at either n.
     ⚠ "rettangola" REFUSED: it is the correct Italian adjective, but in
     Italian "rettangolo" is the NOUN for the rectangle, so it would name
     the answer the routine exists to make the child say. */
  sayTagsBoth: "Ci sono tutte e due le targhette: lati tutti uguali e angolo retto.",
  sayTagsEqual: "C'è una targhetta: lati tutti uguali.",
  sayTagsRight: "C'è una targhetta: angolo retto.",
  sayTagsNone: "Non c'è nessuna targhetta.",

  /* ⚠ the English says "for comparison", but keep() copies the LIVE
     shape, so at the instant this string is emitted the two figures are
     IDENTICAL and there is nothing to compare yet. This one is true in
     the state that creates it. */
  ariaKept: "Accanto c'è la figura che hai tenuto da parte.",

  /* said aloud. A property, never a performance — and the return is
     exactly as short and as plain as the departure, which is the
     no-verdict law written in language instead of in milliseconds. */
  saidPop: "Una targhetta si è staccata.",
  saidSeat: "Una targhetta è tornata.",
  saidTurn: "Hai girato la figura. Non si è staccato niente.",
  saidKept: "Tenuta da parte. Adesso muovi l'altra e le guardi tutte e due insieme.",
  saidNoKeep: "Ce n'è già una tenuta da parte.",
  /* the English says "Turn it before you stretch it" — with no tag on,
     turning demonstrates nothing. Corrected sequence. */
  saidDealt: "Un'altra figura. Allungala o inclinala finché non compare una targhetta.",

  /* settings */
  sidesLabel: "Quanti lati",
  sidesFour: "quattro lati",
  sidesThree: "tre lati",

  /* paid sheet. ⚠ the English title says "shapes" (plural) but the sheet
     renders ONE figure whenever nothing is kept — which is the default.
     This is true with one figure and with two. "il riquadro" is the pane,
     named here and nowhere else. */
  sheetTitle: "Quello che la classe ha lasciato nel riquadro, e lo spazio per scrivere",
  /* ⚠ FOLD REPAIR (not the panel's wording): "su ogni riga, una figura"
     promised one figure per ruled line; the lines are blank and the sheet
     draws none on them — the panel's own note above `sheetTitle` says as
     much about the title, but the hint kept the claim. The false NP is
     excised and the panel's own "che cosa si può dire" kept, its dangling
     "ne" resolved to the panel's own noun "la figura". NEEDS NATIVE
     SIGN-OFF. */
  sheetHint: "Su ogni riga, che cosa si può dire della figura.",

  /* MEASURED before written: premium gates _print and _buildSheet and
     nothing else — no track, no keep, no deal — so "gratuito tutto
     intero" is true. Names the three MOVES, not a fourth part. */
  lockedTitle: "La scheda da stampare fa parte del piano Insegnante",
  lockedBody: "Lo strumento è gratuito tutto intero: ogni figura, allungare, inclinare e girare, le targhette e la figura tenuta da parte. Con il piano Insegnante c'è anche la scheda da stampare, con quello che la classe ha lasciato nel riquadro e le righe per scrivere.",
  /* ⚠ FOLD: `gateClose` deleted — the tool does not declare it (the paid
     gate is an inline panel with no overlay and no close control). */
  gateCta: "Scopri il piano Insegnante"
};
