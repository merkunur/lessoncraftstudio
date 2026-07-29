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
const VIEWPORTS = [{ w: 320, h: 640 }, { w: 360, h: 740 }, { w: 412, h: 820 }, { w: 768, h: 1000 }, { w: 1024, h: 900 }, { w: 1366, h: 900 }];

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
  const ready = async (p) => { await p.waitForSelector('.ss-wordrow,.ss-sort', { timeout: 8000 }); await sleep(200); };
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
    await p.goto(BASE + '?lang=en', { waitUntil: 'domcontentloaded' }); await ready(p);
    const m = await measure(p);
    ok(`${v.w}px no horizontal overflow`, m.hOverflow <= 1, 'overflow ' + m.hOverflow);
    ok(`${v.w}px word inside viewport`, m.rowL >= -1 && m.rowR <= m.vw + 1, `${Math.round(m.rowL)}..${Math.round(m.rowR)} of ${m.vw}`);
    ok(`${v.w}px word legible (>=22px)`, m.fs >= 22, 'font ' + Math.round(m.fs));
    ok(`${v.w}px taps >=44px`, m.small.length === 0, m.small.slice(0, 3).join(', '));
    ok(`${v.w}px no console errors`, p._errs.length === 0, p._errs[0]);
    if ([360, 768, 1024].includes(v.w)) await shoot(p, `sweep-${v.w}.png`);
    await p.close();
  }

  /* ---------- A2 longest word ---------- */
  console.log(`\nA2 — longest word ("${longest.display}", ${longest.count} syllables)`);
  for (const v of VIEWPORTS) {
    const p = await newPage({ w: v.w, h: v.h, premium: true });
    await p.goto(`${BASE}?lang=en&set=${longest.shelf}&word=${longest.id}`, { waitUntil: 'domcontentloaded' });
    await ready(p); await sleep(400);
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
    for (let i = 1; i <= n; i++) {
      await p.evaluate(() => document.querySelector('.ss-drum').click());
      await sleep(260);
      const arcs = await p.$$eval('.ss-arc', e => e.length);
      ok(`tap ${i} draws arc ${i}`, arcs === i, `arcs=${arcs}`);
    }
    /* extra taps must be ACCEPTED (never refused) but draw no extra arc */
    await p.evaluate(() => document.querySelector('.ss-drum').click());
    await sleep(200);
    const after = await p.$$eval('.ss-arc', e => e.length);
    ok('an extra tap is not refused and adds no arc', after === n, `arcs=${after}`);
    const sp = await p.evaluate(() => window.__spoken || []);
    ok('syllables spoken as type:syllable', sp.some(s => s.type === 'syllable'));
    ok('every speak call carries lang', sp.every(s => !!s.lang));
    ok('ZERO phoneme-type speech', sp.every(s => ['word', 'syllable', 'ui'].includes(s.type)), JSON.stringify(sp.map(s => s.type)));
    await shoot(p, 'clap.png');
    await p.close();
  }

  /* ---------- C build ---------- */
  console.log('\nC — build: rebuild with written chunks');
  {
    const p = await newPage({}); await p.goto(BASE + '?lang=en', { waitUntil: 'domcontentloaded' }); await ready(p);
    await p.evaluate(() => [...document.querySelectorAll('.ss-mode')][1].click());
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
    await shoot(p, 'build.png');
    await p.close();
  }

  /* ---------- D sort (premium) ---------- */
  console.log('\nD — sort pens');
  {
    const p = await newPage({ premium: true }); await p.goto(BASE + '?lang=en', { waitUntil: 'domcontentloaded' }); await ready(p);
    await p.evaluate(() => [...document.querySelectorAll('.ss-mode')][2].click());
    await sleep(400);
    const pens = await p.$$eval('.ss-pen', e => e.length);
    ok('one pen per declared band', pens === deck.pens.length, `${pens} vs ${deck.pens.length}`);
    const tiles = await p.$$eval('.ss-tile', e => e.length);
    ok('pile has tiles', tiles > 0, 'tiles=' + tiles);
    const labels = await p.$$eval('.ss-penlab', e => e.map(x => x.textContent));
    ok('pen labels have no bare digits beyond the band number', labels.every(l => (l.match(/\d/g) || []).length <= 2), labels.join('|'));
    /* keyboard fallback moves a tile */
    await p.evaluate(() => { const t = document.querySelector('.ss-pile .ss-tile'); t.focus(); t.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true })); });
    await sleep(300);
    const inPens = await p.$$eval('.ss-penslot .ss-tile', e => e.length);
    ok('keyboard fallback places a tile in a pen', inPens >= 1, 'inPens=' + inPens);
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
    const a = await p.evaluate(() => { const el = document.querySelector('.ss-arc'); return el ? getComputedStyle(el).animationName : 'none'; });
    ok('arc does not animate under reduced motion', a === 'none', a);
    await p.close();
  }

  /* ---------- J print ---------- */
  console.log('\nJ — print');
  {
    const p = await newPage({}); await p.goto(BASE + '?lang=en', { waitUntil: 'domcontentloaded' }); await ready(p);
    const css = await p.evaluate(() => document.getElementById('ss-style').textContent);
    ok('print stylesheet present', /@media print/.test(css));
    ok('card avoids page breaks', /page-break-inside:avoid/.test(css));
    await p.close();
  }

  await browser.close(); server.close();
  console.log(`\n${fail ? 'FAIL' : 'ALL GREEN'} — ${pass} passed, ${fail} failed`);
  if (fail) bad.forEach(b => console.log('  - ' + b));
  process.exit(fail ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
