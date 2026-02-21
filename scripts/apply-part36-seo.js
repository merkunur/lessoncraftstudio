/**
 * SEO Part 36: Enrich numbers & alphabet EN theme hub pages
 * - Numbers: adds 7 missing enrichment fields + fixes quickStats app count
 * - Alphabet: adds 7 missing enrichment fields + fixes quickStats app count
 *
 * Both files already have 5 fields from Part 12 (classroomScenarios, quickStats,
 * differentiationStrategies, assessmentIdeas, crossCurricularLinks).
 * This script adds the remaining 7: uniqueAngle, researchCitation, snippetDefinition,
 * snippetHowTo, limitations, themeComparisons, productLinks.
 */
const fs = require('fs');
const path = require('path');

// ── Numbers: 7 fields ──────────────────────────────────────────────────────

const numbersFields = `
  // -- SEO Enrichment (Part 36) --

  uniqueAngle: 'Numbers occupy a pedagogical position unlike any other theme in the entire collection because numbers are simultaneously the subject of instruction and the instrument of instruction \u2014 the only theme where what you are learning is also the tool you use to learn it. Every other theme borrows number skills: dinosaur worksheets count eggs, ocean worksheets tally fish, and space worksheets measure planetary distances, but all of them treat numbers as a means to an end. The numbers theme treats the numeral system itself as the object of study, creating a recursive learning experience where children use counting to explore what counting means and use addition to discover what the operation of addition actually does to quantities. This meta-quality gives number worksheets a unique depth that no content-driven theme can replicate. A child coloring a dinosaur learns about dinosaurs; a child working through a number decomposition exercise learns something that makes every future worksheet in every future theme more accessible. The theme is also uniquely universal across all academic subjects. While dinosaurs connect primarily to science and history, and alphabet connects primarily to literacy, strong number sense directly improves performance in science through measurement and data, in social studies through timeline and population reasoning, in music through rhythm and pattern, and even in art through symmetry and proportion. This cross-domain transfer means that time invested in pure number worksheets pays compounding dividends across the entire curriculum. The developmental arc within this single theme is the longest coherent learning progression in early education: it begins with subitizing, the ability to recognize small quantities at a glance, progresses through stable counting, one-to-one correspondence, the cardinality principle, composition and decomposition, addition and subtraction as operations on quantities, place value as a grouping system, and ultimately reaches the threshold of multiplicative and algebraic thinking \u2014 a journey that spans from age three through age nine without ever exhausting the theme\u2019s instructional potential.',

  researchCitation: 'Jordan, N.C., Kaplan, D., Ramineni, C., & Locuniak, M.N. (2009). Early Math Matters: Kindergarten Number Competence and Later Mathematics Outcomes. Developmental Psychology, 45(3), 850\u2013867. This landmark longitudinal study tracked children from kindergarten through fifth grade and found that kindergarten number sense \u2014 including counting fluency, number comparison, and basic calculation skill \u2014 was the single strongest predictor of fifth-grade mathematics achievement, outperforming IQ, reading ability, socioeconomic status, and attention measures as a predictor. Children who entered kindergarten with weak number sense and received structured number intervention closed the gap significantly, demonstrating that early number worksheets and targeted practice materials can alter long-term mathematical trajectories.',

  snippetDefinition: 'Number worksheets for kids are printable educational activities designed to build counting fluency, numeral recognition, and arithmetic understanding for children ages 3 through 9. They include visual addition and subtraction with image counters, chart-count-color graphing activities, code-based logic puzzles, comparison exercises, pattern completion sequences, and sudoku grids \u2014 progressing from concrete picture-based counting for preschoolers to multi-digit operations and algebraic reasoning for third graders.',

  snippetHowTo: [
    'Begin each number worksheet session with a concrete warm-up: have children count physical objects like buttons, blocks, or cereal pieces to activate their number sense before transitioning to the printed page, ensuring the numerals on the worksheet connect to real quantities in the child\u2019s experience.',
    'Establish a Number of the Day routine where you select one number each morning and explore it from every angle \u2014 writing it, showing it on a ten-frame, finding it on a number line, identifying one more and one less \u2014 then assign a worksheet featuring that number to consolidate the exploration into written practice.',
    'Progress through worksheet types in a concrete-to-abstract sequence: start with find-and-count pages where children count illustrated objects, move to image-addition worksheets where visual counters scaffold the operation, then advance to math worksheets with symbolic equations once the child demonstrates conceptual understanding.',
    'Pair each counting or addition worksheet with a real-world application within the same day: if the worksheet practiced adding groups of three and four, ask the child to set the table for seven people at dinner or count seven items into a bag, reinforcing that worksheet numbers describe actual quantities.',
    'Use pattern worksheets to build skip-counting fluency by having children identify and extend number sequences like 2, 4, 6, ___ or 5, 10, 15, ___, which develops the rhythmic number sense that underpins multiplication readiness.',
    'Introduce sudoku and code-addition puzzles as logic extensions once children are comfortable with basic operations, framing them as brain challenges rather than tests to build positive associations with mathematical reasoning and persistence.',
    'Review completed worksheets together by asking the child to explain one problem aloud \u2014 not just the answer but the strategy they used \u2014 because verbalizing mathematical thinking strengthens comprehension and reveals any procedural misunderstandings before they become habits.',
  ],

  limitations: 'Pure number worksheets lack the narrative context and visual excitement that content-driven themes like dinosaurs, space, and ocean naturally provide, which can reduce engagement for children who are primarily motivated by story, character, and imaginative play rather than abstract pattern recognition. The theme is inherently mathematics-focused and offers limited direct connections to science content, social studies topics, or creative arts projects compared to themes that embed number skills within rich subject-matter contexts. Children who experience early math anxiety may associate number-heavy worksheets with pressure and frustration, making it important to pair pure number practice with themed alternatives that disguise the same skills within more engaging visual narratives.',

  themeComparisons: [
    {
      vsThemeId: 'alphabet',
      summary: 'Numbers and alphabet represent the two foundational academic pillars of early education \u2014 pure mathematical fluency and pure literacy fluency respectively. Number worksheets build counting, operations, and place value as the gateway to all quantitative reasoning, while alphabet worksheets build letter recognition, phonics, and handwriting as the gateway to all written communication. Both themes teach abstract symbol systems, but numbers map symbols to quantities while letters map symbols to sounds, demanding different cognitive pathways despite a similar learning arc from recognition through mastery to fluent application.',
    },
    {
      vsThemeId: 'shapes',
      summary: 'Number worksheets focus on abstract numerical concepts \u2014 counting, ordering, comparing, and operating on quantities that exist as mental representations \u2014 while shape worksheets focus on concrete geometric properties that children can see, touch, and trace in the physical world around them. Numbers build sequential and operational thinking; shapes build spatial and categorical thinking. Numbers are inherently abstract from the start; shapes offer a visual, tactile entry point into mathematical reasoning that some children find more accessible.',
    },
    {
      vsThemeId: 'animals',
      summary: 'Number worksheets teach the numeral system directly as a subject of study, building raw counting fluency, operational understanding, and place value without thematic distraction. Animal worksheets embed the same number skills within engaging creature contexts \u2014 counting zoo animals, comparing animal sizes, adding groups of pets \u2014 providing narrative motivation that pure numbers lack. Numbers excel at building abstract mathematical fluency; animals excel at sustaining engagement while developing the same skills through content children find inherently fascinating.',
    },
    {
      vsThemeId: 'space',
      summary: 'Number worksheets build foundational arithmetic fluency through direct practice with counting, operations, and patterns in their purest form, while space worksheets apply those same number skills to astronomical contexts involving planetary distances, crew supply calculations, and orbital sequences. Pure numbers develop raw computational speed and flexibility; space provides authentic large-number contexts that give abstract operations concrete meaning and excitement.',
    },
  ],

  productLinks: [
    {
      appId: 'image-addition',
      anchorText: 'number addition worksheets with pictures',
      context: 'For the essential bridge between concrete counting and abstract arithmetic, our number addition worksheets with pictures present addition problems with illustrated counters that let children see two groups being combined before they write the equation, building genuine operational understanding rather than rote fact memorization.',
    },
    {
      appId: 'find-and-count',
      anchorText: 'counting worksheets for kids',
      context: 'When building foundational one-to-one correspondence and cardinality skills, our counting worksheets for kids display groups of vivid illustrated objects that children count and match to the correct numeral, progressing from quantities of three for preschoolers to groups beyond twenty for first graders.',
    },
    {
      appId: 'math-puzzle',
      anchorText: 'number puzzle worksheets',
      context: 'For children ready to move beyond basic operations into algebraic thinking, our number puzzle worksheets challenge young mathematicians to find missing addends, complete number pyramids, and solve logic-based number grids that build the flexible reasoning skills underlying all higher mathematics.',
    },
    {
      appId: 'sudoku',
      anchorText: 'kids number sudoku printable',
      context: 'Logical reasoning develops powerfully through our kids number sudoku printable grids, which range from simple four-by-four puzzles for kindergarteners to full nine-by-nine challenges for third graders, building constraint-based thinking, process of elimination, and self-correction habits without requiring any arithmetic calculation.',
    },
  ],`;

// ── Alphabet: 7 fields ────────────────────────────────────────────────────

const alphabetFields = `
  // -- SEO Enrichment (Part 36) --

  uniqueAngle: 'The alphabet holds a pedagogical position that no other theme in the entire collection can claim: it is the only theme where mastering the content literally unlocks access to all other written knowledge in the language. A child who masters dinosaur worksheets knows about dinosaurs; a child who masters ocean worksheets knows about marine life; but a child who masters alphabet worksheets can read anything \u2014 every book, every sign, every instruction, every story ever written becomes accessible. This asymmetric power makes alphabet instruction qualitatively different from every other theme because the return on investment compounds infinitely. No other theme creates this gateway effect where mastery of the theme itself is the prerequisite for independent learning across all subjects. The alphabet also uniquely spans three distinct perceptual-motor modalities simultaneously in every single activity: visual processing for recognizing letter shapes and distinguishing similar forms like b and d or p and q, auditory processing for connecting each letter shape to its corresponding speech sound or sounds, and fine motor execution for producing the letter through handwriting with correct formation, sizing, and stroke direction. No other theme demands this triple-channel integration at such a foundational level \u2014 number worksheets are primarily visual-cognitive, animal worksheets are primarily visual-conceptual, and even music worksheets separate listening from performing. The 26-letter constraint creates the most elegant bounded system in early education: unlike numbers, which extend infinitely, or animals, which number in millions of species, the alphabet is a complete, finite, masterable set. Children can see the entire scope of what they need to learn, track their progress through it letter by letter, and experience genuine mastery when they know all 26 \u2014 a sense of completion that open-ended themes can never provide. The uppercase-lowercase duality adds a classification dimension unique to this theme, as children must learn that two visually distinct symbols like A and a represent the same abstract entity, a cognitive leap that develops the categorical thinking underlying all later academic classification tasks.',

  researchCitation: 'Adams, M.J. (1990). Beginning to Read: Thinking and Learning about Print. MIT Press. This foundational synthesis of reading research, commissioned by the U.S. Department of Education, established that letter-name knowledge at kindergarten entry is the single best predictor of first-grade reading achievement, surpassing IQ, socioeconomic background, and phonological awareness measures as a standalone predictor. Adams documented that children who received structured, systematic letter practice through worksheets and targeted activities developed significantly stronger letter-sound associations than children exposed to letters only incidentally through environmental print and read-alouds, concluding that intentional alphabet instruction materials are not merely helpful but essential for building the foundation that all subsequent reading development rests upon.',

  snippetDefinition: 'Alphabet worksheets for kids are printable educational activities designed to build letter recognition, phonics knowledge, and handwriting skills for children ages 3 through 9. They include letter tracing pages with directional guides, uppercase-lowercase matching activities, word scramble puzzles, ABC sequencing trains, picture crosswords with phonemic analysis, word searches with letter-themed vocabulary, word guessing games, and creative coloring pages \u2014 progressing from single-letter recognition for preschoolers to multi-syllable decoding and dictionary skills for third graders.',

  snippetHowTo: [
    'Start with the letters in the child\u2019s own name because these carry personal significance and provide the strongest initial motivation \u2014 a child named Maya will engage more deeply with M, A, and Y than with randomly selected letters, and name-letter mastery provides a confidence foundation for tackling unfamiliar letters.',
    'Introduce letters in sound-frequency order rather than alphabetical order: high-frequency consonants like S, T, M, and P combined with the short vowel A allow children to begin blending real words like sat, mat, and tap almost immediately, which is far more motivating than memorizing a sequence they cannot yet use for reading.',
    'Pair every tracing worksheet with a multi-sensory reinforcement activity: after tracing the letter B on paper, have the child form B with playdough, trace it in a tray of sand or salt, or skywrite it with a finger in the air, because motor memory strengthens dramatically when the same movement is practiced across different tactile contexts.',
    'Progress from recognition to production in a deliberate sequence: first use matching worksheets where children identify letters among options, then move to tracing worksheets with dotted guides, then advance to writing worksheets where children produce letters independently from memory on lined paper.',
    'Use word-building activities like word scramble and alphabet train worksheets as the bridge between individual letter knowledge and actual reading, showing children that the letters they have been learning combine to form words they already know and speak every day.',
    'Incorporate word search and crossword worksheets as fluency builders once children know at least 15 letters, because scanning for letter sequences in a grid develops the left-to-right visual tracking and pattern recognition that support reading fluency.',
    'Review progress regularly by showing the child all 26 letters in random order and noting which ones they name instantly versus which require hesitation \u2014 target the hesitation letters in the next worksheet session while celebrating the instant-recognition letters as genuine achievements.',
  ],

  limitations: 'Pure letter worksheets lack the thematic richness and narrative context that animal, space, dinosaur, and ocean themes naturally provide, which can reduce engagement for children who are primarily motivated by story, character, and imaginative content rather than abstract symbol practice. The theme is inherently centered on the Latin alphabet used in English and other Western European languages, which means children whose home language uses a different writing system like Arabic, Chinese, or Cyrillic may find the activities less directly relevant to their bilingual development without explicit bridging instruction. Letter formation worksheets develop correct stroke patterns and visual-motor coordination, but they cannot fully substitute for direct handwriting instruction that addresses pencil grip, posture, paper positioning, and the physical ergonomics that a printed worksheet alone cannot teach.',

  themeComparisons: [
    {
      vsThemeId: 'numbers',
      summary: 'Alphabet and numbers represent the two foundational academic pillars of early education \u2014 the pure literacy gateway and the pure numeracy gateway respectively. Alphabet worksheets build letter recognition, phonics, and handwriting as the prerequisite for all written communication, while number worksheets build counting, operations, and place value as the prerequisite for all quantitative reasoning. Both teach abstract symbol systems that map visual shapes to meaning, but letters map to sounds and words while numbers map to quantities and operations, demanding different cognitive processing pathways despite sharing a similar developmental arc from recognition to fluent application.',
    },
    {
      vsThemeId: 'school',
      summary: 'Alphabet worksheets focus on mastering the specific skill of letter recognition, phonics, and handwriting with laser precision, while school-themed worksheets use the broader academic environment as a motivational context for practicing mixed skills across subjects. The alphabet theme goes deep on one foundational skill set; the school theme goes wide across many skills using classroom imagery. For children who need intensive letter practice, alphabet worksheets provide focused repetition; for children who need variety and contextual motivation, school worksheets embed letter skills within a familiar setting.',
    },
    {
      vsThemeId: 'animals',
      summary: 'Alphabet worksheets teach letter-sound correspondence, handwriting, and decoding as direct skills through isolated letter practice and word-building activities, while animal worksheets embed the same literacy skills within engaging creature contexts \u2014 learning the letter L through lion, the letter E through elephant, and vocabulary through animal habitat descriptions. Pure alphabet worksheets build faster letter automaticity through focused repetition; animal worksheets sustain engagement through content children find inherently fascinating while developing the same foundational literacy skills more gradually.',
    },
    {
      vsThemeId: 'colors',
      summary: 'Alphabet worksheets teach an abstract symbol system where visual shapes must be mapped to speech sounds through learned association, while color worksheets teach concrete visual-perceptual categories that children can directly observe and compare in the world around them. Letters require memorization of arbitrary shape-sound pairings; colors are perceived directly through sensory experience. The alphabet theme demands higher cognitive effort but unlocks all written language; the color theme offers more immediate, intuitive success but serves a narrower developmental scope.',
    },
  ],

  productLinks: [
    {
      appId: 'writing-app',
      anchorText: 'letter tracing worksheets for kids',
      context: 'For building the motor memory and correct formation habits that underpin fluent handwriting, our letter tracing worksheets for kids guide children through each stroke with dotted lines, directional arrows, and starting points, progressing from large guided letters for preschoolers to independent writing on lined paper for first graders.',
    },
    {
      appId: 'alphabet-train',
      anchorText: 'ABC order worksheets printable',
      context: 'When children are ready to apply their letter knowledge to sequencing and organizational skills, our ABC order worksheets printable activities challenge them to arrange letters, words, and phrases in correct alphabetical order, building the sequential thinking that supports dictionary use, filing systems, and reference material navigation.',
    },
    {
      appId: 'word-scramble',
      anchorText: 'alphabet word scramble worksheets',
      context: 'For developing orthographic awareness and flexible letter manipulation, our alphabet word scramble worksheets present jumbled letters that children must mentally rearrange into correctly spelled words, strengthening the decoding and encoding skills that fluent readers and confident spellers rely on automatically.',
    },
    {
      appId: 'image-crossword',
      anchorText: 'kids alphabet crossword puzzles',
      context: 'Multi-step phonemic analysis develops powerfully through our kids alphabet crossword puzzles, where children identify a picture, segment the word into individual sounds, and write the corresponding letter in each box \u2014 integrating visual recognition, phonics knowledge, and spelling in a single engaging puzzle format.',
    },
  ],`;

// ── Fix quickStats + Injection Logic ───────────────────────────────────────

function fixAndInject(filePath, newFields, oldAppCount, newAppCount) {
  let src = fs.readFileSync(filePath, 'utf8');

  // Fix quickStats app count
  const countBefore = src;
  src = src.replace(`"value": "${oldAppCount} apps"`, `"value": "${newAppCount} apps"`);
  if (src === countBefore) {
    throw new Error(`Could not find quickStats "${oldAppCount} apps" in ${filePath}`);
  }
  console.log(`  Fixed quickStats: "${oldAppCount} apps" -> "${newAppCount} apps"`);

  // Find the closing `};` that ends the content object (before registerThemeContent)
  const marker = /\n\};\s*\n\nregisterThemeContent/;
  const match = src.match(marker);
  if (!match) {
    throw new Error(`Could not find closing marker in ${filePath}`);
  }

  const insertPos = match.index;
  const updated = src.slice(0, insertPos) + '\n' + newFields + '\n};\n\nregisterThemeContent' + src.slice(match.index + match[0].length);
  fs.writeFileSync(updated === src ? filePath : filePath, updated, 'utf8');
  console.log(`  Injected 7 fields into ${path.basename(path.dirname(filePath))}/${path.basename(filePath)}`);
}

// ── Main ────────────────────────────────────────────────────────────────────

const base = path.join(__dirname, '..', 'frontend', 'content', 'themes');

console.log('Part 36: Enriching numbers & alphabet theme hub pages...\n');

console.log('1. Fixing quickStats + injecting 7 fields into numbers/en.ts...');
fixAndInject(path.join(base, 'numbers', 'en.ts'), numbersFields, '11', '12');

console.log('\n2. Fixing quickStats + injecting 7 fields into alphabet/en.ts...');
fixAndInject(path.join(base, 'alphabet', 'en.ts'), alphabetFields, '10', '12');

console.log('\nDone! Run "npx tsc --noEmit" to verify TypeScript compilation.');
