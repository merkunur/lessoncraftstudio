/**
 * The site chrome of the student play page: the same header / footer every deck page and landing carries
 * (scripts/lib/site-chrome.js — brand, the four site sections, the 11 language links with hreflang, the footer links),
 * so a child's shared page offers a crawler the same indexable paths as the rest of the site (INTERACTIVE-AND-SHARING
 * §C.9). Node only; the build writes one file per locale into the play tree and the website route reads those.
 */
'use strict';
const path = require('path');
const chrome = require(path.join(__dirname, '..', '..', 'lib', 'site-chrome.js'));

/** { css, header, footer } html strings for one locale (the 'landing' variant: a real <header role=banner> and <footer role=contentinfo>) */
function chromeFor(locale) {
  const loc = chrome.LOCALES.includes(locale) ? locale : 'en';
  return { css: chrome.cssBlock(), header: chrome.header(loc, 'landing'), footer: chrome.footer(loc, 'landing') };
}

module.exports = { chromeFor, LOCALES: chrome.LOCALES };
