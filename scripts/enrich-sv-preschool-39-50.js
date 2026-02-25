#!/usr/bin/env node
/**
 * SEO Part 288: SV Preschool Grade Enrichment — Themes 39-50
 *
 * Adds 10 enrichment fields (seoTitle, seoDescription, seoKeywords,
 * snippetAnswer, uniqueGradeAngle, developmentalMilestones,
 * differentiationNotes, parentTakeaway, classroomIntegration, assessmentRubric)
 * to the preschool grade block of 12 SV theme files (sports through zoo).
 */

const fs = require('fs');
const path = require('path');

const THEMES_DIR = path.join(__dirname, '..', 'frontend', 'content', 'themes');

const enrichments = {
  sports: {
    seoTitle: 'Gratis Sport\u00f6vningar F\u00f6rskola | LessonCraftStudio',
    seoDescription: 'Utskrivbara sport\u00f6vningar f\u00f6r f\u00f6rskolebarn (3\u20134 \u00e5r). R\u00e4kning, matchning och f\u00e4rgl\u00e4ggning med sporttema. 33 generatorer. Gratis PDF. V\u00e4lj tema och skriv ut.',
    seoKeywords: 'sport\u00f6vningar f\u00f6rskola, idrott arbetsblad barn, r\u00e4kna sportf\u00f6rem\u00e5l, finmotorik \u00f6vning, f\u00e4rgl\u00e4ggning sport, bollar r\u00e4kning, r\u00f6relse f\u00f6rskola, matchning sport, grovmotorik, visuell diskriminering',
    snippetAnswer: 'Sport\u00f6vningar f\u00f6r f\u00f6rskolan (3\u20134 \u00e5r) anv\u00e4nder bollar, hopprep och racketar f\u00f6r r\u00e4kning, matchning och f\u00e4rgl\u00e4ggning som st\u00e4rker finmotorik och tidig talf\u00f6rst\u00e5else. R\u00f6relsegl\u00e4djen driver stark motivation. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Sporttemat \u00e4r ovanligt kraftfullt f\u00f6r f\u00f6rskolebarn, eftersom tre- och fyra\u00e5ringar upplever sport som ren r\u00f6relsegl\u00e4dje \u2014 springa, hoppa, kasta och f\u00e5nga utan regler eller po\u00e4ngr\u00e4kning. Denna kroppsliga erfarenhet g\u00f6r sportarbetsblad till en naturlig bro mellan fysisk lek och akademiskt l\u00e4rande. R\u00e4kning av bollar p\u00e5 en plan bygger en-till-en-korrespondens, matchning av idrottare med r\u00e4tt utrustning tr\u00e4nar kategorisering, och f\u00e4rgl\u00e4ggning av sportscener utvecklar finmotorik. Skuggmatchning med sportsiluetter sk\u00e4rper visuell diskriminering. Lpf\u00f6 18 betonar r\u00f6relse och h\u00e4lsa, och sporttemat uppfyller detta n\u00e4r barnet f\u00f6rbinder sin kroppsliga lek med strukturerade \u00f6vningar.',
    developmentalMilestones: [
      { milestone: 'Grovmotorisk koordination (3\u20134-\u00e5ringar utvecklar springa, hoppa, kasta)', howWeAddress: 'Sportarbetsblad l\u00e5ter barnet k\u00e4nna igen r\u00f6relser p\u00e5 papper som det k\u00e4nner i kroppen, vilket st\u00e4rker kopplingen mellan fysisk upplevelse och symbol' },
      { milestone: 'En-till-en-korrespondens vid r\u00e4kning (f\u00f6rskolebarn r\u00e4knar konkreta f\u00f6rem\u00e5l)', howWeAddress: 'R\u00e4kneaktiviteter med bollar, racketar och hopprep ger motiverande material f\u00f6r exakt r\u00e4kning upp till 10' },
      { milestone: 'Kategoriskt t\u00e4nkande (barn b\u00f6rjar sortera f\u00f6rem\u00e5l efter egenskap)', howWeAddress: 'Matchning av idrottare med r\u00e4tt utrustning och sortering av bollar efter storlek eller f\u00e4rg bygger klassificeringsf\u00f6rm\u00e5ga' },
      { milestone: 'Finmotorisk kontroll (fr\u00e5n grov till mer kontrollerad pennanv\u00e4ndning)', howWeAddress: 'F\u00e4rgl\u00e4ggning av sportscener med b\u00f6jda konturer (bollar, racketar) tr\u00e4nar handledskonroll och grepputveckling' },
    ],
    differentiationNotes: 'F\u00f6r f\u00f6rskolebarn som beh\u00f6ver st\u00f6d, begr\u00e4nsa till tre eller fyra v\u00e4lk\u00e4nda sportf\u00f6rem\u00e5l (boll, hopprep, m\u00e5l), anv\u00e4nd riktiga bollar som komplement till arbetsbladen, och fokusera p\u00e5 enkel r\u00e4kning. F\u00f6r avancerade f\u00f6rskolebarn ut\u00f6ka med fler sporter, introducera enkel po\u00e4ngr\u00e4kning och l\u00e5t barnen rita sin favoritsport.',
    parentTakeaway: 'Sport \u00e4r det enklaste temat att koppla till vardagen f\u00f6r aktiva f\u00f6rskolebarn. R\u00e4kna bollkast p\u00e5 g\u00e5rden, sortera sportredskap efter storlek hemma, och prata om vilka sporter barnet har sett eller provat. L\u00e5t barnet agera ut sporten p\u00e5 arbetsbladet efter varje \u00f6vning \u2014 kopplingen mellan kropp och papper f\u00f6rdjupar l\u00e4randet markant.',
    classroomIntegration: 'Sporttemat integreras naturligt i f\u00f6rskolans r\u00f6relsepass: i samlingen diskuteras veckans sport med bilder, vid l\u00e4rstationer arbetas med sportarbetsblad, i gymnastiksalen \u00f6vas den aktuella sporten, och p\u00e5 uteg\u00e5rden leks med bollar och hopprep. Denna v\u00e4xling mellan r\u00f6relse och pappersarbete st\u00f6djer Lpf\u00f6 18:s m\u00e5l f\u00f6r h\u00e4lsa, r\u00f6relse och skapande.',
    assessmentRubric: [
      { skill: 'R\u00e4kning av sportf\u00f6rem\u00e5l', emerging: 'r\u00e4knar 1\u20135 bollar med pekning och vuxenst\u00f6d', proficient: 'r\u00e4knar sj\u00e4lvst\u00e4ndigt upp till 10 sportf\u00f6rem\u00e5l och matchar med siffra', advanced: 'r\u00e4knar \u00f6ver 10 och j\u00e4mf\u00f6r m\u00e4ngder (fler bollar \u00e4n racketar)' },
      { skill: 'Matchning av idrottare och utrustning', emerging: 'matchar 2\u20133 idrottare med utrustning med vuxenst\u00f6d', proficient: 'matchar sj\u00e4lvst\u00e4ndigt 5\u20136 sport-utrustningspar korrekt', advanced: 'matchar alla par och f\u00f6rklarar varf\u00f6r varje utrustning h\u00f6r till sporten' },
      { skill: 'Finmotorisk kontroll (sportf\u00e4rgl\u00e4ggning)', emerging: 'f\u00e4rgl\u00e4gger med breda str\u00e4ck, delvis utanf\u00f6r konturerna', proficient: 'f\u00e4rgl\u00e4gger inom konturerna med l\u00e4mpliga f\u00e4rger', advanced: 'anv\u00e4nder detaljer och varierade f\u00e4rger i sportscenerna' },
    ],
  },

  spring: {
    seoTitle: 'Gratis V\u00e5r\u00f6vningar F\u00f6rskola | LessonCraftStudio',
    seoDescription: 'Utskrivbara v\u00e5r\u00f6vningar f\u00f6r f\u00f6rskolebarn (3\u20134 \u00e5r). Blommor, fj\u00e4rilar och regndroppar f\u00f6r r\u00e4kning och f\u00e4rgl\u00e4ggning. 33 generatorer. Gratis PDF. Skriv ut direkt.',
    seoKeywords: 'v\u00e5r\u00f6vningar f\u00f6rskola, v\u00e5rtema arbetsblad barn, blommor f\u00e4rgl\u00e4ggning, r\u00e4kna fj\u00e4rilar, finmotorik \u00f6vning, v\u00e5rtecken barn, regndroppar r\u00e4kning, naturkunskap v\u00e5r, s\u00e4songsaktiviteter f\u00f6rskola, v\u00e5rblommor',
    snippetAnswer: 'V\u00e5r\u00f6vningar f\u00f6r f\u00f6rskolan (3\u20134 \u00e5r) anv\u00e4nder blommor, fj\u00e4rilar och regndroppar f\u00f6r r\u00e4kning, matchning och f\u00e4rgl\u00e4ggning som st\u00e4rker finmotorik och naturf\u00f6rst\u00e5else. V\u00e5rens f\u00f6rvandling driver barnens nyfikenhet. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'V\u00e5rtemat \u00e4r s\u00e4rskilt magiskt f\u00f6r f\u00f6rskolebarn, eftersom tre- och fyra\u00e5ringar upplever v\u00e5rens f\u00f6rvandling med alla sinnen \u2014 sn\u00f6n sm\u00e4lter, blommor spirar, fj\u00e4rilar dyker upp och dagarna blir l\u00e4ngre. Denna dramatiska f\u00f6r\u00e4ndring v\u00e4cker en naturlig nyfikenhet som arbetsblad kan kanalisera. R\u00e4kning av blommor och fj\u00e4rilar bygger en-till-en-korrespondens, sekvensering fr\u00e5n knopp till blomma introducerar logiskt t\u00e4nkande, och f\u00e4rgl\u00e4ggning av v\u00e5rscener tr\u00e4nar finmotorik med ljusa f\u00e4rger. Matchning av v\u00e5rtecken st\u00e4rker kategorisering. Lpf\u00f6 18 betonar natur och milj\u00f6, och v\u00e5rtemat \u00e4r den mest levande ing\u00e5ngen till dessa m\u00e5l.',
    developmentalMilestones: [
      { milestone: 'Sekvensf\u00f6rst\u00e5else (3\u20134-\u00e5ringar b\u00f6rjar f\u00f6rst\u00e5 f\u00f6re/efter och f\u00f6rvandlingar)', howWeAddress: 'Sekvensaktiviteter fr\u00e5n knopp till blomma och fr\u00e5n larv till fj\u00e4ril introducerar naturvetenskapligt och logiskt t\u00e4nkande' },
      { milestone: 'F\u00e4rgidentifiering (barn l\u00e4r sig namnge och sortera f\u00e4rger)', howWeAddress: 'Sortering av v\u00e5rblommor efter f\u00e4rg st\u00e4rker f\u00e4rgigenk\u00e4nning med naturens egen palett' },
      { milestone: 'R\u00e4kning av naturf\u00f6rem\u00e5l i scener', howWeAddress: 'Hitta-och-r\u00e4kna-aktiviteter med blommor, fj\u00e4rilar och regndroppar g\u00f6r r\u00e4kning naturlig och s\u00e4songsaktuell' },
      { milestone: 'Finmotorisk precision (detaljerade naturmotiv)', howWeAddress: 'F\u00e4rgl\u00e4ggning av v\u00e5rblommor med sm\u00e5 kronblad och fj\u00e4rilsvingar tr\u00e4nar finmotorisk precision' },
    ],
    differentiationNotes: 'F\u00f6r f\u00f6rskolebarn som beh\u00f6ver st\u00f6d, begr\u00e4nsa till tre v\u00e4lk\u00e4nda v\u00e5rtecken (blomma, fj\u00e4ril, sol), anv\u00e4nd riktiga blommor och maskrosor som komplement, och fokusera p\u00e5 enkel r\u00e4kning. F\u00f6r avancerade f\u00f6rskolebarn introducera fj\u00e4rilens livscykel, l\u00e4gg till bokstavssp\u00e5rning av v\u00e5rord och utmana med sortering efter tv\u00e5 attribut.',
    parentTakeaway: 'V\u00e5ren erbjuder dagliga l\u00e4randetillf\u00e4llen utomhus. R\u00e4kna blommor p\u00e5 promenader, observera fj\u00e4rilar i tr\u00e4dg\u00e5rden och prata om vad som h\u00e4nder n\u00e4r sn\u00f6n sm\u00e4lter. Plantera fr\u00f6n i en kruka och l\u00e5t barnet dokumentera tillv\u00e4xten dagligen. V\u00e5rvandringen \u00e4r den b\u00e4sta l\u00e4raktiviteten \u2014 koppla den till arbetsbladen f\u00f6r f\u00f6rdjupat l\u00e4rande.',
    classroomIntegration: 'V\u00e5rtemat genomsyrar f\u00f6rskolans verksamhet under mars\u2013maj: i samlingen diskuteras v\u00e5rtecken som hittats p\u00e5 utflykter, vid l\u00e4rstationer arbetas med v\u00e5rarbetsblad, i naturh\u00f6rnan observeras fr\u00f6n som gror, och p\u00e5 g\u00e5rden letas det efter insekter och blommor. Lpf\u00f6 18:s m\u00e5l f\u00f6r natur, h\u00e5llbar utveckling och skapande uppfylls genom v\u00e5rtemats levande kopplingar.',
    assessmentRubric: [
      { skill: 'V\u00e5rtecken och sekvenser', emerging: 'k\u00e4nner igen 2\u20133 v\u00e5rtecken med vuxenst\u00f6d', proficient: 'ordnar sj\u00e4lvst\u00e4ndigt 3\u20134 v\u00e5rsekvenser (knopp\u2013blomma, larv\u2013fj\u00e4ril)', advanced: 'f\u00f6rklarar hela f\u00f6rvandlingsprocessen och hittar egna v\u00e5rtecken' },
      { skill: 'R\u00e4kning av v\u00e5rf\u00f6rem\u00e5l', emerging: 'r\u00e4knar 1\u20135 blommor/fj\u00e4rilar med st\u00f6d', proficient: 'r\u00e4knar sj\u00e4lvst\u00e4ndigt upp till 10 och matchar med siffra', advanced: 'r\u00e4knar \u00f6ver 10 och j\u00e4mf\u00f6r m\u00e4ngder av olika v\u00e5rf\u00f6rem\u00e5l' },
      { skill: 'F\u00e4rgsortering (v\u00e5rblommor)', emerging: 'sorterar blommor i tv\u00e5 f\u00e4rggrupper med st\u00f6d', proficient: 'sorterar sj\u00e4lvst\u00e4ndigt efter f\u00e4rg och storlek', advanced: 'skapar egna sorteringskriterier och namnger v\u00e5rblommor' },
    ],
  },

  summer: {
    seoTitle: 'Gratis Sommar\u00f6vningar F\u00f6rskola | LessonCraftStudio',
    seoDescription: 'Utskrivbara sommar\u00f6vningar f\u00f6r f\u00f6rskolebarn (3\u20134 \u00e5r). Glass, sol och strandlek f\u00f6r r\u00e4kning och f\u00e4rgl\u00e4ggning. 33 generatorer. Gratis PDF. V\u00e4lj tema och skriv ut.',
    seoKeywords: 'sommar\u00f6vningar f\u00f6rskola, sommar arbetsblad barn, glass r\u00e4kning, strandf\u00e4rgl\u00e4ggning, finmotorik \u00f6vning, sol och bad, s\u00e4songsaktiviteter, sommartema barn, vattenlek, sommarlov f\u00f6rskola',
    snippetAnswer: 'Sommar\u00f6vningar f\u00f6r f\u00f6rskolan (3\u20134 \u00e5r) anv\u00e4nder glass, solbilder och strandscener f\u00f6r r\u00e4kning, matchning och f\u00e4rgl\u00e4ggning som st\u00e4rker finmotorik och tidig matematik. Sommarens gl\u00e4dje driver motivationen. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Sommartemat \u00e4r oemotst\u00e5ndligt f\u00f6r f\u00f6rskolebarn, eftersom tre- och fyra\u00e5ringar f\u00f6rknippar sommaren med frihet, vattenlek, glass och l\u00e5nga dagar utomhus. Denna k\u00e4nslom\u00e4ssiga koppling till sommargl\u00e4dje g\u00f6r sommarbetsblad till ett perfekt verktyg f\u00f6r att h\u00e5lla l\u00e4randet levande under semestern. R\u00e4kning av glassar och sn\u00e4ckor bygger en-till-en-korrespondens, storleksj\u00e4mf\u00f6relse av sandslott tr\u00e4nar matematiskt t\u00e4nkande, och f\u00e4rgl\u00e4ggning av strandscener utvecklar finmotorik med varma f\u00e4rger. Matchning av sommaraktiviteter med utrustning st\u00e4rker kategorisering. Lpf\u00f6 18:s m\u00e5l f\u00f6r natur och h\u00e4lsa uppfylls n\u00e4r barnet utforskar sommaren b\u00e5de p\u00e5 papper och utomhus.',
    developmentalMilestones: [
      { milestone: 'Sensorisk utforskning (3\u20134-\u00e5ringar upplever v\u00e4rlden genom alla sinnen)', howWeAddress: 'Sommararbetsblad kopplar till verkliga sinnesupplevelser: sand, vatten, sol, glass, vilket f\u00f6rdjupar l\u00e4randet' },
      { milestone: 'Storleksj\u00e4mf\u00f6relse (stor/liten/mittemellan)', howWeAddress: 'Storleksj\u00e4mf\u00f6relseaktiviteter med sandslott, glassar och badbollar bygger matematiskt j\u00e4mf\u00f6relsebegrepp' },
      { milestone: 'R\u00e4kning av samlingsobjekt (sn\u00e4ckor, stenar, glassar)', howWeAddress: 'R\u00e4kneaktiviteter med sommarsamlingsf\u00f6rem\u00e5l ger naturlig matematik i en lustfylld kontext' },
      { milestone: 'Finmotorisk utveckling (f\u00e4rgl\u00e4ggning av varierade former)', howWeAddress: 'F\u00e4rgl\u00e4ggning av strandscener med v\u00e5gor, sol och sn\u00e4ckor tr\u00e4nar precision med varierade konturer' },
    ],
    differentiationNotes: 'F\u00f6r f\u00f6rskolebarn som beh\u00f6ver st\u00f6d, fokusera p\u00e5 tre eller fyra sommarbilder (glass, sol, boll), anv\u00e4nd riktiga sn\u00e4ckor och sand som sensoriskt komplement, och h\u00e5ll aktiviteterna korta. F\u00f6r avancerade f\u00f6rskolebarn l\u00e4gg till m\u00f6nster-forts\u00e4tt med sommarbilder, r\u00e4kning \u00f6ver 10, och bokstavssp\u00e5rning av sommarord.',
    parentTakeaway: 'Sommaren \u00e4r full av naturliga l\u00e4randetillf\u00e4llen. R\u00e4kna sn\u00e4ckor p\u00e5 stranden, sortera stenar efter storlek, och r\u00e4kna glassar p\u00e5 semestern. Vattenlek med m\u00e4tkoppar introducerar volymbegrepp. L\u00e5t barnet \u00e5terskapa strandscenerna fr\u00e5n arbetsbladen i sandl\u00e5dan \u2014 det \u00e4r f\u00f6rdjupat l\u00e4rande p\u00e5 sommars\u00e4tt.',
    classroomIntegration: 'Sommartemat fungerar b\u00e5de p\u00e5 f\u00f6rskolan och under sommarlovsaktiviteter: i samlingen diskuteras sommarupplevelser, vid l\u00e4rstationer arbetas med sommararbetsblad, i vattenbordet leks med m\u00e4tkoppar och b\u00e5tar, och p\u00e5 g\u00e5rden leks med sand och vatten. Lpf\u00f6 18:s m\u00e5l f\u00f6r natur, h\u00e4lsa och skapande uppfylls genom sommartemats levande karakt\u00e4r.',
    assessmentRubric: [
      { skill: 'R\u00e4kning av sommarsamlingsf\u00f6rem\u00e5l', emerging: 'r\u00e4knar 1\u20135 sn\u00e4ckor/glassar med vuxenst\u00f6d', proficient: 'r\u00e4knar sj\u00e4lvst\u00e4ndigt upp till 10 och matchar med siffra', advanced: 'r\u00e4knar \u00f6ver 10 och j\u00e4mf\u00f6r m\u00e4ngder av olika sommarsamlingar' },
      { skill: 'Storleksj\u00e4mf\u00f6relse (sommarkontext)', emerging: 'identifierar stor och liten med vuxenst\u00f6d', proficient: 'ordnar sj\u00e4lvst\u00e4ndigt 3\u20134 sommarbilder efter storlek', advanced: 'serierar fem eller fler f\u00f6rem\u00e5l och anv\u00e4nder j\u00e4mf\u00f6relseord' },
      { skill: 'Finmotorisk kontroll (sommarscener)', emerging: 'f\u00e4rgl\u00e4gger med breda str\u00e4ck, delvis utanf\u00f6r konturerna', proficient: 'f\u00e4rgl\u00e4gger inom konturerna med l\u00e4mpliga sommarf\u00e4rger', advanced: 'anv\u00e4nder detaljer och nyanser i strandscener' },
    ],
  },

  superheroes: {
    seoTitle: 'Gratis Superhj\u00e4lte\u00f6vningar F\u00f6rskola | LessonCraftStudio',
    seoDescription: 'Utskrivbara superhj\u00e4lte\u00f6vningar f\u00f6r f\u00f6rskolebarn (3\u20134 \u00e5r). R\u00e4kning, matchning och f\u00e4rgl\u00e4ggning med superhj\u00e4ltar. 33 generatorer. Gratis PDF. Skriv ut direkt.',
    seoKeywords: 'superhj\u00e4lte\u00f6vningar f\u00f6rskola, superhj\u00e4ltar arbetsblad barn, f\u00e4rgl\u00e4ggning superhj\u00e4ltar, r\u00e4kna superhj\u00e4ltar, finmotorik \u00f6vning, skuggmatchning, fantasilek f\u00f6rskola, maskerade hj\u00e4ltar, visuell diskriminering, hj\u00e4ltekraft',
    snippetAnswer: 'Superhj\u00e4lte\u00f6vningar f\u00f6r f\u00f6rskolan (3\u20134 \u00e5r) anv\u00e4nder mantlar, masker och superkrafter f\u00f6r r\u00e4kning, matchning och f\u00e4rgl\u00e4ggning som st\u00e4rker finmotorik och fantasif\u00f6rm\u00e5ga. Barnens superhj\u00e4ltedyr kan driver stark motivation. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Superhj\u00e4ltetemat \u00e4r unikt kraftfullt f\u00f6r f\u00f6rskolebarn, eftersom tre- och fyra\u00e5ringar befinner sig mitt i fantasilekens blomstring och identifierar sig starkt med hj\u00e4ltefigurer som \u00e4r starka, modiga och hj\u00e4lpsamma. Denna k\u00e4nslom\u00e4ssiga koppling g\u00f6r att barnen investerar mer i arbetsbladen \u00e4n vid neutrala teman. R\u00e4kning av superhj\u00e4ltar och deras utrustning bygger en-till-en-korrespondens, matchning av hj\u00e4ltar med mantlar och masker tr\u00e4nar kategorisering, och f\u00e4rgl\u00e4ggning av dynamiska hj\u00e4lteposer utvecklar finmotorik. Skuggmatchning med superhj\u00e4ltesiluetter sk\u00e4rper visuell diskriminering. Lpf\u00f6 18:s m\u00e5l f\u00f6r fantasi, kreativitet och identitet st\u00f6ds n\u00e4r barnet utforskar hj\u00e4lterollen genom strukturerade \u00f6vningar.',
    developmentalMilestones: [
      { milestone: 'Fantasilek och rolltagande (3\u20134-\u00e5ringar identifierar sig med hj\u00e4ltefigurer)', howWeAddress: 'Superhj\u00e4ltearbetsblad utnyttjar barnets hj\u00e4lteidentifikation f\u00f6r att driva motivation och uth\u00e5llighet vid uppgifter' },
      { milestone: 'En-till-en-korrespondens (r\u00e4kning av tematiska f\u00f6rem\u00e5l)', howWeAddress: 'R\u00e4kneaktiviteter med superhj\u00e4ltar, mantlar och stj\u00e4rnor ger emotionellt laddad matematik' },
      { milestone: 'Visuell diskriminering (matcha siluetter och former)', howWeAddress: 'Skuggmatchning med superhj\u00e4ltesiluetter i olika poser sk\u00e4rper observationsf\u00f6rm\u00e5gan' },
      { milestone: 'Finmotorisk kontroll (f\u00e4rgl\u00e4ggning av dynamiska figurer)', howWeAddress: 'F\u00e4rgl\u00e4ggning av superhj\u00e4ltar med mantlar och masker tr\u00e4nar precision med varierade former' },
    ],
    differentiationNotes: 'F\u00f6r f\u00f6rskolebarn som beh\u00f6ver st\u00f6d, anv\u00e4nd enkla superhj\u00e4ltebilder med tjocka konturer, begr\u00e4nsa antalet element och l\u00e5t barnet b\u00e4ra en enkel mantel under arbetet f\u00f6r extra motivation. F\u00f6r avancerade f\u00f6rskolebarn l\u00e4gg till uppdragsbaserade aktiviteter (hj\u00e4lp hj\u00e4lten hitta r\u00e4tt antal stj\u00e4rnor), bokstavssp\u00e5rning av kraftord och mer komplexa matchningar.',
    parentTakeaway: 'Superhj\u00e4ltar \u00e4r ett fantastiskt tema f\u00f6r att motivera motvilliga f\u00f6rskolebarn. G\u00f6r en superhj\u00e4ltemantel av en gammal handduk och l\u00e5t barnet vara en \u201cmattehjälte\u201d som l\u00f6ser uppdrag (arbetsblad). R\u00e4kna superhj\u00e4ltef\u00f6rem\u00e5l hemma, hitta hj\u00e4ltar i bilderb\u00f6cker och prata om vad som g\u00f6r n\u00e5gon till en riktig hj\u00e4lte \u2014 att vara snäll och hj\u00e4lpsam.',
    classroomIntegration: 'Superhj\u00e4ltetemat fungerar utmärkt som temavecka: i samlingen introduceras veckans superhj\u00e4lteuppdrag, vid l\u00e4rstationer arbetas med superhj\u00e4ltearbetsblad, i dockvrån leks hj\u00e4lteroller med mantlar och masker, och som avslutning delas \u201chj\u00e4ltediplom\u201d ut. Lpf\u00f6 18:s m\u00e5l f\u00f6r identitet, fantasi och socialt samspel uppfylls n\u00e4r barnet l\u00e4r sig att vara en hj\u00e4lte \u00e4r att hj\u00e4lpa andra.',
    assessmentRubric: [
      { skill: 'R\u00e4kning med superhj\u00e4ltetema', emerging: 'r\u00e4knar 1\u20135 hj\u00e4ltar/stj\u00e4rnor med vuxenst\u00f6d', proficient: 'r\u00e4knar sj\u00e4lvst\u00e4ndigt upp till 10 tematiska element', advanced: 'r\u00e4knar \u00f6ver 10 och l\u00f6ser enkla uppdragsbaserade r\u00e4kneuppgifter' },
      { skill: 'Skuggmatchning (superhj\u00e4ltesiluetter)', emerging: 'matchar 2\u20133 siluetter med vuxenst\u00f6d', proficient: 'matchar sj\u00e4lvst\u00e4ndigt 5\u20136 superhj\u00e4ltesiluetter korrekt', advanced: 'matchar komplexa poser och beskriver vilka drag som avsl\u00f6jar hj\u00e4lten' },
      { skill: 'Finmotorisk kontroll (superhj\u00e4ltef\u00e4rgl\u00e4ggning)', emerging: 'f\u00e4rgl\u00e4gger superhj\u00e4ltar med breda str\u00e4ck', proficient: 'f\u00e4rgl\u00e4gger inom konturerna med varierade f\u00e4rger', advanced: 'l\u00e4gger till detaljer som m\u00f6nster p\u00e5 mantlar och emblem' },
    ],
  },

  toys: {
    seoTitle: 'Gratis Leksaks\u00f6vningar F\u00f6rskola | LessonCraftStudio',
    seoDescription: 'Utskrivbara leksaks\u00f6vningar f\u00f6r f\u00f6rskolebarn (3\u20134 \u00e5r). R\u00e4kning, sortering och f\u00e4rgl\u00e4ggning med leksakstema. 33 generatorer. Gratis PDF. V\u00e4lj tema och skriv ut.',
    seoKeywords: 'leksaks\u00f6vningar f\u00f6rskola, leksaker arbetsblad barn, r\u00e4kna leksaker, finmotorik \u00f6vning, sortering leksaker, f\u00e4rgl\u00e4ggning leksaker, nalle matchning, klossar r\u00e4kning, bildsortering, leksaksbutik',
    snippetAnswer: 'Leksaks\u00f6vningar f\u00f6r f\u00f6rskolan (3\u20134 \u00e5r) anv\u00e4nder nallar, klossar och dockor f\u00f6r r\u00e4kning, sortering och f\u00e4rgl\u00e4ggning som st\u00e4rker finmotorik och kategoriseringsf\u00f6rm\u00e5ga. Barnens egna leksaksv\u00e4rld driver motivationen. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Leksakstemat \u00e4r det mest personligt relatabla f\u00f6r f\u00f6rskolebarn, eftersom tre- och fyra\u00e5ringar har en djup k\u00e4nslom\u00e4ssig koppling till sina egna leksaker \u2014 nallebjörnen, favoritdockan, klossarna och bilarna \u00e4r fasta f\u00f6ljeslagare i vardagen. Denna f\u00f6rtrogenhet g\u00f6r leksaksarbetsblad till en naturlig f\u00f6rl\u00e4ngning av barnets lek. R\u00e4kning av klossar och bilar bygger en-till-en-korrespondens, sortering av leksaker efter typ eller storlek st\u00e4rker kategoriskt t\u00e4nkande, och f\u00e4rgl\u00e4ggning av leksaksmotiv utvecklar finmotorik. Matchning av leksaker med r\u00e4tt f\u00f6rvaringsl\u00e5da introducerar tidig klassificering. Lpf\u00f6 18:s m\u00e5l f\u00f6r lek, kreativitet och sj\u00e4lvst\u00e4ndighet st\u00f6ds n\u00e4r barnet utforskar sin leksaksv\u00e4rld genom strukturerade \u00f6vningar.',
    developmentalMilestones: [
      { milestone: 'Sortering och kategorisering (3\u20134-\u00e5ringar b\u00f6rjar gruppera f\u00f6rem\u00e5l efter typ)', howWeAddress: 'Sorteringsaktiviteter d\u00e4r barn grupperar leksaker efter typ (bilar, dockor, klossar) eller f\u00e4rg st\u00e4rker logiskt t\u00e4nkande' },
      { milestone: 'R\u00e4kning med personligt meningsfulla f\u00f6rem\u00e5l', howWeAddress: 'R\u00e4kneaktiviteter med barnets egna leksakstyper ger k\u00e4nslom\u00e4ssigt engagerad matematik' },
      { milestone: 'Symboliskt t\u00e4nkande (barn f\u00f6rst\u00e5r att bilder representerar saker)', howWeAddress: 'Matchning mellan bilder av leksaker och riktiga leksaker st\u00e4rker kopplingen mellan symbol och verklighet' },
      { milestone: 'Finmotorisk kontroll (f\u00e4rgl\u00e4ggning av v\u00e4lk\u00e4nda former)', howWeAddress: 'F\u00e4rgl\u00e4ggning av nallar, bilar och klossar med k\u00e4nda konturer ger tryggt finmotorik\u00f6vande' },
    ],
    differentiationNotes: 'F\u00f6r f\u00f6rskolebarn som beh\u00f6ver st\u00f6d, begr\u00e4nsa till tre eller fyra v\u00e4lk\u00e4nda leksaker (nalle, bil, kloss), anv\u00e4nd riktiga leksaker som komplement, och fokusera p\u00e5 enkel r\u00e4kning. F\u00f6r avancerade f\u00f6rskolebarn ut\u00f6ka med fler leksakstyper, introducera sortering efter tv\u00e5 attribut och l\u00e5t barnet skapa en \u201cleksaksbutik\u201d med prislappar.',
    parentTakeaway: 'Leksaksl\u00e5dan \u00e4r det enklaste l\u00e4randematerialet hemma. R\u00e4kna nallar, sortera bilar efter f\u00e4rg, och g\u00f6r st\u00e4dningen till en kategoriserings\u00f6vning (klossar i den bl\u00e5 l\u00e5dan, dockor i den r\u00f6da). L\u00e5t barnet rita sina favoritleksaker och ber\u00e4tta om dem \u2014 kopplingen mellan den konkreta leksaken och bilden p\u00e5 papperet bygger symboliskt t\u00e4nkande.',
    classroomIntegration: 'Leksakstemat integreras naturligt i f\u00f6rskolans lekstationer: i samlingen ber\u00e4ttar varje barn om en favoritloksak, vid l\u00e4rstationer arbetas med leksaksarbetsblad, i dockvrån leks rollspel med leksaker, och st\u00e4dningen blir en sorteringsaktivitet. Lpf\u00f6 18:s m\u00e5l f\u00f6r lek, kreativitet och sj\u00e4lvst\u00e4ndighet uppfylls n\u00e4r l\u00e4randet sker genom barnets egen leksaksv\u00e4rld.',
    assessmentRubric: [
      { skill: 'Sortering av leksaker', emerging: 'sorterar leksaker i tv\u00e5 grupper med vuxenst\u00f6d (bilar/dockor)', proficient: 'sorterar sj\u00e4lvst\u00e4ndigt leksaker efter tv\u00e5 attribut (typ och f\u00e4rg)', advanced: 'skapar egna sorteringskriterier och f\u00f6rklarar sin logik' },
      { skill: 'R\u00e4kning av leksaker', emerging: 'r\u00e4knar 1\u20135 leksaker med pekning och vuxenst\u00f6d', proficient: 'r\u00e4knar sj\u00e4lvst\u00e4ndigt upp till 10 leksaker och matchar med siffra', advanced: 'r\u00e4knar \u00f6ver 10 och j\u00e4mf\u00f6r m\u00e4ngder av olika leksakstyper' },
      { skill: 'Symbol-verklighetskopling', emerging: 'matchar 2\u20133 leksaksbilder med riktiga leksaker med st\u00f6d', proficient: 'matchar sj\u00e4lvst\u00e4ndigt 5\u20136 bilder med riktiga leksaker', advanced: 'ritar egna leksaksbilder som tydligt representerar verkliga f\u00f6rem\u00e5l' },
    ],
  },

  transportation: {
    seoTitle: 'Gratis Transport\u00f6vningar F\u00f6rskola | LessonCraftStudio',
    seoDescription: 'Utskrivbara transport\u00f6vningar f\u00f6r f\u00f6rskolebarn (3\u20134 \u00e5r). Bilar, bussar och flygplan f\u00f6r r\u00e4kning och f\u00e4rgl\u00e4ggning. 33 generatorer. Gratis PDF. V\u00e4lj tema och skriv ut.',
    seoKeywords: 'transport\u00f6vningar f\u00f6rskola, fordon arbetsblad barn, bilar f\u00e4rgl\u00e4ggning, r\u00e4kna fordon, finmotorik \u00f6vning, bussar r\u00e4kning, flygplan matchning, fordonssortering, visuell diskriminering, trafik f\u00f6rskola',
    snippetAnswer: 'Transport\u00f6vningar f\u00f6r f\u00f6rskolan (3\u20134 \u00e5r) anv\u00e4nder bilar, bussar och flygplan f\u00f6r r\u00e4kning, matchning och f\u00e4rgl\u00e4ggning som st\u00e4rker finmotorik och kategoriseringsf\u00f6rm\u00e5ga. Barnens fordonsfascination driver motivationen. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Transporttemat \u00e4r bland de mest fascinerande f\u00f6r f\u00f6rskolebarn, eftersom tre- och fyra\u00e5ringar \u00e4r n\u00e4rmast besatta av fordon \u2014 bilar, bussar, lastbilar, t\u00e5g och flygplan dominerar b\u00e5de leksaksl\u00e5dan och fantasin. Denna djupa fascination g\u00f6r transportarbetsblad till ett oemotst\u00e5ndligt l\u00e4randeverktyg. R\u00e4kning av bilar p\u00e5 en v\u00e4g bygger en-till-en-korrespondens, sortering av fordon efter typ (land/vatten/luft) tr\u00e4nar kategorisering, och f\u00e4rgl\u00e4ggning av detaljerade fordon utvecklar finmotorik. Skuggmatchning med fordonssiluetter sk\u00e4rper visuell diskriminering. Lpf\u00f6 18:s m\u00e5l f\u00f6r teknik, skapande och naturvetenskap st\u00f6ds n\u00e4r barnet utforskar transportv\u00e4rlden genom strukturerade \u00f6vningar.',
    developmentalMilestones: [
      { milestone: 'Kategoriskt t\u00e4nkande (3\u20134-\u00e5ringar sorterar fordon efter var de k\u00f6r)', howWeAddress: 'Sorteringsaktiviteter d\u00e4r barn grupperar fordon efter milj\u00f6 (land, vatten, luft) bygger klassificeringsf\u00f6rm\u00e5ga' },
      { milestone: 'R\u00e4kning av rullande f\u00f6rem\u00e5l (barn r\u00e4knar bilar i verkliga situationer)', howWeAddress: 'R\u00e4kneaktiviteter med fordon p\u00e5 en v\u00e4g eller i en parkeringscen ger konkret, motiverande matematik' },
      { milestone: 'Storleksf\u00f6rst\u00e5else (stor lastbil, liten bil, mellanstor buss)', howWeAddress: 'Storleksj\u00e4mf\u00f6relseaktiviteter med olika fordon bygger matematiskt j\u00e4mf\u00f6relset\u00e4nkande' },
      { milestone: 'Finmotorisk kontroll (f\u00e4rgl\u00e4ggning av geometriska fordonsformer)', howWeAddress: 'F\u00e4rgl\u00e4ggning av bilar med cirkul\u00e4ra hjul och rektangul\u00e4ra karosser tr\u00e4nar formigenk\u00e4nning och precision' },
    ],
    differentiationNotes: 'F\u00f6r f\u00f6rskolebarn som beh\u00f6ver st\u00f6d, begr\u00e4nsa till tre eller fyra v\u00e4lk\u00e4nda fordon (bil, buss, flygplan), anv\u00e4nd leksaksfordon som komplement, och fokusera p\u00e5 enkel r\u00e4kning. F\u00f6r avancerade f\u00f6rskolebarn ut\u00f6ka med fler fordonstyper, introducera sortering efter tv\u00e5 attribut (typ och f\u00e4rg) och l\u00e5t barnen rita sin dr\u00f6mbil.',
    parentTakeaway: 'Fordon finns \u00f6verallt i barnets vardag. R\u00e4kna bilar p\u00e5 v\u00e4gen under promenader, sortera leksaksfordon efter f\u00e4rg hemma, och prata om olika transportmedel n\u00e4r ni reser. Bussh\u00e5llplatsen \u00e4r ett naturligt klassrum d\u00e4r ni kan r\u00e4kna bussar och prata om vart de \u00e5ker. Koppla arbetsbladen till verkliga fordonsupplevelser f\u00f6r f\u00f6rdjupat l\u00e4rande.',
    classroomIntegration: 'Transporttemat integreras naturligt i f\u00f6rskolans vardag: i samlingen diskuteras hur barnen tog sig till f\u00f6rskolan, vid l\u00e4rstationer arbetas med transportarbetsblad, i bygg-h\u00f6rnan konstrueras fordon av klossar, och p\u00e5 utflykter observeras trafiken. Lpf\u00f6 18:s m\u00e5l f\u00f6r teknik, matematik och spr\u00e5k uppfylls genom transporttemats vardagskoppling.',
    assessmentRubric: [
      { skill: 'Kategorisering av fordon', emerging: 'sorterar fordon i tv\u00e5 grupper med vuxenst\u00f6d (land/luft)', proficient: 'sorterar sj\u00e4lvst\u00e4ndigt fordon efter tre milj\u00f6er (land, vatten, luft)', advanced: 'hittar egna sorteringskriterier och f\u00f6rklarar skillnader mellan fordonstyper' },
      { skill: 'R\u00e4kning av fordon', emerging: 'r\u00e4knar 1\u20135 fordon med pekning och vuxenst\u00f6d', proficient: 'r\u00e4knar sj\u00e4lvst\u00e4ndigt upp till 10 fordon och matchar med siffra', advanced: 'r\u00e4knar \u00f6ver 10 och j\u00e4mf\u00f6r m\u00e4ngder av olika fordonstyper' },
      { skill: 'Finmotorisk kontroll (fordonsf\u00e4rgl\u00e4ggning)', emerging: 'f\u00e4rgl\u00e4gger med breda str\u00e4ck, delvis utanf\u00f6r konturerna', proficient: 'f\u00e4rgl\u00e4gger fordon inom konturerna med l\u00e4mpliga f\u00e4rger', advanced: 'l\u00e4gger till detaljer som f\u00f6nster, hjulm\u00f6nster och dekaler' },
    ],
  },

  travel: {
    seoTitle: 'Gratis Rese\u00f6vningar F\u00f6rskola | LessonCraftStudio',
    seoDescription: 'Utskrivbara rese\u00f6vningar f\u00f6r f\u00f6rskolebarn (3\u20134 \u00e5r). Resv\u00e4skor, kartor och fordon f\u00f6r r\u00e4kning och f\u00e4rgl\u00e4ggning. 33 generatorer. Gratis PDF. V\u00e4lj tema och skriv ut.',
    seoKeywords: 'rese\u00f6vningar f\u00f6rskola, resor arbetsblad barn, r\u00e4kna resf\u00f6rem\u00e5l, finmotorik \u00f6vning, f\u00e4rgl\u00e4ggning resor, v\u00e4rldskarta barn, semester f\u00f6rskola, matchning resor, kulturell medvetenhet, flygplats barn',
    snippetAnswer: 'Rese\u00f6vningar f\u00f6r f\u00f6rskolan (3\u20134 \u00e5r) anv\u00e4nder resv\u00e4skor, kartor och transportmedel f\u00f6r r\u00e4kning, matchning och f\u00e4rgl\u00e4ggning som st\u00e4rker finmotorik och omv\u00e4rldsf\u00f6rst\u00e5else. Barnens resenyfikenhet driver motivationen. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Resetemat \u00e4r s\u00e4rskilt stimulerande f\u00f6r f\u00f6rskolebarn, eftersom tre- och fyra\u00e5ringar \u00e4r naturligt nyfikna p\u00e5 v\u00e4rlden bortom sin n\u00e4rmilj\u00f6 och sp\u00e4nningen i att \u00e5ka n\u00e5gonstans. Oavsett om barnet har rest med familjen eller bara drömt om det, v\u00e4cker resarbetsblad lusten att utforska. R\u00e4kning av resv\u00e4skor och pass bygger en-till-en-korrespondens, matchning av transportmedel med resm\u00e5l tr\u00e4nar kategorisering, och f\u00e4rgl\u00e4ggning av resescener utvecklar finmotorik. Sortering av reskl\u00e4der st\u00e4rker praktiskt t\u00e4nkande. Lpf\u00f6 18:s m\u00e5l f\u00f6r kulturell medvetenhet och omv\u00e4rldsf\u00f6rst\u00e5else st\u00f6ds n\u00e4r barnet utforskar resev\u00e4rlden genom strukturerade \u00f6vningar.',
    developmentalMilestones: [
      { milestone: 'Omv\u00e4rldsmedvetenhet (3\u20134-\u00e5ringar b\u00f6rjar f\u00f6rst\u00e5 att det finns platser bortom hemmet)', howWeAddress: 'Researbetsblad med kartor och landm\u00e4rken vidgar barnets v\u00e4rldsbild p\u00e5 en \u00e5ldersanpassad niv\u00e5' },
      { milestone: 'Kategorisering av f\u00f6rem\u00e5l efter anv\u00e4ndning (vad beh\u00f6ver jag p\u00e5 resan?)', howWeAddress: 'Sorteringsaktiviteter d\u00e4r barn v\u00e4ljer reskl\u00e4der och packningssaker st\u00e4rker funktionellt t\u00e4nkande' },
      { milestone: 'R\u00e4kning av resrelaterade f\u00f6rem\u00e5l', howWeAddress: 'R\u00e4kneaktiviteter med resv\u00e4skor, biljetter och transportmedel ger motiverande matematik' },
      { milestone: 'Finmotorisk utveckling (f\u00e4rgl\u00e4ggning av varierade motiv)', howWeAddress: 'F\u00e4rgl\u00e4ggning av resescener med fordon, byggnader och natur tr\u00e4nar precision med varierande konturer' },
    ],
    differentiationNotes: 'F\u00f6r f\u00f6rskolebarn som beh\u00f6ver st\u00f6d, begr\u00e4nsa till tre v\u00e4lk\u00e4nda resf\u00f6rem\u00e5l (resv\u00e4ska, flygplan, sol), anv\u00e4nd en leksaksresv\u00e4ska med inneh\u00e5ll som komplement, och fokusera p\u00e5 enkel matchning. F\u00f6r avancerade f\u00f6rskolebarn introducera enkel kartl\u00e4sning, l\u00e4gg till bokstavssp\u00e5rning av l\u00e4ndernamn och utmana med packning-checklista-aktiviteter.',
    parentTakeaway: 'Resor \u00e4r ett naturligt l\u00e4randeaventyg oavsett om ni \u00e5ker utomlands eller till mormor. L\u00e5t barnet hj\u00e4lpa till att packa och r\u00e4kna kläderna i resv\u00e4skan, peka p\u00e5 transportmedel under resan, och prata om vart ni ska. Titta p\u00e5 en v\u00e4rldskarta tillsammans och l\u00e5t barnet v\u00e4lja \u201cdr\u00f6mresm\u00e5l\u201d \u2014 det bygger b\u00e5de geografi och fantasi.',
    classroomIntegration: 'Resetemat integreras naturligt i f\u00f6rskolans vardagsdiskussioner: i samlingen ber\u00e4ttar barnen om resor de gjort, vid l\u00e4rstationer arbetas med researbetsblad, i dockvrån leks reseroll med v\u00e4skor och pass, och p\u00e5 v\u00e4ggen skapas en gemensam v\u00e4rldskarta. Lpf\u00f6 18:s m\u00e5l f\u00f6r kulturell identitet, omv\u00e4rldsf\u00f6rst\u00e5else och spr\u00e5k uppfylls genom resetemats utforskande karaktär.',
    assessmentRubric: [
      { skill: 'R\u00e4kning av resf\u00f6rem\u00e5l', emerging: 'r\u00e4knar 1\u20135 resv\u00e4skor/biljetter med vuxenst\u00f6d', proficient: 'r\u00e4knar sj\u00e4lvst\u00e4ndigt upp till 10 resf\u00f6rem\u00e5l och matchar med siffra', advanced: 'r\u00e4knar \u00f6ver 10 och l\u00f6ser enkla packning-r\u00e4kneuppgifter' },
      { skill: 'Kategorisering (resepackning)', emerging: 'sorterar 2\u20133 reskl\u00e4der med vuxenst\u00f6d', proficient: 'sorterar sj\u00e4lvst\u00e4ndigt kl\u00e4der efter v\u00e4der/destination', advanced: 'packar en hel resv\u00e4ska logiskt och f\u00f6rklarar sina val' },
      { skill: 'Finmotorisk kontroll (resef\u00e4rgl\u00e4ggning)', emerging: 'f\u00e4rgl\u00e4gger resescener med breda str\u00e4ck', proficient: 'f\u00e4rgl\u00e4gger inom konturerna med l\u00e4mpliga f\u00e4rger', advanced: 'anv\u00e4nder detaljer och varierade f\u00e4rger i resescenerna' },
    ],
  },

  vegetables: {
    seoTitle: 'Gratis Gr\u00f6nsaks\u00f6vningar F\u00f6rskola | LessonCraftStudio',
    seoDescription: 'Utskrivbara gr\u00f6nsaks\u00f6vningar f\u00f6r f\u00f6rskolebarn (3\u20134 \u00e5r). R\u00e4kning, sortering och f\u00e4rgl\u00e4ggning med gr\u00f6nsaker. 33 generatorer. Gratis PDF. V\u00e4lj tema och skriv ut.',
    seoKeywords: 'gr\u00f6nsaks\u00f6vningar f\u00f6rskola, gr\u00f6nsaker arbetsblad barn, r\u00e4kna gr\u00f6nsaker, finmotorik \u00f6vning, sortering gr\u00f6nsaker, f\u00e4rgl\u00e4ggning gr\u00f6nsaker, h\u00e4lsosam mat barn, morot matchning, odla f\u00f6rskola, gr\u00f6nsakssoppa',
    snippetAnswer: 'Gr\u00f6nsaks\u00f6vningar f\u00f6r f\u00f6rskolan (3\u20134 \u00e5r) anv\u00e4nder mor\u00f6tter, tomater och gurkor f\u00f6r r\u00e4kning, sortering och f\u00e4rgl\u00e4ggning som st\u00e4rker finmotorik och h\u00e4lsomedvetenhet. Barnens matintresse driver motivationen. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Gr\u00f6nsakstemat \u00e4r s\u00e4rskilt v\u00e4rdefullt f\u00f6r f\u00f6rskolebarn, eftersom tre- och fyra\u00e5ringar m\u00f6ter gr\u00f6nsaker vid varje m\u00e5ltid och ofta har starka \u00e5sikter om dem \u2014 denna personliga koppling g\u00f6r gr\u00f6nsakerna till ett emotionellt laddat l\u00e4randetema. R\u00e4kning av mor\u00f6tter och tomater bygger en-till-en-korrespondens, sortering efter f\u00e4rg (r\u00f6d tomat, orange morot, gr\u00f6n gurka) st\u00e4rker f\u00e4rg- och kategoriseringsf\u00f6rm\u00e5ga, och f\u00e4rgl\u00e4ggning av gr\u00f6nsaksbilder utvecklar finmotorik. Matchning av gr\u00f6nsaker med var de v\u00e4xer (ovan eller under jord) introducerar naturvetenskap. Lpf\u00f6 18 betonar h\u00e4lsa och h\u00e5llbar utveckling, och gr\u00f6nsakstemat uppfyller detta n\u00e4r barnet l\u00e4r sig om mat genom strukturerade \u00f6vningar.',
    developmentalMilestones: [
      { milestone: 'F\u00e4rg- och formigenk\u00e4nning (3\u20134-\u00e5ringar l\u00e4r sig namnge f\u00e4rger och former)', howWeAddress: 'Sorteringsaktiviteter med f\u00e4rgglada gr\u00f6nsaker st\u00e4rker f\u00e4rgvokabul\u00e4r och formigenk\u00e4nning (rund tomat, avl\u00e5ng gurka)' },
      { milestone: 'R\u00e4kning av konkreta f\u00f6rem\u00e5l vid m\u00e5ltider', howWeAddress: 'R\u00e4kneaktiviteter med gr\u00f6nsaker i sk\u00e5lar och p\u00e5 tallrikar ger naturlig koppling till vardagssituationer' },
      { milestone: 'Sensorisk koppling (barn l\u00e4r sig genom att k\u00e4nna, lukta och smaka)', howWeAddress: 'Gr\u00f6nsaksampler som komplement till arbetsbladen ger multisensoriskt l\u00e4rande' },
      { milestone: 'Finmotorisk utveckling (f\u00e4rgl\u00e4ggning av rundade och avl\u00e5nga former)', howWeAddress: 'F\u00e4rgl\u00e4ggning av gr\u00f6nsaker med varierande former (runda, avl\u00e5nga, oregelbundna) tr\u00e4nar greppkontroll' },
    ],
    differentiationNotes: 'F\u00f6r f\u00f6rskolebarn som beh\u00f6ver st\u00f6d, begr\u00e4nsa till tre v\u00e4lk\u00e4nda gr\u00f6nsaker (morot, tomat, gurka), anv\u00e4nd riktiga gr\u00f6nsaker som komplement, och fokusera p\u00e5 f\u00e4rgsortering. F\u00f6r avancerade f\u00f6rskolebarn ut\u00f6ka med fler gr\u00f6nsaksorter, introducera var de v\u00e4xer, och l\u00e5t barnen planera en enkel gr\u00f6nsakssoppa genom att r\u00e4kna ingredienser.',
    parentTakeaway: 'K\u00f6ket \u00e4r det b\u00e4sta klassrummet f\u00f6r gr\u00f6nsaksl\u00e4rande. R\u00e4kna mor\u00f6tter vid matlagning, sortera gr\u00f6nsaker efter f\u00e4rg vid inhandling, och l\u00e5t barnet hj\u00e4lpa till att sk\u00e4ra (med barnkniv). Odla en morot i en kruka p\u00e5 f\u00f6nsterbr\u00e4dan och observera tillv\u00e4xten. Barn som deltar i matlagning \u00e4ter ofta fler gr\u00f6nsaker \u2014 dubbel vinst!',
    classroomIntegration: 'Gr\u00f6nsakstemat integreras i f\u00f6rskolans m\u00e5ltidsrutiner: vid mellanm\u00e5let namnges och r\u00e4knas gr\u00f6nsaker, i samlingen diskuteras veckans gr\u00f6nsak med bild och smak, vid l\u00e4rstationer arbetas med gr\u00f6nsaksmarbetsblad, och i odlingsl\u00e5dan s\u00e5s fr\u00f6n och observeras tillv\u00e4xt. Lpf\u00f6 18:s m\u00e5l f\u00f6r h\u00e4lsa, natur och h\u00e5llbar utveckling uppfylls direkt.',
    assessmentRubric: [
      { skill: 'Sortering av gr\u00f6nsaker', emerging: 'sorterar gr\u00f6nsaker i tv\u00e5 f\u00e4rggrupper med vuxenst\u00f6d', proficient: 'sorterar sj\u00e4lvst\u00e4ndigt efter f\u00e4rg och form', advanced: 'skapar egna sorteringskriterier och namnger gr\u00f6nsaksorter' },
      { skill: 'R\u00e4kning av gr\u00f6nsaker', emerging: 'r\u00e4knar 1\u20135 gr\u00f6nsaker med pekning och vuxenst\u00f6d', proficient: 'r\u00e4knar sj\u00e4lvst\u00e4ndigt upp till 10 och matchar med siffra', advanced: 'r\u00e4knar \u00f6ver 10 och l\u00f6ser enkla receptr\u00e4kneuppgifter' },
      { skill: 'Finmotorisk kontroll (gr\u00f6nsaksf\u00e4rgl\u00e4ggning)', emerging: 'f\u00e4rgl\u00e4gger med breda str\u00e4ck, delvis utanf\u00f6r konturerna', proficient: 'f\u00e4rgl\u00e4gger inom konturerna med r\u00e4tt f\u00e4rger', advanced: 'anv\u00e4nder nyanser och detaljer i gr\u00f6nsaksbilderna' },
    ],
  },

  weather: {
    seoTitle: 'Gratis V\u00e4der\u00f6vningar F\u00f6rskola | LessonCraftStudio',
    seoDescription: 'Utskrivbara v\u00e4der\u00f6vningar f\u00f6r f\u00f6rskolebarn (3\u20134 \u00e5r). Sol, regn och sn\u00f6 f\u00f6r r\u00e4kning och f\u00e4rgl\u00e4ggning. 33 generatorer. Gratis PDF. V\u00e4lj tema och skriv ut.',
    seoKeywords: 'v\u00e4der\u00f6vningar f\u00f6rskola, v\u00e4dertema arbetsblad barn, sol regn sn\u00f6, r\u00e4kna regndroppar, finmotorik \u00f6vning, v\u00e4derkalender f\u00f6rskola, \u00e5rstider barn, moln matchning, naturkunskap v\u00e4der, v\u00e4dersymboler',
    snippetAnswer: 'V\u00e4der\u00f6vningar f\u00f6r f\u00f6rskolan (3\u20134 \u00e5r) anv\u00e4nder sol, regn, moln och sn\u00f6 f\u00f6r r\u00e4kning, matchning och f\u00e4rgl\u00e4ggning som st\u00e4rker finmotorik och naturf\u00f6rst\u00e5else. Barnens dagliga v\u00e4derobservationer driver motivationen. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'V\u00e4dertemat \u00e4r s\u00e4rskilt naturligt f\u00f6r f\u00f6rskolebarn, eftersom tre- och fyra\u00e5ringar upplever v\u00e4dret med hela kroppen varje dag \u2014 regnet p\u00e5 ansiktet, solen som v\u00e4rmer, sn\u00f6n som faller. I Sverige, med sina tydliga \u00e5rstidsv\u00e4xlingar, \u00e4r v\u00e4dret en \u00e4nnu rikare l\u00e4randeresurs. R\u00e4kning av regndroppar och sn\u00f6flingor bygger en-till-en-korrespondens, matchning av v\u00e4dersymboler med kl\u00e4dval tr\u00e4nar logiskt t\u00e4nkande, och f\u00e4rgl\u00e4ggning av v\u00e4derscener utvecklar finmotorik. V\u00e4derkalendern ger daglig matematik\u00f6vning. Lpf\u00f6 18 betonar natur och milj\u00f6, och v\u00e4dertemat \u00e4r den mest vardagliga ing\u00e5ngen till dessa m\u00e5l.',
    developmentalMilestones: [
      { milestone: 'Observationsf\u00f6rm\u00e5ga (3\u20134-\u00e5ringar l\u00e4r sig uppm\u00e4rksamma f\u00f6r\u00e4ndringar i omgivningen)', howWeAddress: 'V\u00e4derobservationer d\u00e4r barn tittar ut och beskriver vad de ser tr\u00e4nar uppm\u00e4rksamhet och ordf\u00f6rr\u00e5d' },
      { milestone: 'Symbolisk f\u00f6rst\u00e5else (barn l\u00e4r sig att bilder kan representera begrepp)', howWeAddress: 'V\u00e4dersymboler (sol, moln, regn, sn\u00f6) introducerar symboliskt t\u00e4nkande som f\u00f6rberedelse f\u00f6r l\u00e4sning' },
      { milestone: 'R\u00e4kning och m\u00f6nster (daglig v\u00e4derkalender)', howWeAddress: 'V\u00e4derkalender d\u00e4r barn registrerar dagens v\u00e4der ger daglig matematik\u00f6vning med m\u00f6nsterigenk\u00e4nning' },
      { milestone: 'Finmotorisk kontroll (f\u00e4rgl\u00e4ggning av v\u00e4dermotiv)', howWeAddress: 'F\u00e4rgl\u00e4ggning av moln, regndroppar och solstr\u00e5lar tr\u00e4nar precision med rundade och str\u00e4ckta former' },
    ],
    differentiationNotes: 'F\u00f6r f\u00f6rskolebarn som beh\u00f6ver st\u00f6d, begr\u00e4nsa till tre v\u00e4dertyper (sol, regn, sn\u00f6), anv\u00e4nd stora v\u00e4dersymboler och koppla direkt till dagens v\u00e4der utanf\u00f6r f\u00f6nstret. F\u00f6r avancerade f\u00f6rskolebarn introducera fler v\u00e4dertyper, l\u00e4gg till v\u00e4derdiagram och utmana med \u00e5rstidskopplingar.',
    parentTakeaway: 'V\u00e4dret \u00e4r den enklaste dagliga l\u00e4raktiviteten. Fr\u00e5ga barnet varje morgon \u201cHur \u00e4r v\u00e4dret idag?\u201d och l\u00e5t det v\u00e4lja kl\u00e4der utifr\u00e5n svaret. G\u00f6r en enkel v\u00e4derkalender p\u00e5 kylsk\u00e5pet d\u00e4r barnet klistrar en v\u00e4dersymbol varje dag. R\u00e4kna regndroppar p\u00e5 f\u00f6nstret, sn\u00f6flingor p\u00e5 handflatan, och prata om vad molnen liknar.',
    classroomIntegration: 'V\u00e4dertemat \u00e4r det mest naturliga dagliga inslaget p\u00e5 f\u00f6rskolan: varje morgon i samlingen observeras v\u00e4dret och uppdateras v\u00e4derkalendern, vid l\u00e4rstationer arbetas med v\u00e4derarbetsblad, i skapandeh\u00f6rnan g\u00f6rs v\u00e4derkonst, och p\u00e5 uteg\u00e5rden upplevs v\u00e4dret med alla sinnen. Lpf\u00f6 18:s m\u00e5l f\u00f6r natur, matematik och spr\u00e5k uppfylls genom v\u00e4dertemats dagliga relevans.',
    assessmentRubric: [
      { skill: 'V\u00e4derigek\u00e4nning och symboler', emerging: 'k\u00e4nner igen sol och regn med vuxenst\u00f6d', proficient: 'namnger sj\u00e4lvst\u00e4ndigt 4\u20135 v\u00e4dertyper och matchar med symboler', advanced: 'beskriver v\u00e4der detaljerat och kopplar till \u00e5rstider' },
      { skill: 'R\u00e4kning med v\u00e4dertema', emerging: 'r\u00e4knar 1\u20135 regndroppar/sn\u00f6flingor med st\u00f6d', proficient: 'r\u00e4knar sj\u00e4lvst\u00e4ndigt upp till 10 och registrerar i v\u00e4derkalender', advanced: 'r\u00e4knar \u00f6ver 10 och j\u00e4mf\u00f6r v\u00e4derdata \u00f6ver tid' },
      { skill: 'V\u00e4der-kl\u00e4dval (logiskt t\u00e4nkande)', emerging: 'matchar kl\u00e4der till 1\u20132 v\u00e4dertyper med st\u00f6d', proficient: 'v\u00e4ljer sj\u00e4lvst\u00e4ndigt r\u00e4tt kl\u00e4der till 3\u20134 v\u00e4dertyper', advanced: 'f\u00f6rklarar varf\u00f6r man beh\u00f6ver olika kl\u00e4der och planerar f\u00f6r v\u00e4derv\u00e4xlingar' },
    ],
  },

  winter: {
    seoTitle: 'Gratis Vinter\u00f6vningar F\u00f6rskola | LessonCraftStudio',
    seoDescription: 'Utskrivbara vinter\u00f6vningar f\u00f6r f\u00f6rskolebarn (3\u20134 \u00e5r). Sn\u00f6gubbar, sn\u00f6flingor och skridskor f\u00f6r r\u00e4kning och f\u00e4rgl\u00e4ggning. 33 generatorer. Gratis PDF. Skriv ut direkt.',
    seoKeywords: 'vinter\u00f6vningar f\u00f6rskola, vintertema arbetsblad barn, sn\u00f6gubbar f\u00e4rgl\u00e4ggning, r\u00e4kna sn\u00f6flingor, finmotorik \u00f6vning, vinteraktiviteter f\u00f6rskola, is och sn\u00f6, s\u00e4songsaktiviteter, vinterkl\u00e4der matchning, vinterlandskap',
    snippetAnswer: 'Vinter\u00f6vningar f\u00f6r f\u00f6rskolan (3\u20134 \u00e5r) anv\u00e4nder sn\u00f6gubbar, sn\u00f6flingor och vinterlandskap f\u00f6r r\u00e4kning, matchning och f\u00e4rgl\u00e4ggning som st\u00e4rker finmotorik och \u00e5rstidsf\u00f6rst\u00e5else. Den svenska vinterns magi driver motivationen. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Vintertemat har en s\u00e4rskild plats f\u00f6r svenska f\u00f6rskolebarn, eftersom tre- och fyra\u00e5ringar upplever vintern med alla sinnen \u2014 sn\u00f6ns k\u00e4nsla i handskarna, isens halka under st\u00f6vlarna, den kalla luften p\u00e5 kinderna. Sveriges l\u00e5nga vinter ger m\u00e5nader av upplevelser som arbetsblad kan f\u00f6rdjupa. R\u00e4kning av sn\u00f6flingor och sn\u00f6bollar bygger en-till-en-korrespondens, matchning av vinterkl\u00e4der med kroppsdelar tr\u00e4nar kategorisering och sj\u00e4lvst\u00e4ndighet, och f\u00e4rgl\u00e4ggning av vinterlandskap utvecklar finmotorik. Storleksj\u00e4mf\u00f6relse av sn\u00f6gubbar bygger matematiskt t\u00e4nkande. Lpf\u00f6 18:s m\u00e5l f\u00f6r natur, h\u00e4lsa och sj\u00e4lvst\u00e4ndighet st\u00f6ds n\u00e4r barnet utforskar vintern b\u00e5de ute och p\u00e5 papper.',
    developmentalMilestones: [
      { milestone: 'Sensorisk utforskning (3\u20134-\u00e5ringar upplever sn\u00f6ns textur, isens temperatur)', howWeAddress: 'Vinterarbetsblad kopplar till verkliga sinnesupplevelser: kall sn\u00f6, hal is, varm choklad, vilket f\u00f6rdjupar l\u00e4randet' },
      { milestone: 'Sj\u00e4lvst\u00e4ndighet vid p\u00e5kl\u00e4dning (barn l\u00e4r sig sekvensen f\u00f6r vinterkl\u00e4der)', howWeAddress: 'Sekvensaktiviteter f\u00f6r p\u00e5kl\u00e4dningsordning (strumpor, byxor, jacka, m\u00f6ssa) tr\u00e4nar logiskt t\u00e4nkande och sj\u00e4lvst\u00e4ndighet' },
      { milestone: 'R\u00e4kning av sn\u00f6f\u00f6rem\u00e5l (sn\u00f6flingor, sn\u00f6bollar)', howWeAddress: 'R\u00e4kneaktiviteter med sn\u00f6flingor och sn\u00f6gubbar ger s\u00e4songsaktuell matematik' },
      { milestone: 'Finmotorisk kontroll (kl\u00e4 p\u00e5 och f\u00e4rgl\u00e4gg vintermotiv)', howWeAddress: 'F\u00e4rgl\u00e4ggning av sn\u00f6gubbar, sn\u00f6flingor och vinterlandskap tr\u00e4nar precision med varierande konturer' },
    ],
    differentiationNotes: 'F\u00f6r f\u00f6rskolebarn som beh\u00f6ver st\u00f6d, begr\u00e4nsa till tre v\u00e4lk\u00e4nda vinterelement (sn\u00f6gubbe, sn\u00f6flinga, m\u00f6ssa), anv\u00e4nd riktiga vinterkl\u00e4der f\u00f6r konkret koppling, och fokusera p\u00e5 enkel matchning. F\u00f6r avancerade f\u00f6rskolebarn l\u00e4gg till m\u00f6nster-forts\u00e4tt med vinterbilder, r\u00e4kning \u00f6ver 10 och l\u00e5t barnen planera en sn\u00f6gubbe steg f\u00f6r steg.',
    parentTakeaway: 'Den svenska vintern \u00e4r ett gigantiskt utomhusklassrum. Bygg en sn\u00f6gubbe och r\u00e4kna snöbollarna, g\u00f6r snöänglar och m\u00e4t deras storlek, och r\u00e4kna sn\u00f6flingor p\u00e5 handflatan. \u00d6va p\u00e5kl\u00e4dningssekvensen tillsammans och g\u00f6r det till ett mattespel: f\u00f6rst strumporna, sen byxorna \u2014 vad kommer efter? L\u00e5t barnet m\u00e5la vinterbilder fr\u00e5n f\u00f6nstret.',
    classroomIntegration: 'Vintertemat genomsyrar f\u00f6rskolans verksamhet under november\u2013mars: i samlingen diskuteras dagens v\u00e4der och sn\u00f6m\u00e4ngd, vid l\u00e4rstationer arbetas med vinterarbetsblad, i tamburen \u00f6vas p\u00e5kl\u00e4dningssekvensen, och p\u00e5 g\u00e5rden byggs sn\u00f6gubbar och m\u00e4ts sn\u00f6djup. Lpf\u00f6 18:s m\u00e5l f\u00f6r natur, matematik, sj\u00e4lvst\u00e4ndighet och h\u00e4lsa uppfylls genom vintertemats allomfattande karakt\u00e4r.',
    assessmentRubric: [
      { skill: 'Vinterkl\u00e4dessekvens', emerging: 'k\u00e4nner igen 2\u20133 vinterkl\u00e4desplagg med vuxenst\u00f6d', proficient: 'ordnar sj\u00e4lvst\u00e4ndigt 4\u20135 plagg i r\u00e4tt p\u00e5kl\u00e4dningsordning', advanced: 'f\u00f6rklarar hela sekvensen och anpassar val efter v\u00e4der' },
      { skill: 'R\u00e4kning av vinterelement', emerging: 'r\u00e4knar 1\u20135 sn\u00f6flingor/sn\u00f6bollar med vuxenst\u00f6d', proficient: 'r\u00e4knar sj\u00e4lvst\u00e4ndigt upp till 10 vinterelement', advanced: 'r\u00e4knar \u00f6ver 10 och j\u00e4mf\u00f6r m\u00e4ngder i vintermilj\u00f6er' },
      { skill: 'Finmotorisk kontroll (vinterscener)', emerging: 'f\u00e4rgl\u00e4gger vinterbilder med breda str\u00e4ck', proficient: 'f\u00e4rgl\u00e4gger inom konturerna med vinterf\u00e4rger', advanced: 'l\u00e4gger till sn\u00f6detaljer och m\u00f6nster i vinterlandskapen' },
    ],
  },

  xmas: {
    seoTitle: 'Gratis Jul\u00f6vningar F\u00f6rskola | LessonCraftStudio',
    seoDescription: 'Utskrivbara jul\u00f6vningar f\u00f6r f\u00f6rskolebarn (3\u20134 \u00e5r). Julgranar, tomtar och presenter f\u00f6r r\u00e4kning och f\u00e4rgl\u00e4ggning. 33 generatorer. Gratis PDF. Skriv ut direkt.',
    seoKeywords: 'jul\u00f6vningar f\u00f6rskola, jultema arbetsblad barn, julgran f\u00e4rgl\u00e4ggning, r\u00e4kna julklappar, finmotorik \u00f6vning, tomten matchning, adventsaktiviteter, julpyssel f\u00f6rskola, julkulor r\u00e4kning, julkalender',
    snippetAnswer: 'Jul\u00f6vningar f\u00f6r f\u00f6rskolan (3\u20134 \u00e5r) anv\u00e4nder julgranar, tomtar och julklappar f\u00f6r r\u00e4kning, matchning och f\u00e4rgl\u00e4ggning som st\u00e4rker finmotorik och tidig matematik. Julens magi driver exceptionell motivation. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Jultemat \u00e4r det mest motiverande av alla teman f\u00f6r f\u00f6rskolebarn, eftersom tre- och fyra\u00e5ringar upplever julen med en intensitet och f\u00f6rv\u00e4ntan som \u00e4r unik f\u00f6r denna \u00e5lder \u2014 tomten, julgranen, julklapparna och pepparkakorna fyller hela deras v\u00e4rld i december. Denna exceptionella motivation g\u00f6r jularbetsblad till det mest engagerande l\u00e4randeverktyget under \u00e5ret. R\u00e4kning av julkulor p\u00e5 granen bygger en-till-en-korrespondens, matchning av presenter med mottagare tr\u00e4nar logiskt t\u00e4nkande, och f\u00e4rgl\u00e4ggning av julscener utvecklar finmotorik med festliga f\u00e4rger. Sekvensering av adventskalendern introducerar talordning. Lpf\u00f6 18:s m\u00e5l f\u00f6r kulturell identitet och traditioner st\u00f6ds direkt genom jultemats djupa f\u00f6rankring i svensk kultur.',
    developmentalMilestones: [
      { milestone: 'R\u00e4kning och talordning (3\u20134-\u00e5ringar l\u00e4r sig siffror genom adventskalendern)', howWeAddress: 'Adventsbaserade r\u00e4kneaktiviteter (lucka 1, 2, 3...) ger daglig, motiverad tal\u00f6vning under december' },
      { milestone: 'Kategorisering och matchning (julklappar, julkulor, pynt)', howWeAddress: 'Sorteringsaktiviteter med juldekorationer efter f\u00e4rg, form och typ st\u00e4rker kategoriskt t\u00e4nkande' },
      { milestone: 'Kulturell medvetenhet (barn l\u00e4r sig traditioner och deras betydelse)', howWeAddress: 'Jularbetsblad med svenska traditioner (lucia, julbord, tomten) st\u00e4rker kulturell identitet' },
      { milestone: 'Finmotorisk precision (detaljerade julmotiv)', howWeAddress: 'F\u00e4rgl\u00e4ggning av julgranar, tomtar och pepparkakshus tr\u00e4nar finmotorisk precision med sm\u00e5 detaljer' },
    ],
    differentiationNotes: 'F\u00f6r f\u00f6rskolebarn som beh\u00f6ver st\u00f6d, begr\u00e4nsa till tre julelement (julgran, tomte, present), anv\u00e4nd stora enkla illustrationer och koppla direkt till julpynt i rummet. F\u00f6r avancerade f\u00f6rskolebarn l\u00e4gg till adventskalendermatematik, m\u00f6nster-forts\u00e4tt med julmotiv och l\u00e5t barnen designa sin egen julgran med ett best\u00e4mt antal kulor.',
    parentTakeaway: 'December \u00e4r den b\u00e4sta l\u00e4randem\u00e5naden f\u00f6r f\u00f6rskolebarn. R\u00e4kna luckor p\u00e5 adventskalendern varje dag, r\u00e4kna julkulor p\u00e5 granen, och sortera julpynt efter f\u00e4rg. Baka pepparkakor och r\u00e4kna ingredienserna. L\u00e5t barnet hj\u00e4lpa till att sl\u00e5 in julklappar och r\u00e4kna hur m\u00e5nga det blivit. Julens naturliga motivation g\u00f6r att varje aktivitet blir en lektion.',
    classroomIntegration: 'Jultemat genomsyrar hela f\u00f6rskolans decemberverksamhet: adventskalendern ger daglig matematik, luciafirandet st\u00e4rker kulturell identitet, vid l\u00e4rstationer arbetas med jularbetsblad, i skapandeh\u00f6rnan g\u00f6rs julpynt, och pepparkaksbakning ger m\u00e4tning och r\u00e4kning. Lpf\u00f6 18:s m\u00e5l f\u00f6r kulturell identitet, traditioner, matematik och skapande uppfylls genom jultemats allomfattande karakt\u00e4r.',
    assessmentRubric: [
      { skill: 'R\u00e4kning med jultema', emerging: 'r\u00e4knar 1\u20135 julkulor/presenter med vuxenst\u00f6d', proficient: 'r\u00e4knar sj\u00e4lvst\u00e4ndigt upp till 10 julelement och matchar med siffra', advanced: 'r\u00e4knar \u00f6ver 10 och l\u00f6ser adventsbaserade r\u00e4kneuppgifter' },
      { skill: 'Kategorisering av juldekorationer', emerging: 'sorterar julpynt i tv\u00e5 grupper med vuxenst\u00f6d (kulor/stj\u00e4rnor)', proficient: 'sorterar sj\u00e4lvst\u00e4ndigt efter f\u00e4rg, form och typ', advanced: 'skapar egna sorteringskriterier och dekorerar en julgran systematiskt' },
      { skill: 'Finmotorisk kontroll (julf\u00e4rgl\u00e4ggning)', emerging: 'f\u00e4rgl\u00e4gger julbilder med breda str\u00e4ck', proficient: 'f\u00e4rgl\u00e4gger inom konturerna med festliga f\u00e4rger', advanced: 'l\u00e4gger till sm\u00e5 detaljer som m\u00f6nster p\u00e5 julkulor och glitter p\u00e5 granen' },
    ],
  },

  zoo: {
    seoTitle: 'Gratis Djurparks\u00f6vningar F\u00f6rskola | LessonCraftStudio',
    seoDescription: 'Utskrivbara djurparks\u00f6vningar f\u00f6r f\u00f6rskolebarn (3\u20134 \u00e5r). Lejon, elefanter och apor f\u00f6r r\u00e4kning och f\u00e4rgl\u00e4ggning. 33 generatorer. Gratis PDF. Skriv ut direkt.',
    seoKeywords: 'djurparks\u00f6vningar f\u00f6rskola, djurpark arbetsblad barn, exotiska djur f\u00e4rgl\u00e4ggning, r\u00e4kna djurparksdjur, finmotorik \u00f6vning, lejon matchning, elefant r\u00e4kning, apa f\u00e4rgl\u00e4ggning, vilda djur barn, djursortering',
    snippetAnswer: 'Djurparks\u00f6vningar f\u00f6r f\u00f6rskolan (3\u20134 \u00e5r) anv\u00e4nder lejon, elefanter och apor f\u00f6r r\u00e4kning, matchning och f\u00e4rgl\u00e4ggning som st\u00e4rker finmotorik och kategoriseringsf\u00f6rm\u00e5ga. Exotiska djurs fascination driver motivationen. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Djurparkstemat \u00e4r s\u00e4rskilt sp\u00e4nnande f\u00f6r f\u00f6rskolebarn, eftersom tre- och fyra\u00e5ringar \u00e4r fascinerade av exotiska djur de bara sett p\u00e5 bild eller vid ett djurparksbes\u00f6k \u2014 lejon, elefanter, giraffer och apor \u00e4r stj\u00e4rnorna i barnens fantasi. Denna fascination g\u00f6r djurparksarbetsblad till ett kraftfullt l\u00e4randeverktyg. R\u00e4kning av djur i olika h\u00e4gn bygger en-till-en-korrespondens, storleksj\u00e4mf\u00f6relse av djur (stor elefant, liten apa) tr\u00e4nar matematiskt t\u00e4nkande, och f\u00e4rgl\u00e4ggning av exotiska djur utvecklar finmotorik. Sortering av djur efter livsmilj\u00f6 introducerar naturvetenskap. Lpf\u00f6 18:s m\u00e5l f\u00f6r natur, utforskande och skapande st\u00f6ds n\u00e4r barnet utforskar djurv\u00e4rlden genom strukturerade \u00f6vningar.',
    developmentalMilestones: [
      { milestone: 'Storleksf\u00f6rst\u00e5else (3\u20134-\u00e5ringar l\u00e4r sig j\u00e4mf\u00f6ra stor, liten, mittemellan)', howWeAddress: 'Storleksj\u00e4mf\u00f6relse med djurparksdjur (stor elefant, mellanstor tiger, liten apa) bygger matematiskt j\u00e4mf\u00f6relset\u00e4nkande' },
      { milestone: 'Kategoriskt t\u00e4nkande (sortering efter egenskaper)', howWeAddress: 'Sorteringsaktiviteter d\u00e4r barn grupperar djur efter livsmilj\u00f6 (savann, djungel, vatten) st\u00e4rker klassificeringsf\u00f6rm\u00e5ga' },
      { milestone: 'R\u00e4kning av djur i h\u00e4gn (konkret matematik)', howWeAddress: 'R\u00e4kneaktiviteter med djur i olika djurparksh\u00e4gn ger naturlig en-till-en-korrespondens\u00f6vning' },
      { milestone: 'Finmotorisk kontroll (f\u00e4rgl\u00e4ggning av detaljerade djur)', howWeAddress: 'F\u00e4rgl\u00e4ggning av exotiska djur med f\u00e4rgm\u00f6nster (tigerr\u00e4nder, girafffl\u00e4ckar) tr\u00e4nar precision' },
    ],
    differentiationNotes: 'F\u00f6r f\u00f6rskolebarn som beh\u00f6ver st\u00f6d, begr\u00e4nsa till tre eller fyra v\u00e4lk\u00e4nda djurparksdjur (lejon, elefant, apa), anv\u00e4nd plastdjur som komplement, och fokusera p\u00e5 enkel r\u00e4kning. F\u00f6r avancerade f\u00f6rskolebarn ut\u00f6ka med fler djurarter, introducera sortering efter livsmilj\u00f6 och l\u00e5t barnen planera ett djurparksbes\u00f6k genom att v\u00e4lja vilka h\u00e4gn de vill bes\u00f6ka.',
    parentTakeaway: 'Djurparken \u00e4r ett levande klassrum. Planera ett bes\u00f6k och r\u00e4kna djur i varje h\u00e4gn, j\u00e4mf\u00f6r storlekar (\u201c\u00c4r elefanten st\u00f6rre \u00e4n lejonet?\u201d) och prata om var djuren bor i det vilda. Hemma kan ni leka djurpark med plastdjur, sortera dem efter storlek och l\u00e4sa bilderb\u00f6cker om exotiska djur. Koppla arbetsbladen till djurparksminnen f\u00f6r f\u00f6rdjupat l\u00e4rande.',
    classroomIntegration: 'Djurparkstemat fungerar utmärkt som temavecka: i samlingen introduceras veckans djurparksdjur med bilder och ljud, vid l\u00e4rstationer arbetas med djurparksarbetsblad, i dockvrån leks djurpark med plastdjur, och som avslutning g\u00f6rs eventuellt en utflykt till n\u00e4rmaste djurpark. Lpf\u00f6 18:s m\u00e5l f\u00f6r natur, utforskande, matematik och spr\u00e5k uppfylls genom djurparkstemats rika inneh\u00e5ll.',
    assessmentRubric: [
      { skill: 'Storleksj\u00e4mf\u00f6relse (djurparksdjur)', emerging: 'identifierar stor och liten bland djuren med vuxenst\u00f6d', proficient: 'ordnar sj\u00e4lvst\u00e4ndigt 3\u20134 djur efter storlek', advanced: 'serierar fem eller fler djur och anv\u00e4nder j\u00e4mf\u00f6relseord (st\u00f6rst, minst, mittemellan)' },
      { skill: 'R\u00e4kning av djurparksdjur', emerging: 'r\u00e4knar 1\u20135 djur med pekning och vuxenst\u00f6d', proficient: 'r\u00e4knar sj\u00e4lvst\u00e4ndigt upp till 10 djur i olika h\u00e4gn', advanced: 'r\u00e4knar \u00f6ver 10 och j\u00e4mf\u00f6r djurm\u00e4ngder mellan h\u00e4gn' },
      { skill: 'Kategorisering av exotiska djur', emerging: 'sorterar djur i tv\u00e5 grupper med vuxenst\u00f6d', proficient: 'sorterar sj\u00e4lvst\u00e4ndigt djur efter livsmilj\u00f6 (savann, djungel, vatten)', advanced: 'hittar egna sorteringskriterier och ber\u00e4ttar om djurens egenskaper' },
    ],
  },
};

// Build the SEO insertion text (seoTitle, seoDescription, seoKeywords) - goes BEFORE intro
function buildSeoInsertionText(data) {
  const lines = [];
  lines.push(`      seoTitle: '${esc(data.seoTitle)}',`);
  lines.push(`      seoDescription: '${esc(data.seoDescription)}',`);
  lines.push(`      seoKeywords: '${esc(data.seoKeywords)}',`);
  return lines.join('\n');
}

// Build the enrichment insertion text (7 fields) - goes AFTER faq
function buildEnrichmentInsertionText(data) {
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
  const filePath = path.join(THEMES_DIR, theme, 'sv.ts');

  if (!fs.existsSync(filePath)) {
    console.error(`MISSING: ${filePath}`);
    errorCount++;
    continue;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  // Check if already enriched (seoTitle in preschool block)
  const preschoolIdx = content.indexOf("'preschool'");
  const kindergartenIdx = content.indexOf("'kindergarten'");

  if (preschoolIdx === -1 || kindergartenIdx === -1) {
    console.error(`MISSING GRADE BLOCKS: ${theme}/sv.ts`);
    errorCount++;
    continue;
  }

  const preschoolBlock = content.substring(preschoolIdx, kindergartenIdx);
  if (preschoolBlock.includes('seoTitle:')) {
    console.log(`SKIP (already enriched): ${theme}/sv.ts`);
    continue;
  }

  // STEP 1: Insert seoTitle/seoDescription/seoKeywords right after "'preschool': {"
  const preschoolOpenPattern = "'preschool': {";
  const preschoolOpenIdx = content.indexOf(preschoolOpenPattern);
  if (preschoolOpenIdx === -1) {
    console.error(`NO PRESCHOOL OPEN FOUND: ${theme}/sv.ts`);
    errorCount++;
    continue;
  }

  const seoInsertPos = preschoolOpenIdx + preschoolOpenPattern.length;
  const seoText = '\n' + buildSeoInsertionText(enrichments[theme]);
  content = content.substring(0, seoInsertPos) + seoText + content.substring(seoInsertPos);

  // STEP 2: Insert 7 enrichment fields after faq array (recalculate positions after insertion)
  const newPreschoolIdx = content.indexOf("'preschool'");
  const newKindergartenIdx = content.indexOf("'kindergarten'");
  const newPreschoolBlock = content.substring(newPreschoolIdx, newKindergartenIdx);

  // Find the last "],\n" in the preschool block (end of faq array)
  const faqEndPattern = /\],\n/g;
  let lastMatch = null;
  let match;
  while ((match = faqEndPattern.exec(newPreschoolBlock)) !== null) {
    lastMatch = match;
  }

  if (!lastMatch) {
    console.error(`NO FAQ END FOUND: ${theme}/sv.ts`);
    errorCount++;
    continue;
  }

  // Calculate absolute position
  const enrichInsertPos = newPreschoolIdx + lastMatch.index + lastMatch[0].length;
  const enrichText = buildEnrichmentInsertionText(enrichments[theme]) + '\n';
  content = content.substring(0, enrichInsertPos) + enrichText + content.substring(enrichInsertPos);

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`OK: ${theme}/sv.ts`);
  successCount++;
}

console.log(`\nDone: ${successCount} enriched, ${errorCount} errors, ${themes.length - successCount - errorCount} skipped`);
