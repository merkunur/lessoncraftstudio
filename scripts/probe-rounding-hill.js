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

   Run: node scripts/probe-rounding-hill.js
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const ROOT = process.env.ROUNDING_HILL_TOOL_DIR || path.join(__dirname, '..', 'mini tools');
const OUT = path.join(__dirname, '..', 'docs', 'audit-results', 'rounding-hill', 'qa');
const PORT = 5677;

const srv = http.createServer((rq, rs) => {
  let f = rq.url.split('?')[0].replace('/mini-tools/', '');
  while (f.charAt(0) === '/') f = f.slice(1);
  if (!f) f = 'rounding-hill.html';
  const fp = path.join(ROOT, f);
  if (!fs.existsSync(fp)) { rs.writeHead(404); rs.end('x'); return; }
  const t = f.endsWith('.js') ? 'application/javascript' : f.endsWith('.json') ? 'application/json'
    : f.endsWith('.css') ? 'text/css' : 'text/html';
  rs.writeHead(200, { 'Content-Type': t }); rs.end(fs.readFileSync(fp));
}).listen(PORT);

/* Read the apparatus in PIXELS. ⚠ The oracle must not share the
   renderer|s convention (#44 shipped a mirrored profile that way), so
   this asks where each drawn thing actually IS relative to the ground. */
const READ = () => {
  const ar = document.querySelector(".rnh-field") || document.querySelector(".rnh-arena"); if (!ar) return null;
  const ab = ar.getBoundingClientRect();
  const fx = el => el ? +(((el.getBoundingClientRect().left + el.getBoundingClientRect().width/2) - ab.left)/ab.width).toFixed(3) : null;
  const st = document.querySelector(".rnh-stone");
  const rg = document.querySelector(".rnh-ridge");
  const sb = st ? st.getBoundingClientRect() : null;
  return {
    stoneX: fx(st), stoneTxt: st ? st.textContent : null,
    stoneBottom: sb ? +((ab.bottom - sb.bottom)/ab.height).toFixed(3) : null,
    ridgeX: fx(rg), ridgeSet: rg ? rg.className.indexOf("is-set") >= 0 : null,
    ridgeRot: rg ? (rg.style.transform || "") : null,
    teeter: st ? st.className.indexOf("is-teeter") >= 0 : null,
    rest: st ? st.className.indexOf("is-rest") >= 0 : null,
    marks: [].slice.call(document.querySelectorAll(".rnh-mark")).map(e => e.textContent),
    groundD: (document.querySelector(".rnh-ground")||{}).getAttribute ? document.querySelector(".rnh-ground").getAttribute("d").length : 0
  };
};
(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const b = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const fails = [];
  let checks = 0;

  for (const c of [{ w: 320, h: 800 }, { w: 360, h: 800 }, { w: 412, h: 900 }, { w: 704, h: 900 }, { w: 768, h: 1024 }, { w: 1024, h: 900 }]) {
    const p = await b.newPage();
    p.on('pageerror', e => fails.push(`${c.w}: page error ${e.message}`));
    await p.setViewport({ width: c.w, height: c.h });
    await p.goto(`http://127.0.0.1:${PORT}/mini-tools/rounding-hill.html?lang=en`, { waitUntil: 'domcontentloaded' });
    await new Promise(r => setTimeout(r, 500));

    const open = await p.evaluate(READ);
    if (!open) { fails.push(c.w + ": NO GROUND RENDERED"); await p.close(); continue; }
    const near = (a,b,t) => Math.abs(a-b) <= (t||0.02);
    checks++;
    if (open.marks.join("/") !== "40/50") fails.push(c.w + ": the dips read " + open.marks.join("/"));
    if (!near(open.ridgeX, 0.5)) fails.push(c.w + ": the ridge is at " + open.ridgeX + ", not halfway");
    if (open.ridgeSet) fails.push(c.w + ": the ridge starts already settled");
    if (open.groundD < 200) fails.push(c.w + ": the ground path is " + open.groundD + " chars — it did not draw");
    if (open.stoneTxt !== "47") fails.push(c.w + ": the stone reads " + open.stoneTxt);
    if (!near(open.stoneX, 0.7, 0.03)) fails.push(c.w + ": the stone at 47 is drawn at " + open.stoneX);

    /* ⚠ THE 12-BUTTON BAR — now carrying the two ground-shift arrows —
       must stay tappable and must not run off the width at ANY viewport.
       The bar is flex-wrap, so overflow is measured against the window,
       and every button against the 44px tap floor. */
    const bar = await p.evaluate(() => {
      const btns = [].slice.call(document.querySelectorAll('.rnh-btn'));
      const small = btns.filter(b => { const r = b.getBoundingClientRect(); return r.width < 44 || r.height < 44; }).length;
      const spill = btns.filter(b => { const r = b.getBoundingClientRect(); return r.right > window.innerWidth + 0.5 || r.left < -0.5; }).length;
      return { n: btns.length, small: small, spill: spill,
        hasGd: !!document.querySelector('.rnh-b-gd'), hasGu: !!document.querySelector('.rnh-b-gu') };
    });
    checks++;
    if (!bar.hasGd || !bar.hasGu) fails.push(c.w + ": ⚠ the ground-shift arrows are missing from the bar");
    if (bar.n < 12) fails.push(c.w + ": only " + bar.n + " bar buttons — expected 12 (two new ground arrows)");
    if (bar.small) fails.push(c.w + ": ⚠ " + bar.small + " bar button(s) below the 44px tap floor");
    if (bar.spill) fails.push(c.w + ": ⚠ " + bar.spill + " bar button(s) run off the viewport width");
    await p.screenshot({ path: path.join(OUT, "held-" + c.w + ".png") });

    /* let go on a SLOPE: it must run downhill to 50, i.e. to the right */
    await p.evaluate(() => document.querySelector(".rnh-b-go").click());
    await new Promise(r => setTimeout(r, 900));
    const settled = await p.evaluate(READ);
    checks++;
    if (!near(settled.stoneX, 1, 0.03)) fails.push(c.w + ": ⭐ 47 did not run to the high dip — it is at " + settled.stoneX);
    if (!settled.rest) fails.push(c.w + ": the settled stone is not drawn at rest");
    if (settled.teeter) fails.push(c.w + ": a stone on a slope is teetering");
    const cardFit = await p.evaluate(() => { const c=document.querySelector(".rnh-card").getBoundingClientRect(), s=document.querySelector(".rnh-stone").getBoundingClientRect(); return s.left >= c.left - 0.5 && s.right <= c.right + 0.5; });
    if (!cardFit) fails.push(c.w + ": ⚠ the settled stone hangs outside the CARD");
    if (settled.stoneBottom > 0.35) fails.push(c.w + ": the settled stone is not down in the dip (" + settled.stoneBottom + ")");
    await p.screenshot({ path: path.join(OUT, "settled-" + c.w + ".png") });

    /* now put one ON THE RIDGE and let go: it must TEETER and stay */
    await p.evaluate(() => { const T = window.RoundingHill; T.st = T.again(T.st, T.ridge(T.st)); T.render(); });
    await new Promise(r => setTimeout(r, 300));
    await p.evaluate(() => document.querySelector(".rnh-b-go").click());
    await new Promise(r => setTimeout(r, 1400));
    const teet = await p.evaluate(READ);
    checks++;
    if (!teet.teeter) fails.push(c.w + ": ⭐⭐ the stone on the ridge is NOT teetering");
    if (teet.rest) fails.push(c.w + ": ⭐⭐ the machine resolved the tie on its own");
    if (!near(teet.stoneX, 0.5)) fails.push(c.w + ": the teetering stone drifted to " + teet.stoneX);
    await p.screenshot({ path: path.join(OUT, "teeter-" + c.w + ".png") });

    /* and it STAYS teetering — sampled again much later */
    await new Promise(r => setTimeout(r, 2200));
    const still = await p.evaluate(READ);
    checks++;
    if (!still.teeter || still.rest) fails.push(c.w + ": ⭐⭐ the teeter resolved itself after waiting");

    /* the class settles the ridge: it leans, and the stone goes */
    await p.evaluate(() => document.querySelector(".rnh-b-tu").click());
    /* @@ PAST THE BEAT AND THE SETTLE. The ridge leans first and the stone
       follows T_BEAT (700ms) later, then takes T_SETTLE (620ms) to fall -
       so a 900ms sample catches the stone still on the ridge and reports a
       correct tool as broken. */
    await new Promise(r => setTimeout(r, 1800));
    const tilted = await p.evaluate(READ);
    checks++;
    if (!tilted.ridgeSet) fails.push(c.w + ": ⭐ the ridge does not show that the class settled it");
    /* ⚠ A SUBSTRING TEST, NOT A REGEX. Written first as /rotate(9deg)/,
       whose parens are a CAPTURE GROUP — so it demanded the literal
       "rotate9deg" and failed a ridge that had leaned correctly, at all
       four viewports. The diagnostic line printed "rotate(9deg)" the
       whole time. Verify the measurement before the defect. */
    if ((tilted.ridgeRot || "").indexOf("rotate(" + 9 + "deg)") < 0) fails.push(c.w + ": the ridge did not lean: " + tilted.ridgeRot);
    if (!near(tilted.stoneX, 1, 0.03)) fails.push(c.w + ": the settled ridge did not send the stone to the high dip");
    if (tilted.teeter) fails.push(c.w + ": still teetering after the class decided");
    await p.screenshot({ path: path.join(OUT, "tilted-" + c.w + ".png") });

    /* ⭐ THE NEW CONTROL: the ground-shift arrows move the WHOLE hill to
       the next / previous pair, and the dip numerals must follow live —
       measured from the rendered `.rnh-mark` text, not from the model. */
    await p.evaluate(() => document.querySelector(".rnh-b-gu").click());
    await new Promise(r => setTimeout(r, 400));
    const gUp = await p.evaluate(READ);
    checks++;
    if (gUp.marks.join("/") !== "50/60") fails.push(c.w + ": ⭐ shifting the ground up did not move the dips to 50/60 — got " + gUp.marks.join("/"));
    await p.evaluate(() => document.querySelector(".rnh-b-gd").click());
    await new Promise(r => setTimeout(r, 400));
    const gDn = await p.evaluate(READ);
    checks++;
    if (gDn.marks.join("/") !== "40/50") fails.push(c.w + ": ⭐ shifting the ground back down did not return the dips to 40/50 — got " + gDn.marks.join("/"));
    await p.screenshot({ path: path.join(OUT, "shifted-" + c.w + ".png") });

    console.log("[" + c.w + "] dips=" + open.marks.join("-") + " ridge@" + open.ridgeX +
      " | 47 held@" + open.stoneX + " -> settled@" + settled.stoneX +
      " | ridge stone teeter=" + teet.teeter + " still=" + still.teeter +
      " | after tilt lean=" + (tilted.ridgeRot||"").replace(/.*rotate/,"") + " @" + tilted.stoneX);
    await p.close();
  }
  await b.close(); srv.close();
  console.log('\n' + (fails.length ? 'FAIL' : 'PASS') + `  ${checks} render checks, ${fails.length} failures`);
  fails.slice(0, 30).forEach(f => console.log('  ✗ ' + f));
  if (fails.length) process.exit(1);
})();
