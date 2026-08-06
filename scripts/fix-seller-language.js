const fs = require('fs');
const path = require('path');

const ideaDir = 'C:/Users/rkgen/lessoncraftstudio/frontend/config/idea-content/en';
const startDir = 'C:/Users/rkgen/lessoncraftstudio/frontend/config/start-content/en';

const ideaFiles = [
  'second-grade-printable-ideas.ts',
  'space-printable-ideas.ts',
  'spring-printable-ideas.ts',
  'summer-printable-ideas.ts',
  'thanksgiving-printable-ideas.ts',
  'third-grade-printable-ideas.ts',
  'winter-printable-ideas.ts',
];

const startFiles = [
  'amazon-kdp-activity-books.ts',
  'commercial-license-guide.ts',
  'complete-guide-printable-business.ts',
  'create-worksheets-that-sell.ts',
  'etsy-printable-business.ts',
  'marketing-printable-business.ts',
  'printable-business-blueprint.ts',
  'printable-business-income.ts',
  'printable-business-legal.ts',
  'scaling-printable-business.ts',
  'tools-for-printable-business.ts',
  'printable-business-toolkit.ts',
];

function applyReplacements(content) {
  // === TPT / Teachers Pay Teachers ===
  content = content.replace(/platform: 'Teachers Pay Teachers'/g, "platform: 'Gumroad'");

  // TPT platform tip titles
  content = content.replace(/Creating (\w[\w ]*?) Classroom Resources for TPT Sellers/g, 'Selling $1 Resources on Gumroad');
  content = content.replace(/Creating (\w[\w ]*?) Classroom Resources for TPT/g, 'Selling $1 Resources on Gumroad');
  content = content.replace(/Creating (\w[\w ]*?) Resources for TPT Sellers/g, 'Selling $1 Resources on Gumroad');

  content = content.replace(/sell ([\w\s]+?) printables on TPT/g, 'sell $1 printables on Gumroad');
  content = content.replace(/Teachers Pay Teachers/g, 'Gumroad');
  content = content.replace(/ on TPT/g, ' on Gumroad');
  content = content.replace(/\bTPT\b/g, 'Gumroad');
  content = content.replace(/\bTpT\b/g, 'Gumroad');

  // === classroom - specific phrases first ===
  content = content.replace(/classroom-ready/g, 'ready-to-sell');
  content = content.replace(/classroom sessions/g, 'group sessions');
  content = content.replace(/classroom Thanksgiving celebrations/g, 'seasonal group activities');
  content = content.replace(/classroom Thanksgiving celebration/g, 'seasonal group activity');
  content = content.replace(/classroom Thanksgiving/g, 'seasonal');
  content = content.replace(/classroom harvest celebrations/g, 'group harvest activities');
  content = content.replace(/classroom harvest celebration/g, 'group harvest activity');
  content = content.replace(/classroom celebration solutions/g, 'group activity solutions');
  content = content.replace(/classroom celebration/g, 'group activity');
  content = content.replace(/classroom teachers/g, 'buyers');
  content = content.replace(/classroom activities/g, 'group activities');
  content = content.replace(/classroom printing budgets/g, 'bulk printing budgets');
  content = content.replace(/classroom printing/g, 'bulk printing');
  content = content.replace(/classroom units/g, 'product bundles');
  content = content.replace(/classroom unit/g, 'product bundle');
  content = content.replace(/classroom themes/g, 'seasonal themes');
  content = content.replace(/classroom centers/g, 'product bundles');
  content = content.replace(/classroom resource collections/g, 'product collections');
  content = content.replace(/classroom resources/g, 'product collections');
  content = content.replace(/classroom resource/g, 'product');
  content = content.replace(/classroom energy/g, 'seasonal energy');
  content = content.replace(/classroom focus/g, 'engagement');
  content = content.replace(/classroom content/g, 'product content');
  content = content.replace(/classroom materials/g, 'product materials');
  content = content.replace(/classroom windows/g, 'windows');
  content = content.replace(/for the classroom/g, 'to sell online');
  content = content.replace(/in the classroom/g, 'in practice');
  content = content.replace(/their classrooms/g, 'their stores');
  content = content.replace(/the classroom/g, 'the market');
  content = content.replace(/a classroom/g, 'a product set');
  content = content.replace(/every classroom/g, 'every store');
  content = content.replace(/mixed-ability classrooms/g, 'mixed-ability audiences');
  content = content.replace(/mixed-ability autumn classrooms/g, 'mixed-ability autumn audiences');
  content = content.replace(/mixed-ability winter classrooms/g, 'mixed-ability winter audiences');
  content = content.replace(/autumn classrooms/g, 'autumn audiences');
  content = content.replace(/winter classrooms/g, 'winter audiences');
  content = content.replace(/\bclassrooms\b/g, 'stores');
  content = content.replace(/\bclassroom\b/g, 'store');

  // === students ===
  content = content.replace(/student readiness ranges/g, 'skill-level ranges');
  content = content.replace(/student readiness/g, 'skill-level');
  content = content.replace(/student skill gaps/g, 'skill gaps');
  content = content.replace(/student engagement/g, 'engagement');
  content = content.replace(/student success/g, 'user success');
  content = content.replace(/student name/g, 'name');
  content = content.replace(/students performing/g, 'learners performing');
  content = content.replace(/students arrive/g, 'users arrive');
  content = content.replace(/students who have/g, 'children who have');
  content = content.replace(/students must/g, 'learners must');
  content = content.replace(/students can/g, 'users can');
  content = content.replace(/students identify/g, 'users identify');
  content = content.replace(/for students/g, 'for users');
  content = content.replace(/older students/g, 'older children');
  content = content.replace(/advanced students/g, 'advanced users');
  content = content.replace(/struggling learners/g, 'users needing extra support');
  content = content.replace(/re-engage students/g, 'boost engagement');
  content = content.replace(/re-energize students/g, 'boost engagement');
  content = content.replace(/students during/g, 'children during');
  content = content.replace(/students develop/g, 'users develop');
  content = content.replace(/students who/g, 'users who');
  content = content.replace(/students encounter/g, 'children encounter');
  content = content.replace(/students increasingly/g, 'children increasingly');
  content = content.replace(/students face/g, 'children face');
  content = content.replace(/where students/g, 'where users');
  content = content.replace(/keep students/g, 'keep users');
  content = content.replace(/student performance/g, 'user performance');
  content = content.replace(/student\b/g, 'user');
  content = content.replace(/\bstudents\b/g, 'users');

  // === teachers ===
  content = content.replace(/teachers who need/g, 'buyers who need');
  content = content.replace(/teachers who must/g, 'sellers who must');
  content = content.replace(/teachers who face/g, 'sellers who face');
  content = content.replace(/teachers searching/g, 'buyers searching');
  content = content.replace(/teachers planning/g, 'sellers planning');
  content = content.replace(/teachers seeking/g, 'buyers seeking');
  content = content.replace(/teachers running/g, 'sellers running');
  content = content.replace(/teachers creating/g, 'sellers creating');
  content = content.replace(/teachers evaluate/g, 'buyers evaluate');
  content = content.replace(/teachers actively/g, 'buyers actively');
  content = content.replace(/teachers begin/g, 'buyers begin');
  content = content.replace(/teachers purchase/g, 'buyers purchase');
  content = content.replace(/teachers and parents/g, 'buyers and parents');
  content = content.replace(/teachers and homeschool/g, 'buyers and homeschool');
  content = content.replace(/teachers integrating/g, 'sellers integrating');
  content = content.replace(/teachers need/g, 'buyers need');
  content = content.replace(/teachers can/g, 'sellers can');
  content = content.replace(/teachers consistently/g, 'buyers consistently');
  content = content.replace(/teachers face/g, 'sellers face');
  content = content.replace(/teachers return/g, 'buyers return');
  content = content.replace(/teachers emerging/g, 'buyers emerging');
  content = content.replace(/teachers start/g, 'buyers start');
  content = content.replace(/teachers particularly/g, 'buyers particularly');
  content = content.replace(/teachers restocking/g, 'buyers restocking');
  content = content.replace(/teachers finalize/g, 'buyers finalize');
  content = content.replace(/teachers prepare/g, 'buyers prepare');
  content = content.replace(/teachers mapping/g, 'buyers mapping');
  content = content.replace(/teachers map/g, 'buyers map');
  content = content.replace(/teachers are among/g, 'sellers are among');
  content = content.replace(/teachers are the/g, 'sellers are the');
  content = content.replace(/teachers incorporate/g, 'buyers incorporate');
  content = content.replace(/for teachers/g, 'for sellers');
  content = content.replace(/from teachers/g, 'from buyers');
  content = content.replace(/of teachers/g, 'of buyers');
  content = content.replace(/to teachers/g, 'to buyers');
  content = content.replace(/parents and teachers/g, 'parents and sellers');
  content = content.replace(/teacher conferences/g, 'report card feedback');
  content = content.replace(/teacher conference recommendations/g, 'parent feedback');
  content = content.replace(/a teacher/g, 'a seller');
  content = content.replace(/\bteachers\b/g, 'buyers');
  content = content.replace(/\bTeachers\b/g, 'Buyers');
  content = content.replace(/\bteacher\b/g, 'buyer');
  content = content.replace(/\bTeacher\b/g, 'Buyer');

  // === educators ===
  content = content.replace(/Educators & Sellers/g, 'Sellers');
  content = content.replace(/Parents & Educators/g, 'Sellers');
  content = content.replace(/\beducators\b/g, 'sellers');
  content = content.replace(/\bEducators\b/g, 'Sellers');
  content = content.replace(/\beducator\b/g, 'seller');

  // === kindergarteners / preschoolers ===
  content = content.replace(/for kindergarteners/g, 'for the kindergarten-age market');
  content = content.replace(/for preschoolers/g, 'for the preschool-age market');
  content = content.replace(/\bkindergarteners\b/g, 'the kindergarten-age market');
  content = content.replace(/\bKindergarteners\b/g, 'The kindergarten-age market');
  content = content.replace(/\bpreschoolers\b/g, 'the preschool-age market');
  content = content.replace(/\bPreschoolers\b/g, 'The preschool-age market');

  // === young learners ===
  content = content.replace(/young learners/g, 'the younger audience');

  // === child-friendly / kid-friendly ===
  content = content.replace(/child-friendly/g, 'engaging');
  content = content.replace(/kid-friendly/g, 'engaging');

  // === differentiated instruction ===
  content = content.replace(/differentiated instruction/g, 'tiered product bundles');
  content = content.replace(/differentiate instruction/g, 'create tiered product bundles');
  content = content.replace(/differentiated materials/g, 'tiered materials');
  content = content.replace(/differentiation demand/g, 'tiered-product demand');
  content = content.replace(/differentiation options/g, 'tiered difficulty options');
  content = content.replace(/differentiation guidance/g, 'difficulty-tier guidance');
  content = content.replace(/differentiation suggestions/g, 'difficulty-tier suggestions');
  content = content.replace(/differentiated practice/g, 'tiered practice');
  content = content.replace(/differentiated resources/g, 'tiered resources');
  content = content.replace(/differentiated math/g, 'tiered math');
  content = content.replace(/differentiated center/g, 'tiered product');
  content = content.replace(/differentiated/g, 'tiered');
  content = content.replace(/differentiation/g, 'tiered difficulty');
  content = content.replace(/differentiate\b/g, 'tier');

  // === curriculum ===
  content = content.replace(/cross-curricular/g, 'cross-category');
  content = content.replace(/curriculum-justifiable/g, 'market-justified');
  content = content.replace(/curriculum-aligned/g, 'skill-aligned');
  content = content.replace(/curriculum-friendly/g, 'market-friendly');
  content = content.replace(/curriculum-integrated/g, 'skill-integrated');
  content = content.replace(/curriculum complexity/g, 'content complexity');
  content = content.replace(/curriculum integration/g, 'content integration');
  content = content.replace(/curriculum standards/g, 'content standards');
  content = content.replace(/curriculum scope/g, 'content scope');
  content = content.replace(/curriculum fillers/g, 'content gap-fillers');
  content = content.replace(/curriculum coordinators/g, 'content reviewers');
  content = content.replace(/curriculum connections/g, 'skill connections');
  content = content.replace(/curriculum objectives/g, 'learning objectives');
  content = content.replace(/curriculum scheduling/g, 'content scheduling');
  content = content.replace(/curriculum content/g, 'seasonal content');
  content = content.replace(/curriculum precision/g, 'skill precision');
  content = content.replace(/core curriculum/g, 'core content');
  content = content.replace(/academic curriculum/g, 'academic content');
  content = content.replace(/the curriculum/g, 'the content library');
  content = content.replace(/their curriculum/g, 'their content');
  content = content.replace(/curriculum-light/g, 'low-prep');
  content = content.replace(/November curriculum/g, 'November content');
  content = content.replace(/January-February curriculum/g, 'January-February content');
  content = content.replace(/January curriculum/g, 'January content');
  content = content.replace(/spring curriculum/g, 'spring content');
  content = content.replace(/winter semester/g, 'winter season');
  content = content.replace(/March-May curriculum/g, 'March-May content');
  content = content.replace(/March-April lesson/g, 'March-April content');
  content = content.replace(/November lesson plans/g, 'November content plans');
  content = content.replace(/lesson plans/g, 'content plans');
  content = content.replace(/lesson calendars/g, 'content calendars');
  content = content.replace(/lesson planners/g, 'content planners');
  content = content.replace(/\bcurriculum\b/g, 'content catalog');

  // Fix any double "content content" artifacts
  content = content.replace(/content content/g, 'content');
  // Fix "seasonal content content"
  content = content.replace(/seasonal seasonal/g, 'seasonal');
  // Fix "buyers buyers"
  content = content.replace(/buyers buyers/g, 'buyers');
  // Fix "sellers sellers"
  content = content.replace(/sellers sellers/g, 'sellers');

  return content;
}

let processed = 0;
let skipped = 0;

for (const file of ideaFiles) {
  const fp = path.join(ideaDir, file);
  if (fs.existsSync(fp)) {
    let content = fs.readFileSync(fp, 'utf8');
    content = applyReplacements(content);
    fs.writeFileSync(fp, content, 'utf8');
    console.log('OK: ' + file);
    processed++;
  } else {
    console.log('SKIP: ' + file);
    skipped++;
  }
}

for (const file of startFiles) {
  const fp = path.join(startDir, file);
  if (fs.existsSync(fp)) {
    let content = fs.readFileSync(fp, 'utf8');
    content = applyReplacements(content);
    fs.writeFileSync(fp, content, 'utf8');
    console.log('OK: ' + file);
    processed++;
  } else {
    console.log('SKIP: ' + file);
    skipped++;
  }
}

console.log('\nDone. Processed: ' + processed + ', Skipped: ' + skipped);
