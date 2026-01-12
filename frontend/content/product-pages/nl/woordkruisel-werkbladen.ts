import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Word Scramble Worksheets - Dutch Content
 *
 * File: frontend/content/product-pages/nl/woordkruisel-werkbladen.ts
 * URL: /nl/apps/woordkruisel-werkbladen (Dutch SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Dutch/word-scramble.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 *
 * Dutch Keywords:
 * 1. Woordkruisel
 * 2. Werkbladen groep 3
 * 3. Werkbladen kleuters
 * 4. Oefenbladen gratis
 * 5. Fijne motoriek
 * 6. Letters leren / Schrijven oefenen
 * 7. Rekenen werkbladen
 * 8. Veilig leren lezen
 * 9. Sommen tot 20
 * 10. Tafels oefenen
 */

export const wordScrambleNlContent: ProductPageContent = {
  // SEO Metadata - Dutch language-specific
  seo: {
    slug: 'woordkruisel-werkbladen',
    appId: 'word-scramble',
    title: 'Woordkruisel Generator - Oefenbladen Gratis voor Werkbladen Groep 3 en Letters Leren',
    description: 'Maak in enkele klikken professionele woordkruisels voor je leerlingen. Deze woordkruisel generator is perfect voor leerkrachten in het basisonderwijs. Met je Basispakket abonnement ontwerp je onbeperkt werkbladen groep 3 die kinderen uitdagen en vermaken.',
    keywords: 'woordkruisel generator, werkbladen groep 3, werkbladen kleuters, oefenbladen gratis, fijne motoriek, letters leren, schrijven oefenen, rekenen werkbladen, veilig leren lezen, sommen tot 20, tafels oefenen',
    canonicalUrl: 'https://www.lessoncraftstudio.com/nl/apps/woordkruisel-werkbladen',
  },

  // Hero Section - FULL text from word-scramble.md paragraphs 1-4
  hero: {
    title: 'Woordkruisel Generator',
    subtitle: 'Oefenbladen Gratis voor Werkbladen Groep 3 en Letters Leren',
    description: `Maak in enkele klikken professionele woordkruisels voor je leerlingen. Deze woordkruisel generator is perfect voor leerkrachten in het basisonderwijs. Met je Basispakket abonnement ontwerp je onbeperkt werkbladen groep 3 die kinderen uitdagen en vermaken.

De woordkruisel maker werkt volledig in het Nederlands. Je kiest een thema of uploadt eigen afbeeldingen. Binnen drie minuten heb je een afdrukbaar werkblad klaar. Ideaal voor werkbladen kleuters en groep 1 2 die net beginnen met letters leren.

Bij een woordkruisel zien kinderen een afbeelding met daaronder de letters van het woord door elkaar gehusseld. Ze moeten de letters in de juiste volgorde zetten. Dit combineert visueel leren met taalvaardigheid.`,
    previewImageSrc: '/samples/english/word scramble/word scramble portrait.jpeg',
    ctaLabels: {
      tryFree: 'Gratis Uitproberen',
      viewSamples: 'Voorbeelden Bekijken',
    },
    trustBadges: {
      languages: '11 Talen',
      images: '3000+ Afbeeldingen',
      license: 'Commerciele Licentie',
    },
    readMoreLabel: 'Lees meer',
    showLessLabel: 'Minder tonen',
    floatingStats: {
      time: '3 min',
      action: 'Maken & Downloaden',
      quality: '300 DPI',
    },
  },

  // Sample Gallery - REAL file paths from samples/english/word scramble/
  samples: {
    sectionTitle: 'Woordkruisel Voorbeelden',
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
        worksheetSrc: '/samples/english/word scramble/word scramble portrait.jpeg',
        answerKeySrc: '/samples/english/word scramble/word scramble portrait answer-key.jpeg',
        altText: 'Woordkruisel portret formaat voor werkbladen kleuters en fijne motoriek',
      },
      {
        id: '2',
        worksheetSrc: '/samples/english/word scramble/word scramble landscape.jpeg',
        answerKeySrc: '/samples/english/word scramble/word scramble landscape answer-key.jpeg',
        altText: 'Woordkruisel landschap formaat voor werkbladen groep 3 met kindvriendelijke afbeeldingen',
      },
      {
        id: '3',
        worksheetSrc: '/samples/english/word scramble/custom word list.jpeg',
        answerKeySrc: '/samples/english/word scramble/custom word list answer-key.jpeg',
        altText: 'Woordkruisel met eigen woordenlijst voor letters leren en veilig leren lezen',
      },
    ],
  },

  // Features Grid - FULL text from word-scramble.md feature sections
  features: {
    sectionTitle: 'Functies van de Woordkruisel Generator - Alles voor Werkbladen Groep 3 en Oefenbladen Gratis',
    sectionDescription: 'Deze woordkruisel maker biedt alle functies die je nodig hebt. Van simpele puzzels voor kleuters tot uitdagende woordkruisels voor groep 5. Ontdek hoe je in enkele minuten professionele werkbladen maakt met volledige bewerkingsmogelijkheden.',
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
        title: 'Werkbladen Kleuters Maken in 3 Klikken - Snel Letters Leren met Fijne Motoriek Oefeningen',
        description: `Het maken van een woordkruisel kost geen technische kennis. Je selecteert een thema uit de bibliotheek. De generator doet de rest automatisch. Binnen drie klikken heb je een complete puzzel.

Kies bijvoorbeeld het thema "Dieren" of "Fruit". De tool selecteert passende afbeeldingen met Nederlandse woorden. Perfect voor werkbladen kleuters die net beginnen met letters leren. De woorden zijn afgestemd op het niveau van groep 1 2.

Je bepaalt zelf het aantal puzzels per pagina. Kies 1 tot 10 woordkruisels per werkblad. Voor beginners werk je met minder puzzels en grotere afbeeldingen. Gevorderde leerlingen krijgen meer uitdaging met tien puzzels.`,
        highlighted: false,
      },
      {
        id: '2',
        icon: '✏️',
        title: 'Volledig Bewerkbaar Canvas voor Rekenen Werkbladen en Kleurplaten Combinaties',
        description: `Na het genereren kun je alles aanpassen op het canvas. Sleep afbeeldingen naar een andere positie. Vergroot of verklein elementen met je muis. Draai objecten of verwijder ze volledig.

Deze flexibiliteit maakt de tool perfect voor gecombineerde werkbladen. Voeg een titel toe bovenaan je puzzel. Plaats instructies voor de leerlingen. Of combineer de woordkruisel met rekenen werkbladen elementen en kleurplaten.

Je kunt ook eigen teksten toevoegen. Kies uit zeven verschillende lettertypen. Pas de kleur en grootte aan. Voeg een kader toe rond belangrijke woorden. Alles is volledig aanpasbaar voor jouw lesdoelen.`,
        highlighted: false,
      },
      {
        id: '3',
        icon: '📤',
        title: 'Eigen Afbeeldingen Uploaden voor Werkbladen Groep 3 met Schrijven Oefenen Activiteiten',
        description: `Wil je een gepersonaliseerde woordkruisel maken? Upload je eigen afbeeldingen. De tool accepteert JPG, PNG en GIF bestanden. Je kunt meerdere bestanden tegelijk uploaden.

Dit is ideaal voor thematische werkbladen groep 3. Gebruik foto's van een schooluitje. Of maak een puzzel met namen van klasgenoten. Kinderen vinden het extra leuk om bekende gezichten te ontrafelen.

De uploadfunctie werkt ook voor schrijven oefenen activiteiten. Upload afbeeldingen van schrijfpatronen. Of voeg plaatjes toe die passen bij je huidige lesonderwerp. De mogelijkheden zijn eindeloos.`,
        highlighted: false,
      },
      {
        id: '4',
        icon: '🌍',
        title: '11 Talen Ondersteuning - Veilig Leren Lezen in het Nederlands en Sommen tot 20 Thema\'s',
        description: `De woordkruisel generator ondersteunt elf talen. Nederlands staat natuurlijk voorop. Maar je maakt ook puzzels in het Duits, Frans, Engels of Spaans. Ideaal voor meertalig onderwijs en internationale scholen.

Voor Nederlandse basisscholen is de tool perfect afgestemd op Veilig leren lezen. De woorden in de bibliotheek passen bij de woordenschat van groep 3. Kinderen herkennen de woorden uit hun leesmethode.

De interface is volledig in het Nederlands beschikbaar. Alle knoppen en menu's zijn vertaald. Ook de thema-namen en afbeeldingslabels zijn Nederlands. Zo werk je altijd in je eigen taal.`,
        highlighted: false,
      },
      {
        id: '5',
        icon: '🧮',
        title: 'Commerciele Licentie voor Tafels Oefenen Materialen en Oefenbladen Gratis Verkopen',
        description: `Met je Basispakket abonnement krijg je een commerciele licentie. Dit betekent dat je jouw werkbladen mag verkopen. Denk aan platforms zoals Teachers Pay Teachers, Etsy of Amazon KDP.

De licentie geldt voor alle werkbladen die je maakt. Ook voor tafels oefenen materialen en andere educatieve content. Je hoeft geen extra kosten te betalen per werkblad. Alles zit inbegrepen in je €144 per jaar abonnement.

Veel leerkrachten verdienen extra inkomen met hun materialen. Ze maken werkbladen groep 3 met woordkruisels. Combineren deze met kleurplaten en rekenactiviteiten. En verkopen complete lespakketten online.`,
        highlighted: true,
      },
      {
        id: '6',
        icon: '🎨',
        title: 'Meer dan 3000 Afbeeldingen - Van Letters Leren tot Kleurplaten Thema\'s voor Alle Leeftijden',
        description: `De beeldbibliotheek bevat meer dan drieduizend afbeeldingen. Ze zijn georganiseerd in thema's. Van dieren en voertuigen tot seizoenen en feestdagen. Er is altijd iets dat past bij je les.

Voor letters leren activiteiten zijn de afbeeldingen speciaal geselecteerd. Elk plaatje heeft een duidelijke Nederlandse naam. Kinderen herkennen het woord direct. Dit ondersteunt het leesproces in groep 3.

De bibliotheek bevat ook achtergronden en kaders. Maak je werkbladen extra aantrekkelijk. Kies een seizoensgebonden achtergrond. Of voeg een speelse rand toe. Perfect voor kleurplaten combinaties.`,
        highlighted: true,
      },
      {
        id: '7',
        icon: '🖨️',
        title: 'Professionele 300 DPI Kwaliteit voor Fijne Motoriek en Veilig Leren Lezen Werkbladen',
        description: `Alle werkbladen worden geexporteerd in 300 DPI. Dit is de standaard voor professioneel drukwerk. Je puzzels zien er scherp en helder uit op papier.

Deze kwaliteit is belangrijk voor fijne motoriek activiteiten. De letters in de puzzel zijn goed leesbaar. Kinderen kunnen de antwoorden netjes opschrijven. Ook fijne details blijven zichtbaar bij het printen.

Je downloadt werkbladen als PDF of JPEG. De PDF-optie is ideaal voor printen. JPEG werkt goed voor digitaal delen. Er is ook een grijswaarden optie om inkt te besparen.`,
        highlighted: false,
      },
    ],
  },

  // How-To Guide - FULL text from word-scramble.md step sections
  howTo: {
    sectionTitle: 'Hoe Maak Je Woordkruisels - Werkbladen Kleuters tot Groep 3 in 5 Eenvoudige Stappen',
    sectionDescription: 'Het maken van een woordkruisel duurt minder dan drie minuten. Volg deze vijf stappen en je hebt een professioneel werkblad klaar. Geen technische kennis vereist. De generator doet het zware werk voor je.',
    ctaText: 'Nu Starten',
    badgeText: 'Zo werkt het',
    stepLabel: 'Stap',
    completionTitle: 'Klaar!',
    completionSubtitle: 'Je woordkruisel is gereed',
    readyTime: 'Klaar in minder dan 3 minuten',
    noSkillsNeeded: 'Geen ontwerpkennis nodig',
    readMoreLabel: 'Lees meer',
    showLessLabel: 'Minder tonen',
    steps: [
      {
        id: '1',
        number: 1,
        title: 'Stap 1: Kies Je Inhoud voor Oefenbladen Gratis - Thema, Afbeeldingen of Eigen Woorden voor Letters Leren',
        description: `Begin met het selecteren van je inhoud. Je hebt drie opties. Kies een thema uit de bibliotheek. Selecteer individuele afbeeldingen. Of typ je eigen woordenlijst zonder afbeeldingen.

De thema-optie werkt het snelst voor oefenbladen gratis. Selecteer bijvoorbeeld "Boerderij" of "School". De generator kiest automatisch passende woorden en afbeeldingen. Ideaal voor snelle werkbladen kleuters en groep 3.

Voor letters leren activiteiten werkt de individuele selectie goed. Zoek afbeeldingen die beginnen met dezelfde letter. Maak een puzzel met alleen B-woorden. Of focus op de letters die je deze week behandelt in de klas.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Stap 2: Pas Instellingen Aan voor Sommen tot 20 Thema\'s en Tafels Oefenen Combinaties',
        description: `Nu stel je de puzzelinstellingen in. Begin met het aantal puzzels per pagina. Kies 1 tot 10 woordkruisels. Minder puzzels betekent grotere afbeeldingen en letters.

Voor werkbladen kleuters adviseren we 4 tot 6 puzzels per pagina. De afbeeldingen zijn dan groot genoeg. Kinderen kunnen de letters makkelijk herkennen. Perfect voor fijne motoriek oefeningen met grote schrijfruimte.

Kies de moeilijkheidsgraad via het hintsysteem. "Geen hints" voor de grootste uitdaging. "Makkelijk" toont de helft van de letters. "Normaal" toont een kwart.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Stap 3: Genereer Je Werkblad met Kleurplaten Elementen en Rekenen Werkbladen Stijl',
        description: `Klik op de knop "Aanmaken" om je puzzel te genereren. De woordkruisel verschijnt direct op het canvas. Je ziet de afbeeldingen met daaronder de door elkaar gehusselde letters.

De letters worden willekeurig gerangschikt. Elke keer dat je genereert krijg je een nieuwe variant. Dit is handig voor differentiatie in de klas. Maak meerdere versies voor verschillende leerlingen.

De generator maakt ook automatisch een antwoordblad. Hierop staan de correcte woorden uitgeschreven. Perfect voor zelfcorrectie door leerlingen.`,
        icon: '⚡',
      },
      {
        id: '4',
        number: 4,
        title: 'Stap 4: Bewerk op Canvas - Werkbladen Groep 3 Personaliseren met Schrijven Oefenen Ruimte',
        description: `Na het genereren kun je alles aanpassen. Het canvas werkt als een eenvoudig tekenprogramma. Sleep elementen met je muis. Vergroot of verklein ze naar wens.

Voeg een titel toe aan je werkbladen groep 3. Typ bijvoorbeeld "Woordkruisel Week 5" bovenaan. Kies een leuk lettertype uit de zeven beschikbare opties. Pas de kleur aan bij je thema.

Maak ruimte voor schrijven oefenen onder de puzzels. Voeg extra lijnen toe voor oefenwoorden. Kinderen kunnen de gevonden woorden meerdere keren overschrijven.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Stap 5: Download en Print - Oefenbladen Gratis als PDF met Fijne Motoriek Oefeningen en Antwoordblad',
        description: `Je werkblad is klaar. Nu download je het in hoge kwaliteit. Kies tussen PDF en JPEG formaat. PDF werkt het beste voor printen op school of thuis.

Klik op "Download" en selecteer "Werkblad (PDF)". Het bestand wordt opgeslagen op je computer. Open het en print direct. De kwaliteit is 300 DPI voor scherpe letters en afbeeldingen.

Download ook het antwoordblad als je dat wilt. Klik op "Antwoordblad (PDF)". Bewaar dit apart voor correctie. De grijswaarden optie bespaart inkt voor grote aantallen.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from word-scramble.md use case sections
  useCases: {
    sectionTitle: 'Perfect voor Leerkrachten en Ouders - Werkbladen Groep 3 en Kleurplaten voor Iedereen',
    sectionDescription: 'De woordkruisel generator is ontworpen voor verschillende gebruikers. Van kleuterjuffen tot ouders die thuisonderwijs geven. Ontdek hoe deze tool past bij jouw situatie en onderwijsdoelen.',
    badgeText: 'Voor wie',
    readMoreLabel: 'Lees meer',
    showLessLabel: 'Minder tonen',
    items: [
      {
        id: '1',
        icon: '👶',
        title: 'Leerkrachten Groep 1 2 - Werkbladen Kleuters met Fijne Motoriek en Veilig Leren Lezen Voorbereiding',
        subtitle: 'Werkbladen kleuters en fijne motoriek',
        description: `Werk je met kleuters in groep 1 of 2? Dan ken je de uitdaging van leuke leeractiviteiten. Werkbladen kleuters moeten speels zijn. Maar ook educatief waardevol voor de ontwikkeling.

Woordkruisels zijn perfect voor fijne motoriek ontwikkeling. Kinderen oefenen het vasthouden van een potlood. Ze leren nauwkeurig kijken naar letters. Dit zijn basisvaardigheden voor Veilig leren lezen in groep 3.

Voor letters leren in de kleuterklas maak je eenvoudige puzzels. Gebruik grote afbeeldingen met korte woorden. Kies plaatjes die kinderen direct herkennen. De puzzel wordt een ontdekkingstocht.`,
        quote: 'Mijn kleuters vinden de kleurrijke werkbladen geweldig!',
      },
      {
        id: '2',
        icon: '📚',
        title: 'Leerkrachten Groep 3 - Veilig Leren Lezen Ondersteunen met Oefenbladen Gratis en Letters Leren',
        subtitle: 'Werkbladen groep 3 en Veilig leren lezen',
        description: `Groep 3 is het jaar van leren lezen. Methodes zoals Veilig leren lezen vormen de basis. Woordkruisels zijn een perfecte aanvulling op deze methodes voor extra oefening.

Maak puzzels met woorden uit de actuele kern. Kinderen herkennen de woorden uit hun leesboek. Dit versterkt de woordherkenning en spelling. En maakt lezen leuker dan standaard oefeningen.

De oefenbladen gratis mogelijkheid is ideaal voor differentiatie. Print puzzels voor leerlingen die meer uitdaging nodig hebben. Of maak makkelijkere varianten voor kinderen die extra ondersteuning nodig hebben.`,
        quote: 'Woordkruisels passen perfect bij onze leesmethode.',
      },
      {
        id: '3',
        icon: '🧮',
        title: 'Leerkrachten Groep 4 en 5 - Tafels Oefenen en Sommen tot 20 met Woordpuzzels Combineren',
        subtitle: 'Tafels oefenen en rekenen werkbladen',
        description: `In groep 4 en 5 worden de puzzels uitdagender. Meer woorden per pagina met langere spellingen. Kinderen vinden dit een leuke afwisseling van standaard taalwerk.

Combineer woordkruisels met tafels oefenen thema's. Maak een puzzel met woorden als "vermenigvuldigen", "delen" en "product". Kinderen leren de rekenwoordenschat terwijl ze puzzelen.

Voor sommen tot 20 integratie kies je getalswoorden. "Twaalf", "vijftien" en "achttien" in een woordkruisel. Dit versterkt de koppeling tussen geschreven woord en getal.`,
        quote: 'Rekenen wordt leuker met kleurplaten erbij.',
      },
      {
        id: '4',
        icon: '🏠',
        title: 'Ouders met Thuisonderwijs - Werkbladen Kleuters en Schrijven Oefenen voor Thuis',
        subtitle: 'Oefenbladen gratis voor thuis',
        description: `Geef je thuisonderwijs? Dan weet je hoe belangrijk variatie is. Dezelfde werkbladen worden snel saai. De woordkruisel generator biedt eindeloze mogelijkheden.

Maak werkbladen kleuters die aansluiten bij jullie weekthema. Behandel je deze week de boerderij? Genereer een woordkruisel met boerderijwoorden. Kinderen leren spelenderwijs.

Combineer puzzels met schrijven oefenen voor een productieve middag. De woordkruisel houdt het educatieve element. Het overschrijven van gevonden woorden oefent het handschrift.`,
        quote: 'Een tool voor al mijn kinderen op verschillende niveaus.',
      },
      {
        id: '5',
        icon: '🌐',
        title: 'Remedial Teachers - Veilig Leren Lezen Extra Oefening met Fijne Motoriek Ondersteuning',
        subtitle: 'Werkbladen voor remedial teaching',
        description: `Werk je met kinderen die extra ondersteuning nodig hebben? Woordkruisels zijn een waardevolle tool. Ze bieden herhaling zonder verveling of frustratie.

Voor Veilig leren lezen achterstand maak je gerichte puzzels. Gebruik woorden waar het kind moeite mee heeft. De puzzelvorm maakt oefenen minder confronterend dan standaard dictees.

Fijne motoriek ondersteuning gaat samen met woordkruisels. Kinderen oefenen letterherkenning in een speelse context. Het omcirkelen en overschrijven versterkt de motorische vaardigheden.`,
        quote: 'Ik kan snel geindividualiseerde werkbladen maken.',
      },
      {
        id: '6',
        icon: '💰',
        title: 'Onderwijsondernemers - Oefenbladen Gratis Maken en Kleurplaten Verkopen met Commerciele Licentie',
        subtitle: 'Commerciele licentie voor ondernemers',
        description: `Wil je geld verdienen met je lesmateriaal? De woordkruisel generator maakt dit mogelijk. Met een Basispakket abonnement krijg je een commerciele licentie voor €144 per jaar.

Maak unieke oefenbladen en verkoop ze online. Teachers Pay Teachers is populair bij Nederlandse docenten. Ook Etsy werkt goed voor printables en digitale downloads.

Combineer woordkruisels met kleurplaten tot complete pakketten. Een thema-bundel met puzzels en kleuractiviteiten. Ouders en collega-docenten betalen graag voor complete, kant-en-klare materialen.`,
        quote: 'Mijn abonnement heeft zichzelf terugverdiend in de eerste maand!',
      },
    ],
  },

  // FAQ Section - FULL FAQs from word-scramble.md
  faq: {
    sectionTitle: 'Veelgestelde Vragen over Woordkruisels - Oefenbladen Gratis en Werkbladen Groep 3 Antwoorden',
    sectionDescription: 'Heb je vragen over de woordkruisel generator? Hieronder vind je antwoorden op de meest gestelde vragen. Van prijzen tot functies en alles daartussenin.',
    showMoreText: 'Meer vragen tonen',
    showLessText: 'Minder tonen',
    badgeText: 'Veelgestelde vragen',
    readMoreLabel: 'Lees meer',
    showLessLabel: 'Minder tonen',
    secureCheckout: 'Veilig betalen',
    cancelAnytime: 'Altijd opzegbaar',
    items: [
      {
        id: '1',
        question: 'Is Deze Woordkruisel Generator Echt Gratis voor Oefenbladen Gratis en Kleurplaten?',
        answer: 'De woordkruisel generator vereist een Basispakket abonnement van €144 per jaar of €15 per maand. Met je abonnement maak je onbeperkt woordkruisels zonder extra kosten per werkblad. Genereer zoveel oefenbladen als je nodig hebt. De Basispakket bevat tien populaire werkbladgenerators. De Volledige Toegang versie kost €240 per jaar en bevat alle 33 generators. Beide abonnementen bevatten een commerciele licentie, ondersteuning voor 11 talen en professionele 300 DPI exports.',
      },
      {
        id: '2',
        question: 'Kan Ik Werkbladen Kleuters Thuis Printen op een Gewone Printer met Fijne Motoriek Oefeningen?',
        answer: 'Ja, alle werkbladen kleuters zijn ontworpen voor thuisprinten. De generator exporteert in 300 DPI kwaliteit. Dit werkt perfect op elke standaard inkjet of laserprinter. Voor fijne motoriek oefeningen adviseren we stevig papier van 100 gram. Kinderen kunnen dan beter schrijven zonder doordrukken. De lijnen en letters blijven scherp zichtbaar. De grijswaarden optie bespaart inkt voor grote aantallen.',
      },
      {
        id: '3',
        question: 'Heb Ik Ontwerpvaardigheden Nodig voor Werkbladen Groep 3 met Veilig Leren Lezen Woorden?',
        answer: 'Nee, geen enkele ontwerpervaring is nodig. De generator doet al het werk voor je. Kies een thema, stel het aantal puzzels in en klik op genereren. Voor werkbladen groep 3 met Veilig leren lezen woorden selecteer je simpelweg de juiste afbeeldingen. De tool husselt de letters automatisch door elkaar. Je hebt binnen drie minuten een compleet werkblad. Het canvas is intuïtief te bedienen.',
      },
      {
        id: '4',
        question: 'Mag Ik Woordkruisels Gebruiken in Mijn Klas voor Sommen tot 20 en Tafels Oefenen Thema\'s?',
        answer: 'Ja, je Basispakket abonnement bevat onbeperkt klassikaal gebruik. Print zoveel exemplaren als je nodig hebt. Voor elke leerling een eigen werkblad. Voor sommen tot 20 thema\'s maak je woordkruisels met getalswoorden. Kinderen leren de spelling van twaalf, vijftien en achttien. Bij tafels oefenen integratie gebruik je rekenwoordenschat. Vermenigvuldigen, delen, product en quotient in puzzelvorm.',
      },
      {
        id: '5',
        question: 'In Welke Talen Zijn Woordkruisels Beschikbaar voor Rekenen Werkbladen en Letters Leren?',
        answer: 'De generator ondersteunt elf talen volledig. Nederlands, Duits, Frans, Engels, Spaans, Portugees, Italiaans, Zweeds, Deens, Noors en Fins. De interface en alle afbeeldingsnamen zijn vertaald. Voor rekenen werkbladen in andere talen kies je de gewenste taal. De getalswoorden en rekentermen verschijnen in die taal. Perfect voor meertalig onderwijs en letters leren in vreemde talen.',
      },
      {
        id: '6',
        question: 'Kan Ik Mijn Woordkruisels Verkopen als Oefenbladen Gratis Downloaden voor Klanten?',
        answer: 'Ja, je Basispakket abonnement bevat een volledige commerciele licentie. Verkoop je werkbladen op Teachers Pay Teachers, Etsy of Amazon KDP. Geen extra licentiekosten. Je oefenbladen kun je aanbieden als digitale downloads. Klanten betalen en downloaden direct. Ze printen thuis hun eigen exemplaren. De 300 DPI kwaliteit is professioneel genoeg voor verkoop.',
      },
      {
        id: '7',
        question: 'Hoe Pas Ik Werkbladen Kleuters Aan voor Mijn Leerlingen met Schrijven Oefenen?',
        answer: 'De generator biedt uitgebreide aanpassingsmogelijkheden. Kies het aantal puzzels per pagina. Stel de moeilijkheidsgraad in via hints. Selecteer hoofdletters of kleine letters. Voor schrijven oefenen voeg je extra lijnen toe onder de puzzels. Kinderen schrijven de gevonden woorden over. Upload eigen afbeeldingen voor gepersonaliseerde werkbladen kleuters. Foto\'s van klasgenoten of schooluitjes.',
      },
      {
        id: '8',
        question: 'Welke Leeftijden Werken het Best met Woordkruisels voor Fijne Motoriek en Veilig Leren Lezen?',
        answer: 'Woordkruisels zijn perfect voor kinderen van 4 tot 10 jaar. Kleuters beginnen met eenvoudige puzzels van drie letters. Groep 5 leerlingen krijgen langere woorden. Voor fijne motoriek ontwikkeling zijn woordkruisels ideaal vanaf groep 1. Kinderen oefenen nauwkeurig kijken en schrijven. Bij Veilig leren lezen ondersteuning past de tool perfect bij groep 3.',
      },
      {
        id: '9',
        question: 'Kan Ik Eigen Afbeeldingen Uploaden voor Werkbladen Groep 3 met Tafels Oefenen Woorden?',
        answer: 'Ja, de uploadfunctie accepteert JPG, PNG en GIF bestanden. Upload meerdere afbeeldingen tegelijk. Combineer ze met afbeeldingen uit de bibliotheek. Voor werkbladen groep 3 upload je thematische foto\'s. Van een schooluitje of seizoensactiviteit. Bij tafels oefenen woorden typ je een eigen woordenlijst. De generator maakt puzzels zonder afbeeldingen.',
      },
      {
        id: '10',
        question: 'Hoe Lang Duurt het om een Woordkruisel te Maken met Rekenen Werkbladen Elementen?',
        answer: 'Een complete woordkruisel maak je in minder dan drie minuten. Selecteer afbeeldingen, kies instellingen en klik op genereren. De puzzel verschijnt direct. Voor rekenen werkbladen elementen voeg je na het genereren extra content toe. Sommen of getalllijnen naast de puzzel. Dit kost nog eens twee minuten extra. Vergelijk dit met handmatig werken dat dertig minuten duurt.',
      },
      {
        id: '11',
        question: 'Bevatten Woordkruisels een Antwoordblad voor Sommen tot 20 en Kleurplaten Combinaties?',
        answer: 'Ja, de generator maakt automatisch een antwoordblad. Hierop staan alle correcte woorden uitgeschreven. Download het apart of samen met het werkblad. Voor sommen tot 20 combinaties print je het antwoordblad voor zelfcorrectie. Kinderen controleren hun eigen werk. Bij kleurplaten combinaties werkt het antwoordblad als controle-instrument.',
      },
      {
        id: '12',
        question: 'Kan Ik Woordkruisels Maken over Specifieke Schoolvakken zoals Oefenbladen Gratis voor Aardrijkskunde?',
        answer: 'Ja, de themabibliotheek bevat duizenden afbeeldingen. Van dieren en planten tot landen en beroepen. Er is altijd iets dat past bij je les. Voor oefenbladen over aardrijkskunde kies je landschappen en werelddelen. Of upload eigen kaarten en foto\'s. De eigen woordenlijst functie biedt maximale flexibiliteit. Typ vakjargon of themawoorden.',
      },
    ],
  },

  // Pricing - Core Bundle pricing
  pricing: {
    title: 'Basispakket',
    price: '€144',
    priceInterval: '/jaar',
    priceSuffix: 'Jaarlijks gefactureerd',
    benefits: [
      'Onbeperkt woordkruisels maken',
      'Commerciele licentie inbegrepen',
      '11 talen ondersteund',
      '3000+ thematische afbeeldingen',
      '300 DPI afdrukkwaliteit',
      'Volledig bewerkbaar canvas',
    ],
    ctaText: 'Nu Starten',
  },

  // Related Apps
  relatedApps: {
    sectionTitle: 'Combineer met Andere Generators - Werkbladen Kleuters en Tafels Oefenen Complete Lespakketten',
    sectionDescription: 'Je Basispakket abonnement bevat tien populaire werkbladgenerators die perfect samenwerken. Combineer woordkruisels met andere tools voor complete lespakketten. Ontdek hoe je thematische bundels maakt voor elke lesweek.',
    ctaTitle: 'Klaar om geweldige werkbladen te maken?',
    ctaDescription: 'Sluit je aan bij duizenden leerkrachten die professionele werkbladen maken. Onbeperkt genereren, commerciele licentie inbegrepen.',
    primaryCtaText: 'Gratis Proberen',
    secondaryCtaText: 'Alle 33 Apps Bekijken',
    badgeText: 'Werkt goed met',
    exploreText: 'Alle apps bekijken',
    trustBadges: {
      securePayment: 'Veilig betalen',
      cancelAnytime: 'Altijd opzegbaar',
    },
    items: [
      {
        id: '1',
        slug: 'word-search',
        name: 'Woordzoeker',
        category: 'Taal',
        icon: '🔍',
        description: 'Combineer woordkruisels met woordzoekers voor een krachtig taalpakket met Veilig leren lezen woorden.',
      },
      {
        id: '2',
        slug: 'math-worksheet',
        name: 'Rekenwerkbladen',
        category: 'Rekenen',
        icon: '🧮',
        description: 'Maak complete rekenlessen met sommen tot 20 en woordkruisels met getalswoorden.',
      },
      {
        id: '3',
        slug: 'coloring',
        name: 'Kleurplaten',
        category: 'Creativiteit',
        icon: '🎨',
        description: 'Beloon voltooide puzzels met thematische kleurplaten die de fijne motoriek ontwikkelen.',
      },
      {
        id: '4',
        slug: 'image-crossword',
        name: 'Kruiswoordpuzzel',
        category: 'Woordspellen',
        icon: '📝',
        description: 'Combineer beide puzzeltypen voor een ultiem woordpuzzelfeest dat kinderen uitdaagt.',
      },
      {
        id: '5',
        slug: 'image-addition',
        name: 'Optellen',
        category: 'Rekenen',
        icon: '➕',
        description: 'Wissel standaard sommen af met woordkruisels over rekentermen en tafels oefenen woordenschat.',
      },
      {
        id: '6',
        slug: 'drawing-lines',
        name: 'Tekenlijnen',
        category: 'Fijne Motoriek',
        icon: '✏️',
        description: 'Train basislijnen voor fijne motoriek ontwikkeling naast het puzzelen met letters leren.',
      },
    ],
  },
};

export default wordScrambleNlContent;
