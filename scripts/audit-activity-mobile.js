#!/usr/bin/env node
/**
 * audit-activity-mobile.js — the standing mobile-layout gate for activities.
 *
 * Activities render inside an iframe (scrolling="no") on /<locale>/activities/<slug>/.
 * Any content wider than the iframe is CLIPPED (cut off) — the recurring "broken on
 * Galaxy" class. This harness loads the REAL activity page at a matrix of phone widths,
 * peeks INSIDE the iframe (same-origin, both live + local), and asserts the activity
 * never overflows / clips / pushes controls off-screen — in BOTH the empty and a
 * best-effort filled state. Screenshots are saved for human eyeball (§A.13.43).
 *
 * It is the layout analogue of scripts/audit-activity-pages.js (SEO floor) and reuses
 * its manifest enumeration + CLI + markdown shape, plus the puppeteer iframe-geometry
 * pattern from frontend/public/mini-tools/_visual-verify.js.
 *
 * MANDATORY before shipping any new/changed activity (CLAUDE.md §A.13.55, §20.4, §21.4).
 *
 * Usage:
 *   node scripts/audit-activity-mobile.js                         # all activities, LIVE
 *   node scripts/audit-activity-mobile.js --base=http://localhost:3000   # local verify
 *   node scripts/audit-activity-mobile.js --activities=place-value       # filter by id substring
 *   node scripts/audit-activity-mobile.js --locales=en,de,fi
 *   node scripts/audit-activity-mobile.js --widths=280,360,412 --concurrency=4
 *
 * Exit code: 0 if every (activity × locale × width × state) passes the hard gates; 1 otherwise.
 *
 * Hard gates (FAIL): horizontal overflow/clip inside the iframe; any interactive control
 *   off-screen (right > iframe width or left < 0); vertical content clip (scrollHeight >
 *   clientHeight after settle); console/page errors.
 * Soft warnings (WARN, not fail): tap target < 36px; oversized empty area (content height
 *   far below iframe height) — these are screenshot-eyeball signals.
 */

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer'); // resolved from repo-root node_modules

const ALL_LOCALES = ['en', 'de', 'fr', 'es', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
const DEFAULT_WIDTHS = [280, 320, 360, 375, 390, 412, 430, 768];
const SCREENSHOT_WIDTHS = new Set([360, 412, 768]); // eyeball set
const NARROW_WIDTHS = [280, 320, 360]; // for secondary (text-overflow) locales
const SECONDARY_LOCALES = ['de', 'fi']; // longest-word locales — text overflow probes
// Realistic per-width device heights so `vh`-based sizing (iframe min-height,
// padding, prompt font) resolves the way it does on a real phone — NOT a fixed
// tall viewport that inflates the empty-band measurement. Real CSS portrait sizes.
const WIDTH_HEIGHT = { 280: 653, 320: 568, 360: 800, 375: 812, 390: 844, 412: 915, 430: 932, 768: 1024 };
function heightFor(w) { return WIDTH_HEIGHT[w] || Math.round(w / 0.46); }
const SETTLE_MS = 900; // let fonts + postMessage auto-resize settle

function parseArgs(argv) {
  const args = {
    base: 'https://www.lessoncraftstudio.com',
    locales: null, // null => auto (primary + secondary narrow probes)
    widths: DEFAULT_WIDTHS,
    activities: null, // id substring filter
    concurrency: 4,
    out: 'docs/audit-results/mobile',
    headful: false,
  };
  // (isLocal computed after parse — dev servers emit React/HMR console noise
  // that must NOT count as a layout failure; only LIVE enforces zero-console.)
  for (const a of argv.slice(2)) {
    if (a.startsWith('--base=')) args.base = a.slice('--base='.length).replace(/\/$/, '');
    else if (a.startsWith('--locales=')) args.locales = a.slice('--locales='.length).split(',').map((s) => s.trim()).filter(Boolean);
    else if (a.startsWith('--widths=')) args.widths = a.slice('--widths='.length).split(',').map((s) => parseInt(s, 10)).filter(Boolean);
    else if (a.startsWith('--activities=')) args.activities = a.slice('--activities='.length);
    else if (a.startsWith('--concurrency=')) args.concurrency = Math.max(1, parseInt(a.slice('--concurrency='.length), 10) || 4);
    else if (a.startsWith('--out=')) args.out = a.slice('--out='.length);
    else if (a === '--headful') args.headful = true;
  }
  return args;
}

function loadActivityRows() {
  const dir = path.join(__dirname, '..', 'frontend', 'public', 'mini-tools');
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('-activities.json'));
  const rows = [];
  for (const f of files) {
    try {
      const arr = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
      if (Array.isArray(arr)) rows.push(...arr);
    } catch (e) {
      console.warn('[audit] could not parse', f, e.message);
    }
  }
  return rows;
}

/** Build (row, locale, widths[]) targets. */
function buildTargets(rows, args) {
  const targets = [];
  for (const row of rows) {
    if (args.activities && !row.id.includes(args.activities)) continue;
    const slugLocales = Object.keys(row.slug || {});
    if (!slugLocales.length) continue;

    if (args.locales) {
      // explicit locale filter: test each requested locale (that exists) at all widths
      for (const loc of args.locales) {
        if (row.slug[loc]) targets.push({ row, locale: loc, slug: row.slug[loc], widths: args.widths, screenshot: true });
      }
      continue;
    }

    // auto mode: primary locale at all widths + secondary locales at narrow widths
    const primary = row.slug.en ? 'en' : slugLocales[0];
    targets.push({ row, locale: primary, slug: row.slug[primary], widths: args.widths, screenshot: true });
    const narrow = args.widths.filter((w) => NARROW_WIDTHS.includes(w));
    if (narrow.length) {
      for (const loc of SECONDARY_LOCALES) {
        if (loc !== primary && row.slug[loc]) {
          targets.push({ row, locale: loc, slug: row.slug[loc], widths: narrow, screenshot: false });
        }
      }
    }
  }
  return targets;
}

// Runs INSIDE the activity iframe. Returns geometry + offenders.
function measureInsideFrame() {
  const de = document.documentElement;
  const vw = de.clientWidth;
  const vh = de.clientHeight;
  // Broad set for OFF-SCREEN detection (a clipped rod/cube/cell IS a real bug).
  const CONTROL_SEL = 'button, .lcs-activity-check, .lcs-activity-next, .cb-tile, .mp-card, .cvc-letter, .cvc-slot, .wb-tile, .wb-slot, .pv-add-btn, .lcs-activity-keypad button, .lcs-key, .tf-cell';
  // Narrow set for TAP-TARGET sizing — only true "press me" controls. Excludes
  // thin base-ten rods/cubes/flats (intentionally narrow manipulatives).
  const TAP_SEL = '.lcs-activity-check, .lcs-activity-next, .pv-add-btn, .cb-tile, .mp-card, .cvc-letter, .wb-tile, .lcs-activity-keypad button, .lcs-key, .tf-cell';
  function vis(el) {
    const cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden' || parseFloat(cs.opacity) === 0) return false;
    return true;
  }
  const overflowers = [];
  const els = document.querySelectorAll('body *');
  for (const el of els) {
    if (!vis(el)) continue;
    const r = el.getBoundingClientRect();
    if (r.width < 1 && r.height < 1) continue;
    if (r.right > vw + 1.5) {
      overflowers.push({ cls: (el.className || '').toString().slice(0, 64), over: Math.round(r.right - vw) });
    }
  }
  const offscreen = [];
  const controls = document.querySelectorAll(CONTROL_SEL);
  for (const el of controls) {
    if (!vis(el)) continue;
    const r = el.getBoundingClientRect();
    if (r.width < 1 && r.height < 1) continue;
    if (r.right > vw + 1.5 || r.left < -1.5) {
      offscreen.push({ cls: (el.className || '').toString().slice(0, 48), right: Math.round(r.right), left: Math.round(r.left) });
    }
  }
  let minTap = Infinity;
  const taps = document.querySelectorAll(TAP_SEL);
  for (const el of taps) {
    if (!vis(el)) continue;
    const r = el.getBoundingClientRect();
    if (r.width > 6 && r.height > 6) minTap = Math.min(minTap, Math.min(r.width, r.height));
  }
  // Real painted content height = farthest-bottom visible element within the card.
  let contentBottom = 0;
  const app = document.querySelector('.lcs-app') || document.body;
  const appRect = app.getBoundingClientRect();
  return {
    vw,
    vh,
    docScrollW: de.scrollWidth,
    docScrollH: de.scrollHeight,
    docClientH: de.clientHeight,
    appH: Math.round(appRect.height),
    horizontalOverflow: de.scrollWidth > vw + 1.5,
    verticalClip: de.scrollHeight > de.clientHeight + 4,
    overflowers: overflowers.slice(0, 10),
    offscreen: offscreen.slice(0, 10),
    minTap: minTap === Infinity ? null : Math.round(minTap),
  };
}

// Best-effort interaction to reach a filled state (runs via frame.$$ + .click()).
const FILL_SELECTORS = ['.pv-add-btn', '.lcs-activity-keypad button', '.lcs-key', '.tf-cell', '.cb-tile', '.mp-card', '.cvc-letter', '.wb-tile'];

async function bestEffortFill(frame) {
  for (const sel of FILL_SELECTORS) {
    let handles = [];
    try { handles = await frame.$$(sel); } catch (e) { handles = []; }
    if (!handles.length) continue;
    const n = Math.min(handles.length, sel === '.pv-add-btn' ? 4 : 3);
    for (let i = 0; i < n; i++) {
      try { await handles[i].click({ delay: 10 }); } catch (e) { /* ignore */ }
    }
    break; // one engine's primary control is enough to populate
  }
  // try Check to reach reviewed state
  try {
    const chk = await frame.$('.lcs-activity-check');
    if (chk) await chk.click({ delay: 10 });
  } catch (e) { /* ignore */ }
}

function evalChecks(m) {
  const fails = [];
  if (m.horizontalOverflow) fails.push('horizontalOverflow(' + (m.overflowers[0] ? '+' + m.overflowers[0].over + 'px ' + m.overflowers[0].cls : 'scrollW>' + m.vw) + ')');
  if (m.offscreen.length) fails.push('offscreenControl(' + m.offscreen[0].cls + ' right=' + m.offscreen[0].right + '>' + m.vw + ')');
  if (m.verticalClip) fails.push('verticalClip(scrollH=' + m.docScrollH + '>clientH=' + m.docClientH + ')');
  const warns = [];
  if (m.minTap != null && m.minTap < 36) warns.push('tapTarget=' + m.minTap + 'px');
  // Empty band below the card inside the iframe (the "mostly blank card" look).
  if (m.vh && m.appH && m.vh - m.appH > 150) warns.push('emptyBand=' + (m.vh - m.appH) + 'px(app=' + m.appH + ',iframe=' + m.vh + ')');
  return { fails, warns };
}

async function runPool(items, concurrency, worker) {
  const results = [];
  let idx = 0;
  async function next() {
    while (idx < items.length) {
      const i = idx++;
      results[i] = await worker(items[i], i);
    }
  }
  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, next));
  return results;
}

function engineOf(row) { return (row.tool || 'unknown').replace(/-activity$/, ''); }
function safe(s) { return String(s).replace(/[^a-z0-9._-]+/gi, '_'); }

async function main() {
  const args = parseArgs(process.argv);
  const isLocal = /localhost|127\.0\.0\.1/.test(args.base);
  const rows = loadActivityRows();
  const targets = buildTargets(rows, args);
  if (!targets.length) { console.error('No targets.'); process.exit(1); }

  const outDir = path.isAbsolute(args.out) ? args.out : path.join(__dirname, '..', args.out);
  fs.mkdirSync(outDir, { recursive: true });
  const shotsDir = path.join(outDir, 'screens');
  fs.mkdirSync(shotsDir, { recursive: true });

  const totalRenders = targets.reduce((a, t) => a + t.widths.length, 0);
  console.log(`Mobile audit: ${targets.length} (activity×locale) targets, ${totalRenders} width-renders at ${args.base}`);

  const browser = await puppeteer.launch({ headless: args.headful ? false : 'new', args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  const records = [];

  await runPool(targets, args.concurrency, async (t) => {
    const engine = engineOf(t.row);
    const page = await browser.newPage();
    await page.setCacheEnabled(false); // always test fresh bytes (§A.13.43)
    for (const width of t.widths) {
      const consoleErrs = [];
      const onConsole = (m) => { if (m.type() === 'error') consoleErrs.push(m.text().slice(0, 160)); };
      const onPageErr = (e) => consoleErrs.push('pageerror: ' + e.message.slice(0, 160));
      page.on('console', onConsole);
      page.on('pageerror', onPageErr);
      await page.setViewport({ width, height: heightFor(width), deviceScaleFactor: 2 });
      const url = `${args.base}/${t.locale}/activities/${t.slug}/?_=${width}_${Date.now()}`;
      const base = { id: t.row.id, engine, locale: t.locale, slug: t.slug, width };
      try {
        await page.goto(url, { waitUntil: 'networkidle2', timeout: 45000 });
        const iframeEl = await page.waitForSelector('iframe', { timeout: 20000 });
        const frame = await iframeEl.contentFrame();
        if (!frame) throw new Error('no contentFrame');
        await frame.waitForSelector('.lcs-app', { timeout: 15000 });
        await new Promise((r) => setTimeout(r, SETTLE_MS));

        // EMPTY state
        const mEmpty = await frame.evaluate(measureInsideFrame);
        const cEmpty = evalChecks(mEmpty);
        cEmpty.consoleErr = consoleErrs.length;
        if (!isLocal && consoleErrs.length) cEmpty.fails.push('consoleError(' + consoleErrs[0] + ')');
        if (t.screenshot && SCREENSHOT_WIDTHS.has(width)) {
          try { await iframeEl.screenshot({ path: path.join(shotsDir, `${safe(engine)}__${safe(t.row.id)}__${t.locale}__${width}__empty.png`) }); } catch (e) {}
        }

        // FILLED state
        await bestEffortFill(frame);
        await new Promise((r) => setTimeout(r, 500));
        const mFilled = await frame.evaluate(measureInsideFrame);
        const cFilled = evalChecks(mFilled);
        if (t.screenshot && SCREENSHOT_WIDTHS.has(width)) {
          try { await iframeEl.screenshot({ path: path.join(shotsDir, `${safe(engine)}__${safe(t.row.id)}__${t.locale}__${width}__filled.png`) }); } catch (e) {}
        }

        const allFails = [...new Set([...cEmpty.fails, ...cFilled.fails])];
        const allWarns = [...new Set([...cEmpty.warns, ...cFilled.warns])];
        records.push({ ...base, pass: allFails.length === 0, fails: allFails, warns: allWarns, empty: mEmpty, filled: mFilled });
        const tag = allFails.length ? 'FAIL' : (allWarns.length ? 'warn' : 'ok  ');
        console.log(`  ${tag} ${engine}/${t.row.id.split('.').slice(-2).join('.')} ${t.locale} @${width}${allFails.length ? ' :: ' + allFails.join(' | ') : (allWarns.length ? ' :: ' + allWarns.join(' | ') : '')}`);
      } catch (e) {
        records.push({ ...base, pass: false, fails: ['loadError(' + e.message.slice(0, 120) + ')'], warns: [] });
        console.log(`  FAIL ${engine}/${t.row.id} ${t.locale} @${width} :: loadError ${e.message.slice(0, 80)}`);
      }
      page.off('console', onConsole);
      page.off('pageerror', onPageErr);
    }
    await page.close();
  });

  await browser.close();

  // Aggregate
  const passCount = records.filter((r) => r.pass).length;
  const failCount = records.length - passCount;
  const warnOnly = records.filter((r) => r.pass && r.warns && r.warns.length).length;

  const byEngine = {};
  for (const r of records) {
    const E = (byEngine[r.engine] = byEngine[r.engine] || { total: 0, pass: 0, fails: {} });
    E.total++; if (r.pass) E.pass++;
    for (const f of r.fails) { const key = f.replace(/\(.*$/, ''); E.fails[key] = (E.fails[key] || 0) + 1; }
  }

  let md = `# Activity mobile-layout audit — ${args.base}\n\n`;
  md += `Widths: ${args.widths.join(', ')} · **${records.length}** renders · **${passCount} pass / ${failCount} fail** (${warnOnly} pass-with-warnings)\n\n`;
  md += `| engine | renders | pass | failing checks |\n|---|---|---|---|\n`;
  for (const e of Object.keys(byEngine).sort()) {
    const E = byEngine[e];
    const fails = Object.entries(E.fails).map(([k, v]) => `${k}×${v}`).join(', ') || '—';
    md += `| ${e} | ${E.total} | ${E.pass} | ${fails} |\n`;
  }
  md += `\n## Failures\n\n`;
  const failing = records.filter((r) => !r.pass);
  if (!failing.length) md += `None — every activity passes the hard gates at every width.\n`;
  for (const r of failing) {
    md += `- **${r.engine}** \`${r.id}\` ${r.locale} @${r.width}px — ${r.fails.join(' | ')}\n`;
  }
  md += `\n## Pass-with-warnings\n\n`;
  const warned = records.filter((r) => r.pass && r.warns && r.warns.length);
  if (!warned.length) md += `None.\n`;
  for (const r of warned) {
    md += `- ${r.engine} \`${r.id}\` ${r.locale} @${r.width}px — ${r.warns.join(' | ')}\n`;
  }

  fs.writeFileSync(path.join(outDir, 'mobile-activity-audit.json'), JSON.stringify(records, null, 2));
  fs.writeFileSync(path.join(outDir, 'mobile-activity-audit.md'), md);
  console.log('\n' + md);
  console.log(`Wrote ${path.join(outDir, 'mobile-activity-audit.json')} + .md ; screenshots in ${shotsDir}`);

  process.exit(failCount === 0 ? 0 : 1);
}

main().catch((e) => { console.error('CRASH:', e); process.exit(2); });
