#!/usr/bin/env node
/**
 * Gate: declared screens (2026-11-01) — every template whose module declares `interactive` gets, in the maker, the screen
 * the catalogue gives it, built IN THE BROWSER by screen.js buildDeclaredScreen, and that screen WORKS.
 *
 * Per built maker × template with screen 'declared' × its screenLevels × en + fi (the long-word locale; --locales=) × 2
 * copies (--quick: en, copy 1):
 *   1. build — makePage({ declared }) + buildDeclaredScreen measure the screen build into a runtime that passes its
 *      kind's validator (interactive-runtime-core buildInteractive)
 *   2. solvable — the catalogue's robot (worksheet-gen/qa/verify-interactive.js) PLAYS it: the right answers computed
 *      INDEPENDENTLY by the type's interactive.oracle reach the celebration with every item green; a wrong answer never
 *      celebrates; every tap target ≥ 44 px at 360 / 768 / 1024 and inside the viewport
 *   3. no tell — the served page carries no data-lcs-* outside the structural allow-list (the answers travel only in
 *      DECK_BUNDLE)
 *   4. inside the crop — every measured item lies within the cropped page (0..100 %)
 *   5. strings — a native screen instruction for every locale the template ships in, every level
 * Poisoned on every run, both directions: a wrong answer map must be caught by (2); an answer mark left on the served
 * page by (3); an item moved below the crop by (4); a missing instruction by (5); the correct screen passes all of it.
 *
 *   node scripts/makers/gates/declared-screens.js [--makers=odd-even] [--quick] [--locales=en,fi]
 */
'use strict';
const fs = require('fs');
const path = require('path');
const os = require('os');
const REPO = path.join(__dirname, '..', '..', '..');
const puppeteer = require(path.join(REPO, 'node_modules', 'puppeteer'));
const runtime = require('../runtime.js');
const screen = require('../screen.js');
const MP = require('./lib/maker-pages.js');
const { runtimeStrings } = require(path.join(REPO, 'scripts', 'worksheet-gen', 'emit', 'interactive-runtime.js'));
const { resolveStrings, withLevelInstruction } = require(path.join(REPO, 'scripts', 'worksheet-gen', 'i18n', 'strings.js'));
const { playScreen, shiftAnswers } = require(path.join(REPO, 'scripts', 'worksheet-gen', 'qa', 'verify-interactive.js'));
const { bot } = require('./lib/marks-bot.js');
const SCREEN_I18N = (() => { const S = JSON.parse(fs.readFileSync(path.join(REPO, 'scripts', 'worksheet-gen', 'i18n', 'screen-instructions.json'), 'utf8'))._generic; const o = {}; for (const [k, by] of Object.entries(S)) for (const [loc, v] of Object.entries(by)) (o[loc] = o[loc] || {})[k] = v; return o; })();
const args = Object.fromEntries(process.argv.slice(2).map((a) => { const m = a.match(/^--([^=]+)=(.*)$/); return m ? [m[1], m[2]] : [a.replace(/^--/, ''), true]; }));
const QUICK = !!args.quick;
const LOCS = String(args.locales || (QUICK ? 'en' : 'en,fi')).split(',');
const COPIES = QUICK ? [1] : [1, 2];

/** (3) the data-lcs-* attributes on the served page outside the structural allow-list */
const leakedMarks = (html) => {
  const out = new Set();
  // the page part only (the runtime's own script carries the bundle, by design)
  const body = html.split('<script>window.DECK_BUNDLE=')[0];
  for (const m of body.matchAll(/\sdata-lcs-([a-z0-9-]+)/g)) if (!screen.ALLOW.has(m[1])) out.add(m[1]);
  return [...out];
};
/** (4) items outside the crop (rects in %) */
const outsideCrop = (items) => items.filter((it) => {
  const rs = it.options ? it.options : [it];
  return rs.some((r) => (r.y != null && (r.y < -0.5 || r.y + (r.h || 0) > 100.5)) || (r.cy != null && (r.cy < 0 || r.cy > 100)));
}).length;

async function main() {
  const makers = MP.builtMakers(args.makers ? String(args.makers).split(',') : undefined);
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'lcs-declared-'));
  // a page that never settles fails after two minutes instead of stalling the run (2026-11-02: a run sat idle 2.5 h)
  // an uncapped frame rate: a maze screen's robot drags ~2,500 pointer moves, each one handled in a frame — at 60 fps a case
  // took two minutes and the 25 maze templates ~8 h, so no full run had ever finished (2026-11-05; 12 s a case uncapped)
  const browser = await puppeteer.launch({ args: ['--allow-file-access-from-files', '--disable-frame-rate-limit', '--disable-gpu-vsync'], protocolTimeout: 120000 });
  let page = await browser.newPage();
  await page.setViewport({ width: 703, height: 945 });
  const mount = async (html) => { const f = path.join(tmp, 'm.html'); fs.writeFileSync(f, html); await page.goto('file:///' + f.split(path.sep).join('/'), { waitUntil: 'load' }); await page.evaluate(async () => { await document.fonts.ready; }); return page; };
  let robotPage = await browser.newPage();
  // a page that timed out is thrown away: the next case starts on fresh pages (2026-11-04: one hung odd-even screen
  // ended the whole run after 34 min — pipe3 the same — with no case named)
  const freshPages = async () => {
    for (const p of [page, robotPage]) { try { await p.close(); } catch (e) { /* already gone */ } }
    page = await browser.newPage(); await page.setViewport({ width: 703, height: 945 });
    robotPage = await browser.newPage();
  };
  let checked = 0, bad = 0, templates = 0;
  let poisonSample = null;
  const paths = {};
  const fails = [];
  // each failure also goes to the progress stream as it happens: a run that is stopped keeps what it found (2026-11-05: two
  // runs stopped after ~3 h of templates, their FAIL list printed only at the end, lost)
  fails.push = function (...a) { for (const x of a) process.stderr.write('declared-screens: FAIL ' + x + '\n'); return Array.prototype.push.apply(this, a); };
  for (const { maker, tj } of makers) {
    for (const t of tj.templates) {
      if (t.screen !== 'declared') continue;
      templates++;
      process.stderr.write(`declared-screens: ${maker} ${t.id}\n`);   // progress: where a slow run is
      const type = require(path.join(REPO, t.file));
      // (5) strings
      // a level a language does not offer (templates.json localeLevels) has no screen there, and needs no instruction
      const lvIn = (loc) => (t.localeLevels && t.localeLevels[loc]) || t.levels;
      for (const loc of t.locales) for (const d of t.screenLevels.filter((x) => lvIn(loc).includes(x))) if (!(t.screenInstructions && t.screenInstructions[loc] && t.screenInstructions[loc][d])) fails.push(`${maker} ${t.id} L${d} ${loc}: no screen instruction`);
      for (const loc of LOCS) {
        if (!t.locales.includes(loc)) continue;
        for (const d of t.screenLevels.filter((x) => lvIn(loc).includes(x))) for (const v of COPIES) {
          const theme = t.themed ? (((t.localeThemes && t.localeThemes[loc]) || t.themes).find((x) => !/\bbw\b/i.test(x)) || ((t.localeThemes && t.localeThemes[loc]) || t.themes)[0]) : null;
          const lu = ((t.units && t.units[loc]) || []).filter((u) => (!t.unitLevels || t.unitLevels[u.id] === d) && (!t.localeUnitLevels || !t.localeUnitLevels[loc] || (t.localeUnitLevels[loc][u.id] || []).includes(d)));   // the level's units
          const unit = lu.length ? lu[0].id : null;
          const tag = `${maker} ${t.id} L${d} ${loc} copy ${v}`;
          checked++;
          // thousands of mounts on one page wear the browser out: fresh pages every 150 cases
          if (checked % 150 === 0) await freshPages();
          let got, sc, buildErr = null;
          for (let attempt = 0; attempt < 2 && !got; attempt++) try {
            const s = withLevelInstruction(resolveStrings(t.id, loc, type), t.id, d, loc);
            // the attempt the maker's page used (runtime.generate's seed ladder — the screen replays it, shell.js
            // screenHtmlFor): the first fresh-seed retry the page builds with (2026-11-02: G2-261 level 3 builds only
            // on a retry; the gate built the bare seed and reported a screen the maker never shows)
            const sv = [null, '.1', '.2', '.3', '.4'].find((x) => { try { runtime.makePage({ type, strings: s, locale: loc, difficulty: d, theme, unit, variant: v, ...(x ? { seedVariant: v + x } : {}) }); return true; } catch (e) { return false; } });
            const att = sv ? { seedVariant: v + sv } : {};
            // the shared decision (runtime.js screenFor): declared, else the page's marks (the published face)
            got = await runtime.screenFor({ type, strings: s, locale: loc, difficulty: d, theme, unit, variant: v, ...att, tpl: t, runtimeStrings: runtimeStrings(loc), marksInstructions: SCREEN_I18N[loc] }, mount);
            if (got.path === 'declared') {
              // the same build again, for its measured items (screenFor returns the document only)
              const r = runtime.makePage({ type, strings: s, locale: loc, difficulty: d, theme, unit, variant: v, ...att, declared: true, screenInstruction: t.screenInstructions[loc][d] });
              sc = await screen.buildDeclaredScreen({ html: r.declaredHtml, type, theme, difficulty: d, locale: loc, unit: r.unit, design: r.meta && r.meta.design, strings: runtimeStrings(loc), mount });
            }
          } catch (e) {
            // a build error is the template's; a timeout is retried once on fresh pages (the play step's rule)
            got = undefined; sc = undefined; buildErr = e;
            const timedOut = /timed out/i.test(e.message);
            if (timedOut) await freshPages();
            if (!timedOut) break;
          }
          if (got) paths[got.path] = (paths[got.path] || 0) + 1;
          if (!got) { bad++; fails.push(`${tag}: (1) ${buildErr.reasons ? buildErr.reasons.join('; ') : buildErr.message}`); continue; }
          const play = async () => {
            const f = [];
            const leaks = leakedMarks(got.html);
            if (leaks.length) f.push('(3) answer marks on the served page: ' + leaks.join(','));
            if (sc) {
              const out = outsideCrop(sc.items);
              if (out) f.push('(4) ' + out + ' items outside the crop');
              const played = await playScreen(robotPage, sc.html, type.interactive.oracle, loc, sc.kind);
              if (played.length) f.push('(2) ' + played.slice(0, 3).join('; '));
            } else {
              // a marks screen (the published face): the marks gate's player, real clicks
              await mount(got.html);
              const right = await page.evaluate(bot, 'right');
              if (right.err) f.push('(2) marks: ' + right.err);
              else if (right.states.some((x) => x !== 'right' && x !== null)) f.push('(2) marks: the right answers were not all marked right');
              await new Promise((res) => setTimeout(res, 600));
              if (!right.err && !(await page.evaluate(() => !document.getElementById('lcs-celebration').hidden))) f.push('(2) marks: no celebration on all right');
              await page.evaluate(() => window.__lcsMarks.reset());
              const wrong = await page.evaluate(bot, 'wrong');
              if (!wrong.err && wrong.states.some((x) => x === 'right')) f.push('(2) marks: a wrong answer was marked right');
            }
            return f;
          };
          // a timeout is retried ONCE on fresh pages: a long run's tired browser is not the screen's fault (the same case
          // passed alone, 2026-11-04); a screen that hangs again fails, named
          let f;
          try { f = await play(); } catch (e1) {
            await freshPages();
            try { f = await play(); } catch (e2) { f = ['(2) the screen never settled (twice): ' + String(e2.message).slice(0, 140)]; await freshPages(); }
          }
          if (f.length) { bad++; fails.push(`${tag} [${got.path}]: ${f.join(' | ')}`); }
          else if (!poisonSample && sc) poisonSample = { sc, type, loc, tag };
        }
      }
    }
  }
  if (!templates) throw new Error('declared-screens: no declared template in the built makers asked for (a vacuous run is not a pass)');
  // poisons, both directions
  let killed = 0, poisons = 0;
  if (poisonSample) {
    const { sc, type, loc } = poisonSample;
    const shifted = shiftAnswers(sc.html);   // the catalogue robot's own poison map (every kind, sort sets included)
    if (shifted === sc.html) fails.push('POISON NOT APPLIED: the answer map did not change');
    poisons++; if ((await playScreen(robotPage, shifted, type.interactive.oracle, loc, sc.kind)).length) killed++; else fails.push('POISON SURVIVED: a wrong answer map played clean');
    poisons++; if (leakedMarks(sc.html.replace('<div class="ws-page" data-lcs-page>', '<div class="ws-page" data-lcs-page data-lcs-correct>')).length) killed++; else fails.push('POISON SURVIVED: an answer mark on the served page');
    poisons++; if (outsideCrop(sc.items.map((it, i) => (i ? it : { ...it, y: 99, h: 5, options: it.options ? it.options.map((o) => ({ ...o, y: 99, h: 5 })) : undefined, cy: it.cy != null ? 120 : undefined })))) killed++; else fails.push('POISON SURVIVED: an item below the crop');
    poisons++; if (leakedMarks(sc.html).length === 0 && outsideCrop(sc.items) === 0) killed++; else fails.push('POISON (control) FAILED: the correct screen does not pass');
  } else fails.push('no passing declared screen to poison');
  await browser.close();
  fs.rmSync(tmp, { recursive: true, force: true });
  for (const f of fails) console.log('FAIL ' + f);
  console.log(`declared screens: ${templates} templates, ${checked} screens built and played (${Object.entries(paths).map(([k, n]) => k + ' ' + n).join(', ')}), ${bad} failed; poisons ${killed}/${poisons}`);
  process.exit(bad || fails.length ? 1 : 0);
}
main().catch((e) => { console.error('declared-screens: ' + e.message); process.exit(1); });
