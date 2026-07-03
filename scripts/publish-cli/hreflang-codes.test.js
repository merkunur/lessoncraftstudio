#!/usr/bin/env node
'use strict';

/**
 * Parity guard: scripts/publish-cli/hreflang-codes.js (CJS mirror) MUST match
 * frontend/lib/seo/hreflang.ts (the ESM/TS SoT). The mirror exists because
 * publish-cli can't import ESM/TS; this test makes the documented "update the
 * other file too" convention machine-enforced. Wired into deploy.sh pre-build.
 *
 * Standalone runner (no test framework, per slug.test.js precedent):
 *   node scripts/publish-cli/hreflang-codes.test.js
 */

const assert = require('assert');
const fs = require('fs');
const path = require('path');

const cjs = require('./hreflang-codes');

// --- Parse HREFLANG_MAP out of the TS SoT (cannot require ESM/TS from CJS) ---
const tsPath = path.join(__dirname, '..', '..', 'frontend', 'lib', 'seo', 'hreflang.ts');
const tsSource = fs.readFileSync(tsPath, 'utf8');

const mapMatch = tsSource.match(/export const HREFLANG_MAP[^=]*=\s*\{([\s\S]*?)\};/);
assert.ok(mapMatch, 'FAIL: could not locate `export const HREFLANG_MAP = {...}` in ' + tsPath);

const tsMap = {};
const entryRe = /([A-Za-z_$][\w$]*|'[^']+'|"[^"]+")\s*:\s*'([^']+)'/g;
let m;
while ((m = entryRe.exec(mapMatch[1])) !== null) {
  const key = m[1].replace(/^['"]|['"]$/g, '');
  tsMap[key] = m[2];
}
assert.ok(Object.keys(tsMap).length >= 11, 'FAIL: parsed only ' + Object.keys(tsMap).length + ' entries from hreflang.ts (expected 11)');

// --- 1. Map parity, both directions ---
assert.deepStrictEqual(
  cjs.HREFLANG_MAP,
  tsMap,
  'FAIL: HREFLANG_MAP drift between hreflang-codes.js (CJS mirror) and frontend/lib/seo/hreflang.ts (SoT)\n' +
    'CJS: ' + JSON.stringify(cjs.HREFLANG_MAP) + '\nTS:  ' + JSON.stringify(tsMap)
);

// --- 2. Locked invariants (CLAUDE.md §6 + audit R5) ---
assert.strictEqual(cjs.getHreflangCode('pt'), 'pt-BR', 'FAIL: pt must map to pt-BR');
assert.strictEqual(cjs.getHreflangCode('es'), 'es', 'FAIL: es must stay es (all Spanish markets)');
assert.strictEqual(cjs.getHreflangCode('no'), 'no', 'FAIL: no must stay no (bokmål canonical)');
assert.strictEqual(cjs.getHreflangCode('xx'), 'xx', 'FAIL: unknown locales pass through');

// --- 3. x-default policy: prefer en; else oldest-published; NEVER alpha-first ---
const en = { language: 'en', publishedAt: '2026-06-01T00:00:00Z' };
const da = { language: 'da', publishedAt: '2026-05-01T00:00:00Z' };
const sv = { language: 'sv', publishedAt: '2026-04-01T00:00:00Z' };
assert.strictEqual(cjs.pickXDefault([da, sv, en]), en, 'FAIL: x-default must prefer en when present');
assert.strictEqual(cjs.pickXDefault([da, sv]), sv, 'FAIL: x-default must pick oldest-published when en absent');
assert.strictEqual(cjs.pickXDefault([]), null, 'FAIL: empty siblings → null');
assert.strictEqual(
  cjs.pickXDefault([{ language: 'sv' }, { language: 'da' }]).language,
  'da',
  'FAIL: no publishedAt anywhere → deterministic locale-alpha tiebreak'
);

console.log('PASS hreflang-codes.test.js — mirror in sync with frontend/lib/seo/hreflang.ts (' + Object.keys(tsMap).length + ' locales, pt→pt-BR, x-default policy OK)');
