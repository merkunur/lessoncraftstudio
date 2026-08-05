/* =====================================================================
   update-part-whole-frame-landing.js — bring the 11 landing pages into
   line with the rebuilt tool.
   ---------------------------------------------------------------------
   Run:  node scripts/update-part-whole-frame-landing.js

   The 2026-08-05 rebuild changed what this tool IS, and the landing copy
   still described the old one: no two-colour counters, no counter shapes,
   no fact families, no printable mat, wholes from 3 rather than 2, and —
   in seven locales — a NAME the native panel replaced. A hub card that
   calls the tool one thing while the tool calls itself another is the
   defect this programme keeps paying for, so the `name` here is read
   straight off the tool's own strings table rather than restated.

   ⚠ THE SLUG IS NEVER TOUCHED. It is the live URL of an indexed page and
   §21.5a's churn freeze runs to ~2026-09-01: mutating the identity of an
   existing indexed page is exactly what the freeze forbids. Where a panel
   renamed the tool, the NAME changes and the slug stays.

   Idempotent: a second run reports every entry as already current.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const KEY = 'part-whole-frame';
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

/* the display name comes off the TOOL, so the card and the apparatus
   cannot drift apart */
const SRC = fs.readFileSync(path.join(ROOT, 'mini tools', 'part-whole-frame.js'), 'utf8');
const box = { console, document: { getElementById: () => null, createElement: () => ({}), head: { appendChild() {} } }, window: {} };
box.globalThis = box;
vm.runInNewContext(SRC.replace(/\nfunction injectPartWholeFrameCSS[\s\S]*$/, ''), box);
const TITLES = box.PartWholeFrame.strings.title;

const C = require('./_part-whole-frame-landing.js');

let changed = 0, same = 0, bad = 0;
for (const loc of LOCALES) {
  const p = path.join(ROOT, 'frontend', 'messages', 'tool-content', loc + '.json');
  const raw = fs.readFileSync(p, 'utf8');
  const j = JSON.parse(raw);
  const cur = j[KEY];
  if (!cur) { console.error(`  REFUSED: ${loc}.json has no ${KEY} entry`); bad++; continue; }
  const next = C[loc];
  if (!next) { console.error(`  REFUSED: no copy authored for ${loc}`); bad++; continue; }

  /* ⚠ EIGHT REQUIRED FIELDS, and a completeness check that lists a SUBSET
     is worse than none because it CERTIFIES — #42 shipped five of eight
     ToolEntry fields past two guards that each checked three. Read the
     field list off what is already there. */
  const REQUIRED = ['slug', 'name', 'tagline', 'about', 'howToUse', 'classroomIdeas', 'metaTitle', 'metaDescription'];
  const built = {
    slug: cur.slug,                     /* NEVER changed — live indexed URL */
    name: TITLES[loc],                  /* read off the tool */
    tagline: next.tagline,
    about: next.about,
    howToUse: next.howToUse,
    classroomIdeas: next.classroomIdeas,
    metaTitle: next.metaTitle,
    metaDescription: next.metaDescription
  };
  const missing = REQUIRED.filter((f) => !built[f] || (Array.isArray(built[f]) && !built[f].length));
  if (missing.length) { console.error(`  REFUSED: ${loc} would ship without ${missing.join(', ')}`); bad++; continue; }
  if (built.about.length < 3) { console.error(`  REFUSED: ${loc} about has ${built.about.length} paragraphs, expected 3+`); bad++; continue; }
  if (built.metaTitle.length > 70) { console.error(`  REFUSED: ${loc} metaTitle is ${built.metaTitle.length} chars`); bad++; continue; }
  if (built.metaDescription.length > 175) { console.error(`  REFUSED: ${loc} metaDescription is ${built.metaDescription.length} chars`); bad++; continue; }

  if (JSON.stringify(cur) === JSON.stringify(built)) { same++; continue; }
  j[KEY] = built;
  fs.writeFileSync(p, JSON.stringify(j, null, 2) + '\n');
  changed++;
  console.log(`  ${loc}: "${built.name}" (slug ${built.slug}, unchanged)`);
}

console.log('');
if (bad) { console.error(`FAIL — ${bad} locale(s) refused; ${changed} written`); process.exit(1); }
console.log(changed ? `wrote ${changed} locale(s), ${same} already current` : `no change — all ${same} locales already current`);
