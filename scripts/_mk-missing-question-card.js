/* =====================================================================
   _mk-missing-question-card.js — builds `_missing-question-card.txt`,
   the MANIPULATIVES hub card for #55, FROM THE ARTEFACTS:

     title       <- `mini tools/missing-question.js` strings.title, the
                    tool's OWN eleven names, read out of the source so
                    the card cannot drift from what the tool renders.
                    (folding-wall carries a stale hub name in eleven
                    locales because #49 hand-wrote this file.)
     tagline     <- `_missing-question-landing.js` [loc].tagline
     description <- the landing's first two `about` paragraphs

   It also ASSERTS `landing[loc].name === tool title[loc]` for all
   eleven and refuses to write on any mismatch — the one check that
   makes "the card came from the tool" true rather than intended.

   Run:  node scripts/_mk-missing-question-card.js
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const KEY = 'missing-question';
const L = require('./_missing-question-landing.js');

/* ---- read the tool's own title map out of the source --------------
   ⚠ the tool is an IIFE that registers on a global, so it cannot be
   `require`d in node. The title block is extracted and evaluated on
   its own; a failed parse THROWS rather than falling back to the
   landing file, which would make the assertion self-satisfying. */
const src = fs.readFileSync(path.join(__dirname, '..', 'mini tools', KEY + '.js'), 'utf8');
const m = /\btitle:\s*(\{[^}]*\})/.exec(src);
if (!m) { console.error('FATAL: could not find strings.title in the tool source'); process.exit(1); }
const TITLE = eval('(' + m[1] + ')');
const missing = LOCALES.filter((l) => !TITLE[l]);
if (missing.length) { console.error('FATAL: tool title lacks ' + missing.join(',')); process.exit(1); }

let bad = 0;
for (const l of LOCALES) {
  if (L[l].name !== TITLE[l]) {
    console.error(`  MISMATCH ${l}: landing "${L[l].name}" vs tool "${TITLE[l]}"`);
    bad++;
  }
}
if (bad) { console.error('FATAL: ' + bad + ' name(s) differ from the tool\'s own strings'); process.exit(1); }

const q = (s) => JSON.stringify(s);
const NL = String.fromCharCode(10);
const block = (field, fn) =>
  '    ' + field + ': {' + NL +
  LOCALES.map((l) => '      ' + l + ': ' + q(fn(l)) + ',').join(NL) + NL +
  '    },' + NL;

const out =
  '  {' + NL +
  '    id: "' + KEY + '",' + NL +
  '    mini_tool_url: "/mini-tools/' + KEY + '.html",' + NL +
  block('title', (l) => L[l].name) +
  block('tagline', (l) => L[l].tagline) +
  block('description', (l) => L[l].about.slice(0, 2).join(' ')) +
  '  },' + NL;

fs.writeFileSync(path.join(__dirname, '_' + KEY + '-card.txt'), out);
console.log('wrote scripts/_' + KEY + '-card.txt — 11 titles verified against the tool source');
