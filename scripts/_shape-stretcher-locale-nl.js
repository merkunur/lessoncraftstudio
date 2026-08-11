/* nl — linguist vetoed "ruit" (it is the RHOMBUS this tool manufactures) and kept the shipped landing name; teacher ruled "haaks" over "rechte hoek" because one string must serve four right angles and one, and over "een rechte hoek" because Dutch "een" is article and numeral alike; marketing verified in code that only printing is gated, then used the current house plan name "Leerkracht-abonnement". No pose token: the shape's own strings state what it IS. */
module.exports = {
  title: "De vormrekker",
  instruction: "Draai de vorm zo ver je wilt: aan de labels verandert er niets. Rek aan de zijden, of trek hem scheef, en kijk wat de labels dan doen. Zet er een vorm naast en je hebt ze allebei tegelijk in beeld.",

  lenLabel: "Rekken",
  skewLabel: "Scheeftrekken",
  turnLabel: "Draaien",

  keep: "Deze laten staan",
  drop: "De vorm ernaast weghalen",
  deal: "Begin met een andere vorm",
  quarter: "Een kwartslag draaien",
  print: "Het blad afdrukken",

  ariaShape3: "Een vorm met drie zijden.",
  ariaShape4: "Een vorm met vier zijden.",
  /* ⚠ FOLD REPAIR (not the panel's wording): "overal haaks" describes the
     right-angle label with a universal quantifier while `Right` below
     describes the SAME label as "de vorm is haaks". The new English exists
     to end exactly that split. The right-clause is the panel's OWN `Right`
     clause, verbatim. */
  sayTagsBoth: "Beide labels houden vast: alle zijden even lang, en de vorm is haaks.",
  sayTagsEqual: "Eén label houdt vast: alle zijden zijn even lang.",
  sayTagsRight: "Eén label houdt vast: de vorm is haaks.",
  sayTagsNone: "Geen enkel label houdt vast.",
  ariaKept: "Er staat een vorm naast om mee te vergelijken.",

  saidPop: "Er laat een label los.",
  saidSeat: "Er zit weer een label op.",
  saidTurn: "Gedraaid. De labels blijven zoals ze waren.",
  saidKept: "Deze staat er nu naast. Beweeg de andere, dan zie je ze allebei.",
  saidNoKeep: "Er staat er al een naast.",
  /* ⚠⚠ FOLD REPAIR — THE ONE OUTRIGHT FALSEHOOD IN THE TEN PANELS. "in
     zijn eentje op het paneel" (all alone on the pane) asserts the dealt
     shape arrives by itself. `_deal` CARRIES THE KEPT SHAPE ACROSS —
     nothing is swept away — so with a shape kept the sentence is simply
     untrue, and it is spoken at exactly the moment a child would look. The
     false clause is excised; nothing is written in its place. */
  saidDealt: "Een nieuwe vorm. Draai hem eerst eens rond.",

  sidesLabel: "Hoeveel zijden",
  sidesFour: "vier zijden",
  sidesThree: "drie zijden",

  sheetTitle: "Wat er op het paneel stond, en ruimte om te schrijven",
  /* ⚠ FOLD REPAIR (not the panel's wording): "op elke regel één vorm"
     promised one shape per ruled line; the lines are blank. The false NP
     is excised and the panel's own "wat je ... kunt zeggen" kept, its
     R-pronoun "erover" expanded to the panel's own noun "de vorm". NEEDS
     NATIVE SIGN-OFF. */
  sheetHint: "Op elke regel: wat je over de vorm kunt zeggen.",
  lockedTitle: "Het blad hoort bij het Leerkracht-abonnement",
  lockedBody: "Het hele apparaat is gratis: elke vorm, alle drie de banen, de labels en de vorm die ernaast staat. Met het Leerkracht-abonnement komt daar het blad bij om af te drukken, met wat er op het paneel stond en lijnen om op te schrijven.",
  /* ⚠ FOLD: `gateClose` deleted — the tool does not declare it (the paid
     gate is an inline panel with no overlay and no close control). */
  gateCta: "Bekijk het Leerkracht-abonnement"
};
