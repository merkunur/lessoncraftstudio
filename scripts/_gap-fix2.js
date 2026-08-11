/* Follow-up: `_print` still called `_refuse('run')`.
   ⚠ The consequence probe caught this; the source-shape checks did not.
   Under the new MSG map `'run'` is not a key, so the partial fix produced a
   print button that shook the RUN control and announced NOTHING — the exact
   defect D5 names, reintroduced by fixing D5 and forgetting a caller. */
const fs = require('fs');
const P = 'mini tools/the-gap.js';
let src = fs.readFileSync(P, 'utf8');

const needle = [
  "    _print: function () {",
  "      if (!this.premium) { this._refuse('run'); return; }"
].join('\n');

const repl = [
  "    _print: function () {",
  "      /* ⚠⚠ THIS SAID `run`, so the paywall refusal shook the RUN button",
  "         and spoke `saidMidRun` — \"Wait for the gap to lift\" — at a free",
  "         user standing in phase `before` with nothing in flight. */",
  "      if (!this.premium) { this._refuse('print'); return; }"
].join('\n');

const n = src.split(needle).length - 1;
if (n !== 1) { console.error('FAULT: needle matched ' + n + ' times'); process.exit(1); }
src = src.replace(needle, repl);
fs.writeFileSync(P, src, 'utf8');
console.log('ok   _print refuses on its own channel');
