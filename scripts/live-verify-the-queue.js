/* LIVE verification of TOOL #58 (Counting rebuild) on production.
   Drives the apparatus with real input (end button + rail keyboard) and
   MEASURES the render — never "it mounts". Reads the landed friend by its
   badge number, so no shared index convention can satisfy it by accident.
   Run: node scripts/live-verify-the-queue.js
   Env: QUE_LIVE_URL overrides the base (defaults to production). */
'use strict';
const puppeteer = require('puppeteer');
const URL_ = process.env.QUE_LIVE_URL || 'https://www.lessoncraftstudio.com/mini-tools/the-queue.html';
const LOCALES = process.env.QUE_LIVE_LOCALES ? process.env.QUE_LIVE_LOCALES.split(',') : ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
let pass = 0; const fails = [];
const ok = (c, m) => { if (c) pass++; else fails.push(m); };
const wait = ms => new Promise(r => setTimeout(r, ms));

async function badges(p) {
  return p.$eval('.que-svg', svg => {
    const vb = svg.viewBox.baseVal, r = svg.getBoundingClientRect(), out = [];
    svg.querySelectorAll('.que-badge text').forEach(t => { const bb = t.getBBox(); out.push({ cx: r.x + ((bb.x + bb.width / 2) / vb.width) * r.width, num: t.textContent }); });
    return out.sort((a, b) => a.cx - b.cx);
  });
}
async function total(p) { return p.$eval('.que-svg', svg => { const t = svg.querySelector('.que-total text'); return t ? t.textContent : null; }).catch(() => null); }

(async () => {
  const b = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  for (const lang of LOCALES) {
    const p = await b.newPage();
    await p.setViewport({ width: 768, height: 950 });
    const errs = []; p.on('pageerror', e => errs.push(String(e)));
    try {
      await p.goto(URL_ + '?lang=' + lang, { waitUntil: 'networkidle2', timeout: 60000 });
      await wait(900);
      ok(errs.length === 0, lang + ': page errors — ' + errs.join(' | '));

      // non-vacuity + no default end
      const nF = await p.$$eval('.que-body', e => e.length);
      ok(nF >= 4 && nF <= 5, lang + ': ' + nF + ' friends drawn');
      ok(await p.$eval('.que-hand', e => getComputedStyle(e).display === 'none'), lang + ': hand VISIBLE at rest — a default end');
      ok((await badges(p)).length === 0, lang + ': a badge stands at rest');

      // NO WORDS on the stage — every svg text is a numeral
      const st = await p.$$eval('.que-svg text', ts => ts.map(t => t.textContent.trim()));
      ok(st.every(s => /^\d+$/.test(s)), lang + ': non-numeral text on the stage: ' + JSON.stringify(st));

      // count fully from end A via the rail keyboard
      await p.click('.que-b-enda'); await wait(150);
      await p.focus('.que-rail'); await p.keyboard.press('End'); await wait(500);
      const bA = await badges(p), tA = await total(p);
      ok(bA.length === nF && tA === String(nF), lang + ': full sweep from A → ' + nF + ' badges + total ' + tA);
      const numsA = bA.map(x => x.num).join('');

      // reverse: count fully from end B → SAME total, different order
      await p.click('.que-b-endb'); await wait(150);
      await p.focus('.que-rail'); await p.keyboard.press('End'); await wait(500);
      const bB = await badges(p), tB = await total(p);
      ok(tB === String(nF), lang + ': the total is invariant from the other end (' + tA + ' vs ' + tB + ')');
      const numsB = bB.map(x => x.num).join('');
      ok(numsA !== numsB, lang + ': the numbers reverse from the other end (' + numsA + ' vs ' + numsB + ')');
      ok(numsA[0] !== numsB[0], lang + ': the same leftmost friend wears a different number each end');

      // tap floors
      const small = await p.$$eval('.que-btn', bs => bs.filter(x => { const r = x.getBoundingClientRect(); return r.height < 44 || r.width < 44; }).length);
      ok(small === 0, lang + ': ' + small + ' sub-44px controls');

      // no raw en leak in a non-en locale title
      if (lang !== 'en') { const title = await p.$eval('.lcs-title', e => e.textContent.trim()); ok(title !== 'The Counting Line' && title.length > 0, lang + ': title looks like an English leak (' + title + ')'); }
    } catch (e) { fails.push(lang + ': EXCEPTION ' + (e && e.message || e)); }
    await p.close();
  }
  await b.close();
  if (fails.length) { console.log(fails.length + ' FAIL (' + pass + ' passed):'); fails.forEach(f => console.log('  ✗ ' + f)); process.exit(1); }
  console.log('ALL PASS — ' + pass + ' live assertions across ' + LOCALES.length + ' locales on ' + URL_);
})();
