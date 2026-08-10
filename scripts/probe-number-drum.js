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

   Run: node scripts/probe-number-drum.js
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const ROOT = process.env.NUMBER_DRUM_TOOL_DIR || path.join(__dirname, '..', 'mini tools');
const OUT = path.join(__dirname, '..', 'docs', 'audit-results', 'number-drum', 'qa');
const PORT = 5673;

const srv = http.createServer((rq, rs) => {
  let f = rq.url.split('?')[0].replace('/mini-tools/', '');
  while (f.charAt(0) === '/') f = f.slice(1);
  if (!f) f = 'number-drum.html';
  const fp = path.join(ROOT, f);
  if (!fs.existsSync(fp)) { rs.writeHead(404); rs.end('x'); return; }
  const t = f.endsWith('.js') ? 'application/javascript' : f.endsWith('.json') ? 'application/json'
    : f.endsWith('.css') ? 'text/css' : 'text/html';
  rs.writeHead(200, { 'Content-Type': t }); rs.end(fs.readFileSync(fp));
}).listen(PORT);

/* which numeral is at each ring's window, read from geometry alone */
const READ = () => {
  /* ⚠ DOM order is most-significant FIRST, because that is how a number
     is written. The model indexes the ones as 0. Reversed here so the
     two agree — and stated out loud, because reading index 0 as "the
     ones ring" is exactly the silent convention mismatch that shipped a
     mirrored profile on #44. */
  const rings = [].slice.call(document.querySelectorAll('.ndr-ring')).reverse();
  return rings.map(function (r) {
    const rb = r.getBoundingClientRect();
    const mid = rb.top + rb.height / 2;
    const cells = [].slice.call(r.querySelectorAll('.ndr-cell')).map(function (c) {
      const b = c.getBoundingClientRect();
      return { d: c.textContent, top: b.top, bot: b.bottom, mid: (b.top + b.bottom) / 2,
        tooth: c.className.indexOf('is-tooth') >= 0 };
    });
    /* the numeral AT the window is the one whose box straddles the ring's
       centre line; the one BELOW is the next box down */
    let at = -1, best = 1e9;
    cells.forEach(function (c, i) { const d = Math.abs(c.mid - mid); if (d < best) { best = d; at = i; } });
    /* ⚠ A 2px BAND, not a strict inequality. At exactly half a notch
       the boundary between two cells sits ON the centre line, so
       `top < mid && bot > mid` is false for BOTH of them — the test
       would report "nothing is caught" at precisely the state it exists
       to measure. */
    const straddles = cells.filter(c => c.top < mid + 1 && c.bot > mid - 1).map(c => c.d);
    return {
      at: cells[at] ? cells[at].d : null,
      off: +(Math.abs(cells[at].mid - mid)).toFixed(2),
      below: cells[at + 1] ? cells[at + 1].d : null,
      above: cells[at - 1] ? cells[at - 1].d : null,
      straddles: straddles,
      toothAtWindow: cells.filter(c => c.tooth && c.top < mid + 4 && c.bot > mid - 4).length
    };
  });
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
    await p.goto(`http://127.0.0.1:${PORT}/mini-tools/number-drum.html?lang=en`, { waitUntil: 'domcontentloaded' });
    await new Promise(r => setTimeout(r, 500));

    const open = await p.evaluate(READ);
    if (!open.length) { fails.push(`${c.w}: NO RINGS RENDERED`); await p.close(); continue; }

    /* ⭐ THE ONE CLAIM: 0 is drawn directly under 9, at rest. */
    for (let step = 0; step <= 9; step++) {
      const r = (await p.evaluate(READ))[0];
      checks++;
      if (r.at !== String(step)) fails.push(`${c.w}: ones window shows "${r.at}" at ${step}`);
      if (r.below !== String((step + 1) % 10)) fails.push(`${c.w}: ⭐ below ${step} is "${r.below}", must be ${(step + 1) % 10}`);
      if (r.above !== String((step + 9) % 10)) fails.push(`${c.w}: ⭐ above ${step} is "${r.above}", must be ${(step + 9) % 10}`);
      if (r.off > 2) fails.push(`${c.w}: the numeral at the window is ${r.off}px off centre at ${step}`);
      if (step === 9) await p.screenshot({ path: path.join(OUT, `ring-at-9-${c.w}.png`) });
      if (step < 9) { await p.evaluate(() => document.querySelector('.ndr-b-fwd').click()); await new Promise(r2 => setTimeout(r2, 400)); }
    }

    /* the carry: 9 -> 10, both rings must move and the linkage light */
    await p.evaluate(() => document.querySelector('.ndr-b-fwd').click());
    /* ⚠ SAMPLED INSIDE THE BEAT. T_CATCH is 90ms; at 120ms the beat is
       already over and the links are back to resting, which reads as
       "the linkage never lit". */
    await new Promise(r => setTimeout(r, 45));
    const beat = await p.evaluate(() => ({
      lit: document.querySelectorAll('.ndr-link.is-on').length,
      ones: (document.querySelectorAll('.ndr-ring')[document.querySelectorAll('.ndr-ring').length - 1]
        .querySelector('.ndr-strip')).style.transform
    }));
    await p.screenshot({ path: path.join(OUT, `catch-${c.w}.png`) });
    await new Promise(r => setTimeout(r, 700));
    const after = await p.evaluate(READ);
    checks++;
    if (after[0].at !== '0' || after[1].at !== '1') fails.push(`${c.w}: after the carry the rings read ${after[1].at}${after[0].at}, must be 10`);
    if (!beat.lit) fails.push(`${c.w}: ⚠ the linkage never lit during the beat — the carry reads as magic`);

    /* SLOW: park it mid-catch at 29 and prove BOTH rings straddle */
    await p.evaluate(() => { const T = window.NumberDrum; T.st = { half: 29 * 2, top: T.st.top }; T.render(); });
    await new Promise(r => setTimeout(r, 400));
    await p.evaluate(() => document.querySelector('.ndr-b-slow').click());
    await p.evaluate(() => document.querySelector('.ndr-b-fwd').click());
    await new Promise(r => setTimeout(r, 700));
    const mid = await p.evaluate(READ);
    checks++;
    const bothCaught = mid[0].straddles.length === 2 && mid[1].straddles.length === 2;
    if (!bothCaught) fails.push(`${c.w}: ⭐ mid-catch shows ones=${JSON.stringify(mid[0].straddles)} tens=${JSON.stringify(mid[1].straddles)} — both must straddle`);
    const noReadout = await p.evaluate(() => !/\d/.test(
      [].slice.call(document.querySelectorAll('.ndr-bar, .ndr-frame > :not(.ndr-ring):not(.ndr-link)'))
        .map(n => n.textContent).join('').replace(/[+−-]?10/g, '')));
    if (!noReadout) fails.push(`${c.w}: ⚠ something outside the rings is showing a number — there must be no readout`);
    await p.screenshot({ path: path.join(OUT, `mid-catch-29-${c.w}.png`) });

    console.log(`[${c.w}] rings=${open.length} open="${open.map(r => r.at).join('')}" ` +
      `after-carry="${after.map(r => r.at).join('')}" beatLinks=${beat.lit} ` +
      `midStraddle=[${mid[0].straddles}|${mid[1].straddles}]`);
    await p.close();
  }

  await b.close(); srv.close();
  console.log('\n' + (fails.length ? 'FAIL' : 'PASS') + `  ${checks} render checks, ${fails.length} failures`);
  fails.slice(0, 30).forEach(f => console.log('  ✗ ' + f));
  if (fails.length) process.exit(1);
})();
