/**
 * Reading Comprehension Level Set — apply a native audit (scratchpad audit/<loc>.json) to the level data.
 *   node tools/level-set/apply-rcm-audit.js <audit.json> [--dry-run] [--only=mistake]
 * Paths are JS-style into data/literacy/rc-levels/<loc>.json ("pools.G2-269[0].l1[2].choices"), or
 * "reading-passages:<storyId>" (value = {text?, questions?}) for a story that lives in reading-passages.js — those are
 * printed for a hand edit (that module is generated; a published story change is a republish).
 * When a fix replaces a `choices` array, `correct` follows the right answer's TEXT if it is still offered.
 * The whole locale is re-validated afterwards; nothing is written if validation fails.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { validateLocale } = require('./rc-validate.js');

const file = process.argv[2];
const DRY = process.argv.includes('--dry-run');
const SKIP = (process.argv.find((a) => a.startsWith('--skip=')) || '').slice(7).split(',').filter(Boolean);
const ONLY =(process.argv.find((a) => a.startsWith('--only=')) || '').slice(7);
const audit = JSON.parse(fs.readFileSync(file, 'utf8'));
const loc = audit.locale;
const P = path.join(__dirname, '..', '..', 'data', 'literacy', 'rc-levels', `${loc}.json`);
const d = JSON.parse(fs.readFileSync(P, 'utf8'));

function steps(p) {
  const out = [];
  p.replace(/\["([^"]+)"\]|\[(\d+)\]|([^.[\]]+)/g, (_, q, i, k) => { out.push(q != null ? q : i != null ? Number(i) : /^\d+$/.test(k) ? Number(k) : k); return ''; });
  return out;
}
let applied = 0; const manual = [];
for (const f of audit.findings || []) {
  if (!f.fix || f.fix.value === undefined || f.fix.value === null) continue;
  if (ONLY && f.severity !== ONLY) continue;
  if (SKIP.some((x) => f.where.includes(x))) { console.log('skipped ' + f.where); continue; }
  const p = String(f.fix.path);
  if (p.startsWith('reading-passages:')) { manual.push(f); continue; }
  const st = steps(p);
  let o = d;
  for (let i = 0; i < st.length - 1; i++) { if (o == null) break; o = o[st[i]]; }
  const last = st[st.length - 1];
  if (o == null || !(last in o)) { console.log(`PATH NOT FOUND: ${p} (${f.where})`); manual.push(f); continue; }
  if (last === 'choices' && Array.isArray(o.choices) && typeof o.correct === 'number') {
    const right = o.choices[o.correct];
    const at = f.fix.value.indexOf(right);
    o.choices = f.fix.value;
    if (at >= 0) o.correct = at;
    else console.log(`  note: ${f.where} — the old right answer "${right}" is no longer offered; correct stays ${o.correct} ("${o.choices[o.correct]}")`);
  } else if (last === 'text' && typeof f.fix.value === 'string' && o.sentences && f.fix.value !== o.sentences.join(' ')) {
    console.log(`TEXT WITHOUT SENTENCES: ${p} — needs a sentences fix too`); manual.push(f); continue;
  } else {
    o[last] = f.fix.value;
  }
  applied++;
  console.log(`applied ${f.severity} ${f.where}`);
}
const fails = validateLocale(d, loc, { requireAll: true });
if (fails.length) { console.log(`VALIDATION FAILED (${fails.length}) — nothing written`); fails.forEach((x) => console.log('  ' + x)); process.exit(1); }
if (!DRY) fs.writeFileSync(P, JSON.stringify(d, null, 1) + '\n');
console.log(`${loc}: ${applied} applied${DRY ? ' (dry run)' : ''}, ${manual.length} for hand edit`);
manual.forEach((f) => console.log(`  HAND: ${f.severity} ${f.where} — ${f.problem}\n        ${f.fix.path} = ${JSON.stringify(f.fix.value).slice(0, 400)}`));
