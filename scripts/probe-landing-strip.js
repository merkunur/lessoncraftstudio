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

   Run: node scripts/probe-landing-strip.js
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const ROOT = process.env.LANDING_STRIP_TOOL_DIR || path.join(__dirname, '..', 'mini tools');
const OUT = path.join(__dirname, '..', 'docs', 'audit-results', 'landing-strip', 'qa');
const PORT = 5675;

const srv = http.createServer((rq, rs) => {
  let f = rq.url.split('?')[0].replace('/mini-tools/', '');
  while (f.charAt(0) === '/') f = f.slice(1);
  if (!f) f = 'landing-strip.html';
  const fp = path.join(ROOT, f);
  if (!fs.existsSync(fp)) { rs.writeHead(404); rs.end('x'); return; }
  const t = f.endsWith('.js') ? 'application/javascript' : f.endsWith('.json') ? 'application/json'
    : f.endsWith('.css') ? 'text/css' : 'text/html';
  rs.writeHead(200, { 'Content-Type': t }); rs.end(fs.readFileSync(fp));
}).listen(PORT);

/* Read the apparatus in PIXELS: where each mark actually sits along
   the strip, never from the model. #44 shipped a mirrored profile
   because the oracle shared the renderer|s index order. */
const READ = () => {
  const strip = document.querySelector(".lds-strip");
  if (!strip) return null;
  const sb = strip.getBoundingClientRect();
  const at = (el) => { if (!el) return null; const b = el.getBoundingClientRect();
    return +(((b.left + b.width / 2) - sb.left) / sb.width).toFixed(4); };
  const pq = document.querySelector(".lds-plaque");
  const wd = document.querySelector(".lds-wedge");
  return {
    posts: [].slice.call(document.querySelectorAll(".lds-post")).map(at),
    plaque: (pq && pq.style.display !== "none") ? at(pq) : null,
    plaqueTxt: pq ? pq.textContent : null,
    plaqueTop: pq ? pq.getBoundingClientRect().bottom <= sb.top + 2 : null,
    wedge: (wd && wd.style.display !== "none" && wd.className.indexOf("is-on") >= 0) ? at(wd) : null,
    wedgeBelow: wd ? wd.getBoundingClientRect().top >= sb.bottom - 2 : null,
    ends: [].slice.call(document.querySelectorAll(".lds-end")).map(e => e.textContent),
    trace: [].slice.call(document.querySelectorAll(".lds-tfill")).map(e => e.style.height),
    ticks: document.querySelectorAll(".lds-strip [class*=tick]").length
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
    await p.goto(`http://127.0.0.1:${PORT}/mini-tools/landing-strip.html?lang=en`, { waitUntil: 'domcontentloaded' });
    await new Promise(r => setTimeout(r, 500));

    const open = await p.evaluate(READ);
    if (!open) { fails.push(c.w + ": NO STRIP RENDERED"); await p.close(); continue; }
    checks++;
    /* the three posts: the two ends and the middle, measured in pixels */
    const near = (a,b,t) => Math.abs(a-b) <= (t||0.012);
    if (open.posts.length !== 3) fails.push(c.w + ": " + open.posts.length + " posts, expected 3");
    if (!near(open.posts[0],0)) fails.push(c.w + ": the low post is at " + open.posts[0] + ", not the end");
    if (!near(open.posts[1],0.5)) fails.push(c.w + ": the middle post is at " + open.posts[1]);
    if (!near(open.posts[2],1)) fails.push(c.w + ": the high post is at " + open.posts[2] + ", not the end");
    /* ⭐ NO TICKS — a ticked strip carries different furniture after the re-rule */
    if (open.ticks) fails.push(c.w + ": the strip has " + open.ticks + " ticks on it");
    if (open.ends.join("/") !== "0/100") fails.push(c.w + ": the ends read " + open.ends.join("/"));
    await p.screenshot({ path: path.join(OUT, "arrive-" + c.w + ".png") });

    /* choose the middle post, then commit — the plaque must sit ABOVE
       the strip and the wedge BELOW it, side and fill never hue */
    await p.evaluate(() => document.querySelector(".lds-b-p1").click());
    await new Promise(r => setTimeout(r, 400));
    const placed = await p.evaluate(READ);
    checks++;
    if (!near(placed.plaque, 0.5)) fails.push(c.w + ": after choosing the middle post the plaque is at " + placed.plaque);
    if (!placed.plaqueTop) fails.push(c.w + ": ⚠ the plaque is not ABOVE the strip");
    await p.evaluate(() => document.querySelector(".lds-b-r10").click());
    await new Promise(r => setTimeout(r, 300));
    const moved = await p.evaluate(READ);
    if (!(moved.plaque > placed.plaque)) fails.push(c.w + ": +10 did not move the plaque right");
    await p.evaluate(() => document.querySelector(".lds-b-place").click());
    await new Promise(r => setTimeout(r, 1400));   /* past the 900ms beat */
    const shown = await p.evaluate(READ);
    checks++;
    if (shown.wedge === null) fails.push(c.w + ": ⚠ the truth never appeared after the beat");
    if (shown.wedgeBelow === false) fails.push(c.w + ": ⚠ the wedge is not BELOW the strip");
    const nTruth = Number(shown.plaqueTxt);
    if (shown.wedge !== null && !near(shown.wedge, nTruth/100, 0.02))
      fails.push(c.w + ": the wedge sits at " + shown.wedge + " but the number is " + nTruth);
    await p.screenshot({ path: path.join(OUT, "shown-" + c.w + ".png") });

    /* ⭐ THE RE-RULE: the same three posts come back inside the ten */
    await p.evaluate(() => document.querySelector(".lds-b-rerule").click());
    await new Promise(r => setTimeout(r, 1000));
    const inside = await p.evaluate(READ);
    checks++;
    const lo = Math.floor(nTruth/10)*10;
    if (inside.ends.join("/") !== (lo + "/" + (lo+10)))
      fails.push(c.w + ": ⭐ after the re-rule the ends read " + inside.ends.join("/") + ", expected " + lo + "/" + (lo+10));
    if (!near(inside.posts[0],0) || !near(inside.posts[1],0.5) || !near(inside.posts[2],1))
      fails.push(c.w + ": ⭐ the three posts did not come back inside the ten: " + JSON.stringify(inside.posts));
    if (inside.ticks) fails.push(c.w + ": ticks appeared after the re-rule");
    /* ⭐ THE QUESTION RECURS: the post buttons must be live again and
       nothing may be pre-chosen inside the new ten. */
    const asked = await p.evaluate(() => ({
      postsLive: [].slice.call(document.querySelectorAll(".lds-b-post")).filter(b => b.className.indexOf("is-off") < 0).length,
      preChosen: document.querySelectorAll(".lds-b-post.is-on").length,
      plaqueVisible: (() => { const q = document.querySelector(".lds-plaque"); if (!q || q.style.display === "none") return false;
        const r = q.getBoundingClientRect(), s2 = document.querySelector(".lds-strip").getBoundingClientRect();
        return r.left >= s2.left - 40 && r.right <= s2.right + 40; })()
    }));
    checks++;
    if (asked.postsLive !== 3) fails.push(c.w + ": ⭐ only " + asked.postsLive + " post buttons live after the re-rule — the question did not recur");
    if (asked.preChosen) fails.push(c.w + ": a post was already chosen inside the new ten");
    if (!asked.plaqueVisible) fails.push(c.w + ": ⚠ the plaque is off the strip after the re-rule");
    await p.screenshot({ path: path.join(OUT, "inside-" + c.w + ".png") });

    console.log("[" + c.w + "] posts=" + open.posts.join(",") + " ends=" + open.ends.join("-") +
      " n=" + nTruth + " wedge=" + shown.wedge + " -> re-ruled " + inside.ends.join("-") +
      " posts=" + inside.posts.join(",") + " trace=" + inside.trace.join("|"));
    await p.close();
  }
  await b.close(); srv.close();
  console.log('\n' + (fails.length ? 'FAIL' : 'PASS') + `  ${checks} render checks, ${fails.length} failures`);
  fails.slice(0, 30).forEach(f => console.log('  ✗ ' + f));
  if (fails.length) process.exit(1);
})();
