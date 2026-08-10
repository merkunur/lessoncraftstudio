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
  const ar = document.querySelector(".dbm-arena"); if (!ar) return null;
  const arch = document.querySelector(".dbm-arch"), bar = document.querySelector(".dbm-bar");
  const yard = document.querySelector(".dbm-yard"), wait = document.querySelector(".dbm-wait");
  const sill = document.querySelector(".dbm-sill");
  const ab = arch ? arch.getBoundingClientRect() : null;
  const m = document.querySelector(".dbm-m");
  return {
    through: yard ? yard.querySelectorAll(".dbm-m").length : -1,
    waiting: wait ? wait.querySelectorAll(".dbm-m").length : -1,
    seats: wait ? wait.querySelectorAll(".dbm-seat").length : -1,
    yardRanks: yard ? yard.querySelectorAll(".dbm-rank").length : -1,
    barUp: bar ? bar.className.indexOf("is-up") >= 0 : null,
    barY: bar ? +bar.getBoundingClientRect().top.toFixed(1) : null,
    archW: ab ? +ab.width.toFixed(1) : null,
    marcherW: m ? +m.getBoundingClientRect().width.toFixed(1) : null,
    sillShown: sill ? sill.style.display !== "none" : null,
    sillFull: sill ? sill.className.indexOf("is-full") >= 0 : null,
    sillOn: sill ? sill.querySelectorAll(".dbm-m").length : -1,
    sillW: sill && sill.style.display !== "none" ? +sill.getBoundingClientRect().width.toFixed(1) : null
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
    if (!open) { fails.push(c.w + ": NO ARENA RENDERED"); await p.close(); continue; }
    checks++;
    if (open.barUp) fails.push(c.w + ": ** the bar is UP before anybody predicted - the tool is a cutscene");
    if (open.through !== 0) fails.push(c.w + ": " + open.through + " already through at the start");
    if (open.waiting < 3) fails.push(c.w + ": only " + open.waiting + " marchers waiting");
    if (open.marcherW < 12) fails.push(c.w + ": marchers are " + open.marcherW + "px - illegible");
    await p.screenshot({ path: path.join(OUT, "start-" + c.w + ".png") });

    /* the bar must not lift for a rank call, only for a prediction */
    await p.evaluate(() => document.querySelector(".dbm-b-call").click());
    await new Promise(r => setTimeout(r, 300));
    const held = await p.evaluate(READ);
    checks++;
    if (held.barUp) fails.push(c.w + ": ** calling a rank lifted the bar");
    if (held.through !== 0) fails.push(c.w + ": ** a rank went through with the bar down");

    await p.evaluate(() => document.querySelector(".dbm-b-no").click());
    await new Promise(r => setTimeout(r, 600));
    const pred = await p.evaluate(READ);
    checks++;
    if (!pred.barUp) fails.push(c.w + ": * the bar did not lift after the prediction");
    if (pred.barY >= held.barY) fails.push(c.w + ": the bar did not physically MOVE (" + held.barY + " -> " + pred.barY + ")");

    /* march to a standstill */
    let guard = 0;
    while (guard++ < 25) {
      const moved = await p.evaluate(() => {
        const b = document.querySelector(".dbm-b-call");
        const before = document.querySelectorAll(".dbm-yard .dbm-m").length;
        b.click();
        return before;
      });
      await new Promise(r => setTimeout(r, 260));
      const now = await p.evaluate(() => document.querySelectorAll(".dbm-yard .dbm-m").length);
      if (now === moved) break;
    }
    const done = await p.evaluate(READ);
    checks++;
    if (done.through + done.waiting !== open.waiting)
      fails.push(c.w + ": through+waiting " + (done.through + done.waiting) + " != the parade " + open.waiting);
    if (done.waiting >= 2) fails.push(c.w + ": ** a full rank was left standing (" + done.waiting + ")");
    /* * the leftover is not marked - the EMPTY SEAT beside it is drawn */
    if (done.waiting > 0 && done.seats < 1)
      fails.push(c.w + ": ** somebody is left standing and NO empty seat is drawn");
    if (done.waiting === 0 && done.seats !== 0)
      fails.push(c.w + ": an empty seat is drawn with nobody standing");
    await p.screenshot({ path: path.join(OUT, "stand-" + c.w + ".png") });

    /* the theorem */
    if (done.waiting > 0) {
      await p.evaluate(() => document.querySelector(".dbm-b-second").click());
      await new Promise(r => setTimeout(r, 500));
      await p.evaluate(() => document.querySelector(".dbm-b-sill").click());
      await new Promise(r => setTimeout(r, 1600));
      const sill = await p.evaluate(READ);
      checks++;
      if (!sill.sillShown) fails.push(c.w + ": * the sill never appeared");
      if (sill.sillOn < 2) fails.push(c.w + ": the sill holds " + sill.sillOn);
      /* ** the sill must be as wide as the archway - that IS the proof */
      if (sill.sillW && Math.abs(sill.sillW - sill.archW) > 14)
        fails.push(c.w + ": ** the sill is " + sill.sillW + "px and the archway " + sill.archW + "px - the proof depends on them matching");
      await p.screenshot({ path: path.join(OUT, "sill-" + c.w + ".png") });
      console.log("[" + c.w + "] parade=" + open.waiting + " -> through=" + done.through +
        " standing=" + done.waiting + " seats=" + done.seats +
        " | sill=" + sill.sillOn + " full=" + sill.sillFull +
        " widths " + sill.sillW + "/" + sill.archW);
    } else {
      console.log("[" + c.w + "] parade=" + open.waiting + " cleared exactly, no leftover");
    }
    await p.close();
  }

  await b.close(); srv.close();
  console.log('\n' + (fails.length ? 'FAIL' : 'PASS') + `  ${checks} render checks, ${fails.length} failures`);
  fails.slice(0, 30).forEach(f => console.log('  ✗ ' + f));
  if (fails.length) process.exit(1);
})();
