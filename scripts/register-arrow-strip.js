/* =====================================================================
   register-arrow-strip.js — wire TOOL #37 into the site
   ---------------------------------------------------------------------
   Run:  node scripts/register-arrow-strip.js [--dry-run]

   ⚠ A tool is not shippable until `frontend/config/live-tool-slugs.ts`
   carries its key — miss that and all eleven locales return 410, because
   /tools/* is a seller-era teardown and LIVE_TOOL_SLUGS is the carve-out.
   That is why every point is done here, in the build, and never by hand.

     1  frontend/config/live-tool-slugs.ts          TOOL_KEYS
     2  frontend/lib/seo/tool-content.ts            TOOL_KEYS + TOOL_MINI_URL
                                                    + TOOL_ACTIVITY_PREFIX + iface
     3  frontend/app/[locale]/tools/[tool]/page.tsx TOOL_WRAPPER_VERSION bump
     4  frontend/lib/manipulatives.ts               the hub card
     5  frontend/messages/tool-content/*.json  x11  the landing content

   Idempotent: run it twice and the second run reports every point as
   already done. Fails loudly on a missing anchor rather than writing a
   half-registered tree.
   ===================================================================== */

'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const KEY = 'arrow-strip';
const PREV = 'number-sieve';          /* the key this one is inserted after */
const E = require('./_arrow-strip-content.js');
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const DRY = process.argv.indexOf('--dry-run') > -1;

let CHANGED = 0, SKIPPED = 0;
const die = (m) => { console.error('  FATAL ' + m); process.exit(1); };
const skip = (m) => { SKIPPED++; console.log('  ..    ' + m); };
const did = (m) => { CHANGED++; console.log('  ok    ' + m); };
const read = (p) => fs.readFileSync(path.join(ROOT, p), 'utf8');
const write = (p, s) => { if (!DRY) fs.writeFileSync(path.join(ROOT, p), s.replace(/\r\n/g, '\n'), 'utf8'); };

/* ---- 1 + 2: the two TOOL_KEYS arrays share one anchor ------------- */
[
  'frontend/config/live-tool-slugs.ts',
  'frontend/lib/seo/tool-content.ts'
].forEach((rel) => {
  let s = read(rel);
  if (s.includes(`'${KEY}'`)) { skip(`${rel}: TOOL_KEYS already has ${KEY}`); return; }
  const anchor = `, '${PREV}'] as const;`;
  if (!s.includes(anchor)) die(`${rel}: TOOL_KEYS anchor not found (${anchor})`);
  s = s.replace(anchor, `, '${PREV}', '${KEY}'] as const;`);
  write(rel, s);
  did(`${rel}: TOOL_KEYS + ${KEY}`);
});

/* ---- 2b: the three maps + the interface in tool-content.ts -------- */
(function () {
  const rel = 'frontend/lib/seo/tool-content.ts';
  let s = read(rel);
  const adds = [
    [`  '${PREV}': '/mini-tools/${PREV}.html',`, `  '${KEY}': '/mini-tools/${KEY}.html',`, 'TOOL_MINI_URL'],
    [`  '${PREV}': '${PREV}',`, `  '${KEY}': '${KEY}',`, 'TOOL_ACTIVITY_PREFIX'],
    [`  '${PREV}'?: ToolEntry;`, `  '${KEY}'?: ToolEntry;`, 'ToolContentFile']
  ];
  adds.forEach(([anchor, line, what]) => {
    if (s.includes(line.trim())) { skip(`${rel}: ${what} already has ${KEY}`); return; }
    if (!s.includes(anchor)) die(`${rel}: ${what} anchor not found (${anchor.trim()})`);
    s = s.replace(anchor, anchor + '\n' + line);
    did(`${rel}: ${what} + ${KEY}`);
  });
  write(rel, s);
}());

/* ---- 3: the wrapper cache-buster --------------------------------- */
(function () {
  const rel = 'frontend/app/[locale]/tools/[tool]/page.tsx';
  /* ⚠ THE ONLY NON-IDEMPOTENT STEP, SO IT IS GUARDED. A version bump has
     no "already done" state of its own — re-running this script once
     pushed 7.49 to 7.50 while every other point correctly reported
     "already done", which would ship a cache-buster nobody's build
     expects. Gate it on the registration that DOES have a stable state. */
  if (read('frontend/config/live-tool-slugs.ts').includes(`'${KEY}'`) &&
      read('frontend/messages/tool-content/en.json').includes(`"${KEY}"`)) {
    skip(`${rel}: TOOL_WRAPPER_VERSION already bumped for ${KEY}`);
    return;
  }
  let s = read(rel);
  const m = /const TOOL_WRAPPER_VERSION = '(\d+)\.(\d+)';/.exec(s);
  if (!m) die(`${rel}: TOOL_WRAPPER_VERSION not found`);
  const next = `${m[1]}.${Number(m[2]) + 1}`;
  s = s.replace(m[0], `const TOOL_WRAPPER_VERSION = '${next}';`);
  write(rel, s);
  did(`${rel}: TOOL_WRAPPER_VERSION ${m[1]}.${m[2]} -> ${next}`);
}());

/* ---- 4: the hub card --------------------------------------------- */
(function () {
  const rel = 'frontend/lib/manipulatives.ts';
  let s = read(rel);
  if (s.includes(`id: "${KEY}"`)) { skip(`${rel}: hub card already present`); return; }
  const field = (name, pick) => `    ${name}: {\n` +
    LOCALES.map((l) => `      ${l}: ${JSON.stringify(pick(E[l]))},`).join('\n') + '\n    },';
  const entry = ['  {',
    `    id: "${KEY}",`,
    `    mini_tool_url: "/mini-tools/${KEY}.html",`,
    field('title', (e) => e.name),
    field('tagline', (e) => e.tagline),
    field('description', (e) => e.about.join(' ')),
    '  },', '];'].join('\n');
  const tail = s.lastIndexOf('\n];');
  if (tail < 0) die(`${rel}: could not find the end of MANIPULATIVES`);
  s = s.slice(0, tail + 1) + entry + s.slice(tail + 3);
  write(rel, s);
  did(`${rel}: hub card (11 locales)`);
}());

/* ---- 5: the eleven landing files --------------------------------- */
LOCALES.forEach((loc) => {
  const rel = `frontend/messages/tool-content/${loc}.json`;
  const j = JSON.parse(read(rel));
  if (j[KEY]) { skip(`${rel}: already has ${KEY}`); return; }
  /* key order preserved, and the new entry goes BEFORE the shared
     `labels` block, exactly where every sibling tool sits */
  const out = {};
  for (const k of Object.keys(j)) {
    if (k === 'labels') out[KEY] = E[loc];
    if (k !== KEY) out[k] = j[k];
  }
  if (!out[KEY]) out[KEY] = E[loc];
  write(rel, JSON.stringify(out, null, 2) + '\n');
  did(`${rel}: + ${KEY} (slug "${E[loc].slug}")`);
});

console.log('');
console.log(`${DRY ? 'DRY RUN — ' : ''}${CHANGED} change(s), ${SKIPPED} already done`);
if (DRY) console.log('nothing was written');
