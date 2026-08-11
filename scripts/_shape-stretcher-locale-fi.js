/* fi — linguist ruled the kulma problem (adjective `suorakulmainen`, never the noun); teacher ruled the three track verbs; marketing ruled `Opettajatilaus`. */
module.exports = {
  title: "Muodonmuuttaja",

  /* the opening frame almost never has a tag on it (~2%), so nothing here
     tells the child to "watch the tags"; it states the theorem instead */
  instruction: "Kierrä muotoa niin paljon kuin haluat: muoto pysyy samana. Litistä tai vinouta sitä, niin näet, milloin lipuke irtoaa ja milloin se tulee takaisin. Jätä yksi muoto viereen, niin näet kaksi kerralla.",

  /* three imperatives, three different KINDS of change. ⚠ not `Venytä`
     (unit-handle #40 is named it) and ⚠ not `Kallista` (rounding-hill's
     tilt — the very thing this track is NOT) */
  lenLabel: "Litistä",
  skewLabel: "Vinouta",
  turnLabel: "Kierrä",

  keep: "Jätä tämä viereen",
  drop: "Ota jätetty muoto pois",
  deal: "Aloita toisesta muodosta",
  quarter: "Neljänneskierros",
  print: "Tulosta arkki",

  /* ⚠ the shape is never NAMED (no kolmio / neliö) — naming it would hand
     the child the classification the tool exists to make them perform.
     ⚠⚠ NO POSE CLAUSE AT ALL. The new English says "leaning", which is
     false at rot=0 (reachable: click the far left of the turn rail) and,
     worse, is the same word as `skewLabel` — so the aria would describe
     the POSE with the name of the FORM track, conflating the two
     transformations this tool exists to separate. Finnish could have kept
     the pose honestly (`kierretty`, the turn root, is a different root
     from `vino`), but rot=0 still falsifies it, so the clause goes: by
     the tool's own theorem the pose is not part of what the shape is. */
  ariaShape3: "Muoto, jossa on kolme sivua.",
  ariaShape4: "Muoto, jossa on neljä sivua.",

  /* `suorakulmainen` is an ADJECTIVE OF THE WHOLE SHAPE, so it is true at
     n=4 (four right corners) and at n=3 (exactly one) with no number
     marking at all — the English plural "square corners" is false for a
     triangle */
  sayTagsBoth: "Molemmat lipukkeet pitävät: kaikki sivut ovat yhtä pitkät ja muoto on suorakulmainen.",
  sayTagsEqual: "Yksi lipuke pitää: kaikki sivut ovat yhtä pitkät.",
  sayTagsRight: "Yksi lipuke pitää: muoto on suorakulmainen.",
  sayTagsNone: "Kumpikaan lipuke ei pidä.",
  ariaKept: "Vieressä on jätetty muoto vertailua varten.",

  /* equal weight coming and going — the no-verdict law in two sentences of
     the same length and the same register */
  saidPop: "Lipuke irtosi.",
  saidSeat: "Lipuke tuli takaisin.",
  saidTurn: "Kierretty. Mikään ei irronnut.",
  /* ⚠ points at the LIVE shape. The English "move the other one" points at
     the kept one, which every reducer refuses to move. */
  saidKept: "Jätetty viereen. Liikuta nyt tätä muotoa, niin näet kaksi vierekkäin.",
  saidNoKeep: "Vieressä on jo yksi jätetty muoto.",
  saidDealt: "Toinen muoto. Kierrä sitä ensin, litistä vasta sitten.",

  sidesLabel: "Montako sivua",
  sidesFour: "neljä sivua",
  sidesThree: "kolme sivua",

  /* ⚠ number-neutral: the sheet carries ONE shape unless something is kept,
     and nothing is kept by default */
  sheetTitle: "Mitä luokka jätti pinnalle — ja tilaa kirjoittaa",
  /* ⚠ one THING per line, not one shape per line: there are six lines and
     at most two shapes */
  sheetHint: "Yhdelle riville yksi asia, jonka luokka voi sanoa muodosta.",

  lockedTitle: "Arkki kuuluu Opettajatilaukseen",
  /* ⚠ FOLD REPAIR (not the panel's wording), ONE TOKEN: "pinnalle jätetyt
     muodot" — the shapeS left on the pane — over-describes the sheet,
     which carries ONE shape whenever nothing is kept, and nothing is kept
     by default. This panel's own `sheetTitle` and `sheetHint` are already
     number-neutral and its own `ariaKept` says "jätetty muoto"; only this
     one NP kept the plural. Singularised to the panel's own form. The verb
     stays `näkyvät`: the coordinated subject (muoto + rivit) is plural, so
     plural agreement was and remains correct. */
  lockedBody: "Koko väline on ilmainen: kaikki muodot, kaikki kolme säädintä, lipukkeet ja viereen jätetty muoto. Opettajatilaus lisää tulostettavan arkin, jossa näkyvät pinnalle jätetty muoto ja rivit kirjoittamista varten.",
  /* ⚠ FOLD: `gateClose` deleted — the tool does not declare it (the paid
     gate is an inline panel with no overlay and no close control). */
  gateCta: "Tutustu Opettajatilaukseen"
};
