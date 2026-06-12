/**
 * Batch renderer — one persistent browser, many instances.
 *   node scripts/worksheet-gen/render/batch.js <jobs.json> [--out <dir>]
 * jobs.json: [{ "type": "K-002", "theme": "animals", "difficulty": 2, "locale": "en" }, ...]
 * Or programmatic: require + runBatch(jobs, opts).
 * Exit non-zero if any job fails QA; prints a summary table.
 */
'use strict';
const path = require('path');
const fs = require('fs');
const puppeteer = require('puppeteer');
const { renderInstance } = require('./render-instance.js');

const TYPE_DIRS = ['k', 'g1', 'g2', 'g3'];
const _typeCache = new Map();

function loadType(typeId) {
  if (_typeCache.has(typeId)) return _typeCache.get(typeId);
  for (const d of TYPE_DIRS) {
    const dir = path.join(__dirname, '..', 'types', d);
    if (!fs.existsSync(dir)) continue;
    for (const f of fs.readdirSync(dir)) {
      if (f.startsWith(typeId + '-') || f === typeId + '.js') {
        const t = require(path.join(dir, f));
        _typeCache.set(typeId, t);
        return t;
      }
    }
  }
  throw new Error('type not found: ' + typeId);
}

async function runBatch(jobs, opts) {
  const outDir = (opts && opts.outDir) || path.join(__dirname, '..', 'out', 'batch');
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  const results = [];
  try {
    for (const job of jobs) {
      const type = loadType(job.type);
      const baseName = `${job.type}-${job.theme}-d${job.difficulty}-${job.locale}`;
      try {
        const out = await renderInstance({
          type, theme: job.theme, difficulty: job.difficulty, locale: job.locale,
          page, outDir, baseName, strings: job.strings, seedEpoch: job.seedEpoch,
        });
        const fails = [...out.qa.lints, ...out.qa.verify];
        results.push({ job, baseName, ok: fails.length === 0, fails, pngPath: out.pngPath });
        console.log((fails.length === 0 ? 'OK  ' : 'FAIL') + ' ' + baseName + (fails.length ? '  ' + fails.join(' | ') : ''));
      } catch (e) {
        results.push({ job, baseName, ok: false, fails: ['EXCEPTION: ' + e.message] });
        console.log('ERR  ' + baseName + '  ' + e.message);
      }
    }
  } finally {
    await browser.close();
  }
  const failed = results.filter((r) => !r.ok);
  console.log(`\n${results.length - failed.length}/${results.length} clean`);
  return results;
}

if (require.main === module) {
  (async () => {
    const jobsFile = process.argv[2];
    const outIdx = process.argv.indexOf('--out');
    const jobs = JSON.parse(fs.readFileSync(jobsFile, 'utf8'));
    const results = await runBatch(jobs, { outDir: outIdx > -1 ? process.argv[outIdx + 1] : undefined });
    process.exitCode = results.some((r) => !r.ok) ? 1 : 0;
  })();
}

module.exports = { runBatch, loadType };
