/**
 * Shared harness of the maker gates (task 4 of the ten, 2026-11-01): the built makers, the settings space a teacher can
 * reach (level · pictures · word · copy · language), the page builder (runtime.js makePage, the same seed rule as the
 * catalogue) and a puppeteer mounter that shows a page html at a viewport and waits for fonts + pictures.
 *
 * Node only. Every gate that enumerates "every exposed control value" goes through settingsSpace() so the five gates
 * agree on what a control value is.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const os = require('os');

const REPO = path.join(__dirname, '..', '..', '..', '..');
const puppeteer = require(path.join(REPO, 'node_modules', 'puppeteer'));
const runtime = require('../../runtime.js');
const { resolveStrings, withLevelInstruction } = require(path.join(REPO, 'scripts', 'worksheet-gen', 'i18n', 'strings.js'));

const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const isBw = (th) => /bw(\s+\d+)?$/i.test(th);

/** every maker with a current version in out/makers/versions.json (or the --makers= subset) */
function builtMakers(only) {
  const versions = JSON.parse(fs.readFileSync(path.join(REPO, 'out', 'makers', 'versions.json'), 'utf8'));
  const ids = only ? String(only).split(',').filter(Boolean) : Object.keys(versions);
  return ids.map((maker) => {
    const v = versions[maker];
    if (!v) throw new Error(`maker ${maker} is not built (not in versions.json)`);
    const tj = JSON.parse(fs.readFileSync(path.join(REPO, 'out', 'makers', maker, v.current, 'templates.json'), 'utf8'));
    return { maker, version: v.current, tj };
  });
}

/** parse --k=v / --flag arguments */
function args(argv) {
  return Object.fromEntries((argv || process.argv.slice(2)).map((a) => { const m = a.match(/^--([^=]+)=(.*)$/); return m ? [m[1], m[2]] : [a.replace(/^--/, ''), true]; }));
}

/**
 * The control values of a template in a locale, as the maker screen exposes them (shell.js buildControls):
 * level (t.levels), pictures (t.themes: colour and black-and-white strips), word (t.units[loc]), copy ("New version":
 * the variant, only where copiesDiffer says a new copy changes the page). Paper and answer key change no content.
 *
 * Returns one option set per (level × theme sample × unit sample × copy): `themes` = how many themes per level (the
 * first colour theme, the first B&W theme, then every k-th colour theme), `units` = how many words, `copies` = variants.
 */
function settingsSpace(t, loc, { themes = 2, units = 2, copies = 4, levels = null, sample = 0 } = {}) {
  // sample = 0, 1, 2 …: an INDEPENDENT replicate (other themes, other words, other copy numbers → other seeds): a tell
  // that is the generator's shows in every sample; one that was the luck of a few pages does not (memory 2026-10-06)
  const out = [];
  const lv = levels || t.levels;
  let ths = [null];
  if (t.themed) {
    const colour = t.themes.filter((x) => !isBw(x)), bw = t.themes.filter(isBw);
    const pick = [];
    const at = (list, i) => list[(i * (themes || 1)) % list.length];
    if (colour.length) pick.push(at(colour, sample));
    if (bw.length) { const b = bw[(sample) % bw.length]; if (!pick.includes(b)) pick.push(b); }
    for (let k = 1; pick.length < themes && k < colour.length; k++) { const th = colour[(Math.round((k * colour.length) / themes) + sample) % colour.length]; if (!pick.includes(th)) pick.push(th); }
    ths = pick.length ? pick : [null];
  }
  const all = t.units && t.units[loc] && t.units[loc].length ? t.units[loc] : null;
  const us = all ? Array.from({ length: Math.min(units, all.length) }, (_, i) => all[(i + sample * units) % all.length].id) : [null];
  for (const difficulty of lv) for (const theme of ths) for (const unit of us) {
    const vs = (t.copiesDiffer || []).includes(difficulty) ? Array.from({ length: copies }, (_, i) => i + 1 + sample * copies) : [1];
    for (const variant of vs) out.push({ difficulty, theme, unit, variant });
  }
  return out;
}

/** the type module of a template (fresh require of the repo file) */
function loadType(t) { return require(path.join(REPO, t.file)); }

/** the strings of a template in a locale at a level (the maker's own slice is built from the same files) */
function stringsFor(t, type, loc, difficulty) { return withLevelInstruction(resolveStrings(t.id, loc, type), t.id, difficulty, loc); }

/**
 * Build one page the way the maker does (runtime.js makePage). `o` = one settingsSpace entry + locale; extra =
 * { answerKey, screen, overrides, strings } overrides.
 */
function buildPage(t, type, tj, loc, o, extra = {}) {
  const strings = extra.strings || stringsFor(t, type, loc, o.difficulty);
  return runtime.makePage({ type, strings, locale: loc, difficulty: o.difficulty, theme: o.theme, unit: o.unit, variant: o.variant, answerKey: !!extra.answerKey, answerKeySuffix: tj.answerKey[loc], screen: !!extra.screen, overrides: extra.overrides || null, pageSize: extra.pageSize });
}

/** the page with the type's `interactive` build (the declared screen's page), same seed, same content asserted */
function buildDeclaredScreen(t, type, tj, loc, o) {
  const { makeRng, instanceSeed } = require(path.join(REPO, 'scripts', 'worksheet-gen', 'lib', 'rng.js'));
  const { buildPage: shellPage } = require(path.join(REPO, 'scripts', 'worksheet-gen', 'page', 'shell.js'));
  const strings = stringsFor(t, type, loc, o.difficulty);
  const seed = instanceSeed({ typeId: type.id, theme: o.theme, difficulty: o.difficulty, seedEpoch: 1, variant: o.variant, unit: o.unit });
  const base = type.build({ theme: o.theme, difficulty: o.difficulty, locale: loc, unit: o.unit }, { rng: makeRng(seed), variant: o.variant });
  const sc = type.build({ theme: o.theme, difficulty: o.difficulty, locale: loc, unit: o.unit }, { rng: makeRng(seed), variant: o.variant, interactive: true });
  if (JSON.stringify(sc.meta) !== JSON.stringify(base.meta)) throw new Error('the interactive build drew different content than the page');
  const pageSize = loc === 'en' ? 'letter' : 'a4';
  return { html: shellPage({ title: strings.printTitle || strings.title, instruction: strings.instruction, bodyHtml: sc.bodyHtml, locale: loc, pageSize, pageHeight: (type.interactive && type.interactive.screenHeight) || null }), seed };
}

/** A puppeteer page that shows html files from a temp dir (file://, pictures allowed) at a viewport. */
class Mounter {
  /** opts.base: an http origin serving /makers-assets/ (the maker's pictures are root-relative URLs: from a file:// page they
   *  resolve to C:/makers-assets and read as broken — a gate that runs the maker server passes it) */
  constructor(opts = {}) { this.tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'lcs-mgate-')); this.errors = []; this.n = 0; this.base = opts.base || null; }
  async open() {
    this.browser = await puppeteer.launch({ args: ['--allow-file-access-from-files'] });
    this.page = await this.browser.newPage();
    this.page.on('pageerror', (e) => this.errors.push(e.message));
    await this.page.setViewport({ width: 703, height: 945 });
    return this;
  }
  /** show html; w = viewport width (height follows 1.4×; the catalogue viewport is 703 × 945) */
  async mount(html, w) {
    if (w && this.w !== w) { await this.page.setViewport({ width: w, height: w === 703 ? 945 : Math.round(w * 1.4) }); this.w = w; }
    if (this.base) {
      // ON the server's origin: root-relative pictures resolve there, and the fonts load (a file:// page fetching an http font is
      // cross-origin and fails without CORS — the page then measures a fallback font: a 3-line title read as 4)
      if (!this.atBase) { await this.page.goto(this.base + '/__gate-mount', { waitUntil: 'load' }); this.atBase = true; }
      await this.page.setContent(String(html), { waitUntil: 'load' });
    } else {
      const f = path.join(this.tmp, 'p' + (this.n++ % 4) + '.html');
      fs.writeFileSync(f, html);
      await this.page.goto('file:///' + f.split(path.sep).join('/'), { waitUntil: 'load' });
    }
    await this.page.evaluate(async () => { await document.fonts.ready; await Promise.all([...document.images].map((i) => (i.complete ? null : new Promise((r) => { i.addEventListener('load', r, { once: true }); i.addEventListener('error', r, { once: true }); })))); });
    return this.page;
  }
  async close() { try { await this.browser.close(); } catch (e) { /* closed */ } fs.rmSync(this.tmp, { recursive: true, force: true }); }
}

module.exports = { REPO, LOCALES, isBw, builtMakers, args, settingsSpace, loadType, stringsFor, buildPage, buildDeclaredScreen, Mounter, runtime };
