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
    async evaluate(fn, ...args) {
      const W = win();
      if (typeof fn !== 'function') return roundTrip(W.eval(String(fn)));
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
 * Put html into the gate iframe and wait until it is laid out the way puppeteer's `networkidle0` + fonts.ready leaves it:
 * the document loaded, every <img> settled (loaded or broken — the broken-image lint must see the broken ones), fonts ready.
 */
function mountHtml(iframe, html) {
  return new Promise((resolve) => {
    iframe.addEventListener('load', async () => {
      const d = iframe.contentDocument;
      await Promise.all([...d.images].map((img) => (img.complete ? null : new Promise((r) => { img.addEventListener('load', r, { once: true }); img.addEventListener('error', r, { once: true }); }))));
      try { await d.fonts.ready; } catch (e) { /* lints still run */ }
      resolve(pageShim(iframe));
    }, { once: true });
    iframe.srcdoc = html;
  });
}

module.exports = { pageShim, mountHtml };
