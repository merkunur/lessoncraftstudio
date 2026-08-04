#!/usr/bin/env node
/* =====================================================================
   local-test-estimation-jar.js — local Definition-of-Done for TOOL #23.

   `scripts/visual-qa-activity.js` resolves only ids declared in a
   *-activities.json manifest, so it cannot see a free-play tool.
   SECTION A is the substitute, and A2 forces the 200-object jar — the
   real worst case (scatter density, 20 ten-frames, a 0-200 line).

     A  viewport sweep 320-1366: no overflow, taps >= 44px
     A2 a 200-object premium jar at every viewport
     B  the ritual: fill -> tap the line -> commit -> reveal
     C  NUMERAL LEAK — the true count is absent from DOM/aria/title
        before the reveal (the doctrine-B half that lives in the DOM)
     D  NO RANKING — no closest/winner vocabulary anywhere, ever
     E  free vs premium: locked fillings absent from the DOM
     F  deep link: locked set refused, premium-size count clamped
     G  speech: numerals only, always with lang
     H  reduced motion
     I  print

   Usage: node scripts/local-test-estimation-jar.js [--shot]
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const IMG = path.join(REPO, 'image-library-webp');
const QA = path.join(REPO, 'docs', 'audit-results', 'estimation-jar', 'qa');
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

/* ---------------------------------------------------------------------
   MEASURING WIDTH HONESTLY.

   `lcs-shell.css` sets overflow-x:hidden on html AND body, so
   documentElement.scrollWidth is PINNED to the viewport — a 1400px child
   is silently clipped and the document reports no overflow at all.
   Measured, not assumed: a deliberately 1400px-wide .ej-frames at 320px
   gave :root scrollW=320 (unchanged) while its own rect ran to right=860.
   An overflow assertion on the document therefore cannot fail, which is
   worse than no assertion — so measure the two things that DO move:

     1. any element whose box escapes the viewport horizontally
     2. any non-scrollable element whose content overflows its own box
        (the CLIP class §A.13.55 hard-fails on)
   --------------------------------------------------------------------- */
const WIDTH_PROBE = function (vw) {
  const bad = [];
  const name = (e) => (e.className && e.className.baseVal !== undefined ? e.className.baseVal : e.className) || e.tagName;
  for (const e of document.querySelectorAll('.lcs-stage *')) {
    const cs = getComputedStyle(e);
    if (cs.display === 'none' || cs.visibility === 'hidden') continue;
    const r = e.getBoundingClientRect();
    if (r.width === 0 && r.height === 0) continue;

    /* (1) OFF-SCREEN — the child cannot see or reach it. Always harm. */
    if (r.right > vw + 1 || r.left < -1) {
      bad.push('offscreen ' + name(e) + ' [' + Math.round(r.left) + '..' + Math.round(r.right) + ']');
      continue;
    }
    /* (2) CLIPPED — cut off by an ancestor that actually clips. Note that
       scrollWidth>clientWidth on its own is NOT harm: an absolutely
       positioned marker layer is deliberately narrower than the markers
       that overhang it, and that overhang lands in a gutter. Only a real
       clipping ancestor turns overhang into a defect. */
    for (let a = e.parentElement; a; a = a.parentElement) {
      const acs = getComputedStyle(a);
      if (!/hidden|clip|auto|scroll/.test(acs.overflowX)) { if (a === document.body) break; continue; }
      const ar = a.getBoundingClientRect();
      const padL = parseFloat(acs.paddingLeft) || 0, padR = parseFloat(acs.paddingRight) || 0;
      if (r.right > ar.right - padR + 1 || r.left < ar.left + padL - 1)
        bad.push('clipped ' + name(e) + ' by ' + name(a));
      break;
    }
  }
  return bad.slice(0, 4);
};

(async () => {
  const server = serve();
  await new Promise(r => server.listen(0, r));
  const PORT = server.address().port;
  const BASE = `http://127.0.0.1:${PORT}/mini-tools/estimation-jar.html`;
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });

  const data = JSON.parse(fs.readFileSync(path.join(MINI, 'estimation-jar-sets.json'), 'utf8'));
  const freeSets = data.sets.filter(s => s.free);
  const lockedSets = data.sets.filter(s => !s.free);

  async function newPage(o) {
    o = o || {};
    const page = await browser.newPage();
    await page.setViewport({ width: o.w || 1024, height: o.h || 820 });
    await page.evaluateOnNewDocument((prem) => {
      try { if (sessionStorage.getItem('__ej_seeded')) return; sessionStorage.setItem('__ej_seeded', '1'); } catch (_) {}
      try { localStorage.clear(); } catch (_) {}
      if (prem) {
        try {
          localStorage.setItem('accessToken', 'harness-token');
          localStorage.setItem('lcs:estimation-jar:v1', JSON.stringify({ v: 1, ent: { tier: 'full', checkedAt: new Date().toISOString() } }));
        } catch (_) {}
      }
    }, !!o.premium);
    if (o.premium) {
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
  const ready = async (p) => { await p.waitForSelector('.ej-card', { timeout: 8000 }); await sleep(250); };
  const spy = (p) => p.evaluate(() => { window.__spoken = []; if (window.LCSAudio) { LCSAudio.speak = o => window.__spoken.push(o); LCSAudio.cancel = () => {}; } });
  const toStage = (p, i) => p.evaluate(j => document.querySelectorAll('.ej-stagebtn')[j].click(), i);
  async function shoot(p, n) { if (!SHOT) return; await p.evaluate(() => window.scrollTo(0, 0)); await sleep(120); await p.screenshot({ path: path.join(QA, n) }); }

  /* ---------- A ---------- */
  console.log('\nA — viewport sweep');
  for (const v of VIEWPORTS) {
    const p = await newPage({ w: v.w, h: v.h });
    await p.goto(BASE + '?lang=en', { waitUntil: 'domcontentloaded' }); await ready(p);
    const m = await p.evaluate((probe, vw) => {
      const small = [...document.querySelectorAll('button')].filter(b => {
        const r = b.getBoundingClientRect();
        return r.width > 0 && r.height > 0 && (r.width < 44 || r.height < 44);
      }).map(b => b.className + ':' + Math.round(b.getBoundingClientRect().height));
      return { wide: new Function('vw', 'return (' + probe + ')(vw)')(vw), small };
    }, WIDTH_PROBE.toString(), v.w);
    ok(`${v.w}px nothing clipped or off-screen`, m.wide.length === 0, m.wide.join(' | '));
    ok(`${v.w}px taps >=44px`, m.small.length === 0, m.small.slice(0, 3).join(', '));
    ok(`${v.w}px no console errors`, p._errs.length === 0, p._errs[0]);
    if ([360, 768, 1024].includes(v.w)) await shoot(p, `sweep-${v.w}.png`);
    await p.close();
  }

  /* ---------- A2 the 200-object worst case ---------- */
  console.log('\nA2 — a 200-object jar (the real worst case)');
  for (const v of VIEWPORTS) {
    const p = await newPage({ w: v.w, h: v.h, premium: true });
    await p.goto(`${BASE}?lang=en&set=${lockedSets[0].id}&count=200`, { waitUntil: 'domcontentloaded' });
    await ready(p); await sleep(400);
    await toStage(p, 2);                       /* straight to the reveal */
    /* the reveal is a 700ms-per-ten chant; 20 tens is 14s of waiting for a
       layout we can force. Paint every frame at once and measure THAT — the
       worst case is all 20 frames on screen, not the walk that gets there. */
    await p.evaluate(() => {
      const T = window.EstimationJar;
      T._revealShown = T.count;
      T._paintFrames(); T._paintDots();
    });
    await sleep(300);
    const m = await p.evaluate((probe, vw) => ({
      wide: new Function('vw', 'return (' + probe + ')(vw)')(vw),
      frames: document.querySelectorAll('.ej-tf').length,
      cells: document.querySelectorAll('.ej-tfcell.ej-filled').length
    }), WIDTH_PROBE.toString(), v.w);
    ok(`${v.w}px 200-jar: nothing clipped or off-screen`, m.wide.length === 0, m.wide.join(' | '));
    ok(`${v.w}px 200-jar: all 20 frames tile`, m.frames === 20, 'frames ' + m.frames);
    ok(`${v.w}px 200-jar: 200 objects shown`, m.cells === 200, 'cells ' + m.cells);
    if ([320, 1024].includes(v.w)) await shoot(p, `jar200-${v.w}.png`);
    await p.close();
  }

  /* ---------- B the ritual ---------- */
  console.log('\nB — fill -> guess -> reveal');
  {
    const p = await newPage({}); await p.goto(BASE + '?lang=en', { waitUntil: 'domcontentloaded' }); await ready(p);
    await spy(p);
    await toStage(p, 1);
    await sleep(300);
    ok('the line renders', !!(await p.$('.ej-track')));
    /* a tap must land on the value the child pointed at. The track carries a
       gutter, so this is measured against the CONTENT box — tapping the
       midpoint has to read exactly half the ceiling, or every dot is a lie. */
    const mid = await p.evaluate(() => {
      const t = document.querySelector('.ej-track'), cs = getComputedStyle(t), r = t.getBoundingClientRect();
      const pL = parseFloat(cs.paddingLeft), pR = parseFloat(cs.paddingRight);
      const x = r.left + pL + (r.width - pL - pR) / 2;
      t.dispatchEvent(new MouseEvent('click', { clientX: x, clientY: r.top + 40, bubbles: true }));
      return document.querySelector('.ej-pendpill').textContent;
    });
    ok('tapping the midpoint reads exactly half the line', mid === '15', 'read ' + mid);
    /* and the dot it drops must sit on that tick, not beside it */
    const align = await p.evaluate(() => {
      const d = document.querySelector('.ej-dot.ej-pending').getBoundingClientRect();
      const t = document.querySelector('.ej-track'), cs = getComputedStyle(t), r = t.getBoundingClientRect();
      const pL = parseFloat(cs.paddingLeft), pR = parseFloat(cs.paddingRight);
      return Math.abs((d.left + d.width / 2) - (r.left + pL + (r.width - pL - pR) / 2));
    });
    ok('the dot centre sits on the tick', align < 1.5, 'off by ' + align.toFixed(2) + 'px');
    await p.evaluate(() => { const T = window.EstimationJar; T.pending = null; T.render(); });
    await sleep(150);
    /* three children tap at different places */
    for (const frac of [0.2, 0.5, 0.8]) {
      await p.evaluate((f) => {
        const t = document.querySelector('.ej-track');
        const r = t.getBoundingClientRect();
        t.dispatchEvent(new MouseEvent('click', { clientX: r.left + r.width * f, clientY: r.top + 40, bubbles: true }));
      }, frac);
      await sleep(150);
      await p.evaluate(() => document.querySelector('.ej-go').click());
      await sleep(200);
    }
    const dots = await p.$$eval('.ej-dot', e => e.filter(x => !x.classList.contains('ej-pending')).length);
    ok('three anonymous dots committed', dots === 3, 'dots=' + dots);
    const anon = await p.evaluate(() => [...document.querySelectorAll('.ej-dot')].every(d => !d.textContent.trim()));
    ok('dots carry no label of any kind', anon);
    await shoot(p, 'guesses.png');
    /* READ the default rather than hard-coding it: this assertion used
       to carry a literal 12, so changing the default count turned a
       correct tool into a red gate. The count is the tool's to choose;
       what the gate owns is that the SAME number reaches the line. */
    const want = await p.evaluate(() => String(window.EstimationJar.count));
    await toStage(p, 2);
    /* ⚠ THE ANSWER MUST NOT ARRIVE BEFORE THE COUNT REACHES IT. The
       first build painted the truth as soon as the reveal face mounted,
       so it sat on the line while the room was still chanting up to it.
       Every assertion missed it, because they all sampled after the
       count had finished. Sample DURING. */
    await sleep(700);
    const midTruth = await p.evaluate(() => ({
      shown: window.EstimationJar._revealShown || 0,
      total: window.EstimationJar.count,
      truth: !!document.querySelector('.ej-truth')
    }));
    ok('the count is still running when we look', midTruth.shown < midTruth.total,
      'shown=' + midTruth.shown + '/' + midTruth.total);
    ok('the true count has NOT landed yet — the reveal is not spoiled', !midTruth.truth);
    /* the reveal is beat-driven now, so wait for it to SETTLE rather
       than for a fixed sleep that a longer count would outrun */
    await p.waitForFunction(() => !!document.querySelector('.ej-truth'), { timeout: 30000 });
    await sleep(600);
    const rev = await p.evaluate(() => ({
      frames: document.querySelectorAll('.ej-tf').length,
      truth: (document.querySelector('.ej-truth') || {}).textContent,
      tally: (document.querySelector('.ej-tally') || {}).textContent,
      rule: !!document.querySelector('.ej-truthrule'),
      closing: (document.querySelector('.ej-closing') || {}).textContent
    }));
    ok('ten-frames filled on reveal', rev.frames >= 1, 'frames ' + rev.frames);
    ok('the true count lands on the line', rev.truth === want, 'truth=' + rev.truth + ' want=' + want);
    ok('the truth is a RULE through the plot, not a pill beside it', rev.rule);
    /* the count must be legible with the sound off — six of eleven
       locales get no voice at all */
    ok('the running total is RENDERED, not only spoken', rev.tally === want, 'tally=' + rev.tally);
    ok('a closing line is spoken/shown', (rev.closing || '').length > 5, rev.closing);
    await shoot(p, 'reveal.png');
    await p.close();
  }

  /* ---------- C the numeral-leak gate ---------- */
  console.log('\nC — numeral leak (the true count must be unreachable pre-reveal)');
  {
    const p = await newPage({}); await p.goto(BASE + '?lang=en', { waitUntil: 'domcontentloaded' }); await ready(p);
    await toStage(p, 1);                       /* the GUESS stage — children are estimating */
    await sleep(300);
    const leak = await p.evaluate(() => {
      const bad = [];
      const texts = [document.title];
      const card = document.querySelector('.ej-card');
      texts.push(card ? card.innerText : '');
      card && card.querySelectorAll('[aria-label]').forEach(e => texts.push(e.getAttribute('aria-label')));
      const live = document.querySelector('.lcs-sr-only');
      texts.push(live ? live.textContent : '');
      for (const t of texts) if (/\b12\b/.test(t || '')) bad.push((t || '').slice(0, 70));
      return bad;
    });
    ok('true count absent from DOM/aria/title while estimating', leak.length === 0, leak.join(' | '));
    await p.close();
  }

  /* ---------- D no ranking ---------- */
  console.log('\nD — no ranking, ever');
  {
    const p = await newPage({}); await p.goto(BASE + '?lang=en', { waitUntil: 'domcontentloaded' }); await ready(p);
    await toStage(p, 1); await sleep(200);
    await p.evaluate(() => {
      const t = document.querySelector('.ej-track'); const r = t.getBoundingClientRect();
      t.dispatchEvent(new MouseEvent('click', { clientX: r.left + r.width * 0.4, clientY: r.top + 40, bubbles: true }));
    });
    await sleep(150);
    await p.evaluate(() => document.querySelector('.ej-go').click());
    await toStage(p, 2); await sleep(2200);
    const txt = await p.evaluate(() => document.body.textContent);
    ok('no closest/nearest/winner language', !/\b(closest|nearest|winner|wins|won|champion|best guess)\b/i.test(txt));
    const scan = await p.evaluate(() => {
      const alarm = [...document.querySelectorAll('*')].filter(e => {
        const m = /rgba?\((\d+),\s*(\d+),\s*(\d+)/.exec(getComputedStyle(e).backgroundColor);
        return m && +m[1] > 190 && +m[2] < 70 && +m[3] < 70;
      }).length;
      return { alarm, cross: /[✗✘❌×]/.test(document.body.textContent), prog: document.querySelectorAll('progress,[role="progressbar"]').length };
    });
    ok('no alarm-red surfaces', scan.alarm === 0, 'n=' + scan.alarm);
    ok('no cross marks', !scan.cross);
    ok('no progress bar', scan.prog === 0);
    await p.close();
  }

  /* ---------- E free vs premium ---------- */
  console.log('\nE — free vs premium');
  {
    const p = await newPage({}); await p.goto(BASE + '?lang=en', { waitUntil: 'domcontentloaded' }); await ready(p);
    await p.evaluate(() => document.querySelector('.ej-pill').click()); await sleep(300);
    const srcs = await p.$$eval('.ej-tilepic', e => e.map(x => x.getAttribute('src')));
    const leaked = lockedSets.filter(s => srcs.some(u => (u || '').includes('/' + s.imageFile + '@')));
    ok('premium fillings absent from the DOM', leaked.length === 0, leaked.map(s => s.id).join(','));
    ok('free fillings all present', srcs.length === freeSets.length, `${srcs.length} vs ${freeSets.length}`);
    await p.evaluate(() => document.querySelector('.ej-lockedrow').click()); await sleep(300);
    const g = await p.evaluate(() => { const a = document.querySelector('.ej-gate-cta'); return { open: !!document.querySelector('.ej-gate'), href: a && a.getAttribute('href'), t: a && a.target }; });
    ok('locked row opens the gate', g.open);
    ok('gate links to pricing with the tool source', /\/en\/pricing\?from=tool-estimation-jar/.test(g.href || ''), g.href);
    ok('gate escapes the iframe', g.t === '_top');
    await p.close();
  }

  /* ---------- F deep link ---------- */
  console.log('\nF — deep link');
  {
    const p = await newPage({});
    await p.goto(`${BASE}?lang=en&set=${lockedSets[0].id}&count=200`, { waitUntil: 'domcontentloaded' });
    await ready(p); await sleep(500);
    const srcs = await p.evaluate(() => [...document.querySelectorAll('img')].map(i => i.getAttribute('src') || ''));
    ok('free deep link does not load the premium filling',
      !srcs.some(u => u.includes('/' + lockedSets[0].imageFile + '@')));
    await p.close();

    /* The clamp needs a link the tool ACCEPTS. Probing it with a locked set
       proved nothing — the set is refused outright, so the count never
       reaches the clamp and the assertion passed for the wrong reason
       (the Syllable Splitter T8 shape). Use a FREE set + an oversized count. */
    const p2 = await newPage({});
    await p2.goto(`${BASE}?lang=en&set=${freeSets[1].id}&count=200`, { waitUntil: 'domcontentloaded' });
    await ready(p2); await sleep(500);
    const s2 = await p2.evaluate(() => [...document.querySelectorAll('img')].map(i => i.getAttribute('src') || ''));
    /* ⚠ This used to prove the link resolved by finding an <img> with
       the set's src. The pile is a CANVAS now — deliberately, so the
       count cannot be read out of the DOM — so that probe measured the
       absence of the old render path, not a broken link. Ask the model
       which set it actually loaded. */
    const loaded = await p2.evaluate(() => window.EstimationJar.setId);
    ok('a free deep link IS honoured (the clamp probe is live)',
      loaded === freeSets[1].id, 'setId=' + loaded);
    const shown = await p2.$eval('.ej-countval', e => parseInt(e.textContent, 10));
    ok('a premium-size count is clamped to the free ceiling', shown <= data.freeMax, 'count=' + shown);
    await p2.close();
  }

  /* ---------- G speech ---------- */
  console.log('\nG — speech');
  {
    const p = await newPage({}); await p.goto(BASE + '?lang=en', { waitUntil: 'domcontentloaded' }); await ready(p);
    await spy(p);
    await toStage(p, 2);
    /* ⚠ Wait for the reveal to SETTLE, not for a fixed sleep. The count
       is beat-driven now — a ten takes longer to say than a one — so a
       2400ms window captured "10, 20, 21" of a 23-jar and reported the
       tool as broken for finishing later than the gate expected. */
    await p.waitForFunction(() => !!document.querySelector('.ej-truth'), { timeout: 40000 });
    await sleep(400);
    const sp = await p.evaluate(() => window.__spoken || []);
    ok('the count is spoken', sp.length > 0, 'n=' + sp.length);
    ok('every speak call carries lang', sp.every(s => !!s.lang));
    ok('types are number|ui only', sp.every(s => ['number', 'ui'].includes(s.type)), JSON.stringify(sp.map(s => s.type)));
    const nums = sp.filter(s => s.type === 'number').map(s => s.text);
    ok('numbers are spoken as BARE numerals', nums.every(t => /^\d+$/.test(t)), nums.join(','));
    /* Below twenty the reveal counts by ONES on purpose (that is where
       a ten comes from), so the old "first number is 10" assertion was
       asserting the defect. What must hold is that the spoken sequence
       is the running total: it starts at its own first beat and ends on
       the count. */
    const jarN = await p.evaluate(() => window.EstimationJar.count);
    ok('the spoken sequence ends on the true count',
      nums.length > 0 && nums[nums.length - 1] === String(jarN), nums.slice(-3).join(','));
    ok('the spoken sequence is monotonic (a running total, not a group size)',
      nums.every((t, i) => i === 0 || Number(t) > Number(nums[i - 1])), nums.slice(0, 4).join(','));
    await p.close();
  }

  /* ---------- H reduced motion ---------- */
  console.log('\nH — reduced motion');
  {
    const p = await newPage({ reduced: true }); await p.goto(BASE + '?lang=en', { waitUntil: 'domcontentloaded' }); await ready(p);
    await toStage(p, 1); await sleep(200);
    await p.evaluate(() => {
      const t = document.querySelector('.ej-track'); const r = t.getBoundingClientRect();
      t.dispatchEvent(new MouseEvent('click', { clientX: r.left + r.width * 0.5, clientY: r.top + 40, bubbles: true }));
    });
    await sleep(200);
    const a = await p.evaluate(() => { const d = document.querySelector('.ej-dot.ej-pending'); return d ? getComputedStyle(d).animationName : 'none'; });
    ok('the pending dot does not bob under reduced motion', a === 'none', a);
    await p.close();
  }

  /* ---------- I print ---------- */
  console.log('\nI — print');
  {
    const p = await newPage({}); await p.goto(BASE + '?lang=en', { waitUntil: 'domcontentloaded' }); await ready(p);
    const css = await p.evaluate(() => document.getElementById('ej-style').textContent);
    ok('print stylesheet present', /@media print/.test(css));
    ok('card avoids page breaks', /page-break-inside:avoid/.test(css));
    await p.close();
  }

  await browser.close(); server.close();
  console.log(`\n${fail ? 'FAIL' : 'ALL GREEN'} — ${pass} passed, ${fail} failed`);
  if (fail) bad.forEach(b => console.log('  - ' + b));
  process.exit(fail ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
