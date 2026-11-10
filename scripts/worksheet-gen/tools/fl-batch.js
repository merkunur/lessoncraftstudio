#!/usr/bin/env node
/**
 * fl-batch.js — run one of the store builders over every B&W picture in N parallel workers (docs/makers/FLAGSHIP.md).
 *   node tools/fl-batch.js <d2d|htd|cbn> [--workers=4] [--missing]
 * --missing: only pictures with no record yet. Each worker gets every N-th picture, so cheap and costly themes spread evenly.
 */
'use strict';
const fs = require('fs'); const path = require('path'); const { spawn } = require('child_process');
const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.split('=').slice(1).join('=') : d; };
const WG = path.join(__dirname, '..');
const JOBS = {
  d2d: { tool: 'tools/d2d-build.js', designs: 'data/fl/designs-d2d.js', out: 'data/fl/d2d' },
  htd: { tool: 'tools/htd-build.js', designs: 'data/fl/designs-all.js', out: 'data/fl/htd' },
  cbn: { tool: 'tools/cbn-lineart-build.js', designs: 'data/fl/designs-all.js', out: 'data/fl/cbn' },
};
const job = JOBS[process.argv[2]];
if (!job) { console.error('usage: fl-batch.js <d2d|htd|cbn>'); process.exit(2); }
const N = +arg('workers', 4);
const { LINEART } = require(path.join(WG, job.designs));
fs.mkdirSync(path.join(WG, job.out), { recursive: true });
const have = new Set(fs.readdirSync(path.join(WG, job.out)).map((f) => f.replace(/\.json$/, '')));
const listFile = arg('list');
const ids = listFile ? fs.readFileSync(listFile, 'utf8').split(',').filter(Boolean) : LINEART.map((d) => d.id).filter((id) => !process.argv.includes('--missing') || !have.has(id));
console.log(`${process.argv[2]}: ${ids.length} pictures, ${N} workers`);
let left = N;
for (let w = 0; w < N; w++) {
  const mine = ids.filter((_, i) => i % N === w);
  const list = path.join(process.env.TEMP || '/tmp', `fl-${process.argv[2]}-${w}.txt`);
  fs.writeFileSync(list, mine.join(','));
  const c = spawn(process.execPath, [job.tool, `--designs=${job.designs}`, `--out=${job.out}`, `--only-file=${list}`, ...process.argv.slice(3).filter((a) => /^--(steps|fold|interior)/.test(a))], { cwd: WG, stdio: ['ignore', fs.openSync(list + '.log', 'w'), fs.openSync(list + '.err', 'w')] });
  c.on('exit', (code) => { console.log(`worker ${w} done (${code})`); if (!--left) console.log('all done'); });
}
