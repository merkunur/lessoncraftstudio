#!/usr/bin/env node
// pt-pair.js a b [c] — put scene previews side by side at print scale (675 px each) → out/pt/pair.png
'use strict';
const path = require('path'); const sharp = require('sharp');
(async () => {
  const ids = process.argv.slice(2); const comp = [];
  for (let i = 0; i < ids.length; i++) comp.push({ input: await sharp(path.join(__dirname, '..', 'out', 'pt', 'scene-' + ids[i] + '.png')).resize(675, 716, { fit: 'contain', background: '#fff' }).extend({ top: 2, bottom: 2, left: 2, right: 2, background: '#999' }).png().toBuffer(), left: i * 684, top: 0 });
  await sharp({ create: { width: ids.length * 684, height: 720, channels: 3, background: '#ccc' } }).composite(comp).png().toFile(path.join(__dirname, '..', 'out', 'pt', 'pair.png'));
})();
