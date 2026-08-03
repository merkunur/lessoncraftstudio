/* =====================================================================
   shot-tool-wide.js — render a tool at the wide tiers so I can READ it
   ---------------------------------------------------------------------
   Run:
     node scripts/shot-tool-wide.js --tool=money-mat
     node scripts/shot-tool-wide.js --tool=money-mat --locales=de --sizes=2560x1440

   ⭐ WHY THIS EXISTS AS A SCRIPT RATHER THAN AN AD-HOC SNIPPET. The personal
   render read is a step in the definition of done (§A.13.62 for activities,
   the same discipline here), and in this programme it has caught three
   defects that thirty measured assertions passed: rekenrek's hollow bead
   widening, letter-tiles' inert media block, and a sparse board that every
   FILL number called healthy. A step that is re-improvised each time is a
   step that gets skipped when the batch gets long.

   ⚠ IT SHOOTS, IT DOES NOT JUDGE. Nothing here passes or fails. The output
   is a PNG per (locale, size) that a human — me — opens. Anything that could
   be asserted belongs in audit-tool-wide-viewport.js instead.

   ⚠ SERVE THE IMAGE LIBRARY, same reason the probe does: a tool whose
   artwork 404s renders as an empty bench and reads exactly like the sparse
   defect this programme is fixing.
   ===================================================================== */

'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const REPO = path.join(__dirname, '..');
const ROOT = path.join(REPO, 'mini tools');
const PUB = path.join(REPO, 'frontend', 'public');
const OUT = path.join(REPO, 'docs', 'audit-results', 'wide-viewport', 'shots');
const PORT = 5623;

const argv = process.argv.slice(2);
const val = (f) => (argv.find((a) => a.indexOf('--' + f + '=') === 0) || '').split('=')[1];
const KEY = val('tool');
const LOCALES = (val('locales') || 'de').split(',');
const SIZES = (val('sizes') || '1400x880,1920x1080,2560x1440').split(',')
  .map((s) => { const p = s.split('x'); return { w: +p[0], h: +p[1] }; });
if (!KEY) { console.error('usage: node scripts/shot-tool-wide.js --tool=<key> [--locales=de,it] [--sizes=1920x1080]'); process.exit(1); }
if (!fs.existsSync(path.join(ROOT, KEY + '.html'))) { console.error('no such tool: ' + KEY); process.exit(1); }
fs.mkdirSync(OUT, { recursive: true });

const MIME = { '.js': 'application/javascript', '.json': 'application/json', '.css': 'text/css', '.html': 'text/html', '.webp': 'image/webp', '.png': 'image/png', '.svg': 'image/svg+xml' };
const srv = http.createServer((rq, rs) => {
  const u = decodeURIComponent(rq.url.split('?')[0]);
  const fp = u.indexOf('/image-library-webp/') === 0 ? path.join(PUB, u) : path.join(ROOT, u.replace('/mini-tools/', ''));
  if (!fs.existsSync(fp)) { rs.writeHead(404); rs.end('x'); return; }
  rs.writeHead(200, { 'Content-Type': MIME[path.extname(fp)] || 'application/octet-stream' });
  rs.end(fs.readFileSync(fp));
}).listen(PORT);

(async () => {
  const b = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const written = [];
  for (const loc of LOCALES) {
    for (const s of SIZES) {
      const p = await b.newPage();
      await p.setViewport({ width: s.w, height: s.h, deviceScaleFactor: 1 });
      await p.goto(`http://127.0.0.1:${PORT}/${KEY}.html?lang=${loc}`, { waitUntil: 'domcontentloaded', timeout: 25000 });
      await new Promise((r) => setTimeout(r, 1500));
      const f = path.join(OUT, `${KEY}-${loc}-${s.w}x${s.h}.png`);
      await p.screenshot({ path: f });
      written.push(f);
      await p.close();
    }
  }
  await b.close(); srv.close();
  written.forEach((f) => console.log('  ' + f));
})();
