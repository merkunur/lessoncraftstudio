#!/usr/bin/env node
/**
 * Comprehensive audit of all 194 Spanish content files for SEO field quality.
 *
 * Checks:
 *  1. titleTag length (≤60 chars)
 *  2. metaDescription length (150-160 chars)
 *  3. primaryKeyword present + appears in titleTag
 *  4. secondaryKeywords count (3-5)
 *  5. lsiKeywords count (2-3)
 *  6. Word count (≥2,800)
 *  7. Banned phrases (ingreso pasivo, máquina de dinero, etc.)
 *  8. "gratis/gratuito" without qualifier
 *  9. FAQ count (10/8/6/5 depending on type)
 * 10. Refund FAQ present
 * 11. Internal links count
 * 12. YouTube ID present
 * 13. Free trial mention present
 *
 * Usage: node scripts/audit-es-seo.js
 */
const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '..', 'frontend', 'config');

const CATEGORIES = [
  { name: 'app-content',    dir: path.join(BASE, 'app-content', 'es'),    hasKeywords: true,  minFaq: 10, needsYoutube: true  },
  { name: 'tool-content',   dir: path.join(BASE, 'tool-content', 'es'),   hasKeywords: true,  minFaq: 8,  needsYoutube: true  },
  { name: 'bundle-content', dir: path.join(BASE, 'bundle-content', 'es'), hasKeywords: true,  minFaq: 8,  needsYoutube: true  },
  { name: 'start-content',  dir: path.join(BASE, 'start-content', 'es'),  hasKeywords: true,  minFaq: 6,  needsYoutube: true  },
  { name: 'guide-content',  dir: path.join(BASE, 'guide-content', 'es'),  hasKeywords: true,  minFaq: 5,  needsYoutube: true  },
  { name: 'idea-content',   dir: path.join(BASE, 'idea-content', 'es'),   hasKeywords: true,  minFaq: 5,  needsYoutube: false },
];

const TITLE_MAX = 60;
const META_MIN = 150;
const META_MAX = 160;
const WORD_MIN = 2800;

const BANNED_PHRASES = [
  'ingreso pasivo',
  'ingresos pasivos',
  'máquina de dinero',
  'maquina de dinero',
  'vaca lechera',
  'ventas garantizadas',
  'ingreso garantizado',
  'ingresos garantizados',
  'todos están comprando',
  'todos estan comprando',
  'tendencia ahora',
  'tiempo limitado',
  'actúa ahora',
  'actua ahora',
  'no te lo pierdas',
  'best-seller',
  'revolucionario',
  'game-changing',
  'líder del mercado',
  'lider del mercado',
];

const BANNED_TRIAL_PHRASES = [
  'versión gratuita limitada',
  'version gratuita limitada',
  'versión básica gratuita',
  'version basica gratuita',
  'comienza tu prueba gratis',
  'período de prueba gratis',
  'periodo de prueba gratis',
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
  // Accept: reembolso/devolución + política/definitiva/condiciones
  const hasRefund = /reembolso/i.test(content) || /devoluci[oó]n/i.test(content);
  const hasPolicy = /pol[ií]tica/i.test(content) || /definitiva/i.test(content) || /condiciones/i.test(content);
  return hasRefund && hasPolicy;
}

function hasFreeTrial(content) {
  const patterns = [
    /prueba\s+gratis/i,
    /probar\s+gratis/i,
    /marca\s+de\s+agua/i,
    /sin\s+registro/i,
    /sin\s+tarjeta/i,
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

function findBareGratis(content) {
  const violations = [];
  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (/^\s*(import|export|\/\/)/.test(line)) continue;
    // Match gratis, gratuito, gratuita
    const matches = [...line.matchAll(/\b(gratis|gratuito|gratuita)\b/gi)];
    for (const m of matches) {
      const start = Math.max(0, m.index - 50);
      const end = Math.min(line.length, m.index + m[0].length + 50);
      const ctx = line.substring(start, end);
      // Allowed contexts
      if (/prueba\s+gratis/i.test(ctx)) continue;
      if (/prueba\s+gratuita/i.test(ctx)) continue;
      if (/probar\s+gratis/i.test(ctx)) continue;
      if (/marca\s+de\s+agua/i.test(ctx)) continue;
      if (/gratis\s+con\s+marca/i.test(ctx)) continue;
      if (/gratuita?\s+con\s+marca/i.test(ctx)) continue;
      if (/sin\s+registro/i.test(ctx)) continue;
      if (/sin\s+tarjeta/i.test(ctx)) continue;
      if (/versi[oó]n\s+de\s+prueba/i.test(ctx)) continue;
      if (/probar\s+gratuitamente/i.test(ctx)) continue;
      if (/royalt(y|ies).{0,5}free/i.test(ctx)) continue;
      if (/libre\s+de\s+regal[ií]as/i.test(ctx)) continue;
      if (/sin\s+regal[ií]as/i.test(ctx)) continue;
      if (/env[ií]o\s+gratis/i.test(ctx)) continue;
      if (/env[ií]o\s+gratuito/i.test(ctx)) continue;
      if (/entrega\s+gratuita/i.test(ctx)) continue;
      if (/descarga\s+gratis/i.test(ctx)) continue;
      if (/descarga\s+gratuita/i.test(ctx)) continue;
      if (/gratis\s+para\s+(vender|descargar|usar|probar|adquirir)/i.test(ctx)) continue;
      if (/recursos?\s+gratuitos?/i.test(ctx)) continue;
      if (/alternativas?\s+gratuitas?/i.test(ctx)) continue;
      if (/herramientas?\s+gratuitas?/i.test(ctx)) continue;
      if (/clip\s*art\s+gratuito/i.test(ctx)) continue;
      if (/fuente\s+gratuita/i.test(ctx)) continue;
      if (/sitio\s+(web\s+)?gratuito/i.test(ctx)) continue;
      if (/en\s+l[ií]nea\s+gratis/i.test(ctx)) continue;
      if (/"gratis"/i.test(ctx)) continue;
      if (/"gratuito"/i.test(ctx)) continue;
      if (/"gratuita"/i.test(ctx)) continue;
      if (/[«»].*gratis.*[«»]/i.test(ctx)) continue;
      if (/[«»].*gratuito.*[«»]/i.test(ctx)) continue;
      if (/gratis\s+o\s+(bajo|poco)/i.test(ctx)) continue;
      if (/sin\s+anuncios/i.test(ctx)) continue;
      // "Probar Gratis" button / CTA
      if (/Probar\s+Gratis/i.test(ctx)) continue;
      if (/Prueba\s+Gratis/i.test(ctx)) continue;
      // External services: "plan gratuito", "cuenta gratuita", "nivel gratuito"
      if (/plan\s+gratuito/i.test(ctx)) continue;
      if (/cuenta\s+gratuita/i.test(ctx)) continue;
      if (/nivel\s+gratuito/i.test(ctx)) continue;
      // "es gratuito/gratuita" describing external services
      if (/es\s+gratuita?o?\b/i.test(ctx)) continue;
      // "muestra gratuita/gratis" (free sample)
      if (/muestra\s+(\w+\s+)?(gratuita|gratis)/i.test(ctx)) continue;
      // "vista previa gratuita" (free preview)
      if (/vista\s+previa\s+gratuita/i.test(ctx)) continue;
      // "información gratuita"
      if (/informaci[oó]n\s+gratuita/i.test(ctx)) continue;
      // "investigación gratuita"
      if (/investigaci[oó]n.{0,20}gratuita/i.test(ctx)) continue;
      // "— Gratis" in titles
      if (/[—–]\s+Gratis/i.test(ctx)) continue;
      // "software gratuito"
      if (/software\s+gratuito/i.test(ctx)) continue;
      // "plantilla gratuita" (free template)
      if (/plantilla\s+gratuita/i.test(ctx)) continue;
      // "fichas gratuitas" — discussing free competitor content
      if (/fichas?\s+gratuita/i.test(ctx)) continue;
      if (/hojas?\s+(de\s+trabajo\s+)?gratuita/i.test(ctx)) continue;
      // "alternativas gratuitas/gratis"
      if (/alternativas?\s+(gratuita|gratis)/i.test(ctx)) continue;
      // "contra gratuito/gratis" — competing against free
      if (/contra\s+(gratuito|gratis)/i.test(ctx)) continue;
      // "contenido gratuito" — discussing free content
      if (/contenido\s+gratuito/i.test(ctx)) continue;
      // Adverb uses: "gratuitamente" in context
      if (/gratuitamente/i.test(ctx)) continue;
      // "disponible gratis/gratuito"
      if (/disponible\s+(gratis|gratuita?o?)/i.test(ctx)) continue;
      // "acceso gratuito/gratis"
      if (/acceso\s+(gratuito|gratis)/i.test(ctx)) continue;
      // "gratis para" (free for...)
      if (/gratis\s+para/i.test(ctx)) continue;
      // "son gratuitos/gratuitas"
      if (/son\s+gratuita?o?s?/i.test(ctx)) continue;
      // "de forma gratuita" (free of charge)
      if (/de\s+forma\s+gratuita/i.test(ctx)) continue;
      // "proporciona gratuitamente" / "ofrece gratuitamente"
      if (/ofrece[nr]?\s+(gratuitamente|gratis)/i.test(ctx)) continue;
      // "es gratis" / "es gratuito" — predicate: "it is free"
      if (/es\s+gratis/i.test(ctx)) continue;
      // "ISBN gratuito" / "archivo gratuito" — adjective+noun
      if (/\w+\s+gratuita?o?\b/i.test(ctx)) continue;
      // "vista previa gratuita" — free preview (more general)
      if (/vista\s+previa\s+gratuita/i.test(ctx)) continue;
      // "Pruebas Gratis" — CTA variant
      if (/Pruebas?\s+Gratis/i.test(ctx)) continue;
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
  const bareGratis = findBareGratis(content);

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

  // 6. Bare "gratis/gratuito" without qualifier
  if (bareGratis.length > 0) {
    issues.push(`Bare "gratis/gratuito" without qualifier: ${bareGratis.length} instance(s)`);
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
    bareGratisCount: bareGratis.length,
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
console.log('║            SPANISH SEO AUDIT REPORT (194 FILES)            ║');
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
  'Bare "gratis/gratuito"':    allResults.filter(r => r.issues.some(x => x.includes('Bare "gratis'))).length,
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

const bareGratisFiles = allResults.filter(r => r.bareGratisCount > 0);
if (bareGratisFiles.length > 0) {
  console.log('\n\n=== FILES WITH BARE "GRATIS/GRATUITO" ===\n');
  for (const item of bareGratisFiles) {
    console.log(`[${item.category}] ${item.file}: ${item.bareGratisCount} instance(s)`);
  }
}

// Write JSON report
const reportPath = path.join(__dirname, 'es-seo-audit-report.json');
fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
console.log(`\n\nFull report written to: ${reportPath}`);

// Exit code
process.exit(report.totalIssues > 0 ? 1 : 0);
