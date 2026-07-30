#!/usr/bin/env node
/* =====================================================================
   register-class-graph.js — the five wiring points for TOOL #34.

   ⚠ A tool is not shippable until `frontend/config/live-tool-slugs.ts`
   carries its key — miss that and all eleven locales return 410. That
   is why every point is done here, in the build, and not by hand.

     1  frontend/config/live-tool-slugs.ts   TOOL_KEYS
     2  frontend/lib/seo/tool-content.ts     TOOL_KEYS + TOOL_MINI_URL +
                                             TOOL_ACTIVITY_PREFIX + iface
     3  frontend/app/[locale]/tools/[tool]/page.tsx  wrapper version bump
     4  frontend/lib/manipulatives.ts        the hub card
     5  frontend/messages/tool-content/*.json  x11 landing content

   Usage: node scripts/register-class-graph.js
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const KEY = 'class-graph';
const PREV = 'reading-easel';        /* the key this one is inserted after */
const E = require('./_class-graph-content.js');
const LOCALES = Object.keys(E);
let CHANGED = 0;
const step = (m) => { CHANGED++; console.log('  ' + m); };
const skip = (m) => console.log('  = ' + m);
const die = (m) => { console.error('  FATAL ' + m); process.exit(1); };

/* ---------- 1 + 2  the key lists ---------- */
for (const rel of ['frontend/config/live-tool-slugs.ts', 'frontend/lib/seo/tool-content.ts']) {
  const p = path.join(ROOT, rel);
  let s = fs.readFileSync(p, 'utf8');
  if (s.includes(`'${KEY}'`)) { skip(`${rel}: already present`); continue; }
  const anchor = `, '${PREV}'] as const;`;
  if (!s.includes(anchor)) die(`${rel}: TOOL_KEYS anchor not found`);
  s = s.replace(anchor, `, '${PREV}', '${KEY}'] as const;`);
  fs.writeFileSync(p, s, 'utf8');
  step(`${rel}: TOOL_KEYS += ${KEY}`);
}

/* ---------- 2b  the three maps in tool-content.ts ---------- */
(function () {
  const p = path.join(ROOT, 'frontend', 'lib', 'seo', 'tool-content.ts');
  let s = fs.readFileSync(p, 'utf8');
  const adds = [
    [`  '${PREV}': '/mini-tools/${PREV}.html',`, `  '${KEY}': '/mini-tools/${KEY}.html',`, 'TOOL_MINI_URL'],
    [`  '${PREV}': '${PREV}',`, `  '${KEY}': '${KEY}',`, 'TOOL_ACTIVITY_PREFIX'],
    [`  '${PREV}'?: ToolEntry;`, `  '${KEY}'?: ToolEntry;`, 'ToolContent interface']
  ];
  adds.forEach(([anchor, line, what]) => {
    if (s.includes(line)) { skip(`tool-content.ts ${what}: already present`); return; }
    if (!s.includes(anchor)) die(`tool-content.ts: ${what} anchor not found`);
    s = s.replace(anchor, anchor + '\n' + line);
    step(`tool-content.ts ${what} += ${KEY}`);
  });
  fs.writeFileSync(p, s, 'utf8');
}());

/* ---------- 3  wrapper version ---------- */
(function () {
  const p = path.join(ROOT, 'frontend', 'app', '[locale]', 'tools', '[tool]', 'page.tsx');
  let s = fs.readFileSync(p, 'utf8');
  const m = /const TOOL_WRAPPER_VERSION = '(\d+)\.(\d+)';/.exec(s);
  if (!m) die('page.tsx: TOOL_WRAPPER_VERSION not found');
  const next = `${m[1]}.${Number(m[2]) + 1}`;
  s = s.replace(m[0], `const TOOL_WRAPPER_VERSION = '${next}';`);
  fs.writeFileSync(p, s, 'utf8');
  step(`wrapper version ${m[1]}.${m[2]} -> ${next}`);
}());

/* ---------- 5  the eleven landing files ---------- */
(function () {
  let n = 0;
  for (const loc of LOCALES) {
    const p = path.join(ROOT, 'frontend', 'messages', 'tool-content', `${loc}.json`);
    const j = JSON.parse(fs.readFileSync(p, 'utf8'));
    const out = {};
    for (const k of Object.keys(j)) {
      if (k === 'labels') out[KEY] = E[loc];
      if (k !== KEY) out[k] = j[k];
    }
    if (!out[KEY]) out[KEY] = E[loc];
    fs.writeFileSync(p, JSON.stringify(out, null, 2) + '\n', 'utf8');
    n++;
  }
  step(`tool-content: ${n}/11 locale files written`);
}());

/* ---------- 4  the hub card ---------- */
(function () {
  const p = path.join(ROOT, 'frontend', 'lib', 'manipulatives.ts');
  let m = fs.readFileSync(p, 'utf8');
  if (m.includes(`id: "${KEY}"`)) { skip('manipulatives: already present'); return; }
  const field = (name, pick) => `    ${name}: {\n` +
    LOCALES.map((l) => `      ${l}: ${JSON.stringify(pick(E[l]))},`).join('\n') + '\n    },';
  const entry = ['  {', `    id: "${KEY}",`, `    mini_tool_url: "/mini-tools/${KEY}.html",`,
    field('title', (e) => e.name), field('tagline', (e) => e.tagline),
    field('description', (e) => e.about.join(' ')), '  },', '];'].join('\n');
  const at = m.lastIndexOf('\n];');
  if (at === -1) die('manipulatives: terminator not found');
  m = m.slice(0, at + 1) + entry + m.slice(at + 3);
  fs.writeFileSync(p, m, 'utf8');
  step('manipulatives: hub card appended');
}());

console.log('');
console.log(CHANGED ? `${CHANGED} wiring point(s) changed` : 'nothing to do — already registered');
