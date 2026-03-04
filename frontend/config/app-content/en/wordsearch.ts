import type { AppDetailContent } from '../types';

export const content: AppDetailContent = {
  appId: 'wordsearch',
  locale: 'en',
  category: 'literacy',

  seo: {
    titleTag: 'Word Search Generator | Create Puzzles Free Online',
    metaDescription: 'Create word search puzzles with images in seconds. Adjustable grid 5-30, diagonal and reverse words, 104 themes, custom word lists. Free online generator with PDF export.',
    primaryKeyword: 'word search generator',
    secondaryKeywords: [
      'word search maker',
      'word search puzzle generator',
      'printable word search creator',
      'custom word search generator',
      'word find puzzle maker',
    ],
    lsiKeywords: [
      'word search worksheets',
      'vocabulary activities',
      'spelling practice games',
      'classroom word puzzles',
      'word recognition activities',
      'printable puzzles for kids',
      'hidden word puzzles',
      'word search books',
    ],
  },

  visuals: {
    heroImages: {
      primary: '/samples/english/wordsearch/Word Search 1.jpeg',
      primaryAlt: 'Word search puzzle with animal theme images as word clues in a 12x12 grid',
      secondary: '/samples/english/wordsearch/Word Search 2.jpeg',
      secondaryAlt: 'Word search answer key with found words highlighted in the grid',
    },
    sampleGallery: [
      { src: '/samples/english/wordsearch/Word Search 3.jpeg', alt: 'Word search with food theme showing images alongside the grid', caption: 'Food theme with image clues' },
      { src: '/samples/english/wordsearch/Word Search 4.jpeg', alt: 'Large 20x20 word search grid with vehicle vocabulary', caption: '20x20 advanced grid' },
      { src: '/samples/english/wordsearch/Word Search 5.jpeg', alt: 'Word search with text-only word list and nature theme border', caption: 'Text-only word list mode' },
      { src: '/samples/english/wordsearch/Word Search 6.jpeg', alt: 'Word search with diagonal and reverse words enabled', caption: 'Diagonal and reverse words' },
      { src: '/samples/english/wordsearch/Word Search 7.jpeg', alt: 'Custom word list word search created from user vocabulary', caption: 'Custom word list mode' },
      { src: '/samples/english/wordsearch/Word Search 8.jpeg', alt: 'Word search answer key with all words circled', caption: 'Auto-generated answer key' },
    ],
    youtubeId: '36keBFzJbPo',
    videoTitle: 'How to Create Word Search Puzzles with Images',
  },

  hero: {
    title: 'Word Search Generator',
    tagline: 'Picture-powered word searches that turn vocabulary practice into a puzzle adventure',
    description: `Word search puzzles are one of the most popular printable products on every marketplace \u2014 and for good reason. They work for every age, every subject, and every skill level. The Word Search Generator takes the classic format and enhances it with image clues from a 104-theme library, making puzzles accessible to pre-readers and visually engaging for everyone.

Build grids from 5\u00d75 for young beginners up to 30\u00d730 for adults who love a challenge. Control word placement with toggles for diagonal words and reverse (backward) words. Show the word list as images only, text only, or both. The generator places words first, then fills remaining cells with random letters to create a clean, solvable puzzle every time.

Three input modes give you flexibility. Select images from themed libraries and the generator uses their names as puzzle words. Enable Manual Image Edit mode to change image names before generation, useful for custom vocabulary. Or switch to Custom Word List mode and type any words you want \u2014 no images needed \u2014 for subject-specific vocabulary, spelling lists, or themed puzzles in any language.

The canvas editor adds professional polish: custom titles, themed backgrounds, decorative borders, and 7 fonts. Every puzzle exports with a matching answer key where found words are highlighted. Export as JPEG for digital use or PDF for print. Try every feature free right now.`,
  },

  howItWorks: {
    title: 'Create a Word Search Puzzle in 5 Steps',
    steps: [
      {
        title: 'Choose Your Word Source',
        description: 'Select images from the 104-theme library (their names become puzzle words), use Manual Edit mode to customize word names, or type a Custom Word List for complete control over vocabulary.',
      },
      {
        title: 'Set the Grid Size',
        description: 'Adjust rows and columns independently from 5 to 30. Smaller grids (5\u00d75 to 8\u00d78) suit young learners. Larger grids (15\u00d715 to 30\u00d730) challenge older students and adults. The generator ensures all words fit.',
      },
      {
        title: 'Configure Word Placement',
        description: 'Enable or disable diagonal word placement and reverse (backward) words. Horizontal and vertical are always included. More placement options increase difficulty. Fewer options make puzzles easier to solve.',
      },
      {
        title: 'Choose Word List Display',
        description: 'Show the word list as images only (for pre-readers), text only (for spelling focus), or both. This single setting transforms the puzzle from a picture-matching activity to a spelling exercise.',
      },
      {
        title: 'Export Puzzle and Answer Key',
        description: 'Download the puzzle and its answer key as JPEG or PDF. The answer key highlights all found words in the grid. Toggle grayscale for ink-efficient printing.',
      },
    ],
  },

  features: [
    {
      title: 'Adjustable Grid from 5\u00d75 to 30\u00d730',
      description: 'Set rows and columns independently for grids from 25 to 900 cells. Small grids suit preschool and kindergarten. Medium grids work for elementary classrooms. Large grids challenge middle schoolers and adults. The generator ensures every word fits and fills remaining cells with random letters.',
    },
    {
      title: 'Diagonal and Reverse Word Placement',
      description: 'Toggle diagonal words and reverse (backward) words on or off. With all placements enabled, words can go horizontally, vertically, diagonally, and backwards in any direction. Reducing options makes puzzles easier for younger learners.',
    },
    {
      title: 'Three Word Input Modes',
      description: 'Use themed images as word sources (names become puzzle words), enable Manual Edit to rename images before generation, or type a Custom Word List for complete vocabulary control. Switch between modes to create image-based, vocabulary-focused, or custom-themed puzzles.',
    },
    {
      title: 'Image, Text, or Combined Word List',
      description: 'Display the word list as images only for pre-readers who match pictures to grid words. Show text only for spelling practice. Show both for combined visual and textual reference. One setting transforms the puzzle\u2019s educational purpose.',
    },
    {
      title: '104 Image Themes',
      description: 'Each theme provides illustrated vocabulary items that become puzzle words. Animals, food, vehicles, nature, sports, and seasonal themes align puzzles with classroom units. The search feature finds specific images across all themes.',
    },
    {
      title: 'Full Canvas Editor',
      description: 'Add custom titles, student name fields, and instructions as text overlays. Change colors, apply themed backgrounds and borders. Layer controls, alignment tools, zoom, and undo/redo give complete design control.',
    },
    {
      title: 'Auto-Generated Answer Key',
      description: 'Every puzzle generates an answer key that highlights found words in the grid. The answer key matches the puzzle layout exactly, making grading or self-checking straightforward.',
    },
    {
      title: 'Dual Export with Grayscale',
      description: 'Download as high-resolution JPEG or print-ready PDF. Grayscale toggle produces black-and-white output for efficient printing. Both puzzle and answer key export as separate files at full quality.',
    },
  ],

  businessUseCases: [
    {
      title: 'Sell Themed Word Search Books on Amazon KDP',
      description: 'Word search books are one of KDP\u2019s most consistently profitable categories. Compile 50\u2013100 themed puzzles into books: "Animal Word Search for Kids," "Food Vocabulary Puzzles," "Holiday Word Finds." Include answer keys at the back. Image-enhanced puzzles create more visually compelling previews than text-only competitors.',
      platform: 'Amazon KDP',
    },
    {
      title: 'Create Vocabulary Puzzle Packs for Etsy',
      description: 'Bundle 10\u201320 themed word searches as instant downloads. Create difficulty-leveled packs: easy (8\u00d78 grid, no diagonals), medium (12\u00d712, diagonals), hard (20\u00d720, all directions). "Word search printable" and "word search worksheets" are high-volume Etsy search terms.',
      platform: 'Etsy',
    },
    {
      title: 'Build Subject-Area Resources for TPT',
      description: 'Use Custom Word List mode to create subject-specific puzzles: science vocabulary, social studies terms, math word walls. Create grade-leveled packs with appropriate grid sizes and word difficulty. TPT teachers search for "vocabulary word search" by subject.',
      platform: 'Teachers Pay Teachers',
    },
    {
      title: 'Design Seasonal and Holiday Puzzle Collections',
      description: 'Use themed images for seasonal word searches: pumpkins for Halloween, snowflakes for Christmas, hearts for Valentine\u2019s. Seasonal puzzle collections sell year-round to planners and see demand spikes during their season.',
      platform: 'Multi-platform',
    },
    {
      title: 'Create Multi-Language Word Search Sets',
      description: 'Use the 11-language support to create word search packs in different languages. A "French Vocabulary Word Search" or "Spanish Word Find" pack targets language learners and bilingual classrooms \u2014 a niche with less competition.',
      platform: 'Gumroad',
    },
  ],

  faq: [
    {
      question: 'How big can the word search grid be?',
      answer: 'Set rows and columns independently from 5 to 30, creating grids from 5\u00d75 (25 cells) to 30\u00d730 (900 cells). The default is 12\u00d712. Smaller grids suit young learners, larger grids challenge adults.',
    },
    {
      question: 'Can words go diagonally and backwards?',
      answer: 'Yes. Toggle diagonal and reverse word placement independently. With all options enabled, words can appear horizontally, vertically, diagonally, and backwards in any direction. Disable options to make puzzles easier.',
    },
    {
      question: 'Can I use my own word list instead of images?',
      answer: 'Yes. Custom Word List mode lets you type any words you want, one per line. The generator creates the puzzle from your list without using images. Perfect for spelling lists, vocabulary terms, or themed puzzles in any language.',
    },
    {
      question: 'Can I show only images without text words?',
      answer: 'Yes. The "Show Only Images" option displays picture clues without text, making the puzzle accessible to pre-readers. They find the word in the grid by recognizing the image. You can also show text only or both.',
    },
    {
      question: 'Does it generate answer keys?',
      answer: 'Yes. Every puzzle generates an answer key that highlights all words in the grid. The answer key uses the same layout and exports as a separate JPEG or PDF file.',
    },
    {
      question: 'How many themes are available?',
      answer: 'The Full Access Pack includes all 104 themes. The Commercial Pack includes popular themes. Both support custom image uploads and custom word lists.',
    },
    {
      question: 'Can I sell the puzzles I create?',
      answer: 'Yes. Both the Commercial Pack ($27) and Full Access Pack ($47) include a commercial license for all platforms. Sell on Etsy, Amazon KDP, TPT, and anywhere else. Unlimited generation included.',
    },
    {
      question: 'What is the difference between the Commercial Pack and Full Access Pack?',
      answer: 'The Commercial Pack ($27) includes the generator, commercial license, popular themes, and all 11 languages. The Full Access Pack ($47) adds all 104 themes, priority access to new content, and future updates. Both are one-time purchases.',
    },
    {
      question: 'Can I try it free?',
      answer: 'Yes. All grid sizes, word placement options, and input modes work in the free version. The only difference is a watermark on exports. No signup required.',
    },
    {
      question: 'What languages does it support?',
      answer: 'The interface and image library support 11 languages: English, German, French, Spanish, Portuguese, Italian, Dutch, Swedish, Danish, Norwegian, and Finnish. Custom Word List mode works with any language since you provide the words.',
    },
    {
      question: 'What is your refund policy?',
      answer: 'All sales are final due to the digital nature of the product. Once a license key is delivered and activated, it cannot be returned. Use the free version to test all features before purchasing.',
    },
  ],

  internalLinks: [
    { slug: 'crossword', pageType: 'app', anchorText: 'Crossword Generator' },
    { slug: 'word-scramble', pageType: 'app', anchorText: 'Word Scramble Generator' },
    { slug: 'cryptogram', pageType: 'app', anchorText: 'Cryptogram Generator' },
    { slug: 'word-guess', pageType: 'app', anchorText: 'Word Guess Generator' },
    { slug: 'alphabet-train', pageType: 'app', anchorText: 'Alphabet Train Generator' },
    { slug: 'treasure-hunt', pageType: 'app', anchorText: 'Treasure Hunt Generator' },
    { slug: 'wordsearch', pageType: 'tool', anchorText: 'Try Word Search Generator Free' },
    { slug: 'literacy-bundle', pageType: 'bundle', anchorText: 'Letters & Words Bundle \u2014 Save on All Literacy Generators' },
    { slug: 'create-word-search-books', pageType: 'guide', anchorText: 'How to Create Word Search Books' },
    { slug: 'reading-printable-ideas', pageType: 'idea', anchorText: 'Reading Printable Niche Ideas' },
  ],
};
