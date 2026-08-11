/* Drive the real controls and assert what each one CHANGES — the ten
   defects were all consequence defects, and a source-shape check cannot
   see any of them.  Serves `mini tools/` exactly as _gap-mount.js does. */
const http = require('http'), fs = require('fs'), path = require('path'), pup = require('puppeteer');
const ROOT = path.join(process.cwd(), 'mini tools');
const MIME = { '.js': 'text/javascript', '.html': 'text/html', '.css': 'text/css', '.json': 'application/json' };
const srv = http.createServer((q, s) => {
  let f = path.join(ROOT, q.url.split('?')[0].replace(/^\/mini-tools/, ''));
  fs.readFile(f, (e, d) => {
    if (e) { s.writeHead(404); s.end(); }
    else { s.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'text/plain' }); s.end(d); }
  });
});

let fails = 0;
function ok(n, c, d) { if (!c) { fails++; console.log('FAIL ' + n + (d ? '  ' + d : '')); } else console.log('ok   ' + n + (d ? '  ' + d : '')); }

srv.listen(5902, async () => {
  const b = await pup.launch({ headless: 'new', args: ['--no-sandbox'] });
  const p = await b.newPage();
  await p.setViewport({ width: 768, height: 900 });
  const errs = [];
  p.on('pageerror', e => errs.push(String(e)));
  await p.goto('http://localhost:5902/the-gap.html', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 700));

  const live = () => p.evaluate(() => {
    const ns = [...document.querySelectorAll('[aria-live]')];
    return ns.map(n => n.textContent.trim()).filter(Boolean).join(' | ');
  });

  /* ---- D1 / D2 : the direction must NOT be exposed in phase `before` -- */
  let g = await p.evaluate(() => {
    const el = document.querySelector('.crt-ground');
    return { phase: window.TheGap.st.phase, label: el.getAttribute('aria-label'),
             role: el.getAttribute('role'), hidden: el.getAttribute('aria-hidden') };
  });
  ok('D1 no direction at mount', g.phase === 'before' && g.label === null, JSON.stringify(g));
  ok('D2 no orphan role at mount', g.role === null && g.hidden === 'true');

  /* ---- run the gap and re-read ---------------------------------------- */
  await p.click('.crt-b-run');
  await new Promise(r => setTimeout(r, 200));
  g = await p.evaluate(() => {
    const el = document.querySelector('.crt-ground');
    return { phase: window.TheGap.st.phase, marks: document.querySelectorAll('.crt-mark').length,
             label: el.getAttribute('aria-label'), role: el.getAttribute('role') };
  });
  ok('gap builds zero marks', g.phase === 'gap' && g.marks === 0, JSON.stringify(g));
  ok('D1 direction appears from the gap onward', !!g.label);
  ok('D2 carried by a nameable role', g.role === 'img');

  await new Promise(r => setTimeout(r, 1400));
  g = await p.evaluate(() => ({
    phase: window.TheGap.st.phase,
    runOff: document.querySelector('.crt-b-run').classList.contains('is-off'),
    runDisabled: document.querySelector('.crt-b-run').disabled,
    rail: document.querySelectorAll('.crt-k').length,
    nums: document.querySelectorAll('.crt-num').length
  }));
  ok('the gap lifts', g.phase === 'after', JSON.stringify(g));
  /* ---- D4 : run is genuinely refused in `after`, so it is disabled ----- */
  ok('D4 run disabled in phase after', g.runOff && g.runDisabled);

  /* a disabled control must not announce a lie */
  const before = await live();
  await p.evaluate(() => document.querySelector('.crt-b-run').click());
  await new Promise(r => setTimeout(r, 120));
  ok('D4 no false "wait for the gap to lift" in after', (await live()) === before);

  /* ---- D5 : a refused try shakes the RAIL key and says its own line ---- */
  await p.click('.crt-k');
  await new Promise(r => setTimeout(r, 150));
  await p.click('.crt-k');            /* same key again -> tryK returns null */
  await new Promise(r => setTimeout(r, 60));
  const r5 = await p.evaluate(() => ({
    railShake: document.querySelector('.crt-k').classList.contains('is-refuse'),
    runShake: document.querySelector('.crt-b-run').classList.contains('is-refuse')
  }));
  ok('D5 the shake lands on the rail key', r5.railShake && !r5.runShake, JSON.stringify(r5));
  ok('D5 a refused try announces something', /past what it can hold/.test(await live()), await live());

  /* ---- D6 / D3 : print refused for a free user, on its own button ------ */
  const r6a = await p.evaluate(() => ({
    premium: window.TheGap.premium,
    printOff: document.querySelector('.crt-b-print').classList.contains('is-off')
  }));
  ok('D6 print is drawn off for a free user', r6a.premium === false && r6a.printOff, JSON.stringify(r6a));
  await p.click('.crt-b-print');
  await new Promise(r => setTimeout(r, 60));
  const r6b = await p.evaluate(() => ({
    printShake: document.querySelector('.crt-b-print').classList.contains('is-refuse'),
    runShake: document.querySelector('.crt-b-run').classList.contains('is-refuse')
  }));
  ok('D3 the shake lands on print, not run', r6b.printShake && !r6b.runShake, JSON.stringify(r6b));
  ok('D3 the paywall speaks for itself', /Teacher plan/.test(await live()), await live());

  /* ---- D8 : the sheet may not carry `m` outside phase `after` ---------- */
  const r8 = await p.evaluate(() => {
    const T = window.TheGap;
    T.premium = true;
    const out = {};
    T.st = T.newState('ten');                       /* phase `before` */
    T._buildSheet();
    out.beforeBands = document.querySelectorAll('.crt-sh-band').length;
    out.beforeMarks = [...document.querySelectorAll('.crt-sh-band')].map(x => x.children.length);
    out.n = T.st.n; out.m = T.st.m;
    T.st = T.advance(null); T._buildSheet();        /* phase `gap` */
    out.gapBands = document.querySelectorAll('.crt-sh-band').length;
    T.st = T.advance(null); T._buildSheet();        /* phase `after` */
    out.afterBands = document.querySelectorAll('.crt-sh-band').length;
    out.afterMarks = [...document.querySelectorAll('.crt-sh-band')].map(x => x.children.length);
    T.premium = false;
    return out;
  });
  ok('D8 sheet in `before` carries ONE band', r8.beforeBands === 1, JSON.stringify(r8));
  ok('D8 that band is `n`, never `m`', r8.beforeMarks[0] === r8.n);
  ok('D8 sheet during the gap carries ONE band', r8.gapBands === 1);
  ok('D8 sheet in `after` carries the pair', r8.afterBands === 2 && r8.afterMarks[1] === r8.m);
  /* CONTROL: the check can distinguish — n and m must actually differ */
  ok('D8 control (n !== m, so a leak would be visible)', r8.n !== r8.m, 'n=' + r8.n + ' m=' + r8.m);

  /* ---- D7 : a settings change mid-gap must not strand the apparatus ---- */
  const r7 = await p.evaluate(async () => {
    const T = window.TheGap;
    /* ⚠ PROBE FIX: the D8 block leaves the state in phase `after`, where
       run is legitimately disabled — the first version of this check read
       "not in flight" as a tool defect when it was the harness starting
       from the wrong state. Deal a fresh scene first. */
    T.reset();
    document.querySelector('.crt-b-run').click();       /* run in flight */
    await new Promise(r => setTimeout(r, 150));
    const mid = { phase: T.st.phase, busy: !!T._busy };
    T.onSettings();                                     /* the shell path */
    const just = { phase: T.st.phase, busy: !!T._busy };
    await new Promise(r => setTimeout(r, 1500));        /* past both timers */
    return { mid, just, later: { phase: T.st.phase, busy: !!T._busy },
             wave: document.querySelector('.crt-wave').classList.contains('is-on') };
  });
  ok('D7 the run was really in flight', r7.mid.phase === 'gap' && r7.mid.busy, JSON.stringify(r7.mid));
  ok('D7 settings clears busy and the gap', r7.just.phase === 'before' && r7.just.busy === false, JSON.stringify(r7.just));
  ok('D7 no stale timer advances the new scene', r7.later.phase === 'before', JSON.stringify(r7.later));
  ok('D7 the pulse is not left running', r7.wave === false);

  /* the apparatus still works after the interrupted run */
  await p.evaluate(() => document.querySelector('.crt-b-run').click());
  await new Promise(r => setTimeout(r, 1600));
  const r7b = await p.evaluate(() => ({ phase: window.TheGap.st.phase, rail: document.querySelectorAll('.crt-k').length }));
  ok('D7 the next run still shows a gap and lifts', r7b.phase === 'after' && r7b.rail > 0, JSON.stringify(r7b));

  /* ---- D10 : the locked panel offers a way out ------------------------- */
  const r10 = await p.evaluate(() => {
    const a = document.querySelector('.crt-gate-cta'), x = document.querySelector('.crt-gate-x');
    const on = document.querySelector('.crt-gate').classList.contains('is-on');
    const r = { on: on, href: a && a.getAttribute('href'), cta: a && a.textContent,
                close: x && x.textContent, ctaH: a && a.getBoundingClientRect().height };
    if (x) x.click();
    r.afterClose = document.querySelector('.crt-gate').classList.contains('is-on');
    return r;
  });
  ok('D10 the locked panel shows a CTA', r10.on && r10.href === '/pricing' && !!r10.cta, JSON.stringify(r10));
  ok('D10 the CTA is a real tap target', r10.ctaH >= 44, 'height=' + r10.ctaH);
  ok('D10 the dismiss works', r10.afterClose === false);

  ok('no page errors', errs.length === 0, errs.join(' | '));

  await p.screenshot({ path: 'docs/audit-results/the-gap-consequence.png', fullPage: true });
  await b.close(); srv.close();
  console.log('\n' + (fails ? fails + ' FAILED' : 'all consequence checks passed'));
  process.exit(fails ? 1 : 0);
});
