#!/usr/bin/env node
/* =====================================================================
   verify-worksheets-hub-render.js — RENDERED-HTML gate for the
   /[locale]/worksheets hub rebuild.
   ---------------------------------------------------------------------
   The rebuild deleted three "Browse by …" chip walls and two card
   strips. The operator's constraint was that SEO must not be traded for
   aesthetics, so the load-bearing question is not "does it look better"
   but "is every link that existed still in the HTML". This asserts that
   against the CORPUS — every published exercise type, every level, every
   theme — rather than against a before/after diff, which would only
   prove non-regression and not completeness.

   ⚠ IT READS THE RENDERED DOM, NOT THE SOURCE. A grep over page.tsx
   would happily confirm a `<CatalogTypeIndex>` element that renders
   nothing: the de-orphan fix on this same codebase once passed a
   predicate check while the rendered grid showed zero results.

   ⚠ NON-VACUITY FIRST. Every assertion states how many things it found
   against a floor computed from the corpus. An empty page satisfies
   "no forbidden word appears" perfectly.

   Requires a dev server (see --base). Run:
     node scripts/verify-worksheets-hub-render.js --base=http://127.0.0.1:3111
     node scripts/verify-worksheets-hub-render.js --locales=en,de,fi
   ===================================================================== */
'use strict';

const fs = require('fs');
const path = require('path');

const REPO = path.resolve(__dirname, '..');
const FE = path.join(REPO, 'frontend');
const argv = process.argv.slice(2);
const arg = (n, d) => {
  const hit = argv.find((a) => a.startsWith('--' + n + '='));
  return hit ? hit.slice(n.length + 3) : d;
};
const BASE = arg('base', 'http://127.0.0.1:3111');
const LOCALES = String(arg('locales', 'en,de,fi')).split(',').filter(Boolean);

const taxonomy = JSON.parse(fs.readFileSync(path.join(FE, 'config', 'topics-taxonomy.json'), 'utf8'));
const axisSlug = (axis, key, loc) => {
  const e = (taxonomy.axes[axis] || {})[key];
  return (e && e.slug && (e.slug[loc] || e.slug.en)) || key;
};

/** Words that must never appear on this page in any locale. */
const PRICE_WORDS = /\b(free|kostenlos|gratis|gratuit\w*|gratuito\w*|gratuita\w*|ilmais\w*|grátis|kostnadsfri\w*|kosteloos|maksuton)\b/i;

const fails = [];
const notes = [];
const ok = (cond, msg) => { if (!cond) fails.push(msg); };

async function get(url) {
  const res = await fetch(url, { redirect: 'follow' });
  return { status: res.status, html: await res.text() };
}

/** Every href in the document, deduped. */
function hrefs(html) {
  return [...new Set([...html.matchAll(/href="([^"]+)"/g)].map((m) => m[1]
    .replace(/&amp;/g, '&')))];
}

/** Rows the hub should be able to show for a locale, from the landing corpus. */
function corpus(locale) {
  const file = path.join(FE, 'content', 'seo-landing', locale + '.json');
  if (!fs.existsSync(file)) return null;
  const landings = JSON.parse(fs.readFileSync(file, 'utf8')).landings.filter((l) => !l.coordinate.target);
  const types = new Set(landings.map((l) => l.coordinate.type));
  const levels = new Set(landings.map((l) => l.coordinate.level));
  const themes = new Set(landings.map((l) => l.coordinate.theme).filter(Boolean));
  return { types, levels, themes, landings };
}

async function checkLocale(locale) {
  const c = corpus(locale);
  if (!c) { fails.push(locale + ': no landing corpus'); return; }
  // Non-vacuity on the corpus itself, before anything is compared to it.
  ok(c.types.size >= 20, `${locale}: corpus has only ${c.types.size} types — the expectation set is vacuous`);
  ok(c.themes.size >= 20, `${locale}: corpus has only ${c.themes.size} themes`);

  const { status, html } = await get(`${BASE}/${locale}/worksheets`);
  ok(status === 200, `${locale}: hub returned ${status}`);
  if (status !== 200) return;
  ok(html.length > 40000, `${locale}: hub HTML is only ${html.length} bytes — probably an error page`);

  const links = hrefs(html);
  const has = (pred) => links.filter(pred);

  // ---- 1. TOPIC LINKS: the one set with nowhere else to go ----
  const topicLinks = new Set(has((h) => h.includes(`/${locale}/topic/`)).map((h) => h.split('/topic/')[1].replace(/\/$/, '')));
  const missingTopics = [...c.types].filter((t) => !topicLinks.has(axisSlug('exercise-type', t, locale)));
  ok(topicLinks.size >= 20, `${locale}: only ${topicLinks.size} /topic/ links rendered`);
  ok(missingTopics.length === 0,
    `${locale}: ${missingTopics.length} exercise type(s) have NO /topic/ link — the A-Z index lost them: ${missingTopics.slice(0, 6).join(', ')}`);

  // ---- 2. RAIL: every type, level and theme filterable ----
  const q = (k) => new Set(has((h) => h.includes(k + '=')).map((h) => decodeURIComponent((h.split(k + '=')[1] || '').split('&')[0])));
  const typeQ = q('type'), levelQ = q('level'), themeQ = q('theme');
  const missType = [...c.types].filter((t) => !typeQ.has(t));
  const missLevel = [...c.levels].filter((l) => !levelQ.has(l));
  const missTheme = [...c.themes].filter((t) => !themeQ.has(t));
  ok(missType.length === 0, `${locale}: ${missType.length} type(s) missing a ?type= link: ${missType.slice(0, 6).join(', ')}`);
  ok(missLevel.length === 0, `${locale}: ${missLevel.length} level(s) missing a ?level= link: ${missLevel.slice(0, 6).join(', ')}`);
  // This is the one that PROVES the deleted theme wall lost nothing: every
  // theme must be in the HTML, not behind a ?themes=all round trip.
  ok(missTheme.length === 0, `${locale}: ${missTheme.length} theme(s) missing a ?theme= link — the rail did not absorb the deleted wall: ${missTheme.slice(0, 8).join(', ')}`);
  notes.push(`${locale}: ${topicLinks.size} topic links · ${typeQ.size} types · ${levelQ.size} levels · ${themeQ.size} themes`);

  // ---- 3. THE DELETED SURFACES ARE ACTUALLY GONE ----
  ok(!/\?sort=/.test(html), `${locale}: a ?sort= link is still rendered — the sort control was not removed`);
  ok(!/themes=all/.test(html), `${locale}: a ?themes=all link is still rendered — the theme round trip survives`);

  // ---- 4. THE NEW CONTROLS ARE PRESENT ----
  ok(html.includes('format=interactive'), `${locale}: no ?format=interactive tab link`);
  const cards = (html.match(/\/api\/quota\/dl\?/g) || []).length;
  ok(cards >= 24, `${locale}: only ${cards} metered download links — expected at least one per card`);

  // ---- 5. NO PRICE CLAIM, ANYWHERE ON THE PAGE ----
  const text = html.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<[^>]+>/g, ' ');
  const price = text.match(PRICE_WORDS);
  ok(!price, `${locale}: the page says "${price && price[0]}" — nothing on this page may be described as free`);

  // ---- 6. NO RAW i18n KEYS LEAKED ----
  ok(!/worksheetsPage\.[a-zA-Z.]+/.test(text), `${locale}: a raw message key leaked into the rendered text`);
}

(async () => {
  for (const l of LOCALES) {
    try { await checkLocale(l); } catch (e) { fails.push(l + ': threw — ' + e.message); }
  }
  notes.forEach((n) => console.log('  ' + n));
  if (fails.length) {
    console.log('\nFAIL — ' + fails.length + ' problem(s):');
    fails.forEach((f) => console.log('  ✗ ' + f));
    process.exit(1);
  }
  console.log('\nPASS — every type, level and theme link is in the rendered HTML, and no price claim is.');
})();
