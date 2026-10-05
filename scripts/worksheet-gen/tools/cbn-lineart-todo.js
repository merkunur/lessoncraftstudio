#!/usr/bin/env node
/** prints the line-art design ids whose hero has no colours yet (lineart-colours.js HERO), comma-separated */
'use strict';
const { LINEART } = require('../data/cbn/lineart-designs.js');
const { HERO } = require('../data/cbn/lineart-colours.js');
const n = +(process.argv[2] || 999);
console.log(LINEART.filter((d) => !HERO[d.id]).slice(0, n).map((d) => d.id).join(','));
