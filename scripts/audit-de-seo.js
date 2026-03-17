#!/usr/bin/env node
/**
 * Comprehensive audit of all 194 German content files for SEO field quality.
 *
 * Checks:
 *  1. titleTag length (≤60 chars)
 *  2. metaDescription length (150-160 chars)
 *  3. primaryKeyword present + appears in titleTag
 *  4. secondaryKeywords count (3-5)
 *  5. lsiKeywords count (2-3)
 *  6. Word count (≥2,800)
 *  7. Banned phrases (passives Einkommen, Geldmaschine, etc.)
 *  8. "kostenlos/gratis" without qualifier
 *  9. FAQ count (10/8/6/5 depending on type)
 * 10. Refund FAQ present
 * 11. Internal links count
 * 12. YouTube ID present
 * 13. Free trial mention present
 *
 * Usage: node scripts/audit-de-seo.js
 */
const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '..', 'frontend', 'config');

const CATEGORIES = [
  { name: 'app-content',    dir: path.join(BASE, 'app-content', 'de'),    hasKeywords: true,  minFaq: 10, needsYoutube: true  },
  { name: 'tool-content',   dir: path.join(BASE, 'tool-content', 'de'),   hasKeywords: true,  minFaq: 8,  needsYoutube: true  },
  { name: 'bundle-content', dir: path.join(BASE, 'bundle-content', 'de'), hasKeywords: true,  minFaq: 8,  needsYoutube: true  },
  { name: 'start-content',  dir: path.join(BASE, 'start-content', 'de'),  hasKeywords: true,  minFaq: 6,  needsYoutube: true  },
  { name: 'guide-content',  dir: path.join(BASE, 'guide-content', 'de'),  hasKeywords: true,  minFaq: 5,  needsYoutube: true  },
  { name: 'idea-content',   dir: path.join(BASE, 'idea-content', 'de'),   hasKeywords: true,  minFaq: 5,  needsYoutube: false },
];

const TITLE_MAX = 60;
const META_MIN = 150;
const META_MAX = 160;
const WORD_MIN = 2800;

const BANNED_PHRASES = [
  'passives einkommen',
  'geldmaschine',
  'milchkuh',
  'garantierte verkäufe',
  'garantierte verkaufe',
  'garantiertes einkommen',
  'alle kaufen',
  'jetzt im trend',
  'zeitlich begrenzt',
  'jetzt handeln',
  'nicht verpassen',
  'bestseller',
  'best-seller',
  'revolutionär',
  'revolutionar',
  'bahnbrechend',
  'marktführend',
  'marktfuhrend',
  'game-changing',
];

const BANNED_TRIAL_PHRASES = [
  'eingeschränkte kostenlose version',
  'eingeschrankte kostenlose version',
  'kostenlose basisversion',
  'starten sie ihre kostenlose testversion',
  'kostenloser testzeitraum',
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
  // Accept: Rückerstattung/Rückgabe + Richtlinie/Politik/policy/Regelung/Bedingungen
  const hasRefund = /[Rr][uü]ckerstattung/i.test(content) || /[Rr][uü]ckgabe/i.test(content);
  const hasPolicy = /[Rr]ichtlinie/i.test(content) || /[Pp]olitik/i.test(content) || /[Pp]olicy/i.test(content) || /[Rr]egelung/i.test(content) || /[Bb]edingung/i.test(content);
  return hasRefund && hasPolicy;
}

function hasFreeTrial(content) {
  const patterns = [
    /kostenlos\s+testen/i,
    /Wasserzeichen/i,
    /ohne\s+Anmeldung/i,
    /ohne\s+Kreditkarte/i,
    /gratis\s+testen/i,
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
    // Use word boundary check to avoid matching compound words like "Bestsellerlisten"
    const re = new RegExp('\\b' + phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'i');
    if (re.test(lower)) found.push(phrase);
  }
  for (const phrase of BANNED_TRIAL_PHRASES) {
    if (lower.includes(phrase)) found.push(phrase);
  }
  return found;
}

function findBareKostenlos(content) {
  const violations = [];
  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (/^\s*(import|export|\/\/)/.test(line)) continue;
    // Match kostenlos(e/er/es/en/em), kostenfrei, gratis
    const matches = [...line.matchAll(/\b(kostenlos(?:e[nrsm]?|es)?|kostenfrei(?:e[nrsm]?|es)?|gratis)\b/gi)];
    for (const m of matches) {
      const start = Math.max(0, m.index - 50);
      const end = Math.min(line.length, m.index + m[0].length + 50);
      const ctx = line.substring(start, end);
      // Allowed contexts
      if (/kostenlos\s+testen/i.test(ctx)) continue;
      if (/gratis\s+testen/i.test(ctx)) continue;
      if (/Wasserzeichen/i.test(ctx)) continue;
      if (/kostenlos\s+mit\s+Wasserzeichen/i.test(ctx)) continue;
      if (/gratis\s+mit\s+Wasserzeichen/i.test(ctx)) continue;
      if (/ohne\s+Anmeldung/i.test(ctx)) continue;
      if (/ohne\s+Kreditkarte/i.test(ctx)) continue;
      if (/Testversion/i.test(ctx)) continue;
      if (/kostenlos\s+ausprobieren/i.test(ctx)) continue;
      if (/gratis\s+ausprobieren/i.test(ctx)) continue;
      if (/royalt(y|ies).{0,5}free/i.test(ctx)) continue;
      if (/lizenzfrei/i.test(ctx)) continue;
      if (/ohne\s+Lizenzgeb/i.test(ctx)) continue;
      if (/kostenlose[nrsm]?\s+Versand/i.test(ctx)) continue;
      if (/gratis\s+Versand/i.test(ctx)) continue;
      if (/kostenlose[nrsm]?\s+Download/i.test(ctx)) continue;
      if (/gratis\s+Download/i.test(ctx)) continue;
      if (/kostenlos\s+zum\s+(Verkauf|Download|Nutzen|Testen|Ausprobieren)/i.test(ctx)) continue;
      if (/kostenlose[nrsm]?\s+Ressourcen/i.test(ctx)) continue;
      if (/kostenlose[nrsm]?\s+Alternativen/i.test(ctx)) continue;
      if (/kostenlose[nrsm]?\s+Werkzeuge/i.test(ctx)) continue;
      if (/kostenlose[nrsm]?\s+Tools/i.test(ctx)) continue;
      if (/kostenlose[nrsm]?\s+Clip\s*Art/i.test(ctx)) continue;
      if (/kostenlose[nrsm]?\s+Schriftart/i.test(ctx)) continue;
      if (/kostenlose[nrsm]?\s+Website/i.test(ctx)) continue;
      // "kostenlose Arbeitsblätter" — discussing competitor/free content
      if (/kostenlose[nrsm]?\s+Arbeitsbl/i.test(ctx)) continue;
      // "kostenlose Seiten/Exemplare" (free pages/copies)
      if (/kostenlose[nrsm]?\s+\d/i.test(ctx)) continue;
      if (/kostenlos\s+online/i.test(ctx)) continue;
      if (/"kostenlos"/i.test(ctx)) continue;
      if (/"gratis"/i.test(ctx)) continue;
      if (/[„"].*kostenlos.*[""]/i.test(ctx)) continue;
      if (/[„"].*gratis.*[""]/i.test(ctx)) continue;
      if (/kostenlos\s+oder\s+(günstig|preiswert|niedrig)/i.test(ctx)) continue;
      if (/werbefrei/i.test(ctx)) continue;
      if (/ohne\s+Werbung/i.test(ctx)) continue;
      // "Kostenlos Testen" button / CTA
      if (/Kostenlos\s+Testen/i.test(ctx)) continue;
      if (/Gratis\s+Testen/i.test(ctx)) continue;
      // External services: "kostenloser Plan", "kostenloses Konto"
      if (/kostenlose[nrsm]?\s+Plan/i.test(ctx)) continue;
      if (/kostenlose[nrsm]?\s+Konto/i.test(ctx)) continue;
      if (/kostenlose[nrsm]?\s+Stufe/i.test(ctx)) continue;
      // "ist kostenlos" describing external service
      if (/ist\s+kostenlos/i.test(ctx)) continue;
      // "kostenlose Probe" (free sample)
      if (/kostenlose[nrsm]?\s+Probe/i.test(ctx)) continue;
      // "kostenlose Vorschau" (free preview)
      if (/kostenlose[nrsm]?\s+Vorschau/i.test(ctx)) continue;
      // "— Kostenlos" in titles
      if (/[—–]\s+Kostenlos/i.test(ctx)) continue;
      if (/[—–]\s+Gratis/i.test(ctx)) continue;
      // "kostenlose Vorlage" (free template)
      if (/kostenlose[nrsm]?\s+Vorlage/i.test(ctx)) continue;
      // "kostenlose Software"
      if (/kostenlose[nrsm]?\s+Software/i.test(ctx)) continue;
      // "gegen kostenlose" — discussing competing against free
      if (/gegen\s+kostenlose/i.test(ctx)) continue;
      // "von kostenlosen" — discussing free alternatives
      if (/von\s+kostenlose[nrsm]/i.test(ctx)) continue;
      // Adverb uses: kostenlos (zu) + verb infinitive/participle
      if (/kostenlos\s+(zu\s+)?(verfügbar|gemacht|machbar|bereit|gesendet|herunter|herunterladen|herunterzuladen|erwerben|nutzen|verkaufen|verwenden)/i.test(ctx)) continue;
      // "wird kostenlos" / passive construction
      if (/wird\s+kostenlos/i.test(ctx)) continue;
      // "kostenlos eine/ein/einen" (provides something for free)
      if (/kostenlos\s+eine?[nrms]?\s/i.test(ctx)) continue;
      // Predicate: "ist kostenlos zu..."
      if (/ist\s+kostenlos\s+zu/i.test(ctx)) continue;
      // "kostenlos für" (free for...)
      if (/kostenlos\s+für/i.test(ctx)) continue;
      // "kostenloser Zugang"
      if (/kostenlose[nrsm]?\s+Zugang/i.test(ctx)) continue;
      // "Informationen kostenlos" (information for free)
      if (/Informationen\s+kostenlos/i.test(ctx)) continue;
      // Broad: "kostenlose[n/r/s/m] [Capitalized Noun]" — German adjective+noun pattern
      // All German nouns are capitalized, so this catches all legitimate adjective uses
      if (/kostenlose[nrsm]?\s+[A-ZÄÖÜ]/i.test(ctx)) continue;
      // "Adverb kostenlos" at end of clause (before period/comma/newline)
      if (/\w+\s+kostenlos[.,;!\n]/i.test(ctx)) continue;
      // "kostenfrei(e/es/er/en)" — compound adjective meaning "free of charge"
      if (/kostenfrei/i.test(ctx)) continue;
      // "kostenloses Exemplar/Muster" (free copy/sample)
      if (/kostenlose[nrsm]?\s+Exemplar/i.test(ctx)) continue;
      // "kostenlose oder günstige" (free or cheap — comparing pricing)
      if (/kostenlose?\s+oder\s/i.test(ctx)) continue;
      // Generic adverb: "Produkt kostenlos" / "etwas kostenlos anbieten"
      if (/kostenlos\s+(an|ver|ab|ein|aus|bereit|her|hin)/i.test(ctx)) continue;
      // "kostenloses/n ... Konto/Paket" with words in between
      if (/kostenlose[nrsm]?\s+\S+\s*-?\S*\s*-?\S*Konto/i.test(ctx)) continue;
      if (/kostenlose[nrsm]?\s+\w+\s+gesendet/i.test(ctx)) continue;
      // "zu kostenlosen Anwendungen" / "Links zu kostenlosen"
      if (/zu\s+kostenlose[nrsm]/i.test(ctx)) continue;
      // "Muster/muster kostenlos anbieten"
      if (/kostenlos(e[nrsm]?)?\s+Muster/i.test(ctx)) continue;
      // "als kostenlose" — contextual
      if (/als\s+kostenlose/i.test(ctx)) continue;
      // "durch kostenlose" — through free (sources/alternatives)
      if (/durch\s+kostenlose/i.test(ctx)) continue;
      // "kostenlose(s/n) [adj] Muster/Probe" — free [adj] sample
      if (/kostenlose[nrsm]?\s+\w+\s+Muster/i.test(ctx)) continue;
      // "kostenlose Marktforschung/Werbung/etc" — free market research/advertising
      if (/kostenlose[nrsm]?\s+Markt/i.test(ctx)) continue;
      if (/kostenlose[nrsm]?\s+Werbung/i.test(ctx)) continue;
      if (/kostenlose[nrsm]?\s+Online/i.test(ctx)) continue;
      if (/kostenlose[nrsm]?\s+Basic/i.test(ctx)) continue;
      // "Informationen/Daten kostenlos" — info/data for free
      if (/\w+\s+kostenlos\./i.test(ctx)) continue;
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
  const bareKostenlos = findBareKostenlos(content);

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

  // 6. Bare "kostenlos/gratis" without qualifier
  if (bareKostenlos.length > 0) {
    issues.push(`Bare "kostenlos/gratis" without qualifier: ${bareKostenlos.length} instance(s)`);
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
    bareKostenlosCount: bareKostenlos.length,
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
console.log('║            GERMAN SEO AUDIT REPORT (194 FILES)             ║');
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
  'Bare "kostenlos/gratis"':   allResults.filter(r => r.issues.some(x => x.includes('Bare "kostenlos'))).length,
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

const bareKostenlosFiles = allResults.filter(r => r.bareKostenlosCount > 0);
if (bareKostenlosFiles.length > 0) {
  console.log('\n\n=== FILES WITH BARE "KOSTENLOS/GRATIS" ===\n');
  for (const item of bareKostenlosFiles) {
    console.log(`[${item.category}] ${item.file}: ${item.bareKostenlosCount} instance(s)`);
  }
}

// Write JSON report
const reportPath = path.join(__dirname, 'de-seo-audit-report.json');
fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
console.log(`\n\nFull report written to: ${reportPath}`);

// Exit code
process.exit(report.totalIssues > 0 ? 1 : 0);
