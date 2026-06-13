#!/usr/bin/env node
/**
 * i18n/apply-locale.js — synthesize a locale's ensemble drafts into the final
 * authored artifacts (the non-EN authoring commission's merge step).
 *
 * Usage: node scripts/worksheet-gen/i18n/apply-locale.js <locale>
 *
 * Inputs (ensemble outputs, deleted after a successful apply):
 *   i18n/.draft-<locale>-strings.json  {typeId: {title, instruction, [extras]}}
 *   i18n/.draft-<locale>-seo.json      {taxonomy, topicMeta, skillSentences, seoWords}
 *   i18n/.review-<locale>.json         optional {corrections: {strings, seo}, flags}
 *
 * Outputs:
 *   i18n/strings.<locale>.json                       (title+instruction only)
 *   i18n/skill-sentences.<locale>.json
 *   frontend/config/topics-taxonomy.json             (slug.<loc>+name.<loc> ×22)
 *   frontend/messages/<locale>.json                  (topicMeta ×22 + seo.words ×2)
 *
 * K-016's inline odd/even chip words are NOT applied here (JS source edit) —
 * the script prints them for the manual spec edit; lint-locale.js verifies.
 * Both target JSON files round-trip byte-identically through
 * JSON.stringify(x, null, 2) + '\n' (verified 2026-06-13).
 */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', '..', '..');

function readJson(p) { return JSON.parse(fs.readFileSync(p, 'utf8')); }
function writeJson(p, obj) { fs.writeFileSync(p, JSON.stringify(obj, null, 2) + '\n'); }

function setByPath(obj, dotPath, value) {
  const parts = dotPath.split('.');
  let cur = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    if (!(parts[i] in cur)) throw new Error('correction path not in draft: ' + dotPath);
    cur = cur[parts[i]];
  }
  if (!(parts[parts.length - 1] in cur)) throw new Error('correction path not in draft: ' + dotPath);
  cur[parts[parts.length - 1]] = value;
}

function applyLocale(locale) {
  const draftStringsPath = path.join(__dirname, '.draft-' + locale + '-strings.json');
  const draftSeoPath = path.join(__dirname, '.draft-' + locale + '-seo.json');
  const reviewPath = path.join(__dirname, '.review-' + locale + '.json');

  const strings = readJson(draftStringsPath);
  const seo = readJson(draftSeoPath);
  const review = fs.existsSync(reviewPath) ? readJson(reviewPath) : { corrections: {} };

  // --- apply review corrections ---
  const corrStrings = (review.corrections && review.corrections.strings) || {};
  for (const [id, c] of Object.entries(corrStrings)) {
    if (!strings[id]) throw new Error('review corrects unknown type ' + id);
    if (c.title) strings[id].title = c.title;
    if (c.instruction) strings[id].instruction = c.instruction;
    for (const extra of ['odd', 'even']) if (c[extra]) strings[id][extra] = c[extra];
  }
  const corrSeo = (review.corrections && review.corrections.seo) || {};
  for (const [p, c] of Object.entries(corrSeo)) {
    setByPath(seo, p, c.value !== undefined ? c.value : c);
  }

  // --- validate against EN shapes ---
  const en = readJson(path.join(__dirname, 'strings.en.json'));
  const skillEn = readJson(path.join(__dirname, 'skill-sentences.en.json'));
  const enIds = Object.keys(en);
  const missing = enIds.filter((id) => !strings[id] || !strings[id].title || !strings[id].instruction);
  if (missing.length) throw new Error('draft strings missing/empty: ' + missing.join(', '));
  const fams = Object.keys(skillEn);
  for (const part of ['taxonomy', 'topicMeta', 'skillSentences']) {
    const gone = fams.filter((f) => !seo[part] || !seo[part][f]);
    if (gone.length) throw new Error('draft seo.' + part + ' missing: ' + gone.join(', '));
  }
  for (const w of ['free_printable', 'download_pdf']) {
    if (!seo.seoWords || !seo.seoWords[w]) throw new Error('draft seo.seoWords missing ' + w);
  }

  // --- taxonomy merge (with slug-collision defense) ---
  const taxPath = path.join(ROOT, 'frontend', 'config', 'topics-taxonomy.json');
  const tax = readJson(taxPath);
  const axis = tax.axes['exercise-type'];
  const slugOwner = {};
  for (const [key, entry] of Object.entries(axis)) {
    const s = entry.slug && entry.slug[locale];
    if (s) slugOwner[s] = key;
  }
  for (const fam of fams) {
    if (!axis[fam]) throw new Error('taxonomy missing family key ' + fam);
    const want = seo.taxonomy[fam];
    if (!want.slug || !want.name) throw new Error('seo.taxonomy.' + fam + ' needs {slug, name}');
    if (slugOwner[want.slug] && slugOwner[want.slug] !== fam) {
      throw new Error('slug collision: ' + fam + ' wants "' + want.slug + '" owned by ' + slugOwner[want.slug]);
    }
    slugOwner[want.slug] = fam;
  }
  for (const fam of fams) {
    axis[fam].slug[locale] = seo.taxonomy[fam].slug;
    axis[fam].name[locale] = seo.taxonomy[fam].name;
  }

  // --- messages merge ---
  const msgPath = path.join(ROOT, 'frontend', 'messages', locale + '.json');
  const msg = readJson(msgPath);
  if (!msg.topicMeta) throw new Error(locale + '.json has no topicMeta namespace');
  for (const fam of fams) msg.topicMeta[fam] = seo.topicMeta[fam];
  if (!msg.seo || !msg.seo.words) throw new Error(locale + '.json has no seo.words namespace');
  msg.seo.words.free_printable = seo.seoWords.free_printable;
  msg.seo.words.download_pdf = seo.seoWords.download_pdf;

  // --- write outputs ---
  const finalStrings = {};
  for (const id of enIds) finalStrings[id] = { title: strings[id].title, instruction: strings[id].instruction };
  const finalSkill = {};
  for (const fam of fams) finalSkill[fam] = { full: seo.skillSentences[fam].full, short: seo.skillSentences[fam].short };

  writeJson(path.join(__dirname, 'strings.' + locale + '.json'), finalStrings);
  writeJson(path.join(__dirname, 'skill-sentences.' + locale + '.json'), finalSkill);
  writeJson(taxPath, tax);
  writeJson(msgPath, msg);

  const k016 = strings['K-016'] || {};
  console.log('apply-locale ' + locale + ': wrote strings (' + enIds.length + '), skill-sentences (' + fams.length +
    '), taxonomy slug/name ×' + fams.length + ', topicMeta ×' + fams.length + ', seo.words ×2');
  console.log('K-016 inline spec words (apply manually to types/k/K-016-odd-or-even-pairs.js): odd="' +
    (k016.odd || 'MISSING') + '" even="' + (k016.even || 'MISSING') + '"');
}

if (require.main === module) {
  const locale = process.argv[2];
  if (!locale || locale === 'en') { console.error('usage: node apply-locale.js <non-en locale>'); process.exit(2); }
  applyLocale(locale);
}

module.exports = { applyLocale };
