#!/usr/bin/env node
/* =====================================================================
   verify-group-photo-core.js — the build gate for ACTIVITY #131, The Group
   Photo (Ziggy's Odd One Out, L.1.5.a), all 11 locales.
   ---------------------------------------------------------------------
   It does NOT trust the core's data. Its own ground truth:
     · its own table of what every picture IS (animal, bird, insect, food,
       fruit, vehicle, clothing, flower, kitchen thing) and what it is MADE
       OF — so every bench round must have exactly ONE seat whose removal
       leaves a group sharing a kind that seat lacks, and the caption must be
       that kind;
     · its own reading of the committed picture labels (git HEAD) plus its
       own short list of overrides, so every seat shows its true word;
     · its own word fields per locale (level 4): four cards of one field and
       the odd card of the other, no card in both;
     · its own brute-force solver for the seat plan: exactly one solution,
       every clue needed, every true/false sentence true or false of it;
     · its own rule for the name tags: a wrong tag is never true of every
       member.
   Then the model: the step, the shutter (empty → a hint and no miss; wrong →
   a cloudy photo; second wrong → the members sharp, the name pencilled, the
   odd one blurred; right → sharp), "I name it", the seat plan's stones (a ✓
   pushes Xs, lifting it lifts only those), the plan check, the misses and
   the glowing cell, the two sentences; the plan (fresh order every pass,
   the odd one's seat balanced); strings ×11 (no digit in a hint, never
   "free", fr/it typography, every key reached); prose and the manifest.
   Usage: node scripts/verify-group-photo-core.js   (GP_CORE / GP_ACT / GP_MANIFEST override the files for the mutation harness)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), { execSync } = require('child_process'), vm = require('vm');
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools');
const CORE = process.env.GP_CORE || path.join(MINI, 'group-photo-core.js');
const ACTF = process.env.GP_ACT || path.join(MINI, 'group-photo-activity.js');
const MAN = process.env.GP_MANIFEST || path.join(MINI, 'ziggy-odd-one-out-activities.json');
const ID = 'ziggy-odd-one-out.category.l-1-5-a';
const C = require(CORE);
const ACT = (() => { const ctx = { window: {}, GroupPhotoCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(ACTF, 'utf8') + '\n;this.__A = window.GroupPhotoActivity;', ctx); return ctx.__A; })();
const LOCS = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
let PASS = 0, FAIL = 0;
const ok = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL <= 80) console.error('  FAIL: ' + m); } };

/* ---------- the gate's own truth ---------- */
const AN = 'animal';
const IS = {
  'animals/dog': [AN], 'animals/cat': [AN], 'animals/pig': [AN], 'animals/fish': [AN], 'animals/zebra': [AN], 'animals/fox': [AN], 'animals/swan': [AN, 'bird'], 'animals/owl': [AN, 'bird'], 'animals/duck': [AN, 'bird'],
  'birds 2/robin': [AN, 'bird'], 'birds 2/parrot': [AN, 'bird'], 'Things That Fly/bat': [AN], 'farm animals/chick': [AN, 'bird'], 'farm animals/pig': [AN], 'farm animals/duck': [AN, 'bird'],
  'farm animals/bee': [AN, 'insect'], 'forest creatures/ant': [AN, 'insect'], 'spring/butterfly': [AN, 'insect'], 'forest creatures/ladybug': [AN, 'insect'],
  'At the Supermarket/apple': ['food', 'fruit'], 'At the Supermarket/banana': ['food', 'fruit'], 'At the Supermarket/pear': ['food', 'fruit'], 'At the Supermarket/cherry': ['food', 'fruit'],
  'At the Supermarket/bread': ['food'], 'At the Supermarket/jam': ['food', 'glass'], 'At the Supermarket/carrot': ['food', 'vegetable'], 'desserts and sweets/lollipop': ['food'],
  'vehicles/car': ['vehicle'], 'vehicles/train': ['vehicle'], 'vehicles/boat': ['vehicle'], 'vehicles/helicopter': ['vehicle'], 'toys/kite': ['toy'], 'toys/ball': ['toy'], 'music/drum': ['toy'],
  'accessories/hat': ['clothing'], 'accessories/sock': ['clothing'], 'clothing/shoe': ['clothing'], 'accessories/mitten': ['clothing'], 'accessories/scarf': ['clothing'], 'At the Supermarket/bag': ['paper'],
  'flowers/rose': ['flower'], 'flowers/tulip': ['flower'], 'flowers/sunflower': ['flower'], 'flowers/daffodil': ['flower'],
  'around the house/cup': ['kitchen'], 'around the house/spoon': ['kitchen'], 'around the house/fork': ['kitchen'], 'kitchen tools/glass': ['kitchen', 'glass'], 'kitchen tools/jar': ['kitchen', 'glass'], 'kitchen tools/bottle': ['glass'],
  'At the Supermarket/can': ['metal'], 'tools/bolt': ['metal'], 'tools/nail': ['metal'], 'At the Supermarket/water': ['plastic'], 'At the Supermarket/shampoo': ['plastic'], 'At the Supermarket/juice': ['plastic'],
  'post office/envelope': ['paper'], 'post office/package': ['paper'], 'camping/log': ['wood'],
  'classroom/book': ['paper'], 'classroom/notebook': ['paper'], 'kitchen tools/spoon': ['kitchen', 'plastic'], 'At the Supermarket/toothbrush': ['plastic'],
  'At the Supermarket/oil': ['food', 'glass'], 'At the Supermarket/milk': ['food', 'glass']
};
/* the core's kind ids → the gate's kind words */
const KIND = { animals: AN, birds: 'bird', insects: 'insect', food: 'food', fruit: 'fruit', vehicles: 'vehicle', clothes: 'clothing', flowers: 'flower', kitchen: 'kitchen', glass: 'glass', plastic: 'plastic', paper: 'paper', metal: 'metal', move: 'move', look: 'look' };
/* labels: what the gate expects under each picture */
const OVERRIDE = {
  'At the Supermarket/water': { en: 'water bottle', de: 'Wasserflasche', fr: 'bouteille d’eau', es: 'botella de agua', pt: 'garrafa de água', it: 'bottiglia d’acqua', nl: 'waterfles', sv: 'vattenflaska', da: 'vandflaske', no: 'vannflaske', fi: 'vesipullo' },
  'At the Supermarket/juice': { en: 'juice bottle', de: 'Saftflasche', fr: 'bouteille de jus', es: 'botella de jugo', pt: 'garrafa de suco', it: 'bottiglia di succo', nl: 'sapfles', sv: 'juiceflaska', da: 'juiceflaske', no: 'juiceflaske', fi: 'mehupullo' },
  'At the Supermarket/shampoo': { en: 'shampoo bottle', de: 'Shampooflasche', fr: 'flacon de shampooing', es: 'botella de champú', pt: 'frasco de xampu', it: 'flacone di shampoo', nl: 'shampoofles', sv: 'schampoflaska', da: 'shampooflaske', no: 'sjampoflaske', fi: 'shampoopullo' },
  'kitchen tools/jar': { de: 'Schraubglas' }, 'At the Supermarket/can': { sv: 'konservburk' },
  'At the Supermarket/jam': { en: 'jam jar', de: 'Marmeladenglas', fr: 'pot de confiture', es: 'frasco de mermelada', pt: 'pote de geleia', it: 'barattolo di marmellata', nl: 'jampot', sv: 'syltburk', da: 'syltetøjsglas', no: 'syltetøyglass', fi: 'hillopurkki' },
  'At the Supermarket/oil': { en: 'oil bottle', de: 'Ölflasche', fr: 'bouteille d’huile', es: 'botella de aceite', pt: 'garrafa de óleo', it: 'bottiglia d’olio', nl: 'oliefles', sv: 'oljeflaska', da: 'olieflaske', no: 'oljeflaske', fi: 'öljypullo' },
  'At the Supermarket/milk': { en: 'milk bottle', de: 'Milchflasche', fr: 'bouteille de lait', es: 'botella de leche', pt: 'garrafa de leite', it: 'bottiglia di latte', nl: 'melkfles', sv: 'mjölkflaska', da: 'mælkeflaske', no: 'melkeflaske', fi: 'maitopullo' },
  'accessories/mitten': { es: 'guante', pt: 'luva', it: 'manopola' }, 'camping/log': { pt: 'tronco', it: 'tronco' }, 'vehicles/car': { it: 'macchina' },
  'At the Supermarket/bag': { nl: 'zak', fi: 'pussi' }
};
const THEMES = {};
const vocab = (pic, l) => {
  const dir = pic.split('/')[0], t = dir.toLowerCase().replace(/ /g, '-'), n = pic.split('/').slice(1).join('/');
  if (!THEMES[t]) THEMES[t] = JSON.parse(execSync('git show HEAD:"mini tools/pictures/' + t + '.json"', { cwd: REPO, encoding: 'utf8', maxBuffer: 1e8 }));
  const e = THEMES[t].nouns[n]; return e ? e.labels[l][0] : null;
};
const expectLabel = (pic, l) => { const o = OVERRIDE[pic] && OVERRIDE[pic][l]; if (o) return o; const v = vocab(pic, l); if (!v) return null; return l === 'de' ? v : v.toLocaleLowerCase(l); };
const typo = (l, s) => (l === 'fr' || l === 'it') ? s.replace(/'/g, '’') : s;
/* level 4: the gate's own word fields */
const FIELD = {
  en: [['walk', 'run', 'hop', 'march', 'stroll', 'dash', 'skip', 'climb', 'jump'], ['look', 'peek', 'stare', 'glance', 'watch']],
  de: [['gehen', 'rennen', 'hüpfen', 'springen', 'klettern', 'schleichen', 'marschieren'], ['schauen', 'gucken', 'starren', 'spähen', 'beobachten', 'betrachten']],
  fr: [['marcher', 'courir', 'sauter', 'grimper', 'ramper', 'trottiner', 'sautiller'], ['regarder', 'observer', 'admirer', 'guetter', 'contempler', 'jeter un coup d’œil']],
  es: [['caminar', 'correr', 'saltar', 'trepar', 'gatear', 'pasear', 'marchar'], ['mirar', 'observar', 'ver', 'espiar', 'admirar', 'echar un vistazo']],
  pt: [['andar', 'correr', 'pular', 'escalar', 'engatinhar', 'passear', 'marchar'], ['olhar', 'observar', 'ver', 'espiar', 'encarar', 'contemplar']],
  it: [['camminare', 'correre', 'saltare', 'arrampicarsi', 'gattonare', 'passeggiare', 'marciare'], ['guardare', 'osservare', 'sbirciare', 'fissare', 'ammirare', 'scrutare']],
  nl: [['lopen', 'rennen', 'springen', 'huppelen', 'klimmen', 'kruipen', 'wandelen'], ['kijken', 'gluren', 'staren', 'turen', 'loeren', 'bekijken']],
  sv: [['gå', 'springa', 'hoppa', 'klättra', 'krypa', 'promenera', 'marschera'], ['titta', 'kika', 'stirra', 'kolla', 'spana', 'betrakta']],
  da: [['gå', 'løbe', 'hoppe', 'klatre', 'kravle', 'spadsere', 'marchere'], ['kigge', 'se', 'stirre', 'spejde', 'titte', 'betragte']],
  no: [['gå', 'løpe', 'hoppe', 'klatre', 'krype', 'spasere', 'marsjere'], ['se', 'titte', 'kikke', 'stirre', 'speide', 'betrakte']],
  fi: [['kävellä', 'juosta', 'hypätä', 'kiivetä', 'ryömiä', 'kipittää', 'marssia'], ['katsoa', 'kurkistaa', 'tuijottaa', 'vilkaista', 'tarkkailla', 'katsella']]
};
const fieldOf = (l, w) => { const a = FIELD[l][0].indexOf(w) >= 0, b = FIELD[l][1].indexOf(w) >= 0; return a && b ? 'both' : a ? 'move' : b ? 'look' : null; };
/* the seat plan: the gate's own solver over the six ways to share three things */
const PERMS = [[0, 1, 2], [0, 2, 1], [1, 0, 2], [1, 2, 0], [2, 0, 1], [2, 1, 0]];
const holds = (c, s) => c[0] === 'has' ? s[c[1]] === c[2] : c[0] === 'not' ? s[c[1]] !== c[2] : (s[c[1]] === c[2] || s[c[1]] === c[3]);
const solve = (clues) => PERMS.filter(s => clues.every(c => holds(c, s)));

/* ---------- 1. the rounds ---------- */
for (const l of LOCS) {
  for (const lv of ['1', '2', '3', '4']) {
    const n = C.rounds(lv).length; ok(n === { '1': 8, '2': 9, '3': 8, '4': 8 }[lv], `L${lv}: ${n} rounds`);
    for (let r = 0; r < n; r++) {
      const rd = C.round(l, lv, r), tag = `${l} L${lv}.${r + 1}`, want = lv === '2' || lv === '4' ? 5 : 4;
      ok(rd.seats.length === want, `${tag}: ${want} seats`);
      ok(rd.odd >= 0 && rd.odd < rd.seats.length, `${tag}: an odd seat`);
      ok(rd.caption === typo(l, rd.caption) && rd.caption.length > 1, `${tag}: a caption`);
      if (lv === '4') {
        const f = rd.seats.map(s => fieldOf(l, s.w)); ok(f.every(x => x === 'move' || x === 'look'), `${tag}: every card in exactly one field (${rd.seats.map(s => s.w)})`);
        const mem = f.filter((_, i) => i !== rd.odd); ok(mem.every(x => x === KIND[rd.cat]) && f[rd.odd] !== KIND[rd.cat] && f[rd.odd] !== 'both', `${tag}: four of ${rd.cat}, the odd card of the other field`);
        ok(new Set(rd.seats.map(s => s.w)).size === 5, `${tag}: five different cards`);
        continue;
      }
      const kinds = rd.seats.map(s => IS[s.pic]); ok(kinds.every(Boolean), `${tag}: the gate knows every picture (${rd.seats.map(s => s.pic)})`);
      if (!kinds.every(Boolean)) continue;
      const shared = (ids) => { const k = kinds[ids[0]].filter(x => ids.every(i => kinds[i].indexOf(x) >= 0)); return k; };
      /* exactly one seat whose removal leaves a group sharing a kind that seat lacks */
      const odds = rd.seats.map((_, i) => i).filter(i => { const rest = rd.seats.map((_, j) => j).filter(j => j !== i); return shared(rest).some(k => kinds[i].indexOf(k) < 0); });
      ok(odds.length === 1 && odds[0] === rd.odd, `${tag}: exactly one odd one, and it is the round's (gate finds ${odds.map(i => rd.seats[i].pic)})`);
      const rest = rd.seats.map((_, j) => j).filter(j => j !== rd.odd);
      ok(shared(rest).indexOf(KIND[rd.cat]) >= 0 && kinds[rd.odd].indexOf(KIND[rd.cat]) < 0, `${tag}: the caption ${rd.cat} names every member and not the odd one`);
      /* the name tags */
      ok(rd.tags.length === 3 && rd.tags.filter(t => t.right).length === 1 && rd.tags.find(t => t.right).id === rd.cat, `${tag}: three tags, the caption right`);
      ok(rd.caption === rd.tags.find(t => t.right).word && rd.tags.every(t => t.right || t.word !== rd.caption), `${tag}: the photo's caption is the right tag's word («${rd.caption}»)`);
      rd.tags.filter(t => !t.right).forEach(t => ok(!rest.every(i => kinds[i].indexOf(KIND[t.id]) >= 0), `${tag}: the wrong tag ${t.id} is true of every member`));
      /* labels */
      rd.seats.forEach((s, i) => { const e = expectLabel(s.pic, l); ok(e && s.label === typo(l, e), `${tag}: seat ${i + 1} label «${s.label}» should be «${e}»`); });
      ok(new Set(rd.seats.map(s => s.label.toLowerCase())).size === rd.seats.length, `${tag}: no two seats read alike`);
      rd.seats.forEach(s => ok(!/BW|SW|BN|NB|ZW|SH|PB|MV|SV/.test(s.pic.split('/')[0].split(' ').pop()), `${tag}: ${s.pic} is a colour theme`));
      rd.seats.forEach(s => ok(fs.existsSync(path.join(REPO, 'image-library-webp', 'themes', s.pic + '@2x.webp')), `${tag}: ${s.pic}@2x.webp exists`));
    }
  }
  /* level 5 */
  ok(C.rounds('5').length === 8, 'L5: eight puzzles');
  let trues = 0, firstTrue = 0;
  for (let r = 0; r < 8; r++) {
    const rd = C.round(l, '5', r), tag = `${l} L5.${r + 1}`, clues = rd.clues.map(c => c.c), sols = solve(clues);
    ok(sols.length === 1 && sols[0].join() === rd.sol.join(), `${tag}: exactly one solution (${sols.length}) and it is the round's`);
    clues.forEach((_, i) => ok(solve(clues.filter((__, j) => j !== i)).length >= 2, `${tag}: clue ${i + 1} is needed`));
    rd.tf.forEach(t => ok((rd.sol[t.f] === t.t) === t.truth, `${tag}: the sentence «${t.text}» is ${t.truth}`));
    trues += rd.tf.filter(t => t.truth).length; if (rd.tf[0].truth) firstTrue++;
    ok(rd.tf.length === 2 && rd.tf[0].truth !== rd.tf[1].truth, `${tag}: one true and one false sentence`);
    rd.clues.concat(rd.tf).forEach(c => ok(/^\p{Lu}/u.test(c.text) && /\.$/.test(c.text) && !/[{}]/.test(c.text) && c.text === typo(l, c.text), `${tag}: a whole sentence «${c.text}»`));
    rd.friends.concat(rd.things).forEach(x => ok(fs.existsSync(path.join(REPO, 'image-library-webp', 'themes', x.pic + '@2x.webp')) && x.label, `${tag}: ${x.pic} exists and is labelled`));
    /* the propagation the hint uses reaches the whole solution */
    const fx = C.forced(rd); ok(fx.length === 3 && fx.every(c => rd.sol[c[0]] === c[1]), `${tag}: the clues read by elimination give the solution`);
  }
  ok(trues === 8 && firstTrue === 4, `${l} L5: 8 true / 8 false sentences, the true one first in 4 (${trues}, ${firstTrue})`);
  if (l === 'fi') ok(C.round('fi', '5', 3).clues.every(c => /ei ole \S+a\./.test(c.text) || c.c[0] !== 'not'), 'fi: a negative clue takes the partitive');
}

/* ---------- 2. the model ---------- */
const st0 = (lv, r, cap) => C.newState('en', lv, r, null, null, cap);
for (const lv of ['1', '2', '3', '4']) for (const r of C.rounds(lv)) {
  let st = st0(lv, r, 'show'); const rd = st.rd, wrong = rd.odd === 0 ? 1 : 0, wrong2 = rd.odd === 2 ? 3 : 2, tag = `L${lv}.${r + 1}`;
  ok(C.snap(st).result === 'empty' && st.misses === 0 && C.hint(st) === 'hintStep', `${tag}: the shutter with nobody on the step is a hint, no miss`);
  C.send(st, wrong); ok(st.step === wrong, `${tag}: a seat goes to the step`);
  let res = C.snap(st); ok(res.result === 'miss' && st.misses === 1 && !st.photo.sharp && !st.photo.pencil && st.photo.members.length === 0, `${tag}: miss 1 is a cloudy photo with no name`);
  ok(C.hint(st) === 'miss1', `${tag}: the miss-1 hint`);
  C.send(st, wrong2); ok(st.step === wrong2 && st.photo === null, `${tag}: another seat swaps onto the step and the photo goes`);
  res = C.snap(st); ok(st.misses === 2 && st.photo.pencil && st.photo.blurred.join() === String(rd.odd) && st.photo.members.indexOf(rd.odd) < 0 && st.photo.members.length === rd.seats.length - 2, `${tag}: miss 2 — the members sharp, the odd one blurred`);
  ok(C.hint(st) === 'miss2', `${tag}: the miss-2 hint`);
  C.send(st, wrong2); ok(st.step === null, `${tag}: the same seat again comes back`);
  C.send(st, rd.odd); res = C.snap(st); ok(res.result === 'ok' && st.done && st.photo.sharp && st.photo.caption, `${tag}: the odd one on the step → a sharp photo with its name`);
  ok(C.send(st, 0) === 'no' && C.snap(st).result === 'no', `${tag}: a done round takes no more moves`);
  const line = C.okLine(st, a => a.join(' | ')), named = line.slice(rd.all.length).replace(/^ ?: /, '').replace(/\.$/, '').split(' | ');
  ok(line.indexOf(rd.all) === 0 && named.join() === rest(rd).map(s => s.label).join() && named.indexOf(rd.seats[rd.odd].label) < 0, `${tag}: the success line names every member and not the odd one`);
  /* I name it */
  st = st0(lv, r, 'name'); C.send(st, st.rd.odd); res = C.snap(st); ok(res.result === 'name' && !st.done && st.phase === 'name' && !st.photo.caption, `${tag}: "I name it" → a sharp photo waiting for its name`);
  const bad = st.rd.tags.findIndex(t => !t.right), good = st.rd.tags.findIndex(t => t.right);
  ok(C.tag(st, bad).result === 'miss' && st.off.indexOf(bad) >= 0 && !st.done && C.hint(st) === 'nameWrong', `${tag}: a wrong name slides off`);
  ok(C.tag(st, bad).result === 'no', `${tag}: a slid-off name cannot be picked again`);
  ok(C.tag(st, good).result === 'ok' && st.done && st.photo.caption, `${tag}: the right name finishes the photo`);
}
function rest(rd) { return rd.seats.filter((_, i) => i !== rd.odd); }
/* the seat plan */
for (const r of C.rounds('5')) {
  const tag = `L5.${r + 1}`; let st = st0('5', r); const rd = st.rd;
  ok(C.checkPlan(st).result === 'empty' && st.misses === 0 && C.hint(st) === 'hintGrid', `${tag}: an empty plan is a hint, no miss`);
  ok(C.cell(st, 0, 0) === 'x' && st.cells[0][0] === 'x' && st.by[0][0] === null, `${tag}: one tap is the child's own X`);
  C.cell(st, 1, 1); C.cell(st, 1, 1); ok(st.cells[1][1] === 'v', `${tag}: two taps are a tick`);
  ok(st.cells[1][0] === 'x' && st.cells[1][2] === 'x' && st.cells[0][1] === 'x' && st.cells[2][1] === 'x' && st.by[1][0] === '1,1', `${tag}: a tick pushes Xs into its row and column`);
  ok(st.cells[0][0] === 'x' && st.by[0][0] === null, `${tag}: the child's own X stays the child's`);
  C.cell(st, 1, 1); ok(st.cells[1][1] === 'e' && st.cells[1][0] === 'e' && st.cells[0][1] === 'e' && st.cells[0][0] === 'x', `${tag}: lifting the tick lifts only the Xs it pushed`);
  C.cell(st, 2, 0); C.cell(st, 2, 2); C.cell(st, 2, 2); C.cell(st, 2, 2); ok(st.cells[2][2] === 'e' && st.cells[2][0] === 'x' && st.cells[2][1] === 'e', `${tag}: the child's own X in the tick's row stays when the tick is lifted`);
  C.cell(st, 0, 2); C.cell(st, 0, 2); ok(st.cells[0][1] === 'x' && st.by[0][1] === '0,2', `${tag}: the tick's row is pushed`);
  C.cell(st, 0, 1); ok(st.cells[0][1] === 'v' && st.cells[0][2] !== 'v' && st.by[1][2] === null && st.cells[1][2] !== 'x', `${tag}: a pushed X tapped once is a tick, and the old tick moves away with its Xs`);
  /* a wrong full plan */
  st = st0('5', r); const wrongSol = PERMS.find(s => s.join() !== rd.sol.join() && s.some((t, f) => t !== rd.sol[f]));
  const place = (s) => s.forEach((t, f) => { while (st.cells[f][t] !== 'v') C.cell(st, f, t); });
  place(wrongSol); let res = C.checkPlan(st);
  const wrongRows = wrongSol.map((t, f) => t !== rd.sol[f] ? f : -1).filter(f => f >= 0);
  ok(res.result === 'miss' && st.misses === 1 && st.wrong.length === wrongRows.length && st.wrong.every(w => wrongSol[w[0]] === w[1] && wrongRows.indexOf(w[0]) >= 0), `${tag}: miss 1 marks exactly the wrong ticks`);
  const lit = rd.clues.map((c, i) => st.wrong.some(w => !holdsCell(c.c, w[0], w[1])) ? i : -1).filter(i => i >= 0);
  ok(st.lit.join() === lit.join() && st.glow === null && C.hint(st) === 'gridMiss1', `${tag}: miss 1 lights the clues the wrong ticks break (${st.lit} vs ${lit})`);
  res = C.checkPlan(st); ok(st.misses === 2 && st.glow && rd.sol[st.glow[0]] === st.glow[1] && wrongSol[st.glow[0]] !== st.glow[1] && C.hint(st) === 'gridMiss2', `${tag}: miss 2 glows a certain cell in a wrong row`);
  st = st0('5', r); place(rd.sol); res = C.checkPlan(st); ok(res.result === 'plan' && st.phase === 'tf' && !st.done && C.hint(st) === 'tfAsk', `${tag}: the right plan → the two sentences`);
  ok(C.cell(st, 0, 0) === 'no', `${tag}: a photographed plan takes no stones`);
  const t0 = rd.tf[0].truth; ok(C.answer(st, 0, !t0).result === 'miss' && st.tfMiss === 0 && C.hint(st) === 'tfWrong' && !st.done, `${tag}: a wrong lamp is a miss`);
  ok(C.answer(st, 0, t0).result === 'right' && !st.done, `${tag}: the first sentence right`);
  ok(C.answer(st, 1, rd.tf[1].truth).result === 'ok' && st.done, `${tag}: both right → done`);
  ok(C.okLine(st, a => a.join()) === rd.solved, `${tag}: the success line reads the plan`);
}
function holdsCell(c, f, t) { return c[0] === 'has' ? (f === c[1]) === (t === c[2]) : c[0] === 'not' ? !(f === c[1] && t === c[2]) : !(f === c[1] && t !== c[2] && t !== c[3]); }

/* ---------- 3. the plan ---------- */
let seed = 7; const rnd = () => { seed = (seed * 1103515245 + 12345) % 2147483648; return seed / 2147483648; };
for (const lv of ['1', '2', '3', '4', '5']) {
  let prev = null, firstTag = 0, tagN = 0, posHits = 0, posN = 0;
  for (let p = 0; p < 200; p++) {
    const P = C.plan('en', lv, rnd, prev);
    ok(P.order.slice().sort((a, b) => a - b).join() === C.rounds(lv).join(), `L${lv}: a pass is every round once`);
    if (prev) ok(P.order.join() !== prev.join(), `L${lv}: a fresh order every pass`);
    prev = P.order;
    if (lv === '5') continue;
    const n = C.seatsOf(lv), cnt = new Array(n).fill(0);
    P.order.forEach(r => { const rd = C.round('en', lv, r, P.perms[r], P.tags[r]); cnt[rd.odd]++; firstTag += rd.tags[0].right ? 1 : 0; tagN++; posHits += rd.odd === 0 ? 1 : 0; posN++;
      ok(rd.seats.map(s => s.pic || s.w).sort().join() === C.round('en', lv, r).seats.map(s => s.pic || s.w).sort().join(), `L${lv}: the plan only reorders the seats`); });
    const max = Math.ceil(P.order.length / n); ok(Math.max(...cnt) <= max && Math.min(...cnt) >= Math.floor(P.order.length / n), `L${lv}: the odd one's seat balanced in a pass (${cnt})`);
  }
  if (lv !== '5') { ok(firstTag / tagN < 1 / (lv === '4' ? 2 : 3) + 0.05, `L${lv}: the right name tag is not usually first (${(firstTag / tagN).toFixed(2)})`); ok(posHits / posN <= 1 / C.seatsOf(lv) + 0.02, `L${lv}: a seat-1 bot wins no more than chance (${(posHits / posN).toFixed(2)})`); }
}

/* ---------- 4. strings ---------- */
const S = ACT.strings, src = fs.readFileSync(ACTF, 'utf8') + fs.readFileSync(CORE, 'utf8');
const KEYS = Object.keys(S); ok(KEYS.length >= 40, 'strings: the set is there');
const HINTS = ['hintStep', 'miss1', 'miss2', 'nameAsk', 'nameWrong', 'hintGrid', 'gridMiss1', 'gridMiss2', 'tfAsk', 'tfWrong'];
const FREE = /(?<!\p{L})(free|kostenlos\w*|gratis|gratuit\w*|grátis|ilmai\w*|maksuton\w*|kostnadsfri\w*|vederlagsfri\w*|gratuito|gratuita)(?!\p{L})/iu;
for (const k of KEYS) for (const l of LOCS) {
  const v = S[k][l]; ok(typeof v === 'string' && v.length > 0, `strings.${k}.${l} present`); if (typeof v !== 'string') continue;
  ok(!FREE.test(v), `strings.${k}.${l} never says free`);
  if (HINTS.indexOf(k) >= 0) ok(!/\d/.test(v), `strings.${k}.${l}: no digit in a hint`);
  if (l === 'fr' || l === 'it') ok(v.indexOf("'") < 0, `strings.${k}.${l}: typographic apostrophe`);
  if (l === 'fr') ok(!/ [:!?;]/.test(v) && !/\S[:!?;](\s|$)/.test(v.replace(/ [:!?;]/g, '')), `strings.${k}.fr: a narrow space before : ! ? ;`);
}
/* every key is asked for somewhere: by name in the activity, by the shell, or through a setting / level */
const BYSHELL = ['title', 'instruction', 'instrBubble', 'okBubble'], BYSETTING = ['setLevel', 'l1', 'l2', 'l3', 'l4', 'l5', 'setCap', 'capShow', 'capName'], BYLEVEL = ['t1', 't2', 't3', 't4', 't5'];
for (const k of KEYS) ok(BYSHELL.concat(BYSETTING, BYLEVEL).indexOf(k) >= 0 || new RegExp("'" + k + "'").test(src.replace(/\/\*STRINGS-BEGIN\*\/[\s\S]*\/\*STRINGS-END\*\//, '')), `strings.${k} is reached`);
ok(/'t' \+ this\._level\(\)/.test(src), 'the task line follows the level (t1..t5)');
ok(ACT.settings.find(s => s.key === 'level').options.map(o => o.labelKey).join() === 'l1,l2,l3,l4,l5' && ACT.settings.find(s => s.key === 'cap').options.map(o => o.labelKey).join() === 'capShow,capName', 'settings: five levels, two caption modes');

/* ---------- 5. prose + manifest ---------- */
const QUOTE = /[«“„"‘”]\s?([^«»“”„"‘’]+?)\s?[»”“"’]/g;
for (const l of LOCS) {
  const j = JSON.parse(fs.readFileSync(path.join(REPO, 'frontend', 'messages', 'activity-content', l + '.json'), 'utf8')), p = j.prose[ID];
  ok(p && p.about && p.about.length === 3 && p.practices.length === 4 && p.howToPlay.length === 3 && p.learningGoals.length === 3, `prose.${l}: the whole entry`);
  if (!p) continue;
  const all = [].concat(p.about, p.practices, p.howToPlay, p.learningGoals).join(' ');
  ok(!FREE.test(all), `prose.${l}: never says free`);
  ok(l === 'en' ? /Common Core/.test(all) : !/Common Core/.test(all), `prose.${l}: the framework name`);
  /* the one quoted name in the prose is the "I name it" setting, word for word */
  const q = []; let m; QUOTE.lastIndex = 0; while ((m = QUOTE.exec(all))) q.push(m[1].trim());
  ok(q.length >= 1 && q.every(x => x === S.capName[l]), `prose.${l}: every quote is the setting's own name (${q.join(' | ')})`);
  if (l === 'fr' || l === 'it') ok(all.indexOf("'") < 0, `prose.${l}: typographic apostrophes`);
}
const rows = JSON.parse(fs.readFileSync(MAN, 'utf8')), row = rows.find(x => x.id === ID);
ok(row && row.tool === 'group-photo-activity', 'manifest: the row points at the group photo');
ok(row && JSON.stringify(row.params.rounds) === JSON.stringify({ '1': 8, '2': 9, '3': 8, '4': 8, '5': 8 }) && row.params.level.join() === '1,2,3,4,5' && row.params.cap.join() === 'show,name', 'manifest: params match the core');
const head = JSON.parse(execSync('git show HEAD:"mini tools/ziggy-odd-one-out-activities.json"', { cwd: REPO, encoding: 'utf8', maxBuffer: 1e8 })).find(x => x.id === ID);
['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv'].forEach(l => ['slug', 'page_title', 'page_intro'].forEach(k => ok(row[k][l] === head[k][l], `manifest: ${l} ${k} frozen`)));
['da', 'no', 'fi'].forEach(l => ['slug', 'page_title', 'page_intro'].forEach(k => ok(row[k][l] && !FREE.test(row[k][l]) && !/Common Core/.test(row[k][l]), `manifest: ${l} ${k} authored`)));
['da', 'no', 'fi'].forEach(l => ok(/^[a-z0-9-]+$/.test(row.slug[l]), `manifest: ${l} slug url-safe`));

console.log(`verify-group-photo-core: ${PASS} pass, ${FAIL} fail`);
process.exit(FAIL ? 1 : 0);
