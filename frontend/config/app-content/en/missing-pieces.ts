import type { AppDetailContent } from '../types';

export const content: AppDetailContent = {
  appId: 'missing-pieces',
  locale: 'en',
  category: 'puzzle',

  seo: {
    titleTag: 'Missing Piece Puzzle Generator | Create Puzzles Free',
    metaDescription: 'Create missing piece puzzles with multiple choice answers. 1-5 missing pieces, 2-6 solution options, 4 piece shapes. Free generator with answer keys and PDF export.',
    primaryKeyword: 'missing piece puzzle generator',
    secondaryKeywords: [
      'missing piece worksheets',
      'visual puzzle maker',
      'printable missing piece puzzles',
      'picture puzzle worksheets',
      'multiple choice puzzle generator',
    ],
    lsiKeywords: [
      'visual reasoning activities',
      'spatial awareness worksheets',
      'critical thinking puzzles',
      'pattern recognition',
      'logic puzzles for kids',
      'printable brain teasers',
      'visual perception activities',
      'problem solving worksheets',
    ],
  },

  visuals: {
    heroImages: {
      primary: '/samples/english/missing pieces/Missing Pieces (1).jpeg',
      primaryAlt: 'Missing piece puzzle worksheet with multiple choice answer options below the main image',
      secondary: '/samples/english/missing pieces/Missing Pieces (2).jpeg',
      secondaryAlt: 'Missing piece puzzle answer key showing the correct pieces highlighted',
    },
    sampleGallery: [
      { src: '/samples/english/missing pieces/Missing Pieces (3).jpeg', alt: 'Missing piece puzzle with animal theme and square-shaped cutouts', caption: 'Square piece shapes' },
      { src: '/samples/english/missing pieces/Missing Pieces (4).jpeg', alt: 'Missing piece puzzle with circular cutouts and 4 answer choices', caption: 'Circle piece shapes' },
      { src: '/samples/english/missing pieces/Missing Pieces (5).jpeg', alt: 'Missing piece puzzle with multiple pieces removed from a vehicle image', caption: 'Multiple missing pieces' },
      { src: '/samples/english/missing pieces/Missing Pieces (6).jpeg', alt: 'Missing piece puzzle with ellipse-shaped cutouts and nature theme', caption: 'Ellipse piece shapes' },
      { src: '/samples/english/missing pieces/Missing Pieces (7).jpeg', alt: 'Missing piece puzzle with 6 answer options for increased difficulty', caption: '6 answer options' },
      { src: '/samples/english/missing pieces/Missing Pieces (8).jpeg', alt: 'Missing piece puzzle answer key with correct answers circled', caption: 'Auto-generated answer key' },
    ],
    youtubeId: 'gb-xE_Ay4fc',
    videoTitle: 'How to Create Missing Piece Puzzles',
  },

  hero: {
    title: 'Missing Piece Puzzle Generator',
    tagline: 'Spot the missing piece from the picture \u2014 a visual reasoning challenge for every learner',
    description: `Missing piece puzzles are one of the most effective ways to develop visual reasoning and spatial awareness in young learners. The Missing Piece Puzzle Generator creates worksheets where a section of an image is removed and students must identify the correct piece from a set of multiple-choice options. It sounds simple, but the visual discrimination required builds foundational cognitive skills that transfer to reading, math, and science.

The generator removes between 1 and 5 pieces from any image in the 104-theme library. Each removed piece leaves a clearly outlined gap, and the answer options appear below the image. You control the number of solution options from 2 (easy binary choice) up to 6 (challenging visual comparison). The wrong options are generated from nearby sections of the same image, making them visually similar enough to require careful observation.

Four piece shapes keep the format fresh across worksheets: Square, Circle, Rectangle, and Ellipse. Different shapes change how students analyze the missing area \u2014 circles require matching curved edges, rectangles demand attention to aspect ratio, and ellipses combine both challenges. Mix shapes across a worksheet pack for variety, or stick with one shape for focused practice.

Every puzzle generates a matching answer key that reveals the correct pieces in their positions. The full canvas editor lets you add titles, student name fields, instructions, and decorative elements. Export as JPEG for digital assignments or PDF for print-ready handouts. A grayscale toggle produces ink-friendly versions for schools printing in bulk. Try every feature free right now \u2014 the generator works without signup, with only a small watermark on exports.`,
  },

  howItWorks: {
    title: 'Create a Missing Piece Puzzle in 5 Steps',
    steps: [
      {
        title: 'Choose an Image Theme',
        description: 'Browse 104 image themes \u2014 animals, vehicles, food, nature, and more. Select the image that will have pieces removed. You can also upload your own image for custom puzzles.',
      },
      {
        title: 'Set the Number of Missing Pieces',
        description: 'Choose between 1 and 5 pieces to remove from the image. One missing piece suits beginners. Multiple missing pieces increase difficulty and create multi-step reasoning challenges.',
      },
      {
        title: 'Configure Answer Options',
        description: 'Set the number of solution options from 2 to 6. Fewer options make the puzzle easier. More options require finer visual discrimination. Wrong options come from similar areas of the image.',
      },
      {
        title: 'Select Piece Shapes',
        description: 'Choose from Square, Circle, Rectangle, or Ellipse shapes for the cutout areas. Each shape creates a different visual challenge. Mix shapes across worksheets for variety.',
      },
      {
        title: 'Export Puzzle and Answer Key',
        description: 'Download the puzzle with answer options and the answer key showing correct placements. Both export as JPEG or PDF. Toggle grayscale for black-and-white printing.',
      },
    ],
  },

  features: [
    {
      title: 'Adjustable Missing Pieces (1\u20135)',
      description: 'Remove between 1 and 5 pieces from any image. A single missing piece creates a focused observation task for young learners. Multiple missing pieces add complexity and require students to analyze the full image systematically.',
    },
    {
      title: 'Multiple-Choice Answer Options (2\u20136)',
      description: 'Set the number of answer choices from 2 to 6. Two options create a simple binary decision. Six options require careful comparison between visually similar pieces. The generator creates distractors from nearby sections of the same image for authentic challenge.',
    },
    {
      title: 'Four Piece Shapes',
      description: 'Choose Square, Circle, Rectangle, or Ellipse for the cutout shapes. Each shape creates different edge-matching challenges. Squares test straight-edge alignment, circles demand curved-edge matching, rectangles add aspect ratio awareness, and ellipses combine multiple spatial skills.',
    },
    {
      title: '104 Image Themes',
      description: 'Every theme provides high-quality images for puzzle creation. Animals, vehicles, food, space, ocean, and seasonal themes make each puzzle visually unique. Match puzzle themes to classroom units or holiday celebrations.',
    },
    {
      title: 'Smart Distractor Generation',
      description: 'Wrong answer options are automatically generated from nearby sections of the same image. This ensures distractors are visually similar to the correct piece, requiring genuine observation rather than obvious elimination.',
    },
    {
      title: 'Full Canvas Editor',
      description: 'Add custom titles, student name fields, and instructions. Change background colors, apply themed borders, and position elements with drag-and-drop. Layer controls, alignment tools, zoom, and undo/redo provide complete design control.',
    },
    {
      title: 'Auto-Generated Answer Key',
      description: 'Every puzzle produces a matching answer key that shows the correct pieces placed in their positions. The answer key uses the same layout as the puzzle worksheet for easy visual comparison during grading.',
    },
    {
      title: 'Dual Export with Grayscale Option',
      description: 'Download puzzles as high-resolution JPEG or print-ready PDF. The grayscale toggle converts output to black-and-white for ink-efficient printing. Both the puzzle and answer key export at full quality.',
    },
  ],

  businessUseCases: [
    {
      title: 'Create Visual Puzzle Books for Amazon KDP',
      description: 'Compile 50\u2013100 missing piece puzzles into themed activity books: "Animal Puzzle Challenge," "Find the Missing Piece \u2014 Food Edition." Visual puzzles stand out in KDP search results because the preview images are immediately engaging. Include progressive difficulty with 1-piece puzzles at the start and 5-piece puzzles at the end.',
      platform: 'Amazon KDP',
    },
    {
      title: 'Sell Observation Skill Packs on Etsy',
      description: 'Bundle 15\u201320 missing piece worksheets as instant-download packs. Offer difficulty tiers: Easy (1 piece, 2 options), Medium (2\u20133 pieces, 4 options), Hard (4\u20135 pieces, 6 options). "Visual puzzle worksheets" and "observation activities for kids" are growing Etsy search terms.',
      platform: 'Etsy',
    },
    {
      title: 'Build Visual Perception Resources for TPT',
      description: 'Create assessment-ready packs where missing piece puzzles test visual perception skills. Include recording sheets, progress trackers, and teacher notes. TPT buyers in special education and occupational therapy search for visual discrimination resources.',
      platform: 'Teachers Pay Teachers',
    },
    {
      title: 'Design Seasonal Puzzle Collections',
      description: 'Use themed images for seasonal missing piece packs: spring flowers, summer beach scenes, autumn leaves, winter snowscapes. Each season gets its own difficulty progression. Seasonal products attract concentrated demand around holidays and events.',
      platform: 'Multi-platform',
    },
    {
      title: 'Create a Progressive Visual Skills Curriculum',
      description: 'Structure puzzles into a 12-week program advancing from 1 missing piece with 2 options to 5 missing pieces with 6 options. Each week introduces harder configurations. Package as a visual reasoning curriculum for preschool and early elementary programs.',
      platform: 'Gumroad',
    },
  ],

  faq: [
    {
      question: 'How does the missing piece puzzle work?',
      answer: 'The generator removes one or more pieces from an image and presents multiple-choice answer options below. Students examine the gap in the image, compare the options, and identify which piece fits. It builds visual reasoning and spatial awareness skills.',
    },
    {
      question: 'How many pieces can be removed?',
      answer: 'You can remove between 1 and 5 pieces from a single image. One piece suits beginners who need a focused observation task. Multiple pieces create a more complex challenge requiring systematic analysis of the entire image.',
    },
    {
      question: 'How many answer options are there?',
      answer: 'You set between 2 and 6 answer options per missing piece. Two options create a simple binary choice. Six options require fine visual discrimination. Wrong options come from similar areas of the same image to ensure genuine challenge.',
    },
    {
      question: 'What piece shapes are available?',
      answer: 'Four shapes: Square, Circle, Rectangle, and Ellipse. Each shape creates a different edge-matching challenge. You can use one shape per worksheet or mix shapes across a puzzle pack for variety.',
    },
    {
      question: 'Does it create answer keys?',
      answer: 'Yes. Every puzzle automatically generates an answer key showing the correct pieces in their positions. The answer key matches the puzzle layout and exports as a separate file for easy grading.',
    },
    {
      question: 'How many themes are available?',
      answer: 'The Full Access Pack includes all 104 image themes. The Commercial Pack includes a curated selection of popular themes. Both tiers allow custom image uploads for personalized puzzles.',
    },
    {
      question: 'Can I sell the puzzles I create?',
      answer: 'Yes. Both the Commercial Pack ($27) and the Full Access Pack ($47) include a commercial license for selling on Etsy, Amazon KDP, Teachers Pay Teachers, and any other platform. Each license covers one person with unlimited generation.',
    },
    {
      question: 'What is the difference between the Commercial Pack and Full Access Pack?',
      answer: 'The Commercial Pack ($27) includes the missing piece generator with commercial license, popular themes, and all 11 languages. The Full Access Pack ($47) adds all 104 themes, priority access to new themes, and all future updates. Both are one-time purchases.',
    },
    {
      question: 'Can I try it free?',
      answer: 'Yes. All features, piece counts, shape options, and themes work in the free version. The only difference is a watermark on exported files. Try everything to make sure it fits your needs before buying.',
    },
    {
      question: 'What export formats are available?',
      answer: 'Download puzzles as high-resolution JPEG or print-ready PDF. A grayscale toggle produces black-and-white output for efficient printing. Both the puzzle worksheet and answer key export separately.',
    },
    {
      question: 'What languages does it support?',
      answer: 'The interface supports 11 languages: English, German, French, Spanish, Portuguese, Italian, Dutch, Swedish, Danish, Norwegian, and Finnish. Since missing piece puzzles are visual, the content works universally across languages.',
    },
    {
      question: 'What is your refund policy?',
      answer: 'All sales are final due to the digital nature of the product. Once a license key is delivered and activated, it cannot be returned. Use the free version to test everything first.',
    },
  ],

  internalLinks: [
    { slug: 'odd-one-out', pageType: 'app', anchorText: 'Odd One Out Generator' },
    { slug: 'sudoku', pageType: 'app', anchorText: 'Sudoku Generator' },
    { slug: 'picture-path', pageType: 'app', anchorText: 'Picture Path Generator' },
    { slug: 'math-puzzle', pageType: 'app', anchorText: 'Math Puzzle Generator' },
    { slug: 'find-objects', pageType: 'app', anchorText: 'Find Objects Generator' },
    { slug: 'shadow-match', pageType: 'app', anchorText: 'Shadow Match Generator' },
    { slug: 'missing-pieces', pageType: 'tool', anchorText: 'Try Missing Piece Generator Free' },
    { slug: 'puzzle-bundle', pageType: 'bundle', anchorText: 'Puzzles & Games Bundle \u2014 Save on All Puzzle Generators' },
    { slug: 'create-puzzle-books', pageType: 'guide', anchorText: 'How to Create Puzzle Books' },
    { slug: 'puzzle-printable-ideas', pageType: 'idea', anchorText: 'Puzzle Printable Niche Ideas' },
  ],
};
