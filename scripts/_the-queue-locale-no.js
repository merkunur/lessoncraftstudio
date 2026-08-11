/* no — linguisten målte at `kø` er ledig på norsk (kua, ikke kon; kjønn, ikke kønn) og
   VRAKET det likevel: en kø har en front per definisjon, og verktøyets første oppfinnelse er
   at ingen ende er hjemme. Navnet ble apparatets egen del: perrongen (en perrong → perrongen,
   ingen skjult form), gjengangeren heter vandreren, og endene heter den ene og den andre.
   1.-2.-trinns-læreren dempet instruksjonen til «som regel en annen» — den engelske påstod
   ubetinget at du lander på en annen, og det er usant nettopp i verktøyets beste øyeblikk.
   Markedsføringen skrev porten på det MÅLTE plannavnet Lærerabonnementet, aldri «Premium».
   REBUILT: instruction, ariaLandedSame og sayLandedSame (ingen falsk fortid), board/again
   (ingen kjøretøy: én går sin vei, perrongen byttes). */
module.exports = {
  title: "Perrongen",
  instruction: "Noen står og venter på perrongen. Velg en ende, gå bortover, og se hvem du lander på. Velg så den andre enden og gå like mange steg — ingen har flyttet seg, men som regel er det en annen du lander på. Noen ganger er det den samme, og da er det verdt å spørre klassen hvorfor.",

  endLeft: "Start fra den ene enden",
  endRight: "Start fra den andre enden",
  step: "Gå ett steg",
  board: "Én går sin vei",
  again: "Hent en ny perrong",
  print: "Skriv ut arket",

  ariaPlatform: "En perrong med {n} som venter.",
  ariaNoEnd: "Ingen ende er valgt ennå, så vandreren står utenfor perrongen.",
  ariaWalking: "Vandreren har gått bortover fra enden dere valgte.",
  ariaLandedSame: "Vandreren står på den som blir den samme, uansett hvilken ende dere teller fra.",

  sayPickEnd: "Velg en ende — før det er det ingen å telle fra.",
  sayStepped: "Ett steg til.",
  sayLandedSame: "Den samme, uansett hvilken ende dere teller fra.",
  sayBoarded: "Én gikk sin vei. Tell på nytt fra den samme enden.",
  sayDealt: "En ny perrong. Velg en ende før dere teller.",
  sayEndOfLine: "Lenger går ikke perrongen.",

  sizeLabel: "Hvor mange som venter",
  sizeThree: "tre",
  sizeFour: "fire",

  sheetTitle: "Perrongen slik klassen forlot den, og plass til å skrive",
  sheetHint: "Skriv én telling klassen gjorde på hver linje, og hvem den landet på.",
  lockedTitle: "Arket hører til Lærerabonnementet",
  lockedBody: "Hele apparatet er gratis: perrongen, begge endene, vandreren og det å la én gå sin vei. Lærerabonnementet legger til arket til utskrift, med perrongen slik klassen så den og linjer å skrive på.",
  gateCta: "Se Lærerabonnementet"
};
