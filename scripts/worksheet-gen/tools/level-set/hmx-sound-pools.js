#!/usr/bin/env node
/**
 * hmx-sound-pools.js — the picture-card pools of the Maze Puzzles LEVEL SET first-sound scenes (2026-10-12).
 *
 * The published face (K-412) teaches /l/ with the lion; the Level Set scenes teach the onset of a cue animal whose name
 * starts with the SAME sound in all eleven languages (checked here against image-vocabulary.js, never assumed):
 *   /l/ leopard (the published reviewed /l/ pool is reused as is)
 *   /t/ tiger, toucan, tractor  /p/ panda, pelican   (penguin refused: fr "manchot")
 * Route cards: the word's onset class (the published per-locale spelling-to-sound rules, tools/hm-sound-pools.js) is the
 * target. Decoys: for a STOP target (/t/ /p/) only continuant or vowel onsets (m n l s f r v w j h + vowels) — never a
 * stop, and never the target's voiced twin (/d/ for /t/, /b/ for /p/), so the contrast is maximal. `laterT` marks a decoy
 * whose word CONTAINS the target letter later (letter-spotting must fail). A picture refused by the human read
 * (data/hm/sound-review.js + data/hmx/sound-review.js) is never a card; the cue pictures are never cards.
 * Output: data/hmx/sound-pools.json { <loc>: { t: {cards, decoy}, p: {cards, decoy} } }. Deterministic.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..', '..', '..', '..');
const { manifest } = require('../../image-cache/resolve.js');
const { loadVocab } = require(path.join(ROOT, 'scripts/publish-cli/deck-rich-alt.js'));
const { refusedPicture, PICTURE_REFUSALS } = require('../../lib/picture-refusals.js');
const { excluded } = require('../../lib/b2-common.js');
const { REFUSED_CARDS } = require('../../data/hm/sound-review.js');
const { REFUSED_CARDS: HMX_REFUSED, REFUSED_BY_LOC } = require('../../data/hmx/sound-review.js');

const LOCS = ['en', 'de', 'es', 'pt', 'fr', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const CUES = { t: ['zoo animals/tiger', 'birds 2/toucan', 'vehicles/tractor'], p: ['zoo animals/panda', 'birds/pelican'], l: ['animals/leopard'] };
const THEMES = new Set(['farm animals', 'forest creatures', 'animals', 'zoo animals', 'pets', 'insects and bugs', 'reptiles and Amphibians',
  'ocean life', 'birds', 'birds 2', 'fruits', 'vegetables', 'flowers', 'tree', 'bakery', 'desserts and sweets', 'breakfast', 'At the Supermarket',
  'spring', 'summer', 'beach', 'camping', 'winter', 'toys', 'vehicles', 'music']);
const TEXT_PICTURES = new Set(['At the Supermarket/salt', 'At the Supermarket/cereal', 'At the Supermarket/milk', 'At the Supermarket/juice', 'At the Supermarket/ketchup', 'breakfast/cereal', 'vehicles/police_car', 'vehicles/taxi', 'vehicles/school_bus', 'vehicles/mail_truck']);
// the published per-locale onset classifier, verbatim (tools/hm-sound-pools.js)
const soft = (c) => /^[eiyéèêëíì]/.test(c || '');
const RULES = {
  en(w) { if (/^(sh|ch|th|wh|ph|kn|wr|gn|qu|ps)/.test(w)) return '#'; const c = w[0]; if (/[aeiou]/.test(c)) return 'V'; if (c === 'c') return soft(w[1]) ? 's' : 'k'; if (c === 'g') return soft(w[1]) ? '#' : 'g'; return c; },
  de(w) { if (/^(sch|sp|st|ch|pf|qu|ph|ps|th|ei|eu|au|äu|ai)/.test(w)) return '#'; const c = w[0]; if (c === 'v' || c === 'c' || c === 'y' || c === 'x') return '#'; if (/[aeiouäöü]/.test(c)) return 'V'; return c; },
  es(w) { if (/^(ch|ll|qu|gu)/.test(w)) return '#'; const c = w[0]; if (c === 'h') return 'V'; if (c === 'c') return soft(w[1]) ? '#' : 'k'; if (c === 'g') return soft(w[1]) ? '#' : 'g'; if (/[zvyjkw]/.test(c)) return '#'; if (/[aeiouáéíóú]/.test(c)) return 'V'; return c; },
  pt(w) { if (/^(ch|lh|nh|qu|gu)/.test(w)) return '#'; const c = w[0]; if (c === 'h' || c === 'x' || c === 'ç') return '#'; if (c === 'c') return soft(w[1]) ? '#' : 'k'; if (c === 'g') return soft(w[1]) ? '#' : 'g'; if (/[aeiouáéíóúâêôãõ]/.test(c)) return '#'; return c; },
  fr(w) { if (/^(ch|ph|qu|gn|th)/.test(w)) return '#'; const c = w[0]; if (c === 'h') return '#'; if (/^(ou|oi|au|eau|ai|ei|eu|an|am|en|em|in|im|on|om|un|um)/.test(w)) return '#'; if (c === 'c') return soft(w[1]) ? '#' : 'k'; if (c === 'g') return soft(w[1]) ? '#' : 'g'; if (/[kqwxç]/.test(c)) return '#'; if (/[aeiouyéèêàâîôû]/.test(c)) return 'V'; return c; },
  it(w) { if (/^(ch|gh|gl|gn|qu|sc[ei])/.test(w)) return '#'; const c = w[0]; if (c === 'h') return '#'; if (c === 'c') return soft(w[1]) ? '#' : 'k'; if (c === 'g') return soft(w[1]) ? '#' : 'g'; if (/[jkwxyz]/.test(c)) return '#'; if (/[aeiouàèéìòù]/.test(c)) return 'V'; return c; },
  nl(w) { if (/^(sch|ch|ij|ei|oe|ou|au|eu|ui|aa|ee|oo|uu|ie)/.test(w)) return '#'; const c = w[0]; if (/[gcvzqxy]/.test(c)) return '#'; if (/[aeiou]/.test(c)) return 'V'; return c; },
  sv(w) { if (/^(sj|skj|stj|sch|sh|tj|kj|ch|gj|dj|hj|lj)/.test(w) || /^sk[eiyäö]/.test(w) || /^k[eiyäö]/.test(w) || /^g[eiyäö]/.test(w)) return '#'; const c = w[0]; if (/[cqwxz]/.test(c)) return '#'; if (/[aeiouyåäö]/.test(c)) return 'V'; return c; },
  da(w) { if (/^(hv|hj|ch|sch|sj|sh)/.test(w)) return '#'; const c = w[0]; if (/[cqwxz]/.test(c)) return '#'; if (/[aeiouyæøå]/.test(c)) return 'V'; return c; },
  no(w) { if (/^(sj|skj|sch|sh|kj|tj|gj|hj|lj|hv)/.test(w) || /^sk(i|y|ei|øy)/.test(w) || /^k(i|y|ei|øy)/.test(w) || /^g(i|y|ei|øy)/.test(w)) return '#'; const c = w[0]; if (/[cqwxz]/.test(c)) return '#'; if (/[aeiouyæøå]/.test(c)) return 'V'; return c; },
  fi(w) { const c = w[0]; if (/[bcfgqwxzšž]/.test(c)) return '#'; if (/[aeiouyäö]/.test(c)) return 'V'; return c; },
};
const CONT = new Set(['m', 'n', 'l', 's', 'f', 'r', 'v', 'w', 'j', 'h', 'V']);
const TWIN = { t: 'd', p: 'b' };

const V = loadVocab(); const Mf = manifest();
const out = { _about: 'Maze Puzzles Level Set first-sound pools (tools/level-set/hmx-sound-pools.js). cards = target-onset route cards; decoy = continuant / vowel onset; laterT = the word contains the target letter later.' };
let bad = 0;
// pass 1: a picture that is a target-onset word in ANY locale is never a decoy anywhere (a child might name it that way)
const anyT = { t: new Set(), p: new Set() };
for (const loc of LOCS) for (const [tn, t] of Object.entries(Mf.themes)) { if (!THEMES.has(tn)) continue; for (const [noun, e] of Object.entries(t.nouns)) { const v = e.vocabKey && V[e.vocabKey] && V[e.vocabKey][loc]; if (!v) continue; const w = String(v[0]).toLocaleLowerCase(loc).trim(); if (!w) continue; const c = RULES[loc](w); if (c === 't' || c === 'p') anyT[c].add(tn + '/' + noun); if (/^d/.test(w)) anyT.t.add(tn + '/' + noun); if (/^b/.test(w)) anyT.p.add(tn + '/' + noun); } }
for (const loc of LOCS) {
  // the cue animal must start with its target sound in this locale
  for (const [tg, cues] of Object.entries(CUES)) for (const cue of cues) {
    const [tn, noun] = cue.split('/'); const e = Mf.themes[tn] && Mf.themes[tn].nouns[noun];
    const v = e && V[e.vocabKey] && V[e.vocabKey][loc]; const w = v && String(v[0]).toLocaleLowerCase(loc);
    if (!w || RULES[loc](w) !== tg) { bad++; console.log('CUE FAILS', loc, cue, w, '→', w && RULES[loc](w)); }
  }
  const all = [];
  const seen = new Set();
  for (const [tn, t] of Object.entries(Mf.themes)) {
    if (!THEMES.has(tn)) continue;
    for (const [noun, e] of Object.entries(t.nouns)) {
      const src = tn + '/' + noun;
      if (!e.vocabKey || TEXT_PICTURES.has(src)) continue;
      if (refusedPicture ? refusedPicture(tn, noun) : PICTURE_REFUSALS.has(tn + '|' + noun)) continue;
      const v = V[e.vocabKey]; if (!v || !v[loc]) continue;
      if (excluded(e.vocabKey, loc)) continue;
      const w = String(v[loc][0]).toLocaleLowerCase(loc).trim();
      if (!w || /[\s-]/.test(w) || seen.has(w)) continue;
      seen.add(w); all.push({ src, word: v[loc][0], w, cls: RULES[loc](w) });
    }
  }
  out[loc] = {};
  for (const tg of ['t', 'p']) {
    const cueSet = new Set(Object.values(CUES).flat());
    const ok = (c) => !REFUSED_CARDS.has(c.src) && !HMX_REFUSED.has(c.src) && !cueSet.has(c.src) && !(REFUSED_BY_LOC[loc] || []).includes(c.src);
    const cards = all.filter((c) => c.cls === tg && ok(c)).map((c) => ({ src: c.src, word: c.word }));
    const decoy = all.filter((c) => CONT.has(c.cls) && c.cls !== TWIN[tg] && ok(c) && !anyT[tg].has(c.src) && !new RegExp('^' + TWIN[tg]).test(c.w)).map((c) => ({ src: c.src, word: c.word, laterL: c.w.slice(1).includes(tg) }));
    out[loc][tg] = { l: cards, decoy };
    console.log(`${loc} /${tg}/: cards ${cards.length}  decoys ${decoy.length} (later ${decoy.filter((d) => d.laterL).length})`);
  }
}
const dst = path.join(__dirname, '..', '..', 'data', 'hmx', 'sound-pools.json');
fs.writeFileSync(dst, JSON.stringify(out, null, 1) + '\n');
console.log('→', path.relative(process.cwd(), dst), bad ? '(' + bad + ' cue failures)' : '');
process.exit(bad ? 1 : 0);
