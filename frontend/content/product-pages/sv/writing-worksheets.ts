import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Writing Worksheets - Swedish Content
 *
 * File: frontend/content/product-pages/sv/writing-worksheets.ts
 * URL: /sv/apps/skrivovningar-arbetsblad (Swedish SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Swedish/writing.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 */

export const writingSvContent: ProductPageContent = {
  // SEO Metadata - Swedish language-specific
  seo: {
    slug: 'skrivovningar-arbetsblad',
    appId: 'writing-app',
    title: 'Skriva Bokstäver Arbetsblad - Bokstäver Lära Sig Förskoleklass Material - Finmotorik Övningar Gratis',
    description: 'Skapa professionella arbetsblad för skrivövning med vår handstilsgenerator. Full Tillgång-prenumeration ger dig obegränsad åtkomst till alla 33 verktyg för $240 per år. Generera anpassade arbetsblad för att skriva bokstäver perfekta för förskoleklass, årskurs 1 och årskurs 2.',
    keywords: 'skriva bokstäver, arbetsblad gratis, förskoleklass material, finmotorik övningar, bokstäver lära sig, handstilsövningar, skrivarbetsblad, spårningsövningar, matematik arbetsblad, målarbilder barn',
    canonicalUrl: 'https://www.lessoncraftstudio.com/sv/apps/skrivovningar-arbetsblad',
  },

  // Hero Section - FULL text from writing.md paragraphs 1-4
  hero: {
    title: 'Skriva Bokstäver',
    subtitle: 'Bokstäver Lära Sig Förskoleklass Material',
    description: `Skapa professionella arbetsblad för skrivövning med vår handstilsgenerator. Full Tillgång-prenumeration ger dig obegränsad åtkomst till alla 33 verktyg för $240 per år eller $25 per månad. Generera anpassade arbetsblad för att skriva bokstäver perfekta för förskoleklass, årskurs 1 och årskurs 2. Ladda ner högkvalitativa PDF-arbetsblad på under 3 minuter.

Vår generator för skrivarbetsblad kombinerar handstilsövning med bokstavsträning. Perfekt för att lära sig bokstäver i förskoleklass. Skapa spårningsövningar i både textstil och skrivstil. Varje arbetsblad kan anpassas helt med egna bilder, teman och text. Idealiskt för förskoleklass material och finmotorik övningar.

Skrivövning är grundläggande för tidiga läsare. Arbetsblad gratis att skapa när du har en prenumeration. Inga avgifter per arbetsblad. Generera obegränsat med arbetsblad för bokstäver lära sig. Kombinera handstilsövningar med teman från vårt bildbibliotek med över 3000 barnvänliga bilder. Exportera som högupplösta PDF-filer eller JPEG-bilder för perfekt utskrift.

Full Tillgång-prenumeration inkluderar kommersiell licens. Sälj dina skrivarbetsblad på Etsy, Teachers Pay Teachers eller Amazon KDP. Professionell 300 DPI-kvalitet garanterar skarp utskrift. Gråskalealternativ sparar bläck vid utskrift i klassrummet. Stöd för 11 språk gör detta verktyg perfekt för svenska lärare och internationella skolor.`,
    previewImageSrc: '/samples/english/writing/writing.jpeg',
    ctaLabels: {
      tryFree: 'Prova Gratis',
      viewSamples: 'Visa Exempel',
    },
    trustBadges: {
      languages: '11 Språk',
      images: '3000+ Bilder',
      license: 'Kommersiell Licens',
    },
    readMoreLabel: 'Läs mer',
    showLessLabel: 'Visa mindre',
    floatingStats: {
      time: '3 min',
      action: 'Skapa & Ladda Ner',
      quality: '300 DPI',
    },
  },

  // Sample Gallery - REAL file paths from samples/english/writing/
  samples: {
    sectionTitle: 'Skrivarbetsblad Exempel',
    sectionDescription: 'Ladda ner gratis exempelarbetsblad för att se vår professionella kvalitet',
    downloadLabel: 'Ladda Ner Gratis Exempel',
    worksheetLabel: 'Arbetsblad',
    answerKeyLabel: 'Facit',
    viewAllLabel: 'Visa större',
    noPdfLabel: 'Endast förhandsgranskning',
    freePdfCountLabel: 'gratis nedladdningar',
    badgeText: 'Gratis Exempel',
    downloadingLabel: 'Laddar ner...',
    ofLabel: 'av',
    items: [
      {
        id: '1',
        worksheetSrc: '/samples/english/writing/writing.jpeg',
        answerKeySrc: '/samples/english/writing/writing.jpeg',
        altText: 'Bokstavsspårning arbetsblad med guidelinjer för förskoleklass handstilsövning',
        pdfDownloadUrl: '/samples/english/writing/writing.pdf',
      },
      {
        id: '2',
        worksheetSrc: '/samples/english/writing/writing custom.jpeg',
        answerKeySrc: '/samples/english/writing/writing custom.jpeg',
        altText: 'Anpassad text spårningsarbetsblad för personlig handstilsövning',
        pdfDownloadUrl: '/samples/english/writing/writing custom.pdf',
      },
      {
        id: '3',
        worksheetSrc: '/samples/english/writing/writing beginning letter.jpeg',
        answerKeySrc: '/samples/english/writing/writing beginning letter.jpeg',
        altText: 'Begynnelsebokstav spårningsarbetsblad med bildprompt för alfabetinlärning',
        pdfDownloadUrl: '/samples/english/writing/writing beginning letter.pdf',
      },
    ],
  },

  // Features Grid - FULL text from writing.md feature sections
  features: {
    sectionTitle: 'Skrivarbetsblad Funktioner - Allt du Behöver för Bokstäver Lära Sig och Finmotorik Övningar',
    sectionDescription: 'Vår generator för skrivarbetsblad kombinerar kraftfulla funktioner med enkel användning. Perfekt för förskoleklass material och lågstadiet. Skapa professionella arbetsblad för att skriva bokstäver på minuter. Varje funktion är utformad för att spara tid för lärare samtidigt som du levererar högkvalitativa arbetsblad gratis när du väl har din prenumeration. Full anpassningsförmåga gör varje arbetsblad unikt för dina elevers behov.',
    highlightBadgeText: 'Nyckelfunktion',
    readMoreLabel: 'Läs mer',
    showLessLabel: 'Visa mindre',
    badgeText: 'Funktioner',
    trustBadges: {
      allFeatures: 'Alla funktioner ingår',
      noHiddenFees: 'Inga dolda avgifter',
      cancelAnytime: 'Avsluta när som helst',
    },
    items: [
      {
        id: '1',
        icon: '⚡',
        title: 'Skapa Skrivarbetsblad på 3 Klick - Snabb Förskoleklass Material Generator',
        description: `Skapa professionella skrivarbetsblad på under 3 minuter. Välj först typ av rad: spårning, tonad spårning eller guidad kopiering. Välj sedan teckensnittsstil: textstil vanlig, textstil med pilar, spårningsteckensnitt eller handstil. Lägg till rader för bokstäver lära sig. Klicka på generera och ditt arbetsblad visas direkt. Perfekt för förskoleklass och årskurs 1-2.

Varje skrivrad kan anpassas individuellt. Välj innehåll: tomt, begynnelsebokstav, helt filnamn eller anpassad text. Välj skiftläge: versaler, gemener eller titelfall. För finmotorik övningar, lägg till streckövningar med vertikala linjer, horisontella linjer, cirklar eller sicksacklinjer. Lägg till obegränsat antal rader. Varje rad är helt redigerbar på arbetsytan.

Enkel gränssnittsdesign gör skapandet intuitivt. Inga designkunskaper krävs. Klicka helt enkelt på knappar och se ditt arbetsblad ta form. Ladda till och med upp egna bilder för personliga teman. Kombinera skrivövningar med bilder från vårt bibliotek med över 3000 barnvänliga illustrationer. Exportera som PDF eller JPEG på sekunder.`,
        highlighted: false,
      },
      {
        id: '2',
        icon: '✏️',
        title: 'Redigera Allt på Din Arbetsyta - Fullständig Anpassning för Arbetsblad Gratis',
        description: `Varje element på ditt skrivarbetsblad är helt redigerbart. Dra, rotera, ändra storlek eller ta bort vilken del som helst. Klicka på vilken skrivrad som helst för att justera innehållet. Ändra teckensnitt, storlek eller stil när som helst. Flytta rader uppåt eller nedåt för perfekt avstånd. Lås element för att förhindra oavsiktliga ändringar.

Lägg till anpassade textelement var som helst på arbetsytan. Perfekt för rubriker, instruktioner eller elevnamn. Välj bland 7 olika teckensnittsfamiljer. Justera teckenstorlek från 8px till stora visningsrubriker. Ändra textfärg och lägg till konturer för bättre läsbarhet. Varje textblock kan flyttas och storleksändras fritt.

Avancerade justeringsverktyg ger professionell layout. Justera vänster, centrera horisontellt eller justera höger för flera objekt. Justera topp, centrera vertikalt eller justera botten. Centrera på sidan horisontellt eller vertikalt med ett klick. Hantera lagring med skicka framåt och skicka bakåt-knappar. Skapa perfekt balanserade arbetsblad för bokstäver lära sig.

Zoomfunktionen gör detaljarbete enkelt. Zooma in för exakt placering. Zooma ut för att se helheten. Återställ zoom till 100% när som helst. Rulla-och-släpp-redigeringen känns naturlig och responsiv. Ångra och gör om-funktionen sparar dig från misstag. Skapa professionella arbetsblad gratis per arbetsblad när du väl har din Full Tillgång-prenumeration.`,
        highlighted: false,
      },
      {
        id: '3',
        icon: '📤',
        title: 'Ladda Upp Egna Bilder - Anpassade Finmotorik Övningar och Förskoleklass Material',
        description: `Ladda upp dina egna foton och illustrationer för helt personliga skrivarbetsblad. Stöd för flera filer låter dig ladda upp dussintals bilder samtidigt. Accepterar alla vanliga format: JPEG, PNG, GIF och mer. Kombinera uppladdade bilder med vårt bibliotek med 3000+ bilder för obegränsade kreativa möjligheter.

Använd elevfoton för namnskrivningsövningar. Ladda upp klassrumsföremål för ordassociationsarbetsblad. Inkludera temabilder från ditt klassrumskurrikulum. Perfekt för tematiska enheter eller säsongsmaterial. Varje uppladdad bild blir ett redigerbart element på arbetsytan. Dra, ändra storlek eller rotera efter behov.

Uppladdade bilder lagras under din session. Lägg till dem på flera arbetsblad utan att ladda upp igen. Klicka på "Lägg till vald bild" för att placera bilder på arbetsytan. Kombinera med skrivraderna för sammanhängande bokstäver lära sig-aktiviteter. Skapa arbetsblad som matchar exakt vad du undervisar om.

Bilduppladningssystemet är säkert och privat. Dina bilder delas aldrig med andra användare. Perfekt för att skapa skolspecifika material. Använd logotyper, maskotar eller klassrumsfoton. Skapa verkligt unika förskoleklass material som eleverna älskar. Inga gränser för hur många bilder du kan ladda upp.`,
        highlighted: false,
      },
      {
        id: '4',
        icon: '🌍',
        title: 'Stöd för 11 Språk - Flerspråkiga Arbetsblad för Bokstäver Lära Sig',
        description: `Skapa skrivarbetsblad på 11 olika språk: svenska, engelska, tyska, franska, spanska, italienska, portugisiska (brasiliansk), nederländska, danska, norska och finska. Gränssnittet översätts helt på ditt valda språk. Perfekt för svenska lärare som undervisar i flerspråkiga klassrum eller internationella skolor.

Alfabetsträning fungerar på alla 11 språk. Skapa arbetsblad för svenska bokstäver eller utländska alfabeten. Idealiskt för språklärare som undervisar svenska som andraspråk eller utländska språk. Varje språk behåller korrekt teckenrendering inklusive specialtecken. Svenska tecken å, ä och ö renderas perfekt.

Flerspråkigt stöd gör detta verktyg ovärderligt för ESL-undervisning. Skapa jämförande arbetsblad som visar alfabeten sida vid sida. Undervisa utländska utbyteselever med material på deras modersmål. Internationella skolor kan skapa konsekventa arbetsblad gratis att skapa på alla språk deras elever talar.

Språkväljaren byter omedelbart gränssnittsspråk. Alla knappar, menyer och instruktioner översätts. Inga språkbarriärer för internationella lärare. Skapa professionella arbetsblad för bokstäver lära sig oavsett vilket språk du undervisar. Ett verktyg för alla dina flerspråkiga klassrumsbehov.`,
        highlighted: false,
      },
      {
        id: '5',
        icon: '💰',
        title: 'Kommersiell POD-licens - Sälj Dina Skrivarbetsblad på Teachers Pay Teachers',
        description: `Full Tillgång-prenumeration inkluderar fullständig kommersiell print-on-demand-licensiering utan extra kostnad. Sälj dina skrivarbetsblad på Etsy, Teachers Pay Teachers eller Amazon KDP. Ingen attribution krävs. Perfekt för lärarföretagare som vill bygga ett arbetsbladsbibrary för försäljning. Professionell 300 DPI-kvalitet garanterar dina produkter ser professionella ut.

Många lärare tjänar $500-$5000 per månad genom att sälja arbetsblad. Skapa temapaket för förskoleklass: bokstäver lära sig, finmotorik övningar och handstilsövningar. Kombinera skrivarbetsblad med våra andra 32 generatorer för kompletta läropaket. Sälj till svenska lärare, internationella skolor eller flerspråkiga marknader.

Kommersiell licens täcker alla försäljningskanaler. Ladda upp till Teachers Pay Teachers som PDF-produkter. Lista på Etsy som ögonblickliga digitala nedladdningar. Skapa låginnehållsböcker för Amazon KDP med dina arbetsblad. Använd till och med i prenumerationsbaserade medlemskapssajter. Inga begränsningar på hur du säljer.

Spara $100-200 per år jämfört med konkurrenter. Många plattformar tar extra betalt för kommersiella licenser. LessonCraft Studio inkluderar det i din $240/år prenumeration. Skapa obegränsat med arbetsblad gratis per arbetsblad. Sälj tusentals arbetsblad med en enda prenumerationskostnad. Maximera din vinst samtidigt som du levererar kvalitet.`,
        highlighted: true,
      },
      {
        id: '6',
        icon: '🎨',
        title: '3000+ Bildbibliotek - Temabaserade Målarbilder Barn och Illustrationer',
        description: `Få tillgång till över 3000 barnvänliga bilder organiserade efter tema. Sök efter kategorier som djur, mat, fordon, natur och mer. Varje bild är noggrant vald för att vara ålderslämplig för förskoleklass till årskurs 3. Perfekt för att skapa tematiska skrivarbetsblad som engagerar unga elever.

Temabaserad organisation gör det enkelt att hitta exakt rätt bild. Välj ett tema så får du dussintals relaterade bilder. Sökfunktionen filtrerar bilder efter filnamn. Hitta snabbt vad du behöver bland tusentals alternativ. Miniatyrförhandsgranskningar visar varje bild innan du lägger till den på ditt arbetsblad.

Biblioteket inkluderar också bakgrunds- och ramteman. Lägg till dekorativa bakgrunder med opacitetskontroll. Välj temaramar för att rama in ditt arbetsblad. Justera opacitet från 0-100% för perfekt visuell balans. Bakgrunder och ramar ger dina arbetsblad professionellt utseende utan designkunskaper.

Alla bilder inkluderas utan extra avgifter. Konkurrenter tar ofta betalt per bild eller per mall. LessonCraft Studio ger dig hela biblioteket med din prenumeration. Använd så många bilder du vill på varje arbetsblad. Skapa visuellt rika förskoleklass material utan att oroa dig för extra kostnader. Verkligt obegränsat skapande.`,
        highlighted: false,
      },
      {
        id: '7',
        icon: '🖨️',
        title: 'Professionell 300 DPI-kvalitet - Högupplösta PDF- och JPEG-arbetsblad',
        description: `Exportera dina skrivarbetsblad som högupplösta PDF- eller JPEG-filer. Professionell 300 DPI-rendering garanterar skarpa linjer och tydliga bokstäver. Perfekt för utskrift hemma, i klassrummet eller för professionell publicering. Varje skrivrad renderas kristallklart för optimal spårbarhet.

PDF-export respekterar din valda sidstorlek. Välj Letter Portrait, Letter Landscape, A4 Portrait, A4 Landscape eller anpassade dimensioner. PDF-filer centreras perfekt med korrekta marginaler. Professionell kvalitet lämplig för försäljning på Teachers Pay Teachers eller Etsy. Varje export är utskriftsklar.

JPEG-export ger full upplösning för digital användning. Dela via e-post till föräldrar. Ladda upp till Google Classroom eller Seesaw. Inkludera i digitala läroböcker eller presentationer. JPEG-filer behåller varje detalj. Perfekt för förskoleklass material som delas digitalt.

Gråskalealternativet konverterar alla färger till gråskala. Spara betydande bläck när du skriver ut dussintals kopior. Svart-vita utskrifter fungerar lika bra för skrivövningar. Eleverna fokuserar på bokstavsformning, inte färger. Gråskala håller fortfarande professionellt utseende.

Exportprocessen tar sekunder. Din fil genereras och laddas ner automatiskt. Filnamnet inkluderar datum och tid för enkel organisation. Spara filer lokalt eller till molnlagring. Skriv ut omedelbart eller spara för framtida användning. Skapa och exportera flera arbetsblad gratis per arbetsblad på bara några minuter med din Full Tillgång-prenumeration.`,
        highlighted: true,
      },
    ],
  },

  // How-To Guide - FULL text from writing.md step sections
  howTo: {
    sectionTitle: 'Hur man Skapar Skrivarbetsblad för Bokstäver Lära Sig i 5 Enkla Steg',
    sectionDescription: 'Skapa professionella skrivarbetsblad på under 3 minuter med vår steg-för-steg-guide. Perfekt för förskoleklass material och finmotorik övningar. Ingen erfarenhet krävs. Varje steg är intuitivt och enkelt att följa. Från att välja radtyp till att ladda ner din färdiga PDF tar hela processen mindre tid än att göra kaffe. Följ dessa 5 enkla steg för att skapa arbetsblad gratis när du väl har din prenumeration.',
    ctaText: 'Börja Skapa Nu',
    badgeText: 'Så Fungerar Det',
    stepLabel: 'Steg',
    completionTitle: 'Klart!',
    completionSubtitle: 'Ditt arbetsblad är redo',
    readyTime: 'Klart på under 3 minuter',
    noSkillsNeeded: 'Inga designkunskaper behövs',
    readMoreLabel: 'Läs mer',
    showLessLabel: 'Visa mindre',
    steps: [
      {
        id: '1',
        number: 1,
        title: 'Välj Radtyp och Teckensnitt - Skapa Förskoleklass Material för Bokstäver Lära Sig',
        description: `Börja genom att klicka på "Lägg till rad"-knappen för att skapa din första skrivrad. Välj radtyp från rullgardinsmenyn: Spårning, Tonad spårning eller Guidad kopiering. Spårning visar hela bokstäver för fullständig spårning. Tonad spårning visar halvgenomskinliga guidebokstäver. Guidad kopiering visar första bokstaven helt och resten tonade. Varje radtyp stöder olika inlärningsnivåer.

Välj sedan teckensnittsstil från fem alternativ. Textstil vanlig ger grundläggande tryckbokstäver. Textstil med pilar visar pennstreckordning. Spårningsteckensnitt ger prickade bokstäver att spåra över. Spårningsteckensnitt med pilar kombinerar prickar med pennstrecksvägledning. Handstil använder vackra Great Vibes-typsnittet för kursivsövning. Perfekt för bokstäver lära sig i alla stadier.

Varje teckensnitt renderas med perfekt klarhet. Tryckbokstäver använder högkvalitativa SVG-bilder. Handstilsteckensnittet laddas från Google Fonts. Alla bokstäver justeras korrekt på baslinjen. Inklusive svenska specialtecken å, ä och ö renderas perfekt. Lägre rader visar översta, mellersta och nedre guidelinjer för korrekt bokstavsform.

Lägg till så många rader du behöver. Klicka bara på "Lägg till rad" igen för fler skrivlinjer. Varje rad är oberoende anpassningsbar. Blanda radtyper på samma arbetsblad. Kombinera tryckbokstäver och handstil för varierad övning. Skapa arbetsblad som progressivt ökar i svårighet. Förskoleklass material har aldrig varit enklare att skapa.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Anpassa Radinnehåll och Inställningar - Finmotorik Övningar och Arbetsblad Gratis',
        description: `Välj vad varje rad ska visa från innehållsrullgardinsmenyn. Alternativet "Tomt" skapar rader med endast guidelinjer för fri övning. "Begynnelsebokstav" visar första bokstaven från vald bild. "Helt filnamn" visar hela bildfilnamnet som text. "Anpassad text" låter dig skriva exakt vad som helst du vill att eleverna ska spåra.

Välj skiftläge för dina bokstäver. Versaler skapar stora bokstäver perfekt för nybörjare. Gemener ger små bokstäver för mer avancerade skribenter. Titelfall kapitaliserar första bokstaven i varje ord. Varje skiftläge renderas korrekt med rätt bokstavsproportioner. Idealiskt för att lära sig både stor och liten bokstavsform.

För finmotorik övningar, lägg till streckövningar. Välj strecktyp: Vertikal linje, Horisontell linje, Cirkel eller Sicksacklinje. Streckövningar hjälper små barn utveckla penngrepp innan bokstavsformning. Perfekt för förskolebarn som fortfarande bygger handhållfasthet. Kombinera streckövningar med bokstäver lära sig för komplett handstilskurrikulum.

Anpassad text-alternativet ger obegränsat flexibilitet. Skriv elevnamn för namnsspårningsövning. Ange högfrekventa ord för ordkännedomsträning. Inkludera enkla meningar för meningsövning. Varje rad kan ha olika anpassad text. Skapa arbetsblad som exakt matchar din lektionsplan. Inga mallar att köpa - arbetsblad gratis att skapa på vilket innehåll som helst.

Siduppsättningsinställningar låter dig välja sidstorlek. Letter Portrait och Landscape för amerikanska skrivare. A4 Portrait och Landscape för europeiska standarder. Eller anpassad storlek för specialformat. Lägg till bakgrundsteman för visuellt intresse. Välj ramar för professionell finish. Justera opacitet så att bakgrunder inte stör läsbarheten.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Generera och Förhandsgranska Ditt Arbetsblad - Skapa Arbetsblad för Förskoleklass Material',
        description: `När alla rader är konfigurerade, klicka helt enkelt "Generera" (eller raderna visas automatiskt när du lägger till dem). Ditt arbetsblad renderas omedelbart på arbetsytan. Varje skrivrad visar exakt vad du konfigurerade. Guidelinjer visas i ljusgrått. Bokstäver placeras korrekt mellan linjerna. Hela förhandsgranskningar ser ut exakt som den slutliga utskriften.

Förhandsgranskningsarbetsytan är helt interaktiv. Zooma in för att inspektera bokstavsdetaljer. Zooma ut för att se layouten för hela sidan. Zoomkontroller ger 50% till 200% skala. Återställningsknappen återgår till 100% visning. Perfekt för att säkerställa att varje detalj är korrekt innan du laddar ner.

Om du valde bildläge från biblioteket, visas din valda bild på arbetsytan. Bilden placeras som ett redigerbart element. Du kan flytta, ändra storlek eller rotera den. Kombinera bilden med skrivraderna för tematisk sammanhängande övning. Perfekt för bokstäver lära sig kopplad till ordförråd - bild av ett äpple med "ÄPPLE" spårningtext.

Förhandsgranskningsstadiet låter dig fånga fel tidigt. Se om textens svårighetsgrad matchar din klass. Kontrollera att radavstånd ser bra ut. Verifiera att specialtecken renderas korrekt. Gör ändringar innan du exporterar. Spara tid genom att få allt rätt i förhandsgranskningsstadiet.

Lägg till ytterligare element om det behövs. Klicka på "Lägg till text" för anpassade rubriker. Ladda upp ytterligare bilder för dekorativa element. Välj olika bakgrund om det nuvarande temat inte passar. Förhandsgranskningsarbetsytan ger fullständig kreativ kontroll. Experimentera tills du är helt nöjd med layouten.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Redigera på Arbetsytan - Anpassa Arbetsblad Gratis för Finmotorik Övningar',
        description: `Klicka på vilken skrivrad som helst för att välja den. Valda rader visar blå kantlinje. Dra rader uppåt eller nedåt för att justera avstånd. Ändra storlek på rader genom att dra hörna-hanteraren. Radhöjd justeras automatiskt och bokstäver skalas proportionellt. Behåll guidelinjer alltid korrekt placerade oavsett radhöjd.

Använd justeringsverktygen för perfekt placering. Markera flera rader med skift-klick. Justera vänster för att raduppställa alla vänsterkanter. Centrera horisontellt för att placera rader i sidans mitt. Justera radsavstånd genom att ställa in ett jämnt vertikalt mellanrum. Professionellt utseende uppnås med exakt justering.

Textverktyg låter dig lägga till rubriker och instruktioner. Klicka "Lägg till text till arbetsblad" efter att ha skrivit din text. Välj textfärg, teckensnittsstorlek och teckensnittsfamilj. Välj mellan Arial, Verdana, Lexend Deca, Baloo 2, Nunito, Quicksand eller Fredoka. Lägg till konturer för att få text att hoppa ut. Perfekt för att lägga till elevnamn eller uppgiftsinstruktioner.

Bildhantering ger visuell flexibilitet. Dra uppladdade bilder var som helst på arbetsytan. Ändra storlek på bilder för att passa ditt layout. Placera bilder vid sidan av skrivraderna för ordassociation. Eller lägg till dekorativa bilder i hörnen. Varje bild kan låsas för att förhindra oavsiktlig förflyttning.

Lagerkontroller hanterar överlappande element. Klicka "Skicka framåt" för att flytta element ovanför andra. Klicka "Skicka bakåt" för att flytta element bakom. Positionera bakgrunder längst bak. Håll text och skrivraderna längst fram för läsbarhet. Perfekt lagerhantering ger professionella resultat varje gång.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Ladda Ner och Skriv Ut - Högkvalitativa PDF och JPEG Arbetsblad för Bokstäver Lära Sig',
        description: `När ditt arbetsblad är perfekt, klicka på "Ladda ner"-knappen. Välj PDF eller JPEG från rullgardinsmenyn. Kontrollera gråskalealternativet om du vill spara bläck. PDF-export skapar professionella utskriftsklara filer. JPEG-export ger högupplösta bildfiler för digital delning.

PDF-filer respekterar exakt din sidstorlek. Letter-format centreras perfekt på Letter-papper. A4-format passar europiska standardskrivare. Anpassade storlekar fungerar precis som definierat. Varje PDF renderas vid 300 DPI för skarp utskriftskvalitet. Bokstäver är kristallklara och guidelinjer är perfekt raka.

JPEG-export ger full upplösning för digital användning. Dela via e-post till föräldrar. Ladda upp till Google Classroom eller Seesaw. Inkludera i digitala läroböcker eller presentationer. JPEG-filer behåller varje detalj. Perfekt för förskoleklass material som delas digitalt.

Gråskalealternativet konverterar alla färger till gråskala. Spara betydande bläck när du skriver ut dussintals kopior. Svart-vita utskrifter fungerar lika bra för skrivövningar. Eleverna fokuserar på bokstavsformning, inte färger. Gråskala håller fortfarande professionellt utseende.

Exportprocessen tar bara sekunder. Din fil genereras och laddas ner automatiskt. Filnamnet inkluderar datum och tid för enkel organisation. Spara filer lokalt eller till molnlagring. Skriv ut omedelbart eller spara för framtida användning. Skapa och exportera flera arbetsblad gratis per arbetsblad på bara några minuter med din Full Tillgång-prenumeration.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from writing.md use case sections
  useCases: {
    sectionTitle: 'Perfekt för Lärare och Föräldrar - Bokstäver Lära Sig och Finmotorik Övningar för Alla Behov',
    sectionDescription: 'Vår generator för skrivarbetsblad tjänar olika användare inom utbildning och föräldraskap. Från förskoleklasspedagoger till lärarföretagare, varje grupp hittar unika fördelar. Skapa arbetsblad gratis per arbetsblad när du väl har din prenumeration. Förskoleklass material och lågstadiematerial skapas på minuter. Varje användargrupp får exakt vad de behöver för sina specifika undervisningssituationer.',
    badgeText: 'Vem Det Är För',
    readMoreLabel: 'Läs mer',
    showLessLabel: 'Visa mindre',
    items: [
      {
        id: '1',
        icon: '👶',
        title: 'Förskoleklasspedagoger - Skrivarbetsblad för Bokstäver Lära Sig och Finmotorik Övningar',
        subtitle: 'Finmotorik Övningar för Barn 5-6 År',
        description: `Förskoleklasspedagoger undervisar 6-åringar som förbereder sig för årskurs 1. Dessa elever behöver fokuserade finmotorik övningar för att utveckla penngrepp. Streckövningar bygger handhållfasthet. Vertikal och horisontell linjeträning kommer före bokstavsformning. Cirkelövningar utvecklar handledsrotation. Sicksacklinjer kombinerar riktningsförändringar.

Bokstäver lära sig börjar med versaler eftersom de är enklare att forma. Använd spårningsläge med stora bokstäver för första försöken. Tonad spårningsläge ger stöd när eleverna blir säkrare. Guidad kopieringsläge utmanar elever att skriva oberoende. Varje rad kan anpassas för individuell differentiering baserat på elevens framsteg.

Svenska förskoleklass följer Lgr22-läroplanen. Handstilsutveckling är en kärnkompetens. Skapa arbetsblad som matchar läroplansresultaten. Använd temabilder som ansluter till årstider eller ämnesenheter. Kombinera bokstavsspårning med ordförrådsbyggande. Bild av ett äpple med "ÄPPLE" ger sammanhängande inlärning.

Förskoleklasspedagoger värderar snabbt skapande. Förbered veckans arbetsblad på söndagskvällen. Skapa differentierade versioner för olika färdighetsnivåer. Vissa elever spårar medan andra kopierar självständigt. Arbetsblad gratis att skapa på vilket innehåll som helst gör veckoplanering enklare. Spara tid samtidigt som du tillhandahåller högkvalitativa förskoleklass material.`,
        quote: 'Mina elever älskar att spåra sina egna namn!',
      },
      {
        id: '2',
        icon: '📚',
        title: 'Lågstadielärare - Arbetsblad Gratis för Årskurs 1-3 Skrivträning',
        subtitle: 'Handstilsövningar för Årskurs 1-3',
        description: `Lågstadielärare (årskurs 1-3) behöver progressiva skrivarbetsblad. Första klassare börjar med grundläggande bokstavsspårning. Andra klassare övergår till kursivshandstil. Tredjeklassare övar meningsskrivning och textflyt. Varje årskurs kräver olika svårighetsgrad och radkonfigurationer.

Årskurs 1-lärare fokuserar på korrekt bokstavsformning. Använd textstilar med pilar för att visa pennstreckordning. Eleverna lär sig var de ska börja varje bokstav. Guidelinjer visar korrekt höjd och placering. Svenska specialbokstäver å, ä och ö kräver extra övning. Skapa dedikerade arbetsblad för dessa utmanande bokstäver.

Årskurs 2 introducerar kursivshandstil i många svenska skolor. Handstilsläget använder Great Vibes-typsnittet för vacker kursivövning. Börja med enkla ord och framskrida till meningar. Elever övergår från spårning till oberoende skrivning. Tonad spårning ger dämpat stöd när säkerheten växer.

Årskurs 3-lärare behöver meningsspårningsarbetsblad. Använd anpassad textfunktion för att skriva hela meningar. Elever över meningar relaterade till deras läsbok. Koppla skrivning till stavningsord eller grammatiklektioner. Kombinera med temaenheter för ämnesintegrerad inlärning. Skapa obegränsat med arbetsblad för bokstäver lära sig för alla tre årskurserna med en prenumeration.`,
        quote: 'Ordlistespårning förstärker stavning perfekt!',
      },
      {
        id: '3',
        icon: '🏠',
        title: 'Hemmaskolelärare - Förskoleklass Material och Finmotorik Övningar Hemma',
        subtitle: 'Anpassat för Flera Barn',
        description: `Hemmaskolelärare undervisar flera barn i olika åldrar samtidigt. Skapa differentierade skrivarbetsblad för varje barns nivå. En 6-åring spårar stora bokstäver medan en 8-åring övar kursivshandstil. Generera alla arbetsblad från ett verktyg istället för att köpa flera läroplaner.

Hemmaskolefamiljer värdesätter flexibilitet. Skapa arbetsblad som matchar din familjs intressen. Ladda upp foton från familjeutflykter. Barn spårar namn på växter från naturvandringen. Eller djur från zoobesöket. Personligt innehåll håller barn engagerade i skrivövning.

Svenska hemmaskolelärare följer ofta Lgr22 frivilligt. Skapa arbetsblad som täcker läroplansresultat. Dokumentera framsteg med daterade arbetsblad. Bygg portföljer som visar handstilsutveckling över tid. Exportera som PDF för digital lagring eller fysisk utskrift.

Hemmaskolbudgetar begränsar resursköp. Full Tillgång-prenumeration på $240/år täcker alla 33 verktyg. Skapa inte bara skrivarbetsblad utan också matematik arbetsblad, målarbilder barn och mer. En prenumeration ersätter dussintals arbetsboksköp. Arbetsblad gratis att generera när du väl har åtkomst sparar hundratals dollar årligen.`,
        quote: 'En prenumeration täcker alla mina barns nivåer!',
      },
      {
        id: '4',
        icon: '🌍',
        title: 'Språklärare - Flerspråkiga Arbetsblad för Bokstäver Lära Sig på 11 Språk',
        subtitle: 'Språkinlärning Genom Skrivning',
        description: `Språklärare som undervisar svenska som andraspråk behöver alfabet- och handstilsarbetsblad. Vuxna nykomlingar till Sverige lär sig svenska bokstäver. Barn i flerspråkiga hem övar både modersmål och svenska. Skapa arbetsblad på 11 olika språk från samma verktyg.

Svenska språklärare kan skapa jämförande arbetsblad. Visa svenska alfabetet bredvid arabiska eller somaliska. Hjälp elever se likheter och skillnader mellan skriftsystem. Öva svenska specialbokstäver som inte finns i engelska. Fokuserad övning bygger bokstavsigenkänning.

ESL-lärare i internationella skolor behöver anpassade material. Skapa arbetsblad som matchar elevens modersmålsbakgrund. Temabilder från olika kulturer ger inkluderande innehåll. Kombinera ordförrådsinlärning med skrivträning. Bild av mat från elevens kultur med matens namn på svenska.

Språklärare arbetar ofta med blandade färdighetsnivåer. Skapa differentierade versioner av samma lektion. Nybörjare spårar bokstäver. Intermediära kopierar ord. Avancerade skriver meningar. Alla tre grupperna arbetar med samma tema men på lämplig svårighetsnivå. Förskoleklass material och vuxenutbildningsmaterial från ett verktyg.`,
        quote: 'Flerspråkigt stöd är ovärderligt för mina elever!',
      },
      {
        id: '5',
        icon: '💜',
        title: 'Specialpedagoger - Anpassade Finmotorik Övningar och Förskoleklass Material',
        subtitle: 'Individualiserad Undervisning',
        description: `Specialpedagoger stöder elever med olika inlärningsbehov. Vissa elever kräver större spårningsbokstäver för synnedsättningar. Andra behöver extra stora guidelinjer för motoriska utmaningar. Dysgrafestudenter drar nytta av strukturerad handstilsövning med tydlig återkoppling.

Autistiska elever trivs med förutsägbara rutiner. Skapa konsekventa arbetsblad med samma layout. Använd föredragna teman för att öka motivationen. Ett barn som älskar tåg kan spåra tågrelaterade ord. Personalisering ökar engagemanget hos ovilliga skribenter.

Elever med finmotoriska förseningar behöver progressiva streckövningar. Börja med stora vertikala linjer. Framskrida till horisontella, sedan cirklar, sedan sicksack. Gradvis övergång till bokstavsformning när grundfärdigheter förbättras. Arbetsblad gratis att skapa i vilken svårighetsgrad som behövs för individualiserad undervisning.

Specialpedagoger dokumenterar elevframsteg för IUP (Individuella utvecklingsplaner). Exportera daterade arbetsblad som visar förbättring över tid. Jämför tidiga spårningsförsök med senare oberoende skrivning. Visuellt bevis för tillväxt stöder målsättning och IUP-granskningar. Skapa obegränsat med arbetsblad för att spåra detaljerade framsteg.`,
        quote: 'Perfekt för IUP-målspårning!',
      },
      {
        id: '6',
        icon: '💰',
        title: 'Lärarföretagare - Sälj Skrivarbetsblad med Kommersiell POD-licens',
        subtitle: 'Kommersiell Licens Ingår',
        description: `Lärarföretagare bygger inkomst genom att sälja arbetsblad på Teachers Pay Teachers, Etsy och Amazon KDP. Full Tillgång-prenumeration inkluderar kommersiell POD-licens utan extra avgifter. Skapa obegränsat med arbetsblad gratis per arbetsblad. Sälj tusentals produkter med en $240/år investering.

Svenska lärare säljer till nordiska marknader. Skapa arbetsblad på svenska, norska, danska och finska. Samma verktyg genererar alla fyra språken. Bredda din marknadspotential utan extra programvarakostnader. Sälj även till engelskspråkiga marknader med engelska arbetsblad.

Populära produktnischer inkluderar temapaket. Höstbokstäver lära sig-paket med höstbilder. Julhandstilsarbetsblad för decemberaktiviteter. Djurtema-skrivarbetsblad för djurlektioner. Skapa 20-sidors paket och prissätt dem på $4-8. Sälj hundratals nedladdningar månadsvis för stabil passiv inkomst.

Lyckosamma lärarföretagare tjänar $500-5000 per månad. Kombinera skrivarbetsblad med andra generatorer för kompletta paket. Paketera matematik arbetsblad, målarbilder barn och finmotorik övningar tillsammans. Förskoleklass material-paket säljer exceptionellt bra. Professionell 300 DPI-kvalitet konkurrerar med vilken betald resurs som helst. Bygg ett hållbart lärarbussiness med inkluderad kommersiell licensiering.`,
        quote: 'Min prenumeration betalade sig själv första månaden!',
      },
    ],
  },

  // FAQ Section - Selected FAQs from writing.md
  faq: {
    sectionTitle: 'Vanliga Frågor om Skrivarbetsblad och Bokstäver Lära Sig',
    sectionDescription: 'Lärare och föräldrar ställer ofta liknande frågor om vår generator för skrivarbetsblad. Följande 12 frågor och svar täcker allt från prenumerationskostnader till tekniska funktioner. Varje svar ger tydlig, praktisk information. Läs igenom dessa innan du prenumererar för att förstå exakt vad du får. Arbetsblad gratis att skapa när du väl har tillgång till Full Tillgång-prenumeration.',
    showMoreText: 'Visa fler frågor',
    showLessText: 'Visa färre',
    badgeText: 'Vanliga Frågor',
    readMoreLabel: 'Läs mer',
    showLessLabel: 'Visa mindre',
    secureCheckout: 'Säker betalning',
    cancelAnytime: 'Avsluta när som helst',
    items: [
      {
        id: '1',
        question: 'Är Denna Generator för Skrivarbetsblad Verkligen Gratis att Använda?',
        answer: 'Generatorn för skrivarbetsblad kräver en Full Tillgång-prenumeration som kostar $240 årligen eller $25 månadsvis. Din prenumeration ger dig obegränsad skapande av skrivarbetsblad utan avgifter per arbetsblad. Generera så många arbetsblad gratis per arbetsblad som du behöver utan ytterligare avgifter. Skapa hundratals skrivarbetsblad varje månad om du vill utan extra kostnader. Full Tillgång-prenumerationen inkluderar alla 33 generatorverktyg. Utöver skrivarbetsblad får du tillgång till matematik arbetsblad, målarbilder barn, ordpussel och mer. Båda prenumerationerna inkluderar kommersiell licensiering, 11 språkstöd och professionell 300 DPI-kvalitetsexport.',
      },
      {
        id: '2',
        question: 'Kan Jag Skriva Ut Skrivarbetsblad Hemma på En Vanlig Skrivare?',
        answer: 'Ja. Skrivarbetsblad exporteras som högupplösta PDF- eller JPEG-filer perfekta för hemutskrift. Varje arbetsblad renderas vid 300 DPI för skarp, professionell kvalitet. Standardskrivare hanterar enkelt våra PDF-filer. Ingen specialutrustning eller dyra skrivare krävs för utmärkta resultat. Välj mellan Letter och A4-papperstorlekar. PDF-filer centreras automatiskt med korrekta marginaler. Gråskalealternativet sparar betydande bläck. Konvertera färgarbetsblad till svartvita före utskrift. Perfekt för massutskrift av arbetsblad på budget.',
      },
      {
        id: '3',
        question: 'Behöver Jag Designkunskaper för att Skapa Arbetsblad för Bokstäver Lära Sig?',
        answer: 'Nej. Inga designkunskaper krävs alls. Gränssnittet är intuitivt och användarvänligt. Klicka helt enkelt på knappar och välj från rullgardinsmenyer. Arbetsblad genereras automatiskt baserat på dina val. Hela processen tar under 3 minuter från start till nedladdning. Förinställda inställningar ger professionella resultat omedelbart. Standardradstorlekar fungerar perfekt för de flesta elever. Guidelinjer placeras automatiskt korrekt. Du anpassar bara vad du vill - allt annat hanteras åt dig. Perfekt för lärare utan teknisk bakgrund.',
      },
      {
        id: '4',
        question: 'Kan Jag Använda Skrivarbetsblad i Mitt Klassrum för Elever?',
        answer: 'Ja. Full Tillgång-prenumeration inkluderar obegränsad klassrumsanvändning. Skapa arbetsblad för så många elever som du undervisar. Använd i förskoleklass, lågstadiet eller specialpedagogik. Ingen begränsning på antal utskrifter eller antalet elever. Perfekt för klassrum med 5-30+ elever. Skapa differentierade versioner för olika färdighetsnivåer. Vissa elever får spårningsarbetsblad. Andra får guidad kopiering. Avancerade elever får oberoende skrivning. Alla tre grupperna arbetar samtidigt på lämpliga nivåer. Differentiering är inbyggd utan extra kostnad.',
      },
      {
        id: '5',
        question: 'Vilka Språk Finns Tillgängliga för Skrivarbetsblad och Finmotorik Övningar?',
        answer: 'Skrivarbetsblad finns tillgängliga på 11 språk: svenska, engelska, tyska, franska, spanska, italienska, portugisiska (brasiliansk), nederländska, danska, norska och finska. Både gränssnittet och innehållet översätts till ditt valda språk. Perfekt för flerspråkiga klassrum, internationella skolor och språklärare. Svenska gränssnittet visar alla knappar, menyer och instruktioner på svenska. Svenska tecken (å, ä, ö) renderas perfekt i skrivarbetsblad. Alla 11 språk stöder fullständig alfabetträning.',
      },
      {
        id: '6',
        question: 'Kan Jag Sälja Skrivarbetsblad Jag Skapar Med Denna Generator?',
        answer: 'Ja. Full Tillgång-prenumeration inkluderar fullständig kommersiell print-on-demand-licensiering. Sälj skrivarbetsblad på Teachers Pay Teachers, Etsy, Amazon KDP eller din egen webbplats. Ingen attribution krävs. Inga royalties eller extraavgifter utöver din prenumerationskostnad. Skapa och sälj obegränsat. Kommersiell licens är ovanligt generös i lärverktygs industrin. Sälj individuella arbetsblad eller paket. Prissätt arbetsbladspaket på $4-8. Skapa temasamlingar med 15-25 arbetsblad. Lärarföretagare tjänar vanligtvis $500-5000/månad.',
      },
      {
        id: '7',
        question: 'Hur Anpassar Jag Skrivarbetsblad för Mina Elever?',
        answer: 'Full anpassning finns på flera nivåer. Välj radtyp: spårning, tonad spårning eller guidad kopiering. Välj teckensnittsstil: textstil, textstil med pilar, spårningsteckensnitt eller handstil. Välj innehåll: tomt, begynnelsebokstav, filnamn eller anpassad text. Varje val skapar olika svårighetsgrader. Anpassad textfunktionen ger obegränsad flexibilitet. Skriv elevnamn för personliga namnsspårningsarbetsblad. Ange stavningsord för veckotest. Inkludera högfrekventa ord för läsning. Skriv hela meningar för avancerade skribenter. Varje rad kan ha olika anpassad text.',
      },
      {
        id: '8',
        question: 'Vilka Åldersgrupper Fungerar Bäst Med Dessa Skrivarbetsblad?',
        answer: 'Skrivarbetsblad fungerar bäst för förskolebarn till årskurs 3 (åldrarna 5-9 år). Förskoleklass (6-åringar) börjar med grundläggande bokstavsspårning och streckövningar. Årskurs 1 (7-åringar) övergår till oberoende bokstavsformning. Årskurs 2-3 (8-9 år) övar kursivshandstil och meningsskrivning. Förskolebarn (4-5 år) drar nytta av streckövningar. Äldre elever med handstilsutmaningar använder också dessa arbetsblad. Årskurs 4-6 elever med dysgrafi behöver fortsatt strukturerad övning. Differentiera enkelt för blandade åldersgrupper.',
      },
      {
        id: '9',
        question: 'Kan Jag Ladda Upp Egna Bilder till Skrivarbetsblad?',
        answer: 'Ja. Multi-filuppladningsfunktionen låter dig ladda upp dussintals bilder samtidigt. Accepterar alla vanliga format: JPEG, PNG, GIF och mer. Uppladdade bilder lagras under din session. Använd dem på flera arbetsblad utan att ladda upp igen. Ladda upp elevfoton för personliga arbetsblad. Barn älskar att se sig själva på övningsmaterial. Ladda upp klassrumsföremål för ordförrådsarbetsblad. Kombinera uppladdade bilder med vårt 3000+ bildbibliotek. Placera din uppladdade bild bredvid biblioteksbilder.',
      },
      {
        id: '10',
        question: 'Hur Lång Tid Tar Det att Skapa Ett Skrivarbetsblad?',
        answer: 'Den genomsnittliga tiden från start till nedladdning är under 3 minuter. Erfarna användare skapar arbetsblad på 1-2 minuter. Nybörjare kan ta 5 minuter första gången. Efter att ha skapat 2-3 arbetsblad blir processen intuitiv och snabb. Steg 1: Lägg till rader (30 sekunder). Steg 2: Anpassa innehåll (60 sekunder). Steg 3: Justera layout (30 sekunder). Steg 4: Exportera (30 sekunder). Bulkskapande sparar ännu mer tid. Skapa 10 liknande arbetsblad på 15 minuter.',
      },
      {
        id: '11',
        question: 'Inkluderar Skrivarbetsblad Svarnycklar om Tillämpligt?',
        answer: 'Skrivarbetsblad har vanligtvis inga "svarnycklar" eftersom eleverna övar bokstavsformning. Men spårningsläget visar guidelinjer och fullständiga bokstäver. Detta fungerar som visuell vägledning för korrekt formning. Eleverna ser exakt hur varje bokstav ska se ut. För anpassade textarbetsblad är "svaret" den text du angav. Guidad kopieringsläge visar första bokstaven helt. Resten tonas för spårning. Detta ger delvis svar med stöd. Elever ser mönstret men måste forma efterföljande bokstäver oberoende.',
      },
      {
        id: '12',
        question: 'Kan Jag Skapa Skrivarbetsblad om Specifika Skolämnen?',
        answer: 'Ja. Kombinera skrivträning med vilket ämne som helst genom anpassad text och temabilder. Matematikordförråd: spåra "ADDITION", "SUBTRAKTION", "MULTIPLIKATION". Vetenskapsord: spåra "VÄXT", "DJUR", "VATTEN". Historiaord: spåra "VIKING", "SLOTT", "MEDELTID". Naturvetenskapsenheter integreras vackert. Undervisar om djur? Ladda upp djurbilder och låt elever spåra djurnamn. Varje temaenhet kan ha matchande skrivarbetsblad för sammanhängande ämnesövergripande lärande.',
      },
    ],
  },

  // Pricing
  pricing: {
    title: 'Full Tillgång',
    price: '240$',
    priceInterval: '/år',
    priceSuffix: 'Faktureras årligen',
    benefits: [
      'Obegränsad arbetsbladskapning',
      'Alla 33 arbetsbladsverktyg',
      'Kommersiell licens ingår',
      '11 språk stöds',
      '3000+ tematiska bilder',
      '300 DPI utskriftskvalitet',
    ],
    ctaText: 'Börja Skapa Nu',
  },

  // Related Apps
  relatedApps: {
    sectionTitle: 'Kombinera Skrivarbetsblad med Andra Arbetsblad Gratis - Kompletta Förskoleklass Material Paket',
    sectionDescription: 'LessonCraft Studio erbjuder 33 gratis arbetsbladsverktyg på samma plattform. Kombinera skrivarbetsblad med matematik arbetsblad, målarbilder barn och mer för kompletta lärpaket. Full Tillgång-prenumeration ger tillgång till alla generatorer för $240/år. Skapa tematiska enheter som integrerar multipel färdighetsövning. Arbetsblad gratis att skapa när du väl har din prenumeration på vilket verktyg som helst.',
    ctaTitle: 'Redo att Skapa Fantastiska Skrivarbetsblad?',
    ctaDescription: 'Gå med tusentals lärare som skapar professionella arbetsblad. Obegränsad generering, kommersiell licens ingår.',
    primaryCtaText: 'Starta Gratis Provperiod',
    secondaryCtaText: 'Visa Alla 33 Appar',
    badgeText: 'Fungerar Utmärkt Med',
    exploreText: 'Utforska alla appar',
    trustBadges: {
      guarantee: '30 dagars pengarna-tillbaka-garanti',
      securePayment: 'Säker betalning',
      cancelAnytime: 'Avsluta när som helst',
    },
    items: [
      {
        id: '1',
        slug: 'alfabettag-arbetsblad',
        name: 'Alfabettåg',
        category: 'Tidig Inlärning',
        icon: '🚂',
        description: 'Kombinera bokstavsspårning med alfabettåg-arbetsblad för omfattande bokstavsigenkänningsövning.',
      },
      {
        id: '2',
        slug: 'malarbilder-arbetsblad',
        name: 'Målarbilder',
        category: 'Konst & Kreativitet',
        icon: '🎨',
        description: 'Para skrivövning med målarbilder för engagerande multiaktivitets-lärocenter.',
      },
      {
        id: '3',
        slug: 'ordletar-arbetsblad',
        name: 'Ordletare',
        category: 'Språkutveckling',
        icon: '🔍',
        description: 'Använd ordletarpussel för att förstärka ordförråd efter att eleverna övat spåra orden.',
      },
      {
        id: '4',
        slug: 'ordpussel-arbetsblad',
        name: 'Ordpussel',
        category: 'Språkutveckling',
        icon: '🔀',
        description: 'Lägg till ordpussel för att öva stavning av ord som eleverna har spårat och lärt sig.',
      },
      {
        id: '5',
        slug: 'matchnings-arbetsblad',
        name: 'Matchningsarbetsblad',
        category: 'Visuellt Lärande',
        icon: '🔗',
        description: 'Skapa matchningsaktiviteter som kopplar bilder med ord som eleverna övar spåra.',
      },
      {
        id: '6',
        slug: 'addition-arbetsblad',
        name: 'Additionsarbetsblad',
        category: 'Matematik',
        icon: '➕',
        description: 'Balansera skrivövning med matematikfärdigheter med hjälp av additionsarbetsblad för kompletta lärpaket.',
      },
    ],
  },
};

export default writingSvContent;
