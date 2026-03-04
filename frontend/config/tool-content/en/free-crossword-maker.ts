import type { FreeToolContent } from '../types';

export const content: FreeToolContent = {
  appId: 'crossword',
  locale: 'en',

  seo: {
    titleTag: 'Free Picture Crossword Generator | No Signup',
    metaDescription: 'Create free picture crossword puzzles with image clues and auto-generated grids. Custom word lists, drag-drop editing, answer keys. No signup or payment needed.',
    primaryKeyword: 'free picture crossword generator',
    secondaryKeywords: [
      'crossword maker free printable',
      'image crossword worksheet free',
      'free crossword puzzle creator',
      'picture crossword PDF generator',
      'crossword worksheet maker no signup',
    ],
    lsiKeywords: [
      'vocabulary crossword activities',
      'spelling practice worksheets',
      'word puzzle printable kids',
      'crossword puzzles for classroom',
      'educational word games',
      'vocabulary building worksheets',
      'language arts crossword',
      'reading comprehension word puzzles',
    ],
  },

  visuals: {
    heroImages: {
      primary: '/samples/english/crossword/Crossword (1).jpeg',
      primaryAlt: 'Free picture crossword puzzle with image clues positioned around the interlocking word grid',
      secondary: '/samples/english/crossword/Crossword (2).jpeg',
      secondaryAlt: 'Crossword answer key with all words filled into the grid',
    },
    sampleGallery: [
      { src: '/samples/english/crossword/Crossword (3).jpeg', alt: 'Picture crossword with animal theme and numbered image clues', caption: 'Animal theme crossword' },
      { src: '/samples/english/crossword/Crossword (4).jpeg', alt: 'Crossword puzzle using custom word list with text clues', caption: 'Custom word list mode' },
      { src: '/samples/english/crossword/Crossword (5).jpeg', alt: 'Crossword in landscape orientation with food theme images', caption: 'Landscape layout' },
      { src: '/samples/english/crossword/Crossword (6).jpeg', alt: 'Crossword with drag-drop editing showing word repositioning', caption: 'Manual drag-drop editing' },
      { src: '/samples/english/crossword/Crossword (7).jpeg', alt: 'Picture crossword with vehicle images and themed border', caption: 'Vehicle theme with border' },
      { src: '/samples/english/crossword/Crossword (8).jpeg', alt: 'Crossword answer key with completed grid and word list', caption: 'Auto-generated answer key' },
    ],
    youtubeId: 'b3WKDrzif-w',
    videoTitle: 'How to Create Free Picture Crossword Puzzles',
  },

  hero: {
    title: 'Free Picture Crossword Generator',
    tagline: 'Image-clue crosswords that combine vocabulary, spelling, and visual recognition \u2014 free, no account needed',
    description: `Need a free picture crossword generator that makes professional crossword puzzles without signups or hidden fees? This tool creates complete crossword worksheets in your browser with image clues, auto-generated interlocking grids, custom word list support, and answer keys. Every feature works right now, completely free.

The Crossword Generator takes the classic word-puzzle format and enhances it with image clues from 104 themed categories. Students see a numbered picture around the grid, identify what it shows, and spell the word into the interlocking across/down pattern. This combines three learning skills in one activity: visual recognition, vocabulary recall, and spelling accuracy. The auto-layout engine handles the hard part \u2014 arranging words so shared letters intersect properly \u2014 while you focus on choosing the right content.

Custom Word List mode opens the generator to any subject. Type your own words with text-based clue descriptions for science vocabulary crosswords, social studies reviews, foreign language practice, or custom spelling lists. The auto-layout engine arranges your words into a proper interlocking grid just like with image clues. After generation, the drag-and-drop editor lets you fine-tune word positions, adjust intersections, and reposition clues manually.

Both portrait and landscape orientations are supported with automatic layout adjustment. The full canvas editor adds titles, student name fields, instructions, and themed decorations. Every crossword generates a matching answer key with all words filled in. Export as JPEG or PDF with optional grayscale. The free version includes every feature \u2014 the only paid difference is watermark removal on exports.`,
  },

  whatYouCanCreate: [
    {
      title: 'Image-Clue Crosswords',
      description: 'Crosswords where themed pictures serve as clues. Students identify the image and spell its name into the grid. Combines visual recognition with spelling in a format kids love.',
    },
    {
      title: 'Subject Vocabulary Crosswords',
      description: 'Use Custom Word List mode for science terms, math vocabulary, social studies keywords, or any subject. Text clues describe each word while the grid reinforces spelling.',
    },
    {
      title: 'Spelling Practice Puzzles',
      description: 'Turn weekly spelling lists into crossword puzzles. The interlocking format forces correct spelling since wrong letters break intersecting words.',
    },
    {
      title: 'Foreign Language Crosswords',
      description: 'Use image clues with the 11-language feature so students see a picture and write the word in their target language. No text translation needed \u2014 the image is the clue.',
    },
    {
      title: 'Themed Activity Sheets',
      description: 'Create crosswords matching classroom themes: ocean animal vocabulary, food and nutrition words, transportation terms. The themed images make each crossword visually unique.',
    },
    {
      title: 'Assessment and Review Puzzles',
      description: 'Generate crosswords as end-of-unit vocabulary reviews. The answer key makes grading instant, and the format feels like a game rather than a test to students.',
    },
  ],

  tutorial: {
    title: 'How to Make a Picture Crossword Puzzle in 10 Steps',
    steps: [
      {
        title: 'Open the Generator',
        description: 'Click "Try It Free" on this page. The crossword maker loads instantly in your browser. No account, no installation, no waiting.',
      },
      {
        title: 'Choose Your Word Source',
        description: 'Select Image Clue mode (pictures from 104 themes become crossword clues) or Custom Word List mode (type your own words with text clues). Both generate proper interlocking crosswords.',
      },
      {
        title: 'Select Images or Enter Words',
        description: 'In image mode, browse themes and select images. Their names become the crossword words. In custom mode, type each word and its clue description.',
      },
      {
        title: 'Auto-Generate the Layout',
        description: 'Click generate and the engine arranges words in an interlocking pattern, maximizing shared-letter intersections. Image clues are positioned around the grid with numbered references.',
      },
      {
        title: 'Fine-Tune with Drag-and-Drop',
        description: 'Optionally adjust word positions using the manual editor. Move words to improve intersections, change across/down orientation, or reposition image clues around the grid.',
      },
      {
        title: 'Choose Orientation',
        description: 'Select portrait or landscape layout. Portrait works for standard printing. Landscape gives more horizontal space for grids with longer words.',
      },
      {
        title: 'Preview the Crossword',
        description: 'Review the complete crossword with its numbered clues. Try solving it yourself to verify difficulty and make sure all clues are clear and all intersections work.',
      },
      {
        title: 'Customize with Canvas Editor',
        description: 'Add a title, student name field, and instructions like "Use the pictures to fill in the crossword." Apply themed borders and backgrounds.',
      },
      {
        title: 'Generate the Answer Key',
        description: 'Toggle the answer key to see all words filled into the grid. The answer key uses the same layout for direct comparison during grading.',
      },
      {
        title: 'Export as JPEG or PDF',
        description: 'Download the crossword and answer key separately. Choose JPEG for digital sharing or PDF for print. Toggle grayscale for black-and-white printing.',
      },
    ],
  },

  businessIdeas: [
    {
      title: 'Crossword Puzzle Books for Amazon KDP',
      description: 'Compile 50\u2013100 themed crosswords into vocabulary-building books: "Animal Crosswords for Kids," "Picture Crossword Puzzles \u2014 100 Visual Challenges." Image-clue crosswords create visually compelling KDP preview images that stand out from text-only crossword books.',
      platform: 'Amazon KDP',
    },
    {
      title: 'Vocabulary Crossword Packs on Etsy',
      description: 'Bundle 10\u201320 themed crosswords as instant-download packs. Use image mode for visual vocabulary and custom word mode for subject-specific sets. "Crossword puzzle printable" and "vocabulary worksheet" are high-volume Etsy search terms.',
      platform: 'Etsy',
    },
    {
      title: 'Curriculum-Aligned Resources for TPT',
      description: 'Use Custom Word List mode to create crosswords aligned with specific grade-level vocabulary standards. Include answer keys, word lists, and extension activities. TPT teachers search for "vocabulary crossword" filtered by subject and grade.',
      platform: 'Teachers Pay Teachers',
    },
    {
      title: 'Seasonal Crossword Collections',
      description: 'Create seasonal crossword packs using themed images: spring garden vocabulary, summer beach words, autumn harvest terms, winter holiday crosswords. Seasonal vocabulary puzzles attract concentrated demand during their season.',
      platform: 'Multi-platform',
    },
    {
      title: 'Language Learning Crossword Sets',
      description: 'Use image clues with the 11-language feature to create crossword packs for language learners. The visual clue eliminates translation \u2014 students see a picture and spell the word in their target language. Package by language pair.',
      platform: 'Gumroad',
    },
    {
      title: 'Corporate Training Puzzle Packs',
      description: 'Use Custom Word List mode with industry terminology for onboarding materials. New employees learn key terms through crossword puzzles, making vocabulary training engaging rather than lecture-based.',
      platform: 'Multi-platform',
    },
  ],

  proTips: [
    {
      title: 'Use Image Mode for Younger Students',
      tip: 'Image clues eliminate the need to read complex text descriptions. Students see a picture of a "dolphin" and spell it into the grid. This keeps the focus on spelling and vocabulary without reading barriers.',
    },
    {
      title: 'Use Custom Mode for Subject Review',
      tip: 'Type your unit vocabulary with brief clue descriptions for end-of-unit review crosswords. The puzzle format feels like a game, making review sessions more engaging than traditional word lists.',
    },
    {
      title: 'Leverage Intersections for Learning',
      tip: 'When a student misspells a word, the intersecting word breaks too. This self-correcting mechanism teaches careful spelling without teacher intervention \u2014 the grid itself provides feedback.',
    },
    {
      title: 'Start with 4\u20136 Words for Beginners',
      tip: 'Small crosswords with 4\u20136 words create manageable grids for young or struggling spellers. Expand to 8\u201312 words as confidence grows. The auto-layout handles any word count.',
    },
    {
      title: 'Print Landscape for Long Words',
      tip: 'If your word list includes long words (8+ letters), landscape orientation provides more horizontal grid space and prevents the crossword from looking cramped.',
    },
    {
      title: 'Use Drag-and-Drop for Custom Layouts',
      tip: 'After auto-generation, use the manual editor to move words if the layout doesn\u2019t look right. Sometimes repositioning one word improves the overall grid structure significantly.',
    },
    {
      title: 'Pair with Word Walls',
      tip: 'Display the crossword images or vocabulary on a word wall during the unit. When students encounter these words in the crossword, they connect visual memory to spelling practice.',
    },
  ],

  faq: [
    {
      question: 'Is this crossword generator really free?',
      answer: 'Yes. Both image clue mode and custom word list mode work without signup or payment. All 104 themes, the drag-and-drop editor, and answer key generation are included. The only difference is a small watermark on exports.',
    },
    {
      question: 'How does the auto-layout engine work?',
      answer: 'You provide words (from theme images or a custom list) and the engine arranges them in an interlocking crossword pattern. It maximizes shared-letter intersections between across and down entries to create a proper crossword structure automatically.',
    },
    {
      question: 'What are image clues?',
      answer: 'Themed pictures positioned around the crossword grid. Each image is numbered to match an across or down entry. Students identify the picture and spell its name into the grid, combining visual recognition with spelling.',
    },
    {
      question: 'Can I use my own word lists?',
      answer: 'Yes. Custom Word List mode lets you type any words with text-based clue descriptions. The engine arranges your words into an interlocking grid. Perfect for subject vocabulary, spelling lists, or any language.',
    },
    {
      question: 'Can I edit the layout after generation?',
      answer: 'Yes. The drag-and-drop editor lets you adjust word positions, change intersections, and reposition clues after auto-generation. The editor maintains valid crossword structure throughout edits.',
    },
    {
      question: 'Does it generate answer keys?',
      answer: 'Yes. Every crossword generates an answer key showing all words filled in the grid. The answer key matches the puzzle layout and exports as a separate file.',
    },
    {
      question: 'What languages does it support?',
      answer: 'The interface supports 11 languages: English, German, French, Spanish, Portuguese, Italian, Dutch, Swedish, Danish, Norwegian, and Finnish. Custom Word List mode works with any language since you provide the words.',
    },
    {
      question: 'What export formats are available?',
      answer: 'Download as high-resolution JPEG or print-ready PDF. A grayscale toggle converts output to black and white for efficient printing. Both the puzzle and answer key export separately.',
    },
    {
      question: 'What is the difference between the Commercial Pack and Full Access Pack?',
      answer: 'The Commercial Pack ($27) includes the crossword generator with commercial license, popular themes, and all 11 languages. The Full Access Pack ($47) adds all 104 themes, priority access to new content, and all future updates. Both are one-time purchases.',
    },
    {
      question: 'What is your refund policy?',
      answer: 'All sales are final due to the digital nature of the product. Once a license key is delivered and activated, it cannot be returned. Use the free version to test everything first.',
    },
  ],

  internalLinks: [
    { slug: 'find-and-count', pageType: 'tool', anchorText: 'Free I Spy Worksheet Generator' },
    { slug: 'find-objects', pageType: 'tool', anchorText: 'Free Hidden Object Maker' },
    { slug: 'treasure-hunt', pageType: 'tool', anchorText: 'Free Treasure Hunt Maker' },
    { slug: 'wordsearch', pageType: 'app', anchorText: 'Word Search Generator' },
    { slug: 'word-scramble', pageType: 'app', anchorText: 'Word Scramble Generator' },
    { slug: 'word-guess', pageType: 'app', anchorText: 'Word Guess Generator' },
    { slug: 'crossword', pageType: 'app', anchorText: 'Crossword Generator \u2014 Full Details' },
    { slug: 'search-bundle', pageType: 'bundle', anchorText: 'Search & Find Bundle \u2014 Save on All Search Generators' },
    { slug: 'create-crossword-books', pageType: 'guide', anchorText: 'How to Create Crossword Books for KDP' },
    { slug: 'word-puzzle-ideas', pageType: 'idea', anchorText: 'Word Puzzle Printable Ideas' },
  ],
};
