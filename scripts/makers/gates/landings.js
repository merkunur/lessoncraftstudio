#!/usr/bin/env node
/**
 * Gate: the worksheet makers' public pages (operator launch goal 2026-11-06).
 *
 *   node scripts/makers/gates/landings.js                 data checks (browser-free; runs in deploy.sh)
 *   node scripts/makers/gates/landings.js --poison        every check must fail on a broken copy of its input
 *   node scripts/makers/gates/landings.js --url=<base> [--locales=en,de] [--limit=N]   the same promises on rendered pages
 *   node scripts/makers/gates/landings.js --url=<base> --poison   every rendered assertion must fail on a broken real page
 *   node scripts/makers/gates/landings.js --freeze        (re)write the old landings' SEO baseline — only when the operator
 *                                                          has asked for their words to change
 *
 * What it holds: 647 pairs and no others (Cursive has no sv / fi); native slugs, unique titles, descriptions in the
 * window; no raw token anywhere; every language's strings cover the English keys; no near-duplicate pages; every image a
 * page names exists; the old landings' words are unchanged; every launch URL opens the maker in the page's own language
 * and every template it names is offered in that language.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const REPO = path.join(__dirname, '..', '..', '..');
const DATA = path.join(REPO, 'frontend', 'content', 'maker-landings');
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const FREEZE = path.join(REPO, 'docs', 'makers', 'old-landings.seo-freeze.json');
const PREVIEWS = path.join(REPO, 'out', 'maker-previews');
const SIM_FAIL = 0.8, SIM_WARN = 0.65;
const OLD_FIELDS = ['slug', 'name', 'tagline', 'metaTitle', 'metaDescription', 'about', 'howToUse', 'classroomIdeas', 'modes', 'modeNames', 'samplesIntro'];

const readJson = (f) => JSON.parse(fs.readFileSync(f, 'utf8'));
const arg = (k) => { const a = process.argv.find((x) => x.startsWith(`--${k}=`)); return a ? a.slice(k.length + 3) : null; };
const has = (k) => process.argv.includes(`--${k}`);

function loadAll() {
  const catalog = readJson(path.join(REPO, 'frontend', 'lib', 'makers', 'landing-catalog.json')).makers;
  const d = { catalog, copy: {}, tpl: {}, ui: {}, hub: {}, ribbon: readJson(path.join(DATA, 'ribbon.json')), old: {} };
  for (const l of LOCALES) {
    d.copy[l] = readJson(path.join(DATA, `copy.${l}.json`));
    d.tpl[l] = readJson(path.join(DATA, `templates.${l}.json`));
    d.ui[l] = readJson(path.join(DATA, `ui.${l}.json`));
    d.hub[l] = readJson(path.join(DATA, `hub.${l}.json`));
    d.old[l] = readJson(path.join(REPO, 'frontend', 'messages', 'maker-content', `${l}.json`));
  }
  return d;
}

const offered = (m, loc) => m.templates.filter((t) => !t.locales || t.locales.includes(loc));
const inLocale = (m, loc) => !m.locales || m.locales.includes(loc);

function checkPairs(d) {
  const f = [];
  let pairs = 0;
  for (const [id, m] of Object.entries(d.catalog)) {
    for (const l of LOCALES) {
      const c = d.copy[l][id];
      if (inLocale(m, l)) { pairs++; if (!c) f.push(`${l} ${id}: no landing`); } else if (c) f.push(`${l} ${id}: a landing for a language the maker does not ship in`);
    }
  }
  if (pairs !== 647) f.push(`expected 647 maker × language pairs, found ${pairs}`);
  return f;
}

function checkMeta(d) {
  const f = [];
  for (const l of LOCALES) {
    const slugs = new Set(), titles = new Set(), metas = new Set();
    for (const [id, c] of Object.entries(d.copy[l])) {
      if (!/^[a-z0-9-]+$/.test(c.slug)) f.push(`${l} ${id}: bad slug ${c.slug}`);
      if (slugs.has(c.slug)) f.push(`${l} ${id}: duplicate slug`); slugs.add(c.slug);
      if (titles.has(c.metaTitle)) f.push(`${l} ${id}: duplicate title`); titles.add(c.metaTitle);
      if (metas.has(c.metaDescription)) f.push(`${l} ${id}: duplicate description`); metas.add(c.metaDescription);
      if (c.metaDescription.length < 105 || c.metaDescription.length > 170) f.push(`${l} ${id}: description ${c.metaDescription.length} chars`);
      if (!c.metaTitle.endsWith('| LessonCraftStudio') || c.metaTitle.length > 90) f.push(`${l} ${id}: title shape`);
    }
  }
  return f;
}

/** a raw token on a page is a visible bug; the strings that legitimately carry {count} and friends are filled by the page */
function checkTokens(d) {
  const f = [];
  for (const l of LOCALES) {
    for (const [id, c] of Object.entries(d.copy[l])) {
      if (/[{}]/.test([c.kw, c.lead, c.moment, ...c.teaches, c.metaTitle, c.metaDescription].join(' '))) f.push(`${l} ${id}: token in copy`);
    }
    for (const [id, e] of Object.entries(d.tpl[l])) for (const [t, pair] of Object.entries(e)) if (/[{}]/.test(pair.join(' '))) f.push(`${l} ${id} ${t}: token in a template string`);
  }
  return f;
}

function checkKeys(d) {
  const f = [];
  const tokens = (s) => (String(s).match(/\{\w+\}/g) || []).sort().join();
  for (const [name, set] of [['ui', d.ui], ['hub', d.hub], ['ribbon', d.ribbon]]) {
    for (const l of LOCALES) {
      for (const k of Object.keys(set.en)) {
        if (!(k in set[l])) { f.push(`${name}.${l}: missing ${k}`); continue; }
        if (tokens(set.en[k]) !== tokens(set[l][k])) f.push(`${name}.${l}.${k}: tokens differ from English`);
      }
    }
  }
  return f;
}

/** the visible words of a page that are its own: the copy and every template's title and instruction */
function pageWords(d, l, id) {
  const c = d.copy[l][id];
  const t = Object.values(d.tpl[l][id] || {}).flat();
  return [c.kw, c.lead, c.moment, ...c.teaches, ...t].join(' ').toLowerCase().match(/[\p{L}\p{N}]+/gu) || [];
}
const grams = (w) => { const g = new Set(); for (let i = 0; i + 3 <= w.length; i++) g.add(`${w[i]} ${w[i + 1]} ${w[i + 2]}`); return g; };
function jaccard(a, b) { let n = 0; for (const x of a) if (b.has(x)) n++; return n / (a.size + b.size - n || 1); }

function checkSimilarity(d) {
  const f = [];
  let worst = 0, warn = 0, pairWorst = '';
  for (const l of LOCALES) {
    const ids = Object.keys(d.copy[l]);
    const g = ids.map((id) => grams(pageWords(d, l, id)));
    for (let i = 0; i < ids.length; i++) for (let j = i + 1; j < ids.length; j++) {
      const s = jaccard(g[i], g[j]);
      if (s > worst) { worst = s; pairWorst = `${l} ${ids[i]}~${ids[j]}`; }
      if (s >= SIM_FAIL) f.push(`${l} ${ids[i]} ~ ${ids[j]}: ${s.toFixed(3)}`); else if (s >= SIM_WARN) warn++;
    }
  }
  checkSimilarity.note = `worst pair ${pairWorst} ${worst.toFixed(3)}, ${warn} over ${SIM_WARN}`;
  return f;
}

function checkImages(d) {
  if (!fs.existsSync(PREVIEWS)) { checkImages.note = 'skipped: no out/maker-previews on this machine'; return []; }
  const f = [];
  let n = 0;
  for (const [id, m] of Object.entries(d.catalog)) for (const l of LOCALES) {
    if (!inLocale(m, l)) continue;
    const want = ['og.jpg', 'app.webp', 'ribbon.webp', ...offered(m, l).map((t) => `${t.id}.webp`)];
    for (const w of want) { n++; if (!fs.existsSync(path.join(PREVIEWS, id, l, w))) f.push(`${l} ${id}: no ${w}`); }
  }
  checkImages.note = `${n} images`;
  return f;
}

const sha = (v) => crypto.createHash('sha1').update(JSON.stringify(v)).digest('hex').slice(0, 16);
function oldHashes(d) {
  const out = {};
  for (const l of LOCALES) for (const [k, e] of Object.entries(d.old[l])) {
    if (k === 'labels' || !e || !e.slug) continue;
    out[`${l}/${k}`] = sha(OLD_FIELDS.map((x) => e[x] ?? null));
  }
  return out;
}
function checkOldWords(d) {
  if (!fs.existsSync(FREEZE)) return ['no old-landings.seo-freeze.json: run --freeze once'];
  const want = readJson(FREEZE), got = oldHashes(d), f = [];
  for (const k of Object.keys(want)) { if (got[k] !== want[k]) f.push(`old landing changed: ${k}`); }
  checkOldWords.note = `${Object.keys(want).length} old landings`;
  return f;
}
/** the page must still print the words the freeze protects */
function checkOldRender() {
  const src = fs.readFileSync(path.join(REPO, 'frontend', 'components', 'makers', 'MakerLanding.tsx'), 'utf8');
  const f = [];
  for (const needle of ['content.name', 'content.tagline', 'content.about', 'content.howToUse', 'content.classroomIdeas', 'jsonLdFor(']) if (!src.includes(needle)) f.push(`MakerLanding.tsx no longer renders ${needle}`);
  if (/worksheet-generators\//.test(src) || src.includes('makerGeneratorUrl')) f.push('MakerLanding.tsx still reaches an old generator');
  return f;
}

const CHECKS = { pairs: checkPairs, meta: checkMeta, tokens: checkTokens, keys: checkKeys, similarity: checkSimilarity, images: checkImages, oldWords: checkOldWords };

function poison() {
  const clone = () => JSON.parse(JSON.stringify(loadAll()));
  const first = (o) => Object.keys(o)[0];
  const cases = [
    ['pairs', (d) => { delete d.copy.de[first(d.copy.de)]; }],
    ['pairs', (d) => { d.copy.sv.cursive = d.copy.da.cursive; }],
    ['meta', (d) => { const k = Object.keys(d.copy.en); d.copy.en[k[1]].slug = d.copy.en[k[0]].slug; }],
    ['meta', (d) => { d.copy.fr[first(d.copy.fr)].metaDescription = 'too short'; }],
    ['tokens', (d) => { d.copy.fi[first(d.copy.fi)].lead += ' {UNIT}'; }],
    ['tokens', (d) => { const m = first(d.tpl.en); d.tpl.en[m][first(d.tpl.en[m])][0] = 'Draw {L}'; }],
    ['keys', (d) => { delete d.ui.it.freeLine; }],
    ['keys', (d) => { d.hub.nl.line = 'geen tokens'; }],
    ['similarity', (d) => { const k = Object.keys(d.copy.en); d.copy.en[k[1]] = { ...d.copy.en[k[0]], slug: 'x', metaTitle: 'y', metaDescription: 'z' }; d.tpl.en[k[1]] = d.tpl.en[k[0]]; }],
    ['oldWords', (d) => { d.old.de.wordsearch.metaTitle += ' x'; }],
  ];
  let missed = 0;
  for (const [name, breakIt] of cases) {
    const d = clone();
    breakIt(d);
    const f = CHECKS[name](d);
    if (!f.length) { missed++; console.log(`POISON NOT CAUGHT: ${name}: ${breakIt}`); }
  }
  console.log(`poison: ${cases.length - missed} of ${cases.length} caught`);
  return missed;
}

/** the promises only a rendered page can show: what is wrong with this page's html */
function auditHtml(html, l, id, d) {
  const f = [];
  const c = d.copy[l][id];
  const bad = (m) => f.push(`${l} ${id}: ${m}`);
  const launches = [...html.matchAll(/href="\/makers\/app\/\?([^"]+)"/g)].map((x) => new URLSearchParams(x[1].replace(/&amp;/g, '&')));
  if (!launches.length) bad('no launch link');
  const ok = new Set(offered(d.catalog[id], l).map((t) => t.id));
  for (const q of launches) {
    if (q.get('lang') !== l) bad(`launch link in language ${q.get('lang')}`);
    if (q.get('maker') !== id) bad(`launch link to maker ${q.get('maker')}`);
    if (q.get('t') && !ok.has(q.get('t'))) bad(`template ${q.get('t')} not offered in ${l}`);
  }
  const tiles = launches.filter((q) => q.get('t')).length;
  if (tiles !== ok.size) bad(`${tiles} template links for ${ok.size} templates`);
  if (!html.includes(`href="/${l}/worksheet-makers"`)) bad('no link to the hub');
  if (!new RegExp(`<link rel="canonical" href="[^"]*/${l}/worksheet-makers/${c.slug}"`).test(html)) bad('canonical');
  if (!html.includes(`/maker-previews/${id}/${l}/og.jpg`)) bad('no share image');
  if (!/max-image-preview:large/.test(html)) bad('no large image preview');
  if (/worksheet-generators\//.test(html)) bad('links an old generator');
  const body = html.slice(html.indexOf('<main'), html.indexOf('</main>'));
  if (/\{[A-Za-z]+\}/.test(body.replace(/<script[\s\S]*?<\/script>/g, ''))) bad('raw token on the page');
  return f;
}

async function checkRendered(base, d) {
  const only = arg('locales') ? arg('locales').split(',') : LOCALES;
  const limit = Number(arg('limit') || 0);
  const headers = { 'user-agent': 'lcs-landings-gate' };
  const f = [];
  let pages = 0;
  for (const l of only) {
    let ids = Object.keys(d.copy[l]);
    if (limit) ids = ids.slice(0, limit);
    for (const id of ids) {
      const url = `${base}/${l}/worksheet-makers/${d.copy[l][id].slug}`;
      const res = await fetch(url, { headers });
      pages++;
      if (res.status !== 200) { f.push(`${url}: HTTP ${res.status}`); continue; }
      f.push(...auditHtml(await res.text(), l, id, d));
    }
  }
  console.log(`rendered: ${pages} pages, ${f.length} findings`);
  return f;
}

/** every rendered assertion must fail on a broken copy of a real page */
async function poisonRendered(base, d) {
  const l = 'de', id = 'counting', c = d.copy[l][id];
  const html = await (await fetch(`${base}/${l}/worksheet-makers/${c.slug}`, { headers: { 'user-agent': 'lcs-landings-gate' } })).text();
  const clean = auditHtml(html, l, id, d);
  if (clean.length) { console.log(`the page itself fails: ${clean.slice(0, 3).join(' | ')}`); return 1; }
  const t = offered(d.catalog[id], l)[0].id;
  const mutations = {
    'a launch link in another language': (h) => h.replace('lang=de', 'lang=en'),
    'a launch link to another maker': (h) => h.replace('maker=counting', 'maker=money'),
    'a template not offered': (h) => h.replace(`t=${t}`, 't=K-999'),
    'a template card missing': (h) => h.replace(/href="\/makers\/app\/\?[^"]*t=[^"]*"/, 'href="/x"'),
    'no launch link at all': (h) => h.replace(/\/makers\/app\//g, '/x/'),
    'no hub link': (h) => h.split(`href="/${l}/worksheet-makers"`).join('href="/x"'),
    'wrong canonical': (h) => h.replace(/(<link rel="canonical" href=")[^"]*/, '$1https://x/y'),
    'no share image': (h) => h.split(`/maker-previews/${id}/${l}/og.jpg`).join('/x.jpg'),
    'no large preview': (h) => h.split('max-image-preview:large').join('max-image-preview:none'),
    'an old generator link': (h) => h.replace('</main>', '<a href="/worksheet-generators/addition.html">x</a></main>'),
    'a raw token': (h) => h.replace('</main>', '<p>{UNIT}</p></main>'),
  };
  let missed = 0;
  for (const [name, m] of Object.entries(mutations)) {
    const after = m(html);
    if (after === html) { missed++; console.log(`POISON DID NOT APPLY: ${name}`); continue; }
    if (!auditHtml(after, l, id, d).length) { missed++; console.log(`POISON NOT CAUGHT: ${name}`); }
  }
  console.log(`rendered poison: ${Object.keys(mutations).length - missed} of ${Object.keys(mutations).length} caught`);
  return missed;
}

(async () => {
  if (has('freeze')) {
    fs.writeFileSync(FREEZE, JSON.stringify(oldHashes(loadAll()), null, 1));
    console.log('wrote ' + path.relative(REPO, FREEZE));
    return 0;
  }
  if (has('poison') && !arg('url')) return poison() ? 1 : 0;
  const d = loadAll();
  if (has('poison')) return (await poisonRendered(arg('url').replace(/\/$/, ''), d)) ? 1 : 0;
  if (arg('url')) {
    const f = await checkRendered(arg('url').replace(/\/$/, ''), d);
    f.slice(0, 40).forEach((x) => console.log('FAIL ' + x));
    return f.length ? 1 : 0;
  }
  let bad = 0;
  for (const [name, fn] of Object.entries(CHECKS)) {
    const f = fn(d);
    bad += f.length;
    console.log(`${f.length ? 'FAIL' : 'pass'} ${name}${fn.note ? ` (${fn.note})` : ''}${f.length ? `: ${f.length}` : ''}`);
    f.slice(0, 12).forEach((x) => console.log('  ' + x));
  }
  const r = checkOldRender();
  bad += r.length;
  console.log(`${r.length ? 'FAIL' : 'pass'} oldRender`);
  r.forEach((x) => console.log('  ' + x));
  return bad ? 1 : 0;
})().then((c) => process.exit(c)).catch((e) => { console.error(e); process.exit(1); });
