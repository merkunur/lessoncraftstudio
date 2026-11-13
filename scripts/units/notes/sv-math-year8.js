'use strict';
/**
 * Lärarkommentarer, svenska, matematik: lektionen i det planerade läsåret som "Year pages O" gjorde möjlig
 * (Daily Teaching System, Part 12.2): Räknehändelser 0–100 i åk 2, i enheten Addition och subtraktion 0–100 med pengar.
 * Skriven utifrån lektionens arbetsblad och läst av en svensk lågstadielärare med bladet (2026-11-13).
 * `node scripts/units/notes/apply.js` merges every file of this folder into frontend/content/units/points/<loc>.json.
 */
module.exports = {
  loc: 'sv',
  points: {
    '2:two-step-word-problems#raknehandelser-0-100': {
      title: 'Räknehändelser 0–100: välj räknesätt',
      objective: 'Eleverna läser räknehändelser med tvåsiffriga tal, formulerar en fråga när den saknas, avgör om det är addition eller subtraktion, skriver uträkningen och svarar med en hel mening.',
      note: {
        mistake: 'Eleverna tar de två talen och adderar dem utan att läsa frågan, också när något tas bort eller när två antal jämförs. När frågan saknas skriver många uträkningen på frågeraden. Svaret blir ofta bara ett tal, inte en hel mening.',
        words: 'Visa Fickbrädet och berätta en händelse utan tal: ”Det ligger kulor i en låda. Ella tar ut några.” Fråga: ”Vad kan vi fråga om här?” Samla elevernas frågor innan du har nämnt något tal. Säg när eleverna arbetar med bladet: ”Läs räknehändelsen. Vad händer: kommer något till, försvinner något eller jämför vi två antal? Vad frågas det efter? Skriv uträkningen. Svara med en hel mening, till exempel: Det ligger 51 kulor kvar i lådan.”',
        watch: 'På bladet för alla saknas frågan till en av de tre räknehändelserna; eleven skriver den själv. Godta varje fråga som passar händelsen och går att besvara med talen. Det lättare bladet har alla frågor tryckta och ingen jämförelseuppgift; på bladet för alla och på det svårare bladet finns en, och på det svårare saknas två frågor. Jämförelseuppgiften (”Hur många fler …?”, ”Hur många färre …?” eller ”Hur många … till behövs …?”) löser många genom att lägga ihop de två talen (45 + 21). Låt eleven lägga de två antalen bredvid varandra med tiostavar och entalskuber och visa skillnaden. Godta både subtraktionen (45 − 21 = 24) och uträkningen där eleven räknar upp (21 + 24 = 45). Se efter att svaret är en mening som passar frågan.',
      },
    },
  },
};
