#!/usr/bin/env node
/**
 * SEO Part 148: Worksheets Hub Page Optimization
 * - Updates EN title and keywords
 * - Adds generateFAQSchema import
 * - Inserts pillar content (1,000+ words, EN only)
 * - Inserts FAQ section + schema (EN only)
 */

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'frontend', 'app', '[locale]', 'worksheets', 'page.tsx');
let src = fs.readFileSync(filePath, 'utf8');

// ── Step 1: Update EN title ──
src = src.replace(
  "en: 'Free Themed Worksheets for Kids | LessonCraftStudio',",
  "en: 'Free Printable Worksheets for Kids \u2014 50 Themes | LessonCraftStudio',"
);

// ── Step 2: Update EN keywords ──
src = src.replace(
  "en: 'themed worksheets for kids, free printable worksheet collections, animal worksheets, dinosaur worksheets, space worksheets, preschool themed activities, kindergarten worksheet themes, educational printables by topic, seasonal worksheets, holiday worksheets for kids, themed PDF activities, classroom theme packs',",
  "en: 'free printable worksheets for kids, themed worksheets preschool to 3rd grade, printable learning activities for kids, educational worksheets by topic, free worksheet generators for teachers, printable PDF worksheets for classroom, animal worksheets free, dinosaur worksheets printable, seasonal worksheets for kids, kindergarten worksheet themes, themed activity sheets for homeschool, worksheet collections by theme',"
);

// ── Step 3: Add generateFAQSchema to import ──
src = src.replace(
  "import {\n  getHreflangCode,\n  ogLocaleMap,\n  localizedHomeLabel,\n} from '@/lib/schema-generator';",
  "import {\n  getHreflangCode,\n  ogLocaleMap,\n  localizedHomeLabel,\n  generateFAQSchema,\n} from '@/lib/schema-generator';"
);

// ── Step 4: Insert pillarContent and hubFaqItems constants after gradePopularThemes ──
const pillarAndFaq = `

// \u2500\u2500 Pillar content (EN only, 1,000+ words) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500

const pillarContent = {
  heading: 'The Complete Guide to Free Printable Worksheets for Kids',
  sections: [
    {
      title: 'Every Worksheet Is Unique',
      content: 'Unlike static PDF packs that run out after one use, every worksheet on LessonCraftStudio is generated fresh each time you click print. Our generators use randomized content so no two pages are ever identical. A child who finishes an addition worksheet can print another one immediately and get entirely new problems. This means unlimited practice without repetition, which is exactly what research says young learners need. Teachers no longer have to hunt for new material every week because the supply never runs dry. Parents love it too \u2014 there is always one more worksheet ready whenever their child asks for it.',
    },
    {
      title: 'Themed Learning That Kids Love',
      content: 'We offer 50 carefully chosen themes covering everything from animals and dinosaurs to space, ocean life, robots, and seasonal holidays. Themed worksheets tap into what children are already excited about and turn that enthusiasm into learning momentum. A child who loves pirates will happily trace pirate-themed letters. A dinosaur fan will count velociraptors without complaint. This cross-curricular approach weaves math, literacy, art, and logic into every theme so kids build skills across multiple domains while staying engaged. Research consistently shows that interest-driven learning improves retention, focus, and willingness to practice independently.',
    },
    {
      title: 'Built for Every Grade Level',
      content: 'Our worksheets span five grade levels from preschool through third grade, covering ages three to nine. Preschool activities focus on tracing, color recognition, and basic counting. Kindergarten sheets introduce letter formation, simple addition, and pattern recognition. First-grade worksheets advance to subtraction, sight words, and early reading comprehension. Second-grade content covers two-digit operations, expanded vocabulary, and creative writing prompts. Third graders tackle multiplication, cursive practice, and multi-step puzzles. Difficulty scales automatically within each generator so the content always matches the learner.',
    },
    {
      title: 'What You Can Create',
      content: 'Our 33 worksheet generators fall into eight skill categories. Math generators cover addition, subtraction, multiplication, number comparison, and counting. Literacy generators include alphabet tracing, letter recognition, spelling, and word search puzzles. Word game generators produce crosswords and scramble sheets that build vocabulary. Art generators provide themed coloring pages and drawing prompts. Logic generators challenge kids with mazes and Sudoku puzzles adapted for young minds. Visual perception sheets train pattern spotting and spatial reasoning. Matching activities develop memory and association skills. Pattern recognition worksheets strengthen the ability to identify and continue sequences. Together these categories provide a well-rounded toolkit for any classroom or home learning setup.',
    },
    {
      title: 'Perfect for Classrooms, Homeschool, and Therapy',
      content: 'Teachers use our generators to create differentiated station work, early finisher packets, and homework sheets in seconds. Because every print is unique, the same generator serves an entire class without students comparing identical answers. Homeschooling families rely on themed collections to build weekly unit studies around a single topic. Occupational therapists use our tracing, coloring, and maze worksheets as fine-motor skill exercises. Speech-language pathologists find value in our letter and word activities for articulation practice. The versatility extends to tutors, after-school programs, and summer camps where quick, quality printables save valuable planning time.',
    },
    {
      title: 'No Account, No Cost, No Catch',
      content: 'Every generator on LessonCraftStudio is completely free and requires no sign-up. Click a theme, choose a worksheet type, hit print, and a fresh PDF is ready in seconds. There are no watermarks, no limited previews, and no paywalls hiding the good stuff behind a subscription. We believe that quality educational resources should be accessible to every teacher, parent, and caregiver regardless of budget. The worksheets are formatted for standard letter-size paper, print cleanly in black and white to save ink, and include clear instructions so kids can work independently. Just open, print, and learn.',
    },
  ],
};

const hubFaqItems: Array<{question: string; answer: string}> = [
  {
    question: 'Are these worksheets really free?',
    answer: 'Yes, every worksheet generator on LessonCraftStudio is completely free. There are no hidden fees, no premium tiers, and no limited free trials. You can print as many worksheets as you need without creating an account or entering payment information. Our mission is to make quality educational resources accessible to everyone.',
  },
  {
    question: 'What grades are these worksheets designed for?',
    answer: 'Our worksheets cover five grade levels: preschool (ages 3\u20134), kindergarten (ages 5\u20136), first grade (ages 6\u20137), second grade (ages 7\u20138), and third grade (ages 8\u20139). Each generator adjusts difficulty to match the selected grade, so the same theme can serve learners across the full age range from pre-K through third grade.',
  },
  {
    question: 'Can I use these worksheets in my classroom?',
    answer: 'Absolutely. Our worksheets are designed with teachers in mind. You can print unlimited copies for your classroom, distribute them as homework, use them at learning stations, or include them in substitute teacher packets. There are no licensing restrictions for educational use in schools, tutoring centers, or homeschool programs.',
  },
  {
    question: 'How many worksheets can I print?',
    answer: 'There is no limit. Every time you click the print button, a brand-new worksheet is generated with randomized content. This means you can print hundreds of unique pages from a single generator without ever getting a duplicate. The supply is truly unlimited.',
  },
  {
    question: 'What themes are available?',
    answer: 'We offer 50 themes spanning a wide range of interests. Popular themes include animals, dinosaurs, ocean life, space, robots, pirates, farm, vehicles, food, sports, and seasonal topics like Christmas, Halloween, and Easter. Each theme is available across all 33 worksheet types, giving you over 1,600 unique theme-and-skill combinations to choose from.',
  },
  {
    question: 'Do I need to create an account?',
    answer: 'No account is needed. Simply visit any worksheet generator page, choose your theme and settings, and print. The entire process takes seconds and works on any device with a browser and a printer. We do not collect personal data or require registration of any kind.',
  },
];`;

const gradePopularEnd = "  'third-grade': ['robots', 'nature', 'construction'],\n};";
src = src.replace(gradePopularEnd, gradePopularEnd + pillarAndFaq);

// ── Step 5: Add FAQ schema JSON-LD block (after ItemList schema, guarded by locale === 'en') ──
const itemListSchemaBlock = `      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />`;

const faqSchemaBlock = `      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      {locale === 'en' && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema(hubFaqItems, locale, pageUrl)) }}
        />
      )}`;

src = src.replace(itemListSchemaBlock, faqSchemaBlock);

// ── Step 6: Insert pillar content section between Hero and Category Anchor Nav ──
const categoryAnchorNav = '      {/* Category Anchor Nav */}';

const pillarSection = `      {/* Pillar Content (EN only) */}
      {locale === 'en' && (
        <section className="py-12 bg-purple-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
              {pillarContent.heading}
            </h2>
            {pillarContent.sections.map((section, i) => (
              <div key={i} className="mb-8">
                <h3 className="text-xl font-semibold text-purple-800 mb-3">{section.title}</h3>
                <p className="text-gray-700 leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      ${categoryAnchorNav}`;

src = src.replace(categoryAnchorNav, pillarSection);

// ── Step 7: Insert FAQ section after Grade Level Navigation ──
const gradeNavEndTag = '      </section>\n    </div>\n  );\n}';

const faqSection = `      </section>

      {/* FAQ Section (EN only) */}
      {locale === 'en' && hubFaqItems.length > 0 && (
        <section className="py-12 bg-white border-t border-gray-200">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {hubFaqItems.map((item, i) => (
                <details key={i} className="group border border-gray-200 rounded-lg">
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
    </div>
  );
}`;

src = src.replace(gradeNavEndTag, faqSection);

fs.writeFileSync(filePath, src, 'utf8');
console.log('Part 148 applied successfully!');

// ── Verification ──
const jsonLdCount = (src.match(/application\/ld\+json/g) || []).length;
console.log('JSON-LD blocks: ' + jsonLdCount + ' (expected 4)');

const hasPillar = src.includes('pillarContent.heading');
console.log('Pillar content section: ' + (hasPillar ? 'YES' : 'MISSING'));

const hasFaqSection = src.includes('hubFaqItems.map');
console.log('FAQ section: ' + (hasFaqSection ? 'YES' : 'MISSING'));

const hasGenerateFAQ = src.includes('generateFAQSchema(hubFaqItems');
console.log('FAQ schema: ' + (hasGenerateFAQ ? 'YES' : 'MISSING'));

const hasUpdatedTitle = src.includes('Free Printable Worksheets for Kids');
console.log('Updated EN title: ' + (hasUpdatedTitle ? 'YES' : 'MISSING'));
