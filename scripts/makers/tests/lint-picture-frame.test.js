#!/usr/bin/env node
/**
 * Test: the page lint "picture outside its frame" (qa/lints.js 2b, 2026-11-05 — Growing Patterns' groups ran out of
 * their answer circles) fires on a picture that leaves its frame and stays silent on the layouts the catalogue really
 * uses. Each case is its own small page, run through runLints in Chrome; only the frame lint's lines are read.
 *
 *   must fire: a picture bigger than its circle · a picture pushed out of a square frame · a clipping window (a puzzle
 *              piece) that itself sticks out of its frame · a group of pictures wider than its circle
 *   must pass: a picture filling a square frame with rounded corners (G1-380, G2-333 — the box's transparent corners
 *              reach into the rounding) · a picture well inside a circle · a large picture behind a small overflow:hidden
 *              window inside its frame (K-469, K-470, K-069, G2-235 — placed by its ink) · a picture whose only bordered
 *              ancestor is the fourth one up (not a frame: round 12 refused 6 templates against unchecked wrappers)
 *
 *   node scripts/makers/tests/lint-picture-frame.test.js
 */
'use strict';
const path = require('path');
const REPO = path.resolve(__dirname, '..', '..', '..');
const puppeteer = require(path.join(REPO, 'node_modules', 'puppeteer'));
const { runLints } = require(path.join(REPO, 'scripts', 'worksheet-gen', 'qa', 'lints.js'));
const T = require(path.join(REPO, 'scripts', 'worksheet-gen', 'primitives', '_tokens.js')).color;

const PIC = 'data:image/svg+xml;base64,' + Buffer.from('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="#F2784B"/></svg>').toString('base64');
const img = (s) => `<img class="ws-icon" src="${PIC}" alt="" style="display:block;${s}">`;
const B = `border:2px solid ${T.grid};box-sizing:border-box`;
const frame = (s, inner) => `<div style="${B};${s}">${inner}</div>`;

const CASES = [
  // must fire
  { fire: true, name: 'picture bigger than its circle', html: frame('width:94px;height:94px;border-radius:50%;display:flex;align-items:center;justify-content:center', img('width:120px;height:120px;flex:0 0 auto')) },
  { fire: true, name: 'picture pushed out of a square frame', html: frame('width:80px;height:80px;position:relative', img('position:absolute;left:24px;top:0;width:76px;height:76px')) },
  { fire: true, name: 'clipping window sticking out of its frame', html: frame('width:110px;height:110px;position:relative', `<span style="position:absolute;left:30px;top:3px;width:100px;height:100px;overflow:hidden">${img('position:absolute;left:-100px;top:-100px;width:300px;height:300px')}</span>`) },
  { fire: true, name: 'group wider than its circle', html: frame('width:94px;height:94px;border-radius:50%;display:flex;align-items:center;justify-content:center;gap:2px', [1, 2, 3, 4].map(() => img('width:40px;height:40px;flex:0 0 auto')).join('')) },
  // must pass
  { fire: false, name: 'picture filling a rounded square (G1-380)', html: frame('width:72px;height:72px;border-radius:12px;padding:2px', img('width:64px;height:64px')) },
  { fire: false, name: 'picture inside a circle', html: frame('width:94px;height:94px;border-radius:50%;display:flex;align-items:center;justify-content:center', img('width:68px;height:68px;flex:0 0 auto')) },
  { fire: false, name: 'large picture behind a small window (K-470)', html: frame('width:110px;height:110px;position:relative', `<span style="position:absolute;left:3px;top:3px;width:100px;height:100px;overflow:hidden">${img('position:absolute;left:-100px;top:-100px;width:300px;height:300px')}</span>`) },
  { fire: false, name: 'bordered fourth ancestor is not a frame', html: frame('width:60px;height:60px;position:relative', '<div><div><div>' + img('position:absolute;left:40px;top:40px;width:60px;height:60px') + '</div></div></div>') },
];

(async () => {
  const b = await puppeteer.launch();
  let fails = 0;
  try {
    const p = await b.newPage();
    await p.setViewport({ width: 800, height: 1000 });
    for (const c of CASES) {
      await p.setContent(`<!doctype html><html><body style="margin:0"><div data-lcs-page class="ws-page" style="position:relative;width:703px;height:945px;padding:40px;box-sizing:border-box">${c.html}</div></body></html>`, { waitUntil: 'load' });
      const got = (await runLints(p, { gradeBand: 'K' })).filter((f) => /outside its frame/.test(f));
      const ok = c.fire ? got.length > 0 : got.length === 0;
      if (!ok) fails++;
      console.log(`${ok ? 'ok  ' : 'FAIL'} ${c.fire ? 'fires' : 'quiet'}: ${c.name}${got.length ? ' — ' + got.length + ' line(s)' : ''}`);
    }
  } finally { await b.close(); }
  console.log(fails ? `${fails} case(s) wrong` : `all ${CASES.length} cases right`);
  process.exit(fails ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
