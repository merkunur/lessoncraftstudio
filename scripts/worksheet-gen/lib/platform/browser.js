/**
 * Platform layer — browser implementation (worksheet makers, ARCHITECTURE §2.2). The bundler aliases
 * lib/platform/index.js to this file.
 *
 * Paths: the bundler gives every module a `__dirname` of '/' + its repo-relative directory, and `path` is a posix
 * shim, so `path.join(__dirname, …)` yields '/scripts/worksheet-gen/…'. Files are looked up in a PRELOAD map keyed
 * by that repo-relative path (no leading slash). The maker shell fills the map before it calls build():
 * a file that was not preloaded THROWS — a page is never built from a guessed or missing file.
 */
'use strict';
const { sha1Bytes } = require('./sha1.js');
const MINI_CORES = require('lcs-mini-cores');   // virtual module: { 'file.js': function (window) { …source… } }

const PRELOAD = Object.create(null);
let ASSET_BASE = '/makers-assets';

const key = (p) => String(p).replace(/\\/g, '/').replace(/^\/+/, '');

class PlatformMissing extends Error {
  constructor(p) { super('platform: file not preloaded: ' + key(p)); this.name = 'PlatformMissing'; this.path = key(p); }
}

function readText(p) {
  const k = key(p);
  if (!(k in PRELOAD)) throw new PlatformMissing(p);
  const v = PRELOAD[k];
  return typeof v === 'string' ? v : JSON.stringify(v);
}

module.exports = {
  kind: 'browser',
  REPO: '',
  PlatformMissing,
  /** The shell's loader: files = { 'repo/relative/path': string | parsed JSON }. */
  preload(files) { for (const [k, v] of Object.entries(files)) PRELOAD[key(k)] = v; },
  setAssetBase(base) { ASSET_BASE = String(base).replace(/\/+$/, ''); },
  readText,
  readJson(p) { const k = key(p); if (!(k in PRELOAD)) throw new PlatformMissing(p); const v = PRELOAD[k]; return typeof v === 'string' ? JSON.parse(v) : v; },
  // Picture files are not data: every derived 512 px picture is published, so the image cache "exists" for them.
  exists(p) { const k = key(p); return k in PRELOAD || /^scripts\/worksheet-gen\/cache\/themes-512\//.test(k); },
  fileHref(p) {
    const k = key(p);
    const m = k.match(/^scripts\/worksheet-gen\/cache\/(themes-512|themes)\/(.+)$/);
    if (m) return ASSET_BASE + '/themes-512/' + m[2].split('/').map(encodeURIComponent).join('/');
    const f = k.match(/^scripts\/worksheet-gen\/assets\/fonts\/(.+)$/);
    if (f) return ASSET_BASE + '/fonts/' + f[1];
    throw new Error('platform: no browser URL for ' + k);
  },
  sha1Bytes,
  vocab() { return module.exports.readJson('REFERENCE TRANSLATIONS/image-vocabulary.json'); },
  // deck ids and slugs are made on the server, never in a maker
  slugify() { throw new Error('platform: slugify is not available in a maker'); },
  miniCore(file, win) {
    const fn = MINI_CORES[file];
    if (!fn) throw new Error('platform: mini core not bundled: ' + file);
    fn(win);
    return win;
  },
};
