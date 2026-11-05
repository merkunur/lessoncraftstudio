#!/usr/bin/env node
/**
 * Gate `zoom-checks` (2026-11-05): a page that passes its checks at the catalogue's scale passes them in a teacher's
 * browser at any zoom. The maker gates every page in a frame inside the teacher's browser (page-shim.js), and a Chrome at
 * screen scale 1.2 refused pages that are right — a 36 px picture laid out at 35.99 px, a 2 px underline reported as
 * 1.67 px — until the frame measured at scale 1 (page-shim.js unzoom).
 *
 * For every built maker × template × locale (en + one long-word locale) × level, copy 1 and 2 (+ the answer key where the
 * level has one): the page is checked (lints + the type's verify, through the shim) at scale 1 and at --dsf (default
 * 1.2). A page that passes at 1 and fails at the zoom is a FAIL; a page that fails at 1 is the live gate's business (noted).
 * Poison, every run: K-002 / G2-351 at 1.2 WITHOUT the counter-zoom must be caught (the comparison sees a zoom).
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

(async () => {
  let fails = 0, pages = 0, atOne = 0;
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
          let r;
          try { r = MP.buildShown(t, type, m.tj, loc, { difficulty: d, theme: th, unit: null, variant: v }, { answerKey: (t.keyLevels || []).includes(d) }); } catch (e) { continue; }   // a refused build is copy-range's
          for (const [k, html] of [['page', r.html], ['key', r.keyHtml]]) {
            if (!html) continue;
            pages++;
            // a check that throws is a FAIL of that page, never the end of the run
            let a, b;
            try { a = await one.check(html, type, { key: k === 'key' }); } catch (e) { fail(`${m.maker} ${t.id} ${loc} L${d} c${v} ${k}: the check threw at scale 1: ${String(e.message).slice(0, 120)}`); continue; }
            if (a.length) { atOne++; continue; }
            try { b = await zoomed.check(html, type, { key: k === 'key' }); } catch (e) { fail(`${m.maker} ${t.id} ${loc} L${d} c${v} ${k}: the check threw at ${DSF}: ${String(e.message).slice(0, 120)}`); continue; }
            if (b.length) fail(`${m.maker} ${t.id} ${loc} L${d} c${v} ${k}: passes at 1, fails at ${DSF}: ${b.slice(0, 2).join(' | ').slice(0, 220)}`);
          }
        }
      }
    }
    process.stdout.write(`${m.maker}: done\n`);
  }
  await one.close(); await zoomed.close();
  console.log(`zoom checks: ${pages} pages at scales 1 and ${DSF}, ${fails} failing (${atOne} fail at 1 too — the live gate's)`);
  if (fails) process.exitCode = 1;
})().catch((e) => { console.error(e); process.exit(1); });
