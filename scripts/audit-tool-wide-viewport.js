/* =====================================================================
   audit-tool-wide-viewport.js — the wide-viewport program's instrument
   ---------------------------------------------------------------------
   Run:
     node scripts/audit-tool-wide-viewport.js --measure [--tool=k,k]
     node scripts/audit-tool-wide-viewport.js --tool=<key>
     node scripts/audit-tool-wide-viewport.js --all
     node scripts/audit-tool-wide-viewport.js --poison

   TWO MODES, and the order matters.

   ⭐ --measure comes FIRST and asserts nothing. It reports, per tool, the
   natural card box, the apparatus rect as a share of the viewport, the
   smallest numeral, the smallest control, the bench aspect, and whether
   the tool reaches outside its own card. Every FILL and TYPE floor in the
   assert mode is DERIVED from that table.
   §23.6: "A 'LAW' THE DESIGN ASSUMES MUST BE MEASURED BEFORE IT IS GATED,
   AND A THRESHOLD YOU INVENTED IS NOT A MEASUREMENT." Two floors in this
   program were nearly invented from a screenshot; they are computed here
   instead.

   ⚠ THE 1366 CELL IS A CONTROL, NOT A TEST. Every existing gate in this
   repo tops out at 1366 (13 files carry WIDTHS=[320,360,412,768,1024,
   1366]). The whole safety property of the program is that the new tiers
   start at 1367, so nothing at or below 1366 moves. This file measures
   1366 on every run so that claim is continuously re-proved rather than
   assumed.

   ⚠ AND THE APPARATUS IS NOT THE CARD. Measuring `.lcs-app` would report
   the shell's box and tell us nothing about whether the instrument grew —
   which is the entire defect (in fullscreen today the card is 2560px wide
   and the apparatus is still 600px). `apparatusOf()` finds the tool's own
   `<pfx>-wrap` and measures the widest drawn thing inside it.
   ===================================================================== */

'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const ROOT = path.join(__dirname, '..', 'mini tools');
const PORT = 5581;

const argv = process.argv.slice(2);
const has = (f) => argv.indexOf(f) >= 0;
const val = (f) => (argv.find((a) => a.indexOf(f + '=') === 0) || '').split('=')[1];
const MEASURE = has('--measure');
const POISON = has('--poison');
const ONLY = val('--tool');

/* the cells. 1366 is the CONTROL and is always included. */
/* de = Germanic compounds, it = Romance clause length, fi = agglutination.
   English is the SHORTEST chrome in the set and proves the least. */
const LOCALE_SWEEP = ['de', 'it', 'fi'];
const fannedOut = (key) => /@media \(min-width:1367px\)/.test(
  fs.readFileSync(path.join(ROOT, key + '.js'), 'utf8'));
/* ⚠ A TOOL CAN BE WORKED ON FOR WIDE VIEWPORTS WITHOUT GAINING A WIDTH TIER.
   calendar-wall's fix is a HEIGHT ladder — it was clipping, not small — so the
   `min-width:1367px` marker would have left it out of the locale sweep, and the
   one tool in the catalog with a proven cut-off would have been the one tool
   never rendered in German. The FILL floor still keys on `fannedOut`, because
   width is what FILL is about; the locale sweep keys on this. */
const touchedForWide = (key) => {
  const src = fs.readFileSync(path.join(ROOT, key + '.js'), 'utf8');
  return /@media \(min-width:1367px\)/.test(src)
    /* ⚠ 1080 and up, i.e. taller than the 880/1000 floors the width tiers
       already use. Poison-tested in both directions before it was trusted:
       the first version was `1(0[89]|[1-9])\d\d` — one digit too long, so it
       matched 1200 and 1400 and MISSED 1080, the very value it was written
       for. A narrowed regex is not a measurement until it has been run
       against the values it must accept AND the ones it must reject. */
    || /@media \(min-height:1(?:0[89]|[1-9]\d)\dpx\)/.test(src);
};

/* ⭐ THE FILL EXEMPTION'S SELECTOR MAP. A tool whose apparatus is ONE object
   inside a frame cannot satisfy a width-share floor by growing the object —
   estimation-jar would need a 1280px JAR. The honest replacement is the same
   shape as syllable-splitter's: a NAMED entry carrying the measurement that
   actually says whether a class at the back can use it. Declared here so the
   probe knows what to measure at every cell.
   ⚠ A ratchet: entries may leave, never arrive to make a build pass. */
const FILL_EXEMPT_SEL = {
  'estimation-jar': '.ej-jar',
  'asking-bench': '.abn-card'
};
const CELLS = [
  { w: 1366, h: 900, control: true },
  { w: 1440, h: 900 },
  { w: 1920, h: 1080 },
  { w: 2560, h: 1440 }
];

/* ---------------------------------------------------------------------
   The tool roster is DISCOVERED, never hand-maintained. A list somebody
   has to remember is the same shape of defect as the registration step
   that 410'd a tool in all eleven locales (audit-tool-control-liveness
   records that reasoning).
   --------------------------------------------------------------------- */
function roster() {
  return fs.readdirSync(ROOT)
    .filter((f) => /\.html$/.test(f))
    .map((f) => f.replace(/\.html$/, ''))
    .filter((k) => fs.existsSync(path.join(ROOT, k + '.js')))
    .filter((k) => /LCS\.mount\(/.test(fs.readFileSync(path.join(ROOT, k + '.html'), 'utf8')))
    .filter((k) => !/-activity$/.test(k))
    .sort();
}

/* The tool's CSS prefix.
   ⚠ `api.el('div','<pfx>-wrap')` is the v4 convention but NOT universal —
   ten-frame and other pre-v4 tools mount a differently-named root, and the
   first version of this file reported their apparatus as `0px`, which read
   as data. A measurement that could not be taken must say so; it must
   never look like a small number. Hence: three ways to find the prefix,
   and a loud UNMEASURED if all three miss. */
function prefixOf(key) {
  const src = fs.readFileSync(path.join(ROOT, key + '.js'), 'utf8');
  let m = /api\.el\(\s*['"]div['"]\s*,\s*['"]([a-z]+)-wrap['"]/.exec(src);
  if (m) return m[1];
  /* 2: the CSS injector's own id, `<pfx>-style` */
  m = /getElementById\(\s*['"]([a-z]+)-style['"]/.exec(src);
  if (m) return m[1];
  /* 3: the most frequent `.<pfx>-` class in the injected stylesheet */
  const tally = {};
  (src.match(/\.([a-z]{2,4})-[a-z][a-z0-9-]*\s*[,{]/g) || []).forEach((s) => {
    const p = /\.([a-z]{2,4})-/.exec(s)[1];
    tally[p] = (tally[p] || 0) + 1;
  });
  const best = Object.keys(tally).filter((p) => p !== 'lcs').sort((a, b) => tally[b] - tally[a])[0];
  return best || null;
}

const srv = http.createServer((rq, rs) => {
  const f = decodeURIComponent(rq.url.split('?')[0].replace('/mini-tools/', ''));
  const fp = path.join(ROOT, f);
  if (!fp.startsWith(ROOT) || !fs.existsSync(fp)) { rs.writeHead(404); rs.end('x'); return; }
  const t = f.endsWith('.js') ? 'application/javascript' : f.endsWith('.json') ? 'application/json'
    : f.endsWith('.css') ? 'text/css' : f.endsWith('.webp') ? 'image/webp' : 'text/html';
  rs.writeHead(200, { 'Content-Type': t }); rs.end(fs.readFileSync(fp));
}).listen(PORT);

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

/* =====================================================================
   The in-page probe. Returns raw geometry only — no verdicts, so the
   same function serves both modes and the thresholds live in ONE place.
   ===================================================================== */
const PROBE = (pfx, exemptSel) => {
  const q = (s) => document.querySelector(s);
  const app = q('.lcs-app');
  const stage = q('.lcs-stage');
  const wrap = pfx ? q('.' + pfx + '-wrap') : null;
  const vw = window.innerWidth, vh = window.innerHeight;
  const rect = (e) => { const r = e.getBoundingClientRect(); return { x: r.x, y: r.y, w: r.width, h: r.height, b: r.bottom, r: r.right }; };

  /* THE APPARATUS: the widest drawn descendant of the tool's own wrap.
     Not the card, not the stage — the thing the child looks at. Chrome
     rows (chip/foot/hint/gate/bar) are excluded by name because they are
     text and are allowed to be narrow. */
  let app_w = 0, app_el = '';
  /* ⭐ THE VERTICAL EXTENT, because a SQUARE apparatus on a 16:9 screen can
     never satisfy a width-share floor: at 2560x1440 the tallest square that
     fits under the chrome is ~840px, which is 33% of the WIDTH and 58% of
     the HEIGHT. The instrument is as big as the room allows and the floor
     says it is too small. Recording both extents is what lets the floor ask
     the right question instead of being lowered. */
  let app_top = Infinity, app_bot = -Infinity;
  /* ⚠ FALL BACK TO THE STAGE'S OWN SUBTREE rather than reporting 0. A
     tool whose root is not `<pfx>-wrap` still has an apparatus; measuring
     it as zero would put a fake number in the table the thresholds are
     derived from. */
  const scope = wrap || stage;
  /* ⚠⚠ THE ELEMENT MUST ACTUALLY DRAW. "Widest non-chrome descendant" was
     too loose: a tool's own `<pfx>-wrap` is a transparent full-width flex
     container, so scoping from `.lcs-stage` instead of from the wrap
     reported number-line's apparatus as 1752px (68.4% of a 2560 screen)
     when the number line was still 600px. A layout box is not an
     apparatus. Require ink: an SVG/canvas/image, or a painted background,
     or a real border. */
  const draws = (e) => {
    const t = e.tagName;
    /* ⚠⚠ AN EMPTY SVG OVERLAY IS NOT INK, AND COUNTING IT INFLATES THE
       APPARATUS BY WHATEVER THE OVERLAY SPANS. place-value-lab draws its
       carry/borrow arcs into a `position:absolute;inset:0` SVG that is EMPTY
       at rest — arcs are appended only while an animation runs. Counting it
       measured the apparatus at 1704px when the blocks spanned 1110px, so
       FILL reported 66.6% for a board that was really at 43.4%. Require at
       least one child element: a real drawing has geometry in it. */
    if (t === 'svg') return e.childElementCount > 0;
    if (t === 'CANVAS' || t === 'IMG' || t === 'VIDEO') return true;
    const cs = getComputedStyle(e);
    const bg = cs.backgroundColor;
    if (bg && bg !== 'transparent' && !/rgba\(0,\s*0,\s*0,\s*0\)/.test(bg)) return true;
    if (cs.backgroundImage && cs.backgroundImage !== 'none') return true;
    if (parseFloat(cs.borderTopWidth) > 0 || parseFloat(cs.borderLeftWidth) > 0) return true;
    return false;
  };
  /* ⚠⚠ THE APPARATUS IS THE UNION EXTENT, NOT THE WIDEST SINGLE ELEMENT.
     "Widest inked descendant" is right for a single-bench tool and WRONG
     for a multi-column one: draw-bag lays three shelves side by side and a
     bag beside a record grid, so the widest single element is one shelf.
     It reported 31.6% for an instrument that genuinely spanned 1500px of a
     2560 screen. Measuring left-most to right-most inked apparatus edge
     answers the question actually being asked — how much of the board does
     the instrument occupy — for both shapes. */
  /* ⚠ A BARE STATE CLASS IS CHROME TOO, AND THE HYPHEN PREFIX MISSED IT.
     number-talk-easel marks gated controls with a standalone `locked` class
     (`nte-pen locked`, `nte-clearbtn locked`), and since the pattern required
     a leading hyphen the HOLLOW check picked `.locked` as the tool's repeated
     unit — reporting that the instrument had not grown when what had not
     grown was a row of lock badges. Anchored on start-or-whitespace so
     `unlocked-thing` does NOT match. Poison-tested against the real unit
     classes of every tool fanned out so far (sbx-box, wdb-cell, ltl-tile,
     rkr-bead, pvl-slot, nte-dot, mm-disc, tf-cell): none matches. */
  const CHROME = /(?:-(?:chip|foot|hint|gate|bar|controls|lock|wrap|scroll)|(?:^|\s)(?:locked|disabled))\b/;
  let lo = Infinity, hi = -Infinity;
  if (scope) {
    scope.querySelectorAll('*').forEach((e) => {
      const c = String(e.className && e.className.baseVal !== undefined ? e.className.baseVal : e.className || '');
      if (CHROME.test(c)) return;
      const r = e.getBoundingClientRect();
      if (!r.width) return;
      /* An element counts as apparatus if it DRAWS, or if the tool
         deliberately SIZED it with an author max-width — an empty record
         grid is still the instrument's footprint, and measuring only inked
         children makes a fill-with-use tool read as tiny at rest. */
      const sized = getComputedStyle(e).maxWidth !== 'none';
      if (!draws(e) && !sized) return;
      if (draws(e) && r.height <= 4) return;
      if (r.left < lo) lo = r.left;
      if (r.right > hi) hi = r.right;
      if (r.top < app_top) app_top = r.top;
      if (r.bottom > app_bot) app_bot = r.bottom;
      if (r.width > app_w) { app_w = r.width; app_el = c.split(' ')[0] || e.tagName; }
    });
  }
  const unionW = (hi > lo) ? (hi - lo) : app_w;
  if (unionW > app_w) { app_w = unionW; app_el = app_el + '+union'; }

  /* smallest rendered numeral inside the apparatus, and smallest control */
  let minNum = Infinity, minNumEl = '';
  let minCtl = Infinity, minCtlEl = '';
  /* ⚠ THE NUMERAL FLOOR IS ABOUT THE APPARATUS, NOT THE CHROME. Scanning
     everything made the smallest "numeral" a foot chip reading "Draw 5",
     so a tool whose instrument numerals were correctly ramped still failed.
     Chrome type has its own (lower) floor and is excluded here. */
  (scope || document).querySelectorAll('*').forEach((e) => {
    const c = String(e.className && e.className.baseVal !== undefined ? e.className.baseVal : e.className || '');
    if (CHROME.test(c) || (e.closest && e.closest('[class*="-foot"],[class*="-bar"],[class*="-gate"],[class*="-hint"]'))) return;
    /* ⚠⚠ A <style> AND A <script> ARE LEAF NODES WHOSE textContent IS FULL OF
       DIGITS, and their computed font-size is the inherited 16px. They were
       being scored as the smallest numeral on the page — so this check could
       report a 16px "numeral" for a tool with NO numerals at all, and did:
       unroll-tape's first FAIL named 16px while its numerals rendered 38.
       (The FAIL was still right, for a different reason — an invalid `font:`
       shorthand — which is exactly how a vacuous measurement survives: it
       agreed with a real defect once.) Nothing that renders no box is type. */
    if (/^(STYLE|SCRIPT|TITLE|META|LINK|HEAD|DEFS|TEMPLATE)$/.test(e.tagName)) return;
    if (e.children.length === 0 && /\d/.test((e.textContent || '').trim())) {
      const box = e.getBoundingClientRect();
      if (box.height <= 1 || box.width <= 1) return;
      const cs = getComputedStyle(e);
      if (cs.visibility === 'hidden' || cs.display === 'none' || parseFloat(cs.opacity) === 0) return;
      /* ⚠⚠ AND FOR SVG TEXT, COMPUTED font-size IS IN USER UNITS, NOT PIXELS.
         `.urt-num` computes 16px and RENDERS 38px on a 1740px bench, because
         the viewBox scales it — so measuring the computed value asks the
         wrong question of every SVG numeral in the catalog, and asks it in
         the units of a coordinate system the child cannot see. The rendered
         box height is the size a teacher across a room actually gets. */
      const svgText = e.namespaceURI === 'http://www.w3.org/2000/svg';
      const fsz = svgText ? box.height : parseFloat(cs.fontSize);
      if (fsz && fsz < minNum) { minNum = fsz; minNumEl = (c || e.tagName) + (svgText ? ' (svg, rendered)' : ''); }
    }
  });
  document.querySelectorAll('button,[role="slider"],input,select').forEach((e) => {
    const r = e.getBoundingClientRect();
    if (!r.width && !r.height) return;
    const s = Math.min(r.width, r.height);
    if (s < minCtl) { minCtl = s; minCtlEl = String(e.className || e.tagName); }
  });

  /* does anything reach outside the card? (the fullscreen-overlay class) */
  const cardR = app ? app.getBoundingClientRect() : null;
  let escapes = 0;
  if (cardR) {
    document.body.querySelectorAll(':scope > *').forEach((e) => {
      if (e === document.getElementById('lcs-root')) return;
      const r = e.getBoundingClientRect();
      if (r.width && r.height) escapes++;
    });
  }

  /* bench aspect, if the tool declares one */
  let aspect = null, aspectEl = '';
  if (scope) {
    for (const e of scope.querySelectorAll('*')) {
      const ar = getComputedStyle(e).aspectRatio;
      if (ar && ar !== 'auto') { aspect = ar; aspectEl = String(e.className || e.tagName).split(' ')[0]; break; }
    }
  }

  /* lowest control bottom — the FITS measure */
  /* ⭐⭐ A CONTROL BELOW THE FOLD IS ONLY CUT OFF IF NOTHING CAN SCROLL IT
     INTO VIEW. This measured absolute viewport position and nothing else, so
     it FAILED our-day — whose lowest control sits in `.od-palette`, an
     `overflow-y:auto` list with scrollHeight 1821 against clientHeight 778.
     The palette scrolls; the control is reachable; the tool is correct and
     the gate was condemning it. That is the same blind spot arrow-strip's
     own header records from the other direction — `.arw-scroll{overflow-x
     :auto}` silently ABSORBING an overflow the gate should have caught — and
     the answer is the same in both: ask about the scroll container, do not
     ignore it. calendar-wall, measured the same way, has no scrollable
     ancestor at all and 231px genuinely unreachable, so it still fails.
     ⚠ `lowestUnreachable` is what FITS is built on; `lowest` is kept because
     it is what the message quotes, and a diagnosis that cannot say how far
     past the fold something sits is a diagnosis nobody can act on. */
  const canScrollTo = (e) => {
    let n = e.parentElement;
    while (n && n !== document.documentElement) {
      const cs = getComputedStyle(n);
      if (/(auto|scroll)/.test(cs.overflowY) && n.scrollHeight > n.clientHeight + 2) return true;
      n = n.parentElement;
    }
    return false;
  };
  let lowest = 0, lowestUnreachable = 0;
  document.querySelectorAll('button,[role="slider"]').forEach((e) => {
    const r = e.getBoundingClientRect();
    if (!r.width) return;
    lowest = Math.max(lowest, r.bottom);
    if (!canScrollTo(e)) lowestUnreachable = Math.max(lowestUnreachable, r.bottom);
  });

  /* ⭐⭐ A `preserveAspectRatio="none"` SVG STRETCHES, AND ITS NUMERALS
     STRETCH WITH IT. ruler draws its ticks into a 1000x100 viewBox with
     stretching ON, and the layout keeps the box at exactly wrap x wrap/10 so
     scaleX equals scaleY and the printed numbers are not distorted — an
     invariant that is invisible in the CSS and that a tier raising the width
     alone would silently break. This is the #43 letterboxing lesson wearing
     the opposite hat: such an SVG CANNOT letterbox, so it distorts instead.
     Reported as a ratio per cell; the assert side compares it against the
     1366 control rather than against a threshold I invented. */
  let anis = null;
  (scope || document).querySelectorAll('svg[preserveAspectRatio="none"]').forEach((s) => {
    /* ⚠ ONLY WHERE THERE IS TYPE TO DISTORT. Stretching is what this mode is
       FOR: story-line's washing-line rope is a 940x64 bezier that is supposed
       to get longer without getting thicker, and it is already anisotropic at
       narrow widths by design. The defect this guards is a squashed NUMERAL,
       so the question is whether the SVG contains glyphs — not whether it
       stretches. Narrowing what is measured, never the threshold. */
    if (!s.querySelector('text')) return;
    const vb = s.viewBox && s.viewBox.baseVal;
    const r = s.getBoundingClientRect();
    if (!vb || !vb.width || !vb.height || !r.width || !r.height) return;
    const sx = r.width / vb.width, sy = r.height / vb.height;
    const a = Math.max(sx, sy) / Math.min(sx, sy);
    if (anis === null || a > anis) anis = +a.toFixed(3);
  });

  /* the FILL exemption's own instrument: the width of the ONE element that
     actually is the apparatus, for tools whose apparatus is a single object
     inside a frame. Null when not asked for or not present. */
  let exemptW = null, exemptF = null;
  if (exemptSel) {
    const e = document.querySelector(exemptSel);
    if (e) { const r = e.getBoundingClientRect(); if (r.width) exemptW = Math.round(r.width); }
    if (e) { const f = parseFloat(getComputedStyle(e).fontSize); if (f) exemptF = Math.round(f); }
  }

  return {
    exemptW: exemptW, exemptF: exemptF,
    anisotropy: anis,
    vw: vw, vh: vh,
    cardW: app ? app.offsetWidth : 0,          /* LAYOUT box — transform-independent */
    cardH: app ? app.offsetHeight : 0,
    cardRectW: cardR ? cardR.width : 0,
    stageW: stage ? stage.getBoundingClientRect().width : 0,
    wrapFound: !!wrap,
    apparatusW: Math.round(app_w), apparatusEl: app_el,
    apparatusH: (app_bot > app_top) ? Math.round(app_bot - app_top) : 0,
    apparatusPct: vw ? +(app_w / vw * 100).toFixed(1) : 0,
    apparatusVPct: (vh && app_bot > app_top) ? +((app_bot - app_top) / vh * 100).toFixed(1) : 0,
    minNum: minNum === Infinity ? null : +minNum.toFixed(1), minNumEl: minNumEl,
    minCtl: minCtl === Infinity ? null : +minCtl.toFixed(1), minCtlEl: minCtlEl,
    aspect: aspect, aspectEl: aspectEl,
    bodyEscapes: escapes,
    lowest: Math.round(lowest),
    /* ⭐⭐ THE MOST-REPEATED INKED CHILD, so the gate can ask whether the
       CONTENTS grew and not merely the box. rekenrek passed FILL at 66.1%
       with a bead that is 64px at 1366 and 64px at 2560 — the card grew, the
       empty rail grew, the instrument did not, and every assertion here said
       success. A class shared by >=3 inked children is the instrument's unit;
       its MEDIAN width is the number that has to move. */
    unit: (() => {
      if (!scope) return null;
      const tally = {};
      scope.querySelectorAll('*').forEach((e) => {
        const c = String(e.className && e.className.baseVal !== undefined ? e.className.baseVal : e.className || '');
        if (!c || CHROME.test(c) || !draws(e)) return;
        const r = e.getBoundingClientRect();
        if (r.width < 8 || r.height < 8) return;
        c.split(/\s+/).filter(Boolean).forEach((cl) => {
          (tally[cl] = tally[cl] || []).push(r.width);
        });
      });
      const best = Object.keys(tally).filter((k) => tally[k].length >= 3)
        .sort((a, b) => tally[b].length - tally[a].length)[0];
      if (!best) return null;
      const ws = tally[best].slice().sort((x, y) => x - y);
      return { cls: best, n: ws.length, med: Math.round(ws[Math.floor(ws.length / 2)]) };
    })(),
    lowestUnreachable: Math.round(lowestUnreachable),
    scrollRescued: Math.round(lowest) > Math.round(lowestUnreachable),
    fits: lowestUnreachable <= vh + 0.5
  };
};

/* static scan: pointer paths that are NOT the scale-invariant ratio form,
   and body-level overlays. Both matter for the per-tool recipe. */
function staticRisks(key) {
  const src = fs.readFileSync(path.join(ROOT, key + '.js'), 'utf8');
  const out = [];
  if (/getScreenCTM/.test(src)) out.push('getScreenCTM');
  if (/document\.body\.appendChild|body\.append\(/.test(src)) out.push('body-overlay');
  if (/window\.innerWidth|window\.innerHeight/.test(src)) out.push('innerWidth');
  if (/style\.(left|top)\s*=\s*[^;]*client[XY]/.test(src)) out.push('clientXY->layout');
  if (/offsetWidth|offsetLeft/.test(src) && /clientX/.test(src)) out.push('offset+clientX');
  if (/-wide\s+\.lcs-app\{max-width/.test(src)) out.push('SELF-WIDENS');
  return out;
}

(async () => {
  const keys = (ONLY ? ONLY.split(',') : roster());
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const rows = [];
  let FAIL = 0;

  for (const key of keys) {
    if (!fs.existsSync(path.join(ROOT, key + '.html'))) { console.error('  no wrapper: ' + key); continue; }
    const pfx = prefixOf(key);
    const risks = staticRisks(key);
    const cells = {};
    let boot = null;

    for (const cell of CELLS) {
      const p = await browser.newPage();
      const errs = [];
      p.on('pageerror', (e) => errs.push(String(e).slice(0, 60)));
      try {
        await p.setViewport({ width: cell.w, height: cell.h });
        await p.goto(`http://127.0.0.1:${PORT}/${key}.html?lang=en`, { waitUntil: 'domcontentloaded', timeout: 20000 });
        await p.waitForSelector('.lcs-app', { timeout: 12000 });
        await wait(420);
        /* ⚠⚠ NO GENERIC "POPULATE" CLICK. I tried pressing the first foot
           chip twice, reasoning that tools which fill with use (draw-bag's
           record grid is empty until a draw is taken) under-report at rest.
           It made FILL WORSE — 49.8% became 13.2% — because a generic click
           is not a populate: it drove the tool into whatever state its first
           chip happens to lead to. Forty-eight tools' chip semantics cannot
           be reasoned about generically, and a harness that puts the subject
           in an arbitrary state is measuring nothing in particular.
           The under-reporting is solved in PROBE instead, by counting the
           apparatus CONTAINER the tool deliberately sized, whether or not it
           currently holds anything. */
        cells[cell.w] = await p.evaluate(PROBE, pfx, FILL_EXEMPT_SEL[key] || null);
        cells[cell.w].errs = errs.length;
      } catch (e) {
        boot = String(e).slice(0, 70);
        cells[cell.w] = null;
      }
      await p.close();
    }

    /* ⭐⭐ THE LOCALE SWEEP, and it is not optional cover. Only 13 of 48 tools
       have an 11-locale layout gate of their own, so for the other 35 THIS is
       the only thing that will ever look at a non-English render at a wide
       viewport. English is the SHORTEST chrome in the set; a cap derived and
       verified in English alone is a cap verified in the easiest case.
       ⚠ AND NOT GERMAN ALONE EITHER. lids' own comment records its near-miss
       as ITALIAN at 903 of a 900 budget, and measuring its chrome in three
       locales showed de 388 / it 472 / fi 409 — German was not the worst.
       de + it + fi is the long-chrome set: Germanic compounds, Romance
       clause length, Finnish agglutination.
       ⚠ Only tools that have been FANNED OUT are swept. An un-fanned tool
       renders at 720px in every language and there is nothing new to learn;
       sweeping all 48 would cost 1,584 renders to re-measure the untouched. */
    if (touchedForWide(key)) {
      for (const loc of LOCALE_SWEEP) {
        for (const cell of CELLS.filter((c) => c.w >= 1920)) {
          const p = await browser.newPage();
          try {
            await p.setViewport({ width: cell.w, height: cell.h });
            await p.goto(`http://127.0.0.1:${PORT}/${key}.html?lang=${loc}`,
              { waitUntil: 'domcontentloaded', timeout: 20000 });
            await p.waitForSelector('.lcs-app', { timeout: 12000 });
            await wait(380);
            const m = await p.evaluate(PROBE, pfx, FILL_EXEMPT_SEL[key] || null);
            cells[loc + '@' + cell.w] = m;
          } catch (e) { cells[loc + '@' + cell.w] = null; }
          await p.close();
        }
      }
    }

    rows.push({ key, pfx, risks, cells, boot });
  }

  await browser.close();
  srv.close();

  /* ---------------- MEASURE MODE: the table, no verdicts -------------- */
  if (MEASURE) {
    console.log('\nNATURAL SIZE + HEADROOM — measured, no assertions\n');
    /* ⚠ card@2560 IS ITS OWN COLUMN. Without it the table cannot show
       whether the SHELL tier fired, only whether the TOOL grew — and the
       two are exactly the distinction this program turns on. The first
       run after the shell change was unreadable for want of it. */
    /* ⭐⭐ apparatusEl AND card-share ARE COLUMNS NOW, and %2560 alone is not a
       queue. The finder counts an element only if it DRAWS or carries an author
       max-width, so a TRANSPARENT layout container is skipped and the number
       falls back to the widest INKED thing — often a button. name-sticks reads
       11.7%; measured, its `.nsk-strip` is 992px inside a 1040px card, i.e. 95%
       of the card it was given. Ordering batch 3 off the screen share alone
       would have sent me to enlarge an instrument that already fills its card,
       when the real fix is that tool's own self-widen cap. `el` says WHAT was
       measured and `card%` says whether the tool or the CARD is the binder. */
    console.log('tool                 pfx   aspect        card@1366  card@2560  appar@1366  appar@2560   %2560  card%  el                num@2560  ctl  risks');
    console.log('-------------------- ----- ------------- ---------- ---------- ----------- ----------- ------ ------ ----------------- --------- ---- ------------------');
    for (const r of rows) {
      const a = r.cells[1366], d = r.cells[2560];
      if (!a || !d) { console.log(r.key.padEnd(20) + '  BOOT FAIL  ' + (r.boot || '')); continue; }
      /* ⚠ UNMEASURED IS NOT ZERO. Say so, and keep it out of the stats. */
      if (!a.apparatusW || !d.apparatusW) {
        console.log(r.key.padEnd(20) + ' ' + String(r.pfx || '?').padEnd(5) + '  UNMEASURED — no apparatus found under .' + r.pfx + '-wrap or .lcs-stage');
        r.unmeasured = true;
        continue;
      }
      console.log(
        r.key.padEnd(20) + ' ' +
        String(r.pfx || '?').padEnd(5) + ' ' +
        String(r.aspect || (a.aspect ? a.aspectEl + ':' + a.aspect : '-')).slice(0, 13).padEnd(13) + ' ' +
        String(a.cardW + 'x' + a.cardH).padStart(10) + ' ' +
        String(d.cardW + 'px').padStart(10) + ' ' +
        String(a.apparatusW + 'px').padStart(11) + ' ' +
        String(d.apparatusW + 'px').padStart(11) + ' ' +
        String(d.apparatusPct + '%').padStart(6) + ' ' +
        String(d.cardW ? Math.round(d.apparatusW / d.cardW * 100) + '%' : '-').padStart(6) + ' ' +
        String(d.apparatusEl || '?').slice(0, 17).padEnd(17) + ' ' +
        String(d.minNum === null ? '-' : d.minNum + 'px').padStart(9) + ' ' +
        String(d.minCtl === null ? '-' : Math.round(d.minCtl)).padStart(4) + '  ' +
        r.risks.join(',')
      );
    }

    /* the derived summary — this is what the thresholds come from */
    const ok = rows.filter((r) => r.cells[2560] && r.cells[1366] && !r.unmeasured
      && r.cells[1366].apparatusW && r.cells[2560].apparatusW);
    const grew = ok.filter((r) => r.cells[2560].apparatusW > r.cells[1366].apparatusW + 2);
    const pct = ok.map((r) => r.cells[2560].apparatusPct).sort((x, y) => x - y);
    const med = pct.length ? pct[Math.floor(pct.length / 2)] : 0;
    console.log('\nDERIVED —');
    console.log('  tools measured                     ' + ok.length);
    console.log('  apparatus GREW from 1366 to 2560   ' + grew.length + '  ' + (grew.length ? '(' + grew.map((r) => r.key).join(', ') + ')' : '<- the defect: none of them'));
    console.log('  apparatus share of a 2560 screen   min ' + pct[0] + '%  median ' + med + '%  max ' + pct[pct.length - 1] + '%');
    console.log('  tools that self-widen the card     ' + ok.filter((r) => r.risks.indexOf('SELF-WIDENS') >= 0).length);
    console.log('  tools with a fixed bench aspect    ' + ok.filter((r) => r.cells[1366].aspect).length);
    console.log('  tools with a body-level overlay    ' + ok.filter((r) => r.risks.indexOf('body-overlay') >= 0).length + '  (invisible in fullscreen today)');
    console.log('  tools with non-ratio pointer maths ' + ok.filter((r) => r.risks.some((x) => x === 'getScreenCTM' || x === 'clientXY->layout' || x === 'offset+clientX')).length);
    console.log('  smallest numeral at 2560, median   ' +
      (() => { const n = ok.map((r) => r.cells[2560].minNum).filter((x) => x != null).sort((a, b) => a - b); return n.length ? n[Math.floor(n.length / 2)] + 'px' : '-'; })());

    /* ⚠⚠ A FILTERED RUN MUST NEVER WRITE THE BASELINE, AND THIS ONE DID.
       `--measure --tool=measurement-bench` overwrote the 48-tool reference
       with ONE entry — silently, reporting success — and the baseline is the
       only thing the assert mode's CONTROL cell compares against, so every
       other tool's neutrality proof would have been gone. The filter exists
       for reading one tool's numbers; writing is a whole-catalogue act.
       Same family as the non-vacuity rule: prove the collection is the one
       you meant before you do anything irreversible with it. */
    if (ONLY) {
      console.log('\n  baseline NOT written — this was a filtered run (' + ONLY + ').');
      console.log('  Re-run `--measure` with no --tool to rewrite the 48-tool reference.');
      process.exit(0);
    }
    if (rows.length < 40) {
      console.error('\n  REFUSING to write a baseline of ' + rows.length + ' tools — expected the whole catalogue.');
      process.exit(1);
    }
    fs.writeFileSync(path.join(__dirname, '..', 'docs', 'audit-results', 'wide-viewport', 'baseline.json'),
      JSON.stringify(rows, null, 1));
    /* ⚠ report the path actually written — a log naming a different file
       than the code writes is the #38/#40 register-script defect. */
    console.log('\n  baseline written to docs/audit-results/wide-viewport/baseline.json');
    process.exit(0);
  }

  /* =====================================================================
     ASSERT MODE
     ---------------------------------------------------------------------
     ⚠⚠ THE CONTROL-CELL ASSERTION EXISTS BECAUSE THE POISON DID NOT FIRE.
     Forcing the shell's Tier A down to 1000px — so it fired at the 1024
     AND 1366 gate cells — left `local-test-number-line` at 58/58 and
     `audit-number-line-locale-layout` at 66/66. Both stayed green.
     That is not a bug in those gates: they measure containment against
     the card, the tap floors, the text floor and FITS, and every one of
     those stays true when the card widens and the content does not.
     But it means the program's whole safety property — "nothing at or
     below 1366 moves" — was protected ONLY by the media-query floor
     being 1367, with no gate watching it. Lower that floor and ~200
     assertions would have waved it through.
     So CARD WIDTH AT 1366 IS ASSERTED HERE, EXPLICITLY, against the
     committed baseline. It is the one thing nothing else measures.
     ===================================================================== */
  const BASELINE_PATH = path.join(__dirname, '..', 'docs', 'audit-results', 'wide-viewport', 'baseline.json');
  if (!fs.existsSync(BASELINE_PATH)) {
    console.error('FATAL: no baseline. Run --measure first; thresholds must be derived, not invented.');
    process.exit(1);
  }
  const base = JSON.parse(fs.readFileSync(BASELINE_PATH, 'utf8'));
  const byKey = {};
  base.forEach((r) => { byKey[r.key] = r; });

  let pass = 0;
  const say = (c, m) => { if (c) { pass++; } else { FAIL++; console.error('  FAIL ' + m); } };

  for (const r of rows) {
    const b = byKey[r.key];
    const a = r.cells[1366], d = r.cells[2560], n = r.cells[1920];
    if (!a || !d || !n) { FAIL++; console.error('  FAIL ' + r.key + ' did not boot at every cell'); continue; }

    /* 1 — NEUTRALITY. The card at 1366 must equal the baseline exactly. */
    if (b && b.cells && b.cells['1366']) {
      say(a.cardW === b.cells['1366'].cardW,
        r.key + ' CONTROL: card at 1366 is ' + a.cardW + 'px, baseline says ' + b.cells['1366'].cardW + 'px');
      say(a.apparatusW === b.cells['1366'].apparatusW,
        r.key + ' CONTROL: apparatus at 1366 is ' + a.apparatusW + 'px, baseline says ' + b.cells['1366'].apparatusW + 'px');
    }

    /* 1b — a stretched SVG must not be MORE distorted than it is at 1366.
       Not a threshold: the question is whether the TIER introduced skew, and
       a tool that ships distorted at 1366 is a different (pre-existing)
       problem. Only meaningful when both cells measured one. */
    if (a.anisotropy !== null && d.anisotropy !== null) {
      say(d.anisotropy <= a.anisotropy + 0.01,
        r.key + ' STRETCH at 2560: a preserveAspectRatio="none" SVG is ' + d.anisotropy +
        'x anisotropic, against ' + a.anisotropy + 'x at 1366 — the tier is distorting its numerals');
    }

    /* 2 — non-vacuity before anything is claimed about size */
    say(a.apparatusW > 0, r.key + ' NON-VACUITY: no apparatus measured at 1366');
    if (!a.apparatusW) continue;

    /* 3 — FITS at every cell, in every locale the layout audit covers */
    say(d.fits, r.key + ' CUT OFF at 2560: lowest control at ' + d.lowest + ' of ' + d.vh);
    say(n.fits, r.key + ' CUT OFF at 1920: lowest control at ' + n.lowest + ' of ' + n.vh);

    /* 3b ⭐⭐ THE APPARATUS MUST FIT ITS OWN CARD, AND NOTHING HERE ASKED.
       Every check above is vertical (does it reach past the fold) or a
       floor (is it big enough). None of them could see a tool drawing
       WIDER than the card it sits in — which is exactly what number-sieve
       did at 1920x1080: a 1351px field inside a 1240px card, 8/8 green.
       It escaped because the two ladders are keyed differently: the shell
       widens the card at 1367/880 and 1800/1150, and a per-tool tier at
       1800/1000 fires in the gap between them. A width-bound cap keyed on
       a height tier is a cap keyed on the wrong thing, and this is the
       assertion that says so. Tolerance 2px for sub-pixel layout. */
    [[1366, a], [1920, n], [2560, d]].forEach(([px, c]) => {
      if (!c || !c.cardW || !c.apparatusW) return;
      say(c.apparatusW <= c.cardW + 2,
        r.key + ' ESCAPES ITS CARD at ' + px + ': apparatus ' + c.apparatusW +
        'px in a ' + c.cardW + 'px card (over by ' + (c.apparatusW - c.cardW) + 'px)');
    });

    /* 4 — FILL. Floors derived from the baseline: today's median share of
       a 2560 screen is 26.3%, so 45%/50% is roughly a doubling and is the
       program's target, not an aspiration read off a screenshot. Tools
       not yet fanned out are reported, not failed. */
    /* ⚠ "FANNED OUT" IS NOT "ALREADY SELF-WIDENS". The first version keyed
       on `body.<ns>-wide .lcs-app{max-width` and so counted all 18 legacy
       self-wideners as done — hush-owl was then failed for reaching only
       48.1% when nobody had ever fanned it out. The marker is the
       program's OWN tier floor, which no pre-existing tool carries. */
    const done = /min-width\s*:\s*1367px/.test(
      fs.readFileSync(path.join(ROOT, r.key + '.js'), 'utf8'));
    if (touchedForWide(r.key)) {
      /* ⭐⭐ THE LOCALE CELLS CARRY THE SAME FIT AND CONTAINMENT ASSERTIONS.
         For the 35 tools with no 11-locale gate of their own this is the only
         non-English check that will ever run at a wide viewport, so it has to
         assert, not merely record. Non-vacuity first: a locale cell that did
         not boot must FAIL, or a tool that crashes in Finnish would pass by
         producing nothing to measure — the hollow-check shape this file has
         already been bitten by twice. */
      for (const loc of LOCALE_SWEEP) {
        for (const px of [1920, 2560]) {
          const c = r.cells[loc + '@' + px];
          say(!!c && c.apparatusW > 0,
            r.key + ' LOCALE ' + loc + '@' + px + ': did not boot or measured no apparatus');
          if (!c || !c.apparatusW) continue;
          say(c.fits, r.key + ' LOCALE ' + loc + '@' + px + ' CUT OFF: lowest control at ' +
            c.lowest + ' of ' + c.vh);
          say(c.apparatusW <= c.cardW + 2, r.key + ' LOCALE ' + loc + '@' + px +
            ' ESCAPES ITS CARD: apparatus ' + c.apparatusW + 'px in a ' + c.cardW + 'px card');
        }
      }

    }
    if (done) {
      /* ⭐⭐ FILL ASKS THE AXIS THE APPARATUS IS ACTUALLY BOUND BY. The 45/50%
         floors were derived from the baseline median of a WIDTH share, and
         that is the right question for a bench, a tape or a strip. It is the
         WRONG question for a 1:1 apparatus: arrow-strip's mat is square by
         design, so on a 2560x1440 screen the largest honest mat is ~814px —
         31.8% of the width and 56.5% of the height. Failing it would mean
         either lowering a floor (forbidden) or distorting a square (worse).
         So a tool whose apparatus is TALLER than it is wide, or nearly so, is
         judged on its height share against the same numbers. Nothing is
         relaxed: both floors keep their values, and a wide tool still has to
         meet the width one — `dominates` picks the binding axis, it does not
         take the better of two tries at the same axis. */
      const dominates = (c, floor) => {
        const squareish = c.apparatusH > 0 && c.apparatusH >= c.apparatusW * 0.92;
        return squareish ? { pct: c.apparatusVPct, axis: 'height' }
                         : { pct: c.apparatusPct, axis: 'width' };
      };
      /* ⭐⭐ THE CONTENTS MUST GROW, NOT JUST THE BOX. This is the assertion
         rekenrek needed and did not have: it passed FILL at 66.1% while its
         bead stayed 64px and its empty rail grew by 655px, so the card raise
         made the instrument WORSE and the gate called it a success. If the
         same repeated unit is present at 1366 and at 2560 and has not grown,
         the widening is hollow. Compared only when BOTH cells found the same
         class — a tool whose unit appears with use (letter-tiles has no tiles
         at rest) reports nothing rather than a false pass. */
      /* ⚠ AND THE UNIT IT PICKS CAN BE THE WRONG THING WHEN THE INSTRUMENT IS
         EMPTY AT REST. A ratchet, like KNOWN_GAPS elsewhere: an explicit list
         with a measurement and a named replacement check, never a loosened
         predicate. It may only shrink. */
      const HOLLOW_ELSEWHERE = {
        'letter-tiles': {
          unit: 'ltl-traytile',
          why: 'the board is EMPTY at rest, so the only repeated class here is the 28-letter ' +
               'PALETTE, not the instrument. The palette is flex-wrap: measured, raising its ' +
               'tile 56->70px tips it into another row and costs 108px of height in German, ' +
               'cutting the tier-A floor — a cliff, not a ramp. The board tile IS ramped ' +
               '(84->92/116/132) and is measured with real tiles placed through the tool\'s own ' +
               '_dropNew by local-test-letter-tiles.js section D2, which fails 3/3 on the ' +
               'un-ramped build.'
        }
      };
      const u1 = a.unit, u2 = d.unit;
      const he = HOLLOW_ELSEWHERE[r.key];
      if (he && u2 && u2.cls === he.unit) {
        console.log('  note ' + r.key + ' HOLLOW checked elsewhere — `.' + he.unit + '` is a palette, not the instrument');
      } else if (u1 && u2 && u1.cls === u2.cls) {
        say(u2.med > u1.med + 2,
          r.key + ' HOLLOW WIDENING: the card grew but `.' + u2.cls + '` is ' +
          u1.med + 'px at 1366 and ' + u2.med + 'px at 2560 — the box grew, the instrument did not');
      }

      /* ⭐⭐ A CONTENT-SIZED TEXT DISPLAY CANNOT SATISFY AN EXTENT FLOOR, and
         the honest answer is a NAMED exception with its measurement, not a
         weaker rule for everybody. syllable-splitter's apparatus IS a word:
         `.ss-card` is width:fit-content with nothing capping it, so its
         extent is the word's length. Measured at 88px type, "Katze" renders
         226px and "kissa" 206px; a 13-letter compound would reach ~590px.
         Filling 50% of a 2560 screen would need roughly 300-500px type,
         which is not a word display any more — it is one letter per screen.
         So the floor is replaced HERE by the measure that actually says
         whether a class at the back can read it: the RENDERED TYPE SIZE.
         ⚠ This is a ratchet, like NO_SHEET_YET and KNOWN_GAPS elsewhere in
         the repo: an explicit list with a reason each, not a loosened
         predicate. Adding an entry needs the same measurement this one has. */
      const FILL_EXEMPT = {
        'syllable-splitter': { minType: 64, why: 'the apparatus is one word; extent is the word length, not a box' },
        /* the jar is the apparatus; the card is a frame around it. Measured:
           at 2560 the jar renders 510px against 190px before the tiers, and
           the card frames it at 1240px (48.4% of the screen). Satisfying a
           50%-of-width floor here would mean a 1280px JAR. */
        'estimation-jar': { minEl: 460, sel: '.ej-jar', why: 'the apparatus is a single jar inside a frame' },
        /* the apparatus is a SENTENCE laid on a grid, so its extent is the
           sentence's length: `.abn-grid` hugs its content at 520px for a
           three-word sentence. Filling half a 2560 board would mean type so
           large the sentence wraps, which is a worse instrument. The measure
           that says whether a class can read it is the rendered TYPE. */
        'asking-bench': { minFont: 34, sel: '.abn-card', why: 'the apparatus is a sentence; extent is its length, not a box' }
      };
      const ex = FILL_EXEMPT[r.key];
      if (ex && ex.minFont) {
        /* non-vacuity first: an exemption that could not measure its own
           element must FAIL, never pass in place of the floor it replaces. */
        say(d.exemptF !== null && d.exemptF >= ex.minFont,
          r.key + ' TYPE-INSTEAD-OF-FILL at 2560: `' + ex.sel + '` renders ' +
          (d.exemptF === null ? 'UNMEASURED' : d.exemptF + 'px') + ', want >=' + ex.minFont + 'px (' + ex.why + ')');
      } else if (ex && ex.minEl) {
        /* non-vacuity first: an exemption that could not measure its own
           element must FAIL, not quietly pass in place of the FILL floor. */
        say(d.exemptW !== null && d.exemptW >= ex.minEl,
          r.key + ' SIZE-INSTEAD-OF-FILL at 2560: `' + ex.sel + '` is ' +
          (d.exemptW === null ? 'UNMEASURED' : d.exemptW + 'px') + ', want >=' + ex.minEl + 'px (' + ex.why + ')');
      } else if (ex) {
        say(d.minNum === null || d.minNum >= ex.minType,
          r.key + ' TYPE-INSTEAD-OF-FILL at 2560: largest instrument type is ' +
          (d.minNum === null ? 'unmeasured' : d.minNum + 'px') + ', want >=' + ex.minType + 'px (' + ex.why + ')');
      }

      const f19 = dominates(n), f25 = dominates(d);
      if (!ex) {
        say(f19.pct >= 45, r.key + ' FILL at 1920: ' + f19.pct + '% of ' + f19.axis + ' (want >=45%)');
        say(f25.pct >= 50, r.key + ' FILL at 2560: ' + f25.pct + '% of ' + f25.axis + ' (want >=50%)');
      }
      /* ⚠ NAME THE OWNER. `minNumEl` was already measured and thrown away, so
         every TYPE failure sent me back to the DOM to find out WHICH numeral
         was small. A failure that does not say where is a failure that costs
         a round trip on every tool in the fan-out. */
      say(d.minNum === null || d.minNum >= 22, r.key + ' TYPE at 2560: smallest numeral ' +
        d.minNum + 'px on `' + (d.minNumEl || '?') + '` (want >=22px)');
    } else {
      console.log('  todo ' + r.key.padEnd(20) + ' not fanned out yet — ' + d.apparatusPct + '% at 2560');
    }
  }

  console.log('\n' + (FAIL ? 'FAIL' : 'PASS') + '  ' + pass + ' passed, ' + FAIL + ' failed');
  process.exit(FAIL ? 1 : 0);
})();
