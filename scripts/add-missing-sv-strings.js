const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'frontend', 'config', 'showcase-i18n.ts');
let c = fs.readFileSync(file, 'utf8');

// New Swedish translations for missing strings
const newEntries = {
  // Single-word/short pills
  'Any Theme': 'Valfritt tema',
  'Custom Words': 'Egna ord',
  'Spelling Skills': 'Stavningsfärdigheter',
  'Logic Skills': 'Logikfärdigheter',
  'Engaging': 'Engagerande',
  'Vocabulary': 'Ordförråd',
  'Traceable': 'Spårbar',
  'All Letters': 'Alla bokstäver',
  'Grammar': 'Grammatik',
  'Size Concepts': 'Storleksbegrepp',
  'Pattern Skills': 'Mönsterfärdigheter',
  'Engaging Theme': 'Engagerande tema',
  'Critical Thinking': 'Kritiskt tänkande',
  'Art Skills': 'Konstfärdigheter',
  'Progressive': 'Progressiv',
  'Data Skills': 'Datafärdigheter',
  'Cognitive Skills': 'Kognitiva färdigheter',
  'Logic': 'Logik',
  'Visual Thinking': 'Visuellt tänkande',
  'Observation': 'Observation',
  'Fun Challenge': 'Rolig utmaning',
  'Group Fun': 'Gruppkul',
  'Callouts Included': 'Uppropskort inkluderade',
  'Classification': 'Klassificering',
  'Brain Training': 'Hjärnträning',
  '3 Difficulties': '3 svårighetsgrader',
  'Navigation': 'Navigering',
  'Fun Themes': 'Roliga teman',
  'Counting': 'Räkning',
  'Themed Scenes': 'Tematiska scener',
  'Detailed Scenes': 'Detaljerade scener',
  'Adventure': 'Äventyr',
  'Number Sense': 'Taluppfattning',
  'Comprehensive': 'Omfattande',
  'Challenging': 'Utmanande',
  'Phonics': 'Fonetik',
  'Fun Theme': 'Roligt tema',
  'Multiple Themes': 'Flera teman',
  'Worksheet': 'Arbetsblad',
  'Activity Page': 'Aktivitetssida',
  'Practice Sheet': 'Övningsblad',
  'Solutions': 'Lösningar',
  'Find Subtrahend': 'Hitta subtrahend',
  'Code Puzzle': 'Kodpussel',
  'More or Less': 'Mer eller mindre',
  'Bingo Card': 'Bingokort',
  'Callout Sheet': 'Uppropskort',
  'Zero Prep Time': 'Noll förberedelsetid',
  'Full Solutions': 'Fullständiga lösningar',

  // Trophy texts (long strings)
  'Every child can succeed at their own pace': 'Varje barn kan lyckas i sin egen takt',
  'Build confidence with every problem solved': 'Bygg förtroende med varje löst uppgift',
  'Professional quality at every difficulty level': 'Professionell kvalitet på varje svårighetsnivå',
  'Progress at your own pace with visual math': 'Avancera i din egen takt med visuell matte',
  'Every code cracked builds math confidence': 'Varje knäckt kod bygger matteförtroende',
  'Every code cracked sharpens critical thinking': 'Varje knäckt kod skärper kritiskt tänkande',
  'Crack every code and sharpen math skills': 'Knäck varje kod och skärp mattekunnandet',
  'Comparison skills build math foundations': 'Jämförelsefärdigheter bygger mattegrunder',
  'Strong comparison skills fuel math success': 'Starka jämförelsefärdigheter driver matteframgång',
  'Size comparison builds math foundations': 'Storleksjämförelse bygger mattegrunder',
  'Size comparison lays the groundwork for measurement': 'Storleksjämförelse lägger grunden för mätning',
  'Algebraic thinking starts with pictures': 'Algebraiskt tänkande börjar med bilder',
  'Building algebraic thinking from the start': 'Bygga algebraiskt tänkande från start',
  'Coloring builds focus and creativity': 'Färgläggning bygger fokus och kreativitet',
  'Coloring develops focus, creativity, and motor skills': 'Färgläggning utvecklar fokus, kreativitet och motorik',
  'Crosswords build vocabulary and spelling': 'Korsord bygger ordförråd och stavning',
  'Crosswords strengthen spelling and vocabulary': 'Korsord stärker stavning och ordförråd',
  'Decoding builds critical thinking and focus': 'Avkodning bygger kritiskt tänkande och fokus',
  'Every drawing builds fine motor skills': 'Varje ritning bygger finmotorik',
  'Every letter is an adventure on the train': 'Varje bokstav är ett äventyr på tåget',
  'Every letter practiced builds writing confidence': 'Varje övad bokstav bygger skrivförtroende',
  'Every puzzle solved reveals something amazing': 'Varje löst pussel avslöjar något fantastiskt',
  'Every solved puzzle reveals something special': 'Varje löst pussel avslöjar något speciellt',
  'Every treasure found builds problem-solving skills': 'Varje hittad skatt bygger problemlösning',
  'Every word guessed builds reading confidence': 'Varje gissat ord bygger läsförtroende',
  'Every word guessed strengthens reading skills': 'Varje gissat ord stärker läsförmågan',
  'Every word unscrambled builds spelling skills': 'Varje utrett ord bygger stavningsfärdigheter',
  'Finding and counting builds attention to detail': 'Att hitta och räkna bygger uppmärksamhet på detaljer',
  'Finding outliers strengthens analytical thinking': 'Att hitta avvikare stärker analytiskt tänkande',
  'Finding the odd one out builds classification skills': 'Att hitta den udda bygger klassificeringsfärdigheter',
  'Finding words sharpens vocabulary and focus': 'Att hitta ord skärper ordförråd och fokus',
  'Grid drawing sharpens observation and motor skills': 'Rutnätsritning skärper observation och motorik',
  'Grid matching builds spatial reasoning skills': 'Rutnätsmatchning bygger rumsligt resonemang',
  'Grid matching develops spatial intelligence': 'Rutnätsmatchning utvecklar rumslig intelligens',
  'Letter by letter, the train rolls to reading': 'Bokstav för bokstav rullar tåget mot läsning',
  'Line practice prepares children for writing': 'Linjeövning förbereder barn för skrivning',
  'Line skills pave the way to confident writing': 'Linjefärdigheter banar väg för säker skrivning',
  'Master take-away concepts through pictures': 'Behärska subtraktionbegrepp genom bilder',
  'Matching builds vocabulary and visual skills': 'Matchning bygger ordförråd och visuella färdigheter',
  'Matching strengthens vocabulary and visual memory': 'Matchning stärker ordförråd och visuellt minne',
  'Navigation skills build spatial intelligence': 'Navigeringsfärdigheter bygger rumslig intelligens',
  'Pattern mastery fuels mathematical reasoning': 'Mönsterbehärskning driver matematiskt resonemang',
  'Pattern recognition builds logical thinking': 'Mönsterigenkänning bygger logiskt tänkande',
  'Patterns are the foundation of mathematical thinking': 'Mönster är grunden för matematiskt tänkande',
  'Pathfinding builds problem-solving skills': 'Vägfinnande bygger problemlösning',
  'Pathfinding develops planning and logic': 'Vägfinnande utvecklar planering och logik',
  'Position words strengthen language and math': 'Positionsord stärker språk och matte',
  'Practice builds confident handwriting': 'Övning bygger säker handstil',
  'Puzzle solving builds observation skills': 'Pussellösning bygger observationsförmåga',
  'Puzzle solving sharpens visual attention': 'Pussellösning skärper visuell uppmärksamhet',
  'Recognizing patterns powers logical thinking': 'Att känna igen mönster driver logiskt tänkande',
  'Search and count builds attention to detail': 'Sök och räkna bygger uppmärksamhet på detaljer',
  'Shadow matching sharpens visual skills': 'Skuggmatchning skärper visuella färdigheter',
  'Shadow matching trains visual discrimination': 'Skuggmatchning tränar visuell diskriminering',
  'Sharp observation powers every skill': 'Skarp observation driver varje färdighet',
  'Sorting builds critical thinking skills': 'Sortering bygger kritiskt tänkande',
  'Sorting builds the foundations of logical thinking': 'Sortering bygger grunden för logiskt tänkande',
  'Spatial words unlock better communication': 'Rumsord låser upp bättre kommunikation',
  'Spotting objects trains your brain': 'Att upptäcka objekt tränar hjärnan',
  'Sudoku builds logical reasoning skills': 'Sudoku bygger logiskt resonemang',
  'Sudoku builds systematic reasoning skills': 'Sudoku bygger systematiskt resonemang',
  'Unscrambling words builds spelling mastery': 'Att reda ut ord bygger stavningsbehärskning',
  'Word searching builds focus and vocabulary': 'Ordletning bygger fokus och ordförråd',
  'Bingo makes learning a celebration': 'Bingo gör lärande till fest',
  'Bingo turns vocabulary practice into a party': 'Bingo förvandlar ordförrådsövning till fest',
  'Data literacy starts with picture graphs': 'Dataförståelse börjar med bilddiagram',
  'Data skills start with picture graphs': 'Datafärdigheter börjar med bilddiagram',

  // App-specific labels
  'Size Sort': 'Storlekssortering',
  'Size Sorting': 'Storlekssortering',
  'Cryptogram': 'Kryptogram',
  'Word Scramble': 'Bokstavspussel',
  'Word Guess': 'Gissa Ordet',
  'Math Puzzle': 'Mattepussel',
  'Math Worksheet': 'Mattearbetsblad',
  'Code Addition': 'Kodaddition',
  'Big & Small': 'Stor & Liten',
  'Alphabet Train': 'Alfabetståg',
  'Odd One Out': 'Udda Fågeln',
  'Missing Pieces': 'Saknade Bitar',
  'Grid Match': 'Rutnätsmatchning',
  'Shadow Match': 'Skuggmatchning',
  'Draw & Color': 'Rita & Färglägg',
  'Draw Lines': 'Dra Linjer',
  'Drawing Lines': 'Rita Linjer',
  'Chart Count': 'Diagramräkning',
  'Find & Count': 'Hitta & Räkna',
  'Find Objects': 'Hitta Föremål',
  'Treasure Hunt': 'Skattjakt',
  'I Spy': 'Jag Ser',
  'Map Quest': 'Kartäventyr',
  'Pattern Train': 'Mönstertåg',
  'Tracing': 'Spårning',
  'Sorting': 'Sortering',
  'Prepositions': 'Prepositioner',

  // Tier descriptions
  'Simple picture counting with numbers 1-5': 'Enkelt bildräknande med siffror 1-5',
  'Medium difficulty with numbers 1-10': 'Medelsvårighet med siffror 1-10',
  'Advanced problems with larger numbers': 'Avancerade uppgifter med större tal',

  // Guide showcase headings
  'Differentiated Learning for Every Child': 'Differentierat lärande för varje barn',
  'Three difficulty tiers that grow with your students': 'Tre svårighetsnivåer som växer med dina elever',
  'Every worksheet — ready to print': 'Varje arbetsblad — redo att skriva ut',
  'Fun for All!': 'Kul för alla!',
  'Learning should feel like play': 'Lärande ska kännas som lek',

  // Additional pills seen in screenshots
  'Cut & Paste Ready': 'Klipp & Klistra redo',
  'Cut & Paste': 'Klipp & Klistra',
  'No Prep Needed': 'Ingen förberedelse behövs',
  'Variety Included': 'Variation inkluderad',
  'Themed Sets': 'Temauppsättningar',
  'Word Modes': 'Ordlägen',
  'Multiple Sizes': 'Flera storlekar',
  'Multiple Levels': 'Flera nivåer',
  'Full Access': 'Full Tillgång',
};

// Find svStringTable closing brace
const svStart = c.indexOf('const svStringTable');
const svBodyStart = c.indexOf('{', svStart);
const getStringTableIdx = c.indexOf('function getStringTable', svStart);
const closingBrace = c.lastIndexOf('};', getStringTableIdx);

// Build new entries string
const lines = Object.entries(newEntries).map(([k, v]) => {
  const ek = k.replace(/'/g, "\\'");
  const ev = v.replace(/'/g, "\\'");
  return `  '${ek}': '${ev}',`;
}).join('\n');

// Insert before the closing };
const before = c.substring(0, closingBrace);
const after = c.substring(closingBrace);

c = before + '\n  // ── Additional missing translations ──\n' + lines + '\n' + after;

fs.writeFileSync(file, c, 'utf8');
console.log(`Added ${Object.keys(newEntries).length} new entries to svStringTable`);
