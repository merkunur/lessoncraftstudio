#!/usr/bin/env node
/** tools/cbn-pilot-sheet.js <render-dir> <out-dir> — one review image per Color by Number deck: print page · coloured key · screen */
'use strict';
const fs = require('fs'), path = require('path'), puppeteer = require('puppeteer'), { pathToFileURL } = require('url');
const [dir, out] = process.argv.slice(2);
(async () => {
  fs.mkdirSync(out, { recursive: true });
  const b = await puppeteer.launch(); const p = await b.newPage();
  const ids = fs.readdirSync(dir).filter((f) => /\.key\.html$/.test(f)).map((f) => f.replace('.key.html', ''));
  for (const id of ids) {
    await p.setViewport({ width: 816, height: 1056 });
    await p.goto(pathToFileURL(path.join(dir, id + '.key.html')).href, { waitUntil: 'networkidle0' });
    await p.evaluate(() => document.fonts.ready);
    const key = path.join(out, id + '.keyshot.png'); await p.screenshot({ path: key, fullPage: true });
    const img = (f) => 'data:image/png;base64,' + fs.readFileSync(f).toString('base64');
    await p.setViewport({ width: 1500, height: 700 });
    await p.setContent(`<body style="margin:0;background:#ddd;display:flex;gap:10px;padding:10px">${[path.join(dir, id + '.png'), key, path.join(dir, id + '.screen.png')].map((f) => `<img src="${img(f)}" style="width:480px;border:1px solid #999;background:#fff;align-self:flex-start">`).join('')}</body>`, { waitUntil: 'load' });
    await p.screenshot({ path: path.join(out, id.replace(/^wsg-wcbnen-/, '') + '.sheet.png'), fullPage: true });
    fs.unlinkSync(key);
  }
  await b.close(); console.log(ids.length + ' sheets → ' + out);
})();
