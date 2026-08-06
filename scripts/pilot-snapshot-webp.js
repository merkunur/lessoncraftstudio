#!/usr/bin/env node
/*
 * pilot-snapshot-webp.js
 *
 * Visual-quality pilot for snapshot-compression on the 3 deferred apps
 * (alphabet-train, pattern-train, math-puzzle). The library-image WebP
 * conversion task taught us not to commit to a quality setting blind:
 * cutout pieces are 80–150 px and may surface lossy artifacts that
 * larger library images don't.
 *
 * What this does:
 *   1. Drives alphabet-train and pattern-train through their UIs to
 *      generate one worksheet each, then extracts pieces[].imgDataUrl
 *      from the downloaded standalone-HTML bundle.
 *   2. For each piece (PNG data URL): in a fresh browser context, decodes
 *      the PNG, draws it to a canvas, then emits BOTH:
 *         - canvas.toDataURL('image/webp', 0.85)
 *         - canvas.toDataURL('image/webp', 0.90)
 *      Same compression path that the production helper will use.
 *   3. Saves the originals and both WebP variants to
 *      image-library-webp/_snapshot-pilot/<app>/<idx>.{original.png,q85.webp,q90.webp}
 *   4. Writes a single _snapshot-pilot/index.html — side-by-side gallery
 *      with file sizes per cell and aggregate-ratio summary at the top.
 *      Operator opens it in a browser to make the q85-vs-q90 call.
 *
 * Hard stop after the gallery is written. No bundle changes, no schema
 * bump, no per-app wiring. Operator approves quality, then real
 * implementation begins in a separate pass.
 *
 * Usage: node scripts/pilot-snapshot-webp.js
 * Requires: dev server on :3000 (sitemap disabled per CLAUDE.md §14.5).
 */

'use strict';

const path = require('path');
const fs = require('fs');
const { chromium } = require(path.join(__dirname, '..', 'frontend', 'node_modules', 'playwright'));

const REPO_ROOT = path.resolve(__dirname, '..');
const OUT_ROOT = path.join(REPO_ROOT, 'image-library-webp', '_snapshot-pilot');
const BASE_URL = 'http://localhost:3000';

// Drives the same setup steps the verifier already proved work for these
// apps. Returns the downloaded standalone-HTML file path.
async function driveAndDownload(browser, appName) {
    const cfg = {
        'alphabet-train': {
            url: '/worksheet-generators/alphabet-train.html',
            setup: async (page) => {
                await page.waitForFunction(() => {
                    const sel = document.getElementById('themeSelect');
                    return sel && Array.from(sel.options).some(o => o.value === 'animals');
                }, { timeout: 30000 });
                await page.waitForFunction(() => document.querySelectorAll('#dictionary .dictionary-item').length > 0, { timeout: 30000 });
                await page.evaluate(() => {
                    const inp = document.getElementById('clueCount');
                    inp.value = '3';
                    inp.dispatchEvent(new Event('input', { bubbles: true }));
                });
                await page.evaluate(() => {
                    const items = Array.from(document.querySelectorAll('#dictionary .dictionary-item'));
                    for (let i = 0; i < 3 && i < items.length; i++) items[i].click();
                });
            },
        },
        'pattern-train': {
            url: '/worksheet-generators/pattern-train.html',
            setup: async (page) => {
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
                    const b = document.getElementById('generateWorksheetBtn');
                    return b && !b.disabled;
                }, { timeout: 30000 });
            },
        },
    };
    const c = cfg[appName];
    if (!c) throw new Error('unknown app: ' + appName);

    const ctx = await browser.newContext({ acceptDownloads: true, viewport: { width: 1280, height: 800 } });
    const page = await ctx.newPage();
    page.on('pageerror', e => console.log('  [pageerror ' + appName + '] ' + e.message));
    await page.goto(BASE_URL + c.url, { waitUntil: 'networkidle' });
    await c.setup(page);

    const baseline = await page.evaluate(() => window.__lcsGenerationCounter || 0);
    await page.evaluate(() => document.getElementById('generateWorksheetBtn').click());
    await page.waitForFunction(b => (window.__lcsGenerationCounter || 0) > b, baseline, { timeout: 60000 });
    await page.waitForFunction(() => {
        const b = document.getElementById('downloadInteractiveHtmlBtn');
        return b && !b.disabled;
    }, { timeout: 30000 });

    const [download] = await Promise.all([
        page.waitForEvent('download', { timeout: 60000 }),
        page.evaluate(() => document.getElementById('downloadInteractiveHtmlBtn').click()),
    ]);
    const tmpPath = path.join(require('os').tmpdir(), 'snapshot-pilot-' + appName + '-' + Date.now() + '.html');
    await download.saveAs(tmpPath);
    await ctx.close();
    return tmpPath;
}

function extractBundle(htmlPath) {
    const html = fs.readFileSync(htmlPath, 'utf8');
    const m = html.match(/var DECK_BUNDLE = (\{[\s\S]+?\});<\/script>/);
    if (!m) throw new Error('no DECK_BUNDLE in ' + htmlPath);
    return JSON.parse(m[1]);
}

function dataURLBytes(dataURL) {
    const i = dataURL.indexOf(',');
    if (i < 0) return 0;
    // base64-encoded payload bytes ≈ original bytes × 4/3
    return Math.round((dataURL.length - i - 1) * 3 / 4);
}

async function compressPiecesInBrowser(browser, samples) {
    // Open a fresh blank page and run the canvas re-encoding entirely in
    // the browser — same execution context the production helper will use,
    // not a Node-side sharp pass.
    const ctx = await browser.newContext({ viewport: { width: 800, height: 600 } });
    const page = await ctx.newPage();
    await page.goto('about:blank');
    const results = await page.evaluate(async (samples) => {
        async function compress(pngDataURL, quality) {
            const img = new Image();
            await new Promise((res, rej) => { img.onload = res; img.onerror = rej; img.src = pngDataURL; });
            const c = document.createElement('canvas');
            c.width = img.naturalWidth; c.height = img.naturalHeight;
            c.getContext('2d').drawImage(img, 0, 0);
            return c.toDataURL('image/webp', quality);
        }
        const out = [];
        for (const s of samples) {
            const w85 = await compress(s.original, 0.85);
            const w90 = await compress(s.original, 0.90);
            // Get natural dims via Image
            const probe = new Image();
            await new Promise((res) => { probe.onload = res; probe.onerror = res; probe.src = s.original; });
            out.push({
                app: s.app, label: s.label,
                width: probe.naturalWidth, height: probe.naturalHeight,
                original: s.original, q85: w85, q90: w90,
            });
        }
        return out;
    }, samples);
    await ctx.close();
    return results;
}

function dataURLToBlobBytes(dataURL) {
    const i = dataURL.indexOf(',');
    if (i < 0) return Buffer.alloc(0);
    return Buffer.from(dataURL.slice(i + 1), 'base64');
}

function pct(n, d) { return d ? ((n / d) * 100).toFixed(1) + '%' : '—'; }
function kb(n) { return (n / 1024).toFixed(1) + ' KB'; }

function escapeHtml(s) { return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }

async function main() {
    if (!fs.existsSync(OUT_ROOT)) fs.mkdirSync(OUT_ROOT, { recursive: true });

    const browser = await chromium.launch({ headless: true });
    const samples = [];
    try {
        for (const appName of ['alphabet-train', 'pattern-train']) {
            console.log('Driving ' + appName + ' through generate + download...');
            const htmlPath = await driveAndDownload(browser, appName);
            const bundle = extractBundle(htmlPath);
            const pieces = bundle.pieces || [];
            console.log('  ' + appName + ': ' + pieces.length + ' pieces in bundle');
            // Take up to 5 representative pieces per app.
            const take = Math.min(5, pieces.length);
            for (let i = 0; i < take; i++) {
                const p = pieces[i];
                if (p && p.imgDataUrl && p.imgDataUrl.startsWith('data:image/')) {
                    samples.push({ app: appName, label: 'piece ' + (i + 1) + ' (' + (p.number || '') + ')', original: p.imgDataUrl });
                }
            }
        }
        console.log('\nTotal samples: ' + samples.length);
        console.log('Compressing in browser...');
        const results = await compressPiecesInBrowser(browser, samples);

        // Save artifacts and build gallery
        let totalOrig = 0, totalQ85 = 0, totalQ90 = 0;
        const rows = [];
        for (let i = 0; i < results.length; i++) {
            const r = results[i];
            const dir = path.join(OUT_ROOT, r.app);
            if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
            const base = String(i + 1).padStart(2, '0');
            const origPath = path.join(dir, base + '.original.png');
            const q85Path  = path.join(dir, base + '.q85.webp');
            const q90Path  = path.join(dir, base + '.q90.webp');
            fs.writeFileSync(origPath, dataURLToBlobBytes(r.original));
            fs.writeFileSync(q85Path,  dataURLToBlobBytes(r.q85));
            fs.writeFileSync(q90Path,  dataURLToBlobBytes(r.q90));
            const oBytes = fs.statSync(origPath).size;
            const a = fs.statSync(q85Path).size;
            const b = fs.statSync(q90Path).size;
            totalOrig += oBytes; totalQ85 += a; totalQ90 += b;
            rows.push({ ...r, oBytes, q85Bytes: a, q90Bytes: b, oPath: origPath, q85Path: q85Path, q90Path: q90Path });
        }

        const html = '<!doctype html><html><head><meta charset="utf-8"><title>Snapshot WebP pilot</title><style>'
            + 'body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;max-width:1200px;margin:24px auto;padding:0 16px;color:#222}'
            + 'h1{margin:0 0 8px}p.intro{color:#555;margin-top:0}'
            + 'table.summary{border-collapse:collapse;margin:16px 0 32px;font-size:14px}'
            + 'table.summary th,table.summary td{border:1px solid #ddd;padding:6px 12px;text-align:right}'
            + 'table.summary th{background:#f5f5f5;text-align:left}'
            + 'section.sample{border-top:1px solid #eee;padding:18px 0}'
            + '.meta{display:flex;gap:12px;margin-bottom:10px;font-size:13px;align-items:center}'
            + '.appbadge{background:#eef;color:#335;padding:2px 8px;border-radius:4px;font-weight:600}'
            + '.dim{color:#777;font-family:monospace}'
            + '.trio{display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px}'
            + 'figure{margin:0;text-align:center}'
            + 'figure img{width:100%;max-width:300px;height:auto;background:repeating-conic-gradient(#eee 0% 25%,#fff 0% 50%) 0 / 16px 16px;border:1px solid #ddd;image-rendering:auto}'
            + 'figcaption{font-size:12px;margin-top:6px;color:#444}'
            + '.save{color:#060}.bigger{color:#a00}'
            + '</style></head><body>'
            + '<h1>Snapshot-compression pilot — cutout pieces</h1>'
            + '<p class="intro">' + samples.length + ' real piece snapshots from alphabet-train and pattern-train, each shown as: <b>original PNG</b> · <b>WebP q85</b> · <b>WebP q90</b>. The checkered backdrop reveals transparency. Look for: line crispness around letter strokes, color fidelity inside fills, halos on the alpha edges. If q85 looks fine, we ship q85. If q85 shows visible artifacts on letter strokes/shadows, we go q90 and accept the larger file.</p>'
            + '<table class="summary"><tr><th>Variant</th><th>Total bytes</th><th>vs original</th></tr>'
            + '<tr><td>Originals (PNG)</td><td>' + kb(totalOrig) + '</td><td>—</td></tr>'
            + '<tr><td>WebP q85</td><td>' + kb(totalQ85) + '</td><td class="save">saved ' + pct(totalOrig - totalQ85, totalOrig) + '</td></tr>'
            + '<tr><td>WebP q90</td><td>' + kb(totalQ90) + '</td><td class="save">saved ' + pct(totalOrig - totalQ90, totalOrig) + '</td></tr>'
            + '</table>'
            + rows.map(r => {
                const op = path.relative(OUT_ROOT, r.oPath).replace(/\\/g, '/');
                const ap = path.relative(OUT_ROOT, r.q85Path).replace(/\\/g, '/');
                const bp = path.relative(OUT_ROOT, r.q90Path).replace(/\\/g, '/');
                return '<section class="sample"><div class="meta"><span class="appbadge">' + escapeHtml(r.app) + '</span><span>' + escapeHtml(r.label) + '</span><span class="dim">' + r.width + '×' + r.height + ' px</span></div>'
                    + '<div class="trio">'
                    + '<figure><img src="' + op + '"><figcaption><b>Original PNG</b><br>' + kb(r.oBytes) + '</figcaption></figure>'
                    + '<figure><img src="' + ap + '"><figcaption><b>WebP q85</b><br>' + kb(r.q85Bytes) + ' <span class="save">(saved ' + pct(r.oBytes - r.q85Bytes, r.oBytes) + ')</span></figcaption></figure>'
                    + '<figure><img src="' + bp + '"><figcaption><b>WebP q90</b><br>' + kb(r.q90Bytes) + ' <span class="save">(saved ' + pct(r.oBytes - r.q90Bytes, r.oBytes) + ')</span></figcaption></figure>'
                    + '</div></section>';
            }).join('\n')
            + '</body></html>';
        fs.writeFileSync(path.join(OUT_ROOT, 'index.html'), html, 'utf8');
        console.log('\nPilot complete.');
        console.log('Open in browser:');
        console.log('  ' + path.join(OUT_ROOT, 'index.html'));
        console.log('\nAggregate (across ' + rows.length + ' pieces):');
        console.log('  Originals: ' + kb(totalOrig));
        console.log('  WebP q85:  ' + kb(totalQ85) + ' (saved ' + pct(totalOrig - totalQ85, totalOrig) + ')');
        console.log('  WebP q90:  ' + kb(totalQ90) + ' (saved ' + pct(totalOrig - totalQ90, totalOrig) + ')');
    } finally {
        await browser.close();
    }
}

main().catch(e => { console.error('FATAL: ' + (e.stack || e.message)); process.exit(1); });
