#!/usr/bin/env node
/**
 * Part 147: Product Category Pages Optimization (8 EN pages)
 * - Adds appComparison to CategoryContent interface
 * - Updates EN keywords with long-tail primaries
 * - Expands EN intros to 600+ words
 * - Inserts appComparison data for all 8 EN categories
 */

const fs = require('fs');
const path = require('path');

const FILE = path.join(__dirname, '..', 'frontend', 'config', 'category-content.ts');

let src = fs.readFileSync(FILE, 'utf8');
const original = src;

// === Step 1: Extend CategoryContent interface with appComparison ============
const interfaceEnd = 'faq: Array<{ question: string; answer: string }>;';
if (!src.includes('appComparison')) {
  src = src.replace(
    interfaceEnd,
    interfaceEnd + '\n  appComparison?: {\n    heading: string;\n    rows: Array<{ appId: string; name: string; bestFor: string; skills: string; difficulty: string }>;\n    summary: string;\n  };'
  );
  console.log('[OK] Added appComparison to CategoryContent interface');
} else {
  console.log('[SKIP] appComparison already in interface');
}

// === Step 2: Update EN keywords with long-tail primaries ====================

const keywordUpdates = {
  'math': {
    old: "keywords: 'math worksheets, printable math, addition worksheets, subtraction worksheets, math puzzles for kids, counting worksheets, number sense, free math generators, elementary math, kindergarten math, PreK math activities, math worksheet maker',",
    new: "keywords: 'free printable math worksheet generators, math worksheets for preschool to 3rd grade, addition worksheets generator, subtraction worksheets printable, math puzzles for kids, counting worksheets kindergarten, number sense activities, free math generators for teachers, elementary math practice sheets, PreK math activities, math worksheet maker online free',",
  },
  'language-arts': {
    old: "keywords: 'language arts worksheets, alphabet worksheets, handwriting practice, word scramble printable, preposition worksheets, letter recognition, vocabulary worksheets, writing practice, literacy worksheets, phonics printables, kids literacy, language arts generator',",
    new: "keywords: 'free language arts worksheet generators for kids, alphabet worksheets printable preschool, handwriting practice sheets generator, word scramble printable for elementary students, preposition worksheets with pictures, letter recognition activities, vocabulary worksheets generator, writing practice sheets free, literacy worksheets kindergarten, phonics printables for early readers',",
  },
  'word-games': {
    old: "keywords: 'word games for kids, word search generator, printable crossword puzzles, word guessing game, cryptogram puzzles, vocabulary games, word puzzle worksheets, spelling games, word search maker, educational word games, word games printable, kids word puzzles',",
    new: "keywords: 'printable word games and puzzles for elementary students, word search generator free for kids, picture crossword puzzles printable, word guessing game worksheets, image cryptogram puzzles for children, vocabulary games for classroom, word puzzle worksheets generator, spelling games printable free, word search maker for teachers, educational word games K to 3rd grade',",
  },
  'art-creativity': {
    old: "keywords: 'coloring pages for kids, printable coloring sheets, drawing worksheets, creative activities, coloring page generator, draw and color worksheets, art worksheets free, kids coloring printable, guided drawing, fine motor art, themed coloring, art activities preschool',",
    new: "keywords: 'free coloring and drawing worksheet generators for kids, printable coloring pages generator, guided drawing worksheets for children, creative art activities preschool to 3rd grade, coloring page maker online free, draw and color worksheets printable, art worksheets for fine motor skills, themed coloring pages animals vehicles seasons, kids coloring printable generator, art activities for classroom and home',",
  },
  'logic-puzzles': {
    old: "keywords: 'logic puzzles for kids, printable brain teasers, sudoku for children, odd one out worksheets, critical thinking, problem solving worksheets, picture path puzzles, treasure hunt printable, logical reasoning, thinking skills, logic games kids, brain games printable',",
    new: "keywords: 'printable logic puzzles and brain teasers for children, sudoku for kids free printable, odd one out worksheets preschool to 3rd grade, critical thinking worksheets for elementary students, problem solving activities for kids, picture path puzzles printable, treasure hunt worksheet generator, logical reasoning games for children, thinking skills worksheets free, brain games printable for classroom',",
  },
  'visual-perception': {
    old: "keywords: 'visual perception worksheets, find and count worksheets, hidden objects printable, missing pieces puzzle, observation skills, visual discrimination, spot the difference, counting worksheets, visual scanning, perceptual skills, visual perception kids, picture puzzles',",
    new: "keywords: 'free visual perception worksheets for kids printable, find and count worksheets preschool, hidden objects printable for children, missing pieces puzzle worksheets, observation skills activities for kids, visual discrimination worksheets free, visual scanning exercises printable, perceptual skills worksheets occupational therapy, visual perception activities for elementary students, picture puzzles for classroom',",
  },
  'matching-sorting': {
    old: "keywords: 'matching worksheets, sorting activities, classification worksheets, compare and contrast, visual discrimination, matching games for kids, sorting exercises, preschool matching, picture sorting, size comparison, shadow matching, grid matching worksheets',",
    new: "keywords: 'free matching and sorting worksheets for preschool to 3rd grade, matching worksheets printable for kids, sorting activities for kindergarten, classification worksheets for elementary students, compare and contrast activities, visual discrimination matching games, sorting exercises printable free, preschool matching worksheets generator, picture sorting activities, shadow matching worksheets, grid matching worksheets free',",
  },
  'patterns-motor': {
    old: "keywords: 'pattern worksheets, fine motor activities, tracing worksheets, hand-eye coordination, pattern recognition, sequencing activities, preschool tracing, drawing lines worksheets, pattern completion, bingo printables, motor skills worksheets, fine motor practice',",
    new: "keywords: 'free pattern recognition and fine motor worksheets printable, pattern worksheets for preschool to 3rd grade, fine motor activities for kids, tracing worksheets generator, hand-eye coordination exercises printable, pattern recognition worksheets free, sequencing activities for kindergarten, drawing lines worksheets for preschoolers, pattern completion worksheets, picture bingo printable generator, motor skills worksheets for early learners',",
  },
};

for (const [cat, kw] of Object.entries(keywordUpdates)) {
  if (src.includes(kw.old)) {
    src = src.replace(kw.old, kw.new);
    console.log(`[OK] Updated keywords for ${cat}`);
  } else {
    console.log(`[SKIP] Keywords for ${cat} already updated or not found`);
  }
}

// === Step 3: Expand EN intros to exceed 600 words ===========================
// Each category gets 1-2 extra paragraphs appended to its intro

const introExpansions = [
  {
    cat: 'math',
    anchor: "Pick a tool below and create your first worksheet in under a minute.'",
    guard: 'Teachers across grade levels use these generators',
    extra: "\\n\\nTeachers across grade levels use these generators to differentiate instruction without extra prep time. A kindergarten teacher can print Image Addition sheets with sums to five, while the teacher next door generates Math Puzzle grids with three-digit numbers \\u2014 both from the same platform in under a minute. Homeschooling parents appreciate the variety too: instead of buying workbook after workbook, they generate fresh pages that match exactly where their child is in the curriculum.\\n\\nThe connection between hands-on practice and math fluency is well established in educational research. Students who work through varied problem sets develop flexible number strategies rather than relying on rote memorization. Our generators support this approach by ensuring no two worksheets repeat, encouraging children to think through each problem rather than recall answers from a previous attempt. Combined with the visual supports in tools like Image Addition and Chart Count \\u0026 Color, these materials bridge the gap between concrete understanding and abstract computation \\u2014 the exact progression recommended by leading math education frameworks.'",
  },
  {
    cat: 'language-arts',
    anchor: "Choose a tool below and create your first language arts worksheet in under a minute.'",
    guard: 'Classroom teachers find these generators especially valuable',
    extra: "\\n\\nClassroom teachers find these generators especially valuable for differentiation. While one group practices single-letter tracing, another can work on full-sentence writing \\u2014 all generated from the same tool with a few clicks. Literacy specialists use Word Scramble as a phonemic awareness warm-up, and ESL instructors rely on Prepositions to give visual context to spatial vocabulary that textbooks often present in isolation.\\n\\nResearch consistently shows that repeated, varied exposure to print accelerates literacy development. Because every worksheet is unique, students encounter new letter combinations and vocabulary each session, preventing the stale repetition that leads to disengagement. The combination of visual cues, hands-on writing, and game-like puzzle formats keeps motivation high while building the foundational skills children need for fluent reading and confident writing.'",
  },
  {
    cat: 'word-games',
    anchor: "Pick a word game below and have a fresh puzzle ready for your students in under a minute.'",
    guard: 'Word puzzles are a proven way to reinforce vocabulary',
    extra: "\\n\\nWord puzzles are a proven way to reinforce vocabulary across subject areas. Teachers embed them into science units (hiding ecosystem terms in a word search), social studies lessons (creating crosswords with geography vocabulary), and even math classes (using cryptograms with number-word terms). The thematic flexibility of our generators makes this cross-curricular approach effortless.\\n\\nCognitive science research highlights that puzzle-based learning activates multiple memory pathways simultaneously \\u2014 visual scanning, letter recognition, and semantic retrieval all work together when a child solves a word game. This multi-channel engagement produces stronger retention than flashcard-style drilling alone. Parents and tutors also appreciate word puzzles as screen-free activities that keep children entertained on road trips, in waiting rooms, or during quiet time at home.'",
  },
  {
    cat: 'art-creativity',
    anchor: "Pick a tool below and generate your first art worksheet in under a minute.'",
    guard: 'Educators use coloring and drawing activities strategically',
    extra: "\\n\\nEducators use coloring and drawing activities strategically throughout the school day. They serve as calming transitions between high-energy lessons, reward time for students who finish work early, and therapeutic outlets during social-emotional learning blocks. Occupational therapists also recommend themed coloring pages to improve pencil grip, pressure control, and bilateral coordination in children who struggle with fine motor tasks.\\n\\nThe educational value of creative activities extends well beyond motor skills. When children choose colors, plan compositions, and decide how to fill a space, they practice decision-making and self-expression. Drawing exercises in particular build observational accuracy \\u2014 children learn to notice shapes, proportions, and spatial relationships that transfer directly to geometry, map reading, and scientific illustration. Our generators ensure a steady supply of fresh designs so creative time never becomes repetitive.'",
  },
  {
    cat: 'logic-puzzles',
    anchor: "Choose a puzzle type below and create your first brain teaser in under a minute.'",
    guard: 'Teachers integrate logic puzzles across the curriculum',
    extra: "\\n\\nTeachers integrate logic puzzles across the curriculum as warm-ups, early-finisher activities, and enrichment for gifted learners. A five-minute sudoku at the start of math class primes the brain for numerical reasoning, while a treasure hunt during geography reinforces cardinal directions in a hands-on format. Parents value these puzzles as productive screen-free alternatives that challenge children without feeling like homework.\\n\\nDevelopmental research shows that regular exposure to logic-based activities strengthens executive function skills \\u2014 working memory, cognitive flexibility, and inhibitory control \\u2014 that predict academic success across all subjects. By presenting problems in game-like formats, our generators keep the cognitive challenge high while the perceived difficulty stays low, motivating children to persist through multi-step reasoning tasks they might otherwise avoid.'",
  },
  {
    cat: 'visual-perception',
    anchor: "Pick a tool below and create your first visual perception worksheet in under a minute.'",
    guard: 'Visual perception activities are widely used across educational',
    extra: "\\n\\nVisual perception activities are widely used across educational and clinical settings. Special education teachers incorporate them into individualized education plans, occupational therapists assign them as take-home practice, and classroom teachers use them as brain-break activities that still build cognitive skills. The worksheets are especially beneficial for children with attention difficulties, as the engaging visual format sustains focus longer than text-heavy exercises.\\n\\nResearch in developmental psychology confirms that strong visual processing skills correlate with reading fluency, mathematical reasoning, and spatial awareness. Children who practice systematic visual scanning \\u2014 the kind demanded by Find and Count and Find Objects \\u2014 develop the left-to-right tracking habits essential for reading. Missing Pieces exercises build the mental rotation abilities that later support geometry, engineering thinking, and map interpretation. Our generators make it easy to provide daily visual perception practice without any prep time.'",
  },
  {
    cat: 'matching-sorting',
    anchor: "No account is needed, and the tools work on any device with a browser and a printer.'",
    guard: 'Beyond the classroom, matching and sorting activities',
    extra: "\\n\\nBeyond the classroom, matching and sorting activities are staples of occupational therapy and early intervention programs. Therapists use them to assess and strengthen visual discrimination, working memory, and executive function in children who may need extra support. Parents find them equally useful at home \\u2014 a printed Shadow Match page makes a productive quiet-time activity, and Picture Sort doubles as a conversation starter about how we organize the world around us.'",
    section: 'matching-sorting',
  },
  {
    cat: 'patterns-motor',
    anchor: "No account is needed, and the tools work on any device with a browser and a printer.'",
    guard: 'These worksheets also serve as valuable tools for occupational',
    extra: "\\n\\nThese worksheets also serve as valuable tools for occupational therapists and early intervention specialists. Tracing paths and completing visual patterns are standard activities in fine motor development programs, and our generators eliminate the need to photocopy from outdated workbooks. Teachers report that the themed illustrations \\u2014 featuring everything from dinosaurs to space ships \\u2014 motivate reluctant writers to pick up a pencil and practice, turning skill-building into an activity children genuinely look forward to.'",
    section: 'patterns-motor',
  },
];

for (const exp of introExpansions) {
  if (src.includes(exp.guard)) {
    console.log(`[SKIP] ${exp.cat} intro already expanded`);
    continue;
  }

  // For categories that share the same anchor text, we need to find the right occurrence
  if (exp.section) {
    const sectionStart = src.indexOf(`'${exp.section}': {`);
    if (sectionStart === -1) {
      console.log(`[WARN] Could not find section for ${exp.cat}`);
      continue;
    }
    const anchorIdx = src.indexOf(exp.anchor, sectionStart);
    if (anchorIdx === -1 || anchorIdx > sectionStart + 5000) {
      console.log(`[WARN] Could not find anchor for ${exp.cat}`);
      continue;
    }
    // Replace at this specific position
    const before = src.substring(0, anchorIdx);
    const after = src.substring(anchorIdx);
    // Remove trailing ' from anchor, add extra, then re-add '
    const anchorWithoutQuote = exp.anchor.slice(0, -1); // remove trailing '
    const newIntroEnd = anchorWithoutQuote + exp.extra;
    src = before + after.replace(exp.anchor, newIntroEnd);
    console.log(`[OK] Expanded ${exp.cat} intro`);
  } else {
    if (src.includes(exp.anchor)) {
      const anchorWithoutQuote = exp.anchor.slice(0, -1);
      const newIntroEnd = anchorWithoutQuote + exp.extra;
      src = src.replace(exp.anchor, newIntroEnd);
      console.log(`[OK] Expanded ${exp.cat} intro`);
    } else {
      console.log(`[WARN] Could not find anchor for ${exp.cat}`);
    }
  }
}

// === Step 4: Insert appComparison data for all 8 EN categories ==============

const comparisons = {
  'math': {
    heading: 'Comparing Our 7 Math Worksheet Generators',
    rows: [
      { appId: 'image-addition', name: 'Image Addition', bestFor: 'PreK\u2013K visual learners', skills: 'Visual counting, number bonds', difficulty: 'Easy' },
      { appId: 'math-worksheet', name: 'Math Worksheets', bestFor: 'K\u20133rd daily practice', skills: 'Addition, subtraction drills', difficulty: 'Easy\u2013Hard' },
      { appId: 'chart-count-color', name: 'Chart Count & Color', bestFor: 'K\u20132nd data skills', skills: 'Data reading, tallying', difficulty: 'Medium' },
      { appId: 'code-addition', name: 'Code Addition', bestFor: '1st\u20133rd puzzle lovers', skills: 'Addition with decoding', difficulty: 'Medium\u2013Hard' },
      { appId: 'math-puzzle', name: 'Math Puzzle', bestFor: '2nd\u20133rd advanced students', skills: 'Multi-step reasoning', difficulty: 'Hard' },
      { appId: 'more-less', name: 'More or Less', bestFor: 'PreK\u20131st number sense', skills: 'Number comparison', difficulty: 'Easy' },
      { appId: 'subtraction', name: 'Subtraction', bestFor: 'K\u20133rd take-away practice', skills: 'Subtraction fluency', difficulty: 'Easy\u2013Hard' },
    ],
    summary: 'Each math generator targets a different combination of skills and difficulty levels, making it easy to match worksheets to individual student needs. Start with Image Addition or More or Less for children just learning to count, then progress through Math Worksheets and Subtraction for computation practice. Chart Count & Color introduces early data literacy, while Code Addition and Math Puzzle provide enrichment challenges that keep advanced learners engaged. Together, these seven tools cover the full PreK-to-3rd-grade math curriculum.',
  },
  'language-arts': {
    heading: 'Comparing Our 4 Language Arts Generators',
    rows: [
      { appId: 'alphabet-train', name: 'Alphabet Train', bestFor: 'PreK\u2013K letter learners', skills: 'Letter recognition, sequencing', difficulty: 'Easy' },
      { appId: 'word-scramble', name: 'Word Scramble', bestFor: '1st\u20133rd spellers', skills: 'Spelling, vocabulary', difficulty: 'Medium\u2013Hard' },
      { appId: 'prepositions', name: 'Prepositions', bestFor: 'K\u20132nd grammar builders', skills: 'Spatial language, grammar', difficulty: 'Medium' },
      { appId: 'writing-app', name: 'Writing Practice', bestFor: 'PreK\u20132nd handwriting', skills: 'Letter formation, penmanship', difficulty: 'Easy\u2013Medium' },
    ],
    summary: 'These four generators form a complete early literacy toolkit. Alphabet Train and Writing Practice focus on the physical and visual foundations of reading \u2014 letter recognition, sequencing, and handwriting. Word Scramble builds on those skills by challenging students to reconstruct words from jumbled letters, reinforcing spelling patterns through active problem-solving. Prepositions rounds out the set by introducing grammar concepts through illustrated scenes, giving students visual anchors for abstract spatial vocabulary.',
  },
  'word-games': {
    heading: 'Comparing Our 4 Word Game Generators',
    rows: [
      { appId: 'word-search', name: 'Word Search', bestFor: 'K\u20133rd vocabulary review', skills: 'Visual scanning, spelling', difficulty: 'Easy\u2013Medium' },
      { appId: 'image-crossword', name: 'Image Crossword', bestFor: 'K\u20132nd visual learners', skills: 'Vocabulary, letter placement', difficulty: 'Medium' },
      { appId: 'word-guess', name: 'Word Guess', bestFor: '1st\u20133rd strategic thinkers', skills: 'Deduction, spelling', difficulty: 'Medium\u2013Hard' },
      { appId: 'image-cryptogram', name: 'Image Cryptogram', bestFor: '2nd\u20133rd code breakers', skills: 'Pattern recognition, decoding', difficulty: 'Hard' },
    ],
    summary: 'From simple scanning to complex decoding, these four word games form a natural difficulty progression. Word Search offers accessible vocabulary practice for all ages, while Image Crossword adds the challenge of fitting letters into intersecting slots. Word Guess introduces strategic deduction, and Image Cryptogram demands visual pattern recognition alongside spelling skills. Use them individually for targeted practice or rotate through all four for a well-rounded word-skills program.',
  },
  'art-creativity': {
    heading: 'Comparing Our 2 Art & Creativity Generators',
    rows: [
      { appId: 'coloring', name: 'Coloring Pages', bestFor: 'PreK\u20133rd all skill levels', skills: 'Fine motor control, color choice', difficulty: 'Easy' },
      { appId: 'draw-and-color', name: 'Draw and Color', bestFor: 'K\u20133rd aspiring artists', skills: 'Observation, hand-eye coordination', difficulty: 'Medium' },
    ],
    summary: 'Coloring Pages is the perfect starting point for any age \u2014 children simply fill in themed outlines with their choice of colors, building fine motor control and creative decision-making. Draw and Color takes the next step by asking children to replicate an illustration before coloring it, adding observational drawing skills and spatial awareness to the creative process. Together, these two tools cover the full spectrum from relaxing creative play to structured art instruction.',
  },
  'logic-puzzles': {
    heading: 'Comparing Our 4 Logic Puzzle Generators',
    rows: [
      { appId: 'sudoku', name: 'Sudoku for Kids', bestFor: 'K\u20133rd number reasoners', skills: 'Logical deduction, number placement', difficulty: 'Easy\u2013Hard' },
      { appId: 'odd-one-out', name: 'Odd One Out', bestFor: 'PreK\u20132nd classifiers', skills: 'Classification, pattern recognition', difficulty: 'Easy\u2013Medium' },
      { appId: 'picture-path', name: 'Picture Pathway', bestFor: 'PreK\u20132nd rule followers', skills: 'Sequential thinking, visual scanning', difficulty: 'Easy\u2013Medium' },
      { appId: 'treasure-hunt', name: 'Treasure Hunt', bestFor: '1st\u20133rd navigators', skills: 'Spatial reasoning, direction following', difficulty: 'Medium\u2013Hard' },
    ],
    summary: 'These four puzzle types target complementary reasoning skills. Odd One Out and Picture Pathway are ideal entry points for younger children, developing classification and rule-following through visual formats that require no reading. Sudoku for Kids introduces systematic number logic with scalable grid sizes, and Treasure Hunt combines spatial navigation with multi-step instruction following. Rotating through all four ensures children build a well-rounded set of critical thinking abilities.',
  },
  'visual-perception': {
    heading: 'Comparing Our 3 Visual Perception Generators',
    rows: [
      { appId: 'find-and-count', name: 'Find and Count', bestFor: 'PreK\u20132nd counters', skills: 'Counting accuracy, visual scanning', difficulty: 'Easy\u2013Medium' },
      { appId: 'find-objects', name: 'Find Objects', bestFor: 'K\u20133rd detail spotters', skills: 'Visual discrimination, attention', difficulty: 'Medium' },
      { appId: 'missing-pieces', name: 'Missing Pieces', bestFor: '1st\u20133rd spatial thinkers', skills: 'Spatial reasoning, part-whole analysis', difficulty: 'Medium\u2013Hard' },
    ],
    summary: 'Each visual perception generator targets a distinct processing skill. Find and Count combines counting practice with systematic scanning, making it ideal for early learners who need both math and visual support. Find Objects focuses purely on visual discrimination \u2014 distinguishing target items from complex backgrounds \u2014 which directly transfers to reading fluency. Missing Pieces adds spatial reasoning and mental rotation, challenging students to analyze how parts combine into wholes. Used together, these three tools build the complete visual processing foundation children need for academic success.',
  },
  'matching-sorting': {
    heading: 'Comparing Our 5 Matching & Sorting Generators',
    rows: [
      { appId: 'matching-app', name: 'MatchUp Maker', bestFor: 'PreK\u20132nd pair matchers', skills: 'Association, visual memory', difficulty: 'Easy' },
      { appId: 'grid-match', name: 'Grid Match', bestFor: 'K\u20133rd grid thinkers', skills: 'Structured matching, attention', difficulty: 'Medium' },
      { appId: 'shadow-match', name: 'Shadow Match', bestFor: 'PreK\u20131st shape recognizers', skills: 'Visual discrimination, spatial awareness', difficulty: 'Easy\u2013Medium' },
      { appId: 'picture-sort', name: 'Picture Sort', bestFor: 'K\u20133rd classifiers', skills: 'Classification, flexible thinking', difficulty: 'Medium\u2013Hard' },
      { appId: 'big-small-app', name: 'Big or Small', bestFor: 'PreK\u20131st size comparers', skills: 'Size comparison, ordering', difficulty: 'Easy' },
    ],
    summary: 'These five generators progress from simple pairing to complex categorization. MatchUp Maker and Shadow Match provide accessible entry points where children connect related items visually. Big or Small introduces quantitative comparison through size ordering. Grid Match raises the challenge with structured layouts requiring systematic scanning, and Picture Sort demands the highest cognitive load \u2014 sorting items by flexible criteria that can change between worksheets. This natural progression lets you scaffold matching and sorting skills across an entire school year.',
  },
  'patterns-motor': {
    heading: 'Comparing Our 4 Pattern & Fine Motor Generators',
    rows: [
      { appId: 'drawing-lines', name: 'Drawing Lines', bestFor: 'PreK\u2013K hand control', skills: 'Tracing, pencil control', difficulty: 'Easy' },
      { appId: 'pattern-train', name: 'Pattern Train', bestFor: 'PreK\u20132nd sequencers', skills: 'Pattern recognition, sequencing', difficulty: 'Easy\u2013Medium' },
      { appId: 'pattern-worksheet', name: 'Pattern Worksheets', bestFor: 'K\u20133rd analytical thinkers', skills: 'Pattern completion, visual memory', difficulty: 'Medium\u2013Hard' },
      { appId: 'picture-bingo', name: 'Picture Bingo', bestFor: 'PreK\u20133rd group play', skills: 'Visual matching, attention speed', difficulty: 'Easy' },
    ],
    summary: 'Drawing Lines focuses on the physical skill of hand control \u2014 tracing paths builds the steady movements children need for handwriting. Pattern Train and Pattern Worksheets then develop the cognitive side, challenging students to identify and extend visual sequences of increasing complexity. Picture Bingo adds a social dimension with group-play matching games that reinforce rapid visual recognition. Together, these four tools address both the physical and cognitive components of early learning readiness.',
  },
};

// For each category, insert appComparison into the EN block
for (const [catId, compData] of Object.entries(comparisons)) {
  const catStart = src.indexOf(`'${catId}': {`);
  if (catStart === -1) {
    console.log(`[WARN] Could not find category ${catId}`);
    continue;
  }

  const enStart = src.indexOf('    en: {', catStart);
  if (enStart === -1 || enStart > catStart + 200) {
    console.log(`[WARN] Could not find EN block for ${catId}`);
    continue;
  }

  // Find the de: or next locale block
  const deStart = src.indexOf('    de: {', enStart + 10);
  if (deStart === -1) {
    console.log(`[WARN] Could not find de: block after en: for ${catId}`);
    continue;
  }

  const enBlock = src.substring(enStart, deStart);
  if (enBlock.includes('appComparison')) {
    console.log(`[SKIP] appComparison already exists for ${catId}`);
    continue;
  }

  // Find the closing of the EN block: "    }," before "    de: {"
  const enBlockEnd = src.lastIndexOf('    },', deStart);
  if (enBlockEnd === -1 || enBlockEnd < enStart) {
    console.log(`[WARN] Could not find EN block end for ${catId}`);
    continue;
  }

  // Build the appComparison object string
  const rows = compData.rows.map(r => {
    // Escape single quotes in values
    const name = r.name.replace(/'/g, "\\'");
    const bestFor = r.bestFor.replace(/'/g, "\\'");
    const skills = r.skills.replace(/'/g, "\\'");
    const difficulty = r.difficulty.replace(/'/g, "\\'");
    return `        { appId: '${r.appId}', name: '${name}', bestFor: '${bestFor}', skills: '${skills}', difficulty: '${difficulty}' },`;
  }).join('\n');

  const heading = compData.heading.replace(/'/g, "\\'");
  const summary = compData.summary.replace(/'/g, "\\'");

  const compStr = `      appComparison: {\n        heading: '${heading}',\n        rows: [\n${rows}\n        ],\n        summary: '${summary}',\n      },\n`;

  // Insert before the closing },
  src = src.substring(0, enBlockEnd) + compStr + src.substring(enBlockEnd);
  console.log(`[OK] Inserted appComparison for ${catId}`);
}

// === Write result ===========================================================
if (src !== original) {
  fs.writeFileSync(FILE, src, 'utf8');
  console.log('\n[DONE] category-content.ts updated successfully');
} else {
  console.log('\n[DONE] No changes needed');
}
