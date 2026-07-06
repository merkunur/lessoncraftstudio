#!/usr/bin/env node
/* =====================================================================
   prove-studio-bridge.js — the embedded-generator DIRECT-HANDOFF +
   LIFECYCLE proofs (puppeteer, REAL UI events against studio-server).

   A. Direct handoff (fresh page): picker → Worksheet tab → "Missing
      letters" (word-guess) → __sepGenerate → the app's OWN export button
      (relabeled "Add to my story" under sepEmbed) → package lands ON the
      current page as the interaction, zone aspect-fit to the crop,
      SELECTED — with ZERO downloads (CDP deny + anchor-click spy).
   B. Zone preservation (page with a drawn zone): the overlay bar's
      "Add to my story" → the pre-existing zone rect is PRESERVED.
   C. Lifecycle: Esc on the parent closes; Esc INSIDE the iframe closes
      (the catalog-export relay); opening another generator replaces the
      overlay (singleton); doc + pageIndex byte-identical after close.
   D. Standalone regression: word-guess WITHOUT ?sepEmbed=1 keeps the
      "Export for Storybook" label, stays admin-hidden, and the crop UI
      (zip path) still opens.

   USAGE: node scripts/storybook/prove-studio-bridge.js
   PREREQ: scripts/master-sync.bat has run (studio-server serves
   frontend/public — asserted up front via the SEP_EMBED marker).
   ===================================================================== */
'use strict';
const path = require('path');
const fs = require('fs');
const puppeteer = require('puppeteer');
const { srv } = require('./studio-server.js');

const REPO = path.join(__dirname, '..', '..');
const STORIES = path.join(REPO, 'mini tools', 'stories');
const fails = [];
function assert(ok, msg) {
  console.log((ok ? '  PASS  ' : '  FAIL  ') + msg);
  if (!ok) fails.push(msg);
}
const sleep = (ms) => new Promise(r => setTimeout(r, ms));

(async () => {
  /* mirror freshness: a stale frontend/public mirror fails loudly, not mysteriously */
  const mirroredCE = path.join(REPO, 'frontend', 'public', 'worksheet-generators', 'js', 'catalog-export.js');
  const mirroredBridge = path.join(REPO, 'frontend', 'public', 'mini-tools', 'studio-generator-bridge.js');
  assert(fs.existsSync(mirroredCE) && fs.readFileSync(mirroredCE, 'utf8').includes('SEP_EMBED'),
    'mirror: frontend/public catalog-export.js carries the SEP_EMBED embed branch (run scripts/master-sync.bat)');
  assert(fs.existsSync(mirroredBridge) && fs.readFileSync(mirroredBridge, 'utf8').includes('__lcsSepBridge'),
    'mirror: frontend/public studio-generator-bridge.js carries the __lcsSepBridge receiver');
  if (fails.length) { console.log('\n[prove-studio-bridge] mirror stale: ' + fails.length + ' failure(s)'); process.exit(1); }

  await new Promise(r => srv.listen(0, '127.0.0.1', r));
  const base = 'http://127.0.0.1:' + srv.address().port;
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  page.on('pageerror', e => fails.push('pageerror: ' + String(e).slice(0, 160)));
  await page.setViewport({ width: 1600, height: 1000 });

  /* deny downloads at the browser layer + count attempts */
  let downloadAttempts = 0;
  try {
    const cdp = await page.target().createCDPSession();
    await cdp.send('Browser.setDownloadBehavior', { behavior: 'deny', eventsEnabled: true });
    cdp.on('Browser.downloadWillBegin', () => { downloadAttempts++; });
  } catch (e) { console.log('  note: CDP download-deny unavailable (' + e.message + ') — anchor spy still armed'); }

  /* scratch copy of pips-picnic (the prove-studio.js pattern) */
  const SCRATCH = 'studio-bridge-proof';
  fs.rmSync(path.join(STORIES, SCRATCH), { recursive: true, force: true });
  fs.mkdirSync(path.join(STORIES, SCRATCH), { recursive: true });
  for (const f of ['story.json', 'strings.json']) {
    const docTxt = fs.readFileSync(path.join(STORIES, 'pips-picnic', f), 'utf8');
    fs.writeFileSync(path.join(STORIES, SCRATCH, f), docTxt.replace(/pips-picnic(?!\/)/g, SCRATCH));
  }
  const sj = JSON.parse(fs.readFileSync(path.join(STORIES, SCRATCH, 'story.json'), 'utf8'));
  sj.id = SCRATCH;
  for (const k in sj.assets) sj.assets[k].src = sj.assets[k].src.replace('/stories/' + SCRATCH + '/', '/stories/pips-picnic/');
  sj.reward.id = 'story.' + SCRATCH;
  fs.writeFileSync(path.join(STORIES, SCRATCH, 'story.json'), JSON.stringify(sj, null, 2));

  await page.goto(base + '/mini-tools/storybook-studio.html?story=' + SCRATCH, { waitUntil: 'domcontentloaded' });
  await page.waitForFunction('window.Studio && Studio.state.doc !== null', { timeout: 15000 });
  await page.waitForSelector('.stu-stage', { timeout: 15000 });

  const clickPanelBtn = (label) => page.evaluate((l) => {
    const b = [...document.querySelectorAll('#stu-panel .stu-btn')].find(x => x.textContent.indexOf(l) >= 0);
    if (b) b.click(); return !!b;
  }, label);
  const openWordGuessFromPicker = async (openerLabel) => {
    await clickPanelBtn(openerLabel);
    await page.waitForSelector('.stu-tab', { timeout: 8000 });
    await page.evaluate(() => {
      [...document.querySelectorAll('.stu-tab')].find(t => t.textContent.indexOf('Worksheet') >= 0).click();
    });
    await page.waitForFunction(() =>
      [...document.querySelectorAll('.stu-card')].some(c => c.textContent.indexOf('Missing letters') >= 0),
      { timeout: 10000 });
    await page.evaluate(() => {
      [...document.querySelectorAll('.stu-card')].find(c => c.textContent.indexOf('Missing letters') >= 0).click();
    });
    await page.waitForSelector('.stu-genframe', { timeout: 8000 });
  };
  const genFrame = async () => {
    const fh = await page.$('.stu-genframe');
    const fr = await fh.contentFrame();
    await fr.waitForFunction('typeof window.__sepGenerate === "function"', { timeout: 20000 });
    return fr;
  };

  /* ================= A. direct handoff onto a FRESH page ================= */
  {
    /* a duplicated page has interaction:null — the zoneFromCrop path */
    await page.evaluate(() => { Studio.state.pageIndex = Studio.state.doc.story.pages.length - 1; StudioCanvas.select(null); });
    await clickPanelBtn('Duplicate page');
    await sleep(250);
    const pgIdx = await page.evaluate(() => Studio.state.pageIndex);
    await openWordGuessFromPicker('Choose an activity');
    const fr = await genFrame();
    /* arm the anchor-download spy INSIDE the app iframe */
    await fr.evaluate(() => {
      window.__dlClicks = 0;
      const orig = HTMLAnchorElement.prototype.click;
      HTMLAnchorElement.prototype.click = function () { window.__dlClicks++; return orig.apply(this, arguments); };
    });
    /* deterministic content */
    await fr.evaluate(() => window.__sepGenerate({ theme: 'animals', locale: 'en', seed: 7 }));
    /* the in-app button lives in the Download dropdown — open it, then assert
       it is relabeled + revealed (teachers see it too: inline !important beats
       the admin gate while the sibling admin-only items stay hidden) */
    await fr.evaluate(() => { const d = document.getElementById('downloadDropdownBtn'); if (d) d.click(); });
    await sleep(200);
    const btn = await fr.evaluate(() => {
      const b = document.getElementById('sepExportBtn');
      return b ? { text: b.textContent.trim(), visible: b.offsetParent !== null,
                   display: getComputedStyle(b).display } : null;
    });
    assert(!!btn, 'A: the embedded app has #sepExportBtn');
    assert(btn && btn.text === 'Add to my story', 'A: button relabeled "Add to my story" (got "' + (btn && btn.text) + '")');
    assert(btn && btn.visible && btn.display !== 'none',
      'A: button revealed inside the open Download menu (display=' + (btn && btn.display) + ')');
    /* click it → direct handoff; read the spy DURING the placed beat (the
       overlay + iframe tear down 900ms later — a detached frame can't be read) */
    await fr.evaluate(() => document.getElementById('sepExportBtn').click());
    await page.waitForFunction(() => {
      const s = document.querySelector('.stu-genstatus');
      return s && s.textContent.indexOf('Placed') >= 0;
    }, { timeout: 15000 });
    const dl = await fr.evaluate(() => window.__dlClicks);
    await page.waitForFunction(() => !document.querySelector('.stu-genov'), { timeout: 15000 });
    await sleep(300);
    const placed = await page.evaluate(() => {
      const inter = Studio.page().interaction;
      const selEl = document.querySelector('.stu-zone.stu-selected');
      return {
        pageIndex: Studio.state.pageIndex,
        type: inter && inter.moduleType,
        pkg: inter && inter.taskData && inter.taskData.package,
        zone: inter && inter.zone,
        selection: Studio.state.selection,
        selectedZoneInDom: !!selEl
      };
    });
    assert(placed.pageIndex === pgIdx, 'A: still on the page the user was designing (page ' + (pgIdx + 1) + ')');
    assert(placed.type === 'sb-worksheet-exercise', 'A: interaction is sb-worksheet-exercise');
    assert(/^exercises\//.test(placed.pkg || ''), 'A: taskData.package set (' + placed.pkg + ')');
    assert(placed.selection && placed.selection.kind === 'zone', 'A: the placed element is SELECTED (selection.kind=zone)');
    assert(placed.selectedZoneInDom, 'A: .stu-zone.stu-selected rendered with drag/resize handles');
    /* the worksheet must be VISIBLE on the canvas — the exported visual
       renders letterboxed inside the zone (not an empty labeled frame) */
    const visOk = await page.waitForFunction(() => {
      const im = document.querySelector('.stu-zone .stu-zone-sep');
      return im && im.naturalWidth > 0;
    }, { timeout: 10000 }).then(() => true).catch(() => false);
    assert(visOk, 'A: the exported worksheet VISUAL renders inside the zone (img loaded)');
    if (visOk) {
      const visSrc = await page.evaluate(() => document.querySelector('.stu-zone .stu-zone-sep').getAttribute('src'));
      assert(visSrc.indexOf(placed.pkg) >= 0, 'A: the zone visual is THIS package\'s export (' + visSrc + ')');
    }
    /* zone ≈ aspect-fit of the descriptor's crop (caps/floors allowed) */
    const exDir = path.join(STORIES, SCRATCH, placed.pkg);
    const desc = JSON.parse(fs.readFileSync(path.join(exDir, 'descriptor.json'), 'utf8'));
    const s = Math.min(1400 / desc.crop.w, 840 / desc.crop.h, 1.6);
    const expW = Math.max(640, Math.min(1400, Math.round(desc.crop.w * s)));
    const expH = Math.max(520, Math.min(840, Math.round(desc.crop.h * s)));
    assert(placed.zone.w === expW && placed.zone.h === expH,
      'A: zone aspect-fit to the crop (' + placed.zone.w + '×' + placed.zone.h + ', expected ' + expW + '×' + expH + ')');
    assert(placed.zone.x === Math.round((1600 - expW) / 2), 'A: zone centered');
    assert((dl || 0) === 0, 'A: ZERO anchor downloads in the app (spy=' + dl + ')');
    assert(downloadAttempts === 0, 'A: ZERO browser download attempts (CDP=' + downloadAttempts + ')');
  }

  /* ================= B. drawn-zone preservation via the bar button ================= */
  {
    /* page 2 has a real drawn find-objects zone — it must be preserved */
    await page.evaluate(() => { Studio.state.pageIndex = 1; StudioCanvas.select(null); });
    await sleep(200);
    const prevZone = await page.evaluate(() => JSON.parse(JSON.stringify(Studio.page().interaction.zone)));
    await openWordGuessFromPicker('Change…');
    const fr = await genFrame();
    await fr.evaluate(() => window.__sepGenerate({ theme: 'animals', locale: 'en', seed: 11 }));
    /* the OVERLAY BAR primary ("Add to my story") — the parent-initiated path */
    await page.evaluate(() => {
      [...document.querySelectorAll('.stu-genbar .stu-btn')].find(b => b.textContent.indexOf('Add to my story') >= 0).click();
    });
    await page.waitForFunction(() => !document.querySelector('.stu-genov'), { timeout: 20000 });
    await sleep(300);
    const after = await page.evaluate(() => ({
      type: Studio.page().interaction.moduleType,
      zone: Studio.page().interaction.zone,
      sel: Studio.state.selection
    }));
    assert(after.type === 'sb-worksheet-exercise', 'B: bar path also lands sb-worksheet-exercise');
    assert(JSON.stringify(after.zone) === JSON.stringify(prevZone),
      'B: the page\'s DRAWN zone was preserved (' + JSON.stringify(after.zone) + ')');
    assert(after.sel && after.sel.kind === 'zone', 'B: placed element selected');
  }

  /* ================= C. lifecycle ================= */
  {
    const snap = await page.evaluate(() => JSON.stringify(Studio.state.doc) + '|' + Studio.state.pageIndex);

    /* (i) Esc on the PARENT closes */
    await page.evaluate(() => StudioGeneratorBridge.open({ id: 'word-guess', title: { en: 'Missing letters' }, sepFamily: 'A' }, {}));
    await page.waitForSelector('.stu-genov', { timeout: 5000 });
    await page.evaluate(() => document.body.focus());
    await page.keyboard.press('Escape');
    await page.waitForFunction(() => !document.querySelector('.stu-genov'), { timeout: 5000 });
    assert(true, 'C: Esc on the parent closes the generator');

    /* (ii) Esc INSIDE the iframe closes (the catalog-export relay) */
    await page.evaluate(() => StudioGeneratorBridge.open({ id: 'word-guess', title: { en: 'Missing letters' }, sepFamily: 'A' }, {}));
    await page.waitForSelector('.stu-genframe', { timeout: 5000 });
    {
      const fh = await page.$('.stu-genframe');
      const fr = await fh.contentFrame();
      await fr.waitForFunction('typeof window.__sepExport === "function"', { timeout: 20000 });
      /* the relay closes the overlay (removing this very iframe) synchronously —
         the evaluate's context dies mid-flight by design; the assert below is
         the waitForFunction on the parent */
      await fr.evaluate(() => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })))
        .catch(() => {});
    }
    await page.waitForFunction(() => !document.querySelector('.stu-genov'), { timeout: 5000 });
    assert(true, 'C: Esc inside the generator iframe closes (relay through __lcsSepBridge.esc)');

    /* (iii) opening a different generator REPLACES the open one (singleton) */
    await page.evaluate(() => StudioGeneratorBridge.open({ id: 'word-guess', title: { en: 'Missing letters' }, sepFamily: 'A' }, {}));
    await page.waitForSelector('.stu-genov', { timeout: 5000 });
    await page.evaluate(() => StudioGeneratorBridge.open({ id: 'matching', title: { en: 'Matching' }, sepFamily: 'E' }, {}));
    await sleep(400);
    const single = await page.evaluate(() => ({
      count: document.querySelectorAll('.stu-genov').length,
      src: (document.querySelector('.stu-genframe') || {}).src || ''
    }));
    assert(single.count === 1, 'C: exactly one overlay after opening a second generator (got ' + single.count + ')');
    assert(single.src.indexOf('matching.html') >= 0, 'C: the surviving overlay hosts the NEW generator');
    /* close via the button */
    await page.evaluate(() => {
      [...document.querySelectorAll('.stu-genbar .stu-btn')].find(b => /Close|Schließen/.test(b.textContent)).click();
    });
    await page.waitForFunction(() => !document.querySelector('.stu-genov'), { timeout: 5000 });

    /* (iv) studio state intact across all of it */
    const snap2 = await page.evaluate(() => JSON.stringify(Studio.state.doc) + '|' + Studio.state.pageIndex);
    assert(snap === snap2, 'C: doc + pageIndex byte-identical after open/Esc/replace/close');
    const bridgeGone = await page.evaluate(() => window.__lcsSepBridge === undefined);
    assert(bridgeGone, 'C: __lcsSepBridge torn down with the overlay');
  }

  /* ================= D. standalone regression (no sepEmbed) ================= */
  {
    const app = await browser.newPage();
    app.on('pageerror', e => fails.push('standalone pageerror: ' + String(e).slice(0, 160)));
    await app.setViewport({ width: 1500, height: 900 });
    await app.goto(base + '/worksheet-generators/word-guess.html', { waitUntil: 'domcontentloaded' });
    await app.waitForFunction('typeof window.__sepGenerate === "function"', { timeout: 20000 });
    const st = await app.evaluate(() => {
      const b = document.getElementById('sepExportBtn');
      return { text: b.textContent.trim(), display: getComputedStyle(b).display };
    });
    assert(st.text === 'Export for Storybook', 'D: standalone keeps "Export for Storybook" (got "' + st.text + '")');
    assert(st.display === 'none', 'D: standalone stays admin-gate hidden');
    await app.evaluate(() => window.__sepGenerate({ theme: 'animals', locale: 'en', seed: 5 }));
    await app.evaluate(() => document.getElementById('sepExportBtn').click());
    const gotCropUI = await app.waitForFunction(() =>
      [...document.querySelectorAll('button')].some(b => b.textContent === 'Export this'), { timeout: 10000 })
      .then(() => true).catch(() => false);
    assert(gotCropUI, 'D: standalone button still opens the crop UI (zip path intact)');
    /* Esc now cancels the crop UI (new, additive) */
    await app.keyboard.press('Escape');
    const cropGone = await app.waitForFunction(() =>
      ![...document.querySelectorAll('button')].some(b => b.textContent === 'Export this'), { timeout: 5000 })
      .then(() => true).catch(() => false);
    assert(cropGone, 'D: Escape cancels the standalone crop UI');
    await app.close();
  }

  await browser.close();
  srv.close();
  fs.rmSync(path.join(STORIES, SCRATCH), { recursive: true, force: true });
  console.log('\n[prove-studio-bridge] ' + fails.length + ' failure(s)');
  process.exit(fails.length ? 1 : 0);
})().catch(e => { console.error('[prove-studio-bridge] crashed: ' + e.stack); process.exit(1); });
