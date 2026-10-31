/**
 * The makers' version ledger, out/makers/versions.json (ARCHITECTURE §5.2, as built):
 *
 *   { "<maker>": { "current": "<maker hash>", "currentData": "<data hash>",
 *                  "history": [ { "n": 1, "hash": "<maker hash>", "data": "<data hash>", "at": "<ISO>" }, … ] } }
 *
 * A saved recipe pins `makerVersion` = a maker hash and `dataVersion` = a data hash. `n` is for display only.
 *
 * A history entry is the PAIR (maker hash, data hash): a bank or string fix changes only the data snapshot while the
 * bundle stays byte-identical, and that fix must still be a new, ordered version — otherwise a content fix that lives
 * in data could never be recorded after the version it fixes. Rebuilding identical content adds nothing.
 * Entries are never removed or rewritten; only appended.
 */
'use strict';

/** Pure: returns a NEW ledger with (hash, dataHash) appended for `maker` unless that pair is already there. */
function appendHistory(versions, maker, hash, dataHash, now) {
  const out = JSON.parse(JSON.stringify(versions || {}));
  const m = out[maker] || (out[maker] = { current: null, currentData: null, history: [] });
  if (!m.history.some((h) => h.hash === hash && h.data === dataHash)) {
    const n = m.history.reduce((max, h) => Math.max(max, h.n || 0), 0) + 1;
    m.history.push({ n, hash, data: dataHash, at: now });
  }
  m.current = hash;
  m.currentData = dataHash;
  return out;
}

/** Index of the history entry for (hash, data); data may be omitted to match the LAST entry with that hash. */
function indexOf(entry, hash, data) {
  const h = (entry && entry.history) || [];
  for (let i = h.length - 1; i >= 0; i--) if (h[i].hash === hash && (data == null || h[i].data === data)) return i;
  return -1;
}

module.exports = { appendHistory, indexOf };
