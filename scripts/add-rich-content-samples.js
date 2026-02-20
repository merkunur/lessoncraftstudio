/**
 * Part 12: Add sample rich content data to 3 English theme files.
 * Injects classroomScenarios, quickStats, differentiationStrategies,
 * assessmentIdeas, and crossCurricularLinks into animals, alphabet, numbers.
 */

const fs = require('fs');
const path = require('path');

const themesDir = path.join(__dirname, '..', 'frontend', 'content', 'themes');

// ── Sample data per theme ─────────────────────────────────────────────

const sampleData = {
  animals: {
    classroomScenarios: [
      {
        situation: 'A first-grade teacher notices that several students struggle with addition when the problems use abstract symbols alone.',
        solution: 'She introduces animal-themed image addition worksheets where children count groups of puppies and kittens to form number sentences. The visual anchors help students connect quantities to symbols.',
        outcome: 'Within two weeks, the struggling students can solve addition problems within 10 independently. Three students who were previously disengaged now voluntarily request extra worksheets during free time.',
      },
      {
        situation: 'A parent homeschooling a kindergartener finds the child resists any structured learning activity and only wants to play with toy animals.',
        solution: 'The parent prints animal matching and shadow match worksheets and presents them as a game: "Can you help these animals find their shadows?" The worksheets become an extension of imaginative play rather than a separate task.',
        outcome: 'The child completes three to four worksheets per session without resistance. Fine motor skills improve visibly within a month, and the child begins requesting "animal school" as part of the daily routine.',
      },
    ],
    quickStats: [
      { label: 'Recommended age range', value: '3\u20139 years' },
      { label: 'Worksheet apps available', value: '12 apps' },
      { label: 'Curriculum areas covered', value: '4 areas' },
      { label: 'Grade levels supported', value: 'Pre-K to 3rd' },
      { label: 'Average session length', value: '10\u201320 min' },
      { label: 'Unique animal images', value: '200+' },
    ],
    differentiationStrategies: [
      { learnerType: 'Visual learners', adaptation: 'Use the coloring and shadow match worksheets as primary activities. These leverage strong visual processing skills and provide multiple entry points for children who learn best through images rather than text.' },
      { learnerType: 'Kinesthetic learners', adaptation: 'Pair worksheets with physical animal figurines. Have children place figurines on the worksheet to solve problems before writing answers, bridging the gap between hands-on manipulation and paper-based learning.' },
      { learnerType: 'English language learners', adaptation: 'Start with image-heavy worksheets like find-and-count and matching before introducing word-based activities. Animal vocabulary is often among the first words ELL students learn, making this theme an excellent bridge to literacy tasks.' },
      { learnerType: 'Advanced learners', adaptation: 'Challenge them with multi-step word problems using animal data, or have them create their own animal-themed worksheets for classmates. The image crossword and word search apps offer adjustable difficulty for higher-level vocabulary work.' },
    ],
    assessmentIdeas: [
      { method: 'Portfolio collection', criteria: 'Collect one worksheet per week over a month. Compare early and late samples to document growth in counting accuracy, letter formation, and fine motor control.', gradeLevel: 'All grades' },
      { method: 'Observational checklist', criteria: 'While students work on animal sorting worksheets, note whether they can classify by one attribute (Pre-K), two attributes (K), or create their own categories (1st+).', gradeLevel: 'Pre-K to 1st' },
      { method: 'Exit ticket quiz', criteria: 'After completing a set of animal math worksheets, give students three quick problems without images to check whether they can transfer skills from themed to abstract contexts.', gradeLevel: '1st to 3rd' },
    ],
    crossCurricularLinks: [
      { subject: 'Science', connection: 'Animal worksheets naturally connect to life science standards. Sorting animals by habitat, diet, or body covering reinforces classification skills that are central to scientific inquiry.', activity: 'After completing an animal sorting worksheet, have students research one animal from each habitat group and present two facts to the class.' },
      { subject: 'Geography', connection: 'Different animals live on different continents, creating a natural bridge between zoology and world geography. Children begin to associate regions with their characteristic wildlife.', activity: 'Use a world map alongside animal worksheets. After identifying each animal, students place a sticker on the continent where it lives.' },
      { subject: 'Art', connection: 'Animal coloring and drawing worksheets develop fine motor skills and artistic expression simultaneously. Children learn to observe proportions, patterns, and details in animal forms.', activity: 'After coloring an animal worksheet, have students create an original animal drawing using the same techniques, then write one sentence describing their creation.' },
    ],
  },

  alphabet: {
    classroomScenarios: [
      {
        situation: 'A kindergarten teacher has a class of 22 students with widely varying letter knowledge\u2014some recognize all 26 letters while others know fewer than 10.',
        solution: 'She uses the alphabet train and writing app worksheets as differentiated stations. Beginners trace letters with large dotted guides, while advanced students complete word scramble puzzles. Both groups work within the same alphabet theme, so the classroom feels unified.',
        outcome: 'By mid-year, every student recognizes at least 20 uppercase letters. The word scramble group moves on to spelling short CVC words, while the tracing group builds confidence through visible daily progress.',
      },
      {
        situation: 'A parent notices their four-year-old can sing the ABC song but cannot identify individual letters when shown flashcards.',
        solution: 'The parent prints alphabet coloring worksheets where each page features one letter with a themed image (A for apple, B for bear). The child colors the image and traces the letter, creating a multisensory connection between the letter shape, its sound, and a concrete object.',
        outcome: 'After three weeks of daily ten-minute sessions, the child can identify 15 uppercase letters on sight and spontaneously points out letters on signs during car rides.',
      },
    ],
    quickStats: [
      { label: 'Letters covered', value: 'A\u2013Z' },
      { label: 'Worksheet apps available', value: '10 apps' },
      { label: 'Best starting age', value: '3\u20134 years' },
      { label: 'Skills developed', value: '6 areas' },
      { label: 'Average mastery time', value: '3\u20136 months' },
      { label: 'Phonics integration', value: 'Yes' },
    ],
    differentiationStrategies: [
      { learnerType: 'Struggling readers', adaptation: 'Focus on the alphabet train and writing app worksheets that provide large, clear letter models with directional arrows. Limit to 3\u20134 letters per session to avoid overload and build mastery before introducing new letters.' },
      { learnerType: 'Gifted learners', adaptation: 'Use word scramble and image crossword apps to extend letter knowledge into spelling and vocabulary. Challenge them to find patterns in letter combinations and create their own simple word puzzles.' },
      { learnerType: 'Students with dyslexia', adaptation: 'Print worksheets on colored paper (light yellow or blue) to reduce visual stress. Use the writing app with extra-large letter templates and pair with textured letter cards for multisensory reinforcement.' },
      { learnerType: 'Multilingual learners', adaptation: 'Leverage the fact that many languages share the Latin alphabet. Point out cognates on worksheets (e.g., animal/animal in Spanish) and use image-based activities to build letter-sound correspondence in the target language.' },
    ],
    assessmentIdeas: [
      { method: 'Letter recognition speed test', criteria: 'Show 26 letter cards one at a time. Record how many the student names correctly in 60 seconds. Repeat monthly to track growth.', gradeLevel: 'Pre-K to K' },
      { method: 'Writing sample analysis', criteria: 'Collect weekly writing samples from alphabet tracing worksheets. Assess letter formation, size consistency, and baseline alignment across the sample set.', gradeLevel: 'Pre-K to 1st' },
      { method: 'Phonics application check', criteria: 'After completing word-based alphabet worksheets, ask students to sound out three unfamiliar CVC words to see if they can apply letter-sound knowledge independently.', gradeLevel: 'K to 1st' },
    ],
    crossCurricularLinks: [
      { subject: 'Music', connection: 'Alphabet songs and rhymes reinforce letter sequence and phonemic awareness. Musical patterns help children remember letter order and associate sounds with rhythmic cues.', activity: 'After an alphabet worksheet session, sing a song that features the same letters. Have children clap on each target letter sound.' },
      { subject: 'Physical Education', connection: 'Letter formation involves the same fine motor planning used in sports and movement activities. Gross motor letter practice builds body awareness of letter shapes.', activity: 'Take alphabet worksheets outdoors. Have children form letters with their bodies or trace giant letters on the ground with sidewalk chalk before completing the paper version.' },
      { subject: 'Social Studies', connection: 'Letters connect to names, places, and cultural symbols. Learning the alphabet is a gateway to reading maps, understanding signs, and recognizing words in the community.', activity: 'After completing an alphabet worksheet, take a walk around the school and photograph signs that start with the featured letter. Create a class alphabet book of community words.' },
    ],
  },

  numbers: {
    classroomScenarios: [
      {
        situation: 'A second-grade teacher finds that students can solve basic addition on paper but freeze when presented with word problems involving numbers in real-world contexts.',
        solution: 'She introduces number-themed worksheets that present math through scenarios: "There are 24 apples in one basket and 18 in another. How many apples are there in total?" The consistent number theme helps students focus on mathematical reasoning rather than decoding unfamiliar contexts.',
        outcome: 'Word problem accuracy improves from 45% to 78% over six weeks. Students begin creating their own number stories during free writing time, demonstrating transfer of mathematical thinking to creative expression.',
      },
      {
        situation: 'A preschool parent is concerned because their three-year-old cannot count past five reliably and mixes up number names.',
        solution: 'The parent uses number-themed find-and-count and pattern worksheets with large, colorful number representations. Each session focuses on just one or two numbers, building recognition through repetition with varied visual contexts.',
        outcome: 'Within a month, the child counts to ten consistently and can identify written numerals 1 through 7. The parent reports that the child now counts objects spontaneously during daily activities like setting the table.',
      },
    ],
    quickStats: [
      { label: 'Number range covered', value: '1\u2013100+' },
      { label: 'Worksheet apps available', value: '11 apps' },
      { label: 'Operations practiced', value: '4 operations' },
      { label: 'Grade levels supported', value: 'Pre-K to 3rd' },
      { label: 'Problem types', value: '15+ types' },
      { label: 'Difficulty levels', value: 'Adjustable' },
    ],
    differentiationStrategies: [
      { learnerType: 'Students with math anxiety', adaptation: 'Start with number coloring pages and find-and-count activities that feel like games rather than tests. Gradually introduce computation through image addition where visual supports reduce the fear of "getting it wrong."' },
      { learnerType: 'Tactile learners', adaptation: 'Pair number worksheets with physical manipulatives. Have children build each number with blocks or counters before writing it on the worksheet, creating a concrete-to-abstract bridge that strengthens number sense.' },
      { learnerType: 'Students who need challenge', adaptation: 'Use the math puzzle and code addition apps which offer built-in difficulty scaling. Assign multi-step problems that combine operations, or have advanced students explain their solution strategies in writing.' },
      { learnerType: 'Students with dyscalculia', adaptation: 'Provide number line references alongside worksheets. Use color-coded operations (green for addition, red for subtraction) and allow extra time. The pattern worksheet app builds number sense through visual repetition without time pressure.' },
    ],
    assessmentIdeas: [
      { method: 'Number sense interview', criteria: 'Ask students to count forward from a given number, count backward, and identify numbers before and after a target. Record fluency and accuracy to gauge number sense development.', gradeLevel: 'Pre-K to 1st' },
      { method: 'Computation fluency probe', criteria: 'Give students a timed sheet of 20 single-digit addition problems. Track problems completed correctly per minute across weekly probes to measure fluency growth.', gradeLevel: '1st to 2nd' },
      { method: 'Problem-solving rubric', criteria: 'Evaluate student work on multi-step number worksheets using a three-point rubric: (1) identifies the operation needed, (2) computes accurately, (3) explains reasoning in a complete sentence.', gradeLevel: '2nd to 3rd' },
    ],
    crossCurricularLinks: [
      { subject: 'Cooking & Measurement', connection: 'Numbers are essential to recipes and measurement. Counting, measuring, and doubling or halving quantities connect number worksheets to real-world math application.', activity: 'After a number addition worksheet, follow a simple recipe that requires measuring ingredients. Have students calculate double and half portions.' },
      { subject: 'Music & Rhythm', connection: 'Musical rhythms are built on number patterns. Counting beats, recognizing time signatures, and understanding patterns in music reinforce numerical thinking.', activity: 'Clap number patterns from a pattern worksheet as rhythms. Students identify which number patterns sound like familiar songs or create their own rhythmic compositions.' },
      { subject: 'Financial Literacy', connection: 'Understanding numbers is the foundation of money skills. Counting coins, making change, and comparing prices all require the number skills practiced on worksheets.', activity: 'Set up a classroom store after number worksheets. Students use play money to purchase items, practicing addition and subtraction in a meaningful economic context.' },
    ],
  },
};

// ── Injection logic ─────────────────────────────────────────────────

function injectSampleData(themeId, data) {
  const filePath = path.join(themesDir, themeId, 'en.ts');
  let content = fs.readFileSync(filePath, 'utf8');

  // Check if data is already injected
  if (content.includes('classroomScenarios')) {
    console.log(`  [SKIP] ${themeId}/en.ts already has classroomScenarios`);
    return;
  }

  // Build the fields to inject
  const fields = [];

  // classroomScenarios
  fields.push(`  classroomScenarios: ${JSON.stringify(data.classroomScenarios, null, 4).replace(/\n/g, '\n  ')},`);

  // quickStats
  fields.push(`  quickStats: ${JSON.stringify(data.quickStats, null, 4).replace(/\n/g, '\n  ')},`);

  // differentiationStrategies
  fields.push(`  differentiationStrategies: ${JSON.stringify(data.differentiationStrategies, null, 4).replace(/\n/g, '\n  ')},`);

  // assessmentIdeas
  fields.push(`  assessmentIdeas: ${JSON.stringify(data.assessmentIdeas, null, 4).replace(/\n/g, '\n  ')},`);

  // crossCurricularLinks
  fields.push(`  crossCurricularLinks: ${JSON.stringify(data.crossCurricularLinks, null, 4).replace(/\n/g, '\n  ')},`);

  const injection = '\n  // -- Rich content (Part 12) --\n' + fields.join('\n\n') + '\n';

  // Insert before the closing `};` + `registerThemeContent` pattern
  // Use regex to find `};\n\nregisterThemeContent` which is the object end
  const closingPattern = /\n};\s*\nregisterThemeContent/;
  const match = content.match(closingPattern);
  if (!match || match.index === undefined) {
    console.error(`  [ERROR] ${themeId}/en.ts: cannot find closing pattern`);
    return;
  }

  // Insert the new fields just before the `\n};`
  const insertAt = match.index;
  content = content.slice(0, insertAt) + '\n' + injection + content.slice(insertAt);

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`  [OK] ${themeId}/en.ts: injected 5 rich content fields`);
}

// ── Main ────────────────────────────────────────────────────────────

console.log('Part 12: Injecting rich content sample data...\n');

for (const [themeId, data] of Object.entries(sampleData)) {
  console.log(`Processing ${themeId}...`);
  injectSampleData(themeId, data);
}

console.log('\nDone! Run `npx tsc --noEmit` to verify.');
