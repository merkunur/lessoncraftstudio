/**
 * Run a template's page checks (runtime.gatePage) the way the MAKER runs them — through page-shim.js, in a
 * frame inside a browser at a real screen scale (--force-device-scale-factor; puppeteer's deviceScaleFactor emulation
 * does not reproduce the layout rounding of a zoomed Chrome) — on pages built in Node. Used by gates/zoom-checks.js.
 *
 *   const z = await zoomVerifier({ dsf: 1.2, unzoom: true }); const fails = await z.check(html, type); await z.close();
 */
'use strict';
const fs = require('fs');
const http = require('http');
const path = require('path');
const REPO = path.resolve(__dirname, '..', '..', '..', '..');
const puppeteer = require(path.join(REPO, 'node_modules', 'puppeteer'));
const { handler } = require('../../serve.js');
const runtime = require('../../runtime.js');   // gatePage: the maker's own verdict (a key is judged by its layout lints only)

const SHIM = fs.readFileSync(path.join(REPO, 'scripts', 'worksheet-gen', 'lib', 'platform', 'page-shim.js'), 'utf8');
const FONTS = '/' + path.join(REPO, 'scripts', 'worksheet-gen', 'assets', 'fonts').replace(/\\/g, '/').replace(/^\//, '') + '/';
const THEMES = '/' + path.join(REPO, 'scripts', 'worksheet-gen', 'cache', 'themes-512').replace(/\\/g, '/').replace(/^\//, '') + '/';

/** the page's file:/// fonts and pictures as the maker serves them (an http page cannot read file://) */
function served(html, base) {
  return String(html)
    .split('file://' + FONTS).join(base + '/makers-assets/fonts/')
    .split('file://' + THEMES).join(base + '/makers-assets/themes-512/');
}

async function zoomVerifier({ dsf = 1.2, unzoom = true } = {}) {
  const srv = http.createServer(handler); await new Promise((r) => srv.listen(0, r));
  const base = `http://localhost:${srv.address().port}`;
  const browser = await puppeteer.launch(dsf === 1 ? {} : { args: ['--force-device-scale-factor=' + dsf] });
  const p = await browser.newPage();
  if (dsf !== 1) await p.setViewport(null);
  await p.goto(base + '/', { waitUntil: 'load' });
  await p.evaluate((SHIM, unzoom) => {
    const module = { exports: {} };
    new Function('module', 'exports', SHIM)(module, module.exports);
    window.__shim = module.exports;
    window.__unzoom = unzoom;
    const f = document.createElement('iframe');
    f.style.cssText = 'position:absolute;left:-10000px;top:0;width:703px;height:945px;border:0';
    document.body.append(f);
    window.__frame = f;
  }, SHIM, unzoom);
  // a puppeteer-shaped page whose evaluate runs INSIDE the frame through the shim (what the maker's checks see)
  const shimPage = {
    live: true,
    // a function is rebuilt from its source; SOURCE TEXT (clock-tasks.js passes an expression) goes to the shim as text,
    // which evaluates it inside the frame — as puppeteer and the maker do
    evaluate: (fn, ...args) => p.evaluate(async (src, isFn, args) => {
      const sp = window.__pg;
      return isFn ? sp.evaluate(new Function('return (' + src + ')')(), ...args) : sp.evaluate(src);
    }, typeof fn === 'function' ? fn.toString() : String(fn), typeof fn === 'function', args),
  };
  async function mount(html) {
    await p.evaluate(async (html) => {
      const f = window.__frame;
      if (window.__unzoom) window.__pg = await window.__shim.mountHtml(f, html);
      else window.__pg = await new Promise((r) => { f.addEventListener('load', async () => { await Promise.all([...f.contentDocument.images].map((i) => (i.complete ? null : new Promise((q) => { i.onload = i.onerror = q; })))); await f.contentDocument.fonts.ready; r(window.__shim.pageShim(f)); }, { once: true }); f.srcdoc = html; });
    }, served(html, base));
  }
  return {
    dpr: await p.evaluate(() => devicePixelRatio),
    /** the maker's verdict on html (runtime.gatePage: lints, the title / instruction lines, the type's verify; a key's layout) */
    async check(html, type, { key = false } = {}) {
      await mount(html);
      return runtime.gatePage(type, shimPage, { key });
    },
    /** mount html and run fn inside it through the shim (a measurement to read, not a verdict) */
    async measure(html, fn) { await mount(html); return shimPage.evaluate(fn); },
    async close() { await browser.close(); srv.close(); },
  };
}

module.exports = { zoomVerifier, served };
