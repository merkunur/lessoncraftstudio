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
