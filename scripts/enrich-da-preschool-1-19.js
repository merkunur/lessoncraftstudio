#!/usr/bin/env node
/**
 * SEO Part 220: DA Preschool Grade Enrichment — Themes 1-19
 *
 * Adds 7 enrichment fields (snippetAnswer, uniqueGradeAngle, developmentalMilestones,
 * differentiationNotes, parentTakeaway, classroomIntegration, assessmentRubric)
 * to the preschool grade block of 19 DA theme files (alphabet through forest).
 */

const fs = require('fs');
const path = require('path');

const THEMES_DIR = path.join(__dirname, '..', 'frontend', 'content', 'themes');

const enrichments = {
  alphabet: {
    snippetAnswer: `Alfabet-arbejdsark til f\u00f8rskolen (3\u20134 \u00e5r) introducerer bogstavformer gennem sporing, farvl\u00e6gning og billede-bogstav-matchning. Store bogstavkonturer og velkendte genstande som ankerbilleder opbygger fonologisk bevidsthed og visuel genkendelse. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `Alfabettemaet er f\u00f8rskolebarnets absolutte udgangspunkt for l\u00e6sef\u00e6rdighed, fordi tre- og fire\u00e5rige befinder sig i begyndelsen af den sensitive periode for bogstavformgenkendelse \u2014 de begynder at skelne bogstaver i deres omgivelser og interesserer sig for at genkende deres eget navns forbogstav. Denne naturlige nysgerrighed er et p\u00e6dagogisk guld, som arbejdsark kan uddybe systematisk. Dansk har 29 bogstaver inklusive \u00e6, \u00f8 og \u00e5, hvilket g\u00f8r det s\u00e6rligt vigtigt at begynde tidligt med genkendelse. F\u00e6lles M\u00e5ls sproglige bevidsthed opn\u00e5s gennem alfabetarbejdsark, n\u00e5r barnet forbinder et visuelt tegn med en lyd og et velkendt ord. Sporing udvikler samtidig finmotorik og hukommelsesspor.`,
    developmentalMilestones: [
      { milestone: `Visuel skelnen af bogstavformer (3\u20134-\u00e5rige begynder at se forskel p\u00e5 bogstaver og andre symboler)`, howWeAddress: `Bogstavgenkendelses- og matchningsaktiviteter, hvor store bogstaver pr\u00e6senteres tydeligt med velkendte genstande som ankerbilleder` },
      { milestone: `Forbindelse mellem begyndelsesbogstav og genstand (f\u00f8rskoleb\u00f8rn l\u00e6rer, at ord begynder med bestemte bogstaver)`, howWeAddress: `Billede-bogstav-matchning (A = abe, K = kat) opbygger fonologisk bevidsthed gennem visuelle ankre` },
      { milestone: `Sporing af bogstavformer (overgang fra fri tegning til styret formgivning)`, howWeAddress: `Prikkede sporingsark med store bogstaver guider h\u00e5nden og udvikler finmotorik som forberedelse til skrivning` },
      { milestone: `Genkendelse af eget navns bogstaver (f\u00f8rskoleb\u00f8rn interesserer sig s\u00e6rligt for bogstaverne i deres navn)`, howWeAddress: `Bogstavsaktiviteter, der opfordrer til at finde velkendte bogstaver i forskellige sammenh\u00e6nge, udnytter den f\u00f8lelsesm\u00e6ssige forbindelse til eget navn` },
    ],
    differentiationNotes: `For f\u00f8rskoleb\u00f8rn, der har brug for ekstra st\u00f8tte, start med tre eller fire bogstaver, som er personligt meningsfulde (barnets eget navn), brug sand eller modellervoks til fysisk oplevelse af bogstavformer, og forbind hvert bogstav med en konkret genstand. For avancerede f\u00f8rskoleb\u00f8rn udvid bogstavudvalget, introduc\u00e9r forbindelsen mellem store og sm\u00e5 bogstaver, og udfordre dem til at finde begyndelsesbogstaver i b\u00f8ger og omgivelser.`,
    parentTakeaway: `Den vigtigste opgave for for\u00e6ldre i alfabetl\u00e6ringen er at g\u00f8re bogstaver synlige i hverdagen. Peg sammen p\u00e5 bogstaver p\u00e5 butiksskilte, busstoppesteder og madpakker. Start med barnets egne navnebogstaver \u2014 de er den f\u00f8lelsesm\u00e6ssige indgang til alfabetverdenen. Kr\u00e6v ikke alle bogstaver p\u00e5 \u00e9n gang; i f\u00f8rskolen er det nok, at barnet genkender nogle og gl\u00e6des ved at lede efter dem. H\u00f8jtl\u00e6sning hver aften er den bedste alfabet\u00f8velse.`,
    classroomIntegration: `Alfabettemaet l\u00f8ber gennem hele f\u00f8rskole\u00e5ret: i en ugens-bogstav-praksis f\u00e5r hvert bogstav sin egen uge, hvor det optr\u00e6der i samling, l\u00e6ringsstationer, mellemmaden og kunstaktiviteter. Alfabetarbejdsark fungerer ved selvst\u00e6ndig arbejdstid, bogstavsange i samlingen og bogstavjagt i klasselokalet som observations\u00f8velse. Denne multisensoriske tilgang opfylder F\u00e6lles M\u00e5ls m\u00e5l for sproglig bevidsthed og tidlig literacy.`,
    assessmentRubric: [
      { skill: `Bogstavgenkendelse`, emerging: `genkender 2\u20134 bogstaver (eget navns bogstaver) med voksenst\u00f8tte`, proficient: `genkender selvst\u00e6ndigt 8\u201312 store bogstaver og kan navngive dem`, advanced: `genkender de fleste store bogstaver, forbinder dem med begyndelsesbogstav i ord og fors\u00f8ger at skrive` },
      { skill: `Begyndelsesbogstav-matchning`, emerging: `matcher 1\u20132 begyndelsesbogstaver med velkendte genstande med voksens model`, proficient: `matcher selvst\u00e6ndigt 4\u20136 begyndelsesbogstaver med korrekte genstande`, advanced: `matcher 8+ begyndelsesbogstaver og finder selv nye eksempler for hvert bogstav` },
      { skill: `Bogstavformssporing`, emerging: `sporer 2\u20133 bogstaver p\u00e5 prikkede linjer genkendeligt`, proficient: `sporer 6\u20138 bogstaver tydeligt med korrekt str\u00f8gretning`, advanced: `skriver flere bogstaver selvst\u00e6ndigt uden model og danner korte ord` },
    ],
  },

  animals: {
    snippetAnswer: `Dyre-arbejdsark til f\u00f8rskolen (3\u20134 \u00e5r) bruger farvel\u00e6gning, t\u00e6lling og matchning med dyrebilleder til at styrke finmotorik, talgenkendelse og kategorisering. B\u00f8rnenes naturlige dyrefascination driver motivationen. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `Dyretemaet er et af de mest kraftfulde for f\u00f8rskoleb\u00f8rn, fordi tre- og fire\u00e5rige har en medf\u00f8dt fascination af dyr, der giver en f\u00f8lelsesm\u00e6ssig motor for l\u00e6ring. B\u00f8rn i denne alder begynder at kategorisere verden omkring sig \u2014 store dyr vs. sm\u00e5 dyr, dyr med pels vs. fjer \u2014 og denne naturlige sorteringsevne er en kognitiv milepol, som dyrearbejdsark systematisk kan styrke. Farvel\u00e6gning af dyrebilleder med tykke konturer tr\u00e6ner finmotorik, mens t\u00e6lling af dyr i en scene opbygger en-til-en-korrespondance. F\u00e6lles M\u00e5ls m\u00e5l for natur og naturfagl\u00e6ring m\u00f8des direkte, n\u00e5r f\u00f8rskoleb\u00f8rn l\u00e6rer om dyr gennem strukturerede aktiviteter.`,
    developmentalMilestones: [
      { milestone: `Kategorisk t\u00e6nkning (3\u20134-\u00e5rige begynder at sortere genstande efter \u00e9n egenskab)`, howWeAddress: `Sorteringsaktiviteter med picture-sort, hvor b\u00f8rn grupperer dyr efter egenskaber som pels/fjer eller ben/vinger` },
      { milestone: `T\u00e6lling af sm\u00e5 m\u00e6ngder (f\u00f8rskoleb\u00f8rn opbygger en-til-en-korrespondance til 10)`, howWeAddress: `Find-og-t\u00e6l-aktiviteter, hvor b\u00f8rn t\u00e6ller specifikke dyr i en scene og matcher med det korrekte tal` },
      { milestone: `Visuel skelneevne (b\u00f8rn l\u00e6rer at se forskelle mellem lignende former)`, howWeAddress: `Skyggematchning med dyresilhuetter sk\u00e6rper observationsevner, der underst\u00f8tter b\u00e5de l\u00e6separathed og naturvidenskab` },
      { milestone: `Finmotorisk kontrol (overgang fra hel-arm til h\u00e5ndledsbaseret kontrol)`, howWeAddress: `Farvel\u00e6gningssider med dyremotiver med tykke konturer underst\u00f8tter grebudvikling og h\u00e5nd-\u00f8je-koordination` },
    ],
    differentiationNotes: `For f\u00f8rskoleb\u00f8rn med behov for st\u00f8tte, begr\u00e6ns til tre eller fire velkendte dyr pr. aktivitet, brug plastikdyr som fysisk supplement til arbejdsarket, og fokus\u00e9r p\u00e5 \u00e9n f\u00e6rdighed ad gangen (kun t\u00e6lling eller kun matchning). For avancerede f\u00f8rskoleb\u00f8rn udvid med flere dyrekategorier, introduc\u00e9r enkel naturvidenskabelig klassifikation og tilf\u00f8j bogstavsporing af dyrenavne.`,
    parentTakeaway: `Dyr er en naturlig indgang til l\u00e6ring for sm\u00e5 b\u00f8rn. Udnyt barnets dyreinteresse derhjemme ved at t\u00e6lle dyr i billedb\u00f8ger, sortere t\u00f8jdyr efter st\u00f8rrelse og farve, og tale om, hvor forskellige dyr bor. Bes\u00f8g p\u00e5 bondeg\u00e5rde eller i zoologisk have giver f\u00f8rsteh\u00e5ndsoplevelser, der forst\u00e6rker det, barnet l\u00e6rer p\u00e5 arbejdsarkene. Lad barnet v\u00e6lge sit yndlingsdyr som udgangspunkt \u2014 motivationen kommer indefra.`,
    classroomIntegration: `Dyretemaet passer perfekt ind i f\u00f8rskolens ugentlige rutiner: i samlingen introduceres ugens dyr med billeder og lyde, ved l\u00e6ringsstationer arbejdes med farvel\u00e6gning og t\u00e6lleark, i den frie leg bruges plastikdyr til rollelege, og p\u00e5 naturture ledes efter insekter og fugle. Denne integration p\u00e5 tv\u00e6rs af aktiviteter underst\u00f8tter F\u00e6lles M\u00e5ls m\u00e5l for b\u00e5de naturfagl\u00e6ring og sproglig udvikling.`,
    assessmentRubric: [
      { skill: `Kategorisering af dyr`, emerging: `sorterer dyr i to grupper med voksenst\u00f8tte (f.eks. store/sm\u00e5)`, proficient: `sorterer selvst\u00e6ndigt dyr efter to egenskaber (levested, d\u00e6kke)`, advanced: `opfinder egne sorteringskriterier og forklarer hvorfor dyrene h\u00f8rer til i gruppen` },
      { skill: `T\u00e6lling af dyr`, emerging: `t\u00e6ller 1\u20135 dyr med \u00e9n-til-\u00e9n pegen med voksenst\u00f8tte`, proficient: `t\u00e6ller selvst\u00e6ndigt op til 10 dyr og matcher med korrekt tal`, advanced: `t\u00e6ller over 10 og sammenligner m\u00e6ngder (flere/f\u00e6rre)` },
      { skill: `Visuel skelneevne (dyresilhuetter)`, emerging: `matcher 2\u20133 dyresilhuetter med voksenst\u00f8tte`, proficient: `matcher selvst\u00e6ndigt 5\u20136 silhuetter med de rigtige dyr`, advanced: `matcher komplekse silhuetter og beskriver, hvilke tr\u00e6k der afsl\u00f8rer dyret` },
    ],
  },

  birds: {
    snippetAnswer: `Fugle-arbejdsark til f\u00f8rskolen (3\u20134 \u00e5r) bruger farverige fuglebilleder til farvel\u00e6gning, t\u00e6lling og matchning, der styrker finmotorik og tidlig talgenkendelse. B\u00f8rnenes fascination af fugle driver engagementet. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `Fugletemaet er unikt velegnet til f\u00f8rskolen, fordi fugle er synlige overalt i barnets hverdag \u2014 p\u00e5 legepladsen, i haven og ved foderbr\u00e6ttet \u2014 og tre- til fire\u00e5rige kan direkte forbinde arbejdsarkenes billeder med virkelige observationer. Denne bro mellem papir og virkelighed styrker l\u00e6ringen markant. Fugle tilbyder naturlige muligheder for t\u00e6lling (fugle p\u00e5 en gren), st\u00f8rrelsessammenligning (stor/lille fugl) og farveidentifikation (r\u00f8d rodohat, bl\u00e5 blejmejse). At spore fuglereder og \u00e6g styrker finmotorikken. Fugle som tema underst\u00f8tter F\u00e6lles M\u00e5ls naturfaglige nysgerrighed p\u00e5 det mest tilg\u00e6ngelige niveau.`,
    developmentalMilestones: [
      { milestone: `Farve- og st\u00f8rrelsesgenkendelse (3\u20134-\u00e5rige l\u00e6rer at identificere og navngive grundl\u00e6ggende farver og st\u00f8rrelser)`, howWeAddress: `Sorteringsaktiviteter, hvor b\u00f8rn grupperer fugle efter farve eller st\u00f8rrelse, styrker kategorisk t\u00e6nkning` },
      { milestone: `T\u00e6lling til 10 med konkrete genstande`, howWeAddress: `Find-og-t\u00e6l-aktiviteter med fugle p\u00e5 grene, i tr\u00e6er og ved foderbr\u00e6t tr\u00e6ner en-til-en-korrespondance` },
      { milestone: `Visuel matchning (parring af identiske eller relaterede billeder)`, howWeAddress: `Skyggematchning med fuglesilhuetter og matchning af fugl til rede opbygger visuel skelneevne` },
    ],
    differentiationNotes: `For f\u00f8rskoleb\u00f8rn med behov for ekstra st\u00f8tte, begr\u00e6ns til tre velkendte fuglearter (spurv, due, and), brug store illustrationer med tykke konturer, og fokus\u00e9r p\u00e5 \u00e9n f\u00e6rdighed pr. session. For avancerede f\u00f8rskoleb\u00f8rn introduc\u00e9r flere fuglearter, tilf\u00f8j bogstavsporing af fuglenavne og lad b\u00f8rnene t\u00e6lle fugle i mere komplekse scener.`,
    parentTakeaway: `Fugle er overalt, og det g\u00f8r dem til det perfekte l\u00e6ringstema derhjemme. S\u00e6t et foderbr\u00e6t op og t\u00e6l fuglene sammen, peg p\u00e5 fugle p\u00e5 ture, og tal om deres farver og st\u00f8rrelser. Billedb\u00f8ger om fugle forl\u00e6nger l\u00e6ringen efter arbejdsarket. Lad barnet tegne de fugle, det ser udenfor \u2014 forbindelsen mellem virkelige observationer og papirarbejde styrker b\u00e5de naturfaglig nysgerrighed og finmotorik.`,
    classroomIntegration: `Fugletemaet integreres naturligt i f\u00f8rskolens \u00e5rshjul: om for\u00e5ret observeres fugle, der bygger reder, om vinteren fyldes foderbr\u00e6ttet. I samlingen synges fuglesange, ved l\u00e6ringsstationer arbejdes med farvel\u00e6gnings- og t\u00e6lark, og p\u00e5 ture ledes efter fugle i n\u00e6romr\u00e5det. Denne tv\u00e6rg\u00e5ende tilgang opfylder F\u00e6lles M\u00e5ls m\u00e5l for naturfag og sanseoplevelser.`,
    assessmentRubric: [
      { skill: `Fuglegenkendelse og kategorisering`, emerging: `genkender 2\u20133 almindelige fugle med voksenst\u00f8tte`, proficient: `navngiver selvst\u00e6ndigt 4\u20135 fugle og sorterer dem efter \u00e9n egenskab`, advanced: `genkender 6+ fugle og forklarer forskelle mellem arterne` },
      { skill: `T\u00e6lling med fuglemotiver`, emerging: `t\u00e6ller 1\u20135 fugle med pegen og voksenst\u00f8tte`, proficient: `t\u00e6ller selvst\u00e6ndigt op til 10 fugle i en scene`, advanced: `t\u00e6ller over 10 og sammenligner antal (flere fugle p\u00e5 den ene gren)` },
      { skill: `Finmotorisk kontrol (fuglefarvl\u00e6gning)`, emerging: `farvel\u00e6gger med brede str\u00f8g, delvist uden for konturerne`, proficient: `farvel\u00e6gger inden for konturerne med j\u00e6vne str\u00f8g`, advanced: `anvender detaljer og varierede farver i fuglebillederne` },
    ],
  },

  birthday: {
    snippetAnswer: `F\u00f8dselsdag-arbejdsark til f\u00f8rskolen (3\u20134 \u00e5r) bruger kager, balloner og gaver til at \u00f8ve t\u00e6lling, matchning og finmotorik. Den personlige forbindelse til fejring driver st\u00e6rk motivation. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `F\u00f8dselsdag er det mest personligt motiverende tema for f\u00f8rskoleb\u00f8rn, fordi tre- og fire\u00e5rige har en dyb f\u00f8lelsesm\u00e6ssig forbindelse til deres egen alder og fejring. Et barn, der stolt holder tre fingre op, demonstrerer allerede talviden, og f\u00f8dselsdagsarbejdsark bygger p\u00e5 denne indre motivation. At t\u00e6lle lys p\u00e5 en kage er den mest naturlige matematik\u00f8velse for denne aldersgruppe \u2014 tallet har personlig betydning. Matchning af festartikler tr\u00e6ner en-til-en-korrespondance i en kontekst, der f\u00f8les som leg. Sporing af ordene kage og gave udvikler blyantsgreb. F\u00e6lles M\u00e5ls fokus p\u00e5 personlig identitet og sociale f\u00e6rdigheder underst\u00f8ttes naturligt.`,
    developmentalMilestones: [
      { milestone: `Personlig talforst\u00e5else (3\u20134-\u00e5rige kender deres egen alder som det f\u00f8rste meningsfulde tal)`, howWeAddress: `T\u00e6lleaktiviteter med f\u00f8dselsdagslys forbinder matematik med personlig identitet og g\u00f8r tal f\u00f8lelsesm\u00e6ssigt meningsfulde` },
      { milestone: `En-til-en-korrespondance (matchning af genstande parvis)`, howWeAddress: `Matchning af festartikler \u2014 en hat til hvert barn, en gave til hver g\u00e6st \u2014 opbygger grundl\u00e6ggende m\u00e6ngdeforst\u00e5else` },
      { milestone: `Social bevidsthed (f\u00f8rskoleb\u00f8rn begynder at forst\u00e5 deling og turtagning)`, howWeAddress: `Festscenarier, der involverer at dele kage ligeligt og give gaver, introducerer tidlige sociale og matematiske begreber` },
    ],
    differentiationNotes: `For f\u00f8rskoleb\u00f8rn med behov for st\u00f8tte, fokus\u00e9r p\u00e5 t\u00e6lling af f\u00e5 genstande (1\u20135 lys), brug fysiske festartikler som supplement, og hold aktiviteterne korte og festlige. For avancerede f\u00f8rskoleb\u00f8rn udvid t\u00e6lleomr\u00e5det, tilf\u00f8j enkel addition (tre lys plus to lys), og lad barnet skrive invitationer med bogstavsporing.`,
    parentTakeaway: `F\u00f8dselsdage er en guldgrube for l\u00e6ring derhjemme. Lad barnet hj\u00e6lpe med at t\u00e6lle tallerkener til festen, sortere slik i poser og dekorere med m\u00f8nstre. Sp\u00f8rg barnet, hvor gammelt det bliver, og brug lysene p\u00e5 kagen til at t\u00e6lle sammen. At skrive sit eget navn p\u00e5 invitationer er b\u00e5de bogstav\u00f8velse og en meningsfuld aktivitet. Hvert barns f\u00f8dselsdag er en naturlig matematik- og sproglektie.`,
    classroomIntegration: `F\u00f8dselsdagstemaet fungerer hele \u00e5ret i f\u00f8rskolen: hvert barns f\u00f8dselsdag fejres med t\u00e6lleaktiviteter (t\u00e6l lys, t\u00e6l \u00e5r), i samlingen synges f\u00f8dselsdagssange og t\u00e6lles f\u00f8dselsdagsg\u00e6ster, og ved l\u00e6ringsstationer arbejdes med festtematiske farvel\u00e6gnings- og matchningsark. F\u00f8dselsdagskalenderen p\u00e5 v\u00e6ggen giver daglig matematik- og tids\u00f8velse. Temaet underst\u00f8tter F\u00e6lles M\u00e5ls m\u00e5l for personlig identitet og sociale f\u00e6rdigheder.`,
    assessmentRubric: [
      { skill: `T\u00e6lling med festgenstande`, emerging: `t\u00e6ller 1\u20133 lys/balloner med voksenst\u00f8tte`, proficient: `t\u00e6ller selvst\u00e6ndigt op til 10 festgenstande og matcher med korrekt tal`, advanced: `t\u00e6ller over 10 og l\u00f8ser enkle "hvor mange tilsammen"-opgaver` },
      { skill: `En-til-en matchning (festartikler)`, emerging: `matcher 2\u20133 par med voksenst\u00f8tte (hat til barn)`, proficient: `matcher selvst\u00e6ndigt 5\u20136 par festartikler korrekt`, advanced: `matcher komplekse s\u00e6t og forklarer, om der er nok til alle` },
      { skill: `Finmotorisk kontrol (festfarvl\u00e6gning)`, emerging: `farvel\u00e6gger kager og balloner med grove str\u00f8g`, proficient: `farvel\u00e6gger inden for konturerne med varierede farver`, advanced: `tilf\u00f8jer detaljer som m\u00f8nstre p\u00e5 balloner og pynt p\u00e5 kager` },
    ],
  },

  body: {
    snippetAnswer: `Krop-arbejdsark til f\u00f8rskolen (3\u20134 \u00e5r) l\u00e6rer kropsdele gennem matchning, farvl\u00e6gning og sporing. B\u00f8rn forbinder bogstaver og tal med deres egen krop, hvilket g\u00f8r l\u00e6ringen personlig og konkret. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `Kroptemaet er s\u00e6rligt kraftfuldt for f\u00f8rskoleb\u00f8rn, fordi tre- og fire\u00e5rige er intenst optaget af at l\u00e6re om deres egen krop \u2014 de navngiver kropsdele, t\u00e6ller fingre og t\u00e6er, og opdager, hvad deres krop kan. Denne personlige forbindelse g\u00f8r kroppen til det mest konkrete l\u00e6ringstema overhovedet: barnet er selve l\u00e6remidlet. T\u00e6lling af fingre og t\u00e6er op til 10 giver en naturlig matematisk ramme. Matchning af kropsdele med deres navne kombinerer sproglig udvikling med kropsbevidsthed. Sporing af h\u00e6nder og f\u00f8dder tr\u00e6ner finmotorik. F\u00e6lles M\u00e5ls m\u00e5l for sundhed, krop og bevid\u00e6gelse m\u00f8des direkte gennem kropsarbejdsark.`,
    developmentalMilestones: [
      { milestone: `Kropsbevidsthed (3\u20134-\u00e5rige l\u00e6rer at navngive og lokalisere kropsdele)`, howWeAddress: `Matchningsaktiviteter, der forbinder kropsdele med deres navne og funktioner, opbygger kropsbevidsthed og ordforr\u00e5d` },
      { milestone: `T\u00e6lling af kropsegne tal (fingre, t\u00e6er, \u00f8jne, \u00f8rer)`, howWeAddress: `T\u00e6lleaktiviteter med kropsdele g\u00f8r tal konkrete og personlige \u2014 barnet bruger sin egen krop som t\u00e6llev\u00e6rkt\u00f8j` },
      { milestone: `Kropslig selvbevidsthed (f\u00f8rskoleb\u00f8rn begynder at tegne mennesker med hoved, krop og lemmer)`, howWeAddress: `Tegne-og-farvel\u00e6g-aktiviteter, hvor b\u00f8rn f\u00e6rdigg\u00f8r kroppens dele, styrker b\u00e5de kropsopfattelse og finmotorik` },
    ],
    differentiationNotes: `For f\u00f8rskoleb\u00f8rn med behov for st\u00f8tte, start med de mest velkendte kropsdele (hoved, h\u00e6nder, f\u00f8dder), brug barnets egen krop som reference, og hold aktiviteterne fysisk aktive. For avancerede f\u00f8rskoleb\u00f8rn introduc\u00e9r indre organer (hjerte, lunger), tilf\u00f8j bogstavsporing af kropsord og udfordre dem med at tegne en hel person med alle detaljer.`,
    parentTakeaway: `Kroppen er barnets f\u00f8rste l\u00e6remiddel. Navngiv kropsdele under badning, t\u00e6l fingre og t\u00e6er f\u00f8r sengetid, og leg "peg p\u00e5 din n\u00e6se/albue/kn\u00e6" som en sjov hverdagsleg. Lad barnet tegne sig selv \u2014 tegninger af mennesker viser, hvad barnet ved om kroppen, og udvikler sig markant mellem tre og fire \u00e5r. Denne daglige kropsbevidsthed underst\u00f8tter b\u00e5de sundhed og l\u00e6ring.`,
    classroomIntegration: `Kroptemaet integreres i f\u00f8rskolens daglige rutiner: i samlingen synges kropssange og peges p\u00e5 kropsdele, ved bev\u00e6gelseslegen udforskes, hvad kroppen kan, ved l\u00e6ringsstationer arbejdes med kropsarbejdsark, og i kunsthj\u00f8rnet tegnes selvportr\u00e6tter. F\u00e6lles M\u00e5ls m\u00e5l for sundhed, krop og trivsel opfyldes, n\u00e5r kropsbevidsthed kobles med faglig l\u00e6ring.`,
    assessmentRubric: [
      { skill: `Genkendelse af kropsdele`, emerging: `navngiver 3\u20135 kropsdele med voksenst\u00f8tte`, proficient: `navngiver selvst\u00e6ndigt 8\u201310 kropsdele og peger p\u00e5 dem`, advanced: `navngiver 12+ kropsdele inkl. albue, ankel, skulder og forklarer funktioner` },
      { skill: `T\u00e6lling med kroppen`, emerging: `t\u00e6ller fingre p\u00e5 \u00e9n h\u00e5nd (1\u20135) med st\u00f8tte`, proficient: `t\u00e6ller selvst\u00e6ndigt fingre og t\u00e6er op til 10`, advanced: `bruger kroppen til at l\u00f8se enkle regneopgaver (vis mig 3 fingre plus 2 fingre)` },
      { skill: `Menneskefigurtegning`, emerging: `tegner en hovedf\u00f8dding (hoved med ben)`, proficient: `tegner en person med hoved, krop, arme og ben`, advanced: `tegner med detaljer som fingre, t\u00f8j, h\u00e5r og ansigtsudtryk` },
    ],
  },

  camping: {
    snippetAnswer: `Camping-arbejdsark til f\u00f8rskolen (3\u20134 \u00e5r) bruger telte, lejrb\u00e5l og skovmotiver til farvel\u00e6gning, t\u00e6lling og matchning, der styrker finmotorik og tidlig talforst\u00e5else. Udend\u00f8rsfascinationen driver engagementet. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `Campingtemaet vekker f\u00f8rskoleb\u00f8rnenes eventyrfantasi \u2014 tre- og fire\u00e5rige drr\u00f8mmer om at sove i telt, lave mad over b\u00e5l og lytte til nattelyde. Denne fantasifulde kontekst giver en st\u00e6rk ramme for l\u00e6ring, fordi campingscenarier naturligt indeholder t\u00e6lling (pinde til b\u00e5let, stjerner p\u00e5 himlen), matchning (campingudstyr til aktiviteter) og farvel\u00e6gning (telte, b\u00e5l, skov). Campingmotiver giver ogs\u00e5 mulighed for at \u00f8ve rumlige begreber (inde i/uden for teltet). F\u00e6lles M\u00e5ls m\u00e5l for natur, udeliv og kropslig udfoldelse st\u00f8ttes, n\u00e5r f\u00f8rskoleb\u00f8rn udforsker naturtemaer gennem arbejdsark.`,
    developmentalMilestones: [
      { milestone: `T\u00e6lling af genstande i en scene (3\u20134-\u00e5rige opbygger en-til-en-korrespondance)`, howWeAddress: `Find-og-t\u00e6l-aktiviteter med campinggenstande som telte, fisk og stjerner, tr\u00e6ner m\u00e6ngdeforst\u00e5else i en motiverende kontekst` },
      { milestone: `Visuel s\u00f8gning (b\u00f8rn l\u00e6rer at finde skjulte genstande i travle scener)`, howWeAddress: `Find-objekter-aktiviteter med campingscener, hvor b\u00f8rn s\u00f8ger efter skjulte genstande, udvikler visuel opm\u00e6rksomhed` },
      { milestone: `Rumlig forst\u00e5else (f\u00f8rskoleb\u00f8rn l\u00e6rer begreber som inde/ude, over/under)`, howWeAddress: `Matchningsaktiviteter med campingudstyr og rumlige begreber (lommelygten i teltet, b\u00e5let foran teltet)` },
    ],
    differentiationNotes: `For f\u00f8rskoleb\u00f8rn med behov for st\u00f8tte, fokus\u00e9r p\u00e5 simple campingscener med f\u00e5 genstande, brug fysisk campingudstyr som supplement (mini-telt, lommelygte), og hold aktiviteterne korte og eventyrpr\u00e6gede. For avancerede f\u00f8rskoleb\u00f8rn tilf\u00f8j mere komplekse scener med flere genstande at t\u00e6lle, introduc\u00e9r bogstavsporing af campingord og lad dem f\u00f8lge en simpel skattekortsti.`,
    parentTakeaway: `Campingfascination beh\u00f8ver ikke en rigtig campingtur \u2014 byg et telt af t\u00e6pper i stuen, lav en lege-lejrb\u00e5l af papir, og t\u00e6l "stjerner" p\u00e5 loftet. L\u00e6s camping-billedb\u00f8ger f\u00f8r sengetid og lad barnet fort\u00e6lle om, hvad det ville tage med p\u00e5 en tur. Disse fantasilege forl\u00e6nger l\u00e6ringen fra arbejdsarkene og styrker b\u00e5de ordforr\u00e5d og fort\u00e6llekompetence.`,
    classroomIntegration: `Campingtemaet fungerer s\u00e6rligt godt om for\u00e5ret og sommeren: i samlingen fort\u00e6lles om campingoplevelser, i udend\u00f8rsomr\u00e5det bygges legetelte og "lejrb\u00e5l", ved l\u00e6ringsstationer arbejdes med t\u00e6lle- og farvel\u00e6gningsark, og i rollelegen pakkes rygs\u00e6kke og laves mad over b\u00e5l. Campingprojektuger integrerer F\u00e6lles M\u00e5ls m\u00e5l for natur, udeliv, sociale f\u00e6rdigheder og sproglig udvikling.`,
    assessmentRubric: [
      { skill: `T\u00e6lling af campinggenstande`, emerging: `t\u00e6ller 1\u20134 genstande i en enkel scene med st\u00f8tte`, proficient: `t\u00e6ller selvst\u00e6ndigt op til 10 genstande i en campingscene`, advanced: `t\u00e6ller flere typer genstande separat og sammenligner antal` },
      { skill: `Visuel s\u00f8gning i campingscener`, emerging: `finder 1\u20132 skjulte genstande med voksenst\u00f8tte`, proficient: `finder selvst\u00e6ndigt 4\u20135 skjulte genstande i en campingscene`, advanced: `finder alle skjulte genstande hurtigt og systematisk` },
      { skill: `Rumlige begreber (campingkontekst)`, emerging: `forst\u00e5r inde/ude med konkrete eksempler`, proficient: `bruger rumlige ord som inde, ude, foran, bagved i campingkontekst`, advanced: `forklarer placering af genstande med flere rumlige begreber og f\u00f8lger flertrinsinstruktioner` },
    ],
  },

  circus: {
    snippetAnswer: `Cirkus-arbejdsark til f\u00f8rskolen (3\u20134 \u00e5r) bruger klovne, dyr og artister til farvel\u00e6gning, t\u00e6lling og matchning. De farverige cirkusmotiver fascinerer f\u00f8rskoleb\u00f8rn og driver engagement. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `Cirkustemaet appellerer dybt til f\u00f8rskoleb\u00f8rn, fordi tre- og fire\u00e5rige er fascinerede af den magiske verden med klovne, akrobater og dresserede dyr. De farverige, overdrevne cirkusbilleder f\u00e6nger opm\u00e6rksomheden l\u00e6ngere end de fleste andre temaer, fordi hvert billede er en verden af detaljer at udforske. T\u00e6lling af cirkusdyr og bolde giver naturlige matematik\u00f8velser, matchning af artister med deres rekvisitter opbygger logik, og farvel\u00e6gning af klovne og telte forfiner finmotorik. Cirkus introducerer ogs\u00e5 m\u00f8nstergenkendelse (stribet telt, prikket klovnedragt). F\u00e6lles M\u00e5ls m\u00e5l for kreativitet og fantasi underst\u00f8ttes direkte af cirkustemaets legende karakter.`,
    developmentalMilestones: [
      { milestone: `M\u00f8nstergenkendelse (3\u20134-\u00e5rige begynder at identificere gentagne m\u00f8nstre)`, howWeAddress: `M\u00f8nsterarbejdsark med cirkusmotiver (r\u00f8d-hvid-r\u00f8d striber p\u00e5 teltet, prik-stribe-prik p\u00e5 klovnen) introducerer sekvenslogik` },
      { milestone: `T\u00e6lling og en-til-en-korrespondance`, howWeAddress: `Find-og-t\u00e6l-aktiviteter med cirkuselementer (bolde, stjerner, dyr i manego) g\u00f8r t\u00e6lling festlig og motiverende` },
      { milestone: `Visuel skelneevne (identificere forskelle mellem lignende billeder)`, howWeAddress: `Skyggematchning med cirkussilhuetter og find-den-der-er-anderledes-aktiviteter styrker observation` },
    ],
    differentiationNotes: `For f\u00f8rskoleb\u00f8rn med behov for st\u00f8tte, fokus\u00e9r p\u00e5 simple cirkusscener med \u00e9n klovn eller \u00e9t dyr, brug store konturer, og lad barnet v\u00e6lge farver frit. For avancerede f\u00f8rskoleb\u00f8rn tilf\u00f8j m\u00f8nster-forts\u00e6t-opgaver, introduc\u00e9r t\u00e6lling over 10, og udfordre dem med at finde forskelle mellem to n\u00e6sten ens cirkusbilleder.`,
    parentTakeaway: `Cirkusfascinationen kan forl\u00e6nges derhjemme med enkle cirkuslege: jongl\u00e9r med b\u00f8ller, lav klovnesminke, gang p\u00e5 en "line" af tape p\u00e5 gulvet. T\u00e6l sammen, hvor mange bolde klovnen kaster, og tal om m\u00f8nstrene p\u00e5 cirkusteltet. Cirkusb\u00f8ger og -videoer giver ordforr\u00e5d og fantasi, der g\u00f8r arbejdsarkene mere levende.`,
    classroomIntegration: `Cirkustemaet fungerer fantastisk som projektemne: i samlingen vises cirkusbilleder og -videoer, i bev\u00e6gelseslegen \u00f8ves balance og jonglering, ved l\u00e6ringsstationer arbejdes med cirkusarbejdsark, og som afslutning opf\u00f8rer b\u00f8rnene deres eget lille cirkusshow. Denne projektbaserede tilgang opfylder F\u00e6lles M\u00e5ls m\u00e5l for kreativitet, kropslig udfoldelse og samarbejde.`,
    assessmentRubric: [
      { skill: `T\u00e6lling af cirkuselementer`, emerging: `t\u00e6ller 1\u20135 cirkusgenstande med voksenst\u00f8tte`, proficient: `t\u00e6ller selvst\u00e6ndigt op til 10 i en cirkusscene og matcher med tal`, advanced: `t\u00e6ller over 10 og sorterer cirkusgenstande i kategorier` },
      { skill: `M\u00f8nstergenkendelse (cirkusmotiver)`, emerging: `identificerer et simpelt AB-m\u00f8nster med voksenst\u00f8tte`, proficient: `genkender og forts\u00e6tter AB- og ABC-m\u00f8nstre selvst\u00e6ndigt`, advanced: `skaber egne m\u00f8nstre og forklarer m\u00f8nsterlogikken` },
      { skill: `Visuel skelneevne (cirkusbilleder)`, emerging: `finder 1\u20132 forskelle mellem to cirkusbilleder med st\u00f8tte`, proficient: `finder selvst\u00e6ndigt 3\u20134 forskelle`, advanced: `finder alle forskelle hurtigt og beskriver dem mundtligt` },
    ],
  },

  clothing: {
    snippetAnswer: `T\u00f8j-arbejdsark til f\u00f8rskolen (3\u20134 \u00e5r) bruger velkendte t\u00f8jgenstande til matchning, sortering og farvel\u00e6gning, der styrker kategorisk t\u00e6nkning og finmotorik. B\u00f8rnenes daglige t\u00f8jerfaring driver l\u00e6ringen. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `T\u00f8jtemaet er s\u00e6rligt relevant for f\u00f8rskoleb\u00f8rn, fordi tre- og fire\u00e5rige er i gang med at l\u00e6re at kl\u00e6de sig selv p\u00e5 \u2014 at v\u00e6lge t\u00f8j, kende forskel p\u00e5 inde- og udet\u00f8j, og matche farver og m\u00f8nstre. Denne daglige selvst\u00e6ndighedstr\u00e6ning g\u00f8r t\u00f8j til det mest personligt relevante sorteringstema. B\u00f8rn sorterer naturligt t\u00f8j efter type (sokker, bukser, tr\u00f8jer), s\u00e6son (vintert\u00f8j/sommert\u00f8j) og egenskab (farve, m\u00f8nster). Matchning af ens sokker og st\u00f8vler tr\u00e6ner parvis t\u00e6nkning. F\u00e6lles M\u00e5ls m\u00e5l for selvhj\u00e6lpsf\u00e6rdigheder og personlig udvikling m\u00f8des direkte, n\u00e5r b\u00f8rn l\u00e6rer om t\u00f8j gennem strukturerede aktiviteter.`,
    developmentalMilestones: [
      { milestone: `Kategorisering efter flere egenskaber (3\u20134-\u00e5rige begynder at sortere efter farve, type og s\u00e6son)`, howWeAddress: `Sorteringsaktiviteter, hvor b\u00f8rn grupperer t\u00f8j efter type, farve eller s\u00e6son, styrker logisk t\u00e6nkning` },
      { milestone: `Selvst\u00e6ndighed i p\u00e5kl\u00e6dning (f\u00f8rskoleb\u00f8rn l\u00e6rer at v\u00e6lge passende t\u00f8j)`, howWeAddress: `Matchning af t\u00f8j til vejr og situationer (regnt\u00f8j til regnvejr, badet\u00f8j til strand) kobler kognitiv l\u00e6ring med praktisk f\u00e6rdighed` },
      { milestone: `M\u00f8nstergenkendelse (genkende striber, prikker, tern p\u00e5 t\u00f8j)`, howWeAddress: `M\u00f8nsterz\u00f8g-aktiviteter med stribet, prikket og ensfarvet t\u00f8j introducerer visuel m\u00f8nsteranalyse` },
    ],
    differentiationNotes: `For f\u00f8rskoleb\u00f8rn med behov for st\u00f8tte, start med de mest velkendte t\u00f8jgenstande (sokker, sko, tr\u00f8je), brug rigtigt t\u00f8j som supplement, og fokus\u00e9r p\u00e5 \u00e9n sorteringsegenskab ad gangen. For avancerede f\u00f8rskoleb\u00f8rn introduc\u00e9r sortering efter to egenskaber samtidig, tilf\u00f8j bogstavsporing af t\u00f8jord og lad dem designe m\u00f8nstre p\u00e5 t\u00f8jskabeloner.`,
    parentTakeaway: `T\u00f8j er en daglig l\u00e6ringsmulighed. Lad barnet hj\u00e6lpe med at sortere vasket\u00f8j efter ejer og type, v\u00e6lge sit eget t\u00f8j om morgenen og matche ens sokker. Tal om vejret og sp\u00f8rg: "Hvad skal vi have p\u00e5 i dag, n\u00e5r det regner?" Disse hverdags\u00f8jeblikke tr\u00e6ner kategorisering, beslutningstagning og sprog \u2014 de samme f\u00e6rdigheder, som arbejdsarkene styrker.`,
    classroomIntegration: `T\u00f8jtemaet passes ind i f\u00f8rskolens garderoberutine: ved ankomst tales om, hvad b\u00f8rnene har p\u00e5, i samlingen sorteres t\u00f8j efter s\u00e6son, ved l\u00e6ringsstationer arbejdes med matchnings- og sorteringsark, og i rollelegen kl\u00e6des dukker p\u00e5 til forskellige vejrsituationer. S\u00e6sonsskift giver naturlige anledninger til at genbes\u00f8ge temaet. F\u00e6lles M\u00e5ls m\u00e5l for personlig udvikling og selvhj\u00e6lpsf\u00e6rdigheder underst\u00f8ttes.`,
    assessmentRubric: [
      { skill: `T\u00f8jkategorisering`, emerging: `sorterer t\u00f8j i to grupper med voksenst\u00f8tte (f.eks. sokker/ikke-sokker)`, proficient: `sorterer selvst\u00e6ndigt t\u00f8j efter type, farve eller s\u00e6son`, advanced: `sorterer efter to egenskaber samtidig og forklarer sine valg` },
      { skill: `T\u00f8j-til-vejr matchning`, emerging: `v\u00e6lger passende t\u00f8j til \u00e9n tydelig vejrtype med st\u00f8tte`, proficient: `matcher selvst\u00e6ndigt t\u00f8j til tre eller fire vejrtyper`, advanced: `planl\u00e6gger p\u00e5kl\u00e6dning til forskellige scenarier og forklarer hvorfor` },
      { skill: `M\u00f8nstergenkendelse p\u00e5 t\u00f8j`, emerging: `identificerer \u00e9n m\u00f8nstertype (striber) med voksenst\u00f8tte`, proficient: `genkender og navngiver tre m\u00f8nstertyper (striber, prikker, tern)`, advanced: `designer egne m\u00f8nstre og beskriver dem mundtligt` },
    ],
  },

  colors: {
    snippetAnswer: `Farve-arbejdsark til f\u00f8rskolen (3\u20134 \u00e5r) bruger farvel\u00e6gning, sortering og matchning til at l\u00e6re grundl\u00e6ggende farver og styrke finmotorik. B\u00f8rnenes naturlige farvegl\u00e6de g\u00f8r temaet uimodst\u00e5eligt. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `Farvetemaet er et af de mest grundl\u00e6ggende for f\u00f8rskoleb\u00f8rn, fordi tre- og fire\u00e5rige er midt i processen med at l\u00e6re at navngive og skelne farver \u2014 en kognitiv milepol, der underst\u00f8tter al fremtidig l\u00e6ring. Farver er overalt i barnets hverdag, og evnen til at identificere og navngive dem er en f\u00f8rste kategoriseringsf\u00e6rdighed, der baner vejen for matematik og naturvidenskab. Farvel\u00e6gningsaktiviteter tr\u00e6ner samtidig finmotorik, og sortering af genstande efter farve opbygger logisk t\u00e6nkning. Farveblandingsaktiviteter introducerer \u00e5rsag-virkning-t\u00e6nkning. F\u00e6lles M\u00e5ls m\u00e5l for \u00e6stetik, kreativitet og sanseoplevelser m\u00f8des direkte gennem farvearbejdsark.`,
    developmentalMilestones: [
      { milestone: `Farvegenkendelse og -navngivning (3\u20134-\u00e5rige l\u00e6rer at identificere og navngive prim\u00e6rfarver)`, howWeAddress: `Farvesorteringsaktiviteter, hvor b\u00f8rn grupperer genstande efter farve, styrker b\u00e5de farvevokabular og kategorisering` },
      { milestone: `Finmotorisk kontrol gennem farvel\u00e6gning (overgang fra grove til kontrollerede str\u00f8g)`, howWeAddress: `Farvel\u00e6gningssider med store felter og tykke konturer tr\u00e6ner h\u00e5ndkontrol og farveanvendelse` },
      { milestone: `Visuelt matching af farver (parring af ens farver p\u00e5 tv\u00e6rs af genstande)`, howWeAddress: `Matchningsaktiviteter, der parrer genstande efter farve, skaber visuelle forbindelser og styrker opm\u00e6rksomhed p\u00e5 detaljer` },
    ],
    differentiationNotes: `For f\u00f8rskoleb\u00f8rn med behov for st\u00f8tte, start med tre prim\u00e6rfarver (r\u00f8d, bl\u00e5, gul), brug fysiske genstande som supplement (farveblokke, bolde), og fokus\u00e9r p\u00e5 \u00e9n farve pr. session. For avancerede f\u00f8rskoleb\u00f8rn introduc\u00e9r sekund\u00e6rfarver, farveblandingseksperimenter og m\u00f8nstre med farvekombinationer.`,
    parentTakeaway: `Farver er overalt, og det g\u00f8r dem til den letteste l\u00e6ringsmulighed derhjemme. Navngiv farver under indk\u00f8b, sorter vasket\u00f8j efter farve, og leg "jeg ser noget, der er bl\u00e5t". Lad barnet male frit og tal om farverne sammen. Blanding af farver med fingermaling (r\u00f8d + gul = orange) skaber magiske aha-\u00f8jeblikke, der styrker b\u00e5de kreativitet og logisk t\u00e6nkning.`,
    classroomIntegration: `Farvetemaet l\u00f8ber som en r\u00f8d tr\u00e5d gennem hele f\u00f8rskole\u00e5ret: ugens farve synligg\u00f8res i samlingen, ved l\u00e6ringsstationer arbejdes med farvesorterings- og farvel\u00e6gningsark, i kunsthj\u00f8rnet eksperimenteres med farveblandning, og i hverdagen peges p\u00e5 farver i t\u00f8j og omgivelser. Farveforst\u00e5else er en tv\u00e6rg\u00e5ende f\u00e6rdighed, der underst\u00f8tter F\u00e6lles M\u00e5ls m\u00e5l for kreativitet og \u00e6stetik.`,
    assessmentRubric: [
      { skill: `Farvegenkendelse`, emerging: `navngiver 2\u20133 prim\u00e6rfarver med st\u00f8tte`, proficient: `navngiver selvst\u00e6ndigt alle prim\u00e6r- og sekund\u00e6rfarver (6\u20138 farver)`, advanced: `navngiver nuancer (lyser\u00f8d, m\u00f8rkebl\u00e5) og blander farver bevidst` },
      { skill: `Farvesortering`, emerging: `sorterer genstande i to farvegrupper med voksenst\u00f8tte`, proficient: `sorterer selvst\u00e6ndigt i fire eller flere farvegrupper`, advanced: `sorterer efter farve og \u00e9n yderligere egenskab (form, st\u00f8rrelse)` },
      { skill: `Farvel\u00e6gning inden for konturer`, emerging: `farvel\u00e6gger med grove str\u00f8g, ofte uden for konturerne`, proficient: `farvel\u00e6gger j\u00e6vnt inden for konturerne med passende farver`, advanced: `anvender detaljer, varierede farver og kontrollerede str\u00f8g` },
    ],
  },

  construction: {
    snippetAnswer: `Byggeri-arbejdsark til f\u00f8rskolen (3\u20134 \u00e5r) bruger gravemaskiner, kraner og byggerier til t\u00e6lling, matchning og farvel\u00e6gning. Fascinationen af store maskiner driver st\u00e6rkt engagement. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `Byggetemaet har en s\u00e6rlig tiltrokkelseskraft for f\u00f8rskoleb\u00f8rn, fordi tre- og fire\u00e5rige er fascinerede af store maskiner, der graver, l\u00f8fter og bygger. Denne intense interesse \u2014 s\u00e6rligt udbredt, men ikke begr\u00e6nset til drenge \u2014 giver en kraftfuld motivationsmotor for l\u00e6ring. T\u00e6lling af mursten, hjul og vinduer giver konkret matematik, matchning af v\u00e6rkt\u00f8j til opgaver opbygger logisk t\u00e6nkning, og farvel\u00e6gning af maskiner med mange detaljer forfiner finmotorik. Byggetemaet introducerer ogs\u00e5 rumlige begreber (h\u00f8j/lav, stor/lille) og sekvensering (f\u00f8rst graver vi, s\u00e5 bygger vi). F\u00e6lles M\u00e5ls m\u00e5l for nysgerrighed og udforskning opfyldes.`,
    developmentalMilestones: [
      { milestone: `Rumlige begreber (3\u20134-\u00e5rige l\u00e6rer h\u00f8j/lav, stor/lille, over/under)`, howWeAddress: `Matchningsaktiviteter og skyggematchning med byggemaskiner og bygninger styrker rumlig forst\u00e5else` },
      { milestone: `T\u00e6lning med konkrete genstande (opbygning af en-til-en-korrespondance)`, howWeAddress: `T\u00e6lleaktiviteter med mursten, hjul og vinduer i byggescener g\u00f8r matematik h\u00e5ndgribelig` },
      { milestone: `Sekvensering (f\u00f8rskoleb\u00f8rn begynder at forst\u00e5 r\u00e6kkef\u00f8lge)`, howWeAddress: `M\u00f8nsterarbejdsark med byggesekvenser (lille-stor-lille) introducerer logisk r\u00e6kkef\u00f8lge og m\u00f8nstert\u00e6nkning` },
    ],
    differentiationNotes: `For f\u00f8rskoleb\u00f8rn med behov for st\u00f8tte, fokus\u00e9r p\u00e5 \u00e9n maskintype ad gangen, brug fysiske byggeklodser som supplement, og hold scenerne enkle. For avancerede f\u00f8rskoleb\u00f8rn tilf\u00f8j t\u00e6lling over 10, introduc\u00e9r sekvenseringskort (byg et hus i fire trin), og lad dem tegne deres egen byggeplan.`,
    parentTakeaway: `Hvis barnet elsker gravemaskiner og byggepladser, er det en l\u00e6ringsmulighed! T\u00e6l maskiner p\u00e5 en rigtig byggeplads, byg t\u00e5rne af klodser og tal om st\u00f8rrelse og form. Lad barnet "planl\u00e6gge" et byggeri med papir og farver. Sp\u00f8rg: "Hvor mange mursten har vi brug for?" Denne forbindelse mellem interesse og l\u00e6ring er den mest effektive p\u00e6dagogik.`,
    classroomIntegration: `Byggetemaet integreres i f\u00f8rskolens byggehj\u00f8rne: i samlingen introduceres ugens maskine, ved l\u00e6ringsstationer arbejdes med t\u00e6lle- og matchningsark, i byggehj\u00f8rnet bygges konstruktioner med klodser, og p\u00e5 ture observeres byggepladser i n\u00e6romr\u00e5det. Projektforlo\u00b8b om "vi bygger et hus" integrerer F\u00e6lles M\u00e5ls m\u00e5l for matematik, naturvidenskab og kreativitet.`,
    assessmentRubric: [
      { skill: `T\u00e6lling af byggeelementer`, emerging: `t\u00e6ller 1\u20135 mursten/hjul med voksenst\u00f8tte`, proficient: `t\u00e6ller selvst\u00e6ndigt op til 10 elementer i en byggescene`, advanced: `t\u00e6ller over 10 og sammenligner m\u00e6ngder (flere mursten end vinduer)` },
      { skill: `Rumlige begreber (byggekontekst)`, emerging: `forst\u00e5r stor/lille med konkrete byggeeksempler`, proficient: `bruger rumlige ord som h\u00f8j, lav, over, under korrekt`, advanced: `forklarer rumlige relationer og bygger efter mundtlige instruktioner` },
      { skill: `Sekvensering (byggetrin)`, emerging: `ordner 2 trin i r\u00e6kkef\u00f8lge med st\u00f8tte`, proficient: `ordner selvst\u00e6ndigt 3\u20134 byggetrin logisk`, advanced: `planl\u00e6gger en byggesekvens og forklarer hvert trin` },
    ],
  },

  cooking: {
    snippetAnswer: `Madlavning-arbejdsark til f\u00f8rskolen (3\u20134 \u00e5r) bruger k\u00f8kkengenstande, opskrifter og f\u00f8devarer til t\u00e6lling, sortering og matchning. Den sanselige madoplevelse driver engagementet. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `Madlavningstemaet er s\u00e6rligt effektivt for f\u00f8rskoleb\u00f8rn, fordi tre- og fire\u00e5rige elsker at hj\u00e6lpe i k\u00f8kkenet \u2014 at r\u00f8re i en gryde, h\u00e6lde ingredienser og smage p\u00e5 resultatet. Denne multisensoriske oplevelse giver en naturlig ramme for matematik (t\u00e6l tre \u00e6g, to kopper mel), sekvensering (f\u00f8rst blander vi, s\u00e5 bager vi) og sortering (frugt vs. gr\u00f8nsager). Madlavning er ogs\u00e5 et af de f\u00e5 temaer, der involverer alle sanser, hvilket forst\u00e6rker hukommelsen markant. Matchning af k\u00f8kkenredskaber med ingredienser opbygger logik. F\u00e6lles M\u00e5ls m\u00e5l for sundhed, hverdagskompetencer og m\u00e5ltidf\u00e6llesskab underst\u00f8ttes direkte.`,
    developmentalMilestones: [
      { milestone: `Sekvensering (f\u00f8rskoleb\u00f8rn l\u00e6rer at f\u00f8lge trin i r\u00e6kkef\u00f8lge)`, howWeAddress: `Opskrift-sekvenseringsark med billeder af hvert trin tr\u00e6ner logisk r\u00e6kkef\u00f8lge i en motiverende kontekst` },
      { milestone: `T\u00e6lling af ingredienser (opbygning af m\u00e6ngdeforst\u00e5else)`, howWeAddress: `T\u00e6lleaktiviteter med \u00e6g, frugt og gr\u00f8nsager g\u00f8r matematik konkret og sanselig` },
      { milestone: `Kategorisering af f\u00f8devarer (sortering efter type, farve, form)`, howWeAddress: `Sorteringsaktiviteter med f\u00f8devarer (frugt/gr\u00f8nt, s\u00f8dt/salt) styrker kategorisk t\u00e6nkning` },
    ],
    differentiationNotes: `For f\u00f8rskoleb\u00f8rn med behov for st\u00f8tte, fokus\u00e9r p\u00e5 velkendte f\u00f8devarer (frugt, br\u00f8d, m\u00e6lk), brug fysiske k\u00f8kkenredskaber som supplement, og hold opskriftssekvenserne korte (2\u20133 trin). For avancerede f\u00f8rskoleb\u00f8rn tilf\u00f8j l\u00e6ngere sekvenser, introduc\u00e9r m\u00e5leenheder og lad dem "l\u00e6se" enkle billedopskrifter selvst\u00e6ndigt.`,
    parentTakeaway: `K\u00f8kkenet er et l\u00e6ringslaboratorium. Lad barnet t\u00e6lle ingredienser, h\u00e6lde og r\u00f8re. Tal om, hvad der sker, n\u00e5r vi varmer dejen (naturvidenskab), og t\u00e6l portioner (matematik). Simple opskrifter som frugtsalat giver mulighed for t\u00e6lling, sortering og sekvensering. Arbejdsarkene forbereder barnet p\u00e5 denne virkelige k\u00f8kkenl\u00e6ring ved at tr\u00e6ne de kognitive f\u00e6rdigheder p\u00e5 papiret f\u00f8rst.`,
    classroomIntegration: `Madlavningstemaet passer perfekt ind i f\u00f8rskolens m\u00e5ltidsrutine: i samlingen tales om dagens frokost, ved l\u00e6ringsstationer arbejdes med sorterings- og t\u00e6lark, i k\u00f8kkenhj\u00f8rnet laves simple opskrifter, og i rollelegen drives legestaurant. Temauger med "vi laver mad" integrerer F\u00e6lles M\u00e5ls m\u00e5l for sundhed, matematik og sociale f\u00e6rdigheder.`,
    assessmentRubric: [
      { skill: `Opskriftsekvensering`, emerging: `ordner 2 madlavningstrin med voksenst\u00f8tte`, proficient: `ordner selvst\u00e6ndigt 3\u20134 trin i en enkel opskrift`, advanced: `f\u00f8lger en billedopskrift selvst\u00e6ndigt og forklarer hvert trin` },
      { skill: `T\u00e6lling af ingredienser`, emerging: `t\u00e6ller 1\u20134 ingredienser med st\u00f8tte`, proficient: `t\u00e6ller selvst\u00e6ndigt op til 10 ingredienser og matcher med tal`, advanced: `t\u00e6ller over 10 og l\u00f8ser "hvor mange mangler"-opgaver` },
      { skill: `F\u00f8devarekategorisering`, emerging: `sorterer i to grupper med st\u00f8tte (frugt/ikke-frugt)`, proficient: `sorterer selvst\u00e6ndigt f\u00f8devarer i tre eller fire kategorier`, advanced: `opfinder egne kategorier og sorterer efter flere egenskaber` },
    ],
  },

  dinosaurs: {
    snippetAnswer: `Dinosaur-arbejdsark til f\u00f8rskolen (3\u20134 \u00e5r) bruger farverige dinosaurbilleder til farvel\u00e6gning, t\u00e6lling og st\u00f8rrelsessammenligning. B\u00f8rnenes intense dinosaurfascination skaber exceptionelt engagement. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `Dinosaurtemaet har en n\u00e6rmest magisk tiltrokkelseskraft p\u00e5 f\u00f8rskoleb\u00f8rn \u2014 tre- og fire\u00e5rige kan ofte navngive dinosaurarter, som voksne ikke kender, og denne intense interesse er en utrolig kraftfuld l\u00e6ringsmotor. "Dinosaurinteressen" er veldokumenteret i udviklingsforskning som en manifestation af b\u00f8rns behov for at kategorisere og mestre et videndomom\u00e6ne. T\u00e6lling af dinosaurer giver motiverende matematik, st\u00f8rrelsessammenligning (stor T-Rex vs. lille Compsognathus) introducerer m\u00e5lebegreber, og farvel\u00e6gning af detaljerede dinosaurer styrker finmotorik. Skyggematchning med dinosaursilhuetter tr\u00e6ner visuel skelneevne. F\u00e6lles M\u00e5ls m\u00e5l for nysgerrighed og udforskning underst\u00f8ttes af barnets selvdrevne interesse.`,
    developmentalMilestones: [
      { milestone: `St\u00f8rrelsesforst\u00e5else (3\u20134-\u00e5rige l\u00e6rer begreberne stor, mellem og lille)`, howWeAddress: `Stor-lille-aktiviteter med dinosaurer af forskellige st\u00f8rrelser g\u00f8r st\u00f8rrelsesbegreber konkrete og fascinerende` },
      { milestone: `Kategorisering (f\u00f8rskoleb\u00f8rn l\u00e6rer at gruppere genstande efter egenskaber)`, howWeAddress: `Sorteringsaktiviteter, der grupperer dinosaurer (planteædere/k\u00f8d\u00e6dere, stor/lille), styrker logisk t\u00e6nkning` },
      { milestone: `Visuel genkendelse af komplekse former (b\u00f8rn l\u00e6rer at skelne detaljerede silhuetter)`, howWeAddress: `Skyggematchning og find-den-der-er-anderledes-aktiviteter med dinosaurer tr\u00e6ner observation og visuel skelneevne` },
    ],
    differentiationNotes: `For f\u00f8rskoleb\u00f8rn med behov for st\u00f8tte, begr\u00e6ns til tre eller fire velkendte dinosaurer (T-Rex, Triceratops, Brontosaurus), brug store konturer og fysiske dinosaurfigurer som supplement. For avancerede f\u00f8rskoleb\u00f8rn introduc\u00e9r flere arter, tilf\u00f8j bogstavsporing af dinosaurnavne og udfordre dem med at sortere efter flere egenskaber (f\u00f8de, st\u00f8rrelse, antal ben).`,
    parentTakeaway: `Dinosaurinteressen er et p\u00e6dagogisk guld \u2014 udnyt den! Bes\u00f8g naturhistoriske museer, l\u00e6s dinosaurb\u00f8ger, og lad barnet fort\u00e6lle om sine yndlingsdinosaurer. T\u00e6l dinosaurfigurer efter st\u00f8rrelse, og spil "hvilken er st\u00f8rst". Forsk viser, at b\u00f8rn med intense interesser udvikler bedre kognitive f\u00e6rdigheder, s\u00e5 n\u00e6r barnets fascination og brug den som l\u00e6ringsplatform.`,
    classroomIntegration: `Dinosaurtemaet fungerer som et opslugende projektforlo\u00b8b: i samlingen pr\u00e6senteres ugens dinosaur, ved l\u00e6ringsstationer arbejdes med farvel\u00e6gnings-, t\u00e6lle- og matchningsark, i sandkassen graves fossiler, og i kunsthj\u00f8rnet bygges dinosaurmodeller. Dinosaurprojektugen integrerer F\u00e6lles M\u00e5ls m\u00e5l for naturfag, sprog og kreativitet p\u00e5 tv\u00e6rs af alle l\u00e6ringsomr\u00e5der.`,
    assessmentRubric: [
      { skill: `St\u00f8rrelsessammenligning (dinosaurer)`, emerging: `peger p\u00e5 den store og den lille dinosaur med voksenst\u00f8tte`, proficient: `sorterer selvst\u00e6ndigt tre eller fire dinosaurer fra st\u00f8rst til mindst`, advanced: `sammenligner og ordner fem eller flere og bruger begreberne st\u00f8rst, mindst, mellem` },
      { skill: `Dinosaurkategorisering`, emerging: `sorterer i to grupper med st\u00f8tte`, proficient: `sorterer selvst\u00e6ndigt efter \u00e9n egenskab (f\u00f8de eller st\u00f8rrelse)`, advanced: `sorterer efter to egenskaber og forklarer forskellene` },
      { skill: `Visuel skelneevne (dinosaursilhuetter)`, emerging: `matcher 2\u20133 silhuetter med st\u00f8tte`, proficient: `matcher selvst\u00e6ndigt 4\u20136 dinosaursilhuetter med de rigtige billeder`, advanced: `matcher komplekse silhuetter og beskriver, hvilke tr\u00e6k der afsl\u00f8rer arten` },
    ],
  },

  easter: {
    snippetAnswer: `P\u00e5ske-arbejdsark til f\u00f8rskolen (3\u20134 \u00e5r) bruger \u00e6g, kyllinger og kaniner til farvel\u00e6gning, t\u00e6lning og m\u00f8nsterdekoration. Den festlige stemning og den visuelle rigdom driver engagementet. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `P\u00e5sketemaet er ideelt for f\u00f8rskoleb\u00f8rn, fordi tre- og fire\u00e5rige oplever p\u00e5sken som en magisk tid med farvelagte \u00e6g, kyllinger og \u00e6ggejagt \u2014 visuelle og sanselige oplevelser, der f\u00e6nger fuldst\u00e6ndigt. P\u00e5ske\u00e6g giver perfekte muligheder for m\u00f8nsterdekoration (striber, prikker, b\u00f8lger), t\u00e6lling og farveidentifikation. Den tidsbegr\u00e6nsede s\u00e6sonkarakter skaber naturlig begejstring og engagement. T\u00e6lling af \u00e6g i en kurv giver konkret matematik, matchning af kyllinger med reder opbygger logik, og farvel\u00e6gning af p\u00e5skemotiver forfiner finmotorik. F\u00e6lles M\u00e5ls m\u00e5l for kultur, traditioner og kreativitet underst\u00f8ttes naturligt.`,
    developmentalMilestones: [
      { milestone: `M\u00f8nskerdekoration (3\u20134-\u00e5rige begynder at anvende gentagne m\u00f8nstre p\u00e5 overflader)`, howWeAddress: `P\u00e5ske\u00e6g-dekorationsark, hvor b\u00f8rn forts\u00e6tter m\u00f8nstre (striber, prikker, b\u00f8lger), introducerer m\u00f8nstergenkendelse` },
      { milestone: `T\u00e6lling i kontekst (\u00e6g i kurv, kyllinger p\u00e5 eng)`, howWeAddress: `Find-og-t\u00e6l-aktiviteter med p\u00e5skemotiver g\u00f8r talforst\u00e5else festlig og sanselig` },
      { milestone: `Visuel s\u00f8gning (finde skjulte genstande)`, howWeAddress: `\u00c6ggejagt-lignende find-objekter-aktiviteter, hvor b\u00f8rn s\u00f8ger efter skjulte \u00e6g i en scene, tr\u00e6ner systematisk visuel scanning` },
    ],
    differentiationNotes: `For f\u00f8rskoleb\u00f8rn med behov for st\u00f8tte, fokus\u00e9r p\u00e5 simple \u00e6g-farvel\u00e6gninger med store felter, t\u00e6l f\u00e5 \u00e6g (1\u20135), og brug fysiske p\u00e5ske\u00e6g som supplement. For avancerede f\u00f8rskoleb\u00f8rn tilf\u00f8j komplekse m\u00f8nstre p\u00e5 \u00e6ggene, t\u00e6lling over 10, og lad dem designe helt egne p\u00e5ske\u00e6g med m\u00f8nstre.`,
    parentTakeaway: `P\u00e5sken er en oplagt l\u00e6ringsfest derhjemme. Farvel\u00e6g \u00e6g sammen og tal om m\u00f8nstre (striber, prikker, b\u00f8lger). Gem p\u00e5ske\u00e6g og t\u00e6l, hvor mange barnet finder. Lav kyllinger og kaniner i modellervoks. P\u00e5skens visuelle rigdom \u2014 farver, former, m\u00f8nstre \u2014 giver utallige muligheder for at \u00f8ve de f\u00e6rdigheder, som arbejdsarkene tr\u00e6ner.`,
    classroomIntegration: `P\u00e5sketemaet er et h\u00f8jdepunkt i for\u00e5rets f\u00f8rskoleprogram: i samlingen synges p\u00e5skesange og l\u00e6ses p\u00e5skehistorier, ved l\u00e6ringsstationer arbejdes med farvel\u00e6gnings- og t\u00e6lleark, i kunsthj\u00f8rnet dekoreres \u00e6g og klippes kyllinger, og udend\u00f8rs arrangeres \u00e6ggejagt. F\u00e6lles M\u00e5ls m\u00e5l for kultur, traditioner og \u00e6stetik opfyldes.`,
    assessmentRubric: [
      { skill: `M\u00f8nsterdekoration (p\u00e5ske\u00e6g)`, emerging: `anvender \u00e9t simpelt m\u00f8nster med st\u00f8tte`, proficient: `genkender og forts\u00e6tter to m\u00f8nstertyper (striber, prikker) selvst\u00e6ndigt`, advanced: `skaber egne m\u00f8nstre med tre eller flere elementer og varierer dem` },
      { skill: `T\u00e6lling af p\u00e5skemotiver`, emerging: `t\u00e6ller 1\u20135 \u00e6g/kyllinger med st\u00f8tte`, proficient: `t\u00e6ller selvst\u00e6ndigt op til 10 og matcher med tal`, advanced: `t\u00e6ller over 10 og sammenligner m\u00e6ngder (flere \u00e6g end kyllinger)` },
      { skill: `Visuel s\u00f8gning (p\u00e5skescener)`, emerging: `finder 1\u20132 skjulte \u00e6g med st\u00f8tte`, proficient: `finder selvst\u00e6ndigt 4\u20135 skjulte genstande i en p\u00e5skescene`, advanced: `finder alle skjulte genstande systematisk og hurtigt` },
    ],
  },

  emotions: {
    snippetAnswer: `F\u00f8lelses-arbejdsark til f\u00f8rskolen (3\u20134 \u00e5r) bruger ansigtsudtryk og situationsbilleder til matchning, sortering og samtale om f\u00f8lelser. Social-emotionel l\u00e6ring st\u00f8tter b\u00e5de trivsel og fagl\u00e6ring. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `F\u00f8lelsestemaet er helt centralt for f\u00f8rskoleb\u00f8rn, fordi tre- og fire\u00e5rige er midt i en eksplosiv social-emotionel udvikling \u2014 de l\u00e6rer at navngive f\u00f8lelser, regulere frustrationer og forst\u00e5 andres perspektiver. Denne f\u00e6rdighed er foruds\u00e6tningen for al anden l\u00e6ring: et barn, der ikke kan h\u00e5ndtere frustration, kan ikke koncentrere sig om bogstaver og tal. Matchning af ansigtsudtryk med situationer opbygger empatisk forst\u00e5else, farvel\u00e6gning af f\u00f8lelsesansigter \u00f8ger opm\u00e6rksomhed p\u00e5 mimik, og samtaler om arbejdsarkenes scenarier udvikler f\u00f8lelsesvokabular. F\u00e6lles M\u00e5ls m\u00e5l for personlig og social udvikling m\u00f8des direkte.`,
    developmentalMilestones: [
      { milestone: `F\u00f8lelsesnavngivning (3\u20134-\u00e5rige l\u00e6rer at identificere og navngive grundl\u00e6ggende f\u00f8lelser)`, howWeAddress: `Matchningsaktiviteter, der parrer ansigtsudtryk med f\u00f8lelsesord (glad, ked, vred, bange), opbygger f\u00f8lelsesvokabular` },
      { milestone: `Empati og perspektivtagning (f\u00f8rskoleb\u00f8rn begynder at forst\u00e5 andres f\u00f8lelser)`, howWeAddress: `Sorterings- og matchningsaktiviteter med situationsbilleder (barnet tabte sin is \u2192 ked af det) tr\u00e6ner empati` },
      { milestone: `F\u00f8lelsesregulering (b\u00f8rn l\u00e6rer strategier til at h\u00e5ndtere frustrationer)`, howWeAddress: `Tegne-og-farvel\u00e6g-aktiviteter, der visualiserer reguleringsstrategier (tr\u00e6k vejret dybt, t\u00e6l til fem, giv et kram)` },
    ],
    differentiationNotes: `For f\u00f8rskoleb\u00f8rn med behov for st\u00f8tte, start med to kontrast-f\u00f8lelser (glad/ked), brug spejl s\u00e5 barnet kan se sit eget ansigt, og hold aktiviteterne korte med masser af samtale. For avancerede f\u00f8rskoleb\u00f8rn introduc\u00e9r nuancerede f\u00f8lelser (stolt, nervos\u0300, overrasket), diskut\u00e9r komplekse scenarier med blandede f\u00f8lelser, og lad dem tegne egne f\u00f8lelsesansigter.`,
    parentTakeaway: `F\u00f8lelsesforst\u00e5else begynder derhjemme. Navngiv f\u00f8lelser h\u00f8jt i hverdagen: "Jeg kan se, du er frustreret" eller "Du ser rigtig glad ud". L\u00e6s b\u00f8ger om f\u00f8lelser og tal om karakterernes ansigtsudtryk. N\u00e5r barnet er ked af det, hj\u00e6lp med at finde ord for f\u00f8lelsen f\u00f8r l\u00f8sningen. Denne daglige f\u00f8lelsespraksis er den vigtigste investering i barnets trivsel og l\u00e6ringsparathed.`,
    classroomIntegration: `F\u00f8lelsestemaet integreres i f\u00f8rskolens daglige rutiner: i samlingen tales om "hvordan har du det i dag" med f\u00f8lelseskort, ved l\u00e6ringsstationer arbejdes med matchnings- og sorteringsark, ved konflikter bruges f\u00f8lesesordforr\u00e5det fra arbejdsarkene, og i rollelegen \u00f8ves sociale scenarier. F\u00e6lles M\u00e5ls m\u00e5l for trivsel, sociale kompetencer og personlig udvikling er temaets kerne.`,
    assessmentRubric: [
      { skill: `F\u00f8lelsesidentifikation`, emerging: `genkender glad og ked af det med st\u00f8tte`, proficient: `navngiver selvst\u00e6ndigt 4\u20135 grundl\u00e6ggende f\u00f8lelser p\u00e5 ansigter`, advanced: `navngiver nuancerede f\u00f8lelser (nervos\u0300, stolt) og forklarer, hvad der fremkalder dem` },
      { skill: `Empati (situation-f\u00f8lelse matchning)`, emerging: `matcher \u00e9n situation med en f\u00f8lelse med st\u00f8tte`, proficient: `matcher selvst\u00e6ndigt 3\u20134 situationer med passende f\u00f8lelser`, advanced: `forklarer, hvorfor personen f\u00f8ler s\u00e5dan, og foresl\u00e5r hj\u00e6lp` },
      { skill: `F\u00f8lelsesudtryk i tegning`, emerging: `tegner et ansigt med glad/ked mund med st\u00f8tte`, proficient: `tegner selvst\u00e6ndigt ansigter med tydelige f\u00f8lelsesudtryk`, advanced: `tegner kroppe og situationer, der viser f\u00f8lelser, og fort\u00e6ller historien` },
    ],
  },

  'fairy-tales': {
    snippetAnswer: `Eventyr-arbejdsark til f\u00f8rskolen (3\u20134 \u00e5r) bruger prinsesser, drager og troldm\u00e6nd til matchning, sekvensering og farvel\u00e6gning. Den fantastiske verden stimulerer b\u00e5de sprogudvikling og kreativitet. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `Eventyrtemaet er s\u00e6rligt kraftfuldt for f\u00f8rskoleb\u00f8rn, fordi tre- og fire\u00e5rige lever i en verden, hvor fantasi og virkelighed flyder sammen \u2014 de tror p\u00e5 drager, prinsesser og magiske v\u00e6sener, og denne tro g\u00f8r eventyrarbejdsark til den mest opslugende l\u00e6ringsoplevelse. Eventyr giver naturlige muligheder for sekvensering (begyndelse-midte-slutning), ordforr\u00e5dsudvikling (slot, drage, troldstav) og finmotorisk tr\u00e6ning (farvel\u00e6gning af detaljerede eventyrscener). Matchning af eventyrfigurer med deres rekvisitter opbygger logik. H\u00f8jtl\u00e6sning af eventyr efterfulgt af arbejdsark styrker fort\u00e6llekompetence. F\u00e6lles M\u00e5ls m\u00e5l for sprog, fortg\u00e6lling og fantasi underst\u00f8ttes naturligt.`,
    developmentalMilestones: [
      { milestone: `Fort\u00e6llekompetence (3\u20134-\u00e5rige begynder at genfort\u00e6lle enkle historier i r\u00e6kkef\u00f8lge)`, howWeAddress: `Sekvenseringsaktiviteter med eventyrscener (f\u00f8rst, s\u00e5, til sidst) tr\u00e6ner fort\u00e6llestruktur` },
      { milestone: `Fantasileg og symbolsk t\u00e6nkning (b\u00f8rn bruger genstande til at repr\u00e6sentere andre)`, howWeAddress: `Tegne-og-farvel\u00e6g-aktiviteter med eventyrfigurer styrker symbolsk t\u00e6nkning og kreativt udtryk` },
      { milestone: `Ordforr\u00e5dsudvikling (f\u00f8rskoleb\u00f8rn l\u00e6rer nye ord i meningsfulde kontekster)`, howWeAddress: `Matchning og ordaktiviteter med eventyrordforr\u00e5d (slot, krone, drage, skov) udvider ordforr\u00e5det markant` },
    ],
    differentiationNotes: `For f\u00f8rskoleb\u00f8rn med behov for st\u00f8tte, fokus\u00e9r p\u00e5 velkendte eventyr (R\u00f8dh\u00e6tte, De Tre Sm\u00e5 Grise), brug store, enkle illustrationer og begr\u00e6ns sekvensering til to eller tre billeder. For avancerede f\u00f8rskoleb\u00f8rn tilf\u00f8j l\u00e6ngere sekvenser, introduc\u00e9r bogstavsporing af eventyrord og lad dem opfinde egne eventyrslutninger.`,
    parentTakeaway: `Eventyr er det ultimative sprogv\u00e6rkt\u00f8j. L\u00e6s eventyr h\u00f8jt hver aften og lad barnet genfort\u00e6lle med sine egne ord. Sp\u00f8rg "hvad tror du, der sker nu?" og "hvordan f\u00f8ler prinsessen sig?". Leg eventyr sammen med t\u00f8jdyr og udkl\u00e6dningst\u00f8j. Denne daglige fort\u00e6llepraksis opbygger ordforr\u00e5d, fort\u00e6llestruktur og empati \u2014 de vigtigste foruds\u00e6tninger for l\u00e6sning.`,
    classroomIntegration: `Eventyrtemaet er en b\u00e6rende s\u00f8jle i f\u00f8rskolens sprogarbejde: i samlingen l\u00e6ses og genfort\u00e6lles eventyr, ved l\u00e6ringsstationer arbejdes med sekvenseringsark og matchning, i rollelegehj\u00f8rnet opf\u00f8res eventyr med kostumer og rekvisitter, og i kunsthj\u00f8rnet tegnes eventyrfigurer. F\u00e6lles M\u00e5ls m\u00e5l for sproglig udvikling, fort\u00e6llekompetence og fantasi opfyldes.`,
    assessmentRubric: [
      { skill: `Historiesekvensering`, emerging: `ordner 2 eventyrscener i r\u00e6kkef\u00f8lge med st\u00f8tte`, proficient: `ordner selvst\u00e6ndigt 3\u20134 scener og genfort\u00e6ller historien`, advanced: `ordner komplekse sekvenser og tilf\u00f8jer detaljer i genfort\u00e6llingen` },
      { skill: `Eventyrordforr\u00e5d`, emerging: `genkender 2\u20133 eventyrord med billedst\u00f8tte`, proficient: `navngiver selvst\u00e6ndigt 5\u20136 eventyrfigurer og -genstande`, advanced: `bruger eventyrordforr\u00e5d i egne historier og forklarer ordene` },
      { skill: `Kreativt udtryk (eventyrtegning)`, emerging: `farvel\u00e6gger eventyrfigurer med grove str\u00f8g`, proficient: `tegner og farvel\u00e6gger eventyrscener med detaljer`, advanced: `opfinder og tegner egne eventyrfigurer og fort\u00e6ller deres historie` },
    ],
  },

  farm: {
    snippetAnswer: `Bondeg\u00e5rd-arbejdsark til f\u00f8rskolen (3\u20134 \u00e5r) bruger g\u00e5rddyr, traktorer og afgrdo\u00f8der til t\u00e6lling, matchning og farvel\u00e6gning. Den velkendte bondeg\u00e5rdverden skaber et trygt l\u00e6ringsmilj\u00f8. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `Bondeg\u00e5rdstemaet er et af de mest naturlige for f\u00f8rskoleb\u00f8rn i Danmark, fordi tre- og fire\u00e5rige har et t\u00e6t forhold til g\u00e5rddyr gennem bes\u00f8g, billedb\u00f8ger og sange. Ko, gris, h\u00f8ne og hest er blandt de f\u00f8rste dyr, b\u00f8rn l\u00e6rer at genkende og navngive. T\u00e6lling af dyr i en mark giver konkret matematik, matchning af dyr med deres produkter (ko \u2192 m\u00e6lk, h\u00f8ne \u2192 \u00e6g) opbygger logik og hverdagsviden, og farvel\u00e6gning af bondeg\u00e5rdsscener forfiner finmotorik. Sortering af g\u00e5rddyr efter egenskaber styrker kategorisering. F\u00e6lles M\u00e5ls m\u00e5l for naturfagl\u00e6ring og hverdagsforst\u00e5else underst\u00f8ttes direkte.`,
    developmentalMilestones: [
      { milestone: `Dyr-produkt-forbindelser (f\u00f8rskoleb\u00f8rn l\u00e6rer, at g\u00e5rddyr giver os f\u00f8devarer)`, howWeAddress: `Matchningsaktiviteter, der parrer dyr med produkter (ko\u2192m\u00e6lk, h\u00f8ne\u2192\u00e6g), opbygger hverdagsviden og logik` },
      { milestone: `T\u00e6lling af dyr i grupper (opbygning af m\u00e6ngdeforst\u00e5else)`, howWeAddress: `Find-og-t\u00e6l-aktiviteter med g\u00e5rddyr i mark og stald g\u00f8r talforst\u00e5else naturlig og motiverende` },
      { milestone: `Dyrelyde og navngivning (f\u00f8rskoleb\u00f8rn l\u00e6rer at koble dyr med lyde og navne)`, howWeAddress: `Bogstavs- og lydaktiviteter med g\u00e5rddyr, hvor barnet forbinder bogstav med dyrelyd og -navn` },
    ],
    differentiationNotes: `For f\u00f8rskoleb\u00f8rn med behov for st\u00f8tte, fokus\u00e9r p\u00e5 tre eller fire velkendte g\u00e5rddyr (ko, gris, h\u00f8ne), brug plastikdyr som supplement, og hold aktiviteterne korte med masser af lyd og bev\u00e6gelse. For avancerede f\u00f8rskoleb\u00f8rn tilf\u00f8j flere dyr og produkter, introduc\u00e9r bogstavsporing af dyrenavne, og lad dem tegne deres egen bondeg\u00e5rd.`,
    parentTakeaway: `Bondeg\u00e5rden er let tilg\u00e6ngelig for danske familier. Bes\u00f8g en bondeg\u00e5rd og lad barnet fodre dyrene, t\u00e6l dyrene sammen, og tal om, hvad de giver os (m\u00e6lk, \u00e6g, uld). Syng bondeg\u00e5rdssange derhjemme og l\u00e6s bondeg\u00e5rdsb\u00f8ger. Disse virkelige oplevelser g\u00f8r arbejdsarkene mere meningsfulde, fordi barnet kan forbinde papir med virkelighed.`,
    classroomIntegration: `Bondeg\u00e5rdstemaet er et klassisk f\u00f8rskoleemne: i samlingen synges "Mester Jakob" og andre g\u00e5rdsange, ved l\u00e6ringsstationer arbejdes med t\u00e6lle- og matchningsark, i rollelegen drives bondeg\u00e5rd med plastikdyr, og bes\u00f8g p\u00e5 en rigtig bondeg\u00e5rd er h\u00f8jdepunktet. F\u00e6lles M\u00e5ls m\u00e5l for naturfag, sprog og hverdagsforst\u00e5else integreres p\u00e5 tv\u00e6rs af alle aktiviteter.`,
    assessmentRubric: [
      { skill: `G\u00e5rddyr-genkendelse`, emerging: `navngiver 2\u20133 g\u00e5rddyr med voksenst\u00f8tte`, proficient: `navngiver selvst\u00e6ndigt 5\u20136 g\u00e5rddyr og deres lyde`, advanced: `navngiver 8+ g\u00e5rddyr, deres produkter og levesteder` },
      { skill: `Dyr-produkt matchning`, emerging: `matcher \u00e9t dyr med sit produkt med st\u00f8tte (ko\u2192m\u00e6lk)`, proficient: `matcher selvst\u00e6ndigt 3\u20134 dyr med produkter`, advanced: `matcher alle g\u00e5rddyr med produkter og forklarer forbindelsen` },
      { skill: `T\u00e6lling af g\u00e5rddyr`, emerging: `t\u00e6ller 1\u20135 dyr med voksenst\u00f8tte`, proficient: `t\u00e6ller selvst\u00e6ndigt op til 10 dyr i en g\u00e5rdscene`, advanced: `t\u00e6ller over 10 og sorterer dyr i grupper efter egenskab` },
    ],
  },

  flowers: {
    snippetAnswer: `Blomster-arbejdsark til f\u00f8rskolen (3\u20134 \u00e5r) bruger farverige blomsterbilleder til farvel\u00e6gning, m\u00f8nster\u00f8velser og t\u00e6lling. De \u00e6stetiske motiver fascinerer f\u00f8rskoleb\u00f8rn og tr\u00e6ner finmotorik. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `Blomstertemaet er s\u00e6rligt velegnet til f\u00f8rskoleb\u00f8rn, fordi tre- og fire\u00e5rige tiltr\u00e6kkes naturligt af blomsters farver og former \u2014 de plukker maskroser, lugter til roser og giver blomster som gaver. Denne \u00e6stetiske fascination giver en stJ\u00e6rk kreativ ramme for l\u00e6ring. Blomster tilbyder perfekte muligheder for farvegenkendelse (r\u00f8d rose, gul solsikke), m\u00f8nstergenkendelse (kronblade i cirkel, striber p\u00e5 tulipaner) og t\u00e6lling (kronblade, blade, blomster i en buket). Farvel\u00e6gning af blomster forfiner finmotorik med detaljerede konturer. Matchning af blomster med farver styrker visuelt matching. F\u00e6lles M\u00e5ls m\u00e5l for \u00e6stetik, natur og sanseoplevelser m\u00f8des direkte.`,
    developmentalMilestones: [
      { milestone: `Farvegenkendelse i naturen (3\u20134-\u00e5rige l\u00e6rer at navngive farver p\u00e5 naturlige genstande)`, howWeAddress: `Farvesortering med blomster, hvor b\u00f8rn grupperer blomster efter farve, kobler farvevokabular med naturoplevelse` },
      { milestone: `M\u00f8nstergenkendelse i naturlige former (kronblade, blade, stilke)`, howWeAddress: `M\u00f8nsterarbejdsark, der bruger blomstmermotiver til gentagne m\u00f8nstre, introducerer m\u00f8nstertankning` },
      { milestone: `Finmotorisk pr\u00e6cision (b\u00f8rn l\u00e6rer at farvel\u00e6gge inden for detaljerede konturer)`, howWeAddress: `Blomsterfarvel\u00e6gning med kronblade, blade og stilke tr\u00e6ner pr\u00e6cis h\u00e5ndkontrol` },
    ],
    differentiationNotes: `For f\u00f8rskoleb\u00f8rn med behov for st\u00f8tte, fokus\u00e9r p\u00e5 store, enkle blomsterkonturer, begr\u00e6ns farvevalgene, og brug rigtige blomster som supplement til at r\u00f8re og lugte. For avancerede f\u00f8rskoleb\u00f8rn tilf\u00f8j detaljerede blomsterbilleder, introduc\u00e9r t\u00e6lling af kronblade og m\u00f8nsterforts\u00e6ttelse, og lad dem designe egne blomster med m\u00f8nstre.`,
    parentTakeaway: `Blomster er overalt, og det g\u00f8r dem til en gratis l\u00e6ringsressource. Pluk vilde blomster p\u00e5 tur og t\u00e6l kronbladene, tal om farverne og sorter efter st\u00f8rrelse. Plant fr\u00f8 i en potte og f\u00f8lg v\u00e6ksten \u2014 barnet l\u00e6rer om t\u00e5lmodighed, naturvidenskab og ansvar. Pres blomster i en bog og navngiv dem. Denne hverdagsnatur\u00f8velse forl\u00e6nger l\u00e6ringen fra arbejdsarkene.`,
    classroomIntegration: `Blomstertemaet passer perfekt ind i for\u00e5rets f\u00f8rskoleprogram: i samlingen observeres for\u00e5rsblomster, ved l\u00e6ringsstationer arbejdes med farvel\u00e6gnings- og m\u00f8nsterark, i kunsthj\u00f8rnet laves blomstercollager og presseblomster, og p\u00e5 ture plukkes og unders\u00f8ges blomster. Plant fr\u00f8 i vindueskarmen og f\u00f8lg v\u00e6ksten hele for\u00e5ret. F\u00e6lles M\u00e5ls m\u00e5l for natur, \u00e6stetik og naturfag opfyldes.`,
    assessmentRubric: [
      { skill: `Farvegenkendelse (blomster)`, emerging: `navngiver 2\u20133 farver p\u00e5 blomster med st\u00f8tte`, proficient: `navngiver selvst\u00e6ndigt 5\u20136 farver og sorterer blomster derefter`, advanced: `navngiver nuancer og blander farver for at genskabe blomsterns farve` },
      { skill: `M\u00f8nstergenkendelse (kronblade)`, emerging: `genkender \u00e9t simpelt gentagelsesm\u00f8nster med st\u00f8tte`, proficient: `forts\u00e6tter selvst\u00e6ndigt m\u00f8nstre med to elementer`, advanced: `skaber egne m\u00f8nstre med tre eller flere elementer og forklarer logikken` },
      { skill: `Finmotorisk kontrol (blomsterfarvl\u00e6gning)`, emerging: `farvel\u00e6gger store blomsterfelter med grove str\u00f8g`, proficient: `farvel\u00e6gger detaljerede kronblade j\u00e6vnt inden for konturerne`, advanced: `anvender varierede farver og skravering med h\u00f8j pr\u00e6cision` },
    ],
  },

  food: {
    snippetAnswer: `Mad-arbejdsark til f\u00f8rskolen (3\u20134 \u00e5r) bruger frugt, gr\u00f8nsager og m\u00e5ltider til sortering, t\u00e6lling og matchning. Den daglige f\u00f8devareoplevelse giver personlig relevans. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `Madtemaet er et af de mest naturlige for f\u00f8rskoleb\u00f8rn, fordi tre- og fire\u00e5rige m\u00f8der mad flere gange om dagen \u2014 hvert m\u00e5ltid er en potentiel l\u00e6ringssituation. B\u00f8rn i denne alder opbygger f\u00f8devarekendskab, l\u00e6rer at navngive frugt og gr\u00f8nsager, og begynder at forst\u00e5 sundhed. Sortering af f\u00f8devarer efter type (frugt/gr\u00f8nt), farve eller form giver grundl\u00e6ggende kategoriseringsf\u00e6rdigheder. T\u00e6lling af frugt i en sk\u00e5l er konkret og meningsfuld matematik. Matchning af f\u00f8devarer med m\u00e5ltider (frokost/aftensmad) styrker hverdagslogik. F\u00e6lles M\u00e5ls m\u00e5l for sundhed, krop og hverdagsforst\u00e5else underst\u00f8ttes direkte.`,
    developmentalMilestones: [
      { milestone: `F\u00f8devarekategorisering (3\u20134-\u00e5rige l\u00e6rer at sortere f\u00f8devarer i grupper)`, howWeAddress: `Sorteringsaktiviteter, hvor b\u00f8rn grupperer f\u00f8devarer efter type, farve eller m\u00e5ltid, styrker logisk t\u00e6nkning` },
      { milestone: `T\u00e6lling med hverdagsgenstande (frugt, gr\u00f8nsager, br\u00f8dskiver)`, howWeAddress: `T\u00e6lleaktiviteter med f\u00f8devarer g\u00f8r matematik konkret og personligt relevant` },
      { milestone: `St\u00f8rrelsessammenligning (stor/lille, mere/mindre)`, howWeAddress: `Stor-lille-aktiviteter med f\u00f8devarer, hvor b\u00f8rn sammenligner st\u00f8rrelser og m\u00e6ngder` },
    ],
    differentiationNotes: `For f\u00f8rskoleb\u00f8rn med behov for st\u00f8tte, fokus\u00e9r p\u00e5 velkendte f\u00f8devarer (banan, \u00e6ble, br\u00f8d), brug plastikfrugter som supplement, og begr\u00e6ns til \u00e9n sorteringsegenskab ad gangen. For avancerede f\u00f8rskoleb\u00f8rn introduc\u00e9r flere f\u00f8devarekategorier, tilf\u00f8j t\u00e6lling af ingredienser i en opskrift, og lad dem matche f\u00f8devarer med m\u00e5ltider.`,
    parentTakeaway: `Hvert m\u00e5ltid er en l\u00e6ringsstund. Lad barnet hj\u00e6lpe med at t\u00e6lle kartofler, sortere frugt efter farve og v\u00e6lge gr\u00f8nsager i supermarkedet. Tal om, hvad vi spiser: "Er det en frugt eller en gr\u00f8nsag?" Lad barnet hj\u00e6lpe med at forberede madpakken \u2014 det giver b\u00e5de selvst\u00e6ndighed og f\u00f8devarekendskab. Disse daglige \u00f8jeblikke er den bedste forl\u00e6ngelse af arbejdsarkenes sortering og t\u00e6lling.`,
    classroomIntegration: `Madtemaet er v\u00e6vet ind i f\u00f8rskolens m\u00e5ltidsrutine: i samlingen tales om sundhed og f\u00f8devaregrupper, ved l\u00e6ringsstationer arbejdes med sorterings- og t\u00e6lleark, ved frokost navngives f\u00f8devarerne p\u00e5 tallerkenen, og i rollelegen drives legesupermarked. Temauger om "fra jord til bord" integrerer F\u00e6lles M\u00e5ls m\u00e5l for sundhed, naturfag og matematik.`,
    assessmentRubric: [
      { skill: `F\u00f8devarekategorisering`, emerging: `sorterer f\u00f8devarer i to grupper med st\u00f8tte (frugt/ikke-frugt)`, proficient: `sorterer selvst\u00e6ndigt i tre eller fire kategorier (frugt, gr\u00f8nt, br\u00f8d, mejeriprodukter)`, advanced: `sorterer efter flere egenskaber og forklarer sine valg` },
      { skill: `T\u00e6lling af f\u00f8devarer`, emerging: `t\u00e6ller 1\u20135 f\u00f8devarer med pegen og st\u00f8tte`, proficient: `t\u00e6ller selvst\u00e6ndigt op til 10 og matcher med korrekt tal`, advanced: `t\u00e6ller over 10 og sammenligner m\u00e6ngder (flere \u00e6bler end p\u00e6rer)` },
      { skill: `St\u00f8rrelsessammenligning`, emerging: `peger p\u00e5 den store og den lille med st\u00f8tte`, proficient: `sorterer selvst\u00e6ndigt tre genstande fra stor til lille`, advanced: `sammenligner fem eller flere og bruger begreber som st\u00f8rst, mindst, mellemstor` },
    ],
  },

  forest: {
    snippetAnswer: `Skov-arbejdsark til f\u00f8rskolen (3\u20134 \u00e5r) bruger tr\u00e6er, blade og skovdyr til farvel\u00e6gning, t\u00e6lling og matchning. Den danske skovtradition g\u00f8r temaet s\u00e6rligt relevant og sansem\u00e6ttende. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `Skovtemaet har en s\u00e6rlig plads i dansk f\u00f8rskolekultur, fordi mange b\u00f8rnehaver er skovb\u00f8rnehaver eller har ugentlige skovture \u2014 tre- og fire\u00e5rige kender skovens lyde, lugte og materialer fra f\u00f8rsteh\u00e5ndsoplevelser. Denne dybe fortrolighed med skoven g\u00f8r arbejdsarkene ekstra meningsfulde, fordi barnet kan forbinde papir med virkelige oplevelser. T\u00e6lling af kogler, blade og svampe er konkret matematik forankret i naturen. Skyggematchning med tr\u00e6er og dyr styrker visuel skelneevne. Farvel\u00e6gning af skovscener forfiner finmotorik. Matchning af dyr med levesteder opbygger \u00f8kologisk forst\u00e5else. F\u00e6lles M\u00e5ls m\u00e5l for natur, udeliv og sanseoplevelser underst\u00f8ttes direkte.`,
    developmentalMilestones: [
      { milestone: `Naturmaterialegenkendelse (3\u20134-\u00e5rige l\u00e6rer at identificere blade, kogler, bark og svampe)`, howWeAddress: `Matchnings- og sorteringsaktiviteter med skovmaterialer forbinder papir\u00f8velse med virkelige naturoplevelser` },
      { milestone: `T\u00e6lling i naturen (opbygning af m\u00e6ngdeforst\u00e5else med naturlige genstande)`, howWeAddress: `Find-og-t\u00e6l-aktiviteter med skovgenstande g\u00f8r matematik til en del af naturturens oplevelse` },
      { milestone: `Visuel skelneevne (skelne mellem lignende naturformer)`, howWeAddress: `Skyggematchning med skovsilhuetter og skovdyr styrker observation og visuel analyse` },
    ],
    differentiationNotes: `For f\u00f8rskoleb\u00f8rn med behov for st\u00f8tte, fokus\u00e9r p\u00e5 de mest velkendte skovdyr og -materialer (egern, blad, kogle), brug rigtige naturmaterialer som supplement, og hold scenerne enkle. For avancerede f\u00f8rskoleb\u00f8rn tilf\u00f8j flere skovarter, introduc\u00e9r enkel \u00f8kologisk sortering (levende/ikke-levende, plante/dyr) og lad dem tegne deres egen skov.`,
    parentTakeaway: `Skoven er Danmarks gr\u00f8nne klasselokale. Tag barnet med p\u00e5 skovtur og saml blade, kogler og sten. T\u00e6l fundene derhjemme, sorter dem efter st\u00f8rrelse og type, og press bladene. Disse f\u00f8rsteh\u00e5ndsoplevelser g\u00f8r arbejdsarkene langt mere meningsfulde. Lad barnet fort\u00e6lle om, hvad det s\u00e5 i skoven \u2014 det styrker b\u00e5de ordforr\u00e5d og fort\u00e6llekompetence.`,
    classroomIntegration: `Skovtemaet er uadskillelig fra den danske f\u00f8rskoles udend\u00f8rspraksis: p\u00e5 skovture samles naturmaterialer, i samlingen tales om skovens dyr og \u00e5rstider, ved l\u00e6ringsstationer arbejdes med skovtematiske arbejdsark, og i sanserummet udforskes bark, mos og kogler. Ugentlige skovdage giver den virkelighedsforankring, der g\u00f8r arbejdsarkene meningsfulde. F\u00e6lles M\u00e5ls m\u00e5l for natur, udeliv og naturfagl\u00e6ring er skovtemaets kerne.`,
    assessmentRubric: [
      { skill: `Naturmaterialegenkendelse`, emerging: `navngiver 2\u20133 skovgenstande med st\u00f8tte (blad, kogle, pind)`, proficient: `navngiver selvst\u00e6ndigt 5\u20136 naturmaterialer og sorterer dem`, advanced: `navngiver 8+ materialer, forklarer hvor de kommer fra, og sorterer efter flere egenskaber` },
      { skill: `T\u00e6lling i skovscener`, emerging: `t\u00e6ller 1\u20135 skovgenstande med st\u00f8tte`, proficient: `t\u00e6ller selvst\u00e6ndigt op til 10 i en skovscene`, advanced: `t\u00e6ller over 10 og sammenligner m\u00e6ngder (flere blade end svampe)` },
      { skill: `Visuel skelneevne (skovsilhuetter)`, emerging: `matcher 2\u20133 silhuetter med st\u00f8tte`, proficient: `matcher selvst\u00e6ndigt 5\u20136 skovsilhuetter med de rigtige billeder`, advanced: `matcher komplekse silhuetter og beskriver, hvilke tr\u00e6k der afsl\u00f8rer genstanden` },
    ],
  },
};

// Build the insertion text for each theme
function buildInsertionText(data) {
  const lines = [];
  lines.push('');
  lines.push(`      snippetAnswer: '${esc(data.snippetAnswer)}',`);
  lines.push(`      uniqueGradeAngle: '${esc(data.uniqueGradeAngle)}',`);

  // developmentalMilestones
  lines.push('      developmentalMilestones: [');
  for (const m of data.developmentalMilestones) {
    lines.push(`        { milestone: '${esc(m.milestone)}', howWeAddress: '${esc(m.howWeAddress)}' },`);
  }
  lines.push('      ],');

  lines.push(`      differentiationNotes: '${esc(data.differentiationNotes)}',`);
  lines.push(`      parentTakeaway: '${esc(data.parentTakeaway)}',`);
  lines.push(`      classroomIntegration: '${esc(data.classroomIntegration)}',`);

  // assessmentRubric
  lines.push('      assessmentRubric: [');
  for (const r of data.assessmentRubric) {
    lines.push(`        { skill: '${esc(r.skill)}', emerging: '${esc(r.emerging)}', proficient: '${esc(r.proficient)}', advanced: '${esc(r.advanced)}' },`);
  }
  lines.push('      ],');

  return lines.join('\n');
}

function esc(s) {
  return s.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

// Process each theme
let successCount = 0;
let errorCount = 0;
const themes = Object.keys(enrichments);

for (const theme of themes) {
  const filePath = path.join(THEMES_DIR, theme, 'da.ts');
  if (!fs.existsSync(filePath)) {
    console.error(`MISSING: ${filePath}`);
    errorCount++;
    continue;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  // Check if already enriched
  if (content.includes("snippetAnswer:") && content.indexOf("snippetAnswer:") < content.indexOf("'kindergarten'")) {
    // Need to check if snippetAnswer is in the preschool block
    const preschoolIdx = content.indexOf("'preschool'");
    const kindergartenIdx = content.indexOf("'kindergarten'");
    const snippetIdx = content.indexOf("snippetAnswer:");
    if (snippetIdx > preschoolIdx && snippetIdx < kindergartenIdx) {
      console.log(`SKIP (already enriched): ${theme}/da.ts`);
      continue;
    }
  }

  // Find the insertion point: end of faq array in preschool block
  // Pattern: the faq closing "],\n    }," before 'kindergarten'
  const preschoolIdx = content.indexOf("'preschool'");
  const kindergartenIdx = content.indexOf("'kindergarten'");

  if (preschoolIdx === -1 || kindergartenIdx === -1) {
    console.error(`MISSING GRADE BLOCKS: ${theme}/da.ts`);
    errorCount++;
    continue;
  }

  const preschoolBlock = content.substring(preschoolIdx, kindergartenIdx);

  // Find the last "],\n" in the preschool block (end of faq array)
  const faqEndPattern = /\],\n/g;
  let lastMatch = null;
  let match;
  while ((match = faqEndPattern.exec(preschoolBlock)) !== null) {
    lastMatch = match;
  }

  if (!lastMatch) {
    console.error(`NO FAQ END FOUND: ${theme}/da.ts`);
    errorCount++;
    continue;
  }

  // Calculate absolute position
  const insertPos = preschoolIdx + lastMatch.index + lastMatch[0].length;

  const insertionText = buildInsertionText(enrichments[theme]);

  content = content.substring(0, insertPos) + insertionText + '\n' + content.substring(insertPos);

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`OK: ${theme}/da.ts`);
  successCount++;
}

console.log(`\nDone: ${successCount} enriched, ${errorCount} errors, ${themes.length - successCount - errorCount} skipped`);
