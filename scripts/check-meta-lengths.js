const metas = {
  'app-content/addition': 'Create addition worksheets to sell on Etsy, KDP & TPT. 104 themes, 4 exercise modes, answer keys included, 400+ DPI export. Try free — license available.',
  'app-content/alphabet-train': 'Create alphabet train worksheets to sell on Etsy, KDP & TPT. Train-car letter-image matching, 11 languages, 104 themes. Try free — license available..',
  'app-content/chart-count': 'Create picture graph worksheets to sell on Etsy, KDP & TPT. Auto answer key with highlights, 104 themes, 6 image types per sheet. Try free — license available.',
  'app-content/coloring': 'Create custom coloring pages to sell on Etsy, KDP & TPT. Free-form canvas, 104 themes, freehand drawing, grayscale export. Try free — license available.',
  'app-content/find-and-count': 'Create I Spy counting worksheets to sell on Etsy, KDP & TPT. 4 task types, Letter Spotting mode, auto answer key, 104 themes. Try free — license available.',
  'app-content/pattern-train': 'Create pattern train worksheets to sell on Etsy, KDP & TPT. Five pattern types, 11 train wagons, adjustable clue count, answer key. Try free — license available.',
  'app-content/prepositions': 'Create preposition worksheets to sell on Etsy, KDP & TPT. 8 spatial prepositions, fill-in-the-blank and multiple choice. Try free — license available.',
  'app-content/writing': 'Create handwriting worksheets to sell on Etsy, KDP & TPT. Three practice modes, five font styles, arrow stroke guides, fading traces. Try free — license.',
  'tool-content/big-small': 'Generate size comparison worksheets with five question types, identical and different image modes, and 104 themes. Print-ready PDFs. Try free — license available.',
  'tool-content/draw-and-color': 'Generate grid drawing worksheets with dual grids, adjustable clue percentage, three symmetry modes, and themed image sets. Try free — license available.',
  'tool-content/find-and-count': 'Create I Spy worksheets with Hidden Object and Letter Spotting modes, four task types, locale-specific alphabets. Try free — license available.',
  'tool-content/writing': 'Generate handwriting worksheets with three practice modes, five font styles, arrow stroke order, fading guides, 104 themes. Try free — license available.',
  'bundle-content/literacy-bundle': 'Get 7 literacy worksheet generators in one bundle. Create alphabet, word search, cryptogram, prepositions, and handwriting worksheets in 11 languages.',
  'bundle-content/math-bundle': 'Get 6 math worksheet generators in one bundle. Create addition, subtraction, code puzzles, comparison, and algebra worksheets to sell on Etsy, KDP & TPT.',
  'bundle-content/visual-bundle': 'Get 7 visual learning generators in one bundle. Create coloring, drawing, pattern, size comparison, charts, and line tracing worksheets to sell online.',
  'start-content/amazon-kdp-activity-books': 'How to sell activity books on Amazon KDP. Covers interior formatting, cover design, keyword research, pricing strategy, and scaling your KDP book business.',
  'start-content/create-multilingual-worksheets': 'Create and sell worksheets in 11 languages with a multilingual generator. Reach German, French, and Spanish buyers on Etsy, Amazon KDP, and global markets.',
  'start-content/create-worksheets-that-sell': 'How to create worksheets that sell on Etsy, Amazon KDP, and TpT. Step-by-step guide covering themed images, answer keys, pricing, and listing optimization.',
  'start-content/scaling-printable-business': 'How to scale your printable business from side hustle to full-time. Covers catalog expansion, multi-platform distribution, bundling, and workflow automation.',
  'guide-content/create-alphabet-worksheets': 'How to create alphabet train worksheets with train wagons, two creation modes, configurable difficulty, and 104 themed images. Sell on Etsy, KDP & TPT.',
  'guide-content/create-chart-count-worksheets': 'Create picture graph worksheets with 4x5 scattered grids, auto answer keys, random image distribution, and 104 themes. Step-by-step guide for Etsy & KDP.',
  'guide-content/create-counting-worksheets': 'How to create counting worksheets with picture graphs, auto answer keys, and 104 themes. Step-by-step guide to selling printables on Etsy, KDP, and TpT.',
  'guide-content/create-cryptogram-puzzles': 'Create cryptogram puzzles with picture cipher encoding, adjustable difficulty, auto-assign mode, and locale-aware alphabets. Guide for Etsy & KDP sellers.',
  'guide-content/create-missing-pieces-puzzles': 'Create jigsaw puzzle worksheets with 6 piece shapes, smart extraction, distractor pieces, and auto answer keys. Step-by-step selling guide for Etsy & KDP.',
  'guide-content/create-odd-one-out-puzzles': 'Create odd one out worksheets with Identical and Similar modes, per-exercise overrides, and auto answer keys. Step-by-step guide for Etsy and KDP sellers.',
  'guide-content/create-sell-tpt-resources': 'How to create and sell TPT resources. Account setup, resource formatting, listing optimization, pricing strategy, and building momentum on Teachers Pay Teachers.',
  'guide-content/create-shadow-matching-worksheets': 'Create shadow matching worksheets with two modes: Shadow Match for silhouettes and Make It Whole for split images. Step-by-step guide to sell on Etsy & KDP.',
  'guide-content/create-sorting-worksheets': 'Create sorting worksheets with two-category theme mode, 4-12 images, shuffled cutout grids, and auto answer keys. Step-by-step guide to sell on Etsy & KDP.',
  'guide-content/create-treasure-hunt-worksheets': 'Create treasure hunt worksheets on a 5x5 grid with directional moves, themed landmarks, and auto answer keys. Step-by-step guide to sell on Etsy and KDP.',
  'guide-content/create-subtraction-worksheets': 'Create subtraction worksheets for kids with crossed-out images, themed visuals, and auto answer keys. Step-by-step guide to selling on Etsy, KDP, and TpT.',
  'guide-content/customer-support-digital-products': 'Customer support strategies for digital product sellers. Covers issue prevention, response templates, refund handling, review management, and scalable systems.',
  'guide-content/email-marketing-printables': 'Email marketing strategies for printable sellers. Build a subscriber list, create lead magnets, automate email sequences, and drive repeat sales across platforms.',
  'guide-content/get-reviews-printable-products': 'Proven strategies to get reviews for printable products. Build social proof, earn authentic buyer feedback, and boost your Etsy, KDP, and TpT shop credibility.',
  'guide-content/kdp-vs-etsy-printables': 'KDP vs Etsy for printable sellers. Compare fee structures, product formats, traffic mechanics, and learn multi-platform strategies for your printable business.',
  'guide-content/make-money-kdp-activity-books': 'How to make money with KDP activity books. Covers pricing, catalog building, royalty calculations, seasonal publishing, and multi-platform scaling strategies.',
  'guide-content/multilingual-printable-business': 'Build a multilingual printable business by expanding into international markets. Learn which languages to target, translation workflows, and revenue strategies.',
  'guide-content/publish-puzzle-books-kdp': 'How to publish puzzle books on KDP with word search, crossword, and sudoku. Covers formatting, variety books, series strategy, and Amazon listing optimization.',
  'guide-content/tpt-store-optimization': 'TPT store optimization strategies for higher search rankings and more sales. Covers preview conversion, product bundling, review building, and catalog scaling.',
  'guide-content/understanding-commercial-licenses': 'Understand commercial use licenses for printables before selling. Learn licensing types, common mistakes, and how proper licensing protects your business.',
  'guide-content/worksheets-multiple-languages': 'How to create worksheets in multiple languages with production workflows, character handling, font selection, quality assurance, and listing adaptation.',
  'idea-content/birds-printable-ideas': 'Explore bird-themed printable ideas to sell on Etsy, Amazon KDP, and TPT. Product concepts, platform strategies, and niche positioning tips for sellers.',
  'idea-content/insects-printable-ideas': 'Discover insect-themed printable ideas to sell on Etsy, Amazon KDP, and TPT. Bug and butterfly product concepts, platform strategies, and niche seller tips.',
  'idea-content/kindergarten-printable-ideas': 'Explore kindergarten printable ideas to sell on Etsy, Amazon KDP, and TPT. K-level product concepts and niche strategies for printable sellers worldwide.',
  'idea-content/math-facts-printable-ideas': 'Discover math facts printable ideas to sell on Etsy, Amazon KDP, and TPT. Niche strategies for sellers targeting teachers and parents who need practice sheets.',
  'idea-content/special-education-printable-ideas': 'Discover special education printable ideas to sell on Etsy, KDP, and TPT. SPED product concepts for teachers, therapists, and parents of diverse learners.',
  'idea-content/custom-worksheet-service-ideas': 'Custom worksheet service business ideas for Etsy and freelance sellers. Offer made-to-order educational printables with premium per-order pricing strategies.',
  'idea-content/party-supply-printable-ideas': 'Printable party supply business ideas for Etsy sellers. Create themed party packs, birthday games, celebration worksheets, and seasonal event printables.',
  'idea-content/pirates-printable-ideas': 'Discover pirate-themed printable ideas to sell on Etsy, Amazon KDP, and TPT. Pirate product concepts, adventure worksheets, and niche strategies for sellers.',
  'idea-content/print-on-demand-printable-ideas': 'Print-on-demand worksheet ideas for Etsy, KDP, and Shopify sellers. Build a zero-inventory printable business with workbooks, activity packs, and puzzle books.',
};

let errors = 0;
for (const [key, meta] of Object.entries(metas)) {
  if (meta.length < 150 || meta.length > 160) {
    console.log('FAIL ' + key + ': ' + meta.length + ' chars (need ' + (meta.length < 150 ? 150 - meta.length + ' more' : meta.length - 160 + ' fewer') + ')');
    errors++;
  }
}
if (errors === 0) console.log('ALL ' + Object.keys(metas).length + ' CORRECTED METAS PASS (150-160 chars)');
else console.log(errors + ' need adjustment');
