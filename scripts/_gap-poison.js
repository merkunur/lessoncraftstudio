/* POISON: serve the PRE-FIX backup as `the-gap.js` and run the same
   consequence assertions. Every one of them must FAIL, or it was never
   capable of seeing the defect it claims to guard.
   ⚠ Nothing on disk is swapped — the request for the-gap.js is intercepted,
   so a concurrent agent editing `mini tools/` is unaffected. */
const http = require('http'), fs = require('fs'), path = require('path'), pup = require('puppeteer');
const ROOT = path.join(process.cwd(), 'mini tools');
const OLD = path.join(process.cwd(), 'scripts', '_gap-backup-the-gap.js.bak');
const MIME = { '.js': 'text/javascript', '.html': 'text/html', '.css': 'text/css', '.json': 'application/json' };

const srv = http.createServer((q, s) => {
  const url = q.url.split('?')[0].replace(/^\/mini-tools/, '');
  const f = /\/the-gap\.js$/.test(url) ? OLD : path.join(ROOT, url);
  fs.readFile(f, (e, d) => {
    if (e) { s.writeHead(404); s.end(); }
    else { s.writeHead(200, { 'Content-Type': MIME[path.extname(url)] || 'text/plain' }); s.end(d); }
  });
});

let survived = 0, killed = 0;
function poisoned(n, defectPresent, d) {
  if (defectPresent) { killed++; console.log('KILLED  ' + n + (d ? '  ' + d : '')); }
  else { survived++; console.log('SURVIVED ' + n + '  <-- the check cannot see this defect' + (d ? '  ' + d : '')); }
}

srv.listen(5903, async () => {
  const b = await pup.launch({ headless: 'new', args: ['--no-sandbox'] });
  const p = await b.newPage();
  await p.setViewport({ width: 768, height: 900 });
  await p.goto('http://localhost:5903/the-gap.html', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 700));

  const live = () => p.evaluate(() => [...document.querySelectorAll('[aria-live]')]
    .map(n => n.textContent.trim()).filter(Boolean).join(' | '));

  /* D1/D2 — the direction leaks at mount, and on a role-less div */
  const g = await p.evaluate(() => {
    const el = document.querySelector('.crt-ground');
    return { phase: window.TheGap.st.phase, label: el.getAttribute('aria-label'), role: el.getAttribute('role') };
  });
  poisoned('D1 direction leaks in phase before', g.phase === 'before' && !!g.label, JSON.stringify(g));
  poisoned('D2 named div carries no role', g.label && g.role === null);

  /* D10 — no CTA in the locked panel */
  const cta = await p.evaluate(() => document.querySelectorAll('.crt-gate-cta, a[href="/pricing"]').length);
  poisoned('D10 locked panel ships no CTA', cta === 0, 'ctas=' + cta);

  /* D8 — the sheet prints `m` in phase before */
  const r8 = await p.evaluate(() => {
    const T = window.TheGap; T.premium = true;
    T.st = T.newState('ten'); T._buildSheet();
    const bands = [...document.querySelectorAll('.crt-sh-band')].map(x => x.children.length);
    T.premium = false;
    return { phase: T.st.phase, bands: bands, n: T.st.n, m: T.st.m };
  });
  poisoned('D8 sheet prints the answer in phase before',
    r8.bands.length === 2 && r8.bands[1] === r8.m, JSON.stringify(r8));

  /* D6 — print is never gated */
  const printOff = await p.evaluate(() => {
    window.TheGap.st = window.TheGap.newState('ten'); window.TheGap.render();
    return document.querySelector('.crt-b-print').classList.contains('is-off');
  });
  poisoned('D6 print is not gated on entitlement', printOff === false, 'is-off=' + printOff);

  /* D3 — the paywall shakes RUN and speaks the wrong line */
  await p.click('.crt-b-print');
  await new Promise(r => setTimeout(r, 80));
  const r3 = await p.evaluate(() => ({
    printShake: document.querySelector('.crt-b-print').classList.contains('is-refuse'),
    runShake: document.querySelector('.crt-b-run').classList.contains('is-refuse')
  }));
  poisoned('D3 the paywall shakes RUN', r3.runShake && !r3.printShake, JSON.stringify(r3));
  poisoned('D3 the paywall speaks saidMidRun', /gap to lift/.test(await live()), await live());

  /* D9 — the rail offers a landing on 0 (measured on the model) */
  const r9 = await p.evaluate(() => {
    const T = window.TheGap; let zero = 0;
    for (const range of ['ten', 'sixteen']) {
      const cap = T.cap(range);
      for (const sc of T.scenes(cap)) {
        const st = { n: sc.n, k: sc.k, m: sc.m, phase: 'after', tried: null };
        for (const k of T.rail(st, range)) if (sc.n + k < 1) zero++;
      }
    }
    return zero;
  });
  poisoned('D9 rail offers landings on 0', r9 > 0, 'zero-landings=' + r9);

  /* D4/D5 — run the gap, then a refused try */
  await p.evaluate(() => { window.TheGap.st = window.TheGap.newState('ten'); window.TheGap.render(); });
  await p.click('.crt-b-run');
  await new Promise(r => setTimeout(r, 1500));
  const r4 = await p.evaluate(() => ({
    phase: window.TheGap.st.phase, disabled: document.querySelector('.crt-b-run').disabled
  }));
  poisoned('D4 run is not disabled in phase after', r4.phase === 'after' && r4.disabled === false, JSON.stringify(r4));

  await p.evaluate(() => { const n = [...document.querySelectorAll('[aria-live]')]; n.forEach(x => x.textContent = ''); });
  await p.click('.crt-k'); await new Promise(r => setTimeout(r, 150));
  await p.click('.crt-k'); await new Promise(r => setTimeout(r, 80));
  const r5 = await p.evaluate(() => ({
    railShake: document.querySelector('.crt-k').classList.contains('is-refuse'),
    runShake: document.querySelector('.crt-b-run').classList.contains('is-refuse')
  }));
  poisoned('D5 a refused try shakes RUN', r5.runShake && !r5.railShake, JSON.stringify(r5));
  poisoned('D5 a refused try announces nothing', (await live()) === '', JSON.stringify(await live()));

  /* D7 — a settings change mid-gap strands the apparatus */
  const r7 = await p.evaluate(async () => {
    const T = window.TheGap;
    T.st = T.newState('ten'); T.render();
    document.querySelector('.crt-b-run').click();
    await new Promise(r => setTimeout(r, 150));
    const mid = { phase: T.st.phase, busy: !!T._busy };
    T.onSettings();
    await new Promise(r => setTimeout(r, 1500));
    return { mid: mid, later: { phase: T.st.phase, busy: !!T._busy } };
  });
  poisoned('D7 settings mid-gap strands in phase gap',
    r7.mid.phase === 'gap' && r7.later.phase === 'gap', JSON.stringify(r7));

  await b.close(); srv.close();
  console.log('\n' + killed + ' killed, ' + survived + ' SURVIVED');
  process.exit(survived ? 1 : 0);
});
