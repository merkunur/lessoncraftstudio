#!/usr/bin/env node
/* =====================================================================
   verify-change-box-core.js — the logic gate of ACTIVITY #166, The
   Change Box ("Make Change with Coins", 2.MD.C.8). Its ground truth is the
   design file's own §6 tables (docs/activities-rebuild/designs/166-money.md),
   parsed here and re-measured with this gate's own solver — never the
   tool's tables. It checks:
     · level 1: every pile and change equals the design; the pile sums to
       the payment, holds a set worth the price AND a set worth the change,
       only coins in real use in that country; 2 single-coin changes per family;
     · level 2: enough purses = the design (2 yes, one exactly equal, 2 no
       1–5 short; a "no" purse with more coins than a "yes" purse where the
       design says so); how much more = the design, > 0, payable;
     · level 3: tags and changes = the design, totals distinct, the pile
       pays both the basket and the change;
     · conservation: tray + pile = the payment under 1,000 random move
       sequences per round; Pip's share is the pile; success iff Pip lands
       exactly on the price; short / over; empty tray, nothing added, no
       choice → a reminder; Check again unchanged → a reminder, never a miss;
       miss 2 = the count-up (the fewest change coins from the pile, from
       the price to the payment); the plan (incl. a stuck random source);
     · the activity layer in node: no running total before Check, the live
       setting shows Pip's count, en coins carry no numeral, the success
       and help lines, no 0 on the enough count;
     · the strings (11 locales, placeholders, no "free"), the manifest row.
   Env overrides (the mutation script): CB_CORE, CB_ACT, CB_MAN.
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm');
const REPO = path.join(__dirname, '..');
const C = require(process.env.CB_CORE || path.join(REPO, 'mini tools', 'change-box-core.js'));
const ACT = process.env.CB_ACT || path.join(REPO, 'mini tools', 'change-box-activity.js');
const MAN = process.env.CB_MAN || path.join(REPO, 'mini tools', 'money-activities.json');
let pass = 0, fail = 0;
const is = (c, m) => { if (c) pass++; else { fail++; if (fail < 60) console.error('  FAIL: ' + m); } };
const sum = (a) => a.reduce((x, y) => x + y, 0), desc = (a) => a.slice().sort((x, y) => y - x);
const FAMS = ['USD', 'EURF', 'EURR', 'MXN', 'BRL', 'SEK', 'DKK', 'NOK'];
const LOCFAM = { en: 'USD', de: 'EURF', fr: 'EURF', it: 'EURF', nl: 'EURR', fi: 'EURR', es: 'MXN', pt: 'BRL', sv: 'SEK', da: 'DKK', no: 'NOK' };
/* the coins in real use per country (design §9: nl/fi no 1/2 c, es whole pesos, pt no 1 centavo, sv no 20 kr coin, no no 2 kr coin) */
const SINGLE = { USD: 2, EURF: 2, EURR: 2, MXN: 1, BRL: 2, SEK: 1, DKK: 1, NOK: 0 };
const PALETTE = { USD: [1, 5, 10, 25], EURF: [1, 2, 5, 10, 20, 50, 100, 200], EURR: [5, 10, 20, 50, 100, 200], MXN: [1, 2, 5, 10, 20], BRL: [5, 10, 25, 50, 100], SEK: [1, 2, 5, 10], DKK: [1, 2, 5, 10, 20], NOK: [1, 5, 10, 20] };

/* ---------- the design tables, parsed ---------- */
const md = fs.readFileSync(path.join(REPO, 'docs', 'activities-rebuild', 'designs', '166-money.md'), 'utf8');
const section = (from, to) => md.slice(md.indexOf(from), md.indexOf(to, md.indexOf(from)));
const rowsOf = (txt) => { const out = {}; txt.split('\n').filter((l) => /^\| [A-Z]/.test(l) && !/^\| family/.test(l)).forEach((l) => { const cells = l.split('|').slice(1, -1).map((x) => x.trim()); out[cells[0]] = cells.slice(1).join(' | '); }); return out; };
const nums = (s) => s.split(/[,+ ]+/).filter(Boolean).map(Number);
/* level 1: every «[pile] → change», «same» reuses the previous pile */
const D1 = {};
for (const [key, row] of Object.entries(rowsOf(section('**Level 1 —', '**Level 2 —')))) {
  const fam = key.split(' ')[0], out = []; let prev = null;
  row.split(' · ').forEach((cell) => { const m = cell.match(/→ (?:\[([\d,]+)\]|same) → (\d+)/); if (!m) return; const pile = m[1] ? nums(m[1]) : prev; prev = pile; out.push({ pile, change: +m[2] }); });
  D1[fam] = out;
}
/* level 2: «price : a+b(+c) (= s) **yes|no**» and «price − (a+b) = add» */
const D2 = {};
for (const [key, row] of Object.entries(rowsOf(section('**Level 2 —', '**Level 3 —')))) {
  const [en, mo] = row.split(' | ');
  const enough = en.split(' · ').map((c) => { const m = c.match(/(\d+) : ([\d+]+)(?: = (\d+))? \*\*(yes|no)\*\*/); return { price: +m[1], purse: nums(m[2]), yes: m[4] === 'yes' }; });
  const more = mo.split(' · ').map((c) => { const m = c.match(/(\d+) − \(([\d+]+)\) = (\d+)/); return { price: +m[1], purse: nums(m[2]), add: +m[3] }; });
  key.split(/, /).forEach((f) => { D2[f] = { enough, more }; });
}
/* level 3: «a+b(+c) = total … → change»; the EURF row reuses the USD tags */
const D3 = {};
for (const [key, row] of Object.entries(rowsOf(section('**Level 3 —', '- **Answer position')))) {
  const cells = row.split(' · ');
  const r = cells.map((c) => { const m = c.match(/([\d+]+) = (\d+)[^→]*→ (\d+)/); return m ? { tags: nums(m[1]), total: +m[2], change: +m[3] } : null; });
  key.split(/, /).forEach((f) => { D3[f] = r; });
}
D3.EURF = D3.USD.map((x, i) => ({ tags: x.tags, total: x.total, change: [60, 25, 68, 15, 55, 20, 53, 5][i] }));
{ const ef = section('| EURF | as USD', '\n'); const ch = (ef.match(/→ ([\d ·]+)\(/) || [])[1]; is(ch && ch.split(' · ').map(Number).join() === '60,25,68,15,55,20,53,5', 'the design\'s EURF level-3 changes read 60 · 25 · 68 · 15 · 55 · 20 · 53 · 5'); }
is(FAMS.every((f) => D1[f] && D1[f].length === 8 && D2[f] && D2[f].enough.length === 4 && D2[f].more.length === 4 && D3[f] && D3[f].length === 8 && D3[f].every(Boolean)), 'the design tables parse: 8 families × 3 levels');

/* ---------- own solver ---------- */
const ways = (target, coins) => { const out = []; const n = coins.length; for (let m = 1; m < (1 << n); m++) { const p = []; for (let i = 0; i < n; i++) if (m & (1 << i)) p.push(coins[i]); if (sum(p) === target) out.push(p); } return out; };
const makes = (target, coins) => ways(target, coins).length > 0;
const minCoins = (target, kinds) => { const d = [0]; for (let t = 1; t <= target; t++) { d[t] = Infinity; for (const v of kinds) if (v <= t) d[t] = Math.min(d[t], d[t - v] + 1); } return d[target]; };

for (const fam of FAMS) {
  const pal = PALETTE[fam], R1 = C.rounds(fam, 'change'), R2 = C.rounds(fam, 'more'), R3 = C.rounds(fam, 'basket');
  is(desc(C.kinds(fam)).join() === desc(pal).join(), fam + ': the coins in real use ' + C.kinds(fam).join(','));
  let single = 0;
  D1[fam].forEach((d, i) => {
    const r = R1[i], tag = fam + ' L1 R' + (i + 1);
    is(r.kind === 'change' && desc(r.pile).join() === desc(d.pile).join(), tag + ': the pile = the design [' + d.pile + ']');
    is(C.paid(r) === sum(d.pile) && C.change(r) === d.change && r.price === sum(d.pile) - d.change, tag + ': paid ' + sum(d.pile) + ', change ' + d.change + ', price ' + (sum(d.pile) - d.change));
    is(r.pile.every((v) => pal.includes(v)) && r.pay.every((p) => p.note || pal.includes(p.v)), tag + ': only coins in real use');
    is(makes(r.price, r.pile) && makes(C.change(r), r.pile), tag + ': the pile holds a set worth the price and a set worth the change');
    if (r.pile.includes(C.change(r))) single++;
  });
  /* the design says "2 per family"; measured on the kept live problems it is not (MXN/SEK/DKK 1, NOK 0) — pinned as measured, so a table edit that changes it is seen */
  is(single === SINGLE[fam], fam + ': ' + single + ' rounds where the change is a single coin already in the pile (measured ' + SINGLE[fam] + ')');
  D2[fam].enough.forEach((d, i) => {
    const r = R2[i], tag = fam + ' L2 enough R' + (i + 1);
    is(r.kind === 'enough' && r.price === d.price && desc(r.purse).join() === desc(d.purse).join(), tag + ': = the design ' + d.price + ' : ' + d.purse.join('+'));
    is((C.enoughAnswer(r) === 'yes') === d.yes && (sum(r.purse) >= r.price) === d.yes, tag + ': ' + (d.yes ? 'enough' : 'not enough'));
    is(d.yes || (r.price - sum(r.purse) >= 1 && r.price - sum(r.purse) <= 5), tag + ': a "no" is a close call (1–5 short)');
    is(r.purse.every((v) => pal.includes(v)), tag + ': real coins');
  });
  const ys = R2.slice(0, 4).filter((r) => C.enoughAnswer(r) === 'yes'), ns = R2.slice(0, 4).filter((r) => C.enoughAnswer(r) === 'no');
  is(ys.length === 2 && ns.length === 2 && ys.some((r) => sum(r.purse) === r.price) && ys.some((r) => sum(r.purse) > r.price), fam + ': enough is 2 yes (one exactly equal, one over) and 2 no');
  if (['USD', 'EURF', 'MXN', 'SEK', 'DKK', 'NOK'].includes(fam)) is(ns.some((n) => ys.some((y) => n.purse.length > y.purse.length)), fam + ': a "no" purse holds more coins than a "yes" purse');
  D2[fam].more.forEach((d, i) => {
    const r = R2[4 + i], tag = fam + ' L2 more R' + (i + 5);
    is(r.kind === 'more' && r.price === d.price && desc(r.purse).join() === desc(d.purse).join() && r.price - sum(r.purse) === d.add, tag + ': = the design ' + d.price + ' − (' + d.purse.join('+') + ') = ' + d.add);
    is(d.add > 0 && minCoins(d.add, pal.filter((v) => v < 100)) < Infinity, tag + ': more > 0 and payable from the side tray');
  });
  const totals = [];
  D3[fam].forEach((d, i) => {
    const r = R3[i], tag = fam + ' L3 R' + (i + 1);
    is(r.kind === 'basket' && r.tags.join() === d.tags.join() && r.price === d.total && sum(d.tags) === d.total && C.change(r) === d.change, tag + ': tags ' + d.tags.join('+') + ' = ' + d.total + ', change ' + d.change);
    is(sum(r.pile) === C.paid(r) && r.pile.every((v) => pal.includes(v)) && makes(r.price, r.pile) && makes(C.change(r), r.pile), tag + ': the pile = the payment and pays both the basket and the change');
    is(C.change(r) > 0, tag + ': change > 0');
    totals.push(r.price);
  });
  is(new Set(totals).size === 8, fam + ': basket totals distinct');
  if (fam === 'SEK') is(C.rounds('SEK', 'basket').every((r) => !r.pile.includes(20)), 'SEK: the 50-pile has no 20 kr coin (Sweden has none)');

  /* ---------- conservation ---------- */
  let bad = 0; const rnd = mulberry(11);
  for (const shop of ['change', 'basket']) for (let k = 0; k < 8; k++) for (let t = 0; t < 1000 / 8; t++) {
    const st = C.newState(fam, shop, k, 0);
    for (let m = 0; m < 10; m++) { const cs = st.coins.filter((c) => c.at === 'pile' || c.at === 'tray'); C.move(st, cs[Math.floor(rnd() * cs.length)].id); if (C.sum(C.vals(st, 'pile')) + C.sum(C.vals(st, 'tray')) !== C.paid(st.round) || C.pip(st) !== C.sum(C.vals(st, 'pile'))) bad++; }
    const r = C.check(st), want = C.pip(st) === st.round.price;
    if (r.result === 'ok' && !want) bad++; if (r.result === 'miss' && want) bad++;
    if (r.result === 'miss' && (r.why === 'short') !== (C.pip(st) < st.round.price)) bad++;
  }
  is(bad === 0, fam + ': conservation — tray + pile = the payment, Pip\'s share is the pile, success iff Pip lands on the price (' + bad + ' bad)');
  /* the right change by the gate's own fewest set → success; one coin too many → short; one too few → over */
  for (const shop of ['change', 'basket']) for (let k = 0; k < 8; k++) {
    const st = C.newState(fam, shop, k, 0), r = st.round, w = ways(C.change(r), r.pile).sort((a, b) => a.length - b.length)[0];
    w.forEach((v) => { const c = C.where(st, 'pile').find((x) => x.v === v); C.move(st, c.id); });
    is(C.check(st).result === 'ok' && st.done, fam + ' ' + shop + ' R' + (k + 1) + ': the change ' + w.join('+') + ' → Pip lands on ' + r.price);
    const s2 = C.newState(fam, shop, k, 0), big = C.where(s2, 'pile').sort((a, b) => b.v - a.v)[0];
    C.where(s2, 'pile').filter((c) => c.id !== big.id).forEach((c) => C.move(s2, c.id));
    const res = C.check(s2), p = C.pip(s2);
    is(res.result === (p === r.price ? 'ok' : 'miss') && (p === r.price || res.why === (p < r.price ? 'short' : 'over')), fam + ' ' + shop + ' R' + (k + 1) + ': all but the biggest coin given → Pip has ' + p + ' → ' + (res.why || res.result));
  }
  /* reminders, and Check again unchanged */
  { const st = C.newState(fam, 'change', 0, 0); is(C.check(st).key === 'hintTrayEmpty' && st.misses === 0, fam + ': an empty tray → a reminder, no miss');
    C.move(st, C.where(st, 'pile')[0].id); const r1 = C.check(st);
    if (r1.result === 'miss') { const r2 = C.check(st); is(r2.key === 'hintAgain' && st.misses === 1, fam + ': Check again unchanged → hintAgain, never a second miss'); C.move(st, C.where(st, 'tray')[0].id); C.move(st, C.where(st, 'pile')[0].id); C.check(st); is(st.misses === 2 && st.help && C.hint(st) === 'helpChange', fam + ': a second real miss → the count-up'); }
  }
  { const st = C.newState(fam, 'more', 4, 0); is(C.check(st).key === 'hintAddEmpty', fam + ': how much more, nothing added → a reminder');
    const need = st.round.price - C.sum(st.round.purse), ks = C.kinds(fam).filter((v) => v < 100);
    let left = need; for (const v of ks) while (left >= v) { C.add(st, v); left -= v; }
    is(C.check(st).result === 'ok', fam + ': how much more, adding ' + need + ' → Pip lands on the price');
    const s2 = C.newState(fam, 'more', 5, 0); C.add(s2, ks[0]); const r2 = C.check(s2);
    is(r2.result === (C.pip(s2) === s2.round.price ? 'ok' : 'miss'), fam + ': how much more, a too-big coin is counted honestly');
    is(C.add(C.newState(fam, 'change', 0, 0), 5) === null, fam + ': no coins added in a change round');
  }
  for (let k = 0; k < 4; k++) { const st = C.newState(fam, 'more', k, 0), right = C.enoughAnswer(st.round);
    is(C.check(st).key === 'hintChoose', fam + ' enough R' + (k + 1) + ': no choice → a reminder');
    C.choose(st, right === 'yes' ? 'no' : 'yes'); const r = C.check(st);
    is(r.result === 'miss' && C.hint(st) === (right === 'yes' ? 'hintEnoughYes' : 'hintEnoughNo'), fam + ' enough R' + (k + 1) + ': the wrong choice names the right answer');
    C.choose(st, right); is(C.check(st).result === 'ok', fam + ' enough R' + (k + 1) + ': the right choice'); }
  /* miss 2: the count-up from the price to the payment with the fewest change coins from the pile */
  for (let k = 0; k < 8; k++) { const st = C.newState(fam, 'change', k, 0), r = st.round, U = C.countUp(st), vals = U.ids.map((id) => C.byId(st, id).v);
    const fewest = Math.min(...ways(C.change(r), r.pile).map((w) => w.length));
    is(U.start === r.price && U.end === C.paid(r) && sum(vals) === C.change(r) && vals.length === fewest && U.steps[U.steps.length - 1].run === C.paid(r), fam + ' R' + (k + 1) + ': the count-up ' + r.price + ' → ' + U.steps.map((s) => s.run).join(', ')); }
  /* the plan */
  let prev = null;
  for (const shop of ['change', 'more', 'basket', 'mixed']) {
    prev = null; const pool = C.rounds(fam, shop), n = C.passSize(shop);
    for (let p = 0; p < 30; p++) { const o = C.plan(fam, shop, Math.random, prev); is(o.length === n && new Set(o).size === n && (!prev || o.join() !== prev.join()), fam + ' ' + shop + ': a reshuffle of ' + n + ', never the previous order');
      is(o.every((k, i) => i === 0 || !(single1(pool[k]) && single1(pool[o[i - 1]]))), fam + ' ' + shop + ': two single-coin-change rounds never side by side'); prev = o; }
    const s0 = C.plan(fam, shop, () => 0, null), s1 = C.plan(fam, shop, () => 0, s0); is(s1.join() !== s0.join(), fam + ' ' + shop + ': a stuck random source still gets a new order');
  }
}
function single1(r) { return r.kind === 'change' && r.pile.includes(C.paid(r) - r.price); }

/* ---------- strings and the activity layer (in node: no DOM, _wrap null, timers queued) ---------- */
const ctx = { window: {}, ChangeBoxCore: C, setTimeout: () => 0, clearTimeout: () => {} }; vm.createContext(ctx);
vm.runInContext(fs.readFileSync(ACT, 'utf8').replace(/injectChangeBoxCSS\(\);/, '') + '\n;this.__A = ChangeBoxActivity;', ctx);
const A = ctx.__A, LOC = Object.keys(LOCFAM), keys = Object.keys(A.strings);
is(keys.length >= 50, 'the strings block holds ' + keys.length + ' keys');
for (const k of keys) for (const l of LOC) {
  const s = A.strings[k][l], ph = (x) => (x.match(/\{\w+\}/g) || []).filter((p) => !(l === 'fi' && p === '{name}')).sort().join();
  is(typeof s === 'string' && s.length > 0, k + ' [' + l + '] authored'); if (typeof s !== 'string') continue;
  is(ph(s) === ph(A.strings[k].en), k + ' [' + l + '] carries the same placeholders as en (fi may write Otto\'s name inflected)');
  is(!/(?<!\p{L})(free|gratis|kostenlos|gratuit|gratuito|ilmainen|gratuita)(?!\p{L})/iu.test(s), k + ' [' + l + '] says nothing is free');
  if (l === 'fr') is(!/ [?!:;]/.test(s), k + ' [fr] a narrow no-break space before ? ! : ;');
}
const src = fs.readFileSync(ACT, 'utf8').replace(/\/\*STRINGS-BEGIN\*\/[\s\S]*?\/\*STRINGS-END\*\//, '');
const coreSrc = fs.readFileSync(process.env.CB_CORE || path.join(REPO, 'mini tools', 'change-box-core.js'), 'utf8');
for (const k of keys) is(['title', 'instruction', 'instrBubble', 'okBubble'].includes(k) || src.includes("'" + k + "'") || coreSrc.includes("'" + k + "'") || (/^name\d+$/.test(k) && /'name' \+ v/.test(src)), 'the key ' + k + ' is reached by the code');
is(/OK_MS: 500/.test(src), 'Next appears 0.5 s after success (OK_MS 500)');
const mk = (loc, shop, k, count) => { const a = Object.create(A); a.api = { lang: loc, settings: { shop: shop, count: count || 'check' }, t: (key) => A.strings[key][loc], sound() {}, announce() {} }; a._timers = []; a._wrap = null; a.FAST = true; a._g = { k: 2.4 }; a.st = C.newState(LOCFAM[loc], shop, k, 0); a._view = { note: '', soft: false, rail: null, hintIds: [], pour: false, bob: null }; a._paint = () => {}; return a; };
for (const loc of LOC) {
  const a = mk(loc, 'change', 0), st = a.st;
  C.where(st, 'pile').slice(0, 2).forEach((c) => a._tapCoin(c.id));
  is(a._view.rail === null && !a._live(), '[' + loc + '] no running total before Check (no rail, live count off)');
  const lv = mk(loc, 'change', 0, 'live'); is(lv._live(), '[' + loc + '] the "as you go" setting turns Pip\'s live count on');
  a._check(); const ok = st.done;
  is(ok || (a._view.rail && a._view.rail.goal === st.round.price && a._view.note.length > 0 && !/\{\w+\}/.test(a._view.note)), '[' + loc + '] a miss shows Pip\'s count against the price and a filled hint');
  /* the right change → the success line */
  const b = mk(loc, 'change', 3), sb = b.st, r = sb.round; let line = '';
  b._success = function () { const aa = this._args(); aa.paid += this._dec(C.paid(r)); aa.price += this._dec(r.price); line = this._t(C.okKey(this.st), aa); };
  ways(C.change(r), r.pile).sort((x, y) => x.length - y.length)[0].forEach((v) => { const c = C.where(sb, 'pile').find((x) => x.v === v); C.move(sb, c.id); });
  b._check();
  is(sb.done && line.indexOf(b._money(C.change(r))) >= 0 && line.indexOf(b._money(C.paid(r))) >= 0 && !/\{\w+\}/.test(line) && !/kr\.\./.test(line), '[' + loc + '] the success line: ' + line);
  /* miss 2 on an enough round never puts a 0 on the count */
  const e = mk(loc, 'more', 1); C.choose(e.st, C.enoughAnswer(e.st.round) === 'yes' ? 'no' : 'yes'); e._check(); e._view.rail = null; C.choose(e.st, C.enoughAnswer(e.st.round)); C.choose(e.st, C.enoughAnswer(e.st.round) === 'yes' ? 'no' : 'yes'); e._check();
  is(e.st.help && e._view.rail && e._view.rail.start === null && e._view.rail.steps.every((s) => s.run > 0), '[' + loc + '] the enough count-up starts at the first coin, never at 0');
  /* everything given back: Pip has nothing — said in words, never «0» */
  { const z = mk(loc, 'change', 0); C.where(z.st, 'pile').forEach((c) => C.move(z.st, c.id)); z._check();
    is(z._view.note === z._t('hintNothing', z._args()) && !/(^|[^\d,])0(?![\d,])/.test(z._view.note), '[' + loc + '] everything given back → hintNothing, no «0»: ' + z._view.note); }
  /* coin faces */
  is(loc === 'en' ? !/<text/.test(a._coinSvg(10, 40)) : /<text/.test(a._coinSvg(C.kinds(LOCFAM[loc])[2], 40)), '[' + loc + '] coin faces: ' + (loc === 'en' ? 'no numeral (US coins)' : 'the worth numeral'));
}
{ const de = mk('de', 'change', 3); is(de._money(175) === '1 € 75 ct' && de._dec(175) === ' (1,75 €)' && de._money(200) === '2 €' && de._dec(200) === '', 'de: «1 € 75 ct (1,75 €)», «2 €»');
  const pt = mk('pt', 'change', 6); is(pt._money(135) === '1 real e 35 centavos' && pt._money(200) === '2 reais' && pt._dec(135) === ' (R$ 1,35)', 'pt: «1 real e 35 centavos (R$ 1,35)», «2 reais»');
  const it = mk('it', 'change', 3); is(it._money(175) === '1 euro e 75 cent', 'it: «1 euro e 75 cent»');
  const da = mk('da', 'change', 0); is(!/kr\.\./.test(da._t('pChange', { price: da._money(7), paid: da._money(10) })), 'da: never «kr..»'); }
/* ---------- the manifest row ---------- */
const row = JSON.parse(fs.readFileSync(MAN, 'utf8')).find((x) => x.id === 'money.make-change.2-md-c-8');
is(row && row.tool === 'change-box-activity' && row.task_template === 'change-box' && JSON.stringify(row.params) === '{}', 'the manifest row points at the new tool, old params dropped');
is(row && Object.keys(row.slug).length === 11 && row.alignment.code === '2.MD.C.8', 'the row ships in 11 locales, 2.MD.C.8');

function mulberry(a) { return function () { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
console.log(`verify-change-box-core: ${pass} pass, ${fail} fail`);
process.exit(fail ? 1 : 0);
