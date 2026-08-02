#!/usr/bin/env node
/**
 * Remove the DUPLICATED backdrop image from published deck.html files.
 *
 * Every interactive deck embeds its backdrop JPEG TWICE, byte-identical:
 *   1. as the visible  <img class="lcs-worksheet__img" id="lcs-worksheet-img" src="data:...">
 *   2. again inside     <script>var DECK_BUNDLE = { ... "worksheetImage":"data:..." ... }</script>
 *
 * Measured on a 550,932-byte sudoku deck: 232,815 chars each, 84.5% of the file
 * between them. The second copy exists for ONE thing — the celebration modal's
 * mini-thumb, `src="+DECK_BUNDLE.worksheetImage+"`. Base64 is ~93% of a deck, so
 * gzip buys nothing: a 500KB deck transfers as ~500KB.
 *
 * THE FIX KEEPS THE RUNTIME CONTRACT INTACT. We blank the bundle field and
 * rehydrate it from the DOM inside the same <script>, immediately after the
 * bundle literal. Any code reading DECK_BUNDLE.worksheetImage — in published
 * decks we are not regenerating, and in all 29 generators — keeps working
 * unchanged, because the property still exists and still holds the same string
 * by the time anything can read it. The <img> is earlier in the document than
 * the bundle script (asserted per file), and inline classic scripts run during
 * parse, so getElementById always resolves.
 *
 * SAFETY: a file is transformed ONLY when the two copies are PROVABLY identical
 * and unambiguous. Anything else is skipped with a reason — notably the
 * printable-only worksheet-gen decks, which have no interactive bundle at all.
 *
 *   node scripts/publish-cli/dedupe-deck-backdrop.js --root=/var/www/lcs-media/decks --dry-run
 *   node scripts/publish-cli/dedupe-deck-backdrop.js --root=... --locales=en,de --apply
 *   node scripts/publish-cli/dedupe-deck-backdrop.js --file=path/to/deck.html --apply
 *
 * Idempotent: an already-processed deck has no `"worksheetImage":"data:` and is
 * skipped as `already-deduped`.
 */
const fs = require('fs');
const path = require('path');

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const m = a.match(/^--([^=]+)(?:=(.*))?$/);
    return m ? [m[1], m[2] ?? true] : [a, true];
  }),
);
const APPLY = !!args.apply;
const ROOT = args.root || '/var/www/lcs-media/decks';

const SHIM_MARK = 'lcsRehydrateBackdrop';
/* Kept on ONE line and ASCII-only: it is spliced into an existing inline script
   in files we are not otherwise touching. */
const SHIM =
  `;/*${SHIM_MARK}*/try{var _lcsWi=document.getElementById('lcs-worksheet-img');` +
  `if(_lcsWi&&_lcsWi.src)DECK_BUNDLE.worksheetImage=_lcsWi.src;}catch(e){}`;

const IMG_SRC = /id="lcs-worksheet-img"[^>]*?src="(data:image\/[a-z]+;base64,[A-Za-z0-9+/=]+)"/;

/** @returns {{out:string,saved:number}|{skip:string}} */
function transform(s) {
  if (s.indexOf(SHIM_MARK) !== -1) return { skip: 'already-deduped' };
  const iBundle = s.indexOf('var DECK_BUNDLE');
  if (iBundle < 0) return { skip: 'no-bundle (printable-only deck)' };
  const m = IMG_SRC.exec(s);
  if (!m) return { skip: 'no-img-data-uri' };
  const iImg = s.indexOf('id="lcs-worksheet-img"');
  if (iImg > iBundle) return { skip: 'img-after-bundle (shim could not resolve it)' };

  const needle = `"worksheetImage":"${m[1]}"`;
  const hits = s.split(needle).length - 1;
  if (hits === 0) return { skip: 'bundle-copy-differs (not provably identical)' };
  if (hits > 1) return { skip: `ambiguous (${hits} identical matches)` };

  let out = s.replace(needle, '"worksheetImage":""');
  // Splice the rehydrator into the SAME script tag as the bundle literal.
  const iClose = out.indexOf('</script>', out.indexOf('var DECK_BUNDLE'));
  if (iClose < 0) return { skip: 'unterminated-bundle-script' };
  out = out.slice(0, iClose) + SHIM + out.slice(iClose);

  /* Post-conditions — refuse to write anything that fails them. */
  if (out.indexOf('"worksheetImage":"data:') !== -1) return { skip: 'post: bundle uri survived' };
  if (out.indexOf(SHIM_MARK) === -1) return { skip: 'post: shim missing' };
  if (!IMG_SRC.test(out)) return { skip: 'post: visible img damaged' };
  if (out.length >= s.length) return { skip: 'post: no saving' };
  return { out, saved: s.length - out.length };
}

function writeAtomic(file, data) {
  // temp + rename in the same directory: nginx either serves the old bytes or
  // the new ones, never a half-written file (§17.8.16 rewriteDeckHtmlAtomic).
  const tmp = path.join(path.dirname(file), `.dedupe-${process.pid}-${path.basename(file)}`);
  fs.writeFileSync(tmp, data);
  fs.renameSync(tmp, file);
}

function* walk(root, locales) {
  for (const loc of fs.readdirSync(root)) {
    if (loc.startsWith('.')) continue;
    if (locales && !locales.includes(loc)) continue;
    const d = path.join(root, loc);
    if (!fs.statSync(d).isDirectory()) continue;
    for (const slug of fs.readdirSync(d)) {
      if (slug.startsWith('.')) continue;
      const f = path.join(d, slug, 'deck.html');
      if (fs.existsSync(f)) yield f;
    }
  }
}

(function main() {
  const files = args.file ? [args.file] : [...walk(ROOT, args.locales ? String(args.locales).split(',') : null)];
  console.log(`${APPLY ? 'APPLY' : 'DRY-RUN'} — ${files.length} deck.html under ${args.file ? '(single file)' : ROOT}\n`);

  const skips = {};
  let done = 0, saved = 0, before = 0, failed = 0;
  for (const f of files) {
    let s;
    try { s = fs.readFileSync(f, 'utf8'); } catch (e) { skips[`read-error: ${e.code}`] = (skips[`read-error: ${e.code}`] || 0) + 1; continue; }
    before += s.length;
    const r = transform(s);
    if (r.skip) { skips[r.skip] = (skips[r.skip] || 0) + 1; continue; }
    if (APPLY) {
      try {
        writeAtomic(f, r.out);
        const back = fs.readFileSync(f, 'utf8');
        if (back.length !== r.out.length) { failed++; console.log(`  READBACK MISMATCH ${f}`); continue; }
      } catch (e) { failed++; console.log(`  WRITE FAIL ${f}: ${e.message}`); continue; }
    }
    done++; saved += r.saved;
    if (done % 2000 === 0) console.log(`  …${done} processed, ${(saved / 1073741824).toFixed(2)} GB saved so far`);
  }

  const gb = (n) => (n / 1073741824).toFixed(2) + ' GB';
  console.log(`\n  ${APPLY ? 'deduped' : 'would dedupe'}: ${done} decks`);
  console.log(`  bytes ${APPLY ? 'saved' : 'recoverable'}: ${gb(saved)}  (of ${gb(before)} scanned, ${before ? Math.round((100 * saved) / before) : 0}%)`);
  if (done) console.log(`  mean per deck: ${Math.round(saved / done / 1024)} KB`);
  if (failed) console.log(`  WRITE FAILURES: ${failed}`);
  console.log('\n  skipped:');
  for (const [k, v] of Object.entries(skips).sort((a, b) => b[1] - a[1])) console.log(`    ${String(v).padStart(6)}  ${k}`);
  process.exit(failed ? 1 : 0);
})();
