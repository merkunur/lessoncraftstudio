/**
 * Rhyming Words Level Set — import the native panels' content into the new-pages-only overlay.
 *   node tools/level-set/import-rhy-panels.js <panelsDir> [--locales=en,de,…] [--dry-run]
 * Reads <panelsDir>/out-<loc>.json (tools brief: scratchpad rhy/PANEL-BRIEF.md) and writes
 *   data/b3/rhyming-words-levelset.json  { <loc>: { classes, addMembers, nearMissFor, couplets } }
 *   i18n/level-instructions.json         G1-343.3 G1-344.1 G1-344.3 G1-345.1 G1-345.3 G1-346.1 G1-346.3
 *   i18n/interactive-instructions.json   rhyming-words.{pick,judge,sort,sortNone,verse,string,stringPlain}
 * REFUSES (never repairs) an entry whose picture is not a cached colour picture, whose vocabKey already belongs to
 * another class, or whose word is not one plain word. Published bank defects are NOT imported here (they change live
 * pages — fixed in data/b3/rhyming-words.js and republished).
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { bank } = require('../../lib/b3-common.js');
const { fileUri } = require('../../lib/b2-common.js');

const args = process.argv.slice(2);
const DIR = args.find((a) => !a.startsWith('--'));
const DRY = args.includes('--dry-run');
const onlyArg = args.find((a) => a.startsWith('--locales='));
const ROOT = path.join(__dirname, '..', '..');
const OUT = path.join(ROOT, 'data', 'b3', 'rhyming-words-levelset.json');
const LEVEL_I18N = path.join(ROOT, 'i18n', 'level-instructions.json');
const SCREEN_I18N = path.join(ROOT, 'i18n', 'interactive-instructions.json');
const WORD_RE = /^[\p{L}\-']+$/u;
const BW = /\b(bw|sw|bn|nb|zw|sh|pb|mv|sv)(\s\d+)?$/i;
const LEVEL_KEYS = ['G1-343.3', 'G1-344.1', 'G1-344.3', 'G1-345.1', 'G1-345.3', 'G1-346.1', 'G1-346.3'];
const SCREEN_KEYS = ['pick', 'judge', 'sort', 'sortNone', 'verse', 'string'];
if (!DIR) throw new Error('usage: import-rhy-panels.js <panelsDir> [--locales=…] [--dry-run]');

/** First sentence of a string (for the no-cross screen instruction); refuses when there is no second sentence. */
function firstSentence(s, loc) {
  const parts = String(s).split(/(?<=[.!?])\s+/u);
  if (parts.length < 2) throw new Error(`${loc}: screen "string" has one sentence — cannot derive the no-cross form`);
  return parts[0];
}

const all = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, 'utf8')) : {};
const levelI18n = JSON.parse(fs.readFileSync(LEVEL_I18N, 'utf8'));
const screenI18n = JSON.parse(fs.readFileSync(SCREEN_I18N, 'utf8'));
const report = [];
const locs = onlyArg ? onlyArg.slice(10).split(',') : fs.readdirSync(DIR).map((f) => (/^out-(\w\w)\.json$/.exec(f) || [])[1]).filter(Boolean);
for (const loc of locs) {
  const p = JSON.parse(fs.readFileSync(path.join(DIR, `out-${loc}.json`), 'utf8'));
  const pub = bank('rhyming-words', loc);
  const errs = [];
  const owner = new Map();
  for (const c of pub.classes) for (const m of c.members) owner.set(m.vocabKey, c.id);
  const ids = new Set(pub.classes.map((c) => c.id));
  const sounds = new Map(pub.classes.map((c) => [c.sound, c.id]));
  const pic = (s, where) => {
    const i = String(s || '').lastIndexOf('/');
    if (i < 0) { errs.push(`${where}: picture "${s}" is not theme/noun`); return null; }
    const theme = s.slice(0, i), noun = s.slice(i + 1);
    if (BW.test(theme)) { errs.push(`${where}: picture "${s}" is B&W`); return null; }
    try { fileUri(theme, noun); } catch (e) { errs.push(`${where}: picture "${s}" is not cached`); return null; }
    return { theme, noun };
  };
  const member = (m, cls, where) => {
    if (!WORD_RE.test(m.word || '')) { errs.push(`${where}: word "${m.word}" is not one plain word`); return null; }
    if (!m.vocabKey) { errs.push(`${where}: no vocabKey`); return null; }
    if (owner.has(m.vocabKey) && owner.get(m.vocabKey) !== cls) { errs.push(`${where}: "${m.vocabKey}" already belongs to class ${owner.get(m.vocabKey)}`); return null; }
    const pc = pic(m.pic, where);
    if (!pc) return null;
    owner.set(m.vocabKey, cls);
    return { vocabKey: m.vocabKey, word: m.word, pic: pc, sameSpelling: m.sameSpelling === true, productive: m.productive !== false, picOpened: true };
  };
  const foil = (f, cls, where) => {
    if (!WORD_RE.test(f.word || '') || !f.vocabKey) { errs.push(`${where}: foil "${f.word}" malformed`); return null; }
    if (owner.get(f.vocabKey) === cls) { errs.push(`${where}: foil "${f.vocabKey}" is a member of its own class`); return null; }
    const pc = pic(f.pic, where);
    return pc ? { vocabKey: f.vocabKey, word: f.word, pic: pc, picOpened: true } : null;
  };
  // published classes gain members / foils (new pages only)
  const addMembers = {};
  for (const [cid, list] of Object.entries(p.addMembers || {})) {
    if (!ids.has(cid)) { errs.push(`addMembers: no published class "${cid}"`); continue; }
    addMembers[cid] = list.map((m, i) => member(m, cid, `addMembers.${cid}[${i}]`)).filter(Boolean);
  }
  const nearMissFor = {};
  for (const [cid, list] of Object.entries(p.nearMissFor || {})) {
    if (!ids.has(cid)) { errs.push(`nearMissFor: no published class "${cid}"`); continue; }
    nearMissFor[cid] = list.map((f, i) => foil(f, cid, `nearMissFor.${cid}[${i}]`)).filter(Boolean);
  }
  const classes = [];
  for (const [ci, c] of (p.newClasses || []).entries()) {
    const id = `ls-${c.id}`;
    if (ids.has(id) || ids.has(c.id)) { errs.push(`newClasses[${ci}]: id "${c.id}" exists`); continue; }
    if (sounds.has(c.sound)) { errs.push(`newClasses[${ci}] ${c.id}: sound "${c.sound}" = class ${sounds.get(c.sound)} (they rhyme — merge instead)`); continue; }
    ids.add(id); sounds.set(c.sound, id);
    const members = (c.members || []).map((m, i) => member(m, id, `${c.id}.members[${i}]`)).filter(Boolean);
    if (members.length < 2) { errs.push(`newClasses ${c.id}: ${members.length} usable members (< 2) — skipped`); continue; }
    classes.push({ id, rime: c.rime, sound: c.sound, cap: 8, members, extra: (c.extra || []).filter((w) => WORD_RE.test(w)), nearMiss: [] , _foils: c.nearMiss || [] });
  }
  // foils after every member is known (a foil may be a member of another NEW class)
  for (const c of classes) { c.nearMiss = c._foils.map((f, i) => foil(f, c.id, `${c.id}.nearMiss[${i}]`)).filter(Boolean); delete c._foils; }
  // couplets: the answer must be a pictured member (published or new); ids prefixed so they never collide
  const pubCouplets = new Set((pub.couplets || []).map((c) => c.id));
  const couplets = [];
  for (const [i, cp] of (p.couplets || []).entries()) {
    const id = `ls-${cp.id}`;
    if (pubCouplets.has(id)) { errs.push(`couplets[${i}]: id ${cp.id} exists`); continue; }
    if (!owner.has(cp.answer)) { errs.push(`couplets[${i}] ${cp.id}: answer "${cp.answer}" is not a class member`); continue; }
    if (!Array.isArray(cp.lines) || cp.lines.length !== 2 || (cp.lines[1].match(/___/g) || []).length !== 1 || cp.lines[0].includes('___')) { errs.push(`couplets[${i}] ${cp.id}: lines malformed`); continue; }
    // the builder matches the partner against the LOWER-CASED line: a German noun capital (Hand) would drop the verse silently
    couplets.push({ id, lines: cp.lines, answer: { vocabKey: cp.answer }, rhymeWith: String(cp.rhymeWith).toLocaleLowerCase(loc), cueFree: false });
  }
  // strings
  for (const k of LEVEL_KEYS) if (!(p.instructions || {})[k]) errs.push(`instructions.${k} missing`);
  for (const k of SCREEN_KEYS) if (!(p.screen || {})[k]) errs.push(`screen.${k} missing`);
  report.push(`${loc}: +${classes.length} classes (${pub.classes.length + classes.length} total), +${Object.values(addMembers).flat().length} members to published, ` +
    `foils ${classes.reduce((s, c) => s + c.nearMiss.length, 0) + Object.values(nearMissFor).flat().length}, couplets +${couplets.length}` + (errs.length ? `\n   REFUSED ${errs.length}:\n   - ${errs.join('\n   - ')}` : ''));
  all[loc] = { classes, addMembers, nearMissFor, couplets };
  for (const k of LEVEL_KEYS) {
    if (!(p.instructions || {})[k]) continue;
    // K band (sv da no): Rhyme Strings level 3 keeps TWO lanes, so the panels' "three words" text would be false there
    if (k === 'G1-345.3' && ['sv', 'da', 'no'].includes(loc)) {
      ((levelI18n['G1-345'] = levelI18n['G1-345'] || {})['3'] = levelI18n['G1-345']['3'] || {})[loc] = { instruction: JSON.parse(fs.readFileSync(path.join(ROOT, 'i18n', `strings.${loc}.json`), 'utf8'))['G1-345'].instruction };
      continue;
    }
    const [id, lv] = k.split('.');
    // merge: a per-level TITLE override (a title that names a word count) survives a re-import
    const lvl = ((levelI18n[id] = levelI18n[id] || {})[lv] = levelI18n[id][lv] || {});
    lvl[loc] = { ...(lvl[loc] || {}), instruction: p.instructions[k] };
  }
  const fam = screenI18n['rhyming-words'] = screenI18n['rhyming-words'] || {};
  if (p.screen) {
    for (const k of ['pick', 'judge', 'sort', 'verse', 'string']) (fam[k] = fam[k] || {})[loc] = p.screen[k];
    (fam.sortNone = fam.sortNone || {})[loc] = `${p.screen.sort} ${p.screen.sortNone}`;
    (fam.stringPlain = fam.stringPlain || {})[loc] = firstSentence(p.screen.string, loc);
  }
}
console.log(report.join('\n'));
if (!DRY) {
  fs.writeFileSync(OUT, JSON.stringify(all, null, 1) + '\n');
  fs.writeFileSync(LEVEL_I18N, JSON.stringify(levelI18n, null, 1) + '\n');
  fs.writeFileSync(SCREEN_I18N, JSON.stringify(screenI18n, null, 1) + '\n');
  console.log('wrote', path.relative(ROOT, OUT), '+ level / screen instructions');
}
