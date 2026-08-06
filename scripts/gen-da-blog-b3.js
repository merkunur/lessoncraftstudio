const fs = require('fs');
const path = require('path');
const DIR = path.join(__dirname, '..', 'frontend', 'config', 'blog-content', 'da');
let n = 0;
function w(f, c) { fs.writeFileSync(path.join(DIR, f), c, 'utf8'); n++; }
function esc(s) { return s.replace(/\\/g, '\\\\').replace(/'/g, "\\'"); }

function B(file, pk, title, tagline, desc, cat, intro, secs, kt, fq, il, rp, ctaH, ctaD, ctaB) {
  const s = secs.map(x => `    { heading: '${esc(x[0])}', content: '${esc(x[1])}' }`).join(',\n');
  const k = kt.map(x => `    '${esc(x)}'`).join(',\n');
  const f = fq.map(x => `    { question: '${esc(x[0])}', answer: '${esc(x[1])}' }`).join(',\n');
  const i = il.map(x => `    { pageType: '${x[0]}', slug: '${x[1]}', anchorText: '${esc(x[2])}' }`).join(',\n');
  const r = rp.map(x => `    { slug: '${x[0]}', title: '${esc(x[1])}' }`).join(',\n');
  w(file, `import type { BlogContent } from '../types';

const content: BlogContent = {
  seo: {
    primaryKeyword: '${esc(pk)}',
    secondaryKeywords: ['${esc(pk)} Etsy', '${esc(pk)} online', '${esc(pk)} sælg'],
    lsiKeywords: ['printbar forretning', 'digital download salg', 'Etsy printables'],
    titleTag: '${esc(title)} | LCS',
    metaDescription: '${esc(desc.substring(0, 155))}',
  },
  hero: {
    title: '${esc(title)}',
    tagline: '${esc(tagline)}',
    description: '${esc(desc)}',
  },
  category: '${cat}',
  introduction: '${esc(intro)}',
  sections: [
${s}
  ],
  keyTakeaways: [
${k}
  ],
  faq: [
${f}
  ],
  internalLinks: [
${i}
  ],
  relatedPosts: [
${r}
  ],
  cta: {
    heading: '${esc(ctaH)}',
    description: '${esc(ctaD)}',
    buttonText: '${esc(ctaB)}',
    buttonUrl: '/apps',
  },
};

export default content;
`);
}

// chart-count-worksheets-business.ts
B('chart-count-worksheets-business.ts',
  'diagram tælleark forretning sælg',
  'Diagram- og Tælleark: Opbyg en Forretning',
  'Visuel matematik der tiltrækker forældre',
  'Diagram- og tælleark kombinerer visuel læring med matematik. Børn tæller objekter og udfylder diagrammer — en metode der gør abstrakt matematik konkret og forståelig. Denne type arbejdsark appellerer stærkt til forældre der søger "sjov matematik" og "visuel matematikøvelse". Lær at oprette og sælge denne undervurderede produktkategori.',
  'product-guide',
  'Tælle- og diagramøvelser er en unik niche inden for matematikprintables. De er visuelt tiltalende, pædagogisk effektive og har relativt lav konkurrence sammenlignet med standard additionsark. Formatet er særligt populært for børnehaveklasse og 1. klasse, hvor visuel støtte er afgørende for matematikforståelsen.',
  [
    ['Hvad er diagram-tælleark?', 'Diagram-tælleark præsenterer et billede med flere objekter (f.eks. 5 æbler, 3 bananer, 7 appelsiner). Barnet tæller hvert objekt og udfylder et søjlediagram eller tabel med antallet. Øvelsen træner både tælning, kategorisering og datavisualisering.\n\nFormatet fungerer med alle temaer: dyr, mad, køretøjer, natur — hvert tema er en ny produktmulighed. Med LessonCraftStudios find-og-tæl generator kan du oprette tematiske tælleark med professionelle billeder på under 5 minutter.\n\nDe mest efterspurgte varianter er bondegårdsdyr-tælling (populært for de yngste), havdyr-tælling og insekt-tælling.'],
    ['Produktformater og prissætning', 'Tælleark sælger i flere formater:\n\n**Enkeltsider med ét tema:** 8-15 kr. — hurtige impulskøb\n**Temapakke (10-15 ark):** 35-55 kr. — hvert ark har et nyt tema\n**Progressionspakke:** 45-70 kr. — fra let tælling (1-5) til avanceret (1-20)\n**Diagram-komplet pakke:** 90-130 kr. — søjlediagram, lagkagediagram, tabel\n**Matematik-starter pakke:** 120-180 kr. — tælling + addition + subtraktion\n\nTælleark har en unik fordel: de er visuelt attraktive i Etsy-thumbnails. Farverige billeder af dyr og mad fanger øjet og genererer højere klikrater end standard talgitre.'],
    ['Målgrupper og søgeord', 'Tælleark har tre primære målgrupper:\n\n**Forældre til børnehaveklassebørn (alder 5-6):**\n- "tælleøvelse børnehaveklasse"\n- "diagram matematik printbar"\n- "visuel matematikøvelse for børn"\n\n**Folkeskolelærere (1.-2. klasse):**\n- "diagram øvelse folkeskole"\n- "tælle og sortér arbejdsark"\n- "datavisualisering matematik"\n\n**DSA-undervisere:**\n- "tælleøvelse dansk som andetsprog"\n- "visuel matematik DSA"\n\nDet danske marked har minimal konkurrence for denne type produkt. Engelske tælleark dominerer, men dansksprogede versioner har et dedikeret publikum.'],
    ['Oprettelse og variation', 'LessonCraftStudios generatorer lader dig oprette tælleark med 100+ temaer. Skab variation med:\n\n- **Tematisk variation:** Dyr, mad, køretøjer, natur, sæsoner\n- **Sværhedsvariation:** Tæl 1-5 (let), 1-10 (middel), 1-20 (svært)\n- **Formatvariation:** Simpel tælling, søjlediagram, sammenligning\n- **Sæsonvariation:** Juletælling, påsketælling, sommertælling\n\nEn komplet temapakke tager cirka 20 minutter at generere. Prøv den gratis prøveversion med vandmærke for at teste kvaliteten og planlægge din produktlinje.'],
    ['Skalering og bundlestrategier', 'Tælleark er ideelle til bundling:\n\n**Horizontal bundle:** Tælleark + addition + subtraktion = "Matematik Komplet Pakke"\n**Vertikal bundle:** Alle temaer i én pakke = "100 Tælle-Aktiviteter"\n**Sæsonbundle:** Alle sæsoner i én pakke = "Hele Årets Tælleøvelser"\n**KDP-bog:** Saml 50-80 tælleark i en aktivitetsbog til Amazon\n\nCross-selling er naturligt: kunder der køber tælleark køber ofte også additions- og subtraktionsark. Link mellem produkterne i dine Etsy-beskrivelser.\n\nEn tælleark-produktlinje med 20-30 lister kan generere 1.500-3.500 kr./md som del af en bredere matematikforretning.'],
  ],
  ['Diagram-tælleark er visuelt tiltalende og har lav konkurrence', 'Formatet fungerer med alle temaer — hvert tema er en ny listing', 'Børnehaveklasse og 1. klasse er den primære målgruppe', 'Tælleark cross-seller naturligt med additions- og subtraktionsark', 'KDP-aktivitetsbøger med tælleark er en undervurderet niche'],
  [['Hvilke temaer sælger bedst for tælleark?', 'Bondegårdsdyr, havdyr og mad er de tre mest populære temaer. Sæsonbestemte temaer (juletælling, halloweentælling) genererer sæsonspikes. Start med 3-5 eviggrønne temaer og tilføj sæsonprodukter over tid.'],
   ['Er tælleark passende for børn under 5 år?', 'Ja, med tilpasning. Brug store billeder, tæl kun til 5, og brug simple tabelformater i stedet for diagrammer. Produktet hedder typisk "førskole-tælleøvelse" for denne aldersgruppe.'],
   ['Kan jeg kombinere tælleark med andre produkttyper?', 'Absolut. Tælleark + matchning + sortering = "Visuel Matematik Pakke" er en populær kombination der sælger til højere priser end de individuelle produkter.']],
  [['app', 'find-og-tael-arbejdsark', 'Find og Tæl Generator'],
   ['app', 'addition-arbejdsark', 'Additions-Generator'],
   ['app', 'sorterings-arbejdsark', 'Sorterings-Generator']],
  [['saelg-additions-arbejdsark-etsy-guide', 'Sælg Additions-Arbejdsark på Etsy'],
   ['matematikark-pakker-der-saelger', 'Matematikark-Pakker Der Sælger'],
   ['ordsoegning-printables-fortjeneste', 'Ordsøgning-Printables med Fortjeneste']],
  'Opret Diagram- og Tælleark Nu',
  'Generér professionelle tælleark med 100+ temaer. Prøv gratis med vandmærke.',
  'Prøv Find og Tæl Generatoren'
);

// coloring-pages-business-2026.ts
B('coloring-pages-business-2026.ts',
  'farvelægningssider forretning 2026',
  'Farvelægningssider som Forretning i 2026',
  'Et massemarked med muligheder for nichespecialisering',
  'Farvelægningssider er det mest søgte printable-produkt på Etsy, men det er også det mest konkurrenceprægede. I 2026 kræver succes i farvelægningsnichen specialisering — generiske blomster og mandalas drukner i konkurrence, mens tematiske og aldersspecifikke farvelægningsprodukter stadig har rum for nye sælgere. Lær hvordan du finder din niche i dette massive marked.',
  'product-guide',
  'Farvelægningsmarkedet er delt i to verdener: voksenfarvelægning (mindfulness, stress-relief) og børnefarvelægning (pædagogisk, underholdning). Begge markeder er store, men kræver helt forskellige strategier. Lad os dykke ned i, hvordan du positionerer dig profitabelt i 2026.',
  [
    ['Markedsstatus: Farvelægning i 2026', 'Farvelægningsmarkedet har udviklet sig markant:\n\n**Voksenfarvelægning:** Voksen-mandala-boblen fra 2015-2020 er forbi. Markedet er modnet, og generiske mandalas er overmættede. Men niche-voksenfarvelægning (arkitektur, haver, dyr i habitat) vokser stadig.\n\n**Børnefarvelægning:** Stabil og voksende. Forældre søger aldersspecifik farvelægning med pædagogisk værdi. Farvelægning-og-lær formater (bogstavfarvelægning, talfarvelægning) er populære.\n\n**Tematisk farvelægning:** Dinosaurer, enhjørninger, rummet, dyr — temaspecifik farvelægning har lavere konkurrence og højere konvertering end generisk.\n\n**Dansk farvelægning:** Minimalt udbud. Danske temaer (vikinger, nordiske dyr, danske seværdigheder) er en åben niche.'],
    ['Produkttyper der sælger i 2026', 'De mest profitable farvelægningsprodukter i 2026:\n\n**Tematiske pakker (25-45 kr. for 15-20 sider):**\nSpecifikke temaer: dinosaurer, havdyr, bondegård. Hvert tema er en separat listing.\n\n**Farvelæg-og-lær (35-55 kr. for 15-20 sider):**\nFarvelægning kombineret med bogstaver, tal eller ordforråd. Pædagogisk værdi øger prisen.\n\n**KDP-farvelægningsbøger (55-90 kr.):**\nFysiske bøger til Amazon. 50-80 sider i A4-format. Populære gaver.\n\n**Sæsonfarvelægning (25-40 kr. for 10-15 sider):**\nJul, halloween, påske, fastelavn — sæsonspikes med tematisk farvelægning.\n\n**Voksen premium-farvelægning (45-80 kr. for 20-30 sider):**\nDetaljerede illustrationer med fine linjer. Natur, arkitektur, dyr.'],
    ['Differentiering i et konkurrencepræget marked', 'For at skille dig ud i farvelægningsmarkedet:\n\n- **Nichespecialisering:** "Dinosaurer for 3-5 årige" i stedet for "Farvelægning for Børn"\n- **Pædagogisk vinkel:** Tilføj bogstaver, tal eller fakta til hver side\n- **Kulturel unikhed:** Danske temaer, vikinger, nordisk natur\n- **Kvalitetsillustration:** Detaljerede, professionelle illustrationer — ikke simple konturer\n- **Bundle-strategi:** Kombinér farvelægning med andre aktiviteter (puslespil, matching)\n\nLessonCraftStudios farvelægningsgenerator producerer professionelle tematiske sider med 100+ temaer. Kvaliteten er konsistent, og du kan oprette en hel kollektion på en formiddag.'],
    ['KDP-farvelægningsbøger: Strategi', 'KDP er den mest profitable kanal for farvelægningsprodukter:\n\n**Format:** A4 (210×297mm), enkeltsidet print, minimum 50 sider\n**Pris:** 55-90 kr. (70-120 kr. for premium)\n**Forside:** Professionel, farverig forside med et eksempel fra bogen\n**Titel:** Beskrivende: "Dinosaurer Farvelægning for Børn 3-6 År — 60 Sider"\n\nKDP-farvelægningsbøger er populære gaver til fødselsdage og jul. Udgiv i september for at fange julesæsonen.\n\nPå det danske marked kan du også udgive via Saxo.com for lokal distribution. Danske farvelægningsbøger med nordiske temaer har minimal konkurrence.'],
    ['Skalering af farvelægningsforretningen', 'Farvelægning skalerer godt med den rigtige strategi:\n\n1. **Temamultiplikation:** 50+ temaer = 50+ lister\n2. **Aldersspecifikke versioner:** Samme tema i 3-5 år, 5-8 år og voksenversion\n3. **Sprogversioner:** Farvelæg-og-lær med dansk, engelsk, tysk ordforråd\n4. **Sæsonprodukter:** 6-8 sæsonspecifikke pakker pr. år\n5. **KDP-serier:** Volume 1, 2, 3 af tematiske farvelægningsbøger\n\nEn moden farvelægningsforretning med 40-60 lister plus 5-10 KDP-bøger kan generere 3.000-8.000 kr./md. Nøglen er nichespecialisering — bliv den bedste i din niche i stedet for at konkurrere bredt.\n\nPrøv LessonCraftStudios gratis prøveversion med vandmærke for at teste alle farvelægningstemaer.'],
  ],
  ['Nichespecialisering er nøglen — generiske farvelægningssider drukner i konkurrence', 'Farvelæg-og-lær formater (bogstaver, tal) sælger bedre end ren farvelægning', 'KDP-farvelægningsbøger er den mest profitable kanal for farvelægningsprodukter', 'Danske temaer (vikinger, nordisk natur) er en åben niche', 'Kombinér farvelægning med andre aktiviteter for højere ordreværdi'],
  [['Er farvelægningsmarkedet overmættet?', 'For generiske produkter: ja. For nichespecifikke produkter: nej. "Farvelægning for børn" har millioner af konkurrenter. "Vikinge-farvelægning for 5-8 årige" har næsten ingen. Specialisering er afgørende.'],
   ['Hvad tjener man på KDP-farvelægningsbøger?', 'Royalty er typisk 20-40 kr. pr. bog (afhængigt af sideantal og pris). Med 50-100 salg/md genererer en enkelt bog 1.000-4.000 kr./md. De mest succesfulde farvelægningssælgere har 10-20 bøger.'],
   ['Kan jeg sælge farvelægningssider uden at være kunstner?', 'Ja. LessonCraftStudios generator opretter professionelle farvelægningssider baseret på tematiske billeder. Du behøver ingen tegneevner — generatoren håndterer illustrationerne.']],
  [['app', 'farvelaegning-arbejdsark', 'Farvelægnings-Generator'],
   ['app', 'tegn-og-farvelaeg-arbejdsark', 'Tegn og Farvelæg Generator'],
   ['app', 'alfabet-arbejdsark', 'Alfabet-Generator (farvelæg-og-lær)']],
  [['saelg-additions-arbejdsark-etsy-guide', 'Sælg Additions-Arbejdsark på Etsy'],
   ['ordsoegning-printables-fortjeneste', 'Ordsøgning-Printables med Fortjeneste'],
   ['matematikark-pakker-der-saelger', 'Matematikark-Pakker Der Sælger']],
  'Opret Farvelægningsprodukter Nu',
  'Generér professionelle tematiske farvelægningssider med 100+ temaer. Prøv gratis med vandmærke.',
  'Prøv Farvelægnings-Generatoren'
);

// commercial-license-printables-explained.ts
B('commercial-license-printables-explained.ts',
  'kommerciel licens printables forklaret',
  'Kommerciel Licens til Printables: Hvad Du Skal Vide',
  'Forstå licensreglerne før du sælger',
  'En kommerciel licens er fundamentet for enhver printable-forretning. Uden den rigtige licens risikerer du DMCA-takedowns, retssager og tab af din Etsy-butik. Men licenslandskabet kan virke forvirrende — hvad dækker en licens, hvad dækker den ikke, og hvilken type har du brug for? Denne guide forklarer alt, hvad du skal vide om kommercielle licenser til printable-produkter.',
  'how-to',
  'Copyright og licensering er ikke det mest spændende emne, men det er det vigtigste for din forretnings langsigtede overlevelse. En enkelt licensovertrædelse kan resultere i permanent lukning af din Etsy-butik. Lad os sikre, at du forstår reglerne.',
  [
    ['Hvad er en kommerciel licens?', 'En kommerciel licens giver dig ret til at sælge produkter skabt med et specifikt værktøj eller indhold. Uden en kommerciel licens har du typisk kun ret til personlig brug.\n\nI printable-verdenen er der flere licens-scenarier:\n\n**Værktøjslicens (generatorer):** Ret til at sælge de arbejdsark, du opretter med generatoren. LessonCraftStudio tilbyder en kommerciel licens der tillader ubegrænset salg.\n\n**Billedlicens (clip art/stock):** Ret til at bruge billeder i dine produkter. Tjek altid om licensen tillader videresalg.\n\n**Font-licens:** Ret til at bruge specifikke skrifttyper i kommercielle produkter. Mange gratis fonte har restriktioner.\n\n**Skabelonlicens:** Ret til at tilpasse og sælge en skabelon. Ofte med begrænsninger på antallet af salg.'],
    ['LessonCraftStudios licensmodel', 'LessonCraftStudios licens er designet til printable-sælgere:\n\n**Gratis prøveversion med vandmærke:**\n- Fuld adgang til alle funktioner\n- Alle 33 generatorer tilgængelige\n- Alle temaer og sprog inkluderet\n- Vandmærke på alle downloads\n- Perfekt til test og planlægning\n- Ingen tilmelding påkrævet\n\n**Kommerciel licens:**\n- Vandmærkefri downloads\n- Ubegrænset antal produkter\n- Salg tilladt på alle platforme (Etsy, KDP, Gumroad, etc.)\n- Ingen royalties eller løbende gebyrer\n- Livstidsadgang\n\nDenne model lader dig teste alle funktioner gratis og kun investere, når du er klar til at sælge.'],
    ['Licens-faldgruber at undgå', 'De mest almindelige licensfejl nye sælgere begår:\n\n**1. Brug af "gratis" clip art til kommercielt salg:**\nMangt "gratis" clip art er kun gratis til personlig brug. Læs ALTID licensbetingelserne.\n\n**2. Remix af andres produkter:**\nAt ændre et produkt 20-30% gør det ikke til dit eget. Det er stadig en copyright-overtrædelse.\n\n**3. Brug af Disney/Marvel/kendte karakterer:**\nFanart og karakter-baserede produkter er ulovlige uden officiel licens. Etsy lukker aktivt butikker der sælger dem.\n\n**4. Brug af fonte uden kommerciel licens:**\nGoogle Fonts er sikre. De fleste andre gratis fonte kræver en separat kommerciel licens.\n\n**5. Antager at "købt = kommerciel rettighed":**\nAt købe et produkt giver dig brugsret, ikke videresalgsret. Kommerciel licens er altid separat.'],
    ['Beskyt dine egne produkter', 'Som sælger skal du også beskytte dine egne produkter:\n\n**Copyright-notice:** Inkludér en copyright-notice i dine PDF-filer. "© 2026 [Dit Firmanavn]. Alle rettigheder forbeholdes."\n\n**Vandmærke på previews:** Brug altid vandmærker på dine Etsy-preview-billeder for at forhindre tyveri.\n\n**DMCA-beredskab:** Vær klar til at indsende DMCA-takedowns, hvis du finder kopierede produkter.\n\n**Terms of Use:** Inkludér en brugsaftale i din download: "Denne fil er til personlig eller klassebrug. Videresalg eller redistribution er ikke tilladt."\n\n**Unikke designs:** Jo mere unikke dine produkter er, jo sværere er de at kopiere. Brug tematiske billeder og tilpassede layouts.'],
    ['Licens som salgspunkt', 'Din kommercielle licens er et aktivt salgspunkt:\n\n- **I listing-titlen:** "Kommerciel Licens Inkluderet" tiltrækker sælgere der køber til videresalg\n- **I beskrivelsen:** Forklar præcis, hvad licensen tillader\n- **I FAQ:** Besvar de mest stillede licensspørgsmål\n\nNår du bruger LessonCraftStudios kommercielle licens, kan du eksplicit skrive: "Oprettet med kommercielt licenseret software. Ubegrænset salg tilladt på alle platforme."\n\nDenne transparens opbygger tillid og differentierer dig fra sælgere der bruger uklare licenskilder.'],
  ],
  ['En kommerciel licens er fundamentet for enhver printable-forretning', 'LessonCraftStudio tilbyder gratis prøveversion med vandmærke og kommerciel licens til salg', 'Undgå ulovligt clip art, fonte uden licens og karakter-baserede produkter', 'Beskyt dine egne produkter med copyright-notices og vandmærker', 'Brug din kommercielle licens som aktivt salgspunkt i dine lister'],
  [['Har jeg brug for en kommerciel licens for at sælge på Etsy?', 'Ja, hvis du bruger værktøjer, billeder eller fonts der har licensbetingelser. For helt selvskabte produkter (dine egne tegninger, dine egne tekster) har du automatisk copyright. For generatorbaserede produkter skal du have en kommerciel licens fra generatorudbyderen.'],
   ['Hvad sker der, hvis jeg sælger uden licens?', 'Risici inkluderer DMCA-takedowns (Etsy fjerner din listing), kontosuspension (Etsy lukker din butik) og i værste fald retssager. Det er ikke risikoen værd — køb altid den korrekte licens.'],
   ['Dækker LessonCraftStudios licens KDP-salg?', 'Ja. Den kommercielle licens dækker salg på alle platforme: Etsy, Amazon KDP, Gumroad, din egen hjemmeside, Saxo.com og alle andre. Ingen begrænsninger på platform eller antal salg.']],
  [['app', 'addition-arbejdsark', 'Additions-Generator (kommerciel licens)'],
   ['app', 'ordsoegning-arbejdsark', 'Ordsøgning Generator'],
   ['app', 'farvelaegning-arbejdsark', 'Farvelægnings-Generator']],
  [['saelg-additions-arbejdsark-etsy-guide', 'Sælg Additions-Arbejdsark på Etsy'],
   ['ordsoegning-printables-fortjeneste', 'Ordsøgning-Printables med Fortjeneste'],
   ['matematikark-pakker-der-saelger', 'Matematikark-Pakker Der Sælger']],
  'Prøv Generatorerne med Kommerciel Licens',
  'Test alle 33 generatorer gratis med vandmærke. Opgrader til kommerciel licens, når du er klar til at sælge.',
  'Prøv Gratis med Vandmærke'
);

// copyright-printable-sellers-basics.ts
B('copyright-printable-sellers-basics.ts',
  'ophavsret printable sælgere grundlæggende',
  'Ophavsret for Printable-Sælgere: Grundlæggende',
  'Beskyt dig selv og respektér andres rettigheder',
  'Ophavsret er det juridiske fundament for din printable-forretning. Forståelse af ophavsretsloven beskytter dig mod retssager og sikrer, at dine egne produkter er lovligt beskyttede. Denne guide dækker de grundlæggende ophavsretsregler, som enhver printable-sælger i Danmark bør kende — fra at bruge andres materiale lovligt til at beskytte dine egne kreationer.',
  'how-to',
  'Ophavsretsloven er faktisk simpel i sin kerne: den der skaber et originalt værk, ejer det automatisk. Problemerne opstår, når sælgere bruger andres materiale uden tilladelse eller ikke beskytter deres eget. Lad os gennemgå de vigtigste regler.',
  [
    ['Ophavsret i Danmark: Grundreglerne', 'Dansk ophavsret (Ophavsretsloven) beskytter automatisk alle originale værker:\n\n- Du behøver IKKE at registrere copyright — beskyttelsen er automatisk ved skabelse\n- Beskyttelsen varer til 70 år efter skaberens død\n- Både digitale og fysiske værker er beskyttet\n- Værket skal være "originalt" — dvs. have et minimum af kreativitet\n\nFor printable-sælgere betyder det:\n- Dine originale arbejdsark er automatisk beskyttede\n- Du behøver ikke et ©-symbol (men det er god praksis at inkludere det)\n- Andre må ikke kopiere dine produkter uden tilladelse\n- Du må ikke kopiere andres produkter uden licens'],
    ['Hvad du må og ikke må bruge', 'Klare regler for hvad du kan bruge i dine produkter:\n\n**Sikker at bruge:**\n- Dine egne originale designs og tekster\n- Public domain materiale (70+ år gammel)\n- Creative Commons licenseret materiale (tjek den specifikke licens)\n- Materiale du har kommerciel licens til (f.eks. LessonCraftStudio)\n- Google Fonts (alle har åben licens)\n\n**ALDRIG brug uden licens:**\n- Disney, Marvel, Pokémon eller andre kendte karakterer\n- Andres arbejdsark eller designs (heller ikke modificerede)\n- Stock-fotos uden kommerciel licens\n- Fonte med restriktive licenser\n- Screenshots fra bøger eller websider'],
    ['Beskyttelse af dine produkter', 'Praktiske trin til at beskytte dine produkter:\n\n1. **Copyright-notice i alle PDF-filer:** "© 2026 [Dit Navn/Firmanavn]. Alle rettigheder forbeholdes."\n2. **Vandmærke på preview-billeder:** Forhindrer direkte kopiering fra Etsy-listinger\n3. **Metadata i PDF:** Indlejr dit navn og copyright i PDF-dokumentets metadata\n4. **Terms of Use side:** Inkludér en side med brugsvilkår i hver download\n5. **Dokumentation:** Gem daterede kopier af dine originale designs\n\nHvis du opdager kopiering:\n- Tag screenshots som bevis\n- Indsend DMCA-takedown via Etsys system\n- Kontakt en advokat for alvorlige overtrædelser'],
    ['Internationale aspekter', 'Som dansk sælger på Etsy opererer du internationalt:\n\n**Berne-konventionen:** Dansk ophavsret er anerkendt i de fleste lande. Dit copyright gælder automatisk i USA, EU og 170+ andre lande.\n\n**DMCA (USA):** Etsys takedown-system følger den amerikanske DMCA-lovgivning. Du kan indsende takedowns mod amerikanske og internationale sælgere.\n\n**EU-ophavsretsdirektivet:** Ekstra beskyttelse inden for EU. Platforme som Etsy har ansvar for at fjerne krænkende indhold.\n\n**Amazon KDP:** Amazon har sit eget copyright-klagesystem. Du kan rapportere kopierede bøger direkte.\n\nDin vigtigste beskyttelse er at skabe originalt indhold. Jo mere unikt dit produkt er, jo lettere er det at bevise overtrædelser.'],
    ['Ophavsret og AI-genereret indhold', 'AI-genereret indhold rejser nye ophavsretsspørgsmål:\n\n**Nuværende status (2026):**\n- AI-genererede billeder har uklart ophavsretsstatus\n- Mange jurisdiktioner kræver menneskelig kreativitet for ophavsretsbeskyttelse\n- Ren AI-output kan muligvis ikke beskyttes med copyright\n\n**Hvad det betyder for dig:**\n- Brug generatorer der tilføjer menneskeligt design (som LessonCraftStudio)\n- Tilpas og tilføj dine egne elementer til AI-genereret indhold\n- Dokumentér din kreative proces\n\n**Bedste praksis:**\n- Brug LessonCraftStudios generatorer, hvor designet er menneskeligt skabt og licenseret\n- Tilføj dine egne tilpasninger (temavalg, layout, indhold)\n- Kombinér genereret materiale med originale elementer\n\nMed en kommerciel licens fra LessonCraftStudio er din juridiske position klar: du har ret til at sælge de produkter, du opretter med generatoren.'],
  ],
  ['Ophavsret er automatisk i Danmark — ingen registrering nødvendig', 'Brug ALDRIG kendte karakterer, andres designs eller ulicenseret materiale', 'Inkludér copyright-notice og vandmærker i alle produkter', 'Berne-konventionen beskytter dit danske copyright internationalt', 'Kommerciel licens fra generatorudbyder klargør din juridiske position'],
  [['Skal jeg registrere copyright i Danmark?', 'Nej. Dansk ophavsret er automatisk ved skabelse. Du behøver ikke registrere noget. Dog er det god praksis at inkludere © og gemme daterede kopier af dine originale filer som bevis.'],
   ['Hvad gør jeg, hvis nogen kopierer mit produkt?', 'Indsend en DMCA-takedown via Etsys system (eller Amazons for KDP). Tag screenshots som bevis. Etsy fjerner typisk krænkende listings inden for 48 timer. For gentagne overtrædelser kan du kontakte en advokat.'],
   ['Er det lovligt at sælge arbejdsark der ligner andres?', 'At ligne er ikke det samme som at kopiere. Du må gerne sælge additions-arbejdsark, selvom andre også gør det — formatet er ikke ophavsretsbeskyttet. Men du må ikke kopiere specifikt design, layout eller indhold fra et konkret produkt.']],
  [['app', 'addition-arbejdsark', 'Additions-Generator (licenseret)'],
   ['app', 'ordsoegning-arbejdsark', 'Ordsøgning Generator'],
   ['app', 'krydsord-arbejdsark', 'Krydsord Generator']],
  [['saelg-additions-arbejdsark-etsy-guide', 'Sælg Additions-Arbejdsark på Etsy'],
   ['ordsoegning-printables-fortjeneste', 'Ordsøgning-Printables med Fortjeneste'],
   ['matematikark-pakker-der-saelger', 'Matematikark-Pakker Der Sælger']],
  'Opret Licenserede Printable-Produkter',
  'LessonCraftStudios kommercielle licens giver dig ret til ubegrænset salg. Prøv gratis med vandmærke.',
  'Prøv Generatorerne'
);

console.log('Batch 3 done:', n, 'files. Total:', fs.readdirSync(DIR).filter(f=>f.endsWith('.ts')).length);
