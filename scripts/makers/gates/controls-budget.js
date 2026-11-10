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
const FLAG = new Set(require('../topic-map.js').MAKERS.filter((m) => m.flagship).map((m) => m.id));
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
  if ((t.themed && themes.length > 1) || t.art) list.push('pictures');   // t.art: the theme tiles and picture picker (shell artControl)
  // hideUnits (unitAxis.hideInMaker): the shell shows no word list there (shell.js, `!pt.hideUnits`) — the Color by Number
  // picture templates, whose theme tiles and picture picker replace it (2026-11-09: K-394/K-587/K-588/G3-479 declared a
  // word the screen rightly hides)
  if (!t.hideUnits && t.units && t.units[loc] && t.units[loc].length) list.push('word');
  for (const c of t.controls || []) list.push('control:' + c);
  return list;
}

/** a page that reports an art slot shows the shell's art control: asked of the page itself, at the level the screen opens on */
function markArt(tj) {
  const { makePage } = require('../runtime.js');
  const { resolveStrings } = require(path.join(ROOT, 'scripts/worksheet-gen/i18n/strings.js'));
  for (const t of tj.templates) {
    try {
      const type = require(path.join(ROOT, t.file)), levels = (t.localeLevels && t.localeLevels.en) || t.levels;
      const b = makePage({ type, strings: resolveStrings(t.id, 'en', type), locale: 'en', difficulty: levels.includes(2) ? 2 : levels[0], theme: t.themed ? (t.themes || [])[0] : null, unit: null, variant: 1 });
      if (b.slots && b.slots.art) t.art = true;
    } catch (e) { /* a page that cannot be built here is the build gates' to report */ }
  }
}

function makers() {
  return fs.readdirSync(OUT).filter((m) => fs.existsSync(path.join(OUT, m, 'current.txt')) && fs.existsSync(path.join(OUT, m, fs.readFileSync(path.join(OUT, m, 'current.txt'), 'utf8').trim(), 'templates.json'))).map((m) => {
    const v = fs.readFileSync(path.join(OUT, m, 'current.txt'), 'utf8').trim();
    const tj = JSON.parse(fs.readFileSync(path.join(OUT, m, v, 'templates.json'), 'utf8'));
    if (FLAG.has(m)) markArt(tj);
    return { maker: m, tj };
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

  // poison: the art control counts as Pictures, on a page with no theme axis too
  if (declared({ levels: [2], art: true, locales: ['en'] }, 'en').join(',') !== 'pictures') { console.log('FAIL poison: an art page must declare Pictures'); fails++; }
  if (declared({ levels: [2], locales: ['en'] }, 'en').length) { console.log('FAIL poison: a page with no art and one level declares nothing'); fails++; }
  // poison: a word list the shell hides is no control; the same list shown is one
  const wl = { levels: [2], units: { en: [{ id: 'w' }] }, locales: ['en'] };
  if (declared({ ...wl, hideUnits: true }, 'en').length || declared(wl, 'en').join(',') !== 'word') { console.log('FAIL poison: a hidden word list must declare nothing, a shown one "word"'); fails++; }

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
          // the picture control (shell artControl) and the tap hint are added when the FIRST PAGE RESULT arrives, after the
          // sheet: count once the hint is there (2026-11-10: 300 ms after the sheet counted 13 templates' Pictures as missing
          // while three gates ran at once — it came 0.5-3 s later); a refused page shows its note instead
          await p.waitForFunction(() => document.querySelector('#mk-controls .mk-tap-hint, .mk-note'), { timeout: 30000 });
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
