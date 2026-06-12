/**
 * Dev driver: render a single worksheet instance.
 *   node scripts/worksheet-gen/render/one.js K-002 animals 2 en
 */
'use strict';
const path = require('path');
const fs = require('fs');
const puppeteer = require('puppeteer');
const { renderInstance } = require('./render-instance.js');

const TYPE_DIRS = ['k', 'g1', 'g2', 'g3'];

function loadType(typeId) {
  for (const d of TYPE_DIRS) {
    const dir = path.join(__dirname, '..', 'types', d);
    if (!fs.existsSync(dir)) continue;
    for (const f of fs.readdirSync(dir)) {
      if (f.startsWith(typeId + '-') || f === typeId + '.js') {
        return require(path.join(dir, f));
      }
    }
  }
  throw new Error('type not found: ' + typeId);
}

(async () => {
  const [typeId, theme, difficulty, locale] = process.argv.slice(2);
  const type = loadType(typeId);
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  try {
    const out = await renderInstance({
      type, theme, difficulty: Number(difficulty) || 2, locale: locale || 'en',
      page,
      outDir: path.join(__dirname, '..', 'out', 'dev'),
      baseName: `${typeId}-${theme}-d${difficulty || 2}-${locale || 'en'}`,
    });
    console.log('PDF:', out.pdfPath);
    console.log('PNG:', out.pngPath);
    console.log('QA lints:', out.qa.lints.length ? out.qa.lints : 'clean');
    console.log('QA verify:', out.qa.verify.length ? out.qa.verify : 'clean');
    process.exitCode = (out.qa.lints.length || out.qa.verify.length) ? 1 : 0;
  } finally {
    await browser.close();
  }
})();
