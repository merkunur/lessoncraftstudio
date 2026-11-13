'use strict';
/**
 * Lärarkommentarer, svenska, matematik: slumplektionen i det planerade läsåret som "Year pages P" gjorde möjlig
 * (Daily Teaching System, Part 12.2): Slump: vad finns i påsen? i åk 2, i enheten Tabeller och diagram.
 * Skriven utifrån lektionens arbetsblad och läst av en svensk lågstadielärare med bladen (2026-11-13). Kommentaren är
 * så lång som handledningens blad rymmer (build-guide.js kontrollerar det); lärarens längre svar står i PLAN.md.
 * `node scripts/units/notes/apply.js` merges every file of this folder into frontend/content/units/points/<loc>.json.
 */
module.exports = {
  loc: 'sv',
  points: {
    '2:chance-certain-possible': {
      title: 'Slump: vad finns i påsen?',
      objective: 'Eleverna avgör om det är säkert, möjligt eller omöjligt att dra en viss bricka ur en påse och prövar en gissning i ett slumpförsök där de gör streck i en tabell och ritar staplar.',
      note: {
        mistake: 'Många elever kryssar i ”säkert” när nästan alla brickor i påsen är likadana och tror att den enda avvikande brickan är omöjlig att dra. I försöket väntar de sig att den sort det finns flest av alltid kommer flest gånger.',
        words: 'Fyll Slumppåsen med 5 cirklar medan klassen ser på: ”Är det säkert, möjligt eller omöjligt att jag drar en cirkel? Och en stjärna?” Lägg i en kvadrat: ”Vad gäller nu? Säkert är det bara när det inte finns något annat i påsen. Möjligt betyder att det kan hända, men det måste inte hända.” Dra 20 gånger. Kommer kvadraten nästan aldrig, fråga: ”Är den omöjlig då?” Öppna påsen: den ligger där, alltså är det möjligt.',
        watch: 'På bladet för alla är alla brickor i en av påsarna likadana utom en: den som kryssar i ”säkert” där letar upp den avvikande brickan. Det lättare bladet har mindre påsar och bara tre sorter; på det svårare ritar eleven 6 brickor i två tomma påsar så att kryssen stämmer (vid ”säkert” finns bara en lösning). Försöket gör klassen med Slumppåsen: fyll den som på försöksbladets bild och ställ in 20 drag; eleverna ringar först in vad de tror och gör streck i tabellen. Dra en rad till: det som det finns flest av kommer ofta, men inte alltid, flest gånger. Blir det lika, ringar eleven in båda. Det lättare försöksbladet (två sorter) och det svårare (tärning, en per par) är egna försök.',
      },
    },
  },
};
