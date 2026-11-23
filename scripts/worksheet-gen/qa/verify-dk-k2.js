#!/usr/bin/env node
/**
 * verify-dk-k2.js — the gate of Batch K2 (K-708 .. K-711; factory types/_shared/dk-k2.js, bank data/science/dk-k2.js;
 * Daily Teaching System Stage D-5, 2026-11-23). Modelled on qa/verify-dk-kinder.js.
 *
 *   node scripts/worksheet-gen/qa/verify-dk-k2.js [--quick] [--seeds=400]
 *
 *   1. BANK, by the gate's OWN tables (never the bank's own labels):
 *      - calm-down tools: only breathe / count / squeeze-your-own-hands; no tool touches another child or a thing
 *        (the trap: a calm-down tool that is also an unkind act);
 *      - kind / unkind acts: every kind act and every unkind act is one whose meaning no context can flip (the trap:
 *        a hug, a high five, a tickle, a push on a swing, taking a toy, walking away are refused); the face after a
 *        kindness is happy and the wrong faces never include sad (a child helped up may still be sad);
 *      - stopping: the right answer is a child who STOPS, the wrong one a child who goes on; if someone does not stop,
 *        tell the teacher;
 *      - wash times: the four times are wash times by the gate's table, the two other moments involve no touching;
 *        the moments that flip (a swing is recess, crayons, a teddy, shoes, a pet, a bed) are refused;
 *      - every picture in the cache manifest AND on disk, and colour.
 *   2. BUILD, --seeds copies of every type at every level: every stamped answer agrees with the gate's tables; NO
 *      POSITIONAL TELL (the kind act left / right, the happy face's place, the stopping child's side, the wash cards,
 *      each pooled within a band of chance; no page in a pattern); the three levels draw different parts; another
 *      locale refuses.
 *   3. RENDER (render/render-instance.js): every type x level x 2 copies (1 with --quick): dkVerifyInPage (the stack
 *      620-740, no blank band, no collision, nothing out of its box, pictures loaded) + the K2 checks (every stop card
 *      draws the friend's STOP hand: the trap of a hug that reads as wanted) + qa/lints.js clean.
 *      Review round 3 (2026-11-23), measured on the render: a push is drawn UPRIGHT with an impact burst (a figure
 *      leaning over a child reads as lifting); the added block is held in the AIR above the tower with a down arrow;
 *      every stop hand is an open palm at CHEST height, inside its card; the step-back arrow points AWAY from the
 *      friend; the not-stop row carries "Stop, please.", your own stop hand, and a teacher clearly taller than the
 *      child; "Both answers are OK." is printed on every level; the wave hand is up and away from the head.
 *   1b. TEXT: the K-708 instruction never counts "I need a break, please." as asking for help; K-711 never reads as a
 *      tally ("each time you wash") and says "use the bathroom", never "toilet" (US English).
 *   4. POISONS: each check FAILS on a bank, a page or a render spoiled for it.
 * Exit 1 on any failure.
 */
'use strict';
const path = require('path');
const fs = require('fs');
const WG = path.join(__dirname, '..');
const { makeRng } = require(path.join(WG, 'lib', 'rng.js'));
const { loadType } = require(path.join(WG, 'lib', 'load-types.js'));
const DK = require(path.join(WG, 'types', '_shared', 'dk-kinder.js'));
const B = require(path.join(WG, 'data', 'science', 'dk-k2.js'));
const MAN = require(path.join(WG, 'cache', 'manifest.json'));

const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.slice(k.length + 3) : d; };
const QUICK = process.argv.includes('--quick');
const SEEDS = Number(arg('seeds', '400'));
const IDS = ['K-708', 'K-709', 'K-710', 'K-711'];
const clone = (x) => JSON.parse(JSON.stringify(x));
let assertions = 0; const fails = [];
const ok = (c, msg) => { assertions++; if (!c) fails.push(msg); };
const plog = []; let poisons = 0, killed = 0;
const judge = (name, f, re) => { poisons++; const k = f.some((x) => re.test(x)); plog.push(`  ${name}: ${k ? 'KILLED' : f.length ? 'WRONG REASON — ' + f.slice(0, 2).join(' | ') : 'SILENT'}`); if (k) killed++; };

/* ================================================================ 1. the gate's own tables */
const CALM_OK = { breathe: 'breathing in and out', count: 'counting slowly', squeeze: 'squeezing your OWN hands, then letting go' };
const KIND_OK = { 'hand-back': 'picking up / handing back what fell', 'share-block': 'sharing a block', 'help-up': 'helping a child up', 'invite-ball': 'inviting a child to play' };
const UNKIND_OK = { 'kick-things': 'kicking a child’s things', 'kick-tower': 'kicking down a child’s tower', push: 'pushing a child over' };
const FLIP = { hug: 'kind only when wanted', 'high-five': 'kind only when wanted', tickle: 'kind only when wanted', 'push-swing': 'a push on a swing is kind', 'take-toy': 'may be giving it back', 'walk-away': 'may be going for the teacher' };
const STOPPED = new Set(['step-back', 'stand-still']), GOES_ON = new Set(['keep-hugging', 'keep-chasing']);
const WASH_TIME = { 'classroom/lunchbox': 'before eating', 'around the house/toilet': 'after the toilet', 'activities/playground': 'after recess', 'hospital/tissue': 'after blowing your nose' };
const NO_TOUCH = { 'classroom/book': 'listening to a story', 'weather/rainbow': 'seeing a rainbow' };
const FLIP_MOMENT = { 'toys/swing': 'a swing is recess', 'classroom/crayon': 'some classes wash after art', 'toys/teddy_bear': 'a cuddly toy may be germy', 'clothing/shoes': 'shoes are dirty', 'farm animals/dog': 'you wash after a pet', 'around the house/bed': 'some wash before bed' };
const key = (p) => p.theme + '/' + p.noun;

function artFaults(p, where) {
  const f = [];
  if (/\bbw\b/i.test(p.theme)) f.push(`${where}: ${key(p)} is black-and-white`);
  const t = MAN.themes[p.theme], e = t && t.nouns[p.noun];
  if (!e) return f.concat(`${where}: ${key(p)} is not in the cache manifest`);
  if (!fs.existsSync(path.join(WG, 'cache', 'themes-512', p.theme, e.files[0])) && !fs.existsSync(path.join(WG, 'cache', 'themes', p.theme, e.files[0]))) f.push(`${where}: ${key(p)} has no file on disk`);
  return f;
}
function bankPictures(b) {
  const out = [];
  const walk = (o, where) => { if (!o || typeof o !== 'object') return; if (typeof o.theme === 'string' && typeof o.noun === 'string') { out.push([o, where]); return; } for (const [k, v] of Object.entries(o)) if (!/REFUSED|FLIP/.test(k)) walk(v, where + '.' + k); };
  for (const [k, v] of Object.entries(b)) walk(v, k);
  return out;
}
function bankFaults(b) {
  const f = [];
  // calm
  for (const t of b.CALM.tools) {
    if (!CALM_OK[t.id]) f.push(`calm: ${t.id} is not a calm-down tool by the gate's table`);
    if (t.people !== 0) f.push(`calm: ${t.id} touches another child or a thing (a calm-down tool is never an act on someone)`);
  }
  if (JSON.stringify(b.CALM.help) !== JSON.stringify(['I need a break, please.', 'Can you help me?'])) f.push('calm: the help sentences are not the lesson’s two');
  // kind
  for (const sc of b.KIND.scenes) {
    if (FLIP[sc.kind] || FLIP[sc.unkind]) f.push(`kind: scene ${sc.id} uses ${FLIP[sc.kind] ? sc.kind : sc.unkind}, whose meaning context can flip (${FLIP[sc.kind] || FLIP[sc.unkind]})`);
    else {
      if (!KIND_OK[sc.kind]) f.push(`kind: ${sc.kind} is not a kind act by the gate's table`);
      if (!UNKIND_OK[sc.unkind]) f.push(`kind: ${sc.unkind} is not an unkind act by the gate's table`);
    }
  }
  if (key(b.KIND.after.right) !== 'emotions/happy') f.push('kind: the face after a kindness is not happy');
  for (const p of b.KIND.after.wrong) if (['happy', 'sad', 'content', 'merry', 'excited'].includes(p.noun)) f.push(`kind: ${p.noun} is offered as a wrong face after a kindness (it can be right)`);
  // space
  for (const it of b.SPACE.stopItems) {
    if (!STOPPED.has(it.right)) f.push(`space: ${it.id}: the right answer ${it.right} is not a child who stops`);
    if (!GOES_ON.has(it.wrong)) f.push(`space: ${it.id}: the wrong answer ${it.wrong} is not a child who goes on`);
  }
  if (b.SPACE.notStop.right !== 'tell-teacher') f.push('space: if someone does not stop, the right answer is not "tell the teacher"');
  if (!UNKIND_OK[b.SPACE.notStop.wrong]) f.push(`space: the wrong not-stop answer ${b.SPACE.notStop.wrong} is not an act a child must not do`);
  // wash
  for (const t of b.WASH.times) if (!WASH_TIME[key(t.pic)]) f.push(`wash: ${key(t.pic)} is not a wash time by the gate's table`);
  for (const t of b.WASH.notTimes) {
    if (FLIP_MOMENT[key(t.pic)]) f.push(`wash: ${key(t.pic)} as a no-wash moment flips (${FLIP_MOMENT[key(t.pic)]})`);
    else if (!NO_TOUCH[key(t.pic)]) f.push(`wash: ${key(t.pic)} is not a no-touching moment by the gate's table`);
  }
  for (const c of b.WASH.check) if (c.pic && key(c.pic) === 'body parts/elbow') f.push('wash: the germ-buster card uses the library elbow (it reads as a leg or a boot): draw the coughing child');
  if (!b.WASH.check.some((c) => c.id === 'elbow' && c.draw === 'cough')) f.push('wash: the cough-in-my-elbow card is not the drawn coughing child');
  for (const t of [...b.WASH.times, ...b.WASH.notTimes]) if (/toilet/i.test(t.label)) f.push(`wash: the label "${t.label}" says toilet (US English: "after I use the bathroom")`);
  // pictures
  for (const [p, where] of bankPictures(b)) f.push(...artFaults(p, where));
  return f;
}
/** the printed instructions, by the gate's own reading (review round 3) */
function textFaults(id, lv, instr, bank) {
  const f = [], tag = `${id} L${lv}`;
  if (id === 'K-708' && bank.CALM.help.some((h) => /break/i.test(h)) && /what you can say/i.test(instr)) {
    if (/say (to ask )?for help|say to ask/i.test(instr) && !/need a break/i.test(instr)) f.push(`${tag}: the instruction counts "I need a break, please." as asking for help`);
  }
  if (id === 'K-711') {
    if (/each time you wash/i.test(instr)) f.push(`${tag}: "each time you wash" reads as a tally`);
    if (/toilet/i.test(instr)) f.push(`${tag}: the instruction says toilet`);
  }
  return f;
}

/* ================================================================ 2. build: answers, tells, levels */
const picsOf = (html) => [...html.matchAll(/data-dk-pic="([^"]+)"/g)].map((m) => { const i = m[1].lastIndexOf('/'); return { theme: m[1].slice(0, i).replace(/&amp;/g, '&'), noun: m[1].slice(i + 1) }; });
/** the answers a built page carries, read from its html (row by row) */
function rowsOf(html) {
  const rows = [];
  const re = /data-k2-row="([^"]+)"([\s\S]*?)(?=data-k2-row=|$)/g;
  let m;
  while ((m = re.exec(html))) {
    const seg = m[2];
    const choices = [...seg.matchAll(/data-k2-choice="([^"]+)" data-dk-answer="([^"]+)"/g)].map((x) => ({ act: x[1], ans: x[2] }));
    const acts = [...seg.matchAll(/data-k2-act="([^"]+)"/g)].map((x) => x[1]);
    const faces = [...seg.matchAll(/data-k2-face="([^"]+)" data-dk-answer="([^"]+)"/g)].map((x) => ({ face: x[1], ans: x[2] }));
    rows.push({ id: m[1], choices, acts, faces });
  }
  return rows;
}
function answerFaults(id, html) {
  const f = [];
  if (id === 'K-709') for (const r of rowsOf(html)) {
    if (r.choices.length !== 2 || r.choices.filter((c) => c.ans === 'kind').length !== 1) f.push(`${id} ${r.id}: not one kind act of two`);
    r.choices.forEach((c, i) => { const act = r.acts[i]; const isKind = !!KIND_OK[act]; if (FLIP[act]) f.push(`${id} ${r.id}: ${act} can flip`); if (isKind !== (c.ans === 'kind')) f.push(`${id} ${r.id}: ${act} is stamped ${c.ans}`); });
    if (r.faces.length) { const right = r.faces.filter((x) => x.ans === 'after'); if (right.length !== 1 || right[0].face !== 'happy') f.push(`${id} ${r.id}: the face after is not happy`); if (r.faces.some((x) => x.face === 'sad')) f.push(`${id} ${r.id}: sad offered after a kindness`); }
  }
  if (id === 'K-710') for (const r of rowsOf(html)) {
    const right = r.choices.filter((c) => c.ans !== 'no');
    if (right.length !== 1) f.push(`${id} ${r.id}: ${right.length} right answers`);
    for (const c of r.choices) { const good = r.id === 'not-stop' ? c.act === 'tell-teacher' : STOPPED.has(c.act); if (good !== (c.ans !== 'no')) f.push(`${id} ${r.id}: ${c.act} is stamped ${c.ans}`); }
  }
  if (id === 'K-711') {
    const cards = [...html.matchAll(/data-k2-time="([^"]+)" data-dk-answer="([^"]+)"/g)].map((x) => ({ id: x[1], ans: x[2] }));
    const byId = Object.fromEntries([...B.WASH.times, ...B.WASH.notTimes].map((t) => [t.id, t]));
    for (const c of cards) { const t = byId[c.id]; const wash = !!WASH_TIME[key(t.pic)]; if (wash !== (c.ans === 'wash')) f.push(`${id}: ${c.id} is stamped ${c.ans}`); }
  }
  return f;
}
function bandFaults(what, counts, total, expect, tol) {
  const f = [];
  counts.forEach((c, i) => { const s = c / total; if (Math.abs(s - expect[i]) > tol) f.push(`${what}: place ${i + 1} holds the answer ${(100 * s).toFixed(1)}% of the time (chance ${(100 * expect[i]).toFixed(1)}%)`); });
  return f;
}
/** the positional-tell checks of one type and level over many built pages (html list) */
function tellFaults(id, lv, htmls) {
  const f = [], tag = `${id} L${lv}`;
  if (id === 'K-709' || id === 'K-710') {
    const side = [0, 0]; let rows = 0; const face = [0, 0, 0]; let frows = 0;
    for (const h of htmls) {
      const rs = rowsOf(h);
      const pos = rs.map((r) => r.choices.findIndex((c) => c.ans !== 'no'));
      pos.forEach((p) => { if (p >= 0) { side[p]++; rows++; } });
      if (pos.length >= 3 && new Set(pos).size === 1) f.push(`${tag}: every row's answer on one side`);
      rs.forEach((r) => { const p = r.faces.findIndex((x) => x.ans === 'after'); if (p >= 0) { face[p]++; frows++; } });
    }
    if (rows) f.push(...bandFaults(`${tag} answer side`, side, rows, [0.5, 0.5], 0.08));
    if (frows) f.push(...bandFaults(`${tag} happy face place`, face, frows, [1 / 3, 1 / 3, 1 / 3], 0.08));
  }
  if (id === 'K-711' && lv > 1) {
    const n = 6, cnt = Array(n).fill(0);
    for (const h of htmls) {
      const bits = [...h.matchAll(/data-k2-time="[^"]+" data-dk-answer="([^"]+)"/g)].map((x) => x[1] === 'wash');
      bits.forEach((b, i) => { if (b) cnt[i]++; });
      if (DK.patterned(bits)) f.push(`${tag}: the wash cards follow a pattern`);
      if ([bits.slice(0, 3), bits.slice(3)].some((r) => r.every(Boolean) || r.every((x) => !x))) f.push(`${tag}: a row of one kind`);
    }
    f.push(...bandFaults(`${tag} wash place`, cnt, htmls.length, cnt.map(() => 4 / 6), 0.1));
  }
  return f;
}
function levelSig(html) { const c = {}; for (const m of html.matchAll(/data-(?:dk|k2)-([a-z-]+)(?=[=\s>])/g)) c[m[1]] = (c[m[1]] || 0) + 1; return JSON.stringify(Object.keys(c).sort().map((k) => k + c[k])); }

/* ================================================================ main */
async function main() {
  const bf = bankFaults(B);
  ok(!bf.length, 'bank: ' + bf.slice(0, 10).join(' | '));
  const P = (name, mut, re) => { const b = clone(B); mut(b); judge(name, bankFaults(b), re); };
  P('PB1 "hit a pillow" as a calm-down tool', (b) => { b.CALM.tools.push({ id: 'hit-pillow', label: ['hit a pillow'], people: 0 }); }, /not a calm-down tool/);
  P('PB2 squeezing a FRIEND as the squeeze tool (a calm-down tool that is an unkind act)', (b) => { b.CALM.tools[2].people = 1; }, /touches another child/);
  P('PB3 a hug as the kind act (kind only when wanted)', (b) => { b.KIND.scenes[3].kind = 'hug'; }, /context can flip/);
  P('PB4 taking a toy as the unkind act (it may be given back)', (b) => { b.KIND.scenes[0].unkind = 'take-toy'; }, /context can flip/);
  P('PB5 a push on a swing as the unkind act (it is kind)', (b) => { b.KIND.scenes[2].unkind = 'push-swing'; }, /context can flip/);
  P('PB6 sad offered as a wrong face after a kindness', (b) => { b.KIND.after.wrong.push({ theme: 'emotions', noun: 'sad' }); }, /sad is offered/);
  P('PB7 the stop item keyed to the child who keeps hugging', (b) => { b.SPACE.stopItems[0].right = 'keep-hugging'; b.SPACE.stopItems[0].wrong = 'step-back'; }, /not a child who stops/);
  P('PB8 "push them" keyed right when someone does not stop', (b) => { b.SPACE.notStop.right = 'push'; }, /not "tell the teacher"/);
  P('PB9 a swing as a no-wash moment (a swing is recess)', (b) => { b.WASH.notTimes[1].pic = { theme: 'toys', noun: 'swing' }; }, /flips \(a swing is recess\)/);
  P('PB10 a picture missing from the library', (b) => { b.WASH.times[0].pic = { theme: 'classroom', noun: 'unicorn' }; }, /not in the cache manifest/);
  P('PB11 a black-and-white picture', (b) => { b.CALM.upset[0] = { theme: 'emotions bw', noun: 'angry' }; }, /black-and-white/);
  P('PB13 the library elbow back on the cough card', (b) => { const c = b.WASH.check.find((x) => x.id === 'elbow'); delete c.draw; c.pic = { theme: 'body parts', noun: 'elbow' }; }, /library elbow/);
  P('PB12 "after the toilet" as a wash label (British)', (b) => { b.WASH.times.find((t) => t.id === 'toilet').label = 'after the toilet'; }, /says toilet/);
  // ---- 1b. the printed instructions
  {
    const { resolveStrings, withLevelInstruction } = require(path.join(WG, 'i18n', 'strings.js'));
    const instrOf = (id, lv) => { const t = loadType(id); return withLevelInstruction(resolveStrings(id, 'en', t), id, lv, 'en').instruction || ''; };
    for (const id of IDS) for (const lv of [1, 2, 3]) { const tf = textFaults(id, lv, instrOf(id, lv), B); ok(!tf.length, tf.join(' | ')); }
    judge('PX1 K-708 says "what you can say to ask for help" over the break sentence', textFaults('K-708', 2, 'Circle the calm-down tool you will use next time. Circle what you can say to ask for help.', B), /counts "I need a break/);
    judge('PX2 K-711 L1 "Color each time you wash your hands"', textFaults('K-711', 1, 'Color each time you wash your hands.', B), /reads as a tally/);
    judge('PX3 K-711 "after the toilet" in the instruction', textFaults('K-711', 2, 'Circle when you wash: after the toilet.', B), /says toilet/);
    ok(!textFaults('K-708', 2, 'Circle what you can say when you need a break or need help.', B).length, 'PX control: the reworded K-708 instruction is refused');
  }

  // ---- build sweep
  const htmlsOf = {};
  for (const id of IDS) {
    const t = loadType(id);
    let refused = false; try { t.build({ difficulty: 2, locale: 'sv' }, { rng: makeRng('x') }); } catch (e) { refused = /English/.test(e.message); }
    ok(refused, `${id}: another locale does not refuse`);
    const sigs = {};
    for (const lv of [1, 2, 3]) {
      const hs = [];
      for (let s = 1; s <= SEEDS; s++) {
        let r; try { r = t.build({ difficulty: lv, locale: 'en' }, { rng: makeRng(`k2|${id}|${lv}|${s}`), variant: s }); } catch (e) { ok(false, `${id} L${lv} #${s}: ${e.message}`); break; }
        hs.push(r.bodyHtml);
        const af = answerFaults(id, r.bodyHtml); ok(!af.length, af.slice(0, 3).join(' | '));
        if (s <= 3) { for (const p of picsOf(r.bodyHtml)) { const pf = artFaults(p, `${id} L${lv}`); ok(!pf.length, pf.join(' | ')); } if (s === 1) sigs[lv] = levelSig(r.bodyHtml); }
      }
      htmlsOf[id + ' ' + lv] = hs;
      const tf = tellFaults(id, lv, hs); ok(!tf.length, tf.slice(0, 5).join(' | '));
    }
    ok(sigs[1] !== sigs[2] && sigs[2] !== sigs[3] && sigs[1] !== sigs[3], `${id}: two levels draw the same parts`);
  }
  // tell + answer poisons on the real pages
  const sp = (k, fn) => htmlsOf[k].map(fn);
  // synthetic pages (the same row markup the factory writes), spoiled so the answer always sits in one place
  const fakeRow = (i, kindFirst, happyAt) => `data-k2-row="r${i}" ` + (kindFirst ? 'data-k2-choice="kind" data-dk-answer="kind" data-k2-act="help-up" data-k2-choice="unkind" data-dk-answer="no" data-k2-act="push" ' : 'data-k2-choice="unkind" data-dk-answer="no" data-k2-act="push" data-k2-choice="kind" data-dk-answer="kind" data-k2-act="help-up" ') +
    (happyAt == null ? '' : [0, 1, 2].map((k) => (k === happyAt ? 'data-k2-face="happy" data-dk-answer="after" ' : 'data-k2-face="angry" data-dk-answer="no" ')).join(''));
  judge('PT1 the kind act always first', tellFaults('K-709', 2, Array.from({ length: 200 }, () => [0, 1, 2].map((i) => fakeRow(i, true)).join(''))), /answer side|one side/);
  judge('PT2 the happy face always on top', tellFaults('K-709', 3, Array.from({ length: 200 }, (_, n) => [0, 1, 2].map((i) => fakeRow(i, (n + i) % 2 === 0, 0)).join(''))), /happy face place/);
  { const ctl = Array.from({ length: 200 }, (_, n) => [0, 1, 2].map((i) => fakeRow(i, (n + i) % 2 === 0, (n + i) % 3)).join('')); ok(!tellFaults('K-709', 3, ctl).length, 'PT control: balanced synthetic pages report a tell ' + tellFaults('K-709', 3, ctl).slice(0, 2).join(' | ')); }
  judge('PT3 the wash cards in a block (four first)', tellFaults('K-711', 2, sp('K-711 2', (h) => { let i = 0; return h.replace(/data-k2-time="([^"]+)" data-dk-answer="[^"]+"/g, (m, id) => `data-k2-time="${id}" data-dk-answer="${i++ < 4 ? 'wash' : 'no'}"`); })), /pattern|one kind|wash place/);
  judge('PA1 a kick stamped as the kind act', answerFaults('K-709', htmlsOf['K-709 2'][0].replace('data-k2-choice="unkind" data-dk-answer="no"', 'data-k2-choice="unkind" data-dk-answer="kind"')), /not one kind act|stamped kind/);
  judge('PA2 a page that keys the child who keeps going', answerFaults('K-710', htmlsOf['K-710 2'][0].replace(/data-k2-choice="(keep-hugging|keep-chasing)" data-dk-answer="no"/, 'data-k2-choice="$1" data-dk-answer="stop"')), /right answers|is stamped stop/);
  { const t = loadType('K-709'); const same = { ...t, difficulty: { 1: t.difficulty[2], 2: t.difficulty[2], 3: t.difficulty[2] } }; const sg = [1, 2, 3].map((lv) => levelSig(same.build({ difficulty: lv, locale: 'en' }, { rng: makeRng('lv') }).bodyHtml));
    judge('PL1 three levels with one config', sg[0] === sg[1] && sg[1] === sg[2] ? ['two levels draw the same parts'] : [], /same parts/); }

  // ---- render
  const puppeteer = require('puppeteer');
  const { renderInstance } = require(path.join(WG, 'render', 'render-instance.js'));
  const { resolveStrings, withLevelInstruction } = require(path.join(WG, 'i18n', 'strings.js'));
  const OUT = path.join(require('os').tmpdir(), 'verify-dk-k2');
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  const stacks = [];
  const render = async (type, lv, v, base) => {
    const strings = withLevelInstruction(resolveStrings(type.id, 'en', type), type.id, lv, 'en');
    const r = await renderInstance({ type, theme: null, difficulty: lv, locale: 'en', strings, variant: v, page, outDir: OUT, baseName: base });
    for (const x of ['.pdf', '.png', '.html']) try { fs.unlinkSync(path.join(OUT, base + x)); } catch (e) {}
    return r;
  };
  try {
    for (const id of IDS) {
      const t = loadType(id);
      for (const lv of [1, 2, 3]) for (let v = 1; v <= (QUICK ? 1 : 2); v++) {
        const r = await render(t, lv, v, `${id}-L${lv}-v${v}`);
        const bad = [].concat(r.qa.lints || [], r.qa.verify || []);
        ok(!bad.length, `${id} L${lv} v${v}: ${bad.slice(0, 3).join(' | ')}`);
        if (v === 1) stacks.push(`${id} L${lv} ${await page.evaluate(() => { const R = document.querySelector('[data-dk]'); const rt = R.getBoundingClientRect(); return Math.round(Math.max(...[...R.querySelectorAll('[data-dk-box], svg, img')].filter((e) => !(e.parentElement && e.parentElement.closest('svg'))).map((e) => e.getBoundingClientRect().bottom)) - rt.top); })}`);
      }
    }
    const spoilType = (id, fn) => { const t = loadType(id); return { ...t, build(a, c) { const r = t.build(a, c); return { ...r, bodyHtml: fn(r.bodyHtml) }; } }; };
    const pr = async (name, id, lv, fn, re) => { const r = await render(spoilType(id, fn), lv, 1, 'poison'); judge(name, [].concat(r.qa.verify || [], r.qa.lints || []), re); };
    await pr('PR1 a stop card whose friend shows no stop hand (a hug that reads as wanted)', 'K-710', 2, (h) => h.replace(/(data-k2-stopcard="keep-hugging"[\s\S]*?)data-k2-palm="1"/, '$1data-k2-nopalm="1"'), /shows no stop hand/);
    await pr('PR2 a kind row with two kind stamps', 'K-709', 2, (h) => h.replace('data-k2-choice="unkind" data-dk-answer="no"', 'data-k2-choice="unkind" data-dk-answer="kind"'), /not one kind act/);
    await pr('PR3 a choice card that lost the friend (one child drawn)', 'K-709', 3, (h) => h.replace(/(data-k2-choice="kind"[\s\S]*?)data-k2-fig="friend"/, '$1data-k2-gone="friend"'), /draws 1 children/);
    await pr('PR4 the page squeezed to 520 px (a blank band at the bottom)', 'K-709', 2, (h) => h.replace('class="dk-root"', 'class="dk-root" style="max-height:520px"'), /the stack is/);
    await pr('PR5 a box laid over another (collision)', 'K-709', 2, (h) => h.replace('<div class="dk-row"', '<div data-dk-box style="position:absolute;left:30px;top:30px;width:200px;height:120px;background:#FFFFFF"></div><div class="dk-row"'), /two boxes collide/);
    await pr('PR6 the help sentences gone', 'K-708', 1, (h) => h.replace(/data-k2-help="1"/g, ''), /no help sentence/);
    // review round 3 (each poison asserts first that its target is on the page: a poison on an absent target is SILENT)
    const has = (re) => (h) => { if (!re.test(h)) throw new Error('poison target absent: ' + re); return h; };
    const prR = async (name, id, lv, re0, fn, re) => pr(name, id, lv, (h) => fn(has(re0)(h)), re);
    const { instanceSeed } = require(path.join(WG, 'lib', 'rng.js'));
    // the level whose rendered copy 1 (the seed render-instance uses) draws the target
    const k709 = async (want) => { const t = loadType('K-709'); for (const lv of [1, 2, 3]) { const r = t.build({ theme: null, difficulty: lv, locale: 'en', unit: null }, { rng: makeRng(instanceSeed({ typeId: 'K-709', theme: null, difficulty: lv, seedEpoch: 1, variant: 1, unit: null })), variant: 1 }); if (want.test(r.bodyHtml)) return lv; } throw new Error('no K-709 level draws ' + want); };
    const pushLv = await k709(/data-k2-act="push"/), towerLv = await k709(/data-k2-act="share-block"/);
    await prR('PR7 the pusher leans over the child (reads as lifting)', 'K-709', pushLv, /data-k2-act="push"/, (h) => h.replace(/(data-k2-act="push"[\s\S]*?data-k2-fig="friend"[^>]*>[\s\S]*?)rotate\(0 52 58\)/, '$1rotate(34 52 58)'), /leans over/);
    await prR('PR8 a push without its impact burst', 'K-709', pushLv, /data-k2-act="push"/, (h) => h.replace(/data-k2-impact="1"/g, ''), /without its impact burst/);
    await prR('PR9 the added block set down ON the tower (reads as taking)', 'K-709', towerLv, /data-k2-added="1"/, (h) => h.replace(/<rect([^>]*?) y="[\d.]+"([^>]*data-k2-added="1")/, '<rect$1 y="41"$2'), /sits ON the tower/);
    await prR('PR10 the added block without its down arrow', 'K-709', towerLv, /data-k2-downarrow/, (h) => h.replace(/data-k2-downarrow="1"/g, ''), /no down arrow/);
    await prR('PR11 the stop hand up at head height', 'K-710', 2, /data-k2-stopcard="keep-hugging"/, (h) => h.replace(/(data-k2-stopcard="keep-hugging"[\s\S]*?)<g data-k2-palm="1">/, '$1<g data-k2-palm="1" transform="translate(0 -30)">'), /not at chest height/);
    await prR('PR12 the stop hand run out of its card', 'K-710', 2, /data-k2-stopcard="keep-hugging"/, (h) => h.replace(/(data-k2-stopcard="keep-hugging"[\s\S]*?)<g data-k2-palm="1">/, '$1<g data-k2-palm="1" transform="translate(-100 0)">'), /runs out of the card/);
    await prR('PR13 the step-back arrow pointing at the friend', 'K-710', 2, /data-k2-backarrow/, (h) => h.replace(/points="22,106 30,101 30,111"/, 'points="68,106 60,101 60,111"'), /points AT the friend/);
    await prR('PR14 the not-stop row without "Stop, please."', 'K-710', 3, /data-k2-row="not-stop"/, (h) => h.replace(/(data-k2-row="not-stop"[\s\S]*?)data-k2-stopsay="1"/, '$1'), /no "Stop, please." bubble/);
    await prR('PR15 the teacher no taller than the child', 'K-710', 3, /data-k2-fig="teacher"/, (h) => h.replace(/scale\(-[\d.]+ [\d.]+\)( translate\(-52 -95\)" data-k2-fig="teacher")/, 'scale(-0.8 0.8)$1'), /not clearly taller/);
    await prR('PR16 the not-stop situation without your stop hand', 'K-710', 3, /data-k2-notstop="context"/, (h) => h.replace(/(data-k2-notstop="context"[\s\S]*?data-k2-fig="child"[\s\S]*?)data-k2-palm="1"/, '$1data-k2-nopalm="1"'), /your stop hand is missing/);
    await prR('PR17 "Both answers are OK." dropped', 'K-710', 2, /data-k2-both/, (h) => h.replace(/data-k2-both="1"/g, ''), /Both answers are OK\." is not printed/);
    // review round 4: the cough card
    await prR('PR19 the cough card without its coughing child', 'K-711', 1, /data-k2-cough="1"/, (h) => h.replace('data-k2-cough="1"', 'data-k2-gone="1"'), /no coughing child/);
    await prR('PR20 the elbow dropped to the chest (a hand on the chest, not a cough into the elbow)', 'K-711', 2, /points="53,31 66,22 43,17"/, (h) => h.split('points="53,31 66,22 43,17"').join('points="53,31 66,46 43,40"'), /not at mouth height/);
    await prR('PR21 the forearm hanging down (an arm held out, not bent across the face)', 'K-711', 3, /points="53,31 66,22 43,17"/, (h) => h.split('points="53,31 66,22 43,17"').join('points="53,31 66,22 69,40"'), /not bent up across the face/);
    await prR('PR22 the library elbow picture laid into the cough card', 'K-711', 2, /data-k2-check="elbow"/, (h) => h.replace(/(data-k2-check="elbow"[^>]*>)/, '$1<img data-dk-pic="body parts/elbow" alt="" style="width:1px;height:1px">'), /shows a picture/);
    await prR('PR18 the wave hand flat beside the head (reads as covering the ears)', 'K-710', 1, /data-k2-hello="wave"/, (h) => h.replace(/(data-k2-hello="wave"[\s\S]*?)<g data-k2-palm="1">/, '$1<g data-k2-palm="1" transform="translate(-22 12)">'), /not up and away from the head/);
  } finally { await browser.close(); }

  console.log(`stacks (copy 1): ${stacks.join(' · ')}`);
  console.log(`poisons ${killed}/${poisons} killed`); for (const l of plog) console.log(l);
  if (killed !== poisons) fails.push(`${poisons - killed} poison(s) not killed`);
  console.log(fails.length ? `FAIL (${fails.length} of ${assertions} assertions)\n  ` + fails.slice(0, 40).join('\n  ') : `PASS (${assertions} assertions, ${SEEDS} seeds a level)`);
  process.exit(fails.length ? 1 : 0);
}
if (require.main === module) main().catch((e) => { console.error(e); process.exit(1); });
module.exports = { bankFaults, tellFaults, answerFaults };
