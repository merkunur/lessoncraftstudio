/**
 * Which maker version a saved recipe (or a student link) loads — ARCHITECTURE §5.3, OPEN-DECISIONS #5 (ruled 5a):
 * a CONTENT fix on one of the recipe's templates re-routes it to the current (fixed) version, with a one-line banner
 * built from `fixes`; layout polish and new templates leave it on its pinned version. Pure; no I/O. Imported by the
 * browser shell and by scripts/makers/tests/resolve-version.test.js.
 *
 *   recipe     { maker, makerVersion, dataVersion, pages: [{ template }, …] }   (makerVersion/dataVersion are hashes)
 *   versions   the maker's entry in out/makers/versions.json: { current, currentData, history: [{ n, hash, data, at }] }
 *   migrations the maker's array from docs/makers/migrations/<maker>.json (may be empty / missing)
 *   current    the maker's current hash
 *
 * returns { makerVersion, dataVersion, rerouted, fixes: [{ date, note, templates }] }
 */

// last history index whose hash matches (and whose data matches, when data is given)
function indexOf(history, hash, data) {
  for (let i = history.length - 1; i >= 0; i--) if (history[i].hash === hash && (data == null || history[i].data === data)) return i;
  return -1;
}

export function resolveVersion({ recipe, versions, migrations, current }) {
  const history = (versions && versions.history) || [];
  // the current version's data: the ledger's currentData when it describes this hash, else its last entry for the hash
  const ledgerData = versions && versions.current === current ? versions.currentData : null;
  const curIdx = indexOf(history, current, ledgerData);
  const currentData = curIdx >= 0 ? history[curIdx].data : ledgerData;
  const toCurrent = (fixes) => ({ makerVersion: current, dataVersion: currentData, rerouted: true, fixes });

  // A version that was never recorded cannot be trusted to exist on disk (old folders are kept only because the
  // ledger names them), so an unknown pin loads the current version rather than risk a missing bundle.
  const pinIdx = indexOf(history, recipe && recipe.makerVersion, recipe && recipe.dataVersion);
  if (pinIdx < 0) return toCurrent([]);

  const used = new Set(((recipe && recipe.pages) || []).map((p) => p && p.template).filter(Boolean));
  const fixes = [];
  for (const m of migrations || []) {
    if (!m || m.kind !== 'content-fix') continue; // polish never re-routes
    // the FIRST version carrying the fix (record-fix.js writes atData; without it, the first entry with that hash)
    const at = m.atData != null ? indexOf(history, m.at, m.atData) : history.findIndex((h) => h.hash === m.at);
    if (at < 0) continue; // a fix at a version the ledger does not know is ignored
    if (at <= pinIdx) continue; // the recipe was saved on (or after) the fixed version already
    if (!(m.templates || []).some((t) => used.has(t))) continue;
    fixes.push({ date: m.date, note: m.note, templates: m.templates.slice() });
  }
  if (!fixes.length) return { makerVersion: recipe.makerVersion, dataVersion: recipe.dataVersion, rerouted: false, fixes: [] };
  fixes.sort((a, b) => String(a.date || '').localeCompare(String(b.date || '')));
  return toCurrent(fixes);
}
