#!/usr/bin/env node
/**
 * validate-topic-overrides.js — authoring gate for frontend/content/topic-seo-overrides/<locale>.json
 *
 * Enforces (FAIL = exit 1):
 *  - file parses; only known top-level keys (singleAxis, intersection)
 *  - every singleAxis key exists in one of the 3 topic axes (exercise-type, theme,
 *    educational-level) of topics-taxonomy.json AND has a name for the locale
 *  - every intersection key is `<a>__<b>` with a<b (sorted), both components known
 *  - intersection FLIP entries (prose or metaDescription present → page becomes
 *    indexable via intersectionOverrideAuthored) must carry BOTH:
 *      prose ≥ 200 words AND metaDescription (120-170 rendered chars)
 *  - metaDescription rendered length 120-170 (all entries that have one)
 *  - title ≤ 65 chars pre-brand (WARN > 51 — root layout appends " · LessonCraftStudio")
 *  - seasonal collision guards: no singleAxis entry for an upgraded seasonal theme
 *    key; no intersection TITLE for an upgraded (seasonal theme × educational-level)
 *    pair (seasonalGradeTitle owns those)
 *  - per-locale duplicate titles / metaDescriptions across all entries (anti-cannibalization)
 *
 * Usage: node scripts/seo/validate-topic-overrides.js [--locales=de,en] [--strict-warn]
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');
const TAXONOMY = require(path.join(ROOT, 'frontend', 'config', 'topics-taxonomy.json'));
const CONTENT_DIR = path.join(ROOT, 'frontend', 'content', 'topic-seo-overrides');

const TOPIC_AXES = ['exercise-type', 'theme', 'educational-level'];
const ALL_LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

// Mirror frontend/lib/seasonal-hub.ts gating (5 universal + 2 en-only).
const SEASONAL_UNIVERSAL = ['christmas', 'easter', 'winter', 'spring', 'summer'];
const SEASONAL_EN_ONLY = ['4th_of_july', 'thanksgivinng']; // literal taxonomy key (triple-n typo)
function seasonalUpgraded(locale, axisKey) {
  if (SEASONAL_UNIVERSAL.includes(axisKey)) return true;
  if (SEASONAL_EN_ONLY.includes(axisKey)) return locale === 'en';
  return false;
}

function axisOf(axisKey) {
  for (const ax of TOPIC_AXES) if (TAXONOMY.axes[ax] && TAXONOMY.axes[ax][axisKey]) return ax;
  return null;
}
function hasLocaleName(axisKey, locale) {
  const ax = axisOf(axisKey);
  if (!ax) return false;
  const e = TAXONOMY.axes[ax][axisKey];
  return !!(e && e.name && e.name[locale]);
}

// Rendered <meta content> length — mirrors the route's renderedMetaLen.
function renderedMetaLen(s) {
  let n = s.length;
  n += (s.match(/'/g) || []).length * 5;
  n += (s.match(/&/g) || []).length * 4;
  n += (s.match(/"/g) || []).length * 5;
  n += (s.match(/[<>]/g) || []).length * 3;
  return n;
}
const wordCount = (s) => s.trim().split(/\s+/).filter(Boolean).length;

function argVal(name, dflt) {
  const a = process.argv.find((x) => x.startsWith(`--${name}=`));
  return a ? a.split('=')[1] : dflt;
}

const locales = (argVal('locales', '') || '').split(',').filter(Boolean);
const files = (locales.length ? locales : ALL_LOCALES)
  .map((l) => ({ locale: l, file: path.join(CONTENT_DIR, `${l}.json`) }))
  .filter(({ file }) => fs.existsSync(file));

if (!files.length) {
  console.log('No topic-seo-overrides files found — nothing to validate.');
  process.exit(0);
}

let failures = 0;
let warnings = 0;
const fail = (loc, msg) => { failures += 1; console.error(`FAIL [${loc}] ${msg}`); };
const warn = (loc, msg) => { warnings += 1; console.warn(`WARN [${loc}] ${msg}`); };

for (const { locale, file } of files) {
  let data;
  try {
    data = JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (e) {
    fail(locale, `unparseable JSON: ${e.message}`);
    continue;
  }
  const extraTop = Object.keys(data).filter((k) => !['singleAxis', 'intersection', '$comment'].includes(k));
  if (extraTop.length) fail(locale, `unknown top-level keys: ${extraTop.join(', ')}`);

  const titles = new Map();
  const metas = new Map();
  const checkCommon = (key, entry, kind) => {
    const extra = Object.keys(entry).filter((k) => !['title', 'h1', 'metaDescription', 'prose', '$comment'].includes(k));
    if (extra.length) fail(locale, `${kind} "${key}": unknown fields ${extra.join(', ')}`);
    if (entry.title) {
      const len = entry.title.length;
      if (len > 65) fail(locale, `${kind} "${key}": title ${len} chars (> 65 pre-brand)`);
      else if (len > 51) warn(locale, `${kind} "${key}": title ${len} chars (> 51 — brand suffix pushes past ~70 rendered)`);
      const t = entry.title.toLowerCase();
      if (titles.has(t)) fail(locale, `${kind} "${key}": duplicate title with "${titles.get(t)}" (cannibalization)`);
      titles.set(t, key);
    }
    if (entry.metaDescription) {
      const rl = renderedMetaLen(entry.metaDescription);
      if (rl < 120 || rl > 170) fail(locale, `${kind} "${key}": metaDescription rendered length ${rl} (must be 120-170)`);
      const m = entry.metaDescription.toLowerCase();
      if (metas.has(m)) fail(locale, `${kind} "${key}": duplicate metaDescription with "${metas.get(m)}"`);
      metas.set(m, key);
    }
    if (entry.prose && wordCount(entry.prose) < 40 && kind === 'singleAxis') {
      warn(locale, `${kind} "${key}": prose only ${wordCount(entry.prose)} words — thin for a body override`);
    }
  };

  for (const [key, entry] of Object.entries(data.singleAxis || {})) {
    if (!axisOf(key)) { fail(locale, `singleAxis "${key}": not a known axis-key in any topic axis`); continue; }
    if (!hasLocaleName(key, locale)) warn(locale, `singleAxis "${key}": no ${locale} name in taxonomy (page may not exist for locale)`);
    if (seasonalUpgraded(locale, key)) fail(locale, `singleAxis "${key}": seasonal-upgraded theme — seasonal-hub owns its title/H1/copy`);
    checkCommon(key, entry, 'singleAxis');
  }

  for (const [key, entry] of Object.entries(data.intersection || {})) {
    const parts = key.split('__');
    if (parts.length !== 2) { fail(locale, `intersection "${key}": key must be <a>__<b>`); continue; }
    const [a, b] = parts;
    if ([a, b].sort().join('__') !== key) { fail(locale, `intersection "${key}": components not in sorted order (expected "${[a, b].sort().join('__')}")`); continue; }
    const axA = axisOf(a); const axB = axisOf(b);
    if (!axA) fail(locale, `intersection "${key}": unknown component "${a}"`);
    if (!axB) fail(locale, `intersection "${key}": unknown component "${b}"`);
    if (axA && axB && axA === axB) fail(locale, `intersection "${key}": both components on the same axis (${axA}) — not a valid intersection`);
    // Seasonal season×grade: title override forbidden (seasonalGradeTitle owns it)
    const themeKey = axA === 'theme' ? a : axB === 'theme' ? b : null;
    const levelKey = axA === 'educational-level' ? a : axB === 'educational-level' ? b : null;
    if (themeKey && levelKey && seasonalUpgraded(locale, themeKey) && entry.title) {
      fail(locale, `intersection "${key}": title override on an upgraded season×grade pair — seasonalGradeTitle owns it`);
    }
    // Flip semantics: substantive content flips the page indexable → demand full quality
    const flips = !!((entry.prose && entry.prose.trim()) || (entry.metaDescription && entry.metaDescription.trim()));
    if (flips) {
      if (!entry.prose || wordCount(entry.prose) < 200) {
        fail(locale, `intersection "${key}": flips indexable but prose is ${entry.prose ? wordCount(entry.prose) : 0} words (< 200)`);
      }
      if (!entry.metaDescription) fail(locale, `intersection "${key}": flips indexable but has no metaDescription`);
    }
    checkCommon(key, entry, 'intersection');
  }

  const nS = Object.keys(data.singleAxis || {}).length;
  const nI = Object.keys(data.intersection || {}).length;
  console.log(`OK-scan [${locale}] ${nS} singleAxis + ${nI} intersection entries checked`);
}

console.log(`\n${failures} failures, ${warnings} warnings across ${files.length} locale file(s)`);
if (failures > 0) process.exit(1);
if (warnings > 0 && process.argv.includes('--strict-warn')) process.exit(1);
