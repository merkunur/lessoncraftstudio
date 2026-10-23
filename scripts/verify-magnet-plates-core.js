#!/usr/bin/env node
/* =====================================================================
   verify-magnet-plates-core.js — the model gate of ACTIVITY #77, The
   Magnet Plates (Sunny-Side Diner, L.K.1.f). The gate carries its OWN
   ground truth — each locale's frame (beginning, end, "and", serial
   comma), its number words and its one-thing articles — written from the
   design sheet, never read off the core. It checks:
     1  every phrase a round can put on a plate exists in all 11 locales and
        has the right SHAPE (a number word for 2/3, an article for 1 — fi: the
        object form; a drink: no number word);
     2  the sentence: beginning cap first, ", " + end cap last, one "and"
        before the last part, the comma rule (a 3-part order: "A, B and C",
        en "A, B, and C"); fi ends with "?"; es "y" never before i-/hi-;
     3  the magnets: no sentence while a joint is empty; an "and" holds only
        where there is a plate on both sides; the end cap only at the end;
        the hatch (check) never opens without both caps;
     4  the rounds: ≥ 7 per level, an order-only reshuffle; the repair rounds
        have exactly ONE wrong plate and the right plate among the spares;
        answer positions balanced (bins, spares, wrong slots); counts 1–3;
        donut and bagel never in one bin row;
     5  the pictures exist (colour) — the manifest mirror, the frozen en/fr
        metadata and the strings (11 locales, fr narrow spaces).
   Run: node scripts/verify-magnet-plates-core.js   (MP_CORE_DIR=<dir> for
   the mutation harness)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), crypto = require('crypto'), vm = require('vm');
const ROOT = path.join(__dirname, '..'), MT = path.join(ROOT, 'mini tools');
const DIR = process.env.MP_CORE_DIR || MT;
const C = require(path.join(DIR, 'magnet-plates-core.js'));
const ACT_SRC = fs.readFileSync(path.join(DIR, 'magnet-plates-activity.js'), 'utf8');
const ACT = (() => { const ctx = { window: {}, MagnetPlatesCore: C }; vm.createContext(ctx); vm.runInContext(ACT_SRC + '\n;this.__A = MagnetPlatesActivity;', ctx); return ctx.__A; })();
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL < 60) console.error('   FAIL: ' + m); } };
const LOCS = ['en', 'de', 'nl', 'da', 'sv', 'no', 'es', 'it', 'pt', 'fr', 'fi'];

/* ---- the gate's own ground truth (design §9) ---- */
const FRAME = {
  en: ['I would like', 'please.', 'and', true], de: ['Ich hätte gern', 'bitte.', 'und', false], nl: ['Ik wil graag', 'alstublieft.', 'en', false],
  da: ['Jeg vil gerne have', 'tak.', 'og', false], sv: ['Jag skulle vilja ha', 'tack.', 'och', false], no: ['Jeg vil gjerne ha', 'takk.', 'og', false],
  es: ['Me da', 'por favor.', 'y', false], it: ['Vorrei', 'per favore.', 'e', false], pt: ['Eu queria', 'por favor.', 'e', false],
  fr: ['Je voudrais', 's’il vous plaît.', 'et', false], fi: ['Saisinko', 'kiitos?', 'ja', false]
};
const NUMW = { en: ['two', 'three'], de: ['zwei', 'drei'], nl: ['twee', 'drie'], da: ['to', 'tre'], sv: ['två', 'tre'], no: ['to', 'tre'], es: ['dos', 'tres'], it: ['due', 'tre'], pt: [['dois', 'duas'], 'três'], fr: ['deux', 'trois'], fi: ['kaksi', 'kolme'] };
const ART = { en: ['a', 'an'], de: ['ein', 'eine', 'einen'], nl: ['een'], da: ['en', 'et'], sv: ['en', 'ett'], no: ['en', 'ei', 'et'], es: ['un', 'una'], it: ['un', 'una', 'uno', 'un’'], pt: ['um', 'uma'], fr: ['un', 'une'] };
const ALLNUM = [].concat(...Object.values(NUMW).map(a => [].concat(...a)));
const firstWord = s => s.split(/[\s’]/)[0];

/* every plate any round can show */
const USED = [];
C.LEVELS.forEach(lv => C.ids(lv).forEach(i => { const r = C.round(lv, i); r.ticket.forEach(p => USED.push(p)); if (r.extra) USED.push(r.extra); if (r.bad) USED.push(r.bad); (r.spare || []).forEach(p => USED.push(p)); }));

/* 1 — phrases */
for (const loc of LOCS) for (const p of USED) {
  let ph = null; try { ph = C.phrase(loc, p); } catch (e) {}
  is(typeof ph === 'string' && ph.length > 1, `${loc} ${p.food}×${p.qty}: a phrase exists`);
  if (!ph) continue;
  is(ph === ph.trim() && !/\s{2}/.test(ph), `${loc} «${ph}»: no stray spaces`);
  is(loc === 'de' || ph === ph.toLocaleLowerCase(loc) || /^(I|Ich)\b/.test(ph), `${loc} «${ph}»: written small (only German nouns are capitals)`);
  if (C.isDrink(p.food)) { is(!ALLNUM.includes(firstWord(ph)), `${loc} «${ph}»: a drink takes no number word`); if (loc === 'en') is(ph === p.food, `en drink is the bare noun («${ph}»)`); continue; }
  if (p.qty >= 2) { const want = [].concat(NUMW[loc][p.qty - 2]); is(want.includes(firstWord(ph)), `${loc} «${ph}»: starts with the number word for ${p.qty}`); }
  else if (loc === 'fi') is(!ALLNUM.includes(firstWord(ph)) && /n$/.test(ph), `fi «${ph}»: one thing = the object form (-n), no numeral`);
  else is(ART[loc].includes(firstWord(ph)) || ART[loc].includes(ph.slice(0, 3)), `${loc} «${ph}»: one thing takes an article`);
  if (loc === 'es') is(!/^h?i/i.test(ph), `es «${ph}»: no i-/hi- word after "y"`);
}
/* the same food at two counts never shares a phrase */
for (const loc of LOCS) { const seen = {}; for (const p of USED) { const k = p.food + p.qty, ph = C.phrase(loc, p); if (seen[ph] && seen[ph] !== k) is(false, `${loc} «${ph}» is used for ${seen[ph]} and ${k}`); seen[ph] = k; } }

/* 2 — the sentence of every round, both 2- and 3-part */
function whole(r, loc) {
  const st = C.newState(r);
  if (st.phase === 'tray') { r.ticket.forEach(p => { for (let k = 0; k < p.qty; k++) C.addToTray(st, p.food); }); is(C.check(st).step === 'rail', `${loc} ${r.id}: the right tray goes to the rail`); }
  if (r.type === 'repair') { C.takeOff(st, r.slot); const k = st.spares.findIndex(s => C.same(s, r.ticket[r.slot])); C.putOn(st, k); }
  st.joints.forEach((j, i) => { if (j !== 'and') { C.lift(st, 'and'); C.dropAt(st, 'joint:' + i); } });
  if (!st.end) { C.lift(st, 'end'); C.dropAt(st, 'dock'); }
  let res = C.check(st);
  if (r.type === 'extend') {
    is(res.step === 'more' && st.plates.length === 3 && !st.end && st.joints.length === 2 && st.joints[1] === null, `${loc} ${r.id}: the first whole sentence brings the third thing (end cap off, a new gap)`);
    C.lift(st, 'and'); C.dropAt(st, 'joint:1'); C.lift(st, 'end'); C.dropAt(st, 'dock'); res = C.check(st);
  }
  is(res.ok && st.done, `${loc} ${r.id}: a whole rail opens the hatch`);
  return st;
}
for (const loc of LOCS) {
  const [S0, E0, A0, SER] = FRAME[loc];
  C.LEVELS.forEach(lv => C.ids(lv).forEach(i => {
    const r = C.round(lv, i), st = whole(r, loc), s = C.sentence(loc, st), parts = st.plates.map(p => C.phrase(loc, p));
    is(typeof s === 'string', `${loc} ${r.id}: the done rail says a sentence`);
    if (!s) return;
    const body = parts.length === 2 ? parts[0] + ' ' + A0 + ' ' + parts[1] : parts[0] + ', ' + parts[1] + (SER ? ', ' : ' ') + A0 + ' ' + parts[2];
    is(s === S0 + ' ' + body + ', ' + E0, `${loc} ${r.id}: «${s}» = the gate's own «${S0} ${body}, ${E0}»`);
    is(s.split(', ').length - 1 === (parts.length === 2 ? 1 : (SER ? 3 : 2)) || /,.*,/.test(E0), `${loc} ${r.id}: the commas of a ${parts.length}-part order`);
    is(loc === 'fi' ? /\?$/.test(s) : /\.$/.test(s), `${loc} ${r.id}: the end mark`);
    is(/^\p{Lu}/u.test(s), `${loc} ${r.id}: starts with a capital`);
    if (loc === 'es') is(!/ y h?i/i.test(s), `es ${r.id}: "y" never before i-/hi-`);
    /* the rail labels: with 3 plates the first coupler is a comma, the last is "and" (en ", and") */
    if (parts.length === 3) { is(C.jointLabel(loc, st, 0) === ',', `${loc} ${r.id}: the first "and" became a comma`); is(C.jointLabel(loc, st, 1) === (SER ? ', ' + A0 : A0), `${loc} ${r.id}: the last joint reads «${SER ? ', ' + A0 : A0}»`); }
    else is(C.jointLabel(loc, st, 0) === A0, `${loc} ${r.id}: two plates are joined by «${A0}»`);
    is(C.say(loc, st.plates) === s, `${loc} ${r.id}: say() = sentence()`);
  }));
}

/* 3 — the magnets */
for (const lv of ['l1', 'l2', 'l4']) C.ids(lv).forEach(i => {
  const r = C.round(lv, i), st = C.newState(r);
  if (st.phase === 'tray') {
    is(C.check(st).reason === 'emptyTray' && st.misses === 0, `${r.id}: an empty tray is a hint, no miss`);
    const f0 = r.ticket[0].food; C.addToTray(st, f0);
    const wrongRes = C.check(st);
    is(wrongRes.reason === 'tray' && st.misses === 1 && st.last.diff.length >= 1, `${r.id}: a short tray is a miss with the foods to change`);
    const other = r.bins.find(f => !r.ticket.some(p => p.food === f));
    r.ticket.forEach(p => { while ((st.tray[p.food] || 0) < p.qty) C.addToTray(st, p.food); });
    C.addToTray(st, other); is(C.check(st).reason === 'tray' && st.last.diff.includes(other), `${r.id}: an extra food on the tray is a miss naming it`);
    C.removeFromTray(st, other);
    const d = r.ticket.find(p => C.isDrink(p.food)); if (d) { C.addToTray(st, d.food); is(C.check(st).reason === 'tray', `${r.id}: two bottles for one drink is a miss`); C.removeFromTray(st, d.food); }
    is(C.check(st).step === 'rail' && st.phase === 'rail', `${r.id}: the exact tray goes to the rail`);
  }
  is(C.check(st).reason === 'emptyRail' && st.phase === 'rail', `${r.id}: Check on an untouched rail is a hint`);
  is(C.sentence('en', st) === null && !C.railWhole(st), `${r.id}: no sentence while the plates are apart`);
  is(C.nudge(st, 0) === 'repel', `${r.id}: unjoined plates push apart`);
  const hook0 = C.hookAnds(st);
  C.lift(st, 'and'); let res = C.dropAt(st, 'open:start'); is(!res.held && res.reason === 'oneSide' && C.hookAnds(st) === hook0, `${r.id}: an "and" before the first plate slides back to its hook`);
  C.lift(st, 'and'); res = C.dropAt(st, 'dock'); is(!res.held && C.hookAnds(st) === hook0 && st.joints.every(j => j === null), `${r.id}: an "and" after the last plate slides back`);
  if (!st.end) { C.lift(st, 'end'); res = C.dropAt(st, 'joint:0'); is(!res.held && res.reason === 'notEnd' && !st.end, `${r.id}: the end cap never sits between plates`); }
  C.lift(st, 'and'); res = C.dropAt(st, 'joint:0'); is(res.held && st.joints[0] === 'and' && C.hookAnds(st) === hook0 - 1, `${r.id}: an "and" in the gap holds the plates`);
  is(C.nudge(st, 0) === 'locked', `${r.id}: joined plates hold`);
  is(!C.lift(st, 'and') || C.hookAnds(st) > 0, `${r.id}: no "and" can be lifted from an empty hook`);
  st.lift = null;
  if (st.end) C.undock(st);
  const before = st.misses; res = C.check(st);
  is(!res.ok && res.reason === 'end' && st.misses === before + 1 && !st.done, `${r.id}: no end cap, no hatch (a miss)`);
  C.lift(st, 'end'); C.dropAt(st, 'dock');
  C.unjoin(st, 0); if (r.endDocked) C.undock(st);   /* (back to the starting rail would be a hint, not a miss) */
  res = C.check(st); is(!res.ok && res.reason === 'gap', `${r.id}: an empty gap keeps the hatch shut`);
  res = C.check(st); is(st.help === 2 && C.hint(st) === 'hMiss2' && C.help(st).piece === 'and' && C.help(st).place === 'joint:0', `${r.id}: miss 2 shows the "and" and its gap`);
});

/* 4 — the rounds */
for (const lv of C.LEVELS) {
  const ids = C.ids(lv); is(ids.length >= 7, `${lv}: ≥ 7 rounds`);
  let prev = null; for (let t = 0; t < 40; t++) { const o = C.plan(lv, Math.random, prev); is(o.slice().sort((a, b) => a - b).join() === ids.join(), `${lv}: a pass is a reshuffle of the same rounds`); if (prev) is(o.join() !== prev.join() && o[0] !== prev[prev.length - 1], `${lv}: never the same order, never its last round first`); prev = o; }
  ids.forEach(i => { const r = C.round(lv, i); r.ticket.concat(r.extra ? [r.extra] : []).forEach(p => is(p.qty >= 1 && p.qty <= 3, `${r.id}: counts 1–3 (never 0)`)); is(new Set(r.ticket.map(p => p.food)).size === r.ticket.length, `${r.id}: the ticket names each food once`); });
}
for (const lv of ['l1', 'l4']) {
  const slots = [0, 0, 0, 0];
  C.ids(lv).forEach(i => {
    const r = C.round(lv, i);
    is(r.bins.length === 4 && new Set(r.bins).size === 4, `${r.id}: four different bins`);
    r.ticket.forEach(p => { const k = r.bins.indexOf(p.food); is(k >= 0, `${r.id}: ${p.food} has a bin`); if (k >= 0) slots[k]++; });
    is(!(r.bins.includes('donut') && r.bins.includes('bagel')), `${r.id}: donut and bagel (both rings) never side by side`);
  });
  const n = C.ids(lv).length * 2 / 4;
  is(slots.every(x => Math.abs(x - n) <= 1), `${lv}: the order foods are spread over the four bins (${slots})`);
}
{
  const wrongSlot = [0, 0], rightAt = [0, 0];
  C.ids('l3').forEach(i => {
    const r = C.round('l3', i), st = C.newState(r);
    const diffs = st.plates.map((p, k) => C.same(p, r.ticket[k]) ? 0 : 1);
    is(diffs.reduce((a, b) => a + b, 0) === 1 && diffs[r.slot] === 1, `${r.id}: exactly one wrong plate, in slot ${r.slot}`);
    is(C.railWhole(st) && C.railFault(st) === 'wrongPlate', `${r.id}: the robot's rail is whole but wrong`);
    const k = r.spare.findIndex(s => C.same(s, r.ticket[r.slot]));
    is(k >= 0 && r.spare.filter(s => C.same(s, r.ticket[r.slot])).length === 1, `${r.id}: the right plate is on the counter once`);
    is(!r.spare.some(s => C.same(s, r.bad)), `${r.id}: the counter never offers the robot's own mistake`);
    is(C.check(st).reason === 'emptyRepair' || C.hint(st) === 'hEmptyRepair', `${r.id}: Check on the robot's untouched rail is a hint`);
    is(st.misses === 0, `${r.id}: … not a miss`);
    is(!C.putOn(st, 0), `${r.id}: nothing goes on a full rail`);
    C.takeOff(st, 1 - r.slot); is(st.plates[1 - r.slot] === null && !C.takeOff(st, r.slot), `${r.id}: one empty place at a time`);
    C.putOn(st, st.spares.length - 1); C.takeOff(st, r.slot);
    const wrong = st.spares.findIndex(s => !C.same(s, r.ticket[r.slot])); C.putOn(st, wrong);
    is(C.check(st).reason === 'wrongPlate', `${r.id}: another wrong plate keeps the hatch shut`);
    wrongSlot[r.slot]++; rightAt[k]++;
  });
  is(Math.abs(wrongSlot[0] - wrongSlot[1]) <= 1, `l3: the wrong plate sits in either slot (${wrongSlot})`);
  is(Math.abs(rightAt[0] - rightAt[1]) <= 1, `l3: the right spare sits in either place (${rightAt})`);
}

/* 5 — pictures, manifest, strings */
const PICS = {}; for (const f of fs.readdirSync(path.join(MT, 'pictures'))) if (f.endsWith('.json') && f[0] !== '_') { const j = JSON.parse(fs.readFileSync(path.join(MT, 'pictures', f), 'utf8')); PICS[j.dir] = j; }
for (const p of Object.values(C.DATA.FOOD_PIC).concat(Object.values(C.DATA.CUSTOMER_PIC))) {
  const i = p.lastIndexOf('/'), d = p.slice(0, i), k = p.slice(i + 1);
  is(!!(PICS[d] && PICS[d].nouns[k]), `picture ${p} is in the library index`);
  is(!/(^|\s)(bw|sw|bn|nb|zw|sh|pb|mv|sv)(\s+\d+)?$/i.test(d), `picture ${p} is colour`);
  if (PICS[d] && PICS[d].nouns[k]) is(fs.existsSync(path.join(ROOT, PICS[d].nouns[k].src.replace(/^\//, ''))), `picture ${p}: the file exists`);
}
const man = (() => { const j = JSON.parse(fs.readFileSync(path.join(DIR === MT ? MT : MT, 'sunny-side-diner-activities.json'), 'utf8')); return (Array.isArray(j) ? j : j.activities).find(a => a.id === 'sunny-side-diner.compound-order.l-k-1-f'); })();
is(man.tool === 'magnet-plates-activity', 'the row runs the Magnet Plates');
for (const loc of LOCS) {
  is(/^[a-z0-9-]+$/.test(man.slug[loc] || ''), `${loc}: a slug`);
  is(!!man.page_title[loc] && !!man.page_intro[loc], `${loc}: a title and an intro`);
  C.LEVELS.forEach(lv => is(man.params.byLocale[loc][lv] === C.ids(lv).map(i => { const r = C.round(lv, i); return C.say(loc, r.ticket.concat(r.extra ? [r.extra] : [])); }).join(' | '), `${loc} ${lv}: the manifest mirror`));
}
const h = crypto.createHash('sha1').update(JSON.stringify(['en', 'fr'].map(l => [man.slug[l], man.page_title[l], man.page_intro[l]]))).digest('hex');
is(h === 'e2482d656c34e4f0143dd88b4f379e2018f652ee', `en/fr metadata frozen (${h})`);
const S = ACT.strings;
for (const k of Object.keys(S)) for (const loc of LOCS) is(typeof S[k][loc] === 'string' && S[k][loc].length > 0, `strings.${k}.${loc}`);
for (const k of Object.keys(S)) { const v = S[k].fr; is(!/ [?!:;]/.test(v) && !/« | »/.test(v), `strings.${k}.fr: narrow no-break spaces`); }
for (const k of Object.keys(S)) for (const loc of LOCS) { const ph = (S[k].en.match(/\{\w+\}/g) || []).sort().join(); is((S[k][loc].match(/\{\w+\}/g) || []).sort().join() === ph, `strings.${k}.${loc}: the same placeholders as en`); }
/* every key is asked for somewhere (the activity, or the core's hint table) */
const CORE_SRC = fs.readFileSync(path.join(DIR, 'magnet-plates-core.js'), 'utf8');
const SHELL = ['title', 'check', 'instrBubble', 'okBubble'];
for (const k of Object.keys(S)) if (!SHELL.includes(k)) is(new RegExp("'" + k + "'").test(ACT_SRC.replace(/\/\*STRINGS-BEGIN\*\/[\s\S]*?\/\*STRINGS-END\*\//, '')) || new RegExp("'" + k + "'").test(CORE_SRC), `strings.${k} is asked for`);
/* the and in the strings that quote it is the locale's own */
for (const loc of LOCS) for (const k of ['fOneSide', 'l2']) is(S[k][loc].toLocaleLowerCase(loc).includes(FRAME[loc][2]), `strings.${k}.${loc} quotes «${FRAME[loc][2]}»`);

console.log(`verify-magnet-plates-core: ${PASS} pass, ${FAIL} fail`);
process.exit(FAIL ? 1 : 0);
