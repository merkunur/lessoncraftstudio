'use strict';
/**
 * Lärarkommentarer, svenska, matematik: lektionerna i det planerade läsåret som "Year pages K" gjorde möjliga
 * (Daily Teaching System, Part 12.2): den nya enheten Multiplikationstabellerna 1–10 i åk 3 (tre nya lektioner; två
 * flyttas dit från Multiplikation och division) och en lektion i Addition och subtraktion 0–100 i åk 2.
 * Skrivna utifrån lektionernas arbetsblad och lästa av en svensk lågstadielärare med bladen (2026-11-13).
 * `node scripts/units/notes/apply.js` merges every file of this folder into frontend/content/units/points/<loc>.json.
 */
module.exports = {
  loc: 'sv',
  points: {
    // ── åk 3: Multiplikationstabellerna 1–10 ──
    '3:times-tables#tabelltraning-de-21-uppgifterna': {
      title: 'Tabellträning: de 21 uppgifter som återstår',
      objective: 'Eleverna lägger undan 1:ans, 2:ans, 5:ans och 10:ans tabell, som de redan kan, och de uppgifter som står två gånger (som 3 · 7 och 7 · 3), ser att 21 uppgifter återstår och startar en daglig tabellträning.',
      note: {
        mistake: 'Många elever ser tabellerna som hundra lösa uppgifter och tror att 7 · 3 och 3 · 7 måste läras var för sig. Andra menar att de kan en tabell när de kan rabbla den från början, men behöver räkna sig fram från 1 · 7 för att svara på 6 · 7.',
        words: 'Visa Vikväggen och lägg undan 1:an, 2:an, 5:an och 10:an, en i taget. Fråga efter varje tabell: ”Hur många kort står kvar nu? Hur vet du det utan att räkna alla?” Det står 81, 64, 49 och till sist 36 kort kvar; eleverna kan dra bort de kort som försvann (100 − 19 = 81) eller räkna rader och kolumner. Lägg sedan undan korten under diagonalen: ”4 · 6 och 6 · 4 blir båda 24. Den uppgiften behöver du bara lära dig en gång.” Fråga sist: ”Hur många uppgifter har vi kvar att lära oss?”',
        watch: 'Lyssna under den dagliga träningen efter om svaret kommer direkt eller räknas fram med hopp. Anteckna vilka av de 21 uppgifterna som många fastnar på, ofta 6 · 7, 7 · 8 och 8 · 9, och ta upp dem med hela klassen.',
      },
      routine: 'Första lektionen: gå igenom hela tabellen på Vikväggen och låt klassen komma fram till att 21 uppgifter återstår. När de fyra tabellerna är undanlagda står 36 kort kvar. 15 av dem ligger under diagonalen och kan läggas undan, eftersom samma tal står på andra sidan. Kvar blir 21 kort. Varje elev skriver de 21 uppgifterna på en egen lista. Andra lektionen: inför rutinen. Fem minuter varje dag under resten av läsåret tränar eleverna i par med tabellkort som de själva har skrivit (uppgiften på ena sidan, svaret på den andra) på de tabeller som klassen har gått igenom, och var och en bockar av de uppgifter som sitter säkert på sin lista. Lektionen har inget arbetsblad.',
    },
    '3:times-tables#treans-och-fyrans-tabell': {
      title: '3:ans och 4:ans tabell',
      objective: 'Eleverna skriver och lär sig 3:ans och 4:ans tabell upp till 10 · 3 och 10 · 4 och använder att svaren i 4:ans tabell är dubbelt så stora som i 2:ans.',
      note: {
        mistake: 'Eleverna räknar sig fram med 3-hopp eller 4-hopp från början vid varje uppgift och hamnar ett hopp fel, så att 7 · 3 blir 18 eller 24. I 4:ans tabell blandar de ihop grannar som 6 · 4 och 7 · 4. När faktorerna byter plats, som 3 · 7 på det svårare bladet, känner de inte igen uppgiften.',
        words: 'Börja från en uppgift eleven kan: ”Du vet att 5 · 3 är 15. Då är 6 · 3 en trea till: 18.” Knyt 4:ans tabell till 2:ans: ”7 · 2 är 14. 7 · 4 är dubbelt så mycket: 14 + 14 = 28.” Låt eleverna säga hela uppgiften högt, inte bara svaret: ”Sju gånger fyra är tjugoåtta.”',
        watch: 'Det lättare bladet har tre svar ifyllda som stöd (1 · 3, 5 · 3 och 10 · 3); se om eleven utgår från dem eller räknar från början. På det svårare bladet står uppgifterna i blandad ordning, faktorerna byter plats och ibland saknas en faktor (3 · __ = 24). Det visar vem som kan tabellen och vem som bara kan rabbla den. Elva av de 21 uppgifterna på elevens lista hör till 3:ans och 4:ans tabell (3 · 3, 3 · 4, 3 · 6, 3 · 7, 3 · 8, 3 · 9, 4 · 4, 4 · 6, 4 · 7, 4 · 8 och 4 · 9); bocka av dem som sitter.',
      },
    },
    '3:times-tables#sjuans-attans-och-nians-tabell': {
      title: '7:ans, 8:ans och 9:ans tabell: bryt isär den svåra',
      objective: 'Eleverna räknar ut de sista uppgifterna 7 · 7, 7 · 8, 7 · 9, 8 · 8, 8 · 9 och 9 · 9 genom att dela upp den ena faktorn så att de får två multiplikationer de kan, till exempel 7 · 8 = 5 · 8 + 2 · 8, och skriver 9:ans tabell med hjälp av 10:ans.',
      note: {
        mistake: 'Eleverna delar rutnätet utan att tänka på vilka delar de kan, till exempel 7 · 8 i 6 · 8 och 1 · 8, så att den ena delen är lika svår som hela uppgiften, och räknar den då med hopp. Andra skriver rätt delprodukter men glömmer att lägga ihop dem. I 9:ans tabell drar de bort 9 i stället för den andra faktorn, så att 9 · 6 blir 60 − 9.',
        words: 'Visa på Bullplåten: lägg 7 rader med 8 bullar och bryt efter den femte raden. ”5 rader med 8 är 40. 2 rader med 8 är 16. 7 · 8 är 40 + 16, alltså 56.” Fråga: ”Var vill du dra strecket så att du kan båda delarna?” För 9:ans tabell: lägg 10 rader med 6 och bryt av en rad. ”10 · 6 är 60. En rad med 6 bort: 9 · 6 är 54.” Vrid plåten ett kvarts varv: ”6 · 9 är lika mycket: 54.”',
        watch: 'Titta var eleven drar strecket: en delning efter 5 rader ger en uppgift ur 5:ans tabell och en liten del med 2, 3 eller 4 rader, ur tabeller som klassen har gått igenom. Det lättare bladet har strecket och delarna tryckta. På det svårare delar eleven samma rutnät på två olika sätt och ser att summan blir densamma. På bladet med 9:ans tabell: be eleven berätta hur 7 · 9 och 8 · 9 räknades ut.',
      },
    },
    // ── åk 2: Addition och subtraktion 0–100 ──
    '1:mental-math-to-100#talsorterna-var-for-sig': {
      title: 'Addera tvåsiffriga tal: talsorterna var för sig',
      objective: 'Eleverna adderar två tvåsiffriga tal i talområdet 0–100, som 34 + 25 och 47 + 26, genom att addera tiotalen för sig och entalen för sig och skriva mellanled.',
      note: {
        mistake: 'När entalen blir tio eller fler skriver eleverna de två summorna bredvid varandra, så att 47 + 26 blir 613, eller så tappar de det nya tiotalet och svarar 63. Andra adderar tiotalen som ental och skriver 4 + 2 = 6 i stället för 40 + 20 = 60.',
        words: 'Bygg 47 i Tiotalslabbet och lägg till 26: först 2 tiostavar, sedan 6 entalskuber. Säg: ”4 tiotal och 2 tiotal är 6 tiotal: 60. 7 ental och 6 ental är 13. 60 + 13 = 73.” Fråga: ”Vad är 13? Ett tiotal och tre ental. Var hamnar det tiotalet?”',
        watch: 'Kontrollera första rutan i varje uppgift: har eleven skrivit 60 och inte 6 efter 40 + 20? Det lättare bladet har uppgifter utan tiotalsövergång, som 34 + 25. På det svårare bladet skriver eleven uppdelningen själv; den första uppgiften visar hur. Se där att första raden är 40 + 20 och inte 4 + 2. Alla uppgifter på det svårare bladet har inte tiotalsövergång; låt eleverna först säga vilka som har det. Låt eleverna pröva svaret mot ett överslag: 47 + 26 är ungefär 50 + 25.',
      },
    },
  },
};
