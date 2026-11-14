/** G3-493 — Measure to the Nearest Quarter Inch (ruler-lengths factory, mode quarter-plot; Year pages Y, 2026-11-14) */
'use strict';
const { makeRulerLengthsType } = require('../_shared/ruler-lengths.js');
module.exports = makeRulerLengthsType({
  id: 'G3-493', slug: 'measure-to-the-quarter-inch', mode: 'quarter-plot', gradeBand: 'G3',
  i18n: { en: { title: 'Measure to the Nearest Quarter Inch', instruction: 'Each pencil is lined up with its own ruler. Write its length to the nearest quarter inch. Then draw an X on the line plot for each pencil and answer the questions. The rulers on this page are drawn smaller than a real ruler.' } },
});
