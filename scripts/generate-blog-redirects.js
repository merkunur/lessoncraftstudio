/**
 * Generate blog-redirects.ts from audit JSON output
 *
 * Usage: node scripts/generate-blog-redirects.js
 */

const fs = require('fs');
const path = require('path');

// Find the JSON file
const possiblePaths = [
  path.join(__dirname, 'blog-legacy-slugs.json'),
  '/opt/lessoncraftstudio/scripts/blog-legacy-slugs.json',
];

let jsonPath = null;
for (const p of possiblePaths) {
  if (fs.existsSync(p)) {
    jsonPath = p;
    break;
  }
}

if (!jsonPath) {
  console.error('Could not find blog-legacy-slugs.json');
  console.error('Run audit-blog-legacy-slugs.js first to generate it.');
  process.exit(1);
}

console.log(`Reading from: ${jsonPath}`);
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

// Transform to the format expected by blog-redirects.js (remove postIndex and source)
const slugs = data.map(m => ({
  oldSlug: m.oldSlug,
  newSlug: m.newSlug,
  locale: m.locale,
}));

const content = `/**
 * Blog Legacy Slug Redirects (Generated)
 *
 * Auto-generated mapping of old blog slugs to new SEO slugs.
 * Generated from: scripts/audit-blog-legacy-slugs.js
 * Generated: ${new Date().toISOString()}
 *
 * Includes both:
 * - HTML filename slugs (from original HTML blog files)
 * - Markdown URL slugs (from **URL Slug** fields in .md files)
 *
 * Total redirects: ${slugs.length}
 */

interface Redirect {
  source: string;
  destination: string;
  permanent: boolean;
}

export interface BlogLegacySlug {
  oldSlug: string;
  newSlug: string;
  locale: string;
}

export const legacyBlogSlugs: BlogLegacySlug[] = ${JSON.stringify(slugs, null, 2)};

/**
 * Generate redirect entries for legacy blog slugs.
 * Returns array of { source, destination, permanent } for each legacy slug.
 */
export function generateLegacyBlogRedirects(): Redirect[] {
  const redirects: Redirect[] = [];

  for (const { oldSlug, newSlug, locale } of legacyBlogSlugs) {
    // Add redirect for each locale's old slug to its new slug
    redirects.push({
      source: \`/\${locale}/blog/\${oldSlug}\`,
      destination: \`/\${locale}/blog/\${newSlug}\`,
      permanent: true,
    });
  }

  return redirects;
}

/**
 * Main export function for use in next.config.js
 */
export function generateBlogRedirects(): Redirect[] {
  return generateLegacyBlogRedirects();
}

// CommonJS export for next.config.js compatibility
module.exports = {
  legacyBlogSlugs,
  generateLegacyBlogRedirects,
  generateBlogRedirects,
};
`;

// Find output path
const possibleOutputPaths = [
  path.join(__dirname, '..', 'frontend', 'config', 'blog-redirects.ts'),
  '/opt/lessoncraftstudio/frontend/config/blog-redirects.ts',
];

let outputPath = null;
for (const p of possibleOutputPaths) {
  const dir = path.dirname(p);
  if (fs.existsSync(dir)) {
    outputPath = p;
    break;
  }
}

if (!outputPath) {
  console.error('Could not find frontend/config directory');
  process.exit(1);
}

fs.writeFileSync(outputPath, content);
console.log(`Generated ${outputPath}`);
console.log(`Total redirects: ${slugs.length}`);
