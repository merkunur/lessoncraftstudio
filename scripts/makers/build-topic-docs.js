#!/usr/bin/env node
/**
 * Maker analysis, step 2: check the maker map against the type inventory and
 * write one document per maker + the old-app map.
 *
 * Fails (exit 1) when:
 *   - an in-scope type belongs to no maker, or to two
 *   - a science type is assigned to a maker
 *   - a family named in the map does not exist, or extraIds name an unknown type
 *   - one of the 33 old apps is mapped to no maker
 *   - a maker has no templates (no types and no new templates)
 *
 *   node scripts/makers/extract-type-inventory.js   (first)
 *   node scripts/makers/build-topic-docs.js [--check]   (--check: verify only, write nothing)
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { MAKERS, COMMON_SETTINGS } = require('./topic-map.js');

const ROOT = path.resolve(__dirname, '..', '..');
const INV = path.join(ROOT, 'docs', 'makers', 'inventory', 'types.json');
const OUT = path.join(ROOT, 'docs', 'makers');
const OLD_APPS = fs.readdirSync(path.join(ROOT, 'REFERENCE APPS')).filter((f) => f.endsWith('.html')).map((f) => f.replace(/\.html$/, ''));

function main() {
  const check = process.argv.includes('--check');
  const inv = JSON.parse(fs.readFileSync(INV, 'utf8')).rows;
  const byId = new Map(inv.map((r) => [r.id, r]));
  const families = new Set(inv.map((r) => r.family));
  const errors = [];

  // extraIds move a type out of its family's maker into this one
  const moved = new Map();
  for (const m of MAKERS) for (const id of m.extraIds || []) {
    if (!byId.has(id)) errors.push(`${m.id}: extraIds names unknown type ${id}`);
    moved.set(id, m.id);
  }
  const owner = new Map();
  const templatesOf = new Map(MAKERS.map((m) => [m.id, []]));
  for (const m of MAKERS) {
    for (const f of m.families) if (!families.has(f)) errors.push(`${m.id}: family "${f}" does not exist`);
  }
  for (const r of inv) {
    if (r.science) continue;
    let mk = moved.get(r.id);
    if (!mk) {
      const hits = MAKERS.filter((m) => m.families.includes(r.family));
      if (hits.length > 1) errors.push(`${r.id} (${r.family}) is in ${hits.map((h) => h.id).join(' + ')}`);
      mk = hits[0] && hits[0].id;
    }
    if (!mk) { errors.push(`${r.id} (${r.family}) "${r.title}" belongs to no maker`); continue; }
    owner.set(r.id, mk);
    templatesOf.get(mk).push(r);
  }
  for (const m of MAKERS) for (const id of m.extraIds || []) if (byId.get(id) && byId.get(id).science) errors.push(`${m.id}: ${id} is a science type`);
  for (const app of OLD_APPS) if (!MAKERS.some((m) => m.oldApps.includes(app))) errors.push(`old app ${app} is mapped to no maker`);
  for (const m of MAKERS) for (const a of m.oldApps) if (!OLD_APPS.includes(a)) errors.push(`${m.id}: old app "${a}" does not exist`);
  for (const m of MAKERS) if (!templatesOf.get(m.id).length && !(m.newTemplates || []).length) errors.push(`${m.id}: no templates at all`);

  const inScope = inv.filter((r) => !r.science).length;
  console.log(`makers ${MAKERS.length} · in-scope types ${inScope} · assigned ${owner.size} · old apps ${OLD_APPS.length} · new templates ${MAKERS.reduce((s, m) => s + (m.newTemplates || []).length, 0)} · fable questions ${MAKERS.reduce((s, m) => s + (m.fable || []).length, 0)}`);
  if (errors.length) { console.error('FAIL\n' + errors.join('\n')); process.exit(1); }
  if (check) { console.log('PASS'); return; }

  fs.mkdirSync(path.join(OUT, 'topics'), { recursive: true });
  for (const m of MAKERS) fs.writeFileSync(path.join(OUT, 'topics', m.id + '.md'), topicDoc(m, templatesOf.get(m.id)));
  fs.writeFileSync(path.join(OUT, 'MAKERS.md'), indexDoc(templatesOf, inv));
  console.log('PASS · wrote docs/makers/topics/*.md + MAKERS.md');
}

function topicDoc(m, types) {
  const L = [];
  L.push(`# Maker: ${m.name} (\`${m.id}\`)`, '');
  L.push(`Group **${m.group}** · language need **${m.lang}** · ${types.length} existing templates + ${(m.newTemplates || []).length} new · replaces old app(s): ${m.oldApps.length ? m.oldApps.map((a) => '`' + a + '`').join(', ') : '—'}`, '');
  L.push('## Settings a teacher sets', '', ...m.settings.map((s) => `- ${s}`), `- (plus the settings every maker has: ${COMMON_SETTINGS.join('; ')})`, '');
  if ((m.locale || []).length) L.push('## Locale conventions (en = American English, es = Mexican Spanish, pt = Brazilian Portuguese)', '', ...m.locale.map((s) => `- ${s}`), '');
  L.push('## Templates from today\'s worksheet types', '');
  const bySkill = new Map();
  for (const t of types) { const k = t.skill || '(no teaching point recorded)'; if (!bySkill.has(k)) bySkill.set(k, []); bySkill.get(k).push(t); }
  for (const [skill, ts] of bySkill) {
    L.push(`**${skill}**`, '');
    for (const t of ts) L.push(`- \`${t.id}\` ${t.title} — ${t.instruction || ''}${t.interactive ? ' · screen version' : ''}${t.themed ? ' · picture themes' : ''} (${t.file})`);
    L.push('');
  }
  L.push('## New templates to add', '');
  for (const [name, why] of m.newTemplates || []) L.push(`- **${name}** — ${why}`);
  L.push('', '## FABLE-QUESTIONS (answered before the build)', '');
  if ((m.fable || []).length) m.fable.forEach((q, i) => L.push(`${i + 1}. [${m.id}-Q${i + 1}] ${q}`));
  else L.push('None beyond the shared architecture questions in FABLE-BRIEF.md.');
  L.push('');
  return L.join('\n');
}

function indexDoc(templatesOf, inv) {
  const L = ['# The worksheet makers — one per topic', '', 'Generated by `scripts/makers/build-topic-docs.js` from `scripts/makers/topic-map.js` and `docs/makers/inventory/types.json`. Science types are excluded (operator 2026-10-31).', ''];
  L.push('| maker | group | language | templates now | new | old apps | Fable questions |', '|---|---|---|---|---|---|---|');
  for (const m of MAKERS) L.push(`| [${m.name}](topics/${m.id}.md) | ${m.group} | ${m.lang} | ${templatesOf.get(m.id).length} | ${(m.newTemplates || []).length} | ${m.oldApps.join(', ') || '—'} | ${(m.fable || []).length} |`);
  const sci = inv.filter((r) => r.science);
  L.push('', `## Excluded science types (${sci.length})`, '', sci.map((r) => `\`${r.id}\` ${r.title}`).join(' · '), '');
  return L.join('\n');
}

main();
