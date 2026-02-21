#!/usr/bin/env node
/**
 * Part 110 - Cross-grade validation for forest + nature
 *
 * 1. Verifies forest keyword fixes (tree -> plant, tree -> species)
 * 2. Verifies nature kindergarten keyword fix (ecosystem -> wildlife)
 * 3. Adds 6 missing fields to nature second-grade section
 */

const fs = require('fs');
const path = require('path');

// ─── Verify forest fixes ───
const forestPath = path.join(__dirname, '..', 'frontend', 'content', 'themes', 'forest', 'en.ts');
const forestContent = fs.readFileSync(forestPath, 'utf8');

if (!forestContent.includes('plant growth data collection')) {
  console.error('FAIL: forest second-grade still has "tree growth"');
  process.exit(1);
}
if (!forestContent.includes('species population multiplication estimation')) {
  console.error('FAIL: forest third-grade still has "tree population"');
  process.exit(1);
}
console.log('PASS: forest keyword fixes verified');

// ─── Verify nature kindergarten fix ───
const naturePath = path.join(__dirname, '..', 'frontend', 'content', 'themes', 'nature', 'en.ts');
let natureContent = fs.readFileSync(naturePath, 'utf8');

if (!natureContent.includes('kindergarten wildlife worksheets printable')) {
  console.error('FAIL: nature kindergarten still has "ecosystem"');
  process.exit(1);
}
console.log('PASS: nature kindergarten keyword fix verified');

// ─── Add 6 missing fields to nature second-grade ───

// Check if already applied
if (natureContent.includes("'second-grade':") && natureContent.includes('uniqueGradeAngle') &&
    // Need to check it's specifically in second-grade, not just exists elsewhere
    true) {
  // More precise check: find the second-grade block and see if uniqueGradeAngle is between
  // second-grade opening and third-grade opening
  const sgStart = natureContent.indexOf("'second-grade':");
  const tgStart = natureContent.indexOf("'third-grade':");
  const sgBlock = natureContent.substring(sgStart, tgStart);
  if (sgBlock.includes('uniqueGradeAngle')) {
    console.log('SKIP: nature second-grade already has 6 fields');
    process.exit(0);
  }
}

// Find the insertion point: after the faq closing bracket in second-grade
// Pattern: the faq array ends with ],\n    },\n    'third-grade':
// We need to insert after the faq ] and before the closing },

// Find second-grade section boundaries
const sgStart = natureContent.indexOf("'second-grade':");
const tgStart = natureContent.indexOf("'third-grade':");
const sgBlock = natureContent.substring(sgStart, tgStart);

// Find the last ], in the second-grade block (that's the faq array closing)
const faqCloseIdx = sgBlock.lastIndexOf('],');
if (faqCloseIdx === -1) {
  console.error('FAIL: could not find faq closing in second-grade block');
  process.exit(1);
}

// The insertion point is right after the ],
const insertionPoint = sgStart + faqCloseIdx + 2; // after '],

const newFields = `
      uniqueGradeAngle: 'Second grade is the most data-collection-oriented and survey-driven stage for nature worksheets because seven- and eight-year-olds are developing the structured observation skills, quantitative analysis abilities, and evidence-based reasoning to study ecosystems not through passive appreciation but through active biodiversity surveys, organized data collection, systematic habitat comparison, and written arguments grounded in numerical evidence \u2014 understanding that ecosystems are communities of interacting organisms and their physical environment where energy flows through food webs from producers through consumers to decomposers while nutrients cycle continuously through living and nonliving components, that biodiversity can be measured by counting different species and their populations within a defined area and comparing results across habitats to assess ecosystem health, that food webs are networks of interconnected food chains where organisms occupy specific roles as producers, primary consumers, secondary consumers, or decomposers and where removing one species creates cascading effects throughout the network, and that human activities including habitat destruction, pollution, and resource overconsumption disrupt ecosystem balance in ways that careful observation and data collection can document. Nature worksheets are uniquely powerful at the second-grade level because children can now engage with biodiversity surveys and habitat data collection (conducting structured counts of organisms within defined areas, organizing findings into data tables, creating bar graphs showing species distribution, and comparing biodiversity across different habitats using quantitative evidence), food web analysis and ecosystem relationships (tracing energy flow through multi-branch food webs, identifying keystone species whose removal would cause the greatest disruption, classifying organisms by their ecological role, and predicting cascading effects of species addition or removal), environmental data analysis and graphing (collecting measurements of environmental conditions like temperature, moisture, and light in different habitats, graphing results to reveal patterns, and connecting abiotic conditions to the species found in each habitat), and conservation reasoning and evidence-based writing (using survey data and ecosystem knowledge to construct arguments about why specific habitats deserve protection, what actions threaten local ecosystems, and how communities can reduce their environmental impact).',
      developmentalMilestones: [
        { milestone: 'Biodiversity surveys and habitat data collection (seven- and eight-year-olds are developing the structured data collection skills and quantitative observation abilities to conduct systematic biodiversity surveys, organizing their findings into tables and graphs that reveal patterns in species distribution across habitats)', howWeAddress: 'nature worksheets where children plan and conduct structured biodiversity surveys within defined areas (counting every organism observed in a schoolyard quadrat, recording species names and tally counts in organized data tables, categorizing organisms as plants, insects, birds, mammals, or other groups), create bar graphs showing species distribution across different habitats (comparing the number of species found under trees versus in open grass versus near water sources versus in garden beds), calculate totals and differences using multi-step addition and subtraction within one hundred (if the tree habitat had forty-three organisms and the grass habitat had twenty-seven organisms, how many more organisms were found near trees, and what was the total across both habitats), and compare survey results across seasons or locations to identify patterns in biodiversity build the structured observation, data organization, and quantitative analysis skills that connect nature study to genuine ecological field research methodology' },
        { milestone: 'Food web analysis and ecosystem relationships (seven- and eight-year-olds are developing the systems thinking and ecological reasoning to understand that ecosystems function through interconnected food webs where energy flows from producers through multiple levels of consumers to decomposers)', howWeAddress: 'nature worksheets where children construct multi-branch food webs for local ecosystems (connecting grass to grasshoppers to frogs to snakes to hawks while also connecting grass to rabbits to foxes and connecting dead organisms to earthworms and fungi that return nutrients to soil), identify organisms by their ecological role (producers that make their own food through photosynthesis, primary consumers that eat producers, secondary consumers that eat primary consumers, and decomposers that break down dead material), predict cascading effects when species are removed or added to a food web (if all the frogs disappeared, grasshopper populations would increase because fewer are being eaten, which would cause grass to decrease because more grasshoppers are eating it, and snake populations would decrease because they lost a food source), and investigate keystone species whose presence or absence has outsized effects on ecosystem structure build the systems thinking, cause-and-effect reasoning, and ecological analysis skills that connect nature study to understanding how complex biological communities maintain balance' },
        { milestone: 'Environmental data analysis and conservation writing (seven- and eight-year-olds are developing the analytical reasoning and persuasive communication skills to use ecosystem data as evidence for conservation arguments, connecting quantitative observations to written explanations of why habitats deserve protection)', howWeAddress: 'nature worksheets where children collect environmental data from different habitats (measuring temperature in shaded versus sunny areas, observing moisture levels in different soil types, counting organisms in disturbed versus undisturbed areas), analyze their data to draw conclusions about how environmental conditions affect biodiversity (habitats with more varied conditions tend to support more species, areas with human disturbance often have lower biodiversity), research threats to local ecosystems using informational texts about habitat loss, pollution, and invasive species, and write evidence-based paragraphs arguing for specific conservation actions using both their own survey data and information from texts (our schoolyard survey found thirty-two species near the pond but only eleven near the parking lot, which shows that natural habitats support more biodiversity and should be protected from development) build the data analysis, evidence evaluation, and persuasive writing skills that connect nature study to environmental advocacy and civic engagement' },
      ],
      differentiationNotes: 'For struggling second graders, focus on three ecosystem concepts with graphic organizers and sentence frames (identify three organisms in a food chain and draw arrows showing what eats what, sort ten organism cards into producers and consumers with picture support, and complete a fill-in-the-blank paragraph about why a habitat is important using a word bank), simplify biodiversity surveys to counting organisms in two categories (plants and animals) within a small defined area using tally marks and pre-made data tables, and provide sentence starters for conservation writing such as this habitat is important because and one way to protect it is. For advanced second graders, extend to comparing biodiversity quantitatively across multiple ecosystems using species richness and abundance calculations, challenge children to conduct multi-session research projects tracking changes in a habitat over several weeks and graphing trends, introduce the concept of invasive species and have students research how one invasive species disrupts a local food web, analyze how different types of human land use (agriculture, urbanization, conservation areas) affect biodiversity using data from multiple sources, and write multi-paragraph persuasive pieces that include both quantitative evidence from surveys and qualitative evidence from research texts.',
      parentTakeaway: 'Nature worksheets give second-grade parents the opportunity to connect academic learning to everyday outdoor observations in ways that build genuine scientific thinking. The key strategy is to make nature data collection a family activity: count different species during a walk in the park and discuss which areas had more biodiversity and why, compare the organisms found in your backyard garden versus a nearby wooded area and discuss how habitat differences explain the different species, notice food web connections when you see a bird eating an insect or a squirrel gathering nuts and trace the energy chain back to plants and sunlight, visit the grocery store and discuss where food comes from and how agriculture affects natural ecosystems, and connect weather observations to ecosystem health by discussing how drought affects plants which affects herbivores which affects predators. When your child can conduct a simple biodiversity survey by counting species in a defined area and organizing results in a data table, trace a food web with at least four organisms explaining the role of each, compare two habitats using quantitative data and explain why one supports more biodiversity, and write a paragraph arguing for habitat protection using evidence from their observations, they have built the ecological data literacy, systems thinking, and evidence-based reasoning that nature worksheets develop through the most scientifically comprehensive and personally observable theme in second grade.',
      classroomIntegration: 'Nature worksheets anchor the most data-rich and ecologically comprehensive science unit in second grade because nature provides unlimited opportunities for structured observation, quantitative data collection, and evidence-based reasoning within walking distance of every classroom. Create a schoolyard biodiversity survey station where student teams use quadrat frames to count and categorize organisms in assigned areas, recording findings on structured data sheets that feed into a class-wide biodiversity database. Use food web worksheets during an ecosystem investigation center where children build physical food web models using yarn connections between organism cards, then systematically remove species to observe and discuss cascading effects. Connect environmental data worksheets to a habitat comparison project where children measure and record abiotic conditions (temperature, light, moisture) in different schoolyard microhabitats and correlate these with the species found in each area. Incorporate conservation writing worksheets into an environmental advocacy project where children use their survey data and research findings to write letters to school administrators about protecting natural areas on school grounds. A nature vocabulary wall with terms like biodiversity, ecosystem, food web, producer, consumer, decomposer, and habitat builds scientific language across the year. A seasonal observation journal where children record changes in a schoolyard ecosystem throughout the year builds longitudinal thinking and connects individual observations to larger ecological patterns.',
      assessmentRubric: [
        { skill: 'Biodiversity surveys and habitat data collection', emerging: 'counts organisms in an area with teacher support and records totals with assistance', proficient: 'plans and conducts a structured biodiversity survey within a defined area, records species and counts in organized data tables, creates bar graphs showing species distribution, calculates totals and differences using addition and subtraction within one hundred, and compares biodiversity across two or more habitats using quantitative evidence', advanced: 'designs multi-variable surveys comparing biodiversity across habitats with different environmental conditions, identifies patterns in species distribution and proposes explanations based on habitat characteristics, calculates and compares biodiversity metrics from multiple survey sessions, and evaluates how sampling methods affect results' },
        { skill: 'Food web analysis and ecosystem relationships', emerging: 'identifies one predator-prey relationship in an ecosystem with teacher prompting', proficient: 'constructs a food web with at least six organisms showing interconnected feeding relationships, classifies organisms as producers, consumers, or decomposers and explains each role, predicts cascading effects when one species is removed from the food web with specific reasoning, and explains why decomposers are essential for nutrient recycling in ecosystems', advanced: 'maps complex food webs showing multiple interconnected energy pathways across trophic levels, evaluates which species are keystone organisms whose removal would cause the greatest ecosystem disruption, analyzes how food web structure differs across ecosystem types, and designs investigations to test predictions about species interactions' },
        { skill: 'Environmental data analysis and conservation writing', emerging: 'states one reason a habitat is important with teacher guidance', proficient: 'collects and organizes environmental data from observations, draws conclusions about how conditions affect biodiversity using evidence from surveys, identifies at least two threats to local ecosystems from informational texts, and writes an evidence-based paragraph arguing for habitat protection using both observational data and research findings', advanced: 'synthesizes data from multiple sources including field observations, informational texts, and quantitative surveys to construct comprehensive conservation arguments, evaluates the effectiveness of different conservation strategies using evidence, and writes multi-paragraph persuasive pieces that integrate quantitative and qualitative evidence with clear reasoning about environmental protection' },
      ],`;

// Insert the new fields
natureContent = natureContent.substring(0, insertionPoint) + newFields + natureContent.substring(insertionPoint);

fs.writeFileSync(naturePath, natureContent, 'utf8');
console.log('PASS: nature second-grade 6 fields added');

// ─── Final verification ───
const finalContent = fs.readFileSync(naturePath, 'utf8');
const sgStart2 = finalContent.indexOf("'second-grade':");
const tgStart2 = finalContent.indexOf("'third-grade':");
const sgBlock2 = finalContent.substring(sgStart2, tgStart2);

const requiredFields = [
  'uniqueGradeAngle',
  'developmentalMilestones',
  'differentiationNotes',
  'parentTakeaway',
  'classroomIntegration',
  'assessmentRubric',
];

let allPresent = true;
for (const field of requiredFields) {
  if (!sgBlock2.includes(field)) {
    console.error(`FAIL: nature second-grade missing ${field}`);
    allPresent = false;
  }
}

if (allPresent) {
  console.log('PASS: all 6 fields verified in nature second-grade');
  console.log('\n=== Part 110 complete ===');
} else {
  process.exit(1);
}
