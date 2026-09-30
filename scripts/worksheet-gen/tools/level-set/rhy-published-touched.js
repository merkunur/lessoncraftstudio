/**
 * Which PUBLISHED Rhyming Words pages carry an item a published-bank fix touched (so they must be republished)?
 *   node tools/level-set/rhy-published-touched.js dump > head-meta.json          (run in a HEAD copy of the tree)
 *   node tools/level-set/rhy-published-touched.js check <head-meta.json> <panelsDir> [--skip=en:17]
 * dump: the meta of every published page (level 2, copy 1, no unit) built with that tree's code + bank.
 * check: a page is TOUCHED when its old meta names a vocabKey or couplet id an applied op changed, or when an op
 * changed that page's printed instruction. Pages not touched stay byte-identical on the live site (their decks are
 * static files; a rebuild would only reshuffle a page that had no mistake).
 */
'use strict';
const fs = require('fs');
const path = require('path');
const [mode, a1, a2] = process.argv.slice(2);
const IDS = ['G1-309', 'K-352', 'G1-343', 'G1-344', 'G1-345', 'G1-346'];
const LOCS = ['en', 'de', 'es', 'fr', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
if (mode === 'dump') {
  const { loadType } = require('../../lib/load-types.js');
  const { makeRng, instanceSeed } = require('../../lib/rng.js');
  const out = {};
  for (const id of IDS) for (const loc of LOCS) {
    if (id === 'G1-345' && loc === 'it') continue;
    const spec = loadType(id);
    const seed = instanceSeed({ typeId: id, theme: null, difficulty: 2, seedEpoch: 1, variant: 1, unit: null });
    out[`${id}|${loc}`] = spec.build({ theme: null, difficulty: 2, locale: loc, unit: null }, { rng: makeRng(seed), variant: 1 }).meta;
  }
  process.stdout.write(JSON.stringify(out));
} else if (mode === 'check') {
  const metas = JSON.parse(fs.readFileSync(a1, 'utf8'));
  const skip = new Set(((process.argv.find((x) => x.startsWith('--skip=')) || '').slice(7)).split(',').filter(Boolean));
  const { bank } = require('../../lib/b3-common.js');
  const touched = [];
  for (const loc of LOCS) {
    const f = path.join(a2, `fix-${loc}.json`);
    if (!fs.existsSync(f)) continue;
    const { ops } = JSON.parse(fs.readFileSync(f, 'utf8'));
    const keys = new Set(), couplets = new Set(), pages = new Set();
    // class members of dropped classes, read from the HEAD bank the metas were built from (git show)
    const headBank = loc === 'en' ? null : JSON.parse(require('child_process').execSync(`git show HEAD:scripts/worksheet-gen/data/b3/locales/rhyming-words.${loc}.json`, { cwd: path.join(__dirname, '..', '..'), encoding: 'utf8', maxBuffer: 64 << 20 }));
    ops.forEach((o, i) => {
      if (skip.has(`${loc}:${i + 1}`)) return;
      if (['dropMember', 'setPic', 'setWord', 'moveMember'].includes(o.op)) keys.add(o.vocabKey);
      if (o.op === 'dropClass') {
        const c = headBank ? headBank.classes.find((x) => x.id === o.class) : null;
        if (c) c.members.forEach((m) => keys.add(m.vocabKey));
        else if (loc === 'en') ({ un: ['sun', 'bun'], en: ['pen', 'hen'] }[o.class] || []).forEach((k) => keys.add(k));
      }
      if (o.op === 'setCouplet' || o.op === 'dropCouplet') couplets.add(o.id);
      if (o.op === 'setInstruction') pages.add(o.page);
      if (o.op === 'setExemplar') pages.add('G1-309');
    });
    for (const id of IDS) {
      const m = metas[`${id}|${loc}`];
      if (!m) continue;
      const s = JSON.stringify(m);
      const why = [];
      for (const k of keys) if (s.includes(`"${k}"`)) why.push(k);
      for (const c of couplets) if ((m.couplets || []).includes(c)) why.push('couplet ' + c);
      if (pages.has(id)) why.push('instruction');
      if (why.length) touched.push({ id, loc, why });
    }
  }
  for (const t of touched) console.log(`${t.id} ${t.loc}: ${t.why.join(', ')}`);
  console.log(`${touched.length} published pages touched`);
  fs.writeFileSync(path.join(a2, '..', 'touched.json'), JSON.stringify(touched, null, 1));
} else throw new Error('usage: dump | check <head-meta.json> <panelsDir>');
