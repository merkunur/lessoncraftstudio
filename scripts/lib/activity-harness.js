/* =====================================================================
   activity-harness.js — the shared plumbing of every rebuilt activity's
   local-test-<x>.js and live-verify-<x>.js (rows 150+). A row's scripts
   write only their own scenarios; everything a real-pointer browser test
   needs to reach the activity lives here, once.

   Local:   const H = require('./lib/activity-harness');
            const L = await H.local({ html: 'value-keys-activity.html',
                                      id: '<activity id>', global: 'ValueKeysActivity',
                                      ready: '.vk-wrap' });
            const { page, errs } = await L.open(1024, 'de');
            await L.click(page, 'key-h2', 'what');        // [data-k="key-h2"], real pointer
            await L.drag(page, fromSel, toSel, 'what');   // real pointer drag
            await L.sweep(page, widths, (w) => L.measure(page, w, tag, { rest, miss }));
            await L.close();
   Live:    const V = await H.live({ html, global, ready });
            const s = await V.open(url, w);  →  { page, frame, frameEl, click(k), off, xy }
   Assertions: H.check() returns { is, pass, fail, report(name) }.
   Measure rules (the rebuilt-activity standard): no sideways scroll,
   nothing outside the card, every button ≥ 44 px, Check above the fold
   at rest, the hint near the work at a miss.
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const REPO = path.join(__dirname, '..', '..'), MINI = path.join(REPO, 'mini tools');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp', '.png': 'image/png' };
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const sp = (s) => String(s).replace(/[   ­]/g, ' ').replace(/\s+/g, ' ').trim();
const VH = (w) => w <= 320 ? 640 : w <= 360 ? 740 : w <= 420 ? 820 : w <= 800 ? 1000 : 900;
const arg = (k, d) => { const m = process.argv.find((a) => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const WIDTHS = [320, 360, 412, 600, 704, 768, 1024, 1366];

function check(limit) {
  const st = { pass: 0, fail: 0 };
  st.is = (c, m) => { if (c) st.pass++; else { st.fail++; if (st.fail < (limit || 150)) console.error('   FAIL: ' + m); } };
  st.report = (name) => { console.log(`${name}: ${st.pass} pass, ${st.fail} fail`); return st.fail ? 1 : 0; };
  return st;
}

/* load an activity file in a vm with its core, to read its strings: T(loc, key, args) */
function strings(actFile, globalName, ctxExtra) {
  const vm = require('vm');
  const ctx = Object.assign({ window: {} }, ctxExtra || {}); vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(path.join(MINI, actFile), 'utf8').replace(/inject\w+CSS\(\);/, '') + `\n;this.__A = (typeof ${globalName} !== 'undefined') ? ${globalName} : window.${globalName};`, ctx);
  const A = ctx.__A;
  return { A, T: (loc, k, a) => String(A.strings[k][loc]).replace(/\{(\w+)\}/g, (m, x) => a && x in a ? a[x] : m) };
}

function serve() {
  return http.createServer((req, res) => {
    const p = decodeURIComponent(req.url.split('?')[0]);
    const file = p.startsWith('/image-library-webp/') ? path.join(REPO, p) : path.join(MINI, p.replace(/^\/(mini-tools\/)?/, ''));
    fs.readFile(file, (e, b) => { if (e) { res.statusCode = 404; res.end(); return; } res.setHeader('Content-Type', MIME[path.extname(file)] || 'application/octet-stream'); res.end(b); });
  });
}
function watchErrors(page) {
  const errs = [];
  page.on('pageerror', (e) => errs.push(String(e)));
  page.on('console', (m) => { if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) errs.push(m.text()); });
  page.on('response', (r) => { if (r.status() >= 400 && !/favicon\.ico$|\/audio\/|fonts\.g/.test(r.url())) errs.push(r.status() + ' ' + r.url()); });
  return errs;
}

async function local(o) {
  const server = serve(); await new Promise((r) => server.listen(0, '127.0.0.1', r));
  const base = 'http://127.0.0.1:' + server.address().port;
  const browser = await require('puppeteer').launch({ headless: 'new', args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  const C = o.check || check();
  const L = { base, browser, C };
  L.open = async (w, loc) => {
    const page = await browser.newPage(), errs = watchErrors(page);
    await page.setViewport({ width: w, height: VH(w) });
    await page.goto(`${base}/${o.html}?activity=${o.id}&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction((g, r) => window[g] && window[g].st && document.querySelector(r), { timeout: 15000 }, o.global, o.ready);
    await page.evaluate((g) => { const a = window[g]; a.FAST = true; a.OK_MS = 600000; }, o.global);
    await page.evaluate(() => document.fonts ? document.fonts.ready.then(() => true) : true);
    return { page, errs };
  };
  /* a real pointer tap on the control's centre; it must be enabled and on top */
  L.click = async (page, k, what) => {
    const sel = k.startsWith('[') || k.startsWith('.') ? k : '[data-k="' + k + '"]';
    const h = await page.$(sel); if (!h) { C.is(false, what + ': ' + sel + ' is missing'); return false; }
    const ok = await page.evaluate((e) => { e.scrollIntoView({ block: 'center' }); const r = e.getBoundingClientRect(), x = r.left + r.width / 2, y = r.top + r.height / 2, hit = document.elementFromPoint(x, y); return !e.disabled && !!hit && (hit === e || e.contains(hit)); }, h);
    if (!ok) { C.is(false, what + ': ' + sel + ' cannot be clicked (disabled or covered)'); return false; }
    const b = await h.boundingBox(); if (!b) { C.is(false, what + ': ' + sel + ' vanished'); return false; }
    await page.mouse.click(b.x + b.width / 2, b.y + b.height / 2); await wait(10); return true;
  };
  /* a real pointer drag from the centre of one element to the centre of another (or by dx/dy) */
  L.drag = async (page, fromSel, to, what) => {
    const a = await page.$(fromSel); if (!a) { C.is(false, what + ': ' + fromSel + ' is missing'); return false; }
    let B;
    if (typeof to === 'string') { const b = await page.$(to); if (!b) { C.is(false, what + ': ' + to + ' is missing'); return false; } await page.evaluate((e) => e.scrollIntoView({ block: 'center' }), b); B = await b.boundingBox(); }
    else await page.evaluate((e) => e.scrollIntoView({ block: 'center' }), a);
    const A = await a.boundingBox(), x0 = A.x + A.width / 2, y0 = A.y + A.height / 2;
    const x1 = B ? B.x + B.width / 2 : x0 + (to.dx || 0), y1 = B ? B.y + B.height / 2 : y0 + (to.dy || 0);
    await page.mouse.move(x0, y0); await page.mouse.down();
    for (let i = 1; i <= 10; i++) await page.mouse.move(x0 + (x1 - x0) * i / 10, y0 + (y1 - y0) * i / 10);
    await page.mouse.up(); await wait(30); return true;
  };
  L.measure = async (page, w, tag, opt, scope) => {
    const m = await page.evaluate((scope) => {
      const card = document.querySelector('.lcs-app') || document.body, cr = card.getBoundingClientRect();
      const out = []; document.querySelectorAll(scope + ' *').forEach((e) => { if (e.closest('[data-qa-skip]') || e.closest('.is-ghostdrag') || e.closest('[aria-live]:not(:empty).sr')) return; const r = e.getBoundingClientRect(); if (!r.width || !r.height) return; if (getComputedStyle(e).position === 'absolute' && r.width <= 1) return; if (r.left < cr.left - 1 || r.right > cr.right + 1) out.push(e.className && e.className.baseVal != null ? e.className.baseVal : e.className); });
      const small = []; document.querySelectorAll(scope + ' button').forEach((b) => { const r = b.getBoundingClientRect(); if (r.width && (r.width < 44 || r.height < 44)) small.push(b.getAttribute('data-k') + ' ' + Math.round(r.width) + 'x' + Math.round(r.height)); });
      const chk = document.querySelector('[data-k="check"]'), n = document.querySelector('[data-qa="note"]');
      const sy = window.scrollY, noteR = n && n.textContent ? n.getBoundingClientRect() : null;
      return { sideways: document.documentElement.scrollWidth > window.innerWidth + 1, out: out.slice(0, 3), small: small.slice(0, 4), chkB: chk ? chk.getBoundingClientRect().bottom + sy : null, vh: window.innerHeight, noteBottom: noteR ? noteR.bottom + sy : null };
    }, scope || o.ready);
    C.is(!m.sideways, tag + ' @' + w + ': no sideways scroll');
    C.is(m.out.length === 0, tag + ' @' + w + ': nothing outside the card ' + m.out.join(','));
    C.is(m.small.length === 0, tag + ' @' + w + ': controls ≥ 44 px ' + m.small.join(','));
    if (opt && opt.rest) C.is(m.chkB != null && m.chkB <= m.vh, tag + ' @' + w + ': Check above the fold (' + Math.round(m.chkB) + ' / ' + m.vh + ')');
    if (opt && opt.miss) C.is(m.noteBottom != null && m.noteBottom <= m.vh + 300, tag + ' @' + w + ': the hint is near the work (' + Math.round(m.noteBottom) + ')');
    return m;
  };
  /* reach a state ONCE, then resize through the widths (the reach-once rule) */
  L.sweep = async (loc, name, reach, opt, widths) => {
    widths = widths || WIDTHS;
    const { page, errs } = await L.open(widths[widths.length - 1], loc);
    await reach(page); await wait(60);
    for (const w of widths) { await page.setViewport({ width: w, height: VH(w) }); await wait(120); await page.evaluate(() => window.scrollTo(0, 0)); await L.measure(page, w, loc + ' ' + name, opt); }
    C.is(errs.length === 0, loc + ' ' + name + ': no console errors ' + errs.slice(0, 3).join(' | '));
    await page.close();
  };
  /* the shell's celebration bubble (the success line lives there, 0.5 s after the result) */
  L.bubble = (page) => page.evaluate(() => { const b = document.querySelector('.lcs-activity-bubble.show'); return b ? b.textContent : ''; });
  L.prompt = (page) => page.evaluate(() => { const p = document.querySelector('.lcs-activity-prompt-text'); return p ? p.textContent : ''; });
  L.nextShown = (page) => page.evaluate(() => { const b = document.querySelector('.lcs-activity-next'); return !!b && getComputedStyle(b).display !== 'none' && b.offsetParent !== null; });
  L.close = async () => { await browser.close(); server.close(); };
  return L;
}

async function live(o) {
  const QA = require('../lib/qa-header');
  const browser = await require('puppeteer').launch({ headless: 'new', args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  const C = o.check || check(1000);
  const V = { browser, C };
  V.status = async (url) => { const page = await browser.newPage(); await QA.apply(page); const res = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 90000 }); const s = res && res.status(); await page.close(); await wait(300); return s; };
  V.open = async (url, w) => {
    const page = await browser.newPage(); await QA.apply(page);
    await page.setViewport({ width: w, height: w > 500 ? 1000 : 844 });
    const sel = `iframe[src*="${o.html}"]`;
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 90000 });
    /* a cold page right after a deploy can miss the first wait, and Cloudflare can serve the old page for 5 min: reload before failing */
    for (let i = 0; i < 2 && !(await page.waitForSelector(sel, { timeout: 45000 }).catch(() => null)); i++) await page.reload({ waitUntil: 'domcontentloaded', timeout: 90000 });
    await page.waitForNetworkIdle({ idleTime: 800, timeout: 30000 }).catch(() => {}); await wait(1500);
    const frameEl = await page.$(sel);
    if (!frameEl) return { page, frameEl: null };
    const frame = await frameEl.contentFrame();
    await frame.waitForFunction((g, r) => window[g] && window[g].st && document.querySelector(r), { timeout: 45000 }, o.global, o.ready);
    const off = () => page.evaluate((f) => { const b = f.getBoundingClientRect(); return { x: b.left, y: b.top }; }, frameEl);
    const xy = (s) => frame.evaluate((s) => { const e = document.querySelector(s); if (!e) return null; const q = e.getBoundingClientRect(); return { x: q.left + q.width / 2, y: q.top + q.height / 2 }; }, s);
    const click = async (k, tag) => { const s = '[data-k="' + k + '"]', e = await xy(s); if (!e) { C.is(false, (tag || '') + ' there is a «' + s + '»'); return false; } const o0 = await off(); await page.evaluate((y) => window.scrollTo({ top: window.scrollY + y - 380, behavior: 'instant' }), o0.y + e.y); await wait(100); const e2 = await xy(s), o1 = await off(); await page.mouse.click(o1.x + e2.x, o1.y + e2.y); await wait(90); return true; };
    const fit = () => page.evaluate((f) => { const fr = f.getBoundingClientRect(); const c = f.contentDocument.querySelector('.lcs-app').getBoundingClientRect(); return { frameH: fr.height, cardH: c.height }; }, frameEl);
    return { page, frame, frameEl, off, xy, click, fit, src: await page.evaluate((f) => f.getAttribute('src'), frameEl) };
  };
  V.close = () => browser.close();
  return V;
}

const WRAPPER = () => (fs.readFileSync(path.join(REPO, 'frontend', 'app', '[locale]', 'activities', '[slug]', 'page.tsx'), 'utf8').match(/ACTIVITY_WRAPPER_VERSION = '([\d.]+)'/) || [])[1];
const row = (manifestFile, id) => JSON.parse(fs.readFileSync(path.join(MINI, manifestFile), 'utf8')).find((x) => x.id === id);

module.exports = { REPO, MINI, LOCALES, WIDTHS, VH, wait, sp, arg, check, strings, local, live, WRAPPER, row };
