#!/usr/bin/env node
/* =====================================================================
   local-test-center-board.js — the local DoD for Center Board
   (mini tools/center-board.html).

   Serves `mini tools/` locally (and stubs /api/qr with a tiny PNG), then:
     A. viewport sweep — no overflow, taps ≥44px, FITS at 1024×768 with
        the 6×6 premium board
     B. ROTATION INVARIANTS: perm is a bijection after every rotation;
        k rotations = identity — INCLUDING after a drag override (the
        swap primitive); groups<stations leaves exactly k−n resting
        stations; the (groups>stations) add is blocked with the nudge
     C. the round timer: end cue exactly once + the glow state + NO
        rotation at 0:00 without a tap; reload mid-round resumes;
        reload-after-end is silent
     D. My Classes import: cups→groups order-stable with memberNames;
        an injected unknown my-classes key survives (round-trip)
     E. link rules: rejects http / foreign / lookalike hosts; accepts +
        www-normalizes apex; QR badge only when a link is set; link
        paste gated for free
     F. free seams: 3rd station + 3rd team gated; the solo board lives
        in sessionStorage (gone in a new session)
     G. voice spy: "Time to rotate!" spoken on tap (premium), never
        before a gesture
     H. no-PII: no roster name in any request URL/body or station link
     I. dateKey roll: a stale day resets perm/round/timer, keeps setup
     J. lang smoke de + fi · console clean
   Screenshots → docs/audit-results/center-board/qa/
   Exit 1 on any FAIL.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const OUT = path.join(REPO, 'docs', 'audit-results', 'center-board', 'qa');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.png': 'image/png' };
const NAMES = ['Zzyzx', 'Qorvax', 'Blinta', 'Marzupi', 'Fennwick', 'Ostrella', 'Puckhart', 'Vintaro'];
/* a 1x1 PNG for the /api/qr stub */
const PNG1 = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==', 'base64');

function serve() {
  return http.createServer((req, res) => {
    let p = decodeURIComponent(req.url.split('?')[0]);
    if (p === '/') p = '/center-board.html';
    if (p === '/api/qr') { res.setHeader('Content-Type', 'image/png'); res.end(PNG1); return; }
    const file = p.startsWith('/mini-tools/') ? path.join(MINI, p.slice('/mini-tools/'.length)) : path.join(MINI, p.replace(/^\//, ''));
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

async function forcePremium(page, opts) {
  await page.evaluate((names, opts) => {
    localStorage.setItem('lcs:center-board:v1', JSON.stringify({ v: 1, ent: { tier: 'full', checkedAt: new Date().toISOString() }, boards: {} }));
    localStorage.setItem('accessToken', 'test-token');
    const mc = {
      v: 1, activeClassId: 'c_test',
      classes: [{ id: 'c_test', name: 'Room 4B', students: names.map((n, i) => ({ id: 's_' + i, name: n })), createdAt: 1, updatedAt: 1 }],
      fairness: {},
      groupings: opts && opts.grouping ? { c_test: { cups: [['s_0', 's_1'], ['s_2', 's_3'], ['s_4', 's_5'], ['s_6', 's_7']], madeAt: Date.now(), sentBy: 'name-sticks' } } : {},
      __futureToolField: { keep: 'me' },
    };
    localStorage.setItem('lcs:my-classes:v1', JSON.stringify(mc));
  }, NAMES, opts || {});
}

/* build an n-station, g-group premium board directly */
async function seedBoard(page, nStations, nGroups) {
  await page.evaluate((n, g) => {
    const b = CenterBoard.board;
    const icons = CenterBoard.ICON_KEYS;
    b.stations = [];
    for (let i = 0; i < n; i++) b.stations.push({ id: 'st_' + i, icon: icons[i % 12], name: 'S' + i });
    b.groups = [];
    for (let i = 0; i < g; i++) b.groups.push({ id: 'g_' + i, teamIdx: i % 6, name: null });
    b.perm = b.groups.map((_, i) => i % n);
    const seen = {};
    b.perm = b.perm.map(p => { while (seen[p]) p = (p + 1) % n; seen[p] = true; return p; });
    b.round = 1;
    b.roundsTotal = n;
    CenterBoard._save();
    CenterBoard.render();
  }, nStations, nGroups);
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const server = serve();
  await new Promise(r => server.listen(0, r));
  const PORT = server.address().port;
  const BASE = `http://127.0.0.1:${PORT}/mini-tools/center-board.html`;

  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  const consoleErrors = [];
  const networkSins = [];
  page.on('console', m => { if (m.type() === 'error') consoleErrors.push(m.text()); });
  page.on('pageerror', e => consoleErrors.push('pageerror: ' + e.message));
  page.on('request', req => {
    const hay = (req.url() + ' ' + (req.postData() || '')).toLowerCase();
    for (const n of NAMES) if (hay.includes(n.toLowerCase())) networkSins.push(`${n} in ${req.url().slice(0, 80)}`);
  });
  await page.evaluateOnNewDocument(() => {
    window.__spoken = [];
    if (window.speechSynthesis) window.speechSynthesis.speak = function (u) { window.__spoken.push({ text: u.text, lang: u.lang }); };
  });

  /* ---------- A. sweep + FITS at 6×6 ---------- */
  console.log('\nA. viewport sweep (premium 6×6)');
  await page.goto(BASE + '?lang=en', { waitUntil: 'networkidle0' });
  await forcePremium(page);
  const VIEWPORTS = [
    { w: 320, h: 640 }, { w: 360, h: 740 }, { w: 412, h: 820 }, { w: 768, h: 1000 },
    { w: 1024, h: 768, fits: true }, { w: 1024, h: 900, fits: true }, { w: 1366, h: 768, fits: true },
  ];
  for (const vp of VIEWPORTS) {
    await page.setViewport({ width: vp.w, height: vp.h });
    await page.goto(BASE + '?lang=en', { waitUntil: 'networkidle0' });
    await page.waitForSelector('.cbd-station', { timeout: 8000 }).catch(() => null);
    await seedBoard(page, 6, 6);
    await sleep(150);
    const m = await page.evaluate(() => {
      const overflow = document.documentElement.scrollWidth - window.innerWidth;
      const small = [];
      for (const s of ['.cbd-chip', '.cbd-big']) {
        document.querySelectorAll(s).forEach(el => {
          const r = el.getBoundingClientRect();
          if (r.width && r.height < 43) small.push(`${s} ${Math.round(r.height)}h`);
        });
      }
      const last = [...document.querySelectorAll('.cbd-wrap > *')].pop();
      return { overflow, small, stations: document.querySelectorAll('.cbd-station').length, cards: document.querySelectorAll('.cbd-groupcard').length, bottom: last ? last.getBoundingClientRect().bottom : 0, vh: window.innerHeight };
    });
    const tag = `${vp.w}x${vp.h}`;
    let bad = false;
    if (m.overflow > 1) { FAIL(`${tag}: overflow ${m.overflow}px`); bad = true; }
    if (m.small.length) { FAIL(`${tag}: small taps ${[...new Set(m.small)].slice(0, 3)}`); bad = true; }
    if (m.stations !== 6 || m.cards !== 6) { FAIL(`${tag}: 6×6 board wrong (${m.stations}/${m.cards})`); bad = true; }
    if (vp.fits && m.bottom > m.vh + 1) { FAIL(`${tag}: ${Math.round(m.bottom)} > ${m.vh} (FITS)`); bad = true; }
    if (!bad) OK(`${tag}: fits (bottom ${Math.round(m.bottom)}/${m.vh})`);
    if (vp.w === 360) await page.screenshot({ path: path.join(OUT, 'sweep-360.png'), fullPage: true });
    if (vp.w === 768 && vp.h === 1000) await page.screenshot({ path: path.join(OUT, 'sweep-768.png'), fullPage: true });
  }

  /* ---------- B. rotation invariants ---------- */
  console.log('\nB. rotation invariants');
  await page.setViewport({ width: 1024, height: 768 });
  await page.goto(BASE + '?lang=en', { waitUntil: 'networkidle0' });
  await page.waitForSelector('.cbd-station');
  await seedBoard(page, 4, 4);
  await page.screenshot({ path: path.join(OUT, 'board-4x4-1024x768.png') });

  const inv = await page.evaluate(() => {
    const b = CenterBoard.board;
    const start = b.perm.slice();
    const results = { bijections: true, identity: false };
    for (let r = 0; r < 4; r++) {
      CenterBoard._rotate();
      const set = new Set(b.perm);
      if (set.size !== b.perm.length) results.bijections = false;
    }
    results.identity = JSON.stringify(b.perm) === JSON.stringify(start);
    return results;
  });
  if (!inv.bijections || !inv.identity) FAIL(`ring: bijections=${inv.bijections} identity=${inv.identity}`);
  else OK('4 rotations: bijection each round, identity after k');

  /* override then k rotations */
  const inv2 = await page.evaluate(() => {
    const b = CenterBoard.board;
    b.round = 1;
    CenterBoard._moveGroupToStation(0, b.perm[2]);   /* swap groups 0 and 2 */
    const afterSwap = b.perm.slice();
    const set0 = new Set(afterSwap);
    let allBiject = set0.size === afterSwap.length;
    for (let r = 0; r < 4; r++) {
      CenterBoard._rotate();
      const s = new Set(b.perm);
      if (s.size !== b.perm.length) allBiject = false;
    }
    return { allBiject, identity: JSON.stringify(b.perm) === JSON.stringify(afterSwap) };
  });
  if (!inv2.allBiject || !inv2.identity) FAIL(`override ring: biject=${inv2.allBiject} identity=${inv2.identity}`);
  else OK('drag override swaps; the ring stays intact (k rotations = the overridden config)');

  /* groups < stations: resting stations */
  await seedBoard(page, 5, 3);
  const rest = await page.evaluate(() => document.querySelectorAll('.cbd-well.empty').length);
  if (rest !== 2) FAIL(`groups<stations: ${rest} resting (want 2)`);
  else OK('3 groups on 5 stations → exactly 2 resting');

  /* groups > stations blocked */
  await seedBoard(page, 2, 2);
  await page.evaluate(() => CenterBoard._openPanel());
  await sleep(200);
  const nudge = await page.evaluate(() => {
    const btns = [...document.querySelectorAll('.cbd-panel button')];
    const addG = btns.filter(b => b.textContent.includes('+'))[1];   /* second + = add team */
    addG.click();
    return new Promise(r => setTimeout(() => r({
      groups: CenterBoard.board.groups.length,
      nudge: !!document.querySelector('.cbd-panel .cbd-gate'),
    }), 150));
  });
  if (nudge.groups !== 2 || !nudge.nudge) FAIL(`groups>stations: groups=${nudge.groups} nudge=${nudge.nudge}`);
  else OK('a 3rd team on 2 stations is blocked with the merge nudge');
  await page.evaluate(() => { CenterBoard._closePanel(); CenterBoard.render(); });

  /* ---------- C. the round timer ---------- */
  console.log('\nC. round timer');
  await seedBoard(page, 4, 4);
  await page.evaluate(() => {
    window.__lcsBoardLog = [];
    CenterBoard.board.timer.duration = 2;
    CenterBoard._startTimer();
  });
  await sleep(500);
  let tst = await page.evaluate(() => ({ phase: CenterBoard.board.timer.phase, round: CenterBoard.board.round }));
  if (tst.phase !== 'running') FAIL(`timer start: ${tst.phase}`);
  await sleep(2400);
  tst = await page.evaluate(() => ({
    phase: CenterBoard.board.timer.phase,
    round: CenterBoard.board.round,
    ends: window.__lcsBoardLog.filter(l => l.ev === 'roundend').length,
    glow: !!document.querySelector('.cbd-rotate.glow'),
    rotates: window.__lcsBoardLog.filter(l => l.ev === 'rotate').length,
  }));
  if (tst.phase !== 'done' || tst.ends !== 1) FAIL(`timer end: phase=${tst.phase} ends=${tst.ends}`);
  else if (!tst.glow) FAIL('no glow at 0:00');
  else if (tst.rotates !== 0 || tst.round !== 1) FAIL(`AUTO-ROTATE DETECTED: rotates=${tst.rotates} round=${tst.round}`);
  else OK('0:00 → glow prompt, exactly one end cue, NO auto-rotate');
  await page.screenshot({ path: path.join(OUT, 'glow-1024x768.png') });

  /* reload mid-round resumes */
  await page.evaluate(() => { CenterBoard.board.timer.duration = 60; CenterBoard._startTimer(); });
  await sleep(2000);
  await page.reload({ waitUntil: 'networkidle0' });
  await page.waitForSelector('.cbd-station');
  const res = await page.evaluate(() => ({ phase: CenterBoard.board.timer.phase, rem: CenterBoard._timerRemaining() }));
  if (res.phase !== 'running' || res.rem < 52000 || res.rem > 59000) FAIL(`resume: phase=${res.phase} rem=${res.rem}`);
  else OK(`reload mid-round resumes (${Math.round(res.rem / 1000)}s left)`);
  /* finished-while-away silent */
  await page.evaluate(() => {
    const st = JSON.parse(localStorage.getItem('lcs:center-board:v1'));
    st.boards.c_test.timer = { phase: 'running', duration: 60, endAt: Date.now() - 5000, remainingAtPause: null, oneMinFired: false, endFired: false };
    localStorage.setItem('lcs:center-board:v1', JSON.stringify(st));
  });
  await page.reload({ waitUntil: 'networkidle0' });
  await page.waitForSelector('.cbd-station');
  await sleep(600);
  const away = await page.evaluate(() => ({
    phase: CenterBoard.board.timer.phase,
    cues: (window.__lcsBoardLog || []).filter(l => l.ev === 'roundend' || l.ev === 'chime').length,
  }));
  if (away.phase !== 'done' || away.cues !== 0) FAIL(`away-end: phase=${away.phase} cues=${away.cues}`);
  else OK('finished-while-away renders done silently');

  /* ---------- D. My Classes import ---------- */
  console.log('\nD. My Classes import');
  await page.evaluate(() => localStorage.clear());
  await page.goto(BASE + '?lang=en', { waitUntil: 'networkidle0' });
  await forcePremium(page, { grouping: true });
  await page.goto(BASE + '?lang=en', { waitUntil: 'networkidle0' });
  await page.waitForSelector('.cbd-station');
  await seedBoard(page, 4, 0);
  await page.evaluate(() => CenterBoard._openPanel());
  await sleep(200);
  const imp = await page.evaluate(() => {
    const chip = [...document.querySelectorAll('.cbd-panel button')].find(b => /Name Sticks/i.test(b.textContent));
    if (!chip) return { err: 'no import chip' };
    chip.click();
    return new Promise(r => setTimeout(() => {
      const b = CenterBoard.board;
      const mc = JSON.parse(localStorage.getItem('lcs:my-classes:v1'));
      r({
        groups: b.groups.length,
        firstMembers: (b.groups[0] || {}).memberNames,
        perm: b.perm.slice(),
        future: mc.__futureToolField && mc.__futureToolField.keep === 'me',
        groupingIntact: mc.groupings.c_test && mc.groupings.c_test.sentBy === 'name-sticks',
      });
    }, 200));
  });
  if (imp.err || imp.groups !== 4) FAIL(`import: ${JSON.stringify(imp).slice(0, 120)}`);
  else if (!imp.firstMembers || imp.firstMembers.join(',') !== 'Zzyzx,Qorvax') FAIL(`import members: [${imp.firstMembers}]`);
  else if (new Set(imp.perm).size !== 4) FAIL(`import perm not bijective: [${imp.perm}]`);
  else if (!imp.future || !imp.groupingIntact) FAIL(`my-classes round-trip: future=${imp.future} grouping=${imp.groupingIntact}`);
  else OK('import maps 4 cups order-stable w/ members; my-classes unknown keys + grouping intact');
  await page.evaluate(() => { CenterBoard._closePanel(); CenterBoard.render(); });
  await sleep(150);
  await page.screenshot({ path: path.join(OUT, 'imported-teams-1024x768.png') });

  /* ---------- E. link rules ---------- */
  console.log('\nE. link rules');
  const links = await page.evaluate(() => ({
    http: CenterBoard._validLink('http://www.lessoncraftstudio.com/en/tools/rekenrek'),
    foreign: CenterBoard._validLink('https://evil.com/x'),
    lookalike: CenterBoard._validLink('https://lessoncraftstudio.com.evil.com/x'),
    apex: CenterBoard._validLink('https://lessoncraftstudio.com/en/tools/rekenrek'),
    good: CenterBoard._validLink('https://www.lessoncraftstudio.com/en/tools/rekenrek'),
  }));
  if (links.http || links.foreign || links.lookalike) FAIL(`link accepts bad: ${JSON.stringify(links)}`);
  else if (!links.apex || !links.apex.startsWith('https://www.lessoncraftstudio.com/')) FAIL(`apex normalize: ${links.apex}`);
  else if (!links.good) FAIL('good link rejected');
  else OK('rejects http/foreign/lookalike; apex → www; good accepted');
  /* QR badge only with a link */
  const badge = await page.evaluate(() => {
    const b = CenterBoard.board;
    const before = document.querySelectorAll('.cbd-qrbadge').length;
    b.stations[0].link = 'https://www.lessoncraftstudio.com/en/tools/rekenrek';
    CenterBoard.render();
    const after = document.querySelectorAll('.cbd-qrbadge').length;
    return { before, after };
  });
  if (badge.before !== 0 || badge.after !== 1) FAIL(`QR badge: ${JSON.stringify(badge)}`);
  else OK('QR badge renders only for the linked station');
  await page.evaluate(() => document.querySelector('.cbd-qrbadge').click());
  await sleep(300);
  const qrOpen = await page.evaluate(() => !!document.querySelector('.cbd-qrcard img'));
  if (!qrOpen) FAIL('QR overlay missing');
  else OK('QR overlay opens with the image + copy/print');
  await page.screenshot({ path: path.join(OUT, 'qr-overlay-1024x768.png') });
  await page.evaluate(() => document.querySelector('.cbd-qrscrim').remove());

  /* setup panel screenshot */
  await page.evaluate(() => CenterBoard._openPanel());
  await sleep(250);
  await page.screenshot({ path: path.join(OUT, 'panel-1024x768.png') });
  await page.evaluate(() => { CenterBoard._closePanel(); CenterBoard.render(); });

  /* ---------- F. free seams ---------- */
  console.log('\nF. free seams');
  const page2 = await browser.newPage();
  await page2.setViewport({ width: 1024, height: 768 });
  await page2.goto(BASE + '?lang=en', { waitUntil: 'networkidle0' });
  await page2.evaluate(() => localStorage.clear());
  await page2.goto(BASE + '?lang=en', { waitUntil: 'networkidle0' });
  await page2.waitForSelector('.cbd-station');
  const free = await page2.evaluate(() => {
    CenterBoard._openPanel();
    return new Promise(r => setTimeout(() => {
      const btns = [...document.querySelectorAll('.cbd-panel button')];
      const addSt = btns.find(b => b.textContent.includes('+'));
      addSt.click();
      setTimeout(() => {
        const gate1 = !!document.querySelector('.cbd-panel .cbd-gate');
        const stCount = CenterBoard.board.stations.length;
        r({ gate1, stCount });
      }, 150);
    }, 200));
  });
  if (!free.gate1 || free.stCount !== 2) FAIL(`free 3rd station: gate=${free.gate1} count=${free.stCount}`);
  else OK('3rd station gated for free');
  /* link paste gated free */
  const freeLink = await page2.evaluate(() => {
    const linkIn = [...document.querySelectorAll('.cbd-panel .cbd-input.sub')].filter(i => i.placeholder.includes('link') || i.placeholder.includes('Link') || i.placeholder.includes('lien') || i.placeholder.includes('enlace'))[0]
      || [...document.querySelectorAll('.cbd-panel .cbd-input.sub')][1];
    linkIn.value = 'https://www.lessoncraftstudio.com/en/tools/rekenrek';
    linkIn.dispatchEvent(new Event('change'));
    return new Promise(r => setTimeout(() => r({
      link: CenterBoard.board.stations[0].link || null,
      gate: !!document.querySelector('.cbd-panel .cbd-gate'),
    }), 150));
  });
  if (freeLink.link || !freeLink.gate) FAIL(`free link paste: link=${freeLink.link} gate=${freeLink.gate}`);
  else OK('link paste gated for free');
  /* solo board is session-scoped */
  await page2.evaluate(() => { CenterBoard._closePanel(); CenterBoard.board.stations[0].name = 'MARKER'; CenterBoard._save(); });
  const page3 = await browser.newPage();
  await page3.goto(BASE + '?lang=en', { waitUntil: 'networkidle0' });
  await page3.waitForSelector('.cbd-station');
  const soloGone = await page3.evaluate(() => CenterBoard.board.stations[0].name);
  if (soloGone === 'MARKER') FAIL('solo board leaked across sessions');
  else OK('free solo board evaporates in a new session');
  await page3.close();
  await page2.close();

  /* ---------- G. voice ---------- */
  console.log('\nG. voice');
  await page.bringToFront();
  const preGesture = await page.evaluate(() => window.__spoken.length);
  await page.evaluate(() => { window.__spoken.length = 0; });
  await page.evaluate(() => document.querySelector('.cbd-rotate').click());
  await sleep(500);
  const spoke = await page.evaluate(() => window.__spoken.slice());
  if (!spoke.some(s => /rotate/i.test(s.text))) FAIL(`rotate voice: [${spoke.map(s => s.text)}]`);
  else OK(`rotate speaks "${spoke[0].text}"`);

  /* ---------- H. no-PII ---------- */
  console.log('\nH. no-PII');
  const linkPII = await page.evaluate((names) => {
    const hay = JSON.stringify(CenterBoard.board.stations.map(s => s.link || ''));
    return names.filter(n => hay.includes(n));
  }, NAMES);
  if (networkSins.length || linkPII.length) FAIL(`PII: net=[${networkSins.slice(0, 2)}] links=[${linkPII}]`);
  else OK('zero roster names in network traffic or station links');

  /* ---------- I. dateKey roll ---------- */
  console.log('\nI. dateKey roll');
  const roll = await page.evaluate(() => {
    const b = CenterBoard.board;
    b.perm = b.perm.map((p, i) => (p + 2) % b.stations.length);
    const seen = {};
    b.perm = b.perm.map(p => { while (seen[p]) p = (p + 1) % b.stations.length; seen[p] = true; return p; });
    b.round = 3;
    b.dateKey = '2001-1-1';
    CenterBoard._save();
    const stationCount = b.stations.length;
    CenterBoard._dayRoll();
    return {
      round: b.round,
      identity: JSON.stringify(b.perm) === JSON.stringify(b.groups.map((_, i) => i)),
      keptStations: b.stations.length === stationCount,
      timerIdle: b.timer.phase === 'idle',
    };
  });
  if (roll.round !== 1 || !roll.identity || !roll.keptStations || !roll.timerIdle) FAIL(`day roll: ${JSON.stringify(roll)}`);
  else OK('a new local day resets perm/round/timer, keeps the setup');

  /* done-state screenshot */
  await page.evaluate(() => {
    CenterBoard.board.round = CenterBoard._roundsTotal() + 1;
    CenterBoard.render();
  });
  await sleep(150);
  await page.screenshot({ path: path.join(OUT, 'done-1024x768.png') });

  /* ---------- J. lang smoke + console ---------- */
  console.log('\nJ. lang smoke + console');
  for (const [lang, want] of [['de', 'Stationen-Tafel'], ['fi', 'Työpistetaulu']]) {
    await page.goto(BASE + '?lang=' + lang, { waitUntil: 'networkidle0' });
    await page.waitForSelector('.cbd-station');
    const title = await page.evaluate(() => (document.querySelector('.lcs-title') || {}).textContent || '');
    if (!title.includes(want)) FAIL(`${lang}: "${title}"`);
    else OK(`${lang}: "${title}"`);
  }
  const realErrors = consoleErrors.filter(e => !/favicon|404|Failed to load resource/.test(e));
  if (realErrors.length) FAIL(`console: ${realErrors.slice(0, 4).join(' | ')}`);
  else OK('console clean');

  await browser.close();
  server.close();
  console.log('\n' + (fails.length ? `FAIL — ${fails.length} failure(s)` : 'PASS — center-board DoD green'));
  process.exit(fails.length ? 1 : 0);
})().catch(e => { console.error('HARNESS CRASH:', e); process.exit(1); });
