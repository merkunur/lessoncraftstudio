/* =====================================================================
   RENDER PROBE — TOOL #53, THE PAIR GATE (rebuilt 2026-08-11)
   =====================================================================
   ⚠⚠ THE ORACLE HERE MUST NOT SHARE THE TOOL'S CONVENTION. #44 shipped
   a mirrored profile because the check counted cubes in the same index
   order the renderer drew them. So this asks the question IN PIXELS:
   what is actually in the yard band, what the keystone actually says,
   whether the boom actually moved UP in page coordinates — measured
   from getBoundingClientRect and textContent, never from the model.

   The driven story (the redesign's choose -> commit -> reveal, three
   times): an EMPTY road at rest -> choose 9 from the strip -> a call
   is refused with the bar down -> commit 1 -> march to the standstill
   (4 ranks through, 1 left standing beside a dashed seat, the column
   numerals up) -> choose a second parade of 7 -> commit 1 -> it
   marches itself in -> commit the sill pass-claim -> the plate fills,
   recolours, and takes the same march every rank gets.

   Run: node scripts/probe-pair-gate.js
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const ROOT = process.env.PAIR_GATE_TOOL_DIR || path.join(__dirname, '..', 'mini tools');
const OUT = path.join(__dirname, '..', 'docs', 'audit-results', 'pair-gate', 'qa');
const PORT = 5679;

const srv = http.createServer((rq, rs) => {
  let f = rq.url.split('?')[0].replace('/mini-tools/', '');
  while (f.charAt(0) === '/') f = f.slice(1);
  if (!f) f = 'pair-gate.html';
  const fp = path.join(ROOT, f);
  if (!fs.existsSync(fp)) { rs.writeHead(404); rs.end('x'); return; }
  const t = f.endsWith('.js') ? 'application/javascript' : f.endsWith('.json') ? 'application/json'
    : f.endsWith('.css') ? 'text/css' : 'text/html';
  rs.writeHead(200, { 'Content-Type': t }); rs.end(fs.readFileSync(fp));
}).listen(PORT);

/* Read the apparatus in PIXELS. */
const READ = () => {
  const ar = document.querySelector(".pgt-arena"); if (!ar) return null;
  const q = s => document.querySelector(s);
  const arch = q(".pgt-arch"), bar = q(".pgt-bar");
  const yard = q(".pgt-yard"), wait = q(".pgt-wait"), sill = q(".pgt-sill");
  const ab = arch ? arch.getBoundingClientRect() : null;
  const m = q(".pgt-m");
  const txt = s => { const e = q(s); return e ? e.textContent.trim() : null; };
  return {
    through: yard ? yard.querySelectorAll(".pgt-m").length : -1,
    waiting: wait ? wait.querySelectorAll(".pgt-m").length : -1,
    seats: wait ? wait.querySelectorAll(".pgt-seat").length : -1,
    yardRanks: yard ? yard.querySelectorAll(".pgt-rank").length : -1,
    barUp: bar ? bar.className.indexOf("is-up") >= 0 : null,
    barY: bar ? +bar.getBoundingClientRect().top.toFixed(1) : null,
    archW: ab ? +ab.width.toFixed(1) : null,
    marcherW: m ? +m.getBoundingClientRect().width.toFixed(1) : null,
    sillShown: sill ? sill.style.display !== "none" : null,
    sillFull: sill ? sill.className.indexOf("is-full") >= 0 : null,
    sillOn: sill ? sill.querySelectorAll(".pgt-m").length : -1,
    sillW: sill && sill.style.display !== "none" ? +sill.getBoundingClientRect().width.toFixed(1) : null,
    keyK: txt(".pgt-key"),
    numN: txt(".pgt-num-n"),
    numThru: txt(".pgt-num-thru"),
    numStand: txt(".pgt-num-stand"),
    files: document.querySelectorAll(".pgt-files .pgt-file").length,
    fileVal: txt(".pgt-files .pgt-file"),
    say: txt(".pgt-say"),
    sizeChips: document.querySelectorAll(".pgt-b-size").length,
    predChips: document.querySelectorAll(".pgt-b-pred, .pgt-b-predsill").length
  };
};

const sleep = ms => new Promise(r => setTimeout(r, ms));

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const b = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const fails = [];
  let checks = 0;

  for (const c of [{ w: 360, h: 800 }, { w: 704, h: 900 }, { w: 768, h: 1024 }, { w: 1024, h: 900 }]) {
    const p = await b.newPage();
    p.on('pageerror', e => fails.push(`${c.w}: page error ${e.message}`));
    await p.setViewport({ width: c.w, height: c.h });
    await p.goto(`http://127.0.0.1:${PORT}/mini-tools/pair-gate.html?lang=en`, { waitUntil: 'domcontentloaded' });
    await sleep(500);
    const click = sel => p.evaluate(s => { const e = document.querySelector(s); if (e) e.click(); return !!e; }, sel);

    /* --- at rest: an EMPTY road, a closed boom, a numbered keystone */
    const rest = await p.evaluate(READ);
    if (!rest) { fails.push(c.w + ": NO ARENA RENDERED"); await p.close(); continue; }
    checks++;
    if (rest.barUp) fails.push(c.w + ": ** the bar is UP before anybody predicted - the tool is a cutscene");
    if (rest.through !== 0) fails.push(c.w + ": " + rest.through + " already through at rest");
    if (rest.waiting !== 0) fails.push(c.w + ": the road is not empty at rest (" + rest.waiting + ")");
    if (rest.keyK !== "2") fails.push(c.w + ": the keystone reads '" + rest.keyK + "', not the width");
    if (rest.sizeChips !== 20) fails.push(c.w + ": " + rest.sizeChips + " size chips, expected 20");
    if (rest.predChips < 2) fails.push(c.w + ": only " + rest.predChips + " prediction chips");
    if (rest.numThru) fails.push(c.w + ": a through-count shows before any rank (" + rest.numThru + ")");
    await p.screenshot({ path: path.join(OUT, "start-" + c.w + ".png") });

    /* --- choose 9 from the strip */
    if (!await click(".pgt-b-size-9")) fails.push(c.w + ": no .pgt-b-size-9 chip");
    await sleep(300);
    const chosen = await p.evaluate(READ);
    checks++;
    if (chosen.waiting !== 9) fails.push(c.w + ": chose 9, " + chosen.waiting + " assembled");
    if (chosen.numN !== "9") fails.push(c.w + ": the chosen N numeral reads '" + chosen.numN + "'");
    if (chosen.barUp) fails.push(c.w + ": choosing a parade lifted the bar");
    if (!chosen.say) fails.push(c.w + ": the say-line is silent after a choice");

    /* --- a call with the bar down is refused */
    await click(".pgt-b-call");
    await sleep(300);
    const held = await p.evaluate(READ);
    checks++;
    if (held.barUp) fails.push(c.w + ": ** calling a rank lifted the bar");
    if (held.through !== 0) fails.push(c.w + ": ** a rank went through with the bar down");

    /* --- commit 1 left standing (the chip carries .pgt-b-no) */
    await click(".pgt-b-no");
    await sleep(600);
    const pred = await p.evaluate(READ);
    checks++;
    if (!pred.barUp) fails.push(c.w + ": * the bar did not lift after the commit");
    if (pred.barY >= held.barY) fails.push(c.w + ": the bar did not physically MOVE UP (" + held.barY + " -> " + pred.barY + ")");
    if (pred.numThru) fails.push(c.w + ": a through-count shows before the first rank");

    /* --- march to the standstill (the fly takes T_RANK; wait it out) */
    let guard = 0;
    while (guard++ < 12) {
      const before = await p.evaluate(() => document.querySelectorAll(".pgt-yard .pgt-m").length);
      await click(".pgt-b-call");
      await sleep(800);
      const now = await p.evaluate(() => document.querySelectorAll(".pgt-yard .pgt-m").length);
      if (now === before) break;
    }
    const done = await p.evaluate(READ);
    checks++;
    if (done.through + done.waiting !== 9)
      fails.push(c.w + ": through+waiting " + (done.through + done.waiting) + " != the parade 9");
    if (done.waiting !== 1) fails.push(c.w + ": ** 9 in twos should leave exactly 1 (" + done.waiting + ")");
    if (done.seats !== 1) fails.push(c.w + ": ** 1 standing needs exactly 1 empty seat (" + done.seats + ")");
    if (done.numThru !== "8") fails.push(c.w + ": the through-count reads '" + done.numThru + "', not 8");
    if (done.numStand !== "1") fails.push(c.w + ": the standing numeral reads '" + done.numStand + "'");
    if (done.files !== 2) fails.push(c.w + ": " + done.files + " column numerals, expected 2");
    if (done.fileVal !== "4") fails.push(c.w + ": the column numeral reads '" + done.fileVal + "', not 4");
    await p.screenshot({ path: path.join(OUT, "stand-" + c.w + ".png") });

    /* --- the theorem: choose a second parade of 7, commit, bring in */
    if (!await click(".pgt-b-size-7")) fails.push(c.w + ": the strip did not re-arm for the second parade");
    await sleep(300);
    await click(".pgt-b-no");
    await sleep(300);
    await click(".pgt-b-second");
    await sleep(3400);                       /* 3 ranks x (fly + cadence) */
    const sec = await p.evaluate(READ);
    checks++;
    if (sec.through !== 14) fails.push(c.w + ": after both parades the yard holds " + sec.through + ", not 14");

    /* --- the sill: commit the pass-claim, then load the plate */
    await click(".pgt-b-yes");               /* the 0 chip = it passes */
    await sleep(300);
    await click(".pgt-b-sill");
    await sleep(700);                        /* Beat A: both step on */
    const sill = await p.evaluate(READ);
    checks++;
    if (!sill.sillShown) fails.push(c.w + ": * the sill never appeared");
    if (sill.sillOn !== 2) fails.push(c.w + ": the sill holds " + sill.sillOn + ", not 2");
    if (!sill.sillFull) fails.push(c.w + ": ** two left at two abreast did NOT read as a full plate");
    /* ** the sill must be as wide as the archway - that IS the proof */
    if (sill.sillW && Math.abs(sill.sillW - sill.archW) > 14)
      fails.push(c.w + ": ** the sill is " + sill.sillW + "px and the archway " + sill.archW + "px - the proof depends on them matching");
    await p.screenshot({ path: path.join(OUT, "sill-" + c.w + ".png") });

    /* --- Beat B: hold, recolour, and the byte-identical march through */
    await sleep(1900);
    const after = await p.evaluate(READ);
    checks++;
    if (after.sillShown) fails.push(c.w + ": the full plate never went through");
    if (after.through !== 16) fails.push(c.w + ": ** after the sill passes the yard holds " + after.through + ", not 16");
    if (after.seats !== 0) fails.push(c.w + ": an empty seat survived the sill passing");
    await p.screenshot({ path: path.join(OUT, "after-" + c.w + ".png") });

    console.log("[" + c.w + "] rest empty ok; 9 -> 8 through + 1 standing (files " + done.fileVal + "|" + done.fileVal +
      "); +7 -> 14; sill 2/2 full, widths " + sill.sillW + "/" + sill.archW + "; union " + after.through);
    await p.close();
  }

  await b.close(); srv.close();
  console.log('\n' + (fails.length ? 'FAIL' : 'PASS') + `  ${checks} render checks, ${fails.length} failures`);
  fails.slice(0, 30).forEach(f => console.log('  ✗ ' + f));
  if (fails.length) process.exit(1);
})();
