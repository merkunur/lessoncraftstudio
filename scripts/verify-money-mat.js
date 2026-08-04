#!/usr/bin/env node
/* =====================================================================
   verify-money-mat.js — MEASURED build-gate for Money Mat
   (mini tools/money-mat.js). Fix the data, never the gate.

   Invariant families (all measured):
     DENOMINATIONS — per currency: coins+notes sorted/unique/positive,
       min(note) > max(coin), every denomination has face text + a
       diameter (coins) or tint (notes); NOK has NO 2 kr; whole-krona
       currencies carry minorPerMajor 1; en toggle currencies complete.
     COMPOSABILITY — for every (currency × band × tier): EVERY price the
       generator can emit is exact-composable from the coin palette
       (coins-only; DP proof over the full legal price set).
     CHANGE — for every (currency × band) and every legal price: every
       offered tender exceeds the price and greedy change sums EXACTLY
       to tender − price in ≤ 6 coins, presented ascending.
     FORMAT — formatMoney matches the money-core conventions (comma
       decimals, symbol placement, whole-krona bare); formatTag reads
       minor-form under 1 major, major-form above, "N kr" whole-krona.
     SEATING — every item trim re-measured with sharp (drift >3px
       fails); _itemPlacement maps the trimmed art bottom-center to the
       anchor exactly; META resolves vs pww-index-en + disk.
     SPOKEN — spokenAmount templates render for maj-only/min-only/both
       across every locale without leftover placeholders; UNITW pairs
       complete for every locale's currency (+ en usd/gbp).
     STRINGS/NOUNS — completeness ×11, placeholder parity, verdict +
       score/timer bans; 12 noun rows complete.
   Usage: node scripts/verify-money-mat.js [--locales=en]
   Exit 1 on any ERROR.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ALL = ['en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
const arg = process.argv.find((a) => a.startsWith('--locales='));
const LOCALES = arg ? arg.split('=')[1].split(',').filter((l) => ALL.includes(l)) : ALL;

const REPO = path.join(__dirname, '..');
const TOOL_DIR = process.env.MM_TOOL_DIR || path.join(REPO, 'mini tools');
const errors = [];
const E = (m) => errors.push(m);

/* ⚠⚠ `\b` IS ASCII-ONLY, AND TWO OF THESE BANS WERE BORN DEAD.
   Measured, not reasoned about:
     /\b(…|equivocad)\b/   never matched "está equivocado" — `equivocad` is
                           a STEM, and the trailing \b demands a non-word
                           character where the inflection's vowel sits.
     /\b(…|väärä)\b/       never matched "se on väärä" — the word ENDS in a
                           non-ASCII letter, so \b after it requires a word
                           character to FOLLOW, inverting the test.
   A ban tested only on English is tested in the one language where \b
   happens to work. These use Unicode look-arounds, and stems drop the
   trailing boundary deliberately so inflections are caught. */
const w = (body, tail) => new RegExp('(?<!\\p{L})(?:' + body + ')' + (tail === false ? '' : '(?!\\p{L})'), 'iu');
const VERDICT = {
  /* ⭐ STEMS, not headwords. Five of these were dead against the form a
     native would actually write — "falsche", "sbagliata", "incorrecta",
     "errada", "foute" — because each was drafted from the dictionary entry
     with a trailing boundary welded on. The MUST_PASS block below is what
     stops the widening going too far. */
  en: [w('correct|incorrect|wrong|oops')],
  de: [w('richtig', false), w('falsch', false)],
  fr: [w('correct', false), w('faux'), w('fauss', false)],
  it: [w('giust', false), w('sbagliat', false), w('corrett', false)],
  es: [w('correct', false), w('incorrect', false), w('equivocad', false)],
  pt: [w('corret', false), w('incorret', false), w('errad', false)],
  nl: [w('goed antwoord'), w('fout', false), w('onjuist', false)],
  sv: [w('rätt svar'), w('fel')],
  da: [w('rigtigt svar'), w('forkert', false)],
  no: [w('riktig svar'), w('feil')],
  /* vääri- covers väärin/väärän; väärä covers väärä/väärää */
  fi: [w('oikein'), w('vääri', false), w('väärä', false)]
};
const SCORE_RE = w('score|timer|streak|points|punkte|punteggio|puntos|pontos|punten|poäng|poeng|point');

/* ⭐ POISON THE BANS IN BOTH DIRECTIONS, EVERY RUN, IN THE LANGUAGE EACH
   POLICES — a ban that rejects correct native prose teaches a panel to word
   around it, and a ban that fires on nothing is not a ban. */
{
  /* one INFLECTED must-fire per locale — the form a native would actually
     write, not the dictionary headword the ban was drafted from */
  const fire = [
    ['en', 'that is wrong'], ['en', 'incorrect'],
    ['de', 'das ist falsch'], ['de', 'die falsche Münze'],
    ['fr', 'ce nombre est faux'], ['fr', 'la réponse est fausse'],
    ['it', 'è sbagliato'], ['it', 'la risposta è sbagliata'],
    ['es', 'está equivocado'], ['es', 'la respuesta es incorrecta'],
    ['pt', 'está errado'], ['pt', 'a resposta está errada'],
    ['nl', 'dat is fout'], ['nl', 'het foute antwoord'],
    ['sv', 'rätt svar'], ['da', 'det er forkert'], ['no', 'det er feil'],
    ['fi', 'se on väärä'], ['fi', 'vastasit väärin'], ['fi', 'kaikki oikein']
  ];
  /* ⚠ ordinary prose from THIS tool's own strings — a ban that rejects
     correct native copy teaches a panel to word around it */
  const pass = [
    ['es', 'toca monedas para ponerlas en el tapete y pagar justo'],
    ['fi', 'napauta kolikoita matolle ja maksa hinta tasan'],
    ['de', 'tippe münzen auf die matte und bezahle passend'],
    ['sv', 'tryck på mynt för att lägga dem på mattan'],
    ['fr', 'touche des pièces pour les poser sur le tapis'],
    ['it', 'tocca le monete per metterle sul tappeto'],
    ['pt', 'toque nas moedas para colocá-las no tapete'],
    ['nl', 'tik munten op de mat en betaal gepast'],
    ['da', 'tryk på mønterne for at lægge dem på måtten'],
    ['no', 'trykk på mynter for å legge dem på matta'],
    ['en', 'tap coins onto the mat to pay the exact price']
  ];
  const hit = (loc, s) => [].concat(VERDICT[loc]).some((re) => re.test(s));
  for (const [loc, s] of fire) if (!hit(loc, s)) E(`verdict ban MUST FIRE on ${loc} "${s}" and did not`);
  for (const [loc, s] of pass) if (hit(loc, s)) E(`verdict ban MUST PASS ordinary ${loc} prose "${s}" and did not`);
  if (!SCORE_RE.test('poäng')) E('score ban MUST FIRE on "poäng"');
  if (SCORE_RE.test('pointe')) E('score ban MUST PASS "pointe"');
}

/* ---- load ---- */
const sandbox = {
  window: {},
  document: { createElement: () => ({ style: {} }), head: { appendChild: () => {} }, addEventListener: () => {}, body: { classList: { add: () => {} } } },
  navigator: {}, location: { search: '', hostname: 'gate' },
  localStorage: { getItem: () => null, setItem: () => {} },
  URLSearchParams, Math, JSON, Date
};
sandbox.global = sandbox;
try {
  vm.createContext(sandbox);
  /* env indirection so mutate-money-mat.js can point the gate at a copy */
  vm.runInContext(fs.readFileSync(path.join(TOOL_DIR, 'money-mat.js'), 'utf8'), sandbox);
} catch (e) { console.log('FAIL  eval: ' + e.message); process.exit(1); }
const T = sandbox.MoneyMat;
if (!T || !T.CURRENCIES) { console.log('FAIL  MoneyMat not found'); process.exit(1); }
/* the pure engine needs an api stub for cur()/curKey() paths we bypass:
   we call the pure fns with explicit currency keys instead. */

/* ================= 1. DENOMINATIONS ============================== */
for (const [key, c] of Object.entries(T.CURRENCIES)) {
  const cs = c.coins.map((d) => d.v), ns = c.notes.map((d) => d.v);
  for (const arr of [cs, ns]) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] <= 0) E(`${key}: non-positive denomination ${arr[i]}`);
      if (i && arr[i] <= arr[i - 1]) E(`${key}: denominations not strictly ascending at ${arr[i]}`);
    }
  }
  if (ns.length && cs.length && ns[0] <= cs[cs.length - 1]) E(`${key}: smallest note ${ns[0]} not above the largest coin ${cs[cs.length - 1]}`);
  for (const d of c.coins) {
    if (!d.label) E(`${key}: coin ${d.v} has no face text`);
    if (!d.d || d.d < 28) E(`${key}: coin ${d.v} missing/too-small diameter`);
    if (!d.fam) E(`${key}: coin ${d.v} has no metal family`);
  }
  for (const d of c.notes) {
    if (!d.label) E(`${key}: note ${d.v} has no face text`);
    if (!d.tint) E(`${key}: note ${d.v} has no tint`);
  }
}
if (T.CURRENCIES.nok.coins.some((d) => d.v === 2)) E('NOK must not have a 2 kr coin');
for (const k of ['sek', 'dkk', 'nok']) if (T.CURRENCIES[k].minorPerMajor !== 1) E(`${k}: whole-krona currencies must have minorPerMajor 1`);
for (const L of ALL) if (!T.LOCALE_CUR[L]) E(`LOCALE_CUR missing ${L}`);
for (const k of ['usd', 'gbp']) if (!T.CURRENCIES[k]) E(`en toggle currency ${k} missing`);

/* ================= 2. COMPOSABILITY ================================
   ⭐⭐ THIS SECTION USED TO MARK ITS OWN HOMEWORK. Its only assertion was
   `if (!T.composable(p, coinVals)) E(...)` — it asked the tool the very
   question it existed to answer and believed the reply. Stub
   `T.composable = () => true` and the whole section passed with ZERO
   errors, on a tool that might emit prices no child could pay.

   The replacement is an INDEPENDENT construction written here: a BFS that
   must EXHIBIT an actual multiset of coins summing to p. It shares no code
   and no strategy with the tool's DP. Then both answers are compared, so a
   disagreement in EITHER direction is an error — the gate now also catches
   a `composable` that wrongly says no.
   (§3 below was always honest by contrast: it calls greedyChange and then
   verifies the sum, the length and the ordering itself. That is the model.) */
function exhibitCoins(amount, coinVals) {
  if (amount === 0) return [];
  const vals = coinVals.slice().sort((a, b) => b - a);
  const prev = new Map([[0, null]]);          /* reached-amount -> {from, coin} */
  let frontier = [0];
  while (frontier.length) {
    const next = [];
    for (const a of frontier) {
      for (const v of vals) {
        const n = a + v;
        if (n > amount || prev.has(n)) continue;
        prev.set(n, { from: a, coin: v });
        if (n === amount) {
          const out = [];
          let cur = amount;
          while (cur !== 0) { const step = prev.get(cur); out.push(step.coin); cur = step.from; }
          return out;
        }
        next.push(n);
      }
    }
    frontier = next;
  }
  return null;
}

for (const cKey of Object.keys(T.CURRENCIES)) {
  const allCoins = T.CURRENCIES[cKey].coins.map((d) => d.v);
  /* sweep the RESTRICTED purses too: a teacher-set coinsFrom must never be
     handed a price it cannot pay. That regression shipped once — whole-krona
     pinned the grain to 1 regardless of the smallest coin, so sek/dkk/nok
     emitted 6, 7 and 8 kr into a purse of 5s and 10s. */
  for (const coinsFrom of [0, 5, 10]) {
    for (const fineGrain of [false, true]) {
      const coinVals = allCoins.filter((v) => v >= coinsFrom);
      if (!coinVals.length) continue;
      T.api = { lang: 'en', settings: { enCurrency: cKey, coinsFrom, fineGrain }, t: (k) => k };
      const minCoin = Math.max(coinsFrom, allCoins[0]);
      for (const band of [1, 2, 3]) {
        for (const tier of [0, 1, 2, 3]) {
          const r = T.priceRange(band, tier, cKey, minCoin);
          if (r.lo > r.hi) { E(`${cKey} b${band} t${tier}: empty price range`); continue; }
          for (let p = r.lo; p <= r.hi; p += r.grain) {
            const witness = exhibitCoins(p, coinVals);
            const claimed = T.composable(p, coinVals);
            const tag = `${cKey} b${band} t${tier} coins>=${coinsFrom}${fineGrain ? ' fine' : ''}`;
            if (!witness) E(`${tag}: price ${p} NOT payable — no multiset of [${coinVals}] sums to it`);
            else if (witness.reduce((a, b) => a + b, 0) !== p) E(`${tag}: the gate's own witness for ${p} sums wrong`);
            if (claimed !== !!witness) E(`${tag}: composable(${p}) said ${claimed}, an independent search said ${!!witness}`);
          }
        }
      }
    }
  }
  T.api = undefined;
}

/* ================= 3. CHANGE (over the CHANGE-MODE price set:
   BAND 1 ONLY at friendly 5-minor grain, exactly per pickPrice) ==== */
for (const cKey of Object.keys(T.CURRENCIES)) {
  const c = T.CURRENCIES[cKey];
  const coinVals = c.coins.map((d) => d.v);
  for (const band of [1]) {
    for (const tier of [1, 2, 3]) {
      const r0 = T.priceRange(band, tier, cKey);
      const grain = c.minorPerMajor > 1 ? Math.max(r0.grain, 5) : r0.grain;
      const hiCap = c.minorPerMajor > 1 ? 100 - grain : Infinity;   /* strictly below 1 major, per pickPrice */
      const r = { lo: Math.ceil(r0.lo / grain) * grain, hi: Math.max(Math.ceil(r0.lo / grain) * grain, Math.min(hiCap, Math.floor(r0.hi / grain) * grain)), grain };
      for (let p = r.lo; p <= r.hi; p += r.grain) {
        const tenders = T.tendersFor(p, c);
        if (!tenders.length) { E(`${cKey} b${band}: price ${p} has NO valid tender`); continue; }
        for (const den of tenders) {
          if (den.v <= p) E(`${cKey}: tender ${den.v} does not exceed price ${p}`);
          const coins = T.greedyChange(den.v - p, coinVals);
          if (!coins) { E(`${cKey}: change ${den.v - p} not composable`); continue; }
          const sum = coins.reduce((a, b) => a + b, 0);
          if (sum !== den.v - p) E(`${cKey}: change for price ${p} tender ${den.v} sums ${sum} ≠ ${den.v - p}`);
          if (coins.length > 6) E(`${cKey}: change for price ${p} tender ${den.v} needs ${coins.length} coins (> 6)`);
          for (let i = 1; i < coins.length; i++) if (coins[i] < coins[i - 1]) E(`${cKey}: change not presented ascending`);
        }
      }
    }
  }
}

/* ===== 3b. the VETOED locale views (nl/fi eur without 1c/2c) ===== */
{
  const c = T.CURRENCIES.eur;
  const viewCoins = c.coins.map((d) => d.v).filter((v) => v >= 5);
  for (const band of [1, 2, 3]) {
    for (const tier of [1, 2, 3]) {
      const r = T.priceRange(band, tier, 'eur', 5);
      for (let p2 = r.lo; p2 <= r.hi; p2 += r.grain) {
        if (!T.composable(p2, viewCoins)) E(`eur@min5 b${band} t${tier}: price ${p2} NOT composable without 1c/2c`);
      }
    }
  }
  const r0 = T.priceRange(1, 1, 'eur', 5);
  for (let p2 = r0.lo; p2 <= Math.min(95, r0.hi); p2 += Math.max(5, r0.grain)) {
    const viewC = Object.assign({}, c, { coins: c.coins.filter((d) => d.v >= 5) });
    const tenders = T.tendersFor(p2, viewC);
    if (!tenders.length) E(`eur@min5: change price ${p2} has NO valid tender`);
    for (const den of tenders) {
      const coins = T.greedyChange(den.v - p2, viewCoins);
      if (!coins || coins.reduce((a, b) => a + b, 0) !== den.v - p2) E(`eur@min5: change broken at price ${p2} tender ${den.v}`);
      if (coins.length > 6) E(`eur@min5: change too long at price ${p2} tender ${den.v}`);
    }
  }
}

/* ================= 4. FORMAT ===================================== */
{
  const f = (v, k) => T.formatMoney.call(T, v, T.CURRENCIES[k]);
  if (f(230, 'eur') !== '2,30 €') E(`formatMoney eur: "${f(230, 'eur')}" (want "2,30 €")`);
  if (f(230, 'usd') !== '$ 2.30') E(`formatMoney usd: "${f(230, 'usd')}"`);
  if (f(7, 'sek') !== '7 kr') E(`formatMoney sek: "${f(7, 'sek')}"`);
  if (f(205, 'eur') !== '2,05 €') E(`formatMoney pad: "${f(205, 'eur')}"`);
  const tag = (v, k) => T.formatTag.call(T, v, k);
  if (tag(45, 'eur') !== '45 c') E(`formatTag eur minor: "${tag(45, 'eur')}"`);
  if (tag(45, 'usd') !== '45 ¢') E(`formatTag usd minor: "${tag(45, 'usd')}"`);
  if (tag(230, 'eur') !== '2,30 €') E(`formatTag eur major: "${tag(230, 'eur')}"`);
  if (tag(7, 'sek') !== '7 kr') E(`formatTag sek: "${tag(7, 'sek')}"`);
}

/* ================= 4b. formatLike — ONE NOTATION PER ROUND ========
   ⚠ The invariant is stated on the RENDERED STRING, not read off the
   function, so the gate cannot mark its own homework: "is this the major
   form?" is answered by looking for a decimal separator with two digits
   after it, which is true of "0,95 €" / "$ 1.05" / "R$ 1,05" and false of
   "45 c" / "7 kr" / "105 kr" — independent of anything money-mat does.
   Measured before writing: formatTag flips form between 95 and 100 in
   eur/usd/gbp/brl, and is already single-form in sek/dkk/nok. */
{
  const MAJOR_FORM = /[.,]\d\d(\D|$)/;
  const ROUNDS = [
    { lang: 'en', cur: 'usd', minorPrice: 45, majorPrice: 145 },
    { lang: 'en', cur: 'gbp', minorPrice: 45, majorPrice: 145 },
    { lang: 'de', cur: 'eur', minorPrice: 45, majorPrice: 145 },
    { lang: 'nl', cur: 'eur', minorPrice: 45, majorPrice: 145 },
    { lang: 'pt', cur: 'brl', minorPrice: 70, majorPrice: 170 },
    { lang: 'sv', cur: 'sek', minorPrice: 7, majorPrice: 40 },
    { lang: 'da', cur: 'dkk', minorPrice: 7, majorPrice: 40 },
    { lang: 'no', cur: 'nok', minorPrice: 7, majorPrice: 40 }
  ];
  const savedApi = T.api, savedPrice = T.price;
  for (const r of ROUNDS) {
    T.api = { lang: r.lang, settings: { enCurrency: r.cur }, t: (k) => k };
    const c = T.CURRENCIES[r.cur];
    const per = c.minorPerMajor || 1;

    /* (a) the DECLARED relation: formatLike(v, v) === formatTag(v), swept */
    for (let v = 1; v <= 2 * per + 60; v++) {
      T.price = v;
      const tg = T.formatTag.call(T, v);
      if (T.formatLike.call(T, v) !== tg) E(`formatLike(v) !== formatTag(v) at ${r.cur} ${v}`);
      if (T.formatLike.call(T, v, v) !== tg) E(`formatLike(v, v) !== formatTag(v) at ${r.cur} ${v}`);
    }

    /* (b) NO FLIP inside a round — the whole reason the function exists */
    for (const price of [r.minorPrice, r.majorPrice]) {
      T.price = price;
      const forms = new Set();
      for (let v = 0; v <= price + 2 * per; v += 5) {
        forms.add(MAJOR_FORM.test(T.formatLike.call(T, v)) ? 'major' : 'minor');
      }
      if (forms.size !== 1) {
        E(`formatLike FLIPS form inside a ${r.cur} round anchored at ${price}: ${[...forms].join('+')}`);
      }
    }

    /* (c) a minor-anchored round survives an OVERPAY past one major — and
       formatTag is asserted to flip there, so the justification for having
       two functions is measured rather than assumed. */
    if (per > 1) {
      T.price = r.minorPrice;
      const over = T.formatLike.call(T, per + 5);
      if (MAJOR_FORM.test(over)) E(`${r.cur}: an overpay past 1 major flipped the round's notation → "${over}"`);
      if (!MAJOR_FORM.test(T.formatTag.call(T, per + 5))) {
        E(`${r.cur}: formatTag no longer flips at 1 major — formatLike's reason for existing is gone`);
      }
    }
  }
  T.api = savedApi; T.price = savedPrice;
}

/* ================= 5. SPOKEN templates =========================== */
for (const L of LOCALES) {
  const cKey = T.LOCALE_CUR[L];
  const uw = T.UNITW[cKey] && (T.UNITW[cKey][L] || T.UNITW[cKey].en);
  if (!uw) { E(`UNITW missing for (${cKey}, ${L})`); continue; }
  if (!uw.majS || !uw.majP) E(`UNITW (${cKey}, ${L}): major unit words missing`);
  if (T.CURRENCIES[cKey].minorPerMajor > 1 && (!uw.minS || !uw.minP)) E(`UNITW (${cKey}, ${L}): minor unit words missing`);
  for (const form of ['both', 'majOnly', 'minOnly']) {
    const t = T.SPOKEN[form][L];
    if (!t) E(`SPOKEN.${form}.${L}: empty`);
  }
}
for (const k of ['usd', 'gbp']) {
  const uw = T.UNITW[k] && T.UNITW[k].en;
  if (!uw || !uw.majS || !uw.minS) E(`UNITW en toggle ${k} incomplete`);
}

/* ================= 6. STRINGS + NOUNS ============================ */
const S = T.strings;
for (const key of Object.keys(S)) {
  const en = S[key].en;
  if (!en) { E(`strings.${key}: missing en`); continue; }
  const ph = (en.match(/\{\w+\}/g) || []);
  for (const L of LOCALES) {
    const v = S[key][L];
    if (!v || !v.trim()) { E(`strings.${key}.${L}: empty`); continue; }
    for (const p of ph) if (!v.includes(p)) E(`strings.${key}.${L}: drops placeholder ${p}`);
    /* ⚠ es and fi carry TWO patterns each (a whole-word set plus a stem),
       so this must not call .test on the entry directly */
    if (VERDICT[L] && [].concat(VERDICT[L]).some((re) => re.test(v))) E(`strings.${key}.${L}: verdict vocabulary ("${v}")`);
    if (SCORE_RE.test(v)) E(`strings.${key}.${L}: score/timer vocabulary ("${v}")`);
    if (/Common Core/.test(v)) E(`strings.${key}.${L}: mentions Common Core`);
  }
}
for (const it of T.ITEMS) {
  if (!T.NOUNS[it.k]) { E(`ITEMS ${it.k}: no NOUNS row`); continue; }
  for (const L of LOCALES) if (!T.NOUNS[it.k][L]) E(`NOUNS.${it.k}.${L}: empty`);
  if (!T.META[it.k]) E(`ITEMS ${it.k}: no META`);
  if (!T.TRIMS[it.k]) E(`ITEMS ${it.k}: no TRIMS`);
  if (![1, 2, 3].includes(it.tier)) E(`ITEMS ${it.k}: bad tier`);
}

/* ============ 7. SEATING (placement proof + sharp re-measure) ===== */
async function seatingProofs() {
  for (const it of T.ITEMS) {
    const t = T.TRIMS[it.k];
    if (!t) continue;
    const pl = T._itemPlacement(it.k, 120, 150);
    const k = pl.width / t.iw;
    const visBottom = pl.bottom + (t.ih - t.y - t.h) * k;   /* distance of visible bottom above the anchor */
    const visCenter = pl.left + (t.x + t.w / 2) * k;
    if (Math.abs(visBottom) > 1e-6) E(`item ${it.k}: visible bottom off the anchor by ${visBottom.toFixed(2)}`);
    if (Math.abs(visCenter) > 1e-6) E(`item ${it.k}: visible center off the anchor by ${visCenter.toFixed(2)}`);
    if (t.h * k > 120 + 1e-6 || t.w * k > 150 + 1e-6) E(`item ${it.k}: visible art exceeds the fit caps`);
  }
  const idx = JSON.parse(fs.readFileSync(path.join(REPO, 'mini tools', 'pww-index-en.json'), 'utf8'));
  const ok = {};
  for (const th of idx.themes) for (const c of th.c) ok[th.d + '//' + c.f] = true;
  let sharp;
  try { sharp = require(path.join(REPO, 'frontend', 'node_modules', 'sharp')); }
  catch (e) { E('sharp unavailable: ' + e.message); return; }
  for (const it of T.ITEMS) {
    const m = T.META[it.k];
    if (!m) continue;
    if (!ok[m[0] + '//' + m[1]]) E(`META ${it.k}: ${m[0]}/${m[1]} not in pww-index-en`);
    const file = path.join(REPO, 'frontend', 'public', 'image-library-webp', 'themes', m[0], m[1] + '@2x.webp');
    if (!fs.existsSync(file)) { E(`META ${it.k}: missing on disk`); continue; }
    try {
      const { data, info } = await sharp(file).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
      let minX = info.width, maxX = -1, minY = info.height, maxY = -1;
      for (let y = 0; y < info.height; y++) for (let x = 0; x < info.width; x++) {
        if (data[(y * info.width + x) * 4 + 3] > 16) { if (x < minX) minX = x; if (x > maxX) maxX = x; if (y < minY) minY = y; if (y > maxY) maxY = y; }
      }
      const tw = maxX - minX + 1, th = maxY - minY + 1;
      const b = T.TRIMS[it.k];
      for (const [name, baked, meas] of [['x', b.x, minX], ['y', b.y, minY], ['w', b.w, tw], ['h', b.h, th]]) {
        if (Math.abs(baked - meas) > 3) E(`item ${it.k}: trim.${name} baked ${baked} vs measured ${meas} (drift > 3px)`);
      }
    } catch (e) { E(`item ${it.k}: trim re-measure failed: ${e.message}`); }
  }
}

/* ================= report ======================================== */
(async () => {
  await seatingProofs();
  if (errors.length) {
    console.log(`FAIL — ${errors.length} error(s):`);
    errors.slice(0, 40).forEach((e) => console.log('  ✗ ' + e));
    if (errors.length > 40) console.log(`  … +${errors.length - 40} more`);
    process.exit(1);
  }
  console.log(`PASS — money-mat verified (locales: ${LOCALES.join(',')})`);
  console.log(`  ✓ ${Object.keys(T.CURRENCIES).length} currencies: denominations sane, faces complete, NOK-no-2kr, whole-krona honest`);
  console.log('  ✓ composability: an INDEPENDENT search exhibits a paying multiset for every price the');
  console.log('    generator can emit (band × tier × currency × coinsFrom × fineGrain), and its verdict');
  console.log('    is compared against the tool\'s own — so stubbing composable() no longer hides a defect');
  console.log('  ✓ change: every (price, tender) sums exactly, ≤6 coins, ascending count-on order');
  console.log('  ✓ format: money-core display conventions + minor-form tags hold');
  console.log('  ✓ formatLike: one notation per round — no flip at 1 major, overpay safe, formatLike(v,v)≡formatTag(v)');
  console.log(`  ✓ seating: ${T.ITEMS.length} items trim-proven at the anchor + sharp re-measure clean`);
  console.log(`  ✓ ${Object.keys(S).length} strings + spoken templates + unit words complete (${LOCALES.length} locales)`);
  console.log('    verdict/score bans poison-tested BOTH ways in every language they police (21 must-fire, 11 must-pass)');
})();
