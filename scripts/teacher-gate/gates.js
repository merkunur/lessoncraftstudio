#!/usr/bin/env node
/**
 * Gates of the Teacher-plan panel and of the pricing lines (Daily Teaching System, Part 11.2; PLAN.md Part 11).
 * Reads committed files only (the server runs it in deploy.sh): frontend/content/teacher-gate/ui.<loc>.json and
 * the units of each language.
 *
 *   node scripts/teacher-gate/gates.js            every language that has the strings
 *   node scripts/teacher-gate/gates.js --poison   also proves that each gate catches its fault
 *
 *   P1  strings     a language has exactly the strings of the English file (pricingHero may be absent: it is shown
 *                   only where it exists)
 *   P2  slots       every string carries exactly the placeholders of its English source
 *   P3  wording     no string says that anything is free (the plan is what is being sold; the free limits are named
 *                   by the pricing page itself, from lib/quota.ts)
 *   P4  prices      no string holds a price: prices come from config/lemonsqueezy-product-config.ts through {price}
 *                   and {monthly}
 *   P5  content     a language has the strings only when it has at least two live units: the panel and the pricing
 *                   lines name units, and every line is written in the plural
 *   P6  my teaching the first page of a free account (content/my-teaching/ui.<loc>.json): the strings and the
 *                   placeholders of the English file, no price, and only for a language that has the panel strings
 *   P7  play panel  the sign-up panel of the player frame (content/play-wall/ui.json) has its four strings in all
 *                   eleven languages, names the 10 plays a day of lib/quota.ts and holds no price
 *   P8  account     operator ruling 2026-11-12: an activity or a classroom tool needs a free account to play. The
 *                   meter keeps the rule (lib/quota.ts), the player frame says what it plays, the homepage sample is
 *                   the one exception, and no English sentence on the pricing, home, standards or about page says
 *                   that these play without an account
 */
'use strict';
const fs = require('fs');
const path = require('path');
const FRONT = path.join(__dirname, '..', '..', 'frontend');
const C = path.join(FRONT, 'content');
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const PRICE = /\d+[.,]\d\d|\$|€|(?<!\{)\b69\b/;
const NO_ACCOUNT = /no[ -]?(login|log-in|sign[ -]?up|sign[ -]?in|account)|before you (ever )?sign in|without (an account|signing|logging|a login)/i;
const get = (o, p) => p.split('.').reduce((a, k) => (a == null ? a : a[k]), o);
const readJson = (f) => JSON.parse(fs.readFileSync(f, 'utf8'));
const FREE = { en: /\bfree\b/i, de: /(?<!\p{L})(kostenlos\p{L}*|gratis|umsonst)(?!\p{L})/iu, sv: /(?<!\p{L})(gratis|kostnadsfri\p{L}*)(?!\p{L})/iu };
const OPTIONAL = new Set(['pricingHero']);
const slots = (s) => (String(s).match(/\{\w+\}/g) || []).sort().join(' ');

function load() {
  const d = {};
  for (const f of fs.readdirSync(path.join(C, 'teacher-gate')).filter((x) => /^ui\.[a-z]{2}\.json$/.test(x))) {
    const loc = f.split('.')[1];
    const unitsFile = path.join(C, 'units', 'units.' + loc + '.json');
    d[loc] = { ui: readJson(path.join(C, 'teacher-gate', f)), liveUnits: fs.existsSync(unitsFile) ? readJson(unitsFile).units.filter((u) => u.status === 'live').length : 0 };
  }
  // the first page of a free account, the sign-up panel of the player frame, and the account rule
  d.$my = {};
  const myDir = path.join(C, 'my-teaching');
  for (const f of fs.existsSync(myDir) ? fs.readdirSync(myDir).filter((x) => /^ui\.[a-z]{2}\.json$/.test(x)) : []) d.$my[f.split('.')[1]] = readJson(path.join(myDir, f));
  const wallFile = path.join(C, 'play-wall', 'ui.json');
  d.$wall = fs.existsSync(wallFile) ? readJson(wallFile) : {};
  const read = (f) => fs.readFileSync(path.join(FRONT, f), 'utf8');
  d.$code = { quota: read('lib/quota.ts'), route: read('app/api/quota/check-and-increment/route.ts'), frame: read('components/activities/ActivityIframe.tsx'), sample: read('components/homepage-v6/LiveToolEmbedV6.tsx') };
  const en = readJson(path.join(FRONT, 'messages', 'en.json'));
  d.$en = {}; for (const k of ['pricingPage.free.blurb', 'homepageV6.close.body', 'topicFaq.fallback.standards.a2', 'standardsPage.intro', 'aboutPage.intro']) d.$en[k] = get(en, k);
  return d;
}

function run(d) {
  const fails = [];
  const fail = (g, m) => fails.push(g + '  ' + m);
  if (!d.en) { fail('P1', 'there is no English file'); return fails; }
  for (const [loc, L] of Object.entries(d)) {
    if (loc[0] === '$') continue;
    for (const k of Object.keys(d.en.ui)) if (!L.ui[k] && !OPTIONAL.has(k)) fail('P1', loc + ' ' + k + ' is missing');
    for (const k of Object.keys(L.ui)) if (!(k in d.en.ui) && !OPTIONAL.has(k)) fail('P1', loc + ' ' + k + ' is no string of the English file');
    for (const [k, v] of Object.entries(L.ui)) {
      const src = d.en.ui[k];
      if (src != null && slots(v) !== slots(src)) fail('P2', loc + ' ' + k + ' has the placeholders "' + slots(v) + '", its English source "' + slots(src) + '"');
      if (FREE[loc] && FREE[loc].test(v)) fail('P3', loc + ' ' + k + ' says that something is free');
      if (!FREE[loc]) fail('P3', loc + ': no wording rule for this language (add its words for "free" to FREE)');
      if (/\d+[.,]\d\d|\$|€|(?<!\{)\b69\b/.test(v)) fail('P4', loc + ' ' + k + ' holds a price');
    }
    if (L.liveUnits < 2) fail('P5', loc + ' has the strings but ' + L.liveUnits + ' live unit(s)');
  }
  // P6
  if (!d.$my.en) fail('P6', 'there is no English file of the first page');
  else for (const [loc, ui] of Object.entries(d.$my)) {
    if (!d[loc]) fail('P6', loc + ' has the first page but not the panel strings');
    for (const k of Object.keys(d.$my.en)) if (!ui[k]) fail('P6', loc + ' ' + k + ' is missing');
    for (const [k, v] of Object.entries(ui)) {
      if (!(k in d.$my.en)) { fail('P6', loc + ' ' + k + ' is no string of the English file'); continue; }
      if (slots(v) !== slots(d.$my.en[k])) fail('P6', loc + ' ' + k + ' has the placeholders "' + slots(v) + '", its English source "' + slots(d.$my.en[k]) + '"');
      if (PRICE.test(v)) fail('P6', loc + ' ' + k + ' holds a price');
    }
  }
  // P7
  const cap = (/PLAYS_PER_DAY\s*=\s*(\d+)/.exec(d.$code.quota) || [])[1];
  if (!cap) fail('P7', 'the number of plays a day cannot be read from lib/quota.ts');
  for (const loc of LOCALES) {
    const w = d.$wall[loc];
    if (!w) { fail('P7', loc + ' has no sign-up panel'); continue; }
    for (const k of ['title', 'body', 'cta', 'signIn']) { if (!w[k] || !String(w[k]).trim()) fail('P7', loc + ' ' + k + ' is empty'); else if (PRICE.test(w[k])) fail('P7', loc + ' ' + k + ' holds a price'); else if (/\{\w+\}/.test(w[k])) fail('P7', loc + ' ' + k + ' holds a placeholder nothing fills'); }
    if (cap && w.body && !new RegExp('(?<!\\d)' + cap + '(?!\\d)').test(w.body)) fail('P7', loc + ' body does not name the ' + cap + ' plays a day');
    if (w.cta && w.cta.length > 28) fail('P7', loc + ' the button text is longer than 28 characters');
  }
  for (const loc of Object.keys(d.$wall)) if (!LOCALES.includes(loc)) fail('P7', loc + ' is no language of the site');
  // P8
  if (!/PLAY_NEEDS_ACCOUNT[^\n]*\[\s*'activity'\s*,\s*'tool'\s*\]/.test(d.$code.quota)) fail('P8', 'lib/quota.ts does not name activity and tool as the plays that need an account');
  if ((d.$code.quota.match(/\|\| opts\.accountRequired\) && identity\.kind === 'anon'/g) || []).length !== 2) fail('P8', 'lib/quota.ts: the check and the count do not both refuse an anonymous play that needs an account');
  if (!/accountRequired = kind === 'play' && playNeedsAccount\(body\?\.surface\)/.test(d.$code.route) || !/checkAndIncrementQuota\(identity, kind, \{ accountRequired \}\)/.test(d.$code.route)) fail('P8', 'the meter route does not pass the surface on');
  if (!/const surface = sample \? undefined : toolKey \? "tool" : "activity";/.test(d.$code.frame) || !/meterAction\("play", surface\)/.test(d.$code.frame)) fail('P8', 'the player frame does not tell the meter what it plays');
  if (!/"signup_required" \? "signup"/.test(d.$code.frame) || !/data-play-signup/.test(d.$code.frame)) fail('P8', 'the player frame has no sign-up panel');
  if (!/<ActivityIframe [^>]*\bsample\b/.test(d.$code.sample)) fail('P8', 'the homepage sample is not marked as the sample');
  for (const [k, v] of Object.entries(d.$en)) { if (typeof v !== 'string') fail('P8', 'messages/en.json ' + k + ' is missing'); else if (NO_ACCOUNT.test(v) && !/worksheets play (online )?without (an account|a login)/i.test(v)) fail('P8', 'messages/en.json ' + k + ' says that something plays without an account: ' + v.slice(0, 90)); }
  return fails;
}

const POISONS = [
  ['a missing string', 'P1', (d) => { delete d.de.ui.seePlan; }],
  ['a string the English file does not have', 'P1', (d) => { d.sv.ui.extraLine = 'x'; }],
  ['a lost placeholder', 'P2', (d) => { d.de.ui.gives_units = d.de.ui.gives_units.replace('{n}', '24'); }],
  ['an English free claim', 'P3', (d) => { d.en.ui.planGives = 'The plan gives you, on top of everything free:'; }],
  ['a German free claim', 'P3', (d) => { d.de.ui.pricingLead += ' Kostenlos testen.'; }],
  ['a Swedish free claim', 'P3', (d) => { d.sv.ui.gives_downloads += ' Gratis.'; }],
  ['a price written into a string', 'P4', (d) => { d.en.ui.planPrice = '$69 a year, or $8.99 a month.'; }],
  ['strings for a language without units', 'P5', (d) => { d.fr = { ui: JSON.parse(JSON.stringify(d.en.ui)), liveUnits: 0 }; }],
  ['a first-page string that is missing', 'P6', (d) => { delete d.$my.de.startHere; }],
  ['a first-page placeholder that is lost', 'P6', (d) => { d.$my.sv.accountBody = d.$my.sv.accountBody.replace('{n}', '3'); }],
  ['a first page for a language without the panel', 'P6', (d) => { d.$my.fr = JSON.parse(JSON.stringify(d.$my.en)); }],
  ['a language without the sign-up panel', 'P7', (d) => { delete d.$wall.fi; }],
  ['an empty panel string', 'P7', (d) => { d.$wall.it.signIn = ' '; }],
  ['a panel that names another number of plays', 'P7', (d) => { d.$wall.de.body = d.$wall.de.body.replace(/\d+/, '100'); }],
  ['a price in the panel', 'P7', (d) => { d.$wall.en.body += ' Or $69 a year.'; }],
  ['the meter no longer names tools', 'P8', (d) => { d.$code.quota = d.$code.quota.replace("['activity', 'tool']", "['activity']"); }],
  ['the count forgets the account rule', 'P8', (d) => { d.$code.quota = d.$code.quota.replace(" || opts.accountRequired) && identity.kind === 'anon'", ") && identity.kind === 'anon'"); }],
  ['the frame does not say what it plays', 'P8', (d) => { d.$code.frame = d.$code.frame.replace('meterAction("play", surface)', 'meterAction("play")'); }],
  ['the homepage sample is asked for an account', 'P8', (d) => { d.$code.sample = d.$code.sample.replace(' sample />', ' />'); }],
  ['the pricing page says play needs no login', 'P8', (d) => { d.$en['pricingPage.free.blurb'] = 'No login needed to play. A free account adds downloads.'; }],
  ['the homepage says try it all before you sign in', 'P8', (d) => { d.$en['homepageV6.close.body'] = 'Open a tool — try it all before you ever sign in.'; }],
];

if (require.main === module) {
  const fails = run(load());
  for (const f of fails) console.log('FAIL  ' + f);
  if (fails.length) { console.log(fails.length + ' problem(s)'); process.exit(1); }
  if (process.argv.includes('--poison')) {
    for (const [name, gate, breakIt] of POISONS) {
      const copy = load();
      breakIt(copy);
      if (!run(copy).some((f) => f.startsWith(gate + '  '))) { console.log('POISON NOT CAUGHT  ' + name + ' (' + gate + ')'); process.exit(1); }
    }
    console.log('teacher-plan panel: ' + POISONS.length + ' poisons, each caught by its gate');
  }
  console.log('teacher-plan panel: ' + Object.keys(load()).filter((k) => k[0] !== '$').length + ' language(s), first page ' + Object.keys(load().$my).length + ', sign-up panel ' + Object.keys(load().$wall).length + '; all gates pass');
}
module.exports = { run, load };
