#!/usr/bin/env node
/**
 * Mutation check for the class-results rules: each entry breaks ONE rule in a copy of
 * frontend/lib/class-results/store.ts and the test suite must then FAIL. A mutation the suite still passes
 * ("survived") means that rule is not really tested.
 *
 *   node scripts/class-results/tests/mutate-class-store.js      exit 1 when a mutation survives or a needle is gone
 *
 * A needle that no longer occurs exactly once is a FAULT, never a skip: a dropped mutation would shrink the total
 * while the run still said "every mutation killed".
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const REPO = path.join(__dirname, '..', '..', '..');
const SRC = path.join(REPO, 'frontend', 'lib', 'class-results', 'store.ts');
const TMP = path.join(REPO, 'out', 'class-results', '_tests', 'mutant');
fs.mkdirSync(TMP, { recursive: true });
const src = fs.readFileSync(SRC, 'utf8').replace(/\r\n/g, '\n');

const M = [
  ['a free account can make a class', "  if (!me.usable) return SUBSCRIBE;\n  const b = body as { name?: unknown; namesMode?: unknown; locale?: unknown; names?: unknown; count?: unknown } | null;", "  const b = body as { name?: unknown; namesMode?: unknown; locale?: unknown; names?: unknown; count?: unknown } | null;"],
  ["any teacher owns any class", 'return c && c.teacherId === me.userId ? c : null;', 'return c ? c : null;'],
  ['one wrong of four counts as almost all right', '(total >= 5 && wrong <= 1)', '(wrong <= 1)'],
  ['"several wrong" starts lower', 'wrong >= 2 && right / total < 0.6', 'wrong >= 2 && right / total < 0.5'],
  ['a hard page never ends the set', "return band === 'high' ? null : band === 'low' && has('core') ? 'core' : 'hard';", "return band === 'low' && has('core') ? 'core' : 'hard';"],
  ['after the easy page the child stays on easy', "if (last.level === 'easy') return has('core') ? 'core' : has('hard') ? 'hard' : 'easy';", "if (last.level === 'easy') return 'easy';"],
  ['almost all right on core does not promote', "if (band === 'high') return has('hard') ? 'hard' : null;", "if (band === 'high') return start;"],
  ['several wrong on core does not give the easier page', "if (band === 'low') return has('easy') ? 'easy' : start;", "if (band === 'low') return start;"],
  ['a sitting has one page more', 'if (recent.length >= SITTING_PAGES)', 'if (recent.length > SITTING_PAGES)'],
  ['a page played before is preferred over a fresh one', 'const fresh = pages.find((p) => !lastPlayed.has(p));', 'const fresh = pages.find((p) => lastPlayed.has(p));'],
  ['a later Check overwrites the first', 'if (!att.reportedAt) await db.saveReport', 'if (true) await db.saveReport'],
  // first names need the teacher's own permission (legal decision 2026-11-14, E1)
  ['a teacher without the permission makes a names class', "me.names === true && b.namesMode === 'names' ? 'names' : 'numbers'", "b.namesMode === 'names' ? 'names' : 'numbers'"],
  ['a class made without a kind is a names class', "me.names === true && b.namesMode === 'names' ? 'names' : 'numbers'", "b.namesMode === 'numbers' ? 'numbers' : 'names'"],
  ['a teacher without the permission switches a class to names', "if (patch.namesMode === 'names' && me.names !== true) return NAMES_OFF;", ''],
  ['a seat takes a name without the permission', "    if (me.names !== true) return NAMES_OFF;", ''],
  ['a names class takes a new name without the permission', "  if (c.namesMode === 'names' && me.names !== true) return NAMES_OFF;", ''],
  ['a numbers-only class shows names', "name: mode === 'names' ? s.displayName : null,", 'name: s.displayName,'],
  ['switching to numbers keeps the names', '  if (toNumbers) await db.clearSeatNames(c.id);\n', '\n'],
  ['a print-only deck can be assigned', "    if (!d.interactive) return json(422, { error: 'print_only' });\n", '\n'],
  ['a Level Set with no screen pages can be assigned', "    if (!n) return json(422, { error: 'print_only' });\n", '\n'],
  ["a lapsed teacher's class link stays live", '  if (!r.teacherUsable) return INACTIVE;\n', '\n'],
  ["a lapsed teacher's reports are stored", '  if (!live || !live.teacherUsable) return INACTIVE;\n', '  if (!live) return INACTIVE;\n'],
  // not listed: dropping the host pattern's lookahead changes nothing, because what is left of a look-alike host
  // (".evil.example/…", "@evil.example/…") does not start with '/' and is refused by the next line anyway
  ['item marks need not add up', '    if ((b.items as number[]).reduce((s, x) => s + x, 0) !== right) return null;\n', '\n'],
  ['more right than asked is accepted', '(b.right as number) > (b.total as number)) return null;', 'false) return null;'],
  ['an empty report is accepted', "  if (total == null && typeof b.finished !== 'boolean') return null;", '  if (false) return null;'],
  ['a played-not-finished page is refused', "  if (total == null && typeof b.finished !== 'boolean') return null;", '  if (total == null && b.finished !== true) return null;'],
  ['two children can share a picture', 'x.id !== s.id && x.icon === b.icon', 'false'],
  ['"delete results" removes the child', 'if (resultsOnly) await db.deleteAttemptsOfSeat(s.id); else await db.deleteSeat(s.id);', 'await db.deleteSeat(s.id);'],
  ['the seat cap is higher', 'if (firstNo - 1 + names.length > SEATS_PER_CLASS)', 'if (firstNo - 1 + names.length > SEATS_PER_CLASS + 1)'],
  ['the class cap is higher', '>= CLASSES_PER_TEACHER) return', '> CLASSES_PER_TEACHER) return'],
  ['a second tap mints a second attempt', 'const open = history.find((h) => !h.reportedAt &&', 'const open = history.find((h) => false &&'],
  ['a class is removed one day early', 'if (now.getTime() - ms(c.lastUsedAt) > RETENTION_UNUSED_DAYS * DAY) return true;', 'if (now.getTime() - ms(c.lastUsedAt) >= RETENTION_UNUSED_DAYS * DAY) return true;'],
  ['a re-subscribed teacher loses the class', 'return !teacher.usable && !!teacher.endedAt &&', 'return !!teacher.endedAt &&'],
  ['any token skips the meter', '  return !!live && live.teacherUsable;\n}', '  return !!live;\n}'],
  ['a closed assignment stays on the class page', 'assignments: assignments.filter((a) => !a.closedAt).map((a) => ({ id: a.id, kind: a.kind, title: a.title })),', 'assignments: assignments.map((a) => ({ id: a.id, kind: a.kind, title: a.title })),'],
  ['a closed assignment can be started', 'if (!seat || !a || a.closedAt) return NOT_FOUND;', 'if (!seat || !a) return NOT_FOUND;'],
  ["a seat of another class is accepted", 'return s && s.classId === c.id ? s : null;', 'return s ? s : null;'],
  ['an e-mail address is accepted as a name', "if (/[@<>\\\\/|;:=]/.test(s) || /^\\d+$/.test(s)) return null;", "if (/^\\d+$/.test(s)) return null;"],
  ['the same deck is assigned twice', 'if (same) {', 'if (false) {'],
  ['a lapsed teacher can rename', '  if (!me.usable && !onlyRemoval) return SUBSCRIBE;\n', '\n'],
  ['a lapsed teacher cannot switch to numbers only', 'const onlyRemoval = toNumbers && Object.keys(patch).length === 1 && !b.newCode;', 'const onlyRemoval = false;'],
  ['the dashboard counts an unfinished start as a play', 'const h = reported(by.get(a.id + \'|\' + s.id) || []);\n      if (!h.length) continue;', 'const h = (by.get(a.id + \'|\' + s.id) || []);\n      if (!h.length) continue;'],
  // release 2: an activity as an assignment
  ['a longer path under an activity is taken for the activity', "if (parts[1] === 'activities' && parts.length === 3 && slugOk(parts[2]))", "if (parts[1] === 'activities' && parts.length >= 3 && slugOk(parts[2]))"],
  ['an activity that does not exist is assigned anyway', "    if (!act) return json(404, { error: 'link_not_found' });\n", ''],
  ['an activity is opened as a deck page', "  if (content.kind === 'activity') return `/${content.locale}/activities/${content.slug}#lcs=${token}`;\n", ''],
  ['two different activities are the same assignment', "c.kind === 'activity' ? ['activity', c.locale, c.slug]", "c.kind === 'activity' ? ['activity', c.locale]"],
  // release 2: the dashboard by curriculum
  ['another teacher reads the view by curriculum', "  const c = await own(db, me, id);\n  if (!c) return NOT_FOUND;\n  const picked = await pick(", "  const c = await db.getClass(id);\n  if (!c) return NOT_FOUND;\n  const picked = await pick("],
  ['an index of another language is accepted', "if (!picked || picked.index.locale !== c.locale) return json(404, { error: 'no_curriculum' });", "if (!picked) return json(404, { error: 'no_curriculum' });"],
  ['any text is passed on as a curriculum key', "typeof wanted === 'string' && /^[a-z]{2}(?:-[a-z]{2})?$/.test(wanted) ? wanted : null", "typeof wanted === 'string' ? wanted : null"],
  ['the EARLIEST result under a heading counts', "if (!have || e.at > have.at || (e.at === have.at && e.band && !have.band)) row.seats[s.id] = e;", "if (!have || e.at < have.at) row.seats[s.id] = e;"],
  ['a single page counts by its last play', "  return { band: bandOf(h[0].right, h[0].total), at: ms(h[0].reportedAt as Date | string) };", "  return { band: bandOf(h[h.length - 1].right, h[h.length - 1].total), at: ms(h[h.length - 1].reportedAt as Date | string) };"],
  ['a Level Set counts by its first page', "    const m = marked[marked.length - 1];", "    const m = marked[0];"],
  ['a next step is offered when nobody had anything wrong', "    if (counts.low + counts.mid > 0) {", "    if (true) {"],
  ['a Level Set the class already has is offered again', "if (pt.set && !hasSet.has(pt.set) && !next.some((n) => n.kind === 'set')) {", "if (pt.set && !next.some((n) => n.kind === 'set')) {"],
  ['an activity the class already has is offered again', "          if (hasAct.has(slug)) continue;\n", ""],
  ['an activity that is not live is offered', "          if (act) { next.push({ kind: 'activity', title: act.title, link: `/${c.locale}/activities/${act.slug}` }); break; }", "          next.push({ kind: 'activity', title: act ? act.title : slug, link: `/${c.locale}/activities/${slug}` }); break;"],
  ['a page with no type code is placed under the first heading', "    if (!pid || !pt || !index.groups[pt.g]) { other.push({ id: a.id, title: a.title, kind: a.kind }); continue; }", "    if (!pid || !pt || !index.groups[pt.g]) continue;"],
  ['headings stand in the order the work was added', "for (const row of [...rows.values()].sort((a, b) => a.order - b.order || a.g - b.g)) {", "for (const row of [...rows.values()]) {"],
  ['a child who only played counts as almost all right', "      const b = e.band || 'played';", "      const b = e.band || 'high';"],
  ['the assignment forgets the id of the activity', "content: { kind: 'activity', locale: p.locale, slug: act.slug, activity: act.id } };", "content: { kind: 'activity', locale: p.locale, slug: act.slug, activity: '' } };"],
];

let survived = 0, faults = 0, killed = 0;
for (const [name, needle, repl] of M) {
  const parts = src.split(needle);
  if (parts.length !== 2) { faults++; console.log('FAULT    needle occurs ' + (parts.length - 1) + ' times: ' + name); continue; }
  const file = path.join(TMP, 'store.ts');
  fs.writeFileSync(file, parts.join(repl));
  const r = spawnSync(process.execPath, [path.join(__dirname, 'class-store.test.js')], { env: Object.assign({}, process.env, { CLASS_STORE_SRC: file }), encoding: 'utf8', timeout: 30000 });
  if (r.status === 0) { survived++; console.log('SURVIVED ' + name); }
  else if (r.status === 1 && /FAIL|checks FAILED|Error/.test(r.stdout + r.stderr)) killed++;
  else { faults++; console.log('FAULT    the suite did not run to a verdict (status ' + r.status + '): ' + name); }
}
console.log(`${killed} of ${M.length} mutations killed` + (survived ? `, ${survived} SURVIVED` : '') + (faults ? `, ${faults} FAULTS` : ''));
process.exit(survived || faults ? 1 : 0);
