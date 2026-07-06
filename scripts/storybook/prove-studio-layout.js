#!/usr/bin/env node
/* =====================================================================
   prove-studio-layout.js — the canvas-first shell gates (puppeteer vs
   studio-server), per viewport 1024×768 / 1366×768 / 1920×1080:

   1. chrome budget: #stu-topbar ≤ 48px; no other full-width band at the
      top; NOTHING at the bottom; no fixed ≥90%-wide × ≥30px element in
      steady state (transient overlays excluded by construction).
   2. canvas share: #stu-canvas-host area / viewport ≥ 48% @1024,
      ≥ 58% @1366, ≥ 68% @1920 with everything open; ≥ 85% in Focus,
      with every restore affordance visible and ≤ 48px thick.
   3. zoom/pan pointer-math: at setZoom(2) + pan, a 160-CSS-px drag
      commits exactly round((160/2)/8)*8 du (the m2 contract under zoom);
      Ctrl+0 = Fit, Ctrl+1 = 100%, the ± buttons step.
   4. persistence: a collapsed panel survives reload; cleared
      studio.ui.* keys → everything open + Fit.
   5. wrapper (static): StudioEditorClient.tsx has no band above the
      iframe (absolute inset-0) — the live check is the prod walkthrough.

   USAGE: node scripts/storybook/prove-studio-layout.js
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

const VIEWPORTS = [
  { w: 1024, h: 768, openShare: 0.48 },
  { w: 1366, h: 768, openShare: 0.58 },
  { w: 1920, h: 1080, openShare: 0.68 }
];

(async () => {
  await new Promise(r => srv.listen(0, '127.0.0.1', r));
  const base = 'http://127.0.0.1:' + srv.address().port;
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  page.on('pageerror', e => fails.push('pageerror: ' + String(e).slice(0, 160)));

  const SCRATCH = 'studio-layout-proof';
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

  const gotoStudio = async () => {
    await page.goto(base + '/mini-tools/storybook-studio.html?story=' + SCRATCH, { waitUntil: 'domcontentloaded' });
    await page.waitForFunction('window.Studio && Studio.state.doc !== null', { timeout: 15000 });
    await page.waitForSelector('.stu-stage', { timeout: 15000 });
    await sleep(400);
  };

  const measure = () => page.evaluate(() => {
    const vw = window.innerWidth, vh = window.innerHeight;
    const tb = document.getElementById('stu-topbar').getBoundingClientRect();
    const host = document.getElementById('stu-canvas-host').getBoundingClientRect();
    /* every VISIBLE element ≥90% viewport width × ≥30px tall that hugs the
       top or bottom edge (band detectors), plus any offending fixed band */
    const bands = { top: 0, bottom: 0, fixedBands: [] };
    for (const el of document.body.querySelectorAll('*')) {
      const st = getComputedStyle(el);
      if (st.display === 'none' || st.visibility === 'hidden') continue;
      const r = el.getBoundingClientRect();
      if (r.width < vw * 0.9 || r.height < 30) continue;
      if (r.height > vh * 0.9) continue;               /* containers, not bands */
      if (el.children.length && r.height > 120) continue; /* layout wrappers */
      if (r.top <= 2) bands.top = Math.max(bands.top, r.height);
      if (Math.abs(r.bottom - vh) <= 2) bands.bottom = Math.max(bands.bottom, r.height);
      if (st.position === 'fixed' && r.height >= 30 && r.height <= 200) {
        bands.fixedBands.push(el.id || el.className);
      }
    }
    return {
      vw, vh,
      topbarH: tb.height,
      hostShare: (host.width * host.height) / (vw * vh),
      bands
    };
  });

  for (const vp of VIEWPORTS) {
    await page.setViewport({ width: vp.w, height: vp.h });
    await page.evaluate(() => { try { ['top', 'rail', 'panel'].forEach(k => localStorage.removeItem('studio.ui.' + k)); } catch (e) {} });
    await gotoStudio();

    const m = await measure();
    assert(m.topbarH <= 48, vp.w + '×' + vp.h + ': toolbar ≤ 48px (got ' + m.topbarH.toFixed(0) + ')');
    assert(m.bands.top <= 48, vp.w + '×' + vp.h + ': total top-edge chrome ≤ 48px (got ' + m.bands.top.toFixed(0) + ')');
    assert(m.bands.bottom === 0, vp.w + '×' + vp.h + ': NO bottom band (got ' + m.bands.bottom.toFixed(0) + ')');
    assert(m.bands.fixedBands.length === 0, vp.w + '×' + vp.h + ': no fixed full-width band (' + m.bands.fixedBands.join(',') + ')');
    assert(m.hostShare >= vp.openShare,
      vp.w + '×' + vp.h + ': canvas ≥ ' + Math.round(vp.openShare * 100) + '% of the window with panels open (got ' + (m.hostShare * 100).toFixed(1) + '%)');

    /* Focus mode */
    await page.evaluate(() => StudioInspector.toggleFocus());
    await sleep(300);
    const mf = await measure();
    assert(mf.hostShare >= 0.85,
      vp.w + '×' + vp.h + ': Focus mode canvas ≥ 85% (got ' + (mf.hostShare * 100).toFixed(1) + '%)');
    const restore = await page.evaluate(() => {
      const vis = (sel) => { const e = document.querySelector(sel); if (!e) return null; const r = e.getBoundingClientRect(); const s = getComputedStyle(e); return s.display !== 'none' && r.width > 0 ? { w: r.width, h: r.height } : null; };
      return { pill: vis('.stu-menu-pill'), tab: vis('.stu-panel-tab'), zoom: vis('.stu-zoombar'), rail: vis('#stu-rail') };
    });
    assert(!!restore.pill && restore.pill.h <= 48, vp.w + '×' + vp.h + ': Focus keeps the Menu pill visible (≤48px)');
    assert(!!restore.tab && restore.tab.w <= 48, vp.w + '×' + vp.h + ': Focus keeps the panel tab visible (≤48px thick)');
    assert(!!restore.zoom, vp.w + '×' + vp.h + ': Focus keeps the zoom cluster reachable');
    assert(!!restore.rail && restore.rail.w <= 48, vp.w + '×' + vp.h + ': Focus keeps the page strip (≤48px)');
    /* one click back */
    await page.evaluate(() => { document.querySelector('.stu-zfocus').click(); });
    await sleep(300);
    const mb = await measure();
    assert(mb.topbarH > 0 && mb.hostShare < mf.hostShare, vp.w + '×' + vp.h + ': one click exits Focus (chrome restored)');
  }

  /* ============ zoom/pan pointer math (1366×768) ============ */
  {
    await page.setViewport({ width: 1366, height: 768 });
    await gotoStudio();
    await page.evaluate(() => { Studio.state.pageIndex = 1; StudioCanvas.select(null); });
    await page.waitForFunction("document.querySelectorAll('.stu-stage .stu-char').length === 1", { timeout: 8000 });
    await sleep(500);

    /* zoom to 2×, then pan so the pip ELEMENT's center sits at the viewport
       center (at 2× the sprite is taller than the window — an anchor-based
       pan can put its drag point off-screen where mouse events never land) */
    await page.evaluate(() => StudioCanvas.setZoom(2));
    await sleep(150);
    {
      const bb0 = await (await page.$('.stu-stage .stu-char')).boundingBox();
      await page.evaluate((dx, dy) => StudioCanvas.panBy(dx, dy),
        683 - (bb0.x + bb0.width / 2), 384 - (bb0.y + bb0.height / 2));
      await sleep(200);
    }
    const v = await page.evaluate(() => StudioCanvas.getView());
    assert(Math.abs(v.scale - 2) < 0.001, 'zoom: setZoom(2) → scale 2 (got ' + v.scale + ')');
    const tf = await page.evaluate(() =>
      getComputedStyle(document.querySelector('.stu-stage')).transform.split('(')[1].split(',')[0]);
    assert(Math.abs(parseFloat(tf) - 2) < 0.001, 'zoom: transform stays a PURE scale() (coeff ' + tf + ')');

    const before = await page.evaluate(() => Studio.page().characters[0].anchor.x);
    const box = await (await page.$('.stu-stage .stu-char')).boundingBox();
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.mouse.down();
    await page.mouse.move(box.x + box.width / 2 + 160, box.y + box.height / 2, { steps: 8 });
    await page.mouse.up();
    await sleep(250);
    const after = await page.evaluate(() => Studio.page().characters[0].anchor.x);
    const snapped = Math.round((before + 160 / 2) / 8) * 8;
    assert(after === snapped, 'zoom: 160-px drag at 2× commits ' + (after - before) + 'du (expected ' + (snapped - before) + ') — duPoint exact under zoom+pan');
    await page.evaluate(() => Studio.undo());

    /* keyboard: Ctrl+1 = 100%, Ctrl+0 = Fit */
    await page.keyboard.down('Control'); await page.keyboard.press('1'); await page.keyboard.up('Control');
    await sleep(150);
    const z1 = await page.evaluate(() => StudioCanvas.getView().scale);
    assert(Math.abs(z1 - 1) < 0.001, 'zoom: Ctrl+1 → 100% (got ' + z1 + ')');
    await page.keyboard.down('Control'); await page.keyboard.press('0'); await page.keyboard.up('Control');
    await sleep(150);
    const zf = await page.evaluate(() => { const v2 = StudioCanvas.getView(); return { mode: v2.mode, ok: Math.abs(v2.scale - v2.fitScale) < 0.001 }; });
    assert(zf.mode === 'fit' && zf.ok, 'zoom: Ctrl+0 → Fit');
    /* the ± buttons step */
    const fitS = await page.evaluate(() => StudioCanvas.getView().scale);
    await page.evaluate(() => { document.querySelector('.stu-zoombar .stu-zbtn').click(); });   /* − */
    await sleep(120);
    const zm = await page.evaluate(() => StudioCanvas.getView());
    assert(zm.mode === 'manual' && zm.scale < fitS, 'zoom: the − button steps out (scale ' + zm.scale.toFixed(3) + ' < fit ' + fitS.toFixed(3) + ')');
  }

  /* ============ persistence ============ */
  {
    await page.evaluate(() => { document.querySelector('.stu-panel-collapse').click(); });
    await sleep(200);
    await page.reload({ waitUntil: 'domcontentloaded' });
    await page.waitForFunction('window.Studio && Studio.state.doc !== null', { timeout: 15000 });
    await sleep(400);
    const persisted = await page.evaluate(() => ({
      panelClosed: document.getElementById('stu-app').classList.contains('stu-panel-closed'),
      fit: StudioCanvas.getView().mode === 'fit'
    }));
    assert(persisted.panelClosed, 'persistence: collapsed panel survives reload');
    assert(persisted.fit, 'persistence: zoom is NOT persisted — every load starts at Fit');
    await page.evaluate(() => { try { ['top', 'rail', 'panel'].forEach(k => localStorage.removeItem('studio.ui.' + k)); } catch (e) {} });
    await page.reload({ waitUntil: 'domcontentloaded' });
    await page.waitForFunction('window.Studio && Studio.state.doc !== null', { timeout: 15000 });
    await sleep(400);
    const defaults = await page.evaluate(() => {
      const c = document.getElementById('stu-app').classList;
      return !c.contains('stu-panel-closed') && !c.contains('stu-rail-closed') && !c.contains('stu-top-closed');
    });
    assert(defaults, 'persistence: cleared studio.ui.* → everything open (fresh-profile default)');
  }

  /* ============ wrapper (static assertion) ============ */
  {
    const tsx = fs.readFileSync(path.join(REPO, 'frontend', 'app', '[locale]', 'studio', '[storyId]', 'StudioEditorClient.tsx'), 'utf8');
    assert(/position:\s*'fixed',\s*inset:\s*0,\s*zIndex:\s*60/.test(tsx),
      'wrapper: the overlay positions via INLINE fixed inset-0 z 60 (immune to class purging; above the z-50 site nav)');
    assert(/position:\s*'absolute',\s*inset:\s*0,\s*width:\s*'100%',\s*height:\s*'100%'/.test(tsx),
      'wrapper: iframe fills the viewport via inline styles');
    assert(!/border-b border-cream-300/.test(tsx), 'wrapper: the back-bar band is gone');
    assert(/lcs-studio-nav/.test(tsx), 'wrapper: listens for the studio toolbar\'s "← My stories" navigation');
    /* the editor route must escape the site layout ENTIRELY — the nav is
       `relative z-50` and paints over any lower overlay; the standalone
       branch (the /get/ precedent) removes Navigation + Footer at the source */
    const layoutTsx = fs.readFileSync(path.join(REPO, 'frontend', 'app', '[locale]', 'LocaleLayoutClient.tsx'), 'utf8');
    assert(/isStudioEditor/.test(layoutTsx) && /startsWith\(`\/\$\{locale\}\/studio\/`\)/.test(layoutTsx),
      'layout: the studio EDITOR route renders standalone (no Navigation, no Footer)');
    assert(/isGetRoute \|\| isStudioEditor/.test(layoutTsx),
      'layout: the standalone branch actually short-circuits for the editor');
  }

  await browser.close();
  srv.close();
  fs.rmSync(path.join(STORIES, SCRATCH), { recursive: true, force: true });
  console.log('\n[prove-studio-layout] ' + fails.length + ' failure(s)');
  process.exit(fails.length ? 1 : 0);
})().catch(e => { console.error('[prove-studio-layout] crashed: ' + e.stack); process.exit(1); });
