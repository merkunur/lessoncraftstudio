import type { GuideContent } from '../types';

const content: GuideContent = {
  seo: {
    primaryKeyword: 'KDP formatering af opgavebøger',
    secondaryKeywords: [
      'KDP formateringsguide for arbejdsarkbøger',
      'Amazon KDP manuskript formateringsspecifikationer',
      'KDP trimstørrelse margener beskæring arbejdsarkbøger',
      'trykklart PDF eksport KDP aktivitetsbøger',
    ],
    lsiKeywords: [
      'KDP trimstørrelse 8.5x11 6x9 8x10 arbejdsark interiør layout',
      'manuskript margener ryg binding sikker zone beskæringsområde',
      'PDF eksport 300 DPI skrifttype indlejring gråtone CMYK',
      'KDP omslag dimensioner rygbredde stregkode placering beregner',
      'sidenummerering forsidestof bagstof indholdsfortegnelse',
      'KDP upload fejl afvisning fejlfinding previewer korrektur',
    ],
    titleTag: 'KDP formatering af opgavebøger — Komplet guide til print',
    metaDescription: 'KDP formateringsguide for opgavebøger til print. Trimstørrelser, margener, beskæring, PDF eksport ved 300 DPI og omslagsdimensioner for passiv indkomst.',
  },

  hero: {
    title: 'KDP formatering af opgavebøger — teknisk guide til print',
    tagline: 'Den definitive tekniske reference til formatering af arbejdsark- og aktivitetsbøger til Amazon KDP — dækkende trimstørrelsesvalg til forskellige aktivitetstyper, margen- og rygberegninger for komfortabel skriveplads, beskæring versus ingen-beskæring konfiguration, trykklart PDF eksport ved 300 DPI med indlejrede skrifttyper, omslagsdimensionsberegninger inklusive rygbredde og stregkodezoner, komplet manuskriptsamling fra forsidestof til løsningssektioner, og fejlfinding af de mest almindelige KDP upload-afvisninger og formateringsfejl',
    description: 'En perfekt designet arbejdsarkbog betyder intet hvis KDP afviser manuskriptet eller det trykte resultat har tekst der forsvinder ind i bindingen, margener for smalle til at børn kan skrive i, eller slørede billeder fra lav-opløsnings eksport. Denne guide dækker de tekniske formateringsspecifikationer der adskiller en professionel KDP-udgivelse fra en amatør — de præcise mål, indstillinger og eksportprocedurer der sikrer at dine arbejdsark- og aktivitetsbøger trykker korrekt hver gang. For indholdsskabelsesstrategier og forretningsplanlægning, se vores andre KDP-guider. Denne guide er rent teknisk: manuskriptspecifikationer, sidelayout, PDF-forberedelse, omslagsdesign-dimensioner og upload-fejlfinding.',
  },

  introduction: 'Formatering er hvor de fleste førstegangs KDP-udgivere mister timer på undgåelige fejl. De designer smukke arbejdsarksider i deres foretrukne layoutværktøj, uploader til KDP og opdager at margener er for små, PDF-opløsningen er utilstrækkelig, omslagsdimensionerne er forkerte, eller sideantallet falder uden for KDPs accepterede interval. Hver afvisning betyder endnu en runde af rettelser, gen-eksport og gen-upload — forsinkelser der akkumulerer når du forsøger at opbygge et katalog effektivt.\n\nArbejdsark- og aktivitetsbøger har strengere formateringskrav end standard tekstbøger. En roman har brug for tilstrækkelige margener til komfortabel læsning. En arbejdsarkbog har brug for tilstrækkelige margener til komfortabel skrivning — børn der griber om blyanter, voksne der omringsler ord i puslespilgitter, brugere der løser matematikopgaver i udpegede svarfelter. Margenkravene er større, layoutpræcisionen er vigtigere, og konsekvenserne af at gøre det forkert er øjeblikkeligt synlige i det trykte produkt.\n\nDenne guide giver de præcise specifikationer du har brug for på hvert stadie af formateringsprocessen. Trimstørrelsesvalg kommer først fordi det bestemmer hvert efterfølgende mål. Margener og sikre zoner kommer dernæst fordi de definerer dit brugbare indholdsområde. Sidelayout til forskellige aktivitetstyper kommer for det tredje fordi arbejdsark, puslespil og farvelægningssider hver har unikke afstandskrav. Beskæringskonfiguration, PDF-eksportindstillinger, omslagsdimensioner, manuskriptsamling og upload-fejlfinding fuldender workflowet.\n\nFor indholdsskabelsesvejledning — hvilke typer arbejdsark at skabe, hvordan du strukturerer sværhedsprogression, hvilke temaer der sælger bedst — se guiden til matematik aktivitetsbøger på KDP. For forretningsstrategi — prissætning, katalogplanlægning, omsætningsoptimering — se guiden om at tjene penge med KDP aktivitetsbøger. Denne guide antager at du har indhold klar og fokuserer udelukkende på at få det formateret korrekt til KDP trykproduktion.',

  tutorial: [
    {
      heading: 'Vælg den rigtige trimstørrelse til din arbejdsarkbog',
      content: 'Trimstørrelse er den færdige dimension af din trykte bog, og det er den enkeltstående mest konsekvensrige formateringsbeslutning du vil træffe. Enhver margenberegning, gitterstørrelse, indholdsområde og omslagsdimension afhænger af den trimstørrelse du vælger. At ændre trimstørrelse efter layoutet er komplet betyder at gøre næsten alt formateringsarbejde om, så vælg korrekt fra starten.\n\nAmazon KDP understøtter over 30 trimstørrelser for paperbacks, men arbejdsark- og aktivitetsbøger bruger realistisk tre. 8,5 gange 11 tommer formatet er branchestandarden for pædagogiske arbejdsark, matematik-arbejdsbøger og helside-aktivitetssider. Det matcher standard US letter-papir, hvilket betyder at købere kan fotokopiere individuelle sider hvis deres licens tillader det. Det store sideområde giver maksimal arbejdsplads til skrivning, tegning og puslespilløsning. Over 80 procent af succesfulde arbejdsarkbøger på KDP bruger dette format.\n\n8 gange 10 tommer formatet tilbyder en let reduktion i sideområde mens det opretholder et substantielt arbejdsareal. Det fungerer godt for aktivitetsbøger der ikke kræver det fulde letter-størrelse arbejdsareal — malebøger, labyrintbøger og aktivitetssider med moderate skrivekrav.\n\n6 gange 9 tommer formatet er standarden for teksttunge bøger og fungerer for specifikke aktivitetsbog-nicher som rejseaktivitetsbøger, lomme-puslespilbøger og journal-stil opgavebøger. Dog er 6 gange 9 generelt for lille til matematikarbejdsark, ordsøgningsgitter eller enhver aktivitet der kræver substantiel skriveplads. Børn har særligt brug for større formater fordi deres håndskrift er større og mindre kontrolleret. Brug 6 gange 9 kun når bærbarhed er et kerne-salgsargument og aktivitetstypen ægte fungerer ved mindre skala.\n\nTrimstørrelse påvirker direkte trykkeomkostning og dermed din royalty. KDP opkræver en fast basisomkostning plus en per-side rate, og større trimstørrelser har lidt højere per-side omkostninger. En 8,5 gange 11 tommer bog koster mere at trykke end en tilsvarende 6 gange 9 tommer bog, men det større format understøtter også højere udsalgspriser fordi købere opfatter mere værdi. Kør royaltymatematikken ved din mål-pris og sideantal for hver trimstørrelse før du beslutter dig.',
    },
    {
      heading: 'Opsæt margener og sikre zoner korrekt',
      content: 'Margener bestemmer grænsen mellem dit indholdsområde og kanten af den trykte side. KDP håndhæver minimumsmargener, men arbejdsarkbøger bør bruge margener markant større end disse minimumskrav fordi brugere fysisk skriver på siderne.\n\nKDPs minimumsmargener for paperbacks er 0,25 tommer på top, bund og yderkant, med en rygmargen (den indre kant nær bindingen) der varierer efter sideantal. For bøger op til 150 sider er minimumsrygen 0,375 tommer. For 151 til 400 sider er minimumsrygen 0,75 tommer. For 401 til 828 sider er minimumsrygen 1 tomme. Disse minimumskrav forhindrer tekst i at blive skåret af under trimning eller forsvinde ind i bindingen.\n\nFor arbejdsarkbøger, behandl KDP-minimumskrav som absolutte gulve, ikke mål. Anbefalede margener for komfortabel brug er 0,5 tommer på top og bund, 0,5 tommer på yderkanten, og 0,75 tommer for rygmargenen uanset sideantal. Disse større margener tjener flere formål: de forhindrer indhold i at krybe for tæt på trimkanten under trykvarationer, de giver brugere komfortabel finger-holdeplads når bogen ligger flad, og vigtigst holder de skriveområder væk fra bindingen hvor et barns hånd eller blyant ville blive blokeret.\n\nRygmargenen fortjener særlig opmærksomhed. Når en limryg-paperback ligger åben, bøjer siderne ind mod ryggen. Indhold placeret for tæt på den indre kant bliver fysisk utilgængeligt — brugere kan ikke skrive der fordi siden bøjer væk fra deres pen. For aktivitetsbøger hvor brugere løser opgaver, skriver svar eller tegner i udpegede felter, forhindrer en generøs rygmargen den frustrerende oplevelse af svarfelter der forsvinder ind i bindingen.\n\nBeregn dit brugbare indholdsområde ved at trække margener fra trimstørrelsen. For en 8,5 gange 11 tommer bog med 0,5 tommer top/bund/yder margener og 0,75 tommer ryg: indholdsbredde lig med 8,5 minus 0,5 minus 0,75, som er 7,25 tommer. Indholdshøjde lig med 11 minus 0,5 minus 0,5, som er 10 tommer. Dette 7,25 gange 10 tommer indholdsområde er dit faktiske arbejdsareal til placering af aktiviteter, gitter, instruktioner og svarfelter. Design ethvert sideelement inden for denne grænse.',
    },
    {
      heading: 'Konfigurér sidelayout til arbejdsarkindhold',
      content: 'Forskellige aktivitetstyper kræver forskellige sidelayout-tilgange inden for dit definerede indholdsområde. Layoutet skal balancere informationstæthed mod fysisk brugbarhed — hvert element skal være stort nok til komfortabel interaktion i tryk.\n\nMatematikarbejdsark har brug for tydeligt definerede opgaveområder med tilstrækkelig svarplads. For enkeltcifret addition og subtraktion rettet mod børnehaveklasse til 2. klasse bør hver opgavecelle være mindst 0,8 gange 0,8 tommer for at rumme et barns håndskrift. Et standardlayout passer et 5-kolonne gange 4-række gitter af 20 opgaver på en 8,5 gange 11 side med komfortabel afstand mellem cellerne. For flercifret operationer rettet mod 3. klasse og op har opgaver brug for vertikal tilpasningsplads — hvert opgaveområde bør være mindst 1,2 tommer højt for at tillade stabling af mente/lån-notationer. Reducér til 3 eller 4 kolonner for at opretholde tilstrækkelig bredde.\n\nOrdsøgningsgitter kræver konsekvent bogstavafstand. Hver celle i gitteret bør være mindst 0,3 tommer kvadrat for standard voksenpuslespil, eller 0,4 tommer eller større for børn og stor skrift-udgaver. Et 15 gange 15 gitter ved 0,3 tommer per celle optager 4,5 gange 4,5 tommer, hvilket efterlader plads til titlen, ordlisten og tematikken på den samme side. For 20 gange 20 gitter har du brug for næsten den fulde indholdsbredde — det er her 8,5 gange 11 trim bliver essentielt.\n\nFarvelægnings- og tegnesider bør bruge det maksimale indholdsområde med minimale ikke-aktivitets elementer. Placér illustrationen eller tegneopgaven inden for den fulde indholdsgrænse, med kun en lille overskrift til sidenummer og sektionsidentifikator. Brugere forventer at farvelægningssider fylder siden.\n\nHåndskrift- og sporingsarbejdsark har brug for omhyggeligt målte linjerede linjer. For førskole og børnehaveklasse, brug en baselinje-til-baselinje afstand på 0,5 tommer med en stiplet midterlinje. For 1. og 2. klasse, brug 0,375 tommer afstand. For 3. klasse og op fungerer standard 0,3 tommer linjerede linjer godt.\n\nSidehoveder og -fødder bør være minimale men funktionelle. Inkludér sidenummeret centreret eller yderkanttilpasset i sidefoden. Hold hoveder og fødder inden for 0,3 tommer højde for at bevare maksimalt indholdsområde til de faktiske aktiviteter.',
    },
    {
      heading: 'Håndtér beskæring og ingen-beskæring indstillinger',
      content: 'Beskæring bestemmer om dit indhold strækker sig til den helt yderste kant af den trykte side eller stopper inden for en hvid ramme. Denne indstilling påvirker dine manuskriptdimensioner og er en af de mest almindelige kilder til KDP upload-fejl.\n\nDe fleste arbejdsark- og aktivitetsbøger bør bruge ingen-beskæring indstillingen. Ingen-beskæring betyder at dit indhold forbliver inden for margenerne og hvid plads omgiver hver side. Dette er det korrekte valg for matematikarbejdsark, puslespilgitter, håndskriftsøvelse og enhver aktivitetstype hvor indholdet er selvbeholdt inden for rammer.\n\nBeskæring kræves når designelementer bevidst strækker sig til sidens kant uden hvid ramme. Malebøger med kant-til-kant illustrationer, aktivitetssider med helside baggrundsmønstre og dekorative sider hvor designet fylder hele overfladen har brug for beskæring. Når beskæring er aktiveret, kræver KDP yderligere 0,125 tommer på hver kant af siden — dine manuskriptdimensioner stiger med 0,25 tommer i både bredde og højde. For en 8,5 gange 11 tommer trim med beskæring skal dine manuskriptsider være 8,75 gange 11,25 tommer.\n\nBeskæringsområdet er den zone der trimmes af under bogfremstilling. Indhold i denne zone kan optræde eller ikke optræde i det endelige produkt afhængigt af trimmepræcision. Placér aldrig vigtigt indhold — tekst, svarfelter, puslespilgitter eller instruktioner — i beskæringszonen. Udstræk kun baggrundsfarver, mønstre eller dekorative illustrationselementer ind i beskæringsområdet.\n\nHvis din bog har en blanding af beskærings- og ingen-beskæringssider (for eksempel farvelægningssider med fuldside illustrationer der alternerer med puslespilsider der har hvide rammer), sæt hele manuskriptet til beskæring og sikr at dine ingen-beskæringssider har indhold positioneret inden for standard margengrænser. Du kan ikke blande beskæringsindstillinger inden for ét manuskript — det er enten alt med beskæring eller alt uden.\n\nEn almindelig fejl er at sætte beskæring men ikke udstrække indhold til trimkanten. Dette generator en ujævn hvid ramme der ligner en trykfejl frem for et designvalg. Hvis du aktiverer beskæring, sikr at hver side har indhold der strækker sig helt ind i beskæringszonen på alle kanter hvor du vil have kant-til-kant trykning.',
    },
    {
      heading: 'Eksportér trykklare PDF-filer ved 300 DPI',
      content: 'KDP kræver PDF-filer til både interiør-manuskriptet og omslaget. PDF-filen skal opfylde specifikke tekniske standarder for trykgengivelse, og at fejle på nogen af disse standarder udløser upload-fejl eller producerer dårlig trykkvalitet.\n\nOpløsning skal være mindst 300 DPI (dots per inch) for alle billeder og grafiske elementer. Dette er et hårdt krav for professionel trykkvalitet. Skærmopløsning er typisk 72 eller 96 DPI, så billeder der ser skarpe ud på din skærm vil fremstå slørede og pixelerede i tryk hvis de ikke er skabt eller eksporteret ved 300 DPI. Når du bruger arbejdsarkgeneratorer, eksportér ved den maksimale tilgængelige opløsning. Når du placerer billeder, verificér deres faktiske DPI ved deres placerede størrelse — et 300 DPI billede ved sin originale størrelse bliver 150 DPI hvis du skalerer det til det dobbelte af sin bredde.\n\nSkrifttyper skal være indlejret i PDF-filen. Hvis skrifttyper ikke er indlejret, afviser KDP enten filen eller substituerer standardskrifttyper der ødelægger dit layout. De fleste PDF-eksportværktøjer har en "indlejr alle skrifttyper"-mulighed — aktivér den. Når du eksporterer fra designsoftware, led efter et Tryk eller Pressekvalitet eksportpræset der håndterer skrifttypeindlejring automatisk.\n\nFarvetilstand bør være gråtone eller CMYK for sort-hvid interiør. RGB farvetilstand er til skærme, ikke tryk. Hvis du eksporterer i RGB, kan farver skifte uforudsigeligt når KDP konverterer til trykning. For sort-hvid arbejdsarkbøger, eksportér i gråtone — dette producerer også mindre filstørrelser. For bøger med farveelementer, brug CMYK farvetilstand.\n\nPDF filstørrelse har en praktisk grænse på 650 MB for interiørfilen og 40 MB for omslaget. Arbejdsarkbøger nærmer sig sjældent disse grænser, men bøger med mange højopløsningsbilleder kan blive store.\n\nFlad al gennemsigtighed før eksport. Gennemsigtighedseffekter (skygger, halvgennemsigtige overlays, blandetilstande) kan forårsage gengivelsesproblemer i tryk. Dine PDF-eksportindstillinger bør inkludere en gennemsigtighedsfladning-mulighed — brug den.\n\nEfter eksport, åbn din PDF og gennemgå hver side ved 100 procent zoom. Kontrollér at tekst er skarp, billeder er klare, margener er konsistente, og intet indhold strækker sig ud over dine tilsigtede grænser.',
    },
    {
      heading: 'Design KDP-kompatible omslag',
      content: 'KDP-omslag har præcise dimensionskrav beregnet ud fra din bogs trimstørrelse, sideantal og papirtype. Et forkert dimensioneret omslag er den enkeltstående mest almindelige årsag til KDP manuskriptafvisning.\n\nOmslaget indsendes som en enkelt PDF der indeholder bagsiden, ryggen og forsiden i ét sammenhængende billede. Den totale bredde lig med: bagsidebredde plus rygbredde plus forsidebredde plus 0,25 tommer (for 0,125 tommer beskæring på hver side). Den totale højde lig med trimhøjden plus 0,25 tommer (for 0,125 tommer beskæring top og bund). Omslagsbeskæring kræves altid uanset din interiørbeskæringsindstilling.\n\nRygbredde afhænger af sideantal og papirtype. For hvidt papir (standard for de fleste arbejdsarkbøger) er formlen: sideantal ganget med 0,002252 tommer. En 60-siders bog har en rygbredde på cirka 0,135 tommer. En 100-siders bog har cirka 0,225 tommer. En 150-siders bog har cirka 0,338 tommer. For cremefarvet papir ganges med 0,0025 i stedet. KDP tilbyder et omslagsberegnerværktøj der beregner præcise dimensioner — brug det frem for at beregne manuelt for at undgå afrundingsfejl.\n\nFor en 8,5 gange 11 tommer bog med 80 sider på hvidt papir: rygbredde lig med 80 gange 0,002252, som er cirka 0,18 tommer. Total omslagsbredde lig med 8,5 plus 0,18 plus 8,5 plus 0,25, som er 17,43 tommer. Total omslagshøjde lig med 11 plus 0,25, som er 11,25 tommer. Din omslags-PDF skal være præcis disse dimensioner.\n\nSikre zoner på omslaget er kritiske. Hold al essentiel tekst og designelementer mindst 0,25 tommer fra trimkanterne og mindst 0,0625 tommer fra rygfolden på begge sider. Rygområdet selv er upålideligt til tekst på bøger under 100 sider fordi den smalle ryg gør tekstjustering uforudsigelig under fremstilling. For bøger under 79 sider tillader KDP slet ikke rygtekst.\n\nBagsiden skal efterlade en fri stregkodezone i det nedre højre område — et rektangel cirka 2 tommer bredt gange 1,2 tommer højt. KDP placerer ISBN-stregkoden her under trykning.\n\nEksportér omslaget ved 300 DPI i CMYK farvetilstand (omslag trykkes altid i farve selv for sort-hvid interiørbøger). Indlejr alle skrifttyper. Omslags-PDF-filen bør være en enkelt side, ikke flere sider.',
    },
    {
      heading: 'Saml det komplette manuskript',
      content: 'Et komplet KDP-manuskript er en enkelt PDF-fil der indeholder hver side af din bog i den korrekte rækkefølge. KDP trykker præcis hvad du indsender — der er ingen automatiseret sideindsættelse, nummerering eller formatering. Hvert element skal være til stede i din PDF.\n\nManuskriptstrukturen for en arbejdsarkbog følger denne standardrækkefølge: titelside (side 1), kolofon (side 2), indholdsfortegnelse eller brugsanvisning (side 3), valgfri introduktion eller instruktioner (side 4), aktivitetssider organiseret efter sektion (størstedelen af bogen), løsninger eller facitsektion (nær slutningen), og bagstof inklusive en om-forfatteren side og en liste over dine andre titler (sidste sider).\n\nTitelsiden bør inkludere bogtitlen, undertitlen og forfatter- eller udgivernavn. Hold den ren og professionel — dette er den første side en køber ser når de bruger Amazons Look Inside forhåndsvisning. Kolofonsiden inkluderer copyright-meddelelsen, årstal, udgivernavn og en erklæring om gengivelsesrettigheder.\n\nIndholdsfortegnelsen er essentiel for bøger organiseret i sektioner. For en matematik-arbejdsbog med addition, subtraktion og blandede sektioner, list hver sektion med dens startsidenummer. For en puslespilbog med let, medium og svær sektioner, list sværhedsgrader med sidenumre.\n\nSideantalkrav for KDP paperbacks er minimum 24 sider og maksimum 828 sider. De fleste arbejdsarkbøger falder mellem 40 og 150 sider. Sideantal skal være lige — hvis dit indhold ender på et ulige antal, tilføj en blank side til sidst. KDP tæller hver side i PDF-filen inklusive blanke sider, forsidestof og bagstof.\n\nSidenummerering bør starte efter forsidestoffet. Titelsiden, kolofonsiden og indholdsfortegnelsen er typisk unummererede eller nummererede med romertal. Aktivitetssider starter med arabisk tal 1. Placér sidenumre konsekvent — centreret i bunden er den mest almindelige placering for aktivitetsbøger.\n\nFør eksport, verificér dit manuskript ved at scrolle igennem hele PDF-filen side for side. Bekræft at sidenumre er sekventielle og korrekte, løsninger refererer til de rigtige sider, sektionshoveder vises hvor forventet, og ingen blanke sider optræder utilsigtet midt i indholdssektioner.',
    },
    {
      heading: 'Upload og fejlfind KDP formateringsproblemer',
      content: 'KDP upload-processen validerer dit manuskript mod tekniske specifikationer og flager fejl før udgivelse. At forstå de mest almindelige fejl sparer betydelig tid under upload- og gennemgangscyklussen.\n\nDen hyppigste afvisningsårsag er forkerte omslagsdimensioner. Selv en brøkdel af en tomme for lidt eller for meget udløser en afvisning. Brug altid KDPs omslagsberegner til at generere præcise dimensioner for dit specifikke sideantal og papirtype. Hvis du ændrer dit sideantal efter at have skabt omslaget, skal du genberegne og ændre størrelsen på omslaget fordi rygbredden ændres.\n\nLav-opløsnings billeder forårsager kvalitetsadvarsler. KDP flager ethvert billede under 300 DPI ved dets trykte størrelse. Hvis du modtager denne advarsel, identificér lavopløsningsbillederne i dit manuskript, erstat dem med højere opløsningsversioner, og gen-eksportér. Ignorér ikke opløsningsadvarsler — lav-DPI billeder er synligt slørede i tryk og genererer køberklager og returneringer.\n\nMargenovertrædelser forekommer når indhold strækker sig ind i minimumsmargenzonen. KDPs automatiserede kontrol fremhæver sider hvor tekst eller billeder er for tæt på kanten. Hvis du satte generøse margener som anbefalet i denne guide, bør du aldrig møde denne fejl. Hvis du gør, tjek for elementer der ved et uheld forskubbede sig under layoutet.\n\nSkrifttypeindlejringsfejl vises som manglende eller substitueret tekst i KDP previeweren. Hvis dit uploadede manuskript viser andre skrifttyper end din kildefil, gen-eksportér med indlejr-alle-skrifttyper muligheden aktiveret.\n\nEfter upload, brug altid KDP Online Previeweren til at gennemgå dit manuskript side for side. Previeweren viser præcis hvordan din bog vil se ud i tryk. Tjek den første og sidste side, alle sektionstransitioner, sider med billeder og løsningssektionen. Vær særligt opmærksom på sider nær fronten og bagsiden af bogen hvor bindingskurve er mest udtalt.\n\nBestil et korrektureksemplar før du godkender til udgivelse. Korrektureksemplaret er et fysisk tryk af din faktiske bog til selvomkostningspris (typisk 2 til 5 dollars plus forsendelse). Ingen mængde digital forhåndsvisning erstatter at holde den trykte bog, åbne den fladt og fysisk teste aktiviteterne. Skriv i svarfeltene. Omringsl ord i ordsøgningsgitterne. Løs en matematikopgave i det udpegede felt. Hvis noget føles proppet, svært at nå eller dårligt justeret, ret det før udgivelse. En korrektureksemplar-investering på et par dollars forhindrer negative anmeldelser der permanent skader din bogs omdømme.',
    },
  ],

  platformTips: [
    {
      heading: 'Brug KDPs trykkeomkostningsberegner før du færdiggør layout',
      content: 'Før du forpligter dig til et sideantal og trimstørrelse, kør tallene igennem KDPs trykkeomkostningsberegner. Indtast dit mål-sideantal, trimstørrelse, blæktype (sort-hvid eller farve) og markedsplads. Beregneren returnerer den præcise trykkeomkostning, som du trækker fra 60 procent af din listepris for at bestemme din royalty. Undertiden reducerer du dit sideantal med 4 til 8 sider — fjern et par overflødige aktivitetssider eller stram dit forsidestof — og falder ned i et lavere trykkeomkostningsniveau der meningsfuldt øger din per-salg royalty. Lav disse justeringer før formatering, ikke efter manuskriptet er samlet.',
    },
    {
      heading: 'Skab genbrugelige skabeloner for konsekvent formatering',
      content: 'Opbyg en masterskabelon for hver trimstørrelse du udgiver i. Skabelonen bør have margener, hoveder, fødder, sidenumre og indholdsområde-guider allerede defineret. For hver ny bog, duplikér skabelonen og placér dit indhold i de foruddefinerede områder. Dette eliminerer margen- og formateringsfejl i efterfølgende bøger og accelererer dramatisk produktionen. Hvis du udgiver en serie (bind 1, 2, 3), garanterer skabelonen visuel konsistens på tværs af bind — læsere der køber flere bøger fra din serie forventer identisk formatering, og inkonsistens ser uprofessionelt ud.',
    },
    {
      heading: 'Eksportér en test-PDF før endelig eksport',
      content: 'Før din endelige højopløsnings-eksport, skab en hurtig lavopløsnings test-PDF og upload den til KDP som et udkast. KDPs valideringscheck kører øjeblikkeligt og flager dimensionsfejl, margenovertrædelser og sideantalpproblemer inden for minutter. Ret eventuelle flagede problemer i din kildefil, udfør derefter din endelige højopløsnings-eksport. Denne to-pass tilgang fanger strukturelle formateringsproblemer tidligt uden at spilde tid på en fuld 300 DPI-eksport der muligvis skal gentages. Slet udkastlistningen efter at dit endelige manuskript passerer validering.',
    },
  ],

  monetization: [
    {
      heading: 'Hvordan formateringsvalg direkte påvirker profit',
      content: 'Enhver formateringsbeslutning har en finansiel konsekvens. Trimstørrelse påvirker trykkeomkostning — en 8,5 gange 11 tommer bog koster mere at trykke end en 6 gange 9 tommer bog med det samme sideantal. Sideantal påvirker trykkeomkostning lineært — hver ekstra side tilføjer cirka 0,012 dollars for sort-hvid eller 0,07 dollars for farve. At vælge farve over sort-hvid interiør kan reducere din royalty med 3 til 4 dollars per salg på en typisk arbejdsarkbog. Formateringsbeslutninger der virker mindre i isolation — at tilføje 10 ekstra sider forsidestof, bruge farve når gråtone ville fungere, vælge en større trim end nødvendigt — akkumulerer til markant at erodere din per-salg profit over hundredvis eller tusindvis af eksemplarer.',
    },
    {
      heading: 'Professionel formatering kræver højere priser',
      content: 'Købere sammenligner din bog mod konkurrenter i Amazon-søgeresultater. Et professionelt formateret interiør — konsistente margener, korrekt dimensionerede gitter, tydelig sidenummerering, velorganiserede sektioner — understøtter en højere udsalgspris fordi det signalerer kvalitet. Købere der bruger Look Inside forhåndsvisningen bemærker øjeblikkeligt formateringskvalitet: justerede elementer, læsbare skrifttyper, tilstrækkelig skriveplads og ren sektionsorganisering. En bog prissat til 9,99 dollars med professionel formatering outsælger en bog prissat til 6,99 dollars med sjusket formatering fordi køberen opfatter den højere prisede bog som mere troværdig og bedre værdi. Den tid du investerer i korrekt formatering oversættes direkte til højere bæredygtig prissætning.',
    },
    {
      heading: 'Skabelongenbrug accelererer katalogopbygning',
      content: 'Når du har skabt en korrekt formateret skabelon for en specifik trimstørrelse og aktivitetstype, tager hver efterfølgende bog i det format en brøkdel af den originale opsætningstid. Din første 8,5 gange 11 tommer matematik-arbejdsbog tager muligvis flere timer at formatere korrekt med margener, gitterlayouts, hoved/fod-placering og sektionsstruktur. Din anden bog med den samme skabelon tager minutter at opsætte fordi formateringsinfrastrukturen allerede er bygget. Denne effektivitetsgevinst er hvordan succesfulde KDP-udgivere skalerer til 10, 20 eller 50 titler — formateringsarbejdet er frontbelastet, og hver efterfølgende titel drager fordel af investeringen. Katalogakkumuleringseffekten betyder at hurtigere produktion direkte oversættes til hurtigere omsætningsvækst.',
    },
  ],

  examples: [
    {
      heading: 'Eksempel: formatering af en 60-siders matematik-arbejdsbog til KDP',
      content: 'En 1. klasse additions-arbejdsbog med 8,5 gange 11 tommer trim uden beskæring. Margener sat til 0,5 tommer top og bund, 0,5 tommer yderkant og 0,75 tommer ryg, der generator et indholdsområde på 7,25 gange 10 tommer. Manuskriptet indeholder 68 totale sider: titelside, kolofon, indholdsfortegnelse, instruktionsside, 50 aktivitetssider (25 lette opgaver per side organiseret som et 5-kolonne gange 5-række gitter med 0,85-tommer celler, progredierende gennem let, medium og svær sektioner), et 4-siders facit med miniaturegitter der viser løsninger, og 4 siders bagstof inklusive en om-forfatteren side og andre-titler listning. Alle sider er sort-hvid. PDF-filen er eksporteret ved 300 DPI i gråtone med alle skrifttyper indlejret og gennemsigtighed fladet. Total filstørrelse er cirka 8 MB. Omslagsdimensionerne beregnes som: rygbredde lig med 68 gange 0,002252 lig med 0,153 tommer, total omslagsbredde lig med 8,5 plus 0,153 plus 8,5 plus 0,25 lig med 17,403 tommer, total omslagshøjde lig med 11,25 tommer. Trykkeomkostning er cirka 1,67 dollars. Prissat til 8,99 dollars er royaltyen cirka 3,72 dollars per salg.',
    },
    {
      heading: 'Eksempel: formatering af en 100-siders ordsøgningsbog med beskæring',
      content: 'En voksen-ordsøgningsbog med 8,5 gange 11 tommer trim med beskæring aktiveret for dekorative rammeelementer der strækker sig til sidekanten. Manuskriptsidedimensioner er 8,75 gange 11,25 tommer for at rumme 0,125-tommer beskæring på hver side. Indholdsmargener er 0,5 tommer fra trimlinjen (0,625 tommer fra manuskriptkanten) på top, bund og yderkant, med 0,75 tommer fra trimlinjen (0,875 tommer fra manuskriptkanten) for ryggen. Hvert ordsøgningsgitter bruger 0,3-tommer celler i et 15 gange 15 layout der optager 4,5 gange 4,5 tommer, med ordlisten og tematitlen ved siden af og under gitteret. Manuskriptet indeholder 116 totale sider: 4 sider forsidestof, 100 ordsøgningspuslespilsider organiseret i let (35 puslespil med 12 gange 12 gitter), medium (35 puslespil med 15 gange 15 gitter) og svær (30 puslespil med 18 gange 18 gitter), en 10-siders løsningssektion med 4 miniature-svargitter per side, og 2 siders bagstof. Eksporteret ved 300 DPI i gråtone med indlejrede skrifttyper. Omslags rygbredde lig med 116 gange 0,002252 lig med 0,261 tommer. Total omslagsbredde er 17,511 tommer. Trykkeomkostning er cirka 2,24 dollars. Prissat til 9,99 dollars er royaltyen cirka 3,75 dollars per salg.',
    },
  ],

  faq: [
    {
      question: 'Hvad er den bedste trimstørrelse til arbejdsarkbøger på KDP?',
      answer: '8,5 gange 11 tommer formatet er standarden for pædagogiske arbejdsark, matematik-arbejdsbøger, ordsøgningsbøger og aktivitetsbøger der kræver skriveplads. Det giver det største indholdsområde til gitter, opgaver og håndskriftsøvelser. Brug 8 gange 10 tommer til farvelægnings- eller aktivitetsbøger der ikke kræver maksimal skriveplads. Brug 6 gange 9 tommer kun til rejsestørrelse puslespilbøger eller journal-stil aktivitetsbøger hvor bærbarhed er vigtigere end arbejdsareal. For enhver aktivitet hvor børn skriver, tegner eller løser opgaver på siden er 8,5 gange 11 tommer det sikreste valg.',
    },
    {
      question: 'Hvilke margener bør jeg bruge til KDP arbejdsarkbøger?',
      answer: 'Brug 0,5 tommer på top, bund og yderkant, og 0,75 tommer til ryggen (den indre kant nær bindingen). Disse overstiger KDPs minimumskrav men er nødvendige for arbejdsarkbøger hvor brugere fysisk skriver på siderne. KDPs minimumsmargener (0,25 tommer yderkant, 0,375 tommer ryg for under 150 sider) er designet til tekstbøger, ikke aktivitetsbøger. Arbejdsarkindhold placeret ved minimumsmargener føles proppet, og svarfelter nær ryggen bliver fysisk utilgængelige når bogen er åben. Den ekstra margenplads er en investering i brugbarhed der forhindrer negative anmeldelser om stram formatering.',
    },
    {
      question: 'Skal jeg bruge beskæring eller ingen-beskæring til min arbejdsarkbog?',
      answer: 'Brug ingen-beskæring til de fleste arbejdsark- og aktivitetsbøger. Matematikarbejdsark, puslespilgitter, håndskriftsøvelse og strukturerede aktivitetssider fungerer perfekt med hvide margener omkring indholdet. Brug beskæring kun når designelementer bevidst strækker sig til sidekanten uden hvid ramme — malebøger med kant-til-kant illustrationer, sider med helside baggrundsmønstre eller dekorative sidedesigns. Hvis kun nogle sider har brug for beskæring, sæt hele manuskriptet til beskæring og sikr at ikke-beskæringssider holder indhold inden for standard margener. Aktivér aldrig beskæring uden faktisk at udstrække indhold til beskæringskanten, da dette generator ujævne hvide rammer der ligner trykfejl.',
    },
    {
      question: 'Hvilken opløsning og format bør min PDF være til KDP?',
      answer: 'Eksportér ved minimum 300 DPI i PDF-format med alle skrifttyper indlejret. Brug gråtone farvetilstand til sort-hvid interiør, CMYK til farveinteriør. Flad al gennemsigtighed før eksport. Maksimal filstørrelse er 650 MB for interiøret og 40 MB for omslaget. For arbejdsarkbøger med primært vektorelementer (tekst, linjer, gitter) forbliver filstørrelser typisk godt under 50 MB. Billeder skal være 300 DPI ved deres trykte størrelse — et billede der ser fint ud på skærm ved 72 DPI vil fremstå sløret i tryk. Efter eksport, gennemgå PDF-filen ved 100 procent zoom for at verificere skarphed.',
    },
    {
      question: 'Hvordan beregner jeg omslagsdimensioner til min KDP-bog?',
      answer: 'Omslags-PDF-filen er en enkelt-side fil der indeholder bagside, ryg og forside. Total bredde lig med bagsidebredde (samme som trimbredde) plus rygbredde plus forsidebredde plus 0,25 tommer til beskæring. Total højde lig med trimhøjde plus 0,25 tommer til beskæring. Rygbredde for hvidt papir er sideantal gange 0,002252 tommer. For cremefarvet papir ganges med 0,0025. Brug KDPs omslagsberegnerværktøj til præcise dimensioner frem for at beregne manuelt. Bagsiden skal reservere en stregkodezone cirka 2 gange 1,2 tommer i det nedre højre hjørne. Hold al essentiel tekst 0,25 tommer fra trimkanter og 0,0625 tommer fra rygfolden.',
    },
    {
      question: 'Hvad er de mest almindelige årsager til at KDP afviser et manuskript?',
      answer: 'Topafvisningsårsagerne for arbejdsarkbøger er forkerte omslagsdimensioner (selv brøkdele af en tomme udløser afvisning), indhold der strækker sig ind i minimumsmargenzoner, lavopløsningsbilleder under 300 DPI ved trykt størrelse, skrifttyper der ikke er indlejret i PDF-filen, og sideantal under 24-siders minimum eller over 828-siders maksimum. Mindre almindelige men stadig hyppige problemer inkluderer ulige sideantal (skal være lige), omslagstekst i stregkodezonen, rygtekst på bøger under 79 sider og PDF-filkorruption fra ufuldstændige eksporter. Brug KDPs online previewer til at fange de fleste problemer før indsendelse til gennemgang.',
    },
    {
      question: 'Hvad er refusionspolitikken for kommercielle licenser brugt til at skabe KDP arbejdsarkbøger?',
      answer: 'Hver generator tilbyder en gratis prøveversion med vandmærke så du fuldt ud kan evaluere værktøjet før køb. Skab komplette arbejdsark med alle funktioner, test forskellige konfigurationer, verificér trykkvaliteten ved 300 DPI, og bekræft at outputtet opfylder KDPs formateringskrav. Fordi du grundigt kan evaluere produktet før køb, er alle salg af kommercielle licenser endelige. Dette er standardpraksis for digitale produktværktøjer hvor fuld funktionalitet kan forhåndsvises før køb.',
    },
  ],

  nextSteps: [
    {
      slug: 'matematik-aktivitetsboeger-kdp',
      title: 'Skab matematik aktivitetsbøger til Amazon KDP',
      description: 'Den komplette guide til at skabe matematik aktivitetsbøger til KDP. Dækker indholdsskabelse, sværhedsprogression og KDP-grundprincipper der komplementerer formateringsspecifikationerne i denne guide.',
    },
    {
      slug: 'udgiv-puslespilsboeger-kdp',
      title: 'Udgiv puslespilbøger på Amazon KDP',
      description: 'Dækker puslespilspecifik indholdsstrategi, enkeltype vs variety-formater og katalogopbygnings-tilgange for ordsøgning, krydsord og sudokubøger på Amazon.',
    },
    {
      slug: 'tjen-penge-kdp-aktivitetsboeger',
      title: 'Tjen penge med KDP aktivitetsbøger',
      description: 'Den omfattende omsætningsguide for KDP-udgivere. Dækker prisstrategi, katalogøkonomi, sæsonbetonet udgivelse og multi-platformstilgange til maksimering af aktivitetsbog-indkomst.',
    },
  ],

  internalLinks: [
    { pageType: 'guide', slug: 'matematik-aktivitetsboeger-kdp', anchorText: 'Sådan generator du matematik aktivitetsbøger til Amazon KDP' },
    { pageType: 'guide', slug: 'udgiv-puslespilsboeger-kdp', anchorText: 'Sådan udgiver du puslespilbøger på Amazon KDP' },
    { pageType: 'guide', slug: 'ordsoegningsboeger-kdp', anchorText: 'Sådan generator du ordsøgningsbøger til Amazon KDP' },
    { pageType: 'guide', slug: 'tjen-penge-kdp-aktivitetsboeger', anchorText: 'Sådan tjener du penge med KDP aktivitetsbøger' },
    { pageType: 'guide', slug: 'bedste-kdp-aktivitetsbog-nicher', anchorText: 'Top KDP aktivitetsbog-nicher' },
    { pageType: 'guide', slug: 'sudoku-boeger-kdp', anchorText: 'Sådan generator du sudokubøger til Amazon KDP' },
    { pageType: 'guide', slug: 'kdp-eller-etsy-printables', anchorText: 'Amazon KDP vs Etsy: Hvor skal du sælge printables' },
    { pageType: 'guide', slug: 'skab-additions-arbejdsark', anchorText: 'Sådan generator du additionsarbejdsark til børn' },
    { pageType: 'start', slug: 'komplet-guide-printbar-forretning', anchorText: 'Komplet guide til at starte en printable-virksomhed' },
    { pageType: 'start', slug: 'kommerciel-licens-guide', anchorText: 'Guide til kommerciel licens' },
    { pageType: 'app', slug: 'matematikopgaver-arbejdsark', anchorText: 'Matematikarbejdsark-generator — Alle detaljer' },
  ],

  toolsRecommended: [
    {
      appId: 'math-worksheet',
      title: 'Matematikarbejdsark-generator',
      description: 'Generator gitterbaserede matematikarbejdsark med præcis cellestørrelse og afstand ideel til at demonstrere KDP formateringskrav. Matematikarbejdsark kræver nøjagtig justering og tilstrækkelig svarplads, hvilket gør dem til det tydeligste eksempel på hvorfor korrekt margen- og layoutkonfiguration er vigtig for tryk.',
    },
    {
      appId: 'addition',
      title: 'Additionsarbejdsark-generator',
      description: 'Producerer rene enkeltoperations-arbejdsarksider der demonstrerer ligetil KDP sidelayout. Hvert arbejdsark har en konsekvent gitterstruktur der oversættes direkte til professionelt udseende KDP interiørsider når margener og afstand er sat korrekt.',
    },
    {
      appId: 'wordsearch',
      title: 'Ordsøgningsgenerator',
      description: 'Genererer ordsøgningsgitter der illustrerer gitterafstandskrav for KDP puslespilbog-formatering. Generatorens tilpasselige gitterstørrelser lader dig matche celledimensioner til din valgte trimstørrelse og margenkonfiguration.',
    },
    {
      appId: 'writing',
      title: 'Håndskriftsarbejdsark-generator',
      description: 'Generator linjerede håndskriftsøvelsessider der demonstrerer linjeafstand og sporingsområde formatering til KDP. Håndskriftsarbejdsark har de strengeste afstandskrav fordi linjerede linjer skal være præcist målt til mål-aldersgruppen.',
    },
    {
      appId: 'coloring',
      title: 'Farvelægningsside-generator',
      description: 'Producerer helsides illustrationer der demonstrerer beskæring versus ingen-beskæring formateringsbeslutninger for KDP. Farvelægningssider er den primære aktivitetstype der drager fordel af beskæringsindstillinger, hvilket gør dem essentielle for at forstå hvornår og hvordan du konfigurerer beskæring.',
    },
  ],

  visuals: {
    heroImage: { src: '/samples/danish/math%20worksheet/Matematikopgave%201.webp', alt: 'Matematikarbejdsark der viser gitterlayout og afstand formateret til Amazon KDP trykspecifikationer' },
    samples: [
      { src: '/samples/danish/math%20worksheet/Matematikopgave%201.webp', alt: 'Matematikopgave — dansk eksempelarbejdsark', caption: 'Matematikopgave eksempel 1' },
      { src: '/samples/danish/math%20worksheet/Matematikopgave%202.webp', alt: 'Matematikopgave — dansk eksempel 2', caption: 'Matematikopgave eksempel 2' },
      { src: '/samples/danish/math%20worksheet/Matematikopgave%203.webp', alt: 'Matematikopgave — dansk eksempel 3', caption: 'Matematikopgave eksempel 3' },
    ],
    youtubeId: '-JIawojGNr0',
    videoTitle: 'Sådan generator du trykklare matematikarbejdsark til Amazon KDP — Formateringsvejledning',
  },

  themeImages: [
    { src: '/image-library/ocean%20life/angelfish.webp', alt: 'Engelfisk — tematisk pædagogisk billede', caption: 'Engelfisk' },
    { src: '/image-library/ocean%20life/clownfish.webp', alt: 'Klovnefisk — tematisk pædagogisk billede', caption: 'Klovnefisk' },
    { src: '/image-library/ocean%20life/coral.webp', alt: 'Koral — tematisk pædagogisk billede', caption: 'Koral' },
    { src: '/image-library/ocean%20life/crab.webp', alt: 'Krabbe — tematisk pædagogisk billede', caption: 'Krabbe' },
    { src: '/image-library/ocean%20life/dolphin.webp', alt: 'Delfin — tematisk pædagogisk billede', caption: 'Delfin' },
  ],
};

export default content;
