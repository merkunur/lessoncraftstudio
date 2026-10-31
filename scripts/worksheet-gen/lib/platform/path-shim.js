/**
 * Minimal posix `path` for the browser bundle (worksheet makers). Only what the engine calls: join, resolve,
 * dirname, basename, extname, relative, sep. Paths in the browser are repo-relative with a leading '/'.
 */
'use strict';

function normalize(p) {
  const abs = p.startsWith('/');
  const out = [];
  for (const part of p.split('/')) {
    if (!part || part === '.') continue;
    if (part === '..') { if (out.length && out[out.length - 1] !== '..') out.pop(); else if (!abs) out.push('..'); } else out.push(part);
  }
  return (abs ? '/' : '') + out.join('/') || (abs ? '/' : '.');
}
const join = (...a) => normalize(a.filter((x) => x !== '').join('/').replace(/\\/g, '/'));
const resolve = (...a) => { let p = ''; for (const s of a) p = s.startsWith('/') ? s : p + '/' + s; return normalize(p.startsWith('/') ? p : '/' + p); };
const dirname = (p) => { const n = normalize(p); const i = n.lastIndexOf('/'); return i <= 0 ? (n.startsWith('/') ? '/' : '.') : n.slice(0, i); };
const basename = (p, ext) => { const b = normalize(p).split('/').pop(); return ext && b.endsWith(ext) ? b.slice(0, -ext.length) : b; };
const extname = (p) => { const b = basename(p); const i = b.lastIndexOf('.'); return i > 0 ? b.slice(i) : ''; };
const relative = (from, to) => {
  const f = normalize(from).split('/').filter(Boolean), t = normalize(to).split('/').filter(Boolean);
  let i = 0; while (i < f.length && i < t.length && f[i] === t[i]) i++;
  return [...Array(f.length - i).fill('..'), ...t.slice(i)].join('/');
};
module.exports = { join, resolve, dirname, basename, extname, relative, normalize, sep: '/', posix: null };
module.exports.posix = module.exports;
