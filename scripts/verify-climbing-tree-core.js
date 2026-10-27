#!/usr/bin/env node
/* =====================================================================
   verify-climbing-tree-core.js — the build gate for ACTIVITY #132, The
   Climbing Tree (Olive's Kind-Of Tree, L.1.5.b), all 11 locales.
   ---------------------------------------------------------------------
   It does NOT trust the core's data. Its own ground truth:
     · its own table of what every picture IS (bird, animal, fruit, food,
       vehicle, clothes, plant, toy) and what sets it apart (swims, flies,
       grows under the ground…), and its own list of kinds that can never
       share a tree (bird/animal, fruit/food, fruit/plant);
     · its own reading of the committed picture labels (git HEAD) plus its
       own short override list.
   Per round: exactly one branch holds the newcomer, no two branches clash,
   every family member / resident / level-2 picture belongs to exactly its
   own branch, exactly one twig of the right branch fits the newcomer and
   every resident has its twig; every leaf (right or wrong place) is the
   subject + the kind + the twig, and the subject names the picture; a clue
   never says the kind. Then the model (climb, twig, back down, check: an
   empty tree is a hint, a wrong branch slides back, a wrong twig keeps the
   branch, miss 2 glows the right place; level 2 locks the right ones and
   sends the rest home), the plan (fresh order, the right branch's and the
   right twig's positions balanced, bots no better than chance), strings
   ×11, prose (every quoted sentence is a leaf the tree really writes) and
   the manifest.
   Usage: node scripts/verify-climbing-tree-core.js   (CT_CORE / CT_ACT / CT_MANIFEST override the files)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), { execSync } = require('child_process'), vm = require('vm');
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools');
const CORE = process.env.CT_CORE || path.join(MINI, 'climbing-tree-core.js');
const ACTF = process.env.CT_ACT || path.join(MINI, 'climbing-tree-activity.js');
const MAN = process.env.CT_MANIFEST || path.join(MINI, 'olive-kind-of-activities.json');
const ID = 'olive-kind-of.category-attribute.l-1-5-b';
const C = require(CORE);
const ACT = (() => { const ctx = { window: {}, ClimbingTreeCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(ACTF, 'utf8') + '\n;this.__A = window.ClimbingTreeActivity;', ctx); return ctx.__A; })();
const LOCS = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
let PASS = 0, FAIL = 0;
const ok = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL <= 80) console.error('  FAIL: ' + m); } };

/* ---------- the gate's own truth ---------- */
const B = 'bird', A = 'animal';
const IS = {
  'birds 2/robin': [B, A], 'birds 2/swan': [B, A], 'birds 2/woodpecker': [B, A], 'birds 2/parrot': [B, A], 'animals/duck': [B, A], 'animals/owl': [B, A], 'farm animals/chick': [B, A],
  'animals/dog': [A], 'animals/cat': [A], 'animals/tiger': [A], 'animals/zebra': [A], 'animals/elephant': [A], 'animals/whale': [A], 'animals/dolphin': [A],
  'At the Supermarket/banana': ['fruit', 'food'], 'At the Supermarket/apple': ['fruit', 'food'], 'At the Supermarket/cherry': ['fruit', 'food'], 'At the Supermarket/pear': ['fruit', 'food'], 'At the Supermarket/orange': ['fruit', 'food'],
  'At the Supermarket/bread': ['food'], 'At the Supermarket/cheese': ['food'], 'At the Supermarket/carrot': ['food'], 'vegetables/radish': ['food'], 'desserts and sweets/cake': ['food'], 'desserts and sweets/muffin': ['food'],
  'vehicles/truck': ['vehicle'], 'vehicles/car': ['vehicle'], 'vehicles/airplane': ['vehicle'], 'vehicles/helicopter': ['vehicle'], 'vehicles/boat': ['vehicle'], 'vehicles/ship': ['vehicle'], 'vehicles/train': ['vehicle'],
  'accessories/hat': ['clothes'], 'accessories/cap': ['clothes'], 'accessories/glove': ['clothes'], 'accessories/mitten': ['clothes'], 'accessories/sock': ['clothes'], 'accessories/scarf': ['clothes'], 'clothing/coat': ['clothes'], 'clothing/dress': ['clothes'],
  'flowers/rose': ['plant'], 'flowers/tulip': ['plant'], 'flowers/sunflower': ['plant'], 'flowers/daffodil': ['plant'], 'flowers/clover': ['plant'],
  'toys/ball': ['toy'], 'toys/kite': ['toy'], 'toys/blocks': ['toy']
};
const HAS = {
  'animals/duck': ['swims'], 'birds 2/swan': ['swims'], 'animals/owl': ['hoots'], 'birds 2/woodpecker': ['pecks'],
  'vehicles/helicopter': ['flies'], 'vehicles/airplane': ['flies'], 'vehicles/ship': ['floats'], 'vehicles/boat': ['floats'], 'vehicles/train': ['rails'],
  'At the Supermarket/cherry': ['tree'], 'At the Supermarket/apple': ['tree'], 'vegetables/radish': ['ground'], 'At the Supermarket/carrot': ['ground'], 'desserts and sweets/muffin': ['baked'], 'At the Supermarket/bread': ['baked'],
  'animals/tiger': ['stripes'], 'animals/zebra': ['stripes'], 'animals/dolphin': ['sea'], 'animals/whale': ['sea'], 'animals/elephant': ['trunk'],
  'accessories/hat': ['head'], 'accessories/cap': ['head'], 'accessories/mitten': ['hands'], 'accessories/glove': ['hands'], 'accessories/sock': ['feet']
};
const CLASHES = [[B, A], ['fruit', 'food'], ['fruit', 'plant']];
const clash = (a, b) => a === b || CLASHES.some(([x, y]) => (x === a && y === b) || (x === b && y === a));
const isK = (pic, k) => (IS[pic] || []).indexOf(k) >= 0;
const OVERRIDE = { 'vehicles/car': { it: 'macchina' }, 'accessories/mitten': { es: 'manopla', pt: 'luva de dedão', it: 'manopola' } };
const THEMES = {};
const vocab = (pic, l) => { const dir = pic.split('/')[0], t = dir.toLowerCase().replace(/ /g, '-'), n = pic.split('/').slice(1).join('/'); if (!THEMES[t]) THEMES[t] = JSON.parse(execSync('git show HEAD:"mini tools/pictures/' + t + '.json"', { cwd: REPO, encoding: 'utf8', maxBuffer: 1e8 })); const e = THEMES[t].nouns[n]; return e ? e.labels[l][0] : null; };
const expectLabel = (pic, l) => { const o = OVERRIDE[pic] && OVERRIDE[pic][l]; if (o) return o; const v = vocab(pic, l); return v == null ? null : (l === 'de' ? v : v.toLocaleLowerCase(l)); };
const typo = (l, s) => (l === 'fr' || l === 'it') ? s.replace(/'/g, '’') : s;
const exists = (pic) => fs.existsSync(path.join(REPO, 'image-library-webp', 'themes', pic + '@2x.webp'));
const kindsOk = (tag, ks) => ks.forEach((a, x) => ks.forEach((b, y) => { if (x < y) ok(!clash(a, b), `${tag}: ${a} and ${b} never share a tree`); }));

/* ---------- 1. the rounds ---------- */
for (const l of LOCS) {
  for (const nb of [3, 4]) {
    for (const r of C.rounds('1')) {
      const rd = C.round(l, '1', r, { branches: nb }), tag = `${l} L1.${r + 1}/${nb}`, kinds = rd.branches.map(b => b.kind), np = rd.newcomer.pic;
      ok(rd.branches.length === nb && exists(np), `${tag}: ${nb} branches, the picture exists`);
      kindsOk(tag, kinds);
      ok(kinds.filter(k => isK(np, k)).length === 1 && isK(np, kinds[rd.right]), `${tag}: exactly the right branch holds ${np}`);
      rd.branches.forEach(b => { ok(exists(b.member.pic) && kinds.filter(k => isK(b.member.pic, k)).length === 1 && isK(b.member.pic, b.kind) && b.member.pic !== np, `${tag}: member ${b.member.pic} belongs only to ${b.kind}`); ok(b.member.label === typo(l, expectLabel(b.member.pic, l)), `${tag}: member label «${b.member.label}»`); });
      ok(rd.newcomer.label === typo(l, expectLabel(np, l)), `${tag}: newcomer label «${rd.newcomer.label}»`);
      ok(new Set(rd.branches.map(b => b.member.label.toLowerCase()).concat([rd.newcomer.label.toLowerCase()])).size === nb + 1, `${tag}: no two pictures read alike`);
      ok(rd.subj.toLowerCase().indexOf(rd.newcomer.label.toLowerCase()) >= 0, `${tag}: the subject «${rd.subj}» names the picture`);
      rd.branches.forEach((b, i) => { const st = C.newState(l, '1', r, { branches: nb }); C.climb(st, i); const lf = C.leaf(st); ok(lf === rd.subj + ' ' + b.kp + '.' && /^\p{Lu}/u.test(lf), `${tag}: the leaf on ${b.kind} is subject + kind («${lf}»)`); });
      const clue = rd.clue.toLowerCase(); rd.branches.forEach(b => { if (b.kind !== rd.kind) return; [b.sign].concat(b.kp.split(' ').slice(-1)).forEach(w => ok(!new RegExp('(?<!\\p{L})' + w.toLowerCase() + '(?!\\p{L})', 'u').test(clue), `${tag}: the clue never says «${w}»`)); });
      ok(/[.!?]$/.test(rd.clue) && rd.clue === typo(l, rd.clue), `${tag}: a whole clue`);
    }
    for (const r of C.rounds('3')) {
      const rd = C.round(l, '3', r, { branches: nb }), tag = `${l} L3.${r + 1}/${nb}`, kinds = rd.branches.map(b => b.kind), np = rd.newcomer.pic;
      kindsOk(tag, kinds);
      ok(kinds.filter(k => isK(np, k)).length === 1 && isK(np, kinds[rd.right]), `${tag}: exactly the right branch holds ${np}`);
      rd.branches.forEach((b, i) => {
        ok(b.twigs.length === 3, `${tag}: three twigs on ${b.kind}`);
        b.twigs.forEach(t => { ok(exists(t.resident.pic) && isK(t.resident.pic, b.kind) && (HAS[t.resident.pic] || []).indexOf(t.id) >= 0, `${tag}: resident ${t.resident.pic} is a ${b.kind} that ${t.id}`); ok(t.resident.label === typo(l, expectLabel(t.resident.pic, l)), `${tag}: resident label`); ok(t.sign && t.words.indexOf(t.sign) >= 0, `${tag}: the twig sign is its words`); });
        b.twigs.forEach((t, j) => { const st = C.newState(l, '3', r, { branches: nb }); C.climb(st, i); C.perch(st, j); ok(C.leaf(st) === rd.subj + ' ' + b.kp + t.words + '.', `${tag}: the leaf on ${b.kind}/${t.id} is subject + kind + twig`); });
      });
      const fits = rd.branches[rd.right].twigs.map((t, j) => (HAS[np] || []).indexOf(t.id) >= 0 ? j : -1).filter(j => j >= 0);
      ok(fits.length === 1 && fits[0] === rd.rightTwig, `${tag}: exactly one twig of the right branch fits ${np}`);
      ok(rd.subj.toLowerCase().indexOf(rd.newcomer.label.toLowerCase()) >= 0, `${tag}: the subject names the picture`);
    }
  }
  for (const r of C.rounds('2')) {
    const rd = C.round(l, '2', r), tag = `${l} L2.${r + 1}`, kinds = rd.branches.map(b => b.kind);
    kindsOk(tag, kinds);
    ok(rd.items.length === 9 && new Set(rd.items.map(x => x.pic)).size === 9, `${tag}: nine different pictures`);
    rd.items.forEach((it, i) => { ok(exists(it.pic) && kinds.filter(k => isK(it.pic, k)).length === 1 && kinds[rd.home[i]] && isK(it.pic, kinds[rd.home[i]]), `${tag}: ${it.pic} belongs only to its home`); ok(it.label === typo(l, expectLabel(it.pic, l)), `${tag}: label «${it.label}»`); });
    ok([0, 1, 2].every(j => rd.home.filter(h => h === j).length === 3), `${tag}: three pictures per branch`);
  }
}

/* ---------- 2. the model ---------- */
for (const lv of ['1', '3']) for (const r of C.rounds(lv)) {
  const tag = `L${lv}.${r + 1}`; let st = C.newState('en', lv, r); const rd = st.rd, wrong = rd.right === 0 ? 1 : 0;
  ok(C.check(st).result === 'empty' && st.misses === 0 && C.hint(st) === 'hintClimb', `${tag}: Check at the roots is a hint, no miss`);
  ok(C.climb(st, wrong) === 'up' && st.at === wrong, `${tag}: the picture climbs to a branch`);
  if (lv === '3') { ok(C.check(st).result === 'twig' && st.misses === 0 && C.hint(st) === 'hintTwig', `${tag}: a branch without a twig is a hint, no miss`); C.perch(st, 0); }
  let res = C.check(st); ok(res.result === 'miss' && st.misses === 1 && st.at === null && st.glow === null && C.hint(st) === (lv === '1' ? 'missBranch' : 'missKind'), `${tag}: a wrong branch slides back to the roots, miss 1`);
  C.climb(st, wrong); if (lv === '3') C.perch(st, 0); res = C.check(st);
  ok(st.misses === 2 && st.glow && st.glow.branch === rd.right && C.hint(st) === 'missGlow', `${tag}: miss 2 glows the right branch`);
  if (lv === '3') {
    st = C.newState('en', lv, r); C.climb(st, rd.right); C.perch(st, (rd.rightTwig + 1) % 3); res = C.check(st);
    ok(res.result === 'miss' && st.at === rd.right && st.twig === null && C.hint(st) === 'missTwig', `${tag}: a wrong twig keeps the branch open, miss 1`);
    C.perch(st, (rd.rightTwig + 2) % 3); C.check(st); ok(st.glow && st.glow.twig === rd.rightTwig, `${tag}: miss 2 glows the right twig`);
    ok(C.down(st) === 'down' && st.at === null, `${tag}: back down to the roots`);
  }
  st = C.newState('en', lv, r); C.climb(st, rd.right); if (lv === '3') C.perch(st, rd.rightTwig); res = C.check(st);
  ok(res.result === 'ok' && st.done && C.okLine(st, a => a.join()) === C.leaf(st), `${tag}: the right place holds, the success line is the leaf`);
  ok(C.climb(st, wrong) === 'no' && C.check(st).result === 'done', `${tag}: a done round takes no more moves`);
}
for (const r of C.rounds('2')) {
  const tag = `L2.${r + 1}`; let st = C.newState('en', '2', r); const rd = st.rd;
  ok(C.check(st).result === 'empty' && st.misses === 0 && C.hint(st) === 'hintAll', `${tag}: Check with pictures waiting is a hint, no miss`);
  ok(C.put(st, 0) === 'no', `${tag}: a branch without a chosen picture takes nothing`);
  rd.items.forEach((_, i) => { C.select(st, i); C.put(st, i < 2 ? (rd.home[i] + 1) % 3 : rd.home[i]); });
  ok(st.at.every(b => b >= 0), `${tag}: every picture placed`);
  let res = C.check(st); ok(res.result === 'miss' && res.back.join() === '0,1' && st.at[0] === -1 && st.at[1] === -1 && st.locked.filter(Boolean).length === 7 && C.hint(st) === 'missGroup', `${tag}: the two wrong ones go home, the seven right ones lock`);
  ok(C.select(st, 4) === 'no', `${tag}: a locked picture stays`);
  C.select(st, 0); C.put(st, (rd.home[0] + 2) % 3); C.select(st, 1); C.put(st, rd.home[1]); res = C.check(st);
  ok(st.misses === 2 && st.glow && st.glow.item === 0 && st.glow.branch === rd.home[0] && C.hint(st) === 'missGlow', `${tag}: miss 2 glows a waiting picture and its branch`);
  C.select(st, 0); C.put(st, rd.home[0]); res = C.check(st);
  ok(res.result === 'ok' && st.done, `${tag}: all nine home → done`);
  const line = C.okLine(st, a => a.join(', ')); ok(rd.branches.every(b => line.indexOf(b.sign.slice(1)) >= 0) && rd.items.every(it => line.indexOf(it.label) >= 0), `${tag}: the success line lists the three groups`);
  st = C.newState('en', '2', r); C.select(st, 3); C.put(st, 1); ok(C.select(st, 3) === 'home' && st.at[3] === -1, `${tag}: a placed picture tapped goes home`);
}

/* ---------- 3. the plan ---------- */
let seed = 11; const rnd = () => { seed = (seed * 1103515245 + 12345) % 2147483648; return seed / 2147483648; };
for (const lv of ['1', '2', '3']) for (const nb of (lv === '2' ? [3] : [3, 4])) {
  let prev = null, upBot = 0, firstTwig = 0, n = 0;
  for (let p = 0; p < 200; p++) {
    const P = C.plan('en', lv, rnd, prev, nb);
    ok(P.order.slice().sort((a, b) => a - b).join() === C.rounds(lv).join(), `L${lv}/${nb}: a pass is every round once`);
    if (prev) ok(P.order.join() !== prev.join(), `L${lv}/${nb}: a fresh order every pass`);
    prev = P.order; if (lv === '2') continue;
    const cnt = new Array(nb).fill(0), tc = [0, 0, 0];
    P.order.forEach(r => { const rd = C.round('en', lv, r, { branches: nb, order: P.orders[r], twigs: P.twigs[r] }); cnt[rd.right]++; n++; if (rd.right === 1) upBot++; if (lv === '3') { tc[rd.rightTwig]++; if (rd.rightTwig === 0) firstTwig++; }
      ok(rd.branches.map(b => b.kind).sort().join() === C.round('en', lv, r, { branches: nb }).branches.map(b => b.kind).sort().join(), `L${lv}/${nb}: the plan only reorders the branches`); });
    const L = P.order.length; ok(Math.max(...cnt) <= Math.ceil(L / nb) && Math.min(...cnt) >= Math.floor(L / nb), `L${lv}/${nb}: the right branch's position balanced (${cnt})`);
    if (lv === '3') ok(Math.max(...tc) <= Math.ceil(L / 3) && Math.min(...tc) >= Math.floor(L / 3), `L3/${nb}: the right twig's position balanced (${tc})`);
  }
  if (lv !== '2') { ok(upBot / n <= 1 / nb + 0.03, `L${lv}/${nb}: an "always the second branch" bot wins no more than chance (${(upBot / n).toFixed(2)})`); if (lv === '3') ok(firstTwig / n <= 1 / 3 + 0.03, `L3/${nb}: a first-twig bot no more than chance`); }
}

/* ---------- 4. strings ---------- */
const S = ACT.strings, src = fs.readFileSync(ACTF, 'utf8').replace(/\/\*STRINGS-BEGIN\*\/[\s\S]*\/\*STRINGS-END\*\//, '') + fs.readFileSync(CORE, 'utf8').replace(/\/\*DATA-BEGIN\*\/[\s\S]*\/\*DATA-END\*\//, '');
const KEYS = Object.keys(S); ok(KEYS.length >= 30, 'strings: the set is there');
const HINTS = ['hintClimb', 'hintAll', 'hintTwig', 'missBranch', 'missKind', 'missTwig', 'missGroup', 'missGlow'];
const FREE = /(?<!\p{L})(free|kostenlos\w*|gratis|gratuit\w*|grátis|ilmai\w*|maksuton\w*|kostnadsfri\w*|vederlagsfri\w*|gratuito|gratuita)(?!\p{L})/iu;
for (const k of KEYS) for (const l of LOCS) {
  const v = S[k][l]; ok(typeof v === 'string' && v.length > 0, `strings.${k}.${l} present`); if (typeof v !== 'string') continue;
  ok(!FREE.test(v), `strings.${k}.${l} never says free`);
  if (HINTS.indexOf(k) >= 0) ok(!/\d/.test(v), `strings.${k}.${l}: no digit in a hint`);
  if (l === 'fr' || l === 'it') ok(v.indexOf("'") < 0, `strings.${k}.${l}: typographic apostrophe`);
  if (l === 'fr') ok(!/ [:!?;]/.test(v), `strings.${k}.fr: a narrow space before : ! ? ;`);
}
const BYSHELL = ['title', 'instruction', 'instrBubble', 'okBubble'], BYSETTING = ['setLevel', 'l1', 'l2', 'l3', 'setClue', 'cluePic', 'clueText', 'setBranches', 'br3', 'br4'], BYLEVEL = ['t1', 't2', 't3'];
for (const k of KEYS) ok(BYSHELL.concat(BYSETTING, BYLEVEL).indexOf(k) >= 0 || new RegExp("'" + k + "'").test(src), `strings.${k} is reached`);
ok(/'t' \+ this\._level\(\)/.test(src), 'the task line follows the level');

/* ---------- 5. prose + manifest ---------- */
const QUOTE = /[«“„"‘”]\s?([^«»“”„"‘’]+?)\s?[»”“"’]/g;
for (const l of LOCS) {
  const j = JSON.parse(fs.readFileSync(path.join(REPO, 'frontend', 'messages', 'activity-content', l + '.json'), 'utf8')), p = j.prose[ID];
  ok(p && p.about && p.about.length === 3 && p.practices.length === 4 && p.howToPlay.length === 3 && p.learningGoals.length === 3, `prose.${l}: the whole entry`);
  if (!p) continue;
  const all = [].concat(p.about, p.practices, p.howToPlay, p.learningGoals).join(' ');
  ok(!FREE.test(all), `prose.${l}: never says free`);
  /* an apostrophe inside a word (Un’anatra) is not a closing quote */
  const scan = all.replace(/(\p{L})’(\p{L})/gu, '$1$2');
  ok(l === 'en' ? /Common Core/.test(all) : !/Common Core/.test(all), `prose.${l}: the framework name`);
  const leaves = new Set(); for (const lv of ['1', '3']) for (const r of C.rounds(lv)) { const st = C.newState(l, lv, r); C.climb(st, st.rd.right); if (lv === '3') C.perch(st, st.rd.rightTwig); leaves.add(C.leaf(st)); }
  const q = []; let m; QUOTE.lastIndex = 0; while ((m = QUOTE.exec(scan))) q.push(m[1].trim().replace(//g, '’'));
  ok(q.length >= 1 && q.every(x => leaves.has(x)), `prose.${l}: every quoted sentence is a leaf the tree writes (${q.join(' | ')})`);
  if (l === 'fr' || l === 'it') ok(all.indexOf("'") < 0, `prose.${l}: typographic apostrophes`);
}
const rows = JSON.parse(fs.readFileSync(MAN, 'utf8')), row = rows.find(x => x.id === ID);
ok(row && row.tool === 'climbing-tree-activity', 'manifest: the row points at the climbing tree');
ok(row && JSON.stringify(row.params.rounds) === JSON.stringify({ '1': 10, '2': 8, '3': 10 }) && row.params.level.join() === '1,2,3' && row.params.clue.join() === 'pic,text' && row.params.branches.join() === '3,4', 'manifest: params match the core');
const head = JSON.parse(execSync('git show HEAD:"mini tools/olive-kind-of-activities.json"', { cwd: REPO, encoding: 'utf8', maxBuffer: 1e8 })).find(x => x.id === ID);
['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv'].forEach(l => ['slug', 'page_title', 'page_intro'].forEach(k => ok(row[k][l] === head[k][l], `manifest: ${l} ${k} frozen`)));
['da', 'no', 'fi'].forEach(l => { ['slug', 'page_title', 'page_intro'].forEach(k => ok(row[k][l] && !FREE.test(row[k][l]) && !/Common Core/.test(row[k][l]), `manifest: ${l} ${k} authored`)); ok(/^[a-z0-9-]+$/.test(row.slug[l]), `manifest: ${l} slug url-safe`); });

console.log(`verify-climbing-tree-core: ${PASS} pass, ${FAIL} fail`);
process.exit(FAIL ? 1 : 0);
