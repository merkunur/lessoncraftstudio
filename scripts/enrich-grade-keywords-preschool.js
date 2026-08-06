/**
 * Part 6 - Enrich Preschool (50 entries) with LSI keywords, question keywords, and SERP table.
 * Run: node scripts/enrich-grade-keywords-preschool.js
 */
const fs = require('fs');
const path = require('path');

const FILE = path.join(__dirname, '..', 'docs', 'seo-keywords', 'en-theme-grade-pages.md');
const GRADE = 'Preschool';

const data = [
  { theme: 'Animals', lsi: ['fine motor tracing', 'animal habitats', 'sensory exploration', 'one-to-one counting', 'visual discrimination'], questions: ['What are the best animal worksheets for preschool-aged children?', 'How do animal-themed activities help preschoolers learn to count?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Food', lsi: ['nutrition basics', 'food groups', 'sensory play', 'classification skills', 'healthy eating habits'], questions: ['What food worksheets work best for preschool learners?', 'How can food sorting activities build early math skills in preschool?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Transportation', lsi: ['vehicle recognition', 'spatial awareness', 'hand-eye coordination', 'categorization skills', 'safety concepts'], questions: ['What vehicle worksheets are appropriate for preschool children?', 'How do transportation activities develop spatial awareness in preschoolers?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Nature', lsi: ['outdoor exploration', 'seasonal changes', 'plant growth', 'observation skills', 'sensory learning'], questions: ['What nature worksheets are best for preschool-aged learners?', 'How do nature observation activities support preschool development?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'School', lsi: ['classroom routines', 'social readiness', 'self-help skills', 'following directions', 'cooperative play'], questions: ['What school readiness worksheets prepare preschoolers for kindergarten?', 'How can school-themed activities build social skills in preschool?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Sports', lsi: ['gross motor skills', 'physical coordination', 'team concepts', 'movement patterns', 'body awareness'], questions: ['What sports worksheets are appropriate for preschool children?', 'How do sports-themed activities develop coordination in preschoolers?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Emotions', lsi: ['social-emotional learning', 'feeling identification', 'self-regulation', 'empathy building', 'facial expressions'], questions: ['What feelings worksheets help preschoolers identify emotions?', 'How can emotion-themed activities build empathy in preschool children?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Body', lsi: ['body awareness', 'hygiene habits', 'sensory input', 'physical development', 'self-care skills'], questions: ['What body parts worksheets are best for preschool-aged children?', 'How do body-themed activities teach self-care skills to preschoolers?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Clothing', lsi: ['dressing skills', 'seasonal clothing', 'fabric textures', 'self-help routines', 'attribute sorting'], questions: ['What clothing worksheets help preschoolers learn sorting skills?', 'How can clothing-themed activities teach preschoolers about seasons?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Household', lsi: ['room identification', 'object names', 'daily routines', 'safety awareness', 'functional vocabulary'], questions: ['What household worksheets are suitable for preschool children?', 'How do household matching activities develop vocabulary in preschoolers?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Toys', lsi: ['imaginative play', 'sharing skills', 'object sorting', 'size comparison', 'play-based learning'], questions: ['What toy-themed worksheets engage preschool-aged learners?', 'How do toy counting activities build number sense in preschoolers?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Music', lsi: ['rhythm awareness', 'sound discrimination', 'auditory skills', 'tempo concepts', 'instrument names'], questions: ['What music worksheets are appropriate for preschool children?', 'How do music matching activities develop listening skills in preschoolers?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Jobs', lsi: ['role play', 'community awareness', 'helper roles', 'dramatic play', 'social understanding'], questions: ['What community helper worksheets are best for preschool-aged children?', 'How do job-themed activities teach preschoolers about their community?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Space', lsi: ['star shapes', 'night sky', 'planet names', 'celestial objects', 'visual wonder'], questions: ['What space worksheets are appropriate for preschool learners?', 'How do space-themed counting activities engage preschool children?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Seasons', lsi: ['calendar concepts', 'weather changes', 'seasonal clothing', 'nature cycles', 'temporal awareness'], questions: ['What seasonal worksheets help preschoolers learn about the year?', 'How do seasonal sorting activities build classification skills in preschool?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Holidays', lsi: ['cultural traditions', 'festive crafts', 'celebration themes', 'seasonal events', 'family customs'], questions: ['What holiday worksheets are best for preschool-aged children?', 'How can holiday coloring activities develop fine motor skills in preschool?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Weather', lsi: ['temperature concepts', 'cloud types', 'precipitation', 'sunny and rainy', 'weather vocabulary'], questions: ['What weather worksheets are appropriate for preschool learners?', 'How do weather tracing activities build pre-writing skills in preschoolers?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Colors', lsi: ['primary colors', 'color mixing', 'hue recognition', 'crayon skills', 'visual sorting'], questions: ['What color worksheets are best for preschool-aged learners?', 'How do color sorting activities teach classification to preschoolers?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Shapes', lsi: ['basic geometry', 'shape names', 'spatial reasoning', 'pattern blocks', 'shape recognition'], questions: ['What shape tracing worksheets are best for preschool children?', 'How do shape activities build spatial reasoning in preschoolers?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Numbers', lsi: ['rote counting', 'number names', 'quantity matching', 'numeral formation', 'subitizing'], questions: ['What number tracing worksheets are best for preschool learners?', 'How do number activities build early math foundations in preschool?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Alphabet', lsi: ['letter names', 'uppercase letters', 'phonological awareness', 'alphabet songs', 'letter shapes'], questions: ['What letter tracing worksheets are best for preschool-aged children?', 'How do alphabet activities prepare preschoolers for reading readiness?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Furniture', lsi: ['room objects', 'spatial vocabulary', 'size concepts', 'functional items', 'home environment'], questions: ['What furniture worksheets help preschoolers learn room vocabulary?', 'How do furniture matching activities build spatial awareness in preschool?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Easter', lsi: ['spring season', 'egg hunt', 'pastel colors', 'bunny theme', 'seasonal crafts'], questions: ['What Easter worksheets are appropriate for preschool-aged children?', 'How do Easter egg sorting activities build counting skills in preschool?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA, Seasonal' },
  { theme: 'Halloween', lsi: ['costume dress-up', 'pumpkin shapes', 'fall season', 'spooky fun', 'trick or treat'], questions: ['What Halloween worksheets are safe and fun for preschool children?', 'How do Halloween tracing activities develop fine motor skills in preschool?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA, Seasonal' },
  { theme: 'Christmas', lsi: ['holiday traditions', 'gift giving', 'winter season', 'festive decorations', 'holiday songs'], questions: ['What Christmas worksheets are best for preschool-aged learners?', 'How do Christmas tracing activities prepare preschoolers for writing?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA, Seasonal' },
  { theme: 'Birds', lsi: ['feather textures', 'bird songs', 'nesting habits', 'bird colors', 'flight concepts'], questions: ['What bird worksheets are appropriate for preschool children?', 'How do bird sorting activities teach classification to preschoolers?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Birthday', lsi: ['party planning', 'age concepts', 'celebration themes', 'candle counting', 'special occasions'], questions: ['What birthday worksheets engage preschool-aged children?', 'How do birthday counting activities build number sense in preschool?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Camping', lsi: ['outdoor adventure', 'tent shapes', 'campfire safety', 'nature sounds', 'exploration play'], questions: ['What camping worksheets are appropriate for preschool learners?', 'How do camping matching activities build cognitive skills in preschool?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Circus', lsi: ['circus performers', 'bright colors', 'acrobatic shapes', 'clown faces', 'circus animals'], questions: ['What circus worksheets are best for preschool-aged children?', 'How do circus coloring activities develop fine motor skills in preschool?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Construction', lsi: ['building blocks', 'tool names', 'hard hat safety', 'construction vehicles', 'stacking skills'], questions: ['What construction worksheets are suitable for preschool children?', 'How do construction sorting activities develop problem-solving in preschool?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Cooking', lsi: ['kitchen safety', 'ingredient names', 'measuring tools', 'recipe steps', 'taste exploration'], questions: ['What cooking worksheets are appropriate for preschool-aged learners?', 'How do cooking sorting activities teach sequencing to preschoolers?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Dinosaurs', lsi: ['dinosaur names', 'fossil shapes', 'prehistoric creatures', 'size comparison', 'extinction concepts'], questions: ['What dinosaur worksheets are best for preschool children?', 'How do dinosaur tracing activities develop pencil control in preschoolers?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Fairy Tales', lsi: ['story characters', 'narrative sequence', 'magical elements', 'picture books', 'storytelling skills'], questions: ['What fairy tale worksheets are appropriate for preschool-aged children?', 'How do fairy tale matching activities build literacy skills in preschool?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Farm', lsi: ['farm animals', 'barn structures', 'crop names', 'farmer roles', 'tractor shapes'], questions: ['What farm worksheets are best for preschool learners?', 'How do farm animal sorting activities develop classification skills in preschool?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Flowers', lsi: ['petal counting', 'flower colors', 'plant parts', 'garden care', 'bloom stages'], questions: ['What flower worksheets are appropriate for preschool children?', 'How do flower tracing activities build fine motor skills in preschoolers?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Forest', lsi: ['woodland animals', 'tree types', 'forest sounds', 'leaf shapes', 'nature walks'], questions: ['What forest worksheets are best for preschool-aged learners?', 'How do forest matching activities teach observation skills to preschoolers?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Fruits', lsi: ['fruit names', 'taste exploration', 'healthy snacks', 'seed counting', 'fruit colors'], questions: ['What fruit worksheets are suitable for preschool children?', 'How do fruit matching activities build vocabulary in preschoolers?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Garden', lsi: ['planting seeds', 'watering routine', 'soil textures', 'garden tools', 'growing plants'], questions: ['What garden worksheets are appropriate for preschool learners?', 'How do garden sorting activities teach sequencing to preschool children?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Insects', lsi: ['bug identification', 'insect legs', 'butterfly wings', 'crawling movement', 'insect habitats'], questions: ['What insect worksheets are best for preschool-aged children?', 'How do insect matching activities develop observation skills in preschool?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Ocean', lsi: ['sea creatures', 'ocean waves', 'beach exploration', 'shell shapes', 'underwater world'], questions: ['What ocean worksheets are appropriate for preschool children?', 'How do ocean matching activities build sorting skills in preschoolers?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Pets', lsi: ['pet care routines', 'animal feeding', 'gentle handling', 'pet names', 'responsibility skills'], questions: ['What pet worksheets are best for preschool-aged learners?', 'How do pet matching activities teach responsibility to preschool children?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Pirates', lsi: ['treasure maps', 'pirate ships', 'gold coins', 'adventure play', 'compass directions'], questions: ['What pirate worksheets are appropriate for preschool children?', 'How do pirate tracing activities develop pre-writing skills in preschoolers?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Robots', lsi: ['robot shapes', 'button concepts', 'mechanical parts', 'building skills', 'geometric forms'], questions: ['What robot worksheets are suitable for preschool-aged children?', 'How do robot sorting activities develop shape recognition in preschool?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Spring', lsi: ['new growth', 'baby animals', 'rain showers', 'flower blooming', 'warm weather'], questions: ['What spring worksheets are best for preschool learners?', 'How do spring tracing activities support fine motor development in preschool?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA, Seasonal' },
  { theme: 'Summer', lsi: ['sunny days', 'beach activities', 'ice cream themes', 'water play', 'outdoor fun'], questions: ['What summer worksheets keep preschoolers learning during break?', 'How do summer matching activities prevent learning loss in preschool children?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA, Seasonal' },
  { theme: 'Superheroes', lsi: ['hero capes', 'super powers', 'bravery concepts', 'helping others', 'mask crafts'], questions: ['What superhero worksheets are appropriate for preschool-aged children?', 'How do superhero matching activities build social skills in preschool?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Travel', lsi: ['suitcase packing', 'map concepts', 'destination names', 'passport play', 'journey vocabulary'], questions: ['What travel worksheets are best for preschool children?', 'How do travel matching activities develop vocabulary in preschoolers?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Vegetables', lsi: ['veggie names', 'healthy eating', 'garden harvest', 'green foods', 'nutrition awareness'], questions: ['What vegetable worksheets are appropriate for preschool learners?', 'How do vegetable sorting activities teach healthy habits to preschoolers?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Winter', lsi: ['snowflake shapes', 'cold weather', 'warm clothing', 'ice exploration', 'hibernation concepts'], questions: ['What winter worksheets are best for preschool-aged children?', 'How do winter matching activities develop cognitive skills in preschool?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA, Seasonal' },
  { theme: 'Zoo', lsi: ['zoo animals', 'animal enclosures', 'zookeeper roles', 'animal sounds', 'wild habitats'], questions: ['What zoo worksheets are appropriate for preschool children?', 'How do zoo animal sorting activities build counting skills in preschoolers?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
];

// --- Script logic ---
let content = fs.readFileSync(FILE, 'utf8');
let lines = content.split('\n');
let enriched = 0;

for (const entry of data) {
  const escaped = entry.theme.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const headerPattern = new RegExp(`^### \\d+\\. ${escaped} \\u2014 ${GRADE} \\(`);

  let headerIdx = -1;
  for (let i = 0; i < lines.length; i++) {
    if (headerPattern.test(lines[i])) {
      headerIdx = i;
      break;
    }
  }

  if (headerIdx === -1) {
    console.error(`ERROR: Could not find header for ${entry.theme} \u2014 ${GRADE}`);
    continue;
  }

  // Find **Secondary Keywords:** after the header
  let secIdx = -1;
  for (let i = headerIdx + 1; i < Math.min(headerIdx + 20, lines.length); i++) {
    if (lines[i].startsWith('**Secondary Keywords:**')) {
      secIdx = i;
      break;
    }
  }

  if (secIdx === -1) {
    console.error(`ERROR: Could not find Secondary Keywords for ${entry.theme} \u2014 ${GRADE}`);
    continue;
  }

  // Find the --- separator after the secondary keywords (within 10 lines)
  let separatorIdx = -1;
  for (let i = secIdx + 1; i < Math.min(secIdx + 15, lines.length); i++) {
    if (lines[i].trim() === '---') {
      separatorIdx = i;
      break;
    }
  }

  if (separatorIdx === -1) {
    console.error(`ERROR: Could not find --- after Secondary Keywords for ${entry.theme} \u2014 ${GRADE}`);
    continue;
  }

  // Check if already enriched (skip if LSI keywords already present between secIdx and separatorIdx)
  let alreadyEnriched = false;
  for (let i = secIdx; i < separatorIdx; i++) {
    if (lines[i].includes('LSI Keywords')) {
      alreadyEnriched = true;
      break;
    }
  }
  if (alreadyEnriched) {
    console.log(`SKIP: ${entry.theme} \u2014 ${GRADE} already enriched`);
    enriched++;
    continue;
  }

  // Build enrichment block
  const enrichmentLines = [
    '',
    '**LSI Keywords (5):**',
    `1. ${entry.lsi[0]}`,
    `2. ${entry.lsi[1]}`,
    `3. ${entry.lsi[2]}`,
    `4. ${entry.lsi[3]}`,
    `5. ${entry.lsi[4]}`,
    '',
    '**Question Keywords (2):**',
    `1. ${entry.questions[0]}`,
    `2. ${entry.questions[1]}`,
    '',
    '| Metric | Value |',
    '|--------|-------|',
    `| **Search Volume** | ${entry.volume} |`,
    `| **Competition** | ${entry.competition} |`,
    `| **SERP Features** | ${entry.serp} |`,
  ];

  // Insert before the --- separator (and before any blank line preceding it)
  let insertIdx = separatorIdx;
  if (insertIdx > 0 && lines[insertIdx - 1].trim() === '') {
    insertIdx = insertIdx - 1;
  }

  lines.splice(insertIdx, 0, ...enrichmentLines);
  enriched++;
}

fs.writeFileSync(FILE, lines.join('\n'), 'utf8');

console.log(`\nEnriched ${enriched} ${GRADE} entries.`);
console.log(`Expected: 50, ${enriched === 50 ? 'PASS' : 'FAIL'}`);

// Verify
const result = fs.readFileSync(FILE, 'utf8');
const lsiCount = (result.match(/\*\*LSI Keywords \(5\):\*\*/g) || []).length;
const questionCount = (result.match(/\*\*Question Keywords \(2\):\*\*/g) || []).length;
const serpCount = (result.match(/\*\*SERP Features\*\*/g) || []).length;

console.log(`\nVerification (cumulative):`);
console.log(`LSI Keywords sections: ${lsiCount}`);
console.log(`Question Keywords sections: ${questionCount}`);
console.log(`SERP tables: ${serpCount}`);
