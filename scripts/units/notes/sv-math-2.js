'use strict';
/**
 * Lärarkommentarer, svenska, matematik åk 2 (Daily Teaching System, Part 4.6). Skrivna utifrån vad de svenska
 * arbetsbladen TRYCKER och för undervisningen i Sverige: talområdet 0–100, talsorter (tiotal och ental), växling,
 * kronor, ”fem i halv tre”, multiplikation med lika grupper och 2:ans och 5:ans tabell, gångertecknet som punkt.
 * Ingen översättning av de engelska kommentarerna.
 */
module.exports = {
  loc: 'sv',
  points: {
    '2:bundle-ten-ones': {
      title: 'Gör ett tiotal av tio ental',
      objective: 'Eleverna ringar in 10 ental så att de blir ett tiotal och skriver hur många tiotal och ental det är.',
      note: {
        mistake: 'Eleverna ringar in en grupp på ungefär tio utan att räkna, eller gör ett tiotal och räknar sedan dess ental en gång till som ental. Fjorton skrivs som 1 tiotal och 14 ental.',
        words: 'Säg: ”Tio ental är ett tiotal. Ringa in precis tio. Kontrollera.” Sedan: ”Entalen i ringen är ett tiotal nu. Räkna bara dem som är kvar utanför.” Använd ordet växla: ”Vi växlar tio ental mot ett tiotal.”',
        watch: 'Se vem som bara räknar de lösa entalen efter växlingen och vem som räknar alla en gång till. Med riktiga entalskuber sätter eleverna ihop tio till en stav; bladet kommer efter händerna.',
      },
    },
    '1:tens-and-ones': {
      title: 'Tiotal och ental',
      objective: 'Eleverna läser ett tvåsiffrigt tal som visas med tiostavar och entalskuber och väljer de block som visar ett tal.',
      note: {
        mistake: 'Eleverna räknar varje stav som 1, så 3 stavar och 4 kuber blir 7. Eller så skriver de siffrorna i den ordning de räknade: 4 kuber och sedan 3 stavar blir 43.',
        words: 'Räkna stavarna tio i taget och kuberna en i taget: ”10, 20, 30 … 31, 32, 33, 34.” Säg: ”3 tiotal och 4 ental är trettiofyra.” Fråga: ”Vad betyder 3:an i 34?” (Tre tiotal, alltså trettio; inte tre.) Bladet säger block; med eleverna heter de tiostavar och entalskuber.',
        watch: 'Titta på bytet från tio i taget till en i taget; det är där eleverna halkar. Den som halkar pekar på sista staven, säger ”trettio”, gör en paus och pekar sedan på kuberna: ”trettioett, trettiotvå”.',
      },
    },
    '1:hundreds-chart': {
      title: 'Hundrarutan',
      objective: 'Eleverna fyller i tal som saknas i hundrarutan och använder dess mönster: ett mer åt höger, tio mer nedåt.',
      note: {
        mistake: 'Eleverna fyller en lucka genom att räkna från radens början, eller från 1. På en pusselbit skriver de nästa tal i talraden i rutan under (35 under 34), för de ser inte att ett steg ner är tio mer.',
        words: 'Dra fingret nerför en kolumn och läs: ”4, 14, 24, 34. Vad är likadant? Vad ändras?” Säg: ”Åt höger är ett mer. Nedåt är tio mer. Åt vänster är ett mindre. Uppåt är tio mindre.” Det ena bladet säger hundratavlan och det andra hundrarutan; det är samma sak.',
        watch: 'Titta på rutorna under och över det tryckta talet på en pusselbit. En elev som klarar vänster och höger men missar upp och ner behöver ha hela hundrarutan bredvid bladet några dagar till.',
      },
    },
    '1:one-ten-more-less': {
      title: '1 mer, 1 mindre, 10 mer, 10 mindre',
      objective: 'Eleverna skriver talet som är 1 mer och 1 mindre, och talet som är 10 mer och 10 mindre, än ett tvåsiffrigt tal.',
      note: {
        mistake: 'För 10 mer räknar eleverna upp tio steg på fingrarna och hamnar ofta ett steg fel. För 10 mindre ändrar de fel siffra. Ett mer än 29 skrivs 210, för eleven säger ”tjugotio”.',
        words: 'Fråga: ”Tio mer än 34. Vilken siffra ändras? Vilken står kvar?” Säg: ”Tio mer är ett TIOTAL till. Entalen står kvar.” Kontrollera i hundrarutan först när svaret är skrivet.',
        watch: 'Se vem som fortfarande räknar ett i taget för att hitta tio mer. Kontrollera talen som går över ett tiotal, som 1 mer än 39 och 1 mindre än 40; säg de talen högt tillsammans innan ni skriver.',
      },
    },
    '2:hundreds-chart-moves': {
      title: 'Hopp i hundrarutan',
      objective: 'Eleverna följer pilar i hundrarutan, lägger till eller tar bort tiotal och ental och skriver talet de landar på.',
      note: {
        mistake: 'Eleverna blandar ihop riktningarna: uppåt känns som mer, så de lägger till tio vid en pil uppåt. Med flera pilar gör de ett hopp, glömmer talet de kom till och börjar om från första talet.',
        words: 'Låt eleverna säga varje hopp: ”Nedåt är tio mer: 34, 44. Åt höger är ett mer: 45.” Fråga: ”En rad upp. Blir talet större eller mindre? Kontrollera i rutan.” Låt dem skriva talet efter varje pil.',
        watch: 'Lägg märke till vem som måste titta i hundrarutan och vem som gör hoppet i huvudet. Kontrollera pilarna uppåt först; en elev som adderar vid en pil uppåt tänker ”högre är mer”, som på en termometer.',
      },
    },
    '2:number-line-not-from-zero': {
      title: 'En tallinje som inte börjar på noll',
      objective: 'Eleverna läser av vilket tal en pil pekar på på en tallinje som börjar på 40 eller 60 och där bara några tal står utsatta.',
      note: {
        mistake: 'Eleverna räknar strecken från vänster som 1, 2, 3, som om linjen började på noll. Eller så börjar de på ett utsatt tal och räknar det strecket som första hoppet, och hamnar ett steg fel.',
        words: 'Fråga före allt annat: ”Var börjar linjen? Hur mycket är varje hopp värt?” Säg: ”Leta upp närmaste utsatta tal. Räkna vidare därifrån, eller räkna bakåt.” Kontrollera: ”Ligger ditt tal mellan de två utsatta talen på var sin sida?”',
        watch: 'Leta efter svar som 3 eller 7 på en linje från 40 till 60; den eleven har inte brytt sig om de utsatta talen. Låt varje elev säga starttalet och hur stort ett hopp är innan något skrivs.',
      },
    },
    '1:compare-order-two-digit': {
      title: 'Jämföra och ordna tvåsiffriga tal',
      objective: 'Eleverna jämför två tvåsiffriga tal med tecknen för större än och mindre än och ordnar tre tal från minst till störst.',
      note: {
        mistake: 'Eleverna jämför entalen (”29 är mer än 41 för 9 är mer än 1”) eller lägger ihop siffrorna. Tecknen blandas också ihop: eleverna vet vilket tal som är störst och ringar ändå in fel tecken.',
        words: 'Säg: ”Titta på tiotalen först. Fler tiotal betyder ett större tal. Bara om tiotalen är lika tittar du på entalen.” Läs tecknet som ord: ”41 är större än 29.” Tecknets öppna sida, gapet, vänder sig mot det större talet.',
        watch: 'Håll isär två frågor: vet eleven vilket tal som är störst, och kan eleven tecknet? Låt eleven säga hela meningen högt innan den ringar in.',
      },
    },
    '2:odd-even': {
      title: 'Udda och jämna tal upp till 100',
      objective: 'Eleverna parar ihop punkter, skriver ett tal som två lika stora delar med 0 eller 1 över och avgör med entalssiffran om ett tal under 100 är udda eller jämnt.',
      note: {
        mistake: 'Eleverna tittar på fel siffra: 34 kallas udda på grund av 3:an. De kopplar inte ”jämnt” till ”två lika stora delar”, så regeln om entalssiffran blir ett trick utan förklaring.',
        words: 'Säg: ”Jämnt betyder två lika stora delar och inget över: 8 är 4 + 4. Udda betyder en över: 9 är 4 + 4 + 1.” Om stora tal: ”Titta bara på entalssiffran. Tiotalen går alltid att dela lika.” Fråga: ”Är 30 jämnt? Varför?”',
        watch: 'Pröva med 34, 43, 50 och 71. En elev som tittar på tiotalssiffran behöver se att varje tiotal går att dela i 5 och 5, så att det bara är entalen som avgör.',
      },
    },
    '2:add-with-blocks': {
      title: 'Addera med tiostavar och entalskuber',
      objective: 'Eleverna adderar två tvåsiffriga tal som visas med tiostavar och entalskuber, tiotalen för sig och entalen för sig, och skriver summan.',
      note: {
        mistake: 'Eleverna räknar alla block som ental, så 2 stavar och 3 kuber plus 1 stav och 4 kuber blir 10. Eller så lägger de ihop stavar med kuber och skriver siffrorna i fel ordning.',
        words: 'Säg: ”Lägg ihop tiotalen för sig: 2 tiotal och 1 tiotal är 3 tiotal. Lägg ihop entalen för sig: 3 och 4 är 7. Trettiosju.” Kalla det att räkna talsortsvis. Fråga: ”Hur många tiotal blev det? Hur många ental?”',
        watch: 'Se om eleven räknar stavarna tio i taget eller en i taget. Bladets uppgifter kräver ingen växling; uppgifter där entalen blir fler än nio, som 47 + 8, är årskursens stora steg och behöver riktigt tiobasmaterial. Skärmövningen till lektionen tar det steget: där blir tio ental ett nytt tiotal.',
      },
    },
    '2:subtract-with-blocks': {
      title: 'Subtrahera med tiostavar och entalskuber',
      objective: 'Eleverna tar bort ett tvåsiffrigt tal från ett annat med hjälp av tiostavar och entalskuber och skriver hur mycket som är kvar.',
      note: {
        mistake: 'Eleverna tar bort det andra talets block och räknar sedan alla block på bladet, också de borttagna. Eller så subtraherar de entalen och glömmer tiotalen, så 46 − 23 blir 43.',
        words: 'Säg: ”Ta bort tiotalen från tiotalen och entalen från entalen. 4 tiotal minus 2 tiotal är 2 tiotal. 6 ental minus 3 ental är 3 ental. Tjugotre.” Stryk över blocken på bladet allt eftersom de tas bort.',
        watch: 'Kontrollera att både tiotalen och entalen har minskat i svaret. Bladet har inga uppgifter med växling. Fråga de säkra: ”Vad gör du vid 52 − 17, när entalen inte räcker?” och låt dem växla en riktig tiostav mot tio entalskuber. Skärmövningen till lektionen växlar ett tiotal och har också tal över 100; den är för de elever som är säkra på bladet.',
      },
    },
    '2:add-sub-within-100-practice': {
      title: 'Addition och subtraktion upp till 100',
      objective: 'Eleverna adderar och subtraherar tvåsiffriga tal för att fylla i talpyramider och följa en väg genom en mattelabyrint.',
      note: {
        mistake: 'Eleverna lägger ihop tiotalen och entalen och glömmer att växla när entalen blir fler än 9: 28 + 15 blir 313 eller 33. I labyrinten följer ett fel med hela vägen, och de går inte tillbaka för att leta upp det.',
        words: 'Säg: ”Tiotalen för sig, entalen för sig, och sedan ihop. 28 + 15: 30, och 13 till, 43.” Fråga: ”Blir entalen ett nytt tiotal?” I labyrinten: ”Skriv talet efter varje skylt. Stämmer inte slutet kontrollerar du varje steg.”',
        watch: 'Låt eleverna visa sina steg bredvid pyramiden. En elev med de nedre stenarna rätt och en sten nära toppen fel har gjort ett enda räknefel som följde med uppåt; en elev utan något rätt har kanske inte förstått hur pyramiden är byggd.',
      },
    },
    '1:coins': {
      title: 'Räkna mynt',
      objective: 'Eleverna känner igen mynten, säger vad vart och ett är värt och räknar hur många kronor det ligger i en börs.',
      note: {
        mistake: 'Eleverna räknar mynten, inte kronorna: tre femkronor är ”3”. Med två sorters mynt räknar de allt ett i taget.',
        words: 'Håll upp varje mynt: ”Det här är en femkrona. Den är ETT mynt och värd fem kronor.” Räkna med värdet: ”5, 10, 15 kronor.” Med två sorter: ”Börja med mynten som är värda mest. 10, 20 … 25, 26.” Säg alltid ”kronor” efter talet.',
        watch: 'Titta på bytet från tio i taget till fem eller ett i taget i samma börs. De som tappar bort sig där stannar vid bladet med de första stegen. Använd riktiga mynt eller leksakspengar först; många barn ser sällan kontanter.',
      },
    },
    '2:shopping-money': {
      title: 'Handla: räkna ihop priset',
      objective: 'Eleverna läser av priser på en hylla, lägger ihop priserna på det som köps och löser två räknehändelser med priserna.',
      note: {
        mistake: 'Eleverna adderar tal utan att kontrollera vilken vara räknehändelsen handlar om, eller tar priset på fel vara från hyllan. Med tre varor lägger de ihop två priser och glömmer det tredje.',
        words: 'Säg: ”Leta först upp varje vara på hyllan och säg priset. Skriv upp priserna. Lägg sedan ihop.” Fråga: ”Vad kostar det tillsammans?” Säg beloppet med enhet: ”45 kronor.”',
        watch: 'Låt eleverna stryka under vad som köps innan de tittar på hyllan. Kontrollera att svaren har ”kr” efter talet; ett tal utan enhet är ett halvt svar. Lek affär med en elev som kassör i varje grupp.',
      },
    },
    '2:measure-with-ruler': {
      title: 'Mäta med linjal',
      objective: 'Eleverna läser av längden på en sak på en linjal när saken börjar vid 0 och skriver hur lång den är.',
      note: {
        mistake: 'Eleverna räknar strecken och inte mellanrummen, så de säger ”ett” vid nollstrecket och får ett för mycket. Med en riktig linjal lägger de saken mot linjalens kant eller mot 1:an, inte mot 0.',
        words: 'Säg: ”Börja vid noll. Noll betyder ingen längd än. Räkna mellanrummen: ett, två, tre.” Sedan: ”Pennan slutar vid 6, så den är 6 enheter lång.” Bladet säger enheter; med en riktig linjal säger ni centimeter: ”Pennan är 6 centimeter lång.” Fråga: ”Var sitter nollan på din linjal? Den sitter inte alltid vid kanten.”',
        watch: 'Dela ut riktiga linjaler och titta var eleverna lägger sakens början. På bladet börjar allt vid 0; det gör inte klassrummets linjal åt dem.',
      },
    },
    '2:compare-lengths': {
      title: 'Hur mycket längre?',
      objective: 'Eleverna mäter två saker och räknar ut hur mycket längre den ena är än den andra.',
      note: {
        mistake: 'Eleverna skriver den längre sakens längd som svar på ”hur mycket längre”. Eller så adderar de de två längderna, för två tal i en uppgift har alltid betytt addition.',
        words: 'Säg: ”Bandet är 9 enheter långt. Snöret är 6 enheter långt. Lägg dem under varandra. Var tar snöret slut? Biten som sticker ut är hur mycket LÄNGRE bandet är.” Skriv: ”9 − 6 = 3. Bandet är 3 enheter längre.” Kalla svaret skillnaden.',
        watch: 'Be eleven visa biten som sticker ut med två fingrar på bladet. En elev som kan visa den men inte skriva subtraktionen behöver orden ”hur mycket fattas från 6 till 9”.',
      },
    },
    '2:time-5-min-quarter': {
      title: 'Klockan: kvart över, halv, kvart i och fem minuter',
      objective: 'Eleverna läser av klockan på kvart över, halv och kvart i, och sedan på fem minuter när, och väljer den tid som passar.',
      note: {
        mistake: 'Eleverna läser talet som minutvisaren pekar på som minuter: visaren på 4 är ”4 minuter”. Efter halv nämner de fel timme, och uttrycken kring halv är svårast: ”fem i halv tre” och ”fem över halv tre” blandas ihop eller sägs med timmen två.',
        words: 'Räkna fem i taget runt klockan och peka på varje tal: ”5, 10, 15, 20.” Säg: ”På högra halvan säger vi ÖVER: fem över, tio över, kvart över, tjugo över. På vänstra halvan säger vi I: tjugo i, kvart i, tio i, fem i. Då nämner vi timmen som kommer, precis som vid halv.” Visa de två särskilda, som räknas från halv: ”Fem i halv tre är fem minuter innan halv tre, alltså 2.25. Fem över halv tre är fem minuter efter halv tre, alltså 2.35. Båda sägs med tre, timmen som kommer.”',
        watch: 'Börja med bladet om kvart över, halv och kvart i; bladet med fem minuter hör till slutet av åk 2. Kontrollera tiderna efter halv, som tjugo i tre, där timvisaren nästan står på nästa tal. Låt eleven räkna fem i taget högt en gång; då hör du var det går fel.',
      },
    },
    '2:calendar': {
      title: 'Läsa almanackan',
      objective: 'Eleverna läser en månad i almanackan och hittar veckodagen för ett datum, datumet en vecka senare och antalet dagar mellan två datum.',
      note: {
        mistake: 'Eleverna läser längs raden för att hitta veckodagen och tittar inte upp till kolumnens överkant. För ”en vecka senare” räknar de sju rutor en och en och räknar ofta startdagen som dag ett.',
        words: 'Säg: ”Leta upp datumet. Gå rakt upp i kolumnen. Vilken dag står högst upp?” Om en vecka senare: ”En vecka senare är rutan precis under. Samma veckodag, 7 mer.” När ni räknar dagar: ”Räkna inte dagen du börjar på. Räkna hoppen.”',
        watch: 'Fråga ”Vilken veckodag är den 17:e?” och följ elevens finger: det ska gå uppåt i kolumnen. Kontrollera svar på ”hur många dagar från … till …” som är ett för mycket.',
      },
    },
    '1:skip-counting': {
      title: '10-hopp, 5-hopp och 2-hopp',
      objective: 'Eleverna räknar i 10-hopp, 5-hopp och 2-hopp och skriver de tal som saknas i varje talföljd.',
      note: {
        mistake: 'Eleverna säger hoppramsan rätt och skriver sedan nästa tal i talraden i luckan (10, 20, 21). I 2-hopp halkar de över på de udda talen efter ett fel och märker det inte.',
        words: 'Räkna högt i klassen och stanna på ett tal: ”… 30, 40. Vad kommer sedan? Hur mycket mer är det?” Fråga efter mönstret: ”Vad slutar talen på i 5-hopp?” (5 och 0.) ”I 10-hopp?” (Alltid 0.) ”I 2-hopp?” (0, 2, 4, 6 eller 8: de jämna talen.)',
        watch: 'Lägg märke till vem som kontrollerar en rad med mönstret (”det kan inte stämma, det slutar på 3”). Börja några rader mitt i, på 40 eller 15; en elev som bara kan börja från början har lärt sig en ramsa. Hoppen är vägen in i 2:ans, 5:ans och 10:ans tabell.',
      },
    },
    '2:skip-count-5-10-100': {
      title: 'Prick till prick med 5-hopp och 10-hopp',
      objective: 'Eleverna räknar i 5-hopp till 50 och i 10-hopp till 100 och drar streck mellan prickar i den ordningen tills en bild syns.',
      note: {
        mistake: 'Eleverna kan ramsan från början men kan inte fortsätta från ett tal mitt i. I prick till prick drar de till närmaste prick, eller läser 15 och 50 som samma tal.',
        words: 'Säg: ”Säg talet du står på. Lägg till fem i huvudet. Leta upp det talet och dra sedan.” Räkna 5-hopp och 10-hopp i hundrarutan och fråga: ”Vad ser du på entalssiffran?”',
        watch: 'Stoppa en elev mitt i bilden och fråga vad som kommer sedan. En elev som börjar om ramsan från 5 kan en ramsa; att räkna vidare från 35 är kunskapen.',
      },
    },
    '2:equal-groups-times': {
      title: 'Lika grupper: från upprepad addition till multiplikation',
      objective: 'Eleverna räknar lika stora grupper, skriver den upprepade additionen och gör klart multiplikationen som hör till.',
      note: {
        mistake: 'Eleverna blandar ihop antalet grupper och antalet i varje grupp: 3 grupper med 4 skrivs 3 + 4, eller 3 + 3 + 3 + 3. Eller så räknar de varje bild en och en och bryr sig inte om ringarna runt grupperna.',
        words: 'Ställ två frågor varje gång: ”Hur många grupper? Hur många i VARJE grupp?” Säg: ”3 grupper med 4 i varje. 4 + 4 + 4. Tre gånger fyra.” Läs gångertecknet som ”grupper med” i början: ”3 grupper med 4 är 12.” Gångertecknet skrivs som en punkt: 3 · 4.',
        watch: 'Kontrollera att additionen har lika många termer som det finns grupper. Be en elev rita ”2 grupper med 5” och sedan ”5 grupper med 2”: samma antal, två olika bilder.',
      },
    },
    '3:mult-equal-groups': {
      title: 'Multiplikation: grupper och rutnät',
      objective: 'Eleverna läser en bild med lika stora grupper eller ett rutnät, gör klart multiplikationen och tar reda på hur många det är sammanlagt.',
      note: {
        mistake: 'Eleverna räknar varje bild en och en och använder aldrig grupperna. I multiplikationen skriver de det sammanlagda antalet där en faktor ska stå.',
        words: 'Säg: ”6 grupper med 4 är 6 gånger 4.” Hitta svaret från något du kan: ”5 grupper med 4 är 20, en grupp till är 24.” Använd orden ”faktor” för talen du multiplicerar och ”produkt” för svaret.',
        watch: 'Fråga hur eleven kom fram till antalet. Att räkna en och en ger rätt svar men ingen utveckling; en elev som säger ”fem sådana och en till” bygger tabellerna. Grupper med andra tal än 2, 5 och 10 löser eleverna i åk 2 med hopp eller upprepad addition, inte ur minnet.',
      },
    },
    '2:arrays': {
      title: 'Rader och kolumner',
      objective: 'Eleverna räknar raderna och kolumnerna i ett rutnät, gör klart multiplikationen och väljer det rutnät som passar till en multiplikation.',
      note: {
        mistake: 'Eleverna vet inte åt vilket håll en rad går och åt vilket håll en kolumn går. De räknar alla prickar en och en, eller räknar längs två kanter utan att räkna hörnpricken två gånger och får ett för lite: 3 rader med 5 blir ”3 rader och 4 kolumner”.',
        words: 'Säg: ”Rader går åt sidan, som bänkrader. Kolumner går uppifrån och ner, som pelare.” Fråga: ”Hur många rader? Hur många i varje rad?” Sedan: ”3 rader med 5 i varje: 5 + 5 + 5. 5, 10, 15.”',
        watch: 'Låt en elev dra fingret längs en rad och nerför en kolumn. Vrid bladet ett kvarts varv och fråga om antalet har ändrats; det har det inte, och det är värt att säga högt.',
      },
    },
    '3:commutative': {
      title: 'Vänd på rutnätet: 3 · 5 och 5 · 3',
      objective: 'Eleverna ser att ett rutnät som vrids ett kvarts varv visar samma antal och skriver båda multiplikationerna.',
      note: {
        mistake: 'Eleverna räknar båda rutnäten från början som två skilda uppgifter och märker inte att antalen är lika. Några tror att 3 · 7 och 7 · 3 är två olika kombinationer som båda måste läras in.',
        words: 'Vrid ett rutnät av papper ett kvarts varv och fråga: ”Lade jag till några? Tog jag bort några? Hur många är det då nu?” Säg: ”3 rader med 7 och 7 rader med 3 är lika många. Kan du den ena kan du den andra.” Bladet säger ”båda talen”; det är de båda multiplikationerna eleverna ska göra klara.',
        watch: 'Fråga ”Vad är 7 · 3?” precis när en elev har räknat ut 3 · 7. Den som börjar räkna igen har inte tagit till sig vridningen; vrid rutnätet en gång till.',
      },
    },
    '3:mult-number-line': {
      title: 'Multiplikation som hopp på tallinjen',
      objective: 'Eleverna visar en multiplikation som lika långa hopp från noll på en tallinje och skriver talet där varje hopp landar.',
      note: {
        mistake: 'Eleverna skriver hoppets nummer (1, 2, 3) under varje landning och inte platsen där det landar. Eller så börjar de första hoppet på 1, så att varje landning blir ett för stor.',
        words: 'Säg: ”Alla hopp är lika långa. Börja på noll. 4-hopp landar på 4, 8, 12.” Fråga: ”Hur många hopp? Hur långt är varje? Var är du efter 5 hopp med 4?”',
        watch: 'Kontrollera att första landningen är lika med hoppets längd. Be om ”3 hopp med 5” och ”5 hopp med 3” och låt eleverna se att båda slutar på samma ställe.',
      },
    },
    '3:times-tables': {
      title: '2:ans och 5:ans tabell',
      objective: 'Eleverna skriver produkterna i 2:ans och 5:ans tabell.',
      note: {
        mistake: 'Eleverna hoppräknar från början vid varje uppgift och tappar bort sig kring det sjätte eller sjunde talet. De blandar ihop grannar: 6 · 5 får svaret 35.',
        words: 'Börja från något eleven kan: ”Du vet att 5 · 5 är 25. Då är 6 · 5 en femma till: 30.” Använd dubblorna för 2:ans tabell, och hälften av 10:ans tabell för 5:ans: ”8 · 10 är 80, så 8 · 5 är hälften, 40.”',
        watch: 'Lyssna efter hur en elev får fram ett svar: ur minnet, från en granne eller genom att hoppräkna från början. Öva några kombinationer varje dag; ett blad som är löst med hoppräkning har inte byggt något minne. 10:ans tabell hör också till åk 2 och finns inte på bladen; ta den muntligt.',
      },
    },
    '2:2d-attributes': {
      title: 'Sortera figurer efter antal sidor',
      objective: 'Eleverna räknar sidorna på plana figurer och parar ihop varje figur med dess antal sidor.',
      note: {
        mistake: 'Eleverna känner igen de regelbundna figurerna på utseendet och blir osäkra på en oregelbunden: en femsidig figur som inte är en prydlig femhörning är ”ingen figur”. I en figur med en inbuktning missas en sida inne i buktningen.',
        words: 'Säg: ”En figur får sitt namn av antalet hörn och sidor, inte av hur den ser ut.” Benämn dem: ”3 sidor, triangel. 4 sidor, fyrhörning. 5, femhörning. 6, sexhörning.” Låt eleverna sätta ett märke på varje sida de har räknat.',
        watch: 'Kontrollera figurerna med en inbuktning eller en mycket kort sida; det är dem eleverna räknar fel på. Fråga vad en sned figur med fyra sidor heter och lyssna efter ”fyrhörning”.',
      },
    },
    '2:solids-in-real-life': {
      title: 'Geometriska kroppar omkring oss',
      objective: 'Eleverna parar ihop ett klot, en kub, en cylinder, en kon, ett rätblock eller en pyramid med ett verkligt föremål som har samma form.',
      note: {
        mistake: 'Eleverna parar ihop efter storlek eller färg, eller efter ett enda kännetecken: allt spetsigt är en kon, så pyramid och kon blandas ihop. En burk som ligger ner ses inte som en cylinder. Några säger fortfarande cirkel om en boll och fyrkant om en låda.',
        words: 'Ge varje kropp ett föremål: ”En burk är en cylinder. En boll är ett klot. En strut är en kon. Ett mjölkpaket är ett rätblock.” Fråga vad som skiljer två åt: ”Konens botten är en cirkel och sidan är buktig. Pyramidens botten har raka sidor och hörn, och de andra ytorna är trianglar.”',
        watch: 'Gå på kroppsjakt i klassrummet och låt eleverna säga varje namn högt. Kontrollera konen och pyramiden, och kuben och rätblocket; det är de paren som förväxlas.',
      },
    },
    '2:3d-faces-edges-vertices': {
      title: 'Sidoytor, kanter och hörn',
      objective: 'Eleverna räknar de plana sidoytorna, kanterna och hörnen på geometriska kroppar och skriver antalen.',
      note: {
        mistake: 'Eleverna räknar bara det de ser på teckningen: tre sidoytor på en kub. När de går runt en kropp tappar de bort sig och räknar en kant två gånger, och de säger ”sida” om både sidoyta och kant.',
        words: 'Använd tre ord och håll isär dem: ”En sidoyta är en plan yta. En kant är där två sidoytor möts. Ett hörn är där kanter möts.” På en riktig kartong: ”Lägg handen på en sidoyta. Dra fingret längs en kant. Peka på ett hörn.” Om en burk eller en strut: ”Är den här ytan plan eller buktig? Bladet räknar bara de plana.”',
        watch: 'Ge varje par en riktig kropp och klisterlappar för att märka det som är räknat. Fråga efter det som är dolt på teckningen: ”Baksidan då? Botten?” Lektionen är krävande för åk 2 och passar på vårterminen.',
      },
    },
    '2:symmetry-line': {
      title: 'Är det en symmetrilinje?',
      objective: 'Eleverna avgör om en streckad linje delar en bild i två halvor som är varandras spegelbilder, och väljer den bild som är likadan på båda sidor.',
      note: {
        mistake: 'Eleverna tror att varje linje som delar en figur i två lika stora delar är en symmetrilinje. Diagonalen i en rektangel ger två lika stora halvor som inte hamnar på varandra när man viker, och eleverna ringar in ja.',
        words: 'Säg: ”En symmetrilinje är en viklinje. Vik längs den: hamnar de två sidorna precis på varandra?” Klipp ut en avlång pappersrektangel och vik den från hörn till hörn för att visa en linje som delar den i två lika delar och ändå inte är en symmetrilinje.',
        watch: 'Använd vikprovet med papper för de första uppgifterna. Lyssna på vad eleverna svarar om sneda linjer; det är där lika stora halvor och spegelhalvor skiljer sig åt. Vik också en kvadrat från hörn till hörn, så att eleverna ser att en sned linje ibland ÄR en symmetrilinje.',
      },
    },
    '2:symmetry-complete': {
      title: 'Gör klart den andra halvan',
      objective: 'Eleverna gör klart en halvfärdig bild så att de två sidorna om linjen blir varandras spegelbilder.',
      note: {
        mistake: 'På rutnätsbladet kopierar eleverna halvan som den är och skjuter den över linjen i stället för att spegla den: en ruta två steg från linjen målas två steg från bortre kanten. På spårbladet finns den andra halvan redan, så eleverna spårar utan att märka att sidorna är lika.',
        words: 'Säg: ”Räkna rutorna BORT från linjen. Två rutor bort på den här sidan, två rutor bort på den andra.” Arbeta rad för rad. Kontrollera med en liten spegel på linjen: ”Visar spegeln det du har målat?”',
        watch: 'Titta på rutorna längst från linjen; en förskjuten kopia lägger dem intill linjen. Ge en spegel till den vars bild ser förskjuten ut och låt eleven själv hitta skillnaden. På spårbladet frågar du: ”Vad är lika på båda sidor?”',
      },
    },
    '2:tangram-orientation': {
      title: 'Tangram: vilken figur ligger som skuggbilden?',
      objective: 'Eleverna jämför tangramfigurer med en skuggbild och väljer den som ligger precis likadant, varken vriden eller speglad.',
      note: {
        mistake: 'Eleverna väljer den första figuren som består av samma bitar. En figur som är vriden eller speglad ser ”likadan” ut för dem, för hittills har en vriden form alltid varit samma form.',
        words: 'Säg: ”En form som är vriden eller speglad är fortfarande samma form. Den här uppgiften kräver mer: figuren ska LIGGA som skuggbilden.” Fråga: ”Åt vilket håll pekar spetsen i skuggbilden? Vänster eller höger? Upp eller ner?”',
        watch: 'Fråga en elev vad som skiljer en figur den inte valde: ”Den är speglad” eller ”Den är vriden.” Att sätta ord på skillnaden är kunskapen; rätt val kan vara en lyckad gissning.',
      },
    },
    '2:grid-coordinates': {
      title: 'Hitta rutan i rutnätet',
      objective: 'Eleverna hittar en ruta med hjälp av bokstav och siffra, till exempel B2, målar den och skriver koden för en ruta.',
      note: {
        mistake: 'Eleverna använder bokstaven eller siffran men inte båda, och målar en hel rad eller fel ruta i rätt kolumn. När de skriver koder sätter de siffran först eller anger rutan bredvid.',
        words: 'Säg: ”Bokstaven först: dra ett finger längs bokstäverna till B. Sedan siffran: dra ett annat finger längs siffrorna till 2. Där fingrarna möts ligger B2.” Sedan: ”Säg koden innan du målar.” Jämför med ett schackbräde eller spelet Sänka skepp.',
        watch: 'Bilden rättar arbetet: en ruta på fel plats syns direkt. Se vem som använder två fingrar och vem som gissar. Att skriva koden för en ruta är svårare än att hitta en ruta; gör det som nummer två. Koordinatsystem hör till åk 4–6; det här är en första lek med rutnät.',
      },
    },
    '2:bar-graphs': {
      title: 'Från streck till stapeldiagram',
      objective: 'Eleverna läser en tabell med streck, målar en stapel för varje antal och använder ett stapeldiagram för att svara på frågor där de lägger ihop eller jämför.',
      note: {
        mistake: 'Eleverna läser ett knippe streck som 4 eller 6 och målar stapeln till fel höjd. På ”hur många fler” svarar de med den högre stapelns tal; på ”hur många tillsammans” läser de av en stapel och slutar.',
        words: 'Säg: ”Räkna strecken fem i taget först, sedan de lösa. Skriv talet och måla sedan.” Vid frågorna: ”Vilka två staplar handlar frågan om? Sätt ett finger på varje.” Sedan: ”Hur många FLER betyder skillnaden: subtrahera.”',
        watch: 'Låt eleverna skriva upp de två tal de använder innan de svarar. Då ser du om ett fel svar kommer från avläsningen eller från räkningen.',
      },
    },
    '2:scaled-pictograph': {
      title: 'Bilddiagram där varje bild står för 2',
      objective: 'Eleverna läser ett bilddiagram där varje bild står för 2 och skriver det verkliga antalet för varje rad.',
      note: {
        mistake: 'Eleverna räknar bilderna och skriver det talet, för hittills har en bild alltid betytt en sak. Förklaringen till diagrammet blir oläst.',
        words: 'Säg: ”Läs förklaringen först. Varje bild står för 2.” Räkna en rad i 2-hopp och peka på varje bild: ”2, 4, 6, 8.” Fråga: ”En rad har 5 bilder. Hur många saker är det? Hur vet du det?”',
        watch: 'Titta på den första raden en elev fyller i: är talet lika med antalet bilder har eleven hoppat över förklaringen. Att räkna i 2-hopp här är ett steg mot multiplikation; sätt ord på det (”4 tvåor är 8”).',
      },
    },
    '3:scaled-graphs': {
      title: 'Diagram där ett steg är 5',
      objective: 'Eleverna läser stapeldiagram där axeln går i steg om 5 och bilddiagram där varje bild står för 5.',
      note: {
        mistake: 'Eleverna räknar linjerna eller bilderna ett i taget och bryr sig inte om stegen. En stapel som slutar vid en linje utan tal läses som det tryckta talet under.',
        words: 'Fråga först: ”Hur stora steg tar axeln? Vad står en bild för?” Räkna längs axeln: ”5, 10, 15, 20.” Om en stapel som slutar vid en linje utan tal: ”Talen på var sin sida är 10 och 20. Vad är då den här linjen värd?”',
        watch: 'Låt eleven läsa förklaringen eller axeln högt före första svaret. Ställ en jämförande fråga (”hur många fler”) för att se om eleven använder de avlästa talen eller räknar bilder. Lektionen kommer efter 5-hoppen.',
      },
    },
    '2:line-plots': {
      title: 'Läsa ett diagram med kryss',
      objective: 'Eleverna räknar kryssen ovanför varje tal på en tallinje och skriver hur många det är.',
      note: {
        mistake: 'Eleverna blandar ihop de två sorternas tal: talet under en stapel kryss (vad som mättes) och antalet kryss (hur många gånger). På frågan ”hur många är 5 cm långa” svarar de ”5”.',
        words: 'Säg: ”Talen på linjen berättar VAD som mättes. Kryssen berättar HUR MÅNGA gånger.” Fråga: ”Hur många pennor var 5 cm långa? Räkna kryssen ovanför 5:an.” Sedan: ”Vilken längd var vanligast?”',
        watch: 'Ställ en fråga åt varje håll: ”Hur många kryss står över 7:an?” och ”Vilket tal har 3 kryss?” En elev som klarar båda förstår diagrammet. Diagramtypen är ovanlig i svenska läromedel; läs den som en tabell där varje kryss är ett streck. Mät sedan sex pennor i klassen och sätt ett kryss för varje.',
      },
    },
  },
};
