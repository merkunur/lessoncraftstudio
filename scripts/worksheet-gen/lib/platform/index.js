/**
 * Platform layer — Node implementation (worksheet makers, ARCHITECTURE §2.2).
 *
 * The worksheet engine runs in two hosts: Node + Puppeteer (the published catalogue, unchanged) and the teacher's
 * browser (the makers). Every place the engine touched the disk, a hash or a raw script now goes through this one
 * interface; the bundler swaps this file for ./browser.js. In Node every function does exactly what its call site did
 * before, so the catalogue builds byte-identical.
 *
 *   readText(absPath)          file contents (utf8)
 *   readJson(absPath)          JSON.parse(readText)
 *   exists(absPath)            boolean
 *   fileHref(absPath)          a URL the page can load (file:// here, the CDN in the browser)
 *   sha1Bytes(str)             the 20-byte SHA-1 digest as a Uint8Array-like (Buffer here)
 *   vocab()                    REFERENCE TRANSLATIONS/image-vocabulary.js as an object
 *   miniCore(file, win)        runs a `mini tools/<file>` browser script against `win` (it attaches its globals)
 */
'use strict';
const fs = require('fs');
const path = require('path');
const url = require('url');
const crypto = require('crypto');

const REPO = path.resolve(__dirname, '..', '..', '..', '..');

module.exports = {
  kind: 'node',
  REPO,
  readText: (p) => fs.readFileSync(p, 'utf8'),
  readJson: (p) => JSON.parse(fs.readFileSync(p, 'utf8')),
  exists: (p) => fs.existsSync(p),
  fileHref: (p) => url.pathToFileURL(p).href,
  sha1Bytes: (s) => crypto.createHash('sha1').update(s).digest(),
  vocab: () => require('../../../publish-cli/deck-rich-alt.js').loadVocab(),
  slugify: (v) => require('../../../publish-cli/slug.js').slugify(v),
  miniCore(file, win) {
    const src = fs.readFileSync(path.join(REPO, 'mini tools', file), 'utf8');
    new Function('window', src)(win);
    return win;
  },
};
