#!/usr/bin/env node
/**
 * verify-fr-typography.js — the gate of page/shell.js frTypo (nt10-E landing round 1, 2026-09-23: the fr panel
 * found 7 printed titles wrapping so a line STARTED with the colon, and "a-t-" / "elle" broken at the hyphen).
 *
 *   node scripts/worksheet-gen/qa/verify-fr-typography.js
 *
 * NODE — frTypo puts a no-break space (U+00A0) before : ; ? ! and inside « », keeps -t-il / -t-elle / -t-on
 *   together (U+2060 after each hyphen, no element), and touches nothing else; buildPage applies it to the fr title + instruction ONLY (every other
 *   locale's chrome is byte-identical to esc()).
 * RENDER — fr titles / instructions squeezed to wrap at every word in turn (the width swept 180..640 px): no
 *   rendered line of the title or the instruction may START with : ; ? ! or », and no line may end with "a-t-".
 * POISON (both ways) — the unpatched shell (plain esc) must FAIL the render check on the same strings; the
 *   patched shell is the control. Exit 1 on a finding or a silent poison.
 */
'use strict';
const path = require('path');
const shell = require('../page/shell.js');
const { esc } = require('../primitives/_svg.js');

let assertions = 0;
const fails = [];
const ok = (c, m) => { assertions++; if (!c) fails.push(m); return !!c; };

const CASES = [
  'Feux de circulation : colorie les feux',
  'Panneaux routiers : quel panneau convient ?',
  'Le cycle de la plante : de la graine à la plante',
  'Pourquoi y a-t-il le jour et la nuit ?',
  'La plante a-t-elle soif ? Regarde bien !',
  'Écris le mot « maison » ; puis colorie-la !',
];

// NODE
{
  const f = shell.frTypo(esc('a : b ; c ? d ! « e » a-t-il'));
  ok(/a : b ; c \? d ! « e » /.test(f), `frTypo spacing: ${JSON.stringify(f)}`);
  ok(/a-\u2060t-\u2060il/.test(f) && !/<span/.test(f), `frTypo inversion: ${JSON.stringify(f)}`);
  ok(shell.frTypo('Réponse:ok') === 'Réponse:ok', 'frTypo changed a colon with no space before it');
  ok(shell.frTypo('Sainte-Anne') === 'Sainte-Anne', 'frTypo touched an ordinary hyphen');
  for (const loc of ['en', 'de', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi']) {
    const h = shell.buildPage({ title: 'Title : x ?', instruction: 'Do it : now !', bodyHtml: '', locale: loc, pageSize: 'a4' });
    ok(h.includes('>Title : x ?</h1>') && h.includes('>Do it : now !</p>'), `${loc}: the chrome is not plain esc() (frTypo leaked outside fr)`);
  }
  const hf = shell.buildPage({ title: 'Titre : x ?', instruction: 'Fais-le : maintenant !', bodyHtml: '', locale: 'fr', pageSize: 'a4' });
  ok(hf.includes('>Titre : x ?</h1>') && hf.includes('>Fais-le : maintenant !</p>'), 'fr: buildPage did not apply frTypo to the title + instruction');
}

// RENDER
async function lineStarts(page, html, width) {
  await page.setContent(`<!DOCTYPE html><html lang="fr"><body style="margin:0"><h1 id="t" style="width:${width}px;font:700 28px sans-serif;margin:0">${html}</h1></body></html>`);
  return page.evaluate(() => {
    const el = document.getElementById('t');
    const lines = [];
    const walk = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    const chars = [];
    for (let n = walk.nextNode(); n; n = walk.nextNode()) for (let i = 0; i < n.textContent.length; i++) {
      const r = document.createRange(); r.setStart(n, i); r.setEnd(n, i + 1);
      const b = r.getClientRects()[0];
      if (b) chars.push({ c: n.textContent[i], top: Math.round(b.top) });
    }
    let cur = null;
    for (const ch of chars) { if (!cur || ch.top > cur.top + 4) { cur = { top: ch.top, s: '' }; lines.push(cur); } cur.s += ch.c; }
    return lines.map((l) => l.s);
  });
}
function badLines(lines) {
  const f = [];
  lines.forEach((l, i) => {
    const t = l.replace(/^[\s ]+/, '');
    if (i > 0 && /^[:;?!»]/.test(t)) f.push(`line ${i + 1} starts with "${t[0]}" ("${l}")`);
    // a line broken INSIDE the inversion ends with "a-" or "a-t-" (word joiners stripped before the test)
    if (i + 1 < lines.length && /(^|\s)\p{L}+-(t-)?$/u.test(l.replace(/\u2060/g, '').replace(/[\s\u00A0]+$/, '')) && /^\u2060?(t-|il|elle|on)/u.test(lines[i + 1].replace(/^[\s\u00A0]+/, ''))) f.push(`line ${i + 1} breaks inside the inversion ("${l}" / "${lines[i + 1]}")`);
  });
  return f;
}
(async () => {
  const puppeteer = require('puppeteer');
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  try {
    let ctlBad = 0, poisonBad = 0, poisonHy = 0;
    for (const s of CASES) for (let w = 180; w <= 640; w += 4) {
      const good = badLines(await lineStarts(page, shell.frTypo(esc(s)), w));
      if (good.length) { ctlBad++; ok(false, `fr "${s}" at ${w}px: ${good.join(' ; ')}`); } else assertions++;
      const plain = badLines(await lineStarts(page, esc(s), w));
      if (plain.some((x) => /starts with/.test(x))) poisonBad++;
      if (plain.some((x) => /inside the inversion/.test(x))) poisonHy++;
    }
    console.log(`render: ${CASES.length} strings x 116 widths — patched shell ${ctlBad} bad wraps; the unpatched esc() ${poisonBad} punctuation-first lines, ${poisonHy} inversion breaks`);
    console.log(`poison: the unpatched shell (plain esc) — punctuation ${poisonBad ? 'KILLED' : 'SILENT'}, inversion ${poisonHy ? 'KILLED' : 'SILENT'}`);
    if (!poisonBad) fails.push('poison SILENT: the unpatched shell produced no line starting with : ; ? ! » — the render check cannot see the defect');
    if (!poisonHy) fails.push('poison SILENT: the unpatched shell never broke "a-t-il" — the inversion check cannot see the defect');
  } finally { await browser.close(); }
  if (fails.length) console.log('FAILS:\n  ' + fails.slice(0, 20).join('\n  '));
  console.log(fails.length ? `FAIL (${fails.length} findings)` : `PASS (${assertions} assertions, 2/2 poisons killed)`);
  process.exit(fails.length ? 1 : 0);
})();
