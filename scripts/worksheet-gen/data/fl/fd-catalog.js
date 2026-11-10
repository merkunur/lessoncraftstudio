/**
 * data/fl/fd-catalog.js — the flagship drawings as Find the Differences catalogue rows (data/fdx/catalog.js format): where a
 * drawing of each theme stands, how tall, which settings it belongs in. docs/makers/FLAGSHIP.md.
 */
'use strict';
const T = {
  'bugs bw': ['animal', 72, 'g', 'garden,meadow,forest'], 'dinosaurs bw': ['animal', 150, 'g', 'jungle,desert,mountain'], 'pets bw': ['animal', 110, 'g', 'livingroom,garden,park'],
  'ocean friends bw': ['animal', 110, 'u', 'sea,reef'], 'forest friends bw': ['animal', 120, 'g', 'forest'], 'safari friends bw': ['animal', 150, 'g', 'savanna,jungle,zoo'],
  'polar friends bw': ['animal', 130, 'g', 'polar,winter'], 'farm friends bw': ['animal', 130, 'g', 'farm'], 'fairy tales bw': ['person', 140, 'g', 'village,forest'],
  'space friends bw': ['object', 120, 's', 'space'], 'robots and monsters bw': ['person', 140, 'g', 'toyshop,party'], 'things that go bw': ['vehicle', 130, 'g', 'street,town'],
  'yummy food bw': ['food', 90, 't', 'kitchen,picnic,market,bakery'], 'school friends bw': ['object', 90, 't', 'classroom'], 'music bw': ['object', 100, 'g', 'party,livingroom'],
  'toys and play bw': ['object', 100, 'g', 'toyshop'], 'seasons bw': ['object', 110, 'g', 'park,garden'], 'celebrations bw': ['object', 100, 't', 'party'],
  'sports and play bw': ['object', 100, 'g', 'park,playground'], 'helpers bw': ['person', 150, 'g', 'street,town'], 'children bw': ['person', 150, 'g', 'park,playground'],
  'shape friends bw': ['object', 110, 'g', 'classroom,toyshop'], 'home friends bw': ['object', 100, 'g', 'livingroom,kitchen,bedroom'], 'nature friends bw': ['plant', 130, 'g', 'meadow,garden,forest'],
};
/** the rows of the drawings in the image cache's manifest */
function rows(manifest) {
  const { crayonsFor } = require('./crayons.js');
  const { groupOfTheme } = require('./groups.js');
  const out = [];
  for (const [theme, t] of Object.entries(manifest.themes)) {
    if (!t.fl || !T[theme]) continue;
    const [kind, h, places, tags] = T[theme];
    for (const noun of Object.keys(t.nouns)) out.push({ src: theme + '/' + noun, kind, h, places: places.split(','), tags: tags.split(','), colours: crayonsFor(noun, groupOfTheme.get(theme)).slice(0, 3), note: '', refused: false, noword: false, thin: false });
  }
  return out;
}
module.exports = { rows };
