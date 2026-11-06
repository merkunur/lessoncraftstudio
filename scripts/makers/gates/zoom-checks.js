#!/usr/bin/env node
/**
 * Gate `zoom-checks` (2026-11-05): a page that passes its checks at the catalogue's scale passes them in a teacher's
 * browser at any zoom. The maker gates every page in a frame inside the teacher's browser (page-shim.js), and a Chrome at
 * screen scale 1.2 refused pages that are right — a 36 px picture laid out at 35.99 px, a 2 px underline reported as
 * 1.67 px — until the frame measured at scale 1 (page-shim.js unzoom).
 *
 * For every built maker × template × locale (en + one long-word locale) × level, copy 1 and 2 (+ the answer key where the
 * level has one), the maker's own verdict is taken — runtime.generate: the page and its key gated (lints + the type's
 * verify, through the shim), then the maker's retries — at scale 1 and at --dsf (default 1.2). FAIL when:
 *   - the maker refuses the page at scale 1 (every retry) — "This page couldn't be created" at any zoom (2026-11-06: this
 *     used to be skipped as "the live gate's", and K-457 level 1 — refused on every seed once the picture-in-frame lint
 *     saw its pictures out of their box — went unreported; the live gate samples, this gate sees every level);
 *   - the maker refuses it at the zoom, or reaches it there only on a later retry than at scale 1 (a verdict that depends
 *     on the zoom).
 * A page the maker builds only on a retry at scale 1 is counted (the summary), never a FAIL: retries are the maker's design.
 * A build every seed refuses is copy-range's (skipped here).
 * Poison, every run: G2-351 at 1.2 WITHOUT the counter-zoom must be caught (the comparison sees a zoom), and a page whose
 * check refuses every attempt must be judged a FAIL (the scale-1 rule fires).
 *
 *   node scripts/makers/gates/zoom-checks.js [--makers=a,b] [--ids=G2-351] [--locales=en,fi] [--dsf=1.2] [--copies=1,2]
 */
'use strict';
const MP = require('./lib/maker-pages.js');
const { zoomVerifier } = require('./lib/zoom-verify.js');

const A = MP.args();
const LOCALES = String(A.locales || 'en,fi').split(',');
const IDS = A.ids ? String(A.ids).split(',') : null;
const DSF = Number(A.dsf || 1.2);
const COPIES = String(A.copies || '1,2').split(',').map(Number);
const brief = (fs) => (fs || []).slice(0, 2).join(' | ').slice(0, 220);

/** the maker's verdict on one page's settings at scale 1 and at the zoom: { skip } | { fails: [...], retried } */
async function judge(one, zoomed, o) {
  let a, b;
  try { a = await one.generate(o); } catch (e) { return { fails: [`the check threw at scale 1: ${String(e.message).slice(0, 120)}`] }; }
  if (!a.ok && (a.fails || []).length && a.fails.every((f) => /^build: /.test(String(f)))) return { skip: true };   // copy-range's
  if (!a.ok) return { fails: [`the maker refuses it at scale 1 too (every retry): ${brief(a.fails)}`] };
  const retried = !!(a.attempt && Object.keys(a.attempt).length);
  try { b = await zoomed.generate(o); } catch (e) { return { fails: [`the check threw at ${DSF}: ${String(e.message).slice(0, 120)}`], retried }; }
  if (!b.ok) return { fails: [`passes at 1, refused at ${DSF}: ${brief(b.fails)}`], retried };
  if (JSON.stringify(b.attempt || {}) !== JSON.stringify(a.attempt || {})) {
    // the page scale 1 accepted, checked at the zoom: why its attempt was refused there
    const why = [...await zoomed.check(a.html, o.type), ...(a.keyHtml ? (await zoomed.check(a.keyHtml, o.type, { key: true })).map((f) => 'key: ' + f) : [])];
    return { fails: [`passes at 1 on attempt ${JSON.stringify(a.attempt || {})}, at ${DSF} only on ${JSON.stringify(b.attempt || {})}: ${brief(why)}`], retried };
  }
  return { fails: [], retried };
}

(async () => {
  let fails = 0, pages = 0, retried = 0;
  const fail = (s) => { fails++; if (fails <= 120) console.log('FAIL ' + s); };
  const one = await zoomVerifier({ dsf: 1 }), zoomed = await zoomVerifier({ dsf: DSF });
  console.log(`scales: reference ${one.dpr}, zoomed ${zoomed.dpr}`);
  // poison: the same pages at the zoom WITHOUT the counter-zoom must fail where they pass at 1
  {
    const raw = await zoomVerifier({ dsf: DSF, unzoom: false });
    const m = MP.builtMakers(['odd-even'])[0];
    const t = m.tj.templates.find((x) => x.id === 'G2-351');
    const type = MP.loadType(t);
    const html = MP.buildShown(t, type, m.tj, 'en', { difficulty: 2, theme: null, unit: null, variant: 2 }).html;
    const a = await one.check(html, type), b = await raw.check(html, type), c = await zoomed.check(html, type);
    const ok = !a.length && b.length && !c.length;
    console.log((ok ? 'ok   ' : 'FAIL ') + `poison: G2-351 passes at 1 (${a.length}), fails at ${DSF} without the counter-zoom (${b.length}: ${String(b[0] || '').slice(0, 70)}), passes with it (${c.length})`);
    if (!ok) fails++;
    await raw.close();
    // poison: a page whose own check refuses it on every attempt is a FAIL here (the rule that was missing)
    const o = { type: { ...type, verify: async () => ['poison: refused on every attempt'] }, strings: MP.stringsFor(t, type, 'en', 2), locale: 'en', difficulty: 2, theme: null, unit: null, variant: 2, answerKeySuffix: m.tj.answerKey.en };
    const j = await judge(one, zoomed, o), good = await judge(one, zoomed, { ...o, type });
    const ok2 = j.fails && j.fails.length && /refuses it at scale 1/.test(j.fails[0]) && good.fails && !good.fails.length;
    console.log((ok2 ? 'ok   ' : 'FAIL ') + `poison: a page refused on every attempt is judged a FAIL (${String((j.fails || [])[0] || 'not judged').slice(0, 70)}), the real page passes (${(good.fails || ['?']).length} fails)`);
    if (!ok2) fails++;
  }
  for (const m of MP.builtMakers(A.makers)) {
    for (const t of m.tj.templates) {
      if (IDS && !IDS.includes(t.id)) continue;
      const type = MP.loadType(t);
      for (const loc of LOCALES) {
        if (!t.locales.includes(loc)) continue;
        const lv = (t.localeLevels && t.localeLevels[loc]) || t.levels;
        const th = t.themed ? MP.themesIn(t, loc)[0] : null;
        for (const d of lv) for (const v of COPIES) {
          const o = { type, strings: MP.stringsFor(t, type, loc, d), locale: loc, difficulty: d, theme: th, unit: null, variant: v, answerKey: (t.keyLevels || []).includes(d), answerKeySuffix: m.tj.answerKey[loc] };
          const j = await judge(one, zoomed, o);
          if (j.skip) continue;
          pages++;
          if (j.retried) retried++;
          if (j.fails.length) fail(`${m.maker} ${t.id} ${loc} L${d} c${v}: ${j.fails[0]}`);
        }
      }
    }
    process.stdout.write(`${m.maker}: done\n`);
  }
  await one.close(); await zoomed.close();
  console.log(`zoom checks: ${pages} pages (+ their keys) at scales 1 and ${DSF}, ${fails} failing (${retried} built on a retry at scale 1 — the maker's fresh seeds)`);
  if (fails) process.exitCode = 1;
})().catch((e) => { console.error(e); process.exit(1); });
