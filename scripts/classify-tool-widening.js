/* =====================================================================
   classify-tool-widening.js — does a card raise actually widen this tool?
   ---------------------------------------------------------------------
   Run:  node scripts/classify-tool-widening.js [--tool=k,k]

   ⭐⭐ WHY. rekenrek passed every gate while getting WORSE: FILL 40.3% ->
   66.1%, 116 assertions green, and a bead that is 64px at 1366 and 64px at
   2560. Only the empty rail grew. The FILL floor measures the apparatus BOX,
   so a box that grows while its repeated children stay fixed reports as a
   success and looks like a defect.

   So before any more caps are written, every remaining tool is sorted by the
   question that decides its fix:

     CARD-RAISE   the unit grows when the card does -> a cap is the whole fix
     GEOMETRY     the unit is pinned -> a cap makes it worse; the size comes
                  from JS or a clamp ceiling and that is where the work is
     NO-UNIT      no repeated child at rest (it appears with use) -> cannot be
                  classified from the opening frame; say so, do not guess

   The method is the honest one: render at 2560 twice, once as shipped and
   once with a 1740px cap injected, and compare the MEDIAN width of the most
   repeated inked child. No editing, no committing, no guessing from source.
   ===================================================================== */

'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const REPO = path.join(__dirname, '..');
const ROOT = path.join(REPO, 'mini tools');
const PUB = path.join(REPO, 'frontend', 'public');
const PORT = 5623;
const ONLY = (process.argv.find((a) => a.indexOf('--tool=') === 0) || '').split('=')[1];

const MIME = { '.js': 'application/javascript', '.json': 'application/json', '.css': 'text/css', '.html': 'text/html', '.webp': 'image/webp', '.png': 'image/png', '.svg': 'image/svg+xml' };
http.createServer((rq, rs) => {
  const u = decodeURIComponent(rq.url.split('?')[0]);
  const fp = u.indexOf('/image-library-webp/') === 0 ? path.join(PUB, u) : path.join(ROOT, u.replace('/mini-tools/', ''));
  if (!fs.existsSync(fp)) { rs.writeHead(404); rs.end('x'); return; }
  rs.writeHead(200, { 'Content-Type': MIME[path.extname(fp)] || 'application/octet-stream' });
  rs.end(fs.readFileSync(fp));
}).listen(PORT);

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

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

const MEASURE = (pfx) => {
  const draws = (e) => {
    const t = e.tagName;
    if (t === 'svg' || t === 'CANVAS' || t === 'IMG') return true;
    const cs = getComputedStyle(e), bg = cs.backgroundColor;
    if (bg && bg.replace(/\s/g, '') !== 'rgba(0,0,0,0)' && bg !== 'transparent') return true;
    if (cs.backgroundImage && cs.backgroundImage !== 'none') return true;
    if (parseFloat(cs.borderTopWidth) > 0) return true;
    return false;
  };
  const CHROME = /-(chip|foot|hint|gate|bar|controls|lock|scrim|overlay|modal|backdrop|veil)\b/;
  const scope = (pfx && document.querySelector('.' + pfx + '-wrap')) || document.querySelector('.lcs-stage');
  const app = document.querySelector('.lcs-app');
  if (!scope || !app) return null;
  const tally = {};
  let lo = Infinity, hi = -Infinity;
  scope.querySelectorAll('*').forEach((e) => {
    const c = String(e.className && e.className.baseVal !== undefined ? e.className.baseVal : e.className || '');
    if (!c || CHROME.test(c) || !draws(e)) return;
    const r = e.getBoundingClientRect();
    if (r.width < 8 || r.height < 8) return;
    if (r.left < lo) lo = r.left;
    if (r.right > hi) hi = r.right;
    c.split(/\s+/).filter(Boolean).forEach((cl) => { (tally[cl] = tally[cl] || []).push(r.width); });
  });
  const best = Object.keys(tally).filter((k) => tally[k].length >= 3)
    .sort((a, b) => tally[b].length - tally[a].length)[0];
  const ws = best ? tally[best].slice().sort((x, y) => x - y) : null;
  return {
    card: Math.round(app.getBoundingClientRect().width),
    appar: hi > lo ? Math.round(hi - lo) : 0,
    unit: best || null,
    med: ws ? Math.round(ws[Math.floor(ws.length / 2)]) : 0,
    n: ws ? ws.length : 0
  };
};

(async () => {
  const keys = ONLY ? ONLY.split(',') : roster();
  const b = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const out = { 'CARD-RAISE': [], GEOMETRY: [], 'NO-UNIT': [], SKIP: [] };
  console.log('tool                 pfx    card->card   unit               med->med   verdict');
  console.log('-------------------- -----  -----------  -----------------  ---------  -------');
  for (const key of keys) {
    const pfx = prefixOf(key);
    const shot = async (cap) => {
      const p = await b.newPage();
      try {
        await p.setViewport({ width: 2560, height: 1440 });
        await p.goto(`http://127.0.0.1:${PORT}/${key}.html?lang=de`, { waitUntil: 'domcontentloaded', timeout: 20000 });
        await p.waitForSelector('.lcs-app', { timeout: 12000 });
        await wait(520);
        if (cap) {
          await p.evaluate((c, pf) => {
            const st = document.createElement('style');
            st.textContent = '@media (min-width:2400px) and (min-height:1150px){body.' + pf +
              '-wide .lcs-app,.lcs-app{max-width:min(' + c + 'px,96vw) !important;}}';
            document.head.appendChild(st);
          }, cap, pfx);
          await wait(450);
        }
        const m = await p.evaluate(MEASURE, pfx);
        await p.close();
        return m;
      } catch (e) { await p.close(); return null; }
    };
    const base = await shot(null);
    const wide = await shot(1740);
    if (!base || !wide) { out.SKIP.push(key); console.log(key.padEnd(20) + '  BOOT FAIL'); continue; }
    let verdict;
    if (!base.unit || !wide.unit || base.unit !== wide.unit) verdict = 'NO-UNIT';
    else if (wide.card <= base.card + 2) verdict = 'SKIP';          /* already at the cap */
    else verdict = (wide.med > base.med + 2) ? 'CARD-RAISE' : 'GEOMETRY';
    out[verdict].push(key);
    console.log(key.padEnd(20) + ' ' + String(pfx || '?').padEnd(6) + ' ' +
      String(base.card + '->' + wide.card).padEnd(12) + ' ' +
      String(base.unit || '-').slice(0, 17).padEnd(17) + '  ' +
      String(base.med + '->' + wide.med).padEnd(9) + '  ' + verdict);
  }
  await b.close();
  console.log('\n  CARD-RAISE (' + out['CARD-RAISE'].length + '): ' + out['CARD-RAISE'].join(', '));
  console.log('\n  GEOMETRY   (' + out.GEOMETRY.length + '): ' + out.GEOMETRY.join(', '));
  console.log('\n  NO-UNIT    (' + out['NO-UNIT'].length + '): ' + out['NO-UNIT'].join(', '));
  console.log('\n  SKIP       (' + out.SKIP.length + '): ' + out.SKIP.join(', '));
  fs.writeFileSync(path.join(REPO, 'docs', 'audit-results', 'wide-viewport', 'widening-classes.json'), JSON.stringify(out, null, 1));
  process.exit(0);
})();
