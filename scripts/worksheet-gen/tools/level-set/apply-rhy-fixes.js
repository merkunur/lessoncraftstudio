/**
 * Rhyming Words — apply the native panels' PUBLISHED-bank fixes (pedagogical mistakes on live pages).
 *   node tools/level-set/apply-rhy-fixes.js <panelsDir> [--locales=…] [--skip=<loc>:<n>,…] [--dry-run]
 * Reads <panelsDir>/fix-<loc>.json { ops:[…] } (brief: scratchpad rhy/FIX-OPS-BRIEF.md) and edits the SOURCE of the
 * published bank:
 *   non-EN  data/b3/locales/rhyming-words.<loc>.json (the drafts are left alone — see below),
 *           printed instructions in i18n/strings.<loc>.json + the bank's strings
 *   en      data/b3/rhyming-words.js (hand-authored module: text edits, each asserted to match exactly once),
 *           printed instructions in i18n/strings.en.json + the page file's i18n.en + tools/b3var-rows/rhyming-words.js
 * Every op must apply; an op that cannot is REPORTED and the locale is left unwritten (fix the op, re-run).
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { fileUri } = require('../../lib/b2-common.js');

const args = process.argv.slice(2);
const DIR = args.find((a) => !a.startsWith('--'));
const DRY = args.includes('--dry-run');
const only = (args.find((a) => a.startsWith('--locales=')) || '').slice(10);
const skip = new Set(((args.find((a) => a.startsWith('--skip=')) || '').slice(7)).split(',').filter(Boolean));
const ROOT = path.join(__dirname, '..', '..');
const rd = (f) => fs.readFileSync(path.join(ROOT, f), 'utf8');
const wr = (f, s) => { if (!DRY) fs.writeFileSync(path.join(ROOT, f), s); };
const PAGE_FILE = {
  'G1-309': 'types/g1/G1-309-rhyming-words.js', 'K-352': 'types/k/K-352-rhyming-words-rhyme-or-not.js', 'G1-343': 'types/g1/G1-343-rhyming-words-sort-the-rhymes.js',
  'G1-344': 'types/g1/G1-344-rhyming-words-finish-the-rhyme.js', 'G1-345': 'types/g1/G1-345-rhyming-words-rhyme-strings.js', 'G1-346': 'types/g1/G1-346-rhyming-words-write-your-own-rhymes.js',
};
function picOf(s) {
  const i = String(s).lastIndexOf('/');
  const theme = s.slice(0, i), noun = s.slice(i + 1);
  fileUri(theme, noun);   // throws when not cached
  if (/\b(bw|sw|bn|nb|zw|sh|pb|mv|sv)(\s\d+)?$/i.test(theme)) throw new Error(`picture ${s} is B&W`);
  return { theme, noun };
}

/** Apply ops to a bank OBJECT (non-EN). Returns { bank, strings:{page:text}, log, errors }. */
function applyObject(bank, ops, loc) {
  const b = JSON.parse(JSON.stringify(bank));
  const log = [], errors = [], strings = {};
  const cls = (id) => b.classes.find((c) => c.id === id);
  ops.forEach((o, i) => {
    const tag = `${loc}:${i + 1} ${o.op}`;
    if (skip.has(`${loc}:${i + 1}`)) { log.push(`${tag} SKIPPED`); return; }
    try {
      const cid = o.op === 'moveMember' ? o.from : o.class;
      const c = cid ? cls(cid) : null;
      if (cid && !c) throw new Error(`no class ${cid}`);
      const mi = (k) => { const x = c.members.findIndex((m) => m.vocabKey === k); if (x < 0) throw new Error(`no member ${k} in ${c.id}`); return x; };
      switch (o.op) {
        case 'dropMember': c.members.splice(mi(o.vocabKey), 1); break;
        case 'setPic': c.members[mi(o.vocabKey)].pic = picOf(o.pic); c.members[mi(o.vocabKey)].picOpened = true; break;
        case 'setWord': c.members[mi(o.vocabKey)].word = o.word; break;
        case 'moveMember': { const to = cls(o.to); if (!to) throw new Error(`no class ${o.to}`); to.members.push(c.members.splice(mi(o.vocabKey), 1)[0]); break; }
        case 'dropFoil': { const x = (c.nearMiss || []).findIndex((m) => m.vocabKey === o.vocabKey); if (x < 0) throw new Error(`no foil ${o.vocabKey}`); c.nearMiss.splice(x, 1); break; }
        case 'dropExtra': { const x = (c.extra || []).indexOf(o.word); if (x < 0) throw new Error(`no extra ${o.word}`); c.extra.splice(x, 1); break; }
        case 'addExtra': c.extra = [...(c.extra || []), o.word]; break;
        case 'dropClass': b.classes.splice(b.classes.indexOf(c), 1); break;
        case 'setCouplet': { const cp = b.couplets.find((x) => x.id === o.id); if (!cp) throw new Error(`no couplet ${o.id}`); cp.lines = o.lines; if (o.rhymeWith) cp.rhymeWith = o.rhymeWith; break; }
        case 'dropCouplet': { const x = b.couplets.findIndex((x2) => x2.id === o.id); if (x < 0) throw new Error(`no couplet ${o.id}`); b.couplets.splice(x, 1); break; }
        case 'setInstruction': if (!PAGE_FILE[o.page]) throw new Error(`no page ${o.page}`); strings[o.page] = o.text; break;
        case 'setExemplar': b.exemplar = o.classes; break;
        default: throw new Error('unknown op');
      }
      log.push(tag + ' ok');
    } catch (e) { errors.push(`${tag}: ${e.message}`); }
  });
  // post-conditions: every class keeps >= 2 members, every exemplar class exists, every couplet answer is a member
  const keys = new Set(b.classes.flatMap((c) => c.members.map((m) => m.vocabKey)));
  for (const c of b.classes) if (c.members.length < 2) errors.push(`${loc}: class ${c.id} keeps ${c.members.length} member(s)`);
  for (const id of b.exemplar || []) if (!cls(id)) errors.push(`${loc}: exemplar class ${id} is gone`);
  for (const cp of b.couplets || []) if (!keys.has(cp.answer.vocabKey)) errors.push(`${loc}: couplet ${cp.id} answer ${cp.answer.vocabKey} is no member`);
  return { bank: b, strings, log, errors };
}

const locs = only ? only.split(',') : fs.readdirSync(DIR).map((f) => (/^fix-(\w\w)\.json$/.exec(f) || [])[1]).filter(Boolean);
for (const loc of locs) {
  const { ops } = JSON.parse(fs.readFileSync(path.join(DIR, `fix-${loc}.json`), 'utf8'));
  if (loc === 'en') { applyEn(ops); continue; }
  const f = `data/b3/locales/rhyming-words.${loc}.json`;
  const r = applyObject(JSON.parse(rd(f)), ops, loc);
  console.log(`${loc}: ${r.log.length} applied${r.errors.length ? `, ${r.errors.length} ERRORS:\n  - ${r.errors.join('\n  - ')}` : ''}`);
  if (r.errors.length) continue;
  for (const [page, text] of Object.entries(r.strings)) r.bank.strings[page] = { ...r.bank.strings[page], instruction: text };
  wr(f, JSON.stringify(r.bank, null, 2));
  // the i18n/.draft-b3-<loc>.json drafts are NOT touched: most had already drifted from the data files (only de
  // matched on 2026-09-30), so writing the bank into them would discard draft-only content; the data file is what
  // every page reads
  if (Object.keys(r.strings).length) {
    const sf = `i18n/strings.${loc}.json`;
    const s = JSON.parse(rd(sf));
    // a page the locale never published has no printed string (it G1-345): the bank's copy above is updated only
    for (const [page, text] of Object.entries(r.strings)) { if (!s[page]) { console.log(`  ${sf} has no ${page} (unpublished page) — bank copy only`); continue; } s[page].instruction = text; }
    wr(sf, JSON.stringify(s, null, 2) + '\n');
  }
}

/* ------------------------------------------------------------------ en: text edits on the hand-authored module */
function applyEn(ops) {
  const F = 'data/b3/rhyming-words.js';
  let s = rd(F);
  const errors = [];
  const q = (x) => x.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const once = (re, rep, what) => { const m = s.match(new RegExp(re.source, re.flags.includes('g') ? re.flags : re.flags + 'g')) || []; if (m.length !== 1) throw new Error(`${what}: ${m.length} matches`); s = s.replace(re, rep); };
  const block = (id) => {   // [start, end) of a class object in the en block
    const a = s.indexOf(`{ id: '${id}', rime:`);
    if (a < 0 || s.indexOf(`{ id: '${id}', rime:`, a + 1) >= 0) throw new Error(`class ${id} not found once`);
    const e = s.indexOf('\n      { id: ', a + 1);
    const e2 = s.indexOf('\n    ],', a + 1);
    return [a, Math.min(e < 0 ? Infinity : e, e2)];
  };
  const inBlock = (id, fn) => { const [a, e] = block(id); const seg = fn(s.slice(a, e)); s = s.slice(0, a) + seg + s.slice(e); };
  const dropCall = (seg, fn, key) => {
    const re = new RegExp(`,?\\s*${fn}\\('${q(key)}', [^)]*\\)`);
    if (!re.test(seg)) throw new Error(`${fn}('${key}') not in block`);
    let out = seg.replace(re, '');
    return out.replace(/\[\s*,\s*/, '[');
  };
  ops.forEach((o, i) => {
    const tag = `en:${i + 1} ${o.op}`;
    if (skip.has(`en:${i + 1}`)) { console.log(`${tag} SKIPPED`); return; }
    try {
      switch (o.op) {
        case 'dropMember': inBlock(o.class, (seg) => dropCall(seg, 'M', o.vocabKey)); break;
        case 'dropFoil': inBlock(o.class, (seg) => dropCall(seg, 'N', o.vocabKey)); break;
        case 'dropClass': { const [a, e] = block(o.class); s = s.slice(0, s.lastIndexOf('\n', a)) + s.slice(e); break; }
        case 'setCouplet': once(new RegExp(`(\\{ id: '${q(o.id)}', lines: )\\[[^\\]]*\\]`), `$1${JSON.stringify(o.lines).replace(/"/g, "'").replace(/,'/g, ", '")}`, `couplet ${o.id}`); break;
        case 'dropCouplet': once(new RegExp(`\\n\\s*\\{ id: '${q(o.id)}', lines: [^\\n]*`), '', `couplet ${o.id}`); break;
        case 'setExemplar': once(/exemplar: \['[^\]]*\]/,`exemplar: [${o.classes.map((c) => `'${c}'`).join(', ')}]`, 'exemplar'); break;
        case 'setInstruction': {
          const old = JSON.parse(rd('i18n/strings.en.json'))[o.page].instruction;
          if (!s.includes(`'${o.page}': { title:`) && !s.includes(`'${o.page}': {`)) throw new Error(`bank strings ${o.page} missing`);
          if (s.split(old).length !== 2) throw new Error(`bank instruction of ${o.page} not found once`);
          s = s.replace(old, o.text);
          const edits = [['i18n/strings.en.json', true], [PAGE_FILE[o.page], false], ['tools/b3var-rows/rhyming-words.js', false]];
          for (const [f, json] of edits) {
            const t = rd(f);
            if (json) { const j = JSON.parse(t); j[o.page].instruction = o.text; wr(f, JSON.stringify(j, null, 2) + '\n'); continue; }
            if (t.split(old).length !== 2) { if (f.includes('b3var-rows') && o.page === 'G1-309') continue; throw new Error(`${f}: old instruction not found once`); }
            wr(f, t.replace(old, o.text));
          }
          break;
        }
        default: throw new Error('op not supported for en: ' + o.op);
      }
      console.log(`${tag} ok`);
    } catch (e) { errors.push(`${tag}: ${e.message}`); }
  });
  if (errors.length) { console.log('en ERRORS:\n  - ' + errors.join('\n  - ')); return; }
  wr(F, s);
}
