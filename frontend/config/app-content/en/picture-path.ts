import type { AppContent } from '../types';

const content: AppContent = {
  seo: {
    primaryKeyword: 'picture path worksheet generator',
    secondaryKeywords: [
      'picture path worksheet generator',
      'maze generator for kids',
      'printable maze maker',
      'path finding worksheet maker',
    ],
    lsiKeywords: [
      'labyrinth',
      'follow the path',
      'route finding',
      'fine motor',
      'problem solving',
    ],
    titleTag: 'Picture Path Worksheet Generator for Etsy Sellers',
    metaDescription: 'Create picture path (maze) worksheets to sell on Etsy. Fun activity printables with auto answer keys. Commercial license included. Try free trial.',
  },

  hero: {
    title: 'Picture Path Generator — Create Maze Printables to Sell on Etsy',
    tagline: 'Three game modes in one generator — Picture Pathway, Classic Maze, and Choose the Right Path — powered by an LPF (Longest Path First) maze algorithm with auto-generated answer keys, wall customization, and visual-only design that works globally without translation.',
    description:
      'Picture path mazes combine the timeless appeal of maze puzzles with themed images — solvers navigate paths to reach specific destinations, creating an engaging format that sells well on Etsy and in Amazon KDP activity books. This generator creates professional picture path worksheets with themed image destinations and automatic answer keys in under 3 minutes. Choose from 3,000+ illustrations across 104 collections to match any seasonal trend or interest niche. Every maze exports as a 300 DPI print-ready PDF with full commercial license for Etsy, Amazon KDP, or any marketplace. Maze activity books are a proven KDP category with consistent demand, and the picture path format adds visual appeal that standard line mazes lack. Free to try with all features — no signup, no credit card. Downloads include a watermark; purchase a license to remove it.',
  },

  howItWorks: {
    title: 'How to Create Picture Path Mazes Step by Step',
    steps: [
      {
        title: 'Set Your Page Layout',
        description:
          'Open the Page Setup panel and choose a page size: Letter Portrait, Letter Landscape, A4 Portrait, A4 Landscape, Square (1200×1200), or any custom dimension. Pick a page color using the color picker. Select a background theme and adjust its opacity, then choose a border theme with its own independent opacity control. These layout choices frame your maze worksheet before you configure any game mode.',
      },
      {
        title: 'Choose Your Game Mode and Configure Settings',
        description:
          'Open the Pathway Configuration panel and select one of three game modes. Picture Pathway creates a grid of images with a single correct path from start to finish. Classic Maze generates wall-based mazes with the LPF algorithm — set grid size (15×15 to 20×20), number of paths (1, 2, or 3), collectible image count and copies, wall color, thickness (1–10px), and opacity (10–100%). Choose the Right Path creates three-path mazes with four directional options. Toggle \"Include Name/Date Fields\" to add name and date lines.',
      },
      {
        title: 'Select Images by Role from the Library',
        description:
          'Open the Image Library panel and assign images to five distinct roles using the role selector: Start Image (entry point marker), End Image (destination — 1 for Pathway/Maze, 3 for Choose Path), Path Images (correct route or collectibles), Distractor Images (wrong cells or non-path filler), and Decoration (free canvas placement). Browse 104 themed collections with 3,100+ illustrations, filter by theme or search by keyword. Upload custom PNG, JPG, or GIF images to use alongside library content.',
      },
      {
        title: 'Generate the Maze or Pathway Worksheet',
        description:
          'Click Generate to create the maze layout for your selected game mode. Picture Pathway arranges images in a grid with one correct path marked by path images among distractors. Classic Maze builds wall-based corridors with collectible images placed along paths. Choose the Right Path constructs three distinct routes with one correct path and decoy alternatives. The auto-generated \"Picture Pathway\" header appears at the top with an orange outer border, localized title, and instructions in the selected language.',
      },
      {
        title: 'Generate the Answer Key and Download',
        description:
          'Switch to the Answer Key tab to see the auto-generated solution. The answer key highlights the correct path with pink circles along the route. Choose Path mode adds a \"✓ CORRECT PATH\" label on the correct path. Classic Maze includes a collectible legend showing image counts. Download using four dedicated buttons: Worksheet JPEG, Answer Key JPEG, Worksheet PDF, and Answer Key PDF at 300 DPI. Toggle grayscale for ink-friendly versions. Every export is production-ready for Etsy listings, Amazon KDP interiors, and Gumroad product files.',
      },
    ],
  },

  keyFeatures: {
    title: 'Why Picture Path Mazes Sell on Etsy & Amazon KDP',
    features: [
      {
        title: 'Three Game Modes: Picture Pathway, Classic Maze, and Choose the Right Path',
        description:
          'One generator produces three distinct maze activity types. Picture Pathway creates a grid of images where solvers follow the correct path from start to finish by identifying path images among distractors — ideal for beginner-level products and visual discrimination tasks. Classic Maze generates professional wall-based mazes using the LPF algorithm with collectible images scattered along corridors for added engagement. Choose the Right Path presents three-path mazes where solvers identify the single correct route among decoys, with four directional options: bottom-to-top, top-to-bottom, left-to-right, and right-to-left. Each mode delivers a different cognitive challenge from the same image library, giving you three product lines from one tool.',
      },
      {
        title: 'Professional LPF Maze Algorithm with Quality Scoring and Dead-End Blocking',
        description:
          'The Longest Path First (LPF) algorithm generates high-quality wall-based mazes with a corridor-cell system and dynamic wall placement. Path quality scoring evaluates turns, length, and blockages to ensure challenging but solvable mazes every time. Multi-path support creates 1, 2, or 3 paths with automatic dead-end blocking on incorrect routes. Configure path length minimums and maximums (4–30 cells, defaults 8–12) for precise difficulty control. Grid sizes range from 15×15 to 20×20, and wall-aware start/end positioning ensures clean entry and exit points. This algorithmic approach produces mazes that rival hand-designed quality.',
      },
      {
        title: 'Five Image Roles: Start, End, Path, Distractor, and Decoration',
        description:
          'Every image placed on the worksheet serves a specific role in the maze design. The Start Image marks the entry point. End Images mark the destination — one for Pathway and Classic Maze modes, three for Choose the Right Path. Path Images define the correct route in Pathway mode or appear as collectibles in Classic Maze. Distractor Images fill non-path cells to create visual challenge. Decoration images can be placed freely on the canvas for extra visual appeal. The role selector in the Image Library panel lets you assign and reassign roles quickly, with dedicated panels showing selected images for each role.',
      },
      {
        title: 'Customizable Wall Design with Color, Thickness, and Opacity Controls',
        description:
          'Classic Maze and Choose the Right Path modes offer full wall customization. Pick any wall color using the color picker. Adjust wall thickness from 1 to 10 pixels (default 3px) for thin elegant lines or bold kid-friendly walls. Set wall opacity from 10% to 100% (default 100%) for subtle or prominent maze boundaries. These controls let you create distinct visual styles — thin gray walls for sophisticated puzzle books, thick colorful walls for the younger audience, or semi-transparent walls for layered design effects. Wall settings persist across maze regenerations until you change them.',
      },
      {
        title: 'Auto-Generated Answer Key with Solution Path Highlighting',
        description:
          'Every maze worksheet automatically generates a companion answer key on a separate canvas tab. The answer key reproduces the exact maze layout and highlights the correct solution path with pink circles placed along the route. Choose the Right Path mode adds a \"✓ CORRECT PATH\" label identifying the correct route among the three options. Classic Maze mode includes a collectible legend showing the count of each collectible image found along the path. Start and end arrows appear in the appropriate cells. Download the answer key separately as answer_key.jpeg or answer_key.pdf alongside the puzzle worksheet.',
      },
      {
        title: 'Image Library with 104 Themed Collections and 3,100+ Illustrations',
        description:
          'Browse 104 themed image collections covering animals, food, vehicles, nature, professions, holidays, sports, seasons, and dozens more. Each theme provides coordinated illustrations that work together in maze activities — animal mazes where solvers follow cats through a grid of animal distractors, holiday mazes with seasonal collectibles, and more. Filter by theme using the dropdown or search for specific images by keyword. The Commercial tier includes 10 colorful themes for getting started; Full Access unlocks all 104 themes for maximum creative variety across all three game modes.',
      },
      {
        title: 'Print-Ready PDF and JPEG Export at 300 DPI with Grayscale Toggle',
        description:
          'Download maze worksheets and answer keys as high-resolution JPEG images or print-ready PDF documents rendered at 300 DPI with a 6× multiplier for crisp detail. Four dedicated download buttons export the worksheet and answer key separately as JPEG and PDF. Page sizes include Letter Portrait, Letter Landscape, A4 Portrait, A4 Landscape, Square (1200×1200), and fully custom dimensions. Toggle grayscale for ink-friendly versions that save toner while preserving maze wall clarity. Every export is production-ready for digital downloads, printed workbooks, and printed handouts.',
      },
      {
        title: 'Full Canvas Editing with Text Tools, Name/Date Fields, and Undo History',
        description:
          'The Fabric.js canvas provides complete control over every element on your maze worksheet. Drag, resize, rotate, and reposition images, text, and generated maze content freely. Add custom text with seven font options (Lexend Deca, Baloo 2, Nunito, Quicksand, Fredoka, Arial, Verdana), adjustable size and color, and text outline width from 0 to 10 with 0.5-step granularity. Toggle name and date fields to add identification lines. Zoom in and out or reset to 100% for detail work. Undo and redo up to 20 history states with Ctrl+Z and Ctrl+Y. Layer controls manage stacking order for precise element arrangement.',
      },
    ],
  },

  businessUseCases: {
    title: 'Sell Maze Activity Books on Etsy & Amazon KDP',
    cases: [
      {
        title: 'Themed Maze Activity Bundles on Etsy',
        description:
          'Create themed maze packs using the 104 image collections — animal mazes, holiday mazes, farm mazes, ocean mazes, and dozens more. Each theme provides enough illustrations for multiple unique maze worksheets across all three game modes. Package 10–20 maze worksheets per theme with answer keys included, mixing Picture Pathway, Classic Maze, and Choose the Right Path for variety within every bundle. Vary difficulty by adjusting grid sizes and path counts. Sell at $3–$7 per bundle. The auto-generated answer key eliminates the biggest time sink in maze worksheet production.',
        platform: 'Etsy (etsy.com)',
      },
      {
        title: 'Maze Activity Workbooks on Amazon KDP',
        description:
          'Compile 40–80 maze worksheets into a printed workbook formatted for Amazon KDP. Structure your book by progressive difficulty: start with Picture Pathway mazes for beginners, advance to Classic Maze with 15×15 grids and 1 path, then increase to 20×20 grids with 3 paths for advanced solvers. Include answer keys at the back of the book. The grayscale toggle produces ink-friendly pages ready for black-and-white book interiors. Maze books are a proven KDP category — the visual-only format means every book works for buyers worldwide without translation.',
        platform: 'Amazon KDP (kdp.amazon.com)',
      },
      {
        title: 'Maze Activity Packs on Gumroad',
        description:
          'Build ready-to-use maze worksheets with name/date fields and printed answer keys for instant digital delivery. Buyers searching for logic activities value worksheets that develop spatial reasoning and problem-solving skills. Create themed sets: animal habitat pathway activities, seasonal maze collections, and progressive difficulty maze packs. Classic Maze mode with collectible images adds counting practice alongside pathfinding. Each set includes puzzle worksheets and answer keys in both PDF and JPEG formats for flexible use.',
        platform: 'Gumroad (gumroad.com)',
      },
      {
        title: 'Seasonal and Holiday Maze Collections',
        description:
          'The 104 themed image collections cover every seasonal and holiday occasion — Christmas, Halloween, Easter, Valentine\'s Day, back-to-school, summer vacation, and more. Create time-limited maze collections that align with peak shopping periods. Release Halloween maze bundles in September, Christmas collections in October, and Valentine\'s Day packs in January. Include all three game modes in each seasonal set for maximum value. Seasonal products command higher prices during peak windows and create natural reasons for repeat purchases from returning customers.',
        platform: 'Etsy / Amazon KDP / Gumroad (seasonal)',
      },
      {
        title: 'Global Market Appeal with Visual-Only Maze Design',
        description:
          'Maze worksheets are entirely visual — solvers navigate paths, follow images, and solve spatial puzzles without reading any text. This makes every maze worksheet instantly sellable in any market worldwide without translation or localization. List the same maze bundle on international Etsy shops, publish maze workbooks targeting non-English Amazon marketplaces, and reach global Gumroad buyers. The auto-generated header translates into 11 languages automatically, but the maze content itself is universally understood. One product, unlimited markets.',
        platform: 'All platforms (global)',
      },
    ],
  },

  faq: [
    {
      question: 'What are the three game modes and how do they differ?',
      answer:
        'The generator offers three distinct modes. Picture Pathway creates a grid of images where solvers follow the correct path from start to finish by identifying path images among distractors. Classic Maze generates wall-based mazes using the LPF algorithm with collectible images, configurable grid sizes (15×15 to 20×20), and 1 to 3 paths with dead-end blocking. Choose the Right Path presents three-path mazes with four directional options where solvers identify the single correct route. Each mode produces a different spatial reasoning challenge from the same image library.',
    },
    {
      question: 'How does the LPF maze algorithm work?',
      answer:
        'The Longest Path First (LPF) algorithm is a professional wall-based maze generation system. It uses a corridor-cell structure with dynamic wall placement to create challenging but solvable mazes. Path quality scoring evaluates turns, length, and blockages. Multi-path support generates 1, 2, or 3 paths with automatic dead-end blocking on incorrect routes. You can configure path length minimums and maximums (4–30 cells, defaults 8–12), grid sizes from 15×15 to 20×20, and wall-aware start/end positioning ensures clean entry and exit points.',
    },
    {
      question: 'What are the five image roles and how do I assign them?',
      answer:
        'Every image serves a specific role in the maze design. Start Image marks the entry point. End Image marks the destination (1 for Pathway and Classic Maze, 3 for Choose the Right Path). Path Images define the correct route or appear as collectibles. Distractor Images fill non-path cells. Decoration images are placed freely on the canvas. Use the role selector at the top of the Image Library panel to choose a role, then click images to assign them. Dedicated panels below show selected images for each role.',
    },
    {
      question: 'How does wall customization work in Classic Maze and Choose Path modes?',
      answer:
        'Both maze modes offer three wall controls. Wall Color uses a color picker to set any color. Wall Thickness adjusts from 1 to 10 pixels (default 3px). Wall Opacity ranges from 10% to 100% (default 100%). These settings let you create thin gray walls for sophisticated puzzle books, thick colorful walls for the younger audience, or semi-transparent walls for layered effects. Settings persist across maze regenerations.',
    },
    {
      question: 'What are the directional options in Choose the Right Path mode?',
      answer:
        'Choose the Right Path offers four directional options that determine maze flow: Bottom to Top (default), Top to Bottom, Left to Right, and Right to Left. The direction controls where the start and end positions appear and how paths flow through the grid. Grid sizes range from 15×15 to 20×20. The mode requires 3 End Images (auto-selected from the theme) and generates 1 correct path plus decoy alternatives.',
    },
    {
      question: 'How does the collectible system work in Classic Maze mode?',
      answer:
        'Classic Maze scatters collectible images throughout the maze corridors. Configure the number of collectible image types (1, 2, 3, or 4 — default 4), minimum copies per image (1, 2, or 3 — default 1), and maximum copies per image (1–10 — default 10). The answer key includes a collectible legend showing each image and its count along the solution path. Collectibles add counting and observation practice alongside the maze-solving activity.',
    },
    {
      question: 'How does the auto-generated answer key work?',
      answer:
        'The generator uses a dual-canvas system with a Worksheet tab and an Answer Key tab. The answer key reproduces the exact maze layout and highlights the correct solution path with pink circles placed along the route. Choose the Right Path mode adds a \"✓ CORRECT PATH\" label on the correct route. Classic Maze includes a collectible legend. Download both versions separately using four dedicated buttons: Worksheet JPEG, Answer Key JPEG, Worksheet PDF, and Answer Key PDF.',
    },
    {
      question: 'How does the auto-generated header work?',
      answer:
        'Every worksheet includes a styled header with an orange outer border (8px stroke) and 34px margins. The title \"Picture Pathway\" and description \"Follow the path from start to finish!\" are automatically translated into all 11 supported languages. Portrait worksheets display a 240px header; landscape worksheets use a compact 165px layout. The header renders in localized text for English, German (Bilderpfad), French (Chemin d\'Images), Spanish (Camino de Imágenes), and all other supported languages.',
    },
    {
      question: 'Is there a free trial?',
      answer:
        'Yes. You can access every feature — all three game modes, the LPF maze algorithm, five image roles, wall customization, the auto-generated answer key, the full image library, background and border themes, name/date fields, and all download formats — without creating an account, entering a credit card, or installing any software. Free trial downloads include a small watermark. A commercial license removes the watermark and grants full selling rights.',
    },
    {
      question: 'Are Picture Path worksheets language-sensitive?',
      answer:
        'No. Unlike word-based generators, Picture Path worksheets are entirely visual. Solvers navigate mazes and follow image paths without reading any text. The auto-generated header translates into 11 languages, but the maze content itself requires no language comprehension. This makes every worksheet instantly usable and sellable in any market worldwide without modification.',
    },
    {
      question: 'Can I sell maze worksheets made with this tool on Etsy and Amazon KDP?',
      answer:
        'Yes. With a commercial license, you have full rights to sell your maze worksheets as digital downloads on Etsy, as printed workbooks on Amazon KDP, as digital products on Gumroad, or through any other sales channel. The three game modes, LPF algorithm, 104 themed image collections, and visual-only format give you the tools to produce original, globally sellable maze products.',
    },
    {
      question: 'What is the refund policy?',
      answer:
        'Because the free trial gives you access to every feature, we do not offer refunds on commercial license purchases. You can test all three game modes, the LPF maze algorithm, five image roles, wall customization, the auto-generated answer key, the full image library, background and border themes, name/date fields, and all download formats before buying. The free trial is the refund policy — make sure the tool fits your needs before purchasing a license.',
    },
  ],

  internalLinks: [
    {
      pageType: 'app',
      slug: 'treasure-hunt-worksheets',
      anchorText: 'Treasure hunt worksheets for adventure-themed bundles',
    },
    {
      pageType: 'app',
      slug: 'find-objects-worksheets',
      anchorText: 'I Spy worksheets for complementary search activities',
    },
    {
      pageType: 'guide',
      slug: 'create-maze-worksheets',
      anchorText: 'Guide to creating maze worksheets that sell',
    },
  ],

  visuals: {
    heroImages: {
      primary: '/samples/english/picture path/Picture Pathway.webp',
      primaryAlt: 'Picture pathway maze worksheet with themed images in a grid featuring orange header border and auto-generated Picture Pathway header',
    },
    sampleGallery: [
      {
        src: '/samples/english/picture path/Picture Pathway (1).webp',
        alt: 'Picture Pathway mode worksheet with images arranged in a grid showing the correct path from start to finish',
        caption: 'Picture Pathway mode — follow the correct image path from start to finish',
      },
      {
        src: '/samples/english/picture path/Picture Pathway (5).webp',
        alt: 'Classic Maze mode worksheet with wall-based corridors and collectible images scattered throughout',
        caption: 'Classic Maze mode — LPF algorithm generates wall-based mazes with collectibles',
      },
      {
        src: '/samples/english/picture path/Picture Pathway answer_key.webp',
        alt: 'Picture path maze answer key with solution path highlighted by pink circles along the correct route',
        caption: 'Auto-generated answer key — solution path highlighted with pink circles',
      },
    ],
    youtubeId: 'Sl1o0uPBDCg',
    videoTitle: 'How to Create Maze Worksheets with 3 Game Modes and LPF Algorithm — Step-by-Step Tutorial',
  },
};

export default content;
