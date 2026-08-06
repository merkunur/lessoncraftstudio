/**
 * Part 6 - Enrich Kindergarten (50 entries) with LSI keywords, question keywords, and SERP table.
 * Run: node scripts/enrich-grade-keywords-kindergarten.js
 */
const fs = require('fs');
const path = require('path');

const FILE = path.join(__dirname, '..', 'docs', 'seo-keywords', 'en-theme-grade-pages.md');
const GRADE = 'Kindergarten';

const data = [
  { theme: 'Animals', lsi: ['phonemic awareness', 'animal classification', 'beginning reading', 'letter sounds', 'emergent literacy'], questions: ['What animal worksheets are best for kindergarten students?', 'How do animal reading activities support literacy in kindergarten?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Food', lsi: ['number sense', 'food vocabulary', 'counting practice', 'healthy choices', 'nutritional literacy'], questions: ['What food counting worksheets are best for kindergarten learners?', 'How do food-themed math activities build number sense in kindergarten?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Transportation', lsi: ['sight words', 'vehicle categories', 'counting to twenty', 'positional words', 'comparative language'], questions: ['What vehicle worksheets are appropriate for kindergarten students?', 'How do transportation counting activities strengthen math skills in kindergarten?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Nature', lsi: ['scientific inquiry', 'living things', 'seasonal observation', 'nature vocabulary', 'beginning science'], questions: ['What nature science worksheets work best for kindergarten learners?', 'How do nature activities introduce scientific thinking in kindergarten?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'School', lsi: ['sight word recognition', 'classroom vocabulary', 'cooperative learning', 'school routines', 'academic readiness'], questions: ['What school vocabulary worksheets help kindergarteners build word knowledge?', 'How do school-themed activities develop reading readiness in kindergarten?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Sports', lsi: ['pattern recognition', 'sequential thinking', 'repeating patterns', 'physical education', 'movement vocabulary'], questions: ['What sports pattern worksheets are best for kindergarten students?', 'How do sports-themed activities teach pattern recognition in kindergarten?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Emotions', lsi: ['feeling words', 'social awareness', 'emotional vocabulary', 'self-expression', 'conflict resolution'], questions: ['What emotions vocabulary worksheets are best for kindergarten students?', 'How do feelings activities build social awareness in kindergarten children?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Body', lsi: ['five senses exploration', 'body systems basics', 'health awareness', 'sensory vocabulary', 'body functions'], questions: ['What five senses worksheets work best for kindergarten learners?', 'How do body-themed activities introduce health concepts in kindergarten?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Clothing', lsi: ['pattern sequences', 'weather-appropriate dress', 'attribute words', 'seasonal vocabulary', 'sorting criteria'], questions: ['What clothing pattern worksheets are appropriate for kindergarten students?', 'How do clothing-themed activities teach pattern skills in kindergarten?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Household', lsi: ['counting objects', 'room vocabulary', 'ordinal numbers', 'positional language', 'categorizing skills'], questions: ['What household counting worksheets are best for kindergarten learners?', 'How do household activities develop counting skills in kindergarten?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Toys', lsi: ['descriptive words', 'toy classification', 'beginning writing', 'noun vocabulary', 'word building'], questions: ['What toy vocabulary worksheets engage kindergarten students?', 'How do toy-themed activities build descriptive language in kindergarten?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Music', lsi: ['sound patterns', 'instrument families', 'auditory discrimination', 'rhythm patterns', 'listening skills'], questions: ['What instrument vocabulary worksheets are best for kindergarten students?', 'How do music activities develop auditory skills in kindergarten learners?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Jobs', lsi: ['community roles', 'career vocabulary', 'workplace tools', 'helper identification', 'social studies basics'], questions: ['What career vocabulary worksheets work best for kindergarten learners?', 'How do community helper activities introduce social studies in kindergarten?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Space', lsi: ['planet names', 'solar system basics', 'space vocabulary', 'star patterns', 'astronomical terms'], questions: ['What planet vocabulary worksheets are appropriate for kindergarten students?', 'How do space-themed activities expand vocabulary in kindergarten?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Seasons', lsi: ['seasonal vocabulary', 'calendar skills', 'weather words', 'cyclical patterns', 'time concepts'], questions: ['What seasons vocabulary worksheets are best for kindergarten learners?', 'How do seasonal activities teach cyclical patterns in kindergarten?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Holidays', lsi: ['counting practice', 'holiday vocabulary', 'cultural awareness', 'celebration words', 'seasonal traditions'], questions: ['What holiday counting worksheets engage kindergarten students?', 'How do holiday-themed activities reinforce counting in kindergarten?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Weather', lsi: ['weather words', 'observation skills', 'descriptive language', 'forecast vocabulary', 'data recording'], questions: ['What weather vocabulary worksheets are best for kindergarten students?', 'How do weather observation activities build science skills in kindergarten?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Colors', lsi: ['color words', 'mixing experiments', 'spectrum vocabulary', 'secondary colors', 'artistic expression'], questions: ['What color mixing worksheets are appropriate for kindergarten learners?', 'How do color activities teach scientific observation in kindergarten?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Shapes', lsi: ['geometric vocabulary', 'two-dimensional shapes', 'shape attributes', 'spatial language', 'shape composition'], questions: ['What shape pattern worksheets are best for kindergarten students?', 'How do shape activities develop geometric thinking in kindergarten?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Numbers', lsi: ['number bonds', 'teen numbers', 'counting strategies', 'number writing', 'quantity comparison'], questions: ['What number bonds worksheets are best for kindergarten learners?', 'How do number activities strengthen counting fluency in kindergarten?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Alphabet', lsi: ['letter-sound correspondence', 'phonics instruction', 'CVC words', 'letter formation', 'decoding skills'], questions: ['What alphabet phonics worksheets are best for kindergarten students?', 'How do phonics activities build reading foundations in kindergarten?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Furniture', lsi: ['room labels', 'preposition words', 'household vocabulary', 'spatial directions', 'object functions'], questions: ['What room vocabulary worksheets are appropriate for kindergarten learners?', 'How do furniture activities teach preposition words in kindergarten?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Easter', lsi: ['spring vocabulary', 'counting eggs', 'color patterns', 'holiday traditions', 'seasonal words'], questions: ['What Easter vocabulary worksheets are best for kindergarten students?', 'How do Easter spring activities reinforce seasonal learning in kindergarten?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA, Seasonal' },
  { theme: 'Halloween', lsi: ['costume vocabulary', 'spooky words', 'autumn season', 'descriptive adjectives', 'holiday safety'], questions: ['What Halloween vocabulary worksheets engage kindergarten learners?', 'How do Halloween activities build descriptive vocabulary in kindergarten?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA, Seasonal' },
  { theme: 'Christmas', lsi: ['holiday counting', 'winter vocabulary', 'gift words', 'festive traditions', 'December activities'], questions: ['What Christmas counting worksheets are best for kindergarten students?', 'How do Christmas activities reinforce math skills in kindergarten?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA, Seasonal' },
  { theme: 'Birds', lsi: ['bird vocabulary', 'species identification', 'feather patterns', 'habitat words', 'observation recording'], questions: ['What bird identification worksheets are appropriate for kindergarten learners?', 'How do bird activities develop observation skills in kindergarten?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Birthday', lsi: ['party vocabulary', 'counting candles', 'ordinal concepts', 'celebration words', 'age vocabulary'], questions: ['What birthday vocabulary worksheets engage kindergarten students?', 'How do birthday-themed activities teach ordinal numbers in kindergarten?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Camping', lsi: ['nature vocabulary', 'outdoor words', 'camping equipment', 'adventure language', 'wilderness terms'], questions: ['What camping vocabulary worksheets are best for kindergarten learners?', 'How do camping activities build nature vocabulary in kindergarten?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Circus', lsi: ['performer vocabulary', 'action words', 'circus equipment', 'entertainment terms', 'descriptive phrases'], questions: ['What circus vocabulary worksheets are appropriate for kindergarten students?', 'How do circus activities develop action word knowledge in kindergarten?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Construction', lsi: ['tool vocabulary', 'building materials', 'construction verbs', 'measurement words', 'safety language'], questions: ['What construction vocabulary worksheets are best for kindergarten learners?', 'How do construction activities teach tool names to kindergarten students?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Cooking', lsi: ['kitchen vocabulary', 'recipe words', 'ingredient names', 'measurement concepts', 'sequence language'], questions: ['What kitchen vocabulary worksheets engage kindergarten students?', 'How do cooking activities build sequencing skills in kindergarten?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Dinosaurs', lsi: ['dinosaur vocabulary', 'prehistoric words', 'size adjectives', 'species names', 'extinction concepts'], questions: ['What dinosaur vocabulary worksheets are best for kindergarten learners?', 'How do dinosaur activities build scientific vocabulary in kindergarten?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Fairy Tales', lsi: ['story vocabulary', 'character words', 'narrative sequence', 'fiction elements', 'retelling skills'], questions: ['What fairy tale vocabulary worksheets are appropriate for kindergarten students?', 'How do fairy tale activities develop storytelling skills in kindergarten?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Farm', lsi: ['farm vocabulary', 'animal babies', 'crop words', 'rural language', 'produce names'], questions: ['What farm vocabulary worksheets are best for kindergarten learners?', 'How do farm activities teach animal vocabulary in kindergarten?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Flowers', lsi: ['plant vocabulary', 'growth stages', 'flower names', 'garden words', 'botanical terms'], questions: ['What flower vocabulary worksheets engage kindergarten students?', 'How do flower activities teach plant life cycles in kindergarten?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Forest', lsi: ['woodland vocabulary', 'tree identification', 'forest ecosystem', 'habitat words', 'nature language'], questions: ['What forest vocabulary worksheets are appropriate for kindergarten learners?', 'How do forest activities develop nature awareness in kindergarten?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Fruits', lsi: ['fruit vocabulary', 'taste words', 'nutrition language', 'sorting criteria', 'descriptive adjectives'], questions: ['What fruit vocabulary worksheets are best for kindergarten students?', 'How do fruit activities build healthy eating vocabulary in kindergarten?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Garden', lsi: ['gardening vocabulary', 'planting sequence', 'tool words', 'growth stages', 'season connections'], questions: ['What garden vocabulary worksheets engage kindergarten learners?', 'How do garden activities teach sequential thinking in kindergarten?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Insects', lsi: ['insect vocabulary', 'body parts', 'life cycle stages', 'habitat words', 'metamorphosis basics'], questions: ['What insect vocabulary worksheets are appropriate for kindergarten students?', 'How do insect activities introduce life cycles in kindergarten?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Ocean', lsi: ['ocean vocabulary', 'marine creatures', 'habitat words', 'underwater language', 'wave terminology'], questions: ['What ocean vocabulary worksheets are best for kindergarten learners?', 'How do ocean activities develop marine science vocabulary in kindergarten?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Pets', lsi: ['pet vocabulary', 'care responsibilities', 'animal needs', 'descriptive words', 'companion animals'], questions: ['What pet vocabulary worksheets engage kindergarten students?', 'How do pet-themed activities build responsibility concepts in kindergarten?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Pirates', lsi: ['treasure vocabulary', 'adventure words', 'nautical language', 'directional terms', 'map concepts'], questions: ['What treasure vocabulary worksheets are appropriate for kindergarten learners?', 'How do pirate activities teach directional language in kindergarten?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Robots', lsi: ['technology vocabulary', 'shape words', 'action commands', 'building terms', 'mechanical language'], questions: ['What robot vocabulary worksheets are best for kindergarten students?', 'How do robot activities develop technology vocabulary in kindergarten?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Spring', lsi: ['spring vocabulary', 'new growth words', 'weather changes', 'seasonal language', 'renewal concepts'], questions: ['What spring vocabulary worksheets engage kindergarten learners?', 'How do spring activities teach seasonal change vocabulary in kindergarten?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA, Seasonal' },
  { theme: 'Summer', lsi: ['summer vocabulary', 'outdoor words', 'beach language', 'warm weather terms', 'vacation concepts'], questions: ['What summer vocabulary worksheets are best for kindergarten students?', 'How do summer activities prevent vocabulary loss over kindergarten break?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA, Seasonal' },
  { theme: 'Superheroes', lsi: ['hero vocabulary', 'character traits', 'action verbs', 'strength adjectives', 'rescue language'], questions: ['What hero vocabulary worksheets are appropriate for kindergarten learners?', 'How do superhero activities build character trait vocabulary in kindergarten?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Travel', lsi: ['travel vocabulary', 'geography words', 'destination language', 'transport types', 'cultural terms'], questions: ['What travel vocabulary worksheets are best for kindergarten students?', 'How do travel activities introduce geography concepts in kindergarten?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Vegetables', lsi: ['vegetable vocabulary', 'nutrition words', 'garden language', 'food categories', 'healthy eating terms'], questions: ['What vegetable vocabulary worksheets engage kindergarten learners?', 'How do vegetable activities build nutrition vocabulary in kindergarten?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Winter', lsi: ['winter vocabulary', 'cold weather words', 'snow language', 'seasonal clothing terms', 'hibernation concepts'], questions: ['What winter vocabulary worksheets are appropriate for kindergarten students?', 'How do winter activities develop seasonal vocabulary in kindergarten?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA, Seasonal' },
  { theme: 'Zoo', lsi: ['zoo vocabulary', 'animal groups', 'habitat words', 'classification language', 'wildlife terms'], questions: ['What zoo vocabulary worksheets are best for kindergarten learners?', 'How do zoo activities develop animal classification skills in kindergarten?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
];

// --- Script logic (same as preschool) ---
let content = fs.readFileSync(FILE, 'utf8');
let lines = content.split('\n');
let enriched = 0;

for (const entry of data) {
  const escaped = entry.theme.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const headerPattern = new RegExp(`^### \\d+\\. ${escaped} \\u2014 ${GRADE} \\(`);

  let headerIdx = -1;
  for (let i = 0; i < lines.length; i++) {
    if (headerPattern.test(lines[i])) { headerIdx = i; break; }
  }
  if (headerIdx === -1) { console.error(`ERROR: Could not find header for ${entry.theme} \u2014 ${GRADE}`); continue; }

  let secIdx = -1;
  for (let i = headerIdx + 1; i < Math.min(headerIdx + 20, lines.length); i++) {
    if (lines[i].startsWith('**Secondary Keywords:**')) { secIdx = i; break; }
  }
  if (secIdx === -1) { console.error(`ERROR: Could not find Secondary Keywords for ${entry.theme} \u2014 ${GRADE}`); continue; }

  let separatorIdx = -1;
  for (let i = secIdx + 1; i < Math.min(secIdx + 15, lines.length); i++) {
    if (lines[i].trim() === '---') { separatorIdx = i; break; }
  }
  if (separatorIdx === -1) { console.error(`ERROR: Could not find --- after Secondary Keywords for ${entry.theme} \u2014 ${GRADE}`); continue; }

  let alreadyEnriched = false;
  for (let i = secIdx; i < separatorIdx; i++) {
    if (lines[i].includes('LSI Keywords')) { alreadyEnriched = true; break; }
  }
  if (alreadyEnriched) { console.log(`SKIP: ${entry.theme} \u2014 ${GRADE} already enriched`); enriched++; continue; }

  const enrichmentLines = [
    '', '**LSI Keywords (5):**',
    `1. ${entry.lsi[0]}`, `2. ${entry.lsi[1]}`, `3. ${entry.lsi[2]}`, `4. ${entry.lsi[3]}`, `5. ${entry.lsi[4]}`,
    '', '**Question Keywords (2):**',
    `1. ${entry.questions[0]}`, `2. ${entry.questions[1]}`,
    '', '| Metric | Value |', '|--------|-------|',
    `| **Search Volume** | ${entry.volume} |`, `| **Competition** | ${entry.competition} |`, `| **SERP Features** | ${entry.serp} |`,
  ];

  let insertIdx = separatorIdx;
  if (insertIdx > 0 && lines[insertIdx - 1].trim() === '') { insertIdx = insertIdx - 1; }
  lines.splice(insertIdx, 0, ...enrichmentLines);
  enriched++;
}

fs.writeFileSync(FILE, lines.join('\n'), 'utf8');
console.log(`\nEnriched ${enriched} ${GRADE} entries.`);
console.log(`Expected: 50, ${enriched === 50 ? 'PASS' : 'FAIL'}`);

const result = fs.readFileSync(FILE, 'utf8');
const lsiCount = (result.match(/\*\*LSI Keywords \(5\):\*\*/g) || []).length;
const questionCount = (result.match(/\*\*Question Keywords \(2\):\*\*/g) || []).length;
const serpCount = (result.match(/\*\*SERP Features\*\*/g) || []).length;
console.log(`\nVerification (cumulative):`);
console.log(`LSI Keywords sections: ${lsiCount}`);
console.log(`Question Keywords sections: ${questionCount}`);
console.log(`SERP tables: ${serpCount}`);
