'use strict';
/**
 * Lärarkommentarer, svenska, ämnet svenska i förskoleklass (Daily Teaching System, Part 4.6). Skrivna utifrån vad de
 * svenska arbetsbladen TRYCKER och för svensk förskoleklass: språklekar i munnen och med kroppen först (rim,
 * stavelser, ljud), bladet sist. Ingen översättning av de engelska kommentarerna. Tilltal: du.
 */
module.exports = {
  loc: 'sv',
  points: {
    'K:rhyme': {
      title: 'Höra rim',
      objective: 'Barnen säger två bildord högt och avgör om de rimmar.',
      note: {
        mistake: 'Barnen parar ihop ord som börjar på samma ljud (katt, kam) eller som hör ihop till betydelsen (katt, hund) i stället för ord som låter likadant på slutet.',
        words: 'Säg: ”Ord som rimmar låter likadant på slutet. Hus, mus: -us, -us.” Säg paret och dra sedan ut slutet. Lek först utan papper: du säger ett ord, barnen hittar på rim, och nonsensord är välkomna: ”hus, lus, krus, fnus”.',
        watch: 'Benämn alla bilder tillsammans innan barnen börjar; ett barn som kallar en bild för något annat kan inte hitta rimmet. Låt varje barn säga båda orden högt innan det drar strecket eller ringar in.',
      },
    },
    'K:count-syllables': {
      title: 'Klappa stavelser',
      objective: 'Barnen säger ett ord och räknar dess stavelser genom att klappa takten.',
      note: {
        mistake: 'Barnen klappar en gång för varje ljud (tre klappar för ”sol”), eller drar ut ordet och lägger till stavelser som inte finns.',
        words: 'Säg: ”Stavelser är takten i ordet. Säg ordet som du brukar och klappa takten: ti-ger. Två.” En hand under hakan fungerar också: hakan faller en gång för varje stavelse. Börja med barnens namn: ”An-na, två. Mo-ham-med, tre. Kim, en.”',
        watch: 'Ord med en stavelse är provet: vem klappar ”hund” en gång? Be barn som drar ut ordet att säga det i vanlig taltakt.',
      },
    },
    'K:beginning-sounds': {
      title: 'Första ljudet i ordet',
      objective: 'Barnen säger ett bildord, hör dess första ljud och parar ihop ljudet med bokstaven.',
      note: {
        mistake: 'Barnen säger bokstavens namn i stället för ljudet (”be” för b), eller ger hela första stavelsen (”ba” för banan).',
        words: 'Fråga: ”Vilket är det allra första ljudet munnen gör? Mmm … mus.” Säg ljudet rent, utan vokal efter: håll ut ”mmm” och ”sss”, och säg b och d så kort du kan. Säg ”ordet börjar på ljudet …”; det är ordet som börjar på ljudet, inte bilden.',
        watch: 'Fråga: ”Säg ordet. Vilket ljud började du med?” Ett barn som kan säga ljudet men inte hittar bokstaven behöver arbeta med bokstäverna, inte lyssna mer. Bladet där barnen skriver bokstaven själva passar på vårterminen; på hösten räcker bladet med streck.',
      },
    },
    'K:sound-position': {
      title: 'Sista ljudet och ljudet i mitten',
      objective: 'Barnen säger ett bildord, lyssnar efter det sista ljudet eller vokalen i mitten och skriver bokstaven för ljudet.',
      note: {
        mistake: 'Barn som just har lärt sig lyssna efter första ljudet fortsätter att svara med det. Vokalen i mitten är svårast: kort e och kort ä låter likadant, och ett kort å-ljud skrivs ofta med o.',
        words: 'Säg: ”Säg ordet. Vilket ljud hör du sist? Buss … sss.” Om mitten: ”Dra ut ordet: sss-ooo-lll. Vad hör du i mitten?” Säg ”sist i ordet” och ”mitt i ordet” och visa med handen: början vid axeln, mitten vid armbågen, slutet vid handen.',
        watch: 'Ett barn som skriver första bokstaven vid varje bild har inte flyttat sig till slutet av ordet ännu. Säg ordet tillsammans igen och fånga det sista ljudet. Ta sista ljudet och ljudet i mitten vid olika tillfällen; bladet om ljudet i mitten hör till slutet av vårterminen.',
      },
    },
    'K:segment-phonemes': {
      title: 'Räkna ljuden i ordet',
      objective: 'Barnen säger ett ord långsamt, ritar en prick för varje ljud och skriver hur många ljud ordet har.',
      note: {
        mistake: 'Barnen ger stavelserna från stavelselektionen i stället för ljuden, så ”sol” får en prick. Andra delar ordet i bara två delar, ”s” och ”ol”. Barn som redan kan stava räknar bokstäver: ”boll” får fyra prickar fast ordet har tre ljud.',
        words: 'Värm upp med att ljuda ihop. Säg ljuden i ett ord ett i taget, ”s – o – l”, och fråga: ”Vilket ord blir det?” Gör fem ord innan bladet kommer fram. Säg sedan: ”Säg ordet långsamt. Ett finger för varje ljud: m – u – s. Tre ljud.” Säg ”ljud” hela tiden, aldrig ”bokstav”.',
        watch: 'Titta på fingrarna, inte på papperet: ett finger för varje ljud. Ord med dubbel konsonant (boll, katt) visar vem som räknar ljud och vem som stavar. Bladet med ljudrutor för hela ord hör hemma i åk 1.',
      },
    },
    'K:category-sort': {
      title: 'Sortera efter sort',
      objective: 'Barnen avgör vilken grupp varje bild hör till, till exempel djur eller mat, och sorterar bilderna.',
      note: {
        mistake: 'Barnen lägger ihop saker som hör ihop i verkligheten (hunden med benet) och inte saker av samma sort. På frågan varför berättar de en historia om de två bilderna.',
        words: 'Benämn gruppen innan ni sorterar: ”Den här lådan är för djur. Är en hund ett djur? Är ett ben ett djur?” Fråga efter det samlande ordet: ”En hund, en katt och en ko är alla …?” Använd ”hör till” och ”är en sorts”: ”En morot är en sorts mat.”',
        watch: 'Fråga varje barn om en bild: ”Varför ska den dit?” ”För att det är ett djur” är en sortering; ”för att hunden äter det” är en berättelse. Båda är tänkande, men bara det första är att sortera.',
      },
    },
    'K:category-odd-one-out': {
      title: 'Vilken hör inte hit?',
      objective: 'Barnen tittar på en rad bilder, hittar den som inte är samma sorts sak och säger varför.',
      note: {
        mistake: 'Barnen ringar in den bild som ser annorlunda ut (den största, den enda röda) när raden handlar om sorter. Eller så ringar de in en bild och kan inte säga vad de tre andra har gemensamt.',
        words: 'Fråga: ”Vad är de här tre? De är alla frukter. Är skon en frukt?” Låt barnet avsluta meningen: ”Skon hör inte hit för att …” Godta ett annat svar om skälet är bra, och säg det högt.',
        watch: 'Skälet är viktigare än ringen. Ett barn som ger ett annat svar med ett hållbart skäl har gjort tankearbetet; fråga gruppen om de också kan se det så.',
      },
    },
    'K:opposites': {
      title: 'Motsatser',
      objective: 'Barnen parar ihop en bild med den bild som visar dess motsats, till exempel stor och liten eller varm och kall.',
      note: {
        mistake: 'Barnen parar ihop två bilder som hör ihop (varm och solen, natt och en säng) och inte två som är motsatser. Eller så drar de strecket till närmaste bild utan att bry sig om ordet som står vid den.',
        words: 'Gör motsatserna med kroppen: ”Stå upp … sitt ner. Öppna … stäng.” Säg: ”Motsatser är så olika som de kan bli.” Fråga med en mening att avsluta: ”Soppan är varm. Isen är …?” Läs orden på bladet högt; barnen behöver inte kunna läsa dem själva.',
        watch: 'Låt barnen säga båda orden i varje par de drar streck mellan. Ett barn som kan visa motsatsen med kroppen men inte benämna den behöver orden; det är en fråga om ordförråd, inte om tänkande.',
      },
    },
    'K:story-sequencing': {
      title: 'Bildserie: först, sedan, till sist',
      objective: 'Barnen tittar på bilderna i en kort berättelse och lägger dem i den ordning som saker händer.',
      note: {
        mistake: 'Barnen numrerar bilderna från vänster till höger som de är tryckta, utan att titta på vad som händer i dem. Eller så hittar de första bilden och gissar de två andra.',
        words: 'Fråga: ”Vad är annorlunda på den här bilden? Vad hände innan dess?” Berätta med de tre orden: ”FÖRST ligger fröet i jorden. SEDAN kommer ett blad upp. TILL SIST finns det en blomma.” Låt barnet återberätta på samma sätt.',
        watch: 'Låt varje barn berätta högt utifrån det färdiga bladet. Går berättelsen ihop är ordningen rätt; ett barn som inte kan berätta har numrerat rutor, inte ordnat en berättelse.',
      },
    },
    'K:pre-writing-strokes': {
      title: 'Linjer, sicksack, vågor och bågar',
      objective: 'Barnen följer raka linjer, sicksack, vågor och bågar med pennan, från startpricken och i pilens riktning.',
      note: {
        mistake: 'Barnen börjar där pennan råkar hamna och drar mot pilen, eller lyfter pennan vid varje sväng. Många håller pennan i hela näven och trycker så hårt att handen är trött efter två linjer.',
        words: 'Säg: ”Leta upp den orangea pricken. Där börjar pennan. Följ pilen och lyft inte förrän linjen är slut.” Om pennfattningen: ”Nyp om pennan med tummen och pekfingret och låt den vila på långfingret.” Benämn varje linje medan barnet drar den: ”rakt, sicksack, våg, båge”.',
        watch: 'Titta på startpunkten och riktningen, inte på hur fin linjen blev. Ett barn som börjar i fel ände eller drar mot pilen här kommer att forma bokstäver på samma sätt; rätta det nu, en linje i taget.',
      },
    },
    'K:letter-identification': {
      title: 'Hitta bokstaven',
      objective: 'Barnen hittar alla exemplar av en bokstav bland bokstäver som liknar den, som b, d, p och q.',
      note: {
        mistake: 'Barnen ringar in b, d, p och q som samma bokstav: en pinne och en boll. En leksak är samma sak hur man än vänder den, så barnen väntar sig inte att en bokstav blir en annan när den vänds.',
        words: 'Säg: ”Bokstäver är speciella. Vänder du på ett b blir det en annan bokstav.” Ge varje bokstav en kort minnesregel och håll fast vid den hela året: ”b: pinnen först, sedan magen. d: magen först, sedan pinnen. p: pinnen hänger ner under raden.”',
        watch: 'Låt barnet säga namnet eller ljudet på varje bokstav det ringar in. Ett barn som ringar in rätt men inte kan benämna bokstäverna jämför former; ett barn som kallar d för b behöver minnesregeln, inte fler ringar.',
      },
    },
    'K:letter-case': {
      title: 'Stora och små bokstäver',
      objective: 'Barnen parar ihop varje stor bokstav med dess lilla bokstav.',
      note: {
        mistake: 'Barnen parar ihop de par som liknar varandra (C c, S s, O o, Ö ö) och gissar på dem som inte gör det: A a, G g, R r, Q q. De små bokstäverna b, d, p och q får fel partner.',
        words: 'Säg: ”Varje bokstav har två former, en stor och en liten. De heter likadant och låter likadant.” Peka på båda: ”Stora G, lilla g.” Fråga: ”Vilka par liknar varandra? Vilka ser olika ut?” Börja med bokstäverna i barnens egna namn.',
        watch: 'Anteckna vilka par varje barn missar och öva bara dem. Paren som ser olika ut måste läras in ett i taget; för dem finns inget knep.',
      },
    },
    'K:letter-formation': {
      title: 'Skriva bokstäver',
      objective: 'Barnen spårar varje bokstav från startpricken i pilarnas riktning och skriver sedan en egen.',
      note: {
        mistake: 'Barnen ritar bokstäverna nerifrån och upp eller i bitar, så att ett M blir fyra streck i valfri ordning och ett O går runt åt fel håll. Bokstaven ser rätt ut på bladet, men vanan gör skrivandet långsamt senare.',
        words: 'Säg vägen högt för varje bokstav och använd samma ord varje gång: ”Stora B: rakt ner, tillbaka upp, en mage, en mage till.” Fråga: ”Var börjar den? Åt vilket håll pekar första pilen?” Skriv bokstaven stort i luften tillsammans innan pennan rör bladet.',
        watch: 'Stå så att du ser handen röra sig. Kontrollera den bokstav barnet skriver själv på den tomma raden; den visar om vägen är inlärd eller bara följd. I förskoleklass är detta ett första möte; bokstäverna tas en i taget i åk 1.',
      },
    },
    'K:word-sentence-tracing': {
      title: 'Spåra och skriva ord',
      objective: 'Barnen läser ett kort ord, spårar det och skriver det själva från vänster till höger.',
      note: {
        mistake: 'Barnen spårar bokstäverna i valfri ordning och läser aldrig ordet, så bladet blir en ritövning. När de skriver ordet själva tappar de en bokstav, byter ordning eller sprider ut bokstäverna så att ordet ser ut som två.',
        words: 'Säg: ”Läs ordet först. Spåra det nu och säg varje ljud medan du spårar dess bokstav. Skriv det och läs det en gång till.” Om en ordbild som inte låter som den stavas, till exempel ”och”: ”Det ordet känner vi igen som en bild. Säg bokstäverna medan du spårar: o, c, h, och.” Om avstånd: ”Bokstäverna i ett ord står tätt ihop, som kompisar.”',
        watch: 'Be barnet läsa upp det som står skrivet. Titta på ordet barnet skrev självt: står bokstäverna i rätt ordning, tätt ihop och på raden?',
      },
    },
    'K:all-about-me-personal': {
      title: 'Det här är jag',
      objective: 'Barnen skriver sitt namn och sin ålder, ritar sig själva och sina favoritsaker och skriver av ord för sådant de tycker om.',
      note: {
        mistake: 'Barnen skriver sitt namn med bara stora bokstäver eller med bokstäverna i fel ordning, och några kan ännu inte skriva siffran för sin ålder. När de skriver av ett ord hoppar de över en bokstav eller tappar bort sig och börjar om.',
        words: 'Säg: ”Ditt namn börjar med stor bokstav. De andra bokstäverna är små.” Vid avskrift: ”Titta på första bokstaven. Skriv den. Titta på nästa.” Fråga varje barn om teckningen: ”Berätta om din bild.”',
        watch: 'Det här bladet har inga fel svar om barnets liv; rätta bara namnet och de avskrivna orden. Lyssna på vad barnen berättar om sina teckningar och skriv deras ord under bilden om de vill. Det första bladet passar redan vid skolstarten, bladet med avskrift på vårterminen.',
      },
    },
    'K:alphabet-order': {
      title: 'Alfabetet i ordning',
      objective: 'Barnen säger alfabetet i ordning, skriver de bokstäver som fattas och drar streck mellan prickar i bokstavsordning.',
      note: {
        mistake: 'Barnen kan sjunga alfabetet men kan inte säga vad som kommer efter en bokstav mitt i utan att börja om från A. ”L, M, N, O, P” sjungs som ett enda ord, så de bokstäverna försvinner, och Å, Ä och Ö i slutet hamnar i fel ordning.',
        words: 'Säg alfabetet långsamt medan du pekar på varje bokstav och stanna: ”… F, G. Vad kommer sedan?” Fråga: ”Vad kommer efter K? Vad kommer före K?” Sakta ner vid ”L, M, N, O, P” och peka på varje bokstav. Säg slutet för sig: ”X, Y, Z, Å, Ä, Ö.”',
        watch: 'Lägg märke till vilka som sjunger från A vid varje lucka. Ge dem en alfabetsremsa på bordet och låt dem hitta en bokstav och dess grannar genom att titta, sedan ur minnet. Prick till prick-bladet går från a till t, inte genom hela alfabetet; säg det till barnen. Lektionen passar sent på vårterminen.',
      },
    },
  },
};
