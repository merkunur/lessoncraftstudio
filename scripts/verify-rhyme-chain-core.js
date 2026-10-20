#!/usr/bin/env node
/* =====================================================================
   verify-rhyme-chain-core.js — the build gate for ACTIVITY #42, the Rhyme
   Chain (RF.K.2.a). It carries its OWN oracle, typed again here, never
   read off the core: the rhyme families of every locale (by ear) and the
   answer of every round. Checks:
     1. every word equals its library picture's label in its own locale and
        the picture exists (exact case), colour themes only, and the picture
        rulings (tools/nail en only, no post-office art outside en, no
        kitchen-tools/pan, never toys/ball beside toys/balloon);
     2. a ring holds iff the two words share a family — exhaustive over every
        word pair of every locale (bear/ear never links, snail/whale does);
     3. every round has exactly one right answer, equal to the oracle's;
     4. every locale has a judge-NOT trap round (en the bear/ear spelling
        trap, the others a same-start onset trap);
     5. answer slots balanced (±1 per pass) and re-dealt every pass;
     6. distractors never share the anchor's family; 7. chain length 3+
        (fi 2); 8. the order rules over 10,000 seeds; 9. strings ×11 with
        the same placeholders as en; 10. layout floors; 11. the hint ladder;
     12. the manifest mirrors the core and keeps the frozen metadata.
   Usage: node scripts/verify-rhyme-chain-core.js
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm'), cp = require('child_process');
const ROOT = path.join(__dirname, '..'), MT = path.join(ROOT, 'mini tools');
const C = require(path.join(process.env.RC_CORE_DIR || MT, 'rhyme-chain-core.js'));
const L = C.LOCALES;
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; console.error('FAIL: ' + m); } };

/* ---------- the oracle: rhyme families by ear, typed again ---------- */
const FAM = {
  en: 'snail whale nail | bear chair pear | ear | bee key | pie tie | cat hat bat | dog log frog | sun | bus | boat goat coat',
  de: 'maus haus | fisch tisch | hund | rose hose | schwein | boot | hahn zahn | glocke socke | pfanne badewanne kanne',
  fr: 'bateau gâteau chapeau seau oiseau râteau | chat | poisson mouton ballon cochon citron camion avion maison | lune | vache | lapin pain main | ours | souris | trompette fourchette chaussette',
  es: 'gato pato zapato | oveja | camión ratón león avión | rosa | manzana campana | estrella | galleta paleta | ardilla',
  pt: 'baleia meia | gato pato sapato rato | galo | rosa | abelha orelha ovelha | casa | mesa | dente | panela janela | peixe | limão caminhão balão avião | chave',
  it: 'gatto piatto | limone melone pavone | banana rana | delfino pinguino calzino panino bambino cestino pulcino | cappello martello anello ombrello | padella',
  nl: 'muis huis | beer peer | hond | kat | boot | schoen meloen citroen | haan banaan | bel | sok | vis',
  sv: 'katt hatt | hus mus | hund | sol stol | bil | gris | ko sko | fisk | boll | hand sand tand | kopp mopp knopp',
  da: 'kat hat | hus mus | hund | sol stol | bil | gris | ko sko | fisk | and sand tand spand | negl snegl',
  no: 'katt hatt | hus mus | hund | sol stol | bil | gris | kake rake | fisk | and sand tann | måke kråke | ku | sko',
  fi: 'kuu suu | kukka sukka | kukko lukko | juna muna peruna | orava harava | kissa | auto | kala | pallo | koira | kana'
};
const famOf = {}; for (const l of L) { famOf[l] = {}; FAM[l].split('|').forEach((g, i) => g.trim().split(/\s+/).forEach(w => { famOf[l][w] = i; })); }
const same = (l, a, b) => famOf[l][a] !== undefined && famOf[l][a] === famOf[l][b];

/* the answers, typed again (round order as in the core) */
const ANS = {
  en: ['Y', 'N', 'N', 'whale', 'chair', 'hat', 'bee', 'key', '0101', 'nail', 'bee', 'log frog', 'goat coat'],
  de: ['Y', 'N', 'N', 'tisch', 'rose', 'zahn', 'socke', '011', 'haus', 'badewanne kanne', 'badewanne kanne'],
  fr: ['Y', 'N', 'mouton', 'pain', 'oiseau', 'vache', 'lapin', '0101', 'ballon', 'avion maison', 'lapin pain'],
  es: ['Y', 'N', 'N', 'zapato', 'campana', 'paleta', 'oveja', '011', 'zapato', 'león avión', 'camión avión'],
  pt: ['Y', 'N', 'N', 'orelha', 'janela', 'caminhão', 'casa', '0101', 'sapato', 'gato pato rato', 'limão avião caminhão'],
  it: ['Y', 'N', 'N', 'pinguino', 'martello', 'limone', 'cappello', '0011', 'piatto', 'anello martello ombrello', 'panino cestino pulcino'],
  nl: ['Y', 'N', 'N', 'peer', 'meloen', 'banaan', 'sok', '011', 'banaan', 'meloen citroen', 'meloen citroen'],
  sv: ['Y', 'N', 'stol', 'sko', 'hus', 'gris', 'hatt', '0011', 'hatt', 'sand tand', 'mopp knopp'],
  da: ['Y', 'N', 'stol', 'sko', 'hus', 'gris', 'Y', '0001', 'hat', 'sand spand', 'sand tand'],
  no: ['Y', 'N', 'stol', 'rake', 'hus', 'gris', 'Y', '001', 'hatt', 'sand tann', 'sand tann'],
  fi: ['Y', 'N', 'sukka', 'muna', 'harava', 'kala', 'Y', '011', 'kuu', 'muna peruna', 'harava']
};
const TRAP = { en: ['bear', 'ear'], de: ['haus', 'hahn'], fr: ['chat', 'chapeau'], es: ['pato', 'paleta'], pt: ['gato', 'galo'], it: ['panino', 'padella'], nl: ['beer', 'bel'], sv: ['hus', 'hund'], da: ['hus', 'hund'], no: ['hus', 'hund'], fi: ['kukka', 'kukko'] };

/* ---------- pictures ---------- */
const PIC = {}; for (const f of fs.readdirSync(path.join(MT, 'pictures'))) { if (f[0] === '_') continue; const j = JSON.parse(fs.readFileSync(path.join(MT, 'pictures', f), 'utf8')); for (const [k, v] of Object.entries(j.nouns)) PIC[j.dir + '/' + k] = v.labels; }
const exact = (rel) => { let cur = path.join(ROOT, 'image-library-webp', 'themes'); for (const p of rel.split('/')) { if (!fs.existsSync(cur) || !fs.readdirSync(cur).includes(p)) return false; cur = path.join(cur, p); } return true; };
const BW = /(^|\s)(bw|sw|bn|nb|zw|sh|pb|mv|sv)(\s+\d+)?$/i;

/* 1. labels + pictures + rulings */
L.forEach(l => {
  const W = C.WORDS[l], used = new Set();
  C.ROUNDS[l].forEach(d => JSON.stringify(d.slice(1, 4)).replace(/"([^"]+)"/g, (m, w) => { if (W[w]) used.add(w); return m; }));
  for (const [k, w] of Object.entries(W)) {
    const lab = PIC[w.pic] && PIC[w.pic][l] && PIC[w.pic][l][0];
    is(!!lab && C.display(l, { word: lab }) === C.display(l, w), `${l} ${k}: the word "${w.word}" is the picture's label (${lab})`);
    is(exact(w.pic + '@2x.webp'), `${l} ${k}: picture ${w.pic} exists`);
    is(!BW.test(w.pic.split('/')[0]), `${l} ${k}: ${w.pic} is a colour theme`);
    is(l === 'en' || w.pic !== 'tools/nail', `${l} ${k}: tools/nail is the en metal nail only`);
    is(l === 'en' || !/^post office\//.test(w.pic), `${l} ${k}: no post-office art (printed POST) outside en`);
    is(w.pic !== 'kitchen tools/pan', `${l} ${k}: kitchen-tools/pan is drawn as a pot`);
    is(famOf[l][k] !== undefined, `${l} ${k}: the oracle knows its family`);
    is(used.has(k), `${l} ${k}: used in a round`);
  }
  is(Object.keys(famOf[l]).every(k => W[k]), `${l}: every oracle word is in the table`);
  C.ROUNDS[l].forEach(d => { const ws = JSON.stringify(d.slice(1, 4)).match(/"[^"]+"/g).map(x => x.slice(1, -1)).filter(x => W[x]); is(new Set(ws).size === ws.length, `${l} ${d[0]} ${d[1]}: no word twice in a round`); const pics = ws.map(x => W[x].pic); is(!(pics.includes('toys/ball') && pics.includes('toys/balloon')), `${l}: never ball beside balloon`); });
});

/* 2. a ring holds iff the words share a family — every pair */
L.forEach(l => {
  const ks = Object.keys(C.WORDS[l]); let n = 0, bad = 0;
  for (const a of ks) for (const b of ks) {
    if (a === b) continue;
    const st = C.newState({ loc: l, kind: 'field', k: 0, id: 't-' + a + b, anchor: a, choices: [b] }, 0);
    const res = C.hang(st, st.grass[0].id, 0); n++;
    if ((res.result === 'holds') !== same(l, a, b)) { bad++; if (bad < 4) console.error(`  ${l}: ${a}/${b} → ${res.result}`); }
  }
  is(bad === 0, `${l}: hang holds iff same family over ${n} pairs`);
});
is(C.rhymes(C.word('en', 'bear'), C.word('en', 'ear')) === false && C.rhymes(C.word('en', 'snail'), C.word('en', 'whale')) === true, 'en: bear/ear never links (spelling), snail/whale links');

/* 3. one right answer per round = the oracle; 6. distractors; 7. chain length */
const fmt = (r) => { const a = C.answerOf(r); if (r.kind === 'judge') return a ? 'Y' : 'N'; if (r.kind === 'sort') return a.map(x => x.length === 1 ? x[0] : 'X').join(''); if (r.kind === 'chain') return a.map(x => x.length === 1 ? x[0] : '?').join(' '); return a.join(' '); };
L.forEach(l => {
  const R = C.rounds(l);
  is(R.length === ANS[l].length && R.length >= 7, `${l}: ${R.length} rounds (oracle ${ANS[l].length}, ≥ 7)`);
  R.forEach((r, i) => {
    is(fmt(r) === ANS[l][i], `${l} ${r.id}: answer ${fmt(r)} = oracle ${ANS[l][i]}`);
    const o = (w) => famOf[l][w];
    if (r.kind === 'judge') is((o(r.a) === o(r.b)) === (ANS[l][i] === 'Y'), `${l} ${r.id}: oracle judge`);
    if (r.kind === 'pick' || r.kind === 'finish') { is(r.choices.length === 3 && r.choices.filter(c => o(c) === o(r.anchor)).length === 1, `${l} ${r.id}: exactly one of three rhymes`); }
    if (r.kind === 'field') { const k = r.choices.filter(c => o(c) === o(r.anchor)).length; is(k >= 2 && k < r.choices.length, `${l} ${r.id}: ${k} rhyme, the rest do not`); }
    if (r.kind === 'odd') { const odd = r.choices.filter(c => r.choices.filter(x => o(x) === o(c)).length === 1); is(r.choices.length === 4 && odd.length === 1 && r.choices.filter(c => c !== odd[0]).every(c => o(c) === o(r.choices.find(x => x !== odd[0]))), `${l} ${r.id}: three of four share a family, one does not`); }
    if (r.kind === 'sort') { is(r.choices.every(c => r.anchors.filter(a => o(a) === o(c)).length === 1) && o(r.anchors[0]) !== o(r.anchors[1]), `${l} ${r.id}: every pile picture fits exactly one chain`); const to = r.choices.map(c => r.anchors.findIndex(a => o(a) === o(c))); is(to.includes(0) && to.includes(1), `${l} ${r.id}: both chains get pictures`); }
    if (r.kind === 'chain') { r.steps.forEach((s, si) => is(s.length === 3 && s.filter(c => o(c) === o(r.anchor)).length === 1, `${l} ${r.id} step ${si + 1}: one of three rhymes`)); is(r.steps.length >= (l === 'fi' ? 1 : 2), `${l} ${r.id}: chain of ${r.steps.length + 1} links (3+, fi 2)`); }
    if (r.kind === 'finish') { is(r.line.includes('…') && r.sung.includes(C.display(l, C.word(l, ANS[l][i]))) && !r.sung.includes('…'), `${l} ${r.id}: the line ends in a blank and the sung line carries the answer`); is(new RegExp('(^|[^\\p{L}])' + C.display(l, C.word(l, r.anchor)) + '($|[^\\p{L}])', 'iu').test(r.line), `${l} ${r.id}: the anchor word is in Rosa's line`); }
  });
  is(R.filter(r => r.kind === 'judge').some(r => !C.answerOf(r)) && R.filter(r => r.kind === 'judge').some(r => C.answerOf(r)), `${l}: judge rounds of both kinds`);
  const kinds = new Set(R.map(r => r.kind)); is(['judge', 'pick', 'odd', 'sort', 'finish', 'field', 'chain'].every(k => kinds.has(k)), `${l}: all seven kinds`);
});

/* 4. the traps */
L.forEach(l => {
  const [a, b] = TRAP[l], r = C.rounds(l).find(x => x.kind === 'judge' && x.a === a && x.b === b);
  is(!!r && C.answerOf(r) === false, `${l}: the trap round ${a}/${b} exists and does not rhyme`);
  if (l === 'en') { is(a.slice(-3) === b.slice(-3), 'en: bear/ear is spelled alike (the spelling trap)'); const o = C.rounds('en').find(x => x.kind === 'judge' && x.a === 'bear' && x.b === 'bus'); is(!!o && C.answerOf(o) === false, 'en: the onset trap bear/bus exists and does not rhyme'); }
  else is(a[0] === b[0], `${l}: ${a}/${b} start alike (the onset trap)`);
});

/* 5. answer slots: balanced per pass, re-dealt between passes */
L.forEach(l => {
  const R = C.rounds(l);
  for (let p = 0; p < 3; p++) {
    const slots = [0, 0, 0]; let first = 0;
    R.filter(r => r.kind === 'pick' || r.kind === 'finish').forEach(r => { const d = C.deal(r, p), ans = C.answerOf(r)[0], s = d.indexOf(ans); slots[s]++; if (s === 0) first++; is(d.slice().sort().join() === r.choices.slice().sort().join(), `${l} ${r.id}: the deal keeps the choices`); });
    R.filter(r => r.kind === 'chain').forEach(r => C.deal(r, p).forEach((s, si) => { const x = s.indexOf(C.answerOf(r)[si][0]); slots[x]++; if (x === 0) first++; }));
    is(Math.max(...slots) - Math.min(...slots) <= 1, `${l} pass ${p}: answer slots ${slots} (±1)`);
    is(first <= Math.ceil((slots[0] + slots[1] + slots[2]) / 3), `${l} pass ${p}: the first slot is not favoured (${first})`);
  }
  R.filter(r => r.kind === 'odd').forEach(r => { const at = [0, 1, 2, 3].map(p => C.deal(r, p).indexOf(C.answerOf(r)[0])); is(new Set(at).size === 4, `${l} ${r.id}: the odd picture visits all four slots over four passes (${at})`); });
  R.filter(r => r.kind === 'field').forEach(r => { const keys = new Set(), ends = []; for (let p = 0; p < 6; p++) { const d = C.deal(r, p), at = d.map((c, i) => same(l, c, r.anchor) ? i : -1).filter(i => i >= 0); keys.add(at.join()); ends.push(at[0] === 0 && at[at.length - 1] === d.length - 1); } is(keys.size >= 3, `${l} ${r.id}: the rhyming pictures move between passes (${keys.size} layouts)`); is(!ends.every(Boolean), `${l} ${r.id}: not always at both ends`); });
  R.filter(r => r.kind === 'sort').forEach(r => { for (let p = 0; p < 3; p++) { const d = C.deal(r, p); let run = 1, max = 1; for (let i = 1; i < d.length; i++) { run = same(l, d[i], d[i - 1]) ? run + 1 : 1; max = Math.max(max, run); } is(max < Math.max(3, d.length - 1), `${l} ${r.id} pass ${p}: the pile is mixed (run ${max})`); } });
});

/* 8. order over 10,000 seeds */
(() => {
  let s = 99; const rnd = () => { s = (s * 1103515245 + 12345) >>> 0; return s / 4294967296; };
  L.forEach(l => {
    const R = C.rounds(l); let bad = 0, same0 = 0, prev = null; const firstSeen = new Set();
    for (let t = 0; t < 10000 / L.length; t++) {
      const o = C.order(R, rnd, prev);
      if (o.slice().sort((a, b) => a - b).join() !== R.map((_, i) => i).join()) bad++;
      if (R[o[0]].kind !== 'pick') bad++;
      for (let i = 1; i < o.length; i++) { if (R[o[i]].kind === 'finish' && R[o[i - 1]].kind === 'finish') bad++; if (i > 1 && R[o[i]].kind === R[o[i - 1]].kind && R[o[i]].kind === R[o[i - 2]].kind) bad++; }
      if (prev && prev.join() === o.join()) same0++;
      firstSeen.add(o[0]); prev = o;
    }
    is(bad === 0, `${l}: every order is a permutation, starts with a PICK, no FINISH pair, no kind three in a row`);
    is(same0 === 0, `${l}: a pass never repeats the previous order`);
    is(firstSeen.size === R.filter(r => r.kind === 'pick').length, `${l}: every PICK round opens a pass sometimes`);
  });
})();

/* 9. strings ×11 */
const STR = (() => { const ctx = { window: {}, RhymeChainCore: C, document: undefined }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MT, 'rhyme-chain-activity.js'), 'utf8') + '\n;this.__A = RhymeChainActivity;', ctx); return ctx.__A; })();
const S = STR.strings, ph = (s) => (s.match(/\{\w+\}/g) || []).map(x => x.toLowerCase()).sort().join();
for (const k of Object.keys(S)) for (const l of L) {
  const v = S[k][l];
  is(typeof v === 'string' && v.trim().length > 0, `strings ${k}.${l} present`);
  if (v) { is(ph(v) === ph(S[k].en), `strings ${k}.${l}: placeholders ${ph(v)} = en ${ph(S[k].en)}`); if (l === 'fr') is(!/ [?!:;]/.test(v), `strings ${k}.fr: U+202F before ? ! : ;`); is(!/\b(free|gratis|kostenlos|gratuit|ilmai)/i.test(v), `strings ${k}.${l}: no price word`); }
}
const declared = new Set(Object.keys(S)), src = fs.readFileSync(path.join(MT, 'rhyme-chain-activity.js'), 'utf8').split('/*STRINGS-END*/')[1];
const hintKeys = new Set(); ['hintEmpty', 'hintJudge', 'hintOddEmpty', 'hintEnds', 'hintOdd', 'hintMore', 'hintChainMore', 'hintPattern', 'hintPatternJudge', 'hintPatternOdd'].forEach(k => hintKeys.add(k));
for (const k of declared) is(k === 'title' || k === 'instruction' || hintKeys.has(k) || src.includes("'" + k + "'"), `string ${k} is referenced`);

/* 10. layout */
for (let W = 260; W <= 1366; W += 2) { const Ly = C.layout(W); if (W < 560) { if (Ly.card < 64 || Ly.card * 3 + 3 * 8 + Ly.wagon > W + 140) { is(false, `layout ${W}: narrow card ${Ly.card}`); break; } } else if (Ly.card !== 96) { is(false, `layout ${W}: wide card 96`); break; } }
is(true, 'layout: cards ≥ 64 on phones, 96 wide');

/* 11. the hint ladder */
(() => {
  const R = C.rounds('en'), get = (id) => R.find(r => r.id === id);
  let st = C.newState(get('pick-snail'), 0);
  is(C.pull(st).result === 'empty' && st.misses === 0 && C.hint(st) === 'hintEmpty', 'pick: pull with nothing — asks, no miss');
  const bee = st.grass.find(c => c.key === 'bee'), key = st.grass.find(c => c.key === 'key'), whale = st.grass.find(c => c.key === 'whale');
  is(C.hang(st, bee.id, 0).result === 'falls' && st.misses === 1 && C.hint(st) === 'hintEnds' && st.grass.includes(bee) && bee.revealed, 'pick: a wrong picture falls back (miss 1, its ring now known)');
  is(C.hang(st, key.id, 0).result === 'falls' && st.help === 2 && C.hint(st) === 'hintPattern', 'pick: miss 2 shows every pattern');
  is(C.showsPattern(st, whale, false) === true, 'pick: at help 2 the candidates show their pattern');
  is(C.hang(st, whale.id, 0).result === 'holds' && st.done && C.hint(st) === null, 'pick: the rhyme holds — done');
  st = C.newState(get('pick-snail'), 0); const w2 = st.grass.find(c => c.key === 'whale');
  is(C.showsPattern(st, w2, false) === false && C.showsPattern(st, w2, true) === true, 'patterns: hidden until hung, unless "Always"');
  st = C.newState(get('field-dog'), 0); const bus = st.grass.find(c => c.key === 'bus'), log = st.grass.find(c => c.key === 'log');
  is(C.hang(st, bus.id, 0).result === 'falls' && st.show && C.hint(st) === 'hintEnds', 'field: bus falls (miss 1)');
  C.hang(st, log.id, 0); is(!st.show && C.hint(st) === null, 'field: a new move takes the help away'); is(C.pull(st).result === 'more' && C.hint(st) === 'hintMore' && st.last.k === 1 && st.misses === 1 && !st.done, 'field: one of two hung — "1 more", no new miss');
  C.hang(st, st.grass.find(c => c.key === 'frog').id, 0); is(C.pull(st).result === 'ok' && st.done, 'field: both hung — done');
  st = C.newState(get('chain-boat'), 0);
  is(st.grass.map(c => c.key).sort().join() === 'bee,goat,sun', 'chain: step 1 offers goat/sun/bee');
  C.hang(st, st.grass.find(c => c.key === 'goat').id, 0);
  is(st.grass.map(c => c.key).sort().join() === 'cat,coat,key' && C.pull(st).result === 'more' && C.hint(st) === 'hintChainMore', 'chain: step 2 comes; pulling early asks for a link');
  C.hang(st, st.grass.find(c => c.key === 'coat').id, 0); is(C.pull(st).result === 'ok' && st.chains[0].links.map(c => c.key).join() === 'goat,coat', 'chain: boat, goat, coat');
  st = C.newState(get('sort-whale-cat'), 0);
  const hat = st.grass.find(c => c.key === 'hat');
  is(C.hang(st, hat.id, 0).result === 'falls' && C.hang(st, hat.id, 1).result === 'holds', 'sort: hat falls off the whale chain and holds on the cat chain');
  for (let g = 0; g < 12 && st.grass.length; g++) { const c = st.grass[0]; C.hang(st, c.id, ['EYL', 'AT'].indexOf(c.rime)); } /* bounded: a gate loop never waits on the tool */
  is(C.pull(st).result === 'ok' && st.chains[0].links.length === 2 && st.chains[1].links.length === 2, 'sort: every picture on its chain');
  st = C.newState(get('odd-snail'), 0);
  is(C.pull(st).result === 'empty' && C.hint(st) === 'hintOddEmpty', 'odd: pull with nothing marked — asks');
  const nailL = st.chains[0].links.find(c => c.key === 'nail'), beeL = st.chains[0].links.find(c => c.key === 'bee');
  C.pickOdd(st, nailL.id); is(C.pull(st).result === 'wrong' && C.hint(st) === 'hintOdd' && st.misses === 1, 'odd: a rhyming picture marked — miss');
  C.pickOdd(st, beeL.id); is(st.oddPick === beeL.id && C.pull(st).result === 'ok' && st.done, 'odd: the bee marked — it falls, done');
  st = C.newState(get('judge-bear-ear'), 0);
  is(C.pull(st).result === 'empty' && C.hint(st) === 'hintJudge', 'judge: pull before answering — asks');
  is(C.answerJudge(st, true).result === 'wrong' && C.hint(st) === 'hintEnds', 'judge: "rhymes" for bear/ear — miss 1');
  C.answerJudge(st, true); is(C.hint(st) === 'hintPatternJudge', 'judge: miss 2 — look at the patterns');
  is(C.answerJudge(st, false).result === 'ok' && st.done, 'judge: "does not rhyme" — done');
})();

/* 12. the manifest */
const rows = JSON.parse(fs.readFileSync(path.join(MT, 'rhyme-chain-activities.json'), 'utf8'));
is(rows.length === 1 && rows[0].id === 'rhyme-shop.rhyme.rf-k-2-a' && rows[0].tool === 'rhyme-chain-activity', 'manifest: one row, the kept id, the new tool');
is(JSON.parse(fs.readFileSync(path.join(MT, 'rhyme-shop-activities.json'), 'utf8')).length === 0, 'rhyme-shop manifest emptied');
L.forEach(l => { is(JSON.stringify(rows[0].params.roundsL10n[l]) === JSON.stringify(C.rounds(l).map(r => ({ id: r.id, kind: r.kind }))), `manifest ${l}: rounds mirror the core`); for (const k of ['slug', 'page_title', 'page_intro']) is(!!rows[0][k][l], `manifest ${l}: ${k}`); });
let HEAD = null; try { HEAD = JSON.parse(cp.execSync('git show HEAD:"mini tools/rhyme-shop-activities.json"', { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] })); } catch (e) { HEAD = null; }
if (HEAD && HEAD.length) { const o = HEAD[0]; for (const k of ['slug', 'page_title', 'page_intro']) for (const l of Object.keys(o[k])) is(o[k][l] === rows[0][k][l], `manifest ${k}.${l}: frozen`); is(JSON.stringify(o.alignment) === JSON.stringify(rows[0].alignment), 'manifest: alignment kept'); }
else { const o = JSON.parse(cp.execSync('git show 2ec44bf3:"mini tools/rhyme-shop-activities.json"', { cwd: ROOT, encoding: 'utf8' }))[0]; for (const k of ['slug', 'page_title', 'page_intro']) for (const l of Object.keys(o[k])) is(o[k][l] === rows[0][k][l], `manifest ${k}.${l}: frozen`); }
for (const l of ['fr']) for (const k of ['page_title', 'page_intro']) is(!/ [?!:;]/.test(rows[0][k][l]), `manifest ${k}.fr: U+202F`);
for (const l of L) is(!/\b(free|gratis|kostenlos|gratuit|ilmai)/i.test(rows[0].page_intro[l] + rows[0].page_title[l]), `manifest ${l}: no price word`);

console.log(`verify-rhyme-chain-core: ${PASS} pass, ${FAIL} fail`);
process.exit(FAIL ? 1 : 0);
