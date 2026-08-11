/* nl — Linguist named the parts "het perron" (measured 0 hits across `mini tools/`
   and every file in frontend/messages/ — `rij` is spoken for 58× real, `lijn` and
   `bord` are taken in all eleven, and `spoor` is draw-bag's own nl word), "de
   aanwijzer" for the walker (0 hits; `loper` is REJECTED because pair-gate already
   ships "de lopers" for a marker walking through an apparatus) and "de kant" for an
   end. No vehicle is named anywhere. Teacher (groep 3-4) ruled the spoken register
   down from "de wachtenden" to "wie er wachten" on the one visible setting label,
   and REFUSED the natural Dutch "Kies eerst een kant" in `sayDealt` — "eerst" is the
   ordinal the English header deleted from `sayPickEnd` for exactly this reason, and
   Dutch offers it as the idiomatic default. Marketing verified in code that only
   `_print`/`_buildSheet` are gated, so `lockedBody` is true as written, and took the
   shipped plan name from nl.json `planTag`.
   REBUILT, not translated: `instruction`, `sayLandedSame` and `ariaLandedSame` — the
   English of all three asserts something the model does not guarantee (see report).
   ⚠ "Een stap verder" and "Een ander perron" carry the ARTICLE `een`, unaccented on
   purpose; nothing here means the numeral `één`. */
module.exports = {
  title: "Het perron",
  instruction: "Er staan een paar wachtenden op het perron. Kies een kant en stap dan langs het perron: bij wie kom je uit? Kies nu de andere kant en stap even vaak — er is niemand verschoven, dus kijk goed bij wie je nu uitkomt.",

  /* controls — parallel pair, both short enough to wrap at 15px on 320px */
  endLeft: "Begin aan deze kant",
  endRight: "Begin aan de andere kant",
  step: "Stap verder",
  /* ⚠ NO VEHICLE, and no numeral: somebody simply leaves the perron. */
  board: "Iemand gaat weg",
  again: "Een ander perron",
  print: "Het blad afdrukken",

  /* aria. ⚠ KEPT SHORT ON PURPOSE — `_paint` concatenates `ariaPlatform` with the
     state string, and in the end-chosen/k=0 state the state string IS `ariaPlatform`,
     so this sentence is spoken twice in a row. See the report. */
  ariaPlatform: "Een perron met {n} wachtenden.",
  ariaNoEnd: "Er is nog geen kant gekozen, dus de aanwijzer staat naast het perron.",
  ariaWalking: "De aanwijzer is vanaf de gekozen kant verder gestapt.",
  /* ⚠⚠ REBUILT. The English claims a past event ("the same one IT LANDED ON FROM THE
     OTHER END") that need never have happened: `isSelfSame` is a pure property of
     (n, k) and fires on a fresh deal at n=3, k=2 with the other end never chosen.
     The Dutch states the property instead of inventing a history. */
  ariaLandedSame: "De aanwijzer staat bij degene waar je van beide kanten bij uitkomt.",

  /* said aloud — never a position, never a cardinal standing for one */
  sayPickEnd: "Kies een kant, anders weet je niet waarvandaan je moet tellen.",
  sayStepped: "Een stap verder.",
  /* ⚠⚠ REBUILT, same defect as `ariaLandedSame`: states what is true of the count,
     claims nothing about a count the child may not have made. */
  sayLandedSame: "Van welke kant je ook telt, je komt bij deze uit.",
  sayBoarded: "Er is iemand weggegaan. Tel nog eens vanaf dezelfde kant.",
  /* ⚠ NOT "Kies eerst een kant" — `eerst` is the ordinal the English source
     deliberately struck from `sayPickEnd` (header line 185). Dutch offers it as the
     idiomatic reading of "before you count"; it is refused here. */
  sayDealt: "Een ander perron. Kies een kant, dan kun je tellen.",
  sayEndOfLine: "Verder gaat het perron niet.",

  /* settings — the ONE place a number word is a true count, so it carries one */
  sizeLabel: "Hoeveel er wachten",
  sizeThree: "drie",
  sizeFour: "vier",

  /* paid sheet. `het perron` is neuter, so the resumptive pronoun is `het`. */
  sheetTitle: "Het perron zoals de klas het achterliet, en ruimte om te schrijven",
  /* verified against `_buildSheet`: six BLANK ruled lines, so the hint promises the
     lines nothing they do not have (the shape-stretcher "op elke regel één vorm" trap) */
  sheetHint: "Op elke regel: een telling van de klas, en bij wie jullie uitkwamen.",
  lockedTitle: "Het blad hoort bij het Leerkracht-abonnement",
  lockedBody: "Het hele apparaat is gratis: elk perron, allebei de kanten, de aanwijzer en iemand laten weggaan. Met het Leerkracht-abonnement komt daar het blad bij om af te drukken, met het perron waar de klas naar keek en lijnen om op te schrijven.",
  gateCta: "Bekijk het Leerkracht-abonnement"
};
