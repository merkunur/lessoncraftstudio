/**
 * Shared type-spec loader (extracted from render/batch.js + render/one.js).
 * One spec per file under types/{k,g1,g2,g3}/<TYPE-ID>-<slug>.js.
 */
'use strict';
const fs = require('fs');
const path = require('path');

const TYPE_DIRS = ['k', 'g1', 'g2', 'g3'];
const _typeCache = new Map();
// WSG_SKIP_TYPES=G3-510,K-654: type files another session is still writing (a half-written module can throw at load and
// stop every generation). Only for a local run next to work in progress; a wave that names a skipped type fails as 'not found'.
const SKIP = new Set(String(process.env.WSG_SKIP_TYPES || '').split(',').map((x) => x.trim()).filter(Boolean));
const idOfFile = (f) => (/^((?:K|G[123])-\d{3})/.exec(f) || [])[1];

function loadType(typeId) {
  if (_typeCache.has(typeId)) return _typeCache.get(typeId);
  for (const d of TYPE_DIRS) {
    const dir = path.join(__dirname, '..', 'types', d);
    if (!fs.existsSync(dir)) continue;
    for (const f of fs.readdirSync(dir)) {
      if (f.startsWith(typeId + '-') || f === typeId + '.js') {
        const t = require(path.join(dir, f));
        _typeCache.set(typeId, t);
        return t;
      }
    }
  }
  throw new Error('type not found: ' + typeId);
}

/** All 200 specs in deterministic (dir, filename) order. */
function loadAllTypes() {
  const out = [];
  for (const d of TYPE_DIRS) {
    const dir = path.join(__dirname, '..', 'types', d);
    if (!fs.existsSync(dir)) continue;
    for (const f of fs.readdirSync(dir).sort()) {
      if (SKIP.size && SKIP.has(idOfFile(f))) continue;
      const spec = require(path.join(dir, f));
      out.push(spec);
      if (spec.id) _typeCache.set(spec.id, spec);
    }
  }
  return out;
}

module.exports = { loadType, loadAllTypes, TYPE_DIRS };
