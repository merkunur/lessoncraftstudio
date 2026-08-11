/* The inline comment in `_paint` still carried the SAME false claim the
   header edit corrected — "drawn the SAME WAY". Correcting one and leaving
   the other is how a doc drifts back into being wrong. */
const fs = require('fs');
const P = 'mini tools/the-gap.js';
let src = fs.readFileSync(P, 'utf8');

const needle = [
  "        /* ⚠ the try is drawn the SAME WAY as the witnessed count. No",
  "           comparison is computed here; `lands()` is a sum, not a verdict. */"
].join('\n');

const repl = [
  "        /* ⚠ NOT \"the same way\" — `.crt-num.is-try` outlines it, and the",
  "           rule comment below says so. It differs in KIND AND NEVER IN",
  "           HUE: same colour, same size, same ground, so the outline says",
  "           WHICH ONE IS YOURS and never which one is right. No comparison",
  "           is computed here; `lands()` is a sum, not a verdict. */"
].join('\n');

const n = src.split(needle).length - 1;
if (n !== 1) { console.error('FAULT: needle matched ' + n + ' times'); process.exit(1); }
fs.writeFileSync(P, src.replace(needle, repl), 'utf8');
console.log('ok   inline SAME WAY claim corrected to match the header and the CSS');
