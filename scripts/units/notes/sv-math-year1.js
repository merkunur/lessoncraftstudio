'use strict';
/**
 * Lärarkommentarer, svenska, matematik: de första lektionerna i det planerade läsåret (Daily Teaching System,
 * Part 12.2). En post per lektion: ett nytt lärandesteg eller ÄNNU en lektion till ett steg som redan har en
 * ("<point>#<name>"). Skrivna utifrån det publicerade arbetsblad som lektionen delar ut (på den nivå lektionen anger),
 * för undervisning i Sverige enligt Lgr22. Ingen översättning av de engelska kommentarerna.
 */
module.exports = {
  loc: 'sv',
  points: {
    '1:bar-graphs#klassens-diagram': {
      title: 'Klassens diagram: läs av staplarna',
      objective: 'Eleverna bygger ett stapeldiagram med klossar utifrån en fråga till klassen och läser sedan av ett stapeldiagram: de skriver talet för varje stapel och säger vilken stapel som är högst, alltså vilken sort som har flest.',
      note: {
        mistake: 'Eleverna räknar strecken på axeln från nollan och får ett för mycket, eller läser av talet vid stapelns mitt i stället för vid dess topp. Några räknar staplarna i stället för att läsa av hur hög varje stapel är.',
        words: 'Fråga: ”Hur hög är den här stapeln? Följ med fingret från stapelns topp till talen i kanten.” Säg: ”Varje kloss är ett svar. En högre stapel betyder fler.” Fråga: ”Vilken har flest? Vilken har färst?”',
        watch: 'Se vilka som följer med fingret från stapelns topp till talet och vilka som gissar. Låt den som gissar bygga stapeln med klossar bredvid och räkna dem.',
      },
    },
    'K:number-bonds-k#dela-upp-6-till-10': {
      title: 'Dela upp talen upp till 10',
      objective: 'Eleverna delar upp ett tal upp till 10 i två delar och skriver den del som saknas i den streckade cirkeln.',
      note: {
        mistake: 'Eleverna skriver det hela talet en gång till i den tomma cirkeln, eller lägger ihop det hela talet och delen de ser. Många tror att ett tal bara kan delas upp på ett sätt.',
        words: 'Låt eleverna arbeta två och två med 7 knappar och en mugg. Den ena gömmer några under muggen. Fråga den andra: ”Hur många ser du? Hur många gömmer sig?” Säg: ”7 är 5 och 2. 7 är också 4 och 3.” Fråga: ”Finns det fler sätt?”',
        watch: 'Se vilka som räknar upp från delen de ser och vilka som fortfarande behöver lägga hela talet med knappar. Båda sätten duger nu; anteckna vilka som inte vet hur de ska börja.',
      },
    },
    'K:count-how-many#talen-till-10-i-tiorutan': {
      title: 'Talen upp till 10 i tiorutan',
      objective: 'Eleverna räknar bilderna i en tioruta, skriver talet och säger hur många rutor som är tomma, alltså hur många som fattas till 10.',
      note: {
        mistake: 'Eleverna räknar varje bild från 1 även när den övre raden är full. Några räknar med de tomma rutorna eller hoppar mellan raderna och räknar fel.',
        words: 'Fråga: ”Är den övre raden full? Hur många är det då, utan att räkna?” Säg: ”Fem och två till, det är sju.” Fråga sedan: ”Hur många rutor är tomma? Hur många fattas till tio?”',
        watch: 'Se vilka som säger talet utan att räkna den övre raden. De använder femman. Den som börjar om på 1 varje gång lägger talen en gång till med brickor i en tioruta.',
      },
    },
    'K:before-after-back#talraden-till-10': {
      title: 'Talraden till 10: före, efter och bakåt',
      objective: 'Eleverna skriver talet före och talet efter ett tal i talraden upp till 10 och räknar bakåt från 10.',
      note: {
        mistake: 'Eleverna blandar ihop ”före” och ”efter” eller skriver talet efter två gånger. När de räknar bakåt fastnar många mellan 7 och 5 och räknar tyst uppåt från 1 för att hitta talet.',
        words: 'Säg: ”Talet före står precis till vänster på tallinjen, talet efter precis till höger.” Fråga: ”Var står 7? Vilket tal är granne till vänster? Vilket är granne till höger?” Räkna bakåt tillsammans som vid en raketstart: 3, 2, 1, 0. På bladet slutar raden vid 1.',
        watch: 'Se vilka som säger talet före direkt och vilka som räknar upp från 1. På bladet finns också talet 1: talet före är 0. Visa nollan på tallinjen innan eleverna börjar.',
      },
    },
    '1:compare-order-two-digit#storre-mindre-lika': {
      title: 'Större än, mindre än och lika med',
      objective: 'Eleverna jämför två grupper med upp till 10 bilder och ringar in rätt tecken: större än, mindre än eller lika med.',
      note: {
        mistake: 'Eleverna blandar ihop < och > eller väljer tecken efter den sida där bilderna tar mest plats. När grupperna är lika stora letar de ändå efter en som är större.',
        words: 'Säg: ”Tecknet gapar mot det större talet.” Låt eleverna läsa varje uppgift som en mening: ”Åtta är större än fyra.” Fråga: ”Hur kan du kontrollera?” och låt dem dra streck mellan en bild till vänster och en bild till höger.',
        watch: 'Be eleven läsa upp det inringade tecknet. En elev som ringar in rätt men läser ”fyra är större än åtta” känner igen tecknet som bild men ännu inte som mening.',
      },
    },
    'K:number-bonds-k#talhus': {
      title: 'Talhus: dela upp talen till 10',
      objective: 'Eleverna fyller i ett talhus: taket visar talet, och på varje våning skriver de den del som saknas så att de två delarna tillsammans blir talet på taket.',
      note: {
        mistake: 'Eleverna räknar ut varje våning för sig med fingrarna och ser inte mönstret: när den ena delen ökar med ett minskar den andra med ett. Några skriver talet på taket på varje våning.',
        words: 'Fråga: ”Vilket tal står på taket? Vilka två tal bor på den här våningen?” Säg: ”8 är 1 och 7. 8 är 2 och 6.” Fråga: ”Vad händer med den andra delen när den första blir ett större?”',
        watch: 'Se vilka som upptäcker mönstret efter två eller tre våningar och fyller i resten utan att räkna. Den som räknar varje våning från början lägger talet med brickor i två färger och flyttar en bricka i taget.',
      },
    },
    '1:near-doubles': {
      title: 'Dubblor och nästan dubblor',
      objective: 'Eleverna räknar ut nästan dubblor som 6 + 7 med hjälp av en dubbel: de skriver 6 + 6 + 1 och sedan summan, i talområdet 0–20.',
      note: {
        mistake: 'Eleverna ser inte dubbeln i uppgiften och räknar vidare ett steg i taget. Andra dubblar det större talet och lägger ändå till ett, så att 6 + 7 blir 15.',
        words: 'Repetera först dubblorna upp till 9 + 9. Fråga: ”Vilken dubbel gömmer sig i 6 + 7? Vilket av talen är minst? Det är det talet vi dubblar.” Säg: ”6 + 6 är 12, och ett till är 13.” Låt eleverna säga vilken dubbel som hjälper innan de skriver.',
        watch: 'Se vilka som skriver summan först och fyller i rutorna däremellan efteråt. Den eleven kan kanske uppgiften utantill men ska ändå kunna säga vilken dubbel som hjälper.',
      },
    },
    '1:fluency-within-20#tiotalsovergang-addition': {
      title: 'Tiotalsövergång i addition: först till tian',
      objective: 'Eleverna adderar över tio på tallinjen i två steg, först till 10 och sedan resten, och skriver hur de räknar: 8 + 5 = 8 + 2 + 3 = 13.',
      note: {
        mistake: 'Eleverna räknar vidare ett steg i taget och stannar inte vid 10. Andra delar upp det andra talet så att det första hoppet inte landar på 10, till exempel 8 + 5 = 8 + 3 + 2.',
        words: 'Fråga: ”Hur mycket fattas från 8 till 10? Vad blir kvar av 5?” Säg: ”Först till tian, sedan resten.” Visa på kulramen: fyll den övre raden först och skjut sedan resten på den undre raden.',
        watch: 'Titta på det första hoppet: det ska landa på 10. Fråga den som gör ett enda långt hopp förbi tian: ”Hur långt är det till 10?” Den som inte vet det behöver träna tiokamraterna igen.',
      },
    },
    '1:fact-families#talfamiljer-till-20': {
      title: 'Talfamiljer till 20',
      objective: 'Eleverna använder de tre talen på taket och räknar ut de fyra uppgifter som hör ihop i en talfamilj, till exempel 13 + 7, 7 + 13, 20 − 13 och 20 − 7.',
      note: {
        mistake: 'Eleverna räknar ut varje uppgift för sig med fingrarna och använder inte de tre talen på taket. I subtraktionerna fortsätter några att addera, så att 9 − 3 blir 12.',
        words: 'Säg: ”De tre talen på taket är en familj. Det största talet är det hela, de två andra är delarna.” Fråga: ”Om 13 + 7 är 20, vad är då 20 − 7? Behöver du räkna?” Låt eleverna peka på talen på taket när de svarar.',
        watch: 'Se vilka som skriver svaren i subtraktionerna direkt från taket. Den som räknar baklänges med fingrarna har ännu inte sett att addition och subtraktion hör ihop.',
      },
    },
    '1:true-false-equations': {
      title: 'Likhetstecknet: sant eller falskt?',
      objective: 'Eleverna avgör om en likhet i talområdet 0–20 är sann eller falsk, också när det ensamma talet står först, som i 16 = 13 + 3.',
      note: {
        mistake: 'Eleverna läser likhetstecknet som ”nu kommer svaret” och säger att 16 = 13 + 3 är falskt eftersom det står bakvänt. Andra säger sant så fort de känner igen talen från en uppgift de kan.',
        words: 'Läs likhetstecknet som ”är lika mycket som”: ”16 är lika mycket som 13 plus 3. Stämmer det?” Fråga: ”Vad står på den här sidan? Vad står på den andra? Är det lika mycket?” Låt eleverna rätta en falsk likhet högt.',
        watch: 'Titta på likheterna där det ensamma talet står först. En elev som klarar den vanliga formen men missar dem behöver inte fler uppgifter utan talvågen, där båda sidor ska väga lika.',
      },
    },
    '1:map-key': {
      title: 'Stegvisa instruktioner: följ och beskriv vägen',
      objective: 'Eleverna följer stegvisa instruktioner i ett rutnät, till exempel ”gå 2 rutor nedåt, gå 1 ruta åt vänster”, och beskriver en ritad väg med riktning och antal rutor.',
      note: {
        mistake: 'Eleverna räknar med rutan de står på och hamnar en ruta för kort. Höger och vänster blandas ihop, särskilt när vägen först har gått nedåt.',
        words: 'Säg: ”Startrutan räknas inte. Första steget är nästa ruta.” Låt eleverna gå vägen med fingret och säga stegen högt: ”två nedåt, ett åt vänster”. På bladet ”Beskriv vägen”: visa var vägen börjar; pilspetsen visar målet. Fråga: ”Var är du nu? Vart pekar nästa pil?”',
        watch: 'Titta på det första steget i varje instruktion. Den som alltid hamnar en ruta för kort räknar med startrutan; gå då vägen en gång med en spelpjäs på rutnätet.',
      },
    },
    '1:days-months-seasons~season-wheel': {
      title: 'Månader och årstider',
      objective: 'Eleverna placerar årets tolv månader i rätt årstid och färglägger cirkeln bredvid varje månad i årstidens färg.',
      note: {
        mistake: 'Eleverna väljer årstid efter egna minnen (”i mars låg det snö”). Många ser inte december, januari och februari som en sammanhängande årstid, eftersom det nya året börjar mitt i den.',
        words: 'Säg: ”På bladet hör varje månad till en årstid, och varje årstid har tre månader. Vintern går över nyåret: december, januari, februari.” Fråga: ”I vilken månad fyller du år? Vilken årstid är det då?” Visa månaderna i samlingskalendern.',
        watch: 'Titta på december och på mars, juni och september, där en ny årstid börjar. Den som är osäker där säger månaderna i ordning en gång till och pekar samtidigt i kalendern.',
      },
    },
    '3:times-tables#tians-tabell': {
      title: '10:ans tabell',
      objective: 'Eleverna räknar ut uppgifterna i 10:ans tabell upp till 10 · 10 och skriver produkterna.',
      note: {
        mistake: 'Eleverna ”lägger till en nolla” utan att veta varför: de kan inte säga att 6 · 10 är sex tiotal och använder sedan knepet där det inte stämmer. Andra räknar upp hela tabellen från början för varje uppgift.',
        words: 'Fråga: ”Hur många tiotal är 6 · 10? Vad heter talet med 6 tiotal?” Säg: ”5 · 10 är 50. Då är 6 · 10 ett tiotal mer.” Jämför med 5:ans tabell: ”4 · 5 är hälften av 4 · 10.”',
        watch: 'På bladet står tabellen i ordning, så många skriver bara 10 mer än i rutan före. Fråga därför några uppgifter i blandad ordning: ”Vad är 7 · 10? Vad är 4 · 10?” Se vilka som hittar 6 · 10 från 5 · 10 och vilka som räknar tiotal från början. Båda sätten ger rätt svar; det första är det som eleverna behöver i de andra tabellerna.',
      },
    },
    '1:doubles-halves#dubbelt-och-halften-upp-till-100': {
      title: 'Dubbelt och hälften upp till 100',
      objective: 'Eleverna dubblar tal upp till 50 och halverar jämna tal upp till 100 i två maskiner, också baklänges när talet som går in saknas.',
      note: {
        mistake: 'Eleverna dubblar bara tiotalen, så att dubbelt av 28 blir 48, eller skriver de två dubblorna bredvid varandra utan att växla, så att det blir 416. Vid hälften fastnar många när tiotalssiffran är udda, som i 58 och 96. När talet som går in saknas dubblar eller halverar de en gång till i stället för att tänka baklänges.',
        words: 'Säg: ”Dela upp talet i tiotal och ental. Dubbelt av 28: dubbelt av 20 är 40, dubbelt av 8 är 16, tillsammans 56.” Och: ”Hälften av 58: hälften av 50 är 25, hälften av 8 är 4, tillsammans 29.” När talet som går in saknas: ”Maskinen dubblade och det blev 42. Vilket tal gick in? Tänk baklänges: hälften av 42.”',
        watch: 'Se vilka som delar upp talet i tiotal och ental och vilka som räknar ett steg i taget. Titta särskilt på uppgifterna där talet som går in saknas: där syns om eleven vet att hälften är dubbelt baklänges.',
      },
    },
    '2:flat-or-solid': {
      title: 'Plan figur eller kropp?',
      objective: 'Eleverna skiljer plana figurer från kroppar och drar ett streck från varje figur till rätt låda: plana figurer till vänster, kroppar till höger.',
      note: {
        mistake: 'Eleverna kallar klotet ”cirkel” och kuben ”kvadrat”: kroppen får namnet på den platta form de ser i den. På papper är allt ritat platt, och därför sorteras bilden av en kub som platt.',
        words: 'Håll upp en papperskvadrat och en kub. Fråga: ”Ligger den helt platt på bordet? Eller kan jag hålla den i handen och känna runt om?” Säg: ”En plan figur är platt. En kropp tar plats. Varje sidoyta på kuben är en kvadrat.”',
        watch: 'Lyssna efter elever som säger ”cirkel” om ett klot. Ta med riktiga föremål; för elever som inte har hållit kropparna i handen är teckningar av kroppar svåra att läsa.',
      },
    },
    '3:column-regrouping#subtraktion-over-noll': {
      title: 'Uppställning: subtraktion med växling över noll',
      objective: 'Eleverna subtraherar tresiffriga tal med uppställning när tiotalssiffran i det övre talet är 0. De växlar ett hundratal till tio tiotal och, när entalen inte räcker, också ett tiotal till tio ental.',
      note: {
        mistake: 'Eleverna tar det mindre talet från det större i varje kolumn, så att 402 − 158 blir 356. Andra stryker hundratalet och skriver 10 ovanför både tiotalen och entalen, som om ett hundratal gav tio tiotal och tio ental på en gång.',
        words: 'Fråga först: ”Räcker entalen, eller måste vi växla?” Fråga sedan: ”Var kan du hämta fler? Finns det några tiotal att växla?” Säg: ”Växla ett hundratal till tio tiotal. Växla sedan ett tiotal till tio ental. Nu är 806 lika med 7 hundratal, 9 tiotal och 16 ental.”',
        watch: 'Titta på vad eleven skriver ovanför tiotalen. När också entalen behöver växlas, som i 806 − 178, ska det till slut stå 9 där. När entalen räcker, som i 806 − 235, ska det stå 10. Låt eleven kontrollera ett svar med addition: svaret plus talet som togs bort ska bli talet högst upp.',
      },
    },
  },
};
