'use strict';
/**
 * Lärarkommentarer, svenska, matematik: lektionen i det planerade läsåret som "Year pages I" gjorde möjlig
 * (Daily Teaching System, Part 12.2): ytterligare en lektion i enheten Längd, klockan och almanackan i åk 2.
 * Skriven utifrån lektionens arbetsblad och läst av en svensk lågstadielärare med bladen (2026-11-13).
 * `node scripts/units/notes/apply.js` merges every file of this folder into frontend/content/units/points/<loc>.json.
 */
module.exports = {
  loc: 'sv',
  points: {
    // ── åk 2: Längd, klockan och almanackan ──
    '2:read-jugs#liter-och-deciliter': {
      title: 'Liter och deciliter',
      objective: 'Eleverna läser av en mätkanna med ett streck för varje deciliter, vet att 1 liter är 10 deciliter och skriver hur många deciliter som finns i kannan.',
      note: {
        mistake: 'Många elever skriver kannans högsta tal (10) i stället för att läsa av vid vätskans yta: de blandar ihop hur mycket kannan rymmer med hur mycket som finns i den. När bara vartannat streck har ett tal skriver en del det närmaste utskrivna talet, eller säger ”två och en halv” om strecket mellan 2 och 4, i stället för att se att strecket emellan är 3. Liter och deciliter blandas ihop: en del tror att 10 dl är mer än 1 liter.',
        words: 'Häll först på riktigt: ”Hur många decilitermått behövs för att fylla litermåttet?” Räkna tillsammans till tio och säg: ”Tio deciliter är en liter.” Vid bladet: ”Titta på vattenytan. Vilket streck når den? Mellan 4 och 6 finns ett streck utan tal. Vilket tal hör till det?” I Mätbänken på tavlan kan ni hälla lite i taget och läsa av efter varje gång; bänkens kärl är graderade i milliliter, så säg att 100 milliliter är 1 deciliter.',
        watch: 'Se vem som läser av vid ytan och vem som gissar. Fråga också: ”Hur många deciliter är en liter?” och vid en nästan full kanna: ”Hur många deciliter fattas till en liter?” På det svårare bladet rymmer kannan två liter: låt eleverna säga 14 dl som 1 liter och 4 deciliter.',
      },
    },
  },
};
