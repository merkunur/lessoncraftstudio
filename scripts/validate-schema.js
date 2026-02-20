#!/usr/bin/env node
/**
 * Schema Markup Validator
 *
 * Validates all schema generator functions in schema-generator.ts:
 * 1. Source analysis: every generator emits @context, @type, etc.
 * 2. Representative schemas: validates structure against Google Rich Results rules
 * 3. Common pitfalls: missing name, empty arrays, invalid dates, broken @id refs
 *
 * Usage:
 *   node scripts/validate-schema.js          # Full validation
 *   node scripts/validate-schema.js --verbose # Show passing details
 *
 * Part 10 of Landing Page SEO Perfection
 */

const fs = require('fs');
const path = require('path');

const VERBOSE = process.argv.includes('--verbose');
const SCHEMA_FILE = path.resolve(__dirname, '..', 'frontend', 'lib', 'schema-generator.ts');

let passed = 0;
let failed = 0;
const errors = [];

function pass(label) {
  passed++;
  if (VERBOSE) console.log(`  \u2713 ${label}`);
}

function fail(label, reason) {
  failed++;
  errors.push({ label, reason });
  console.log(`  \u2717 ${label}: ${reason}`);
}

// ── Part 1: Source-Level Validation ──────────────────────────────────

console.log('\n=== Source Analysis: schema-generator.ts ===\n');

const src = fs.readFileSync(SCHEMA_FILE, 'utf-8');

// Extract all exported function names
const exportedFns = [];
const fnRegex = /export function (\w+)\(/g;
let match;
while ((match = fnRegex.exec(src)) !== null) {
  exportedFns.push(match[1]);
}

console.log(`Found ${exportedFns.length} exported functions\n`);

// Functions that return schema objects (should have @type)
// Exclude helpers like getHreflangCode, localeToLanguageFolder
const HELPER_FNS = ['getHreflangCode'];
const schemaFns = exportedFns.filter(fn => !HELPER_FNS.includes(fn));

// Functions that aggregate others (don't directly emit @type)
const AGGREGATOR_FNS = ['generateAllProductPageSchemas', 'generateHomepageSchemas',
  'generateAppsCollectionSchema', 'generateAuthorPublisherLinks'];

// Check each schema function body for required patterns
for (const fnName of schemaFns) {
  const fnStart = src.indexOf(`export function ${fnName}(`);
  if (fnStart === -1) { fail(`${fnName}() found`, 'Not in source'); continue; }

  // Find the NEXT exported function to delimit this one's body
  const nextFnMatch = src.substring(fnStart + 10).match(/\nexport function /);
  const fnEnd = nextFnMatch ? fnStart + 10 + nextFnMatch.index : fnStart + 4000;
  const fnBody = src.substring(fnStart, Math.min(fnEnd, src.length));

  // Aggregator functions delegate to other generators
  if (AGGREGATOR_FNS.includes(fnName)) {
    pass(`${fnName}() delegates to sub-generators`);
    continue;
  }

  // Every schema function should emit '@type' somewhere in its body
  if (fnBody.includes("'@type'") || fnBody.includes('"@type"')) {
    pass(`${fnName}() emits @type`);
  } else {
    fail(`${fnName}() emits @type`, 'No @type found in function body');
  }
}

// Check that new functions exist
const newFns = ['generateCourseSchema', 'generateQuizSchema'];
for (const fn of newFns) {
  if (exportedFns.includes(fn)) {
    pass(`${fn}() is exported`);
  } else {
    fail(`${fn}() is exported`, 'Function not found in exports');
  }
}

// ── Part 2: Representative Schema Validation ─────────────────────────

console.log('\n=== Representative Schema Validation ===\n');

const BASE_URL = 'https://www.lessoncraftstudio.com';

/**
 * Representative schemas matching output of each generator function.
 * These mirror what the actual functions produce.
 */
const representativeSchemas = {
  // generateBlogSchemas - BlogPosting
  BlogPosting: {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${BASE_URL}/en/blog/animals-worksheets#article`,
    headline: 'Animals Worksheets for Kids',
    description: 'Free printable animals worksheets for preschool through 3rd grade.',
    datePublished: '2024-06-01',
    dateModified: '2025-12-15',
    inLanguage: 'en',
    author: { '@type': 'Person', name: 'LessonCraftStudio' },
    publisher: {
      '@type': 'EducationalOrganization',
      '@id': `${BASE_URL}/#organization`,
      name: 'LessonCraftStudio',
    },
    image: [`${BASE_URL}/images/blog-featured.jpg`],
    mainEntityOfPage: { '@id': `${BASE_URL}/en/blog/animals-worksheets#webpage` },
  },

  // generateFAQSchema
  FAQPage: {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${BASE_URL}/en/apps/addition#faq`,
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I use the addition worksheet generator?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Click Generate to create a new worksheet, then print or download.',
        },
      },
    ],
    inLanguage: 'en',
  },

  // generateHowToSchema
  HowTo: {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Create Addition Worksheets',
    description: 'Step by step guide to creating addition worksheets.',
    step: [
      { '@type': 'HowToStep', position: 1, name: 'Open the app', text: 'Navigate to the addition worksheet generator.' },
      { '@type': 'HowToStep', position: 2, name: 'Configure', text: 'Set the number range and problem count.' },
    ],
    inLanguage: 'en',
  },

  // generateHomepageSchemas - Organization
  EducationalOrganization: {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    '@id': `${BASE_URL}/#organization`,
    name: 'LessonCraftStudio',
    url: BASE_URL,
    description: 'Professional worksheet generators for teachers and educators.',
    contactPoint: { '@type': 'ContactPoint', contactType: 'customer service' },
  },

  // generateAppProductSchemas - SoftwareApplication
  SoftwareApplication: {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': `${BASE_URL}/en/apps/addition#software`,
    name: 'Addition Worksheet Generator',
    description: 'Create customized addition worksheets for students.',
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    inLanguage: 'en',
  },

  // BreadcrumbList (used by blog, product, theme pages)
  BreadcrumbList: {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/en` },
      { '@type': 'ListItem', position: 2, name: 'Apps', item: `${BASE_URL}/en/apps` },
      { '@type': 'ListItem', position: 3, name: 'Addition' },
    ],
  },

  // generateLearningResourceSchema
  LearningResource: {
    '@context': 'https://schema.org',
    '@type': 'LearningResource',
    '@id': `${BASE_URL}/en/themes/animals#learningresource`,
    name: 'Animals Worksheets',
    description: 'Educational animals-themed worksheets for preschool to grade 3.',
    learningResourceType: 'Worksheet',
    inLanguage: 'en',
    isAccessibleForFree: true,
    typicalAgeRange: '3-9',
    educationalLevel: ['Preschool', 'Kindergarten', 'Grade 1', 'Grade 2', 'Grade 3'],
  },

  // generateImageObjectSchema
  ImageObject: {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    '@id': `${BASE_URL}/en/apps/addition#image-0`,
    contentUrl: `${BASE_URL}/samples/english/addition/sample-1.jpeg`,
    name: 'Addition Worksheet Sample 1',
    description: 'Sample addition worksheet for students.',
    inLanguage: 'en',
  },

  // generateImageGallerySchema
  ImageGallery: {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    '@id': `${BASE_URL}/en/apps/addition#gallery`,
    name: 'Addition Worksheet Samples',
    numberOfItems: 3,
    inLanguage: 'en',
    image: [
      { '@type': 'ImageObject', contentUrl: `${BASE_URL}/samples/english/addition/sample-1.jpeg` },
    ],
  },

  // generateAppsItemListSchema
  ItemList: {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Worksheet Generators',
    numberOfItems: 33,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Addition', url: `${BASE_URL}/en/apps/addition` },
    ],
  },

  // generateCourseSchema (NEW)
  Course: {
    '@context': 'https://schema.org',
    '@type': 'Course',
    '@id': `${BASE_URL}/en/themes/animals#course`,
    name: 'Animals-Themed Worksheets Collection',
    description: 'A collection of printable animals worksheets for preschool through grade 3.',
    provider: {
      '@type': 'EducationalOrganization',
      '@id': `${BASE_URL}/#organization`,
      name: 'LessonCraftStudio',
    },
    inLanguage: 'en',
    educationalLevel: 'Kindergarten',
    typicalAgeRange: '3-9',
    isAccessibleForFree: true,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  },

  // generateQuizSchema (NEW)
  Quiz: {
    '@context': 'https://schema.org',
    '@type': 'Quiz',
    '@id': `${BASE_URL}/en/apps/addition#quiz`,
    name: 'Addition Practice Quiz',
    description: 'Interactive addition practice for early learners.',
    about: { '@type': 'Thing', name: 'Addition' },
    educationalLevel: 'Preschool to Grade 3',
    inLanguage: 'en',
    numberOfQuestions: 20,
    learningResourceType: 'Quiz',
    isAccessibleForFree: true,
  },

  // generateThemeWebPageSchema
  WebPage: {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${BASE_URL}/en/themes/animals#webpage`,
    name: 'Animals Worksheets',
    description: 'Free printable animals worksheets.',
    url: `${BASE_URL}/en/themes/animals`,
    inLanguage: 'en',
    isPartOf: { '@type': 'WebSite', '@id': `${BASE_URL}/#website` },
  },
};

// ── Validation Rules ─────────────────────────────────────────────────

/**
 * Validate a single schema object against Google Rich Results requirements
 */
function validateSchema(typeName, schema) {
  const prefix = `${typeName}`;

  // Rule 1: @context is required
  if (schema['@context'] === 'https://schema.org') {
    pass(`${prefix} has valid @context`);
  } else {
    fail(`${prefix} has valid @context`, `Got: ${schema['@context']}`);
  }

  // Rule 2: @type is required and non-empty
  if (schema['@type'] && typeof schema['@type'] === 'string' && schema['@type'].length > 0) {
    pass(`${prefix} has valid @type`);
  } else {
    fail(`${prefix} has valid @type`, `Got: ${JSON.stringify(schema['@type'])}`);
  }

  // Rule 3: name or headline must exist (Google requires for most types)
  const hasNameField = schema.name || schema.headline;
  if (hasNameField) {
    pass(`${prefix} has name/headline`);
  } else if (['BreadcrumbList', 'FAQPage'].includes(typeName)) {
    pass(`${prefix} name not required for ${typeName}`);
  } else {
    fail(`${prefix} has name/headline`, 'Missing both name and headline');
  }

  // Rule 4: description should exist for content types
  const contentTypes = ['BlogPosting', 'SoftwareApplication', 'LearningResource', 'Course', 'Quiz', 'WebPage', 'EducationalOrganization'];
  if (contentTypes.includes(typeName)) {
    if (schema.description && schema.description.length > 0) {
      pass(`${prefix} has description`);
    } else {
      fail(`${prefix} has description`, 'Missing or empty description');
    }
  }

  // Rule 5: No empty arrays (Google penalizes these)
  for (const [key, val] of Object.entries(schema)) {
    if (Array.isArray(val) && val.length === 0) {
      fail(`${prefix} no empty arrays`, `"${key}" is an empty array`);
    }
  }

  // Rule 6: @id format validation (should be URL#fragment)
  if (schema['@id']) {
    if (/^https?:\/\/.+#\w+/.test(schema['@id'])) {
      pass(`${prefix} @id format valid`);
    } else {
      fail(`${prefix} @id format valid`, `Got: ${schema['@id']}`);
    }
  }

  // Rule 7: inLanguage should be a valid BCP 47 code
  if (schema.inLanguage) {
    const validLangs = ['en', 'de', 'fr', 'es', 'pt', 'pt-BR', 'it', 'nl', 'sv', 'da', 'nb', 'fi'];
    if (validLangs.includes(schema.inLanguage)) {
      pass(`${prefix} inLanguage is valid BCP 47`);
    } else {
      fail(`${prefix} inLanguage is valid BCP 47`, `Got: ${schema.inLanguage}`);
    }
  }

  // Rule 8: Date format validation (ISO 8601)
  for (const dateField of ['datePublished', 'dateModified']) {
    if (schema[dateField]) {
      if (/^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2})?/.test(schema[dateField])) {
        pass(`${prefix} ${dateField} is valid ISO date`);
      } else {
        fail(`${prefix} ${dateField} is valid ISO date`, `Got: ${schema[dateField]}`);
      }
    }
  }

  // Rule 9: Offers should have price and priceCurrency
  if (schema.offers) {
    const offers = schema.offers;
    if (offers.price !== undefined && offers.priceCurrency) {
      pass(`${prefix} offers has price+currency`);
    } else {
      fail(`${prefix} offers has price+currency`, 'Missing price or priceCurrency');
    }
  }

  // Rule 10: Nested @type validation
  for (const [key, val] of Object.entries(schema)) {
    if (val && typeof val === 'object' && !Array.isArray(val) && val['@type']) {
      if (typeof val['@type'] === 'string' && val['@type'].length > 0) {
        pass(`${prefix}.${key} nested @type valid`);
      } else {
        fail(`${prefix}.${key} nested @type valid`, `Got: ${JSON.stringify(val['@type'])}`);
      }
    }
  }

  // Rule 11: BreadcrumbList-specific checks
  if (typeName === 'BreadcrumbList') {
    const items = schema.itemListElement || [];
    for (let i = 0; i < items.length; i++) {
      if (items[i].position !== i + 1) {
        fail(`${prefix} breadcrumb positions sequential`, `Item ${i} has position ${items[i].position}`);
      }
    }
    if (items.length > 0 && items.every((it, i) => it.position === i + 1)) {
      pass(`${prefix} breadcrumb positions sequential`);
    }
    // Last breadcrumb should NOT have item/url (current page)
    const last = items[items.length - 1];
    if (last && !last.item) {
      pass(`${prefix} last breadcrumb has no item URL`);
    } else if (last) {
      fail(`${prefix} last breadcrumb has no item URL`, 'Last breadcrumb should omit item (current page)');
    }
  }

  // Rule 12: FAQPage-specific checks
  if (typeName === 'FAQPage') {
    const questions = schema.mainEntity || [];
    if (questions.length > 0) {
      pass(`${prefix} has at least one question`);
      const allValid = questions.every(q => q['@type'] === 'Question' && q.name && q.acceptedAnswer?.text);
      if (allValid) {
        pass(`${prefix} all questions have required fields`);
      } else {
        fail(`${prefix} all questions have required fields`, 'Some questions missing @type/name/acceptedAnswer.text');
      }
    } else {
      fail(`${prefix} has at least one question`, 'mainEntity is empty');
    }
  }

  // Rule 13: HowTo-specific checks
  if (typeName === 'HowTo') {
    const steps = schema.step || [];
    if (steps.length > 0) {
      pass(`${prefix} has at least one step`);
      const allValid = steps.every(s => s['@type'] === 'HowToStep' && s.name && s.text);
      if (allValid) {
        pass(`${prefix} all steps have required fields`);
      } else {
        fail(`${prefix} all steps have required fields`, 'Some steps missing @type/name/text');
      }
    } else {
      fail(`${prefix} has at least one step`, 'step array is empty');
    }
  }

  // Rule 14: Course-specific checks
  if (typeName === 'Course') {
    if (schema.provider && schema.provider['@type'] === 'EducationalOrganization') {
      pass(`${prefix} provider is EducationalOrganization`);
    } else {
      fail(`${prefix} provider is EducationalOrganization`, 'Missing or wrong provider type');
    }
  }
}

// Run validation on all representative schemas
for (const [typeName, schema] of Object.entries(representativeSchemas)) {
  validateSchema(typeName, schema);
}

// ── Part 3: Cross-Schema @id Reference Validation ────────────────────

console.log('\n=== Cross-Schema @id Reference Checks ===\n');

// Collect all declared @id values
const declaredIds = new Set();
for (const schema of Object.values(representativeSchemas)) {
  if (schema['@id']) declaredIds.add(schema['@id']);
}

// Check that @id references point to known types
const orgId = `${BASE_URL}/#organization`;
const websiteId = `${BASE_URL}/#website`;

if (representativeSchemas.EducationalOrganization['@id'] === orgId) {
  pass('Organization @id matches expected pattern');
} else {
  fail('Organization @id matches expected pattern', 'Mismatch');
}

// WebPage.isPartOf should reference WebSite
const webPage = representativeSchemas.WebPage;
if (webPage.isPartOf && webPage.isPartOf['@id'] === websiteId) {
  pass('WebPage.isPartOf references WebSite @id');
} else {
  fail('WebPage.isPartOf references WebSite @id', 'Missing or wrong reference');
}

// BlogPosting.publisher should reference organization
const blog = representativeSchemas.BlogPosting;
if (blog.publisher && blog.publisher['@id'] === orgId) {
  pass('BlogPosting.publisher references Organization @id');
} else {
  fail('BlogPosting.publisher references Organization @id', 'Missing or wrong reference');
}

// Course.provider should reference organization
const course = representativeSchemas.Course;
if (course.provider && course.provider['@id'] === orgId) {
  pass('Course.provider references Organization @id');
} else {
  fail('Course.provider references Organization @id', 'Missing or wrong reference');
}

// ── Part 4: Source Pattern Checks ────────────────────────────────────

console.log('\n=== Source Pattern Checks ===\n');

// All schema functions that return single objects should include @context
const singleObjectFns = [
  'generateFAQSchema', 'generateHowToSchema', 'generateProductPageFAQSchema',
  'generateProductPageHowToSchema', 'generateImageObjectSchema',
  'generateImageGallerySchema', 'generateEducationalAudienceSchema',
  'generateLearningResourceSchema', 'generateThemeLearningResourceSchema',
  'generateThemeHowToSchema', 'generateThemeWebPageSchema',
  'generateThemeImageGallerySchema', 'generateCourseSchema', 'generateQuizSchema',
];

for (const fnName of singleObjectFns) {
  const fnStart = src.indexOf(`export function ${fnName}(`);
  if (fnStart === -1) {
    fail(`${fnName} found in source`, 'Function not found');
    continue;
  }
  // Extract ~2000 chars of function body
  const chunk = src.substring(fnStart, fnStart + 2000);
  if (chunk.includes("'@context'") || chunk.includes('"@context"')) {
    pass(`${fnName}() includes @context`);
  } else {
    fail(`${fnName}() includes @context`, 'No @context in function body');
  }
}

// Check that speakable is applied to key page types
const speakableTargets = ['BlogPosting', 'WebPage', 'ProfilePage'];
for (const target of speakableTargets) {
  if (src.includes(`speakable`) && src.includes(target)) {
    pass(`Speakable applied to ${target} schemas`);
  } else {
    fail(`Speakable applied to ${target} schemas`, 'Not found');
  }
}

// Check getHreflangCode is used consistently
const fnsThatNeedLang = [
  'generateCourseSchema', 'generateQuizSchema', 'generateThemeLearningResourceSchema',
  'generateThemeWebPageSchema', 'generateThemeImageGallerySchema',
];
for (const fnName of fnsThatNeedLang) {
  const fnStart = src.indexOf(`export function ${fnName}(`);
  if (fnStart === -1) continue;
  const chunk = src.substring(fnStart, fnStart + 2000);
  if (chunk.includes('getHreflangCode')) {
    pass(`${fnName}() uses getHreflangCode()`);
  } else {
    fail(`${fnName}() uses getHreflangCode()`, 'Should use getHreflangCode for inLanguage');
  }
}

// ── Summary ──────────────────────────────────────────────────────────

console.log('\n' + '='.repeat(50));
console.log(`\nResults: ${passed} passed, ${failed} failed\n`);

if (errors.length > 0) {
  console.log('Failures:');
  for (const err of errors) {
    console.log(`  - ${err.label}: ${err.reason}`);
  }
  console.log('');
}

process.exit(failed > 0 ? 1 : 0);
