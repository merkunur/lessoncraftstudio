#!/usr/bin/env node
/* =====================================================================
   local-test-syllable-splitter.js — local Definition-of-Done for TOOL #22.

   scripts/visual-qa-activity.js resolves only ids declared in a
   *-activities.json manifest, so it cannot see a free-play tool.
   SECTION A is the substitute — the measured viewport sweep, at DESKTOP
   widths too, and A2 forces the LONGEST word in the deck.

     A  viewport sweep 320-1366: no overflow, word fits, taps >= 44px
     A2 the longest word at every viewport (the real worst case)
     B  clap: each drum tap draws exactly one arc; taps are never refused
     C  build: scramble + rebuild with the WRITTEN chunks
     D  sort: pens, drag, keyboard fallback (premium)
     E  free vs premium: premium words absent from the DOM entirely
     F  deep link held until entitlement; sort mode never leaks
     G  speech: word + syllable only, always with lang, ZERO phoneme
     H  no-shame DOM scan
     I  reduced motion
     J  print stylesheet

   Usage: node scripts/local-test-syllable-splitter.js [--shot]
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const IMG = path.join(REPO, 'image-library-webp');
const QA = path.join(REPO, 'docs', 'audit-results', 'syllable-splitter', 'qa');
fs.mkdirSync(QA, { recursive: true });
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };
const SHOT = process.argv.includes('--shot');

let pass = 0, fail = 0; const bad = [];
const ok = (n, c, x) => { if (c) { pass++; console.log('  ok   ' + n); } else { fail++; bad.push(n); console.log('  FAIL ' + n + (x ? ' — ' + x : '')); } };
const sleep = (ms) => new Promise(r => setTimeout(r, ms));

function serve() {
  return http.createServer((req, res) => {
    const p = decodeURIComponent(req.url.split('?')[0]);
    let f;
    if (p.startsWith('/mini-tools/')) f = path.join(MINI, p.slice('/mini-tools/'.length));
    else if (p.startsWith('/image-library-webp/')) f = path.join(IMG, p.slice('/image-library-webp/'.length));
    else f = path.join(MINI, p.replace(/^\//, ''));
    fs.readFile(f, (e, b) => {
      if (e) { res.statusCode = 404; return res.end(); }
      res.setHeader('Content-Type', MIME[path.extname(f)] || 'application/octet-stream');
      res.end(b);
    });
  });
}
/* ⚠ 704 is the PRODUCTION EMBED width (the landing page column is
   max-w-3xl) and 1920/2560 are the projector and the big board. The
   shipped sweep stopped at 1366 and never measured either end — the two
   places a teacher actually meets this tool. */
const VIEWPORTS = [{ w: 320, h: 640 }, { w: 360, h: 740 }, { w: 412, h: 820 }, { w: 704, h: 900 }, { w: 768, h: 1000 }, { w: 1024, h: 900 }, { w: 1366, h: 900 }, { w: 1920, h: 1080 }, { w: 2560, h: 1440 }];

(async () => {
  const server = serve();
  await new Promise(r => server.listen(0, r));
  const PORT = server.address().port;
  const BASE = `http://127.0.0.1:${PORT}/mini-tools/syllable-splitter.html`;
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });

  const deck = JSON.parse(fs.readFileSync(path.join(MINI, 'syllable-splitter-en.json'), 'utf8'));
  const freeShelf = deck.shelves.find(s => s.free);
  const premiumDisplays = deck.words.filter(w => w.shelf !== freeShelf.id).map(w => w.display);
  const longest = deck.words.slice().sort((a, b) => b.count - a.count)[0];

  async function newPage(o) {
    o = o || {};
    const page = await browser.newPage();
    await page.setViewport({ width: o.w || 1024, height: o.h || 820 });
    await page.evaluateOnNewDocument((prem, store) => {
      try { if (sessionStorage.getItem('__ss_seeded')) return; sessionStorage.setItem('__ss_seeded', '1'); } catch (_) {}
      try { localStorage.clear(); } catch (_) {}
      if (prem) {
        try {
          localStorage.setItem('accessToken', 'harness-token');
          const b = store || { v: 1 };
          b.ent = { tier: 'full', checkedAt: new Date().toISOString() };
          localStorage.setItem('lcs:syllable-splitter:v1', JSON.stringify(b));
        } catch (_) {}
      }
    }, !!o.premium, o.store || null);
    if (o.premium && !o.offline) {
      await page.setRequestInterception(true);
      page.on('request', r => {
        if (/\/api\/auth\/me/.test(r.url()))
          r.respond({ status: 200, contentType: 'application/json', body: JSON.stringify({ user: { subscriptionTier: 'full' }, subscription: { status: 'active' } }) });
        else r.continue();
      });
    }
    if (o.reduced) await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
    page._errs = [];
    const benign = t => /404|Failed to load resource|net::ERR/i.test(t);
    page.on('pageerror', e => { if (!benign(e.message)) page._errs.push('pageerror: ' + e.message); });
    page.on('console', m => { if (m.type() === 'error' && !benign(m.text())) page._errs.push(m.text()); });
    return page;
  }
  const ready = async (p) => { await p.waitForSelector('.ss-clap,.ss-sort', { timeout: 8000 }); await sleep(200); };
  /* the word is HIDDEN by default now, so anything measuring the word row
     has to reveal it first. The eye is the first .ss-ghostbtn on the card. */
  const reveal = async (p) => { await p.evaluate(() => { const b = document.querySelector('.ss-ghostbtn'); if (b) b.click(); }); await sleep(320); };
  const spy = (p) => p.evaluate(() => { window.__spoken = []; if (window.LCSAudio) { LCSAudio.speak = o => window.__spoken.push(o); LCSAudio.cancel = () => {}; } });
  async function shoot(p, n) { if (!SHOT) return; await p.evaluate(() => window.scrollTo(0, 0)); await sleep(120); await p.screenshot({ path: path.join(QA, n) }); }
  const measure = (p) => p.evaluate(() => {
    const doc = document.documentElement;
    const row = document.querySelector('.ss-wordrow');
    const r = row ? row.getBoundingClientRect() : null;
    const ctl = [...document.querySelectorAll('button')].filter(b => { const q = b.getBoundingClientRect(); return q.width > 0 && q.height > 0; });
    const small = ctl.filter(b => { const q = b.getBoundingClientRect(); return q.width < 44 || q.height < 44; }).map(b => b.className + ':' + Math.round(b.getBoundingClientRect().height));
    const card = document.querySelector('.ss-card');
    const cardR = card ? card.getBoundingClientRect() : null;
    return {
      hOverflow: doc.scrollWidth - doc.clientWidth, vw: doc.clientWidth,
      rowL: r ? r.left : 0, rowR: r ? r.right : 0,
      fs: row ? parseFloat(getComputedStyle(row).fontSize) : 0,
      small, cardBottom: cardR ? cardR.bottom : 0, vh: doc.clientHeight
    };
  });

  /* ---------- A ---------- */
  console.log('\nA — viewport sweep');
  for (const v of VIEWPORTS) {
    const p = await newPage({ w: v.w, h: v.h });
    await p.goto(BASE + '?lang=en', { waitUntil: 'domcontentloaded' }); await ready(p); await reveal(p);
    const m = await measure(p);
    ok(`${v.w}px no horizontal overflow`, m.hOverflow <= 1, 'overflow ' + m.hOverflow);
    ok(`${v.w}px word inside viewport`, m.rowL >= -1 && m.rowR <= m.vw + 1, `${Math.round(m.rowL)}..${Math.round(m.rowR)} of ${m.vw}`);
    ok(`${v.w}px word legible (>=22px)`, m.fs >= 22, 'font ' + Math.round(m.fs));
    ok(`${v.w}px taps >=44px`, m.small.length === 0, m.small.slice(0, 3).join(', '));
    /* ⭐ EVERY CONTROL MUST BE PHYSICALLY REACHABLE. `lcs-shell.css` sets
       `html,body{height:100%;overflow:hidden}`, and this tool's content is
       taller than a phone. MEASURED before the fix: at 320x568 the app was
       886px in a 568px window with `scrollY` pinned at 0 — the reveal eye
       and the clear button could not be touched at all. Inside the landing
       iframe this never showed, because the iframe grows; standalone on a
       phone there is nothing to grow.
       This assertion is the reason that can't come back. */
    const reach = await p.evaluate(() => {
      window.scrollTo(0, 99999);
      const maxScroll = window.scrollY;
      const lowest = [...document.querySelectorAll('.ss-wrap button, .ss-wrap .ss-card')]
        .reduce((a, e) => Math.max(a, e.getBoundingClientRect().bottom + window.scrollY), 0);
      window.scrollTo(0, 0);
      return { lowest: Math.round(lowest), reach: Math.round(document.documentElement.clientHeight + maxScroll) };
    });
    ok(`${v.w}px every control is reachable`, reach.lowest <= reach.reach + 2,
      `lowest ${reach.lowest} > reachable ${reach.reach}`);

    /* ⭐ DO TWO RENDERED THINGS OVERLAP? Every other assertion in this file
       measures ONE box against a floor — no overflow, tall enough, big
       enough, reachable — and the whole set stayed green while the build
       face shipped its hint clipped mid-word under the absolutely
       positioned speaker button. A floor cannot see a collision. This
       checks the out-of-flow controls against the text they sit over,
       which is where the class of defect lives. */
    const collide = await p.evaluate(() => {
      const over = [...document.querySelectorAll('.ss-speak')];
      const text = [...document.querySelectorAll('.ss-hint, .ss-cue, .ss-wordrow, .ss-namecard, .ss-oralnote')];
      const hits = [];
      for (const a of over) {
        const ra = a.getBoundingClientRect();
        if (!ra.width) continue;
        for (const b of text) {
          const rb = b.getBoundingClientRect();
          if (!rb.width) continue;
          if (ra.left < rb.right && ra.right > rb.left && ra.top < rb.bottom && ra.bottom > rb.top)
            hits.push(a.className + ' over ' + b.className);
        }
      }
      return hits;
    });
    ok(`${v.w}px no control sits on top of text`, collide.length === 0, collide.slice(0, 2).join(' | '));
    ok(`${v.w}px no console errors`, p._errs.length === 0, p._errs[0]);
    if ([360, 768, 1024].includes(v.w)) await shoot(p, `sweep-${v.w}.png`);
    await p.close();
  }

  /* ---------- A2 longest word ---------- */
  console.log(`\nA2 — longest word ("${longest.display}", ${longest.count} syllables)`);
  for (const v of VIEWPORTS) {
    const p = await newPage({ w: v.w, h: v.h, premium: true });
    await p.goto(`${BASE}?lang=en&set=${longest.shelf}&word=${longest.id}`, { waitUntil: 'domcontentloaded' });
    await ready(p); await reveal(p); await sleep(300);
    const m = await measure(p);
    ok(`${v.w}px longest: no overflow`, m.hOverflow <= 1, 'overflow ' + m.hOverflow);
    ok(`${v.w}px longest: inside viewport`, m.rowL >= -1 && m.rowR <= m.vw + 1);
    ok(`${v.w}px longest: legible`, m.fs >= 22, 'font ' + Math.round(m.fs));
    if ([320, 1024].includes(v.w)) await shoot(p, `longest-${v.w}.png`);
    await p.close();
  }

  /* ---------- B clap ---------- */
  console.log('\nB — clap: drum draws arcs');
  {
    const p = await newPage({}); await p.goto(BASE + '?lang=en', { waitUntil: 'domcontentloaded' }); await ready(p);
    await spy(p);
    const w = deck.words.find(x => x.shelf === freeShelf.id);
    const n = w.oralCount;

    /* ⭐ LISTEN FIRST. The whole point of the rebuild: the word is not on
       screen until the class has committed to a number. */
    ok('the word is HIDDEN at rest', !(await p.$('.ss-wordrow')));
    /* ⚠ scoped to the VISIBLE stage, not document.body.textContent. The
       print sheet legitimately holds every word in the set and is
       display:none — which also keeps it out of the accessibility tree, so
       it leaks to nobody. A body-wide scan condemned a correct tool; this
       is the same ban-too-wide trap as reading RSC flight-data. */
    ok('and its letters are nowhere in the VISIBLE stage either',
      !(await p.evaluate((d) => {
        const vis = [...document.querySelectorAll('.ss-wrap *')]
          .filter(e => e.offsetParent !== null && !e.closest('.ss-printsheet'))
          .map(e => e.childNodes.length === 1 && e.firstChild.nodeType === 3 ? e.textContent : '').join(' ');
        return vis.indexOf(d) >= 0;
      }, w.display)));
    ok('the picture carries no alt text that would leak it',
      await p.evaluate(() => { const i = document.querySelector('.ss-pic'); return !i || i.getAttribute('alt') === ''; }));

    for (let i = 1; i <= n; i++) {
      await p.evaluate(() => document.querySelector('.ss-drum').click());
      await sleep(240);
      const beats = await p.$$eval('.ss-beat', e => e.length);
      ok(`tap ${i} drops beat ${i}`, beats === i, `beats=${beats}`);
      ok(`tap ${i} still shows no letters`, !(await p.$('.ss-wordrow')));
    }
    /* ⭐ AN EXTRA TAP IS COUNTED, NOT SWALLOWED. The tool used to guard
       `if (taps < arcs.length)`, so a class that clapped four for a
       three-syllable word got the drum sound and NOTHING else — no fourth
       marker, and for a screen-reader user no announcement at all, one tap
       after being told the total. That is the deck silently overruling the
       class, which is the single thing this tool is forbidden to do.
       The class's count runs as far as the class takes it; only the ARCS
       are bounded, because an arc must sit under a syllable that exists. */
    await p.evaluate(() => document.querySelector('.ss-drum').click());
    await sleep(200);
    const after = await p.$$eval('.ss-beat', e => e.length);
    ok('an extra tap is COUNTED, never swallowed', after === n + 1, `beats=${after}`);

    await reveal(p);
    const arcs = await p.$$eval('.ss-arc', e => e.length);
    ok('but the arcs stay bounded by the word', arcs === n, `arcs=${arcs}`);
    ok('and the word is now on screen', !!(await p.$('.ss-wordrow')));
    /* the arc must SCALE with the word — it was a flat 3.5px hairline under
       an 88px word on a 2560 board, the least visible mark in the tool */
    const strokeRatio = await p.evaluate(() => {
      const a = document.querySelector('.ss-arc'), r = document.querySelector('.ss-wordrow');
      return parseFloat(getComputedStyle(a).strokeWidth) / parseFloat(getComputedStyle(r).fontSize);
    });
    ok('arc weight is proportional to the word (>=7%)', strokeRatio >= 0.07, 'ratio ' + strokeRatio.toFixed(3));

    const sp = await p.evaluate(() => window.__spoken || []);
    /* ⭐ NO SYLLABLE SPEECH. Reading an orthographic fragment aloud makes
       English say "ie" (cookie) and "guin" (penguin) — the strongest
       possible claim about a boundary, in a tool whose own contract is
       that it claims the count and never the boundary. */
    ok('ZERO syllable-level speech', sp.every(s => s.type !== 'syllable'), JSON.stringify(sp.map(s => s.type)));
    ok('every speak call carries lang', sp.every(s => !!s.lang));
    ok('only word|ui speech types', sp.every(s => ['word', 'ui'].includes(s.type)), JSON.stringify(sp.map(s => s.type)));
    await shoot(p, 'clap.png');
    await p.close();
  }

  /* ---------- C build ---------- */
  console.log('\nC — build: rebuild with written chunks');
  {
    const p = await newPage({}); await p.goto(BASE + '?lang=en', { waitUntil: 'domcontentloaded' }); await ready(p);
    await p.evaluate(() => [...document.querySelectorAll('.ss-segbtn')][1].click());
    await sleep(300);
    const slots = await p.$$eval('.ss-slot', e => e.length);
    const w = deck.words.find(x => x.shelf === freeShelf.id);
    ok('one slot per written chunk', slots === w.chunks.length, `${slots} vs ${w.chunks.length}`);
    const pieces = await p.$$eval('.ss-piece', e => e.map(x => x.textContent));
    ok('tray holds every chunk', w.chunks.every(c => pieces.includes(c)), pieces.join(','));
    ok('tray order is scrambled', pieces.join('') !== w.chunks.join('') || w.chunks.length < 2);
    /* fill in correct order by clicking the matching pieces */
    for (const c of w.chunks) {
      await p.evaluate((t) => {
        const b = [...document.querySelectorAll('.ss-piece')].find(x => x.textContent === t && !x.disabled);
        if (b) b.click();
      }, c);
      await sleep(150);
    }
    const filled = await p.$$eval('.ss-slot', e => e.map(x => x.textContent).join(''));
    ok('rebuild spells the word', filled === w.chunks.join(''), filled);

    /* ⚠ the collision that actually shipped was HERE, in the landscape
       build face, not on the clap face the sweep photographs — so the
       check has to run in this mode too. */
    for (const bw of [1024, 1440]) {
      const q = await newPage({ w: bw, h: 900 });
      await q.goto(BASE + '?lang=en', { waitUntil: 'domcontentloaded' }); await ready(q);
      await q.evaluate(() => [...document.querySelectorAll('.ss-segbtn')][1].click());
      await sleep(350);
      const hit = await q.evaluate(() => {
        const s = document.querySelector('.ss-speak'), h = document.querySelector('.ss-hint');
        if (!s || !h) return 'missing';
        const a = s.getBoundingClientRect(), b = h.getBoundingClientRect();
        return (a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top) ? 'OVERLAP' : '';
      });
      ok(`build face at ${bw}px: the speaker does not sit on the hint`, hit === '', hit);
      await q.close();
    }
    await shoot(p, 'build.png');
    await p.close();
  }

  /* ---------- D sort (premium) ---------- */
  console.log('\nD — sort pens');
  {
    const p = await newPage({ premium: true }); await p.goto(BASE + '?lang=en', { waitUntil: 'domcontentloaded' }); await ready(p);
    await p.evaluate(() => document.querySelector('.ss-sortbtn').click());
    await sleep(400);
    const pens = await p.$$eval('.ss-pen', e => e.length);
    ok('one pen per declared band', pens === deck.pens.length, `${pens} vs ${deck.pens.length}`);
    const tiles = await p.$$eval('.ss-tile', e => e.length);
    ok('pile has tiles', tiles > 0, 'tiles=' + tiles);
    const labels = await p.$$eval('.ss-penlab', e => e.map(x => x.textContent));
    ok('pen labels have no bare digits beyond the band number', labels.every(l => (l.match(/\d/g) || []).length <= 2), labels.join('|'));
    /* ⭐ TAP-THEN-TAP is the primary verb now: select a tile, then choose a
       pen. Dragging a 78px tile two metres across an interactive
       whiteboard, through a 10px threshold and a pointer capture, is the
       failure mode of every IWB sort ever built — and it is the ONE gesture
       a five-year-old at the board cannot reliably make. The keyboard path
       is the same two steps, which is why it is now testable at all. */
    await p.evaluate(() => { const t = document.querySelector('.ss-pile .ss-tile'); t.focus(); t.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true })); });
    await sleep(250);
    ok('step 1 — Enter on a tile selects it', !!(await p.$('.ss-tile.ss-picked')));
    await p.evaluate(() => { const pen = document.querySelector('.ss-pen'); pen.focus(); pen.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true })); });
    await sleep(300);
    const inPens = await p.$$eval('.ss-penslot .ss-tile', e => e.length);
    ok('step 2 — Enter on a pen places it there', inPens >= 1, 'inPens=' + inPens);
    /* and the same two taps with a pointer */
    await p.evaluate(() => { const t = document.querySelector('.ss-pile .ss-tile'); if (t) t.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, clientX: 5, clientY: 5 })); document.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, clientX: 5, clientY: 5 })); });
    await sleep(250);
    ok('a pointer tap selects without dragging', !!(await p.$('.ss-tile.ss-picked')));

    /* the pens must be readable by a child who cannot read: a numeral and
       that many of the tool's own arc marks, not "2 claps" at 13px */
    const penMark = await p.evaluate(() => {
      const p1 = document.querySelectorAll('.ss-pen')[0];
      return { num: (p1.querySelector('.ss-pennum') || {}).textContent, arcs: p1.querySelectorAll('.ss-penmarks path').length, aria: p1.getAttribute('aria-label') };
    });
    ok('each pen shows a numeral', !!penMark.num, JSON.stringify(penMark));
    ok('and that many arc marks beside it', String(penMark.arcs) === penMark.num, JSON.stringify(penMark));
    ok('with the words kept as its accessible name', !!penMark.aria && /\w/.test(penMark.aria), penMark.aria);

    /* the pool must not be the same nine tiles for ever */
    const poolA = await p.evaluate(() => [...document.querySelectorAll('.ss-tile')].map(t => t.getAttribute('aria-label')).join(','));
    ok('the sort pool is bigger than the shipped nine', (poolA.match(/,/g) || []).length + 1 >= 10, poolA);
    await shoot(p, 'sort.png');
    await p.close();
  }

  /* ---------- E free vs premium ---------- */
  console.log('\nE — free vs premium');
  {
    const p = await newPage({}); await p.goto(BASE + '?lang=en', { waitUntil: 'domcontentloaded' }); await ready(p);
    await p.evaluate(() => document.querySelector('.ss-pill').click()); await sleep(300);
    const html = await p.evaluate(() => document.body.innerHTML);
    const leaked = premiumDisplays.filter(d => new RegExp('>\\s*' + d + '\\s*<', 'i').test(html));
    ok('premium words absent from the DOM', leaked.length === 0, leaked.slice(0, 5).join(','));
    await p.evaluate(() => document.querySelector('.ss-sec.ss-locked .ss-secrow').click()); await sleep(300);
    ok('the gate is INLINE, never a full-screen scrim over the board',
      await p.evaluate(() => { const g = document.querySelector('.ss-gate'); return !!g && getComputedStyle(g).position !== 'fixed'; }));
    const g = await p.evaluate(() => { const a = document.querySelector('.ss-gate-cta'); return { open: !!document.querySelector('.ss-gate'), href: a && a.getAttribute('href'), t: a && a.target }; });
    ok('locked set opens the gate', g.open);
    ok('gate links to pricing with the tool source', /\/en\/pricing\?from=tool-syllable-splitter/.test(g.href || ''), g.href);
    ok('gate escapes the iframe', g.t === '_top');
    await p.close();
  }

  /* ---------- F deep link ---------- */
  console.log('\nF — deep link + sort-mode leak');
  {
    const locked = deck.shelves.find(s => !s.free);
    const target = deck.words.find(w => w.shelf === locked.id);
    const p = await newPage({});
    await p.goto(`${BASE}?lang=en&set=${locked.id}&word=${target.id}&mode=sort`, { waitUntil: 'domcontentloaded' });
    await ready(p); await sleep(500);
    const t = await p.evaluate(() => document.body.innerHTML);
    ok('free deep link does not reach the premium word', !new RegExp('>\\s*' + target.display + '\\s*<', 'i').test(t));
    ok('free deep link does not open sort mode', !(await p.$('.ss-sort')));
    await p.close();
  }

  /* ---------- H no-shame ---------- */
  console.log('\nH — no-shame scan');
  {
    const p = await newPage({}); await p.goto(BASE + '?lang=en', { waitUntil: 'domcontentloaded' }); await ready(p);
    const s = await p.evaluate(() => {
      const alarm = [...document.querySelectorAll('*')].filter(e => {
        const m = /rgba?\((\d+),\s*(\d+),\s*(\d+)/.exec(getComputedStyle(e).backgroundColor);
        return m && +m[1] > 190 && +m[2] < 70 && +m[3] < 70;
      }).length;
      const txt = document.body.textContent;
      return { alarm, cross: /[✗✘❌×]/.test(txt), prog: document.querySelectorAll('progress,[role="progressbar"]').length, ofN: /\b\d+\s*(of|\/)\s*\d+\b/.test(txt) };
    });
    ok('no alarm-red surfaces', s.alarm === 0, 'n=' + s.alarm);
    ok('no cross marks', !s.cross);
    ok('no progress bar', s.prog === 0);
    ok('no "x of y" counting', !s.ofN);
    await p.close();
  }

  /* ---------- I reduced motion ---------- */
  console.log('\nI — reduced motion');
  {
    const p = await newPage({ reduced: true }); await p.goto(BASE + '?lang=en', { waitUntil: 'domcontentloaded' }); await ready(p);
    await p.evaluate(() => document.querySelector('.ss-drum').click()); await sleep(300);
    await reveal(p);
    const a = await p.evaluate(() => { const el = document.querySelector('.ss-arc'); return el ? getComputedStyle(el).animationName : 'none'; });
    ok('arc does not animate under reduced motion', a === 'none', a);
    ok('but the arc is still DRAWN, not erased',
      await p.evaluate(() => { const el = document.querySelector('.ss-arc'); return el && getComputedStyle(el).strokeDashoffset === '0px'; }));
    /* ⚠ the shipped block cancelled the drum's animation and gave nothing
       back, so a child who prefers reduced motion tapped a drum that did
       NOTHING AT ALL. Reduced motion must not mean dead. */
    ok('the drum head still has a struck state under reduced motion',
      await p.evaluate(() => {
        const css = document.getElementById('ss-style').textContent;
        return /\.ss-drum\.ss-hit \.ss-drum-head\{transform:/.test(css);
      }));
    await p.close();
  }

  /* ---------- J print ---------- */
  console.log('\nJ — print');
  {
    const p = await newPage({}); await p.goto(BASE + '?lang=en', { waitUntil: 'domcontentloaded' }); await ready(p);
    const css = await p.evaluate(() => document.getElementById('ss-style').textContent);
    ok('print stylesheet present', /@media print/.test(css));
    ok('card avoids page breaks', /page-break-inside:avoid/.test(css));
    /* ⚠ lcs-shell.css ships NO @media print block at all, so the shell's
       own height:100%/overflow:hidden and max-width:720px survive into
       print. A tool that does not reset them prints a clipped fragment of
       one viewport — which is exactly what this tool used to do. */
    ok('the sheet resets the SHELL, not just its own chrome', /\.lcs-app\{[^}]*max-width:none/.test(css));
    ok('and unpins the document height', /html,body\{height:auto!important;overflow:visible!important/.test(css));
    ok('shell header + controls are hidden', /\.lcs-header,\.lcs-controls/.test(css));
    ok('an A4 page is declared', /@page\{size:A4/.test(css));
    /* the worksheet must be a WORKSHEET: an empty lane for the child to
       draw the arcs into. A printed arc is the answer key. */
    const sheet = await p.evaluate(() => {
      const s = document.querySelector('.ss-printsheet');
      return s ? { cells: s.querySelectorAll('.ss-printcell').length, lanes: s.querySelectorAll('.ss-printlane').length, arcs: s.querySelectorAll('.ss-arc').length } : null;
    });
    ok('a print sheet is built', !!sheet && sheet.cells > 0, JSON.stringify(sheet));
    ok('every cell has an empty arc lane', sheet && sheet.lanes === sheet.cells, JSON.stringify(sheet));
    ok('and the sheet NEVER pre-draws the answer', sheet && sheet.arcs === 0, JSON.stringify(sheet));
    await p.close();
  }

  /* ---------- K the desk ---------- */
  console.log('\nK — the custom-word desk');
  {
    const p = await newPage({ w: 900, h: 1100 }); await p.goto(BASE + '?lang=en', { waitUntil: 'domcontentloaded' }); await ready(p);
    await p.evaluate(() => document.querySelector('.ss-pill').click()); await sleep(300);
    ok('the set button opens the desk', !!(await p.$('.ss-desk')));
    /* ⚠ IN FLOW, NEVER FIXED. A position:fixed panel inside a
       content-height iframe resolves its max-height against a few hundred
       pixels. And a stray fixed child is how ".ss-ghost" (the sort drag
       ghost) silently captured the desk's Copy button and parked it on top
       of the hint — two things wearing one class name, the recorded
       .urt-lock defect. Assert NOTHING in the desk is out of flow. */
    const fixed = await p.evaluate(() => [...document.querySelectorAll('.ss-desk *')]
      .filter(e => { const q = getComputedStyle(e).position; return q === 'fixed' || q === 'absolute'; })
      .map(e => e.className));
    ok('nothing inside the desk is fixed or absolutely positioned', fixed.length === 0, fixed.join(','));

    await p.evaluate(() => { [...document.querySelectorAll('.ss-tab')].find(t => /my words/i.test(t.textContent)).click(); });
    await sleep(250);
    await p.type('.ss-ed-area', 'Amara');
    await p.click('.ss-ed-btn'); await sleep(350);

    /* ⚠ and no two desk rows may overlap — the same defect again, seen
       from the geometry side rather than the CSS side. */
    const overlaps = await p.evaluate(() => {
      const kids = [...document.querySelector('.ss-desk-body').children].map(c => c.getBoundingClientRect());
      const out = [];
      for (let a = 0; a < kids.length; a++) for (let b = a + 1; b < kids.length; b++)
        if (kids[a].bottom > kids[b].top + 1) out.push(a + '/' + b);
      return out;
    });
    ok('no two desk rows overlap', overlaps.length === 0, overlaps.join(','));

    const chunks = await p.evaluate(() => JSON.parse(localStorage.getItem('lcs:syllable-splitter:v1')).custom.map(c => c.chunks.join('-')));
    ok('⭐ every seam opens CLOSED — the machine proposes nothing', chunks.every(c => c.indexOf('-') < 0), JSON.stringify(chunks));
    ok('the "we do not check them" sentence is on screen',
      await p.$eval('.ss-ownnote', e => e.textContent.trim().length > 20));

    const seams = await p.$$('.ss-seam');
    ok('there is a real tap target between every letter pair', seams.length === 'Amara'.length - 1, seams.length);
    const seamBox = await p.evaluate(() => { const s = document.querySelector('.ss-seam').getBoundingClientRect(); return { w: Math.round(s.width), h: Math.round(s.height) }; });
    ok('the seam is a board-finger target (>=32x44)', seamBox.w >= 32 && seamBox.h >= 44, JSON.stringify(seamBox));

    await seams[0].click(); await sleep(220);
    const cut = await p.evaluate(() => JSON.parse(localStorage.getItem('lcs:syllable-splitter:v1')).custom[0].chunks.join('-'));
    ok('one tap makes exactly one cut', cut === 'A-mara', cut);
    ok('and the live preview draws the arcs she just made',
      (await p.$$('.ss-myarc')).length === 2, (await p.$$('.ss-myarc')).length);

    await shoot(p, 'desk.png');
    await p.close();
  }

  await browser.close(); server.close();
  console.log(`\n${fail ? 'FAIL' : 'ALL GREEN'} — ${pass} passed, ${fail} failed`);
  if (fail) bad.forEach(b => console.log('  - ' + b));
  process.exit(fail ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
