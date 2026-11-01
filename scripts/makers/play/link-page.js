/**
 * One student link → the served play page (Node). Reads what the <head> card needs from the built maker tree
 * (templates.json + strings.<lang>.json of the version the recipe is pinned to) and the chrome / strings / landings of
 * the play tree, then calls ssr.js. Used by scripts/makers/serve.js (the local /s/<id>) and by the play-shell gate;
 * frontend/app/s/[id]/route.ts does the same reads against /var/www/lcs-media/makers and calls the same ssr.js.
 *
 *   linkPageHtml({ link, makersDir, template, base, origin, strings, landings, chrome, uiStrings }) → html
 */
'use strict';
const fs = require('fs');
const path = require('path');
const ssr = require('./ssr.js');

const _cache = new Map();
function readJson(file) {
  if (!_cache.has(file)) { try { _cache.set(file, JSON.parse(fs.readFileSync(file, 'utf8'))); } catch (e) { _cache.set(file, null); } }
  return _cache.get(file);
}
function readText(file) { try { return fs.readFileSync(file, 'utf8').trim(); } catch (e) { return null; } }

/** the maker version whose files the card reads: the recipe's pin when that build still exists, else the current one */
function versionDirFor(makersDir, recipe) {
  const pinned = recipe.makerVersion && /^[a-f0-9]{6,20}$/.test(recipe.makerVersion) ? path.join(makersDir, recipe.maker, recipe.makerVersion) : null;
  if (pinned && fs.existsSync(path.join(pinned, 'templates.json'))) return { dir: pinned, version: recipe.makerVersion };
  const cur = readText(path.join(makersDir, recipe.maker, 'current.txt'));
  return cur ? { dir: path.join(makersDir, recipe.maker, cur), version: cur } : null;
}

/**
 * @param {object} o
 *   link        { linkId, recipe, title, maker, lang } (local-store readLink / the website's link row)
 *   makersDir   the built makers tree (out/makers locally, /var/www/lcs-media/makers on the site)
 *   template    the play shell html; base = its URL prefix; origin = the site origin for absolute card URLs
 *   strings     play-strings.json (parsed); landings = makers-index landings(); chrome = { css, header, footer };
 *   uiStrings   frontend/messages/makers/<lang>.json (parsed; for the maker's name and the level word)
 */
function linkPageHtml(o) {
  const { link } = o;
  const recipe = link.recipe;
  const lang = ssr.LOCALES.includes(recipe.lang) ? recipe.lang : 'en';
  const first = recipe.pages && recipe.pages[0] ? recipe.pages[0] : {};
  const v = versionDirFor(o.makersDir, recipe);
  const tj = v ? readJson(path.join(v.dir, 'templates.json')) : null;
  const st = v ? readJson(path.join(v.dir, 'strings.' + lang + '.json')) : null;
  const ui = o.uiStrings || {};
  const makerName = (ui.makers && ui.makers[recipe.maker]) || recipe.maker;
  const tplStrings = st && st[first.template];
  const templateTitle = tplStrings ? (tplStrings.printTitle || tplStrings.title || null) : null;
  const themeName = first.theme && tj && tj.themeNames && tj.themeNames[lang] ? (tj.themeNames[lang][first.theme] || first.theme) : (first.theme || null);
  const thumbUrl = v && first.template && fs.existsSync(path.join(v.dir, 'thumbs', lang, first.template + '.webp')) ? `/makers/${recipe.maker}/${v.version}/thumbs/${lang}/${first.template}.webp` : null;
  const head = ssr.headFor({ linkId: link.linkId, lang, title: link.title || recipe.title, makerName, templateTitle, level: first.level, levelWord: ui.level ? ui.level + ' {n}' : null, themeName, thumbUrl, origin: o.origin });
  const landing = (o.landings[recipe.maker] && o.landings[recipe.maker][lang]) || { url: '/' + lang + '/tools', name: makerName };
  const words = ssr.playStrings(o.strings, lang);
  return ssr.renderPlayHtml({
    template: o.template, base: o.base, lang, head, chrome: o.chrome,
    bar: { title: head.title, landingUrl: o.origin + landing.url, homeUrl: o.origin + '/' + lang + '/', makeYourOwn: words.makeYourOwn, madeWith: words.madeWith },
  });
}

/** the kid-safe 404 page in a language (the caller sends 404 + X-Robots-Tag: noindex) */
function notFoundHtml(strings, lang) {
  const w = ssr.playStrings(strings, ssr.LOCALES.includes(lang) ? lang : 'en');
  return ssr.miniPage({ lang, title: w.notFoundTitle, lines: [w.notFoundBody] });
}

module.exports = { linkPageHtml, notFoundHtml, versionDirFor };
