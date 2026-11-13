'use strict';
/**
 * Lärarkommentarer, svenska, matematik: de lektioner i det planerade läsåret som blev möjliga med "Year pages D"
 * (Daily Teaching System, Part 12.2): tiotalsövergång i subtraktion och arbetsområdet Utblick mot 100 i åk 1, tre
 * lektioner i Addition och subtraktion 0–100 i åk 2. En post per lektion: ett nytt lärandesteg eller ÄNNU en lektion
 * till ett steg som redan har en ("<point>#<name>"). Skrivna utifrån det arbetsblad som lektionen delar ut (på den
 * nivå lektionen anger), för undervisning i Sverige enligt Lgr22, och lästa av en svensk lågstadielärare med bladen
 * bredvid (19 fynd införda, 2026-11-13). Ingen översättning av de engelska kommentarerna.
 */
module.exports = {
  loc: 'sv',
  points: {
    // ── åk 1: Addition och subtraktion 0–20 ──
    '1:fluency-within-20#tiotalsovergang-subtraktion': {
      title: 'Tiotalsövergång i subtraktion: först ner till tian',
      objective: 'Eleverna subtraherar med tiotalsövergång på tallinjen i två steg, först ner till 10 och sedan resten, och skriver hur de räknar: 13 − 5 = 13 − 3 − 2 = 8.',
      note: {
        mistake: 'Eleverna räknar bakåt ett steg i taget och räknar starttalet som första steget, så att 13 − 5 blir 9. Andra tar bort ner till 10 och drar sedan bort hela 5 en gång till, så att svaret blir 5.',
        words: 'Fråga: ”Hur många ska du ta bort för att komma ner till 10? Du ska ta bort 5 och har tagit bort 3. Hur många är kvar att ta bort?” Säg: ”Först ner till tian, sedan resten.” Rita de två hoppen på en tom tallinje på tavlan.',
        watch: 'Titta på det första hoppet: det är lika stort som entalen i starttalet och ska landa på 10. Kontrollera att de två hoppen i rutorna tillsammans blir det tal som ska tas bort.',
      },
    },
    // ── åk 1: Utblick mot 100 ──
    '1:skip-counting#hela-tiotal': {
      title: 'Hela tiotal: 10, 20, 30 … 100',
      objective: 'Eleverna räknar i kör i hela tiotal från 0 till 100 och tillbaka och skriver de tiotal som saknas i talrader som börjar på 0, 10 eller 20.',
      note: {
        mistake: 'Eleverna blandar ihop tretton och trettio, fjorton och fyrtio när de säger och skriver talen: 13 i stället för 30. På raden som börjar på 0 skriver några 1 i stället för 10, och på en rad som börjar på 20 börjar några om från 10.',
        words: 'Räkna i kör medan ni lägger tiostavar på rad: ”tio, tjugo, trettio.” Säg: ”Trettio är tre tiotal. Tretton är ett tiotal och tre ental.” Fråga vid en rad som börjar på 20: ”Tjugo. Vad är tio mer?” Räkna också bakåt från 100 tillsammans.',
        watch: 'Se hur eleverna skriver 30, 40 och 50: ett 13 på 30:s plats visar förväxlingen. Lägg märke till vilka som kan fortsätta en rad som börjar på 20 och vilka som måste räkna från 10 för att hitta rätt.',
      },
    },
    '2:bundle-ten-ones#bunta-tio': {
      title: 'Bunta tio: tiotal och ental',
      objective: 'Eleverna räknar ett större antal lösa ental genom att ringa in tio i taget och skriver hur många tiotal det blir och hur många ental som blir över, till exempel 3 tiotal och 4 ental.',
      note: {
        mistake: 'Eleverna ringar in nio eller elva i stället för tio när de inte använder kolumnerna om fem. Andra räknar ringarna rätt men tar sedan med inringade ental när de räknar dem som blir över. Några skriver antalet ental i rutan för tiotal.',
        words: 'Säg: ”Två hela kolumner är tio. Ringa in dem.” Fråga efteråt: ”Hur många ringar har du? Så många tiotal är det. Hur många ental står utanför ringarna?” Låt eleven säga talet högt: ”3 tiotal och 4 ental är 34.”',
        watch: 'Kontrollera en ring hos varje elev: en ring med nio eller elva gör hela uppgiften fel. Se vilka som räknar tiotalen i tiosteg, 10, 20, 30, och vilka som räknar om alla från 1.',
      },
    },
    '1:coins#mynten': {
      title: 'Mynten: 1, 2, 5 och 10 kronor',
      objective: 'Eleverna känner igen mynten 1, 2, 5 och 10 kronor och räknar ihop mynten i en börs till summor upp till 20 kronor.',
      note: {
        mistake: 'Eleverna räknar antalet mynt i stället för värdet: en tia och en enkrona blir 2. Andra tror att det större myntet är värt mest, fast tian är mindre än femman, eller börjar med enkronan och räknar tio steg uppåt.',
        words: 'Fråga: ”Hur många kronor är det här myntet värt?” Säg: ”Börja med myntet som är värt mest och räkna vidare: tio, elva.” Låt eleverna växla en tia mot två femmor eller tio enkronor med låtsasmynt och säga: ”Det är lika mycket.”',
        watch: 'Lyssna efter om eleven säger antalet mynt eller antalet kronor. Se vilka som börjar med myntet som är värt mest och räknar vidare, och vilka som räknar varje krona för sig på fingrarna.',
      },
    },
    '2:shopping-money#betala-pa-olika-satt': {
      title: 'Betala på olika sätt',
      objective: 'Eleverna ringar in mynt som tillsammans blir exakt priset, lägger samma pris på ett annat sätt med låtsasmynt och jämför vilket sätt som behöver minst antal mynt.',
      note: {
        mistake: 'Eleverna ringar in mynt tills antalet mynt är lika med priset, eller slutar först när summan har gått förbi priset. Många tror att det bara finns ett rätt sätt och suddar ut en riktig lösning när bänkgrannen har en annan.',
        words: 'Säg: ”Räkna högt medan du ringar in: fem, tio, tolv. Stanna när du är framme vid priset.” Fråga: ”Kan du betala 12 kronor på ett annat sätt? Vilket sätt behöver minst antal mynt?” Låt två elever visa var sin lösning och säg: ”Båda stämmer.”',
        watch: 'Se vilka som börjar med mynten som är värda mest och vilka som plockar enkronor. Den som bara hittar ett sätt får lägga priset med låtsasmynt på bänken och växla en femma mot mindre mynt.',
      },
    },
    // ── åk 2: Addition och subtraktion 0–100 ──
    '1:mental-math-to-100': {
      title: 'Addera och subtrahera hela tiotal',
      objective: 'Eleverna adderar och subtraherar hela tiotal i huvudet, som 34 + 20 och 76 − 30, och förklarar att bara tiotalen ändras.',
      note: {
        mistake: 'Eleverna lägger tiotalet till entalen, så att 34 + 20 blir 36. Vid subtraktion räknar några bakåt ett steg i taget och tappar bort sig. Vid 68 − 50 tar några bort 5 ental i stället för 5 tiotal och svarar 63.',
        words: 'Fråga: ”Hur många tiotal har 34? Två tiotal till. Hur många tiotal är det nu? Och entalen?” Räkna i tiosteg från talet: ”34, 44, 54.” Visa i Talhotellet: hissen går en korridor uppåt för varje tiotal, och du står kvar vid samma dörr.',
        watch: 'Se vilka som ändrar entalssiffran och vilka som fortfarande räknar ett steg i taget. Den som klarar 30 + 20 men fastnar på 34 + 20 lägger talet med tiostavar och entalskuber en gång till.',
      },
    },
    '1:fluency-within-20#tiotalsovergang-upp-till-100': {
      title: 'Tiotalsövergång upp till 100: 38 + 5 och 43 − 5',
      objective: 'Eleverna adderar och subtraherar ental över ett tiotal i talområdet 0–100 genom att först gå till det hela tiotalet, upp vid plus och ner vid minus, som 38 + 2 + 3 och 43 − 3 − 2.',
      note: {
        mistake: 'Eleverna behåller det gamla tiotalet, så att 38 + 5 blir 33. Vid subtraktion vänder några på entalen och räknar 5 − 3: 43 − 5 blir 42. Andra går åt fel håll: vid 66 − 7 hoppar de upp till 70 i stället för ner till 60.',
        words: 'Fråga: ”Vilket tiotal kommer efter 38? Hur långt är det dit? Du ska lägga till 5 och har lagt till 2. Hur mycket är kvar?” Påminn om åk 1: ”Det är som 8 + 5, bara tre tiotal högre.” Vid minus: ”Först ner till 40, sedan resten.”',
        watch: 'Titta på om det första hoppet landar på ett helt tiotal och om de två hoppen tillsammans blir talet som läggs till eller tas bort. Ett svar som ligger kvar i samma tiotal visar att eleven inte gick över tiotalet.',
      },
    },
    '1:open-number-line': {
      title: 'Subtrahera tvåsiffriga tal på tom tallinje',
      objective: 'Eleverna subtraherar tvåsiffriga tal i talområdet 0–100, som 43 − 16 och 72 − 35, genom att rita hopp bakåt på en tom tallinje, tiotalen först och entalen sedan.',
      note: {
        mistake: 'Eleverna drar ifrån tiotalen och entalen var för sig och tar det mindre entalet från det större, så att 72 − 35 blir 43. Andra ritar hoppen åt höger eller skriver inte var hoppen landar och tappar bort sig mitt i uträkningen.',
        words: 'Säg: ”Sätt ut starttalet längst till höger. Hoppa bakåt med tiotalen först: 72, 62, 52, 42. Sedan entalen.” Fråga: ”Var landade du efter varje hopp? Skriv talet under linjen.” När bladet är klart: visa 61 − 58 på tavlan (finns inte på bladet) och säg: ”Från 58 till 61 är det bara 3.”',
        watch: 'Se vilka som delar upp entalshoppet vid tiotalet, 42 − 2 − 3, och vilka som räknar ner ett steg i taget. Kontrollera att hoppen tillsammans blir det tal som ska tas bort.',
      },
    },
  },
};
