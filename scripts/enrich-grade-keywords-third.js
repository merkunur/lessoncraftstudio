/**
 * Part 6 - Enrich Third Grade (50 entries) with LSI keywords, question keywords, and SERP table.
 * Run: node scripts/enrich-grade-keywords-third.js
 */
const fs = require('fs');
const path = require('path');

const FILE = path.join(__dirname, '..', 'docs', 'seo-keywords', 'en-theme-grade-pages.md');
const GRADE = 'Third Grade';

const data = [
  { theme: 'Animals', lsi: ['research report', 'text evidence', 'multi-paragraph writing', 'scientific classification', 'critical analysis'], questions: ['What animal research worksheets are best for third grade students?', 'How do animal-themed projects develop research skills in third grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Food', lsi: ['fraction concepts', 'part and whole', 'equivalent fractions', 'fraction comparison', 'real-world fractions'], questions: ['What food fractions worksheets are appropriate for third graders?', 'How do food-themed activities make fractions concrete in third grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Transportation', lsi: ['logical reasoning', 'deductive thinking', 'multi-step problems', 'strategy games', 'analytical skills'], questions: ['What vehicle logic worksheets are best for third grade students?', 'How do transportation-themed puzzles develop logical thinking in third grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Nature', lsi: ['ecosystem analysis', 'food chains', 'environmental science', 'research writing', 'evidence-based conclusions'], questions: ['What nature ecology worksheets work best for third graders?', 'How do nature research activities develop scientific thinking in third grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'School', lsi: ['study strategies', 'note-taking skills', 'test preparation', 'organizational skills', 'independent learning'], questions: ['What school study skills worksheets are appropriate for third grade students?', 'How do study skill activities prepare third graders for academic success?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Sports', lsi: ['multiplication facts', 'array models', 'equal groups', 'fact fluency', 'multiplicative thinking'], questions: ['What sports multiplication worksheets are best for third grade learners?', 'How do sports-themed activities build multiplication fluency in third grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Emotions', lsi: ['social-emotional curriculum', 'perspective analysis', 'empathy development', 'conflict resolution writing', 'character education'], questions: ['What social emotional learning worksheets are best for third graders?', 'How do SEL activities develop perspective-taking in third grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Body', lsi: ['body systems', 'organ functions', 'scientific diagrams', 'research projects', 'health science writing'], questions: ['What body systems worksheets are appropriate for third grade students?', 'How do body-themed research projects build science skills in third grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Clothing', lsi: ['design thinking', 'creative writing', 'persuasive text', 'descriptive paragraphs', 'artistic expression'], questions: ['What clothing design worksheets are best for third grade learners?', 'How do clothing-themed activities develop creative writing in third grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Household', lsi: ['budgeting basics', 'money management', 'addition and subtraction', 'real-world math', 'financial literacy'], questions: ['What household budgeting worksheets work best for third graders?', 'How do household-themed activities introduce financial literacy in third grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Toys', lsi: ['design process', 'persuasive writing', 'descriptive text', 'creative problem-solving', 'invention skills'], questions: ['What toy design worksheets are appropriate for third grade students?', 'How do toy-themed activities develop creative problem-solving in third grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Music', lsi: ['composition elements', 'creative expression', 'pattern analysis', 'fraction connections', 'rhythmic notation'], questions: ['What music composition worksheets are best for third grade learners?', 'How do music-themed activities connect fractions and rhythm in third grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Jobs', lsi: ['career research', 'informational writing', 'interview skills', 'note-taking', 'presentation preparation'], questions: ['What career research worksheets are best for third graders?', 'How do job-themed research projects build writing skills in third grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Space', lsi: ['space research', 'solar system facts', 'scientific inquiry', 'multi-source research', 'evidence-based writing'], questions: ['What space research worksheets are appropriate for third grade students?', 'How do space-themed projects develop research skills in third grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Seasons', lsi: ['research projects', 'compare-contrast writing', 'data analysis', 'scientific reasoning', 'multi-paragraph text'], questions: ['What seasons research worksheets are best for third grade learners?', 'How do seasonal research projects develop analytical writing in third grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Holidays', lsi: ['cultural research', 'informational writing', 'multi-source reading', 'text synthesis', 'presentation skills'], questions: ['What holiday research worksheets work best for third graders?', 'How do holiday-themed projects build research and writing in third grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Weather', lsi: ['weather analysis', 'data interpretation', 'scientific conclusions', 'forecast reasoning', 'evidence-based predictions'], questions: ['What weather analysis worksheets are appropriate for third grade students?', 'How do weather-themed activities develop analytical thinking in third grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Colors', lsi: ['color theory concepts', 'scientific investigation', 'experimental design', 'observation recording', 'analytical thinking'], questions: ['What color theory worksheets are best for third grade learners?', 'How do color science activities develop experimental thinking in third grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Shapes', lsi: ['geometric analysis', 'area and perimeter', 'shape classification', 'spatial visualization', 'mathematical reasoning'], questions: ['What shape analysis worksheets work best for third graders?', 'How do geometry activities develop mathematical reasoning in third grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Numbers', lsi: ['multiplication mastery', 'division introduction', 'fact families', 'multi-digit computation', 'problem-solving strategies'], questions: ['What number multiplication worksheets are appropriate for third grade students?', 'How do multiplication activities build computational fluency in third grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Alphabet', lsi: ['word study patterns', 'morphology basics', 'prefix and suffix', 'vocabulary building', 'etymology introduction'], questions: ['What alphabet word study worksheets are best for third grade learners?', 'How do word study activities expand vocabulary in third grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Furniture', lsi: ['design thinking', 'persuasive writing', 'measurement application', 'creative projects', 'real-world math'], questions: ['What furniture design worksheets are best for third graders?', 'How do furniture-themed projects integrate math and design in third grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Easter', lsi: ['creative writing', 'narrative composition', 'descriptive language', 'seasonal writing prompts', 'revision skills'], questions: ['What Easter writing worksheets are appropriate for third grade students?', 'How do Easter-themed prompts develop narrative writing in third grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA, Seasonal' },
  { theme: 'Halloween', lsi: ['creative writing', 'narrative structure', 'descriptive vocabulary', 'story development', 'editing skills'], questions: ['What Halloween creative writing worksheets are best for third graders?', 'How do Halloween-themed prompts develop narrative skills in third grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA, Seasonal' },
  { theme: 'Christmas', lsi: ['research projects', 'informational writing', 'cultural comparison', 'multi-source synthesis', 'presentation skills'], questions: ['What Christmas research worksheets work best for third grade students?', 'How do Christmas-themed projects build research skills in third grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA, Seasonal' },
  { theme: 'Birds', lsi: ['research report', 'scientific observation', 'data analysis', 'informational writing', 'field study skills'], questions: ['What bird research worksheets are appropriate for third grade learners?', 'How do bird-themed projects develop scientific writing in third grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Birthday', lsi: ['narrative writing', 'personal essay', 'descriptive paragraphs', 'writing conventions', 'revision strategies'], questions: ['What birthday writing worksheets are best for third grade students?', 'How do birthday-themed prompts develop personal narrative in third grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Camping', lsi: ['scientific investigation', 'nature research', 'observation journals', 'evidence-based writing', 'field study'], questions: ['What camping science worksheets work best for third graders?', 'How do camping-themed research activities build inquiry skills in third grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Circus', lsi: ['research projects', 'informational writing', 'topic exploration', 'text organization', 'presentation skills'], questions: ['What circus research worksheets are appropriate for third grade students?', 'How do circus-themed projects develop research writing in third grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Construction', lsi: ['research writing', 'informational text', 'engineering concepts', 'technical vocabulary', 'evidence-based conclusions'], questions: ['What construction research worksheets are best for third grade learners?', 'How do construction-themed projects develop technical writing in third grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Cooking', lsi: ['procedural writing', 'instructional text', 'fraction application', 'sequence organization', 'technical vocabulary'], questions: ['What cooking writing worksheets work best for third graders?', 'How do cooking-themed activities develop procedural writing in third grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Dinosaurs', lsi: ['research report', 'scientific inquiry', 'evidence evaluation', 'informational writing', 'source analysis'], questions: ['What dinosaur research worksheets are appropriate for third grade students?', 'How do dinosaur-themed projects develop evidence-based writing in third grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Fairy Tales', lsi: ['narrative writing', 'story structure', 'character development', 'creative composition', 'revision process'], questions: ['What fairy tale writing worksheets are best for third grade learners?', 'How do fairy tale activities develop narrative composition in third grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Farm', lsi: ['research projects', 'agricultural science', 'informational writing', 'data interpretation', 'evidence-based conclusions'], questions: ['What farm research worksheets work best for third graders?', 'How do farm-themed research activities build scientific writing in third grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Flowers', lsi: ['scientific research', 'plant biology', 'observation journals', 'informational writing', 'experimental design'], questions: ['What flower research worksheets are appropriate for third grade students?', 'How do flower-themed experiments develop scientific inquiry in third grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Forest', lsi: ['ecosystem research', 'food web analysis', 'environmental writing', 'scientific reasoning', 'multi-source synthesis'], questions: ['What forest ecosystem worksheets are best for third grade learners?', 'How do forest research projects develop environmental literacy in third grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Fruits', lsi: ['scientific investigation', 'nutrition research', 'informational writing', 'data presentation', 'health literacy'], questions: ['What fruit science worksheets work best for third graders?', 'How do fruit-themed research activities build health literacy in third grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Garden', lsi: ['persuasive writing', 'opinion paragraphs', 'evidence support', 'environmental awareness', 'argumentative skills'], questions: ['What garden writing worksheets are appropriate for third grade students?', 'How do garden-themed prompts develop persuasive writing in third grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Insects', lsi: ['research report', 'life cycle analysis', 'scientific observation', 'informational writing', 'classification research'], questions: ['What insect research worksheets are best for third grade learners?', 'How do insect-themed projects develop classification skills in third grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Ocean', lsi: ['marine research', 'ecosystem analysis', 'scientific writing', 'data interpretation', 'conservation awareness'], questions: ['What ocean research worksheets work best for third graders?', 'How do ocean-themed projects develop research skills in third grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Pets', lsi: ['persuasive writing', 'opinion essays', 'research skills', 'evidence support', 'responsible ownership'], questions: ['What pet care writing worksheets are appropriate for third grade students?', 'How do pet-themed activities develop persuasive writing in third grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Pirates', lsi: ['narrative writing', 'adventure composition', 'descriptive language', 'story planning', 'creative expression'], questions: ['What pirate writing worksheets are best for third grade learners?', 'How do pirate-themed prompts develop creative writing in third grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Robots', lsi: ['design thinking', 'technical writing', 'problem-solving skills', 'engineering concepts', 'innovation vocabulary'], questions: ['What robot design worksheets work best for third graders?', 'How do robot-themed activities develop design thinking in third grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Spring', lsi: ['descriptive writing', 'nature journals', 'seasonal observation', 'creative composition', 'sensory language'], questions: ['What spring writing worksheets are appropriate for third grade students?', 'How do spring-themed prompts develop descriptive writing in third grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA, Seasonal' },
  { theme: 'Summer', lsi: ['creative writing', 'narrative composition', 'journal prompts', 'independent practice', 'writing fluency'], questions: ['What summer writing worksheets prevent learning loss in third grade?', 'How do summer-themed prompts maintain writing skills for third graders?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA, Seasonal' },
  { theme: 'Superheroes', lsi: ['narrative writing', 'character creation', 'story arc', 'descriptive paragraphs', 'creative composition'], questions: ['What superhero writing worksheets are best for third grade learners?', 'How do superhero-themed prompts develop character writing in third grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Travel', lsi: ['informational writing', 'research projects', 'geography vocabulary', 'cultural analysis', 'multi-source reading'], questions: ['What travel writing worksheets work best for third graders?', 'How do travel-themed research projects build geographic literacy in third grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Vegetables', lsi: ['scientific writing', 'nutrition research', 'informational text', 'evidence-based conclusions', 'health education'], questions: ['What vegetable science worksheets are appropriate for third grade students?', 'How do vegetable-themed research activities build science writing in third grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
  { theme: 'Winter', lsi: ['creative writing', 'descriptive language', 'narrative structure', 'sensory details', 'seasonal composition'], questions: ['What winter creative writing worksheets are best for third grade learners?', 'How do winter-themed prompts develop descriptive writing in third grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA, Seasonal' },
  { theme: 'Zoo', lsi: ['research projects', 'animal reports', 'informational writing', 'evidence evaluation', 'multi-source synthesis'], questions: ['What zoo research worksheets work best for third graders?', 'How do zoo-themed research projects develop writing skills in third grade?'], volume: 'Low (<100)', competition: 'Low', serp: 'Images, PAA' },
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
