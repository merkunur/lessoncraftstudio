/**
 * The student play page (/s/<linkId>) — INTERACTIVE-AND-SHARING §C, ARCHITECTURE §8.2 (task 2 of the ten, 2026-11-01).
 *
 * The link is the capability: no account, no student identity. The page reads the link's recipe (GET
 * /api/makers/links/<id>), loads the maker version the recipe is pinned to (the same resolve-version rule as the maker
 * screen, so a corrected template re-routes here too), rebuilds every page from the recipe exactly as the teacher saw it
 * (the same gated generate() ladder) and plays each page's SCREEN version — built in this browser from the page's
 * answer marks by the maker's own engine (scripts/makers/screen.js). A page without a screen (writing practice, more
 * than one right answer, material; or a template whose screen is not in the maker yet) is shown as the printable page
 * with one honest sentence and a Print button.
 *
 * Metering (ARCHITECTURE §9, ruling D.4-4): one `play` per load through the site's meter — unless the link was minted
 * by a subscribing teacher (the link record says so: `meter:false`); the 11th play of a day on a device shows the
 * kid-safe daily wall. Printing from here is a `download` (a free account's count; anonymous → "ask your teacher").
 *
 * ?embed=1 (the embed snippet): the site chrome and the title bar are hidden (body.lcs-embedded) and the page posts
 * its height to the parent exactly as deck.html does (lcs-embed-resize), so the deck snippet's listener fits it.
 *
 * The <head> (card, noindex) and the chrome links are filled server side (ssr.js) — nothing here depends on them.
 */
import { fromRecipe } from './recipe.js';
import { resolveVersion } from './resolve-version.js';

const BASE = '/makers';
const PLAY = (() => { const s = document.querySelector('script[type="module"][src$="/play.js"]'); return s ? new URL(s.src, location.href).pathname.replace(/\/play\.js$/, '') : '/makers/play'; })();
const LINK_ID = (location.pathname.split('/').filter(Boolean)[1] || '').trim();
const EMBED = /[?&]embed=1(?:&|$)/.test(location.search);
const PLAYS_PER_DAY = 10;
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

let LANG = /^[a-z]{2}$/.test(document.documentElement.lang) ? document.documentElement.lang : 'en';
let STR_ALL = null;
const S = (k) => { const by = STR_ALL && STR_ALL.play && STR_ALL.play[k]; return (by && (by[LANG] || by.en)) || k; };
let mod, tj, strings, recipe, link, state, makerVersion, dataVersion, gateFrame;
let gateQueue = Promise.resolve();
const typeCache = {};
const hook = { linkId: LINK_ID, link: null, pages: [], metered: null, version: () => ({ makerVersion, dataVersion }), lang: () => LANG };
window.__lcsPlay = hook;

async function loadStrings() { if (!STR_ALL) STR_ALL = await fetch(`${PLAY}/strings.json`).then((r) => r.json()).catch(() => ({ play: {} })); }

/** one card in place of the worksheet (the daily wall, a missing link, a failure) */
function card(title, lines, teacherLine) {
  const c = el('section', { class: 'pl-card' }, [el('h2', { text: title }), ...lines.map((l) => el('p', { text: l }))]);
  if (teacherLine) c.append(el('p', { class: 't', text: teacherLine }));
  $('pl-tabs').hidden = true;
  $('pl-stage').replaceChildren(c);
  return c;
}

/** the play meter: once per load, unless the link skips it (minted by a subscriber) */
async function meter() {
  if (link.meter === false) { hook.metered = 'skipped'; return true; }
  let r = null;
  try { r = await fetch('/api/quota/check-and-increment', { method: 'POST', credentials: 'same-origin', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ kind: 'play' }) }); } catch (e) { /* the server fails open; so does the page */ }
  if (r && r.status === 402) { hook.metered = 'wall'; card(S('wallTitle'), [S('wallKid')], S('wallTeacher')); return false; }
  hook.metered = 'ok';
  return true;
}

async function loadType(id) { if (!typeCache[id]) { const m = await mod.templates[id](); typeCache[id] = m.default || m; } return typeCache[id]; }

/** the maker version the recipe is pinned to, re-routed by a content fix (shell/resolve-version.js, ruling #5) */
async function pinnedVersion(entry) {
  if (!entry) {
    const text = (u) => fetch(u).then((r) => r.text()).then((s) => s.trim());
    return { makerVersion: await text(`${BASE}/${recipe.maker}/current.txt`), dataVersion: await text(`${BASE}/data/current.txt`) };
  }
  const migrations = await fetch(`${BASE}/migrations/${recipe.maker}.json`, { cache: 'no-store' }).then((r) => (r.ok ? r.json() : [])).catch(() => []);
  const v = resolveVersion({ recipe, versions: entry, migrations, current: entry.current });
  return { makerVersion: v.makerVersion, dataVersion: v.dataVersion };
}

/* ---------- the page, rebuilt exactly as the maker screen builds it (shell.js pageOptions / stringsFor / themeFor) ---------- */
const tplOf = (i) => tj.templates.find((x) => x.id === state.tpls[i]);
const baseTheme = (x) => (x || '').replace(/\s+bw(\s+\d+)?$/i, '');
function themeFor(t, want) {
  if (!t.themed) return null;
  // the themes the template offers in this language (templates.json localeThemes)
  const ts = (t.localeThemes && t.localeThemes[LANG]) || t.themes;
  return ts.includes(want) ? want : (ts.find((x) => baseTheme(x) === baseTheme(want)) || ts[0]);
}
function stringsFor(id, level) {
  const b = strings[id];
  const L = b && b.levels && b.levels[level];
  if (!L) return b;
  const { levels, ...rest } = b;
  const out = { ...rest, instruction: L.instruction };
  if (L.title) { out.title = L.title; delete out.printTitle; }
  return out;
}
function pageStrings(i) {
  const base = stringsFor(state.tpls[i], state.lvls[i]);
  const tx = state.texts[i] || {};
  const out = { ...base };
  if (tx.title) { out.title = tx.title; out.printTitle = tx.title; }
  if (tx.instruction) out.instruction = tx.instruction;
  return out;
}
function pageOptions(i) {
  const t = tplOf(i), lvl = state.lvls[i];
  const units = ((t.units && t.units[LANG]) || []).filter((u) => !t.unitLevels || t.unitLevels[u.id] === lvl);   // the level's units
  const ps = units.length ? { variant: t.copiesDiffer.includes(lvl) ? state.pages[i] : 1, unit: units.some((u) => u.id === state.units[i]) ? state.units[i] : units[0].id } : { variant: state.pages[i], unit: null };
  const keyAt = t.interactive || (t.keyLevels || []).includes(lvl);
  const ed = state.edits[i];
  return { strings: pageStrings(i), locale: LANG, difficulty: lvl, theme: themeFor(t, (recipe.pages[i] && recipe.pages[i].theme) || state.pickedTheme), unit: ps.unit, variant: ps.variant, pageSize: state.paper, answerKey: !!state.answerKey && keyAt, answerKeySuffix: tj.answerKey[LANG], overrides: ed && Object.keys(ed).length ? ed : null, baseStrings: state.texts[i] && Object.keys(state.texts[i]).length ? stringsFor(state.tpls[i], lvl) : null };
}
/* the teacher's drawing rides on the page (page-box coordinates, shell.js withInk) */
const INK = { black: '#3A3530', blue: '#2A6FDB', red: '#D9443A', green: '#2E9E5B', orange: '#F28C28' };
const strokePath = (pts) => (pts.length === 1 ? `M${pts[0][0]} ${pts[0][1]}l0.1 0` : 'M' + pts.map((p) => p.join(' ')).join('L'));
function withInk(html, i) {
  const strokes = state.ink[i] || [];
  const tag = '<div class="ws-page" data-lcs-page>';
  if (!strokes.length || !html.includes(tag)) return html;
  return html.replace(tag, tag + '<svg data-lcs-ink viewBox="0 0 703 945" style="position:absolute;left:0;top:0;width:703px;height:945px;z-index:20;pointer-events:none;overflow:visible" fill="none" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + strokes.map((st) => `<path d="${strokePath(st.pts)}" stroke="${INK[st.c] || INK.black}"/>`).join('') + '</svg>');
}
const screenAt = (t, level) => (t.screen === 'marks' || t.screen === 'declared') && (t.screenLevels || []).includes(level);
const mount = (h) => mod.mountHtml(gateFrame, h);

/** page i: its gated html, and its screen document where the template's level derives one */
async function buildPage(i) {
  const t = tplOf(i), lvl = state.lvls[i];
  const o = pageOptions(i);
  const type = await loadType(t.id);
  const r = await mod.generate({ ...o, type }, mount);
  if (!r.ok) { const e = new Error('refused'); e.fails = r.fails; throw e; }
  const out = { template: t.id, level: lvl, html: r.html, printHtml: withInk(r.html, i), kind: 'paper', reason: null, screenHtml: null };
  if (screenAt(t, lvl)) {
    // runtime.js screenFor, as the maker screen: the declared screen (the teacher's drawing stays on the printed page —
    // the screen build is laid out for the screen), else / on the published face the screen from the page's marks
    const sc = await mod.screenFor({ ...o, ...(r.attempt || {}), type, tpl: t, runtimeStrings: tj.runtimeStrings[LANG], marksInstructions: (tj.screenInstructions && tj.screenInstructions[LANG]) || {}, decorate: (h) => withInk(h, i) }, mount);
    out.kind = 'screen'; out.screenHtml = sc.html;
  } else {
    // honest, per page: a page made for paper (writing practice, more than one right answer, material) vs a screen
    // the maker does not build yet (a declared screen, a level the marks engine refused, a 'later' verdict)
    out.reason = ['writing', 'many-answers', 'material'].includes(t.verdict) ? 'paper' : 'yet';
  }
  return out;
}

/** printing a page from here is a download on the meter (a free account's); anonymous → ask the teacher */
async function printPage(p, section) {
  const ask = section.querySelector('.pl-ask');
  let r = null;
  try { r = await fetch('/api/quota/check-and-increment', { method: 'POST', credentials: 'same-origin', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ kind: 'download' }) }); } catch (e) { /* fails open */ }
  if (r && (r.status === 401 || r.status === 402)) { ask.textContent = S('printAsk'); ask.hidden = false; return false; }
  const f = el('iframe', { srcdoc: p.printHtml, title: 'print' });
  $('pl-print-host').replaceChildren(f);
  f.addEventListener('load', async () => { try { await f.contentDocument.fonts.ready; } catch (e) { /* print anyway */ } f.contentWindow.focus(); f.contentWindow.print(); }, { once: true });
  return true;
}

/** an iframe that is as tall as its own document (same-origin srcdoc), re-measured as the child fills it in */
function sized(f) {
  const fit = () => { const d = f.contentDocument; if (d && d.documentElement) f.style.height = Math.max(200, d.documentElement.scrollHeight) + 'px'; };
  f.addEventListener('load', () => { fit(); const d = f.contentDocument; if (d && d.body) new ResizeObserver(fit).observe(d.body); setTimeout(fit, 300); }, { once: true });
  return f;
}

function sectionFor(p, i) {
  const sec = el('section', { class: 'pl-page', 'data-page': String(i), 'data-kind': p.kind, hidden: i !== 0 });
  if (p.kind === 'screen') {
    const f = sized(el('iframe', { class: 'pl-screen', title: S('pageTab').replace('{n}', i + 1), srcdoc: p.screenHtml }));
    // the celebration's "Print my worksheet": the printed page of this screen
    f.addEventListener('load', () => { const d = f.contentDocument; const a = d && d.querySelector('[data-lcs-print]'); if (!a) return; a.hidden = false; a.addEventListener('click', (e) => { e.preventDefault(); printPage(p, sec); }); }, { once: true });
    sec.append(f, el('p', { class: 'pl-ask', hidden: true }));
  } else {
    const box = el('div', { class: 'pl-sheet' });
    const f = el('iframe', { title: S('pageTab').replace('{n}', i + 1), srcdoc: p.printHtml, scrolling: 'no' });
    box.append(f);
    new ResizeObserver(() => { f.style.transform = `scale(${box.clientWidth / 703})`; }).observe(box);
    sec.append(
      el('p', { class: 'pl-note', 'data-reason': p.reason, text: p.reason === 'paper' ? S('noScreen') : S('noScreenYet') }),
      box,
      el('div', { class: 'pl-actions' }, [el('button', { type: 'button', class: 'pl-btn', 'data-act': 'print', text: S('print'), on: { click: () => printPage(p, sec) } }), el('p', { class: 'pl-ask', hidden: true })]),
    );
  }
  return sec;
}

function showPage(i) {
  document.querySelectorAll('.pl-page').forEach((s) => { s.hidden = Number(s.dataset.page) !== i; });
  document.querySelectorAll('.pl-tab').forEach((b) => b.setAttribute('aria-pressed', String(Number(b.dataset.page) === i)));
}

async function boot() {
  await loadStrings();
  if (!/^[a-z0-9]{6,20}$/i.test(LINK_ID)) return card(S('notFoundTitle'), [S('notFoundBody')]);
  const r = await fetch(`/api/makers/links/${encodeURIComponent(LINK_ID)}`, { credentials: 'same-origin', cache: 'no-store' }).catch(() => null);
  if (!r || !r.ok) return card(S('notFoundTitle'), [S('notFoundBody')]);
  link = await r.json(); recipe = link.recipe; hook.link = link;
  LANG = /^[a-z]{2}$/.test(recipe.lang) ? recipe.lang : 'en';
  document.documentElement.lang = LANG;
  $('pl-stage').replaceChildren(el('p', { class: 'pl-note', text: S('loading') }));
  if (!(await meter())) return;
  gateFrame = el('iframe', { title: 'gate', tabindex: '-1' });
  $('pl-gate-host').append(gateFrame);
  const vj = await fetch(`${BASE}/versions.json`, { cache: 'no-store' }).then((x) => (x.ok ? x.json() : {})).catch(() => ({}));
  const pin = await pinnedVersion(vj[recipe.maker]);
  makerVersion = pin.makerVersion; dataVersion = pin.dataVersion;
  [mod, tj, strings] = await Promise.all([
    import(`${BASE}/${recipe.maker}/${makerVersion}/index.js`),
    fetch(`${BASE}/${recipe.maker}/${makerVersion}/templates.json`).then((x) => x.json()),
    fetch(`${BASE}/${recipe.maker}/${makerVersion}/strings.${LANG}.json`).then((x) => (x.ok ? x.json() : {})),
  ]);
  const dm = await (await fetch(`${BASE}/${recipe.maker}/${makerVersion}/data-manifest.json`)).json();
  const files = {};
  await Promise.all(dm.files.map(async (f) => { files[f] = await (await fetch(`${BASE}/data/${dataVersion}/${f.split('/').map(encodeURIComponent).join('/')}`)).text(); }));
  mod.platform.preload(files);
  // a picture family's files (one per picture) are fetched when a page draws one (runtime.generate)
  if (mod.platform.setFetcher) mod.platform.setFetcher(async (f) => { const r = await fetch(`${BASE}/data/${dataVersion}/${f.split('/').map(encodeURIComponent).join('/')}`); return r.ok ? r.text() : null; });
  state = fromRecipe(recipe);
  hook.state = () => JSON.parse(JSON.stringify(state));
  const stage = $('pl-stage');
  const tabs = $('pl-tabs');
  tabs.setAttribute('aria-label', S('pageTab').replace('{n}', '').trim());
  const sections = [];
  for (let i = 0; i < state.pages.length; i++) {
    let p;
    try {
      gateQueue = gateQueue.then(() => buildPage(i));
      p = await gateQueue;
    } catch (e) { console.warn('page refused', e.fails || e); p = { template: state.tpls[i], level: state.lvls[i], kind: 'failed', reason: 'failed' }; }
    hook.pages.push({ template: p.template, level: p.level, kind: p.kind, reason: p.reason, html: p.html || null, screenHtml: p.screenHtml || null });
    sections.push(p.kind === 'failed' ? el('section', { class: 'pl-page', 'data-page': String(i), 'data-kind': 'failed', hidden: i !== 0 }, [el('p', { class: 'pl-note', text: S('failed') })]) : sectionFor(p, i));
    if (i === 0) { stage.replaceChildren(sections[0]); } else stage.append(sections[i]);
    if (state.pages.length > 1) tabs.append(el('button', { type: 'button', class: 'pl-tab', 'data-page': String(i), 'aria-pressed': String(i === 0), text: S('pageTab').replace('{n}', i + 1), on: { click: () => showPage(i) } }));
  }
  tabs.hidden = state.pages.length < 2;
  hook.ready = true;
}

if (EMBED) {
  const post = () => { try { window.parent.postMessage({ type: 'lcs-embed-resize', height: document.body.scrollHeight, url: location.href }, '*'); } catch (e) { /* no parent */ } };
  new ResizeObserver(post).observe(document.body);
  window.addEventListener('load', post);
}

boot().catch((e) => { console.error(e); card(S('failed'), []); hook.failed = String(e && e.message); });
