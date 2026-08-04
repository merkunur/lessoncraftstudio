#!/usr/bin/env node
/* =====================================================================
   live-verify-money-mat.js — PRODUCTION, driving the main control.

   Runs AFTER deploy. "It mounts" is not a verification: this drives the
   tool's actual verb on the live site — tap a coin, watch the total move —
   in all eleven locales, with a fresh browser context each.

   ⚠ REACH CONTROLS BY INDEX, NEVER BY ENGLISH TEXT. A previous tool in this
     programme matched /print/i and hit "Another BLUEPRINT", then a throwaway
     probe "confirmed" the false defect by repeating the mistake.
   ⚠ SCOPE EVERY CONTENT BAN TO THE TOOL'S OWN PROSE. document.body
     .textContent on a Next page includes the RSC flight-data, which
     serialises every sibling tool — a ban read against it once condemned
     ten locales over the ruler's perfectly correct slug.
   ⚠ NON-VACUITY FIRST, then anything about contents.

   Usage: node scripts/live-verify-money-mat.js [--locale=de]
   ===================================================================== */
'use strict';
const puppeteer = require('puppeteer');

const HOST = 'https://www.lessoncraftstudio.com';
const TOOL_URL = HOST + '/mini-tools/money-mat.html';
/* native slugs, from frontend/messages/tool-content/<locale>.json */
const SLUG = {
  en: 'money-mat', de: 'geldmatte', fr: 'tapis-de-la-monnaie', it: 'tappeto-dei-soldi',
  es: 'contar-dinero', pt: 'tapete-do-dinheiro', nl: 'geldmat', sv: 'pengamattan',
  da: 'pengemaatten', no: 'pengematta', fi: 'rahamatto'
};
const only = (process.argv.find((a) => a.startsWith('--locale=')) || '').split('=')[1];
const LOCALES = only ? [only] : Object.keys(SLUG);

let pass = 0, fail = 0; const bad = [];
const ok = (n, c, x) => { if (c) { pass++; console.log('  ✓ ' + n); } else { fail++; bad.push(n); console.log('  ✗ FAIL ' + n + (x ? ' — ' + x : '')); } };

/* ⭐ poison every ban in BOTH directions before using it. `\b` is ASCII-only
   and would be dead on half these languages. */
const w = (body) => new RegExp('(?<!\\p{L})(?:' + body + ')(?!\\p{L})', 'iu');
const VERDICT = w('wrong|incorrect|falsch|sbagliato|incorrecto|errado|onjuist|forkert|väärin');
{
  const mustFire = ['that is wrong', 'das ist falsch', 'vastasit väärin', 'det er forkert'];
  const mustPass = ['tap coins onto the mat', 'tippe münzen auf die matte', 'napauta kolikoita matolle'];
  for (const s of mustFire) if (!VERDICT.test(s)) { console.log(`GATE BROKEN: ban must fire on "${s}"`); process.exit(2); }
  for (const s of mustPass) if (VERDICT.test(s)) { console.log(`GATE BROKEN: ban must pass "${s}"`); process.exit(2); }
}

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });

  for (const L of LOCALES) {
    console.log(`\n${L}`);
    /* fresh context per locale — a shared one caches the module and every
       later locale passes on the first's copy */
    const ctx = await browser.createBrowserContext();

    /* ---- the landing page ---- */
    const lp = await ctx.newPage();
    const landing = `${HOST}/${L}/tools/${SLUG[L]}`;
    const res = await lp.goto(landing, { waitUntil: 'domcontentloaded', timeout: 45000 }).catch(() => null);
    ok(`${L}: landing ${SLUG[L]} responds 200`, res && res.status() === 200, res ? String(res.status()) : 'no response');
    if (res && res.status() === 200) {
      const m = await lp.evaluate(() => {
        /* ⚠ the tool's OWN prose, not document.body — a Next page's body text
           includes RSC flight-data for every sibling tool on the route */
        const main = document.querySelector('main') || document.body;
        const h1 = main.querySelector('h1');
        const paras = [...main.querySelectorAll('p')].map((p) => p.textContent).join(' ');
        return {
          h1: h1 ? h1.textContent.trim() : '',
          prose: paras.length,
          proseText: paras.slice(0, 4000),
          iframe: !!main.querySelector('iframe')
        };
      });
      ok(`${L}: has an h1`, m.h1.length > 2, m.h1);
      ok(`${L}: carries real prose (${m.prose} chars)`, m.prose > 400, String(m.prose));
      ok(`${L}: embeds the live tool`, m.iframe);
      ok(`${L}: no verdict vocabulary in the landing prose`, !VERDICT.test(m.proseText));
    }
    await lp.close();

    /* ---- the tool itself, DRIVEN ---- */
    const tp = await ctx.newPage();
    await tp.setViewport({ width: 1024, height: 768 });
    const tr = await tp.goto(`${TOOL_URL}?lang=${L}`, { waitUntil: 'networkidle0', timeout: 45000 }).catch(() => null);
    ok(`${L}: the tool responds 200`, tr && tr.status() === 200, tr ? String(tr.status()) : 'no response');
    if (tr && tr.status() === 200) {
      await new Promise((r) => setTimeout(r, 500));

      /* NON-VACUITY before anything about contents */
      const shape = await tp.evaluate(() => ({
        mounted: typeof MoneyMat === 'object' && !!document.querySelector('.mm-wrap'),
        coins: document.querySelectorAll('.mm-purse .mm-coinbtn').length,
        chips: document.querySelectorAll('.mm-chip').length,
        tag: (document.querySelector('.mm-tag-body') || {}).textContent || '',
        total: (document.querySelector('.mm-total') || {}).textContent || ''
      }));
      ok(`${L}: mounted with a purse of ${shape.coins} coins and ${shape.chips} chips`,
        shape.mounted && shape.coins >= 4 && shape.chips >= 4, JSON.stringify(shape));

      /* ⭐ DRIVE THE MAIN CONTROL — tap the first purse coin BY INDEX and
         require the running total to move. This is the whole tool. */
      const before = shape.total;
      const drove = await tp.evaluate(() => {
        const b = document.querySelector('.mm-purse .mm-coinbtn');
        if (!b) return false;
        b.click();
        return true;
      });
      await new Promise((r) => setTimeout(r, 350));
      const after = await tp.evaluate(() => ({
        total: (document.querySelector('.mm-total') || {}).textContent || '',
        onMat: document.querySelectorAll('.mm-mat .mm-coinbtn').length
      }));
      ok(`${L}: ⭐ tapping a coin moves the total and lands it on the mat`,
        drove && after.total !== before && after.onMat === 1,
        JSON.stringify({ before, after }));

      /* ⭐ ONE NOTATION PER ROUND, live */
      const major = /[.,]\d\d(\D|$)/;
      ok(`${L}: the tag and the total share one notation`,
        major.test(shape.tag) === major.test(after.total),
        JSON.stringify({ tag: shape.tag.trim(), total: after.total.trim() }));

      /* the no-shame lock, on the live bytes */
      const shame = await tp.evaluate(() => {
        const wrapEl = document.querySelector('.mm-wrap');
        return { text: wrapEl ? wrapEl.textContent : '', glyphs: /[✗✘❌]/.test(wrapEl ? wrapEl.textContent : '') };
      });
      ok(`${L}: no verdict vocabulary on the apparatus`, !VERDICT.test(shame.text));
      ok(`${L}: no ✗ glyphs`, !shame.glyphs);
    }
    await tp.close();
    await ctx.close();
  }

  await browser.close();
  console.log(`\n${pass} passed, ${fail} failed`);
  if (fail) { console.log('FAILED: ' + bad.slice(0, 8).join(' · ')); process.exit(1); }
  console.log('live-verify-money-mat: ALL GREEN');
})();
