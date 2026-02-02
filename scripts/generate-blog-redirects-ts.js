/**
 * Generate blog-redirects.ts from the JSON audit output
 *
 * Usage: node scripts/generate-blog-redirects-ts.js
 */

const fs = require('fs');
const path = require('path');

const jsonPath = path.join(__dirname, 'blog-legacy-slugs-simplified.json');
const outputPath = path.join(__dirname, '../frontend/config/blog-redirects.ts');
const jsOutputPath = path.join(__dirname, '../frontend/config/blog-redirects.js');

if (!fs.existsSync(jsonPath)) {
  console.error('Error: blog-legacy-slugs-simplified.json not found');
  console.error('Run audit-blog-legacy-slugs.js first to generate it');
  process.exit(1);
}

const data = require(jsonPath);

const tsContent = `/**
 * Blog Legacy Slug Redirects (Generated)
 *
 * Auto-generated mapping of old blog slugs to new SEO slugs.
 * Generated from: scripts/audit-blog-legacy-slugs.js
 * Generated: ${new Date().toISOString()}
 *
 * Includes both:
 * - HTML filename slugs (from original HTML blog files)
 * - Markdown URL slugs (from **URL Slug** fields in .md files)
 * - Intermediate slugs (HTML slugs without -final-optimized suffix)
 *
 * Total redirects: ${data.length}
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

export const legacyBlogSlugs: BlogLegacySlug[] = ${JSON.stringify(data, null, 2)};

/**
 * Generate Next.js redirect config entries for legacy blog slugs.
 * This is no longer used - middleware handles redirects dynamically.
 * Kept for reference/documentation.
 */
export function generateLegacyBlogRedirects(): Redirect[] {
  return legacyBlogSlugs.map(({ oldSlug, newSlug, locale }) => ({
    source: \`/\${locale}/blog/\${oldSlug}\`,
    destination: \`/\${locale}/blog/\${newSlug}\`,
    permanent: true,
  }));
}
`;

// Also generate JS version for CommonJS imports (used by middleware)
const jsContent = `/**
 * Blog Legacy Slug Redirects (Generated)
 *
 * Auto-generated mapping of old blog slugs to new SEO slugs.
 * Generated from: scripts/audit-blog-legacy-slugs.js
 * Generated: ${new Date().toISOString()}
 *
 * Total redirects: ${data.length}
 */

const legacyBlogSlugs = ${JSON.stringify(data, null, 2)};

module.exports = { legacyBlogSlugs };
`;

fs.writeFileSync(outputPath, tsContent);
fs.writeFileSync(jsOutputPath, jsContent);

console.log(`Generated ${outputPath}`);
console.log(`Generated ${jsOutputPath}`);
console.log(`Total redirects: ${data.length}`);
