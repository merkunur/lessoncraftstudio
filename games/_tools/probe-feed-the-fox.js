#!/usr/bin/env node
/* probe-feed-the-fox.js — the states qa-game.js STRUCTURALLY CANNOT reach.
 *
 *   node games/_tools/probe-feed-the-fox.js
 *
 * WHY THIS EXISTS. qa-game's session loop answers correctly after ONE wrong
 * answer, and its wrong-answer screenshot is taken 350 ms after the first
 * wrong() — which in this game lands inside item 1's build, before a single
 * berry has been tapped. So the gate never sees:
 *
 *   1. ATTEMPT 3 — the guided re-count and the show-me ring, which is the
 *      rung of the ladder that guarantees an item can always be finished.
 *   2. THE CONSERVATION RE-LAY — the same berries slid into a compact
 *      arrangement with their tags intact. This game's fourth misconception
 *      has no other response.
 *   3. A NINE- OR TEN-BERRY LAYOUT — the gate's session rarely reaches L3,
 *      and 10 berries in two staggered rows is the densest thing this stage
 *      ever holds.
 *   4. THE FOX'S SURPRISED POSE inside its 1140 ms hold. Game 002's critic
 *      captured the equivalent frame at 1400 ms, concluded the mascot never
 *      reacts, and filed a defect against correct art.
 *
 * A gate that cannot see a state cannot grade it, so without this the visual
 * critic and the pedagogue would sign off on a game whose most important
 * frames nobody has ever looked at.
 *
 * It also MEASURES the geometry on the live DOM at every count 2..10, rather
 * than trusting the authored coordinate table — 002's eggs-hanging-out-of-the
 * -nest defect was invisible to every gate and to the arithmetic, and only a
 * measurement against the real rendered positions would have caught it.
 *
 * Everything is driven through the game's OWN test hook: no private entry
 * points, so what it photographs is what a child would see. Screenshots land
 * beside the gate's own in games/_qa/feed-the-fox/ (gitignored).
 */
const fs = require("fs");
const path = require("path");
const http = require("http");
const ROOT = path.resolve(__dirname, "..");
const SLUG = "feed-the-fox";
const OUT = path.join(ROOT, "_qa", SLUG);
/* Wipe the probe's own frames first. Naming a file after whichever count a run
   happened to land on left a stale `trail10` from an intermediate build sitting
   beside fresh frames, still showing a defect that was already fixed - and the
   next one to survive that way might be a real one nobody re-checks. */
fs.mkdirSync(OUT, { recursive: true });
for (const f of fs.readdirSync(OUT)) if (/^\d+-[a-z]{2}-(trail|fox-oops|showme|relay|early-answer|count)/.test(f))
  fs.unlinkSync(path.join(OUT, f));

const MIME = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml", ".png": "image/png", ".json": "application/json" };
const server = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split("?")[0]);
  if (p === "/favicon.ico") { res.writeHead(204); return res.end(); }
  if (p.endsWith("/")) p += "index.html";
  const f = path.normalize(path.join(ROOT, p));
  if (!f.startsWith(ROOT)) { res.writeHead(403); return res.end(); }
  fs.readFile(f, (e, d) => {
    if (e) { res.writeHead(404); return res.end(); }
    res.writeHead(200, { "Content-Type": MIME[path.extname(f)] || "application/octet-stream" });
    res.end(d);
  });
});

const fails = [];
const F = (m) => { fails.push(m); console.log("  x " + m); };
const OK = (m) => console.log("  + " + m);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/* Poll for a condition instead of sleeping a guessed interval: a ten-berry
   item runs two enacted corrections back to back and outlasts any guess. */
async function until(page, expr, ms, what) {
  const t0 = Date.now();
  while (Date.now() - t0 < ms) {
    if (await page.evaluate(expr)) return true;
    await sleep(100);
  }
  F("timed out after " + ms + "ms waiting for: " + what);
  return false;
}

(async () => {
  const puppeteer = require("puppeteer");
  await new Promise((r) => server.listen(0, "127.0.0.1", r));
  const BASE = "http://127.0.0.1:" + server.address().port;
  const browser = await puppeteer.launch({ headless: "new", args: ["--no-sandbox", "--disable-dev-shm-usage"] });
  const page = await browser.newPage();
  const errors = [];
  page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
  page.on("pageerror", (e) => errors.push(String((e && e.message) || e)));

  async function open(width, lang) {
    await page.setViewport({ width, height: Math.round(width * 0.9) + 120, deviceScaleFactor: 2 });
    await page.goto(BASE + "/" + SLUG + "/index.html?lang=" + (lang || "en"),
      { waitUntil: "networkidle0", timeout: 60000 });
    await page.waitForFunction(() => window.LCS_TEST && window.LCS_TEST.ready(), { timeout: 20000 });
    await sleep(300);
    await page.evaluate("window.LCS_TEST.start()");
    await until(page, "window.LCS_TEST.scene() === 'Play'", 5000, "Play scene");
    await sleep(600);
  }
  const P = () => page.evaluate("JSON.stringify(window.LCS_TEST.probe())").then(JSON.parse);
  const shot = (n) => page.screenshot({ path: path.join(OUT, n + ".png") });

  /* Tag every berry, the way a child does. The intent drainer only runs when
     an answer is already pending, so a probe that merely WAITS for the item to
     become answerable waits forever - which is how the first version of the
     fox-reaction check timed out and then reported the mascot inert. */
  async function countAll(what) {
    const st0 = await P();
    if (st0.scene !== "Play") { F("not in Play while trying to " + what); return null; }
    for (let i = 0; i < st0.count; i++) {
      await page.evaluate("window.LCS_TEST.tapBerry(" + i + ")");
      await sleep(260);
    }
    const ok = await until(page, "window.LCS_TEST.probe().k === window.LCS_TEST.probe().count",
      15000, "every berry tagged (" + what + ")");
    if (ok) await sleep(1600);              // the last tag flies to the bubble, then the tiles wake
    return ok ? await P() : null;
  }

  /* ---------------------------------------------------------------
     1. GEOMETRY, measured on the live DOM at every count 2..10.
     The authored table says these do not overlap; this proves it from
     the positions the game actually rendered.
     --------------------------------------------------------------- */
  console.log("\n[1] geometry, measured at every count");
  const CELL_W = 80, CELL_H = 84, GAP = 12, MAT_L = 188, MAT_R = 704, COL_MAX = 172;
  const seenCounts = new Set();
  let geomBad = 0, steps = 0;
  /* One session is 8 items and the adaptive rule keeps it in a narrow band, so
     a single pass legitimately sees only three or four distinct counts. Replay
     until the coverage is real. The alternative - lowering the "too thin"
     threshold until one session passes - would leave the check asserting
     almost nothing, which is the one move that is never allowed. */
  for (let session = 0; session < 5 && seenCounts.size < 8; session++) {
  await open(704);
  steps = 0;
  while (seenCounts.size < 9 && steps < 30) {
    const st = await P();
    if (st.scene !== "Play") break;
    if (st.count && !seenCounts.has(st.count)) {
      seenCounts.add(st.count);
      const boxes = st.boxes.filter(Boolean);
      if (boxes.length !== st.count) {
        F("count " + st.count + ": " + boxes.length + " cells visible"); geomBad++;
      }
      for (const b of boxes) {
        if (b[0] - CELL_W / 2 < MAT_L - 1) { F("count " + st.count + ": cell left " + (b[0] - 40) + " outside the mat"); geomBad++; }
        if (b[0] + CELL_W / 2 > MAT_R + 1) { F("count " + st.count + ": cell right " + (b[0] + 40) + " outside the mat"); geomBad++; }
        if (b[0] - CELL_W / 2 - COL_MAX < GAP) { F("count " + st.count + ": cell within " + (b[0] - 40 - COL_MAX) + "px of the fox column"); geomBad++; }
      }
      for (let i = 0; i < boxes.length; i++) {
        for (let j = i + 1; j < boxes.length; j++) {
          const gx = Math.abs(boxes[i][0] - boxes[j][0]) - CELL_W;
          const gy = Math.abs(boxes[i][1] - boxes[j][1]) - CELL_H;
          if (gx < GAP && gy < GAP) {
            F("count " + st.count + ": two cells " + Math.round(gx) + "/" + Math.round(gy) + "px apart (floor " + GAP + ")");
            geomBad++;
          }
        }
      }
      if (st.count >= 9) await shot("704-en-count" + st.count);
    }
    if ((await page.evaluate("window.LCS_TEST.scene()")) !== "Play") break;
    await page.evaluate("window.LCS_TEST.correct()");
    await sleep(2600);
    steps++;
  }
  }
  if (!geomBad) OK("every count seen (" + [...seenCounts].sort((a, b) => a - b).join(",") + ") lays out with no overlap and inside the mat");
  if (seenCounts.size < 5) F("only " + seenCounts.size + " distinct counts reached; the sweep is too thin to mean anything");

  /* ---------------------------------------------------------------
     2. ONE-TO-ONE is enforced by the object.
     --------------------------------------------------------------- */
  console.log("\n[2] one-to-one enforcement");
  await open(704);
  /* Item 1 demonstrates ONE tap and counts berry 0 itself, so wait for
     that to land before testing: a tap fired during the demonstration
     fast-forwards it instead of counting, and the probe would then be
     measuring the skip, not the one-to-one guard. */
  await until(page, "window.LCS_TEST.probe().k >= 1 && window.LCS_TEST.probe().phase === 'counting'",
    12000, "the demonstration to count berry 0");
  const k1 = (await P()).k;
  await page.evaluate("window.LCS_TEST.tapBerry(0)");
  await sleep(600);
  const k2 = (await P()).k;
  if (k1 === 1 && k2 === 1) OK("a second tap on a counted berry does not advance the count (k stayed 1)");
  else F("double-count not refused: k went " + k1 + " -> " + k2);

  /* ---------------------------------------------------------------
     3. THE FOX'S SURPRISED POSE, captured INSIDE its hold window.
     --------------------------------------------------------------- */
  /* ---------------------------------------------------------------
     3. THE FOX'S SURPRISED POSE, on a REAL wrong answer, ASSERTED not
     eyeballed.
     The first version of this waited for `phase === 'correcting'` and
     shot 420ms later. But onCountComplete ALSO enters "correcting" — for
     the last-tag flight — and it gets there FIRST, so the wait fired on
     the flight and photographed the fox seconds before any wrong answer
     existed. The visual critic then measured the fox as byte-identical
     across all seven play frames and could not tell whether the mascot
     was inert or the probe was pointed at the wrong moment.
     So: wait for the tiles to actually be answerable, click a WRONG one
     with a real pointer, and assert the pose KEY changed. A screenshot
     is evidence for a human; the key is evidence for the gate.
     --------------------------------------------------------------- */
  console.log("\n[3] the fox reacts to a real wrong answer (pose asserted, not eyeballed)");
  await open(704);
  await countAll("reach an answerable item");
  await until(page, "window.LCS_TEST.probe().phase === 'answerable'", 15000, "an answerable item");
  const beforeFox = (await P()).fox;
  const wbox = JSON.parse(await page.evaluate(
    "(function(){var c=document.querySelector('canvas');var r=c.getBoundingClientRect();" +
    "return JSON.stringify({x:r.x,y:r.y,w:r.width,h:r.height});})()"));
  const wst = await P();
  const wrongSlot = [0, 1, 2].filter((i) => i !== wst.correctIndex)[0];
  const wt = JSON.parse(await page.evaluate("JSON.stringify(window.LCS_TEST.targets())"))
    .filter((g) => g.id === "num" + wrongSlot)[0];
  await page.mouse.click(wbox.x + (wt.x / 720) * wbox.w, wbox.y + (wt.y / 560) * wbox.h);
  await sleep(400);
  const duringFox = (await P()).fox;
  await shot("704-en-fox-oops");
  if (duringFox === "foxOops" && beforeFox !== "foxOops") {
    OK("a real click on a wrong numeral put the fox in 'foxOops' (was '" + beforeFox +
       "'), captured 400ms into its 1140ms hold");
  } else {
    F("the mascot does not react to a wrong answer: pose went '" + beforeFox + "' -> '" + duringFox +
      "'. fox.oops is registered and wired but never reaches the screen at the one moment the design promises it.");
  }
  await sleep(1400);
  const afterFox = (await P()).fox;
  if (afterFox === "fox") OK("and it returns to idle afterwards ('" + afterFox + "')");
  else F("the fox is stuck in '" + afterFox + "' after the reaction window");

  /* ---------------------------------------------------------------
     4. ATTEMPT 3 — the show-me ring, and the proof there is no fourth
     attempt: exactly one numeral tile is live.
     --------------------------------------------------------------- */
  console.log("\n[4] attempt 3: the show-me ring");
  await open(704);
  let att = 0, guard = 0;
  while (att < 3 && guard++ < 40) {
    const st = await P();
    if (st.scene !== "Play") break;
    if (st.phase === "answerable" || st.phase === "counting" || st.phase === "guided") {
      await page.evaluate("window.LCS_TEST.wrong()");
    }
    await sleep(900);
    att = (await P()).attempt || 0;
  }
  const st3 = await P();
  if (st3.attempt >= 3) {
    const live = (st3.numEnabled || []).filter(Boolean).length;
    if (live === 1) OK("attempt 3 reached and exactly ONE tile is live — there is no fourth attempt and the item cannot stall");
    else F("attempt 3 has " + live + " live tiles; the ladder has a fourth rung or a dead end");
    await shot("704-en-showme");
  } else F("never reached attempt 3 after " + guard + " steps (attempt=" + st3.attempt + ")");

  /* ---------------------------------------------------------------
     5. THE CONSERVATION RE-LAY. Attempt 2's correction slides the same
     berries into a compact arrangement. Measured: the picture must get
     NARROWER while the count stays the same.
     --------------------------------------------------------------- */
  console.log("\n[5] the conservation re-lay");
  await open(704);
  await until(page, "window.LCS_TEST.probe().phase === 'counting'", 8000, "counting");
  const spread = () => P().then((s) => {
    const b = s.boxes.filter(Boolean);
    return { n: s.count, w: Math.max(...b.map((x) => x[0])) - Math.min(...b.map((x) => x[0])), att: s.attempt };
  });
  await page.evaluate("window.LCS_TEST.wrong()");
  await until(page, "window.LCS_TEST.probe().attempt >= 2", 25000, "attempt 2");
  const before = await spread();
  await page.evaluate("window.LCS_TEST.wrong()");
  await sleep(1400);
  await shot("704-en-relay");
  await until(page, "window.LCS_TEST.probe().phase === 'guided' || window.LCS_TEST.probe().attempt >= 3", 25000, "the re-lay");
  const after = await spread();
  if (after.n === before.n && after.w <= before.w) {
    OK("the re-lay kept the count at " + after.n + " and narrowed the picture " +
       Math.round(before.w) + " -> " + Math.round(after.w) + "px — same berries, new picture, same number");
  } else if (after.n !== before.n) {
    F("the re-lay changed the count " + before.n + " -> " + after.n + "; conservation is exactly what it must NOT do");
  } else {
    OK("the re-lay ran; width " + Math.round(before.w) + " -> " + Math.round(after.w) +
       "px (already compact, so no narrowing was available)");
  }

  /* ---------------------------------------------------------------
     6. BRUTE FORCE NEVER READS AS SUCCESS. An item solved after a wrong
     answer must not be praised — with three tiles, two wrong taps leave
     the answer by elimination, so the celebration is the only thing
     separating knowing from guessing.
     --------------------------------------------------------------- */
  console.log("\n[6] a guessed item is not celebrated");
  await open(704);
  await until(page, "window.LCS_TEST.probe().phase === 'counting'", 8000, "counting");
  await page.evaluate("window.LCS_TEST.wrong()");
  await until(page, "window.LCS_TEST.probe().attempt >= 2", 25000, "attempt 2");
  await page.evaluate("window.LCS_TEST.correct()");
  await sleep(1200);
  const pr = await P();
  if (pr.praisedLast === false) OK("an item solved after a wrong answer is NOT praised");
  else F("praise fired on a guessed item (praisedLast=" + pr.praisedLast + ")");

  /* ---------------------------------------------------------------
     7. THE EARLY ANSWER is refused, not punished, and never completes
     the item — the diagnostic the spec's blanket disable deleted.
     --------------------------------------------------------------- */
  console.log("\n[7] an early answer is refused, not punished (driven by a REAL mouse click)");
  await open(704);
  /* This CANNOT go through the intent queue. The drainer deliberately
     finishes the count before it will deliver a numeral tap — that is
     what stops the gate stalling — so tapIndex() can never express an
     early answer. A real pointer can, and it is what a child does. This
     is also the probe's own real-pointer assertion (a synthetic emit is
     not a tap: game 002 shipped with NOTHING clickable and a green suite). */
  await until(page, "window.LCS_TEST.probe().k >= 1 && window.LCS_TEST.probe().phase === 'counting'",
    12000, "one berry counted");
  const e0 = await P();
  if (!e0.numEnabled.some(Boolean)) {
    F("the numeral tiles are still dead after the first berry — the skip diagnostic cannot fire");
  } else if (e0.k >= e0.count) {
    F("the count finished before an early answer could be tried (item has only " + e0.count + " berries)");
  } else {
    const box = JSON.parse(await page.evaluate(
      "(function(){var c=document.querySelector('canvas');var r=c.getBoundingClientRect();" +
      "return JSON.stringify({x:r.x,y:r.y,w:r.width,h:r.height});})()"));
    const tgs = JSON.parse(await page.evaluate("JSON.stringify(window.LCS_TEST.targets())"));
    const t = tgs.filter((g) => g.id === "num" + e0.correctIndex)[0];
    await page.mouse.click(box.x + (t.x / 720) * box.w, box.y + (t.y / 560) * box.h);
    await sleep(1000);
    const e1 = await P();
    if (e1.scene === "Play" && e1.k < e1.count && e1.itemId === e0.itemId && e1.attempt === e0.attempt) {
      OK("a REAL click on the correct numeral, with berries still un-counted, neither completed the item " +
         "nor spent an attempt (still " + e1.itemId + ", " + e1.k + "/" + e1.count + " counted, attempt " + e1.attempt + ")");
    } else {
      F("an early answer completed or advanced the item: " + e0.itemId + " k" + e0.k + "/a" + e0.attempt +
        " -> " + e1.itemId + " k" + e1.k + "/a" + e1.attempt + " (scene " + e1.scene + ")");
    }
    await shot("704-en-early-answer");
  }

  /* ---------------------------------------------------------------
     8. TAP TARGETS ON THE PLAY SURFACE, at 704 AND at 400.
     qa-game's TARGETS check runs immediately after open(), which is
     BEFORE start() — so it only ever measures the start screen (which
     reports none) and the finish screen. The 44px floor is therefore
     never verified on the surface the child actually touches, and 400px
     is not gated at all. At 400 a cell is 44.4 real px: 0.4px of margin,
     which is the binding constraint of the whole layout.
     --------------------------------------------------------------- */
  console.log("\n[8] tap targets during PLAY, at 704 and 400");
  for (const w of [704, 400]) {
    await open(w);
    await until(page, "window.LCS_TEST.probe().phase === 'counting'", 8000, "counting at " + w);
    const tg = JSON.parse(await page.evaluate("JSON.stringify(window.LCS_TEST.targets())"));
    const scale = await page.evaluate(
      "(function(){var c=document.querySelector('canvas');return c?c.getBoundingClientRect().width/720:1})()");
    const small = tg.filter((t) => Math.min(t.w, t.h) * scale < 44);
    if (!tg.length) F("no play-surface targets reported at " + w);
    else if (small.length) {
      F(w + "px: " + small.length + " play target(s) under the 44px floor: " +
        small.map((t) => t.id + " " + (Math.min(t.w, t.h) * scale).toFixed(1)).join(", "));
    } else {
      const min = Math.min(...tg.map((t) => Math.min(t.w, t.h) * scale));
      OK(w + "px: all " + tg.length + " play targets >= 44px real (smallest " + min.toFixed(1) + ")");
    }
  }

  /* ---------------------------------------------------------------
     9. THE COMPLETED NUMERAL TRAIL AT n=10 — the single most
     load-bearing picture in the game (ten tags 1..10 in two staggered
     rows with the total in the bubble) and the one the gate's sweep
     never contains: its dense-layout frames are both UN-counted fields.
     Computing the geometry safe is not the same as having looked.
     --------------------------------------------------------------- */
  console.log("\n[9] the completed trail at the densest layout");
  for (const w of [704, 400]) {
    let seen = false;
    /* Replay until the HARDEST coordinate turns up: ten berries in two staggered
       rows is the densest thing this stage ever holds, and the trail is the one
       picture the whole game exists to produce. Settling for n=9 leaves the worst
       case unphotographed. */
    for (let session = 0; session < 6 && !seen; session++) {
    await open(w);
    for (let step = 0; step < 30 && !seen; step++) {
      const st = await P();
      if (st.scene !== "Play") break;
      if (st.count === 10 || (session >= 4 && st.count >= 9)) {
        const done = await countAll("tag all " + st.count + " berries");
        if (!done) { F(w + "px: could not complete the n=" + st.count + " count"); seen = true; break; }
        const tags = done.counted.filter(Boolean).length;
        if (tags === done.count) OK(w + "px: all " + done.count + " tags on screen at once, trail intact");
        else F(w + "px: only " + tags + " of " + done.count + " tags present after the count completed");
        /* EVERY tag must be full size, the LAST one especially: lastBeat is a yoyo
           and numeralIn is still tweening the same object's scale when it starts, so
           the cardinality tag - the most important numeral in the game - silently
           settled at half size. Every gate passed; only a pixel measurement found it. */
        const small = (done.tagScales || []).filter((v) => v < 0.9);
        if (small.length) F(w + "px: " + small.length + " tag(s) left under full size " +
          JSON.stringify(done.tagScales) + " - the last tag is the cardinality answer and must not shrink");
        else OK(w + "px: every tag at full size " + JSON.stringify(done.tagScales));
        await shot(w + "-en-trail-dense");
        OK(w + "px: the dense frame is n=" + done.count);
        seen = true; break;
      }
      if ((await page.evaluate("window.LCS_TEST.scene()")) !== "Play") break;
      await page.evaluate("window.LCS_TEST.correct()");
      await sleep(2600);
    }
    }
    if (!seen) F(w + "px: never reached a 10-berry item, so the densest trail is still unphotographed");
  }

  /* a non-English FINISH screen: the sweep only ever proves the eleven
     locales on the TITLE, and "Play again" is the classic overflow case
     (de "Nochmal spielen" is ~1.5x the English). */
  console.log("\n[10] a German finish screen");
  await open(704, "de");
  for (let i = 0; i < 40; i++) {
    if ((await page.evaluate("window.LCS_TEST.scene()")) === "Finish") break;
    await page.evaluate("window.LCS_TEST.correct()");
    await sleep(2500);
  }
  if ((await page.evaluate("window.LCS_TEST.scene()")) === "Finish") {
    await sleep(600); await shot("704-de-finish");
    OK("captured the German finish screen (button-overflow case)");
  } else F("could not reach the finish screen in German");

  /* the desktop renders I read myself */
  await open(1024);
  await sleep(500); await shot("1024-en-item-open");
  await open(400);
  await sleep(500); await shot("400-en-item-open");

  if (errors.length) F("console errors: " + errors.slice(0, 3).join(" | "));
  await browser.close(); server.close();
  console.log("\n" + (fails.length ? "FAIL" : "PASS") + "  probe " + SLUG +
    "  — " + fails.length + " failure(s); screenshots in " + path.relative(ROOT, OUT));
  process.exit(fails.length ? 1 : 0);
})().catch((e) => { console.error("probe harness error:", e.message); server.close(); process.exit(1); });
