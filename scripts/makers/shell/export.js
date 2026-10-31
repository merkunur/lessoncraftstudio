/**
 * Downloads built in the browser (ARCHITECTURE §3): "Save as image" (PNG) and the raster PDF.
 *
 * The page html is drawn by the browser's own renderer: html → SVG <foreignObject> → <img> → <canvas>. An SVG used as an
 * image may not load anything, so every font and picture the page references is fetched first and put into the html as
 * a data: URI (all from our own origin, so the canvas is never tainted). The background is painted white before the page
 * is drawn (the old apps' black-JPEG lesson, §3 rule 4).
 *
 *   rasterize(html, { w, h, scale })  → <canvas> of the whole sheet of paper (html is the paper document)
 *   savePng(canvas, filename)          → download
 *   rasterPdf(canvases, paper, name)   → download: one JPEG per page at exact Letter/A4 size (pdf-lib, loaded on first use)
 */

const dataCache = new Map();

async function toDataUri(url) {
  if (!dataCache.has(url)) {
    dataCache.set(url, (async () => {
      const r = await fetch(url, { credentials: 'same-origin' });
      if (!r.ok) throw new Error(`asset ${r.status}: ${url}`);
      const blob = await r.blob();
      return await new Promise((res, rej) => { const fr = new FileReader(); fr.onload = () => res(fr.result); fr.onerror = rej; fr.readAsDataURL(blob); });
    })());
  }
  return dataCache.get(url);
}

const ASSET = /\.(woff2?|ttf|otf|webp|png|jpe?g|gif|svg)(\?[^"')]*)?$/i;

/** Every font (CSS url()) and picture (src / href) in the html as a data: URI. */
export async function inlineAssets(html) {
  const found = new Set();
  html.replace(/url\((['"]?)([^'")]+)\1\)/g, (_, q, u) => { if (!u.startsWith('data:') && ASSET.test(u)) found.add(u); return _; });
  html.replace(/\s(?:src|href|xlink:href)="([^"]+)"/g, (_, u) => { const v = u.replace(/&amp;/g, '&'); if (!v.startsWith('data:') && ASSET.test(v)) found.add(u); return _; });
  const map = new Map();
  await Promise.all([...found].map(async (u) => { map.set(u, await toDataUri(new URL(u.replace(/&amp;/g, '&'), location.href).href)); }));
  let out = html;
  for (const [u, d] of map) out = out.split(u).join(d);
  return out;
}

/** The paper document → a canvas (white background, scale × CSS px). */
export async function rasterize(html, { w, h, scale }) {
  const inlined = await inlineAssets(html.replace(/<script[\s\S]*?<\/script>/gi, ''));
  const doc = new DOMParser().parseFromString(inlined, 'text/html');
  doc.documentElement.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');
  const xhtml = new XMLSerializer().serializeToString(doc.documentElement);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><foreignObject x="0" y="0" width="${w}" height="${h}">${xhtml}</foreignObject></svg>`;
  const img = new Image();
  img.width = w; img.height = h;
  img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  await img.decode();
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(w * scale); canvas.height = Math.round(h * scale);
  const ctx = canvas.getContext('2d');
  /*
   * WebKit decodes the fonts and pictures inside an SVG image AFTER the image itself reports loaded, so an early draw
   * can come out without its pictures (measured: a picture-less PNG in 1 of 4 WebKit runs). Draw, wait, draw again
   * until two draws in a row are identical (compared on a 64 × 84 thumbnail), at most 12 times (≈ 3 s).
   */
  const probe = document.createElement('canvas');
  probe.width = 64; probe.height = 84;
  const pctx = probe.getContext('2d', { willReadFrequently: true });
  let last = null;
  for (let k = 0; k < 12; k++) {
    ctx.fillStyle = '#FFFFFF'; ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    pctx.drawImage(canvas, 0, 0, probe.width, probe.height);
    const sig = pctx.getImageData(0, 0, probe.width, probe.height).data.join(',');
    if (k > 0 && sig === last) break;
    last = sig;
    await new Promise((r) => setTimeout(r, k === 0 ? 50 : 250));
  }
  return canvas;
}

function download(blob, filename) {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  document.body.append(a);
  a.click();
  setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 4000);
}

const toBlob = (canvas, type, q) => new Promise((res, rej) => canvas.toBlob((b) => (b ? res(b) : rej(new Error('canvas toBlob failed'))), type, q));

export async function savePng(canvas, filename) {
  download(await toBlob(canvas, 'image/png'), filename);
}

/** paper = { wPt, hPt } in PDF points. One JPEG (q 0.85) per page, filling the page. */
export async function rasterPdf(canvases, paper, filename, title) {
  const { PDFDocument } = await import('/makers/app/vendor/pdf-lib.js');
  const pdf = await PDFDocument.create();
  if (title) pdf.setTitle(title);
  pdf.setCreator('LessonCraftStudio.com');
  pdf.setProducer('LessonCraftStudio.com');
  for (const c of canvases) {
    const jpg = await pdf.embedJpg(new Uint8Array(await (await toBlob(c, 'image/jpeg', 0.85)).arrayBuffer()));
    const page = pdf.addPage([paper.wPt, paper.hPt]);
    page.drawImage(jpg, { x: 0, y: 0, width: paper.wPt, height: paper.hPt });
  }
  download(new Blob([await pdf.save()], { type: 'application/pdf' }), filename);
}

/** A file name from the worksheet title: letters (any language), digits and dashes. */
export function fileName(title, suffix) {
  const base = (title || 'worksheet').normalize('NFC').replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-|-$/g, '').slice(0, 60) || 'worksheet';
  return `${base}${suffix}`;
}
