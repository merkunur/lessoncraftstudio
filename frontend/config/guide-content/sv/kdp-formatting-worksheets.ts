import type { GuideContent } from '../types';

const content: GuideContent = {
  seo: {
    primaryKeyword: 'KDP-formatering för arbetsböcker guide',
    secondaryKeywords: [
      'KDP formateringsguide för arbetsbladsböcker',
      'Amazon KDP manuskriptformatering specifikationer',
      'KDP trimstorlek marginaler utfall arbetsbladsböcker',
      'tryckfärdig PDF-export KDP aktivitetsböcker',
    ],
    lsiKeywords: [
      'KDP trimstorlek 8.5x11 6x9 8x10 arbetsblad interiörlayout',
      'manuskriptmarginaler innermarginal bindning säker zon utfallsområde',
      'PDF-export 300 DPI typsnittsinbäddning gråskala CMYK',
      'KDP omslag dimensioner ryggbredd streckkod placering kalkylator',
      'sidnumrering förmaterial bakmaterial innehållsförteckning',
      'KDP uppladdningsfel avvisning felsökning förhandsgranskning provtryck',
    ],
    titleTag: 'KDP-formatering för arbetsböcker | LessonCraftStudio',
    metaDescription: 'KDP formateringsguide som täcker trimstorlekar, marginaler, utfallsinställningar, PDF-export vid 300 DPI, omslagsdimensioner och felsökning för aktivitetsböcker',
  },

  hero: {
    title: 'KDP formateringsguide för arbetsbladsböcker',
    tagline: 'Den definitiva tekniska referensen för formatering av arbetsblads- och aktivitetsböcker för Amazon KDP — täcker trimstorleksval för olika aktivitetstyper, marginal- och innermarginalberäkningar för bekvämt skrivutrymme, utfall kontra icke-utfall-konfiguration, tryckfärdig PDF-export vid 300 DPI med inbäddade typsnitt, omslagsdimensionsberäkningar inklusive ryggbredd och streckkodszoner, komplett manuskriptsammansättning från förmaterial till lösningssektioner, och felsökning av de vanligaste KDP-uppladdningsavvisningarna och formateringsfel',
    description: 'En perfekt designad arbetsbladsbok betyder ingenting om KDP avvisar manuskriptet eller det tryckta resultatet har text som försvinner in i bindningen, marginaler för smala för att barn ska kunna skriva i, eller suddiga bilder från lågupplöst export. Denna guide täcker de tekniska formateringsspecifikationerna som skiljer en professionell KDP-publikation från en amatörmässig — de exakta måtten, inställningarna och exportprocedurerna som säkerställer att dina arbetsblads- och aktivitetsböcker trycks korrekt varje gång.',
  },

  introduction: 'Formatering är där de flesta förstagångs-KDP-publicerare förlorar timmar på undvikbara misstag. De designar vackra arbetsbladssidor i sitt favoritlayoutverktyg, laddar upp till KDP och upptäcker att marginalerna är för små, PDF-upplösningen otillräcklig, omslagsdimensionerna fel, eller sidantalet faller utanför KDP:s accepterade intervall. Varje avvisning innebär ytterligare en omgång korrigeringar, omexport och omladdning — förseningar som sammansätts när du försöker bygga en katalog effektivt.\n\nArbetsblads- och aktivitetsböcker har strängare formateringskrav än vanliga textböcker. En roman behöver tillräckliga marginaler för bekväm läsning. En arbetsbladsbok behöver tillräckliga marginaler för bekväm skrivning — barn som håller i pennor, vuxna som ringar in ord i pusselrutnät, användare som löser matteproblem i avsedda svarsutrymmen. Marginalkraven är större, layoutprecisionen spelar större roll, och konsekvenserna av att göra fel syns omedelbart i den tryckta produkten.\n\nDenna guide ger de exakta specifikationerna du behöver i varje steg av formateringsprocessen. Trimstorleksval kommer först eftersom det bestämmer varje efterföljande mått. Marginaler och säkra zoner kommer sedan. Sidlayout för olika aktivitetstyper kommer tredje. Utfallskonfiguration, PDF-exportinställningar, omslagsdimensioner, manuskriptsammansättning och felsökning av uppladdning kompletterar arbetsflödet.\n\nFör vägledning om innehållsskapande — vilka typer av arbetsblad att skapa, svårighetsprogressionens struktur — se guiden om matteaktivitetsböcker. För affärsstrategi — prissättning, katalogplanering — se guiden om att tjäna pengar med KDP aktivitetsböcker. Denna guide förutsätter att du har innehåll färdigt och fokuserar uteslutande på att formatera det korrekt för KDP tryckproduktion.',

  tutorial: [
    {
      heading: 'Välj rätt trimstorlek för din arbetsbladsbok',
      content: 'Trimstorlek är den färdiga dimensionen på din tryckta bok, och det är det enskilt mest konsekvensrika formateringsbeslutet. Varje marginalberäkning, rutnätsstorlek, innehållsyta och omslagsdimension beror på den trimstorlek du väljer. Att ändra trimstorlek efter att layouten är klar innebär att göra om praktiskt taget allt formateringsarbete.\n\nAmazon KDP stöder över 30 trimstorlekar för pocketböcker, men arbetsblads- och aktivitetsböcker använder realistiskt tre. Formatet 8,5 x 11 tum är branschstandard för pedagogiska arbetsblad, mattearbetsböcker och helsides aktivitetssidor. Det matchar standard amerikanskt brevpapper, vilket innebär att köpare kan kopiera enskilda sidor. Den stora sidytan ger maximalt arbetsutrymme för skrivning, ritning och pussellösning. Över 80 procent av framgångsrika arbetsbladsböcker på KDP använder detta format.\n\nFormatet 8 x 10 tum erbjuder en liten minskning av sidytan men bibehåller ett substantiellt arbetsutrymme. Vissa publicerare föredrar det eftersom tryckningskostnaden är marginellt lägre och boken känns något mer kompakt. Det fungerar bra för aktivitetsböcker som inte kräver fullt brevstorlek-arbetsutrymme — målarböcker, labyrintböcker och aktivitetssidor med måttliga skrivkrav.\n\nFormatet 6 x 9 tum är standard för texttunga böcker och fungerar för specifika aktivitetsbok-nischer som reseaktivitetsböcker och fickpusselböcker. Dock är 6 x 9 generellt för litet för mattearbetsblad, ordsökningsrutnät eller aktiviteter som kräver substantiellt skrivutrymme. Barn behöver särskilt större format.\n\nTrimstorlek påverkar direkt tryckningskostnad och därmed din royalty. Kör royaltymatematiken vid ditt målpris och sidantal för varje trimstorlek innan du bestämmer dig.',
    },
    {
      heading: 'Ställ in marginaler och säkra zoner korrekt',
      content: 'Marginaler bestämmer gränsen mellan ditt innehållsområde och sidans kant. KDP upprätthåller minimummarginaler, men arbetsbladsböcker bör använda marginaler väsentligt större än dessa minimum eftersom användare fysiskt skriver på sidorna.\n\nKDP:s minimummarginaler för pocketböcker är 0,25 tum på övre, nedre och yttre kanterna, med en innermarginal (inre kanten nära bindningen) som varierar med sidantal. För böcker upp till 150 sidor är minimum innermarginal 0,375 tum. För 151 till 400 sidor 0,75 tum. För 401 till 828 sidor 1 tum.\n\nFör arbetsbladsböcker, behandla KDP-minimum som absoluta golv, inte mål. Rekommenderade marginaler för bekväm användning är 0,5 tum på övre och nedre kanten, 0,5 tum på yttre kanten och 0,75 tum för innermarginalen oavsett sidantal. Dessa större marginaler förhindrar att innehåll kryper för nära trimkanten, ger användare bekvämt fingergrepsutrymme när boken ligger platt, och viktigast håller skrivytor borta från bindningen.\n\nInnermarginalen förtjänar särskild uppmärksamhet. När en limbunden pocketbok ligger öppen kurvar sidorna in mot ryggen. Innehåll placerat för nära innerkanten blir fysiskt otillgängligt — användare kan inte skriva där eftersom sidan kurvar bort från deras penna.\n\nBeräkna ditt användbara innehållsområde genom att subtrahera marginaler från trimstorlek. För en 8,5 x 11 tums bok med 0,5 tums övre/nedre/yttre marginaler och 0,75 tums innermarginal: innehållsbredd = 8,5 minus 0,5 minus 0,75 = 7,25 tum. Innehållshöjd = 11 minus 0,5 minus 0,5 = 10 tum. Detta 7,25 x 10 tums innehållsområde är din faktiska arbetsyta.',
    },
    {
      heading: 'Konfigurera sidlayout för arbetsbladsinnehåll',
      content: 'Olika aktivitetstyper kräver olika sidlayoutmetoder inom ditt definierade innehållsområde. Layouten måste balansera informationstäthet mot fysisk användbarhet.\n\nMattearbetsblad behöver tydligt definierade problemområden med tillräckligt svarsutrymme. För ensiffrig addition och subtraktion riktade mot förskoleklass till årskurs 2 bör varje problemcell vara minst 0,8 x 0,8 tum för att rymma ett barns handstil. En standardlayout rymmer ett 5-kolumner x 4-rader rutnät med 20 problem på en 8,5 x 11-sida. För flersiffriga operationer riktade mot årskurs 3 och uppåt behöver problem vertikal justeringsplats — varje problemområde bör vara minst 1,2 tum högt.\n\nOrdsökningsrutnät kräver konsekvent bokstavsavstånd. Varje cell i rutnätet bör vara minst 0,3 tum i kvadrat för vuxna standardpussel, eller 0,4 tum eller större för barn och storskriftsutgåvor. Ett 15 x 15 rutnät vid 0,3 tum per cell upptar 4,5 x 4,5 tum.\n\nMålar- och ritsidor bör använda maximalt innehållsområde med minimala icke-aktivitetselement. Placera illustrationen inom hela innehållsgränsen, med bara ett litet sidhuvud.\n\nHandskrifts- och övningsarbetsblad behöver noggrant uppmätta linjerade rader. För förskola: 0,5 tums avstånd baslinje till baslinje med streckad mittlinje. Årskurs 1–2: 0,375 tum. Årskurs 3 och uppåt: standard 0,3 tum.\n\nSidhuvuden och sidfötter bör vara minimala men funktionella. Inkludera sidnummer centrerat i sidfoten. Håll höjden inom 0,3 tum.',
    },
    {
      heading: 'Hantera utfall och icke-utfall-inställningar',
      content: 'Utfall bestämmer om ditt innehåll sträcker sig till sidans ytterkant eller stannar inom en vit ram. Denna inställning påverkar dina manuskriptdimensioner och är en av de vanligaste källorna till KDP-uppladdningsfel.\n\nDe flesta arbetsblads- och aktivitetsböcker bör använda icke-utfall-inställningen. Icke-utfall innebär att ditt innehåll stannar inom marginalerna och vitt utrymme omger varje sida. Detta är det korrekta valet för mattearbetsblad, pusselrutnät, handskriftsövningar och alla aktivitetstyper där innehållet är självinneslutande inom ramar.\n\nUtfall krävs när designelement avsiktligt sträcker sig till sidans kant utan vit ram. Målarböcker med kant-till-kant-illustrationer, aktivitetssidor med helsidig bakgrundsmönster behöver utfall. När utfall är aktiverat kräver KDP ytterligare 0,125 tum på varje kant — dina manuskriptdimensioner ökar med 0,25 tum i både bredd och höjd. För en 8,5 x 11 tums trim med utfall måste dina manuskriptsidor vara 8,75 x 11,25 tum.\n\nUtfallsområdet är zonen som trimmas bort under boktillverkning. Innehåll i denna zon kan eller kan inte synas i slutprodukten. Placera aldrig viktig text, svarsutrymmen, pusselrutnät eller instruktioner i utfallszonen.\n\nOm din bok har en mix av utfalls- och icke-utfallssidor, ställ hela manuskriptet på utfall och säkerställ att dina icke-utfallssidor har innehåll positionerat inom standardmarginalerna. Du kan inte blanda utfallsinställningar inom ett enskilt manuskript.\n\nEtt vanligt misstag är att aktivera utfall men inte sträcka innehåll till trimkanten. Detta skapar en ojämn vit ram som ser ut som ett tryckfel.',
    },
    {
      heading: 'Exportera tryckfärdiga PDF:er vid 300 DPI',
      content: 'KDP kräver PDF-filer för både interiörmanuskriptet och omslaget. PDF:en måste uppfylla specifika tekniska standarder för tryckåtergivning.\n\nUpplösningen måste vara minst 300 DPI (punkter per tum) för alla bilder och grafiska element. Detta är ett hårt krav för professionell tryckkvalitet. Skärmupplösning är typiskt 72 eller 96 DPI, så bilder som ser skarpa ut på din monitor kommer se suddiga och pixlade ut i tryck om de inte skapats vid 300 DPI. När du använder arbetsbladsgeneratorer, exportera vid maximal tillgänglig upplösning. Verifiera att bildernas faktiska DPI vid deras placerade storlek är minst 300.\n\nTypsnitt måste bäddas in i PDF:en. Om typsnitt inte bäddas in avvisar KDP antingen filen eller ersätter med standardtypsnitt som förstör din layout. De flesta PDF-exportverktyg har ett alternativ för att bädda in alla typsnitt — aktivera det.\n\nFärgläget bör vara gråskala eller CMYK för svartvita interiörer. RGB-färgläge är för skärmar, inte tryck. Exportera i gråskala för svartvita arbetsbladsböcker — detta producerar också mindre filstorlekar. För böcker med färgelement, använd CMYK.\n\nPDF-filstorleken har en praktisk gräns på 650 MB för interiörfilen och 40 MB för omslaget.\n\nPlatta all transparens före export. Transparenseffekter kan orsaka renderingsproblem i tryck.\n\nEfter export, öppna din PDF och granska varje sida vid 100 procents zoom. Kontrollera att text är skarp, bilder tydliga, marginaler konsekventa.',
    },
    {
      heading: 'Designa KDP-kompatibla omslag',
      content: 'KDP-omslag har exakta dimensionskrav beräknade från din boks trimstorlek, sidantal och papperstyp. Ett felaktigt dimensionerat omslag är den enskilt vanligaste anledningen till KDP-manuskriptavvisning.\n\nOmslaget skickas som en enda PDF innehållande baksida, rygg och framsida i en sammanhängande bild. Total bredd = baksidans bredd plus ryggbredd plus framsidans bredd plus 0,25 tum (för 0,125 tums utfall på varje sida). Total höjd = trimhöjden plus 0,25 tum. Omslagsutfall krävs alltid oavsett din interiörs utfallsinställning.\n\nRyggbredden beror på sidantal och papperstyp. För vitt papper (standard för de flesta arbetsbladsböcker): sidantal multiplicerat med 0,002252 tum. En 60-sidors bok har ungefär 0,135 tums rygg. En 100-sidors bok ungefär 0,225 tum. En 150-sidors bok ungefär 0,338 tum. KDP tillhandahåller en omslagskalkylator — använd den istället för manuell beräkning.\n\nFör en 8,5 x 11 tums bok med 80 sidor på vitt papper: ryggbredd = 80 × 0,002252 = ungefär 0,18 tum. Total omslagsbredd = 8,5 + 0,18 + 8,5 + 0,25 = 17,43 tum. Total omslagshöjd = 11 + 0,25 = 11,25 tum.\n\nSäkra zoner på omslaget är kritiska. Håll all viktig text och designelement minst 0,25 tum från trimkanterna och minst 0,0625 tum från ryggvecket. Ryggområdet är opålitligt för text på böcker under 100 sidor. KDP tillåter inte ryggtext på böcker under 79 sidor.\n\nBaksidan måste lämna en streckkodzon i nedre högra området — ungefär 2 tum bred och 1,2 tum hög. Exportera omslaget vid 300 DPI i CMYK-färgläge.',
    },
    {
      heading: 'Montera det kompletta manuskriptet',
      content: 'Ett komplett KDP-manuskript är en enda PDF-fil som innehåller varje sida i din bok i korrekt ordning. KDP trycker exakt det du skickar — det finns ingen automatiserad sidinfogning, numrering eller formatering.\n\nManuskriptstrukturen för en arbetsbladsbok följer denna standardordning: titelsida (sida 1), copyrightssida (sida 2), innehållsförteckning eller användningsinstruktioner (sida 3), valfri introduktion (sida 4), aktivitetssidor organiserade per sektion (huvuddelen), lösningar eller facit (nära slutet), och bakmaterial inklusive en om-författaren-sida och lista över dina andra titlar.\n\nTitelsidan bör inkludera boktitel, undertitel och författar- eller förlagsnamn. Håll det rent — detta är första sidan en köpare ser i Amazons Titta inuti-förhandsgranskning. Copyrightssidan inkluderar copyrightmeddelande, år, förlagsnamn och rättighetsuttalande.\n\nInnehållsförteckningen är nödvändig för böcker organiserade i sektioner. Lista varje sektion med sitt startsidnummer.\n\nSidantalskrav för KDP: minimum 24 sidor, maximum 828 sidor. Sidantalet måste vara jämnt — om ditt innehåll slutar på udda antal, lägg till en blank sida. KDP räknar varje sida inklusive blanka, förmaterial och bakmaterial.\n\nSidnumrering bör starta efter förmaterialet. Titelsida och innehållsförteckning numreras typiskt med romerska siffror. Aktivitetssidor börjar med arabisk siffra 1.\n\nInnan export, verifiera genom att bläddra igenom hela PDF:en sida för sida. Bekräfta att sidnummer är sekventiella, lösningar refererar rätt sidor, sektionsrubriker visas korrekt.',
    },
    {
      heading: 'Ladda upp och felsök KDP-formateringsproblem',
      content: 'KDP:s uppladdningsprocess validerar ditt manuskript mot tekniska specifikationer och flaggar fel före publicering. Att förstå de vanligaste felen sparar betydande tid.\n\nDen vanligaste avvisningsorsaken är felaktiga omslagsdimensioner. Även en bråkdels tum fel utlöser avvisning. Använd alltid KDP:s omslagskalkylator. Om du ändrar sidantal efter att ha skapat omslaget måste du räkna om och ändra storlek.\n\nLågupplösta bilder orsakar kvalitetsvarningar. KDP flaggar bilder under 300 DPI vid tryckstorlek. Ignorera inte upplösningsvarningar — låg-DPI-bilder är synligt suddiga i tryck.\n\nMarginalöverträdelser uppstår när innehåll sträcker sig in i minimummarginalzonen. Om du satte generösa marginaler bör du aldrig stöta på detta fel.\n\nTypsnittsembeddningsfel visas som saknad eller ersatt text i KDP:s förhandsgranskning. Om ditt uppladdade manuskript visar andra typsnitt, exportera om med bädda-in-alla-typsnitt aktiverat.\n\nEfter uppladdning, använd alltid KDP Online Previewer för att granska sida för sida. Förhandsgranskaren visar exakt hur din bok kommer se ut i tryck.\n\nBeställ en provkopia innan du godkänner för publicering. Provtrycket är en fysisk utskrift till självkostnadspris (typiskt 2 till 5 dollar plus frakt). Ingen digital förhandsgranskning ersätter att hålla den tryckta boken, öppna den platt och fysiskt testa aktiviteterna. Skriv i svarsutrymmena. Ringa in ord i ordsökningsrutnäten. Lös ett matteproblem. Om något känns trångt eller svårtillgängligt, fixa innan publicering.',
    },
  ],

  platformTips: [
    {
      heading: 'Använd KDP:s tryckningskostnadskalkylator innan du slutför layouten',
      content: 'Slutför aldrig ett sidantal och trimstorlek utan att köra siffrorna genom KDP:s tryckningskostnadskalkylator. Ange ditt målsidantal, trimstorlek, bläcktyp och marknadsplats. Kalkylatorn returnerar exakt tryckningskostnad. Ibland minskar ditt sidantal med 4 till 8 sidor — tar bort överflödiga aktivitetssidor eller stramar åt förmaterialet — och det sänker dig till en lägre kostnadsnivå som meningsfullt ökar din royalty per försäljning. Gör dessa justeringar innan formatering, inte efter.',
    },
    {
      heading: 'Skapa återanvändbara mallar för konsekvent formatering',
      content: 'Bygg en huvudmall för varje trimstorlek du publicerar i. Mallen bör ha marginaler, sidhuvuden, sidfötter, sidnummer och innehållsyteguider redan definierade. För varje ny bok, duplicera mallen och placera ditt innehåll i de fördefinierade områdena. Detta eliminerar marginal- och formateringsfel och dramatiskt snabbar upp produktion. Om du publicerar en serie garanterar mallen visuell konsistens mellan volymer.',
    },
    {
      heading: 'Exportera en test-PDF före slutlig export',
      content: 'Innan din slutliga högupplösta export, skapa en snabb lågupplöst test-PDF och ladda upp den till KDP som ett utkast. KDP:s valideringskontroller körs omedelbart och flaggar dimensionsfel, marginalöverträdelser och sidantalsproblem inom minuter. Fixa flaggade problem i din källfil, utför sedan din slutliga 300 DPI-export. Denna tvåpassmetod fångar strukturella problem tidigt utan att slösa tid på en full högupplöst export som kan behöva göras om.',
    },
  ],

  monetization: [
    {
      heading: 'Hur formateringsval direkt påverkar vinst',
      content: 'Varje formateringsbeslut har en ekonomisk konsekvens. Trimstorlek påverkar tryckningskostnad — en 8,5 x 11 tums bok kostar mer att trycka än en 6 x 9 tums bok med samma sidantal. Sidantal påverkar linjärt — varje extra sida adderar ungefär 0,012 dollar för svartvitt eller 0,07 dollar för färg. Att välja färg istället för svartvitt kan minska din royalty med 3 till 4 dollar per försäljning. Formateringsbeslut som verkar mindre — lägga till 10 extra sidor förmaterial, använda färg när gråskala fungerar, välja större trim än nödvändigt — sammansätts till att betydligt erodera din vinst per försäljning.',
    },
    {
      heading: 'Professionell formatering motiverar högre priser',
      content: 'Köpare jämför din bok mot konkurrenter i Amazon-sökresultat. En professionellt formaterad interiör — konsekventa marginaler, korrekt dimensionerade rutnät, tydlig sidnumrering, välorganiserade sektioner — stöder ett högre pris eftersom det signalerar kvalitet. Köpare som använder Titta inuti-förhandsgranskningen märker omedelbart formateringskvalitet. En bok prissatt till 9,99 dollar med professionell formatering outsäljer en bok till 6,99 dollar med slarvig formatering. Tiden du investerar i korrekt formatering översätts direkt till högre hållbar prissättning.',
    },
    {
      heading: 'Mallåteranvändning accelererar katalogbyggande',
      content: 'När du skapat en korrekt formaterad mall för en specifik trimstorlek och aktivitetstyp tar varje efterföljande bok i det formatet en bråkdel av den ursprungliga inställningstiden. Din första 8,5 x 11 tums mattearbetsbok kan ta flera timmar att formatera korrekt. Din andra bok med samma mall tar minuter att ställa in. Denna effektivitetsvinst är hur framgångsrika KDP-publicerare skalar till 10, 20 eller 50 titlar — formateringsarbetet frontladdas, och varje efterföljande titel drar nytta av investeringen.',
    },
  ],

  examples: [
    {
      heading: 'Exempel: Formatera en 60-sidors mattearbetsbok för KDP',
      content: 'En första klassens additionsarbetsbok med 8,5 x 11 tums trim utan utfall. Marginaler satta till 0,5 tum övre och nedre, 0,5 tum yttre och 0,75 tum innermarginal, skapar ett innehållsområde på 7,25 x 10 tum. Manuskriptet innehåller 68 totala sidor: titelsida, copyrightssida, innehållsförteckning, instruktionssida, 50 aktivitetssidor (25 problem per sida organiserade som 5-kolumner x 5-rader rutnät med 0,85-tums celler, progression genom Enkel, Medium och Svår sektioner), 4-sidigt facit med miniatyrrutnät som visar lösningar, och 4 sidor bakmaterial. Alla sidor svartvita. PDF exporterad vid 300 DPI i gråskala med alla typsnitt inbäddade och transparens plattad. Filstorlek ungefär 8 MB. Omslagsdimensioner: ryggbredd = 68 × 0,002252 = 0,153 tum, total omslagsbredd = 8,5 + 0,153 + 8,5 + 0,25 = 17,403 tum, total omslagshöjd = 11,25 tum. Tryckningskostnad ungefär 1,67 dollar. Prissatt till 8,99 dollar ger royalty ungefär 3,72 dollar per försäljning.',
    },
    {
      heading: 'Exempel: Formatera en 100-sidors ordsökningsbok med utfall',
      content: 'En vuxen ordsökningsbok med 8,5 x 11 tums trim med utfall aktiverat för dekorativa kantelement. Manuskriptets siddimensioner 8,75 x 11,25 tum för att rymma 0,125-tums utfall på varje sida. Innehållsmarginaler 0,5 tum från trimlinjen (0,625 tum från manuskriptkanten) på övre, nedre och yttre kanten, 0,75 tum från trimlinjen (0,875 tum från manuskriptkanten) för innermarginalen. Varje ordsökningsrutnät använder 0,3-tums celler i en 15 x 15 layout som upptar 4,5 x 4,5 tum. Manuskriptet innehåller 116 totala sidor: 4 sidor förmaterial, 100 ordsökningspussel organiserade i Enkel (35 pussel med 12 x 12 rutnät), Medium (35 pussel med 15 x 15 rutnät) och Svår (30 pussel med 18 x 18 rutnät), 10-sidigt facit med 4 miniatyrrutnät per sida, och 2 sidor bakmaterial. Exporterad vid 300 DPI i gråskala. Ryggbredd = 116 × 0,002252 = 0,261 tum. Total omslagsbredd 17,511 tum. Tryckningskostnad ungefär 2,24 dollar. Prissatt till 9,99 dollar ger royalty ungefär 3,75 dollar.',
    },
  ],

  faq: [
    {
      question: 'Vilken är den bästa trimstorleken för arbetsbladsböcker på KDP?',
      answer: 'Formatet 8,5 x 11 tum är standard för pedagogiska arbetsblad, mattearbetsböcker, ordsökningsböcker och aktivitetsböcker som kräver skrivutrymme. Det ger det största innehållsområdet. Använd 8 x 10 tum för målarböcker eller aktivitetsböcker utan maximalt skrivutrymmesbehov. Använd 6 x 9 tum bara för reseformat eller journal-aktivitetsböcker. För aktiviteter där barn skriver, ritar eller löser problem på sidan är 8,5 x 11 tum det säkraste valet.',
    },
    {
      question: 'Vilka marginaler bör jag använda för KDP arbetsbladsböcker?',
      answer: 'Använd 0,5 tum på övre, nedre och yttre kanterna, och 0,75 tum för innermarginalen. Dessa överstiger KDP-minimum men är nödvändiga för arbetsbladsböcker där användare fysiskt skriver. KDP:s minimummarginaler (0,25 tum yttre, 0,375 tum innermarginal för under 150 sidor) är designade för textböcker, inte aktivitetsböcker. Arbetsbladsinnehåll placerat vid minimummarginaler känns trångt, och svarsutrymmen nära innermarginalen blir fysiskt otillgängliga.',
    },
    {
      question: 'Bör jag använda utfall eller icke-utfall för min arbetsbladsbok?',
      answer: 'Använd icke-utfall för de flesta arbetsblads- och aktivitetsböcker. Mattearbetsblad, pusselrutnät, handskriftsövningar och strukturerade aktivitetssidor fungerar perfekt med vita marginaler. Använd utfall bara när designelement avsiktligt sträcker sig till sidans kant — målarböcker med kant-till-kant-illustrationer eller sidor med helsidig bakgrund. Aktivera aldrig utfall utan att faktiskt sträcka innehåll till utfallskanten.',
    },
    {
      question: 'Vilken upplösning och format bör min PDF ha för KDP?',
      answer: 'Exportera vid minst 300 DPI i PDF-format med alla typsnitt inbäddade. Använd gråskala för svartvita interiörer, CMYK för färg. Platta all transparens. Maximal filstorlek är 650 MB för interiören och 40 MB för omslaget. Bilder måste vara 300 DPI vid sin tryckstorlek — en bild som ser bra ut på skärm vid 72 DPI kommer se suddig ut i tryck. Granska PDF:en vid 100 procents zoom efter export.',
    },
    {
      question: 'Hur beräknar jag omslagsdimensioner för min KDP-bok?',
      answer: 'Omslags-PDF:en är en ensidofil med baksida, rygg och framsida. Total bredd = baksidans bredd plus ryggbredd plus framsidans bredd plus 0,25 tum utfall. Total höjd = trimhöjd plus 0,25 tum. Ryggbredd för vitt papper = sidantal × 0,002252 tum. Baksidan måste reservera en streckkodzon på ungefär 2 x 1,2 tum i nedre högra hörnet. Håll viktig text 0,25 tum från trimkanter. Använd KDP:s omslagskalkylator.',
    },
    {
      question: 'Vilka är de vanligaste orsakerna till att KDP avvisar ett manuskript?',
      answer: 'De främsta avvisningsorsakerna för arbetsbladsböcker är felaktiga omslagsdimensioner, innehåll i minimummarginalzoner, lågupplösta bilder under 300 DPI, typsnitt ej inbäddade i PDF:en, och sidantal under 24 eller över 828. Mindre vanliga men fortfarande frekventa problem inkluderar udda sidantal (måste vara jämnt), omslagstext i streckkodszon, ryggtext på böcker under 79 sidor och PDF-filkorruption från ofullständig export. Använd KDP:s förhandsgranskare.',
    },
    {
      question: 'Vad är återbetalningspolicyn för kommersiella licenser som används för KDP arbetsbladsböcker?',
      answer: 'Varje generator erbjuder en gratis provversion med vattenstämpel så att du kan utvärdera verktyget fullständigt före köp. Skapa kompletta arbetsblad med alla funktioner, testa olika konfigurationer, verifiera tryckkvaliteten vid 300 DPI och bekräfta att formatet uppfyller KDP:s krav. Eftersom du kan grundligt utvärdera produkten innan köp är alla kommersiella licensförsäljningar slutgiltiga.',
    },
  ],

  nextSteps: [
    {
      slug: 'matte-aktivitetsboecker-kdp',
      title: 'Skapa matteaktivitetsböcker för Amazon KDP',
      description: 'Den kompletta guiden till att skapa matteaktivitetsböcker. Täcker innehållsskapande, svårighetsprogression och KDP-grundläggande som kompletterar formateringsspecifikationerna i denna guide.',
    },
    {
      slug: 'publicera-pusselboecker-kdp',
      title: 'Publicera pusselböcker på Amazon KDP',
      description: 'Täcker pusselspecifik innehållsstrategi, enkeltyps kontra variationsformat, och katalogbyggande metoder för ordsökning, korsord och sudoku på Amazon.',
    },
    {
      slug: 'tjaena-pengar-kdp-aktivitetsboecker',
      title: 'Tjäna pengar med KDP aktivitetsböcker',
      description: 'Den heltäckande intäktsguiden för KDP-publicerare. Täcker prisstrategi, katalogekonomi, säsongsbetonad publicering och flerplattforms-tillvägagångssätt.',
    },
  ],

  internalLinks: [
    { pageType: 'guide', slug: 'matte-aktivitetsboecker-kdp', anchorText: 'Hur du skapar matteaktivitetsböcker för Amazon KDP' },
    { pageType: 'guide', slug: 'publicera-pusselboecker-kdp', anchorText: 'Hur du publicerar pusselböcker på Amazon KDP' },
    { pageType: 'guide', slug: 'ordsoeksboecker-kdp', anchorText: 'Hur du skapar ordsökningsböcker för Amazon KDP' },
    { pageType: 'guide', slug: 'tjaena-pengar-kdp-aktivitetsboecker', anchorText: 'Hur du tjänar pengar med KDP aktivitetsböcker' },
    { pageType: 'guide', slug: 'baesta-kdp-aktivitetsbok-nischer', anchorText: 'Bästa KDP aktivitetsbok-nischer' },
    { pageType: 'guide', slug: 'sudoku-boecker-kdp', anchorText: 'Hur du skapar sudokuböcker för Amazon KDP' },
    { pageType: 'guide', slug: 'kdp-eller-etsy-printables', anchorText: 'Amazon KDP vs Etsy: Var du säljer utskrifter' },
    { pageType: 'guide', slug: 'skapa-additions-arbetsblad', anchorText: 'Hur du skapar additionsarbetsblad för barn' },
    { pageType: 'start', slug: 'komplett-guide-utskriftsbart-foeretag', anchorText: 'Komplett guide till att starta utskriftsbart företag' },
    { pageType: 'start', slug: 'kommersiell-licensguide', anchorText: 'Kommersiell licensguide' },
    { pageType: 'app', slug: 'matematik-arbetsblad', anchorText: 'Mattearbetsblad Generator — Fullständig information' },
  ],

  toolsRecommended: [
    {
      appId: 'math-worksheet',
      title: 'Mattearbetsblad Generator',
      description: 'Skapar rutnätsbaserade mattearbetsblad med exakt cellstorlek och avstånd idealiskt för att demonstrera KDP-formateringskrav. Mattearbetsblad kräver noggrann justering och tillräckligt svarsutrymme.',
    },
    {
      appId: 'image-addition',
      title: 'Additions Arbetsblad Generator',
      description: 'Producerar rena enoperations-arbetsbladssidor som demonstrerar enkel KDP-sidlayout. Varje arbetsblad har en konsekvent rutnätsstruktur som översätts direkt till professionella KDP-interiörsidor.',
    },
    {
      appId: 'wordsearch',
      title: 'Ordsökning Arbetsblad Generator',
      description: 'Genererar ordsökningsrutnät som illustrerar rutnätsavståndskrav för KDP-pusselboksformatering. Generatorns anpassningsbara storlekar matchar celldimensioner till din valda trimstorlek.',
    },
    {
      appId: 'writing-app',
      title: 'Skrivövningar Arbetsblad Generator',
      description: 'Skapar linjerade handskriftsövningssidor som demonstrerar linjeavstånds- och övningsytaformatering. Handskriftsarbetsblad har de strängaste avståndskraven för åldersanpassade radlinjer.',
    },
    {
      appId: 'coloring',
      title: 'Målarbild Generator',
      description: 'Producerar helsidesillustrationer som demonstrerar utfall kontra icke-utfall-formateringsbeslut. Målarbilder är den primära aktivitetstypen som drar nytta av utfallsinställningar.',
    },
  ],

  visuals: {
    heroImage: { src: '/samples/swedish/math%20worksheet/mattetal%20landscape.jpeg', alt: 'Mattearbetsblad som visar rutnätslayout och avstånd formaterat för Amazon KDP tryckspecifikationer' },
    samples: [
      { src: '/samples/swedish/math%20worksheet/mattetal%20landscape.jpeg', alt: 'Mattearbetsblad med exakt rutnätsavstånd som demonstrerar KDP marginal- och layoutkrav', caption: 'Mattearbetsblad layout — rutnätsbaserad formatering med tillräcklig cellstorlek för bekväm handskrift inom KDP-marginalspecifikationer' },
      { src: '/samples/swedish/wordsearch/ordletning%20portrait.jpeg', alt: 'Ordsökningspussel-rutnät med bokstavsavstånd formaterat för KDP-tryck', caption: 'Ordsökningsrutnät — konsekvent bokstavsavstånd vid 0,3-tums celler säkerställer bekväm inringning och läsbarhet i KDP-tryckta böcker' },
      { src: '/samples/swedish/addition/addition_%C3%B6vning.jpeg', alt: 'Additionsarbetsblad som demonstrerar ren ensids KDP-layout', caption: 'Additionsarbetsblad — ren enoperationslayout med tydliga svarsutrymmen som demonstrerar professionell KDP-interiörformatering' },
    ],
    youtubeId: '-JIawojGNr0',
    videoTitle: 'Hur du skapar tryckfärdiga mattearbetsblad för Amazon KDP — formateringsguide',
  },

  themeImages: [
    { src: '/image-library/ocean%20life/angelfish.webp', alt: 'Kejsarfisk — tematisk pedagogisk bild', caption: 'Kejsarfisk' },
    { src: '/image-library/ocean%20life/clownfish.webp', alt: 'Clownfisk — tematisk pedagogisk bild', caption: 'Clownfisk' },
    { src: '/image-library/ocean%20life/coral.webp', alt: 'Korall — tematisk pedagogisk bild', caption: 'Korall' },
    { src: '/image-library/ocean%20life/crab.webp', alt: 'Krabba — tematisk pedagogisk bild', caption: 'Krabba' },
    { src: '/image-library/ocean%20life/dolphin.webp', alt: 'Delfin — tematisk pedagogisk bild', caption: 'Delfin' },
  ],
};

export default content;
