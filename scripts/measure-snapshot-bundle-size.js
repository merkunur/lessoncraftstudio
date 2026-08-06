#!/usr/bin/env node
/*
 * measure-snapshot-bundle-size.js
 *
 * Empirical bundle-size data for the 3 snapshot-emitting apps after
 * snapshot-compression landed (image-references-v3, q85 WebP per piece).
 * Drives each app's UI to varying piece counts, records the inline-mode
 * bundle JSON size, and prints a comparison table.
 *
 * The user's spec asks for 5/10/15/20 pieces for alphabet-train and
 * pattern-train, single measurement for math-puzzle. Some apps' UIs cap
 * the achievable piece count below 20 — we measure across the achievable
 * range and report what the cap is.
 *
 * Reference mode is included for completeness; for these apps the
 * snapshot bytes dominate so reference shrinks the JPEG-snapshot portion
 * but not the pieces.
 *
 * Usage: node scripts/measure-snapshot-bundle-size.js
 * Requires: dev server on :3000 (sitemap disabled per CLAUDE.md §14.5).
 */

'use strict';

const path = require('path');
const fs = require('fs');
const { chromium } = require(path.join(__dirname, '..', 'frontend', 'node_modules', 'playwright'));

const BASE_URL = 'http://localhost:3000';

// Each variant says: how to set the UI inputs to produce a target piece count.
// "label" is a hint for the table; "actual piece count" comes from the bundle.
const APPS = {
    'alphabet-train': {
        url: '/worksheet-generators/alphabet-train.html',
        async setupBase(page) {
            await page.waitForFunction(() => {
                const sel = document.getElementById('themeSelect');
                return sel && Array.from(sel.options).some(o => o.value === 'animals');
            }, { timeout: 30000 });
            await page.waitForFunction(() => document.querySelectorAll('#dictionary .dictionary-item').length > 0, { timeout: 30000 });
        },
        async configure(page, variant) {
            // alphabet-train: clueCount is INVERSE to piece count (pieces =
            // alphabet length − clueCount). Default alphabet length is 11
            // (A–K), max clueCount=11, min=3. So pieces range is 0..8.
            await page.evaluate((cc) => {
                const inp = document.getElementById('clueCount');
                inp.value = String(cc);
                inp.dispatchEvent(new Event('input', { bubbles: true }));
                inp.dispatchEvent(new Event('change', { bubbles: true }));
            }, variant.clueCount);
            // Click N items so dictionary selection meets the count requirement
            await page.evaluate((cc) => {
                const items = Array.from(document.querySelectorAll('#dictionary .dictionary-item'));
                // First clear any existing selections by clicking selected items
                items.forEach(it => { if (it.classList.contains('selected')) it.click(); });
                // Then click cc items
                for (let i = 0; i < cc && i < items.length; i++) items[i].click();
            }, variant.clueCount);
        },
        // Hit the natural ceiling: clueCount range 3..10 gives pieces ~8..1
        variants: [
            { label: 'clueCount=3 (max pieces)',  clueCount: 3 },
            { label: 'clueCount=5',                clueCount: 5 },
            { label: 'clueCount=7',                clueCount: 7 },
            { label: 'clueCount=10 (min pieces)', clueCount: 10 },
        ],
        generateBtn: 'generateWorksheetBtn',
        downloadBtn: 'downloadInteractiveHtmlBtn',
    },
    'pattern-train': {
        url: '/worksheet-generators/pattern-train.html',
        async setupBase(page) {
            await page.waitForFunction(() => {
                const sel = document.getElementById('worksheetThemeSelect');
                return sel && Array.from(sel.options).some(o => o.value === 'animals');
            }, { timeout: 30000 });
            await page.evaluate(() => {
                const sel = document.getElementById('worksheetThemeSelect');
                sel.value = 'animals';
                sel.dispatchEvent(new Event('change', { bubbles: true }));
            });
            await page.waitForFunction(() => {
                const sel = document.getElementById('patternSelect');
                return sel && sel.options.length > 0;
            }, { timeout: 30000 });
        },
        async configure(page, variant) {
            // pattern-train: patternSelect determines pattern length. Each
            // unique letter in the pattern becomes a piece in the palette.
            await page.evaluate((p) => {
                const sel = document.getElementById('patternSelect');
                if (Array.from(sel.options).some(o => o.value === p)) {
                    sel.value = p;
                    sel.dispatchEvent(new Event('change', { bubbles: true }));
                }
            }, variant.pattern);
        },
        variants: [
            // Patterns from the pattern dropdown — increasing number of unique letters
            { label: 'AB (2 unique)',     pattern: 'ABAB' },
            { label: 'ABC (3 unique)',    pattern: 'ABCABC' },
            { label: 'ABCD (4 unique)',   pattern: 'ABCDABCD' },
            { label: 'ABCDE (5 unique)',  pattern: 'ABCDEABCDE' },
        ],
        generateBtn: 'generateWorksheetBtn',
        downloadBtn: 'downloadInteractiveHtmlBtn',
    },
    'math-puzzle': {
        url: '/worksheet-generators/math-puzzle.html',
        async setupBase(page) {
            await page.waitForFunction(() => {
                const sel = document.getElementById('themeSelect');
                return sel && Array.from(sel.options).some(o => o.value === 'animals');
            }, { timeout: 30000 });
            await page.waitForFunction(() => document.querySelectorAll('#dictionary .dictionary-item').length > 0, { timeout: 30000 });
            await page.evaluate(() => {
                const items = Array.from(document.querySelectorAll('#dictionary .dictionary-item'));
                if (items.length > 0) items[0].click();
            });
        },
        async configure(page, variant) {
            await page.evaluate((v) => {
                const r = document.getElementById('rowInput');
                const c = document.getElementById('colInput');
                r.value = String(v.rows); r.dispatchEvent(new Event('input', { bubbles: true }));
                c.value = String(v.cols); c.dispatchEvent(new Event('input', { bubbles: true }));
            }, variant);
        },
        variants: [
            { label: '2×2 (4 pieces)', rows: 2, cols: 2 },
            { label: '3×3 (9 pieces)', rows: 3, cols: 3 },
            { label: '4×4 (16 pieces)', rows: 4, cols: 4 },
        ],
        generateBtn: 'generateWorksheetBtn',
        downloadBtn: 'downloadInteractiveHtmlBtn',
    },
};

async function measureOne(browser, appName, variant) {
    const cfg = APPS[appName];
    const ctx = await browser.newContext({ acceptDownloads: true, viewport: { width: 1280, height: 800 } });
    const page = await ctx.newPage();
    page.on('pageerror', e => console.log('  [pageerror] ' + e.message));
    await page.goto(BASE_URL + cfg.url, { waitUntil: 'networkidle' });
    await cfg.setupBase(page);
    await cfg.configure(page, variant);

    const baseline = await page.evaluate(() => window.__lcsGenerationCounter || 0);
    await page.evaluate(id => document.getElementById(id).click(), cfg.generateBtn);
    await page.waitForFunction(b => (window.__lcsGenerationCounter || 0) > b, baseline, { timeout: 60000 });
    await page.waitForFunction(id => {
        const b = document.getElementById(id);
        return b && !b.disabled;
    }, cfg.downloadBtn, { timeout: 30000 });

    const [download] = await Promise.all([
        page.waitForEvent('download', { timeout: 60000 }),
        page.evaluate(id => document.getElementById(id).click(), cfg.downloadBtn),
    ]);
    const tmp = path.join(require('os').tmpdir(), 'measure-' + appName + '-' + Date.now() + '.html');
    await download.saveAs(tmp);
    await ctx.close();

    const html = fs.readFileSync(tmp, 'utf8');
    const m = html.match(/var DECK_BUNDLE = (\{[\s\S]+?\});<\/script>/);
    if (!m) throw new Error('no DECK_BUNDLE in ' + tmp);
    const bundle = JSON.parse(m[1]);
    return {
        app: appName,
        label: variant.label,
        actualPieces: Array.isArray(bundle.pieces) ? bundle.pieces.length : 0,
        htmlBytes: fs.statSync(tmp).size,
        bundleBytes: m[1].length,
        loadingMode: bundle.loadingMode,
        snapshotMode: bundle.snapshotMode,
    };
}

(async () => {
    const browser = await chromium.launch({ headless: true });
    const rows = [];
    try {
        for (const appName of Object.keys(APPS)) {
            console.log('\n--- ' + appName + ' ---');
            for (const v of APPS[appName].variants) {
                try {
                    const r = await measureOne(browser, appName, v);
                    console.log('  ' + v.label.padEnd(28) + ' pieces=' + String(r.actualPieces).padEnd(3) +
                                ' html=' + (r.htmlBytes/1024).toFixed(0).padStart(5) + ' KB' +
                                ' bundle=' + (r.bundleBytes/1024).toFixed(0).padStart(5) + ' KB' +
                                ' (snapshot=' + r.snapshotMode + ')');
                    rows.push(r);
                } catch (e) {
                    console.log('  ' + v.label.padEnd(28) + ' FAIL: ' + e.message.split('\n')[0]);
                }
            }
        }
    } finally {
        await browser.close();
    }

    // Summary table
    console.log('\n=========================== SUMMARY ===========================');
    console.log('App              Variant                          Pieces   HTML KB  Bundle KB');
    console.log('---------------------------------------------------------------------------');
    rows.forEach(r => {
        console.log(
            r.app.padEnd(17) +
            r.label.padEnd(33) +
            String(r.actualPieces).padStart(6) + '   ' +
            String(Math.round(r.htmlBytes/1024)).padStart(7) + '   ' +
            String(Math.round(r.bundleBytes/1024)).padStart(8)
        );
    });
    console.log('---------------------------------------------------------------------------');
    const overCeiling = rows.filter(r => r.htmlBytes > 5 * 1024 * 1024);
    console.log('Over 5 MB ceiling: ' + overCeiling.length + ' / ' + rows.length);
    if (overCeiling.length > 0) {
        overCeiling.forEach(r => console.log('  ✗ ' + r.app + ' / ' + r.label + ' (' + r.actualPieces + ' pieces, ' + Math.round(r.htmlBytes/1024) + ' KB)'));
    }
})().catch(e => { console.error('FATAL: ' + (e.stack || e.message)); process.exit(1); });
