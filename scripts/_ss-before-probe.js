#!/usr/bin/env node
/* =====================================================================
   _ss-before-probe.js — THROWAWAY. Measures the BEFORE state of Syllable
   Splitter at the production embed geometry, so the height fix is judged
   against evidence rather than against a table derived from source.

   §23.6: "DO NOT INHERIT THE SIBLING'S DIAGNOSIS ... Measure the specific
   tool." The recorded 422px pin is real for tools that bind
   #lcs-root{height:100%}; this one does not, so the chain has to be
   observed, not assumed.

   Reproduces the real page: iframe 704px wide, INITIAL_HEIGHT 420,
   src ...?embed=1, and the parent listening for lcs-activity-resize
   exactly as ActivityIframe.tsx does.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const IMG = path.join(REPO, 'image-library-webp');
const OUT = path.join(REPO, 'docs', 'audit-results', 'syllable-splitter', 'qa');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };

fs.mkdirSync(OUT, { recursive: true });

function serve() {
  return http.createServer((req, res) => {
    const p = decodeURIComponent(req.url.split('?')[0]);
    let f;
    if (p.startsWith('/mini-tools/')) f = path.join(MINI, p.slice('/mini-tools/'.length));
    else if (p.startsWith('/image-library-webp/')) f = path.join(IMG, p.slice('/image-library-webp/'.length));
    else f = path.join(MINI, p.replace(/^\//, ''));
    fs.readFile(f, (e, b) => {
      if (e) { res.statusCode = 404; return res.end(); }
      res.setHeader('Content-Type', MIME[path.extname(f)] || 'application/octet-stream');
      res.end(b);
    });
  });
}

/* The parent page, reproducing ActivityIframe.tsx: 704px column
   (max-w-3xl minus padding), iframe starts at INITIAL_HEIGHT = 420 and
   only grows when the shell posts a taller height. */
const PARENT = (port) => `<!doctype html><html><head><meta charset="utf-8">
<style>body{margin:0;background:#FBF3E4;font:14px system-ui}
.col{max-width:704px;margin:0 auto;padding:8px}
iframe{width:100%;border:2px dashed #c00;display:block;transition:none}</style></head>
<body><div class="col">
<iframe id="f" src="http://127.0.0.1:${port}/mini-tools/syllable-splitter.html?v=probe&lang=en&embed=1"></iframe>
</div>
<script>
var INITIAL_HEIGHT = 420;
var f = document.getElementById('f');
f.style.height = INITIAL_HEIGHT + 'px';
window.__heights = [INITIAL_HEIGHT];
window.addEventListener('message', function (ev) {
  if (!ev.data || ev.data.type !== 'lcs-activity-resize') return;
  var h = Number(ev.data.height);
  if (!h) return;
  window.__heights.push(h);
  f.style.height = h + 'px';
});
</script></body></html>`;

(async () => {
  const server = serve();
  await new Promise((r) => server.listen(0, r));
  const PORT = server.address().port;
  const parentServer = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.end(PARENT(PORT));
  });
  await new Promise((r) => parentServer.listen(0, r));
  const PPORT = parentServer.address().port;

  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1400 });
  await page.goto(`http://127.0.0.1:${PPORT}/`, { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 2500));

  const heights = await page.evaluate(() => window.__heights);
  const frameBox = await page.$eval('#f', (el) => {
    const r = el.getBoundingClientRect();
    return { w: Math.round(r.width), h: Math.round(r.height) };
  });

  const frame = page.frames().find((fr) => fr.url().includes('syllable-splitter.html'));
  const inner = await frame.evaluate(() => {
    const q = (s) => document.querySelector(s);
    const box = (s) => {
      const e = q(s);
      if (!e) return null;
      const r = e.getBoundingClientRect();
      return { top: Math.round(r.top), bottom: Math.round(r.bottom), h: Math.round(r.height), w: Math.round(r.width) };
    };
    const app = q('.lcs-app');
    const cs = app ? getComputedStyle(app) : null;
    const bodyCs = getComputedStyle(document.body);
    return {
      viewport: { w: window.innerWidth, h: window.innerHeight },
      bodyOverflowY: bodyCs.overflowY,
      bodyHeight: Math.round(document.body.getBoundingClientRect().height),
      appHasActivityClass: app ? app.classList.contains('activity') : null,
      appComputedHeight: cs ? cs.height : null,
      appOverflow: cs ? cs.overflow : null,
      appScrollHeight: app ? app.scrollHeight : null,
      appClientHeight: app ? app.clientHeight : null,
      wrapScrollHeight: q('.ss-wrap') ? q('.ss-wrap').scrollHeight : null,
      controls: {
        toprow: box('.ss-toprow'),
        card: box('.ss-card'),
        pic: box('.ss-pic'),
        word: box('.ss-wordrow'),
        speak: box('.ss-speak'),
        drum: box('.ss-drum'),
        again: box('.ss-again'),
        nav: box('.ss-nav'),
      },
    };
  });

  console.log('\n=== BEFORE — production embed geometry (704px column, INITIAL_HEIGHT 420) ===');
  console.log('heights posted by the shell to the parent:', JSON.stringify(heights));
  console.log('final iframe element box:', JSON.stringify(frameBox));
  console.log('\ninside the iframe:');
  console.log('  viewport            ', JSON.stringify(inner.viewport));
  console.log('  .lcs-app .activity? ', inner.appHasActivityClass, '  (false => height:100% never escaped)');
  console.log('  .lcs-app height     ', inner.appComputedHeight, ' overflow:', inner.appOverflow);
  console.log('  .lcs-app client/scroll', inner.appClientHeight, '/', inner.appScrollHeight);
  console.log('  body overflow-y     ', inner.bodyOverflowY);
  console.log('  .ss-wrap scrollHeight', inner.wrapScrollHeight);

  const VH = inner.viewport.h;
  console.log('\n  control bottoms vs the clip line (' + VH + 'px):');
  let clipped = [];
  for (const [k, v] of Object.entries(inner.controls)) {
    if (!v) { console.log(`    ${k.padEnd(8)} — ABSENT`); continue; }
    const state = v.bottom > VH ? 'BELOW THE FOLD' : 'visible';
    if (v.bottom > VH) clipped.push(k);
    console.log(`    ${k.padEnd(8)} top=${String(v.top).padStart(4)} bottom=${String(v.bottom).padStart(4)}  ${state}`);
  }
  console.log('\n  CLIPPED CONTROLS: ' + (clipped.length ? clipped.join(', ') : 'none'));
  console.log('  overflow beyond the clip line: ' + Math.max(0, inner.wrapScrollHeight - VH) + 'px');

  await page.screenshot({ path: path.join(OUT, 'BEFORE-embed-704.png') });
  console.log('\n  shot: docs/audit-results/syllable-splitter/qa/BEFORE-embed-704.png');

  await browser.close();
  server.close();
  parentServer.close();
})().catch((e) => { console.error(e); process.exit(1); });
