#!/usr/bin/env node
/* =====================================================================
   verify-mirror-chart-core.js — the gate for ACTIVITY #130, The Mirror
   Chart (Word Doctor's Clinic, L.1.2.e; all 11 locales). Its OWN ground
   truth, written here independently of the core and its index:
     · its own scan of the picture labels (mini tools/pictures/*.json) with
       its own list of what the mirror may never show (states and verbs:
       emotions, weather, activities, colors, shapes; the tree theme; the
       pictures that read as something else: fruits/cherry, fruits/plum,
       both peaches, kitchen tools/pan, around the house/rug) — so "a
       picture word or fog" is decided twice for every string a round can
       spell;
     · its own copy of each round's right spelling (the boxes joined, the
       singular plus its ending);
     · its own rule: a German word heals only with its capital.
   It asserts:
     (a) every patient and every picture the rounds can show exists (exact
         case, colour theme) and is not on the never-show list; 12 / 12 /
         8 / 8 rounds per locale; the right tile first in the data; no
         wrong tile spells the patient; at least ten level-1 rounds per
         locale have a wrong tile that shows another picture;
     (b) the model: the right spelling heals and nothing else does; every
         tile's mirror result equals the own scan (another picture, or
         fog); a folded accent never heals; the German lower-case start is
         the capital miss; the plural's singular shows one picture (the
         count miss); empty Check is a hint without a miss; misty from miss
         2 marks the wrong box; level 2's helps, bank and keys;
     (c) the plan: a fresh order; the right tile in every tray slot
         equally often; the bots "always the first tile", "always a single
         letter", "always the longest tile" stay within their caps;
     (d) strings ×11, prose quotes, the manifest row.
   Usage: node scripts/verify-mirror-chart-core.js   (env MC_CORE_DIR / MC_ACT_DIR for the mutation run)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm');
const REPO = path.join(__dirname, '..'), MT = path.join(REPO, 'mini tools'), IMG = path.join(REPO, 'image-library-webp', 'themes'), PIC = path.join(MT, 'pictures');
const CORE_DIR = process.env.MC_CORE_DIR || MT, ACT_DIR = process.env.MC_ACT_DIR || CORE_DIR;
if (CORE_DIR !== MT && !fs.existsSync(path.join(CORE_DIR, 'mirror-chart-index.js'))) fs.copyFileSync(path.join(MT, 'mirror-chart-index.js'), path.join(CORE_DIR, 'mirror-chart-index.js'));
const C = require(path.join(CORE_DIR, 'mirror-chart-core.js'));
const ACT = (() => { const ctx = { window: {}, MirrorChartCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(ACT_DIR, 'mirror-chart-activity.js'), 'utf8') + '\n;this.__A = window.MirrorChartActivity;', ctx); return ctx.__A; })();
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL < 80) console.error('  FAIL: ' + m); } };
const ALL = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const BW = /(?:^|\s)(bw|sw|bn|nb|zw|sh|pb|mv|sv)(\s+\d+)?$/i;

/* ---------------- the own tables ---------------- */
const NEVER_DIRS = ['emotions', 'weather', 'activities', 'colors', 'shapes', 'tree'];
const NEVER = ['fruits/cherry', 'fruits/plum', 'fruits/peach', 'At the Supermarket/peach', 'kitchen tools/pan', 'around the house/rug'];
const OWN = {}; ALL.forEach((l) => { OWN[l] = new Set(); });
for (const f of fs.readdirSync(PIC).filter((f) => f.endsWith('.json') && f[0] !== '_')) {
  const j = JSON.parse(fs.readFileSync(path.join(PIC, f), 'utf8'));
  if (NEVER_DIRS.includes(j.dir) || BW.test(j.dir)) continue;
  for (const k of Object.keys(j.nouns)) { if (NEVER.includes(j.dir + '/' + k)) continue; if (!fs.existsSync(path.join(IMG, j.dir, k + '@2x.webp'))) continue; for (const l of ALL) { const lab = j.nouns[k].labels[l]; if (lab) [lab[0], lab[1]].forEach((w) => { if (w && !/[\s'’.-]/.test(w)) OWN[l].add(w.toLowerCase()); }); } }
}
const ownPicture = (l, s) => OWN[l].has(String(s).toLowerCase());
const picOk = (p) => { const d = p.slice(0, p.lastIndexOf('/')), f = p.slice(p.lastIndexOf('/') + 1); return fs.readdirSync(IMG).includes(d) && fs.readdirSync(path.join(IMG, d)).includes(f + '@2x.webp') && !BW.test(d) && !NEVER_DIRS.includes(d) && !NEVER.includes(p); };
/* the own right spelling */
const rightOf = (l, lvl, r) => { const D = C.DATA[l]; if (lvl === '1') return D.l1[r].boxes.join(''); if (lvl === '3') return D.l3.rounds[r].boxes.join(''); if (lvl === '2') return D.l2[r]; const x = D.l4[r]; return x.sg.slice(0, x.sg.length - x.tiles[0].drop) + x.tiles[0].t; };
const fold = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '');
const fresh = (l, lvl, r, help) => C.newState(l, lvl, r, null, help);

/* ---------------- (a) the data ---------------- */
for (const l of ALL) {
  is(C.rounds('1').length === 12 && C.rounds('2').length === 12 && C.rounds('3').length === 8 && C.rounds('4').length === 8, `${l}: 12 / 12 / 8 / 8 rounds`);
  let shows = 0;
  for (const lvl of ['1', '3', '4']) for (const r of C.rounds(lvl)) {
    const rd = C.round(l, lvl, r), tag = `${l} L${lvl}.${r + 1}`, right = rightOf(l, lvl, r);
    is(rd.target === right, `${tag}: the right spelling «${right}»`);
    if (lvl !== '3') is(rd.pic && picOk(rd.pic) && ownPicture(l, right), `${tag}: the patient «${right}» is a picture word (${rd.pic})`);
    else if (rd.pic) is(picOk(rd.pic) && ownPicture(l, right), `${tag}: the rule word «${right}» shows its picture`);
    else is(!ownPicture(l, right), `${tag}: the word-only «${right}» has no picture`);
    let other = false;
    rd.tiles.forEach((t, i) => {
      const st = fresh(l, lvl, r); C.place(st, i); const s = C.spelled(st), m = C.look(st);
      if (i === 0) return;
      is(s.toLowerCase() !== right.toLowerCase(), `${tag}: the wrong tile ${t} does not spell the patient`);
      if (m.pic) is(picOk(m.pic), `${tag}: «${s}» shows ${m.pic}, a picture the mirror may show`);
      if (m.kind === 'other' || m.kind === 'count') other = true;
    });
    if (lvl === '1' && other) shows++;
  }
  is(shows >= 10, `${l}: ${shows} of 12 level-1 rounds have a wrong tile that shows another picture`);
  const none = C.rounds('4').filter((r) => { const rd = C.round(l, '4', r), i = rd.tiles.indexOf(''); if (i < 0) return false; const st = fresh(l, '4', r); C.place(st, i); return C.spelled(st) === rd.sg && C.look(st).kind === 'count'; }).length;
  is(none >= 2, `${l}: ${none} level-4 rounds carry the no-ending tile, which spells the singular (the mirror shows one)`);
  for (const r of C.rounds('2')) { const rd = C.round(l, '2', r); is(rd.pic && picOk(rd.pic) && ownPicture(l, rd.target), `${l} L2.${r + 1}: «${rd.target}» is a picture word`); is(rd.target.split('').every((c) => rd.keys.includes(c.toLowerCase())), `${l} L2.${r + 1}: every letter of «${rd.target}» is on the keyboard`); }
}
/* ---------------- (b) the model ---------------- */
for (const l of ALL) {
  for (const lvl of ['1', '3', '4']) for (const r of C.rounds(lvl)) {
    const rd = C.round(l, lvl, r), tag = `${l} L${lvl}.${r + 1}`, right = rightOf(l, lvl, r);
    let st = fresh(l, lvl, r); is(C.check(st).result === 'empty' && st.misses === 0 && C.hint(st) === 'hintEmpty', `${tag}: Check with an empty box → the hint, no miss`);
    rd.tiles.forEach((t, i) => {
      st = fresh(l, lvl, r); C.place(st, i); const s = C.spelled(st), res = C.check(st);
      if (i === 0) { is(res.result === 'ok' && st.done, `${tag}: «${s}» heals`); return; }
      const want = lvl === '4' && s.toLowerCase() === rd.sg.toLowerCase() ? 'count' : ownPicture(l, s) ? 'other' : 'fog';
      is(res.result === 'miss' && res.reason === want, `${tag}: «${s}» → ${want} (core ${res.reason})`);
    });
    /* miss 2 mists the sick box, a move clears it */
    st = fresh(l, lvl, r); C.place(st, 1); C.check(st); is(C.misty(st) == null && C.hint(st) !== 'missGlow', `${tag}: no mist after one miss`);
    C.check(st); is(st.misses === 2 && C.hint(st) === 'missGlow' && JSON.stringify(C.misty(st)) === JSON.stringify([lvl === '4' ? 'end' : rd.sick]), `${tag}: miss 2 mists the sick box`);
    C.place(st, 0); is(C.misty(st) == null && C.hint(st) == null, `${tag}: a move clears the mist`);
    if (lvl === '4') { const s1 = fresh(l, lvl, r); is(C.lookUp(l, rd.sg) && C.lookUp(l, rd.sg).number !== 1, `${tag}: the singular «${rd.sg}» shows one picture`); }
  }
  /* level 2: every help */
  for (const r of C.rounds('2')) for (const h of C.HELPS) {
    const tag = `${l} L2.${r + 1} ${h}`, rd = C.round(l, '2', r, null, h), w = rd.target, P = C.helpParts(h);
    let st = fresh(l, '2', r, h);
    is(st.given === (P.first ? 1 : 0) && (!P.first || st.letters[0] === w[0]), `${tag}: ${P.first ? 'the first letter is given' : 'no letter is given'}`);
    is(C.check(st).result === 'empty' && st.misses === 0, `${tag}: Check with nothing written → the hint, no miss`);
    if (P.bank) {
      is(rd.bank.length === 4 && rd.bank[0] === w && new Set(rd.bank).size === 4, `${tag}: a bank of four with the word`);
      if (P.boxes) is(rd.bank.every((b) => b.length === w.length), `${tag}: with boxes, every bank word fits the boxes`);
      st = fresh(l, '2', r, h); C.bank(st, 0); is(C.check(st).result === 'ok', `${tag}: the word from the bank heals`);
      st = fresh(l, '2', r, h); C.bank(st, 1); const res = C.check(st), b1 = C.spelled(st); is(res.result === 'miss' && res.reason === (ownPicture(l, b1) ? 'other' : 'fog'), `${tag}: «${b1}» from the bank → ${res.reason}`);
    } else {
      st = fresh(l, '2', r, h); for (let i = st.given; i < w.length; i++) C.type(st, i === 0 && l === 'de' ? w[i] : w[i]); is(C.check(st).result === 'ok', `${tag}: «${w}» typed heals`);
      st = fresh(l, '2', r, h); for (let i = st.given; i < w.length; i++) C.type(st, i === w.length - 1 ? (w[i].toLowerCase() === 'q' ? 'z' : 'q') : w[i]); is(C.check(st).result === 'miss', `${tag}: one letter wrong does not heal`);
      if (fold(w) !== w) { st = fresh(l, '2', r, h); const f = fold(w); for (let i = st.given; i < f.length; i++) C.type(st, f[i]); is(C.check(st).result !== 'ok', `${tag}: «${f}» without its accent does not heal`); }
      if (l === 'de' && !P.first) { st = fresh(l, '2', r, h); const lw = w[0].toLowerCase() + w.slice(1); for (const c of lw) C.type(st, c); const res = C.check(st); is(res.reason === 'capital' && C.hint(st) === 'missCapital', `${tag}: «${lw}» in lower case → the capital hint`); }
      if (!P.boxes) { st = fresh(l, '2', r, h); for (let i = st.given; i < w.length; i++) C.type(st, w[i]); C.type(st, 'e'); is(C.check(st).result === 'miss', `${tag}: a letter too many does not heal`); }
    }
  }
}
/* ---------------- (c) the plan and the bots ---------------- */
for (const l of ALL) for (const lvl of ['1', '3', '4']) {
  const size = lvl === '3' ? 2 : 3, n = C.rounds(lvl).length; let rep = 0, prev = null, bad = 0;
  for (let k = 0; k < 100; k++) {
    const P = C.plan(l, lvl, 'all', Math.random, prev); if (prev && P.order.join() === prev.join()) rep++; prev = P.order;
    const slot = new Array(size).fill(0); P.order.forEach((r) => { slot[P.trays[r].indexOf(0)]++; }); if (Math.max(...slot) - Math.min(...slot) > 1) bad++;
  }
  is(rep === 0 && bad === 0, `${l} L${lvl}: 100 plans — a fresh order, the right tile in every slot equally often (${rep}/${bad})`);
  if (lvl === '1') {
    let single = 0, longest = 0;
    for (const r of C.rounds('1')) { const rd = C.round(l, '1', r); const len = rd.tiles.map((t) => t.length); if (len[0] === Math.min(...len) && len.filter((x) => x === len[0]).length === 1) single++; if (len[0] === Math.max(...len) && len.filter((x) => x === len[0]).length === 1) longest++; }
    is(single <= 6 && longest <= 6, `${l} L1: "always the shortest tile" ${single}/12, "always the longest tile" ${longest}/12`);
  }
}
/* ---------------- (d) strings, prose, manifest ---------------- */
const SRC = fs.readFileSync(path.join(ACT_DIR, 'mirror-chart-activity.js'), 'utf8'), CSRC = fs.readFileSync(path.join(CORE_DIR, 'mirror-chart-core.js'), 'utf8');
const body = SRC.replace(/\/\*STRINGS-BEGIN\*\/[\s\S]*\/\*STRINGS-END\*\//, '');
is(ACT && ACT.strings && Object.keys(ACT.strings).length >= 38, 'the activity strings load');
for (const k of Object.keys((ACT && ACT.strings) || {})) {
  for (const loc of ALL) {
    const v = ACT.strings[k][loc]; is(typeof v === 'string' && v.length > 0, `${k}.${loc} authored`);
    if (/^hint|^miss|^ok|^t\d/.test(k)) is(!/\d/.test(v), `${k}.${loc}: no digit in a hint`);
    is(!/(?<!\p{L})(free|gratis|kostenlos|gratuit|ilmai\p{L}*|gratuito|grátis)(?!\p{L})/iu.test(v), `${k}.${loc}: never "free"`);
    if (loc === 'fr') is(!/ [:!?;»]/.test(v) && !/'/.test(v), `${k}.fr: narrow spaces and ’`);
    if (loc === 'it') is(!/'/.test(v), `${k}.it: ’`);
  }
  is(['title', 'instruction', 'instrBubble', 'okBubble'].indexOf(k) >= 0 || /^[tl]\d$|^help[A-Z]/.test(k) || CSRC.indexOf("'" + k + "'") >= 0 || body.indexOf("'" + k + "'") >= 0, `string ${k} is asked for`);
}
const QUOTE = { en: /"([^"]+)"/g, de: /„([^“]+)“/g, fr: /« ?([^»]+?) ?»/g, es: /«([^»]+)»/g, pt: /“([^”]+)”/g, it: /«([^»]+)»/g, nl: /‘([^‘’]+)’/g, sv: /”([^”]+)”/g, da: /”([^”]+)”/g, no: /«([^»]+)»/g, fi: /”([^”]+)”/g };
const ID = 'word-clinic.spell-by-ear.l-1-2-e';
for (const loc of ALL) {
  const pr = JSON.parse(fs.readFileSync(path.join(REPO, 'frontend', 'messages', 'activity-content', loc + '.json'), 'utf8')).prose[ID];
  is(!!pr && ['about', 'practices', 'howToPlay', 'learningGoals'].every((k) => Array.isArray(pr[k]) && pr[k].length >= 3), `${loc}: the prose entry`);
  const can = new Set();
  for (const lvl of ['1', '3', '4']) for (const r of C.rounds(lvl)) { const rd = C.round(loc, lvl, r); rd.tiles.forEach((_, i) => { const st = fresh(loc, lvl, r); C.place(st, i); can.add(C.spelled(st)); }); }
  C.rounds('2').forEach((r) => can.add(C.round(loc, '2', r).target));
  const text = pr ? Object.values(pr).flat().join(' ') : '', qs = [...text.matchAll(QUOTE[loc])].map((m) => m[1].replace(/[  ]/g, ' ').trim());
  qs.forEach((q) => is(can.has(q), `${loc}: the prose quote «${q}» is a word the rounds spell`));
  is(qs.length >= 4, `${loc}: the prose quotes the rounds (${qs.length})`);
  if (loc !== 'en') is(!/common core|L\.1\.2/i.test(text), `${loc}: no Common Core in the prose`);
}
const row = JSON.parse(fs.readFileSync(path.join(MT, 'word-clinic-activities.json'), 'utf8')).find((x) => x.id === ID);
is(row && row.tool === 'mirror-chart-activity', 'the manifest row points at the mirror chart');
is(row && Object.keys(row.slug).length === 11 && Object.keys(row.page_title).length === 11 && Object.keys(row.page_intro).length === 11, 'the row ships in all 11 locales');
is(row && row.page_title.en === "Word Doctor's Clinic — Heal the Sick Sound", 'the en metadata is frozen');
is(row && JSON.stringify(row.params) === JSON.stringify({ level: ['1', '2', '3', '4'], help: ['all', 'boxfirst', 'boxbank', 'first', 'bank', 'line'], rounds: { '1': 12, '2': 12, '3': 8, '4': 8 } }), "the row's params mirror the core");
console.log(`verify-mirror-chart-core: ${PASS} pass, ${FAIL} fail`);
process.exit(FAIL ? 1 : 0);
