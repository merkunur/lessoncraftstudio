#!/usr/bin/env node
/**
 * Stage D-4 (2026-11-25; plan decision 5): the PRESCHOOL THEME units of the English year and their plan, from the theme
 * year design scripts/units/year/design.en.theme.json (one US pre-K teacher-designer chose every theme and looked at
 * every page; one US pre-K teacher read it).
 *
 * A theme unit: grade P, subject `theme`, one or two weeks, its month of the school year, and the four daily blocks
 * (literacy, math, science and our world, fine motor and art), each a named lesson "<point>#p-<theme>" on a Kindergarten
 * readiness point at its earliest step, handing out the EXACT pages the design names. Its texts come from the same file
 * through scripts/units/notes/en-theme-p.js. The plan "Preschool Themes by Month" lists the themes in school-year order.
 *
 * Titles and addresses follow the US search heads (docs/SEO/daily-system-demand/preschool-themes.en.json, 2026-11-25):
 *   a theme  "<theme> theme preschool lesson plans"  → /en/units/<theme>-theme-preschool-lesson-plans
 *   the year "preschool themes by month"             → /en/units/preschool-themes-by-month
 *
 *   node scripts/units/year/place-ready-p.en.theme.js [--dry-run] [--pilot]   (refuses to run twice; checks everything first)
 * Then: notes/apply.js · assemble --loc=en · build-year-plan / build-guide / build-looks · coverage · units/gates
 */
'use strict';
const fs = require('fs');
const path = require('path');
const REPO = path.join(__dirname, '..', '..', '..');
const DRY = process.argv.includes('--dry-run');
// --pilot: the units go up as pilots first (noindex, in no sitemap, not on the hub) so the pages are read live before they open
const STATUS = process.argv.includes('--pilot') ? 'pilot' : 'live';
const file = (f) => path.join(REPO, f);
const read = (f) => fs.readFileSync(file(f), 'utf8');
const jsonLike = (raw, obj) => {
  const indent = (/^\{\r?\n(\s+)"/.exec(raw) || [, ' '])[1];
  let out = JSON.stringify(obj, null, indent); if (raw.includes('\r\n')) out = out.replace(/\n/g, '\r\n');
  return out + (/\r?\n$/.test(raw) ? (raw.includes('\r\n') ? '\r\n' : '\n') : '');
};
const design = JSON.parse(read('scripts/units/year/design.en.theme.json'));
const kebab = (s) => String(s).toLowerCase().replace(/['’]/g, '').replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const WEEK_WORD = { 1: 'one-week', 2: 'two-week' };
const FOR_WEEKS = { 1: 'for One Week', 2: 'for Two Weeks' };
const problems = [];

const units = design.themes.map((t) => {
  const name = t.name.trim();
  // inside a sentence a theme is a common noun ("a preschool farm theme", "all about me"), a holiday keeps its capitals
  const lower = /Thanksgiving|Christmas|Valentine|Easter|Earth Day|Patrick|July|Halloween|Hanukkah|Kwanzaa|Lunar New Year|Martin Luther King/.test(name) ? name : name.toLowerCase();
  const slug = kebab(name) + '-theme-preschool-lesson-plans';
  // the page title is the search head itself; the length says what the unit is (one or two weeks)
  let metaTitle = name + ' Theme Preschool Lesson Plans ' + FOR_WEEKS[t.weeks];
  if (metaTitle.length > 70) metaTitle = name + ' Theme Preschool Lesson Plans';
  // the description says what the children explore that week (the designer's `why`), so no two theme pages share one
  const own = 'A ' + WEEK_WORD[t.weeks] + ' preschool ' + lower + ' theme. ' + t.why.trim();
  const short = 'A ' + WEEK_WORD[t.weeks] + ' preschool ' + lower + ' theme with literacy, math, science, and fine motor and art every day, printable pages, and an observation checklist.';
  const metaDescription = own.length >= 110 && own.length <= 170 ? own : short;
  if (metaDescription.length < 110 || metaDescription.length > 170) problems.push(t.key + ': description has ' + metaDescription.length + ' characters: ' + metaDescription);
  if (metaTitle.length > 70) problems.push(t.key + ': title has ' + metaTitle.length + ' characters');
  return {
    id: 'p-theme-' + t.key, slug, status: STATUS, grade: 'P', subject: 'theme', month: t.month, weeks: t.weeks,
    title: name + ' Theme', metaTitle, metaDescription,
    lessons: t.lessons.map((b) => Object.assign({ strand: b.strand, point: b.point, id: b.point + '#p-' + t.key, pages: b.pages }, b.titles ? { titles: b.titles } : {})),
  };
});
const months = [...new Set(design.themes.map((t) => t.month))];
const PLAN = {
  id: 'plan-p-theme', slug: 'preschool-themes-by-month', grade: 'P', subject: 'theme',
  title: 'Preschool Themes by Month',
  metaTitle: 'Preschool Themes by Month: {units} Weekly Theme Lesson Plans',
  metaDescription: '{units} preschool themes in school-year order, ' + months[0] + ' to ' + months[months.length - 1] + ': each a week of lesson plans with printable pages and an observation checklist.',
  units: units.map((u) => u.id),
};
const planDescLen = PLAN.metaDescription.replace('{units}', String(units.length)).length;
if (planDescLen < 110 || planDescLen > 170) problems.push('plan: description has ' + planDescLen + ' characters');
if (problems.length) { for (const p of problems) console.log('PROBLEM ' + p); process.exit(1); }

const out = [];
{
  const f = 'frontend/content/units/defs/en.json';
  const raw = read(f);
  const defs = JSON.parse(raw);
  for (const u of units) if (defs.units.some((x) => x.id === u.id || x.slug === u.slug)) throw new Error(u.id + ' exists');
  if (defs.plans.some((p) => p.id === PLAN.id || p.slug === PLAN.slug)) throw new Error(PLAN.id + ' exists');
  defs.units.push(...units);
  defs.plans.push(PLAN);
  out.push([f, jsonLike(raw, defs)]);
}
for (const u of units) console.log(u.id.padEnd(34) + u.month.padEnd(10) + u.weeks + 'w  ' + u.slug + '\n    ' + u.metaTitle + ' (' + u.metaTitle.length + ')\n    ' + u.metaDescription + ' (' + u.metaDescription.length + ')');
console.log(units.length + ' theme units, ' + units.reduce((n, u) => n + u.weeks, 0) + ' weeks; plan ' + PLAN.slug);
if (DRY) { console.log('dry run: nothing written'); process.exit(0); }
for (const [f, text] of out) fs.writeFileSync(file(f), text);
console.log('written: ' + out.map(([f]) => f).join(', '));
