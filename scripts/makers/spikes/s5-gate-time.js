#!/usr/bin/env node
/**
 * Spike S5 — live gate time (ARCHITECTURE §6.2, §14.1).
 *
 * What is measured: in the served maker screen (Puppeteer/Chromium, as scripts/makers/gates/live-gate.js drives it),
 * every template of the three pilot makers at level 2, copy 1, in English and Finnish (the longest strings) is made
 * through generate() — the screen's own path: build + mount + lints + the type's verify, with the §6.2 retry ladder —
 * and then gated once more on its mounted page with gatePage() alone. Two numbers per page:
 *   gate  = gatePage(): every lint (qa/lints.js) + the 3-line title/instruction check + the type's verify. THIS is the
 *           number the §6.2 budget names.
 *   total = generate(): build + mount (srcdoc load, image decode, fonts) + gate (+ answer key) — what the teacher waits.
 * Both are taken with performance.now() inside the page, at CPU throttle 1×, 4× and 6× (CDP
 * Emulation.setCPUThrottlingRate on the page's renderer — the same-origin gate frame runs on that thread).
 *
 * Assumption (stated in the report): this PC's Chromium at 6× is the proxy for a 2019 iPad (A12, iPad Air 3 / mini 5;
 * the base iPad 7 of 2019 is an A10). Public JS benchmarks (Speedometer 2) put an A12 Safari at roughly 1/4–1/5 of a
 * current desktop CPU, an A10 nearer 1/6–1/8; Chrome's DevTools calls 4× "mid-tier mobile" and 6× "low-end mobile".
 * 6× is therefore the honest-to-pessimistic reading for the whole 2019 iPad line; 4× is the A12 midpoint.
 *
 * Pass line: gate p95 ≤ 150 ms per page at 6× (all three throttles reported). Miss → the §14.1 fallback (lints + verify
 * in a Web Worker behind a 250 ms debounce). The script exits 0 either way; the report says PASS / MISS.
 *
 * Poison (always runs first): a verify that busy-waits 300 ms must show up as ≥ 300 ms of gate time at 1× — proves the
 * timer brackets the verify.
 *
 *   node scripts/makers/spikes/s5-gate-time.js [--locales=en,fi] [--rates=1,4,6]
 */
'use strict';
const http = require('http');
const fs = require('fs');
const os = require('os');
const path = require('path');
const puppeteer = require(path.join(__dirname, '..', '..', '..', 'node_modules', 'puppeteer'));
const { handler } = require('../serve.js');

const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.slice(k.length + 3) : d; };
const MAKERS = ['ten-frames', 'counting', 'sight-words'];
const LOCALES = arg('locales', 'en,fi').split(',');
const RATES = arg('rates', '1,4,6').split(',').map(Number);
const IPAD_RATE = 6;
const BUDGET = 150;
const REPORT = path.join(__dirname, '..', '..', '..', 'docs', 'makers', 'spikes', 'S5-gate-time.md');

/** Runs inside the maker screen. */
async function timeAll(poisonMs) {
  const M = window.__lcsMaker;
  const frame = document.createElement('iframe');
  frame.style.cssText = 'position:fixed;left:-10000px;top:0;width:703px;height:945px;border:0';
  document.body.append(frame);
  const mount = (html) => M.mod.mountHtml(frame, html);
  const out = [];
  const busy = (ms) => { const t = performance.now(); while (performance.now() - t < ms); };
  for (const t of M.tj.templates.filter((x) => x.locales.includes(M.LANG))) {
    let type = await M.loadType(t.id);
    if (poisonMs) { const v = type.verify; type = { ...type, verify: async (p) => { busy(poisonMs); return v ? v(p) : []; } }; }
    const units = (t.units && t.units[M.LANG]) || [];
    const o = { type, strings: M.strings[t.id], locale: M.LANG, difficulty: 2, theme: t.themed ? t.themes[0] : null, unit: units.length ? units[0].id : null, variant: 1, answerKey: !!t.interactive, answerKeySuffix: M.tj.answerKey[M.LANG] };
    const t0 = performance.now();
    const r = await M.mod.generate(o, mount);
    const total = performance.now() - t0;
    if (!r.ok) { out.push({ id: t.id, ok: false }); continue; }
    const page = await mount(r.html);
    const g0 = performance.now();
    const fails = await M.mod.gatePage(type, page);
    out.push({ id: t.id, ok: !fails.length, gate: performance.now() - g0, total });
    if (poisonMs) break;
  }
  frame.remove();
  return out;
}

const pct = (arr, f) => { const s = [...arr].sort((a, b) => a - b); return s.length ? s[Math.min(s.length - 1, Math.ceil(f * s.length) - 1)] : NaN; };

(async () => {
  const srv = http.createServer(handler); await new Promise((r) => srv.listen(0, r));
  const port = srv.address().port;
  const browser = await puppeteer.launch();
  const data = {}; // rate -> maker -> [{gate,total}]
  let notes = [];
  let poisonOk = false;
  try {
    const open = async (maker, lang, rate) => {
      const p = await browser.newPage();
      await p.goto(`http://localhost:${port}/makers/app/?maker=${maker}&lang=${lang}`, { waitUntil: 'networkidle0' });
      await p.waitForFunction(() => window.__lcsMaker, { timeout: 60000 });
      await new Promise((r) => setTimeout(r, 1500)); // let the screen's own first page settle so it does not share the thread
      const cdp = await p.target().createCDPSession();
      await cdp.send('Emulation.setCPUThrottlingRate', { rate });
      return p;
    };
    const pp = await open('counting', 'en', 1);
    const poison = await pp.evaluate(timeAll, 300);
    await pp.close();
    poisonOk = poison[0] && poison[0].gate >= 300;
    console.log((poisonOk ? 'ok   ' : 'FAIL ') + `poison: a verify that busy-waits 300 ms measures ${poison[0] ? Math.round(poison[0].gate) : '?'} ms of gate time`);
    for (const rate of RATES) {
      data[rate] = {};
      for (const maker of MAKERS) {
        data[rate][maker] = [];
        for (const lang of LOCALES) {
          const p = await open(maker, lang, rate);
          const res = await p.evaluate(timeAll, 0);
          await p.close();
          for (const r of res) { if (r.ok) data[rate][maker].push(r); else notes.push(`${rate}× ${maker} ${lang} ${r.id}: refused or failed the re-gate`); }
          process.stderr.write(`${rate}x ${maker} ${lang}: ${res.length} pages\n`);
        }
      }
    }
  } finally { await browser.close(); srv.close(); }

  const lines = []; const L = (s) => lines.push(s);
  L(`## Run ${new Date().toISOString().slice(0, 16).replace('T', ' ')} UTC`);
  L('');
  L(`Machine: ${os.cpus()[0].model.trim()} (${os.cpus().length} threads), Windows, Puppeteer Chromium. Script: \`node scripts/makers/spikes/s5-gate-time.js\`. Pages: every template of ten-frames, counting, sight-words at level 2, copy 1, locales ${LOCALES.join(' + ')} (with answer keys where the template has one).`);
  L('');
  L(`**Throttle assumption.** CDP CPU throttling slows the renderer's main thread by a factor. A 2019 iPad is an A12 (iPad Air 3 / mini 5) or, for the base iPad 7, an A10; Speedometer-class JS benchmarks put an A12's Safari at about 1/4–1/5 of a current desktop and an A10 nearer 1/6–1/8. **6× is read as the 2019 iPad** (honest for the A12, optimistic only for the A10); 4× is the A12 midpoint; 1× is this PC. Throttling scales JS + layout + style on one thread; it does not model the iPad's GPU, memory or Safari's engine — the real-device run is still owed.`);
  L('');
  L(`**gate** = \`gatePage()\` on a mounted page: all lints + 3-line title/instruction check + the type's verify (the §6.2 budget). **total** = \`generate()\`: build + mount (srcdoc, images, fonts) + gate + answer key — what the teacher waits for on a new page.`);
  L('');
  L('| throttle | maker | pages | gate p50 | gate p95 | gate max | total p50 | total p95 | total max |');
  L('|---|---|---|---|---|---|---|---|---|');
  const verdict = {};
  for (const rate of RATES) {
    const all = [];
    for (const maker of MAKERS) {
      const rs = data[rate][maker]; all.push(...rs);
      const g = rs.map((r) => r.gate), t = rs.map((r) => r.total);
      const f = (v) => Math.round(v);
      L(`| ${rate}× | ${maker} | ${rs.length} | ${f(pct(g, 0.5))} | ${f(pct(g, 0.95))} | ${f(Math.max(...g))} | ${f(pct(t, 0.5))} | ${f(pct(t, 0.95))} | ${f(Math.max(...t))} |`);
    }
    const g = all.map((r) => r.gate);
    verdict[rate] = pct(g, 0.95);
    L(`| ${rate}× | **all** | ${all.length} | ${Math.round(pct(g, 0.5))} | **${Math.round(verdict[rate])}** | ${Math.round(Math.max(...g))} | ${Math.round(pct(all.map((r) => r.total), 0.5))} | ${Math.round(pct(all.map((r) => r.total), 0.95))} | ${Math.round(Math.max(...all.map((r) => r.total)))} |`);
  }
  L('');
  // the slowest pages at the iPad throttle, so a miss can be read
  if (data[IPAD_RATE]) {
    const slow = MAKERS.flatMap((m) => data[IPAD_RATE][m].map((r) => ({ m, ...r }))).sort((a, b) => b.gate - a.gate).slice(0, 5);
    L(`Slowest gates at ${IPAD_RATE}×: ` + slow.map((r) => `${r.m} ${r.id} ${Math.round(r.gate)} ms`).join(' · ') + '.');
    L('');
  }
  if (notes.length) { L('Notes: ' + notes.join('; ')); L(''); }
  L(`Poison: a verify busy-waiting 300 ms was measured as ${poisonOk ? '≥ 300 ms — the timer brackets the verify' : 'LESS than 300 ms — the measurement is broken'}.`);
  L('');
  const pass = data[IPAD_RATE] && verdict[IPAD_RATE] <= BUDGET;
  L(`**Result: ${pass ? 'PASS' : 'MISS'}** — gate p95 at ${IPAD_RATE}× (the 2019-iPad proxy) is ${Math.round(verdict[IPAD_RATE])} ms against the ${BUDGET} ms line` + RATES.map((r) => ` · ${r}×: ${Math.round(verdict[r])} ms`).join('') + '.' + (pass ? '' : ' Fallback per §14.1: lints + verify in a Web Worker behind a 250 ms edit debounce.'));
  L('');
  const md = lines.join('\n') + '\n';
  process.stdout.write(md);
  fs.mkdirSync(path.dirname(REPORT), { recursive: true });
  if (!fs.existsSync(REPORT)) fs.writeFileSync(REPORT, '# Spike S5 — live gate time\n\nPass line (ARCHITECTURE §6.2): lints + verify ≤ 150 ms p95 per page on a 2019 iPad. Each run below is appended.\n\n');
  fs.appendFileSync(REPORT, md);
  if (!poisonOk) process.exitCode = 1;
})().catch((e) => { console.error(e); process.exitCode = 1; });
