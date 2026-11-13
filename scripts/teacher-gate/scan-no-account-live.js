#!/usr/bin/env node
/**
 * What a VISITOR reads: does a live page still say that playing, printing or downloading needs no account?
 * (The source scan, scan-no-account.js, finds sentences in files; many of those files are not rendered any more.
 * This one reads the pages: the visible text, the title, the meta description and the JSON-LD.)
 *
 *   node scripts/teacher-gate/scan-no-account-live.js [--locs=de,fr] [--origin=https://www.lessoncraftstudio.com] [--per=3]
 *
 * Per language it reads the hubs (home, pricing, about, activities, tools, worksheets, worksheet makers) and from
 * each hub the first --per pages of every kind it links to (an activity, a tool, a topic, a topic of two axes, the
 * /online hub, a worksheet landing, a maker landing). Sentences about PUPILS on a teacher's link, about looking
 * around and about an embedded page are true and are listed in keep.json beside this file.
 * Exit 1 when a page says it; exit 3 when fewer pages could be read than a run needs to mean anything.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { RX, collect, matches } = require('./no-account-lib.js');
const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.split('=').slice(1).join('=') : d; };
const ORIGIN = arg('origin', 'https://www.lessoncraftstudio.com');
const LOCS = arg('locs', Object.keys(RX).join(',')).split(',');
const PER = Number(arg('per', '3'));
// a TRUE sentence of the files (no-account-keep.json `keys`) may stand on a page: the wording with the few characters
// around it is looked up in those sentences (their numbers and names are filled in on the page, so a short window)
const norm = (t) => t.replace(/\s+/g, ' ').toLowerCase();
const TRUE = {}; for (const h of collect(LOCS).filter((x) => x.cls === 'true')) (TRUE[h.loc] = TRUE[h.loc] || []).push(norm(h.text));
const keepText = (loc, text, m) => { const w = norm(text.slice(Math.max(0, m.index - 14), m.index + m[0].length + 6)); return (TRUE[loc] || []).some((t) => t.includes(w)); };
const qa = (() => { try { return require('../lib/qa-header.js'); } catch (e) { return null; } })();
const headers = Object.assign({ 'user-agent': 'lcs-qa/1.0' }, qa ? qa.headers() : {});
const get = async (u) => { for (let t = 0; t < 3; t++) { try { const r = await fetch(u, { headers, redirect: 'follow' }); if (r.status === 429) { await new Promise((z) => setTimeout(z, 4000)); continue; } return { status: r.status, html: r.status === 200 ? await r.text() : '' }; } catch (e) { await new Promise((z) => setTimeout(z, 1500)); } } return { status: 0, html: '' }; };
const visible = (html) => html.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ').replace(/<noscript[\s\S]*?<\/noscript>/gi, ' ').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/\s+/g, ' ');
const metas = (html) => [(/<title[^>]*>([\s\S]*?)<\/title>/i.exec(html) || [, ''])[1]].concat([...html.matchAll(/<meta[^>]+(?:name|property)="(?:description|og:description|og:title|twitter:description|twitter:title)"[^>]*content="([^"]*)"/gi)].map((m) => m[1])).concat([...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)].map((m) => m[1])).join(' ¦ ').replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, '&');
(async () => {
  let pages = 0, bad = 0;
  for (const loc of LOCS) {
    const hubs = ['', '/pricing', '/about', '/activities', '/tools', '/worksheets', '/worksheet-makers'].map((p) => '/' + loc + p);
    const seen = new Set(hubs); const queue = hubs.slice();
    const kinds = [[new RegExp('^/' + loc + '/activities/[^/?#]+$'), 'activity'], [new RegExp('^/' + loc + '/tools/[^/?#]+$'), 'tool'], [new RegExp('^/' + loc + '/topic/[^/?#]+$'), 'topic'], [new RegExp('^/' + loc + '/topic/[^/?#]+/[^/?#]+$'), 'topic2'], [new RegExp('^/' + loc + '/topic/[^/?#]+/[^/?#]+/online$'), 'online'], [new RegExp('^/' + loc + '/worksheets/[^/?#]+$'), 'landing'], [new RegExp('^/' + loc + '/worksheet-makers/[^/?#]+$'), 'maker'], [new RegExp('^/' + loc + '/units/[^/?#]+$'), 'unit']];
    const taken = {};
    while (queue.length) {
      const p = queue.shift();
      const r = await get(ORIGIN + p + (p.includes('?') ? '&' : '?') + 'cb=' + Date.now());
      if (r.status !== 200) { if (r.status !== 404 && r.status !== 410) console.log('  (' + r.status + ') ' + p); continue; }
      pages++;
      for (const [where, text] of [['page', visible(r.html)], ['head', metas(r.html)]]) {
        const said = new Set();
        for (const m of matches(loc, text)) {
          const s = text.slice(Math.max(0, m.index - 90), m.index + m[0].length + 60).trim();
          if (keepText(loc, text, m)) continue;
          const k = s.slice(60, 130); if (said.has(k)) continue; said.add(k);
          bad++; console.log('SAYS  ' + p + ' [' + where + '] …' + s + '…');
        }
      }
      // from a hub, and from a topic page (the online hub and the pages of two axes hang there), follow a few links of every kind
      if (hubs.includes(p) || /\/topic\/[^/]+$/.test(p) || /\/topic\/[^/]+\/[^/]+$/.test(p)) for (const m of r.html.matchAll(/href="(\/[a-z]{2}\/[^"#?]+)"/g)) {
        const h = m[1].replace(/\/$/, ''); if (seen.has(h)) continue;
        const kind = kinds.find(([re]) => re.test(h)); if (!kind) continue;
        if ((taken[kind[1]] || 0) >= PER) continue;
        taken[kind[1]] = (taken[kind[1]] || 0) + 1; seen.add(h); queue.push(h);
      }
      await new Promise((z) => setTimeout(z, 350));
    }
    console.log(loc + ': ' + seen.size + ' page(s) listed (' + Object.entries(taken).map(([k, n]) => k + ' ' + n).join(', ') + ')');
  }
  console.log('read ' + pages + ' page(s) in ' + LOCS.length + ' language(s): ' + bad + ' sentence(s) that say no account is needed');
  if (pages < LOCS.length * 8) { console.log('INCONCLUSIVE: fewer than 8 pages per language could be read'); process.exit(3); }
  process.exit(bad ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(2); });
