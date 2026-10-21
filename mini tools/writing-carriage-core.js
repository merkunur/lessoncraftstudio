/* =====================================================================
   writing-carriage-core.js — the model of ACTIVITY #73 of the one-by-one
   rebuild: "Penny's Alphabet Trace" → THE WRITING CARRIAGE (L.K.1.a, 11
   locales). Design sheet: docs/activities-rebuild/designs/073-penny-alphabet-trace.md
   ---------------------------------------------------------------------
   THE INVENTION: the child always writes in the same window and the paper
   moves under it like a typewriter carriage — every finished letter glides
   out to the left and sits on the line beside the others, so a letter
   that did not reach its line looks wrong next to its neighbours. Each
   letter is traced on its road, then written again with only the ruling
   and the start dot. The alphabet wall fills with the child's own letters.
   Letters only: words, sentences and word spacing belong to New #218.

   JUDGING is the shared live tracer (stroke-trace-core.js, read-only): it
   credits only arc length the finger swept from the start dot, in order;
   the write step is judged on the hidden path at 1.3 × the corridor.
   GLYPHS: the 52 of alphabet-trace-core.js (read-only); the locale letters
   (Ä Ö Ü ß Ñ Å Æ Ø …) are generated as DATA by Letter Studio's composer —
   base glyph + mark written LAST — and the rulings are Letter Studio's
   per-country table, copied as data (built by the scratchpad wc-build.js).
   No DOM. UMD: window.WritingCarriageCore / module.exports.
   ===================================================================== */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    var A = root && root.AlphabetTraceCore, S = root && root.StrokeTraceCore;
    if (!A) A = require('./alphabet-trace-core.js').AlphabetTraceCore;
    if (!S) S = require('./stroke-trace-core.js').StrokeTraceCore;
    module.exports = factory(A, S);
  } else root.WritingCarriageCore = factory(root.AlphabetTraceCore, root.StrokeTraceCore);
}(typeof self !== 'undefined' ? self : this, function (A, S) {
  'use strict';

  /*DATA-BEGIN*/
  /* each locale's alphabet in school order, its vowels, the range sets, it's "lettere straniere" (J K W X Y: in the set, on the wall's second row) */
  var ALPHA = {"en":{"letters":["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],"vowels":["A","E","I","O","U"],"ranges":{"af":["A","B","C","D","E","F"],"gl":["G","H","I","J","K","L"],"mr":["M","N","O","P","Q","R"],"sz":["S","T","U","V","W","X","Y","Z"]}},"de":{"letters":["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","Ä","Ö","Ü"],"lowerOnly":["ß"],"vowels":["A","E","I","O","U","Ä","Ö","Ü"],"ranges":{"af":["A","B","C","D","E","F"],"gl":["G","H","I","J","K","L"],"mr":["M","N","O","P","Q","R"],"sz":["S","T","U","V","W","X","Y","Z"]}},"nl":{"letters":["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],"vowels":["A","E","I","O","U"],"ranges":{"af":["A","B","C","D","E","F"],"gl":["G","H","I","J","K","L"],"mr":["M","N","O","P","Q","R"],"sz":["S","T","U","V","W","X","Y","Z"]}},"da":{"letters":["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","Æ","Ø","Å"],"vowels":["A","E","I","O","U","Y","Æ","Ø","Å"],"ranges":{"af":["A","B","C","D","E","F"],"gl":["G","H","I","J","K","L"],"mr":["M","N","O","P","Q","R"],"sz":["S","T","U","V","W","X","Y","Z","Æ","Ø","Å"]}},"sv":{"letters":["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","Å","Ä","Ö"],"vowels":["A","E","I","O","U","Y","Å","Ä","Ö"],"ranges":{"af":["A","B","C","D","E","F"],"gl":["G","H","I","J","K","L"],"mr":["M","N","O","P","Q","R"],"sz":["S","T","U","V","W","X","Y","Z","Å","Ä","Ö"]}},"no":{"letters":["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","Æ","Ø","Å"],"vowels":["A","E","I","O","U","Y","Æ","Ø","Å"],"ranges":{"af":["A","B","C","D","E","F"],"gl":["G","H","I","J","K","L"],"mr":["M","N","O","P","Q","R"],"sz":["S","T","U","V","W","X","Y","Z","Æ","Ø","Å"]}},"es":{"letters":["A","B","C","D","E","F","G","H","I","J","K","L","M","N","Ñ","O","P","Q","R","S","T","U","V","W","X","Y","Z"],"vowels":["A","E","I","O","U"],"ranges":{"af":["A","B","C","D","E","F"],"gl":["G","H","I","J","K","L"],"mr":["M","N","Ñ","O","P","Q","R"],"sz":["S","T","U","V","W","X","Y","Z"]}},"it":{"letters":["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],"vowels":["A","E","I","O","U"],"foreign":["J","K","W","X","Y"],"ranges":{"af":["A","B","C","D","E","F"],"gl":["G","H","I","J","K","L"],"mr":["M","N","O","P","Q","R"],"sz":["S","T","U","V","W","X","Y","Z"]}},"pt":{"letters":["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],"vowels":["A","E","I","O","U"],"ranges":{"af":["A","B","C","D","E","F"],"gl":["G","H","I","J","K","L"],"mr":["M","N","O","P","Q","R"],"sz":["S","T","U","V","W","X","Y","Z"]}},"fr":{"letters":["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],"vowels":["A","E","I","O","U","Y"],"ranges":{"af":["A","B","C","D","E","F"],"gl":["G","H","I","J","K","L"],"mr":["M","N","O","P","Q","R"],"sz":["S","T","U","V","W","X","Y","Z"]}},"fi":{"letters":["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","Å","Ä","Ö"],"vowels":["A","E","I","O","U","Y","Ä","Ö"],"ranges":{"af":["A","B","C","D","E","F"],"gl":["G","H","I","J","K","L"],"mr":["M","N","O","P","Q","R"],"sz":["S","T","U","V","W","X","Y","Z","Å","Ä","Ö"]}}};
  /* the first-letters sets (K-258 / lowercase): straight lines first, then curves */
  var FIRST = {"upper":["L","T","I","E","H","F","O","C"],"lower":["l","t","i","o","c","a","d"]};
  /* the locale letters the 52 do not carry, composed as base + mark LAST (Æ æ ß authored), in the 0..100 glyph box */
  var EXTRA = {"Ä":[[{"x":50,"y":16},{"x":46,"y":29.6},{"x":42,"y":43.2},{"x":38,"y":56.8},{"x":34,"y":70.4},{"x":30,"y":84}],[{"x":50,"y":16},{"x":54,"y":29.6},{"x":58,"y":43.2},{"x":62,"y":56.8},{"x":66,"y":70.4},{"x":70,"y":84}],[{"x":36,"y":60},{"x":45.3,"y":60},{"x":54.7,"y":60},{"x":64,"y":60}],[{"x":39.6,"y":8.25},{"x":39.6,"y":9.75}],[{"x":60.4,"y":8.25},{"x":60.4,"y":9.75}]],"ä":[[{"x":58.5,"y":46.7},{"x":49,"y":44},{"x":39.5,"y":46.7},{"x":32.5,"y":54},{"x":30,"y":64},{"x":32.5,"y":74},{"x":39.5,"y":81.3},{"x":49,"y":84},{"x":58.5,"y":81.3},{"x":65.5,"y":74},{"x":68,"y":64},{"x":65.5,"y":54},{"x":58.5,"y":46.7}],[{"x":68,"y":44},{"x":68,"y":52},{"x":68,"y":60},{"x":68,"y":68},{"x":68,"y":76},{"x":68,"y":84}],[{"x":39.12,"y":29.25},{"x":39.12,"y":30.75}],[{"x":58.88,"y":29.25},{"x":58.88,"y":30.75}]],"Ö":[[{"x":61.5,"y":20.6},{"x":56,"y":17.2},{"x":50,"y":16},{"x":44,"y":17.2},{"x":38.5,"y":20.6},{"x":33.7,"y":26},{"x":30.1,"y":33},{"x":27.8,"y":41.2},{"x":27,"y":50},{"x":27.8,"y":58.8},{"x":30.1,"y":67},{"x":33.7,"y":74},{"x":38.5,"y":79.4},{"x":44,"y":82.8},{"x":50,"y":84},{"x":56,"y":82.8},{"x":61.5,"y":79.4},{"x":66.3,"y":74},{"x":69.9,"y":67},{"x":72.2,"y":58.8},{"x":73,"y":50},{"x":72.2,"y":41.2},{"x":69.9,"y":33},{"x":66.3,"y":26},{"x":61.5,"y":20.6}],[{"x":39,"y":8.25},{"x":39,"y":9.75}],[{"x":61,"y":8.25},{"x":61,"y":9.75}]],"ö":[[{"x":60,"y":46.7},{"x":50,"y":44},{"x":40,"y":46.7},{"x":32.7,"y":54},{"x":30,"y":64},{"x":32.7,"y":74},{"x":40,"y":81.3},{"x":50,"y":84},{"x":60,"y":81.3},{"x":67.3,"y":74},{"x":70,"y":64},{"x":67.3,"y":54},{"x":60,"y":46.7}],[{"x":39.6,"y":29.25},{"x":39.6,"y":30.75}],[{"x":60.4,"y":29.25},{"x":60.4,"y":30.75}]],"Ü":[[{"x":30,"y":16},{"x":30,"y":26},{"x":30,"y":36},{"x":30,"y":46},{"x":30,"y":56},{"x":31,"y":64.7},{"x":33.8,"y":72.5},{"x":38.2,"y":78.7},{"x":43.8,"y":82.6},{"x":50,"y":84},{"x":56.2,"y":82.6},{"x":61.8,"y":78.7},{"x":66.2,"y":72.5},{"x":69,"y":64.7},{"x":70,"y":56},{"x":70,"y":46},{"x":70,"y":36},{"x":70,"y":26},{"x":70,"y":16}],[{"x":39.6,"y":8.25},{"x":39.6,"y":9.75}],[{"x":60.4,"y":8.25},{"x":60.4,"y":9.75}]],"ü":[[{"x":30,"y":44},{"x":30,"y":54},{"x":30,"y":64},{"x":31,"y":70.2},{"x":33.8,"y":75.8},{"x":38.2,"y":80.2},{"x":43.8,"y":83},{"x":50,"y":84},{"x":56.2,"y":83},{"x":61.8,"y":80.2},{"x":66.2,"y":75.8},{"x":69,"y":70.2},{"x":70,"y":64},{"x":70,"y":54},{"x":70,"y":44}],[{"x":70,"y":44},{"x":70,"y":54},{"x":70,"y":64},{"x":70,"y":74},{"x":70,"y":84}],[{"x":39.6,"y":29.25},{"x":39.6,"y":30.75}],[{"x":60.4,"y":29.25},{"x":60.4,"y":30.75}]],"ß":[[{"x":30,"y":22},{"x":30,"y":30.9},{"x":30,"y":39.7},{"x":30,"y":48.6},{"x":30,"y":57.4},{"x":30,"y":66.3},{"x":30,"y":75.1},{"x":30,"y":84}],[{"x":30,"y":37},{"x":31.9,"y":27.5},{"x":37,"y":20.5},{"x":44,"y":18},{"x":51,"y":20.5},{"x":56.1,"y":27.5},{"x":58,"y":37},{"x":56.1,"y":46.5},{"x":51,"y":53.5},{"x":44,"y":56}],[{"x":46,"y":56},{"x":52.3,"y":57.1},{"x":57.5,"y":60.3},{"x":60.9,"y":65},{"x":62,"y":70.5},{"x":60.5,"y":75.9},{"x":56.7,"y":80.4},{"x":51.2,"y":83.2},{"x":44.9,"y":84},{"x":38.7,"y":82.5},{"x":33.7,"y":79}]],"Æ":[[{"x":46,"y":16},{"x":41.2,"y":29.6},{"x":36.4,"y":43.2},{"x":31.6,"y":56.8},{"x":26.8,"y":70.4},{"x":22,"y":84}],[{"x":46,"y":16},{"x":46,"y":29.6},{"x":46,"y":43.2},{"x":46,"y":56.8},{"x":46,"y":70.4},{"x":46,"y":84}],[{"x":32,"y":54},{"x":39,"y":54},{"x":46,"y":54}],[{"x":46,"y":16},{"x":56.7,"y":16},{"x":67.3,"y":16},{"x":78,"y":16}],[{"x":46,"y":54},{"x":55.3,"y":54},{"x":64.7,"y":54},{"x":74,"y":54}],[{"x":46,"y":84},{"x":56.7,"y":84},{"x":67.3,"y":84},{"x":78,"y":84}]],"æ":[[{"x":40.5,"y":46.7},{"x":33,"y":44},{"x":25.5,"y":46.7},{"x":20,"y":54},{"x":18,"y":64},{"x":20,"y":74},{"x":25.5,"y":81.3},{"x":33,"y":84},{"x":40.5,"y":81.3},{"x":46,"y":74},{"x":48,"y":64},{"x":46,"y":54},{"x":40.5,"y":46.7}],[{"x":48,"y":44},{"x":48,"y":54},{"x":48,"y":64},{"x":48,"y":74},{"x":48,"y":84}],[{"x":48,"y":64},{"x":59.3,"y":64},{"x":70.7,"y":64},{"x":82,"y":64},{"x":79.7,"y":54},{"x":73.5,"y":46.7},{"x":65,"y":44},{"x":56.5,"y":46.7},{"x":50.3,"y":54},{"x":48,"y":64},{"x":50.3,"y":74},{"x":56.5,"y":81.3},{"x":65,"y":84},{"x":73.5,"y":81.3}]],"Ø":[[{"x":61.5,"y":20.6},{"x":56,"y":17.2},{"x":50,"y":16},{"x":44,"y":17.2},{"x":38.5,"y":20.6},{"x":33.7,"y":26},{"x":30.1,"y":33},{"x":27.8,"y":41.2},{"x":27,"y":50},{"x":27.8,"y":58.8},{"x":30.1,"y":67},{"x":33.7,"y":74},{"x":38.5,"y":79.4},{"x":44,"y":82.8},{"x":50,"y":84},{"x":56,"y":82.8},{"x":61.5,"y":79.4},{"x":66.3,"y":74},{"x":69.9,"y":67},{"x":72.2,"y":58.8},{"x":73,"y":50},{"x":72.2,"y":41.2},{"x":69.9,"y":33},{"x":66.3,"y":26},{"x":61.5,"y":20.6}],[{"x":22,"y":89},{"x":28.2,"y":80.3},{"x":34.4,"y":71.7},{"x":40.7,"y":63},{"x":46.9,"y":54.3},{"x":53.1,"y":45.7},{"x":59.3,"y":37},{"x":65.6,"y":28.3},{"x":71.8,"y":19.7},{"x":78,"y":11}]],"ø":[[{"x":60,"y":46.7},{"x":50,"y":44},{"x":40,"y":46.7},{"x":32.7,"y":54},{"x":30,"y":64},{"x":32.7,"y":74},{"x":40,"y":81.3},{"x":50,"y":84},{"x":60,"y":81.3},{"x":67.3,"y":74},{"x":70,"y":64},{"x":67.3,"y":54},{"x":60,"y":46.7}],[{"x":25,"y":89},{"x":33.3,"y":80.7},{"x":41.7,"y":72.3},{"x":50,"y":64},{"x":58.3,"y":55.7},{"x":66.7,"y":47.3},{"x":75,"y":39}]],"Å":[[{"x":50,"y":16},{"x":46,"y":29.6},{"x":42,"y":43.2},{"x":38,"y":56.8},{"x":34,"y":70.4},{"x":30,"y":84}],[{"x":50,"y":16},{"x":54,"y":29.6},{"x":58,"y":43.2},{"x":62,"y":56.8},{"x":66,"y":70.4},{"x":70,"y":84}],[{"x":36,"y":60},{"x":45.3,"y":60},{"x":54.7,"y":60},{"x":64,"y":60}],[{"x":52,"y":6.5},{"x":50,"y":6},{"x":48,"y":6.5},{"x":46.5,"y":8},{"x":46,"y":10},{"x":46.5,"y":12},{"x":48,"y":13.5},{"x":50,"y":14},{"x":52,"y":13.5},{"x":53.5,"y":12},{"x":54,"y":10},{"x":53.5,"y":8},{"x":52,"y":6.5}]],"å":[[{"x":58.5,"y":46.7},{"x":49,"y":44},{"x":39.5,"y":46.7},{"x":32.5,"y":54},{"x":30,"y":64},{"x":32.5,"y":74},{"x":39.5,"y":81.3},{"x":49,"y":84},{"x":58.5,"y":81.3},{"x":65.5,"y":74},{"x":68,"y":64},{"x":65.5,"y":54},{"x":58.5,"y":46.7}],[{"x":68,"y":44},{"x":68,"y":52},{"x":68,"y":60},{"x":68,"y":68},{"x":68,"y":76},{"x":68,"y":84}],[{"x":52,"y":25.8},{"x":49,"y":25},{"x":46,"y":25.8},{"x":43.8,"y":28},{"x":43,"y":31},{"x":43.8,"y":34},{"x":46,"y":36.2},{"x":49,"y":37},{"x":52,"y":36.2},{"x":54.2,"y":34},{"x":55,"y":31},{"x":54.2,"y":28},{"x":52,"y":25.8}]],"Ñ":[[{"x":30,"y":16},{"x":30,"y":27.3},{"x":30,"y":38.7},{"x":30,"y":50},{"x":30,"y":61.3},{"x":30,"y":72.7},{"x":30,"y":84}],[{"x":30,"y":16},{"x":35.7,"y":25.7},{"x":41.4,"y":35.4},{"x":47.1,"y":45.1},{"x":52.9,"y":54.9},{"x":58.6,"y":64.6},{"x":64.3,"y":74.3},{"x":70,"y":84}],[{"x":70,"y":16},{"x":70,"y":27.3},{"x":70,"y":38.7},{"x":70,"y":50},{"x":70,"y":61.3},{"x":70,"y":72.7},{"x":70,"y":84}],[{"x":39.6,"y":10.4},{"x":44.28,"y":7},{"x":50,"y":9},{"x":55.72,"y":11},{"x":60.4,"y":7.6}]],"ñ":[[{"x":30,"y":44},{"x":30,"y":54},{"x":30,"y":64},{"x":30,"y":74},{"x":30,"y":84}],[{"x":30,"y":64},{"x":31,"y":57.8},{"x":33.8,"y":52.2},{"x":38.2,"y":47.8},{"x":43.8,"y":45},{"x":50,"y":44},{"x":56.2,"y":45},{"x":61.8,"y":47.8},{"x":66.2,"y":52.2},{"x":69,"y":57.8},{"x":70,"y":64},{"x":70,"y":74},{"x":70,"y":84}],[{"x":39.6,"y":32.8},{"x":44.28,"y":26},{"x":50,"y":30},{"x":55.72,"y":34},{"x":60.4,"y":27.2}]]};
  /* the per-country writing ruling (Letter Studio's table, ruled by ten native ensembles): lines {y, kind, tone} + an optional band */
  var RULING = {"de":{"system":"lineatur-1","zones":[{"y":14,"kind":"solid","tone":"faint"},{"y":44,"kind":"solid","tone":"mid"},{"y":84,"kind":"solid","tone":"strong"},{"y":96,"kind":"solid","tone":"faint"}],"band":{"from":44,"to":84}},"fr":{"system":"fr-interlignes","zones":[{"y":14,"kind":"solid","tone":"faint"},{"y":44,"kind":"solid","tone":"faint"},{"y":84,"kind":"solid","tone":"strong"},{"y":96,"kind":"solid","tone":"faint"}]},"it":{"system":"rigatura-prima","zones":[{"y":14,"kind":"solid","tone":"faint"},{"y":44,"kind":"solid","tone":"mid"},{"y":84,"kind":"solid","tone":"strong"},{"y":96,"kind":"solid","tone":"faint"}]},"es":{"system":"doble-raya","zones":[{"y":14,"kind":"solid","tone":"faint"},{"y":44,"kind":"solid","tone":"strong"},{"y":84,"kind":"solid","tone":"strong"}]},"pt":{"system":"pauta-numerada-1-2-3","zones":[{"y":14,"kind":"solid","tone":"faint"},{"y":84,"kind":"solid","tone":"strong"},{"y":96,"kind":"solid","tone":"faint"}],"band":{"from":44,"to":84}},"nl":{"system":"nl-blokschrift-liniatuur","zones":[{"y":14,"kind":"dashed","tone":"faint"},{"y":44,"kind":"solid","tone":"mid"},{"y":84,"kind":"solid","tone":"strong"},{"y":96,"kind":"dashed","tone":"faint"}]},"sv":{"system":"stodlinjerat","zones":[{"y":14,"kind":"solid","tone":"faint"},{"y":44,"kind":"solid","tone":"mid"},{"y":84,"kind":"solid","tone":"strong"},{"y":96,"kind":"solid","tone":"faint"}]},"da":{"system":"skrivehus","zones":[{"y":14,"kind":"solid","tone":"faint"},{"y":44,"kind":"solid","tone":"mid"},{"y":84,"kind":"solid","tone":"strong"},{"y":96,"kind":"solid","tone":"faint"}]},"no":{"system":"3-zone","zones":[{"y":14,"kind":"dashed","tone":"faint"},{"y":44,"kind":"dashed","tone":"mid"},{"y":84,"kind":"solid","tone":"strong"},{"y":96,"kind":"dashed","tone":"faint"}]},"fi":{"system":"viivasto-4","zones":[{"y":14,"kind":"solid","tone":"mid"},{"y":44,"kind":"solid","tone":"mid"},{"y":84,"kind":"solid","tone":"mid"},{"y":96,"kind":"solid","tone":"mid"}],"band":{"from":44,"to":84}},"default":{"system":"3-zone","zones":[{"y":14,"kind":"dashed","tone":"faint"},{"y":44,"kind":"dashed","tone":"mid"},{"y":84,"kind":"solid","tone":"strong"},{"y":96,"kind":"dashed","tone":"faint"}]}};
  /*DATA-END*/

  var LOCALES = ['en', 'de', 'nl', 'da', 'sv', 'no', 'es', 'it', 'pt', 'fr', 'fi'];
  var LEVELS = ['upper', 'lower'];
  var SETS = ['all', 'af', 'gl', 'mr', 'sz', 'vowels', 'first'];
  var PRACTICES = ['tw', 'tww', 't'];
  /* the write step is judged on the hidden path, 1.3 × the trace corridor (design §5) */
  var WRITE_CORRIDOR = Math.round(S.CORRIDOR * 1.3 * 10) / 10;

  function locale(l) { l = String(l || 'en').slice(0, 2); return ALPHA[l] ? l : 'en'; }
  function levelOf(v) { return LEVELS.indexOf(v) >= 0 ? v : 'upper'; }
  function setOf(v) { return SETS.indexOf(v) >= 0 ? v : 'all'; }
  function practiceOf(v) { return PRACTICES.indexOf(v) >= 0 ? v : 'tw'; }
  function seeded(s) { var h = 2166136261; for (var i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619); return function () { h = Math.imul(h ^ (h >>> 15), 2246822507); h = Math.imul(h ^ (h >>> 13), 3266489909); return ((h ^= h >>> 16) >>> 0) / 4294967296; }; }
  function shuffle(a, rnd) { for (var j = a.length - 1; j > 0; j--) { var k = Math.floor(rnd() * (j + 1)), x = a[j]; a[j] = a[k]; a[k] = x; } return a; }
  function caseOf(level, ch) { return level === 'upper' ? ch : ch.toLocaleLowerCase(); }

  /* ---------------- the letters ---------------- */
  /* the locale's alphabet in its own order, in the asked case (ß exists only in lowercase) */
  function alphabet(loc, level) {
    loc = locale(loc); level = levelOf(level);
    var A = ALPHA[loc], out = A.letters.map(function (c) { return caseOf(level, c); });
    if (level === 'lower' && A.lowerOnly) out = out.concat(A.lowerOnly);
    return out;
  }
  function foreign(loc) { return (ALPHA[locale(loc)].foreign || []).slice(); }
  function isForeign(loc, ch) { return foreign(loc).indexOf(ch.toLocaleUpperCase()) >= 0; }
  /* the letters a set teaches, in alphabet order (a range set takes the locale letters that fall in it) */
  function setLetters(loc, level, set) {
    loc = locale(loc); level = levelOf(level); set = setOf(set);
    var A = ALPHA[loc], all = alphabet(loc, level), U = function (c) { return c.toLocaleUpperCase(); };
    if (set === 'all') return all;
    if (set === 'vowels') return A.vowels.map(function (c) { return caseOf(level, c); });
    if (set === 'first') return FIRST[level].slice();
    var R = A.ranges[set];
    return all.filter(function (c) { return R.indexOf(U(c)) >= 0; });
  }
  /* round ids: the letter itself; a vowel set shorter than 7 is padded with the two most-confused vowels again, write-only ("O~2") */
  function ids(loc, level, set) {
    var L = setLetters(loc, level, set), out = L.slice();
    if (setOf(set) === 'vowels') { var pad = level === 'lower' ? ['o', 'u'] : ['O', 'U'], k = 0; while (out.length < 7) { out.push(pad[k % 2] + '~2'); k++; } }
    return out;
  }
  function letterOf(id) { return String(id).split('~')[0]; }
  function glyph(ch) { return EXTRA[ch] || (A.GLYPHS && A.GLYPHS[ch]) || null; }

  /* a round: one letter, its steps (trace / write) by the Practice setting; a pad round is write-only */
  function round(loc, level, set, id, practice) {
    loc = locale(loc); level = levelOf(level); practice = practiceOf(practice);
    var ch = letterOf(id), g = glyph(ch), pad = String(id).indexOf('~') > 0;
    if (!g) throw new Error('no glyph for ' + ch);
    var steps = practice === 't' ? ['trace'] : pad ? ['write'] : practice === 'tww' ? ['trace', 'write', 'write'] : ['trace', 'write'];
    return { id: String(id), loc: loc, level: level, letter: ch, pad: pad, steps: steps, strokes: g, box: bbox(g), foreign: isForeign(loc, ch) };
  }
  function bbox(strokes) {
    var x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity;
    strokes.forEach(function (s) { s.forEach(function (p) { if (p.x < x0) x0 = p.x; if (p.x > x1) x1 = p.x; if (p.y < y0) y0 = p.y; if (p.y > y1) y1 = p.y; }); });
    return { x0: x0, x1: x1, y0: y0, y1: y1, cx: (x0 + x1) / 2, w: x1 - x0 };
  }
  /* how far the paper moves for a finished letter: the letter's width plus a letter gap */
  function advance(r) { return Math.max(26, r.box.w) + 16; }

  /* pass 1 runs in alphabet order (the wall fills left to right); every later pass is an order-only reshuffle, never the last order, never its last letter first */
  function plan(loc, level, set, rnd, prev, pass) {
    var all = ids(loc, level, set);
    if (!pass) return all.slice();
    for (var t = 0; t < 2000; t++) {
      var o = shuffle(all.slice(), rnd);
      if (prev && prev.length && (prev.join() === o.join() || prev[prev.length - 1] === o[0])) continue;
      return o;
    }
    return shuffle(all.slice(), rnd);
  }

  /* ---------------- the hand ---------------- */
  function newStep(st) {
    var kind = st.kinds[st.step];
    st.tr = S.newTrace(st.r.strokes, { corridor: kind === 'write' ? WRITE_CORRIDOR : S.CORRIDOR });
    st.ink = []; st.cur = null; st.uncredited = false; st.wrongEnd = false;
  }
  function newState(r) {
    var st = { r: r, kinds: r.steps.slice(), step: 0, inks: [], misses: 0, help: 0, show: false, last: null, done: false, demo: false };
    newStep(st);
    return st;
  }
  function kind(st) { return st.kinds[st.step]; }
  /* finger down: a new ink stroke; a new stroke takes the help away until the next Check */
  function down(st, pt) {
    if (st.done) return null;
    var sp = S.startPoint(st.tr), L = st.tr.lanes[st.tr.idx];
    /* begun away from where the cursor stands (the green dot, or the end of the ink so far)? */
    var at = st.tr.u > 0 ? S.cursorPoint(st.tr) : sp, far = !!at && Math.sqrt((pt.x - at.x) * (pt.x - at.x) + (pt.y - at.y) * (pt.y - at.y)) > st.tr.corridor * 1.5;
    st.cur = { pts: [{ x: pt.x, y: pt.y, e: false }], from: st.tr.u, idx: st.tr.idx, far: far && !!L && !L.isDot };
    st.ink.push(st.cur); st.show = false; st.last = null;
    var r = S.sample(st.tr, pt);
    st.cur.pts[0].e = r.on;
    return r;
  }
  /* finger moves: the tracer credits only arc length swept from the cursor; e = this sample was on the path */
  function move(st, pt) {
    if (st.done || !st.cur) return null;
    var before = st.tr.u + st.tr.idx * 1e6, r = S.sample(st.tr, pt), after = st.tr.u + st.tr.idx * 1e6;
    st.cur.pts.push({ x: pt.x, y: pt.y, e: r.on && after >= before });
    return r;
  }
  /* finger up: 'stroke' / 'letter' (the step is written) / 'round' (every step done) / 'incomplete' */
  function up(st) {
    if (st.done || !st.cur) return null;
    var cur = st.cur, res = S.endStroke(st.tr);
    st.cur = null;
    if (res === 'incomplete') {
      /* a trace from the wrong end earns nothing: the stroke was drawn, the cursor never moved */
      /* a line begun away from the green dot that earned less than a third of the stroke: drawn from the wrong end (or nowhere near it) */
      var Ln = st.tr.lanes[st.tr.idx];
      if (cur.idx === st.tr.idx && cur.pts.length > 3 && Ln && !Ln.isDot && (cur.far || wrongWay(cur, Ln, cur.from))) {
        /* a wrong-end line earns nothing: hand back any arc the tracer let it take near the dot */
        st.tr.u = cur.from; while (st.tr.i > 0 && Ln.cum[st.tr.i] > cur.from) st.tr.i--; if (!cur.from) st.tr.n = 0;
        cur.pale = true; if (kind(st) === 'trace') { st.wrongEnd = true; st.show = true; st.last = { reason: 'wrongEnd' }; } }
      st.uncredited = true;
      return { res: 'incomplete' };
    }
    st.uncredited = false; st.wrongEnd = false;
    if (res === 'stroke-ok') return { res: 'stroke' };
    /* the letter is written: keep its ink, move on to the next step */
    st.inks.push({ kind: kind(st), ink: st.ink.filter(function (s) { return !s.pale; }).map(function (s) { return s.pts.map(function (p) { return { x: p.x, y: p.y }; }); }) });
    st.help = 0; st.show = false;
    if (st.step + 1 >= st.kinds.length) { st.done = true; st.last = { reason: 'right' }; return { res: 'round' }; }
    st.step++; newStep(st);
    return { res: 'letter' };
  }
  /* set off against the arrow: the finger's first 6 units point away from the stroke's direction at the cursor */
  function wrongWay(cur, L, u) {
    var p0 = cur.pts[0], v = null, i, k = 0;
    for (i = 1; i < cur.pts.length; i++) { var dx = cur.pts[i].x - p0.x, dy = cur.pts[i].y - p0.y; if (dx * dx + dy * dy >= 36) { v = { x: dx, y: dy }; break; } }
    if (!v) return false;
    while (k + 1 < L.pts.length && L.cum[k] < u) k++;
    var a = L.pts[k], b = L.pts[Math.min(L.pts.length - 1, k + 5)];
    return v.x * (b.x - a.x) + v.y * (b.y - a.y) < 0;
  }
  /* rub out: clears the current letter's strokes only */
  function erase(st) { if (st.done) return false; newStep(st); st.show = false; st.last = null; return true; }
  /* Check: nothing drawn → a hint, no miss; otherwise a miss (unfinished trace / write off the path) */
  function check(st) {
    if (st.done) return { ok: true };
    var drawn = st.ink.length > 0 || st.tr.strokesDone > 0;
    if (!drawn) { st.show = true; st.last = { reason: 'empty' }; return { ok: false, reason: 'empty' }; }
    st.misses++; st.help = Math.min(2, st.help + 1); st.show = true;
    var reason = kind(st) === 'write' ? 'off' : 'unfinished';
    /* miss 2 in a write step: the write step turns back into a trace step for this letter */
    if (st.help >= 2 && kind(st) === 'write') { st.kinds[st.step] = 'trace'; newStep(st); reason = 'toTrace'; }
    st.last = { reason: reason };
    return { ok: false, reason: reason };
  }
  function hint(st) {
    if (!st.show || !st.last) return null;
    var L = st.last.reason;
    if (L === 'empty') return 'hEmpty';
    if (L === 'wrongEnd') return 'hWrongEnd';
    if (st.help >= 2) return 'hMiss2';
    if (L === 'off') return 'hOff';
    if (L === 'unfinished') return 'hUnfinished';
    return null;
  }
  /* what the apparatus shows as help: miss 1 the travelling light (trace) or the shadow letter (write); miss 2 the spark */
  function helpOf(st) {
    if (st.done || !st.show || !st.last || st.help < 1) return null;
    if (st.help >= 2) return { spark: true, stroke: st.tr.idx };
    return kind(st) === 'write' ? { shadow: true } : { light: true, stroke: st.tr.idx };
  }
  /* the start dot of the stroke being written (only the current one — later dots appear when the previous stroke is done) */
  function startDot(st) { if (st.done) return null; var p = S.startPoint(st.tr), L = st.tr.lanes[st.tr.idx]; if (!p || !L) return null; var q = L.pts[Math.min(L.pts.length - 1, 6)]; return { x: p.x, y: p.y, dx: q.x - p.x, dy: q.y - p.y, isDot: L.isDot }; }
  /* the path a demonstration (Space) or the spark walks: never credited */
  function demoPath(st) { var L = st.tr.lanes[st.tr.idx]; return L ? L.pts.map(function (p) { return { x: p.x, y: p.y }; }) : []; }

  function ruling(loc) { return RULING[locale(loc)] || RULING['default']; }
  /* sizes: the glyph box is 0..100 units; x-height (40 u) is 84 px wide, 64 px on a phone, 58 px at 320 */
  function layout(W) {
    var wide = W >= 560, tiny = W < 320;
    var xh = wide ? 84 : tiny ? 58 : 64, scale = xh / 40;
    return { mode: wide ? 'wide' : 'narrow', W: W, scale: scale, xh: xh, wu: W / scale, win: 110, winCx: Math.round(W / scale * (wide ? 0.6 : 0.56)), dot: wide ? 11 : 13 };
  }

  return {
    DATA: { ALPHA: ALPHA, EXTRA: EXTRA, RULING: RULING, FIRST: FIRST }, LOCALES: LOCALES, LEVELS: LEVELS, SETS: SETS, PRACTICES: PRACTICES, WRITE_CORRIDOR: WRITE_CORRIDOR,
    locale: locale, levelOf: levelOf, setOf: setOf, practiceOf: practiceOf, seeded: seeded, shuffle: shuffle,
    alphabet: alphabet, foreign: foreign, isForeign: isForeign, setLetters: setLetters, ids: ids, letterOf: letterOf, glyph: glyph, round: round, bbox: bbox, advance: advance, plan: plan,
    newState: newState, kind: kind, down: down, move: move, up: up, erase: erase, check: check, hint: hint, helpOf: helpOf, startDot: startDot, demoPath: demoPath,
    ruling: ruling, layout: layout, Trace: S
  };
}));
