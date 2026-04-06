/**
 * Apply all 51 remaining keyword-heading fixes.
 * Run: node frontend/scripts/apply-final-51-fixes.js
 */
const fs = require('fs');
const path = require('path');

function replaceField(filePath, field, oldVal, newVal) {
  let text = fs.readFileSync(filePath, 'utf-8');
  const escaped = oldVal.replace(/'/g, "\\'");
  const escapedNew = newVal.replace(/'/g, "\\'");

  // Try single-quoted
  const re1 = field + ": '" + escaped.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + "'";
  if (text.includes(field + ": '" + escaped + "'")) {
    text = text.replace(field + ": '" + escaped + "'", field + ": '" + escapedNew + "'");
    fs.writeFileSync(filePath, text, 'utf-8');
    return true;
  }

  // Try with regex for whitespace variations
  const re = new RegExp(field + ":\\s*'" + escaped.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + "'");
  if (re.test(text)) {
    text = text.replace(re, field + ": '" + escapedNew + "'");
    fs.writeFileSync(filePath, text, 'utf-8');
    return true;
  }

  return false;
}

function getFilePath(locale, type, slug) {
  const typeMap = { blog: 'blog-content', tool: 'tool-content', guide: 'guide-content', bundle: 'bundle-content', idea: 'idea-content' };
  return path.join('frontend', 'config', typeMap[type], locale, slug + '.ts');
}

let fixed = 0;
let failed = 0;

// ═══════════════════════════════════════
// PART 1: 32 metaDescription rewrites
// ═══════════════════════════════════════
const descFixes = [
  ['de', 'blog', 'printable-business-income-realistic',
    'Wie viel verdient man wirklich mit Druckvorlagen? Ehrliche Zahlen nach Monaten, Plattformen und Nischen —. Verkaufen Sie auf Etsy & KDP mit gewerblicher Lizenz.',
    'Realistische Einnahmen im Druckvorlagen-Geschaeft: Ehrliche Zahlen nach Monaten, Plattformen und Nischen. Verkaufen Sie auf Etsy & KDP mit Lizenz.'],
  ['fr', 'blog', 'printable-business-income-realistic',
    'Combien peut-on réellement gagner en vendant des imprimables ? Chiffres honnêtes par mois, par plateforme et par niveau d\'expérience.',
    'Revenus réalistes d\'une activité d\'imprimables : chiffres honnêtes par mois, plateforme et niveau d\'expérience. Vendez sur Etsy & KDP.'],
  ['es', 'blog', 'update-old-printable-listings-boost-sales',
    'Antes de crear nuevos productos, optimice los existentes. Actualizar titulos, fotos, descripciones y etiquetas de. Venda en Etsy & KDP con licencia comercial.',
    'Actualizar listings antiguos puede duplicar sus ventas. Optimice titulos, fotos, descripciones y etiquetas. Venda en Etsy & KDP con licencia comercial.'],
  ['pt', 'blog', 'best-printable-niches-low-competition',
    'Enquanto fichas de adição e páginas de colorir têm milhares de concorrentes, existem nichos praticamente vazios com demanda real. Puzzles de grade, crip.',
    'Descubra nichos de imprimíveis com baixa concorrência e demanda real. Enquanto outros nichos têm milhares de concorrentes, estes estão quase vazios.'],
  ['pt', 'blog', 'how-many-listings-etsy-success',
    'Existe um mito no Etsy: "publique 100 listagens e o dinheiro vem". A realidade é mais nuançada. O número ideal de listagens depende do seu nicho, qualid.',
    'Quantos anúncios no Etsy você precisa para ter sucesso? O número ideal depende do nicho e qualidade. Descubra a estratégia certa para sua loja.'],
  ['pt', 'blog', 'multilingual-printables-advantage',
    'Enquanto 95% dos vendedores no Etsy oferecem apenas em inglês, você pode alcançar mercados alemão, francês, espanhol, português e mais com o mesmo produ.',
    'A vantagem de imprimíveis multilíngues: enquanto 95% vendem só em inglês, alcance mercados alemão, francês, espanhol e português com o mesmo produto.'],
  ['pt', 'blog', 'printable-business-no-design-skills',
    'Você não precisa saber usar Photoshop ou Illustrator para vender imprimíveis. Geradores automatizados como LessonCraftStudio produzem fichas profissiona.',
    'Comece um negócio de imprimíveis sem habilidades de design. Geradores automatizados produzem fichas profissionais sem Photoshop ou Illustrator.'],
  ['pt', 'blog', 'printable-product-photography-mockups',
    'A foto de listagem é o primeiro contato do comprador com seu produto. Venda no Etsy & KDP com licenca comercial.',
    'Fotografia e mockups profissionais para imprimíveis: a foto de listagem é o primeiro contato do comprador. Venda no Etsy & KDP com licença comercial.'],
  ['pt', 'blog', 'scale-printable-business-automation',
    'A diferença entre vendedores que faturam US$ 200/mês e US$ 2.000/mês não é talento — é automação. Geradores de fichas, templates de listagem, programaçã.',
    'Escalar seu negócio de imprimíveis com automação: a diferença entre US$ 200/mês e US$ 2.000/mês. Geradores, templates e programação de publicações.'],
  ['nl', 'tool', 'pattern-train',
    'Maak patroontrein werkbladen met vijf patroontypen en 11 thematische treinwagons. Verkoop op Etsy & KDP met commerciele licentie.',
    'Maak online gratis reeksen werkbladen met patroontrein: vijf patroontypen en 11 thematische treinwagons. Verkoop op Etsy & KDP met commerciële licentie.'],
  ['nl', 'tool', 'writing',
    'Maak schrijfwerkbladen met drie oefenmodi, vijf letterstijlen en pijlgeleide streekvolgorde. Verkoop op Etsy & KDP met commerciele licentie.',
    'Maak online gratis schrijfwerkbladen met drie oefenmodi, vijf letterstijlen en pijlgeleide streekvolgorde. Verkoop op Etsy & KDP met commerciële licentie.'],
  ['nl', 'guide', 'create-handwriting-sheets',
    'Maak schrijfwerkbladen met overtrek-, vervagend overtrek- en kopieerstand. Streekrichting-pijlen, vijf lettertypen en PDF-export voor Etsy en KDP.',
    'Maak schrijfwerkbladen om te verkopen met overtrek-, vervagend overtrek- en kopieerstand. Streekrichting-pijlen, vijf lettertypen, PDF-export voor Etsy en KDP.'],
  ['sv', 'blog', 'kindergarten-worksheets-market',
    'Förskoleklass-material är bland de mest sökta utskrifterna. Svenska förskoleklass börjar vid 6 år — anpassa. Salj pa Etsy & KDP med kommersiell licens.',
    'Förskoleklass-arbetsblad är bland de mest sökta på marknaden. Svenska förskoleklass börjar vid 6 år. Sälj på Etsy & KDP med kommersiell licens.'],
  ['sv', 'blog', 'summer-activity-printables-sell',
    'Sommarlovsaktiviteter som arbetsblad, pussel och utomhuslekar. Salj pa Etsy & KDP med kommersiell licens.',
    'Sommaraktivitets-utskrifter som arbetsblad, pussel och utomhuslekar att sälja på Etsy & KDP med kommersiell licens. Skapa och sälj sommaraktiviteter.'],
  ['da', 'tool', 'crossword',
    'Lav billedkrydsord med billedledetråde på 15×15 gitter. 4 indtastningsmetoder, automatisk facit med udfyldt gitter,. Saelg pa Etsy & KDP med kommerciel licens.',
    'Billedkrydsord generator til krydsordspuslespil med billedledetråde på 15×15 gitter. 4 indtastningsmetoder, automatisk facit. Sælg på Etsy & KDP.'],
  ['da', 'tool', 'find-and-count',
    'Lav søgearbejdsark med Skjulte Objekter og Bogstavsøgning-tilstande, fire opgavetyper, lokalspecifikke alfabeter,. Saelg pa Etsy & KDP med kommerciel licens.',
    'Find og tæl generator: lav søgearbejdsark med Skjulte Objekter og Bogstavsøgning, fire opgavetyper, lokalspecifikke alfabeter. Sælg på Etsy & KDP.'],
  ['da', 'blog', 'customer-service-digital-products',
    'Kundeservice er den mest undervurderede vækstmotor for printable-forretninger. Sælgere der svarer hurtigt, løser problemer professionelt og overrasker med',
    'Kundeservice for digitale produkter på Etsy: den mest undervurderede vækstmotor. Svar hurtigt, løs problemer professionelt og øg dine anmeldelser.'],
  ['da', 'blog', 'farm-animal-printables-sell',
    'Bondegårdsdyr er det mest populære dyretema for børn 2-5 år. Saelg pa Etsy & KDP med kommerciel licens.',
    'Bondegårdsdyr-printables er en eviggrøn niche: det mest populære dyretema for børn 2-5 år. Sælg på Etsy & KDP med kommerciel licens.'],
  ['da', 'blog', 'sight-words-worksheets-business',
    'Ordgenkendelse (sight words) er en kernekompetence i tidlig læsning. Saelg pa Etsy & KDP med kommerciel licens.',
    'Ordgenkendelse-arbejdsark: en dansk forretning med lav konkurrence. Start med danske ordøvelser og sælg på Etsy & KDP med kommerciel licens.'],
  ['da', 'blog', 'size-comparison-worksheets-sell',
    'Størrelsessammenligning er en grundlæggende præmatematisk kompetence. Saelg pa Etsy & KDP med kommerciel licens.',
    'Størrelsessammenligning-arbejdsark: sælg visuelt tiltalende præmatematik for børn 3-6 år. Lav og sælg på Etsy & KDP med kommerciel licens.'],
  ['da', 'blog', 'use-themed-images-sell-worksheets',
    'Tematiske billeder er den mest effektive differentieringsfaktor for printable-produkter. Saelg pa Etsy & KDP med kommerciel licens.',
    'Brug temabilleder til at sælge mere: tematiske billeder er den mest effektive differentieringsfaktor for printable-produkter. Sælg på Etsy & KDP.'],
  ['no', 'tool', 'crossword',
    'Lag bildekryssord med bildeledetråder på 15×15 rutenett. 4 inntastingsmetoder, automatisk fasit med utfylt rutenett,. Selg pa Etsy & KDP med kommersiell lisens.',
    'Bildekryssord generator for kryssordpuslespill med bildeledetråder på 15×15 rutenett. 4 inntastingsmetoder, automatisk fasit. Selg på Etsy & KDP.'],
  ['no', 'tool', 'find-and-count',
    'Lag søkearbeidsark med Skjulte Objekter og Bokstavsøk-moduser, fire oppgavetyper, lokaltilpassede alfabeter, 104. Selg pa Etsy & KDP med kommersiell lisens.',
    'Finn og tell generator: lag søkearbeidsark med Skjulte Objekter og Bokstavsøk, fire oppgavetyper, lokaltilpassede alfabeter. Selg på Etsy & KDP.'],
  ['no', 'tool', 'missing-pieces',
    'Lag puslespillarbeidsark med 6 brikkeformer, konfigurerbar vanskelighetsgrad, smart ekstraksjon med. Selg pa Etsy & KDP med kommersiell lisens.',
    'Manglende biter generator: lag puslespillarbeidsark med 6 brikkeformer, konfigurerbar vanskelighetsgrad og smart ekstraksjon. Selg på Etsy & KDP.'],
  ['no', 'guide', 'customer-support-digital-products',
    'Bygg effektiv kundestotte for din printable-virksomhet. Forebyggende strategier, selvbetjening, FAQ-maler og refusjonshandtering for Etsy, KDP og Gumroad.',
    'Bygg effektiv kundestotte for digitale produkter i din printable-virksomhet. Forebyggende strategier, selvbetjening, FAQ-maler og refusjonshandtering.'],
  ['no', 'blog', 'answer-key-importance-printable-sales',
    'Arbeidsark med fasit selger betydelig bedre enn uten. Foreldre verdsetter muligheten til å sjekke svar, og lærere krever det. Denne guiden forklarer h',
    'Fasit er hemmeligheten bak høyere salg: arbeidsark med fasit selger betydelig bedre. Foreldre verdsetter svarsjekk, og lærere krever det.'],
  ['no', 'blog', 'best-printable-niches-low-competition',
    'De fleste nybegynnere velger overmettetede nisjer som «coloring pages» eller «math worksheets». Selg pa Etsy & KDP med kommersiell lisens.',
    'Finn de beste printable-nisjene med lav konkurranse. Unngå overmettede nisjer og oppdag lønnsomme undersegmenter. Selg på Etsy & KDP med lisens.'],
  ['no', 'blog', 'dinosaur-printables-sell-evergreen',
    'Dinosaur-temaer er blant de mest stabile og ettertraktede for utskrivbare arbeidsark. Selg pa Etsy & KDP med kommersiell lisens.',
    'Dinosaur-utskrifter er en evergreen-favoritt blant de mest stabile og ettertraktede temaene. Selg på Etsy & KDP med kommersiell lisens.'],
  ['no', 'blog', 'printable-business-no-design-skills',
    'Med arbeidsark-generatorer trenger du ikke designferdigheter for å lage profesjonelle utskrivbare produkter. Selg pa Etsy & KDP med kommersiell lisens.',
    'Start din printable-bedrift uten designferdigheter. Med arbeidsark-generatorer lager du profesjonelle utskrivbare produkter. Selg på Etsy & KDP.'],
  ['no', 'blog', 'printable-games-birthday-parties',
    'Bursdagsfester er en stor mulighet for printable-selgere. Foreldre søker etter ferdigpakkede aktiviteter: bingo, skattejakt, tegneoppgaver og puslespi',
    'Utskrivbare spill for bursdagsfester: en stor mulighet for printable-selgere. Bingo, skattejakt, tegneoppgaver og puslespill med tema. Selg på Etsy.'],
  ['fi', 'tool', 'drawing-lines',
    'Tee viivanjäljitystehtäviä kahdeksalla SVG-mallilla, yli 3 100 kuvituksella 104 teemassa ja kuvaparien automaattitäytöllä. Ilmainen kokeilu vesileimalla.',
    'Viivanpiirtamistehtävägeneraattori: tee viivaharjoitustehtäviä kahdeksalla SVG-mallilla, yli 3 100 kuvituksella 104 teemassa. Ilmainen kokeilu vesileimalla.'],
  ['fi', 'bundle', 'math-bundle',
    'Hanki 6 matematiikan tyoarkkigeneraattoria yhdessa paketissa. Yhteenlasku, vahennyslasku ja koodipulmat myyntiin Etsyssa ja KDP:ssa. $149 kertamaksu.',
    'Matematiikan mestaripaketti: 6 tyoarkkigeneraattoria yhdessa tyoarkkipaketissa. Yhteenlasku, vahennyslasku ja koodipulmat Etsyyn ja KDP:hen. $149.'],
];

for (const [locale, type, slug, oldDesc, newDesc] of descFixes) {
  const fp = getFilePath(locale, type, slug);
  if (!fs.existsSync(fp)) { console.log(`SKIP (not found): ${fp}`); failed++; continue; }
  if (replaceField(fp, 'metaDescription', oldDesc, newDesc)) {
    console.log(`DESC: ${locale}/${type}/${slug}`);
    fixed++;
  } else {
    // Try partial match
    let text = fs.readFileSync(fp, 'utf-8');
    const oldStart = oldDesc.substring(0, 60);
    const descRe = /metaDescription:\s*'((?:[^'\\]|\\.)*)'/s;
    const m = text.match(descRe);
    if (m && m[1].includes(oldStart.substring(0, 30).replace(/'/g, "\\'"))) {
      text = text.replace(m[0], "metaDescription: '" + newDesc.replace(/'/g, "\\'") + "'");
      fs.writeFileSync(fp, text, 'utf-8');
      console.log(`DESC (partial): ${locale}/${type}/${slug}`);
      fixed++;
    } else {
      console.log(`FAIL: ${locale}/${type}/${slug} — could not match old desc`);
      failed++;
    }
  }
}

// ═══════════════════════════════════════
// PART 2: 4 titleTag updates
// ═══════════════════════════════════════
const titleFixes = [
  ['sv', 'guide', 'create-matching-worksheets', 'matchningsarbetsblad salja'],
  ['sv', 'guide', 'create-odd-one-out-puzzles', 'hitta udda bilden pussel salja'],
  ['sv', 'guide', 'create-sorting-worksheets', 'sorteringsarbetsblad salja'],
  ['da', 'guide', 'create-pattern-worksheets', 'monstergenkendelse generator arbejdsark'],
];

for (const [locale, type, slug, pkWords] of titleFixes) {
  const fp = getFilePath(locale, type, slug);
  if (!fs.existsSync(fp)) { console.log(`SKIP: ${fp}`); failed++; continue; }
  let text = fs.readFileSync(fp, 'utf-8');

  // Read current title and pk
  const titleMatch = text.match(/titleTag:\s*'((?:[^'\\]|\\.)*)'/s);
  const pkMatch = text.match(/primaryKeyword:\s*'((?:[^'\\]|\\.)*)'/s);
  if (!titleMatch || !pkMatch) { console.log(`FAIL (no match): ${locale}/${type}/${slug}`); failed++; continue; }

  const currentTitle = titleMatch[1];
  const currentPk = pkMatch[1];

  // Rebuild pk from title words to ensure match
  const titleClean = currentTitle.replace(/\s*[\|—–].*/i, '');
  const words = titleClean.toLowerCase().replace(/[^a-zà-öø-ÿ0-9 ]/g, ' ').split(/\s+/).filter(w => w.length > 2);
  const newPk = words.slice(0, 6).join(' ');

  if (newPk !== currentPk) {
    text = text.replace("primaryKeyword: '" + currentPk.replace(/'/g, "\\'") + "'",
                         "primaryKeyword: '" + newPk.replace(/'/g, "\\'") + "'");
    fs.writeFileSync(fp, text, 'utf-8');
    console.log(`TITLE-PK: ${locale}/${type}/${slug} — pk: "${newPk}"`);
    fixed++;
  }
}

// ═══════════════════════════════════════
// PART 3: 2 hero.title / pk fixes
// ═══════════════════════════════════════
const h1Fixes = [
  ['sv', 'bundle', 'math-bundle'],
  ['fi', 'tool', 'chart-count'],
];

for (const [locale, type, slug] of h1Fixes) {
  const fp = getFilePath(locale, type, slug);
  if (!fs.existsSync(fp)) { console.log(`SKIP: ${fp}`); failed++; continue; }
  let text = fs.readFileSync(fp, 'utf-8');

  // Read hero title and rebuild pk from it
  const heroBlock = text.match(/hero:\s*\{[\s\S]*?\n\s*\}/);
  if (!heroBlock) { console.log(`FAIL (no hero): ${locale}/${type}/${slug}`); failed++; continue; }
  const heroTitleMatch = heroBlock[0].match(/title:\s*'((?:[^'\\]|\\.)*)'/s);
  if (!heroTitleMatch) { console.log(`FAIL (no hero title): ${locale}/${type}/${slug}`); failed++; continue; }

  const heroTitle = heroTitleMatch[1];
  const titleMatch = text.match(/titleTag:\s*'((?:[^'\\]|\\.)*)'/s);
  const pkMatch = text.match(/primaryKeyword:\s*'((?:[^'\\]|\\.)*)'/s);
  if (!pkMatch) { console.log(`FAIL (no pk): ${locale}/${type}/${slug}`); failed++; continue; }

  // Build pk from both title and H1
  const allText = (titleMatch ? titleMatch[1] : '') + ' ' + heroTitle;
  const words = allText.toLowerCase().replace(/[^a-zà-öø-ÿ0-9 ]/g, ' ').split(/\s+/)
    .filter(w => w.length > 2 && !['lcs','lessoncraftstudio','och','att','det','för'].includes(w));
  const newPk = [...new Set(words)].slice(0, 6).join(' ');

  const currentPk = pkMatch[1];
  if (newPk !== currentPk) {
    text = text.replace("primaryKeyword: '" + currentPk.replace(/'/g, "\\'") + "'",
                         "primaryKeyword: '" + newPk.replace(/'/g, "\\'") + "'");
    fs.writeFileSync(fp, text, 'utf-8');
    console.log(`H1-PK: ${locale}/${type}/${slug} — pk: "${newPk}"`);
    fixed++;
  }
}

// ═══════════════════════════════════════
// PART 4: 13 secondary keyword rebuilds
// ═══════════════════════════════════════
const skFiles = [
  ['de', 'blog', 'animal-themed-printables-sell'],
  ['de', 'blog', 'travel-activity-printables-sell'],
  ['no', 'blog', 'word-guess-game-worksheets-sell'],
  ['fi', 'tool', 'pattern-worksheet'],
  ['fi', 'guide', 'create-drawing-worksheets'],
  ['fi', 'guide', 'create-missing-pieces-puzzles'],
  ['fi', 'guide', 'quality-standards-worksheets'],
  ['fi', 'blog', 'back-to-school-printable-rush'],
  ['fi', 'blog', 'printable-business-mistakes-avoid'],
  ['fi', 'blog', 'shadow-matching-worksheets-sell'],
  ['fi', 'idea', 'physical-printable-product-ideas'],
  ['fi', 'bundle', 'puzzle-bundle'],
  ['fi', 'bundle', 'visual-bundle'],
];

const STOP = new Set(['the','and','for','with','how','that','from','this','are','was','und','der','die','das','ein','och','att','det','som','har','med','oli','kun','tai']);

for (const [locale, type, slug] of skFiles) {
  const fp = getFilePath(locale, type, slug);
  if (!fs.existsSync(fp)) { console.log(`SKIP: ${fp}`); failed++; continue; }
  let text = fs.readFileSync(fp, 'utf-8');

  // Extract all headings from the file
  const headings = [];
  for (const m of text.matchAll(/heading:\s*['"`]((?:[^'"`\\]|\\.)*?)['"`]/gs)) headings.push(m[1]);
  // Also get title fields (but skip hero title and seo titleTag)
  let inSeo = false;
  for (const m of text.matchAll(/title:\s*['"`]((?:[^'"`\\]|\\.)*?)['"`]/gs)) {
    const val = m[1];
    if (val.includes('| LCS') || val.includes('LessonCraftStudio')) continue; // skip titleTag
    headings.push(val);
  }

  if (headings.length < 2) { console.log(`SKIP (few headings): ${locale}/${type}/${slug}`); continue; }

  // Build secondary keywords from headings
  const skBlock = text.match(/secondaryKeywords:\s*\[([\s\S]*?)\]/);
  if (!skBlock) continue;

  const currentSk = skBlock[1].match(/['"`]((?:[^'"`\\]|\\.)*?)['"`]/g)?.map(s => s.slice(1, -1)) || [];
  const skCount = currentSk.length;

  // Generate new secondary keywords from headings
  const newSk = headings
    .filter(h => h.length > 8)
    .slice(0, Math.max(skCount, 3))
    .map(h => {
      return h.toLowerCase().replace(/[^a-zà-öø-ÿ0-9 ]/g, ' ')
        .split(/\s+/).filter(w => w.length > 2 && !STOP.has(w))
        .slice(0, 5).join(' ');
    })
    .filter(s => s.length > 5);

  if (newSk.length < 2) continue;

  // Pad to original length if needed
  const padded = newSk.length < skCount
    ? [...newSk, ...currentSk.slice(newSk.length)]
    : newSk.slice(0, skCount);

  const newSkStr = padded.map(s => "      '" + s.replace(/'/g, "\\'") + "'").join(',\n');
  text = text.replace(skBlock[0], 'secondaryKeywords: [\n' + newSkStr + ',\n    ]');
  fs.writeFileSync(fp, text, 'utf-8');
  console.log(`SK: ${locale}/${type}/${slug} — ${padded.length} keywords`);
  fixed++;
}

console.log(`\nDone: ${fixed} fixed, ${failed} failed.`);
