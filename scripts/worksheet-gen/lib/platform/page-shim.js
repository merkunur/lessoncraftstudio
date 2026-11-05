/**
 * Page shim (ARCHITECTURE §6.1) — a Puppeteer-shaped `page` over a same-origin iframe, so the catalogue's own
 * page gates (qa/lints.js runLints, every type's verify(page)) run unchanged on a page made in the browser.
 *
 * evaluate(fn, ...args) compiles fn's source INSIDE the iframe's realm and passes arguments and the result through
 * JSON — the serialisation boundary Puppeteer imposes — so a verify body that works in the catalogue pipeline
 * (no closures over Node values) works here, and one that does not fails the same way in both.
 *
 * Raster oracles (page.screenshot) and input simulation are build-time only (ARCHITECTURE §6): they throw, and the
 * template that needs them is not offered for live generation.
 */
'use strict';

const roundTrip = (v) => (v === undefined ? undefined : JSON.parse(JSON.stringify(v)));

function pageShim(iframe) {
  const win = () => iframe.contentWindow;
  const doc = () => iframe.contentDocument;
  const buildTimeOnly = (what) => () => { throw new Error('page.' + what + ' is build-time only (no live generation for this template)'); };
  return {
    // a type's verify may ask whether it runs in the maker (no screenshot: a raster oracle works on the page's own SVG)
    live: true,
    async evaluate(fn, ...args) {
      const W = win();
      // a source string's value is awaited too, as Puppeteer does (an async expression: lib/fd-browser-diff.js evalSource)
      if (typeof fn !== 'function') return roundTrip(await W.eval(String(fn)));
      const F = W.Function;
      const compiled = new F('return (' + fn.toString() + ')')();
      return roundTrip(await compiled.apply(null, args.map(roundTrip)));
    },
    async addStyleTag({ content }) {
      const s = doc().createElement('style');
      s.textContent = content || '';
      doc().head.appendChild(s);
      return s;
    },
    screenshot: buildTimeOnly('screenshot'),
    setViewport: buildTimeOnly('setViewport'),
    click: buildTimeOnly('click'),
    keyboard: { press: buildTimeOnly('keyboard'), type: buildTimeOnly('keyboard') },
  };
}

/**
 * The page is measured the way the catalogue measures it: one CSS pixel = one device pixel (puppeteer, scale 1).
 * A teacher's browser lays the gate frame out at its own zoom (2026-11-05: Chrome at 1.2 — browser zoom × the screen's
 * scaling — put a 36 px picture at 35.99 px and borders a third of a pixel thinner, so 21 of 24 spelling pages failed
 * their own checks and the maker said "This page couldn't be created"). zoom: 1 / devicePixelRatio on the frame's root
 * makes the layout fall on whole device pixels again — measured: every box of a page identical to scale 1 at 0.9, 1.1,
 * 1.2 and 1.75 — and the measuring calls are read back in the page's own CSS pixels. Whether a browser reports
 * getBoundingClientRect zoomed or not is MEASURED here (a 100 px probe), never assumed.
 */
function unzoom(iframe) {
  const W = iframe.contentWindow, d = iframe.contentDocument;
  const dpr = (iframe.ownerDocument && iframe.ownerDocument.defaultView && iframe.ownerDocument.defaultView.devicePixelRatio) || 1;
  if (Math.abs(dpr - 1) < 1e-6 || !d.documentElement || !d.body) return;
  d.documentElement.style.zoom = String(1 / dpr);
  const probe = d.createElement('div');
  probe.style.cssText = 'position:absolute;left:0;top:0;width:100px;height:100px;visibility:hidden';
  d.body.appendChild(probe);
  const k = probe.getBoundingClientRect().width / 100;   // 1/dpr where the browser reports zoomed boxes, 1 where it does not
  probe.remove();
  if (!(k > 0) || Math.abs(k - 1) < 1e-4) return;
  // read back on a 1/4096 px grid: dividing by a float k leaves noise (a 44 px picture read 43.99999963 and failed "< 44",
  // G1-349 — zoom-checks 2026-11-05); a layout value is a multiple of 1/64 px, so the grid keeps every one of them exactly
  const q = (v) => Math.round((v / k) * 4096) / 4096;
  const un = (r) => new W.DOMRect(q(r.x), q(r.y), q(r.width), q(r.height));
  for (const P of [W.Element.prototype, W.Range.prototype]) {
    const g = P.getBoundingClientRect, gs = P.getClientRects;
    P.getBoundingClientRect = function () { return un(g.call(this)); };
    P.getClientRects = function () { const a = Array.from(gs.call(this), un); a.item = (i) => a[i] || null; return a; };
  }
}

/**
 * Put html into the gate iframe and wait until it is laid out the way puppeteer's `networkidle0` + fonts.ready leaves it:
 * the document loaded, every <img> settled (loaded or broken — the broken-image lint must see the broken ones), fonts ready.
 */
function mountHtml(iframe, html) {
  return new Promise((resolve) => {
    iframe.addEventListener('load', async () => {
      const d = iframe.contentDocument;
      unzoom(iframe);
      await Promise.all([...d.images].map((img) => (img.complete ? null : new Promise((r) => { img.addEventListener('load', r, { once: true }); img.addEventListener('error', r, { once: true }); }))));
      try { await d.fonts.ready; } catch (e) { /* lints still run */ }
      resolve(pageShim(iframe));
    }, { once: true });
    iframe.srcdoc = html;
  });
}

module.exports = { pageShim, mountHtml };
