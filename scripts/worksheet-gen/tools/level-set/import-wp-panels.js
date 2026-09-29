/**
 * import-wp-panels.js — Level Set 2026-09-29 (Prefixes, Suffixes and Root Words): validate the native panels'
 * additions (<scratch>/wp-add-<loc>.json) against the rules the pages enforce, DROP every entry that breaks one
 * (reported, never silently fixed), and write data/b5/word-parts-levelset.json { <loc>: { … } } — merged over the
 * bank by G2-359 mergedBank() for NEW pages only.
 *
 *   node tools/level-set/import-wp-panels.js <scratchDir> [--locales=en,de] [--dry-run]
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { bank: loadBank } = require('../../lib/b5-common.js');
const { fileUri } = require('../../lib/b2-common.js');
const { PRONOUNS } = require('../../data/b4/pronouns.js');
const SPEC = require('../../types/g2/G2-359-prefixes-suffixes-and-root-words.js');

const DIR = process.argv[2];
const ONLY = ((process.argv.find((a) => a.startsWith('--locales=')) || '').split('=')[1] || '').split(',').filter(Boolean);
const DRY = process.argv.includes('--dry-run');
const OUT = path.join(__dirname, '..', '..', 'data', 'b5', 'word-parts-levelset.json');
const KINDS = new Set(['derived', 'prefixed', 'compound']);
const SLOTS = new Set(['noun-person', 'noun-thing', 'adjective', 'adverb', 'verb']);
const PEOPLE = Object.fromEntries(PRONOUNS.en.people.map((p) => [p.key, p]));
const low = (s, loc) => String(s).normalize('NFC').toLocaleLowerCase(loc);
const clean = (s) => typeof s === 'string' && s.trim() === s && s.length > 0 && !/[{}\d]/.test(s);
const picExists = (theme, noun) => { try { const u = fileUri(theme, noun); return fs.existsSync(u.startsWith('file:') ? require('url').fileURLToPath(u) : u); } catch (e) { return false; } };

// published-bank words / sentence blocks the panels flagged: kept off every NEW page (mergedBank drops them)
const FLAGGED = {
  es: { dropWords: ['manosear', 'manoseo', 'mareo', 'lechuga'], dropBlocks: ['color'] },   // + lechuga: it DOES come from leche
  de: { l3Exclude: ['steigen'] },
  en: { dropWords: ['hairy'] },   // the hair picture is a girl's face — 'hairy' does not describe it
  fi: { dropWords: ['pölyttäjä', 'lahjakas'], dropBlocks: ['satu'] },   // pollinator: no child knows it; lahjakas = talented; «Hänen hassu satuilu» needs the possessive
  pt: { dropAgents: ['mail_carrier_2', 'athlete'] },   // entregadora / corredora end in -ora, which the page title does not name
  da: { dropAgents: ['tailor'] },   // the portrait is a man; «syerske» is a woman's word
  no: { dropAgents: ['tailor', 'construction_worker'] },   // «syer» is rare in bokmål (skredder / syerske); «bygger» uncommon   // its published gloss «… und mitfahren» names the 4th prefix mit-   // unwanted-touching sense in Mexico; mareo DOES come from mar; «La {gap}» agrees with colorista only
};
const result = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, 'utf8')) : {};
const report = [];
for (const f of fs.readdirSync(DIR).filter((x) => /^wp-add-[a-z]{2}\.json$/.test(x))) {
  const loc = f.slice(7, 9);
  if (ONLY.length && !ONLY.includes(loc)) continue;
  const add = JSON.parse(fs.readFileSync(path.join(DIR, f), 'utf8'));
  const b = loadBank('word-parts', loc);
  const drop = [];
  const no = (what, why) => { drop.push(`${what}: ${why}`); return false; };
  const known = new Set([...(b.families || []), ...(b.rootFamilies || []), ...(b.picFamilies || [])].map((x) => x.id));
  const allMembers = new Set([...(b.families || []), ...(b.rootFamilies || []), ...(b.picFamilies || [])].flatMap((x) => (x.members || []).map((m) => low(m.word, loc))));
  const famOk = (x, minMembers, what) => {
    if (!x || !clean(x.id) || known.has(x.id)) return no(`${what} ${x && x.id}`, 'missing or duplicate id');
    // the locale's OWN root convention: it writes every family on a bound stem (rootIsFreeWord false, root.word = the stem)
    const bound = what !== 'picFamily' && (b.families || []).length && (b.families || []).every((q) => q.rootIsFreeWord === false);
    if (!clean(x.stem) || !x.root || !clean(x.root.word) || x.signed !== true || x.rootIsFreeWord !== !bound) return no(`${what} ${x.id}`, 'shape (stem / root.word / signed / rootIsFreeWord)');
    const ms = (x.members || []).filter((m) => {
      if (!m || !clean(m.word) || !KINDS.has(m.kind) || (m.slot && !SLOTS.has(m.slot))) return no(`${what} ${x.id} member ${m && m.word}`, 'shape / kind / slot');
      if (!m.stemSigned && !low(m.word, loc).includes(low(x.stem, loc))) return no(`${what} ${x.id} member ${m.word}`, `does not contain the stem "${x.stem}"`);
      if (low(m.word, loc) === low(x.root.word, loc)) return no(`${what} ${x.id} member ${m.word}`, 'is the root itself');
      if (allMembers.has(low(m.word, loc))) return no(`${what} ${x.id} member ${m.word}`, 'already a member of another family');
      return true;
    });
    if (ms.filter((m) => m.kind === 'compound').length > 2) return no(`${what} ${x.id}`, 'more than 2 compounds');
    if (ms.length < minMembers) return no(`${what} ${x.id}`, `${ms.length} valid members < ${minMembers}`);
    x.members = ms;
    return true;
  };
  const keep = (list, test) => (list || []).filter((x) => { const ok = test(x); if (ok) { known.add(x.id); for (const m of x.members) allMembers.add(low(m.word, loc)); } return ok; });

  const families = keep(add.families, (x) => famOk(x, 6, 'family'));
  const rootFamilies = keep(add.rootFamilies, (x) => famOk(x, 3, 'rootFamily'));
  const picFamilies = keep(add.picFamilies, (x) => {
    if (!famOk(x, 1, 'picFamily')) return false;
    const p = x.root.pic;
    if (!p || !p.theme || !p.noun || x.root.picOpened !== true || !picExists(p.theme, p.noun)) return no(`picFamily ${x.id}`, `picture ${p && p.theme}/${p && p.noun} missing or not opened`);
    if (x.members.some((m) => m.kind === 'compound' || !low(m.word, loc).includes(low(x.root.word, loc)))) x.members = x.members.filter((m) => m.kind !== 'compound' && low(m.word, loc).includes(low(x.root.word, loc)));
    if (!x.members.length) return no(`picFamily ${x.id}`, 'no non-compound member contains the picture word');
    const r2 = low(x.root.word, loc).slice(0, 2);
    x.lookAlikes = (x.lookAlikes || []).filter((l) => l && clean(l.word) && low(l.word, loc).slice(0, 2) === r2 && !low(l.word, loc).includes(low(x.root.word, loc)) && !allMembers.has(low(l.word, loc)) || no(`picFamily ${x.id} look-alike ${l && l.word}`, 'not 2 initial letters / contains the root / is a member'));
    if (x.lookAlikes.length < 3) return no(`picFamily ${x.id}`, `${x.lookAlikes.length} valid look-alikes < 3`);
    return true;
  });

  let prefixKey = null;
  if (add.prefixKey && b.prefixKey) {
    const ep = add.prefixKey.extraPrefix;
    const neg = new Set((b.negating || []).map((x) => low(x, loc)));
    if (!ep || !clean(ep.prefix) || !clean(ep.meaning) || neg.has(low(ep.prefix, loc)) || b.prefixKey.prefixes.some((p) => p.prefix === ep.prefix)) no('extraPrefix', 'missing, negating or already in the key');
    else {
      const key = [...b.prefixKey.prefixes, ep];
      const cc = add.prefixKey.crossCheck || [];
      const meanings = key.map((p) => p.meaning);
      const rowOk = (r, isNew) => {
        const good = cc.filter((c) => c.base === r.base && c.isWord && c.fitsGloss);
        const covered = key.every((p) => cc.some((c) => c.base === r.base && c.prefix === p.prefix) || (!isNew && (b.prefixKey.crossCheck || []).some((c) => c.base === r.base && c.prefix === p.prefix)));
        if (!covered) return no(`prefix row ${r.base}`, 'crossCheck does not cover all 4 prefixes');
        const allGood = [...good, ...(isNew ? [] : (b.prefixKey.crossCheck || []).filter((c) => c.base === r.base && c.isWord && c.fitsGloss && c.prefix !== ep.prefix))];
        const uniq = [...new Set(allGood.map((c) => c.prefix))];
        if (uniq.length !== 1 || uniq[0] !== r.prefix) return no(`prefix row ${r.base}`, `${uniq.length} prefixes fit (${uniq})`);
        return true;
      };
      const rows = (add.prefixKey.rows || []).filter((r) => {
        if (!r || !clean(r.base) || !clean(r.word) || !clean(r.gloss) || !key.some((p) => p.prefix === r.prefix)) return no(`prefix row ${r && r.base}`, 'shape / prefix not in the key');
        if ((r.prefix + r.base).normalize('NFC') !== r.word.normalize('NFC')) return no(`prefix row ${r.base}`, `${r.prefix}+${r.base} ≠ ${r.word}`);
        if (b.prefixKey.rows.some((x) => x.base === r.base)) return no(`prefix row ${r.base}`, 'base already in the bank');
        const q = SPEC._rules.glossQuotesKey(r.gloss, meanings, loc);
        if (q.length) return no(`prefix row ${r.base}`, `gloss quotes the key (${q})`);
        return rowOk(r, true);
      });
      // the published rows must stay unambiguous with the 4th prefix in the key (else the L3 key drops them — reported)
      const oldBad = b.prefixKey.rows.filter((r) => !rowOk(r, false)).map((r) => r.base);
      // only the checks the bank lacks (a restated published check would count twice in the page's verify)
      const have = new Set((b.prefixKey.crossCheck || []).map((c) => c.base + '|' + c.prefix));
      const seen = new Set();
      const ccNew = cc.filter((c) => { const k = c.base + '|' + c.prefix; if (have.has(k) || seen.has(k)) return false; seen.add(k); return true; });
      const excl = [...new Set([...oldBad, ...(((FLAGGED[loc] || {}).l3Exclude) || [])])];
      prefixKey = { extraPrefix: ep, rows, crossCheck: ccNew, ...(excl.length ? { l3Exclude: excl } : {}) };
    }
  }

  const refusedPerson = (b.refuse && b.refuse['who-does-it']) || ['es', 'fr'].includes(loc);
  const agents = refusedPerson ? [] : (add.agents || []).filter((a) => {
    const p = a && PEOPLE[a.key];
    if (!p) return no(`agent ${a && a.key}`, 'no such portrait');
    if ((b.agents || []).some((x) => x.key === a.key)) return no(`agent ${a.key}`, 'already in the bank');
    const ans = a.answer && (a.answer[p.depicted] || a.answer.any);
    if (!clean(a.base) || !clean(ans)) return no(`agent ${a.key}`, `no base / no answer for the depicted ${p.depicted}`);
    if (!a.stemSigned && !low(ans, loc).includes(low(a.base, loc))) return no(`agent ${a.key}`, `"${ans}" does not contain "${a.base}"`);
    if (!['regular', 'other'].includes(a.class)) return no(`agent ${a.key}`, 'class');
    return true;
  });
  const agentClass = refusedPerson ? {} : Object.fromEntries(Object.entries(add.agentClass || {}).filter(([k, v]) => (b.agents || []).some((x) => x.key === k) && ['regular', 'other'].includes(v)));

  const famById = new Map([...(b.families || []), ...(b.rootFamilies || []), ...families, ...rootFamilies].map((x) => [x.id, x]));
  const sentences = {};
  for (const [id, ss] of Object.entries(add.sentences || {})) {
    const fam = famById.get(id);
    if (!fam) { no(`sentences ${id}`, 'no such family'); continue; }
    if ((b.sentences || {})[id]) { no(`sentences ${id}`, 'block already in the bank'); continue; }
    if (!Array.isArray(ss) || ss.length !== 4 || new Set(ss.map((x) => x.slot)).size !== 4) { no(`sentences ${id}`, 'not 4 entries with 4 different slots'); continue; }
    if (ss.some((x) => !fam.members.some((m) => m.word === x.word) || (String(x.frame).match(/\{gap\}/g) || []).length !== 1 || !SLOTS.has(x.slot))) { no(`sentences ${id}`, 'a word is not a family member / a frame without exactly one {gap}'); continue; }
    if (loc === 'en' && ss.some((x) => /(?:^|\s)an?\s*$/i.test(String(x.frame).split('{gap}')[0]))) { no(`sentences ${id}`, 'an article before the gap'); continue; }
    sentences[id] = ss;
  }
  const exemplarF5 = (add.exemplarF5 || []).filter((id) => sentences[id]);

  const { l3Exclude: _x, ...flag } = FLAGGED[loc] || {};
  result[loc] = { ...flag, families, rootFamilies, picFamilies, ...(prefixKey ? { prefixKey } : {}), ...(agents.length ? { agents, agentClass } : {}), sentences, exemplarF5 };
  const c = (x) => (Array.isArray(x) ? x.length : Object.keys(x || {}).length);
  report.push(`${loc}: families ${c(families)}/${c(add.families)} · rootFamilies ${c(rootFamilies)}/${c(add.rootFamilies)} · picFamilies ${c(picFamilies)}/${c(add.picFamilies)} · prefix rows ${prefixKey ? c(prefixKey.rows) : 0}/${add.prefixKey ? c(add.prefixKey.rows) : 0}${prefixKey && prefixKey.l3Exclude ? ' (old rows ambiguous with the 4th prefix: ' + prefixKey.l3Exclude + ')' : ''} · agents ${c(agents)}/${c(add.agents)} · sentence blocks ${c(sentences)}/${c(add.sentences)}`);
  for (const d of drop) report.push('   dropped ' + d);
}
console.log(report.join('\n'));
if (!DRY) { fs.writeFileSync(OUT, JSON.stringify(result, null, 1) + '\n'); console.log('wrote ' + OUT); }
