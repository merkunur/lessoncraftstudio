#!/usr/bin/env node
/**
 * Gate: every source file a maker bundle contains is browser-safe and deterministic (ARCHITECTURE §2.5, §16).
 *
 * Reads esbuild's metafile inputs and fails on, in any bundled file outside lib/platform/:
 *   (a) a Node-only import (fs, crypto, vm, sharp, child_process, puppeteer, url, …) — build-bundles also refuses these;
 *   (b) require( with a non-literal argument (it cannot be bundled; it would throw in the browser);
 *   (c) new Function( or eval( (code built from strings);
 *   (d) Math.random( or Date.now( (a page must be a pure function of its recipe: same settings → same page).
 *
 *   node scripts/makers/lint-browser-safe.js <metafile.json …>     (build-bundles calls check() directly)
 *   node scripts/makers/lint-browser-safe.js --poison               (each rule must fire on a synthetic offender)
 */
'use strict';
const fs = require('fs');
const path = require('path');

const RULES = [
  ['node-only import', /\brequire\(\s*['"](fs|crypto|vm|sharp|child_process|puppeteer|url|os|zlib|http|https|worker_threads)['"]\s*\)/],
  ['non-literal require', /\brequire\(\s*(?!['"`])[^)]/],
  ['code from strings', /\bnew\s+Function\s*\(|(?<![\w.])eval\s*\(/],
  ['non-deterministic', /\bMath\.random\s*\(|\bDate\.now\s*\(/],
];

/** Comments and string literals are not code: strip them so a rule fires only on real calls. */
function codeOnly(src) {
  return src
    .replace(/\/\*[\s\S]*?\*\//g, ' ')
    .replace(/(^|[^:\\])\/\/[^\n]*/g, '$1')
    .replace(/'(?:\\.|[^'\\\n])*'|"(?:\\.|[^"\\\n])*"/g, (s) => (/^['"](fs|crypto|vm|sharp|child_process|puppeteer|url|os|zlib|http|https|worker_threads)['"]$/.test(s) ? s : '""'));
}

/** @returns {string[]} findings "file: rule: excerpt" */
function check(files, repo) {
  const out = [];
  for (const f of files) {
    const abs = path.isAbsolute(f) ? f : path.join(repo, f);
    if (/[\\/]lib[\\/]platform[\\/]/.test(abs) || !/\.js$/.test(abs) || !fs.existsSync(abs)) continue;
    const src = codeOnly(fs.readFileSync(abs, 'utf8'));
    for (const [name, re] of RULES) {
      const m = src.match(re);
      if (m) out.push(path.relative(repo, abs).replace(/\\/g, '/') + ': ' + name + ': ' + src.slice(Math.max(0, m.index - 30), m.index + 40).replace(/\s+/g, ' '));
    }
  }
  return out;
}

module.exports = { check, codeOnly, RULES };

if (require.main === module) {
  const repo = path.resolve(__dirname, '..', '..');
  if (process.argv.includes('--poison')) {
    const tmp = path.join(repo, '.scratch', 'lint-poison'); fs.mkdirSync(tmp, { recursive: true });
    const cases = {
      'a.js': "const fs = require('fs');", 'b.js': 'const m = require(name);', 'c.js': "const f = new Function('x', 'return x');",
      'd.js': 'const r = Math.random();', 'e.js': '// Math.random() in a comment\nconst s = "eval(";\nmodule.exports = 1;',
    };
    let ok = true;
    for (const [n, src] of Object.entries(cases)) {
      fs.writeFileSync(path.join(tmp, n), src);
      const hit = check([path.join(tmp, n)], repo).length > 0;
      const want = n !== 'e.js';
      console.log((hit === want ? 'ok   ' : 'WRONG') + ' ' + n + (want ? ' must fire' : ' must pass (comment/string only)') + ': ' + (hit ? 'fired' : 'passed'));
      if (hit !== want) ok = false;
    }
    fs.rmSync(tmp, { recursive: true, force: true });
    process.exit(ok ? 0 : 1);
  }
  const files = new Set();
  for (const mf of process.argv.slice(2)) Object.keys(JSON.parse(fs.readFileSync(mf, 'utf8')).inputs).forEach((k) => files.add(k));
  const found = check([...files].filter((k) => !k.includes(':')), repo);
  found.forEach((x) => console.log('FAIL ' + x));
  console.log(`lint-browser-safe: ${files.size} files, ${found.length} findings`);
  process.exit(found.length ? 1 : 0);
}
