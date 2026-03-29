#!/usr/bin/env node
/**
 * validate-spanish-seo.js — Spanish SEO Compliance Validator
 *
 * Validates all 194 Spanish content files against the SEO strategy from
 * docs/seo-keywords/spanish-complete-seo-prompt.md
 *
 * Usage:
 *   node scripts/validate-spanish-seo.js                    # All files
 *   node scripts/validate-spanish-seo.js --type app         # One content type
 *   node scripts/validate-spanish-seo.js --file addition    # Single file
 *   node scripts/validate-spanish-seo.js --summary          # Summary only
 */

const fs = require('fs');
const path = require('path');

const CONFIG_DIR = path.join(__dirname, '..', 'frontend', 'config');

const CONTENT_TYPES = {
  app:    { dir: 'app-content',    minFaq: 10, minLinks: 5 },
  tool:   { dir: 'tool-content',   minFaq: 8,  minLinks: 5 },
  bundle: { dir: 'bundle-content', minFaq: 8,  minLinks: 5 },
  guide:  { dir: 'guide-content',  minFaq: 5,  minLinks: 6 },
  idea:   { dir: 'idea-content',   minFaq: 5,  minLinks: 6 },
  start:  { dir: 'start-content',  minFaq: 6,  minLinks: 8 },
};

// ── Accent Mark Checker ──────────────────────────────────────────────
// Words that MUST have accents in Spanish. Only flag if the unaccented
// form appears as a standalone word (not part of a longer word).
const ACCENT_PAIRS = [
  ['linea', 'linea'],        // linea -> linea (checking raw presence)
  ['credito', 'credito'],
  ['calculo', 'calculo'],
  ['imagenes', 'imagenes'],
  ['matematicas', 'matematicas'],
  ['matematicos', 'matematicos'],
  ['numeros', 'numeros'],
  ['pagina', 'pagina'],
  ['vehiculos', 'vehiculos'],
  ['codigo', 'codigo'],
  ['espanol', 'espanol'],
  ['logica', 'logica'],
  ['patron', 'patron'],
  ['educacion', 'educacion'],
  ['leccion', 'leccion'],
  ['adicion', 'adicion'],
  ['sustraccion', 'sustraccion'],
  ['multiplicacion', 'multiplicacion'],
  ['division', 'division'],
  ['operacion', 'operacion'],
  ['informacion', 'informacion'],
  ['evaluacion', 'evaluacion'],
  ['creacion', 'creacion'],
  ['clasificacion', 'clasificacion'],
  ['comparacion', 'comparacion'],
  ['asociacion', 'asociacion'],
  ['resolucion', 'resolucion'],
  ['navegacion', 'navegacion'],
  ['descripcion', 'descripcion'],
  ['configuracion', 'configuracion'],
  ['automatizacion', 'automatizacion'],
  ['optimizacion', 'optimizacion'],
];

// Words that MUST have accents — detect unaccented versions via regex
const UNACCENTED_WORDS = [
  // a -> a (missing tilde)
  { wrong: /\bmatematicas\b/gi, right: 'matematicas (should be matematicas with accent on a)' },
  { wrong: /\bgrafico(?:s)?\b/gi, right: 'grafico(s) needs accent' },
  { wrong: /\bbasic(?:a|o)s?\b/gi, right: 'check if basica/basico needs accent' },
];

// More reliable: check for specific unaccented Spanish words
function findMissingAccents(content) {
  const issues = [];
  const lines = content.split('\n');

  // Comprehensive list of words that MUST have accents
  const mustHaveAccent = [
    // Words with a
    { unaccented: /(?<![a-zA-Z\u00C0-\u024F])linea(?:s)?(?![a-zA-Z\u00C0-\u024F])/g, correct: 'linea -> debe tener tilde' },
    { unaccented: /(?<![a-zA-Z\u00C0-\u024F])matematica(?:s|o|os)?(?![a-zA-Z\u00C0-\u024F])/g, correct: 'matematica(s) -> debe tener tilde' },
    { unaccented: /(?<![a-zA-Z\u00C0-\u024F])grafico(?:s|a|as)?(?![a-zA-Z\u00C0-\u024F])/g, correct: 'grafico -> debe tener tilde' },
    { unaccented: /(?<![a-zA-Z\u00C0-\u024F])pagina(?:s)?(?![a-zA-Z\u00C0-\u024F])/g, correct: 'pagina -> debe tener tilde' },
    { unaccented: /(?<![a-zA-Z\u00C0-\u024F])basica(?:s|o|os)?(?![a-zA-Z\u00C0-\u024F])/g, correct: 'basica -> debe tener tilde' },
    { unaccented: /(?<![a-zA-Z\u00C0-\u024F])calculo(?:s)?(?![a-zA-Z\u00C0-\u024F])/g, correct: 'calculo -> debe tener tilde' },
    { unaccented: /(?<![a-zA-Z\u00C0-\u024F])catalogo(?:s)?(?![a-zA-Z\u00C0-\u024F])/g, correct: 'catalogo -> debe tener tilde' },
    // Words with e
    { unaccented: /(?<![a-zA-Z\u00C0-\u024F])credito(?:s)?(?![a-zA-Z\u00C0-\u024F])/g, correct: 'credito -> debe tener tilde' },
    // Words with i
    { unaccented: /(?<![a-zA-Z\u00C0-\u024F])codigo(?:s)?(?![a-zA-Z\u00C0-\u024F])/g, correct: 'codigo -> debe tener tilde' },
    { unaccented: /(?<![a-zA-Z\u00C0-\u024F])logica(?:s)?(?![a-zA-Z\u00C0-\u024F])/g, correct: 'logica -> debe tener tilde' },
    { unaccented: /(?<![a-zA-Z\u00C0-\u024F])vehiculo(?:s)?(?![a-zA-Z\u00C0-\u024F])/g, correct: 'vehiculo -> debe tener tilde' },
    { unaccented: /(?<![a-zA-Z\u00C0-\u024F])numero(?:s)?(?![a-zA-Z\u00C0-\u024F])/g, correct: 'numero -> debe tener tilde' },
    { unaccented: /(?<![a-zA-Z\u00C0-\u024F])unico(?:a|s|as)?(?![a-zA-Z\u00C0-\u024F])/g, correct: 'unico -> debe tener tilde' },
    // Words with o
    // Words with u
    { unaccented: /(?<![a-zA-Z\u00C0-\u024F])busqueda(?:s)?(?![a-zA-Z\u00C0-\u024F])/g, correct: 'busqueda -> debe tener tilde' },
    // Words with n
    { unaccented: /(?<![a-zA-Z\u00C0-\u024F])nino(?:s)?(?![a-zA-Z\u00C0-\u024F])/g, correct: 'nino -> debe ser nino con tilde' },
    { unaccented: /(?<![a-zA-Z\u00C0-\u024F])espanol(?:a|es)?(?![a-zA-Z\u00C0-\u024F])/g, correct: 'espanol -> debe tener tilde' },
    { unaccented: /(?<![a-zA-Z\u00C0-\u024F])diseno(?:s)?(?![a-zA-Z\u00C0-\u024F])/g, correct: 'diseno -> debe tener tilde' },
    // -cion words (VERY common in Spanish) — only flag SINGULAR forms
    // Plural -ciones correctly has NO accent in Spanish (e.g., funciones, ecuaciones)
    { unaccented: /(?<![a-zA-Z\u00C0-\u024F])\w+cion(?![e\u00C0-\u024F])\b/g, correct: '-cion word must have accent (cion -> cion)', checkFn: (match) => {
      // Only flag if the word does NOT already have an accent
      return !/\u00f3/.test(match) && !/ción/.test(match);
    }},
  ];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    // Skip import/export/comment lines and TS type annotations
    if (/^\s*(import|export\s+(?:const|default|interface|type)|\/\/)/.test(line)) continue;
    // Skip slug fields (URLs don't use accents)
    if (/^\s*slug:\s*['"`]/.test(line)) continue;
    // Skip pageType fields
    if (/^\s*pageType:\s*['"`]/.test(line)) continue;
    // Skip src/href/url fields (image paths, links)
    if (/^\s*(src|href|url|primary|primaryAlt|videoTitle):\s*['"`]/.test(line)) continue;
    // Skip appId fields
    if (/^\s*appId:\s*['"`]/.test(line)) continue;

    // For accent checking, strip out inline code/filenames (backtick content, .pdf/.png paths)
    const lineForAccentCheck = line
      .replace(/`[^`]+`/g, '')           // Remove backtick-quoted code/filenames
      .replace(/\/[^\s'",]+\//g, '')     // Remove /path/like/this/
      .replace(/[\w-]+\.(?:pdf|png|jpg|jpeg|webp|html|js|csv)\b/g, '');  // Remove file.ext

    // Use cleaned line for accent checking
    const accentLine = lineForAccentCheck;

    for (const rule of mustHaveAccent) {
      // Special handling for -cion words
      if (rule.checkFn) {
        const matches = [...accentLine.matchAll(rule.unaccented)];
        for (const m of matches) {
          if (rule.checkFn(m[0])) {
            if (!/ción/.test(m[0])) {
              issues.push(`Line ${i + 1}: ${rule.correct} -> "${m[0]}"`);
            }
          }
        }
      } else {
        const matches = [...accentLine.matchAll(rule.unaccented)];
        for (const m of matches) {
          issues.push(`Line ${i + 1}: ${rule.correct} -> "${m[0]}"`);
        }
      }
    }
  }

  return issues;
}

// ── Informal "tu" Form Checker ───────────────────────────────────────
function findInformalForm(content) {
  const issues = [];
  const lines = content.split('\n');
  const informalPatterns = [
    /(?<![a-zA-Z])tu(?:s)?\s+/gi,      // "tu " or "tus "
    /(?<![a-zA-Z])tienes\b/gi,
    /(?<![a-zA-Z])puedes\b/gi,
    /(?<![a-zA-Z])haces\b/gi,
    /(?<![a-zA-Z])necesitas\b/gi,
    /(?<![a-zA-Z])quieres\b/gi,
    /(?<![a-zA-Z])creas\b/gi,
    /(?<![a-zA-Z])vendes\b/gi,
    /(?<![a-zA-Z])usas\b/gi,
    /(?<![a-zA-Z])eres\b/gi,
    /(?<![a-zA-Z])sabes\b/gi,
  ];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (/^\s*(import|export\s+const|\/\/)/.test(line)) continue;
    // Skip slug definitions and key names
    if (/^\s*\w+:\s*['"`]/.test(line) && line.indexOf(':') < 20) continue;

    for (const pattern of informalPatterns) {
      pattern.lastIndex = 0;
      const matches = [...line.matchAll(pattern)];
      for (const m of matches) {
        // Skip if inside a platform name or compound word
        const ctx = line.substring(Math.max(0, m.index - 15), Math.min(line.length, m.index + m[0].length + 15));
        // "tu" inside "tutorial", "youtube", "Saturn", etc. is fine
        if (/tutorial|youtube|saturn|structure|stub|return|attribute/i.test(ctx)) continue;
        issues.push(`Line ${i + 1}: informal form "${m[0].trim()}" (should use "usted" form) -> "${ctx.trim()}"`);
      }
    }
  }
  return issues;
}

// ── Unicode Escape Checker ───────────────────────────────────────────
function findUnicodeEscapes(content) {
  const issues = [];
  const matches = [...content.matchAll(/\\u[0-9a-fA-F]{4}/g)];
  for (const m of matches) {
    issues.push(`Unicode escape found: ${m[0]} at position ${m.index}`);
  }
  return issues;
}

// ── Smart Quote Checker ──────────────────────────────────────────────
function findSmartQuotes(content) {
  const issues = [];
  const smartChars = ['\u201c', '\u201d', '\u2018', '\u2019'];
  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    for (const ch of smartChars) {
      if (lines[i].includes(ch)) {
        issues.push(`Line ${i + 1}: smart/curly quote found: ${ch} (code ${ch.charCodeAt(0).toString(16)})`);
      }
    }
  }
  return issues;
}

// ── English Leakage Checker ──────────────────────────────────────────
function findEnglishLeakage(content) {
  const issues = [];
  const lines = content.split('\n');
  // Common English phrases that should NOT appear in Spanish content
  const englishPhrases = [
    /\bcommercial license\b/gi,
    /\bno signup required\b/gi,
    /\bwatermark free\b/gi,
    /\btry free\b/gi,
    /\byour business\b/gi,
    /\byour store\b/gi,
    /\byour shop\b/gi,
    /\bready to print\b/gi,
    /\bprint ready\b/gi,
    /\banswer key\b/gi,
    /\bworksheet generator\b/gi,
    /\bprintable business\b/gi,
    /\bhow to create\b/gi,
    /\bhow to sell\b/gi,
    /\bhow to start\b/gi,
    /\bstep by step\b/gi,
  ];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (/^\s*(import|export\s+const|\/\/)/.test(line)) continue;
    // Skip TypeScript field names and keys
    if (/^\s*\w+:\s*/.test(line) && !/'/.test(line.substring(line.indexOf(':')))) continue;

    for (const pattern of englishPhrases) {
      pattern.lastIndex = 0;
      const matches = [...line.matchAll(pattern)];
      for (const m of matches) {
        issues.push(`Line ${i + 1}: English phrase "${m[0]}" found in Spanish content`);
      }
    }
  }
  return issues;
}

// ── Field Extraction Helpers ─────────────────────────────────────────
function extractStringValue(content, key) {
  const patterns = [
    new RegExp(`${key}:\\s*'((?:[^'\\\\]|\\\\.)*)'`, 's'),
    new RegExp(`${key}:\\s*\`((?:[^\`\\\\]|\\\\.)*)\``, 's'),
    new RegExp(`${key}:\\s*"((?:[^"\\\\]|\\\\.)*)"`, 's'),
  ];
  for (const p of patterns) {
    const m = content.match(p);
    if (m) return m[1];
  }
  return null;
}

function extractArrayItems(content, key) {
  const regex = new RegExp(`${key}:\\s*\\[([^\\]]{0,15000})\\]`, 's');
  const match = content.match(regex);
  if (!match) return [];
  const items = match[1].match(/['"`][^'"`]+['"`]/g);
  return items ? items.map(s => s.replace(/['"`]/g, '')) : [];
}

function countFaqItems(content) {
  const matches = content.match(/question:\s*['"`]/g);
  return matches ? matches.length : 0;
}

function countInternalLinks(content) {
  const matches = content.match(/pageType:\s*['"`]/g);
  return matches ? matches.length : 0;
}

function countWords(text) {
  if (!text) return 0;
  return text.trim().split(/\s+/).filter(w => w.length > 0).length;
}

// ── Main Validation ──────────────────────────────────────────────────
function validateFile(filePath, contentType) {
  const content = fs.readFileSync(filePath, 'utf8');
  const config = CONTENT_TYPES[contentType];
  const fileName = path.basename(filePath, '.ts');

  const errors = [];
  const warnings = [];

  // 1. SEO fields
  const titleTag = extractStringValue(content, 'titleTag');
  const metaDesc = extractStringValue(content, 'metaDescription');
  const primaryKw = extractStringValue(content, 'primaryKeyword');
  const secondaryKws = extractArrayItems(content, 'secondaryKeywords');
  const lsiKws = extractArrayItems(content, 'lsiKeywords');

  if (!titleTag) {
    errors.push('Missing titleTag');
  } else {
    if (titleTag.length > 60) errors.push(`titleTag ${titleTag.length} chars > 60: "${titleTag}"`);
    if (!/\|\s*(LCS|LessonCraftStudio)\s*$/.test(titleTag)) warnings.push(`titleTag does not end with "| LCS": "${titleTag}"`);
  }

  if (!metaDesc) {
    errors.push('Missing metaDescription');
  } else {
    if (metaDesc.length > 155) errors.push(`metaDescription ${metaDesc.length} chars > 155: "${metaDesc}"`);
    if (metaDesc.length < 100) warnings.push(`metaDescription only ${metaDesc.length} chars (target 140-155)`);
  }

  if (!primaryKw) {
    if (contentType !== 'idea') errors.push('Missing primaryKeyword');
    else warnings.push('Missing primaryKeyword (optional for idea-content)');
  } else {
    if (secondaryKws.length < 4) warnings.push(`Only ${secondaryKws.length} secondaryKeywords (target 4-5)`);
    if (lsiKws.length < 3) warnings.push(`Only ${lsiKws.length} lsiKeywords (target 3+)`);
  }

  // 2. Hero/H1
  const heroTitle = extractStringValue(content, 'title');
  if (!heroTitle) {
    warnings.push('Could not extract hero.title (H1)');
  } else {
    if (heroTitle.length > 70) errors.push(`H1 ${heroTitle.length} chars > 70: "${heroTitle}"`);
    if (titleTag && heroTitle === titleTag.replace(/\s*\|\s*(LCS|LessonCraftStudio)\s*$/, '')) {
      warnings.push('H1 appears identical to titleTag (should differ)');
    }
  }

  // 3. Hero description word count
  const heroDesc = extractStringValue(content, 'description');
  if (heroDesc) {
    const wc = countWords(heroDesc);
    if (wc < 90) warnings.push(`Hero description only ${wc} words (target 100-150)`);
    if (wc > 180) warnings.push(`Hero description ${wc} words (target 100-150, over by ${wc - 150})`);
  }

  // 4. FAQ count
  const faqCount = countFaqItems(content);
  if (faqCount < config.minFaq) {
    errors.push(`FAQ count ${faqCount} < ${config.minFaq} minimum`);
  }

  // 5. Internal links count
  const linkCount = countInternalLinks(content);
  if (linkCount < config.minLinks) {
    errors.push(`Internal links ${linkCount} < ${config.minLinks} minimum`);
  }

  // 6. Accent marks
  const accentIssues = findMissingAccents(content);
  if (accentIssues.length > 0) {
    errors.push(`${accentIssues.length} missing accent mark(s): ${accentIssues.slice(0, 3).join('; ')}${accentIssues.length > 3 ? '...' : ''}`);
  }

  // 7. Informal form
  const informalIssues = findInformalForm(content);
  if (informalIssues.length > 0) {
    warnings.push(`${informalIssues.length} potential informal "tu" form(s): ${informalIssues.slice(0, 2).join('; ')}${informalIssues.length > 2 ? '...' : ''}`);
  }

  // 8. Unicode escapes
  const unicodeIssues = findUnicodeEscapes(content);
  if (unicodeIssues.length > 0) {
    errors.push(`${unicodeIssues.length} Unicode escape(s) found (use real characters)`);
  }

  // 9. Smart quotes
  const smartQuoteIssues = findSmartQuotes(content);
  if (smartQuoteIssues.length > 0) {
    errors.push(`${smartQuoteIssues.length} smart/curly quote(s) found`);
  }

  // 10. English leakage
  const englishIssues = findEnglishLeakage(content);
  if (englishIssues.length > 0) {
    warnings.push(`${englishIssues.length} potential English phrase(s): ${englishIssues.slice(0, 2).join('; ')}${englishIssues.length > 2 ? '...' : ''}`);
  }

  return { fileName, errors, warnings, stats: { titleTag, metaDesc, primaryKw, faqCount, linkCount, secondaryKws: secondaryKws.length, lsiKws: lsiKws.length } };
}

// ── CLI ──────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const typeFilter = args.includes('--type') ? args[args.indexOf('--type') + 1] : null;
const fileFilter = args.includes('--file') ? args[args.indexOf('--file') + 1] : null;
const summaryOnly = args.includes('--summary');

let totalFiles = 0;
let totalErrors = 0;
let totalWarnings = 0;
let passCount = 0;
let failCount = 0;
const allKeywords = new Map(); // primaryKeyword -> fileName for uniqueness check
const allResults = [];

for (const [type, config] of Object.entries(CONTENT_TYPES)) {
  if (typeFilter && type !== typeFilter) continue;

  const esDir = path.join(CONFIG_DIR, config.dir, 'es');
  if (!fs.existsSync(esDir)) {
    console.log(`\n  Directory not found: ${esDir}`);
    continue;
  }

  const files = fs.readdirSync(esDir).filter(f => f.endsWith('.ts')).sort();

  if (!summaryOnly) console.log(`\n=== ${type.toUpperCase()} (${files.length} files) ===`);

  for (const file of files) {
    const fileName = path.basename(file, '.ts');
    if (fileFilter && !fileName.includes(fileFilter)) continue;

    const filePath = path.join(esDir, file);
    const result = validateFile(filePath, type);
    allResults.push({ type, ...result });
    totalFiles++;

    // Check keyword uniqueness
    if (result.stats.primaryKw) {
      const existing = allKeywords.get(result.stats.primaryKw);
      if (existing) {
        result.errors.push(`DUPLICATE primaryKeyword "${result.stats.primaryKw}" — also in ${existing}`);
      } else {
        allKeywords.set(result.stats.primaryKw, `${type}/${fileName}`);
      }
    }

    if (result.errors.length > 0) {
      failCount++;
      totalErrors += result.errors.length;
      if (!summaryOnly) {
        console.log(`  FAIL ${fileName}`);
        for (const e of result.errors) console.log(`    ERROR: ${e}`);
        for (const w of result.warnings) console.log(`    WARN:  ${w}`);
      }
    } else {
      passCount++;
      if (!summaryOnly && result.warnings.length > 0) {
        console.log(`  WARN ${fileName}`);
        for (const w of result.warnings) console.log(`    WARN:  ${w}`);
      } else if (!summaryOnly) {
        console.log(`  PASS ${fileName}`);
      }
    }
    totalWarnings += result.warnings.length;
  }
}

// ── Summary ──────────────────────────────────────────────────────────
console.log('\n' + '='.repeat(60));
console.log('SPANISH SEO VALIDATION SUMMARY');
console.log('='.repeat(60));
console.log(`Total files:    ${totalFiles}`);
console.log(`Passed:         ${passCount}`);
console.log(`Failed:         ${failCount}`);
console.log(`Total errors:   ${totalErrors}`);
console.log(`Total warnings: ${totalWarnings}`);
console.log(`Unique keywords: ${allKeywords.size}`);

if (failCount > 0) {
  console.log(`\nFAILED FILES:`);
  for (const r of allResults.filter(r => r.errors.length > 0)) {
    console.log(`  ${r.type}/${r.fileName}: ${r.errors.length} error(s)`);
  }
}

if (failCount > 0) {
  console.log(`\nResult: FAIL (${failCount} files with errors)`);
  process.exit(1);
} else {
  console.log(`\nResult: PASS (${totalFiles} files, ${totalWarnings} warnings)`);
  process.exit(0);
}
