#!/usr/bin/env node
/* =====================================================================
   verify-story-spine-book-core.js — the gate of ACTIVITY #65, THE BOOK
   THAT CRACKS AND MENDS (Dot's Story Spine, RL.K.3, 11 locales). Its own
   ground truth:
     1. the gate's own table of what a page DOES when the book reads it
        (a trouble or a different-trouble page cracks; a fix or a
        something-else page sends a bandage; only the true fix mends the
        true trouble); for EVERY one of the 7 × 7 × 7 ways to fill the
        three places of every story the gate computes where the reading
        stops and why, and the core must agree — and only start, trouble,
        fix reads through
     2. Name the parts: all six ways to put the tabs on the three pages;
        only the true one reads through; the stop is the first wrong tab
     3. Find the trouble / Find the fix: the right page reads through;
        the calm page cannot crack; the different trouble cracks and the
        bandage peels; the something-else page's bandage peels; the
        nothing-changed page sends nothing
     4. the pages: every picture exists, colour, labelled, not refused;
        one to three pictures a page, at least the floor size; every page
        of a story shows the story's own actor (a candidate is never told
        apart by who is on it); the seven pages of a story all look
        different; the thing that goes wrong is on the trouble page
     5. the deals: Name — never in story order, each arrangement three
        times a pass, never the same twice running, each table place holds
        each part 3/3/3; the tab tray cycles its orders; Trouble / Fix —
        the right page's table place 3/3/3, never three times running;
        Match — the strips never under their own pictures; the order of a
        pass never repeats and never starts with the story just played
     6. the round: empty asks (no miss); a wrong read is a miss; the hints;
        miss 2 helps (the faint mark / the rings / the flash); tabs swap;
        a candidate swaps out of the open place; strips swap; the retell
        ribbon is a starter OVER each page's own sentence
     7. texts × 11 (63 captions, key words inside their captions, the
        miss-2 hints, starters), no 0, fr non-breaking spaces; strings × 11;
        the manifest, its mirror, the frozen en..nl metadata (hash), the new
        sv da no fi slugs, titles, intros
   Usage: node scripts/verify-story-spine-book-core.js  (SSB_CORE_DIR = mutation dir)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm'), crypto = require('crypto');
const ROOT = path.join(__dirname, '..'), MT = path.join(ROOT, 'mini tools'), IMG = path.join(ROOT, 'image-library-webp', 'themes');
const DIR = process.env.SSB_CORE_DIR || MT;
const C = (() => { const ctx = { module: { exports: {} } }; ctx.exports = ctx.module.exports; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(DIR, 'story-spine-book-core.js'), 'utf8'), ctx); return ctx.module.exports; })();
const A = (() => { const ctx = { window: {}, document: undefined, StorySpineBookCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MT, 'story-spine-activity.js'), 'utf8') + '\nthis.__A = StorySpineActivity;', ctx); return ctx.__A; })();
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL <= 60) console.error('   FAIL: ' + m); } };
const LOCS = ['en', 'de', 'nl', 'da', 'sv', 'no', 'es', 'it', 'pt', 'fr', 'fi'];
const BW = /\s(bw|sw|bn|nb|zw|sh|pb|mv|sv)(\s+\d+)?$/i;
const REFUSED = ['weather/stormy', 'weather/sun', 'farm animals/duckling', 'easter/duckling', 'around the house/umbrella', 'christmas/tree', 'animals/wolf', 'forest creatures/wolf'];
const FROZEN = '51e26a59679612e4b278a367f2a33e5f0e315ed8';
/* the gate's own tables */
const STORIES = ['nest', 'carrot', 'picnic', 'kite', 'balloon', 'hat', 'ball', 'boat', 'key'];
const ACTOR = { nest: 'tree/apple', carrot: 'forest creatures/mouse', picnic: 'forest creatures/rabbit', kite: 'forest creatures/fox', balloon: 'forest creatures/bear', hat: 'farm animals/pig', ball: 'farm animals/dog', boat: 'pets/frog', key: 'forest creatures/raccoon' };
const KINDS = ['start', 'trouble', 'fix', 'tcalm', 'tother', 'fother', 'fsame'];
const CRACK = { trouble: 1, tother: 1 }, BAND = { fix: 1, fother: 1 };
const oracle = (k) => {
  if (k[0] !== 'start') return { stopAt: 0, reason: 'no-start' };
  if (!CRACK[k[1]]) return { stopAt: 1, reason: 'no-crack' };
  if (!BAND[k[2]]) return { stopAt: 2, reason: 'nothing-changed' };
  if (!(k[1] === 'trouble' && k[2] === 'fix')) return { stopAt: 2, reason: 'bandage-misfit', wrongAt: k[1] === 'tother' ? 1 : 2 };
  return null;
};
const LABEL = {};
for (const f of fs.readdirSync(path.join(MT, 'pictures'))) { if (f[0] === '_') continue; const j = JSON.parse(fs.readFileSync(path.join(MT, 'pictures', f), 'utf8')); for (const [k, v] of Object.entries(j.nouns)) LABEL[j.dir + '/' + k] = v.labels || {}; }
const picOk = (p) => p && fs.existsSync(path.join(IMG, p.split('/').slice(0, -1).join('/'), p.split('/').pop() + '@2x.webp')) && LABEL[p] && !BW.test(p.split('/')[0]) && !REFUSED.includes(p);
const perms = (a) => a.length < 2 ? [a] : a.flatMap((x, i) => perms(a.slice(0, i).concat(a.slice(i + 1))).map(p => [x].concat(p)));
const S = C.DATA.STORIES, TX = C.DATA.TEXT;
is(JSON.stringify(C.DATA.ORDER) === JSON.stringify(STORIES), 'the nine stories, in the gate\'s order');

/* 1 — every way to fill the book */
for (const s of STORIES) {
  const r = { story: s, loc: 'en', pages: ['start', 'trouble', 'fix'].map(k => C.pageOf('en', s, k)), cands: ['tcalm', 'tother', 'fother', 'fsame'].map(k => C.pageOf('en', s, k)) };
  let reads = 0;
  for (const a of KINDS) for (const b of KINDS) for (const c of KINDS) {
    const want = oracle([a, b, c]), got = C.readBook(r, [s + '-' + a, s + '-' + b, s + '-' + c]);
    if (!want) { is(got.ok, `${s} ${a}/${b}/${c}: reads through`); reads++; }
    else is(!got.ok && got.stopAt === want.stopAt && got.reason === want.reason && (want.wrongAt === undefined || got.wrongAt === want.wrongAt), `${s} ${a}/${b}/${c}: stops at ${want.stopAt} (${want.reason}) — core ${JSON.stringify(got)}`);
  }
  is(reads === 1, `${s}: only start / trouble / fix reads through (${reads})`);
}

/* 2 — Name the parts */
for (const loc of ['en', 'fi']) for (const r of C.rounds(loc, 'name')) {
  const ids = r.pages.map(p => p.id);
  for (const pm of perms([0, 1, 2])) {
    const st = C.newState(r, { table: ids.slice(), tabs: C.ROLES.slice() });
    pm.forEach((pi, ri) => { C.pickTab(st, C.ROLES[ri]); C.putTab(st, ids[pi]); });
    const res = C.read(st), want = oracle(pm.map(i => C.ROLES[i]));
    if (!want) is(res.ok && st.done && st.slots.join() === ids.join(), `${loc} ${r.id}: the true tabs read through and bind 1 2 3`);
    else is(!res.ok && res.stopAt === want.stopAt && st.last.role === C.ROLES[want.stopAt] && st.misses === 1 && !st.done, `${loc} ${r.id} tabs ${pm}: stops at ${want.stopAt}, the ${C.ROLES[want.stopAt]} tab`);
  }
}

/* 3 — Find the trouble / Find the fix */
for (const loc of ['en', 'fi']) for (const task of ['trouble', 'fix']) for (const r of C.rounds(loc, task)) {
  const want = task === 'trouble' ? { trouble: null, tcalm: ['no-crack', 1], tother: ['bandage-misfit', 2] } : { fix: null, fother: ['bandage-misfit', 2], fsame: ['nothing-changed', 2] };
  is(r.cands.map(p => p.kind).sort().join() === Object.keys(want).sort().join(), `${loc} ${r.id}: the three candidates are ${Object.keys(want)}`);
  for (const p of r.cands) {
    const st = C.newState(r, { table: r.cands.map(x => x.id) }), open = task === 'trouble' ? 1 : 2;
    is(st.open === open && st.slots[open] === null && st.slots.filter(Boolean).length === 2, `${loc} ${r.id}: two pages bound, place ${open + 1} empty`);
    C.pick(st, p.id); C.put(st); const res = C.read(st), w = want[p.kind];
    is(w ? (!res.ok && res.reason === w[0] && res.stopAt === w[1]) : res.ok, `${loc} ${r.id}: ${p.kind} → ${w ? w[0] : 'reads through'} (${JSON.stringify(res)})`);
  }
}

/* 4 — the pages */
const sig = (p) => p.t.map(t => [t[0], t[1], t[2], t[3], t[4] || 0, !!t[5]].join(':')).join('|') + '#' + JSON.stringify(p.d || {});
for (const s of STORIES) {
  const pages = KINDS.map(k => C.pageOf('en', s, k));
  pages.forEach(p => {
    is(p.t.length >= 1 && p.t.length <= 3, `${p.id}: one to three pictures`);
    p.t.forEach(t => is(picOk(t[0]) && t[3] >= 1, `${p.id}: ${t[0]} exists, colour, labelled, not refused, at least the floor`));
    is(p.t.some(t => t[0] === ACTOR[s]), `${p.id}: shows the story's own actor ${ACTOR[s]}`);
    if (p.kind !== 'fother') is(p.t.some(t => t[0] === p.thing), `${p.id}: the thing ${p.thing} is on the page`);
  });
  is(new Set(pages.map(sig)).size === 7, `${s}: the seven pages all look different`);
  const tr = pages[1], st = pages[0];
  const pos = (p, th) => (p.t.find(t => t[0] === th) || []).slice(1, 5).join();
  is(tr.thing !== st.thing || pos(tr, tr.thing) !== pos(st, st.thing), `${s}: the trouble page moves the thing (or swaps the sky)`);
}
is(picOk(C.BANDAGE) && C.BANDAGE === 'hospital/bandage', 'the bandage is the library bandage');

/* 5 — the deals and the order */
for (const task of C.TASKS) {
  const R = C.rounds('en', task);
  for (let seed = 0; seed < 600; seed++) {
    const rnd = C.seeded(task + seed), o = C.order(R, rnd, null), D = C.deal(R, o, rnd);
    if (task === 'name') {
      const at = Array.from({ length: 3 }, () => [0, 0, 0]), arrs = [], tabs = new Set(); let ok = true;
      o.forEach((k, p) => { const ids = R[k].pages.map(x => x.id), t = D[k].table; if (t.join() === ids.join() || t.slice().sort().join() !== ids.slice().sort().join()) ok = false; t.forEach((id, i) => at[i][ids.indexOf(id)]++); arrs.push(t.map(id => ids.indexOf(id)).join('')); if (D[k].tabs.slice().sort().join() !== 'fix,start,trouble') ok = false; tabs.add(D[k].tabs.join()); });
      is(ok, `name seed ${seed}: the loose pages are the story's, never in story order; three tabs`);
      is(at.every(row => row.join() === '3,3,3'), `name seed ${seed}: each table place holds each part 3/3/3 (${JSON.stringify(at)})`);
      is(arrs.every((a, i) => !i || a !== arrs[i - 1]), `name seed ${seed}: never the same arrangement twice running`);
      is(tabs.size === 6, `name seed ${seed}: the tray cycles through all six tab orders (${tabs.size})`);
    } else if (task === 'match') {
      is(o.every(k => { const ids = R[k].pages.map(x => x.id), t = D[k].table; return t.slice().sort().join() === ids.slice().sort().join() && t.every((id, i) => id !== ids[i]); }), `match seed ${seed}: no strip lies under its own picture`);
    } else {
      const slots = o.map(k => D[k].table.indexOf(R[k].cands[0].id)), c = [0, 0, 0]; slots.forEach(x => c[x]++);
      is(c.join() === '3,3,3', `${task} seed ${seed}: the right page's table place 3/3/3 (${c})`);
      is(slots.every((x, i) => i < 2 || !(x === slots[i - 1] && x === slots[i - 2])), `${task} seed ${seed}: never three times running`);
      is(o.every(k => D[k].table.slice().sort().join() === R[k].cands.map(x => x.id).sort().join()), `${task} seed ${seed}: the table holds the three candidates`);
    }
    const o2 = C.order(R, rnd, o);
    is(new Set(o).size === 9 && o2.join() !== o.join() && R[o[8]].story !== R[o2[0]].story, `${task} seed ${seed}: a permutation; the next pass never repeats it and never starts with the story just played`);
  }
}

/* 6 — the round */
for (const loc of ['en', 'fi']) {
  for (const r of C.rounds(loc, 'name')) {
    const ids = r.pages.map(p => p.id), st = C.newState(r, { table: [ids[1], ids[2], ids[0]], tabs: ['fix', 'start', 'trouble'] });
    let res = C.read(st); is(res.reason === 'empty' && st.misses === 0 && C.hint(st) === 'hintTabs', `${loc} ${r.id}: no tabs → asks, no miss`);
    C.pickTab(st, 'start'); C.putTab(st, ids[1]); C.pickTab(st, 'trouble'); C.putTab(st, ids[1]);
    is(st.tabs[ids[1]] === 'trouble' && st.tray.includes('start') && !st.tray.includes('trouble'), `${loc} ${r.id}: a tab dropped on a tabbed page sends the old tab back to where the new one came from`);
    C.pickTab(st, 'start'); C.putTab(st, ids[0]); C.pickTab(st, 'fix'); C.putTab(st, ids[2]);
    C.pickTab(st, 'trouble'); C.putTab(st, ids[2]);
    is(st.tabs[ids[2]] === 'trouble' && st.tabs[ids[1]] === 'fix', `${loc} ${r.id}: tabs swap between two pages`);
    res = C.read(st); is(!res.ok && st.last.role === 'trouble' && C.hint(st) === 'hintTrouble' && st.misses === 1, `${loc} ${r.id}: fix tabbed TROUBLE → the trouble tab is wrong, hint`);
    is(C.helpOf(st) && !C.helpOf(st).mark, `${loc} ${r.id}: miss 1 shows no mark`);
    res = C.read(st); const h = C.helpOf(st);
    is(st.misses === 2 && h && h.mark && h.mark.page === ids[1] && h.mark.role === 'trouble', `${loc} ${r.id}: miss 2 marks the real trouble page faintly`);
    C.pickTab(st, 'trouble'); C.putTab(st, ids[1]); is(!st.show && !C.hint(st), `${loc} ${r.id}: a new move clears the showing`);
    res = C.read(st); is(res.ok && st.done, `${loc} ${r.id}: right tabs → read through`);
    const rt = C.retell(r);
    is(rt.length === 3 && rt.every((x, i) => x.starter === TX[loc].st[i] && x.caption === r.pages[i].caption), `${loc} ${r.id}: the ribbon puts ${TX[loc].st.join(' / ')} over each page's own sentence`);
  }
  for (const task of ['trouble', 'fix']) for (const r of C.rounds(loc, task)) {
    const T = r.cands.map(p => p.id), st = C.newState(r, { table: T.slice() }), bad = r.cands[1].id, good = r.cands[0].id;
    let res = C.read(st); is(res.reason === 'empty' && st.misses === 0 && C.hint(st) === 'hintEmpty', `${loc} ${r.id}: empty place → asks, no miss`);
    C.pick(st, bad); C.put(st); is(st.slots[st.open] === bad && st.table[T.indexOf(bad)] === null, `${loc} ${r.id}: a candidate leaves a hole on the table`);
    res = C.read(st); is(!res.ok && st.misses === 1 && typeof C.hint(st) === 'string', `${loc} ${r.id}: a wrong page is a miss with a hint`);
    res = C.read(st); const h = C.helpOf(st), ht = C.hintText(st, loc);
    is(st.misses === 2 && h && h.glow === good && (task === 'trouble' ? h.ringFix === r.pages[2].id : h.ringTrouble === r.pages[1].id) && ht === TX[loc][task === 'trouble' ? 'tt' : 'tb'][r.story], `${loc} ${r.id}: miss 2 rings the other page's thing, the right candidate glows, the story's own hint`);
    C.pick(st, good); C.put(st); is(st.slots[st.open] === good && st.table[T.indexOf(good)] === bad, `${loc} ${r.id}: the right page swaps the wrong one back into its hole`);
    res = C.read(st); is(res.ok && st.done, `${loc} ${r.id}: the right page reads through`);
  }
  for (const r of C.rounds(loc, 'match')) {
    const ids = r.pages.map(p => p.id), st = C.newState(r, { table: [ids[1], ids[2], ids[0]] });
    let res = C.read(st); is(res.reason === 'empty' && C.hint(st) === 'hintStrips', `${loc} ${r.id}: strips not placed → asks`);
    [ids[1], ids[0], ids[2]].forEach((id, i) => { C.pickStrip(st, id); C.putStrip(st, i); });
    res = C.read(st); is(!res.ok && JSON.stringify(res.wrong) === '[0,1]' && C.hint(st) === 'hintRead' && JSON.stringify(C.helpOf(st).underline) === '[0,1]', `${loc} ${r.id}: two wrong strips → underlined, hint`);
    C.read(st); is(C.helpOf(st).flash === 1, `${loc} ${r.id}: miss 2 flashes the page the first wrong strip belongs to`);
    C.pickStrip(st, ids[0]); C.putStrip(st, 0); is(st.caps[0] === ids[0] && st.caps[1] === ids[1], `${loc} ${r.id}: strips swap`);
    res = C.read(st); is(res.ok && st.done, `${loc} ${r.id}: every sentence under its picture — done`);
  }
}

/* 7 — texts, strings, manifest */
for (const loc of LOCS) {
  const L = TX[loc];
  is(L && L.st && L.st.length === 3 && L.st.every(x => x && x.trim()), `${loc}: three starters`);
  const all = [];
  for (const s of STORIES) {
    for (const k of KINDS) { is(L.c[s] && L.c[s][k] && L.c[s][k].trim(), `${loc} ${s}.${k}: authored`); all.push(L.c[s][k]); }
    ['start', 'trouble', 'fix'].forEach((k, i) => is(L.kw[s] && L.kw[s][i] && L.c[s][k].includes(L.kw[s][i]), `${loc} ${s}.${k}: the key word «${L.kw[s] && L.kw[s][i]}» is in the sentence`));
    is(L.tt[s] && L.tb[s], `${loc} ${s}: both miss-2 hints`); all.push(L.tt[s], L.tb[s]);
    is(new Set(KINDS.map(k => L.c[s][k])).size === 7, `${loc} ${s}: seven different sentences`);
  }
  all.push(...L.st);
  is(!all.some(x => /(^|\D)0(\D|$)/.test(x)), `${loc}: no 0 anywhere`);
  if (loc === 'fr') is(!all.some(x => / [?!:;»]/.test(x)), 'fr: non-breaking spaces in the stories');
}
const SS = A.strings;
for (const k of Object.keys(SS)) for (const loc of LOCS) {
  const ph = (s) => (String(s).match(/\{\w+\}/g) || []).sort().join();
  is(typeof SS[k][loc] === 'string' && SS[k][loc].trim(), `strings.${k}.${loc} authored`);
  is(ph(SS[k][loc]) === ph(SS[k].en), `strings.${k}.${loc}: same placeholders as en`);
  is(!/\b(free|gratis|kostenlos|gratuit|gratuito|grátis|ilmainen|gratuita)\b/i.test(SS[k][loc] || ''), `strings.${k}.${loc}: nothing "free"`);
  if (loc === 'fr') is(!/ [?!:;»]/.test(SS[k][loc]), `strings.${k}.fr: non-breaking spaces`);
}
for (const loc of LOCS) is(['tabStart', 'tabTrouble', 'tabFix'].every(k => SS.instrName[loc].includes(SS[k][loc].toLocaleUpperCase(loc))), `${loc}: the Name task line names the three tabs`);
const L1 = C.layout(648), L2 = C.layout(328), L3 = C.layout(288);
is(L1.unit >= 96 && L2.unit >= 64 && L3.unit >= 64, 'every library picture at its floor (704 / phone)');
is([L1, L2, L3].every(L => L.areaH >= L.unit && L.cardW >= L.unit + 12), 'a page holds a floor-size picture');
const M = JSON.parse(fs.readFileSync(path.join(MT, 'story-spine-activities.json'), 'utf8')).find(r => r.id === 'story-spine.role.rl-k-3');
is(M && M.tool === 'story-spine-activity' && M.task_template === 'story-spine' && M.alignment.code === 'RL.K.3', 'manifest row: story-spine-activity, RL.K.3');
for (const loc of LOCS) {
  const want = {}; C.TASKS.forEach(t => { want[t] = C.rounds(loc, t).length; });
  is(JSON.stringify(M.params.byLocale[loc]) === JSON.stringify(want) && Object.values(want).every(v => v >= 7), `manifest mirrors the core for ${loc} (≥ 7 rounds a task)`);
  is(/^[a-z0-9-]+$/.test(M.slug[loc] || '') && M.page_title[loc] && M.page_intro[loc], `slug, title, intro ${loc}`);
  if (['sv', 'da', 'no', 'fi'].includes(loc)) is(!/gratis|ilmai|\bfree\b|uden login|utan inloggning|uten innlogging/i.test(M.page_title[loc] + ' ' + M.page_intro[loc]), `${loc}: nothing "free"`);
}
is(new Set(Object.values(M.slug)).size === LOCS.length, 'eleven different slugs');
const FZ = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl'].map(l => [l, M.slug[l], M.page_title[l], M.page_intro[l]]);
is(crypto.createHash('sha1').update(JSON.stringify(FZ)).digest('hex') === FROZEN, 'frozen en de fr es pt it nl slugs, titles and intros unchanged');

console.log(`verify-story-spine-book-core: ${PASS} pass, ${FAIL} fail`);
process.exit(FAIL ? 1 : 0);
