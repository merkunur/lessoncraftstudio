const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'frontend', 'lib', 'schema-generator.ts');
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

// Helper: extract line range (1-indexed, inclusive)
function extract(start, end) {
  return lines.slice(start - 1, end).join('\n');
}

// Build the new file from only the used sections
const sections = [];

// 1. Updated header
sections.push(`/**
 * SEO Schema Markup Generator
 * Generates JSON-LD structured data for pages
 * Supports: FAQ, Homepage, Apps Collection, About, and Static Page schemas
 */`);

// 2. authorSchemaDescriptions + authorKnowsAbout (used by generateAboutPageSchemas)
// Lines 26-52
sections.push(extract(26, 52));

// 3. getBaseUrl + getSpeakableSpecification (used internally)
// Lines 54-66
sections.push(extract(54, 66));

// 4. generateFAQSchema (used by homepage + faq page)
// Lines 313-331 (includes JSDoc comment)
sections.push(extract(313, 331));

// 5. generateHomepageSchemas (used by homepage) — fully self-contained
// Lines 358-519 (includes JSDoc comment)
sections.push(extract(358, 519));

// 6. generateAppsCollectionSchema + generateAppsItemListSchema (used by apps page)
// Lines 521-612 (includes JSDoc comments)
sections.push(extract(521, 612));

// 7. localizedHomeLabel (used by generateAboutPageSchemas + generateStaticPageSchemas)
// Lines 644-659 (includes JSDoc comment)
sections.push(extract(644, 659));

// 8. ogLocaleMap + hreflangMap + getHreflangCode (widely used)
// Lines 807-850
sections.push(extract(807, 850));

// 9. generateAboutPageSchemas (used by about page)
// Lines 1516-1605 (includes JSDoc comment)
sections.push(extract(1516, 1605));

// 10. generateStaticPageSchemas (used by terms, privacy, license, contact)
// Lines 1607-1671
sections.push(extract(1607, 1671));

const output = sections.join('\n\n');

fs.writeFileSync(filePath, output, 'utf8');

// Count lines
const newLineCount = output.split('\n').length;
const oldLineCount = lines.length;
console.log(`Schema generator cleaned: ${oldLineCount} -> ${newLineCount} lines`);
console.log(`Removed ${oldLineCount - newLineCount} lines of dead code`);
