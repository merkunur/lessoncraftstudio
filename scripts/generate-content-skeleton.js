#!/usr/bin/env node
/**
 * generate-content-skeleton.js — Content File Skeleton Generator
 *
 * Generates a TypeScript content file with pre-filled metadata
 * and TODO markers for prose sections.
 *
 * Usage:
 *   node scripts/generate-content-skeleton.js --type app-detail --app addition --locale en
 *   node scripts/generate-content-skeleton.js --type free-tool --app addition --locale en
 *   node scripts/generate-content-skeleton.js --type bundle --id math-mastery-bundle --locale en
 *   node scripts/generate-content-skeleton.js --type cornerstone --id complete-guide-printable-business --locale en
 *   node scripts/generate-content-skeleton.js --type create-x --id sell-math-worksheets-etsy --locale en
 *   node scripts/generate-content-skeleton.js --type niche-ideas --id farm-animals-printable-ideas --locale en
 */

const fs = require('fs');
const path = require('path');

// YouTube video IDs from REFERENCE.md Section 11.4
const YOUTUBE_IDS = {
  'addition': '6O5aCzHkh8M',
  'subtraction': 'til2mrWMUxk',
  'code-addition': 'vVd11Kjk9iA',
  'more-less': 'eNguG63nYVs',
  'math-puzzle': 'n5QO39Lq5l8',
  'math-worksheet': '-JIawojGNr0',
  'alphabet-train': '_dDQegRq9JQ',
  'prepositions': 'ifIXbViR5_o',
  'word-guess': 'DSwX_p4dRNM',
  'word-scramble': 'Hc3g5VsSHEU',
  'wordsearch': '36keBFzJbPo',
  'cryptogram': '9U0BIIjCnco',
  'writing': '0b4WglqyXu0',
  'big-small': 'S2s2U6Nb7FI',
  'pattern-train': '5A4aHvcC5u4',
  'pattern-worksheet': 'W94X5_RA3ug',
  'draw-and-color': '1uZubAOGIkM',
  'drawing-lines': 'P9q3ymjFnOQ',
  'coloring': 'ZdpCr2txHcc',
  'chart-count': 'CDgIihDQX6U',
  'matching': 'y3ghkjt_67s',
  'grid-match': 'RGtED1Bnut8',
  'shadow-match': 'TYvUXJeMI98',
  'bingo': 'd6AOiDXoK1c',
  'picture-sort': '9kzmlABtNVQ',
  'missing-pieces': 'gb-xE_Ay4fc',
  'odd-one-out': '0R6WFUfY7Mk',
  'sudoku': 'bqVioFbkYbA',
  'picture-path': 'Sl1o0uPBDCg',
  'find-and-count': '0cOPi7eajLs',
  'find-objects': '8Y3jrVr1Phs',
  'crossword': 'b3WKDrzif-w',
  'treasure-hunt': 'flHiBXsYLLA',
};

// App ID to sample folder name mapping
const APP_FOLDER_MAP = {
  'addition': 'addition',
  'subtraction': 'subtraction',
  'code-addition': 'code addition',
  'more-less': 'more less',
  'math-puzzle': 'math puzzle',
  'math-worksheet': 'math worksheet',
  'alphabet-train': 'alphabet train',
  'prepositions': 'prepositions',
  'word-guess': 'word guess',
  'word-scramble': 'word scramble',
  'wordsearch': 'wordsearch',
  'cryptogram': 'cryptogram',
  'writing': 'writing',
  'big-small': 'big small',
  'pattern-train': 'pattern train',
  'pattern-worksheet': 'pattern worksheet',
  'draw-and-color': 'draw and color',
  'drawing-lines': 'drawing lines',
  'coloring': 'coloring',
  'chart-count': 'chart count',
  'matching': 'matching',
  'grid-match': 'grid match',
  'shadow-match': 'shadow match',
  'bingo': 'bingo',
  'picture-sort': 'picture sort',
  'missing-pieces': 'missing pieces',
  'odd-one-out': 'odd one out',
  'sudoku': 'sudoku',
  'picture-path': 'picture path',
  'find-and-count': 'find and count',
  'find-objects': 'find objects',
  'crossword': 'crossword',
  'treasure-hunt': 'treasure hunt',
};

const LOCALE_FOLDER_MAP = {
  en: 'english', de: 'german', fr: 'french', es: 'spanish',
  it: 'italian', pt: 'portuguese', nl: 'dutch', da: 'danish',
  sv: 'swedish', no: 'norwegian', fi: 'finnish',
};

const APP_CATEGORIES = {
  'addition': 'math', 'subtraction': 'math', 'code-addition': 'math',
  'more-less': 'math', 'math-puzzle': 'math', 'math-worksheet': 'math',
  'alphabet-train': 'literacy', 'prepositions': 'literacy', 'word-guess': 'literacy',
  'word-scramble': 'literacy', 'wordsearch': 'literacy', 'cryptogram': 'literacy',
  'writing': 'literacy',
  'big-small': 'visual', 'pattern-train': 'visual', 'pattern-worksheet': 'visual',
  'draw-and-color': 'visual', 'drawing-lines': 'visual', 'coloring': 'visual',
  'chart-count': 'visual',
  'matching': 'matching', 'grid-match': 'matching', 'shadow-match': 'matching',
  'bingo': 'matching', 'picture-sort': 'matching',
  'missing-pieces': 'puzzle', 'odd-one-out': 'puzzle', 'sudoku': 'puzzle',
  'picture-path': 'puzzle',
  'find-and-count': 'search', 'find-objects': 'search', 'crossword': 'search',
  'treasure-hunt': 'search',
};

function getSampleImages(appId, locale) {
  const inventoryPath = path.join(__dirname, 'sample-inventory.json');
  if (!fs.existsSync(inventoryPath)) return [];

  const inventory = JSON.parse(fs.readFileSync(inventoryPath, 'utf8'));
  const langFolder = LOCALE_FOLDER_MAP[locale] || 'english';
  const appFolder = APP_FOLDER_MAP[appId];

  if (!appFolder || !inventory[langFolder] || !inventory[langFolder][appFolder]) return [];

  return inventory[langFolder][appFolder]
    .filter(f => !f.includes('answer_key'))
    .slice(0, 6)
    .map(f => `/samples/${langFolder}/${appFolder}/${encodeURIComponent(f)}`);
}

function getOutputPath(type, id, locale) {
  const dirs = {
    'app-detail': 'app-content',
    'free-tool': 'tool-content',
    'bundle': 'bundle-content',
    'cornerstone': 'start-content',
    'create-x': 'guide-content',
    'niche-ideas': 'idea-content',
  };
  const dir = dirs[type];
  if (!dir) throw new Error(`Unknown type: ${type}`);
  return path.join(__dirname, '..', 'frontend', 'config', dir, locale, `${id}.ts`);
}

function generateAppDetail(appId, locale) {
  const images = getSampleImages(appId, locale);
  const youtubeId = YOUTUBE_IDS[appId] || '';
  const category = APP_CATEGORIES[appId] || 'unknown';

  return `import type { AppDetailContent } from '../types';

export const content: AppDetailContent = {
  appId: '${appId}',
  locale: '${locale}',
  category: '${category}',

  seo: {
    titleTag: '', // TODO: <= 60 chars, contains primary keyword
    metaDescription: '', // TODO: 150-160 chars, contains primary keyword + CTA verb
    primaryKeyword: '', // TODO: e.g. "${appId} worksheet generator"
    secondaryKeywords: [
      // TODO: 3-5 long-tail keywords
    ],
    lsiKeywords: [
      // TODO: 2-3 semantically related terms
    ],
  },

  visuals: {
    heroImages: {
      primary: '${images[0] || ''}', // TODO: verify path
      primaryAlt: '', // TODO: localized alt text
    },
    sampleGallery: [
${images.slice(1, 5).map(img => `      { src: '${img}', alt: '' }, // TODO: localized alt text`).join('\n')}
    ],
    youtubeId: '${youtubeId}',
    videoTitle: '', // TODO: localized video section title
  },

  hero: {
    title: '', // TODO: H1 with primary keyword
    tagline: '', // TODO: 1-2 sentence benefit-first tagline
    description: '', // TODO: 250 words — what app creates, distinguishing capability, who benefits, business value
  },

  howItWorks: {
    title: '', // TODO: H2 with keyword
    steps: [
      // TODO: 5 app-specific steps (400 words total)
      // Read REFERENCE APPS/${appId}.html to verify actual UI elements
      { title: '', description: '' },
      { title: '', description: '' },
      { title: '', description: '' },
      { title: '', description: '' },
      { title: '', description: '' },
    ],
  },

  features: [
    // TODO: 8 unique features (800 words total)
    // Each: title (3-6 words) + explanation (80-100 words)
    // Verify every claim from REFERENCE APPS/${appId}.html
    { title: '', description: '' },
    { title: '', description: '' },
    { title: '', description: '' },
    { title: '', description: '' },
    { title: '', description: '' },
    { title: '', description: '' },
    { title: '', description: '' },
    { title: '', description: '' },
  ],

  businessUseCases: [
    // TODO: 5-6 scenarios (600 words total)
    // Platform-specific: Etsy, KDP, TPT
    { title: '', description: '', platform: '' },
    { title: '', description: '', platform: '' },
    { title: '', description: '', platform: '' },
    { title: '', description: '', platform: '' },
    { title: '', description: '', platform: '' },
  ],

  faq: [
    // TODO: 5-7 app-specific Q&As + generic FAQs + mandatory refund FAQ
    // Refund FAQ must be among last 3
    { question: '', answer: '' },
    { question: '', answer: '' },
    { question: '', answer: '' },
    { question: '', answer: '' },
    { question: '', answer: '' },
    // ... more FAQs
    // MANDATORY: Refund policy FAQ (among last 3)
    {
      question: 'What is your refund policy?',
      answer: 'We do not offer refunds because every app has a free trial with all features before you buy. The only difference between the free trial and the paid version is a watermark on downloaded files. We encourage you to try before you buy.',
    },
  ],

  internalLinks: [
    // TODO: 8-10 internal links
    // 2-3 related apps (same category), 1 bundle, 1 tool page, 2-3 guides, 1-2 idea pages
  ],
};
`;
}

function generateFreeTool(appId, locale) {
  const images = getSampleImages(appId, locale);
  const youtubeId = YOUTUBE_IDS[appId] || '';

  return `import type { FreeToolContent } from '../types';

export const content: FreeToolContent = {
  appId: '${appId}',
  locale: '${locale}',

  seo: {
    titleTag: '', // TODO: <= 60 chars, e.g. "${appId} Worksheet Maker | No Signup"
    metaDescription: '', // TODO: 150-160 chars
    primaryKeyword: '', // TODO: e.g. "${appId} worksheet generator"
    secondaryKeywords: [],
    lsiKeywords: [],
  },

  visuals: {
    heroImages: {
      primary: '${images[0] || ''}',
      primaryAlt: '',
    },
    sampleGallery: [
${images.slice(1, 6).map(img => `      { src: '${img}', alt: '' },`).join('\n')}
    ],
    youtubeId: '${youtubeId}',
    videoTitle: '',
  },

  hero: {
    title: '', // TODO: H1 with primary keyword
    tagline: '', // TODO: instant-access CTA tone
    description: '', // TODO: 200 words
  },

  whatYouCanCreate: [
    // TODO: 5-6 product examples (600 words total)
    { title: '', description: '' },
    { title: '', description: '' },
    { title: '', description: '' },
    { title: '', description: '' },
    { title: '', description: '' },
  ],

  tutorial: {
    title: '', // TODO: H2
    steps: [
      // TODO: 8-10 steps (700 words total)
      { title: '', description: '' },
      { title: '', description: '' },
      { title: '', description: '' },
      { title: '', description: '' },
      { title: '', description: '' },
      { title: '', description: '' },
      { title: '', description: '' },
      { title: '', description: '' },
    ],
  },

  businessIdeas: [
    // TODO: 5-6 money-making scenarios (600 words)
    { title: '', description: '', platform: '' },
    { title: '', description: '', platform: '' },
    { title: '', description: '', platform: '' },
    { title: '', description: '', platform: '' },
    { title: '', description: '', platform: '' },
  ],

  proTips: [
    // TODO: 5-7 expert tips (400 words)
    { title: '', tip: '' },
    { title: '', tip: '' },
    { title: '', tip: '' },
    { title: '', tip: '' },
    { title: '', tip: '' },
  ],

  faq: [
    // TODO: 8-10 tool-specific Q&As + mandatory refund FAQ (among last 3)
    { question: '', answer: '' },
    { question: '', answer: '' },
    { question: '', answer: '' },
    { question: '', answer: '' },
    { question: '', answer: '' },
    { question: '', answer: '' },
    { question: '', answer: '' },
    { question: '', answer: '' },
    {
      question: 'What is your refund policy?',
      answer: 'We do not offer refunds because every app has a free trial with all features before you buy. The only difference between the free trial and the paid version is a watermark on downloaded files. We encourage you to try before you buy.',
    },
  ],

  internalLinks: [],
};
`;
}

function generateBundle(id, locale) {
  return `import type { BundleContent } from '../types';

export const content: BundleContent = {
  bundleId: '${id}',
  locale: '${locale}',

  seo: {
    titleTag: '', // TODO: <= 60 chars
    metaDescription: '', // TODO: 150-160 chars
    primaryKeyword: '', // TODO: e.g. "math worksheet bundle"
    secondaryKeywords: [],
    lsiKeywords: [],
  },

  visuals: {
    heroImages: { primary: '', primaryAlt: '' },
    sampleGallery: [],
    youtubeId: '', // TODO: most representative app's video
    videoTitle: '',
  },

  hero: {
    title: '', // TODO: H1
    tagline: '',
    description: '', // TODO: 250 words
  },

  appsIncluded: [
    // TODO: 100-word summary per app in this bundle (700 words total)
  ],

  bundleBenefits: [
    // TODO: 6-8 benefits (500 words)
  ],

  businessUseCases: [
    // TODO: 5-6 scenarios using multiple apps together (600 words)
  ],

  faq: [
    // TODO: 8-10 bundle-specific Q&As + mandatory refund FAQ
    {
      question: 'What is your refund policy?',
      answer: 'We do not offer refunds because every app has a free trial with all features before you buy. The only difference between the free trial and the paid version is a watermark on downloaded files. We encourage you to try before you buy.',
    },
  ],

  internalLinks: [],
};
`;
}

function generateCornerstone(id, locale) {
  return `import type { CornerstoneContent } from '../types';

export const content: CornerstoneContent = {
  guideId: '${id}',
  locale: '${locale}',

  seo: {
    titleTag: '',
    metaDescription: '',
    primaryKeyword: '',
    secondaryKeywords: [],
    lsiKeywords: [],
  },

  visuals: {
    heroImages: { primary: '', primaryAlt: '' },
    sampleGallery: [],
    youtubeId: '', // TODO: see BUSINESS.md Section 11.5
    videoTitle: '',
  },

  hero: {
    title: '',
    subtitle: '',
    readingTime: '', // e.g. "12 min read"
    description: '', // TODO: 200 words
  },

  introduction: '', // TODO: 300 words — problem/opportunity statement

  mainContent: [
    // TODO: 8-12 sections (1,800 words total)
    { heading: '', content: '' },
  ],

  actionSteps: [
    // TODO: numbered checklist (300 words)
  ],

  toolsRecommended: [
    // TODO: our apps as solutions (300 words)
  ],

  faq: [
    // TODO: 6-8 questions + mandatory refund FAQ
    {
      question: 'What is your refund policy?',
      answer: 'We do not offer refunds because every app has a free trial with all features before you buy. The only difference between the free trial and the paid version is a watermark on downloaded files. We encourage you to try before you buy.',
    },
  ],

  internalLinks: [],
};
`;
}

function generateCreateX(id, locale) {
  return `import type { CreateXContent } from '../types';

export const content: CreateXContent = {
  guideId: '${id}',
  locale: '${locale}',

  seo: {
    titleTag: '',
    metaDescription: '',
    primaryKeyword: '',
    secondaryKeywords: [],
    lsiKeywords: [],
  },

  visuals: {
    heroImages: { primary: '', primaryAlt: '' },
    sampleGallery: [],
    youtubeId: '', // TODO: the specific app's video
    videoTitle: '',
  },

  hero: {
    title: '',
    description: '', // TODO: 150 words
  },

  introduction: '', // TODO: 250 words — market opportunity

  tutorial: {
    title: '',
    steps: [
      // TODO: 8-10 steps (1,000 words total)
      { title: '', description: '' },
    ],
  },

  platformTips: [
    // TODO: publishing/listing advice (400 words)
  ],

  monetization: [
    // TODO: pricing, bundling, marketing (400 words)
  ],

  examples: '', // TODO: 400 words — examples & inspiration

  faq: [
    // TODO: 5-7 questions + mandatory refund FAQ
    {
      question: 'What is your refund policy?',
      answer: 'We do not offer refunds because every app has a free trial with all features before you buy. The only difference between the free trial and the paid version is a watermark on downloaded files. We encourage you to try before you buy.',
    },
  ],

  internalLinks: [],
};
`;
}

function generateNicheIdeas(id, locale) {
  return `import type { NicheIdeaContent } from '../types';

export const content: NicheIdeaContent = {
  ideaId: '${id}',
  locale: '${locale}',

  seo: {
    titleTag: '',
    metaDescription: '',
    primaryKeyword: '', // TODO: e.g. "farm animals printable business ideas"
    secondaryKeywords: [],
    lsiKeywords: [],
  },

  visuals: {
    heroImages: { primary: '', primaryAlt: '' },
    sampleGallery: [],
    youtubeId: '', // TODO: most relevant app's video
    videoTitle: '',
  },

  hero: {
    title: '',
    description: '', // TODO: 150 words — opportunity teaser
  },

  marketOverview: '', // TODO: 300 words — why this niche works

  productIdeas: [
    // TODO: 8-10 specific products to create (800 words total)
    { title: '', description: '', appId: '' },
  ],

  howToCreate: '', // TODO: 500 words — step-by-step with our tools

  platformTips: [
    // TODO: where to sell this niche (400 words)
  ],

  pricingIdeas: '', // TODO: 300 words — pricing & bundling

  faq: [
    // TODO: 5-7 niche-specific Q&As + mandatory refund FAQ
    {
      question: 'What is your refund policy?',
      answer: 'We do not offer refunds because every app has a free trial with all features before you buy. The only difference between the free trial and the paid version is a watermark on downloaded files. We encourage you to try before you buy.',
    },
  ],

  internalLinks: [],
};
`;
}

function main() {
  const args = process.argv.slice(2);
  const params = {};

  for (let i = 0; i < args.length; i += 2) {
    params[args[i].replace('--', '')] = args[i + 1];
  }

  if (!params.type || !params.locale) {
    console.log('Usage: node scripts/generate-content-skeleton.js --type <type> --app <appId> --locale <locale>');
    console.log('       node scripts/generate-content-skeleton.js --type <type> --id <itemId> --locale <locale>');
    console.log();
    console.log('Types: app-detail, free-tool, bundle, cornerstone, create-x, niche-ideas');
    process.exit(1);
  }

  const type = params.type;
  const locale = params.locale;
  const appId = params.app;
  const itemId = params.id || appId;

  if (!itemId) {
    console.error('Error: --app or --id required');
    process.exit(1);
  }

  let content;
  let fileId = itemId;

  switch (type) {
    case 'app-detail':
      content = generateAppDetail(appId, locale);
      break;
    case 'free-tool':
      // For free-tool, use the tool slug as file name
      fileId = params.id || `${appId}-worksheet-maker`;
      content = generateFreeTool(appId, locale);
      break;
    case 'bundle':
      content = generateBundle(itemId, locale);
      break;
    case 'cornerstone':
      content = generateCornerstone(itemId, locale);
      break;
    case 'create-x':
      content = generateCreateX(itemId, locale);
      break;
    case 'niche-ideas':
      content = generateNicheIdeas(itemId, locale);
      break;
    default:
      console.error(`Unknown type: ${type}`);
      process.exit(1);
  }

  const outputPath = getOutputPath(type, fileId, locale);
  const outputDir = path.dirname(outputPath);

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(outputPath, content);
  console.log(`Generated: ${outputPath}`);
  console.log(`Next: Fill in all TODO sections, then run:`);
  console.log(`  node scripts/validate-content.js ${outputPath}`);
}

main();
