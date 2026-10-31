/**
 * Worksheet maker screen (ARCHITECTURE §4.5 — the first-time flow). Plain ES module, no framework.
 *
 * URL: ?maker=<id>&lang=<locale>[&t=<template>]. Loads the maker's current bundle, its templates.json, its strings for the
 * language and the data files every template reads (preloaded into the platform), then:
 *   gallery (every template offered in this language, each with a live miniature) → the page, already made →
 *   ≤ 7 controls (level · pictures · word · answer key · paper) → New version · Add page · Print or save PDF.
 * The teacher never moves anything on the page (§4.1): every change re-makes the page from its settings.
 */
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
const typeCache = {};
const state = { id: null, level: 2, theme: null, unit: null, answerKey: false, paper: LANG === 'en' ? 'letter' : 'a4', pages: [1], edits: [{}], units: [], texts: [{}] };

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
  $('mk-new').textContent = UI.newVersion; $('mk-add').textContent = UI.addPage; $('mk-print').textContent = UI.print;
  $('mk-gallery').setAttribute('aria-label', UI.templates);
  $('mk-pages').append(el('p', { class: 'mk-note', text: UI.loading }));
  gateFrame = el('iframe', { title: 'gate', tabindex: '-1' });
  $('mk-gate-host').append(gateFrame);
  const ver = (await (await fetch(`${BASE}/${MAKER}/current.txt`)).text()).trim();
  const dv = (await (await fetch(`${BASE}/data/current.txt`)).text()).trim();
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
  window.__lcsMaker = { mod, tj, strings, LANG, loadType, mount: (html) => mod.mountHtml(gateFrame, html) };
  await loadAccess();
  document.body.setAttribute('data-print-hint', UI.printHint);
  const want = params.get('t');
  choose((offered.find((t) => t.id === want) || offered[0]).id, true);
  buildGallery(offered);
  // New version is new content: the teacher's picture/word choices belong to the old content and are dropped
  $('mk-new').addEventListener('click', () => { state.pages = state.pages.map(() => nextVariant()); state.edits = state.pages.map(() => ({})); render(); });
  $('mk-add').addEventListener('click', () => {
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
  if (t.themed) { if (!t.themes.includes(state.theme)) state.theme = t.themes[0]; } else state.theme = null;
  const units = t.units && t.units[LANG];
  state.unit = units && units.length ? (units.some((u) => u.id === state.unit) ? state.unit : units[0].id) : null;
  if (!first) { state.pages = [state.pages[0] || 1]; state.edits = [{}]; state.texts = [{}]; }
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
 * A page is four parallel things: its copy (pages), its picture/word swaps (edits), its word (units, one-word templates)
 * and its title/instruction (texts). They always move together — never touch one array alone.
 */
const PAGE_ARRAYS = ['pages', 'edits', 'units', 'texts'];
const pageOps = {
  remove(i) { for (const k of PAGE_ARRAYS) state[k].splice(i, 1); },
  duplicate(i) { for (const k of PAGE_ARRAYS) if (state[k].length > i) state[k].splice(i + 1, 0, JSON.parse(JSON.stringify(state[k][i]))); },
  move(i, j) { if (j < 0 || j >= state.pages.length) return; for (const k of PAGE_ARRAYS) if (state[k].length > Math.max(i, j)) { const [x] = state[k].splice(i, 1); state[k].splice(j, 0, x); } },
};

/** The strings of page i: the worksheet's own, with the teacher's title / instruction when she typed one. */
function pageStrings(i) {
  const base = strings[state.id];
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

function pageResult(i) {
  const t = tj.templates.find((x) => x.id === state.id);
  const ps = pageSpec(i);
  const o = isOpen(state.id)
    ? { strings: pageStrings(i), locale: LANG, difficulty: state.level, theme: state.theme, unit: ps.unit, variant: ps.variant, pageSize: state.paper, answerKey: state.answerKey && t.interactive, answerKeySuffix: tj.answerKey[LANG], overrides: state.edits[i] && Object.keys(state.edits[i]).length ? state.edits[i] : null }
    : { strings: strings[state.id], locale: LANG, difficulty: t.levels.includes(2) ? 2 : t.levels[0], theme: t.themed ? t.themes[0] : null, unit: ((t.units && t.units[LANG]) || [])[0] ? t.units[LANG][0].id : null, variant: 1, pageSize: state.paper, answerKey: false, answerKeySuffix: tj.answerKey[LANG] };
  const id = state.id;
  const cacheKey = JSON.stringify([id, o.difficulty, o.theme, o.unit, o.variant, o.pageSize, o.answerKey, o.overrides || null, o.strings.title, o.strings.instruction]);
  if (!results.has(cacheKey)) {
    gateQueue = gateQueue.then(async () => mod.generate({ ...o, type: await loadType(id) }, (html) => mod.mountHtml(gateFrame, html)))
      .catch((e) => ({ ok: false, fails: ['error: ' + e.message] }));
    results.set(cacheKey, gateQueue);
  }
  return results.get(cacheKey);
}

async function makeHtml(i, key) {
  const r = await pageResult(i);
  if (!r.ok) { const e = new Error('refused'); e.fails = r.fails; throw e; }
  return key ? r.keyHtml : r.html;
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

function sheet(html, pageIndex = null) {
  const box = el('div', { class: 'mk-sheet' });
  const f = el('iframe', { title: UI.page, srcdoc: html, scrolling: 'no' });
  guardFrame(f);
  box.append(f);
  if (pageIndex !== null) {
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
  const fit = () => { f.style.transform = `scale(${box.clientWidth / 703})`; };
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
  const open = isOpen(state.id);
  $('mk-new').hidden = !open || !differ;
  $('mk-add').hidden = !open || (!differ && !((t.units && t.units[LANG]) || []).length);
  if (!open) { state.pages = [state.pages[0] || 1]; state.edits = [{}]; }
  const out = [];
  let refused = 0;
  $('mk-print').disabled = true;
  for (let i = 0; i < state.pages.length; i++) {
    try {
      const html = await makeHtml(i, false);
      const head = el('div', { class: 'mk-page-head' }, [el('span', { text: `${UI.page} ${i + 1} ${UI.of} ${state.pages.length}` })]);
      const pageUnits = (t.units && t.units[LANG]) || [];
      if (isOpen(state.id) && pageUnits.length) {
        const sel = el('select', { class: 'mk-select', 'aria-label': `${UI.word} · ${UI.page} ${i + 1}`, on: { change: (e) => { state.units[i] = e.target.value; state.edits[i] = {}; state.texts[i] = {}; if (i === 0) state.unit = e.target.value; render(); } } });
        for (const u of pageUnits) sel.append(el('option', { value: u.id, selected: u.id === state.units[i], text: u.word }));
        head.append(el('label', { class: 'mk-page-word' }, [el('span', { text: UI.word }), sel]));
      }
      if (isOpen(state.id)) {
        const tools = el('span', { class: 'mk-page-tools' });
        const n = state.pages.length;
        tools.append(el('button', { class: 'mk-icon', type: 'button', 'data-act': 'up', title: UI.moveUp, 'aria-label': `${UI.moveUp} · ${UI.page} ${i + 1}`, disabled: i === 0, text: '↑', on: { click: () => { pageOps.move(i, i - 1); render(); } } }));
        tools.append(el('button', { class: 'mk-icon', type: 'button', 'data-act': 'down', title: UI.moveDown, 'aria-label': `${UI.moveDown} · ${UI.page} ${i + 1}`, disabled: i === n - 1, text: '↓', on: { click: () => { pageOps.move(i, i + 1); render(); } } }));
        tools.append(el('button', { class: 'mk-link', type: 'button', 'data-act': 'duplicate', text: UI.duplicatePage, on: { click: () => { pageOps.duplicate(i); render(); } } }));
        if (n > 1) tools.append(el('button', { class: 'mk-link', type: 'button', 'data-act': 'remove', text: UI.removePage, on: { click: () => { pageOps.remove(i); render(); } } }));
        head.append(tools);
      }
      out.push(el('div', { class: 'mk-page' }, [head, sheet(html, isOpen(state.id) ? i : null)]));
      if (state.answerKey && t.interactive) {
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
  host.replaceChildren(...out);
  // never ship a page that failed a gate: no printing while any page is refused
  $('mk-print').disabled = refused > 0;
  // a sample page is never printed: no Print button at all (a button that cannot be used explains nothing; the card does)
  $('mk-print').hidden = !isOpen(state.id);
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
  const grid = el('div', { class: role === 'pic' ? 'mk-pick-grid' : 'mk-pick-words' });
  const nouns = (picManifest.themes[state.theme] || {}).nouns || {};
  for (const key of slotInfo.pool) {
    const used = slotInfo.values.includes(key) && key !== current;
    const kids = role === 'pic' && nouns[key]
      ? [el('img', { src: `/makers-assets/themes-512/${encodeURIComponent(state.theme)}/${encodeURIComponent(nouns[key].files[0])}`, alt: key, loading: 'lazy' })]
      : [el('span', { text: key })];
    grid.append(el('button', { type: 'button', class: 'mk-pick', 'aria-pressed': String(key === current), disabled: used, title: key, on: { click: () => choosePick(i, role, idx, key) } }, kids));
  }
  dlg.replaceChildren(
    el('div', { class: 'mk-pick-head' }, [el('h2', { text: role === 'pic' ? UI.choosePicture : UI.chooseWord }), el('button', { type: 'button', class: 'mk-btn', text: UI.close, on: { click: () => dlg.close() } })]),
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
  if (!isOpen(t.id)) { c.replaceChildren(el('span', { class: 'mk-label', text: UI.sample }), accessCard()); return; }
  const kids = [];
  if (t.levels.length > 1) kids.push(chipGroup(UI.level, t.levels, state.level, (v) => { state.level = v; buildControls(t); render(); }));
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
          state.edits = state.pages.map(() => ({}));
          buildControls(t); render();
        } } }));
      }
      g.append(sw);
    }
    const row = el('div', { class: 'mk-themes' });
    for (const th of (bwOn ? bwThemes : colorThemes)) {
      const full = (tj.themeNames[LANG] && tj.themeNames[LANG][th]) || th;
      const name = isBw(th) ? full.replace(/\s+(BW|SW|BN|ZW|NB|PB|SV|SH|MV)(?=(\s+\d+)?$)/, '') : full;
      row.append(el('button', { type: 'button', class: 'mk-theme', 'aria-pressed': String(th === state.theme), title: name, on: { click: () => { if (th !== state.theme) state.edits = state.pages.map(() => ({})); state.theme = th; buildControls(t); render(); } } },
        [el('span', { class: 'mk-theme-pic', style: `background-image:url("${themePicture(th)}")` }), el('span', { class: 'mk-theme-name', text: name })]));
    }
    g.append(row); kids.push(g);
  }
  // one-word templates: the word is chosen per page, in each page's header (render)
  if (t.interactive) kids.push(chipGroup(UI.answerKey, [false, true], state.answerKey, (v) => { state.answerKey = v; buildControls(t); render(); }, (v) => (v ? '✓' : '—')));
  kids.push(chipGroup(UI.paper, ['letter', 'a4'], state.paper, (v) => { state.paper = v; buildControls(t); render(); }, (v) => UI[v]));
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
    const card = el('button', { type: 'button', class: 'mk-card', 'data-id': t.id, 'aria-current': String(t.id === state.id), on: { click: () => choose(t.id) } }, [thumb, el('span', { class: 'mk-title', text: cardTitle(t.id) })]);
    g.append(card);
    // the miniature is made when the card scrolls into view (cheap: the same build, scaled down)
    new IntersectionObserver(async (entries, obs) => {
      if (!entries.some((e) => e.isIntersecting)) return;
      obs.disconnect();
      try {
        const type = await loadType(t.id);
        const units = t.units && t.units[LANG];
        const r = mod.makePage({ type, strings: strings[t.id], locale: LANG, difficulty: t.levels.includes(2) ? 2 : t.levels[0], theme: t.themed ? t.themes[0] : null, unit: units && units[0] ? units[0].id : null, variant: 1, pageSize: state.paper });
        const f = el('iframe', { srcdoc: r.html, tabindex: '-1', 'aria-hidden': 'true', scrolling: 'no' });
        guardFrame(f);
        thumb.append(f);
        f.style.transform = `scale(${thumb.clientWidth / 703})`;
      } catch (e) { /* a card whose miniature fails still opens the template */ }
    }, { rootMargin: '200px' }).observe(card);
  }
}

/** All pages (+ answer keys) in one hidden frame, then the browser's print dialog ("Save as PDF" makes a vector PDF). */
async function printAll() {
  if (!isOpen(state.id)) return;
  if (access.makesLeft !== Infinity || access.kind === 'anon') {
    const r = await fetch('/api/quota/check-and-increment', { method: 'POST', credentials: 'same-origin', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ kind: 'download' }) }).catch(() => null);
    if (r && r.status === 401) return goTo(signInUrl());
    if (r && r.status === 402) { $('mk-controls').prepend(el('p', { class: 'mk-access-note', text: UI.noDownloadsLeft })); return; }
  }
  const t = tj.templates.find((x) => x.id === state.id);
  const docs = [];
  for (let i = 0; i < state.pages.length; i++) docs.push(await makeHtml(i, false));
  if (state.answerKey && t.interactive) for (let i = 0; i < state.pages.length; i++) { const k = await makeHtml(i, true); if (k) docs.push(k); }
  const head = docs[0].match(/<head>([\s\S]*?)<\/head>/)[1];
  const bodies = docs.map((d) => d.match(/<body[^>]*>([\s\S]*?)<\/body>/)[1]);
  const html = `<!doctype html><html lang="${LANG}"><head>${head}<style>.mk-break{break-after:page}.mk-break:last-child{break-after:auto}</style></head><body>${bodies.map((b) => `<div class="mk-break">${b}</div>`).join('')}</body></html>`;
  const host = $('mk-print-host');
  const f = el('iframe', { srcdoc: html, title: 'print' });
  host.replaceChildren(f);
  f.addEventListener('load', async () => {
    try { await f.contentDocument.fonts.ready; } catch (e) { /* print anyway */ }
    f.contentWindow.focus();
    f.contentWindow.print();
  }, { once: true });
}

boot().catch((e) => { console.error(e); $('mk-pages').replaceChildren(el('p', { class: 'mk-note', text: UI.failed })); });
