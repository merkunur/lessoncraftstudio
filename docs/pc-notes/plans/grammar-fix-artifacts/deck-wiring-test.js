// Deck wiring test — drives REAL generation headless in find-and-count +
// prepositions (via each app's __sepGenerate seam), pulls the actual deck.html
// through window.__lcsWorksheetHost.getHtml(), loads it, and asserts the
// grammar engine's output actually reached the deck:
//   FaC:  targets[].localizedPlural + ariaHowMany baked, ariaHowMany ===
//         LCSGrammar recomputation for the same nouns; no English leak (non-en).
//   Prep: fillin slots[].expected non-empty; optionChoices frame-valid
//         (3 options, exactly 1 correct, correct === slot expected, distinct);
//         no English multi-word preposition leak (non-en).
// Locales: de, pt, fi. No deploy, no live /api, fabric served from local cache.
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require(path.join('C:/Users/rkgen/lessoncraftstudio', 'node_modules', 'puppeteer'));

const REPO = 'C:/Users/rkgen/lessoncraftstudio';
const APPS = path.join(REPO, 'REFERENCE APPS');
const TRANS = path.join(REPO, 'REFERENCE TRANSLATIONS');
const MIRROR = path.join(REPO, 'frontend/public/worksheet-generators/js');
const FABRIC = path.join(__dirname, 'fabric.min.js');
const OUT = path.join(__dirname, 'wiring-out');
fs.mkdirSync(OUT, { recursive: true });

const LOCALES = ['de', 'pt', 'fi'];
// Real vocab keys (animals theme) so ImageVocab.keyFromPath resolves.
const API_IMAGES = ['cat', 'dog', 'elephant', 'rabbit', 'lion', 'owl'].map((w, i) => ({
  id: i + 1, word: w, name: w, theme: 'animals', path: `/images/animals/${w}.png`
}));
// 8x8 red PNG
const PNG = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAFklEQVR4nGP8z8Dwn4EIwESMolGFlCsEAFOtAxG0iBW/AAAAAElFTkSuQmCC',
  'base64');

// English fragments that must NOT appear in non-en output (word-bounded).
const EN_LEAK = /\b(Find|Count|Circle|Cross|Draw|How many|the picture|worksheet)\b/;
const EN_PREPS = ['on top of', 'in front of', 'next to'];

function serve() {
  return http.createServer((req, res) => {
    const url = req.url.split('?')[0];
    if (url.startsWith('/api/images')) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ images: API_IMAGES }));
      return;
    }
    if (/\.(png|jpg|jpeg|webp|gif)$/i.test(url)) {
      res.writeHead(200, { 'Content-Type': 'image/png' });
      res.end(PNG);
      return;
    }
    let fp = null;
    if (url.endsWith('.html')) {
      const base = path.basename(url);
      const staged = path.join(OUT, base);
      fp = fs.existsSync(staged) ? staged : path.join(APPS, base);
    } else if (url.includes('/js/')) {
      const base = path.basename(url);
      const a = path.join(TRANS, base);
      const b = path.join(MIRROR, base);
      fp = fs.existsSync(a) ? a : (fs.existsSync(b) ? b : null);
      // POISON=1: serve lcs-grammar.js with an English-emitting howManyQuestion —
      // the EN_LEAK assertions MUST fire (proves the gate reads the real pipeline).
      if (process.env.POISON === '1' && base === 'lcs-grammar.js' && fp) {
        res.writeHead(200, { 'Content-Type': 'application/javascript' });
        res.end(fs.readFileSync(fp, 'utf8') +
          '\n;window.LCSGrammar.howManyQuestion=function(){return "How many things?";};');
        return;
      }
      if (!fp) {
        res.writeHead(200, { 'Content-Type': 'application/javascript' });
        res.end('/* stub ' + base + ' */');
        return;
      }
    }
    if (fp && fs.existsSync(fp)) {
      const type = fp.endsWith('.html') ? 'text/html; charset=utf-8' : 'application/javascript; charset=utf-8';
      res.writeHead(200, { 'Content-Type': type });
      res.end(fs.readFileSync(fp));
    } else { res.writeHead(404); res.end(''); }
  });
}

let failures = 0;
function fail(msg) { failures++; console.error('ASSERT FAIL: ' + msg); }
function ok(msg) { console.log('  ok: ' + msg); }

async function newPage(browser, port) {
  const page = await browser.newPage();
  await page.setRequestInterception(true);
  page.on('request', (r) => {
    const u = r.url();
    if (u.startsWith('http://localhost:' + port)) return r.continue();
    if (/fabric(\.min)?\.js/.test(u)) {
      return r.respond({ status: 200, contentType: 'application/javascript', body: fs.readFileSync(FABRIC) });
    }
    if (/\.(png|jpg|jpeg|webp|gif)(\?|$)/i.test(u)) {
      return r.respond({ status: 200, contentType: 'image/png', body: PNG });
    }
    if (/\.css(\?|$)/.test(u) || u.includes('fonts.googleapis')) {
      return r.respond({ status: 200, contentType: 'text/css', body: '/* blocked */' });
    }
    return r.respond({ status: 200, contentType: 'application/javascript', body: '/* blocked */' });
  });
  page.on('pageerror', e => console.log('  [pageerror]', String(e).slice(0, 120)));
  return page;
}

(async () => {
  const server = serve();
  await new Promise(r => server.listen(0, r));
  const port = server.address().port;
  const browser = await puppeteer.launch({ headless: 'new' });

  for (const loc of LOCALES) {
    // ================= FIND AND COUNT =================
    console.log(`\n=== FaC ${loc} ===`);
    {
      const page = await newPage(browser, port);
      await page.goto(`http://localhost:${port}/find-and-count.html?locale=${loc}`, { waitUntil: 'domcontentloaded', timeout: 60000 });
      await page.waitForFunction('typeof window.__sepGenerate === "function" && window.__lcsWorksheetHost && typeof window.LCSGrammar === "object"', { timeout: 30000 });
      await page.evaluate(async (l) => { try { await window.__sepGenerate({ locale: l, theme: 'animals', seed: 3 }); } catch (e) { /* export gate may fail; generation is what we need */ } }, loc);
      // Expected aria per vocab key, recomputed through the engine in the app page.
      const expectedAria = await page.evaluate((imgs, l) => {
        const out = {};
        imgs.forEach(im => {
          const key = ImageVocab.keyFromPath(im.path);
          const e = IMAGE_VOCABULARY[key];
          const forms = e ? e[l] : null;
          out[key] = (forms && forms[1])
            ? (LCSGrammar.howManyQuestion(l, { plural: forms[1], gender: forms[2] || null }) || LCSGrammar.howManyShort(l))
            : null;
        });
        return out;
      }, API_IMAGES, loc);
      let html;
      try { html = await page.evaluate(() => window.__lcsWorksheetHost.getHtml()); }
      catch (e) { fail(`FaC ${loc}: getHtml threw: ${String(e).slice(0, 200)}`); await page.close(); continue; }
      if (!html || html.length < 5000) { fail(`FaC ${loc}: deck html suspiciously small (${html && html.length})`); await page.close(); continue; }
      fs.writeFileSync(path.join(OUT, `deck-fac-${loc}.html`), html);
      await page.close();

      const deck = await newPage(browser, port);
      await deck.goto(`http://localhost:${port}/deck-fac-${loc}.html`, { waitUntil: 'domcontentloaded', timeout: 60000 });
      const r = await deck.evaluate(() => {
        const B = window.DECK_BUNDLE || null;
        const h1 = document.querySelector('h1');
        const p = document.querySelector('p');
        const arias = Array.from(document.querySelectorAll('input[aria-label]')).map(i => i.getAttribute('aria-label'));
        return {
          bundle: B ? JSON.parse(JSON.stringify(B)) : null,
          h1: h1 ? h1.textContent : '', p: p ? p.textContent : '',
          arias, lang: document.documentElement.lang || ''
        };
      });
      await deck.close();
      if (!r.bundle) { fail(`FaC ${loc}: DECK_BUNDLE not a global in deck.html`); }
      else {
        const B = r.bundle;
        if (B.contentLanguage !== loc) fail(`FaC ${loc}: contentLanguage=${B.contentLanguage}`);
        const targets = B.targets || [];
        if (!targets.length) fail(`FaC ${loc}: no targets in bundle`);
        targets.forEach(t => {
          if (!t.localizedPlural) fail(`FaC ${loc}: target ${t.key} missing localizedPlural`);
          if (!t.ariaHowMany) fail(`FaC ${loc}: target ${t.key} missing ariaHowMany`);
          else if (expectedAria[t.key] && t.ariaHowMany !== expectedAria[t.key])
            fail(`FaC ${loc}: target ${t.key} ariaHowMany "${t.ariaHowMany}" != engine "${expectedAria[t.key]}"`);
          if (EN_LEAK.test(t.ariaHowMany || '')) fail(`FaC ${loc}: English leak in aria "${t.ariaHowMany}"`);
        });
        const bjson = JSON.stringify(B);
        if (/undefined|\[object Object\]/.test(bjson)) fail(`FaC ${loc}: residue in bundle JSON`);
        const visible = (r.h1 + ' ' + r.p);
        if (EN_LEAK.test(visible)) fail(`FaC ${loc}: English leak in visible text "${visible.slice(0, 120)}"`);
        r.arias.forEach(a => { if (EN_LEAK.test(a)) fail(`FaC ${loc}: English leak in rendered aria "${a}"`); });
        ok(`FaC ${loc}: ${targets.length} targets; aria≡engine; h1="${r.h1.slice(0, 60)}"; sample aria="${(targets[0] || {}).ariaHowMany}"`);
      }
    }

    // ================= PREPOSITIONS (fill-in) =================
    console.log(`=== Prep ${loc} (fillin) ===`);
    {
      const page = await newPage(browser, port);
      await page.goto(`http://localhost:${port}/prepositions.html?locale=${loc}&__sbHeadless=1`, { waitUntil: 'domcontentloaded', timeout: 60000 });
      await page.waitForFunction('typeof window.__sepGenerate === "function" && window.__lcsWorksheetHost && typeof window.LCSGrammar === "object"', { timeout: 30000 });
      await page.evaluate(async (l) => { try { await window.__sepGenerate({ locale: l, theme: 'animals', seed: 3, mode: 'fillin' }); } catch (e) {} }, loc);
      let html;
      try { html = await page.evaluate(() => window.__lcsWorksheetHost.getHtml()); }
      catch (e) { fail(`Prep ${loc}: getHtml threw: ${String(e).slice(0, 200)}`); await page.close(); continue; }
      if (!html || html.length < 5000) { fail(`Prep ${loc}: deck html suspiciously small (${html && html.length})`); await page.close(); continue; }
      fs.writeFileSync(path.join(OUT, `deck-prep-${loc}.html`), html);
      await page.close();

      const deck = await newPage(browser, port);
      await deck.goto(`http://localhost:${port}/deck-prep-${loc}.html`, { waitUntil: 'domcontentloaded', timeout: 60000 });
      const r = await deck.evaluate(() => {
        const B = window.DECK_BUNDLE || null;
        return { bundle: B ? JSON.parse(JSON.stringify(B)) : null };
      });
      await deck.close();
      if (!r.bundle) { fail(`Prep ${loc}: DECK_BUNDLE not a global in deck.html`); }
      else {
        const B = r.bundle;
        if (B.contentLanguage !== loc) fail(`Prep ${loc}: contentLanguage=${B.contentLanguage}`);
        const slots = B.slots || [];
        const oc = B.optionChoices || [];
        if (!slots.length) fail(`Prep ${loc}: no slots in bundle`);
        if (oc.length !== slots.length) fail(`Prep ${loc}: optionChoices ${oc.length} != slots ${slots.length}`);
        slots.forEach((s, i) => {
          if (!s.expected || !s.expected.trim()) fail(`Prep ${loc}: slot ${i} empty expected`);
          if (loc !== 'en' && EN_PREPS.includes(s.expected)) fail(`Prep ${loc}: slot ${i} English expected "${s.expected}"`);
          const c = oc[i];
          if (!c) return;
          const opts = c.options || [];
          if (opts.length !== 3) fail(`Prep ${loc}: slot ${i} has ${opts.length} options`);
          const correct = opts.filter(o => o.isCorrect);
          if (correct.length !== 1) fail(`Prep ${loc}: slot ${i} has ${correct.length} correct options`);
          else if (correct[0].label !== s.expected) fail(`Prep ${loc}: slot ${i} correct option "${correct[0].label}" != expected "${s.expected}"`);
          const labels = opts.map(o => o.label);
          if (new Set(labels).size !== labels.length) fail(`Prep ${loc}: slot ${i} duplicate option labels ${JSON.stringify(labels)}`);
          labels.forEach(l => {
            if (!l || !String(l).trim()) fail(`Prep ${loc}: slot ${i} empty option label`);
            if (loc !== 'en' && EN_PREPS.includes(l)) fail(`Prep ${loc}: slot ${i} English option "${l}"`);
          });
        });
        const bjson = JSON.stringify(B);
        if (/\bundefined\b|\[object Object\]/.test(bjson)) fail(`Prep ${loc}: residue in bundle JSON`);
        ok(`Prep ${loc}: ${slots.length} slot(s); expected="${(slots[0] || {}).expected}"; options=${JSON.stringify(((oc[0] || {}).options || []).map(o => o.label))}`);
      }
    }
  }

  await browser.close();
  server.close();
  if (failures) { console.error(`\n${failures} WIRING ASSERTION(S) FAILED`); process.exit(1); }
  console.log('\nALL DECK WIRING ASSERTIONS PASSED');
})();
