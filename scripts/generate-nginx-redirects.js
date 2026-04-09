#!/usr/bin/env node
/**
 * generate-nginx-redirects.js
 *
 * Reads the rename map and source map to generate an nginx map file
 * that 301-redirects old image URLs to new SEO-friendly URLs.
 *
 * This preserves SEO equity for any old URLs Google has cached.
 *
 * Output: scripts/nginx-image-redirects.conf
 *
 * Usage: node scripts/generate-nginx-redirects.js
 *
 * Installation on server:
 *   1. Copy nginx-image-redirects.conf to /etc/nginx/conf.d/
 *   2. Add to the server block in the main nginx config:
 *        include /etc/nginx/conf.d/nginx-image-redirects.conf;
 *   3. Reload nginx: nginx -t && systemctl reload nginx
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

// Language folders and app folders used in the URL path
const LANGUAGE_FOLDERS = [
  'english', 'german', 'french', 'spanish', 'portuguese',
  'italian', 'dutch', 'swedish', 'danish', 'norwegian', 'finnish'
];

// App folder names (from the guide-showcase-configs appData)
const APP_FOLDERS = [
  'addition', 'subtraction', 'code addition', 'more less',
  'math puzzle', 'math worksheet', 'alphabet train', 'prepositions',
  'word guess', 'word scramble', 'wordsearch', 'cryptogram',
  'writing', 'big small', 'pattern train', 'pattern worksheet',
  'draw and color', 'drawing lines', 'coloring', 'chart count',
  'matching', 'grid match', 'shadow match', 'bingo',
  'picture sort', 'missing pieces', 'odd one out', 'sudoku',
  'picture path', 'find and count', 'find objects', 'crossword',
  'treasure hunt'
];

function encodeForNginx(str) {
  // nginx map uses URI-encoded values
  return encodeURIComponent(str).replace(/%2F/g, '/');
}

function main() {
  const mapPath = path.join(ROOT, 'scripts', 'image-rename-map.json');
  const sourcePath = path.join(ROOT, 'scripts', 'image-rename-sources.json');

  if (!fs.existsSync(mapPath)) {
    console.error('ERROR: image-rename-map.json not found. Run generate-image-rename-map.js first.');
    process.exit(1);
  }

  const renameMap = JSON.parse(fs.readFileSync(mapPath, 'utf-8'));
  const sourceMap = fs.existsSync(sourcePath) ? JSON.parse(fs.readFileSync(sourcePath, 'utf-8')) : {};

  // Build nginx map entries
  // Each old filename can appear in multiple language/app combinations
  // We generate redirects for all possible URL paths
  const mapEntries = [];
  let entryCount = 0;

  // For each renamed file, determine which language folders it could appear in
  // by checking the source configs that reference it
  for (const [oldName, newName] of Object.entries(renameMap)) {
    const sources = sourceMap[oldName] || [];

    // Determine which language(s) this file belongs to
    const languages = new Set();
    for (const src of sources) {
      if (src.includes('danish-')) languages.add('danish');
      else if (src.includes('dutch-')) languages.add('dutch');
      else if (src.includes('finnish-')) languages.add('finnish');
      else if (src.includes('french-')) languages.add('french');
      else if (src.includes('german-')) languages.add('german');
      else if (src.includes('italian-')) languages.add('italian');
      else if (src.includes('norwegian-')) languages.add('norwegian');
      else if (src.includes('portuguese-')) languages.add('portuguese');
      else if (src.includes('spanish-')) languages.add('spanish');
      else if (src.includes('swedish-')) languages.add('swedish');
      else if (src.includes('showcase-configs.ts') || src.includes('guide-showcase-configs.ts')) {
        languages.add('english'); // English is the default in these configs
      }
      else if (src.includes('schema-generator') || src.includes('image-sitemap') || src.includes('gallery') || src.includes('og/route') || src.includes('page.tsx')) {
        // These reference images across all languages but via the same filename
        // Only add english for now — the language-specific configs handle other langs
        languages.add('english');
      }
    }

    // If no language detected, include english as fallback
    if (languages.size === 0) languages.add('english');

    // For each language, create redirect entries for all possible app folders
    for (const lang of languages) {
      for (const appFolder of APP_FOLDERS) {
        const oldUri = `/samples/${lang}/${encodeForNginx(appFolder)}/${encodeForNginx(oldName)}`;
        const newUri = `/samples/${lang}/${encodeForNginx(appFolder)}/${encodeForNginx(newName)}`;
        mapEntries.push(`    "${oldUri}" "${newUri}";`);
        entryCount++;
      }
    }
  }

  // This would create way too many entries (1889 files x 33 apps x avg 1.5 langs = ~93k)
  // Instead, use a simpler approach: nginx regex map that just transforms the filename part
  // regardless of path

  // Better approach: use a simple filename-only map
  const filenameMapEntries = [];
  for (const [oldName, newName] of Object.entries(renameMap)) {
    filenameMapEntries.push(`    "${encodeURIComponent(oldName)}" "${encodeURIComponent(newName)}";`);
  }

  const confContent = `# Auto-generated image redirect map for SEO-friendly filenames
# Generated: ${new Date().toISOString()}
# Entries: ${Object.keys(renameMap).length}
#
# This map redirects old image filenames to new SEO-friendly names.
# Old URLs with spaces (%20) and mixed case are 301-redirected to
# lowercase hyphenated versions.
#
# Installation:
#   1. Copy to /etc/nginx/conf.d/nginx-image-redirects.conf
#   2. In the http{} block of /etc/nginx/nginx.conf, add:
#        include /etc/nginx/conf.d/nginx-image-redirects.conf;
#   3. In the server{} block, add the redirect logic (see bottom of file)
#   4. Test: nginx -t
#   5. Reload: systemctl reload nginx

# Map old filenames to new filenames (URI-encoded)
map $image_filename $new_image_filename {
    default "";
${filenameMapEntries.join('\n')}
}

# === Add this to your server {} block that serves /samples/ ===
#
# # Extract the filename from the samples path
# # Matches: /samples/{lang}/{app}/{filename}
# location ~ ^/samples/([^/]+)/([^/]+)/(.+)$ {
#     set $sample_lang $1;
#     set $sample_app $2;
#     set $image_filename $3;
#
#     # If there's a new filename, redirect
#     if ($new_image_filename != "") {
#         return 301 /samples/$sample_lang/$sample_app/$new_image_filename;
#     }
#
#     # Otherwise serve normally from isolated storage
#     alias /var/www/lcs-media/samples/$sample_lang/$sample_app/$image_filename;
#     expires 1y;
#     add_header Cache-Control "public, immutable";
# }
`;

  const outputPath = path.join(ROOT, 'scripts', 'nginx-image-redirects.conf');
  fs.writeFileSync(outputPath, confContent, 'utf-8');

  console.log(`nginx redirect map written to: ${outputPath}`);
  console.log(`  Filename entries: ${Object.keys(renameMap).length}`);
  console.log(`\nTo install on server:`);
  console.log(`  1. Upload: pscp nginx-image-redirects.conf root@server:/etc/nginx/conf.d/`);
  console.log(`  2. Update nginx config with the server block changes shown in the file`);
  console.log(`  3. Test: nginx -t`);
  console.log(`  4. Reload: systemctl reload nginx`);
}

main();
