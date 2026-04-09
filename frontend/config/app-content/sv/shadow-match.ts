import type { AppContent } from '../types';

const content: AppContent = {
  seo: {
    primaryKeyword: 'skugglek uppgift skriva ut',
    secondaryKeywords: [
      'skuggor och figurer uppgift',
      'siluetter matcha',
      'skugg-parning uppgift',
      'skugglek förskoleklass',
    ],
    lsiKeywords: [
      'skugga',
      'siluett',
      'matcha',
      'förskoleklass',
      'visuell perception',
    ],
    titleTag: 'Skugglek uppgift att skriva ut | Generator siluettmatchning',
    metaDescription: 'Skapa skugglek-uppgifter med bilder och siluetter. Automatiskt facit, 300 DPI PDF. Prova gratis.',
  },

  hero: {
    title: 'Skugglek uppgift att skriva ut — Generator siluettmatchning',
    tagline: 'Skapa skugglek-uppgifter med bilder och siluetter för förskoleklass — prova gratis med vattenmärke.',
    description:
      'Skapa skuggkopplingsblad att sälja på Etsy eller sammanställa i visuell perception-arbetsböcker för Amazon KDP. Skuggmatchning-läget matchar färgade bilder med automatiskt genererade svarta siluetter. Gör Den Hel-läget delar bilder i halvor som köparna kopplar ihop. Båda lägena använder Fisher-Yates-derangering som garanterar genuina matchningsutmaningar. Automatiskt facit ingår. Arbetsbladen är rent visuella — samma produkt säljs globalt utan översättning. Välj bland mer än 3 100 illustrationer i 104 teman. Skuggmatchning är ett populärt format som förskollärare och föräldrar aktivt söker efter. Den svenska marknaden har minimal konkurrens för detta produktformat. Kommersiell licens ingår. Gratis provversion med alla funktioner — nedladdningar innehåller en vattenstämpel; köp en licens för att ta bort den.',
  },

  howItWorks: {
    title: 'Hur du Skapar Skuggmatchnings Arbetsblad i 5 Steg',
    steps: [
      {
        title: 'Ställ in sidlayouten',
        description:
          'Öppna panelen Sidinställningar och välj en sidstorlek: Letter Stående, Letter Liggande, A4 Stående, A4 Liggande, Kvadrat (1200×1200) eller valfri anpassad dimension. Välj en sidfärg med färgväljaren som reservbakgrund. Välj ett bakgrundstema och justera dess opacitet (0–1 i 0,05-steg), välj sedan ett ramtema med sin egen oberoende opacitetskontroll. Dessa layoutval ramar in ditt skuggmatchnings arbetsblad innan du konfigurerar något innehåll.',
      },
      {
        title: 'Välj övningsläge och konfigurera alternativ',
        description:
          'Öppna panelen Övningskonfiguration och välj ditt läge: Skuggmatchning eller Gör Den Hel. Skuggmatchning genererar svarta siluetter från dina valda bilder med bildbearbetning på pixelnivå. Gör Den Hel delar bilder i halvor — välj horisontell (övre/undre) eller vertikal (vänster/höger) klippriktning med radioknapparna som visas i detta läge. Växla kryssrutan \"Visa Etiketter\" (standard PÅ) för att visa A/B/C/D och 1/2/3/4 identifierare på arbetsbladet. Växla \"Inkludera Namn/Datum-fält\" för att lägga till namn och datumlinjer.',
      },
      {
        title: 'Välj 4 bilder från biblioteket',
        description:
          'Öppna panelen Bildbibliotek och bläddra bland 104 tematiska samlingar med mer än 3 100 färgglada illustrationer — djur, mat, fordon, natur, högtider och dussintals fler. Filtrera efter tema med dropdownen eller sök med nyckelord med 300ms fördröjning. Klicka på bilder för att välja dem — räknaren visar din progress mot de nödvändiga 4 bilderna. En förhandsgranskning av valda bilder bekräftar dina val innan generering. Du kan också ladda upp egna PNG-, JPG- eller GIF-bilder med panelen Ladda Upp Egna Bilder.',
      },
      {
        title: 'Generera skuggmatchnings arbetsbladet',
        description:
          'Klicka på Generera för att skapa matchningsarbetsbladet. I Skuggmatchning-läget bearbetar appen varje bild på pixelnivå — laddar den till en arbetsyta, extraherar pixeldata via getImageData och konverterar varje pixel med alfa > 10 till rent svart (R=0, G=0, B=0, A=255) för att producera korrekta siluetter. I Gör Den Hel-läget delas bilderna längs den valda klippriktningen. Båda lägena tillämpar Fisher-Yates-derangering för att garantera att inget objekt visas i sin ursprungliga position. En stiliserad rubrik visas med bärnstensfärgad bakgrund (#FFC107), vit pillercontainer och 3px bärnstensfärgad ram som visar \"Skuggmatchning\" och instruktioner på det valda språket.',
      },
      {
        title: 'Generera facit och ladda ner',
        description:
          'Växla till fliken Facit för att se det automatiskt genererade facit. I Skuggmatchning-läget visar varje cell originalbilden bredvid dess siluett med en etikett som \"A → 2\" som anger den korrekta matchningen. I Gör Den Hel-läget visar varje cell den kompletta originalbilden med sin matchningsetikett. Ladda ner båda versionerna med fyra dedikerade knappar: Arbetsblad-JPEG, Facit-JPEG, Arbetsblad-PDF och Facit-PDF med 300 DPI. Växla gråskala för bläckvänliga versioner. Varje export är produktionsklar för Etsy-annonser, Amazon KDP-interiörer och Gumroad-produktfiler.',
      },
    ],
  },

  keyFeatures: {
    title: 'Nyckelfunktioner i Skuggmatchning Arbetsblad Generatorn',
    features: [
      {
        title: 'Automatiskt genererade siluetter via bildbearbetning på pixelnivå',
        description:
          'Skuggmatchning-läget skapar svarta siluetter genom verklig pixelnivå-manipulation — inte CSS-filter eller förgjorda tillgångar. Appen laddar varje bild till en arbetsyta, extraherar pixeldata med getImageData och konverterar varje pixel med ett alfavärde större än 10 till rent svart (R=0, G=0, B=0, A=255). Detta bevarar den exakta transparensprofilen för varje bild och producerar korrekta siluettkonturer som återspeglar fina detaljer som djuröron, fordonsformer och objektkonturer. CORS-hantering säkerställer att bilder från andra ursprung bearbetas korrekt, med en reserv till en solid svart rektangel om arbetsytan är kontaminerad.',
      },
      {
        title: 'Två övningslägen: Skuggmatchning och Gör Den Hel med klippriktningsval',
        description:
          'En generator levererar två distinkta visuella matchningsaktiviteter. Skuggmatchning-läget placerar 4 färgade bilder i den övre raden och 4 automatiskt genererade siluetter i den nedre raden — användarna identifierar varje bild utifrån enbart dess konturform. Gör Den Hel-läget delar 4 bilder i halvor och presenterar första halvorna och andra halvorna separat — användarna återkopplar bitarna för att slutföra varje bild. I Gör Den Hel-läget, välj horisontell klippriktning (övre/undre halvor) eller vertikal klippriktning (vänster/höger halvor). Layouten anpassas automatiskt: liggande sidor använder 2 rader × 4 objekt, stående sidor använder 2 kolumner × 4 objekt.',
      },
      {
        title: 'Derangeringsalgoritm som säkerställer inga triviala matchningar',
        description:
          'Båda övningslägena använder en Fisher-Yates-derangeringsalgoritm som garanterar att inget objekt visas i sin ursprungliga position. I Skuggmatchning-läget sitter ingen siluett direkt under sin matchande bild. I Gör Den Hel-läget visas ingen andra halva intill sin matchande första halva. Detta eliminerar möjligheten att användarna gissar rätt baserat enbart på position och säkerställer att varje arbetsblad presenterar en genuin matchningsutmaning. Derangeringen beräknas om vid varje generering, vilket producerar olika arrangemang från samma bildset.',
      },
      {
        title: 'Automatiskt genererat facit med bokstav-till-nummer matchningsetiketter',
        description:
          'Varje skuggmatchnings arbetsblad genererar automatiskt ett medföljande facit på en separat arbetsyteflik. Facit använder en rutnätslayout där varje cell visar originalbilden bredvid dess siluett eller kompletta bild, märkt med den korrekta matchningen som \"A → 2\". Rutnätet använder 4 kolumner med 50px mellanrum före den andra raden och 15px vertikalt avstånd mellan element. Inget manuellt facitskapande — facit förblir synkroniserat med arbetsbladet. Ladda ner det separat som answer_key.jpeg eller answer_key.pdf bredvid arbetsbladet.',
      },
      {
        title: 'Bildbibliotek med 104 tematiska samlingar och mer än 3 100 illustrationer',
        description:
          'Bläddra bland 104 tematiska bildsamlingar som täcker djur, mat, fordon, natur, yrken, högtider, sport, årstider och dussintals fler. Varje tema ger färgglada illustrationer som producerar distinkta siluetter med igenkännbara konturer — djurformer, fordonsprofiler och objektkonturer som utmanar visuell perception. Filtrera efter tema med dropdownen eller sök efter specifika bilder med nyckelord. Kommersiellt Paket inkluderar 10 färgglada teman för att komma igång; Full Access låser upp alla 104 teman för maximal kreativ variation över båda övningslägena.',
      },
      {
        title: 'Valfria etiketter och namn/datum namnfält',
        description:
          'Växla kryssrutan \"Visa Etiketter\" (standard PÅ) för att visa A, B, C, D identifierare på bilder eller första halvor och 1, 2, 3, 4 identifierare på siluetter eller andra halvor. När etiketterna är dolda blir arbetsbladet en ren visuell matchningsutmaning utan bokstavs-/sifferstöd — idealiskt för avancerade aktiviteter eller pusselböcker där skriftliga svar inte behövs. Kryssrutan \"Inkludera Namn/Datum-fält\" lägger till namn och datumlinjer längst ner på sidan för produktlinjesansvar och organisation.',
      },
      {
        title: 'Tryckfärdig PDF- och JPEG-export med 300 DPI och gråskaleväxling',
        description:
          'Ladda ner skuggmatchnings arbetsblad och facit som högupplösta JPEG-bilder eller tryckfärdiga PDF-dokument renderade med 300 DPI (6× multiplikator, JPEG-kvalitet 1,0). Fyra dedikerade nedladdningsknappar exporterar arbetsblad och facitfiler separat. Sidstorlekar inkluderar Letter Stående, Letter Liggande, A4 Stående, A4 Liggande, Kvadrat (1200×1200) och helt anpassade dimensioner. PDF-orientering detekteras automatiskt. Växla gråskala för bläckvänliga versioner. Varje export är produktionsklar för digitala nedladdningar, tryckta arbetsböcker och produktlinjesutdelningar.',
      },
      {
        title: 'Full arbetsyteredigering med textverktyg, justering och lagerkontroller',
        description:
          'Fabric.js-arbetsytan ger komplett kontroll över varje element på ditt skuggmatchnings arbetsblad. Dra, ändra storlek, rotera och flytta bilder, text och genererat innehåll fritt. Lagerkontroller hanterar staplingsordning — flytta element framåt eller skicka dem bakåt. Lås färdiga element medan du redigerar andra. Lägg till anpassad text med sju typsnittsalternativ (Lexend Deca, Baloo 2, Nunito, Quicksand, Fredoka, Arial, Verdana), justerbar storlek och färg, och textkonturbredd från 0 till 10 med 0,5-stegs granularitet. Sex justeringsalternativ plus centrera-på-sidan håller layouter exakta. Zooma från 25% till 300% för detaljarbete. Ångra och gör om med obegränsad historik med Ctrl+Z och Ctrl+Y.',
      },
    ],
  },

  businessUseCases: {
    title: 'Hur du Säljer Skuggmatchnings Arbetsblad Online',
    cases: [
      {
        title: 'Tematiska skuggmatchnings-paket på Etsy',
        description:
          'Skapa tematiska skuggmatchningspaket med de 104 bildsamlingarna — djurskuggpussel, fordonssiluettmatchning, matskuggutmaningar och dussintals fler. Varje tema ger illustrationer med distinkta konturer som skapar engagerande siluettaktiviteter. Paketera 15–20 skuggmatchnings arbetsblad per tema med facit inkluderade, och sälj till 30–70 SEK per paket. Blanda båda lägena inom ett enda paket: Skuggmatchnings arbetsblad för siluettigenkänning och Gör Den Hel-arbetsblad för rumsligt resonemang. De automatiskt genererade siluetterna och facit eliminerar de mest tidskrävande delarna av produktionen.',
        platform: 'Etsy (etsy.com)',
      },
      {
        title: 'Visuell perception-arbetsböcker på Amazon KDP',
        description:
          'Sammanställ 50–80 skuggmatchnings arbetsblad till en tryckt arbetsbok formaterad för Amazon KDP. Strukturera din bok med alternerande kapitel: Skuggmatchningskapitel bygger siluettigenkänning medan Gör Den Hel-kapitel utvecklar rumslig medvetenhet och del-till-hel-resonemang. Inkludera både horisontell och vertikal klippriktning i Gör Den Hel-avsnitten för variation. Placera facit i slutet av boken med den automatiskt genererade facitfunktionen. Gråskaleväxlingen producerar bläckvänliga sidor redo för svartvita bokinteriörer. Visuella perceptionspussel-böcker presterar bra året runt i aktivitetsbokskategorin.',
        platform: 'Amazon KDP (kdp.amazon.com)',
      },
      {
        title: 'produktlinjes snabbsluts-aktiviteter för Gumroad',
        description:
          'Bygg färdiga skuggmatchningsaktiviteter med namn/datum-fält och tryckta facit för produktlinjesanvändning. köpare som söker efter visuell diskriminationsövning värdesätter arbetsblad som anländer tryckfärdiga med facit. Skapa produktkatalogsangränsande set: djurskuggmatchning för naturvetenskapsenheter, samhällshjälpar-siluetter för samhällskunskap, matskuggpussel för näringslektioner. Etikett-växlingen låter dig skapa stöttade versioner (med A/B/C/D och 1/2/3/4 etiketter) och utmaningsversioner (etiketter dolda) i samma produkt för nivågrupperade produktpaket.',
        platform: 'Gumroad (gumroad.com)',
      },
      {
        title: 'Säsongsbetonade skuggmatchnings-samlingar',
        description:
          'De 104 tematiska bildsamlingarna täcker varje säsongs- och högtidstillfälle — jul, halloween, påsk, alla hjärtans dag, skolstart, sommarlov och fler. Siluettaktiviteter har särskild attraktionskraft under halloween när skugg- och mysterieteman är naturligt populära. Skapa tidsbegränsade skuggmatchnings-samlingar som sammanfaller med toppshoppingperioder. Inkludera både Skuggmatchning och Gör Den Hel-arbetsblad i varje säsongsset för maximalt värde och variation. Säsongsprodukter motiverar högre priser under sina toppfönster.',
        platform: 'Etsy / Amazon KDP / Gumroad (säsongsbetonat)',
      },
      {
        title: 'Blandat läge pusselpaket som premiumpaket',
        description:
          'Kombinera båda övningslägena till premiumpaket med blandat läge som visar generatorns mångsidighet. Varje paket inkluderar Skuggmatchnings arbetsblad (siluettigenkänning), Gör Den Hel-arbetsblad med horisontella klipp (övre/undre återmontering) och Gör Den Hel-arbetsblad med vertikala klipp (vänster/höger återmontering) — tre distinkta aktivitetstyper från ett tematiskt bildset. Denna tre-i-ett-metod motiverar premiumprissättning till 70–120 SEK per paket. Facit för varje arbetsblad inkluderas automatiskt, vilket lägger till professionell polish som motiverar högre upplevt värde.',
        platform: 'Etsy / Amazon KDP (premiumpaket)',
      },
    ],
  },

  faq: [
    {
      question: 'Vilka är de två övningslägena och hur skiljer de sig?',
      answer:
        'Generatorn erbjuder två distinkta lägen. Skuggmatchning-läget placerar 4 färgade bilder i den övre raden och 4 automatiskt genererade svarta siluetter i den nedre raden — användarna matchar varje bild med dess skugga genom att para bokstäver (A–D) med siffror (1–4). Gör Den Hel-läget delar 4 bilder i halvor och presenterar första halvorna (A–D) och andra halvorna (1–4) separat — användarna matchar halvor för att slutföra varje bild. Skuggmatchning testar siluettigenkänning medan Gör Den Hel utvecklar rumslig medvetenhet och del-till-hel-resonemang.',
    },
    {
      question: 'Hur genereras siluetterna?',
      answer:
        'Siluetterna skapas genom verklig bildbearbetning på pixelnivå, inte CSS-filter eller förgjorda skuggtillgångar. Appen laddar varje bild till en arbetsyta, extraherar varje pixel med getImageData och konverterar alla pixlar med ett alfavärde större än 10 till rent svart (R=0, G=0, B=0, A=255). Detta bevarar den exakta transparensprofilen för varje källbild och producerar korrekta svarta siluetter som återspeglar fina detaljer som öron, svansar, handtag och andra distinkta konturer.',
    },
    {
      question: 'Vilka klippriktningsalternativ finns i Gör Den Hel-läget?',
      answer:
        'Gör Den Hel-läget erbjuder två klippriktningsalternativ via radioknappar: Horisontella klipp delar bilder i övre och undre halvor, medan vertikala klipp delar bilder i vänster och höger halvor. Klippriktningen gäller för alla 4 bilder på arbetsbladet. Layouten anpassas automatiskt baserat på sidorientering — liggande sidor arrangerar objekt i 2 rader × 4 objekt, medan stående sidor använder 2 kolumner × 4 objekt för optimal visuell balans.',
    },
    {
      question: 'Hur fungerar derangeringsalgoritmen?',
      answer:
        'Båda lägena använder en Fisher-Yates-derangeringsalgoritm som garanterar att inget objekt visas i sin ursprungliga position. I Skuggmatchning-läget sitter ingen siluett direkt under sin matchande bild. I Gör Den Hel-läget visas ingen andra halva intill sin matchande första halva. Detta säkerställer att varje arbetsblad presenterar en genuin matchningsutmaning — användarna kan inte gissa rätt baserat enbart på position. Derangeringen beräknas om vid varje generering, vilket producerar olika arrangemang från samma bilder.',
    },
    {
      question: 'Kan jag växla A/B/C/D och 1/2/3/4 etiketterna på och av?',
      answer:
        'Ja. Kryssrutan \"Visa Etiketter\" i panelen Övningskonfiguration (standard PÅ) kontrollerar om A, B, C, D etiketter visas på bilder eller första halvor och 1, 2, 3, 4 etiketter visas på siluetter eller andra halvor. När etiketterna är PÅ skriver användarna bokstav-nummer-par som svar. När etiketterna är AV blir arbetsbladet en ren visuell matchningsutmaning utan alfanumeriskt stöd — användbart för pusselböcker eller avancerade aktiviteter.',
    },
    {
      question: 'Varför finns det alltid exakt 4 uppgifter per arbetsblad?',
      answer:
        'Arbetsbladet använder ett fast antal av 4 matchningsproblem (SELECT_COUNT = 4). Detta är inte konfigurerbart. Fyra objekt ger den optimala balansen för skugg- och delad-bild-matchning: tillräckligt med variation för att skapa en genuin matchningsutmaning med derangering, samtidigt som varje bild hålls tillräckligt stor för användarna att studera fina detaljer i siluetter och delade halvor. Det konsekventa 4-objektsformatet fungerar också bra för paketprodukter där varje sida har förutsägbar innehållsdensitet.',
    },
    {
      question: 'Hur fungerar namn- och datumfälten?',
      answer:
        'Växla kryssrutan \"Inkludera Namn/Datum-fält\" i panelen Övningskonfiguration för att lägga till namn och datumlinjer längst ner på arbetsbladet. När aktiverat kan användarna skriva sitt namn och datum direkt på den utskrivna sidan — väsentligt för produktlinjesansvar och organiserad bedömning. När avaktiverat använder arbetsbladet hela sidytan för matchningsinnehåll. Detta alternativ fungerar med både Skuggmatchning och Gör Den Hel-lägen.',
    },
    {
      question: 'Hur fungerar det automatiskt genererade facit?',
      answer:
        'Generatorn använder ett dubbelarbetsyte-system med en Arbetsbladsflik och en Facitflik. I Skuggmatchning-läget visar facit ett rutnät där varje cell visar originalbilden bredvid dess siluett med en etikett som \"A → 2\". I Gör Den Hel-läget visar varje cell den kompletta originalbilden med sin matchningsetikett. Rutnätet använder 4 kolumner med konsekvent avstånd. Båda versionerna exporteras separat med fyra dedikerade nedladdningsknappar: arbetsblad-JPEG, arbetsblad-PDF, facit-JPEG och facit-PDF.',
    },
    {
      question: 'Finns det en gratis provversion?',
      answer:
        'Ja. Du kan använda alla funktioner — båda övningslägena, automatiskt genererade siluetter, klippriktningsval, facit, hela bildbiblioteket, bakgrunds- och ramteman, etikettväxling, namn/datum-fält, textverktyg och alla nedladdningsformat — utan att skapa ett konto, ange kreditkort eller installera programvara. Gratis provversion-nedladdningar innehåller en liten vattenstämpel. En kommersiell licens tar bort vattenstämpeln och ger fulla försäljningsrättigheter.',
    },
    {
      question: 'Är Skuggmatchning Arbetsblad Generatorn språkkänslig?',
      answer:
        'Nej. Skuggmatchning är rent visuellt — arbetsbladets resultat innehåller bara bilder, siluetter och delade halvor utan lokaliserat ordinnehåll. Appgränssnittet (menyer, knappar, rubriktext) stöder alla 11 språk, men det genererade arbetsbladet fungerar identiskt oavsett språkval. Detta gör skuggmatchnings arbetsblad universellt säljbara på alla marknader utan översättning. Kommersiellt Paket inkluderar 10 färgglada teman; Full Access låser upp alla 104 teman och alla 11 gränssnittsspråk.',
    },
    {
      question: 'Kan jag sälja skuggmatchnings arbetsblad skapade med detta verktyg på Etsy och Amazon KDP?',
      answer:
        'Ja. Med en kommersiell licens har du fulla rättigheter att sälja dina skuggmatchnings arbetsblad som digitala nedladdningar på Etsy, som tryckta arbetsböcker på Amazon KDP, som produktlinjesresurser på Gumroad, eller genom valfri annan försäljningskanal. De två övningslägena, automatiskt genererade siluetter, derangeringsalgoritmen, autofacit och 104 tematiska bildsamlingar ger dig de kreativa verktygen för att producera originella, säljbara visuella matchningsprodukter.',
    },
    {
      question: 'Vad är er återbetalningspolicy?',
      answer:
        'Eftersom den gratis provversionen ger dig tillgång till alla funktioner erbjuder vi inte återbetalning på köp av kommersiella licenser. Du kan testa båda övningslägena, automatiskt genererade siluetter, klippriktningsval, facit, hela bildbiblioteket, bakgrunds- och ramteman, etikettväxling, namn/datum-fält, textverktyg och alla nedladdningsformat innan du köper. Den gratis provversionen är återbetalningspolicyn — se till att verktyget passar dina behov innan du köper en licens.',
    },
    {
      question: 'Följer arbetsbladen Lgr22 (läroplanen)?',
      answer:
        'Skugglek-uppgifter stöder Lgr22:s centrala innehåll genom att träna visuell diskriminering, formigenkänning och logiskt tänkande. Att matcha bilder med siluetter kräver analys av konturer och proportioner — kognitiva färdigheter som är grundläggande i kursplanen för de tidiga årskurserna.',
    },
    {
      question: 'Passar uppgifterna för förskoleklass, lågstadiet och mellanstadiet?',
      answer:
        'Ja. Uppgifterna är särskilt relevanta för förskoleklass (6 år) och lågstadiet (åk 1-3) där visuell diskriminering och formigenkänning är centralt. För de yngsta fungerar enkla bilder med tydliga konturer. För åk 1-3 kan du använda mer detaljerade bilder med liknande siluetter. Även mellanstadiet kan använda skugglek som en engagerande observationsövning.',
    },
  ],

  internalLinks: [
    {
      pageType: 'app',
      slug: 'matchnings-arbetsblad',
      anchorText: 'Matchnings Arbetsblad Generator',
    },
    {
      pageType: 'app',
      slug: 'rutnatsmatching-arbetsblad',
      anchorText: 'Rutmatchning Pussel Generator',
    },
    {
      pageType: 'app',
      slug: 'bildlotto-arbetsblad',
      anchorText: 'Bildlotto Arbetsblad Generator',
    },
    {
      pageType: 'app',
      slug: 'bildsortering-arbetsblad',
      anchorText: 'Bildsortering Arbetsblad Generator',
    },
    {
      pageType: 'app',
      slug: 'malarbilder-arbetsblad',
      anchorText: 'Målarbilder Arbetsblad Generator',
    },
    {
      pageType: 'app',
      slug: 'hitta-foremal-arbetsblad',
      anchorText: 'Hitta Föremål Arbetsblad Generator',
    },
    {
      pageType: 'bundle',
      slug: 'matchning-sortering-paket',
      anchorText: 'Matchning och Sortering Paket — Alla Matchningsappar i Ett',
    },
    {
      pageType: 'idea',
      slug: 'forskola-utskriftsbara-ideer',
      anchorText: 'Förskola Utskriftsbara Idéer för Tidiga användare',
    },
    {
      pageType: 'idea',
      slug: 'dagis-utskriftsbara-ideer',
      anchorText: 'Dagis Utskriftsbara Idéer för unga användare',
    },
    {
      pageType: 'start',
      slug: 'utskriftsbart-foeretag-ritning',
      anchorText: 'Din Utskriftsbart Företag Ritning',
    },
    {
      pageType: 'guide',
      slug: 'skapa-skuggmatchnings-arbetsblad',
      anchorText: 'Hur du Skapar Skuggmatchnings Arbetsblad som Säljer',
    },
  ],

  visuals: {
    heroImages: {
      primary: '/samples/swedish/shadow%20match/shadow-match-worksheet.webp',
      primaryAlt: 'Skuggmatchnings arbetsblad med färgade bilder i övre raden och automatiskt genererade svarta siluetter i nedre raden med bärnstensfärgad rubrik',
    },
    sampleGallery: [
      {
        src: '/samples/swedish/shadow%20match/skuggmatchning-1.webp',
        alt: 'Skuggmatchnings arbetsblad som visar fyra färgade bilder matchade med fyra svarta siluetter med bokstav- och sifferetiketter',
        caption: 'Skuggmatchning-läge — användarna matchar bilder med deras automatiskt genererade siluetter',
      },
      {
        src: '/samples/swedish/shadow%20match/skuggmatchning-2.webp',
        alt: 'Gör den hel arbetsblad med delade bildhalvor som användarna kopplar ihop genom att matcha första och andra halvor',
        caption: 'Gör Den Hel-läge — användarna matchar delade bildhalvor för att slutföra bilderna',
      },
      {
        src: '/samples/swedish/shadow%20match/skuggmatchning-1-answer-key.webp',
        alt: 'Skuggmatchning facit som visar originalbilder med siluetter och korrekta bokstav-till-nummer matchningsetiketter',
        caption: 'Automatiskt genererat facit — bokstav-till-nummer etiketter visar korrekta matchningar',
      },
    ],
    youtubeId: 'TYvUXJeMI98',
    videoTitle: 'Hur du Skapar Skuggmatchnings Arbetsblad med Siluetter och Delade Bilder — Steg-för-Steg Handledning',
  },
};

export default content;
