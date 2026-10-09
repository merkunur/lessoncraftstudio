/**
 * fd-browser-diff.js — the pixel gate of a Find-the-Differences page, run INSIDE the rendered page (nt2-G / b7).
 *
 * `verify(page)` of the type cannot trust its own stamps alone (a stamp can say "5 differences" over a picture with
 * four); it draws the two panel SVGs onto canvases at the printed scale, subtracts them, dilates the changed pixels
 * and counts connected components — the differences a child can SEE — then checks them against the hotspot stamps.
 *
 *   browserDiff(opts) — a plain function with NO closure (it is serialised with .toString() and evaluated in the page):
 *     opts { panel1: selector, panel2: selector, hotspots: selector, scale: px per CSS px (default 1), dilate: px (3),
 *            noise: px² (10), mirrored: bool (panel 2 is flipped: compare against panel 1 mirrored) }
 *     → { components: [{x0,y0,x1,y1,area}] (CSS px of panel 2's box), fails: string[], count, w, h }
 *   fails: a component outside every diff hotspot · a diff hotspot with no component · a decoy hotspot with a component
 *   · two diff hotspots closer than opts.minSep (default 24 px).
 *
 *   evalSource(opts) → the string `page.evaluate` runs.
 */
'use strict';

function browserDiff(opts) {
  return new Promise((resolve) => {
    const p1 = document.querySelector(opts.panel1), p2 = document.querySelector(opts.panel2);
    if (!p1 || !p2) return resolve({ fails: ['panels not found'], components: [], count: 0 });
    const r2 = p2.getBoundingClientRect(), r1 = p1.getBoundingClientRect();
    const S = opts.scale || 1, W = Math.round(r2.width * S), H = Math.round(r2.height * S);
    if (Math.abs(r1.width - r2.width) > 1 || Math.abs(r1.height - r2.height) > 1) return resolve({ fails: ['panels differ in size: ' + r1.width + 'x' + r1.height + ' vs ' + r2.width + 'x' + r2.height], components: [], count: 0 });
    const draw = (el, mirror) => new Promise((res) => {
      const svg = el.cloneNode(true);
      // the hotspots and rings are not picture content: strip them before rasterising
      svg.querySelectorAll('[data-lcs-fd-hotspot], [data-lcs-fd-ring]').forEach((n) => n.remove());
      svg.setAttribute('width', W); svg.setAttribute('height', H);
      const blob = new Blob([new XMLSerializer().serializeToString(svg)], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob), img = new Image();
      img.onload = () => {
        const c = document.createElement('canvas'); c.width = W; c.height = H;
        const g = c.getContext('2d'); g.fillStyle = '#fff'; g.fillRect(0, 0, W, H);
        if (mirror) { g.translate(W, 0); g.scale(-1, 1); }
        g.drawImage(img, 0, 0, W, H); URL.revokeObjectURL(url);
        res(g.getImageData(0, 0, W, H).data);
      };
      img.onerror = () => res(null);
      img.src = url;
    });
    Promise.all([draw(p1, !!opts.mirrored), draw(p2, false)]).then(([a, b]) => {
      if (!a || !b) return resolve({ fails: ['could not rasterise a panel'], components: [], count: 0 });
      const n = W * H, d = new Uint8Array(n);
      for (let i = 0; i < n; i++) { const j = i * 4; const v = Math.max(Math.abs(a[j] - b[j]), Math.abs(a[j + 1] - b[j + 1]), Math.abs(a[j + 2] - b[j + 2])); if (v > 60) d[i] = 1; }
      const R = (opts.dilate == null ? 3 : opts.dilate) * S;
      // separable square dilation
      const t = new Uint8Array(n), dd = new Uint8Array(n);
      for (let y = 0; y < H; y++) { let run = -1e9; for (let x = 0; x < W; x++) { if (d[y * W + x]) run = x; if (x - run <= R) t[y * W + x] = 1; } run = 1e9; for (let x = W - 1; x >= 0; x--) { if (d[y * W + x]) run = x; if (run - x <= R) t[y * W + x] = 1; } }
      for (let x = 0; x < W; x++) { let run = -1e9; for (let y = 0; y < H; y++) { if (t[y * W + x]) run = y; if (y - run <= R) dd[y * W + x] = 1; } run = 1e9; for (let y = H - 1; y >= 0; y--) { if (t[y * W + x]) run = y; if (run - y <= R) dd[y * W + x] = 1; } }
      // components of the dilated change, measured by their REAL changed pixels
      const lab = new Int32Array(n); const comps = []; const stack = new Int32Array(n); let k = 0;
      for (let s = 0; s < n; s++) {
        if (!dd[s] || lab[s]) continue;
        k++; let sp = 0; stack[sp++] = s; lab[s] = k;
        let real = 0, x0 = W, y0 = H, x1 = 0, y1 = 0;
        while (sp) {
          const p = stack[--sp], x = p % W, y = (p / W) | 0;
          if (d[p]) { real++; if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
          if (x > 0 && dd[p - 1] && !lab[p - 1]) { lab[p - 1] = k; stack[sp++] = p - 1; }
          if (x < W - 1 && dd[p + 1] && !lab[p + 1]) { lab[p + 1] = k; stack[sp++] = p + 1; }
          if (y > 0 && dd[p - W] && !lab[p - W]) { lab[p - W] = k; stack[sp++] = p - W; }
          if (y < H - 1 && dd[p + W] && !lab[p + W]) { lab[p + W] = k; stack[sp++] = p + W; }
        }
        if (real >= (opts.noise || 10) * S * S) comps.push({ x0: x0 / S, y0: y0 / S, x1: (x1 + 1) / S, y1: (y1 + 1) / S, area: real / (S * S) });
      }
      // the hotspots of panel 2, in the same CSS-px space (panel 2's box)
      const hs = [...p2.querySelectorAll(opts.hotspots || '[data-lcs-fd-hotspot]')].map((h) => { const r = h.getBoundingClientRect(); return { x0: r.left - r2.left, y0: r.top - r2.top, x1: r.right - r2.left, y1: r.bottom - r2.top, diff: h.hasAttribute('data-lcs-fd-diff'), id: h.getAttribute('data-lcs-fd-hotspot') }; });
      const inside = (c, h) => c.x0 >= h.x0 - 1 && c.y0 >= h.y0 - 1 && c.x1 <= h.x1 + 1 && c.y1 <= h.y1 + 1;
      const touches = (c, h) => !(c.x1 < h.x0 || h.x1 < c.x0 || c.y1 < h.y0 || h.y1 < c.y0);
      const fails = [];
      const diffs = hs.filter((h) => h.diff), decoys = hs.filter((h) => !h.diff);
      for (const c of comps) {
        const home = diffs.filter((h) => inside(c, h));
        if (home.length !== 1) fails.push(`a visible change at ${Math.round(c.x0)},${Math.round(c.y0)}-${Math.round(c.x1)},${Math.round(c.y1)} (area ${Math.round(c.area)}) sits in ${home.length} difference hotspots`);
      }
      for (const h of diffs) if (!comps.some((c) => inside(c, h))) fails.push(`difference hotspot ${h.id} holds no visible change`);
      for (const h of decoys) if (comps.some((c) => touches(c, h))) fails.push(`decoy hotspot ${h.id} overlaps a visible change`);
      const minSep = opts.minSep == null ? 24 : opts.minSep;
      for (let i = 0; i < diffs.length; i++) for (let j = i + 1; j < diffs.length; j++) {
        const a = diffs[i], b = diffs[j];
        const gap = Math.max(b.x0 - a.x1, a.x0 - b.x1, b.y0 - a.y1, a.y0 - b.y1);
        if (gap < minSep) fails.push(`difference hotspots ${a.id} and ${b.id} are only ${Math.round(gap)} px apart`);
      }
      resolve({ components: comps, fails, count: comps.length, diffHotspots: diffs.length, decoys: decoys.length, w: W / S, h: H / S });
    });
  });
}

function evalSource(opts) { return '(' + browserDiff.toString() + ')(' + JSON.stringify(opts) + ')'; }

module.exports = { browserDiff, evalSource };
