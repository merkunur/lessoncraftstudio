'use strict';
/**
 * Lärarkommentarer, svenska, ämnet svenska åk 1 (Daily Teaching System, Part 4.6). Skrivna utifrån vad de svenska
 * arbetsbladen TRYCKER och för svensk läs- och skrivinlärning: ljuda ihop ljud för ljud, ljudenlig stavning först,
 * ng och sj som ett ljud, högfrekventa ord som ordbilder. Ingen översättning av de engelska kommentarerna.
 */
module.exports = {
  loc: 'sv',
  points: {
    'K:cvc-build': {
      title: 'Bygga ord med tre ljud',
      objective: 'Eleverna bygger ett ord med tre ljud till en bild genom att lägga bokstäverna i samma ordning som ljuden hörs.',
      note: {
        mistake: 'Eleverna skriver första och sista ljudet och tappar vokalen (”sl” för sol), eller sätter bokstäverna i fel ordning (”slo”).',
        words: 'Fråga: ”Säg ordet. Första ljudet? Nästa ljud? Sista ljudet?” När ordet är skrivet: ”Peka på varje bokstav och säg dess ljud. Läs sedan hela ordet.”',
        watch: 'Låt varje elev läsa upp det den har byggt. En elev som läser ”sl” som ”sol” läser av bilden; täck över bilden och fråga igen.',
      },
    },
    '1:phoneme-boxes': {
      title: 'Ljudremsan: ett ljud i varje ruta',
      objective: 'Eleverna säger ett ord långsamt, skriver ett ljud i varje ruta och ljudar ihop ljuden i rutorna till ett ord igen.',
      note: {
        mistake: 'Eleverna skriver en bokstav i varje ruta och inte ett ljud, så ett ord med ng eller sj får en ruta för mycket. Eller så tappar de ett ljud mitt i ordet, oftast vokalen, och skriver ”sng” för sång.',
        words: 'Säg: ”Dra ut ordet som ett gummiband: s-å-ng. Hur många ljud? Tre. Ng är två bokstäver och ETT ljud; de delar ruta.” När ni ljudar ihop: ”Säg varje ljud, säg dem fortare, säg ordet.”',
        watch: 'Räkna rutorna en elev fyller för ett ord där två bokstäver står för ett ljud. Lyssna på sammanljudningen: en elev som säger ljuden rätt och sedan nämner ett annat ord gissar utifrån första ljudet.',
      },
    },
    '1:word-families-syllable-reading': {
      title: 'Ljuda ihop ord',
      objective: 'Eleverna ljudar ihop korta ord, hittar ordet som passar till en bild och skriver det.',
      note: {
        mistake: 'Eleverna säger ljuden ett och ett med paus emellan och får inte ihop dem till ett ord: ”s … o … l” blir ”sal”. Andra läser första bokstaven och gissar resten utifrån bilden.',
        words: 'Säg: ”Håll kvar varje ljud tills nästa kommer: sss-ooo-lll. Säg det fortare. Vilket ord blev det?” Efter läsningen: ”Finns det ordet? Passar det till bilden?” Läs orden i rutan högst upp tillsammans innan eleverna börjar; arbetsbladet kallar rutan läsmattan.',
        watch: 'Peka på orden i blandad ordning och lyssna. En elev som läser dem på rad och stakar sig när du hoppar runt har lärt sig ordningen utantill. Den som gissar utifrån bilden får läsa ordet med bilden övertäckt.',
      },
    },
    '1:spell-picture-words': {
      title: 'Stava ordet till bilden',
      objective: 'Eleverna säger ett bildord, lyssnar efter ljuden och skriver ordet, först med första bokstaven given och sedan helt själva.',
      note: {
        mistake: 'Eleverna skriver första och sista ljudet och hoppar över mitten: ”sl” för sol, ”bl” för bil. Korta vokaler blandas ihop, mest e och ä och o och å (”bål” för boll).',
        words: 'Säg: ”Säg ordet långsamt. Ta ett finger för varje ljud. Skriv en bokstav för varje finger.” Fråga: ”Vilket ljud hör du i mitten? Säg det igen.” När ordet är skrivet: ”Peka på varje bokstav och läs vad du har skrivit. Blev det ordet?”',
        watch: 'Låt eleverna läsa upp sin egen stavning; det fångar en tappad vokal bättre än du gör. Ljudenlig stavning som går att läsa (”kat” för katt) är ett framsteg i åk 1; dubbelteckning kommer i åk 2. Rätta de ord som står i ordbanken. Bladet utan ordbank passar på vårterminen.',
      },
    },
    '1:rhyming': {
      title: 'Rimord',
      objective: 'Eleverna säger bildord högt, hittar de ord som rimmar och skriver rimorden.',
      note: {
        mistake: 'Eleverna parar ihop ord som börjar på samma ljud (katt och kam) och kallar det rim. Andra går efter stavningen och missar rim som stavas olika, som häst och fest.',
        words: 'Säg: ”Rimord låter likadant från vokalen och till slutet. Bara början byts. Katt, hatt. Lyssna: -att, -att.” Låt eleverna säga båda orden och sedan bara slutet. Fråga: ”Katt och kam: säg sluten. -att, -am. Är de likadana?”',
        watch: 'Låt varje elev säga paret högt innan den ringar in; man rimmar med öronen, inte med ögonen. En elev som gång på gång väljer ord med samma första ljud får höra och säga ordens slut innan något skrivs.',
      },
    },
    '1:syllables-split': {
      title: 'Dela upp ord i stavelser',
      objective: 'Eleverna klappar stavelserna i ett ord, markerar varje stavelse med en båge och skriver ordet med bindestreck mellan stavelserna.',
      note: {
        mistake: 'Eleverna klappar en gång för varje ljud eller bokstav, eller drar ut ett ord med en stavelse till två klappar (”bi-il”). I skrift sätter de bindestrecket var som helst, ofta efter första bokstaven.',
        words: 'Säg: ”Lägg handen under hakan. Säg ordet. Varje gång hakan faller är en stavelse: so-fa, två.” Sedan: ”Varje stavelse har en vokal. En konsonant mellan vokalerna går till nästa stavelse: so-fa. Två konsonanter delar vi mellan: kat-ten, hop-pa.”',
        watch: 'Använd hakan med elever som klappar för många gånger. På bladet med bindestreck kontrollerar du att varje del har en vokal. Det bladet hör till slutet av åk 1; för många räcker bladet med bågar.',
      },
    },
    'K:word-picture-match': {
      title: 'Para ihop ord och bild',
      objective: 'Eleverna läser ett kort ord och parar ihop det med bilden det står för.',
      note: {
        mistake: 'Eleverna tittar bara på första bokstaven och tar första bästa bild som börjar på den: ”sol” paras ihop med en säl. Eller så benämner de bilderna och gissar på orden efter hur långa de är.',
        words: 'Säg: ”Peka på varje bokstav och säg dess ljud. Säg ljuden snabbt. Vilket ord blev det?” Sedan: ”Slutar ordet som bildens namn slutar? Kontrollera sista ljudet.”',
        watch: 'Lyssna när en elev ljudar ett ord. Den som säger första ljudet och sedan nämner en bild gissar; täck över bilderna och låt eleven läsa ordet först. Korten på det andra bladet kan klippas ut och bli ett memory för två.',
      },
    },
    'K:sight-words-reading': {
      title: 'Vanliga ord som ordbilder',
      objective: 'Eleverna känner igen ett vanligt ord direkt, hittar det bland ord som liknar det och skriver det i en mening.',
      note: {
        mistake: 'Eleverna blandar ihop ord som liknar varandra (den och det, han och hon, var och vad). Ord som inte låter som de stavas ljudar de bokstav för bokstav: ”och” blir o-c-h, ”de” blir d-e och ”mig” blir m-i-g, och de märker inte att det inte är ett ord de känner igen.',
        words: 'Säg: ”Ljuda det som går att ljuda. En del av ordet måste du kunna utantill.” Peka på den delen: ”I ’mig’ låter m som vanligt; i-g låter ’ej’. Det får man lära sig.” Om ett ord utan svår del: ”Det här ordet låter precis som det stavas.” Samla orden ni har lärt er på en lista på väggen.',
        watch: 'Kontrollera rutorna med liknande ord på målarbladet: de visar vilka ord en elev blandar ihop. Låt eleven läsa de färdiga meningarna högt; att skriva in ordet är inte samma sak som att läsa det.',
      },
    },
    '1:read-and-follow': {
      title: 'Läs och gör',
      objective: 'Eleverna läser en mening och gör precis det den säger: målar eller ringar in de bilder som nämns.',
      note: {
        mistake: 'Eleverna läser de första orden, snappar upp namnet på en bild och målar den i vilken färg som helst. De små orden bär betydelsen och hoppas över: ”två”, ”röd”, ”inte”, ”sista”.',
        words: 'Säg: ”Läs hela meningen innan du tar upp pennan. Säg sedan: VAD ska du måla eller ringa in? HUR MÅNGA? Vilken FÄRG?” Låt eleven stryka under räkneordet och färgordet. ”Läs en gång till och kontrollera.”',
        watch: 'Bladet rättar sig självt: fel färg eller fel antal visar vilket ord som missades. Sitt med en elev vid en mening och lägg märke till om svårigheten är att läsa orden eller att hålla meningen i huvudet. Lektionen passar på vårterminen.',
      },
    },
    '1:cloze': {
      title: 'Vilket ord passar i luckan?',
      objective: 'Eleverna läser en mening med en lucka och väljer det ord eller den bild som gör meningen begriplig.',
      note: {
        mistake: 'Eleverna väljer ett ord som passar till bilden och läser inte meningen till slut, så ordet passar inte in. Eller så tar de nästa lediga ord i ordlistan.',
        words: 'Säg: ”Läs alla ord i ordlistan först. Läs meningen och säg ’hm’ vid luckan. Pröva ett ord: blir meningen begriplig? Låter den rätt?” Låt eleverna läsa den färdiga meningen högt. ”Varje mening ska betyda något när du läser den.”',
        watch: 'Lyssna när eleven läser en färdig mening. En mening som inte betyder något och som eleven inte reagerar på är det viktiga fyndet; den eleven läser ord, inte innehåll.',
      },
    },
    '1:unscramble-sentence': {
      title: 'Ordna orden till en mening',
      objective: 'Eleverna ordnar omkastade ord och skriver meningen med stor bokstav och skiljetecken.',
      note: {
        mistake: 'Eleverna skriver av orden i den ordning de är tryckta. När de väl hittar ordningen glömmer de den stora bokstaven i början eller skiljetecknet i slutet.',
        words: 'Säg: ”Leta upp ordet med stor bokstav: det står troligen först. Namn har också stor bokstav, så kontrollera. Leta upp ordet med skiljetecknet: det står sist.” Sedan: ”Vem eller vad handlar meningen om? Vad händer?” Vid ett frågetecken: ”I en fråga kommer ofta verbet först: Sover katten?” Låt eleverna säga meningen högt innan de skriver.',
        watch: 'Låt eleven läsa den skrivna meningen högt. Kontrollera tre saker i tur och ordning: är meningen begriplig, börjar den med stor bokstav, slutar den med punkt eller frågetecken.',
      },
    },
    '1:question-words': {
      title: 'Frågeord: vem, vad, var',
      objective: 'Eleverna väljer det frågeord, vem, vad eller var, som frågar efter en del av en mening, och parar ihop frågor med svar.',
      note: {
        mistake: 'Eleverna väljer ”vad” till allt. ”Var” och ”vad” skiljer sig bara på sista bokstaven och förväxlas i läsningen, och ”vem” och ”var” blandas ihop när svaret är en plats med en person i (”hos mormor”).',
        words: 'Ge varje ord en uppgift: ”VEM frågar efter en person. VAD frågar efter en sak eller något man gör. VAR frågar efter en plats.” Fråga om en mening från klassrummet: ”Maja läser i soffan. Vem läser? Vad gör hon? Var?”',
        watch: 'Be en elev hitta på en fråga till ett svar du ger (”i köket”). Att göra frågan visar mer än att ringa in. Låt eleverna läsa frågeordet högt och peka på sista bokstaven när de tvekar mellan var och vad.',
      },
    },
    '1:story-sequencing': {
      title: 'Bildserie: vad händer sedan?',
      objective: 'Eleverna tittar på bilderna i en berättelse, väljer vad som händer sedan och ordnar meningarna i en berättelse.',
      note: {
        mistake: 'Eleverna väljer en bild som visar samma saker och inte en som följer av det som hände. Meningarna numrerar de i den ordning de är tryckta, eller parar ihop en mening med en bild utifrån ett enda ord.',
        words: 'Fråga: ”Vad hände först? Vad ändrades? Vad kan då hända sedan, och varför?” Använd ordningsorden: ”först, sedan, efter det, till sist”. Låt eleven berätta hela berättelsen med några meningar när bladet är klart.',
        watch: 'Fråga ”Varför den?” En elev som svarar med en orsak (”för att koppen ramlade”) följer berättelsen; den som säger ”för att katten är med” parar ihop bilder.',
      },
    },
  },
};
