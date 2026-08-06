/**
 * Part 6 - Enrich Second Grade (50 entries) with LSI keywords, question keywords, and SERP table.
 * Run: node scripts/enrich-grade-keywords-second.js
 */
const fs = require('fs');
const path = require('path');

const FILE = path.join(__dirname, '..', 'docs', 'seo-keywords', 'en-theme-grade-pages.md');
const GRADE = 'Second Grade';

const data = [
  { theme: 'Animals', lsi: ['animal classification', 'research skills', 'nonfiction writing', 'data collection', 'compare and contrast'], questions: ['What animal science worksheets are best for second grade students?', 'How do animal-themed research activities build writing skills in second grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Food', lsi: ['bar graphs', 'data representation', 'survey skills', 'tally charts', 'pictograph reading'], questions: ['What food graphing worksheets are appropriate for second graders?', 'How do food-themed data activities build graphing skills in second grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Transportation', lsi: ['multi-digit addition', 'word problems', 'measurement skills', 'elapsed time', 'mathematical reasoning'], questions: ['What vehicle math worksheets are best for second grade students?', 'How do transportation-themed problems develop multi-step thinking in second grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Nature', lsi: ['habitat research', 'ecosystem concepts', 'science writing', 'observation journals', 'field study skills'], questions: ['What nature habitat worksheets work best for second graders?', 'How do nature research activities develop scientific writing in second grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'School', lsi: ['paragraph writing', 'opinion writing', 'text organization', 'revision skills', 'writing conventions'], questions: ['What school writing worksheets are appropriate for second grade students?', 'How do school-themed writing activities build paragraph skills in second grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Sports', lsi: ['data analysis', 'measurement units', 'bar graph creation', 'statistical thinking', 'numerical comparison'], questions: ['What sports data worksheets are best for second grade learners?', 'How do sports-themed activities develop data analysis skills in second grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Emotions', lsi: ['reading comprehension', 'character motivation', 'text analysis', 'inferential thinking', 'perspective taking'], questions: ['What emotions comprehension worksheets are appropriate for second graders?', 'How do emotion-themed texts build inferential thinking in second grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Body', lsi: ['organ systems', 'science diagrams', 'labeled drawings', 'body functions', 'health science literacy'], questions: ['What body anatomy worksheets are best for second grade students?', 'How do body-themed activities develop science diagram skills in second grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Clothing', lsi: ['money concepts', 'price comparison', 'addition with regrouping', 'consumer math', 'decimal introduction'], questions: ['What clothing math worksheets work best for second graders?', 'How do clothing-themed activities teach money concepts in second grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Household', lsi: ['measurement tools', 'standard units', 'length and width', 'capacity concepts', 'estimation skills'], questions: ['What household measurement worksheets are appropriate for second grade students?', 'How do household-themed activities develop measurement skills in second grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Toys', lsi: ['data collection', 'survey design', 'tally marks', 'pictograph creation', 'statistical questions'], questions: ['What toy data worksheets are best for second grade learners?', 'How do toy-themed surveys teach data collection in second grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Music', lsi: ['pattern extension', 'rhythmic patterns', 'repeating sequences', 'growing patterns', 'rule identification'], questions: ['What music pattern worksheets are appropriate for second graders?', 'How do music-themed activities develop pattern recognition in second grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Jobs', lsi: ['reading comprehension', 'text features', 'main idea and details', 'informational writing', 'research basics'], questions: ['What career comprehension worksheets are best for second grade students?', 'How do job-themed texts develop comprehension strategies in second grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Space', lsi: ['data graphing', 'measurement comparison', 'scale concepts', 'distance estimation', 'numerical ordering'], questions: ['What space graphing worksheets work best for second graders?', 'How do space-themed data activities build graphing skills in second grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Seasons', lsi: ['graphing data', 'temperature comparison', 'seasonal data sets', 'chart reading', 'trend analysis'], questions: ['What seasons graphing worksheets are appropriate for second grade students?', 'How do seasonal data activities develop chart-reading skills in second grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Holidays', lsi: ['reading comprehension', 'text connections', 'author purpose', 'cultural analysis', 'compare and contrast'], questions: ['What holiday comprehension worksheets are best for second grade learners?', 'How do holiday-themed texts develop critical reading in second grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Weather', lsi: ['weather data', 'chart creation', 'temperature reading', 'measurement recording', 'graphing practice'], questions: ['What weather data worksheets are appropriate for second graders?', 'How do weather recording activities develop data skills in second grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Colors', lsi: ['categorization skills', 'attribute sorting', 'Venn diagrams', 'classification criteria', 'logical grouping'], questions: ['What color categorization worksheets are best for second grade students?', 'How do color sorting activities develop classification skills in second grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Shapes', lsi: ['perimeter introduction', 'area concepts', 'shape partitioning', 'fraction foundations', 'geometric measurement'], questions: ['What shape measurement worksheets work best for second graders?', 'How do shape activities introduce perimeter and area in second grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Numbers', lsi: ['place value concepts', 'hundreds chart', 'skip counting', 'expanded form', 'number comparison'], questions: ['What place value worksheets are appropriate for second grade students?', 'How do place value activities build number understanding in second grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Alphabet', lsi: ['cursive introduction', 'letter formation', 'penmanship practice', 'writing fluency', 'handwriting legibility'], questions: ['What alphabet handwriting worksheets are best for second grade learners?', 'How do handwriting activities improve writing fluency in second grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Furniture', lsi: ['measurement practice', 'ruler skills', 'length estimation', 'standard units', 'comparison strategies'], questions: ['What furniture measurement worksheets are appropriate for second graders?', 'How do furniture-themed activities teach ruler skills in second grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Easter', lsi: ['multi-step problems', 'addition and subtraction', 'word problem strategies', 'spring math', 'mathematical reasoning'], questions: ['What Easter math worksheets are best for second grade students?', 'How do Easter-themed problems develop multi-step thinking in second grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA, Seasonal' },
  { theme: 'Halloween', lsi: ['graphing practice', 'data interpretation', 'survey activities', 'chart creation', 'statistical literacy'], questions: ['What Halloween graphing worksheets work best for second graders?', 'How do Halloween-themed surveys teach data skills in second grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA, Seasonal' },
  { theme: 'Christmas', lsi: ['math word problems', 'money skills', 'addition regrouping', 'subtraction borrowing', 'computation practice'], questions: ['What Christmas math worksheets are appropriate for second grade students?', 'How do Christmas-themed problems reinforce computation in second grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA, Seasonal' },
  { theme: 'Birds', lsi: ['data recording', 'observation logs', 'tally charts', 'bird counts', 'scientific data collection'], questions: ['What bird data worksheets are best for second grade learners?', 'How do bird observation activities develop data skills in second grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Birthday', lsi: ['data collection', 'birthday graphs', 'survey design', 'data interpretation', 'chart reading'], questions: ['What birthday data worksheets are appropriate for second graders?', 'How do birthday survey activities teach graphing in second grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Camping', lsi: ['data recording', 'nature observations', 'tally and graph', 'measurement outdoors', 'science data'], questions: ['What camping data worksheets are best for second grade students?', 'How do camping-themed activities develop data recording in second grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Circus', lsi: ['data collection', 'pictograph creation', 'survey results', 'chart interpretation', 'numerical patterns'], questions: ['What circus data worksheets work best for second graders?', 'How do circus-themed surveys build graphing skills in second grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Construction', lsi: ['measurement units', 'ruler reading', 'length estimation', 'building dimensions', 'measurement comparison'], questions: ['What construction measurement worksheets are appropriate for second grade students?', 'How do construction-themed activities teach measurement in second grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Cooking', lsi: ['measurement skills', 'capacity units', 'fractions introduction', 'recipe math', 'proportional thinking'], questions: ['What cooking measurement worksheets are best for second grade learners?', 'How do recipe-themed activities introduce fractions in second grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Dinosaurs', lsi: ['data recording', 'size comparison', 'timeline concepts', 'research writing', 'informational text'], questions: ['What dinosaur data worksheets are appropriate for second graders?', 'How do dinosaur-themed research activities build writing skills in second grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Fairy Tales', lsi: ['reading comprehension', 'story comparison', 'character analysis', 'text evidence', 'narrative writing'], questions: ['What fairy tale comprehension worksheets are best for second grade students?', 'How do fairy tale activities develop analytical reading in second grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Farm', lsi: ['data collection', 'crop data', 'graphing practice', 'survey skills', 'agricultural math'], questions: ['What farm data worksheets work best for second graders?', 'How do farm-themed surveys develop graphing skills in second grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Flowers', lsi: ['data recording', 'growth measurement', 'observation journals', 'chart creation', 'science data skills'], questions: ['What flower data worksheets are appropriate for second grade students?', 'How do flower growth activities develop measurement in second grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Forest', lsi: ['data collection', 'ecosystem data', 'tally recording', 'habitat research', 'science graphing'], questions: ['What forest data worksheets are best for second grade learners?', 'How do forest-themed activities build scientific data skills in second grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Fruits', lsi: ['data graphing', 'survey design', 'pictograph skills', 'favorite fruit charts', 'data interpretation'], questions: ['What fruit data worksheets work best for second graders?', 'How do fruit survey activities develop graphing skills in second grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Garden', lsi: ['measurement skills', 'growth recording', 'ruler practice', 'estimation skills', 'science measurement'], questions: ['What garden measurement worksheets are appropriate for second grade students?', 'How do garden-themed activities teach measurement recording in second grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Insects', lsi: ['data collection', 'observation logs', 'insect surveys', 'classification data', 'science recording'], questions: ['What insect data worksheets are best for second grade learners?', 'How do insect observation activities develop science skills in second grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Ocean', lsi: ['data graphing', 'marine surveys', 'chart reading', 'measurement skills', 'ocean data analysis'], questions: ['What ocean data worksheets are appropriate for second graders?', 'How do ocean-themed data activities build analytical skills in second grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Pets', lsi: ['survey design', 'data collection', 'pet preference graphs', 'chart interpretation', 'statistical thinking'], questions: ['What pet data worksheets are best for second grade students?', 'How do pet survey activities develop statistical thinking in second grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Pirates', lsi: ['map coordinates', 'measurement skills', 'directional vocabulary', 'grid reading', 'distance concepts'], questions: ['What pirate map worksheets work best for second graders?', 'How do pirate-themed activities teach coordinate skills in second grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Robots', lsi: ['data recording', 'survey design', 'chart creation', 'pattern data', 'technology statistics'], questions: ['What robot data worksheets are appropriate for second grade students?', 'How do robot-themed surveys develop data skills in second grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Spring', lsi: ['science observation', 'seasonal data', 'growth measurement', 'nature recording', 'weather data'], questions: ['What spring science worksheets are best for second grade learners?', 'How do spring observation activities develop data skills in second grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA, Seasonal' },
  { theme: 'Summer', lsi: ['data practice', 'survey activities', 'graphing review', 'measurement skills', 'math maintenance'], questions: ['What summer data worksheets prevent learning loss in second grade?', 'How do summer-themed activities maintain math skills for second graders?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA, Seasonal' },
  { theme: 'Superheroes', lsi: ['data collection', 'survey design', 'bar graph creation', 'chart interpretation', 'comparative data'], questions: ['What superhero data worksheets are appropriate for second grade students?', 'How do superhero-themed surveys develop graphing skills in second grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Travel', lsi: ['data graphing', 'distance concepts', 'map measurement', 'survey skills', 'geographic data'], questions: ['What travel data worksheets are best for second graders?', 'How do travel-themed activities teach distance concepts in second grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Vegetables', lsi: ['data collection', 'survey graphing', 'nutrition data', 'chart reading', 'health statistics'], questions: ['What vegetable data worksheets work best for second grade students?', 'How do vegetable survey activities develop graphing in second grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Winter', lsi: ['weather data', 'temperature graphing', 'seasonal measurement', 'chart analysis', 'data comparison'], questions: ['What winter data worksheets are appropriate for second grade learners?', 'How do winter-themed data activities build analytical skills in second grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA, Seasonal' },
  { theme: 'Zoo', lsi: ['data recording', 'animal surveys', 'graphing practice', 'observation data', 'classification charts'], questions: ['What zoo data worksheets are best for second grade students?', 'How do zoo-themed survey activities develop data skills in second grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
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
