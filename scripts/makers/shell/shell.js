/**
 * Worksheet maker screen (ARCHITECTURE §4.5 — the first-time flow). Plain ES module, no framework.
 *
 * URL: ?maker=<id>&lang=<locale>[&t=<template>]. Loads the maker's current bundle, its templates.json, its strings for the
 * language and the data files every template reads (preloaded into the platform), then:
 *   gallery (every template offered in this language, each with a live miniature) → the page, already made →
 *   ≤ 7 controls (level · pictures · word · answer key · paper) → New version · Add page · Print or save PDF.
 * The teacher never moves anything on the page (§4.1): every change re-makes the page from its settings.
 */
import * as exportMod from './export.js';
import { toRecipe, fromRecipe, recipeBytes, MAX_RECIPE_BYTES, simplifyStroke } from './recipe.js';
import { resolveVersion } from './resolve-version.js';

const BASE = '/makers';
const params = new URLSearchParams(location.search);
const MAKER = params.get('maker') || 'ten-frames';
const LANG = (params.get('lang') || 'en').slice(0, 2);
const UI = (window.LCS_MAKER_UI[LANG] || window.LCS_MAKER_UI.en);
document.documentElement.lang = LANG;

const $ = (id) => document.getElementById(id);
const el = (tag, attrs = {}, kids = []) => {
  const e = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === 'text') e.textContent = v; else if (k === 'on') Object.entries(v).forEach(([ev, fn]) => e.addEventListener(ev, fn));
    else if (v !== null && v !== undefined && v !== false) e.setAttribute(k, v === true ? '' : v);
  }
  (Array.isArray(kids) ? kids : [kids]).forEach((c) => c && e.append(c));
  return e;
};

let mod, tj, strings, picManifest;
let offeredCount = 0;
/*
 * Saving (ARCHITECTURE §5, §8). A saved worksheet is a recipe pinned to the maker + data version it was made with
 * (makerVersion / dataVersion: the content-hash folders the screen loaded), so it reopens byte for byte.
 *   saved   the teacher's own saved worksheet now on screen: its id, its change counter and the recipe as last saved
 *   shared  a colleague's worksheet opened from a link: read-only; "Save a copy" makes it the teacher's own
 */
let makerVersion = null, dataVersion = null;
const saved = { id: null, rev: 0, json: null };
let shared = null;
/** the published deck this worksheet was opened from (?preset=), informational */
let presetFrom = null;
/** may the teacher change this worksheet / see all of it */
const canEdit = () => isOpen(state.id) && !shared;
const canView = () => isOpen(state.id) || !!shared;
const typeCache = {};
/*
 * Every page has its own template (tpls) and level (lvls) — a worksheet may mix the templates of one maker (operator
 * 2026-11-01). The gallery and the settings change the SELECTED page (active); id / level / theme / unit mirror it
 * (syncActive), so everything that asks "which template" of the screen asks about the selected page. The theme is the
 * teacher's one pick (pickedTheme), resolved per page to what that page's template offers (themeFor).
 */
const state = { id: null, level: 2, theme: null, pickedTheme: null, unit: null, answerKey: false, paper: LANG === 'en' ? 'letter' : 'a4', pages: [1], tpls: [], lvls: [], active: 0, edits: [{}], units: [], texts: [{}], ink: [], border: 'none', pageNumbers: false, more: false };

/*
 * Who may make what (operator ruling 2026-10-31; frontend/lib/quota.ts kind 'make'):
 *   anonymous   → the gallery + one fixed sample page per template; signing in is offered
 *   free account → 3 worksheets a month: "Make this worksheet" spends one; inside an opened worksheet every change is
 *                  free (level, pictures, word, paper, New version, pages) until the tab is closed
 *   subscriber  → everything, unmetered
 * The server is the authority (it counts); the screen only follows it, and fails open the way the server does.
 */
const access = { kind: 'unknown', makesLeft: Infinity };
const openKey = `lcs-maker-open:${MAKER}:${new Date().toISOString().slice(0, 7)}`;
let opened = new Set();
try { opened = new Set(JSON.parse(sessionStorage.getItem(openKey) || '[]')); } catch (e) { /* private window: nothing kept */ }
const keepOpened = () => { try { sessionStorage.setItem(openKey, JSON.stringify([...opened])); } catch (e) { /* not kept */ } };
const isOpen = (id) => access.makesLeft === Infinity || opened.has(id);

async function loadAccess() {
  try {
    const j = await (await fetch('/api/quota/status', { credentials: 'same-origin', cache: 'no-store' })).json();
    access.kind = j.kind || 'unknown';
    access.makesLeft = j.make && typeof j.make.remaining === 'number' ? j.make.remaining : Infinity;
  } catch (e) { /* the server fails open; so does the screen */ }
}

/** Leave the maker for a site page (the maker may sit in a landing page's frame: the whole tab goes). */
function goTo(url) { try { window.top.location.href = url; } catch (e) { location.href = url; } }
const signInUrl = () => `/${LANG}/auth/signin?redirect=${encodeURIComponent(location.pathname + location.search)}`;

/*
 * Pages (operator 2026-10-31): a subscriber's worksheet has up to ten pages; a free account's worksheet has one —
 * no Add page, no Duplicate (both add a page). The screen-side limit is a deterrent like the rest of the free tier: what
 * is counted on the server is the make and the download.
 */
const MAX_PAGES = 10;
const canAddPages = () => access.kind !== 'anon' && access.makesLeft === Infinity;
const pagesFull = () => state.pages.length >= MAX_PAGES;

async function spendMake() {
  const r = await fetch('/api/quota/check-and-increment', { method: 'POST', credentials: 'same-origin', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ kind: 'make' }) });
  if (r.status === 401) return goTo(signInUrl());
  const j = await r.json().catch(() => ({}));
  if (r.status === 402) { access.makesLeft = 0; }
  else { opened.add(state.id); keepOpened(); if (typeof j.remaining === 'number') access.makesLeft = j.remaining; }
  const t = tj.templates.find((x) => x.id === state.id);
  buildControls(t); render();
}

/** The card shown in place of the controls while a template is not opened. */
function accessCard() {
  const card = el('div', { class: 'mk-access' });
  if (access.kind === 'anon') {
    card.append(el('p', { text: UI.signInToMake }), el('button', { type: 'button', class: 'mk-btn mk-primary', text: UI.signIn, on: { click: () => goTo(signInUrl()) } }));
  } else if (access.makesLeft > 0) {
    card.append(el('p', { text: UI.makesLeft.replace('{n}', access.makesLeft) }), el('button', { type: 'button', class: 'mk-btn mk-primary', text: UI.makeThis, on: { click: spendMake } }));
  } else {
    card.append(el('p', { text: UI.noMakesLeft }), el('button', { type: 'button', class: 'mk-btn mk-primary', text: UI.seePlans, on: { click: () => goTo(`/${LANG}/pricing`) } }));
  }
  return card;
}

async function loadType(id) { if (!typeCache[id]) { const m = await mod.templates[id](); typeCache[id] = m.default || m; } return typeCache[id]; }

async function boot() {
  $('mk-name').textContent = (UI.makers && UI.makers[MAKER]) || MAKER;
  document.title = $('mk-name').textContent;
  $('mk-new').textContent = UI.newVersion; $('mk-add').textContent = UI.addPage; $('mk-print').textContent = UI.print; $('mk-pdf').textContent = UI.downloadPdf;
  $('mk-gallery').setAttribute('aria-label', UI.templates);
  $('mk-pages').append(el('p', { class: 'mk-note', text: UI.loading }));
  gateFrame = el('iframe', { title: 'gate', tabindex: '-1' });
  $('mk-gate-host').append(gateFrame);
  let opening = await openingRecipe();
  if (opening === false) return;
  const vj = await fetch(`${BASE}/versions.json`, { cache: 'no-store' }).then((r) => (r.ok ? r.json() : {})).catch(() => ({}));
  const pin = await pinnedVersion(opening && opening.recipe, vj[MAKER]);
  const ver = pin.makerVersion, dv = pin.dataVersion;
  makerVersion = ver; dataVersion = dv;
  [mod, tj, strings] = await Promise.all([
    import(`${BASE}/${MAKER}/${ver}/index.js`),
    fetch(`${BASE}/${MAKER}/${ver}/templates.json`).then((r) => r.json()),
    fetch(`${BASE}/${MAKER}/${ver}/strings.${LANG}.json`).then((r) => (r.ok ? r.json() : {})),
  ]);
  const dm = await (await fetch(`${BASE}/${MAKER}/${ver}/data-manifest.json`)).json();
  const files = {};
  await Promise.all(dm.files.map(async (f) => { files[f] = await (await fetch(`${BASE}/data/${dv}/${f.split('/').map(encodeURIComponent).join('/')}`)).text(); }));
  mod.platform.preload(files);
  // a picture family's files (one per picture) are fetched when a page draws one (runtime.generate)
  if (mod.platform.setFetcher) mod.platform.setFetcher(async (f) => { const r = await fetch(`${BASE}/data/${dv}/${f.split('/').map(encodeURIComponent).join('/')}`); return r.ok ? r.text() : null; });
  picManifest = JSON.parse(files['scripts/worksheet-gen/cache/manifest.json'] || '{"themes":{}}');
  const offered = tj.templates.filter((t) => t.locales.includes(LANG));
  offeredCount = offered.length;
  if (!offered.length) { $('mk-pages').replaceChildren(el('p', { class: 'mk-note', text: UI.notInLanguage })); return; }
  // test hook for scripts/makers/gates/live-gate.js (the same objects the screen uses; nothing a teacher can reach)
  window.__lcsMaker = { mod, tj, strings, LANG, loadType, vocabOf: (theme, noun) => ((((picManifest.themes || {})[theme] || {}).nouns || {})[noun] || {}).vocabKey || null, mount: (html) => mod.mountHtml(gateFrame, html), state: () => JSON.parse(JSON.stringify(state)), version: () => ({ makerVersion, dataVersion }), stringsFor, preset: () => presetFrom,
    // build-thumbs.js: the sample page of template id, made and gated exactly as the screen makes it
    sample: async (id) => { const t = tj.templates.find((x) => x.id === id); const r = await mod.generate({ ...sampleOptions(t), type: await loadType(id) }, (html) => mod.mountHtml(gateFrame, html)); return r.ok ? r.html : null; } };
  await loadAccess();
  document.body.setAttribute('data-print-hint', UI.printHint);
  let want = params.get('t');
  if (opening && opening.preset) {
    // the deck's settings become the first page of a NEW worksheet (unsaved; the access rules apply as to any template)
    const p = opening.preset, t = offered.find((x) => x.id === p.template);
    if (t) {
      want = t.id;
      state.tpls = [t.id]; state.lvls = [levelIn(t, p.level)]; state.pages = [p.variant || 1]; state.units = [unitIn(t, p.unit, levelIn(t, p.level))];
      state.pickedTheme = p.theme && t.themes.includes(p.theme) ? p.theme : null;
      variantCounter = Math.max(variantCounter, p.variant || 1) + 1;
      presetFrom = p;
    }
    opening = null;
  }
  if (opening) {
    Object.assign(state, fromRecipe(opening.recipe));
    variantCounter = Math.max(variantCounter, ...state.pages) + 1;
    // the teacher's own saved worksheet: every template on its pages may be changed (a worksheet may mix templates)
    if (opening.id) { for (const id of state.tpls) opened.add(id); keepOpened(); Object.assign(saved, { id: opening.id, rev: opening.rev }); }
    else shared = { linkId: opening.linkId };
    if (pin && pin.note) $('mk-controls').before(el('p', { class: 'mk-access-note', 'data-note': 'corrected', text: pin.note }));
  }
  choose(opening ? state.id : (offered.find((t) => t.id === want) || offered[0]).id, true);
  if (opening && opening.id) saved.json = JSON.stringify(currentRecipe());
  if (!shared) buildGallery(offered); else $('mk-gallery').hidden = true;
  $('mk-save').textContent = UI.save; $('mk-share').textContent = UI.share; $('mk-mine').textContent = UI.myWorksheets;
  $('mk-mine').hidden = access.kind === 'anon';
  $('mk-mine').addEventListener('click', openMine);
  $('mk-save').addEventListener('click', () => saveNow());
  $('mk-share').addEventListener('click', shareLink);
  // New version is new content: the teacher's picture/word choices belong to the old content and are dropped
  // New version is new content for the SELECTED page only (operator 2026-11-01: it renewed every page); that page's
  // picture/word choices and drawing belong to the old content and are dropped — the other pages stay exactly as they are
  $('mk-new').addEventListener('click', () => {
    const a = state.active;
    if (!copiesDifferAt(a)) return;
    padPages();
    state.pages[a] = nextVariant(); state.edits[a] = {}; state.ink[a] = undefined;
    if (drawingPage === a) drawingPage = null;
    render();
  });
  // Add page: a new page of the selected page's template and level, selected at once — the gallery then changes it to
  // any template of this maker (a worksheet may mix them)
  $('mk-add').addEventListener('click', () => {
    if (!canAddPages() || pagesFull()) return;
    padPages();
    const a = state.active, t = tplOf(a);
    const units = unitsOf(t, state.lvls[a]);
    let unit = null;
    if (units.length) {
      const last = units.findIndex((u) => u.id === state.units[a]);
      const taken = state.units.filter((u, k) => state.tpls[k] === t.id);
      unit = (units.map((_, k) => units[(last + 1 + k) % units.length]).find((u) => !taken.includes(u.id)) || units[(last + 1) % units.length]).id;
    }
    state.pages.push(nextVariant()); state.tpls.push(t.id); state.lvls.push(state.lvls[a]); state.edits.push({}); state.texts.push({}); state.ink.push(undefined); state.units.push(unit);
    selectPage(state.pages.length - 1, true);
  });
  $('mk-print').addEventListener('click', printAll);
  $('mk-pdf').addEventListener('click', downloadPdf);
  $('mk-screen').textContent = screenUi('screenVersion');
  $('mk-screen').addEventListener('click', () => openScreenPreview(Math.max(0, state.pages.findIndex((_, i) => screenAt(tplOf(i), state.lvls[i])))));
}

/* ---------- the screen version (screen-from-marks, INTERACTIVE-AND-SHARING §B; the student page itself is P4) ---------- */

/** the preview's own words (templates.json screenUi, built from i18n/screen-instructions.json) */
const screenUi = (k) => ((tj.screenUi && (tj.screenUi[LANG] || tj.screenUi.en)) || {})[k] || k;
/** does this template's current level have a screen built from its marks? */
const screenAt = (t, level = state.level) => (t.screen === 'marks' || t.screen === 'declared') && (t.screenLevels || []).includes(level);

/**
 * The screen version of page i, built in this browser from the page's own answer marks: the SCREEN build of the page
 * (the same seed and settings the gated page used — its attempt is replayed — with the marks its key carries), read by
 * the engine (scripts/makers/screen.js) inside the gate frame, served with the marks stripped. The teacher's drawing
 * rides on the page; border and page numbers do not (they are paper).
 */
async function screenHtmlFor(i) {
  const r = await pageResult(i);
  if (!r.ok) { const e = new Error('refused'); e.fails = r.fails; throw e; }
  const t = tplOf(i);
  if (!t.screenLevels.includes(state.lvls[i])) throw new Error('no screen at this level');
  const type = await loadType(t.id);
  const strings = tj.runtimeStrings && tj.runtimeStrings[LANG];
  if (!strings) throw new Error('no runtime strings for ' + LANG);
  // runtime.js screenFor: the template's declared screen, else (and on the published face) the screen from its marks;
  // one gate frame — the screen is read after any page still being gated
  const o = { ...pageOptions(i), ...(r.attempt || {}), type, tpl: t, runtimeStrings: strings, marksInstructions: (tj.screenInstructions && tj.screenInstructions[LANG]) || {}, decorate: (h) => withInk(h, i, false) };
  gateQueue = gateQueue.then(() => mod.screenFor(o, (h) => mod.mountHtml(gateFrame, h)));
  return (await gateQueue).html;
}

async function openScreenPreview(i) {
  const t = tplOf(i);
  let dlg = $('mk-picker');
  if (!dlg) { dlg = el('dialog', { id: 'mk-picker', class: 'mk-picker' }); document.body.append(dlg); }
  const head = el('div', { class: 'mk-pick-head' }, [el('h2', { text: screenUi('screenTitle') }), el('button', { type: 'button', class: 'mk-btn', text: UI.close, on: { click: () => dlg.close() } })]);
  const note = el('p', { class: 'mk-pick-note', id: 'mk-pick-note' });
  const host = el('div', { class: 'mk-screen-host' });
  const tabs = el('div', { class: 'mk-screen-tabs', role: 'tablist' });
  if (state.pages.length > 1) for (let k = 0; k < state.pages.length; k++) tabs.append(el('button', { type: 'button', class: 'mk-chip', role: 'tab', 'aria-pressed': String(k === i), text: `${UI.page} ${k + 1}`, on: { click: () => openScreenPreview(k) } }));
  dlg.replaceChildren(head, note, tabs, host);
  // the screen version's own size (the dialog is shared with the pickers, which keep theirs)
  if (!dlg.classList.contains('mk-screen-dialog')) { dlg.classList.add('mk-screen-dialog'); dlg.addEventListener('close', () => dlg.classList.remove('mk-screen-dialog'), { once: true }); }
  if (!dlg.open) dlg.showModal();
  if (!screenAt(t, state.lvls[i])) { note.textContent = t.screen ? screenUi('screenLevelNone') : screenUi('screenNone'); return; }
  note.textContent = UI.loading;
  try {
    const html = await screenHtmlFor(i);
    const f = el('iframe', { class: 'mk-screen-frame', title: screenUi('screenVersion'), srcdoc: html });
    guardFrame(f);
    host.replaceChildren(f);
    note.textContent = '';
  } catch (e) {
    console.warn('screen refused', e.fails || e);
    note.textContent = UI.failed;
  }
}

let variantCounter = 1;
const nextVariant = () => { variantCounter += 1 + Math.floor(Math.random() * 97); return variantCounter; };

function themePicture(theme) {
  const t = picManifest.themes[theme];
  if (!t) return '';
  const n = Object.values(t.nouns).find((x) => x.vocabKey) || Object.values(t.nouns)[0];
  return n ? `/makers-assets/themes-512/${encodeURIComponent(theme)}/${encodeURIComponent(n.files[0])}` : '';
}

const tplOf = (i) => tj.templates.find((x) => x.id === state.tpls[i]);
const levelIn = (t, want) => (t.levels.includes(want) ? want : (t.levels.includes(2) ? 2 : t.levels[0]));
/** the units a page of template t may show at a level (t.unitLevels: a unit that belongs to one level — a Color by Number
 *  design is drawn for its level; makers 2026-11-02) */
const unitsOf = (t, level) => { const u = (t.units && t.units[LANG]) || []; return t.unitLevels ? u.filter((x) => t.unitLevels[x.id] === level) : u; };
const unitIn = (t, want, level) => { const u = level == null ? (t.units && t.units[LANG]) || [] : unitsOf(t, level); return u.length ? (u.some((x) => x.id === want) ? want : u[0].id) : null; };
const baseTheme = (x) => (x || '').replace(/\s+bw(\s+\d+)?$/i, '');
/** the theme a page of template t shows: the teacher's pick, else the same subject in the kind this template offers (a
 *  colouring template offers only black-and-white: animals → animals bw), else the template's first */
function themeFor(t) {
  if (!t.themed) return null;
  const want = state.pickedTheme || state.theme;
  return t.themes.includes(want) ? want : (t.themes.find((x) => baseTheme(x) === baseTheme(want)) || t.themes[0]);
}
/** id / level / theme / unit mirror the selected page */
function syncActive() {
  const a = state.active, t = tplOf(a);
  state.id = t.id; state.level = state.lvls[a]; state.theme = themeFor(t); state.unit = state.units[a] || null;
}
const markGallery = () => document.querySelectorAll('.mk-card').forEach((c) => c.setAttribute('aria-current', String(c.dataset.id === state.id)));

/** does a new copy change page i? (where copies at its level are all the same page there is no New version) */
const copiesDifferAt = (i) => tplOf(i).copiesDiffer.includes(state.lvls[i]);
/** New version renews the selected page: shown only where that page's copies differ (a button that changes nothing is a defect) */
const showNewButton = () => { $('mk-new').hidden = !canEdit() || !copiesDifferAt(state.active); };

/** Select page i: the gallery and the settings now change it. */
function selectPage(i, rerender) {
  state.active = Math.max(0, Math.min(i, state.pages.length - 1));
  syncActive(); markGallery(); buildControls(tplOf(state.active)); showNewButton();
  document.querySelectorAll('.mk-page[data-page]').forEach((p) => p.setAttribute('aria-current', String(Number(p.dataset.page) === state.active)));
  if (rerender) render(true);
}

/**
 * A template from the gallery. The first time (a new worksheet, or a saved one opening) it sets up the pages; after that it
 * changes the SELECTED page only: its template, its level (kept where the new template has it) and its word — its
 * picture/word swaps, typed text and drawing belong to the old template and go.
 */
function choose(id, first) {
  const t = tj.templates.find((x) => x.id === id);
  if (first) {
    if (!state.tpls.length) {
      state.tpls = state.pages.map(() => id);
      state.lvls = state.pages.map(() => levelIn(t, state.level));
      state.units = state.pages.map((_, i) => unitIn(t, state.units[i] || state.unit, state.lvls[i]));
    }
    state.active = 0;
    if (!state.pickedTheme) state.pickedTheme = themeFor(t);
  } else {
    const a = state.active;
    if (state.tpls[a] === id) return;
    padPages();
    state.tpls[a] = id; state.lvls[a] = levelIn(t, state.lvls[a]); state.units[a] = unitIn(t, null, state.lvls[a]);
    state.edits[a] = {}; state.texts[a] = {}; state.ink[a] = undefined;
  }
  drawingPage = null;
  selectPage(state.active, false);
  render(!first);
}

/**
 * What page i is. Where a new copy changes the page (most templates), the pages are different copies of the same
 * settings. Where it does not (a sight word of the day), the pages are consecutive words from the chosen one.
 */
/*
 * A page is five parallel things: its copy (pages), its picture/word swaps (edits), its word (units, one-word templates),
 * its title/instruction (texts) and its drawing (ink). They always move together — never touch one array alone.
 * The optional ones may be shorter than pages (nothing typed, nothing drawn): they are padded to the page count before
 * any move, so a drawing never stays behind on the wrong page.
 */
const PAGE_ARRAYS = ['pages', 'tpls', 'lvls', 'edits', 'units', 'texts', 'ink'];
const clone = (x) => (x === undefined ? undefined : JSON.parse(JSON.stringify(x)));
function padPages() { for (const k of PAGE_ARRAYS) while (state[k].length < state.pages.length) state[k].push(k === 'units' ? null : undefined); }
/* the selected page stays selected through a move / remove / duplicate (the selection follows its page) */
const pageOps = {
  remove(i) { drawingPage = null; padPages(); for (const k of PAGE_ARRAYS) state[k].splice(i, 1); if (state.active > i || state.active >= state.pages.length) state.active = Math.max(0, state.active - 1); },
  duplicate(i) { if (!canAddPages() || pagesFull()) return; drawingPage = null; padPages(); for (const k of PAGE_ARRAYS) state[k].splice(i + 1, 0, clone(state[k][i])); if (state.active > i) state.active++; },
  move(i, j) { if (j < 0 || j >= state.pages.length) return; drawingPage = null; padPages(); for (const k of PAGE_ARRAYS) { const [x] = state[k].splice(i, 1); state[k].splice(j, 0, x); } if (state.active === i) state.active = j; else if (state.active === j) state.active = i; },
};
/** after a page operation the selected page may be another template: the gallery and the settings follow it */
const afterPageOp = () => selectPage(state.active, true);

/**
 * A template's strings at a level: a level that prints its own instruction (and title) uses it — i18n/level-instructions.json
 * (withLevelInstruction), carried in strings.<loc>.json as levels.<n>; a level title replaces the face's print title.
 */
/** answer key pages are made when the teacher asked for them and the template has a key (interactive or print-only) */
const keyAt = (t, level = state.level) => t.interactive || (t.keyLevels || []).includes(level);
const keyOn = (t, level = state.level) => !!state.answerKey && keyAt(t, level);
/** does any page have an answer key at its level? (the answer-key setting is one for the whole worksheet) */
const anyKey = () => state.pages.some((_, i) => keyAt(tplOf(i), state.lvls[i]));

function stringsFor(id, level) {
  const b = strings[id];
  const L = b && b.levels && b.levels[level];
  if (!L) return b;
  const { levels, ...rest } = b;
  const out = { ...rest, instruction: L.instruction };
  if (L.title) { out.title = L.title; delete out.printTitle; }
  return out;
}

/** The strings of page i: the template's at this level, with the teacher's title / instruction when she typed one. */
function pageStrings(i) {
  const base = stringsFor(state.tpls[i], state.lvls[i]);
  const tx = state.texts[i] || {};
  const out = { ...base };
  if (tx.title) { out.title = tx.title; out.printTitle = tx.title; }
  if (tx.instruction) out.instruction = tx.instruction;
  return out;
}

function pageSpec(i) {
  const t = tplOf(i);
  const units = unitsOf(t, state.lvls[i]);
  if (!units.length) return { variant: state.pages[i], unit: null };
  // every page has its own word (chosen in its header); a new copy changes the page only where the template allows it
  return { variant: t.copiesDiffer.includes(state.lvls[i]) ? state.pages[i] : 1, unit: units.some((u) => u.id === state.units[i]) ? state.units[i] : units[0].id };
}

/*
 * Every page is gated before it is shown (ARCHITECTURE §6.2): made, mounted in the off-screen gate frame at the
 * catalogue's 703 × 945 viewport, run through the catalogue's lints + the type's verify, retried, or refused. One page is
 * gated at a time (one frame); results are cached per settings, so re-rendering does not re-gate.
 */
let gateFrame;
let gateQueue = Promise.resolve();
const results = new Map();

/**
 * The SAMPLE page of a template: what a visitor sees before making it, and its gallery thumbnail (scripts/makers/
 * build-thumbs.js draws the thumbnails from exactly this). Level 2 (or the first level), the first theme, the first
 * word, copy 1, the worksheet's own strings.
 */
function sampleOptions(t) {
  const level = t.levels.includes(2) ? 2 : t.levels[0];
  return { strings: stringsFor(t.id, level), locale: LANG, difficulty: level, theme: t.themed ? t.themes[0] : null, unit: unitsOf(t, level)[0] ? unitsOf(t, level)[0].id : null, variant: 1, pageSize: state.paper, answerKey: false, answerKeySuffix: tj.answerKey[LANG] };
}

/** The makePage options of page i (a colleague's shared worksheet is built from its recipe, not the sample). */
function pageOptions(i) {
  const t = tplOf(i);
  const ps = pageSpec(i);
  return canView()
    ? { strings: pageStrings(i), locale: LANG, difficulty: state.lvls[i], theme: themeFor(t), unit: ps.unit, variant: ps.variant, pageSize: state.paper, answerKey: keyOn(t, state.lvls[i]), answerKeySuffix: tj.answerKey[LANG], overrides: state.edits[i] && Object.keys(state.edits[i]).length ? state.edits[i] : null, baseStrings: state.texts[i] && Object.keys(state.texts[i]).length ? stringsFor(state.tpls[i], state.lvls[i]) : null }
    : sampleOptions(t);
}

function pageResult(i) {
  const o = pageOptions(i);
  const id = canView() ? state.tpls[i] : state.id;
  const cacheKey = JSON.stringify([id, o.difficulty, o.theme, o.unit, o.variant, o.pageSize, o.answerKey, o.overrides || null, o.strings.title, o.strings.instruction]);
  if (!results.has(cacheKey)) {
    gateQueue = gateQueue.then(async () => mod.generate({ ...o, type: await loadType(id) }, (html) => mod.mountHtml(gateFrame, html)))
      .catch((e) => ({ ok: false, fails: ['error: ' + e.message] }));
    results.set(cacheKey, gateQueue);
  }
  return results.get(cacheKey);
}

/*
 * The sheet of paper. The page content box is 186 × 250 mm (703 × 945 px, the catalogue's size); the paper around it is
 * US Letter or A4, the margins centred — the same numbers as the page's own @page rule (page/shell.js).
 */
const MM = 96 / 25.4;
const PAPER = { letter: { w: 215.9, h: 279.4 }, a4: { w: 210, h: 297 } };
function paperPx() {
  const p = PAPER[state.paper] || PAPER.a4;
  return { w: Math.round(p.w * MM), h: Math.round(p.h * MM), mx: Math.round(((p.w - 186) / 2) * MM), my: Math.round(((p.h - 250) / 2) * MM) };
}
/*
 * A border is drawn in the paper margin, outside the content box (an outline: it takes no space, so it can never push or
 * cover the page's content, and the page checks — which measure boxes — never see it). Printed with the page.
 */
const BORDERS = { none: '', line: '3px solid', dashed: '3px dashed', dotted: '4px dotted', double: '6px double' };
function withBorder(html) {
  if (!BORDERS[state.border]) return html;
  const off = Math.max(8, Math.min(18, paperPx().mx - 16));
  // a printer never draws into the @page margin (Chrome clips it): with a border the margin moves onto each page itself
  // (the same millimetres, so the content sits where it did; the bottom 1 mm short so rounding never spills a page) and
  // the border lies inside the sheet
  const p = PAPER[state.paper] || PAPER.a4;
  const mx = ((p.w - 186) / 2).toFixed(2), my = ((p.h - 250) / 2).toFixed(2);
  return html.replace('</head>', `<style data-lcs-decor>@page{margin:0}html,body{margin:0}.ws-page{margin:${my}mm ${mx}mm ${(my - 1).toFixed(2)}mm;outline:${BORDERS[state.border]} #3A3530;outline-offset:${off}px}</style></head>`);
}

/*
 * A drawing (ink) is a list of strokes per page, in the page box's own 703 × 945 px coordinates. It is drawn in an svg
 * laid over the page box (absolute: it takes no space, so the page's layout and its gates never see it) and printed with
 * the page. Not on the answer key: the key is the worksheet's, the drawing is the teacher's page.
 */
const INK = { black: '#3A3530', blue: '#2A6FDB', red: '#D9443A', green: '#2E9E5B', orange: '#F28C28' };
const INK_WIDTH = 5;
let drawingPage = null;
let inkColor = 'black';
const strokePath = (pts) => (pts.length === 1 ? `M${pts[0][0]} ${pts[0][1]}l0.1 0` : 'M' + pts.map((p) => p.join(' ')).join('L'));
const inkPathHtml = (st) => `<path d="${strokePath(st.pts)}" stroke="${INK[st.c] || INK.black}"/>`;
const INK_SVG_OPEN = `<svg data-lcs-ink viewBox="0 0 703 945" style="position:absolute;left:0;top:0;width:703px;height:945px;z-index:20;pointer-events:none;overflow:visible" fill="none" stroke-width="${INK_WIDTH}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">`;
function withInk(html, i, always) {
  const strokes = state.ink[i] || [];
  if (!strokes.length && !always) return html;
  const tag = '<div class="ws-page" data-lcs-page>';
  if (!html.includes(tag)) return html;
  return html.replace(tag, tag + INK_SVG_OPEN + strokes.map(inkPathHtml).join('') + '</svg>');
}

/*
 * Page numbers ("2 / 3", the same in every language): in the footer row, after the attribution, in the footer's own
 * small type — it takes no height, so the page's layout and its gates are unchanged. Worksheet pages only, not keys.
 */
function withPageNumber(html, i) {
  if (!state.pageNumbers) return html;
  const tag = '<footer class="ws-foot">';
  const at = html.lastIndexOf('</footer>');
  if (!html.includes(tag) || at < 0) return html;
  return html.slice(0, at) + `<span class="ws-foot-num" data-lcs-page-number style="font-weight:800;color:#3A3530">${i + 1} / ${state.pages.length}</span>` + html.slice(at);
}

async function makeHtml(i, key) {
  const r = await pageResult(i);
  if (!r.ok) { const e = new Error('refused'); e.fails = r.fails; throw e; }
  return withBorder(key ? r.keyHtml : withPageNumber(withInk(r.html, i, drawingPage === i), i));
}

/** Drawing on page i's preview: the svg takes the pointer (mouse, pen, finger); each stroke is kept on lift. */
function attachInk(f, i, onChange) {
  const d = f.contentDocument;
  const svg = d.querySelector('svg[data-lcs-ink]');
  if (!svg) return;
  svg.style.pointerEvents = 'auto';
  svg.style.cursor = 'crosshair';
  svg.style.touchAction = 'none';
  let cur = null;
  const at = (e) => { const r = svg.getBoundingClientRect(); return [Math.round(((e.clientX - r.left) * 703) / r.width * 2) / 2, Math.round(((e.clientY - r.top) * 945) / r.height * 2) / 2]; };
  svg.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    svg.setPointerCapture(e.pointerId);
    cur = { c: inkColor, pts: [at(e)] };
    cur.el = d.createElementNS('http://www.w3.org/2000/svg', 'path');
    cur.el.setAttribute('stroke', INK[inkColor]);
    cur.el.setAttribute('d', strokePath(cur.pts));
    svg.append(cur.el);
  });
  svg.addEventListener('pointermove', (e) => {
    if (!cur) return;
    const p = at(e), q = cur.pts[cur.pts.length - 1];
    if (Math.abs(p[0] - q[0]) + Math.abs(p[1] - q[1]) < 1.5) return;
    cur.pts.push(p);
    cur.el.setAttribute('d', strokePath(cur.pts));
  });
  const end = () => {
    if (!cur) return;
    cur.pts = simplifyStroke(cur.pts);
    cur.el.setAttribute('d', strokePath(cur.pts));
    (state.ink[i] = state.ink[i] || []).push({ c: cur.c, pts: cur.pts });
    updateSaveButtons();
    cur = null;
    onChange();
  };
  svg.addEventListener('pointerup', end);
  svg.addEventListener('pointercancel', end);
}

/**
 * The previews do not hand out their pictures: no right-click "Save image", no long-press save on a tablet, no dragging a
 * picture out. Only a casual deterrent — the addresses are still in the page for anyone with developer tools, and the
 * printed page is not affected (print and PDF are built from the html string, never from these frames).
 */
const NO_SAVE_CSS = 'img,svg image{-webkit-user-drag:none;user-select:none;-webkit-user-select:none;-webkit-touch-callout:none}';
function guardFrame(f) {
  f.addEventListener('load', () => {
    const d = f.contentDocument;
    if (!d) return;
    const st = d.createElement('style');
    st.textContent = NO_SAVE_CSS;
    d.head.append(st);
    d.addEventListener('contextmenu', (e) => e.preventDefault());
    d.addEventListener('dragstart', (e) => e.preventDefault());
  });
}

/** A page's html as the whole sheet of paper (the preview and the image / raster-PDF downloads draw the same sheet). */
function paperDoc(html) {
  const P = paperPx();
  // (with a border the page already carries its margin — withBorder — so no padding is added)
  const pad = /data-lcs-decor/.test(html) ? '0' : `${P.my}px ${P.mx}px`;
  return html.replace('</head>', `<style>html,body{margin:0;background:#fff}body{padding:${pad};box-sizing:border-box;width:${P.w}px;height:${P.h}px;overflow:hidden}</style></head>`);
}

function sheet(html, pageIndex = null, onInk = null) {
  const P = paperPx();
  const box = el('div', { class: 'mk-sheet', style: `aspect-ratio:${P.w} / ${P.h}` });
  // (with a border the page already carries its margin — withBorder — so the preview adds none)
  const shown = paperDoc(html);
  const f = el('iframe', { title: UI.page, srcdoc: shown, scrolling: 'no', style: `width:${P.w}px;height:${P.h}px` });
  guardFrame(f);
  box.append(f);
  if (pageIndex !== null) f.addEventListener('load', () => { const d = f.contentDocument; if (d) d.addEventListener('pointerdown', () => { if (state.active !== pageIndex) selectPage(pageIndex); }); }, { once: true });
  if (onInk) f.addEventListener('load', () => attachInk(f, pageIndex, onInk), { once: true });
  else if (pageIndex !== null) {
    f.addEventListener('load', () => {
      const d = f.contentDocument;
      // the affordance lives only in the on-screen preview (print and PDF are built from the html string, not this frame)
      const st = d.createElement('style');
      st.textContent = '[data-lcs-slot],[data-lcs-title],[data-lcs-instruction]{cursor:pointer;border-radius:10px;transition:box-shadow .12s}[data-lcs-slot]:hover,[data-lcs-slot]:focus-visible,[data-lcs-title]:hover,[data-lcs-title]:focus-visible,[data-lcs-instruction]:hover,[data-lcs-instruction]:focus-visible{box-shadow:0 0 0 3px #F2784B;outline:none}';
      d.head.append(st);
      d.querySelectorAll('[data-lcs-slot],[data-lcs-title],[data-lcs-instruction]').forEach((n) => { n.setAttribute('tabindex', '0'); n.setAttribute('role', 'button'); });
      const go = (e) => {
        const t = e.target.closest && e.target.closest('[data-lcs-title],[data-lcs-instruction]');
        if (t) { e.preventDefault(); return openTextEditor(pageIndex, t.hasAttribute('data-lcs-title') ? 'title' : 'instruction', t.textContent.trim()); }
        const n = e.target.closest && e.target.closest('[data-lcs-slot]'); if (!n) return; e.preventDefault(); const [role, idx] = n.getAttribute('data-lcs-slot').split('.'); openPicker(pageIndex, role, Number(idx));
      };
      d.addEventListener('click', go);
      d.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') go(e); });
    }, { once: true });
  }
  const fit = () => { f.style.transform = `scale(${box.clientWidth / P.w})`; };
  new ResizeObserver(fit).observe(box);
  return box;
}

let renderToken = 0;
async function render(scrollToSelected) {
  const token = ++renderToken;
  const host = $('mk-pages');
  // a sample (template not opened) is one page: the selected one
  if (!canView()) { padPages(); const a = state.active; for (const k of PAGE_ARRAYS) state[k] = [state[k][a]]; state.pages[0] = state.pages[0] || 1; state.edits = [{}]; state.ink = []; state.active = 0; drawingPage = null; }
  const t = tplOf(state.active);
  // a button that changes nothing is a defect: "New version" only where the selected page's copies differ, and
  // "Add page" only where the new page can differ (another copy, the next word) or be switched to another template
  const open = canEdit();
  showNewButton();
  const addable = open && (offeredCount > 1 || copiesDifferAt(state.active) || ((t.units && t.units[LANG]) || []).length > 0);
  $('mk-add').hidden = !addable || !canAddPages();
  $('mk-add').disabled = pagesFull();
  const multi = state.pages.length > 1;
  host.classList.toggle('mk-multi', multi);
  const out = [];
  // answer keys come after ALL the worksheet pages, in page order — the order Print and the PDF use (pdf-parity:
  // the preview showed each key after its page while the print put them all at the end)
  const keys = [];
  let refused = 0;
  $('mk-print').disabled = true;
  for (let i = 0; i < state.pages.length; i++) {
    try {
      const html = await makeHtml(i, false);
      const pt = tplOf(i);
      // with several pages each header names its page's template (pages may use different ones)
      const head = el('div', { class: 'mk-page-head' }, [el('span', { text: `${UI.page} ${i + 1} ${UI.of} ${state.pages.length}` }), multi ? el('span', { class: 'mk-page-tpl', text: cardTitle(pt.id) }) : null]);
      const pageUnits = unitsOf(pt, state.lvls[i]);
      if (canEdit() && pageUnits.length) {
        const sel = el('select', { class: 'mk-select', 'aria-label': `${UI.word} · ${UI.page} ${i + 1}`, on: { change: (e) => { state.units[i] = e.target.value; state.edits[i] = {}; state.texts[i] = {}; state.ink[i] = undefined; drawingPage = null; if (i === state.active) syncActive(); render(); } } });
        for (const u of pageUnits) sel.append(el('option', { value: u.id, selected: u.id === state.units[i], text: u.word }));
        head.append(el('label', { class: 'mk-page-word' }, [el('span', { text: UI.word }), sel]));
      }
      if (canEdit()) {
        const tools = el('span', { class: 'mk-page-tools' });
        const n = state.pages.length;
        tools.append(el('button', { class: 'mk-icon', type: 'button', 'data-act': 'up', title: UI.moveUp, 'aria-label': `${UI.moveUp} · ${UI.page} ${i + 1}`, disabled: i === 0, text: '↑', on: { click: () => { pageOps.move(i, i - 1); afterPageOp(); } } }));
        tools.append(el('button', { class: 'mk-icon', type: 'button', 'data-act': 'down', title: UI.moveDown, 'aria-label': `${UI.moveDown} · ${UI.page} ${i + 1}`, disabled: i === n - 1, text: '↓', on: { click: () => { pageOps.move(i, i + 1); afterPageOp(); } } }));
        tools.append(el('button', { class: 'mk-link', type: 'button', 'data-act': 'image', text: UI.saveImage, on: { click: (e) => saveImage(i, e.currentTarget) } }));
        tools.append(el('button', { class: 'mk-link', type: 'button', 'data-act': 'draw', 'aria-pressed': String(drawingPage === i), text: drawingPage === i ? UI.stopDrawing : UI.draw, on: { click: () => { drawingPage = drawingPage === i ? null : i; render(); } } }));
        if (canAddPages()) tools.append(el('button', { class: 'mk-link', type: 'button', 'data-act': 'duplicate', disabled: pagesFull(), text: UI.duplicatePage, on: { click: () => { pageOps.duplicate(i); afterPageOp(); } } }));
        if (n > 1) tools.append(el('button', { class: 'mk-link', type: 'button', 'data-act': 'remove', text: UI.removePage, on: { click: () => { pageOps.remove(i); afterPageOp(); } } }));
        head.append(tools);
      }
      let inkBar = null, onInk = null;
      if (canEdit() && drawingPage === i) {
        inkBar = el('div', { class: 'mk-ink-bar', role: 'toolbar', 'aria-label': UI.draw });
        const undo = el('button', { type: 'button', class: 'mk-link', 'data-act': 'undo', text: UI.undo });
        const clear = el('button', { type: 'button', class: 'mk-link', 'data-act': 'clear', text: UI.clearDrawing });
        const live = () => inkBar.parentElement && inkBar.parentElement.querySelector('.mk-sheet iframe').contentDocument.querySelector('svg[data-lcs-ink]');
        onInk = () => { undo.disabled = clear.disabled = !(state.ink[i] || []).length; };
        undo.addEventListener('click', () => { const st = state.ink[i] || []; if (!st.length) return; st.pop(); const sv = live(); if (sv && sv.lastElementChild) sv.lastElementChild.remove(); onInk(); updateSaveButtons(); });
        clear.addEventListener('click', () => { state.ink[i] = undefined; const sv = live(); if (sv) sv.replaceChildren(); onInk(); updateSaveButtons(); });
        for (const c of Object.keys(INK)) {
          inkBar.append(el('button', { type: 'button', class: 'mk-ink', 'data-ink': c, 'aria-pressed': String(c === inkColor), 'aria-label': UI['ink_' + c], title: UI['ink_' + c], style: `--ink:${INK[c]}`, on: { click: (e) => { inkColor = c; inkBar.querySelectorAll('.mk-ink').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.ink === c))); } } }));
        }
        inkBar.append(undo, clear);
        onInk();
      }
      // touching a page selects it: the gallery and the settings then change that page
      out.push(el('div', { class: 'mk-page', 'data-page': String(i), 'aria-current': String(i === state.active), on: { pointerdown: () => { if (state.active !== i) selectPage(i); } } }, [head, ...(inkBar ? [inkBar] : []), sheet(html, canEdit() ? i : null, onInk)]));
      if (keyOn(pt, state.lvls[i])) {
        const key = await makeHtml(i, true);
        if (key) keys.push(el('div', { class: 'mk-page' }, [el('div', { class: 'mk-page-head' }, [el('span', { text: `${UI.answerKey} · ${UI.page} ${i + 1}` })]), sheet(key)]));
      }
    } catch (e) {
      // the gate's reasons are for us, not the teacher (they are English): the page says it could not be made
      console.warn('page refused', e.fails || e);
      refused++;
      out.push(el('p', { class: 'mk-note', text: UI.failed }));
    }
  }
  if (token !== renderToken) return;   // a newer render (the teacher clicked again) owns the screen
  // say why a page cannot be added, once, under the pages (a hidden or greyed button explains nothing)
  if (addable && canAddPages() && pagesFull()) out.push(el('p', { class: 'mk-note', 'data-note': 'max-pages', text: UI.maxPages.replace('{n}', MAX_PAGES) }));
  if (addable && !canAddPages() && access.kind !== 'anon') out.push(el('p', { class: 'mk-note', 'data-note': 'pages-plan' }, [UI.morePagesPlan + ' ', el('a', { href: `/${LANG}/pricing`, text: UI.seePlans, on: { click: (e) => { e.preventDefault(); goTo(`/${LANG}/pricing`); } } })]));
  host.replaceChildren(...out, ...keys);
  if (scrollToSelected && multi) { const p = host.querySelector(`.mk-page[data-page="${state.active}"]`); if (p) p.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); }
  // never ship a page that failed a gate: no printing while any page is refused
  $('mk-print').disabled = refused > 0;
  // a sample page is never printed: no Print button at all (a button that cannot be used explains nothing; the card does)
  $('mk-print').hidden = !canView();
  // the screen version: only where this template's level derives one from its marks (templates.json screen / screenLevels)
  $('mk-screen').hidden = !canView() || !state.pages.some((_, i) => screenAt(tplOf(i), state.lvls[i]));
  $('mk-pdf').hidden = !canView() || !showRasterPdf();
  updateSaveButtons();
  $('mk-pdf').disabled = refused > 0;
}

/**
 * The picker for one slot of page i: the type's OWN pool (lib/slot.js records it), pictures as tiles, words as chips.
 * The choice is re-made through the gates; it is kept only if the page applied it AND passed on its own seed — a choice
 * that is already on the page, or that the page cannot carry, is undone with a sentence (ARCHITECTURE §6.2 step 3).
 */
/** a theme's name in the page language (the controls' own rule) */
const themeLabel = (th) => (tj.themeNames && tj.themeNames[LANG] && tj.themeNames[LANG][th]) || th;

async function openPicker(i, role, idx) {
  const r = await pageResult(i);
  const slotInfo = r.ok && r.slots && r.slots[role];
  if (!slotInfo) return;
  const current = slotInfo.values[idx];
  // a free slot (lib/slot.js text(): a group's name the teacher types) opens a text box, not a picker
  if (slotInfo.free) return openSlotText(i, role, idx, current, slotInfo.max || 24);
  let dlg = $('mk-picker');
  if (!dlg) { dlg = el('dialog', { id: 'mk-picker', class: 'mk-picker' }); document.body.append(dlg); }
  // a picture slot is one that carries its theme (lib/slot.js pictures() records it) — whatever the role is called
  // (pic, pic2, row1 …: a page with a picture per card has a role per card); words slots carry none. A MULTI slot
  // (anyPictures(): keys "theme/noun", a list that spans themes) shows each key's own picture
  const multi = !!slotInfo.multi;
  const isPic = !!slotInfo.theme || multi;
  const picTheme = slotInfo.theme || state.theme;
  const split = (key) => { const k = String(key), j = k.indexOf('/'); return multi ? [k.slice(0, j), k.slice(j + 1)] : [picTheme, k]; };
  const imgOf = (key) => { const [th, noun] = split(key); const n = ((picManifest.themes[th] || {}).nouns || {})[noun]; return n ? `/makers-assets/themes-512/${encodeURIComponent(th)}/${encodeURIComponent(n.files[0])}` : null; };
  // a picture already on the page — in this slot or in another card's (a page with a slot per card: row0, pan1 …) —
  // is greyed: the page never shows one picture twice
  const onPage = new Set(Object.values(r.slots).filter((x) => !!x.multi === multi && (x.theme || null) === (slotInfo.theme || null)).flatMap((x) => x.values));
  // a long multi list (any picture of the library) is shown one theme at a time, its themes as chips
  const themesIn = multi ? [...new Set(slotInfo.pool.map((k) => split(k)[0]))] : [];
  const paged = multi && slotInfo.pool.length > 60 && themesIn.length > 1;
  let shown = paged ? (themesIn.includes(split(current)[0]) ? split(current)[0] : themesIn[0]) : null;
  const grid = el('div', { class: isPic ? 'mk-pick-grid' : 'mk-pick-words' });
  const fill = () => {
    grid.replaceChildren();
    for (const key of slotInfo.pool) {
      if (paged && split(key)[0] !== shown) continue;
      const used = onPage.has(key) && key !== current;
      const src = isPic ? imgOf(key) : null;
      const kids = src ? [el('img', { src, alt: split(key)[1], loading: 'lazy' })] : [el('span', { text: multi ? split(key)[1] : key })];
      grid.append(el('button', { type: 'button', class: 'mk-pick', 'aria-pressed': String(key === current), disabled: used, title: multi ? split(key)[1] : key, on: { click: () => choosePick(i, role, idx, key) } }, kids));
    }
    grid.querySelectorAll('img').forEach((im) => { im.addEventListener('contextmenu', (e) => e.preventDefault()); im.draggable = false; });
  };
  const themeChips = paged ? el('div', { class: 'mk-pick-themes', role: 'group', 'aria-label': UI.pictures }, themesIn.map((th) => el('button', { type: 'button', class: 'mk-chip', 'aria-pressed': String(th === shown), text: themeLabel(th), on: { click: (e) => { shown = th; e.currentTarget.parentNode.querySelectorAll('button').forEach((b) => b.setAttribute('aria-pressed', String(b === e.currentTarget))); fill(); } } }))) : null;
  fill();
  dlg.replaceChildren(
    el('div', { class: 'mk-pick-head' }, [el('h2', { text: isPic ? UI.choosePicture : UI.chooseWord }), el('button', { type: 'button', class: 'mk-btn', text: UI.close, on: { click: () => dlg.close() } })]),
    el('p', { class: 'mk-pick-note', id: 'mk-pick-note' }),
    ...(themeChips ? [themeChips] : []),
    grid,
  );
  dlg.querySelectorAll('img').forEach((im) => { im.addEventListener('contextmenu', (e) => e.preventDefault()); im.draggable = false; });
  dlg.showModal();
}

/**
 * Type page i's free slot (a group's name, lib/slot.js text()). Kept only if the page applied it and passed on its own
 * seed; "Original text" brings back the template's own word.
 */
function openSlotText(i, role, idx, current, max) {
  let dlg = $('mk-picker');
  if (!dlg) { dlg = el('dialog', { id: 'mk-picker', class: 'mk-picker' }); document.body.append(dlg); }
  const input = el('input', { class: 'mk-text-input', maxlength: String(max), 'aria-label': UI.editText });
  input.value = current || '';
  const note = el('p', { class: 'mk-pick-note', id: 'mk-pick-note' });
  const save = async (value) => {
    const before = JSON.stringify(state.edits[i] || {});
    const ed = state.edits[i] = JSON.parse(before);
    const v = (value || '').replace(/\s+/g, ' ').trim();
    if (v) (ed[role] = ed[role] || {})[idx] = v; else if (ed[role]) { delete ed[role][idx]; if (!Object.keys(ed[role]).length) delete ed[role]; }
    const r = await pageResult(i);
    const applied = !v || (r.ok && r.slots && r.slots[role] && r.slots[role].values[idx] === v);
    if (!r.ok || !applied) { state.edits[i] = JSON.parse(before); note.textContent = UI.textTooLong; return; }
    dlg.close();
    render();
  };
  dlg.replaceChildren(
    el('div', { class: 'mk-pick-head' }, [el('h2', { text: UI.editText }), el('button', { type: 'button', class: 'mk-btn', text: UI.close, on: { click: () => dlg.close() } })]),
    note, input,
    el('div', { class: 'mk-text-actions' }, [
      el('button', { type: 'button', class: 'mk-link', text: UI.originalText, on: { click: () => save('') } }),
      el('button', { type: 'button', class: 'mk-btn mk-primary', text: UI.save, on: { click: () => save(input.value) } }),
    ]),
  );
  dlg.showModal();
  input.focus();
}

/**
 * Edit page i's title or instruction (ARCHITECTURE §4.4). The page is remade with the text and gated like any page; the
 * text is kept only if the page passes on its own seed (a text that pushes the page out of shape, runs past three lines or
 * claims "free" is refused with a sentence). "Original text" restores the worksheet's own wording.
 */
function openTextEditor(i, field, current) {
  let dlg = $('mk-picker');
  if (!dlg) { dlg = el('dialog', { id: 'mk-picker', class: 'mk-picker' }); document.body.append(dlg); }
  const input = el(field === 'title' ? 'input' : 'textarea', { class: 'mk-text-input', maxlength: field === 'title' ? '80' : '220', rows: '3', 'aria-label': field === 'title' ? UI.editTitle : UI.editInstruction });
  input.value = current;
  const note = el('p', { class: 'mk-pick-note', id: 'mk-pick-note' });
  const save = async (value) => {
    const before = JSON.stringify(state.texts[i] || {});
    const tx = state.texts[i] = JSON.parse(before);
    if (value && value.trim()) tx[field] = value.trim().replace(/\s+/g, ' '); else delete tx[field];
    const r = await pageResult(i);
    // (an edited page keeps its unedited page's attempt — runtime.generate — so a text that needs another seed is refused there)
    if (!r.ok) { state.texts[i] = JSON.parse(before); note.textContent = UI.textTooLong; return; }
    dlg.close();
    render();
  };
  dlg.replaceChildren(
    el('div', { class: 'mk-pick-head' }, [el('h2', { text: field === 'title' ? UI.editTitle : UI.editInstruction }), el('button', { type: 'button', class: 'mk-btn', text: UI.close, on: { click: () => dlg.close() } })]),
    note, input,
    el('div', { class: 'mk-text-actions' }, [
      el('button', { type: 'button', class: 'mk-link', text: UI.originalText, on: { click: () => save('') } }),
      el('button', { type: 'button', class: 'mk-btn mk-primary', text: UI.save, on: { click: () => save(input.value) } }),
    ]),
  );
  dlg.showModal();
  input.focus();
}

async function choosePick(i, role, idx, key) {
  const before = JSON.stringify(state.edits[i] || {});
  const ed = state.edits[i] = JSON.parse(before);
  (ed[role] = ed[role] || {})[idx] = key;
  const r = await pageResult(i);
  // (an edited page keeps its unedited page's attempt — runtime.generate — so only this item can have changed)
  const applied = r.ok && r.slots && r.slots[role] && r.slots[role].values[idx] === key;
  if (!applied) {
    state.edits[i] = JSON.parse(before);
    const note = $('mk-pick-note');
    if (note) note.textContent = r.ok && r.slots && Object.values(r.slots).some((x) => x.values.includes(key)) ? UI.alreadyUsed : UI.doesNotFit;
    return;
  }
  $('mk-picker').close();
  render();
}

function chipGroup(label, values, current, onPick, fmt) {
  const g = el('div', { class: 'mk-group', role: 'group', 'aria-label': label }, [el('span', { class: 'mk-label', text: label })]);
  for (const v of values) g.append(el('button', { type: 'button', class: 'mk-chip', 'aria-pressed': String(v === current), text: fmt ? fmt(v) : String(v), on: { click: () => { onPick(v); } } }));
  return g;
}

function buildControls(t) {
  const c = $('mk-controls');
  if (shared) { c.replaceChildren(sharedCard()); return; }
  if (!isOpen(t.id)) { c.replaceChildren(el('span', { class: 'mk-label', text: UI.sample }), accessCard()); return; }
  const kids = [];
  // with several pages: which page these settings change (the selected page also carries the coral outline)
  if (state.pages.length > 1) kids.push(el('span', { class: 'mk-editing', 'data-editing': String(state.active + 1), text: `${UI.page} ${state.active + 1}` }));
  if (t.levels.length > 1) kids.push(chipGroup(UI.level, t.levels, state.level, (v) => { const a = state.active; if (v !== state.lvls[a]) state.ink[a] = undefined; drawingPage = null; state.lvls[a] = v; if (t.unitLevels) state.units[a] = unitIn(t, state.units[a], v); syncActive(); buildControls(t); render(); }));
  if (t.themed && t.themes.length > 1) {
    const g = el('div', { class: 'mk-group', role: 'group', 'aria-label': UI.pictures }, [el('span', { class: 'mk-label', text: UI.pictures })]);
    // colour or black-and-white: a switch picks which strip is shown (a page uses one theme, never a mix); inside the
    // B&W strip the language's own marker ("SW", "MV", …) is dropped from the names — the switch already says it
    const isBw = (th) => /bw(\s+\d+)?$/i.test(th);
    const bwOn = isBw(state.theme);
    const colorThemes = t.themes.filter((th) => !isBw(th)), bwThemes = t.themes.filter(isBw);
    if (colorThemes.length && bwThemes.length) {
      const sw = el('div', { class: 'mk-switch', role: 'group' });
      for (const [on, label] of [[false, UI.color], [true, UI.blackWhite]]) {
        sw.append(el('button', { type: 'button', class: 'mk-chip', 'aria-pressed': String(on === bwOn), text: label, on: { click: () => {
          if (on === bwOn) return;
          // the same subject in the other kind when it exists (animals → animals bw), else the first of that kind
          const base = state.theme.replace(/\s+bw(\s+\d+)?$/i, '');
          const pool = on ? bwThemes : colorThemes;
          state.theme = pool.find((x) => (on ? x.replace(/\s+bw(\s+\d+)?$/i, '') === base : x === base)) || pool[0];
          state.pickedTheme = state.theme;
          state.edits = state.pages.map(() => ({})); state.ink = []; drawingPage = null;
          buildControls(t); render();
        } } }));
      }
      g.append(sw);
    }
    const row = el('div', { class: 'mk-themes' });
    for (const th of (bwOn ? bwThemes : colorThemes)) {
      const full = (tj.themeNames[LANG] && tj.themeNames[LANG][th]) || th;
      const name = isBw(th) ? full.replace(/\s+(BW|SW|BN|ZW|NB|PB|SV|SH|MV)(?=(\s+\d+)?$)/, '') : full;
      row.append(el('button', { type: 'button', class: 'mk-theme', 'aria-pressed': String(th === state.theme), title: name, on: { click: () => { if (th !== state.theme) { state.edits = state.pages.map(() => ({})); state.ink = []; drawingPage = null; } state.theme = th; state.pickedTheme = th; buildControls(t); render(); } } },
        [el('span', { class: 'mk-theme-pic', style: `background-image:url("${themePicture(th)}")` }), el('span', { class: 'mk-theme-name', text: name })]));
    }
    g.append(row); kids.push(g);
  }
  // one-word templates: the word is chosen per page, in each page's header (render)
  // the rarely changed settings sit behind "More options" (ARCHITECTURE §4.1a F3: the first screen stays small)
  kids.push(el('button', { type: 'button', class: 'mk-more', 'aria-expanded': String(state.more), text: (state.more ? '− ' : '+ ') + UI.moreOptions, on: { click: () => { state.more = !state.more; buildControls(t); } } }));
  if (state.more) {
    const more = el('div', { class: 'mk-more-box' });
    if (anyKey()) more.append(chipGroup(UI.answerKey, [false, true], state.answerKey, (v) => { state.answerKey = v; buildControls(t); render(); }, (v) => (v ? '✓' : '—')));
    more.append(chipGroup(UI.paper, ['letter', 'a4'], state.paper, (v) => { state.paper = v; buildControls(t); render(); }, (v) => UI[v]));
    more.append(chipGroup(UI.pageNumbers, [false, true], state.pageNumbers, (v) => { state.pageNumbers = v; buildControls(t); render(); }, (v) => (v ? '✓' : '—')));
    more.append(chipGroup(UI.border, Object.keys(BORDERS), state.border, (v) => { state.border = v; buildControls(t); render(); }, (v) => UI['border_' + v]));
    kids.push(more);
  }
  c.replaceChildren(...kids);
  // say once that the page can be tapped — only where this template exposes slots (filled in after the first page)
  // the hint names only what this template lets her tap: pictures/words where it has slots, the title + instruction always
  pageResult(state.active).then((r) => { if (r.ok && isOpen(t.id) && !c.querySelector('.mk-tap-hint')) c.append(el('p', { class: 'mk-tap-hint', text: r.slots && Object.keys(r.slots).length ? UI.tapHint : UI.tapHintText })); });
}

/** A gallery card names the worksheet TYPE: the slot for one page's word ({UNIT}, with its ': ' or quotes) is dropped. */
function cardTitle(id) {
  const raw = (strings[id] && (strings[id].printTitle || strings[id].title)) || id;
  return raw.replace(/\s*[:–—-]?\s*[«“„‘”']?\{(UNIT|U|L)\}[»”“’']?/g, '').trim();
}

function buildGallery(offered) {
  const g = $('mk-gallery');
  for (const t of offered) {
    const thumb = el('div', { class: 'mk-thumb' });
    const img = el('img', { src: `${BASE}/${MAKER}/${makerVersion}/thumbs/${LANG}/${t.id}.webp`, alt: '', loading: 'lazy', decoding: 'async', draggable: 'false' });
    img.addEventListener('contextmenu', (e) => e.preventDefault());
    thumb.append(img);
    const card = el('button', { type: 'button', class: 'mk-card', 'data-id': t.id, 'aria-current': String(t.id === state.id), on: { click: () => choose(t.id) } }, [thumb, el('span', { class: 'mk-title', text: cardTitle(t.id) })]);
    g.append(card);
    // the miniature is made when the card scrolls into view (cheap: the same build, scaled down)
    // no built thumbnail (a version built without them): the miniature is made live when the card scrolls into view
    img.addEventListener('error', () => { img.remove(); liveMiniature(); }, { once: true });
    const liveMiniature = () => new IntersectionObserver(async (entries, obs) => {
      if (!entries.some((e) => e.isIntersecting)) return;
      obs.disconnect();
      try {
        const r = mod.makePage({ ...sampleOptions(t), type: await loadType(t.id) });
        const f = el('iframe', { srcdoc: r.html, tabindex: '-1', 'aria-hidden': 'true', scrolling: 'no' });
        guardFrame(f);
        thumb.append(f);
        f.style.transform = `scale(${thumb.clientWidth / 703})`;
      } catch (e) { /* a card whose miniature fails still opens the template */ }
    }, { rootMargin: '200px' }).observe(card);
  }
}

/** All pages (+ answer keys) in one hidden frame, then the browser's print dialog ("Save as PDF" makes a vector PDF). */
/** Every download (print, image, PDF) is one download for the meter; false = not allowed (the screen said why). */
async function spendDownload() {
  if (access.makesLeft !== Infinity || access.kind === 'anon') {
    const r = await fetch('/api/quota/check-and-increment', { method: 'POST', credentials: 'same-origin', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ kind: 'download' }) }).catch(() => null);
    if (r && r.status === 401) { goTo(signInUrl()); return false; }
    if (r && r.status === 402) { $('mk-controls').prepend(el('p', { class: 'mk-access-note', text: UI.noDownloadsLeft })); return false; }
  }
  return true;
}

/** The worksheet's pages (+ answer keys) as html documents, in print order. */
async function allDocs() {
  const docs = [];
  for (let i = 0; i < state.pages.length; i++) docs.push(await makeHtml(i, false));
  for (let i = 0; i < state.pages.length; i++) if (keyOn(tplOf(i), state.lvls[i])) { const k = await makeHtml(i, true); if (k) docs.push(k); }
  return docs;
}

const PAPER_PT = { letter: { wPt: 612, hPt: 792 }, a4: { wPt: 595.28, hPt: 841.89 } };
/** A long job on a button: the button says so and cannot be pressed twice. */
async function busy(btn, job) {
  const label = btn.textContent;
  btn.disabled = true; btn.textContent = UI.preparing;
  try { await job(); } catch (e) { console.error(e); $('mk-controls').prepend(el('p', { class: 'mk-access-note', text: UI.downloadFailed })); }
  finally { btn.disabled = false; btn.textContent = label; }
}

/** "Save as image": page i as a PNG of the whole sheet of paper at 2×. */
async function saveImage(i, btn) {
  if (!isOpen(state.id) || !(await spendDownload())) return;
  await busy(btn, async () => {
    const P = paperPx();
    const canvas = await exportMod.rasterize(paperDoc(await makeHtml(i, false)), { w: P.w, h: P.h, scale: 2 });
    await exportMod.savePng(canvas, exportMod.fileName(pageStrings(i).title, state.pages.length > 1 ? `-${i + 1}.png` : '.png'));
  });
}

/** "Download PDF": every page drawn at 3× and put in a PDF at exact Letter/A4 (the iPad path, §3 / OPEN-DECISIONS 3a). */
async function downloadPdf() {
  if (!canView() || !(await spendDownload())) return;
  await busy($('mk-pdf'), async () => {
    const P = paperPx();
    const canvases = [];
    for (const d of await allDocs()) canvases.push(await exportMod.rasterize(paperDoc(d), { w: P.w, h: P.h, scale: 3 }));
    await exportMod.rasterPdf(canvases, PAPER_PT[state.paper] || PAPER_PT.a4, exportMod.fileName(pageStrings(0).title, '.pdf'), pageStrings(0).title);
  });
}

/*
 * The raster PDF button is shown on iPad / iPhone (where the print sheet may not save a file — spike S1 decides) and
 * with ?pdf=raster for testing on a desktop. Everywhere else Print makes the vector PDF ("Save as PDF").
 */
const isAppleTouch = () => /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
const showRasterPdf = () => params.get('pdf') === 'raster' || isAppleTouch();

async function printAll() {
  if (!canView()) return;
  if (!(await spendDownload())) return;
  const docs = await allDocs();
  // one document: the first page's head + the key layer of a key page (its rules are scoped to .lcs-keypage, so each
  // page keeps its own body class on its wrapper and the worksheet pages show no answers)
  const head = docs[0].match(/<head>([\s\S]*?)<\/head>/)[1];
  const keyCss = docs.map((d) => (d.match(/<style data-lcs-key>[\s\S]*?<\/style>/) || [''])[0]).find(Boolean) || '';
  const pages = docs.map((d) => { const m = d.match(/<body([^>]*)>([\s\S]*?)<\/body>/); return { cls: (m[1].match(/class="([^"]*)"/) || [])[1] || '', body: m[2] }; });
  const html = `<!doctype html><html lang="${LANG}"><head>${head.includes('data-lcs-key') ? head : head + keyCss}<style>.mk-break{break-after:page}.mk-break:last-child{break-after:auto}</style></head><body>${pages.map((p) => `<div class="mk-break ${p.cls}">${p.body}</div>`).join('')}</body></html>`;
  const host = $('mk-print-host');
  const f = el('iframe', { srcdoc: html, title: 'print' });
  host.replaceChildren(f);
  f.addEventListener('load', async () => {
    try { await f.contentDocument.fonts.ready; } catch (e) { /* print anyway */ }
    f.contentWindow.focus();
    f.contentWindow.print();
  }, { once: true });
}

/* ---------- saving: recipes, My worksheets, colleague links (ARCHITECTURE §5, §8) ---------- */

/**
 * ?r=<id> (the teacher's own saved worksheet), ?m=<linkId> (a colleague's link) or ?preset=<deckId> ("Make your own"
 * from a published deck: the deck's template, level, pictures, word and copy — ARCHITECTURE §13 step 3, play/preset.js);
 * null = a new worksheet, false = stop.
 */
async function openingRecipe() {
  const rid = params.get('r'), mid = params.get('m'), pid = params.get('preset');
  if (pid && !rid && !mid) {
    const r = await fetch(`/api/makers/preset/${encodeURIComponent(pid)}`, { cache: 'no-store' }).catch(() => null);
    // a deck the maker cannot open (unknown, or a template the maker has no more) opens the maker as it is
    if (!r || !r.ok) { console.warn('preset not found', pid); return null; }
    const p = await r.json();
    if (p.maker !== MAKER || p.lang !== LANG) {
      const q = new URLSearchParams(location.search); q.set('maker', p.maker); q.set('lang', p.lang);
      location.replace(`${location.pathname}?${q}`);
      return false;
    }
    return { preset: p };
  }
  if (!rid && !mid) return null;
  const r = await fetch(rid ? `/api/makers/recipes/${encodeURIComponent(rid)}` : `/api/makers/links/${encodeURIComponent(mid)}`, { credentials: 'same-origin', cache: 'no-store' }).catch(() => null);
  if (r && r.status === 401) { goTo(signInUrl()); return false; }
  if (!r || !r.ok) { $('mk-pages').replaceChildren(el('p', { class: 'mk-note', text: UI.recipeMissing })); return false; }
  const j = await r.json();
  // a worksheet opens in its own maker and its own language (the link names them, but a recipe is the authority)
  if (j.recipe.maker !== MAKER || j.recipe.lang !== LANG) {
    const q = new URLSearchParams(location.search); q.set('maker', j.recipe.maker); q.set('lang', j.recipe.lang);
    location.replace(`${location.pathname}?${q}`);
    return false;
  }
  return rid ? { recipe: j.recipe, id: rid, rev: j.rev } : { recipe: j.recipe, linkId: mid };
}

/**
 * Which build this screen loads: a new worksheet → the maker's current version with ITS data version (each maker's
 * own, from versions.json — never the last build's shared pointer); a saved one → the version it was made with,
 * unless a content fix on one of its templates re-routes it to the fixed version (resolve-version.js, ruling #5).
 */
async function pinnedVersion(recipe, entry) {
  if (!entry) {
    const text = (u) => fetch(u).then((r) => r.text()).then((s) => s.trim());
    return { makerVersion: await text(`${BASE}/${MAKER}/current.txt`), dataVersion: await text(`${BASE}/data/current.txt`) };
  }
  if (!recipe) return { makerVersion: entry.current, dataVersion: entry.currentData };
  const migrations = await fetch(`${BASE}/migrations/${MAKER}.json`, { cache: 'no-store' }).then((r) => (r.ok ? r.json() : [])).catch(() => []);
  const v = resolveVersion({ recipe, versions: entry, migrations, current: entry.current });
  const last = v.fixes[v.fixes.length - 1];
  const note = last ? UI.correctedNote.replace('{date}', new Date(last.date + 'T12:00:00Z').toLocaleDateString(LANG === 'no' ? 'nb' : LANG, { day: 'numeric', month: 'long', year: 'numeric' })) : null;
  return { makerVersion: v.makerVersion, dataVersion: v.dataVersion, note };
}

/** The worksheet on screen as a recipe (shell/recipe.js). */
function currentRecipe() {
  return toRecipe(state, { maker: MAKER, makerVersion, dataVersion, lang: LANG, title: pageStrings(0).title, themes: state.pages.map((_, i) => themeFor(tplOf(i))) });
}

/** Save and Share are for the teacher's own worksheets; "Saved" while nothing changed since the last save. */
function updateSaveButtons() {
  const mine = canEdit() && access.kind !== 'anon';
  $('mk-save').hidden = $('mk-share').hidden = !mine;
  if (!mine) return;
  const same = !!saved.id && JSON.stringify(currentRecipe()) === saved.json;
  $('mk-save').textContent = same ? UI.saved : UI.save;
  $('mk-save').disabled = same;
}

function showNote(text, key) {
  document.querySelectorAll(`[data-note="${key}"]`).forEach((n) => n.remove());
  $('mk-controls').prepend(el('p', { class: 'mk-access-note', 'data-note': key, text }));
}

/** Save (first time: a new saved worksheet; afterwards: the same one). Returns true when saved. */
async function saveNow() {
  const recipe = currentRecipe();
  if (recipeBytes(recipe) > MAX_RECIPE_BYTES) { showNote(UI.tooBigToSave, 'save'); return false; }
  const json = JSON.stringify(recipe);
  const send = (method, url, body) => fetch(url, { method, credentials: 'same-origin', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) });
  let r = saved.id ? await send('PUT', `/api/makers/recipes/${saved.id}`, { recipe, rev: saved.rev }).catch(() => null) : null;
  // changed in another window since this one loaded it: nothing is overwritten — this version is kept as a new copy
  if (r && r.status === 409) { showNote(UI.savedAsCopy, 'save'); r = null; saved.id = null; }
  if (!r || r.status === 404) {
    if (saved.id) saved.id = null;
    r = await send('POST', '/api/makers/recipes', { recipe }).catch(() => null);
  }
  if (r && r.status === 401) { goTo(signInUrl()); return false; }
  if (r && r.status === 413) { showNote(UI.tooBigToSave, 'save'); return false; }
  if (!r || !r.ok) { showNote(UI.saveFailed, 'save'); return false; }
  const j = await r.json();
  if (j.id) saved.id = j.id;
  saved.rev = j.rev; saved.json = json;
  // the address now reopens this worksheet (a reload, a bookmark)
  const q = new URLSearchParams(location.search); q.set('r', saved.id); q.delete('t'); q.delete('m');
  history.replaceState(null, '', `${location.pathname}?${q}`);
  updateSaveButtons();
  return true;
}

/** Share with a colleague: a read-only link from which she can save her own copy (saves first). */
/*
 * Sharing (INTERACTIVE-AND-SHARING §C.4–C.5, task 2 of the ten). The sheet shows, in this order: the STUDENT link
 * (/s/<id> — the only thing that points at the play page; + QR + copy), the EMBED code (an iframe of the student link
 * with a visible caption OUTSIDE it whose two anchors — the maker's page in this language, the site — are the backlinks,
 * CLAUDE.md §1), the link to this worksheet MAKER (the indexable landing, for colleagues) and the COLLEAGUE link (opens
 * the maker read-only). Every copyable text but the student link targets an indexable page. Its words live in
 * scripts/worksheet-gen/i18n/play-strings.json (`share`), served with the play tree.
 */
const PLAY = '/makers/play';
let playStrings = null, landings = null;
async function shareAssets() {
  if (!playStrings) playStrings = await fetch(`${PLAY}/strings.json`).then((r) => r.json()).catch(() => ({ share: {} }));
  if (!landings) landings = await fetch(`${PLAY}/landings.json`).then((r) => r.json()).catch(() => ({}));
}
const SH = (k) => { const by = playStrings && playStrings.share && playStrings.share[k]; return (by && (by[LANG] || by.en)) || k; };
const escHtml = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
/** `{token}` → html, everything else escaped (the caption's {landing} / {brand} become links) */
const fillHtml = (tpl, parts) => String(tpl).split(/(\{[a-z]+\})/i).map((seg) => { const m = /^\{([a-z]+)\}$/i.exec(seg); return m ? (parts[m[1]] || '') : escHtml(seg); }).join('');
const anyScreen = () => state.pages.some((_, i) => screenAt(tplOf(i), state.lvls[i]));
/** the indexable page this maker's links point back to, in this language (play/makers-index.js → landings.json) */
const landingHere = () => (landings && landings[MAKER] && landings[MAKER][LANG]) || { url: `/${LANG}/tools`, name: (UI.makers && UI.makers[MAKER]) || MAKER };

async function mintLink(kind) {
  const r = await fetch('/api/makers/links', { method: 'POST', credentials: 'same-origin', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ recipeId: saved.id, kind }) }).catch(() => null);
  return r && r.ok ? (await r.json()).linkId : null;
}

/** The embed code: the iframe (the student link, ?embed=1) + the caption outside it with the two backlinks + the deck snippet's resize listener. */
function embedSnippet({ studentUrl, linkId, title, landing }) {
  const origin = location.origin;
  const caption = fillHtml(SH('embedCaption'), {
    landing: `<a href="${escHtml(origin + landing.url)}">${escHtml(landing.name)}</a>`,
    brand: `<a href="${escHtml(origin + '/' + LANG + '/')}">LessonCraftStudio</a>`,
  });
  const fid = 'lcs-s-' + linkId;
  return [
    '<div class="lcs-embed" style="max-width:720px;margin:0 auto">',
    `  <iframe id="${fid}" src="${escHtml(studentUrl)}?embed=1" title="${escHtml(title)}" width="100%" height="900" loading="lazy" style="border:0;border-radius:12px"></iframe>`,
    `  <p style="font:14px/1.4 Nunito,sans-serif;margin:8px 0 0">${caption}</p>`,
    `  <script>(function(){var f=document.getElementById("${fid}");if(!f)return;window.addEventListener("message",function(e){if(!e.data||e.data.type!=="lcs-embed-resize")return;if(e.data.url&&f.src&&e.data.url.split("?")[0]!==f.src.split("?")[0])return;f.style.height=e.data.height+"px";});})();</script>`,
    '</div>',
  ].join('\n');
}

/** a read-only field with its Copy button (the button says "Copied" afterwards) */
function copyRow(value, label, act, multiline) {
  const input = el(multiline ? 'textarea' : 'input', { class: 'mk-text-input mk-share-field', readonly: true, 'aria-label': label, rows: multiline ? '5' : null, ...(multiline ? {} : { type: 'text', value }) });
  if (multiline) input.value = value;
  const copy = el('button', { type: 'button', class: 'mk-btn mk-primary', 'data-act': act, text: multiline ? SH('embedCopy') : UI.copyLink, on: { click: async () => {
    try { await navigator.clipboard.writeText(value); } catch (e) { input.select(); document.execCommand('copy'); }
    copy.textContent = UI.copied;
  } } });
  return el('div', { class: 'mk-share-row' }, [input, copy]);
}

async function shareLink() {
  if (!saved.id || JSON.stringify(currentRecipe()) !== saved.json) { if (!(await saveNow())) return; }
  const [student, colleague] = await Promise.all([mintLink('student'), mintLink('colleague'), shareAssets()]);
  if (!student || !colleague) { showNote(UI.saveFailed, 'save'); return; }
  const origin = location.origin;
  const studentUrl = `${origin}/s/${student}`;
  const colleagueUrl = `${origin}${location.pathname}?maker=${encodeURIComponent(MAKER)}&lang=${LANG}&m=${colleague}`;
  const landing = landingHere();
  const title = pageStrings(0).title;
  let dlg = $('mk-picker');
  if (!dlg) { dlg = el('dialog', { id: 'mk-picker', class: 'mk-picker' }); document.body.append(dlg); }
  const section = (h, note, ...kids) => el('section', { class: 'mk-share-sec' }, [el('h3', { text: h }), note ? el('p', { class: 'mk-share-note', text: note }) : null, ...kids]);
  const qr = el('img', { class: 'mk-share-qr', src: `/api/qr?u=${encodeURIComponent(studentUrl)}`, alt: SH('qrAlt'), width: '160', height: '160', loading: 'lazy' });
  dlg.replaceChildren(
    el('div', { class: 'mk-pick-head' }, [el('h2', { text: UI.share }), el('button', { type: 'button', class: 'mk-btn', text: UI.close, on: { click: () => dlg.close() } })]),
    el('div', { class: 'mk-share' }, [
      section(SH('studentLink'), SH('studentLinkNote') + (anyScreen() ? '' : ' ' + SH('noScreenShare')), el('div', { class: 'mk-share-student' }, [copyRow(studentUrl, SH('studentLink'), 'copy-student'), qr])),
      section(SH('embedTitle'), SH('embedNote'), copyRow(embedSnippet({ studentUrl, linkId: student, title, landing }), SH('embedTitle'), 'copy-embed', true)),
      section(SH('makerLink'), SH('makerLinkNote'), copyRow(origin + landing.url, SH('makerLink'), 'copy-maker')),
      section(SH('colleagueLink'), UI.shareText, copyRow(colleagueUrl, UI.shareTitle, 'copy')),
    ]),
  );
  dlg.showModal();
}

/** A colleague's worksheet: read-only, one card — "Save a copy" makes it hers (a free account: one of her 3 makes). */
function sharedCard() {
  const btn = el('button', { type: 'button', class: 'mk-btn mk-primary', 'data-act': 'save-copy', text: UI.saveCopy, on: { click: saveCopy } });
  return el('div', { class: 'mk-access' }, [el('p', { text: UI.sharedCard }), btn]);
}

async function saveCopy() {
  if (access.kind === 'anon') return goTo(signInUrl());
  if (access.makesLeft !== Infinity) {
    const r = await fetch('/api/quota/check-and-increment', { method: 'POST', credentials: 'same-origin', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ kind: 'make' }) }).catch(() => null);
    if (r && r.status === 401) return goTo(signInUrl());
    if (r && r.status === 402) return showNote(UI.noMakesLeft, 'save');
  }
  const r = await fetch('/api/makers/recipes', { method: 'POST', credentials: 'same-origin', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ recipe: currentRecipe() }) }).catch(() => null);
  if (r && r.status === 401) return goTo(signInUrl());
  if (!r || !r.ok) return showNote(UI.saveFailed, 'save');
  const { id } = await r.json();
  const q = new URLSearchParams(location.search); q.delete('m'); q.set('r', id);
  location.assign(`${location.pathname}?${q}`);
}

/** My worksheets: every worksheet the teacher saved, in any maker — open or delete. */
async function openMine() {
  const r = await fetch('/api/makers/recipes?mine', { credentials: 'same-origin', cache: 'no-store' }).catch(() => null);
  if (r && r.status === 401) return goTo(signInUrl());
  const items = r && r.ok ? (await r.json()).items : [];
  let dlg = $('mk-picker');
  if (!dlg) { dlg = el('dialog', { id: 'mk-picker', class: 'mk-picker' }); document.body.append(dlg); }
  const list = el('ul', { class: 'mk-mine-list' });
  const fmt = (iso) => new Date(iso).toLocaleDateString(LANG === 'no' ? 'nb' : LANG, { day: 'numeric', month: 'short', year: 'numeric' });
  for (const it of items) {
    const href = `${location.pathname}?maker=${encodeURIComponent(it.maker)}&lang=${it.lang}&r=${it.id}`;
    const row = el('li', { class: 'mk-mine-item' }, [
      el('a', { class: 'mk-mine-open', href }, [el('strong', { text: it.title }), el('span', { text: `${(UI.makers && UI.makers[it.maker]) || it.maker} · ${it.lang.toUpperCase()} · ${fmt(it.updatedAt)}` })]),
      el('button', { type: 'button', class: 'mk-link', 'data-act': 'delete', text: UI.deleteWorksheet, on: { click: async () => {
        if (!window.confirm(UI.deleteConfirm.replace('{title}', it.title))) return;
        const d = await fetch(`/api/makers/recipes/${it.id}`, { method: 'DELETE', credentials: 'same-origin' }).catch(() => null);
        if (d && d.ok) { row.remove(); if (it.id === saved.id) { saved.id = null; saved.json = null; updateSaveButtons(); } }
      } } }),
    ]);
    list.append(row);
  }
  dlg.replaceChildren(
    el('div', { class: 'mk-pick-head' }, [el('h2', { text: UI.myWorksheets }), el('button', { type: 'button', class: 'mk-btn', text: UI.close, on: { click: () => dlg.close() } })]),
    items.length ? list : el('p', { class: 'mk-pick-note', text: UI.noSavedYet }),
  );
  dlg.showModal();
}

boot().catch((e) => { console.error(e); $('mk-pages').replaceChildren(el('p', { class: 'mk-note', text: UI.failed })); });
