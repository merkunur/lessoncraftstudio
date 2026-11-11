'use strict';
/**
 * Lärarkommentarer, svenska, matematik åk 1 (Daily Teaching System, Part 4.6). Skrivna utifrån vad de svenska
 * arbetsbladen TRYCKER och för undervisningen i Sverige: talområdet 0–20, tiokamrater, likhetstecknets betydelse,
 * ”halv tre” är 2.30, veckan börjar på måndag, ordningstal skrivs 1:a, 2:a, 3:e. Ingen översättning av de engelska
 * kommentarerna. Tilltal: du; barnen heter eleverna.
 */
module.exports = {
  loc: 'sv',
  points: {
    '1:add-within-10-models': {
      title: 'Addera två grupper',
      objective: 'Eleverna lägger ihop två grupper med sammanlagt högst 10 saker, räknar hur många det är tillsammans och skriver summan.',
      note: {
        mistake: 'Många elever räknar den första gruppen, börjar om på 1 i den andra och skriver det andra talet som summa. Andra räknar en bild två gånger eller hoppar över en.',
        words: 'Fråga: ”Hur många är det här? Hur många är det där? Hur många är det tillsammans?” Peka på tecknen och säg ”plus” och ”är lika med”; ”är lika med” betyder ”är lika mycket som”. Kalla svaret ”summan”.',
        watch: 'Se vilka som pekar på varje bild en gång när de räknar. En elev som säger det första talet och räknar vidare därifrån (”fyra … fem, sex”) är redo att gå vidare.',
      },
    },
    '1:subtract-cross-out': {
      title: 'Ta bort: hur många är kvar?',
      objective: 'Eleverna ser en grupp med högst 10 bilder där några är överstrukna, räknar hur många som är kvar och skriver talet.',
      note: {
        mistake: 'Eleverna räknar de överstrukna bilderna i stället för dem som är kvar, eller räknar alla bilder, överstrukna eller inte, och skriver talet de började med.',
        words: 'Säg: ”Vi börjar med sex. Vi tar bort två. Hur många är kvar?” Läs 6 − 2 först som ”sex ta bort två” och sedan som ”sex minus två”.',
        watch: 'Be varje elev peka på bilderna som är kvar innan svaret skrivs. Den som är osäker gör det först med plockmaterial: lägg sex knappar, skjut undan två och räkna dem som ligger kvar. De två bladen har samma uppgift; använd det andra som repetition.',
      },
    },
    '1:count-on-back-hops': {
      title: 'Räkna framåt och bakåt på tallinjen',
      objective: 'Eleverna adderar genom att hoppa framåt och subtraherar genom att hoppa bakåt på en tallinje, med start på det första talet.',
      note: {
        mistake: 'Eleverna räknar starttalet som första hoppet, så 5 + 3 landar på 7. När de räknar bakåt landar de ett för högt av samma skäl.',
        words: 'Säg: ”Sätt fingret på 5 och säg fem. Hoppa tre gånger och räkna där du landar: sex, sju, åtta.” Säg ”hoppa framåt” om addition och ”hoppa bakåt” om subtraktion.',
        watch: 'Titta på första hoppet. En elev som säger starttalet medan fingret rör sig landar ett steg fel. Låt eleven rita varje hopp som en båge och räkna bågarna, inte strecken: tre bågar för + 3.',
      },
    },
    'K:fact-fluency-colour-code': {
      title: 'Räkna och måla efter kod',
      objective: 'Eleverna räknar ut additioner och subtraktioner och målar varje fält i en bild med färgen för svaret.',
      note: {
        mistake: 'Eleverna ser två tal och adderar, också när tecknet är minus. Eller så räknar de rätt och målar sedan efter uppgiftens första tal i stället för efter svaret.',
        words: 'Säg: ”Ringa in tecknet först. Är det plus eller minus?” Sedan: ”Skriv svaret litet i fältet. Leta nu upp DET talet i koden.” Låt eleverna använda fingrarna eller en tioram; bladet är övning, inte ett test på tid.',
        watch: 'Se vilka som skriver svaren innan de målar. Bilden visar felen av sig själv: ett fält i fel färg är en uppgift att kontrollera tillsammans.',
      },
    },
    '1:word-problems': {
      title: 'Räknehändelser till 10',
      objective: 'Eleverna löser räknehändelser med addition och subtraktion inom 10 och säger eller skriver händelsen på mattespråket.',
      note: {
        mistake: 'Eleverna plockar ut de två talen och adderar dem vad händelsen än säger, eller letar efter ett enda ord som ”fler” och väljer räknesätt efter det.',
        words: 'Fråga: ”Vad händer i räknehändelsen? Kommer det fler eller försvinner några?” Låt eleven återberätta händelsen innan något tal skrivs. Sedan: ”Skriv händelsen på mattespråket: 4 + 2 = 6.” Bladet har bara en ruta för svaret, så låt eleverna skriva uträkningen bredvid. På hösten läser du texten högt; de flesta kan inte läsa den själva än.',
        watch: 'Lyssna på återberättandet. En elev som kan spela upp händelsen med plockmaterial men skriver fel tecken behöver kopplingen mellan handlingen och tecknet, inte mer räkning.',
      },
    },
    '1:fluency-within-20': {
      title: 'Huvudräkning 0–10',
      objective: 'Eleverna adderar och subtraherar inom 10 utan att räkna en och en varje gång, med kombinationer de kan utantill och sådana de kan tänka ut.',
      note: {
        mistake: 'Eleverna räknar varje uppgift från 1, också 5 + 1 och 4 + 4, för räknandet har alltid gett rätt svar. När de pressas att vara snabba slutar de räkna och gissar.',
        words: 'Fråga: ”Vilka kan du utantill? Vilka kan du tänka ut från en du redan kan?” Till exempel: ”Jag kan 4 + 4. Då är 4 + 5 ett mer.” Kalla 4 + 4 en dubbla och 4 + 5 en ”dubbla plus ett”.',
        watch: 'Anteckna vilka kombinationer varje elev fortfarande räknar sig fram till; dem kommer du tillbaka till. Ta inte tid. Bladet stannar vid 10: till additionen och subtraktionen mellan 11 och 20 behöver du annat material.',
      },
    },
    '1:make-10': {
      title: 'Tiokamrater',
      objective: 'Eleverna hittar det tal som tillsammans med ett givet tal blir 10 och lär sig tiokamraterna utantill.',
      note: {
        mistake: 'Eleverna kan 5 + 5 och 9 + 1 men räknar från 1 för de andra paren. Många ser inte att 3 + 7 och 7 + 3 är samma par.',
        words: 'Fråga: ”Vilket tal är tiokamrat med 6?” I tioramen: ”Sex rutor är fulla. Hur många är tomma?” Visa med fingrarna: ”Sex fingrar uppe. Hur många är nere?”',
        watch: 'Vem svarar utifrån de tomma rutorna utan att räkna de fulla en gång till? De eleverna går vidare till labyrinten; de andra stannar vid tioramen. Tiokamraterna är höstterminens viktigaste kunskap i åk 1 och behöver några minuter varje dag.',
      },
    },
    '1:fact-families': {
      title: 'Talfamiljer till 10',
      objective: 'Eleverna använder tre tal som hör ihop och skriver de två additioner och de två subtraktioner som hör till dem.',
      note: {
        mistake: 'Eleverna skriver 3 + 7 = 10 och 7 + 3 = 10 utan besvär och sedan 3 − 7 = 10 eller 7 − 10 = 3, för de flyttar runt talen utan att tänka på vilket som är helheten.',
        words: 'Fråga: ”Vilket tal är helheten? Vilka två är delarna?” Sedan: ”Delarna blir helheten tillsammans. Helheten minus en del är den andra delen.” Arbetsbladet säger räknefamiljer; de flesta läromedel säger talfamiljer.',
        watch: 'Kontrollera att varje subtraktion börjar med helheten. Gör den inte det lägger ni helheten med plockmaterial, tar bort en del och ser vad som ligger kvar.',
      },
    },
    '1:missing-number-equations': {
      title: 'Öppna utsagor: vilket tal saknas?',
      objective: 'Eleverna hittar det okända talet i en addition eller subtraktion inom 10, var det än står.',
      note: {
        mistake: 'Eleverna adderar de två tal de ser: för 4 + □ = 9 skriver de 13. För □ − 3 = 5 skriver många 2. Likhetstecknet läser de som ”nu kommer svaret”.',
        words: 'Läs rutan som ”vilket tal”: ”Fyra plus vilket tal är lika med nio?” Läs likhetstecknet som ”är lika mycket som” och visa det som en våg: ”Det ska vara lika mycket på båda sidor.”',
        watch: 'Låt eleven läsa den färdiga likheten högt och säga om den stämmer. En elev som räknar upp från 4 till 9 på fingrarna har förstått tanken.',
      },
    },
    '1:add-three-addends': {
      title: 'Addera tre grupper',
      objective: 'Eleverna adderar tre grupper bilder med summa högst 10 och börjar med de två tal som är lättast att lägga ihop.',
      note: {
        mistake: 'Eleverna adderar de två första grupperna, skriver det talet och glömmer den tredje. Eller så räknar de varje bild från 1 och använder aldrig något de kan, som en dubbla.',
        words: 'Säg: ”Tre grupper. Lägg ihop två av dem först, sedan den tredje.” Fråga: ”Vilka två är lätta att börja med? Ser du en dubbla?” Visa att man får välja: ”2 + 4 + 2. Jag tar 2 och 2 först. Det är 4. Och 4 till är 8.”',
        watch: 'Se vilka som letar efter ett lätt par innan de adderar. Be en elev berätta vilka två tal som lades ihop först och varför; skälet är viktigare än farten.',
      },
    },
    '1:number-walls': {
      title: 'Talpyramider',
      objective: 'Eleverna fyller i en talpyramid där varje sten är summan av de två stenarna under den, och hittar en sten som saknas längst ner.',
      note: {
        mistake: 'Eleverna adderar två stenar som ligger bredvid varandra och skriver summan bredvid dem, inte ovanför. När en sten längst ner saknas adderar de de två tal de ser i stället för att fråga vad som fattas.',
        words: 'Peka med två fingrar under en sten: ”Den här stenen ligger på de här två. Den är deras summa.” Om en sten som saknas: ”7 ligger på 4 och vilket tal? Fyra och hur många är sju?”',
        watch: 'Titta på pyramiderna där en sten längst ner saknas. En elev som skriver 11 bredvid en 4:a under en 7:a har adderat igen. Fråga: ”Kan en sten längre ner vara större än stenen som ligger på den?”',
      },
    },
    '1:shape-attributes': {
      title: 'Vad gör en form till just den formen?',
      objective: 'Eleverna avgör med hjälp av sidor och hörn om en form verkligen är en triangel, en rektangel eller en kvadrat, och skriver formernas namn.',
      note: {
        mistake: 'Eleverna godtar en form med en böjd sida eller ett öppet hörn som triangel för att den ”ser ut som en”, och underkänner en riktig triangel som är lång, smal eller vriden. Färg och storlek tas som en del av vad formen är.',
        words: 'Fråga: ”Vad MÅSTE en triangel ha?” (Tre raka sidor, tre hörn, och den ska vara sluten.) ”Spelar det någon roll om den är stor, röd eller vriden?” (Nej.) Låt eleverna ge skälet: ”Det är ingen triangel, för den här sidan är böjd.”',
        watch: 'Lyssna efter skäl som nämner sidor och hörn. En elev som säger ”den är för spetsig” eller ”den är upp och ner” går fortfarande efter utseendet. En kvadrat är också en rektangel; godta det svaret och säg varför. Bladet där eleverna skriver namnen passar på vårterminen.',
      },
    },
    '1:tangram-compose': {
      title: 'Tangram',
      objective: 'Eleverna bygger en figur med de sju tangrambitarna och hittar den bit som saknas i en figur.',
      note: {
        mistake: 'Eleverna lägger de stora bitarna sist och får inte plats, eller har en bit över och kallar figuren färdig. Som saknad bit väljer de en med rätt form och fel storlek.',
        words: 'Säg: ”Börja med de två stora trianglarna. Var kan de ligga?” Fråga: ”Har du använt alla sju? Sticker något ut?” Om biten som saknas: ”Rätt form OCH rätt storlek. Vrid den i huvudet.”',
        watch: 'Skuggbilderna har inga linjer inuti och är svåra: låt eleverna arbeta i par, och ge den som har kört fast en bit på plats, inte hela lösningen. Varje elev eller par behöver ett eget tangram; klipp ut bitarna i förväg.',
      },
    },
    '1:patterns-missing': {
      title: 'Mönster: två bilder saknas',
      objective: 'Eleverna hittar den del som upprepas i ett mönster och sätter in de två bilder som saknas.',
      note: {
        mistake: 'Eleverna sätter samma bild i båda de tomma rutorna, eller tittar bara på bilden precis före luckan. En lucka mitt i raden är svårare än en i slutet.',
        words: 'Läs raden högt och klappa vid varje tom ruta: ”stjärna, måne, stjärna, (klapp), stjärna, måne.” Fråga: ”Vilken del upprepas? Säg den. Vad ska då stå i luckan?” Kontrollera genom att läsa den färdiga raden högt.',
        watch: 'Lägg märke till vilka som läser hela raden en gång till när luckorna är fyllda. Den kontrollen fångar de flesta felen; lär ut den som sista steg i varje mönster.',
      },
    },
    '1:measure-length-units': {
      title: 'Mäta längd med rutor',
      objective: 'Eleverna mäter hur lång en sak är genom att räkna rutorna under den och ordnar tre saker från kortast till längst.',
      note: {
        mistake: 'Eleverna räknar alla rutor i raden, också dem som saken inte når fram till, eller räknar strecken i stället för rutorna. När de ordnar går de efter var saken slutar på bladet och inte efter hur lång den är.',
        words: 'Mät först något i klassrummet med gem eller klossar, tätt och utan mellanrum. Säg vid bladet: ”Räkna bara rutorna under saken, från början till slut.” Säg enheten varje gång: ”Pennan är 6 rutor lång.” Fråga: ”Vilken är längst? Hur många rutor längre?”',
        watch: 'Lyssna efter svar utan enhet (”6”) och fråga ”sex vad?” Kontrollera en sak som inte börjar vid radens kant; det är där eleverna räknar för många.',
      },
    },
    '1:number-line-placement': {
      title: 'Hitta talet på tallinjen',
      objective: 'Eleverna läser av vilket tal en pil pekar på på en tallinje till 20 genom att räkna vidare från närmaste utsatta tal.',
      note: {
        mistake: 'Eleverna räknar strecken och börjar med 1 vid nollan, så varje svar blir ett för stort. När bara några tal står utsatta räknar de från 0 för varje pil och tappar bort sig på vägen.',
        words: 'Säg: ”Noll är starten, inte nummer ett. Räkna HOPPEN, inte strecken.” När få tal står utsatta: ”Vilket utsatt tal ligger närmast pilen? Börja där. Du kan räkna bakåt också.”',
        watch: 'Se var en elev börjar för en pil vid 18. Den som räknar två steg bakåt från 20 använder linjen; att räkna upp från 0 fungerar men tar tid. Ett svar som är precis ett för stort betyder att eleven räknade streck. Tallinjen till 30 är en utmaning för dem som är säkra till 20.',
      },
    },
    '1:number-of-the-day': {
      title: 'Dagens tal: 11 till 20',
      objective: 'Eleverna visar ett tal mellan 11 och 20 på flera sätt, bland annat som tiotal och ental, i tioramar och med talets namn.',
      note: {
        mistake: 'Eleverna fyller i varje ruta som en egen uppgift och märker inte när två rutor säger olika: 15 som tiotal och ental, men 14 i tioramarna. Ett tal mellan 11 och 19 skrivs som 1 och 5 utan en tanke på att 1:an är ett tiotal.',
        words: 'Fråga efter bladet: ”Visar alla dina rutor samma tal? Bevisa det.” Säg: ”Femton är ett tiotal och fem ental. Visa mig tiotalet i tioramarna: en full ram.” Säg ”tiotal” och ”ental” varje gång, inte ”ettan och femman”.',
        watch: 'Använd bladet som en snabb koll på vad varje elev kan: vilken ruta lämnas tom eller görs sist? Den rutan visar vad eleven behöver härnäst. Bladet passar på vårterminen, när talen 11–20 är genomgångna.',
      },
    },
    '1:number-words': {
      title: 'Tal med bokstäver till 20',
      objective: 'Eleverna läser tal skrivna med siffror och parar ihop dem med talens namn skrivna med bokstäver, upp till tjugo.',
      note: {
        mistake: 'Eleverna gissar ordet på första bokstaven: fyra, fem, fjorton och femton börjar alla på f, och sex, sju, sexton och sjutton på s. Elva, tolv och arton liknar inte talen de står för.',
        words: 'Säg slutet tydligt: ”Fem-TON är tio och fem. Orden från tretton till nitton slutar på -ton.” Fråga: ”Slutar ordet på -ton?” Låt eleverna stryka under slutet innan de ringar in. Läs de svåra tillsammans: elva, tolv, fjorton, arton, tjugo.',
        watch: 'Lyssna när en elev läser svarsalternativen högt. Den som läser ”fem” för femton tittar bara på ordets början; täck början med ett finger och läs slutet först. Det här är lika mycket en läsuppgift som en matematikuppgift; läs med dem som ännu inte läser själva.',
      },
    },
    'K:number-bonds-20': {
      title: 'Tjugokamrater',
      objective: 'Eleverna hittar det tal som tillsammans med ett givet tal blir 20 och tar hjälp av tiokamraterna.',
      note: {
        mistake: 'Elever som kan tiokamraterna använder dem inte här: för 13 och vilket tal blir 20 räknar de upp ett i taget från 13 och hamnar ofta ett steg fel. De ser inte att 13 är 10 och 3, så att kamraten är densamma som till 3.',
        words: 'Säg: ”Vilket tal är tiokamrat med 3? Sju. Då är 13 och 7 tjugokamrater.” I två tioramar: ”En ram är full. I den andra är 3 fyllda. Hur många är tomma?” Skriv paret: ”3 + 7 = 10. 13 + 7 = 20.” Arbetsbladet säger tjugokompisar; det är samma sak.',
        watch: 'Se vilka som använder tiokamraterna. En elev som räknar upp ett i taget vid varje uppgift går tillbaka till tiokamraterna först. Lektionen hör till vårterminen.',
      },
    },
    '1:doubles-halves': {
      title: 'Dubbelt och hälften',
      objective: 'Eleverna dubblar en grupp bilder och delar en grupp med jämnt antal i två lika delar, och skriver talen.',
      note: {
        mistake: 'Eleverna tror att dubbelt betyder plus 2, så dubbelt av 6 blir 8. Vid hälften tar de bort några och kontrollerar inte att delarna är lika; hälften av 10 blir 4 och 6.',
        words: 'Säg: ”Dubbelt betyder lika många en gång till. Sex och sex till.” Använd två händer: ”Visa 4 på varje hand.” Om hälften: ”Hälften betyder två LIKA stora delar. En till dig, en till mig, tills det är slut. Är delarna lika?”',
        watch: 'Se vilka som kan dubblorna till 5 + 5 utan att räkna och vilka som räknar varje bild; bladet går vidare till 7 + 7. De som räknar bygger varje dubbla med två händer eller i två rader i en tioram.',
      },
    },
    'K:odd-even-pairing': {
      title: 'Udda eller jämnt: para ihop',
      objective: 'Eleverna parar ihop bilderna i en grupp och säger att talet är jämnt när alla har en kompis och udda när en blir över.',
      note: {
        mistake: 'Eleverna ringar in tre bilder tillsammans eller missar en bild som sitter långt bort, så en blir över som inte borde bli det, eller ingen när en borde. Några tror att ”udda” betyder konstig.',
        words: 'Säg: ”Två och två. Har alla en kompis?” Sätt sedan ord på det: ”Ingen blir över. Sex är ett JÄMNT tal.” ”En blir över. Sju är ett UDDA tal.” Ställ upp klassen i par och se efter: blir någon över i dag?',
        watch: 'Kontrollera att varje ring rymmer precis två. Målet är att para ihop noggrant, inte att kunna utantill vilka tal som är udda.',
      },
    },
    '1:odd-even-pairs': {
      title: 'Udda och jämna tal',
      objective: 'Eleverna räknar en grupp parvis eller delar den mellan två kompisar och säger om antalet är udda eller jämnt.',
      note: {
        mistake: 'Eleverna bestämmer sig efter hur talet ser ut (”11 är jämnt för det har två ettor”) och hoppar över parbildningen. När de delar glömmer de att skriva den som blir över, eller ger den till en av kompisarna.',
        words: 'Fråga: ”Kan två kompisar dela lika? Blir en över?” Säg: ”Jämna tal går att dela lika på två. Udda tal ger en över.” Knyt det till dubblorna: ”8 är 4 och 4. Varje jämnt tal är en dubbla.” Låt eleverna räkna två i taget medan de ringar in: ”2, 4, 6 … och en till blir 7.”',
        watch: 'Lägg märke till vilka som börjar se regeln i entalen: tal som slutar på 0, 2, 4, 6 eller 8 är jämna. Låt eleverna hitta regeln på sina egna blad innan du säger den.',
      },
    },
    'K:days-of-week': {
      title: 'Veckans dagar',
      objective: 'Eleverna säger veckans sju dagar i ordning och ordnar och skriver dagarna på ett blad.',
      note: {
        mistake: 'Eleverna kan rabbla dagarna i ordning men kan inte börja mitt i: på frågan vad som kommer efter onsdag börjar de om från måndag. Tisdag och torsdag blandas ihop för att de börjar likadant.',
        words: 'Fråga varje morgon: ”Vilken dag är det i dag? Vilken dag var det i går? Vilken dag är det i morgon?” Peka på orden medan klassen säger dem. För de två t-dagarna tittar ni på andra bokstaven: ”Tisdag börjar på t-i. Torsdag börjar på t-o.”',
        watch: 'Se vilka som måste rabbla hela ramsan för varje svar. På bladet med avskrift kontrollerar du att varje ord skrivs av bokstav för bokstav från ordrutan; det bladet är lika mycket läsning och skrivning som matematik.',
      },
    },
    '1:days-months-seasons': {
      title: 'I går, i dag, i morgon och årets månader',
      objective: 'Eleverna skriver dagen som var i går och dagen som kommer i morgon, och ordnar årets tolv månader.',
      note: {
        mistake: 'Eleverna blandar ihop i går och i morgon, och kör fast när i dag är söndag, för veckan verkar ta slut där. Med månaderna rasar ordningen efter de första.',
        words: 'Säg: ”I går är dagen före i dag. I morgon är dagen efter.” Visa att veckan går runt: ”Efter söndag kommer måndag igen.” Säg månaderna i fyra grupper om tre och fråga: ”Vilken månad fyller du år? Vilken månad kommer före den?”',
        watch: 'Kontrollera uppgifterna där i dag ligger vid veckans kant: efter söndag kommer måndag, och veckan börjar om. Lägg märke till vilka som måste börja från januari varje gång; säg månaderna tillsammans med almanackan framme tills de kan börja var som helst.',
      },
    },
    '1:ordinal-numbers': {
      title: 'Ordningstal till tionde',
      objective: 'Eleverna skriver ordningstalen från första till tionde i ordning och parar ihop ord som tredje och femte med en plats i en rad.',
      note: {
        mistake: 'Eleverna skriver 1:e och 2:e, eller bara talet utan ändelse. De läser ”femte” som ”fem” och ”åttonde” som ”åtta”, och hittar platsen genom att räkna bilder i stället för att läsa ordet.',
        words: 'Lär ut ändelserna: ”1:a och 2:a slutar på a, första och andra. Från 3:e och uppåt slutar de på e: tredje, fjärde, femte.” Läs orden högt tillsammans, särskilt sjätte, sjunde och åttonde. Fråga varje gång: ”Var är flaggan? Där börjar vi.” Knyt det till datumet: ”I dag är det den tredje maj.”',
        watch: 'Kontrollera ändelserna på 1:a och 2:a och att eleven börjar vid flaggan. Att läsa ordningstalen med bokstäver är en läsuppgift; läs dem tillsammans med de elever som inte läser själva än.',
      },
    },
    '1:time-read': {
      title: 'Klockan: hel och halv timme',
      objective: 'Eleverna läser av en klocka på hel och halv timme och väljer den tid som passar.',
      note: {
        mistake: 'Eleverna blandar ihop visarna och läser klockan 6 som halv ett. Vid halv står timvisaren mellan två tal, och eleverna säger det tal som visaren har lämnat: halv tre blir ”halv två”.',
        words: 'Säg: ”Den korta visaren är timvisaren. Läs den först.” Vid halv: ”Timvisaren är på väg från 2 till 3. Den har gått halva vägen till tre, och därför säger vi halv TRE.” Säg tiden på båda sätten: ”halv tre” och ”två och trettio”.',
        watch: 'Fråga var timvisaren pekar vid halv och lyssna efter ”mellan”. En elev som säger ”halv två” när klockan är halv tre tänker på timmen som har varit; låt eleven flytta visarna på en riktig klocka från två till tre och stanna halvvägs.',
      },
    },
    '1:time-set-hands': {
      title: 'Rita visarna på klockan',
      objective: 'Eleverna läser en tid på hel eller halv timme och ritar timvisaren och minutvisaren på en klocka.',
      note: {
        mistake: 'Eleverna ritar båda visarna lika långa, så att ingen kan läsa klockan. Vid halv sätter de timvisaren precis på ett tal och inte mitt emellan två: för halv fem pekar den rakt på 5, för det är ”fem” de hör.',
        words: 'Säg: ”När vi LÄSER klockan börjar vi med den korta visaren. När vi RITAR är den långa lättast att placera, så rita den först: på 12 vid hel timme, på 6 vid halv. Sedan timvisaren: KORT.” Om halv fem: ”Den korta visaren står mitt emellan 4 och 5, på väg mot fem.”',
        watch: 'Titta på visarnas längd och på var den korta visaren står vid halv. Att rita visar det som läsningen döljer: en elev kan välja rätt tid i en lista och ändå inte veta var timvisaren ska stå.',
      },
    },
    '1:sort-three-groups': {
      title: 'Sortera i tre grupper',
      objective: 'Eleverna avgör var varje bild hör hemma och sorterar bilderna i tre grupper.',
      note: {
        mistake: 'Eleverna sorterar efter något eget (färg, eller vad de tycker om) och inte efter bladets tre grupper. Vid en bild som kan passa på två ställen kör de fast, eller så får bilden två streck.',
        words: 'Läs de tre lådorna först: ”Vad ska ligga i den här? Vilken är regeln?” Fråga efter skälet vid varje streck: ”Varför ska äpplet dit?” Efteråt: ”Vilken låda har flest? Vilken har färst?”',
        watch: 'Lyssna mer på skälen än du kontrollerar strecken. En elev som kan säga regeln för en låda sorterar på riktigt; en elev som bara går efter utseendet tappar bort sig när bilderna byts ut.',
      },
    },
    'K:tally-marks': {
      title: 'Räkna med streck: fem i varje knippe',
      objective: 'Eleverna visar ett antal med streck, lägger det femte strecket tvärs över de fyra första och läser av strecken som ett tal.',
      note: {
        mistake: 'Eleverna drar fem raka streck och lägger ett sjätte tvärs över, så varje knippe blir värt sex. Andra lägger aldrig något tvärs över och drar en enda lång rad streck.',
        words: 'Säg medan ni drar: ”Ett, två, tre, fyra, och det FEMTE på tvären.” Säg: ”Strecket på tvären är nummer fem. Det är inget extra.” När ni läser av börjar ni från knippet: ”Fem … sex, sju.” Med två knippen: ”Fem, tio … elva.” Så prickar man av när man räknar något till en tabell.',
        watch: 'Titta när eleverna drar: räkna de raka strecken innan det sneda läggs på. När de läser av lyssnar du efter ett ”fem” direkt för ett knippe och inte ”ett, två, tre, fyra, fem”.',
      },
    },
    '1:picture-graphs-sort-count': {
      title: 'Sortera, räkna och läsa ett bilddiagram',
      objective: 'Eleverna räknar varje sort i en blandad samling, skriver antalen i en tabell och läser av hur många ett bilddiagram visar i varje rad.',
      note: {
        mistake: 'Eleverna skriver ett antal på fel rad i tabellen för att de inte tittar på bilden i början av raden. Bladen frågar bara efter antal; när du lägger till frågan ”hur många fler” svarar eleverna med det större talet och inte med skillnaden.',
        words: 'Säg: ”Varje bild i diagrammet står för en sak.” Ställ tre sorters frågor: ”Hur många äpplen? Vilken sort finns det flest av? Hur många FLER äpplen än päron?” Vid ”hur många fler” lägger ni de två raderna under varandra och räknar dem som sticker ut. Bladet säger ”summorna”; det är antalen ni skriver i tabellen.',
        watch: 'Ställ en ”hur många fler”-fråga till varje elev; den är den svåra. Se vem som jämför två rader genom att para ihop dem och vem som bara läser av det större talet.',
      },
    },
    '1:bar-graphs': {
      title: 'Läsa och rita stapeldiagram',
      objective: 'Eleverna läser av vilket tal varje stapel visar och målar ett stapeldiagram, en ruta för varje sak som räknats.',
      note: {
        mistake: 'Eleverna räknar rutorna i en stapel och hoppar över den nedersta, eller räknar linjen högst upp som en till, så talet blir ett för litet eller ett för stort. De följer inte stapelns topp över till talet vid sidan.',
        words: 'Säg: ”Sätt fingret på stapelns topp. Dra det åt sidan till talen. Vilket tal hamnar du på?” När ni målar: ”Börja längst ner. En ruta för varje. Stanna vid talet.”',
        watch: 'Se vem som använder talen vid sidan och vem som räknar rutor en och en; båda fungerar, men talen vid sidan är det nya. Kontrollera att målade staplar börjar längst ner och inte har några luckor.',
      },
    },
  },
};
