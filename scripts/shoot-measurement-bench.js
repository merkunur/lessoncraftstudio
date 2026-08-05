#!/usr/bin/env node
/* =====================================================================
   shoot-measurement-bench.js — renders of the bench for the eye.
   Not a gate: the gates measure, this exists so a human (and the visual
   critic) can READ the result. Writes to docs/audit-results/measurement-bench/qa/.

   node scripts/shoot-measurement-bench.js [--w=1024] [--h=768]
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const REPO = path.join(__dirname, '..');
const MT = path.join(REPO, 'mini tools');
const PUB = path.join(REPO, 'frontend', 'public');
const OUT = path.join(REPO, 'docs', 'audit-results', 'measurement-bench', 'qa');
const PORT = 5733;
const TYPES = { '.js': 'text/javascript', '.css': 'text/css', '.html': 'text/html', '.json': 'application/json', '.webp': 'image/webp', '.png': 'image/png' };

const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? +a.split('=')[1] : d; };

const srv = http.createServer((req, res) => {
  const u = decodeURIComponent(req.url.split('?')[0]);
  let f = null;
  if (u.startsWith('/mini-tools/')) f = path.join(MT, u.slice('/mini-tools/'.length));
  else if (u.startsWith('/image-library-webp/')) f = path.join(PUB, u.slice(1));
  if (f && fs.existsSync(f) && fs.statSync(f).isFile()) {
    res.writeHead(200, { 'Content-Type': TYPES[path.extname(f)] || 'application/octet-stream' });
    return res.end(fs.readFileSync(f));
  }
  res.writeHead(404); res.end('x');
});

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  await new Promise((r) => srv.listen(PORT, r));
  const b = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const W = arg('w', 1024), H = arg('h', 768);

  const open = async (q) => {
    const p = await b.newPage();
    await p.setViewport({ width: W, height: H });
    await p.goto(`http://127.0.0.1:${PORT}/mini-tools/measurement-bench.html${q || ''}`, { waitUntil: 'networkidle0' });
    await new Promise((r) => setTimeout(r, 550));
    return p;
  };
  const shot = (p, n) => p.screenshot({ path: path.join(OUT, n + '.png') });

  /* ── the cube chain: a PERFECTLY laid chain must TOUCH.
        This is the shot that proves the art fills the lattice pitch. ── */
  let p = await open();
  await p.evaluate(() => {
    const T = window.MeasurementBench;
    T.unit = 'cube';
    T.lenIdx = T.LENGTH_OBJECTS.findIndex((o) => o.w === 450);   /* the longest run */
    T.render();
    const need = T.LENGTH_OBJECTS[T.lenIdx].w / T.UNITS.cube.w;
    T.placed = [];
    for (let i = 0; i < need; i++) T.placed.push(T._lenX0 + i * T.UNITS.cube.w);
    T.render();
  });
  await new Promise((r) => setTimeout(r, 350));
  await shot(p, 'U-cube-chain-perfect');
  /* measure the seam between neighbours, in DEVICE pixels */
  const seam = await p.evaluate(() => {
    const us = [...document.querySelectorAll('.mb-unit.laid')].map((e) => e.getBoundingClientRect()).sort((a, b) => a.left - b.left);
    const g = [];
    for (let i = 1; i < us.length; i++) g.push(+(us[i].left - us[i - 1].right).toFixed(2));
    const svg = document.querySelector('.mb-unit.laid .mb-u');
    const r = svg ? svg.getBoundingClientRect() : null;
    return { n: us.length, gaps: g, drawnW: r ? +r.width.toFixed(2) : 0, cellW: us.length > 1 ? +(us[1].left - us[0].left).toFixed(2) : 0 };
  });
  console.log('cube chain: n=' + seam.n + '  cell=' + seam.cellW + 'px  drawn=' + seam.drawnW + 'px  gaps=' + JSON.stringify(seam.gaps.slice(0, 6)));
  console.log('  => art fills ' + (seam.cellW ? (100 * seam.drawnW / seam.cellW).toFixed(1) : '?') + '% of the lattice pitch');
  await p.close();

  /* clip chain, for the same reason */
  p = await open();
  await p.evaluate(() => {
    const T = window.MeasurementBench;
    T.unit = 'clip'; T.lenIdx = 0; T.render();
    const need = T.LENGTH_OBJECTS[0].w / T.UNITS.clip.w;
    T.placed = []; for (let i = 0; i < need; i++) T.placed.push(T._lenX0 + i * T.UNITS.clip.w);
    T.render();
  });
  await new Promise((r) => setTimeout(r, 300));
  await shot(p, 'U-clip-chain-perfect');
  await p.close();

  /* ── capacity: the two named defects, DRIVEN ────────────────────────
     (a) the source must tip TOWARD the target, both ways
     (b) the bench must reach a next problem                            */
  p = await open('?bench=capacity');
  await p.evaluate(() => { const T = window.MeasurementBench; T.premium = true; T.render(); });
  await new Promise((r) => setTimeout(r, 400));

  const rot = (el) => {
    const m = new DOMMatrixReadOnly(getComputedStyle(el).transform);
    return +(Math.atan2(m.b, m.a) * 180 / Math.PI).toFixed(2);
  };
  const press = async (sel, ms) => {
    const box = await p.$(sel);
    const bb = await box.boundingBox();
    await p.mouse.move(bb.x + bb.width / 2, bb.y + bb.height / 2);
    await p.mouse.down();
    await new Promise((r) => setTimeout(r, ms));
  };

  await p.exposeFunction('rotOf', () => 0);
  /* rightward pour: jug -> tall */
  await press('.mb-vessel[data-vessel="jug"]', 900);
  const right = await p.evaluate(() => {
    const b = document.querySelector('.mb-vessel[data-vessel="jug"] .mb-vbody');
    const m = new DOMMatrixReadOnly(getComputedStyle(b).transform);
    return {
      deg: +(Math.atan2(m.b, m.a) * 180 / Math.PI).toFixed(2),
      stream: !!document.querySelector('.mb-stream'),
      origin: getComputedStyle(b).transformOrigin
    };
  });
  await shot(p, 'U-pour-right');
  await p.mouse.up();
  await new Promise((r) => setTimeout(r, 400));

  /* leftward pour: tall -> jug */
  await press('.mb-vessel[data-vessel="tall"]', 800);
  const left = await p.evaluate(() => {
    const b = document.querySelector('.mb-vessel[data-vessel="tall"] .mb-vbody');
    const m = new DOMMatrixReadOnly(getComputedStyle(b).transform);
    return { deg: +(Math.atan2(m.b, m.a) * 180 / Math.PI).toFixed(2), stream: !!document.querySelector('.mb-stream') };
  });
  await shot(p, 'U-pour-left');
  await p.mouse.up();
  await new Promise((r) => setTimeout(r, 300));

  console.log('POUR jug->tall (target is to the RIGHT): ' + right.deg + 'deg  stream=' + right.stream + '  origin=' + right.origin);
  console.log('POUR tall->jug (target is to the LEFT ): ' + left.deg + 'deg  stream=' + left.stream);
  console.log(right.deg > 2 ? '  ok   rightward pour tips CLOCKWISE (toward the target)' : '  FAIL rightward pour does not tip toward its target');
  console.log(left.deg < -2 ? '  ok   leftward pour tips COUNTER-clockwise (toward the target)' : '  FAIL leftward pour does not tip toward its target');

  /* can BOTH beakers be filled from one jug? and is there a next problem? */
  const cap = await p.evaluate(() => {
    const T = window.MeasurementBench;
    const V = T.VESSELS;
    const before = T.capPair;
    T._nextPair();
    return {
      jugStart: V.jug.start, tall: V.tall.cap, wide: V.wide.cap,
      bothFillable: V.jug.start >= V.tall.cap + V.wide.cap,
      pairs: T.CAP_PAIRS.length, advanced: T.capPair !== before
    };
  });
  console.log('CAPACITY jug start ' + cap.jugStart + ' vs tall ' + cap.tall + ' + wide ' + cap.wide +
    '  bothFillable=' + cap.bothFillable + '  pairs=' + cap.pairs + '  nextPair advances=' + cap.advanced);
  await shot(p, 'U-capacity');
  await p.close();

  p = await open('?bench=weight');
  await p.evaluate(() => { const T = window.MeasurementBench; T.premium = true; T.render(); });
  await new Promise((r) => setTimeout(r, 500));
  await shot(p, 'U-weight');
  await p.close();

  await b.close(); srv.close();
  console.log('renders -> ' + OUT);
})();
