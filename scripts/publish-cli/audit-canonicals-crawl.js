#!/usr/bin/env node
/*
 * audit-canonicals-crawl.js — read-only LIVE canonical crawl over the sitemap.
 *
 * Fetches the sitemap index + all shards from the LOCAL nginx origin (bypassing
 * Cloudflare via `curl --resolve <host>:443:<ip>`), then for every URL asserts:
 *   (1) HTTP 200
 *   (2) a <link rel="canonical"> is present
 *   (3) canonical === the requested URL (self-referential — the sitemap must
 *       only ever list canonical URLs)
 * Buckets + reports defects. Deck shards (…/0.xml, …/1.xml) are SAMPLED
 * (their deck.html canonical is FS-audited in full by audit-deck-html.js);
 * Next-route shards (topics / intersections / activities / tools / standards /
 * landings) are crawled in FULL.
 *
 * Usage (run on Hetzner):
 *   node scripts/publish-cli/audit-canonicals-crawl.js \
 *     [--host=www.lessoncraftstudio.com] [--ip=127.0.0.1] \
 *     [--deck-sample=1000] [--concurrency=24] [--out-dir=docs/audit-results]
 *
 * Read-only: no DB, no FS mutation except the JSON+md report under --out-dir.
 */
'use strict';
const { execFile } = require('child_process');
const fs = require('fs');
const path = require('path');

function parseArgs(argv) {
  const out = { host: 'www.lessoncraftstudio.com', ip: '127.0.0.1', deckSample: 1000, concurrency: 24, outDir: path.resolve('docs/audit-results') };
  argv.slice(2).forEach(function (a) {
    if (a.indexOf('--host=') === 0) out.host = a.slice(7);
    else if (a.indexOf('--ip=') === 0) out.ip = a.slice(5);
    else if (a.indexOf('--deck-sample=') === 0) out.deckSample = parseInt(a.slice(14), 10);
    else if (a.indexOf('--concurrency=') === 0) out.concurrency = parseInt(a.slice(14), 10);
    else if (a.indexOf('--out-dir=') === 0) out.outDir = path.resolve(a.slice(10));
    else if (a === '--help') { console.log('Usage: node audit-canonicals-crawl.js [--host=] [--ip=] [--deck-sample=N] [--concurrency=N] [--out-dir=]'); process.exit(0); }
  });
  return out;
}

function curl(url, host, ip) {
  return new Promise(function (resolve) {
    execFile('curl', ['-s', '-o', '-', '-w', '\n@@@%{http_code}', '--resolve', host + ':443:' + ip, '--max-time', '25', url],
      { maxBuffer: 1024 * 1024 * 16 }, function (err, stdout) {
        var s = stdout || '';
        var i = s.lastIndexOf('\n@@@');
        if (i < 0) { resolve({ status: 0, body: s }); return; }
        var code = parseInt(s.slice(i + 4).trim(), 10) || 0;
        resolve({ status: code, body: s.slice(0, i) });
      });
  });
}

// Memory-flat per-URL probe: pipe curl through grep on the shell so the full
// HTML body never enters the node heap — only the canonical line + status code
// come back. (Buffering 8k+ large SSR pages in node OOMs.)
function probe(url, host, ip) {
  return new Promise(function (resolve) {
    var safe = "'" + String(url).replace(/'/g, "'\\''") + "'";
    var cmd = 'curl -s --resolve ' + host + ':443:' + ip + ' --max-time 25 -w "\\nHTTPSTATUS:%{http_code}" ' + safe +
      ' | grep -aoiE \'rel="canonical" href="[^"]*"|HTTPSTATUS:[0-9]+\' | head -3';
    execFile('bash', ['-c', cmd], { maxBuffer: 1 << 20 }, function (err, stdout) {
      var status = 0, canon = null;
      (stdout || '').split('\n').forEach(function (line) {
        var ms = /HTTPSTATUS:([0-9]+)/i.exec(line);
        if (ms) status = parseInt(ms[1], 10);
        else if (/canonical/i.test(line)) { var mc = /href="([^"]+)"/i.exec(line); if (mc) canon = mc[1].trim(); }
      });
      resolve({ status: status, canonical: canon });
    });
  });
}

function extractLocs(xml) {
  var re = /<loc>([^<]+)<\/loc>/g, m, out = [];
  while ((m = re.exec(xml))) out.push(m[1].replace(/&amp;/g, '&').trim());
  return out;
}
function extractCanonical(html) {
  var m = /<link[^>]+rel=["']canonical["'][^>]*?href=["']([^"']+)["']/i.exec(html);
  if (!m) m = /<link[^>]+href=["']([^"']+)["'][^>]*?rel=["']canonical["']/i.exec(html);
  return m ? m[1].trim() : null;
}

async function mapLimit(items, limit, fn) {
  const res = new Array(items.length);
  let next = 0;
  async function worker() {
    while (next < items.length) {
      const i = next++;
      res[i] = await fn(items[i], i);
    }
  }
  const workers = [];
  for (let w = 0; w < Math.min(limit, items.length); w++) workers.push(worker());
  await Promise.all(workers);
  return res;
}

// Deterministic sample (no Math.random — stable across runs): take every Nth.
function sample(arr, n) {
  if (arr.length <= n) return arr.slice();
  const step = arr.length / n, out = [];
  for (let i = 0; i < n; i++) out.push(arr[Math.floor(i * step)]);
  return out;
}

(async function () {
  const args = parseArgs(process.argv);
  const base = 'https://' + args.host;
  console.log('[crawl] sitemap index: ' + base + '/sitemap.xml');
  const idx = await curl(base + '/sitemap.xml', args.host, args.ip);
  if (idx.status !== 200) { console.error('FATAL: sitemap.xml -> ' + idx.status); process.exit(1); }
  const shardUrls = extractLocs(idx.body);
  console.log('[crawl] shards: ' + JSON.stringify(shardUrls));

  let deckUrls = [], routeUrls = [];
  for (const su of shardUrls) {
    const sh = await curl(su, args.host, args.ip);
    if (sh.status !== 200) { console.error('  shard ' + su + ' -> ' + sh.status + ' (skipped)'); continue; }
    const locs = extractLocs(sh.body);
    const isDeckShard = /\/(0|1)\.xml(\?|$)/.test(su);
    console.log('  ' + su + ': ' + locs.length + ' urls' + (isDeckShard ? ' [deck shard → sampled]' : ' [route shard → full]'));
    if (isDeckShard) deckUrls = deckUrls.concat(locs);
    else routeUrls = routeUrls.concat(locs);
  }

  const deckSample = sample(deckUrls, args.deckSample);
  const targets = routeUrls.concat(deckSample);
  console.log('[crawl] crawling ' + targets.length + ' urls (' + routeUrls.length + ' route + ' + deckSample.length + ' deck-sample of ' + deckUrls.length + ') concurrency=' + args.concurrency);

  let done = 0;
  const results = await mapLimit(targets, args.concurrency, async function (url) {
    const r = await probe(url, args.host, args.ip);
    done++;
    if (done % 1000 === 0) console.log('  progress ' + done + '/' + targets.length);
    const out = { url: url, status: r.status, defects: [] };
    if (r.status !== 200) { out.defects.push('NON_200:' + r.status); return out; }
    if (!r.canonical) { out.defects.push('MISSING_CANONICAL'); return out; }
    out.canonical = r.canonical;
    if (r.canonical !== url) {
      if (r.canonical.indexOf('http://') === 0) out.defects.push('CANONICAL_SCHEME_HTTP');
      else if (r.canonical.indexOf('https://lessoncraftstudio.com/') === 0) out.defects.push('CANONICAL_APEX');
      else out.defects.push('CANONICAL_NOT_SELF');
    }
    return out;
  });

  const buckets = {};
  const examples = {};
  let clean = 0;
  for (const r of results) {
    if (!r.defects.length) { clean++; continue; }
    for (const d of r.defects) {
      const key = d.split(':')[0];
      buckets[key] = (buckets[key] || 0) + 1;
      if (!examples[key]) examples[key] = [];
      if (examples[key].length < 8) examples[key].push({ url: r.url, status: r.status, canonical: r.canonical, defect: d });
    }
  }

  const stamp = new Date().toISOString().replace(/[-:T]/g, '').slice(0, 14);
  if (!fs.existsSync(args.outDir)) fs.mkdirSync(args.outDir, { recursive: true });
  const jsonOut = path.join(args.outDir, 'canonical-crawl-' + stamp + '.json');
  fs.writeFileSync(jsonOut, JSON.stringify({ crawled: targets.length, clean: clean, buckets: buckets, examples: examples, deckTotal: deckUrls.length, routeTotal: routeUrls.length }, null, 2));

  console.log('\n=== CANONICAL CRAWL SUMMARY ===');
  console.log('crawled: ' + targets.length + '  (route: ' + routeUrls.length + ' full, deck: ' + deckSample.length + ' sample of ' + deckUrls.length + ')');
  console.log('clean (200 + self-canonical): ' + clean);
  const keys = Object.keys(buckets);
  if (!keys.length) console.log('DEFECTS: NONE');
  else {
    console.log('DEFECTS:');
    keys.forEach(function (k) {
      console.log('  ' + k + ': ' + buckets[k]);
      examples[k].forEach(function (e) { console.log('     - [' + e.status + '] ' + e.url + (e.canonical ? '  canon=' + e.canonical : '')); });
    });
  }
  console.log('report: ' + jsonOut);
  process.exit(keys.length ? 1 : 0);
})();
