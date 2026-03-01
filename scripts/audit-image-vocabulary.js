/**
 * Audit image-vocabulary data for diacritics errors
 * ==================================================
 *
 * Conservative approach: only flag entries where we're highly confident the singular is wrong.
 * Uses umlaut-shift dictionaries for German and Swedish to avoid false positives.
 * Uses minimum match threshold for accent transfer to avoid unrelated-word false positives.
 *
 * Usage: node scripts/audit-image-vocabulary.js
 */

const fs = require('fs');
const path = require('path');

const raw = JSON.parse(fs.readFileSync(
  path.join(__dirname, 'v2-data', 'image-vocabulary-raw.json'), 'utf8'
));
const corrections = JSON.parse(fs.readFileSync(
  path.join(__dirname, 'v2-data', 'vocabulary-corrections.json'), 'utf8'
));

const LOCALES = ['en','de','fr','es','pt','it','nl','sv','da','no','fi'];

// ============================================================
// UTILITIES
// ============================================================

function stripAccents(str) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').normalize('NFC');
}

function hasAccents(str) {
  return str !== stripAccents(str);
}

function hasNordicSpecial(str) {
  return /[æøåÆØÅ]/.test(str);
}

// ============================================================
// UMLAUT-SHIFT DICTIONARIES
// ============================================================
// Words where the SINGULAR correctly has NO umlaut; umlaut appears ONLY in plural.
// Includes stems for compound word matching.

const DE_UMLAUT_SHIFT = new Set([
  'axt','arzt','ast','ball','band','bank','baum','faden','fall','garten','gast',
  'graben','hahn','hals','kamm','kanal','kalb','kraft','laden','land','macht',
  'mangel','mantel','nacht','nagel','palast','platz','rand','raum','sattel',
  'satz','schatz','traum','wald','wall','wand','zaun','rad','bad','glas','haus',
  'block','bock','boden','dorf','koch','kopf','korb','korn','loch','ofen',
  'rock','sohn','stock','ton','topf','volk','wort',
  'bruder','bruch','buch','bug','busch','flug','fluss','frucht','fuchs',
  'fuss','fuß','gruft','huhn','hut','kuh','kunst','kuss','mund','mutter',
  'nuss','spruch','strumpf','stuhl','tochter','tuch','turm','wurm','wurst',
  'zug','brauch','faust','laus','maus','schlauch','strauch','kürbis',
  // Additional German singular-no-umlaut stems
  'sack','stamm','knopf','schlag','strand','vogel','zahn','apfel','hand',
  'naht','stadt','markt','fang','gang','klang','griff','schuss','schnitt',
  'wurf','sprung','schwung','druck','sturz','sturm','grund',
  'hof','stoff','wolf','handschuh','umhang','vorhang','frosch','kohl',
  'gans','hammer','kran','cardinal','grasshopper',
  // Compound endings that undergo umlaut shift
  'baum','haus','stuhl','schrank','topf','korb','turm','ball','hut',
]);

const SV_UMLAUT_SHIFT = new Set([
  // Swedish words where ä/ö/å appears ONLY in plural (singular correct without)
  'bok','strand','hand','tand','natt','stad','rand','rot','fot','son',
  'man','gång','fader','broder','moder','dotter',
  // Compound stems
  'bok','hand','tand','natt','fot','man',
]);

const DA_NO_UMLAUT_SHIFT = new Set([
  // Danish/Norwegian: fewer umlaut-shift words, but some exist
  'mand','fader','broder','moder','datter','gås','bog',
]);

function isUmlautShiftWord(singular, locale) {
  const lower = singular.toLowerCase();
  let dict;
  if (locale === 'de') dict = DE_UMLAUT_SHIFT;
  else if (locale === 'sv') dict = SV_UMLAUT_SHIFT;
  else if (locale === 'da' || locale === 'no') dict = DA_NO_UMLAUT_SHIFT;
  else return false;

  // Exact match
  if (dict.has(lower)) return true;
  // Compound match: check if word ends with a known stem
  for (const stem of dict) {
    if (lower.endsWith(stem) && lower.length > stem.length) return true;
  }
  return false;
}

// ============================================================
// ACCENT TRANSFER WITH STRICT MATCHING
// ============================================================

/**
 * Transfer accent positions from plural to singular.
 * Requires high positional match ratio to avoid false positives.
 * Returns corrected singular or null.
 */
function transferAccents(rawSingular, corrPlural) {
  if (!rawSingular || !corrPlural) return null;
  if (hasAccents(rawSingular)) return null;
  if (!hasAccents(corrPlural) && !hasNordicSpecial(corrPlural)) return null;

  const strippedSingular = stripAccents(rawSingular);
  const strippedPlural = stripAccents(corrPlural);

  // Count positional matches between stripped singular and stripped plural
  const minLen = Math.min(strippedSingular.length, strippedPlural.length);
  if (minLen < 2) return null;

  let matches = 0;
  for (let i = 0; i < minLen; i++) {
    if (strippedSingular[i].toLowerCase() === strippedPlural[i].toLowerCase()) matches++;
  }

  // Require at least 80% positional match with the singular's length
  const matchRatio = matches / strippedSingular.length;
  if (matchRatio < 0.80) return null;

  // Build corrected singular by transferring accents from matching positions
  const pluralChars = [...corrPlural];
  const singularChars = [...rawSingular];
  let result = '';

  for (let i = 0; i < singularChars.length; i++) {
    if (i < pluralChars.length) {
      const sBase = stripAccents(singularChars[i]);
      const pBase = stripAccents(pluralChars[i]);
      if (sBase.toLowerCase() === pBase.toLowerCase() && singularChars[i] !== pluralChars[i]) {
        // Transfer accent, preserving case
        const isUpper = singularChars[i] === singularChars[i].toUpperCase();
        const accented = pluralChars[i];
        result += isUpper ? accented.toUpperCase() : accented.toLowerCase();
      } else {
        result += singularChars[i];
      }
    } else {
      result += singularChars[i];
    }
  }

  return result !== rawSingular && hasAccents(result) ? result : null;
}

/**
 * Fix Nordic digraph patterns: ae→æ, oe→ø, aa→å
 * These are ALWAYS stripping artifacts (never correct as digraphs in modern Nordic).
 */
function fixDigraphs(rawSingular, corrPlural) {
  if (!rawSingular || !corrPlural) return null;

  let fixed = rawSingular;
  const pluralLower = corrPlural.toLowerCase();

  if (pluralLower.includes('æ') && rawSingular.toLowerCase().includes('ae')) {
    fixed = fixed.replace(/Ae/g, 'Æ').replace(/ae/g, 'æ');
  }
  if (pluralLower.includes('ø') && rawSingular.toLowerCase().includes('oe')) {
    fixed = fixed.replace(/Oe/g, 'Ø').replace(/oe/g, 'ø');
  }
  if (pluralLower.includes('å') && rawSingular.toLowerCase().includes('aa')) {
    fixed = fixed.replace(/Aa/g, 'Å').replace(/aa/g, 'å');
  }

  return fixed !== rawSingular ? fixed : null;
}

// ============================================================
// MAIN AUDIT
// ============================================================

const issues = [];

for (const [key, rawEntry] of Object.entries(raw)) {
  const corrEntry = corrections[key] || {};

  for (const locale of LOCALES) {
    const rawSingular = rawEntry[locale];
    if (!rawSingular || typeof rawSingular !== 'string') continue;

    const corrData = corrEntry[locale];
    let corrPlural = null;
    if (corrData) {
      corrPlural = Array.isArray(corrData) ? corrData[0] : corrData;
    }
    if (!corrPlural) continue;

    const singularClean = !hasAccents(rawSingular) && !hasNordicSpecial(rawSingular);
    const pluralHasSpecial = hasAccents(corrPlural) || hasNordicSpecial(corrPlural);

    if (!singularClean || !pluralHasSpecial) continue;

    // Skip known umlaut-shift words (umlaut only in plural)
    if (isUmlautShiftWord(rawSingular, locale)) continue;

    // Try Nordic digraph fix first (highest confidence for da/no/sv)
    if (locale === 'sv' || locale === 'da' || locale === 'no') {
      const digraphFix = fixDigraphs(rawSingular, corrPlural);
      if (digraphFix) {
        issues.push({
          key, locale, type: 'nordic_digraph',
          rawSingular, suggestedSingular: digraphFix, corrPlural,
          confidence: 'high',
          reason: `Nordic digraph in "${rawSingular}"`
        });
        continue;
      }
    }

    // Try accent transfer (strict matching)
    const accentFix = transferAccents(rawSingular, corrPlural);

    if (locale === 'de') {
      issues.push({
        key, locale, type: 'german_suspect',
        rawSingular, suggestedSingular: accentFix, corrPlural,
        confidence: accentFix ? 'medium' : 'low',
        reason: `German word not in umlaut-shift dictionary`
      });
    } else if (locale === 'fi') {
      issues.push({
        key, locale, type: 'finnish_diacritics',
        rawSingular, suggestedSingular: accentFix, corrPlural,
        confidence: accentFix ? 'high' : 'medium',
        reason: `Finnish: plural has ä/ö, singular does not`
      });
    } else if (locale === 'fr' || locale === 'es' || locale === 'pt' || locale === 'it') {
      issues.push({
        key, locale, type: 'romance_diacritics',
        rawSingular, suggestedSingular: accentFix, corrPlural,
        confidence: accentFix ? 'high' : 'medium',
        reason: `Romance language: plural has accents, singular does not`
      });
    } else if (locale === 'sv' || locale === 'da' || locale === 'no') {
      issues.push({
        key, locale, type: 'nordic_diacritics',
        rawSingular, suggestedSingular: accentFix, corrPlural,
        confidence: accentFix ? 'high' : 'medium',
        reason: `Nordic: plural has special characters, singular does not`
      });
    } else if (locale === 'nl') {
      if (accentFix) {
        issues.push({
          key, locale, type: 'dutch_diacritics',
          rawSingular, suggestedSingular: accentFix, corrPlural,
          confidence: 'medium',
          reason: `Dutch: accent mismatch`
        });
      }
    }
  }
}

// Deduplicate
const seen = new Set();
const uniqueIssues = issues.filter(i => {
  const k = `${i.key}:${i.locale}`;
  if (seen.has(k)) return false;
  seen.add(k);
  return true;
});

// Group by type, locale, confidence
const byType = {}, byLocale = {}, byConfidence = { high: 0, medium: 0, low: 0 };
for (const issue of uniqueIssues) {
  if (!byType[issue.type]) byType[issue.type] = [];
  byType[issue.type].push(issue);
  if (!byLocale[issue.locale]) byLocale[issue.locale] = [];
  byLocale[issue.locale].push(issue);
  byConfidence[issue.confidence]++;
}

console.log('\n=== IMAGE VOCABULARY AUDIT REPORT ===\n');
console.log(`Total entries: ${Object.keys(raw).length}`);
console.log(`Issues found: ${uniqueIssues.length}`);
console.log(`  High confidence (auto-fixable): ${byConfidence.high}`);
console.log(`  Medium confidence (likely correct): ${byConfidence.medium}`);
console.log(`  Low confidence (needs expert): ${byConfidence.low}`);
console.log('\nBy type:');
for (const [type, items] of Object.entries(byType)) {
  console.log(`  ${type}: ${items.length}`);
}
console.log('\nBy locale:');
for (const locale of LOCALES) {
  if (byLocale[locale]) console.log(`  ${locale}: ${byLocale[locale].length}`);
}

// Show all high confidence fixes
const highConf = uniqueIssues.filter(i => i.confidence === 'high' && i.suggestedSingular);
console.log(`\n--- ALL ${highConf.length} HIGH CONFIDENCE FIXES ---`);
for (const i of highConf) {
  console.log(`  [${i.locale}] ${i.key}: "${i.rawSingular}" → "${i.suggestedSingular}"`);
}

// Show medium confidence
const medConf = uniqueIssues.filter(i => i.confidence === 'medium');
console.log(`\n--- MEDIUM CONFIDENCE (${medConf.length}) ---`);
for (const i of medConf) {
  const fix = i.suggestedSingular ? ` → maybe "${i.suggestedSingular}"` : '';
  console.log(`  [${i.locale}] ${i.key}: "${i.rawSingular}"${fix}`);
}

// Show low confidence
const lowConf = uniqueIssues.filter(i => i.confidence === 'low');
console.log(`\n--- LOW CONFIDENCE (${lowConf.length}) ---`);
for (const i of lowConf) {
  console.log(`  [${i.locale}] ${i.key}: "${i.rawSingular}" (plural: "${i.corrPlural}")`);
}

// Write report
const reportPath = path.join(__dirname, 'audit-vocabulary-report.json');
fs.writeFileSync(reportPath, JSON.stringify({
  summary: {
    totalEntries: Object.keys(raw).length,
    totalIssues: uniqueIssues.length,
    byConfidence, byType: Object.fromEntries(Object.entries(byType).map(([k,v]) => [k, v.length])),
    byLocale: Object.fromEntries(LOCALES.filter(l => byLocale[l]).map(l => [l, byLocale[l].length]))
  },
  issues: uniqueIssues
}, null, 2), 'utf8');
console.log(`\nReport: ${reportPath}`);
