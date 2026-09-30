/**
 * Reading Comprehension Level Set — the hard rules of the native panels' data (BRIEF.md), checked on a panel file
 * or on the merged data/literacy/rc-levels/<loc>.json.
 *   node tools/level-set/rc-validate.js <file.json> [...]      exit 1 on any failure
 * Exported: validateLocale(data, loc) -> [failures]; literalIn / norm (the oracle uses the same reading).
 */
'use strict';
const fs = require('fs');
const { READING_PASSAGES } = require('../../data/literacy/reading-passages.js');

const norm = (s, loc) => String(s).normalize('NFC').replace(/[’‘]/g, "'").replace(/\s+/g, ' ').trim().toLocaleLowerCase(loc || 'en');
// the answer starts at a WORD START (Unicode letters) and may carry an inflection ending: 'modig' is NOT written in
// 'tålmodig', 'to' not in 'store', but 'Gelb' is written in 'gelbe' and 'Tung' in 'tunge'
const reEsc = (x) => x.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const literalIn = (needle, hay, loc) => new RegExp('(?<!\\p{L})' + reEsc(norm(needle, loc)), 'u').test(norm(hay, loc));
function fitsTwoRows(t) { t = String(t); if ([...t].length <= 45) return true; const w = t.split(' '); let a = ''; while (w.length && [...(a ? a + ' ' + w[0] : w[0])].length <= 45) a = a ? a + ' ' + w.shift() : w.shift(); return !!a && [...w.join(' ')].length <= 45; }
const words = (s) => String(s).trim().split(/\s+/).length;
const BAND = { 'G2-254': 1, 'G2-269': 3, 'G2-270': 4, 'G2-271': 5, 'G2-272': 6, 'G2-273': 7 };

function checkMc(q, where, f) {
  if (!q || typeof q.q !== 'string' || !q.q.trim()) return f.push(`${where}: no question`);
  if (!Array.isArray(q.choices) || q.choices.length !== 3) return f.push(`${where}: ${q.choices && q.choices.length} choices`);
  if (new Set(q.choices.map((c) => norm(c))).size !== 3) f.push(`${where}: duplicate choices`);
  if (![0, 1, 2].includes(q.correct)) f.push(`${where}: correct=${q.correct}`);
}
function checkStory(s, where, loc, f, { isNew, pageId }) {
  const text = s.text;
  if (!Array.isArray(s.sentences) || !s.sentences.length) return f.push(`${where}: no sentences`);
  if (s.sentences.join(' ') !== text) f.push(`${where}: sentences.join(" ") != text`);
  const n = s.sentences.length;
  // a mis-merged fix (e.g. a literal "l3.write" key) would silently never be read
  const allowed = isNew ? ['id', 'title', 'pageTitle', 'text', 'sentences', 'core', 'l1', 'l3', 'published'] : ['sentences', 'l1', 'l3', 'text'];
  Object.keys(s).filter((k) => !allowed.includes(k)).forEach((k) => f.push(`${where}: unexpected key "${k}"`));
  if (s.l3) Object.keys(s.l3).filter((k) => !['mc', 'write'].includes(k)).forEach((k) => f.push(`${where}: unexpected l3 key "${k}"`));
  if (isNew) {
    if (!/^[\w-]+$/.test(s.id || '')) f.push(`${where}: bad id "${s.id}"`);
    if (!s.title) f.push(`${where}: no title`);
    if (pageId !== 'G2-254' && (!s.pageTitle || [...s.pageTitle].length > 60)) f.push(`${where}: pageTitle missing or > 60`);
    if (n < 4 || n > 9) f.push(`${where}: ${n} sentences`);
    const pub = READING_PASSAGES[loc][BAND[pageId]];
    const w0 = words(pub.text), w = words(text);
    if (w < Math.max(22, Math.floor(w0 * 0.8)) || w > Math.ceil(w0 * 1.2)) f.push(`${where}: ${w} words (band ${w0} ±15%)`);
    if (!Array.isArray(s.core) || s.core.length !== 3) f.push(`${where}: core has ${s.core && s.core.length}`);
    else s.core.forEach((q, i) => checkMc(q, `${where} core ${i + 1}`, f));
  }
  if (!Array.isArray(s.l1) || s.l1.length !== 3) f.push(`${where}: l1 has ${s.l1 && s.l1.length}`);
  else s.l1.forEach((q, i) => {
    const w = `${where} l1 ${i + 1}`;
    checkMc(q, w, f);
    if (!(q.sentence >= 1 && q.sentence <= n)) return f.push(`${w}: sentence ${q.sentence}`);
    const sent = s.sentences[q.sentence - 1];
    if (!literalIn(q.choices[q.correct], sent, loc)) f.push(`${w}: the right choice "${q.choices[q.correct]}" is not in sentence ${q.sentence}`);
    q.choices.forEach((c, j) => { if (j !== q.correct && literalIn(c, sent, loc)) f.push(`${w}: wrong choice "${c}" is in sentence ${q.sentence}`); });
  });
  const l3 = s.l3 || {};
  if (!Array.isArray(l3.mc) || l3.mc.length !== 2) f.push(`${where}: l3.mc has ${l3.mc && l3.mc.length}`);
  else l3.mc.forEach((q, i) => {
    checkMc(q, `${where} l3 ${i + 1}`, f);
    if (q.choices && literalIn(q.choices[q.correct], text, loc)) f.push(`${where} l3 ${i + 1}: the inference answer "${q.choices[q.correct]}" is written in the story`);
  });
  const w3 = l3.write;
  if (!w3 || !w3.q || !w3.model) f.push(`${where}: l3.write incomplete`);
  else {
    if (!(w3.evidence >= 1 && w3.evidence <= n)) f.push(`${where}: evidence ${w3.evidence}`);
    // two writing rows of ~45 characters (the key wraps at a word boundary: lib/reading-comprehension-screen.js splitModel)
    if (!fitsTwoRows(w3.model)) f.push(`${where}: model answer does not fit two rows (${[...w3.model].length} chars)`);
  }
  // the right answers of one set are not all at the same letter
  for (const [k, set] of [['l1', s.l1], ['core', isNew ? s.core : null]]) {
    if (Array.isArray(set) && set.length === 3 && new Set(set.map((q) => q.correct)).size === 1) f.push(`${where}: every ${k} answer is ${'ABC'[set[0].correct]}`);
  }
}

/** Validate a locale's (merged or half) data. */
function validateLocale(d, loc, { requireAll = false } = {}) {
  const f = [];
  const P = READING_PASSAGES[loc];
  for (const [id, s] of Object.entries(d.published || {})) {
    const p = P.find((x) => x.id === id);
    if (!p) { f.push(`published ${id}: no such story`); continue; }
    checkStory({ ...s, text: p.text }, `published ${id}`, loc, f, { isNew: false });
  }
  const ids = new Set(P.map((p) => p.id));
  const titles = new Set();
  for (const [pageId, list] of Object.entries(d.pools || {})) {
    if (!(pageId in BAND)) { f.push(`pool ${pageId}: unknown page`); continue; }
    list.forEach((s, i) => {
      const w = `${pageId} #${i + 1} ${s.id}`;
      if (ids.has(s.id)) f.push(`${w}: id used twice`);
      ids.add(s.id);
      if (s.pageTitle) { if (titles.has(s.pageTitle)) f.push(`${w}: pageTitle used twice`); titles.add(s.pageTitle); }
      checkStory(s, w, loc, f, { isNew: true, pageId });
    });
  }
  if (requireAll) {
    for (const p of [0, 1, 2, 3, 4, 5, 6, 7]) if (!(d.published || {})[P[p].id]) f.push(`published ${P[p].id}: no level sets`);
    for (const pageId of Object.keys(BAND)) {
      const want = pageId === 'G2-254' ? 3 : 5;
      const got = ((d.pools || {})[pageId] || []).length;
      if (got < want) f.push(`${pageId}: ${got} new stories (want ${want})`);
    }
    if (!d.levelInstr || !d.levelInstr['1'] || !d.levelInstr['3']) f.push('levelInstr missing');
    if (!d.sentenceChip || !/\{n\}/.test(d.sentenceChip)) f.push('sentenceChip missing or without {n}');
    if (!d.screen || !d.screen.mc || !d.screen.evidence) f.push('screen strings missing');
  }
  return f;
}

module.exports = { validateLocale, literalIn, norm };

if (require.main === module) {
  let bad = 0;
  for (const file of process.argv.slice(2).filter((a) => !a.startsWith('--'))) {
    const d = JSON.parse(fs.readFileSync(file, 'utf8'));
    const loc = d.locale || require('path').basename(file).slice(0, 2);
    const f = validateLocale(d, loc, { requireAll: process.argv.includes('--all') });
    console.log(`${file}: ${f.length ? f.length + ' FAIL' : 'ok'}`);
    f.forEach((x) => console.log('  ' + x));
    bad += f.length;
  }
  process.exit(bad ? 1 : 0);
}
