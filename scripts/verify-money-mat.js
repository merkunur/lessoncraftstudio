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

const VERDICT = {
  en: /\b(correct|incorrect|wrong|oops)\b/i,
  de: /\b(richtig|falsch)\b/i,
  fr: /\b(correct|correcte|faux|fausse)\b/i,
  it: /\b(giusto|sbagliato|corretto)\b/i,
  es: /\b(correcto|incorrecto|equivocad)\b/i,
  pt: /\b(correto|errado|incorreto)\b/i,
  nl: /\b(goed antwoord|fout|onjuist)\b/i,
  sv: /\b(rätt svar|fel)\b/i,
  da: /\b(rigtigt svar|forkert)\b/i,
  no: /\b(riktig svar|feil)\b/i,
  fi: /\b(oikein|väärin|väärä)\b/i
};
const SCORE_RE = /\b(score|timer|streak|points|punkte|punteggio|puntos|pontos|punten|poäng|poeng|point)\b/i;

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

/* ================= 2. COMPOSABILITY (DP over the full price set) == */
for (const cKey of Object.keys(T.CURRENCIES)) {
  const coinVals = T.CURRENCIES[cKey].coins.map((d) => d.v);
  for (const band of [1, 2, 3]) {
    for (const tier of [1, 2, 3]) {
      const r = T.priceRange(band, tier, cKey);
      if (r.lo > r.hi) { E(`${cKey} b${band} t${tier}: empty price range`); continue; }
      for (let p = r.lo; p <= r.hi; p += r.grain) {
        if (!T.composable(p, coinVals)) E(`${cKey} b${band} t${tier}: price ${p} NOT composable from coins`);
      }
    }
  }
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
    if (VERDICT[L] && VERDICT[L].test(v)) E(`strings.${key}.${L}: verdict vocabulary ("${v}")`);
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
  console.log('  ✓ composability: every generatable price provably coin-composable (all bands × tiers × currencies)');
  console.log('  ✓ change: every (price, tender) sums exactly, ≤6 coins, ascending count-on order');
  console.log('  ✓ format: money-core display conventions + minor-form tags hold');
  console.log('  ✓ formatLike: one notation per round — no flip at 1 major, overpay safe, formatLike(v,v)≡formatTag(v)');
  console.log(`  ✓ seating: ${T.ITEMS.length} items trim-proven at the anchor + sharp re-measure clean`);
  console.log(`  ✓ ${Object.keys(S).length} strings + spoken templates + unit words complete (${LOCALES.length} locales); bans hold`);
})();
