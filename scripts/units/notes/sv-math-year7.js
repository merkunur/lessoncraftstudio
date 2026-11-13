'use strict';
/**
 * Lärarkommentarer, svenska, matematik: lektionerna i det planerade läsåret som "Year pages M" gjorde möjliga
 * (Daily Teaching System, Part 12.2): två nya enheter. Förskoleklass: Lägga till, ta bort och lösa problem (fyra
 * lektioner; tre av dem på bladet Räknehändelser: rita och lös, en nivå per slags händelse). Åk 2: Rutnät,
 * programmering och skala (tre nya lektioner; Hitta rutan i rutnätet flyttas dit från Geometri).
 * Skrivna utifrån lektionernas arbetsblad och lästa av en svensk lärare (förskoleklass och lågstadium) med bladen
 * (2026-11-13).
 * `node scripts/units/notes/apply.js` merges every file of this folder into frontend/content/units/points/<loc>.json.
 */
const NO_OTHER_PAGE = ' Det finns inget lättare eller svårare blad till den här lektionen. Ett barn som behöver stöd löser händelsen med plockmaterial och ritar av det som ligger på bordet. Ett barn som är klart hittar på en egen räknehändelse och berättar den för en kamrat.';
module.exports = {
  loc: 'sv',
  points: {
    // ── förskoleklass: Lägga till, ta bort och lösa problem ──
    '1:word-problems#nagra-kommer-till': {
      title: 'Några kommer till: först, sedan, nu',
      objective: 'Barnen spelar upp räknehändelser där några kommer till eller två högar läggs ihop, ritar händelsen och berättar hur många det är nu, med högst 6 föremål.',
      note: {
        mistake: 'Barnen ritar bara dem som fanns först och glömmer dem som kommer till, eller skriver ett av talen ur berättelsen som svar. Några räknar om från början varje gång och tappar bort sig när föremålen inte ligger på rad.',
        words: 'Spela upp händelsen med riktiga föremål innan bladet delas ut: ”Först ligger det 1 äpple på bordet. Sedan kommer 4 äpplen till. Hur många äpplen ligger där nu?” Låt ett barn lägga fram äpplena medan du berättar. Läs sedan bladets första räknehändelse högt, två gånger, och säg: ”Rita dem som fanns först. Rita dem som kom till. Räkna alla och skriv siffran i den lilla rutan.” Ibland handlar händelsen om två barn som har var sin hög. Säg då: ”Rita det första barnets saker. Rita det andra barnets saker. Räkna alla.”',
        watch: 'Se om barnet ritar båda grupperna och räknar alla. Ringar eller streck duger som teckning: det är antalet som räknas, inte hur äpplena ser ut. Ordet ”sammanlagt” är nytt för många sexåringar. Säg första gången: ”Sammanlagt betyder alla tillsammans.” Bladet har två räknehändelser och inget plustecken; klipp isär dem om du vill ta en om dagen. På Fickbrädet kan klassen först fundera över vad man kan fråga, innan något tal har sagts.' + NO_OTHER_PAGE,
      },
    },
    '1:word-problems#nagra-gar-ivag': {
      title: 'Några går iväg: hur många är kvar?',
      objective: 'Barnen spelar upp räknehändelser där några föremål tas bort, ritar händelsen och berättar hur många som är kvar, med högst 10 föremål från början.',
      note: {
        mistake: 'Barnen ritar både dem som fanns från början och dem som försvinner som två grupper och räknar ihop allt, så att 7 kakor där 3 äts upp blir 10. Andra ritar rätt men räknar också de överstrukna.',
        words: 'Spela upp med föremål och en duk: ”Det ligger 6 klossar på bordet. Jag gömmer 2 under duken. Hur många kan du se nu?” Läs sedan bladets första räknehändelse högt och säg: ”Rita alla som fanns från början. Stryk över dem som går iväg. Räkna dem som är kvar.” Fråga: ”Blir det fler eller färre än från början?”',
        watch: 'Titta på teckningen: finns alla från början med, och är rätt antal överstrukna? Ett barn som svarar med ett större tal än det första har lagt ihop i stället för att ta bort; spela upp händelsen en gång till med föremål. Talen går upp till 10, så teckningen tar plats: visa att små ringar räcker.' + NO_OTHER_PAGE,
      },
    },
    '2:share-and-group#en-till-dig-en-till-mig': {
      title: 'Dela lika: en till dig, en till mig',
      objective: 'Barnen delar ut 4 till 12 föremål lika i två eller tre lådor, ett i taget, och berättar hur många var och en fick.',
      note: {
        mistake: 'Barnen delar ut några åt gången och får olika många i lådorna, eller slutar när lådorna ”ser fulla ut” fast det finns kvar i högen. På bladet räknar några hela högen och skriver det talet i rutan.',
        words: 'Dela först ut riktiga föremål på riktiga tallrikar och säg ramsan: ”En till dig, en till mig, en till dig, en till mig.” Med tre tallrikar blir ramsan: ”En till dig, en till dig, en till dig.” Fråga när högen är slut: ”Fick alla lika många? Hur vet du det?” På bladet: ”Stryk över en bild i högen och rita en prick i en låda. Fortsätt varvet runt, en i taget, tills högen är slut. Räkna prickarna i en låda och skriv talet.”',
        watch: 'Se att barnet delar ut ett föremål i taget och går varvet runt. Den lilla lådan bredvid svarsrutan betyder ”så här många i en låda”; peka på den. Det lättare bladet har bara två lådor. När barnen har delat med händerna: dra två lock över brickorna i Locken. Varje lock gömmer lika många. Låt klassen enas om hur många som ligger under varje lock, och lyft sedan locken.',
      },
    },
    '1:word-problems#los-problemet-rita': {
      title: 'Lös problemet: lägg, rita och berätta',
      objective: 'Barnen löser räknehändelser i talområdet 1–10 där några kommer till eller går iväg, med plockmaterial och teckning, och förklarar för en kamrat hur de tänkte.',
      note: {
        mistake: 'När händelserna är blandade gör barnen samma sak som i förra uppgiften: de lägger till fast några går iväg. Andra kan lösa uppgiften med klossar men inte berätta hur de gjorde, och svarar bara med talet.',
        words: 'Läs räknehändelsen högt och fråga innan någon räknar: ”Vad händer? Kommer det fler, eller går några iväg?” Säg: ”Lägg först med klossar. Rita sedan det du lade. Skriv svaret.” Låt barnen berätta för en kamrat: ”Först var det … Sedan … Nu är det …”',
        watch: 'Lyssna på berättandet: använder barnet orden först, sedan och nu, och stämmer teckningen med det som sades? Bladet har en händelse där det blir fler och en där några går iväg. Ordet ”sammanlagt” kan behöva förklaras: ”alla tillsammans”. Övningen på skärmen ger fler räknehändelser i samma talområde. Kör den på storskärmen och läs raderna högt, eller tryck på ”Läs upp berättelsen”: barnen ska spela upp händelsen, inte läsa den själva. Övningen säger ”minus” när den sammanfattar; säg ”ta bort” bredvid.' + NO_OTHER_PAGE,
      },
    },
    // ── åk 2: Rutnät, programmering och skala ──
    '1:map-key#programmera-med-pilar': {
      title: 'Programmera med pilar i rutnät',
      objective: 'Eleverna följer ett program med pilar och antal rutor i ett rutnät, förutsäger var figuren hamnar och skriver själva programmet för en ritad väg.',
      note: {
        mistake: 'Eleverna räknar rutan de står på som första steget och hamnar en ruta för kort. När de skriver ett program för en ritad väg börjar några vid fel bild och får alla pilar bakvända, eller skriver hela vägen som ett enda steg fast den svänger.',
        words: 'Lägg tre kort på Skalbaggens räls och fråga innan du kör: ”Var stannar skalbaggen? Peka.” Kör sedan programmet. Säg vid bladet: ”Ett program är steg i en bestämd ordning. Sätt fingret på flaggan. Läs första steget, till exempel: 2 rutor nedåt. Räkna hoppen, inte rutan du står på.” När eleverna beskriver en väg: ”Varje gång vägen svänger börjar ett nytt steg.” Visa var vägen börjar: vid bilden utan pilspets. Pilspetsen pekar på målet.',
        watch: 'Låt eleverna peka ut var de tror att figuren hamnar innan de följer stegen. På bladet Beskriv vägen ringar eleven in riktningen och skriver antalet rutor för varje rak del av vägen. En väg som svänger två gånger har tre delar, alltså tre steg. Eleverna känner igen bladen från åk 1. Det nya är att de först förutsäger var de hamnar och sedan skriver ett eget program: låt varje elev rita en egen väg på baksidan och skriva programmet med pilar och antal rutor åt en kamrat. Det lättare bladet har ett mindre rutnät och två steg. Det svårare bladet har inga pilar: där står stegen som väderstreck (norrut, söderut, västerut, österut) och eleven läser av en kompassros. På rälsen betyder korten framåt, bakåt och sväng; säg det, annars blandar eleverna ihop de två sätten.',
      },
    },
    '1:map-key#hitta-felet-i-programmet': {
      title: 'Hitta felet i programmet',
      objective: 'Eleverna testar ett program med pilar i ett rutnät, hittar den pil som är fel och rättar programmet så att vägen slutar på stjärnan.',
      note: {
        mistake: 'Eleverna ser att vägen inte når stjärnan och byter den sista pilen utan att följa programmet steg för steg. Andra ritar den väg de själva vill gå i stället för den väg som pilarna ger, och hittar då inget fel.',
        words: 'Säg: ”Programmet har ett fel. Vi ska felsöka det. En dator gör precis det som står, också när det är fel. Följ pilarna med pennan från flaggan, en ruta för varje pil.” Fråga när vägen är ritad: ”Var hamnade du? Vilken pil skickar dig åt fel håll?” Visa felsökning på Skalbaggens räls: byt ett kort mitt i programmet och kör igen, så syns den gamla vägen kvar som en skugga. Påminn om att skalbaggens kort är framåt, bakåt och sväng.',
        watch: 'Kontrollera att eleven ritar vägen i rutnätet innan något ringas in. Varje uppgift har bara en lösning: byter eleven rätt pil till rätt håll slutar vägen på stjärnan. Be eleven pröva sin lösning genom att följa det rättade programmet en gång till. Det lättare bladet har fyra pilar i ett mindre rutnät, det svårare sju pilar.',
      },
    },
    'K:grid-copy#forstora-i-rutnat': {
      title: 'Förstora i rutnät: dubbelt så stort',
      objective: 'Eleverna ritar av en bild ruta för ruta och förstorar sedan en bild så att varje ruta blir två rutor bred och två rutor hög, och jämför den nya bilden med den första.',
      note: {
        mistake: 'Eleverna gör bilden dubbelt så bred men inte dubbelt så hög, så att den blir utdragen. Andra färglägger två rutor för varje ruta i stället för fyra, eller tappar bort var i bilden de är.',
        words: 'Börja med bladet där bilden ritas av lika stor. De två rutnäten på bladet är lika stora, trots rubriken: ”Hitta rutan med bokstaven och siffran och färglägg samma ruta.” Sedan förstoringen: ”Nu ska bilden bli dubbelt så stor åt båda hållen. En ruta i den lilla bilden blir två rutor bred och två rutor hög: fyra rutor.” Fråga: ”Hur många rutor bred är den lilla bilden? Hur bred blir den stora då?”',
        watch: 'Se efter om bilden har blivit dubbelt så stor åt båda hållen. Låt eleven arbeta en rad i taget och pricka av raden i den lilla bilden. Det lättare bladet har ett rutnät med lika många rutor som är dubbelt så stora, så där färglägger eleven samma rutor. Jämför till sist: bilden har samma form, men varje sida är dubbelt så lång. Det kallas att förstora i skala 2:1. Vänd på det: den lilla bilden är en förminskning av den stora, hälften så bred och hälften så hög.',
      },
    },
  },
};
