#!/usr/bin/env node
/* =====================================================================
   verify-activity-content-en.js — the GATE proving every EN activity page
   renders REAL hand-authored per-activity copy, NOT a template.

   For every EN activity (each `*-activities.json` row in `mini tools/` with a
   slug.en), assert `frontend/messages/activity-content/en.json` has a Tier-1
   FULL-OVERRIDE `prose[id]` = { about[≥2], practices[≥3], howToPlay[≥2],
   learningGoals[≥2] } — so getActivityContent() resolves isFullOverride===true
   and NO activity falls back to the byStrand/generic template. Plus: no leftover
   {placeholders}; no two pages share an identical `about[0]`; no page opens with
   the stock "This/In this free, interactive Grade N <subject> activity" clause.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const EN = path.join(REPO, 'frontend', 'messages', 'activity-content', 'en.json');

const fails = [];
const F = (c, m) => { if (!c) fails.push(m); };

(function main() {
  const en = JSON.parse(fs.readFileSync(EN, 'utf8'));
  const prose = en.prose || {};

  // collect every EN activity id (slug.en present)
  const ids = [];
  for (const f of fs.readdirSync(MINI).filter((f) => f.endsWith('-activities.json'))) {
    let d; try { d = JSON.parse(fs.readFileSync(path.join(MINI, f), 'utf8')); } catch (e) { continue; }
    for (const a of (Array.isArray(d) ? d : [])) if (a.slug && a.slug.en) ids.push(a.id);
  }
  F(ids.length >= 190, `only ${ids.length} EN activities found`);

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
    const o = a.about[0] || '';
    F(!/^(This|In this) free, interactive Grade/i.test(o) && !/^(This|In this) free, interactive Kindergarten/i.test(o), `${id}: stock templated opener`);
    if (seenAbout[o]) fails.push(`DUP about[0]: ${id} == ${seenAbout[o]}`); else seenAbout[o] = id;
  }

  console.log(`EN activities: ${ids.length} | full-override prose: ${ids.length - templated} | templated: ${templated}`);
  if (fails.length) { console.error(`VERIFY-ACTIVITY-CONTENT-EN FAILED — ${fails.length} issue(s):`); fails.slice(0, 30).forEach((m) => console.error('  • ' + m)); process.exit(1); }
  console.log('VERIFY-ACTIVITY-CONTENT-EN PASSED — every EN activity has real per-activity copy (full-override prose); 0 templates, 0 placeholders, 0 duplicate openers, 0 stock openers.');
  process.exit(0);
})();
