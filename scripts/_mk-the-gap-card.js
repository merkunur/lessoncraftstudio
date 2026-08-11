/* =====================================================================
   _mk-the-gap-card.js — builds `_the-gap-card.txt`, the MANIPULATIVES
   hub card for #56, FROM THE ARTEFACTS:

     title       <- the tool's OWN eleven names. ⚠ `mini tools/the-gap.js`
                    currently declares `strings.title` with `en` ONLY —
                    the ten native panels' titles live in
                    `scripts/_the-gap-strings.js` and have not been
                    applied to the tool source yet. So `en` is read out
                    of the TOOL and the other ten out of the PANEL FILE,
                    and each source is named in the log rather than
                    quietly merged. (folding-wall carries a stale hub
                    name in eleven locales because #49 hand-wrote this.)
     tagline     <- `_the-gap-landing.js` [loc].tagline
     description <- the landing's first two `about` paragraphs

   It ASSERTS `landing[loc].name === title[loc]` for all eleven and
   refuses to write on any mismatch — the one check that makes "the card
   came from the tool" true rather than intended. ⚠ A failed parse of
   either source THROWS rather than falling back to the landing file,
   which would make the assertion self-satisfying.

   Run:  node scripts/_mk-the-gap-card.js
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const KEY = 'the-gap';
const L = require('./_the-gap-landing.js');
const PANELS = require('./_the-gap-strings.js');

/* ---- en: read the tool's own title out of the source ---------------
   the tool is an IIFE registering on a global, so it cannot be required
   in node; the title block is extracted and evaluated on its own. */
const src = fs.readFileSync(path.join(__dirname, '..', 'mini tools', KEY + '.js'), 'utf8');
const m = /\btitle:\s*(\{[^}]*\})/.exec(src);
if (!m) { console.error('FATAL: could not find strings.title in the tool source'); process.exit(1); }
const TOOL_TITLE = eval('(' + m[1] + ')');
if (!TOOL_TITLE.en) { console.error('FATAL: the tool source declares no en title'); process.exit(1); }

/* ---- the other ten: the panels' consolidated output ---------------- */
const TITLE = { en: TOOL_TITLE.en };
const fromPanels = [];
for (const l of LOCALES) {
  if (l === 'en') continue;
  if (TOOL_TITLE[l]) { TITLE[l] = TOOL_TITLE[l]; continue; }   /* once applied, the tool wins */
  if (!PANELS[l] || !PANELS[l].title) {
    console.error('FATAL: no title for ' + l + ' in the tool source OR the panel file');
    process.exit(1);
  }
  TITLE[l] = PANELS[l].title;
  fromPanels.push(l);
}

let bad = 0;
for (const l of LOCALES) {
  if (L[l].name !== TITLE[l]) {
    console.error(`  MISMATCH ${l}: landing "${L[l].name}" vs tool/panel "${TITLE[l]}"`);
    bad++;
  }
}
if (bad) { console.error('FATAL: ' + bad + ' name(s) differ from the authored titles'); process.exit(1); }

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
console.log('wrote scripts/_' + KEY + '-card.txt — 11 titles verified');
console.log('  en   <- mini tools/' + KEY + '.js strings.title');
console.log('  ' + fromPanels.join(',') + ' <- scripts/_' + KEY + '-strings.js (NOT YET APPLIED to the tool source)');
