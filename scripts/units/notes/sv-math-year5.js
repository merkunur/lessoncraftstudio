'use strict';
/**
 * Lärarkommentarer, svenska, matematik: lektionen i det planerade läsåret som "Year pages J" gjorde möjlig
 * (Daily Teaching System, Part 12.2): ytterligare en lektion i enheten Multiplikation och division i åk 3.
 * Skriven utifrån lektionens arbetsblad och läst av en svensk lågstadielärare med bladen (2026-11-13).
 * `node scripts/units/notes/apply.js` merges every file of this folder into frontend/content/units/points/<loc>.json.
 */
module.exports = {
  loc: 'sv',
  points: {
    // ── åk 3: Multiplikation och division ──
    '3:times-tables#sexans-tabell-ur-tabeller-du-kan': {
      title: '6:ans tabell med hjälp av 5:ans tabell',
      objective: 'Eleverna räknar ut uppgifter i 6:ans tabell med hjälp av 5:ans tabell, till exempel 7 · 6 = 7 · 5 + 7 = 35 + 7 = 42.',
      note: {
        mistake: 'När eleverna räknar i huvudet lägger många till 6 i stället för 7 och räknar 7 · 6 som 35 + 6. På bladet står ”+ 7” redan utskrivet, så felet syns först när de räknar utan bladet. En del kan inte 5:ans tabell utantill och hoppräknar sig fram, så att knepet inte sparar någon tid. Andra skriver 35 och glömmer att lägga till den sista delen.',
        words: 'Visa på Bullplåten: ”Här är 7 rader med 6 bullar i varje rad. Jag bryter av en kolumn. Kvar är 7 rader med 5 bullar i varje rad: 35 bullar. Kolumnen jag bröt av har 7 bullar.” Säg: ”7 · 6 är 7 · 5 och 7 till.” Fråga vid varje rad på bladet: ”Hur mycket är 7 · 5? Varför lägger vi till just 7?”',
        watch: 'Se vem som kan 5:ans tabell utantill: utan den hjälper knepet inte. Kontrollera den första rutan på varje rad (uppgiften ur 5:ans tabell) innan eleven räknar vidare. Det svårare bladet har också 7:ans tabell, där två delar läggs ihop, till exempel 3 · 7 = 3 · 5 + 3 · 2 = 15 + 6.',
      },
    },
  },
};
