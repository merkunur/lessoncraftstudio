/* no — linguist ruled the noun set (figuren/flata/merkene, all definite forms checked);
   1.-2.-trinn-læreren ruled the register (LK20 Geometri: dreie, rett vinkel, skjev) and
   vetoed naming the tool after the track that does nothing; marketing ruled the gate copy
   on the MEASURED plan name Lærerabonnementet (no.json ×16), never "Premium" (×25, defect).
   sayTagsRight/Both use the BARE `rett vinkel` — no article, so the en/ett numeral reading
   is structurally unavailable; true at n=3 (one corner) and n=4 (four) alike. ariaShape3/4
   carry no pose word at all: "leaning" would be FALSE at theta=90, the very state that makes
   sayTagsBoth reachable. */
module.exports = {
  title: "Figuren som blir skjev",
  instruction: "Drei figuren så mye du vil, og følg med på merkene. Strekk den, eller gjør den skjev, og se hvilket merke som slipper — og hva som skal til for å få det tilbake. Behold én figur på flata, så står to ved siden av hverandre og dere kan se på begge samtidig.",

  lenLabel: "Strekk",
  skewLabel: "Skjev",
  turnLabel: "Drei",

  keep: "Behold denne på flata",
  drop: "Ta bort den du beholdt",
  deal: "Hent en helt ny figur",
  quarter: "Kvart runde",
  print: "Skriv ut arket",

  ariaShape3: "En figur med tre sider.",
  ariaShape4: "En figur med fire sider.",
  sayTagsBoth: "Begge merkene holder: alle sidene er like lange, og det er rett vinkel i figuren.",
  sayTagsEqual: "Ett merke holder: alle sidene er like lange.",
  sayTagsRight: "Ett merke holder: det er rett vinkel i figuren.",
  sayTagsNone: "Ingen av merkene holder nå.",
  ariaKept: "En figur du har beholdt, står ved siden av til sammenligning.",

  saidPop: "Et merke slapp.",
  saidSeat: "Et merke kom tilbake.",
  saidTurn: "Dreid. Ingenting slapp.",
  saidKept: "Beholdt. Nå kan du endre den ene og sammenligne med den du beholdt.",
  saidNoKeep: "Du har allerede beholdt en figur.",
  saidDealt: "En helt ny figur på flata.",

  sidesLabel: "Hvor mange sider",
  sidesFour: "fire sider",
  sidesThree: "tre sider",

  sheetTitle: "Slik så flata ut da klassen var ferdig, og plass til å skrive",
  sheetHint: "Skriv én ting dere kan si om figuren på hver linje.",
  lockedTitle: "Arket hører til Lærerabonnementet",
  lockedBody: "Hele apparatet er gratis: figurene, alle tre — strekk, skjev og drei — merkene og figuren du beholder. Lærerabonnementet legger til arket til utskrift, med flata slik klassen forlot den og linjer å skrive på.",
  /* ⚠ FOLD: `gateClose` deleted — the tool does not declare it (the paid
     gate is an inline panel with no overlay and no close control). */
  gateCta: "Se Lærerabonnementet"
};
