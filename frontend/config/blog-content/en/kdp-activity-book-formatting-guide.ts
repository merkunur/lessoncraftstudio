import type { BlogContent } from '../types';

const content: BlogContent = {
  seo: {
    primaryKeyword: 'kdp activity book formatting step by step',
    secondaryKeywords: [
      'format activity book Amazon KDP',
      'KDP interior formatting worksheets',
      'activity book layout KDP publishing',
    ],
    lsiKeywords: [
      'KDP manuscript formatting guide',
      'activity book trim size KDP',
      'self-publish activity book Amazon',
    ],
    titleTag: 'KDP Activity Book Formatting Guide | LessonCraftStudio',
    metaDescription: 'Step-by-step guide to formatting activity books for Amazon KDP. Trim sizes, margins, page counts, and cover specs for puzzle and worksheet books.',
  },
  hero: {
    title: 'KDP Activity Book Formatting: Step-by-Step Guide',
    tagline: 'Get your manuscript right the first time — no rejections',
    description: 'Amazon KDP rejects manuscripts that don\'t meet their formatting specs — and rejected manuscripts mean wasted days of work. Activity books have specific requirements for trim size, margins, bleed, and page count that differ from standard book publishing. This guide walks through every formatting decision for worksheet and puzzle activity books, with the exact specs that get approved on the first submission.',
  },
  category: 'platform-strategy',
  introduction: 'KDP formatting seems intimidating but follows simple rules once you understand them. The most common reason activity books get rejected is incorrect margins or bleed settings. The second most common reason is file size exceeding limits. This guide eliminates both problems by giving you the exact specifications for each book type, plus practical tips for keeping file sizes manageable.',
  sections: [
    {
      heading: 'Choosing the Right Trim Size',
      content: 'Trim size is the finished size of your book after printing. For activity books, three sizes work best:\n\n**8.5" x 11" (US Letter) — Recommended for most activity books:**\n- Matches standard printer paper, so pages can be photocopied\n- Enough space for complex puzzles and detailed worksheets\n- Most popular size for children\'s activity books on Amazon\n- Printing cost: slightly higher but justified by market expectations\n\n**8.5" x 8.5" (Square) — For younger children:**\n- Feels more like a "picture book" format\n- Good for coloring books and simple matching activities\n- Lower printing cost than 8.5x11\n\n**6" x 9" (Standard book) — For word-based puzzles:**\n- Works for word search, crossword, and sudoku books\n- Lowest printing cost\n- Less suitable for worksheets that need writing space\n\nFor most worksheet and puzzle activity books, choose 8.5" x 11". It\'s what buyers expect and what teachers can photocopy.',
    },
    {
      heading: 'Margin and Bleed Settings',
      content: 'Margins prevent content from being cut off during printing. KDP has minimum requirements:\n\n**For books WITHOUT bleed (most activity books):**\n- Outside margin: 0.25" minimum\n- Inside (gutter) margin: varies by page count:\n  - 24-150 pages: 0.375"\n  - 151-400 pages: 0.5"\n  - 401-600 pages: 0.625"\n- Top/bottom margin: 0.25" minimum\n\n**For books WITH bleed (images extending to edge):**\n- Add 0.125" bleed on all three outer edges (not the gutter)\n- Use bleed only if your design intentionally extends to the page edge\n\n**Recommendation for activity books:** No bleed, with 0.5" margins on all sides. This gives comfortable writing space and ensures no content gets cut off. Keep all important content at least 0.5" from any edge.\n\nSet your document size to exactly 8.5" x 11" with these margins before creating any content.',
    },
    {
      heading: 'Interior File Requirements',
      content: '**File format:** PDF (required)\n\n**Resolution:** 300 DPI for images (lower resolutions print blurry). For B&W interiors, 300 DPI is also recommended.\n\n**Color space:**\n- B&W interior: Use grayscale color space. All images must be true grayscale, not RGB black.\n- Color interior: Use RGB color space (KDP converts to CMYK internally).\n\n**File size limit:** 650 MB maximum. For activity books with many images, this can be a concern. Compress images before assembling the PDF.\n\n**Font embedding:** All fonts must be embedded in the PDF. This prevents font substitution that could change your layout.\n\n**Page count:**\n- Minimum: 24 pages\n- Maximum: 828 pages\n- Must be an even number (add a blank page if needed)\n- Include front matter (title page, copyright page) and back matter (answer keys)\n\n**Recommended page count for activity books:**\n- Budget/entry level: 50-70 pages at $5.99-$6.99\n- Standard: 80-120 pages at $7.99-$9.99\n- Premium: 120-160 pages at $9.99-$12.99',
    },
    {
      heading: 'Cover Design Specifications',
      content: 'Your cover is a single PDF or JPEG wrapping front, spine, and back:\n\n**Dimensions:** Use KDP\'s Cover Calculator (in your KDP dashboard) for exact dimensions based on your page count and trim size.\n\n**Spine width:** Calculated by page count. For a 100-page 8.5x11 book: approximately 0.23" spine width.\n\n**Resolution:** 300 DPI minimum.\n\n**Cover content best practices for activity books:**\n- Front: Show 2-3 sample puzzle/worksheet pages from inside the book\n- Include age range: "Ages 4-8" prominently displayed\n- Include page count: "100+ Activities Inside"\n- Include "With Answer Keys" if applicable\n- Spine: Book title + author name\n- Back: Brief description, 3-4 sample page thumbnails, barcode area (leave blank — KDP adds it)\n\n**File format:** PDF preferred (maintains vector quality). JPEG at 300 DPI also accepted.',
    },
    {
      heading: 'Common Formatting Mistakes to Avoid',
      content: '**1. Wrong page count (odd number):** KDP requires even page counts. Always add a blank page at the end if your content creates an odd number.\n\n**2. Content in the gutter:** Text or images too close to the inner edge get lost in the binding. Keep at least 0.375" clear on the inside edge.\n\n**3. Low-resolution images:** 72 DPI web images print blurry. Always use 300 DPI for print-quality output. Check image resolution BEFORE assembling your PDF.\n\n**4. RGB black instead of true black:** For B&W interiors, use true grayscale. RGB "black" (0,0,0 in RGB) may print with a slight color tint.\n\n**5. Missing fonts:** If fonts aren\'t embedded, KDP substitutes them, potentially breaking your layout. Always embed fonts when exporting to PDF.\n\n**6. File too large:** Compress images before assembly. A 100-page B&W activity book should be under 50 MB. Color books should be under 200 MB.',
    },
  ],
  keyTakeaways: [
    'Use 8.5" x 11" trim size for most worksheet and puzzle activity books',
    'Set 0.5" margins on all sides with no bleed for activity books',
    'All images must be 300 DPI — lower resolutions print blurry and cause rejections',
    'Page count must be even, minimum 24 pages, and target 80-120 pages for standard books',
    'Use KDP\'s Cover Calculator for exact cover dimensions based on your page count',
  ],
  faq: [
    {
      question: 'Should I use B&W or color interior for activity books?',
      answer: 'B&W for math worksheets, word puzzles, and any activity where kids write answers (lower printing cost = higher royalty). Color for visual puzzles like picture sudoku, find-the-differences, or coloring books where color is essential to the activity.',
    },
    {
      question: 'What software should I use for KDP formatting?',
      answer: 'For simple activity books: Google Docs or Microsoft Word can export to PDF. For complex layouts: Canva (free), Affinity Publisher ($70 one-time), or Adobe InDesign (subscription). Many sellers format successfully with free tools.',
    },
    {
      question: 'How long does KDP review take?',
      answer: 'Typically 24-72 hours for initial review. If your manuscript is rejected, you\'ll receive specific error messages. Fix the issues and resubmit — second reviews are usually faster.',
    },
  ],
  internalLinks: [
    { pageType: 'guide', slug: 'publish-puzzle-books-kdp', anchorText: 'KDP puzzle book publishing guide' },
    { pageType: 'start', slug: 'amazon-kdp-activity-books', anchorText: 'Start creating KDP activity books' },
    { pageType: 'app', slug: 'math-puzzle-worksheets', anchorText: 'Math Puzzle Generator' },
    { pageType: 'app', slug: 'word-search-worksheets', anchorText: 'Word Search Generator' },
  ],
  relatedPosts: [
    { slug: 'create-activity-book-kdp-start-finish', title: 'Create a KDP Activity Book from Start to Finish' },
    { slug: 'math-puzzle-books-amazon-kdp', title: 'Create Math Puzzle Books for Amazon KDP' },
    { slug: 'crossword-books-kdp-niche', title: 'Crossword Books on KDP: Low-Competition Goldmine' },
  ],
  cta: {
    heading: 'Generate Content for Your KDP Book',
    description: 'Create 100+ pages of professional worksheets and puzzles. Free trial with watermark.',
    buttonText: 'Explore All 33 Generators',
    buttonUrl: '/apps',
  },
};

export default content;
