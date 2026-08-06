#!/usr/bin/env node
/*
 * verify-addition-webp-pipeline.js
 *
 * End-to-end verification of the bundle v5 / WebP-overlay pipeline for the
 * addition app pilot. Drives a real Chromium via Playwright:
 *
 *   1. Loads http://localhost:3000/worksheet-generators/addition.html
 *   2. Picks the "animals" theme, sets problem count = 6, clicks Generate
 *   3. Waits for the canvas to populate
 *   4. Clicks Download → Interactive Worksheet (HTML), captures the file
 *   5. Asserts the bundle JSON shape (v5 schema, imageRefs map populated, per-problem imageRefs)
 *   6. Loads the standalone HTML in a fresh page and inspects the runtime
 *      DOM at three viewports (desktop 100%, desktop 200% sim via DPR, mobile)
 *      to confirm variant selection picks the right @1x/@2x/@3x at each.
 *
 * Requires:  the Next dev server running on :3000 with the sitemap rename
 *            applied (per CLAUDE.md §14.5)
 *
 * Run:       node scripts/verify-addition-webp-pipeline.js
 */

'use strict';

const path = require('path');
const fs = require('fs');
const { chromium } = require(path.join(__dirname, '..', 'frontend', 'node_modules', 'playwright'));

const APP_URL = 'http://localhost:3000/worksheet-generators/addition.html';

function fail(msg) { console.error('❌ FAIL: ' + msg); process.exit(1); }
function ok(msg)   { console.log('✓ ' + msg); }

(async () => {
    const browser = await chromium.launch({ headless: true });
    const ctx = await browser.newContext({ acceptDownloads: true });
    const page = await ctx.newPage();
    page.on('console', m => {
        const t = m.type();
        if (t === 'error' || t === 'warning') console.log('[browser ' + t + '] ' + m.text());
    });
    page.on('pageerror', e => console.log('[pageerror] ' + e.message));

    console.log('\n[1/6] Loading ' + APP_URL);
    await page.goto(APP_URL, { waitUntil: 'networkidle' });
    ok('addition.html loaded');

    // Sanity: the new shared module loaded
    const hasModule = await page.evaluate(() => typeof window.LCSImageRef === 'object' && typeof window.LCSImageRef.normalizeKey === 'function');
    if (!hasModule) fail('window.LCSImageRef not present — image-reference.js did not load');
    ok('LCSImageRef global is present');

    // Pick theme = "animals", problem count = 6
    console.log('\n[2/6] Configuring worksheet (theme=animals, count=6)');
    await page.waitForSelector('#themeSelect option[value="animals"]', { timeout: 15000, state: 'attached' });
    // The sidebar panel containing #themeSelect may be collapsed in headless;
    // set the value programmatically and fire 'change' to trigger loadDictionary.
    await page.evaluate(() => {
        const sel = document.getElementById('themeSelect');
        sel.value = 'animals';
        sel.dispatchEvent(new Event('change', { bubbles: true }));
    });
    // Wait for /api/images to populate the dictionary (visible signal that
    // the theme-load fetch has resolved and images are available to the
    // generator). allImages is closure-scoped in the app, not on window.
    await page.waitForFunction(() => document.querySelectorAll('#dictionary .dictionary-item').length > 0, { timeout: 30000 });
    await page.evaluate(() => {
        const inp = document.getElementById('problemCount');
        inp.value = '6';
        inp.dispatchEvent(new Event('input', { bubbles: true }));
        inp.dispatchEvent(new Event('change', { bubbles: true }));
    });
    ok('theme + count set');

    console.log('\n[3/6] Clicking Generate');
    // Generate button is also nested in a dropdown; trigger via JS
    await page.evaluate(() => document.getElementById('generateWorksheetBtn').click());
    // Wait for the download button to become enabled (the post-generate hook
    // un-disables it — see line ~3681 of addition.html)
    // Button lives inside a dropdown that is hidden until hovered/focused;
    // wait on the disabled-attribute change without requiring visibility.
    await page.waitForFunction(() => {
        const b = document.getElementById('downloadInteractiveHtmlBtn');
        return b && !b.disabled;
    }, { timeout: 60000 });
    ok('worksheet generated (download button enabled)');

    // Sanity: canvas has problemsData populated
    const probCount = await page.evaluate(() => (window.worksheetCanvas && window.worksheetCanvas.problemsData) ? window.worksheetCanvas.problemsData.length : -1);
    console.log('  canvas.problemsData length: ' + probCount);

    console.log('\n[4/6] Triggering interactive-HTML download');
    const [download] = await Promise.all([
        page.waitForEvent('download', { timeout: 60000 }),
        page.evaluate(() => document.getElementById('downloadInteractiveHtmlBtn').click()),
    ]);
    const tmpPath = path.join(require('os').tmpdir(), 'addition_interactive_test_' + Date.now() + '.html');
    await download.saveAs(tmpPath);
    const html = fs.readFileSync(tmpPath, 'utf8');
    ok('downloaded ' + (html.length / 1024).toFixed(1) + ' KB to ' + tmpPath);

    // Extract the embedded bundle JSON (between var DECK_BUNDLE = and ;</script>)
    const bundleMatch = html.match(/var DECK_BUNDLE = (\{[\s\S]+?\});<\/script>/);
    if (!bundleMatch) fail('could not locate DECK_BUNDLE in downloaded HTML');
    let bundle;
    try { bundle = JSON.parse(bundleMatch[1]); } catch (e) { fail('DECK_BUNDLE parse failed: ' + e.message); }

    console.log('\n[5/6] Validating bundle shape');
    if (bundle.bundleVersion !== '5.0.0') fail('bundleVersion expected "5.0.0", got ' + JSON.stringify(bundle.bundleVersion));
    ok('bundleVersion = 5.0.0');
    if (bundle.schemaFormat !== 'image-references-v1') fail('schemaFormat expected "image-references-v1", got ' + JSON.stringify(bundle.schemaFormat));
    ok('schemaFormat = image-references-v1');
    if (!bundle.imageRefs || typeof bundle.imageRefs !== 'object') fail('bundle.imageRefs missing');
    const refKeys = Object.keys(bundle.imageRefs);
    if (refKeys.length === 0) fail('bundle.imageRefs is empty — no images embedded');
    ok('bundle.imageRefs has ' + refKeys.length + ' unique (theme,key) entries');
    const sampleEntry = bundle.imageRefs[refKeys[0]];
    const sampleVariants = Object.keys(sampleEntry.variants || {});
    console.log('  sample entry "' + refKeys[0] + '" variants: ' + sampleVariants.join(', '));
    // In dev, /api/images may return images for which the full-library WebP
    // doesn't exist (the dev API serves from frontend/public/images/, a
    // subset; the WebP library was generated from the full image library/).
    // So entries with empty variants are expected in dev — find the first
    // non-empty entry to validate the embedding shape.
    const nonEmpty = refKeys.find(k => Object.keys(bundle.imageRefs[k].variants || {}).length > 0);
    const emptyCount = refKeys.filter(k => Object.keys(bundle.imageRefs[k].variants || {}).length === 0).length;
    if (!nonEmpty) fail('every imageRefs entry has empty variants — embedding pipeline is broken');
    const goodEntry = bundle.imageRefs[nonEmpty];
    const goodVariants = Object.keys(goodEntry.variants);
    console.log('  validating shape via "' + nonEmpty + '" with variants: ' + goodVariants.join(', '));
    goodVariants.forEach(v => {
        if (!goodEntry.variants[v].startsWith('data:image/webp;base64,')) fail('variant ' + v + ' is not a base64 WebP data URL');
    });
    ok('embedded variants are base64 WebP data URLs');
    if (emptyCount > 0) console.log('  NOTE: ' + emptyCount + ' of ' + refKeys.length + ' entries have empty variants (dev subset mismatch — expected; production has full library)');
    if (!Array.isArray(bundle.problems) || bundle.problems.length === 0) fail('bundle.problems missing or empty');
    const totalImageRefs = bundle.problems.reduce((s, p) => s + ((p.imageRefs || []).length), 0);
    console.log('  problems: ' + bundle.problems.length + ', total image placements across all problems: ' + totalImageRefs);
    if (totalImageRefs === 0) fail('no problem.imageRefs entries — overlay rendering will be a no-op');
    ok('per-problem imageRefs populated');

    // Sanity: the bundle's total size
    const bundleBytes = bundleMatch[1].length;
    console.log('  bundle JSON size: ' + (bundleBytes / 1024).toFixed(1) + ' KB');
    if (bundleBytes > 5 * 1024 * 1024) console.warn('  WARN: bundle exceeds 5 MB CLAUDE.md hard ceiling');

    // Diagnostic: enumerate every ref each problem uses and check it against the imageRefs map.
    console.log('  imageRefs keys: ' + JSON.stringify(refKeys));
    bundle.problems.forEach((p, i) => {
        const refs = (p.imageRefs || []).map(r => r.theme + '/' + r.key);
        const uniq = Array.from(new Set(refs));
        const missing = uniq.filter(k => !bundle.imageRefs[k]);
        console.log('  problem[' + i + '] mode=' + p.resolvedMode + ' opA=' + p.operandA + ' opB=' + p.operandB + ' placements=' + refs.length + ' uniq=[' + uniq.join(', ') + ']' + (missing.length ? ' MISSING_FROM_IMAGEREFS=[' + missing.join(', ') + ']' : ''));
    });

    console.log('\n[6/6] Loading standalone HTML in three viewports to verify variant selection');
    const fileURL = 'file:///' + tmpPath.replace(/\\/g, '/');

    async function inspectAt(label, viewport, dpr) {
        const ctx2 = await browser.newContext({ viewport: viewport, deviceScaleFactor: dpr });
        const p2 = await ctx2.newPage();
        p2.on('pageerror', e => console.log('  [' + label + ' pageerror] ' + e.message));
        await p2.goto(fileURL, { waitUntil: 'networkidle' });
        // Wait for renderSlots to run (it's gated on the worksheet img loading)
        await p2.waitForFunction(() => document.querySelectorAll('img.lcs-img-overlay').length > 0, { timeout: 10000 });
        const overlays = await p2.evaluate(() => {
            const els = Array.from(document.querySelectorAll('img.lcs-img-overlay'));
            return els.map(el => ({
                ref: el.getAttribute('data-image-ref'),
                variant: el.dataset.variant,
                widthCss: el.getBoundingClientRect().width,
                hasSrc: el.src.startsWith('data:image/webp')
            }));
        });
        await ctx2.close();
        if (overlays.length === 0) {
            console.log('  ' + label + ': no overlays rendered');
            return null;
        }
        const sample = overlays.slice(0, 3);
        const variantCounts = overlays.reduce((acc, o) => { acc[o.variant || 'none'] = (acc[o.variant || 'none'] || 0) + 1; return acc; }, {});
        console.log('  ' + label + ' (vp ' + viewport.width + 'x' + viewport.height + ', DPR ' + dpr + '):');
        console.log('    total overlays: ' + overlays.length + ', variant distribution: ' + JSON.stringify(variantCounts));
        sample.forEach((s, i) => {
            const eff = (s.widthCss * dpr).toFixed(0);
            console.log('    [' + i + '] ref=' + s.ref + ' display=' + s.widthCss.toFixed(1) + 'px DPR=' + dpr + ' eff=' + eff + 'px → variant=' + s.variant + ' src=' + (s.hasSrc ? 'embedded WebP' : 'MISSING'));
        });
        // Validate variant selection ONLY on overlays whose ref was actually
        // embedded — overlays whose ref had empty variants (dev subset
        // mismatch) correctly have variant=undefined and no src, falling back
        // to the JPEG backdrop. Validating those would punish graceful degradation.
        const embeddedRefs = new Set(Object.keys(bundle.imageRefs).filter(k => Object.keys(bundle.imageRefs[k].variants || {}).length > 0));
        let validated = 0, mismatches = 0, gracefullySkipped = 0;
        for (const o of overlays) {
            if (!embeddedRefs.has(o.ref)) { gracefullySkipped++; continue; }
            const eff = o.widthCss * dpr;
            const expected = eff <= 512 ? '1x' : eff <= 1024 ? '2x' : '3x';
            if (o.variant !== expected) {
                console.log('    ❌ MISMATCH: ref=' + o.ref + ' eff=' + eff.toFixed(0) + 'px expected ' + expected + ' got ' + o.variant);
                mismatches++;
            } else {
                validated++;
            }
        }
        console.log('    validated: ' + validated + ', mismatches: ' + mismatches + ', gracefully skipped (no embedded variants): ' + gracefullySkipped);
        return mismatches === 0 && validated > 0;
    }

    const r1 = await inspectAt('Desktop 100% (1280x800, DPR 1)',  { width: 1280, height: 800 }, 1);
    const r2 = await inspectAt('Desktop 200% sim (1280x800, DPR 2)', { width: 1280, height: 800 }, 2);
    const r3 = await inspectAt('Mobile (390x844, DPR 3)',       { width: 390,  height: 844 }, 3);

    await browser.close();
    if (r1 === false || r2 === false || r3 === false) fail('variant selection mismatched in at least one viewport');
    if (r1 === null || r2 === null || r3 === null) fail('overlays did not render in at least one viewport');
    ok('variant selection correct across all three viewports');

    console.log('\nAll checks passed.');
    console.log('Downloaded HTML kept for inspection at: ' + tmpPath);
})().catch(e => { console.error('\n❌ FATAL: ' + (e.stack || e.message)); process.exit(2); });
