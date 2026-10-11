#!/usr/bin/env node
/**
 * hm-sound-pools.js — the picture-card pools of the b8 first-sound face (F18, RF.K.2.d), per locale.
 *
 * A card is a COLOUR library picture named by its vocab word in the locale (image-vocabulary.js through the shared
 * loader; picture refusals + per-locale exclusions applied). The onset of the word is classified by the locale's own
 * spelling-to-sound rules (ported from the pedagogy agent's measured script: silent h, soft c / g, digraphs,
 * Nordic sj / tj / kj classes …); a word whose onset class is ambiguous or a known trap is never used.
 *   l      the route cards: the onset is a true /l/ (es "ll", pt "lh", sv/no "lj" are other sounds and excluded)
 *   decoy  the wrong cards: a STOP (p t k b d g) or a VOWEL onset (maximal contrast with the continuant /l/);
 *          `laterL` marks a decoy whose word CONTAINS an l later (letter-spotting in the word must fail)
 * Cards come only from the critter + nature / food families (design lead note 5); a picture with printed text, a
 * multi-word name or a refused picture is never a card. Output: data/hm/sound-pools.json. Deterministic.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..', '..', '..');
const { manifest } = require('../image-cache/resolve.js');
const { loadVocab } = require(path.join(ROOT, 'scripts/publish-cli/deck-rich-alt.js'));
const { refusedPicture, PICTURE_REFUSALS } = require('../lib/picture-refusals.js');
const { excluded } = require('../lib/b2-common.js');
const { REFUSED_CARDS } = require('../data/hm/sound-review.js');

const LOCS = ['en', 'de', 'es', 'pt', 'fr', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const THEMES = new Set(['farm animals', 'forest creatures', 'animals', 'zoo animals', 'pets', 'insects and bugs', 'reptiles and Amphibians',
  'ocean life', 'birds', 'birds 2', 'fruits', 'vegetables', 'flowers', 'tree', 'bakery', 'desserts and sweets', 'breakfast', 'At the Supermarket',
  'spring', 'summer', 'beach', 'camping', 'winter']);
const TEXT_PICTURES = new Set(['At the Supermarket/salt', 'At the Supermarket/cereal', 'At the Supermarket/milk', 'At the Supermarket/juice', 'At the Supermarket/ketchup', 'breakfast/cereal']);
const soft = (c) => /^[eiyéèêëíì]/.test(c || '');
const RULES = {
  en(w) { if (/^(sh|ch|th|wh|ph|kn|wr|gn|qu|ps)/.test(w)) return ['#']; const c = w[0]; if (/[aeiou]/.test(c)) return ['V']; if (c === 'c') return soft(w[1]) ? ['s'] : ['k']; if (c === 'g') return soft(w[1]) ? ['#'] : ['g']; return [c]; },
  de(w) { if (/^(sch|sp|st|ch|pf|qu|ph|ps|th|ei|eu|au|äu|ai)/.test(w)) return ['#']; const c = w[0]; if (c === 'v' || c === 'c' || c === 'y' || c === 'x') return ['#']; if (/[aeiouäöü]/.test(c)) return ['V']; return [c]; },
  es(w) { if (/^(ch|ll|qu|gu)/.test(w)) return ['#']; const c = w[0]; if (c === 'h') return ['V']; if (c === 'c') return soft(w[1]) ? ['#'] : ['k']; if (c === 'g') return soft(w[1]) ? ['#'] : ['g']; if (/[zvyjkw]/.test(c)) return ['#']; if (/[aeiouáéíóú]/.test(c)) return ['V']; return [c]; },
  pt(w) { if (/^(ch|lh|nh|qu|gu)/.test(w)) return ['#']; const c = w[0]; if (c === 'h' || c === 'x' || c === 'ç') return ['#']; if (c === 'c') return soft(w[1]) ? ['#'] : ['k']; if (c === 'g') return soft(w[1]) ? ['#'] : ['g']; if (/[aeiouáéíóúâêôãõ]/.test(c)) return ['#']; return [c]; },
  fr(w) { if (/^(ch|ph|qu|gn|th)/.test(w)) return ['#']; const c = w[0]; if (c === 'h') return ['#']; if (/^(ou|oi|au|eau|ai|ei|eu|an|am|en|em|in|im|on|om|un|um)/.test(w)) return ['#']; if (c === 'c') return soft(w[1]) ? ['#'] : ['k']; if (c === 'g') return soft(w[1]) ? ['#'] : ['g']; if (/[kqwxç]/.test(c)) return ['#']; if (/[aeiouyéèêàâîôû]/.test(c)) return ['V']; return [c]; },
  it(w) { if (/^(ch|gh|gl|gn|qu|sc[ei])/.test(w)) return ['#']; const c = w[0]; if (c === 'h') return ['#']; if (c === 'c') return soft(w[1]) ? ['#'] : ['k']; if (c === 'g') return soft(w[1]) ? ['#'] : ['g']; if (/[jkwxyz]/.test(c)) return ['#']; if (/[aeiouàèéìòù]/.test(c)) return ['V']; return [c]; },
  nl(w) { if (/^(sch|ch|ij|ei|oe|ou|au|eu|ui|aa|ee|oo|uu|ie)/.test(w)) return ['#']; const c = w[0]; if (/[gcvzqxy]/.test(c)) return ['#']; if (/[aeiou]/.test(c)) return ['V']; return [c]; },
  sv(w) { if (/^(sj|skj|stj|sch|sh|tj|kj|ch|gj|dj|hj|lj)/.test(w) || /^sk[eiyäö]/.test(w) || /^k[eiyäö]/.test(w) || /^g[eiyäö]/.test(w)) return ['#']; const c = w[0]; if (/[cqwxz]/.test(c)) return ['#']; if (/[aeiouyåäö]/.test(c)) return ['V']; return [c]; },
  da(w) { if (/^(hv|hj|ch|sch|sj|sh)/.test(w)) return ['#']; const c = w[0]; if (/[cqwxz]/.test(c)) return ['#']; if (/[aeiouyæøå]/.test(c)) return ['V']; return [c]; },
  no(w) { if (/^(sj|skj|sch|sh|kj|tj|gj|hj|lj|hv)/.test(w) || /^sk(i|y|ei|øy)/.test(w) || /^k(i|y|ei|øy)/.test(w) || /^g(i|y|ei|øy)/.test(w)) return ['#']; const c = w[0]; if (/[cqwxz]/.test(c)) return ['#']; if (/[aeiouyæøå]/.test(c)) return ['V']; return [c]; },
  fi(w) { const c = w[0]; if (/[bcfgqwxzšž]/.test(c)) return ['#']; if (/[aeiouyäö]/.test(c)) return ['V']; return [c]; },
};
const STOPS = new Set(['p', 't', 'k', 'b', 'd', 'g']);

const V = loadVocab(); const M = manifest();
// pass 1: every picture that is an /l/ card in ANY locale (refused or not) is barred from being a decoy anywhere, so a
// decoy can never also be read as an L word (e.g. the lamb that a child might call by its L name)
const anyL = new Set();
const out = { _about: 'b8 F18 first-sound card pools (tools/hm-sound-pools.js). l = /l/-onset route cards; decoy = stop / vowel onset; laterL = the word contains l later.' };
for (const loc of LOCS) {
  const seen = new Set(); const l = [], decoy = [];
  for (const [tn, t] of Object.entries(M.themes)) {
    if (!THEMES.has(tn)) continue;
    for (const [noun, e] of Object.entries(t.nouns)) {
      const src = tn + '/' + noun;
      if (!e.vocabKey || TEXT_PICTURES.has(src)) continue;
      if (refusedPicture ? refusedPicture(tn, noun) : PICTURE_REFUSALS.has(tn + '|' + noun)) continue;
      const v = V[e.vocabKey]; if (!v || !v[loc]) continue;
      if (excluded(e.vocabKey, loc)) continue;
      const w = String(v[loc][0]).toLocaleLowerCase(loc).trim();
      if (!w || /[\s-]/.test(w) || seen.has(w)) continue;
      seen.add(w);
      const cls = RULES[loc](w)[0];
      if (cls === 'l') { anyL.add(src); if (!REFUSED_CARDS.has(src)) l.push({ src, word: v[loc][0] }); }
      else if (STOPS.has(cls) || cls === 'V') decoy.push({ src, word: v[loc][0], laterL: /l/.test(w.slice(1)) });
    }
  }
  out[loc] = { l, decoy };
}
for (const loc of LOCS) {
  const { l, decoy } = out[loc];
  out[loc].decoy = decoy.filter((d) => !anyL.has(d.src) && !REFUSED_CARDS.has(d.src));
  const dc = out[loc].decoy;
  console.log(`${loc}: l ${l.length}  decoys ${dc.length} (laterL ${dc.filter((d) => d.laterL).length})`);
}
const dst = path.join(__dirname, '..', 'data', 'hm', 'sound-pools.json');
fs.writeFileSync(dst, JSON.stringify(out, null, 1) + '\n');
console.log('→', path.relative(process.cwd(), dst));
