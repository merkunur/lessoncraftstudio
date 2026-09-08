#!/usr/bin/env node
/* =====================================================================
   visual-qa-activity.js — THE STANDING VISUAL-QA GATE for activities.
   ---------------------------------------------------------------------
   WHY THIS EXISTS (operator demand, 2026-06-23): visual defects kept
   reaching the operator after "done" because verification happened at ONE
   viewport (phone, 360) while the operator views at DESKTOP (~768), and the
   functional gates only caught horizontal overflow — never the three classes
   that actually shipped: CUT-OFF at desktop, SPARSE (small content floating
   in big cards), and TINY (content too small to read/count).

   This harness sweeps EVERY viewport (phone → desktop) × EVERY round of an
   activity, renders it locally (no deploy), and asserts the measured gates
   below. It captures a screenshot at every key width so the visual-critic
   agent and the operator see the WHOLE sweep, not one width. Run it for
   EVERY activity build/change BEFORE "done" (CLAUDE.md visual-QA doctrine).

   MEASURED GATES (fail the run on ANY, per viewport × round):
     1. FITS        — .lcs-app rendered height ≤ viewport height (no cut-off).
     2. NO OVERFLOW — scrollWidth − clientWidth ≤ 2.
     3. NOT TINY    — smallest visible content node ≥ 14px.
     4. NOT SPARSE  — each answer card's content fills ≥ 0.32 of the card area
                      (and ≥ 0.45 of its width). Skipped for activities that
                      have no answer cards (e.g. single-stage Mochi).
     5. TAP ≥ 44    — every answer card ≥ 44×44.
     6. NO TEXT-CLIP — no `-webkit-line-clamp` node is hiding copy
                      (scrollHeight > clientHeight). Silent by construction:
                      the clamp is intentional, so the node reports no
                      overflow and its box is the intended size — the copy
                      just vanishes. Only a personal Read caught this before.

   Usage:
     node scripts/visual-qa-activity.js --activity=<manifest-id> [--locale=en]
     node scripts/visual-qa-activity.js --activity=mosaic-menders.area-match.3-md-c-6
   Exit 0 = the full sweep is green; exit 1 = any (viewport × round) failed.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.split('=')[1] : d; };
const ACTIVITY = arg('activity', null);
const LOCALE = arg('locale', 'en');
if (!ACTIVITY) { console.error('Usage: node scripts/visual-qa-activity.js --activity=<manifest-id> [--locale=en]'); process.exit(2); }

const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const IMG = path.join(REPO, 'image-library-webp');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.mp3': 'audio/mpeg' };

/* viewport sweep: phone → desktop, each with a realistic device height so a
   vh-based layout resolves like a real device (NOT a fixed tall viewport). */
/* ⚠ `--widths=280,320,...` overrides the sweep. This exists because the narrow
   widths (280/375/390/430) live in audit-activity-mobile.js, which defaults to
   https://www.lessoncraftstudio.com — it CANNOT see a local build, and passing it
   `--locales=sv` for a locale that is not deployed yet silently tests English on
   production instead and reports a confident pass. A local build needs a local
   instrument; this is it. Device heights are interpolated from the nearest
   standard phone so a vh-based layout still resolves realistically. */
const DEFAULT_VIEWPORTS = [
  { w: 320, h: 640 }, { w: 360, h: 740 }, { w: 412, h: 820 },  // phones (fold-fit is strict)
  { w: 768, h: 1000 }, { w: 1024, h: 900 }, { w: 1366, h: 900 }, // tablet portrait + desktop (realistic usable heights)
];
const HEIGHT_FOR = (w) => (w <= 300 ? 653 : w <= 340 ? 640 : w <= 380 ? 740 : w <= 400 ? 780 : w <= 440 ? 820 : w <= 800 ? 1000 : 900);
const WIDTHS_ARG = arg('widths', null);
const VIEWPORTS = WIDTHS_ARG
  ? WIDTHS_ARG.split(',').map((s) => parseInt(s, 10)).filter(Boolean).map((w) => ({ w, h: HEIGHT_FOR(w) }))
  : DEFAULT_VIEWPORTS;
if (!VIEWPORTS.length) { console.error('--widths= parsed to nothing'); process.exit(2); }
const SHOT_WIDTHS = new Set([360, 768, 1024]); // critic + operator eyeball set (phone + two desktop)
const MIN_CONTENT_PX = 14;     // "not tiny"
const SPARSE_AREA = 0.32;      // content/card area floor
const SPARSE_WIDTH = 0.45;     // content/card width floor
const MIN_TAP = 44;            // answer-card tap target
const MIN_KEYPAD_TAP = 36;
const MIN_AXIS_W = 20;         // a scale tick may be narrow, but not a hairline     // §A.13.55 K-2 shell-control minimum; the shell ships minmax(36px,1fr)

function serve() {
  return http.createServer((req, res) => {
    let p = decodeURIComponent(req.url.split('?')[0]), file;
    if (p === '/' || p.endsWith('.html')) file = path.join(MINI, path.basename(p) || 'index.html');
    else if (p.startsWith('/mini-tools/')) file = path.join(MINI, p.slice('/mini-tools/'.length));
    else if (p.startsWith('/image-library-webp/')) file = path.join(IMG, p.slice('/image-library-webp/'.length));
    else file = path.join(MINI, p.replace(/^\//, ''));
    fs.readFile(file, (err, buf) => {
      if (err) { res.statusCode = 404; res.end('not found'); return; }
      res.setHeader('Content-Type', MIME[path.extname(file)] || 'application/octet-stream');
      res.end(buf);
    });
  });
}

/* resolve the activity: scan mini tools/*-activities.json for the id → its
   tool (= wrapper html stem) → parse the LCS.mount(NAME,…) global from html. */
function resolveActivity(id) {
  const files = fs.readdirSync(MINI).filter(f => f.endsWith('-activities.json'));
  for (const f of files) {
    let rows; try { rows = JSON.parse(fs.readFileSync(path.join(MINI, f), 'utf8')); } catch (e) { continue; }
    if (!Array.isArray(rows)) continue;
    const row = rows.find(r => r.id === id);
    if (!row) continue;
    const html = (row.tool || '') + '.html';
    if (!fs.existsSync(path.join(MINI, html))) throw new Error('wrapper html not found: ' + html);
    const src = fs.readFileSync(path.join(MINI, html), 'utf8');
    const m = src.match(/LCS\.mount\(\s*([A-Za-z0-9_$]+)/);
    const slug = (row.slug && (row.slug[LOCALE] || row.slug.en)) || null;
    return { row, html, global: m ? m[1] : null, slug };
  }
  throw new Error('activity id not found in any *-activities.json: ' + id);
}

function safe(s) { return String(s).replace(/[^a-z0-9._-]+/gi, '_'); }

/* in-page measurement — generic across activities. */
function measureInPage() {
  const de = document.documentElement;
  const vw = de.clientWidth, vh = window.innerHeight;
  const app = document.querySelector('.lcs-app') || document.body;
  const appH = Math.ceil(app.getBoundingClientRect().height);
  const overflowX = Math.round(de.scrollWidth - de.clientWidth);

  function vis(el) { const cs = getComputedStyle(el); return cs.display !== 'none' && cs.visibility !== 'hidden' && parseFloat(cs.opacity) !== 0; }

  // NOT TINY measures the ANSWER content the child reads/counts — NOT decorative
  // SVG (character eyes, check/celebrate icons, hearts) and NOT the small
  // reference/target panel. So it's the per-answer-card content bbox (collected
  // in the card loop below) + standalone stage images (e.g. Mochi's treats).
  let minContent = Infinity, minContentCls = '';
  function considerContent(dim, cls) { if (dim > 4 && dim < minContent) { minContent = dim; minContentCls = cls; } }

  // answer cards (the big tappable choices) — convention substrings across engines.
  const cards = Array.from(document.querySelectorAll(
    '[class*="-cand"],[class*="choice-card"],[class*="-choice"],[class*="-card"]'
  )).filter(el => el.tagName === 'BUTTON' || el.getAttribute('role') === 'button' || el.onclick || el.tabIndex >= 0)
    .filter(vis);

  /* Convention-independent fallback: the tool's own tappable controls. Engages ONLY
     when the card selector found nothing, so measured activities are unaffected. */
  const fallbackControls = cards.length ? [] : Array.from(document.querySelectorAll(
    '.lcs-app button, .lcs-app [role="button"]'
  )).filter(el => !/(^|\s)lcs-/.test(el.getAttribute('class') || ''))
    /* an axis control is judged by the axis rule instead — never by both */
    .filter(el => !(window.__VQA_AXIS_SEL && el.matches(window.__VQA_AXIS_SEL))).filter(vis)
    .filter(el => { const r = el.getBoundingClientRect(); return r.width > 8 && r.height > 8; });

  /* the shell KEYPAD is the answer surface for answerType:'number' activities. Counted for
     FITS + TAP only; NOT as an answer card, so SPARSE/NOT-TINY are unchanged elsewhere. */
  /* controls laid out along one shared axis (number-line ticks and the like). Measured for
     OVERLAP rather than against the flat answer-card floor — see MIN_AXIS_W. */
  const axisSel = window.__VQA_AXIS_SEL || null;
  let axis = null;
  if (axisSel) {
    const els = Array.from(document.querySelectorAll(axisSel)).filter(vis)
      .map(el => el.getBoundingClientRect()).filter(r => r.width > 0 && r.height > 0)
      .sort((a, b) => a.left - b.left);
    if (els.length) {
      let worstOverlap = 0, minW = Infinity, minH = Infinity, minPitch = Infinity;
      for (let i = 0; i < els.length; i++) {
        minW = Math.min(minW, els[i].width); minH = Math.min(minH, els[i].height);
        if (i) {
          minPitch = Math.min(minPitch, (els[i].left + els[i].width / 2) - (els[i - 1].left + els[i - 1].width / 2));
          worstOverlap = Math.max(worstOverlap, els[i - 1].right - els[i].left);
        }
      }
      axis = { n: els.length, worstOverlap: Math.round(worstOverlap * 10) / 10, minW: Math.round(minW * 10) / 10, minH: Math.round(minH * 10) / 10, minPitch: Math.round(minPitch * 10) / 10 };
    }
  }
  const keypadKeys = Array.from(document.querySelectorAll('.lcs-activity-keypad .lcs-activity-key, .lcs-activity-keypad button'))
    .filter(vis).filter(el => { const r = el.getBoundingClientRect(); return r.width > 8 && r.height > 8; });

  let worstSparse = null, minTap = Infinity, controlBottom = 0, unmeasured = 0;
  let minKeypadTap = Infinity;
  let minTapCls = null, minKeypadCls = null;
  keypadKeys.forEach(el => {
    const r = el.getBoundingClientRect();
    /* NOT folded into minTap: a 37px key must never mask an undersized answer CARD */
    const kd = Math.min(r.width, r.height);
    if (kd < minKeypadTap) { minKeypadTap = kd; minKeypadCls = (el.getAttribute('class') || el.tagName).slice(0, 28); }
    controlBottom = Math.max(controlBottom, r.bottom);
  });
  fallbackControls.forEach(el => {
    const r = el.getBoundingClientRect();
    const fd = Math.min(r.width, r.height);
    if (fd < minTap) { minTap = fd; minTapCls = (el.getAttribute('class') || el.tagName).slice(0, 28); }
    controlBottom = Math.max(controlBottom, r.bottom);
  });
  cards.forEach(el => {
    const cr = el.getBoundingClientRect();
    if (cr.width < 8 || cr.height < 8) return;
    const cd = Math.min(cr.width, cr.height);
    if (cd < minTap) { minTap = cd; minTapCls = (el.getAttribute('class') || el.tagName).slice(0, 28); }
    controlBottom = Math.max(controlBottom, cr.bottom);
    // content bbox = union of child svg/img (excluding tiny check/badge icons)
    const kids = el.querySelectorAll('svg, img');
    let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity, found = false, isText = false;
    kids.forEach(k => {
      if (!vis(k) || k.closest('[class*="check"],[class*="badge"]')) return;
      const r = k.getBoundingClientRect(); if (r.width < 4 || r.height < 4) return;
      found = true; x0 = Math.min(x0, r.left); y0 = Math.min(y0, r.top); x1 = Math.max(x1, r.right); y1 = Math.max(y1, r.bottom);
    });
    {
      /* Measure the card's TEXT too, and UNION it with any graphic — do not treat text as a
         mere fallback. A card holding a picture AND a label gives the picture well under a
         third of the area by design (measured: affix r10 = 57% width x 56% height = 0.32 area
         for a perfectly reasonable card), so measuring the graphic alone false-accuses it.
         What the child reads is graphic + label together. */
      // TEXT: glyph bbox via a Range over the card's own text nodes.
      const rng = document.createRange();
      let tx0 = Infinity, ty0 = Infinity, tx1 = -Infinity, ty1 = -Infinity, anyText = false;
      const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null);
      let tn;
      while ((tn = walker.nextNode())) {
        if (!tn.nodeValue || !tn.nodeValue.trim()) continue;
        if (tn.parentElement && tn.parentElement.closest('[class*="check"],[class*="badge"]')) continue;
        rng.selectNodeContents(tn);
        const r = rng.getBoundingClientRect();
        if (r.width < 2 || r.height < 2) continue;
        anyText = true;
        tx0 = Math.min(tx0, r.left); ty0 = Math.min(ty0, r.top);
        tx1 = Math.max(tx1, r.right); ty1 = Math.max(ty1, r.bottom);
      }
      if (!anyText && !found) { unmeasured++; return; }   // genuinely nothing in the card
      if (anyText) {
        isText = !found;                 // text-ONLY card -> sparse does not apply
        found = true;
        x0 = Math.min(x0, tx0); y0 = Math.min(y0, ty0);
        x1 = Math.max(x1, tx1); y1 = Math.max(y1, ty1);
      }
    }
    const cw = x1 - x0, ch = y1 - y0;
    /* For a GRAPHIC, the smaller dimension is the legibility risk (a sliver is a defect
       either way). For TEXT it is not: a single-digit numeral like 8 has a narrow bbox at
       a perfectly legible size, so min(w,h) reports the glyph WIDTH and false-accuses.
       Legibility of text is its HEIGHT. Measured: round 5 of skipcount reported TINY(11px)
       on the glyph 8 while the computed font-size was 20px. */
    considerContent(isText ? ch : Math.min(cw, ch), isText ? 'card-text' : 'card-content');
    const areaRatio = (cw * ch) / (cr.width * cr.height);
    const widthRatio = cw / cr.width;
    if (!isText && (!worstSparse || areaRatio < worstSparse.areaRatio)) worstSparse = { areaRatio, widthRatio, cls: (el.getAttribute('class') || '').slice(0, 40) };
  });

  // standalone stage content (e.g. Mochi's treat images) — not in a card/chrome.
  document.querySelectorAll('.lcs-app img, .lcs-app svg image').forEach(el => {
    if (el.closest('.lcs-bar, .lcs-activity-check, .lcs-activity-next, [class*="-cand"], [class*="-card"], [class*="choice"]')) return;
    if (!vis(el)) return;
    const r = el.getBoundingClientRect(); considerContent(Math.min(r.width, r.height), el.tagName.toLowerCase());
  });

  // FITS measures the bottom of the lowest CONTROL (answer cards + Check/Next) —
  // i.e. "are all the choices + the Check button visible" — NOT the app's
  // trailing padding (which inflates .lcs-app height without hiding anything).
  document.querySelectorAll('.lcs-activity-check, .lcs-activity-next').forEach(el => {
    if (!vis(el)) return; const r = el.getBoundingClientRect(); if (r.width > 8 && r.height > 8) controlBottom = Math.max(controlBottom, r.bottom);
  });

  // HEADER CLIP: the shell title overrun by / overlapping the chrome controls,
  // or its own text ellipsized (a real desktop defect — long titles at wide
  // widths where the shell switches to a row header).
  let headerClip = null;
  const titleEl = document.querySelector('.lcs-title');
  const ctrlEl = document.querySelector('.lcs-controls');
  if (titleEl && vis(titleEl)) {
    const a = titleEl.getBoundingClientRect();
    if (ctrlEl && vis(ctrlEl)) {
      const b = ctrlEl.getBoundingClientRect();
      const ox = Math.min(a.right, b.right) - Math.max(a.left, b.left);
      const oy = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
      if (ox > 2 && oy > 2) headerClip = { overlapPx: Math.round(ox) };
    }
    if (!headerClip && titleEl.scrollWidth > titleEl.clientWidth + 2) headerClip = { textClipPx: titleEl.scrollWidth - titleEl.clientWidth };
  }

  // TEXT CLIP: body copy silently eaten by `-webkit-line-clamp` — the vertical
  // twin of HEADER-CLIP above. This is the ONE class nothing else here can see:
  // the clamp is BY DESIGN, so the node reports no overflow (OVERFLOW measures
  // the document, not the node), its box is exactly the intended size (FITS and
  // SPARSE are happy), and the lost sentence is simply invisible. A clamped
  // -webkit-box still reports the FULL content height in scrollHeight, so
  // scrollHeight > clientHeight is the only signal that copy was discarded.
  // Empirical: pim-comma-mail's `.pcm-say` bubble ate the back half of the
  // German intro mid-sentence at 360 while every gate stayed green.
  //
  // ⚠ Scoped to nodes with a REAL line-clamp on purpose — do NOT widen this to
  // bare `overflow:hidden`, which containers legitimately use for rounded
  // corners/masks with children extending past the box (false positives).
  let textClip = null;
  document.querySelectorAll('.lcs-app *').forEach(el => {
    if (!vis(el)) return;
    const cs = getComputedStyle(el);
    const clamp = cs.webkitLineClamp || cs.lineClamp;
    if (!clamp || clamp === 'none') return;
    if (!(el.textContent || '').trim()) return;
    const over = el.scrollHeight - el.clientHeight;
    if (over <= 2) return;
    if (!textClip || over > textClip.clipPx) {
      textClip = {
        clipPx: Math.round(over),
        lines: clamp,
        cls: (el.getAttribute('class') || el.tagName.toLowerCase()).slice(0, 40),
        text: (el.textContent || '').trim().slice(0, 60),
      };
    }
  });

  return {
    vw, vh, appH, overflowX,
    controlBottom: Math.round(controlBottom),
    minContent: minContent === Infinity ? null : Math.round(minContent), minContentCls,
    minTapCls, minKeypadCls, axis,
    cards: cards.length, unmeasured, fallbackControls: fallbackControls.length, keypadKeys: keypadKeys.length, minKeypadTap: (minKeypadTap === Infinity ? null : Math.round(minKeypadTap)), headerClip, textClip,
    worstSparse, minTap: minTap === Infinity ? null : Math.round(minTap),
  };
}

function evalGates(m, terminal) {
  const fails = [];
  // "fits" = the lowest control (all choices + Check) is visible; trailing app
  // padding does not count as cut-off. Falls back to appH if no controls found.
  const bottom = m.controlBottom || m.appH;
  if (bottom > m.vh + 8) fails.push(`CUT-OFF(control=${bottom}>vh=${m.vh})`);
  if (m.overflowX > 2) fails.push(`OVERFLOW(${m.overflowX}px)`);
  if (m.minContent != null && m.minContent < MIN_CONTENT_PX) fails.push(`TINY(${m.minContent}px ${m.minContentCls})`);
  if (m.cards > 0 && m.worstSparse && (m.worstSparse.areaRatio < SPARSE_AREA || m.worstSparse.widthRatio < SPARSE_WIDTH)) {
    fails.push(`SPARSE(area=${m.worstSparse.areaRatio.toFixed(2)} w=${m.worstSparse.widthRatio.toFixed(2)} ${m.worstSparse.cls})`);
  }
  /* ⚠ NON-VACUITY BEFORE THE FLOOR. "minTap is null" and "minTap is fine" are
     different answers and only one of them is a pass. Every activity puts at least
     one control of its own on the screen; measuring none means the instrument
     missed, not that the layout is good. */
  const measuredControls = m.cards + (m.fallbackControls || 0) + (m.keypadKeys || 0);
  /* A terminal phase (a win screen) legitimately carries no TOOL control — the child
     advances with the shell's own Check/Next, which the fallback selector excludes by
     design. The driver asserts this per step; every other gate still runs. */
  if (!terminal && measuredControls === 0) fails.push('NO-CONTROLS-MEASURED(neither an answer card nor a tool button was found — the gate measured nothing)');
  if (!terminal && measuredControls > 0 && m.minTap != null && m.minTap < MIN_TAP) fails.push(`TAP(${m.minTap}px<${MIN_TAP} on .${m.minTapCls})`);
  /* the shell keypad's own floor — 36px, the recorded K-2 minimum for shell controls
     (audit-activity-mobile.js WARNs below it; the shell ships minmax(36px,1fr)). */
  if (m.minKeypadTap != null && m.minKeypadTap < MIN_KEYPAD_TAP) fails.push(`KEYPAD-TAP(${m.minKeypadTap}px<${MIN_KEYPAD_TAP} on .${m.minKeypadCls})`);
  if (m.axis) {
    if (m.axis.worstOverlap > 0.5) fails.push(`AXIS-OVERLAP(${m.axis.worstOverlap}px — adjacent targets overlap on a ${m.axis.minPitch}px pitch; a tap near a boundary selects the neighbour)`);
    if (m.axis.minW < MIN_AXIS_W) fails.push(`AXIS-WIDTH(${m.axis.minW}px<${MIN_AXIS_W})`);
    if (m.axis.minH < MIN_TAP) fails.push(`AXIS-HEIGHT(${m.axis.minH}px<${MIN_TAP} — height is unconstrained, so there is no excuse for it)`);
  }
  if (m.headerClip) fails.push(`HEADER-CLIP(shell title ${m.headerClip.overlapPx ? 'overlaps controls ' + m.headerClip.overlapPx + 'px' : 'ellipsized ' + m.headerClip.textClipPx + 'px'})`);
  if (m.textClip) fails.push(`TEXT-CLIP(${m.textClip.cls} line-clamp:${m.textClip.lines} hides ${m.textClip.clipPx}px — "${m.textClip.text}")`);
  return fails;
}

/* ---- phase drivers -------------------------------------------------------
   scripts/visual-qa-phases/<safe-activity-id>.js exports { steps: [{name, drive(page)}] }.
   Where one exists, every round is measured at the opening frame AND after each step. */
const PHASE_DIR = path.join(__dirname, 'visual-qa-phases');
function loadPhaseDriver(id) {
  const f = path.join(PHASE_DIR, safe(id) + '.js');
  if (!fs.existsSync(f)) return null;
  const d = require(f);
  if (!d || !Array.isArray(d.steps) || !d.steps.length) {
    console.error('FAIL: ' + f + ' exports no steps[] — a driver that drives nothing is worse than none');
    process.exit(2);
  }
  d.steps.forEach((s, i) => {
    if (!s || typeof s.drive !== 'function' || !s.name) {
      console.error('FAIL: ' + f + ' step ' + i + ' needs {name, drive(page)}');
      process.exit(2);
    }
  });
  return d;
}
/* what is on the screen right now, as a string. A step that does not change this did
   NOT happen, whatever it returned. */
function controlSignature() {
  const app = document.querySelector('.lcs-app');
  if (!app) return '';
  const nodes = [...app.querySelectorAll('button,input,select,[role="button"]')];
  return nodes.length + '|' + nodes.map(n => (n.className || '') + ':' + (n.textContent || '').trim().slice(0, 12)).join(',');
}

(async () => {
  const A = resolveActivity(ACTIVITY);
  if (!A.slug) { console.error('activity has no slug for locale ' + LOCALE); process.exit(2); }
  if (!A.global) console.warn('WARN: could not parse LCS.mount global from ' + A.html + ' — round-forcing disabled (round 0 only)');

  const DRIVER = loadPhaseDriver(ACTIVITY);
  const AXIS_SEL = (DRIVER && DRIVER.axisControls && DRIVER.axisControls.selector) || null;
  const puppeteer = require('puppeteer');
  const server = serve();
  await new Promise(r => server.listen(0, '127.0.0.1', r));
  const PORT = server.address().port;
  const BASE = `http://127.0.0.1:${PORT}`;
  const SHOT_DIR = path.join(REPO, 'docs', 'audit-results', safe(A.row.tool), 'qa');
  fs.mkdirSync(SHOT_DIR, { recursive: true });

  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  const page = await browser.newPage();
  await page.setCacheEnabled(false);
  const errs = [];
  const isNoise = s => /Failed to load resource|favicon|\/audio\/|net::ERR/i.test(s);
  page.on('console', m => { if (m.type() === 'error' && !isNoise(m.text())) errs.push(m.text().slice(0, 140)); });
  page.on('pageerror', e => { if (!isNoise(e.message)) errs.push(e.message.slice(0, 140)); });

  const url = `${BASE}/${A.html}?lang=${LOCALE}&activity=${encodeURIComponent(ACTIVITY)}&embed=1`;
  await page.setViewport({ width: 412, height: 900, deviceScaleFactor: 2 });
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
  await page.waitForFunction(() => document.querySelector('.lcs-app'), { timeout: 15000 });
  if (AXIS_SEL) await page.evaluateOnNewDocument(s => { window.__VQA_AXIS_SEL = s; }, AXIS_SEL);
  if (AXIS_SEL) await page.evaluate(s => { window.__VQA_AXIS_SEL = s; }, AXIS_SEL);

  // pool size (round count) for nextTask-pattern tools
  let N = 1;
  if (A.global) {
    N = await page.evaluate(g => { const t = window[g]; return (t && t._pool && t._pool.length) || 1; }, A.global) || 1;
  }
  // Measure EVERY round, not the first 8 — a >8-round activity (e.g. mending-basket
  // had 15) otherwise ships rounds 9+ NEVER measured at any viewport (the desktop
  // cut-off blind spot, 2026-06-23). 40 is a sane runaway-bound; real activities ≤~16.
  N = Math.min(N, 40);

  async function forceRound(k) {
    if (!A.global) return k === 0; // can only show whatever loaded
    const ok = await page.evaluate((g, k) => {
      const t = window[g];
      if (!t || !t._pool || !t._pool.length || !t.nextTask) return false;
      const n = t._pool.length, order = [];
      for (let i = 0; i < n; i++) order.push(i);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0;
      if (typeof window.LCS_reloadFirstTask === 'function') { window.LCS_reloadFirstTask(); return true; }
      return false;
    }, A.global, k);
    return ok;
  }

  const records = []; // {round, phase, w, h, fails, m}
  const phaseFaults = [];
  console.log(`visual-qa: ${ACTIVITY}  (${A.html}, global ${A.global || '—'}, ${N} round(s) × ${VIEWPORTS.length} viewports)`);
  if (AXIS_SEL) console.log('  axis controls: ' + AXIS_SEL + '  — measured for OVERLAP + width + height, not the flat ' + MIN_TAP + 'px card floor\n    (' + DRIVER.axisControls.why + ')');
  if (DRIVER) console.log(`  phases: open + ${DRIVER.steps.map(s => s.name).join(' + ')}  (${DRIVER.steps.length + 1} per round)`);
  else console.log('  phases: open ONLY — no driver at scripts/visual-qa-phases/' + safe(ACTIVITY) + '.js.\n' +
                  '  ⚠ If this activity has a second screen (a keypad, a recap, a win state), NOTHING below has ever seen it.');
  console.log('');

  for (let k = 0; k < N; k++) {
    const forced = await forceRound(k);
    if (A.global && !forced && k > 0) break; // non-pool tool: only round 0 is meaningful
    await page.waitForFunction(() => document.querySelector('.lcs-app'), { timeout: 5000 }).catch(() => {});

    /* the phases of THIS round: the opening frame, then one per driver step. */
    const phases = ['open'].concat(DRIVER ? DRIVER.steps.map(s => s.name) : []);
    for (let pi = 0; pi < phases.length; pi++) {
      if (pi > 0) {
        /* drive into the next phase at a mid-sweep width, then sweep it. A step that does
           not move the control signature DID NOT HAPPEN — fail loudly (#39). */
        await page.setViewport({ width: 412, height: 820, deviceScaleFactor: 2 });
        await new Promise(r => setTimeout(r, 120));
        const before = await page.evaluate(controlSignature);
        let drove = false, why = '';
        try { drove = await DRIVER.steps[pi - 1].drive(page); } catch (e) { why = e.message; }
        await new Promise(r => setTimeout(r, 160));
        const after = await page.evaluate(controlSignature);
        if (drove === false) { phaseFaults.push(`r${k}/${phases[pi]}: the step reported it could not run${why ? ' — ' + why : ''}`); break; }
        if (before === after) { phaseFaults.push(`r${k}/${phases[pi]}: the step ran but the screen did not change — it did not happen`); break; }
      }
      for (const vp of VIEWPORTS) {
        await page.setViewport({ width: vp.w, height: vp.h, deviceScaleFactor: 2 });
        await new Promise(r => setTimeout(r, 260)); // settle fonts + clamp() reflow
        const m = await page.evaluate(measureInPage);
        const isTerminal = pi > 0 && DRIVER.steps[pi - 1].terminal === true;
        const fails = evalGates(m, isTerminal);
        records.push({ round: k, phase: phases[pi], w: vp.w, h: vp.h, fails, m });
        const tag = fails.length ? 'FAIL' : 'ok  ';
        const ph = pi === 0 ? '' : '/' + phases[pi];
        console.log(`  ${tag} r${k}${ph} @${vp.w}×${vp.h}  ctrlBottom=${m.controlBottom} cards=${m.cards}${m.fallbackControls ? '+' + m.fallbackControls + 'btn' : ''} content=${m.minContent ?? '—'} sparse=${m.worstSparse ? m.worstSparse.areaRatio.toFixed(2) : '—'} tap=${m.minTap ?? '—'}${fails.length ? '  :: ' + fails.join(' | ') : ''}`);
        if (SHOT_WIDTHS.has(vp.w)) {
          /* ⚠ the locale MUST be in the filename. Without it an --locale=en baseline run
             silently OVERWRITES the sv evidence in the same directory, and the definition of
             done ("I read the sv renders myself") then reads English while believing it is
             Swedish. en keeps the bare name so existing tracked screenshots stay put. */
          const suffix = (pi === 0 ? '' : '-' + safe(phases[pi])) + (LOCALE === 'en' ? '' : '-' + safe(LOCALE));
          const f = path.join(SHOT_DIR, `${safe(ACTIVITY)}-r${k}${suffix}-${vp.w}x${vp.h}.png`);
          await page.screenshot({ path: f, fullPage: true });
        }
      }
    }
  }

  await browser.close();
  server.close();

  const failed = records.filter(r => r.fails.length);
  console.log('');
  if (phaseFaults.length) {
    console.error(`VISUAL-QA FAILED — ${phaseFaults.length} phase driver fault(s):`);
    phaseFaults.forEach(f => console.error('  • ' + f));
    process.exit(1);
  }
  if (errs.length) console.log(`NOTE console errors: ${errs.slice(0, 3).join(' | ')}`);
  console.log(`Screenshots: ${SHOT_DIR}  (widths ${[...SHOT_WIDTHS].join('/')} × ${N} round(s))`);
  if (failed.length) {
    console.error(`\nVISUAL-QA FAILED — ${failed.length}/${records.length} (round × viewport) render(s):`);
    failed.forEach(r => console.error(`  • r${r.round}${r.phase && r.phase !== 'open' ? '/' + r.phase : ''} @${r.w}×${r.h} — ${r.fails.join(' | ')}`));
    process.exit(1);
  }
  const phaseCount = new Set(records.map(r => r.phase)).size;
  console.log(`\nVISUAL-QA PASSED — ${records.length} renders across ${N} round(s) × ${phaseCount} phase(s) × ${VIEWPORTS.length} viewports: FITS (no cut-off) + no overflow + content ≥${MIN_CONTENT_PX}px + not sparse + tap ≥${MIN_TAP}px at EVERY width incl. desktop 768/1024.`);
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(2); });
