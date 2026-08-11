/* sv — linguist ruled OUT märke/lapp/etikett/tecken (taken or trapped) and IN markering; teacher ruled figur + räta vinklar (Lgr22 Geometri); marketing ruled Lärarplanen (measured 6 vs Lärarabo 2, never "Premium"). */
module.exports = {
  title: "Figursträckaren",
  instruction: "Snurra figuren hur mycket ni vill — ingenting lossnar. Sträck den sedan, eller vinkla den, och se vilken markering som lossnar. Låt en figur stå kvar bredvid den ni håller på med, så syns båda samtidigt.",

  lenLabel: "Sträck",
  skewLabel: "Vinkla",
  turnLabel: "Snurra",

  keep: "Låt den här stå kvar bredvid",
  drop: "Ta bort den som står kvar",
  deal: "Börja med en annan figur",
  quarter: "Snurra ett kvarts varv",
  print: "Skriv ut arbetsbladet",

  ariaShape3: "En figur med tre sidor.",
  ariaShape4: "En figur med fyra sidor.",
  /* ⚠ FOLD REPAIR (not the panel's wording): "räta vinklar" is a plural
     COUNT phrase — the "square cornerS" shape the English struck — and it
     describes the SAME marking that `Right` below calls "figuren är
     rätvinklig". Two systems for one marking, on the only channel with no
     picture to reconcile them. The right-clause is the panel's OWN `Right`
     clause, verbatim. */
  sayTagsBoth: "Båda markeringarna sitter kvar: alla sidor lika långa, och figuren är rätvinklig.",
  sayTagsEqual: "En markering sitter kvar: alla sidor lika långa.",
  sayTagsRight: "En markering sitter kvar: figuren är rätvinklig.",
  sayTagsNone: "Ingen markering sitter kvar.",
  ariaKept: "En figur står kvar bredvid för jämförelse.",

  saidPop: "En markering lossnade.",
  saidSeat: "En markering kom tillbaka.",
  saidTurn: "Figuren har snurrat. Ingenting lossnade.",
  saidKept: "Den står kvar bredvid. Flytta den andra nu, så syns båda samtidigt.",
  saidNoKeep: "Det står redan en figur kvar bredvid.",
  saidDealt: "En annan figur. Snurra den först och se om något ändras.",

  sidesLabel: "Hur många sidor",
  sidesFour: "fyra sidor",
  sidesThree: "tre sidor",

  sheetTitle: "Så såg det ut när klassen slutade, och plats att skriva",
  /* ⚠ FOLD REPAIR (not the panel's wording): "en figur klassen gjorde" on
     every rad promised one figure per ruled line; the lines are blank. The
     false NP is excised and the panel's own "vad man kan säga" kept, its
     dangling "den" resolved to the panel's own noun "figuren". NEEDS
     NATIVE SIGN-OFF. */
  sheetHint: "På varje rad: vad man kan säga om figuren.",
  lockedTitle: "Arbetsbladet ingår i Lärarplanen",
  lockedBody: "Hela apparaten är gratis — alla figurer, alla tre reglagen, markeringarna och att låta en figur stå kvar bredvid. Lärarplanen lägger till arbetsbladet, som visar det klassen lämnade kvar i fönstret och linjer att skriva på.",
  /* ⚠ FOLD: `gateClose` deleted — the tool does not declare it (the paid
     gate is an inline panel with no overlay and no close control). */
  gateCta: "Läs om Lärarplanen"
};
