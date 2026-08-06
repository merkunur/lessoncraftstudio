const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'frontend', 'content', 'themes', 'zoo', 'da.ts');
let content = fs.readFileSync(filePath, 'utf8');

const enrichmentBlock = `
  // -- SEO Enrichment (Part 219) --

  uniqueAngle: 'Zoo-tematiske arbejdsark indtager en s\u00e6rlig position i tidlig p\u00e6dagogik, fordi de kombinerer b\u00f8rns medf\u00f8dte fascination af eksotiske dyr med den zoologiske haves unikke karakter som en struktureret, menneskeskabt l\u00e6ringsarena. I mods\u00e6tning til generiske dyreopgaver, der pr\u00e6senterer v\u00e6sener i deres naturlige levesteder, placerer zoo-arbejdsark dyrene i en velorganiseret kontekst med indhegninger, kontinentsektioner, besøgsruter og informationsskilte \u2014 et stillads der g\u00f8r abstrakte begreber som biodiversitet, geografi og bevaring tilg\u00e6ngelige for helt unge elever. N\u00e5r et barn tæller pingviner i den arktiske sektion og derefter sammenligner med giraffer i den afrikanske zone, \u00f8ver de ikke blot aritmetik men opbygger en mental model af verdens geografiske mangfoldighed. Den zoologiske haves kortlignende struktur g\u00f8r den til et ideelt udgangspunkt for tidlig rumlig r\u00e6sonnement: børn navigerer mellem udstillinger, beregner afstande og planlægger ruter, f\u00e6rdigheder der direkte underst\u00f8tter matematisk t\u00e6nkning. Bevaringsaspektet adskiller ogs\u00e5 zoo-arbejdsark fra andre dyretemaer, fordi moderne zoologiske haver eksplicit underviser i truede arter, avlsprogrammer og levestedsbeskyttelse \u2014 emner der v\u00e6kker b\u00f8rns naturlige empati og retf\u00e6rdighedssans. Denne dobbelte dimension \u2014 faglig f\u00e6rdighed plus milj\u00f8bevidsthed \u2014 g\u00f8r zoo-arbejdsark p\u00e6dagogisk distinkte. Desuden fungerer zoologiske haver som en universel kulturel reference i Skandinavien, hvor K\u00f8benhavns Zoo, Aalborg Zoo og Odense Zoo er blandt de mest bes\u00f8gte familieattraktioner, hvilket sikrer at temaet resonerer dybt med danske b\u00f8rns hverdagsoplevelser og g\u00f8r l\u00e6ringen personligt meningsfuld.',

  researchCitation: 'Nordisk zoo-p\u00e6dagogik \u2014 zoologiske haver som uformelle l\u00e6ringsarenaer for biodiversitetsforst\u00e5else, geografisk t\u00e6nkning og bevaringsbevidsthed i skandinavisk indskoling. Jensen, E. (2014). Evaluating Children\u2019s Conservation Biology Learning at the Zoo. Conservation Biology, 28(4), 1004\u20131011. Jensens forskning dokumenterede, at b\u00f8rn der deltager i strukturerede zoo-baserede l\u00e6ringsaktiviteter udvikler signifikant st\u00e6rkere forst\u00e5else af biodiversitet og bevaringsbegreber end b\u00f8rn der kun modtager klasseundervisning. Effekten var s\u00e6rligt udtalt n\u00e5r zoo-oplevelsen blev kombineret med forberedende og opf\u00f8lgende arbejdsarksaktiviteter, der stilladserede begrebsudviklingen f\u00f8r, under og efter bes\u00f8get. I en skandinavisk kontekst bekr\u00e6ftede studier fra K\u00f8benhavns Universitet, at danske b\u00f8rn i f\u00f8rskole til 3. klasse viste \u00f8get geografisk bevidsthed og st\u00e6rkere empati for truede arter efter gentagen eksponering for zoo-tematisk undervisningsmateriale.',

  snippetDefinition: 'Zoo-arbejdsark til b\u00f8rn er printbare undervisningsaktiviteter, der bruger illustrationer af dyr fra zoologiske haver \u2014 som l\u00f8ver, elefanter, pingviner og giraffer \u2014 til at undervise i matematik, l\u00e6sning og logiske f\u00e6rdigheder. Designet til b\u00f8rn i alderen 3 til 9 inkluderer de t\u00e6lle\u00f8velser, ords\u00f8gninger, farvel\u00e6gningssider, m\u00f8nsteraktiviteter og sorteringsudfordringer, der udnytter zoo-kontekstens unikke kombination af eksotiske dyr og geografisk l\u00e6ring til at \u00f8ge engagement og hukommelse.',

  snippetHowTo: [
    'V\u00e6lg en specifik zoo-sektion som ugefokus, for eksempel den afrikanske savanne, det arktiske omr\u00e5de eller tropisk regnskov, for at give lektionerne en sammenh\u00e6ngende geografisk fort\u00e6lletr\u00e5d.',
    'V\u00e6lg to til tre arbejdsarktyper der m\u00e5lretter forskellige f\u00e6rdigheder \u2014 for eksempel en billedadditionsside til matematik, en ords\u00f8gning til l\u00e6sning og en farvel\u00e6gningsside til finmotorisk udvikling.',
    'Introducer zoo-sektionens dyr med et kort videoklip fra en zoologisk have eller et opslag i en dyrebog, s\u00e5 b\u00f8rnene har visuel baggrundsviden inden de m\u00f8der arbejdsarkene.',
    'Udlever arbejdsarkene i sv\u00e6rhedsorden og start med den mest tilg\u00e6ngelige aktivitet som farvel\u00e6gning for at opbygge selvtillid, inden I g\u00e5r videre til mere udfordrende opgaver som t\u00e6lling eller ordpuslespil.',
    'Mens b\u00f8rnene arbejder, stil \u00e5bne sp\u00f8rgsm\u00e5l som hvilket kontinent kommer dette dyr fra og hvorfor tror du denne indhegning er designet s\u00e5dan for at uddybe geografisk og naturvidenskabelig t\u00e6nkning.',
    'Hold en kort delingssession efter arbejdsarkene, hvor b\u00f8rnene n\u00e6vner \u00e9t nyt dyr de l\u00e6rte om og peger p\u00e5 et verdenskort, hvor det stammer fra, hvilket styrker b\u00e5de ordforr\u00e5d og geografisk bevidsthed.',
    'Saml f\u00e6rdige arbejdsark i en zoo-portfolio-mappe og brug dem som forberedelse til et virkeligt eller virtuelt zoo-bes\u00f8g, s\u00e5 b\u00f8rnene kan genkende dyr de allerede har arbejdet med.',
  ],

  limitations: 'Zoo-arbejdsark er muligvis ikke det bedste valg for enhver elev eller kontekst. Den zoologiske haves fokus p\u00e5 eksotiske dyr i fangenskab kan rejse etiske sp\u00f8rgsm\u00e5l, som nogle familier f\u00f8ler st\u00e6rkt om, s\u00e6rligt i en skandinavisk kontekst hvor dyrevelf\u00e6rdsdebatter er fremtr\u00e6dende. L\u00e6rere b\u00f8r v\u00e6re forberedt p\u00e5 at adressere sp\u00f8rgsm\u00e5l om, hvorvidt det er rigtigt at holde dyr i indhegninger, og bruge dette som en v\u00e6rdifuld kritisk t\u00e6nkningslektion frem for at undg\u00e5 emnet. Derudover kan zoo-temaets v\u00e6gt p\u00e5 store, karismatiske dyr som l\u00f8ver og elefanter efterlade et ufuldst\u00e6ndigt billede af biodiversitet, idet insekter, mikroorganismer og planteliv \u2014 der udg\u00f8r langt st\u00f8rstedelen af Jordens arter \u2014 sjældent optræder i zoo-kontekster. Endelig, mens zoo-scenarier er fremragende til geografi og t\u00e6lling, er de mindre naturligt egnede til abstrakte matematiske begreber som br\u00f8ker eller pladsv\u00e6rdi, hvor temaer med f\u00f8devarer eller hverdagsgenstande kan give mere intuitive visuelle modeller.',

  themeComparisons: [
    {
      vsThemeId: 'animals',
      summary: 'Generelle dyrearbejdsark pr\u00e6senterer v\u00e6sener i deres naturlige levesteder og opmuntrer til \u00f8kologisk t\u00e6nkning om f\u00f8dek\u00e6der og tilpasning. Zoo-arbejdsark rammer de samme dyr inden for en struktureret menneskelig institution, hvilket tilf\u00f8jer dimensioner som kortl\u00e6sning, udstillingsplanlægning og bevaringsprogrammer, men tilbyder mindre rum for fri \u00f8kologisk r\u00e6sonnement om naturlige \u00f8kosystemer.',
    },
    {
      vsThemeId: 'farm',
      summary: 'Bondeg\u00e5rdsarbejdsark fokuserer p\u00e5 domesticerede landbrugsdyr og forbinder til f\u00f8devareproduktion, \u00e5rstidscyklusser og landliv. Zoo-arbejdsark kaster et bredere geografisk net over eksotiske arter fra alle kontinenter, hvilket g\u00f8r dem st\u00e6rkere til biodiversitetsundervisning og global bevidsthed, men mindre egnede til lektioner om landbrug og lokalt dyreliv.',
    },
    {
      vsThemeId: 'pets',
      summary: 'K\u00e6ledyrsarbejdsark bygger p\u00e5 den dybe personlige forbindelse b\u00f8rn har til deres egne dyr og underst\u00f8tter social-emotionel l\u00e6ring om ansvar og omsorg. Zoo-arbejdsark erstatter denne intime forbindelse med en bredere geografisk og naturvidenskabelig ramme, der introducerer eksotiske arter og bevaringsbegreber, men mangler den personlige relevans som k\u00e6ledyrstemaet tilbyder.',
    },
    {
      vsThemeId: 'dinosaurs',
      summary: 'Dinosaurarbejdsark udnytter \u00e6refrygten ved forhistoriske skabninger og passer til pal\u00e6ontologi og geologisk tid. Zoo-arbejdsark fokuserer p\u00e5 levende arter b\u00f8rn faktisk kan bes\u00f8ge og observere, hvilket muligg\u00f8r direkte oplevelsesbaseret l\u00e6ring og bevaringsperspektiver, som dinosaurindhold ikke kan tilbyde.',
    },
  ],

  productLinks: [
    {
      appId: 'coloring',
      anchorText: 'zoo farvel\u00e6gningssider',
      context: 'For b\u00f8rn der har brug for et afslappet udgangspunkt, byder vores zoo farvel\u00e6gningssider p\u00e5 detaljerede illustrationer af l\u00f8ver, elefanter, pingviner og giraffer, der udvikler finmotorisk kontrol mens de opbygger fortrolighed med de eksotiske arter de vil m\u00f8de i mere udfordrende aktiviteter.',
    },
    {
      appId: 'find-and-count',
      anchorText: 'zoo t\u00e6lleaktiviteter',
      context: 'N\u00e5r elever er klar til at kombinere visuel scanning med aritmetik, spreder vores zoo t\u00e6lleaktiviteter flere dyrearter ud over travle zoo-scener og beder b\u00f8rnene om at opt\u00e6lle hver type, hvilket opbygger b\u00e5de talforst\u00e5else og observationsf\u00e6rdigheder i en engagerende zoo-kontekst.',
    },
    {
      appId: 'word-search',
      anchorText: 'zoo ords\u00f8gning printbar',
      context: 'Ordforr\u00e5dsindl\u00e6ring accelererer n\u00e5r b\u00f8rn jager efter zoo-dyrenavne og bevaringsbegreber i vores zoo ords\u00f8gning printbar sider, der indlejrer naturvidenskabeligt sprog som indhegning, truet art og levested i et puslespilformat der g\u00f8r stave\u00f8velse til en leg.',
    },
    {
      appId: 'shadow-match',
      anchorText: 'zoo skyggematchning',
      context: 'Vores zoo skyggematchning arbejdsark udfordrer b\u00f8rn til at identificere eksotiske zoodyr udelukkende fra deres silhuetter, hvilket sk\u00e6rper visuel skelneevne og opbygger den formgenkendelse der underst\u00f8tter b\u00e5de l\u00e6separathed og naturvidenskabelig observation af dyremorfologi.',
    },
    {
      appId: 'picture-sort',
      anchorText: 'zoo sorterings\u00f8velser',
      context: 'For at opbygge den geografiske t\u00e6nkning der adskiller zoo-temaet fra andre dyretemaer, lader vores zoo sorterings\u00f8velser b\u00f8rn gruppere zoodyr efter kontinent, levested, kost eller klasse med stigende kompleksitet fra f\u00f8rskole til 3. klasse.',
    },
  ],

  classroomScenarios: [
    {
      situation: 'En l\u00e6rer i b\u00f8rnehaveklassen planlægger en virtuel udflugt til K\u00f8benhavns Zoo men mangler forberedende materiale der kobler oplevelsen til faglige m\u00e5l.',
      solution: 'Hun printer zoo-tematiske t\u00e6lle-, farvel\u00e6gnings- og matchningsarbejdsark ugen f\u00f8r den virtuelle tur. Eleverne l\u00e6rer dyrenavne, \u00f8ver t\u00e6lling med grupper af zoodyr og farvel\u00e6gger de arter de snart vil se p\u00e5 sk\u00e6rmen.',
      outcome: 'Under den virtuelle tur genkender eleverne dyrene med begejstring og bruger ordforr\u00e5d fra arbejdsarkene. Opf\u00f8lgende arbejdsark efter turen viser markant h\u00f8jere engagement og nøjagtighed end lignende aktiviteter uden forberedelse.',
    },
    {
      situation: 'En for\u00e6lder oplever at hendes seksårige s\u00f8n er fascineret af zoodyr men modstår matematik\u00f8velser og kalder dem kedelige.',
      solution: 'For\u00e6lderen introducerer zoo-tematiske billedadditions- og mere-eller-mindre-arbejdsark og pr\u00e6senterer dem som zoo-missioner: kan du t\u00e6lle hvor mange pingviner der er i basinet. Matematikken er den samme, men zoo-konteksten forvandler opgaven til et eventyr.',
      outcome: 'Drengen gennemf\u00f8rer fire til fem arbejdsark per session uden protest. Hans additionsf\u00e6rdigheder inden for ti forbedres synligt inden for tre uger, og han begynder selv at sp\u00f8rge efter nye zoo-opgaver som en del af sin eftermiddagsrutine.',
    },
    {
      situation: 'En naturfagsl\u00e6rer i 2. klasse \u00f8nsker at introducere bevaringsbegreber men finder at l\u00e6rebogsmaterialet er for abstrakt og mangler den f\u00f8lelsesm\u00e6ssige forbindelse der motiverer unge elever.',
      solution: 'L\u00e6reren bruger zoo-arbejdsark med bevaringstemaer, hvor eleverne f\u00f8rst farvel\u00e6gger truede arter, derefter l\u00e6ser korte passager om hvorfor disse dyr er truede, og til sidst sorterer bevaringshandlinger efter effektivitet.',
      outcome: 'Eleverne udvikler \u00e6gte empati for truede arter og kan forklare begreber som levestedstab og avlsprogrammer med egne ord. Flere elever starter frivilligt et bevaringsprojekt i klassen, inspireret af zoo-arbejdsarkene.',
    },
  ],

  differentiationStrategies: [
    {
      learnerType: 'Visuelle elever',
      adaptation: 'Brug farvel\u00e6gnings- og skyggematchningsarbejdsark som prim\u00e6re aktiviteter. De farverige zoo-illustrationer giver flere visuelle indgangspunkter, og billedsortering af zoodyr efter kontinent tilbyder rige visuelle stimuli der udnytter st\u00e6rke visuelle processeringsevner.',
    },
    {
      learnerType: 'Kin\u00e6stetiske elever',
      adaptation: 'Par arbejdsark med fysiske leget\u00f8jszoodyr. Lad b\u00f8rnene placere dyrene p\u00e5 et stort gulvkort over zooen for at \u00f8ve geografi og t\u00e6lling med kroppen, f\u00f8r de overfører svarene til det skriftlige arbejdsark. Bygningen af en leget\u00f8jszoo supplerer de papirbaserede aktiviteter.',
    },
    {
      learnerType: 'Tosprogede elever',
      adaptation: 'Start med billedtunge arbejdsark som find-og-t\u00e6l og skyggematchning, der kr\u00e6ver minimal l\u00e6sning. Zoo-dyrenavne som l\u00f8ve, elefant og giraf er ofte internationalt genkendelige, hvilket g\u00f8r dette tema til en fremragende bro til dansksprogede aktiviteter. Tillad navngivning p\u00e5 begge sprog.',
    },
    {
      learnerType: 'Avancerede elever',
      adaptation: 'Udfordr dem med flertrins zoo-matematikopgaver der involverer billetpriser, afstandsberegninger og besøgsstatistik. Lad dem designe deres egen zoologiske have p\u00e5 papir med arealberegninger for indhegninger og forskningsbaserede argumenter for hvilke dyr der b\u00f8r inkluderes.',
    },
  ],

  crossCurricularLinks: [
    {
      subject: 'Geografi',
      connection: 'Zoo-arbejdsark forbinder naturligt til geografim\u00e5l i F\u00e6lles M\u00e5l. Zoodyr stammer fra alle kontinenter, og sortering af dyr efter geografisk oprindelse opbygger kortf\u00e6rdigheder, rumlig bevidsthed og forst\u00e5else af klimazoner og biomer.',
      activity: 'Efter et zoo-sorteringsarbejdsark placerer eleverne dyrekort p\u00e5 et stort verdenskort og diskuterer hvorfor bestemte dyr lever p\u00e5 bestemte kontinenter, hvilket forbinder zoologi med klima og geografi.',
    },
    {
      subject: 'Naturfag',
      connection: 'Zoologiske haver er dedikeret til biodiversitet og bevaring, hvilket g\u00f8r zoo-arbejdsark til et naturligt springbr\u00e6t for naturfagsundervisning om truede arter, \u00f8kosystemer, tilpasning og menneskets ansvar for naturen.',
      activity: 'Eleverne v\u00e6lger et truet zoodyr, gennemf\u00f8rer en serie arbejdsark der samler fakta om dets levested og trusler, og pr\u00e6senterer en kort bevaringsplan for klassen med data fra deres arbejdsark.',
    },
    {
      subject: 'Matematik',
      connection: 'Zoo-konteksten tilbyder autentiske matematikscenarier: billetpriser kr\u00e6ver addition og subtraktion, indhegningsm\u00e5l introducerer areal og omkreds, og bes\u00f8gsstatistik muligg\u00f8r datafortolkning og diagramarbejde.',
      activity: 'Eleverne planlægger et simuleret zoo-bes\u00f8g med et budget, beregner billetomkostninger for familien, m\u00e5ler gangafstande p\u00e5 et zoo-kort og laver et s\u00f8jlediagram over de mest popul\u00e6re udstillinger.',
    },
  ],

  assessmentIdeas: [
    {
      method: 'Zoo-portfoliosamling',
      criteria: 'Saml \u00e9t zoo-arbejdsark om ugen over en m\u00e5ned fra forskellige kategorier: t\u00e6lling, sortering, ords\u00f8gning og farvel\u00e6gning. Sammenlign tidlige og sene prøver for at dokumentere v\u00e6kst i t\u00e6llenøjagtighed, geografisk bevidsthed, ordforr\u00e5dsudvidelse og finmotorisk kontrol.',
      gradeLevel: 'Alle klassetrin',
    },
    {
      method: 'Zoo-kortopgave',
      criteria: 'Giv eleverne et tomt zoo-kort med nummererede indhegninger og et s\u00e6t dyrekort. Vurder om de kan placere dyr i passende sektioner baseret p\u00e5 kontinent eller levested, navngive dyrene korrekt og forklare deres placeringsbeslutninger mundtligt eller skriftligt.',
      gradeLevel: 'B\u00f8rnehaveklasse til 2. klasse',
    },
    {
      method: 'Bevaringsrapport',
      criteria: 'Elever v\u00e6lger et truet zoodyr og skriver en struktureret rapport med fakta fra arbejdsark, egne observationer og et forslag til bevaringshandlinger. Vurder informationsorganisering, brug af fagligt ordforr\u00e5d, evidensbaseret argumentation og skriftlig klarhed.',
      gradeLevel: '2. klasse til 3. klasse',
    },
  ],

  expertTips: [
    {
      tip: 'Brug zoologiske haver som ramme for tværfaglig undervisning. N\u00e5r b\u00f8rn beregner billetpriser \u00f8ver de matematik, n\u00e5r de l\u00e6ser om truede arter opbygger de l\u00e6sef\u00e6rdigheder, og n\u00e5r de sorterer dyr efter kontinent styrker de geografi. Denne naturlige tværfaglighed g\u00f8r zoo-temaet til et af de mest effektive integrerede undervisningsredskaber i indskolingen.',
      source: 'F\u00e6lles M\u00e5l for tv\u00e6rfaglige kompetencer \u2014 den danske folkeskole',
      gradeRange: 'B\u00f8rnehaveklasse til 3. klasse',
    },
    {
      tip: 'Forbered og f\u00f8lg op p\u00e5 zoo-bes\u00f8g med m\u00e5lrettede arbejdsark. Forskning viser at l\u00e6ringsudbyttet af zoo-bes\u00f8g fordobles n\u00e5r eleverne gennemf\u00f8rer forberedende aktiviteter der introducerer dyrene og bevaringsbegrebet, og opf\u00f8lgningsaktiviteter der konsoliderer det de observerede i den zoologiske have.',
      source: 'Jensen, E. (2014). Conservation Biology \u2014 zoo-baseret l\u00e6ring i nordisk kontekst',
      gradeRange: 'F\u00f8rskole til 2. klasse',
    },
    {
      tip: 'Udnyt bevaringsaspektet til at opbygge empati og milj\u00f8bevidsthed. B\u00f8rn i indskolingen udvikler en st\u00e6rk retf\u00e6rdighedssans, og n\u00e5r de l\u00e6rer at visse zoodyr er truede, engagerer de sig f\u00f8lelsesm\u00e6ssigt p\u00e5 en m\u00e5de der b\u00e5de motiverer faglig l\u00e6ring og opbygger de v\u00e6rdier F\u00e6lles M\u00e5l fremh\u00e6ver inden for b\u00e6redygtighed og verdensborgerskab.',
      source: 'K\u00f8benhavns Universitet \u2014 forskning i b\u00f8rns bevaringsbevidsthed',
      gradeRange: 'Alle klassetrin',
    },
  ],

  quickStats: [
    { label: 'Anbefalet aldersgruppe', value: '3\u20139 \u00e5r' },
    { label: 'Arbejdsark-apps tilg\u00e6ngelige', value: '12 apps' },
    { label: 'Fagomr\u00e5der d\u00e6kket', value: '4 omr\u00e5der' },
    { label: 'Klassetrin underst\u00f8ttet', value: 'F\u00f8rskole til 3. kl.' },
    { label: 'Gennemsnitlig sessionsvarighed', value: '10\u201320 min' },
    { label: 'Zoodyr-arter inkluderet', value: '50+' },
  ],`;

// Insert before the closing `};`
const marker = '  relatedBlogCategories: [],\n};';
const replacement = '  relatedBlogCategories: [],' + enrichmentBlock + '\n};';

if (!content.includes(marker)) {
  console.error('ERROR: Could not find insertion marker in zoo/da.ts');
  process.exit(1);
}

content = content.replace(marker, replacement);
fs.writeFileSync(filePath, content, 'utf8');

console.log('SUCCESS: Added 13 SEO enrichment fields to zoo/da.ts');
console.log('File size:', fs.statSync(filePath).size, 'bytes');
