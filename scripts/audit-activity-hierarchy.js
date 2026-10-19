#!/usr/bin/env node
/* =====================================================================
   audit-activity-hierarchy.js — THE HIERARCHY GATE for activities.
   ---------------------------------------------------------------------
   WHY (operator 2026-10-15): "the size and proportion of the elements …
   sometimes the main elements of the activities are smaller than
   secondary stuff … the illustrations are terrible … take the tools as
   reference point." visual-qa-activity.js measures fit/overflow/tiny/
   sparse-card/tap — every one was green on the renders the operator
   rejected. Nothing measured the HIERARCHY. This gate does, at the widths
   that matter (704 = the live iframe on every desktop, 360 = a phone,
   1024), every round, forced through the same `_order` seam visual-qa
   uses.

   MEASURED GATES (FAIL on any, per viewport × round):
     WIDTH      stage-content bbox width ÷ card inner width ≥ the floor
                measured on the four reference tools (`--measure`; see the
                note at WIDTH_FILL_FLOOR for why area-share is only printed).
     MATERIAL   the tallest stage element ≥ 2.5 × the task-line font size,
                and the task-line font ≤ 24 px (text never out-sizes the
                apparatus).
     PICTURES   every <img> under /image-library-webp/ has short side
                ≥ 96 px at ≥ 700 wide, ≥ 64 at a phone width.
     LIBRARY    every <img src> is under /image-library-webp/themes/.
     DRAWN      no inline <svg> wider than 40 px outside the engine's
                declared apparatus prefixes (tool.apparatusClasses), and
                no `role="img"` svg at all (every hand-drawn mascot used
                one). A source check backs it: the wrapper + core contain
                no `role="img"`.
     BAND       card bottom − lowest content bottom ≤ 12 % of card height.

   Usage:
     node scripts/audit-activity-hierarchy.js --activity=<manifest id> [--locale=en] [--widths=360,704,1024]
     node scripts/audit-activity-hierarchy.js --measure            (the four reference tools)
   Poison (must FAIL): --activity=echo-grove.match-the-rune.3-oa-a-1
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const has = (k) => process.argv.includes('--' + k);
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools'), IMG = path.join(REPO, 'image-library-webp');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png' };

/* ⭐ MEASURED 2026-10-15 with --measure on the four reference tools
   (number-talk-easel · learning-clock · place-value-lab · pattern-bench):
     share (stage content ÷ card inner)  @360 0.80-1.11 · @704 0.80-0.89 · @1024 0.75-0.84
     widthFill (stage content width ÷ card inner width)  0.93-0.96 at every width
   ⚠ SHARE was tried as the gate and REJECTED by its own data: it varies with
   card HEIGHT (place-value-lab 0.86 → 0.75 between 704 and 1024 with the same
   apparatus), so it penalises a short, correct card (three animals in a line)
   while saying nothing about a small owl in a tall one. It is printed, never
   failed. The complaint it was meant to catch is carried by the gates that do
   discriminate: MATERIAL (apparatus ≥ 2.5× the text), PICTURES (floor),
   DRAWN, BAND and WIDTH (the apparatus uses the width the tools use:
   floor = lowest measured 0.93 − 0.03). Re-run --measure if the tools change. */
const WIDTH_FILL_FLOOR = 0.90;
const TEXT_MAX = 24, MATERIAL_RATIO = 2.5, BAND_MAX = 0.12;
const WIDTHS = arg('widths', '360,704,1024').split(',').map(Number);
const REFERENCE = ['number-talk-easel', 'learning-clock', 'place-value-lab', 'pattern-bench'];

function serve() {
  return http.createServer((req, res) => {
    let p = decodeURIComponent(req.url.split('?')[0]), file;
    if (p.endsWith('.html')) file = path.join(MINI, path.basename(p));
    else if (p.startsWith('/mini-tools/')) file = path.join(MINI, p.slice(12));
    else if (p.startsWith('/image-library-webp/')) file = path.join(IMG, p.slice(20));
    else file = path.join(MINI, p.replace(/^\//, ''));
    fs.readFile(file, (e, b) => { if (e) { res.statusCode = 404; res.end(); return; } res.setHeader('Content-Type', MIME[path.extname(file)] || 'application/octet-stream'); res.end(b); });
  });
}
function resolve(id) {
  for (const f of fs.readdirSync(MINI).filter(f => f.endsWith('-activities.json'))) {
    let rows; try { rows = JSON.parse(fs.readFileSync(path.join(MINI, f), 'utf8')); } catch (e) { continue; }
    const row = Array.isArray(rows) && rows.find(r => r.id === id);
    if (row) {
      const html = fs.readFileSync(path.join(MINI, row.tool + '.html'), 'utf8');
      const g = html.match(/LCS\.mount\(\s*([A-Za-z0-9_$]+)/);
      const scripts = [...html.matchAll(/src="\/mini-tools\/([^"?]+)/g)].map(m => m[1]);
      return { row, html: row.tool + '.html', global: g ? g[1] : null, scripts };
    }
  }
  throw new Error('activity not found: ' + id);
}

/* in-page measurement, shared by --measure and the gate */
const MEASURE = (globalName) => {
  const app = document.querySelector('.lcs-app'); const stage = document.querySelector('.lcs-stage');
  const R = (el) => el.getBoundingClientRect();
  const ar = R(app), cs = getComputedStyle(app);
  const inner = { left: ar.left + parseFloat(cs.paddingLeft), right: ar.right - parseFloat(cs.paddingRight), top: ar.top + parseFloat(cs.paddingTop), bottom: ar.bottom - parseFloat(cs.paddingBottom) };
  const innerArea = (inner.right - inner.left) * (inner.bottom - inner.top);
  const vis = (el) => { const r = R(el); const s = getComputedStyle(el); return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && s.opacity !== '0'; };
  /* stage content bbox = union of visible leaf-ish boxes inside the stage */
  let b = null, tallest = 0;
  stage.querySelectorAll('*').forEach(el => {
    if (!vis(el)) return;
    const r = R(el);
    if (r.width < 4 || r.height < 4) return;
    b = b ? { left: Math.min(b.left, r.left), top: Math.min(b.top, r.top), right: Math.max(b.right, r.right), bottom: Math.max(b.bottom, r.bottom) } : { left: r.left, top: r.top, right: r.right, bottom: r.bottom };
    if (el.children.length === 0 || el.tagName === 'IMG' || el.tagName === 'BUTTON' || el.tagName === 'svg') tallest = Math.max(tallest, r.height);
  });
  /* mandatory activity chrome, measured: the task line, the bubble, the answer
     surface and the action row — the stage shares the card with them */
  let chromeH = 0;
  ['.lcs-activity-prompt', '.lcs-activity-bubble', '.lcs-activity-answer', '.lcs-activity-actions'].forEach(sel => {
    const el = document.querySelector(sel); if (!el || !vis(el)) return;
    /* the element plus the spacing it consumes: up to the next visible sibling */
    let next = el.nextElementSibling; while (next && !vis(next)) next = next.nextElementSibling;
    const bottomEdge = next ? R(next).top : inner.bottom;
    chromeH += Math.max(R(el).height, bottomEdge - R(el).top);
  });
  const innerH = inner.bottom - inner.top;
  const usable = innerArea * Math.max(0.3, (innerH - chromeH) / innerH);
  const share = b ? ((b.right - b.left) * (b.bottom - b.top)) / usable : 0;
  /* the HERO ratio: the apparatus (stage content height) against everything
     that is not apparatus (header + the activity chrome, with spacing). A tool
     is mostly apparatus; the rejected activities were mostly chrome. */
  const header = document.querySelector('.lcs-header');
  let headerH = 0; if (header && vis(header)) { let nx = header.nextElementSibling; while (nx && !vis(nx)) nx = nx.nextElementSibling; headerH = Math.max(R(header).height, (nx ? R(nx).top : inner.bottom) - R(header).top); }
  const hero = b ? (b.bottom - b.top) / Math.max(1, headerH + chromeH) : 0;
  const widthFill = b ? (b.right - b.left) / (inner.right - inner.left) : 0;
  const promptEl = document.querySelector('.lcs-activity-prompt-text');
  const promptPx = promptEl ? parseFloat(getComputedStyle(promptEl).fontSize) : 0;
  const imgs = [...document.querySelectorAll('.lcs-app img')].filter(vis).map(i => ({ src: i.getAttribute('src') || '', short: Math.min(R(i).width, R(i).height), mark: i.hasAttribute('data-mark') }));
  const tool = window[globalName];
  const prefixes = (tool && tool.apparatusClasses) || [];
  const svgs = [...document.querySelectorAll('.lcs-stage svg')].filter(vis).map(s => { const r = R(s); const owner = s.closest('[class]'); const cls = (owner && owner.getAttribute('class')) || ''; return { w: r.width, role: s.getAttribute('role'), cls, declared: prefixes.some(p => cls.split(/\s+/).some(c => c.startsWith(p))) }; });
  /* lowest content vs card bottom */
  let lowest = 0;
  app.querySelectorAll('*').forEach(el => { if (!vis(el) || el.classList.contains('lcs-drawer') || el.classList.contains('lcs-drawer-scrim')) return; lowest = Math.max(lowest, R(el).bottom); });
  const band = (ar.bottom - lowest) / ar.height;
  return { share: +share.toFixed(3), hero: +hero.toFixed(2), widthFill: +widthFill.toFixed(3), tallest, promptPx, imgs, svgs, band: +band.toFixed(3), cardH: ar.height };
};

(async () => {
  const server = serve(); await new Promise(r => server.listen(0, '127.0.0.1', r));
  const base = 'http://127.0.0.1:' + server.address().port;
  const puppeteer = require('puppeteer');
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  const wait = (ms) => new Promise(r => setTimeout(r, ms));

  if (has('measure')) {
    for (const w of WIDTHS) for (const t of REFERENCE) {
      const page = await browser.newPage();
      await page.setViewport({ width: w, height: w <= 420 ? 740 : 900 });
      await page.goto(`${base}/${t}.html?lang=en&embed=1`, { waitUntil: 'networkidle0' });
      await wait(500);
      const m = await page.evaluate(MEASURE, 'x');
      console.log(`@${w} ${t.padEnd(20)} share=${m.share} hero=${m.hero} widthFill=${m.widthFill} tallest=${m.tallest.toFixed(0)} card=${m.cardH.toFixed(0)}`);
      await page.close();
    }
    await browser.close(); server.close(); return;
  }

  const id = arg('activity', null), loc = arg('locale', 'en');
  if (!id) { console.error('need --activity=<id> or --measure'); process.exit(2); }
  const { html, global, scripts } = resolve(id);
  let PASS = 0, FAIL = 0;
  const is = (c, m) => { if (c) PASS++; else { FAIL++; console.error('   FAIL: ' + m); } };
  /* source check: no role="img" svg in the engine's own files */
  for (const s of scripts) {
    if (/^lcs-/.test(s)) continue;
    const src = fs.readFileSync(path.join(MINI, s), 'utf8');
    is(!/role=\\?"img\\?"/.test(src), `${s} contains an svg role="img" (a hand-drawn figure)`);
  }
  for (const w of WIDTHS) {
    const page = await browser.newPage();
    await page.setViewport({ width: w, height: w <= 420 ? 740 : 900 });
    await page.goto(`${base}/${html}?activity=${encodeURIComponent(id)}&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await wait(600);
    const n = await page.evaluate((g) => { const t = window[g]; return t && t._pool ? t._pool.length : (t && t.tasks ? t.tasks.length : 1); }, global);
    const rounds = Math.min(n, 11);
    for (let i = 0; i < rounds; i++) {
      if (n > 1) {
        const forced = await page.evaluate((g, i) => { const t = window[g]; if (!t || !t._pool) return false; const order = [i]; for (let k = 0; k < t._pool.length; k++) if (k !== i) order.push(k); t._order = order; t._curPass = 0; if (window.LCS_reloadFirstTask) { window.LCS_reloadFirstTask(); return true; } return false; }, global, i);
        if (!forced && i > 0) break;
        await wait(250);
      }
      const m = await page.evaluate(MEASURE, global);
      const tag = `[${id} @${w} r${i}]`;
      const empty = await page.evaluate((g) => { const t = window[g]; return !!(t && t.st && t.st.n === 0); }, global);
      if (!empty) is(m.widthFill >= WIDTH_FILL_FLOOR, `${tag} WIDTH fill ${m.widthFill} < ${WIDTH_FILL_FLOOR}`);
      is(m.promptPx <= TEXT_MAX, `${tag} task line ${m.promptPx}px > ${TEXT_MAX}`);
      if (!empty) is(m.tallest >= MATERIAL_RATIO * m.promptPx, `${tag} MATERIAL tallest ${m.tallest.toFixed(0)} < ${MATERIAL_RATIO}× text ${m.promptPx}`);
      /* RULINGS (data marks): inside a graph, a library picture used as a DATA MARK — tagged data-mark — may be
         smaller, but never below 40 px at 704 / 30 px at 360. Every other picture keeps the 96 / 64 floor. */
      const floor = w >= 700 ? 96 : 64, markFloor = w >= 700 ? 40 : 30;
      m.imgs.forEach(im => { const f = im.mark ? markFloor : floor; is(/^\/image-library-webp\/themes\//.test(im.src), `${tag} LIBRARY ${im.src}`); is(im.short >= f - 0.5, `${tag} ${im.mark ? 'DATA MARK' : 'PICTURE'} ${im.short.toFixed(0)}px < ${f} (${im.src})`); });
      m.svgs.forEach(s => { is(s.role !== 'img', `${tag} DRAWN svg role=img in .${s.cls}`); is(s.w <= 40 || s.declared, `${tag} DRAWN undeclared svg ${s.w.toFixed(0)}px wide in .${s.cls}`); });
      is(m.band <= BAND_MAX, `${tag} BAND ${m.band} > ${BAND_MAX}`);
      if (i === 0) console.log(`${tag} share=${m.share} hero=${m.hero} widthFill=${m.widthFill} tallest=${m.tallest.toFixed(0)} text=${m.promptPx} imgs=${m.imgs.length} svgs=${m.svgs.length} band=${m.band}`);
    }
    await page.close();
  }
  await browser.close(); server.close();
  console.log(`audit-activity-hierarchy: ${PASS} pass, ${FAIL} fail — ${id}`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
