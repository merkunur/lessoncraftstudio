#!/usr/bin/env node
/* =====================================================================
   verify-harbor-machines-core.js — the logic gate of ACTIVITY #174, "The
   Harbor Post" (RI.2.6) → THE THREE HARBOR MACHINES.
   Its own ground truth: the purpose of a note comes from its id (i = to
   tell facts, e = to tell a story, s = to show how) — never read off the
   data's own `p`; its own majority rule (a machine runs when MORE than half
   of the sentences are its kind); a frozen copy of the nine notes the old
   activity shipped in 7 locales, and of the old signs.
   Checks, for every locale and level: exactly one machine runs, and it is
   the id's purpose; no 50/50 note; the kept notes byte-equal; 4/4/4 per
   level; two-machine mode keeps 4/4 facts and stories; the cue-breakers
   break their cue IN EACH LOCALE; the surface-cue bots stay far from a
   level (measured ceilings); the hand (post, miss, help, done), the
   reshuffle (no repeat, never three of a purpose in a row), the strings
   (11 locales, placeholders, fr spacing, no dead key, no Common Core
   outside en), the prose, the manifest, the html, the pictures.
   Usage: node scripts/verify-harbor-machines-core.js [--measure]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..');
const MT = path.join(ROOT, 'mini tools');
/* the mutation harness hands in altered copies through these */
const C = require(process.env.HM_CORE || path.join(MT, 'harbor-machines-core.js'));
const D = require(process.env.HM_DATA || path.join(MT, 'harbor-machines-data.js'));
const ACT_PATH = process.env.HM_ACT || path.join(MT, 'author-purpose-activity.js');
const SRC = fs.readFileSync(ACT_PATH, 'utf8');
const MEASURE = process.argv.includes('--measure');
let pass = 0, fail = 0;
const ok = (c, m) => { if (c) pass++; else { fail++; console.log('  FAIL ' + m); } };

const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const PURPOSE = { i: 'inform', e: 'entertain', s: 'instruct' };
const KIND = { inform: 'fact', entertain: 'story', instruct: 'step' };
const L1 = ['i1', 'i2', 'i7', 'i8', 'e1', 'e2', 'e7', 'e8', 's2', 's3', 's7', 's8'];
const L2 = ['i3', 'i4', 'i5', 'i6', 'e3', 'e4', 'e5', 'e6', 's1', 's4', 's5', 's6'];
const KEPT = ['i1', 'i2', 'i3', 'e1', 'e2', 'e3', 's1', 's2', 's3'];
/* the frozen copy of what the old activity shipped (2026-10-31): the notes of the 7 kept locales and their signs */
const FROZEN = JSON.parse(fs.readFileSync(path.join(__dirname, 'verify-harbor-machines-kept.json'), 'utf8'));
/* sequence words per locale (whole words) — the "first/then" surface cue */
const SEQ = { en: 'first|next|then|last', de: 'zuerst|dann|danach|zuletzt', fr: 'd’abord|ensuite|puis|enfin', es: 'primero|luego|después|al final', pt: 'primeiro|depois|então|no final', it: 'prima|poi|infine|alla fine', nl: 'eerst|daarna|toen|tot slot', sv: 'först|sedan|till sist', da: 'først|så|til sidst', no: 'først|så|til slutt', fi: 'ensin|sitten|lopuksi' };
const seqRe = (l) => new RegExp('(?<!\\p{L})(' + SEQ[l] + ')(?!\\p{L})', 'iu');
const bang = (t) => /[!¡]/.test(t);
const text = (n) => n.s.map((x) => x.t).join(' ');
/* my own rule: a machine runs when more than half the sentences are its kind */
const runs = (n, m) => n.s.filter((x) => x.r === KIND[m]).length * 2 > n.s.length;

/* ---------------- A. the data ---------------- */
ok(JSON.stringify(Object.keys(D).sort()) === JSON.stringify(LOCALES.slice().sort()), 'A: the data holds exactly the 11 locales');
for (const l of LOCALES) {
  const L = D[l];
  ok(L && L.labels && ['inform', 'entertain', 'instruct'].every((m) => typeof L.labels[m] === 'string' && L.labels[m].trim()), `A[${l}]: three signs`);
  ok(Object.keys(L.notes).length === 24, `A[${l}]: 24 notes`);
  for (const id of L1.concat(L2)) {
    const n = L.notes[id];
    if (!n) { ok(false, `A[${l}] ${id}: missing`); continue; }
    ok(n.p === PURPOSE[id[0]], `A[${l}] ${id}: purpose matches the id`);
    ok(L1.includes(id) ? n.s.length === 2 : KEPT.includes(id) ? n.s.length === 2 || n.s.length === 3 : n.s.length === 3, `A[${l}] ${id}: ${L1.includes(id) ? 'two' : KEPT.includes(id) ? 'two or three' : 'three'} sentences (${n.s.length})`);
    for (const x of n.s) {
      ok(['fact', 'story', 'step', 'none'].includes(x.r), `A[${l}] ${id}: role ${x.r}`);
      ok(/[.!?…]$/.test(x.t) && x.t === x.t.trim() && x.t.length >= 8, `A[${l}] ${id}: a whole sentence "${x.t}"`);
    }
    ok(n.s.filter((x) => x.r === 'none').every((x) => n.s.indexOf(x) === 0), `A[${l}] ${id}: a hook (none) only opens a note`);
    ok(typeof n.w === 'string' && n.w.length > 10 && !/[{}]/.test(n.w) && /[.!]$/.test(n.w), `A[${l}] ${id}: a success line`);
    /* exactly one machine runs, and it is the id's purpose; never a 50/50 */
    const ran = ['inform', 'entertain', 'instruct'].filter((m) => runs(n, m));
    ok(ran.length === 1 && ran[0] === PURPOSE[id[0]], `A[${l}] ${id}: exactly the ${PURPOSE[id[0]]} machine runs (${ran.join(',') || 'none'})`);
    ok(C.mainMachine(n) === PURPOSE[id[0]], `A[${l}] ${id}: the core agrees`);
    for (const m of ['inform', 'entertain', 'instruct']) { const k = n.s.filter((x) => x.r === KIND[m]).length; ok(k * 2 !== n.s.length, `A[${l}] ${id}: no 50/50 for ${m}`); }
    /* Level 1 notes are pure; Level 2 has at most one odd sentence */
    const odd = n.s.filter((x) => x.r !== KIND[PURPOSE[id[0]]]).length;
    ok(L1.includes(id) ? odd === 0 : odd <= 1, `A[${l}] ${id}: ${odd} odd sentence(s)`);
  }
  /* the same success line never repeats; the four Level-2 "mostly" notes carry one odd sentence each, at the start or the end */
  const ws = L1.concat(L2).map((id) => L.notes[id].w);
  ok(new Set(ws).size === 24, `A[${l}]: 24 different success lines`);
  for (const id of ['i5', 'e6', 's5', 's6']) { const mo = C.mostly(L.notes[id]); ok(mo && (mo.pos === 'first' || mo.pos === 'last'), `A[${l}] ${id}: a "mostly" note with its extra at the start or the end`); }
  for (const id of L1) ok(C.mostly(L.notes[id]) === null, `A[${l}] ${id}: no "mostly" line on a pure note`);
}
/* the kept notes and signs, byte for byte */
for (const l of Object.keys(FROZEN.notes)) {
  for (const id of KEPT) ok(text(D[l].notes[id]) === FROZEN.notes[l][id], `B[${l}] ${id}: the kept note is unchanged`);
  for (const m of ['inform', 'entertain', 'instruct']) ok(D[l].labels[m] === FROZEN.labels[l][m], `B[${l}]: the kept sign for ${m}`);
}
ok(Object.keys(FROZEN.notes).length === 7, 'B: seven kept locales');

/* ---------------- C. the levels ---------------- */
for (const l of LOCALES) for (const lv of C.LEVELS) {
  const pool = C.rounds(l, lv, 'three', D), two = C.rounds(l, lv, 'two', D);
  ok(pool.length === 12 && C.passSize(lv, 'three') === 12, `C[${l} ${lv}]: 12 notes`);
  ok(JSON.stringify(pool.map((n) => n.id)) === JSON.stringify(lv === 'first' ? L1 : L2), `C[${l} ${lv}]: the level's own notes`);
  const by = (p) => pool.filter((n) => n.p === p).length;
  ok(by('inform') === 4 && by('entertain') === 4 && by('instruct') === 4, `C[${l} ${lv}]: 4/4/4`);
  ok(two.length === 8 && C.passSize(lv, 'two') === 8 && two.every((n) => n.p !== 'instruct'), `C[${l} ${lv}]: two machines = 4 facts + 4 stories, no crane`);
  ok(lv === 'first' ? pool.filter((n) => KEPT.includes(n.id)).length === 6 : pool.filter((n) => KEPT.includes(n.id)).length === 3, `C[${l} ${lv}]: kept notes ${lv === 'first' ? 6 : 3}`);
}
ok(JSON.stringify(C.machineList('two')) === '["inform","entertain"]' && JSON.stringify(C.machineList('three')) === '["inform","entertain","instruct"]', 'C: the machine lists');

/* ---------------- D. the cue-breakers break their cue in every locale ---------------- */
for (const l of LOCALES) {
  const N = D[l].notes, re = seqRe(l);
  ok(bang(text(N.i7)), `D[${l}]: i7 is a facts note with an exclamation mark`);
  ok(re.test(text(N.i8)), `D[${l}]: i8 is a facts note with a sequence word`);
  ok(!bang(text(N.e7)) && (l === 'de' || !/\p{Lu}/u.test(text(N.e7).replace(/(^|[.!?]\s+)\p{Lu}/gu, ''))), `D[${l}]: e7 is a story with no "!" and no name (de: every noun is capitalised, so only the "!" is checked)`);
  ok(re.test(N.e8.s[0].t), `D[${l}]: e8 is a story that opens with a sequence word`);
  ok(!re.test(text(N.s7)), `D[${l}]: s7 is a how-to with no sequence word`);
  ok(bang(text(N.s8)), `D[${l}]: s8 is a how-to with an exclamation mark`);
  ok(bang(text(N.i4)), `D[${l}]: i4 is a facts note with an exclamation mark`);
  ok(re.test(text(N.i6)) && N.i6.s.every((x) => x.r === 'fact'), `D[${l}]: i6 has sequence words and tells no one to do anything`);
  ok(re.test(N.e4.s[0].t), `D[${l}]: e4 is a story that opens with a sequence word`);
  ok(!bang(text(N.e5)), `D[${l}]: e5 is a story with no "!"`);
  ok(!re.test(text(N.s4)), `D[${l}]: s4 is a how-to with no sequence word`);
  ok(N.s5.s[0].t.endsWith('?'), `D[${l}]: s5 opens with a question`);
}

/* ---------------- E. the surface-cue bots (measured; ceilings may only shrink) ---------------- */
const CEIL = { cue: 3, lookup: 9, bangPrec: 0.5, seqPrec: 0.5 };
for (const l of LOCALES) for (const lv of C.LEVELS) {
  const pool = C.rounds(l, lv, 'three', D), re = seqRe(l);
  let cue = 0, bf = 0, br = 0, sf = 0, sr = 0; const cell = {};
  for (const n of pool) {
    const t = text(n), g = bang(t) ? 'entertain' : re.test(t) ? 'instruct' : 'inform';
    if (g === n.p) cue++;
    if (bang(t)) { bf++; if (n.p === 'entertain') br++; }
    if (re.test(t)) { sf++; if (n.p === 'instruct') sr++; }
    const k = (bang(t) ? 'B' : 'b') + (re.test(t) ? 'S' : 's') + n.s.length; (cell[k] = cell[k] || {})[n.p] = (cell[k][n.p] || 0) + 1;
  }
  let best = 0; for (const k in cell) best += Math.max.apply(null, Object.values(cell[k]));
  if (MEASURE) console.log(`  ${l} ${lv}: cue ${cue}/12, best lookup ${best}/12, "!"→story ${br}/${bf}, seq→how-to ${sr}/${sf}`);
  ok(cue <= CEIL.cue, `E[${l} ${lv}]: the old cue rule sorts ${cue}/12 (≤ ${CEIL.cue})`);
  ok(best <= CEIL.lookup, `E[${l} ${lv}]: the best "!" × sequence × length lookup sorts ${best}/12 (≤ ${CEIL.lookup})`);
  ok(bf < 3 || br / bf <= CEIL.bangPrec, `E[${l} ${lv}]: "!" means story ${br}/${bf}`);
  ok(sf < 3 || sr / sf <= CEIL.seqPrec, `E[${l} ${lv}]: a sequence word means how-to ${sr}/${sf}`);
}

/* ---------------- F. the read and the hand ---------------- */
{
  const n = D.en.notes.i5, r = C.read(n, 'inform'), rc = C.read(n, 'instruct'), re = C.read(n, 'entertain');
  ok(r.runs && JSON.stringify(r.powered) === '[0,1]' && JSON.stringify(r.fizz) === '[2]', 'F: the snails in the lighthouse: two lamps, the tip fizzes, it runs');
  ok(!rc.runs && JSON.stringify(rc.powered) === '[2]', 'F: the snails in the crane: one crate, it stops');
  ok(!re.runs && re.powered.length === 0, 'F: the snails on the stage: nothing');
  ok(C.partsLit(r) === 3 && C.partsLit(rc) === 1 && C.partsLit(re) === 0, 'F: parts lit 3 / 1 / 0');
  const two = C.read(D.en.notes.i1, 'inform'); ok(two.runs && C.partsLit(two) === 3, 'F: a two-sentence note that runs lights all three parts');
  /* exactly half is NOT more than half — no real note sits there, so a made-up one tests the boundary */
  const half = { s: [{ t: 'a.', r: 'fact' }, { t: 'b.', r: 'story' }] };
  ok(!C.read(half, 'inform').runs && !C.read(half, 'entertain').runs && C.mainMachine(half) === null, 'F: a 1:1 note runs no machine (exactly half is not enough)');
  const four = { s: [{ t: 'a.', r: 'step' }, { t: 'b.', r: 'step' }, { t: 'c.', r: 'fact' }, { t: 'd.', r: 'fact' }] };
  ok(!C.read(four, 'instruct').runs && !C.read(four, 'inform').runs, 'F: a 2:2 note runs no machine');
  ok(C.dotOf({ r: 'fact' }) === 'inform' && C.dotOf({ r: 'story' }) === 'entertain' && C.dotOf({ r: 'step' }) === 'instruct' && C.dotOf({ r: 'none' }) === null, 'F: the shape of each kind');
  const mo = C.mostly(D.en.notes.s5); ok(mo && mo.kind === 'instruct' && mo.pos === 'first', 'F: the birds note is mostly steps, the first sentence is extra');
  let st = C.newState('en', 'mostly', 'three', 2, D);
  ok(st.note.id === 'i5' && !st.done && st.misses === 0, 'F: a fresh round');
  let res = C.post(st, 'instruct');
  ok(res.result === 'miss' && st.misses === 1 && !st.help && C.hint(st, res) === 'hintMiss1', 'F: miss 1 → hintMiss1');
  res = C.post(st, 'entertain');
  ok(res.result === 'miss' && st.misses === 2 && st.help && C.hint(st, res) === 'hintMiss2', 'F: miss 2 → help, hintMiss2');
  res = C.post(st, 'inform');
  ok(res.result === 'ok' && st.done && C.hint(st, res) === null, 'F: the lighthouse runs: done');
  ok(C.post(st, 'inform').result === 'no', 'F: nothing after done');
  st = C.newState('en', 'first', 'two', 0, D);
  ok(C.post(st, 'instruct').result === 'note' && st.misses === 0, 'F: in two-machine mode the crane is not there: no miss');
  ok(C.newState('en', 'first', 'three', 12, D).note.id === C.newState('en', 'first', 'three', 0, D).note.id, 'F: the round index wraps');
  ok(C.locOf('pt-BR') === 'pt' && C.locOf('xx') === 'en' && C.levelOf('zz') === 'first' && C.machinesOf('two') === 'two' && C.machinesOf('?') === 'three', 'F: locale, level and machines fall back');
}

/* ---------------- G. the reshuffle ---------------- */
{
  let seed = 7; const rnd = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
  for (const l of ['en', 'fi']) for (const lv of C.LEVELS) for (const mm of ['three', 'two']) {
    const pool = C.rounds(l, lv, mm, D); let prev = null, okAll = true, three = false, rep = false;
    for (let p = 0; p < 300; p++) {
      const o = C.plan(pool, rnd, prev);
      if (o.slice().sort((a, b) => a - b).join() !== pool.map((_, i) => i).join()) okAll = false;
      if (C.threeInARow(o, pool)) three = true;
      if (prev && prev.join() === o.join()) rep = true;
      prev = o;
    }
    ok(okAll && !three && !rep, `G[${l} ${lv} ${mm}]: 300 passes — permutations, never three of a purpose in a row, never the previous order`);
  }
  /* a generator that always deals the same: the fallback still differs from the previous order and has no three in a row */
  const pool = C.rounds('en', 'first', 'three', D), stuck = () => 0.999999;
  const a = C.plan(pool, stuck, null), b = C.plan(pool, stuck, a);
  ok(a.join() !== b.join() && !C.threeInARow(b, pool) && b.slice().sort((x, y) => x - y).join() === pool.map((_, i) => i).join(), 'G: a stuck generator still never repeats the previous order');
  /* the same seeded generator twice deals the same shuffle: the second plan must still differ from the first */
  const gen = (s0) => { let x = s0; return () => { x = (x * 48271) % 2147483647; return x / 2147483647; }; };
  let seedOk = 0; for (let s0 = 1; s0 < 400 && !seedOk; s0++) { const o = C.plan(pool, gen(s0), null); const raw = (function () { const r = gen(s0), a = pool.map((_, i) => i); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); const t = a[i]; a[i] = a[j]; a[j] = t; } return a; })(); if (o.join() === raw.join()) seedOk = s0; }
  ok(seedOk > 0, 'G: found a seed whose first shuffle is already a valid order');
  const first = C.plan(pool, gen(seedOk), null), again = C.plan(pool, gen(seedOk), first);
  ok(first.join() !== again.join() && !C.threeInARow(again, pool), 'G: dealt the identical shuffle twice, the second pass is still a new order');
  ok(C.threeInARow([0, 1, 2], [{ p: 'a' }, { p: 'a' }, { p: 'a' }]) && !C.threeInARow([0, 1, 2], [{ p: 'a' }, { p: 'b' }, { p: 'a' }]), 'G: the three-in-a-row test itself');
}

/* ---------------- H. the strings ---------------- */
const m = SRC.match(/\/\*STRINGS-BEGIN\*\/strings: (\{[\s\S]*?\}),\/\*STRINGS-END\*\//);
const S = m ? (new Function('return ' + m[1]))() : {};
const KEYS = Object.keys(S);
ok(KEYS.length === 28, `H: 28 string keys (${KEYS.length})`);
for (const k of KEYS) {
  ok(JSON.stringify(Object.keys(S[k]).sort()) === JSON.stringify(LOCALES.slice().sort()), `H: ${k} in all 11 locales`);
  const ph = (s) => (String(s).match(/\{\w+\}/g) || []).sort().join();
  for (const l of LOCALES) {
    ok(typeof S[k][l] === 'string' && S[k][l].trim().length > 0, `H: ${k}.${l} not empty`);
    ok(ph(S[k][l]) === ph(S[k].en), `H: ${k}.${l} keeps the placeholders ${ph(S[k].en)}`);
    if (l !== 'en') ok(!/common core|ccss|RI\.2/i.test(S[k][l]), `H: ${k}.${l} names no Common Core`);
  }
  ok(!/ [!?:;]/.test(S[k].fr), `H: ${k}.fr has no plain space before ! ? : ;`);
}
/* every key is asked for: by the shell (title, instruction, checkBtn, the two bubbles), by the settings, or by name in the activity */
const SHELL = ['title', 'instruction', 'checkBtn', 'instrBubble', 'okBubble'];
const body = SRC.replace(/\/\*STRINGS-BEGIN\*\/[\s\S]*?\/\*STRINGS-END\*\//, '');
for (const k of KEYS) if (!SHELL.includes(k)) ok(new RegExp("'" + k + "'").test(body), `H: ${k} is used`);
ok(/okInform/.test(body) && /okEntertain/.test(body) && /okInstruct/.test(body) && /nInform/.test(body), 'H: the per-machine keys are reached through their maps');
ok(/hintMiss2/.test(body) && /'hintOne' : 'hintNone'/.test(body), 'H: the miss hints split on whether one sentence powered the machine');
ok(/\.replace\(\/ \(\[!\?:;»\]\)\/g, '(\\u202F|\u202F)\$1'\)/.test(SRC), 'H: the note text gets French spacing on display');

/* ---------------- I. prose, manifest, html, pictures ---------------- */
const ID = 'author-purpose.why-wrote.ri-2-6';
for (const l of LOCALES) {
  const P = JSON.parse(fs.readFileSync(path.join(ROOT, 'frontend/messages/activity-content/' + l + '.json'), 'utf8')).prose[ID];
  ok(P && P.about.length === 3 && P.practices.length === 4 && P.howToPlay.length === 3 && P.learningGoals.length === 3, `I[${l}]: prose about/practices/howToPlay/learningGoals`);
  const all = JSON.stringify(P || {});
  if (l === 'en') ok(/Common Core RI\.2\.6/.test(all), 'I[en]: names Common Core RI.2.6');
  else ok(!/common core|ccss|RI\.2\.6/i.test(all), `I[${l}]: no Common Core in the prose`);
  ok(!/\b(free|gratis|kostenlos|gratuit|gratuito|gratuita|ilmai)/i.test(all), `I[${l}]: no price words in the prose`);
  if (l === 'fr') ok(!/ [!?:;]/.test(all.replace(/\\u202f/gi, '\u202F')), 'I[fr]: prose spacing before ! ? : ;');
}
const row = JSON.parse(fs.readFileSync(process.env.HM_MAN || path.join(MT, 'author-purpose-activities.json'), 'utf8'));
ok(row.length === 1 && row[0].id === ID && row[0].tool === 'author-purpose-activity' && row[0].task_template === 'harbor-machines' && JSON.stringify(row[0].params) === '{}', 'I: the manifest row (params {})');
for (const k of ['slug', 'page_title', 'page_intro']) ok(LOCALES.every((l) => row[0][k] && typeof row[0][k][l] === 'string' && row[0][k][l].length > 3), `I: ${k} in 11 locales`);
ok(LOCALES.every((l) => /^[a-z0-9-]+$/.test(row[0].slug[l])) && new Set(LOCALES.map((l) => l + '/' + row[0].slug[l])).size === 11, 'I: url-safe slugs');
ok(row[0].alignment.code === 'RI.2.6' && row[0].alignment.grade === '2', 'I: aligned to RI.2.6, grade 2');
const HTML = fs.readFileSync(path.join(MT, 'author-purpose-activity.html'), 'utf8');
ok(/harbor-machines-data\.js\?v=\d+/.test(HTML) && /harbor-machines-core\.js\?v=\d+/.test(HTML) && /author-purpose-activity\.js\?v=\d+/.test(HTML) && HTML.indexOf('src="/mini-tools/harbor-machines-data') < HTML.indexOf('src="/mini-tools/harbor-machines-core') && HTML.indexOf('src="/mini-tools/harbor-machines-core') < HTML.indexOf('src="/mini-tools/author-purpose-activity.js'), 'I: the html loads data, core, then the activity, each with ?v=');
ok(!/height:\s*100%/.test(HTML), 'I: the html does not pin the root height');
ok(/OK_MS: 500,/.test(SRC), 'I: OK_MS 500');
const pics = (SRC.match(/PICS: \{([^}]*)\}/) || [])[1] || '';
const list = [...pics.matchAll(/'([^']+\/[^']+)'/g)].map((x) => x[1]);
ok(list.length === 4, 'I: four pictures');
for (const p of list) ok(fs.existsSync(path.join(ROOT, 'frontend/public/image-library-webp/themes', p + '@2x.webp')) && !/(^|\s)(bw|sw|bn|nb|zw|sh|pb|mv|sv)(\s+\d+)?\//i.test(p), `I: picture ${p} exists in colour`);

console.log(`verify-harbor-machines-core: ${pass} pass, ${fail} fail`);
process.exit(fail ? 1 : 0);
