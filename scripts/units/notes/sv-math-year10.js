'use strict';
/**
 * Lärarkommentarer, svenska, matematik: enheten Räknehändelser och problemlösning 0–20 i åk 1, som "Year pages R"
 * gjorde möjlig (Daily Teaching System, Part 12.2): Hur många fler?, Vad hände?, Hitta på en egen fråga och Rita,
 * räkna, svara. Skrivna utifrån lektionernas arbetsblad och lästa av en svensk lågstadielärare med bladen
 * (2026-11-14). Det som sägs om verktygen är läst i verktygens kod (Plankorna: två plankor upp till 16, klammer och
 * stump; Ögonblicket: väljer själv förändringen, ”upp till tio / sexton”; Fickbrädet: tre fickor, tal upp till tjugo).
 * En kommentar är så lång som handledningens blad rymmer (build-guide.js kontrollerar det).
 * `node scripts/units/notes/apply.js` merges every file of this folder into frontend/content/units/points/<loc>.json.
 */
module.exports = {
  loc: 'sv',
  points: {
    '1:word-problems#hur-manga-fler': {
      title: 'Hur många fler? Jämföra två antal',
      objective: 'Eleverna löser räknehändelser med jämförelse i talområdet 0–20, läser av skillnaden i två bildrader och säger den på tre sätt: hur många fler, hur många färre och hur många som fattas.',
      note: {
        mistake: 'Eleverna hör ordet ”fler” och adderar de två talen (12 och 7 blir 19), eller svarar med det större talet. ”Hur många färre” är svårare än ”hur många fler”, fast det är samma skillnad.',
        words: 'Öppna Plankorna och dra de två plankorna till 12 och 7 innan du säger något: ”Maja har 12 klistermärken. Leo har 7. Var ser ni hur många fler Maja har?” Låt klassen säga hur lång stumpen under klammern är och flytta den sedan till änden av den korta plankan: ”Maja har 5 fler än Leo. Leo har 5 färre än Maja. Leo behöver 5 till för att ha lika många.” Säg alla tre meningarna för varje par.',
        watch: 'Bladet visar de två antalen som två bildrader som börjar vid samma linje. Läs händelsen högt för den som behöver. Låt eleven ringa in bilderna som sticker ut innan talet skrivs i rutan; det prickade fältet är till för en ritning eller en uträkning (12 − 7 = 5 eller 7 + _ = 12). På bladet för alla är det större antalet 11 till 14 i båda händelserna, det lättare bladet håller sig inom 10 och det svårare har tre händelser. Den som skriver 19 har adderat: täck över det som båda raderna har och fråga vad som blir över.',
      },
    },
    '1:word-problems#vad-hande': {
      title: 'Vad hände? Räknehändelser där något saknas',
      objective: 'Eleverna löser räknehändelser i talområdet 0–20 där förändringen eller starten är okänd, markerar det okända med ett frågetecken i en blockmodell och skriver en uträkning.',
      note: {
        mistake: 'Eleverna gör det som händelsen säger: kommer det några till adderar de talen de ser, och tas några bort subtraherar de. När starten saknas pekar orden åt fel håll: ”Liam tar ut 3, nu ligger det 12 kvar” kräver en addition.',
        words: 'Öppna Ögonblicket och välj ”upp till sexton”. Räkna prickarna tillsammans (till exempel 8), tryck på ”Låt ögonblicket gå”, räkna igen (till exempel 13) och skriv båda talen: ”Kom det några eller gick det några? Hur många?” Pröva ett barns förslag. Rita blockmodellen: ”Det kom fler, så 13 är alla. 8 fanns från början. Frågetecknet är de som kom.” Skriv 8 + ? = 13. Gick det några är det första talet alla. Berätta sedan en händelse där starten saknas: ”Det ligger kulor i en låda. Hugo lägger i 5 till. Nu ligger det 12.” Nu står frågetecknet först: ? + 5 = 12.',
        watch: 'Lektionen har två blad, ett för varje dag. ”Vad hände i mitten?” frågar efter förändringen, ”Hur många från början?” efter starten. På båda håller sig det lättare bladet inom 10 och har den första händelsen löst, på bladet för alla är det största talet mellan 11 och 20 och det svårare räknar med hela tiotal upp mot 100. Fråga ”Vilket tal är alla?” innan eleven skriver: när några togs bort är starten det hela, frågetecknet står i den långa rutan och eleven adderar. Båda uträkningarna räknas (12 − 5 = 7 för ? + 5 = 12).',
      },
    },
    '1:word-problems#hitta-pa-en-egen-fraga': {
      title: 'Hitta på en egen fråga',
      objective: 'Eleverna formulerar egna matematiska frågor till korta räknehändelser med tal upp till 20, skriver uträkningen och svaret och löser en kamrats fråga.',
      note: {
        mistake: 'Eleverna skriver en fråga som inte behöver någon uträkning (”Hur många äpplen köper Elsa först?”) eller en som inte går att besvara med talen i händelsen (”Vad kostar äpplena?”). Många tror också att det bara finns en rätt fråga.',
        words: 'Öppna Fickbrädet och välj ”något hände”. Berätta en händelse utan tal: ”Elsa köper några äpplen. Sedan köper hon några till.” Fråga: ”Vad skulle man kunna fråga?” Skriv upp klassens frågor. Välj den ficka som klassen ska räkna ut, säg sedan talen ett i taget och pröva varje fråga: ”Går den att räkna ut? Behövs båda talen?” Stryk de frågor som inte behöver någon uträkning.',
        watch: 'På bladet för alla saknas frågan i alla tre händelserna; på det lättare bladet (tal upp till 10) står en fråga tryckt som förebild. På det svårare bladet står två antal sida vid sida i en av händelserna (till exempel i en röd och en blå låda): där passar både ”Hur många är det tillsammans?” och ”Hur många fler ligger i den röda lådan?”. Godta varje fråga som går att räkna ut med händelsens båda tal. Låt eleverna skriva bara frågan först, byta blad och lösa varandras frågor. Facit visar en fråga som passar, inte den enda.',
      },
    },
    '1:word-problems#rita-rakna-svara': {
      title: 'Rita, räkna, svara',
      objective: 'Eleverna löser räknehändelser i talområdet 0–20 i fyra steg: läsa, rita en enkel bild, skriva uträkningen och säga svaret som en hel mening.',
      note: {
        mistake: 'Eleverna börjar räkna innan de har läst klart och tar de två talen i den ordning de står. Andra ritar detaljerade bilder (varje jordgubbe med blad) och hinner inte räkna, eller ritar bara det första talet.',
        words: 'Läs en händelse högt: ”Selma har 12 jordgubbar och ger bort 4. Hur många har Selma kvar?” Visa de fyra stegen på tavlan: läs, rita, räkna, svara. Rita 12 ringar, stryk 4 och säg: ”En ring räcker, vi ritar inga jordgubbar.” Skriv 12 − 4 = 8 och svara med en hel mening: ”Selma har 8 jordgubbar kvar.” Låt sedan ett barn berätta vad ritningen visar innan klassen räknar nästa händelse.',
        watch: 'Bladet har tre händelser, var och en med en tom ruta att rita i, en ram för uträkningen och en svarsruta; bara en liten bild av saken är tryckt, ritningen är elevens. Det lättare bladet håller sig inom 10, på bladet för alla är det största talet 11 till 20, och på det svårare frågar två händelser efter förändringen (7 + ? = 12): där är det ritningen som hittar svaret. Svarsrutan rymmer bara talet, så be eleven säga svaret som en hel mening. Den som ritar 20 saker en och en kan rita ringarna i rader om fem.',
      },
    },
  },
};
