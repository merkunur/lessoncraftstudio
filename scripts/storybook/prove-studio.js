#!/usr/bin/env node
/* =====================================================================
   prove-studio.js — the Storybook Studio milestone proofs (puppeteer,
   REAL UI events against the real studio-server).

   Stages (cumulative; --stage=m2 runs m1+m2):
     m1  read-only fidelity: rail thumbs + pip rendered at the du-exact
         position on pips-picnic p02
     m2  manipulation + persistence: drag pip by a known delta → saved doc
         changes by exactly that (snapped) delta; .bak written; undo
         restores; stale-etag POST → 409
     m4  mechanic forms: fresh page + pick Listen via the picker → form
         renders; defaults valid-shaped
     m5  the coordinate invariant: place a find-object target, move the
         ZONE, assert the stored zone-relative rect re-encoded so the
         ABSOLUTE position is unchanged
   USAGE: node scripts/storybook/prove-studio.js [--stage=m5]
   ===================================================================== */
'use strict';
const path = require('path');
const fs = require('fs');
const puppeteer = require('puppeteer');
const { srv } = require('./studio-server.js');

const REPO = path.join(__dirname, '..', '..');
const STORIES = path.join(REPO, 'mini tools', 'stories');
const STAGE = (process.argv.find(a => a.startsWith('--stage=')) || '--stage=m2').split('=')[1];
const ORDER = ['m1', 'm2', 'm4', 'm5'];
const upTo = ORDER.indexOf(STAGE);

const fails = [];
function assert(ok, msg) {
  console.log((ok ? '  PASS  ' : '  FAIL  ') + msg);
  if (!ok) fails.push(msg);
}

(async () => {
  await new Promise(r => srv.listen(0, '127.0.0.1', r));
  const port = srv.address().port;
  const base = 'http://127.0.0.1:' + port;
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  page.on('pageerror', e => fails.push('pageerror: ' + String(e).slice(0, 160)));
  await page.setViewport({ width: 1600, height: 1000 });

  /* work on a scratch COPY so the real pips-picnic is never mutated */
  const SCRATCH = 'studio-proof';
  fs.rmSync(path.join(STORIES, SCRATCH), { recursive: true, force: true });
  fs.mkdirSync(path.join(STORIES, SCRATCH), { recursive: true });
  for (const f of ['story.json', 'strings.json']) {
    const doc = fs.readFileSync(path.join(STORIES, 'pips-picnic', f), 'utf8');
    fs.writeFileSync(path.join(STORIES, SCRATCH, f), doc.replace(/pips-picnic(?!\/)/g, SCRATCH));
  }
  /* fix asset srcs back to pips-picnic (they live there) */
  const sj = JSON.parse(fs.readFileSync(path.join(STORIES, SCRATCH, 'story.json'), 'utf8'));
  sj.id = SCRATCH;
  for (const k in sj.assets) {
    sj.assets[k].src = sj.assets[k].src.replace('/stories/' + SCRATCH + '/', '/stories/pips-picnic/');
  }
  sj.reward.id = 'story.' + SCRATCH;
  fs.writeFileSync(path.join(STORIES, SCRATCH, 'story.json'), JSON.stringify(sj, null, 2));

  await page.goto(base + '/mini-tools/storybook-studio.html?story=' + SCRATCH, { waitUntil: 'domcontentloaded' });
  await page.waitForFunction('window.Studio && Studio.state.doc !== null', { timeout: 15000 });
  await page.waitForSelector('.stu-stage .stu-char img', { timeout: 15000 });

  /* ---------------- M1 ---------------- */
  {
    const thumbs = await page.$$eval('#stu-rail .stu-thumb:not(.stu-thumb-add)', els => els.length);
    assert(thumbs === 5, 'm1: rail shows 5 page thumbs (got ' + thumbs + ')');

    /* go to page 2, check pip's rendered du position vs the document */
    await page.evaluate(() => { Studio.state.pageIndex = 1; StudioCanvas.select(null); });
    await page.waitForFunction(
      "document.querySelectorAll('.stu-stage .stu-char').length === 1", { timeout: 8000 });
    await new Promise(r => setTimeout(r, 600));   /* atlas render settle */
    const m1 = await page.evaluate(() => {
      const pl = Studio.page().characters[0];
      const elc = document.querySelector('.stu-stage .stu-char');
      const w = parseFloat(elc.style.width), h = parseFloat(elc.style.height);
      const left = parseFloat(elc.style.left), top = parseFloat(elc.style.top);
      return { anchor: pl.anchor, feetX: left + w / 2, feetY: top + h, scale: pl.scale };
    });
    assert(Math.abs(m1.feetX - m1.anchor.x) < 1 && Math.abs(m1.feetY - m1.anchor.y) < 1,
      'm1: pip rendered feet-at-anchor {' + m1.anchor.x + ',' + m1.anchor.y + '} (got ' +
      m1.feetX.toFixed(1) + ',' + m1.feetY.toFixed(1) + ')');
    await page.screenshot({ path: path.join(REPO, 'docs', 'audit-results', 'storybook', 'studio-m1.png') });
  }
  if (upTo < 1) return finish(browser);

  /* ---------------- M2 ---------------- */
  {
    const before = await page.evaluate(() => Studio.page().characters[0].anchor.x);
    /* drag pip 160 CSS-px right on a known scale */
    const box = await (await page.$('.stu-stage .stu-char')).boundingBox();
    const scale = await page.evaluate(() =>
      parseFloat(getComputedStyle(document.querySelector('.stu-stage')).transform.split('(')[1]));
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.mouse.down();
    await page.mouse.move(box.x + box.width / 2 + 160, box.y + box.height / 2, { steps: 8 });
    await page.mouse.up();
    await new Promise(r => setTimeout(r, 200));
    const after = await page.evaluate(() => Studio.page().characters[0].anchor.x);
    const deltaDu = 160 / scale;
    const snapped = Math.round((before + deltaDu) / 8) * 8;
    assert(after === snapped,
      'm2: drag committed snapped du (before ' + before + ' + ' + deltaDu.toFixed(1) + ' → ' + after + ', expected ' + snapped + ')');

    /* autosave lands on disk */
    await page.evaluate(() => Studio.saveNow());
    await page.waitForFunction("Studio.state.saveState === 'saved'", { timeout: 8000 });
    const onDisk = JSON.parse(fs.readFileSync(path.join(STORIES, SCRATCH, 'story.json'), 'utf8'));
    assert(onDisk.pages[1].characters[0].anchor.x === after, 'm2: saved story.json carries the new anchor');
    const baks = fs.readdirSync(path.join(STORIES, SCRATCH)).filter(f => f.endsWith('.bak'));
    assert(baks.length >= 1, 'm2: timestamped .bak written (' + baks.length + ')');

    /* undo restores */
    await page.evaluate(() => Studio.undo());
    const undone = await page.evaluate(() => Studio.page().characters[0].anchor.x);
    assert(undone === before, 'm2: undo restores the anchor (' + undone + ')');

    /* stale etag → 409 */
    const conflict = await page.evaluate(async (id) => {
      const r = await fetch('/studio/story/' + id, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ story: Studio.state.doc.story, strings: Studio.state.doc.strings, baseEtag: 'stale-etag' })
      });
      return r.status;
    }, SCRATCH);
    assert(conflict === 409, 'm2: stale-etag save is rejected with 409 (got ' + conflict + ')');
  }
  if (upTo < 2) return finish(browser);

  /* ---------------- M4 ---------------- */
  {
    /* add a page, open the mechanic picker, choose Listen and tap */
    await page.evaluate(() => {
      Studio.state.pageIndex = Studio.state.doc.story.pages.length - 1;
      StudioCanvas.select(null);
    });
    await page.evaluate(() => {
      document.querySelectorAll('#stu-panel .stu-btn').forEach(b => {
        if (b.textContent === 'Duplicate page') b.click();
      });
    });
    await new Promise(r => setTimeout(r, 200));
    await page.evaluate(() => {
      /* the new duplicated page has no interaction (duplication clears it) */
      const btns = [...document.querySelectorAll('#stu-panel .stu-btn')];
      btns.find(b => b.textContent === 'Choose an activity').click();
    });
    await page.waitForSelector('.stu-card', { timeout: 8000 });
    await page.evaluate(() => {
      const card = [...document.querySelectorAll('.stu-card')]
        .find(c => c.textContent.indexOf('Listen and tap') >= 0);
      card.click();
    });
    await new Promise(r => setTimeout(r, 300));
    const m4 = await page.evaluate(() => {
      const inter = Studio.page().interaction;
      return { type: inter && inter.moduleType, hasZone: !!(inter && inter.zone),
               zoneOk: inter && inter.zone.w >= 520 && inter.zone.h >= 420,
               formRows: document.querySelectorAll('#stu-panel .stu-frow').length };
    });
    assert(m4.type === 'sb-listen', 'm4: picker applied sb-listen');
    assert(m4.hasZone && m4.zoneOk, 'm4: a valid default zone was born with the mechanic');
    assert(m4.formRows >= 2, 'm4: the generated form rendered (' + m4.formRows + ' rows)');
  }
  if (upTo < 3) return finish(browser);

  /* ---------------- M5 ---------------- */
  {
    /* switch the page's mechanic to find-object, place a target, move the zone */
    await page.evaluate(() => {
      const btns = [...document.querySelectorAll('#stu-panel .stu-btn')];
      btns.find(b => b.textContent === 'Change…').click();
    });
    await page.waitForSelector('.stu-card', { timeout: 8000 });
    await page.evaluate(() => {
      [...document.querySelectorAll('.stu-card')]
        .find(c => c.textContent.indexOf('Find the objects') >= 0).click();
    });
    await new Promise(r => setTimeout(r, 300));
    /* place a target programmatically through the SAME canvas place-mode seam */
    await page.evaluate(() => {
      const dr = SBModules.get('sb-find-object').meta.studio.drawables[0];
      StudioCanvas.startPlaceRect(dr, function () {});
    });
    /* click at design-point (1100, 400) mapped to screen */
    const pt = await page.evaluate(() => {
      const st = document.querySelector('.stu-stage');
      const r = st.getBoundingClientRect();
      const s = parseFloat(getComputedStyle(st).transform.split('(')[1]);
      return { x: r.left + 1100 * s, y: r.top + 400 * s };
    });
    await page.mouse.click(pt.x, pt.y);
    await new Promise(r => setTimeout(r, 250));
    const placed = await page.evaluate(() => {
      const inter = Studio.page().interaction;
      const t = inter.taskData.targets[0];
      return { rel: t.rect, zone: inter.zone,
               abs: { x: inter.zone.x + t.rect.x, y: inter.zone.y + t.rect.y } };
    });
    /* move the ZONE by +200,-40 du directly through the same mutate path */
    await page.evaluate(() => {
      Studio.mutate('test zone move', function (draft) {
        const inter = draft.story.pages[Studio.state.pageIndex].interaction;
        const oldZone = JSON.parse(JSON.stringify(inter.zone));
        inter.zone = { x: oldZone.x + 200, y: oldZone.y - 40, w: oldZone.w, h: oldZone.h };
        Studio.reencodeZoneChildren(inter, oldZone, inter.zone);
      });
    });
    const after = await page.evaluate(() => {
      const inter = Studio.page().interaction;
      const t = inter.taskData.targets[0];
      return { rel: t.rect, zone: inter.zone,
               abs: { x: inter.zone.x + t.rect.x, y: inter.zone.y + t.rect.y } };
    });
    assert(after.rel.x !== placed.rel.x,
      'm5: zone-relative x re-encoded (' + placed.rel.x + ' → ' + after.rel.x + ')');
    assert(after.abs.x === placed.abs.x && after.abs.y === placed.abs.y,
      'm5: ABSOLUTE position unchanged (' + placed.abs.x + ',' + placed.abs.y + ')');
  }

  return finish(browser);

  async function finish(b) {
    await b.close();
    srv.close();
    fs.rmSync(path.join(STORIES, SCRATCH), { recursive: true, force: true });
    console.log('\n[prove-studio] stage ' + STAGE + ': ' + fails.length + ' failure(s)');
    process.exit(fails.length ? 1 : 0);
  }
})().catch(e => { console.error('[prove-studio] crashed: ' + e.stack); process.exit(1); });
