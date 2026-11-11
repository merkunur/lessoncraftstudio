'use strict';
/**
 * Lärarkommentarer, svenska, matematik åk 3 (Daily Teaching System, Part 4.6). Skrivna utifrån vad de svenska
 * arbetsbladen TRYCKER och för undervisningen i Sverige: talområdet 0–1000, talsorter, avrundning och överslag,
 * uppställning med växling, division skrivs med snedstreck (12 / 3), analog och digital tid utan am/pm, liter och
 * deciliter före milliliter, bråk som del av helhet och del av antal. Ingen översättning av de engelska kommentarerna.
 */
module.exports = {
  loc: 'sv',
  points: {
    '2:read-build-3-digit': {
      title: 'Hundratal, tiotal och ental',
      objective: 'Eleverna läser ett tresiffrigt tal som visas med hundraplattor, tiostavar och entalskuber och fyller i talsorterna i en tabell.',
      note: {
        mistake: 'Eleverna skriver de antal de ser och hoppar över en tom talsort: två plattor och sex kuber blir 26. När ett tal läses upp skriver samma elever det de hör, och tvåhundrasex blir 2006.',
        words: 'Räkna talsort för talsort: ”100, 200 … 210, 220 … 221, 222.” Säg: ”Varje talsort behöver en siffra. Inga tiotal? Skriv en nolla som håller platsen.” Fråga: ”Vad är 2:an värd i 206? Och 0:an? Och 6:an?” Bladet säger platsvärdestabell; säg talsorter: hundratal, tiotal, ental.',
        watch: 'Kontrollera först alla tal med en nolla bland tiotalen eller entalen. En elev som skriver 26 för två plattor och sex kuber får ha tabellen med talsorterna bredvid varje tal tills vidare.',
      },
    },
    '2:expanded-form-digit-value': {
      title: 'Dela upp talet i talsorter: siffrans värde',
      objective: 'Eleverna parar ihop hundraplattor, tiostavar och entalskuber med talet uppdelat i talsorter och säger vad en understruken siffra är värd.',
      note: {
        mistake: 'Eleverna säger att en understruken 4:a är värd ”4” var den än står. För 345 väljer de 300 + 4 + 5 och behandlar tiotalssiffran som ental.',
        words: 'Fråga: ”Vilken talsort står siffran i? Tiotalen, alltså är den 4 tiotal. Vad är 4 tiotal värda?” (40.) Säg ett tal i delar: ”345 är 300 och 40 och 5.” Skriv det på båda sätten och läs det på båda sätten. Bladet kallar uppdelningen den utvecklade formen.',
        watch: 'Fråga efter värdet av samma siffra på två platser, som i 44 eller 404. En elev som svarar ”fyra” båda gångerna nämner siffran, inte dess värde.',
      },
    },
    '2:compare-order-3-digit': {
      title: 'Jämföra och ordna tresiffriga tal',
      objective: 'Eleverna jämför två tresiffriga tal med tecknen för större än, mindre än och lika med och ordnar fyra tal från minst till störst.',
      note: {
        mistake: 'Eleverna går efter den största siffran var som helst i talet (”199 är större än 201 på grund av niorna”). När hundratalen är lika hoppar de till entalen och förbi tiotalen.',
        words: 'Säg: ”Börja från vänster. Jämför hundratalen. Lika? Då tiotalen. Lika? Då entalen.” Läs den färdiga raden högt: ”402 är större än 398.” När ni ordnar: ”Leta upp det minsta talet och skriv 1 vid det. Leta sedan upp det minsta av dem som är kvar.”',
        watch: 'Använd par som 398 och 402 för att se vem som jämför talsort för talsort från vänster. När fyra tal ska ordnas ser du efter om en elev bara jämför grannar och aldrig kontrollerar hela raden.',
      },
    },
    '2:hundred-more-less': {
      title: '100 mer, 100 mindre',
      objective: 'Eleverna skriver talet som är 100 mindre och talet som är 100 mer än ett tresiffrigt tal.',
      note: {
        mistake: 'Eleverna ändrar tiotals- eller entalssiffran, eller räknar upp ett i taget och ger upp. Hundra mindre än ett tal strax över 100, som 105, lämnar dem utan hundratalssiffra och osäkra på vad de ska skriva.',
        words: 'Fråga: ”Hundra mer. Vilken siffra ändras? Vilka två står kvar?” Säg: ”Bara hundratalssiffran ändras. 347, 447.” Räkna i hundrahopp från vilket tal som helst: ”26, 126, 226, 326.” Pröva sedan tio: ”347, 357. Vilken siffra ändrades den här gången?”',
        watch: 'Se vem som svarar direkt genom att ändra en siffra och vem som fortfarande räknar. Ge ett tal över 900 och tala om vad som kommer efter 9 hundratal.',
      },
    },
    '2:round-to-ten': {
      title: 'Avrunda till närmaste tiotal',
      objective: 'Eleverna ser på en tallinje vilket tiotal ett tal ligger närmast och avrundar tvåsiffriga tal till närmaste tiotal.',
      note: {
        mistake: 'Eleverna avrundar nedåt varje gång genom att stryka entalen (47 blir 40), eller avrundar 47 till 57. Ett tal som slutar på 5 har inget närmaste tiotal, och eleverna vet inte åt vilket håll de ska gå.',
        words: 'Fråga först: ”Mellan vilka två tiotal ligger 47?” (40 och 50.) ”Vilket ligger det närmast?” Säg: ”Entalssiffran avgör. 0 till 4, avrunda nedåt. 5 till 9, avrunda uppåt.” Om 45: ”Det ligger precis mitt emellan. Man har kommit överens om att avrunda uppåt, så 45 blir 50.”',
        watch: 'Fråga efter de två tiotalen före svaret. En elev som inte kan nämna dem använder regeln utan någon tallinje i huvudet; gå tillbaka till pricken på linjen.',
      },
    },
    '3:rounding': {
      title: 'Avrunda till närmaste hundratal',
      objective: 'Eleverna ser på en tallinje vilket hundratal ett tal ligger närmast och avrundar tresiffriga tal till närmaste hundratal.',
      note: {
        mistake: 'Eleverna tittar på entalssiffran, som de gjorde när de avrundade till tiotal, så 349 avrundas uppåt till 400 på grund av 9:an. Eller så ändrar de bara tiotalen och skriver 350.',
        words: 'Fråga: ”Mellan vilka två hundratal ligger 349? Vilket tal ligger mitt emellan?” (350.) ”Ligger 349 före eller efter mitten?” Säg: ”När vi avrundar till hundratal är det TIOTALSSIFFRAN som avgör. Entalen spelar ingen roll.”',
        watch: 'Använd 349 och 351 som provtal. En elev som avrundar båda åt samma håll tänker inte på mitten; sätt ut båda talen på en linje från 300 till 400.',
      },
    },
    '3:estimate-by-rounding': {
      title: 'Överslagsräkning: avrunda först',
      objective: 'Eleverna avrundar två tal till närmaste tiotal och adderar de avrundade talen för att göra ett överslag av summan.',
      note: {
        mistake: 'Eleverna räknar ut den exakta summan först och avrundar sedan svaret, och då har överslaget förlorat sin mening. Eller så avrundar de bara ett av de två talen.',
        words: 'Säg: ”Avrunda först, addera sedan. Ett överslag är snabbt och ungefärligt, inte exakt.” Visa: ”48 + 31 är ungefär 50 + 30. Ungefär 80.” Sedan: ”Någon fick 109 på 48 + 31. Kan det stämma? Hur vet du det utan att räkna ut det?”',
        watch: 'Se vem som skriver den exakta summan i kanten före avrundningen. Ge ett felaktigt exakt svar och låt klassen avslöja det med ett överslag; det är det överslag är till för.',
      },
    },
    '2:column-method': {
      title: 'Uppställning utan växling',
      objective: 'Eleverna adderar och subtraherar tvåsiffriga tal i uppställning, en talsort i taget med början i entalen.',
      note: {
        mistake: 'Eleverna ställer talen snett, så att ental hamnar under tiotal, eller börjar räkna från vänster. I subtraktion tar de den mindre siffran från den större i varje kolumn utan att se vilket tal som står överst.',
        words: 'Säg: ”Ental under ental, tiotal under tiotal. Börja alltid med entalen.” Läs kolumnerna med talsort: ”5 ental plus 3 ental är 8 ental. 2 tiotal plus 4 tiotal är 6 tiotal. Sextioåtta.” Fråga: ”Varför börjar vi till höger?” (För att entalen snart ska kunna bli ett nytt tiotal.)',
        watch: 'Be en elev säga vad varje siffra i svaret är värd. Jämför svaret med ett överslag: ”Ungefär hur mycket borde det bli?” Bladens uppgifter kräver ingen växling; den kommer i nästa lektion. Uppställningen kommer efter huvudräkning och skriftlig räkning talsortsvis, inte i stället för dem.',
      },
    },
    '3:column-regrouping': {
      title: 'Uppställning med växling',
      objective: 'Eleverna adderar och subtraherar i uppställning inom 1000 och växlar när en talsort blir mer än nio eller inte räcker till.',
      note: {
        mistake: 'Eleverna glömmer att lägga till det nya tiotalet eller hundratalet, eller skriver upp det och lägger till det två gånger. I subtraktion växlar de ett tiotal till tio ental och glömmer att minska tiotalen med ett; med en nolla bland tiotalen (402 − 178) vet de inte var de tio entalen ska komma från.',
        words: 'Säg varje steg: ”8 och 7 är 15 ental. Det är 1 tiotal och 5 ental. Skriv 5:an och skriv det nya tiotalet som minnessiffra över tiotalen.” Om en nolla: ”Det finns inga tiotal att växla. Gå till hundratalen: växla ett hundratal mot tio tiotal. Växla sedan ett av tiotalen mot tio ental.”',
        watch: 'Kontrollera subtraktion över en nolla först. Låt eleverna kontrollera en subtraktion genom att addera svaret och det som togs bort, och fråga ”Ungefär hur mycket borde det bli?” innan de räknar.',
      },
    },
    '2:skip-count-3-4': {
      title: '3-hopp och 4-hopp',
      objective: 'Eleverna räknar i 3-hopp och 4-hopp och skriver de tal som saknas i varje talföljd.',
      note: {
        mistake: 'I 3-hopp och 4-hopp finns inget enkelt mönster i entalssiffran, så eleverna räknar vidare på fingrarna och hamnar ett tal fel. Ett enda fel följer med genom resten av raden.',
        words: 'Viskräkna tillsammans: viska ”1, 2” och säg ”3” högt; viska ”4, 5” och säg ”6”. Fråga: ”Hur långt är det från ett tal till nästa? Kontrollera hoppet.” Knyt fyrorna till tvåorna: ”4-hopp är vartannat tal i 2-hoppen.”',
        watch: 'Låt eleverna kontrollera varje rad med hoppets storlek innan de lämnar in. En elev som räknar på fingrarna varje gång behöver många korta muntliga vändor, inte fler blad. Hoppen är vägen in i 3:ans och 4:ans tabell.',
      },
    },
    '2:share-and-group': {
      title: 'Dela lika och bilda grupper',
      objective: 'Eleverna delar en hög lika i lådor och skriver hur många var och en får, och räknar hur många lika stora grupper en hög ger.',
      note: {
        mistake: 'Eleverna delar ut några till varje låda och slutar med några kvar i högen, eller så blir lådorna olika. De blandar ihop de två frågorna: hur många i varje låda, och hur många grupper.',
        words: 'Säg: ”En till varje låda, sedan en till, tills högen är slut. Har alla lådor lika många?” Ställ de två frågorna var för sig: ”Hur många får var och en?” och ”Hur många lika stora grupper blir det?”',
        watch: 'Använd plockmaterial och muggar före bladet. Kontrollera att inget är kvar i högen och att varje låda har lika många. Lyssna efter vilken av de två frågorna en elev svarar på; båda är division.',
      },
    },
    '3:division-sharing': {
      title: 'Division: dela lika',
      objective: 'Eleverna delar en hög lika i ett givet antal lådor och skriver hur många varje låda får.',
      note: {
        mistake: 'Eleverna skriver antalet lådor eller högens storlek som svar. Utan plockmaterial gissar de hur många som hamnar i varje låda och kontrollerar inte att lådorna gör slut på högen.',
        words: 'Säg: ”12 delat lika på 3 är en division: 12 / 3.” Dela sedan ut: ”En till varje, en gång till, en gång till, tills inget är kvar. Var och en får 4.” Kontrollera med multiplikation: ”3 lådor med 4 är 12.” Läs tecknet som ”delat med”.',
        watch: 'Be varje elev kontrollera ett svar med multiplikation. Den som ser att 3 · 4 = 12 besvarar 12 / 3 har hittat genvägen som gör divisionen lätt.',
      },
    },
    '3:division-repeated-subtraction': {
      title: 'Division: hoppa tillbaka till noll',
      objective: 'Eleverna tar reda på hur många lika långa hopp det behövs för att komma från ett tal tillbaka till noll på en tallinje.',
      note: {
        mistake: 'Eleverna skriver hoppets längd som svar, eller räknar varje streck de rör vid, starttalet inräknat, och får ett för mycket. De ser inte att det här också är division.',
        words: 'Säg: ”Börja på 15. Hoppa 3 bakåt varje gång: 12, 9, 6, 3, 0. Hur många hopp? Fem.” Skriv: ”15 / 3 = 5. Det går fem 3:or i 15.” Fråga: ”Hur många 3:or får plats i 15?”',
        watch: 'Låt eleverna räkna hoppen med ett finger på varje båge, inte på strecken. Lägg de två betydelserna bredvid varandra en gång: 15 delat lika på 3, och hur många 3:or det går i 15.',
      },
    },
    '3:mult-div-relationship': {
      title: 'Faktorn som saknas och talfamiljer',
      objective: 'Eleverna hittar den faktor som saknas till ett rutnät och skriver de två multiplikationer och de två divisioner som hör till det.',
      note: {
        mistake: 'Eleverna behandlar en division som en ny uppgift och använder inte multiplikationen de nyss skrev. I en talfamilj skriver de en division som börjar med ett litet tal, som 4 / 24 = 6.',
        words: 'Säg: ”Divisionen frågar efter faktorn som saknas. 24 / 4 frågar: 4 gånger vad är 24?” Peka på rutnätet: ”I en talfamilj är det hela antalet vi delar: 24 / 4, inte 4 / 24.” Låt eleverna läsa alla fyra uppgifterna till ett rutnät högt. Bladet säger gångerfamiljer och ”alla fyra talen”; det är de fyra uppgifterna i talfamiljen.',
        watch: 'Ge eleven en division och se om eleven tänker på multiplikationen. Kontrollera talens ordning i varje division: hela antalet, hela rutnätet, står först.',
      },
    },
    '3:muldiv-word-problems': {
      title: 'Räknehändelser med multiplikation och division',
      objective: 'Eleverna löser räknehändelser med lika stora grupper och avgör om händelsen frågar efter hela antalet, efter antalet i varje grupp eller efter antalet grupper.',
      note: {
        mistake: 'Eleverna plockar ut de två talen och multiplicerar varje gång, eller väljer räknesätt efter ett enda ord som ”varje”. De frågar sig inte vad svaret kommer att vara: hela antalet, antalet i varje grupp eller antalet grupper.',
        words: 'Ställ tre frågor om varje räknehändelse: ”Vet vi hur många grupper det är? Vet vi hur många det är i varje grupp? Vet vi hela antalet?” Sedan: ”Vilken av de tre saknas?” Låt eleverna avsluta med en svarsmening: ”Varje barn får 4 klistermärken.”',
        watch: 'Läs elevens svarsmening, inte bara talet. Ett ensamt ”4” visar inte om eleven vet att det är 4 klistermärken var eller 4 påsar. Varje blad har en enda sorts händelse, så bladet väljer räknesätt åt eleven; blanda uppgifter från de tre bladen när alla är gjorda.',
      },
    },
    '3:division-remainder': {
      title: 'Division med rest',
      objective: 'Eleverna bildar lika stora grupper av en samling eller delar ut den i rutor, skriver hur många grupper det blir eller hur många varje ruta får och skriver hur många som blir över.',
      note: {
        mistake: 'Eleverna lämnar för många över: lika många som en grupp eller fler, när en grupp till eller ett varv till hade gått att göra. Eller så struntar de i dem som blev över och skriver bara antalet grupper.',
        words: 'Säg: ”14 i grupper om 4: tre grupper, och 2 över.” Fråga: ”Kan du göra en grupp till av det som är kvar? Inte? Då är det resten.” På utdelningsbladet: ”14 i 4 rutor. Räcker det som är kvar till en till i varje ruta?” Säg regeln tillsammans: ”Resten är alltid mindre än talet vi delar med.”',
        watch: 'Kontrollera varje rest mot talet samlingen delades med. En rest på 5 med grupper om 4 betyder att en grupp fattas. Lektionen är en fördjupning; många skolor väntar med rest till åk 4.',
      },
    },
    '3:time-to-minute': {
      title: 'Klockan på minuten',
      objective: 'Eleverna läser av en analog klocka på minuten och väljer den tid som passar.',
      note: {
        mistake: 'Eleverna läser av till närmaste fem minuter och slutar, så 4.23 blir tjugo över eller fem i halv. Andra räknar varje litet streck från 12:an och tappar räkningen på vägen runt.',
        words: 'Säg: ”Gå till talet precis före minutvisaren och räkna fem i taget dit: 5, 10, 15, 20. Räkna sedan de små strecken ett i taget: 21, 22, 23.” Fråga: ”Har timvisaren gått förbi 4:an? Lite eller mycket?” Säg tiden digitalt: ”fyra och tjugotre”.',
        watch: 'Lyssna när en elev räknar: femmorna först, sedan ettorna. Kontrollera tider i timmens sista kvart, där timvisaren står nära nästa tal.',
      },
    },
    '3:time-12-24': {
      title: 'Analog och digital tid',
      objective: 'Eleverna parar ihop en tid på den analoga klockan med samma tid skriven digitalt med 24 timmar.',
      note: {
        mistake: 'Eleverna lägger till 12 också på förmiddagens tider, eller tappar den första siffran så att 15.00 blir klockan 5. Klockan 12 på dagen och klockan 12 på natten blandas ihop.',
        words: 'Säg: ”Efter klockan 12 på dagen räknar den digitala klockan vidare: 13, 14, 15.” Ge regeln åt båda håll: ”På eftermiddagen och kvällen lägger vi till 12 på timmen: klockan 3 på eftermiddagen är 15.00. Är timmen mer än 12 drar vi bort 12: 19.00 är klockan 7 på kvällen.” Fråga: ”Är 08.00 morgon eller kväll? Hur vet du det?”',
        watch: 'Kontrollera klockan 12 på dagen och halvtimmen efter, 12.30, som inte ska ändras, och midnatt, som är 00.00. Använd skolans schema, en busstidtabell eller tv-tablån; där står tiderna alltid med 24 timmar. Bladets rubrik säger 12-timmars och 24-timmars; med eleverna heter det analog och digital tid.',
      },
    },
    '3:elapsed-duration': {
      title: 'Hur lång tid gick?',
      objective: 'Eleverna jämför två klockslag och tar reda på hur lång tid som gick mellan dem.',
      note: {
        mistake: 'Eleverna subtraherar de två klockslagen utan att tänka på klockan: från klockan 11 till klockan 2 blir 9 timmar. Eller så räknar de starttimmen som den första timmen.',
        words: 'Säg: ”Räkna hoppen från starttiden till sluttiden: 11 till 12 är en timme, 12 till 1 är två, 1 till 2 är tre.” Fråga: ”Är tre timmar rimligt? Vad hinner man göra på den tiden?”',
        watch: 'Kontrollera uppgifterna som går förbi klockan 12. En elev som skriver 9 timmar för 11 till 2 har subtraherat; gå runt en riktig klocka tillsammans och räkna varje timme som går.',
      },
    },
    '3:add-subtract-time': {
      title: 'Lägga till och dra ifrån tid',
      objective: 'Eleverna utgår från ett klockslag, lägger till eller drar ifrån minuter eller timmar och skriver den nya tiden.',
      note: {
        mistake: 'Eleverna adderar minuterna som vanliga tal och skriver en tid som inte finns, som 3.75. När de går bakåt över en hel timme ändrar de minuterna och glömmer att ändra timmen.',
        words: 'Säg: ”En timme har 60 minuter, inte 100.” Hoppa till hel timme först: ”3.45 plus 30 minuter. 15 minuter tar oss till 4.00. 15 till: 4.15.” Rita hoppen på en tom tallinje med tiderna utskrivna.',
        watch: 'Leta efter minuter på 60 eller mer i ett svar. Låt eleverna visa hoppet till nästa hela timme på en klocka eller en linje innan de skriver.',
      },
    },
    '2:mass-grams': {
      title: 'Läsa av vågen i gram',
      objective: 'Eleverna lägger ihop vikterna på en våg för att se hur mycket en sak väger, och läser av vågar och mätkannor och skriver svaret med rätt enhet.',
      note: {
        mistake: 'Eleverna räknar vikterna (”tre vikter, alltså 3”) och lägger inte ihop det som står på dem. På en mätkanna läser de närmaste tryckta tal och bryr sig inte om de små stegen emellan, eller skriver gram om en vätska.',
        words: 'Säg: ”Läs varje vikt: 100, 50, 20. Lägg ihop dem: 170 gram.” Vid en mätkanna: ”Titta på två tryckta tal intill varandra. Hur många steg är det emellan? Vad är då ett steg värt?” Säg alltid enheten: ”170 gram”, ”300 milliliter”. Knyt till det eleverna känner till: ”Ett kilogram är 1000 gram. Ett paket smör väger 500 gram.”',
        watch: 'Kontrollera att varje svar har sin enhet. Fråga vad ett litet steg är värt innan en elev läser av en skala; den frågan är hela kunskapen. I vardagen säger vi vikt; ordet i matematiken är massa.',
      },
    },
    '2:read-jugs': {
      title: 'Läsa av mätkannan',
      objective: 'Eleverna läser av på mätkannans skala hur många milliliter vätska det är i kannan.',
      note: {
        mistake: 'Eleverna läser av kannans överkant eller närmaste tryckta tal, inte vätskans yta. När skalan går i steg om 100 eller 200 räknar de varje streck som 1.',
        words: 'Säg: ”Sätt fingret på vätskans yta. Dra det åt sidan till skalan.” Fråga: ”Talen går 200, 400, 600. Vilket tal hör till strecket mitt emellan 200 och 400?” Säg enheten: ”300 milliliter.” Knyt till det eleverna mäter med i köket: ”100 milliliter är en deciliter. 1000 milliliter är en liter.”',
        watch: 'Använd en riktig mätkanna och vatten en gång; eleverna måste ta ner ögonen till vätskans nivå. På bladet kontrollerar du kannorna där vätskan stannar mellan två tryckta tal. Bladen räknar i milliliter; i åk 3 mäter klassen oftast i liter och deciliter, så låt eleverna säga några svar i deciliter också.',
      },
    },
    '3:thermometer': {
      title: 'Läsa av termometern',
      objective: 'Eleverna läser av temperaturen på en termometer vars skala går i steg om 2, 5 eller 10.',
      note: {
        mistake: 'Eleverna räknar varje streck som en grad, hur skalan än ser ut. De läser närmaste tryckta tal och bryr sig inte om strecken emellan, eller tittar på rörets topp och inte på toppen av den färgade stapeln.',
        words: 'Fråga först: ”Den här skalan går inte ett i taget. Hur stora steg tar de tryckta talen? Vad är då varje litet streck värt?” Sedan: ”Leta upp stapelns topp. Vilket tryckt tal står precis under? Räkna uppåt därifrån.” Säg temperaturen med enhet: ”18 grader.”',
        watch: 'Jämför två termometrar med olika skalor som visar samma temperatur och fråga vilken som var svårast att läsa av och varför. Läs av klassrummets och skolgårdens termometer några dagar i rad.',
      },
    },
    '3:partition-equal-areas': {
      title: 'Lika stora delar',
      objective: 'Eleverna avgör om en figur är delad i lika stora delar och benämner en av delarna som en bråkdel.',
      note: {
        mistake: 'Eleverna räknar delarna och jämför dem inte: fyra delar är ”fjärdedelar” också när delarna är olika stora. Delar som är lika stora men har olika form underkänns.',
        words: 'Fråga: ”Täcker varje del lika mycket?” Säg: ”Bara lika stora delar får ett bråknamn. Fyra LIKA stora delar: var och en är en fjärdedel.” Visa en kvadrat delad i fyra trianglar och en delad i fyra små kvadrater: ”Olika form, lika mycket.”',
        watch: 'Titta på cirklarna med en smal skiva och rektanglarna med olika breda remsor. En elev som ringar in dem räknar delar. Klipp i papper och lägg delarna på varandra.',
      },
    },
    '2:equal-shares-shapes': {
      title: 'Halvor, tredjedelar och fjärdedelar',
      objective: 'Eleverna skiljer lika stora delar från olika stora och målar en halv, en tredjedel eller en fjärdedel av en figur.',
      note: {
        mistake: 'Eleverna kallar varje figur som är delad i två bitar för ”halvor”, också när den ena biten är större. De tror att lika stora delar måste se likadana ut, så en kvadrat delad från hörn till hörn och en delad rakt över kan inte båda visa halvor.',
        words: 'Fråga: ”Är delarna LIKA stora? Vore det rättvist att dela så?” Säg: ”Två lika stora delar är halvor. Tre lika stora delar är tredjedelar. Fyra lika stora delar är fjärdedelar.” Klipp ut delarna och lägg den ena på den andra, och vrid den om det behövs.',
        watch: 'Titta på vad eleverna gör med figurer som är delade i olika stora delar. En elev som målar en av två olika stora bitar och kallar den en halv räknar bitar och jämför inte storlek.',
      },
    },
    '3:fraction-unit-build': {
      title: 'Skriva och måla bråk',
      objective: 'Eleverna skriver det bråk som de färgade delarna av en figur visar och målar en figur så att den visar ett givet bråk.',
      note: {
        mistake: 'Eleverna skriver de färgade delarna över de ofärgade: 3 färgade och 1 ofärgad blir 3/1. Eller så vänder de på bråket och sätter antalet delar överst.',
        words: 'Säg: ”Talet under strecket berättar i hur många lika stora delar det hela är delat. Talet över strecket berättar hur många av dem vi menar.” Räkna delarna: ”En fjärdedel, två fjärdedelar, tre fjärdedelar.” Använd orden täljare och nämnare när eleverna har förstått tanken: ”Nämnaren nämner delarnas namn. Täljaren talar om hur många.”',
        watch: 'Kontrollera en figur med 3 av 4 delar färgade. Svaret 3/1 betyder att eleven jämförde färgat med ofärgat; räkna alla delar tillsammans först och sedan de färgade.',
      },
    },
    '3:whole-from-unit': {
      title: 'Hitta det hela',
      objective: 'Eleverna tittar på en del och väljer den stapel som visar det hela som delen kommer från.',
      note: {
        mistake: 'Eleverna väljer den längsta stapeln, eller en stapel som är lika lång som delen själv. De använder inte bråket för att avgöra hur många delar som blir det hela.',
        words: 'Säg: ”Den här biten är en tredjedel. Hur många tredjedelar blir en hel? Tre. Då är det hela tre sådana bitar långt.” Låt eleverna lägga biten gång på gång, eller märka ut dess längd längs stapeln.',
        watch: 'Fråga ”Hur många sådana bitar får plats i det hela?” innan eleven ringar in. Svaret ska stämma med bråkets nämnare.',
      },
    },
    '3:compare-fractions': {
      title: 'Vilket bråk är störst?',
      objective: 'Eleverna jämför två bråk av samma helhet med hjälp av bråkstaplar och ringar in det bråk som är störst.',
      note: {
        mistake: 'Eleverna tror att en större nämnare betyder ett större bråk: en åttondel tas för mer än en fjärdedel, för 8 är mer än 4.',
        words: 'Fråga: ”Får du mer pizza om den delas på 4 eller på 8?” Säg: ”Fler delar betyder mindre delar.” Med samma nämnare: ”Tre femtedelar och två femtedelar: bitarna är lika stora, så fler bitar är mer.” Lägg alltid till: ”Vi kan bara jämföra bråk av samma helhet.”',
        watch: 'Använd 1/4 och 1/8 som prov. En elev som väljer 1/8 jämför hela tal; gå tillbaka till två lika långa staplar, en delad i fjärdedelar och en i åttondelar.',
      },
    },
    '2:fraction-of-a-set': {
      title: 'Del av antal: halv, tredjedel, fjärdedel',
      objective: 'Eleverna ringar in en halv, en tredjedel eller en fjärdedel av en samling bilder och skriver hur många det är.',
      note: {
        mistake: 'Eleverna ringar in 2 bilder för en halv, 3 för en tredjedel och 4 för en fjärdedel: nämnaren tas för antalet som ska ringas in.',
        words: 'Säg: ”En tredjedel betyder: gör 3 lika stora grupper och ta EN av grupperna.” Fråga: ”Hur många grupper gjorde du? Är de lika stora? Hur många är det i en grupp?” Skriv: ”En tredjedel av 12 är 4.” Bladets rubrik säger ”Dela mängden”; i skolan heter det del av antal.',
        watch: 'Leta efter ett svar som är lika med bråkets nämnare. Den eleven delar först upp bilderna i muggar och lyfter sedan en mugg.',
      },
    },
    '3:fraction-of-set': {
      title: 'Del av antal med täljare och nämnare',
      objective: 'Eleverna ringar in en bråkdel av en samling bilder, till exempel en tredjedel av 12, och skriver hur många det är.',
      note: {
        mistake: 'Eleverna ringar in så många bilder som nämnaren säger: 3 bilder för en tredjedel. Med en täljare över 1 (två tredjedelar) hittar de en grupp och slutar.',
        words: 'Säg: ”Nämnaren berättar hur många lika stora grupper du ska göra. Tredjedelar: gör 3 lika stora grupper. En tredjedel är EN av grupperna.” Knyt det till division: ”12 i 3 lika stora grupper: 4 i varje. En tredjedel av 12 är 4.” Om två tredjedelar: ”Täljaren berättar hur många grupper du tar. Två grupper: 8.”',
        watch: 'Kontrollera att grupperna en elev ringar in är lika stora innan du tittar på talet. En elev som kan 12 / 3 = 4 och ändå ringar in 3 bilder har inte kopplat bråket till divisionen; låt den eleven dela ut bilderna i tre muggar.',
      },
    },
    '3:balance-equations': {
      title: 'Likheter: lika mycket på båda sidor',
      objective: 'Eleverna använder likhetstecknet som en våg och skriver det tal som gör att båda sidor är lika mycket värda.',
      note: {
        mistake: 'Eleverna läser likhetstecknet som ”nu kommer svaret”. I 8 + 4 = __ + 5 skriver de 12 i luckan, eller 17 genom att lägga ihop allt.',
        words: 'Säg: ”Likhetstecknet betyder LIKA MYCKET på båda sidor, som en våg i jämvikt.” Räkna ut ena sidan först: ”8 + 4 är 12. Då måste andra sidan också vara 12. Vad plus 5 är 12?” Läs tecknet som ”är lika mycket som”.',
        watch: 'Ge tre snabba sant-eller-falskt-kort: 7 = 7, 5 + 3 = 3 + 5, 12 = 8 + 4. En elev som kallar dem fel ”för att svaret står på fel sida” läser fortfarande tecknet som ”nu kommer svaret”; bygg likheterna på en riktig balansvåg med den eleven.',
      },
    },
    '3:arithmetic-patterns': {
      title: 'Talföljder: hitta regeln',
      objective: 'Eleverna tar reda på hur mycket en talföljd ökar eller minskar i varje steg och skriver de tal som saknas.',
      note: {
        mistake: 'Eleverna tittar på ett enda par tal, bestämmer sig för en regel och prövar den inte på resten av raden. I talföljder som minskar fortsätter de att addera. Två tal som saknas efter varandra stoppar dem.',
        words: 'Fråga: ”Hur kommer du från det här talet till nästa? Är det samma hopp varje gång? Kontrollera på tre par.” Låt eleverna skriva regeln över raden: ”+ 25” eller ”− 4”. Om en dubbel lucka: ”Två hopp tar dig från 40 till 60. Hur stort är ett hopp?”',
        watch: 'Se vem som skriver upp regeln och prövar den. Blanda ökande och minskande talföljder; en elev som adderar i en minskande rad har slutat titta på talen.',
      },
    },
    '3:input-output': {
      title: 'Talmaskiner',
      objective: 'Eleverna använder regeln som står på en talmaskin, som + 7, − 4 eller · 5, för att fylla i de tal som saknas, både dem som går in och dem som kommer ut.',
      note: {
        mistake: 'Eleverna använder regeln åt samma håll på varje rad. När talet som gick IN saknas använder de regeln framåt en gång till i stället för att gå bakåt: på en maskin med + 7 där 12 kommer ut skriver de 19, inte 5.',
        words: 'Låt eleverna läsa regeln högt först: ”Den här maskinen lägger till 7 på varje tal.” Om ett tal som kommer ut: ”5 går in. Lägg till 7. Vad kommer ut?” Om ett tal som går in: ”12 kom ut. Maskinen lade till 7. Vad gick in? Gör tvärtom: 12 minus 7.”',
        watch: 'Kontrollera raderna där det är talet som går in som saknas; de kräver det motsatta räknesättet. Låt eleven skicka svaret genom maskinen igen: ger 5 plus 7 den 12:a som står tryckt är raden rätt.',
      },
    },
    '3:parity-of-sums': {
      title: 'Blir summan udda eller jämn?',
      objective: 'Eleverna avgör om en summa blir udda eller jämn genom att titta på de två talens entalssiffror, utan att addera.',
      note: {
        mistake: 'Eleverna adderar ändå och tittar sedan på svaret. Eller så gissar de en regel som känns rätt: ”udda plus udda måste bli udda”.',
        words: 'Pröva små tal först och samla resultaten: ”3 + 5 = 8. Udda plus udda … jämnt!” Fråga varför: ”Varje udda tal har en över. De två som blir över bildar ett par.” Bygg de tre reglerna tillsammans: jämnt + jämnt, udda + udda, jämnt + udda.',
        watch: 'Be en elev förklara udda plus udda med plockmaterial lagt i par. Den som bara kan rabbla tabellen glömmer den; den som ser de två överblivna bilda ett par gör det inte. Lektionen är en fördjupning för den som vill resonera.',
      },
    },
    '3:classify-quadrilaterals': {
      title: 'Är det en rektangel?',
      objective: 'Eleverna avgör om en fyrhörning är en rektangel genom att kontrollera sidor och vinklar, och vet att en kvadrat också är en rektangel.',
      note: {
        mistake: 'Eleverna säger att en kvadrat inte är en rektangel för att ”en rektangel har två långa och två korta sidor”. En rektangel som ligger snett godtas inte, och en lutande parallellogram tas för en rektangel.',
        words: 'Fråga: ”Vad gör en rektangel till en rektangel? Fyra sidor och fyra räta vinklar.” Sedan: ”Har en kvadrat fyra sidor och fyra räta vinklar? Då är den en rektangel, en särskild sort.” Pröva hörnen med hörnet på ett papper.',
        watch: 'Fråga ”Är en kvadrat en rektangel?” och lyssna efter skälet. En elev som säger ”ja, för den har fyra räta vinklar” sorterar efter egenskaper, och det är det lektionen går ut på.',
      },
    },
    '3:right-angles': {
      title: 'Jakten på räta vinklar',
      objective: 'Eleverna hittar de räta vinklarna, hörn som i en kvadrat, i figurer och ringar in dem.',
      note: {
        mistake: 'Eleverna ser en rät vinkel bara när det ena benet ligger vågrätt och det andra står lodrätt. En rät vinkel i en figur som ligger snett missas, och en vinkel som är nästan rät godtas.',
        words: 'Ge varje elev en ”hörnmätare”, hörnet på en papperslapp: ”Lägg lappen i vinkeln. Passar den precis? Då är vinkeln rät.” Använd ”mindre än en rät vinkel” och ”större än en rät vinkel”.',
        watch: 'Se vem som vrider lappen eller bladet för att pröva ett hörn som ligger snett. Kontrollera vinklarna som är nästan räta; dem kan bara lappen avgöra. I åk 3 räcker begreppet rät vinkel; att mäta vinklar kommer i åk 4–6.',
      },
    },
    '3:symmetry': {
      title: 'Hur många symmetrilinjer?',
      objective: 'Eleverna hittar alla symmetrilinjer i en figur och skriver hur många de är.',
      note: {
        mistake: 'Eleverna hittar den lodräta linjen och slutar. De missar den vågräta och de sneda, eller räknar diagonalerna i en avlång rektangel, som inte är symmetrilinjer.',
        words: 'Säg: ”Pröva varje vikning: lodrätt, vågrätt, från hörn till hörn.” Använd utklippta figurer: ”Vik den. Hamnar halvorna precis på varandra?” Fråga: ”En kvadrat har 4 symmetrilinjer. Varför har en rektangel som inte är en kvadrat bara 2?”',
        watch: 'Dela ut pappersfigurer att vika. Kontrollera den avlånga rektangeln: en elev som skriver 4 för den har inte vikt den längs en diagonal.',
      },
    },
    '3:perimeter': {
      title: 'Omkrets: gå runt kanten',
      objective: 'Eleverna tar reda på omkretsen av en rektangel genom att räkna rutornas sidor hela vägen runt.',
      note: {
        mistake: 'Eleverna räknar rutorna längs kanten och inte rutornas sidor, så en hörnruta räknas en gång fast den har två sidor utåt. Eller så räknar de rutorna inuti och anger arean.',
        words: 'Säg: ”Omkretsen är sträckan runt om, som ett staket.” Gå med fingret längs utsidan: ”Räkna sidorna på rutorna, inte rutorna. Märk ut var du börjar.” För en rektangel: ”Två långa sidor och två korta: 5 + 3 + 5 + 3.” Bladet säger enhetskanter; det är rutornas sidor längs kanten.',
        watch: 'Kontrollera hörnen: en elev som räknar rutor får ett tal som är 4 för litet. Fråga ”Är det staketet eller gräsmattan?” för att hålla isär omkrets och area.',
      },
    },
    '3:area-model': {
      title: 'Area: räkna rutorna',
      objective: 'Eleverna tar reda på arean av en rektangel genom att räkna dess rutor i rader och gör klart multiplikationen som hör till.',
      note: {
        mistake: 'Eleverna räknar rutorna en och en och räknar fel i en stor rektangel. Andra räknar rutorna längs två sidor och adderar dem, och får ett tal som inte har med arean att göra.',
        words: 'Säg: ”Arean är hur många rutor som täcker figuren utan mellanrum och utan att ligga på varandra.” Fråga: ”Hur många rutor i en rad? Hur många rader? 4 rader med 6 är 24 rutor.” Säg enheten: ”Arean är 24 rutor.”',
        watch: 'Fråga hur eleven räknade. Rader gånger kolumner är målet; att räkna en och en är starten. Lektionen hör till slutet av åk 3; area med kvadratcentimeter kommer i åk 4–6.',
      },
    },
    '3:same-area': {
      title: 'Samma area, annan form',
      objective: 'Eleverna jämför rektanglar och ringar in den som täcker lika många rutor som en annan.',
      note: {
        mistake: 'Eleverna väljer den rektangel som liknar den första mest, eller tror att en lång och smal rektangel måste vara större än en som är mer kvadratisk. De bedömer med ögat och räknar inte.',
        words: 'Säg: ”Annan form, lika stor yta. Räkna rutorna i var och en.” Fråga: ”En med 2 gånger 6 och en med 3 gånger 4. Hur många rutor i varje?” Klipp en pappersrektangel med 3 gånger 4 rutor i bitar och lägg om den: ”Ändrades arean?” Bladet säger yta; ordet i matematiken är area.',
        watch: 'Se vem som räknar och vem som går efter utseendet. Be en elev rita två olika rektanglar med 12 rutor på rutat papper.',
      },
    },
    '3:same-perimeter': {
      title: 'Samma omkrets, annan area',
      objective: 'Eleverna jämför rektanglar och ringar in den som har samma omkrets som en annan.',
      note: {
        mistake: 'Eleverna tror att rektanglar med samma omkrets måste ha samma area, eller jämför areor, eftersom det var rutor de räknade senast. En lång och smal rektangel bedöms ha det längre staketet.',
        words: 'Säg: ”Samma staket, ny gård.” Gör en ögla av ett snöre och dra den till olika rektanglar: ”Snöret blev inte längre. Är ytan inuti lika stor?” Låt eleverna räkna rutornas sidor runt varje rektangel och skriva talen.',
        watch: 'Fråga efter båda talen för två rektanglar, omkretsen och arean, och låt eleven säga vilket som är vilket. Lektionen finns för att dra isär de två begreppen; den är en fördjupning för åk 3.',
      },
    },
    '3:volume-cubes': {
      title: 'Kubtorn: räkna kuberna',
      objective: 'Eleverna räknar alla kuber i ett torn, också dem som inte syns, och skriver hur många det är.',
      note: {
        mistake: 'Eleverna räknar bara de kuber de ser på teckningen och missar dem som är dolda bakom och under. Eller så räknar de de kvadratiska ytor de ser och får ett tal som är alldeles för stort.',
        words: 'Bygg tornet med riktiga kuber först: ”Hur många ser du härifrån? Vänd på det och ta isär det. Räkna alla.” Säg: ”Räkna lager för lager. Hur många kuber i det nedersta lagret? I nästa? Lägg ihop lagren.” Fråga: ”En kub högst upp måste ligga på något. Vad ligger under den?”',
        watch: 'Låt varje elev bygga ett torn från bladet med kuber och jämföra antalet med det skrivna svaret. En elev som räknar lager för lager (”6 och 6 och 6”) har börjat se volym; resten kommer i åk 4–6.',
      },
    },
  },
};
