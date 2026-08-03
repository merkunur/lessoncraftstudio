/* =====================================================================
   derive-tool-wide-tiers.js — Step 2 of the wide-viewport recipe
   ---------------------------------------------------------------------
   Run:  node scripts/derive-tool-wide-tiers.js [--tool=k,k]

   For every tool, MEASURES the chrome (everything in the card that is not
   the apparatus) in the LONGEST reachable state and the apparatus aspect,
   then DERIVES this tool's bench cap for each tier:

       benchCap(tier) = (tierMinHeight - chrome) / aspect

   ⚠ THIS IS NOT A GLOBAL MECHANISM. It computes each tool's OWN numbers
   from each tool's OWN chrome; the numbers differ per tool and every one
   is measured. Doing the arithmetic reliably is not the same as applying
   one cap to everything — which is the thing that was ruled out.

   ⚠ MEASURED IN GERMAN. The cold-line incident failed in es/pt/it/nl only
   and English fit, so an English-only derivation would under-count the
   chrome and re-create it. German is the longest of the eleven for chip
   rows and hint lines.

   ⚠ AND MEASURED AT A WIDE CARD, not at 720. Chrome height depends on
   card width (a foot row that wraps at 720 sits on one line at 1240), and
   the tiers only apply when the card IS wide. Measuring at 720 would
   over-count the chrome and produce needlessly small caps.

   Tiers, matching the shell:
     A  min-width 1367  min-height  880
     B  min-width 1800  min-height 1000
     C  min-width 2400  min-height 1150
   ===================================================================== */

'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const ROOT = path.join(__dirname, '..', 'mini tools');
const PORT = 5591;
const ONLY = (process.argv.find((a) => a.indexOf('--tool=') === 0) || '').split('=')[1];
const TIERS = [{ n: 'A', w: 1367, h: 880 }, { n: 'B', w: 1800, h: 1000 }, { n: 'C', w: 2400, h: 1150 }];

function roster() {
  return fs.readdirSync(ROOT).filter((f) => /\.html$/.test(f)).map((f) => f.replace(/\.html$/, ''))
    .filter((k) => fs.existsSync(path.join(ROOT, k + '.js')))
    .filter((k) => /LCS\.mount\(/.test(fs.readFileSync(path.join(ROOT, k + '.html'), 'utf8')))
    .filter((k) => !/-activity$/.test(k)).sort();
}
function prefixOf(key) {
  const src = fs.readFileSync(path.join(ROOT, key + '.js'), 'utf8');
  let m = /api\.el\(\s*['"]div['"]\s*,\s*['"]([a-z]+)-wrap['"]/.exec(src);
  if (m) return m[1];
  m = /getElementById\(\s*['"]([a-z]+)-style['"]/.exec(src);
  if (m) return m[1];
  const t = {};
  (src.match(/\.([a-z]{2,4})-[a-z][a-z0-9-]*\s*[,{]/g) || []).forEach((s) => {
    const p = /\.([a-z]{2,4})-/.exec(s)[1]; t[p] = (t[p] || 0) + 1;
  });
  return Object.keys(t).filter((p) => p !== 'lcs').sort((a, b) => t[b] - t[a])[0] || null;
}

const srv = http.createServer((rq, rs) => {
  const f = decodeURIComponent(rq.url.split('?')[0].replace('/mini-tools/', ''));
  const fp = path.join(ROOT, f);
  if (!fp.startsWith(ROOT) || !fs.existsSync(fp)) { rs.writeHead(404); rs.end('x'); return; }
  rs.writeHead(200, { 'Content-Type': f.endsWith('.js') ? 'application/javascript' : f.endsWith('.json') ? 'application/json' : f.endsWith('.css') ? 'text/css' : 'text/html' });
  rs.end(fs.readFileSync(fp));
}).listen(PORT);

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

/* Find the apparatus (the biggest thing that draws ink) and everything
   else in the card, then report the split. */
const PROBE = (pfx) => {
  const draws = (e) => {
    const t = e.tagName;
    if (t === 'svg' || t === 'CANVAS' || t === 'IMG' || t === 'VIDEO') return true;
    const cs = getComputedStyle(e), bg = cs.backgroundColor;
    if (bg && bg.replace(/\s/g, '') !== 'rgba(0,0,0,0)' && bg !== 'transparent') return true;
    if (cs.backgroundImage && cs.backgroundImage !== 'none') return true;
    if (parseFloat(cs.borderTopWidth) > 0) return true;
    return false;
  };
  const app = document.querySelector('.lcs-app');
  const stage = document.querySelector('.lcs-stage');
  const wrap = pfx ? document.querySelector('.' + pfx + '-wrap') : null;
  const scope = wrap || stage;
  if (!app || !scope) return null;

  let best = null, bw = 0;
  scope.querySelectorAll('*').forEach((e) => {
    const c = String(e.className && e.className.baseVal !== undefined ? e.className.baseVal : e.className || '');
    /* ⚠⚠ EXCLUDE THE SCRIM. Opening the paywall panel — which this script
       does on purpose, to reach the longest chrome — drops a full-viewport
       modal scrim into the card, and the ink test happily measured THAT as
       the apparatus. It is taller than the card, so `chrome = cardH -
       benchH` came out NEGATIVE: heart-words -332, open-number-line -496,
       syllable-splitter -364. A negative chrome would have derived
       enormous caps. The fix that surfaced it was the fix that caused it. */
    if (/-(chip|foot|hint|gate|bar|controls|lock|scrim|overlay|modal|backdrop|veil)\b/.test(c)) return;
    if (!draws(e)) return;
    /* and nothing that escapes the card is the apparatus */
    const rr = e.getBoundingClientRect();
    const ar2 = app.getBoundingClientRect();
    if (rr.height > ar2.height + 1 || rr.width > ar2.width + 1) return;
    const r = e.getBoundingClientRect();
    if (r.width > bw && r.height > 4) { bw = r.width; best = e; }
  });
  if (!best) return null;
  const br = best.getBoundingClientRect();
  const ar = getComputedStyle(best).aspectRatio;
  return {
    cardH: Math.round(app.getBoundingClientRect().height),
    benchW: Math.round(br.width), benchH: Math.round(br.height),
    benchEl: String(best.className && best.className.baseVal !== undefined ? best.className.baseVal : best.className || best.tagName).split(' ')[0],
    declaredAspect: (ar && ar !== 'auto') ? ar : null,
    vh: window.innerHeight
  };
};

(async () => {
  const keys = ONLY ? ONLY.split(',') : roster();
  const b = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const out = [];
  console.log('tool                 bench el        aspect  chrome   TierA   TierB   TierC   note');
  console.log('-------------------- --------------- ------- ------ ------- ------- ------- --------------------');

  for (const key of keys) {
    const pfx = prefixOf(key);
    const p = await b.newPage();
    let m = null;
    try {
      /* wide card + tall viewport: the regime the tiers actually apply in */
      await p.setViewport({ width: 1440, height: 1000 });
      await p.goto(`http://127.0.0.1:${PORT}/${key}.html?lang=de`, { waitUntil: 'domcontentloaded', timeout: 20000 });
      await p.waitForSelector('.lcs-app', { timeout: 12000 });
    } catch (e) { /* handled below */ }
    /* ⚠⚠ DRIVE THE LONGEST STATE BEFORE MEASURING, OR THE CHROME IS
       UNDER-COUNTED AND EVERY DERIVED CAP IS TOO GENEROUS.
       The first version measured the opening frame. For number-line that
       reported 412px of chrome against a hand-measurement of 533px — the
       132px gate panel, missing. A cap derived from 412 would let the
       bench grow until the gate opened and then push the tool past the
       fold, silently, because .lcs-app is overflow:hidden. That IS the
       cold-line 942px incident, arrived at by a script whose own header
       claimed it measured the longest state.
       So: open the paywall panel the way a free visitor does. */
    try {
      await wait(400);
      await p.evaluate(() => {
        const g = Object.keys(window).map((k) => window[k])
          .find((v) => v && typeof v === 'object' && typeof v._showGate === 'function');
        if (g) { try { g._showGate(); } catch (_) {} }
        /* fall back to the locked chip, which is how a free user gets there */
        const lock = document.querySelector('[class*="-lock"],[class*="-locked"]');
        if (lock && lock.click) lock.click();
      });
      await wait(500);
      m = await p.evaluate(PROBE, pfx);
      m.gateOpen = await p.evaluate(() => !!document.querySelector('[class*="-gate"]'));
    } catch (e) { m = null; }
    await p.close();

    if (!m || !m.benchW) { console.log(key.padEnd(20) + ' UNMEASURED — no inked apparatus found'); continue; }

    /* aspect: prefer the declared one, else the measured h/w */
    let a = null;
    if (m.declaredAspect) {
      const parts = m.declaredAspect.split('/').map(Number);
      if (parts.length === 2 && parts[0]) a = parts[1] / parts[0];
    }
    if (!a) a = m.benchH / m.benchW;
    const chrome = m.cardH - m.benchH;

    const caps = TIERS.map((t) => {
      if (a <= 0.001) return { t: t.n, cap: null };
      const ceil = Math.floor((t.h - chrome) / a);
      /* take a round number ~7% below the ceiling for locale slack */
      let cap = Math.floor(ceil * 0.93 / 20) * 20;
      if (cap < m.benchW) cap = null;              /* no headroom at this tier */
      return { t: t.n, cap: cap, ceil: ceil };
    });

    /* the gate panel is the longest chrome most tools have; say when it
       could not be opened, so an under-count is visible rather than silent */
    const note = (caps.every((c) => c.cap === null) ? 'NO HEADROOM at any tier' : '')
      + (m.gateOpen ? '' : '  [no gate panel — chrome may be under-counted]');
    console.log(
      key.padEnd(20) + ' ' + m.benchEl.slice(0, 15).padEnd(15) + ' ' +
      a.toFixed(3).padStart(7) + ' ' + String(chrome).padStart(6) + ' ' +
      caps.map((c) => String(c.cap === null ? '-' : c.cap).padStart(7)).join(' ') + '   ' + note
    );
    out.push({ key, pfx, benchEl: m.benchEl, benchW: m.benchW, aspect: +a.toFixed(4), chrome, caps });
  }

  await b.close(); srv.close();
  const dst = path.join(__dirname, '..', 'docs', 'audit-results', 'wide-viewport', 'derived-tiers.json');
  fs.writeFileSync(dst, JSON.stringify(out, null, 1));
  console.log('\n  derived caps written to docs/audit-results/wide-viewport/derived-tiers.json');
  console.log('  ⚠ these are the CEILINGS, not the shipped values — each tool still gets read and verified.');
})();
