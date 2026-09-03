/**
 * Hero-identity gate.
 *
 * The operator's first directive for homepage v10 was that the hero must be
 * the SAME visual composition on every device — one picture that scales, not
 * a per-device rearrangement. No existing gate measures that:
 * audit-homepage-responsive.js checks overflow and containment, which a
 * completely different mobile layout would pass cleanly.
 *
 * This screenshots the hero stage alone at every width, normalises each shot
 * to one common width, and compares them pixel-for-pixel against the
 * reference. A rearranged, reflowed or element-dropping hero diverges
 * immediately; a correctly scaled one does not.
 *
 * It also asserts the structural census — the same number of frames,
 * pedestals and instruments at every width — because that catches an element
 * silently disappearing at a breakpoint even when the layout still looks
 * plausible.
 *
 * Usage:
 *   node scripts/audit-hero-identity.js --base=http://localhost:3000 \
 *     [--path=/en/preview/homepage-v10] [--selector=.hv10-stage] \
 *     [--tolerance=6] [--out=dir] [--poison]
 *
 * --poison injects a width-conditional style that breaks the composition, to
 * prove this gate can actually fail. A gate that has never failed is not a
 * gate. Exit 1 on any failure.
 */
const path = require('path');
const fs = require('fs');
const puppeteer = require('puppeteer');
const sharp = require('sharp');

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const m = a.match(/^--([^=]+)(?:=(.*))?$/);
    return m ? [m[1], m[2] ?? true] : [a, true];
  }),
);
const BASE = args.base || 'http://localhost:3000';
const PATHNAME = args.path || '/en/preview/homepage-v10';
const SELECTOR = args.selector || '.hv10-stage';
const OUT = args.out || path.join(__dirname, '..', '.scratch', 'hero-identity');
/* --poison            a width-conditional rearrangement (the pixel diff catches it)
   --poison=overlap    one frame dropped onto the clock (the pixel diff CANNOT
                       catch it — it moves identically at every width; only
                       the v10.1 overlap census can)
   --poison=stray      a paragraph appended inside the type layer (likewise
                       invisible to the diff; caught by the typeChildren census) */
const POISON = args.poison === true ? 'rearrange' : (typeof args.poison === 'string' ? args.poison : null);
/* Mean per-channel difference, 0-255. Rasterising the same vector artwork at
   different sizes and scaling back is not bit-exact — antialiasing and
   gradient banding shift slightly — so a small tolerance is physical, not a
   fudge. A genuine rearrangement scores an order of magnitude above it. */
const TOLERANCE = Number(args.tolerance || 6);
const WIDTHS = [320, 360, 412, 768, 1024, 1366, 1920, 2560];
/* Every shot is resampled to this width before comparison. It MUST be <= the
   narrowest hero being compared, so every shot is DOWNsampled and none is
   upscaled: upscaling a small source blurs it and inflates the difference
   against a crisp large reference, which showed up as 412 scoring nearly
   double the larger widths while its composition was provably identical.
   That was a defect in the measurement, not in the page — the fix is to
   measure fairly rather than to loosen the threshold. */
const NORM_W = Number(args.norm || 316);

async function shoot(browser, width) {
  const page = await browser.newPage();
  await page.setRequestInterception(true);
  page.on('request', (r) => (/favicon/.test(r.url()) ? r.abort() : r.continue()));
  await page.setViewport({ width, height: 900, deviceScaleFactor: 1 });
  await page.goto(BASE + PATHNAME, { waitUntil: 'networkidle2', timeout: 120000 });

  if (POISON === 'rearrange') {
    // A plausible-looking mobile rearrangement: the kind of thing this gate
    // exists to reject.
    await page.addStyleTag({
      content: `@media (max-width: 700px){
        ${SELECTOR} > * { display:none !important; }
        ${SELECTOR} { background:#0E544A !important; }
      }`,
    });
  } else if (POISON === 'overlap') {
    // The third frame dropped 14 units — onto the clock. Identical at every
    // width, so the MAD stays at its clean value: only the census sees it.
    await page.addStyleTag({ content: `${SELECTOR} .hv10-frame:nth-of-type(6) { --y: 34 !important; }` });
  } else if (POISON === 'stray') {
    await page.evaluate((sel) => {
      const t = document.querySelector(sel + ' .hv10-type');
      if (t) { const p = document.createElement('p'); p.className = 'hv10-sub'; p.textContent = 'stray'; t.appendChild(p); }
    }, SELECTOR);
  } else if (POISON) {
    throw new Error(`unknown poison mode "${POISON}"`);
  }

  // Freeze every animation at the same point so instrument motion cannot be
  // mistaken for a composition difference.
  await page.evaluate(() => {
    document.getAnimations().forEach((a) => {
      try {
        a.pause();
        a.currentTime = 0;
      } catch {
        /* some animations refuse a seek; pausing is enough */
      }
    });
    document.querySelectorAll('img').forEach((i) => {
      i.loading = 'eager';
      i.fetchPriority = 'high';
    });
  });
  await page.evaluate(
    async () =>
      await Promise.all(
        [...document.images]
          .filter((i) => !i.complete)
          .map(
            (i) =>
              new Promise((res) => {
                i.addEventListener('load', res, { once: true });
                i.addEventListener('error', res, { once: true });
              }),
          ),
      ),
  );
  await new Promise((r) => setTimeout(r, 500));

  const el = await page.$(SELECTOR);
  if (!el) {
    await page.close();
    return { width, missing: true };
  }
  const census = await page.evaluate((sel) => {
    const s = document.querySelector(sel);
    const box = s.getBoundingClientRect();
    return {
      frames: s.querySelectorAll('.hv10-frame').length,
      plinths: s.querySelectorAll('.hv10-plinth').length,
      pieces: s.querySelectorAll('.hv10-piece').length,
      ratio: +(box.width / box.height).toFixed(3),
      // The headline band as a fraction of the stage height. The H1 keeps a
      // legibility floor, so below the crossover it is deliberately larger
      // than proportional; masking exactly that band lets every other part of
      // the picture be compared STRICTLY at 320 too.
      h1Top: (() => { const h = s.querySelector('.hv10-h1'); return h ? (h.getBoundingClientRect().top - box.top) / box.height : 0; })(),
      h1Bottom: (() => { const h = s.querySelector('.hv10-h1'); return h ? (h.getBoundingClientRect().bottom - box.top) / box.height : 0; })(),
      /* v10.1 — three things the pixel diff is STRUCTURALLY blind to, because
         they move identically at every width and so never change the MAD:
         (1) the type layer must hold exactly one child (the H1) — real-size
             text inside the poster is the deviation the identity law forbids;
         (2) no band element (placards / CTAs / the retired sub + pillar line)
             may stray into the stage;
         (3) no frame may overlap another frame or an instrument — v10 shipped
             frames 1/3 and 5/6 overlapping and frame 3 across the clock, and
             the gate could not see it. Bounding boxes include the ±1° tilt, so
             the composition table must clear that inflation too. */
      typeChildren: s.querySelectorAll('.hv10-type > *').length,
      strayText: s.querySelectorAll('.hv10-placards, .hv10-ctas, .hv10-sub, .hv10-pillars').length,
      overlaps: (() => {
        const els = [...s.querySelectorAll('.hv10-frame, .hv10-piece')].map((e) => e.getBoundingClientRect());
        const hits = [];
        for (let i = 0; i < els.length; i++) {
          for (let j = i + 1; j < els.length; j++) {
            const a = els[i], b = els[j];
            if (a.left < b.right - 1 && b.left < a.right - 1 && a.top < b.bottom - 1 && b.top < a.bottom - 1) hits.push(`${i}/${j}`);
          }
        }
        return hits;
      })(),
    };
  }, SELECTOR);
  const buf = await el.screenshot();
  await page.close();
  return { width, census, buf };
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  console.log(`Hero-identity — ${BASE}${PATHNAME}  selector ${SELECTOR}${POISON ? '  [POISONED]' : ''}`);
  const browser = await puppeteer.launch({ headless: 'new' });
  const shots = [];
  for (const w of WIDTHS) shots.push(await shoot(browser, w));
  await browser.close();

  const missing = shots.filter((s) => s.missing);
  if (missing.length) {
    console.log(`  FAIL  hero not found at ${missing.map((m) => m.width).join(', ')}`);
    process.exit(1);
  }

  // Normalise every shot to one width so only composition differences remain.
  const norm = [];
  for (const s of shots) {
    /* Equalise rasterisation before comparing. A 2560 shot squeezed to 380
       arrives heavily smoothed while a 412 shot barely changes, and comparing
       a smooth image against a crisp one inflates the difference even when
       the composition is provably identical (verified by eye at 412 vs 1024).
       A fixed blur applied to ALL of them removes that asymmetry while
       leaving genuine layout shifts fully visible — a moved element still
       moves. Measuring fairly, not loosening the bar. */
    const png = await sharp(s.buf)
      .resize(NORM_W)
      .blur(1.4)
      .removeAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });
    norm.push({ ...s, data: png.data, h: png.info.height });
    fs.writeFileSync(path.join(OUT, `hero-${s.width}.png`), s.buf);
  }

  /* Reference at a width ABOVE the H1's legibility-floor crossover (~373px),
     where scaling is pure. Below the crossover the headline is deliberately
     larger than proportional so it stays readable — the one documented
     deviation — so those widths are reported separately rather than being
     allowed to set the baseline. */
  const REF_W = Number(args.ref || 1024);
  const ref = norm.find((n) => n.width === REF_W) || norm[0];
  const CROSSOVER = 373;
  let failed = false;
  for (const s of norm) {
    const notes = [];
    if (s.census.ratio !== ref.census.ratio) notes.push(`ratio ${s.census.ratio} vs ${ref.census.ratio}`);
    for (const k of ['frames', 'plinths', 'pieces']) {
      if (s.census[k] !== ref.census[k]) notes.push(`${k} ${s.census[k]} vs ${ref.census[k]}`);
    }
    if (s.census.typeChildren !== 1) notes.push(`type layer holds ${s.census.typeChildren} children (only the H1 may live in the poster)`);
    if (s.census.strayText) notes.push(`${s.census.strayText} band element(s) inside the stage`);
    if (s.census.overlaps.length) notes.push(`overlaps ${s.census.overlaps.join(' ')} (frame/instrument boxes intersect)`);
    // Compare the overlapping region; heights match when the ratio matches.
    const rows = Math.min(s.h, ref.h);
    // Mask the union of both headline bands (plus a row of slack). This is
    // the ONLY licensed deviation, so masking it lets the strict tolerance
    // apply at EVERY width — including 320, where a blanket exemption
    // previously let a fully broken phone hero score 92 and still pass.
    const maskTop = Math.max(0, Math.floor(Math.min(s.census.h1Top, ref.census.h1Top) * rows) - 1);
    const maskBot = Math.min(rows, Math.ceil(Math.max(s.census.h1Bottom, ref.census.h1Bottom) * rows) + 1);
    let sum = 0;
    let counted = 0;
    for (let y = 0; y < rows; y++) {
      if (y >= maskTop && y < maskBot) continue;
      const base = y * NORM_W * 3;
      for (let i = base; i < base + NORM_W * 3; i++) {
        sum += Math.abs(s.data[i] - ref.data[i]);
        counted++;
      }
    }
    const mad = counted ? sum / counted : 0;
    if (!counted) notes.push('nothing compared (mask covered the whole hero)');
    if (Math.abs(s.h - ref.h) > 2) notes.push(`height ${s.h} vs ${ref.h}`);
    const belowFloor = s.width < CROSSOVER;
    if (mad > TOLERANCE) notes.push(`pixel divergence ${mad.toFixed(2)} > ${TOLERANCE}`);
    const ok = notes.length === 0;
    if (!ok) failed = true;
    console.log(
      `  ${String(s.width).padStart(4)}  ${ok ? (belowFloor ? 'PASS*' : 'PASS ') : 'FAIL '}  diff=${mad.toFixed(2)}` +
        `  ratio=${s.census.ratio}  frames=${s.census.frames} plinths=${s.census.plinths} pieces=${s.census.pieces}` +
        (notes.length ? `  ${notes.join(' · ')}` : ''),
    );
  }
  console.log(failed ? '\nFAIL: the hero is not the same composition at every width.' : '\nPASS: one composition, every width.');
  console.log('shots:', OUT);
  process.exit(failed ? 1 : 0);
})();
