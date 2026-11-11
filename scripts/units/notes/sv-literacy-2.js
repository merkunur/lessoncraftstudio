'use strict';
/**
 * Lärarkommentarer, svenska, ämnet svenska åk 2 (Daily Teaching System, Part 4.6). Skrivna utifrån vad de svenska
 * arbetsbladen TRYCKER och för svenskundervisningen: sammansatta ord skrivs ihop, verbet på andra plats (”Först
 * klättrar katten”), en-ord och ett-ord, pluraländelserna -or, -ar, -er, -n. Ingen översättning av de engelska
 * kommentarerna.
 */
module.exports = {
  loc: 'sv',
  points: {
    '1:alphabetical-order': {
      title: 'Alfabetisk ordning',
      objective: 'Eleverna ordnar ord i alfabetisk ordning efter första bokstaven, och efter andra bokstaven när två ord börjar likadant.',
      note: {
        mistake: 'Eleverna ordnar orden efter var de tror att bokstaven kommer i ramsan och tappar bort sig mitt i alfabetet. När två ord börjar på samma bokstav stannar de eller ordnar dem efter längd. Å, Ä och Ö hamnar bland A och O i stället för sist.',
        words: 'Säg: ”Titta bara på första bokstaven. Leta upp var och en på alfabetsremsan. Vilken kommer först på remsan?” När två börjar likadant: ”Båda börjar på b. Täck över b:et. Titta nu på nästa bokstav.”',
        watch: 'Låt alfabetsremsan ligga framme; målet är att använda ordningen, inte att rabbla den. Kontrollera paren som börjar likadant: en elev som sätter ”bok” före ”bil” har inte gått vidare till andra bokstaven. Bladet med andra bokstaven hör till slutet av åk 2.',
      },
    },
    '1:opposites': {
      title: 'Motsatsord',
      objective: 'Eleverna hittar motsatsen till ett ord i en ordbank och skiljer en motsats från ett ord som betyder samma sak.',
      note: {
        mistake: 'Eleverna ringar in ordet som betyder samma sak, för det är det ord som ”hör ihop” med det första. På bladet med ordbank tar de ett ord som handlar om samma sak utan att vara motsatsen, som ”ljum” för ”varm”.',
        words: 'Säg: ”Motsats betyder så olika som det kan bli: varm, kall. Samma sak betyder nästan likadant: stor, väldig.” Pröva ett ord med ”inte”: ”Om dörren inte är öppen är den … stängd. Då är öppen och stängd motsatser.” Fråga: ”Är det ordet motsatsen, eller betyder det samma sak?”',
        watch: 'På bladet med tre ord vet en elev som ringar in ordet med samma betydelse att orden hör ihop, men inte hur. Fråga efter båda: ”Vilket betyder samma sak? Vilket är motsatsen?”',
      },
    },
    '1:synonyms': {
      title: 'Två ord som betyder samma sak',
      objective: 'Eleverna tittar på en bild och ringar in de två ord under den som betyder samma sak och passar till bilden.',
      note: {
        mistake: 'Eleverna ringar in två ord som båda passar till bilden utan att betyda samma sak (stor och grå om en elefant), eller ringar in ett ord och dess motsats, för motsatser hör också ihop.',
        words: 'Säg: ”Ord som betyder samma sak kan byta plats. Flickan är glad, flickan är lycklig: samma bild i huvudet.” Pröva ett par i en mening: ”Elefanten är stor. Elefanten är väldig. Samma? Elefanten är grå. Samma?” Säg ”ord som betyder samma sak” och lägg till ordet synonymer.',
        watch: 'Låt eleven säga båda de inringade orden i en mening om bilden. Ändras betydelsen från den ena meningen till den andra är orden inga synonymer; låt eleven behålla ett ord och pröva det mot de andra.',
      },
    },
    '2:synonyms': {
      title: 'Synonymer',
      objective: 'Eleverna väljer och parar ihop ord som betyder samma sak, som prata och tala.',
      note: {
        mistake: 'Eleverna väljer ett ord som ofta står ihop med det första (kall och is, stor och hus) och inte ett som kan ta dess plats. På bladet med par drar de streck mellan de lätta paren och kopplar sedan ihop resten utan att läsa orden.',
        words: 'Lär ut bytesprovet: ”Sätt det nya ordet i meningen där det gamla stod. Betyder meningen fortfarande samma sak?” Pröva: ”Jag är glad. Jag är lycklig. Samma. Jag är glad. Jag är ledsen. Inte samma.” Använd ordet synonym.',
        watch: 'Anteckna de ord som ingen kunde; dem behöver ni gå igenom först, för inget prov hittar en synonym till ett ord eleven aldrig har mött. Be en elev använda båda orden i ett par i samma mening.',
      },
    },
    '1:shades-of-meaning': {
      title: 'Ordens styrka: från lite till mycket',
      objective: 'Eleverna ordnar tre ord med nästan samma betydelse från det svagaste till det starkaste.',
      note: {
        mistake: 'Eleverna behandlar de tre orden som om de betydde precis samma sak och numrerar dem i den ordning de är tryckta. De kan det vanliga ordet (stor) och är osäkra på det starka (enorm).',
        words: 'Spela upp orden eller visa dem med händerna: ”Visa sval. Visa kall. Visa iskall.” Fråga: ”Vilket är mest? Vilket är bara lite?” Använd dem i en mening: ”Vattnet är svalt … kallt … iskallt!”',
        watch: 'Fråga vilket ord i en rad eleven inte kunde. Att ordna tre ord är lätt när orden är kända; lektionen handlar egentligen om att lära sig det starka ordet.',
      },
    },
    '2:compound-words': {
      title: 'Sammansatta ord',
      objective: 'Eleverna sätter ihop två ord till ett sammansatt ord och hittar var ett sammansatt ord delar sig i sina två ord.',
      note: {
        mistake: 'Eleverna delar ett ord där de ser ett litet ord inuti: ”sol-dat”. I ett riktigt sammansatt ord drar de strecket efter de första bokstäverna och inte där det andra ordet börjar. När de skriver sätter de isär orden: ”regn rock”.',
        words: 'Säg: ”Ett sammansatt ord är två hela ord som sitter ihop, och båda betyder fortfarande något: regn + rock, en rock för regn.” Pröva en delning: ”Är ’sol’ ett ord? Är ’dat’ ett ord? Nej. Då är soldat inget sammansatt ord.” Säg: ”På svenska skriver vi ihop: regnrock, ett ord.”',
        watch: 'Låt eleven säga båda halvorna och berätta vad hela ordet betyder med båda halvorna i förklaringen (”en borste för tänder”). En delning som lämnar en halva som inte är ett ord syns direkt. Titta efter mellanrum i det skrivna ordet; särskrivning börjar här.',
      },
    },
    '1:root-words': {
      title: 'Släktord: ord som är byggda av samma ord',
      objective: 'Eleverna benämner en bild och hittar det längre ord som är byggt av bildens ord, som fisk i fiskare.',
      note: {
        mistake: 'Eleverna ringar in ett ord som bara börjar på samma bokstäver som bildordet och inte har något med det att göra: ”bild” eller ”biljett” till bilden av en bil.',
        words: 'Säg: ”Släktord är byggda av samma ord, och betydelsen följer med. Fisk, fiska, fiskare: allt handlar om fisk.” Pröva: ”Har en biljett något med en bil att göra? Nej. Då är ’biljett’ inte byggt av ’bil’.”',
        watch: 'Fråga eleven vad det långa ordet betyder. Finns bildordet med i förklaringen (en fiskare fångar fisk) är valet rätt; annars stämmer bokstäverna av en slump.',
      },
    },
    '2:sentence-boundaries': {
      title: 'Stor bokstav och punkt',
      objective: 'Eleverna skriver om en mening med stor bokstav och skiljetecken och delar två meningar som har skrivits ihop.',
      note: {
        mistake: 'Eleverna sätter punkten och glömmer den stora bokstaven, eller tvärtom. När två meningar sitter ihop sätter de punkten där de skulle andas, och en av de två ”meningarna” saknar verb.',
        words: 'Säg: ”En mening börjar med stor bokstav och slutar med skiljetecken. Båda, varje gång.” Om meningar som sitter ihop: ”Läs högt. Var tar den första tanken slut? Vem handlar den andra meningen om?” Pröva varje del: ”Säger den vem eller vad, och vad som händer?”',
        watch: 'Låt eleven läsa var och en av de två nya meningarna för sig. Går en av dem inte att förstå ensam sitter punkten på fel ställe. Kontrollera att den andra meningen har fått sin egen stora bokstav.',
      },
    },
    '2:question-words': {
      title: 'Ställ en fråga',
      objective: 'Eleverna skriver en fråga som passar till ett givet svar och väljer bland vem, vad, var, när, varför och hur.',
      note: {
        mistake: 'Eleverna skriver ett påstående med frågetecken efter (”Hunden är på gården?”), eller börjar med rätt frågeord och behåller påståendets ordföljd (”Var hunden är?”).',
        words: 'Säg: ”De markerade orden är SVARET. Vilket frågeord frågar efter en plats? Efter en orsak? Efter ett sätt?” Bygg frågan högt: ”Hunden är på gården. Var … är hunden?” Peka på bytet: ”Efter frågeordet kommer verbet: ’är hunden’, inte ’hunden är’.”',
        watch: 'Läs en elevs fråga och svara själv med de markerade orden. Passar inte ditt svar till frågan är frågeordet fel. Kontrollera frågetecknet sist.',
      },
    },
    '2:read-and-answer': {
      title: 'Läs en berättelse och svara på frågor',
      objective: 'Eleverna läser en kort berättelse och svarar på frågor om vem, vad, var, när och varför med uppgifter ur texten.',
      note: {
        mistake: 'Eleverna svarar utifrån vad de vet om världen eller utifrån den första mening de minns, utan att gå tillbaka till berättelsen. Ett fel svar som innehåller ett ord ur berättelsen väljs för att ordet känns igen.',
        words: 'Säg: ”Svaret står i berättelsen. Gå tillbaka och leta upp meningen som säger det. Sätt fingret på den.” Fråga efter varje svar: ”Var står det?” Vid en varför-fråga: ”Leta efter ’för att’ eller efter det som hände precis innan.”',
        watch: 'Be en elev visa meningen som bevisar ett svar. Den som kan peka ut den läser noga; den som säger ”jag bara vet” gissar, också när svaret är rätt.',
      },
    },
    '2:cloze-context': {
      title: 'Fyll i orden som saknas i berättelsen',
      objective: 'Eleverna läser en hel kort berättelse och använder det som händer i den för att välja det ord som hör hemma i varje lucka.',
      note: {
        mistake: 'Eleverna fyller den första luckan efter att bara ha läst fram till den och väljer ett ord som passar i den meningen men inte i berättelsen. Ett ord som används fel i början lämnar fel ord kvar till sista luckan.',
        words: 'Säg: ”Läs HELA berättelsen först och säg ’hm’ vid varje tom ruta. Vad handlar berättelsen om?” Sedan: ”Pröva ett ord. Läs vidare till nästa mening. Går det fortfarande ihop?” Lägg till: ”Ibland kommer ledtråden efter luckan, så läs framåt också.”',
        watch: 'Se om eleven läser till slutet innan något skrivs. Låt den färdiga berättelsen läsas högt; ett ord i fel lucka ger en mening som låter konstig, och de flesta eleverna hör det.',
      },
    },
    '2:describe-a-picture': {
      title: 'Skriva till en bild',
      objective: 'Eleverna skriver meningar om en bild med hjälp av meningsstartare och en ordbank, och skriver sedan en egen kort text om en bild.',
      note: {
        mistake: 'Eleverna skriver en lista (”en hund, en boll, ett träd”) och inte meningar, eller börjar varje mening med ”Jag ser”. Ord skrivs av från ordbanken utan stor bokstav i början av meningen och utan punkt.',
        words: 'Be om en hel tanke: ”Vem eller vad finns på bilden? Vad gör den? Var?” Säg en mening tillsammans innan den skrivs: ”Hunden springer efter bollen.” Ge nya meningsstartare: ”Bredvid trädet …”, ”En flicka …”, ”På himlen …” Bladet kallar dem meningsstarter.',
        watch: 'Räkna hur många olika sätt att börja en mening eleven har på sitt blad. Låt eleven läsa sin text högt och peka på varje punkt; ett verb som saknas hörs när meningen läses.',
      },
    },
    '2:retell-with-starters': {
      title: 'Skriva till en bildserie: först, sedan, till sist',
      objective: 'Eleverna skriver vad som händer på varje bild i en berättelse, i ordning, och börjar med det tidsord som är givet.',
      note: {
        mistake: 'Eleverna beskriver varje bild för sig (”Det är en katt”) och berättar inte vad som HÄNDER eller hur en bild leder till nästa. Några skriver av startordet och börjar sedan en ny mening, så att startordet blir stående ensamt.',
        words: 'Berätta hela berättelsen högt innan någon skriver: ”Först … Sedan … Efter det … Till sist …” Fråga vid varje bild: ”Vad hände här? Varför? Vad har ändrats sedan förra bilden?” Visa hur startordet hör till meningen och att verbet kommer direkt efter: ”Först klättrar katten upp i trädet.”',
        watch: 'Låt eleven läsa de fyra delarna som en berättelse. Den ska gå att förstå för någon som inte ser bilderna; gör den inte det frågar du vad lyssnaren skulle behöva veta. Titta på ordföljden efter startordet: ”Först katten klättrar” är vanligt hos elever med ett annat modersmål.',
      },
    },
    '2:animal-fact-file': {
      title: 'Ett faktablad om ett djur',
      objective: 'Eleverna väljer fakta som stämmer om ett djur, som vad det äter, var det bor och hur det rör sig, och skriver dem i ett faktablad.',
      note: {
        mistake: 'Eleverna ringar in det de känner till från sagor och tecknat och inte det som är sant: honung till björnen, ost till musen. När de skriver av från ordbanken hamnar en uppgift på fel rad: vad djuret äter skrivs under var det bor.',
        words: 'Säg: ”Fakta är sådant som är sant och som vi kan kontrollera i en bok eller genom att titta.” Läs radernas rubriker först: ”Vad frågar den här raden efter? Mat, bostad eller hur djuret rör sig?” Fråga: ”Hur vet du det? Var kan vi kontrollera?”',
        watch: 'Be en elev läsa en rubrik och sedan uppgiften bredvid; en uppgift på fel rad låter fel direkt. Ha några djurböcker framme och låt eleverna kontrollera en uppgift var. Lektionen är en första faktatext och passar på vårterminen.',
      },
    },
    'K:articles': {
      title: 'En eller ett?',
      objective: 'Eleverna säger ett bildord högt och väljer en eller ett framför det.',
      note: {
        mistake: 'Elever med svenska som modersmål ringar in rätt utan att tänka och förstår inte vad uppgiften går ut på. Elever som lär sig svenska gissar, för det finns ingen regel att gå efter.',
        words: 'Säg båda och låt eleverna höra: ”En äpple … ett äpple. Vilket säger vi?” Säg: ”Örat bestämmer. Det finns en-ord och ett-ord, och varje ord måste man lära sig.” Låt eleverna säga hela paret: ”en bil, ett hus”.',
        watch: 'Se till att eleverna säger orden högt; bladet går inte att göra tyst. Använd bladet som ingång till ordklassen substantiv: det går att sätta en eller ett framför. För elever med ett annat modersmål är en och ett nya och behöver mycket muntlig övning.',
      },
    },
    '1:articles': {
      title: 'Sortera en-ord och ett-ord',
      objective: 'Eleverna läser ett ord, avgör om det heter en eller ett och skriver det i rätt grupp.',
      note: {
        mistake: 'Eleverna lägger varje ord under ”en”, för de flesta ord är en-ord, eller slutar läsa och fyller de två grupperna jämnt.',
        words: 'Säg: ”Läs ordet. Säg det med en och med ett framför. Vilket låter rätt?” Kontrollera med örat: ”En bord … ett bord.” Låt eleverna läsa varje färdig grupp högt: ”ett äpple, ett hus, ett bord”. Säg: ”Alla de här orden är substantiv. Ett substantiv kan ha en eller ett framför sig.”',
        watch: 'Lyssna när eleven läser de färdiga listorna med en eller ett framför. Ett fel ord hörs direkt när det sägs högt; låt eleven hitta det med örat.',
      },
    },
    'K:singular-plural': {
      title: 'En och flera',
      objective: 'Eleverna skiljer ordet för en från ordet för flera och skriver ordet för flera.',
      note: {
        mistake: 'Eleverna säger rätt form när de talar och tappar ändelsen när de skriver. De har inte lagt märke till att det är ordets slut som berättar att det är fler än en.',
        words: 'Säg: ”En katt. Två katter. Vad lade jag till? Lyssna på slutet.” Låt eleverna säga båda och hålla ut slutet. Visa att slutet inte alltid är detsamma: ”en bil, två bilar; en flicka, två flickor; ett äpple, två äpplen”. Fråga: ”Är det en eller flera? Har ditt ord sitt slut?”',
        watch: 'Läs elevens skrivna ord för flera och kontrollera slutet. Bladet säger singular och plural; med eleverna räcker ”en” och ”flera”, och termerna kan du lägga till när ni talar om substantiv.',
      },
    },
    '2:plural-nouns': {
      title: 'Fler än en: substantiv i plural',
      objective: 'Eleverna skriver substantiv i plural, med ändelserna -or, -ar, -er och -n och utan ändelse, och de ord som byter vokal.',
      note: {
        mistake: 'Eleverna tar samma ändelse till allt: ”bokar”, ”husar”, ”äpplar”. Ord som byter vokal får en vanlig ändelse: ”fotar” för fötter, ”musar” för möss.',
        words: 'Säg pluralformen högt först: ”En bok, två böcker. Hör du att vokalen byts?” Sortera efter slut: ”flickor, bilar, katter, äpplen, hus”. Om ett-ord som slutar på konsonant: ”Ett hus, två hus. Ordet ändras inte.” Om dem som byter vokal: ”Dem måste man kunna: en fot, två fötter; en hand, två händer; en mus, två möss.”',
        watch: 'Sortera en elevs fel: fel ändelse (”bokar”) hörs oftast när eleven läser ordet högt och rättas med örat; elever med ett annat modersmål har inte det örat än och behöver lära sig orden ett och ett.',
      },
    },
    '1:word-classes': {
      title: 'Substantiv, verb och adjektiv',
      objective: 'Eleverna sorterar ord som substantiv eller verb, och som substantiv eller adjektiv.',
      note: {
        mistake: 'Eleverna sorterar efter vad ordet får dem att tänka på: ”fest” och ”lek” hamnar bland verben för att man gör något där, och ”hungrig” eller ”snabb” bland verben för att det är något som händer. Ord som hör ihop (en lek, att leka) förvirrar dem, och det med rätta.',
        words: 'Ge varje ordklass ett prov: ”Ett substantiv är ett namn på en person, ett djur, en sak eller en plats. Pröva: kan du sätta en eller ett framför? En hund. Ett verb är något man gör. Pröva: ’Jag kan …’ Jag kan hoppa. Ett adjektiv berättar hur något är. Pröva: ’Hunden är …’ Hunden är glad.”',
        watch: 'Låt eleverna använda provet högt på de svåra orden. Ser en elev att ”lek” och ”leka” hör ihop har eleven rätt; be om en mening med varje. Ordklasserna är nya i åk 2: ta substantiv och verb först och adjektiven en annan dag.',
      },
    },
  },
};
