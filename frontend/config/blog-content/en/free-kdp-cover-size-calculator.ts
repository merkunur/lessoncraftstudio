import type { BlogContent } from '../types';

const content: BlogContent = {
  seo: {
    primaryKeyword: 'free KDP cover size calculator',
    secondaryKeywords: [
      'kdp spine width calculator',
      'kdp paperback cover dimensions',
      'kdp cover template generator',
      'kdp trim size bleed margin',
      'kdp interior margin calculator',
    ],
    lsiKeywords: [
      'kdp cover design',
      'paperback spine formula',
      'kdp bleed settings',
      'kdp margin requirements',
      'amazon paperback dimensions',
    ],
    titleTag: 'Free KDP Cover Size Calculator with Interactive Diagram',
    metaDescription: 'Calculate exact KDP paperback cover dimensions, spine width, bleed and margins with a live visual diagram. All trim sizes, both paper types, free, no signup.',
  },
  hero: {
    title: 'Free KDP Cover Size Calculator with Interactive Diagram',
    tagline: 'Spine width, bleed and margins, visualized in real time',
    description: 'Getting your KDP cover dimensions wrong is the number one reason paperbacks get rejected in review. Off by 0.1 inch? Rejected. Spine text on a 60-page book? Rejected. Bleed missing? Rejected. Amazon\'s own cover template tool is hidden behind a KDP login, and the third-party calculators we tried all output numbers with no visual reference. So we built the one we wanted: a free cover size calculator with a live SVG diagram that redraws itself as you type.',
  },
  category: 'how-to',
  introduction: 'The spine width of a KDP paperback is not a fixed number \u2014 it depends on page count and paper type, with different multipliers for white versus cream. Nobody memorizes those formulas, and every time you design a new cover you end up re-deriving them or downloading a fresh KDP template. Our [free KDP cover size calculator](/tools/kdp-size-calculator) handles the math and draws you a labeled diagram at the same time, so you can hand a single screenshot to your cover designer and know they have every dimension they need. This post walks through why we built it and how it fits into a KDP publishing workflow.',
  sections: [
    {
      heading: 'The Problem: Cover Rejections Eat Launch Momentum',
      content: 'When KDP rejects a cover, you lose days. The rejection email is always vague \u2014 something about "file dimensions do not match the trim size" or "spine text too close to the fold" \u2014 and you have to open the file, guess what went wrong, fix it, re-upload, and wait 24 to 72 hours for a new review. If you are launching a coloring book or activity book on a seasonal deadline, that round trip is brutal.\n\nThe root cause is almost always the same: the cover file was built against the wrong spine width or the wrong bleed. Amazon\'s spine formula is page count times a paper-specific multiplier (0.002252" for white paper, 0.0025" for cream), plus bleed added to every outer edge. If your book has fewer than 79 pages, Amazon will not let you put any text on the spine at all \u2014 another common rejection trigger that publishers forget.\n\nNone of that is hard math. It is just annoying math you do not want to redo for every book. Our tool turns it into a form. For the full formatting workflow, we also recommend reading our [KDP formatting worksheets guide](/guides/kdp-formatting-worksheets) and checking the specs in our [quality standards guide](/guides/quality-standards-worksheets).',
    },
    {
      heading: 'What We Built',
      content: 'The calculator has one job: take your book specs and hand you every dimension a cover designer needs, visually.\n\n**Interactive SVG diagram.** Change a field and the diagram redraws itself \u2014 back cover, spine, front cover, bleed zones and safe areas all visible with labels. Your cover designer can screenshot this and use it as the source of truth instead of digging through Amazon documentation.\n\n**All trim sizes.** Every paperback trim Amazon supports (16 options from 5" x 8" up to 8.5" x 11") plus the 5 hardcover trims. The formulas change slightly between paperback and hardcover, and the tool handles that automatically.\n\n**Both paper types.** White and cream have different spine multipliers, so the same 200-page book has a different spine width depending on your paper choice. The tool shows both side-by-side so you can decide which to use before locking your design.\n\n**Pixel dimensions at 300 DPI.** Cover designers work in pixels, not inches, and the calculator gives both. Copy the pixel width and height into your design file and you are ready to go.\n\n**Margin requirements by page count.** Amazon\'s interior margin rules depend on how thick your book is \u2014 a 150-page book has looser gutter requirements than a 550-page book. The tool also outputs the minimum interior margins, which matters because the interior and cover files both go through the same review process. Once you have your dimensions, run your price through the [KDP royalty calculator](/tools/kdp-royalty-calculator) to confirm the whole project still makes money.',
    },
    {
      heading: 'How to Use It',
      content: 'The full flow:\n\n1. Open the [KDP cover size calculator](/tools/kdp-size-calculator).\n2. Pick your trim size (6" x 9" is the sweet spot for most activity books and workbooks).\n3. Enter your final interior page count.\n4. Pick your paper type (white is more common for B&W interiors, cream reads softer for text-heavy books).\n5. The diagram updates instantly with spine width, full cover width, cover height, bleed zones and safe areas labeled.\n6. Copy the dimensions or screenshot the diagram to hand to your designer.\n\nIf you are still finalizing your page count \u2014 for example, because you are still laying out the interior \u2014 try it with both your minimum and maximum page counts so you can see how much the spine will grow. This is the difference between a cover that fits and one that gets rejected at upload.',
    },
    {
      heading: 'Why We Made This Free',
      content: 'We build tools for the same people who publish on KDP \u2014 printable sellers who turn worksheet generators like our [math puzzle maker](/tools/math-puzzle-maker) into activity books. When a publisher can size and price a book in five minutes instead of an afternoon, they publish more books. That is good for them and good for us. No paywall, no signup, no email capture. If you want to see our other free tools, the royalty calculator and niche finder are in the same family.',
    },
  ],
  keyTakeaways: [
    'KDP spine width depends on page count AND paper type \u2014 white and cream use different multipliers',
    'Books under 79 pages cannot have spine text at all \u2014 a common rejection trigger',
    'Bleed must be added to every outer edge of the cover artwork',
    'The interactive diagram gives you a labeled screenshot to send to your cover designer',
    'Free to use, no signup, all 16 paperback and 5 hardcover trim sizes supported',
  ],
  faq: [
    {
      question: 'Does it work for hardcover books too?',
      answer: 'Yes. All 5 hardcover trim sizes are supported alongside the 16 paperback trims. The spine formula differs slightly for hardcover, and the calculator handles that automatically.',
    },
    {
      question: 'What paper type should I pick?',
      answer: 'For B&W activity books and coloring books, white paper is most common \u2014 it costs the same and renders line art more crisply. Cream paper is preferred for text-heavy books like novels and workbooks because it is easier on the eyes during long reading sessions. Cream has a slightly thicker spine at the same page count.',
    },
    {
      question: 'Do bleed and finish affect my KDP printing cost?',
      answer: 'No. Bleed settings and cover finish (matte or glossy) do not affect printing cost. Only page count, ink type and trim size category affect cost. Use the [KDP royalty calculator](/tools/kdp-royalty-calculator) to see the cost breakdown for your book.',
    },
    {
      question: 'Can I use the diagram with my cover designer?',
      answer: 'Yes \u2014 that is exactly what we built it for. Screenshot the diagram and send it to your designer along with the copied pixel dimensions. Designers tell us it saves them back-and-forth emails asking for specs.',
    },
  ],
  internalLinks: [
    { pageType: 'tool', slug: 'kdp-size-calculator', anchorText: 'KDP Cover Size Calculator' },
    { pageType: 'tool', slug: 'kdp-royalty-calculator', anchorText: 'KDP Royalty Calculator' },
    { pageType: 'tool', slug: 'niche-finder', anchorText: 'Printable Niche Finder' },
    { pageType: 'tool', slug: 'profit-hub', anchorText: 'Printable Profit Hub' },
    { pageType: 'guide', slug: 'kdp-formatting-worksheets', anchorText: 'KDP formatting guide' },
    { pageType: 'guide', slug: 'quality-standards-worksheets', anchorText: 'Quality standards for printables' },
    { pageType: 'guide', slug: 'publish-puzzle-books-kdp', anchorText: 'Publish puzzle books on KDP' },
  ],
  relatedPosts: [
    { slug: 'free-kdp-royalty-calculator', title: 'We Built a Free KDP Royalty Calculator \u2014 Here is Why' },
    { slug: 'printable-niche-research-tool', title: '50+ Profitable Printable Niches \u2014 Our Free Research Tool' },
    { slug: 'printable-profit-calculator', title: 'Compare Your Profit on Etsy vs Gumroad vs TPT vs KDP' },
  ],
  cta: {
    heading: 'Size Your Next KDP Cover in 60 Seconds',
    description: 'Enter your trim size, page count and paper type \u2014 get an instant interactive diagram with spine width, bleed and safe areas. Free, no signup required.',
    buttonText: 'Open the KDP Cover Size Calculator',
    buttonUrl: '/tools/kdp-size-calculator',
  },
};

export default content;
