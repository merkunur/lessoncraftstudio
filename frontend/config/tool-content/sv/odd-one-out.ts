import type { ToolContent } from '../types';

const content: ToolContent = {
  seo: {
    primaryKeyword: 'hitta udda bilden arbetsblad',
    secondaryKeywords: [
      `hitta udda bilden arbetsblad skapare för säljare`,
      `skapa hitta den annorlunda pussel att sälja`,
      `utskrivbar hitta udda bilden generator kommersiellt bruk`,
      `hitta udda bilden pussel skapare för KDP och Etsy`,
    ],
    lsiKeywords: [
      `dubbelläge identisk liknande visuell diskriminering skapare`,
      `per-övning lägesöverskridning hitta udda generator`,
      `automatiskt facit röd cirkel udda objekt arbetsblad skapare`,
    ],
    titleTag: `Hitta Udda Bilden Skapare — Arbetsblad Generator`,
    metaDescription: `Skapa hitta udda bilden arbetsblad med Identiskt och Liknande läge, per-övning överskridningar, automatiska facit med röda cirklar. Gratis provversion med vattenstämpel.`,
  },

  hero: {
    title: 'Hitta Udda Bilden Skapare',
    tagline: `Dubbelläges hitta udda bilden arbetsblad generator med Identiskt läge (3 kloner + 1 annorlunda) och Liknande läge (3 från Tema A + 1 från Tema B), per-övning lägesöverskridning, 5–10 konfigurerbara övningar, automatiskt genererade facit med röda cirkelmarkeringar och 104 tematiska bildsamlingar`,
    description: `Skapa professionella hitta udda bilden arbetsblad där användarna identifierar och ringar in bilden som inte hör hemma i varje rad av fyra bilder. Två distinkta lägen: Identiskt läge placerar tre kloner bredvid en annorlunda bild från samma tema — användarna hittar den som inte är dubblett. Liknande läge hämtar tre bilder från Tema A och en från Tema B — användarna identifierar den tematiska avvikaren. Per-övning lägesöverskridning med dropdown på varje rad — blanda Identiska och Liknande övningar på ett enda arbetsblad för progressiv svårighet. «Rensa Val»-knapp återställer alla överskridningar. Konfigurera 5–10 övningar (standard 6) med 4 bilder per övning — den uddas position blandas slumpmässigt. Layouten anpassas automatiskt med 2-kolumner för liggande sidor och stående med 7+ övningar. Tvåtemasystem för korsande kategoridiskrimineringspussel. Dubbelarbetsyte-systemet genererar samtidigt arbetsblad och facit — facit ritar röda cirkelkonturer runt det udda objektet med dynamiskt skalad streckbredd (max(imageSize × 0,04, 3px)). En stiliserad rubrik med korall yttre ram (#FF6B6B), bärnstensfärgad inre ram (#FFB84D) och turkos bakgrund (#4ECDC4) visar «Hitta den som inte hör hemma» lokaliserad på alla 11 språk. INTE språkkänsligt — rent visuellt, universellt säljbart utan översättning. Bläddra bland 104 tematiska samlingar med mer än 3 100 illustrationer. Exportera fyra filer per session med 300 DPI. Den gratis provversionen innehåller alla funktioner med vattenstämpel. Köp en licens för att ta bort vattenstämpeln och sälja kommersiellt.`,
  },

  tutorial: {
    title: `Hur du Skapar Hitta Udda Bilden Arbetsblad i 8 Steg`,
    steps: [
      {
        title: `Öppna Hitta Udda Bilden Skaparen`,
        description: `Klicka på «Prova gratis nu» för att starta generatorn. Verktyget laddas direkt med ett inställningssidofält till vänster och en dubbelfliks arbetsyta till höger. Inget konto, ingen nedladdning, ingen installation krävs.`,
      },
      {
        title: 'Välj ditt genereringsläge',
        description: `Öppna panelen Övningskonfiguration. Identiskt läge — tre kloner av samma bild bredvid en annorlunda bild från samma tema. Liknande läge — tre bilder från Tema A och en från Tema B. Varje läge skapar en fundamentalt annorlunda kognitiv utmaning.`,
      },
      {
        title: `Ställ in övningsantal och per-övning överskridningar`,
        description: `Ställ in övningsantalet 5–10 (standard 6). Varje övning innehåller alltid 4 bilder. För blandsvårighets arbetsblad, använd per-övning läges-dropdown på varje rad — börja med enkla Identiska övningar, övergå till svårare Liknande. «Rensa Val»-knappen återställer alla överskridningar. Växla namn/datum-fält och övningsnummer (25px bredd, 15px gap).`,
      },
      {
        title: `Välj teman och bilder från biblioteket`,
        description: `Välj Tema A från dropdownen — ger de tre vanliga bilderna i Liknande läge. Välj Tema B för det udda objektet (t.ex. Tema A = djur, Tema B = mat). Bläddra bland 104 tematiska samlingar med mer än 3 100 illustrationer. I Identiskt läge behövs bara ett tema. Du kan också ladda upp egna bilder.`,
      },
      {
        title: `Ställ in sidlayout och dekorationer`,
        description: `Välj sidstorlek: Letter, A4, Kvadrat (1200×1200) eller anpassad. Välj dekorativt bakgrundstema och ramtema med oberoende opacitetsreglage (0–1, steg 0,05).`,
      },
      {
        title: `Generera hitta udda bilden arbetsbladet`,
        description: `Klicka på Generera. Varje övningskort visar fyra bilder i en horisontell rad — tre vanliga och ett udda objekt med slumpmässigt blandad position. Korten arrangeras i 1–2 kolumner beroende på orientering och övningsantal. En stiliserad rubrik med korall yttre ram (#FF6B6B), bärnstensfärgad inre ram (#FFB84D) och turkos bakgrund (#4ECDC4) visas med lokaliserad titel.`,
      },
      {
        title: `Granska det automatiskt genererade facit`,
        description: `Klicka på fliken Facit. Facit återskapar layouten och ritar röda cirkelkonturer runt det udda objektet i varje rad. Cirkelns streckbredd skalas dynamiskt med bildstorlek (max(imageSize × 0,04, 3px)). Facit genereras samtidigt med arbetsbladet.`,
      },
      {
        title: 'Ladda ner alla fyra filer',
        description: `Växla gråskala för bläckvänliga versioner. Ladda ner alla fyra filer: arbetsblad-JPEG, arbetsblad-PDF, facit-JPEG och facit-PDF med 300 DPI. Klicka på Generera igen för ny slumpmässig blandning, eller byt teman och lägen för snabb variation.`,
      },
    ],
  },

  whatYouCanCreate: [
    {
      title: `Tematiska hitta udda bilden paket efter läge och temaparning`,
      description: `Skapa aktivitetspaket organiserade efter läge och temaparning med de 104 bildsamlingarna. En enda parning som djur mot mat producerar arbetsblad i båda lägena. Paketera 15–20 arbetsblad per paket med autogenererade facit. Använd per-övning överskridningar för blandsvårighets arbetsblad. Den slumpmässiga blandningen gör att varje generering är unik.`,
    },
    {
      title: `KDP visuella diskrimineringsarbetsböcker med progressiv svårighet`,
      description: `Sammanställ 50–80 arbetsblad till tryckta arbetsböcker för Amazon KDP. Strukturera kapitel: Kapitel 1 Identiskt läge, Kapitel 2 Liknande läge med uppenbara kontraster, Kapitel 3 Liknande läge med subtilare distinktioner. Facitsidor med röda cirkelmarkeringar i slutet. Växla gråskala. Det rent visuella formatet kräver ingen översättning.`,
    },
    {
      title: `produktlinjes kritiskt tänkande-aktiviteter med facit`,
      description: `Bygg produktlinjesfärdiga arbetsblad med namn/datum-fält, övningsnummer och facit. Skapa produktkatalogsangränsande set. Per-övning överskridning skapar nivågrupperade versioner på samma sida. Varje arbetsblad exporteras med autogenererat facit.`,
    },
    {
      title: `Blandsvårighets progressiva pusselsidor`,
      description: `Använd per-övning lägesöverskridning för progressiv svårighet — börja med 3 Identiska övningar för uppvärmning, övergå till 3 Liknande för huvudutmaningen. Föräldrar och säljare betalar premiumpriser för inbyggd differentiering.`,
    },
    {
      title: `Säsongsbetonade hitta udda bilden samlingar`,
      description: `Jul, halloween, påsk, skolstart och sommarteman stöder var och en dedikerade säsongspaket. Blanda Identiskt och Liknande lägen. Släpp 4–6 veckor före högtiden.`,
    },
    {
      title: `Flerformats visuella perceptionspaket`,
      description: `Para hitta udda bilden med skuggmatchning, saknade bitar, rutmatchning och bildsortering med koordinerade teman. Varje format riktar sig mot en annorlunda kognitiv färdighet. Flerformats paket motiverar premiumpriser.`,
    },
  ],

  businessIdeas: [
    {
      title: `Tematisk hitta udda bilden pusselbutik på Etsy`,
      description: `Öppna en Etsy-butik specialiserad på hitta udda bilden pussel med de 104 bildsamlingarna. Djur mot mat, fordon mot natur, högtider mot sport — varje kombination blir en separat annons med båda lägena. Tvåtemasystemet producerar varierade korsande kategoridiskrimineringspussel. Varje paket inkluderar autogenererade facit med röda cirkelmarkeringar. Prissätt enskilda temapaket till 30–50 SEK och premium blandlägespaket till 70–120 SEK.`,
      platform: 'Etsy',
    },
    {
      title: `Amazon KDP visuell diskriminering arbetsboksserie`,
      description: `Sammanställ 50–80 arbetsblad till tematiska arbetsböcker. Strukturera efter svårighet: «Enkla Hitta Udda Bilden» med Identiskt läge, «Mellannivå Hitta den Annorlunda» med Liknande läge med uppenbara kontraster, «Avancerad Visuell Diskriminering» med per-övning blandade lägen. Facitsidor med röda cirklar i slutet. Växla gråskala. Det rent visuella formatet publiceras identiskt globalt.`,
      platform: 'Amazon KDP',
    },
    {
      title: `Gumroad produktlinjes hitta udda bilden aktivitetspaket`,
      description: `Ladda upp aktivitetspaket till Gumroad med namn/datum-fält, övningsnummer och autogenererade facit. säljare söker efter kritiskt tänkande och visuella diskrimineringsaktiviteter. Skapa produktkatalogsangränsande set. Varje paket inkluderar Identiskt läge för guidad instruktion och Liknande läge för självständig utmaning — per-övning överskridning kombinerar båda på en sida.`,
      platform: 'Gumroad',
    },
    {
      title: `Pinterest hitta udda bilden trafiktratt`,
      description: `Fyra färgglada bilder i en rad med en som inte hör hemma skapar ett direkt engagerande format. Pinna provarbetsblad som visar båda lägena. Det rent visuella formatet tilltalar alla länder.`,
      platform: 'Pinterest',
    },
    {
      title: `Gumroad komplett hitta udda bilden verktygskit`,
      description: `Paketera arbetsblad över alla 104 teman och båda lägen med per-övning blandade sidor. Inkludera 300+ arbetsblad med autogenererade facit — 600+ filer. Per-övning överskridningssystemet ger mer variation per sida. Verktygskitsformatet motiverar premiumprissättning.`,
      platform: 'Gumroad',
    },
    {
      title: `Global visuell pussel produktlinje`,
      description: `Hitta Udda Bilden producerar rent visuella pussel — fyra bilder per rad utan språkspecifik text. Den automatiskt genererade rubriken översätts till alla 11 språk. Samma produktfiler fungerar i varje land utan översättning. En skapandesession producerar en globalt säljbar katalog.`,
      platform: 'Etsy / Amazon KDP',
    },
  ],

  proTips: [
    {
      title: `Välj distinkta temaparningar för Liknande läge`,
      description: `Kvaliteten beror på hur tydligt det udda objektet sticker ut. Välj uppenbara kategoriskillnader för yngre användare — djur mot fordon. Använd subtilare parningar för avancerade produkter — husdjur mot vilda djur, frukt mot grönsaker. Tvåtemasystemet låter dig kontrollera svårighet genom enbart temaval.`,
    },
    {
      title: `Använd per-övning överskridningar för premium progressiv svårighet`,
      description: `Per-övning läges-dropdown skapar progressiva arbetsblad som betjänar flera nivåer på en sida. Börja med 2–3 Identiska övningar, övergå till 3–4 Liknande. Märk dina annonser som «progressiv svårighet» eller «nivågrupperad utmaning». «Rensa Val»-knappen gör experiment snabbt.`,
    },
    {
      title: `Utnyttja det rent visuella formatet för global försäljning`,
      description: `Hitta udda bilden arbetsblad innehåller bara bilder — ingen språkspecifik text på arbetsbladets innehåll. Varje pussel är direkt säljbart globalt. En uppsättning pussel betjänar varje internationell marknadsplats.`,
    },
    {
      title: `Inkludera båda lägena i varje paket för maximalt upplevt värde`,
      description: `Paket med både Identiskt och Liknande läge erbjuder mer variation. Identiskt läge producerar enklare utmaningar; Liknande läge skapar korsande tematisk diskriminering. Att inkludera båda fördubblar variation och motiverar högre pris.`,
    },
    {
      title: `Utnyttja övningsantal för åldersriktade produkter`,
      description: `Använd 5 övningar för förskoleprodukter med större bildkort. Använd 8–10 för äldre användare. Layouten anpassas automatiskt med 2-kolumner. Märk annonser med specifika åldersintervall.`,
    },
    {
      title: `Använd gråskaleväxling för budgetvänliga produktlinjesprodukter`,
      description: `Skapa dubbelformats paket med både färg och gråskala. Köpare uppfattar det som dubbelt värde. KDP tryck drar också nytta av gråskaleoptimering.`,
    },
    {
      title: `Inkludera facit i varje annonseringsförhandsvisning`,
      description: `Det autogenererade facit med röda cirkelmarkeringar är din starkaste differentiator. Visa röda cirklarna tydligt i produktfoton. Dubbelarbetsyte-systemet genererar båda versionerna samtidigt utan extra tid.`,
    },
  ],

  faq: [
    {
      question: `Finns det en gratis provversion?`,
      answer: `Ja. Alla funktioner upplåsta — båda genereringslägena, per-övning överskridningar med Rensa Val, konfigurerbart övningsantal (5–10), det autogenererade facit med röda cirkelmarkeringar, tvåtemasystemet, alla 104 tematiska bildsamlingar, anpassad bilduppladdning, bakgrunds- och ramteman, namn/datum-fält, övningsnummer, gråskaleväxling och alla nedladdningsformat. Ingen registrering, inget kreditkort. Vattenstämpel på nedladdningar.`,
    },
    {
      question: `Vilka är de två genereringslägena?`,
      answer: `Identiskt läge — tre kloner av samma bild bredvid en annorlunda bild från samma tema, användarna hittar den som inte är dubblett. Liknande läge — tre bilder från Tema A och en från Tema B, användarna identifierar den tematiska avvikaren. Överskrid läget per övning med dropdown på varje rad.`,
    },
    {
      question: `Hur fungerar per-övning lägesöverskridning?`,
      answer: `Varje övningsrad har en dropdown som överskriver det globala läget. Ställ in globalt till Liknande, sedan växla enskilda övningar till Identiskt. «Rensa Val» återställer alla. Detta skapar blandsvårighets arbetsblad.`,
    },
    {
      question: `Hur fungerar tvåtemasystemet i Liknande läge?`,
      answer: `Välj Tema A för de tre vanliga bilderna och Tema B för det udda objektet. Välj bland valfri kombination av 104 teman. I Identiskt läge behövs bara ett tema.`,
    },
    {
      question: `Hur många övningar kan jag inkludera?`,
      answer: `Konfigurerbart 5–10, standard 6. Varje övning har alltid 4 bilder — 3 vanliga + 1 udda med slumpmässig position. Layouten anpassas automatiskt med 2-kolumner vid 7+ övningar stående eller alltid liggande.`,
    },
    {
      question: `Hur fungerar facit med röda cirklar?`,
      answer: `Dubbelarbetsyte-systemet genererar båda flikarna samtidigt. Arbetsbladet — inga markeringar. Facit — röda cirkelkonturer runt det udda objektet i varje rad. Cirkelns streckbredd skalas (max(imageSize × 0,04, 3px)). Fyra nedladdningsfiler.`,
    },
    {
      question: `Hur ser den stiliserade rubriken ut?`,
      answer: `Korall yttre ram (#FF6B6B, 8px), bärnstensfärgad inre ram (#FFB84D, 3px), turkos bakgrund (#4ECDC4). Titel i mörkblågrön Fredoka (#1A535C), instruktioner i röd Quicksand (#E63946). Lokaliseras till alla 11 stödda språk.`,
    },
    {
      question: `Kan jag lägga till namn/datum-fält och övningsnummer?`,
      answer: `Ja. Oberoende kryssrutor. Namn/datum-fält för produktlinjesansvar. Övningsnummer (25px bredd, 15px gap) för enkel referens under genomgång. Båda kan aktiveras tillsammans eller separat.`,
    },
    {
      question: `Är Hitta Udda Bilden Skaparen språkkänslig?`,
      answer: `Nej. Rent visuellt format — ingen text på arbetsbladets innehåll. Fyra bilder per rad och röda cirkelmarkeringar på facit är universella. Det enda lokaliserade elementet är rubriktexten, översatt till alla 11 språk. Universellt säljbart.`,
    },
    {
      question: `Vilka sidstorlekar och exportformat finns?`,
      answer: `Letter, A4, Kvadrat (1200×1200) och anpassade dimensioner. JPEG eller PDF med 300 DPI. Växla gråskala. Varje generering producerar fyra filer: arbetsblad-JPEG, arbetsblad-PDF, facit-JPEG, facit-PDF.`,
    },
    {
      question: `Kan jag sälja hitta udda bilden arbetsblad kommersiellt?`,
      answer: `Ja. Med en kommersiell licens har du fulla rättigheter att sälja som digitala nedladdningar på Etsy, tryckta arbetsböcker på Amazon KDP, produktlinjesresurser på Gumroad eller genom valfri annan kanal.`,
    },
    {
      question: `Vad är er återbetalningspolicy?`,
      answer: `Prova innan du köper med vår gratis provversion — alla funktioner tillgängliga. Eftersom provversionen ger fullständig tillgång erbjuder vi inte återbetalning. Se till att verktyget passar dina behov med provversionen.`,
    },
  ],

  internalLinks: [
    { pageType: 'app', slug: 'hitta-udda-bilden-arbetsblad', anchorText: `Hitta Udda Bilden Pussel — Fullständiga Produktdetaljer` },
    { pageType: 'tool', slug: 'saknade-bitar-skapare', anchorText: 'Saknade Bitar Pussel Skapare' },
    { pageType: 'tool', slug: 'skuggmatchning-skapare', anchorText: 'Skuggmatchning Skapare' },
    { pageType: 'tool', slug: 'rutnaetspussel-skapare', anchorText: 'Rutmatchning Skapare' },
    { pageType: 'tool', slug: 'matchnings-arbetsblad-skapare', anchorText: 'Matchnings Arbetsblad Skapare' },
    { pageType: 'tool', slug: 'sortera-bilder-skapare', anchorText: 'Sortera Bilder Skapare' },
    { pageType: 'tool', slug: 'ordsoek-skapare', anchorText: 'Ordsök Skapare' },
    { pageType: 'tool', slug: 'maelarsidor-skapare', anchorText: 'Målarbilder Skapare' },
  ],

  visuals: {
    heroImages: {
      primary: `/samples/swedish/odd%20one%20out/Hitta%20Udda%20F%C3%A5geln%201.webp`,
      primaryAlt: `Hitta udda bilden arbetsblad med fyra bilder per övningsrad som visar tre vanliga objekt och ett udda objekt med korall-bärnsten-turkos rubrik`,
    },
    sampleGallery: [
      {
        src: `/samples/swedish/odd%20one%20out/Hitta%20Udda%20F%C3%A5geln%202.webp`,
        alt: `Liknande läge hitta udda bilden arbetsblad med tre bilder från Tema A och en tematisk avvikare från Tema B per övningsrad`,
        caption: `Liknande läge — tre bilder från Tema A och ett udda objekt från Tema B för korsande temadiskriminering`,
      },
      {
        src: `/samples/swedish/odd%20one%20out/Hitta%20Udda%20F%C3%A5geln%204.webp`,
        alt: `Identiskt läge hitta udda bilden arbetsblad med tre kloner av samma bild och en annorlunda bild per rad`,
        caption: `Identiskt läge — tre kloner av samma bild och en annorlunda bild för hitta-dubbletten utmaningar`,
      },
      {
        src: `/samples/swedish/odd%20one%20out/Hitta%20Udda%20F%C3%A5geln%201%20answer-key.webp`,
        alt: `Hitta udda bilden facit med röda cirkelkonturer dragna runt det udda objektet i varje övningsrad med streckbredd skalad till bildstorlek`,
        caption: `Automatiskt genererat facit — röda cirkelmarkeringar (streck = max(imageSize × 0,04, 3px)) identifierar det udda objektet`,
      },
    ],
    youtubeId: '0R6WFUfY7Mk',
    videoTitle: `Hur du Skapar Hitta Udda Bilden Arbetsblad med Två Genereringslägen, Per-Övning Överskridningar och Automatiska Facit — Steg-för-Steg Handledning`,
  },
};

export default content;
