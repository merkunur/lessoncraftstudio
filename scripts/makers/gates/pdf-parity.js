#!/usr/bin/env node
/**
 * Gate 6 `pdf-parity` (ARCHITECTURE §15; task 4 of the ten, 2026-11-01): what the browser prints is the page the
 * teacher saw. Print (the vector PDF) builds ONE document of every page + key page (shell.js printAll) and hands it to
 * the print engine; this gate takes that document from the maker screen (real click on Print) and proves, per page:
 *   1. DOM parity — the printed page's `.ws-page` equals the preview page's `.ws-page` (the preview's tap-to-edit
 *      attributes aside); the same number of pages, in the same order, keys after the pages
 *   2. visual parity — the print document rendered under print media vs the preview document the teacher saw, page by
 *      page at 1×: pixels differing beyond a 1-px neighbourhood ≤ 0.5 % (the exports-shell S2 method)
 *   3. the PDF itself (Chromium page.pdf of the print document, preferCSSPageSize): page count = pages; every page the
 *      exact paper (US Letter 612 × 792 pt for en, A4 595.28 × 841.89 otherwise); every font an embedded subset; the
 *      text extractable (pdftotext): ≥ 98 % of the preview page's words on the PDF page, the title among them; on a
 *      key page every written answer is in the text
 * Scenarios: counting en K-002 + K-006 (two templates on one worksheet, key on, Letter); de K-002 (A4, border, page
 * numbers); sight-words de K-388 (a word template, two pages); counting fi K-006 (the long-word locale).
 * Poisons, both directions, every run: a print document whose page 2 lost a chip row fails 1; pictures hidden in print
 * fail 2; a page dropped fails 3 (count); a changed word fails 3 (text); the real documents pass all three.
 *
 *   node scripts/makers/gates/pdf-parity.js [--quick] [--keep]
 */
'use strict';
const http = require('http');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');
const MP = require('./lib/maker-pages.js');
const { handler } = require('../serve.js');
const sharp = require(path.join(MP.REPO, 'node_modules', 'sharp'));
const { PDFDocument, PDFName, PDFDict, PDFArray } = require(path.join(MP.REPO, 'node_modules', 'pdf-lib'));

const A = MP.args();
const QUICK = !!A.quick;
const PAPER = { letter: [612, 792], a4: [595.28, 841.89] };
const PDFTOTEXT = ['pdftotext', '/mingw64/bin/pdftotext', 'C:/msys64/mingw64/bin/pdftotext', 'C:/Program Files/Git/mingw64/bin/pdftotext'];

async function pixels(buf) { const { data, info } = await sharp(buf).removeAlpha().raw().toBuffer({ resolveWithObject: true }); return { data, w: info.width, h: info.height }; }
/** share of a's pixels that differ by > 48 in a channel from every pixel of b within 1 px (exports-shell.js) */
function diffShare(a, b) {
  if (a.w !== b.w || a.h !== b.h) return 1;
  const near = (k, j) => Math.abs(a.data[k] - b.data[j]) <= 48 && Math.abs(a.data[k + 1] - b.data[j + 1]) <= 48 && Math.abs(a.data[k + 2] - b.data[j + 2]) <= 48;
  let n = 0;
  for (let y = 0; y < a.h; y++) for (let x = 0; x < a.w; x++) {
    const k = (y * a.w + x) * 3; if (near(k, k)) continue;
    let ok = false;
    for (let dy = -1; dy <= 1 && !ok; dy++) for (let dx = -1; dx <= 1 && !ok; dx++) { const yy = y + dy, xx = x + dx; if (yy >= 0 && yy < a.h && xx >= 0 && xx < a.w && near(k, (yy * a.w + xx) * 3)) ok = true; }
    if (!ok) n++;
  }
  return n / (a.w * a.h);
}
const words = (s) => String(s).toLowerCase().normalize('NFC').match(/\p{L}+|\d+/gu) || [];
/** every font of every page: embedded (FontFile / FontFile2 / FontFile3 on its descriptor) or not */
function fontsOf(pdf) {
  const out = [];
  pdf.getPages().forEach((pg, i) => {
    const res = pg.node.Resources && pg.node.Resources();
    const fonts = res && res.lookup(PDFName.of('Font'), PDFDict);
    if (!fonts) { out.push({ page: i + 1, name: '(none)', embedded: false, missing: true }); return; }
    for (const [k, ref] of fonts.entries()) {
      // a font reference that points at no object is a broken PDF: reported as a missing font, never a crash that hides
      // every other result (2026-11-01: one such page stopped the whole gate)
      let f = null; try { f = pdf.context.lookup(ref, PDFDict); } catch (e) { f = null; }
      if (!f) { out.push({ page: i + 1, name: String(k) + ' (broken reference)', embedded: false, missing: true }); continue; }
      // lookupMaybe: a composite (Type0) or Type3 font has no FontDescriptor of its own — lookup() throws on a missing key
      let desc = f.lookupMaybe(PDFName.of('FontDescriptor'), PDFDict);
      if (!desc) { const dd = f.lookupMaybe(PDFName.of('DescendantFonts'), PDFArray); if (dd) desc = pdf.context.lookup(dd.get(0), PDFDict).lookupMaybe(PDFName.of('FontDescriptor'), PDFDict); }
      const type3 = String(f.lookup(PDFName.of('Subtype')) || '') === '/Type3';
      const emb = type3 || (!!desc && ['FontFile', 'FontFile2', 'FontFile3'].some((n) => desc.has(PDFName.of(n))));
      out.push({ page: i + 1, name: String(f.lookup(PDFName.of('BaseFont')) || k), embedded: emb });
    }
  });
  return out;
}
// -enc UTF-8: on Windows pdftotext writes Latin-1 by default, and reading that as UTF-8 lost every ä / ö / å — de and fi
// pages "lacked" Zählen, Kästchen, päivämäärä that the PDF holds (2026-11-01)
function pdfText(file, pageNo) {
  for (const bin of PDFTOTEXT) { try { return execFileSync(bin, ['-enc', 'UTF-8', '-f', String(pageNo), '-l', String(pageNo), '-layout', file, '-'], { encoding: 'utf8' }); } catch (e) { if (e.code !== 'ENOENT') throw e; } }
  return null;
}

(async () => {
  const srv = http.createServer(handler); await new Promise((r) => srv.listen(0, r));
  const base = `http://localhost:${srv.address().port}`;
  const set = (q) => new Promise((r) => http.get(`${base}/__dev/access?${q}`, (res) => { res.resume(); res.on('end', r); }));
  await set('as=sub&made=0&downloaded=0');
  const puppeteer = require(path.join(MP.REPO, 'node_modules', 'puppeteer'));
  const browser = await puppeteer.launch();
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'lcs-pdfp-'));
  let fails = 0, pagesChecked = 0;
  const fail = (s) => { fails++; console.log('FAIL ' + s); };
  const ok = (s) => console.log('ok   ' + s);
  const settle = (ms = 900) => new Promise((r) => setTimeout(r, ms));
  const hasPdfToText = PDFTOTEXT.some((b) => { try { execFileSync(b, ['-v'], { stdio: 'ignore' }); return true; } catch (e) { return e.code !== 'ENOENT'; } });
  if (!hasPdfToText) console.log('note pdftotext not found: the text check is skipped (install poppler)');

  /** render html standalone at 1× and photograph each .ws-page (print media for the print document) */
  async function shots(html, print) {
    const pg = await browser.newPage();
    await pg.setViewport({ width: 900, height: 1200 });
    await pg.goto(`${base}/makers/app/`);
    await pg.setContent(html, { waitUntil: 'networkidle0' });
    if (print) await pg.emulateMediaType('print');
    await pg.evaluate(async () => { await document.fonts.ready; await Promise.all([...document.images].map((i) => i.decode().catch(() => {}))); });
    const els = await pg.$$('.ws-page');
    const out = [];
    for (const el of els) out.push(await el.screenshot({ type: 'png' }));
    await pg.close();
    return out;
  }
  /** checks 1-3 on one scenario: previews = the preview srcdocs + DOM, printed = the print document (string + DOM) */
  async function checkScenario(tag, sc, poison) {
    const out = [];
    // 1. DOM parity (the live documents, the preview's tap-to-edit attributes removed)
    if (sc.printPages.length !== sc.previewPages.length) out.push(`DOM: ${sc.printPages.length} printed pages, ${sc.previewPages.length} shown`);
    // every printed page must BE a shown page (same DOM); the ORDER is then compared on its own (Print puts every key
    // after every page, the preview shows each key after its page — a real difference the main session decides)
    const map = sc.printPages.map((h) => sc.previewPages.indexOf(h));
    map.forEach((j, i) => { if (j < 0) out.push(`DOM: printed page ${i + 1} is no page the teacher saw`); });
    if (map.every((j) => j >= 0) && map.some((j, i) => j !== i)) out.push(`order: the printed order is shown pages ${map.map((j) => j + 1).join(', ')} (the preview shows each key after its page; Print puts the keys last)`);
    sc.map = map;
    if (poison) return out;
    // 2. visual parity
    const prev = [], pr = await shots(sc.printHtml, true);
    for (const d of sc.previewDocs) prev.push(...await shots(d, false));
    if (pr.length !== prev.length) out.push(`visual: ${pr.length} printed pages rendered, ${prev.length} shown`);
    for (let i = 0; i < Math.min(pr.length, prev.length); i++) {
      const j = sc.map && sc.map[i] >= 0 ? sc.map[i] : i;
      const d = diffShare(await pixels(pr[i]), await pixels(prev[j]));
      if (d > 0.005) out.push(`visual: page ${i + 1} differs by ${(d * 100).toFixed(2)} % (line 0.5 %)`);
      else sc.diffs.push(d);
    }
    // 3. the PDF
    const pg = await browser.newPage();
    await pg.goto(`${base}/makers/app/`);
    await pg.setContent(sc.printHtml, { waitUntil: 'networkidle0' });
    await pg.evaluate(async () => { await document.fonts.ready; });
    const file = path.join(tmp, tag.replace(/\W+/g, '-') + '.pdf');
    await pg.pdf({ path: file, printBackground: true, preferCSSPageSize: true });
    await pg.close();
    const pdf = await PDFDocument.load(fs.readFileSync(file));
    const sizes = pdf.getPages().map((x) => x.getSize());
    if (sizes.length !== sc.previewPages.length) out.push(`PDF: ${sizes.length} pages for ${sc.previewPages.length} shown`);
    const want = PAPER[sc.paper];
    sizes.forEach((s, i) => { if (Math.abs(s.width - want[0]) > 0.5 || Math.abs(s.height - want[1]) > 0.5) out.push(`PDF: page ${i + 1} is ${s.width.toFixed(2)} × ${s.height.toFixed(2)} pt, not ${sc.paper}`); });
    const fonts = fontsOf(pdf);
    if (!fonts.length) out.push('PDF: a page carries no font (no text?)');
    fonts.filter((f) => f.missing).forEach((f) => out.push(f.name === '(none)' ? `PDF: page ${f.page} carries no font (no text?)` : `PDF: page ${f.page}: font ${f.name}`));
    fonts.filter((f) => !f.embedded && !f.missing).forEach((f) => out.push(`PDF: font ${f.name} on page ${f.page} is not embedded`));
    sc.fonts = [...new Set(fonts.map((f) => f.name))];
    if (hasPdfToText) {
      sc.printPages.forEach((_, i) => {
        const t = sc.previewTexts[sc.map && sc.map[i] >= 0 ? sc.map[i] : i];
        const txt = pdfText(file, i + 1); if (txt === null || !t) return;
        const have = words(txt), wantW = words(t.text), flat = have.join('');
        // a number is present when its digits are in the text (pdftotext joins neighbouring chips: "3 6 7" → "367")
        const missing = wantW.filter((w) => !have.includes(w) && !(/^\d+$/.test(w) && flat.includes(w)));
        if (wantW.length && missing.length / wantW.length > 0.02) out.push(`PDF text: page ${i + 1} lacks ${missing.length} of ${wantW.length} words (${missing.slice(0, 4).join(', ')})`);
        if (t.title && !txt.toLowerCase().includes(t.title.toLowerCase().slice(0, 12))) out.push(`PDF text: page ${i + 1} title not found`);
        for (const a of t.answers) if (!have.includes(String(a).toLowerCase())) out.push(`PDF text: key page ${i + 1} lacks the written answer "${a}"`);
      });
    }
    sc.file = file;
    return out;
  }

  /** drive the maker: open, arrange pages, click Print; collect previews + the print document */
  async function scenario(name, steps) {
    const p = await browser.newPage();
    const errs = []; p.on('pageerror', (e) => errs.push(e.message));
    await p.setViewport({ width: 1366, height: 900 });
    await steps(p);
    await settle(600);
    const previewDocs = await p.evaluate(() => [...document.querySelectorAll('.mk-sheet iframe')].map((f) => f.getAttribute('srcdoc')));
    const previewPages = await p.evaluate(() => [...document.querySelectorAll('.mk-sheet iframe')].map((f) => { const d = f.contentDocument; const n = d.querySelector('.ws-page').cloneNode(true); n.querySelectorAll('[tabindex][role="button"]').forEach((x) => { x.removeAttribute('tabindex'); x.removeAttribute('role'); }); return n.outerHTML; }));
    const previewTexts = await p.evaluate(() => [...document.querySelectorAll('.mk-sheet iframe')].map((f) => { const d = f.contentDocument; const key = d.body.classList.contains('lcs-keypage'); return { text: d.querySelector('.ws-page').innerText, title: (d.querySelector('[data-lcs-title]') || {}).textContent || '', answers: key ? [...d.querySelectorAll('.ws-answerbox[data-lcs-answer]')].map((b) => b.getAttribute('data-lcs-answer')).filter((a) => a && /^\d+$/.test(a)) : [] }; }));
    const paper = await p.evaluate(() => window.__lcsMaker.state().paper);
    await p.click('#mk-print'); await settle(1500);
    const printHtml = await p.evaluate(() => { const f = document.querySelector('#mk-print-host iframe'); return f ? f.getAttribute('srcdoc') : null; });
    const printPages = await p.evaluate(() => { const f = document.querySelector('#mk-print-host iframe'); return f ? [...f.contentDocument.querySelectorAll('.mk-break')].map((b) => b.querySelector('.ws-page').outerHTML) : []; });
    if (errs.length) fail(`${name}: page errors ${errs.slice(0, 2).join(' | ')}`);
    await p.close();
    if (!printHtml) { fail(`${name}: Print produced no document`); return null; }
    return { name, previewDocs, previewPages, previewTexts, printHtml, printPages, paper, diffs: [] };
  }
  const click = (p, sel) => p.evaluate((s) => document.querySelector(s).click(), sel);
  const chip = (p, label, idx) => p.evaluate(({ label, idx }) => [...document.querySelectorAll('.mk-group')].find((g) => g.getAttribute('aria-label') === label).querySelectorAll('.mk-chip')[idx].click(), { label, idx });
  const pickPage = async (p, k) => { const r = await p.evaluate((k) => { const h = document.querySelectorAll('.mk-page[data-page] .mk-page-head')[k]; h.scrollIntoView({ block: 'center' }); const b = h.getBoundingClientRect(); return { x: b.left + 8, y: b.top + b.height / 2 }; }, k); await p.mouse.click(r.x, r.y); await settle(300); };

  const scenarios = [];
  // S1: en, K-002 + K-006 on one worksheet (mixed templates), the answer key on → 2 pages + 2 keys, US Letter
  scenarios.push(await scenario('en K-002+K-006 key', async (p) => {
    await p.goto(`${base}/makers/app/?maker=counting&lang=en&t=K-002`, { waitUntil: 'networkidle0' }); await settle(1200);
    await click(p, '#mk-add'); await settle(1500);
    await pickPage(p, 1);
    await p.evaluate(() => document.querySelector('.mk-card[data-id="K-006"]').click()); await settle(1800);
    await click(p, '.mk-more'); await settle(300);
    await chip(p, 'Answer key', 1); await settle(2500);
  }));
  if (!QUICK) {
    // S2: de, A4, a border and page numbers, two pages
    scenarios.push(await scenario('de K-002 A4 border numbers', async (p) => {
      await p.goto(`${base}/makers/app/?maker=counting&lang=de&t=K-002`, { waitUntil: 'networkidle0' }); await settle(1200);
      await click(p, '#mk-add'); await settle(1500);
      await click(p, '.mk-more'); await settle(300);
      await chip(p, 'Rahmen', 1); await settle(800);
      await chip(p, 'Seitenzahlen', 1); await settle(1200);
    }));
    // S3: de, a word template, two pages (each its own word)
    scenarios.push(await scenario('de K-388 two words', async (p) => {
      await p.goto(`${base}/makers/app/?maker=sight-words&lang=de&t=K-388`, { waitUntil: 'networkidle0' }); await settle(1200);
      await click(p, '#mk-add'); await settle(1800);
    }));
    // S4: fi, K-006 with the key (written answers on the key page)
    scenarios.push(await scenario('fi K-006 key', async (p) => {
      await p.goto(`${base}/makers/app/?maker=counting&lang=fi&t=K-006`, { waitUntil: 'networkidle0' }); await settle(1200);
      await click(p, '.mk-more'); await settle(300);
      await chip(p, 'Vastaukset', 1); await settle(2500);
    }));
  }
  for (const sc of scenarios.filter(Boolean)) {
    const out = await checkScenario(sc.name, sc);
    pagesChecked += sc.previewPages.length;
    if (out.length) out.forEach((o) => fail(`${sc.name}: ${o}`));
    else ok(`${sc.name}: ${sc.previewPages.length} pages (${sc.paper}); DOM equal; visual diff ${sc.diffs.map((d) => (d * 100).toFixed(2) + ' %').join(', ')}; fonts ${sc.fonts.join(', ')}; text extracted`);
  }

  // ---- poisons, both directions (on S1)
  const s1 = scenarios[0];
  if (s1) {
    const p1 = { ...s1, printPages: s1.printPages.map((h, i) => (i === 1 ? h.replace('<div class="ws-choices">', '<div class="ws-choices" data-poison="1">') : h)) };
    if (!(await checkScenario('p1', p1, true)).some((o) => /DOM: printed page 2 (differs|is no page)/.test(o))) fail('poison 1: a changed printed page PASSED DOM parity');
    const p2 = { ...s1, printHtml: s1.printHtml.replace('</head>', '<style>@media print{img{visibility:hidden}}</style></head>'), diffs: [] };
    if (!(await checkScenario('p2', p2)).some((o) => /visual: page \d+ differs/.test(o))) fail('poison 2: pictures hidden in print PASSED visual parity');
    const last = s1.printHtml.lastIndexOf('<div class="mk-break');
    const p3 = { ...s1, printHtml: s1.printHtml.slice(0, last) + '</body></html>', diffs: [] };
    if (last < 0) throw new Error('poison 3: no page wrapper found in the print document');
    const r3 = await checkScenario('p3', p3);
    if (!r3.some((o) => /PDF: \d+ pages for/.test(o) || /visual: \d+ printed pages rendered/.test(o))) fail('poison 3: a dropped page PASSED the page count');
    if (hasPdfToText) {
      const p4 = { ...s1, previewTexts: s1.previewTexts.map((t, i) => (i === 0 ? { ...t, text: t.text + ' zebrawordx zebrawordy zebrawordz', title: 'zebra title' } : t)), diffs: [] };
      if (!(await checkScenario('p4', p4)).some((o) => /PDF text/.test(o))) fail('poison 4: changed words PASSED the text check');
    }
  }

  await browser.close(); srv.close();
  if (A.keep) console.log('kept: ' + tmp); else fs.rmSync(tmp, { recursive: true, force: true });
  console.log(`pdf parity: ${scenarios.filter(Boolean).length} worksheets, ${pagesChecked} pages` + (fails ? `; ${fails} failing` : '; all pass, poisons fire both ways'));
  if (fails) process.exitCode = 1;
})().catch((e) => { console.error('pdf parity: error — ' + e.stack); process.exit(1); });
