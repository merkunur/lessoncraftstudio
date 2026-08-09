#!/usr/bin/env node
/* =====================================================================
   generate-tool-previews.js — render a real preview thumbnail for every
   premium/free TOOL, for the /[locale]/tools hub cards.

   Sibling of generate-activity-previews.js. The tools hub previously showed
   pure-text cards (title + tagline + paragraph + button) with no image at
   all; these thumbnails are what make it read as a catalog.

   Differences from the activity generator (only four):
     - rows          : the 40 TOOL_KEYS (parsed from lib/seo/tool-content.ts)
     - url           : /mini-tools/<key>.html?lang=en&embed=compact
                       (no ?activity= — tools are free-play, not task-driven)
     - screenshot el : .lcs-stage, falling back to #lcs-root

   NOTE on the target: `.lcs-stage` is NOT in the tools' static HTML — it is
   injected at runtime by the shared lcs-shell, so grepping the .html files
   for it comes back empty and is misleading. Screenshotting #lcs-root
   instead captures `.lcs-header` too, which puts the settings/mute/
   fullscreen/reset chrome buttons in the corner of every thumbnail.
   `.lcs-stage` is the apparatus alone.
     - output        : frontend/public/mini-tools/tool-previews/<key>.webp

   Everything else is deliberately identical: same in-process static server,
   same 720x640 @2x viewport, same networkidle2 + settle, same
   omitBackground screenshot, same sharp 480x360 `contain` on a TRANSPARENT
   matte → WebP q82, so the card's category-tinted panel shows through the
   padding exactly as it does on the activities cards.

   One canonical `en` render per tool, reused across all 11 locales (the
   apparatus is language-light by design — §23.2 "no words on the
   apparatus").

   Output is gitignored (frontend/public/mini-tools/* per .gitignore:106) —
   only this script is committed; the webps are scp'd to
   /var/www/lcs-media/mini-tools/tool-previews/ BEFORE deploy.sh runs the
   build (§20.4 mini-tools cp/deploy race hazard).

   Usage: node scripts/generate-tool-previews.js [--only=<key-substr>]
                                                 [--fit=auto|contain]

     --fit=contain  exact parity with the activity previews: always letterbox
                    on a transparent matte, never crop.
     --fit=auto     (default) letterbox wide stages, but top-crop the 13
                    stages taller than 0.85 aspect, where `contain` would
                    shrink the apparatus into an illegible strip. Tools vary
                    far more in aspect than activities do (720x172 number-line
                    → 691x722 letter-tiles), which is why the choice exists
                    here and not in the activity script.
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
const OUT = path.join(REPO, 'frontend', 'public', 'mini-tools', 'tool-previews');
const TOOL_CONTENT_TS = path.join(REPO, 'frontend', 'lib', 'seo', 'tool-content.ts');
const ONLY = (process.argv.find((a) => a.startsWith('--only=')) || '').split('=')[1] || '';
const FIT = (process.argv.find((a) => a.startsWith('--fit=')) || '').split('=')[1] || 'auto';
if (!['auto', 'contain'].includes(FIT)) {
  console.error(`ERROR: --fit must be 'auto' or 'contain' (got '${FIT}')`);
  process.exit(1);
}

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
    else if (p === '/') { res.statusCode = 404; res.end('no'); return; }
    else file = path.join(MINI, p.replace(/^\//, ''));
    fs.readFile(file, (e, b) => {
      if (e) { res.statusCode = 404; res.end('not found'); return; }
      res.setHeader('Content-Type', MIME[path.extname(file)] || 'application/octet-stream');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.end(b);
    });
  });
}

/* TOOL_KEYS is the single SoT for which tools exist (tool-content.ts:20).
   Parse it rather than re-listing 40 keys here — a hand copy would drift the
   moment tool #41 ships. */
function loadToolKeys() {
  const src = fs.readFileSync(TOOL_CONTENT_TS, 'utf8');
  const m = src.match(/export const TOOL_KEYS\s*=\s*\[([\s\S]*?)\]\s*as const;/);
  if (!m) throw new Error(`could not parse TOOL_KEYS from ${TOOL_CONTENT_TS}`);
  const keys = [...m[1].matchAll(/['"]([a-z0-9-]+)['"]/g)].map((x) => x[1]);
  if (!keys.length) throw new Error('TOOL_KEYS parsed empty');
  return keys;
}

/* tool key → mounted window global (CamelCase, hyphens dropped) — same
   convention the activity generator uses. */
function toolGlobal(key) {
  return key.split('-').map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join('');
}

/* Per-tool seed, ONLY for the tools whose at-rest board is empty.
   Filled empirically after reviewing the first unseeded pass — 31 of the 40
   tools show their apparatus on load and need nothing here.

   Seeds drive the tool's REAL controls with real mouse events (which is what
   produces the pointerdown these tools listen for), rather than poking
   internal state. Same thing scripts/local-test-<key>.js does, and it means a
   seed can only produce a state a child could actually reach.

   Step shape: { sel, nth = 0, times = 1, wait = 120 }
     sel   — selector, resolved INSIDE .lcs-stage
     nth   — index, or an array of indices to click in order
     times — click the same nth element N times */
const SEEDS = {
  /* ⭐ THE TRAY AT REST IS A QUESTION NOBODY HAS ANSWERED. The card has
     to show the ARGUMENT: 7 x 6 broken at the fifth line into 5 x 6 and
     2 x 6, with the 7 SPLIT into a 5 and a 2 on the left rail and the 6
     DUPLICATED on the right — the whole product in one still.
     ⚠ Seeded through a real seam BUTTON, not the tray: the pointer path
     resolves to the nearest seam from clientX/clientY, and a synthetic
     .click() carries neither. The keyboard pads exist for exactly this
     kind of driver.
     ⚠ And generate with --fit=contain: the stage is near-square, past
     the 0.85 line where --fit=auto top-crops, and the top of this stage
     is the numeral rail, i.e. the payload. */
  'baking-tray': [
    { sel: '.btr-comb-row .btr-pad', nth: 4, wait: 720 }
  ],
  /* ⭐ THE EXCHANGE MACHINE AT REST IS A SUM THAT HAS NOT HAPPENED YET.
     The card has to show the ARGUMENT, not the setup: on 42 - 17 the
     ones column holds two with seven outlines over it, which is a
     shortage nobody has done anything about. So the seed performs the
     borrow — index 1 is the tens column by construction — and the shot
     lands on the moment the tool exists for: the tens struck through,
     the small carried digit written, and fourteen sitting in a ones
     column whose brim is at ten. Every one of those is a real control
     driven by a real click, so the pose is a state a child could reach.
     ⚠ Measured, not guessed: the stage renders 452x496 (aspect 0.91),
     which is PAST the 0.85 line where --fit=auto top-crops — and the
     top of this stage is the written sum, i.e. the payload. Generated
     with --fit=contain so the sum survives. */
  'exchange-machine': [
    { sel: '.exm-hit:not(.exm-slot)', nth: 1, wait: 420 }
  ],
  'number-sieve': [
    { sel: '[data-fk="chip:f100"]', wait: 320 },
    { sel: '.nsv-cell[data-n="7"]', wait: 90 },
    { sel: '.nsv-cell[data-n="23"]', wait: 90 },
    { sel: '.nsv-cell[data-n="58"]', wait: 120 },
    /* turn every dealt card, leaving the three candidates face up and
       the question on the hint line — the moment the tool exists for */
    { sel: '.nsv-card.nsv-next', times: 1, wait: 300 },
    { sel: '.nsv-card.nsv-next', times: 1, wait: 300 },
    { sel: '.nsv-card.nsv-next', times: 1, wait: 400 }
  ],
  /* ⭐ LETTER STUDIO AT REST IS A PALE UNTRACED LETTER, and the whole
     story of this tool is a firefly walking the stroke order and then a
     child writing the letter themselves. The card it replaces showed an
     `a` with no ink, no numerals and no arrows on it -- the one thing
     the tool does not do. Put it mid-trace: the first stroke written in
     the child's own coral, the second still waiting with its number and
     its travelling arrows, and the green dot sitting where the pen
     starts next. That is the argument, in one frame.
     ⚠ Driven through the MODEL, not by faking DOM: the tracer refuses
     anything a finger did not sweep, so the seed walks the flattened
     first stroke exactly as a hand would. A seed that cannot be reached
     by a real child is a lie on the hub. */
  'letter-studio': [
    { js: "var T=window.LetterStudio,S=window.StrokeTraceCore;"
        + "var keys=T.keys(),i;for(i=0;i<keys.length;i++)if(keys[i].g==='a'){T.index=i;break;}"
        + "T.seq=null;T.seqAt=0;T._reset();"
        + "var g=T._glyph('a');"
        + "var flat=S.flatten(g[0]);"
        + "for(i=0;i<flat.length;i++)S.sample(T.trace,flat[i]);"
        + "S.endStroke(T.trace);"
        + "T.drawn=[flat];T.render();" },
    { wait: 260 }
  ],
  /* ⭐ CALENDAR WALL AT REST IS A PLAIN MONTH, and the marks are the
     entire reason it was rebuilt — so an unseeded card sells the one
     thing the tool already did. Worse, the card it replaces was shot on
     31 July, the single day of the month when the OLD tool happened to
     look right (every other day already past, and therefore numbered).
     Luck is not a seed.
     ⚠ The closed day is placed on a WEEKDAY the class actually meets,
     computed rather than hard-offset: the first draft put it on a
     Saturday, which marks as no-school a day nobody was coming anyway
     and demonstrates nothing.
     This puts a real class on the board: sixty-two days counted, a trip
     four days out with the countdown running, and a closed day making
     the two numbers differ — which is the tool's whole argument. */
  'calendar-wall': [
    { js: "var T=window.CalendarWall,w=T.wall(),i;" +
          "T.premium=true;T.premiumKnown=true;" +
          "for(i=61;i>=1;i--){var k=T._todayKey,n=0,g=0;" +
          "while(n<i&&g++<400){k=T.M.shiftKey(k,-1);if(T.M.isSchoolDay(w,k))n++;}" +
          "T.M.setCountOn(w,k,62-i);}" +
          "T.M.setCountOn(w,T._todayKey,62);" +
          "var trip=T.M.addEvent(w,T.M.shiftKey(T._todayKey,4),'trip','',1,'once');" +
          "T.M.addEvent(w,(function(){var d=T._todayKey,c=0;while(c<9){d=T.M.shiftKey(d,1);c++;if(T.M.meetsDow(w,T.M.dowOf(d))&&T.M.sleepsBetween(T._todayKey,d)<4)return d;}return T.M.shiftKey(T._todayKey,1);}()),'off','',1,'once');" +
          "T.M.addEvent(w,T.M.shiftKey(T._todayKey,-3),'bday','',1,'year');" +
          "T.M.setTarget(w,trip);" +
          "T.M.setWeatherOn(w,T._todayKey,'sun');" +
          "T._widx=0;T._paint();", wait: 600 }
  ],

  /* ⭐ SYLLABLE SPLITTER AT REST IS DELIBERATELY A PICTURE AND A DRUM AND
     NOTHING ELSE. The rebuild hides the word until the class has clapped
     it — that hiding IS the tool's central teaching ruling — but it also
     means the unseeded card photographs a picture, a drum, and no sign of
     what the tool is for. The one mark this tool exists to teach, the
     syllable arc, would never appear on the hub.
     So the seed claps the word and reveals it: two taps on the drum, then
     the eye. The card then shows a word with its arcs drawn under it,
     which is the whole idea in one frame.
     ⚠ This entry became MANDATORY the moment the word was hidden (§21.5
     point 7). Before the rebuild the tool showed its word at rest and
     needed no seed; a change to the at-rest state silently invalidates
     that, and the failure mode is a card that looks fine and sells
     nothing. */
  'syllable-splitter': [
    { sel: '.ss-drum', times: 2, wait: 320 },
    { sel: '.ss-ghostbtn', nth: 0, wait: 420 }
  ],

  /* ⭐ HEART WORDS AT REST IS AN UNTOUCHED WORD — which shows grapheme
     boxes and nothing else, i.e. it sells Sound Boxes, the sibling tool.
     THE HEART IS THE PRODUCT and it only exists after a tap, so the card
     must photograph the tool IN USE: every box mapped and the seal
     stamped. `have` is the pick — three boxes (large tiles at card scale,
     unlike a five-box word), and its heart sits on `ve`, so the card shows
     the seal on a MULTI-LETTER box with its tie underneath. That is the
     whole idea of the tool in one frame: the regular parts are read, the
     part that cannot be is stamped.
     ⚠ The first-run demonstration must be suppressed — it clears itself
     after two seconds and would photograph a half-marked word or a blank
     one depending on when the shutter fell. Setting `seen` also removes
     the legend line, which at card scale is unreadable anyway. */
  'heart-words': [
    { js: "var T=window.HeartWords;T._store.seen=1;T._stopDemo();" +
          "var l=T.wordsForShelf(T.shelfId);var i=l.findIndex(function(w){return w.display==='have';});" +
          "if(i<0)i=l.findIndex(function(w){return w.boxes.length===3;});if(i<0)i=0;" +
          "T.index=i;T.mapped={};T.face='map';T.render();", wait: 400 },
    { js: "var T=window.HeartWords;var w=T.current();" +
          "for(var k=0;k<w.boxes.length;k++){T.mapped[k]=true;}T._paintBoxes();" +
          "var b=document.querySelectorAll('.hw-face-map .hw-box');" +
          "for(var j=0;j<b.length;j++){b[j].classList.add('hw-mapped');" +
          "if(T.isHeart(w,j))b[j].classList.add('hw-hearted');}", wait: 800 }
  ],
  /* ⭐ PATTERN BENCH AT REST IS RED-BLUE-RED-BLUE — which is the exact
     misconception the tool exists to break (a two-bead unit reads as mere
     alternation, and a card that sells alternation sells a colour picker).
     A THREE-bead unit shows a genuine unit of repeat, uses three of the
     four inks so the value ladder is visible, and 10 beads gives three
     whole repeats plus one so the strip visibly stops MID-UNIT.
     The covered bead is the highest-signal mark on the card: a cloth in
     the MIDDLE says "this is a thinking tool", and it is the one thing no
     pattern worksheet in the catalogue can show. Index 5 is interior and
     is the last bead of the second repeat, which is the interesting case
     rather than a boundary.
     ⚠ Letters stay OFF: a second thin row halves the bead size at card
     scale and the notation is not the pitch. */
  'pattern-bench': [
    { js: "var T=window.PatternBench;T.st=T.setUnitLength(T.st,3);" +
          "T.st=T.setLen(T.st,10);T.st=T.toggleCover(T.st,5);T.render();", wait: 700 }
  ],
  /* ⭐ SORTING HOOPS AT REST IS TWO EMPTY RINGS — the card sells a Venn
     clip-art, not a routine. The pitch is the OVERLAP holding a thing that
     is both, so the seed sorts a handful of blocks into all three regions
     with the rules SHOWN, which is what a labelled sort looks like on a
     carpet.
     ⚠ AND IT MUST NOT BE TOP-CROPPED. Measured: the unseeded card came out
     720x955 (aspect 0.75), `--fit=auto` cropped the bottom, and the shipped
     picture cut BOTH HOOPS IN HALF and lost the tray entirely — the
     generator reported "ok" both times. The seed keeps the shot to the mat
     by putting the tool in a labelled sort whose captions are short. Verify
     by READING the card, never by reading the log line. */
  'sorting-hoops': [
    { js: "var T=window.SortingHoops;T.mode='labelled';T.phase='sort';" +
          "T.ruleA={f:'colour',v:'red'};T.ruleB={f:'shape',v:'circle'};" +
          "T.dealt=[];T.placement={};T._deal(12);" +
          "T.dealt.forEach(function(it){T.placement[it.uid]=T.regionFor(it,T.ruleA,T.ruleB);});" +
          "T.render();", wait: 700 }
  ],
  /* ⭐ THE CARD MUST SHOW THE ROUTINE, NOT A PICTURE SET. At rest wodb is
     four illustrations on four white squares, which sells clip-art. The
     mixed grid — a numeral 6, six dots, the WORD six and a clock at six —
     says "four different things that are all the same number" in one
     glance, which IS the pitch. Two cells lifted, not one: a still image
     has no other way to say MORE THAN ONE ANSWER IS ALLOWED, and that is
     the whole differentiator. One reason showing, not four, which at card
     size is noise. */
  'wodb': [
    { js: "var T=window.Wodb;T.premium=true;T._wantGrid='wodb-mix-23-six';T.current=T.byId['wodb-mix-23-six'];T._resetRitual();T.render();", wait: 700 },
    { sel: '.wdb-cell', nth: 0, wait: 200 },
    { sel: '.wdb-cell', nth: 3, wait: 200 },
    /* ⚠ THE REVEAL WAS DROPPED FROM THIS SEED, AND ONLY MEASURING THE
       CARD FOUND OUT WHY. With the ribbon in shot the app is taller than
       it is wide, `--fit=auto` top-cropped it, and the generator still
       reported "ok" — the shipped card had the word `six` and the clock
       sliced off, i.e. two of the four things the grid is ABOUT. Two
       lifted cells already carry the differentiator on their own. */
  ],
  // A shape with a strand wrapped round it reads as just a shape — the
  // whole story is the strand LEAVING it. So plant the flag (a click on
  // the handle plants it), then run the peel to the end, so the card
  // shows the cord lying straight past the third mark: three and a bit.
  'unroll-tape': [
    { sel: '.urt-flag', nth: 0 },
    { sel: '.urt-foot .urt-chip', nth: 0, wait: 1100 },
  ],
  // ⭐ THE CARD MUST SHOW THE PAYOFF, NOT THE SETUP. At rest the tool
  // opens at 5 and 9 with the piece still attached, which reads as two
  // plain bars — the whole story is the piece coming OFF and landing
  // flush. So walk the handles to 8 and 16 (a tap steps by one, and
  // sixteen is twice eight, where the offcut is visibly the same length
  // as the short plank), then cycle the toggle twice: attached → free →
  // free — and STOP there, one tap short of seated. Seated, the piece
  // has merged with the short plank and reads as one long bar, so the
  // tool's whole invention (a sub-region promoted to its own object)
  // is invisible on the card. Free shows THREE things: two planks, one
  // of them with a piece missing, and that piece floating on its own.
  'comparison-planks': [
    { sel: '.cmp-h-a', nth: [0, 0, 0] },
    { sel: '.cmp-h-b', nth: [0, 0, 0, 0, 0, 0, 0] },
    { sel: '.cmp-foot .cmp-chip', nth: 0, wait: 600 },
  ],
  // empty 10-frame → 6 counters
  /* ⭐ SEVEN, and the tray does the rest. Seven is the canonical
     ten-frame picture — a full five and two more — it is odd so it
     reads as a quantity rather than a symmetry, and it is the only
     count that makes the five-break visibly do work. The three
     counters LEFT IN THE TRAY are the tool's whole thesis, so the card
     carries it without a word. (The old seed filled six cells of the
     old apparatus and its selector no longer exists.) */
  'ten-frame': [{ sel: '.tnf-cell', nth: [6] }],
  // ⭐ AT REST THIS TOOL IS A BARE RULED LINE — indistinguishable on a
  // card from the ruler, the cold line and the open number line, and
  // showing none of what it now does. The card has to carry the ARCS,
  // because a row of identical domes IS the tool's whole claim. So run
  // it all the way: chip 1 is "All the way" (reached BY INDEX, never by
  // English text), which hops 0→5→10→15→20 and leaves four congruent
  // arcs with the rabbit standing on the far end.
  // ⚠ the wait covers the chained flight — each hop is animated at
  // 420ms and the chain steps 60ms behind the landing, so four hops need
  // ~2s before the board is settled and worth photographing.
  'number-line': [
    { sel: '.nl-foot .nl-chip', nth: 1, wait: 2400 },
  ],
  // "Nothing moves yet" → build a rail, then RUN it so a trail is drawn.
  // ⚠ THE RUN IS STEPPED NOW — one 380ms beat per card, plus a rewind and
  // a landing. The old 900ms wait was written for a run that completed in
  // one frame and would photograph the beetle MID-JOURNEY with half a
  // trail. Five cards need ~2.5s; 3200 leaves margin.
  // ⚠ Reach the control by its handle, not by `.arw-foot .arw-chip[0]` —
  // the foot gained a "take the last card off" control and an index would
  // silently photograph the wrong button being pressed.
  // ⭐ THE ROUTE MUST CONTAIN TURNS. The old seed drew a two-cell trail, so
  // the card showed a grid with a short orange line and none of the idea.
  // F F F R F F R F sends the beetle up, right and down again — a trail
  // that crosses the mat and carries TWO pivot arcs, which is the one
  // thing this tool has that no other path renderer does.
  'arrow-strip': [
    { sel: '.arw-card', nth: [0, 0, 0, 3, 0, 0, 3, 0] },
    { sel: '[data-fk="run"]', nth: 0, wait: 4400 },
  ],
  // ⭐ THE CARD MUST SHOW THE BOND, NOT A ROW OF IDENTICAL DOTS. At rest
  // this board opens one-tone, so the thumbnail was six orange discs in
  // three boxes — indistinguishable from the ten-frame and showing none of
  // what the tool is about. Switch on two colours and carry once, so the
  // card carries the whole thesis wordlessly: the nest is ONE unbroken run
  // of two colours, the trays below are those same two colours split, and
  // the run is the same length as the two trays together. A teacher reads
  // "the whole is made of these two parts" off the picture alone.
  // ⚠ driven through the tool object rather than by clicking the drawer:
  // the settings drawer is shell chrome and would be open in the shot.
  'part-whole-frame': [
    { js: "var T=window.PartWholeFrame; T.api.settings.tone='two'; T._setWhole(6); T._carry('toB'); T.render();", wait: 700 },
  ],
  // blank count grid → walk the count on so numbers fill the cells
  'choral-counting': [{ sel: '.cc-next', times: 14, wait: 70 }],
  // blank 8x8 sheet → paint a block of squares
  'folding-sheet': [{ sel: '.fsh-cell', nth: [9, 10, 11, 17, 18, 19, 25, 26, 27] }],
  // empty day → drop a few activity cards on the timeline
  'our-day': [{ sel: '.od-pal-card', nth: [0, 1, 2, 3] }],
  // empty tray, $0.00 → tender a few coins
  'money-mat': [{ sel: '.mm-coinbtn', nth: [3, 3, 2, 1] }],
  // Empty board. Tray tiles are NOT click-to-place — they are a synthetic
  // pointer clone-drag, so a click does nothing. Same drag the tool's own
  // harness performs (scripts/local-test-letter-tiles.js: dragTrayToBoard).
  // fx/fy are FRACTIONS of the .ltl-board rect — hardcoded pixel targets miss
  // the board, and a miss is silent (the tile just returns to the tray).
  'letter-tiles': [
    { drag: { g: 'c', fx: 0.34, fy: 0.30 } },
    { drag: { g: 'a', fx: 0.47, fy: 0.30 } },
    { drag: { g: 't', fx: 0.60, fy: 0.30 } },
  ],
  // "Nobody has answered yet" → cast votes so bars exist
  'class-graph': [{ sel: '.cgr-vote', nth: [0, 0, 0, 1, 1, 2] }],
  // Nothing exists until something is drawn — no record row at all, and two
  // of the three guess shelves are empty. Sort two pieces onto the shelves,
  // drop the record to its 10-cell setting so it is ONE row rather than four,
  // then draw SEVEN of the ten: enough that the record reads as a record, few
  // enough that the bag stays enabled instead of greying out at 0.5 — and the
  // bag is the hero of this card. Every control here is reachable on the
  // anonymous load the generator performs (the 10-chip is free; the second run
  // and the 40-cell record are not, and are not touched).
  // ⚠ PLACEMENT IS LIFT-THEN-DROP FROM BUILD #4, NOT A TAP-CYCLE. The old
  // seed clicked pool pieces three times to walk them round the zones; a
  // click now only LIFTS, so that seed would have left every piece on the
  // tray and the bag refusing to draw — the card would show an untouched
  // cold load. Each placement is now a lift and a drop on a named zone.
  // Drop the record to its 10-cell setting so it reads as ONE row, then draw
  // seven of the ten: enough that the record reads as a record, few enough
  // that the bag stays live — and the bag is the hero of this card.
  'draw-bag': [
    { sel: '.drb-gpiece[data-kind="c"]', nth: 0 },
    { sel: '.drb-shelf[data-zone="1"]', nth: 0 },
    { sel: '.drb-gpiece[data-kind="s"]', nth: 0 },
    { sel: '.drb-shelf[data-zone="2"]', nth: 0 },
    { sel: '.drb-bar .drb-group:first-child .drb-chip', nth: 0 },
    { sel: '.drb-bag', times: 7, wait: 60 },
  ],
  /* THE LIDS: 20 counters, three lids, marker parked — and then LIFTED.
     ⚠ The first seed left the lids DOWN, which is the state where the
     tool has hidden everything it has: three plain circles on an empty
     cream table, saying nothing to anyone browsing the hub. Lifted, the
     card carries the entire idea in one picture — three identical piles
     of six, plus the two that would not share still sitting on the
     table. Foot chips in order: another lid / take one away / lift /
     another table / print. */
  /* ⚠ THE MARKER GOES ON 9, NOT 6. Twenty counters under three lids
     share SIX, so marking 6 would land the class's guess and the answer
     on the same numeral — a card that demonstrates the one thing this
     tool now does by showing it exactly once. 9 puts them apart: a
     filled 9 and a ringed 6, on one strip. ⚠ The lids go down BEFORE the
     marker, because adding a lid voids the commitment. */
  /* THE UNIT HANDLE: the bench is never empty — it opens with two tapes
     already carrying DIFFERENT counts, which is the whole thesis. All the
     seed does is step to a longer object, where the two numbers are
     further apart and the leftover is visible. ⚠ No drag step: this
     generator's only drag shape is letter-tiles' board-fraction clone,
     and inventing a new one here would be untested machinery in a
     screenshot script. Foot order: fit / match / another object / print. */
  'unit-handle': [
    { sel: '.unh-foot .unh-chip', nth: [2, 2] },
  ],
  /* ⚠ RE-SEEDED FOR THE 2026-08 REBUILD, and every step changed.
     There is no `.lid-bar` any more — one card carried a SETUP scale of
     six numerals and an ANSWER scale four hundred pixels below it, with
     nothing telling a teacher which row the class should point at, so the
     total became a stepper in the foot. And the placing chip lays a PAIR
     on the first press, because one lid took the whole total and swallowed
     every counter. So: step the total up to 20 (eight presses of +), one
     press to lay the pair, one more for the third lid, park the marker,
     lift. Foot order: place / take one away / lift / another table /
     print, then the stepper's − and +.
     ⚠ SIXTEEN, NOT TWENTY. Twenty leaves a handsome remainder of two, but
     the strip is state-sized now — stripTop(20) is 15 — so it wrapped to
     a lone "15" on a second row and the card ended in a ragged edge.
     Sixteen shares five three ways with ONE left over, and stripTop(16)
     is 10, which fits one clean row. The remainder is still there, which
     is the half of the idea the card must not lose. */
  'lids': [
    { sel: '.lid-total [data-fk="total+"]', nth: [0, 0, 0, 0] },
    { sel: '.lid-foot .lid-chip', nth: [0, 0] },
    { sel: '.lid-mark', nth: 7 },
    { sel: '.lid-foot .lid-chip', nth: 2 },
  ],
  /* ⭐ 147, and every part of that is a decision.
     The card had NO seed at all, so it was captured from whatever
     localStorage happened to hold — the pose was a leftover, not a
     choice.
     THREE places, because hundreds are free now and the whole apparatus
     is the offer; a two-place card would advertise a tool that no
     longer exists.
     FOUR tens and SEVEN ones, because both leave GHOST SLOTS showing —
     six more makes a hundred, three more makes a ten — so the bundling
     thesis is on the card twice without a word of copy. Seven is also
     the canonical ten-frame picture: a full five and two more.
     ⚠ Reached BY INDEX, never by English text (nth 0/1/2 is the place
     order the mat renders). And the wait clears the arrival pulse while
     staying under the 1200ms settle-speech debounce. */
  'place-value-lab': [
    { sel: '.pvl-add', nth: [1, 1] },
    { sel: '.pvl-add', nth: [2, 2, 2], wait: 900 },
  ],
};

/* per-tool viewport override; every tool without an entry keeps 720x640 */
const VIEWPORT = {
  /* a month grid plus the readouts row is tall; at the default width the
     card goes past the 0.85 aspect where --fit=auto TOP-CROPS, which is
     how the previous card lost its bottom row. Wider keeps it under. */
  /* ⚠ TALL ENOUGH TO CONTAIN THE WHOLE MONTH. In embed mode _fitBoard
     stands down (the iframe is meant to grow), so the board keeps its
     7-by-rows aspect and the card runs past a short viewport — and
     body{overflow:hidden} means the element screenshot CLIPS rather
     than scrolls. Measured: a 1180-wide board is ~1420 tall with its
     chrome, so anything under that photographs a month with its last
     week missing, which is the exact defect the old card had. */
  'calendar-wall': { width: 1180, height: 1560 },

  /* ⚠ MEASURED, NOT GUESSED. At the default 720 the seeded bench came out
     720x651 — aspect 0.904, over the 0.85 line — so `--fit=auto` reported
     "ok" and TOP-CROPPED the card: the title went and the hint line at the
     bottom shipped sliced in half. Reading the .webp is what found it; the
     log said ok both times. 940 wide keeps the same 10-bead strip on one
     row and drops the aspect under the crop threshold. */
  'pattern-bench': { width: 1400, height: 920 },
  /* a three-place base-ten board is 52 units wide and stacks below its
     container breakpoint, which turns a landscape instrument into a
     portrait strip with half the frame empty */
  'place-value-lab': { width: 1180, height: 760 },
  /* the learning clock puts the dial and the speech bubble side by side
     from 760px up and stacks them below it. At the default 720 the card
     came out 698x998 and --fit=auto top-cropped the bottom of the dial
     clean off — the 6 and the minute hand's tip, on a clock. A width past
     its own breakpoint gives the landscape card the tool actually is. */
  'learning-clock': { width: 1000, height: 620 },
  /* wodb's board is aspect-ratio:1/1 with the dock beneath it, so at the
     default width the app is portrait and gets top-cropped. Wide enough
     to reach the 1200px tier's 660px board, short enough to stay
     landscape — measured, not guessed. */
  'wodb': { width: 1280, height: 840 },
  /* ⚠ MEASURED, NOT GUESSED, AND THE GENERATOR SAID "ok" WHILE IT WAS
     WRONG. At the default 720 the draw bag stacks its three claim zones into
     a column and puts the bag above the record, so the card came out 720x754
     — aspect 0.955, over the 0.85 line — and `--fit=auto` top-cropped it:
     the "in the bag" zone lost its top and the record lost its bottom row.
     Reading the .webp is what found it. Past the tool's own 760px breakpoint
     the zones go side by side and the bag sits beside the record, which is
     the landscape instrument it actually is. */
  'draw-bag': { width: 1040, height: 660 },
  /* ⚠ ABOVE 0.85 ASPECT THE GENERATOR CROPS, AND REPORTS "ok" EITHER WAY.
     760x640 produced a 720x821 card with the letter cut off at the
     bottom — the recorded --fit=auto trap. Wider and shorter keeps the
     whole sheet in frame. Measure the CARD, not the generator's verdict. */
  'letter-studio': { width: 1460, height: 900 },
  /* ⚠ MEASURED AT SIX WIDTHS, NOT GUESSED. The rebuild hides the word until
     it is clapped, so this card must be SEEDED (see SEEDS) — and a seeded
     clap card is a portrait column: 720x696 at the default, aspect 0.967,
     which `--fit=auto` reported "ok" while cropping the drum clean off the
     bottom. The drum is the one control the whole tool is about.
     Past the tool's own 1024 breakpoint the card turns landscape (picture
     beside the word and drum) and the shell's wide card tier widens the
     app, giving 1240x683 — aspect 0.551, comfortably under the 0.85 line,
     nothing cropped. Read the .webp after any change here; the log says ok
     either way. */
  'syllable-splitter': { width: 1440, height: 900 },
};

async function runSeed(page, key) {
  const steps = SEEDS[key];
  if (!steps) return false;
  for (const step of steps) {
    /* ⭐ a `js` step drives the TOOL OBJECT rather than the chrome. Some
       cards need a state that is only reachable through the settings
       drawer — and clicking the drawer open leaves the drawer in the shot.
       ⚠ it THROWS on a missing global rather than continuing quietly: a
       seed that silently did nothing photographs the rest state and looks
       exactly like a seed that worked. */
    if (step.js) {
      const ok = await page.evaluate((src) => {
        try { eval(src); return true; } catch (e) { return String(e); }
      }, step.js);
      if (ok !== true) throw new Error(`seed js step failed for ${key}: ${ok}`);
      await new Promise((r) => setTimeout(r, step.wait ?? 400));
      continue;
    }
    if (step.drag) {
      // clone-drag a tray tile onto the board with real PointerEvents
      await page.evaluate(({ g, fx, fy }) => {
        const src = document.querySelector(`.ltl-traytile[data-g="${g}"]`);
        const board = document.querySelector('.ltl-board');
        if (!src || !board) return;
        const b = board.getBoundingClientRect();
        const x = b.left + b.width * fx, y = b.top + b.height * fy;
        const r = src.getBoundingClientRect();
        const sx = r.left + r.width / 2, sy = r.top + r.height / 2;
        const fire = (type, cx, cy) => src.dispatchEvent(new PointerEvent(type, { pointerId: 7, clientX: cx, clientY: cy, bubbles: true }));
        fire('pointerdown', sx, sy);
        fire('pointermove', sx + 4, sy - 14);
        fire('pointermove', (sx + x) / 2, (sy + y) / 2);
        fire('pointermove', x, y);
        fire('pointerup', x, y);
      }, step.drag);
      await new Promise((r) => setTimeout(r, step.wait ?? 220));
      continue;
    }
    const nths = Array.isArray(step.nth) ? step.nth : Array(step.times || 1).fill(step.nth ?? 0);
    for (const i of nths) {
      const els = await page.$$(`.lcs-stage ${step.sel}`);
      const el = els[i];
      if (!el) continue;                       // tolerate a shifting DOM between clicks
      try { await el.click({ delay: 10 }); } catch { /* off-screen / re-rendered — skip */ }
      await new Promise((r) => setTimeout(r, step.wait ?? 120));
    }
  }
  return true;
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const keys = loadToolKeys().filter((k) => !ONLY || k.includes(ONLY));
  console.log(`Rendering ${keys.length} tool preview(s) → ${OUT}\n`);

  const server = serve();
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  const PORT = server.address().port;
  const BASE = `http://127.0.0.1:${PORT}`;

  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  let ok = 0, fail = 0;
  const fails = [];

  for (const key of keys) {
    const page = await browser.newPage();
    /* ⭐ PER-TOOL VIEWPORT, default unchanged for every existing card.
       720px is narrower than some instruments' side-by-side breakpoint,
       so they stack — and a stacked board is not what the tool IS. The
       first place-value-lab card came out 698x1153 (aspect 1.65), which
       --fit=auto top-cropped to a BLANK rectangle with the word "TENS"
       peeking in at the bottom edge, and the generator reported "ok".
       That is the recorded #44 trap: measure the card, do not trust the
       exit code. */
    const VP = VIEWPORT[key] || { width: 720, height: 640 };
    await page.setViewport({ width: VP.width, height: VP.height, deviceScaleFactor: 2 });
    const url = `${BASE}/mini-tools/${key}.html?lang=en&embed=compact`;
    try {
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 45000 });
      await page.waitForSelector('.lcs-stage, #lcs-root', { timeout: 15000 });
      await new Promise((r) => setTimeout(r, 900)); // settle: mount + any image fetch
      try {
        if (await runSeed(page, key)) await new Promise((r) => setTimeout(r, 500));
      } catch (e) { console.warn(`  seed failed (${key}), using on-load: ${e.message}`); }
      const stage = (await page.$('.lcs-stage')) || (await page.$('#lcs-root'));
      if (!stage) throw new Error('no .lcs-stage / #lcs-root');
      const box = await stage.boundingBox();
      if (!box || box.width < 8 || box.height < 8) throw new Error(`stage not laid out (${box ? `${box.width}x${box.height}` : 'null'})`);
      const png = await stage.screenshot({ omitBackground: true });
      // Tool stages vary wildly in aspect (720x172 number-line → 691x722
      // letter-tiles). `contain` on a tall stage shrinks the apparatus into an
      // illegible letterboxed sliver, so anything meaningfully taller than the
      // card's 4:3 is cropped from the TOP instead — where every tool puts its
      // apparatus, with only footer controls falling off.
      const tall = FIT === 'auto' && box.height / box.width > 0.85;
      const img = sharp(png);
      await (tall
        ? img.resize(480, 360, { fit: 'cover', position: 'top' })
        : img.resize(480, 360, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      ).webp({ quality: 82 }).toFile(path.join(OUT, `${key}.webp`));
      ok++;
      console.log(`  ok   ${key}  (${Math.round(box.width)}x${Math.round(box.height)}${tall ? ' crop-top' : ''})`);
    } catch (e) {
      fail++;
      fails.push(`${key}: ${e.message}`);
      console.log(`  FAIL ${key} — ${e.message}`);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  server.close();
  console.log(`\nGenerated ${ok} preview(s), ${fail} failure(s) → ${OUT}`);
  if (fails.length) { console.log('Failures (card falls back to glyph):'); fails.forEach((f) => console.log('  • ' + f)); }
  process.exit(0);
})().catch((e) => { console.error('ERROR:', e.message); process.exit(1); });
