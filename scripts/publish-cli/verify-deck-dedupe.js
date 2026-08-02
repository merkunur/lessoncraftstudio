#!/usr/bin/env node
/**
 * Prove a deduped deck.html behaves IDENTICALLY to the original.
 *
 * The dedupe blanks DECK_BUNDLE.worksheetImage and rehydrates it from the DOM.
 * That is only safe if, by the time anything can read it, the property holds
 * the exact same string. This asserts that in a real browser, plus the things
 * that would break if the splice damaged the file.
 *
 *   node scripts/publish-cli/verify-deck-dedupe.js --orig=a.html --deduped=b.html
 *
 * Exits 1 on any divergence. Poison-testable: run it with --deduped pointed at
 * a deliberately broken file and it must FAIL.
 */
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const m = a.match(/^--([^=]+)(?:=(.*))?$/);
    return m ? [m[1], m[2] ?? true] : [a, true];
  }),
);

async function probe(browser, file) {
  const page = await browser.newPage();
  await page.setViewport({ width: 900, height: 1200 });
  const errors = [];
  page.on('pageerror', (e) => errors.push(String(e.message).slice(0, 120)));
  await page.goto('file:///' + path.resolve(file).replace(/\\/g, '/'), { waitUntil: 'networkidle2', timeout: 120000 });
  await new Promise((r) => setTimeout(r, 1200));
  const m = await page.evaluate(() => {
    const img = document.getElementById('lcs-worksheet-img');
    const wi = (window.DECK_BUNDLE && window.DECK_BUNDLE.worksheetImage) || '';
    return {
      // the visible backdrop actually decoded
      imgOk: !!img && img.naturalWidth > 0 && img.naturalHeight > 0,
      imgW: img ? img.naturalWidth : 0,
      // the celebration modal's source, as the runtime will read it
      wiLen: wi.length,
      wiHead: wi.slice(0, 48),
      wiMatchesImg: !!img && wi === img.src,
      // interactive surface intact
      slots: document.querySelectorAll('[class*="lcs-slot"], .lcs-cell, [data-slot]').length,
      bundleKeys: window.DECK_BUNDLE ? Object.keys(window.DECK_BUNDLE).length : 0,
      title: (document.title || '').slice(0, 40),
    };
  });
  await page.close();
  return { ...m, errors };
}

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--allow-file-access-from-files'] });
  const a = await probe(browser, args.orig);
  const b = await probe(browser, args.deduped);
  await browser.close();

  const sa = fs.statSync(args.orig).size, sb = fs.statSync(args.deduped).size;
  console.log(`  original : ${sa} bytes`);
  console.log(`  deduped  : ${sb} bytes   (-${Math.round((100 * (sa - sb)) / sa)}%)\n`);

  const rows = [
    ['backdrop decoded', a.imgOk, b.imgOk, a.imgOk === b.imgOk && b.imgOk === true],
    ['backdrop width', a.imgW, b.imgW, a.imgW === b.imgW && b.imgW > 0],
    ['worksheetImage length', a.wiLen, b.wiLen, a.wiLen === b.wiLen && b.wiLen > 1000],
    ['worksheetImage head', a.wiHead.slice(0, 24) + '…', b.wiHead.slice(0, 24) + '…', a.wiHead === b.wiHead],
    ['wi === img.src', a.wiMatchesImg, b.wiMatchesImg, b.wiMatchesImg === true],
    ['interactive slots', a.slots, b.slots, a.slots === b.slots],
    ['DECK_BUNDLE keys', a.bundleKeys, b.bundleKeys, a.bundleKeys === b.bundleKeys],
    ['document title', a.title, b.title, a.title === b.title],
    ['JS errors', a.errors.length, b.errors.length, b.errors.length <= a.errors.length],
  ];
  let bad = 0;
  console.log('  check                    original              deduped               verdict');
  for (const [name, av, bv, ok] of rows) {
    if (!ok) bad++;
    console.log(`  ${String(name).padEnd(24)} ${String(av).padEnd(21)} ${String(bv).padEnd(21)} ${ok ? 'ok' : 'FAIL'}`);
  }
  if (b.errors.length) console.log('\n  deduped page errors:', b.errors.slice(0, 3));

  /* Non-vacuity: if the probe found no image and no bundle at all, it verified
     nothing — that is a harness failure, not a pass. */
  if (!b.imgW || !b.bundleKeys) { console.log('\nFAIL: probe measured nothing (no image or no bundle) — harness broken.'); process.exit(1); }

  console.log(bad ? `\nFAIL: ${bad} check(s) diverged.` : '\nPASS: deduped deck is behaviourally identical.');
  process.exit(bad ? 1 : 0);
})();
