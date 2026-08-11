/* =====================================================================
   scripts/_shp-popshot.js — TOOL #57, visual evidence for D1.
   Freezes the pop and the seat at mid-flight and writes two frames, so
   the motion can be READ rather than taken on the gate's word. Also
   prints the mid-flight transform actually applied to the tag, which is
   the number the keyframe gate is asserting about.
   Usage: node scripts/_shp-popshot.js
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path'), pup = require('puppeteer');
const ROOT = path.join(process.cwd(), 'mini tools');
const OUT = path.join(process.cwd(), 'docs', 'audit-results', 'shape-stretcher');
const MIME = { '.js': 'text/javascript', '.html': 'text/html', '.css': 'text/css', '.json': 'application/json' };

const srv = http.createServer((q, s) => {
  const f = path.join(ROOT, q.url.split('?')[0].replace(/^\/mini-tools/, ''));
  fs.readFile(f, (e, d) => { if (e) { s.writeHead(404); s.end(); } else { s.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'text/plain' }); s.end(d); } });
});

srv.listen(5920, async () => {
  try { fs.mkdirSync(OUT, { recursive: true }); } catch (e) { /* exists */ }
  const b = await pup.launch({ headless: 'new', args: ['--no-sandbox'] });
  const p = await b.newPage();
  await p.setViewport({ width: 760, height: 900 });
  await p.goto('http://localhost:5920/shape-stretcher.html', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 600));

  const frame = async function (kind) {
    const t = await p.evaluate(function (kind) {
      const T = window.ShapeStretcher;
      if (kind === 'pop') { T.st = { n: 4, k: 5, theta: 90, rot: 34, kept: null }; T.render(); T._apply('skew', 88); }
      else { T.st = { n: 4, k: 5, theta: 88, rot: 34, kept: null }; T.render(); T._apply('skew', 90); }
      /* hold every animation at its own midpoint so the frame is stable */
      const sel = kind === 'pop' ? '.shp-ghost .shp-tag.is-pop' : '.shp-live .shp-tag.is-seat';
      const els = Array.prototype.slice.call(document.querySelectorAll(sel));
      let mid = null;
      els.forEach(function (el) {
        (el.getAnimations() || []).forEach(function (a) {
          a.pause();
          a.currentTime = (a.effect.getComputedTiming().duration || 0) / 2;
        });
      });
      if (els.length) mid = getComputedStyle(els[0]).transform;
      return { count: els.length, mid: mid, opacity: els.length ? getComputedStyle(els[0]).opacity : null };
    }, kind);
    await new Promise(r => setTimeout(r, 120));
    await p.screenshot({ path: path.join(OUT, 'motion-' + kind + '.png'), fullPage: false });
    console.log(kind.padEnd(5) + ' elements=' + t.count + '  mid-flight transform=' + t.mid + '  opacity=' + t.opacity);
  };

  await frame('pop');
  await frame('seat');
  console.log('frames -> ' + OUT);
  await b.close(); srv.close();
});
