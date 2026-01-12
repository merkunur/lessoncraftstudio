import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Image Cryptogram Worksheets - Dutch Content (Cryptogram Werkbladen)
 *
 * File: frontend/content/product-pages/nl/cryptogram-werkbladen.ts
 * URL: /nl/apps/cryptogram-werkbladen (Dutch SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Dutch/cryptogram.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 *
 * App Tier: FULL ACCESS (€240/year) - Volledige Toegang
 *
 * Dutch Keywords:
 * 1. Werkbladen groep 3
 * 2. Werkbladen kleuters
 * 3. Rekenen werkbladen
 * 4. Kleurplaten
 * 5. Letters leren / Schrijven oefenen
 * 6. Oefenbladen gratis
 * 7. Tafels oefenen
 * 8. Veilig leren lezen
 * 9. Fijne motoriek
 * 10. Sommen tot 20
 */

export const imageCryptogramNlContent: ProductPageContent = {
  // SEO Metadata - Dutch language-specific
  seo: {
    slug: 'cryptogram-werkbladen',
    appId: 'image-cryptogram',
    title: 'Cryptogram Werkbladen Generator - Oefenbladen Gratis voor Werkbladen Groep 3 en Kleuters',
    description: 'Maak professionele cryptogram werkbladen met afbeeldingen met onze cryptogram generator. Met uw Volledige Toegang abonnement creëert u onbeperkt educatieve werkbladen zonder extra kosten per werkblad. Download hoogwaardige PDF werkbladen in minder dan 3 minuten.',
    keywords: 'cryptogram werkbladen, werkbladen groep 3, werkbladen kleuters, oefenbladen gratis, letters leren, schrijven oefenen, veilig leren lezen, fijne motoriek, kleurplaten, rekenen werkbladen',
    canonicalUrl: 'https://www.lessoncraftstudio.com/nl/apps/cryptogram-werkbladen',
  },

  // Hero Section - FULL text from cryptogram.md paragraphs 1-4
  hero: {
    title: 'Cryptogram Werkbladen Generator',
    subtitle: 'Oefenbladen Gratis voor Werkbladen Groep 3 en Werkbladen Kleuters',
    description: `Maak professionele cryptogram werkbladen met afbeeldingen met onze cryptogram generator. Met uw Volledige Toegang abonnement creëert u onbeperkt educatieve werkbladen zonder extra kosten per werkblad. Ontwikkel aangepaste cryptogram werkbladen perfect voor werkbladen groep 3, werkbladen kleuters en groep 1 2. Download hoogwaardige PDF werkbladen in minder dan 3 minuten.

Onze cryptogram werkblad maker combineert letters leren met puzzelplezier. Elke letter in de zin wordt vervangen door een afbeelding. Kinderen ontcijferen de code door de afbeeldingen te matchen met letters. Deze unieke aanpak maakt letters leren spannend voor kleuters en basisschoolleerlingen.

De cryptogram generator ondersteunt 11 talen voor de afbeeldingenbibliotheek. U kiest thema's zoals dieren, voedsel of vervoer voor uw puzzels. Upload uw eigen afbeeldingen voor gepersonaliseerde werkbladen. Combineer cryptogram werkbladen met rekenen werkbladen en kleurplaten voor complete leerpakketten.

Genereer cryptogram werkbladen in seconden. Pas elke letter-afbeelding toewijzing aan. Download zowel het werkblad als het antwoordblad. Perfect voor werkbladen groep 3 die schrijven oefenen en letters leren, fijne motoriek ontwikkelen en veilig leren lezen ondersteunen.`,
    previewImageSrc: '/samples/english/cryptogram/cryptogram_worksheet.jpeg',
    ctaLabels: {
      tryFree: 'Gratis Uitproberen',
      viewSamples: 'Voorbeelden Bekijken',
    },
    trustBadges: {
      languages: '11 Talen',
      images: '3000+ Afbeeldingen',
      license: 'Commerciële Licentie',
    },
    readMoreLabel: 'Lees meer',
    showLessLabel: 'Minder tonen',
    floatingStats: {
      time: '3 min',
      action: 'Maken & Downloaden',
      quality: '300 DPI',
    },
  },

  // Sample Gallery - REAL file paths from samples/english/cryptogram/
  samples: {
    sectionTitle: 'Cryptogram Voorbeelden',
    sectionDescription: 'Download gratis voorbeeldwerkbladen om onze professionele kwaliteit te ervaren',
    downloadLabel: 'Gratis Voorbeeld Downloaden',
    worksheetLabel: 'Werkblad',
    answerKeyLabel: 'Antwoordblad',
    viewAllLabel: 'Groter bekijken',
    noPdfLabel: 'Alleen voorbeeld',
    freePdfCountLabel: 'gratis downloads',
    badgeText: 'Gratis Voorbeelden',
    downloadingLabel: 'Downloaden...',
    ofLabel: 'van',
    items: [
      {
        id: '1',
        worksheetSrc: '/samples/english/cryptogram/cryptogram_worksheet.jpeg',
        answerKeySrc: '/samples/english/cryptogram/cryptogram_answer_key.jpeg',
        altText: 'Cryptogram werkblad voor werkbladen groep 3 en letters leren',
        pdfDownloadUrl: '/samples/english/cryptogram/cryptogram_worksheet.pdf',
      },
      {
        id: '2',
        worksheetSrc: '/samples/english/cryptogram/cryptogram_worksheet (1).jpeg',
        answerKeySrc: '/samples/english/cryptogram/cryptogram_answer_key (1).jpeg',
        altText: 'Cryptogram werkblad met afbeeldingen voor werkbladen kleuters',
        pdfDownloadUrl: '/samples/english/cryptogram/cryptogram_worksheet (1).pdf',
      },
    ],
  },

  // Features Grid - FULL text from cryptogram.md feature sections
  features: {
    sectionTitle: 'Cryptogram Generator Functies - Alles voor Oefenbladen Gratis en Werkbladen Groep 3',
    sectionDescription: 'Onze cryptogram werkblad generator biedt alle tools die u nodig heeft voor het maken van professionele werkbladen groep 3 en werkbladen kleuters. Met uw Volledige Toegang abonnement krijgt u toegang tot krachtige functies voor het creëren van boeiende cryptogram puzzels. Elke functie is ontworpen om het maken van werkbladen snel en eenvoudig te maken voor leerkrachten groep 1 2 en basisschoolleerkrachten.',
    highlightBadgeText: 'Uitgelicht',
    readMoreLabel: 'Lees meer',
    showLessLabel: 'Minder tonen',
    badgeText: 'Functies',
    trustBadges: {
      allFeatures: 'Alle functies inbegrepen',
      noHiddenFees: 'Geen verborgen kosten',
      cancelAnytime: 'Altijd opzegbaar',
    },
    items: [
      {
        id: '1',
        icon: '⚡',
        title: 'Maak Cryptogram Werkbladen in 3 Klikken - Snelle Werkbladen Groep 3 Generator',
        description: `Onze cryptogram generator maakt het maken van werkbladen extreem eenvoudig. Typ uw zinnen in het tekstveld. Kies een afbeeldingenthema zoals dieren of voedsel. Klik op Genereren en uw cryptogram werkblad verschijnt direct.

Het proces duurt minder dan 3 minuten van start tot finish. Geen ontwerpvaardigheden vereist. Geen ingewikkelde software om te leren. Perfect voor drukke leerkrachten die snel oefenbladen gratis willen maken voor werkbladen groep 3 en werkbladen kleuters.

De generator wijst automatisch afbeeldingen toe aan letters als u dat wilt. Of wijs handmatig specifieke afbeeldingen toe aan specifieke letters. Beide opties geven u volledige controle over hoe uw cryptogram eruitziet. Maak unieke werkbladen die perfect passen bij uw lessen letters leren en schrijven oefenen.`,
        highlighted: false,
      },
      {
        id: '2',
        icon: '✏️',
        title: 'Bewerk Alles op Uw Cryptogram Werkblad - Volledige Aanpassing voor Werkbladen Kleuters',
        description: `Elk element op het canvas is volledig bewerkbaar. Sleep afbeeldingen naar nieuwe posities. Wijzig de grootte van puzzelelementen. Roteer afbeeldingen voor visuele interesse. Verwijder elementen die u niet wilt.

Deze volledige bewerkbaarheid maakt elk cryptogram werkblad uniek. Voeg decoratieve randen toe. Verander achtergrondkleuren. Plaats extra afbeeldingen voor visuele ondersteuning. Perfect voor het differentiëren van werkbladen groep 3 en werkbladen kleuters groep 1 2.

Het bewerkbare canvas ondersteunt onbeperkte aanpassingen. Voeg tekstelementen toe met instructies. Kies uit 7 verschillende lettertypes. Pas tekstgrootte en kleur aan. Maak werkbladen die perfect passen bij uw klaslokaalstijl en lesbehoeften voor letters leren.`,
        highlighted: false,
      },
      {
        id: '3',
        icon: '📤',
        title: 'Upload Eigen Afbeeldingen voor Gepersonaliseerde Werkbladen Groep 3',
        description: `Upload meerdere afbeeldingen tegelijk in alle gangbare formaten. JPEG, PNG en GIF worden allemaal ondersteund. Combineer geüploade afbeeldingen met bibliotheekafbeeldingen. Maak volledig gepersonaliseerde cryptogram werkbladen.

Deze uploadfunctie is perfect voor thematisch lesgeven. Upload seizoensgebonden afbeeldingen voor herfst- of winterthema's. Upload afbeeldingen die aansluiten bij uw veilig leren lezen programma. Voeg afbeeldingen toe van klasgenoten voor persoonlijke puzzels.

Geüploade afbeeldingen blijven beschikbaar tijdens uw sessie. Gebruik dezelfde afbeeldingen in meerdere werkbladen. Combineer met cryptogram werkbladen, rekenen werkbladen en kleurplaten. Bouw consistente visuele thema's in al uw oefenbladen gratis voor werkbladen kleuters.`,
        highlighted: false,
      },
      {
        id: '4',
        icon: '🌍',
        title: 'Cryptogram Werkbladen in 11 Talen - Meertalige Werkbladen Groep 3',
        description: `Onze afbeeldingbibliotheek ondersteunt 11 talen. Nederlands, Engels, Duits, Frans, Spaans, Italiaans, Portugees, Zweeds, Deens, Noors en Fins. Elke afbeelding heeft bestandsnamen in alle 11 talen.

Deze meertalige ondersteuning is cruciaal voor het leren van talen. Maak Nederlandse cryptogram werkbladen voor moedertaalonderwijs. Maak Engelse cryptogram puzzels voor ESL lessen. Wissel tussen talen voor tweetalige programma's.

Perfect voor internationale scholen die werkbladen groep 3 in meerdere talen nodig hebben. Ondersteunt wereldtaalonderwijs. Helpt leerlingen bij het leren van nieuwe alfabetten en schrijfsystemen. Essentieel voor diverse klaslokalen met meertalige leerlingen die letters leren in hun tweede taal.`,
        highlighted: false,
      },
      {
        id: '5',
        icon: '💼',
        title: 'Commerciële Licentie voor Print-on-Demand - Verkoop Werkbladen Groep 3 en Oefenbladen Gratis',
        description: `Volledige Toegang abonnement bevat volledige commerciële print-on-demand licentie zonder extra kosten. Verkoop uw cryptogram werkbladen op Etsy, Teachers Pay Teachers of Amazon KDP. Geen attributie vereist. Geen extra licentiekosten.

Deze commerciële licentie maakt lerarenondernemerschap mogelijk. Maak werkbladbundels met cryptogram puzzels, rekenen werkbladen en kleurplaten. Verkoop thematische pakketten voor werkbladen groep 3 en werkbladen kleuters. Bouw een passief inkomen terwijl u andere leerkrachten helpt.

De 300 DPI professionele kwaliteit zorgt ervoor dat uw werkbladen er perfect uitzien als gedrukt product. Klanten ontvangen scherpe, duidelijke afbeeldingen. Professionele presentatie verhoogt de verkoop. Perfect voor leerkrachten die hun inkomsten willen aanvullen door oefenbladen gratis werkbladen te verkopen.`,
        highlighted: true,
      },
      {
        id: '6',
        icon: '🎨',
        title: '3000+ Afbeeldingbibliotheek - Thema\'s voor Werkbladen Kleuters en Groep 1 2',
        description: `Toegang tot meer dan 3000 kindvriendelijke afbeeldingen georganiseerd per thema. Dieren, voedsel, vervoer, natuur, seizoenen en meer. Elke categorie bevat tientallen hoogwaardige afbeeldingen perfect voor werkbladen groep 3.

Themagebaseerde organisatie maakt selectie snel. Kies alfabetthema voor letters leren werkbladen. Selecteer voedselthema voor gezondheidsonderwijs. Gebruik dierenthema's voor natuurwetenschappen. Elke afbeelding is ontworpen voor jonge leerlingen groep 1 2.

De bibliotheek bevat achtergronden en randen. Voeg decoratieve elementen toe aan uw cryptogram werkbladen. Maak visueel aantrekkelijke oefenbladen gratis die de aandacht van leerlingen trekken. Zoekfunctionaliteit helpt u snel specifieke afbeeldingen te vinden voor schrijven oefenen en letters leren activiteiten.`,
        highlighted: true,
      },
      {
        id: '7',
        icon: '🖨️',
        title: 'Professionele 300 DPI Kwaliteit - Hoogwaardige Werkbladen Groep 3 en Oefenbladen Gratis',
        description: `Alle downloads zijn 300 DPI voor professionele printkwaliteit. Perfect voor printen op school of verkopen. JPEG en PDF formaten beschikbaar. Grijswaardenoptie bespaart inkt bij het printen.

Deze hoge resolutie zorgt ervoor dat tekst leesbaar blijft. Afbeeldingen blijven scherp bij elk formaat. Professionele kwaliteit voor werkbladen groep 3, werkbladen kleuters en oefenbladen gratis. Uw leerlingen krijgen kristalheldere werkbladen die gemakkelijk te gebruiken zijn.

Download het werkblad en antwoordblad apart. Het antwoordblad toont de oplossing met letters zichtbaar. Perfect voor snelle nakijken. Beide documenten in professionele kwaliteit klaar voor direct gebruik in uw klaslokaal voor letters leren en schrijven oefenen activiteiten.`,
        highlighted: false,
      },
    ],
  },

  // How-To Guide - FULL text from cryptogram.md step sections
  howTo: {
    sectionTitle: 'Hoe Maak Je Werkbladen Groep 3 in 5 Eenvoudige Stappen - Snelle Oefenbladen Gratis Generator',
    sectionDescription: 'Het maken van professionele cryptogram werkbladen duurt minder dan 3 minuten van start tot finish. Onze stap-voor-stap proces is ontworpen voor drukke leerkrachten die snel hoogwaardige werkbladen groep 3 en werkbladen kleuters nodig hebben. Geen ontwerpvaardigheden vereist. Geen ingewikkelde software om te leren.',
    ctaText: 'Nu Starten',
    badgeText: 'Zo werkt het',
    stepLabel: 'Stap',
    completionTitle: 'Klaar!',
    completionSubtitle: 'Je werkblad is gereed',
    readyTime: 'Klaar in minder dan 3 minuten',
    noSkillsNeeded: 'Geen ontwerpkennis nodig',
    readMoreLabel: 'Lees meer',
    showLessLabel: 'Minder tonen',
    steps: [
      {
        id: '1',
        number: 1,
        title: 'Stap 1: Kies Uw Inhoud voor Cryptogram Werkbladen - Zinnen en Thema\'s voor Werkbladen Kleuters',
        description: `Begin met het typen van uw zinnen in het tekstveld. Elke regel wordt een aparte cryptogrampuzzel. Gebruik korte zinnen voor werkbladen kleuters groep 1 2. Gebruik langere zinnen voor werkbladen groep 3 en oudere leerlingen.

Kies zinnen die aansluiten bij uw lessen. Voor letters leren gebruikt u het alfabet of eenvoudige woorden. Voor veilig leren lezen kiest u hoogfrequente woorden. Voor thematisch onderwijs maakt u zinnen over seizoenen of feestdagen. Elke zin kan tot 8 regels lang zijn.

Selecteer een afbeeldingthema uit het dropdown menu. Dierenthema's werken goed voor jonge leerlingen. Voedselthema's zijn perfect voor gezondheidsonderwijs. Vervoerthema's ondersteunen verkeersveiligheidslessen. Het alfabetthema is ideaal voor beginnende lezers die schrijven oefenen.

U kunt ook "Alle Thema's" selecteren om toegang te krijgen tot de volledige 3000+ afbeeldingbibliotheek. Zoek naar specifieke objecten met de zoekbalk. Combineer thema's voor gevarieerde visuele interesse. Dit maakt oefenbladen gratis uniek en boeiend voor werkbladen groep 3.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Stap 2: Pas Instellingen Aan - Letters Leren en Schrijven Oefenen voor Werkbladen Groep 3',
        description: `Kies hoeveel letters u wilt onthullen in de puzzel. Stel in op 0 voor maximale moeilijkheid. Stel in op 3-5 letters voor werkbladen kleuters die nog letters leren. Meer onthuld letters maken de puzzel gemakkelijker voor jonge leerlingen groep 1 2.

Selecteer het maximale aantal regels per puzzel. Kortere puzzels (1-2 regels) werken goed voor fijne motoriek ontwikkeling. Langere puzzels (6-8 regels) zijn perfect voor oudere leerlingen werkbladen groep 3. Pas dit aan op basis van het concentratievermogen van uw leerlingen.

Schakel het automatisch toewijzen selectievakje in als u wilt dat de generator automatisch afbeeldingen aan letters toewijst. Dit bespaart tijd bij het maken van meerdere werkbladen. Of laat het uitgeschakeld om handmatig specifieke afbeeldingen te kiezen voor elke letter. Beide opties geven u volledige controle.

Kies uw paginaformaat uit de opties. Letter Portrait is standaard voor Amerikaanse scholen. A4 Portrait is standaard voor Europese scholen. Landschapsformaten bieden meer horizontale ruimte. Vierkante formaten zijn perfect voor social media posts van uw oefenbladen gratis werkbladen.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Stap 3: Genereer Uw Werkblad - Direct Voorbeeld van Werkbladen Kleuters en Rekenen Werkbladen',
        description: `Klik op de Genereren knop. Uw cryptogram werkblad verschijnt direct op het canvas. Elk proces duurt slechts enkele seconden. Geen wachttijd. Geen laden. Direct resultaat dat klaar is om aan te passen.

Het werkblad toont uw zinnen met afbeeldingen die elke letter vervangen. De afbeeldingen worden automatisch geschaald voor leesbaarheid. Spatiëring is geoptimaliseerd voor werkbladen groep 3 en werkbladen kleuters. Alles is professioneel gerangschikt en klaar om te gebruiken.

Het antwoordblad wordt automatisch gegenereerd. Wissel tussen het werkblad en antwoordblad met de tabs bovenaan. Het antwoordblad toont dezelfde puzzel met letters zichtbaar. Dit maakt nakijken snel en eenvoudig voor drukke leerkrachten.

Als u niet tevreden bent met het resultaat, pas dan de instellingen aan en genereer opnieuw. Probeer verschillende thema's. Verander het aantal onthuld letters. Pas het paginaformaat aan. Elk nieuw werkblad wordt in seconden gegenereerd voor letters leren en schrijven oefenen.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Stap 4: Bewerk op Canvas - Volledige Aanpassing voor Oefenbladen Gratis en Kleurplaten',
        description: `Klik op elk element om het te selecteren. Sleep afbeeldingen naar nieuwe posities. Wijzig de grootte door aan de hoeken te slepen. Roteer elementen voor visuele interesse. Verwijder items die u niet wilt. Volledige bewerkbaarheid geeft u complete controle.

Voeg decoratieve elementen toe uit de afbeeldingbibliotheek. Plaats grensafbeeldingen rond de randen. Voeg achtergrondelementen toe voor visuele context. Upload uw eigen afbeeldingen voor personalisatie. Combineer met kleurplaten elementen voor multifunctionele werkbladen.

Gebruik de teksttools om instructies toe te voegen. Kies uit 7 verschillende lettertypes. Pas tekstgrootte aan voor leesbaarheid. Verander kleuren om te matchen met uw klaslokaalthema. Voeg outlines toe voor tekstemfase. Perfect voor het maken van professionele werkbladen groep 3.

De uitlijn- en laaggereedschappen helpen bij precieze plaatsing. Centreer elementen horizontaal of verticaal. Breng objecten naar voren of naar achteren. Vergrendel elementen om onbedoelde wijzigingen te voorkomen. Onbeperkt ongedaan maken en opnieuw geeft u vertrouwen om te experimenteren met oefenbladen gratis ontwerpen.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Stap 5: Download en Print Werkbladen Groep 3 - Hoogwaardige PDF en JPEG Bestanden',
        description: `Klik op de Download knop om uw opties te zien. Download alleen het werkblad. Download alleen het antwoordblad. Of download beide voor volledige lesvoorbereiding. Elk bestand downloadt in seconden.

Kies tussen JPEG voor digitaal delen of PDF voor printen. PDF-bestanden behouden perfecte kwaliteit bij elke schaal. JPEG-bestanden zijn kleiner voor e-mailen of uploaden. Beide formaten zijn 300 DPI professionele printkwaliteit voor werkbladen groep 3 en werkbladen kleuters.

Schakel de grijswaarden optie in om printkosten te verlagen. Grijswaardenversies gebruiken minder inkt maar behouden duidelijkheid. Perfect voor grote klaslokalen die veel oefenbladen gratis moeten printen. Kleurenversies zijn levendig en aantrekkelijk voor jonge leerlingen.

Uw gedownloade werkbladen zijn direct klaar voor gebruik. Print ze thuis op een gewone printer. Print ze op school op standaard kopieerpapier. Of upload ze naar commerciële printdiensten voor bulkproductie. Verkoop ze online met uw Volledige Toegang commerciële licentie. Combineer met rekenen werkbladen, kleurplaten en andere werkbladen voor complete leerpakketten voor letters leren en schrijven oefenen.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases Section - FULL text from cryptogram.md use case sections
  useCases: {
    sectionTitle: 'Perfect voor Leerkrachten en Ouders - Werkbladen Kleuters en Werkbladen Groep 3 voor Elke Behoefte',
    sectionDescription: 'Onze cryptogram werkblad generator bedient diverse onderwijsbehoeften van kleuterscholen tot basisonderwijs. Leerkrachten groep 1 2 gebruiken het voor fijne motoriek en letters leren. Leerkrachten groep 3 maken werkbladen voor veilig leren lezen. Thuisonderwijsouders creëren oefenbladen gratis voor hun kinderen.',
    badgeText: 'Gebruikssituaties',
    readMoreLabel: 'Lees meer',
    showLessLabel: 'Minder tonen',
    items: [
      {
        id: '1',
        icon: '👶',
        title: 'Leerkrachten Groep 1-2 - Werkbladen Kleuters voor Letters Leren en Fijne Motoriek',
        subtitle: 'Werkbladen kleuters en fijne motoriek',
        description: `Kleuterleerkrachten gebruiken cryptogram werkbladen voor vroege alfabetisering. Jonge leerlingen groep 1 2 vinden afbeeldingen boeiender dan alleen letters. De visuele codes maken letters leren speels en interactief. Perfect voor kinderen die net beginnen met schrijven oefenen.

Cryptogram werkbladen ontwikkelen fijne motoriek vaardigheden. Kinderen oefenen met potloodcontrole door letters te schrijven. Ze verbeteren hand-oog coördinatie door afbeeldingen te matchen met letters. Deze fijne motoriek ontwikkeling is essentieel voor toekomstig schrijven.

Gebruik eenvoudige zinnen met hoogfrequente woorden. Kies thema's die aansluiten bij kleuterschoolinteresses zoals dieren of speelgoed. Combineer cryptogram werkbladen met kleurplaten voor uitgebreide lessen. Voeg oefenbladen gratis toe die letters leren ondersteunen met traceren en schrijven.

Leerkrachten groep 1 2 waarderen de differentiatiemogelijkheden. Onthul meer letters voor leerlingen die extra ondersteuning nodig hebben. Gebruik langere zinnen voor gevorderde kleuters. Pas paginaformaten aan voor verschillende fijne motoriek niveaus en schrijven oefenen behoeften.`,
      },
      {
        id: '2',
        icon: '📚',
        title: 'Leerkrachten Groep 3 - Veilig Leren Lezen met Werkbladen Groep 3 en Schrijven Oefenen',
        subtitle: 'Werkbladen groep 3 en veilig leren lezen',
        description: `Eerstejaars basisschoolleerkrachten gebruiken cryptogram werkbladen voor leescomprehensie. Leerlingen groep 3 oefenen decoderen en probleemoplossing. De puzzelformaat maakt veilig leren lezen strategieën concreet en tastbaar. Perfect voor kinderen die overgaan van kleuteronderwijs naar gestructureerd lezen.

Cryptogram werkbladen ondersteunen veilig leren lezen methodieken perfect. Gebruik zinnen uit uw leesprogramma. Focus op kernwoorden en leespatronen. Leerlingen passen hun decodeervaardigheden toe in een nieuwe context terwijl ze schrijven oefenen en letters leren versterken.

Combineer cryptogram puzzels met rekenen werkbladen voor geïntegreerde lessen. Maak wiskundige woordproblemen als cryptogrammen. Gebruik getallen en rekensymbolen in puzzels. Voeg kleurplaten elementen toe voor multisensorische leerervaring bij werkbladen groep 3.

De generator bespaart leerkrachten groep 3 kostbare voorbereidingstijd. Maak weekelijkse werkbladen in minuten. Genereer thuiswerkopdrachten die aansluiten bij klassikale lessen. Download oefenbladen gratis voor leerlingen die extra oefening nodig hebben met veilig leren lezen vaardigheden.`,
      },
      {
        id: '3',
        icon: '🏠',
        title: 'Thuisonderwijs Ouders - Oefenbladen Gratis voor Letters Leren en Rekenen Werkbladen',
        subtitle: 'Thuisonderwijs en oefenbladen gratis',
        description: `Thuisonderwijsouders waarderen de flexibiliteit van onze cryptogram generator. Maak gepersonaliseerde werkbladen die matchen met de interesses van uw kind. Gebruik onderwerpen uit hun favoriete boeken of hobby's. Creëer oefenbladen gratis die leren leuk en relevant maken.

Cryptogram werkbladen passen perfect bij multi-leeftijd thuisonderwijs. Maak eenvoudige puzzels voor jonge kinderen die letters leren. Creëer uitdagende cryptogrammen voor oudere kinderen die schrijven oefenen. Gebruik dezelfde tool voor werkbladen kleuters en werkbladen groep 3 niveaus.

Integreer cryptogrammen in uw volledige curriculum. Combineer met rekenen werkbladen voor wiskundige woordenschat. Gebruik met kleurplaten voor kunstintegratie. Maak taalkundige puzzels die grammatica en spelling versterken terwijl kinderen fijne motoriek ontwikkelen.

Uw Volledige Toegang abonnement geeft onbeperkte toegang tot alle werkblad generatoren. Creëer cryptogram werkbladen, rekenen werkbladen en kleurplaten met één abonnement. Download oefenbladen gratis zonder beperkingen. Perfect voor thuisonderwijsbudgetten die hoogwaardige materialen nodig hebben voor veilig leren lezen.`,
      },
      {
        id: '4',
        icon: '🌐',
        title: 'Taalleerkrachten - Veilig Leren Lezen en Schrijven Oefenen voor Meertalige Leerlingen',
        subtitle: 'Meertalig onderwijs en taalverwerving',
        description: `ESL leerkrachten gebruiken cryptogram werkbladen voor woordenschatontwikkeling. De 11 taalopties ondersteunen meertalig onderwijs. Maak Nederlandse cryptogrammen voor moedertaalonderwijs. Creëer Engelse puzzels voor tweede taalverwerving die letters leren in beide talen ondersteunen.

Cryptogrammen maken abstract taalonderwijs visueel en concreet. Leerlingen zien woordpatronen door afbeeldingen. Ze oefenen spelling in context. De puzzelstructuur maakt memoriseren van nieuwe woorden boeiend voor leerlingen die schrijven oefenen en veilig leren lezen ontwikkelen.

Gebruik thematische woordenschat in uw cryptogrammen. Maak voedselwoordpuzzels voor restaurantlessen. Creëer vervoerwoordcryptogrammen voor reisthema's. Elke puzzel versterkt thematische woordenschat terwijl leerlingen letters leren en fijne motoriek verbeteren.

Combineer taalcryptogrammen met oefenbladen gratis voor andere vaardigheden. Voeg rekenen werkbladen toe om getalnamen te onderwijzen. Gebruik kleurplaten om kleurwoorden te versterken. Maak complete taalpakketten met werkbladen kleuters tot werkbladen groep 3 niveaus.`,
      },
      {
        id: '5',
        icon: '🎯',
        title: 'Leerkrachten Speciaal Onderwijs - Fijne Motoriek en Rekenen Werkbladen met Gedifferentieerde Werkbladen Groep 3',
        subtitle: 'Speciaal onderwijs en differentiatie',
        description: `Specialisten in speciaal onderwijs waarderen de aanpassingsmogelijkheden. Pas moeilijkheidsniveaus aan voor diverse leerniveaus. Gebruik grote afbeeldingen voor leerlingen met visuele verwerkingsproblemen. Creëer eenvoudige puzzels voor leerlingen die fijne motoriek vaardigheden ontwikkelen.

Cryptogram werkbladen ondersteunen multisensorisch leren. Visuele leerlingen zien afbeeldingpatronen. Kinesthetische leerlingen schrijven letters fysiek. Auditieve leerlingen spreken woorden hardop tijdens het oplossen. Perfect voor gedifferentieerd onderwijs met werkbladen kleuters en werkbladen groep 3.

Gebruik cryptogrammen voor functionele levensvaardighedenonderwijs. Maak puzzels met veiligheidswoorden. Creëer cryptogrammen met dagelijkse routinewoordenschat. Integreer met rekenen werkbladen voor levenslange wiskundevaardigheden zoals sommen tot 20 en tafels oefenen.

De onbeperkte bewerkbaarheid ondersteunt individuele onderwijsplannen. Voeg visuele ondersteuningen toe voor leerlingen die dat nodig hebben. Vergroot tekst voor betere leesbaarheid. Combineer cryptogrammen met kleurplaten voor ontspannen leeractiviteiten. Maak oefenbladen gratis die perfect passen bij elk IEP doel voor letters leren en schrijven oefenen.`,
      },
      {
        id: '6',
        icon: '💰',
        title: 'Leerkrachten die Werkbladen Verkopen - Cryptogram met Rekenen Werkbladen, Kleurplaten en Tafels Oefenen',
        subtitle: 'Commercieel gebruik en passief inkomen',
        description: `Lerarenondernemers gebruiken onze generator om verkoopbare werkbladbundels te maken. De commerciële licentie staat verkoop op Etsy, Teachers Pay Teachers en Amazon KDP toe. Maak thematische pakketten die cryptogrammen combineren met rekenen werkbladen, kleurplaten en tafels oefenen materialen.

Cryptogram werkbladen verkopen goed als onderdeel van complete leerpakketten. Bundel met sommen tot 20 oefenbladen. Combineer met tafels oefenen flashcards. Voeg kleurplaten toe voor waardevolle bundels. Klanten betalen meer voor complete pakketten met werkbladen groep 3 en werkbladen kleuters.

De 300 DPI professionele kwaliteit zorgt voor tevreden klanten. Uw werkbladen printen perfect thuis en op school. Positieve reviews leiden tot meer verkopen. Herhaalklanten kopen meerdere bundels met oefenbladen gratis variatie.

Gebruik de generator om snel voorraad op te bouwen. Maak seizoensgebonden bundels met herfst- of winterthema's. Creëer vakspecifieke pakketten zoals wiskundecryptogrammen met sommen tot 20 en tafels oefenen. Produceer wekelijks nieuwe producten om uw winkel fris te houden. De onbeperkte generatie met uw abonnement maximaliseert winstpotentieel met letters leren, veilig leren lezen en schrijven oefenen werkbladen.`,
      },
    ],
  },

  // FAQ Section - FULL questions and answers
  faq: {
    sectionTitle: 'Veelgestelde Vragen over Cryptogram Werkbladen - Oefenbladen Gratis en Werkbladen Groep 3',
    sectionDescription: 'Leerkrachten en ouders hebben vergelijkbare vragen over onze cryptogram werkblad generator. Deze FAQ sectie beantwoordt de meest gestelde vragen over functionaliteit, prijzen en gebruik. Van werkbladen kleuters tot werkbladen groep 3 toepassingen.',
    showMoreText: 'Meer vragen tonen',
    showLessText: 'Minder tonen',
    badgeText: 'Veelgestelde vragen',
    readMoreLabel: 'Lees meer',
    showLessLabel: 'Minder tonen',
    secureCheckout: 'Veilig afrekenen',
    cancelAnytime: 'Altijd opzegbaar',
    items: [
      {
        id: '1',
        question: 'Is Deze Cryptogram Generator Echt Gratis om te Gebruiken voor Werkbladen Groep 3?',
        answer: `De cryptogram werkblad generator vereist een Volledige Toegang abonnement dat €240 per jaar of €25 per maand kost. Uw abonnement geeft u onbeperkte cryptogram creatie zonder extra kosten per werkblad. Genereer zoveel werkbladen groep 3 en werkbladen kleuters als u nodig heeft zonder aanvullende kosten.

Volledige Toegang abonnement bevat alle 33 werkblad generatoren. Basispakket abonnement kost €144 per jaar en bevat 10 populaire generatoren. Beide abonnementen bevatten commerciële licentie, 11 talen ondersteuning en professionele 300 DPI kwaliteit exports voor oefenbladen gratis creatie.

De onbeperkte generatie betekent geen per-werkblad kosten. Maak honderden cryptogram werkbladen, rekenen werkbladen en kleurplaten met uw abonnement. Download alles onbeperkt. Perfect voor leerkrachten die veel materialen nodig hebben voor letters leren en veilig leren lezen programma's.`,
      },
      {
        id: '2',
        question: 'Kan Ik Cryptogram Werkbladen Thuis Printen op een Gewone Printer voor Werkbladen Kleuters?',
        answer: `Ja. Alle cryptogram werkbladen downloaden als standaard PDF of JPEG bestanden. Print ze op elke thuisprinter. Gebruik normaal kopieerpapier of karton. De 300 DPI kwaliteit zorgt voor scherpe afbeeldingen en duidelijke tekst bij werkbladen groep 3 en werkbladen kleuters.

De grijswaardenoptie bespaart inkt terwijl leesbaarheid behouden blijft. Perfect voor grote klaslokalen die veel oefenbladen gratis moeten printen. Kleurenversies zijn levendig en aantrekkelijk voor jonge leerlingen die letters leren en fijne motoriek ontwikkelen.

PDF formaat werkt op Windows, Mac en Chromebook. JPEG formaat opent op telefoons en tablets. Beide formaten printen perfect zonder speciale software. Download en print werkbladen in seconden voor schrijven oefenen en veilig leren lezen lessen.`,
      },
      {
        id: '3',
        question: 'Heb Ik Ontwerpvaardigheden Nodig om Cryptogram Werkbladen voor Letters Leren te Maken?',
        answer: `Nee. Onze cryptogram generator is ontworpen voor leerkrachten zonder ontwerpvaardigheden. Typ uw zinnen, kies een thema en klik op Genereren. Het werkblad verschijnt automatisch. Geen grafisch ontwerp kennis vereist voor werkbladen groep 3 creatie.

De automatische toewijzing functie wijst afbeeldingen toe aan letters voor u. Of kies handmatig specifieke afbeeldingen met eenvoudige klikken. Beide methoden zijn intuïtief. Perfect voor drukke leerkrachten die snel werkbladen kleuters en oefenbladen gratis moeten maken.

Het bewerkbare canvas gebruikt drag-and-drop interface. Sleep elementen naar nieuwe posities. Wijzig grootte door hoeken te slepen. Geen ingewikkelde gereedschappen om te leren. Zelfs technisch onervaren leerkrachten maken professionele cryptogrammen in minuten voor letters leren en schrijven oefenen.`,
      },
      {
        id: '4',
        question: 'Kan Ik Cryptogram Werkbladen Gebruiken in Mijn Klaslokaal voor Werkbladen Groep 3 Leerlingen?',
        answer: `Ja. Volledige Toegang abonnement bevat onbeperkt klaslokaalgebruik. Print zoveel kopieën als u nodig heeft voor uw leerlingen. Gebruik cryptogram werkbladen voor hele klassikale lessen, kleine groepen of individuele werk. Geen beperkingen op educatief gebruik met werkbladen groep 3 en werkbladen kleuters.

Deel digitale kopieën met leerlingen via uw leerbeheersysteem. Upload PDF's naar Google Classroom of Canvas. Leerlingen downloaden en voltooien cryptogrammen thuis. Perfect voor hybride onderwijs en afstandsonderwijs met oefenbladen gratis toegang.

Gebruik cryptogrammen voor huiswerk, toetsen of bellwork activiteiten. Combineer met rekenen werkbladen voor wiskundeoefening. Integreer met kleurplaten voor kunstintegratie. Volledige flexibiliteit voor alle onderwijsbehoeften met letters leren en veilig leren lezen materialen.`,
      },
      {
        id: '5',
        question: 'Welke Talen Zijn Beschikbaar voor Cryptogram Werkbladen en Veilig Leren Lezen?',
        answer: `Cryptogram werkbladen zijn beschikbaar in 11 talen. Nederlands, Engels, Duits, Frans, Spaans, Italiaans, Portugees, Zweeds, Deens, Noors en Fins. Elke afbeelding in de bibliotheek heeft bestandsnamen in alle 11 talen voor werkbladen groep 3 en werkbladen kleuters.

De interface vertaalt ook naar alle 11 talen. Wissel tussen talen met één klik. Perfect voor meertalige scholen en ESL programma's. Maak cryptogrammen in uw instructietaal met native afbeeldingsnamen voor letters leren.

Deze meertalige ondersteuning is uniek voor cryptogram werkbladen. Gebruik dezelfde afbeeldingen in meerdere talen. Ondersteunt wereldtaalonderwijs, erfgoedtaalprogramma's en tweetalige educatie. Essentieel voor diverse klaslokalen met oefenbladen gratis in meerdere talen voor schrijven oefenen en veilig leren lezen.`,
      },
      {
        id: '6',
        question: 'Kan Ik Cryptogram Werkbladen Verkopen die Ik Maak voor Werkbladen Kleuters en Rekenen Werkbladen?',
        answer: `Ja. Volledige Toegang abonnement bevat volledige commerciële print-on-demand licentie zonder extra kosten. Verkoop uw cryptogram werkbladen op Etsy, Teachers Pay Teachers en Amazon KDP. Verkoop werkbladbundels met rekenen werkbladen, kleurplaten en tafels oefenen materialen zonder attributie of royalty's.

De commerciële licentie dekt alle werkbladen die u maakt. Bundel cryptogrammen met sommen tot 20 oefenbladen. Combineer met kleurplaten voor complete pakketten. Verkoop als digitale downloads of gedrukte producten. Perfect voor leerkrachten die passief inkomen willen bouwen met werkbladen groep 3 en werkbladen kleuters.

Uw €240 jaarabonnement is uw enige kostenpost. Geen extra licentiekosten. Geen per-product kosten. Onbeperkte commerciële verkopen inclusief. Deze waarde overtreft concurrenten die €100-€200 extra rekenen voor commerciële rechten op oefenbladen gratis materialen voor letters leren.`,
      },
      {
        id: '7',
        question: 'Hoe Pas Ik Cryptogram Werkbladen Aan voor Verschillende Fijne Motoriek Niveaus?',
        answer: `Klik op elk element om aanpassingen te maken. Vergroot afbeeldingen voor leerlingen met visuele verwerkingsproblemen. Verkleinen puzzelelementen voor oudere leerlingen werkbladen groep 3. Pas spatiëring aan voor verschillende fijne motoriek behoeften bij werkbladen kleuters.

Gebruik de instellingen om moeilijkheid te regelen. Onthul meer letters voor beginnende lezers die letters leren. Verberg alle letters voor gevorderde leerlingen. Pas het maximale aantal regels aan voor concentratievermogen. Deze flexibiliteit ondersteunt gedifferentieerd onderwijs met schrijven oefenen niveaus.

Voeg visuele ondersteuningen toe voor leerlingen die dat nodig hebben. Upload aangepaste afbeeldingen met bekende objecten. Gebruik grote, duidelijke lettertypes. Verhoog contrast voor betere leesbaarheid. Maak drie versies van hetzelfde werkblad voor volledig gedifferentieerde oefenbladen gratis met veilig leren lezen aanpassingen.`,
      },
      {
        id: '8',
        question: 'Voor Welke Leeftijdsgroepen Werken Cryptogram Werkbladen het Beste met Werkbladen Groep 3?',
        answer: `Cryptogram werkbladen werken voor leeftijden 4-10. Werkbladen kleuters groep 1 2 gebruiken eenvoudige puzzels met weinig letters. Werkbladen groep 3 leerlingen lossen langere cryptogrammen op met meer complexe zinnen. Oudere basisschoolleerlingen genieten van uitdagende puzzels voor letters leren.

Kleuterkinderen profiteren van visuele letter-afbeelding associaties. Ze ontwikkelen fijne motoriek door letters te schrijven. Ze leren alfabet erkenning door patroonmatching. Perfect voor vroege alfabetisering en schrijven oefenen bij werkbladen kleuters.

Eerste tot derde klas leerlingen gebruiken cryptogrammen voor leesoefening. Ze passen veilig leren lezen strategieën toe. Ze bouwen woordenschat en spelling vaardigheden. Combineer met rekenen werkbladen voor wiskundige woordproblemen. Integreer met kleurplaten voor multidisciplinaire leren met oefenbladen gratis.`,
      },
      {
        id: '9',
        question: 'Kan Ik Mijn Eigen Afbeeldingen Uploaden naar Cryptogram Werkbladen voor Letters Leren?',
        answer: `Ja. Upload meerdere afbeeldingen tegelijk in JPEG, PNG of GIF formaat. Gebruik uw geüploade afbeeldingen in cryptogram puzzels. Combineer met bibliotheekafbeeldingen voor unieke werkbladen groep 3 en werkbladen kleuters ontwerpen.

Upload klasfoto's voor gepersonaliseerde puzzels. Upload seizoensgebonden afbeeldingen voor thematische lessen. Upload educatieve graphics die aansluiten bij uw curriculum. Perfect voor leerkrachten die unieke oefenbladen gratis willen maken voor letters leren en schrijven oefenen.

Geüploade afbeeldingen blijven beschikbaar tijdens uw sessie. Gebruik ze in meerdere werkbladen. Bouw consistente visuele thema's in cryptogrammen, rekenen werkbladen en kleurplaten. Upload familieleden voor thuisonderwijs personalisatie. Upload relevante afbeeldingen voor veilig leren lezen programma contexten.`,
      },
      {
        id: '10',
        question: 'Hoe Lang Duurt het om een Cryptogram Werkblad te Maken voor Werkbladen Kleuters?',
        answer: `Drie minuten van start tot download. Typ zinnen in 30 seconden. Kies thema en instellingen in 30 seconden. Klik Genereren voor directe preview. Bewerk indien nodig voor 1-2 minuten. Download als PDF in seconden. Totaal onder 3 minuten voor werkbladen groep 3 en werkbladen kleuters.

Deze snelheid is waarom leerkrachten het abonnement essentieel vinden. Maak 10 cryptogram werkbladen in 30 minuten. Genereer weekplannen in één uur. Produceer complete thematische eenheden in een middag. Enorme tijdsbesparing vergeleken met traditionele methoden voor oefenbladen gratis creatie.

Batch productie is nog sneller. Maak eenmaal een sjabloon. Verander alleen zinnen voor nieuwe werkbladen. Download meerdere variaties in minuten. Perfect voor leerkrachten die veel differentiatie nodig hebben voor letters leren, schrijven oefenen en veilig leren lezen met fijne motoriek ontwikkeling.`,
      },
      {
        id: '11',
        question: 'Bevatten Cryptogram Werkbladen Antwoordbladen voor Werkbladen Groep 3 Nakijken?',
        answer: `Ja. Elk cryptogram werkblad genereert automatisch een antwoordblad. Het antwoordblad toont dezelfde puzzel met letters zichtbaar in plaats van afbeeldingen. Dit maakt nakijken snel en eenvoudig voor werkbladen groep 3 en werkbladen kleuters.

Wissel tussen werkblad en antwoordblad tabs bovenaan. Download ze afzonderlijk als aparte PDF's. Of download beide samen voor complete lesvoorbereiding. Beide versies zijn 300 DPI professionele kwaliteit voor oefenbladen gratis gebruik.

Antwoordbladen helpen leerlingen zelf-nakijken. Ouders gebruiken ze voor thuiswerkhulp bij letters leren. Vervangingsleerkrachten waarderen directe nakijksleutels. Perfect voor zelfsturende werkstations en onafhankelijk leren met schrijven oefenen, veilig leren lezen en fijne motoriek activiteiten.`,
      },
      {
        id: '12',
        question: 'Kan Ik Cryptogram Werkbladen Maken over Specifieke Schoolvakken met Rekenen Werkbladen en Tafels Oefenen?',
        answer: `Absoluut. Maak wiskundecryptogrammen met sommen tot 20 en tafels oefenen woordproblemen. Creëer natuurwetenschappencryptogrammen met wetenschappelijke woordenschat. Genereer geschiedenispuzzels met historische figuren. Gebruik vakspecifieke zinnen in uw cryptogram werkbladen voor werkbladen groep 3.

Combineer cryptogrammen met rekenen werkbladen voor geïntegreerde lessen. Gebruik wiskundige symbolen in puzzels. Maak woordproblemen als cryptogrammen. Leerlingen lossen zowel het cryptogram als het wiskundeprobleem op. Perfect voor interdisciplinair onderwijs met werkbladen kleuters tot werkbladen groep 3.

Thematische eenheden profiteren van cryptogram integratie. Maak puzzels over seizoenen, feestdagen of wetenschappelijke concepten. Combineer met kleurplaten voor artistieke verbindingen. Voeg oefenbladen gratis toe voor alle vakgebieden. Volledige curriculum integratie met letters leren, schrijven oefenen en veilig leren lezen doelen.`,
      },
    ],
  },

  // Pricing Section
  pricing: {
    title: 'Volledige Toegang',
    price: '€240',
    priceInterval: '/jaar',
    priceSuffix: 'Jaarlijks gefactureerd',
    ctaText: 'Nu Starten',
    bundleDescription: 'Uw abonnement geeft toegang tot alle 33 werkbladgeneratoren',
    bundleApps: [],
    benefits: [
      'Alle 33 werkblad generatoren',
      'Onbeperkte downloads',
      '11 talen ondersteuning',
      'Commerciële licentie inbegrepen',
      '300 DPI professionele kwaliteit',
      '3000+ afbeeldingen bibliotheek',
    ],
  },

  // Related Apps Section
  relatedApps: {
    sectionTitle: 'Combineer Cryptogram Werkbladen met Andere Oefenbladen Gratis - Complete Leerpakketten voor Werkbladen Groep 3',
    sectionDescription: 'Uw Volledige Toegang abonnement bevat 33 gratis werkblad generatoren op één platform. Combineer cryptogram werkbladen met rekenen werkbladen, kleurplaten en andere tools. Maak complete thematische leerpakketten voor werkbladen groep 3 en werkbladen kleuters. Elke combinatie versterkt leren op meerdere manieren.',
    ctaTitle: 'Klaar om Professionele Werkbladen te Maken?',
    ctaDescription: 'Sluit u aan bij duizenden leerkrachten die professionele werkbladen maken met LessonCraft Studio.',
    primaryCtaText: 'Gratis Uitproberen',
    secondaryCtaText: 'Bekijk Alle 33 Apps',
    badgeText: 'Werkt Uitstekend Met',
    exploreText: 'Alle apps bekijken',
    trustBadges: {
      securePayment: 'Veilig betalen',
      cancelAnytime: 'Altijd opzegbaar',
    },
    items: [
      {
        id: '1',
        slug: 'rekenen-werkbladen',
        name: 'Rekenen Werkbladen',
        description: 'Combineer cryptogram werkbladen met rekenen werkbladen voor geïntegreerde wiskunde-taallessen. Maak cryptogrammen met wiskundige woordenschat. Gebruik getalnamen in puzzels. Voeg sommen tot 20 oefenbladen toe voor rekenvaardigheden. Perfect voor werkbladen groep 3 die beide vakgebieden oefenen.',
        icon: '➕',
        category: 'Wiskunde',
      },
      {
        id: '2',
        slug: 'kleurplaten-werkbladen',
        name: 'Kleurplaten',
        description: 'Integreer cryptogram werkbladen met kleurplaten voor complete fijne motoriek lessen. Leerlingen lossen cryptogrammen op en kleuren vervolgens gerelateerde afbeeldingen. Beide activiteiten ontwikkelen potloodcontrole en hand-oog coördinatie. Perfect voor werkbladen kleuters die schrijven oefenen en fijne motoriek vaardigheden bouwen.',
        icon: '🎨',
        category: 'Creatief',
      },
      {
        id: '3',
        slug: 'woordzoeker-werkbladen',
        name: 'Woordzoeker',
        description: 'Combineer cryptogram werkbladen met woordzoekers voor volledige woordenschatontwikkeling. Beide puzzeltypes versterken spelling en woordherkenning. Perfect voor letters leren en veilig leren lezen programma\'s. Maak complete taalpakketten voor werkbladen groep 3.',
        icon: '🔍',
        category: 'Taal',
      },
      {
        id: '4',
        slug: 'kruiswoordpuzzel-werkbladen',
        name: 'Kruiswoordpuzzel',
        description: 'Bundel cryptogrammen met kruiswoordpuzzels voor gevarieerde puzzeloefening. Beide activiteiten ontwikkelen probleemoplossend vermogen. Perfect voor werkbladen kleuters en werkbladen groep 3 die van puzzels houden. Combineer voor complete leerpakketten met oefenbladen gratis.',
        icon: '📝',
        category: 'Puzzels',
      },
      {
        id: '5',
        slug: 'alfabet-trein-werkbladen',
        name: 'Alfabet Werkbladen',
        description: 'Combineer cryptogram werkbladen met alfabetwerkbladen voor volledige letters leren programma\'s. Cryptogrammen leren letter herkenning. Tracing werkbladen ontwikkelen schrijfvaardigheden. Samen bouwen ze complete alfabetisering voor werkbladen kleuters groep 1 2.',
        icon: '🔤',
        category: 'Alfabet',
      },
    ],
  },
};

export default imageCryptogramNlContent;
