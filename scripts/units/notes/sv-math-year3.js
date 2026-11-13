'use strict';
/**
 * Lärarkommentarer, svenska, matematik: lektionerna i det planerade läsåret som "Year pages E och F" gjorde möjliga
 * (Daily Teaching System, Part 12.2): en ytterligare lektion i en enhet som finns i åk 1. En post per lektion: en ny
 * punkt eller YTTERLIGARE en lektion om en punkt som redan har en ("<point>#<name>"). Kommentaren skrevs utifrån
 * lektionens arbetsblad och lästes av en svensk lågstadielärare med bladen (2026-11-13).
 * `node scripts/units/notes/apply.js` merges every file of this folder into frontend/content/units/points/<loc>.json.
 */
module.exports = {
  loc: 'sv',
  points: {
    // ── åk 1: Addition och subtraktion 0–20 ──
    '1:fluency-within-20#samma-ental-en-tia-till': {
      title: 'Samma ental, en tia till: 3 + 4 och 13 + 4',
      objective: 'Eleverna adderar ental till och subtraherar ental från tal mellan 11 och 19 utan tiotalsövergång, som 13 + 4 och 17 − 5, genom att använda det de kan om 3 + 4 och 7 − 5.',
      note: {
        mistake: 'Många elever räknar den stora uppgiften från början och räknar upp ett steg i taget från 13 i stället för att använda den lilla uppgiften. I subtraktion räknar en del bara den lilla uppgiften och glömmer tian i svaret (17 − 5 = 2).',
        words: 'Visa båda uppgifterna på kulramen eller med brickor i två tioramar: ”Här är en hel tia. Den rör vi inte. Under den räknar vi 3 + 4.” Fråga: ”Vad är lika i den stora uppgiften? Vad är olika?” Säg: ”Den lilla uppgiften hjälper den stora. Entalen är desamma, och tian är med hela tiden.”',
        watch: 'Se vem som skriver det stora svaret direkt efter det lilla och vem som räknar om. Det lättare bladet har bara addition: börja där. Bladet för alla har bara subtraktion, och det svårare blandar båda.',
      },
    },
  },
};
