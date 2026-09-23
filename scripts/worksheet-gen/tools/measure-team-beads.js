#!/usr/bin/env node
/**
 * measure-team-beads.js [--check]   (G1-380 `digraphs`, nt10-E)
 *
 * Measures the advance width of every letter TEAM a digraphs bead may print, in
 * Baloo 2 700, in the SAME Chromium that renders the sheets, from the shell's own
 * woff2 (assets/fonts/fonts.css, file://) — the measure-font-metrics.js pattern.
 * Writes primitives/team-bead.widths.json as PER-EM ratios (font-size 1), so
 * primitives/team-bead.js computes textW = ratio x fontPx and never guesses a
 * glyph width. A team missing from the table makes the primitive THROW.
 *
 * Refuses to write when the font did not load (document.fonts.check false) or a
 * width is 0 / NaN: a fallback font measured as if it were Baloo 2 is worse than
 * no file. `--check` re-measures and compares (exit 1 on drift > 0.002 em).
 *
 * The team list is the union of the design file's §2 table (G1-380-digraphs.md)
 * and the other letter teams the six shipping panels may sign; add a team here
 * and re-run before a panel ships it.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const url = require('url');
const puppeteer = require('puppeteer');

const WG = path.resolve(__dirname, '..');
const OUT = path.join(WG, 'primitives', 'team-bead.widths.json');
const FONTS_CSS = fs.readFileSync(path.join(WG, 'assets', 'fonts', 'fonts.css'), 'utf8');
const TEAMS = [
  // en
  'sh', 'ch', 'th', 'wh', 'ph', 'ng', 'ck',
  // de
  'sch', 'au', 'ei', 'eu', 'äu', 'ie', 'pf', 'qu',
  // pt
  'nh', 'lh', 'gu', 'rr', 'ss',
  // fr
  'ou', 'on', 'oi', 'an', 'en', 'in', 'un', 'ai', 'au', 'eau', 'gn',
  // nl
  'oe', 'ui', 'oo', 'ee', 'uu', 'aa', 'ij', 'ou',
  // fi
  'ää', 'öö', 'ii', 'yy',
];
const CHECK = process.argv.includes('--check');

(async () => {
  const uniq = [...new Set(TEAMS)];
  const htmlPath = path.join(WG, 'out', 'dev', '_team-bead-widths.html');
  fs.mkdirSync(path.dirname(htmlPath), { recursive: true });
  const css = FONTS_CSS.replace(/url\('([^']+)'\)/g, (m, f) => `url('${url.pathToFileURL(path.join(WG, 'assets', 'fonts', f)).href}')`);
  fs.writeFileSync(htmlPath, `<!doctype html><html><head><meta charset="utf-8"><style>${css}</style></head><body><canvas id="c" width="10" height="10"></canvas></body></html>`, 'utf8');
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  let widths;
  try {
    await page.goto(url.pathToFileURL(htmlPath).href, { waitUntil: 'networkidle0' });
    widths = await page.evaluate(async (teams) => {
      const spec = '700 1000px "Baloo 2"';
      await document.fonts.load(spec, teams.join(''));
      await document.fonts.ready;
      if (!document.fonts.check(spec, teams.join(''))) return { error: 'Baloo 2 700 did not load' };
      const ctx = document.getElementById('c').getContext('2d');
      ctx.font = spec;
      const o = {};
      for (const t of teams) o[t] = ctx.measureText(t).width / 1000;
      return o;
    }, uniq);
  } finally { await browser.close(); }
  if (widths.error) { console.error(widths.error); process.exit(1); }
  for (const [t, v] of Object.entries(widths)) {
    if (!Number.isFinite(v) || v <= 0.2 || v > 3) { console.error(`width of "${t}" = ${v} is not a Baloo 2 team width`); process.exit(1); }
    widths[t] = +v.toFixed(4);
  }
  if (CHECK) {
    const cur = JSON.parse(fs.readFileSync(OUT, 'utf8')).em;
    let drift = 0;
    for (const t of Object.keys(widths)) if (!(Math.abs((cur[t] || 0) - widths[t]) <= 0.002)) { console.error(`DRIFT ${t}: committed ${cur[t]} measured ${widths[t]}`); drift++; }
    console.log(drift ? `team-bead widths: ${drift} drift(s)` : `team-bead widths: ${Object.keys(widths).length} teams match the committed file`);
    process.exit(drift ? 1 : 0);
  }
  fs.writeFileSync(OUT, JSON.stringify({ _measuredBy: 'tools/measure-team-beads.js (Chromium canvas measureText, Baloo 2 700, per-em advance width)', font: 'baloo2-700', em: widths }, null, 2) + '\n');
  console.log('wrote ' + OUT + ' — at 26 px: ' + Object.entries(widths).map(([t, v]) => `${t} ${(v * 26).toFixed(1)}`).join(' · '));
})().catch((e) => { console.error(e.message); process.exit(1); });
