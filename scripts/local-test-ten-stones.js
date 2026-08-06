#!/usr/bin/env node
/* =====================================================================
   local-test-ten-stones.js — interaction harness for "Lily's Ten Stones"
   (1.OA.C.6). Serves `mini tools/` + drives the shell:

     • MAKE-TEN ADD: declare the to-ten bond + HOP → land on the Ten Stone →
       declare the remainder + HOP → land on target → correct.
     • WRONG TO-TEN: a bond that misses 10 → rolled back, NOT on the stone, warm.
     • SUBTRACTION bridges DOWN (13−4 → 10 → 9).
     • SPIN-TO-TEN can't converge: HOPping wrong bonds never lands / never solves.
     • CHOOSE: find-where-ten (no-cross → 'no'), anchor (stand on the larger),
       near-double (the one-away double) — correct accepted, wrong not.
     • RELATION: affirm advances (non-scored).
     • >=7 cogs + reshuffle; no overflow 280→768.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'ten-stones.add-sub-within-20.1-oa-c-6';
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.svg': 'image/svg+xml', '.png': 'image/png' };

function serve() {
  return http.createServer((req, res) => {
    let p = decodeURIComponent(req.url.split('?')[0]), file;
    if (p === '/' || p.endsWith('.html')) file = path.join(MINI, path.basename(p) || 'x');
    else if (p.startsWith('/mini-tools/')) file = path.join(MINI, p.slice('/mini-tools/'.length));
    else file = path.join(MINI, p.replace(/^\//, ''));
    fs.readFile(file, (err, buf) => { if (err) { res.statusCode = 404; res.end('not found'); return; } res.setHeader('Content-Type', MIME[path.extname(file)] || 'application/octet-stream'); res.end(buf); });
  });
}

(async () => {
  const puppeteer = require('puppeteer');
  const server = serve();
  await new Promise(r => server.listen(0, '127.0.0.1', r));
  const PORT = server.address().port;
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const fails = [];
  const note = (cond, msg) => { if (!cond) fails.push(msg); };
  const page = await browser.newPage();
  await page.setViewport({ width: 412, height: 900 });
  const errs = [];
  const isNoise = (s) => /Failed to load resource|favicon|\/audio\/|speechSynthesis|not-allowed/i.test(s);
  page.on('console', m => { if (m.type() === 'error' && !isNoise(m.text())) errs.push(m.text()); });
  page.on('pageerror', e => { if (!isNoise(e.message)) errs.push(e.message); });

  const url = `http://127.0.0.1:${PORT}/ten-stones-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));
  const S = () => page.evaluate(() => { const a = window.TenStonesActivity; return { solved: a.solved, roundId: a.round && a.round.id, phase: a.phase, pos: a.pos, declared: a.declared.length, msg: a.msg }; });

  async function force(id) {
    await page.evaluate((rid) => {
      const t = window.TenStonesActivity, n = t._pool.length, order = []; for (let i = 0; i < n; i++) order.push(i);
      const k = t._pool.findIndex(x => x.id === 'ten-stones.' + rid);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
    }, id);
    await page.waitForFunction(() => window.TenStonesActivity.round && document.querySelector('.ts-root'), { timeout: 4000 });
    await sleep(40);
  }
  const hopWith = (v) => page.evaluate((n) => { const a = window.TenStonesActivity; a._setSpin(n); a._hop(); }, v).then(() => sleep(20));
  const choose = (o) => page.evaluate((c) => window.TenStonesActivity._choose(c), o).then(() => sleep(20));

  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.waitForFunction(() => { const t = window.TenStonesActivity; return t && t._activityRow && document.querySelector('.ts-root'); }, { timeout: 15000 });

    const title = await page.$eval('.lcs-title', e => e.textContent.trim()).catch(() => '');
    note(title === "Lily's Ten Stones", `header title "${title}"`);

    /* >=7 cogs + reshuffle */
    const N = await page.evaluate(() => window.TenStonesActivity._pool.length);
    const ids = await page.evaluate((c) => { const t = window.TenStonesActivity, out = []; for (let i = 0; i < c; i++) { const x = t.nextTask({ index: i }); out.push(x ? x.id : null); } return out; }, 2 * N);
    note(new Set(ids.slice(0, N)).size >= 7, `only ${new Set(ids.slice(0, N)).size} distinct rounds`);
    note(ids.slice(0, N).join(',') !== ids.slice(N, 2 * N).join(',') || N < 2, 'second pass did not reshuffle');

    /* MAKE-TEN ADD: 8+6 → to-ten 2, land on 10, remainder 4, land on 14 */
    await force('maketen-8-6');
    await hopWith(2); let s = await S();
    note(s.phase === 'remainder' && s.pos === 10, `make-ten: after to-ten hop, phase=${s.phase} pos=${s.pos} (want remainder@10)`);
    await hopWith(4); s = await S();
    note(s.solved && s.pos === 14, `make-ten: did not land on 14 (solved=${s.solved} pos=${s.pos})`);

    /* WRONG TO-TEN: a bond that misses 10 → rolled back, not on the stone */
    await force('maketen-8-6');
    await hopWith(5); s = await S();
    note(!s.solved && s.pos === 8 && s.declared === 0 && /ten|stone/i.test(s.msg || ''), `wrong-to-ten: not rolled back (pos=${s.pos} declared=${s.declared} msg="${s.msg}")`);

    /* SPIN-TO-TEN can't converge: several wrong hops, never solved / never advances */
    await force('maketen-7-5');
    await hopWith(1); await hopWith(6); await hopWith(9); s = await S();
    note(!s.solved && s.phase === 'toten' && s.pos === 7, `spin-to-ten converged (solved=${s.solved} phase=${s.phase} pos=${s.pos}) — should not without the real bond`);
    /* the real bond completes it */
    await hopWith(3); await hopWith(2); s = await S();
    note(s.solved && s.pos === 12, `make-ten 7+5 did not complete after the right bonds (solved=${s.solved} pos=${s.pos})`);

    /* SUBTRACTION bridges DOWN: 13−4 → to-ten 3 → 10 → remainder 1 → 9 */
    await force('decompose-13-4');
    await hopWith(3); s = await S();
    note(s.phase === 'remainder' && s.pos === 10, `subtraction: after to-ten, phase=${s.phase} pos=${s.pos}`);
    await hopWith(1); s = await S();
    note(s.solved && s.pos === 9, `subtraction 13−4 did not land on 9 (solved=${s.solved} pos=${s.pos})`);

    /* CHOOSE: find-where-ten (6+3 → no), anchor (3+8 → 8), equiv (7+8 → 7) */
    await force('findten-6-3'); await choose('no'); s = await S();
    note(s.solved, 'findten 6+3: "no" (no crossing) was not accepted');
    await force('findten-6-3'); await choose('yes'); s = await S();
    note(!s.solved, 'findten 6+3: "yes" was wrongly accepted');
    await force('anchor-3-8'); await choose(8); s = await S();
    note(s.solved, 'anchor 3+8: standing on 8 was not accepted');
    await force('anchor-3-8'); await choose(3); s = await S();
    note(!s.solved, 'anchor 3+8: standing on 3 was wrongly accepted');
    await force('equiv-7-8'); await choose(7); s = await S();
    note(s.solved, 'equiv 7+8: the 7+7 near-double was not accepted');
    await force('equiv-7-8'); await choose(5); s = await S();
    note(!s.solved, 'equiv 7+8: 5+5 (not a near-double) was wrongly accepted');

    /* RELATION (non-scored): affirm advances */
    await force('relation-8-6');
    await page.evaluate(() => window.TenStonesActivity._affirm()); s = await S();
    note(s.solved, 'relation: the affirm did not advance');

    /* shell Check celebrates after a completed bridge */
    await force('maketen-9-4'); await hopWith(1); await hopWith(3);
    await page.evaluate(() => { const c = document.querySelector('.lcs-activity-check'); if (c) c.click(); }); await sleep(120);
    const cel = await page.evaluate(() => { const p = document.querySelector('.lcs-activity-prompt'); return !!(p && p.classList.contains('celebrate')); });
    note(cel, 'shell Check did not celebrate after a bridge');

    /* mobile overflow 280→768 */
    for (const w of [280, 360, 412, 768]) {
      await page.setViewport({ width: w, height: 820 });
      await force('decompose-15-7'); await sleep(40);
      const over = await page.evaluate(() => { const d = document.scrollingElement || document.documentElement; return d.scrollWidth - d.clientWidth; });
      note(over <= 2, `horizontal overflow ${over}px at ${w}px`);
    }

    note(errs.length === 0, `console error(s): ${errs.slice(0, 2).join(' | ')}`);
    console.log(`  ${fails.length ? 'FAIL' : 'ok  '} ten-stones/en — "${title}"`);
  } catch (e) {
    fails.push('ten-stones/en: ' + e.message);
    console.log(`  FAIL ten-stones/en — ${e.message}`);
  } finally { await page.close(); }

  await browser.close();
  server.close();
  console.log('');
  if (fails.length) {
    console.error(`TEN-STONES LOCAL TEST FAILED — ${fails.length} issue(s):`);
    fails.forEach(f => console.error('  • ' + f));
    process.exit(1);
  }
  console.log('TEN-STONES LOCAL TEST PASSED — declaring the to-ten bond + HOP lands on the Ten Stone, then the remainder + HOP lands on target (correct); a bond that misses ten rolls back (no land, warm, not red); spin-to-ten cannot converge without the real bonds; subtraction bridges DOWN; find-where-ten + anchor + near-double choices grade right/wrong; the relation reveal advances; shell Check celebrates; >=7 cogs + reshuffle; no overflow 280→768.');
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
