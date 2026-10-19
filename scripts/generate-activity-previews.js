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
      for (const r of rows) if (r.slug && r.slug.en) all.push(r);
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
    const url = `${BASE}/mini-tools/${row.tool}.html?activity=${encodeURIComponent(row.id)}&lang=en&embed=compact`;
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
