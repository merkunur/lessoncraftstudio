#!/usr/bin/env node
/* =====================================================================
   local-test-nila-pond.js — interaction harness for "Nila's Idea Pond"
   (CCSS RI.K.2). Serves `mini tools/` + drives the shell:

     • READ-ALOUD: the paragraph sentences are spoken + the current
       sentence is highlighted (.np-on).
     • COMMIT-BEFORE-REVEAL: before the commit there is NO gold / NO
       umbrella; netting a fish shows no answer; the umbrella appears only
       on a CORRECT commit.
     • CORRECT NET: netting the authored topic + commit → reveal (school /
       supply / done by cog).
     • WRONG COMMIT REGENERATES (non-stationary): netting a NON-topic +
       commit → no reveal, the board's PARAGRAPH+TOPIC changes (a swap-group
       sibling) so guess-and-commit can't out-pace comprehension.
     • SCHOOL: nest the true details + send the NON-BELONGER to the pond →
       done; a non-belonger dropped on a slot WRIGGLES (cannot nest).
     • SUPPLY: pick the in-text new fish → done; the absent one wriggles.
     • >=7 rounds + 4 cogs + reshuffle; the shell Check celebrates on done;
       no overflow 280→768.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'nila-pond.main-idea-net.ri-k-2';
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png' };

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

  const url = `http://127.0.0.1:${PORT}/nila-pond-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));
  const A = () => page.evaluate(() => {
    const a = window.NilaPondActivity;
    return { stage: a.stage, solved: a.solved, roundId: a.round && a.round.id, topicId: a.round && a.round.topicId, cog: a.round && a.round.cog };
  });
  const hasGold = () => page.evaluate(() => !!document.querySelector('.np-gold') || !!document.querySelector('.np-umb'));

  async function force(id) {
    await page.evaluate((rid) => {
      const t = window.NilaPondActivity, n = t._pool.length, order = []; for (let i = 0; i < n; i++) order.push(i);
      const k = t._pool.findIndex(x => x.id === 'nila-pond.' + rid);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
    }, id);
    await page.waitForFunction(() => window.NilaPondActivity.round && document.querySelector('.np-root .np-fishpond'), { timeout: 4000 });
    await sleep(30);
  }
  const clickFish = (id) => page.evaluate((i) => { const b = document.querySelector('.np-fish[data-id="' + i + '"]'); if (b) b.click(); }, id).then(() => sleep(20));
  const clickCommit = () => page.evaluate(() => { const b = document.querySelector('.np-commit'); if (b && !b.disabled) b.click(); }).then(() => sleep(40));
  const clickDetail = (id) => page.evaluate((i) => { const b = document.querySelector('.np-detail[data-id="' + i + '"]'); if (b) b.click(); }, id).then(() => sleep(20));
  const clickSlot = (i) => page.evaluate((s) => { const b = document.querySelector('.np-slot[data-slot="' + s + '"]'); if (b) b.click(); }, i).then(() => sleep(20));
  const clickPond = () => page.evaluate(() => { const b = document.querySelector('.np-pond'); if (b) b.click(); }).then(() => sleep(20));
  const nonBelonger = () => page.evaluate(() => window.MainIdeaCore.nonBelongerId(window.NilaPondActivity.round));
  const belongIds = () => page.evaluate(() => (window.NilaPondActivity.round.details || []).filter(d => d.belongs).map(d => d.id));
  const supplyIn = () => page.evaluate(() => (window.NilaPondActivity.round.altDetails || []).find(d => d.belongs).id);
  const supplyOut = () => page.evaluate(() => (window.NilaPondActivity.round.altDetails || []).find(d => !d.belongs).id);

  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.evaluate(() => { window.__spoke = []; const o = window.LCSAudio && window.LCSAudio.speak; if (o) window.LCSAudio.speak = function (opts) { window.__spoke.push(opts && opts.text); return o.apply(this, arguments); }; });
    await page.waitForFunction(() => { const t = window.NilaPondActivity; return t && t._activityRow && document.querySelector('.np-root'); }, { timeout: 15000 });

    const title = await page.$eval('.lcs-title', e => e.textContent.trim()).catch(() => '');
    note(title === "Nila's Idea Pond", `header title "${title}"`);

    /* ≥7 rounds + 4 cogs + reshuffle */
    const N = await page.evaluate(() => window.NilaPondActivity._pool.length);
    note(N >= 7, `pool has ${N} rounds (<7)`);
    const ids = await page.evaluate((c) => { const t = window.NilaPondActivity, out = []; for (let i = 0; i < c; i++) { const x = t.nextTask({ index: i }); out.push(x ? x.id : null); } return out; }, 2 * N);
    note(new Set(ids.slice(0, N)).size >= 7, `only ${new Set(ids.slice(0, N)).size} distinct rounds (<7)`);
    note(ids.slice(0, N).join(',') !== ids.slice(N, 2 * N).join(',') || N < 2, 'second pass did not reshuffle');
    const cogs = await page.evaluate(() => new Set(window.NilaPondActivity._activityRow.params.rounds.map(r => r.cog)).size);
    note(cogs === 4, `expected 4 cogs, got ${cogs}`);

    /* READ-ALOUD: a sentence is spoken + highlighted */
    await force('bear-warm');
    await page.evaluate(() => { window.__spoke = []; window.NilaPondActivity._readStory(); });
    await sleep(120);
    const onHi = await page.evaluate(() => !!document.querySelector('.np-sent.np-on'));
    note(onHi, 'no sentence is highlighted during read-aloud');
    const spoke1 = await page.evaluate(() => (window.__spoke || []).join(' '));
    note(/snow/i.test(spoke1) || /bear/i.test(spoke1), `the paragraph was not spoken ("${spoke1.slice(0, 40)}")`);

    /* COMMIT-BEFORE-REVEAL: net the topic, but no gold/umbrella until commit */
    await force('bear-warm');   /* topic bp1, nest-reject */
    let s = await A(); const topic = s.topicId;
    await clickFish(topic);
    note(!(await hasGold()), 'gold/umbrella appeared BEFORE the commit (no commit-before-reveal)');
    note((await A()).stage === 'hear', 'netting a fish changed the stage before commit');

    /* CORRECT commit → school stage + the umbrella reveals */
    await clickCommit();
    s = await A(); note(s.stage === 'school', `correct commit did not open the school stage (stage=${s.stage})`);
    note(await hasGold(), 'no umbrella/gold after a correct commit');

    /* SCHOOL: nest the 2 belongs + release the non-belonger → done */
    const bel = await belongIds(); const nb = await nonBelonger();
    /* a non-belonger dropped on a slot must WRIGGLE (not nest) */
    await clickDetail(nb); await clickSlot(0);
    s = await page.evaluate(() => window.NilaPondActivity._slots.slice());
    note(s.every(x => x !== nb), 'the non-belonger was nested into a slot (must wriggle free)');
    /* nest both true details */
    await clickDetail(bel[0]); await clickSlot(0);
    await clickDetail(bel[1]); await clickSlot(1);
    /* release the non-belonger to the pond */
    await clickDetail(nb); await clickPond();
    s = await A(); note(s.stage === 'done', `school did not complete to done (stage=${s.stage})`);
    note(s.solved === true, 'solved flag not set after a complete school');

    /* shell Check celebrates on done */
    await page.evaluate(() => { const c = document.querySelector('.lcs-activity-check'); if (c) c.click(); }); await sleep(120);
    const cel = await page.evaluate(() => { const p = document.querySelector('.lcs-activity-prompt'); return !!(p && p.classList.contains('celebrate')); });
    note(cel, 'shell Check did not celebrate after a complete round');

    /* WRONG COMMIT REGENERATES (non-stationary) */
    await force('bear-eat');   /* topic bp2, pick-topic */
    s = await A(); const t2 = s.topicId; const before = s.roundId;
    const wrongId = await page.evaluate((tp) => window.NilaPondActivity._fishOrder.find(id => id !== tp), t2);
    await clickFish(wrongId); await clickCommit();
    s = await A();
    note(s.stage === 'hear', `wrong commit revealed instead of staying in hear (stage=${s.stage})`);
    note(!(await hasGold()), 'wrong commit showed gold/umbrella (must not reveal)');
    note(s.roundId !== before, `wrong commit did NOT regenerate the board (still ${s.roundId}) — brute-force survives`);
    note(s.cog !== undefined, 'regenerated round missing');

    /* CORRECT pick-topic → straight to done */
    await force('bear-eat'); s = await A();
    await clickFish(s.topicId); await clickCommit();
    s = await A(); note(s.stage === 'done', `pick-topic correct commit did not finish (stage=${s.stage})`);

    /* SUPPLY-DETAIL: net topic → pick the in-text new fish → done */
    await force('duck-nest'); s = await A();
    await clickFish(s.topicId); await clickCommit();
    s = await A(); note(s.stage === 'supply', `supply-detail did not open the supply stage (stage=${s.stage})`);
    const sOut = await supplyOut();
    await clickDetail(sOut);
    note((await A()).stage === 'supply', 'picking the ABSENT supply fish finished the round (must wriggle)');
    const sIn = await supplyIn();
    await clickDetail(sIn);
    note((await A()).stage === 'done', 'picking the in-text supply fish did not finish');

    /* mobile overflow 280→768 (school stage is the worst case) */
    for (const w of [280, 360, 412, 768]) {
      await page.setViewport({ width: w, height: 820 });
      await force('bee-wings'); s = await A();   /* nest-reject */
      await clickFish(s.topicId); await clickCommit(); await sleep(40);
      const over = await page.evaluate(() => { const d = document.scrollingElement || document.documentElement; return d.scrollWidth - d.clientWidth; });
      note(over <= 2, `horizontal overflow ${over}px at ${w}px`);
    }

    note(errs.length === 0, `console error(s): ${errs.slice(0, 2).join(' | ')}`);
    console.log(`  ${fails.length ? 'FAIL' : 'ok  '} nila-pond/en — "${title}"`);
  } catch (e) {
    fails.push('nila-pond/en: ' + e.message);
    console.log(`  FAIL nila-pond/en — ${e.message}`);
  } finally { await page.close(); }

  await browser.close();
  server.close();
  console.log('');
  if (fails.length) {
    console.error(`NILA-POND LOCAL TEST FAILED — ${fails.length} issue(s):`);
    fails.forEach(f => console.error('  • ' + f));
    process.exit(1);
  }
  console.log('NILA-POND LOCAL TEST PASSED — paragraph reads aloud + sentence-highlights; commit-before-reveal (no gold until a correct commit); netting the authored topic + commit reveals the umbrella; a wrong commit does NOT reveal and REGENERATES a swap-group sibling (non-stationary); school nests the true details + releases the non-belonger (a non-belonger cannot nest) → done; supply-detail picks the in-text fish; >=7 rounds + 4 cogs + reshuffle; shell Check celebrates; no overflow 280→768.');
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
