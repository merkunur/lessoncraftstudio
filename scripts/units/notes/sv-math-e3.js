'use strict';
/**
 * Lärarkommentarer, svenska, matematik: de 19 lektioner som Stage E-3 (Daily Teaching System, 2026-11-26) placerar i
 * de svenska enheterna, från förskoleklass till åk 3 (Vad rymmer mest?, Olika enheter ger olika tal, Talsymboler förr
 * och nu, Skriftlig huvudräkning med mellanled, Äldre mått, Proportionella samband och de andra). Skrivna utifrån
 * lektionernas arbetsblad på alla tre nivåerna (kontaktark, textdumpar och egna renderingar av de äldre typerna
 * G1-139, K-372, G1-477, G3-484 och G2-508). Det som sägs om verktygen är läst i verktygens kod: Enhetsremsan (två
 * remsor under ett föremål, dra i kanten på den första biten, Så det går jämnt upp, Samma enhet på båda), Mätbänken
 * (Volym: kannan, den höga bägaren och den breda skålen, muggar, Två nya kärl; Vikt: kuber på vågskålen, inte kilogram),
 * Tallinje (kaninen, hoppet, Hoppa), Pengamattan (Få växel tillbaka: varje mynt blir ett hopp från priset mot sedeln;
 * växeln ges i mynt), Linjal (0–30 cm, två handtag, längden visas med punkt), Lärklockan (Steg, Varför säger vi så?,
 * Räkna fem och fem), Tiotalslabbet (Tio ental! Kan du göra ett tiotal av dem?, Gör ett tiotal!) och Slumppåsen
 * (Fyll påsen, Stäng påsen, En gång till, Öppna påsen).
 * En kommentar är så lång som handledningens blad rymmer (build-guide.js kontrollerar det).
 * `node scripts/units/notes/apply.js` merges every file of this folder into frontend/content/units/points/<loc>.json.
 */
module.exports = {
  loc: 'sv',
  points: {
    '1:measure-length-units#mata-langd-med-klossar': {
      title: 'Mäta längd med klossar och steg',
      objective: 'Barnen mäter saker i klassrummet med klossar och egna steg, lägger enheterna kant i kant från sakens ena ände och räknar hur många som fick plats. På bladet räknar de rutorna under en sak och skriver antalet.',
      note: {
        mistake: 'Barnen lämnar glipor mellan klossarna, låter dem gå omlott eller börjar en bit från sakens kant. På bladet räknar många alla rutor i raden, också de vita som saken inte når fram till. När de mäter med steg tar de långa kliv i stället för att sätta hälen mot tårna.',
        words: 'Lägg klossar längs en bok tillsammans: ”Var börjar boken? Där ligger första klossen. Får det vara glipor?” Räkna högt och säg enheten: ”Boken är 6 klossar lång.” Öppna Enhetsremsan: bitarna ligger redan kant i kant från föremålets kant, och talet efter remsan säger hur många det är. Räkna bitarna i den övre remsan tillsammans och jämför med talet. Låt sedan barnen gå längs mattan häl mot tå och räkna stegen.',
        watch: 'Läs instruktionen högt; barnen läser inte själva. Rutorna under saken är skuggade, de andra vita. Låt barnet sätta fingret på varje skuggad ruta och sluta där skuggan slutar. Det lättare bladet har tre saker och 2–5 större rutor, bladet för alla tre saker och 3–8 rutor, det svårare fyra saker och upp till 9 rutor. Den som skriver radens alla rutor räknar med de vita: täck dem med handen och räkna igen.',
      },
    },
    'K:compare-capacity': {
      title: 'Vad rymmer mest?',
      objective: 'Barnen häller vatten eller ris mellan kärl, räknar hur många muggar ett kärl rymmer och ordnar kärl från det som rymmer minst till det som rymmer mest. På bladet ringar de in det kärl som rymmer mest och numrerar kärlen i en rad.',
      note: {
        mistake: 'Barnen tror att det högsta kärlet rymmer mest, också när ett lågt och brett rymmer fler muggar. På bladet går de efter bildernas storlek, men alla bilder är lika stora: glaset är ritat lika stort som poolen. I raden skriver många 1 under det som rymmer mest, fast bladet vill ha 1 under det som rymmer minst.',
        words: 'Häll först på riktigt: ”Hur många muggar vatten går det i vår burk? Gissa först.” Räkna högt för varje mugg. Öppna Mätbänken och välj Volym: ”Vilken rymmer mest, den höga bägaren eller den breda skålen?” Tryck på ett kärl och håll kannan intryckt för att hälla, och räkna muggarna tillsammans. Tryck på Två nya kärl några gånger: ibland rymmer den höga bägaren färre muggar än den breda skålen. Säg ”rymmer mest” och ”rymmer minst”, inte ”är störst”.',
        watch: 'Läs instruktionen och orden under bilderna högt. På det lättare bladet skiljer kärlen i ett par mycket (som badkar och kanna), på bladet för alla mindre. Det svårare har två par där barnet ringar in det som rymmer minst och en rad med fyra kärl: säg ”minst” tydligt. Klassens burk är er egen burk: välj en burk som rymmer 2–10 muggar och fyll den med muggar före bladet, så ritar barnet lika många muggar och skriver talet. Hinken på bladet är en sandhink.',
      },
    },
    'K:draw-shapes': {
      title: 'Bygga och rita former på prickpapper',
      objective: 'Barnen bygger trianglar, kvadrater och rektanglar med glasspinnar och med gummiband på geobräde, räknar sidor och hörn och ritar sedan formerna genom att dra streck mellan prickar.',
      routine: 'Dag 1: Varje par får glasspinnar och bygger en triangel, en kvadrat och en rektangel på bänken; rektangeln får två pinnar i rad på långsidorna. Räkna sidor och hörn tillsammans: ”Hur många pinnar behövde triangeln?” Spänn sedan gummiband på geobrädet och gör samma former. Dag 2: Bygg en kvadrat på geobrädet, rita av den på prickpapper och jämför. Sedan bladet.',
      note: {
        mistake: 'Barnen ritar en kvadrat som är längre åt ena hållet, eller en kvadrat där bladet ber om en rektangel med två långa och två korta sidor. Många hoppar över prickar och drar sneda streck, så att hörnen inte blir raka. En del tror att en triangel bara är en triangel när spetsen pekar uppåt.',
        words: 'Läs formens namn på kortet högt. Säg: ”Räkna hoppen mellan prickarna längs sidan. Är det tre hopp här, ska det vara tre hopp på alla sidor i en kvadrat.” ”Rektangeln här ska ha två långa och två korta sidor.” Visa en triangel som står på spetsen och en som står på en sida: ”Är båda trianglar? Räkna sidorna och hörnen.”',
        watch: 'Det tjocka orange strecket är formens första sida; barnet börjar där. På det lättare bladet har varje kvadrat och rektangel ett sådant streck, på bladet för alla saknas det på en kvadrat, och på det svårare har bara rektangeln det. Triangeln ritas alltid fritt. Rektangelns sida är fyra hopp lång; godta varje rektangel som inte är en kvadrat. Låt barnet räkna hoppen på varje sida högt.',
      },
    },
    'K:place-words': {
      title: 'Lägesord: framför, bakom, mellan och bredvid',
      objective: 'Eleverna placerar saker med lägesorden framför, bakom, mellan, bredvid, ovanför, nedanför, till vänster om och till höger om, ritar saker på rätt plats i en hylla och skriver det lägesord som fattas i en mening.',
      routine: 'Dag 1: Ställ en låda och några leksaker på en hylla eller bänk. Ge en instruktion i taget: ”Ställ nallen bakom lådan. Lägg bollen mellan bilen och boken.” En elev flyttar, klassen säger om det stämmer, och eleven säger meningen. Dag 2: Eleverna arbetar i par med pennfodral, sudd och penna. Den ena säger en lägesmening, den andra placerar och säger meningen tillbaka.',
      note: {
        mistake: 'Vänster och höger blandas ihop, särskilt när eleven tänker sig att den själv står i hyllan och tittar ut. Framför och bakom är svåra på en bild: att en leksak står bakom lådan syns bara på att lådan skymmer den. ”Bredvid” uppfattas som ”nära”, och ”mellan” används om en sak som bara har något på ena sidan.',
        words: '”Vänster och höger är som du ser hyllan.” Låt eleverna hålla upp vänster hand. ”Vilken leksak ser du hela, och vilken skymmer lådan?” Ställ en bil framför och en kopp bakom en låda på katedern och säg hela meningen: ”Bilen står framför lådan. Koppen står bakom lådan.” ”Mellan betyder att det finns något på båda sidor.” ”Bredvid betyder alldeles intill.” Läs meningarna högt för den som behöver.',
        watch: 'Eleven ritar bara i de streckade tomma platserna, och varje mening passar på en enda plats. Det lättare bladet har tre rita-meningar och tre ord i rutan, ett för varje skriv-mening. På bladet för alla kommer ovanför och ett ord blir över; på det svårare kommer nedanför och två ord blir över. Den som blandar ihop sidorna lägger handen på pilarna under hyllan: vänster och höger.',
      },
    },
    '1:units-give-different-numbers': {
      title: 'Olika enheter ger olika tal',
      objective: 'Eleverna mäter samma sak med två olika enheter, skriver båda mätetalen och förklarar att det går åt fler av den kortare enheten.',
      note: {
        mistake: 'Eleverna tror att saken blev längre när talet blev större, eller att den enhet det gick åt flest av är den längsta. Många räknar ihop de två raderna eller glömmer den sista biten. Gem som hänger ihop i en kedja är svåra att räkna, och eleven tappar lätt bort sig.',
        words: 'Öppna Enhetsremsan: två remsor under samma föremål. Dra i kanten på den första biten i den övre remsan så att bitarna blir mindre: ”Talet växer. Blev föremålet längre?” Tryck på Samma enhet på båda: ”Nu är talen lika. Varför?” Mät en bok med klossar och med gem: ”Hur många klossar? Hur många gem? Vilken enhet är kortast?” Låt eleverna själva avsluta meningen: ”Ju kortare enheten är, desto … går det åt.”',
        watch: 'Det lättare bladet har bara klossar och gem, och en kloss är lika lång som två gem. På bladet för alla kommer glasspinnar, och där är en kloss lika lång som ett och ett halvt gem, så talen blir inte bara dubbla. Det svårare slutar med meningen ”Ju kortare enheten är, desto fler/färre går det åt.” Låt eleven sätta en prick på varje gem den räknar. Den som ringar in den längsta enheten blandar ihop antal och längd: ”Vilken enhet behövde du flest av?”',
      },
    },
    '1:count-on-back-hops#subtraktion-som-skillnad': {
      title: 'Subtraktion som skillnad: räkna uppåt',
      objective: 'Eleverna löser subtraktioner där talen ligger nära varandra i talområdet 0–20, som 12 − 9, genom att räkna uppåt på tallinjen från det mindre talet till det större, och skriver den addition som hör till.',
      note: {
        mistake: 'Eleverna räknar talen i stället för stegen: från 9 till 12 räknar de 9, 10, 11, 12 och får 4. Andra räknar baklänges nio steg från 12 i stället för att se att talen ligger nära varandra. I additionen skriver en del det större talet i rutan i stället för hoppets längd.',
        words: 'Öppna Tallinjen. Ställ kaninen på 9 och gör varje hopp 1 långt. ”Hur många steg är det till 12? Gissa först.” Tryck på Hoppa en gång i taget och räkna stegen, inte talen: ”Ett, två, tre. Från 9 till 12 är det tre steg.” Skriv 12 − 9 = 3 och 9 + 3 = 12: ”Skillnaden är hoppets längd. Det är samma tre i båda.” Fråga: ”När lönar det sig att räkna uppåt i stället för att ta bort?”',
        watch: 'På det lättare bladet har varje tal 0–20 sin siffra, och båda talen och hoppet är ritade. På bladet för alla står bara 0, 5, 10, 15 och 20 på linjen, de två talen under sina streck och hoppet ritat. På det svårare står bara 0, 10 och 20: eleven markerar båda talen och ritar hoppet själv. Varje blad blandar uppgifter som går över tio med uppgifter som inte gör det. Samma tal, hoppets längd, ska stå i alla tre rutorna i en uppgift.',
      },
    },
    '2:shopping-money#betala-med-sedlar': {
      title: 'Betala med sedlar och få växel tillbaka',
      objective: 'Eleverna betalar varor som kostar upp till 100 kronor med en 20-, 50- eller 100-kronorssedel, räknar ut växeln genom att räkna uppåt från priset till sedelns värde och ritar växeln med mynt och sedlar.',
      note: {
        mistake: 'Eleverna räknar bakåt från sedeln och tappar räkningen, eller adderar priset och sedeln. På den tomma tallinjen hoppar många en krona i taget i stället för att först hoppa till närmaste tiotal. När växeln ritas som en lång rad enkronor stämmer summan, men det tar tid och blir lätt fel.',
        words: 'Öppna Pengamattan och tryck på Få växel tillbaka. Välj sedeln kunden betalar med och tryck på mynt ett i taget: varje mynt blir ett hopp från priset mot sedelns värde, och handlaren räknar upp. Mattan ger växeln i mynt; på bladet får eleverna rita sedlar också. Visa själv på tavlan: ”76 kronor och 4 är 80, och 20 till är 100. Växeln är 24 kronor.” Fråga: ”Hur kan du kontrollera? Priset och växeln ska tillsammans bli lika mycket som sedeln.”',
        watch: 'På det lättare bladet står priset och sedelns värde vid tallinjens ändar, och växeln är mindre än tio kronor. På bladet för alla och det svårare skriver eleven talen på den tomma tallinjen själv, och raden överst visar vilka mynt och sedlar som finns; på bladet för alla går växeln alltid över ett tiotal. Det svårare vill ha växeln med så få mynt och sedlar som möjligt, och där finns bara ett sätt. Godta på de andra bladen varje ritning som blir rätt summa.',
      },
    },
    '2:estimate-lengths': {
      title: 'Meter och centimeter',
      objective: 'Eleverna uppskattar och mäter längder i klassrummet i hela centimeter eller hela meter, vet att 1 meter är 100 centimeter och väljer centimeter för korta saker och meter för långa.',
      note: {
        mistake: 'Eleverna skriver talet utan enhet eller sätter fel enhet efter talet, som 3 cm för tavlans bredd. Många lägger linjalen vid 1 i stället för vid 0, och när de mäter långa sträckor flyttar de meterlinjalen utan att markera var den slutade, så att det blir glipor eller överlapp. En del suddar ut sin uppskattning när mätningen är klar.',
        words: 'Visa verktyget Linjal och ställ handtagen på 0 och 10: ”Så lång är 10 centimeter. Hur många sådana går det på en meter?” Lägg tio tiotalsstavar ur tiobasmaterialet längs en meterlinjal. Visa 1 centimeter mellan fingrarna och 1 meter mellan händerna. Fråga före varje mätning: ”Är det kortare eller längre än en meter? Ska vi mäta i centimeter eller i meter?” Säg: ”En uppskattning får vara fel. Vi suddar inte ut den.”',
        watch: 'Skriv ut bladet i verklig storlek (100 %, inte ”anpassa till sidan”) och kontrollera 10-centimeterslinjalen överst med en riktig linjal innan du kopierar. Mätningarna har inget facit: eleverna mäter sitt eget klassrum, så ha måttband eller meterlinjal framme. Det lättare bladet har enheten tryckt i varje rad och sex bilder; på bladet för alla skriver eleven enheten själv, och det svårare har en kolumn för skillnaden och tre rutor att fylla i, som 3 m = ☐ cm.',
      },
    },
    '2:mass-grams#kilogram': {
      title: 'Kilogram: väga och jämföra',
      objective: 'Eleverna väger saker i hela kilogram med kilovikter på en balansvåg och läser av en köksvåg, och avgör om något väger mer än, mindre än eller ungefär 1 kilogram.',
      note: {
        mistake: 'Eleverna tror att det som är stort är tungt, och på bladet är jordgubben ritad lika stor som cykeln och soffan. På en balansvåg tror många att den sida som är högst upp väger mest. På köksvågen läser de av det närmaste talet, och när bara vartannat kilogram har ett tal läser de ett udda tal som talet bredvid.',
        words: 'Låt eleverna hålla ett kilopaket socker i ena handen och en sak i den andra: ”Väger den mer eller mindre än ett kilogram?” Pröva sedan på en riktig balansvåg. Öppna Mätbänken och välj Vikt: lägg kuber på vågskålen tills vågen är i jämvikt. ”Nu väger saken lika mycket som kuberna. På bladet är vikterna kilovikter, så där räknar vi kilogram.” Säg: ”Den sida som går ner är tyngst.”',
        watch: 'Det lättare bladet har två balansvågar där eleven räknar kilovikterna, och sex bilder: mer eller mindre än 1 kg. På bladet för alla kommer köksvågar med ett tal för varje kilogram, på det svårare bara för vartannat: räkna strecken mellan talen. Det svårare slutar med fyra små balansvågar med en kilovikt; står vågen rakt väger saken ungefär 1 kg. Fråga om varje bild: ”Har du burit en sådan? Var den tung?”',
      },
    },
    '1:time-read#fem-i-halv': {
      title: 'Klockan: fem i halv och fem över halv',
      objective: 'Eleverna läser av och ställer klockan i steg om fem minuter och säger tiden så som vi säger den i vardagen, också fem i halv och fem över halv, och drar streck från klockor till klockslag skrivna med ord.',
      note: {
        mistake: 'Eleverna säger fem i halv med fel timme: när klockan är 2.25 säger de ”fem i halv två” i stället för ”fem i halv tre”. Fem i halv och fem över halv blandas ihop, och fem över halv tre läses som ”fem över tre”. Andra tittar bara på timvisaren och väljer ett klockslag i ord som har rätt timme men fel minuter.',
        words: 'Öppna Lärklockan och välj Steg: 5 minuter. Ställ halv tre och flytta minutvisaren ett steg bakåt: ”Nu är det fem minuter kvar till halv tre: fem i halv tre.” Tryck på Varför säger vi så?: bågen på kanten visar de fem minuterna fram till halv. Flytta minutvisaren två steg framåt: ”Fem över halv tre.” Fråga innan du drar: ”Var ska minutvisaren stå?” Läs sedan bubblan, som visar hur vi säger tiden. Använd Räkna fem och fem när någon tappar minuterna.',
        watch: 'Bladet för alla har fem klockor på fem minuter när och sex klockslag i ord; ett av dem är en timme fel och blir över. Kopian som lektionen delar ut har både fem i halv och fem över halv; ställ dem på Lärklockan först. Det lättare bladet har hela och halva timmar, kvart över och kvart i. Varje blad har två halvtimmar efter varandra, som halv sex och halv sju: be eleven säga vilken timme som kommer innan strecket dras.',
      },
    },
    '3:elapsed-duration': {
      title: 'Hur lång tid tar det?',
      objective: 'Eleverna räknar ut hur lång tid som går mellan två klockslag i hela och halva timmar och avgör om en aktivitet tar sekunder, minuter eller timmar.',
      routine: 'Dag 1: Skriv på tavlan när skoldagen börjar, när lunchen börjar och när skoldagen slutar, i hela och halva timmar. Ställ en stor klocka på starttiden och flytta visarna en timme i taget medan klassen räknar: ”En timme, två timmar och en halvtimme till.” Dag 2: Pröva saker tillsammans: klappa en gång, säga sitt namn, gå ett varv runt skolgården. Eleverna gissar först om det tar sekunder, minuter eller timmar.',
      note: {
        mistake: 'Eleverna räknar starttimmen som den första timmen, så att det från klockan fyra till klockan sju blir fyra timmar. Halvtimmen tappas bort eller skrivs som ½ i minutrutan. ”Halv nio” uppfattas som en halvtimme efter nio. När tiden går förbi klockan tolv drar många det mindre talet från det större.',
        words: '”Börja på starttiden och hoppa en timme i taget till sluttiden. Räkna hoppen, inte talen.” Visa från klockan fyra till halv sju på en stor klocka: ”Fyra till fem, fem till sex: två timmar. Sex till halv sju: en halvtimme till. En halvtimme är 30 minuter.” Fråga om varje aktivitet: ”Hinner du det medan jag klappar en gång, tar det ungefär som en rast, eller tar det flera timmar, som en hel skoldag?”',
        watch: 'Det lättare bladet har klockslagen i ord under klockorna och börjar på hela timmar; på bladet för alla står inga ord, och starten kan vara en halvtimme. På det svårare går varje par fram till eller förbi klockan tolv, och eleven skriver klockslaget i ord efter ”Klockan:”. Varje blad har två tider med en halvtimme och en med hela timmar. Låt den som fastnar flytta visarna på en riktig klocka och räkna varje timme som går.',
      },
    },
    '3:historical-numerals': {
      title: 'Talsymboler förr och nu',
      objective: 'Eleverna läser och skriver tal med egyptiska talsymboler och tal upp till 30 med romerska siffror och förklarar varför egyptierna inte behövde någon nolla, medan vi gör det: i vårt positionssystem bestämmer siffrans plats värdet.',
      routine: 'Dag 1: Leta romerska siffror i skolan och hemma: på urtavlor, i kapitelnummer, i kungarnas namn som Carl XVI Gustaf. Skriv dem på tavlan och läs dem tillsammans. Dag 2: Grupperna bygger tal med egyptiska tecken av material: glasspinnar som streck, böjda piprensare som bågar och snören rullade till rep. En annan grupp läser talet och skriver det med våra siffror.',
      note: {
        mistake: 'Eleverna läser de egyptiska tecknen som siffror på platser: två rep och tre bågar blir ”23”. När ett tal saknar tiotal vill de rita ett tecken för nollan. I romerska tal lägger många ihop allt och läser IV som 6, och de skriver fyra I i rad i stället för IV.',
        words: '”Varje egyptiskt tecken har samma värde var det än står: ett rep är hundra, en båge tio, ett streck ett.” Skriv 305 och 350 på tavlan: ”Hur skrev egyptierna dem? Behöver de en nolla?” Jämför: ”I 305 håller nollan tiotalens plats tom. Tar vi bort den blir det 35.” Om romerska siffror: ”Står I före V eller X tar man bort 1.”',
        watch: 'Det lättare bladet har tal upp till 399 utan lotusblomman och romerska tal där man bara lägger ihop; frågan om nollan har en påbörjad mening: ”Egyptierna behövde ingen nolla eftersom”. På bladet för alla står lotusblomman (1 000) och regeln för IV och IX i nyckeln, och IX finns bland talen. Det svårare har två tal att skriva med egyptiska tecken, ett av dem med en nolla, och två tal att skriva med romerska siffror. Tecknen får stå i valfri ordning.',
      },
    },
    '3:estimate-by-rounding#ar-svaret-rimligt': {
      title: 'Är svaret rimligt?',
      objective: 'Eleverna gör överslag genom att avrunda till hela hundratal, avgör om ett svar på en addition eller subtraktion i talområdet 0–1 000 är rimligt och väljer rimliga svar på vardagsfrågor om längd, vikt, tid och volym.',
      routine: 'Dag 1: Rimligt eller orimligt? Skriv färdiga uträkningar på tavlan, några med fel svar. Eleverna gör överslaget på miniwhiteboard och visar tummen upp eller ner; en elev förklarar hur hon eller han såg det. Dag 2: Grupperna hittar på tre egna vardagsfrågor, var och en med ett rimligt och två orimliga svar, och byter med en annan grupp som ringar in.',
      note: {
        mistake: 'Eleverna avrundar 349 till 400 eftersom de tittar på entalssiffran 9, eller avrundar bara det ena talet. Många räknar ut svaret exakt i stället för att göra överslag, och tror att ett svar är fel för att det inte är lika med överslaget. I vardagsfrågorna väljer de det tal som låter bekant utan att tänka på enheten.',
        words: '”Titta på tiotalssiffran. 349 har fyra tiotal, färre än fem, alltså blir det 300.” ”Överslaget är inte svaret. Det säger ungefär var svaret ska ligga.” Läs regeln i rutan högt: ”Skiljer svaret mer än 100 från överslaget, är svaret orimligt.” Fråga vid ett orimligt svar: ”Vad kan den som räknade ha glömt? Ett hundratal som skulle läggas till, eller en växling?” Om vardagsfrågor: ”Väger en katt 4 gram? Tänk på något du har lyft.”',
        watch: 'Det lättare bladet har sex additioner, bladet för alla tre additioner och tre subtraktioner, och det svårare samma slags uträkningar och en ruta för rätt svar. Ett fel svar ligger alltid långt från överslaget (en glömd minnessiffra eller växling), ett rätt svar nära; godta det som regeln och överslaget ger. Vardagsfrågornas svar har samma tal med olika enheter eller samma enhet med olika tal: låt eleven läsa frågan med vart och ett av svaren högt och höra vilket som går ihop.',
      },
    },
    '3:add-sub-by-place-value': {
      title: 'Skriftlig huvudräkning med mellanled',
      objective: 'Eleverna adderar och subtraherar tresiffriga tal i talområdet 0–1 000 genom att räkna hundratal, tiotal och ental var för sig, skriver mellanleden och lägger ihop delsvaren, som 256 + 318 = 500 + 60 + 14 = 574.',
      note: {
        mistake: 'När entalen blir tio eller fler, som 6 + 8 = 14, skriver eleven bara 4 och tappar tiotalet, eller sätter 14 på entalens plats i svaret. Andra räknar hundratalen som ental och skriver 2 + 3 = 5 i stället för 200 + 300 = 500. I subtraktion lägger en del ihop talsorterna i stället för att ta bort.',
        words: 'Bygg 256 i Tiotalslabbet och lägg till 318: först 3 hundratal, sedan 1 tiotal, sist 8 ental. Säg: ”Hundratalen för sig: 200 och 300 är 500. Tiotalen: 50 och 10 är 60. Entalen: 6 och 8 är 14.” När det ligger tio ental eller fler frågar labbet ”Tio ental! Kan du göra ett tiotal av dem?”, och knappen Gör ett tiotal! byter tio ental mot ett tiotal: ”500 + 60 + 14 är 574.” Fråga: ”Varför börjar vi med hundratalen?”',
        watch: 'På det lättare bladet står talsorterna utskrivna (som 600 + 100 = ☐) och ingen uppgift har växling. På bladet för alla skriver eleven alla mellanled själv, och några additioner har en växling. Det svårare har den korta formen med åtta uppgifter och en växling i varje addition. Subtraktionerna har aldrig växling här; den kommer med uppställningen senare i området. Delsvaren läggs alltid ihop, också i subtraktion: 400 + 20 + 3.',
      },
    },
    '3:old-body-measures': {
      title: 'Äldre mått: tum, fot, aln och famn',
      objective: 'Eleverna mäter sträckor i klassrummet med tum, fot, aln och famn på den egna kroppen, mäter samma sträckor i meter och centimeter, jämför med en kamrat och förklarar varför vi behöver gemensamma måttenheter.',
      note: {
        mistake: 'Eleverna lämnar glipor eller låter fötterna gå omlott när de går häl mot tå, och räknar en halv fot som en hel. Många tror att den som får det största talet har den längsta foten. När sträckan är längre än en meter skriver en del hela längden i centimeterrutan och något i meterrutan också.',
        words: '”Förr hade varje människa sina egna mått. Min fot är längre än din. Vem behöver flest fot för att mäta dörrens bredd?” Mät dörrens bredd med din fot och med en elevs fot. Öppna Enhetsremsan och dra i kanten på den första biten i den övre remsan så att den blir större: ”Nu är biten en vuxens fot. Blev talet större eller mindre?” Tryck på Samma enhet på båda: ”Så blev det när alla bestämde sig för samma mått.”',
        watch: 'Mätningarna har inget facit. En niåring har en fot som är kortare än bladets 30 cm, så elevernas tal blir större än en vuxens; det är just poängen. Det lättare bladet har fyra rader och en rad för varför, bladet för alla fem rader och en kolumn för kamratens tal. På det svårare väljer eleven mått själv och fyller i hur de gamla måtten hänger ihop. Vid jämförelsen gäller: den som behöver färre fot har längst fot.',
      },
    },
    '3:proportional-tables': {
      title: 'Proportionella samband: dubbelt så många, dubbelt så mycket',
      objective: 'Eleverna fyller i tabeller över pris för olika antal och räknar om recept för fler eller färre personer med dubbelt, hälften och tre gånger så mycket, i talområdet 0–200.',
      routine: 'Dag 1: Kafé i klassrummet. Ett glas saft kostar 6 kr. Eleverna lägger låtsaspengar för 1, 2, 3 och 4 glas, och du skriver tabellen på tavlan: ”Dubbelt så många glas, hur mycket kostar det?” Dag 2: Gör trolldeg i grupper: 2 dl vetemjöl, 1 dl salt och 1 dl vatten räcker till två. Grupperna räknar om receptet för fyra och mäter upp med decilitermått.',
      note: {
        mistake: 'Eleverna lägger till samma tal i stället för att ta gånger: kostar 2 glas 12 kr, tror de att 4 glas kostar 14 kr. I receptet ändrar de bara en ingrediens, eller räknar om för 8 personer genom att lägga till 4 överallt. Hälften blandas ihop med att ta bort 2.',
        words: 'Fråga: ”Om vi köper dubbelt så många, vad händer då med priset?” Visa i tabellen: ”Från 2 till 4 tar vi gånger två. Hur blir det då med priset?” Fråga: ”Hur hittar du priset för en, om du vet priset för två?” Om receptet: ”Varje ingrediens ändras på samma sätt. Hur mycket blir det för 8 personer, och hur mycket för 2?”',
        watch: 'Det lättare bladet ger priset för en sak och antal 1–5, receptet räknas om för 8 personer och en mening ringas in. På bladet för alla står priset för två saker, så eleven räknar ut priset för en först; receptet räknas om för 2 och 8 personer. Det svårare ger priset för tre, frågar efter antalet som hör till ett pris och har 12 personer; eleven skriver med ord vad som händer med priset. De två tabellerna på ett blad har olika pris.',
      },
    },
    '3:chance-more-likely': {
      title: 'Slumpförsök: lika stor chans?',
      objective: 'Eleverna jämför chansen att dra en viss bricka ur två påsar, prövar en gissning med 20 drag ur Slumppåsen, för streck i häftet och jämför resultatet med vad de trodde.',
      note: {
        mistake: 'Eleverna tittar bara på hur många brickor av rätt sort påsen har och glömmer hur många brickor det finns i allt: har båda påsarna 3 cirklar tror de att chansen är lika, fast 3 av 6 ger större chans än 3 av 10. Många tror att det som finns mest av alltid kommer flest gånger, och att en tärning som inte ger någon sexa är fel. När påsarna har lika stor chans väljer de ändå en av dem.',
        words: 'Fyll Slumppåsen med 3 cirklar och 1 kvadrat medan klassen ser på, stäng påsen och ställ in 20 drag. Låt klassen flytta bitarna efter vad de tror och fråga: ”Vad kommer oftast? Kommer kvadraten aldrig?” Dra och räkna. Tryck på En gång till: samma påse ger en annan rad. Fyll sedan påsen med 2 cirklar och 2 kvadrater: ”I vilken påse är chansen störst att dra en kvadrat, den förra eller den här?” Säg: ”Chansen säger vad som brukar hända, inte vad som händer nästa gång.”',
        watch: 'På bladet för alla har påsarna i ett par lika många brickor, så den med flest av brickan ger störst chans. Det lättare bladet har tio brickor i varje påse och stor skillnad. Det svårare har en ruta med likhetstecken för lika stor chans och ett par där påsarna har lika många av brickan men olika många brickor. Gör sedan försöket på riktigt: varje par får en påse med 3 klossar av en färg och 1 av en annan, drar 20 gånger utan att titta, lägger tillbaka klossen efter varje drag och sätter ett streck i häftet för varje drag.',
      },
    },
    '3:scaled-graphs#egen-undersokning': {
      title: 'Egen undersökning: från fråga till diagram',
      objective: 'Eleverna formulerar en fråga med svarsalternativ, frågar klassen, för in svaren i en frekvenstabell med streck och antal, ritar ett stapeldiagram där ett steg på axeln är 2 och skriver vad diagrammet visar.',
      routine: 'Dag 1: Eleverna väljer i par en fråga till klassen med tre till fem svarsalternativ, till exempel favoritfrukt eller hur man tar sig till skolan. De går runt, frågar alla och gör ett streck för varje svar; till sist kontrollerar de att antalet svar är lika stort som antalet elever. Dag 2: Paren ritar sitt diagram, sätter upp det på väggen, och klassen går runt och läser vad de andra kom fram till.',
      note: {
        mistake: 'Eleverna ställer frågor som inte går att besvara med alternativen, eller låter alternativen gå in i varandra. När ett steg på axeln är 2 ritar många stapeln för 7 svar sju steg hög, eller vet inte var ett udda antal ska sluta. Rubrik och axlar glöms bort, och någon frågas två gånger medan någon inte frågas alls.',
        words: '”Kan alla i klassen svara på din fråga med ett av alternativen?” Rita en axel på tavlan: ”Varje steg är 2. Var slutar stapeln för 6 svar? För 7?” ”Rubriken säger vad diagrammet handlar om. Den lodräta axeln visar antal, den vågräta svarsalternativen.” Fråga: ”Vad ser du först i diagrammet? Hur många fler valde det vanligaste svaret än det ovanligaste?”',
        watch: 'Bladet har inget facit; varje par gör sin egen undersökning. Det lättare bladet har tre svarsalternativ, 0 och 2 tryckta på axeln och tre påbörjade meningar (Flest valde, Färst valde, Skillnaden mellan flest och färst är). Bladet för alla har fyra alternativ, bara 0 på axeln och en påbörjad mening (Flest valde); det svårare har fem alternativ, inga tal på axeln, en rad för hur många som svarade och ber om tre slutsatser. Axeln räcker till 24; har fler valt samma svar, ritar eleven fler steg.',
      },
    },
    '3:line-plot-halves': {
      title: 'Mäta i halva centimeter och visa i diagram',
      objective: 'Eleverna mäter pennor med linjal till närmaste halva centimeter, med linjalens nolla vid pennans raka ände, och visar längderna som kryss i ett diagram över en tallinje.',
      note: {
        mistake: 'Eleverna lägger linjalens kant i stället för nollan vid pennan, eller börjar vid 1. En halv centimeter skrivs som ett helt tal eller som 6,1 eftersom eleven räknar millimeterstreck. I diagrammet sätter många kryssen bredvid varandra i stället för ovanpå varandra, eller hittar inte var 5,5 ska stå när bara hela centimeter har tal.',
        words: 'Visa verktyget Linjal: ställ starthandtaget på 0 och flytta det andra till strecket mitt emellan 6 och 7. ”Här är det en halv centimeter efter 6. Längden är sex och en halv centimeter, och vi skriver 6,5 cm.” Verktyget visar längden med punkt; i skolan skriver vi komma. Fråga vid diagrammet: ”Var ska 5,5 stå? Hur många pennor är 6 cm långa? Räkna kryssen ovanför.”',
        watch: 'Skriv ut bladet i verklig storlek (100 %, inte ”anpassa till sidan”) och mät en penna med en riktig linjal innan du kopierar: spetsen ska nå en hel eller halv centimeter, inte stanna mellan två streck. Det lättare bladet har sju pennor och tal vid varje halv centimeter i diagrammet. Bladet för alla har åtta pennor, bara hela centimeter utskrivna och frågan om vilken längd som har flest pennor; det svårare har två frågor till om längre än och kortare än.',
      },
    },
  },
};
