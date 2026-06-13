/**
 * Shared type-spec loader (extracted from render/batch.js + render/one.js).
 * One spec per file under types/{k,g1,g2,g3}/<TYPE-ID>-<slug>.js.
 */
'use strict';
const fs = require('fs');
const path = require('path');

const TYPE_DIRS = ['k', 'g1', 'g2', 'g3'];
const _typeCache = new Map();

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
      const spec = require(path.join(dir, f));
      out.push(spec);
      if (spec.id) _typeCache.set(spec.id, spec);
    }
  }
  return out;
}

module.exports = { loadType, loadAllTypes, TYPE_DIRS };
