/* =====================================================================
   RENDER PROBE — TOOL #50, THE NUMBER DRUM
   =====================================================================
   ⚠⚠ THE ORACLE HERE MUST NOT SHARE THE TOOL'S CONVENTION. #44 shipped
   a mirrored profile because the check counted cubes in the same index
   order the renderer drew them, and both sides carried the identical
   bug and agreed perfectly. So this asks the question IN PIXELS: which
   numeral's box actually overlaps the window band, and which numeral's
   box sits directly beneath it — measured from getBoundingClientRect,
   never from a strip index.

   Run: node scripts/probe-doubling-mirror.js
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const ROOT = process.env.DOUBLING_MIRROR_TOOL_DIR || path.join(__dirname, '..', 'mini tools');
const OUT = path.join(__dirname, '..', 'docs', 'audit-results', 'doubling-mirror', 'qa');
const PORT = 5681;

const srv = http.createServer((rq, rs) => {
  let f = rq.url.split('?')[0].replace('/mini-tools/', '');
  while (f.charAt(0) === '/') f = f.slice(1);
  if (!f) f = 'doubling-mirror.html';
  const fp = path.join(ROOT, f);
  if (!fs.existsSync(fp)) { rs.writeHead(404); rs.end('x'); return; }
  const t = f.endsWith('.js') ? 'application/javascript' : f.endsWith('.json') ? 'application/json'
    : f.endsWith('.css') ? 'text/css' : 'text/html';
  rs.writeHead(200, { 'Content-Type': t }); rs.end(fs.readFileSync(fp));
}).listen(PORT);

/* Read the apparatus in PIXELS. The oracle must not share the
   renderer's convention (#44 shipped a mirrored profile that way). */
const READ = () => {
  const tray = document.querySelector(".dbm-tray"); if (!tray) return null;
  const near = document.querySelector(".dbm-near"), far = document.querySelector(".dbm-far");
  const odd = document.querySelector(".dbm-odd"), hinge = document.querySelector(".dbm-hinge");
  const nb = near.getBoundingClientRect(), fb = far.getBoundingClientRect();
  const d = document.querySelector(".dbm-c");
  return {
    near: near.querySelectorAll(".dbm-c").length,
    far: far.querySelectorAll(".dbm-c").length,
    odd: odd.querySelectorAll(".dbm-c").length,
    oddShown: odd.style.visibility !== "hidden",
    farShown: far.style.visibility !== "hidden",
    closed: tray.className.indexOf("is-closed") >= 0,
    discW: d ? +d.getBoundingClientRect().width.toFixed(1) : null,
    /* the two leaves must be drawn IDENTICALLY - nothing about a counter
       ever says which leaf it is on */
    sameH: Math.abs(nb.height - fb.height) < 1.5,
    hingeW: hinge ? +hinge.getBoundingClientRect().width.toFixed(1) : null
  };
};

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const b = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const fails = [];
  let checks = 0;

  for (const c of [{ w: 360, h: 800 }, { w: 704, h: 900 }, { w: 768, h: 1024 }, { w: 1024, h: 900 }]) {
    const p = await b.newPage();
    p.on('pageerror', e => fails.push(`${c.w}: page error ${e.message}`));
    await p.setViewport({ width: c.w, height: c.h });
    await p.goto(`http://127.0.0.1:${PORT}/mini-tools/doubling-mirror.html?lang=en`, { waitUntil: 'domcontentloaded' });
    await new Promise(r => setTimeout(r, 500));

    const open = await p.evaluate(READ);
    if (!open) { fails.push(c.w + ": NO TRAY RENDERED"); await p.close(); continue; }
    checks++;
    if (open.closed) fails.push(c.w + ": the tray starts closed");
    if (open.farShown) fails.push(c.w + ": ** the far leaf is showing counters before the hinge closed");
    if (open.near < 1) fails.push(c.w + ": the near leaf is empty at rest");
    if (open.discW < 12) fails.push(c.w + ": discs are " + open.discW + "px - under the 12px honest floor");
    await p.screenshot({ path: path.join(OUT, "open-" + c.w + ".png") });

    /* close: the far leaf must receive the SAME number of REAL counters */
    await p.evaluate(() => document.querySelector(".dbm-b-close").click());
    await new Promise(r => setTimeout(r, 900));
    const cl = await p.evaluate(READ);
    checks++;
    if (cl.far !== cl.near) fails.push(c.w + ": ** far " + cl.far + " != near " + cl.near);
    if (cl.far !== open.near) fails.push(c.w + ": the far leaf holds " + cl.far + ", the near leaf had " + open.near);
    if (!cl.closed) fails.push(c.w + ": the tray is not drawn closed");
    if (!cl.sameH) fails.push(c.w + ": ** the two leaves are drawn differently - a counter must never say which leaf it is on");
    await p.screenshot({ path: path.join(OUT, "closed-" + c.w + ".png") });

    /* ** the ODD case must NOT stall: nine opens to a waiting one, and
       either side resolves it */
    await p.evaluate(() => { const T = window.DoublingMirror; T.st = T.open(T.st, 9); T.render(); });
    await new Promise(r => setTimeout(r, 500));
    const od = await p.evaluate(READ);
    checks++;
    if (!od.oddShown || od.odd !== 1) fails.push(c.w + ": ** nine did not leave exactly one waiting (odd=" + od.odd + ")");
    if (od.near !== 4 || od.far !== 4) fails.push(c.w + ": nine split into " + od.near + " and " + od.far + ", expected 4 and 4");
    await p.screenshot({ path: path.join(OUT, "odd-" + c.w + ".png") });

    await p.evaluate(() => document.querySelector(".dbm-b-low").click());
    await new Promise(r => setTimeout(r, 600));
    const sd = await p.evaluate(READ);
    checks++;
    if (sd.oddShown) fails.push(c.w + ": ** still waiting after the class chose a side - the apparatus stalled");
    if (sd.near + sd.far !== 9) fails.push(c.w + ": ** the tray now holds " + (sd.near + sd.far) + ", not nine");
    if (Math.abs(sd.near - sd.far) !== 1) fails.push(c.w + ": the leaves differ by " + Math.abs(sd.near - sd.far));
    if (sd.near !== 5) fails.push(c.w + ": the odd one went to the wrong leaf (near=" + sd.near + ")");
    await p.screenshot({ path: path.join(OUT, "sided-" + c.w + ".png") });

    console.log("[" + c.w + "] " + open.near + " -> closed " + cl.near + "+" + cl.far +
      " | nine -> " + od.near + "+" + od.far + " and one waiting -> " + sd.near + "+" + sd.far +
      " | disc " + open.discW + "px");
    await p.close();
  }

  await b.close(); srv.close();
  console.log('\n' + (fails.length ? 'FAIL' : 'PASS') + `  ${checks} render checks, ${fails.length} failures`);
  fails.slice(0, 30).forEach(f => console.log('  ✗ ' + f));
  if (fails.length) process.exit(1);
})();
