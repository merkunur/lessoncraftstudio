import type { AppContent } from '../types';

const content: AppContent = {
  seo: {
    primaryKeyword: 'create missing pieces puzzles to sell',
    secondaryKeywords: [
      'printable jigsaw puzzle maker for Etsy sellers',
      'missing piece worksheet generator for KDP publishers',
      'visual puzzle creator commercial license TPT',
      'sell missing pieces worksheets on Teachers Pay Teachers',
    ],
    lsiKeywords: [
      'digital puzzle printables passive income',
      'commercial use visual puzzle generator',
      'printable jigsaw activity business tools',
    ],
    titleTag: 'Missing Pieces Puzzle Generator | Create & Sell Visual Puzzles',
    metaDescription:
      'Create professional missing pieces puzzles to sell on Etsy, Amazon KDP, and TPT. 6 piece shapes, configurable difficulty, auto answer key, 104 themes. Free to try \u2014 commercial license available.',
  },

  hero: {
    title: 'Missing Pieces Puzzle Generator for Jigsaw-Style Visual Puzzles',
    tagline: 'Generate jigsaw-style puzzles where pieces are cut from images and students identify the correct numbered option \u2014 with 6 piece shapes, 1\u20135 missing pieces, 2\u20136 solution options including distractors, auto-generated answer keys, and visual-only design that works in every language.',
    description:
      'Build professional missing piece puzzles where an image has holes cut out and students identify which numbered option fills each gap. The smart piece extraction algorithm finds visually distinct areas with sufficient color variance, ensuring every puzzle is solvable and engaging. Choose from 6 piece shapes \u2014 square, circle, rectangle portrait, rectangle landscape, ellipse portrait, and ellipse landscape \u2014 and configure difficulty with 1\u20135 missing pieces and 2\u20136 solution options that include distractor pieces to challenge visual discrimination skills. Every puzzle includes an auto-generated answer key with yellow-highlighted number labels placed inside each hole showing the correct option. The auto-generated header renders \u201cMissing Pieces\u201d in turquoise (#06B6D4) with a rose pink description (#DB2777) across a dual border system \u2014 teal outer (#14B8A6, 8px) and hot pink inner (#EC4899, 3px) \u2014 localized in all 11 supported languages. Missing Pieces is NOT language-sensitive: puzzles are purely visual with no locale-dependent content, so every puzzle works identically worldwide. Full Access unlocks all 104 themes with 3,100+ illustrations and all 11 UI languages. Add background themes and border themes with independent opacity controls, and export print-ready PDFs and JPEGs at 300 DPI in Letter, A4, Square, or custom sizes. Whether you sell visual puzzle bundles on Etsy, compile puzzle workbooks for Amazon KDP, or create critical thinking activities for TPT, this generator delivers production-ready puzzles in minutes \u2014 free to try with all features — no signup, no credit card. Downloads include a watermark; purchase a license to remove it.',
  },

  howItWorks: {
    title: 'How to Create Missing Pieces Puzzles in 5 Steps',
    steps: [
      {
        title: 'Set Your Page Layout',
        description:
          'Open the Page Setup panel and choose a page size: Letter Portrait, Letter Landscape, A4 Portrait, A4 Landscape, Square (1200\u00d71200), or any custom dimension. Pick a page color using the color picker as a fallback background. Select a background theme and adjust its opacity (0\u20131 in 0.05 steps), then choose a border theme with its own independent opacity control. These layout choices frame your missing pieces puzzle before you configure any content.',
      },
      {
        title: 'Configure the Puzzle',
        description:
          'Open the Puzzle Configuration panel and set the number of missing pieces from 1 to 5 \u2014 this controls how many holes are cut from the image. Set the number of solution options from 2 to 6, which includes the correct pieces plus distractor pieces that increase difficulty. Select a piece shape from 6 options: square (default), circle, rectangle portrait, rectangle landscape, ellipse portrait, or ellipse landscape. Each shape creates a different visual challenge.',
      },
      {
        title: 'Select an Image from the Library or Upload Your Own',
        description:
          'Open the Image Library panel and browse 104 themed collections with 3,100+ colorful illustrations \u2014 animals, food, vehicles, nature, holidays, and dozens more. Filter by theme using the dropdown or search by keyword with 300ms debounce. Click an image to select it as the source for your puzzle. You can also upload custom PNG, JPG, or GIF images using the Upload Custom Images panel for complete creative freedom with your puzzle designs.',
      },
      {
        title: 'Generate the Puzzle',
        description:
          'The app automatically cuts holes from the selected image using smart piece extraction. The algorithm tries up to 150 placement attempts to find pieces with sufficient color variance (minimum brightness variance of 15) and at least 250 pixels of distance between pieces to prevent overlap. White holes with black stroke (2px) appear at the original locations. Numbered solution options \u2014 correct pieces plus distractors \u2014 are displayed with yellow-highlighted number labels. Portrait layouts place the puzzle image on top with options below; landscape layouts split the view 50/50.',
      },
      {
        title: 'Generate the Answer Key and Download',
        description:
          'Switch to the Answer Key tab to see the auto-generated answer key. The same puzzle image appears with holes, and yellow-highlighted number labels (rgba(255,255,0,0.7)) inside each hole show the correct option index. Download both versions using four dedicated buttons: Worksheet JPEG, Answer Key JPEG, Worksheet PDF, and Answer Key PDF \u2014 all rendered at 300 DPI with JPEG quality 1.0. Toggle grayscale for ink-friendly versions. Every export is production-ready for Etsy listings, Amazon KDP interiors, and TPT product files.',
      },
    ],
  },

  keyFeatures: {
    title: 'Key Features of the Missing Pieces Puzzle Generator',
    features: [
      {
        title: 'Jigsaw-Style Missing Piece Puzzles with Configurable Difficulty',
        description:
          'Create puzzles where an image has holes cut out and students identify which numbered option fills each gap. Configure difficulty with two independent controls: set 1\u20135 missing pieces to control puzzle complexity, and set 2\u20136 solution options to control how many choices students evaluate. More missing pieces means more spatial reasoning; more solution options (including distractors) means sharper visual discrimination. This two-axis difficulty system lets you create puzzles ranging from simple single-piece identification to complex multi-piece challenges.',
      },
      {
        title: 'Six Piece Shapes: Square, Circle, Rectangle, and Ellipse Variants',
        description:
          'Choose from 6 distinct piece shapes that change the visual character of every puzzle. Square (default) and circle shapes offer clean geometric cuts. Rectangle portrait and rectangle landscape shapes create elongated holes with different orientations \u2014 portrait uses 80% width and 100% height, landscape uses 100% width and 80% height. Ellipse portrait and ellipse landscape offer softer curved cuts with the same dimensional ratios. Each shape interacts differently with the source image, creating unique identification challenges even when using the same underlying illustration.',
      },
      {
        title: 'Smart Piece Extraction with Color Variance Detection',
        description:
          'The piece extraction algorithm ensures every puzzle is visually solvable and engaging. It tries up to 150 placement attempts to find pieces with a minimum brightness variance threshold of 15 \u2014 guaranteeing that each extracted piece contains enough visual detail to be identifiable. Pieces maintain at least 250 pixels of distance from each other to prevent overlap. Distractor pieces are generated with up to 200 attempts each, ensuring they come from non-overlapping areas of the image. This smart extraction produces consistently high-quality puzzles from any source image.',
      },
      {
        title: 'Auto-Generated Answer Key with Yellow-Highlighted Number Labels',
        description:
          'Every missing pieces puzzle automatically generates a companion answer key on a separate canvas tab. The answer key displays the same puzzle image with holes, and places yellow-highlighted number labels (rgba(255,255,0,0.7)) inside each hole showing the correct 1-based option index. The font size scales to 60% of the piece size for clear readability. No manual answer creation needed \u2014 the answer key stays perfectly synchronized with the puzzle. Download the answer key as answer_key.jpeg or answer_key.pdf alongside the student worksheet.',
      },
      {
        title: 'Numbered Solution Options with Distractor Pieces',
        description:
          'Solution options are displayed in numbered containers (1\u2013N) with yellow-highlighted number labels for clear identification. When solution options exceed the number of missing pieces, the extra options are distractor pieces \u2014 extracted from different areas of the same image that don\u2019t match any hole. Distractors force students to carefully compare visual details rather than simply matching by elimination. Portrait worksheets arrange options in a single horizontal row below the puzzle (75% of max size); landscape worksheets place them on the right side (50% width) in a horizontal row.',
      },
      {
        title: 'Image Library with 104 Themed Collections and 3,100+ Illustrations',
        description:
          'Browse 104 themed image collections covering animals, food, vehicles, nature, professions, holidays, sports, seasons, and dozens more. Each theme provides colorful illustrations that work as puzzle sources \u2014 images with varied colors and distinct regions produce the most engaging missing piece puzzles. Filter by theme using the dropdown or search for specific images by keyword. The Commercial tier includes 10 colorful themes for getting started; Full Access unlocks all 104 themes for maximum creative variety across all puzzle designs.',
      },
      {
        title: 'Print-Ready PDF and JPEG Export at 300 DPI with Grayscale Toggle',
        description:
          'Download missing pieces puzzles and answer keys as high-resolution JPEG images or print-ready PDF documents rendered at 300 DPI (6\u00d7 multiplier) with JPEG quality 1.0. Four dedicated download buttons export worksheet and answer key files separately. Page sizes include Letter Portrait, Letter Landscape, A4 Portrait, A4 Landscape, Square (1200\u00d71200), and fully custom dimensions. Toggle grayscale for ink-friendly versions that save toner. Every export is production-ready for digital downloads, printed workbooks, and classroom handouts.',
      },
      {
        title: 'Full Canvas Editing with Text Tools, Alignment, and Layering Controls',
        description:
          'The Fabric.js canvas provides complete control over every element on your puzzle worksheet. Drag, resize, rotate, and reposition images, text, and generated content freely. Layer controls manage stacking order \u2014 bring elements forward or send them back. Lock finished elements while you edit others. Add custom text with seven font options (Lexend Deca, Baloo 2, Nunito, Quicksand, Fredoka, Arial, Verdana), adjustable size and color, and text outline width from 0 to 10 with 0.5-step granularity. Six alignment options plus center-on-page keep layouts precise. Zoom from 25% to 300% in 25% increments for detail work. Undo and redo up to 50 history states with Ctrl+Z and Ctrl+Y.',
      },
    ],
  },

  businessUseCases: {
    title: 'How to Sell Missing Pieces Puzzles Online',
    cases: [
      {
        title: 'Themed Missing Piece Puzzle Bundles on Etsy',
        description:
          'Create themed puzzle packs using the 104 image collections \u2014 animal puzzles, vehicle puzzles, food puzzles, nature puzzles, and dozens more. Each theme provides colorful illustrations that produce engaging missing piece challenges. Package 15\u201325 puzzles per theme with answer keys included, varying difficulty from 1 missing piece with 2 options (easy) to 5 missing pieces with 6 options (hard). Mix piece shapes within a bundle for visual variety: square pieces in some puzzles, circle pieces in others, ellipse variants for advanced challenges. The auto-generated answer key eliminates the biggest time sink in puzzle production.',
        platform: 'Etsy (etsy.com)',
      },
      {
        title: 'Visual Puzzle Workbooks on Amazon KDP',
        description:
          'Compile 50\u2013100 missing piece puzzles into a printed workbook formatted for Amazon KDP. Structure your book with progressive difficulty: Chapter 1 uses 1 missing piece with 2 options for beginners, Chapter 2 uses 3 missing pieces with 4 options for intermediate, and Chapter 3 uses 5 missing pieces with 6 options including distractors for advanced solvers. Include answer keys at the back of the book using the auto-generated answer key feature. The grayscale toggle produces ink-friendly pages ready for black-and-white book interiors. Visual-only puzzles require no translation, making a single book sellable in every market.',
        platform: 'Amazon KDP (kdp.amazon.com)',
      },
      {
        title: 'Classroom Puzzle Activities for TPT',
        description:
          'Build ready-to-use visual discrimination and critical thinking activities for Teachers Pay Teachers. Missing piece puzzles strengthen spatial reasoning, visual analysis, and attention to detail \u2014 skills valued across early childhood and elementary curricula. Create curriculum-aligned sets: animal habitat puzzles, seasonal scene puzzles, community helper puzzles, and food group puzzles. Each set includes student worksheets and answer keys in both PDF and JPEG formats. The configurable difficulty lets you create differentiated versions of the same puzzle for mixed-ability classrooms.',
        platform: 'Teachers Pay Teachers (teacherspayteachers.com)',
      },
      {
        title: 'Seasonal and Holiday Puzzle Collections',
        description:
          'The 104 themed image collections cover every seasonal and holiday occasion \u2014 Christmas, Halloween, Easter, Valentine\u2019s Day, back-to-school, summer vacation, and more. Create time-limited puzzle collections that align with peak shopping periods. Release Halloween puzzle bundles in September, Christmas collections in October, and Valentine\u2019s Day packs in January. Vary piece shapes and difficulty levels within each seasonal set for maximum value. Seasonal products command higher prices during their peak windows and create natural reasons for repeat purchases from your customer base.',
        platform: 'Etsy / Amazon KDP / TPT (seasonal)',
      },
      {
        title: 'Global Market Appeal \u2014 Visual-Only Puzzles Need No Translation',
        description:
          'Missing Pieces puzzles are purely visual with no text content on the worksheet itself \u2014 no words, no letters, no locale-dependent elements. A puzzle created in English works identically for customers in Germany, France, Japan, or Brazil. This makes your puzzle products instantly sellable in every international marketplace without creating separate language versions. List the same puzzle bundle on Etsy with multilingual titles and descriptions to capture global search traffic. One product, every market \u2014 maximum reach with zero additional production work.',
        platform: 'Global marketplaces (all platforms)',
      },
    ],
  },

  faq: [
    {
      question: 'How does the missing piece puzzle mechanic work?',
      answer:
        'The generator takes an image from the library (or your upload) and cuts out 1\u20135 pieces, leaving white holes with black stroke outlines at the original locations. It then displays 2\u20136 numbered solution options below or beside the puzzle \u2014 the correct pieces plus distractor pieces extracted from other areas of the same image. Students examine the holes and the numbered options, then identify which option fills each gap based on color, pattern, and visual detail.',
    },
    {
      question: 'What are the 6 piece shapes available?',
      answer:
        'You can choose from square (default), circle, rectangle portrait (80% width, 100% height), rectangle landscape (100% width, 80% height), ellipse portrait (80% rx, 100% ry), and ellipse landscape (100% rx, 80% ry). Each shape creates a different visual challenge. Square and circle offer clean geometric cuts, while rectangle and ellipse variants create elongated or curved shapes that interact differently with the source image.',
    },
    {
      question: 'How do the difficulty settings work?',
      answer:
        'Difficulty is controlled by two independent settings. Missing pieces count (1\u20135) determines how many holes are cut from the image \u2014 more pieces means more spatial reasoning. Solution options count (2\u20136) determines how many numbered choices students evaluate \u2014 when options exceed missing pieces, the extras are distractors that require careful visual comparison. A puzzle with 1 missing piece and 2 options is easy; 5 missing pieces with 6 options is challenging.',
    },
    {
      question: 'What are distractor pieces and how are they generated?',
      answer:
        'Distractor pieces are extra solution options that don\u2019t match any hole in the puzzle. They\u2019re extracted from different areas of the same source image using up to 200 placement attempts each, ensuring they don\u2019t overlap with correct pieces. Distractors prevent students from solving by elimination alone \u2014 they must carefully compare colors, patterns, and visual details to distinguish correct options from similar-looking alternatives.',
    },
    {
      question: 'How does the smart piece extraction algorithm work?',
      answer:
        'The algorithm uses up to 150 attempts to find pieces with sufficient visual detail. Each candidate piece is analyzed for brightness variance (minimum threshold of 15) to ensure it contains enough color information to be identifiable. Pieces maintain at least 250 pixels of distance from each other to prevent overlap. Piece size is calculated as 12% of the image width with a minimum of 50 pixels. This automated process ensures every puzzle is visually solvable regardless of the source image.',
    },
    {
      question: 'How does the auto-generated answer key work?',
      answer:
        'The generator uses a dual-canvas system with a Worksheet tab and an Answer Key tab. The answer key displays the same puzzle image with holes but omits the solution options. Instead, yellow-highlighted number labels (rgba(255,255,0,0.7)) are placed inside each hole showing the correct 1-based option index. The font size scales to 60% of the piece size for clear readability. Download the answer key separately using the dedicated Answer Key JPEG and Answer Key PDF buttons.',
    },
    {
      question: 'Are missing pieces puzzles language-sensitive?',
      answer:
        'No. Missing Pieces is a purely visual puzzle format with no text content on the worksheet itself \u2014 no words, no letters, no locale-dependent elements. The only language-dependent element is the auto-generated header text (\u201cMissing Pieces\u201d / \u201cFind and place the missing pieces!\u201d), which is localized in all 11 supported languages. The puzzle itself works identically in every language, making it ideal for global markets.',
    },
    {
      question: 'How does the dual border system work?',
      answer:
        'Every generated puzzle features two decorative borders. The outer border uses bright teal (#14B8A6) with an 8px stroke, 34px margins, and 12px border radius. The inner border uses hot pink (#EC4899) with a 3px stroke, 46.5px margins, 8px border radius, and a slight offset of 2px right and 3px down. Together they create a polished, professional frame that increases the visual quality of your puzzle worksheets for marketplace listings.',
    },
    {
      question: 'Is there a free trial?',
      answer:
        'Yes. You can access every feature \u2014 all 6 piece shapes, configurable missing pieces and solution options, the auto-generated answer key, the full image library, background and border themes, and all download formats \u2014 without creating an account, entering a credit card, or installing any software. Free trial downloads include a small watermark. A commercial license removes the watermark and grants full selling rights.',
    },
    {
      question: 'Can I add background themes and border themes to puzzles?',
      answer:
        'Yes. The Page Setup panel includes both a background theme selector with an opacity slider (0\u20131 in 0.05 steps) and a border theme selector with its own independent opacity slider. Background themes add decorative patterns behind the puzzle content, while border themes frame the page. Both have separate opacity controls so you can create subtle backgrounds with prominent borders, or any combination that fits your design.',
    },
    {
      question: 'Can I sell missing pieces puzzles made with this tool on Etsy and Amazon KDP?',
      answer:
        'Yes. With a commercial license, you have full rights to sell your missing pieces puzzles as digital downloads on Etsy, as printed workbooks on Amazon KDP, as classroom resources on TPT, or through any other sales channel. The 6 piece shapes, configurable difficulty, auto-generated answer keys, and 104 themed image collections give you the creative tools to produce original, sellable puzzle products.',
    },
    {
      question: 'What is the refund policy?',
      answer:
        'Because the free trial gives you access to every feature, we do not offer refunds on commercial license purchases. You can test all 6 piece shapes, configurable difficulty settings, the auto-generated answer key, the full image library, background and border themes, and all download formats before buying. The free trial is the refund policy \u2014 make sure the tool fits your needs before purchasing a license.',
    },
  ],

  internalLinks: [
    {
      pageType: 'app',
      slug: 'odd-one-out-worksheets',
      anchorText: 'Odd One Out Worksheet Generator',
    },
    {
      pageType: 'app',
      slug: 'sudoku-worksheets',
      anchorText: 'Sudoku Worksheet Generator',
    },
    {
      pageType: 'app',
      slug: 'picture-path-worksheets',
      anchorText: 'Picture Path Worksheet Generator',
    },
    {
      pageType: 'app',
      slug: 'find-and-count-worksheets',
      anchorText: 'Find and Count Worksheet Generator',
    },
    {
      pageType: 'app',
      slug: 'shadow-match-worksheets',
      anchorText: 'Shadow Match Worksheet Generator',
    },
    {
      pageType: 'app',
      slug: 'word-search-worksheets',
      anchorText: 'Word Search Worksheet Generator',
    },
    {
      pageType: 'bundle',
      slug: 'puzzles-logic-bundle',
      anchorText: 'Puzzles & Logic Bundle \u2014 All Puzzle Apps in One Package',
    },
    {
      pageType: 'tool',
      slug: 'missing-pieces-maker',
      anchorText: 'Missing Pieces Puzzle Maker',
    },
    {
      pageType: 'start',
      slug: 'complete-guide-printable-business',
      anchorText: 'The Complete Guide to Starting a Printable Business',
    },
    {
      pageType: 'guide',
      slug: 'create-puzzle-worksheets',
      anchorText: 'How to Create and Sell Puzzle Worksheets Online',
    },
  ],

  visuals: {
    heroImages: {
      primary: '/samples/english/missing pieces/Missing Pieces.webp',
      primaryAlt: 'Missing pieces puzzle worksheet with holes cut from an image and numbered solution options including distractors',
    },
    sampleGallery: [
      {
        src: '/samples/english/missing pieces/Missing Pieces (1).webp',
        alt: 'Missing pieces puzzle with square-shaped holes cut from a colorful illustration',
        caption: 'Square piece shape \u2014 clean geometric cuts for clear visual identification',
      },
      {
        src: '/samples/english/missing pieces/Missing Pieces (5).webp',
        alt: 'Missing pieces puzzle with circular holes and numbered solution options',
        caption: 'Circle piece shape \u2014 rounded cuts with distractor options for added challenge',
      },
      {
        src: '/samples/english/missing pieces/Missing Pieces answer_key.webp',
        alt: 'Missing pieces puzzle answer key with yellow-highlighted numbers inside each hole',
        caption: 'Auto-generated answer key \u2014 yellow labels show correct option for each hole',
      },
    ],
    youtubeId: 'gb-xE_Ay4fc',
    videoTitle: 'How to Create Missing Pieces Puzzles with 6 Shapes and Auto Answer Keys \u2014 Step-by-Step Tutorial',
  },
};

export default content;
