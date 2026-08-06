#!/usr/bin/env node
/*
 * verify-webp-pipeline.js
 *
 * End-to-end verification of the bundle v5+ WebP-overlay pipeline for any
 * worksheet-generator app that has been wired through the LCSImageRef +
 * dual-mode loader pattern.
 *
 * Usage:
 *   node scripts/verify-webp-pipeline.js <appName>
 *
 * Where <appName> is a configured app key (currently: addition, prepositions).
 *
 * Per app it runs the following checks against a live dev server on :3000:
 *   1. App page loads, LCSImageRef is present
 *   2. INLINE mode end-to-end:
 *        generate worksheet → click inline download button → load standalone
 *        HTML → assert bundle shape (loadingMode=inline, all variants are
 *        data: URLs) → at three viewports, assert variant selection is correct
 *   3. REFERENCE mode end-to-end:
 *        generate worksheet → click reference download button → load HTML
 *        served via http:// (so relative URLs resolve) → assert bundle shape
 *        (loadingMode=reference, all variants are URL strings) → at three
 *        viewports, assert variant selection is correct
 *   4. SYNTHETIC variant tests:
 *        artificially resize a sample of overlays to small/medium/large CSS
 *        widths and confirm the variant flips through @1x/@2x/@3x at the
 *        expected thresholds. Catches threshold regressions even when the
 *        app's natural sizes don't cross them.
 *
 * Exit code 0 on success, non-zero on any check failure.
 */

'use strict';

const path = require('path');
const fs = require('fs');
const http = require('http');
const { chromium } = require(path.join(__dirname, '..', 'frontend', 'node_modules', 'playwright'));

const PORT = 3000;
const BASE_URL = 'http://localhost:' + PORT;

/* ========================================================================
 * App configurations — each one tells the verifier how to drive that app's
 * UI through the generate + download flow without dependence on visible
 * widgets (most controls live in collapsible sidebars that headless can't
 * see). The setup function runs in the page context and configures the
 * worksheet for a "small but representative" deck.
 * ====================================================================== */
const APPS = {
    addition: {
        url: '/worksheet-generators/addition.html',
        downloadFileBaseName: 'addition_interactive',
        // Returns true when the dictionary fetch has resolved
        dictionaryReady: () => document.querySelectorAll('#dictionary .dictionary-item').length > 0,
        async setup(page) {
            await page.evaluate(() => {
                document.getElementById('themeSelect').value = 'animals';
                document.getElementById('themeSelect').dispatchEvent(new Event('change', { bubbles: true }));
            });
            await page.waitForFunction(APPS.addition.dictionaryReady, { timeout: 30000 });
            await page.evaluate(() => {
                const inp = document.getElementById('problemCount');
                inp.value = '6';
                inp.dispatchEvent(new Event('input', { bubbles: true }));
            });
        },
        generateBtn: 'generateWorksheetBtn',
        downloadBtnInline: 'downloadInteractiveHtmlBtn',
        downloadBtnReference: 'downloadInteractiveHtmlReferenceBtn',
    },
    'alphabet-train': {
        url: '/worksheet-generators/alphabet-train.html',
        downloadFileBaseName: 'alphabet-train_interactive',
        async setup(page) {
            // alphabet-train auto-loads animals theme on init. Wait for the
            // dictionary, then auto-assign images to letters via clicking
            // dictionary items. Set clueCount=3 (the minimum, gives 3 clues
            // and lets remaining wagons be empty drop targets).
            await page.waitForFunction(() => {
                const sel = document.getElementById('themeSelect');
                return sel && sel.options && sel.options.length > 0;
            }, { timeout: 30000 });
            await page.waitForFunction(() => document.querySelectorAll('#dictionary .dictionary-item').length > 0, { timeout: 30000 });
            await page.evaluate(() => {
                const inp = document.getElementById('clueCount');
                inp.value = '3';
                inp.dispatchEvent(new Event('input', { bubbles: true }));
                inp.dispatchEvent(new Event('change', { bubbles: true }));
            });
            // Click 3 dictionary items so 3 letters get clue images assigned.
            await page.evaluate(() => {
                const items = Array.from(document.querySelectorAll('#dictionary .dictionary-item'));
                for (let i = 0; i < 3 && i < items.length; i++) items[i].click();
            });
        },
        generateBtn: 'generateWorksheetBtn',
        downloadBtnInline: 'downloadInteractiveHtmlBtn',
        downloadBtnReference: 'downloadInteractiveHtmlReferenceBtn',
    },
    'subtraction': {
        url: '/worksheet-generators/subtraction.html',
        downloadFileBaseName: 'subtraction_interactive',
        async setup(page) {
            await page.waitForFunction(() => {
                const sel = document.getElementById('themeSelect');
                return sel && Array.from(sel.options).some(o => o.value === 'animals');
            }, { timeout: 30000 });
            await page.evaluate(() => {
                const sel = document.getElementById('themeSelect');
                sel.value = 'animals';
                sel.dispatchEvent(new Event('change', { bubbles: true }));
            });
            await page.waitForFunction(() => document.querySelectorAll('#dictionary .dictionary-item').length > 0, { timeout: 30000 });
            await page.evaluate(() => {
                const inp = document.getElementById('problemCount');
                inp.value = '6';
                inp.dispatchEvent(new Event('input', { bubbles: true }));
            });
        },
        generateBtn: 'generateWorksheetBtn',
        downloadBtnInline: 'downloadInteractiveHtmlBtn',
        downloadBtnReference: 'downloadInteractiveHtmlReferenceBtn',
    },
    'more-less': {
        url: '/worksheet-generators/more-less.html',
        downloadFileBaseName: 'more-less_interactive',
        async setup(page) {
            // more-less uses two theme selects: themeDict (for the dictionary
            // browse panel) and themeWorksheet (for auto-pick during generate).
            // Switch image-selection mode to 'theme' so the app auto-picks
            // images instead of waiting for manual dictionary selections.
            await page.waitForFunction(() => {
                const m = document.getElementById('imageSelectionModeSelect');
                return m && Array.from(m.options).some(o => o.value === 'theme');
            }, { timeout: 30000 });
            await page.evaluate(() => {
                const m = document.getElementById('imageSelectionModeSelect');
                m.value = 'theme';
                m.dispatchEvent(new Event('change', { bubbles: true }));
            });
            await page.waitForFunction(() => {
                const sel = document.getElementById('themeWorksheet');
                return sel && Array.from(sel.options).some(o => o.value === 'animals');
            }, { timeout: 30000 });
            await page.evaluate(() => {
                const sel = document.getElementById('themeWorksheet');
                sel.value = 'animals';
                sel.dispatchEvent(new Event('change', { bubbles: true }));
                const inp = document.getElementById('problemCountInput');
                if (inp) { inp.value = '4'; inp.dispatchEvent(new Event('input', { bubbles: true })); }
            });
        },
        generateBtn: 'generateWorksheetBtn',
        downloadBtnInline: 'downloadInteractiveHtmlBtn',
        downloadBtnReference: 'downloadInteractiveHtmlReferenceBtn',
    },
    'word-guess': {
        url: '/worksheet-generators/word-guess.html',
        downloadFileBaseName: 'word-guess_interactive',
        async setup(page) {
            await page.waitForFunction(() => {
                const sel = document.getElementById('themeSelect');
                return sel && Array.from(sel.options).some(o => o.value === 'animals');
            }, { timeout: 30000 });
            await page.evaluate(() => {
                const sel = document.getElementById('themeSelect');
                sel.value = 'animals';
                sel.dispatchEvent(new Event('change', { bubbles: true }));
            });
            await page.waitForFunction(() => document.querySelectorAll('#dictionary .dictionary-item, #dict .dictionary-item').length > 0, { timeout: 30000 });
        },
        generateBtn: 'generateWorksheetBtn',
        downloadBtnInline: 'downloadInteractiveHtmlBtn',
        downloadBtnReference: 'downloadInteractiveHtmlReferenceBtn',
    },
    'big-small': {
        url: '/worksheet-generators/big-small.html',
        downloadFileBaseName: 'big-small_interactive',
        async setup(page) {
            // big-small auto-picks images from worksheetThemeSelect when no
            // explicit dictionary picks are made.
            await page.waitForFunction(() => {
                const sel = document.getElementById('worksheetThemeSelect');
                return sel && Array.from(sel.options).some(o => o.value === 'animals');
            }, { timeout: 30000 });
            await page.evaluate(() => {
                const sel = document.getElementById('worksheetThemeSelect');
                sel.value = 'animals';
                sel.dispatchEvent(new Event('change', { bubbles: true }));
                const inp = document.getElementById('problemCount');
                if (inp) { inp.value = '3'; inp.dispatchEvent(new Event('input', { bubbles: true })); }
            });
        },
        generateBtn: 'generateWorksheetBtn',
        downloadBtnInline: 'downloadInteractiveHtmlBtn',
        downloadBtnReference: 'downloadInteractiveHtmlReferenceBtn',
    },
    'code-addition': {
        url: '/worksheet-generators/code-addition.html',
        downloadFileBaseName: 'code-addition_interactive',
        async setup(page) {
            // Capture page errors during init
            const pageErrors = [];
            page.on('pageerror', e => pageErrors.push(e.message));
            try {
                await page.waitForFunction(() => {
                    const sel = document.getElementById('themeSelect');
                    return sel && Array.from(sel.options).some(o => o.value === 'animals');
                }, { timeout: 30000 });
            } catch (e) {
                const diag = await page.evaluate(() => {
                    const sel = document.getElementById('themeSelect');
                    return { selExists: !!sel, optCount: sel ? sel.options.length : -1, optValues: sel ? Array.from(sel.options).map(o => o.value).slice(0, 12) : [], pageErrors: 'see below' };
                }).catch(() => ({ evalFailed: true }));
                console.log('  code-addition themeSelect diag: ' + JSON.stringify(diag));
                console.log('  page errors during init: ' + JSON.stringify(pageErrors.slice(0, 3)));
                throw e;
            }
            await page.evaluate(() => {
                const sel = document.getElementById('themeSelect');
                sel.value = 'animals';
                sel.dispatchEvent(new Event('change', { bubbles: true }));
            });
            // code-addition uses .thumbnail-item, not .dictionary-item.
            await page.waitForFunction(() => document.querySelectorAll('#dictionary .thumbnail-item, #dictionary .dictionary-item').length > 0, { timeout: 30000 });
        },
        generateBtn: 'generateWorksheetBtn',
        downloadBtnInline: 'downloadInteractiveHtmlBtn',
        downloadBtnReference: 'downloadInteractiveHtmlReferenceBtn',
    },
    'math-worksheet': {
        url: '/worksheet-generators/math-worksheet.html',
        downloadFileBaseName: 'math-worksheet_interactive',
        async setup(page) {
            // math-worksheet has dual-mode picker. Switch to 'theme' radio
            // and pick animals so it auto-fetches images.
            await page.waitForFunction(() => {
                const sel = document.getElementById('worksheetImageTheme');
                return sel && Array.from(sel.options).some(o => o.value === 'animals');
            }, { timeout: 30000 });
            await page.evaluate(() => {
                const radio = document.getElementById('selectTheme');
                if (radio) { radio.checked = true; radio.dispatchEvent(new Event('change', { bubbles: true })); }
                const sel = document.getElementById('worksheetImageTheme');
                sel.value = 'animals';
                sel.dispatchEvent(new Event('change', { bubbles: true }));
            });
        },
        generateBtn: 'generateWorksheetBtn',
        downloadBtnInline: 'downloadInteractiveHtmlBtn',
        downloadBtnReference: 'downloadInteractiveHtmlReferenceBtn',
    },
    'word-scramble': {
        url: '/worksheet-generators/word-scramble.html',
        downloadFileBaseName: 'word-scramble_interactive',
        async setup(page) {
            await page.waitForFunction(() => {
                const sel = document.getElementById('themeSelect');
                return sel && Array.from(sel.options).some(o => o.value === 'animals');
            }, { timeout: 30000 });
            await page.evaluate(() => {
                const sel = document.getElementById('themeSelect');
                sel.value = 'animals';
                sel.dispatchEvent(new Event('change', { bubbles: true }));
            });
            await page.waitForFunction(() => document.querySelectorAll('#dictionary .dictionary-item, #dict .dictionary-item, #dictionary .thumbnail-item').length > 0, { timeout: 30000 });
        },
        generateBtn: 'generateWorksheetBtn',
        downloadBtnInline: 'downloadInteractiveHtmlBtn',
        downloadBtnReference: 'downloadInteractiveHtmlReferenceBtn',
    },
    // math-puzzle: snapshot-dominated app. Wired only for snapshot
    // compression (v3 schema). No reference-mode dual-download button —
    // its bundle is generated-content, not library-image-driven, so
    // reference mode wouldn't help even if it existed.
    'math-puzzle': {
        url: '/worksheet-generators/math-puzzle.html',
        downloadFileBaseName: 'math-puzzle_interactive',
        async setup(page) {
            await page.waitForFunction(() => {
                const sel = document.getElementById('themeSelect');
                return sel && Array.from(sel.options).some(o => o.value === 'animals');
            }, { timeout: 30000 });
            await page.waitForFunction(() => document.querySelectorAll('#dictionary .dictionary-item').length > 0, { timeout: 30000 });
            // Click first dictionary item to satisfy selectedImage requirement
            await page.evaluate(() => {
                const items = Array.from(document.querySelectorAll('#dictionary .dictionary-item'));
                if (items.length > 0) items[0].click();
            });
        },
        generateBtn: 'generateWorksheetBtn',
        downloadBtnInline: 'downloadInteractiveHtmlBtn',
        skipReferenceMode: true, // no dual-download wiring; snapshot-only app
    },
    'cryptogram': {
        url: '/worksheet-generators/cryptogram.html',
        downloadFileBaseName: 'cryptogram_interactive',
        async setup(page) {
            // cryptogram defaults to theme 'alphabet'. Wait for themeSelect
            // to populate, then leave default — alphabet content is text-based.
            await page.waitForFunction(() => {
                const sel = document.getElementById('themeSelect');
                return sel && sel.options.length > 0;
            }, { timeout: 30000 });
        },
        generateBtn: 'generateBtn',
        downloadBtnInline: 'downloadInteractiveHtmlBtn',
        downloadBtnReference: 'downloadInteractiveHtmlReferenceBtn',
    },
    'wordsearch': {
        url: '/worksheet-generators/wordsearch.html',
        downloadFileBaseName: 'wordsearch_interactive',
        async setup(page) {
            // wordsearch needs a theme selected so words are auto-picked.
            await page.waitForFunction(() => {
                const sel = document.getElementById('themeSelect');
                return sel && Array.from(sel.options).some(o => o.value === 'animals');
            }, { timeout: 30000 });
            await page.evaluate(() => {
                const sel = document.getElementById('themeSelect');
                sel.value = 'animals';
                sel.dispatchEvent(new Event('change', { bubbles: true }));
            });
            await page.waitForFunction(() => {
                const b = document.getElementById('generateWorksheetBtn');
                return b && !b.disabled;
            }, { timeout: 30000 });
        },
        generateBtn: 'generateWorksheetBtn',
        downloadBtnInline: 'downloadInteractiveHtmlBtn',
        downloadBtnReference: 'downloadInteractiveHtmlReferenceBtn',
    },
    'pattern-worksheet': {
        url: '/worksheet-generators/pattern-worksheet.html',
        downloadFileBaseName: 'pattern-worksheet_interactive',
        async setup(page) {
            // pattern-worksheet auto-fetches an animals theme on load.
            await page.waitForFunction(() => {
                const sel = document.getElementById('themeSelect');
                return sel && Array.from(sel.options).some(o => o.value === 'animals');
            }, { timeout: 30000 });
            await page.evaluate(() => {
                const sel = document.getElementById('themeSelect');
                sel.value = 'animals';
                sel.dispatchEvent(new Event('change', { bubbles: true }));
            });
            await page.waitForFunction(() => {
                const b = document.getElementById('generateWorksheetBtn');
                return b && !b.disabled;
            }, { timeout: 30000 });
        },
        generateBtn: 'generateWorksheetBtn',
        downloadBtnInline: 'downloadInteractiveHtmlBtn',
        downloadBtnReference: 'downloadInteractiveHtmlReferenceBtn',
    },
    'pattern-train': {
        url: '/worksheet-generators/pattern-train.html',
        downloadFileBaseName: 'pattern-train_interactive',
        async setup(page) {
            // pattern-train auto-picks images when worksheetThemeSelect is set.
            // Wait for the theme dropdown to populate, then choose 'animals'.
            await page.waitForFunction(() => {
                const sel = document.getElementById('worksheetThemeSelect');
                return sel && Array.from(sel.options).some(o => o.value === 'animals');
            }, { timeout: 30000 });
            await page.evaluate(() => {
                const sel = document.getElementById('worksheetThemeSelect');
                sel.value = 'animals';
                sel.dispatchEvent(new Event('change', { bubbles: true }));
            });
            // Wait for the generate button to enable
            await page.waitForFunction(() => {
                const b = document.getElementById('generateWorksheetBtn');
                return b && !b.disabled;
            }, { timeout: 30000 });
        },
        generateBtn: 'generateWorksheetBtn',
        downloadBtnInline: 'downloadInteractiveHtmlBtn',
        downloadBtnReference: 'downloadInteractiveHtmlReferenceBtn',
    },
    'find-and-count': {
        url: '/worksheet-generators/find-and-count.html',
        downloadFileBaseName: 'find_and_count_interactive',
        async setup(page) {
            // find-and-count auto-fetches an animals theme by default. Wait for
            // the dictionary to populate (.thumbnail-item, NOT .dictionary-item),
            // pick 2 distinct images, assign each a circle/cross task type.
            await page.waitForFunction(() => {
                const sel = document.getElementById('themeSelect');
                return sel && Array.from(sel.options).some(o => o.value === 'animals');
            }, { timeout: 30000 });
            await page.evaluate(() => {
                const sel = document.getElementById('themeSelect');
                sel.value = 'animals';
                sel.dispatchEvent(new Event('change', { bubbles: true }));
            });
            // The dictionary uses .dictionary-item (consistent with other apps).
            await page.waitForFunction(() => document.querySelectorAll('#dictionary .dictionary-item').length >= 2, { timeout: 30000 });
            // Click 2 dictionary items so they enter selectedImages.
            await page.evaluate(() => {
                const items = Array.from(document.querySelectorAll('#dictionary .dictionary-item'));
                for (let i = 0; i < 2 && i < items.length; i++) items[i].click();
            });
            // Set a small grid (5×5) so generation is fast.
            await page.evaluate(() => {
                const r = document.getElementById('gridRows');
                const c = document.getElementById('gridCols');
                if (r) { r.value = '5'; r.dispatchEvent(new Event('input', { bubbles: true })); }
                if (c) { c.value = '5'; c.dispatchEvent(new Event('input', { bubbles: true })); }
            });
            // Assign a task type to each selected image (the per-image select is
            // a <select> rendered in the selected-images sidebar). Default value
            // 'none' blocks generation; set the first to 'circle', second to 'cross'.
            await page.waitForFunction(() => {
                const selects = document.querySelectorAll('select[onchange*="updateSelectedImageType"], #selectedImagesContainer select');
                return selects.length >= 2;
            }, { timeout: 10000 }).catch(() => {});
            await page.evaluate(() => {
                // The task-type selects are inside selectedImagesContainer; each
                // <select> has options 'none','circle','square','cross','count'.
                const container = document.getElementById('selectedImagesContainer') || document;
                const selects = container.querySelectorAll('select');
                const types = ['circle', 'cross'];
                let i = 0;
                selects.forEach(sel => {
                    const opts = Array.from(sel.options).map(o => o.value);
                    if (opts.indexOf('circle') >= 0 && opts.indexOf('count') >= 0 && i < types.length) {
                        sel.value = types[i++];
                        sel.dispatchEvent(new Event('change', { bubbles: true }));
                    }
                });
            });
        },
        generateBtn: 'generateWorksheetBtn',
        downloadBtnInline: 'downloadInteractiveHtmlBtn',
        downloadBtnReference: 'downloadInteractiveHtmlReferenceBtn',
    },
    prepositions: {
        url: '/worksheet-generators/prepositions.html',
        downloadFileBaseName: 'prepositions_interactive',
        dictionaryReady: () => true,
        async setup(page) {
            // Prepositions requires manual item + shape selection before
            // generation works. Steps: switch to multiplechoice mode, set
            // count to a small number, then programmatically click N items
            // and N shapes from the dictionaries.
            await page.evaluate(() => {
                const mode = document.getElementById('exerciseModeSelect');
                mode.value = 'multiplechoice';
                mode.dispatchEvent(new Event('change', { bubbles: true }));
                const count = document.getElementById('exerciseCount');
                count.value = '3';
                count.dispatchEvent(new Event('input', { bubbles: true }));
                count.dispatchEvent(new Event('change', { bubbles: true }));
            });
            // Wait for the item dictionary to populate (default theme = animals)
            await page.waitForFunction(() => {
                const items = document.querySelectorAll('#dictionary .dictionary-item');
                return items.length >= 3;
            }, { timeout: 30000 });
            // Click 3 distinct items
            await page.evaluate(() => {
                const items = Array.from(document.querySelectorAll('#dictionary .dictionary-item'));
                for (let i = 0; i < 3 && i < items.length; i++) items[i].click();
            });
            // Wait for the shape dictionary
            await page.waitForFunction(() => {
                const items = document.querySelectorAll('#shapeDictionary .dictionary-item');
                return items.length >= 3;
            }, { timeout: 30000 }).catch(() => {});
            // Click 3 shapes
            await page.evaluate(() => {
                const items = Array.from(document.querySelectorAll('#shapeDictionary .dictionary-item'));
                for (let i = 0; i < 3 && i < items.length; i++) items[i].click();
            });
            // Re-assert mode = multiplechoice (item/shape selection may have
            // re-rendered controls that reset the dropdown)
            const finalMode = await page.evaluate(() => {
                const mode = document.getElementById('exerciseModeSelect');
                if (mode.value !== 'multiplechoice') {
                    mode.value = 'multiplechoice';
                    mode.dispatchEvent(new Event('change', { bubbles: true }));
                }
                return {
                    modeValue: mode.value,
                    itemSelectedCount: document.querySelectorAll('#dictionary .dictionary-item.selected').length,
                    shapeSelectedCount: document.querySelectorAll('#shapeDictionary .dictionary-item.selected').length,
                };
            });
            console.log('  prepositions setup state: ' + JSON.stringify(finalMode));
        },
        generateBtn: 'generateWorksheetBtn',
        downloadBtnInline: 'downloadInteractiveHtmlBtn',
        downloadBtnReference: 'downloadInteractiveHtmlReferenceBtn',
    },
};

function fail(msg) { console.error('  ❌ FAIL: ' + msg); throw new Error(msg); }
function ok(msg)   { console.log('  ✓ ' + msg); }

async function generateAndDownload(browser, appCfg, mode) {
    const ctx = await browser.newContext({ acceptDownloads: true, viewport: { width: 1280, height: 800 } });
    const page = await ctx.newPage();
    page.on('pageerror', e => console.log('    [pageerror] ' + e.message));
    page.on('console', m => {
        const t = m.type();
        if (t === 'error') console.log('    [console.error] ' + m.text());
    });
    await page.goto(BASE_URL + appCfg.url, { waitUntil: 'networkidle' });

    const hasModule = await page.evaluate(() => typeof window.LCSImageRef === 'object');
    if (!hasModule) fail('LCSImageRef missing on ' + appCfg.url);

    await appCfg.setup(page);

    // Generate. Then wait for the universal post-generate signal:
    // window.__lcsGenerationCounter incrementing beyond baseline.
    // Every wired app MUST expose this counter — see image-reference.js
    // propagation checklist item 10. Without it the test will time out.
    // Also wait for the download button to become enabled.
    const baselineCounter = await page.evaluate(() => window.__lcsGenerationCounter || 0);
    await page.evaluate(id => document.getElementById(id).click(), appCfg.generateBtn);
    const dlBtnId = mode === 'reference' ? appCfg.downloadBtnReference : appCfg.downloadBtnInline;
    try {
        await page.waitForFunction(({ id, baseline }) => {
            const b = document.getElementById(id);
            if (!b || b.disabled) return false;
            return (window.__lcsGenerationCounter || 0) > baseline;
        }, { id: dlBtnId, baseline: baselineCounter }, { timeout: 60000 });
    } catch (e) {
        const diag = await page.evaluate(() => ({
            counter: window.__lcsGenerationCounter,
            counterMissing: typeof window.__lcsGenerationCounter === 'undefined',
        }));
        if (diag.counterMissing) {
            console.log('  ⚠ This app does NOT expose window.__lcsGenerationCounter — see image-reference.js propagation checklist item 10.');
        }
        console.log('  diag: ' + JSON.stringify(diag));
        throw e;
    }

    // Download
    const [download] = await Promise.all([
        page.waitForEvent('download', { timeout: 60000 }),
        page.evaluate(id => document.getElementById(id).click(), dlBtnId),
    ]);
    const fname = appCfg.downloadFileBaseName + '_' + mode + '_' + Date.now() + '.html';
    const outPath = path.join(require('os').tmpdir(), fname);
    await download.saveAs(outPath);
    await ctx.close();
    return outPath;
}

function expectedVariant(effectivePx) {
    if (effectivePx <= 512) return '1x';
    if (effectivePx <= 1024) return '2x';
    return '3x';
}

async function inspectStandalone(browser, htmlPath, viewport, dpr, urlMode) {
    // For reference mode the HTML must be served over http:// so /image-library-webp/...
    // URLs resolve. For inline mode the HTML works over either; file:// is faster.
    let url;
    if (urlMode === 'http') {
        // Serve the HTML over a tiny localhost http server so it can resolve
        // /image-library-webp/... URLs against the dev server.
        url = await serveOnce(htmlPath);
    } else {
        url = 'file:///' + htmlPath.replace(/\\/g, '/');
    }
    const ctx = await browser.newContext({ viewport: viewport, deviceScaleFactor: dpr });
    const page = await ctx.newPage();
    page.on('pageerror', e => console.log('    [pageerror] ' + e.message));
    await page.goto(url, { waitUntil: 'networkidle' });
    // Wait for the worksheet img to load (universal signal). Some apps (e.g.,
    // pattern-worksheet) don't render persistent .lcs-img-overlay elements
    // at startup — overlays appear during drag/drop. Don't require overlays.
    await page.waitForFunction(() => {
        var img = document.getElementById('lcs-worksheet-img');
        return img && img.complete && img.naturalHeight > 0;
    }, { timeout: 15000 });
    // Give renderTargets/renderSlots a tick to run and the runtime to assign
    // initial variants on whatever overlays it does render.
    await page.evaluate(() => new Promise(r => setTimeout(() => requestAnimationFrame(r), 100)));
    const data = await page.evaluate(() => {
        const els = Array.from(document.querySelectorAll('img.lcs-img-overlay'));
        return els.map(el => ({
            ref: el.getAttribute('data-image-ref'),
            variant: el.dataset.variant,
            widthCss: el.getBoundingClientRect().width,
            srcKind: el.src.startsWith('data:image/webp') ? 'data' : (el.src.startsWith('http') || el.src.startsWith('/')) ? 'url' : (el.src ? 'other' : 'none'),
        }));
    });
    await ctx.close();
    return data;
}

// One-shot localhost http server for serving standalone HTML so reference
// mode's WebP URLs resolve against the dev server.
let _serverInstance = null;
async function serveOnce(htmlPath) {
    if (!_serverInstance) {
        _serverInstance = await new Promise((resolve, reject) => {
            const srv = http.createServer((req, res) => {
                const want = req.url.split('?')[0];
                if (want === '/standalone.html' && _serverInstance.currentHtml) {
                    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                    res.end(fs.readFileSync(_serverInstance.currentHtml));
                } else if (want.startsWith('/image-library-webp/')) {
                    // Proxy to the dev server so reference URLs resolve
                    http.get(BASE_URL + want, upstream => {
                        res.writeHead(upstream.statusCode, upstream.headers);
                        upstream.pipe(res);
                    }).on('error', () => { res.writeHead(502); res.end(); });
                } else {
                    res.writeHead(404); res.end();
                }
            });
            srv.listen(0, '127.0.0.1', () => resolve({ srv, port: srv.address().port, currentHtml: null }));
            srv.on('error', reject);
        });
    }
    _serverInstance.currentHtml = htmlPath;
    return 'http://127.0.0.1:' + _serverInstance.port + '/standalone.html';
}

function shutdownServer() {
    if (_serverInstance) { _serverInstance.srv.close(); _serverInstance = null; }
}

function validateVariantSelection(label, dpr, overlays, embeddedRefs) {
    if (overlays.length === 0) {
        console.log('    ' + label + ': (no persistent overlays — interactive-only image rendering)');
        return null; // null = skipped, not failed
    }
    let validated = 0, mismatches = 0, skipped = 0;
    const distribution = {};
    for (const o of overlays) {
        distribution[o.variant || 'none'] = (distribution[o.variant || 'none'] || 0) + 1;
    }
    for (const o of overlays) {
        if (!embeddedRefs.has(o.ref)) { skipped++; continue; }
        const eff = o.widthCss * dpr;
        const expected = expectedVariant(eff);
        if (o.variant !== expected) {
            console.log('      ❌ MISMATCH: ' + o.ref + ' eff=' + eff.toFixed(0) + 'px expected ' + expected + ' got ' + o.variant);
            mismatches++;
        } else {
            validated++;
        }
    }
    console.log('    ' + label + ': ' + validated + ' validated, ' + mismatches + ' mismatches, ' + skipped + ' skipped (no embed). Variants: ' + JSON.stringify(distribution));
    return mismatches === 0 && validated > 0;
}

function validateBundle(htmlPath, expectedMode) {
    const html = fs.readFileSync(htmlPath, 'utf8');
    const m = html.match(/var DECK_BUNDLE = (\{[\s\S]+?\});<\/script>/);
    if (!m) fail('cannot locate DECK_BUNDLE in ' + htmlPath);
    const bundle = JSON.parse(m[1]);
    if (bundle.schemaFormat !== 'image-references-v2' && bundle.schemaFormat !== 'image-references-v3') {
        fail('schemaFormat expected "image-references-v2" or "image-references-v3", got ' + bundle.schemaFormat);
    }
    if (bundle.loadingMode !== expectedMode) fail('loadingMode expected "' + expectedMode + '", got ' + bundle.loadingMode);
    const refKeys = Object.keys(bundle.imageRefs || {});
    // Snapshot-only apps (math-puzzle) may legitimately have empty imageRefs —
    // their content is per-piece operator-rendered snapshots, not library images.
    // Detect via the snapshotMode field (only set by snapshot-emitting apps).
    const snapshotOnly = bundle.snapshotMode === 'inline' && refKeys.length === 0;
    if (refKeys.length === 0 && !snapshotOnly) fail('bundle.imageRefs is empty');
    // Verify variant strings match the mode
    for (const k of refKeys) {
        const variants = bundle.imageRefs[k].variants || {};
        for (const v of Object.keys(variants)) {
            const s = variants[v];
            if (expectedMode === 'inline' && !s.startsWith('data:image/webp')) fail('inline variant ' + k + '@' + v + ' is not a data: URL');
            if (expectedMode === 'reference' && !s.startsWith('/image-library-webp/')) fail('reference variant ' + k + '@' + v + ' is not a /image-library-webp/ URL');
        }
    }
    return { bundle, refKeys, sizeBytes: m[1].length, htmlBytes: html.length };
}

async function runApp(browser, appName, summary) {
    const cfg = APPS[appName];
    if (!cfg) fail('unknown app: ' + appName);
    console.log('\n=== ' + appName.toUpperCase() + ' ===');
    let allOk = true;

    const modes = cfg.skipReferenceMode ? ['inline'] : ['inline', 'reference'];
    for (const mode of modes) {
        console.log('\n[' + mode.toUpperCase() + ' mode]');
        const htmlPath = await generateAndDownload(browser, cfg, mode);
        console.log('  downloaded → ' + htmlPath);
        const v = validateBundle(htmlPath, mode);
        const schemaTag = (v.bundle.schemaFormat || 'unknown').replace('image-references-', '');
        const snapshotTag = v.bundle.snapshotMode ? (', snapshotMode=' + v.bundle.snapshotMode) : '';
        const piecesCount = Array.isArray(v.bundle.pieces) ? v.bundle.pieces.length : 0;
        const piecesTag = piecesCount > 0 ? (', pieces=' + piecesCount) : '';
        ok('schema=' + schemaTag + ', loadingMode=' + mode + snapshotTag + ', imageRefs=' + v.refKeys.length + piecesTag);
        ok('html ' + (v.htmlBytes/1024).toFixed(1) + ' KB, bundle JSON ' + (v.sizeBytes/1024).toFixed(1) + ' KB');
        if (summary) {
            summary.push({
                app: appName,
                mode: mode,
                imageRefsCount: v.refKeys.length,
                htmlKB: Math.round(v.htmlBytes/1024),
                bundleKB: Math.round(v.sizeBytes/1024),
            });
        }

        // Embedded refs are those whose variants is non-empty
        const embeddedRefs = new Set(v.refKeys.filter(k => Object.keys(v.bundle.imageRefs[k].variants || {}).length > 0));
        const urlMode = mode === 'reference' ? 'http' : 'file';

        for (const vp of [
            { label: 'desktop 1280×800 DPR1', viewport: { width: 1280, height: 800 }, dpr: 1 },
            { label: 'desktop 1280×800 DPR2', viewport: { width: 1280, height: 800 }, dpr: 2 },
            { label: 'mobile 390×844 DPR3',  viewport: { width: 390,  height: 844 }, dpr: 3 },
        ]) {
            const overlays = await inspectStandalone(browser, htmlPath, vp.viewport, vp.dpr, urlMode);
            const result = validateVariantSelection(vp.label, vp.dpr, overlays, embeddedRefs);
            if (result === false) allOk = false;
            // result === null means "skipped — interactive-only" — not a failure
        }

        // Synthetic variant test: force a real overlay to specific CSS widths
        // and observe data-variant flip through @1x/@2x/@3x as the runtime's
        // ResizeObserver fires. This exercises the full runtime path
        // (resize → ResizeObserver → refreshAllVariants → updateOverlayVariant
        // → pickVariant → src swap) — not just the pure threshold logic.
        // Run on DPR=1 so cssWidth × dpr === cssWidth (clean threshold math).
        console.log('  [synthetic variant tests]');
        const synthCtx = await browser.newContext({ viewport: { width: 2400, height: 1200 }, deviceScaleFactor: 1 });
        const synthPage = await synthCtx.newPage();
        const url = urlMode === 'http' ? await serveOnce(htmlPath) : 'file:///' + htmlPath.replace(/\\/g, '/');
        await synthPage.goto(url, { waitUntil: 'networkidle' });
        // Wait briefly for any overlay imgs (some apps render none at startup).
        await synthPage.waitForFunction(() => document.querySelectorAll('img.lcs-img-overlay').length > 0, { timeout: 5000 }).catch(() => {});
        const synthResults = await synthPage.evaluate(async (embeddedRefsArr) => {
            const embedded = new Set(embeddedRefsArr);
            const els = Array.from(document.querySelectorAll('img.lcs-img-overlay'));
            const target = els.find(el => embedded.has(el.getAttribute('data-image-ref')));
            if (!target) return { error: 'no embedded overlay to test' };
            const ref = target.getAttribute('data-image-ref');
            // Pin out of the percentage-positioned layout so explicit pixel
            // widths actually apply (overlay parent normally uses width:%).
            target.style.position = 'fixed';
            target.style.left = '0px';
            target.style.top = '0px';
            target.style.height = '100px';
            const out = [];
            const wait = ms => new Promise(r => setTimeout(r, ms));
            for (const w of [200, 600, 1200, 1800]) {
                const expected = w <= 512 ? '1x' : w <= 1024 ? '2x' : '3x';
                target.style.width = w + 'px';
                // The runtime's ResizeObserver only watches the overlay
                // container — single-overlay style changes don't fire it.
                // Use the test hook to force a re-pick.
                if (typeof window.__lcsRefreshOverlayVariants === 'function') {
                    window.__lcsRefreshOverlayVariants();
                }
                await wait(40);
                out.push({ w: w, expected: expected, got: target.dataset.variant, ok: target.dataset.variant === expected });
            }
            return { ref: ref, results: out };
        }, Array.from(embeddedRefs));
        if (synthResults.error) {
            console.log('    (no persistent overlay to synth-test — interactive-only image rendering)');
        } else {
            console.log('    using ref: ' + synthResults.ref);
            let synthOk = true;
            for (const r of synthResults.results) {
                console.log('      width=' + r.w + 'px  expected=' + r.expected + '  got=' + r.got + '  ' + (r.ok ? '✓' : '❌'));
                if (!r.ok) synthOk = false;
            }
            if (!synthOk) allOk = false;
            else ok('synthetic variant thresholds correct (runtime resize → variant flip)');
        }
        await synthCtx.close();
    }

    return allOk;
}

(async () => {
    const args = process.argv.slice(2);
    const apps = args.length > 0 ? args : ['addition'];
    const browser = await chromium.launch({ headless: true });
    const summary = [];
    let allOk = true;
    try {
        for (const appName of apps) {
            const ok = await runApp(browser, appName, summary);
            if (!ok) allOk = false;
        }
    } finally {
        shutdownServer();
        await browser.close();
    }
    if (summary.length > 0) {
        console.log('\n========================= BUNDLE SIZE SUMMARY =========================');
        console.log('App                  Mode        imageRefs    HTML        BundleJSON');
        console.log('-----------------------------------------------------------------------');
        for (const s of summary) {
            const cellAlign = (str, w) => String(str).padEnd(w);
            console.log(
                cellAlign(s.app, 22) +
                cellAlign(s.mode, 12) +
                cellAlign(s.imageRefsCount, 14) +
                cellAlign(s.htmlKB + ' KB', 12) +
                cellAlign(s.bundleKB + ' KB', 12)
            );
        }
        console.log('=======================================================================');
    }
    console.log('\n' + (allOk ? '✓ all apps passed' : '❌ at least one app failed'));
    process.exit(allOk ? 0 : 1);
})().catch(e => { console.error('\nFATAL: ' + (e.stack || e.message)); shutdownServer(); process.exit(2); });
