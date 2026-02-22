/**
 * Part 161 fix: Add 3 new features (ids 8-10) to 20 files that have 7 features.
 * Feature 8: Auto-generated answer keys
 * Feature 9: Themed backgrounds & borders
 * Feature 10: App-specific unique feature
 */
const fs = require('fs');
const path = require('path');

const DIR = path.join(__dirname, '..', 'frontend', 'content', 'product-pages', 'en');

// App-specific feature 10 for each generator
const APP_SPECIFIC = {
  'addition-worksheets': {
    icon: '\u2699\uFE0F',
    title: 'Four Exercise Modes Including Image-Based and Number Addition Problems',
    desc: 'Choose from four distinct addition exercise modes to match your teaching objectives. Image plus image mode presents visual counting problems using pictures. Image plus number mode combines pictures with numerals for transitional learners. Find the addend mode creates fill-in-the-blank equations developing algebraic thinking. Mixed mode randomizes problem types on each worksheet for comprehensive review and assessment preparation.',
  },
  'alphabet-train-worksheets': {
    icon: '\u2702\uFE0F',
    title: 'Cut-and-Paste Letter Blocks for Hands-On Alphabet Sequencing',
    desc: 'Generate alphabet train worksheets with printable letter blocks that students cut out and paste onto matching train cars. This hands-on format builds fine motor skills including cutting precision and glue control alongside letter recognition. Physical manipulation of letter pieces deepens alphabet sequence understanding through kinesthetic learning. The cut-and-paste format transforms passive recognition into active engagement with letter ordering.',
  },
  'code-addition-worksheets': {
    icon: '\uD83D\uDD10',
    title: 'Picture-to-Number Code Keys for Decoding Math Equations',
    desc: 'Each code addition worksheet features a unique picture-to-number cipher key that students must decode before solving addition problems. The code-breaking format transforms standard math practice into engaging puzzle activities. Students first identify which number each picture represents using the key, then complete addition equations. This dual-skill format develops both logical deduction and mathematical fluency simultaneously.',
  },
  'coloring-worksheets': {
    icon: '\uD83D\uDD8C\uFE0F',
    title: 'Outline Image Generation From 3000+ Full-Color Source Pictures',
    desc: 'Our coloring worksheet generator automatically converts full-color themed images into clean black-and-white outlines optimized for coloring activities. Every image from our 3000+ library produces professional-quality line art with clear boundaries and age-appropriate detail levels. Thick outlines suit preschool motor development while detailed outlines challenge older students. The automatic conversion eliminates manual tracing work entirely.',
  },
  'crossword-worksheets': {
    icon: '\uD83D\uDDBC\uFE0F',
    title: 'Picture Clues Instead of Text for Pre-Reader Crossword Puzzles',
    desc: 'Our crossword generator uses picture clues instead of written definitions, making crossword puzzles accessible to pre-readers and early readers. Students see an image and must spell the corresponding word in the crossword grid. This format builds spelling accuracy, phonemic awareness, and vocabulary simultaneously. The picture-based approach eliminates reading barriers while maintaining the full cognitive challenge of crossword puzzle solving.',
  },
  'cryptogram-worksheets': {
    icon: '\uD83D\uDD11',
    title: 'Unique Picture-to-Letter Cipher Keys for Every Worksheet',
    desc: 'Each cryptogram worksheet generates a unique picture-to-letter cipher key ensuring students cannot memorize solutions across worksheets. The decoder key displays each image paired with its corresponding letter for reference during puzzle solving. Teachers control key complexity by adjusting the number of unique symbols. Simple keys with five images suit beginning decoders while complex keys with fifteen images challenge advanced students.',
  },
  'draw-and-color-worksheets': {
    icon: '\uD83D\uDD8D\uFE0F',
    title: 'Guided Drawing Templates With Step-by-Step Visual Instructions',
    desc: 'Generate draw and color worksheets featuring guided drawing templates that break complex images into simple step-by-step shapes. Students follow numbered visual instructions to recreate themed images then color their completed drawings. This progressive approach builds drawing confidence by transforming intimidating images into achievable sequential steps. The format develops spatial planning, shape recognition, and fine motor control simultaneously.',
  },
  'drawing-lines-worksheets': {
    icon: '\u2702\uFE0F',
    title: 'Progressive Line Complexity From Straight to Curved Paths',
    desc: 'Choose from progressive line complexity levels matching student developmental stages. Straight horizontal and vertical lines suit beginning writers developing basic motor control. Diagonal lines introduce directional challenges for intermediate learners. Curved paths and wave patterns build the smooth hand movements needed for cursive readiness. Zigzag and spiral patterns challenge advanced students with multi-directional line coordination exercises.',
  },
  'grid-match-worksheets': {
    icon: '\uD83D\uDD32',
    title: 'Multiple Grid Sizes From Simple 2x2 to Complex 4x4 Patterns',
    desc: 'Choose from progressive grid complexity levels to match student abilities precisely. Simple 2x2 grids with bold images suit preschool learners developing basic spatial awareness. 3x3 grids increase the number of positions students must track and reproduce accurately. Complex 4x4 grids challenge first and second graders with sixteen positions requiring systematic analysis and careful attention to detail across the entire grid pattern.',
  },
  'math-puzzle-worksheets': {
    icon: '\uD83E\uDDE0',
    title: 'Multiple Puzzle Formats Including Number Pyramids and Magic Squares',
    desc: 'Choose from diverse math puzzle formats that present number operations in engaging non-standard layouts. Number pyramids require adding adjacent numbers to fill upper blocks. Magic squares challenge students to make all rows, columns, and diagonals sum to the same total. Path puzzles require solving equations to navigate through number mazes. Each format develops mathematical thinking through creative problem presentation.',
  },
  'math-worksheets': {
    icon: '\u2699\uFE0F',
    title: 'Multiple Operation Types Covering Addition Subtraction and Number Skills',
    desc: 'Generate math worksheets across multiple operation types from a single generator. Create addition exercises with visual counting problems, subtraction activities with take-away scenarios, and number recognition tasks with quantity matching. Switch between operation types instantly to build comprehensive math fluency packets. The unified generator saves time compared to using separate tools for each math skill area.',
  },
  'more-less-worksheets': {
    icon: '\u2696\uFE0F',
    title: 'Visual Quantity Comparison With Progressive Symbol Introduction',
    desc: 'The more-or-less generator introduces comparison concepts progressively from concrete visual counting to abstract symbolic notation. Early exercises present image groups for direct quantity comparison without symbols. Intermediate exercises introduce greater-than and less-than symbols alongside visual aids. Advanced exercises use symbols exclusively with number pairs. This progression builds conceptual understanding before requiring symbolic fluency in mathematical comparison.',
  },
  'pattern-worksheets': {
    icon: '\uD83D\uDD01',
    title: 'Multiple Pattern Types From Simple AB to Complex ABCD Sequences',
    desc: 'Choose from progressive pattern complexity levels to match student developmental needs. Simple AB alternating patterns introduce the concept of repeating sequences for preschool beginners. ABC patterns add a third element requiring more working memory for kindergarten students. ABCD patterns challenge first graders with four-element sequences. AABB and ABB grouping patterns introduce structural variation beyond simple alternation.',
  },
  'prepositions-worksheets': {
    icon: '\uD83D\uDCCD',
    title: 'Twelve Positional Concepts Including Above Below Beside and Between',
    desc: 'Generate prepositions worksheets covering twelve fundamental spatial concepts: above, below, beside, between, inside, outside, in front of, behind, on top of, under, next to, and near. Each worksheet focuses on specific prepositions or mixes multiple concepts for comprehensive review. Teachers control which positional words appear in each exercise to align with current vocabulary instruction and build spatial language progressively.',
  },
  'subtraction-worksheets': {
    icon: '\u2699\uFE0F',
    title: 'Four Exercise Modes Including Take-Away and Find-the-Difference',
    desc: 'Choose from four subtraction exercise modes designed for different skill levels and learning objectives. Image take-away mode shows pictures being removed for concrete understanding. Image minus number mode bridges visual and symbolic subtraction. Find the subtrahend mode creates fill-in-the-blank equations developing algebraic thinking foundations. Mixed mode randomizes problem types for comprehensive subtraction fluency assessment and review.',
  },
  'sudoku-worksheets': {
    icon: '\u2699\uFE0F',
    title: 'Three Difficulty Levels With 4, 6, or 8 Blank Cells Per Grid',
    desc: 'Control puzzle difficulty precisely by selecting easy, medium, or hard settings. Easy creates 4 blank cells perfect for ages 4-5 learning elimination strategy for the first time. Medium presents 6 blank cells requiring stronger deductive reasoning skills for kindergarten students. Hard challenges advanced learners with 8 empty cells demanding multi-step analytical thinking. Create differentiated puzzle sets using the same theme at three difficulty levels in minutes.',
  },
  'word-guess-worksheets': {
    icon: '\uD83D\uDCA1',
    title: 'Picture Clue Hints With Progressive Letter Reveal Options',
    desc: 'Each word guess puzzle presents a picture clue alongside blank letter spaces for students to fill in the correct word. Teachers control hint levels from no letters revealed for advanced spellers to partial letter reveals for struggling students. The progressive reveal system builds spelling confidence by providing appropriate scaffolding. Students develop vocabulary, phonemic awareness, and visual-word association skills simultaneously.',
  },
  'word-scramble-worksheets': {
    icon: '\uD83D\uDD00',
    title: 'Picture Clues Paired With Scrambled Letters for Spelling Practice',
    desc: 'Each word scramble exercise presents a picture clue alongside jumbled letters that students must unscramble to spell the correct word. The image provides a semantic scaffold helping students narrow possibilities before attempting letter arrangements. Teachers control word length and scramble difficulty from simple three-letter words for kindergarten to complex multi-syllable words for second grade. The format builds both spelling accuracy and vocabulary simultaneously.',
  },
  'word-search-worksheets': {
    icon: '\u2699\uFE0F',
    title: 'Customizable Word Lists With Teacher-Input Vocabulary Terms',
    desc: 'Input your own vocabulary words from current spelling lists, thematic units, or sight word programs for fully customized word search puzzles. The generator automatically places words within the grid following selected direction rules and fills remaining cells with random letters. Teachers create curriculum-aligned vocabulary review activities in seconds rather than designing puzzles manually. Save and reuse word lists across multiple themed puzzles.',
  },
  'writing-worksheets': {
    icon: '\u270F\uFE0F',
    title: 'Adjustable Line Spacing and Letter Size for Developmental Stages',
    desc: 'Control line spacing and letter size precisely to match student fine motor development. Extra-wide spacing with large dotted letters suits preschool students developing initial pencil control. Standard spacing with medium letters works for kindergarten handwriting practice. Narrow spacing with smaller letters challenges first and second graders building writing fluency. The adjustable format supports differentiated instruction within mixed-ability classrooms.',
  },
};

// Features 8 and 9 are semi-universal but with app-specific wording
function makeAnswerKeyFeature(appName) {
  return {
    id: '8',
    icon: '\u2705',
    title: `Auto-Generated Answer Keys for Every ${appName} Worksheet`,
    desc: `Every ${appName.toLowerCase()} worksheet automatically generates a matching answer key showing all correct responses clearly marked. Teachers verify student work in seconds without solving exercises themselves. Print answer keys on separate pages for self-checking stations or display on document cameras during whole-class review sessions. The verification system guarantees accuracy for confident grading across entire class sets.`,
  };
}

function makeBackgroundFeature(appName) {
  return {
    id: '9',
    icon: '\uD83C\uDFA8',
    title: `Themed Backgrounds and Decorative Borders for ${appName} Worksheets`,
    desc: `Choose from dozens of themed backgrounds including chalkboard, notebook paper, rainbow, clouds, and seasonal designs to enhance your ${appName.toLowerCase()} worksheets visually. Add decorative borders featuring stars, hearts, flowers, or school supplies around page edges. Adjust opacity for subtle or prominent effects. Professional visual design increases student engagement and creates polished materials suitable for classroom display or marketplace sales.`,
  };
}

let totalUpdated = 0;

for (const [slug, specific] of Object.entries(APP_SPECIFIC)) {
  const filePath = path.join(DIR, slug + '.ts');
  if (!fs.existsSync(filePath)) {
    console.log(`SKIP: ${slug} — file not found`);
    continue;
  }

  let src = fs.readFileSync(filePath, 'utf8');
  const featIdx = src.indexOf('features:');
  if (featIdx === -1) {
    console.log(`SKIP: ${slug} — no features section`);
    continue;
  }

  // Find the features items array
  const itemsIdx = src.indexOf('items:', featIdx);
  const bracket = src.indexOf('[', itemsIdx);
  let depth = 0, started = false, end = bracket;
  for (let i = bracket; i < src.length; i++) {
    if (src[i] === '[') { depth++; started = true; }
    if (src[i] === ']') { depth--; }
    if (started && depth === 0) { end = i; break; }
  }

  // Count existing features
  const section = src.slice(bracket, end + 1);
  const existingCount = (section.match(/id:\s*'/g) || []).length;
  if (existingCount >= 10) {
    console.log(`SKIP: ${slug} — already has ${existingCount} features`);
    continue;
  }

  // Get app display name from hero title
  const appName = slug.replace(/-worksheets$/, '').replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

  const answerKey = makeAnswerKeyFeature(appName);
  const background = makeBackgroundFeature(appName);

  const newFeatures = [
    `      {
        id: '${existingCount + 1}',
        icon: '${answerKey.icon}',
        title: '${answerKey.title.replace(/'/g, "\\'")}',
        description: '${answerKey.desc.replace(/'/g, "\\'")}',
        highlighted: false,
      }`,
    `      {
        id: '${existingCount + 2}',
        icon: '${background.icon}',
        title: '${background.title.replace(/'/g, "\\'")}',
        description: '${background.desc.replace(/'/g, "\\'")}',
        highlighted: false,
      }`,
    `      {
        id: '${existingCount + 3}',
        icon: '${specific.icon}',
        title: '${specific.title.replace(/'/g, "\\'")}',
        description: '${specific.desc.replace(/'/g, "\\'")}',
        highlighted: false,
      }`,
  ];

  // Insert before the closing ] of the items array
  // Find the last } before the closing ]
  const insertPos = end;
  const beforeInsert = src.slice(0, insertPos).trimEnd();
  const lastChar = beforeInsert[beforeInsert.length - 1];

  // Add comma if needed and insert new features
  const comma = lastChar === ',' || lastChar === '[' ? '' : ',';
  const insertion = comma + '\n' + newFeatures.join(',\n') + ',\n    ';

  src = src.slice(0, insertPos) + insertion + src.slice(insertPos);

  fs.writeFileSync(filePath, src, 'utf8');
  totalUpdated++;
  console.log(`ADDED: ${slug} — ${existingCount} -> ${existingCount + 3} features`);
}

console.log(`\nTotal files updated: ${totalUpdated}`);
