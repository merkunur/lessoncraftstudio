import type { CreateXContent } from '../types';

export const content: CreateXContent = {
  guideId: 'kdp-formatting-worksheets',
  locale: 'en',

  seo: {
    titleTag: 'KDP Formatting Guide for Worksheets \u2014 2026',
    metaDescription: 'Master KDP formatting for worksheet and activity books. Complete guide to trim sizes, margins, bleed settings, PDF specs, and avoiding common formatting errors.',
    primaryKeyword: 'kdp formatting guide worksheets',
    secondaryKeywords: [
      'kdp interior formatting',
      'kdp book specifications',
      'format worksheets for amazon',
      'kdp pdf requirements',
      'activity book formatting kdp',
    ],
    lsiKeywords: [
      'kdp trim size guide',
      'kdp margin requirements',
      'kdp bleed settings',
      'pdf resolution kdp',
      'cover template calculator',
      'kdp preview tool',
      'interior layout design',
      'print ready pdf format',
    ],
  },

  visuals: {
    heroImages: {
      primary: '/samples/english/addition/Addition Fun 1.jpeg',
      primaryAlt: 'Math worksheet formatted to KDP specifications',
      secondary: '/samples/english/subtraction/Subtraction Fun 1.jpeg',
      secondaryAlt: 'Activity book interior page with proper KDP margins',
    },
    sampleGallery: [
      { src: '/samples/english/addition/Addition Fun 1.jpeg', alt: 'KDP-formatted math worksheet', caption: 'Proper formatting ensures clean printing on KDP' },
      { src: '/samples/english/subtraction/Subtraction Fun 1.jpeg', alt: 'Worksheet with correct margins', caption: 'Adequate margins prevent content from being cut off' },
      { src: '/samples/english/wordsearch/Word Search (1).jpeg', alt: 'Puzzle page formatted for KDP', caption: 'Grid puzzles require careful margin planning for gutter' },
      { src: '/samples/english/sudoku/Sudoku 1.jpeg', alt: 'Sudoku with KDP-compliant layout', caption: 'Consistent formatting creates professional book interiors' },
    ],
    youtubeId: '6O5aCzHkh8M',
    videoTitle: 'KDP Formatting Guide for Worksheet and Activity Books',
  },

  hero: {
    title: 'KDP Formatting Guide for Worksheets and Activity Books',
    description: 'Proper formatting is the difference between a professional-looking KDP book and one that gets rejected or earns negative reviews. This KDP formatting guide for worksheets covers every technical detail you need to get right: trim sizes, margin requirements, bleed settings, PDF specifications, cover dimensions, and more. Whether you\u2019re publishing math worksheets, word search puzzles, or coloring pages, getting the formatting right ensures your book prints cleanly, looks professional, and passes KDP\u2019s automated quality checks. Follow this guide and you\u2019ll avoid the common formatting pitfalls that trip up first-time publishers.',
  },

  introduction: 'Amazon KDP has specific technical requirements for book interiors and covers. Violating these requirements results in rejected uploads, delayed publications, or \u2014 worst of all \u2014 books that print with cut-off content, skewed grids, or missing page elements. For worksheet and activity books, formatting is particularly important because the content is highly visual. A math problem that\u2019s too close to the gutter becomes illegible. A word search grid that\u2019s too close to the trim edge gets cut off during printing. A coloring page that extends into the margin area looks unprofessional. Understanding KDP\u2019s formatting requirements isn\u2019t difficult, but it does require attention to detail. The three critical areas are: trim size (the physical dimensions of your book), margins (the safe zones around your content), and PDF specifications (resolution, color space, and file format). Get these three right and your book will pass KDP\u2019s quality checks every time. This guide provides the exact specifications for each, along with practical tips for formatting worksheet and activity book interiors. We\u2019ll cover the most common trim sizes, how to calculate margins including the gutter for bound books, how to set up your PDF export settings, and how to use KDP\u2019s cover template calculator. By the end, you\u2019ll have a formatting workflow that produces KDP-compliant files on the first attempt.',

  tutorial: {
    title: 'Step-by-Step: Format Your Worksheet Book for KDP',
    steps: [
      { title: 'Choose the Right Trim Size', description: '8.5 x 11 inches is the standard for worksheet and activity books. This matches US Letter paper, making it easy for buyers to photocopy pages. For travel-sized books, 6 x 9 inches works well. KDP supports many sizes \u2014 check their specifications page.' },
      { title: 'Calculate Your Margins', description: 'For 8.5 x 11 books: outside margins (top, bottom, outside edge) need at least 0.25 inches. The inside (gutter) margin depends on page count \u2014 0.375 inches for under 150 pages, 0.5 inches for 150\u2013300 pages, 0.75 inches for 300+.' },
      { title: 'Set Up Your Document', description: 'Create your document at the exact trim size (8.5 x 11 inches). Set margins as calculated. Use 300 DPI resolution for all images. Set color space to RGB for color interiors or grayscale for black & white.' },
      { title: 'Design Your Interior Layout', description: 'Place one worksheet or puzzle per page. Center content within the safe margin area. Add page numbers at the bottom center or outside edge. Include section headers for organization.' },
      { title: 'Create Front Matter', description: 'Include a title page (book title, author name), a copyright page, and a table of contents. For activity books, add a "How to Use This Book" page with instructions. These pages add professionalism.' },
      { title: 'Format the Answer Keys', description: 'Place answer keys at the back of the book. Number them to correspond with puzzle page numbers. Use a slightly smaller font to fit more answers per page while maintaining readability.' },
      { title: 'Export as KDP-Compliant PDF', description: 'Export as PDF/X-1a or PDF with fonts embedded. Resolution must be 300 DPI minimum. File size limit is 650 MB. Ensure no transparency (flatten if needed). Do not include crop marks in your interior file.' },
      { title: 'Use KDP\u2019s Cover Calculator', description: 'Go to KDP\u2019s cover calculator tool and enter your trim size, page count, and paper type. It generates a template with exact dimensions including spine width. Design your cover to match this template exactly.' },
      { title: 'Preview with KDP\u2019s Previewer', description: 'After uploading, use KDP\u2019s online previewer to check every page. Look for content too close to margins, misaligned elements, and quality warnings. Fix any flagged issues before publishing.' },
      { title: 'Order a Proof Copy', description: 'Before promoting your book, order a printed proof. Check print quality, margin adequacy, and overall presentation. Test that worksheets are writable with pencil. Fix any issues discovered in the proof.' },
    ],
  },

  platformTips: [
    { platform: 'Amazon KDP', title: 'Use Safe Zones for Critical Content', description: 'Keep all essential content at least 0.5 inches from any edge, even if KDP\u2019s minimum is 0.25 inches. Printing variations can cause slight shifts. Extra margin space ensures nothing critical gets cut off.' },
    { platform: 'Amazon KDP', title: 'Mirror Margins for Even/Odd Pages', description: 'For bound books, use mirrored margins where the gutter alternates between left and right pages. This ensures consistent visual spacing when the book is open. Most PDF creation tools support mirrored margins.' },
    { platform: 'Amazon KDP', title: 'Choose Black & White for Cost Savings', description: 'Color printing costs significantly more, reducing your royalties. Most worksheets and puzzles work perfectly in black and white. Reserve color for covers only. B&W interiors can still include grayscale shading.' },
    { platform: 'Amazon KDP', title: 'Avoid Common Rejection Reasons', description: 'The most common KDP rejections are: content outside the safe zone, low-resolution images (under 300 DPI), password-protected PDFs, and blank pages at the end. Check all of these before uploading.' },
  ],

  monetization: [
    { title: 'Template Business', description: 'Once you\u2019ve perfected your formatting workflow, you can create books faster than competitors. A well-designed template file lets you swap in new content and publish in hours rather than days.' },
    { title: 'Multiple Format Editions', description: 'Publish the same content in different trim sizes: standard (8.5 x 11), travel (6 x 9), and large print (8.5 x 11 with enlarged content). Each format is a separate listing capturing different keywords.' },
    { title: 'Premium Formatting Pricing', description: 'Books with superior formatting \u2014 clean layouts, professional typography, organized sections \u2014 justify higher prices ($7.99\u2013$9.99 vs. $5.99) because they look and feel more professional.' },
    { title: 'Formatting as a Service', description: 'Once you master KDP formatting, offer your skills to other publishers on Fiverr or Upwork. KDP interior formatting is a sought-after skill, and many publishers outsource this work.' },
  ],

  examples: 'Here\u2019s a practical formatting workflow for a math activity book. Start with a new document at 8.5 x 11 inches, 300 DPI, RGB color space. Set margins: top 0.5 inches, bottom 0.5 inches, outside 0.5 inches, inside (gutter) 0.625 inches (for a 100-page book). Page 1: Title page with book title centered, author name, and a decorative border. Page 2: Copyright notice and terms of use. Page 3: Table of contents listing sections and page numbers. Page 4: "How to Use This Book" with instructions for parents/teachers. Pages 5\u201384: Math worksheets, one per page, centered in the safe zone with page numbers at the bottom. Pages 85\u201395: Answer keys with corresponding page references. Page 96: "About the Author" with a link to your other books. The total page count (96) must be even for KDP. If your content doesn\u2019t naturally end on an even page, add a "Notes" page or an additional answer key page. For the cover: use KDP\u2019s cover calculator to get exact dimensions. A 96-page book with white paper at 8.5 x 11 has a spine width of approximately 0.24 inches. The total cover width is 8.5 + 0.24 + 8.5 + 0.25 (bleed on each side) = 17.49 inches. The total cover height is 11 + 0.25 + 0.25 = 11.5 inches. Design your cover at these exact dimensions with 0.125 inches of bleed on all edges.',

  faq: [
    { question: 'What trim size should I use for activity books?', answer: '8.5 x 11 inches is the standard for worksheet and activity books. It matches US Letter paper for easy photocopying and provides ample space for puzzles and activities. For travel-sized editions, 6 x 9 inches is a popular alternative.' },
    { question: 'What resolution does KDP require?', answer: 'KDP requires a minimum of 300 DPI (dots per inch) for all images. Text-only content can be at any resolution since KDP renders text from embedded fonts. Always export at 300 DPI to ensure crisp printing.' },
    { question: 'How do I calculate the gutter margin?', answer: 'The gutter (inside) margin depends on page count. Under 150 pages: 0.375 inches minimum. 150\u2013300 pages: 0.5 inches minimum. Over 300 pages: 0.75 inches minimum. Add 0.125 inches to these minimums for extra safety.' },
    { question: 'Should I use bleed for activity book interiors?', answer: 'Only enable bleed if your designs extend to the page edges (like full-page coloring designs). For standard worksheets and puzzles with white borders, no-bleed is simpler and sufficient.' },
    { question: 'What file format does KDP accept for interiors?', answer: 'KDP accepts PDF files for paperback interiors. The PDF must have embedded fonts, no security restrictions, and be formatted at the exact trim size. Maximum file size is 650 MB. Use PDF/X-1a for best compatibility.' },
    { question: 'How much does LessonCraft Studio cost?', answer: 'Individual apps are available at $27 for a Commercial License or $47 for Full Access. Bundles are available at $79 for a Commercial License or $119 for Full Access. All purchases are one-time payments with no recurring fees.' },
    { question: 'What is the refund policy?', answer: 'All sales are final due to the digital nature of the product. Once a license key is delivered and activated, it cannot be returned. Use the free version to test everything first.' },
  ],

  internalLinks: [
    { slug: 'addition', pageType: 'app', anchorText: 'Addition Worksheet Generator' },
    { slug: 'subtraction', pageType: 'app', anchorText: 'Subtraction Worksheet Generator' },
    { slug: 'math-activity-books-kdp', pageType: 'guide', anchorText: 'Math Activity Books for Amazon KDP' },
    { slug: 'publish-puzzle-books-kdp', pageType: 'guide', anchorText: 'Publish Puzzle Books on Amazon KDP' },
    { slug: 'word-search-books-kdp', pageType: 'guide', anchorText: 'Word Search Books on Amazon KDP' },
  ],
};
