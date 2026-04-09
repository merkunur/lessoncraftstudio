import type { AppContent } from '../types';

const content: AppContent = {
  seo: {
    primaryKeyword: 'vilken hör inte hemma uppgift skriva ut',
    secondaryKeywords: [
      'hitta inkräktaren uppgift',
      'klassificering uppgiftsblad',
      'logiskt tänkande uppgifter',
      'vad passar inte',
    ],
    lsiKeywords: [
      'vilken hör inte hemma',
      'inkräktare',
      'logik',
      'klassificering',
      'förskoleklass',
    ],
    titleTag: 'Vilken hör inte hemma? uppgift att skriva ut | Logikgenerator',
    metaDescription: 'Skapa "vilken hör inte hemma?"-uppgifter med temabilder för logiskt tänkande. Automatiskt facit. Prova gratis.',
  },

  hero: {
    title: 'Vilken hör inte hemma? uppgift att skriva ut — Logikgenerator',
    tagline: 'Skapa "vilken hör inte hemma?"-uppgifter med temabilder för logiskt tänkande — prova gratis med vattenmärke.',
    description:
      'Skapa hitta-den-annorlunda arbetsblad att sälja på Etsy eller sammanställa i kritiskt tänkande-arbetsböcker för Amazon KDP. Köparna identifierar och ringar in det udda objektet i varje rad av fyra bilder. Identiskt läge för hitta-skillnaden-utmaningar, Liknande läge för temaövergripande diskrimineringspussel. Konfigurera 5–10 övningar per sida. Arbetsbladen är helt visuella — säljbara globalt utan översättning. Välj bland mer än 3 100 illustrationer i 104 teman. Automatiskt facit med röda cirklar ingår. Vilken hör inte hemma-blad är ett populärt format bland föräldrar till förskolebarn och säljer konsekvent. Den svenska marknaden saknar denna produkttyp på Etsy. Kommersiell licens ingår. Gratis provversion med alla funktioner — nedladdningar innehåller en vattenstämpel; köp en licens för att ta bort den.',
  },

  howItWorks: {
    title: 'Hur du Skapar Hitta Udda Bilden Arbetsblad i 5 Steg',
    steps: [
      {
        title: 'Ställ in sidlayouten',
        description:
          'Öppna panelen Sidinställningar och välj en sidstorlek: Letter Stående, Letter Liggande, A4 Stående, A4 Liggande, Kvadrat (1200×1200) eller valfri anpassad dimension. Välj en sidfärg med färgväljaren som reservbakgrund. Välj ett bakgrundstema och justera dess opacitet (0–1 i 0,05-steg), välj sedan ett ramtema med sin egen oberoende opacitetskontroll. Dessa layoutval ramar in ditt hitta udda bilden arbetsblad innan du konfigurerar några övningar.',
      },
      {
        title: 'Konfigurera dina övningar',
        description:
          'Öppna panelen Övningskonfiguration och ställ in övningsantalet från 5 till 10 (standard 6). Välj ett globalt genereringsläge: Identiskt läge använder tre kloner av samma bild plus en annorlunda bild från samma tema, medan Liknande läge hämtar tre bilder från Tema A och en bild från Tema B. Överskrid läget per övning med dropdown-väljare på varje rad — blanda Identiska och Liknande övningar på ett enda arbetsblad för progressiv svårighet. Växla kryssrutan \"Inkludera Namn/Datum-fält\" för att lägga till namn och datumlinjer, och växla \"Inkludera Övningsnummer\" för att visa siffror på vänster sida av varje övningskort.',
      },
      {
        title: 'Välj teman och bilder',
        description:
          'Öppna panelen Bildbibliotek och välj Tema A från dropdownen — detta ger de tre vanliga bilderna i Liknande läge. Välj Tema B för det udda objektet i Liknande läge (t.ex. Tema A = djur, Tema B = mat). Bläddra bland 104 tematiska samlingar med mer än 3 100 färgglada illustrationer, eller sök med nyckelord. I Identiskt läge behövs bara ett tema eftersom både de vanliga och de udda bilderna kommer från samma samling. Du kan också ladda upp egna PNG-, JPG- eller GIF-bilder att använda bredvid biblioteksinnehåll.',
      },
      {
        title: 'Generera hitta udda bilden arbetsbladet',
        description:
          'Klicka på Generera för att skapa övningskorten. Varje kort visar fyra bilder i en horisontell rad — tre vanliga objekt och ett udda objekt med sin position slumpmässigt blandad. Appen arrangerar kort i 1–2 kolumner beroende på sidorientering och övningsantal (2 kolumner för liggande eller stående med 7+ övningar). En stiliserad \"Hitta den som inte hör hemma\"-rubrik visas överst med korallfärgad yttre ram (#FF6B6B, 8px streck), bärnstensfärgad inre ram (#FFB84D, 3px streck) och turkos bakgrund (#4ECDC4) — med titeln i mörkblågrön Fredoka (#1A535C) och instruktioner i röd Quicksand (#E63946).',
      },
      {
        title: 'Generera facit och ladda ner',
        description:
          'Växla till fliken Facit för att se det automatiskt genererade facit med en röd cirkel ritad runt det udda objektet i varje övningsrad. Cirkelns streckbredd skalas med bildstorlek (max av imageSize × 0,04 eller 3px) för konsekvent synlighet över sidstorlekar. Ladda ner båda versionerna med de fyra dedikerade knapparna: Arbetsblad-JPEG, Facit-JPEG, Arbetsblad-PDF och Facit-PDF med 300 DPI. Växla gråskala för bläckvänliga versioner. Varje export är produktionsklar för Etsy-annonser, Amazon KDP-interiörer och Gumroad-produktfiler.',
      },
    ],
  },

  keyFeatures: {
    title: 'Nyckelfunktioner i Hitta Udda Bilden Arbetsblad Generatorn',
    features: [
      {
        title: 'Hitta den som inte hör hemma-pussel med två genereringslägen',
        description:
          'Varje övning visar fyra bilder i ett horisontellt kort — tre vanliga objekt och ett udda objekt — och användarna ringar in den som inte hör hemma. Generatorn erbjuder två distinkta lägen. Identiskt läge placerar tre kloner av exakt samma bild bredvid en annorlunda bild från samma tema, vilket skapar en enkel hitta-skillnaden-utmaning. Liknande läge hämtar tre bilder från Tema A (t.ex. djur) och en bild från Tema B (t.ex. mat), vilket kräver att användarna identifierar den tematiska avvikaren snarare än en visuell dubblett. Varje läge producerar en fundamentalt annorlunda kognitiv utmaning från samma bildbibliotek.',
      },
      {
        title: 'Lägesöverskridning per övning för arbetsblad med blandad svårighet',
        description:
          'Varje övningsrad inkluderar sin egen läges-dropdown, vilket låter dig överskriva det globala läget per övning. Börja med enkla Identiska övningar överst och övergå till svårare Liknande övningar mot botten — eller alternera lägen genom hela arbetsbladet för varierad utmaning. En \"Rensa Val\"-knapp återställer alla per-övning-överskridningar till den globala inställningen. Denna detaljerade kontroll låter säljare skapa arbetsblad med progressiv svårighet som betjänar flera färdighetsnivåer på en enda sida, vilket ökar det upplevda värdet av varje utskriftsbar produkt.',
      },
      {
        title: 'Konfigurerbart övningsantal från 5 till 10 per arbetsblad',
        description:
          'Ställ in antalet övningar från 5 till 10 med panelen Övningskonfiguration, med standard satt till 6. Färre övningar skapar arbetsblad med större bildkort och mer avstånd — idealiskt för yngre användare eller arbetsblad avsedda för finmotorisk övning där ringning behöver utrymme. Fler övningar ökar innehållsdensiteten och utmaningen för äldre användare. Layouten anpassas automatiskt: stående sidor med 7 eller fler övningar växlar till en 2-kolumnslayout, och liggande sidor använder alltid 2 kolumner för optimalt avstånd.',
      },
      {
        title: 'Tvåtemasystem med Tema A (vanliga) och Tema B (udda)',
        description:
          'Liknande läge använder ett tvåtemasystem som gör temaövergripande diskrimineringspussel enkla att skapa. Välj Tema A från dropdownen för de tre vanliga bilderna i varje övning, välj sedan Tema B för det enda udda objektet. Para djur med mat, fordon med natur, yrken med sport — valfri kombination från de 104 tillgängliga temana. Detta system garanterar att det udda objektet alltid är tematiskt distinkt, vilket skapar tydliga och pedagogiskt meningsfulla pussel utan manuellt bildval för varje övning.',
      },
      {
        title: 'Automatiskt genererat facit med röda cirkelmarkeringar',
        description:
          'Varje hitta udda bilden arbetsblad genererar automatiskt ett medföljande facit på en separat arbetsyteflik. Facit återskapar den exakta arbetsbladslayouten och ritar en röd cirkelkontur runt det udda objektet i varje övningsrad. Cirkelns streckbredd skalas dynamiskt med bildstorlek — beräknad som det större av imageSize × 0,04 eller 3 pixlar — vilket säkerställer konsekvent synlighet över alla sidstorlekar och övningsantal. Ingen manuell markering, ingen separat filskapning — facit förblir synkroniserat med arbetsbladet automatiskt.',
      },
      {
        title: 'Bildbibliotek med 104 tematiska samlingar och mer än 3 100 illustrationer',
        description:
          'Bläddra bland 104 tematiska bildsamlingar som täcker djur, mat, fordon, natur, yrken, högtider, sport, årstider och dussintals fler. Varje tema ger en koordinerad uppsättning färgglada illustrationer som fungerar tillsammans i hitta udda bilden-övningar. Filtrera efter tema med dropdownen eller sök efter specifika bilder med nyckelord. Bilder laddas med lat laddning (20 åt gången) för smidig bläddring. Kommersiellt Paket inkluderar 10 färgglada teman för att komma igång; Full Access låser upp alla 104 teman för maximal variation över båda genereringslägena.',
      },
      {
        title: 'Tryckfärdig PDF- och JPEG-export med 300 DPI och gråskaleväxling',
        description:
          'Ladda ner hitta udda bilden arbetsblad och facit som högupplösta JPEG-bilder eller tryckfärdiga PDF-dokument renderade med 300 DPI (6× multiplikator). Fyra dedikerade nedladdningsknappar exporterar Arbetsblad-JPEG, Facit-JPEG, Arbetsblad-PDF och Facit-PDF separat. Sidstorlekar inkluderar Letter Stående, Letter Liggande, A4 Stående, A4 Liggande, Kvadrat (1200×1200) och helt anpassade dimensioner. Växla gråskala för bläckvänliga versioner som sparar toner. Varje export är produktionsklar för digitala nedladdningar, tryckta arbetsböcker och produktlinjesutdelningar.',
      },
      {
        title: 'Full arbetsyteredigering med textverktyg, namn/datum-fält och övningsnummer',
        description:
          'Fabric.js-arbetsytan ger komplett kontroll över varje element på ditt arbetsblad. Dra, ändra storlek, rotera och flytta bilder, text och genererat innehåll fritt. Lagerkontroller hanterar staplingsordning och lås färdiga element medan du redigerar andra. Lägg till anpassad text med sju typsnittsalternativ (Lexend Deca, Baloo 2, Nunito, Quicksand, Fredoka, Arial, Verdana), justerbar storlek och färg, och textkonturbredd från 0 till 10 med 0,5-stegs granularitet. Växla namn- och datumfält för produktlinjesfärdig formatering, och övningsnummer (25px bredd, 15px gap) för enkel referens under genomgång. Zooma från 25% till 300% för detaljarbete. Ångra och gör om upp till 20 historiksteg med Ctrl+Z och Ctrl+Y.',
      },
    ],
  },

  businessUseCases: {
    title: 'Hur du Säljer Hitta Udda Bilden Arbetsblad Online',
    cases: [
      {
        title: 'Tematiska hitta udda bilden pusselpaket på Etsy',
        description:
          'Skapa tematiska visuella diskriminerings-paket med tvåtemasystemet — djur mot mat, fordon mot natur, högtider mot sport och dussintals fler temakombinationer. Varje temaparning producerar tillräckligt med unika övningar för flera arbetsblad med både Identiskt och Liknande läge. Paketera 10–20 hitta udda bilden arbetsblad per paket med facit inkluderade, och sälj till 30–70 SEK per set. Det visuella formatet innebär att varje paket fungerar för vilken språkmarknad som helst utan modifiering, vilket utökar din kundbas globalt.',
        platform: 'Etsy (etsy.com)',
      },
      {
        title: 'Visuella diskriminerings-arbetsböcker på Amazon KDP',
        description:
          'Sammanställ 40–80 hitta udda bilden arbetsblad till en tryckt arbetsbok formaterad för Amazon KDP. Strukturera din bok med progressiv svårighet: tidiga kapitel använder Identiskt läge (hitta den som inte är klon), mellankapitel använder Liknande läge med uppenbara temakontraster, och avancerade kapitel använder Liknande läge med subtilare distinktioner. Använd lägesöverskridning per övning för att skapa blandade svårighetssidor som utmanar användarna att växla mellan visuella strategier. Inkludera facit i slutet med det automatiskt genererade röd-cirkel-facit. Gråskaleväxlingen producerar bläckvänliga sidor för svartvita bokinteriörer.',
        platform: 'Amazon KDP (kdp.amazon.com)',
      },
      {
        title: 'produktlinjes kritiskt tänkande-aktiviteter för Gumroad',
        description:
          'Bygg färdiga hitta udda bilden arbetsblad med namn- och datumfält, övningsnummer och tryckta facit. köpare som söker på Gumroad efter kritiskt tänkande-aktiviteter värdesätter arbetsblad som anländer produktlinjesfärdiga — namnfältet säkerställer spårbarhet, övningsnummer gör klassdiskussion effektiv, och det röda cirkel-facit sparar bedömningstid. Skapa produktkatalogsanpassade set: djurklassificeringsutmaningar, matgruppsdiskriminering, samhällshjälparidentifiering och säsongsmedvetenhetspussel. Varje set inkluderar arbetsblad och facit i både PDF- och JPEG-format.',
        platform: 'Gumroad (gumroad.com)',
      },
      {
        title: 'Säsongsbetonade och högtidspussel-samlingar',
        description:
          'De 104 tematiska bildsamlingarna täcker varje säsongs- och högtidstillfälle — jul, halloween, påsk, alla hjärtans dag, skolstart, sommarlov och fler. Skapa tidsbegränsade hitta udda bilden-samlingar som sammanfaller med toppshoppingperioder. Släpp halloweenpussel-paket i september, julsamlingar i oktober och alla hjärtans dag-paket i januari. Blanda Identiskt och Liknande läge inom varje säsongsset för variation och upplevt värde. Säsongsprodukter motiverar högre priser under sina toppfönster och skapar naturliga skäl till återköp.',
        platform: 'Etsy / Amazon KDP / Gumroad (säsongsbetonat)',
      },
      {
        title: 'Global marknadsattraktionskraft med visuella pussel',
        description:
          'Eftersom hitta udda bilden arbetsblad är helt visuella — ingen text visas på själva pusslet — fungerar varje arbetsblad på vilket språk som helst utan modifiering. Den automatiskt genererade rubriken översätts till alla 11 stödda språk, men pusselinnehållet kräver noll lokalisering. Detta gör hitta udda bilden arbetsblad unikt effektiva för säljare som riktar sig mot internationella marknader. Skapa en uppsättning arbetsblad och lista dem i flera språkspecifika Etsy-butiker eller Amazon KDP-marknadsplatser. Samma produkt betjänar engelska, tyska, franska, spanska och varje annan marknad samtidigt.',
        platform: 'Etsy / Amazon KDP (global marknad)',
      },
    ],
  },

  faq: [
    {
      question: 'Hur fungerar hitta udda bilden-mekaniken?',
      answer:
        'Varje övning visar fyra bilder i ett horisontellt kort — tre vanliga objekt och ett udda objekt. användarna tittar på raden, identifierar vilken bild som inte hör hemma och ringar in den. Det udda objektets position blandas slumpmässigt inom raden, så det kan visas i vilken av de fyra platserna som helst. Övningar arrangeras vertikalt på sidan, med layouten som växlar till 2 kolumner vid liggande orientering eller stående med 7 eller fler övningar.',
    },
    {
      question: 'Vad är skillnaden mellan Identiskt och Liknande läge?',
      answer:
        'Identiskt läge placerar tre kloner av exakt samma bild bredvid en annorlunda bild från samma tema — användarna hittar den som inte är dubblett. Liknande läge hämtar tre bilder från Tema A (t.ex. djur) och en bild från Tema B (t.ex. mat) — användarna identifierar den tematiska avvikaren. Identiskt läge är lättare eftersom användarna jämför visuella dubbletter. Liknande läge är svårare eftersom alla fyra bilderna är olika och distinktionen är kategorisk snarare än visuell.',
    },
    {
      question: 'Hur fungerar lägesöverskridning per övning?',
      answer:
        'Varje övningsrad inkluderar sin egen läges-dropdown som låter dig överskriva den globala lägesinställningen. Ställ in det globala läget till Liknande, sedan växla enskilda övningar till Identiskt — eller tvärtom. Detta skapar arbetsblad med blandad svårighet där vissa övningar är lättare (Identiskt) och andra är svårare (Liknande) på samma sida. En \"Rensa Val\"-knapp återställer alla per-övning-överskridningar till den globala inställningen.',
    },
    {
      question: 'Hur många övningar kan jag inkludera på ett arbetsblad?',
      answer:
        'Övningsantalet är konfigurerbart från 5 till 10, med standard satt till 6. Varje övning innehåller alltid exakt 4 bilder (3 vanliga + 1 udda). Färre övningar skapar större bildkort med mer avstånd; fler övningar ökar innehållsdensiteten. Layouten anpassas automatiskt — stående sidor med 7+ övningar och alla liggande sidor använder en 2-kolumnslayout för optimalt avstånd.',
    },
    {
      question: 'Hur fungerar tvåtemasystemet i Liknande läge?',
      answer:
        'I Liknande läge väljer du två teman från dropdown-menyerna. Tema A ger de tre vanliga bilderna för varje övning (t.ex. djur), och Tema B ger det enda udda objektet (t.ex. mat). Detta garanterar att det udda objektet alltid är tematiskt distinkt. Välj bland valfri kombination av de 104 tillgängliga temana. I Identiskt läge behövs bara ett tema eftersom både de vanliga klonerna och den udda bilden kommer från samma samling.',
    },
    {
      question: 'Hur fungerar det automatiskt genererade facit med röda cirklar?',
      answer:
        'Generatorn använder ett dubbelarbetsyte-system med en Arbetsbladsflik och en Facitflik. Arbetsbladet visar övningskorten utan markeringar — användarna ringar in det udda objektet själva. Facit återskapar den identiska layouten och ritar en röd cirkelkontur runt det udda objektet i varje rad. Cirkelns streckbredd skalas dynamiskt med bildstorlek (det större av imageSize × 0,04 eller 3 pixlar). Båda versionerna exporteras separat med fyra dedikerade nedladdningsknappar.',
    },
    {
      question: 'Kan jag lägga till namn- och datumfält på hitta udda bilden arbetsblad?',
      answer:
        'Ja. Växla kryssrutan \"Inkludera Namn/Datum-fält\" i panelen Övningskonfiguration för att lägga till namn och datumlinjer. Dessa fält positioneras responsivt baserat på sidlayouten. Namn- och datumfält gör arbetsbladen produktlinjesfärdiga — säljare kan spåra ifyllda blad och föräldrar kan organisera avslutade aktiviteter efter datum.',
    },
    {
      question: 'Hur fungerar övningsnummer?',
      answer:
        'Växla kryssrutan \"Inkludera Övningsnummer\" i panelen Övningskonfiguration för att visa siffror på vänster sida av varje övningskort. Nummer använder 25px bredd med 15px gap från kortinnehållet. Övningsnummer hjälper under produktlinjesgenomgång och gör det enkelt för säljare att referera till specifika övningar under diskussion.',
    },
    {
      question: 'Finns det en gratis provversion?',
      answer:
        'Ja. Du kan använda alla funktioner — båda genereringslägena, per-övning-överskridningar, konfigurerbara övningsantal, det automatiskt genererade facit, hela bildbiblioteket, bakgrunds- och ramteman, namn/datum-fält, övningsnummer och alla nedladdningsformat — utan att skapa ett konto, ange kreditkort eller installera programvara. Gratis provversion-nedladdningar innehåller en liten vattenstämpel. En kommersiell licens tar bort vattenstämpeln och ger fulla försäljningsrättigheter.',
    },
    {
      question: 'Är hitta udda bilden arbetsblad språkkänsliga?',
      answer:
        'Nej. Till skillnad från appar som visar ord på arbetsbladet är hitta udda bilden-pussel helt visuella — ingen text visas på själva pusselinnehållet. Den automatiskt genererade rubriken (\"Hitta den som inte hör hemma\") översätts till alla 11 stödda språk, men de faktiska övningarna innehåller bara bilder. Detta innebär att varje arbetsblad fungerar på vilket språk som helst utan modifiering, vilket gör hitta udda bilden-pussel idealiska för global marknadsplatsförsäljning.',
    },
    {
      question: 'Kan jag sälja hitta udda bilden arbetsblad skapade med detta verktyg på Etsy och Amazon KDP?',
      answer:
        'Ja. Med en kommersiell licens har du fulla rättigheter att sälja dina hitta udda bilden arbetsblad som digitala nedladdningar på Etsy, som tryckta arbetsböcker på Amazon KDP, som produktlinjesresurser på Gumroad, eller genom valfri annan försäljningskanal. De två genereringslägena, per-övning-överskridningar och 104 tematiska bildsamlingar ger dig de kreativa verktygen för att producera originella, säljbara visuella diskrimineringsprodukter.',
    },
    {
      question: 'Vad är er återbetalningspolicy?',
      answer:
        'Eftersom den gratis provversionen ger dig tillgång till alla funktioner erbjuder vi inte återbetalning på köp av kommersiella licenser. Du kan testa båda genereringslägena, per-övning-överskridningssystemet, det automatiskt genererade facit, hela bildbiblioteket, bakgrunds- och ramteman, namn/datum-fält, övningsnummer och alla nedladdningsformat innan du köper. Den gratis provversionen är återbetalningspolicyn — se till att verktyget passar dina behov innan du köper en licens.',
    },
    {
      question: 'Följer arbetsbladen Lgr22 (läroplanen)?',
      answer:
        'Vilken-hör-inte-hemma-uppgifter stöder Lgr22:s centrala innehåll genom att träna logiskt tänkande, klassificering och kategorisering. Att identifiera vilken bild som inte hör till gruppen kräver analys av gemensamma egenskaper och uteslutning — färdigheter som är grundläggande i kursplanen för matematik och NO.',
    },
    {
      question: 'Passar uppgifterna för förskoleklass, lågstadiet och mellanstadiet?',
      answer:
        'Ja. Svårighetsgraden beror på bildurval och kategoriernas komplexitet. För förskoleklass (6 år) fungerar tydliga kategorier som "djur vs. fordon". För lågstadiet (åk 1-3) kan du använda mer subtila skillnader inom samma tema. För mellanstadiet (åk 4-6) skapar du utmanande uppgifter med abstrakta kategorier och flera möjliga svar.',
    },
  ],

  internalLinks: [
    {
      pageType: 'app',
      slug: 'saknade-bitar-arbetsblad',
      anchorText: 'Saknade Bitar Arbetsblad Generator',
    },
    {
      pageType: 'app',
      slug: 'bildsudoku-arbetsblad',
      anchorText: 'Bildsudoku Arbetsblad Generator',
    },
    {
      pageType: 'app',
      slug: 'bildlabyrint-arbetsblad',
      anchorText: 'Bildlabyrint Arbetsblad Generator',
    },
    {
      pageType: 'app',
      slug: 'skuggmatchning-arbetsblad',
      anchorText: 'Skuggmatchning Arbetsblad Generator',
    },
    {
      pageType: 'app',
      slug: 'hitta-och-rakna-arbetsblad',
      anchorText: 'Hitta och Räkna Arbetsblad Generator',
    },
    {
      pageType: 'bundle',
      slug: 'pussel-logik-paket',
      anchorText: 'Pussel och Logik Paket — Alla Pusselappar i Ett',
    },
    {
      pageType: 'guide',
      slug: 'skapa-hitta-udda-bilden-pussel',
      anchorText: 'Hur du Skapar Hitta Udda Bilden Pussel som Säljer',
    },
    {
      pageType: 'idea',
      slug: 'forskola-utskriftsbara-ideer',
      anchorText: 'Visuell Diskriminering Utskriftsbara Idéer för Arbetsblad',
    },
    {
      pageType: 'idea',
      slug: 'forsta-klass-utskriftsbara-ideer',
      anchorText: 'Första Klass Utskriftsbara Idéer för Grundutbildning',
    },
    {
      pageType: 'idea',
      slug: 'andra-klass-utskriftsbara-ideer',
      anchorText: 'Andra Klass Utskriftsbara Idéer för Växande användare',
    },
    {
      pageType: 'start',
      slug: 'amazon-kdp-aktivitetsbocker',
      anchorText: 'Publicera Aktivitetsböcker på Amazon KDP',
    },
  ],

  visuals: {
    heroImages: {
      primary: '/samples/swedish/odd%20one%20out/hitta-udda-fågeln-1.webp',
      primaryAlt: 'Hitta udda bilden arbetsblad med fyra bilder per övningsrad, färgglada tematiska illustrationer och lokaliserad rubrik',
    },
    sampleGallery: [
      {
        src: '/samples/swedish/odd%20one%20out/hitta-udda-fågeln-2.webp',
        alt: 'Liknande läge hitta udda bilden arbetsblad med tre djur och ett matföremål per rad',
        caption: 'Liknande läge — tre bilder från Tema A och ett udda objekt från Tema B',
      },
      {
        src: '/samples/swedish/odd%20one%20out/hitta-udda-fågeln-4.webp',
        alt: 'Identiskt läge hitta udda bilden arbetsblad med tre identiska bilder och en annorlunda bild per rad',
        caption: 'Identiskt läge — tre kloner av samma bild och en annorlunda bild',
      },
      {
        src: '/samples/swedish/odd%20one%20out/hitta-udda-fågeln-1-answer-key.webp',
        alt: 'Hitta udda bilden facit med röda cirklar ritade runt det udda objektet i varje övningsrad',
        caption: 'Automatiskt genererat facit — röda cirklar markerar det udda objektet i varje rad',
      },
    ],
    youtubeId: '0R6WFUfY7Mk',
    videoTitle: 'Hur du Skapar Hitta Udda Bilden Arbetsblad med Två Lägen och Automatiska Facit — Steg-för-Steg Handledning',
  },
};

export default content;
