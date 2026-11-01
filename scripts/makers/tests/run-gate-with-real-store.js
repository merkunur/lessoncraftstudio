#!/usr/bin/env node
/**
 * Run a maker-screen gate against the REAL store rules (frontend/lib/makers/store.ts) instead of the local stand-in:
 *
 *   node scripts/makers/tests/run-gate-with-real-store.js saves-shell
 *   node scripts/makers/tests/run-gate-with-real-store.js play-shell
 *
 * The preview server (serve.js) looks up `require('./local-store.js').handle` on every request, so replacing the
 * exports of the cached local-store module with scripts/makers/tests/real-store-local.js before the gate loads
 * serve.js routes every /api/makers/* call and every /s/<id> read through the website's rules. The gate file is
 * untouched; it reports exactly as it does against the stand-in.
 */
'use strict';
const path = require('path');
const gate = process.argv[2];
if (!gate || !/^[a-z-]+$/.test(gate)) { console.error('usage: run-gate-with-real-store.js <gate>'); process.exit(2); }
const localPath = require.resolve('../local-store.js');
const local = require(localPath);
const real = require('./real-store-local.js');
for (const k of ['handle', 'readLink', 'readPreset']) local[k] = real[k];
console.log('store: the REAL rules (frontend/lib/makers/store.ts) over the in-memory db');
require(path.join(__dirname, '..', 'gates', gate + '.js'));
