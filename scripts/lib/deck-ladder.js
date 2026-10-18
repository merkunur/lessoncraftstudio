/**
 * deck-ladder.js — the ONE place the deck-page LADDER strip exists
 * (Level Sets v2, 2026-10-15; operator decision: the ladder must be visible
 * where teachers arrive, and the deck page is the #1 entry surface — 22,443
 * of 68,803 sessions in the 28 days to 2026-10-15 began on one).
 *
 *   Level Set · Level 1 of 3   [1 Easy · 5] [2 Core · 6] [3 Hard · 5]   See the whole set →
 *   More pages at this level: Beach · Camping · Fruits · Tools
 *
 * WHAT A LADDER IS. One worksheet-gen FACE (the catalogue id every such slug
 * ends with — `…-g1245`, `…-g1245-3`) and its pages by rung: `easy`
 * (manifest.exercise_mode 'easy'), `core` (null — the published page and its
 * copies), `hard` ('hard'). A ladder needs ≥ 2 pages. This mirrors
 * frontend/lib/level-sets.ts (rungOf / copy / eligibility) — keep in step.
 *
 * ARCHITECTURE (the site-chrome rule, scripts/lib/site-chrome.js): one
 * producer — scripts/publish-cli/inject-deck-ladder.js (retrofit + the
 * publish-wave forward path). No emitter in the worksheet-gen deck-html
 * emitter: the strip needs the SIBLINGS, which exist only once the whole wave
 * is on disk, so it is a post-publish injection by construction.
 *
 * SEO. Additive block in <body>; <head>, <title>, meta, canonical, h1 untouched.
 * Links go to the (noindex) set page and to sibling deck pages — internal
 * links only go UP. The 29 app decks carry no ladder and are never touched.
 *
 * STRINGS: frontend/messages/<locale>.json `deckLadder.*` + `levelSets.core`
 * (the core level word) + the taxonomy's exercise-mode names for easy/hard.
 *
 * ONE marker pair, ONE anchor, ONE strip regex, same inverse discipline as
 * deck-actions.js: `--remove` is byte-exact, `--rewrite` idempotent.
 */
'use strict';

const fs = require('fs');
const path = require('path');
const siteChrome = require('./site-chrome');

const REPO_ROOT = siteChrome.REPO_ROOT;
const LOCALES = siteChrome.LOCALES;
const CANONICAL_BASE = siteChrome.CANONICAL_BASE;
const MESSAGES_DIR = path.join(REPO_ROOT, 'frontend', 'messages');
const TAXONOMY_PATH = path.join(REPO_ROOT, 'frontend', 'config', 'topics-taxonomy.json');
const escapeHtml = siteChrome.escapeHtml;

// ---------------------------------------------------------------------------
// Markers / anchor
// ---------------------------------------------------------------------------

const MARKER = 'id="lcs-deck-ladder"';
const START = '<!--LCS_DECK_LADDER_START-->';
const END = '<!--LCS_DECK_LADDER_END-->';
/** NON-GREEDY, both sentinels, leading `\n?` only (see deck-actions.js). */
const STRIP_RE = /\n?<!--LCS_DECK_LADDER_START-->[\s\S]*?<!--LCS_DECK_LADDER_END-->/g;
/** Every worksheet-gen deck page: <h1> → <p class="lcs-instruction"> → <div class="lcs-worksheet"> (measured 2026-10-15). */
const ANCHOR = '<div class="lcs-worksheet">';

/** Route segments frozen into the strip — the test asserts the Next routes still exist. */
const SETS_SEGMENT = 'sets';
const WORKSHEETS_SEGMENT = 'worksheets';

const RUNGS = ['easy', 'core', 'hard'];
const MAX_SIBLINGS = 4;

// ---------------------------------------------------------------------------
// The model (mirror of frontend/lib/level-sets.ts)
// ---------------------------------------------------------------------------

/** `g1245-3` → { code: 'g1245', copy: 3 }; `g1245` → copy 1; null when not a face id. */
function parseVariantId(variantId) {
  const m = /^((?:k|g\d)\d{3})(?:-(\d+))?$/.exec(String(variantId || ''));
  if (!m) return null;
  return { code: m[1], copy: m[2] ? Number(m[2]) : 1 };
}

/** Fallback when a manifest has no variant_id: the slug tail. */
function parseSlugCode(slug) {
  const m = /-((?:k|g\d)\d{3})(?:-(\d+))?$/.exec(String(slug || ''));
  if (!m) return null;
  return { code: m[1], copy: m[2] ? Number(m[2]) : 1 };
}

function rungOf(exerciseMode) {
  if (exerciseMode == null || exerciseMode === '') return 'core';
  if (exerciseMode === 'easy') return 'easy';
  if (exerciseMode === 'hard') return 'hard';
  return null;
}

/** manifest.theme ('zoo animals', 'animals bw 2') → taxonomy axis key. Verbatim emit/manifest.js themeAxisKey. */
function themeAxisKey(cacheTheme) {
  if (!cacheTheme) return null;
  return String(cacheTheme).trim().toLowerCase().replace(/\s+/g, '_');
}

/**
 * A deck's ladder facts, from its manifest + what the walk knows.
 * @param {object} manifest
 * @param {string} slug  canonical slug (the symlink / PDF stem)
 * @returns {null|{slug,code,copy,rung,theme,indexable,title,exerciseType}}
 */
function factsOf(manifest, slug) {
  if (!manifest || typeof manifest !== 'object') return null;
  const v = parseVariantId(manifest.variant_id) || parseSlugCode(slug);
  if (!v) return null;
  const rung = rungOf(manifest.exercise_mode);
  if (!rung) return null;
  const title = manifest.title && typeof manifest.title === 'object'
    ? (manifest.title[String(manifest.language || '').slice(0, 2)] || manifest.title.en || Object.values(manifest.title)[0] || '')
    : (typeof manifest.title === 'string' ? manifest.title : '');
  return {
    slug: slug,
    code: v.code,
    copy: v.copy,
    rung: rung,
    theme: manifest.theme || null,
    indexable: manifest.indexable !== false,
    title: title,
    exerciseType: manifest.exercise_type || null,
  };
}

/**
 * Group facts into ladders (≥ 2 pages). Returns Map<code, ladder>,
 * ladder = { code, exerciseType, pages: {easy:[],core:[],hard:[]}, total }.
 */
function buildLadders(facts) {
  const byCode = new Map();
  for (const f of facts) {
    if (!f) continue;
    let l = byCode.get(f.code);
    if (!l) { l = { code: f.code, exerciseType: f.exerciseType, pages: { easy: [], core: [], hard: [] }, total: 0 }; byCode.set(f.code, l); }
    l.pages[f.rung].push(f);
    l.total++;
  }
  for (const [code, l] of byCode) {
    if (l.total < 2) { byCode.delete(code); continue; }
    for (const r of RUNGS) {
      l.pages[r].sort((a, b) => (Number(b.indexable) - Number(a.indexable)) || (a.copy - b.copy) || (a.slug < b.slug ? -1 : a.slug > b.slug ? 1 : 0));
      // Position within the rung (1-based). Themeless copies are numbered ONCE across levels by the
      // generator (easy 7, 8, 9 …), which reads as nonsense to a teacher — labels use the position.
      l.pages[r].forEach((p, i) => { p.pos = i + 1; p.rungSize = l.pages[r].length; });
    }
  }
  return byCode;
}

// ---------------------------------------------------------------------------
// i18n
// ---------------------------------------------------------------------------

const STRING_SPEC = {
  heading:   { key: 'deckLadder.heading',   fallbackEn: 'This worksheet is part of a Level Set' },
  levelOf:   { key: 'deckLadder.levelOf',   fallbackEn: 'Level {n} of {total}' },
  morePages: { key: 'deckLadder.morePages', fallbackEn: 'More pages at this level' },
  openSet:   { key: 'deckLadder.openSet',   fallbackEn: 'See the whole set' },
  core:      { key: 'levelSets.core',       fallbackEn: 'Core' },
  setWord:   { key: 'levelSets.setWord',    fallbackEn: 'Set {n}' },
  levelSets: { key: 'levelSets.heading',    fallbackEn: 'Level Sets' },
};

const _msgCache = new Map();
function loadMessages(locale) {
  if (_msgCache.has(locale)) return _msgCache.get(locale);
  let obj = {};
  try { obj = JSON.parse(fs.readFileSync(path.join(MESSAGES_DIR, locale + '.json'), 'utf8')); } catch (_e) { obj = {}; }
  _msgCache.set(locale, obj);
  return obj;
}
function dotGet(obj, dotPath) {
  return dotPath.split('.').reduce((a, k) => (a && typeof a === 'object' ? a[k] : undefined), obj);
}

const _stringsCache = new Map();
/** Every strip string for a locale, RAW (escaped at emit). Fallback: locale → en → hardcoded EN. */
function strings(locale) {
  if (_stringsCache.has(locale)) return _stringsCache.get(locale);
  const msgs = loadMessages(locale);
  const en = locale === 'en' ? msgs : loadMessages('en');
  const out = {};
  for (const name of Object.keys(STRING_SPEC)) {
    const spec = STRING_SPEC[name];
    let v = dotGet(msgs, spec.key);
    if (typeof v !== 'string' || !v) v = dotGet(en, spec.key);
    if (typeof v !== 'string' || !v) v = spec.fallbackEn;
    out[name] = v;
  }
  _stringsCache.set(locale, out);
  return out;
}

let _taxonomy = null;
function taxonomy() {
  if (!_taxonomy) _taxonomy = JSON.parse(fs.readFileSync(TAXONOMY_PATH, 'utf8'));
  return _taxonomy;
}

/** The level word of a rung in a locale: taxonomy exercise-mode names for easy/hard, levelSets.core for core. */
function rungWord(rung, locale) {
  if (rung === 'core') return strings(locale).core;
  const e = taxonomy().axes['exercise-mode'][rung];
  return (e && e.name && (e.name[locale] || e.name.en)) || (rung === 'easy' ? 'Easy' : 'Hard');
}

/** Localized theme name for a manifest theme, or null. */
function themeName(theme, locale) {
  const key = themeAxisKey(theme);
  if (!key) return null;
  const e = taxonomy().axes.theme[key];
  return (e && e.name && (e.name[locale] || e.name.en)) || null;
}

function fill(template, vars) {
  return String(template).replace(/\{(\w+)\}/g, (m, k) => (k in vars ? String(vars[k]) : m));
}

// ---------------------------------------------------------------------------
// URLs
// ---------------------------------------------------------------------------

function setUrl(locale, code) {
  return CANONICAL_BASE + '/' + locale + '/' + WORKSHEETS_SEGMENT + '/' + SETS_SEGMENT + '/' + code;
}
/**
 * Where a set lives since 2026-10-18: a sub-category of its type on the hub (mirrors
 * frontend/lib/level-sets.ts setHref; params in buildFilterUrl's alphabetical order).
 * setUrl stays for the ~108k deck strips already baked — that route 308s here.
 */
function hubSetUrl(locale, type, code) {
  return CANONICAL_BASE + '/' + locale + '/' + WORKSHEETS_SEGMENT + '?set=' + encodeURIComponent(code) + '&type=' + encodeURIComponent(type);
}
/** Deck pages are nginx URLs with a trailing slash (§15.7). */
function deckUrl(locale, slug) {
  return CANONICAL_BASE + '/' + locale + '/decks/' + slug + '/';
}

// ---------------------------------------------------------------------------
// CSS + markup
// ---------------------------------------------------------------------------

function cssRules() {
  return [
    '#lcs-deck-ladder{display:flex;flex-direction:column;gap:6px;margin:0 auto 10px;padding:8px 12px;max-width:900px;',
    'box-sizing:border-box;border:2px solid #DCE1E6;border-radius:14px;background:#FFF;font-family:inherit;font-size:14px;line-height:1.3;color:#1C1C1E}',
    '#lcs-deck-ladder .lcs-dl-row{display:flex;flex-wrap:wrap;align-items:center;gap:6px 8px}',
    '#lcs-deck-ladder .lcs-dl-head{font-weight:700;color:#146B5E;margin-right:2px}',
    '#lcs-deck-ladder .lcs-dl-rung{display:inline-flex;align-items:center;gap:6px;min-height:40px;padding:0 12px 0 5px;border-radius:999px;',
    'border:2px solid #146B5E;background:#FFF;color:#146B5E;font-weight:700;text-decoration:none;white-space:nowrap;box-sizing:border-box}',
    '#lcs-deck-ladder .lcs-dl-rung b{display:inline-grid;place-items:center;width:26px;height:26px;border-radius:50%;background:#146B5E;color:#FBF3E4;font-size:12px;font-weight:800}',
    '#lcs-deck-ladder .lcs-dl-rung i{font-style:normal;font-weight:600;color:#4E5F5B}',
    '#lcs-deck-ladder .lcs-dl-rung[aria-current="true"]{background:#146B5E;color:#FBF3E4}',
    '#lcs-deck-ladder .lcs-dl-rung[aria-current="true"] b{background:#FBF3E4;color:#146B5E}',
    '#lcs-deck-ladder .lcs-dl-rung[aria-current="true"] i{color:#DCEAE6}',
    '#lcs-deck-ladder .lcs-dl-rung:hover{background:#E3EEEB}',
    '#lcs-deck-ladder .lcs-dl-rung[aria-current="true"]:hover{background:#0F5A4E}',
    '#lcs-deck-ladder .lcs-dl-all{margin-left:auto;display:inline-flex;align-items:center;min-height:40px;font-weight:700;color:#9A4521;text-decoration:none;white-space:nowrap}',
    '#lcs-deck-ladder .lcs-dl-all:hover{text-decoration:underline}',
    '#lcs-deck-ladder .lcs-dl-more{font-size:13px;color:#4E5F5B}',
    '#lcs-deck-ladder .lcs-dl-more a{color:#146B5E;font-weight:600;text-decoration:none}',
    '#lcs-deck-ladder .lcs-dl-more a:hover{text-decoration:underline}',
    '#lcs-deck-ladder a:focus-visible{outline:3px solid #146B5E;outline-offset:2px}',
    /* ---- HIDE STATES (all three mandatory on deck pages; see site-chrome.js) ---- */
    '@media print{#lcs-deck-ladder{display:none!important}}',
    'body.lcs-embedded #lcs-deck-ladder{display:none!important}',
    '@media (max-width:1024px) and (orientation:landscape){body.lcs-worksheet-landscape #lcs-deck-ladder{display:none!important}}',
  ].join('');
}

/** Label of a sibling page: its localized theme, else "Set N" by position within its level, else its title. */
function pageLabel(p, locale) {
  const tn = themeName(p.theme, locale);
  if (tn) return tn;
  if (p.pos && p.rungSize > 1) return fill(strings(locale).setWord, { n: p.pos });
  return p.title || p.slug;
}

/**
 * Build the sentinel-wrapped block for ONE page of a ladder.
 * @param {{locale:string, slug:string}} o
 * @param {object} ladder  from buildLadders
 * @returns {string}
 */
function block(o, ladder) {
  if (!o || !o.locale || !o.slug) throw new Error('deck-ladder.block: locale and slug are required');
  if (!ladder || !ladder.pages) throw new Error('deck-ladder.block: ladder is required');
  const locale = o.locale;
  const s = strings(locale);
  const present = RUNGS.filter((r) => ladder.pages[r].length > 0);
  let mine = null;
  for (const r of present) if (ladder.pages[r].some((p) => p.slug === o.slug)) { mine = r; break; }
  if (!mine) throw new Error('deck-ladder.block: ' + o.slug + ' is not a page of ladder ' + ladder.code);
  const n = present.indexOf(mine) + 1;
  const set = setUrl(locale, ladder.code);

  const rungs = present.map((r, i) => {
    const cur = r === mine;
    return '<a class="lcs-dl-rung" href="' + escapeHtml(set + '#level-' + r) + '"' + (cur ? ' aria-current="true"' : '') + '>' +
      '<b>' + (i + 1) + '</b>' + escapeHtml(rungWord(r, locale)) + '<i>' + ladder.pages[r].length + '</i></a>';
  }).join('');

  const siblings = ladder.pages[mine].filter((p) => p.slug !== o.slug).slice(0, MAX_SIBLINGS);
  const more = siblings.length
    ? '<p class="lcs-dl-more">' + escapeHtml(s.morePages) + ': ' +
      siblings.map((p) => '<a href="' + escapeHtml(deckUrl(locale, p.slug)) + '">' + escapeHtml(pageLabel(p, locale)) + '</a>').join(' · ') +
      '</p>'
    : '';

  return START +
    '<style id="lcs-deck-ladder-css">' + cssRules() + '</style>' +
    '<nav id="lcs-deck-ladder" aria-label="' + escapeHtml(s.heading) + '">' +
    '<div class="lcs-dl-row">' +
    '<span class="lcs-dl-head">' + escapeHtml(s.levelSets) + ' · ' + escapeHtml(fill(s.levelOf, { n: n, total: present.length })) + '</span>' +
    rungs +
    '<a class="lcs-dl-all" href="' + escapeHtml(set) + '">' + escapeHtml(s.openSet) + ' →</a>' +
    '</div>' + more + '</nav>' +
    END;
}

module.exports = {
  LOCALES, CANONICAL_BASE, REPO_ROOT, MESSAGES_DIR,
  MARKER, START, END, STRIP_RE, ANCHOR, SETS_SEGMENT, WORKSHEETS_SEGMENT, RUNGS, MAX_SIBLINGS,
  STRING_SPEC, escapeHtml, strings, rungWord, themeName, themeAxisKey,
  parseVariantId, parseSlugCode, rungOf, factsOf, buildLadders,
  setUrl, hubSetUrl, deckUrl, cssRules, pageLabel, block,
};
