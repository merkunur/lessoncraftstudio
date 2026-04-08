import type { GuideContent } from '../types';

const content: GuideContent = {
  seo: {
    primaryKeyword: 'kdp puzzle book formatting',
    secondaryKeywords: [
      'KDP puzzle book trim size',
      'puzzle book margins KDP',
      'KDP interior PDF requirements',
      'puzzle book spine width calculator',
    ],
    lsiKeywords: [
      'bleed settings puzzle books',
      'KDP cover dimensions',
      'manuscript formatting Amazon',
      'print-ready PDF setup',
    ],
    titleTag: 'KDP Puzzle Book Formatting Guide | LCS',
    metaDescription: 'Complete KDP puzzle book formatting guide. Trim sizes, margins, bleed, page count rules, cover dimensions, spine width calculation. Get your manuscript accepted first time.',
  },

  hero: {
    title: 'KDP Puzzle Book Formatting Guide',
    tagline: 'Every trim size, margin rule, bleed setting, and cover dimension you need to get your puzzle book manuscript accepted by Amazon KDP on the first upload',
    description: 'Formatting errors are the number one reason KDP manuscripts get rejected. A puzzle grid that bleeds into the gutter, a cover spine that is 0.02 inches too narrow, or a PDF that uses the wrong color profile -- any of these will bounce your submission back with a vague error message and cost you days of troubleshooting. This guide eliminates that cycle entirely. It covers every formatting specification that applies to puzzle books: trim sizes, interior margins, bleed versus no-bleed, page count rules, PDF export settings, cover dimensions, and spine width calculations. Every specification here is current as of 2026 and has been verified against live KDP submissions.',
  },

  introduction: 'Amazon KDP is particular about formatting. The platform prints millions of books and every manuscript must conform to exact specifications so the automated printing process produces consistent results. For puzzle books -- word searches, crosswords, sudoku, mazes, and activity books -- the formatting requirements intersect with design considerations that do not apply to standard text-heavy books.\n\nPuzzle books have grids, illustrations, answer keys, and precise spatial layouts. A word search grid needs to be large enough for comfortable solving but small enough to fit within KDP\'s minimum margins. A crossword clue section needs to share the page with the grid without either element encroaching on the trim area. An answer key section at the back of the book needs page references that match the puzzle pages exactly.\n\nGetting this wrong means rejected manuscripts, wasted time, and delayed publication. Getting it right means your manuscript uploads cleanly, passes KDP\'s automated review, and prints exactly as you designed it.\n\nThis guide is organized around the decisions you make in order: trim size first, then margins, then bleed, then page count, then interior PDF preparation, and finally cover dimensions. Each section gives you the exact numbers and explains the reasoning behind them. By the end, you will have a formatting checklist that ensures every puzzle book you create passes KDP review on the first submission.\n\nAll puzzle types referenced here can be generated with LessonCraftStudio\'s worksheet generators. The free trial with watermark lets you test formatting and layout before purchasing a commercial license for print-ready exports.',

  tutorial: [
    {
      heading: 'Choosing the Right Trim Size for Puzzle Books',
      content: 'Trim size is the finished page dimension of your printed book. KDP supports dozens of trim sizes, but puzzle books work best in a handful of them. Your choice affects grid readability, printing cost, and buyer expectations.\n\n8.5 x 11 inches (US Letter): This is the default expectation for activity books and puzzle books in the US market. Buyers searching for word search books, crossword books, or sudoku books on amazon.com expect this size. It gives you maximum grid area -- a word search grid can be 7 inches wide by 8.5 inches tall with comfortable margins. This size also works well for books that combine puzzles with illustrations or instructions on the same page.\n\n8 x 10 inches: Slightly smaller than US Letter, this trim size reduces printing costs while still providing ample grid space. It is a good choice for puzzle books with smaller grids (15x15 or under) or books targeting a slightly more premium feel. The narrower width means slightly tighter horizontal margins.\n\n6 x 9 inches (Trade): The standard trade paperback size. For puzzle books, this works as a travel or portable format. Grids need to be smaller -- a 12x12 or 15x15 word search fits comfortably, but 20x20 grids become cramped. Printing costs are the lowest of the three sizes. This format works particularly well for "pocket" or "travel" puzzle books, which is a distinct niche on Amazon.\n\n5.5 x 8.5 inches (Digest): A compact size that works for simple puzzles like sudoku or small word searches. Not recommended for crosswords or activity pages that need horizontal space.\n\nFor your first puzzle book, start with 8.5 x 11. It is the safest choice -- buyers expect it, grids are readable, and the format accommodates every puzzle type. Branch into 6 x 9 travel editions once you have an established catalog.',
    },
    {
      heading: 'Interior Margins: The Numbers That Matter',
      content: 'KDP has minimum margin requirements that vary by trim size and page count. For puzzle books, margins are critical because puzzle grids need to be fully visible even when the book is bound.\n\nInside margin (gutter): This is the margin closest to the spine. For a bound book, the gutter must be wide enough that content is not swallowed by the binding. KDP\'s minimum inside margin depends on page count:\n\n- 24 to 150 pages: 0.375 inches minimum\n- 151 to 300 pages: 0.75 inches minimum\n- 301 to 500 pages: 0.875 inches minimum\n- 501+ pages: 1.0 inch minimum\n\nFor puzzle books, always add 0.125 to 0.25 inches beyond the minimum. A puzzle grid that technically fits within the minimum gutter will feel cramped when the book is open. For a 200-page puzzle book at 8.5 x 11, use a 1.0 inch inside margin even though 0.75 is the minimum.\n\nOutside margin: 0.25 inches minimum for all trim sizes. For puzzle books, use 0.5 inches. This gives solvers room to hold the book without their thumbs covering puzzle content.\n\nTop margin: 0.25 inches minimum. Use 0.5 to 0.75 inches for puzzle books to accommodate page headers or puzzle numbers.\n\nBottom margin: 0.25 inches minimum. Use 0.5 inches to leave room for page numbers.\n\nSafe content area calculation for 8.5 x 11 with 200 pages:\n- Total width: 8.5 inches\n- Inside margin: 1.0 inch\n- Outside margin: 0.5 inch\n- Usable width: 7.0 inches\n- Total height: 11.0 inches\n- Top margin: 0.75 inch\n- Bottom margin: 0.5 inch\n- Usable height: 9.75 inches\n\nThis 7.0 x 9.75 inch content area comfortably fits a 20x20 word search grid with a word list below, or a crossword grid with clues.',
    },
    {
      heading: 'Bleed Settings: When You Need Them and When You Do Not',
      content: 'Bleed refers to content that extends beyond the trim line to the edge of the paper. When a printed page is trimmed, bleed content ensures there is no white strip at the edge -- the color or image goes all the way to the edge.\n\nFor most puzzle books, you do not need bleed. Word search grids, crossword grids, sudoku grids, and text content all sit within margins and do not touch the page edge. Select "no bleed" in your KDP setup.\n\nWhen bleed IS needed:\n- Coloring books where the illustration extends to the page edge\n- Activity books with full-page background colors or patterns\n- Puzzle books with decorative borders that touch the edge\n- Books with full-bleed photography or illustrations\n\nBleed dimensions when needed: KDP requires 0.125 inches of bleed on the outside, top, and bottom edges. The inside edge (gutter side) never has bleed. This means a "no bleed" 8.5 x 11 page is exactly 8.5 x 11 inches in your PDF. A "bleed" 8.5 x 11 page must be 8.625 x 11.25 inches in your PDF (8.5 + 0.125 outside, and 11 + 0.125 top + 0.125 bottom).\n\nImportant: If you select "bleed" in KDP setup, every page in your PDF must include the bleed area, even pages that have no edge-to-edge content. This is a common formatting error -- publishers select bleed for a few decorative pages but forget to resize all other pages. The manuscript gets rejected.\n\nRecommendation: Unless your puzzle book specifically requires edge-to-edge design elements, always choose "no bleed." It simplifies your entire workflow and eliminates an entire category of formatting errors.',
    },
    {
      heading: 'Page Count Rules and Optimal Book Length',
      content: 'KDP has strict page count requirements that affect puzzle book planning.\n\nMinimum pages: 24 pages for paperback. This is a hard limit -- KDP will not accept manuscripts under 24 pages.\n\nMaximum pages: 828 pages for paperback (varies slightly by trim size and paper type). This is rarely a concern for puzzle books.\n\nPage count must be even: KDP prints on both sides of each sheet. Your total page count must be an even number. If your manuscript has an odd number of pages, add a blank page at the end.\n\nPaper type: Choose between white paper and cream paper. For puzzle books, always use white paper. Cream paper is designed for fiction and non-fiction reading -- it reduces eye strain for long text passages but makes puzzle grids and illustrations look yellowed and muddy.\n\nOptimal page counts for puzzle books by type:\n\nWord search books: 100 to 200 pages (50 to 100 puzzles + answer keys). This range keeps printing costs manageable while offering substantial value to buyers.\n\nSudoku books: 120 to 200 pages. Sudoku grids are smaller than word search grids, so you can fit 2 to 4 puzzles per page, increasing puzzle count without proportional page increase.\n\nCrossword books: 80 to 160 pages. Crossword puzzles with clue sections take a full page each. A 50-crossword book with answer keys runs approximately 104 pages.\n\nActivity books (mixed puzzles): 60 to 120 pages. Mixed formats keep the book interesting without excessive length.\n\nPrinting cost impact: Every page adds to your printing cost, which reduces your royalty. For a black and white 8.5 x 11 book, KDP charges approximately $0.012 per page plus a fixed fee of $0.85. A 100-page book costs $2.05 to print. A 200-page book costs $3.25. A 300-page book costs $4.45. Price your book accordingly.',
    },
    {
      heading: 'Interior PDF Requirements: Resolution, Color, and Fonts',
      content: 'Your manuscript PDF must meet specific technical requirements to pass KDP\'s automated quality review.\n\nResolution: 300 DPI minimum for all images. This applies to puzzle grids rendered as images, illustrations, and any graphic elements. Text rendered as vector (standard for most PDF creation tools) does not have a DPI requirement -- it scales cleanly at any size. The LessonCraftStudio generators export at 300 DPI, which meets this requirement.\n\nColor profile: For black and white interiors, ensure your PDF uses grayscale color space. Common errors include exporting "black" content in RGB or CMYK color space, which can cause unexpected color shifts in print. Pure black should be 100% K in CMYK or 0,0,0 in RGB.\n\nFonts: All fonts must be embedded in the PDF. If your manuscript uses a font that is not embedded, KDP will substitute a default font, which breaks puzzle layouts. Most PDF export tools embed fonts by default, but verify this in your PDF properties.\n\nTransparency: Flatten all transparency before uploading. Transparent layers in PDF can cause rendering issues in KDP\'s print process. Most PDF export tools have a "flatten transparency" option.\n\nPage size consistency: Every page in the PDF must be the exact same dimensions. KDP rejects manuscripts where some pages are 8.5 x 11 and others are 8.49 x 10.98 (a rounding error from certain PDF tools). Verify page dimensions in your PDF viewer before uploading.\n\nFile size: Maximum 650 MB for the manuscript PDF. A 200-page black and white puzzle book typically runs 5 to 20 MB, well under the limit. Color interiors with high-resolution images can approach the limit in longer books.\n\nSingle PDF file: KDP accepts one PDF for the interior. You cannot upload multiple files. Merge all pages -- front matter, puzzles, answer keys, back matter -- into a single document.',
    },
    {
      heading: 'Cover Dimensions and Spine Width Calculation',
      content: 'Your book cover is a single image that wraps around the entire book: back cover, spine, and front cover in one file.\n\nCover dimensions formula:\nWidth = back cover width + spine width + front cover width + bleed\nHeight = trim height + bleed\n\nFor a book with bleed cover (all KDP covers have bleed regardless of interior bleed setting):\n- Add 0.125 inches to the left, right, top, and bottom\n\nSpine width calculation:\nSpine width = page count x paper thickness factor\n- White paper: page count x 0.002252 inches\n- Cream paper: page count x 0.0025 inches\n\nExample: 200-page book, 8.5 x 11 trim, white paper:\n- Spine width: 200 x 0.002252 = 0.4504 inches\n- Cover width: 8.5 + 0.4504 + 8.5 + 0.25 = 17.7004 inches\n- Cover height: 11 + 0.25 = 11.25 inches\n\nKDP provides an exact cover calculator at kdp.amazon.com/cover-calculator that generates a template with guides showing the spine area, barcode placement zone, and safe content areas. Always use this calculator for your specific page count and trim size.\n\nCover resolution: 300 DPI minimum. For the example above, your cover image should be at least 5,310 x 3,375 pixels.\n\nFile format: KDP accepts PDF or JPEG for covers. JPEG is simpler and avoids font embedding issues. Export your cover design as a high-quality JPEG at 300 DPI.\n\nBarcode area: KDP automatically places a barcode on the back cover. You must leave a 2 x 1.2 inch clear area in the lower right of the back cover for this barcode. Do not place any critical content in this zone.\n\nSpine text: KDP only allows spine text on books with 79+ pages (white paper) or 73+ pages (cream paper). If your book qualifies, keep spine text centered and sized appropriately -- thin spines require very small font sizes.',
    },
    {
      heading: 'Pre-Upload Checklist: Verifying Your Manuscript',
      content: 'Before uploading to KDP, run through this verification checklist to catch formatting issues that would cause rejection.\n\nPage dimensions: Open your PDF in a viewer and check page size. Every page must match your selected trim size exactly (e.g., 8.5 x 11.0 inches for no-bleed, or 8.625 x 11.25 for bleed).\n\nPage count: Verify total pages. Must be even and at least 24. Count front matter, puzzle pages, answer keys, and back matter.\n\nMargins: Check that no content (grid lines, text, page numbers) falls within the minimum margin area. Pay special attention to pages with large grids -- the grid itself might be fine, but the word list below it might encroach on the bottom margin.\n\nResolution: If your puzzles contain raster images (photos, illustrations), verify they are at least 300 DPI at print size. Low-resolution images appear blurry in print.\n\nFonts: Check that all fonts are embedded. In most PDF viewers, this is under File > Properties > Fonts.\n\nBlank pages: Scroll through the entire manuscript and verify no unintended blank pages exist. A common error is having a blank page between puzzles and answer keys that disrupts numbering.\n\nAnswer key accuracy: Verify that answer key page references match puzzle page numbers. If you reordered puzzles during compilation, the answer key numbering might be off.\n\nColor consistency: Print a sample page on your home printer to verify that black is truly black, lines are crisp, and there are no unexpected gray areas or color artifacts.\n\nKDP online previewer: After uploading, use KDP\'s built-in previewer to scroll through every page. This previewer shows the book exactly as it will print, including gutter and trim. It catches issues your PDF viewer might miss.',
    },
  ],

  platformTips: [
    {
      heading: 'Avoiding the Most Common KDP Rejection Reasons',
      content: 'KDP\'s automated and manual review processes catch specific formatting issues. Knowing these in advance saves rejection cycles.\n\nInconsistent page sizes: Even a 0.01-inch discrepancy between pages causes rejection. If you merge PDFs from different sources, verify all pages are identical dimensions. Use a tool like QPDF or Ghostscript to normalize page sizes across the entire document.\n\nContent in the gutter: KDP\'s review checks for content within the minimum margin zone. Puzzle grids with thin border lines sometimes creep into the gutter margin by a pixel or two. Add a buffer of at least 0.1 inches beyond the minimum margin.\n\nLow-resolution images: Any raster image below 300 DPI triggers a warning or rejection. This includes puzzle grids exported as images, decorative elements, and cover art. Always export at 300 DPI or higher.\n\nMissing fonts: If your PDF references fonts that are not embedded, KDP substitutes them. For puzzle books, this can break grid alignment and layout. Ensure your PDF export settings include font embedding.\n\nIncorrect ISBN placement: If you use your own ISBN, it must appear on the copyright page and the barcode must be on the back cover. If you use KDP\'s free ISBN, do not add any ISBN to your interior -- KDP handles the barcode automatically.',
    },
    {
      heading: 'Formatting Differences Between US and International Marketplaces',
      content: 'KDP prints books in multiple countries, and formatting expectations vary by marketplace.\n\nUS (amazon.com): 8.5 x 11 inches is the standard puzzle book size. Buyers expect large-format activity books. Pricing in USD with 60% royalty tier.\n\nUK (amazon.co.uk): While 8.5 x 11 works, A4 (8.27 x 11.69 inches) is the native paper size. KDP does not support A4 trim, so 8.5 x 11 is your best option. UK printing costs are higher than US.\n\nGermany (amazon.de): Similar to UK. German puzzle book buyers accept 8.5 x 11 format. Printing costs are slightly higher than US.\n\nJapan (amazon.co.jp): Different market expectations. Smaller formats (6 x 9) may perform better. Printing cost structure differs.\n\nExpanded Distribution: If you enable expanded distribution (selling through bookstores and libraries), your book must have a 0.375-inch minimum outside margin regardless of page count. This is stricter than the KDP-only minimum of 0.25 inches.\n\nCurrency conversion: Set prices individually for each marketplace rather than using KDP\'s automatic conversion. Automatic conversion often sets non-round prices (like EUR 6.73) that look unprofessional. Round to clean price points in each currency.',
    },
    {
      heading: 'Print Quality Optimization for Puzzle Grids',
      content: 'Puzzle grids have unique print quality considerations that standard book formatting guides do not cover.\n\nLine weight: Grid lines should be at least 0.5 point (0.007 inches) thick. Thinner lines may not print consistently, especially on KDP\'s high-speed presses. For comfortable solving, 0.75 to 1.0 point lines are optimal.\n\nLetter sizing in grids: For word search and crossword grids, letter height should be at least 10 points for standard books and 14+ points for large print editions. Letters must be clearly distinguishable from each other -- avoid decorative fonts inside puzzle grids.\n\nContrast: Use pure black (K:100 in CMYK or 0,0,0 in RGB) for grid lines and letters on white background. Avoid gray lines (like K:80) -- they can appear faded in print, especially in longer print runs.\n\nGrid alignment: Puzzle grids must align precisely to the page grid. Misaligned grids where cells are slightly different sizes look unprofessional and frustrate solvers. The LessonCraftStudio generators produce mathematically precise grids, but if you are manually adjusting layouts in design software, verify cell uniformity.\n\nAnswer key formatting: Answer keys should be clearly differentiated from puzzle pages. Common approaches include highlighting found words in bold, using a different grid line style (dashed vs solid), or printing answer grids at 80% to 90% of the puzzle grid size. This visual distinction helps solvers navigate between puzzle and answer sections.',
    },
  ],

  monetization: [
    {
      heading: 'How Formatting Quality Affects Sales and Reviews',
      content: 'Formatting is not just about getting your manuscript accepted -- it directly impacts sales performance and buyer satisfaction.\n\nFirst impressions: When a buyer uses Amazon\'s "Look Inside" feature, they see your interior formatting immediately. Cramped margins, fuzzy grids, or inconsistent layouts signal low quality and drive buyers to competitors. Professional formatting with generous margins and crisp grids converts browsers into buyers.\n\nReviews: The most common negative reviews for puzzle books are "print is too small," "lines are hard to see," and "puzzles are too close to the spine." Every one of these is a formatting problem, not a content problem. Proper margins, appropriate grid sizes, and adequate line weights eliminate these complaints.\n\nReturn rate: Amazon\'s return policy allows buyers to return books. Poorly formatted puzzle books have higher return rates, which costs you the royalty plus a return processing fee. Good formatting reduces returns to near zero.\n\nLong-term catalog value: A well-formatted puzzle book sells for years with minimal intervention. A poorly formatted one accumulates negative reviews, drops in rankings, and eventually becomes unsalable. The time you invest in proper formatting pays dividends across the entire life of the product.',
    },
    {
      heading: 'Pricing Strategy Based on Page Count and Format',
      content: 'Your formatting choices directly determine your pricing options and royalty earnings.\n\nPrinting cost is the primary constraint. For black and white interiors, KDP charges $0.85 fixed plus $0.012 per page. For color interiors, the fixed fee is $0.85 plus $0.07 per page.\n\nBlack and white 100-page book (8.5 x 11): Printing cost = $0.85 + (100 x $0.012) = $2.05. At $5.99 list price with 60% royalty: $3.59 - $2.05 = $1.54 royalty per sale.\n\nBlack and white 200-page book (8.5 x 11): Printing cost = $0.85 + (200 x $0.012) = $3.25. At $7.99 list price with 60% royalty: $4.79 - $3.25 = $1.54 royalty per sale.\n\nNotice the royalty is similar despite the price difference -- the extra pages cost almost as much as the extra revenue. This is why page count optimization matters. Find the sweet spot where buyers perceive strong value but printing costs do not consume your margin.\n\nFor most puzzle books, 100 to 120 pages at $5.99 to $6.99 maximizes the royalty-per-sale to volume ratio. Buyers perceive 50 to 60 puzzles as solid value, and printing costs stay under $2.30.\n\n6 x 9 format advantage: Smaller trim sizes have slightly lower printing costs. A 100-page 6 x 9 book costs about $0.20 less to print than an 8.5 x 11 book, and you can price "travel size" puzzle books competitively at $4.99 to $5.99.',
    },
    {
      heading: 'Scaling Production with Consistent Formatting Templates',
      content: 'Once you have a formatting template that passes KDP review, reuse it for every book in your catalog. Consistency accelerates production and ensures quality.\n\nCreate a master template for each trim size you publish. Include pre-set margins, page headers with puzzle numbers, page footers with page numbers, and placeholder areas for puzzle content. Save this as a reusable template in your PDF creation tool.\n\nStandardize your front matter. Use the same title page layout, copyright page text (updating the title and year), and instructions page across all books. These pages take zero creative effort after the first book.\n\nStandardize your back matter. Create a catalog page template that lists your other books with titles and ASINs. Update this page with each new publication. A catalog page in every book cross-promotes your entire lineup.\n\nBatch your cover creation. Use the same cover design template with different titles, themes, and color schemes. A consistent visual brand across your catalog helps buyers recognize your books in search results and encourages series purchases.\n\nTrack your specifications. Maintain a spreadsheet with each book\'s trim size, page count, spine width, cover dimensions, and pricing. This reference prevents errors when creating new editions or updating existing titles.',
    },
  ],

  examples: [
    {
      heading: 'Complete Formatting Spec: 8.5 x 11 Word Search Book',
      content: 'Here is a complete formatting specification for a standard word search puzzle book.\n\nBook: "Nature Word Search -- 75 Themed Puzzles with Answer Keys"\n\nTrim size: 8.5 x 11 inches\nInterior type: Black and white\nPaper type: White\nBleed: No bleed\n\nPage count: 156 pages total\n- Page 1: Title page\n- Page 2: Copyright page\n- Pages 3-4: How to solve instructions\n- Pages 5-79: Puzzle pages (75 puzzles, one per page)\n- Page 80: Answer key title page\n- Pages 81-155: Answer key pages (75 answer keys)\n- Page 156: Catalog page\n\nMargins:\n- Inside (gutter): 1.0 inch\n- Outside: 0.5 inch\n- Top: 0.75 inch\n- Bottom: 0.5 inch\n\nContent area: 7.0 x 9.75 inches\n\nGrid specifications:\n- Grid size: 18x18 cells\n- Cell size: 0.36 x 0.36 inches\n- Grid dimensions: 6.48 x 6.48 inches\n- Letter size: 14 point\n- Grid line weight: 0.75 point\n- Words per puzzle: 10 to 14\n\nWord list placement: Below grid, two columns, 11 point font\n\nSpine width: 156 x 0.002252 = 0.351 inches\nCover dimensions: 8.5 + 0.351 + 8.5 + 0.25 = 17.601 x 11.25 inches\nCover resolution: 5,280 x 3,375 pixels minimum\n\nPrinting cost: $0.85 + (156 x $0.012) = $2.72\nList price: $6.99\nRoyalty at 60%: $4.19 - $2.72 = $1.47 per sale',
    },
    {
      heading: 'Complete Formatting Spec: 6 x 9 Travel Sudoku Book',
      content: 'A compact formatting specification optimized for the travel puzzle book niche.\n\nBook: "Pocket Picture Sudoku -- 120 Puzzles, Easy to Hard"\n\nTrim size: 6 x 9 inches\nInterior type: Black and white\nPaper type: White\nBleed: No bleed\n\nPage count: 132 pages total\n- Page 1: Title page\n- Page 2: Copyright page\n- Page 3: Difficulty guide\n- Page 4: How to solve instructions\n- Pages 5-64: Easy puzzles (2 per page = 120 easy cells, actually 30 pages of 4 grids or 60 pages of 2 grids)\n- Adjusted: Pages 5-64: Puzzles (2 puzzles per page, 60 pages = 120 puzzles)\n- Pages 65-124: Answer keys (2 per page, 60 pages)\n- Pages 125-130: Notes pages\n- Pages 131-132: Catalog page and blank\n\nMargins:\n- Inside (gutter): 0.625 inch\n- Outside: 0.5 inch\n- Top: 0.5 inch\n- Bottom: 0.5 inch\n\nContent area: 4.875 x 8.0 inches\n\nGrid specifications:\n- Two grids per page, stacked vertically\n- Each grid: 2.25 x 2.25 inches\n- Cell size varies by puzzle complexity\n- Grid line weight: 0.75 point\n- Vertical spacing between grids: 0.5 inch\n\nSpine width: 132 x 0.002252 = 0.297 inches (too thin for spine text -- 79 page minimum for white paper)\nCover dimensions: 6.0 + 0.297 + 6.0 + 0.25 = 12.547 x 9.25 inches\n\nPrinting cost: $0.85 + (132 x $0.012) = $2.43\nList price: $5.99\nRoyalty at 60%: $3.59 - $2.43 = $1.16 per sale\n\nThe 6 x 9 format costs less to print and targets the "travel puzzle" keyword niche. Buyers explicitly search for compact puzzle books they can carry in a bag or keep in a car.',
    },
  ],

  faq: [
    {
      question: 'What is the best trim size for KDP puzzle books?',
      answer: '8.5 x 11 inches (US Letter) is the most popular and expected size for puzzle books on Amazon. It offers the largest content area for grids and is what most buyers expect when shopping for word search, crossword, or activity books. Use 6 x 9 for travel editions and 8 x 10 for a slightly compact premium feel.',
    },
    {
      question: 'Do puzzle books need bleed on KDP?',
      answer: 'Most puzzle books do not need bleed. Word search grids, crossword grids, sudoku puzzles, and maze paths all sit within page margins. Select "no bleed" in your KDP setup. Only use bleed if your design includes full-page background colors, edge-to-edge illustrations, or decorative borders that intentionally touch the page edge.',
    },
    {
      question: 'What margins should I use for a 200-page puzzle book?',
      answer: 'For a 200-page 8.5 x 11 puzzle book, use 1.0 inch inside margin (gutter), 0.5 inch outside margin, 0.75 inch top margin, and 0.5 inch bottom margin. These exceed KDP\'s minimums and ensure puzzle content is never swallowed by the binding or cut off at the edge.',
    },
    {
      question: 'How do I calculate spine width for my KDP cover?',
      answer: 'Multiply your total page count by the paper thickness factor. For white paper: page count x 0.002252 inches. For cream paper: page count x 0.0025 inches. A 200-page white paper book has a spine width of 0.4504 inches. KDP provides an exact cover calculator that generates a template with spine guides for your specific book.',
    },
    {
      question: 'What PDF resolution does KDP require?',
      answer: 'KDP requires 300 DPI minimum for all raster images (photos, illustrations, image-based puzzle grids). Text and vector graphics do not have a DPI requirement. The LessonCraftStudio generators export at 300 DPI. Ensure your PDF is under 650 MB total file size.',
    },
    {
      question: 'Can I use color interiors for puzzle books on KDP?',
      answer: 'Yes, but color printing costs significantly more -- approximately $0.07 per page versus $0.012 for black and white. A 200-page color book costs $14.85 to print compared to $3.25 for black and white. Most puzzle books work perfectly in black and white. Use color only if your puzzles require it, such as coloring books or color-coded activity pages.',
    },
    {
      question: 'What is the refund policy for commercial licenses?',
      answer: 'Every generator offers a free trial with watermark so you can test all features, verify formatting, and evaluate output quality before purchasing. Because you can fully evaluate the product before buying, all commercial license sales are final. This is standard practice for digital product tools where the full product can be previewed before purchase.',
    },
  ],

  nextSteps: [
    {
      slug: 'word-search-generator-kdp',
      title: 'Create Word Search Books for KDP',
      description: 'Apply your formatting knowledge to create and publish word search puzzle books on Amazon KDP using the word search generator.',
    },
    {
      slug: 'publish-puzzle-books-kdp',
      title: 'Publish Puzzle Books on Amazon KDP',
      description: 'The complete guide to publishing multiple puzzle book types on KDP, from listing optimization to catalog scaling.',
    },
    {
      slug: 'how-to-publish-worksheet-book-kdp',
      title: 'Publish a Worksheet Book on KDP',
      description: 'End-to-end tutorial for first-time KDP publishers covering account setup, upload, categories, keywords, and pricing.',
    },
  ],

  internalLinks: [
    { pageType: 'app', slug: 'word-search-worksheets', anchorText: 'Word search puzzle generator' },
    { pageType: 'app', slug: 'crossword-worksheets', anchorText: 'Crossword puzzle generator' },
    { pageType: 'app', slug: 'sudoku-worksheets', anchorText: 'Picture sudoku generator' },
    { pageType: 'guide', slug: 'word-search-generator-kdp', anchorText: 'Word search books for KDP' },
    { pageType: 'guide', slug: 'publish-puzzle-books-kdp', anchorText: 'Publishing puzzle books on KDP' },
    { pageType: 'guide', slug: 'kdp-interior-template-worksheets', anchorText: 'KDP interior template guide' },
  ],

  toolsRecommended: [
    {
      appId: 'wordsearch',
      title: 'Word Search Generator',
      description: 'Create word search puzzles with adjustable grids from 5x5 to 30x30. Exports 300 DPI PDFs that meet KDP formatting requirements for puzzle book interiors.',
    },
    {
      appId: 'crossword',
      title: 'Crossword Puzzle Generator',
      description: 'Generate picture crosswords with image clues. Automatically sizes grids and clue sections to fit within KDP margin requirements.',
    },
    {
      appId: 'sudoku',
      title: 'Picture Sudoku Generator',
      description: 'Create picture sudoku puzzles in multiple difficulty levels. Compact grid format allows 2 to 4 puzzles per page for efficient page count management.',
    },
  ],

  visuals: {
    heroImage: { src: '/samples/english/wordsearch/Word Search 10.webp', alt: 'KDP puzzle book interior page showing formatted word search grid with proper margins' },
    samples: [
      { src: '/samples/english/wordsearch/Word Search 11.webp', alt: 'Word search puzzle formatted for 8.5 x 11 KDP interior', caption: 'Word search grid with KDP-compliant margins and 300 DPI export quality' },
      { src: '/samples/english/crossword/crossword_worksheet (10).webp', alt: 'Crossword puzzle formatted for KDP book interior', caption: 'Crossword grid with clue section fitting within KDP safe content area' },
    ],
    youtubeId: '6O5aCzHkh8M',
    videoTitle: 'How to Format Puzzle Books for Amazon KDP',
  },

  themeImages: [
    { src: '/image-library/animals/antelope.webp', alt: 'Antelope -- themed educational image', caption: 'Antelope' },
    { src: '/image-library/animals/bat.webp', alt: 'Bat -- themed educational image', caption: 'Bat' },
    { src: '/image-library/animals/camel.webp', alt: 'Camel -- themed educational image', caption: 'Camel' },
    { src: '/image-library/animals/cat.webp', alt: 'Cat -- themed educational image', caption: 'Cat' },
    { src: '/image-library/animals/dog.webp', alt: 'Dog -- themed educational image', caption: 'Dog' },
  ],
};

export default content;
