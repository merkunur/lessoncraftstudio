import type { AppDetailContent } from '../types';

export const content: AppDetailContent = {
  appId: 'word-guess',
  locale: 'en',
  category: 'literacy',

  seo: {
    titleTag: 'Word Guess Generator | Missing Letter Worksheets Free',
    metaDescription: 'Create word guess worksheets where students fill in missing letters. Exclude letters option, custom word lists, 104 themes. Free generator with answer keys and PDF export.',
    primaryKeyword: 'word guess worksheet generator',
    secondaryKeywords: [
      'missing letter worksheets',
      'fill in the blank letter worksheets',
      'guess the word worksheets',
      'spelling worksheets with pictures',
      'letter completion worksheets',
    ],
    lsiKeywords: [
      'vocabulary building worksheets',
      'sight word activities',
      'spelling practice with images',
      'word completion puzzles',
      'phonics fill in worksheets',
      'beginning sounds worksheets',
      'letter recognition practice',
      'word building activities',
    ],
  },

  visuals: {
    heroImages: {
      primary: '/samples/english/word guess/clue-grid_answer-key (1).jpeg',
      primaryAlt: 'Word guess worksheet with animal images and missing letters for students to complete',
      secondary: '/samples/english/word guess/clue-grid_answer-key (2).jpeg',
      secondaryAlt: 'Word guess answer key showing completed words next to matching images',
    },
    sampleGallery: [
      { src: '/samples/english/word guess/clue-grid_answer-key (3).jpeg', alt: 'Word guess with food theme and vowels removed', caption: 'Vowels excluded mode' },
      { src: '/samples/english/word guess/clue-grid_answer-key (4).jpeg', alt: 'Word guess with 10 exercises per page', caption: '10 exercises per page' },
      { src: '/samples/english/word guess/clue-grid_answer-key (5).jpeg', alt: 'Custom word list word guess without images', caption: 'Custom word list mode' },
      { src: '/samples/english/word guess/clue-grid_answer-key (6).jpeg', alt: 'Word guess with manual image editing and custom names', caption: 'Manual edit mode' },
      { src: '/samples/english/word guess/clue-grid_answer-key (7).jpeg', alt: 'Word guess with border decoration and nature theme', caption: 'Decorated layout' },
      { src: '/samples/english/word guess/clue-grid_answer-key (8).jpeg', alt: 'Word guess answer key with all letters revealed', caption: 'Auto-generated answer key' },
    ],
    youtubeId: 'DSwX_p4dRNM',
    videoTitle: 'How to Create Word Guess Worksheets',
  },

  hero: {
    title: 'Word Guess Generator',
    tagline: 'Missing letters plus image clues \u2014 the spelling challenge that builds word recognition from the inside out',
    description: `Spelling practice usually means writing whole words from memory. Word Guess flips the approach: students see an image and a partially spelled word with letters missing, then figure out which letters complete it. This inside-out method forces students to analyze letter patterns and sound out words rather than relying on rote memorization.

The Exclude Letters feature turns difficulty into a teaching tool. Remove vowels and students must supply them \u2014 practicing the hardest part of English spelling. Remove specific consonants to target particular sounds. Remove random letters for general spelling challenge. Combined with an image clue, each exercise becomes a mini phonics puzzle.

Three input modes offer complete flexibility. Select images from 104 themes and their names become the puzzle words. Enable Manual Image Edit to rename images before generation \u2014 change "dog" to "puppy" or use vocabulary from a current unit. Or switch to Custom Word List mode and type any words directly, generating text-only exercises without images for focused spelling tests.

Set 1\u201310 puzzles per page, toggle exercise numbers and name/date fields, and customize everything with the canvas editor. Each worksheet generates a matching answer key with all letters revealed. Export as JPEG or PDF and try everything free with no signup.`,
  },

  howItWorks: {
    title: 'Create a Word Guess Worksheet in 5 Steps',
    steps: [
      {
        title: 'Choose Your Word Source',
        description: 'Select images from 104 themes (names become puzzle words), enable Manual Edit to rename images, or use Custom Word List to type your own vocabulary. Each mode produces a different type of worksheet.',
      },
      {
        title: 'Set the Exclude Letters',
        description: 'Type which letters to remove from words (e.g., "AEIOU" to exclude vowels). The generator replaces those letters with blanks. Leave empty for random letter removal. This controls both difficulty and phonics focus.',
      },
      {
        title: 'Configure Exercise Count',
        description: 'Set 1\u201310 puzzles per page. Toggle exercise numbers on or off. Include name and date fields for classroom use.',
      },
      {
        title: 'Customize the Layout',
        description: 'Choose page size, font, and orientation. Add titles and instructions with the canvas editor. Apply themed backgrounds and borders for a polished look.',
      },
      {
        title: 'Export and Distribute',
        description: 'Download the worksheet and answer key as JPEG or PDF. The answer key shows all letters revealed. Toggle grayscale for ink-efficient printing.',
      },
    ],
  },

  features: [
    {
      title: 'Exclude Letters System',
      description: 'Specify exactly which letters to remove from puzzle words. Exclude vowels (AEIOU) for vowel practice. Exclude specific consonants for targeted sound work. Leave blank for random removal. This feature transforms a simple spelling exercise into a precision phonics tool.',
    },
    {
      title: 'Three Word Input Modes',
      description: 'Use themed images for visual vocabulary (image names become words), Manual Edit to customize names before generation, or Custom Word List for any vocabulary without images. Switch between modes to serve different classroom needs.',
    },
    {
      title: 'Manual Image Name Editing',
      description: 'Edit image names before worksheet generation. Change vocabulary to match classroom units, adjust for regional spelling differences, or assign completely different words to images. Provides teacher-level control with image-based visual appeal.',
    },
    {
      title: 'Custom Word List for Text-Only Exercises',
      description: 'Type up to 8 words directly, one per line. The generator creates text-only word guess exercises without images \u2014 ideal for focused spelling tests, vocabulary quizzes, and sight word practice.',
    },
    {
      title: '1\u201310 Exercises Per Worksheet',
      description: 'Set the puzzle count from 1 to 10. Fewer exercises allow larger text and images for younger learners. More exercises maximize practice density for efficient printing and classroom distribution.',
    },
    {
      title: '104 Image Themes',
      description: 'Every theme provides illustrated vocabulary items whose names become puzzle words. Animals, food, vehicles, nature, and seasonal themes connect spelling practice to classroom topics and student interests.',
    },
    {
      title: 'Full Canvas Editor',
      description: 'Add titles, name fields, and custom instructions. Change colors, apply backgrounds and borders. Layer controls, alignment tools, zoom, and undo/redo provide complete design control.',
    },
    {
      title: 'Auto Answer Key with Dual Export',
      description: 'Every worksheet generates a matching answer key with all missing letters filled in. Export both as JPEG or PDF. Grayscale toggle available for ink-efficient black-and-white printing.',
    },
  ],

  businessUseCases: [
    {
      title: 'Create Spelling Practice Packs for Etsy',
      description: 'Bundle themed word guess worksheets: "Animal Spelling Puzzles \u2014 20 Worksheets," "Missing Vowels Practice Pack." Target parents and teachers who search for "spelling worksheets with pictures" and "missing letter worksheets" on Etsy.',
      platform: 'Etsy',
    },
    {
      title: 'Publish Vocabulary Activity Books on Amazon KDP',
      description: 'Compile word guess exercises into themed books: "Guess the Word: Animals A\u2013Z," "Missing Letters Fun for Kindergarten." Include answer keys and progressive difficulty (fewer missing letters early, more later).',
      platform: 'Amazon KDP',
    },
    {
      title: 'Build Phonics Resources for TPT',
      description: 'Use the Exclude Letters feature to create targeted phonics packs: CVC vowel practice (exclude A,E,I,O,U), consonant blend practice (exclude specific blends). TPT teachers value resources that target specific phonics skills.',
      platform: 'Teachers Pay Teachers',
    },
    {
      title: 'Design Sight Word Practice Sets',
      description: 'Use Custom Word List mode with Dolch or Fry sight word lists to create grade-leveled sight word guess packs. Package as weekly sight word practice for kindergarten through second grade classrooms.',
      platform: 'Multi-platform',
    },
    {
      title: 'Create Multi-Language Vocabulary Builders',
      description: 'Use 11-language support to create word guess worksheets that teach vocabulary in different languages. French word completion, German spelling puzzles, and Spanish vocabulary builders target language learners.',
      platform: 'Gumroad',
    },
  ],

  faq: [
    {
      question: 'How does the Exclude Letters feature work?',
      answer: 'Type the letters you want removed from puzzle words (e.g., "AEIOU" to remove all vowels). Those letters become blanks that students must fill in. Leave the field empty for random letter removal.',
    },
    {
      question: 'Can I use my own word list?',
      answer: 'Yes. Custom Word List mode lets you type up to 8 words, one per line. The generator creates text-only word guess exercises without images, perfect for spelling tests and vocabulary quizzes.',
    },
    {
      question: 'Can I edit image names before generating?',
      answer: 'Yes. Manual Image Edit mode lets you change image names before the worksheet is created. Rename, adjust for regional differences, or assign completely different words to images.',
    },
    {
      question: 'How many puzzles can I put on one page?',
      answer: 'Set 1 to 10 exercises per worksheet. Fewer exercises create larger, clearer visuals. More exercises maximize practice per printed page.',
    },
    {
      question: 'Does it generate answer keys?',
      answer: 'Yes. Every worksheet generates a matching answer key with all missing letters filled in. Both export as JPEG and PDF.',
    },
    {
      question: 'What languages are supported?',
      answer: 'All 11 languages with localized image names: English, German, French, Spanish, Portuguese, Italian, Dutch, Swedish, Danish, Norwegian, and Finnish. Word Guess is language-sensitive.',
    },
    {
      question: 'Can I sell these worksheets commercially?',
      answer: 'Yes. Both the Commercial Pack ($27) and Full Access Pack ($47) include a commercial license for all platforms. Unlimited generation included.',
    },
    {
      question: 'What is the difference between the Commercial Pack and Full Access Pack?',
      answer: 'The Commercial Pack ($27) includes the generator, commercial license, popular themes, and all languages. The Full Access Pack ($47) adds all 104 themes, priority content, and future updates. Both one-time purchases.',
    },
    {
      question: 'Can I try it free?',
      answer: 'Yes. All modes and settings work free with only a watermark on exports. No signup required.',
    },
    {
      question: 'What is your refund policy?',
      answer: 'All sales are final due to the digital nature of the product. Once a license key is delivered and activated, it cannot be returned. Test the free version first.',
    },
  ],

  internalLinks: [
    { slug: 'word-scramble', pageType: 'app', anchorText: 'Word Scramble Generator' },
    { slug: 'wordsearch', pageType: 'app', anchorText: 'Word Search Generator' },
    { slug: 'alphabet-train', pageType: 'app', anchorText: 'Alphabet Train Generator' },
    { slug: 'cryptogram', pageType: 'app', anchorText: 'Cryptogram Generator' },
    { slug: 'crossword', pageType: 'app', anchorText: 'Crossword Generator' },
    { slug: 'writing', pageType: 'app', anchorText: 'Writing Generator' },
    { slug: 'word-guess', pageType: 'tool', anchorText: 'Try Word Guess Generator Free' },
    { slug: 'literacy-bundle', pageType: 'bundle', anchorText: 'Letters & Words Bundle \u2014 Save on All Literacy Generators' },
    { slug: 'create-educational-bundles', pageType: 'guide', anchorText: 'How to Create Educational Bundles' },
    { slug: 'reading-printable-ideas', pageType: 'idea', anchorText: 'Reading Printable Niche Ideas' },
  ],
};
