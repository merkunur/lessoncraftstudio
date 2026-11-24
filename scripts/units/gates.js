#!/usr/bin/env node
/**
 * The gates of units and sub packs (Daily Teaching System, Parts 3–5). They read COMMITTED files only, so they run
 * on the server too (deploy.sh). What needs the published catalogue (does every page exist?) is checked where the
 * catalogue table is: scripts/units/assemble.js and scripts/sub-plans/assemble.js with --check, and check-live.js.
 *
 *   node scripts/units/gates.js            exit 1 on any failure
 *   node scripts/units/gates.js --warn     report, exit 0
 *   node scripts/units/gates.js --poison   every gate must FAIL on a file spoiled for it, and pass on the real files
 *
 *   P1  shape      ids and slugs unique and url-safe per language; status pilot | live; title, metadata present;
 *                  meta description 110–170 characters, meta title at most 70
 *   P2  points     every lesson and block names a teaching point of the content graph
 *   P3  no filler  a unit has at least 4 lessons; a lesson at least two real assets (worksheet types, a tool, practice on screen that is not the handed-out page);
 *                  a teacher note says a mistake, gives WORDS (something in quotation marks) and what to watch for;
 *                  no two teaching points share a note (word 3-grams, Jaccard 0.5 or more)
 *   P4  scripts    a sub pack has at least 5 blocks with reading, writing and math; every block's script has what to
 *                  say (in quotation marks), how to start together and what to do when a child is stuck; a week day's
 *                  script names only things its page shows (scripts/sub-plans/picture-words.js: a picture word of the library
 *                  must be a picture of the page or a word it prints, or an example of the point's rule)
 *   P5  tier truth no visible string says the material is free (the plan's name comes from the pricing catalogue)
 *   P6  strings    every language's ui file holds exactly the keys of the English one
 *   P8  review     a sub pack takes nothing the plans of its grade teach after the pack's time of year (start: the first
 *                  third of the plan's class days; middle: two thirds; a week day: what is taught by the end of its week,
 *                  and no point in the day of the week before; no worksheet family twice in a week day, except a story and
 *                  an informational text; an End-of-the-day type at most 3 times in a grade's week days; in Grade 3 a type of
 *                  a lower grade at most twice in one kind of block),
 *                  the packs of a grade share no page, no page belongs to a holiday or to the list of pages no pack hands out
 *   P9  pacing     every lesson says the class days it carries by what it holds (scripts/units/pacing.js), a unit its
 *                  days and weeks counted from them, and no unit description names another number of weeks
 */
'use strict';
const fs = require('fs');
const path = require('path');
const REPO = path.join(__dirname, '..', '..');
const C = path.join(REPO, 'frontend', 'content');
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
// P5 exemptions, an auditable list (never a loosened pattern): a lesson whose PAGE teaches a trick that is named with the
// word, where the word is about the ad on the page and never about our material. Only the phrase is taken out before the
// test; any other "free" in the same text still fails. 2026-11-24: G2-607 Ad Detective prints the trick "a free prize" and
// a cereal box with a "FREE TOY" burst (2:ad-detective, NHES 2.2.2).
const FREE_ON_THE_PAGE = { en: { '2:ad-detective': /\bfree (prize|prizes|toy|toys)\b/gi } };
const freeIn = (l, point, s) => { const ex = FREE_ON_THE_PAGE[l] && FREE_ON_THE_PAGE[l][point]; return FREE[l].test(ex ? s.replace(ex, '') : s); };
const FREE = { en: /\bfree\b/i, de: /\b(kostenlos|gratis|umsonst)\b/i, fr: /\b(gratuit|gratuite|gratuits|gratuites|gratuitement)\b/i, es: /\b(gratis|gratuit[oa]s?)\b/i, pt: /\b(grátis|gratuit[oa]s?)\b/i, it: /\b(gratis|gratuit[oaie])\b/i, nl: /\b(gratis|kosteloos)\b/i, sv: /\b(gratis|kostnadsfri\w*)\b/i, da: /\b(gratis)\b/i, no: /\b(gratis)\b/i, fi: /(ilmai[ns]\w*|maksut\w*)/i };
// strings a language may still lack while its teacher has not read them (the page leaves the sentence out where the
// key is missing); empty since the day plan of Part 4.8 was read in German and Swedish
// strings of a product that exists in English only so far: German and Swedish get them with that product
// (slotScreenBook: the readers, whose books exist in English only, 2026-11-22)
const ENGLISH_FIRST = new Set(['slotScreenBook']);
// the sub-plan strings of the week days and the sub binder pages (Part 5.4), which exist in English only so far
const SUB_ENGLISH_FIRST = /^(week[A-Z]|hubWeek|binder[A-Z]|block_social$)/;
// words by which a plan would claim to fill the school year (a plan of ours fills some weeks of it)
const WHOLE_YEAR = { en: /(?<!not a )\b(whole|full|entire|complete)[- ](school[- ])?year\b|\byear[- ]long\b|\b(36|40) weeks\b/i,
  de: /(?<!kein )(?<!keinem )\b(ganze[sn]?|gesamte[sn]?|komplette[sn]?|volle[sn]?) (Schul)?jahr\b|\bfürs ganze Jahr\b|\b(36|38|40) Wochen\b/i,
  // "årsplanering" names the plan of a whole school year: a plan of ours never carries that name (it may say that it
  // goes INTO the teacher's own årsplanering)
  sv: /(?<!inte ett )(?<![\p{L}])(hela|helt) (läsår|läsåret|skolår|skolåret|året)(?![\p{L}])|(?<![\p{L}])(läsårsplanering|helårsplanering)(?![\p{L}])|(?<!din egen )(?<!din )(?<![\p{L}])årsplanering(?![\p{L}])|(?<![0-9])(36|38|40) veckor/iu };
const readJson = (f) => (fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, 'utf8')) : null);
const QUOTED = /["“„«»”][^"“”„«»]{3,}["”“»«]/;

const { planWeeks, refused, HOLIDAY_PAGE, SKIP_PAGE, packShape } = require('../sub-plans/position.js');
const { mismatches: pictureMismatches } = require('../sub-plans/picture-words.js');
const SUB_DIR = path.join(REPO, 'scripts', 'sub-plans');
const PACE = require('./pacing.js');
// the week count a description names in words (the three languages that have units), for P9
const WEEK_WORDS = { en: ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'], de: ['', 'eine', 'zwei', 'drei', 'vier', 'fünf', 'sechs', 'sieben', 'acht', 'neun', 'zehn'], sv: ['', 'en', 'två', 'tre', 'fyra', 'fem', 'sex', 'sju', 'åtta', 'nio', 'tio'] };
const WEEK_RE = { en: /\b(?:an?) (one|two|three|four|five|six|seven|eight|nine|ten)-week\b/i, de: /^(eine) Woche\b|^(zwei|drei|vier|fünf|sechs|sieben|acht|neun|zehn) Wochen\b/i, sv: /cirka (en) vecka|cirka (två|tre|fyra|fem|sex|sju|åtta|nio|tio) veckor/i };
function load() {
  const all = readJson(path.join(C, 'teaching-graph', 'points.json')).points;
  const d = { points: new Set(all.map((p) => p.id)), pointById: new Map(all.map((p) => [p.id, p])), loc: {} };
  // the week days (Part 5.4): the worksheet family of each type, and what each English page shows
  d.subFamily = (readJson(path.join(SUB_DIR, 'type-families.json')) || { types: {} }).types;
  d.subPages = (readJson(path.join(SUB_DIR, 'page-pictures.json')) || { pages: {} }).pages;
  for (const l of LOCALES) {
    const units = readJson(path.join(C, 'units', 'units.' + l + '.json'));
    const packs = readJson(path.join(C, 'sub-plans', 'packs.' + l + '.json'));
    if (!units && !packs) continue;
    d.loc[l] = { units: units ? units.units : [], plans: units && units.plans ? units.plans : [], packs: packs ? packs.packs : [], uiU: readJson(path.join(C, 'units', 'ui.' + l + '.json')), uiS: readJson(path.join(C, 'sub-plans', 'ui.' + l + '.json')) };
  }
  return d;
}
const grams = (s) => { const w = s.toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, ' ').split(/\s+/).filter(Boolean); const g = new Set(); for (let i = 0; i + 2 < w.length; i++) g.add(w[i] + ' ' + w[i + 1] + ' ' + w[i + 2]); return g; };
const jaccard = (a, b) => { let n = 0; for (const x of a) if (b.has(x)) n++; return n / (a.size + b.size - n || 1); };

function run(d) {
  const fails = [];
  const fail = (g, m) => fails.push(g + '  ' + m);
  for (const [l, L] of Object.entries(d.loc)) {
    for (const [kind, list] of [['unit', L.units], ['pack', L.packs]]) {
      const ids = new Set(), slugs = new Set();
      for (const x of list) {
        const w = l + ' ' + kind + ' ' + x.id;
        if (ids.has(x.id)) fail('P1', w + ': id used twice'); ids.add(x.id);
        if (slugs.has(x.slug)) fail('P1', w + ': slug used twice'); slugs.add(x.slug);
        if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(x.slug || '')) fail('P1', w + ': slug is not url-safe');
        if (!['pilot', 'live'].includes(x.status)) fail('P1', w + ': status "' + x.status + '"');
        if (!x.title || !x.metaTitle || !x.metaDescription) fail('P1', w + ': title or metadata missing');
        else {
          if (x.metaTitle.length > 70) fail('P1', w + ': meta title has ' + x.metaTitle.length + ' characters (70 at most)');
          if (x.metaDescription.length < 110 || x.metaDescription.length > 170) fail('P1', w + ': meta description has ' + x.metaDescription.length + ' characters (110 to 170)');
        }
        for (const s of [x.title, x.metaTitle, x.metaDescription]) if (s && FREE[l].test(s)) fail('P5', w + ': "' + s.slice(0, 60) + '" says free');
      }
    }
    // units
    const notes = new Map();
    const lessonKeys = new Map();
    for (const u of L.units) {
      const w = l + ' unit ' + u.id;
      if (u.lessons.length < 4) fail('P3', w + ': ' + u.lessons.length + ' lessons (at least 4)');
      // P9: the days and the weeks are the counted ones
      for (const x of u.lessons) if (x.writeDays != null && (x.writeDays !== 3 || x.paper.length < 2 || String(u.grade) === 'K' || String(u.grade) === 'P')) fail('P9', w + ' lesson ' + x.n + ': claims three days for its writing without two page types from Grade 1 on');
      // an investigation's third session (2026-11-24): only in a content area, from Grade 1 on, for a lesson with a hands-on routine
      for (const x of u.lessons) if (x.investigateDays != null && (x.investigateDays !== 3 || !['science', 'social', 'health'].includes(u.subject) || !x.routine || x.led || String(u.grade) === 'K' || String(u.grade) === 'P')) fail('P9', w + ' lesson ' + x.n + ': claims a third session for an investigation outside a content area, without a hands-on routine or below Grade 1');
      for (const x of u.lessons) if (x.days !== PACE.lessonDays(u.grade, x)) fail('P9', w + ' lesson ' + x.n + ': says ' + x.days + ' class days, its material carries ' + PACE.lessonDays(u.grade, x));
      if (u.days !== PACE.unitDays(u.grade, u.lessons)) fail('P9', w + ': says ' + u.days + ' days, its lessons carry ' + PACE.unitDays(u.grade, u.lessons));
      const counted = PACE.unitWeeks(u.grade, u.lessons, { loc: l, subject: u.subject });
      if (u.weeks !== counted) fail('P9', w + ': says ' + u.weeks + ' weeks, counted ' + counted);
      if (WEEK_RE[l]) { const m = WEEK_RE[l].exec(u.metaDescription || ''); const named = m ? WEEK_WORDS[l].indexOf((m[1] || m[2]).toLowerCase()) : null; if (named != null && named !== u.weeks) fail('P9', w + ': the description names ' + named + ' week(s), the unit takes ' + u.weeks); }
      for (const x of u.lessons) {
        const lw = w + ' lesson ' + x.n;
        if (!d.points.has(x.point)) fail('P2', lw + ': ' + x.point + ' is no teaching point');
        // practice on screen counts when it is an activity, or a page other than the pages handed out on paper
        // a lesson the teacher leads has no page: its routine (what the class does) is an asset, and it must be there
        if (x.led ? x.paper.length > 0 || !x.routine || x.routine.length < 120 : x.paper.length === 0) fail('P3', lw + ': ' + (x.led ? 'a lesson the teacher leads has a routine and no worksheet' : 'no worksheet (only a lesson the teacher leads has none)'));
        const real = x.paper.length + (x.tool ? 1 : 0) + (x.screen && (x.screen.kind === 'activity' || !x.paper.some((r) => r.core === x.screen.slug)) ? 1 : 0) + (x.routine && x.routine.length >= 120 ? 1 : 0);   // a led lesson's routine, or a hands-on routine beside the pages (2026-11-23)
        if (real < 2) fail('P3', lw + ': fewer than two real assets');
        const n = x.note || {};
        if (!n.mistake || n.mistake.length < 60) fail('P3', lw + ': the note names no mistake');
        if (!n.words || !QUOTED.test(n.words)) fail('P3', lw + ': the note gives no words to use (nothing in quotation marks)');
        if (!n.watch || n.watch.length < 40) fail('P3', lw + ': the note does not say what to watch for');
        for (const s of [x.title, x.objective, n.mistake, n.words, n.watch]) if (s && freeIn(l, x.point, s)) fail('P5', lw + ': "' + s.slice(0, 60) + '" says free');
        // a lesson stands once in a language: by its id where it has one (a further lesson on a point), else by its point
        const key = x.id || x.point;
        if (x.id != null && !(typeof x.id === 'string' && x.id.startsWith(x.point + '#'))) fail('P2', lw + ': the lesson id "' + x.id + '" does not begin with its point');
        if (lessonKeys.has(key)) fail('P3', lw + ': ' + key + ' is taught by ' + lessonKeys.get(key) + ' as well (two lessons on one point need two ids, two titles and two notes)');
        lessonKeys.set(key, w + ' lesson ' + x.n);
        if (n.mistake && !notes.has(key)) notes.set(key, grams([n.mistake, n.words, n.watch].join(' ')));
      }
    }
    const ps = [...notes];
    for (let i = 0; i < ps.length; i++) for (let j = i + 1; j < ps.length; j++) { const s = jaccard(ps[i][1], ps[j][1]); if (s >= 0.5) fail('P3', l + ': the notes of ' + ps[i][0] + ' and ' + ps[j][0] + ' are nearly the same (' + s.toFixed(2) + ')'); }
    // year plans (scope and sequence): P7
    const unitSlugs = new Set(L.units.map((u) => u.slug));
    const inPlan = new Map();
    const planIds = new Set(), planSlugs = new Set();
    for (const p of L.plans) {
      const w = l + ' plan ' + p.id;
      if (planIds.has(p.id)) fail('P7', w + ': id used twice'); planIds.add(p.id);
      if (planSlugs.has(p.slug) || unitSlugs.has(p.slug)) fail('P7', w + ': its slug is the slug of another page'); planSlugs.add(p.slug);
      if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(p.slug || '')) fail('P7', w + ': slug is not url-safe');
      if (!/^plan-[a-z0-9]+(?:-[a-z0-9]+)*$/.test(p.id || '')) fail('P7', w + ': id is not "plan-…" in lower-case letters, digits and hyphens (it names a Teacher-only file)');
      if (!p.title || !p.metaTitle || !p.metaDescription) fail('P7', w + ': title or metadata missing');
      else {
        if (p.metaTitle.length > 70) fail('P7', w + ': meta title has ' + p.metaTitle.length + ' characters (70 at most)');
        if (p.metaDescription.length < 110 || p.metaDescription.length > 170) fail('P7', w + ': meta description has ' + p.metaDescription.length + ' characters (110 to 170)');
      }
      for (const t of [p.title, p.metaTitle, p.metaDescription]) {
        if (t && FREE[l].test(t)) fail('P5', w + ': "' + t.slice(0, 60) + '" says free');
        // a plan says how many weeks its lessons take; it never claims the school year
        if (t && WHOLE_YEAR[l] && WHOLE_YEAR[l].test(t)) fail('P7', w + ': "' + t.slice(0, 60) + '" claims a whole school year');
      }
      if (p.units.length < 3) fail('P7', w + ': ' + p.units.length + ' units (at least 3)');
      let week = 0;
      for (const r of p.units) {
        const u = L.units.find((x) => x.id === r.id);
        if (!u) { fail('P7', w + ': ' + r.id + ' is no unit'); continue; }
        if (u.grade !== p.grade || u.subject !== p.subject) fail('P7', w + ': ' + r.id + ' is a unit of another grade or subject');
        if (inPlan.has(r.id)) fail('P7', w + ': ' + r.id + ' is in two plans'); inPlan.set(r.id, p.id);
        if (r.slug !== u.slug || r.title !== u.title || r.weeks !== u.weeks || r.lessons.join('|') !== u.lessons.map((x) => x.title).join('|')) fail('P7', w + ': the row of ' + r.id + ' is not what the unit says');
        if (r.from !== week + 1 || r.to !== week + r.weeks) fail('P7', w + ': the weeks of ' + r.id + ' do not follow the unit before it');
        week = r.to;
        if (p.status === 'live' && u.status !== 'live') fail('P7', w + ': the plan is live and its unit ' + r.id + ' is not');
      }
      if (p.weeks !== week) fail('P7', w + ': ' + p.weeks + ' weeks, its units add up to ' + week);
      for (const u of L.units) if (u.grade === p.grade && u.subject === p.subject && !p.units.some((r) => r.id === u.id)) fail('P7', w + ': the unit ' + u.id + ' of this grade and subject is missing');
    }
    // sub packs: a day of review takes nothing the plans of its grade teach after the pack's time of year (P8), and a
    // grade's packs share no page (a teacher who is out twice gets a second day, not the same pages)
    const weeks = planWeeks({ units: L.units, plans: L.plans });
    const typeOf = new Map();
    for (const p of L.packs) {
      const w = l + ' pack ' + p.id;
      for (const b of p.blocks) {
        const pt = d.pointById.get(b.point);
        // a week day (Part 5.4) reviews what its grade's plans teach by the END of its week
        const no = pt ? refused(pt, p.grade, p.position, weeks, p.week) : null;
        if (no) fail('P8', w + ' block ' + b.key + ' (' + b.point + '): ' + no);
        for (const slug of [b.core, b.easy, b.hard].filter(Boolean)) {
          const k = p.grade + ' ' + slug;
          if (HOLIDAY_PAGE.test(slug)) fail('P8', w + ' block ' + b.key + ': the page ' + slug + ' belongs to a holiday');
          if (SKIP_PAGE.has(slug)) fail('P8', w + ' block ' + b.key + ': the page ' + slug + ' is on the list of pages no pack hands out (scripts/sub-plans/skip-pages.json)');
          if (typeOf.has(k)) fail('P8', w + ' block ' + b.key + ': the page ' + slug + ' is also in pack ' + typeOf.get(k) + ' of the same grade'); else typeOf.set(k, p.id);
        }
      }
      // the week days of a grade (Part 5.4): no point in two neighbouring weeks
      if (p.week) { const prev = L.packs.find((x) => x.grade === p.grade && x.week === p.week - 1); if (prev) for (const b of p.blocks) if (prev.blocks.some((x) => x.point === b.point)) fail('P8', w + ' block ' + b.key + ' (' + b.point + '): the point is also in week ' + prev.week + ' of the grade'); }
      // ... and no worksheet family twice in one week day; two reading pages only when one is a story and one an
      // informational text (review of Part 5.4: two mental-math pages, two spot-the-difference puzzles in one day)
      if (p.week) p.blocks.forEach((b, i) => {
        const a = d.subFamily[b.type];
        if (!a) { fail('P8', w + ' block ' + b.key + ': ' + b.type + ' has no family in scripts/sub-plans/type-families.json'); return; }
        for (const c of p.blocks.slice(0, i)) {
          const o = d.subFamily[c.type];
          const shared = o && [a.family, a.topic].filter(Boolean).find((k) => [o.family, o.topic].includes(k));
          if (!shared) continue;
          if (a.family === 'reading-comprehension' && o.family === a.family && [a.kind, o.kind].sort().join() === 'info,story') continue;
          fail('P8', w + ' blocks ' + c.key + ' and ' + b.key + ': two pages of the worksheet family ' + shared + ' in one day');
        }
      });
      const shape = packShape(p.form, p.blocks);
      if (shape) fail('P4', w + ': ' + shape);
      for (const b of p.blocks) {
        const bw = w + ' block ' + b.key;
        if (!d.points.has(b.point)) fail('P2', bw + ': ' + b.point + ' is no teaching point');
        const s = b.script || {};
        if (!s.say || !QUOTED.test(s.say)) fail('P4', bw + ': the script does not give what to say (nothing in quotation marks)');
        if (!s.first || s.first.length < 40) fail('P4', bw + ': the script does not say how to start together');
        if (!s.stuck || s.stuck.length < 40) fail('P4', bw + ': the script does not say what to do when a child is stuck');
        for (const t of [s.say, s.first, s.stuck]) if (t && FREE[l].test(t)) fail('P5', bw + ': "' + t.slice(0, 60) + '" says free');
        if (L.uiS && !L.uiS['block_' + b.key]) fail('P6', bw + ': the ui file has no name for this kind of block');
      }
    }
    // the week days across the year (review of Part 5.4): an End-of-the-day type at most 3 times in a grade; in Grade 3
    // a type of a lower grade at most twice in one kind of block
    const useOf = new Map();
    for (const p of L.packs.filter((x) => x.week)) for (const b of p.blocks) {
      if (b.key === 'closing') { const k = p.grade + ' closing ' + b.type; useOf.set(k, (useOf.get(k) || 0) + 1); if (useOf.get(k) === 4) fail('P8', l + ' grade ' + p.grade + ': the End-of-the-day type ' + b.type + ' in more than 3 week days'); }
      if (String(p.grade) === '3' && !/^G3-/.test(b.type)) { const k = '3 ' + b.key + ' ' + b.type; useOf.set(k, (useOf.get(k) || 0) + 1); if (useOf.get(k) === 3) fail('P8', l + ' grade 3: the lower-grade type ' + b.type + ' in more than 2 ' + b.key + ' blocks'); }
    }
    // a week day's script names only things its page shows (scripts/sub-plans/picture-words.js)
    // ... and gives no answers of another page: "the page for everyone" is a page of the 24 days (Part 5.2)
    for (const p of L.packs.filter((x) => x.week)) for (const b of p.blocks) if (/page for everyone/i.test([b.script.say, b.script.first, b.script.stuck].join(' '))) fail('P4', l + ' pack ' + p.id + ' block ' + b.key + ': the script speaks of "the page for everyone", a page of another day');
    if (l === 'en') for (const m of pictureMismatches(L.packs, d.subPages)) fail('P4', l + ' pack ' + m.pack + ' block ' + m.block + ' (' + m.point + ', ' + m.core + '): the script names "' + m.word + '", which the page does not show');
    // the pages' own strings
    for (const [name, ui, base] of [['units/ui', L.uiU, d.loc.en && d.loc.en.uiU], ['sub-plans/ui', L.uiS, d.loc.en && d.loc.en.uiS]]) {
      if (!ui) { if ((name === 'units/ui' ? L.units : L.packs).length) fail('P6', l + ': no ' + name + ' file'); continue; }
      for (const [k, v] of Object.entries(ui)) { if (typeof v !== 'string' || !v.trim()) fail('P6', l + ' ' + name + ': "' + k + '" is empty'); else if (FREE[l].test(v)) fail('P5', l + ' ' + name + ': "' + k + '" says free'); }
      if (base && l !== 'en') { const keys = (o) => Object.keys(o).filter((k) => !ENGLISH_FIRST.has(k) && !(name === 'sub-plans/ui' && SUB_ENGLISH_FIRST.test(k))).sort().join('|'); const a = keys(base), b = keys(ui); if (a !== b) fail('P6', l + ' ' + name + ': its keys are not the keys of the English file'); }
    }
  }
  return fails;
}

const clone = (x) => JSON.parse(JSON.stringify(x));
const POISONS = [
  ['two units with one slug', 'P1', (d) => { const u = clone(d.loc.en.units[0]); u.id += '-b'; d.loc.en.units.push(u); }],
  ['a meta description of 60 characters', 'P1', (d) => { d.loc.en.units[0].metaDescription = 'A unit about adding and subtracting for the first grade here.'; }],
  ['a lesson on a teaching point that does not exist', 'P2', (d) => { d.loc.en.units[0].lessons[0].point = '9:nothing'; }],
  ['a block on a teaching point that does not exist', 'P2', (d) => { d.loc.en.packs[0].blocks[0].point = '9:nothing'; }],
  ['a unit of three lessons', 'P3', (d) => { d.loc.en.units[0].lessons.length = 3; }],
  ['a second lesson on a point without an id of its own', 'P3', (d) => { const u = d.loc.en.units[0]; const c = clone(u.lessons[0]); c.n = u.lessons.length + 1; u.lessons.push(c); }],
  ['a lesson id that does not belong to its point', 'P2', (d) => { d.loc.en.units[0].lessons[0].id = '9:other#again'; }],
  ['a lesson that claims a third day without the material', 'P9', (d) => { const x = d.loc.en.units.flatMap((u) => u.lessons).find((y) => y.days === 2); x.days = 3; }],
  ['a math lesson that claims a third session for an investigation', 'P9', (d) => { const x = d.loc.en.units.filter((u) => u.subject === 'math' && u.grade !== 'K').flatMap((u) => u.lessons).find((y) => y.days === 2); x.investigateDays = 3; x.days = 3; }],
  ['an investigation lesson whose routine is gone', 'P9', (d) => { const x = d.loc.en.units.flatMap((u) => u.lessons).find((y) => y.investigateDays === 3); delete x.routine; }],
  ['a lesson with one page that claims three days for its writing', 'P9', (d) => { const x = d.loc.en.units.flatMap((u) => u.lessons).find((y) => y.days === 2 && y.paper.length === 1); x.writeDays = 3; x.days = 3; }],
  ['a unit that says two weeks', 'P9', (d) => { const u = d.loc.en.units.find((y) => y.weeks > 2); u.weeks = 2; }],
  ['a description that names the old length', 'P9', (d) => { const u = d.loc.en.units.find((y) => /\b[Aa]n? \w+-week\b/.test(y.metaDescription) && y.weeks !== 2); u.metaDescription = u.metaDescription.replace(/\b([Aa])n? \w+-week\b/, '$1 two-week'); }],
  ['a lesson without a worksheet that the teacher does not lead', 'P3', (d) => { const x = d.loc.en.units[0].lessons[0]; x.paper.length = 0; }],
  ['a one-page lesson whose hands-on routine is too short', 'P3', (d) => { const x = d.loc.en.units[0].lessons[0]; x.paper.length = 1; delete x.tool; delete x.screen; delete x.led; x.routine = 'Short.'; }],
  ['a one-page lesson with no second asset', 'P3', (d) => { const x = d.loc.en.units[0].lessons[0]; x.paper.length = 1; delete x.tool; delete x.screen; delete x.led; delete x.routine; }],
  ['a lesson the teacher leads without its routine', 'P3', (d) => { const x = d.loc.en.units[0].lessons[0]; x.paper.length = 0; x.led = true; delete x.routine; }],
  ['a lesson with one worksheet and nothing else', 'P3', (d) => { const x = d.loc.en.units[0].lessons[0]; x.paper.length = 1; delete x.tool; delete x.screen; }],
  ['a lesson whose only screen practice is the very page it hands out', 'P3', (d) => { const x = d.loc.en.units[0].lessons[0]; x.paper.length = 1; delete x.tool; x.screen = { kind: 'page', slug: x.paper[0].core, title: x.paper[0].title }; }],
  ['a note whose words to use quote nothing', 'P3', (d) => { d.loc.en.units[0].lessons[1].note.words = 'Use clear language and encourage the children to explain their thinking.'; }],
  ['two points with the same note', 'P3', (d) => { const a = d.loc.en.units[0].lessons; a[2].note = clone(a[3].note); }],
  ['a year plan with a unit of another grade', 'P7', (d) => { const p = d.loc.en.plans[0]; const other = d.loc.en.plans[1].units[0]; p.units[1] = clone(other); }],
  ['a year plan of two units', 'P7', (d) => { d.loc.en.plans[0].units.length = 2; }],
  ['a year plan whose weeks skip one', 'P7', (d) => { const r = d.loc.en.plans[0].units[1]; r.from += 1; r.to += 1; }],
  ['a year plan with the slug of a unit', 'P7', (d) => { d.loc.en.plans[0].slug = d.loc.en.units[0].slug; }],
  ['a live year plan with a unit that is not live', 'P7', (d) => { const p = d.loc.en.plans[0]; p.status = 'live'; d.loc.en.units.find((u) => u.id === p.units[0].id).status = 'pilot'; }],
  ['a year plan that leaves a unit of its grade out', 'P7', (d) => { d.loc.en.plans[0].units.pop(); d.loc.en.plans[0].weeks = d.loc.en.plans[0].units.reduce((n, r) => n + r.weeks, 0); }],
  ['a year plan that claims the whole year', 'P7', (d) => { d.loc.en.plans[0].metaTitle = 'Kindergarten Math Curriculum Map for the Whole Year'; }],
  ['a year plan that claims a full year in its description', 'P7', (d) => { d.loc.en.plans[0].metaDescription = d.loc.en.plans[0].metaDescription.replace('(not a full year)', 'for a full year'); }],
  ['a year plan row that is not what its unit says', 'P7', (d) => { d.loc.en.plans[0].units[0].lessons[0] += ' again'; }],
  ['a pack that reviews what its grade teaches later in the year', 'P8', (d) => { const p = d.loc.en.packs.find((x) => x.grade === 'K' && x.position === 'early'); p.blocks[0].point = 'K:combine-groups'; }],
  ['a holiday page in a pack', 'P8', (d) => { d.loc.en.packs[0].blocks[0].core = 'word-problems-easy-christmas-g1213'; }],
  ['a week day that reviews what its grade teaches after its week', 'P8', (d) => { const p = d.loc.en.packs.find((x) => x.grade === 'K' && x.week === 1); p.blocks[0].point = 'K:combine-groups'; }],
  ['a point in two neighbouring week days of a grade', 'P8', (d) => { const a = d.loc.en.packs.find((x) => x.grade === '1' && x.week === 1), b = d.loc.en.packs.find((x) => x.grade === '1' && x.week === 2); b.blocks[0].point = a.blocks[0].point; }],
  ['a week day without its week', 'P8', (d) => { const p = d.loc.en.packs.find((x) => x.week); delete p.week; }],
  ['two pages of one worksheet family in a week day', 'P8', (d) => { const p = d.loc.en.packs.find((x) => x.week); p.blocks[1].type = p.blocks[0].type; }],
  ['two stories in a week day', 'P8', (d) => { const p = d.loc.en.packs.find((x) => x.grade === '2' && x.week); p.blocks[0].type = 'G2-269'; p.blocks[1].type = 'G2-270'; }],
  ['an End-of-the-day type in four week days of a grade', 'P8', (d) => { const ps = d.loc.en.packs.filter((x) => x.grade === '2' && x.week).slice(0, 4); for (const p of ps) p.blocks.find((b) => b.key === 'closing').type = 'G1-148'; }],
  ['a lower-grade type in three Grade 3 blocks of one kind', 'P8', (d) => { const ps = d.loc.en.packs.filter((x) => x.grade === '3' && x.week).slice(0, 3); for (const p of ps) p.blocks.find((b) => b.key === 'logic').type = 'G1-420'; }],
  ['a script that names a picture its page does not show', 'P4', (d) => { const p = d.loc.en.packs.find((x) => x.week); const b = p.blocks.find((x) => !(d.subPages[x.core].pictures.includes('walrus'))); b.script.stuck += ' Point to the walrus.'; }],
  ['a page that does not show what its script names', 'P4', (d) => { const { named, GENERIC, EXAMPLES, DRAWN } = require('../sub-plans/picture-words.js'); for (const p of d.loc.en.packs.filter((x) => x.week)) for (const b of p.blocks) { const pg = d.subPages[b.core]; /* a word the gate also accepts another way (generic, a lesson example, drawn by the type) cannot bite (2026-11-23) */ const w = named([b.script.say, b.script.first, b.script.stuck].join(' ')).find((x) => pg.pictures.includes(x) && !GENERIC[x] && !(EXAMPLES[b.point] || {})[x] && !(DRAWN[b.type] || []).includes(x) && pg.pictures.filter((k) => k === x).length === 1); if (w) { const same = (x) => x === w || x === w + 's' || x === w + 'es' || w === x + 's' || w === x + 'es';   /* the word in every number form (2026-11-23: a page printing "cats" kept the poison from biting) */ d.subPages[b.core] = { pictures: pg.pictures.filter((x) => !same(x)), words: pg.words.filter((x) => !same(x)) }; return; } } throw new Error('no script names a picture of its page'); }],
  ['a week-day script with the answers of the page of another day', 'P4', (d) => { const p = d.loc.en.packs.find((x) => x.week); p.blocks[2].script.stuck += ' For your own reference, on the page for everyone the answers are 3 and 4.'; }],
  ['a page no pack may hand out', 'P8', (d) => { d.loc.en.packs[0].blocks[0].core = [...SKIP_PAGE][0]; }],
  ['a page in two packs of one grade', 'P8', (d) => { const ps = d.loc.en.packs.filter((x) => x.grade === 'K'); ps[1].blocks[0].core = ps[0].blocks[0].core; }],
  ['a pack without a math block', 'P4', (d) => { d.loc.en.packs[0].blocks = d.loc.en.packs[0].blocks.filter((b) => b.key !== 'math'); }],
  ['a script that says nothing aloud', 'P4', (d) => { d.loc.en.packs[0].blocks[1].script.say = 'Introduce the page and explain the task to the class.'; }],
  ['a string that says free', 'P5', (d) => { d.loc.en.uiU.teacherLead = 'Download the whole unit free.'; }],
  ['an ad lesson that says free beside its trick', 'P5', (d) => { const x = d.loc.en.units.flatMap((u) => u.lessons).find((y) => y.point === '2:ad-detective'); x.note.watch += ' This lesson is free.'; }],
  ['a free prize outside the ad lesson', 'P5', (d) => { const x = d.loc.en.units.flatMap((u) => u.lessons).find((y) => y.point && y.point !== '2:ad-detective'); x.note.watch += ' Every child gets a free prize.'; }],
  ['a script that says free', 'P5', (d) => { d.loc.en.packs[0].blocks[0].script.stuck += ' This page is free for everyone.'; }],
  ['an empty string of the page', 'P6', (d) => { d.loc.en.uiS.bundleBtn = ' '; }],
  ['a block kind the ui file does not name', 'P6', (d) => { delete d.loc.en.uiS.block_logic; }],
];

if (process.argv.includes('--poison')) {
  const real = run(load());
  let bad = real.length ? 1 : 0;
  if (real.length) console.log('FAIL  the real files do not pass: ' + real[0]);
  for (const [name, gate, spoil] of POISONS) {
    const d = load();
    spoil(d);
    const hit = run(d).some((f) => f.startsWith(gate));
    if (!hit) { bad++; console.log('FAIL  poison not caught by ' + gate + ': ' + name); }
  }
  console.log(bad ? bad + ' poison problem(s)' : 'all ' + POISONS.length + ' poisons caught, the real files pass');
  process.exit(bad ? 1 : 0);
}
const d = load();
const fails = run(d);
for (const f of fails) console.log('FAIL  ' + f);
const n = Object.values(d.loc).reduce((a, L) => a + L.units.length, 0), m = Object.values(d.loc).reduce((a, L) => a + L.packs.length, 0);
console.log(fails.length ? fails.length + ' failure(s)' : 'units and sub packs: ' + n + ' unit(s), ' + m + ' pack(s) in ' + Object.keys(d.loc).length + ' language(s); all gates pass');
process.exit(fails.length && !process.argv.includes('--warn') ? 1 : 0);
