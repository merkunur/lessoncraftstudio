#!/usr/bin/env node
/**
 * SEO Part 146: Grade Hub Pages Optimization
 * - Expands app arrays to 12-14 per grade
 * - Adds teacherGuide field to GradeContent interface
 * - Adds EN teacher guide content for all 5 grades
 * - Refines EN keywords with stronger long-tail primaries
 * - Updates app count references in intros and FAQs
 */

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'frontend', 'config', 'grade-content.ts');
let content = fs.readFileSync(filePath, 'utf8');

// ── Step 1: Add teacherGuide to GradeContent interface ──────────────
const oldInterface = `interface GradeContent {
  title: string;
  description: string;
  keywords: string;
  heading: string;
  name: string;
  intro: string;
  ageRange: string;
  appIds: string[];
  faq: Array<{ question: string; answer: string }>;
}`;

const newInterface = `interface GradeContent {
  title: string;
  description: string;
  keywords: string;
  heading: string;
  name: string;
  intro: string;
  ageRange: string;
  appIds: string[];
  faq: Array<{ question: string; answer: string }>;
  teacherGuide?: {
    heading: string;
    sections: Array<{ title: string; content: string }>;
  };
}`;

if (!content.includes(oldInterface)) {
  console.error('ERROR: Could not find GradeContent interface to replace');
  process.exit(1);
}
content = content.replace(oldInterface, newInterface);
console.log('\u2713 Added teacherGuide to GradeContent interface');

// ── Step 2: Expand app arrays ────────────────────────────────────────

// Preschool: 6 -> 12
const oldPreschool = `const preschoolApps = [
  'coloring',
  'draw-and-color',
  'drawing-lines',
  'big-small-app',
  'matching-app',
  'pattern-train',
];`;

const newPreschool = `const preschoolApps = [
  'coloring',
  'draw-and-color',
  'drawing-lines',
  'big-small-app',
  'matching-app',
  'pattern-train',
  'find-and-count',
  'shadow-match',
  'picture-sort',
  'odd-one-out',
  'picture-bingo',
  'find-objects',
];`;

content = content.replace(oldPreschool, newPreschool);
console.log('\u2713 Preschool apps: 6 -> 12');

// Kindergarten: 8 -> 14
const oldKindergarten = `const kindergartenApps = [
  'image-addition',
  'alphabet-train',
  'word-search',
  'coloring',
  'find-and-count',
  'pattern-worksheet',
  'picture-sort',
  'shadow-match',
];`;

const newKindergarten = `const kindergartenApps = [
  'image-addition',
  'alphabet-train',
  'word-search',
  'coloring',
  'find-and-count',
  'pattern-worksheet',
  'picture-sort',
  'shadow-match',
  'draw-and-color',
  'matching-app',
  'drawing-lines',
  'big-small-app',
  'picture-bingo',
  'odd-one-out',
];`;

content = content.replace(oldKindergarten, newKindergarten);
console.log('\u2713 Kindergarten apps: 8 -> 14');

// First grade: 8 -> 14
const oldFirstGrade = `const firstGradeApps = [
  'math-worksheet',
  'subtraction',
  'word-scramble',
  'image-crossword',
  'sudoku',
  'find-objects',
  'grid-match',
  'writing-app',
];`;

const newFirstGrade = `const firstGradeApps = [
  'math-worksheet',
  'subtraction',
  'word-scramble',
  'image-crossword',
  'sudoku',
  'find-objects',
  'grid-match',
  'writing-app',
  'image-addition',
  'code-addition',
  'pattern-worksheet',
  'coloring',
  'odd-one-out',
  'treasure-hunt',
];`;

content = content.replace(oldFirstGrade, newFirstGrade);
console.log('\u2713 First grade apps: 8 -> 14');

// Second grade: 8 -> 14
const oldSecondGrade = `const secondGradeApps = [
  'math-puzzle',
  'code-addition',
  'word-guess',
  'image-cryptogram',
  'odd-one-out',
  'picture-path',
  'prepositions',
  'more-less',
];`;

const newSecondGrade = `const secondGradeApps = [
  'math-puzzle',
  'code-addition',
  'word-guess',
  'image-cryptogram',
  'odd-one-out',
  'picture-path',
  'prepositions',
  'more-less',
  'math-worksheet',
  'subtraction',
  'word-search',
  'image-crossword',
  'sudoku',
  'find-and-count',
];`;

content = content.replace(oldSecondGrade, newSecondGrade);
console.log('\u2713 Second grade apps: 8 -> 14');

// Third grade: 8 -> 14
const oldThirdGrade = `const thirdGradeApps = [
  'math-puzzle',
  'code-addition',
  'word-guess',
  'sudoku',
  'treasure-hunt',
  'missing-pieces',
  'chart-count-color',
  'picture-bingo',
];`;

const newThirdGrade = `const thirdGradeApps = [
  'math-puzzle',
  'code-addition',
  'word-guess',
  'sudoku',
  'treasure-hunt',
  'missing-pieces',
  'chart-count-color',
  'picture-bingo',
  'math-worksheet',
  'subtraction',
  'word-scramble',
  'image-crossword',
  'word-search',
  'writing-app',
];`;

content = content.replace(oldThirdGrade, newThirdGrade);
console.log('\u2713 Third grade apps: 8 -> 14');

// ── Step 3: Refine EN keywords ───────────────────────────────────────

// Preschool
content = content.replace(
  "keywords: 'preschool worksheets, free printable preschool activities, worksheets ages 3-4, preschool coloring pages, tracing worksheets preschool, matching activities preschool, pattern worksheets pre-k, size comparison preschool, early learning printables free, fine motor skills worksheets, pre-k worksheets printable, preschool activity sheets',",
  "keywords: 'free printable preschool worksheets, preschool worksheets ages 3-4, pre-k printable activities, preschool coloring pages free, tracing worksheets for preschoolers, matching activities for 3 year olds, pattern worksheets pre-k, size comparison preschool, early learning printables free, fine motor skills worksheets preschool, preschool worksheet generators, printable preschool activity sheets',"
);
console.log('\u2713 Preschool EN keywords refined');

// Kindergarten
content = content.replace(
  "keywords: 'kindergarten worksheets, free printable kindergarten activities, worksheets ages 5-6, kindergarten math worksheets, alphabet worksheets kindergarten, word search kindergarten, counting worksheets kindergarten, pattern worksheets kindergarten, sorting activities kids, shadow matching worksheets, kindergarten printables free, kindergarten activity sheets',",
  "keywords: 'free kindergarten worksheets printable, kindergarten worksheets ages 5-6, free printable kindergarten activities, kindergarten math worksheets addition, alphabet worksheets for kindergarten, word search for kindergarteners, counting worksheets kindergarten free, pattern worksheets kindergarten, sorting activities for kids, shadow matching worksheets free, kindergarten worksheet generators, printable kindergarten activity sheets',"
);
console.log('\u2713 Kindergarten EN keywords refined');

// First grade
content = content.replace(
  "keywords: 'first grade worksheets, free printable 1st grade activities, worksheets ages 6-7, 1st grade math worksheets, subtraction worksheets first grade, word scramble worksheets, crossword puzzles first grade, sudoku for kids, hidden objects worksheets, grid matching worksheets, first grade printables free, first grade activity sheets',",
  "keywords: 'free first grade worksheets printable, 1st grade worksheets ages 6-7, free printable first grade activities, first grade math worksheets addition subtraction, subtraction worksheets for 1st grade, word scramble worksheets first grade, crossword puzzles for first graders, sudoku for kids grade 1, hidden objects worksheets free, first grade worksheet generators, printable 1st grade activity sheets, first grade writing worksheets',"
);
console.log('\u2713 First grade EN keywords refined');

// Second grade
content = content.replace(
  "keywords: 'second grade worksheets, free printable 2nd grade activities, worksheets ages 7-8, 2nd grade math puzzles, code addition worksheets, word guess worksheets, cryptogram worksheets kids, odd one out worksheets, picture path worksheets, prepositions worksheets, more or less worksheets, second grade printables free',",
  "keywords: 'free second grade worksheets printable, 2nd grade worksheets ages 7-8, free printable second grade activities, 2nd grade math puzzle worksheets, code addition worksheets for kids, word guess worksheets second grade, cryptogram worksheets for 2nd graders, odd one out worksheets free, prepositions worksheets grade 2, second grade worksheet generators, printable 2nd grade activity sheets, more or less comparison worksheets',"
);
console.log('\u2713 Second grade EN keywords refined');

// Third grade
content = content.replace(
  "keywords: '3rd grade worksheets, free printable third grade activities, worksheets ages 8-9, 3rd grade math puzzles, sudoku for kids grade 3, critical thinking worksheets, logic puzzles third grade, math puzzles grade 3, third grade printables free, treasure hunt worksheets, picture bingo worksheets, third grade activity sheets',",
  "keywords: 'free third grade worksheets printable, 3rd grade worksheets ages 8-9, free printable third grade activities, 3rd grade math puzzle worksheets, sudoku for kids grade 3, critical thinking worksheets 3rd grade, logic puzzles for third graders, math puzzles grade 3 free, third grade worksheet generators, treasure hunt worksheets printable, picture bingo worksheets free, third grade writing worksheets',"
);
console.log('\u2713 Third grade EN keywords refined');

// ── Step 4: Update app count references in EN intros and FAQs ────────

// Preschool intro
content = content.replace(
  'Our six preschool worksheet generators are designed',
  'Our twelve preschool worksheet generators are designed'
);

// Preschool FAQ: "six types"
content = content.replace(
  'You can print six types of preschool worksheets',
  'You can print twelve types of preschool worksheets'
);

// Preschool FAQ: "All six generators"
content = content.replace(
  'All six generators are completely free',
  'All twelve generators are completely free'
);

// Kindergarten intro
content = content.replace(
  'Our eight kindergarten worksheet generators cover',
  'Our fourteen kindergarten worksheet generators cover'
);

// Kindergarten FAQ
content = content.replace(
  'You can create eight types of kindergarten worksheets',
  'You can create fourteen types of kindergarten worksheets'
);

// First grade intro
content = content.replace(
  'Our eight first-grade worksheet generators provide',
  'Our fourteen first-grade worksheet generators provide'
);

// First grade FAQ
content = content.replace(
  'You can create eight types at no cost: Math Worksheets for addition and subtraction drills',
  'You can create fourteen types at no cost: Math Worksheets for addition and subtraction drills'
);

// Second grade intro
content = content.replace(
  'Our eight second-grade worksheet generators are designed',
  'Our fourteen second-grade worksheet generators are designed'
);

// Second grade FAQ
content = content.replace(
  'You can create eight types at no cost: Math Puzzle for number-based challenges',
  'You can create fourteen types at no cost: Math Puzzle for number-based challenges'
);

// Generic "All eight generators draw" references (there may be multiple across grades)
// Use a function to replace them contextually
let count = 0;
content = content.replace(/All eight generators draw from a library/g, () => {
  count++;
  return 'All fourteen generators draw from a library';
});
if (count > 0) console.log(`\u2713 Updated ${count} "All eight generators" references`);

console.log('\u2713 Updated app count references in EN intros and FAQs');

// ── Step 5: Add teacher guide content to EN entries ──────────────────

const teacherGuides = {
  preschool: {
    heading: "Teacher\u2019s Guide: Preschool Worksheets",
    sections: [
      {
        title: "Setting Up a Print-and-Play Station",
        content: "Create a dedicated area in your classroom with a printer, paper trays sorted by activity type, and a display of finished examples. Label bins with picture icons so even pre-readers can find the right worksheets independently. Keep crayons, pencils, and glue sticks within reach. A well-organized station lets children choose their own activities during free-play time, building autonomy while reducing the need for adult direction. Rotate the featured generators weekly to maintain novelty and cover all skill areas across the term."
      },
      {
        title: "Scaffolding for Three-Year-Olds",
        content: "Three-year-olds often need hand-over-hand guidance the first time they encounter a new worksheet format. Sit with the child, model the first item together, then let them attempt the second one independently before stepping back. Use verbal cues like \u201CWhat comes next in the pattern?\u201D rather than pointing directly at the answer. For tracing activities, highlight the starting dot with a bright sticker. Reduce page complexity by choosing the easiest generator settings, and celebrate effort rather than accuracy \u2014 at this age, the process matters more than the product."
      },
      {
        title: "Integrating Worksheets with Circle Time",
        content: "Worksheets become more meaningful when they connect to a shared classroom experience. After a circle-time discussion about farm animals, send children to the print station to create animal-themed coloring pages or matching worksheets. This reinforces vocabulary and concepts while the topic is still fresh. You can also use completed worksheets as conversation starters: ask children to describe what they drew, name the colors they used, or explain which object was bigger. This turns a solitary activity into a language-rich social opportunity."
      },
      {
        title: "Parent Communication Tips",
        content: "Sending worksheets home is an excellent way to keep families informed about classroom learning. Attach a brief note explaining the skill being practiced \u2014 for example, \u201CThis week we are working on pattern recognition. Ask your child to describe the pattern before completing the row.\u201D Encourage parents to sit alongside their child for five to ten minutes rather than leaving them alone with the page. Suggest that families choose themes the child is passionate about, since personal interest dramatically increases engagement and persistence at the preschool level."
      }
    ]
  },
  kindergarten: {
    heading: "Teacher\u2019s Guide: Kindergarten Worksheets",
    sections: [
      {
        title: "Transitioning from Play to Structured Work",
        content: "Kindergarteners are still learning how to sit, focus, and follow multi-step instructions. Introduce worksheets gradually by starting with familiar, play-like formats such as coloring pages and shadow matching before moving to more structured activities like addition and word search. Keep initial sessions short \u2014 ten to fifteen minutes \u2014 and build stamina over the first term. Pair worksheet time with movement breaks: after completing a page, children can deliver it to a \u201Cfinished work\u201D basket across the room, giving them a chance to stretch before the next activity."
      },
      {
        title: "Differentiation Strategies",
        content: "A single kindergarten class can span a wide developmental range. Use the generator settings to create tiered worksheets for the same activity. Struggling students might receive a Find and Count page with five hidden items, while advanced learners search for fifteen. For Image Addition, set number ranges to within five for some children and within ten for others. Group worksheets into color-coded folders \u2014 green for approaching, blue for on-level, and purple for extending \u2014 so you can distribute them quickly without singling anyone out."
      },
      {
        title: "Assessment Through Worksheets",
        content: "Completed worksheets provide a natural, low-stress record of student progress. Date-stamp each page and file it in a portfolio. Over several weeks, patterns emerge: you can track whether a child\u2019s letter formation is improving, whether they can consistently identify patterns, or whether counting accuracy increases with practice. Use these portfolios during parent conferences to show concrete evidence of growth. Because every worksheet is unique, you can also compare performance across attempts to see whether a skill is becoming more automatic."
      },
      {
        title: "Classroom Management Tips",
        content: "Minimize disruption by establishing clear routines. Teach children the three-step worksheet procedure: get your page, complete it at your seat, place it in the finished basket. Use a visual timer projected on the board so children know how much time remains. Assign table captains who distribute materials and collect pencils. For early finishers, have a \u201Cbonus challenge\u201D bin with harder versions of the same generators. These routines free you to circulate, observe, and provide one-on-one support where it is needed most."
      }
    ]
  },
  'first-grade': {
    heading: "Teacher\u2019s Guide: First Grade Worksheets",
    sections: [
      {
        title: "Curriculum Alignment",
        content: "First grade standards typically require fluency with addition and subtraction within twenty, recognition of high-frequency sight words, legible handwriting, and the ability to solve simple logic problems. Our fourteen generators map directly to these goals: Math Worksheets and Subtraction build arithmetic fluency, Word Scramble and Image Crossword reinforce spelling and vocabulary, and Sudoku develops logical reasoning. When planning your week, assign two to three generators that target the current unit\u2019s objectives, rotating choices so students encounter each tool multiple times across the year."
      },
      {
        title: "Independent Work Stations",
        content: "First graders are ready for structured center rotations. Set up a worksheet station alongside reading, writing, and math-manipulative stations. Place laminated instruction cards showing step-by-step directions with pictures for each generator. Stock the station with freshly printed pages at three difficulty levels. Children visit the station for fifteen to twenty minutes, choose a page, complete it, and self-check where answer keys are available. This builds independence, time management, and accountability \u2014 skills that support academic growth across all subjects."
      },
      {
        title: "Progress Tracking",
        content: "Create a simple tracking chart where students color in a box each time they complete a worksheet type. Over the term, the chart reveals which activities a child gravitates toward and which they avoid. If a student consistently skips subtraction, that is a signal to provide encouragement and scaffolding rather than more choice. Pair tracking charts with periodic timed challenges \u2014 for example, how many addition problems a child can solve correctly in two minutes \u2014 to monitor fluency growth objectively. Share results with families to celebrate milestones."
      },
      {
        title: "Homework Integration",
        content: "Sending one or two worksheets home each week extends practice without overburdening families. Choose generators that match the current classroom unit and set the difficulty to a level where the child can work independently. Include a parent tip at the top: \u201CAsk your child to explain their strategy before writing the answer.\u201D This turns homework into a brief conversation about thinking, which deepens understanding far more than silent completion. Vary the format weekly \u2014 a math page one night, a word puzzle the next \u2014 to maintain engagement and cover multiple skill areas."
      }
    ]
  },
  'second-grade': {
    heading: "Teacher\u2019s Guide: Second Grade Worksheets",
    sections: [
      {
        title: "Multi-Step Problem Solving",
        content: "Second graders are moving from single-operation tasks to multi-step challenges. Math Puzzle and Code Addition generators are ideal for this transition because they require students to solve one problem before using its answer in the next step. Introduce these gradually: start with two-step puzzles and increase complexity as confidence builds. Teach students to underline key information, circle the operation, and check their work by reversing the final step. These metacognitive habits transfer directly to standardized test formats and real-world problem solving."
      },
      {
        title: "Cross-Curricular Connections",
        content: "Worksheets become more powerful when they connect to other subjects. Use Image Cryptogram during a science unit on animals \u2014 the hidden phrase can be a fun fact students then research further. Assign Prepositions worksheets during a geography lesson, asking children to describe where countries or landmarks are located relative to each other. Word Guess pairs well with vocabulary from any content area: social studies terms, science words, or even music vocabulary. These connections show students that skills are not isolated \u2014 reading, math, and reasoning work together everywhere."
      },
      {
        title: "Cooperative Learning",
        content: "While worksheets are often individual activities, they can also fuel collaboration. Print two different versions of the same Math Puzzle and have partners solve them simultaneously, then compare strategies and answers. For Odd One Out, let small groups debate which item does not belong \u2014 there is often more than one defensible answer, and the discussion itself builds critical thinking. Pair a stronger reader with a developing reader for Word Guess so they can sound out letters together. Cooperative structures increase engagement, deepen understanding, and build social skills."
      },
      {
        title: "Formative Assessment",
        content: "Use worksheets as quick check-ins rather than graded assignments. After a mini-lesson on two-digit subtraction, hand out a targeted Subtraction worksheet and observe which students finish quickly and accurately versus those who struggle. Collect the pages, sort them into three piles \u2014 secure, developing, and needs support \u2014 and use those groupings to plan the next day\u2019s instruction. This responsive teaching cycle ensures that no student is left behind and no student is held back. Keep the stakes low: students should see worksheets as practice, not tests."
      }
    ]
  },
  'third-grade': {
    heading: "Teacher\u2019s Guide: Third Grade Worksheets",
    sections: [
      {
        title: "Critical Thinking Extensions",
        content: "Third graders are ready for worksheets that go beyond finding the right answer. After completing a Math Puzzle, ask students to create their own version for a classmate, which requires working backwards from the solution. For Word Search and Word Scramble, challenge students to categorize the words they find by part of speech or topic. Treasure Hunt worksheets already have a built-in narrative arc \u2014 extend this by asking children to write the next chapter of the story using the vocabulary from the puzzle. These extensions transform consumption into creation and develop higher-order thinking skills."
      },
      {
        title: "Self-Directed Learning",
        content: "By third grade, students can take ownership of their worksheet practice. Create a weekly menu of six generator options with point values based on difficulty: easier tasks earn one point, moderate tasks earn two, and challenging tasks earn three. Students must accumulate a minimum number of points each week but can choose how. This system honors different learning preferences and paces while ensuring everyone meets a baseline. Add a brief reflection slip where students note what was easy, what was hard, and what strategy they used. Self-reflection is a cornerstone of independent learning."
      },
      {
        title: "Portfolio Building",
        content: "A worksheet portfolio becomes a powerful tool for student-led conferences. Have children select their best work from each month, write a sentence explaining why they chose it, and file it in a personal folder. By the end of the year, students have a tangible record of their growth \u2014 from simple subtraction pages in September to complex multi-step puzzles in May. Portfolios also give families a clear picture of progress that goes beyond grades. During conferences, let the child walk their parents through the folder, explaining what each page shows they learned."
      },
      {
        title: "Preparing for Standardized Assessment",
        content: "Many third graders face their first standardized tests. Worksheets can reduce test anxiety by familiarizing students with common question formats. Sudoku mirrors the logical elimination required by many test items. Image Crossword practices the vocabulary and context-clue skills tested in reading sections. Chart Count and Color develops data-interpretation abilities that appear in math assessments. Run a weekly \u201Ctest-prep station\u201D using these generators at slightly above the student\u2019s comfort level, then review answers as a group. Consistent low-stakes practice builds confidence, so the actual test feels like just another worksheet."
      }
    ]
  }
};

// For each grade, find the EN faq closing and insert teacherGuide
for (const [gradeId, guide] of Object.entries(teacherGuides)) {
  // Build the teacherGuide string
  const sectionsStr = guide.sections.map(s => {
    return `        { title: '${s.title}', content: '${s.content.replace(/'/g, "\\'")}' }`;
  }).join(',\n');

  const teacherGuideStr = `      teacherGuide: {\n        heading: '${guide.heading.replace(/'/g, "\\'")}',\n        sections: [\n${sectionsStr},\n        ],\n      },`;

  // Find grade section
  const gradeKey = `'${gradeId}'`;
  const gradeStartIdx = content.indexOf(`  ${gradeKey}: {`);
  if (gradeStartIdx === -1) {
    console.error(`ERROR: Could not find grade ${gradeId}`);
    process.exit(1);
  }

  // Find EN section within this grade
  const enStartIdx = content.indexOf('    en: {', gradeStartIdx);
  if (enStartIdx === -1) {
    console.error(`ERROR: Could not find EN section for ${gradeId}`);
    process.exit(1);
  }

  // Find DE section start (next locale after EN)
  const deStartIdx = content.indexOf('    de: {', enStartIdx);
  if (deStartIdx === -1) {
    console.error(`ERROR: Could not find DE section after EN for ${gradeId}`);
    process.exit(1);
  }

  // Find the closing of EN block: last "]," before "    de: {"
  const enCloseSearch = content.substring(enStartIdx, deStartIdx);
  const lastFaqClose = enCloseSearch.lastIndexOf('],\n    },');

  if (lastFaqClose === -1) {
    console.error(`ERROR: Could not find faq closing for EN ${gradeId}`);
    process.exit(1);
  }

  // Insert teacherGuide after "]," and before "},"
  const insertPoint = enStartIdx + lastFaqClose + 2; // after '],'
  content = content.substring(0, insertPoint) + '\n' + teacherGuideStr + '\n' + content.substring(insertPoint);

  console.log(`\u2713 Added teacher guide for ${gradeId} EN (${guide.sections.length} sections)`);
}

// ── Write ─────────────────────────────────────────────────────────────
fs.writeFileSync(filePath, content, 'utf8');
const lineCount = content.split('\n').length;
console.log(`\n\u2714 grade-content.ts updated successfully (${lineCount} lines)`);
