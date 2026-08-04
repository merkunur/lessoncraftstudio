#!/usr/bin/env node
/* =====================================================================
   measure-place-value-lab-ratios.js — THE BASELINE, and it asserts
   NOTHING.

   §23.6: "A 'LAW' THE DESIGN ASSUMES MUST BE MEASURED BEFORE IT IS
   GATED, AND A THRESHOLD YOU INVENTED IS NOT A MEASUREMENT."

   `place-value-lab.js` carries a comment claiming "a rod stays exactly
   ten cubes tall and a flat exactly ten rods wide, which is the entire
   point of the instrument" — and in the next breath admits "NOTHING in
   the gate suite measures 'is a flat still ten rods'".

   Reading the CSS says rod/cube = 4.318 and flat/rod = 3.528. That is
   arithmetic on a stylesheet, not a measurement of the instrument. This
   file renders the tool and reads real layout boxes, so that:
     (a) the numbers the rebuild is justified by are MEASURED, and
     (b) the ten-ness gate shipping with the fix can be poison-tested
         against a build that PROVABLY fails it.

   It also resolves --pvl-u at each width, because the claim that it is
   declared only inside @media (min-width:1367px) — and therefore falls
   back to a hardcoded 44px everywhere else — is the mechanical cause of
   all three reported overflows and must be confirmed, not assumed.

   Run: node scripts/measure-place-value-lab-ratios.js
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html' };

const WIDTHS = [360, 768, 1024, 1366, 1440, 1920, 2560];

function serve() {
  return http.createServer((req, res) => {
    const p = decodeURIComponent(req.url.split('?')[0]);
    const file = p.indexOf('/mini-tools/') === 0
      ? path.join(MINI, p.slice('/mini-tools/'.length))
      : path.join(MINI, p.replace(/^\//, ''));
    fs.readFile(file, (err, buf) => {
      if (err) { res.statusCode = 404; res.end(); return; }
      res.setHeader('Content-Type', MIME[path.extname(file)] || 'application/octet-stream');
      res.end(buf);
    });
  });
}

/* Drive the tool into a state that has all three pieces on the mat at
   once. Hundreds is premium-gated today, so force it the way the
   existing local-test does (section M) rather than pretending a free
   session can reach it. */
async function poseThreePlaces(page) {
  await page.evaluate(() => {
    const T = window.PlaceValueLab;
    T.premium = true;
    T.api.settings.hundreds = true;
    T.st.maxPlaces = 3;
    T.st.h = 2; T.st.t = 3; T.st.o = 4;
    T.render();
  });
}

const PROBE = () => {
  const box = (sel) => {
    const e = document.querySelector(sel);
    if (!e) return null;
    const r = e.getBoundingClientRect();
    return { w: +r.width.toFixed(2), h: +r.height.toFixed(2) };
  };
  const wrap = document.querySelector('.pvl-wrap');
  const u = wrap ? getComputedStyle(wrap).getPropertyValue('--pvl-u').trim() : '';
  const card = document.querySelector('.lcs-app');
  const cardR = card ? card.getBoundingClientRect() : null;

  /* ⭐ TWO boxes, and picking the wrong one hides the defect.
     The house phrase is "containment is measured against the CARD" —
     but the operator's "box" is the white COLUMN, and a block can sit
     well outside its column while still inside the app card, because
     the columns are narrower than the card and centred within it. So
     measure BOTH, and report them separately. */
  const measure = (nodes, ownerSel) => {
    let n = 0, worst = 0, sel = '';
    nodes.forEach((e) => {
      const r = e.getBoundingClientRect();
      if (!r.width || !r.height) return;
      const owner = ownerSel ? e.closest(ownerSel) : null;
      const b = owner ? owner.getBoundingClientRect() : cardR;
      if (!b) return;
      const over = Math.max(r.right - b.right, b.left - r.left, r.bottom - b.bottom);
      if (over > 1) { n++; if (over > worst) { worst = over; sel = e.className || e.tagName; } }
    });
    return { n, worst: +worst.toFixed(2), sel: String(sel).slice(0, 34) };
  };
  const blocks = Array.from(document.querySelectorAll('.pvl-block, .pvl-slot'));
  return {
    u: u || '(not declared)',
    cube: box('.pvl-cube'),
    rod: box('.pvl-rod'),
    flat: box('.pvl-flat'),
    pageOverflow: document.documentElement.scrollWidth - window.innerWidth,
    vsCol: measure(blocks, '.pvl-col'),
    vsCard: measure(Array.from(document.querySelectorAll('.pvl-mat *')), null),
    colH: (() => { const c = document.querySelector('.pvl-col--hundreds'); return c ? Math.round(c.getBoundingClientRect().height) : null; })(),
  };
};

(async () => {
  const server = serve();
  await new Promise((r) => server.listen(0, r));
  const PORT = server.address().port;
  const BASE = `http://127.0.0.1:${PORT}/mini-tools/place-value-lab.html`;
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();

  console.log('MEASURED, not read off the stylesheet. Asserts nothing.\n');
  console.log('  w     --pvl-u            cube        rod          flat         rod/cube  flat/rod  area 1:r:f');
  console.log('  ----  -----------------  ----------  -----------  -----------  --------  --------  ------------------');

  const rows = [];
  for (const w of WIDTHS) {
    await page.setViewport({ width: w, height: w >= 1920 ? 1200 : 900 });
    await page.goto(BASE, { waitUntil: 'networkidle0' });
    await poseThreePlaces(page);
    const m = await page.evaluate(PROBE);
    if (!m.cube || !m.rod || !m.flat) { console.log(`  ${w}  — a piece is missing: ${JSON.stringify(m)}`); continue; }
    const rc = m.rod.h / m.cube.h;
    const fr = m.flat.w / m.rod.w;
    const aC = m.cube.w * m.cube.h, aR = m.rod.w * m.rod.h, aF = m.flat.w * m.flat.h;
    rows.push({ w, m, rc, fr, aR: aR / aC, aF: aF / aC });
    console.log(
      '  ' + String(w).padEnd(4) +
      '  ' + String(m.u).padEnd(17) +
      '  ' + `${m.cube.w}x${m.cube.h}`.padEnd(10) +
      '  ' + `${m.rod.w}x${m.rod.h}`.padEnd(11) +
      '  ' + `${m.flat.w}x${m.flat.h}`.padEnd(11) +
      '  ' + rc.toFixed(2).padEnd(8) +
      '  ' + fr.toFixed(2).padEnd(8) +
      '  ' + `1 : ${(aR / aC).toFixed(2)} : ${(aF / aC).toFixed(2)}`
    );
  }

  console.log('\n  REQUIRED by base ten:      rod/cube 10.00   flat/rod 10.00   area 1 : 10 : 100\n');

  /* the containment measure the shipped gate cannot make */
  console.log('Containment at the WORST state (9 hundreds / 19 tens / 19 ones):');
  console.log('  w     page-ovf  blocks outside their COLUMN   blocks outside the CARD   hundreds col');
  console.log('  ----  --------  ---------------------------  ------------------------  ------------');
  for (const w of WIDTHS) {
    await page.setViewport({ width: w, height: w >= 1920 ? 1200 : 900 });
    await page.goto(BASE, { waitUntil: 'networkidle0' });
    await page.evaluate(() => {
      const T = window.PlaceValueLab;
      T.premium = true;
      T.api.settings.hundreds = true;
      T.st.maxPlaces = 3;
      T.st.h = 9; T.st.t = 19; T.st.o = 19;
      T.render();
    });
    const m = await page.evaluate(PROBE);
    console.log(
      '  ' + String(w).padEnd(4) +
      '  ' + String(m.pageOverflow).padEnd(8) +
      '  ' + `${m.vsCol.n} worst ${m.vsCol.worst}px`.padEnd(27) +
      '  ' + `${m.vsCard.n} worst ${m.vsCard.worst}px`.padEnd(24) +
      '  ' + (m.colH != null ? m.colH + 'px tall' : '-')
    );
  }
  console.log('\n  ⭐ page-overflow reads 0 at EVERY width — .lcs-app{overflow:hidden} absorbs it,');
  console.log('     which is precisely the measure the shipped gate makes.');
  console.log('  ⭐ And the CARD is the wrong box: a block can sit far outside its own white');
  console.log('     COLUMN while still inside the card, because the columns are narrower and');
  console.log('     centred within it. The operator said "out of the box" and meant the column.\n');

  await browser.close();
  server.close();
})();
