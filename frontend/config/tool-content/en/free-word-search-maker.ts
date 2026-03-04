import type { FreeToolContent } from '../types';

export const content: FreeToolContent = {
  appId: 'wordsearch',
  locale: 'en',

  seo: {
    titleTag: 'Free Word Search Generator | Printable Puzzle Maker',
    metaDescription: 'Create free word search worksheets with custom words and image clues. 8 search directions, grid sizing, answer keys, PDF export. No signup required. Try it now.',
    primaryKeyword: 'free word search generator',
    secondaryKeywords: [
      'word search puzzle maker free',
      'printable word search creator',
      'custom word search generator tool',
      'word find worksheet maker',
      'free word search puzzle printable',
    ],
    lsiKeywords: [
      'word search puzzles for kids',
      'vocabulary word find worksheets',
      'hidden word puzzle printable',
      'word hunt worksheet maker',
      'educational word search tool',
      'classroom word puzzle generator',
      'themed word search activities',
      'custom word find puzzles',
    ],
  },

  visuals: {
    heroImages: {
      primary: '/samples/english/wordsearch/Word Search (1).jpeg',
      primaryAlt: 'Word search puzzle worksheet with letter grid and themed image clues along the side',
      secondary: '/samples/english/wordsearch/Word Search (2).jpeg',
      secondaryAlt: 'Word search answer key with all hidden words highlighted in the grid',
    },
    sampleGallery: [
      { src: '/samples/english/wordsearch/Word Search (3).jpeg', alt: 'Word search with animal theme images as visual clues', caption: 'Animal theme word search' },
      { src: '/samples/english/wordsearch/Word Search (4).jpeg', alt: 'Large grid word search with 8 directional word placement', caption: 'Large grid with 8 directions' },
      { src: '/samples/english/wordsearch/Word Search (5).jpeg', alt: 'Word search puzzle using food theme vocabulary', caption: 'Food theme vocabulary' },
      { src: '/samples/english/wordsearch/Word Search (6).jpeg', alt: 'Easy word search with horizontal and vertical words only', caption: 'Easy mode \u2014 2 directions' },
      { src: '/samples/english/wordsearch/Word Search (7).jpeg', alt: 'Word search with word list displayed below the grid', caption: 'Word list reference' },
      { src: '/samples/english/wordsearch/Word Search (8).jpeg', alt: 'Word search answer key with colored highlights on found words', caption: 'Highlighted answer key' },
    ],
    youtubeId: '36keBFzJbPo',
    videoTitle: 'How to Create Word Search Worksheets \u2014 Free Generator Tutorial',
  },

  hero: {
    title: 'Free Word Search Worksheet Generator',
    tagline: 'Custom word grids with image clues that turn vocabulary practice into an engaging puzzle hunt',
    description: `This free word search generator creates printable puzzles where students find hidden words in a letter grid. Words can run in up to 8 directions \u2014 horizontal, vertical, diagonal, and their reverses \u2014 with the grid algorithm automatically placing your chosen vocabulary and filling empty cells with random letters. The result is a professional word search puzzle ready for print in under a minute.

What makes this generator different is the image clue system. Instead of simply listing words to find, each hidden word can be represented by an image. Students look at the picture, identify the word it represents, then hunt for that word in the grid. This two-step process exercises both vocabulary recall and visual scanning skills simultaneously.

The grid algorithm handles the technical complexity. You choose the grid size, number of search directions, and word list. The algorithm places words without overlapping conflicts, fills remaining cells with random letters, and generates a matching answer key with every word highlighted. If a word does not fit, the algorithm adjusts placement automatically.

Three word input modes offer flexibility. Auto mode pulls vocabulary from 104 image themes. Manual entry accepts your custom word lists. The image library browser lets you handpick individual word-image pairs. All modes work across 11 languages with localized vocabulary. Export as JPEG or PDF with grayscale toggle for ink-saving prints. Everything works free with a watermark \u2014 no signup, no email, no hidden restrictions.`,
  },

  whatYouCanCreate: [
    {
      title: 'Image-Clue Word Search Puzzles',
      description: 'Replace traditional word lists with image clues. Students identify each picture, figure out the word, then find it in the grid. This format strengthens vocabulary and visual processing simultaneously.',
    },
    {
      title: 'Difficulty-Adjusted Puzzles',
      description: 'Control difficulty by adjusting grid size and search directions. A small grid with 2 directions (horizontal and vertical only) creates easy puzzles. A large grid with 8 directions creates a genuine challenge.',
    },
    {
      title: 'Themed Vocabulary Hunts',
      description: 'Use the 104 image themes to create topic-specific word searches. Animal vocabulary, food words, vehicle names, nature terms \u2014 each theme produces a unique puzzle aligned to classroom content.',
    },
    {
      title: 'Curriculum Word Search Sets',
      description: 'Type custom word lists from any subject area. Science vocabulary, history terms, math words, or weekly spelling lists all work in the word search format for engaging review activities.',
    },
    {
      title: 'Multi-Language Word Finds',
      description: 'Generate word search puzzles in any of 11 supported languages. Create bilingual puzzles by using vocabulary from a target language with image clues that transcend language barriers.',
    },
    {
      title: 'Self-Checking Puzzle Stations',
      description: 'Every puzzle generates an automatic answer key with all words highlighted. Set up independent stations where students solve the puzzle and verify their own answers.',
    },
  ],

  tutorial: {
    title: 'Create a Word Search Puzzle in 10 Steps',
    steps: [
      {
        title: 'Open the Generator',
        description: 'Click "Try It Free" to launch the Word Search Generator. No account needed. The tool runs directly in your browser on any device.',
      },
      {
        title: 'Choose a Word Input Mode',
        description: 'Auto mode pulls words from the image library based on your theme. Manual entry lets you type custom word lists. Image library mode lets you browse and select specific word-image pairs.',
      },
      {
        title: 'Select a Theme',
        description: 'Browse 104 image themes organized by category. Each theme provides vocabulary words with matching illustrations that serve as image clues in the finished puzzle.',
      },
      {
        title: 'Build Your Word List',
        description: 'Add words to the puzzle list. Auto mode populates words automatically. Manual and library modes let you add words one at a time. Remove or replace any word before generating.',
      },
      {
        title: 'Set the Grid Size',
        description: 'Choose the grid dimensions. Larger grids accommodate more words and increase difficulty. Smaller grids keep the puzzle focused and work well for younger students.',
      },
      {
        title: 'Choose Search Directions',
        description: 'Select from 2 to 8 search directions. Two directions (horizontal and vertical) create easy puzzles. Adding diagonal and reverse directions increases the challenge significantly.',
      },
      {
        title: 'Generate the Puzzle',
        description: 'Click generate to create the word search grid. The algorithm places all words, fills empty cells, and creates image clues or a word list alongside the grid.',
      },
      {
        title: 'Customize the Design',
        description: 'Add titles, student name fields, and instructions. Apply borders and backgrounds using the canvas editor. Choose font style, page size, and orientation.',
      },
      {
        title: 'Review the Answer Key',
        description: 'The auto-generated answer key highlights every hidden word in the grid. Review it to ensure all words are placed correctly and the puzzle meets your expectations.',
      },
      {
        title: 'Export as JPEG or PDF',
        description: 'Download the puzzle and answer key as separate files. Toggle grayscale for ink-saving prints. Both files are ready for immediate classroom use or digital distribution.',
      },
    ],
  },

  businessIdeas: [
    {
      title: 'Themed Word Search Packs on Etsy',
      description: 'Bundle 15\u201320 word search puzzles per theme into instant-download products. "Animal Word Search Pack," "Food Vocabulary Puzzle Set," "Nature Word Hunt Collection" attract parents and teachers looking for engaging vocabulary activities.',
      platform: 'Etsy',
    },
    {
      title: 'Word Search Puzzle Books on Amazon KDP',
      description: 'Compile themed word search puzzles into books with progressive difficulty. Start with small grids and 2 directions, advancing to large grids with 8 directions. Answer keys at the back complete the book.',
      platform: 'Amazon KDP',
    },
    {
      title: 'Vocabulary Center Resources for TPT',
      description: 'Create word search stations with themed puzzles, answer keys, and teacher instructions. TPT teachers value self-checking activities that work as independent learning centers.',
      platform: 'Teachers Pay Teachers',
    },
    {
      title: 'Seasonal and Holiday Puzzle Collections',
      description: 'Create seasonal word search sets using holiday themes: Halloween vocabulary, Christmas words, Valentine\u2019s Day terms. Seasonal products generate concentrated demand during key shopping periods.',
      platform: 'Multi-platform',
    },
    {
      title: 'Subject-Specific Word Search Workbooks',
      description: 'Use manual entry to create word searches for science, math, and social studies vocabulary. Subject-specific puzzle books fill a niche that generic word searches do not cover.',
      platform: 'Amazon KDP',
    },
    {
      title: 'Weekly Vocabulary Challenge Program',
      description: 'Generate a new themed word search each week aligned to grade-level vocabulary standards. Deliver as a digital subscription covering a full school year of vocabulary practice.',
      platform: 'Gumroad',
    },
  ],

  proTips: [
    {
      title: 'Start with 2 Directions for Young Learners',
      tip: 'Restrict word placement to horizontal and vertical only for kindergarten and first grade. Students learn the scanning technique without the added complexity of diagonal and reverse words.',
    },
    {
      title: 'Use Image Clues Instead of Word Lists',
      tip: 'Image clues force students to recall the vocabulary word before searching the grid. This extra cognitive step strengthens word-meaning connections compared to simply scanning for listed words.',
    },
    {
      title: 'Pair with Word Scramble for Double Practice',
      tip: 'Use the same vocabulary in both word search and word scramble worksheets. Students encounter identical words in two puzzle formats, reinforcing spelling through varied repetition.',
    },
    {
      title: 'Increase Grid Size for Older Students',
      tip: 'Larger grids with more filler letters make words harder to spot. Combine large grids with 8 search directions for genuinely challenging puzzles that engage older students.',
    },
    {
      title: 'Create Competition Versions',
      tip: 'Generate identical puzzles and use them as timed classroom competitions. Students race to find all words. The answer key makes scoring instant and objective.',
    },
    {
      title: 'Print Answer Keys on Transparency Film',
      tip: 'Print the answer key on transparent overlay. Students place it on top of their completed puzzle for instant visual verification. This self-checking method saves grading time.',
    },
    {
      title: 'Use Manual Entry for Subject Vocabulary',
      tip: 'Type science, math, or social studies terms into manual entry mode. Custom word searches make vocabulary review feel like a game rather than a study session.',
    },
  ],

  faq: [
    {
      question: 'How does the Word Search Generator work?',
      answer: 'The algorithm places your chosen words in a letter grid across up to 8 directions (horizontal, vertical, diagonal, and their reverses). Empty cells fill with random letters. Each word can have an image clue for visual vocabulary practice.',
    },
    {
      question: 'What are the search direction options?',
      answer: 'You can choose from 2 to 8 search directions. Two directions (horizontal and vertical) create easy puzzles suitable for young learners. Adding diagonal and reverse directions increases difficulty for older students.',
    },
    {
      question: 'How does the image clue system work?',
      answer: 'Instead of listing words to find, each hidden word is represented by an image. Students identify the picture, determine the word, then search for it in the grid. This exercises vocabulary recall and visual scanning simultaneously.',
    },
    {
      question: 'Can I use my own custom word lists?',
      answer: 'Yes. Manual entry mode lets you type any words you want. Use subject-specific vocabulary, spelling words, or terminology from any content area. The algorithm places your custom words in the grid automatically.',
    },
    {
      question: 'What languages are supported?',
      answer: 'The generator supports 11 languages: English, German, French, Spanish, Portuguese, Italian, Dutch, Swedish, Danish, Norwegian, and Finnish. Each language includes localized vocabulary and interface translations.',
    },
    {
      question: 'Does it generate answer keys?',
      answer: 'Yes. Every puzzle generates a matching answer key with all hidden words highlighted in the grid. Both the puzzle and answer key export as separate JPEG or PDF files.',
    },
    {
      question: 'Do I need to create an account?',
      answer: 'No. The free version works immediately with no signup, no email, and no credit card. All features are available with only a watermark on exported files.',
    },
    {
      question: 'Can I sell the worksheets I create?',
      answer: 'Yes. Both the Commercial Pack ($27) and Full Access Pack ($47) include a commercial license for selling on Etsy, Amazon KDP, TPT, and any other platform. Unlimited generation included.',
    },
    {
      question: 'What is the difference between the Commercial Pack and Full Access Pack?',
      answer: 'The Commercial Pack ($27) includes the generator, commercial license, popular themes, and all 11 languages. The Full Access Pack ($47) adds all 104 themes, priority access to new content, and future updates. Both are one-time purchases with no recurring fees.',
    },
    {
      question: 'What is your refund policy?',
      answer: 'All sales are final due to the digital nature of the product. Once a license key is delivered and activated, it cannot be returned. Use the free version to test everything first.',
    },
  ],

  internalLinks: [
    { slug: 'word-scramble', pageType: 'tool', anchorText: 'Free Word Scramble Generator' },
    { slug: 'word-guess', pageType: 'tool', anchorText: 'Free Hangman Worksheet Maker' },
    { slug: 'cryptogram', pageType: 'tool', anchorText: 'Free Cryptogram Puzzle Generator' },
    { slug: 'alphabet-train', pageType: 'tool', anchorText: 'Free Alphabet Train Worksheet Maker' },
    { slug: 'writing', pageType: 'tool', anchorText: 'Free Handwriting Practice Generator' },
    { slug: 'prepositions', pageType: 'tool', anchorText: 'Free Prepositions Worksheet Maker' },
    { slug: 'wordsearch', pageType: 'app', anchorText: 'Word Search Generator \u2014 Full Details' },
    { slug: 'literacy-bundle', pageType: 'bundle', anchorText: 'Letters & Words Bundle \u2014 Save on All Literacy Tools' },
    { slug: 'reading-printable-ideas', pageType: 'idea', anchorText: 'Reading Printable Niche Ideas' },
    { slug: 'create-educational-bundles', pageType: 'guide', anchorText: 'How to Create Educational Bundles That Sell' },
  ],
};
