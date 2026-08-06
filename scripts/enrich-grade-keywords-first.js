/**
 * Part 6 - Enrich First Grade (50 entries) with LSI keywords, question keywords, and SERP table.
 * Run: node scripts/enrich-grade-keywords-first.js
 */
const fs = require('fs');
const path = require('path');

const FILE = path.join(__dirname, '..', 'docs', 'seo-keywords', 'en-theme-grade-pages.md');
const GRADE = 'First Grade';

const data = [
  { theme: 'Animals', lsi: ['reading fluency', 'animal adaptations', 'word problems', 'comprehension strategies', 'informational text'], questions: ['What animal math worksheets are best for first grade students?', 'How do animal-themed word problems build math skills in first grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Food', lsi: ['nutrition science', 'reading comprehension', 'measurement introduction', 'food pyramid', 'informational reading'], questions: ['What food nutrition worksheets are appropriate for first graders?', 'How do food-themed reading activities support comprehension in first grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Transportation', lsi: ['addition strategies', 'subtraction facts', 'word problem solving', 'transportation modes', 'mathematical reasoning'], questions: ['What vehicle word problem worksheets are best for first grade learners?', 'How do transportation math activities build problem-solving in first grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Nature', lsi: ['reading fluency', 'nonfiction text', 'close reading', 'natural habitats', 'text features'], questions: ['What nature reading worksheets work best for first grade students?', 'How do nature-themed texts improve reading fluency in first grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'School', lsi: ['sight word fluency', 'reading passages', 'text comprehension', 'story elements', 'sentence structure'], questions: ['What school reading worksheets are best for first grade learners?', 'How do school-themed passages develop comprehension in first grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Sports', lsi: ['addition facts', 'subtraction practice', 'fact families', 'number sentences', 'mental math'], questions: ['What sports math worksheets are appropriate for first grade students?', 'How do sports-themed activities reinforce addition facts in first grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Emotions', lsi: ['reading response', 'character feelings', 'story comprehension', 'inference skills', 'text connections'], questions: ['What feelings reading worksheets are best for first graders?', 'How do emotion-themed texts teach inference skills in first grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Body', lsi: ['health education', 'body functions', 'science reading', 'diagram labels', 'nonfiction comprehension'], questions: ['What body health worksheets are appropriate for first grade students?', 'How do body-themed activities integrate science and reading in first grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Clothing', lsi: ['vocabulary development', 'word meaning', 'context clues', 'adjective practice', 'descriptive writing'], questions: ['What clothing vocabulary worksheets are best for first grade learners?', 'How do clothing-themed activities build descriptive language in first grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Household', lsi: ['reading passages', 'functional text', 'word meaning', 'sequence events', 'informational literacy'], questions: ['What household reading worksheets work best for first graders?', 'How do household-themed texts develop functional literacy in first grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Toys', lsi: ['addition practice', 'number sentences', 'counting on strategy', 'sum and difference', 'computational fluency'], questions: ['What toy addition worksheets are appropriate for first grade students?', 'How do toy-themed math activities build addition fluency in first grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Music', lsi: ['reading comprehension', 'text details', 'key ideas', 'informational passages', 'subject vocabulary'], questions: ['What music reading worksheets are best for first grade learners?', 'How do music-themed passages develop informational reading in first grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Jobs', lsi: ['career awareness', 'reading passages', 'nonfiction text', 'main idea', 'supporting details'], questions: ['What career reading worksheets are appropriate for first graders?', 'How do job-themed texts teach main idea skills in first grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Space', lsi: ['planet facts', 'nonfiction reading', 'text evidence', 'science vocabulary', 'informational comprehension'], questions: ['What planet reading worksheets are best for first grade students?', 'How do space-themed activities build science literacy in first grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Seasons', lsi: ['seasonal reading', 'compare and contrast', 'text features', 'science connections', 'descriptive language'], questions: ['What seasons reading worksheets work best for first grade learners?', 'How do seasonal texts develop compare-and-contrast skills in first grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Holidays', lsi: ['reading passages', 'cultural literacy', 'comprehension questions', 'story retelling', 'text connections'], questions: ['What holiday reading worksheets are appropriate for first grade students?', 'How do holiday-themed passages build reading comprehension in first grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Weather', lsi: ['science observation', 'data collection', 'weather instruments', 'measurement basics', 'recording data'], questions: ['What weather science worksheets are best for first graders?', 'How do weather observation activities develop science skills in first grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Colors', lsi: ['color spectrum', 'scientific observation', 'light concepts', 'experiment recording', 'inquiry skills'], questions: ['What color science worksheets are appropriate for first grade students?', 'How do color activities introduce scientific inquiry in first grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Shapes', lsi: ['geometric shapes', 'shape attributes', 'spatial reasoning', 'composing shapes', 'measurement concepts'], questions: ['What shape geometry worksheets are best for first grade learners?', 'How do shape activities develop spatial reasoning in first grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Numbers', lsi: ['place value introduction', 'addition strategies', 'subtraction methods', 'number relationships', 'operational fluency'], questions: ['What number operations worksheets work best for first grade students?', 'How do number activities build operational fluency in first grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Alphabet', lsi: ['spelling patterns', 'word families', 'phonics rules', 'encoding skills', 'word building'], questions: ['What alphabet spelling worksheets are appropriate for first graders?', 'How do spelling activities reinforce phonics patterns in first grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Furniture', lsi: ['reading comprehension', 'functional vocabulary', 'informational text', 'detail identification', 'topic sentences'], questions: ['What furniture reading worksheets are best for first grade students?', 'How do furniture-themed texts develop informational reading in first grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Easter', lsi: ['reading fluency', 'spring science', 'seasonal passages', 'comprehension skills', 'retelling strategies'], questions: ['What Easter reading worksheets are appropriate for first grade learners?', 'How do Easter-themed passages build reading fluency in first grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA, Seasonal' },
  { theme: 'Halloween', lsi: ['reading passages', 'story elements', 'descriptive writing', 'seasonal vocabulary', 'creative response'], questions: ['What Halloween reading worksheets are best for first grade students?', 'How do Halloween-themed texts develop story comprehension in first grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA, Seasonal' },
  { theme: 'Christmas', lsi: ['reading comprehension', 'holiday passages', 'sequence events', 'text details', 'seasonal literacy'], questions: ['What Christmas reading worksheets work best for first graders?', 'How do Christmas-themed passages strengthen reading skills in first grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA, Seasonal' },
  { theme: 'Birds', lsi: ['nonfiction reading', 'animal facts', 'text evidence', 'science integration', 'observation skills'], questions: ['What bird reading worksheets are appropriate for first grade students?', 'How do bird-themed texts develop nonfiction reading skills in first grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Birthday', lsi: ['reading passages', 'story sequence', 'personal narrative', 'comprehension practice', 'text connections'], questions: ['What birthday reading worksheets are best for first grade learners?', 'How do birthday-themed stories build sequencing skills in first grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Camping', lsi: ['reading comprehension', 'adventure stories', 'nature vocabulary', 'story predictions', 'text evidence'], questions: ['What camping reading worksheets are appropriate for first graders?', 'How do camping-themed stories develop prediction skills in first grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Circus', lsi: ['reading passages', 'descriptive text', 'story elements', 'vocabulary in context', 'comprehension response'], questions: ['What circus reading worksheets are best for first grade students?', 'How do circus-themed passages develop vocabulary in first grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Construction', lsi: ['informational reading', 'how-things-work', 'procedural text', 'sequence steps', 'technical vocabulary'], questions: ['What construction reading worksheets are appropriate for first grade learners?', 'How do construction-themed texts teach procedural reading in first grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Cooking', lsi: ['recipe reading', 'procedural text', 'sequence steps', 'measurement words', 'following directions'], questions: ['What cooking reading worksheets are best for first grade students?', 'How do recipe-themed activities develop procedural reading in first grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Dinosaurs', lsi: ['nonfiction reading', 'fossil facts', 'science vocabulary', 'text features', 'informational comprehension'], questions: ['What dinosaur reading worksheets work best for first graders?', 'How do dinosaur-themed texts build nonfiction comprehension in first grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Fairy Tales', lsi: ['story elements', 'character traits', 'plot sequence', 'fiction comprehension', 'retelling skills'], questions: ['What fairy tale reading worksheets are appropriate for first grade students?', 'How do fairy tale activities develop story element knowledge in first grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Farm', lsi: ['nonfiction reading', 'agricultural vocabulary', 'text evidence', 'informational passages', 'science connections'], questions: ['What farm reading worksheets are best for first grade learners?', 'How do farm-themed texts develop informational literacy in first grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Flowers', lsi: ['plant science reading', 'life cycle text', 'nonfiction features', 'science vocabulary', 'observation recording'], questions: ['What flower reading worksheets are appropriate for first graders?', 'How do flower-themed texts teach plant science in first grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Forest', lsi: ['ecosystem reading', 'nonfiction text', 'habitat vocabulary', 'text connections', 'nature science'], questions: ['What forest reading worksheets are best for first grade students?', 'How do forest-themed passages develop science reading in first grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Fruits', lsi: ['nutrition reading', 'informational text', 'text details', 'science vocabulary', 'healthy eating literacy'], questions: ['What fruit reading worksheets work best for first grade learners?', 'How do fruit-themed texts integrate science and reading in first grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Garden', lsi: ['plant growth reading', 'procedural text', 'science journal', 'observation skills', 'sequencing events'], questions: ['What garden reading worksheets are appropriate for first grade students?', 'How do garden-themed texts teach observation skills in first grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Insects', lsi: ['insect science reading', 'life cycle text', 'nonfiction features', 'classification vocabulary', 'inquiry skills'], questions: ['What insect reading worksheets are best for first graders?', 'How do insect-themed texts develop science inquiry in first grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Ocean', lsi: ['marine science reading', 'nonfiction text', 'ocean vocabulary', 'text evidence', 'habitat comprehension'], questions: ['What ocean reading worksheets are appropriate for first grade students?', 'How do ocean-themed passages build nonfiction skills in first grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Pets', lsi: ['reading comprehension', 'personal narrative', 'informational text', 'pet care vocabulary', 'text connections'], questions: ['What pet reading worksheets are best for first grade learners?', 'How do pet-themed texts develop narrative comprehension in first grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Pirates', lsi: ['adventure reading', 'story comprehension', 'fiction elements', 'vocabulary in context', 'prediction strategies'], questions: ['What pirate reading worksheets work best for first graders?', 'How do pirate-themed stories develop prediction skills in first grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Robots', lsi: ['informational reading', 'technology vocabulary', 'nonfiction text', 'text features', 'science literacy'], questions: ['What robot reading worksheets are appropriate for first grade students?', 'How do robot-themed texts build technology literacy in first grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Spring', lsi: ['seasonal reading', 'nonfiction text', 'nature observations', 'descriptive language', 'science connections'], questions: ['What spring reading worksheets are best for first grade learners?', 'How do spring-themed passages integrate science and reading in first grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA, Seasonal' },
  { theme: 'Summer', lsi: ['reading practice', 'comprehension maintenance', 'narrative text', 'story response', 'fluency building'], questions: ['What summer reading worksheets prevent learning loss in first grade?', 'How do summer-themed activities maintain reading skills for first graders?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA, Seasonal' },
  { theme: 'Superheroes', lsi: ['fiction reading', 'character analysis', 'story comprehension', 'action vocabulary', 'narrative response'], questions: ['What superhero reading worksheets are appropriate for first grade students?', 'How do superhero-themed stories develop character analysis in first grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Travel', lsi: ['geography reading', 'nonfiction text', 'cultural vocabulary', 'informational passages', 'map reading basics'], questions: ['What travel reading worksheets are best for first graders?', 'How do travel-themed texts introduce geography concepts in first grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Vegetables', lsi: ['nutrition reading', 'informational text', 'science vocabulary', 'text evidence', 'health literacy'], questions: ['What vegetable reading worksheets are appropriate for first grade students?', 'How do vegetable-themed texts develop health literacy in first grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Winter', lsi: ['seasonal reading', 'nonfiction passages', 'cold weather science', 'descriptive writing', 'text details'], questions: ['What winter reading worksheets are best for first grade learners?', 'How do winter-themed passages build descriptive reading in first grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA, Seasonal' },
  { theme: 'Zoo', lsi: ['nonfiction reading', 'animal facts', 'informational text', 'text features', 'science integration'], questions: ['What zoo reading worksheets work best for first grade students?', 'How do zoo-themed texts develop nonfiction comprehension in first grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
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
