#!/usr/bin/env node
/* =====================================================================
   generate-activity-previews.js — render a real, content-clear preview
   thumbnail for every interactive activity, for the activities index cards.

   Activities have no screenshot/thumbnail; the index cards previously showed
   an abstract per-ENGINE glyph that couldn't distinguish activities sharing
   an engine. This script screenshots each activity's actual play area
   (.lcs-stage) — so "Count to 10 with Animals" shows animal counters, "Make
   10" shows the number bond, the clock activity shows a clock face, etc.

   - Serves `mini tools/` at /mini-tools/ AND repo `image-library-webp/` at
     /image-library-webp/ (so themed counters load) from a tiny static server.
   - Loads /mini-tools/<tool>.html?activity=<id>&lang=en&embed=compact, waits
     for .lcs-stage, seeds a content-rich state where on-load is empty
     (ten-frame), screenshots the stage element.
   - Sharp → 480×360 contain on a TRANSPARENT matte → WebP, so the card's
     subject-tinted panel shows through the padding. One canonical en render
     per activity (stage is ~language-neutral) reused across all 11 locales.

   Output: frontend/public/mini-tools/previews/<id>.webp  (gitignored; never
   committed per §A.3 — only this script is committed; the webps are scp'd to
   /var/www/lcs-media/mini-tools/previews/ at deploy).

   Usage: node scripts/generate-activity-previews.js [--only=<id-substr>]
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const http = require('http');
const puppeteer = require('puppeteer');
const sharp = require('sharp');

const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const IMGLIB = path.join(REPO, 'image-library-webp');
const OUT = path.join(REPO, 'frontend', 'public', 'mini-tools', 'previews');
const ONLY = (process.argv.find((a) => a.startsWith('--only=')) || '').split('=')[1] || '';

const MIME = {
  '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.html': 'text/html', '.svg': 'image/svg+xml', '.webp': 'image/webp',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.woff2': 'font/woff2',
};

function serve() {
  return http.createServer((req, res) => {
    const p = decodeURIComponent(req.url.split('?')[0]);
    let file;
    if (p.startsWith('/mini-tools/')) file = path.join(MINI, p.slice('/mini-tools/'.length));
    else if (p.startsWith('/image-library-webp/')) file = path.join(IMGLIB, p.slice('/image-library-webp/'.length));
    else if (p === '/' ) { res.statusCode = 404; res.end('no'); return; }
    else file = path.join(MINI, p.replace(/^\//, ''));
    fs.readFile(file, (e, b) => {
      if (e) { res.statusCode = 404; res.end('not found'); return; }
      res.setHeader('Content-Type', MIME[path.extname(file)] || 'application/octet-stream');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.end(b);
    });
  });
}

/* tool slug → mounted window global (CamelCase, hyphens dropped). */
function toolGlobal(tool) {
  return tool.split('-').map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join('');
}

/* Per-engine seed (only where on-load is an empty board). Returns a JS string
   run via page.evaluate; wrapped in try/catch by the caller. On-load fallback
   for every other engine (already content-rich). */
function seedScript(row) {
  const g = toolGlobal(row.tool);
  if (row.tool === 'ten-frame-activity') {
    const frames = (row.params && row.params.frames) || 1;
    const n = frames >= 2 ? 13 : 6; // show themed counters across the frame(s)
    return `(function(){var t=window['${g}'];if(t&&t.setCount){t.setCount(${n});if(t.paint)t.paint();}})();`;
  }
  if (row.tool === 'two-tales-activity') {
    // the shared plank laid across the two books — the bridge the activity is built on
    return `(function(){var t=window['${g}'];if(t&&t.st&&t._pick){t._pick(t.st.answer);t._lay('across');}})();`;
  }
  if (row.tool === 'event-tunnel-activity') {
    // "We clap during the song": the card inside the tunnel, the right phrase chosen, Check pressed — the lantern lights the tunnel and its windows glow
    return `(function(){var t=window['${g}'];if(t&&t.st&&t._start){t.FAST=true;t.OK_MS=600000;t._start(4,0);t._render2();t._choose('d');t._check();}})();`;
  }
  if (row.tool === 'mirror-chart-activity') {
    // the mop on the chart, "map" spelled in its boxes, Mirror pressed — the mirror shows a map, not the patient: the invention at work
    return `(function(){var t=window['${g}'];if(t&&t.st&&t._start){t.FAST=true;t.OK_MS=600000;t._start(1,0);t._render2();t._tile(1);t._look();}})();`;
  }
  if (row.tool === 'leapfrog-parts-activity') {
    // one twin pair found (its plate on the shelf), a second card lifted and leapfrogged in place: 4 + 7 shown as 7 + 4, the total bar unchanged
    return `(function(){var t=window['${g}'];if(t&&t.st&&t._start){t.FAST=true;t.OK_MS=600000;t._start(0,0);t._render2();var c=t.st.rd.cards,tw=function(i){return c.findIndex(function(d,j){return j!==i&&d.pair===c[i].pair;});};t._pick(0);t._pick(tw(0));var k=c.findIndex(function(d,j){return d.pair!==c[0].pair;});t._pick(k);t._view.leapNow=k;t._paint();}})();`;
  }
  if (row.tool === 'flip-pads-activity') {
    // 85, 90, [95], [100], 105: the empty pad's ones flap flipped once and checked — the leap meter reads +1 beside Hopper's +5: the invention at work
    return `(function(){var t=window['FlipPadsActivity'];if(t&&t.st&&t._start){t.FAST=true;t.OK_MS=600000;t._start(2);t._render2();t._flip(2,1);t._check();}})();`;
  }
  if (row.tool === 'twin-tubes-activity') {
    // 247, 274, 427: 247 against 200 + 70 + 4 in the twin stand — the tens tubes stand uneven, ringed, 4 against 7: the invention at work
    return `(function(){var t=window['TwinTubesActivity'];if(t&&t.st&&t._start){t.FAST=true;t.OK_MS=600000;t._start(0);t._render2();t._put('n0');t._put('e1');}})();`;
  }
  if (row.tool === 'acorn-sieve-activity') {
    // 15 + 22 + 34 + 11 tipped onto the bare sieve and shaken: 7 cups of ten on top, 12 loose acorns in the tray (one full groove and two): the invention at work
    return `(function(){var t=window['AcornSieveActivity'];if(t&&t.st&&t._start){t.FAST=true;t.OK_MS=600000;t.api.settings.cloth='off';t._start(6);t._render2();t._tip(0);t._tip(1);t._tip(2);t._tip(3);t._shake();}})();`;
  }
  if (row.tool === 'square-vice-activity') {
    // 160 + 50: ten of the eleven rods stacked on the vice's bed — the square gauge exactly covered, one rod still in the tens column: the invention at work
    return `(function(){var t=window['SquareViceActivity'];if(t&&t.st&&t._start){t.FAST=true;t.OK_MS=600000;t._start(0);t._render2();t._bay('T',10);}})();`;
  }
  if (row.tool === 'deciding-gate-activity') {
    // the invention at work: 389 vs 412 — the race stops at the hundreds gate, the bar in front of 389, the long view
    return `(function(){var t=window['DecidingGateActivity'];if(!t||!t.api)return;t.FAST=true;t.OK_MS=600000;t.api.settings.job='compare';t.api.settings.digits='three';t._pool=null;t._ensurePool();t._start(0);t._render2();t._predict(0);t._sign('<');t._check();})();`;
  }
  if (row.tool === 'value-keys-activity') {
    // the invention at work: 305 made with 300 and 5 — no key in the tens, the tape prints 300 + 5
    return `(function(){var t=window['ValueKeysActivity'];if(!t||!t.api)return;t.FAST=true;t.OK_MS=600000;t.api.settings.job='make';t.api.settings.numbers='three';t._pool=null;t._ensurePool();var k=t._pool.findIndex(function(r){return r.n===305});t._start(k);t._render2();t._press('h',3);t._press('o',5);t._crank();})();`;
  }
  if (row.tool === 'capped-mat-activity') {
    // the invention at work: 307 capped 3 and 7 with the empty tens left bare → it folds, the hint reads 37
    return `(function(){var t=window['CappedMatActivity'];if(!t||!t.api)return;t.FAST=true;t.OK_MS=600000;t.api.settings.job='read';t.api.settings.blocks='tidy';t._pool=null;t._ensurePool();var k=t._pool.findIndex(function(r){return r.n===307});t._start(k);t._render2();t._capTo('h',3);t._capTo('o',7);t._check();})();`;
  }
  if (row.tool === 'glass-stack-activity') {
    // 247 + 10 with 248 typed: Comet leapt to 257, the flag planted where 248 lives — one row up, one column right — the column lit: the invention at work
    return `(function(){var t=window['GlassStackActivity'];if(t&&t.st&&t._start){t.FAST=true;t.OK_MS=600000;t._start(0);t._render2();t._tap('2');t._tap('4');t._tap('8');t._check();}})();`;
  }
  if (row.tool === 'takeaway-scoop-activity') {
    // 342 − 5: a ten snapped into ten cubes — all five of the scoop's cups lit over the ones shelf, ready to lift: the invention at work
    return `(function(){var t=window['TakeawayScoopActivity'];if(t&&t.st&&t._start){t.FAST=true;t.OK_MS=600000;t._start(0);t._render2();t._snap('T');}})();`;
  }
  if (row.tool === 'nested-crates-activity') {
    // 302 − 5: a crate opened into ten boxes and a box into ten cubes, the five cubes on Tuck's order slip — 2 crates, 9 boxes, 7 cubes left: the invention at work
    return `(function(){var t=window['NestedCratesActivity'];if(t&&t.st&&t._start){t.FAST=true;t.OK_MS=600000;t._start(0);t._render2();t._shelf('H',1);t._shelf('T',1);t._slip('O',5);}})();`;
  }
  if (row.tool === 'round-trip-activity') {
    // Gus had 45 cookies, sold 8: 47 typed and checked — the cart came back to 55, the gap bracket reads 10 (one ten off): the invention at work
    return `(function(){var t=window['RoundTripActivity'];if(t&&t.st&&t._start){t.FAST=true;t.OK_MS=600000;t._start(0);t._render2();t._tap('4');t._tap('7');t._check();}})();`;
  }
  if (row.tool === 'winter-piles-activity') {
    // (the tool file is winter-piles-activity but its global is SnowStackActivity) 6 rows of 3 acorns cut after rows 1 and 3 and stacked: piles of 3, 6, 9 — the extra rows stick out coral and the snow lid slides off: the invention at work
    return `(function(){var t=window['SnowStackActivity'];if(t&&t.st&&t._start){t.FAST=true;t.OK_MS=600000;t._start(7);t._render2();t._cut(1);t._cut(3);t._stack();}})();`;
  }
  if (row.tool === 'accordion-activity') {
    // 3 groups of 4 beads, the squeeze pressed: the 4 + 4 + 4 accordion folded flat into one face of 4 with three edges, stamped 3 × 4: the invention at work
    return `(function(){var t=window['${g}'];if(t&&t.st&&t._start){t.FAST=true;t.OK_MS=600000;t._start(1,0);t._render2();for(var i=0;i<3;i++)for(var j=0;j<4;j++)t._add(i);t._squeeze();}})();`;
  }
  if (row.tool === 'skewer-plate-activity') {
    // 3 rows of 4 raspberries, two skewers lifted into the rack with their boxes: the rack reads 4 + 4, one row still on the plate
    return `(function(){var t=window['${g}'];if(t&&t.st&&t._start){t.FAST=true;t.OK_MS=600000;t._start(1);t._render2();t._lift(0);t._type('4');t._lift(1);t._focus('k1');t._type('4');}})();`;
  }
  if (row.tool === 'chimney-roof-activity') {
    // 13 bricks poured into the two-wide tower, the chimney roof on: the lone brick sits under the chimney, the equation waits
    return `(function(){var t=window['${g}'];if(t&&t.st&&t._start){t.FAST=true;t.OK_MS=600000;t._start(2);t._render2();for(var i=0;i<13;i++)t._pour();t._roof('chimney');}})();`;
  }
  if (row.tool === 'replay-track-activity') {
    // Tom's marbles: 62 typed (the told numbers added) and replayed — Tom starts at 62, grows by 17 and sails past the 45 flag, the gap shaded: the invention at work
    return `(function(){var t=window['${g}'];if(t&&t.st&&t._start){t.FAST=true;t.OK_MS=600000;t._start(8);t._render2();t._type('6');t._type('2');t._replay();}})();`;
  }
  if (row.tool === 'stove-knob-activity') {
    // the heat ladder: warm, hot, boiling on the knob's clicks, Turn it up pressed — three flames, the soup at its deepest: flame and soup rose together
    return `(function(){var t=window['${g}'];if(t&&t.st&&t._start){t.FAST=true;t.OK_MS=600000;t._start(0,0);t._render2();var r=t.st.rd.tiles;[1,2,3].forEach(function(k,c){t._tile(r.findIndex(function(x){return x.rank===k;}));t._win(c);});t._check();}})();`;
  }
  if (row.tool === 'what-for-tags-activity') {
    // the winter day: beanie, mitten and sock on their moments, a fan hung under "It is dark in your room", Go pressed — three lock, the fan is back in the bag with its tag flipped open ("for hot days"): the invention at work
    return `(function(){var t=window['${g}'];if(t&&t.st&&t._start){t.FAST=true;t.OK_MS=600000;t._start(1,0);t._render2();var r=t.st.rd.right,x=t.st.rd.things.map(function(_,j){return j;}).filter(function(j){return r.indexOf(j)<0;});t._hang(0,r[0]);t._hang(1,r[1]);t._hang(2,r[2]);t._hang(3,x[0]);t._go();}})();`;
  }
  if (row.tool === 'climbing-tree-activity') {
    // level 3, the duck: climbed to the bird branch and onto the "swims" twig, Check pressed — the gold leaf reads "A duck is a bird that swims."
    return `(function(){var t=window['${g}'];if(t&&t.st&&t._start){t.FAST=true;t.OK_MS=600000;t.api.settings.level='3';t._pool=null;t._ensurePool();t._start(0,0);t._render2();t._climb(t.st.rd.right);t._twig(t.st.rd.rightTwig);t._check();}})();`;
  }
  if (row.tool === 'group-photo-activity') {
    // level 2: the bat among the birds sent to the step, the shutter pressed — a sharp photo with "birds" written under it: the invention at work
    return `(function(){var t=window['${g}'];if(t&&t.st&&t._start){t.FAST=true;t.OK_MS=600000;t.api.settings.level='2';t._pool=null;t._ensurePool();t._start(0,0);t._render2();t._seat_(t.st.rd.odd);t._snap();}})();`;
  }
  if (row.tool === 'divider-case-activity') {
    // "I packed apples, pears, and cherries.": the right commas, Pack pressed — a wall under each comma, one fruit in every pocket, the lid shut
    return `(function(){var t=window['${g}'],C=window.DividerCaseCore;if(t&&t.st&&t._start){t.FAST=true;t.OK_MS=600000;t._start(0,0);t._render2();C.required(t.st.loc,3).forEach(function(s){t._gap(s);});t._pack();}})();`;
  }
  if (row.tool === 'sentence-stage-activity') {
    // level 4, "The bats fly so high!": the shout laid on the script line, Check pressed — the bats rise in their spotlights with the stars of the exclamation mark
    return `(function(){var t=window['${g}'];if(t&&t.st&&t._start){t.FAST=true;t.OK_MS=600000;t.api.settings.level='4';t._pool=null;t._ensurePool();t._start(4,0);t._render2();t.st.rd.canon.forEach(function(id){t._block(id);});t._check();}})();`;
  }
  if (row.tool === 'turning-bridge-activity') {
    // level 2, "It was cold, so I put on my scarf": the arrow plank on the bridge on its so-face, Check pressed — the invention at work
    return `(function(){var t=window['${g}'],C=window.TurningBridgeCore;if(t&&t.st&&t._start){t.FAST=true;t.OK_MS=600000;t.api.settings.level='2';t._pool=null;t._ensurePool();t._start(1,0);t._render2();t._lay('arrow');if(t.st.face!==C.rightFace(t.st.rd,t.st.order))t._flip();t._check();}})();`;
  }
  if (row.tool === 'time-frames-activity') {
    // "Yesterday the boats sailed on the lake": the sailed card in the gap, Check pressed — it develops into a still photo and files into the album
    return `(function(){var t=window['${g}'];if(t&&t.st&&t._start){t.FAST=true;t.OK_MS=600000;t._start(0,0);t._render2();t._drop('past');t._check();}})();`;
  }
  if (row.tool === 'pronoun-prism-activity') {
    // "Pat saw him at the park": the he-prism in the gap turned to its target face, Check pressed — the arrow from saw lands in him
    return `(function(){var t=window['${g}'];if(t&&t.st&&t._start){t.FAST=true;t.OK_MS=600000;t._start(1,0);t._render2();t._place('he');t._turn(1);t._check();}})();`;
  }
  if (row.tool === 'verb-gates-activity') {
    // "The dogs are in the yard": the double gate hung, Check pressed — all three dogs through into the garden, one flower
    return `(function(){var t=window['${g}'];if(t&&t.st&&t._start){t.FAST=true;t.OK_MS=600000;t._start(2,0);t._render2();t._hang('many');t._check();}})();`;
  }
  if (row.tool === 'hook-tile-activity') {
    // the first round with the right hook seated: the ball hangs on the dog's peg — the invention at work
    return `(function(){var t=window['${g}'];if(t&&t.st&&t._start){t.FAST=true;t._start(0,0);t._render2();t._seat(t.st.rd.right);}})();`;
  }
  if (row.tool === 'field-guide-activity') {
    // the first contents round: the right line has sent the book to its page — the book opening where it was sent
    return `(function(){var t=window['${g}'];if(t&&t.st&&t._start){t.FAST=true;t._start(0,0);t._render2();t._send(t.st.rd.part);}})();`;
  }
  if (row.tool === 'point-of-view-activity') {
    // the low window chosen: the harbor object rises huge out of the frame — the invention at work
    return `(function(){var t=window['${g}'];if(t&&t._win){t._win('low');}})();`;
  }
  if (row.tool === 'array-activity') {
    // Fill every R×C cell so the array of dots + repeated-addition strip show.
    return `(function(){var t=window['${g}'];if(t&&t.filled&&t._key){for(var r=0;r<t.rows;r++)for(var c=0;c<t.cols;c++){t.filled[t._key(r,c)]=true;}if(t.paint)t.paint();}})();`;
  }
  if (row.tool === 'money-activity') {
    // tender one coin so the tray shows a coin + a non-zero running total
    return `(function(){var t=window['${g}'];if(t&&t.palette&&t.palette.length){t.tray.push(t.palette[t.palette.length-1]);if(t.paint)t.paint();}})();`;
  }
  if (row.tool === 'letterbox-activity') {
    // post the first letter so one door stands open with its neighbour on the step
    return `(function(){var t=window['${g}'];if(t&&t.st&&window.LetterboxCore){var i=window.LetterboxCore.rightHouse(t.st);if(i>=0)t._deliver(i);}})();`;
  }
  if (row.tool === 'jar-label-activity') {
    // a jar of fourteen toys with three marks, so the card shows the apparatus mid-count
    return `(function(){var t=window['${g}'];if(!t||!t._pool)return;var i=t._pool.findIndex(function(r){return r.kind==='count'&&r.n===14;});if(i<0)return;var order=[i];for(var k=0;k<t._pool.length;k++)if(k!==i)order.push(k);t._order=order;t._curPass=0;window.LCS_reloadFirstTask();t._tapCell(0);t._tapCell(1);t._tapCell(2);})();`;
  }
  if (row.tool === 'fruit-crates-activity') {
    // a full crate and four more, so the card shows the double ten-frame mid-teen
    return `(function(){var t=window['${g}'];if(!t||!t._pool)return;var i=t._pool.findIndex(function(r){return r.n===14;});if(i<0)return;var order=[i];for(var k=0;k<t._pool.length;k++)if(k!==i)order.push(k);t._order=order;t._curPass=0;window.LCS_reloadFirstTask();})();`;
  }
  if (row.tool === 'counting-necklace-activity') {
    // eight beads, five slid past the clasp, so the card shows the necklace mid-count with the count in the middle
    return `(function(){var t=window['${g}'];if(!t||!t._pool)return;var i=t._pool.findIndex(function(r){return r.n===8&&r.twist==='spread';});if(i<0)return;var order=[i];for(var k=0;k<t._pool.length;k++)if(k!==i)order.push(k);t._order=order;t._curPass=0;window.LCS_reloadFirstTask();for(var s=0;s<5;s++)t._slide();})();`;
  }
  if (row.tool === 'animal-train-activity') {
    // ticket 7, six animals already on the train, so the card shows the carriage mid-boarding with the platform still full
    return `(function(){var t=window['${g}'];if(!t||!t._pool)return;var i=t._pool.findIndex(function(r){return r.n===7&&r.stop==='more';});if(i<0)return;var order=[i];for(var k=0;k<t._pool.length;k++)if(k!==i)order.push(k);t._order=order;t._curPass=0;window.LCS_reloadFirstTask();t.FLY_MS=0;for(var s=0;s<6;s++)t._board(s*2);t._flash=-1;t._paint();})();`;
  }
  if (row.tool === 'fruit-stand-activity') {
    // order 17, the trays filled to 13, so the card shows the double ten-frame mid-fill
    return `(function(){var t=window['${g}'];if(!t||!t._pool)return;var i=t._pool.findIndex(function(r){return r.n===17;});if(i<0)return;var order=[i];for(var k=0;k<t._pool.length;k++)if(k!==i)order.push(k);t._order=order;t._curPass=0;window.LCS_reloadFirstTask();t.DROP_MS=0;t._tap(12);})();`;
  }
  if (row.tool === 'peek-window-activity') {
    // seven ducks with the window open (the stays-open look), so the card shows the group in its five-and-two shape
    return `(function(){var t=window['${g}'];if(!t||!t._pool)return;t.api.settings.look='open';var i=t._pool.findIndex(function(r){return r.n===7;});if(i<0)return;var order=[i];for(var k=0;k<t._pool.length;k++)if(k!==i)order.push(k);t._order=order;t._curPass=0;window.LCS_reloadFirstTask();})();`;
  }
  if (row.tool === 'roll-book-activity') {
    // seven dots on Mama's card, six ducklings already on the bank, so the card shows the pond mid-roll
    return `(function(){var t=window['${g}'];if(!t||!t._pool)return;var i=t._pool.findIndex(function(r){return r.n===7;});if(i<0)return;var order=[i];for(var k=0;k<t._pool.length;k++)if(k!==i)order.push(k);t._order=order;t._curPass=0;window.LCS_reloadFirstTask();for(var s=0;s<6;s++)window.RollBookCore.send(t.st);t._paint();})();`;
  }
  if (row.tool === 'treat-box-activity') {
    // order 7 with the lid off and four cookies already in, so the card shows the box mid-packing beside the tray (a shut lid would read as a blank card)
    return `(function(){var t=window['${g}'];if(!t||!t._pool)return;t.api.settings.lid='off';var i=t._pool.findIndex(function(r){return r.n===7;});if(i<0)return;var order=[i];for(var k=0;k<t._pool.length;k++)if(k!==i)order.push(k);t._order=order;t._curPass=0;window.LCS_reloadFirstTask();for(var s=0;s<4;s++)window.TreatBoxCore.put(t.st,s*3);t._paint();})();`;
  }
  if (row.tool === 'twin-pools-activity') {
    // seven crabs scattered, seven starfish in the twin pool, the strings tied: the card shows the invention (an empty twin pool would read as half a card)
    return `(function(){var t=window['${g}'];if(!t||!t._pool)return;var i=t._pool.findIndex(function(r){return r.n===7&&r.arr==='scatter';});if(i<0)return;var order=[i];for(var k=0;k<t._pool.length;k++)if(k!==i)order.push(k);t._order=order;t._curPass=0;window.LCS_reloadFirstTask();t.STRING_MS=0;for(var s=0;s<7;s++)window.TwinPoolsCore.place(t.st,s);window.TwinPoolsCore.check(t.st);t._paint();})();`;
  }
  if (row.tool === 'bug-jar-activity') {
    // fourteen butterflies packed in the jar beside the jar of ten, "more than 10" chosen: the card shows the invention (the yardstick jar), not just a tray
    return `(function(){var t=window['${g}'];if(!t||!t._pool)return;var i=t._pool.findIndex(function(r){return r.n===14;});if(i<0)return;var order=[i];for(var k=0;k<t._pool.length;k++)if(k!==i)order.push(k);t._order=order;t._curPass=0;window.LCS_reloadFirstTask();window.BugJarCore.guess(t.st,'more');t._paint();})();`;
  }
  if (row.tool === 'partner-bows-activity') {
    // six bees spread out against eight huddled flowers, four pairs already bowed and one bee picked: the card shows the trick and the invention together
    return `(function(){var t=window['${g}'];if(!t||!t._pool)return;var i=t._pool.findIndex(function(r){return r.a===6&&r.b===8;});if(i<0)return;var order=[i];for(var k=0;k<t._pool.length;k++)if(k!==i)order.push(k);t._order=order;t._curPass=0;window.LCS_reloadFirstTask();var C=window.PartnerBowsCore;for(var s=0;s<4;s++){C.tap(t.st,'a',s);C.tap(t.st,'b',s);}C.tap(t.st,'a',4);t._paint();})();`;
  }
  if (row.tool === 'fair-share-activity') {
    // seven balls against three, "more" on the top plate, one already across: the card shows the plates, the bridge and the sharing under way
    return `(function(){var t=window['${g}'];if(!t||!t._pool)return;var i=t._pool.findIndex(function(r){return r.a===7&&r.b===3;});if(i<0)return;var order=[i];for(var k=0;k<t._pool.length;k++)if(k!==i)order.push(k);t._order=order;t._curPass=0;window.LCS_reloadFirstTask();var C=window.FairShareCore;C.judge(t.st,'a');C.move(t.st,'a',t.st.plates.a[0]);t._paint();})();`;
  }
  if (row.tool === 'number-lift-activity') {
    // a pig with 6 and a dog with 9, the right answer checked: the card shows the building, both tickets left on floors 6 and 9 and the car parked at 9
    return `(function(){var t=window['${g}'];if(!t||!t._pool)return;var i=t._pool.findIndex(function(r){return r.left===6&&r.right===9;});if(i<0)return;var order=[i];for(var k=0;k<t._pool.length;k++)if(k!==i)order.push(k);t._order=order;t._curPass=0;window.LCS_reloadFirstTask();var C=window.NumberLiftCore;C.choose(t.st,'right');C.check(t.st);t._paint();})();`;
  }
  if (row.tool === 'block-towers-activity') {
    // 3 and 8, the right answer checked: the card shows both towers standing, the 3 stopped with its flag, the counting row lit to 8
    return `(function(){var t=window['${g}'];if(!t||!t._pool)return;var i=t._pool.findIndex(function(r){return r.left===3&&r.right===8;});if(i<0)return;var order=[i];for(var k=0;k<t._pool.length;k++)if(k!==i)order.push(k);t._order=order;t._curPass=0;window.LCS_reloadFirstTask();var C=window.BlockTowersCore;C.choose(t.st,'left');C.check(t.st);t._beat=null;t._paint();})();`;
  }
  if (row.tool === 'creek-map-activity') {
    // "follow the bigger numbers": 7 and 5 tapped, the planned route dashed down both forks, the sign lit, the boat at the source, the frog at the pond
    return `(function(){var t=window['${g}'];if(!t||!t._pool)return;t._order=[0,1,2,3,4,5,6,7,8].slice(0,t._pool.length);t._curPass=0;window.LCS_reloadFirstTask();var C=window.CreekMapCore;var a=C.answers(t.st);C.choose(t.st,0,a[0]);C.choose(t.st,1,a[1]);t._paint();})();`;
  }
  if (row.tool === 'pot-nest-activity') {
    // 6, 9, 2, 4: the 9 and the 6 already in the nest at their true size, the 2 and the 4 still waiting in the row, all one size
    return `(function(){var t=window['${g}'];if(!t||!t._pool)return;var i=t._pool.findIndex(function(r){return r.pots.join()==='6,9,2,4';});if(i<0)return;var order=[i];for(var k=0;k<t._pool.length;k++)if(k!==i)order.push(k);t._order=order;t._curPass=0;window.LCS_reloadFirstTask();var C=window.PotNestCore;C.drop(t.st,9);C.drop(t.st,6);t._paint();})();`;
  }
  if (row.tool === 'stamp-frame-activity') {
    // 4 + 3 printed: four orange and three green counters, the equation's two brackets dropped over them — the invention at rest
    return `(function(){var t=window['${g}'];if(!t||!t._pool)return;var i=t._pool.findIndex(function(r){return r.a===4&&r.b===3&&r.op==='+';});if(i<0)return;var order=[i];for(var k=0;k<t._pool.length;k++)if(k!==i)order.push(k);t._order=order;t._curPass=0;window.LCS_reloadFirstTask();var C=window.StampFrameCore,s=t.st;for(var j=0;j<4;j++)C.stamp(s,j);C.select(s,'t');for(j=4;j<7;j++)C.stamp(s,j);C.checkStep1(s);t._show1=true;t._paint();})();`;
  }
  if (row.tool === 'story-stage-activity') {
    // 7 balloons, 3 pop: the narrator's seven on the ten-frame stage, three tapped away as crossed outlines, the question lit — the invention at rest
    return `(function(){var t=window['${g}'];if(!t||!t._pool)return;var i=t._pool.findIndex(function(r){return r.kind==='balloon';});if(i<0)return;var order=[i];for(var k=0;k<t._pool.length;k++)if(k!==i)order.push(k);t._order=order;t._curPass=0;window.LCS_reloadFirstTask();t._clearTimers();t._acting=false;var C=window.StoryStageCore,s=t.st;C.actAll(s);C.tap(s,2);C.tap(s,5);C.tap(s,6);C.ask(s);t._fresh={};t._paint();})();`;
  }
  if (row.tool === 'spring-switch-activity') {
    // 5 crates: two sent left, the switch thrown, three rolled right, 2 + 3 banked on the staircase and the bond — the invention at rest
    return `(function(){var t=window['${g}'];if(!t||!t._pool)return;t.FAST=true;var i=t._pool.findIndex(function(r){return r.kind==='all'&&r.n===5;});if(i<0)return;var order=[i];for(var k=0;k<t._pool.length;k++)if(k!==i)order.push(k);t._order=order;t._curPass=0;window.LCS_reloadFirstTask();var C=window.SpringSwitchCore,s=t.st;C.release(s);C.release(s);C.flick(s,'R');C.release(s);C.release(s);C.release(s);C.setPlate(s,'a',2);C.setPlate(s,'b',3);C.couple(s);C.release(s);C.flick(s,'L');C.release(s);C.release(s);C.release(s);C.flick(s,'R');C.release(s);t._paint();})();`;
  }
  if (row.tool === 'snake-lunch-activity') {
    // any way 10: the 6 snaked in round the bend and the 4 on its way — two strands, both threads, nine cups filled and the lid about to shut
    return `(function(){var t=window['${g}'];if(!t||!t._pool)return;t.FAST=true;var i=t._pool.findIndex(function(r){return r.kind==='any'&&r.n===10;});if(i<0)return;var order=[i];for(var k=0;k<t._pool.length;k++)if(k!==i)order.push(k);t._order=order;t._curPass=0;window.LCS_reloadFirstTask();var C=window.SnakeLunchCore,s=t.st;C.drop(s,s.strands.find(function(x){return x.k===6;}).id);C.drop(s,s.strands.find(function(x){return x.k===3;}).id);t._paint();})();`;
  }
  if (row.tool === 'lantern-string-activity') {
    // make 5: 1 + 4 already hanging on the garland as two lanterns, the 3 plugged in and lighting three bulbs from the left — the invention at rest
    return `(function(){var t=window['${g}'];if(!t||!t._pool)return;t.FAST=true;var i=t._pool.findIndex(function(r){return r.kind==='pair'&&r.n===5;});if(i<0)return;var order=[i];for(var k=0;k<t._pool.length;k++)if(k!==i)order.push(k);t._order=order;t._curPass=0;window.LCS_reloadFirstTask();var C=window.LanternStringCore,s=t.st,id=function(v){return s.cards.find(function(c){return c.v===v&&!c.found;}).id;};C.plug(s,id(1));C.plug(s,id(4));C.plug(s,id(3));t._show=null;t._showNote=null;t._paint();})();`;
  }
  if (row.tool === 'ten-seat-wheel-activity') {
    // 7 aboard, 2 more called: the wheel has lurched and settled with its one empty gondola at the top, glowing — the invention at rest
    return `(function(){var t=window['${g}'];if(!t||!t._pool)return;t.FAST=true;var i=t._pool.findIndex(function(r){return r.kind==='fill'&&r.k===7;});if(i<0)return;var order=[i];for(var k=0;k<t._pool.length;k++)if(k!==i)order.push(k);t._order=order;t._curPass=0;window.LCS_reloadFirstTask();var C=window.TenSeatWheelCore;C.setDial(t.st,2);t._gate();t._brake();t._paint();['.tw-prow1','.tw-note'].forEach(function(q){var e=document.querySelector(q);if(e)e.style.display='none';});})();`;
  }
  if (row.tool === 'music-box-activity') {
    // Frère Jacques: five holes already punched along the strip, the next fact in the window, the bars standing as tall as their numbers — the invention at rest
    return `(function(){var t=window['${g}'];if(!t||!t._pool)return;t.FAST=true;var i=t._pool.findIndex(function(r){return r.songId==='frere1';});if(i<0)return;var order=[i];for(var k=0;k<t._pool.length;k++)if(k!==i)order.push(k);t._order=order;t._curPass=0;window.LCS_reloadFirstTask();var C=window.MusicBoxCore,s=t.st;for(var j=0;j<5;j++)C.tap(s,C.answerOf(C.fact(s)));t._flash=null;t._paint();})();`;
  }
  if (row.tool === 'overflow-trays-activity') {
    // make 14 mid-pour: the top tray full, its chute open, three counters already overflowed below — the invention at rest
    return `(function(){var t=window['${g}'];if(!t||!t._ensurePool)return;t.FAST=true;var pool=t._ensurePool();var i=pool.findIndex(function(r){return r.n===14;});if(i<0)return;var order=[i];for(var k=0;k<pool.length;k++)if(k!==i)order.push(k);t._order=order;t._curPass=0;window.LCS_reloadFirstTask();var C=window.OverflowTraysCore,s=t._cur();for(var j=0;j<13;j++)C.pour(s);t._paint();})();`;
  }
  if (row.tool === 'ghost-rafts-activity') {
    // catch 13: ten bubbles sealed into Dewey's raft, three on the tow-line, and the wrong card 31's ghost in the bay — three rafts and one bubble — the invention at rest
    return `(function(){var t=window['${g}'];if(!t||!t._ensurePool)return;t.FAST=true;var pool=t._ensurePool();var i=pool.findIndex(function(r){return r.id==='catch.13';});if(i<0)return;var order=[i];for(var k=0;k<pool.length;k++)if(k!==i)order.push(k);t._order=order;t._deal=null;t._curPass=0;window.LCS_reloadFirstTask();var C=window.GhostRaftsCore,s=t._cur();for(var j=0;j<10;j++)C.catchBubble(s);t._bubs=[];C.pickCard(s,31);t._paint();})();`;
  }
  if (row.tool === 'measure-stations-activity') {
    // how tall? the giraffe put on the TRACK: it has tipped over and lies along the rail with its length bar, and the track's ↔ sign stands beside the question's ↕ — the invention at rest
    return `(function(){var t=window['${g}'];if(!t||!t._ensurePool)return;t.FAST=true;var pool=t._ensurePool();var i=pool.findIndex(function(r){return r.id==='one.giraffe';});if(i<0)return;var order=[i];for(var k=0;k<pool.length;k++)if(k!==i)order.push(k);t._order=order;t._curPass=0;window.LCS_reloadFirstTask();var C=window.MeasureStationsCore,s=t._cur();C.drop(s,'track');t._paint();})();`;
  }
  if (row.tool === 'paint-pots-activity') {
    // the rocket half painted: the triangle tin open, the nose and two fins wet with paint, the windows still cream — the invention at rest
    return `(function(){var t=window['${g}'];if(!t||!t._ensurePool)return;t.FAST=true;var pool=t._ensurePool();var i=pool.findIndex(function(r){return r.id==='rocket';});if(i<0)return;var order=[i];for(var k=0;k<pool.length;k++)if(k!==i)order.push(k);t._order=order;t._curPass=0;window.LCS_reloadFirstTask();var C=window.PaintPotsCore,s=t.st,T=C.targets(s.r),ti=s.r.tins.indexOf('triangle');C.pickTin(s,ti);T.triangle.slice(0,3).forEach(function(p){C.paint(s,p);});t._paint();})();`;
  }
  if (row.tool === 'pip-museum-activity') {
    // after Check in the square-or-not wing: the clasps closed round the turned square and the circles, the oval in the Mystery Gallery, and the rhombus back on the belt wearing its ghost clasp — the invention at rest
    return `(function(){var t=window['${g}'];if(!t||!t._ensurePool)return;t.FAST=true;var pool=t._ensurePool();var i=pool.findIndex(function(r){return r.id==='S3';});if(i<0)return;var order=[i];for(var k=0;k<pool.length;k++)if(k!==i)order.push(k);t._order=order;t._curPass=0;window.LCS_reloadFirstTask();var C=window.PipMuseumCore,s=t.st,r=s.r;s.belt.slice().forEach(function(id){var tr=C.byId(r,id);C.route(s,id,tr.k==='rhombus'?'square':C.rightOf(r,tr));});t._check();})();`;
  }
  if (row.tool === 'post-slot-activity') {
    // mid-sort at the letterbox: two flat shapes on the letter tray, a cube on the parcel tray, the rest of the bag still to sort — the apparatus at rest
    return `(function(){var t=window['${g}'];if(!t||!t._ensurePool)return;t.FAST=true;var pool=t._ensurePool();var i=pool.findIndex(function(r){return r.id==='B1';});if(i<0)return;var order=[i];for(var k=0;k<pool.length;k++)if(k!==i)order.push(k);t._order=order;t._curPass=0;window.LCS_reloadFirstTask();var C=window.PostSlotCore,s=t.st,r=s.r;['p2','p0','p3'].forEach(function(id){C.move(s,id,C.byId(r,id).flat?'letter':'parcel');});t._paint();})();`;
  }
  if (row.tool === 'post-box-activity') {
    // the long rectangle offered to door 3: three sticks lie on three sides, the fourth side glows bare, three pegs already counted — the invention at rest
    return `(function(){var t=window['${g}'];if(!t||!t._ensurePool)return;t.FAST=true;var pool=t._ensurePool();var i=pool.findIndex(function(r){return r.id==='C2';});if(i<0)return;var order=[i];for(var k=0;k<pool.length;k++)if(k!==i)order.push(k);t._order=order;t._curPass=0;window.LCS_reloadFirstTask();var C=window.PostBoxCore,s=t.st;C.plantPeg(s,0);C.plantPeg(s,1);C.plantPeg(s,2);C.post(s,s.tiles[0].id,3);t._paint();})();`;
  }
  if (row.tool === 'type-case-activity') {
    // a wrong sort tipped over beside the empty slot, its other form showing on its back — the invention at rest
    return `(function(){var t=window['${g}'];if(!t||!t._ensurePool)return;t.FAST=true;var pool=t._ensurePool();var i=pool.findIndex(function(r){return r.id==='P1';});if(i<0)return;var order=[i];for(var k=0;k<pool.length;k++)if(k!==i)order.push(k);t._order=order;t._curPass=0;window.LCS_reloadFirstTask();var C=window.TypeCaseCore,s=t.st,w=s.tray.find(function(x){return x.face!==s.r.answer;});C.drop(s,w.id);t._paint();})();`;
  }
  if (row.tool === 'flip-card-activity') {
    // cat with Pepper's h guessed as a bat: the card flipped to the hat, the bat shows its b — the invention at work
    return `(function(){var t=window['${g}'];if(!t||!t._ensurePool)return;t.FAST=true;t.api.settings.level='first';t._pool=null;t._poolKey=null;var pool=t._ensurePool();var i=pool.findIndex(function(r){return r.id==='first-cat-h';});if(i<0)return;var order=[i];for(var k=0;k<pool.length;k++)if(k!==i)order.push(k);t._order=order;t._curPass=0;window.LCS_reloadFirstTask();var C=window.FlipCardCore,s=t.st;C.guess(s,s.layout.indexOf(1));C.check(s);t._busy=false;t._view={reveal:true};t._paint();})();`;
  }
  if (row.tool === 'word-elastic-activity') {
    // cat stretched to three beads with e on the middle one: the snap kicks that bead up out of the line — the invention at work
    return `(function(){var t=window['${g}'];if(!t||!t._ensurePool)return;t.FAST=true;t.api.settings.clue='beads';t.api.settings.words='simple';t._pool=null;t._poolKey=null;var pool=t._ensurePool();var i=pool.findIndex(function(r){return r.id==='beads-simple-cat';});if(i<0)return;var order=[i];for(var k=0;k<pool.length;k++)if(k!==i)order.push(k);t._order=order;t._curPass=0;window.LCS_reloadFirstTask();var C=window.WordElasticCore,s=t.st,r=s.r,f=function(g){return r.tray.filter(function(x){return x.g===g;})[0].id;};C.place(s,f('c'),0);C.place(s,f('e'),1);C.place(s,f('t'),2);C.check(s);t._busy=false;t._view={};t._shelf=[{word:'hat',pic:'accessories/hat'},{word:'pig',pig:'',pic:'animals/pig'},{word:'sun',pic:'beach/sun'}];t._paint();})();`;
  }
  if (row.tool === 'letter-magnet-activity') {
    // m and n magnets: moose and mop already on m's hooks, nose waiting in n's pull zone, the rest on the table — the invention at work
    return `(function(){var t=window['${g}'];if(!t||!t._ensurePool)return;t.FAST=true;t.api.settings.level='two';t._pool=null;t._poolKey=null;var pool=t._ensurePool();var i=pool.findIndex(function(r){return r.magnets.map(function(m){return m.label;}).join('')==='mn';});if(i<0)return;var order=[i];for(var k=0;k<pool.length;k++)if(k!==i)order.push(k);t._order=order;t._curPass=0;window.LCS_reloadFirstTask();var C=window.LetterMagnetCore,s=t.st,r=s.r,ix=function(b,n){return r.cards.map(function(c,j){return c.belongs===b?j:-1;}).filter(function(j){return j>=0;})[n];};C.toZone(s,ix(0,0),0);C.toZone(s,ix(0,1),0);C.flip(s);C.toZone(s,ix(1,0),1);t._busy=false;t._view={};t._paint();})();`;
  }
  if (row.tool === 'linc-fact-chain-activity') {
    // the seed chain fallen all the way: three dominoes leaning one on the next, the last on the bell, the joined sentence glowing on the rail — the invention at work
    return `(function(){var t=window['${g}'];if(!t||!t._ensurePool)return;t.FAST=true;t.OK_MS=600000;t.api.settings.level='chain';t.api.settings.choices='more';t._pool=null;var pool=t._ensurePool();var i=pool.indexOf('flower');if(i<0)return;var order=[i];for(var k=0;k<pool.length;k++)if(k!==i)order.push(k);t._order=order;t._orderForPool=pool;window.LCS_reloadFirstTask();var C=window.LincFactChainCore,s=t.st;s.r.answer.forEach(function(k,g){C.stand(s,k,g);});C.check(s);t._busy=false;t._view={joined:true,falls:{f:C.falls(s.r,s.placed),broken:-1}};t._paint();})()`;
  }
  if (row.tool === 'plate-stack-activity') {
    // three peaches climbing the shelf for a ticket of 3: the second plate has opened the word's ending slot, glowing empty — the invention at work
    return `(function(){var t=window['${g}'];if(!t||!t._ensurePool)return;t.FAST=true;t.OK_MS=600000;t.api.settings.level='l2';t.api.settings.answer='tiles';t._pool=null;var pool=t._ensurePool();var C=window.PlateStackCore,i=pool.filter(function(x){return C.round('en','l2',x).key==='peach';})[0];if(i===undefined)return;var order=[i];for(var k=0;k<pool.length;k++)if(pool[k]!==i)order.push(pool[k]);t._order=order;t._orderForPool=pool;window.LCS_reloadFirstTask();var s=t.st;C.add(s);C.add(s);t._view={};t._paint();})()`;
  }
  if (row.tool === 'story-film-activity') {
    // 12 geese, some fly away, now 8 — the child's film with 6 flying away: the last frame lands two sockets short and glows — the model that does not fit the story, the invention at work
    return `(function(){var t=window['${g}'];if(!t||!t._ensurePool)return;t.FAST=true;t.OK_MS=600000;t.api.settings.stories='w20';t.api.settings.read='off';t._pool=null;t._ensurePool();t._start(4,[0,1,2]);var C=window.StoryFilmCore,s=t.st;C.place(s,'start','t0');C.place(s,'result','t1');C.markMystery(s,'change');C.setDial(s,6);t._render2();t._check();})()`;
  }
  if (row.tool === 'bond-basket-activity') {
    // 8 + 3: the 8 already poured under the checked cloth (its number on the tag), one car posted, two waiting — the covered first part that forces counting on, the invention at work
    return `(function(){var t=window['${g}'];if(!t||!t._ensurePool)return;t.FAST=true;t.OK_MS=600000;t.api.settings.task='total';t.api.settings.coat='pictures';t._pool=null;t._ensurePool();t._start(4);var C=window.BondBasketCore,s=t.st;C.pour(s,'L');C.post(s);t._view={};t._render2();})()`;
  }
  if (row.tool === 'sunken-stones-activity') {
    // 8 + 6: Lily on 8 pulled back two beads, the aim ring on the golden Ten Stone, the stones past ten still under water — the invention at work
    return `(function(){var t=window['${g}'];if(!t||!t._ensurePool)return;t.FAST=true;t.OK_MS=600000;t.api.settings.facts='both';t.api.settings.labels='five';t._pool=null;t._ensurePool();t._start(0);t._coil=2;t._view={};t._render2();})()`;
  }
  if (row.tool === 'door-tag-activity') {
    // 34 built as 4 crates and 3 berries: the door tag stretched into 30 and 4 over the shelf, the crate count 40 coral under the 30 — the stretching tag at work
    return `(function(){var t=window['${g}'];if(!t||!t._ensurePool)return;t.FAST=true;t.OK_MS=600000;t.api.settings.numbers='99';t.api.settings.card='num';t._pool=null;t._ensurePool();t._start(0,0);var C=window.DoorTagCore,s=t.st;for(var i=0;i<4;i++)C.fling(s,'crate');for(var j=0;j<3;j++)C.fling(s,'berry');t._check();})()`;
  }
  if (row.tool === 'travel-cord-activity') {
    // the illusion round: the hanging orange ribbon looks longest, but the cord has been to all three — its tags say the flat red one is the longest, and the cord still lies along it
    return `(function(){var t=window['${g}'];if(!t||!t._ensurePool)return;t.FAST=true;t.OK_MS=600000;t.api.settings.question='mixed';t.api.settings.things='ribbons';t._pool=null;t._ensurePool();t._start('L5',0);var C=window.TravelCordCore,s=t.st,r=s.r;r.items.forEach(function(x){s.lay.place[x.id]=x.home;s.lay.off[x.id]=0;});C.measure(s,'orange');C.measure(s,'purple');C.measure(s,'red');t._render2();})()`;
  }
  if (row.tool === 'light-leak-activity') {
    // the hexagon lantern half built: two rhombi in, the last gap glowing gold, a triangle sticking out and throwing its shadow on the wall
    return `(function(){var t=window['${g}'];if(!t||!t._ensurePool)return;t.FAST=true;t.OK_MS=600000;t.api.settings.level='glass';t.api.settings.glass='colour';t.api.settings.turning='tap';t._pool=null;t._ensurePool();t._pos=null;t._memory={};t._start('L7',0);var C=window.LightLeakCore,s=t.st;C.drop(s,{kind:'rhombus',rot:0},1,0.5);C.drop(s,{kind:'rhombus',rot:2},1.75,1);C.drop(s,{kind:'triangle',rot:1},2.5,1.4);t._render2();})()`;
  }
  if (row.tool === 'take-apart-activity') {
    // the turned, small triangle taken apart on the tray — three straight sticks, three full cups — while two shapes already sit in their boxes
    return `(function(){var t=window['${g}'];if(!t||!t._ensurePool)return;t.FAST=true;t.OK_MS=600000;t.api.settings.level='real';t.api.settings.tray='open';t.api.settings.shapes='6';t._pool=null;t._ensurePool();t._pos=null;t._start(0,0);var C=window.TakeApartCore,s=t.st,f=function(id){return s.items.findIndex(function(x){return x.id===id;});};C.place(s,f('tri_equi'),'yes');C.place(s,f('quad_square'),'no');C.tap(s,f('tri_right'));t._render2();})()`;
  }
  if (row.tool === 'fair-mobile-activity') {
    // the fourths mobile after Check with the unfair square: it tips, the heavy share glowing coral and the light one teal, while the fair card waits on the shelf
    return `(function(){var t=window['${g}'];if(!t||!t._ensurePool)return;t.FAST=true;t.OK_MS=600000;t.api.settings.level='hf';t.api.settings.bubble='on';t._pool=null;t._ensurePool();t._pos=null;t._start(4,0);var C=window.FairMobileCore,s=t.st;C.hangCard(s,s.cards.indexOf('sq-fourths-uneq'),0);t._render2();t._check();})()`;
  }
  if (row.tool === 'freezing-floes-activity') {
    // rabbit, basket, muffin: rab·bit frozen in its slot, bas in the next slot, the rest of the floes still bobbing on the pond
    return `(function(){var t=window['${g}'];if(!t||!t._ensurePool)return;t.FAST=true;t.OK_MS=600000;t.api.settings.clue='join';t._pool=null;t._ensurePool();t._set=0;t._orders=null;t._start(0,0);t._view.note='';t._view.nudge=false;var C=window.FreezingFloesCore,s=t.st,f=function(x){return s.pond.find(function(i){return s.floes[i].s===x;});};C.place(s,f('rab'),0);C.place(s,f('bit'),0);C.place(s,f('bas'),1);s.frozen[0]=[true,true,false];s.active=1;t._render2();})()`;
  }
  if (row.tool === 'pinch-teams-activity') {
    // b _ t with o and a pinched in the socket: the brass clasp shut over them, the o lit gold (it says its name), the a quiet
    return `(function(){var t=window['${g}'];if(!t||!t._ensurePool)return;t.FAST=true;t.OK_MS=600000;t.api.settings.clue='build';t._pool=null;t._ensurePool();t._set=0;t._start('boat',0);t._view.note='';t._view.nudge=false;var C=window.PinchTeamsCore,s=t.st,f=function(c){return s.tray.findIndex(function(x,i){return x.c===c&&C.usedAt(s,i)<0;});};C.drop(s,f('o'),0);C.drop(s,f('a'),0);t._render2();})()`;
  }
  if (row.tool === 'reach-back-e-activity') {
    // k _ t with the i seated and the magic e on the end: its wire arm reaches back over the t and the i shows its gold name face
    return `(function(){var t=window['${g}'];if(!t||!t._ensurePool)return;t.FAST=true;t.OK_MS=600000;t.api.settings.clue='finish';t.api.settings.vowel='pick';t._pool=null;t._ensurePool();t._set=0;t._start(0,0);t._view.note='';t._view.nudge=false;var C=window.ReachBackECore,s=t.st;C.setVowel(s,'i');C.setEnd(s,'e');t._render2();})()`;
  }
  if (row.tool === 'paint-wells-activity') {
    // fish poured and stirred: s and h shared one well and mixed into a new green, the word's colour strip dried under the picture
    return `(function(){var t=window['${g}'];if(!t||!t._ensurePool)return;t.FAST=true;t.OK_MS=600000;t.api.settings.clue='pour';t.api.settings.help='none';t._pool=null;t._ensurePool();t._start('fish',0);var C=window.PaintWellsCore,s=t.st,d=function(i){return s.tray.findIndex(function(x){return x.wi===i;});};C.pour(s,d(0),0);C.pour(s,d(1),1);C.pour(s,d(2),2);C.pour(s,d(3),2);t._render2();t._check();})()`;
  }
  if (row.tool === 'sound-roll-activity') {
    // hand, bee, rose: the bee and the rose punched as long slots, the hand as a round hole — the roll shows which vowels stretch
    return `(function(){var t=window['${g}'];if(!t||!t._ensurePool)return;t.FAST=true;t.OK_MS=600000;t.api.settings.clue='los';t.api.settings.letters='hidden';t._pool=null;t._ensurePool();t._set=0;t._start(4,0);var C=window.SoundRollCore,s=t.st;C.punch(s,0,'round');C.punch(s,1,'long');C.punch(s,2,'long');t._render2();})()`;
  }
  if (row.tool === 'one-piece-stamp-activity') {
    // the square cut by an off-centre cross: the glass stamp of the small piece numbered 1 lies on a big piece and leaves its striped gap
    return `(function(){var t=window['${g}'];if(!t||!t._ensurePool)return;t.FAST=true;t.OK_MS=600000;t.api.settings.level='hf';t.api.settings.marks='off';t.api.settings.stamp='hand';t._pool=null;t._ensurePool();t._start(1,0);var C=window.OnePieceStampCore,s=t.st;C.DATA.L1[1][4].forEach(function(c){C.addCut(s,c);});C.lift(s,0);t._stampOn(1);})()`;
  }
  if (row.tool === 'set-clock-activity') {
    // half past seven built by hand: the long hand's sweep (half the face) green, its narrow echo dropped into the 7-to-8 slice, the short hand lying along the echo's end, the receipt printing 7:30 — the echo slice at work
    return `(function(){var t=window['${g}'];if(!t||!t._ensurePool)return;t.FAST=true;t.OK_MS=600000;t.api.settings.times='both';t.api.settings.slice='after';t._pool=null;t._ensurePool();t._start('7:30',0);var C=window.SetClockCore,s=t.st;C.place(s,'long');s.long=30;C.place(s,'short');s.short=90;t._render2();t._check();})()`;
  }
  if (row.tool === 'pull-key-activity') {
    // 8:30, bedtime: the spring key wound back six clicks — the long hand climbed to the 12 and the short hand stands on the 8, ringed: the hour the clock is in. The pull-back key at work
    return `(function(){var t=window['${g}'];if(!t||!t._ensurePool)return;t.FAST=true;t.OK_MS=600000;t.api.settings.times='half';t.api.settings.rounds='readset';t._pool=null;t._ensurePool();t._start('R3',0);var C=window.PullKeyCore,s=t.st;for(var i=0;i<6;i++)C.windBack(s);t._view.ring=8;t._view.stopFlash=true;t._render2();})()`;
  }
  if (row.tool === 'ride-hands-activity') {
    // 3 o'clock and the 12:00 card: its orange 12 rode the short hand out to the 3, where it does not fit — the hand glows and the 3 lights up; the digits riding the hands at work
    return `(function(){var t=window['${g}'];if(!t||!t._ensurePool)return;t.FAST=true;t.OK_MS=600000;t.api.settings.times='hour';t.api.settings.colours='on';t._pool=null;t._ensurePool();t._start('H1',0);t.st.order=[0,1,2];t._render2();t._choose(1);t._check();})()`;
  }
  if (row.tool === 'hour-road-activity') {
    // 3:30, the road rolled up round the dial: the marker carried round from the 3:30 card's spot lands on the tip of the short hand, which glows — the rolled road at work
    return `(function(){var t=window['${g}'];if(!t||!t._ensurePool)return;t.FAST=true;t.OK_MS=600000;t.api.settings.times='both';t.api.settings.road='shown';t._pool=null;t._ensurePool();t._start('R1',0);t.st.order=[1,0,2];t.st.chosen=1;var v=t._view;v.showRoad=true;v.s=1;v.ring=1;v.mk=7;v.glow=true;t._render2();})()`;
  }
  if (row.tool === 'one-hop-activity') {
    // the gap round: Inchie hopped one helper at a time and dropped into the gap before the last helper, the gap glowing coral — the one-hop rule at work
    return `(function(){var t=window['${g}'];if(!t||!t._ensurePool)return;t.FAST=true;t.OK_MS=600000;t.api.settings.job='fix';t.api.settings.sizes='one';t._pool=null;t._ensurePool();t._start('B1',0);var C=window.OneHopCore,s=t.st;C.hop(s);C.hop(s);C.hop(s);t._view={};t._render2();})()`;
  }
  if (row.tool === 'zero-cards-activity') {
    // forty-seven as a word: the 40 card on the stand with the 7 laid on its 0, four rods and seven cubes poured onto the mat — the zero-swallowing cards at work
    return `(function(){var t=window['${g}'];if(!t||!t._ensurePool)return;t.FAST=true;t.OK_MS=600000;t.api.settings.task='build';t.api.settings.numbers='99';t._pool=null;t._ensurePool();t._start('b3',0);var C=window.ZeroCardsCore,s=t.st;C.placeTens(s,40);C.placeOnes(s,7,'zero');t._render2();})()`;
  }
  if (row.tool === 'nine-stop-activity') {
    // 34 and the arrows ↓↓→: two cards played, the tens tube grown to 5 rods (54), the → card waiting — the tubes at work on a follow-the-arrows trip
    return `(function(){var t=window['${g}'];if(!t||!t._ensurePool)return;t.FAST=true;t.OK_MS=600000;t.api.settings.task='jumps';t._pool=null;t._ensurePool();t._start('f0',0);var C=window.NineStopCore,s=t.st;C.playCard(s,0);C.playCard(s,1);t._render2();})()`;
  }
  if (row.tool === 'roll-mat-activity') {
    // 38 + 25 in columns: every block brought over, the ones mat full — its tenth block lying on the ones answer box — three more waiting on the doorstep, the grip ready to roll: the roll-up mats at work
    return `(function(){var t=window['${g}'];if(!t||!t._ensurePool)return;t.FAST=true;t.OK_MS=600000;t.api.settings.numbers='col2';t.api.settings.way='add';t._pool=null;t._ensurePool();t._start('a0',0);var C=window.RollMatCore,s=t.st;while(C.pour(s,'T')){}while(C.pour(s,'O')){}t._view={};t._render2();})()`;
  }
  if (row.tool === 'rod-drawers-activity') {
    // 63 > 38 solved: both columns standing to scale beside their cabinets, the sign stretched between them with its open side round the 63 column, the ones drawers sealed — the ten-rod drawers at work
    return `(function(){var t=window['${g}'];if(!t||!t._ensurePool)return;t.FAST=true;t.OK_MS=600000;t.api.settings.numbers='two';t.api.settings.task='compare';t._pool=null;t._ensurePool();t._start(1,0);var C=window.RodDrawersCore,s=t.st;C.openPlace(s,0);C.turn(s);C.turn(s);t._check();})()`;
  }
  if (row.tool === 'ten-band-activity') {
    // Make 34: three tens on the rack, seven loose cubes pulled into the band, its three empty pockets showing — not ten yet, so no ten is made: the ten-pocket band at work
    return `(function(){var t=window['${g}'];if(!t||!t._ensurePool)return;t.FAST=true;t.OK_MS=600000;t.api.settings.numbers='49';t.api.settings.gaps='show';t._pool=null;t._ensurePool();t._start(1,0);var C=window.TenBandCore,s=t.st,g=0;while(s.rack<3&&g++<60){while(s.plate.length<10&&C.hopper(s)){}C.pull(s);}while(s.plate.length<7&&C.hopper(s)){}while(s.plate.length>7)C.takeOut(s);var res=C.pull(s);t._view={band:res,pulled:true};t._render2();})()`;
  }
  if (row.tool === 'counting-lamp-activity') {
    // 40-50: 43 bolted right, 47 one tie too far: the engine counted on from the station, the lamp's numbers on the empty ties, and it stopped at the plate with its true number 48 — the counting lamp at work
    return `(function(){var t=window['${g}'];if(!t||!t._ensurePool)return;t.FAST=true;t.OK_MS=600000;t.api.settings.track='spots';t.api.settings.numbers='120';t._pool=null;t._ensurePool();t._start(3,0);var C=window.CountingLampCore,s=t.st;C.place(s,43,3);C.place(s,47,8);t._check();})()`;
  }
  if (row.tool === 'fair-ribbon-activity') {
    // MORE Pim 9 / Bo 4 with 7 said: the beads float past the gold ribbon, two coral ones over the top, and now Pim goes quiet — the fair ribbon at work
    return `(function(){var t=window['${g}'];if(!t||!t._ensurePool)return;t.FAST=true;t.OK_MS=600000;t.api.settings.jars='clear';t.api.settings.story='all';t._pool=null;t._ensurePool();t._start(5,false,0);var C=window.FairRibbonCore,s=t.st;C.choose(s,7);C.check(s);t._view={acted:true};t._render2();})()`;
  }
  if (row.tool === 'plank-path-activity') {
    // Within 10, path 1: three planks laid (5, 3, 7), the fourth gap ? − 6 = 2 still open water, the decoy 4 waiting in the tray — the plank path at work
    return `(function(){var t=window['${g}'];if(!t||!t._ensurePool)return;t.FAST=true;t.OK_MS=600000;t.api.settings.numbers='10';t.api.settings.path='squares';t._pool=null;t._ensurePool();t._start(0,0);var C=window.PlankPathCore,s=t.st;[5,3,7].forEach(function(p){C.lay(s,p);});t._view={};t._render2();})()`;
  }
  if (row.tool === 'two-gauges-activity') {
    // 6 + 6 = □ + 4 with 10 in the socket: the left needle on 12, the right swept past to 14 — the gap lit between them, a ghost line where the other side reads — the two gauges at work
    return `(function(){var t=window['${g}'];if(!t||!t._ensurePool)return;t.FAST=true;t.OK_MS=600000;t.api.settings.numbers='20';t.api.settings.path='help';t._pool=null;t._ensurePool();t._start(5,5,3);var C=window.TwoGaugesCore,s=t.st;C.setValue(s,10);C.pull(s);t._view={};t._render2();})()`;
  }
  if (row.tool === 'sign-beam-activity') {
    // 6 + 2 = 8 + 1 ruled ≠: the seal broken, the beam tipped — the two bars of the equal sign now a "<" opening toward the 9, the 9 pan sunk — the invention at work
    return `(function(){var t=window['${g}'];if(!t||!t._ensurePool)return;t.FAST=true;t.OK_MS=600000;t.api.settings.claims='tf';t.api.settings.numbers='10';t._pool=null;t._ensurePool();t._start(8,8);var C=window.SignBeamCore,s=t.st;C.stamp(s,'ne');var res=C.gavel(s);t._view={release:{shape:res.shape}};t._render2();})()`;
  }
  if (row.tool === 'rung-ladder-activity') {
    // 2 + 3 beside 9 − 4: two rails of 5 holes, five rungs laid, the squirrel on the gold cap rung with the acorn — the ladder IS the equals sign, the invention at work
    return `(function(){var t=window['${g}'];if(!t||!t._ensurePool)return;t.FAST=true;t.OK_MS=600000;t.api.settings.pairs='same';t.api.settings.rails='after';t._pool=null;t._ensurePool();t._start(0);var C=window.RungLadderCore,s=t.st;C.select(s,'c0');C.select(s,'c2');var p=s.pending.slice(),res=C.go(s);t._view={show:{pair:p,res:res}};t._render2();})()`;
  }
  if (row.tool === 'ten-plug-activity') {
    // 8 + 5: the stick snapped 2 | 3, the 2 plugged into the ten-rack's hole — the rack gold, the 3 waiting beside the golden ten on the shelves — the invention at work
    return `(function(){var t=window['${g}'];if(!t||!t._ensurePool)return;t.FAST=true;t.OK_MS=600000;t.api.settings.level='add';t.api.settings.mode='snap';t._pool=null;t._ensurePool();t._start(0);var C=window.TenPlugCore,s=t.st;var two=C.snap(s,s.pieces[0].id,2);C.plug(s,two[0].id);t._view={};t._render2();})()`;
  }
  if (row.tool === 'turning-domino-activity') {
    // 12 − ? = 7 found: the domino whole, turned, the 7 half broken off into the tray, the house holding three of its four facts — one domino, a whole fact family, the invention at work
    return `(function(){var t=window['${g}'];if(!t||!t._ensurePool)return;t.FAST=true;t.OK_MS=600000;t.api.settings.numbers='w20';t.api.settings.house='on';t._pool=null;t._ensurePool();t._start(3);var C=window.TurningDominoCore,s=t.st;C.setDial(s,5);C.check(s);C.turn(s);C.breakOff(s,'right');t._view={stamp:-1};t._render2();})()`;
  }
  if (row.tool === 'merge-drops-activity') {
    // 6 + 4 + 9: the 6 has melted into the 4 and the ten beads have clicked into the gold-ringed pearl, the 9 still waiting beside — making ten first, the invention at work
    return `(function(){var t=window['${g}'];if(!t||!t._ensurePool)return;t.FAST=true;t.OK_MS=600000;t.api.settings.numbers='w20';t.api.settings.beads='show';t._pool=null;t._ensurePool();t._start(9);var C=window.MergeDropsCore,s=t.st;C.merge(s,'A','B');t._view={};t._render2();})()`;
  }
  if (row.tool === 'lamplight-cupboard-activity') {
    // "the cup" said into the dark cupboard: the lamps light BOTH cups (the big one and the small one with Sock's ring) — the listener's uncertainty made of light, the invention at work
    return `(function(){var t=window['${g}'];if(!t||!t._ensurePool)return;t.FAST=true;t.OK_MS=600000;t.api.settings.level='l1';t.api.settings.memory='3';t.api.settings.lamps='live';t._pool=null;t._ensurePool();t._start(2,{mirror:false,cols:[0,2,0,2]});var C=window.LamplightCupboardCore,s=t.st;C.addWord(s,'n:cup');t._view={};t._render2();})()`;
  }
  if (row.tool === 'about-strings-activity') {
    // every string hooked to the frog: Check lights each card's about-word, the lake card's string sags, and "They" points back to the frog card — the invention at work
    return `(function(){var t=window['${g}'];if(!t||!t._ensurePool)return;t.FAST=true;t.OK_MS=600000;t.api.settings.level='l1';t.api.settings.cards='4';t.api.settings.help='off';t._pool=null;t._ensurePool();t._start(0);var C=window.AboutStringsCore,s=t.st;s.wall=['f0','f1','f2','d0'];s.wall.forEach(function(id){C.hookTo(s,id,'topic');});t._render2();t._check();})()`;
  }
  if (row.tool === 'cousin-rain-activity') {
    // the colour trap: red apple + red tractor in one basket, banana + bus in the other — Check splits both clouds and each half rains its own cousin (a green kiwi, a purple airplane) — the invention at work
    return `(function(){var t=window['${g}'];if(!t||!t._ensurePool)return;t.FAST=true;t.OK_MS=600000;t.api.settings.level='l1';t.api.settings.baskets='any';t.api.settings.rain='live';t._pool=null;t._ensurePool();t._start(2);t._view.spill=false;var C=window.CousinRainCore,s=t.st;C.placeAt(s,0,0);C.placeAt(s,2,0);C.placeAt(s,1,1);C.placeAt(s,3,1);t._render2();t._check();})()`;
  }
  if (row.tool === 'magnet-plates-activity') {
    // "one more thing!": three plates on the rail, the first golden "and" already turned into a comma, the end cap still on its hook — the invention at work
    return `(function(){var t=window['${g}'];if(!t||!t._ensurePool)return;t.FAST=true;t.OK_MS=600000;t.api.settings.level='l4';t.api.settings.order='show';t._pool=null;t._ensurePool();t._start(0);var C=window.MagnetPlatesCore,s=t.st;s.tray={pancake:2,milk:1};C.check(s);C.lift(s,'and');C.dropAt(s,'joint:0');C.lift(s,'end');C.dropAt(s,'dock');C.check(s);C.lift(s,'and');C.dropAt(s,'joint:1');t._setTask();t._render2();})()`;
  }
  if (row.tool === 'question-lamp-activity') {
    // "Who" in the gap of a when-question: the lamp has swung onto the chef and lights him, while the gold card is "at night" — the invention at work
    return `(function(){var t=window['${g}'];if(!t||!t._ensurePool)return;t.FAST=true;t.OK_MS=600000;t.api.settings.level='l2';t.api.settings.answer='keys';t._pool=null;t._ensurePool();t._start(2);t._render2();var k=document.querySelector('.ql-key[data-k="key-who"]');if(k)k.click();var c=document.querySelector('.ql-check');if(c)c.click();})()`;
  }
  if (row.tool === 'rewind-rail-activity') {
    // t written on its own with the cross first: the rewind stopped at the slip — the two tracks' first colours differ, the flag on the rail, both letters half re-written — the invention at work
    return `(function(){var t=window['${g}'];if(!t||!t._ensurePool)return;t.FAST=true;t.OK_MS=600000;t.api.settings.letters='s1';t.api.settings.steps='own';t._pool=null;var pool=t._ensurePool();var i=pool.indexOf('t');if(i<0)return;var order=[i];for(var k=0;k<pool.length;k++)if(k!==i)order.push(k);t._order=order;t._orderForPool=pool;window.LCS_reloadFirstTask();var C=window.RewindRailCore,s=t.st,L=C.lanes(s.r.strokes);[1,0].forEach(function(k){var p=L[k].pts;C.down(s,p[0]);for(var j=1;j<p.length;j++)C.move(s,p[j]);C.up(s);});t._check();t._view.u=0.62;t._paint();})()`;
  }
  if (row.tool === 'writing-carriage-activity') {
    // the carriage in use: A traced and written, out on the line and pinned on the wall; B half traced in the window — the invention at work
    return `(function(){var t=window['${g}'];if(!t||!t._ensurePool)return;try{localStorage.clear();}catch(e){}t._wallKey=null;t.FAST=true;t.OK_MS=600000;t.api.settings.level='upper';t.api.settings.letters='all';t.api.settings.practice='tw';t._pool=null;t._paper=null;var pool=t._ensurePool();t._order=pool.map(function(x,i){return i;});t._orderForPool=pool;window.LCS_reloadFirstTask();var C=window.WritingCarriageCore;function full(){var s=t.st,L=s.tr.lanes[s.tr.idx];C.down(s,L.pts[0]);for(var i=1;i<L.pts.length;i++)C.move(s,L.pts[i]);t._busy=false;t._lift(C.up(s));}var n=0;while(!t.st.done&&n++<20)full();t._clearTimers();t._pin('A',t.st.inks[t.st.inks.length-1].ink);t._busy=false;t._view={};t._start('B');var s=t.st,L=s.tr.lanes[0];C.down(s,L.pts[0]);for(var i=1;i<L.pts.length;i++)C.move(s,L.pts[i]);t._lift(C.up(s));t._clearTimers();t._busy=false;t._view={};var L2=s.tr.lanes[1];C.down(s,L2.pts[0]);for(var j=1;j<L2.pts.length*0.55;j++)C.move(s,L2.pts[j]);t._ptr=null;t._paint();})()`;
  }
  if (row.tool === 'opposites-rod-activity') {
    // the hot/cold rod painted red to blue: "warm" parked in the middle groove, "cold" waiting in the basket for the far end — the invention at work
    return `(function(){var t=window['${g}'];if(!t||!t._ensurePool)return;t.FAST=true;t.OK_MS=600000;t.api.settings.level='pictures';t.api.settings.words='pics';t.api.settings.answer='pick';t._pool=null;var pool=t._ensurePool();var i=pool.indexOf('pic.hot');if(i<0)return;var order=[i];for(var k=0;k<pool.length;k++)if(k!==i)order.push(k);t._order=order;t._orderForPool=pool;window.LCS_reloadFirstTask();var C=window.OppositesRodCore,s=t.st;C.drop(s,'warm');s.show=false;t._busy=false;t._view={};t._paint();})()`;
  }
  if (row.tool === 'nila-pond-activity') {
    // the bear text in the rain: "growing a thick coat" hung, its canopy pulled in over its own lily pad while the rain blurs the two pads it leaves out — the invention at work
    return `(function(){var t=window['${g}'];if(!t||!t._ensurePool)return;t.FAST=true;t.OK_MS=600000;t.MISS_MS=600000;t.api.settings.umb='4';t.api.settings.read='self';var pool=t._ensurePool();var i=pool.indexOf('bear-warm');if(i<0)return;var order=[i];for(var k=0;k<pool.length;k++)if(k!==i)order.push(k);t._order=order;t._orderForPool=pool;window.LCS_reloadFirstTask();var C=window.NilaPondCore,s=t.st;C.hang(s,s.rail.indexOf(1));C.check1(s);t._busy=false;t._view={rain:true};t._paint();})()`;
  }
  if (row.tool === 'atlas-fact-files-activity') {
    // "Where does a penguin live?": the highlighter swiped over "on cold ice", the words lifted into "A penguin lives on cold ice." on Atlas's card — the invention at work
    return `(function(){var t=window['${g}'];if(!t||!t.nextTask)return;t.FAST=true;t.OK_MS=600000;t.api.settings.level='find';t.api.settings.pics='on';var C=window.AtlasFactFilesCore,r=C.round('en','find','penguin',1);t._pool=[r];t._poolKey=t._key();t._deal=[{}];t._order=null;t._pass=0;window.LCS_reloadFirstTask();var s=t.st;C.highlight(s,r.span[0],r.span[1]);t._busy=false;t._view={};t._paint();})();`;
  }
  if (row.tool === 'willow-story-corner-activity') {
    // Fox and Bunny, the fourth tooth: three teeth already closed on the zipper (one zipped in the middle, one sticking out each side), "Who found the lost thing?" pulled into the middle — both found-it panels glowing teal — the invention at work
    return `(function(){var t=window['${g}'];if(!t||!t.nextTask)return;t.FAST=true;t.OK_MS=600000;t.api.settings.compare='tales';t.api.settings.listen='tap';var C=window.StoryZipperCore,r={id:'tales.fb.found',kind:'tales',pair:'fb',dim:'found',row:3,swap:false,spot:'mid',last:false,history:[{dim:'lost',spot:'mid'},{dim:'help',spot:'right'},{dim:'alone',spot:'left'}]};t._plan=[r];t._planKey=t._key();t._pass=0;t._order=null;window.LCS_reloadFirstTask();var s=t.st;C.place(s,'mid');C.pull(s);t._busy=false;t._view={};t._paint();})();`;
  }
  if (row.tool === 'otto-picture-book-activity') {
    // the boat story, two sentences checked: the wind sentence under the gust panel with every pin stuck, the other-side sentence under the stream panel with its pin dangling — the invention at work
    return `(function(){var t=window['${g}'];if(!t||!t._ensurePool)return;t.FAST=true;t.OK_MS=600000;t.api.settings.task='which';t.api.settings.parts='two';t._pool=null;t._poolKey=null;var pool=t._ensurePool();var i=pool.findIndex(function(r){return r.story==='boat';});if(i<0)return;var order=[i];for(var k=0;k<pool.length;k++)if(k!==i)order.push(k);t._order=order;t._curPass=0;t._deal=null;window.LCS_reloadFirstTask();var C=window.OttoPinsCore,s=t.st;C.dock(s,0,s.r.strips[0].target);C.dock(s,1,1);C.check(s);t._busy=false;t._view={};t._paint();})();`;
  }
  if (row.tool === 'inky-book-workshop-activity') {
    // the kite book's tree page handed to the author: tiny words crammed into the empty picture frame, the hint naming his job — the invention at work
    return `(function(){var t=window['${g}'];if(!t||!t._ensurePool)return;t.FAST=true;t.OK_MS=600000;t.api.settings.jobs='3';t.api.settings.desks='open';t._pool=null;t._poolKey=null;var pool=t._ensurePool();var i=pool.findIndex(function(r){return r.book==='kite';});if(i<0)return;var order=[i];for(var k=0;k<pool.length;k++)if(k!==i)order.push(k);t._order=order;t._curPass=0;t._deal=null;window.LCS_reloadFirstTask();var C=window.InkyWorkshopCore,s=t.st;C.deliver(s,'author');var p=C.current(s),res=C.deliver(s,'author');t._busy=false;t._view={work:{role:'author',page:p,landed:res.landed,ok:false}};t._paint();})();`;
  }
  if (row.tool === 'story-spine-activity') {
    // the kite book read through: the pennant on the start page, the trouble page's crack sealed by the bandage, the kite ringed teal, two wrong pages left on the table, three books on the shelf — the invention at work
    return `(function(){var t=window['${g}'];if(!t||!t._ensurePool)return;t.FAST=true;t.OK_MS=600000;t.api.settings.task='trouble';t.api.settings.words='shown';t._pool=null;t._poolKey=null;var pool=t._ensurePool();var i=pool.findIndex(function(r){return r.story==='kite';});if(i<0)return;var order=[i];for(var k=0;k<pool.length;k++)if(k!==i)order.push(k);t._order=order;t._curPass=0;t._deal=null;window.LCS_reloadFirstTask();var C=window.StorySpineBookCore,s=t.st;C.pick(s,s.r.cands[0].id);C.put(s);t._shelf=['nest','carrot','boat'];t._busy=false;t._view={stay:true,marks:[{pennant:'ok'},{crack:'sealed',ring:'teal',band:'sealed'},{}]};t._paint();})();`;
  }
  if (row.tool === 'wake-up-pip-activity') {
    // the kite story stacked backwards: the flip stopped where the kite jumps back into the tree, the two pages jiggling, one page still loose — the invention at work
    return `(function(){var t=window['${g}'];if(!t||!t._ensurePool)return;t.FAST=true;t.OK_MS=600000;t.api.settings.game='order';t.api.settings.pages='4';t.api.settings.caps='off';t._pool=null;t._poolKey=null;var pool=t._ensurePool();var i=pool.findIndex(function(r){return r.story==='kite';});if(i<0)return;var order=[i];for(var k=0;k<pool.length;k++)if(k!==i)order.push(k);t._order=order;t._curPass=0;t._deal=null;window.LCS_reloadFirstTask();var C=window.WakeUpPipCore,s=t.st,ids=s.r.pages.map(function(p){return p.id;});s.tray=[ids[3]];s.sockets=[ids[0],ids[2],ids[1],null];var r=C.breakOf(s.r,[ids[0],ids[2],ids[1]]);t._busy=false;t._view={breakAt:r.at,breakKind:r.kind};t._paint();})();`;
  }
  if (row.tool === 'picture-story-activity') {
    // The Lost Mitten open, "Where did the mitten slip off?" answered: the bookmark on "by a big rock", the proving words underlined in gold, page 2 open, Fable hopping — the invention at work
    return `(function(){var t=window['${g}'];if(!t||!t._ensurePool)return;t.FAST=true;t.OK_MS=600000;t.api.settings.mode='ask';t.api.settings.pages='3';t._pool=null;t._poolKey=null;var pool=t._ensurePool();var i=pool.findIndex(function(r){return r.key==='mWhere';});if(i<0)return;var order=[i];for(var k=0;k<pool.length;k++)if(k!==i)order.push(k);t._order=order;t._curPass=0;window.LCS_reloadFirstTask();var C=window.PictureStoryCore,s=t.st;C.mark(s,C.rightTargets(s.r,s.book).filter(function(x){return x.charAt(0)==='f';})[0]);C.check(s);t._busy=false;t._page=2;t._view={fable:2,msg:''};t._paint();})();`;
  }
  if (row.tool === 'picture-bingo-activity') {
    // Bingo calls the cat; pot and cup already flipped into pictures, the chip slid off «cot» with its o lit — the invention at work
    return `(function(){var t=window['${g}'];if(!t||!t._ensurePool)return;t.FAST=true;t.OK_MS=600000;t.api.settings.level='look';t._pool=null;t._poolKey=null;var pool=t._ensurePool();var i=pool.findIndex(function(r){return r.id==='look-0-cat';});if(i<0)return;var order=[i];for(var k=0;k<pool.length;k++)if(k!==i)order.push(k);t._order=order;t._curPass=0;t._cards={};window.LCS_reloadFirstTask();var C=window.PictureBingoCore,s=t.st,c=s.cs.card,at=function(w){return c.sq.filter(function(q){return q.word===w;})[0].i;};s.cs.flipped.push(at('pot'),at('cup'));C.placeChip(s,at('cot'));C.check(s);t._busy=false;t._view={};t._paint();})();`;
  }
  if (row.tool === 'word-keys-activity') {
    // «saw» jammed in the lock of "The cat ___ on the bed.": its s and w glow where was has w and s — the invention at work
    return `(function(){var t=window['${g}'];if(!t||!t._ensurePool)return;t.FAST=true;t.OK_MS=600000;t.api.settings.game='three';t._pool=null;t._poolKey=null;var pool=t._ensurePool();var i=pool.findIndex(function(r){return r.target==='was';});if(i<0)return;var order=[i];for(var k=0;k<pool.length;k++)if(k!==i)order.push(k);t._order=order;t._curPass=0;window.LCS_reloadFirstTask();var C=window.WordKeysCore,s=t.st;s.keys=['war','was','saw'];C.insert(s,'saw',0);C.turn(s);t._busy=false;t._view={};t._ring=['the','of','no'];t._paint();})();`;
  }
  if (row.tool === 'blink-camera-activity') {
    // the shutter open on «was» while the four cards lie face down, three photos already in the album — the invention at work
    return `(function(){var t=window['${g}'];if(!t||!t._ensurePool)return;t.FAST=true;t.HOLD=true;t.api.settings.game='snap';t._pool=null;t._poolKey=null;var pool=t._ensurePool();var i=pool.findIndex(function(r){return r.target==='was';});if(i<0)return;var order=[i];for(var k=0;k<pool.length;k++)if(k!==i)order.push(k);t._order=order;t._curPass=0;window.LCS_reloadFirstTask();t._album=['the','see','go'];t._snap();})();`;
  }
  if (row.tool === 'name-tag-activity') {
    // the tag cat pressed onto the cap: c and a stuck, the t ringed where it peels — the invention at work
    return `(function(){var t=window['${g}'];if(!t||!t._ensurePool)return;t.FAST=true;t.api.settings.level='read';t.api.settings.look='close';t._pool=null;t._poolKey=null;var pool=t._ensurePool();var i=pool.findIndex(function(r){return r.id==='read-cat-close';});if(i<0)return;var order=[i];for(var k=0;k<pool.length;k++)if(k!==i)order.push(k);t._order=order;t._curPass=0;window.LCS_reloadFirstTask();var C=window.NameTagCore,s=t.st,f=s.layout.indexOf(s.r.near);C.hang(s,0,f);var u=Array.from(s.r.tag.word);t._view={press:{tags:[0],frames:[f],units:[u],res:[C.test(s,0)]}};t._paint();})();`;
  }
  if (row.tool === 'lid-boxes-activity') {
    // hat dropped on cat's boxes: the a and t lids pop with their bars, the asked first box stays shut — the invention at work
    return `(function(){var t=window['${g}'];if(!t||!t._ensurePool)return;t.FAST=true;t.api.settings.task='same';t.api.settings.pos='first';t._pool=null;t._poolKey=null;var pool=t._ensurePool();var i=pool.findIndex(function(r){return r.id==='same-first-cat';});if(i<0)return;var order=[i];for(var k=0;k<pool.length;k++)if(k!==i)order.push(k);t._order=order;t._curPass=0;window.LCS_reloadFirstTask();var C=window.LidBoxesCore,s=t.st;t._shelf=[{a:'s',b:'s',c:'#0072B2',wa:'sun',wb:'sock'},{a:'d',b:'d',c:'#009E73',wa:'dog',wb:'duck'}];C.drop(s,s.layout.indexOf(1));C.check(s);t._busy=false;t._view={};t._paint();})();`;
  }
  if (row.tool === 'blend-magnets-activity') {
    // c + at snapped, the rhyme (bat) chosen and tested: its «at» magnet sticks, its «b» jumps away — the invention at work
    return `(function(){var t=window['${g}'];if(!t||!t._ensurePool)return;t.FAST=true;t.api.settings.level='onset';t._pool=null;t._poolKey=null;var pool=t._ensurePool();var i=pool.findIndex(function(r){return r.id==='onset-cat';});if(i<0)return;var order=[i];for(var k=0;k<pool.length;k++)if(k!==i)order.push(k);t._order=order;t._curPass=0;window.LCS_reloadFirstTask();var C=window.BlendMagnetsCore,s=t.st;t._fridge=[{parts:['s','un']},{parts:['fl','ag']},{parts:['h','en']}];C.move(s,0,0);C.choose(s,s.layout.indexOf(1));C.check(s);t._busy=false;t._view={};t._paint();})();`;
  }
  if (row.tool === 'marble-run-activity') {
    // kyn·tti·lä on the board: the marble has read «kyn», bumped the two-consonant step of «tti» and rolled back — the step glows; kynt waits in the tray — the invention at work
    return `(function(){var t=window['${g}'];if(!t||!t._ensurePool)return;t.FAST=true;t.api.settings.level='guard';t._pool=null;t._poolKey=null;var pool=t._ensurePool();var i=pool.findIndex(function(r){return r.id==='guard-kynttilä';});if(i<0)return;var order=[i];for(var k=0;k<pool.length;k++)if(k!==i)order.push(k);t._order=order;t._curPass=0;window.LCS_reloadFirstTask();var C=window.MarbleRunCore,s=t.st;t._jar=3;C.place(s,'w0',0);C.place(s,'w1',1);C.place(s,'p2',2);C.release(s);t._busy=false;t._view={};t._paint();})();`;
  }
  if (row.tool === 'photo-syllables-activity') {
    // pa·pil·lon with «bal» laid in the middle: the photo developed — the butterfly's left strip sharp, a strip of the ball where its body should be, fogged — the invention at work
    return `(function(){var t=window['${g}'];if(!t||!t._ensurePool)return;t.FAST=true;t.api.settings.level='long';t.api.settings.decoy='one';t._pool=null;t._poolKey=null;var pool=t._ensurePool();var i=pool.findIndex(function(r){return r.id==='long-papillon';});if(i<0)return;var order=[i];for(var k=0;k<pool.length;k++)if(k!==i)order.push(k);t._order=order;t._curPass=0;window.LCS_reloadFirstTask();var C=window.PhotoSyllablesCore,s=t.st;t._album=['chat','lune','girafe'];C.lay(s,'c0');C.lay(s,'x0');C.lay(s,'c2');C.develop(s);t._busy=false;t._view={};t._paint();})();`;
  }
  if (row.tool === 'family-lock-activity') {
    // bor·bo·li·ta after Verificar: three wheels pinned, the third still wrong (coral) — the plate reads what the wheels say — the invention at work
    return `(function(){var t=window['${g}'];if(!t||!t._ensurePool)return;t.FAST=true;t.api.settings.level='long';t._pool=null;t._poolKey=null;var pool=t._ensurePool();var i=pool.findIndex(function(r){return r.id==='long-borboleta';});if(i<0)return;var order=[i];for(var k=0;k<pool.length;k++)if(k!==i)order.push(k);t._order=order;t._curPass=0;window.LCS_reloadFirstTask();var C=window.FamilyLockCore,s=t.st;t._keys=['gato','maçã','girafa'];s.wheels.forEach(function(w,q){C.setFace(s,q,q===2?(w.answer+2)%w.faces.length:w.answer);});C.check(s);t._busy=false;t._view={};t._paint();})();`;
  }
  if (row.tool === 'domino-run-activity') {
    // ma·ri·_·sa with the wrong "ma" stood on the gap and pushed: the fallen row lies face-up, the trap tile wobbling coral — the invention at work
    return `(function(){var t=window['${g}'];if(!t||!t._ensurePool)return;t.FAST=true;t.api.settings.level='complete';t._pool=null;t._poolKey=null;var pool=t._ensurePool();var i=pool.findIndex(function(r){return r.id==='complete-mariposa';});if(i<0)return;var order=[i];for(var k=0;k<pool.length;k++)if(k!==i)order.push(k);t._order=order;t._curPass=0;window.LCS_reloadFirstTask();var C=window.DominoRunCore,s=t.st;C.stand(s,'b');C.push(s);t._view={fallen:s.last.fallen.map(function(x,q){return {text:x,cls:q===2?'is-wrong':''};}),closed:false,onTable:['b']};t._paint();})();`;
  }
  if (row.tool === 'syllable-chain-activity') {
    // pal·la → la·ma hooked, the open clasp «ma»: the trick picture piuma held against it — the two half-rings show «ma | piu» and it will not close — the invention at work
    return `(function(){var t=window['${g}'];if(!t||!t._ensurePool)return;t.FAST=true;t.api.settings.level='short';t.api.settings.lure='yes';t._pool=null;t._poolKey=null;var pool=t._ensurePool();var i=pool.findIndex(function(r){return r.id==='short-palla-0';});if(i<0)return;var order=[i];for(var k=0;k<pool.length;k++)if(k!==i)order.push(k);t._order=order;t._curPass=0;window.LCS_reloadFirstTask();var C=window.SyllableChainCore,s=t.st;C.hook(s,'lama');C.hook(s,'piuma');t._clash={syl:'ma',first:'piu',word:'piuma'};t._paint();})();`;
  }
  if (row.tool === 'stepping-stones-activity') {
    // helikopter on three stones after Hoppa!: he and li written, the last stone carrying kop·ter and sinking half under, the frog teetering on it, a ghost stone beside — the invention at work
    return `(function(){var t=window['${g}'];if(!t||!t._ensurePool)return;t.FAST=true;t.api.settings.level='count';t._pool=null;t._poolKey=null;var pool=t._ensurePool();var i=pool.findIndex(function(r){return r.id==='count-helikopter';});if(i<0)return;var order=[i];for(var k=0;k<pool.length;k++)if(k!==i)order.push(k);t._order=order;t._curPass=0;window.LCS_reloadFirstTask();var C=window.SteppingStonesCore,s=t.st;C.lay(s);C.lay(s);C.lay(s);C.hop(s);t._paint();})();`;
  }
  if (row.tool === 'lacing-board-activity') {
    // helikopter after Stram!: the lace holds he·li (glowing), ter has slipped back out onto the board, the trick button ra still waiting — the invention at work
    return `(function(){var t=window['${g}'];if(!t||!t._ensurePool)return;t.FAST=true;t.api.settings.level='decoy';t.api.settings.decoys='one';t._pool=null;t._poolKey=null;var pool=t._ensurePool();var i=pool.findIndex(function(r){return r.id==='decoy-helikopter';});if(i<0)return;var order=[i];for(var k=0;k<pool.length;k++)if(k!==i)order.push(k);t._order=order;t._curPass=0;window.LCS_reloadFirstTask();var C=window.LacingBoardCore,s=t.st,b=function(n){return s.buttons.find(function(x){return x.s===n;}).id;};C.thread(s,b(0));C.thread(s,b(1));C.thread(s,b(3));C.tighten(s);t._popKey=s.r.id+'/'+s.misses;t._paint();})();`;
  }
  if (row.tool === 'telescope-activity') {
    // motorcykel on three rings after Kig!: the view blurred and shifted, the last ring carrying cy·kel — the invention at work
    return `(function(){var t=window['${g}'];if(!t||!t._ensurePool)return;t.FAST=true;var pool=t._ensurePool();var i=pool.findIndex(function(r){return r.id==='pull-motorcykel';});if(i<0)return;var order=[i];for(var k=0;k<pool.length;k++)if(k!==i)order.push(k);t._order=order;t._curPass=0;window.LCS_reloadFirstTask();var C=window.TelescopeCore,s=t.st;C.pull(s);C.pull(s);C.pull(s);C.look(s);t._viewKey=null;t._paint();var v=document.querySelector('.ts-view');if(v)v.classList.remove('is-new');})();`;
  }
  if (row.tool === 'kite-tail-activity') {
    // butterfly with only two bows after a gust: the kite spins, the last bow carrying two beats — the invention at work
    return `(function(){var t=window['${g}'];if(!t||!t._ensurePool)return;t.FAST=true;var pool=t._ensurePool();var i=pool.findIndex(function(r){return r.id==='count-butterfly';});if(i<0)return;var order=[i];for(var k=0;k<pool.length;k++)if(k!==i)order.push(k);t._order=order;t._curPass=0;window.LCS_reloadFirstTask();var C=window.KiteTailCore,s=t.st;C.tie(s);C.gust(s);t._paint();})();`;
  }
  if (row.tool === 'clay-snake-activity') {
    // regenboog chopped one piece short: the stamp prints re | gen·boog with the dotted seam on the last piece and the knife pulsing above it — the invention at work
    return `(function(){var t=window['${g}'];if(!t||!t._ensurePool)return;t.FAST=true;var pool=t._ensurePool();var i=pool.findIndex(function(r){return r.id==='hak-rainbow';});if(i<0)return;var order=[i];for(var k=0;k<pool.length;k++)if(k!==i)order.push(k);t._order=order;t._curPass=0;window.LCS_reloadFirstTask();var C=window.ClaySnakeCore,s=t.st;C.chop(s,0.42);C.check(s);t._paint();})();`;
  }
  if (row.tool === 'silbenbogen-activity') {
    // Schmetterling mid-build: three bows swung, schmet and ter lying in their blue/red bows, ling still in the tray — the invention at work
    return `(function(){var t=window['${g}'];if(!t||!t._ensurePool)return;t.FAST=true;t.api.settings.level='lang';t._pool=null;var pool=t._ensurePool();var i=pool.findIndex(function(r){return r.id==='lang-butterfly';});if(i<0)return;var order=[i];for(var k=0;k<pool.length;k++)if(k!==i)order.push(k);t._order=order;t._curPass=0;window.LCS_reloadFirstTask();var C=window.SilbenbogenCore,s=t.st;C.swing(s);C.swing(s);C.swing(s);[0,1].forEach(function(n){var c=s.cards.find(function(x){return x.s===n;});C.place(s,c.id,n);});t._paint();})();`;
  }
  if (row.tool === 'rhyme-chain-activity') {
    // Rosa's chain mid-build: boat and goat linked, both rings glowing the same pattern, step 2 on the grass — the invention at work
    return `(function(){var t=window['${g}'];if(!t||!t._ensurePool)return;t.FAST=true;var pool=t._ensurePool();var i=pool.findIndex(function(r){return r.id==='chain-boat';});if(i<0)return;var order=[i];for(var k=0;k<pool.length;k++)if(k!==i)order.push(k);t._order=order;t._curPass=0;window.LCS_reloadFirstTask();var C=window.RhymeChainCore,s=t.st,g2=s.grass.find(function(x){return x.key==='goat';});C.hang(s,g2.id,0);t._paint();})();`;
  }
  if (row.tool === 'parking-tower-activity') {
    // between the bus and the van: the truck has ridden the lift up and parked in the middle bay; its dotted route stays — the invention at rest
    return `(function(){var t=window['${g}'];if(!t||!t._ensurePool)return;t.FAST=true;var pool=t._ensurePool();var i=pool.findIndex(function(r){return r.id==='N4';});if(i<0)return;var order=[i];for(var k=0;k<pool.length;k++)if(k!==i)order.push(k);t._order=order;t._curPass=0;window.LCS_reloadFirstTask();var C=window.ParkingTowerCore,s=t.st;C.park(s,{c:2,l:2});t._route=t._routeOf(s.parked);t._paint();})();`;
  }
  if (row.tool === 'sorting-chutes-activity') {
    // three groups mid-sort: the tubes half grown into a picture graph, the next picture waiting on the belt
    return `(function(){var t=window['${g}'];if(!t||!t._ensurePool)return;t.FAST=true;t.api.settings.groups='three';t._pool=null;t._poolKey=null;var pool=t._ensurePool();var i=pool.findIndex(function(r){return r.id==='B6';});if(i<0)return;var order=[i];for(var k=0;k<pool.length;k++)if(k!==i)order.push(k);t._order=order;t._curPass=0;window.LCS_reloadFirstTask();var C=window.SortingChutesCore,s=t.st,g=0;while(s.belt.length>4&&g++<40)C.drop(s,C.keyOf(C.current(s),s.fly));t._paint();})();`;
  }
  if (row.tool === 'drop-stands-activity') {
    // the palms after Check: the stand folded, the golden beam resting on the truly taller palm, the coral gap over the one that stood on the high stand
    return `(function(){var t=window['${g}'];if(!t||!t._ensurePool)return;t.FAST=true;var pool=t._ensurePool();var i=pool.findIndex(function(r){return r.id==='P1';});if(i<0)return;var order=[i];for(var k=0;k<pool.length;k++)if(k!==i)order.push(k);t._order=order;t._curPass=0;window.LCS_reloadFirstTask();var C=window.DropStandsCore,s=t.st;C.choose(s,0);C.check(s);t._beamIn=true;t._paint();})();`;
  }
  if (row.tool === 'tipping-pour-activity') {
    // the tall glass tipped over the low wide bowl, juice streaming in, the raspberry on the bowl — the pour at its moment
    return `(function(){var t=window['${g}'];if(!t||!t._ensurePool)return;t.FAST=true;t.api.settings.cups='tricky';t._pool=null;t._poolKey=null;var pool=t._ensurePool();var i=pool.findIndex(function(r){return r.id==='T1';});if(i<0)return;var order=[i];for(var k=0;k<pool.length;k++)if(k!==i)order.push(k);t._order=order;t._curPass=0;window.LCS_reloadFirstTask();var C=window.TippingPourCore,s=t.st;C.place(s,'B');C.fill(s);t._dock('L');s.tilt=62;for(var n=0;n<8;n++)C.pourStep(s,0.05,'L');t._flow={pour:1,spill:0};t._paint();})();`;
  }
  if (row.tool === 'place-value-activity') {
    // Add a hundred (no-op if no hundreds place) + a couple tens + a few ones
    // so the columns show blocks and the BUILD readout is non-zero.
    return `(function(){var t=window['${g}'];if(t){try{if(t.addHundred)t.addHundred();}catch(e){}try{if(t.addTen){t.addTen();t.addTen();}}catch(e){}try{if(t.addOne){t.addOne();t.addOne();t.addOne();}}catch(e){}if(t.paint)t.paint();}})();`;
  }
  return null;
}

function loadRows() {
  const files = fs.readdirSync(MINI).filter((f) => /-activities\.json$/.test(f));
  const all = [];
  for (const f of files) {
    try {
      const rows = JSON.parse(fs.readFileSync(path.join(MINI, f), 'utf8'));
      /* a one-language row (the syllable decks, rows 43–53) has no en slug: it is drawn in its own language, never skipped */
      for (const r of rows) if (r.slug && Object.keys(r.slug).some((l) => r.slug[l])) all.push(r);
    } catch (e) { console.warn('skip', f, e.message); }
  }
  return all;
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const rows = loadRows().filter((r) => !ONLY || r.id.includes(ONLY));
  const server = serve();
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  const PORT = server.address().port;
  const BASE = `http://127.0.0.1:${PORT}`;

  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  let ok = 0, fail = 0;
  const fails = [];

  for (const row of rows) {
    const page = await browser.newPage();
    await page.setViewport({ width: 720, height: 640, deviceScaleFactor: 2 });
    const lang = row.slug.en ? 'en' : Object.keys(row.slug).find((l) => row.slug[l]);
    const url = `${BASE}/mini-tools/${row.tool}.html?activity=${encodeURIComponent(row.id)}&lang=${lang}&embed=compact`;
    try {
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 45000 });
      await page.waitForSelector('.lcs-stage', { timeout: 15000 });
      await new Promise((r) => setTimeout(r, 900)); // settle: first task + theme-image fetch
      const seed = seedScript(row);
      if (seed) {
        try { await page.evaluate(seed); await new Promise((r) => setTimeout(r, 500)); }
        catch (e) { console.warn(`  seed failed (${row.id}), using on-load: ${e.message}`); }
      }
      const stage = (await page.$('.lcs-stage')) || (await page.$('.lcs-app'));
      if (!stage) throw new Error('no .lcs-stage / .lcs-app');
      const png = await stage.screenshot({ omitBackground: true });
      await sharp(png)
        .resize(480, 360, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .webp({ quality: 82 })
        .toFile(path.join(OUT, `${row.id}.webp`));
      ok++;
      console.log(`  ok   ${row.id}`);
    } catch (e) {
      fail++;
      fails.push(`${row.id}: ${e.message}`);
      console.log(`  FAIL ${row.id} — ${e.message}`);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  server.close();
  console.log(`\nGenerated ${ok} preview(s), ${fail} failure(s) → ${OUT}`);
  if (fails.length) { console.log('Failures (will fall back to glyph on the card):'); fails.forEach((f) => console.log('  • ' + f)); }
  process.exit(0);
})().catch((e) => { console.error('ERROR:', e.message); process.exit(1); });
