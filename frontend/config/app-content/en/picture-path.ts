import type { AppDetailContent } from '../types';

export const content: AppDetailContent = {
  appId: 'picture-path',
  locale: 'en',
  category: 'puzzle',

  seo: {
    titleTag: 'Picture Path & Maze Generator | Create Mazes Free',
    metaDescription: 'Create picture pathway, classic maze, and choose-the-right-path puzzles. Grid 15-20, 1-3 paths, 1-4 collectibles. Free maze generator with answer keys and PDF export.',
    primaryKeyword: 'maze generator for kids',
    secondaryKeywords: [
      'picture path puzzle maker',
      'printable maze generator',
      'maze worksheets for kids',
      'path finding puzzles',
      'maze activity creator',
    ],
    lsiKeywords: [
      'maze worksheets printable',
      'fine motor activities',
      'problem solving for kids',
      'visual tracking exercises',
      'directional skills worksheets',
      'path tracing activities',
      'spatial reasoning puzzles',
      'preschool maze worksheets',
    ],
  },

  visuals: {
    heroImages: {
      primary: '/samples/english/picture path/Picture Pathway  (18).jpeg',
      primaryAlt: 'Picture pathway puzzle with image sequence to follow through a maze grid',
      secondary: '/samples/english/picture path/Picture Pathway  (2).jpeg',
      secondaryAlt: 'Classic maze puzzle with collectible images along the correct path',
    },
    sampleGallery: [
      { src: '/samples/english/picture path/Picture Pathway  (3).jpeg', alt: 'Picture pathway mode with animal theme images forming a sequence', caption: 'Picture Pathway mode' },
      { src: '/samples/english/picture path/Picture Pathway  (5).jpeg', alt: 'Classic maze with food collectibles placed along the route', caption: 'Classic Maze with collectibles' },
      { src: '/samples/english/picture path/Picture Pathway  (7).jpeg', alt: 'Choose the right path puzzle with three branching routes', caption: 'Choose the Right Path mode' },
      { src: '/samples/english/picture path/Picture Pathway  (10).jpeg', alt: 'Picture path puzzle with themed border and nature images', caption: 'Nature theme with border' },
      { src: '/samples/english/picture path/Picture Pathway  (12).jpeg', alt: 'Maze puzzle with multiple paths and collectible items', caption: 'Multiple paths layout' },
      { src: '/samples/english/picture path/Picture Pathway  (15).jpeg', alt: 'Picture path answer key showing the correct route highlighted', caption: 'Auto-generated answer key' },
    ],
    youtubeId: 'Sl1o0uPBDCg',
    videoTitle: 'How to Create Picture Path and Maze Puzzles',
  },

  hero: {
    title: 'Picture Path Generator',
    tagline: 'Three game modes that turn maze-solving into a visual adventure with themed images',
    description: `Mazes are among the most universally loved puzzle types for children, but traditional black-and-white line mazes lack visual appeal and educational depth. The Picture Path Generator creates three distinct game modes that combine maze navigation with image recognition, collecting, and decision-making \u2014 turning a simple path-tracing activity into a multi-skill challenge.

Picture Pathway mode asks students to connect a sequence of images in the correct order through a grid. They must identify each image in the sequence, find it on the grid, and trace a continuous path that visits every image in order. This combines visual recognition with sequential reasoning and path planning. Classic Maze mode generates a traditional maze with a twist: collectible images are placed along the correct path. Students navigate from start to finish while gathering themed items, adding a collecting incentive to the navigation challenge.

Choose the Right Path mode presents multiple branching routes from start to finish, but only one path is correct. Students must visually evaluate each route to determine which one leads to the goal without hitting dead ends. This mode builds decision-making and forward-planning skills. The maze grid ranges from 15 to 20 cells, with 1 to 3 paths and 1 to 4 collectible images per maze.

The full canvas editor adds titles, instructions, and themed decorations to every maze. Each puzzle generates a matching answer key showing the correct path highlighted. Export as JPEG for digital use or PDF for print-ready worksheets. A grayscale toggle produces ink-friendly versions. Try every feature free right now \u2014 no signup required, with only a small watermark on exports.`,
  },

  howItWorks: {
    title: 'Create a Picture Path Puzzle in 5 Steps',
    steps: [
      {
        title: 'Select a Game Mode',
        description: 'Choose from three modes: Picture Pathway (connect images in sequence), Classic Maze (navigate with collectibles), or Choose the Right Path (find the one correct route from multiple options).',
      },
      {
        title: 'Choose an Image Theme',
        description: 'Browse 104 image themes for the collectible items and path markers. Animals, food, vehicles, and nature themes make each maze visually unique. You can also upload custom images.',
      },
      {
        title: 'Configure the Maze Grid',
        description: 'Set the grid size from 15 to 20 cells. Configure 1 to 3 paths and 1 to 4 collectible images. Larger grids and more paths increase the navigation challenge.',
      },
      {
        title: 'Customize the Layout',
        description: 'Use the canvas editor to add a title, student name field, and instructions. Apply themed backgrounds and borders. Position start and end markers for clear direction.',
      },
      {
        title: 'Export Puzzle and Answer Key',
        description: 'Download the maze puzzle and its answer key as JPEG or PDF. The answer key highlights the correct path through the maze. Toggle grayscale for black-and-white printing.',
      },
    ],
  },

  features: [
    {
      title: 'Three Game Modes',
      description: 'Picture Pathway challenges students to connect images in sequence through a grid. Classic Maze adds collectible images along the correct route. Choose the Right Path presents multiple branching paths where only one reaches the goal. Each mode develops different cognitive skills.',
    },
    {
      title: 'Configurable Maze Grid (15\u201320 Cells)',
      description: 'Set the maze grid from 15 to 20 cells to control complexity. Smaller grids suit younger learners with simpler navigation. Larger grids create longer paths and more decision points for advanced students.',
    },
    {
      title: 'Multiple Paths (1\u20133)',
      description: 'Configure between 1 and 3 paths through the maze. A single path creates a straightforward navigation task. Multiple paths add branching decisions and dead ends that require forward planning and backtracking skills.',
    },
    {
      title: 'Collectible Images (1\u20134)',
      description: 'Place 1 to 4 themed collectible images along the correct path. Students must navigate the maze while gathering all collectibles. This adds a secondary objective beyond simply reaching the end.',
    },
    {
      title: '104 Image Themes',
      description: 'Every theme provides images for path markers and collectibles. Animals, food, vehicles, nature, and seasonal themes make each maze visually engaging and align with classroom topics.',
    },
    {
      title: 'Full Canvas Editor',
      description: 'Add custom titles, student name fields, and instructions. Change background colors, apply themed borders, and arrange elements with drag-and-drop. Layer controls, alignment tools, zoom, and undo/redo for professional design.',
    },
    {
      title: 'Auto-Generated Answer Key',
      description: 'Every maze produces an answer key that highlights the correct path from start to finish. In Picture Pathway mode, the answer key shows the correct image sequence. The answer key matches the puzzle layout for easy comparison.',
    },
    {
      title: 'Dual Export with Grayscale Option',
      description: 'Download as high-resolution JPEG or print-ready PDF. The grayscale toggle converts output to black-and-white for ink-efficient printing. Both the maze and answer key export at full quality as separate files.',
    },
  ],

  businessUseCases: [
    {
      title: 'Create Maze Activity Books for Amazon KDP',
      description: 'Compile 50\u2013100 picture path puzzles into themed maze books: "Animal Maze Adventures," "Picture Path Puzzles for Preschoolers." Three game modes let you fill an entire book with varied maze types. Include progressive difficulty from simple single-path mazes to complex multi-path challenges.',
      platform: 'Amazon KDP',
    },
    {
      title: 'Sell Maze Puzzle Packs on Etsy',
      description: 'Bundle 15\u201320 maze worksheets as instant downloads. Create mode-specific packs or mixed-mode variety packs. "Maze worksheets for kids" and "printable mazes" are high-volume Etsy search terms. Image-enhanced mazes stand out from basic line-drawing competitors.',
      platform: 'Etsy',
    },
    {
      title: 'Build Fine Motor Resources for TPT',
      description: 'Create curriculum-aligned maze packs targeting fine motor development, visual tracking, and spatial reasoning. Include difficulty levels, skills-addressed documentation, and progress tracking sheets. TPT occupational therapists and preschool teachers search for these resources.',
      platform: 'Teachers Pay Teachers',
    },
    {
      title: 'Design Seasonal Maze Collections',
      description: 'Use themed images for seasonal maze packs: garden mazes for spring, beach mazes for summer, pumpkin patch mazes for autumn, winter wonderland mazes for December. Seasonal maze books sell year-round and spike during their season.',
      platform: 'Multi-platform',
    },
    {
      title: 'Create a Path-Finding Skills Program',
      description: 'Structure mazes into a progressive program: start with simple Picture Pathway, advance to Classic Maze with collectibles, then introduce Choose the Right Path. Package as a 10-week visual reasoning and planning curriculum for early childhood programs.',
      platform: 'Gumroad',
    },
  ],

  faq: [
    {
      question: 'What are the three game modes?',
      answer: 'Picture Pathway asks students to connect images in a specific sequence through the grid. Classic Maze is a traditional maze with themed collectible images along the correct path. Choose the Right Path presents multiple routes where only one reaches the finish.',
    },
    {
      question: 'How big is the maze grid?',
      answer: 'The maze grid ranges from 15 to 20 cells. Smaller grids create simpler mazes for younger learners. Larger grids produce more complex paths with more decision points for older students.',
    },
    {
      question: 'How many paths can a maze have?',
      answer: 'You can configure 1 to 3 paths. A single path creates straightforward navigation. Multiple paths add branching choices and dead ends, requiring students to plan ahead and evaluate options.',
    },
    {
      question: 'What are collectible images?',
      answer: 'In Classic Maze mode, 1 to 4 themed images are placed along the correct path. Students must navigate the maze while collecting all images. This adds a secondary objective that makes the maze more engaging.',
    },
    {
      question: 'Does it create answer keys?',
      answer: 'Yes. Every maze generates an answer key that highlights the correct path from start to finish. The answer key exports as a separate file for easy grading or self-checking.',
    },
    {
      question: 'How many themes are available?',
      answer: 'The Full Access Pack includes all 104 image themes. The Commercial Pack includes popular themes. Both tiers allow custom image uploads for personalized mazes.',
    },
    {
      question: 'Can I sell the mazes I create?',
      answer: 'Yes. Both the Commercial Pack ($27) and the Full Access Pack ($47) include a commercial license for selling on Etsy, Amazon KDP, Teachers Pay Teachers, and any other platform. Each license covers one person with unlimited generation.',
    },
    {
      question: 'What is the difference between the Commercial Pack and Full Access Pack?',
      answer: 'The Commercial Pack ($27) includes the picture path generator with commercial license, popular themes, and all 11 languages. The Full Access Pack ($47) adds all 104 themes, priority access to new themes, and all future updates. Both are one-time purchases.',
    },
    {
      question: 'Can I try it free?',
      answer: 'Yes. All game modes, grid sizes, and themes work in the free version. The only difference is a watermark on exported files. Try everything before buying.',
    },
    {
      question: 'What languages does it support?',
      answer: 'The interface supports 11 languages: English, German, French, Spanish, Portuguese, Italian, Dutch, Swedish, Danish, Norwegian, and Finnish. Since picture path puzzles are primarily visual, the content works universally.',
    },
    {
      question: 'What is your refund policy?',
      answer: 'All sales are final due to the digital nature of the product. Once a license key is delivered and activated, it cannot be returned. Use the free version to test everything first.',
    },
  ],

  internalLinks: [
    { slug: 'missing-pieces', pageType: 'app', anchorText: 'Missing Piece Puzzle Generator' },
    { slug: 'odd-one-out', pageType: 'app', anchorText: 'Odd One Out Generator' },
    { slug: 'sudoku', pageType: 'app', anchorText: 'Sudoku Generator' },
    { slug: 'treasure-hunt', pageType: 'app', anchorText: 'Treasure Hunt Generator' },
    { slug: 'drawing-lines', pageType: 'app', anchorText: 'Drawing Lines Generator' },
    { slug: 'find-and-count', pageType: 'app', anchorText: 'Find & Count Generator' },
    { slug: 'picture-path', pageType: 'tool', anchorText: 'Try Picture Path Generator Free' },
    { slug: 'puzzle-bundle', pageType: 'bundle', anchorText: 'Puzzles & Games Bundle \u2014 Save on All Puzzle Generators' },
    { slug: 'create-maze-books', pageType: 'guide', anchorText: 'How to Create Maze Books' },
    { slug: 'maze-printable-ideas', pageType: 'idea', anchorText: 'Maze Printable Niche Ideas' },
  ],
};
