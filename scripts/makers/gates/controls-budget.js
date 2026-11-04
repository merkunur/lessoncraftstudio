#!/usr/bin/env node
/**
 * Gate 15 `controls-budget` (ARCHITECTURE §4.1a F3): a worksheet shows at most SEVEN controls on its first screen —
 * the three common ones (Level · Pictures · How many) plus at most four of the template's own. Everything else is a
 * template in the gallery or sits behind "More options" (paper, answer key, border), which is not counted.
 *
 *   1. declared: for every built maker × template × language, count what templates.json makes the screen show —
 *      Level (more than one level), Pictures (more than one theme), Word (a one-word template in that language), and the
 *      template's own `controls` — and fail above seven. Poisoned on every run: a synthetic template with eight must fail.
 *   2. shown: in the browser, every template of every maker (en, plus one Nordic language) — the controls actually on the
 *      first screen (top-level groups in the settings bar + the word on page 1) must equal the declared count, so a
 *      control the screen adds without declaring it cannot slip past the budget.
 *
 *   node scripts/makers/gates/controls-budget.js [--declared-only]
 */
'use strict';
const fs = require('fs');
const path = require('path');
const http = require('http');

const ROOT = path.join(__dirname, '..', '..', '..');
const OUT = path.join(ROOT, 'out', 'makers');
const BUDGET = 7;

function declared(t, loc) {
  const list = [];
  // the LANGUAGE's own levels and themes (templates.json localeLevels / localeThemes): a template offering one level in
  // Swedish shows no Level control there (2026-11-04: K-375 sv, G2-324/326 sv, G1-313/327/328 en were read against the
  // levels some other language offers)
  const levels = (t.localeLevels && t.localeLevels[loc]) || t.levels;
  const themes = (t.localeThemes && t.localeThemes[loc]) || t.themes || [];
  if (levels.length > 1) list.push('level');
  if (t.themed && themes.length > 1) list.push('pictures');
  if (t.units && t.units[loc] && t.units[loc].length) list.push('word');
  for (const c of t.controls || []) list.push('control:' + c);
  return list;
}

function makers() {
  return fs.readdirSync(OUT).filter((m) => fs.existsSync(path.join(OUT, m, 'current.txt')) && fs.existsSync(path.join(OUT, m, fs.readFileSync(path.join(OUT, m, 'current.txt'), 'utf8').trim(), 'templates.json'))).map((m) => {
    const v = fs.readFileSync(path.join(OUT, m, 'current.txt'), 'utf8').trim();
    return { maker: m, tj: JSON.parse(fs.readFileSync(path.join(OUT, m, v, 'templates.json'), 'utf8')) };
  });
}

function checkDeclared(list) {
  const fails = [];
  let cells = 0;
  for (const { maker, tj } of list) {
    for (const t of tj.templates) {
      for (const loc of t.locales) {
        cells++;
        const d = declared(t, loc);
        if (d.length > BUDGET) fails.push(`${maker} ${t.id} ${loc}: ${d.length} controls (${d.join(', ')})`);
      }
    }
  }
  return { fails, cells };
}

(async () => {
  const list = makers();
  if (list.length < 3) throw new Error(`only ${list.length} built makers in out/makers — run build-bundles.js first`);
  let fails = 0;

  // poison: eight declared controls must fail, seven must pass
  const fake = (n) => [{ maker: 'poison', tj: { templates: [{ id: 'X', levels: [1, 2, 3], themed: true, themes: ['a', 'b'], units: { en: [{ id: 'w' }] }, locales: ['en'], controls: Array.from({ length: n - 3 }, (_, k) => 'c' + k) }] } }];
  const p8 = checkDeclared(fake(8)).fails.length, p7 = checkDeclared(fake(7)).fails.length;
  if (p8 !== 1 || p7 !== 0) { console.log(`FAIL poison: 8 controls → ${p8} failures (want 1), 7 → ${p7} (want 0)`); fails++; }
  // poison: a language with one level and one theme declares neither control; a language with the full lists declares both
  const per = { id: 'Y', levels: [1, 2, 3], localeLevels: { sv: [2] }, themed: true, themes: ['a', 'b'], localeThemes: { sv: ['a'] }, locales: ['en', 'sv'] };
  const dSv = declared(per, 'sv').join(','), dEn = declared(per, 'en').join(',');
  if (dSv !== '' || dEn !== 'level,pictures') { console.log(`FAIL poison: per-language lists → sv "${dSv}" (want ""), en "${dEn}" (want "level,pictures")`); fails++; }

  const dec = checkDeclared(list);
  dec.fails.slice(0, 20).forEach((f) => console.log('FAIL ' + f));
  fails += dec.fails.length;
  console.log(`declared: ${dec.cells} template × language cells, ${dec.fails.length} over ${BUDGET}`);

  if (!process.argv.includes('--declared-only')) {
    const puppeteer = require(path.join(ROOT, 'node_modules', 'puppeteer'));
    const { handler } = require('../serve.js');
    const srv = http.createServer(handler); await new Promise((r) => srv.listen(0, r));
    const base = `http://localhost:${srv.address().port}`;
    await new Promise((r) => http.get(`${base}/__dev/access?as=sub&made=0&downloaded=0`, (res) => { res.resume(); res.on('end', r); }));
    const browser = await puppeteer.launch();
    const p = await browser.newPage();
    const errs = [];
    p.on('pageerror', (e) => errs.push(e.message));
    await p.setViewport({ width: 1366, height: 900 });
    let shown = 0;
    for (const { maker, tj } of list) {
      for (const loc of ['en', 'sv']) {
        await p.goto(`${base}/makers/app/?maker=${maker}&lang=${loc}`, { waitUntil: 'networkidle0' });
        for (const t of tj.templates.filter((x) => x.locales.includes(loc))) {
          await p.evaluate((id) => document.querySelector(`.mk-card[data-id="${id}"]`).click(), t.id);
          await p.waitForFunction(() => document.querySelector('.mk-sheet iframe, .mk-note'), { timeout: 20000 });
          await new Promise((r) => setTimeout(r, 300));
          const seen = await p.evaluate(() => {
            const c = document.getElementById('mk-controls');
            const groups = [...c.children].filter((n) => n.matches('.mk-group')).map((n) => n.getAttribute('aria-label'));
            const word = document.querySelector('.mk-page .mk-page-word') ? 1 : 0;
            const drawer = c.querySelector('.mk-more-box') ? 1 : 0;
            return { groups, word, drawer };
          });
          const n = seen.groups.length + seen.word;
          const want = declared(t, loc).length;
          shown++;
          if (n !== want || n > BUDGET || seen.drawer) { fails++; console.log(`FAIL ${maker} ${t.id} ${loc}: shows ${n} (${seen.groups.join(', ')}${seen.word ? ', word' : ''}), declared ${want}${seen.drawer ? ', drawer open' : ''}`); }
        }
      }
    }
    if (errs.length) { fails++; console.log('FAIL page errors: ' + errs.slice(0, 3).join(' | ')); }
    console.log(`shown: ${shown} template screens counted`);
    await browser.close(); srv.close();
  }
  console.log(fails ? `controls budget: ${fails} failing` : 'controls budget: all pass');
  if (fails) process.exitCode = 1;
})().catch((e) => { console.error('controls budget: error — ' + e.message); process.exit(1); });
