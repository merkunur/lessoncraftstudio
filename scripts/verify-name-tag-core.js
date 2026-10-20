#!/usr/bin/env node
/* =====================================================================
   verify-name-tag-core.js — build gate for ACTIVITY #57, The Sticky Name
   Tag (mini tools/name-tag-core.js, RF.K.3, 11 locales). Its OWN ground
   truth (never read off the core's answers):
     0. every word: its picture exists, is a colour drawing, is not a
        refused drawing, carries the library's own name for it in that
        locale (two recorded exceptions); no two words share a picture
     1. the stick test, re-implemented with Intl.Segmenter graphemes and a
        case-blind compare: stuck = matching leading graphemes, full only
        when every grapheme of both matches; a mark is its own letter
     2. read: the tag names exactly ONE wall picture; the four names are
        different and prefix-free; no confusable pair on a wall; "close"
        shares more leading letters with the word than "far" (the setting
        changes the wall), at least one close picture shares the first
        letter, every far picture shares at most one letter
     3. family: the tags share one ending of ≥ 2 letters, differ at the
        first letter; the extra picture(s) do not have that ending; every
        tag names exactly one wall picture
     4. syllables: every split is the approved-words split (TeX agreed, ≥ 3
        sources, not policy-managed); the partner shares exactly the first
        part; the others share none; the tag names exactly one picture
     5. memory: three words that share their first letter, three pictures
     6. levels: each shown level ≥ 7 rounds; en keeps the design's tables
     7. the state machine: Check with no tag / tags left / pieces loose asks
        (no miss); a wrong picture peels at the gate's own first different
        unit; help only at miss 2; a move takes it away; right → done;
        family locks the right tags; syllables in the wrong order peel at
        the first part; memory: pair / miss / done
     8. deal balance (target frame ¼ ± 1, nearest look-alike beside it in
        exactly half the rounds); memory layouts vary; order() never repeats
     9. strings × 11, every hint key the core returns is authored; the
        manifest mirrors the core; frozen metadata; url-safe slugs
   Usage: node scripts/verify-name-tag-core.js  (NTG_CORE_DIR = mutation dir)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm'), cp = require('child_process');
const ROOT = path.join(__dirname, '..'), MT = path.join(ROOT, 'mini tools'), IMG = path.join(ROOT, 'image-library-webp', 'themes');
const C = (() => { const ctx = { module: { exports: {} } }; ctx.exports = ctx.module.exports; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(process.env.NTG_CORE_DIR || MT, 'name-tag-core.js'), 'utf8'), ctx); return ctx.module.exports; })();
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL <= 60) console.error('   FAIL: ' + m); } };
const LOCS = ['en', 'de', 'nl', 'da', 'sv', 'no', 'es', 'it', 'pt', 'fr', 'fi'];
const BW = /\s(bw|sw|bn|nb|zw|sh|pb|mv|sv)(\s+\d+)?$/i;
const REFUSED = ['camping/lake', 'easter/egg', 'At the Supermarket/egg', 'zoo animals/bear', 'forest creatures/bear', 'bakery/cake', 'At the Supermarket/cake', 'At the Supermarket/plum', 'At the Supermarket/butter', 'shapes/moon', 'kitchen tools/pan', 'around the house/glass', 'farm animals/ox', 'At the Supermarket/water', 'weather/sun', 'body parts/lip', 'clothing/pants', 'spring/rain', 'shapes/cone'];
/* the library's own name differs, and children say this word for the drawing (recorded, not loosened) */
const NAME_EXCEPTIONS = { 'de:hase': 'animals/rabbit (label «Kaninchen»; children say «Hase»)', 'pt:sapo': 'forest creatures/frog (label «rã»; Brazilian children say «sapo»)' };
/* pictures a child could name with each other's word: never on one wall */
const CONFUSE = [['cup', 'mug'], ['bun', 'muffin'], ['rug', 'carpet'], ['kip', 'hen'], ['bol', 'bal'], ['hen', 'chicken'], ['lam', 'schaap'], ['lamm', 'schaf'], ['huhn', 'hahn']];
const LABEL = {};
for (const f of fs.readdirSync(path.join(MT, 'pictures'))) { if (f[0] === '_') continue; const j = JSON.parse(fs.readFileSync(path.join(MT, 'pictures', f), 'utf8')); for (const [k, v] of Object.entries(j.nouns)) LABEL[j.dir + '/' + k] = v.labels || {}; }
const SEG = new Intl.Segmenter('en', { granularity: 'grapheme' });
const G = (s) => [...SEG.segment(String(s).normalize('NFC').toLocaleLowerCase())].map(x => x.segment);
/* the gate's own stick test */
function stick(tag, name) { let k = 0; while (k < tag.length && k < name.length && tag[k] === name[k]) k++; return { stuck: k, full: k === tag.length && k === name.length }; }
const lead = (a, b) => stick(G(a), G(b)).stuck;
const J = (a) => a.join(' ');

/* 0 — words and pictures */
for (const loc of LOCS) {
  const W = C.DATA[loc].words, seen = {};
  for (const [w, p] of Object.entries(W)) {
    const f = path.join(IMG, p + '@2x.webp');
    is(fs.existsSync(f), `${loc} ${w}: picture on disk (${p})`);
    is(!BW.test(p.split('/')[0]), `${loc} ${w}: a colour theme (${p})`);
    is(!REFUSED.includes(p), `${loc} ${w}: not a refused drawing (${p})`);
    const lab = (LABEL[p] || {})[loc];
    is((lab && lab[0].toLocaleLowerCase() === w) || NAME_EXCEPTIONS[loc + ':' + w], `${loc} ${w}: the library's own name for ${p} (${lab && lab[0]})`);
    is(!seen[p], `${loc} ${w}: picture ${p} not shared with ${seen[p]}`); seen[p] = w;
    is(/^[\p{Ll}]+$/u.test(w), `${loc} ${w}: lower-case letters only`);
  }
}
/* 1 — the stick test */
for (const loc of LOCS) {
  const ws = Object.keys(C.DATA[loc].words);
  for (const a of ws) for (const b of ws) {
    const own = stick(G(a), G(b)), got = C.stickTest(C.units(a), C.units(b));
    if (got.stuck !== own.stuck || got.full !== own.full) { is(false, `${loc} stickTest(${a}, ${b}) = ${got.stuck}/${got.full}, own ${own.stuck}/${own.full}`); }
  }
  PASS++;
}
is(C.stickTest(C.units('Ball'), C.units('ball')).full, 'case-blind: Ball = ball');
is(!C.stickTest(C.units('mus'), C.units('müs')).full && C.stickTest(C.units('mus'), C.units('müs')).stuck === 1, 'a mark is its own letter: u ≠ ü');
is(!C.stickTest(C.units('ño'), C.units('no')).full, 'ñ ≠ n');
is(C.stickTest(C.units('cat'), C.units('cats')).stuck === 3 && !C.stickTest(C.units('cat'), C.units('cats')).full, 'a tag that is the start of a longer name does not stick fully');

const approved = {};
for (const loc of LOCS) { const A = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/v2-data/verify-syllable-boundaries/output/approved-words-' + loc + '.json'), 'utf8')).entries; approved[loc] = {}; for (const e of A) approved[loc][e.word.toLocaleLowerCase()] = e; }
const nameOf = (x) => x.key;
for (const loc of LOCS) {
  const lvs = C.levels(loc);
  is(lvs.length === 4, `${loc}: all four levels shown (${lvs.join(',')})`);
  /* 2 — read */
  const close = C.rounds(loc, 'read', 'close'), far = C.rounds(loc, 'read', 'far');
  is(close.length >= 7 && close.length === far.length, `${loc} read: ≥ 7 rounds (${close.length})`);
  close.forEach((r, i) => {
    const f = far[i], t = r.tag.key, id = `${loc} read ${t}`;
    for (const wall of [r.wall, f.wall]) {
      is(wall.length === 4 && new Set(wall.map(nameOf)).size === 4, `${id}: four different pictures`);
      is(wall.filter(x => stick(G(t), G(x.key)).full).length === 1 && wall[0].key === t, `${id}: the tag names exactly one picture (the target)`);
      for (const a of wall) for (const b of wall) if (a !== b) { is(!b.key.startsWith(a.key), `${id}: prefix-free (${a.key}/${b.key})`); is(!CONFUSE.some(([x, y]) => x === a.key && y === b.key), `${id}: no confusable pair ${a.key}/${b.key}`); }
    }
    const sc = r.wall.slice(1).reduce((n, x) => n + lead(t, x.key), 0), sf = f.wall.slice(1).reduce((n, x) => n + lead(t, x.key), 0);
    is(sc > sf, `${id}: close walls share more letters than far (${sc} > ${sf})`);
    is(r.wall.slice(1).some(x => lead(t, x.key) >= 1), `${id}: a close picture shares the first letter`);
    is(f.wall.slice(1).every(x => lead(t, x.key) <= 1), `${id}: far pictures share at most one letter`);
    is(r.wall.slice(1).every(x => lead(t, x.key) <= lead(t, r.wall[r.near].key)), `${id}: the core's "nearest" is the closest look-alike`);
  });
  /* 3 — family */
  const fam = C.rounds(loc, 'family');
  is(fam.length >= 7, `${loc} family: ≥ 7 rounds (${fam.length})`);
  for (const r of fam) {
    const id = `${loc} family ${r.tags.map(x => x.key).join('/')}`, keys = r.tags.map(x => G(x.key));
    const rime = (w) => { const m = w.match(/[aeiouyäöüåæøéèêëàáâãíìîïóòôõúùûœ].*$/u); return m ? m[0] : ''; };
    const end = rime(r.tags[0].key);
    is(end && r.tags.every(t => rime(t.key) === end), `${id}: the tags share one rime, the whole ending from the vowel ("${end}")`);
    is(new Set(keys.map(x => x[0])).size === keys.length, `${id}: the tags differ at the first letter`);
    is(r.tags.length >= 2 && r.tags.length <= 3 && r.wall.length === 4 && new Set(r.wall.map(nameOf)).size === 4, `${id}: 2–3 tags, four different pictures`);
    is(r.wall.slice(r.tags.length).every(x => rime(x.key) !== end && !x.key.endsWith(end)), `${id}: the extra picture is not in the family`);
    is(r.tags.every(t => r.wall.filter(x => stick(G(t.key), G(x.key)).full).length === 1), `${id}: every tag names exactly one picture`);
    is(C.ending(r.tags) === end, `${id}: the core prints the rime "${end}" (${C.ending(r.tags)})`);
  }
  /* 4 — syllables */
  const syl = C.rounds(loc, 'syllables');
  is(syl.length >= 7, `${loc} syllables: ≥ 7 rounds (${syl.length})`);
  for (const r of syl) {
    const id = `${loc} syllables ${r.tag.key}`;
    for (const x of r.wall) {
      const e = approved[loc][x.key];
      is(e && J(e.split.map(s => s.toLocaleLowerCase())) === J(x.sparts) && (e.sources_agreed || []).includes('TeX') && e.total_agreed >= 3 && e.policy_managed !== true, `${id}: ${x.key} split ${x.sparts.join('·')} is the approved TeX-agreed split (${e && e.split.join('·')})`);
    }
    is(r.wall[1].sparts[0] === r.tag.sparts[0] && J(r.wall[1].sparts) !== J(r.tag.sparts), `${id}: the partner shares the first part and is a different word (${r.wall[1].key})`);
    is(r.wall.slice(2).every(x => x.sparts[0] !== r.tag.sparts[0]), `${id}: the others share no first part`);
    is(r.wall.filter(x => J(x.sparts) === J(r.tag.sparts)).length === 1 && r.wall[0].key === r.tag.key, `${id}: the tag names exactly one picture`);
    is(r.tag.parts.join('').toLocaleLowerCase() === r.tag.key, `${id}: the pieces spell the word`);
  }
  /* 5 — memory */
  const mem = C.rounds(loc, 'memory');
  is(mem.length >= 7, `${loc} memory: ≥ 7 boards (${mem.length})`);
  for (const r of mem) is(r.words.length === 3 && new Set(r.words.map(w => w.pic)).size === 3 && r.words.every(w => G(w.key)[0] === G(r.words[0].key)[0]) && r.words.every(a => r.words.every(b => a === b || !b.key.startsWith(a.key))), `${loc} memory ${r.words.map(w => w.key).join('/')}: three words sharing the first letter, three pictures, prefix-free`);
  /* display: German nouns carry their capital, every other locale lower-case */
  const w0 = close[0].tag;
  is(loc === 'de' ? /^\p{Lu}/u.test(w0.word) : w0.word === w0.key, `${loc}: printed form ${w0.word}`);
}
/* 6 — en keeps the design's tables */
const EN = C.rounds('en', 'read', 'close').map(r => r.tag.key).sort().join();
is(EN === 'bat,bun,bus,can,cap,cat,dog,fan,hat,jam,mop,pen', `en read: the design's twelve words (${EN})`);
is(C.rounds('en', 'family').map(r => r.tags.map(t => t.key).join(' ')).join('|') === 'cat hat bat|can fan van|bag flag|bed sled|car jar star|bun sun|hen pen|mug jug rug|dog log frog', 'en family: the design table');
is(C.rounds('en', 'syllables').map(r => r.tag.key).join() === 'pencil,penguin,rainbow,raincoat,hammer,hamster,panda,pancake,basket,basketball', 'en syllables: the design table (carrot/carpet → rainbow/raincoat: their first syllables are not the same sound)');
is(C.rounds('en', 'memory').length === 8, 'en memory: the design\'s eight boards');

/* 7 — the state machine */
for (const loc of LOCS) {
  const r = C.rounds(loc, 'read', 'close')[0], st = C.newState(r, { layout: [0, 1, 2, 3] });
  let x = C.check(st); is(x.kase === 'empty' && st.misses === 0 && C.hint(st) === 'hintHang', `${loc}: Check with the tag in the tray asks, no miss`);
  is(C.hang(st, 0, 1), `${loc}: hang on the nearest look-alike`);
  const own = stick(G(r.tag.key), G(r.wall[1].key));
  x = C.check(st);
  is(x.kase === 'peel' && st.last.stuck === own.stuck && st.hung[0] === -1 && st.misses === 1, `${loc}: peels at the gate's own first different letter (${st.last.stuck} vs ${own.stuck})`);
  is(C.peelUnit(st) === [...SEG.segment(r.tag.word)][own.stuck].segment, `${loc}: the ringed letter is the first different one`);
  is(!C.helpOn(st) && C.hint(st) === (own.stuck === 0 ? 'hintFirst' : own.stuck === 1 ? 'hintPeel1' : 'hintPeel'), `${loc}: miss 1 names how far it stuck (${C.hint(st)})`);
  C.hang(st, 0, 2); is(!st.show && C.hint(st) === null, `${loc}: a move takes the hint away`);
  C.check(st); is(st.misses === 2 && C.helpOn(st) && C.hint(st) === 'hintHelp', `${loc}: help only at miss 2`);
  C.hang(st, 0, 0); is(!C.helpOn(st), `${loc}: a move takes the help away`);
  x = C.check(st); is(x.ok && st.done, `${loc}: the right picture → done`);
  is(!C.hang(st, 0, 1), `${loc}: nothing moves after done`);
  /* family */
  const fr = C.rounds(loc, 'family')[0], fs2 = C.newState(fr, { layout: [0, 1, 2, 3] });
  C.hang(fs2, 0, 0); x = C.check(fs2); is(x.kase === 'tray' && fs2.misses === 0 && C.hint(fs2) === 'hintTray', `${loc} family: tags left in the tray → asks, no miss`);
  fr.tags.forEach((_, i) => C.hang(fs2, i, (i + 1) % fr.tags.length));
  x = C.check(fs2); is(x.kase === 'peel' && fs2.misses === 1 && fs2.hung.every(h => h === -1) && C.hint(fs2) === 'hintFamily', `${loc} family: every wrong tag peels back`);
  C.hang(fs2, 0, 0); C.hang(fs2, 1, 2 % 4 === 0 ? 3 : 2);
  const tagsN = fr.tags.length; for (let i = 0; i < tagsN; i++) C.hang(fs2, i, i === 1 ? 3 : i); /* tag 1 wrong (on the extra) */
  x = C.check(fs2); is(fs2.locked[0] && !fs2.locked[1] && fs2.hung[1] === -1, `${loc} family: right tags lock, wrong ones peel`);
  is(!C.hang(fs2, 0, 2), `${loc} family: a locked tag does not move`);
  C.hang(fs2, 1, 1); x = C.check(fs2); is(x.ok && fs2.done, `${loc} family: all right → done`);
  /* syllables */
  const sr = C.rounds(loc, 'syllables')[0], ss = C.newState(sr, {});
  x = C.check(ss); is(x.kase === 'join' && ss.misses === 0, `${loc} syllables: loose pieces → asks, no miss`);
  is(!C.hang(ss, 0, 0), `${loc} syllables: a half-built tag cannot hang`);
  const rev = sr.tag.parts.map((_, i) => i).reverse(); rev.forEach(i => C.join(ss, i));
  C.hang(ss, 0, 0); x = C.check(ss);
  is(x.kase === 'peel' && ss.last.stuck === 0 && C.hint(ss) === 'hintFirstSyl', `${loc} syllables: the pieces in the wrong order peel at the first part`);
  C.unjoin(ss); sr.tag.parts.forEach((_, i) => C.join(ss, i)); C.hang(ss, 0, 1); x = C.check(ss);
  is(x.kase === 'peel' && ss.last.stuck === 1 && C.peelUnit(ss) === sr.tag.parts[1] && C.hint(ss) === 'hintHelpSyl', `${loc} syllables: on the partner it sticks the first part and peels at the second (miss 2: the help)`);
  C.hang(ss, 0, 0); x = C.check(ss); is(x.ok && ss.done, `${loc} syllables: right → done`);
  /* memory */
  const mr = C.rounds(loc, 'memory')[0], ms = C.newState(mr, { cards: [0, 3, 1, 4, 2, 5] });
  let f1 = C.flip(ms, 0), f2 = C.flip(ms, 3);
  is(f1.kase === 'one' && f2.kase === 'miss' && f2.test && f2.test.stuck === stick(G(mr.words[1].key), G(mr.words[0].key)).stuck && C.hint(ms) === 'hintMem', `${loc} memory: a picture and another tag → miss, peels at the first different letter`);
  is(C.flip(ms, 2) === null, `${loc} memory: no third card while two are up`);
  C.settle(ms); is(ms.up.length === 0, `${loc} memory: the pair turns back`);
  f1 = C.flip(ms, 0); f2 = C.flip(ms, 1); is(f2.kase === 'pair' && C.isUp(ms, 0) && C.isUp(ms, 1), `${loc} memory: a picture and its own tag stay up`);
  C.flip(ms, 2); C.flip(ms, 3); f2 = C.flip(ms, 4); f2 = C.flip(ms, 5);
  is(ms.done && f2.kase === 'done', `${loc} memory: all pairs → done`);
}
/* 8 — deal / order */
const rnd = C.seeded('ntg');
for (let n = 7; n <= 12; n++) for (let s = 0; s < 300; s++) {
  const D = C.deal(n, rnd), tf = [0, 0, 0, 0]; let side = 0, bad = 0;
  D.forEach(l => { const t = l.indexOf(0), nf = l.indexOf(1); tf[t]++; if (C.NEIGH[t].includes(nf)) side++; if (J(l.slice().sort()) !== '0 1 2 3') bad++; });
  if (bad || Math.max(...tf) - Math.min(...tf) > 1 + (n % 4 ? 0 : 0) || Math.max(...tf) > Math.ceil(n / 4) || side !== Math.round(n / 2)) { is(false, `deal n=${n}: target frames ${tf}, beside ${side}/${Math.round(n / 2)}, bad ${bad}`); break; }
}
PASS++;
let adj = 0, tot = 0; const NB6 = (a, b) => (Math.abs(a - b) === 1 && Math.floor(a / 3) === Math.floor(b / 3)) || Math.abs(a - b) === 3;
for (let s = 0; s < 2000; s++) { const l = C.dealCards(1, rnd)[0]; for (let i = 0; i < 3; i++) { tot++; if (NB6(l.indexOf(i), l.indexOf(i + 3))) adj++; } }
is(adj / tot > 0.25 && adj / tot < 0.75, `memory: a picture and its tag sit side by side ${Math.round(adj / tot * 100)}% of the time (not always, not never)`);
for (let s = 0; s < 600; s++) { const p = new Array([2, 3, 9][s % 3]).fill(0), a = C.order(p, rnd, null), b = C.order(p, rnd, a); if (J(a) === J(b) || J(a.slice().sort((x, y) => x - y)) !== J(b.slice().sort((x, y) => x - y))) { is(false, 'order() repeated the previous pass'); break; } }
PASS++;

/* 9 — strings and the manifest */
const ACT = fs.readFileSync(path.join(MT, 'name-tag-activity.js'), 'utf8');
const sb = ACT.slice(ACT.indexOf('/*STRINGS-BEGIN*/'), ACT.indexOf('/*STRINGS-END*/'));
const STR = {}; sb.replace(/^\s*(\w+):\s*\{(.*)\},?\s*$/gm, (m, k, body) => { STR[k] = {}; body.replace(/(\w\w):'((?:[^'\\]|\\.)*)'/g, (mm, l, v) => { STR[k][l] = v; }); });
is(Object.keys(STR).length >= 35, `strings parsed (${Object.keys(STR).length})`);
for (const [k, v] of Object.entries(STR)) {
  is(LOCS.every(l => v[l]), `string ${k}: all 11 locales`);
  const ph = (s) => (s.match(/\{\w+\}/g) || []).sort().join();
  is(LOCS.every(l => !v[l] || ph(v[l]) === ph(v.en)), `string ${k}: every locale has en's placeholders`);
  is(!LOCS.some(l => /\b(free|gratis|gratuit|kostenlos|grátis|ilmai)/i.test(v[l] || '')), `string ${k}: no "free"`);
}
const HINTS = new Set(); for (const loc of LOCS) for (const lv of ['read', 'family', 'syllables', 'memory']) for (const r of C.rounds(loc, lv, 'close')) {
  const st = C.newState(r, {}); if (lv === 'memory') { C.flip(st, 0); C.flip(st, 4); HINTS.add(C.hint(st)); continue; }
  HINTS.add((C.check(st), C.hint(st)));
  if (lv === 'syllables') { r.tag.parts.forEach((_, i) => C.join(st, i)); }
  for (let f = 1; f < 4; f++) { const s2 = JSON.parse(JSON.stringify(st)); s2.r = r; C.hang(s2, 0, f); C.check(s2); HINTS.add(C.hint(s2)); C.hang(s2, 0, f === 1 ? 2 : 1); C.check(s2); HINTS.add(C.hint(s2)); }
}
HINTS.add('hintTray'); HINTS.add('hintJoin'); HINTS.add('hintFamily');
for (const h of HINTS) if (h) is(STR[h], `hint ${h} is authored`);
for (const k of Object.keys(STR).filter(k => /^hint/.test(k))) is(HINTS.has(k), `string ${k} is a hint the core can return`);
const MAN = JSON.parse(fs.readFileSync(path.join(MT, 'name-tag-activities.json'), 'utf8'));
is(MAN.length === 1 && MAN[0].id === 'choice-board.read-cvc-word.rf-k-3' && MAN[0].tool === 'name-tag-activity', 'manifest: the one row, id kept, tool repointed');
const row = MAN[0];
for (const loc of LOCS) {
  is(J(Object.keys(row.params.byLocale[loc] || {})) === J(C.levels(loc)), `manifest ${loc}: levels mirror the core`);
  for (const lv of C.levels(loc)) is(J(row.params.byLocale[loc][lv]) === J(C.rounds(loc, lv, 'close').map(r => r.id)), `manifest ${loc} ${lv}: round ids mirror the core`);
  is(/^[a-z0-9-]+$/.test(row.slug[loc] || '') && row.page_title[loc] && row.page_intro[loc], `manifest ${loc}: url-safe slug, title, intro`);
  is(!/\b(free|gratis|gratuit|kostenlos|grátis|ilmai)/i.test(row.page_intro[loc] || ''), `manifest ${loc}: no "free" in the intro`);
}
const FROZEN_AT = '05a10072';
try {
  const old = JSON.parse(cp.execSync(`git show ${FROZEN_AT}:"mini tools/choice-board-activities.json"`, { cwd: ROOT, maxBuffer: 1 << 26 }).toString()).find(x => x.id === row.id);
  for (const loc of ['en', 'de', 'es', 'pt', 'it', 'nl']) is(row.slug[loc] === old.slug[loc] && row.page_title[loc] === old.page_title[loc] && row.page_intro[loc] === old.page_intro[loc], `manifest ${loc}: slug / title / intro frozen`);
  is(J(row.alignment && Object.values(row.alignment)) === J(Object.values(old.alignment)), 'manifest: alignment unchanged');
  const now = JSON.parse(fs.readFileSync(path.join(MT, 'choice-board-activities.json'), 'utf8'));
  const was = JSON.parse(cp.execSync(`git show ${FROZEN_AT}:"mini tools/choice-board-activities.json"`, { cwd: ROOT, maxBuffer: 1 << 26 }).toString());
  is(now.length === was.length - 1 && !now.some(x => x.id === row.id) && JSON.stringify(now) === JSON.stringify(was.filter(x => x.id !== row.id)), 'choice-board-activities.json: only this row removed');
} catch (e) { is(false, 'frozen metadata from git: ' + e.message); }

console.log(`verify-name-tag-core: ${PASS} pass, ${FAIL} fail`);
process.exit(FAIL ? 1 : 0);
