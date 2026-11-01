/**
 * Which maker a template belongs to, and which INDEXABLE page a maker's student links point back to — the two lookups
 * the student play page and the share sheet need (INTERACTIVE-AND-SHARING §C.3–C.5, ARCHITECTURE §13). Node only
 * (reads scripts/makers/topic-map.js, docs/makers/inventory/types.json and frontend/messages/maker-content/<loc>.json);
 * the browser gets the result as /makers/play/landings.json (scripts/makers/build-play.js, scripts/makers/serve.js).
 *
 *   makerOf(templateId)         → the maker id (topic-map families + extraIds, hideIds honoured) or null
 *   landingFor(maker, locale)   → { url, name } — the landing of the first old app the maker absorbs, in that locale
 *                                 (ARCHITECTURE §13: the old landings keep their SEO; a maker with no old app has no
 *                                 landing yet → the locale's makers hub /<loc>/tools, named after the maker)
 *   makerName(maker, locale)    → the maker's name (frontend/messages/makers/<loc>.json `makers`)
 *   landings()                  → { [maker]: { [locale]: { url, name } } } for every maker ×11 (the browser file)
 */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.resolve(__dirname, '..', '..', '..');
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

let _makers = null, _rows = null;
function makers() { if (!_makers) _makers = require(path.join(REPO, 'scripts', 'makers', 'topic-map.js')).MAKERS; return _makers; }
function rows() { if (!_rows) _rows = JSON.parse(fs.readFileSync(path.join(REPO, 'docs', 'makers', 'inventory', 'types.json'), 'utf8')).rows; return _rows; }
const _json = {};
function readJson(file) { if (!(file in _json)) { try { _json[file] = JSON.parse(fs.readFileSync(file, 'utf8')); } catch (e) { _json[file] = null; } } return _json[file]; }

function makerOf(templateId) {
  const row = rows().find((r) => r.id === templateId);
  if (!row) return null;
  const m = makers().find((x) => !(x.hideIds || []).includes(row.id) && (x.families.includes(row.family) || (x.extraIds || []).includes(row.id)));
  return m ? m.id : null;
}

function makerName(maker, locale) {
  const ui = readJson(path.join(REPO, 'frontend', 'messages', 'makers', locale + '.json')) || readJson(path.join(REPO, 'frontend', 'messages', 'makers', 'en.json')) || {};
  const m = makers().find((x) => x.id === maker);
  return (ui.makers && ui.makers[maker]) || (m && m.name) || maker;
}

function landingFor(maker, locale) {
  const m = makers().find((x) => x.id === maker);
  if (!m) return null;
  const mc = readJson(path.join(REPO, 'frontend', 'messages', 'maker-content', locale + '.json'));
  for (const app of m.oldApps || []) {
    const e = mc && mc[app];
    if (e && typeof e.slug === 'string' && /^[a-z0-9-]+$/.test(e.slug)) return { url: '/' + locale + '/tools/' + e.slug, name: e.name || makerName(maker, locale) };
  }
  return { url: '/' + locale + '/tools', name: makerName(maker, locale) };
}

function landings() {
  const out = {};
  for (const m of makers()) { out[m.id] = {}; for (const loc of LOCALES) out[m.id][loc] = landingFor(m.id, loc); }
  return out;
}

module.exports = { makerOf, makerName, landingFor, landings, LOCALES };
