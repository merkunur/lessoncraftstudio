/**
 * Rhyming Words Level Set — apply a render-audit round (panels/audit-<loc>.json, brief scratchpad rhy/AUDIT-BRIEF.md).
 *   node tools/level-set/apply-rhy-audit.js <panelsDir> --locales=… [--skip=<loc>:<finding>.<op>,…] [--dry-run]
 * Each op goes to the SOURCE it belongs to:
 *   - a new class / verse (id `ls-…`) or a word/foil a panel ADDED to a published class → panels/out-<loc>.json (the
 *     panel's content file), then re-run import-rhy-panels.js — the overlay stays reproducible from its inputs
 *   - an item of the PUBLISHED bank → panels/pubfix/fix-<loc>.json, applied by apply-rhy-fixes.js (live pages that
 *     printed it are then found with rhy-published-touched.js and republished)
 *   - setLevelInstruction / setTitle → i18n/level-instructions.json (merged; also mirrored into out-<loc>.instructions)
 *   - setScreen → out-<loc>.screen (the importer derives sortNone / stringPlain)
 *   - builderRule → reported only (code changes are made by hand)
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { bank } = require('../../lib/b3-common.js');

const args = process.argv.slice(2);
const DIR = args.find((a) => !a.startsWith('--'));
const DRY = args.includes('--dry-run');
const LOCS = ((args.find((a) => a.startsWith('--locales=')) || '').slice(10)).split(',').filter(Boolean);
const skip = new Set(((args.find((a) => a.startsWith('--skip=')) || '').slice(7)).split(',').filter(Boolean));
const ROOT = path.join(__dirname, '..', '..');
const LI = path.join(ROOT, 'i18n', 'level-instructions.json');
const li = JSON.parse(fs.readFileSync(LI, 'utf8'));
const pubDir = path.join(DIR, 'pubfix');
fs.mkdirSync(pubDir, { recursive: true });
const report = [];
const strip = (id) => String(id).replace(/^ls-/, '');
for (const loc of LOCS) {
  const af = path.join(DIR, `audit-${loc}.json`);
  if (!fs.existsSync(af)) { report.push(`${loc}: no audit file`); continue; }
  const audit = JSON.parse(fs.readFileSync(af, 'utf8'));
  const of = path.join(DIR, `out-${loc}.json`);
  const out = JSON.parse(fs.readFileSync(of, 'utf8'));
  const pub = bank('rhyming-words', loc);
  const pubCls = new Map(pub.classes.map((c) => [c.id, c]));
  const pubCouplets = new Set((pub.couplets || []).map((c) => c.id));
  const newCls = (id) => (out.newClasses || []).find((c) => c.id === strip(id));
  const pubOps = [];
  const done = [], errs = [], notes = [];
  const seen = new Set();
  (audit.findings || []).forEach((f, fi) => (f.ops || []).forEach((o, oi) => {
    const tag = `${loc}:${fi + 1}.${oi + 1} ${o.op}`;
    const sig = JSON.stringify(o);
    if (skip.has(`${loc}:${fi + 1}.${oi + 1}`)) { notes.push(tag + ' SKIPPED'); return; }
    if (seen.has(sig)) return;   // the same op repeated under several findings
    seen.add(sig);
    try {
      if (o.op === 'builderRule') { notes.push(`${tag}: ${String(o.rule).slice(0, 120)}…`); return; }
      if (o.op === 'setLevelInstruction' || o.op === 'setTitle') {
        const lv = String(o.level);
        const e = ((li[o.page] = li[o.page] || {})[lv] = li[o.page][lv] || {});
        if (o.op === 'setTitle') { if (!e[loc]) throw new Error(`no level entry ${o.page}.${lv}.${loc} to carry a title`); e[loc].title = o.text; }
        else {
          e[loc] = { ...(e[loc] || {}), instruction: o.text };
          if (out.instructions && out.instructions[`${o.page}.${lv}`] !== undefined) out.instructions[`${o.page}.${lv}`] = o.text;
        }
        done.push(tag); return;
      }
      if (o.op === 'setScreen') { if (!out.screen || !(o.key in out.screen) && !['sortNone'].includes(o.key)) throw new Error(`no screen key ${o.key}`); out.screen[o.key] = o.text; done.push(tag); return; }
      // couplets
      if (o.op === 'setCouplet' || o.op === 'dropCouplet') {
        if (String(o.id).startsWith('ls-')) {
          const i = (out.couplets || []).findIndex((c) => c.id === strip(o.id));
          if (i < 0) throw new Error(`no new couplet ${o.id}`);
          if (o.op === 'dropCouplet') out.couplets.splice(i, 1); else { out.couplets[i].lines = o.lines; if (o.rhymeWith) out.couplets[i].rhymeWith = o.rhymeWith; }
          done.push(tag); return;
        }
        if (!pubCouplets.has(o.id)) throw new Error(`no couplet ${o.id}`);
        pubOps.push(o); done.push(tag + ' → published'); return;
      }
      const cid = o.op === 'moveMember' ? o.from : o.class;
      if (String(cid).startsWith('ls-')) {
        const c = newCls(cid);
        if (!c) throw new Error(`no new class ${cid}`);
        if (o.op === 'dropClass') { out.newClasses.splice(out.newClasses.indexOf(c), 1); out.couplets = (out.couplets || []).filter((cp) => !c.members.some((m) => m.vocabKey === cp.answer)); }
        else if (o.op === 'dropMember') { const n = c.members.length; c.members = c.members.filter((m) => m.vocabKey !== o.vocabKey); if (c.members.length === n) throw new Error(`no member ${o.vocabKey}`); out.couplets = (out.couplets || []).filter((cp) => cp.answer !== o.vocabKey); }
        else if (o.op === 'dropFoil') { const n = (c.nearMiss || []).length; c.nearMiss = (c.nearMiss || []).filter((m) => m.vocabKey !== o.vocabKey); if (c.nearMiss.length === n) throw new Error(`no foil ${o.vocabKey}`); }
        else if (o.op === 'dropExtra') { const n = (c.extra || []).length; c.extra = (c.extra || []).filter((w) => w !== o.word); if (c.extra.length === n) throw new Error(`no extra ${o.word}`); }
        else if (o.op === 'addExtra') c.extra = [...(c.extra || []), o.word];
        else if (o.op === 'setPic' || o.op === 'setWord') { const m = c.members.find((x) => x.vocabKey === o.vocabKey); if (!m) throw new Error(`no member ${o.vocabKey}`); if (o.op === 'setPic') m.pic = o.pic; else m.word = o.word; }
        else throw new Error('unsupported on a new class');
        done.push(tag); return;
      }
      const pc = pubCls.get(cid);
      if (!pc) throw new Error(`no class ${cid}`);
      // a member / foil the panel ADDED to a published class lives in out-<loc>.json (addMembers / nearMissFor)
      if (['dropMember', 'setPic', 'setWord'].includes(o.op) && !pc.members.some((m) => m.vocabKey === o.vocabKey)) {
        const list = (out.addMembers || {})[cid] || [];
        const m = list.find((x) => x.vocabKey === o.vocabKey);
        if (!m) throw new Error(`no member ${o.vocabKey} in ${cid} (published or added)`);
        if (o.op === 'dropMember') { out.addMembers[cid] = list.filter((x) => x !== m); out.couplets = (out.couplets || []).filter((cp) => cp.answer !== o.vocabKey); }
        else if (o.op === 'setPic') m.pic = o.pic; else m.word = o.word;
        done.push(tag + ' (added member)'); return;
      }
      if (o.op === 'dropFoil' && !(pc.nearMiss || []).some((m) => m.vocabKey === o.vocabKey)) {
        const list = (out.nearMissFor || {})[cid] || [];
        if (!list.some((x) => x.vocabKey === o.vocabKey)) throw new Error(`no foil ${o.vocabKey} in ${cid}`);
        out.nearMissFor[cid] = list.filter((x) => x.vocabKey !== o.vocabKey);
        done.push(tag + ' (added foil)'); return;
      }
      pubOps.push(o); done.push(tag + ' → published');
    } catch (e) { errs.push(`${tag}: ${e.message}`); }
  }));
  report.push(`${loc}: ${done.length} applied, ${pubOps.length} to the published bank${errs.length ? `, ${errs.length} ERRORS:\n  - ${errs.join('\n  - ')}` : ''}${notes.length ? `\n  notes:\n  - ${notes.join('\n  - ')}` : ''}`);
  if (errs.length || DRY) continue;
  fs.writeFileSync(of, JSON.stringify(out, null, 1));
  if (pubOps.length) fs.writeFileSync(path.join(pubDir, `fix-${loc}.json`), JSON.stringify({ locale: loc, ops: pubOps }, null, 1));
}
if (!DRY) fs.writeFileSync(LI, JSON.stringify(li, null, 1) + '\n');
console.log(report.join('\n'));
