import type { AppDetailContent } from '../types';

export const content: AppDetailContent = {
  appId: 'math-puzzle',
  locale: 'en',
  category: 'math',

  seo: {
    titleTag: 'Math Puzzle Generator | Picture Grid Puzzles Free Online',
    metaDescription: 'Create math picture puzzles with image grids in seconds. Addition, subtraction, and mixed operations. Solve equations to reveal hidden images. Free generator with PDF export.',
    primaryKeyword: 'math puzzle generator',
    secondaryKeywords: [
      'math picture puzzle worksheets',
      'printable math puzzles',
      'math puzzle worksheets with pictures',
      'equation puzzle maker',
      'image grid math puzzles',
    ],
    lsiKeywords: [
      'math enrichment activities',
      'puzzle worksheets for kids',
      'critical thinking math',
      'math problem solving',
      'picture grid puzzles',
      'math challenge worksheets',
      'number puzzles printable',
      'math brain teasers',
    ],
  },

  visuals: {
    heroImages: {
      primary: '/samples/english/math puzzle/Math Puzzles (1).jpeg',
      primaryAlt: 'Math picture puzzle worksheet with addition equations and scrambled image pieces for students to solve',
      secondary: '/samples/english/math puzzle/Math Puzzles (10).jpeg',
      secondaryAlt: 'Completed math puzzle answer key showing the revealed image after solving all equations',
    },
    sampleGallery: [
      { src: '/samples/english/math puzzle/Math Puzzles (11).jpeg', alt: 'Math puzzle with animal theme and 3x3 grid', caption: '3x3 grid with addition' },
      { src: '/samples/english/math puzzle/Math Puzzles (12).jpeg', alt: 'Math puzzle using subtraction equations with food images', caption: 'Subtraction mode' },
      { src: '/samples/english/math puzzle/Math Puzzles (13).jpeg', alt: 'Mixed operations math puzzle with vehicle theme', caption: 'Mixed addition and subtraction' },
      { src: '/samples/english/math puzzle/Math Puzzles (14).jpeg', alt: '4x4 advanced math puzzle grid with nature theme', caption: '4x4 advanced grid' },
      { src: '/samples/english/math puzzle/Math Puzzles (15).jpeg', alt: 'Math puzzle with decorative border and space background', caption: 'Custom background and border' },
      { src: '/samples/english/math puzzle/Math Puzzles (16).jpeg', alt: 'Math puzzle answer key with completed image', caption: 'Auto-generated answer key' },
    ],
    youtubeId: 'n5QO39Lq5l8',
    videoTitle: 'How to Create Math Picture Puzzles',
  },

  hero: {
    title: 'Math Puzzle Generator',
    tagline: 'Solve the equations, arrange the pieces, reveal the hidden picture',
    description: `Worksheets full of plain equations bore students before they finish the first row. The Math Puzzle Generator transforms arithmetic practice into a detective game: solve each equation, match the answer to a numbered puzzle piece, and assemble the pieces to reveal a hidden image. Students who normally resist math practice will race to finish because the reward is visual and immediate.

The generator slices any image from the 104-theme library into a grid of puzzle pieces \u2014 from a simple 2\u00d72 for beginners up to a challenging 4\u00d74 for advanced students. Each grid cell hides behind an equation that must be solved first. Choose addition only, subtraction only, or mixed operations. The scrambled pieces appear below the grid, each labeled with its answer number, and students place them by matching solutions to positions.

Grid dimensions control difficulty independently from the math. A 2\u00d72 grid with sums to 10 works for kindergarten. A 4\u00d74 grid with mixed operations works for second or third graders who need a real challenge. The built-in canvas editor lets you add titles, instructions, and decorative elements before exporting. Every puzzle generates a matching answer key showing the completed image with all solutions labeled.

Export as JPEG for digital assignments or PDF for print-ready classroom handouts. A grayscale toggle produces ink-friendly versions for schools that print in bulk. Try every feature free right now \u2014 the generator works without signup, with only a small watermark on exports.`,
  },

  howItWorks: {
    title: 'Build a Math Picture Puzzle in 5 Steps',
    steps: [
      {
        title: 'Choose an Image Theme',
        description: 'Browse 104 image themes \u2014 animals, vehicles, food, space, and more. Select the image that will become the hidden puzzle picture. You can also upload your own image for custom branded puzzles.',
      },
      {
        title: 'Set Grid Size and Operation',
        description: 'Pick your grid dimensions from 2\u00d72 up to 4\u00d74 (up to 16 puzzle pieces). Then select addition, subtraction, or mixed operations. The generator creates one equation per grid cell.',
      },
      {
        title: 'Configure Difficulty',
        description: 'The number range adjusts automatically to the grid size. Solutions range from 2 up to the total number of cells. For addition, operands stay within reasonable bounds. For subtraction, the minuend is set just above the solution to keep problems fair.',
      },
      {
        title: 'Customize the Layout',
        description: 'Use the canvas editor to add a title, student name field, or instructions. Change page color, apply a themed background or border, and pick from 7 fonts. Adjust any element with drag, alignment, and layer tools.',
      },
      {
        title: 'Export Puzzle and Answer Key',
        description: 'Download the puzzle worksheet with scrambled pieces and the answer key showing the completed image. Both export as JPEG and PDF. Toggle grayscale for black-and-white printing.',
      },
    ],
  },

  features: [
    {
      title: 'Image-Grid Puzzle Mechanic',
      description: 'The generator slices a chosen image into a grid of pieces matching your dimensions. Each piece is numbered with the answer to its equation. The scrambled pieces appear separately from the grid, and students place them by solving the math. This turns arithmetic drill into an engaging puzzle-solving activity.',
    },
    {
      title: 'Three Operation Modes',
      description: 'Generate puzzles using addition only, subtraction only, or a mix of both. Addition mode keeps operands within bounds of the solution. Subtraction mode sets the minuend just above the solution value. Mixed mode randomly assigns operations across cells for comprehensive practice.',
    },
    {
      title: 'Adjustable Grid Dimensions',
      description: 'Set rows from 2 to 4 and columns from 2 to 4, creating grids from 4 to 16 cells. Smaller grids suit younger learners who need fewer problems. Larger grids challenge older students with more equations and a more complex picture to assemble.',
    },
    {
      title: '104 Image Themes for Puzzle Pictures',
      description: 'Every theme provides images that get sliced into puzzle pieces. Animals, vehicles, food, space, ocean, and seasonal themes make each puzzle visually unique. Match puzzle themes to classroom units or holiday celebrations for cross-curricular engagement.',
    },
    {
      title: 'Scrambled Piece Layout',
      description: 'Puzzle pieces are automatically shuffled and arranged in columns below the grid. Each piece displays its answer number clearly. Students solve equations in the grid, find the matching numbered piece, and mentally (or physically with scissors) place it to reveal the picture.',
    },
    {
      title: 'Full Canvas Editor',
      description: 'Add custom text, change background colors, apply themed borders, and drag elements into position. Layer controls, alignment tools, zoom, undo, and redo give you complete design control. Create polished puzzles that look professionally designed.',
    },
    {
      title: 'Auto-Generated Answer Key',
      description: 'Every puzzle produces a matching answer key that shows the completed image with all equation solutions labeled. The answer key uses the same layout and styling as the puzzle worksheet for easy visual comparison during grading.',
    },
    {
      title: 'Dual Export with Grayscale Option',
      description: 'Download puzzles as high-resolution JPEG or print-ready PDF. The grayscale toggle converts output to black-and-white for ink-efficient printing. Both the puzzle and answer key export at full quality.',
    },
  ],

  businessUseCases: [
    {
      title: 'Sell Math Puzzle Books on Amazon KDP',
      description: 'Compile 50\u2013100 math puzzles into themed activity books: "Animal Math Puzzles for Kindergarten," "Space Math Challenges for First Grade." The picture-reveal mechanic makes your book stand out from standard equation-only workbooks. Include answer keys at the back for a complete product.',
      platform: 'Amazon KDP',
    },
    {
      title: 'Create Math Puzzle Packs for Etsy',
      description: 'Bundle 10\u201320 themed math puzzles as instant-download digital products. Offer different difficulty levels: easy (2\u00d72 addition), medium (3\u00d73 mixed), hard (4\u00d74 subtraction). Parents and teachers searching for "math puzzles with pictures" find products that look fundamentally different from worksheet competitors.',
      platform: 'Etsy',
    },
    {
      title: 'Build Math Centers for TPT',
      description: 'Create math center activity packs where students solve picture puzzles independently. Include a recording sheet, answer key, and teacher directions. TPT buyers expect differentiated resources, so include multiple difficulty levels in each pack.',
      platform: 'Teachers Pay Teachers',
    },
    {
      title: 'Design Holiday Math Puzzle Collections',
      description: 'Use seasonal themes for holiday-specific puzzle packs: pumpkin puzzles for Halloween, snowflake puzzles for winter, heart puzzles for Valentine\u2019s Day. These seasonal products attract concentrated demand and work as engaging party activities.',
      platform: 'Multi-platform',
    },
    {
      title: 'Create a Progressive Puzzle Curriculum',
      description: 'Structure puzzles into a 20-week program advancing from 2\u00d72 addition to 4\u00d74 mixed operations. Each week introduces slightly harder grids and operations. Package as a complete math enrichment curriculum for homeschool families and after-school programs.',
      platform: 'Gumroad',
    },
  ],

  faq: [
    {
      question: 'How does the math picture puzzle work?',
      answer: 'The generator slices an image into a grid of numbered pieces and creates an equation for each cell. Students solve the equations, match answers to the numbered puzzle pieces, and arrange them to reveal the hidden picture. It combines arithmetic practice with a visual reward.',
    },
    {
      question: 'What grid sizes are available?',
      answer: 'You can create grids from 2\u00d72 (4 pieces) up to 4\u00d74 (16 pieces). Set rows and columns independently, so rectangular grids like 2\u00d73 or 3\u00d74 are also possible. Smaller grids suit younger students while larger grids challenge more advanced learners.',
    },
    {
      question: 'What math operations does it support?',
      answer: 'The generator supports addition only, subtraction only, or mixed (both addition and subtraction). In addition mode, operands stay within valid bounds. In subtraction mode, the minuend is always larger than the solution to avoid negative answers.',
    },
    {
      question: 'Can I choose which image becomes the puzzle?',
      answer: 'Yes. Browse 104 image themes and select any image from the library. You can also upload your own custom image to create branded or classroom-specific puzzles.',
    },
    {
      question: 'Does it create answer keys?',
      answer: 'Yes. Every puzzle automatically generates an answer key showing the completed image with all solutions labeled. The answer key matches the puzzle layout and exports as a separate file.',
    },
    {
      question: 'How many themes are available?',
      answer: 'The Full Access Pack includes all 104 image themes. The Commercial Pack includes a curated selection of popular themes. Both tiers allow custom image uploads.',
    },
    {
      question: 'Can I sell the puzzles I create?',
      answer: 'Yes. Both the Commercial Pack ($27) and the Full Access Pack ($47) include a commercial license for selling on Etsy, Amazon KDP, Teachers Pay Teachers, and any other platform. Each license covers one person with unlimited generation.',
    },
    {
      question: 'What is the difference between the Commercial Pack and Full Access Pack?',
      answer: 'The Commercial Pack ($27) includes the math puzzle generator with commercial license, popular themes, and all 11 languages. The Full Access Pack ($47) adds all 104 themes, priority access to new themes, and all future updates. Both are one-time purchases.',
    },
    {
      question: 'Can I try it free?',
      answer: 'Yes. All features, grid sizes, operations, and themes work in the free version. The only difference is a watermark on exported files. Try everything to make sure it fits your needs before buying.',
    },
    {
      question: 'What export formats are available?',
      answer: 'Download puzzles as high-resolution JPEG or print-ready PDF. A grayscale toggle produces black-and-white output for efficient printing. Both the puzzle worksheet and answer key export separately.',
    },
    {
      question: 'What languages does it support?',
      answer: 'The interface supports 11 languages: English, German, French, Spanish, Portuguese, Italian, Dutch, Swedish, Danish, Norwegian, and Finnish. Since math puzzles use numbers and images, the content works universally.',
    },
    {
      question: 'What is your refund policy?',
      answer: 'All sales are final due to the digital nature of the product. Once a license key is delivered and activated, it cannot be returned. Use the free version with watermark to test every feature before purchasing.',
    },
  ],

  internalLinks: [
    { slug: 'addition', pageType: 'app', anchorText: 'Addition Worksheet Generator' },
    { slug: 'subtraction', pageType: 'app', anchorText: 'Subtraction Worksheet Generator' },
    { slug: 'math-worksheet', pageType: 'app', anchorText: 'Math Worksheet Generator' },
    { slug: 'code-addition', pageType: 'app', anchorText: 'Code Addition Generator' },
    { slug: 'sudoku', pageType: 'app', anchorText: 'Sudoku Generator' },
    { slug: 'missing-number', pageType: 'app', anchorText: 'Missing Number Generator' },
    { slug: 'math-puzzle', pageType: 'tool', anchorText: 'Try Math Puzzle Generator Free' },
    { slug: 'math-bundle', pageType: 'bundle', anchorText: 'Math & Number Bundle \u2014 Save on All Math Generators' },
    { slug: 'create-puzzle-books', pageType: 'guide', anchorText: 'How to Create Puzzle Books' },
    { slug: 'math-printable-ideas', pageType: 'idea', anchorText: 'Math Printable Niche Ideas' },
  ],
};
