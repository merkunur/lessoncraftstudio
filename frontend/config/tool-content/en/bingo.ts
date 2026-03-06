import type { ToolContent } from '../types';

const content: ToolContent = {
  seo: {
    primaryKeyword: 'picture bingo card generator',
    secondaryKeywords: [
      'picture bingo card generator for sellers',
      'create bingo cards to sell on Etsy',
      'printable bingo card maker commercial use',
      'bingo card worksheet generator for KDP and Etsy',
    ],
    lsiKeywords: [
      'batch bingo card generator with ZIP export',
      'dual fill mode image word bingo maker',
      'call-out sheet bingo worksheet creator tool',
    ],
    titleTag: 'Bingo Card Maker \u2014 Picture Bingo Card Generator',
    metaDescription: 'Create picture bingo cards with configurable grids from 3\u00d73 to 5\u00d75, batch generation of 1\u201310 unique cards per set, ZIP export, dual fill modes for cells and chips, dedicated call-out sheet, and 104 themed image collections. Word fill uses localized image names for multilingual bingo products. Free trial with all features \u2014 commercial license available.',
  },

  hero: {
    title: 'Bingo Card Maker',
    tagline: 'Picture bingo card generator with configurable grids from 3\u00d73 to 5\u00d75, batch generation of 1\u201310 unique cards per set, ZIP export of all cards in one download, dual fill modes for cells and circular chips independently, dedicated call-out sheet with dynamic word grid, custom call-out selection with live counter, and 104 themed image collections for picture bingo cards that sell worldwide',
    description: 'Create professional picture bingo cards where every player gets a unique card with different images in different positions \u2014 essential for bingo to work as a game. Configure rows from 3 to 5 and columns from 3 to 5 independently, creating grids from 3\u00d73 (9 cells) up to 5\u00d75 (25 cells) with a default of 4\u00d74 (16 cells). Generate 1 to 10 unique bingo cards per batch, each drawing a different random image selection from the pool so no two cards share the same layout. Export all generated cards as individual JPEGs in a single bingo_cards.zip file using JSZip compression \u2014 one click downloads an entire bingo card set ready for packaging into marketplace products. Choose Image or Word fill independently for both card cells and circular chips, creating four distinct bingo card styles from one generator. Image fill displays themed illustrations; Word fill displays localized image names from the Image Library, making the Bingo Card Maker language-sensitive \u2014 switching languages changes words on cards, chips, and the call-out sheet. Circular chips feature dashed borders (#666, strokeDashArray [5,5]) and are shuffled using Fisher-Yates ordering so they never mirror the card grid layout, ensuring authentic bingo play where chips serve as a matching reference rather than a positional giveaway. A dedicated call-out sheet on a separate tab displays a dynamic word grid for the caller \u2014 columns calculated based on longest word length (2\u20136 columns) with uniform font sizing across all entries for clean readability. Enable custom call-out selection to hand-pick specific images for the call-out pool with a live counter showing your selection count, giving you precise curriculum alignment control over which items appear in the game. Browse 104 themed collections with 3,100+ illustrations or upload your own PNG, JPG, or GIF images. Apply background themes and border themes with independent opacity sliders (0\u20131, step 0.05). Add custom text with 7 font options (Lexend Deca, Baloo 2, Nunito, Quicksand, Fredoka, Arial, Verdana) and text outline 0\u201310. Export worksheet JPEG, call-out JPEG, worksheet PDF, and call-out PDF at 300 DPI (6\u00d7 multiplier, JPEG quality 1.0), plus the ZIP batch export for all cards. Choose Letter, A4, Square (1200\u00d71200), or custom page sizes with a grayscale toggle for ink-friendly output. The grid area uses 60% of available canvas height (capped at 500px) for optimal card proportions. Edit everything on the Fabric.js canvas with alignment tools, layers, lock/unlock, zoom 50%\u2013200% in 10% increments, and undo/redo 20 states. The free trial includes every feature with a watermark on downloads. Purchase a license to remove the watermark and sell commercially.',
  },

  tutorial: {
    title: 'How to Create Picture Bingo Cards in 8 Steps',
    steps: [
      {
        title: 'Open the Bingo Card Maker',
        description: 'Click \u201cTry Free Now\u201d to launch the picture bingo card generator in your browser. The tool loads instantly with a settings sidebar on the left and a dual-tab canvas on the right \u2014 one tab for the bingo card with chips, one for the call-out sheet. No account creation, no software download, no installation required \u2014 start building picture bingo cards immediately.',
      },
      {
        title: 'Configure Grid Size and Card Count',
        description: 'Open the Bingo Card Settings panel and set rows (3\u20135) and columns (3\u20135) independently to define your grid size \u2014 the default is 4\u00d74 with 16 cells. A 3\u00d73 grid suits quick-play bingo rounds with fewer items to track, while a 5\u00d75 grid provides the classic 25-cell bingo experience. Set the number of cards from 1 to 10 to batch-generate multiple unique bingo cards. Each card draws a different random selection from the image pool, guaranteeing every card in the batch is unique \u2014 essential for bingo where every player needs a different card.',
      },
      {
        title: 'Choose Fill Modes for Cells and Chips',
        description: 'Select card cell fill (Image or Word) and chip fill (Image or Word) independently in the Bingo Card Settings panel. Image fill displays themed illustrations in grid cells or on circular chips. Word fill displays localized image names as text \u2014 switching the app language changes all words on cards, chips, and the call-out sheet. Mix modes for creative variety: image cards with word chips create a visual-to-text matching challenge, word cards with image chips reverse the dynamic, and matching both creates either a purely visual or purely text-based bingo experience. Four distinct bingo card styles from one generator.',
      },
      {
        title: 'Select Images from the Library',
        description: 'Open the Image Library panel and browse 104 themed collections with 3,100+ colorful illustrations \u2014 animals, food, vehicles, nature, holidays, professions, and dozens more. Filter by theme using the dropdown or search by keyword. Click images to select them for your bingo cards. Enable the \u201cUse custom selection\u201d checkbox to hand-pick specific images for the call-out pool \u2014 a live counter shows your selection count as you pick. Custom call-out selection gives you precise control over which items appear in the bingo game, useful for curriculum-aligned activities or themed events.',
      },
      {
        title: 'Set Your Page Layout and Decorations',
        description: 'In the Page Setup section, select your page size: Letter Portrait, Letter Landscape, A4 Portrait, A4 Landscape, Square (1200\u00d71200), or enter a custom dimension. Choose a page background color. Select a decorative background theme and a border theme from the built-in library, each with an independent opacity slider (0\u20131, step 0.05). Background and border themes work independently, so you can pair a subtle pattern background with a bold decorative border or any combination that fits your product style. The call-out sheet inherits page borders and background from the main canvas.',
      },
      {
        title: 'Generate the Bingo Cards',
        description: 'Click Generate to create your bingo cards. The app fills your configured grid with images or words from the selected theme and creates circular chips with dashed borders (#666, strokeDashArray [5,5]) below the card. Chips are shuffled using Fisher-Yates ordering so they never mirror the card grid layout, ensuring authentic bingo play. If you requested multiple cards, each one draws a different random selection from the image pool. The first card appears on the canvas immediately for preview. The grid area uses 60% of available canvas height (capped at 500px) for optimal proportions.',
      },
      {
        title: 'Review the Call-out Sheet',
        description: 'Click the Call-outs tab to see the companion call-out sheet. The call-out sheet displays a dynamic word grid of all unique items from the image pool \u2014 the caller reads these aloud while players mark their cards. Columns are calculated based on the longest word length (2\u20136 columns) with uniform font sizing across all entries. The grid is centered on the page and inherits page borders and background from the main canvas. This is not an answer key \u2014 bingo has no single correct answer since every card is different. The call-out sheet is the reference document for the person running the game.',
      },
      {
        title: 'Download Cards, Call-out Sheet, and ZIP Batch',
        description: 'Toggle grayscale for ink-friendly versions ideal for classroom printing and KDP interiors. Download individual files using the four dedicated buttons: worksheet JPEG, call-out JPEG, worksheet PDF, and call-out PDF \u2014 all rendered at 300 DPI (6\u00d7 multiplier, JPEG quality 1.0). For batch export, click the ZIP download button to receive all generated bingo cards as individual JPEGs in a single bingo_cards.zip file. The ZIP batch export is essential for sellers creating multi-card bingo sets \u2014 generate 10 unique cards and package them in one download. Files are production-ready for Etsy listings, Amazon KDP interiors, and TpT resource files.',
      },
    ],
  },

  whatYouCanCreate: [
    {
      title: 'Themed Picture Bingo Card Sets by Grid Size',
      description: 'Create bingo card packs organized by theme and grid size using the 104 image collections. Each theme supports multiple grid configurations: 3\u00d73 quick-play cards with 9 cells for short rounds, 4\u00d74 standard cards with 16 cells for balanced gameplay, and 5\u00d75 classic cards with 25 cells for extended sessions. Batch-generate 10 unique cards per grid size, then mix all three sizes into one product bundle with call-out sheets included. The ZIP batch export packages each set for immediate delivery. Fisher-Yates chip shuffling ensures every card presents a genuine bingo challenge where chips never mirror the card grid layout.',
    },
    {
      title: 'Multilingual Vocabulary Bingo Products',
      description: 'The Bingo Card Maker is language-sensitive \u2014 Word fill mode displays localized image names from the Image Library, so switching languages changes the words on cards, chips, and the call-out sheet. Create bingo sets in English, German, French, Spanish, Portuguese, Italian, Dutch, Swedish, Danish, Norwegian, and Finnish from the same images without rebuilding anything. A cat image shows \u201cCat\u201d in English, \u201cKatze\u201d in German, and \u201cChat\u201d in French. Sell vocabulary bingo products across international marketplaces by generating each language version in minutes. Word cards with image chips make especially effective vocabulary review tools.',
    },
    {
      title: 'KDP Bingo Activity Books with Call-out Sheets',
      description: 'Compile 40\u201380 bingo cards into printed activity books for Amazon KDP. Structure chapters by theme: animal bingo, food bingo, vehicle bingo, holiday bingo. Include call-out sheets after each set so the book is self-contained for play \u2014 readers can photocopy the call-out page while players use the bingo card pages directly. Mix grid sizes within chapters for progressive difficulty. Toggle grayscale for ink-friendly output that keeps KDP printing costs low. The batch generation feature produces 10 unique cards per set in seconds, making large workbook compilations efficient.',
    },
    {
      title: 'Classroom-Ready Bingo Game Kits',
      description: 'Build complete bingo game kits for classroom use with 10 unique player cards and a caller sheet per set. Teachers searching for bingo activities value products that arrive ready to play \u2014 print the cards, hand them out, and start the game immediately. Use Word fill mode with curriculum vocabulary for language arts review, Image fill for visual recognition exercises, or mixed modes for differentiated instruction. The custom call-out selection feature lets you curate exactly which vocabulary items appear in the game for precise curriculum alignment.',
    },
    {
      title: 'Seasonal and Holiday Bingo Collections',
      description: 'Build rotating seasonal collections using holiday and nature themes from the 104-theme library. Christmas bingo, Halloween bingo, Easter bingo, Valentine\u2019s Day bingo, back-to-school bingo, and summer bingo each support dedicated product packs. Bingo is a naturally social game that peaks during holidays when families and classrooms look for group activities. Include multiple grid sizes and both image and word fill variants in each seasonal set for maximum value. Release each collection 4\u20136 weeks before the holiday for peak marketplace visibility.',
    },
    {
      title: 'Event and Party Bingo Card Sets',
      description: 'Create bingo card sets for parties, baby showers, bridal showers, team building events, and educational workshops. The configurable grid sizes and themed image library produce occasion-specific bingo games quickly \u2014 baby items bingo for baby showers, food bingo for cooking classes, animal bingo for zoo trips. Batch generate 10 unique cards per event set with a call-out sheet, package as an instant-download ZIP bundle, and sell on Etsy where event planners actively search for printable party games. Custom call-out selection lets you curate the exact items for each occasion.',
    },
  ],

  businessIdeas: [
    {
      title: 'Themed Bingo Card Shop on Etsy',
      description: 'Open an Etsy shop specializing in picture bingo card bundles organized by theme using the 104 image collections. Animals, food, vehicles, holidays, nature, and professions each become separate listings with 10\u201330 unique cards per set and call-out sheets included. The batch generation feature creates 10 unique cards per click, and the ZIP export packages them instantly for digital delivery. Mix grid sizes within bundles: 3\u00d73 quick-play cards, 4\u00d74 standard cards, and 5\u00d75 classic cards for variety. Price individual theme packs at $3\u2013$5 for 10\u201315 cards with call-out sheets and premium multi-theme bundles at $8\u2013$15.',
      platform: 'Etsy',
    },
    {
      title: 'Amazon KDP Bingo Activity Book Series',
      description: 'Compile 40\u201380 bingo cards into themed activity books for Amazon KDP. Structure a series by topic: \u201cAnimal Bingo,\u201d \u201cHoliday Bingo,\u201d \u201cFood Bingo,\u201d and \u201cEveryday Objects Bingo.\u201d Include call-out sheets after each card set so the book is self-contained for play. Mix grid sizes for progressive difficulty within each book \u2014 start with 3\u00d73 cards and advance to 5\u00d75. Toggle grayscale for ink-friendly output that prints perfectly in black-and-white. Bingo activity books sell year-round and spike during holiday seasons when families look for group activities.',
      platform: 'Amazon KDP',
    },
    {
      title: 'TpT Classroom Bingo Activity Packs',
      description: 'Upload classroom bingo activity packs to TpT with unique player cards and caller sheets as key selling points. Teachers searching for bingo activities value products that arrive ready to play \u2014 print, distribute, and start the game. Create curriculum-aligned sets: vocabulary bingo using Word fill mode, picture recognition bingo using Image fill, and mixed-mode bingo for differentiated instruction. Include 10 unique cards per set with a call-out sheet. The Word fill mode with localized image names turns bingo into a vocabulary review activity that teachers can use across language arts, science vocabulary, and thematic units.',
      platform: 'Teachers Pay Teachers',
    },
    {
      title: 'Pinterest Bingo Card Traffic Funnel',
      description: 'Bingo cards make visually striking Pinterest pins \u2014 the colorful grid layout with themed images and circular chips creates an immediately recognizable game format that parents and teachers love. Pin sample bingo cards showing different themes: animal bingo for preschool boards, holiday bingo for seasonal boards, and word bingo for educational boards. Create separate pin series for \u201cpicture bingo printables,\u201d \u201cclassroom bingo games,\u201d and \u201choliday bingo activities.\u201d Bingo is a universally recognized game, so pins appeal to audiences across every country and language. Link each pin to your Etsy or TpT product listings.',
      platform: 'Pinterest',
    },
    {
      title: 'Gumroad Complete Bingo Card Toolkit',
      description: 'Bundle bingo cards across all 104 themes, all grid sizes, and both fill modes into a comprehensive toolkit on Gumroad. Include 500+ unique bingo cards spanning 3\u00d73, 4\u00d74, and 5\u00d75 grids with image and word fill variants, plus call-out sheets for every theme. The batch generation and ZIP export make large-scale production efficient. The dual fill system produces four distinct card styles per theme (image/image, image/word, word/image, word/word), multiplying variety from each image set. The toolkit format justifies premium pricing because buyers get a complete bingo game library rather than individual packs.',
      platform: 'Gumroad',
    },
    {
      title: 'Multilingual Bingo Products for Global Markets',
      description: 'The Bingo Card Maker is language-sensitive \u2014 Word fill mode uses localized image names across 11 languages, making it simple to produce bingo cards in English, German, French, Spanish, Portuguese, Italian, Dutch, Swedish, Danish, Norwegian, and Finnish from the same images. Create vocabulary bingo products targeting international Etsy shops, multilingual TpT buyers, and language learners worldwide. Sell the same themed bingo set in multiple language versions with no redesign needed \u2014 just switch the language and regenerate. Multilingual bundles command premium prices and reach buyers that monolingual competitors cannot.',
      platform: 'Etsy / TpT',
    },
  ],

  proTips: [
    {
      title: 'Use Batch Generation and ZIP Export for Efficient Product Creation',
      description: 'Set the card count to 10 and generate a complete set of unique bingo cards in one click. Every card draws a different random image selection from the pool, guaranteeing no two cards share the same layout. Then use the ZIP batch export to download all 10 cards as individual JPEGs in a single bingo_cards.zip file. This workflow produces a complete, ready-to-sell bingo card set in seconds rather than generating and saving cards one by one. For larger bundles, generate multiple batches across different grid sizes and themes.',
    },
    {
      title: 'Mix Fill Modes for Four Distinct Product Styles',
      description: 'Card cells and chips each have independent fill mode selection \u2014 Image or Word. This creates four distinct bingo card styles from one generator: image cards with image chips (fully visual), image cards with word chips (visual-to-text matching), word cards with image chips (text-to-visual matching), and word cards with word chips (fully text-based). Include all four styles in premium bundles for maximum variety and value. Each style serves a different educational purpose \u2014 visual recognition, vocabulary matching, reading practice, or combination learning.',
    },
    {
      title: 'Leverage Custom Call-out Selection for Curriculum Alignment',
      description: 'Enable the \u201cUse custom selection\u201d checkbox to hand-pick exactly which images appear in the call-out pool. The live counter shows your selection count as you pick from the Image Library. This feature is critical for creating curriculum-aligned bingo games \u2014 select only the vocabulary words your lesson covers, only the animals in a specific habitat, or only the foods in a nutrition unit. Custom call-out selection transforms bingo from a random game into a targeted teaching tool, which is the key selling point for TpT classroom products.',
    },
    {
      title: 'Exploit the Language-Sensitive Word Fill for Multilingual Products',
      description: 'Word fill mode displays localized image names from the Image Library \u2014 switching the app language changes all words on cards, chips, and the call-out sheet. Generate a themed bingo set in English, then switch to German, French, Spanish, or any of the 11 supported languages and regenerate the same set with localized vocabulary. This produces multilingual bingo products from identical images with zero redesign effort. Multilingual vocabulary bingo bundles are underserved in most marketplaces, giving you a competitive advantage.',
    },
    {
      title: 'Include Call-out Sheets in Every Product Listing',
      description: 'The dedicated call-out sheet with its dynamic word grid is what makes your bingo cards a complete, playable game rather than just pretty printables. Always include call-out sheets in your product bundles and showcase them in listing preview images. The call-out sheet displays all unique items in a clean grid with uniform font sizing and calculated columns \u2014 the caller reads items aloud while players mark their cards. Products that include caller materials consistently outsell cards-only listings because buyers want a complete, ready-to-play experience.',
    },
    {
      title: 'Use Background and Border Themes for Cohesive Product Branding',
      description: 'The independent background and border theme system with separate opacity sliders lets you create a consistent visual identity across your bingo card bundles. Set a subtle background theme at 15\u201325% opacity for visual warmth without distracting from the bingo grid content. Layer a decorative border at 80\u2013100% opacity for a polished frame. Apply the same background and border combination across every card in a bundle for a cohesive product look that buyers associate with quality and professionalism. The call-out sheet inherits these settings automatically.',
    },
    {
      title: 'Target Multiple Grid Sizes for Maximum Market Coverage',
      description: 'Different grid sizes serve different audiences. 3\u00d73 grids (9 cells) work best for preschool and kindergarten bingo with quick rounds and fewer items to track. 4\u00d74 grids (16 cells) suit elementary classrooms with balanced gameplay. 5\u00d75 grids (25 cells) provide the classic bingo experience for older students and family game nights. Include all three sizes in your product bundles and create separate listings targeting each age group. The batch generation feature means switching grid sizes and regenerating takes seconds.',
    },
  ],

  faq: [
    {
      question: 'Is there a free trial?',
      answer: 'Yes. The tool offers a free trial with every feature unlocked \u2014 all grid sizes from 3\u00d73 to 5\u00d75, batch generation of up to 10 unique cards, ZIP batch export, both image and word fill modes for cells and chips independently, the dedicated call-out sheet with dynamic word grid, custom call-out selection with live counter, all 104 themed image collections with 3,100+ illustrations, custom image uploads, background and border themes with independent opacity, grayscale toggle, and all download formats. No signup, no credit card required. Free trial downloads include a watermark. Purchase a commercial license to remove the watermark and unlock selling rights.',
    },
    {
      question: 'How does batch generation work for bingo cards?',
      answer: 'Set the number of cards from 1 to 10 in the Bingo Card Settings panel. Each card draws a different random selection from the image pool, guaranteeing every card in the batch is unique \u2014 essential for bingo where every player needs a different card. The first card appears on the canvas immediately for preview. All generated cards are available through the ZIP batch export for download as individual JPEG files in a single bingo_cards.zip archive. Generate a complete set of 10 unique bingo cards with one click, ready for packaging into marketplace products.',
    },
    {
      question: 'What grid sizes are available for bingo cards?',
      answer: 'Rows and columns are independently configurable from 3 to 5, creating grids from 3\u00d73 (9 cells) up to 5\u00d75 (25 cells). The default is 4\u00d74 with 16 cells. You can also create non-square grids like 3\u00d75 (15 cells) or 5\u00d73 (15 cells) for unique bingo card formats. Smaller grids work well for preschool quick-play rounds with fewer items to track, while 5\u00d75 grids provide the classic bingo experience for longer games and older audiences.',
    },
    {
      question: 'What is the difference between card cell fill and chip fill?',
      answer: 'Card cells and chips each have an independent fill mode: Image or Word. Card cell fill determines what appears in each cell of the bingo grid on the card. Chip fill determines what appears on the circular chips with dashed borders below the card. You can mix modes freely \u2014 image cards with word chips create a visual-to-text matching challenge, word cards with image chips reverse the dynamic, and matching both creates either a fully visual or fully text-based bingo experience. This dual fill system produces four distinct bingo card styles from one generator.',
    },
    {
      question: 'How do the circular chips work?',
      answer: 'Circular chips appear below the bingo card grid with dashed borders (#666, strokeDashArray [5,5]). They display either images or words depending on your chip fill mode selection. Chips are shuffled using Fisher-Yates ordering so they never mirror the card grid layout \u2014 this ensures authentic bingo play where the chips serve as a matching reference rather than revealing answers by position. Players use the chips to identify which items are being called during the game.',
    },
    {
      question: 'What is the call-out sheet and how does it work?',
      answer: 'The call-out sheet is a separate page accessed via the Call-outs tab that displays a dynamic word grid of all unique items from the image pool. The caller reads these words aloud while players mark matching items on their bingo cards. Columns are calculated based on the longest word length (2\u20136 columns) with uniform font sizing across all entries for clean readability. The grid is centered on the page and inherits borders and background from the main canvas. This is not an answer key \u2014 bingo has no single correct answer since every card is different.',
    },
    {
      question: 'What is custom call-out selection?',
      answer: 'Enable the \u201cUse custom selection\u201d checkbox in the Bingo Card Settings panel to hand-pick which specific images appear in the call-out pool. When enabled, click images in the Image Library to add them to your custom call-out selection \u2014 a live counter shows your selection count as you pick. This gives you precise control over which items appear in the bingo game, useful for curriculum-aligned vocabulary activities, themed events, or any situation where you want to curate the exact items players will encounter during the game.',
    },
    {
      question: 'Is the Bingo Card Maker language-sensitive?',
      answer: 'Yes. When using Word fill mode for card cells or chips, the words displayed are localized image names from the Image Library. Switching the language in Worksheet Settings changes the words on cards, chips, and the call-out sheet. For example, a cat image shows \u201cCat\u201d in English but \u201cKatze\u201d in German and \u201cChat\u201d in French. This makes it easy to create multilingual vocabulary bingo products from the same images. Image fill mode is not language-sensitive since it displays illustrations rather than words.',
    },
    {
      question: 'How does the ZIP batch export work?',
      answer: 'After generating multiple bingo cards, click the batch export button to download all cards as individual high-resolution JPEG files packaged in a single bingo_cards.zip archive using JSZip compression. Each card is named sequentially inside the ZIP for easy organization. This eliminates downloading cards one at a time \u2014 generate a complete set of 10 unique cards and export them all in one click. The ZIP export works alongside the standard individual JPEG and PDF download buttons for the currently displayed card and the call-out sheet.',
    },
    {
      question: 'What page sizes and export formats are available?',
      answer: 'Page sizes include Letter Portrait, Letter Landscape, A4 Portrait, A4 Landscape, Square (1200\u00d71200), and custom dimensions. Export as high-resolution JPEG or print-ready PDF at 300 DPI (6\u00d7 multiplier, JPEG quality 1.0). Toggle grayscale for ink-friendly output. Five download options: worksheet JPEG, call-out JPEG, worksheet PDF, call-out PDF, and ZIP batch export of all generated cards. All exports are production-ready for digital downloads, printed activity books, and classroom handouts.',
    },
    {
      question: 'Can I sell bingo cards made with this tool commercially?',
      answer: 'Yes. With a commercial license, you have full rights to sell bingo cards as digital downloads on Etsy, printed activity books on Amazon KDP, classroom resources on TpT, or through any other sales channel. The configurable grid sizes, batch generation, ZIP export, dual fill modes, dedicated call-out sheets, custom call-out selection, multilingual word fill, and 104 themed image collections give you everything needed to create professional bingo products that compete in printable game categories across every major marketplace.',
    },
    {
      question: 'What is your refund policy?',
      answer: 'Try before you buy with our free trial \u2014 every feature is available so you can fully evaluate the tool before purchasing. Because the free trial gives you complete access to all grid sizes, batch generation of up to 10 cards, ZIP export, both fill modes for cells and chips, the call-out sheet, custom call-out selection, all 104 themes, custom image uploads, background and border themes, grayscale export, and every download format, we do not offer refunds on license purchases. Make sure the tool fits your needs using the free trial before buying.',
    },
  ],

  internalLinks: [
    { pageType: 'app', slug: 'picture-bingo-worksheets', anchorText: 'Picture Bingo Cards \u2014 Full Product Details' },
    { pageType: 'tool', slug: 'matching-worksheet-maker', anchorText: 'Matching Worksheet Maker' },
    { pageType: 'tool', slug: 'grid-match-maker', anchorText: 'Grid Match Maker' },
    { pageType: 'tool', slug: 'shadow-match-maker', anchorText: 'Shadow Match Maker' },
    { pageType: 'tool', slug: 'picture-sort-maker', anchorText: 'Picture Sort Maker' },
    { pageType: 'tool', slug: 'word-search-maker', anchorText: 'Word Search Maker' },
    { pageType: 'tool', slug: 'odd-one-out-maker', anchorText: 'Odd One Out Maker' },
    { pageType: 'tool', slug: 'coloring-page-maker', anchorText: 'Coloring Page Maker' },
  ],

  visuals: {
    heroImages: {
      primary: '/samples/english/bingo/bingo_card_worksheet.webp',
      primaryAlt: 'Picture bingo card with themed images in a configurable grid layout and circular chips with dashed borders below for matching during bingo play',
    },
    sampleGallery: [
      {
        src: '/samples/english/bingo/bingo_image_fill.webp',
        alt: 'Picture bingo card with image fill showing colorful themed illustrations in grid cells and circular image chips with dashed borders',
        caption: 'Image fill mode \u2014 colorful illustrations in both card cells and circular chips for visual bingo',
      },
      {
        src: '/samples/english/bingo/bingo_word_fill.webp',
        alt: 'Picture bingo card with word fill showing localized image names in grid cells and word chips for vocabulary bingo',
        caption: 'Word fill mode \u2014 localized image names for vocabulary-based multilingual bingo products',
      },
      {
        src: '/samples/english/bingo/bingo_callout_sheet.webp',
        alt: 'Bingo call-out sheet with dynamic word grid showing all game items organized in columns for the caller',
        caption: 'Call-out sheet \u2014 dynamic word grid with calculated columns and uniform font sizing for the caller',
      },
    ],
    youtubeId: 'd6AOiDXoK1c',
    videoTitle: 'How to Create Picture Bingo Cards with Batch Generation, ZIP Export, Dual Fill Modes, and Call-out Sheets \u2014 Step-by-Step Tutorial',
  },
};

export default content;
