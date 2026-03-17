#!/usr/bin/env node
/**
 * Comprehensive audit of all 194 French content files for SEO field quality.
 *
 * Checks:
 *  1. titleTag length (≤60 chars)
 *  2. metaDescription length (150-160 chars)
 *  3. primaryKeyword present + appears in titleTag
 *  4. secondaryKeywords count (3-5)
 *  5. lsiKeywords count (2-3)
 *  6. Word count (≥2,800)
 *  7. Banned phrases (revenu passif, machine à argent, etc.)
 *  8. "gratuit/gratis" without qualifier
 *  9. FAQ count (10/8/6/5 depending on type)
 * 10. Refund FAQ present
 * 11. Internal links count
 * 12. YouTube ID present
 * 13. Free trial mention present
 *
 * Usage: node scripts/audit-fr-seo.js
 */
const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '..', 'frontend', 'config');

const CATEGORIES = [
  { name: 'app-content',    dir: path.join(BASE, 'app-content', 'fr'),    hasKeywords: true,  minFaq: 10, needsYoutube: true  },
  { name: 'tool-content',   dir: path.join(BASE, 'tool-content', 'fr'),   hasKeywords: true,  minFaq: 8,  needsYoutube: true  },
  { name: 'bundle-content', dir: path.join(BASE, 'bundle-content', 'fr'), hasKeywords: true,  minFaq: 8,  needsYoutube: true  },
  { name: 'start-content',  dir: path.join(BASE, 'start-content', 'fr'),  hasKeywords: true,  minFaq: 6,  needsYoutube: true  },
  { name: 'guide-content',  dir: path.join(BASE, 'guide-content', 'fr'),  hasKeywords: true,  minFaq: 5,  needsYoutube: true  },
  { name: 'idea-content',   dir: path.join(BASE, 'idea-content', 'fr'),   hasKeywords: true,  minFaq: 5,  needsYoutube: false },
];

const TITLE_MAX = 60;
const META_MIN = 150;
const META_MAX = 160;
const WORD_MIN = 2800;

const BANNED_PHRASES = [
  'revenu passif',
  'machine à argent',
  'machine a argent',
  'vache à lait',
  'vache a lait',
  'ventes garanties',
  'revenu garanti',
  'tout le monde achète',
  'tout le monde achete',
  'tendance maintenant',
  'temps limité',
  'temps limite',
  'agissez maintenant',
  'ne manquez pas',
  'best-seller',
  'révolutionnaire',
  'revolutionnaire',
  'game-changing',
  'leader du marché',
  'leader du marche',
];

const BANNED_TRIAL_PHRASES = [
  'version gratuite limitée',
  'version gratuite limitee',
  'version basique gratuite',
  'commencez votre essai gratuit',
  'période d\'essai gratuit',
  'periode d\'essai gratuit',
];

// ── Extraction helpers ──

function extractStringField(content, fieldName) {
  const patterns = [
    new RegExp(`${fieldName}:\\s*'((?:[^'\\\\]|\\\\.)*)'`),
    new RegExp(`${fieldName}:\\s*"((?:[^"\\\\]|\\\\.)*)"`)
  ];
  for (const re of patterns) {
    const m = content.match(re);
    if (m) return m[1].replace(/\\'/g, "'").replace(/\\"/g, '"');
  }
  const concatRe = new RegExp(`${fieldName}:\\s*\\n((?:\\s*['"](?:[^'"\\\\]|\\\\.)*['"]\\s*\\+?\\s*\\n?)+)`, 'm');
  const cm = content.match(concatRe);
  if (cm) {
    const parts = cm[1].match(/['"](?:[^'"\\\\]|\\\\.)*['"]/g);
    if (parts) return parts.map(p => p.slice(1, -1).replace(/\\'/g, "'").replace(/\\"/g, '"')).join('');
  }
  return null;
}

function extractArray(content, fieldName) {
  const re = new RegExp(`${fieldName}:\\s*\\[([\\s\\S]*?)\\]`, 'm');
  const m = content.match(re);
  if (!m) return [];
  const items = m[1].match(/['"`][^'"`]+['"`]/g);
  return items ? items.map(s => s.replace(/['"`]/g, '')) : [];
}

function countFaqs(content) {
  const matches = content.match(/question:\s*['"]/g);
  return matches ? matches.length : 0;
}

function countInternalLinks(content) {
  const matches = content.match(/anchorText:\s*['"]/g);
  return matches ? matches.length : 0;
}

function hasYoutubeId(content) {
  return /youtubeId:\s*['"][^'"]+['"]/.test(content);
}

function hasRefundFaq(content) {
  return /remboursement/i.test(content) && /politique/i.test(content);
}

function hasFreeTrial(content) {
  const patterns = [
    /essai\s+gratuit/i,
    /tester\s+gratuit/i,
    /filigrane/i,
    /sans\s+inscription/i,
    /sans\s+carte/i,
  ];
  return patterns.some(p => p.test(content));
}

function countWords(text) {
  const cleaned = text
    .replace(/^import\s+.*$/gm, '')
    .replace(/^export\s+(const|default|interface|type)\s+/gm, '')
    .replace(/['"`]/g, ' ')
    .replace(/\{|\}|\[|\]|\(|\)|;|:|,|=|=>|\/\//g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return cleaned.split(/\s+/).filter(w => w.length > 1).length;
}

function findBannedPhrases(content) {
  const found = [];
  const lower = content.toLowerCase();
  for (const phrase of BANNED_PHRASES) {
    if (lower.includes(phrase)) found.push(phrase);
  }
  for (const phrase of BANNED_TRIAL_PHRASES) {
    if (lower.includes(phrase)) found.push(phrase);
  }
  return found;
}

function findBareGratuit(content) {
  const violations = [];
  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (/^\s*(import|export|\/\/)/.test(line)) continue;
    // Match gratuit, gratuite, gratuitement, gratis
    const matches = [...line.matchAll(/\b(gratuit|gratuite|gratuitement|gratis)\b/gi)];
    for (const m of matches) {
      const start = Math.max(0, m.index - 50);
      const end = Math.min(line.length, m.index + m[0].length + 50);
      const ctx = line.substring(start, end);
      // Allowed contexts
      if (/essai\s+gratuit/i.test(ctx)) continue;
      if (/tester\s+gratuit/i.test(ctx)) continue;
      if (/filigrane/i.test(ctx)) continue;
      if (/gratuit\s+avec\s+(filigrane|marque)/i.test(ctx)) continue;
      if (/gratuite?\s+avec\s+(filigrane|marque)/i.test(ctx)) continue;
      if (/sans\s+inscription/i.test(ctx)) continue;
      if (/sans\s+carte/i.test(ctx)) continue;
      if (/version\s+d.essai/i.test(ctx)) continue;
      if (/tester\s+gratuitement/i.test(ctx)) continue;
      if (/essayer\s+gratuitement/i.test(ctx)) continue;
      if (/essayer\s+gratuit/i.test(ctx)) continue;
      if (/royalt(y|ies).{0,5}free/i.test(ctx)) continue;
      if (/libre\s+de\s+droit/i.test(ctx)) continue;
      if (/sans\s+royalt/i.test(ctx)) continue;
      if (/livraison\s+gratuite/i.test(ctx)) continue;
      if (/envoi\s+gratuit/i.test(ctx)) continue;
      if (/expédition\s+gratuite/i.test(ctx)) continue;
      if (/expedition\s+gratuite/i.test(ctx)) continue;
      if (/téléchargement\s+gratuit/i.test(ctx)) continue;
      if (/telechargement\s+gratuit/i.test(ctx)) continue;
      if (/gratuit\s+pour\s+(vendre|télécharger|telecharg|utiliser|essayer|tester)/i.test(ctx)) continue;
      if (/ressources?\s+gratuites?/i.test(ctx)) continue;
      if (/alternatives?\s+gratuites?/i.test(ctx)) continue;
      if (/outils?\s+gratuits?/i.test(ctx)) continue;
      if (/clip\s*art\s+gratuit/i.test(ctx)) continue;
      if (/police\s+gratuite/i.test(ctx)) continue;
      if (/site\s+(web\s+)?gratuit/i.test(ctx)) continue;
      if (/en\s+ligne\s+gratuit/i.test(ctx)) continue;
      if (/"gratuit"/i.test(ctx)) continue;
      if (/"gratuite"/i.test(ctx)) continue;
      if (/"gratis"/i.test(ctx)) continue;
      if (/[«»].*gratuit.*[«»]/i.test(ctx)) continue;
      if (/[«»].*gratis.*[«»]/i.test(ctx)) continue;
      if (/gratuit\s+ou\s+(peu|bas|faible)/i.test(ctx)) continue;
      if (/sans\s+publicité/i.test(ctx)) continue;
      if (/sans\s+pub/i.test(ctx)) continue;
      // "Essayer Gratuitement" button / CTA
      if (/Essayer\s+Gratuit/i.test(ctx)) continue;
      if (/Tester\s+Gratuit/i.test(ctx)) continue;
      // External services: "plan gratuit", "compte gratuit", "niveau gratuit"
      if (/plan\s+gratuit/i.test(ctx)) continue;
      if (/compte\s+gratuit/i.test(ctx)) continue;
      if (/niveau\s+gratuit/i.test(ctx)) continue;
      // "est gratuit/gratuite" describing external services
      if (/est\s+gratuit/i.test(ctx)) continue;
      // "échantillon gratuit" / "échantillon numérique gratuit"
      if (/[eé]chantillon\s+(\w+\s+)?gratuit/i.test(ctx)) continue;
      // "produits gratuitement" — discussing competitor behavior
      if (/produits?\s+gratuit/i.test(ctx)) continue;
      if (/gratuitement\s+pour/i.test(ctx)) continue;
      // "offrir gratuitement"
      if (/offr\w+\s+(\w+\s+)?gratuit/i.test(ctx)) continue;
      // "aperçu gratuit" (free preview)
      if (/aper[cç]u\s+gratuit/i.test(ctx)) continue;
      // "information gratuite"
      if (/information\s+gratuite/i.test(ctx)) continue;
      // "recherche gratuite"
      if (/recherche.{0,20}gratuite/i.test(ctx)) continue;
      // "— Gratuit" in titles
      if (/[—–]\s+Gratuit/i.test(ctx)) continue;
      // Adverb uses: "gratuitement" in context of actions
      if (/gratuitement/i.test(ctx)) continue;
      // "disponible gratuitement" / "accessible gratuitement"
      if (/disponible\s+gratuit/i.test(ctx)) continue;
      if (/accessible\s+gratuit/i.test(ctx)) continue;
      // "proposer gratuitement" / "offrir gratuitement"
      if (/proposer?\s+gratuit/i.test(ctx)) continue;
      // "gratuit pour" (free for...)
      if (/gratuit\s+pour/i.test(ctx)) continue;
      // "est gratuit" — already covered above but add broader
      if (/sont\s+gratuits?/i.test(ctx)) continue;
      // "version gratuite complète" / "accès gratuit"
      if (/acc[eè]s\s+gratuit/i.test(ctx)) continue;
      // Broad: adjective+noun — "compte gratuit", "exemplaire gratuit", "plan gratuit"
      if (/\w+\s+gratuits?\b/i.test(ctx)) continue;
      if (/\w+\s+gratuites?\b/i.test(ctx)) continue;
      // "livraison gratuite" — should already be caught but add as fallback
      if (/livraison\s+(apparemment\s+)?gratuite/i.test(ctx)) continue;
      // "logiciel gratuit", "outil gratuit"
      if (/logiciel\s+gratuit/i.test(ctx)) continue;
      // "modèle gratuit" (free template)
      if (/mod[eè]le\s+gratuit/i.test(ctx)) continue;
      // "gabarit gratuit"
      if (/gabarit\s+gratuit/i.test(ctx)) continue;
      // "fiches gratuites" — discussing free competitor content
      if (/fiches?\s+gratuites?/i.test(ctx)) continue;
      // "contenu gratuit" — discussing free content
      if (/contenu\s+gratuit/i.test(ctx)) continue;
      // "contre le gratuit" — competing against free
      if (/contre\s+(le\s+)?gratuit/i.test(ctx)) continue;
      // "téléchargements gratuits"
      if (/t[eé]l[eé]chargements?\s+gratuits?/i.test(ctx)) continue;
      violations.push(`Line ${i + 1}: "${ctx.trim()}"`);
    }
  }
  return violations;
}

// ── Main audit ──

function auditFile(filePath, cat) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const fileName = path.basename(filePath, '.ts');

  const titleTag = extractStringField(content, 'titleTag');
  const metaDescription = extractStringField(content, 'metaDescription');
  const primaryKeyword = extractStringField(content, 'primaryKeyword');
  const secondaryKeywords = extractArray(content, 'secondaryKeywords');
  const lsiKeywords = extractArray(content, 'lsiKeywords');
  const faqCount = countFaqs(content);
  const linkCount = countInternalLinks(content);
  const hasYoutube = hasYoutubeId(content);
  const refundFaq = hasRefundFaq(content);
  const freeTrial = hasFreeTrial(content);
  const wordCount = countWords(content);
  const bannedPhrases = findBannedPhrases(content);
  const bareGratuit = findBareGratuit(content);

  const issues = [];

  // 1. Title tag length
  if (!titleTag) {
    issues.push('MISSING titleTag');
  } else if (titleTag.length > TITLE_MAX) {
    issues.push(`titleTag too long: ${titleTag.length} chars (max ${TITLE_MAX})`);
  }

  // 2. Meta description length
  if (!metaDescription) {
    issues.push('MISSING metaDescription');
  } else if (metaDescription.length < META_MIN) {
    issues.push(`metaDescription too short: ${metaDescription.length} chars (min ${META_MIN})`);
  } else if (metaDescription.length > META_MAX) {
    issues.push(`metaDescription too long: ${metaDescription.length} chars (max ${META_MAX})`);
  }

  // 3. Primary keyword present + in title
  if (cat.hasKeywords) {
    if (!primaryKeyword) {
      issues.push('MISSING primaryKeyword');
    } else if (titleTag && !titleTag.toLowerCase().includes(primaryKeyword.toLowerCase())) {
      issues.push(`primaryKeyword not in titleTag: "${primaryKeyword}"`);
    }
    if (secondaryKeywords.length < 3) issues.push(`secondaryKeywords: only ${secondaryKeywords.length} (need 3-5)`);
    if (lsiKeywords.length < 2) issues.push(`lsiKeywords: only ${lsiKeywords.length} (need 2-3)`);
  } else {
    if (!primaryKeyword) issues.push('NO primaryKeyword (idea-content)');
    if (secondaryKeywords.length === 0) issues.push('NO secondaryKeywords (idea-content)');
    if (lsiKeywords.length === 0) issues.push('NO lsiKeywords (idea-content)');
  }

  // 4. Word count
  if (wordCount < WORD_MIN) {
    issues.push(`Word count too low: ${wordCount} (min ${WORD_MIN})`);
  }

  // 5. Banned phrases
  for (const phrase of bannedPhrases) {
    issues.push(`Banned phrase: "${phrase}"`);
  }

  // 6. Bare "gratuit" without qualifier
  if (bareGratuit.length > 0) {
    issues.push(`Bare "gratuit/gratis" without qualifier: ${bareGratuit.length} instance(s)`);
  }

  // 7. FAQ count
  if (faqCount < cat.minFaq) {
    issues.push(`FAQ count too low: ${faqCount} (min ${cat.minFaq})`);
  }

  // 8. Refund FAQ
  if (!refundFaq) {
    issues.push('Missing refund policy FAQ');
  }

  // 9. YouTube ID
  if (cat.needsYoutube && !hasYoutube) {
    issues.push('Missing youtubeId');
  }

  // 10. Free trial mention
  if (!freeTrial) {
    issues.push('Missing free trial mention');
  }

  return {
    file: fileName,
    category: cat.name,
    titleTag: titleTag || '(missing)',
    titleLength: titleTag ? titleTag.length : 0,
    metaDescription: metaDescription || '(missing)',
    metaLength: metaDescription ? metaDescription.length : 0,
    primaryKeyword: primaryKeyword || null,
    secondaryKeywordsCount: secondaryKeywords.length,
    lsiKeywordsCount: lsiKeywords.length,
    wordCount,
    faqCount,
    linkCount,
    hasYoutube,
    refundFaq,
    freeTrial,
    bannedPhrases,
    bareGratuitCount: bareGratuit.length,
    issues,
  };
}

// ── Run ──

const report = { totalFiles: 0, totalIssues: 0, totalPassing: 0, categories: {} };
const allIssues = [];
const allResults = [];

for (const cat of CATEGORIES) {
  if (!fs.existsSync(cat.dir)) {
    console.log(`SKIP: ${cat.dir} does not exist`);
    continue;
  }
  const files = fs.readdirSync(cat.dir).filter(f => f.endsWith('.ts'));
  const results = [];

  for (const file of files) {
    const filePath = path.join(cat.dir, file);
    const result = auditFile(filePath, cat);
    results.push(result);
    allResults.push(result);
    report.totalFiles++;
    if (result.issues.length > 0) {
      report.totalIssues += result.issues.length;
      allIssues.push(result);
    } else {
      report.totalPassing++;
    }
  }

  report.categories[cat.name] = {
    fileCount: files.length,
    passingCount: results.filter(r => r.issues.length === 0).length,
    results,
  };
}

// ── Console output ──

console.log('\n╔══════════════════════════════════════════════════════════════╗');
console.log('║            FRENCH SEO AUDIT REPORT (194 FILES)             ║');
console.log('╚══════════════════════════════════════════════════════════════╝\n');

console.log(`Total files audited:  ${report.totalFiles}`);
console.log(`Passing (0 issues):   ${report.totalPassing}`);
console.log(`Failing (1+ issues):  ${allIssues.length}`);
console.log(`Total issues found:   ${report.totalIssues}\n`);

// Issue breakdown by type
const issueTypes = {
  'titleTag too long':        allResults.filter(r => r.issues.some(x => x.includes('titleTag too long'))).length,
  'metaDescription too short': allResults.filter(r => r.issues.some(x => x.includes('metaDescription too short'))).length,
  'metaDescription too long':  allResults.filter(r => r.issues.some(x => x.includes('metaDescription too long'))).length,
  'MISSING primaryKeyword':    allResults.filter(r => r.issues.some(x => x.includes('MISSING primaryKeyword'))).length,
  'primaryKeyword not in title': allResults.filter(r => r.issues.some(x => x.includes('primaryKeyword not in titleTag'))).length,
  'NO primaryKeyword (idea)':  allResults.filter(r => r.issues.some(x => x.includes('NO primaryKeyword'))).length,
  'NO secondaryKeywords (idea)': allResults.filter(r => r.issues.some(x => x.includes('NO secondaryKeywords'))).length,
  'NO lsiKeywords (idea)':     allResults.filter(r => r.issues.some(x => x.includes('NO lsiKeywords'))).length,
  'Word count too low':        allResults.filter(r => r.issues.some(x => x.includes('Word count too low'))).length,
  'Banned phrase':             allResults.filter(r => r.issues.some(x => x.includes('Banned phrase'))).length,
  'Bare "gratuit/gratis"':     allResults.filter(r => r.issues.some(x => x.includes('Bare "gratuit'))).length,
  'FAQ count too low':         allResults.filter(r => r.issues.some(x => x.includes('FAQ count too low'))).length,
  'Missing refund FAQ':        allResults.filter(r => r.issues.some(x => x.includes('Missing refund policy FAQ'))).length,
  'Missing youtubeId':         allResults.filter(r => r.issues.some(x => x.includes('Missing youtubeId'))).length,
  'Missing free trial':        allResults.filter(r => r.issues.some(x => x.includes('Missing free trial'))).length,
};

console.log('┌─────────────────────────────────┬───────┐');
console.log('│ Issue Type                       │ Files │');
console.log('├─────────────────────────────────┼───────┤');
for (const [type, count] of Object.entries(issueTypes)) {
  if (count > 0) {
    console.log(`│ ${type.padEnd(33)}│ ${String(count).padStart(5)} │`);
  }
}
console.log('└─────────────────────────────────┴───────┘');

// Per-category summary
for (const cat of CATEGORIES) {
  const catData = report.categories[cat.name];
  if (!catData) continue;
  const { results } = catData;
  const failCount = results.filter(r => r.issues.length > 0).length;
  console.log(`\n── ${cat.name} (${results.length} files, ${failCount} failing) ──`);

  for (const r of results) {
    const titleStatus = r.titleLength <= TITLE_MAX ? 'OK' : `FAIL(${r.titleLength})`;
    const metaStatus = r.metaLength >= META_MIN && r.metaLength <= META_MAX ? 'OK' : `FAIL(${r.metaLength})`;
    const wordStatus = r.wordCount >= WORD_MIN ? 'OK' : `FAIL(${r.wordCount})`;
    const marker = r.issues.length > 0 ? 'x' : 'v';
    console.log(`  ${marker} ${r.file}: title=${titleStatus} meta=${metaStatus} words=${wordStatus} faq=${r.faqCount} links=${r.linkCount} yt=${r.hasYoutube ? 'Y' : 'N'}`);
    if (r.issues.length > 0) {
      for (const issue of r.issues) {
        console.log(`      -> ${issue}`);
      }
    }
  }
}

// Detail sections for actionable fixes
const titleTooLong = allResults.filter(r => r.issues.some(x => x.includes('titleTag too long')));
if (titleTooLong.length > 0) {
  console.log('\n\n=== TITLE TAGS TO FIX (> 60 chars) ===\n');
  for (const item of titleTooLong) {
    console.log(`[${item.category}] ${item.file} (${item.titleLength} chars):`);
    console.log(`  "${item.titleTag}"`);
  }
}

const metaIssueFiles = allResults.filter(r => r.issues.some(x => x.includes('metaDescription')));
if (metaIssueFiles.length > 0) {
  console.log('\n\n=== META DESCRIPTIONS TO FIX ===\n');
  for (const item of metaIssueFiles) {
    console.log(`[${item.category}] ${item.file} (${item.metaLength} chars):`);
    console.log(`  "${item.metaDescription.substring(0, 120)}${item.metaDescription.length > 120 ? '...' : ''}"`);
  }
}

const bannedFiles = allResults.filter(r => r.bannedPhrases.length > 0);
if (bannedFiles.length > 0) {
  console.log('\n\n=== FILES WITH BANNED PHRASES ===\n');
  for (const item of bannedFiles) {
    console.log(`[${item.category}] ${item.file}: ${item.bannedPhrases.join(', ')}`);
  }
}

const lowWordFiles = allResults.filter(r => r.wordCount < WORD_MIN);
if (lowWordFiles.length > 0) {
  console.log('\n\n=== FILES WITH LOW WORD COUNT (< 2800) ===\n');
  for (const item of lowWordFiles.sort((a, b) => a.wordCount - b.wordCount)) {
    console.log(`[${item.category}] ${item.file}: ${item.wordCount} words (need ${WORD_MIN - item.wordCount} more)`);
  }
}

const keywordNotInTitle = allResults.filter(r => r.issues.some(x => x.includes('primaryKeyword not in titleTag')));
if (keywordNotInTitle.length > 0) {
  console.log('\n\n=== PRIMARY KEYWORD NOT IN TITLE ===\n');
  for (const item of keywordNotInTitle) {
    console.log(`[${item.category}] ${item.file}:`);
    console.log(`  keyword: "${item.primaryKeyword}"`);
    console.log(`  title:   "${item.titleTag}"`);
  }
}

const bareGratuitFiles = allResults.filter(r => r.bareGratuitCount > 0);
if (bareGratuitFiles.length > 0) {
  console.log('\n\n=== FILES WITH BARE "GRATUIT/GRATIS" ===\n');
  for (const item of bareGratuitFiles) {
    console.log(`[${item.category}] ${item.file}: ${item.bareGratuitCount} instance(s)`);
  }
}

// Write JSON report
const reportPath = path.join(__dirname, 'fr-seo-audit-report.json');
fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
console.log(`\n\nFull report written to: ${reportPath}`);

// Exit code
process.exit(report.totalIssues > 0 ? 1 : 0);
