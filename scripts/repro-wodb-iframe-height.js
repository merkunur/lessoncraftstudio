#!/usr/bin/env node
/* =====================================================================
   repro-wodb-iframe-height.js — PHASE 0 of the wodb v4 rebuild.

   ⚠⚠ MEASURE BEFORE YOU FIX. The rebuild plan says the wodb board is
   pinned to ~420px on every DESKTOP production page and that neither of
   its wide tiers can ever fire. That was DERIVED from the CSS chain, not
   observed — and the recorded house rule is that a derived defect is a
   hypothesis until it is reproduced. This script is the reproduction,
   and it stays as a permanent gate.

   The suspected chain:
     lcs-shell.css:54   html,body{height:100%}      -> iframe VIEWPORT height
     wodb.js:1052       body.wdb-wide #lcs-root{height:100%}
     lcs-shell.css:70   .lcs-app{height:100%}       -> binds to the viewport
     lcs-shell.js:940   postActivityResize() reports app.getBoundingClientRect()
                        .height, i.e. THE HEIGHT IT WAS JUST GIVEN
     ActivityIframe.tsx:21  INITIAL_HEIGHT = 420, and a <4px delta guard
                        stops any further post
   => a fixed point at ~422px, at every width above the 560px phone
   breakpoint (below which #lcs-root flips back to height:auto and the
   chain goes content-driven, which is why phones are fine and why this
   survived).

   ⚠ THE CONTROL IS THE WHOLE POINT. `build-plan` sizes its bench by
   max-width + aspect-ratio and carries NO #lcs-root height rule, so it
   should grow. If the control is ALSO pinned, the finding is about the
   shell or about ActivityIframe, not about these six tools — a
   completely different repair. Never report a defect from the subject
   alone.

   Run:  node scripts/repro-wodb-iframe-height.js
         node scripts/repro-wodb-iframe-height.js --only=wodb
         node scripts/repro-wodb-iframe-height.js --local   (serve mini tools/)

   ── MEASURED 2026-08-05, production, anonymous ───────────────────────
   REPRODUCED, and worse than the derivation predicted.

     tool                1440x900          2560x1440
     wodb                iframe 422px      iframe 422px   board 234px  CELL 112px
     fraction-kitchen    iframe 422px      iframe 422px
     measurement-bench   iframe 422px      (meter wall)
     part-whole-frame    iframe 422px      (meter wall)
     picture-word-wall   iframe 422px      (meter wall)
     story-line          iframe 422px      (meter wall)
     build-plan [ctrl]   iframe 859px      iframe 860px   board 560px
     lids       [ctrl]   iframe 731px

   All six viewport-bound tools sit on the predicted ~422px fixed point at
   every desktop width. A wodb CELL is 112px against the 740px the
   wide-viewport programme measured against wodb.html directly. The
   controls grow, so the fault IS the `#lcs-root{height:100%}` binding —
   not the shell, not ActivityIframe. That is the repair this commission
   makes, for wodb only.

   ⭐⭐ AND THE CONTROL SAID SOMETHING NOBODY ASKED IT: build-plan's iframe
   is 859px at 1440 and 860px at 2560 — content-driven, so it does not
   grow with the SCREEN either — and its board measures 560px at both,
   which is its BASE `max-width`. Its wide tiers are gated on
   `min-height:880px`, and 859 < 880. So build-plan's wide tiers never
   fire on the production page either, and the same `min-height` gating
   is used by ~46 tools. The wide-viewport programme measured them
   against the standalone .html, where the viewport IS the screen.
   ⚠ REPORTED, NOT FIXED — that is a separate commission over ~46 tools.
   It is why THIS tool's tiers are re-keyed on `min-width` only and its
   numerals move to `cqmin`, which needs no tier at all.
   ===================================================================== */

'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const ROOT = path.join(__dirname, '..');
const BASE = 'https://www.lessoncraftstudio.com';

const argOnly = (process.argv.find((a) => a.startsWith('--only=')) || '').split('=')[1] || null;
const LOCAL = process.argv.includes('--local');

/* The six tools that bind #lcs-root to the viewport, plus two controls
   that do not. `bound` is what the source says TODAY — it is re-derived
   from the file below, never trusted from this table. */
const TOOLS = [
  { key: 'wodb',              slug: 'which-one-doesnt-belong',                        pfx: 'wdb', board: '.wdb-grid',   cell: '.wdb-cell' },
  { key: 'fraction-kitchen',  slug: 'fraction-kitchen',                               pfx: 'frk', board: null,          cell: null },
  { key: 'measurement-bench', slug: 'measurement-bench',                              pfx: 'mb',  board: null,          cell: null },
  { key: 'part-whole-frame',  slug: 'number-bonds',                                   pfx: 'pwf', board: null,          cell: null },
  { key: 'picture-word-wall', slug: 'picture-word-wall',                              pfx: 'pww', board: null,          cell: null },
  { key: 'story-line',        slug: 'story-line',                                     pfx: 'stl', board: null,          cell: null },
  /* --- controls: no #lcs-root height rule, width-driven boards --- */
  { key: 'build-plan',        slug: 'build-from-a-plan-spatial-reasoning-grade-1-2',  pfx: 'bpl', board: '.bpl-bench',  cell: null, control: true },
  { key: 'lids',              slug: 'lids-sharing-equally-remainder-classroom-tool',  pfx: 'lid', board: null,          cell: null, control: true },
];

const VIEWPORTS = [
  { w: 1440, h: 900 },
  { w: 2560, h: 1440 },
];

let FAIL = 0, PASS = 0;
const fail = (m) => { FAIL++; console.log('  FAIL  ' + m); };
const pass = (m) => { PASS++; console.log('  ok    ' + m); };
const note = (m) => console.log('  ..    ' + m);

/* ── re-derive the binding from source rather than trusting the table ── */
function bindsRootHeight(key) {
  const p = path.join(ROOT, 'mini tools', key + '.js');
  if (!fs.existsSync(p)) return null;
  const src = fs.readFileSync(p, 'utf8');
  /* the rule as it is actually emitted, e.g.
     'body.wdb-wide #lcs-root{height:100%;min-height:0;}' */
  return /#lcs-root\s*\{[^}']*height\s*:\s*100%/.test(src);
}

/* ── a local static server, for --local runs ──────────────────────────
   Only used to sanity-check the harness itself; the finding must be made
   on production, because the defect lives in the PARENT page. */
function serveLocal() {
  const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json',
    '.css': 'text/css', '.webp': 'image/webp', '.png': 'image/png', '.svg': 'image/svg+xml' };
  const roots = [path.join(ROOT, 'mini tools'), path.join(ROOT, 'frontend', 'public')];
  const srv = http.createServer((req, res) => {
    const rel = decodeURIComponent(req.url.split('?')[0]).replace(/^\/mini-tools\//, '/').replace(/^\//, '');
    for (const r of roots) {
      const f = path.join(r, rel);
      if (fs.existsSync(f) && fs.statSync(f).isFile()) {
        res.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream' });
        return fs.createReadStream(f).pipe(res);
      }
    }
    res.writeHead(404); res.end('nf');
  });
  return new Promise((r) => srv.listen(0, () => r({ srv, port: srv.address().port })));
}

(async () => {
  console.log('repro-wodb-iframe-height — measuring the PRODUCTION tool page\n');

  const targets = TOOLS.filter((t) => !argOnly || t.key === argOnly);
  if (argOnly && !targets.length) {
    console.error('FAIL --only=' + argOnly + ' matches no tool; this run would measure nothing ' +
      'and report success.');
    process.exit(1);
  }

  /* ── source-derived binding table, printed first so the reader can see
        which tools the hypothesis even applies to ── */
  console.log('binding (re-derived from mini tools/<key>.js, not from this file\'s table):');
  const bound = {};
  for (const t of TOOLS) {
    bound[t.key] = bindsRootHeight(t.key);
    console.log('  ' + t.key.padEnd(20) + (bound[t.key] === null ? 'NO SOURCE'
      : bound[t.key] ? '#lcs-root{height:100%}  <- viewport-bound'
        : 'no root height rule    <- content-driven'));
  }
  /* non-vacuity: the table must contain BOTH kinds, or the control is
     not a control and the run proves nothing. */
  const vals = TOOLS.map((t) => bound[t.key]);
  if (!vals.some((v) => v === true) || !vals.some((v) => v === false)) {
    fail('the roster has no contrast — every tool is on the same side of the binding, ' +
      'so a "pinned" reading could not be distinguished from a harness fault');
  } else {
    pass('roster contains both viewport-bound and content-driven tools');
  }
  console.log('');

  let local = null;
  if (LOCAL) local = await serveLocal();

  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const rows = [];

  try {
    for (const vp of VIEWPORTS) {
      console.log('── viewport ' + vp.w + '×' + vp.h + ' ─────────────────────────────');
      for (const t of targets) {
        const page = await browser.newPage();
        await page.setViewport({ width: vp.w, height: vp.h, deviceScaleFactor: 1 });
        const url = LOCAL
          ? 'http://127.0.0.1:' + local.port + '/' + t.key + '.html?embed=1&lang=en'
          : BASE + '/en/tools/' + t.slug;
        let m = null;
        try {
          await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
          /* the tool mounts inside the iframe; give the resize handshake
             time to settle AND to prove it has settled (two identical
             reads 900ms apart), because a single read could catch it
             mid-grow and manufacture a false "pinned". */
          await new Promise((r) => setTimeout(r, 2500));
          m = await measure(page, t, LOCAL);
          if (!m) {
            /* ⚠⚠ "could not measure" is not a result — NAME why. The
               overwhelmingly likely cause here is the play meter:
               ActivityIframe meters 'play' per load and swaps the whole
               iframe for a wall panel when the anonymous allowance is
               gone, so a long sweep starves its own later rows. A run
               that reported this as a shrug would have left the CONTROL
               unmeasured, and the control is the only thing that tells
               us whether to repair six tools or the shell. */
            const walled = await page.evaluate(() =>
              !document.querySelector('iframe') &&
              /free plays|gratis|essais|jugadas|prove|speelbeurten|omgångar|runder|pelikerrat/i
                .test(document.body.innerText || '')).catch(() => false);
            note(t.key + ' @' + vp.w + ' — ' + (walled
              ? 'PLAY METER WALL (anonymous allowance exhausted by this sweep) — rerun with --only'
              : 'no iframe on the page and no wall copy either'));
          } else {
            await new Promise((r) => setTimeout(r, 900));
            const m2 = await measure(page, t, LOCAL);
            m.settled = !!m2 && Math.abs((m2.iframeH || 0) - (m.iframeH || 0)) < 4;
            m.second = m2 ? m2.iframeH : null;
          }
        } catch (e) {
          note(t.key + ' @' + vp.w + ' — harness error: ' + e.message);
        }
        await page.close();
        if (!m) continue;
        m.key = t.key; m.vw = vp.w; m.control = !!t.control; m.bound = bound[t.key];
        rows.push(m);

        const board = m.boardH ? Math.round(m.boardH) + 'px' : '—';
        const cell = m.cellH ? Math.round(m.cellH) + 'px' : '—';
        console.log('  ' + t.key.padEnd(20) +
          'iframe ' + String(Math.round(m.iframeH)).padStart(5) + 'px' +
          '   innerH ' + String(Math.round(m.innerH || 0)).padStart(5) + 'px' +
          '   board ' + board.padStart(7) +
          '   cell ' + cell.padStart(7) +
          (m.settled ? '' : '   (STILL MOVING -> ' + Math.round(m.second) + ')') +
          (t.control ? '   [control]' : ''));
      }
      console.log('');
    }

    /* ── the verdict ───────────────────────────────────────────────── */
    console.log('── verdict ───────────────────────────────────────────────');

    const at2560 = (k) => rows.find((r) => r.key === k && r.vw === 2560);
    const at1440 = (k) => rows.find((r) => r.key === k && r.vw === 1440);

    const w = at2560('wodb');
    if (!w) {
      fail('wodb was never measured — the run proves nothing');
    } else {
      /* CLAIM 1: the iframe does not grow with the viewport. */
      const w14 = at1440('wodb');
      if (w14 && Math.abs(w.iframeH - w14.iframeH) < 8) {
        fail('CONFIRMED — wodb iframe is ' + Math.round(w14.iframeH) + 'px at 1440 and ' +
          Math.round(w.iframeH) + 'px at 2560: it does not grow with the viewport');
      } else if (w14) {
        pass('wodb iframe grows 1440->2560: ' + Math.round(w14.iframeH) + ' -> ' +
          Math.round(w.iframeH) + 'px — the derived defect DOES NOT REPRODUCE as stated');
      }

      /* CLAIM 2: the wide tiers cannot fire. They need min-height 880/1080
         against the IFRAME viewport, which is m.innerH. */
      if (w.innerH && w.innerH < 880) {
        fail('CONFIRMED — the iframe viewport is ' + Math.round(w.innerH) + 'px at a 2560 screen, ' +
          'so wodb.js:1289 (min-height:880px) and :1295 (min-height:1080px) can never match');
      } else if (w.innerH) {
        pass('iframe viewport is ' + Math.round(w.innerH) + 'px — the 880px tier CAN fire');
      }

      /* CLAIM 3: the cells are tiny against the 740px the wide-viewport
         programme measured standalone. */
      if (w.cellH && w.cellH < 400) {
        fail('CONFIRMED — a wodb cell is ' + Math.round(w.cellH) + 'px on a 2560 screen, against ' +
          'the 740px the wide-viewport programme measured against wodb.html directly');
      } else if (w.cellH) {
        pass('a wodb cell is ' + Math.round(w.cellH) + 'px at 2560');
      }
    }

    /* CLAIM 4 — the control. If build-plan is pinned too, the repair is
       NOT in these six tools. */
    const c = at2560('build-plan');
    if (c && w) {
      if (c.innerH && w.innerH && c.innerH > w.innerH + 100) {
        pass('the control grows where wodb does not (build-plan ' + Math.round(c.innerH) +
          'px vs wodb ' + Math.round(w.innerH) + 'px) — the defect IS the #lcs-root binding, ' +
          'not the shell and not ActivityIframe');
      } else if (c.innerH && w.innerH) {
        fail('the CONTROL is pinned too (build-plan ' + Math.round(c.innerH) + 'px vs wodb ' +
          Math.round(w.innerH) + 'px) — do NOT repair the six tools; the fault is in the shell ' +
          'or in ActivityIframe and the plan\'s Phase-1 fix would be aimed at the wrong file');
      }
    }

    /* the sibling report — measured and stated, never silently fixed */
    console.log('');
    console.log('── siblings (REPORT ONLY — not in this commission\'s scope) ──');
    for (const t of TOOLS) {
      if (t.key === 'wodb' || t.control) continue;
      const r = at2560(t.key);
      if (!r) { note(t.key + ' — not measured'); continue; }
      console.log('  ' + t.key.padEnd(20) + 'iframe ' + String(Math.round(r.iframeH)).padStart(5) +
        'px   innerH ' + String(Math.round(r.innerH || 0)).padStart(5) + 'px' +
        (r.innerH && r.innerH < 880 ? '   <- also cannot reach its wide tiers' : ''));
    }
  } finally {
    await browser.close();
    if (local) local.srv.close();
  }

  console.log('');
  console.log(FAIL ? 'REPRODUCED — ' + FAIL + ' confirmed, ' + PASS + ' clear'
    : 'NOT REPRODUCED — ' + PASS + ' checks clear');
  /* ⚠ exit 0 either way. This is a MEASUREMENT, and a measurement that
     disagrees with the plan is the most valuable result it can produce;
     failing the process would tempt a future reader to "fix" the script. */
  process.exit(0);
})();

/* Return plain numbers — a DOMRect's properties live on its prototype and
   serialise out of page.evaluate as {}. (Recorded on #44.) */
async function measure(page, t, isLocal) {
  if (isLocal) {
    return page.evaluate((sel) => {
      const b = sel.board ? document.querySelector(sel.board) : null;
      const c = sel.cell ? document.querySelector(sel.cell) : null;
      const app = document.querySelector('.lcs-app');
      return {
        iframeH: app ? app.getBoundingClientRect().height : 0,
        innerH: window.innerHeight,
        boardH: b ? b.getBoundingClientRect().height : null,
        cellH: c ? c.getBoundingClientRect().height : null,
      };
    }, { board: t.board, cell: t.cell });
  }

  const frameEl = await page.$('iframe');
  if (!frameEl) return null;
  const box = await frameEl.evaluate((el) => {
    const r = el.getBoundingClientRect();
    return { h: r.height, w: r.width };
  });
  const frame = await frameEl.contentFrame();
  if (!frame) return { iframeH: box.h, innerH: null, boardH: null, cellH: null };

  let inner = null;
  try {
    inner = await frame.evaluate((sel) => {
      const b = sel.board ? document.querySelector(sel.board) : null;
      const c = sel.cell ? document.querySelector(sel.cell) : null;
      const app = document.querySelector('.lcs-app');
      return {
        innerH: window.innerHeight,
        appH: app ? app.getBoundingClientRect().height : null,
        boardH: b ? b.getBoundingClientRect().height : null,
        cellH: c ? c.getBoundingClientRect().height : null,
      };
    }, { board: t.board, cell: t.cell });
  } catch (_) { /* cross-origin or not yet mounted */ }

  return {
    iframeH: box.h,
    innerH: inner ? inner.innerH : null,
    appH: inner ? inner.appH : null,
    boardH: inner ? inner.boardH : null,
    cellH: inner ? inner.cellH : null,
  };
}
