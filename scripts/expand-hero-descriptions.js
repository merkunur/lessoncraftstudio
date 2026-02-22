/**
 * Part 161 fix: Expand hero descriptions to 200+ words for 14 files.
 * Appends 1-2 additional paragraphs to existing backtick descriptions.
 */
const fs = require('fs');
const path = require('path');

const DIR = path.join(__dirname, '..', 'frontend', 'content', 'product-pages', 'en');

// Additional paragraphs to append to each hero description
const EXPANSIONS = {
  'alphabet-train-worksheets': `

The alphabet train format turns letter learning into an adventure. Students connect train cars in alphabetical order, reinforcing letter sequence knowledge through playful activity. Each train car displays a letter with a matching themed image, helping visual learners associate letters with familiar objects. Teachers choose from uppercase, lowercase, or mixed-case exercises to match their curriculum objectives. The cut-and-paste format builds fine motor skills alongside literacy development. Generate alphabet train worksheets for any image theme including animals, food, vehicles, and seasonal topics. Create differentiated activities for students at different stages of letter recognition mastery.`,

  'big-small-worksheets': `

The Big and Small generator offers five distinct question types that develop size discrimination progressively. Circle the Big and Circle the Small build basic comparison skills. Find the Medium introduces three-way size relationships. Ordering tasks require arranging objects from biggest to smallest or vice versa. Each question type targets different cognitive complexity levels suitable for preschool through first grade learners. Teachers set between two and five images per exercise to control difficulty precisely. Fewer images with dramatic size differences suit beginning learners while more images with subtle variations challenge advanced students.`,

  'cryptogram-worksheets': `

Picture cryptogram worksheets challenge students to decode secret messages by replacing picture symbols with letters. Each image represents a specific letter, and students use the picture key to reveal hidden words and phrases. This puzzle format builds letter recognition, phonemic awareness, and logical deduction simultaneously. Teachers select vocabulary words matching current spelling lists or thematic units. The generator creates unique cryptogram keys for each worksheet, ensuring students cannot memorize solutions across multiple activities. Adjust difficulty by controlling word length and the number of unique symbols in each puzzle.`,

  'find-objects-worksheets': `

The find objects generator creates scenes where target items blend naturally among thematic distractors, challenging students to scan systematically rather than randomly. Teachers control the number of hidden targets and overall scene density to match student abilities precisely. Simple scenes with few targets suit preschool visual development while complex scenes with many overlapping objects challenge older students developing sustained attention skills.`,

  'grid-match-worksheets': `

Grid match puzzles present students with a reference grid and require them to reproduce or complete matching patterns in an adjacent grid. This spatial reasoning format develops visual memory, attention to detail, and systematic copying strategies. Students analyze grid positions, identify pattern rules, and apply logical thinking to complete each match correctly. Teachers choose from several grid sizes and complexity levels to match student developmental stages. Simple 2x2 grids with bold images suit preschool learners while complex 4x4 grids challenge first and second graders. The format builds foundational skills for mathematics, coding, and scientific observation.`,

  'math-puzzle-worksheets': `

Math puzzle worksheets go beyond standard computation by embedding number problems within engaging visual puzzle formats. Students solve addition, subtraction, and number sequence challenges presented as picture-based brain teasers rather than traditional equations. This approach builds mathematical confidence in students who struggle with conventional worksheet formats while still developing essential number fluency.`,

  'more-less-worksheets': `

The more-or-less generator creates exercises where students compare quantities, identify greater and lesser amounts, and use comparison symbols correctly. Visual counting exercises present image groups for concrete quantity comparison. Number comparison exercises introduce the greater-than, less-than, and equal-to symbols in age-appropriate contexts. Teachers control number ranges and exercise complexity to build progressive quantity comparison skills from preschool through second grade. The visual format helps students internalize comparison concepts before transitioning to abstract symbolic notation.`,

  'odd-one-out-worksheets': `

Odd one out worksheets present groups of images where students identify the item that does not share the common characteristic with the others. This critical thinking format develops classification skills, categorical reasoning, and analytical observation essential for scientific thinking. Teachers create exercises using visual attributes like color, shape, and size or conceptual categories like type, function, and habitat. Adjust group sizes from three to six images and control the subtlety of differences to match student ability levels precisely. The format builds the same logical reasoning skills used in standardized test preparation and academic problem-solving.`,

  'pattern-worksheets': `

Pattern recognition worksheets present sequences of images with missing elements that students must identify and complete. The generator creates AB, ABC, ABCD, AABB, and more complex pattern types to match progressive difficulty needs. Students analyze repeating sequences, predict missing elements, and demonstrate understanding by selecting or drawing correct answers. These pattern activities build the mathematical reasoning foundation essential for algebraic thinking in later grades. Teachers connect pattern exercises to current themes using our image library of 3000+ child-friendly pictures organized by category.`,

  'picture-sort-worksheets': `

Picture sort worksheets challenge students to organize images into labeled categories by identifying shared attributes and grouping related items together. This classification format develops the logical thinking skills essential for scientific observation, mathematical reasoning, and reading comprehension. Teachers create sorting exercises using concrete visual attributes like color and shape or abstract conceptual categories like living versus non-living. Adjust the number of sorting categories and total items to control difficulty precisely. The hands-on cut-and-paste format builds fine motor skills alongside cognitive classification abilities.`,

  'prepositions-worksheets': `

Prepositions worksheets help students master spatial vocabulary by identifying where objects are positioned relative to each other. Each exercise presents images showing clear positional relationships such as above, below, beside, between, inside, and outside. Students demonstrate comprehension by circling the correct preposition or matching images to position words.`,

  'treasure-hunt-worksheets': `

Treasure hunt worksheets transform visual searching into exciting adventure narratives where students follow themed clues to discover hidden items. Each worksheet creates an immersive story context that motivates reluctant learners and maintains engagement throughout the activity. Teachers choose from pirate, jungle, space, underwater, and many more adventure themes. The sequential clue format builds reading comprehension alongside visual discrimination as students must understand each direction to find the next treasure.`,

  'word-search-worksheets': `

Word search worksheets hide vocabulary words within letter grids for students to locate by scanning horizontally, vertically, and diagonally. Our generator creates professionally formatted puzzles with customizable word lists, grid sizes, and difficulty settings. Teachers input vocabulary from current spelling lists, thematic units, or sight word programs. The generator automatically places words and fills remaining cells with random letters. Adjust grid complexity from simple 8x8 grids with horizontal-only words for kindergarteners to challenging 15x15 grids with diagonal and backward placement for advanced students.`,

  'writing-worksheets': `

The handwriting worksheet generator creates professional letter tracing and writing practice sheets with dotted guidelines, directional arrows, and ample practice space. Teachers choose between uppercase and lowercase letter sets, customize line spacing for different developmental stages, and add themed images that motivate reluctant writers. The format includes both tracing templates where students follow dotted letter forms and blank practice lines where students write independently. Generate writing worksheets matching current phonics lessons by selecting specific letters or creating full alphabet practice sets. Themed images from our 3000+ library connect handwriting practice to engaging visual contexts.`,
};

let totalExpanded = 0;

for (const [slug, expansion] of Object.entries(EXPANSIONS)) {
  const filePath = path.join(DIR, slug + '.ts');
  if (!fs.existsSync(filePath)) {
    console.log(`SKIP: ${slug} — file not found`);
    continue;
  }

  let src = fs.readFileSync(filePath, 'utf8');
  const heroIdx = src.indexOf('hero:');
  if (heroIdx === -1) {
    console.log(`SKIP: ${slug} — no hero section`);
    continue;
  }

  // Find the closing backtick of the description
  const heroSlice = src.slice(heroIdx, heroIdx + 5000);
  const btMatch = heroSlice.match(/description:\s*`([^`]*)`/);
  if (!btMatch) {
    console.log(`SKIP: ${slug} — no backtick description found`);
    continue;
  }

  const descStart = heroIdx + btMatch.index;
  const descContentStart = src.indexOf('`', descStart) + 1;
  const descContentEnd = src.indexOf('`', descContentStart);

  // Get current description
  const currentDesc = src.slice(descContentStart, descContentEnd);
  const currentWords = currentDesc.trim().split(/\s+/).filter(Boolean).length;

  // Append expansion
  const newDesc = currentDesc + expansion;
  const newWords = newDesc.trim().split(/\s+/).filter(Boolean).length;

  src = src.slice(0, descContentStart) + newDesc + src.slice(descContentEnd);

  fs.writeFileSync(filePath, src, 'utf8');
  totalExpanded++;
  console.log(`EXPANDED: ${slug} — ${currentWords} -> ${newWords} words`);
}

console.log(`\nTotal files expanded: ${totalExpanded}`);
