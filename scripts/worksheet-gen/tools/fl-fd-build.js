#!/usr/bin/env node
/** fl-fd-build.js — tools/fd-build.js --set=fdl over the flagship scenes, N at a time (docs/makers/FLAGSHIP.md). */
'use strict';
const path = require('path'); const { spawn } = require('child_process');
const specs = require('../data/fl/fd-scenes.json');
const N = 10; let left = N;
for (let w = 0; w < N; w++) {
  const ids = specs.filter((_, i) => i % N === w).map((s) => s.id);
  const c = spawn(process.execPath, [path.join(__dirname, 'fd-build.js'), '--set=fdl', '--only=' + ids.join(',')], { cwd: path.join(__dirname, '..'), stdio: ['ignore', 'pipe', 'pipe'] });
  c.stdout.on('data', (d) => process.stdout.write(d)); c.stderr.on('data', (d) => process.stderr.write(d));
  c.on('exit', (code) => { console.log('worker ' + w + ' done ' + code); if (!--left) console.log('all done'); });
}
