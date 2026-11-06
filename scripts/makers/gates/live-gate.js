#!/usr/bin/env node
/**
 * Gate: the catalogue's page gates run LIVE in the maker screen and agree with the catalogue (ARCHITECTURE §6).
 *
 * For every maker, every locale, every template offered there, levels × copies 1, 2 and 157 (past every pool): the page is made in the browser
 * through generate() — lints + the type's verify, in the gate frame — and must pass. A page that needed a retry knob or a
 * fresh seed is reported (the catalogue's own page passed on the first attempt, so a retry here means the browser lays the
 * page out differently from Node — a defect to read, not to accept). Timing per page is reported (budget §6.2: 150 ms p95
 * on a 2019 iPad; measured here on the PC, the iPad number is spike S5).
 *
 * Poison (always runs first): a page whose body is pushed past the footer must be REFUSED, and a passing page must still
 * pass when gated twice (the gate frame is reused).
 *
 *   node scripts/makers/gates/live-gate.js [--makers=a,b] [--locales=en,de] [--copies=1,2,157]
 */
'use strict';
const http = require('http');
const path = require('path');
const puppeteer = require(path.join(__dirname, '..', '..', '..', 'node_modules', 'puppeteer'));
const { handler } = require('../serve.js');

const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.slice(k.length + 3) : d; };
// default: every maker built so far (out/makers/versions.json), not just the pilot
const MAKERS = arg('makers', Object.keys(JSON.parse(require('fs').readFileSync(require('path').join(__dirname, '..', '..', '..', 'out', 'makers', 'versions.json'), 'utf8'))).join(',')).split(',');
const LOCALES = arg('locales', 'en,de,fr,es,pt,it,nl,sv,da,no,fi').split(',');
// copies 1 and 2, and one far past every picture / word pool: New version jumps the copy by 1-97 a click and the copy stays
// with the page across templates (2026-11-05: six Dot-to-Dot templates refused every copy past their pool)
const COPIES = arg('copies', '1,2,157').split(',').map(Number);
// each language is made at its own screen scale (browser zoom × the display's scaling): a teacher's Chrome at 1.2 refused
// 21 of 24 spelling pages, every one fine at 1 (2026-11-05 — the gate frame now measures at scale 1 whatever the zoom,
// page-shim.js unzoom). en stays at 1, the catalogue's own scale; --dsf=1 makes every language 1.
const DSF_BY_LANG = { en: 1, de: 1.2, fr: 1.1, es: 1.25, pt: 0.9, it: 1.5, nl: 1.33, sv: 1.75, da: 0.8, no: 2, fi: 1.2 };
const dsfOf = (lang) => Number(arg('dsf', '') || DSF_BY_LANG[lang] || 1);

(async () => {
  const srv = http.createServer(handler); await new Promise((r) => srv.listen(0, r));
  const port = srv.address().port;
  const browsers = {};   // one per screen scale (a scale is a launch flag)
  const browserAt = async (dsf) => (browsers[dsf] = browsers[dsf] || await puppeteer.launch(dsf === 1 ? {} : { args: ['--force-device-scale-factor=' + dsf] }));
  let fails = 0, pages = 0, retried = 0;
  const times = [];
  const slow = [];   // every page's time with where it was made: the slowest are listed (2026-11-06: make-10 mazes ~15 s)
  let poisoned = false;
  const MP = require('./lib/maker-pages.js');
  for (const maker of MAKERS) {
    const built = MP.builtMakers([maker])[0];
    for (const lang of LOCALES) {
      // a language no template of the maker ships in shows the "not in your language" note and no test hook (shell.js):
      // nothing to gate — waiting for the hook timed out on cursive sv / fi every run (2026-11-05; own-input does the same)
      if (built && !built.tj.templates.some((x) => x.locales.includes(lang))) { console.log(`note ${maker} ${lang}: no template in this language — skipped`); continue; }
      // a page that stalls (the maker never mounts in 60 s, an evaluate that throws) is a named FAIL and the run goes on —
      // before 2026-11-04 the throw left the loop unnamed and the open browser kept the process alive for good
      let p;
      try {
      const dsf = dsfOf(lang);
      p = await (await browserAt(dsf)).newPage();
      if (dsf !== 1) await p.setViewport(null);
      const errs = [];
      p.on('pageerror', (e) => errs.push(e.message));
      await p.goto(`http://localhost:${port}/makers/app/?maker=${maker}&lang=${lang}`, { waitUntil: 'networkidle0' });
      await p.waitForFunction(() => window.__lcsMaker, { timeout: 60000 });
      if (!poisoned) {
        poisoned = true;
        const poison = await p.evaluate(async () => {
          const M = window.__lcsMaker;
          const t = M.tj.templates.find((x) => x.locales.includes(M.LANG));
          const type = await M.loadType(t.id);
          const o = { strings: M.stringsFor(t.id, ((t.localeLevels && t.localeLevels[M.LANG]) || t.levels)[0]), locale: M.LANG, difficulty: ((t.localeLevels && t.localeLevels[M.LANG]) || t.levels)[0], theme: t.themed ? ((t.localeThemes && t.localeThemes[M.LANG]) || t.themes)[0] : null, unit: ((t.units && t.units[M.LANG]) || []).filter((u) => (!t.unitLevels || t.unitLevels[u.id] === ((t.localeLevels && t.localeLevels[M.LANG]) || t.levels)[0]) && (!t.localeUnitLevels || !t.localeUnitLevels[M.LANG] || (t.localeUnitLevels[M.LANG][u.id] || []).includes(((t.localeLevels && t.localeLevels[M.LANG]) || t.levels)[0]))).map((u) => u.id)[0] || null, variant: 1 };
          const good = await M.mod.generate({ ...o, type }, M.mount);
          const again = await M.mod.generate({ ...o, type }, M.mount);
          // three poisons, each on every attempt so no retry can rescue it: (1) a block wider than the page that cannot shrink
          // (flex:none — a tall block in the flex body is shrunk to fit and proves nothing), (2) a broken picture, (3) a type
          // whose own verify reports a failure — each must be REFUSED
          const add = (extra) => ({ ...type, build: (a, c) => { const b = type.build(a, c); return { ...b, bodyHtml: b.bodyHtml + extra }; } });
          const wide = await M.mod.generate({ ...o, type: add('<div style="flex:none;width:2000px;height:40px;background:#146B5E"></div>') }, M.mount);
          const broken = await M.mod.generate({ ...o, type: add('<img src="/makers-assets/themes-512/none/missing.webp" style="flex:none;width:60px;height:60px" alt="">') }, M.mount);
          const ver = await M.mod.generate({ ...o, type: { ...type, verify: async () => ['poison: verify says no'] } }, M.mount);
          return { good: good.ok, again: again.ok && again.html === good.html, refused: !wide.ok && !broken.ok && !ver.ok, why: [wide, broken, ver].map((r) => (r.fails ? r.fails[0] : 'PASSED')).join(' | ') };
        });
        const ok = poison.good && poison.again && poison.refused;
        console.log((ok ? 'ok   ' : 'FAIL ') + 'poison: a good page passes twice, an overflowing page, a broken picture and a failing verify are refused (' + poison.why + ')');
        if (!ok) fails++;
      }
      const res = await p.evaluate(async (COPIES) => {
        const M = window.__lcsMaker;
        const out = [];
        for (const t of M.tj.templates.filter((x) => x.locales.includes(M.LANG))) {
          const type = await M.loadType(t.id);
          const units = (t.units && t.units[M.LANG]) || [];
          for (const d of ((t.localeLevels && t.localeLevels[M.LANG]) || t.levels)) for (const v of COPIES) {
            const o = { type, strings: M.stringsFor(t.id, d), locale: M.LANG, difficulty: d, theme: t.themed ? (v === 2 && ((t.localeThemes && t.localeThemes[M.LANG]) || t.themes).find((x) => /bw(\s+\d+)?$/i.test(x))) || ((t.localeThemes && t.localeThemes[M.LANG]) || t.themes)[(v - 1) % ((t.localeThemes && t.localeThemes[M.LANG]) || t.themes).length] : null, unit: (() => { const lu = units.filter((u) => (!t.unitLevels || t.unitLevels[u.id] === d) && (!t.localeUnitLevels || !t.localeUnitLevels[M.LANG] || (t.localeUnitLevels[M.LANG][u.id] || []).includes(d))); return lu.length ? lu[(v - 1) % lu.length].id : null; })(), variant: v, answerKey: !!(t.interactive || (t.keyLevels || []).includes(d)), answerKeySuffix: M.tj.answerKey[M.LANG] };
            const t0 = performance.now();
            const r = await M.mod.generate(o, M.mount);
            out.push({ id: t.id, d, v, ok: r.ok, attempt: r.ok ? JSON.stringify(r.attempt) : null, fails: r.ok ? null : r.fails.slice(0, 3), ms: performance.now() - t0 });
          }
        }
        return out;
      }, COPIES);
      for (const r of res) {
        pages++; times.push(r.ms); slow.push({ ms: r.ms, at: `${maker} ${lang} ${r.id} L${r.d} c${r.v}${r.attempt && r.attempt !== '{}' ? ' (retry)' : ''}` });
        if (!r.ok) { fails++; console.log(`FAIL ${maker} ${lang} ${r.id} L${r.d} c${r.v}: ${JSON.stringify(r.fails)}`); }
        else if (r.attempt !== '{}') { retried++; console.log(`note ${maker} ${lang} ${r.id} L${r.d} c${r.v} passed only on retry ${r.attempt}`); }
      }
      if (errs.length) { fails++; console.log(`FAIL ${maker} ${lang} page errors: ${errs.slice(0, 2).join(' | ')}`); }
      await p.close();
      process.stdout.write(`${maker} ${lang}: ${res.length} pages (screen scale ${dsf})\n`);
      } catch (e) {
        fails++;
        console.log(`FAIL ${maker} ${lang}: ${String((e && e.message) || e).split('\n')[0]}`);
        if (p) await p.close().catch(() => {});
      }
    }
  }
  times.sort((a, b) => a - b);
  const q = (f) => Math.round(times[Math.min(times.length - 1, Math.floor(f * times.length))]);
  slow.sort((a, b) => b.ms - a.ms);
  console.log('slowest pages: ' + slow.slice(0, 10).map((x) => `${x.at} ${Math.round(x.ms)} ms`).join(' · '));
  console.log(`live gate: ${pages} pages, ${fails} failing, ${retried} needed a retry; ms per page p50 ${q(0.5)} p95 ${q(0.95)} max ${q(1)}`);
  for (const b of Object.values(browsers)) await b.close();
  srv.close();
  if (fails) process.exitCode = 1;
})().catch((e) => { console.error(e); process.exit(1); });
