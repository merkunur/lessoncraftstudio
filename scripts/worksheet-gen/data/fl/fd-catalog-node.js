/** data/fl/fd-catalog-node.js — adds the flagship drawings to the Find the Differences catalogue (docs/makers/FLAGSHIP.md). Node tools only: the bundles never read it. */
'use strict';
const fs = require('fs'); const path = require('path');
const { CATALOG } = require('../fdx/catalog.js');
const man = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', 'cache', 'manifest.json'), 'utf8'));
for (const r of require('./fd-catalog.js').rows(man)) if (!CATALOG.has(r.src)) CATALOG.set(r.src, r);
