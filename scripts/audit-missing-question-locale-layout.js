/* =====================================================================
   audit-missing-question-locale-layout.js — 11 LOCALES × 6 VIEWPORTS
   ---------------------------------------------------------------------
   Run:  node scripts/audit-missing-question-locale-layout.js
         node scripts/audit-missing-question-locale-layout.js --shots

   ⚠⚠ THIS GATE DID NOT EXIST. Tool #55 shipped without it while 30 other
   tools on the shelf carry one — and the locale that breaks a layout is
   never English. German compounds, Finnish agglutination and French
   expansion each push the longest button label 20-40% past the English,
   and the three arrangements move the niches into three different grids.
   6 viewports × 11 locales × 3 arrangements × 2 bands is the space this
   tool actually occupies.

   ⚠⚠ AND IT ASKS THE QUESTION NO FLOOR-BASED GATE CAN ANSWER: do two
   rendered things OVERLAP? Every other assertion on this shelf measures
   ONE box against a floor, which is why a sibling shipped a build hint
   clipped mid-word under an absolutely positioned speaker with 141 green
   assertions. This build had the same class of defect on its first run —
   a `margin-left` on a fixed-width grid track pushed one counting well
   on top of its neighbour, and every well still met its own size floor.

   WHAT IT ASSERTS, per (locale × viewport × arrangement × band):
     1. nothing renders outside the card  (`.lcs-app` is overflow:hidden,
        so outside the card is not merely ugly — it is GONE)
     2. no two counting wells overlap
     3. no two control buttons overlap
     4. every counting well clears the 12px legibility floor
     5. every control clears the 44px tap floor
     6. the apparatus height is IDENTICAL at every stage of the ladder —
        a staged reveal must not grow under the class's eyes
     7. no raw i18n key leaks into the rendered text
   ===================================================================== */
'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const ROOT = process.env.MISSING_QUESTION_TOOL_DIR || path.join(__dirname, '..', 'mini tools');
const PORT = Number(process.env.MISSING_QUESTION_PORT) || 5788;
const SHOTS = process.argv.indexOf('--shots') >= 0;
const OUT = path.join(__dirname, '..', 'docs', 'audit-results', 'missing-question', 'locale-layout');

const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const VIEWPORTS = [320, 360, 412, 704, 1024, 1366];
const SHAPES = ['change', 'bracket', 'compare'];
const BANDS = ['ten', 'twenty'];

const WELL_FLOOR = 12;   /* legibility — a well is not a tap target */
const TAP_FLOOR = 44;    /* controls */

const srv = http.createServer((rq, rs) => {
  let f = rq.url.split('?')[0].replace('/mini-tools/', '');
  while (f.charAt(0) === '/') f = f.slice(1);
  if (!f) f = 'missing-question.html';
  const fp = path.join(ROOT, f);
  if (!fs.existsSync(fp)) { rs.writeHead(404); rs.end('x'); return; }
  const t = f.endsWith('.js') ? 'application/javascript'
    : f.endsWith('.json') ? 'application/json'
      : f.endsWith('.css') ? 'text/css' : 'text/html';
  rs.writeHead(200, { 'Content-Type': t });
  rs.end(fs.readFileSync(fp));
}).listen(PORT);

const sleep = ms => new Promise(r => setTimeout(r, ms));

/* the measurement, read in PIXELS from the rendered DOM. It must not
   share a convention with the renderer — everything here comes from
   getBoundingClientRect, never from a class name that means "should be". */
const MEASURE = () => {
  const R = e => { const b = e.getBoundingClientRect(); return { x: b.x, y: b.y, r: b.right, b: b.bottom, w: b.width, h: b.height }; };
  const card = document.querySelector('.lcs-app');
  if (!card) return { fatal: 'no .lcs-app' };
  const cr = card.getBoundingClientRect();

  const outside = [];
  document.querySelectorAll('.mqu-wrap *').forEach(e => {
    const b = e.getBoundingClientRect();
    if (b.width <= 0 || b.height <= 0) return;
    if (b.right > cr.right + 1 || b.left < cr.left - 1) {
      outside.push((e.className && e.className.baseVal !== undefined ? e.className.baseVal : e.className) || e.tagName);
    }
  });

  const pairsOverlap = list => {
    const out = [];
    for (let i = 0; i < list.length; i++) {
      for (let j = i + 1; j < list.length; j++) {
        const a = list[i], c = list[j];
        const ox = Math.min(a.r, c.r) - Math.max(a.x, c.x);
        const oy = Math.min(a.b, c.b) - Math.max(a.y, c.y);
        if (ox > 0.5 && oy > 0.5) out.push([i, j, +ox.toFixed(1), +oy.toFixed(1)]);
      }
    }
    return out;
  };

  const wells = [].slice.call(document.querySelectorAll('.mqu-well')).map(R);
  const btns = [].slice.call(document.querySelectorAll('.mqu-btn')).map(R);

  /* a raw key leak: our keys are camelCase with no space */
  const text = (document.querySelector('.mqu-wrap') || {}).innerText || '';
  const rawKey = /(^|\s)(legSetup|legTell|legAsk|legPaper|sayDealt|sayLinked|sayTold|sayAsk|sayCount|sayShape|sayShapeCleared|askAt\d?|tell\d|untell\d|saidAt\w+|said\w+|aria\w+|shape\w+|band\w+|setShape|setBand|sheetTitle|sheetHint|lockedTitle|lockedBody|totalUp|totalDown|uncount|recount|unlink)(\s|$)/.test(text);

  return {
    outside: outside.slice(0, 3),
    wells: wells.length,
    minWell: wells.length ? Math.min.apply(null, wells.map(w => w.w)) : null,
    wellOverlaps: pairsOverlap(wells).slice(0, 3),
    btns: btns.length,
    minTapH: btns.length ? Math.min.apply(null, btns.map(b => b.h)) : null,
    btnOverlaps: pairsOverlap(btns).slice(0, 3),
    standH: (() => { const s = document.querySelector('.mqu-stand'); return s ? +s.getBoundingClientRect().height.toFixed(1) : null; })(),
    rawKey: rawKey
  };
};

(async () => {
  if (SHOTS) fs.mkdirSync(OUT, { recursive: true });
  const b = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  let fails = 0, cells = 0;
  const bad = [];

  for (const loc of LOCALES) {
    /* ⚠ FRESH PAGE PER LOCALE. The shell reads the language once at
       mount; reusing a page would measure the first locale eleven
       times, and a gate that measures the same thing repeatedly reports
       consistency it has not tested. */
    const p = await b.newPage();
    const errs = [];
    p.on('pageerror', e => errs.push(String(e.message)));

    for (const W of VIEWPORTS) {
      await p.setViewport({ width: W, height: 1000 });
      await p.goto(`http://localhost:${PORT}/mini-tools/missing-question.html?lang=${loc}`, { waitUntil: 'networkidle0' });
      await sleep(260);

      /* the shell must actually be in this locale */
      const gotLang = await p.evaluate(() => (window.LCS && LCS.lang) || document.documentElement.lang || null);

      for (const shape of SHAPES) {
        for (const band of BANDS) {
          await p.evaluate((sh, bd) => {
            const T = window.MissingQuestion;
            T.api.settings.shape = sh; T.api.settings.band = bd;
            T.st = T.newState(sh, bd, 3);
            T.render();
          }, shape, band);
          await sleep(70);

          /* ⚠ THE HEIGHT MUST NOT MOVE ACROSS THE LADDER. Walk every
             stage and record the stand's height at each. */
          const heights = await p.evaluate(() => {
            const T = window.MissingQuestion, H = [];
            const h = () => +document.querySelector('.mqu-stand').getBoundingClientRect().height.toFixed(1);
            T.render(); H.push(h());
            T.st = T.link(T.st); T.render(); H.push(h());
            const tel = [0, 1, 2].filter(i => i !== T.st.ask);
            T.st = T.tell(T.st, tel[0]); T.render(); H.push(h());
            T.st = T.tell(T.st, tel[1]); T.render(); H.push(h());
            T.st = T.count(T.st); T.render(); H.push(h());
            return H;
          });
          await sleep(60);

          const m = await p.evaluate(MEASURE);
          cells++;

          const why = [];
          if (m.fatal) why.push(m.fatal);
          if (m.outside && m.outside.length) why.push('outside the card: ' + m.outside.join(','));
          if (m.wellOverlaps && m.wellOverlaps.length) why.push('wells OVERLAP: ' + JSON.stringify(m.wellOverlaps));
          if (m.btnOverlaps && m.btnOverlaps.length) why.push('buttons OVERLAP: ' + JSON.stringify(m.btnOverlaps));
          if (m.minWell != null && m.minWell < WELL_FLOOR) why.push('well ' + m.minWell.toFixed(1) + 'px < ' + WELL_FLOOR);
          if (m.minTapH != null && m.minTapH < TAP_FLOOR) why.push('control ' + m.minTapH.toFixed(1) + 'px < ' + TAP_FLOOR);
          if (m.rawKey) why.push('RAW I18N KEY leaked into the rendered text');
          const uniq = Array.from(new Set(heights));
          if (uniq.length !== 1) why.push('the apparatus GREW across the ladder: ' + heights.join(' -> '));
          if (gotLang && gotLang !== loc) why.push('shell rendered `' + gotLang + '` not `' + loc + '`');

          if (why.length) {
            fails++;
            bad.push(`${loc} ${String(W).padStart(4)}px ${shape}/${band}: ${why.join(' | ')}`);
          }
        }
      }

      if (SHOTS && (W === 360 || W === 704 || W === 1024)) {
        await p.screenshot({ path: path.join(OUT, `${loc}-${W}.png`), fullPage: true });
      }
    }
    if (errs.length) { fails++; bad.push(`${loc}: page error — ${errs[0]}`); }
    await p.close();
    process.stdout.write(loc + ' ');
  }

  console.log('\n');
  console.log(`${cells} cells measured (11 locales × 6 viewports × 3 arrangements × 2 bands)`);
  if (fails) {
    console.log(`\nFAIL — ${fails} cell(s):`);
    bad.slice(0, 25).forEach(l => console.log('  ✗ ' + l));
    if (bad.length > 25) console.log('  … and ' + (bad.length - 25) + ' more');
    await b.close(); srv.close(); process.exit(1);
  }
  console.log('PASS — nothing outside the card, nothing overlapping, every well ≥'
    + WELL_FLOOR + 'px, every control ≥' + TAP_FLOOR + 'px,');
  console.log('       the apparatus height is constant across the whole ladder, and no raw key leaks.');
  if (SHOTS) console.log('shots: ' + OUT);
  await b.close(); srv.close();
})().catch(e => { console.error('FAILED: ' + e.message); srv.close(); process.exit(1); });
