#!/usr/bin/env node
/* =====================================================================
   verify-turning-bridge-core.js — the gate for ACTIVITY #126, The Turning
   Bridge (Hazel's Word Bridge, L.1.1.g; all 11 locales). Its OWN ground
   truth, written here independently of the core:
     · each locale's five joining words and its comma table (who takes a
       comma before the joining word), and its own sentence assembler
       (fr parce que → parce qu' before a vowel; es y → e, o → u);
     · the one-answer rules for a tray: AND is never offered in a but- or
       cause round (it would also fit); in an or-round AND is offered only
       when the sentence is a question (one thing cannot be both); in an
       and-round OR is offered only when the second half is reciprocal
       (friends / together — its own word list per locale);
     · de / nl SO (deshalb / dus) puts the verb first in the second half;
       V2 BECAUSE (denn / want / för / for) keeps the subject first;
     · fi asks "or" with vai (questions only).
   It asserts:
     (a) the rounds: every picture exists (exact case, colour theme); the
         right sentence of every round, assembled by its own rules, equals
         the core's; every tray holds the right plank once and obeys the
         one-answer rules; exactly one (plank, face) passes Check, by the
         model;
     (b) the model: lay / back / flip / swap (an arrow plank on the bridge
         turns over by itself, and keeps the meaning), Check's reasons and
         hints, the glow from miss 2; level 4 accepts only the swapped
         sentence; level-4 targets are one swap away;
     (c) the plan: every round once per pass, never three alike in a row,
         a fresh order; the right plank in every rack slot about equally;
         the arrow plank rests on its right face in about half the cause
         rounds; the bots under caps (the card-set bot at its proven floor
         in level 1);
     (d) the strings ×11, the prose quotes, the manifest row.
   Usage: node scripts/verify-turning-bridge-core.js   (env TB_CORE_DIR / TB_ACT_DIR for the mutation run)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm');
const REPO = path.join(__dirname, '..'), MT = path.join(REPO, 'mini tools'), IMG = path.join(REPO, 'image-library-webp', 'themes');
const CORE_DIR = process.env.TB_CORE_DIR || MT, ACT_DIR = process.env.TB_ACT_DIR || CORE_DIR;
const C = require(path.join(CORE_DIR, 'turning-bridge-core.js'));
const ACT = (() => { const ctx = { window: {}, TurningBridgeCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(ACT_DIR, 'turning-bridge-activity.js'), 'utf8') + '\n;this.__A = window.TurningBridgeActivity;', ctx); return ctx.__A; })();
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL < 80) console.error('  FAIL: ' + m); } };
const ALL = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const BW = /(?:^|\s)(bw|sw|bn|nb|zw|sh|pb|mv|sv)(\s+\d+)?$/i;

/* ---------------- the own tables ---------------- */
const WORDS = {
  en: ['and', 'but', 'or', 'because', 'so'], de: ['und', 'aber', 'oder', 'denn', 'deshalb'], fr: ['et', 'mais', 'ou', 'parce que', 'alors'],
  es: ['y', 'pero', 'o', 'porque', 'así que'], pt: ['e', 'mas', 'ou', 'porque', 'então'], it: ['e', 'ma', 'o', 'perché', 'quindi'],
  nl: ['en', 'maar', 'of', 'want', 'dus'], sv: ['och', 'men', 'eller', 'för', 'så'], da: ['og', 'men', 'eller', 'for', 'så'], no: ['og', 'men', 'eller', 'for', 'så'], fi: ['ja', 'mutta', 'vai', 'koska', 'joten']
};
const ROLE = ['and', 'but', 'or', 'because', 'so'];
/* a comma before the joining word: 1 always, 'c' only before a clause, 0 never */
const COMMA = {
  en: [0, 'c', 0, 0, 1], de: [0, 1, 0, 1, 1], fr: [0, 1, 0, 0, 1], es: [0, 1, 0, 0, 1], pt: [0, 1, 0, 0, 1], it: [0, 1, 0, 0, 1],
  nl: [0, 1, 0, 1, 1], sv: [0, 'c', 0, 1, 1], da: [0, 'c', 0, 1, 1], no: [0, 1, 0, 1, 1], fi: [0, 1, 0, 1, 1]
};
/* reciprocal predicates: OR breaks them (two must take part) */
const RECIP = {
  en: /\b(friends|together)\b/, de: /\b(Freunde|zusammen)\b/, fr: /\b(amis|ensemble)\b/, es: /\b(amigos|juntos)\b/, pt: /\b(amigos|juntos)\b/, it: /\b(amici|insieme)\b/,
  nl: /\b(vrienden|samen)\b/, sv: /(vänner|tillsammans)/, da: /\b(venner|sammen)\b/, no: /\b(venner|sammen)\b/, fi: /(ystäviä|yhdessä)/
};
/* de / nl: the second half after SO starts with its verb; after BECAUSE with its subject */
const SUBJ = { de: /^(ich|es|er|sie|wir|du|der|die|das|mama|papa)\b/i, nl: /^(ik|het|hij|ze|we|jij|de|mama|papa)\b/i };
const own = (loc, first, role, second, clause, end) => {
  const i = ROLE.indexOf(role), w = WORDS[loc][i], c = COMMA[loc][i] === 1 || (COMMA[loc][i] === 'c' && clause);
  let j = w, glue = ' ';
  if (loc === 'fr' && w === 'parce que' && /^[aeiouéèêàâîôû]/i.test(second)) { j = 'parce qu’'; glue = ''; }
  if (loc === 'es' && w === 'y' && /^h?i(?![aeiouáéó])/i.test(second)) j = 'e';
  if (loc === 'es' && w === 'o' && /^h?[oó]/i.test(second)) j = 'u';
  return first + (c ? ',' : '') + ' ' + j + glue + second + (loc === 'fr' && end === '?' ? ' ?' : end);
};
const PICS = new Set();

/* ---------------- (a) the rounds ---------------- */
for (const loc of ALL) {
  const D = C.DATA[loc];
  is(JSON.stringify(C.levels()) === JSON.stringify(['1', '2', '3', '4']), `${loc}: four levels`);
  is(ROLE.every((r, i) => D.w[r] === WORDS[loc][i].replace(/'/g, '’')), `${loc}: the five joining words`);
  for (const lvl of C.levels()) {
    const counts = {};
    for (const r of C.rounds()) {
      const rd = C.round(loc, lvl, r), tag = `${loc} L${lvl}.${r + 1}`;
      [rd.a.p, rd.b.p].forEach(p => { if (p) { is(!!C.DATA.PICS[p], `${tag}: picture key ${p}`); PICS.add(C.DATA.PICS[p]); } });
      const w = C.want(rd); counts[w] = (counts[w] || 0) + 1;
      /* the right sentence by its own rules */
      if (rd.kind === 'pick') {
        const rp = C.rightPlank(rd), rf = rp === 'arrow' ? C.rightFace(rd, 'ab') : 'because';
        const role = rp === 'arrow' ? rf : rp, second = role === 'so' && rd.b.s ? rd.b.s : rd.b.n;
        const want = own(loc, rd.a.f, role, second, rd.k === 'plain' ? rd.cl : true, rd.end);
        is(C.sentence(rd, 'ab', rp, rf) === want, `${tag}: «${C.sentence(rd, 'ab', rp, rf)}» = own «${want}»`);
        const size = lvl === '2' ? 2 : 3;   /* level 2 asks only for the face: the arrow plank and OR (BUT reads as a concession in a cause sentence) */
        is(rd.rack.length === size && rd.rack.filter(p => p === rp).length === 1 && new Set(rd.rack).size === size, `${tag}: ${size} planks, the right one once`);
        if (rd.k === 'cause' && lvl === '2') is(rd.rack.indexOf('but') < 0, `${tag}: no BUT in a level-2 cause round`);
        /* the one-answer rules */
        if (w !== 'and' && w !== 'or') is(rd.rack.indexOf('and') < 0, `${tag}: AND is never offered in a ${w} round`);
        if (w === 'or' && rd.rack.indexOf('and') >= 0) is(rd.end === '?', `${tag}: AND offered in an or-round only for a question`);
        if (w === 'and' && rd.rack.indexOf('or') >= 0) is(RECIP[loc].test(rd.b.n) || rd.cl, `${tag}: OR offered in an and-round only against a reciprocal or a whole clause («${rd.b.n}»)`);
        if (w === 'or') is(rd.end === '?' || loc !== 'fi', `${tag}: fi vai only in a question`);
        if (rd.end === '?' && loc === 'es') is(/^¿/.test(rd.a.f), `${tag}: es question opens with ¿`);
        /* exactly one (plank, face) passes Check */
        let pass = 0; const passed = [];
        for (const p of rd.rack) for (const f of (p === 'arrow' ? ['because', 'so'] : ['because'])) {
          const st = C.newState(loc, lvl, r); st.face = f; C.lay(st, p); if (C.check(st).result === 'ok') { pass++; passed.push(p + '/' + f); }
        }
        is(pass === 1 && passed[0] === rp + '/' + rf, `${tag}: exactly one plank passes (${passed.join(' ')})`);
      } else {
        const st = C.newState(loc, lvl, r), s0 = C.sentence(rd, 'ab', st.gap, st.face);
        is(C.check(Object.assign(C.newState(loc, lvl, r))).result === 'miss', `${tag}: the starting sentence is not the answer`);
        const rf0 = rd.k === 'swap-and' ? null : C.rightFace(rd, 'ab');
        is(rd.k === 'swap-and' ? st.gap === 'and' : (st.gap === 'arrow' && st.face === rf0), `${tag}: it starts complete and right`);
        const role0 = st.gap === 'arrow' ? st.face : 'and';
        is(s0 === own(loc, rd.a.f, role0, role0 === 'so' && rd.b.s ? rd.b.s : rd.b.n, true, rd.end), `${tag}: the start «${s0}»`);
        is(C.swap(st) === (rd.k === 'swap-and' ? 'swap' : 'turned') && C.check(st).result === 'ok', `${tag}: one swap says it the other way round`);
        const role1 = st.gap === 'arrow' ? st.face : 'and', s1 = C.sentence(rd, 'ba', st.gap, st.face);
        is(s1 === own(loc, rd.b.f, role1, role1 === 'so' && rd.a.s ? rd.a.s : rd.a.n, true, rd.end) && s1 !== s0, `${tag}: «${s1}»`);
        if (rd.k !== 'swap-and') is(role1 !== role0, `${tag}: the plank turned over (${role0} → ${role1})`);
      }
      /* de / nl word order after SO and BECAUSE */
      if (SUBJ[loc] && (rd.k === 'cause' || rd.k === 'swap-cause')) for (const h of [rd.a, rd.b]) {
        is(!!h.s && !SUBJ[loc].test(h.s), `${tag}: ${loc} after the SO word the verb comes first («${h.s}»)`);
        is(SUBJ[loc].test(h.n) || /^[A-ZÄÖÜ]/.test(h.n) === false, `${tag}: ${loc} after the BECAUSE word the subject comes first («${h.n}»)`);
      }
    }
    if (lvl === '1') is(counts.and === 3 && counts.but === 3 && counts.or === 3, `${loc} L1: and 3 · but 3 · or 3 (${JSON.stringify(counts)})`);
    if (lvl === '2') is((counts.because || 0) + (counts.so || 0) === 9 && counts.because >= 4 && counts.so >= 4, `${loc} L2: because and so (${JSON.stringify(counts)})`);
    if (lvl === '3') is(['and', 'but', 'or', 'because', 'so'].every(k => counts[k] >= 1), `${loc} L3: all five (${JSON.stringify(counts)})`);
    if (lvl === '4') is(Object.keys(counts).length >= 3, `${loc} L4: because, so and and to turn round (${JSON.stringify(counts)})`);
  }
}
for (const p of PICS) { const d = p.slice(0, p.lastIndexOf('/')), f = p.slice(p.lastIndexOf('/') + 1); is(fs.readdirSync(IMG).includes(d) && fs.readdirSync(path.join(IMG, d)).includes(f + '@2x.webp'), `picture ${p} exists (exact case)`); is(!BW.test(d), `${p}: a colour theme`); }

/* ---------------- (b) the model ---------------- */
for (const loc of ALL) {
  for (const lvl of ['1', '2', '3']) for (const r of C.rounds()) {
    const rd = C.round(loc, lvl, r), tag = `${loc} L${lvl}.${r + 1}`, rp = C.rightPlank(rd);
    const s0 = C.newState(loc, lvl, r);
    is(C.check(s0).result === 'empty' && s0.misses === 0 && C.hint(s0) === 'hintEmpty', `${tag}: an empty bridge is no miss`);
    for (const p of rd.rack) {
      if (p === rp && p !== 'arrow') continue;
      const st = C.newState(loc, lvl, r); is(C.lay(st, p) === 'in' && st.gap === p, `${tag}: lay ${p}`);
      if (p === 'arrow' && rp === 'arrow') st.face = C.other(C.rightFace(rd, 'ab'));
      const res = C.check(st), why = p === 'arrow' && rp === 'arrow' ? 'face' : p;
      is(res.result === 'miss' && res.reason === why && C.hint(st) === { and: 'missAnd', but: 'missBut', or: 'missOr', arrow: 'missArrow', face: 'missFace' }[why] && !C.glow(st), `${tag}: ${p} → the ${why} hint`);
      C.check(st); is(C.glow(st) && C.hint(st) === 'missGlow', `${tag}: miss 2 glows`);
      if (st.gap !== rp) C.lay(st, rp); if (rp === 'arrow' && st.face !== C.rightFace(rd, 'ab')) C.flip(st);
      is(!C.glow(st) && C.check(st).result === 'ok', `${tag}: a new move takes the help away; the right plank passes`);
    }
    const s2 = C.newState(loc, lvl, r); C.lay(s2, rp); is(C.lay(s2, rp) === 'back' && s2.gap === null && C.back(s2) === 'no', `${tag}: the same plank again comes back`);
    if (rd.rack.indexOf('arrow') >= 0) { const s3 = C.newState(loc, lvl, r), f = s3.face; is(C.flip(s3) === 'flip' && s3.face === C.other(f), `${tag}: the turner flips the arrow plank on the rack`); }
    if (rd.swappable) {
      const s4 = C.newState(loc, lvl, r); C.lay(s4, 'arrow'); s4.face = C.rightFace(rd, 'ab');
      is(C.swap(s4) === 'turned' && s4.face === C.rightFace(rd, 'ba') && C.check(s4).result === 'ok', `${tag}: swapping turns the arrow plank and keeps the meaning`);
      const d = C.drive(s4), A = s4.order === 'ba' ? 'b' : 'a';
      is(d.path === 'arrow' && d.carried === rd.reason && d.from === (rd.reason === A ? 'left' : 'right'), `${tag}: the car carries the reason from its bank`);
    } else is(C.swap(C.newState(loc, lvl, r)) === 'no', `${tag}: a plain round does not swap`);
    const dv = C.newState(loc, lvl, r); C.lay(dv, rp); if (rp !== 'arrow') is(C.drive(dv).path === { and: 'straight', but: 'turn', or: 'fork' }[rp], `${tag}: the car's way for ${rp}`);
  }
  for (const r of C.rounds()) {
    const rd = C.round(loc, '4', r), tag = `${loc} L4.${r + 1}`, st = C.newState(loc, '4', r);
    is(C.lay(st, 'and') === 'no' && C.back(st) === 'no', `${tag}: the plank stays on the bridge`);
    const c1 = C.check(st); is(c1.result === 'miss' && c1.reason === 'swap' && C.hint(st) === 'missSwap', `${tag}: unswapped → swap it`);
    C.check(st); is(C.glow(st) && C.hint(st) === 'missGlowSwap', `${tag}: miss 2 → the knob glows`);
    C.swap(st);
    if (rd.k === 'swap-cause') { C.flip(st); const c2 = C.check(st); is(c2.reason === 'face' && C.hint(st) === 'missGlowFlip', `${tag}: swapped but turned back by hand → the face`); C.flip(st); }
    is(C.check(st).result === 'ok' && C.okKey(st) === (rd.k === 'swap-and' ? 'okSwapAnd' : 'okTurn'), `${tag}: swapped → solved`);
  }
}

/* ---------------- (c) the plan and the bots ---------------- */
let seed = 17; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
for (const loc of ALL) for (const lvl of C.levels()) {
  let prev = null, bad = 0, rep = 0, restR = 0, causeN = 0; const slot = [0, 0, 0];
  for (let i = 0; i < 200; i++) {
    const P = C.plan(loc, lvl, rnd, prev), o = P.order;
    if (o.slice().sort((a, b) => a - b).join() !== '0,1,2,3,4,5,6,7,8') bad++;
    if (C.runs(loc, lvl, o)) bad++;
    if (prev && prev.join() === o.join()) rep++; prev = o;
    for (const r of o) {
      const rd = C.round(loc, lvl, r, P.trays[r]); if (rd.kind !== 'pick') continue;
      slot[rd.rack.indexOf(C.rightPlank(rd))]++;
      if (rd.k === 'cause') { causeN++; if (rd.face0 === C.rightFace(rd, 'ab')) restR++; }
    }
  }
  is(bad === 0 && rep === 0, `${loc} L${lvl}: 200 plans — every round once, never three alike, a fresh order (${bad}/${rep})`);
  const used = lvl === '2' ? slot.slice(0, 2) : slot, tot = used.reduce((a, b) => a + b, 0);
  if (tot) is(Math.max(...used) - Math.min(...used) <= tot * 0.1, `${loc} L${lvl}: the right plank in every rack slot about equally (${slot.join('/')})`);
  if (causeN) is(restR / causeN >= 0.4 && restR / causeN <= 0.6, `${loc} L${lvl}: the arrow plank rests on its right face ${Math.round(restR / causeN * 100)}% of the time`);
}
/* The bot that ignores the sentence and reads only WHICH planks are dealt. Level-1 FLOOR = 6 of 9, proved: AND may never be
   offered in a but-round (it would also fit), so the three but-rounds hold a set with no AND, unique to them (max 3); the
   three and-rounds and three or-rounds can at best share one set (max ≥ 3) — 3 + 3 = 6. */
const FLOOR = { '1': 6, '2': 5, '3': 4 };
for (const loc of ALL) for (const lvl of ['1', '2', '3']) {
  const sets = {}, R = C.rounds().map(r => C.round(loc, lvl, r));
  R.forEach(rd => { const k = rd.rack.slice().sort().join('+'), w = C.want(rd); (sets[k] = sets[k] || {})[w] = (sets[k][w] || 0) + 1; });
  const blind = Object.values(sets).reduce((a, s) => a + Math.max(...Object.values(s)), 0);
  is(blind <= FLOOR[lvl], `${loc} L${lvl}: the card-set bot wins ${blind}/9 (cap ${FLOOR[lvl]})`);
  const andBot = R.filter(rd => C.rightPlank(rd) === 'and').length, longest = R.reduce((sum, rd) => {
    /* expected wins: the arrow plank rests on either face (50/50), ties go to a random slot (the rack is shuffled) */
    let e = 0; for (const f of ['because', 'so']) { const L = rd.rack.map(p => C.word(loc, p, f).length), m = Math.max(...L), win = rd.rack.filter((p, i) => L[i] === m); if (win.indexOf(C.rightPlank(rd)) >= 0) e += 0.5 / win.length; }
    return sum + e; }, 0);
  if (lvl === '3') { is(andBot <= 2, `${loc} L3: always-and wins ${andBot}/9`); is(longest <= 4, `${loc} L3: the longest word wins ${longest.toFixed(2)}/9 on average`); }
}

/* ---------------- (d) strings, prose, manifest ---------------- */
const SRC = fs.readFileSync(path.join(ACT_DIR, 'turning-bridge-activity.js'), 'utf8'), CSRC = fs.readFileSync(path.join(CORE_DIR, 'turning-bridge-core.js'), 'utf8');
const body = SRC.replace(/\/\*STRINGS-BEGIN\*\/[\s\S]*\/\*STRINGS-END\*\//, '');
is(ACT && ACT.strings && Object.keys(ACT.strings).length >= 40, 'the activity strings load');
for (const k of Object.keys((ACT && ACT.strings) || {})) {
  for (const loc of ALL) {
    const v = ACT.strings[k][loc]; is(typeof v === 'string' && v.length > 0, `${k}.${loc} authored`);
    if (/^hint|^miss|^ok|^t\d/.test(k)) is(!/\d/.test(v), `${k}.${loc}: no digit in a hint`);
    is(!/(?<!\p{L})(free|gratis|kostenlos|gratuit|ilmai\p{L}*|gratuito|grátis)(?!\p{L})/iu.test(v), `${k}.${loc}: never "free"`);
    if (loc === 'fr') is(!/ [:!?;»]/.test(v) && !/'/.test(v), `${k}.fr: narrow spaces and ’`);
    if (loc === 'it') is(!/'/.test(v), `${k}.it: ’`);
  }
  is(['title', 'instruction', 'instrBubble', 'okBubble'].indexOf(k) >= 0 || /^[tl]\d$/.test(k) || CSRC.indexOf("'" + k + "'") >= 0 || body.indexOf("'" + k + "'") >= 0, `string ${k} is asked for`);
}
const QUOTE = { en: /"([^"]+)"/g, de: /„([^“]+)“/g, fr: /« ?([^»]+?) ?»/g, es: /«([^»]+)»/g, pt: /“([^”]+)”/g, it: /«([^»]+)»/g, nl: /‘([^‘’]+)’/g, sv: /”([^”]+)”/g, da: /”([^”]+)”/g, no: /«([^»]+)»/g, fi: /”([^”]+)”/g };
const ID = 'hazel-word-bridge.joining-words.l-1-1-g';
const norm = (s) => s.toLocaleLowerCase().replace(/[  ]/g, ' ').replace(/[.!?]$/, '').replace(/’/g, "'").trim();
for (const loc of ALL) {
  const pr = JSON.parse(fs.readFileSync(path.join(REPO, 'frontend', 'messages', 'activity-content', loc + '.json'), 'utf8')).prose[ID];
  is(!!pr && ['about', 'practices', 'howToPlay', 'learningGoals'].every(k => Array.isArray(pr[k]) && pr[k].length >= 3), `${loc}: the prose entry`);
  const known = new Set(); for (const lvl of C.levels()) for (const r of C.rounds()) { const rd = C.round(loc, lvl, r); if (rd.kind === 'pick') known.add(norm(C.sentence(rd, 'ab', C.rightPlank(rd), C.rightFace(rd, 'ab')))); else { const st = C.newState(loc, lvl, r); known.add(norm(C.sentence(rd, 'ab', st.gap, st.face))); C.swap(st); known.add(norm(C.sentence(rd, 'ba', st.gap, st.face))); } }
  const text = pr ? Object.values(pr).flat().join(' ') : '', qs = [...text.matchAll(QUOTE[loc])].map(m => norm(m[1]));
  is(qs.filter(x => known.has(x)).length >= 1, `${loc}: the prose quotes the activity (${qs.filter(x => known.has(x)).length} of ${qs.length})`);
  if (loc !== 'en') is(!/common core|L\.1\.1/i.test(text), `${loc}: no Common Core in the prose`);
}
const row = JSON.parse(fs.readFileSync(path.join(MT, 'hazel-word-bridge-activities.json'), 'utf8')).find(x => x.id === ID);
is(row && row.tool === 'turning-bridge-activity', 'the manifest row points at the turning bridge');
is(row && Object.keys(row.slug).length === 11 && Object.keys(row.page_title).length === 11 && Object.keys(row.page_intro).length === 11, 'the row ships in all 11 locales');
is(row && row.slug.en === 'hazel-word-bridge' && row.page_title.en === "Hazel's Word Bridge — Joining Words (Grade 1)", 'the en metadata is frozen');
is(row && JSON.stringify(row.params) === JSON.stringify({ level: ['1', '2', '3', '4'], pics: ['show', 'words'], rounds: { '1': 9, '2': 9, '3': 9, '4': 9 } }), "the row's params mirror the core");
console.log(`verify-turning-bridge-core: ${PASS} pass, ${FAIL} fail`);
process.exit(FAIL ? 1 : 0);
