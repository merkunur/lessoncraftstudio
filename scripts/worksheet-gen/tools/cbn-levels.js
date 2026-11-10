#!/usr/bin/env node
/** cbn-levels.js — every Color by Number design's measured level into data/cbn/design-levels.json, so a maker page reads a level without fetching the drawing (docs/makers/FLAGSHIP.md). Run after tools/cbn-lineart-build.js. */
'use strict';
const fs = require('fs'); const path = require('path');
const { DESIGNS, levelOf } = require('../data/cbn/designs.js');
const out = {}; for (const d of DESIGNS) out[d.id] = levelOf(d);
fs.writeFileSync(path.join(__dirname, '..', 'data', 'cbn', 'design-levels.json'), JSON.stringify(out));
console.log('levels', Object.keys(out).length);
