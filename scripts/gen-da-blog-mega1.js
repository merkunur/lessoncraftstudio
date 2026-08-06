const fs = require('fs');
const path = require('path');
const DIR = path.join(__dirname, '..', 'frontend', 'config', 'blog-content', 'da');
function w(f, c) { fs.writeFileSync(path.join(DIR, f), c, 'utf8'); console.log(f); }

const hdr = `import type { BlogContent } from '../types';\n\nconst content: BlogContent = `;
const ftr = `\nexport default content;\n`;

const files = {
'answer-key-importance-printable-sales.ts': {
seo: { primaryKeyword: 'facitliste vigtighed printbar salg', secondaryKeywords: ['facitliste arbejdsark sælg mere', 'svar nøgle printables Etsy', 'facitliste øger salg'], lsiKeywords: ['kvalitetsindikator printbar', 'professionelt arbejdsark facit', 'facitliste conversion'], titleTag: 'Facitlister Øger Dit Salg: Hvorfor | LCS', metaDescription: 'Facitlister er den mest undervurderede faktor i printable-salg. Lær hvorfor de øger konvertering, reducerer refunderinger og forbedrer anmeldelser.' },
hero: { title: 'Facitlister Øger Dit Salg: Her Er Hvorfor', tagline: 'Den lille detalje der adskiller professionelle fra amatører', description: 'De fleste printable-sælgere fokuserer på design, prissætning og SEO — men overser den ene ting, der oftere afgør et salg end noget andet: facitlisten. Arbejdsark uden facitliste får konsekvent lavere ratings, flere refunderingsanmodninger og dårligere konvertering. Denne guide viser dig, hvorfor facitlister er afgørende, og hvordan du bruger dem strategisk til at øge din omsætning.' },
category: 'how-to',
introduction: 'Tænk over det fra køberens perspektiv: en forælder downloader et matematikark til sit barn. Barnet løser opgaverne, men forælderen kan ikke tjekke svarene uden selv at regne dem ud. Frustrationen fører til en negativ anmeldelse eller en refundering. En simpel facitliste ville have forhindret begge dele — og det tager generatoren under 2 sekunder at tilføje den.',
sections: [
  { heading: 'Facitlister som kvalitetsindikator', content: 'Når en køber browser Etsy-lister, er "med facitliste" eller "includes answer key" et af de mest søgte kvalifikationsord. Det signalerer professionel kvalitet og komplethed.\\n\\nBrugere der søger med "med facit" har højere købeintention — de har allerede besluttet at købe og tjekker, om produktet lever op til standarderne. Hvis din listing mangler dette, mister du disse højintentionskøbere til konkurrenterne.\\n\\nPå det danske marked er "med facit" et særligt stærkt signal, fordi danske forældre er vant til komplette undervisningsmaterialer fra folkeskolen. Et ark uden facit opfattes som ufuldendt.' },
  { heading: 'Indvirkning på anmeldelser og refunderinger', content: 'Data fra succesfulde printable-sælgere viser et klart mønster:\\n\\n- Produkter med facitliste: 4,7-4,9 gennemsnitlig rating\\n- Produkter uden facitliste: 4,1-4,4 gennemsnitlig rating\\n- Refunderingsrate med facit: 1-2%\\n- Refunderingsrate uden facit: 5-8%\\n\\nDen primære klage i negative anmeldelser af matematikark er "ingen facitliste inkluderet". Det er en let undgåelig fejl der koster dig salg.\\n\\nLessonCraftStudios generatorer inkluderer automatisk facitlister for alle arbejdsark. Du behøver ikke oprette dem manuelt — generatoren producerer dem som del af hvert ark.' },
  { heading: 'Facitlister som salgspunkt', content: 'Brug facitlisten aktivt i din markedsføring:\\n\\n- **Etsy-titel:** Inkludér "med Facit" eller "inkl. Svar"\\n- **Billeder:** Vis facitlisten i et af dine listing-fotos\\n- **Beskrivelse:** Fremhæv at "alle opgaver inkluderer detaljeret facitliste"\\n- **Tags:** Brug "med facit", "answer key included", "facitliste"\\n\\nFor pakker kan facitlisten endda være en del af din værdiproposition: "50 Matematikark + 50 Facitlister = 100 Sider Total". Det fordobler det opfattede sideantal uden ekstra arbejde.' },
  { heading: 'Forskellige facitformater til forskellige produkter', content: 'Ikke alle facitlister er skabt lige. Det bedste format afhænger af produkttypen:\\n\\n**Matematikark:** Separate facitside med alle svar tydeligt markeret\\n\\n**Ordsøgninger:** Facitside med alle ord markeret i gitteret\\n\\n**Krydsord:** Udfyldt krydsord med alle ord synlige\\n\\n**Kryptogrammer:** Dekodningsnøgle + den fulde besked\\n\\n**Matchning:** Facitside med alle korrekte par forbundet\\n\\nPro tip: Placér facitlister bagerst i din PDF, ikke midt i. Forældre printer ofte kun øvelsessiderne og gemmer facitlisten digitalt til reference.' },
  { heading: 'Automatisering med generatorer', content: 'Manuelt at oprette facitlister er tidskrævende og fejlbehæftet. Hvis du laver 50 matematikopgaver i hånden, er sandsynligheden for fejl i facitlisten høj — og en fejl i facitlisten er værre end ingen facitliste overhovedet.\\n\\nLessonCraftStudios generatorer løser dette problem fuldstændigt:\\n\\n- Facitlisten genereres automatisk fra opgaverne\\n- Nul risiko for fejl (computeren regner altid rigtigt)\\n- Facitlisten formateres professionelt\\n- Generatoren markerer svar tydeligt med farve eller understregning\\n\\nPrøv den gratis prøveversion med vandmærke og se, hvordan facitlisterne ser ud. Det er en af de funktioner, der sparer mest tid i hele produktionsprocessen.' },
],
keyTakeaways: ['Facitlister øger ratings fra 4,1-4,4 til 4,7-4,9 gennemsnitligt', 'Produkter uden facit har 3-4 gange højere refunderingsrate', 'Brug "med Facit" aktivt i titler, billeder og tags som salgspunkt', 'Generatorer opretter fejlfrie facitlister automatisk', 'Placér facitlister bagerst i PDF for optimal brugeroplevelse'],
faq: [
  { question: 'Er facitlister nødvendige for alle produkttyper?', answer: 'For matematikark, puslespil og staveøvelser: ja, absolut. For farvelægningssider og tegneøvelser: nej, de giver ikke mening. Tommelfingerreglen: hvis der er et "rigtigt svar", skal der være en facitliste.' },
  { question: 'Tæller facitlister med i sideantallet?', answer: 'Ja, og det er en fordel. Et produkt med "50 Matematikark + 50 Facitlister = 100 Sider" lyder mere imponerende end "50 Matematikark". Fremhæv det totale sideantal i din listing.' },
  { question: 'Kan facitlister være et separat produkt?', answer: 'Nej. Sælg aldrig facitlister separat — det frustrerer købere og genererer negative anmeldelser. Inkludér dem altid som del af produktet. Den ekstra opfattede værdi er langt mere værd end et potentielt separat salg.' },
],
internalLinks: [
  { pageType: 'app', slug: 'addition-arbejdsark', anchorText: 'Additions-Generator med automatisk facit' },
  { pageType: 'app', slug: 'ordsoegning-arbejdsark', anchorText: 'Ordsøgning med facitliste' },
  { pageType: 'app', slug: 'krydsord-arbejdsark', anchorText: 'Krydsord med løsning' },
],
relatedPosts: [
  { slug: 'saelg-additions-arbejdsark-etsy-guide', title: 'Sælg Additions-Arbejdsark på Etsy' },
  { slug: 'ordsoegning-printables-fortjeneste', title: 'Ordsøgning-Printables med Fortjeneste' },
  { slug: 'matematikark-pakker-der-saelger', title: 'Matematikark-Pakker Der Sælger' },
],
cta: { heading: 'Opret Arbejdsark med Automatisk Facit', description: 'Alle LessonCraftStudio-generatorer inkluderer automatiske facitlister. Prøv gratis med vandmærke.', buttonText: 'Prøv Generatorerne', buttonUrl: '/apps' },
},

'back-to-school-printable-rush.ts': {
seo: { primaryKeyword: 'skolestart printables sælg august', secondaryKeywords: ['skolestart arbejdsark Etsy salg', 'august september printbar rush', 'folkeskole start printables'], lsiKeywords: ['skolesæson printbar efterspørgsel', 'august salg spike', 'skolestart produktlancering'], titleTag: 'Skolestart-Printables: Augusts Salgsrush | LCS', metaDescription: 'Skolestart i august-september er årets største salgsperiode for printables. Lær at forberede din butik og maksimere dit salg i skolesæsonen.' },
hero: { title: 'Skolestart-Printables: Maksimér Augusts Salgsrush', tagline: 'Årets største salgsperiode for uddannelsesprintables', description: 'August og september er årets absolut mest profitable måneder for printable-sælgere. Forældre og folkeskolelærere forbereder sig til det nye skoleår og køber massivt ind i undervisningsmaterialer. Denne guide viser dig præcis, hvilke produkter du skal have klar, hvornår du skal liste dem, og hvordan du fanger den massive efterspørgsel der opstår, når folkeskolen starter.' },
category: 'niche-seasonal',
introduction: 'Skolestarts-perioden genererer typisk 30-50% af en printable-sælgers årlige omsætning. I Danmark starter folkeskolen medio august, og forberedelserne begynder allerede i juni-juli. Det betyder, at du skal have dine produkter klar og listet senest 1. juli for at opbygge søgeautoritet inden rushet begynder.',
sections: [
  { heading: 'Tidslinjen for skolestarts-salg i Danmark', content: 'Det danske skolestarts-rush følger en forudsigelig tidslinje:\\n\\n**Juni:** Forældre begynder at planlægge. Søgninger efter "folkeskole forberedelse" stiger.\\n**Juli:** Aktiv shopping-periode. Lærere forbereder materialer til det nye skoleår.\\n**August (uge 32-33):** Peak-uge. Folkeskolen starter, og last-minute-køb eksploderer.\\n**September:** Fortsat stærkt salg. Lærere opdager huller i deres materiale og køber supplerende ark.\\n**Oktober:** Salget normaliserer sig, men forbliver over baseline.\\n\\nDin deadline: alle skolestarts-produkter skal være listet senest 1. juli. Etsy-listinger tager 2-4 uger at opbygge søgeautoritet, så tidlig listing er afgørende.' },
  { heading: 'Top 10 skolestarts-produkter der sælger', content: '1. **Matematikøvelse-pakker** (addition, subtraktion for børnehaveklasse/1. klasse)\\n2. **Bogstavsporingsark** (alfabet A-Å med øvelser)\\n3. **Navnetræning** (ark med plads til at skrive barnets navn)\\n4. **Skema/kalender printables** (ugeskema, lektiekalender)\\n5. **Belønningssystemer** (klistermærkekort, point-systemer)\\n6. **Ordforrådsøvelser** (tematiske ordlister for hvert klassetrin)\\n7. **Matematikspil** (banko med tal, matematikpuslespil)\\n8. **Lærermaterialer** (klasseskemaer, elevlister, planlægningsark)\\n9. **DSA-materiale** (Dansk som Andetsprog for nye folkeskoleelever)\\n10. **Lektiehjælp-pakker** (strukturerede øvelser til hjemmebrug)\\n\\nHvert af disse produkter kan oprettes med LessonCraftStudios generatorer.' },
  { heading: 'Prissætning i skolestarts-sæsonen', content: 'Skolestarts-sæsonen tillader lidt højere priser, fordi efterspørgslen er stærk:\\n\\n**Enkeltark:** 10-18 kr. (vs. 8-15 kr. uden for sæson)\\n**Temapakker:** 45-70 kr. (vs. 35-55 kr.)\\n**Klassetrinspakker:** 120-200 kr. (vs. 90-140 kr.)\\n**Megapakker:** 200-350 kr. (vs. 180-280 kr.)\\n\\nForældre i skolestarts-mode er villige til at betale mere for convenience. En "Komplet Børnehaveklasse Startpakke" til 250 kr. der dækker alle behov er en no-brainer for en travl forælder.\\n\\nLærere har ofte et budget til materialer — og køber gerne premium-pakker, hvis de sparer tid.' },
  { heading: 'SEO-strategi for skolestarten', content: 'Skolestarts-søgeord skifter karakter over sæsonen:\\n\\n**Juni-juli (planlægningsfase):**\\n- "folkeskole forberedelse børnehaveklasse"\\n- "matematik øvelse skolestart"\\n- "bogstavtræning før børnehaveklasse"\\n\\n**August (akut behov):**\\n- "matematikark 1. klasse download nu"\\n- "printbar lektiehjælp folkeskole"\\n- "børnehaveklasse startpakke printbar"\\n\\n**September (supplering):**\\n- "ekstra matematikøvelse folkeskole"\\n- "supplerende undervisningsmateriale"\\n\\nOptimér dine lister med fase-specifikke søgeord. Opdatér titler og tags, når sæsonen skifter fase.' },
  { heading: 'Forberedelse af din butik til skolestarten', content: 'Tjekliste for skolestarts-forberedelse:\\n\\n**Maj-juni:**\\n□ Opret alle skolestarts-produkter\\n□ Generér arbejdsark for hvert klassetrin (børnehaveklasse til 3. klasse)\\n□ Opret temapakker og megabundles\\n□ Tag mockup-fotos af alle produkter\\n\\n**Juli:**\\n□ List alle produkter på Etsy\\n□ Optimér SEO med skolestarts-søgeord\\n□ Opsæt Etsy-annoncer for top 5 produkter\\n□ Opret Pinterest-pins for alle produkter\\n\\n**August:**\\n□ Overvåg salg og juster priser\\n□ Respondér hurtigt på kundespørgsmål\\n□ Tilføj "relaterede produkter" links\\n□ Forbered efterårsprodukter (halloween er næste peak)\\n\\nMed LessonCraftStudios generatorer kan du oprette hele din skolestarts-produktlinje på en weekend. Prøv den gratis prøveversion med vandmærke for at planlægge din linje.' },
],
keyTakeaways: ['Skolestarten genererer 30-50% af årets printable-salg — forbered dig tidligt', 'List alle produkter senest 1. juli for at opbygge søgeautoritet', 'Klassetrinspakker til børnehaveklasse og 1. klasse sælger bedst', 'Danske skolestarts-produkter har minimal konkurrence på Etsy', 'Forældre betaler premium for convenience — tilbyd komplette startpakker'],
faq: [
  { question: 'Hvornår skal jeg begynde at forberede skolestarts-produkter?', answer: 'Start i maj. Opret produkterne i maj-juni, list dem i juli, og lad dem opbygge søgeautoritet inden rushet i august. Sene lanseringer mister den vigtigste søgeperiode.' },
  { question: 'Fungerer skolestarts-produkter på KDP?', answer: 'Ja, men timingen er anderledes. KDP-bøger tager 2-3 uger at gå live, så udgiv senest 1. juni. "Min Første Skolebog" eller "Matematikøvelse for Børnehaveklassen" er populære KDP-titler.' },
  { question: 'Sælger skolestarts-produkter efter september?', answer: 'Ja, men med lavere volumen. Hjemmeundervisningsfamilier og DSA-undervisere køber året rundt. Skolestarts-pakker kan omdøbes til "Øvelses-Pakker" for at matche helårs-søgninger.' },
],
internalLinks: [
  { pageType: 'app', slug: 'addition-arbejdsark', anchorText: 'Additions-Generator' },
  { pageType: 'app', slug: 'alfabet-arbejdsark', anchorText: 'Alfabet-Generator' },
  { pageType: 'app', slug: 'haandskrift-arbejdsark', anchorText: 'Håndskrift-Generator' },
],
relatedPosts: [
  { slug: 'saelg-additions-arbejdsark-etsy-guide', title: 'Sælg Additions-Arbejdsark på Etsy' },
  { slug: 'matematikark-pakker-der-saelger', title: 'Matematikark-Pakker Der Sælger' },
  { slug: 'ordsoegning-printables-fortjeneste', title: 'Ordsøgning-Printables med Fortjeneste' },
],
cta: { heading: 'Forbered Din Skolestarts-Produktlinje', description: 'Opret professionelle arbejdsark for børnehaveklasse til 3. klasse. Prøv gratis med vandmærke — ingen tilmelding.', buttonText: 'Start Med Generatorerne', buttonUrl: '/apps' },
},

'batch-create-worksheets-efficiently.ts': {
seo: { primaryKeyword: 'batch opret arbejdsark effektivt hurtigt', secondaryKeywords: ['masseproduktion arbejdsark printbar', 'hurtig arbejdsark oprettelse generator', 'effektiv printbar produktion'], lsiKeywords: ['arbejdsark produktivitet', 'generator vs manuel design', 'tidbesparelse printbar'], titleTag: 'Batch-Opret Arbejdsark Effektivt | LCS', metaDescription: 'Lær at oprette 50+ arbejdsark på en time i stedet for en uge. Batch-produktion med generatorer er nøglen til en profitabel printable-forretning.' },
hero: { title: 'Batch-Opret Arbejdsark: 50+ Ark på En Time', tagline: 'Effektivitet er forskellen mellem hobby og forretning', description: 'Den største flaskehals i en printable-forretning er produktionshastihed. Sælgere der manuelt designer hvert ark i Canva bruger 30-60 minutter pr. side. Med den hastighed tager en pakke med 50 ark en hel arbejdsuge. Generatorbaseret batch-produktion reducerer tiden til 1-2 minutter pr. ark — hvilket betyder 50+ ark på en time. Denne guide viser dig, hvordan du optimerer din produktionsproces for maksimal output.' },
category: 'how-to',
introduction: 'Tiden det tager at oprette produkter er den skjulte omkostning i en printable-forretning. De mest succesfulde sælgere behandler produktion som en fabriksproces: standardiserede trin, batch-oprettelse og automatisering. Denne tilgang giver dem mulighed for at have 100+ lister, mens deres konkurrenter kæmper med at nå 20.',
sections: [
  { heading: 'Manuel vs. generatorbaseret produktion', content: 'Sammenligning af de to metoder:\\n\\n**Manuel design (Canva/Word):**\\n- Tid pr. ark: 30-60 minutter\\n- 50 ark: 25-50 timer\\n- Fejlrisiko: Høj (tastefejl, regnefejl)\\n- Facitliste: Skal oprettes manuelt\\n- Konsistens: Varierer mellem ark\\n\\n**Generatorbaseret produktion:**\\n- Tid pr. ark: 1-2 minutter\\n- 50 ark: 50-100 minutter\\n- Fejlrisiko: Nul (computergenereret)\\n- Facitliste: Automatisk\\n- Konsistens: Perfekt ensartet\\n\\nForskellen er 10-30x i produktivitet. Det er forskellen mellem at have 20 lister og 200 lister — og dermed mellem 500 kr./md og 5.000 kr./md i omsætning.' },
  { heading: 'Batch-produktion workflow', content: 'Her er den optimale batch-produktion workflow:\\n\\n**Trin 1: Planlægning (15 min)**\\nBeslut hvad du opretter: produkttype, tema, sværhedsgrad, antal ark.\\n\\n**Trin 2: Batch-generering (45-60 min)**\\nÅbn LessonCraftStudios generator. Opret alle ark i serie — skift kun de variable parametre (tal, tema, sværhed) mellem hvert ark.\\n\\n**Trin 3: Kvalitetskontrol (15 min)**\\nGennemgå stikprøver af de genererede ark. Check layout, stavning og facitlister.\\n\\n**Trin 4: Formatering til salg (15 min)**\\nSamle ark i PDF-pakker. Tilføj forside og indholdsfortegnelse.\\n\\n**Trin 5: Listing-oprettelse (20 min)**\\nOpret Etsy-listing med optimerede titler, tags og billeder.\\n\\nTotal tid for en komplet 50-arks pakke: cirka 2 timer fra start til live listing.' },
  { heading: 'Produktserier i batch', content: 'Batch-produktion er mest effektiv, når du opretter produktserier:\\n\\n**Tema-serie:** Samme arbejdsarktype, forskellige temaer\\n- Addition med dyr, køretøjer, mad, natur, rummet = 5 produkter i én session\\n\\n**Sværheds-serie:** Samme tema, stigende sværhed\\n- Let, middel, svært, ekspert = 4 produkter i én session\\n\\n**Sprogversion-serie:** Samme design, forskellige sprog\\n- Dansk, engelsk, tysk, fransk, spansk = 5 produkter i én session\\n\\n**Aldersgruppe-serie:** Samme emne, tilpasset alder\\n- 3-4 år, 5-6 år, 7-8 år, 9-10 år = 4 produkter i én session\\n\\nEn effektiv batch-session kan producere 15-20 separate produkter på 2-3 timer. Det er en hel uges listings klargjort på en formiddag.' },
  { heading: 'Automatisering af listing-processen', content: 'Batch-produktion stopper ikke ved ark-oprettelsen. Automatisér også listing-processen:\\n\\n**Skabeloner til Etsy-titler:**\\nOpret en skabelon med pladsholdere: "[Tema] [Arbejdsarktype] for [Aldersgruppe] — [Antal] Ark med Facit | Printbar PDF"\\n\\n**Standardiserede tags:**\\nOpret en tag-bank for hver produktkategori. Genanvend de samme 13 tags med minimal tilpasning.\\n\\n**Mockup-produktion:**\\nBrug den samme mockup-skabelon til alle produkter. Skift kun det viste ark ud. Smart Objects i Photoshop eller Canvas rammefunktion gør det hurtigt.\\n\\n**Beskrivelse-skabeloner:**\\nSkabelon med sektioner: "Hvad du får", "Inkluderet i pakken", "Sådan bruger du det", "Print instruktioner". Tilpas minimalt for hvert produkt.' },
  { heading: 'Skalering af output over tid', content: 'Med batch-produktion kan du opbygge en massiv produktlinje hurtigt:\\n\\n**Uge 1-2:** 50 enkeltprodukter (5 ark-typer × 10 temaer)\\n**Uge 3-4:** 20 pakker (kombinationer af enkeltprodukter)\\n**Uge 5-6:** 30 sprogvarianter (top 10 produkter × 3 ekstra sprog)\\n**Uge 7-8:** 10 KDP-bøger (samlede versioner af pakker)\\n\\nTotal: 110 lister på 2 måneder. Med konsistent trafik kan 110 lister generere 3.000-10.000 kr./md.\\n\\nNøglen er konsistens. Dedikér 2-3 timer om ugen til batch-produktion, og din produktlinje vokser støt. LessonCraftStudios gratis prøveversion med vandmærke lader dig planlægge hele din produktlinje, før du investerer i en kommerciel licens.' },
],
keyTakeaways: ['Generatorbaseret produktion er 10-30x hurtigere end manuelt Canva-design', 'Batch-produktion workflow: planlæg → generér → kvalitetstjek → formatér → list', 'Produktserier (tema, sværhed, sprog, alder) maksimerer output pr. session', 'Automatisér listing-processen med skabeloner til titler, tags og beskrivelser', '110 lister på 2 måneder er realistisk med konsistent batch-produktion'],
faq: [
  { question: 'Hvor mange ark kan jeg realistisk oprette på en time?', answer: 'Med en generator: 30-60 enkle ark (matematik, matching) eller 15-30 komplekse ark (ordsøgning, krydsord, kryptogram). Manuelt i Canva: 1-2 ark pr. time. Forskellen er massiv.' },
  { question: 'Kompromitterer batch-produktion kvaliteten?', answer: 'Nej, tværtimod. Generatorer producerer konsistent kvalitet uden menneskelige fejl. Hvert ark har perfekt layout, korrekt matematik og automatisk facitliste. Manuel produktion introducerer fejl i takt med at træthed sætter ind.' },
  { question: 'Skal jeg starte med mange enkeltprodukter eller færre pakker?', answer: 'Start med enkeltprodukter — de opbygger søgeautoritet hurtigere. Opret derefter pakker der kombinerer dine bedst sælgende enkeltprodukter. Pakker er nemmere at sammensætte, når grundprodukterne allerede eksisterer.' },
],
internalLinks: [
  { pageType: 'app', slug: 'addition-arbejdsark', anchorText: 'Additions-Generator' },
  { pageType: 'app', slug: 'ordsoegning-arbejdsark', anchorText: 'Ordsøgning Generator' },
  { pageType: 'app', slug: 'matchning-arbejdsark', anchorText: 'Matchning Generator' },
],
relatedPosts: [
  { slug: 'saelg-additions-arbejdsark-etsy-guide', title: 'Sælg Additions-Arbejdsark på Etsy' },
  { slug: 'matematikark-pakker-der-saelger', title: 'Matematikark-Pakker Der Sælger' },
  { slug: 'ordsoegning-printables-fortjeneste', title: 'Ordsøgning-Printables med Fortjeneste' },
],
cta: { heading: 'Start Din Batch-Produktion I Dag', description: 'Opret 50+ professionelle arbejdsark på en time med LessonCraftStudios generatorer. Prøv gratis med vandmærke.', buttonText: 'Prøv Generatorerne', buttonUrl: '/apps' },
},
};

for (const [filename, data] of Object.entries(files)) {
  const content = hdr + JSON.stringify(data, null, 2)
    .replace(/\\\\n/g, '\\n')
    .replace(/"([^"]+)":/g, (m, k) => `${k}:`)
    + ';' + ftr;
  w(filename, content);
}

console.log('Mega batch 1 done:', Object.keys(files).length, 'files');
