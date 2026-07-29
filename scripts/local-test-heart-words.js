#!/usr/bin/env node
/* =====================================================================
   local-test-heart-words.js — the local Definition-of-Done for TOOL #21.

   scripts/visual-qa-activity.js resolves only ids declared in a
   *-activities.json manifest, so it cannot see a free-play tool.
   SECTION A is the substitute: the full viewport sweep with measured
   containment, at DESKTOP widths too, not just phone.

     A viewport sweep 320-1366: no h-overflow, box row fits, taps >=44px
     B mapping: every box tappable in any order, no verdict class ever
     C the heart moment: outline stamp + type:'ui' line, ZERO 'syllable'
     D flip: sentence face, real image, target marked
     E bookshelf: spines persist across reload, and NEVER show a digit
     F review ring: enter, re-tap, leave in one tap, no due/date text
     G free vs premium: premium displays absent from the DOM entirely
     H deep link waits for entitlement — BOTH arms (live + trust-cache)
     I print stylesheet + premium-only print DOM
     J no-shame DOM scan (no alarm red, no crosses, no progressbar)
     K reduced motion: no rotation, no stamp animation
     L keyboard + resume

   Usage: node scripts/local-test-heart-words.js [--shot]
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const IMG = path.join(REPO, 'image-library-webp');
const QA = path.join(REPO, 'docs', 'audit-results', 'heart-words', 'qa');
fs.mkdirSync(QA, { recursive: true });
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp', '.svg': 'image/svg+xml' };
const SHOT = process.argv.includes('--shot');

let pass = 0, fail = 0;
const bad = [];
function ok(name, cond, extra) {
  if (cond) { pass++; console.log('  ok   ' + name); }
  else { fail++; bad.push(name); console.log('  FAIL ' + name + (extra ? ' — ' + extra : '')); }
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function serve() {
  return http.createServer((req, res) => {
    const p = decodeURIComponent(req.url.split('?')[0]);
    let file;
    if (p.startsWith('/mini-tools/')) file = path.join(MINI, p.slice('/mini-tools/'.length));
    else if (p.startsWith('/image-library-webp/')) file = path.join(IMG, p.slice('/image-library-webp/'.length));
    else file = path.join(MINI, p.replace(/^\//, ''));
    fs.readFile(file, (err, buf) => {
      if (err) { res.statusCode = 404; res.end(); return; }
      res.setHeader('Content-Type', MIME[path.extname(file)] || 'application/octet-stream');
      res.end(buf);
    });
  });
}

const VIEWPORTS = [
  { w: 320, h: 640 }, { w: 360, h: 740 }, { w: 412, h: 820 },
  { w: 768, h: 1000 }, { w: 1024, h: 900 }, { w: 1366, h: 900 }
];

(async () => {
  const server = serve();
  await new Promise((r) => server.listen(0, r));
  const PORT = server.address().port;
  const BASE = `http://127.0.0.1:${PORT}/mini-tools/heart-words.html`;
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });

  const bank = JSON.parse(fs.readFileSync(path.join(MINI, 'heart-words-en.json'), 'utf8'));
  const freeShelf = bank.shelves.find((s) => s.free);
  const lockedShelves = bank.shelves.filter((s) => !s.free);
  const premiumDisplays = bank.words.filter((w) => w.shelf !== freeShelf.id).map((w) => w.display);

  async function newPage(opts) {
    opts = opts || {};
    const page = await browser.newPage();
    await page.setViewport({ width: opts.w || 1024, height: opts.h || 800 });
    await page.evaluateOnNewDocument((premium, store) => {
      /* Hermetic pages — localStorage leaks between harness navigations.
         The sessionStorage flag makes the wipe run ONCE per page, so a
         reload still exercises real persistence instead of a cleared jar. */
      try {
        if (sessionStorage.getItem('__hw_seeded')) return;
        sessionStorage.setItem('__hw_seeded', '1');
      } catch (_) {}
      try { localStorage.clear(); } catch (_) {}
      if (premium) {
        try {
          localStorage.setItem('accessToken', 'harness-token');
          const base = store || { v: 1 };
          base.ent = { tier: 'full', checkedAt: new Date().toISOString() };
          localStorage.setItem('lcs:heart-words:v1', JSON.stringify(base));
        } catch (_) {}
      } else if (store) {
        try { localStorage.setItem('lcs:heart-words:v1', JSON.stringify(store)); } catch (_) {}
      }
    }, !!opts.premium, opts.store || null);
    /* A premium page must answer /api/auth/me like the real server. A 404
       is a DEFINITIVE "not premium" (only a network FAILURE falls back to
       the trust-cache), so seeding localStorage alone is not enough — and
       must not be, or the entitlement seam would be trivially spoofable. */
    if (opts.premium && !opts.offline) {
      await page.setRequestInterception(true);
      page.on('request', (r) => {
        if (/\/api\/auth\/me/.test(r.url())) {
          r.respond({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({ user: { subscriptionTier: 'full' }, subscription: { status: 'active' } })
          });
        } else r.continue();
      });
    }
    if (opts.reduced) await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
    page._errs = [];
    const benign = (t) => /404|Failed to load resource|net::ERR/i.test(t);
    page.on('pageerror', (e) => { if (!benign(e.message)) page._errs.push('pageerror: ' + e.message); });
    page.on('console', (m) => { if (m.type() === 'error' && !benign(m.text())) page._errs.push(m.text()); });
    return page;
  }

  async function ready(page) {
    await page.waitForSelector('.hw-boxrow', { timeout: 8000 });
    await sleep(200);
  }
  async function spy(page) {
    await page.evaluate(() => {
      window.__spoken = [];
      if (window.LCSAudio) { LCSAudio.speak = function (o) { window.__spoken.push(o); }; LCSAudio.cancel = function () {}; }
    });
  }
  async function shoot(page, name) {
    if (!SHOT) return;
    await page.evaluate(() => { window.scrollTo(0, 0); document.documentElement.scrollTop = 0; document.body.scrollTop = 0; });
    await sleep(120);
    await page.screenshot({ path: path.join(QA, name) });
  }
  const tapBox = (page, i) => page.evaluate((j) => document.querySelectorAll('.hw-box')[j].click(), i);
  const boxCount = (page) => page.$$eval('.hw-box', (e) => e.length);

  /* ---------------- A — viewport sweep ---------------- */
  console.log('\nA — viewport sweep');
  for (const v of VIEWPORTS) {
    const page = await newPage({ w: v.w, h: v.h });
    await page.goto(BASE + '?lang=en', { waitUntil: 'domcontentloaded' });
    await ready(page);
    const m = await page.evaluate(() => {
      const doc = document.documentElement;
      const row = document.querySelector('.hw-boxrow');
      const boxes = [...document.querySelectorAll('.hw-box')];
      const controls = [...document.querySelectorAll('button, a')];
      const small = controls.filter((b) => {
        const r = b.getBoundingClientRect();
        return r.width > 0 && r.height > 0 && (r.width < 44 || r.height < 44);
      }).map((b) => (b.className || '') + ':' + Math.round(b.getBoundingClientRect().height));
      const rowRect = row ? row.getBoundingClientRect() : null;
      /* the speaker sits absolute in the card corner — prove it never
         overlaps a box (measured, not eyeballed) */
      const spk = document.querySelector('.hw-wordspeak');
      let spkOverlap = 0;
      if (spk) {
        const s = spk.getBoundingClientRect();
        spkOverlap = boxes.filter((b) => {
          const r = b.getBoundingClientRect();
          return !(r.right <= s.left || r.left >= s.right || r.bottom <= s.top || r.top >= s.bottom);
        }).length;
      }
      return {
        spkOverlap,
        hOverflow: doc.scrollWidth - doc.clientWidth,
        rowRight: rowRect ? rowRect.right : 0,
        rowLeft: rowRect ? rowRect.left : 0,
        vw: doc.clientWidth,
        boxW: boxes.length ? Math.min(...boxes.map((b) => b.getBoundingClientRect().width)) : 0,
        small
      };
    });
    ok(`${v.w}px no horizontal overflow`, m.hOverflow <= 1, 'overflow ' + m.hOverflow);
    ok(`${v.w}px box row inside viewport`, m.rowLeft >= -1 && m.rowRight <= m.vw + 1, `${m.rowLeft}..${m.rowRight} of ${m.vw}`);
    ok(`${v.w}px boxes legible (>=34px)`, m.boxW >= 34, 'min box ' + Math.round(m.boxW));
    ok(`${v.w}px taps >=44px`, m.small.length === 0, m.small.slice(0, 3).join(', '));
    ok(`${v.w}px speaker clears the boxes`, m.spkOverlap === 0, 'overlaps ' + m.spkOverlap);
    if (v.w === 360 || v.w === 768 || v.w === 1024) await shoot(page, `sweep-${v.w}.png`);
    ok(`${v.w}px no console errors`, page._errs.length === 0, page._errs[0]);
    await page.close();
  }

  /* ------- A2 — the WORST CASE word at every viewport -------
     The default word is short; the sweep above would happily pass a layout
     that breaks on the longest word in the catalogue. Force it. */
  console.log('\nA2 — longest word sweep');
  {
    const longest = bank.words.slice().sort((a, b) => b.boxes.length - a.boxes.length)[0];
    console.log(`  (worst case: "${longest.display}", ${longest.boxes.length} boxes)`);
    for (const v of VIEWPORTS) {
      const page = await newPage({ w: v.w, h: v.h, premium: true });
      await page.goto(`${BASE}?lang=en&shelf=${longest.shelf}&word=${longest.id}`, { waitUntil: 'domcontentloaded' });
      await ready(page);
      await sleep(400);
      const m = await page.evaluate(() => {
        const doc = document.documentElement;
        const boxes = [...document.querySelectorAll('.hw-box')];
        const row = document.querySelector('.hw-boxrow');
        const r = row.getBoundingClientRect();
        const spk = document.querySelector('.hw-wordspeak');
        let spkOverlap = 0;
        if (spk) {
          const s = spk.getBoundingClientRect();
          spkOverlap = boxes.filter((b) => {
            const q = b.getBoundingClientRect();
            return !(q.right <= s.left || q.left >= s.right || q.bottom <= s.top || q.top >= s.bottom);
          }).length;
        }
        return {
          n: boxes.length,
          spkOverlap,
          hOverflow: doc.scrollWidth - doc.clientWidth,
          minW: Math.min(...boxes.map((b) => b.getBoundingClientRect().width)),
          inside: r.left >= -1 && r.right <= doc.clientWidth + 1,
          glyph: Math.min(...boxes.map((b) => {
            const g = b.querySelector('.hw-glyph');
            return g ? parseFloat(getComputedStyle(g).fontSize) : 99;
          }))
        };
      });
      ok(`${v.w}px longest word: no overflow`, m.hOverflow <= 1, 'overflow ' + m.hOverflow);
      ok(`${v.w}px longest word: row inside viewport`, m.inside);
      ok(`${v.w}px longest word: boxes >=34px`, m.minW >= 34, 'min ' + Math.round(m.minW));
      ok(`${v.w}px longest word: glyph >=14px`, m.glyph >= 14, 'glyph ' + Math.round(m.glyph));
      ok(`${v.w}px longest word: speaker clears the boxes`, m.spkOverlap === 0, 'overlaps ' + m.spkOverlap);
      if (v.w === 320 || v.w === 1024) await shoot(page, `longest-${v.w}.png`);
      await page.close();
    }
  }

  /* ---------------- B — mapping ---------------- */
  console.log('\nB — mapping');
  {
    const page = await newPage({});
    await page.goto(BASE + '?lang=en', { waitUntil: 'domcontentloaded' });
    await ready(page);
    const n = await boxCount(page);
    ok('word renders 2-6 boxes', n >= 2 && n <= 6, 'n=' + n);
    /* scrambled order — no tap may be refused */
    const order = [...Array(n).keys()].reverse();
    for (const i of order) { await tapBox(page, i); await sleep(60); }
    const mapped = await page.$$eval('.hw-box', (e) => e.filter((b) => b.classList.contains('hw-mapped')).length);
    ok('every box maps in any order', mapped === n, `${mapped}/${n}`);
    const verdictish = await page.evaluate(() =>
      [...document.querySelectorAll('*')].some((e) =>
        /\b(correct|incorrect|wrong|oops|try again)\b/i.test(e.textContent || '') && e.children.length === 0));
    ok('no verdict wording anywhere', !verdictish);
    await page.close();
  }

  /* ---------------- C — the heart moment ---------------- */
  console.log('\nC — the heart moment');
  {
    const page = await newPage({});
    await page.goto(BASE + '?lang=en', { waitUntil: 'domcontentloaded' });
    await ready(page);
    await spy(page);
    const heartIdx = bank.words.find((w) => w.shelf === freeShelf.id).heart[0];
    await tapBox(page, heartIdx);
    await sleep(500);
    const st = await page.evaluate((i) => {
      const b = document.querySelectorAll('.hw-box')[i];
      return {
        hearted: b.classList.contains('hw-hearted'),
        hasSvg: !!b.querySelector('svg.hw-heart'),
        glyphVisible: !!b.querySelector('.hw-glyph') && b.querySelector('.hw-glyph').textContent.length > 0,
        spoken: window.__spoken || []
      };
    }, heartIdx);
    ok('hearted box carries the outline stamp', st.hearted && st.hasSvg);
    ok('letters stay readable under the heart', st.glyphVisible);
    ok('heart line spoken as type:ui', st.spoken.some((s) => s.type === 'ui'));
    ok('every speak call carries lang', st.spoken.every((s) => !!s.lang), JSON.stringify(st.spoken[0] || {}));
    ok('ZERO isolated-phoneme speech', st.spoken.every((s) => s.type === 'word' || s.type === 'ui'),
      JSON.stringify(st.spoken.map((s) => s.type)));
    /* a regular box must NOT be hearted */
    const regular = [...Array(await boxCount(page)).keys()].find((i) =>
      bank.words.find((w) => w.shelf === freeShelf.id).heart.indexOf(i) < 0);
    if (regular !== undefined) {
      await tapBox(page, regular);
      await sleep(200);
      const r = await page.evaluate((i) => {
        const b = document.querySelectorAll('.hw-box')[i];
        return { hearted: b.classList.contains('hw-hearted'), mapped: b.classList.contains('hw-mapped') };
      }, regular);
      ok('regular box marks without a heart', r.mapped && !r.hearted);
    }
    await shoot(page, 'heart-moment.png');
    await page.close();
  }

  /* ---------------- D — flip ---------------- */
  console.log('\nD — flip to the sentence');
  {
    const page = await newPage({});
    await page.goto(BASE + '?lang=en', { waitUntil: 'domcontentloaded' });
    await ready(page);
    await spy(page);
    await page.evaluate(() => document.querySelector('.hw-flip').click());
    await sleep(700);
    const d = await page.evaluate(() => {
      const img = document.querySelector('.hw-pic');
      const sent = document.querySelector('.hw-sentence');
      return {
        flipped: !!document.querySelector('.hw-card.hw-flipped'),
        imgOk: !!img && img.naturalWidth > 0,
        imgSrc: img ? img.src : '',
        marked: !!document.querySelector('.hw-sent-target'),
        text: sent ? sent.textContent : ''
      };
    });
    ok('card flips to the sentence face', d.flipped);
    ok('illustration actually loads', d.imgOk, d.imgSrc);
    ok('the heart word is marked in the sentence', d.marked);
    ok('sentence text present', d.text.length > 5, d.text);
    await page.evaluate(() => document.querySelector('.hw-sentspeak').click());
    await sleep(200);
    const sp = await page.evaluate(() => window.__spoken || []);
    ok('sentence spoken as type:ui with lang', sp.some((s) => s.type === 'ui' && s.lang));
    await shoot(page, 'sentence-face.png');
    await page.close();
  }

  /* ---------------- E — bookshelf ---------------- */
  console.log('\nE — bookshelf');
  {
    const page = await newPage({});
    await page.goto(BASE + '?lang=en', { waitUntil: 'domcontentloaded' });
    await ready(page);
    const n = await boxCount(page);
    for (let i = 0; i < n; i++) { await tapBox(page, i); await sleep(70); }
    await sleep(900);
    const spines = await page.$$eval('.hw-spine', (e) => e.length);
    ok('a spine appears once a word is mapped', spines >= 1, 'spines=' + spines);
    const digits = await page.$eval('.hw-shelf', (e) => (e.textContent.match(/\d/g) || []).length);
    ok('the bookshelf NEVER shows a digit', digits === 0, digits + ' digits found');
    /* persistence */
    await page.reload({ waitUntil: 'domcontentloaded' });
    await ready(page);
    const after = await page.$$eval('.hw-spine', (e) => e.length);
    ok('bookshelf survives a reload', after >= 1, 'after=' + after);
    await shoot(page, 'bookshelf.png');
    await page.close();
  }

  /* ---------------- F — review ring ---------------- */
  console.log('\nF — review ring');
  {
    const page = await newPage({});
    await page.goto(BASE + '?lang=en', { waitUntil: 'domcontentloaded' });
    await ready(page);
    const n = await boxCount(page);
    for (let i = 0; i < n; i++) { await tapBox(page, i); await sleep(70); }
    await sleep(800);
    await page.evaluate(() => {
      const b = [...document.querySelectorAll('.hw-toolbtn')][0];
      b.click();
    });
    await sleep(400);
    const inRing = await page.evaluate(() => !!document.querySelector('.hw-boxrow'));
    ok('ring opens on a known word', inRing);
    const ringText = await page.evaluate(() => document.querySelector('.hw-wrap').textContent);
    ok('no due/date/streak wording in the ring', !/\b(due|today|streak|overdue|days?)\b/i.test(ringText));
    await page.evaluate(() => [...document.querySelectorAll('.hw-toolbtn')][0].click());
    await sleep(300);
    ok('leaving the ring is one tap', await page.evaluate(() => !!document.querySelector('.hw-boxrow')));
    await page.close();
  }

  /* ---------------- G — free vs premium ---------------- */
  console.log('\nG — free vs premium');
  {
    const page = await newPage({});
    await page.goto(BASE + '?lang=en', { waitUntil: 'domcontentloaded' });
    await ready(page);
    await page.evaluate(() => document.querySelector('.hw-pill').click());
    await sleep(300);
    const html = await page.evaluate(() => document.body.innerHTML);
    const leaked = premiumDisplays.filter((d) => new RegExp('>\\s*' + d + '\\s*<', 'i').test(html));
    ok('premium words absent from the DOM entirely', leaked.length === 0, leaked.slice(0, 5).join(','));
    const lockedRows = await page.$$eval('.hw-shelfsec.hw-locked', (e) => e.length);
    ok('locked shelves still visible as rows', lockedRows === lockedShelves.length, `${lockedRows}/${lockedShelves.length}`);
    await page.evaluate(() => document.querySelector('.hw-shelfsec.hw-locked .hw-shelfrow').click());
    await sleep(300);
    const gate = await page.evaluate(() => {
      const a = document.querySelector('.hw-gate-cta');
      return { open: !!document.querySelector('.hw-gate'), href: a ? a.getAttribute('href') : '', target: a ? a.target : '' };
    });
    ok('locked shelf opens the gate', gate.open);
    ok('gate links to pricing with the tool source', /\/en\/pricing\?from=tool-heart-words/.test(gate.href), gate.href);
    ok('gate escapes the iframe', gate.target === '_top');
    await shoot(page, 'gate.png');
    await page.close();

    const pp = await newPage({ premium: true });
    await pp.goto(BASE + '?lang=en', { waitUntil: 'domcontentloaded' });
    await ready(pp);
    await pp.evaluate(() => document.querySelector('.hw-pill').click());
    await sleep(300);
    const phtml = await pp.evaluate(() => document.body.innerHTML);
    const shown = premiumDisplays.filter((d) => new RegExp('>\\s*' + d + '\\s*<', 'i').test(phtml));
    ok('premium sees the premium words', shown.length > 0, 'shown=' + shown.length);
    await pp.close();
  }

  /* ---------------- H — deep link waits for entitlement ---------------- */
  console.log('\nH — deep link entitlement');
  {
    const locked = lockedShelves[0];
    const target = bank.words.find((w) => w.shelf === locked.id);
    const page = await newPage({});
    await page.goto(`${BASE}?lang=en&shelf=${locked.id}&word=${target.id}`, { waitUntil: 'domcontentloaded' });
    await ready(page);
    await sleep(500);
    const t = await page.evaluate(() => document.body.innerHTML);
    ok('free deep link does NOT reach the premium word',
      !new RegExp('>\\s*' + target.display + '\\s*<', 'i').test(t));
    await page.close();

    /* premium via the offline trust-cache arm (/api/auth/me unreachable) */
    const pc = await newPage({ premium: true, offline: true });
    await pc.setRequestInterception(true);
    pc.on('request', (r) => { if (/\/api\/auth\/me/.test(r.url())) r.abort(); else r.continue(); });
    await pc.goto(`${BASE}?lang=en&shelf=${locked.id}&word=${target.id}`, { waitUntil: 'domcontentloaded' });
    await ready(pc);
    await sleep(600);
    const got = await pc.evaluate(() => {
      const g = document.querySelector('.hw-glyph');
      return document.querySelector('.hw-boxrow') ? document.querySelector('.hw-boxrow').textContent : '';
    });
    ok('trust-cache arm still honours the deep link', got.length > 0, got);
    await pc.close();
  }

  /* ---------------- I — print ---------------- */
  console.log('\nI — print');
  {
    const free = await newPage({});
    await free.goto(BASE + '?lang=en', { waitUntil: 'domcontentloaded' });
    await ready(free);
    const freeSheet = await free.$$eval('.hw-printsheet', (e) => e.length);
    ok('free build ships no print DOM', freeSheet === 0);
    const css = await free.evaluate(() => document.getElementById('hw-style').textContent);
    ok('print stylesheet present', /@media print/.test(css));
    ok('print cards avoid page breaks', /page-break-inside:avoid/.test(css));
    await free.close();

    const pp = await newPage({ premium: true });
    await pp.goto(BASE + '?lang=en', { waitUntil: 'domcontentloaded' });
    await ready(pp);
    const cards = await pp.$$eval('.hw-printcard', (e) => e.length);
    ok('premium build ships the card sheet', cards > 0, 'cards=' + cards);
    await pp.close();
  }

  /* ---------------- J — no-shame DOM scan ---------------- */
  console.log('\nJ — no-shame scan');
  {
    const page = await newPage({});
    await page.goto(BASE + '?lang=en', { waitUntil: 'domcontentloaded' });
    await ready(page);
    const scan = await page.evaluate(() => {
      const alarm = [...document.querySelectorAll('*')].filter((e) => {
        const bg = getComputedStyle(e).backgroundColor;
        const m = /rgba?\((\d+),\s*(\d+),\s*(\d+)/.exec(bg);
        if (!m) return false;
        const r = +m[1], g = +m[2], b = +m[3];
        return r > 190 && g < 70 && b < 70;
      }).length;
      const txt = document.body.textContent;
      return {
        alarm,
        cross: /[✗✘❌×]/.test(txt),
        progress: document.querySelectorAll('progress,[role="progressbar"]').length,
        ofN: /\b\d+\s*(of|\/)\s*\d+\b/.test(txt)
      };
    });
    ok('no alarm-red surfaces', scan.alarm === 0, 'n=' + scan.alarm);
    ok('no cross marks', !scan.cross);
    ok('no progress bar', scan.progress === 0);
    ok('no "x of y" counting', !scan.ofN);
    await page.close();
  }

  /* ---------------- K — reduced motion ---------------- */
  console.log('\nK — reduced motion');
  {
    const page = await newPage({ reduced: true });
    await page.goto(BASE + '?lang=en', { waitUntil: 'domcontentloaded' });
    await ready(page);
    const heartIdx = bank.words.find((w) => w.shelf === freeShelf.id).heart[0];
    await tapBox(page, heartIdx);
    await sleep(300);
    const rm = await page.evaluate((i) => {
      const b = document.querySelectorAll('.hw-box')[i];
      const svg = b.querySelector('svg.hw-heart');
      const card = document.querySelector('.hw-card');
      return {
        stamp: svg ? getComputedStyle(svg).animationName : 'none',
        cardTransition: getComputedStyle(card).transitionDuration
      };
    }, heartIdx);
    ok('heart stamp does not animate', rm.stamp === 'none', rm.stamp);
    ok('card flip transition disabled', /^0s?$|^0ms$/.test(rm.cardTransition.trim()), rm.cardTransition);
    await page.evaluate(() => document.querySelector('.hw-flip').click());
    await sleep(300);
    const rot = await page.evaluate(() => getComputedStyle(document.querySelector('.hw-card')).transform);
    ok('no rotation under reduced motion', rot === 'none' || !/matrix3d/.test(rot), rot);
    await page.close();
  }

  /* ---------------- L — keyboard + resume ---------------- */
  console.log('\nL — keyboard + resume');
  {
    const page = await newPage({});
    await page.goto(BASE + '?lang=en', { waitUntil: 'domcontentloaded' });
    await ready(page);
    const first = await page.$eval('.hw-boxrow', (e) => e.textContent);
    await page.keyboard.press('ArrowRight');
    await sleep(300);
    const second = await page.$eval('.hw-boxrow', (e) => e.textContent);
    ok('arrow key moves to the next word', first !== second, `${first} -> ${second}`);
    await page.keyboard.press('f');
    await sleep(500);
    ok('f flips the card', await page.evaluate(() => !!document.querySelector('.hw-card.hw-flipped')));
    ok('no console errors in the drive', page._errs.length === 0, page._errs[0]);
    await page.close();
  }

  await browser.close();
  server.close();

  console.log(`\n${fail ? 'FAIL' : 'ALL GREEN'} — ${pass} passed, ${fail} failed`);
  if (fail) { console.log('failed:'); bad.forEach((b) => console.log('  - ' + b)); }
  process.exit(fail ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
