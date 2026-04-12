import type { BlogContent } from '../types';

const content: BlogContent = {
  seo: {
    primaryKeyword: 'KDP interior formatting guide',
    secondaryKeywords: [
      'KDP activity book formatting',
      'Amazon KDP page size margins',
      'activity book interior PDF settings',
    ],
    lsiKeywords: [
      'KDP bleed settings',
      'activity book page dimensions',
      'PDF export print ready',
      'KDP manuscript upload specifications',
    ],
    titleTag: 'KDP Activity Book Interior Formatting | Complete Guide',
    metaDescription: 'Complete KDP interior formatting guide for activity books. Page sizes, margins, bleed settings, fonts, page numbering, and PDF export settings for Amazon publishing.',
  },
  hero: {
    title: 'KDP Activity Book Interior Formatting: The Complete Guide',
    tagline: 'Get every page size, margin, and bleed setting right the first time',
    description: 'Amazon KDP rejects manuscripts with incorrect formatting — and their error messages are notoriously unhelpful. This guide covers every interior formatting specification for activity books: trim sizes, margins, bleed, fonts, page numbering, and PDF export settings. Follow these specs and your manuscript uploads cleanly the first time.',
  },
  category: 'platform-strategy',
  introduction: 'Interior formatting is where most first-time KDP publishers stumble. Amazon\'s specifications are precise, and deviation results in rejection or poor print quality. Activity books have additional complexity because they mix images, puzzles, and text on the same page. This guide provides exact specifications for the most common activity book formats, plus the PDF export settings that ensure clean uploads every time.',
  sections: [
    {
      heading: 'Choosing the Right Trim Size',
      content: 'KDP supports dozens of trim sizes, but activity books perform best in a handful of standard dimensions:\n\n**8.5 x 11 inches (Letter)** — The most popular size for children\'s activity books. Provides maximum workspace for puzzles, coloring, and writing activities. Matches standard US paper size for easy at-home printing by buyers.\n\n**8.5 x 8.5 inches (Square)** — Popular for coloring books and simpler activity books targeting younger children. The square format feels more premium and stands out in search results.\n\n**6 x 9 inches** — Standard for puzzle books targeting adults (crosswords, word searches, sudoku). More portable than letter size. Lower printing costs due to smaller page area.\n\n**8 x 10 inches** — A versatile middle ground. Large enough for detailed activities but slightly more compact than letter. Common for general-purpose activity books.\n\n**How to choose:** Consider your target audience and activity type. Children\'s worksheets with writing space need 8.5 x 11. Adult puzzle books work better at 6 x 9. Coloring books suit 8.5 x 8.5 or 8.5 x 11. Use the KDP Size Calculator to see exact dimensions with margins for your chosen trim size.',
    },
    {
      heading: 'Margin Specifications for Activity Books',
      content: 'KDP requires minimum margins that vary by page count and trim size. For activity books, use these specifications:\n\n**Outside margins (top, bottom, outside edge):**\n- Minimum: 0.25 inches for all trim sizes\n- Recommended for activity books: 0.5 inches to keep content away from the cut line\n\n**Inside margin (gutter — the binding edge):**\nThe gutter must be wider to account for the binding. KDP specifies minimum gutter based on page count:\n- 24-150 pages: 0.375 inches minimum\n- 151-300 pages: 0.5 inches minimum\n- 301-500 pages: 0.625 inches minimum\n- 501-700 pages: 0.75 inches minimum\n- 701+ pages: 0.875 inches minimum\n\n**Recommended gutters for activity books:** Add 0.125 inches to KDP\'s minimum. Activity books need extra gutter because children press pages flat to write, and tight gutters make the binding-edge content difficult to access.\n\n**Safe zone:** Keep all critical content (puzzle grids, writing lines, numbered items) at least 0.5 inches from any edge. Decorative elements like borders can extend closer to the margins.\n\n**The KDP Size Calculator** computes exact margin requirements for any trim size and page count combination, eliminating guesswork.',
    },
    {
      heading: 'Bleed vs. No-Bleed Interiors',
      content: 'Bleed determines whether your content extends to the very edge of the page after trimming:\n\n**No-bleed (most activity books):** Content has a white border around every page. This is the standard for worksheet-style activity books, puzzle books, and any book where content is contained within margins. Document size equals trim size exactly.\n\n**Bleed (coloring books, full-page art):** Content extends past the trim line so there\'s no white border after cutting. Required for full-page illustrations, coloring pages, and any design that goes edge-to-edge.\n\n**Bleed specifications:**\n- Top bleed: 0.125 inches\n- Bottom bleed: 0.125 inches\n- Outside edge bleed: 0.125 inches\n- Inside edge (gutter): No bleed — the binding edge is never trimmed\n\n**Document size with bleed:** Your document dimensions must include the bleed area. For an 8.5 x 11 inch book with bleed:\n- Page width: 8.5 + 0.125 (outside) = 8.625 inches\n- Page height: 11 + 0.125 (top) + 0.125 (bottom) = 11.25 inches\n\n**Which to choose for activity books:** Most activity books use no-bleed interiors. The content (puzzles, worksheets, writing exercises) naturally has margins. Choose bleed only if your pages have full-page background colors or edge-to-edge artwork.',
    },
    {
      heading: 'Font Selection and Text Formatting',
      content: 'Fonts directly affect readability, print quality, and KDP acceptance:\n\n**Embed all fonts.** KDP requires every font used in your PDF to be embedded. Missing font embeddings cause rejections. When exporting to PDF, always select "embed all fonts" in your export settings.\n\n**Recommended fonts for activity books:**\n- **Instructions and body text:** Arial, Helvetica, Open Sans, or Roboto at 11-14pt. Clean sans-serif fonts are most readable for activity instructions.\n- **Titles and headings:** Bold weights of your body font, or decorative fonts at 18-24pt. Ensure decorative fonts are fully legible.\n- **Worksheet content (numbers, letters):** Use fonts designed for educational content. Large, clear letterforms with consistent stroke width. 14-18pt minimum for children\'s worksheets.\n- **Answer keys:** Same font as worksheet content, but can be reduced to 9-11pt.\n\n**Minimum text size:** KDP technically accepts any size, but for print readability:\n- Body text: 10pt minimum (12pt recommended)\n- Children\'s content: 14pt minimum\n- Fine print: 8pt minimum\n\n**Line spacing:** Use 1.2-1.5x line spacing for body text. Worksheet content with writing lines needs at least 0.4 inches between lines for children to write comfortably.\n\n**Color considerations:** Use true black (CMYK: 0,0,0,100 or RGB: 0,0,0) for text. Avoid rich black (mixed CMYK values) for small text as it can appear blurry in print due to registration variation.',
    },
    {
      heading: 'Page Numbering and Front Matter',
      content: 'Professional activity books include proper front matter and page numbering:\n\n**Front matter structure:**\n1. **Title page** (page 1, right-hand page) — Book title, subtitle, optional branding\n2. **Copyright page** (page 2, left-hand page) — Copyright notice, ISBN if applicable, printing information\n3. **Table of contents** (optional, page 3) — Useful for books with distinct sections\n4. **Instructions page** (optional) — How to use the book\n5. **Activity pages begin** — First activity should start on a right-hand page (odd number)\n\n**Page numbering guidelines:**\n- Start numbering on the first activity page, not the title page\n- Place numbers at the bottom center or bottom outside corner\n- Use 8-9pt font size for page numbers\n- Do not number the title page, copyright page, or table of contents\n- Answer key section can use its own numbering (e.g., "Answers - Page 1")\n\n**KDP page count requirements:**\n- Minimum: 24 pages (including front matter)\n- Maximum: 828 pages\n- Must be an even number (KDP adds a blank page if odd)\n\n**Answer key placement:** Place answer keys at the back of the book, after all activity pages. Include a clear "Answer Key" section divider page. Reference the answer key on the first activity page so buyers know where to find it.\n\n**Pro tip:** KDP counts every physical page, including blanks. If your activity works best on right-hand pages only, add intentional blank pages with a small "This page intentionally left blank" note or a decorative border.',
    },
    {
      heading: 'PDF Export Settings for KDP',
      content: 'Your PDF export settings determine whether KDP accepts or rejects your manuscript:\n\n**Required PDF specifications:**\n- Format: PDF/X-1a:2001 or PDF/X-3:2002 (preferred), or standard PDF with fonts embedded\n- Resolution: 300 DPI minimum for all images\n- Color space: CMYK for color interiors, Grayscale for black-and-white\n- Font embedding: All fonts must be embedded (no linked or system fonts)\n- Transparency: Fully flattened (no transparent objects)\n- Layers: Flattened (no layers in the PDF)\n\n**Image resolution guidelines:**\n- Line art (puzzles, mazes, grids): 300-600 DPI\n- Photographs: 300 DPI minimum\n- Illustrations: 300 DPI minimum\n- Text rendered as images: 600 DPI for crisp edges\n\n**Common rejection causes:**\n- Images below 300 DPI (the most common issue)\n- Fonts not embedded\n- Incorrect trim size (document size doesn\'t match selected KDP trim)\n- Content extending into bleed area on no-bleed books\n- RGB color space when CMYK is required for color printing\n\n**File size:** KDP accepts PDFs up to 650 MB, but aim to keep files under 200 MB for faster upload and processing. Compress images before placing them if your file is too large.\n\n**Final check before upload:** Open your PDF at 100% zoom and inspect every page. Verify margins, check image quality, confirm page order, and ensure the total page count is even.',
    },
    {
      heading: 'Formatting Worksheet Generator Output for KDP',
      content: 'If you\'re using worksheet generators to create KDP activity book interiors, here\'s how to bridge the gap between generator output and KDP-ready manuscripts:\n\n**Step 1: Generate worksheets at the correct page size.** Set your generator to output at your target KDP trim size. If the generator uses US Letter (8.5 x 11), you can publish at that trim size directly.\n\n**Step 2: Compile pages in order.** Arrange your generated worksheets in a logical sequence: start with easier activities and progress to harder ones. Group by theme or type within the book.\n\n**Step 3: Add front matter.** Create a title page, copyright page, and optional table of contents. These can be simple text pages — no design skills needed.\n\n**Step 4: Place answer keys at the end.** Generators produce answer keys automatically. Compile them in the same order as the activity pages.\n\n**Step 5: Verify page count.** Ensure your total page count (front matter + activities + answer keys) is an even number and meets the 24-page minimum. Add blank pages if needed.\n\n**Step 6: Export with correct settings.** Use the PDF specifications from the previous section. Verify 300 DPI, embedded fonts, and correct trim dimensions.\n\n**Step 7: Run the KDP previewer.** Before uploading, download Amazon\'s KDP Print Previewer tool. It shows exactly how your book will look in print, including spine and cover alignment.\n\nThe entire process from generator output to KDP-ready manuscript takes about 30-60 minutes once you\'ve done it twice. The KDP Size Calculator provides exact dimensions for any trim size and page count.',
    },
  ],
  keyTakeaways: [
    '8.5 x 11 inches is the standard trim size for children\'s activity books; 6 x 9 for adult puzzle books',
    'Gutter margins must increase with page count — add 0.125 inches beyond KDP minimums for activity books',
    'Most activity books use no-bleed interiors; only choose bleed for edge-to-edge artwork',
    'All images must be 300 DPI minimum; embed all fonts; flatten transparency before export',
    'Use the KDP Size Calculator to compute exact margins and dimensions for any format',
  ],
  faq: [
    {
      question: 'What happens if my formatting is slightly off?',
      answer: 'KDP will either reject the manuscript outright or accept it with quality warnings. Rejection messages often lack specifics, so getting formatting right the first time saves hours of troubleshooting. Use the KDP Print Previewer before uploading to catch issues.',
    },
    {
      question: 'Can I use color interiors for activity books?',
      answer: 'Yes, but color printing costs more, which reduces your royalty per sale. Many successful activity book publishers use black-and-white interiors to maximize royalties. The exception is coloring books, which need color covers but typically have black-and-white interiors anyway.',
    },
    {
      question: 'How many pages should an activity book have?',
      answer: 'The sweet spot for most activity books is 50-120 pages. This provides enough content to justify a $5.99-$9.99 price point while keeping printing costs reasonable. Books under 50 pages feel thin; books over 150 pages have significantly higher printing costs that cut into royalties.',
    },
  ],
  internalLinks: [
    { pageType: 'tool', slug: 'kdp-size-calculator', anchorText: 'KDP Size Calculator' },
    { pageType: 'tool', slug: 'kdp-royalty-calculator', anchorText: 'Calculate your KDP royalties' },
    { pageType: 'guide', slug: 'create-activity-book-kdp', anchorText: 'Full KDP activity book creation guide' },
    { pageType: 'app', slug: 'word-search-worksheets', anchorText: 'Generate word search pages for KDP' },
  ],
  relatedPosts: [
    { slug: 'create-activity-book-kdp-start-finish', title: 'Create an Activity Book for KDP: Start to Finish' },
    { slug: 'kdp-expanded-distribution-activity-books', title: 'KDP Expanded Distribution: Is It Worth It for Activity Books?' },
    { slug: 'math-puzzle-books-amazon-kdp', title: 'Math Puzzle Books on Amazon KDP: A Profitable Niche' },
  ],
  cta: {
    heading: 'Generate KDP-Ready Activity Pages',
    description: 'Create professionally formatted worksheets with answer keys in minutes. Compile into KDP books effortlessly. Free trial with watermark.',
    buttonText: 'Try a Worksheet Generator',
    buttonUrl: '/apps',
  },
};

export default content;
