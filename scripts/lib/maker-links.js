/**
 * maker-links.js — the ONE place a static page finds its worksheet maker and the ribbon that links to it.
 *
 * Consumers: scripts/publish-cli/inject-deck-maker-ribbon.js (every deck.html), scripts/seo-landing/render-landing-html.js
 * (the static worksheet landings), scripts/lib/deck-actions.js ("Make your own"). Next.js pages use the same committed data
 * through frontend/lib/makers/ribbon.ts. Operator 2026-11-06: ready worksheets attract, makers convert, so every worksheet,
 * deck and topic page links to its maker's landing in its own language, in a way a visitor cannot miss.
 *
 * WHICH MAKER, for a deck: the worksheet type id in variant_id (k395-2 → K-395, g1412 → G1-412) is the most exact fact;
 * then the family or the old app of generator.app / exercise_type. Types no maker covers (the science families) get the
 * hub, never a dead link.
 *
 * MARKUP: one sentinel pair, like deck-actions.js: `--rewrite` strips and re-emits, and the strip is byte-exact.
 * Hidden in print, inside an embed and in the landscape worksheet mode, as every deck chrome block is.
 */
'use strict';

const fs = require('fs');
const path = require('path');
const siteChrome = require('./site-chrome');

const REPO_ROOT = siteChrome.REPO_ROOT;
const LOCALES = siteChrome.LOCALES;
const BASE = siteChrome.CANONICAL_BASE;
const escapeHtml = siteChrome.escapeHtml;
const DATA = path.join(REPO_ROOT, 'frontend', 'content', 'maker-landings');
const LIB = path.join(REPO_ROOT, 'frontend', 'lib', 'makers');

const START = '<!--LCS_MAKER_RIBBON_START-->';
const END = '<!--LCS_MAKER_RIBBON_END-->';
const MARKER = 'id="lcs-maker-ribbon"';
const STRIP_RE = /\n?<!--LCS_MAKER_RIBBON_START-->[\s\S]*?<!--LCS_MAKER_RIBBON_END-->/g;

const readJson = (f) => JSON.parse(fs.readFileSync(f, 'utf8'));
const once = (fn) => { let v; let done = false; return () => { if (!done) { v = fn(); done = true; } return v; }; };
const typeMap = once(() => readJson(path.join(LIB, 'type-to-maker.json')));
const catalog = once(() => readJson(path.join(LIB, 'landing-catalog.json')).makers);
const ribbonStrings = once(() => readJson(path.join(DATA, 'ribbon.json')));
const copyCache = new Map();
function copyFor(locale) {
  if (!copyCache.has(locale)) { let v = null; try { v = readJson(path.join(DATA, `copy.${locale}.json`)); } catch (_e) { v = null; } copyCache.set(locale, v); }
  return copyCache.get(locale);
}

/** EN emits picture-trail for the picture-path app (§15.10) */
const TYPE_ALIAS = { 'picture-trail': 'picture-path' };

/** k395-2 → K-395, g1412 → G1-412, G2-388 → G2-388; null when the id does not name a worksheet type */
function templateIdOf(variantId) {
  const m = String(variantId || '').match(/^(k|g[1-3])-?(\d{3})(?!\d)/i);
  return m ? `${m[1].toUpperCase()}-${m[2]}` : null;
}

/** the maker of a worksheet: { variantId, exerciseType, app } → maker id, or null */
function makerFor(o) {
  const t = typeMap();
  const id = templateIdOf(o && o.variantId);
  if (id && t.byTemplate[id]) return t.byTemplate[id];
  for (const raw of [o && o.exerciseType, o && o.app]) {
    if (!raw) continue;
    const key = TYPE_ALIAS[raw] || raw;
    if (t.byFamily[key]) return t.byFamily[key];
    if (t.byApp[key]) return t.byApp[key];
  }
  return null;
}

/** the landing of a maker in a language: { id, kw, path, url } or null (Cursive has none in sv / fi) */
function landing(locale, id) {
  const m = catalog()[id];
  const c = copyFor(locale);
  if (!m || !c || !c[id] || (m.locales && !m.locales.includes(locale))) return null;
  const p = `/${locale}/worksheet-makers/${c[id].slug}`;
  return { id, kw: c[id].kw, path: p, url: BASE + p };
}

const hubUrl = (locale) => `${BASE}/${locale}/worksheet-makers`;
/* the fan of three sheets; the hub ribbon shows the Counting fan, which every language has */
const ribbonImage = (locale, id) => `${BASE}/maker-previews/${id || 'counting'}/${locale}/ribbon.webp`;

/**
 * The ribbon's rules, namespaced under #lcs-maker-ribbon (1-0-0 outranks every deck class rule). The mat is the same ruled
 * teal as the maker pages, so the band reads as one thing across the whole site. No text sits on a picture.
 */
function cssRules() {
  return [
    '#lcs-maker-ribbon{box-sizing:border-box;max-width:980px;margin:0 auto 14px;padding:0 8px;font-family:Nunito,system-ui,-apple-system,"Segoe UI",sans-serif}',
    '#lcs-maker-ribbon .lmr-link{display:flex;align-items:center;gap:16px;min-height:92px;padding:10px 20px 10px 12px;border-radius:14px 14px 0 0;text-decoration:none;color:#fffaf0;',
    'background-color:#0f5a4f;background-image:linear-gradient(rgba(255,255,255,.1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.1) 1px,transparent 1px);background-size:24px 24px;',
    'box-shadow:0 8px 20px rgba(11,74,65,.22)}',
    '#lcs-maker-ribbon .lmr-link img{flex:0 0 auto;display:block;width:132px;height:76px}',
    '#lcs-maker-ribbon .lmr-text{flex:1 1 auto;min-width:0;line-height:1.25}',
    '#lcs-maker-ribbon .lmr-text strong{display:block;font-family:"Baloo 2",Nunito,system-ui,sans-serif;font-weight:700;font-size:21px;line-height:1.15;color:#fffaf0}',
    '#lcs-maker-ribbon .lmr-text span{display:block;margin-top:2px;font-size:15px;color:#dcece6}',
    '#lcs-maker-ribbon .lmr-cta{flex:0 0 auto;display:inline-flex;align-items:center;min-height:44px;padding:0 18px;border-radius:12px;background:#f2784b;color:#2b120a;font-weight:800;font-size:15px;white-space:nowrap;box-shadow:0 2px 0 #d9633a}',
    '#lcs-maker-ribbon .lmr-link:hover .lmr-cta{background:#f58a62}',
    '#lcs-maker-ribbon .lmr-link:focus-visible{outline:3px solid #ffd266;outline-offset:2px}',
    '#lcs-maker-ribbon .lmr-all{display:block;padding:7px 14px;border-radius:0 0 14px 14px;background:#ffd266;color:#3d2c00;font-weight:800;font-size:14px;text-align:center;text-decoration:none}',
    '#lcs-maker-ribbon .lmr-all:hover{text-decoration:underline}',
    '@media (max-width:620px){#lcs-maker-ribbon .lmr-link{flex-wrap:wrap;gap:8px 12px;padding:10px 12px}',
    '#lcs-maker-ribbon .lmr-link img{width:96px;height:55px}',
    '#lcs-maker-ribbon .lmr-text{flex-basis:calc(100% - 112px)}',
    '#lcs-maker-ribbon .lmr-text strong{font-size:18px}#lcs-maker-ribbon .lmr-text span{font-size:14px}',
    '#lcs-maker-ribbon .lmr-cta{flex:1 1 100%;justify-content:center}}',
    '@media print{#lcs-maker-ribbon{display:none!important}}',
    'body.lcs-embedded #lcs-maker-ribbon{display:none!important}',
    '@media (max-width:1024px) and (orientation:landscape){body.lcs-worksheet-landscape #lcs-maker-ribbon{display:none!important}}',
  ].join('');
}

/**
 * The sentinel-wrapped ribbon.
 * @param {{locale:string, makerId:string|null, line?:'line'|'topicLine'}} o
 */
function block(o) {
  const s = ribbonStrings()[o.locale] || ribbonStrings().en;
  const l = o.makerId ? landing(o.locale, o.makerId) : null;
  const href = l ? l.url : hubUrl(o.locale);
  const title = l ? l.kw : s.hubTitle;
  const body = s[o.line || 'line'];
  return START +
    `<style id="lcs-maker-ribbon-css">${cssRules()}</style>` +
    `<aside id="lcs-maker-ribbon" aria-label="${escapeHtml(s.aria)}">` +
    `<a class="lmr-link" href="${escapeHtml(href)}">` +
    `<img src="${escapeHtml(ribbonImage(o.locale, l ? l.id : null))}" alt="" width="264" height="152" loading="lazy" decoding="async">` +
    `<span class="lmr-text"><strong>${escapeHtml(title)}</strong><span>${escapeHtml(body)}</span></span>` +
    `<span class="lmr-cta">${escapeHtml(s.cta)}</span></a>` +
    `<a class="lmr-all" href="${escapeHtml(hubUrl(o.locale))}">${escapeHtml(s.all)}</a>` +
    '</aside>' + END;
}

module.exports = { LOCALES, START, END, MARKER, STRIP_RE, templateIdOf, makerFor, landing, hubUrl, ribbonImage, cssRules, block, ribbonStrings };
