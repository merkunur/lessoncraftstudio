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
/*
 * Saving (ARCHITECTURE §5, §8). A saved worksheet is a recipe pinned to the maker + data version it was made with
 * (makerVersion / dataVersion: the content-hash folders the screen loaded), so it reopens byte for byte.
 *   saved   the teacher's own saved worksheet now on screen: its id, its change counter and the recipe as last saved
 *   shared  a colleague's worksheet opened from a link: read-only; "Save a copy" makes it the teacher's own
 */
let makerVersion = null, dataVersion = null;
const saved = { id: null, rev: 0, json: null };
let shared = null;
/** may the teacher change this worksheet / see all of it */
const canEdit = () => isOpen(state.id) && !shared;
const canView = () => isOpen(state.id) || !!shared;
const typeCache = {};
const state = { id: null, level: 2, theme: null, unit: null, answerKey: false, paper: LANG === 'en' ? 'letter' : 'a4', pages: [1], edits: [{}], units: [], texts: [{}], ink: [], border: 'none', pageNumbers: false, more: false };

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
  const opening = await openingRecipe();
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
  picManifest = JSON.parse(files['scripts/worksheet-gen/cache/manifest.json'] || '{"themes":{}}');
  const offered = tj.templates.filter((t) => t.locales.includes(LANG));
  if (!offered.length) { $('mk-pages').replaceChildren(el('p', { class: 'mk-note', text: UI.notInLanguage })); return; }
  // test hook for scripts/makers/gates/live-gate.js (the same objects the screen uses; nothing a teacher can reach)
  window.__lcsMaker = { mod, tj, strings, LANG, loadType, mount: (html) => mod.mountHtml(gateFrame, html), state: () => JSON.parse(JSON.stringify(state)), version: () => ({ makerVersion, dataVersion }), stringsFor,
    // build-thumbs.js: the sample page of template id, made and gated exactly as the screen makes it
    sample: async (id) => { const t = tj.templates.find((x) => x.id === id); const r = await mod.generate({ ...sampleOptions(t), type: await loadType(id) }, (html) => mod.mountHtml(gateFrame, html)); return r.ok ? r.html : null; } };
  await loadAccess();
  document.body.setAttribute('data-print-hint', UI.printHint);
  const want = params.get('t');
  if (opening) {
    Object.assign(state, fromRecipe(opening.recipe));
    variantCounter = Math.max(variantCounter, ...state.pages) + 1;
    if (opening.id) { opened.add(state.id); keepOpened(); Object.assign(saved, { id: opening.id, rev: opening.rev }); }
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
  $('mk-new').addEventListener('click', () => { state.pages = state.pages.map(() => nextVariant()); state.edits = state.pages.map(() => ({})); state.ink = []; drawingPage = null; render(); });
  $('mk-add').addEventListener('click', () => {
    if (!canAddPages() || pagesFull()) return;
    state.pages.push(nextVariant()); state.edits.push({}); state.texts.push({});
    const t = tj.templates.find((x) => x.id === state.id);
    const units = (t.units && t.units[LANG]) || [];
    if (units.length) {
      const last = units.findIndex((u) => u.id === state.units[state.units.length - 1]);
      const next = units.map((_, k) => units[(last + 1 + k) % units.length]).find((u) => !state.units.includes(u.id)) || units[(last + 1) % units.length];
      state.units.push(next.id);
    }
    render();
  });
  $('mk-print').addEventListener('click', printAll);
  $('mk-pdf').addEventListener('click', downloadPdf);
  $('mk-screen').textContent = screenUi('screenVersion');
  $('mk-screen').addEventListener('click', () => openScreenPreview(0));
}

/* ---------- the screen version (screen-from-marks, INTERACTIVE-AND-SHARING §B; the student page itself is P4) ---------- */

/** the preview's own words (templates.json screenUi, built from i18n/screen-instructions.json) */
const screenUi = (k) => ((tj.screenUi && (tj.screenUi[LANG] || tj.screenUi.en)) || {})[k] || k;
/** does this template's current level have a screen built from its marks? */
const screenAt = (t) => t.screen === 'marks' && (t.screenLevels || []).includes(state.level);

/**
 * The screen version of page i, built in this browser from the page's own answer marks: the SCREEN build of the page
 * (the same seed and settings the gated page used — its attempt is replayed — with the marks its key carries), read by
 * the engine (scripts/makers/screen.js) inside the gate frame, served with the marks stripped. The teacher's drawing
 * rides on the page; border and page numbers do not (they are paper).
 */
async function screenHtmlFor(i) {
  const r = await pageResult(i);
  if (!r.ok) { const e = new Error('refused'); e.fails = r.fails; throw e; }
  const t = tj.templates.find((x) => x.id === state.id);
  const type = await loadType(state.id);
  const made = mod.makePage({ ...pageOptions(i), ...(r.attempt || {}), type, screen: true });
  const html = withInk(made.screenHtml, i, false);
  const strings = tj.runtimeStrings && tj.runtimeStrings[LANG];
  const instructions = (tj.screenInstructions && tj.screenInstructions[LANG]) || {};
  if (!strings) throw new Error('no runtime strings for ' + LANG);
  // one gate frame: the screen is read after any page still being gated
  gateQueue = gateQueue.then(() => mod.screen.buildScreen({ html, locale: LANG, strings, instruction: (pl) => instructions[mod.screen.instructionKey(pl)] || '', mount: (h) => mod.mountHtml(gateFrame, h) }));
  const sc = await gateQueue;
  if (!t.screenLevels.includes(state.level)) throw new Error('no screen at this level');
  return sc.html;
}

async function openScreenPreview(i) {
  const t = tj.templates.find((x) => x.id === state.id);
  let dlg = $('mk-picker');
  if (!dlg) { dlg = el('dialog', { id: 'mk-picker', class: 'mk-picker' }); document.body.append(dlg); }
  const head = el('div', { class: 'mk-pick-head' }, [el('h2', { text: screenUi('screenTitle') }), el('button', { type: 'button', class: 'mk-btn', text: UI.close, on: { click: () => dlg.close() } })]);
  const note = el('p', { class: 'mk-pick-note', id: 'mk-pick-note' });
  const host = el('div', { class: 'mk-screen-host' });
  const tabs = el('div', { class: 'mk-screen-tabs', role: 'tablist' });
  if (state.pages.length > 1) for (let k = 0; k < state.pages.length; k++) tabs.append(el('button', { type: 'button', class: 'mk-chip', role: 'tab', 'aria-pressed': String(k === i), text: `${UI.page} ${k + 1}`, on: { click: () => openScreenPreview(k) } }));
  dlg.replaceChildren(head, note, tabs, host);
  if (!dlg.open) dlg.showModal();
  if (!screenAt(t)) { note.textContent = t.screen ? screenUi('screenLevelNone') : screenUi('screenNone'); return; }
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

function choose(id, first) {
  const t = tj.templates.find((x) => x.id === id);
  state.id = id;
  if (!t.levels.includes(state.level)) state.level = t.levels.includes(2) ? 2 : t.levels[0];
  // the theme the teacher picked, else the same subject in the kind this template offers (a colouring template offers
  // only black-and-white: animals → animals bw), else the first; going back to a colour template restores her pick
  if (t.themed) {
    const want = state.pickedTheme || state.theme;
    const base = (x) => (x || '').replace(/\s+bw(\s+\d+)?$/i, '');
    state.theme = t.themes.includes(want) ? want : (t.themes.find((x) => base(x) === base(want)) || t.themes[0]);
  } else state.theme = null;
  const units = t.units && t.units[LANG];
  state.unit = units && units.length ? (units.some((u) => u.id === state.unit) ? state.unit : units[0].id) : null;
  if (!first) { state.pages = [state.pages[0] || 1]; state.edits = [{}]; state.texts = [{}]; state.ink = []; drawingPage = null; }
  drawingPage = null;
  state.units = state.unit ? state.pages.map((_, i) => (i === 0 ? state.unit : state.units[i] || state.unit)) : [];
  document.querySelectorAll('.mk-card').forEach((c) => c.setAttribute('aria-current', String(c.dataset.id === id)));
  buildControls(t);
  render();
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
const PAGE_ARRAYS = ['pages', 'edits', 'units', 'texts', 'ink'];
const clone = (x) => (x === undefined ? undefined : JSON.parse(JSON.stringify(x)));
function padPages() { for (const k of PAGE_ARRAYS) if (k !== 'units' || state.units.length) while (state[k].length < state.pages.length) state[k].push(undefined); }
const pageOps = {
  remove(i) { drawingPage = null; padPages(); for (const k of PAGE_ARRAYS) state[k].splice(i, 1); },
  duplicate(i) { if (!canAddPages() || pagesFull()) return; drawingPage = null; padPages(); for (const k of PAGE_ARRAYS) if (state[k].length > i) state[k].splice(i + 1, 0, clone(state[k][i])); },
  move(i, j) { if (j < 0 || j >= state.pages.length) return; drawingPage = null; padPages(); for (const k of PAGE_ARRAYS) if (state[k].length > Math.max(i, j)) { const [x] = state[k].splice(i, 1); state[k].splice(j, 0, x); } },
};

/**
 * A template's strings at a level: a level that prints its own instruction (and title) uses it — i18n/level-instructions.json
 * (withLevelInstruction), carried in strings.<loc>.json as levels.<n>; a level title replaces the face's print title.
 */
/** answer key pages are made when the teacher asked for them and the template has a key (interactive or print-only) */
const keyAt = (t) => t.interactive || (t.keyLevels || []).includes(state.level);
const keyOn = (t) => !!state.answerKey && keyAt(t);

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
  const base = stringsFor(state.id, state.level);
  const tx = state.texts[i] || {};
  const out = { ...base };
  if (tx.title) { out.title = tx.title; out.printTitle = tx.title; }
  if (tx.instruction) out.instruction = tx.instruction;
  return out;
}

function pageSpec(i) {
  const t = tj.templates.find((x) => x.id === state.id);
  const units = (t.units && t.units[LANG]) || [];
  if (!units.length) return { variant: state.pages[i], unit: null };
  // every page has its own word (chosen in its header); a new copy changes the page only where the template allows it
  return { variant: t.copiesDiffer.includes(state.level) ? state.pages[i] : 1, unit: state.units[i] || units[0].id };
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
  return { strings: stringsFor(t.id, level), locale: LANG, difficulty: level, theme: t.themed ? t.themes[0] : null, unit: ((t.units && t.units[LANG]) || [])[0] ? t.units[LANG][0].id : null, variant: 1, pageSize: state.paper, answerKey: false, answerKeySuffix: tj.answerKey[LANG] };
}

/** The makePage options of page i (a colleague's shared worksheet is built from its recipe, not the sample). */
function pageOptions(i) {
  const t = tj.templates.find((x) => x.id === state.id);
  const ps = pageSpec(i);
  return canView()
    ? { strings: pageStrings(i), locale: LANG, difficulty: state.level, theme: state.theme, unit: ps.unit, variant: ps.variant, pageSize: state.paper, answerKey: keyOn(t), answerKeySuffix: tj.answerKey[LANG], overrides: state.edits[i] && Object.keys(state.edits[i]).length ? state.edits[i] : null }
    : sampleOptions(t);
}

function pageResult(i) {
  const o = pageOptions(i);
  const id = state.id;
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
async function render() {
  const token = ++renderToken;
  const host = $('mk-pages');
  const t = tj.templates.find((x) => x.id === state.id);
  // a button that changes nothing is a defect: where copies at this level are all the same page there is no
  // "New version", and "Add page" exists only if it can add the next word
  const differ = t.copiesDiffer.includes(state.level);
  const open = canEdit();
  $('mk-new').hidden = !open || !differ;
  const addable = open && (differ || ((t.units && t.units[LANG]) || []).length > 0);
  $('mk-add').hidden = !addable || !canAddPages();
  $('mk-add').disabled = pagesFull();
  if (!canView()) { state.pages = [state.pages[0] || 1]; state.edits = [{}]; state.ink = []; drawingPage = null; }
  const out = [];
  let refused = 0;
  $('mk-print').disabled = true;
  for (let i = 0; i < state.pages.length; i++) {
    try {
      const html = await makeHtml(i, false);
      const head = el('div', { class: 'mk-page-head' }, [el('span', { text: `${UI.page} ${i + 1} ${UI.of} ${state.pages.length}` })]);
      const pageUnits = (t.units && t.units[LANG]) || [];
      if (canEdit() && pageUnits.length) {
        const sel = el('select', { class: 'mk-select', 'aria-label': `${UI.word} · ${UI.page} ${i + 1}`, on: { change: (e) => { state.units[i] = e.target.value; state.edits[i] = {}; state.texts[i] = {}; state.ink[i] = undefined; drawingPage = null; if (i === 0) state.unit = e.target.value; render(); } } });
        for (const u of pageUnits) sel.append(el('option', { value: u.id, selected: u.id === state.units[i], text: u.word }));
        head.append(el('label', { class: 'mk-page-word' }, [el('span', { text: UI.word }), sel]));
      }
      if (canEdit()) {
        const tools = el('span', { class: 'mk-page-tools' });
        const n = state.pages.length;
        tools.append(el('button', { class: 'mk-icon', type: 'button', 'data-act': 'up', title: UI.moveUp, 'aria-label': `${UI.moveUp} · ${UI.page} ${i + 1}`, disabled: i === 0, text: '↑', on: { click: () => { pageOps.move(i, i - 1); render(); } } }));
        tools.append(el('button', { class: 'mk-icon', type: 'button', 'data-act': 'down', title: UI.moveDown, 'aria-label': `${UI.moveDown} · ${UI.page} ${i + 1}`, disabled: i === n - 1, text: '↓', on: { click: () => { pageOps.move(i, i + 1); render(); } } }));
        tools.append(el('button', { class: 'mk-link', type: 'button', 'data-act': 'image', text: UI.saveImage, on: { click: (e) => saveImage(i, e.currentTarget) } }));
        tools.append(el('button', { class: 'mk-link', type: 'button', 'data-act': 'draw', 'aria-pressed': String(drawingPage === i), text: drawingPage === i ? UI.stopDrawing : UI.draw, on: { click: () => { drawingPage = drawingPage === i ? null : i; render(); } } }));
        if (canAddPages()) tools.append(el('button', { class: 'mk-link', type: 'button', 'data-act': 'duplicate', disabled: pagesFull(), text: UI.duplicatePage, on: { click: () => { pageOps.duplicate(i); render(); } } }));
        if (n > 1) tools.append(el('button', { class: 'mk-link', type: 'button', 'data-act': 'remove', text: UI.removePage, on: { click: () => { pageOps.remove(i); render(); } } }));
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
      out.push(el('div', { class: 'mk-page' }, [head, ...(inkBar ? [inkBar] : []), sheet(html, canEdit() ? i : null, onInk)]));
      if (keyOn(t)) {
        const key = await makeHtml(i, true);
        if (key) out.push(el('div', { class: 'mk-page' }, [el('div', { class: 'mk-page-head' }, [el('span', { text: `${UI.answerKey} · ${UI.page} ${i + 1}` })]), sheet(key)]));
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
  host.replaceChildren(...out);
  // never ship a page that failed a gate: no printing while any page is refused
  $('mk-print').disabled = refused > 0;
  // a sample page is never printed: no Print button at all (a button that cannot be used explains nothing; the card does)
  $('mk-print').hidden = !canView();
  // the screen version: only where this template's level derives one from its marks (templates.json screen / screenLevels)
  $('mk-screen').hidden = !canView() || !screenAt(t);
  $('mk-pdf').hidden = !canView() || !showRasterPdf();
  updateSaveButtons();
  $('mk-pdf').disabled = refused > 0;
}

/**
 * The picker for one slot of page i: the type's OWN pool (lib/slot.js records it), pictures as tiles, words as chips.
 * The choice is re-made through the gates; it is kept only if the page applied it AND passed on its own seed — a choice
 * that is already on the page, or that the page cannot carry, is undone with a sentence (ARCHITECTURE §6.2 step 3).
 */
async function openPicker(i, role, idx) {
  const r = await pageResult(i);
  const slotInfo = r.ok && r.slots && r.slots[role];
  if (!slotInfo) return;
  const current = slotInfo.values[idx];
  let dlg = $('mk-picker');
  if (!dlg) { dlg = el('dialog', { id: 'mk-picker', class: 'mk-picker' }); document.body.append(dlg); }
  // a picture slot is one that carries its theme (lib/slot.js pictures() records it) — whatever the role is called
  // (pic, pic2, row1 …: a page with a picture per card has a role per card); words slots carry none
  const isPic = !!slotInfo.theme;
  const picTheme = slotInfo.theme || state.theme;
  const grid = el('div', { class: isPic ? 'mk-pick-grid' : 'mk-pick-words' });
  const nouns = (picManifest.themes[picTheme] || {}).nouns || {};
  for (const key of slotInfo.pool) {
    const used = slotInfo.values.includes(key) && key !== current;
    const kids = isPic && nouns[key]
      ? [el('img', { src: `/makers-assets/themes-512/${encodeURIComponent(picTheme)}/${encodeURIComponent(nouns[key].files[0])}`, alt: key, loading: 'lazy' })]
      : [el('span', { text: key })];
    grid.append(el('button', { type: 'button', class: 'mk-pick', 'aria-pressed': String(key === current), disabled: used, title: key, on: { click: () => choosePick(i, role, idx, key) } }, kids));
  }
  dlg.replaceChildren(
    el('div', { class: 'mk-pick-head' }, [el('h2', { text: isPic ? UI.choosePicture : UI.chooseWord }), el('button', { type: 'button', class: 'mk-btn', text: UI.close, on: { click: () => dlg.close() } })]),
    el('p', { class: 'mk-pick-note', id: 'mk-pick-note' }),
    grid,
  );
  dlg.querySelectorAll('img').forEach((im) => { im.addEventListener('contextmenu', (e) => e.preventDefault()); im.draggable = false; });
  dlg.showModal();
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
    if (!r.ok || (r.attempt && r.attempt.seedVariant)) { state.texts[i] = JSON.parse(before); note.textContent = UI.textTooLong; return; }
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
  const applied = r.ok && r.slots && r.slots[role] && r.slots[role].values[idx] === key && !(r.attempt && r.attempt.seedVariant);
  if (!applied) {
    state.edits[i] = JSON.parse(before);
    const note = $('mk-pick-note');
    if (note) note.textContent = r.ok && r.slots && r.slots[role] && r.slots[role].values.includes(key) ? UI.alreadyUsed : UI.doesNotFit;
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
  if (t.levels.length > 1) kids.push(chipGroup(UI.level, t.levels, state.level, (v) => { if (v !== state.level) state.ink = []; drawingPage = null; state.level = v; buildControls(t); render(); }));
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
    if (keyAt(t)) more.append(chipGroup(UI.answerKey, [false, true], state.answerKey, (v) => { state.answerKey = v; buildControls(t); render(); }, (v) => (v ? '✓' : '—')));
    more.append(chipGroup(UI.paper, ['letter', 'a4'], state.paper, (v) => { state.paper = v; buildControls(t); render(); }, (v) => UI[v]));
    more.append(chipGroup(UI.pageNumbers, [false, true], state.pageNumbers, (v) => { state.pageNumbers = v; buildControls(t); render(); }, (v) => (v ? '✓' : '—')));
    more.append(chipGroup(UI.border, Object.keys(BORDERS), state.border, (v) => { state.border = v; buildControls(t); render(); }, (v) => UI['border_' + v]));
    kids.push(more);
  }
  c.replaceChildren(...kids);
  // say once that the page can be tapped — only where this template exposes slots (filled in after the first page)
  // the hint names only what this template lets her tap: pictures/words where it has slots, the title + instruction always
  pageResult(0).then((r) => { if (r.ok && isOpen(t.id) && !c.querySelector('.mk-tap-hint')) c.append(el('p', { class: 'mk-tap-hint', text: r.slots && Object.keys(r.slots).length ? UI.tapHint : UI.tapHintText })); });
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
  const t = tj.templates.find((x) => x.id === state.id);
  const docs = [];
  for (let i = 0; i < state.pages.length; i++) docs.push(await makeHtml(i, false));
  if (keyOn(t)) for (let i = 0; i < state.pages.length; i++) { const k = await makeHtml(i, true); if (k) docs.push(k); }
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

/** ?r=<id> (the teacher's own saved worksheet) or ?m=<linkId> (a colleague's link); null = a new worksheet, false = stop. */
async function openingRecipe() {
  const rid = params.get('r'), mid = params.get('m');
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
  return toRecipe(state, { maker: MAKER, makerVersion, dataVersion, lang: LANG, title: pageStrings(0).title });
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
async function shareLink() {
  if (!saved.id || JSON.stringify(currentRecipe()) !== saved.json) { if (!(await saveNow())) return; }
  const r = await fetch('/api/makers/links', { method: 'POST', credentials: 'same-origin', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ recipeId: saved.id, kind: 'colleague' }) }).catch(() => null);
  if (!r || !r.ok) { showNote(UI.saveFailed, 'save'); return; }
  const { linkId } = await r.json();
  const url = `${location.origin}${location.pathname}?maker=${encodeURIComponent(MAKER)}&lang=${LANG}&m=${linkId}`;
  let dlg = $('mk-picker');
  if (!dlg) { dlg = el('dialog', { id: 'mk-picker', class: 'mk-picker' }); document.body.append(dlg); }
  const input = el('input', { class: 'mk-text-input', type: 'text', readonly: true, value: url, 'aria-label': UI.shareTitle });
  const copy = el('button', { type: 'button', class: 'mk-btn mk-primary', 'data-act': 'copy', text: UI.copyLink, on: { click: async () => {
    try { await navigator.clipboard.writeText(url); } catch (e) { input.select(); document.execCommand('copy'); }
    copy.textContent = UI.copied;
  } } });
  dlg.replaceChildren(
    el('div', { class: 'mk-pick-head' }, [el('h2', { text: UI.shareTitle }), el('button', { type: 'button', class: 'mk-btn', text: UI.close, on: { click: () => dlg.close() } })]),
    el('p', { class: 'mk-pick-note', text: UI.shareText }),
    el('div', { class: 'mk-text-actions' }, [input, copy]),
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
