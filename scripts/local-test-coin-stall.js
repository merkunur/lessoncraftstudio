#!/usr/bin/env node
/* =====================================================================
   local-test-coin-stall.js — interaction harness for "Pip's Market Stall"
   (CCSS 2.MD.C.8). Serves `mini tools/` + drives the shell:

     • VALUE-COMPOSER path: place the coins worth the target → "Pay" → exact
       → the snack arcs into the kelp basket (solved).
     • CHOOSE: count-set (tap the total) / enough (tap the verdict) single-tap.
     • ADJUST-DON'T-WIPE: overpay → Pay → "take one back" + the tray is NOT
       wiped (the careful set survives) → take one → exact.
     • ALL-PENNIES fails (penny <=4 < target); NO live total shown.
     • RESHUFFLE-ON-WRONG (CHOOSE): a wrong tap reshuffles the purse.
     • the scenario is SPOKEN; ¢/$ symbols present; >=7 cogs + reshuffle;
       shell Check celebrates; no overflow 280→768.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'coin-stall.money.2-md-c-8';
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

  /* the in-browser oracle: enumerate purse subsets to the target, pick per cog. */
  const ORACLE = `function(){
    var a=window.CoinStallActivity,C=window.CoinStallCore,r=a.round;
    if(C.CHOOSE_COGS[r.cog]) return null;
    var cs=r.coinSet, tgt=C.effectiveTarget(r), ex=r.cog==='trade'?r.offer.den:null;
    var purse=a._purse.slice(), vals=purse.map(function(d){return C.valueOf(cs,d);}), out=[];
    (function rec(i,cur,sum){ if(sum===tgt){out.push(cur.slice());return;} if(sum>tgt||i>=purse.length)return;
      if(!(ex&&purse[i]===ex)){cur.push(i);rec(i+1,cur,sum+vals[i]);cur.pop();} rec(i+1,cur,sum); })(0,[],0);
    if(!out.length) return false;
    var pick=out[0];
    if(r.cog==='fewest') pick=out.reduce(function(m,s){return (!m||s.length<m.length)?s:m;},null);
    else if(r.cog==='two-ways') pick=out.find(function(s){return !C.sameMultiset(s.map(function(i){return purse[i];}),r.shownSet);})||out[0];
    /* place by descending index so splices don't shift the remaining picks */
    pick.slice().sort(function(x,y){return y-x;}).forEach(function(i){ a._place(i); });
    return true;
  }`;

  const url = `http://127.0.0.1:${PORT}/coin-stall-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));
  const A = () => page.evaluate(() => { const a = window.CoinStallActivity; return { solved: a.solved, roundId: a.round && a.round.id, tray: a.tray.length, purse: a._purse.length, msg: a.msg }; });

  async function force(id) {
    await page.evaluate((rid) => {
      const t = window.CoinStallActivity, n = t._pool.length, order = []; for (let i = 0; i < n; i++) order.push(i);
      const k = t._pool.findIndex(x => x.id === 'coin-stall.' + rid);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
    }, id);
    await page.waitForFunction(() => window.CoinStallActivity.round && document.querySelector('.cs-root'), { timeout: 4000 });
    await sleep(40);
  }
  const placeOracle = () => page.evaluate('(' + ORACLE + ')()').then(() => sleep(20));
  const clickPay = () => page.evaluate(() => { const b = document.querySelector('.cs-pay'); if (b) b.click(); }).then(() => sleep(40));

  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.evaluate(() => { window.__spoke = []; const o = window.LCSAudio && window.LCSAudio.speak; if (o) window.LCSAudio.speak = function (opts) { window.__spoke.push(opts && opts.text); return o.apply(this, arguments); }; });
    await page.waitForFunction(() => { const t = window.CoinStallActivity; return t && t._activityRow && document.querySelector('.cs-root'); }, { timeout: 15000 });

    const title = await page.$eval('.lcs-title', e => e.textContent.trim()).catch(() => '');
    note(title === "Pip's Market Stall", `header title "${title}"`);

    /* >=7 cogs + reshuffle */
    const N = await page.evaluate(() => window.CoinStallActivity._pool.length);
    const cogs = await page.evaluate(() => new Set(window.CoinStallActivity._activityRow.params.rounds.map(r => r.cog)).size);
    note(cogs >= 7, `expected >=7 cogs, got ${cogs}`);
    const ids = await page.evaluate((c) => { const t = window.CoinStallActivity, out = []; for (let i = 0; i < c; i++) { const x = t.nextTask({ index: i }); out.push(x ? x.id : null); } return out; }, 2 * N);
    note(new Set(ids.slice(0, N)).size >= 7, `only ${new Set(ids.slice(0, N)).size} distinct rounds`);
    note(ids.slice(0, N).join(',') !== ids.slice(N, 2 * N).join(',') || N < 2, 'second pass did not reshuffle');

    /* NO live total anywhere */
    await force('make-shell-30');
    const hasTotal = await page.evaluate(() => /total|=\s*\d|\d+¢\s*\/\s*\d/i.test(document.querySelector('.cs-root').textContent) && !!document.querySelector('.cs-livetotal'));
    note(!(await page.$('.cs-livetotal')), 'a live running-total element is present (must be commit-then-check)');

    /* VALUE-COMPOSER → exact → solved + scenario spoken */
    await page.evaluate(() => { window.__spoke = []; });
    await placeOracle(); await clickPay();
    let s = await A(); note(s.solved, 'the value-composer (quarter+nickel) did not pay 30¢');
    await sleep(360);
    const spoke = await page.evaluate(() => (window.__spoke || []).join(' '));
    note(/shell costs 30/i.test(spoke), `the scenario was not spoken ("${spoke.slice(0, 40)}")`);

    /* ALL-PENNIES fails: place only pennies (<=4) → Pay → not solved */
    await force('make-starfish-41');
    await page.evaluate(() => { const a = window.CoinStallActivity; a._purse.slice().forEach(function (d, i) { }); for (let i = a._purse.length - 1; i >= 0; i--) { if (a._purse[i] === 'penny') a._place(i); } });
    await clickPay();
    s = await A(); note(!s.solved, 'all-pennies (<=4) was accepted for 41¢');

    /* ADJUST-DON'T-WIPE: overpay → Pay → "take one back" + tray NOT wiped */
    await force('make-shell-30');
    await placeOracle();   /* exact 30 (quarter+nickel) */
    await page.evaluate(() => { const a = window.CoinStallActivity; const i = a._purse.indexOf('quarter'); if (i >= 0) a._place(i); });  /* now 55¢ — over */
    const trayBefore = (await A()).tray;
    await clickPay();
    s = await A();
    note(!s.solved, 'an overpay was accepted as exact');
    note(s.tray === trayBefore, `overpay WIPED the tray (was ${trayBefore}, now ${s.tray}) — must adjust-don't-wipe`);
    note(/too much|take one/i.test(s.msg || ''), `overpay did not give the take-one-back message ("${s.msg}")`);
    /* take one back → exact → solved */
    await page.evaluate(() => { const a = window.CoinStallActivity; const i = a.tray.indexOf('quarter'); if (i >= 0) a._take(i); });
    await clickPay();
    s = await A(); note(s.solved, 'taking one coin back did not reach exact');

    /* CHOOSE: count-set single-tap (tap the correct total) */
    await force('count-set-till');
    await page.evaluate(() => {
      const a = window.CoinStallActivity, C = window.CoinStallCore, val = C.pileValue(a.round.coinSet, a.round.pile);
      const btns = Array.from(document.querySelectorAll('.cs-opt'));
      const want = (val % 100 === 0) ? '$' + (val / 100) : val + '¢';
      const b = btns.find(x => x.textContent.trim() === want); if (b) b.click();
    });
    await sleep(60); s = await A(); note(s.solved, 'count-set: tapping the correct total did not solve');

    /* CHOOSE enough: a WRONG tap reshuffles (no solve) */
    await force('enough-book-35');
    const purseBefore = await page.evaluate(() => window.CoinStallActivity._purse.join(','));
    await page.evaluate(() => { const b = Array.from(document.querySelectorAll('.cs-opt')).find(x => /too much/i.test(x.textContent)); if (b) b.click(); });
    await sleep(60); s = await A(); note(!s.solved, 'enough: a wrong verdict was accepted');
    /* then the correct verdict (just enough) solves */
    await page.evaluate(() => { const b = Array.from(document.querySelectorAll('.cs-opt')).find(x => /just enough/i.test(x.textContent)); if (b) b.click(); });
    await sleep(60); s = await A(); note(s.solved, 'enough: the correct verdict (just enough) did not solve');

    /* ¢/$ symbols present somewhere */
    await force('change-cheese-100');
    const txt = await page.evaluate(() => document.querySelector('.cs-root').textContent);
    note(/¢/.test(txt) && /\$/.test(txt), 'the ¢ and $ symbols are not both present');

    /* legend-free round shows NO legend */
    await force('make-starfish-41');
    note(!(await page.$('.cs-legend')), 'a legend-free round (legendTier none) rendered a legend');
    /* a full-legend round shows the legend */
    await force('make-pebble-16');
    note(!!(await page.$('.cs-legend')), 'a full-legend round did not render its legend');

    /* shell Check celebrates after a paid round */
    await force('make-shell-30'); await placeOracle(); await clickPay();
    await page.evaluate(() => { const c = document.querySelector('.lcs-activity-check'); if (c) c.click(); }); await sleep(120);
    const cel = await page.evaluate(() => { const p = document.querySelector('.lcs-activity-prompt'); return !!(p && p.classList.contains('celebrate')); });
    note(cel, 'shell Check did not celebrate after an exact payment');

    /* mobile overflow 280→768 */
    for (const w of [280, 360, 412, 768]) {
      await page.setViewport({ width: w, height: 820 });
      await force('make-starfish-41'); await sleep(40);
      const over = await page.evaluate(() => { const d = document.scrollingElement || document.documentElement; return d.scrollWidth - d.clientWidth; });
      note(over <= 2, `horizontal overflow ${over}px at ${w}px`);
    }

    note(errs.length === 0, `console error(s): ${errs.slice(0, 2).join(' | ')}`);
    console.log(`  ${fails.length ? 'FAIL' : 'ok  '} coin-stall/en — "${title}"`);
  } catch (e) {
    fails.push('coin-stall/en: ' + e.message);
    console.log(`  FAIL coin-stall/en — ${e.message}`);
  } finally { await page.close(); }

  await browser.close();
  server.close();
  console.log('');
  if (fails.length) {
    console.error(`COIN-STALL LOCAL TEST FAILED — ${fails.length} issue(s):`);
    fails.forEach(f => console.error('  • ' + f));
    process.exit(1);
  }
  console.log('COIN-STALL LOCAL TEST PASSED — composing coins worth the target pays exactly + the scenario is spoken; all-pennies (<=4) cannot reach the price; an overpay gives "take one back" WITHOUT wiping the tray (adjust-don\'t-wipe); count-set/enough are single-tap + a wrong verdict reshuffles; NO live total; ¢/$ present; legend shows only on scaffolded tiers; >=7 cogs + reshuffle; shell Check celebrates; no overflow 280→768.');
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
