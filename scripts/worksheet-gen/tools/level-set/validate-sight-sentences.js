#!/usr/bin/env node
/**
 * Sight Words Level Set (2026-09-30) — builds data/literacy/sight-words-levelset.json from the
 * authored data/literacy/sight-levelset/<loc>.txt files and refuses anything a child should not get:
 *   - the first 24 words must be the published list in its order (the published pages read them);
 *   - every word has >= 6 sentences; the word occurs EXACTLY ONCE, as a whole word (Unicode-aware,
 *     case-insensitive — an inflected form does not count);
 *   - 2..9 words, starts with a capital (after ¿/¡), ends with . ? or !;
 *   - every character is traceable (letter-strokes.js throws on anything unknown);
 *   - no quotes, colons, semicolons or œ; no duplicate sentence within a word; no duplicate word.
 * Usage: node tools/level-set/validate-sight-sentences.js [--locales=en,de] [--write] [--poison]
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { SIGHT_WORDS } = require('../../data/literacy/sight-words.js');
const letterStrokes = require('../../data/tracing/letter-strokes.js');

const ROOT = path.join(__dirname, '..', '..');
const SRC = path.join(ROOT, 'data', 'literacy', 'sight-levelset');
const OUT = path.join(ROOT, 'data', 'literacy', 'sight-words-levelset.json');
const LOCALES = ['en', 'de', 'es', 'fr', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];

function occurrences(sentence, word) {
  const esc = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp('(?<!\\p{L})' + esc + '(?!\\p{L})', 'giu');
  return (sentence.match(re) || []).length;
}

function checkSentence(s, word) {
  const f = [];
  const n = occurrences(s, word);
  if (n !== 1) f.push(`"${word}" occurs ${n}x`);
  const words = s.split(/\s+/).filter((t) => /\p{L}/u.test(t));
  if (words.length < 2 || words.length > 9) f.push(`${words.length} words`);
  if (!/^[¿¡]?\p{Lu}/u.test(s)) f.push('no capital at the start');
  if (!/[.?!]$/.test(s)) f.push('no end mark');
  if (/[«»":;"“”„œŒ]/.test(s)) f.push('forbidden character');
  try { letterStrokes.textGlyphs(s); } catch (e) { f.push('untraceable: ' + e.message.replace(/^letter-strokes: /, '')); }
  return f;
}

function parse(loc) {
  const file = path.join(SRC, loc + '.txt');
  const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/).filter((l) => l.trim() && !l.startsWith('#'));
  return lines.map((l) => { const [word, ...s] = l.split('|').map((x) => x.trim()); return { word, sentences: s.filter(Boolean) }; });
}

function validate(loc, rows) {
  const fails = [];
  const pub = SIGHT_WORDS[loc] || [];
  pub.forEach((w, i) => { if (!rows[i] || rows[i].word !== w) fails.push(`${loc}: row ${i + 1} must be the published word "${w}" (got "${rows[i] && rows[i].word}")`); });
  const seen = new Set();
  for (const r of rows) {
    if (seen.has(r.word)) fails.push(`${loc}: duplicate word "${r.word}"`);
    seen.add(r.word);
    if (!/^\p{L}+$/u.test(r.word) || [...r.word].length > 10) fails.push(`${loc}: bad word "${r.word}"`);
    try { letterStrokes.textGlyphs(r.word); } catch (e) { fails.push(`${loc}: word "${r.word}" untraceable`); }
    if (r.sentences.length < 6) fails.push(`${loc} ${r.word}: ${r.sentences.length} sentences < 6`);
    const ss = new Set();
    for (const s of r.sentences) {
      if (ss.has(s)) fails.push(`${loc} ${r.word}: duplicate sentence "${s}"`);
      ss.add(s);
      for (const x of checkSentence(s, r.word)) fails.push(`${loc} ${r.word}: ${x} — "${s}"`);
    }
  }
  return fails;
}

function poison() {
  // every rule must FIRE on a bad sentence and stay SILENT on its good twin
  const cases = [
    ['the', 'The cat is on the mat.', true],   // twice
    ['the', 'The cat is on my mat.', false],
    ['do', "I don't know.", true],              // "don" is not "do"
    ['do', 'I do my work.', false],
    ['koti', 'Menen kotiin.', true],            // inflected form does not count
    ['koti', 'Tämä on koti.', false],
    ['är', 'Här är min katt', true],            // no end mark
    ['är', 'här är min katt.', true],           // no capital
    ['är', 'Här är min katt.', false],
    ['la', '¿Dónde está la casa?', false],
    ['la', 'Dónde está la casa: aquí.', true],  // colon
    ['sœur', 'Ma sœur est là.', true],
    ['go', 'Go.', true],                        // one word
  ];
  let bad = 0;
  for (const [w, s, shouldFail] of cases) {
    const got = checkSentence(s, w).length > 0;
    if (got !== shouldFail) { bad++; console.log(`POISON MISS: "${s}" (${w}) expected ${shouldFail ? 'fail' : 'pass'}`); }
  }
  console.log(bad ? `poison: ${bad} misses` : `poison: all ${cases.length} cases behave`);
  return bad === 0;
}

function main() {
  const args = process.argv.slice(2);
  if (args.includes('--poison') && !poison()) process.exit(1);
  const arg = args.find((a) => a.startsWith('--locales='));
  const locs = arg ? arg.slice(10).split(',') : LOCALES.filter((l) => fs.existsSync(path.join(SRC, l + '.txt')));
  const out = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, 'utf8')) : {};
  let total = 0;
  for (const loc of locs) {
    const rows = parse(loc);
    const fails = validate(loc, rows);
    fails.forEach((f) => console.log('FAIL ' + f));
    console.log(`${loc}: ${rows.length} words, ${rows.reduce((n, r) => n + r.sentences.length, 0)} sentences, ${fails.length} problems`);
    total += fails.length;
    out[loc] = { words: rows.map((r) => r.word), sentences: Object.fromEntries(rows.map((r) => [r.word, r.sentences])) };
  }
  if (args.includes('--write') && !total) {
    const sorted = Object.fromEntries(LOCALES.filter((l) => out[l]).map((l) => [l, out[l]]));
    fs.writeFileSync(OUT, JSON.stringify(sorted, null, 1) + '\n');
    console.log('wrote ' + path.relative(ROOT, OUT));
  }
  if (total) process.exit(1);
}

if (require.main === module) main();
module.exports = { occurrences, checkSentence, parse, validate };
