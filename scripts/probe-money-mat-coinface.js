#!/usr/bin/env node
/* =====================================================================
   probe-money-mat-coinface.js — MEASURE the coin legibility multiplier.

   --mm-dz is a shipped constant, so it must come from a measurement and
   not from arithmetic on a napkin. This sweeps every currency the tool
   ships at every viewport in the DoD sweep and reports, per cell:

     minDigit   the smallest rendered digit size in px   (floor: 14, want 18)
     burst      labels whose text is wider than the disc that holds it
     purseRows  how many rows the purse wraps to          (a phone budget)
     purseH     the purse's rendered height in px

   ⚠ The overflow test is on the RENDERED BOX, not on a character count:
   a label bursts when its own scrollWidth exceeds the disc's usable inner
   width. Estimating "how many characters fit" is how the 11px numeral got
   shipped in the first place.

   Usage:
     node scripts/probe-money-mat-coinface.js               # ship value
     node scripts/probe-money-mat-coinface.js --dz=1.4,1.5,1.62,1.8
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const http = require('http');
const puppeteer = require('puppeteer');

const REPO = path.join(__dirname, '..');
const MINI = process.env.MM_TOOL_DIR || path.join(REPO, 'mini tools');
const IMGLIB = path.join(REPO, 'frontend', 'public', 'image-library-webp');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };

/* every currency the tool ships, reached through the locale that selects it */
const CURRENCIES = [
  { lang: 'en', cur: 'usd', n: 4 }, { lang: 'en', cur: 'gbp', n: 8 },
  { lang: 'de', cur: 'eur', n: 8 }, { lang: 'nl', cur: 'eur', n: 6 },
  { lang: 'pt', cur: 'brl', n: 5 }, { lang: 'sv', cur: 'sek', n: 4 },
  { lang: 'da', cur: 'dkk', n: 5 }, { lang: 'no', cur: 'nok', n: 4 }
];
const WIDTHS = [[320, 568], [360, 740], [412, 915], [768, 1024], [1024, 768], [1366, 768], [1920, 1080], [2560, 1440]];

const arg = process.argv.find((a) => a.startsWith('--dz='));
const dfArg = process.argv.find((a) => a.startsWith('--df='));
const DF = dfArg ? Number(dfArg.split('=')[1]) : null;
const DZS = arg ? arg.split('=')[1].split(',').map(Number) : [null];

function serve() {
  return http.createServer((req, res) => {
    const p = decodeURIComponent(req.url.split('?')[0]);
    const file = p.startsWith('/image-library-webp/')
      ? path.join(IMGLIB, p.slice('/image-library-webp/'.length))
      : path.join(MINI, p.replace(/^\/(mini-tools\/)?/, ''));
    fs.readFile(file, (err, buf) => {
      if (err) { res.statusCode = 404; res.end(); return; }
      res.setHeader('Content-Type', MIME[path.extname(file)] || 'application/octet-stream');
      res.end(buf);
    });
  });
}

(async () => {
  const server = serve();
  await new Promise((r) => server.listen(0, r));
  const PORT = server.address().port;
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });

  for (const dz of DZS) {
    console.log('');
    console.log(dz === null ? '=== SHIPPED --mm-dz ===' : `=== --mm-dz: ${dz} ===`);
    console.log('  cur      viewport   coins  minDigit  maxDigit  burst  purseRows  purseH');
    let worstDigit = Infinity, worstCell = '', anyBurst = [];

    for (const C of CURRENCIES) {
      for (const [w, h] of WIDTHS) {
        const page = await browser.newPage();
        await page.setViewport({ width: w, height: h });
        const q = `?lang=${C.lang}${C.lang === 'en' && C.cur === 'gbp' ? '' : ''}`;
        await page.goto(`http://127.0.0.1:${PORT}/money-mat.html${q}`, { waitUntil: 'networkidle0' });
        await new Promise((r) => setTimeout(r, 260));
        if (C.cur === 'gbp') {
          await page.evaluate(() => { MoneyMat.api.settings.enCurrency = 'gbp'; MoneyMat.render(); });
          await new Promise((r) => setTimeout(r, 220));
        }
        if (dz !== null || DF !== null) {
          await page.evaluate((d, f) => { const w = document.querySelector('.mm-wrap'); if (d !== null) w.style.setProperty('--mm-dz', String(d)); if (f !== null) w.style.setProperty('--mm-df', String(f)); }, dz, DF);
          await new Promise((r) => setTimeout(r, 120));
        }

        const m = await page.evaluate(() => {
          const discs = [...document.querySelectorAll('.mm-purse .mm-disc')];
          const out = { coins: discs.length, digits: [], burst: [] };
          for (const d of discs) {
            const b = d.querySelector('b') || d;
            out.digits.push(parseFloat(getComputedStyle(b).fontSize));
            /* usable inner width of a circle at its widest text line ~ 0.80 of
               the diameter once the 2.5px rim is allowed for */
            const box = d.getBoundingClientRect();
            const usable = box.width * 0.80;
            /* measure the face's own ink, not the flex container */
            const kids = [...d.childNodes].filter((n) => n.nodeType === 1);
            let ink = 0;
            for (const k of kids) ink += k.getBoundingClientRect().width;
            if (!kids.length) ink = d.scrollWidth;
            if (ink > usable) out.burst.push(d.textContent.trim() + ' ' + ink.toFixed(0) + '>' + usable.toFixed(0));
          }
          const purse = document.querySelector('.mm-purse');
          const pr = purse ? purse.getBoundingClientRect() : { height: 0 };
          /* ⚠ THIRD attempt, and the first two were both measuring diameter
             variation rather than wrapping. The purse is a centred flex row,
             so buttons of DIFFERENT heights sit at different `top` values
             inside one row — grouping on `top` (of the disc OR the button)
             reported 8 rows for a single row of 8 coins. Wrapping is
             unambiguous from the LEFT edge: a new row starts wherever the
             left edge goes backwards. */
          let rows = 0;
          const btns = [...document.querySelectorAll('.mm-purse .mm-coinbtn, .mm-purse .mm-notebtn')];
          if (btns.length) {
            rows = 1;
            let prev = -Infinity;
            for (const b of btns) {
              const l = b.getBoundingClientRect().left;
              if (l < prev - 1) rows++;
              prev = l;
            }
          }
          return { ...out, purseH: Math.round(pr.height), rows };
        });

        const min = m.digits.length ? Math.min(...m.digits) : 0;
        const max = m.digits.length ? Math.max(...m.digits) : 0;
        if (min && min < worstDigit) { worstDigit = min; worstCell = `${C.cur}@${w}`; }
        if (m.burst.length) anyBurst.push(`${C.cur}@${w}: ${m.burst.join(' | ')}`);
        console.log(
          `  ${(C.lang + '/' + C.cur).padEnd(8)} ${(w + 'x' + h).padEnd(10)} ${String(m.coins).padStart(5)}` +
          `  ${min.toFixed(1).padStart(8)}  ${max.toFixed(1).padStart(8)}  ${String(m.burst.length).padStart(5)}` +
          `  ${String(m.rows).padStart(9)}  ${String(m.purseH).padStart(6)}`
        );
        await page.close();
      }
    }
    console.log(`  ── smallest digit anywhere: ${worstDigit.toFixed(1)}px at ${worstCell}  (floor 14, want 18)`);
    if (anyBurst.length) { console.log('  ── BURST:'); anyBurst.forEach((b) => console.log('     ' + b)); }
    else console.log('  ── no label bursts its disc');
  }

  await browser.close();
  server.close();
})();
