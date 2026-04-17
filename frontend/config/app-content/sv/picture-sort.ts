import type { AppContent } from '../types';

const content: AppContent = {
  seo: {
    primaryKeyword: 'sorterings-uppgift skriva ut',
    secondaryKeywords: [
      'sortera och gruppera uppgift',
      'kategorisera bilder',
      'ordna och sortera uppgiftsblad',
      'sorteringsaktivitet förskoleklass',
    ],
    lsiKeywords: [
      'sortera',
      'gruppera',
      'kategorisera',
      'ordna',
      'förskoleklass',
    ],
    titleTag: 'Sorteringsgenerator | LessonCraftStudio',
    metaDescription: 'Skapa sorterings- och kategoriseringsuppgifter med temabilder. Automatiskt facit, utskrivbara PDF:er. Prova gratis.',
  },

  hero: {
    title: 'Sorteringsgenerator — Skapa utskrifter att sälja på Etsy och KDP',
    tagline: 'Skapa sorterings- och kategoriseringsuppgifter med temabilder för förskoleklass — prova gratis med vattenmärke.',
    description:
      'Skapa sorteringsblad att sälja på Etsy eller sammanställa i klassificerings-arbetsböcker för Amazon KDP. Köparna sorterar utklippta bilder i två kategorier — ett interaktivt format som föräldrar och förskollärare älskar. Välj temaläge eller manuellt läge för att anpassa kategorier och bilder. Generatorn är språkkänslig: samma teman producerar unika arbetsblad på 11 språk med lokaliserade kategorietiketter. Automatiskt facit ingår. Välj bland mer än 3 100 illustrationer i 104 teman. Sorteringsaktiviteter är ett av de mest efterfrågade produktformaten för förskolebarn — och den svenska marknaden på Etsy saknar praktiskt taget konkurrens. Exportera tryckfärdiga PDF:er i Letter och A4. Kommersiell licens ingår. Gratis provversion med alla funktioner — nedladdningar innehåller en vattenstämpel; köp en licens för att ta bort den.',
  },

  ctaHeading: 'Skapa sorteringsuppgifter',

  howItWorks: {
    title: 'Hur du Skapar Bildsorteringsarbetsblad i 5 Steg',
    steps: [
      {
        title: 'Ställ in sidlayouten',
        description:
          'Öppna panelen Sidinställningar och välj en sidstorlek: Letter Stående, Letter Liggande, A4 Stående, A4 Liggande, Kvadrat (1200×1200) eller valfri anpassad dimension. Välj en sidfärg med färgväljaren som reservbakgrund. Välj ett bakgrundstema och justera dess opacitet (0–1 i 0,05-steg), välj sedan ett ramtema med sin egen oberoende opacitetskontroll. Kryssa i \"Inkludera Namn/Datum-fält\" för att lägga till namn och datumlinjer. Dessa layoutval ramar in ditt sorteringsarbetsblad innan du konfigurerar något innehåll.',
      },
      {
        title: 'Välj dina sorteringskategorier',
        description:
          'Öppna panelen Sorteringskategorier och välj två teman — ett för den vänstra kategorin och ett för den högra kategorin. Appen genererar automatiskt 4–6 slumpmässiga bilder per tema från bildbiblioteket. Välj till exempel Djur till vänster och Mat till höger för att skapa ett sorteringsarbetsblad där användarna klassificerar bilder i rätt grupp. Alternativt, växla till manuellt läge för att handvälja enskilda bilder och tilldela var och en till vänster eller höger kategori.',
      },
      {
        title: 'Välj bilder från biblioteket eller ladda upp egna',
        description:
          'Öppna panelen Bildbibliotek och bläddra bland 104 tematiska samlingar med mer än 3 100 färgglada illustrationer — djur, mat, fordon, natur, högtider och dussintals fler. Filtrera efter tema med dropdownen eller sök med nyckelord. Klicka på bilder för att lägga till dem i ditt arbetsblad och tilldela var och en till vänster eller höger kategori. Det totala bildantalet sträcker sig från 4 till 12, med 2–10 bilder per kategori. Du kan också ladda upp egna PNG-, JPG- eller GIF-bilder att använda bredvid biblioteksinnehåll.',
      },
      {
        title: 'Generera sorteringsarbetsbladet',
        description:
          'Klicka på Generera för att skapa den tvådelade sorteringslayouten. Appen arrangerar ditt innehåll i kategoriramar överst (två sida vid sida streckade ramar med #FAFAFA-fyllning) och ett blandat utklippsrutnät nedanför (vita celler med streckade #666-kanter). En stiliserad \"Sortera bilder\"-rubrik visas överst med mintgrön bakgrund (#4DB6AC), blågrön titel (#00796B) i Fredoka-typsnitt och orange beskrivning (#FF7043) i Quicksand-typsnitt. En blågrön yttre ram (#26A69A, 8px streck) ramar in hela sidan. Utklippsrutnätet visar alla bilder i slumpmässig ordning — användarna klipper ut dem och sorterar i rätt kategoriruta.',
      },
      {
        title: 'Generera facit och ladda ner',
        description:
          'Växla till fliken Facit för att se den automatiskt genererade lösningen med 6× större bilder organiserade i sina korrekta kategorirutor, visade i maximalt 2 kolumner per ruta. Ladda ner båda versionerna med de fyra dedikerade knapparna: Arbetsblad-JPEG, Facit-JPEG, Arbetsblad-PDF och Facit-PDF. Filer exporteras med 300 DPI och JPEG-kvalitet 1,0. Växla gråskala för bläckvänliga versioner. Varje export är produktionsklar för Etsy-annonser, Amazon KDP-interiörer och Gumroad-produktfiler.',
      },
    ],
  },

  keyFeatures: {
    title: 'Nyckelfunktioner i Bildsortering Arbetsblad Generatorn',
    features: [
      {
        title: 'Tvåkategorisortering med temabaserat eller manuellt bildval',
        description:
          'Skapa sorteringsarbetsblad med exakt två kategorier — vänster och höger — med två distinkta vallägen. Temaläget låter dig välja ett tema för varje kategori (t.ex. Djur mot Mat, Land mot Vatten, Frukt mot Grönsaker), och appen väljer automatiskt 4–6 slumpmässiga bilder per tema från bildbiblioteket. Manuellt läge ger dig fullständig kontroll: handvälja enskilda bilder från valfritt tema och tilldela var och en till vänster eller höger kategori. Båda lägena producerar samma professionella sorteringslayout med kategoriramar och ett blandat utklippsrutnät, vilket ger dig maximal flexibilitet för olika produktstilar.',
      },
      {
        title: 'Konfigurerbart bildantal från 4 till 12 med 2–10 per kategori',
        description:
          'Kontrollera det totala antalet sorteringsbilder från minst 4 till maximalt 12 per arbetsblad, med varje kategori som innehåller mellan 2 och 10 bilder. Temaläget hämtar automatiskt 4–6 bilder per tema, vilket skapar arbetsblad med 8–12 bilder totalt. Manuellt läge låter dig ställa in exakta antal per kategori. Färre bilder skapar enklare sorteringsuppgifter idealiska för yngre användare; fler bilder ökar svårighetsgraden och innehållsdensiteten. Utklippsrutnätet justerar automatiskt sin kolumnlayout (3–4 kolumner baserat på totalt antal) för att bibehålla rent visuellt avstånd.',
      },
      {
        title: 'Automatiskt genererat facit med 6× större bilder i kategorirutor',
        description:
          'Varje sorteringsarbetsblad genererar automatiskt ett medföljande facit på en separat arbetsyteflik. Facit visar två kategorirutor (en per kategori, lika breda) med bilder sorterade i sin korrekta grupp — renderade med 6× storleken på utklippsrutnätets celler för tydlig, lättavläst verifiering. Varje kategoriruta använder maximalt 2 kolumner och behåller samma streckade ram-stil (#FAFAFA-fyllning, #444-streck, 12px kantradie). Ingen manuell sortering, ingen separat filskapning — facit förblir perfekt synkroniserat med arbetsbladets innehåll.',
      },
      {
        title: 'Lokaliserad \"Sortera bilder\"-rubrik med blågrön design på 11 språk',
        description:
          'Varje genererat arbetsblad inkluderar en stiliserad rubrik med mintgrön bakgrund (#4DB6AC), vit pillercontainer, blågrön titel (#00796B) i Fredoka Bold och orange beskrivning (#FF7043) i Quicksand. Stående arbetsblad visar en 100px rubrik med dynamisk titelstorlek (28–48px); liggande arbetsblad använder en kompakt 70px rubrik med 24–36px titel. Titeln \"Sortera bilder\" och beskrivningen \"Sortera bilderna i rätt grupper!\" översätts automatiskt till alla 11 stödda språk. En blågrön yttre ram (#26A69A, 8px streck, 12px radie) ramar in hela sidan.',
      },
      {
        title: 'Bildbibliotek med 104 tematiska samlingar och mer än 3 100 illustrationer',
        description:
          'Bläddra bland 104 tematiska bildsamlingar som täcker djur, mat, fordon, natur, yrken, högtider, sport, årstider och dussintals fler. Varje tema ger en koordinerad uppsättning färgglada illustrationer som fungerar som sorteringskategorier. Filtrera efter tema med dropdownen eller sök efter specifika bilder med nyckelord. Det temabaserade kategorivalet gör det enkelt att skapa sorteringsarbetsblad med naturliga kategorpar — landdjur mot havsdjur, hälsosam mat mot skräpmat, sommarföremål mot vinterföremål. Kommersiellt Paket inkluderar 10 färgglada teman; Full Access låser upp alla 104 teman för maximal kreativ variation.',
      },
      {
        title: 'Namn- och datumfält för produktlinjesansvar',
        description:
          'Kryssa i kryssrutan \"Inkludera Namn/Datum-fält\" i panelen Sidinställningar för att lägga till namn och datumlinjer på sorteringsarbetsbladet. Dessa fält säkerställer spårbarhet i produktlinjesmiljöer och gör arbetsbladen redo för säljarens insamling och bedömning utan ytterligare förberedelse. köpare som söker efter sorteringsaktiviteter värdesätter arbetsblad som anländer produktlinjesfärdiga, och namn/datum-alternativet gör dina produkter mer attraktiva för utbildningsmarknaden på Gumroad och Etsy.',
      },
      {
        title: 'Tryckfärdig PDF- och JPEG-export med 300 DPI och gråskaleväxling',
        description:
          'Ladda ner sorteringsarbetsblad och facit som högupplösta JPEG-bilder eller tryckfärdiga PDF-dokument renderade med 300 DPI med JPEG-kvalitet 1,0 och auto-orientering. Fyra dedikerade nedladdningsknappar exporterar Arbetsblad-JPEG, Facit-JPEG, Arbetsblad-PDF och Facit-PDF separat. Sidstorlekar inkluderar Letter Stående, Letter Liggande, A4 Stående, A4 Liggande, Kvadrat (1200×1200) och helt anpassade dimensioner. Växla gråskala för bläckvänliga versioner som sparar toner. Varje export är produktionsklar för digitala nedladdningar, tryckta arbetsböcker och produktlinjesutdelningar.',
      },
      {
        title: 'Full arbetsyteredigering med textverktyg, justering och lagerkontroller',
        description:
          'Fabric.js-arbetsytan ger komplett kontroll över varje element på ditt sorteringsarbetsblad. Dra, ändra storlek, rotera och flytta bilder, text och genererat innehåll fritt. Lagerkontroller hanterar staplingsordning — flytta element framåt eller skicka dem bakåt. Lås färdiga element medan du redigerar andra. Lägg till anpassad text med sju typsnittsalternativ (Lexend Deca, Baloo 2, Nunito, Quicksand, Fredoka, Arial, Verdana), justerbar storlek och färg, och textkonturbredd från 0 till 10 med 0,5-stegs granularitet. Sex justeringsalternativ plus centrera-på-sidan håller layouter exakta. Zooma från 25% till 300% för detaljarbete. Ångra och gör om upp till 20 historiksteg med Ctrl+Z och Ctrl+Y.',
      },
    ],
  },

  businessUseCases: {
    title: 'Hur du Säljer Bildsorteringsarbetsblad Online',
    cases: [
      {
        title: 'Tematiska sorteringsarbetsblad-paket på Etsy',
        description:
          'Skapa tematiska sorteringsaktivitetspaket med naturliga kategorpar från de 104 bildsamlingarna — djur mot mat, land mot vatten, frukt mot grönsaker, inomhus mot utomhus och dussintals fler. Varje temaparning producerar flera unika sorteringsarbetsblad genom att variera bildval och antal. Paketera 10–20 sorteringsarbetsblad per paket med facit inkluderade, och sälj till 30–70 SEK per paket. Det temabaserade kategorivalet gör det snabbt att generera arbetsblad med distinkta vänster/höger-grupperingar, och det automatiskt genererade facit eliminerar den största produktionsflaskhalsen.',
        platform: 'Etsy (etsy.com)',
      },
      {
        title: 'Klassificerings-arbetsböcker på Amazon KDP',
        description:
          'Sammanställ 40–80 sorteringsarbetsblad till en tryckt arbetsbok formaterad för Amazon KDP. Strukturera efter svårighet: tidiga kapitel använder 4–6 bilder med uppenbara kategoriskillnader (djur mot fordon), mellankapitel använder 8–10 bilder med subtilare distinktioner (husdjur mot vilda djur), och avancerade kapitel använder 12 bilder med utmanande kategorier. Inkludera facit i slutet av boken med den automatiskt genererade facitfunktionen. Gråskaleväxlingen producerar bläckvänliga sidor redo för svartvita bokinteriörer. Sorteringsarbetsböcker tjänar en bred publik från förskola till grundskola.',
        platform: 'Amazon KDP (kdp.amazon.com)',
      },
      {
        title: 'produktlinjes sorteringsaktiviteter för Gumroad',
        description:
          'Bygg färdiga sorteringsstationsarbetsblad med namn/datum-fält och tryckta facit. köpare som söker på Gumroad efter sorteringsaktiviteter värdesätter arbetsblad som anländer produktlinjesfärdiga — namnfältet säkerställer spårbarhet, kategoriramarna ger tydliga sorteringsmål, och det automatiskt genererade facit sparar säljarens förberedelsetid. Skapa produktkatalogsanpassade set: levande mot icke-levande, hälsosam mot ohälsosam mat, dag- mot nattdjur, varmt mot kallt väderklädsel. Varje set inkluderar arbetsblad och facit i både PDF- och JPEG-format.',
        platform: 'Gumroad (gumroad.com)',
      },
      {
        title: 'Säsongsbetonade och högtidssorteringssamlingar',
        description:
          'De 104 tematiska bildsamlingarna täcker varje säsongs- och högtidstillfälle — jul, halloween, påsk, alla hjärtans dag, skolstart, sommarlov och fler. Skapa säsongsbetonade sorteringsarbetsblad där användarna klassificerar högtidsföremål i kategorier: juldekorationer mot julmat, halloweenkostymer mot halloweengodis, sommaraktiviteter mot vinteraktiviteter. Släpp halloweensorteringspaket i september, julsamlingar i oktober och alla hjärtans dag-paket i januari. Säsongsprodukter motiverar högre priser under toppfönster och skapar naturliga skäl till återköp.',
        platform: 'Etsy / Amazon KDP / Gumroad (säsongsbetonat)',
      },
      {
        title: 'Flerspråkiga sorteringsarbetsblad för ESL och tvåspråkiga marknader',
        description:
          'Utnyttja de språkkänsliga kategorietiketterna för att skapa sorteringsarbetsblad på 11 språk. Samma bilder producerar olika kategorietiketter när du byter språk — bildnamn och \"Sortera bilder\"-rubriken uppdateras alla automatiskt. Skapa flerspråkiga sorteringspaket där varje språkversion använder samma tematiska bilder men lokaliserad text. Detta är särskilt värdefullt för ESL/EFL-säljare, tvåspråkiga produktlinje och internationella hemundervisningsfamiljer. Sälj språkspecifika paket eller flerspråkiga megapaket till premiumpriser på Etsy och Gumroad.',
        platform: 'Etsy / Gumroad (flerspråkig marknad)',
      },
    ],
  },

  faq: [
    {
      question: 'Hur fungerar tvåkategorisorteringsmekaniken?',
      answer:
        'Varje sorteringsarbetsblad har exakt två kategorier — vänster och höger. Arbetsbladet visar två streckade kategoriramar överst där användarna sorterar sina bilder, och ett blandat utklippsrutnät nedanför med alla bilder blandade. användarna klipper ut bilderna från rutnätet och placerar var och en i rätt kategoriruta. Tvåkategoriformat skapar en tydlig binär klassificeringsuppgift som fungerar för alla ämnen — djur mot mat, land mot vatten, levande mot icke-levande och tusentals andra parningar.',
    },
    {
      question: 'Vad är skillnaden mellan temaläge och manuellt läge?',
      answer:
        'Temaläget låter dig välja ett tema för den vänstra kategorin och ett annat tema för den högra kategorin. Appen väljer automatiskt 4–6 slumpmässiga bilder per tema från bildbiblioteket, vilket skapar arbetsblad med 8–12 bilder totalt. Manuellt läge ger dig fullständig kontroll: du handväljer enskilda bilder från valfritt tema och tilldelar var och en till vänster eller höger kategori. Temaläge är snabbare för bulkproduktion; manuellt läge är idealiskt för att skapa specifika, produktkatalogsanpassade sorteringsaktiviteter.',
    },
    {
      question: 'Hur många bilder kan jag inkludera på varje sorteringsarbetsblad?',
      answer:
        'Varje arbetsblad stöder 4 till 12 totala bilder, med varje kategori som håller mellan 2 och 10 bilder. Temaläget hämtar automatiskt 4–6 bilder per tema. Manuellt läge låter dig ställa in exakta antal per kategori. Utklippsrutnätet justerar sin kolumnlayout (3–4 kolumner baserat på antal) för att bibehålla rent visuellt avstånd. Färre bilder skapar enklare sorteringsuppgifter; fler bilder ökar svårighetsgraden.',
    },
    {
      question: 'Hur fungerar det blandade utklippsrutnätet?',
      answer:
        'Utklippsrutnätet upptar de nedre 55% av innehållsområdet och visar alla valda bilder i slumpmässig ordning. Bilder visas i vita celler med streckade #666-kanter och 4px rundade hörn, arrangerade i 3–4 kolumner baserat på det totala bildantalet. Varje bild fyller 85% av sin cell. användarna klipper ut bilderna längs de streckade linjerna och sorterar dem i rätt kategoriruta ovanför. Blandningen säkerställer att användarna faktiskt måste klassificera varje bild istället för att kopiera ett mönster.',
    },
    {
      question: 'Hur fungerar det automatiskt genererade facit?',
      answer:
        'Generatorn använder ett dubbelarbetsyte-system med en Arbetsbladsflik och en Facitflik. Facit visar två kategorirutor (en per kategori, lika breda) med bilder sorterade i sin korrekta grupp. Facitbilder renderas med 6× storleken på utklippsrutnätets celler för tydlig verifiering, med maximalt 2 kolumner per kategoriruta. Varje ruta använder #FAFAFA-fyllning med #444 streckad stroke och 12px kantradie. Båda versionerna exporteras separat med fyra dedikerade nedladdningsknappar.',
    },
    {
      question: 'Hur fungerar den lokaliserade rubriken?',
      answer:
        'Varje genererat arbetsblad inkluderar en stiliserad \"Sortera bilder\"-rubrik med mintgrön bakgrund (#4DB6AC), vit pillercontainer, blågrön titel (#00796B) i Fredoka Bold-typsnitt och orange beskrivning (#FF7043) i Quicksand-typsnitt. Stående arbetsblad visar en 100px rubrik; liggande arbetsblad använder en kompakt 70px rubrik. Titeln och beskrivningen översätts automatiskt till alla 11 stödda språk: engelska, tyska, franska, spanska, portugisiska, italienska, nederländska, svenska, danska, norska och finska.',
    },
    {
      question: 'Är Bildsortering Generatorn språkkänslig?',
      answer:
        'Ja. Kategorietiketter använder lokaliserade bildnamn från Bildbiblioteket, så att byta språk ändrar texten på arbetsbladet. Till exempel visas en kattbild som \"Katt\" på svenska men \"Cat\" på engelska och \"Katze\" på tyska. Den lokaliserade \"Sortera bilder\"-rubriken ändras också med det valda språket. Kommersiellt Paket inkluderar 10 färgglada teman; Full Access låser upp alla 104 teman och alla 11 språk för lokaliserade kategorietiketter.',
    },
    {
      question: 'Kan jag inkludera namn- och datumfält på sorteringsarbetsblad?',
      answer:
        'Ja. Kryssa i kryssrutan \"Inkludera Namn/Datum-fält\" i panelen Sidinställningar för att lägga till namn och datumlinjer på arbetsbladet. Dessa fält säkerställer spårbarhet i produktlinjesmiljöer och gör dina sorteringsarbetsblad redo för säljarens insamling och bedömning utan ytterligare förberedelse.',
    },
    {
      question: 'Finns det en gratis provversion?',
      answer:
        'Ja. Du kan använda alla funktioner — temabaserat och manuellt kategorival, konfigurerbara bildantal, det automatiskt genererade facit, hela bildbiblioteket, bakgrunds- och ramteman, namn/datum-fält och alla nedladdningsformat — utan att skapa ett konto, ange kreditkort eller installera programvara. Gratis provversion-nedladdningar innehåller en liten vattenstämpel. En kommersiell licens tar bort vattenstämpeln och ger fulla försäljningsrättigheter.',
    },
    {
      question: 'Kan jag lägga till bakgrundsteman och ramteman på sorteringsarbetsblad?',
      answer:
        'Ja. Panelen Sidinställningar inkluderar både en bakgrundstema-väljare med ett opacitetsreglage (0–1 i 0,05-steg) och en ramtema-väljare med sitt eget oberoende opacitetsreglage. Bakgrundsteman lägger till dekorativa mönster bakom sorteringsinnehållet, medan ramteman ramar in sidan. Båda har separata opacitetskontroller så du kan skapa subtila bakgrunder med framträdande ramar, eller valfri kombination som passar din design.',
    },
    {
      question: 'Kan jag sälja sorteringsarbetsblad skapade med detta verktyg på Etsy och Amazon KDP?',
      answer:
        'Ja. Med en kommersiell licens har du fulla rättigheter att sälja dina sorteringsarbetsblad som digitala nedladdningar på Etsy, som tryckta arbetsböcker på Amazon KDP, som produktlinjesresurser på Gumroad, eller genom valfri annan försäljningskanal. Tvåkategorisorteringsmekaniken, automatiskt genererade facit och 104 tematiska bildsamlingar ger dig de kreativa verktygen för att producera originella, säljbara sorteringsaktivitetsprodukter.',
    },
    {
      question: 'Vad är er återbetalningspolicy?',
      answer:
        'Eftersom den gratis provversionen ger dig tillgång till alla funktioner erbjuder vi inte återbetalning på köp av kommersiella licenser. Du kan testa temabaserat och manuellt kategorival, konfigurerbara bildantal, det automatiskt genererade facit, hela bildbiblioteket, bakgrunds- och ramteman, namn/datum-fält och alla nedladdningsformat innan du köper. Den gratis provversionen är återbetalningspolicyn — se till att verktyget passar dina behov innan du köper en licens.',
    },
    {
      question: 'Följer arbetsbladen Lgr22 (läroplanen)?',
      answer:
        'Sorterings-uppgifter stöder Lgr22:s centrala innehåll genom att träna klassificering, kategorisering och logiskt tänkande. Att sortera bilder i grupper efter gemensamma egenskaper är en grundläggande färdighet i kursplanen för matematik och NO. Du väljer bildteman och kategorier för att koppla till aktuella arbetsområden.',
    },
    {
      question: 'Passar uppgifterna för förskoleklass, lågstadiet och mellanstadiet?',
      answer:
        'Ja. Svårighetsgraden styrs av antalet kategorier och bildernas likhet. För förskoleklass (6 år) fungerar enkel sortering i 2 grupper med tydliga skillnader. För lågstadiet (åk 1-3) kan du använda 3-4 kategorier med mer subtila egenskaper. För mellanstadiet (åk 4-6) skapar du komplexa klassificeringsuppgifter med överlappande kategorier.',
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
      slug: 'skuggmatchning-arbetsblad',
      anchorText: 'Skuggmatchning Arbetsblad Generator',
    },
    {
      pageType: 'app',
      slug: 'bildlotto-arbetsblad',
      anchorText: 'Bildbingo Kort Generator',
    },
    {
      pageType: 'app',
      slug: 'hitta-och-rakna-arbetsblad',
      anchorText: 'Hitta och Räkna Arbetsblad Generator',
    },
    {
      pageType: 'app',
      slug: 'malarbilder-arbetsblad',
      anchorText: 'Målarbilder Arbetsblad Generator',
    },
    {
      pageType: 'bundle',
      slug: 'matchning-sortering-paket',
      anchorText: 'Matchning och Sortering Paket — Alla Matchningsappar i Ett',
    },
    {
      pageType: 'guide',
      slug: 'skapa-sorteringsarbetsblad',
      anchorText: 'Hur du Skapar Sorteringsarbetsblad som Säljer',
    },
    {
      pageType: 'idea',
      slug: 'camping-utskriftsbara-ideer',
      anchorText: 'Camping Utskriftsbara Idéer för Utomhuslärande',
    },
    {
      pageType: 'idea',
      slug: 'havsdjur-utskriftsbara-ideer',
      anchorText: 'Havsdjur Utskriftsbara Idéer för Marina Teman',
    },
    {
      pageType: 'start',
      slug: 'marknadsforing-utskriftsbart-foeretag',
      anchorText: 'Marknadsföring av Ditt Utskriftsbart Företag',
    },
  ],

  visuals: {
    heroImages: {
      primary: '/samples/swedish/picture%20sort/sortera-bilder-1.webp',
      primaryAlt: 'Tvåkategori bildsorteringsarbetsblad med tematiska kategoriramar, blandat utklippsrutnät och lokaliserad Sortera bilder-rubrik',
    },
    sampleGallery: [
      {
        src: '/samples/swedish/picture%20sort/sortera-bilder-2.webp',
        alt: 'Temaläge sorteringsarbetsblad med djur till vänster och mat till höger kategorier',
        caption: 'Temaläge — automatiskt fyllda kategorier från bildbiblioteket',
      },
      {
        src: '/samples/swedish/picture%20sort/sortera-bilder-3.webp',
        alt: 'Manuellt läge sorteringsarbetsblad med handvalda bilder tilldelade till vänster och höger kategorier',
        caption: 'Manuellt läge — handvälja bilder och tilldela till kategorier',
      },
      {
        src: '/samples/swedish/picture%20sort/sortera-bilder-1-answer-key-2026-01-02.webp',
        alt: 'Bildsortering facit med 6x större bilder organiserade i korrekta kategorirutor',
        caption: 'Automatiskt genererat facit — 6× större bilder i kategorirutor',
      },
    ],
    youtubeId: '9kzmlABtNVQ',
    videoTitle: 'Hur du Skapar Bildsorteringsarbetsblad med Tvåkategorisortering och Automatiska Facit — Steg-för-Steg Handledning',
  },
};

export default content;
