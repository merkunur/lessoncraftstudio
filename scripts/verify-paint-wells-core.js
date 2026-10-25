#!/usr/bin/env node
/* =====================================================================
   verify-paint-wells-core.js — the gate for ACTIVITY #110, The Paint
   Wells (Build Blend and Digraph Words, RF.1.3). Its OWN ground truth: a
   letter-team table typed here by hand per locale (never read from the
   core) that re-splits every word, the sound-boxes banks re-read from
   disk, and the pictures checked on disk.
     (a) the source rule: every word is a bank row of its locale with the
         bank's boxes, picture, noun and display; the gate's own split
         equals the bank's AND the core's; every picture exists and is a
         colour theme; refused words and pictures are absent; da / fr / fi
         are not shipped; Pour words hold no vowel team;
     (b) the kinds: one sound from two letters is a team, a doubled letter
         is a double (es ll / rr and pt rr are teams of their own);
     (c) the tray: the word's letters once each plus three distinct traps
         that are not in the word; a near-team trap beside every h-team;
         never two neighbouring letters in spelling order; no letter of
         the word holds one tray place more than a quarter of the time;
     (d) the stir: for thousands of fills, the core's verdict equals the
         gate's own (ok only when the poured wells are the word's sounds,
         in order, one per well; lean when a sound is broken across
         wells; split when one well holds two whole sounds); the bots
         ("one letter per well", "first two share") win only where the
         gate predicts, and "one per well" wins at most 5 of a set (nl 7,
         recorded: its bank has two consonant-team rows);
     (e) the hand: a tap never shares a filled well; a well holds three;
         the given first letter is locked; Check with nothing poured is
         no miss; a new pour takes the help away; at miss 2 a wrong
         letter leaves exactly two droppers bright; miss 3 shows ghosts;
     (f) Team jars (en de): the empty well holds a team of the jars; the
         three jars are the locale's teams; the right jar sits where the
         plan says, balanced per pass, never twice running in one place;
         the empty well's place never three times running;
     (g) Sentence (en): the gate's own count of words with sh; 2–4 each;
         tapping exactly them is right, one extra or one missing is not;
     (h) the plan: never the previous order, Pour sets alternate by pass,
         two rounds running never start with the same sound;
     (i) the success line names the right thing (team / double / none);
     (j) the strings ×11 (no digit in a hint, fr narrow spaces, fr/it
         apostrophes, never "free", every key asked for).
   Usage: node scripts/verify-paint-wells-core.js   (env PW_CORE_DIR / PW_ACT_DIR for the mutation run)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm');
const REPO = path.join(__dirname, '..'), MT = path.join(REPO, 'mini tools'), IMG = path.join(REPO, 'image-library-webp', 'themes');
const CORE_DIR = process.env.PW_CORE_DIR || MT, ACT_DIR = process.env.PW_ACT_DIR || CORE_DIR;
const C = require(path.join(CORE_DIR, 'paint-wells-core.js'));
const ACT = (() => { const ctx = { window: {}, PaintWellsCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(ACT_DIR, 'paint-wells-activity.js'), 'utf8') + '\n;this.__A = PaintWellsActivity;', ctx); return ctx.__A; })();
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL < 60) console.error('  FAIL: ' + m); } };
const ALL = ['en', 'de', 'nl', 'da', 'sv', 'no', 'es', 'it', 'pt', 'fr', 'fi'];
const SHIP = ['en', 'de', 'nl', 'sv', 'no', 'es', 'it', 'pt'];
/* the gate's own letter teams (consonant teams and doubled letters that are ONE sound), longest first */
const TEAMS = {
  en: ['sh', 'ch', 'th', 'ck', 'wh', 'ng', 'll', 'ss', 'ff', 'zz'],
  de: ['sch', 'ch', 'ck', 'tz', 'ng', 'll', 'tt', 'mm', 'nn', 'ss', 'ff', 'pp', 'rr'],
  nl: ['ch', 'ng', 'll', 'tt', 'kk', 'pp', 'ss'],
  sv: ['ng', 'tt', 'pp', 'mm', 'gg', 'rr', 'll', 'ss', 'kk', 'nn'],
  no: ['ng', 'tt', 'pp', 'mm', 'gg', 'rr', 'll', 'ss', 'kk', 'nn'],
  es: ['ch', 'll', 'rr', 'qu'],
  it: ['gn', 'sc', 'ch', 'gh', 'tt', 'll', 'cc', 'nn', 'pp', 'ss', 'zz', 'rr', 'mm'],
  pt: ['ch', 'lh', 'nh', 'rr', 'ss', 'qu']
};
const OWN_SOUND = { es: ['ll', 'rr'], pt: ['rr'] };
const VOWEL_TEAM = /^(?:[aeiouyåäöæø]{2,}|ei|ie|au|eu|äu|oe|ui|ij)$/i;
function split(l, word) { const w = word.toLowerCase(), T = TEAMS[l].slice().sort((a, b) => b.length - a.length), out = []; let i = 0; while (i < w.length) { const t = T.find(x => w.startsWith(x, i)); if (t) { out.push(t); i += t.length; } else { out.push(w[i]); i++; } } return out; }
function kind(l, g) { if (g.length < 2) return 'single'; if (g.split('').every(c => c === g[0]) && !(OWN_SOUND[l] || []).includes(g)) return 'double'; return 'team'; }
const bank = {}; SHIP.forEach(l => { bank[l] = {}; JSON.parse(fs.readFileSync(path.join(MT, 'sound-boxes-bank-' + l + '.json'), 'utf8')).words.forEach(w => { bank[l][w.id] = w; }); });
const BW = /(?:^|\s)(bw|sw|bn|nb|zw|sh|pb|mv|sv)(\s+\d+)?$/i;
let rnd = (() => { let s = 12345; return () => { s = (s * 1103515245 + 12345) & 0x7fffffff; return s / 0x7fffffff; }; })();

/* ---------------- (a) source rule ---------------- */
is(JSON.stringify(C.DATA.LOCALES.slice().sort()) === JSON.stringify(SHIP.slice().sort()), 'the locales are en de nl sv no es it pt (da fr fi not shipped)');
const REFUSED = { en: ['chin', 'brush', 'stamp', 'chimney', 'thermometer'], es: ['pollo'], pt: ['ninho'], de: ['nest'] };
SHIP.forEach(l => {
  const W = C.DATA.words[l], ids = Object.keys(W);
  (REFUSED[l] || []).forEach(id => is(!W[id], `${l}: ${id} is refused`));
  ids.forEach(id => {
    const w = W[id], b = bank[l][id];
    is(!!b, `${l} ${id}: a bank row`); if (!b) return;
    is(w.display === b.display && w.noun === b.noun && w.themeDir === b.themeDir && JSON.stringify(w.boxes) === JSON.stringify(b.boxes), `${l} ${id}: bank boxes, picture, noun and display`);
    is(b.boxes.join('') === b.display, `${l} ${id}: the boxes spell the word`);
    is(fs.existsSync(path.join(IMG, w.themeDir, w.noun + '@2x.webp')), `${l} ${id}: picture on disk`);
    is(!BW.test(w.themeDir.trim()), `${l} ${id}: a colour theme`);
    is(JSON.stringify(C.graphemes(l, id)) === JSON.stringify(b.boxes.map(x => x.toLowerCase())), `${l} ${id}: core graphemes = bank boxes`);
  });
  C.DATA.pour[l].forEach((set, si) => {
    is(set.length >= 7 && set.length <= 9, `${l} set ${si}: 7–9 words (${set.length})`);
    is(new Set(set).size === set.length, `${l} set ${si}: no word twice`);
    set.forEach(id => {
      const own = split(l, W[id].display);
      is(JSON.stringify(own) === JSON.stringify(W[id].boxes.map(x => x.toLowerCase())), `${l} ${id}: the gate's own split ${own.join('·')} = the bank's ${W[id].boxes.join('·')}`);
      is(!W[id].boxes.some(x => VOWEL_TEAM.test(x)), `${l} ${id}: no vowel team is poured`);
      is(W[id].boxes.length <= C.WELLS - 1, `${l} ${id}: fits the six wells with one to spare`);
    });
  });
  is(C.DATA.pour[l].length <= 2, `${l}: one or two Pour sets`);
  is(C.DATA.pour[l].some(set => set.some(id => W[id].boxes.some(x => x.length > 1))), `${l}: Pour has letter teams to share`);
});
['da', 'fr', 'fi'].forEach(l => is(C.locale(l) === 'en' && !C.DATA.words[l], `${l}: not shipped (falls back, no rows)`));

/* ---------------- (b) kinds ---------------- */
SHIP.forEach(l => Object.keys(C.DATA.words[l]).forEach(id => C.DATA.words[l][id].boxes.forEach(g => is(C.gKind(l, g) === kind(l, g.toLowerCase()), `${l} ${id} ${g}: kind ${kind(l, g.toLowerCase())}`))));
is(C.gKind('es', 'll') === 'team' && C.gKind('it', 'll') === 'double' && C.gKind('pt', 'rr') === 'team' && C.gKind('sv', 'tt') === 'double', 'es ll / pt rr are teams, it ll / sv tt doubles');

/* ---------------- (c) the tray ---------------- */
const NEAR = { sh: 'c', ch: 's', lh: 'n', nh: 'l' };
SHIP.forEach(l => { const W = C.DATA.words[l]; new Set(C.DATA.pour[l].flat()).forEach(id => {
  const w = W[id], letters = w.display.toLowerCase(), tr = w.traps;
  is(tr.length === 3 && new Set(tr).size === 3 && tr.every(c => letters.indexOf(c) < 0 && c.length === 1), `${l} ${id}: three distinct traps not in the word (${tr.join(',')})`);
  w.boxes.forEach(g => { const n = NEAR[g.toLowerCase()]; if (n && letters.indexOf(n) < 0) is(tr.includes(n), `${l} ${id}: the near-team letter ${n} beside ${g}`); });
  is(tr.includes('h') || letters.indexOf('h') >= 0 || w.boxes.some(g => NEAR[g.toLowerCase()]), `${l} ${id}: an h is always pourable`);
  const N = w.display.length + 3, pos0 = new Array(N).fill(0); let fairAll = true, shapeAll = true;
  for (let k = 0; k < 600; k++) {
    const t = C.tray(l, id, rnd);
    const word = t.filter(x => x.wi >= 0).sort((a, b) => a.wi - b.wi).map(x => x.c).join(''), traps = t.filter(x => x.wi < 0).map(x => x.c).sort().join('');
    if (t.length !== N || word !== w.display || traps !== tr.slice().sort().join('')) shapeAll = false;
    for (let q = 1; q < t.length; q++) if (t[q - 1].wi >= 0 && t[q].wi === t[q - 1].wi + 1) fairAll = false;
    pos0[t.findIndex(x => x.wi === 0)]++;
  }
  is(shapeAll, `${l} ${id}: every tray = the word's letters once + the traps`);
  is(fairAll, `${l} ${id}: never two neighbouring letters in spelling order`);
  is(Math.max(...pos0) / 600 <= 0.25, `${l} ${id}: the first letter holds no tray place more than a quarter of the time (${(Math.max(...pos0) / 600).toFixed(2)})`);
}); });

/* ---------------- (d) the stir ---------------- */
function fillState(l, id, wells) { const st = C.newState(l, 'pour', 0, id, { help: 'none', rnd }); const used = new Set(); wells.forEach((ws, wi) => ws.forEach(c => { const d = st.tray.findIndex((x, i) => x.c.toLowerCase() === c && !used.has(i)); if (d < 0) throw new Error('no dropper ' + c); used.add(d); st.wells[wi].push(d); })); return st; }
function expect(l, id, wells) {
  const B = C.DATA.words[l][id].boxes.map(x => x.toLowerCase()), got = wells.map(w => w.join('')).filter(Boolean);
  if (!got.length) return 'tray';
  if (got.join('') !== B.join('')) return 'spell';
  if (JSON.stringify(got) === JSON.stringify(B)) return 'ok';
  const cuts = new Set([0]); let a = 0; B.forEach(g => { a += g.length; cuts.add(a); });
  let p = 0, lean = false; got.forEach(s => { if (!cuts.has(p) || !cuts.has(p + s.length)) lean = true; p += s.length; });
  return lean ? 'lean' : 'split';
}
/* nl: its bank has only two consonant-team rows with pictures (schip, ring), so nl Pour is mostly blends — a
   recorded exception, frozen at its measured value so it can only shrink */
const ONE_PER_WELL = { nl: 7 };
const norm = (k) => (k === 'wrong' || k === 'gap') ? 'spell' : k;
SHIP.forEach(l => { const W = C.DATA.words[l]; let agree = 0, total = 0; const sets = C.DATA.pour[l];
  sets.forEach((set, si) => { let one = 0;
    set.forEach(id => {
      const B = W[id].boxes.map(x => x.toLowerCase()), letters = W[id].display.toLowerCase().split('');
      const right = B.map(g => g.split('')); const st0 = fillState(l, id, right.concat([[], [], [], [], [], []]).slice(0, 6));
      is(C.stir(st0).kind === 'ok', `${l} ${id}: one sound per well is right`);
      const perLetter = letters.map(c => [c]).concat([[], [], [], [], [], []]).slice(0, 6);
      const k1 = C.stir(fillState(l, id, perLetter)).kind, e1 = expect(l, id, perLetter);
      is(k1 === e1 || norm(k1) === e1, `${l} ${id}: "one letter per well" → ${e1} (${k1})`); if (k1 === 'ok') one++;
      const firstTwo = [letters.slice(0, 2)].concat(letters.slice(2).map(c => [c])).concat([[], [], [], [], [], []]).slice(0, 6);
      if (firstTwo.filter(x => x.length).length <= 6) { const k2 = C.stir(fillState(l, id, firstTwo)).kind, e2 = expect(l, id, firstTwo); is(norm(k2) === e2, `${l} ${id}: "first two share" → ${e2} (${k2})`); }
      for (let r = 0; r < 120; r++) {
        /* a random fill: the word's letters in order with random cuts, sometimes a trap swapped in or a letter dropped, wells shifted */
        let seq = letters.slice(); const tr = W[id].traps;
        if (rnd() < 0.25) seq[Math.floor(rnd() * seq.length)] = tr[Math.floor(rnd() * 3)];
        if (rnd() < 0.15) seq.splice(Math.floor(rnd() * seq.length), 1);
        const groups = []; let cur = [];
        seq.forEach((c, i) => { cur.push(c); if (cur.length >= 3 || rnd() < 0.6 || i === seq.length - 1) { groups.push(cur); cur = []; } });
        if (groups.length > 6) continue;
        const wells = [[], [], [], [], [], []], start = Math.floor(rnd() * (7 - groups.length)); let w = start;
        groups.forEach(g => { wells[w] = g; w += (rnd() < 0.2 && w + 1 < 6 && groups.length + (w - start) < 6) ? 2 : 1; });
        if (wells.some(x => x.length > 3) || w > 6) continue;
        let st; try { st = fillState(l, id, wells); } catch (e) { continue; }
        total++; const kc = C.stir(st).kind, ke = expect(l, id, wells);
        if (norm(kc) === ke) agree++; else if (FAIL < 50) console.error('  stir ' + l + ' ' + id + ' ' + JSON.stringify(wells) + ' core ' + kc + ' gate ' + ke);
      }
    });
    is(one <= (ONE_PER_WELL[l] || 5), `${l} set ${si}: "one letter per well" wins at most ${ONE_PER_WELL[l] || 5} of the set (${one})`);
  });
  is(total > 500 && agree === total, `${l}: the stir agrees with the gate on every random fill (${agree}/${total})`);
});

/* ---------------- (e) the hand ---------------- */
{
  const st = C.newState('en', 'pour', 0, 'ship', { help: 'none', rnd });
  for (let d = 0; d < st.tray.length; d++) C.pour(st, d, 'next');
  is(st.wells.every(w => w.length <= 1), 'a tap never shares a filled well');
  is(C.pour(st, st.wells[0][0], 1) === 'no', 'a used dropper cannot pour again');
  const s2 = C.newState('en', 'pour', 0, 'ship', { help: 'none', rnd }); [0, 1, 2].forEach(d => C.pour(s2, d, 0));
  is(s2.wells[0].length === 3 && C.pour(s2, 3, 0) === 'full', 'a well holds three letters');
  const s3 = C.newState('de', 'pour', 0, 'fish', { help: 'first', rnd });
  is(s3.wells[0].length === 1 && s3.tray[s3.wells[0][0]].wi === 0 && C.take(s3, 0, 0) === 'locked' && C.move(s3, 0, 0, 2) === 'locked', 'the given first letter sits in well 1, locked');
  const s4 = C.newState('en', 'pour', 0, 'frog', { help: 'none', rnd });
  is(C.check(s4).result === 'tray' && s4.misses === 0, 'Check with nothing poured is no miss');
  const s5 = fillState('en', 'fish', [['f'], ['i'], ['c', 'h']]);
  is(C.check(s5).kind === 'wrong' && C.check(s5).kind === 'wrong' && JSON.stringify(C.bright(s5)) === '["s","c"]', 'miss 2 on a wrong letter: the right and the chosen dropper stay bright');
  C.check(s5); is(JSON.stringify(C.ghosts(s5)) === '["f","i","sh"]', 'miss 3: the sounds as ghosts');
  const free = s5.tray.findIndex((x, i) => C.used(s5, i) < 0); C.pour(s5, free, 'next');
  is(s5.marks === null && C.hint(s5) === null, 'a new pour takes the help away');
  const s6 = fillState('en', 'ship', [['s'], ['h'], ['i'], ['p']]); C.check(s6);
  is(C.hint(s6).key === 'hintLean' && (C.check(s6), C.hint(s6).key === 'hintLean2'), 'sh in two wells: lean, then the partner hint');
  const s7 = fillState('en', 'frog', [['f', 'r'], ['o'], ['g']]); C.check(s7);
  is(C.hint(s7).key === 'hintSplit' && s7.marks.wells[0] === 'split', 'f and r in one well: split');
  const s8 = fillState('en', 'drum', [['d'], ['u'], ['m']]); C.check(s8);
  is(C.hint(s8).key === 'hintGap' && s8.marks.wells[0] === 'gap', 'a dropped r: the gap after the d');
}

/* ---------------- (f) Team jars ---------------- */
SHIP.forEach(l => {
  const has = C.clues(l).includes('jars');
  is(has === (l === 'en' || l === 'de'), `${l}: Team jars ${has ? 'ships' : 'absent'}`);
  if (!has) return;
  const J = C.DATA.jars[l], R = J.rounds;
  is(R.length >= 7 && J.teams.length === 3, `${l}: ≥ 7 jar rounds, three teams`);
  R.forEach(([id, e], i) => {
    const g = C.DATA.words[l][id].boxes[e].toLowerCase();
    is(J.teams.includes(g) && kind(l, g) === 'team', `${l} jar ${id}: the empty well is a team (${g})`);
    for (let pos = 0; pos < 3; pos++) { const st = C.newState(l, 'jars', 0, i, { pos }); is(st.jars[pos] === g && new Set(st.jars).size === 3 && st.jars.every(t => J.teams.includes(t)) && st.right === pos, `${l} jar ${id} pos ${pos}: the right jar where the plan says`);
      C.pourJar(st, (pos + 1) % 3); is(C.check(st).result === 'miss', `${l} jar ${id}: a wrong jar is a miss`); C.pourJar(st, pos); is(C.check(st).result === 'ok', `${l} jar ${id}: the right jar is right`); }
  });
  let ok = 0; let prev = null;
  for (let p = 0; p < 300; p++) {
    const P = C.plan(l, 'jars', rnd, prev, p), n = P.order.length, cnt = [0, 0, 0];
    P.pos.forEach(x => cnt[x]++);
    const bal = Math.max(...cnt) - Math.min(...cnt) <= 1, adj = P.pos.every((x, i) => i === 0 || x !== P.pos[i - 1]);
    const place = P.order.map(i => { const [id, e] = R[i], nb = C.DATA.words[l][id].boxes.length; return e === 0 ? 's' : e === nb - 1 ? 'e' : 'm'; });
    const three = place.some((x, i) => i >= 2 && x === place[i - 1] && x === place[i - 2]);
    if (n === R.length && bal && adj && !three && JSON.stringify(P.order) !== JSON.stringify(prev)) ok++;
    prev = P.order;
  }
  is(ok === 300, `${l} jars: right jar balanced and never twice running, places never three running, fresh order (${ok}/300)`);
});

/* ---------------- (g) Sentence ---------------- */
SHIP.forEach(l => is(C.clues(l).includes('sentence') === (l === 'en'), `${l}: Sentence ${l === 'en' ? 'ships' : 'absent'}`));
C.DATA.sentence.en.forEach((text, i) => {
  const own = text.split(' ').filter(w => w.toLowerCase().indexOf('sh') >= 0).length;
  is(own >= 2 && own <= 4, `sentence ${i}: 2–4 words with sh (${own})`);
  const st = C.newState('en', 'sentence', 0, i, {}); is(st.words.filter(w => w.has).length === own, `sentence ${i}: the core counts ${own}`);
  st.words.forEach((w, k) => { if (w.has) C.tapWord(st, k); }); const s2 = JSON.parse(JSON.stringify(st));
  const other = st.words.findIndex(w => !w.has); C.tapWord(st, other); is(C.check(st).kind === 'extra', `sentence ${i}: one extra word is a miss`);
  C.tapWord(st, other); const one = st.words.findIndex(w => w.has); C.tapWord(st, one); is(C.check(st).kind === 'missed', `sentence ${i}: one missing word is a miss`);
  C.tapWord(st, one); is(C.check(st).result === 'ok', `sentence ${i}: exactly the sh words is right`); void s2;
});
is(new Set(C.DATA.sentence.en.map(s => s.split(' ').map((w, i) => /sh/i.test(w) ? i : '').join(''))).size === C.DATA.sentence.en.length, 'the sh words never sit at the same places twice');

/* ---------------- (h) the plan ---------------- */
SHIP.forEach(l => { let prev = null, ok = 0; const n = C.sets(l);
  for (let p = 0; p < 300; p++) {
    const P = C.plan(l, 'pour', rnd, prev, p), set = C.DATA.pour[l][p % n], first = P.order.map(id => C.DATA.words[l][id].boxes[0].toLowerCase());
    if (JSON.stringify(P.order.slice().sort()) === JSON.stringify(set.slice().sort()) && P.set === p % n && JSON.stringify(P.order) !== JSON.stringify(prev) && first.every((f, i) => i === 0 || f !== first[i - 1])) ok++;
    prev = P.order;
  }
  is(ok === 300, `${l} pour: the set of the pass, a fresh order, never the same first sound twice running (${ok}/300)`);
});

/* ---------------- (i) the success line ---------------- */
SHIP.forEach(l => new Set(C.DATA.pour[l].flat()).forEach(id => {
  const B = C.DATA.words[l][id].boxes.map(x => x.toLowerCase()), t = B.find(g => kind(l, g) === 'team'), d = B.find(g => kind(l, g) === 'double'), L = C.lead(l, id);
  is(t ? (L && L.kind === 'team' && L.g === t) : d ? (L && L.kind === 'double' && L.g === d) : L === null, `${l} ${id}: the success line names ${t || d || 'no team'}`);
}));

/* ---------------- (j) strings ---------------- */
const S = ACT.strings, keys = Object.keys(S);
const SRC = fs.readFileSync(path.join(ACT_DIR, 'paint-wells-activity.js'), 'utf8'), BODY = SRC.slice(SRC.indexOf('/*STRINGS-END*/')) + fs.readFileSync(path.join(CORE_DIR, 'paint-wells-core.js'), 'utf8');
const VIA = ['title', 'instrBubble', 'okBubble', 'tPour', 'tJars', 'tSent', 'okTeam', 'okDouble', 'okBlend', 'okJarStart', 'okJarEnd', 'okJarMid', 'hintJarStart', 'hintJarEnd', 'hintJarMid', 'hintLean2', 'hintSplit2', 'hintWrong2', 'hintGap2'];
for (const k of keys) {
  is(VIA.includes(k) || BODY.indexOf("'" + k + "'") >= 0, `string ${k} is asked for`);
  for (const l of ALL) {
    const s = S[k][l]; is(typeof s === 'string' && s.length > 0, `${k}.${l} authored`); if (!s) continue;
    if (/^hint/.test(k)) is(!/\d/.test(s), `${k}.${l}: a hint carries no digit`);
    if (l === 'fr') is(!/ [:!?;»]/.test(s) && !/« /.test(s), `${k}.fr: narrow spaces`);
    if (l === 'fr' || l === 'it') is(!/'/.test(s), `${k}.${l}: curly apostrophes`);
    is(!/\bfree\b|gratuit|kostenlos|gratis|ilmai|grátis/i.test(s), `${k}.${l}: never "free"`);
  }
}
/* the reached-by-construction keys really are built */
is(/'tPour'/.test(BODY) && /'tJars'/.test(BODY) && /'tSent'/.test(BODY), 'the task lines are reached');
is(/'okJar' \+ p/.test(BODY) && /'hintJar' \+ place\(st\)/.test(BODY) && /two \? 'hintLean2'/.test(BODY), 'the composed keys are reached');

console.log(`verify-paint-wells-core: ${PASS} pass, ${FAIL} fail`);
process.exit(FAIL ? 1 : 0);
