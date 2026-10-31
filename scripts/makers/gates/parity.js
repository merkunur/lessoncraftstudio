#!/usr/bin/env node
/**
 * Gate: a page built in the BROWSER from a maker bundle is byte-identical to the page Node builds (ARCHITECTURE §2.1,
 * §16). Only the asset addresses may differ (file:// in Node, the CDN path in the browser); they are normalised to
 * one token on both sides before comparing.
 *
 *   node scripts/makers/gates/parity.js [--makers=ten-frames,counting,sight-words] [--out=out/makers] [--per=6]
 *   node scripts/makers/gates/parity.js --poison     (must FAIL: one browser page is altered before comparing)
 *
 * Per maker: every template × every offered locale × levels × 1-2 themes/units × 2 copies, capped at --per cases per
 * template (spread over locales). Exit 1 on any difference or any page that builds in one host and not the other.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const http = require('http');
const puppeteer = require('puppeteer');

const REPO = path.resolve(__dirname, '..', '..', '..');
const args = Object.fromEntries(process.argv.slice(2).map((a) => { const m = a.match(/^--([^=]+)=(.*)$/); return m ? [m[1], m[2]] : [a.replace(/^--/, ''), true]; }));
const OUT = path.resolve(REPO, args.out || 'out/makers');
const PER = Number(args.per || 6);
const makers = String(args.makers || 'ten-frames,counting,sight-words').split(',');

const norm = (h) => h
  .replace(/file:\/\/\/[^'")\s]*?\/cache\/themes(?:-512)?\/([^'")\s]+)/g, (m, p) => 'ASSET:themes/' + decodeURIComponent(p))
  .replace(/\/makers-assets\/themes-512\/([^'")\s]+)/g, (m, p) => 'ASSET:themes/' + decodeURIComponent(p))
  .replace(/file:\/\/\/[^'")\s]*?\/assets\/fonts\/([^'")\s]+)/g, 'ASSET:fonts/$1')
  .replace(/\/makers-assets\/fonts\/([^'")\s]+)/g, 'ASSET:fonts/$1');

function serve() {
  const types = { '.js': 'text/javascript', '.json': 'application/json', '.html': 'text/html', '.map': 'application/json' };
  const server = http.createServer((req, res) => {
    const u = decodeURIComponent(req.url.split('?')[0]);
    if (u === '/') { res.writeHead(200, { 'content-type': 'text/html' }); return res.end('<!doctype html><title>parity</title>'); }
    const f = path.join(OUT, u.replace(/^\/makers\//, ''));
    if (!f.startsWith(OUT) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); return res.end(); }
    res.writeHead(200, { 'content-type': types[path.extname(f)] || 'application/octet-stream' });
    fs.createReadStream(f).pipe(res);
  });
  return new Promise((r) => server.listen(0, () => r(server)));
}

async function main() {
  const { makePage } = require('../runtime.js');
  const server = await serve();
  const port = server.address().port;
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.on('pageerror', (e) => console.log('pageerror', e.message));
  await page.goto(`http://localhost:${port}/`);
  const dv = fs.readFileSync(path.join(OUT, 'data', 'current.txt'), 'utf8').trim();
  let cases = 0; const fails = [];
  for (const id of makers) {
    const ver = fs.readFileSync(path.join(OUT, id, 'current.txt'), 'utf8').trim();
    const tj = JSON.parse(fs.readFileSync(path.join(OUT, id, ver, 'templates.json'), 'utf8'));
    const dm = JSON.parse(fs.readFileSync(path.join(OUT, id, ver, 'data-manifest.json'), 'utf8'));
    for (const t of tj.templates) {
      const spec = require(path.join(REPO, t.file));
      const units = spec.unitAxis && spec.unitAxis.applicable ? null : [null];
      const list = [];
      t.locales.forEach((loc, i) => {
        const us = units || (spec.unitAxis.units(loc) || []).slice(0, 2);
        const d = t.levels[i % t.levels.length];
        const theme = t.themed ? t.themes[i % t.themes.length] : null;
        list.push({ loc, d, theme, unit: us[i % us.length] || null, variant: 1 + (i % 2) });
      });
      const chosen = list.filter((_, i) => i % Math.max(1, Math.floor(list.length / PER)) === 0).slice(0, PER);
      for (const c of chosen) {
        const strings = JSON.parse(fs.readFileSync(path.join(OUT, id, ver, 'strings.' + c.loc + '.json'), 'utf8'))[t.id];
        let node; let nodeErr = null;
        try { node = makePage({ type: spec, strings, locale: c.loc, difficulty: c.d, theme: c.theme, unit: c.unit, variant: c.variant, answerKey: true, answerKeySuffix: tj.answerKey[c.loc] }); } catch (e) { nodeErr = e.message; }
        const files = dm.files;
        const br = await page.evaluate(async (o) => {
          try {
            const mod = await import(`/makers/${o.maker}/${o.ver}/index.js`);
            const data = {};
            for (const f of o.files) {
              const r = await fetch(`/makers/data/${o.dv}/${f.split('/').map(encodeURIComponent).join('/')}`);
              if (!r.ok) throw new Error('data ' + r.status + ' ' + f);
              data[f] = await r.text();
            }
            mod.platform.preload(data);
            const type = await mod.templates[o.id]();
            const spec = type.default || type;
            const r = mod.makePage({ type: spec, strings: o.strings, locale: o.loc, difficulty: o.d, theme: o.theme, unit: o.unit, variant: o.variant, answerKey: true, answerKeySuffix: o.suffix });
            return { html: r.html, keyHtml: r.keyHtml };
          } catch (e) { return { err: String(e && e.stack || e).slice(0, 400) }; }
        }, { maker: id, ver, dv, files, id: t.id, strings, loc: c.loc, d: c.d, theme: c.theme, unit: c.unit, variant: c.variant, suffix: tj.answerKey[c.loc] });
        cases++;
        const tag = `${id} ${t.id} ${c.loc} L${c.d} ${c.theme || '-'} ${c.unit || '-'} v${c.variant}`;
        if (nodeErr || br.err) { fails.push(tag + ': ' + (nodeErr ? 'node: ' + nodeErr : 'browser: ' + br.err)); continue; }
        if (args.poison && cases === 1) br.html = br.html.replace('</body>', '<!--x--></body>');
        const a = norm(node.html), b = norm(br.html);
        const ka = node.keyHtml ? norm(node.keyHtml) : null, kb = br.keyHtml ? norm(br.keyHtml) : null;
        if (a !== b) { let i = 0; while (a[i] === b[i]) i++; fails.push(tag + ': page differs at ' + i + ': node «' + a.slice(i, i + 80) + '» browser «' + b.slice(i, i + 80) + '»'); }
        else if (ka !== kb) fails.push(tag + ': answer key differs');
      }
    }
  }
  await browser.close(); server.close();
  console.log(`parity: ${cases} cases, ${fails.length} failing`);
  fails.slice(0, 15).forEach((f) => console.log('  FAIL ' + f));
  if (args.poison) { console.log(fails.length ? 'poison: caught (good)' : 'poison: NOT caught (gate is blind)'); process.exit(fails.length ? 0 : 1); }
  process.exit(fails.length ? 1 : 0);
}
main().catch((e) => { console.error(e); process.exit(1); });
