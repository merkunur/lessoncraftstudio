#!/usr/bin/env node
/**
 * Phase 5.2 of the SEO remediation arc — i18n integrity sweep.
 *
 * Walks `frontend/messages/<locale>.json` for all 11 locales and reports:
 *   - missing keys (present in en.json, absent in target locale)
 *   - empty/placeholder values ("", "TODO", "???")
 *   - english leakage (value === en value AND value contains non-trivial text)
 *
 * Read-only. Prints a per-locale summary table plus a sample of findings.
 * No file edits — disposition is operator-strategic per CLAUDE.md §17.5.1
 * (Nordic+Finnic require NSR before any auto-fix).
 *
 * Usage:
 *   node scripts/seo-i18n-integrity.js
 *   node scripts/seo-i18n-integrity.js --sample=20      # 20 lines per category
 *   node scripts/seo-i18n-integrity.js --locale=de      # focus one locale
 *
 * Exit codes:
 *   0 — sweep ran cleanly (regardless of defect count)
 *   2 — a locale file failed to parse
 */

const fs = require('fs');
const path = require('path');

const MESSAGES_DIR = path.join(__dirname, '..', 'frontend', 'messages');
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

const args = process.argv.slice(2);
const SAMPLE = (args.find(a => a.startsWith('--sample=')) || '--sample=8').split('=')[1];
const SAMPLE_N = Math.max(0, parseInt(SAMPLE, 10) || 8);
const FOCUS = (args.find(a => a.startsWith('--locale=')) || '').split('=')[1] || null;

// Keys whose value is brand-canonical and EN-stable across all locales
// (proper nouns, brand names). Flagging "LessonCraftStudio" as english-leak
// is a false positive — never fabricate a translation for these.
const BRAND_TOKENS = [
  'LessonCraftStudio',
  'Common Core',
  'Lemon Squeezy',
  'lessoncraftstudio',
];

function flattenJson(obj, prefix = '') {
  const out = {};
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? `${prefix}.${k}` : k;
    if (v !== null && typeof v === 'object' && !Array.isArray(v)) {
      Object.assign(out, flattenJson(v, key));
    } else {
      out[key] = v;
    }
  }
  return out;
}

function loadLocale(loc) {
  const file = path.join(MESSAGES_DIR, `${loc}.json`);
  const raw = fs.readFileSync(file, 'utf-8');
  return flattenJson(JSON.parse(raw));
}

function isBrandToken(s) {
  if (typeof s !== 'string') return false;
  const trimmed = s.trim();
  if (trimmed.length === 0) return false;
  // Pure brand name — leave alone.
  if (BRAND_TOKENS.includes(trimmed)) return true;
  return false;
}

function isPlaceholder(v) {
  if (v === null || v === undefined) return true;
  if (typeof v !== 'string') return false;
  const t = v.trim();
  if (t === '') return true;
  if (/^(TODO|TBD|FIXME|XXX|\?{2,}|---)$/i.test(t)) return true;
  return false;
}

function isTrivial(v) {
  if (typeof v !== 'string') return false;
  const t = v.trim();
  if (t.length <= 2) return true;
  // Numeric / symbolic values are locale-invariant
  if (/^[0-9.,/—–-]+$/.test(t)) return true;
  return false;
}

function main() {
  const en = loadLocale('en');
  const enKeys = Object.keys(en);

  const targets = FOCUS ? [FOCUS] : LOCALES.filter(l => l !== 'en');
  const findings = {};

  for (const loc of targets) {
    let data;
    try {
      data = loadLocale(loc);
    } catch (err) {
      console.error(`[integrity] ${loc}: parse failed — ${err.message}`);
      process.exit(2);
    }

    const missing = [];
    const placeholder = [];
    const enLeak = [];

    for (const key of enKeys) {
      if (!(key in data)) {
        missing.push(key);
        continue;
      }
      const v = data[key];
      if (isPlaceholder(v)) {
        placeholder.push({ key, value: v });
        continue;
      }
      // EN-leakage heuristic: equal to en AND non-trivial AND not a brand token.
      if (typeof v === 'string' && v === en[key] && !isTrivial(v) && !isBrandToken(v)) {
        enLeak.push({ key, value: v });
      }
    }

    findings[loc] = { missing, placeholder, enLeak };
  }

  // === Summary table ===
  console.log('');
  console.log('Phase 5.2 — i18n integrity sweep against en.json baseline');
  console.log(`Baseline: ${enKeys.length} keys in en.json`);
  console.log('');
  console.log('  Locale  | Missing | Empty/TODO | EN leakage | Coverage');
  console.log('  --------+---------+------------+------------+---------');
  for (const loc of targets) {
    const f = findings[loc];
    const coverageNumerator = enKeys.length - f.missing.length - f.placeholder.length - f.enLeak.length;
    const coveragePct = ((coverageNumerator / enKeys.length) * 100).toFixed(1);
    console.log(`  ${loc.padEnd(8)}|  ${String(f.missing.length).padStart(5)}  |   ${String(f.placeholder.length).padStart(5)}    |   ${String(f.enLeak.length).padStart(5)}    |  ${coveragePct}%`);
  }

  // === Samples ===
  if (SAMPLE_N > 0) {
    for (const loc of targets) {
      const f = findings[loc];
      if (f.missing.length === 0 && f.placeholder.length === 0 && f.enLeak.length === 0) continue;
      console.log('');
      console.log(`---- ${loc} samples (cap ${SAMPLE_N}) ----`);
      if (f.missing.length > 0) {
        console.log(`  MISSING (${f.missing.length}):`);
        f.missing.slice(0, SAMPLE_N).forEach(k => console.log(`    - ${k}`));
      }
      if (f.placeholder.length > 0) {
        console.log(`  PLACEHOLDER (${f.placeholder.length}):`);
        f.placeholder.slice(0, SAMPLE_N).forEach(({ key, value }) => console.log(`    - ${key} = ${JSON.stringify(value)}`));
      }
      if (f.enLeak.length > 0) {
        console.log(`  EN_LEAK (${f.enLeak.length}):`);
        f.enLeak.slice(0, SAMPLE_N).forEach(({ key, value }) => {
          const preview = value.length > 80 ? value.slice(0, 80) + '…' : value;
          console.log(`    - ${key} = ${JSON.stringify(preview)}`);
        });
      }
    }
  }

  // Write full findings to docs/audit-results/ for operator reference.
  // JSON keeps the full per-locale defect lists; samples above are a preview.
  const outDir = path.join(__dirname, '..', 'docs', 'audit-results');
  fs.mkdirSync(outDir, { recursive: true });
  const utc = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
  const outFile = path.join(outDir, `seo-i18n-integrity-${utc}.json`);
  fs.writeFileSync(outFile, JSON.stringify({
    baseline: { locale: 'en', keys: enKeys.length },
    sweepDate: new Date().toISOString(),
    findings,
    notes: [
      'EN_LEAK includes legitimate cognates (Blog, Email, Status, Contact, Plan) that share spelling across many locales. Not all entries are defects.',
      'PLACEHOLDER entries may be intentional empty strings — e.g. auth.signUp.termsEnd ("") is a trailing terms-sentence fragment that is empty in en.json by design.',
      'Section-header capital strings (e.g. "13. CONTACT", "10. COOKIES", "1. INTRODUCTION") in fr/pt/it/sv/da/no/fi are real translation gaps on legal pages.',
      'Nordic+Finnic (sv/da/no/fi) require NSR per CLAUDE.md §17.5.1 before any auto-fix.',
    ],
  }, null, 2), 'utf-8');
  console.log('');
  console.log(`Full findings written: ${path.relative(path.join(__dirname, '..'), outFile).replace(/\\/g, '/')}`);
  console.log('Sweep complete. Disposition is operator-strategic — Nordic+Finnic (sv/da/no/fi) require NSR per CLAUDE.md §17.5.1 before any auto-fix.');
}

main();
