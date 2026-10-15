#!/usr/bin/env node
/* =====================================================================
   snap-mini-tools.js — deterministic before/after renders of mini tools.
   ---------------------------------------------------------------------
   Serves `mini tools/` + `image-library-webp/` locally (the same server
   shape as visual-qa-activity.js), renders each page at the given widths
   with reduced motion, and writes <out>/<name>-<w>.png plus
   <out>/manifest.json carrying an md5 per shot. `--compare=<dirA>,<dirB>`
   diffs the md5s of two runs and prints CHANGED / SAME per shot — the
   Phase-1 shell-lift proof that a change scoped to `.lcs-app.activity`
   left every manipulative tool byte-identical (plan: activities → tool
   bar, 2026-10-15).

   Pages file: one entry per line —
     tool:<stem>              → /<stem>.html?lang=<loc>&embed=1
     activity:<manifest id>   → wrapper resolved from *-activities.json
   Usage:
     node scripts/snap-mini-tools.js --pages=<file> --out=<dir> [--widths=360,704,1024] [--locale=en]
     node scripts/snap-mini-tools.js --compare=<dirA>,<dirB>
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path'), crypto = require('crypto');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const IMG = path.join(REPO, 'image-library-webp');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.mp3': 'audio/mpeg' };
const HEIGHT_FOR = (w) => (w <= 400 ? 740 : 900);

if (arg('compare')) {
  const parts = arg('compare').split(',');
  const A = JSON.parse(fs.readFileSync(path.join(parts[0], 'manifest.json'), 'utf8'));
  const B = JSON.parse(fs.readFileSync(path.join(parts[1], 'manifest.json'), 'utf8'));
  let changed = 0, same = 0, missing = 0;
  for (const k of Object.keys(A)) {
    if (!(k in B)) { missing++; console.log('MISSING ' + k); continue; }
    if (A[k] === B[k]) { same++; } else { changed++; console.log('CHANGED ' + k); }
  }
  console.log('same=' + same + ' changed=' + changed + ' missing=' + missing);
  process.exit(changed || missing ? 1 : 0);
}

function serve() {
  return http.createServer((req, res) => {
    let p = decodeURIComponent(req.url.split('?')[0]), file;
    if (p === '/' || p.endsWith('.html')) file = path.join(MINI, path.basename(p) || 'index.html');
    else if (p.startsWith('/mini-tools/')) file = path.join(MINI, p.slice('/mini-tools/'.length));
    else if (p.startsWith('/image-library-webp/')) file = path.join(IMG, p.slice('/image-library-webp/'.length));
    else file = path.join(MINI, p.replace(/^\//, ''));
    fs.readFile(file, (err, buf) => {
      if (err) { res.statusCode = 404; res.end('not found'); return; }
      res.setHeader('Content-Type', MIME[path.extname(file)] || 'application/octet-stream');
      res.end(buf);
    });
  });
}
function resolveActivity(id) {
  for (const f of fs.readdirSync(MINI).filter(f => f.endsWith('-activities.json'))) {
    let rows; try { rows = JSON.parse(fs.readFileSync(path.join(MINI, f), 'utf8')); } catch (e) { continue; }
    if (!Array.isArray(rows)) continue;
    const row = rows.find(r => r.id === id);
    if (row) return row.tool + '.html';
  }
  throw new Error('activity not found: ' + id);
}

(async () => {
  const pagesFile = arg('pages'), out = arg('out'), loc = arg('locale', 'en');
  const widths = arg('widths', '360,704,1024').split(',').map(Number);
  if (!pagesFile || !out) { console.error('need --pages and --out'); process.exit(2); }
  fs.mkdirSync(out, { recursive: true });
  const entries = fs.readFileSync(pagesFile, 'utf8').split(/\r?\n/).map(s => s.trim()).filter(Boolean);
  const pages = entries.map(e => {
    const i = e.indexOf(':'), kind = e.slice(0, i), rest = e.slice(i + 1);
    if (kind === 'tool') return { name: rest, url: '/' + rest + '.html?lang=' + loc + '&embed=1' };
    if (kind === 'activity') return { name: rest, url: '/' + resolveActivity(rest) + '?activity=' + encodeURIComponent(rest) + '&lang=' + loc + '&embed=1' };
    throw new Error('bad entry ' + e);
  });
  const server = serve(); await new Promise(r => server.listen(0, '127.0.0.1', r));
  const base = 'http://127.0.0.1:' + server.address().port;
  const puppeteer = require('puppeteer');
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  const manifest = {};
  for (const pg of pages) {
    for (const w of widths) {
      const page = await browser.newPage();
      await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
      await page.setViewport({ width: w, height: HEIGHT_FOR(w), deviceScaleFactor: 1 });
      const errs = [];
      page.on('pageerror', e => errs.push(String(e)));
      await page.goto(base + pg.url, { waitUntil: 'networkidle0', timeout: 60000 });
      await page.evaluate(() => document.fonts && document.fonts.ready);
      await new Promise(r => setTimeout(r, 700));
      const h = await page.evaluate(() => { const a = document.querySelector('.lcs-app'); return a ? Math.ceil(a.getBoundingClientRect().bottom) + 8 : document.body.scrollHeight; });
      const file = path.join(out, pg.name.replace(/[^a-z0-9.-]+/gi, '_') + '-' + w + '.png');
      await page.screenshot({ path: file, clip: { x: 0, y: 0, width: w, height: Math.max(200, Math.min(h, 4000)) } });
      const md5 = crypto.createHash('md5').update(fs.readFileSync(file)).digest('hex');
      manifest[pg.name + '@' + w] = md5;
      console.log(pg.name + '@' + w + ' h=' + h + ' ' + md5.slice(0, 8) + (errs.length ? ' ERR:' + errs[0].slice(0, 80) : ''));
      await page.close();
    }
  }
  fs.writeFileSync(path.join(out, 'manifest.json'), JSON.stringify(manifest, null, 1));
  await browser.close(); server.close();
})().catch(e => { console.error(e); process.exit(1); });
