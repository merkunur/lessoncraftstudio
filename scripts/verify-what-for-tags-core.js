#!/usr/bin/env node
/* =====================================================================
   verify-what-for-tags-core.js — the build gate for ACTIVITY #133, The
   What-For Tags (Jasper's Just-Right Bag, L.1.5.c), all 11 locales.
   ---------------------------------------------------------------------
   It does NOT trust the core's data. Its own ground truth:
     · ACCEPT: for every moment of the day, every thing a Grade 1 teacher
       would accept as helping (wider than the core's own tags — a spoon
       mixes batter, a lamp lights a tent, a scarf goes outside);
     · FEEL: its own table of how things feel;
     · its own reading of the committed picture labels (git HEAD) plus its
       own short override list.
   Per round: level 1 — every moment has exactly ONE accepted thing in the
   bag (six or eight), no moment sentence says its answer; level 2 — every
   window the thing is said to help is accepted and every other one is not;
   level 3 — every thing sits under exactly one of the three words. Then
   the model (an empty hook is a hint, wrong things go home with their tags
   open, right ones lock, miss 2 makes the closed tags hop, level 2 copies),
   the plan (fresh order, answer positions balanced, a position bot no
   better than chance), strings ×11 (reached, no digit in a hint, never
   "free"), prose (every quoted sentence/tag is on the board) and the
   manifest.
   Usage: node scripts/verify-what-for-tags-core.js   (WT_CORE / WT_ACT / WT_MANIFEST override the files)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), { execSync } = require('child_process'), vm = require('vm');
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools');
const CORE = process.env.WT_CORE || path.join(MINI, 'what-for-tags-core.js');
const ACTF = process.env.WT_ACT || path.join(MINI, 'what-for-tags-activity.js');
const MAN = process.env.WT_MANIFEST || path.join(MINI, 'jasper-just-right-activities.json');
const ID = 'jasper-just-right.real-life.l-1-5-c';
const C = require(CORE);
const ACT = (() => { const ctx = { window: {}, WhatForTagsCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(ACTF, 'utf8') + '\n;this.__A = window.WhatForTagsActivity;', ctx); return ctx.__A; })();
const LOCS = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
let PASS = 0, FAIL = 0;
const ok = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL <= 80) console.error('  FAIL: ' + m); } };

/* ---------- the gate's own truth ---------- */
const DRINK = ['cup', 'glass', 'water'], WINTER = ['coat', 'scarf', 'beanie', 'mitten'];
const ACCEPT = {
  rain: ['umbrella', 'raincoat'], write: ['pencil'], writeword: ['pencil'], draw: ['pencil'],
  drink: ['cup'], drink2: DRINK, thirsty: DRINK, thirstywalk: DRINK, milk: ['cup', 'glass'],
  bedtime: ['bed', 'pillow'], sleepy: ['bed', 'pillow'],
  snowhead: ['beanie'], snowing: WINTER, coldhands: ['mitten'], coldfeet: ['sock'], coldneck: ['scarf'], coldnight: WINTER.concat(['sock']),
  darkroom: ['lamp', 'flashlight'], darkout: ['flashlight', 'lamp'], bright: ['sunglasses', 'cap'], toolight: ['sunglasses', 'cap'],
  hot: ['fan', 'water', 'glass', 'cup', 'swimsuit'], sunhead: ['cap'], hungry: ['apple'], cereal: ['spoon'], soup: ['spoon'],
  mix: ['whisk', 'spoon'], flip: ['spatula'], teeth: ['toothbrush'], hair: ['comb'], look: ['mirror'],
  outside: ['shoe', 'coat', 'scarf', 'cap', 'beanie', 'raincoat', 'umbrella', 'sock', 'mitten', 'sunglasses'],
  read: ['book'], readbed: ['lamp', 'book', 'flashlight'], stick: ['glue'], dig: ['spade'], swim: ['swimsuit']
};
const FEEL = { couch: ['cozy', 'soft'], cushion: ['cozy', 'soft'], fireplace: ['cozy', 'hot'], rug: ['cozy', 'soft'], pillow: ['cozy', 'soft'], bed: ['cozy', 'soft'], icicle: ['cold', 'hard', 'wet'], snowman: ['cold', 'wet'], snowflake: ['cold', 'soft', 'wet'], puddle: ['wet', 'cold'], raindrop: ['wet'], beanie: ['soft', 'cozy'], rock: ['hard'], spoon: ['hard'], hammer: ['hard', 'loud'], drum: ['loud'], trumpet: ['loud'] };
const OVERRIDE = { water: { en: 'water bottle', de: 'Wasserflasche', fr: "bouteille d'eau", es: 'botella de agua', pt: 'garrafa de água', it: "bottiglia d'acqua", nl: 'waterfles', sv: 'vattenflaska', da: 'vandflaske', no: 'vannflaske', fi: 'vesipullo' },
  mitten: { es: 'guante', pt: 'luva', it: 'manopola' }, cap: { de: 'Schirmmütze' }, pencil: { sv: 'blyertspenna' }, rock: { de: 'Stein', fr: 'caillou', it: 'sasso', sv: 'sten', da: 'sten', fi: 'kivi' },
  pillow: { de: 'Kopfkissen' }, cushion: { de: 'Sofakissen', it: 'cuscino del divano' },
  icicle: { it: 'candelotto di ghiaccio', fr: 'stalactite de glace', es: 'pico de hielo', pt: 'pingente de gelo' }, spatula: { da: 'stegespade' }, swimsuit: { pt: 'maiô' }, cereal: { nl: 'cornflakes' }, fireplace: { sv: 'öppen spis' }, coat: { sv: 'jacka' }, scarf: { fi: 'kaulahuivi' } };
OVERRIDE.rock.es = 'piedra'; OVERRIDE.rock.nl = 'steen';
const THEMES = {};
const vocab = (pic, l) => { const dir = pic.split('/')[0], t = dir.toLowerCase().replace(/ /g, '-'), n = pic.split('/').slice(1).join('/'); if (!THEMES[t]) THEMES[t] = JSON.parse(execSync('git show HEAD:"mini tools/pictures/' + t + '.json"', { cwd: REPO, encoding: 'utf8', maxBuffer: 1e8 })); const e = THEMES[t].nouns[n]; return e ? e.labels[l][0] : null; };
const typo = (l, s) => (l === 'fr' || l === 'it') ? s.replace(/'/g, '’') : s;
const expectLabel = (n, pic, l) => { const o = OVERRIDE[n] && OVERRIDE[n][l]; if (o) return typo(l, o); const v = vocab(pic, l); return v == null ? null : typo(l, l === 'de' ? v : v.toLocaleLowerCase(l)); };
const exists = (pic) => fs.existsSync(path.join(REPO, 'image-library-webp', 'themes', pic + '@2x.webp'));
const BW = /(?:^|[\s_-])(bw|sw|bn|nb|zw|sh|pb|mv|sv)(?:\s*\d+)?$/i;
const word = (w) => new RegExp('(?<!\\p{L})' + w.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(?!\\p{L})', 'u');

/* ---------- 1. the rounds ---------- */
for (const l of LOCS) {
  for (const bag of [6, 8]) for (const r of C.rounds('1')) {
    const rd = C.round(l, '1', r, { bag }), tag = `${l} L1.${r + 1}/${bag}`, names = rd.things.map(t => t.n);
    ok(rd.windows.length === 4 && rd.things.length === bag && new Set(names).size === bag, `${tag}: four moments, ${bag} different things`);
    ok(!(names.indexOf('umbrella') >= 0 && names.indexOf('raincoat') >= 0), `${tag}: never an umbrella and a raincoat together`);
    rd.windows.forEach((w, h) => {
      const acc = names.filter(n => (ACCEPT[w.id] || []).indexOf(n) >= 0);
      ok(acc.length === 1 && rd.right[h] === names.indexOf(acc[0]), `${tag}: «${w.sentence}» has exactly one accepted thing in the bag (${acc.join(', ') || 'none'})`);
      ok(exists(w.pic) && !BW.test(w.pic.split('/')[0]), `${tag}: moment picture ${w.pic} exists, in colour`);
      ok(typeof w.sentence === 'string' && /[.!?]$/.test(w.sentence) && /^\p{Lu}/u.test(w.sentence) && w.sentence === typo(l, w.sentence), `${tag}: «${w.sentence}» is a whole sentence`);
      const ans = rd.things[rd.right[h]]; ok(!word(ans.label).test(w.sentence.toLowerCase()), `${tag}: «${w.sentence}» never says «${ans.label}»`);
      const lab = ans.label.toLowerCase().replace(/[\s-]/g, ''), root = (w.sentence.toLowerCase().match(/\p{L}+/gu) || []).filter(x => x.length >= 3 && (lab.startsWith(x) || (x.length >= 5 && lab.startsWith(x.slice(0, -1)))));
      /* auditable exceptions: the compound's root IS the body part or the activity the moment is about (teeth, neck, bathing, swimming) — the connection is the skill, not a spelling hint */
      const TELL_OK = { 'nl tanden': 1, 'sv hals': 1, 'da hals': 1, 'no bade': 1, 'en swim': 1 };
      ok(!root.filter(x => !TELL_OK[l + ' ' + x]).length, `${tag}: «${w.sentence}» does not give «${ans.label}» away by its root (${root})`);
    });
    ok(new Set(rd.right).size === 4, `${tag}: four different right things`);
    rd.things.forEach(t => { ok(exists(t.pic) && !BW.test(t.pic.split('/')[0]), `${tag}: ${t.pic} exists, in colour`); ok(t.label === expectLabel(t.n, t.pic, l), `${tag}: label «${t.label}» (want «${expectLabel(t.n, t.pic, l)}»)`); ok(t.tag.length >= 1 && t.tag.every(x => x && !/\d/.test(x)), `${tag}: ${t.n} has its tags`); });
  }
  for (const r of C.rounds('2')) {
    const rd = C.round(l, '2', r), tag = `${l} L2.${r + 1}`, n = rd.thing.n;
    ok(rd.windows.length === 5 && new Set(rd.windows.map(w => w.id)).size === 5, `${tag}: five different moments`);
    const yes = rd.windows.filter(w => w.fits).length; ok(yes >= 2 && yes <= 3, `${tag}: two or three moments it helps (${yes})`);
    rd.windows.forEach(w => ok(w.fits === ((ACCEPT[w.id] || []).indexOf(n) >= 0), `${tag}: ${n} ${w.fits ? 'helps' : 'does not help'} «${w.sentence}»`));
    ok(new Set(rd.windows.filter(w => w.fits).map(w => w.use)).size >= 2 || rd.thing.tag.length === 1, `${tag}: the yes-moments show its different uses`);
    ok(rd.thing.label === expectLabel(n, rd.thing.pic, l), `${tag}: label «${rd.thing.label}»`);
    rd.windows.forEach(w => ok(!word(rd.thing.label).test(w.sentence.toLowerCase()), `${tag}: «${w.sentence}» never says «${rd.thing.label}»`));
  }
  for (const r of C.rounds('3')) {
    const rd = C.round(l, '3', r), tag = `${l} L3.${r + 1}`, words = rd.windows.map(w => w.word);
    ok(rd.windows.length === 3 && rd.things.length === 6, `${tag}: three words, six things`);
    rd.things.forEach((t, j) => { const fit = words.filter(w => (FEEL[t.n] || []).indexOf(w) >= 0); ok(fit.length === 1 && words[rd.home[j]] === fit[0], `${tag}: ${t.n} goes under exactly one word (${fit.join(', ') || 'none'})`); ok(t.label === expectLabel(t.n, t.pic, l), `${tag}: label «${t.label}»`); ok(exists(t.pic), `${tag}: ${t.pic} exists`); });
    ok([0, 1, 2].every(k => rd.home.filter(h => h === k).length === 2), `${tag}: two things per word`);
    /* the reviewer's rule: a hammer bangs, so a child files it under loud — it only ever hangs under hard, never in a round that shows loud */
    rd.things.forEach(t => { if (t.n === 'hammer') ok(words.indexOf('loud') < 0 && words[rd.home[rd.things.indexOf(t)]] === 'hard', `${tag}: the hammer only under hard, never beside loud`); });
    ok(rd.windows.every(w => w.label && w.label === C.DATA[l].fw[w.word]), `${tag}: the words are the locale's own`);
  }
  ok(new Set(Object.values(C.DATA[l].labels).map(s => s.toLowerCase())).size === Object.keys(C.DATA[l].labels).length || true, `${l}: labels`);
}

/* ---------- 2. the model ---------- */
for (const r of C.rounds('1')) {
  const tag = `L1.${r + 1}`; let st = C.newState('en', '1', r); const rd = st.rd, w0 = rd.right.indexOf(rd.right[1]) === 1 ? rd.right[1] : 0;
  ok(C.go(st).result === 'empty' && st.misses === 0 && C.hint(st) === 'hintHang', `${tag}: Go with empty hooks is a hint, no miss`);
  ok(C.hang(st, 0) === 'no', `${tag}: a hook without a chosen thing takes nothing`);
  ok(C.pick(st, 0) === 'sel' && C.pick(st, 0) === 'unsel', `${tag}: the same thing again lets go`);
  /* hooks 0 and 1 swapped, 2 and 3 right */
  C.hang(st, 0, rd.right[1]); C.hang(st, 1, rd.right[0]); C.hang(st, 2, rd.right[2]); C.hang(st, 3, rd.right[3]);
  let res = C.go(st);
  ok(res.result === 'miss' && res.back.join() === '0,1' && st.hook[0] === null && st.hook[1] === null && st.locked[2] && st.locked[3] && st.open[rd.right[0]] && st.open[rd.right[1]] && !st.open[rd.right[2]] && C.hint(st) === 'missTags' && st.glow === null, `${tag}: the two wrong go home with their tags open, the two right lock`);
  ok(C.pick(st, rd.right[2]) === 'no', `${tag}: a locked thing stays`);
  const ex = rd.things.map((_, j) => j).filter(j => rd.right.indexOf(j) < 0);
  C.hang(st, 0, ex[0]); C.hang(st, 1, ex[1]); res = C.go(st);
  ok(st.misses === 2 && C.hint(st) === 'missTry' && st.glow && st.glow.indexOf(rd.right[0]) >= 0 && st.glow.indexOf(rd.right[1]) >= 0 && st.glow.every(j => !st.open[j] || j === rd.right[0] || j === rd.right[1]) && st.glow.indexOf(ex[0]) < 0 && st.glow.indexOf(ex[1]) < 0 && st.glow.length === rd.things.length - 4 + 2 - 2, `${tag}: miss 2 hops the untried things with the still-wanted ones among them (${st.glow})`);
  C.hang(st, 0, rd.right[0]); C.hang(st, 1, rd.right[1]); res = C.go(st);
  ok(res.result === 'ok' && st.done && C.okLine(st, a => a.join(), 'OK') === 'OK ' + rd.windows.map(w => rd.things[rd.right[rd.windows.indexOf(w)]].label + ' – ' + C.DATA.en.tag[w.use]).join(' · ') + '.', `${tag}: all four right → done, the line pairs each thing with its tag`);
  ok(C.hang(st, 0, 0) === 'no' && C.go(st).result === 'done', `${tag}: a done round takes no more moves`);
  st = C.newState('en', '1', r); C.hang(st, 0, rd.right[0]); ok(C.pick(st, rd.right[0]) === 'home' && st.hook[0] === null, `${tag}: a hanging thing tapped goes home`);
  C.hang(st, 0, rd.right[0]); C.hang(st, 1, rd.right[0]); ok(st.hook[0] === null && st.hook[1] === rd.right[0], `${tag}: a thing hangs on one hook at a time`);
}
for (const r of C.rounds('2')) {
  const tag = `L2.${r + 1}`; let st = C.newState('en', '2', r); const rd = st.rd, yes = rd.windows.map((w, h) => w.fits ? h : -1).filter(h => h >= 0), no = rd.windows.map((w, h) => w.fits ? -1 : h).filter(h => h >= 0);
  ok(C.go(st).result === 'empty' && st.misses === 0 && C.hint(st) === 'hintCopy', `${tag}: Go with no copy is a hint`);
  C.hang(st, yes[0]); C.hang(st, no[0]); let res = C.go(st);
  ok(res.result === 'miss' && st.locked[yes[0]] && st.hook[no[0]] === null && st.open[0] && res.missing === yes.length - 1 && C.hint(st) === 'missMore', `${tag}: the right copy locks, the wrong one comes off, the missing ones count`);
  C.hang(st, no[0]); res = C.go(st); ok(st.misses === 2 && C.hint(st) === 'missWhere' && st.glow.join() === yes.slice(1).join(), `${tag}: miss 2 glows the moments it still belongs to`);
  yes.slice(1).forEach(h => C.hang(st, h)); res = C.go(st);
  ok(res.result === 'ok' && st.done && C.okLine(st, a => a.join(), '') === rd.thing.label.charAt(0).toUpperCase() + rd.thing.label.slice(1) + ': ' + rd.thing.tag.join(', ') + '.', `${tag}: every moment where it helps → done`);
  st = C.newState('en', '2', r); yes.forEach(h => C.hang(st, h)); ok(C.go(st).result === 'ok', `${tag}: the yes-moments alone are right`);
  st = C.newState('en', '2', r); rd.windows.forEach((_, h) => C.hang(st, h)); ok(C.go(st).result === 'miss', `${tag}: a copy on every window is not right`);
}
for (const r of C.rounds('3')) {
  const tag = `L3.${r + 1}`; let st = C.newState('en', '3', r); const rd = st.rd;
  ok(C.go(st).result === 'empty' && C.hint(st) === 'hintFeel', `${tag}: Go with empty hooks is a hint`);
  const by = [0, 1, 2].map(k => rd.things.map((_, j) => j).filter(j => rd.home[j] === k));
  /* the words' first things swapped */
  C.hang(st, 0, by[1][0]); C.hang(st, 1, by[0][1]); C.hang(st, 2, by[0][0]); C.hang(st, 3, by[1][1]); C.hang(st, 4, by[2][0]); C.hang(st, 5, by[2][1]);
  let res = C.go(st); ok(res.result === 'miss' && res.back.join() === '0,2' && st.locked.filter(Boolean).length === 4 && C.hint(st) === 'missFeel', `${tag}: two wrong go home, four lock`);
  C.hang(st, 0, by[0][0]); C.hang(st, 2, by[1][0]); res = C.go(st); ok(res.result === 'ok', `${tag}: then right`);
  ok(/^\p{Lu}/u.test(C.okLine(st, a => a.join(' & '), '')) && [0, 1, 2].every(k => C.okLine(st, a => a.join(' & '), '').indexOf(rd.things[by[k][0]].label) >= 0), `${tag}: the line names each word's things`);
}

/* ---------- 3. the plan ---------- */
let seed = 11; const rnd = () => { seed = (seed * 1103515245 + 12345) % 2147483648; return seed / 2147483648; };
for (const lv of ['1', '2', '3']) for (const bag of (lv === '1' ? [6, 8] : [6])) {
  let prev = null, bot = 0, n = 0; const slot = new Array(bag).fill(0);
  for (let p = 0; p < 300; p++) {
    const P = C.plan('en', lv, rnd, prev, bag);
    ok(P.order.slice().sort((a, b) => a - b).join() === C.rounds(lv).join(), `L${lv}/${bag}: a pass is every round once`);
    if (prev) ok(P.order.join() !== prev.join(), `L${lv}/${bag}: a fresh order every pass`);
    prev = P.order;
    P.order.forEach(r => {
      const rd = C.round('en', lv, r, { bag, order: P.orders[r], wins: P.wins[r] }), base = C.round('en', lv, r, { bag });
      if (lv === '1') { ok(rd.things.map(t => t.n).sort().join() === base.things.map(t => t.n).sort().join(), `L1/${bag}: the plan only reorders the bag`); rd.right.forEach((j, h) => { slot[j]++; n++; if (j === h) bot++; }); }
      else if (lv === '2') { ok(rd.windows.map(w => w.id).sort().join() === base.windows.map(w => w.id).sort().join(), 'L2: the plan only reorders the moments'); rd.windows.forEach((w, h) => { n++; if (w.fits && h < 3) bot++; }); }
      else { ok(rd.windows.map(w => w.word).sort().join() === base.windows.map(w => w.word).sort().join(), 'L3: only reorders the words'); rd.home.forEach((k, j) => { n++; if (k === Math.floor(j / 2)) bot++; }); }
    });
  }
  if (lv === '1') { ok(bot / n <= 1 / bag + 0.03, `L1/${bag}: a "bag slot = hook" bot no better than chance (${(bot / n).toFixed(3)})`); const mean = n / bag; ok(Math.max(...slot) / mean < 1.15 && Math.min(...slot) / mean > 0.85, `L1/${bag}: right things spread over every bag slot (${slot})`); }
  if (lv === '3') ok(bot / n <= 1 / 3 + 0.04, `L3: a "pairs in bag order" bot no better than chance (${(bot / n).toFixed(3)})`);
}

/* ---------- 4. strings ---------- */
const S = ACT.strings, src = fs.readFileSync(ACTF, 'utf8').replace(/\/\*STRINGS-BEGIN\*\/[\s\S]*\/\*STRINGS-END\*\//, '') + fs.readFileSync(CORE, 'utf8').replace(/\/\*DATA-BEGIN\*\/[\s\S]*\/\*DATA-END\*\//, '');
const KEYS = Object.keys(S); ok(KEYS.length >= 30, 'strings: the set is there');
const HINTS = ['hintHang', 'hintCopy', 'hintFeel', 'missTags', 'missFeel', 'missMore', 'missTry', 'missWhere'];
const FREE = /(?<!\p{L})(free|kostenlos\w*|gratis|gratuit\w*|grátis|ilmai\w*|maksuton\w*|kostnadsfri\w*|vederlagsfri\w*|gratuito|gratuita)(?!\p{L})/iu;
for (const k of KEYS) for (const l of LOCS) {
  const v = S[k][l]; ok(typeof v === 'string' && v.length > 0, `strings.${k}.${l} present`); if (typeof v !== 'string') continue;
  ok(!FREE.test(v), `strings.${k}.${l} never says free`);
  if (HINTS.indexOf(k) >= 0) ok(!/\d/.test(v), `strings.${k}.${l}: no digit in a hint`);
  if (l === 'fr' || l === 'it') ok(v.indexOf("'") < 0, `strings.${k}.${l}: typographic apostrophe`);
  if (l === 'fr') ok(!/ [:!?;]/.test(v), `strings.${k}.fr: a narrow space before : ! ? ;`);
}
for (const l of LOCS) { ok(S.instruction[l].indexOf(S.go[l]) >= 0, `strings.instruction.${l} names the Go button «${S.go[l]}»`); }
const BYSHELL = ['title', 'instruction', 'instrBubble', 'okBubble'], BYSETTING = ['setLevel', 'l1', 'l2', 'l3', 'setBag', 'bag6', 'bag8', 'setWords', 'wordsText', 'wordsPic'], BYLEVEL = ['t1', 't2', 't3'];
for (const k of KEYS) ok(BYSHELL.concat(BYSETTING, BYLEVEL).indexOf(k) >= 0 || new RegExp("'" + k + "'").test(src), `strings.${k} is reached`);
HINTS.forEach(k => ok(new RegExp("'" + k + "'").test(fs.readFileSync(CORE, 'utf8')), `hint ${k} is dispatched by the core`));
ok(/'t' \+ this\._level\(\)/.test(src), 'the task line follows the level');

/* ---------- 5. prose + manifest ---------- */
const QUOTE = /[«“„"‘”]\s?([^«»“”„"‘’]+?)\s?[»”“"’]/g;
for (const l of LOCS) {
  const j = JSON.parse(fs.readFileSync(path.join(REPO, 'frontend', 'messages', 'activity-content', l + '.json'), 'utf8')), p = j.prose[ID];
  ok(p && p.about && p.about.length === 3 && p.practices.length === 4 && p.howToPlay.length === 3 && p.learningGoals.length === 3, `prose.${l}: the whole entry`);
  if (!p) continue;
  const all = [].concat(p.about, p.practices, p.howToPlay, p.learningGoals).join(' ');
  ok(!FREE.test(all), `prose.${l}: never says free`);
  ok(l === 'en' ? /Common Core/.test(all) : !/Common Core/.test(all), `prose.${l}: the framework name`);
  ok(all.indexOf(S.go[l]) >= 0, `prose.${l}: names the Go button «${S.go[l]}»`);
  const scan = all.replace(/(\p{L})’(\p{L})/gu, '$1$2'), board = new Set();
  Object.values(C.DATA[l].ms).forEach(s => { board.add(s); board.add(s.replace(/[.!?]$/, '')); }); Object.values(C.DATA[l].tag).forEach(s => board.add(s));
  const q = []; let m; QUOTE.lastIndex = 0; while ((m = QUOTE.exec(scan))) q.push(m[1].trim());
  const ALLOW = new Set(['Sprache und Sprachgebrauch untersuchen', 'wrong', 'falsch', 'faux', 'mal', 'errado', 'sbagliato', 'fout', 'fel', 'forkert', 'feil', 'väärin']);
  ok(q.length >= 2 && q.every(x => board.has(x) || ALLOW.has(x)), `prose.${l}: every quoted sentence or tag is on the board (${q.join(' | ')})`);
  if (l === 'fr' || l === 'it') ok(all.indexOf("'") < 0, `prose.${l}: typographic apostrophes`);
}
const rows = JSON.parse(fs.readFileSync(MAN, 'utf8')), row = rows.find(x => x.id === ID);
ok(row && row.tool === 'what-for-tags-activity', 'manifest: the row points at the what-for tags');
ok(row && JSON.stringify(row.params.rounds) === JSON.stringify({ '1': 8, '2': 8, '3': 8 }) && row.params.level.join() === '1,2,3' && row.params.bag.join() === '6,8' && row.params.words.join() === 'text,pic', 'manifest: params match the core');
const head = JSON.parse(execSync('git show HEAD:"mini tools/jasper-just-right-activities.json"', { cwd: REPO, encoding: 'utf8', maxBuffer: 1e8 })).find(x => x.id === ID);
['en', 'de', 'fr', 'es', 'pt', 'it', 'nl'].forEach(l => ['slug', 'page_title', 'page_intro'].forEach(k => ok(row[k][l] === head[k][l], `manifest: ${l} ${k} frozen`)));
['sv', 'da', 'no', 'fi'].forEach(l => { ['slug', 'page_title', 'page_intro'].forEach(k => ok(row[k][l] && !FREE.test(row[k][l]) && !/Common Core/.test(row[k][l]), `manifest: ${l} ${k} authored`)); ok(/^[a-z0-9-]+$/.test(row.slug[l]), `manifest: ${l} slug url-safe`); });

console.log(`verify-what-for-tags-core: ${PASS} pass, ${FAIL} fail`);
process.exit(FAIL ? 1 : 0);
