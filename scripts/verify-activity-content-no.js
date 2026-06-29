#!/usr/bin/env node
/* =====================================================================
   verify-activity-content-no.js — the GATE proving every NORWEGIAN activity
   page renders REAL hand-authored per-activity copy, NOT a template.

   For every no activity (each `*-activities.json` row in `mini tools/` with a
   slug.no), assert `frontend/messages/activity-content/no.json` has a Tier-1
   FULL-OVERRIDE `prose[id]` = { about[≥2], practices[≥3], howToPlay[≥2],
   learningGoals[≥2] }. Plus: no leftover {placeholders}; no duplicate `about[0]`;
   §20.10 NO "Common Core"/raw CCSS code (no prose cites "LK20" or omits the
   framework — already Norwegian bokmål, no switch); 0 stray Cyrillic characters.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const NO = path.join(REPO, 'frontend', 'messages', 'activity-content', 'no.json');

const fails = [];
const F = (c, m) => { if (!c) fails.push(m); };

const CODE_RE = /\b[K0-9]\.[A-Z]{1,3}\.[A-Z0-9]/; // CCSS code shape e.g. K.CC.A.3 / 2.OA.C.4
const CC_RE = /common core/i;
const CYRILLIC_RE = /[Ѐ-ӿ]/; // stray Cyrillic (MT artifact)

(function main() {
  const no = JSON.parse(fs.readFileSync(NO, 'utf8'));
  const prose = no.prose || {};

  const ids = [];
  for (const f of fs.readdirSync(MINI).filter((f) => f.endsWith('-activities.json'))) {
    let d; try { d = JSON.parse(fs.readFileSync(path.join(MINI, f), 'utf8')); } catch (e) { continue; }
    for (const a of (Array.isArray(d) ? d : [])) if (a.slug && a.slug.no) ids.push(a.id);
  }
  F(ids.length >= 50, `only ${ids.length} no activities found`);

  const seenAbout = {};
  let templated = 0;
  for (const id of ids) {
    const a = prose[id];
    if (!a || Array.isArray(a) || !Array.isArray(a.about)) { templated++; fails.push(`TEMPLATE (no full-override prose): ${id}`); continue; }
    F(a.about.length >= 2, `${id}: about<2`);
    F(Array.isArray(a.practices) && a.practices.length >= 3, `${id}: practices<3`);
    F(Array.isArray(a.howToPlay) && a.howToPlay.length >= 2, `${id}: howToPlay<2`);
    F(Array.isArray(a.learningGoals) && a.learningGoals.length >= 2, `${id}: learningGoals<2`);
    const all = [].concat(a.about, a.practices, a.howToPlay, a.learningGoals).join(' ');
    F(!/\{[a-z]+\}/.test(all), `${id}: leftover {placeholder}`);
    F(!CC_RE.test(all), `${id}: "Common Core" in no prose (§20.10 — use "LK20" or omit)`);
    F(!CODE_RE.test(all), `${id}: raw CCSS code in no prose (§20.10) — "${(all.match(CODE_RE) || [])[0]}"`);
    F(!CYRILLIC_RE.test(all), `${id}: stray Cyrillic character (MT artifact)`);
    const o = a.about[0] || '';
    if (seenAbout[o]) fails.push(`DUP about[0]: ${id} == ${seenAbout[o]}`); else seenAbout[o] = id;
  }

  console.log(`no activities: ${ids.length} | full-override prose: ${ids.length - templated} | templated: ${templated}`);
  if (fails.length) { console.error(`VERIFY-ACTIVITY-CONTENT-NO FAILED — ${fails.length} issue(s):`); fails.slice(0, 30).forEach((m) => console.error('  • ' + m)); process.exit(1); }
  console.log('VERIFY-ACTIVITY-CONTENT-NO PASSED — every no activity has real Norwegian per-activity copy (full-override prose); 0 templates, 0 placeholders, 0 dup openers, 0 Common-Core/code leaks, 0 Cyrillic.');
  process.exit(0);
})();
