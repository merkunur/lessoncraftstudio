#!/usr/bin/env node
/* =====================================================================
   local-test-rekenrek.js — the local DoD for the Rekenrek FREE-PLAY
   TOOL (mini tools/rekenrek.html).

   Serves `mini tools/` locally, then:
     A. viewport sweep 320·360·412·768·1024×768·1024×900·1366×768 —
        no overflow · chips/dock ≥44px · FITS at ≥1024 (dock ≤ viewport)
        · the 10-RACK WALL at 1024×768 explicitly (premium-forced)
     B. the bead engine (1024×768):
        readout ABSENT by default · chain drag (grab the 3rd-from-inner
        parked bead, ≥50% travel → pushed=3, CHAIN semantics) ·
        <50% drag SNAPS BACK (pushed unchanged) · whole-pack sweep
        (outermost bead → pushed=10) · TAP MOVES NOTHING (wobble only)
        · keyboard ←/→/Shift/Home/End · clacks fire (AudioContext spy)
        · reset chip parks all + PRESERVES rackCount
     C. readout + NUMERAL-LEAK: toggle ON → total + per-rod chips ·
        covered → chips + total + rod aria-valuenow REMOVED from DOM
     D. free/premium seams: rack chips >1 gated · Flash chip gated ·
        sequence #2 gated · starter sequence FREE (enters → stepper)
     E. flash machine (premium-forced): Cover → shade down · Show →
        timed flash → auto-cover · Show again · Reveal (speaks via
        speakOnReveal) · HALF-COVER covers only the lower half
     F. Show-a-number distributes 47 canonically (4 full rods + 7) ·
        Speak chip says "forty-seven" (TTS spy)
     G. deep links ?n=47&racks=10 · resume across reload
     H. lang smoke de + fi (native title, console clean)
     I. console errors: zero tolerated
   Screenshots → docs/audit-results/rekenrek/qa/
   Exit 1 on any FAIL.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const OUT = path.join(REPO, 'docs', 'audit-results', 'rekenrek', 'qa');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.png': 'image/png' };

const VIEWPORTS = [
  { w: 320, h: 640 }, { w: 360, h: 740 }, { w: 412, h: 820 }, { w: 768, h: 1000 },
  { w: 1024, h: 768, fits: true }, { w: 1024, h: 900, fits: true }, { w: 1366, h: 768, fits: true },
];
const MIN_TAP = 44;

function serve() {
  return http.createServer((req, res) => {
    let p = decodeURIComponent(req.url.split('?')[0]);
    if (p === '/') p = '/rekenrek.html';
    let file;
    if (p.startsWith('/mini-tools/')) file = path.join(MINI, p.slice('/mini-tools/'.length));
    else file = path.join(MINI, p.replace(/^\//, ''));
    fs.readFile(file, (err, buf) => {
      if (err) { res.statusCode = 404; res.end('not found'); return; }
      res.setHeader('Content-Type', MIME[path.extname(file)] || 'application/octet-stream');
      res.end(buf);
    });
  });
}

const fails = [];
function FAIL(msg) { fails.push(msg); console.log('  ✗ FAIL ' + msg); }
function OK(msg) { console.log('  ✓ ' + msg); }
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function forcePremium(page) {
  await page.evaluate(() => {
    const st = JSON.parse(localStorage.getItem('lcs:rekenrek:v1') || '{"v":1,"customSeqs":{}}');
    st.v = 1;
    st.ent = { tier: 'full', checkedAt: new Date().toISOString() };
    localStorage.setItem('lcs:rekenrek:v1', JSON.stringify(st));
    localStorage.setItem('accessToken', 'test-token');
  });
}

/* drag helper: pointer path on a bead — from its center, dx px, in steps */
async function dragBead(page, sel, beadIndex, dx) {
  const r = await page.evaluate((sel, i) => {
    const rod = document.querySelector(sel);
    const b = rod.querySelectorAll('.rkr-bead')[i].getBoundingClientRect();
    return { x: b.left + b.width / 2, y: b.top + b.height / 2 };
  }, sel, beadIndex);
  await page.mouse.move(r.x, r.y);
  await page.mouse.down();
  const steps = 12;
  for (let s = 1; s <= steps; s++) {
    await page.mouse.move(r.x + dx * s / steps, r.y);
    await sleep(16);
  }
  await page.mouse.up();
  await sleep(350);
}

async function pushedOf(page, rodIdx = 0) {
  return page.evaluate((i) => Rekenrek.session.racks[Math.floor(i / 2)][i % 2 === 0 ? 'top' : 'bottom'], rodIdx);
}
/* gap available on rod 0 */
async function gapOf(page) {
  return page.evaluate(() => {
    const g = Rekenrek._geom();
    const rod = document.querySelector('.rkr-rod');
    return rod.clientWidth - 2 * g.inset - 10 * g.d;
  });
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const server = serve();
  await new Promise(r => server.listen(0, r));
  const PORT = server.address().port;
  const BASE = `http://127.0.0.1:${PORT}/mini-tools/rekenrek.html`;

  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  const consoleErrors = [];
  page.on('console', m => { if (m.type() === 'error') consoleErrors.push(m.text()); });
  page.on('pageerror', e => consoleErrors.push('pageerror: ' + e.message));
  await page.evaluateOnNewDocument(() => {
    window.__spoken = [];
    if (window.speechSynthesis) window.speechSynthesis.speak = function (u) { window.__spoken.push(u.text); };
    /* clack spy: count buffer-source starts */
    window.__clacks = 0;
    const AC = window.AudioContext;
    if (AC) {
      window.AudioContext = function () {
        const ctx = new AC();
        const orig = ctx.createBufferSource.bind(ctx);
        ctx.createBufferSource = function () {
          const src = orig();
          const st = src.start.bind(src);
          src.start = function () { window.__clacks++; return st.apply(null, arguments); };
          return src;
        };
        return ctx;
      };
    }
  });

  /* ---------- A. viewport sweep ---------- */
  console.log('\nA. viewport sweep');
  for (const vp of VIEWPORTS) {
    await page.setViewport({ width: vp.w, height: vp.h });
    await page.goto(BASE + '?lang=en', { waitUntil: 'networkidle0' });
    await page.waitForSelector('.rkr-rod', { timeout: 8000 }).catch(() => null);
    const m = await page.evaluate((MIN_TAP) => {
      const overflow = document.documentElement.scrollWidth - window.innerWidth;
      const small = [];
      for (const s of ['.rkr-chip', '.rkr-ctrlchip', '.rkr-show']) {
        document.querySelectorAll(s).forEach(el => {
          const r = el.getBoundingClientRect();
          if (r.width && (r.width < MIN_TAP - 12 || r.height < MIN_TAP)) small.push(`${s} ${Math.round(r.width)}x${Math.round(r.height)}`);
        });
      }
      const board = document.querySelector('.rkr-board');
      const strip = document.querySelector('.rkr-strip');
      const last = [...document.querySelectorAll('.rkr-wrap > *')].pop();
      return {
        overflow, small,
        rods: document.querySelectorAll('.rkr-rod').length,
        beads: document.querySelectorAll('.rkr-bead').length,
        bottom: last ? last.getBoundingClientRect().bottom : 0,
        vh: window.innerHeight,
        board: !!board, strip: !!strip,
      };
    }, MIN_TAP);
    const tag = `${vp.w}x${vp.h}`;
    let bad = false;
    if (m.overflow > 1) { FAIL(`${tag}: horizontal overflow ${m.overflow}px`); bad = true; }
    if (m.small.length) { FAIL(`${tag}: tap targets small: ${[...new Set(m.small)].join(', ')}`); bad = true; }
    if (!m.board || m.rods !== 2 || m.beads !== 20) { FAIL(`${tag}: board wrong (rods=${m.rods} beads=${m.beads})`); bad = true; }
    if (vp.fits && m.bottom > m.vh + 1) { FAIL(`${tag}: content ${Math.round(m.bottom)} > viewport ${m.vh} (FITS)`); bad = true; }
    if (!bad) OK(`${tag}: fits (${m.rods} rods, ${m.beads} beads, bottom ${Math.round(m.bottom)}/${m.vh})`);
    if ([360, 768].includes(vp.w)) await page.screenshot({ path: path.join(OUT, `sweep-${vp.w}.png`), fullPage: true });
    if (vp.w === 1024 && vp.h === 768) await page.screenshot({ path: path.join(OUT, 'sweep-1024x768.png') });
  }

  /* the 10-rack wall FITS (premium) at 1024×768 */
  await page.setViewport({ width: 1024, height: 768 });
  await page.goto(BASE + '?lang=en', { waitUntil: 'networkidle0' });
  await forcePremium(page);
  await page.goto(BASE + '?lang=en&racks=10&n=68', { waitUntil: 'networkidle0' });
  await page.waitForSelector('.rkr-rod');
  const wall = await page.evaluate(() => {
    const last = [...document.querySelectorAll('.rkr-wrap > *')].pop();
    return {
      rods: document.querySelectorAll('.rkr-rod').length,
      bottom: last.getBoundingClientRect().bottom,
      vh: window.innerHeight,
      overflow: document.documentElement.scrollWidth - window.innerWidth,
      total: Rekenrek._total(),
    };
  });
  if (wall.rods !== 10) FAIL(`wall: ${wall.rods} rods (want 10)`);
  else if (wall.overflow > 1) FAIL(`wall: horizontal overflow ${wall.overflow}px`);
  else if (wall.bottom > wall.vh + 1) FAIL(`wall 1024x768: content ${Math.round(wall.bottom)} > ${wall.vh} (FITS)`);
  else if (wall.total !== 68) FAIL(`wall deep link ?n=68: total ${wall.total}`);
  else OK(`wall: 10 rods, 68 distributed, bottom ${Math.round(wall.bottom)}/${wall.vh}`);
  await page.screenshot({ path: path.join(OUT, 'wall-1024x768.png') });

  /* ---------- B. bead engine ---------- */
  console.log('\nB. bead engine (1024×768, fresh free profile)');
  await page.evaluate(() => localStorage.clear());
  await page.goto(BASE + '?lang=en', { waitUntil: 'networkidle0' });
  await page.waitForSelector('.rkr-rod');

  if (await page.$('.rkr-readout')) FAIL('readout visible by default (must be OFF)');
  else OK('readout absent by default');

  const gap = await gapOf(page);
  const geomD = await page.evaluate(() => Rekenrek._geom().d);
  if (gap < 4 * geomD) FAIL(`rod travel ${gap}px < 4 bead diameters (${4 * geomD}px)`);
  else OK(`rod travel ${Math.round(gap / geomD * 10) / 10} bead diameters`);

  /* chain drag: parked pack inner edge = index pushed(0); 3rd from inner = index 2 */
  await dragBead(page, '.rkr-rod', 2, -(gap * 0.65));
  let p0 = await pushedOf(page, 0);
  if (p0 !== 3) FAIL(`chain drag: pushed=${p0} (want 3 — chain semantics)`);
  else OK('chain drag commits 3 beads (3rd-from-inner grab)');

  /* snap-back: small drag on parked pack (now index pushed+1 = 4 → chain of 2) */
  await dragBead(page, '.rkr-rod', 4, -(gap * 0.2));
  p0 = await pushedOf(page, 0);
  if (p0 !== 3) FAIL(`snap-back: pushed=${p0} after 20% drag (want 3 unchanged)`);
  else OK('sub-50% drag snaps back');

  /* whole-pack sweep: outermost parked bead = index 9 → chain of 7 */
  await dragBead(page, '.rkr-rod', 9, -(gap * 0.8));
  p0 = await pushedOf(page, 0);
  if (p0 !== 10) FAIL(`sweep: pushed=${p0} (want 10)`);
  else OK('outermost grab sweeps the whole pack');

  /* clacks fired */
  const clacks = await page.evaluate(() => window.__clacks);
  if (clacks < 2) FAIL(`clack spy: only ${clacks} buffer sources started`);
  else OK(`clacks fired (${clacks} sources)`);

  /* tap = wobble only */
  await page.evaluate(() => {
    const b = document.querySelectorAll('.rkr-rod')[0].querySelectorAll('.rkr-bead')[5].getBoundingClientRect();
    window.__tapAt = { x: b.left + b.width / 2, y: b.top + b.height / 2 };
  });
  const tap = await page.evaluate(() => window.__tapAt);
  await page.mouse.click(tap.x, tap.y);
  await sleep(200);
  p0 = await pushedOf(page, 0);
  const wobbled = await page.evaluate(() => !!document.querySelector('.rkr-bead.rkr-wobble'));
  if (p0 !== 10) FAIL(`tap moved beads: pushed=${p0} (want 10)`);
  else if (!wobbled) FAIL('tap: no wobble cue');
  else OK('tap moves NOTHING (wobble only)');

  /* drag pushed pack back: inner edge = index 9; 4th from inner = index 6 → chain 4 */
  await dragBead(page, '.rkr-rod', 6, gap * 0.65);
  p0 = await pushedOf(page, 0);
  if (p0 !== 6) FAIL(`un-push chain: pushed=${p0} (want 6)`);
  else OK('pushed-pack chain returns 4 beads');

  /* keyboard on rod 2 (bottom) */
  await page.evaluate(() => document.querySelectorAll('.rkr-rod')[1].focus());
  await page.keyboard.press('ArrowLeft');                       /* +1 */
  await page.keyboard.down('Shift'); await page.keyboard.press('ArrowLeft'); await page.keyboard.up('Shift'); /* +5 */
  let p1 = await pushedOf(page, 1);
  if (p1 !== 6) FAIL(`keyboard +1 +5: bottom=${p1} (want 6)`);
  await page.keyboard.press('ArrowRight');                      /* -1 */
  p1 = await pushedOf(page, 1);
  if (p1 !== 5) FAIL(`keyboard -1: bottom=${p1} (want 5)`);
  await page.keyboard.press('End');
  p1 = await pushedOf(page, 1);
  if (p1 !== 10) FAIL(`keyboard End: bottom=${p1} (want 10)`);
  await page.keyboard.press('Home');
  p1 = await pushedOf(page, 1);
  if (p1 !== 0) FAIL(`keyboard Home: bottom=${p1} (want 0)`);
  if (p1 === 0) OK('keyboard ←/→/Shift/End/Home');

  /* reset parks + preserves */
  await page.evaluate(() => Rekenrek.reset());
  const afterReset = await page.evaluate(() => ({ total: Rekenrek._total(), racks: Rekenrek.session.rackCount }));
  if (afterReset.total !== 0 || afterReset.racks !== 1) FAIL(`reset: total=${afterReset.total} racks=${afterReset.racks}`);
  else OK('reset parks all beads, preserves rack count');

  /* ---------- C. readout + numeral-leak ---------- */
  console.log('\nC. readout + numeral-leak');
  await page.evaluate(() => { Rekenrek.session.racks[0].top = 7; Rekenrek.api.settings.readout = true; Rekenrek.render(); });
  await sleep(150);
  const ro = await page.evaluate(() => ({
    total: (document.querySelector('.rkr-readout') || {}).textContent,
    chips: document.querySelectorAll('.rkr-rodchip').length,
  }));
  if (ro.total !== '7' || ro.chips !== 2) FAIL(`readout ON: total="${ro.total}" chips=${ro.chips}`);
  else OK('readout ON: total 7 + per-rod chips');
  await forcePremium(page);
  await page.evaluate(() => { Rekenrek.premium = true; Rekenrek._flashOn = true; Rekenrek.session.phase = 'covered'; Rekenrek.render(); });
  await sleep(150);
  const leak = await page.evaluate(() => ({
    readout: !!document.querySelector('.rkr-readout'),
    chips: document.querySelectorAll('.rkr-rodchip').length,
    aria: [...document.querySelectorAll('.rkr-rod')].some(r => r.hasAttribute('aria-valuenow')),
    shadeDown: document.querySelector('.rkr-shade').classList.contains('down'),
  }));
  if (leak.readout || leak.chips || leak.aria) FAIL(`NUMERAL LEAK while covered: readout=${leak.readout} chips=${leak.chips} aria=${leak.aria}`);
  else if (!leak.shadeDown) FAIL('covered: shade not down');
  else OK('covered: numerals + aria counts REMOVED from DOM, shade down');
  await page.screenshot({ path: path.join(OUT, 'covered-1024x768.png') });

  /* ---------- D. free/premium seams ---------- */
  console.log('\nD. free gates (fresh free profile)');
  await page.evaluate(() => localStorage.clear());
  await page.goto(BASE + '?lang=en', { waitUntil: 'networkidle0' });
  await page.waitForSelector('.rkr-chip');
  /* rack chip 5 gated */
  await page.evaluate(() => [...document.querySelectorAll('.rkr-chip')].find(c => c.getAttribute('data-n') === '5').click());
  await sleep(100);
  let gate = await page.evaluate(() => ({ gate: !!document.querySelector('.rkr-gate'), racks: Rekenrek.session.rackCount }));
  if (!gate.gate || gate.racks !== 1) FAIL(`rack gate: gate=${gate.gate} racks=${gate.racks}`);
  else OK('rack chips >1 gated for free');
  /* flash gated */
  await page.evaluate(() => {
    document.querySelector('.rkr-gate').remove();
    [...document.querySelectorAll('.rkr-chip')].find(c => /Flash/i.test(c.textContent)).click();
  });
  await sleep(100);
  gate = await page.evaluate(() => ({ gate: !!document.querySelector('.rkr-gate'), on: Rekenrek._flashOn }));
  if (!gate.gate || gate.on) FAIL(`flash gate: gate=${gate.gate} flashOn=${gate.on}`);
  else OK('flash mode gated for free');
  /* sequences: starter free, second gated */
  await page.evaluate(() => [...document.querySelectorAll('.rkr-chip')].find(c => /sequences/i.test(c.textContent)).click());
  await page.waitForSelector('.rkr-panel.open');
  const rows = await page.evaluate(() => document.querySelectorAll('.rkr-seqrow').length);
  if (rows < 10) FAIL(`panel lists ${rows} sequences (want ≥10)`);
  await page.evaluate(() => document.querySelectorAll('.rkr-seqrow')[1].click());
  await sleep(100);
  gate = await page.evaluate(() => ({ gate: !!document.querySelector('.rkr-panel .rkr-gate'), seq: Rekenrek.session.seq }));
  if (!gate.gate || gate.seq) FAIL(`seq #2 gate: gate=${gate.gate} entered=${!!gate.seq}`);
  else OK('second sequence gated for free');
  await page.evaluate(() => document.querySelectorAll('.rkr-seqrow')[0].click());
  await sleep(200);
  const starter = await page.evaluate(() => ({
    seq: Rekenrek.session.seq && Rekenrek.session.seq.id,
    strip: !!document.querySelector('.rkr-seqcount'),
    panelOpen: !!document.querySelector('.rkr-panel.open'),
  }));
  if (starter.seq !== 'q_one_push' || !starter.strip || starter.panelOpen) FAIL(`starter: seq=${starter.seq} strip=${starter.strip} panel=${starter.panelOpen}`);
  else OK('starter sequence FREE — enters with stepper');
  /* step through to the finish card */
  const stepInfo = await page.evaluate(() => {
    const sq = Rekenrek._seqById('q_one_push');
    return sq.steps.length;
  });
  for (let i = 1; i < stepInfo; i++) {
    await page.evaluate(() => [...document.querySelectorAll('.rkr-chip')].find(c => c.textContent === 'Next').click());
    await sleep(80);
  }
  await page.evaluate(() => [...document.querySelectorAll('.rkr-chip')].find(c => c.textContent === 'Next').click());
  await sleep(120);
  const done = await page.evaluate(() => !!document.querySelector('.rkr-done'));
  if (!done) FAIL('sequence finish card missing after last Next');
  else OK('sequence finish card (restart / back)');

  /* ---------- E. flash machine (premium) ---------- */
  console.log('\nE. flash machine (premium)');
  await forcePremium(page);
  await page.goto(BASE + '?lang=en&n=8', { waitUntil: 'networkidle0' });
  await page.waitForSelector('.rkr-chip');
  /* leave section D's persisted sequence — back to free play */
  await page.evaluate(() => {
    Rekenrek.session.seq = null;
    Rekenrek.session.phase = 'open';
    Rekenrek.api.settings.flashDuration = '2';
    Rekenrek.api.settings.rows = '2';     /* the starter seq set rows:1 */
    Rekenrek._distribute(8);
    Rekenrek.render();
  });
  await sleep(150);
  await page.evaluate(() => [...document.querySelectorAll('.rkr-chip')].find(c => /Flash/i.test(c.textContent)).click());
  await sleep(150);
  let fm = await page.evaluate(() => ({
    on: Rekenrek._flashOn,
    cover: !!([...document.querySelectorAll('.rkr-ctrlchip')].find(c => c.textContent === 'Cover')),
  }));
  if (!fm.on || !fm.cover) { FAIL(`flash entry: on=${fm.on} coverBtn=${fm.cover}`); }
  else OK('flash mode entered (premium): Cover dock');
  await page.evaluate(() => [...document.querySelectorAll('.rkr-ctrlchip')].find(c => c.textContent === 'Cover').click());
  await sleep(350);
  fm = await page.evaluate(() => ({
    phase: Rekenrek.session.phase,
    down: document.querySelector('.rkr-shade').classList.contains('down'),
    show: !!document.querySelector('.rkr-show'),
  }));
  if (fm.phase !== 'covered' || !fm.down || !fm.show) FAIL(`cover: phase=${fm.phase} down=${fm.down} show=${fm.show}`);
  else OK('Cover: shade down, Show dock');
  /* timed flash: tap Show, shade lifts, auto-covers after 2s */
  const showBtn = await page.$('.rkr-show');
  const sb = await showBtn.boundingBox();
  await page.mouse.click(sb.x + sb.width / 2, sb.y + sb.height / 2);
  await sleep(400);
  let mid = await page.evaluate(() => ({
    phase: Rekenrek.session.phase,
    down: document.querySelector('.rkr-shade').classList.contains('down'),
  }));
  if (mid.phase !== 'flashing' || mid.down) FAIL(`flash open: phase=${mid.phase} down=${mid.down}`);
  await sleep(2200);
  mid = await page.evaluate(() => ({
    phase: Rekenrek.session.phase,
    down: document.querySelector('.rkr-shade').classList.contains('down'),
  }));
  if (mid.phase !== 'covered' || !mid.down) FAIL(`auto-cover: phase=${mid.phase} down=${mid.down}`);
  else OK('timed flash: lifts, auto-covers after flashDuration');
  /* show again + reveal */
  await page.evaluate(() => [...document.querySelectorAll('.rkr-ctrlchip')].find(c => /Show again/.test(c.textContent)).click());
  await sleep(300);
  const again = await page.evaluate(() => Rekenrek.session.phase);
  if (again !== 'flashing') FAIL(`show again: phase=${again}`);
  else OK('Show again re-flashes');
  await page.evaluate(() => [...document.querySelectorAll('.rkr-ctrlchip')].find(c => c.textContent === 'Reveal').click());
  await sleep(800);
  const rev = await page.evaluate(() => ({
    phase: Rekenrek.session.phase,
    down: document.querySelector('.rkr-shade').classList.contains('down'),
    spoken: window.__spoken.slice(),
  }));
  if (rev.phase !== 'revealed' || rev.down) FAIL(`reveal: phase=${rev.phase} down=${rev.down}`);
  else if (!rev.spoken.some(t => /eight/i.test(t))) FAIL(`speakOnReveal: spoken=[${rev.spoken}] (want "eight")`);
  else OK('Reveal opens + speaks "eight" (speakOnReveal)');
  /* half-cover */
  await page.evaluate(() => [...document.querySelectorAll('.rkr-ctrlchip')].find(c => c.textContent === 'Half').click());
  await sleep(350);
  const half = await page.evaluate(() => {
    const cloth = document.querySelector('.rkr-cloth').getBoundingClientRect();
    const board = document.querySelector('.rkr-board').getBoundingClientRect();
    return {
      phase: Rekenrek.session.phase,
      half: document.querySelector('.rkr-shade').classList.contains('half'),
      clothTop: cloth.top, clothBottom: cloth.bottom,
      boardMid: board.top + board.height / 2, boardBottom: board.bottom,
    };
  });
  if (half.phase !== 'covered' || !half.half) FAIL(`half-cover: phase=${half.phase} half=${half.half}`);
  else if (Math.abs(half.clothTop - half.boardMid) > 30 || half.clothBottom < half.boardBottom - 6)
    FAIL(`half-cover: cloth ${Math.round(half.clothTop)}-${Math.round(half.clothBottom)} vs board mid ${Math.round(half.boardMid)} bottom ${Math.round(half.boardBottom)} (must hide the LOWER half)`);
  else OK('Half: the LOWER half hides, top row visible (missing-part game)');
  await page.screenshot({ path: path.join(OUT, 'half-cover.png') });

  /* ---------- F. Show-a-number + Speak ---------- */
  console.log('\nF. Show-a-number + Speak (premium)');
  await page.goto(BASE + '?lang=en', { waitUntil: 'networkidle0' });
  await page.waitForSelector('.rkr-chip');
  await page.evaluate(() => [...document.querySelectorAll('.rkr-chip')].find(c => /sequences/i.test(c.textContent)).click());
  await page.waitForSelector('.rkr-panel.open');
  await page.evaluate(() => {
    const input = document.querySelector('.rkr-numinput');
    input.value = '47';
    [...document.querySelectorAll('.rkr-btn')].find(b => b.classList.contains('primary')).click();
  });
  await sleep(300);
  const dist = await page.evaluate(() => ({
    racks: Rekenrek.session.rackCount,
    rods: Rekenrek.session.racks.map(r => r.top),
    total: Rekenrek._total(),
  }));
  if (dist.total !== 47) FAIL(`show-a-number: total=${dist.total}`);
  else if (JSON.stringify(dist.rods) !== JSON.stringify([10, 10, 10, 10, 7])) FAIL(`canonical distribution: [${dist.rods}] (want 10,10,10,10,7)`);
  else OK(`47 → ${dist.racks} racks, rows [${dist.rods}] (complete-rows-first)`);
  await page.evaluate(() => { window.__spoken.length = 0; });
  await page.evaluate(() => [...document.querySelectorAll('.rkr-chip')].find(c => /Say the number/i.test(c.textContent)).click());
  await sleep(600);
  const spoke = await page.evaluate(() => window.__spoken.slice());
  if (!spoke.some(t => /forty[- ]seven/i.test(t))) FAIL(`Speak: [${spoke}] (want "forty-seven")`);
  else OK('Speak chip says "forty-seven"');

  /* ---------- G. resume ---------- */
  console.log('\nG. resume');
  await page.reload({ waitUntil: 'networkidle0' });
  await page.waitForSelector('.rkr-rod');
  const resumed = await page.evaluate(() => ({ total: Rekenrek._total(), racks: Rekenrek.session.rackCount }));
  if (resumed.total !== 47 || resumed.racks !== 5) FAIL(`resume: total=${resumed.total} racks=${resumed.racks}`);
  else OK('state resumes across reload (47 on 5 racks)');

  /* ---------- H. lang smoke ---------- */
  console.log('\nH. lang smoke de + fi');
  for (const [lang, want] of [['de', 'Rechenrahmen'], ['fi', 'Helmitaulu']]) {
    await page.goto(BASE + '?lang=' + lang, { waitUntil: 'networkidle0' });
    await page.waitForSelector('.rkr-rod');
    const title = await page.evaluate(() => (document.querySelector('.lcs-title') || {}).textContent || '');
    if (!title.includes(want)) FAIL(`${lang}: title "${title}" (want "${want}")`);
    else OK(`${lang}: "${title}"`);
  }

  /* ---------- H2. the bead grows on a wide board, at EVERY rack count ----
     ⭐⭐ THIS IS THE CHECK THAT GOT THE FIRST ATTEMPT AT THIS TOOL WITHDRAWN.
     Raising the card grew the BOARD and left the bead at 64px: bead fill fell
     62% -> 38%, the instrument got worse, and every measured assertion still
     passed because they all measure the apparatus BOX. The bead is what the
     child looks at, so measure the BEAD.
     Three things are asserted per cell, and the last two are why the height
     clamp exists at all: the bead is never SMALLER than it is at 1366, no two
     rods overlap (the flex `gap: pitch - d` must not go negative), and the
     apparatus does not run past the fold — a ten-rod board at an unclamped
     113px bead would stand 1500px. */
  console.log('\nH2. bead growth on a wide board');
  await page.goto(BASE + '?lang=de', { waitUntil: 'networkidle0' });
  const RACKS = [1, 2, 5, 10];
  for (const racks of RACKS) {
    const base = {};
    for (const vp of [{ width: 1366, height: 900 }, { width: 1920, height: 1080 },
      { width: 2400, height: 1150 }, { width: 2560, height: 1440 }]) {
      await page.setViewport(vp);
      await page.evaluate((n) => { Rekenrek.premium = true; Rekenrek._setRackCount(n); }, racks);
      await new Promise((r) => setTimeout(r, 260));
      const m = await page.evaluate(() => {
        const rods = [...document.querySelectorAll('.rkr-rod')];
        const beads = [...document.querySelectorAll('.rkr-bead')];
        const wrap = document.querySelector('.rkr-wrap');
        if (!rods.length || !beads.length || !wrap) return null;
        let overlap = 0;
        for (let i = 1; i < rods.length; i++) {
          const a = rods[i - 1].getBoundingClientRect(), c = rods[i].getBoundingClientRect();
          if (c.top < a.bottom - 0.5) overlap++;
        }
        return {
          rods: rods.length, beads: beads.length, overlap,
          bead: beads[0].getBoundingClientRect().width,
          rod: rods[0].getBoundingClientRect().width,
          bottom: wrap.getBoundingClientRect().bottom, vh: window.innerHeight
        };
      });
      /* rows-per-rack is TWO up to two racks and ONE thereafter — the tool's
         own _rowsFor rule. Non-vacuity before any claim about size. */
      const expRods = racks * (racks > 2 ? 1 : 2);
      if (!m || m.rods !== expRods || m.beads !== expRods * 10) {
        FAIL(`${racks} rack(s) @${vp.width}: expected ${expRods} rods / ${expRods * 10} beads, got ` +
          (m ? `${m.rods}/${m.beads}` : 'nothing') + ' — measurement void');
        continue;
      }
      if (vp.width === 1366) { base.bead = m.bead; continue; }
      const fill = Math.round(m.bead * 10 / m.rod * 100);
      /* ⚠⚠ STRICTLY LARGER, NOT "not smaller". The first version of this
         assertion said `bead >= bead@1366` and PASSED on the un-fixed build,
         where the bead is a frozen 64px at every width — the precise defect it
         was written to catch. Poison-tested against HEAD before this line was
         trusted: it now fails 12/12 there and passes 12/12 here. */
      if (m.bead <= base.bead + 0.5) FAIL(`${racks} rack(s) @${vp.width}: bead is still ${Math.round(m.bead)}px, the same as at 1366 — the board grew and the instrument did not`);
      else if (m.overlap) FAIL(`${racks} rack(s) @${vp.width}: ${m.overlap} rod(s) overlap — pitch went below the bead`);
      else if (m.bottom > m.vh + 0.5) FAIL(`${racks} rack(s) @${vp.width}: apparatus runs ${Math.round(m.bottom - m.vh)}px past the fold`);
      else OK(`${racks} rack(s) @${vp.width}: bead ${Math.round(base.bead)} -> ${Math.round(m.bead)}px, ${fill}% of the rod, fits`);
    }
  }
  await page.setViewport({ width: 1024, height: 768 });

  /* ---------- I. console ---------- */
  console.log('\nI. console');
  const realErrors = consoleErrors.filter(e => !/favicon|404|Failed to load resource/.test(e));
  if (realErrors.length) FAIL(`console errors: ${realErrors.slice(0, 4).join(' | ')}`);
  else OK('console clean');

  await browser.close();
  server.close();
  console.log('\n' + (fails.length ? `FAIL — ${fails.length} failure(s)` : 'PASS — rekenrek DoD green'));
  process.exit(fails.length ? 1 : 0);
})().catch(e => { console.error('HARNESS CRASH:', e); process.exit(1); });
