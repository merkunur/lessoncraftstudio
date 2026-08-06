/**
 * Fix Swedish Related Post Slugs
 *
 * The SV blog content files reference incorrect related post slugs that don't
 * match the actual slugs in blog-page-slugs.ts. This script fixes them.
 *
 * Usage: node scripts/fix-sv-related-post-slugs.js
 */

const fs = require('fs');
const path = require('path');

// Mapping: bad slug in SV content files → correct slug from blog-page-slugs.ts
const SLUG_FIXES = {
  'anvend-tematiska-bilder-saelj-arbetsblad': 'anvaend-temabilder-saelja-arbetsblad',
  'arbetsblad-designtips-saelj-mer': 'arbetsblad-design-tips-saelj-mer',
  'arbetsblad-generator-vs-canva-jaemfoerelse': 'arbetsblad-generator-eller-canva-jaemfoerelse',
  'arbetsblad-kvalitet-vs-kvantitet-etsy': 'arbetsblad-kvalitet-kvantitet-etsy',
  'bondgaardsdjur-utskrifter-saelj': 'bondgaardsdjur-printables-saelja',
  'dinosaurie-utskrifter-saelj-evergreen': 'dinosaurie-printables-saelja-evergreen',
  'esl-arbetsblad-global-marknad': 'sfi-arbetsblad-global-marknad',
  'etsy-prissaettning-utskrifter': 'etsy-printable-prisstrategi',
  'etsy-seo-utskriftsfoersaeljare-2026': 'etsy-seo-printable-saeljare-2026',
  'flersprakiga-utskrifter-foerdel': 'flersprakiga-printables-foerdel',
  'foerskola-utskrifter-baestsaeljare': 'foerskola-printables-baestsaeljare',
  'formatera-arbetsblad-etsy-listning': 'formatera-arbetsblad-etsy-annons',
  'korsord-boecker-kdp-nisch': 'korsordboecker-kdp-nisch',
  'saesong-utskrifts-kalender-saeljare': 'saesongskalender-printable-saeljare',
  'skala-utskriftsfoeretagande-automatisering': 'skala-printable-foeretagande-automatisering',
  'utskriftsfoeretagande-inkomst-realistisk': 'printable-foeretagande-inkomst-realistisk',
};

const SV_DIR = path.join(__dirname, '..', 'frontend', 'config', 'blog-content', 'sv');

// First, verify all target slugs exist in blog-page-slugs.ts
function verifyTargetSlugs() {
  const slugsFile = fs.readFileSync(
    path.join(__dirname, '..', 'frontend', 'config', 'blog-page-slugs.ts'), 'utf8'
  );

  const allSvSlugs = new Set();
  const svRegex = /sv:\s*'([^']+)'/g;
  let match;
  while ((match = svRegex.exec(slugsFile)) !== null) {
    allSvSlugs.add(match[1]);
  }

  console.log(`Found ${allSvSlugs.size} SV slugs in blog-page-slugs.ts\n`);

  let allValid = true;
  for (const [bad, good] of Object.entries(SLUG_FIXES)) {
    if (!allSvSlugs.has(good)) {
      console.error(`ERROR: Target slug not found in blog-page-slugs.ts: ${good}`);
      allValid = false;
    }
  }
  return allValid;
}

function fixFiles() {
  const files = fs.readdirSync(SV_DIR).filter(f => f.endsWith('.ts'));
  let totalFixes = 0;
  let filesFixed = 0;

  for (const file of files) {
    const filePath = path.join(SV_DIR, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let fixCount = 0;

    for (const [bad, good] of Object.entries(SLUG_FIXES)) {
      if (content.includes(bad)) {
        content = content.split(bad).join(good);
        fixCount++;
      }
    }

    if (fixCount > 0) {
      fs.writeFileSync(filePath, content, 'utf8');
      totalFixes += fixCount;
      filesFixed++;
      console.log(`  Fixed ${file}: ${fixCount} slug(s) replaced`);
    }
  }

  return { totalFixes, filesFixed };
}

// Verify targets exist
console.log('Verifying target slugs...');
if (!verifyTargetSlugs()) {
  console.error('\nSome target slugs are invalid. Checking and correcting...');
  // Let's find the actual correct slugs
  const slugsFile = fs.readFileSync(
    path.join(__dirname, '..', 'frontend', 'config', 'blog-page-slugs.ts'), 'utf8'
  );

  for (const [bad, good] of Object.entries(SLUG_FIXES)) {
    if (!slugsFile.includes(`'${good}'`)) {
      // Find closest match
      const allSvSlugs = [];
      const svRegex = /sv:\s*'([^']+)'/g;
      let match;
      while ((match = svRegex.exec(slugsFile)) !== null) {
        allSvSlugs.push(match[1]);
      }

      const badWords = good.split('-');
      let bestMatch = null;
      let bestScore = 0;
      for (const slug of allSvSlugs) {
        const words = slug.split('-');
        const common = badWords.filter(w => words.includes(w)).length;
        if (common > bestScore) {
          bestScore = common;
          bestMatch = slug;
        }
      }
      console.log(`  ${bad} -> SUGGESTED: ${bestMatch} (score=${bestScore})`);
    }
  }
  process.exit(1);
}

console.log('All target slugs verified.\n');
console.log('Fixing SV related post slugs...\n');
const { totalFixes, filesFixed } = fixFiles();
console.log(`\nDone: ${totalFixes} slug replacements across ${filesFixed} files`);
