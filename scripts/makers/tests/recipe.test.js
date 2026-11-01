#!/usr/bin/env node
/**
 * The recipe round trip (scripts/makers/shell/recipe.js): state → recipe → state keeps everything that makes the page,
 * the drawings exactly; malformed recipes are refused; a ten-page worksheet with drawings fits the size cap.
 *   node scripts/makers/tests/recipe.test.js
 */
'use strict';
const path = require('path');
const { pathToFileURL } = require('url');

(async () => {
  const R = await import(pathToFileURL(path.join(__dirname, '..', 'shell', 'recipe.js')).href);
  let fails = 0;
  const check = (name, ok, extra) => { if (!ok) fails++; console.log((ok ? 'ok   ' : 'FAIL ') + name + (ok || extra === undefined ? '' : ' — ' + JSON.stringify(extra).slice(0, 300))); };
  const ctx = { maker: 'sight-words', makerVersion: 'abc123', dataVersion: 'def456', lang: 'de', title: 'Sichtwörter' };
  const stroke = (c, n, x0) => ({ c, pts: Array.from({ length: n }, (_, k) => [x0 + k * 3.5, 200 + (k % 7) * 2.5]) });
  const state = {
    id: 'K-388', level: 3, theme: null, pickedTheme: null, unit: 'und', answerKey: false, paper: 'a4',
    pages: [17, 512, 9],
    edits: [{}, { word: { 1: 'ist' } }, {}],
    units: ['und', 'der', 'die'],
    texts: [{ title: 'Unser Wort' }, {}, { instruction: 'Lies laut.' }],
    ink: [[stroke('red', 12, 100.5)], undefined, [stroke('black', 3, 50), stroke('blue', 1, 300)]],
    border: 'double', pageNumbers: true, more: true,
  };
  const r = R.toRecipe(state, ctx);
  const back = R.fromRecipe(JSON.parse(JSON.stringify(r)));
  const keep = (s) => ({ id: s.id, level: s.level, theme: s.theme, answerKey: s.answerKey, paper: s.paper, pages: s.pages, edits: s.edits, units: s.units, texts: s.texts, ink: s.ink, border: s.border, pageNumbers: s.pageNumbers });
  check('round trip keeps every field that makes the pages', JSON.stringify(keep(back)) === JSON.stringify(keep(state)), { back: keep(back) });
  check('drawings come back exactly (half pixels kept)', back.ink[0][0].pts[1][0] === 104 && back.ink[0][0].pts[0][0] === 100.5);
  check('the recipe carries no rendered page', !/<|data:/.test(JSON.stringify(r)));
  check('the recipe pins maker and data version', r.makerVersion === 'abc123' && r.dataVersion === 'def456' && r.maker === 'sight-words');

  const bad = (name, mutate) => { const x = JSON.parse(JSON.stringify(r)); mutate(x); let threw = false; try { R.fromRecipe(x); } catch (e) { threw = e instanceof R.RecipeError; } check('refused: ' + name, threw); };
  bad('unknown recipe version', (x) => { x.v = 99; });
  bad('no pages', (x) => { x.pages = []; });
  bad('eleven pages', (x) => { x.pages = Array.from({ length: 11 }, () => x.pages[0]); });
  bad('a page without a template', (x) => { delete x.pages[1].template; });
  bad('a page without a level', (x) => { x.pages[1].level = 'two'; });
  // a worksheet that mixes templates (operator 2026-11-01): each page keeps its own template, level and theme
  const mixed = { ...state, tpls: ['K-388', 'K-389', 'K-388'], lvls: [3, 1, 2] };
  const mr = R.toRecipe(mixed, { ...ctx, themes: [null, 'animals', null] });
  const mb = R.fromRecipe(JSON.parse(JSON.stringify(mr)));
  check('a mixed worksheet keeps every page template, level and theme', JSON.stringify(mb.tpls) === JSON.stringify(mixed.tpls) && JSON.stringify(mb.lvls) === JSON.stringify(mixed.lvls) && mr.pages[1].theme === 'animals' && mb.pickedTheme === 'animals' && mb.id === 'K-388' && mb.level === 3, { tpls: mb.tpls, lvls: mb.lvls });
  bad('a malformed seed', (x) => { x.pages[0].seed = 'r:zz'; });
  bad('an unknown ink colour', (x) => { x.pages[0].ink = ['pink|1,2 3,4']; });

  // the size cap: ten pages, each with forty strokes of sixty points — a heavily drawn worksheet
  const heavy = { ...state, pages: Array.from({ length: 10 }, (_, i) => i + 1), edits: Array(10).fill({}), units: Array(10).fill('und'), texts: Array(10).fill({}), ink: Array.from({ length: 10 }, () => Array.from({ length: 40 }, (_, k) => stroke('blue', 60, 10 + k))) };
  const bytes = R.recipeBytes(R.toRecipe(heavy, ctx));
  // as the screen keeps them: simplified when the pen lifts. Real strokes are curves (a circle drawn round a picture)
  const curve = (c, n, cx) => ({ c, pts: Array.from({ length: n }, (_, k) => [Math.round((cx + 30 * Math.cos(k / 6)) * 2) / 2, Math.round((300 + 30 * Math.sin(k / 6)) * 2) / 2]) });
  const drawn = { ...heavy, ink: Array.from({ length: 10 }, () => Array.from({ length: 40 }, (_, k) => { const s = curve('blue', 60, 60 + k * 15); return { c: s.c, pts: R.simplifyStroke(s.pts) }; })) };
  const kept = drawn.ink[0][0].pts.length;
  const sb = R.recipeBytes(R.toRecipe(drawn, ctx));
  console.log(`note  ten pages × 40 drawn circles of 60 points: ${(bytes / 1024).toFixed(1)} KB raw, ${(sb / 1024).toFixed(1)} KB simplified (${kept} of 60 points kept); cap ${R.MAX_RECIPE_BYTES / 1024} KB`);
  check('a heavily drawn ten-page worksheet fits the cap once simplified', sb < R.MAX_RECIPE_BYTES, sb);
  // simplification keeps the shape: every dropped point lies within the tolerance of the kept line
  const pts = curve('red', 60, 200).pts, simp = R.simplifyStroke(pts);
  const distToPoly = (p) => Math.min(...simp.slice(1).map((b, i) => { const a = simp[i]; const dx = b[0] - a[0], dy = b[1] - a[1]; const t = Math.max(0, Math.min(1, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / (dx * dx + dy * dy || 1))); return Math.hypot(a[0] + t * dx - p[0], a[1] + t * dy - p[1]); }));
  check('a simplified stroke stays within 0.6 px of every original point, ends kept', pts.every((p) => distToPoly(p) <= 0.6 + 1e-9) && simp[0] === pts[0] && simp[simp.length - 1] === pts[pts.length - 1] && simp.length < pts.length, simp.length);
  check('a plain worksheet is far under the cap', R.recipeBytes(r) < 4096, R.recipeBytes(r));

  console.log(fails ? `recipe test: ${fails} failing` : 'recipe test: all pass');
  if (fails) process.exitCode = 1;
})();
