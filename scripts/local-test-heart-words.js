#!/usr/bin/env node
/* =====================================================================
   local-test-heart-words.js — the BROWSER gate for TOOL #21.

   Serves `mini tools/` locally (no deploy) and drives the real apparatus
   with real pointer events across the viewport sweep.

   ⚠ 704 IS IN THE SWEEP AND IT IS THE IMPORTANT WIDTH. The tool page pins
   the iframe at 704px on EVERY desktop (article.max-w-3xl 768 - md:px-8
   2x32). The sizing defect this gate exists to catch was invisible at
   320/360 (where the floor happened to be right) and invisible above 1367
   (where the dead viewport tiers pretended to fire).

   ⭐ THE RAMP, NOT A THRESHOLD. The shipped `.hw-box` sized on a
   percentage of `.hw-boxrow`, whose width came from
   `.hw-card{width:fit-content}`, whose width came from the boxes —
   CYCLIC. The browser fell back to auto and every tile collapsed onto its
   56px min-height, so a 2-box word and a 5-box word measured THE SAME at
   every viewport ever shipped. No single number catches that; the
   PROPERTY that was false is "a shorter word gets bigger tiles". This
   gate asserts the ratio, and it is poison-tested against the pre-fix
   build (see --poison).

   Usage: node scripts/local-test-heart-words.js [--shot] [--poison]
   Tool dir override (mutation testing): HW_TOOL_DIR=/path/to/copy
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const SHELL = path.join(__dirname, '..', 'mini tools');
const ROOT = process.env.HW_TOOL_DIR || SHELL;
const IMAGES = path.join(__dirname, '..', 'frontend', 'public', 'image-library-webp');
const PORT = 5561;
const SHOT = process.argv.indexOf('--shot') >= 0;
const SHOTDIR = path.join(__dirname, '..', 'docs', 'audit-results', 'heart-words', 'qa');

let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) { PASS++; console.log('  ok   ' + m); } else { FAIL++; console.error('  FAIL ' + m); } };
const sec = (s) => console.log('\n' + s);
const wait = (ms) => new Promise(r => setTimeout(r, ms));

const MIME = { '.js': 'application/javascript', '.json': 'application/json', '.css': 'text/css',
               '.html': 'text/html', '.webp': 'image/webp', '.png': 'image/png' };

/* two-root fallback so a mutation tmp dir (which holds only the tool and
   its bank) still resolves the shell and the CSS from the real tree */
const srv = http.createServer((rq, rs) => {
  const url = rq.url.split('?')[0];
  let fp;
  if (url.indexOf('/image-library-webp/') === 0) {
    fp = path.join(IMAGES, decodeURIComponent(url.replace('/image-library-webp/', '')));
  } else {
    const f = decodeURIComponent(url.replace('/mini-tools/', '').replace(/^\//, ''));
    fp = path.join(ROOT, f);
    if (!fs.existsSync(fp)) fp = path.join(SHELL, f);
  }
  if (!fs.existsSync(fp) || fs.statSync(fp).isDirectory()) { rs.writeHead(404); rs.end('x'); return; }
  rs.writeHead(200, { 'Content-Type': MIME[path.extname(fp)] || 'text/plain' });
  rs.end(fs.readFileSync(fp));
});

/* the widths a teacher actually meets. 704 is the production iframe. */
const WIDTHS = [320, 360, 412, 704, 768, 1024, 1366];
const heightFor = (w) => (w >= 1200 ? 900 : w < 500 ? 760 : 860);

const boot = async (browser, q, w, h) => {
  const page = await browser.newPage();
  const errs = [];
  page.on('pageerror', e => errs.push(String(e)));
  page.on('console', m => { if (m.type() === 'error' && !/404|net::ERR|Failed to load/.test(m.text())) errs.push(m.text()); });
  await page.setViewport({ width: w, height: h });
  await page.evaluateOnNewDocument(() => {
    try { localStorage.clear(); } catch (_) {}
    window.LCSAudio = window.LCSAudio || {};
  });
  await page.goto(`http://127.0.0.1:${PORT}/heart-words.html${q}`, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('.hw-box', { timeout: 12000 });
  await wait(260);
  return { page, errs };
};

/* Measure the tile for a word of exactly n boxes, by navigating the desk
   search to a real word of that length. Returns null when the bank has no
   such word — and the caller treats null as a SKIP, never as a pass. */
const tileWidthForBoxes = async (page, n) => {
  return await page.evaluate((n) => {
    const T = window.HeartWords;
    /* the ramp is a LAYOUT property, not an entitlement one — reach across
       the whole bank so the comparison spans a real range of word lengths */
    T.premium = true;
    const hit = T.bank.words.find(w => w.boxes.length === n && !T.tailText(w));
    if (!hit) return null;
    T.transient = null; T.ring = false;
    T.shelfId = hit.shelf;
    const list = T.wordsForShelf(hit.shelf);
    T.index = list.findIndex(w => w.id === hit.id);
    T.mapped = {}; T.face = 'map'; T.surface = 'board';
    T.render();
    const b = document.querySelector('.hw-face-map .hw-box');
    return b ? b.getBoundingClientRect().width : null;
  }, n);
};

(async () => {
  srv.listen(PORT);
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });

  /* ---------------------------------------------------------------
     A — the viewport sweep
     --------------------------------------------------------------- */
  sec('A  the sweep — containment, floors, and the ramp');
  for (const W of WIDTHS) {
    const H = heightFor(W);
    const { page, errs } = await boot(browser, '?lang=en&embed=1', W, H);

    const m = await page.evaluate(() => {
      const q = (s) => Array.from(document.querySelectorAll(s));
      const boxes = q('.hw-face-map .hw-box');
      const controls = q('.hw-pill,.hw-toolbtn,.hw-flip,.hw-navbtn,.hw-wordspeak,.hw-spine');
      const card = document.querySelector('.hw-card');
      const row = document.querySelector('.hw-face-map .hw-boxrow');
      const shelf = document.querySelector('.hw-shelf');
      const rail = document.querySelector('.hw-shelf-rail');
      const rects = controls.map(e => e.getBoundingClientRect());
      return {
        boxCount: boxes.length,
        controlCount: controls.length,
        minBox: boxes.length ? Math.min.apply(null, boxes.map(b => b.getBoundingClientRect().width)) : -1,
        minControl: rects.length ? Math.min.apply(null, rects.map(r => r.height)) : -1,
        cardW: card ? card.getBoundingClientRect().width : -1,
        rowW: row ? row.getBoundingClientRect().width : -1,
        rowRight: row ? row.getBoundingClientRect().right : -1,
        cardRight: card ? card.getBoundingClientRect().right : -1,
        shelfW: shelf ? shelf.getBoundingClientRect().width : -1,
        railW: rail ? rail.getBoundingClientRect().width : -1,
        docW: document.documentElement.scrollWidth,
        winW: window.innerWidth,
        lowest: Math.max.apply(null, rects.map(r => r.bottom).concat([0])),
        winH: window.innerHeight
      };
    });

    const tag = `${W}px`;
    /* ⚠ NON-VACUITY FIRST. Math.min.apply(null, []) is Infinity and
       Infinity >= 44 passes, so a floor asserted over an empty collection
       is a check that cannot fail. */
    is(m.boxCount >= 2, `${tag}: the apparatus rendered its boxes (${m.boxCount}) — the floors below measure something`);
    is(m.controlCount >= 4, `${tag}: the chrome rendered its controls (${m.controlCount}) — ditto`);
    is(m.cardW > 200, `${tag}: the card is laid out (${Math.round(m.cardW)}px, not collapsed)`);
    is(m.docW <= m.winW + 1, `${tag}: the page does not scroll sideways (${m.docW} vs ${m.winW})`);
    is(m.rowRight <= m.cardRight + 1, `${tag}: the box row is contained by THE CARD`);
    is(m.minControl >= 44, `${tag}: every control is >=44px tall (${Math.round(m.minControl)})`);
    is(m.minBox >= 34, `${tag}: every canvas tile is >=34px (${Math.round(m.minBox)})`);
    is(errs.length === 0, `${tag}: no console errors${errs.length ? ' — ' + errs[0] : ''}`);

    /* the progress-bar fix, as a number: at a fresh install the shelf is
       empty, so the rail must NOT span its container */
    is(m.railW < m.shelfW * 0.9, `${tag}: the empty shelf rail does not span the board (${Math.round(m.railW)} < ${Math.round(m.shelfW * 0.9)}) — a full-width bar under one word reads as a filled progress bar`);

    if (SHOT && (W === 360 || W === 704 || W === 768 || W === 1024)) {
      if (!fs.existsSync(SHOTDIR)) fs.mkdirSync(SHOTDIR, { recursive: true });
      await page.screenshot({ path: path.join(SHOTDIR, `sweep-${W}.png`), fullPage: true });
    }
    await page.close();
  }

  /* ---------------------------------------------------------------
     B — ⭐ THE RAMP. The property that was false.
     --------------------------------------------------------------- */
  sec('B  ⭐ the ramp — a shorter word must get BIGGER tiles');
  /* ⚠ 2-vs-5 is the pair the ruling's predicted ramp names (184 -> 112 at
     704px, a ratio of 1.64). Measuring 2-vs-4 against a 1.6 threshold
     taken from the 2-vs-5 row would FAIL a correct tool at 1.30 — an
     invented threshold is not a measurement, and the fix is to measure
     the pair the number came from. */
  for (const W of [704, 1024]) {
    const { page } = await boot(browser, '?lang=en&embed=1', W, heightFor(W));
    const short = await tileWidthForBoxes(page, 2);
    const long = await tileWidthForBoxes(page, 5);
    if (short === null || long === null) {
      is(false, `${W}px: HARNESS — the bank has no 2-box and 5-box word to compare (${short}/${long})`);
    } else {
      const ratio = short / long;
      is(ratio > 1.6,
        `${W}px: a 2-box word's tile is ${ratio.toFixed(2)}x a 5-box word's (${Math.round(short)} vs ${Math.round(long)}) — ` +
        `the instrument RESPONDS to the surface`);
      is(short > 120, `${W}px: a 2-box tile reaches ${Math.round(short)}px — not pinned to its 44px floor`);
    }
    await page.close();
  }

  /* ---------------------------------------------------------------
     C — the tail is IN the row (the split-digraph defect, as a measurement)
     --------------------------------------------------------------- */
  sec('C  the silent e sits in the row, not on its own line');
  {
    const { page } = await boot(browser, '?lang=en&embed=1', 704, 860);
    const t = await page.evaluate(() => {
      const T = window.HeartWords;
      const all = T.wordsForShelf(T.shelfId);
      const hit = all.find(w => T.tailText(w));
      if (!hit) return { skip: true };
      T.index = all.indexOf(hit); T.mapped = {}; T.face = 'map'; T.render();
      const row = document.querySelector('.hw-face-map .hw-boxrow');
      const tail = document.querySelector('.hw-face-map .hw-tail');
      const boxes = Array.from(document.querySelectorAll('.hw-face-map .hw-box'));
      if (!tail || !boxes.length) return { skip: false, present: false };
      const last = boxes[boxes.length - 1].getBoundingClientRect();
      const tr = tail.getBoundingClientRect();
      return { skip: false, present: true, word: hit.display,
               inRow: tail.parentElement === row, dTop: Math.abs(tr.top - last.top) };
    });
    if (t.skip) {
      console.log('  note  the free shelf holds no split-digraph word — checked on the engine instead');
      const eng = require(path.join(ROOT, 'heart-words.js'));
      is(typeof eng.tailText === 'function', 'the tail helper exists for banks that do carry one');
    } else {
      is(t.present, `a word with a silent tail renders one (${t.word})`);
      is(t.inRow, `the tail is a CHILD of .hw-boxrow — not of the column-flex face`);
      is(t.dTop <= 2, `the tail sits on the same line as the last box (${Math.round(t.dTop)}px apart)`);
    }
    await page.close();
  }

  /* ---------------------------------------------------------------
     D — real pointer taps, the heart, and NO verdict anywhere
     --------------------------------------------------------------- */
  sec('D  a real pointer tap maps a box and stamps the heart');
  {
    const { page } = await boot(browser, '?lang=en&embed=1', 704, 860);
    const before = await page.$$eval('.hw-face-map .hw-box.hw-mapped', n => n.length);
    const boxes = await page.$$('.hw-face-map .hw-box');
    is(boxes.length >= 2, `the card offers ${boxes.length} boxes to tap`);
    for (const b of boxes) {
      const r = await b.boundingBox();
      await page.mouse.move(r.x + r.width / 2, r.y + r.height / 2);
      await page.mouse.down(); await page.mouse.up();
      await wait(120);
    }
    await wait(420);
    const after = await page.evaluate(() => ({
      mapped: document.querySelectorAll('.hw-face-map .hw-box.hw-mapped').length,
      hearts: document.querySelectorAll('.hw-face-map .hw-box .hw-heart').length,
      hearted: document.querySelectorAll('.hw-face-map .hw-box.hw-hearted').length
    }));
    is(before === 0, 'no box is mapped before the child touches it');
    is(after.mapped === boxes.length, `every tapped box settled (${after.mapped}/${boxes.length})`);
    is(after.hearts >= 1, `the heart seal arrived (${after.hearts})`);

    /* the seal must never touch the letter — asserted as geometry, at the
       real rendered size, not as a design intention */
    /* ⚠ BOTH dimensions, and the seal's own TOP relative to its tile.
       Measuring width alone let a mutation that shrank only the height
       survive; measuring overlap alone let one that moved the seal DOWN
       into the tile survive, because a 30%-inset seal can still miss a
       narrow glyph's bbox. */
    const clash = await page.evaluate(() => {
      const hs = Array.from(document.querySelectorAll('.hw-face-map .hw-box .hw-heart'));
      let worst = 0, minW = 1e9, minH = 1e9, maxInset = -1e9;
      for (const h of hs) {
        const hr = h.getBoundingClientRect();
        minW = Math.min(minW, hr.width);
        minH = Math.min(minH, hr.height);
        const tile = h.parentElement.getBoundingClientRect();
        /* negative = the seal overhangs the tile's top edge, as designed */
        maxInset = Math.max(maxInset, hr.top - tile.top);
        const g = h.parentElement.querySelector('.hw-glyph');
        if (!g) continue;
        const gr = g.getBoundingClientRect();
        const ox = Math.min(hr.right, gr.right) - Math.max(hr.left, gr.left);
        const oy = Math.min(hr.bottom, gr.bottom) - Math.max(hr.top, gr.top);
        if (ox > 0 && oy > 0) worst = Math.max(worst, Math.min(ox, oy));
      }
      return { worst, minW: hs.length ? minW : -1, minH: hs.length ? minH : -1, maxInset };
    });
    is(clash.minW >= 26 && clash.minH >= 26,
      `the seal renders >=26px BOTH ways at 704 (${Math.round(clash.minW)}x${Math.round(clash.minH)}) — it has to read from the back of the room`);
    is(clash.maxInset < 0,
      `the seal OVERHANGS its tile (top is ${Math.round(clash.maxInset)}px inside) — that is what makes touching the glyph structurally impossible`);
    is(clash.worst === 0, `the seal never overlaps the letters (worst overlap ${Math.round(clash.worst)}px)`);

    if (SHOT) await page.screenshot({ path: path.join(SHOTDIR, 'heart-moment.png'), fullPage: true });

    const verdict = await page.$$eval('[class*="correct"],[class*="wrong"],[class*="score"],[class*="streak"]', n => n.length);
    is(verdict === 0, 'no verdict element exists anywhere in the rendered DOM');
    const digits = await page.evaluate(() => {
      const s = document.querySelector('.hw-shelf');
      return s ? /\d/.test(s.textContent) : false;
    });
    is(digits === false, 'the bookshelf shows no digit — it never counts');
    await page.close();
  }

  /* ---------------------------------------------------------------
     E — the write face: the routine's ending
     --------------------------------------------------------------- */
  sec('E  the write face — the word goes away, the boxes stay');
  {
    const { page } = await boot(browser, '?lang=en&embed=1', 704, 860);
    /* ⚠ Navigate to a word that HAS a tail first. The free shelf opens on
       `the`, which has none — so an assertion about the write row's tail
       ran against a row that had no tail to leak, and a mutation printing
       the silent e on the write face survived. */
    await page.evaluate(() => {
      const T = window.HeartWords;
      const list = T.wordsForShelf(T.shelfId);
      const i = list.findIndex(w => T.tailText(w));
      if (i >= 0) { T.index = i; T.mapped = {}; T.face = 'map'; T.render(); }
    });
    await wait(200);
    const hasTail = await page.$$eval('.hw-face-map .hw-tail', n => n.length);
    is(hasTail === 1, 'the write test runs on a word that HAS a silent tail — otherwise it proves nothing');

    const label = await page.evaluate(() => window.HeartWords.strings.writeIt.en);
    const clicked = await page.evaluate((lbl) => {
      const b = Array.from(document.querySelectorAll('.hw-flip')).find(x => x.textContent.trim() === lbl);
      if (!b) return false; b.click(); return true;
    }, label);
    is(clicked, 'the write control is reachable by its own authored label');
    await wait(300);
    const m = await page.evaluate(() => {
      const wf = document.querySelector('.hw-face-write');
      const blanks = Array.from(document.querySelectorAll('.hw-blankrow .hw-box'));
      const live = Array.from(document.querySelectorAll('.hw-face-map .hw-box'));
      return {
        visible: !!wf && getComputedStyle(wf).opacity === '1',
        blanks: blanks.length,
        live: live.length,
        /* ⚠ the TAIL as well as the boxes. Asserting only the boxes let a
           mutation that printed the silent e on the write face survive —
           and on a split-digraph word the tail IS part of the answer. */
        text: blanks.map(b => b.textContent.trim()).join('')
              + Array.from(document.querySelectorAll('.hw-blankrow .hw-tail')).map(t => t.textContent.trim()).join(''),
        sameWidth: blanks.length && live.length
          ? Math.abs(blanks[0].getBoundingClientRect().width - live[0].getBoundingClientRect().width) < 2 : false
      };
    });
    is(m.visible, 'the write face is showing');
    is(m.blanks >= 2, `the empty boxes stand in the same places (${m.blanks})`);
    is(m.text === '', 'the write boxes carry NO letters — the child retrieves the word, never copies it');
    is(m.sameWidth, 'the blank row is the same geometry as the live one');
    await page.close();
  }

  /* ---------------------------------------------------------------
     F — THE LEAK INVARIANT. Premium words are absent, not hidden —
     including with the desk search field driven.
     --------------------------------------------------------------- */
  sec('F  ⭐ no premium word reaches the DOM at premium=false, search driven');
  {
    const { page } = await boot(browser, '?lang=en&embed=1', 1024, 900);
    /* ⚠ SCOPE THE SCAN TO THE ELEMENTS THAT PRESENT A WORD *AS A WORD*.
       Reading the whole desk's textContent condemns the tool's own chrome:
       the English "Nothing here matches that." contains `here`, which is a
       premium word, so a correct tool reported a leak. That is the
       ban-too-wide trap, and the answer is to narrow WHAT is measured, not
       to special-case the string. The selector below is proved non-vacuous
       in BOTH directions immediately after — with premium ON, the very
       same probe MUST find those words, or it is selecting nothing. */
    const SEL = '.hw-wordchip, .hw-card, .hw-spine, .hw-shelflabel';
    const probe = await page.evaluate(async (SEL) => {
      const T = window.HeartWords;
      const locked = T.bank.shelves.filter(s => !s.free);
      const lockedWords = T.bank.words.filter(w => locked.some(s => s.id === w.shelf)).map(w => w.display);
      const scan = () => {
        const txt = Array.from(document.querySelectorAll(SEL)).map(e => e.textContent).join(' | ');
        return lockedWords.filter(d => new RegExp('(^|[^a-z])' + d + '([^a-z]|$)', 'i').test(txt));
      };
      const run = (premium) => {
        T.premium = premium;
        T.surface = 'desk'; T.deskTab = 'words'; T.openShelf = null; T.render();
        const found = new Set();
        /* drive the SEARCH — the one-line filter that would leak the whole
           catalogue and look perfectly correct doing it */
        for (const q of ['', 'a', 'e', 'o', 'th', 'wh']) {
          T.query = q; T._paintWordList();
          scan().forEach(d => found.add(d));
        }
        /* and open every shelf row the visitor can open */
        T.query = '';
        for (const s of T.bank.shelves) { T.openShelf = s.id; T._paintWordList(); scan().forEach(d => found.add(d)); }
        return Array.from(found);
      };
      const free = run(false);
      const paid = run(true);
      T.premium = false;
      return { lockedCount: lockedWords.length, free: free.slice(0, 6), paidCount: paid.length };
    }, SEL);
    is(probe.lockedCount > 50, `the bank genuinely holds premium words to leak (${probe.lockedCount})`);
    is(probe.paidCount > 50, `⭐ the selector DOES find premium words when entitled (${probe.paidCount}) — the check below is not vacuous`);
    is(probe.free.length === 0, `no premium word reached the desk DOM while free${probe.free.length ? ' — LEAKED: ' + probe.free.join(', ') : ''}`);
    await page.close();
  }

  /* ---------------------------------------------------------------
     G — the custom-word editor: the machine proposes, the teacher publishes
     --------------------------------------------------------------- */
  sec('G  custom words — split proposed, heart NEVER guessed');
  {
    const { page } = await boot(browser, '?lang=en&embed=1', 1024, 900);
    await page.evaluate(() => { const T = window.HeartWords; T.surface = 'desk'; T.deskTab = 'mine'; T.render(); });
    await page.waitForSelector('.hw-ed-area');
    await page.type('.hw-ed-area', 'shone\nbuild');
    await page.evaluate(() => {
      const T = window.HeartWords;
      const b = Array.from(document.querySelectorAll('.hw-ed-btn')).find(x => x.textContent.trim() === T.strings.addWords.en);
      b.click();
    });
    await wait(300);

    const st = await page.evaluate(() => {
      const T = window.HeartWords;
      const save = Array.from(document.querySelectorAll('.hw-ed-btn'))
        .find(x => x.textContent.trim() === T.strings.saveWord.en);
      return {
        drafts: (T._store.drafts || []).length,
        boxes: T._draft ? T._draft.boxes.slice() : null,
        heart: T._draft ? T._draft.heart.slice() : null,
        saveDisabled: save ? save.disabled : null,
        seams: document.querySelectorAll('.hw-seam').length,
        previewBoxes: document.querySelectorAll('.hw-ed-preview .hw-box').length
      };
    });
    is(st.drafts === 2, `both typed words became drafts (${st.drafts})`);
    is(Array.isArray(st.boxes) && st.boxes.length >= 2, `the machine PROPOSED a split (${JSON.stringify(st.boxes)})`);
    is(Array.isArray(st.heart) && st.heart.length === 0,
      '⭐ the heart is EMPTY — the machine never guesses the pedagogical claim');
    is(st.saveDisabled === true, '⭐ "Use this word" is inert until the teacher performs the marking act');
    is(st.seams >= 3, `the seam editor offers a tap target between every pair (${st.seams})`);
    is(st.previewBoxes === st.boxes.length, 'the preview IS the child\'s apparatus, box for box');

    /* the seam toggle must actually change the model, both directions */
    const seamEffect = await page.evaluate(() => {
      const T = window.HeartWords;
      const before = T._draft.boxes.join('|');
      document.querySelectorAll('.hw-seam')[0].click();
      const after = window.HeartWords._draft.boxes.join('|');
      return { before, after };
    });
    is(seamEffect.before !== seamEffect.after,
      `a seam tap changes the SPLIT, not just its own class (${seamEffect.before} -> ${seamEffect.after})`);

    /* tapping a preview box stamps the heart and unlocks Save */
    const heartEffect = await page.evaluate(() => {
      const T = window.HeartWords;
      document.querySelector('.hw-ed-preview .hw-box').click();
      const T2 = window.HeartWords;
      const save = Array.from(document.querySelectorAll('.hw-ed-btn'))
        .find(x => x.textContent.trim() === T2.strings.saveWord.en);
      return { heart: T2._draft.heart.slice(), saveDisabled: save ? save.disabled : null };
    });
    is(heartEffect.heart.length === 1, `tapping a preview box stamps the heart (${JSON.stringify(heartEffect.heart)})`);
    is(heartEffect.saveDisabled === false, 'Save becomes live only after the teacher has marked it');
    if (SHOT) await page.screenshot({ path: path.join(SHOTDIR, 'desk-my-words.png'), fullPage: true });

    /* free visitor: Save refuses and offers the gate; the word is NOT kept */
    const gated = await page.evaluate(() => {
      const T = window.HeartWords;
      T.premium = false;
      Array.from(document.querySelectorAll('.hw-ed-btn'))
        .find(x => x.textContent.trim() === T.strings.saveWord.en).click();
      return { saved: (window.HeartWords._store.custom || []).length,
               gate: !!document.querySelector('.hw-gate') };
    });
    is(gated.saved === 0, 'a free visitor cannot keep the list');
    is(gated.gate === true, 'the refusal offers the inline gate, never a dead button');

    /* but the FREE taste is real: their own word, live on their own board */
    const shown = await page.evaluate(() => {
      const T = window.HeartWords;
      Array.from(document.querySelectorAll('.hw-ed-btn'))
        .find(x => x.textContent.trim() === T.strings.showOnBoard.en).click();
      const T2 = window.HeartWords;
      return { surface: T2.surface, display: T2.transient && T2.transient.display,
               boxes: document.querySelectorAll('.hw-face-map .hw-box').length };
    });
    is(shown.surface === 'board' && !!shown.display,
      `⭐ a FREE teacher sees their own word on their own board ("${shown.display}")`);
    is(shown.boxes >= 2, `and it renders as the real apparatus (${shown.boxes} boxes)`);

    /* ...but a free PREVIEW is not a classroom record. Mapping it must not
       write to the shelf, or an unsaved draft looks like kept content. */
    const boxes2 = await page.$$('.hw-face-map .hw-box');
    for (const b of boxes2) {
      const r = await b.boundingBox();
      await page.mouse.move(r.x + r.width / 2, r.y + r.height / 2);
      await page.mouse.down(); await page.mouse.up();
      await wait(90);
    }
    await wait(500);
    const rec = await page.evaluate(() => ({
      known: Object.keys(window.HeartWords._store.known || {}),
      spines: document.querySelectorAll('.hw-spine').length
    }));
    is(rec.known.filter(k => k.indexOf('my:') === 0).length === 0,
      `⭐ mapping a free PREVIEW writes nothing to the shelf (known: ${JSON.stringify(rec.known)}) — an unsaved draft must not look like kept content`);
    await page.close();
  }

  /* ---------------------------------------------------------------
     H — the segmenter REFUSES rather than truncating
     --------------------------------------------------------------- */
  sec('H  an over-long word is refused with a reason, never welded');
  {
    const eng = require(path.join(ROOT, 'heart-words.js'));
    const long = eng.segment('strengths', 'en');
    is(long === null, 'a word over the box cap returns null — never a silently welded last box');
    const ok = eng.segment('shone', 'en');
    is(Array.isArray(ok) && ok.join('') === 'shone', `a normal word segments and reassembles (${JSON.stringify(ok)})`);
    is(ok[0] === 'sh', 'the greedy longest match takes the digraph, not two letters');
  }

  /* ---------------------------------------------------------------
     I — print: sheet A exists for a FREE visitor, B and C do not
     --------------------------------------------------------------- */
  sec('I  Ctrl+P safety is structural — the absence is the gate');
  {
    const { page } = await boot(browser, '?lang=en&embed=1', 1024, 900);
    const free = await page.evaluate(() => {
      const T = window.HeartWords;
      T.premium = false; T._printSheet = 'home'; T.render();
      const s = document.querySelector('.hw-printsheet');
      return { cards: document.querySelectorAll('.hw-printcard').length,
               kind: s ? s.getAttribute('data-sheet') : null,
               boxes: document.querySelectorAll('.hw-printbox').length };
    });
    is(free.cards === 10, `a FREE visitor's Ctrl+P produces their ten free cards (${free.cards}), not the blank page this tool used to print`);
    is(free.kind === 'cards', `and it can only ever be sheet A (${free.kind}) even with the chooser set to a paid sheet`);
    is(free.boxes > 20, `the printed cards carry real boxes (${free.boxes})`);

    const paid = await page.evaluate(() => {
      const T = window.HeartWords;
      T.premium = true; T._printSheet = 'home'; T.render();
      const s = document.querySelector('.hw-printsheet');
      return { kind: s ? s.getAttribute('data-sheet') : null,
               blank: Array.from(document.querySelectorAll('.hw-printbox > span')).every(x => x.textContent === '') };
    });
    is(paid.kind === 'home', 'a premium visitor reaches the take-home sheet');
    is(paid.blank === true, 'the take-home boxes print EMPTY — the child writes into them');
    await page.close();
  }

  /* ---------------------------------------------------------------
     J — first run teaches by demonstration, and leaves no state
     --------------------------------------------------------------- */
  sec('J  the first-run demonstration leaves nothing behind');
  {
    const { page } = await boot(browser, '?lang=en&embed=1', 704, 860);
    await wait(900);
    const mid = await page.$$eval('.hw-box.hw-demo', n => n.length);
    await wait(1800);
    const end = await page.evaluate(() => ({
      demo: document.querySelectorAll('.hw-box.hw-demo').length,
      mapped: document.querySelectorAll('.hw-face-map .hw-box.hw-mapped').length,
      known: Object.keys((JSON.parse(localStorage.getItem('lcs:heart-words:v1') || '{}').known) || {}).length,
      legend: !!document.querySelector('.hw-legend')
    }));
    is(mid >= 1, `the demonstration runs on the card itself (${mid} tiles marked mid-run)`);
    is(end.demo === 0 && end.mapped === 0, 'it clears completely — the child starts on an untouched word');
    is(end.known === 0, 'and it writes NOTHING to the shelf');
    is(end.legend === true, 'the one-line legend names what the heart means');
    await page.close();
  }

  /* ---------------------------------------------------------------
     K — reduced motion: meaning degrades to its END STATE
     --------------------------------------------------------------- */
  sec('K  reduced motion — the seal still arrives, it just does not move');
  {
    const page = await browser.newPage();
    await page.setViewport({ width: 704, height: 860 });
    await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
    await page.goto(`http://127.0.0.1:${PORT}/heart-words.html?lang=en&embed=1`, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('.hw-box');
    await wait(3200);
    await page.evaluate(() => {
      document.querySelectorAll('.hw-face-map .hw-box').forEach(b => b.click());
    });
    await wait(300);
    const m = await page.evaluate(() => {
      const h = document.querySelector('.hw-heart');
      const seat = document.querySelector('.hw-box.hw-mapped');
      return { heart: !!h, opacity: h ? getComputedStyle(h).opacity : '0',
               anim: h ? getComputedStyle(h).animationName : '',
               seatAnim: seat ? getComputedStyle(seat, '::after').animationName : '' };
    });
    is(m.heart, 'the seal is still stamped under reduced motion');
    is(m.opacity === '1', 'and it is fully visible — the meaning is not lost with the movement');
    is(m.anim !== 'hw-seal', `the spring is replaced (${m.anim})`);
    await page.close();
  }

  /* ---------------------------------------------------------------
     L — ⭐ the ?add= ingest path. A colleague's shared list is
     UNTRUSTED INPUT and had no end-to-end gate at all: the model gate
     tests _sanitiseCustom directly, so a mutation that simply stopped
     CALLING it survived.
     --------------------------------------------------------------- */
  sec('L  ⭐ a shared list is re-validated on ingest, not trusted');
  {
    const payload = [
      { display: 'shone', boxes: ['sh', 'o', 'n', 'e'], heart: [0], sentence: 'The lamp shone.' },
      { display: 'evil', boxes: ['e', 'v', 'i'], heart: [0] },                    /* boxes do not spell it */
      { display: 'bad', boxes: ['b', 'a', 'd'], heart: [0, 1, 2] },               /* fully hearted */
      { display: 'x<img src=x onerror=alert(1)>', boxes: ['x'], heart: [0] }      /* injection */
    ];
    const q = '?lang=en&embed=1&add=' + encodeURIComponent(JSON.stringify(payload));
    const { page } = await boot(browser, q, 1024, 900);
    await wait(500);
    const got = await page.evaluate(() => {
      const T = window.HeartWords;
      T.surface = 'desk'; T.deskTab = 'mine'; T.render();
      return {
        kept: (T._store.custom || []).map(w => w.display),
        ids: (T._store.custom || []).map(w => w.id),
        html: document.querySelector('.hw-desk').innerHTML
      };
    });
    is(got.kept.length === 1 && got.kept[0] === 'shone',
      `only the legitimate word survived ingest (kept: ${JSON.stringify(got.kept)})`);
    is(got.ids.every(i => i.indexOf('my:') === 0),
      `every ingested word is namespaced my: (${JSON.stringify(got.ids)}) — a ?word= link can never resolve into the curated set`);
    is(got.html.indexOf('onerror') < 0 && got.html.indexOf('<img') < 0,
      'the injection payload reached no markup');
    await page.close();
  }

  await browser.close();
  srv.close();

  console.log('');
  if (FAIL) { console.error(`FAIL — ${FAIL} of ${PASS + FAIL} assertions`); process.exit(1); }
  console.log(`PASS — ${PASS} assertions`);
})().catch(e => { console.error('HARNESS THREW: ' + e.message + '\n' + e.stack); try { srv.close(); } catch (_) {} process.exit(1); });
