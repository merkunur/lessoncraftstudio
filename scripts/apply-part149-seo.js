/**
 * Part 149: Apps Hub Page Optimization (1 EN page)
 *
 * Updates frontend/app/[locale]/apps/page.tsx:
 * 1. EN title and keywords
 * 2. generateFAQSchema import
 * 3. Pillar content constant (~700 words)
 * 4. FAQ items constant (6 questions, ~300 words)
 * 5. FAQ schema script tag
 * 6. Pillar content JSX section
 * 7. FAQ JSX section
 * 8. pageUrl variable for schema
 */

const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'frontend', 'app', '[locale]', 'apps', 'page.tsx');
let src = fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n');

// ── Step 1: Add generateFAQSchema to import ──────────────────────────────

src = src.replace(
  "import { generateAppsCollectionSchema, generateAppsItemListSchema, getHreflangCode, ogLocaleMap } from '@/lib/schema-generator';",
  "import { generateAppsCollectionSchema, generateAppsItemListSchema, generateFAQSchema, getHreflangCode, ogLocaleMap } from '@/lib/schema-generator';"
);

// ── Step 2: Update EN title ──────────────────────────────────────────────

src = src.replace(
  "title: 'Browse 33 Free Worksheet Generators | LessonCraftStudio',",
  "title: '33 Free Worksheet Generators for Teachers \u2014 Printable PDFs | LessonCraftStudio',"
);

// ── Step 3: Update EN keywords ───────────────────────────────────────────

src = src.replace(
  "keywords: 'free worksheet generators, browse worksheet makers, all worksheet tools, educational app collection, printable PDF generators, teacher resource library, classroom activity creators, math and literacy generators, puzzle worksheet tools, 33 free generators, worksheet creation platform, online worksheet maker'",
  "keywords: 'free worksheet generators for teachers, printable worksheet maker online, educational worksheet creator tools, math worksheet generator free, word search generator for kids, crossword puzzle maker classroom, coloring page generator printable, PDF worksheet tools for education, worksheet generator preschool to 3rd grade, create worksheets online free, teacher worksheet tools no login, printable activity generators for school'"
);

// ── Step 4: Insert pillar content + FAQ constants before component ───────

const constantsBlock = `
// Pillar content (EN only, ~700 words)

const appsPillarContent = {
  heading: 'The Complete Guide to Free Worksheet Generators',
  sections: [
    {
      title: 'Why Use Worksheet Generators Instead of Static PDFs?',
      content: 'Traditional worksheet packs contain a fixed number of pages. Once a student finishes them, nothing remains to print. Worksheet generators solve this by creating a brand-new page every time you click print. The content is randomized so no two sheets are ever identical, giving students unlimited practice without repetition. This is essential for building fluency in math facts, spelling patterns, and letter formation. Teachers no longer need to spend evenings searching for fresh material because a single generator replaces an entire filing cabinet of photocopies. Parents appreciate the convenience as well because there is always another worksheet ready the moment a child asks for one. The result is less prep time for adults and more productive practice time for kids. Every page is formatted for clean printing, with large fonts, generous spacing, and clear instructions that let children work independently.',
    },
    {
      title: 'How Our 33 Generators Work',
      content: 'Every generator on LessonCraftStudio follows a simple three-step process: choose your theme, adjust the settings, and hit print. Behind the scenes the generator builds a unique layout with randomized content including new math problems, different word lists, and fresh image placements, then renders it as a clean, print-ready PDF. The entire cycle takes seconds and requires no account, no download, and no special software. Worksheets are formatted for standard letter-size paper, print cleanly in black and white to save ink, and include clear instructions so students can work independently. Each generator supports 50 engaging themes and all eleven site languages, making it easy to match content to your curriculum or individual student interests.',
    },
    {
      title: 'Eight Categories of Learning Tools',
      content: 'Our generators span eight skill categories designed to cover the full early-childhood curriculum. Math generators handle addition, subtraction, number comparison, and counting with images. Literacy generators cover alphabet tracing, letter recognition, and writing practice. Word game generators produce word searches, crosswords, and scramble puzzles that build vocabulary and spelling skills. Art generators create themed coloring pages and drawing prompts. Logic generators challenge young minds with Sudoku and code-breaking puzzles. Visual perception tools train pattern spotting, shadow matching, and spatial reasoning. Matching activities develop memory and association skills. Pattern recognition worksheets strengthen the ability to identify and continue sequences. Together these eight categories give teachers a complete toolkit for differentiated instruction.',
    },
    {
      title: 'Built for Every Learner \u2014 Preschool Through Third Grade',
      content: 'Our worksheets serve five grade levels covering ages three to nine. Preschool activities focus on tracing, color recognition, and basic counting. Kindergarten sheets introduce letter formation, simple addition, and pattern work. First-grade worksheets advance to subtraction, sight words, and reading comprehension. Second-grade content covers two-digit operations, expanded vocabulary, and creative writing. Third graders tackle multiplication, cursive practice, and multi-step puzzles. Difficulty scales automatically within each generator so one tool serves an entire mixed-age classroom. This makes our platform especially valuable for special education teachers who need materials at varied readiness levels and for homeschooling families managing multiple children at once.',
    },
    {
      title: 'Designed for the Classroom and Beyond',
      content: 'Teachers use our generators to create differentiated station work, early-finisher packets, homework sheets, and assessment warm-ups in seconds. Because every print is unique, the same generator serves an entire class without students comparing identical answers. Substitute teachers find the tools invaluable for producing quality activities on short notice. Homeschooling families build weekly unit studies around a single theme, and parents supplement school assignments with extra practice tailored to individual interests. Occupational therapists use tracing and maze worksheets for fine-motor exercises. Speech-language pathologists find value in letter and word activities for articulation practice. Tutors, after-school programs, and summer camps all benefit from the quick turnaround and consistent quality.',
    },
    {
      title: 'Getting Started in Three Steps',
      content: 'Using LessonCraftStudio could not be simpler. First, browse the app collection on this page or filter by category to find the generator you need. Second, open the generator, pick a theme from 50 options, and adjust settings like difficulty or number of items. Third, click print and a fresh PDF appears in seconds, ready to hand out, assign as homework, or add to a learning station. No account is required, no credit card is needed, and there are no watermarks on any worksheet. Every generator is completely free with no hidden paywalls. The site works on any device with a browser and a printer, and it is available in eleven languages to support multilingual classrooms around the world.',
    },
  ],
};

// FAQ items (EN only, 6 questions)

const appsFaqItems: Array<{question: string; answer: string}> = [
  {
    question: 'How do the worksheet generators work?',
    answer: 'Each generator creates a unique worksheet every time you click print. You choose a theme from 50 options, adjust settings like difficulty level and number of items, and the generator builds a randomized PDF in seconds. No two worksheets are ever the same, so students always get fresh practice material.',
  },
  {
    question: 'Are all 33 generators really free?',
    answer: 'The Word Search generator is completely free with no restrictions. The remaining 32 generators are available through our Core Bundle at $15 per month or Full Access at $25 per month, both with a free trial. Subscribers can print unlimited worksheets with no watermarks and full commercial-use rights for classroom distribution.',
  },
  {
    question: 'Can I customize the worksheets?',
    answer: 'Yes. Every generator lets you choose from 50 themes, select a grade level from preschool through third grade, and adjust difficulty settings. Some generators offer additional options like the number of problems, grid size, or word count. The customization ensures that worksheets match your curriculum and student skill levels.',
  },
  {
    question: 'What file format are the worksheets?',
    answer: 'All worksheets are generated as print-ready PDFs formatted for standard letter-size paper. They print cleanly in black and white to save ink and include large fonts with generous spacing so young learners can work independently. Simply click print in your browser and the PDF is ready.',
  },
  {
    question: 'Do the generators work on mobile devices?',
    answer: 'Yes. All 33 generators are fully responsive and work on phones, tablets, laptops, and desktop computers. You can preview and print worksheets from any device with a modern browser. Many teachers use a phone to generate a worksheet and print it directly to a classroom printer via wireless printing.',
  },
  {
    question: 'How are these different from static worksheet download sites?',
    answer: 'Static sites offer a fixed library of pre-made PDFs that eventually run out. Our generators create unlimited unique worksheets on demand with randomized content. Students never repeat the same page twice, and teachers never need to search for new material. You also get 50 themes and five grade levels in a single tool, replacing dozens of separate worksheet packs.',
  },
];
`;

src = src.replace(
  '\nexport default async function AppsPage',
  constantsBlock + '\nexport default async function AppsPage'
);

// ── Step 5: Add baseUrl + pageUrl in component function ──────────────────

src = src.replace(
  '  const itemListSchema = generateAppsItemListSchema(locale, appsForSchema);',
  '  const itemListSchema = generateAppsItemListSchema(locale, appsForSchema);\n\n  const baseUrl = \'https://www.lessoncraftstudio.com\';\n  const pageUrl = `${baseUrl}/${locale}/apps`;'
);

// ── Step 6: Add FAQ schema script tag after itemListSchema script ────────

src = src.replace(
  `      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />`,
  `      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      {locale === 'en' && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema(appsFaqItems, locale, pageUrl)) }}
        />
      )}`
);

// ── Step 7: Insert pillar content section after Tier Explanation ─────────

const pillarJSX = `
      {/* Pillar Content (EN only) */}
      {locale === 'en' && (
        <section className="py-12 bg-blue-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
              {appsPillarContent.heading}
            </h2>
            {appsPillarContent.sections.map((section, i) => (
              <div key={i} className="mb-8">
                <h3 className="text-xl font-semibold text-blue-800 mb-3">{section.title}</h3>
                <p className="text-gray-700 leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>
        </section>
      )}

`;

src = src.replace(
  '      {/* Category Filters */}',
  pillarJSX + '      {/* Category Filters */}'
);

// ── Step 8: Insert FAQ section before Teaching Tips ──────────────────────

const faqJSX = `
      {/* FAQ Section (EN only) */}
      {locale === 'en' && appsFaqItems.length > 0 && (
        <section className="py-12 bg-gray-50 border-t border-gray-200">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {appsFaqItems.map((item, i) => (
                <details key={i} className="group border border-gray-200 rounded-lg bg-white">
                  <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-gray-900">
                    {item.question}
                    <span className="ml-2 text-gray-400 group-open:rotate-180 transition-transform">&#9660;</span>
                  </summary>
                  <div className="px-5 pb-5 text-gray-600 leading-relaxed">
                    {item.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

`;

src = src.replace(
  '      {/* Teaching Tips from Blog - SEO Internal Linking */}',
  faqJSX + '      {/* Teaching Tips from Blog - SEO Internal Linking */}'
);

// ── Write and verify ─────────────────────────────────────────────────────

fs.writeFileSync(file, src, 'utf8');

const lines = src.split('\n').length;
console.log('Part 149 applied successfully.');
console.log('Total lines:', lines);
console.log('Has generateFAQSchema import:', src.includes('generateFAQSchema'));
console.log('Has appsPillarContent:', src.includes('appsPillarContent'));
console.log('Has appsFaqItems:', src.includes('appsFaqItems'));
console.log('Has FAQ schema:', src.includes('generateFAQSchema(appsFaqItems'));
console.log('Has pillar JSX:', src.includes('appsPillarContent.heading'));
console.log('Has FAQ JSX:', src.includes('Frequently Asked Questions'));
console.log('Has pageUrl:', src.includes('const pageUrl'));
console.log('Title updated:', src.includes('33 Free Worksheet Generators for Teachers'));
console.log('Keywords updated:', src.includes('free worksheet generators for teachers'));
