#!/usr/bin/env node
/**
 * Gate: unique-solution (ENGINES [logic-puzzles-Q1] "gate 15 unique-solution"; task 6 of the ten, 2026-11-01) — every
 * puzzle a maker prints has EXACTLY ONE solution, proven here by an exhaustive counter that is independent of the
 * page's build path and of the type's own verify().
 *
 * For every built maker × template whose module declares `puzzle: true` × levels × (first colour theme, first B&W theme)
 * × copies 1-2 × en + fi, the page is built in Node (runtime.js makePage, the catalogue's seed rule) and every
 * `data-lcs-puzzle` stamp on it is read:
 *   1. the stamp carries CLUES ONLY — never a solution / values / weights key (a printed page leaks nothing);
 *   2. the stamp's exhaustive count (lib/logic-sudoku / -cages / -code / -balance countSolutions, limit 3) is exactly 1;
 *   3. the answers the page carries for its key (the .ws-answerbox[data-lcs-answer] boxes inside that stamp's root, in
 *      DOM order) are that unique solution — so the key marks the one right answer and nothing else;
 *   4. a template that declares `puzzle: true` but stamps no puzzle, or stamps a kind this gate cannot count, fails.
 * Non-vacuity: at least one puzzle template must be found across the makers checked, else the gate fails.
 * Poisoned on every run, both directions: a sudoku stamp with one more clue blanked (two solutions) must fail (2), a
 * stamp with a leaked `solution` key must fail (1), a box altered to a wrong number must fail (3) — and every real page
 * passes.
 *
 *   node scripts/makers/gates/unique-solution.js [--makers=logic-puzzles] [--copies=2]
 */
'use strict';
const path = require('path');
const { parse } = require('node-html-parser');
const REPO = path.join(__dirname, '..', '..', '..');
const { builtMakers, args } = require('./lib/maker-pages.js');
const runtime = require('../runtime.js');
const { resolveStrings, withLevelInstruction } = require(path.join(REPO, 'scripts', 'worksheet-gen', 'i18n', 'strings.js'));
const LIB = path.join(REPO, 'scripts', 'worksheet-gen', 'lib');
const ENGINES = { sudoku: require(path.join(LIB, 'logic-sudoku.js')), cages: require(path.join(LIB, 'logic-cages.js')), code: require(path.join(LIB, 'logic-code.js')), balance: require(path.join(LIB, 'logic-balance.js')) };
const LEAK_KEYS = ['solution', 'values', 'weights', 'answer', 'answers'];
const A = args();
const COPIES = Number(A.copies || 2);
const LOCALES = ['en', 'fi'];

/** the exhaustive count of a stamp and its unique solution as the ordered answers of the page's boxes */
function count(p) {
  if (p.kind === 'sudoku') {
    const n = ENGINES.sudoku.countSolutions(p.grid, 3);
    if (n !== 1) return { n };
    const sol = ENGINES.sudoku.grade(p.grid).grid;   // the forced-step solver reaches the one solution
    const grid = sol && !sol.includes(-1) ? sol : solveSudoku(p.grid);
    return { n, answers: p.grid.map((v, i) => (v < 0 ? grid[i] + 1 : null)).filter((v) => v !== null) };
  }
  if (p.kind === 'cages') {
    const n = ENGINES.cages.countSolutions(p.n, p.cages, 3);
    if (n !== 1) return { n };
    const grid = ENGINES.cages.grade(p.n, p.cages).grid;
    const singles = new Set(p.cages.filter((cg) => cg.cells.length === 1).map((cg) => cg.cells[0]));
    return { n, answers: grid.map((v, i) => (singles.has(i) ? null : v)).filter((v) => v !== null) };
  }
  if (p.kind === 'code') { const n = ENGINES.code.countSolutions(p, 3); return n === 1 ? { n, answers: ENGINES.code.grade(p).values } : { n }; }
  if (p.kind === 'balance') { const n = ENGINES.balance.countSolutions(p, 3); return n === 1 ? { n, answers: ENGINES.balance.grade(p).weights } : { n }; }
  return { n: NaN };
}
/** a plain backtracking solve for a sudoku stamp (used only if the forced solver would not finish — it always does) */
function solveSudoku(grid) {
  const g = grid.slice(), N = Math.sqrt(g.length), { peers } = ENGINES.sudoku.units(N);
  const rec = () => { const i = g.indexOf(-1); if (i < 0) return true; for (let v = 0; v < N; v++) { if (peers[i].some((p) => g[p] === v)) continue; g[i] = v; if (rec()) return true; g[i] = -1; } return false; };
  rec(); return g;
}

/** check one page html: returns the failures */
function checkHtml(html, where) {
  const fails = [];
  const root = parse(html);
  const stamps = root.querySelectorAll('[data-lcs-puzzle]');
  if (!stamps.length) return [where + ': no puzzle stamped on the page'];
  stamps.forEach((el, i) => {
    let p;
    try { p = JSON.parse(el.getAttribute('data-lcs-puzzle')); } catch (e) { fails.push(where + ': puzzle ' + (i + 1) + ' stamp unreadable'); return; }
    for (const k of LEAK_KEYS) if (k in p) fails.push(where + ': puzzle ' + (i + 1) + ' stamp leaks "' + k + '"');
    const r = count(p);
    if (r.n !== 1) { fails.push(where + ': puzzle ' + (i + 1) + ' (' + p.kind + ') has ' + r.n + ' solutions'); return; }
    const boxes = el.querySelectorAll('.ws-answerbox[data-lcs-answer]').map((b) => Number(b.getAttribute('data-lcs-answer')));
    if (boxes.length) {
      if (boxes.length !== r.answers.length) fails.push(where + ': puzzle ' + (i + 1) + ' has ' + boxes.length + ' boxes for ' + r.answers.length + ' answers');
      else boxes.forEach((v, j) => { if (v !== r.answers[j]) fails.push(where + ': puzzle ' + (i + 1) + ' box ' + (j + 1) + ' holds ' + v + ', the unique solution is ' + r.answers[j]); });
    }
  });
  return fails;
}

(async () => {
  let fails = 0, pages = 0, puzzles = 0, templates = 0;
  const fail = (m) => { fails++; console.log('FAIL ' + m); };
  for (const { maker, tj } of builtMakers(A.makers)) {
    for (const t of tj.templates) {
      const spec = require(path.join(REPO, t.file));
      if (!spec.puzzle) continue;
      templates++;
      const themes = t.themed ? [t.themes.find((th) => !/bw(\s+\d+)?$/i.test(th)), t.themes.find((th) => /bw(\s+\d+)?$/i.test(th))].filter(Boolean) : [null];
      let sample = null;
      for (const loc of LOCALES.filter((l) => t.locales.includes(l))) for (const d of t.levels) for (const theme of themes) for (let v = 1; v <= COPIES; v++) {
        const strings = withLevelInstruction(resolveStrings(spec.id, loc, spec), spec.id, d, loc);
        let r;
        try { r = runtime.makePage({ type: spec, strings, locale: loc, difficulty: d, theme, variant: v, answerKey: true, answerKeySuffix: tj.answerKey[loc] }); }
        catch (e) { fail(`${maker} ${spec.id} L${d} ${theme || '-'} ${loc} v${v}: build failed: ${e.message}`); continue; }
        pages++;
        const where = `${maker} ${spec.id} L${d} ${theme || '-'} ${loc} v${v}`;
        const f = checkHtml(r.html, where);
        f.forEach(fail);
        puzzles += parse(r.html).querySelectorAll('[data-lcs-puzzle]').length;
        if (!sample && spec.id === 'G1-470') sample = r.html;
      }
      // POISONS on a real number-sudoku page (both directions: the page itself passes above)
      if (sample) {
        // the RAW attribute text of the first stamp (entities as the page escapes them), so a replacement lands
        const raw = /data-lcs-puzzle="([^"]*)"/.exec(sample)[1];
        const p = JSON.parse(raw.replace(/&quot;/g, '"').replace(/&amp;/g, '&'));
        const stamped = (o) => sample.replace(raw, JSON.stringify(o).replace(/&/g, '&amp;').replace(/"/g, '&quot;'));
        // (2) one more clue blanked: every minimal clue set loses uniqueness on some clue — find one and assert the gate fires
        const clue = p.grid.map((x, i) => i).filter((i) => p.grid[i] >= 0).find((i) => { const g = p.grid.slice(); g[i] = -1; return ENGINES.sudoku.countSolutions(g, 3) >= 2; });
        if (clue == null) fail('poison (2) could not find a clue whose removal breaks uniqueness');
        else {
          const g = p.grid.slice(); g[clue] = -1;
          if (!checkHtml(stamped({ kind: 'sudoku', n: p.n, grid: g }), 'poison').some((m) => / has \d+ solutions/.test(m))) fail('poison (2): a two-solution stamp PASSED');
        }
        // (1) a leaked solution key
        if (!checkHtml(stamped({ ...p, solution: [] }), 'poison').some((m) => /leaks/.test(m))) fail('poison (1): a stamp with a solution key PASSED');
        // the untouched sample must pass (the other direction)
        if (checkHtml(sample, 'poison-control').length) fail('poison control: the real page FAILED');
        // (3) a wrong answer in a box
        const m = /data-lcs-answer="(\d)"/.exec(sample);
        const wrong = sample.replace(m[0], `data-lcs-answer="${(Number(m[1]) % 4) + 1}"`);
        if (!checkHtml(wrong, 'poison').some((x) => /unique solution is/.test(x))) fail('poison (3): a wrong answer box PASSED');
      }
    }
  }
  if (!templates) fail('no template declares puzzle: true in the makers checked (vacuous run)');
  console.log(`unique-solution: ${templates} puzzle templates, ${pages} pages, ${puzzles} puzzles counted, ${fails} failures`);
  process.exit(fails ? 1 : 0);
})();
