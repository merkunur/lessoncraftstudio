#!/usr/bin/env node
/* =====================================================================
   generate-tool-previews.js — render a real preview thumbnail for every
   premium/free TOOL, for the /[locale]/tools hub cards.

   Sibling of generate-activity-previews.js. The tools hub previously showed
   pure-text cards (title + tagline + paragraph + button) with no image at
   all; these thumbnails are what make it read as a catalog.

   Differences from the activity generator (only four):
     - rows          : the 40 TOOL_KEYS (parsed from lib/seo/tool-content.ts)
     - url           : /mini-tools/<key>.html?lang=en&embed=compact
                       (no ?activity= — tools are free-play, not task-driven)
     - screenshot el : .lcs-stage, falling back to #lcs-root

   NOTE on the target: `.lcs-stage` is NOT in the tools' static HTML — it is
   injected at runtime by the shared lcs-shell, so grepping the .html files
   for it comes back empty and is misleading. Screenshotting #lcs-root
   instead captures `.lcs-header` too, which puts the settings/mute/
   fullscreen/reset chrome buttons in the corner of every thumbnail.
   `.lcs-stage` is the apparatus alone.
     - output        : frontend/public/mini-tools/tool-previews/<key>.webp

   Everything else is deliberately identical: same in-process static server,
   same 720x640 @2x viewport, same networkidle2 + settle, same
   omitBackground screenshot, same sharp 480x360 `contain` on a TRANSPARENT
   matte → WebP q82, so the card's category-tinted panel shows through the
   padding exactly as it does on the activities cards.

   One canonical `en` render per tool, reused across all 11 locales (the
   apparatus is language-light by design — §23.2 "no words on the
   apparatus").

   Output is gitignored (frontend/public/mini-tools/* per .gitignore:106) —
   only this script is committed; the webps are scp'd to
   /var/www/lcs-media/mini-tools/tool-previews/ BEFORE deploy.sh runs the
   build (§20.4 mini-tools cp/deploy race hazard).

   Usage: node scripts/generate-tool-previews.js [--only=<key-substr>]
                                                 [--fit=auto|contain]

     --fit=contain  exact parity with the activity previews: always letterbox
                    on a transparent matte, never crop.
     --fit=auto     (default) letterbox wide stages, but top-crop the 13
                    stages taller than 0.85 aspect, where `contain` would
                    shrink the apparatus into an illegible strip. Tools vary
                    far more in aspect than activities do (720x172 number-line
                    → 691x722 letter-tiles), which is why the choice exists
                    here and not in the activity script.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const http = require('http');
const puppeteer = require('puppeteer');
const sharp = require('sharp');

const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const IMGLIB = path.join(REPO, 'image-library-webp');
const OUT = path.join(REPO, 'frontend', 'public', 'mini-tools', 'tool-previews');
const TOOL_CONTENT_TS = path.join(REPO, 'frontend', 'lib', 'seo', 'tool-content.ts');
const ONLY = (process.argv.find((a) => a.startsWith('--only=')) || '').split('=')[1] || '';
const FIT = (process.argv.find((a) => a.startsWith('--fit=')) || '').split('=')[1] || 'auto';
if (!['auto', 'contain'].includes(FIT)) {
  console.error(`ERROR: --fit must be 'auto' or 'contain' (got '${FIT}')`);
  process.exit(1);
}

const MIME = {
  '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.html': 'text/html', '.svg': 'image/svg+xml', '.webp': 'image/webp',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.woff2': 'font/woff2',
};

function serve() {
  return http.createServer((req, res) => {
    const p = decodeURIComponent(req.url.split('?')[0]);
    let file;
    if (p.startsWith('/mini-tools/')) file = path.join(MINI, p.slice('/mini-tools/'.length));
    else if (p.startsWith('/image-library-webp/')) file = path.join(IMGLIB, p.slice('/image-library-webp/'.length));
    else if (p === '/') { res.statusCode = 404; res.end('no'); return; }
    else file = path.join(MINI, p.replace(/^\//, ''));
    fs.readFile(file, (e, b) => {
      if (e) { res.statusCode = 404; res.end('not found'); return; }
      res.setHeader('Content-Type', MIME[path.extname(file)] || 'application/octet-stream');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.end(b);
    });
  });
}

/* TOOL_KEYS is the single SoT for which tools exist (tool-content.ts:20).
   Parse it rather than re-listing 40 keys here — a hand copy would drift the
   moment tool #41 ships. */
function loadToolKeys() {
  const src = fs.readFileSync(TOOL_CONTENT_TS, 'utf8');
  const m = src.match(/export const TOOL_KEYS\s*=\s*\[([\s\S]*?)\]\s*as const;/);
  if (!m) throw new Error(`could not parse TOOL_KEYS from ${TOOL_CONTENT_TS}`);
  const keys = [...m[1].matchAll(/['"]([a-z0-9-]+)['"]/g)].map((x) => x[1]);
  if (!keys.length) throw new Error('TOOL_KEYS parsed empty');
  return keys;
}

/* tool key → mounted window global (CamelCase, hyphens dropped) — same
   convention the activity generator uses. */
function toolGlobal(key) {
  return key.split('-').map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join('');
}

/* Per-tool seed, ONLY for the tools whose at-rest board is empty.
   Filled empirically after reviewing the first unseeded pass — 31 of the 40
   tools show their apparatus on load and need nothing here.

   Seeds drive the tool's REAL controls with real mouse events (which is what
   produces the pointerdown these tools listen for), rather than poking
   internal state. Same thing scripts/local-test-<key>.js does, and it means a
   seed can only produce a state a child could actually reach.

   Step shape: { sel, nth = 0, times = 1, wait = 120 }
     sel   — selector, resolved INSIDE .lcs-stage
     nth   — index, or an array of indices to click in order
     times — click the same nth element N times */
const SEEDS = {
  // A shape with a strand wrapped round it reads as just a shape — the
  // whole story is the strand LEAVING it. So plant the flag (a click on
  // the handle plants it), then run the peel to the end, so the card
  // shows the cord lying straight past the third mark: three and a bit.
  'unroll-tape': [
    { sel: '.urt-flag', nth: 0 },
    { sel: '.urt-foot .urt-chip', nth: 0, wait: 1100 },
  ],
  // ⭐ THE CARD MUST SHOW THE PAYOFF, NOT THE SETUP. At rest the tool
  // opens at 5 and 9 with the piece still attached, which reads as two
  // plain bars — the whole story is the piece coming OFF and landing
  // flush. So walk the handles to 8 and 16 (a tap steps by one, and
  // sixteen is twice eight, where the offcut is visibly the same length
  // as the short plank), then cycle the toggle twice: attached → free →
  // free — and STOP there, one tap short of seated. Seated, the piece
  // has merged with the short plank and reads as one long bar, so the
  // tool's whole invention (a sub-region promoted to its own object)
  // is invisible on the card. Free shows THREE things: two planks, one
  // of them with a piece missing, and that piece floating on its own.
  'comparison-planks': [
    { sel: '.cmp-h-a', nth: [0, 0, 0] },
    { sel: '.cmp-h-b', nth: [0, 0, 0, 0, 0, 0, 0] },
    { sel: '.cmp-foot .cmp-chip', nth: 0, wait: 600 },
  ],
  // empty 10-frame → 6 counters
  'ten-frame': [{ sel: '.tf-cell', nth: [0, 1, 2, 3, 4, 5] }],
  // "Nothing moves yet" → build a rail, then RUN it so a trail is drawn.
  // The run button is .arw-foot .arw-chip[0] (per scripts/local-test-arrow-strip.js).
  'arrow-strip': [
    { sel: '.arw-card', nth: [0, 0, 2, 0, 0] },
    { sel: '.arw-foot .arw-chip', nth: 0, wait: 900 },
  ],
  // blank count grid → walk the count on so numbers fill the cells
  'choral-counting': [{ sel: '.cc-next', times: 14, wait: 70 }],
  // blank 8x8 sheet → paint a block of squares
  'folding-sheet': [{ sel: '.fsh-cell', nth: [9, 10, 11, 17, 18, 19, 25, 26, 27] }],
  // empty day → drop a few activity cards on the timeline
  'our-day': [{ sel: '.od-pal-card', nth: [0, 1, 2, 3] }],
  // empty tray, $0.00 → tender a few coins
  'money-mat': [{ sel: '.mm-coinbtn', nth: [3, 3, 2, 1] }],
  // Empty board. Tray tiles are NOT click-to-place — they are a synthetic
  // pointer clone-drag, so a click does nothing. Same drag the tool's own
  // harness performs (scripts/local-test-letter-tiles.js: dragTrayToBoard).
  // fx/fy are FRACTIONS of the .ltl-board rect — hardcoded pixel targets miss
  // the board, and a miss is silent (the tile just returns to the tray).
  'letter-tiles': [
    { drag: { g: 'c', fx: 0.34, fy: 0.30 } },
    { drag: { g: 'a', fx: 0.47, fy: 0.30 } },
    { drag: { g: 't', fx: 0.60, fy: 0.30 } },
  ],
  // "Nobody has answered yet" → cast votes so bars exist
  'class-graph': [{ sel: '.cgr-vote', nth: [0, 0, 0, 1, 1, 2] }],
  // Nothing exists until something is drawn — no record row at all, and two
  // of the three guess shelves are empty. Sort two pieces onto the shelves,
  // drop the record to its 10-cell setting so it is ONE row rather than four,
  // then draw SEVEN of the ten: enough that the record reads as a record, few
  // enough that the bag stays enabled instead of greying out at 0.5 — and the
  // bag is the hero of this card. Every control here is reachable on the
  // anonymous load the generator performs (the 10-chip is free; the second run
  // and the 40-cell record are not, and are not touched).
  'draw-bag': [
    { sel: '.drb-shelf.drb-pool .drb-gpiece', nth: [0, 0, 0] },
    { sel: '.drb-shelf.drb-in .drb-gpiece', nth: 2 },
    { sel: '.drb-bar .drb-group:first-child .drb-chip', nth: 0 },
    { sel: '.drb-bag', times: 9, wait: 60 },
  ],
  /* THE LIDS: 20 counters, three lids, marker parked — and then LIFTED.
     ⚠ The first seed left the lids DOWN, which is the state where the
     tool has hidden everything it has: three plain circles on an empty
     cream table, saying nothing to anyone browsing the hub. Lifted, the
     card carries the entire idea in one picture — three identical piles
     of six, plus the two that would not share still sitting on the
     table. Foot chips in order: another lid / take one away / lift /
     another table / print. */
  /* ⚠ THE MARKER GOES ON 9, NOT 6. Twenty counters under three lids
     share SIX, so marking 6 would land the class's guess and the answer
     on the same numeral — a card that demonstrates the one thing this
     tool now does by showing it exactly once. 9 puts them apart: a
     filled 9 and a ringed 6, on one strip. ⚠ The lids go down BEFORE the
     marker, because adding a lid voids the commitment. */
  /* THE UNIT HANDLE: the bench is never empty — it opens with two tapes
     already carrying DIFFERENT counts, which is the whole thesis. All the
     seed does is step to a longer object, where the two numbers are
     further apart and the leftover is visible. ⚠ No drag step: this
     generator's only drag shape is letter-tiles' board-fraction clone,
     and inventing a new one here would be untested machinery in a
     screenshot script. Foot order: fit / match / another object / print. */
  'unit-handle': [
    { sel: '.unh-foot .unh-chip', nth: [2, 2] },
  ],
  'lids': [
    { sel: '.lid-bar .lid-chip', nth: 3 },
    { sel: '.lid-foot .lid-chip', nth: [0, 0, 0] },
    { sel: '.lid-mark', nth: 9 },
    { sel: '.lid-foot .lid-chip', nth: 2 },
  ],
};

async function runSeed(page, key) {
  const steps = SEEDS[key];
  if (!steps) return false;
  for (const step of steps) {
    if (step.drag) {
      // clone-drag a tray tile onto the board with real PointerEvents
      await page.evaluate(({ g, fx, fy }) => {
        const src = document.querySelector(`.ltl-traytile[data-g="${g}"]`);
        const board = document.querySelector('.ltl-board');
        if (!src || !board) return;
        const b = board.getBoundingClientRect();
        const x = b.left + b.width * fx, y = b.top + b.height * fy;
        const r = src.getBoundingClientRect();
        const sx = r.left + r.width / 2, sy = r.top + r.height / 2;
        const fire = (type, cx, cy) => src.dispatchEvent(new PointerEvent(type, { pointerId: 7, clientX: cx, clientY: cy, bubbles: true }));
        fire('pointerdown', sx, sy);
        fire('pointermove', sx + 4, sy - 14);
        fire('pointermove', (sx + x) / 2, (sy + y) / 2);
        fire('pointermove', x, y);
        fire('pointerup', x, y);
      }, step.drag);
      await new Promise((r) => setTimeout(r, step.wait ?? 220));
      continue;
    }
    const nths = Array.isArray(step.nth) ? step.nth : Array(step.times || 1).fill(step.nth ?? 0);
    for (const i of nths) {
      const els = await page.$$(`.lcs-stage ${step.sel}`);
      const el = els[i];
      if (!el) continue;                       // tolerate a shifting DOM between clicks
      try { await el.click({ delay: 10 }); } catch { /* off-screen / re-rendered — skip */ }
      await new Promise((r) => setTimeout(r, step.wait ?? 120));
    }
  }
  return true;
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const keys = loadToolKeys().filter((k) => !ONLY || k.includes(ONLY));
  console.log(`Rendering ${keys.length} tool preview(s) → ${OUT}\n`);

  const server = serve();
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  const PORT = server.address().port;
  const BASE = `http://127.0.0.1:${PORT}`;

  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  let ok = 0, fail = 0;
  const fails = [];

  for (const key of keys) {
    const page = await browser.newPage();
    await page.setViewport({ width: 720, height: 640, deviceScaleFactor: 2 });
    const url = `${BASE}/mini-tools/${key}.html?lang=en&embed=compact`;
    try {
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 45000 });
      await page.waitForSelector('.lcs-stage, #lcs-root', { timeout: 15000 });
      await new Promise((r) => setTimeout(r, 900)); // settle: mount + any image fetch
      try {
        if (await runSeed(page, key)) await new Promise((r) => setTimeout(r, 500));
      } catch (e) { console.warn(`  seed failed (${key}), using on-load: ${e.message}`); }
      const stage = (await page.$('.lcs-stage')) || (await page.$('#lcs-root'));
      if (!stage) throw new Error('no .lcs-stage / #lcs-root');
      const box = await stage.boundingBox();
      if (!box || box.width < 8 || box.height < 8) throw new Error(`stage not laid out (${box ? `${box.width}x${box.height}` : 'null'})`);
      const png = await stage.screenshot({ omitBackground: true });
      // Tool stages vary wildly in aspect (720x172 number-line → 691x722
      // letter-tiles). `contain` on a tall stage shrinks the apparatus into an
      // illegible letterboxed sliver, so anything meaningfully taller than the
      // card's 4:3 is cropped from the TOP instead — where every tool puts its
      // apparatus, with only footer controls falling off.
      const tall = FIT === 'auto' && box.height / box.width > 0.85;
      const img = sharp(png);
      await (tall
        ? img.resize(480, 360, { fit: 'cover', position: 'top' })
        : img.resize(480, 360, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      ).webp({ quality: 82 }).toFile(path.join(OUT, `${key}.webp`));
      ok++;
      console.log(`  ok   ${key}  (${Math.round(box.width)}x${Math.round(box.height)}${tall ? ' crop-top' : ''})`);
    } catch (e) {
      fail++;
      fails.push(`${key}: ${e.message}`);
      console.log(`  FAIL ${key} — ${e.message}`);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  server.close();
  console.log(`\nGenerated ${ok} preview(s), ${fail} failure(s) → ${OUT}`);
  if (fails.length) { console.log('Failures (card falls back to glyph):'); fails.forEach((f) => console.log('  • ' + f)); }
  process.exit(0);
})().catch((e) => { console.error('ERROR:', e.message); process.exit(1); });
