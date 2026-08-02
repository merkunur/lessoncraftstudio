/**
 * Homepage gallery: room ORDER and NUMERAL SEQUENCE.
 *
 * The v10 homepage is a walk through numbered rooms. Two things about it fail
 * SILENTLY, which is why they need a gate of their own:
 *
 *  1. The Roman numerals are HARDCODED literals inside each room component
 *     (`<p className="hv10-room-label">II</p>` and friends in Rooms.tsx), not
 *     derived from position. Reorder the JSX and the gallery cheerfully renders
 *     I, III, II, IV, V, VI — still valid HTML, still a page, visibly wrong.
 *
 *  2. The rooms' prose is chained ("Then hand the idea...", "Every worksheet is
 *     ALSO paper"). A connector that has lost its antecedent is still a
 *     grammatical sentence, so nothing else catches it.
 *
 * Neither is visible to the responsive gate, the label gate, or the link gate.
 *
 *   node scripts/audit-room-order.js
 *   node scripts/audit-room-order.js --locales=en,de
 *
 * Exit 1 on any mismatch.
 */
const puppeteer = require('puppeteer');

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const m = a.match(/^--([^=]+)(?:=(.*))?$/);
    return m ? [m[1], m[2] ?? true] : [a, true];
  }),
);
const BASE = (args.base || 'https://www.lessoncraftstudio.com').replace(/\/$/, '');
const LOCALES = String(args.locales || 'en,de,es,fr,it,pt,nl,sv,da,no,fi').split(',').filter(Boolean);

/* The intended walk: tools -> worksheets -> activities -> makers -> sharing ->
   plans -> exit. `close` is deliberately unnumbered. */
const EXPECTED_SECTIONS = ['instruments', 'printroom', 'activities', 'studio', 'share', 'plans', 'close'];
const EXPECTED_NUMERALS = ['I', 'II', 'III', 'IV', 'V', 'VI'];

/* The word each locale uses for "also" — the back-reference that must NOT
   appear in the worksheets heading now that the room leads instead of replies.
   Whole-word matched with a Unicode-safe boundary: \b is ASCII-only and would
   never fire on `også` or `myös`. */
const ALSO = {
  en: 'also', de: 'auch', es: 'también', fr: 'aussi', it: 'anche', pt: 'também',
  nl: 'ook', sv: 'också', da: 'også', no: 'også', fi: 'myös',
};

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  let bad = 0;

  for (const locale of LOCALES) {
    const page = await browser.newPage();
    await page.setRequestInterception(true);
    page.on('request', (r) => (/favicon/.test(r.url()) ? r.abort() : r.continue()));
    await page.setViewport({ width: 1366, height: 900 });
    await page.goto(`${BASE}/${locale}/?cb=${Date.now()}`, { waitUntil: 'networkidle2', timeout: 180000 });

    const got = await page.evaluate(() => ({
      sections: [...document.querySelectorAll('section.hv10-room[id]')].map((s) => s.id),
      numerals: [...document.querySelectorAll('.hv10-room-label')].map((n) => (n.textContent || '').trim()),
      // The heading of the worksheets room, whatever it now says.
      paperHeading: (document.querySelector('#printroom h2')?.textContent || '').trim(),
    }));
    await page.close();

    /* Non-vacuity FIRST. A selector that matched nothing would otherwise sail
       through every comparison below by comparing two empty arrays — the
       recorded vacuous-gate trap. */
    if (got.sections.length === 0 || got.numerals.length === 0) {
      console.log(`  ${locale.padEnd(3)} FAIL — selectors matched nothing (sections=${got.sections.length}, numerals=${got.numerals.length}); the gate measured nothing`);
      bad++;
      continue;
    }

    const secOk = got.sections.join(',') === EXPECTED_SECTIONS.join(',');
    const numOk = got.numerals.join(',') === EXPECTED_NUMERALS.join(',');

    const alsoWord = ALSO[locale];
    const alsoRe = alsoWord ? new RegExp(`(?<!\\p{L})${alsoWord}(?!\\p{L})`, 'iu') : null;
    const danglingAlso = !!(alsoRe && got.paperHeading && alsoRe.test(got.paperHeading));

    const ok = secOk && numOk && !danglingAlso;
    if (!ok) bad++;
    console.log(
      `  ${locale.padEnd(3)} ${ok ? 'PASS' : 'FAIL'}` +
        (secOk ? '' : `\n      sections: ${got.sections.join(' -> ')}\n      expected: ${EXPECTED_SECTIONS.join(' -> ')}`) +
        (numOk ? '' : `\n      numerals: ${got.numerals.join(' ')}   expected: ${EXPECTED_NUMERALS.join(' ')}`) +
        (danglingAlso ? `\n      worksheets heading still carries "${alsoWord}" with nothing to refer back to: "${got.paperHeading}"` : ''),
    );
  }
  await browser.close();

  console.log(bad ? `\nFAIL: ${bad} locale(s) wrong.` : '\nPASS: room order, numeral sequence and heading connectors correct in every locale.');
  process.exit(bad ? 1 : 0);
})();
