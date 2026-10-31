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
const state = { id: null, level: 2, theme: null, unit: null, answerKey: false, paper: LANG === 'en' ? 'letter' : 'a4', pages: [1] };

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
  const want = params.get('t');
  choose((offered.find((t) => t.id === want) || offered[0]).id, true);
  buildGallery(offered);
  $('mk-new').addEventListener('click', () => { state.pages = state.pages.map(() => nextVariant()); render(); });
  $('mk-add').addEventListener('click', () => { state.pages.push(nextVariant()); render(); });
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
  if (!first) state.pages = [state.pages[0] || 1];
  document.querySelectorAll('.mk-card').forEach((c) => c.setAttribute('aria-current', String(c.dataset.id === id)));
  buildControls(t);
  render();
}

/**
 * What page i is. Where a new copy changes the page (most templates), the pages are different copies of the same
 * settings. Where it does not (a sight word of the day), the pages are consecutive words from the chosen one.
 */
function pageSpec(i) {
  const t = tj.templates.find((x) => x.id === state.id);
  const units = (t.units && t.units[LANG]) || [];
  if (t.copiesDiffer.includes(state.level) || !units.length) return { variant: state.pages[i], unit: state.unit };
  const at = Math.max(0, units.findIndex((u) => u.id === state.unit));
  return { variant: 1, unit: units[(at + i) % units.length].id };
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
  const o = { strings: strings[state.id], locale: LANG, difficulty: state.level, theme: state.theme, unit: ps.unit, variant: ps.variant, pageSize: state.paper, answerKey: state.answerKey && t.interactive, answerKeySuffix: tj.answerKey[LANG] };
  const id = state.id;
  const cacheKey = JSON.stringify([id, o.difficulty, o.theme, o.unit, o.variant, o.pageSize, o.answerKey]);
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

function sheet(html) {
  const box = el('div', { class: 'mk-sheet' });
  const f = el('iframe', { title: UI.page, srcdoc: html, scrolling: 'no' });
  box.append(f);
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
  $('mk-new').hidden = !differ;
  $('mk-add').hidden = !differ && !((t.units && t.units[LANG]) || []).length;
  const out = [];
  let refused = 0;
  $('mk-print').disabled = true;
  for (let i = 0; i < state.pages.length; i++) {
    try {
      const html = await makeHtml(i, false);
      const head = el('div', { class: 'mk-page-head' }, [el('span', { text: `${UI.page} ${i + 1} ${UI.of} ${state.pages.length}` })]);
      if (state.pages.length > 1) head.append(el('button', { class: 'mk-link', type: 'button', text: UI.removePage, on: { click: () => { state.pages.splice(i, 1); render(); } } }));
      out.push(el('div', { class: 'mk-page' }, [head, sheet(html)]));
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
}

function chipGroup(label, values, current, onPick, fmt) {
  const g = el('div', { class: 'mk-group', role: 'group', 'aria-label': label }, [el('span', { class: 'mk-label', text: label })]);
  for (const v of values) g.append(el('button', { type: 'button', class: 'mk-chip', 'aria-pressed': String(v === current), text: fmt ? fmt(v) : String(v), on: { click: () => { onPick(v); } } }));
  return g;
}

function buildControls(t) {
  const c = $('mk-controls');
  const kids = [];
  if (t.levels.length > 1) kids.push(chipGroup(UI.level, t.levels, state.level, (v) => { state.level = v; buildControls(t); render(); }));
  if (t.themed && t.themes.length > 1) {
    const g = el('div', { class: 'mk-group', role: 'group', 'aria-label': UI.pictures }, [el('span', { class: 'mk-label', text: UI.pictures })]);
    const row = el('div', { class: 'mk-themes' });
    for (const th of t.themes) {
      const name = (tj.themeNames[LANG] && tj.themeNames[LANG][th]) || th;
      row.append(el('button', { type: 'button', class: 'mk-theme', 'aria-pressed': String(th === state.theme), title: name, on: { click: () => { state.theme = th; buildControls(t); render(); } } },
        [el('span', { class: 'mk-theme-pic', style: `background-image:url("${themePicture(th)}")` }), el('span', { class: 'mk-theme-name', text: name })]));
    }
    g.append(row); kids.push(g);
  }
  const units = t.units && t.units[LANG];
  if (units && units.length) {
    const sel = el('select', { class: 'mk-select', 'aria-label': UI.word, on: { change: (e) => { state.unit = e.target.value; render(); } } });
    for (const u of units) sel.append(el('option', { value: u.id, selected: u.id === state.unit, text: u.word }));
    kids.push(el('label', { class: 'mk-group' }, [el('span', { class: 'mk-label', text: UI.word }), sel]));
  }
  if (t.interactive) kids.push(chipGroup(UI.answerKey, [false, true], state.answerKey, (v) => { state.answerKey = v; buildControls(t); render(); }, (v) => (v ? '✓' : '—')));
  kids.push(chipGroup(UI.paper, ['letter', 'a4'], state.paper, (v) => { state.paper = v; buildControls(t); render(); }, (v) => UI[v]));
  c.replaceChildren(...kids);
}

function buildGallery(offered) {
  const g = $('mk-gallery');
  for (const t of offered) {
    const thumb = el('div', { class: 'mk-thumb' });
    const card = el('button', { type: 'button', class: 'mk-card', 'data-id': t.id, 'aria-current': String(t.id === state.id), on: { click: () => choose(t.id) } }, [thumb, el('span', { class: 'mk-title', text: (strings[t.id] && (strings[t.id].printTitle || strings[t.id].title)) || t.id })]);
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
        thumb.append(f);
        f.style.transform = `scale(${thumb.clientWidth / 703})`;
      } catch (e) { /* a card whose miniature fails still opens the template */ }
    }, { rootMargin: '200px' }).observe(card);
  }
}

/** All pages (+ answer keys) in one hidden frame, then the browser's print dialog ("Save as PDF" makes a vector PDF). */
async function printAll() {
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
