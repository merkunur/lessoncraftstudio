/**
 * emit/zip.js — pack one printable deck bundle:
 *   manifest.json + deck.html + printable.pdf + thumbnail.png  (NO answer-key)
 * → out/staging/<waveId>/<deckId>.zip
 *
 * bulk.js accepts any *.zip; the slug derives from the manifest, never the
 * filename — the deterministic deckId filename is for idempotent resume.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const AdmZip = require('adm-zip');

function writeDeckZip(o) {
  const { stagingDir, deckId, manifest, deckHtml, pdfPath, thumbnailBuf } = o;
  fs.mkdirSync(stagingDir, { recursive: true });
  const zip = new AdmZip();
  zip.addFile('manifest.json', Buffer.from(JSON.stringify(manifest, null, 2), 'utf8'));
  zip.addFile('deck.html', Buffer.from(deckHtml, 'utf8'));
  zip.addFile('printable.pdf', fs.readFileSync(pdfPath));
  zip.addFile('thumbnail.png', thumbnailBuf);
  const zipPath = path.join(stagingDir, deckId + '.zip');
  zip.writeZip(zipPath);
  return zipPath;
}

module.exports = { writeDeckZip };
