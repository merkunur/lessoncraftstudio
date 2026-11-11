#!/usr/bin/env node
/**
 * The words of class links and results, in the 11 languages: the same keys and the same {placeholders} everywhere.
 *
 *   node scripts/class-results/tests/strings.js            the check (exit 1 on any failure)
 *   node scripts/class-results/tests/strings.js --dump     also writes out/class-results/strings-dump.md — every
 *                                                          text of the three surfaces, language by language, for
 *                                                          ONE native reviewer to read in one pass
 *
 * Three surfaces: the teacher screen (frontend/messages/classes/<loc>.json), the children's class page
 * (frontend/lib/class-results/child-strings.ts) and the reporter's two screen-reader labels (web/lcs-class.js).
 * Refused: a missing or extra key, an empty text, a placeholder that differs from English, a text that is still
 * English in another language (identical to en and longer than three words), the word "free" as a claim.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const REPO = path.join(__dirname, '..', '..', '..');
const esbuild = require(path.join(REPO, 'node_modules', 'esbuild'));
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const NAMES = { en: 'English (US)', de: 'German', fr: 'French', es: 'Spanish (Mexico)', pt: 'Portuguese (Brazil)', it: 'Italian', nl: 'Dutch', sv: 'Swedish', da: 'Danish', no: 'Norwegian (bokmål)', fi: 'Finnish' };

let fails = 0;
const fail = (m) => { fails++; console.log('FAIL  ' + m); };
const holders = (s) => (String(s).match(/\{[a-z]+\}/g) || []).sort().join(',');
const FREE = /\b(free|gratis|kostenlos|gratuit|gratuito|grátis|gratuita|ilmainen|ilmaiseksi|kosteloos)\b/i;

function compare(surface, by) {
  const en = by.en, keys = Object.keys(en);
  for (const l of LOCALES) {
    const t = by[l];
    if (!t) { fail(`${surface}: no ${l}`); continue; }
    const mine = Object.keys(t);
    for (const k of keys) if (!(k in t)) fail(`${surface} ${l}: "${k}" is missing`);
    for (const k of mine) if (!(k in en)) fail(`${surface} ${l}: "${k}" is not in English`);
    for (const k of keys) {
      if (!(k in t)) continue;
      const v = t[k];
      if (typeof v !== 'string' || !v.trim()) { fail(`${surface} ${l}: "${k}" is empty`); continue; }
      if (holders(v) !== holders(en[k])) fail(`${surface} ${l}: "${k}" has ${holders(v) || 'no placeholder'}, English has ${holders(en[k]) || 'none'}`);
      if (l !== 'en' && v === en[k] && v.split(/\s+/).length > 3) fail(`${surface} ${l}: "${k}" is still English`);
      if (FREE.test(v)) fail(`${surface} ${l}: "${k}" claims "free"`);
      if (/\s{2,}|^\s|\s$/.test(v)) fail(`${surface} ${l}: "${k}" has stray spaces`);
    }
  }
  return keys.length;
}

const teacher = {};
for (const l of LOCALES) { try { teacher[l] = JSON.parse(fs.readFileSync(path.join(REPO, 'frontend', 'messages', 'classes', l + '.json'), 'utf8')); } catch (e) { teacher[l] = null; } }
const out = path.join(REPO, 'out', 'class-results', '_tests', 'child-strings.bundle.js');
fs.mkdirSync(path.dirname(out), { recursive: true });
esbuild.buildSync({ entryPoints: [path.join(REPO, 'frontend', 'lib', 'class-results', 'child-strings.ts')], bundle: true, platform: 'node', format: 'cjs', outfile: out, logLevel: 'error' });
const child = require(out).CHILD_STRINGS;
// the reporter's labels: the object literal `var L = { … };` in lcs-class.js
const src = fs.readFileSync(path.join(REPO, 'scripts', 'class-results', 'web', 'lcs-class.js'), 'utf8');
const lit = /var L = (\{[\s\S]*?\n {4}\});/.exec(src);
const reporter = lit ? new Function('return ' + lit[1])() : {};
if (!lit) fail('the reporter\'s labels were not found in lcs-class.js');

const n1 = compare('teacher screen', teacher), n2 = compare('class page', child), n3 = compare('reporter', reporter);

if (process.argv.includes('--dump')) {
  const lines = ['# Class links and results — every text, for one native review', '',
    'Three surfaces. **Teacher screen**: a teacher makes a class, assigns worksheets, reads results. **Class page**: what a child of 4–10 sees after opening the class link (read aloud by the teacher if the child cannot read). **Reporter**: two screen-reader labels of the one button a child sees on a worksheet.', '',
    'English is the source. `{n}`, `{plan}`, `{list}`, `{date}`, `{time}`, `{right}`, `{total}`, `{status}`, `{short}`, `{long}` are filled in by the page; `{plan}` is the plan\'s name as the pricing page writes it.', ''];
  for (const l of LOCALES) {
    lines.push('## ' + l + ' — ' + NAMES[l], '');
    for (const [title, by] of [['Class page (children)', child], ['Reporter', reporter], ['Teacher screen', teacher]]) {
      lines.push('### ' + title, '');
      for (const k of Object.keys(by.en)) lines.push('- `' + k + '`: ' + (by[l] && by[l][k] != null ? by[l][k] : '—') + (l === 'en' ? '' : '  ⟵ ' + by.en[k]));
      lines.push('');
    }
  }
  const f = path.join(REPO, 'out', 'class-results', 'strings-dump.md');
  fs.writeFileSync(f, lines.join('\n'));
  console.log('dump → ' + path.relative(REPO, f) + ' (' + Math.round(fs.statSync(f).size / 1024) + ' KB)');
}
console.log(fails ? `${fails} FAILURE(S)` : `strings: ${n1} teacher + ${n2} class-page + ${n3} reporter texts × 11 languages, keys and placeholders agree`);
process.exit(fails ? 1 : 0);
