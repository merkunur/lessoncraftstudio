#!/usr/bin/env node
/* probe-numeral-nest.js — captures the two states qa-game.js STRUCTURALLY CANNOT reach.
 *
 *   node games/_tools/probe-numeral-nest.js
 *
 * WHY THIS EXISTS. qa-game's session loop takes its wrong-answer screenshot 350 ms after
 * the FIRST wrong() — which always lands on an easy L1 item — and it answers correctly
 * after one wrong, so attempt 3 never happens. The two states this game exists for are
 * therefore never photographed by the gate:
 *
 *   1. THE MIRROR CUE   — tapping 9 for a set of 6 (or 6 for 9): both tiles park side by
 *                         side, the correct numeral drops onto the coral bar, a ring draws
 *                         around its bowl. This is the game's headline pedagogy.
 *   2. THE SHOW-ME RING — attempt 3: the correct tile pulses and the other two are dead.
 *
 * A gate that cannot see a state cannot grade it, so the visual critic and the pedagogue
 * would sign off on a game whose two most important frames nobody had ever looked at.
 *
 * This drives the game through its OWN test hook (no private entry points), so what it
 * photographs is what a child would see. Screenshots land beside the gate's own, in
 * games/_qa/numeral-nest/ (gitignored).
 */
const fs = require("fs");
const path = require("path");
const http = require("http");
const ROOT = path.resolve(__dirname, "..");
const SLUG = "numeral-nest";
const OUT = path.join(ROOT, "_qa", SLUG);
fs.mkdirSync(OUT, { recursive: true });

const MIME = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".svg": "image/svg+xml", ".png": "image/png", ".json": "application/json" };
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

(async () => {
  const puppeteer = require("puppeteer");
  await new Promise((r) => server.listen(0, "127.0.0.1", r));
  const BASE = "http://127.0.0.1:" + server.address().port;
  const browser = await puppeteer.launch({ headless: "new", args: ["--no-sandbox", "--disable-dev-shm-usage"] });
  const page = await browser.newPage();
  const errors = [];
  page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
  page.on("pageerror", (e) => errors.push(String(e && e.message || e)));

  async function open(width) {
    await page.setViewport({ width, height: Math.round(width * 0.9) + 120, deviceScaleFactor: 2 });
    await page.goto(BASE + "/" + SLUG + "/index.html?lang=en", { waitUntil: "networkidle0", timeout: 60000 });
    await page.waitForFunction(() => window.LCS_TEST && window.LCS_TEST.ready(), { timeout: 20000 });
    await sleep(300);
    await page.evaluate("window.LCS_TEST.start()");
    await sleep(700);
  }

  /* ---- PROBE 1: the mirror cue -------------------------------------------------
     Walk items answering correctly until an item appears whose answer is 6 or 9 with
     the mirror partner on the board, then tap the PARTNER and photograph the cue.
     If no such item is reached, that is itself a finding: the gate never sees the
     mirror path and neither does a real child in a short session. */
  await open(704);
  let found = false;
  for (let i = 0; i < 40 && !found; i++) {
    const st = await page.evaluate(`(function () {
      if (!window.LCS_TEST.probe) return null;
      return window.LCS_TEST.probe();
    })()`);
    if (!st) { F("LCS_TEST.probe() missing — the probe hook was not built"); break; }
    if (st.scene !== "Play") break;
    if (st.mirrorIndex >= 0) {
      await page.evaluate("window.LCS_TEST.tapIndex(" + st.mirrorIndex + ")");
      await sleep(900);                       // mid-cue: parked tiles, bar, ring
      await page.screenshot({ path: path.join(OUT, "704-en-mirror-cue.png") });
      // The bowl rings only reach full alpha at ~1220ms after the tap; a shot at
      // +1500 catches them at 0.61 and they read as absent. Hold for the settled
      // frame, which is the one the whole cue exists to show.
      await sleep(1300);
      await page.screenshot({ path: path.join(OUT, "704-en-mirror-cue-late.png") });
      OK("mirror cue captured on item " + (i + 1) + " (answer " + st.count + ", tapped its 6/9 partner)");
      found = true;
      break;
    }
    await page.evaluate("window.LCS_TEST.correct()");
    await sleep(1400);
  }
  if (!found && !fails.length) F("no 6/9 item reached in 40 items — the mirror path is unreachable in play");

  /* ---- PROBE 2: the show-me ring (attempt 3) ---------------------------------- */
  await open(704);
  await page.evaluate("window.LCS_TEST.wrong()");
  await sleep(200);
  await page.screenshot({ path: path.join(OUT, "704-en-wrong-early.png") });   // the frame the gate takes
  await page.evaluate("window.LCS_TEST.wrong()");
  await page.evaluate("window.LCS_TEST.wrong()");
  // Poll for attempt 3 instead of guessing a sleep: a 10-egg item runs two
  // enacted counts back to back and can outlast any fixed wait, which would
  // sample mid-count and report a defect that is not there.
  for (let t = 0; t < 60; t++) {
    const a = await page.evaluate("window.LCS_TEST.probe ? window.LCS_TEST.probe().attempt : 0");
    const lk = await page.evaluate("window.LCS_TEST.targets().length");
    if (a >= 3 && lk) break;
    await sleep(500);
  }
  await sleep(400);
  const st3 = await page.evaluate("window.LCS_TEST.probe ? JSON.stringify(window.LCS_TEST.probe()) : null");
  await page.screenshot({ path: path.join(OUT, "704-en-showme.png") });
  if (st3) {
    const s = JSON.parse(st3);
    if (s.attempt >= 3) OK("show-me ring captured (attempt " + s.attempt + ")");
    else F("attempt is " + s.attempt + " after three wrongs — the ladder did not reach the show-me");
    if (s.enabled && s.enabled.filter(Boolean).length === 1) OK("at attempt 3 exactly one tile is live (the other two are disabled)");
    else F("at attempt 3 the live-tile count is " + (s.enabled ? s.enabled.filter(Boolean).length : "?") + ", expected 1");
  }

  /* ---- PROBE 2b: a REAL item-open frame and a REAL wrong frame ----------------
     The gate shoots item1/wrong 350ms after start(), which lands inside the
     item-1 demonstration - tiles are still at alpha 0, so its "wrong" frame shows
     no tiles and its dots are the DEMO count, not a correction. Answer item 1
     properly first, then photograph item 2 open and item 2 mid-correction. */
  await open(704);
  // targets() reports the tiles even while they are invisible during the
  // demonstration, so waiting on its length is vacuous - it is 3 from the
  // first frame. Wait for all three tiles to be ENABLED, which is the only
  // state that means "the child may now tap".
  const tappable = async () => {
    const e = await page.evaluate("JSON.stringify(window.LCS_TEST.probe().enabled || [])");
    const a = JSON.parse(e);
    return a.length === 3 && a.every(Boolean);
  };
  for (let t = 0; t < 60; t++) { if (await tappable()) break; await sleep(300); }
  await page.screenshot({ path: path.join(OUT, "704-en-item-open.png") });
  await page.evaluate("window.LCS_TEST.correct()");
  await sleep(1500);
  for (let t = 0; t < 60; t++) { if (await tappable()) break; await sleep(300); }
  await sleep(250);
  await page.screenshot({ path: path.join(OUT, "704-en-item2-open.png") });
  await page.evaluate("window.LCS_TEST.wrong()");
  await sleep(1400);
  await page.screenshot({ path: path.join(OUT, "704-en-real-wrong.png") });
  OK("captured a real item-open frame and a real wrong frame (tiles visible)");
  /* ---- PROBE 2c: the hen.oops pose -------------------------------------------
     She holds oops for only ~750ms after a wrong tap, so every screenshot taken
     a second or more later shows her back at idle - which is why the visual
     critic reported that she never reacts at all. Catch her inside the window. */
  // wrong() ENQUEUES; the tap only lands on a frame where the tiles are live,
  // so timing from the enqueue measures the wrong interval entirely.
  for (let t = 0; t < 60; t++) { if (await tappable()) break; await sleep(300); }
  await page.evaluate("window.LCS_TEST.wrong()");
  await sleep(420);
  await page.screenshot({ path: path.join(OUT, "704-en-hen-oops.png") });
  const pose = await page.evaluate("(function(){var p=window.__play.tiles[0].container.scene;return p.hen.texture.key})()");
  if (pose === "art:henOops") OK("hen.oops captured mid-window (" + pose + ")");
  else F("the hen is showing " + pose + " 420ms after a wrong tap, not art:henOops");
  /* ---- PROBE 3: brute force never reads as success ----------------------------- */
  await open(704);
  await page.evaluate("window.LCS_TEST.wrong()");
  await sleep(6000);
  await page.evaluate("window.LCS_TEST.correct()");
  await sleep(1200);
  const praised = await page.evaluate("window.LCS_TEST.probe ? window.LCS_TEST.probe().praisedLast : null");
  if (praised === false) OK("a correct answer after a wrong one gets NO praise (guessing does not read as knowing)");
  else if (praised === null) F("probe().praisedLast not exposed — cannot prove the brute-force guard");
  else F("praise fired on a second-attempt correct — the F-65 guard is not working");

  if (errors.length) F("console errors: " + errors.slice(0, 3).join(" | "));
  await browser.close(); server.close();
  console.log("\n" + (fails.length ? "FAIL" : "PASS") + "  probe " + SLUG + " — " + fails.length + " failure(s); shots in " + path.relative(ROOT, OUT));
  process.exit(fails.length ? 1 : 0);
})().catch((e) => { console.error("probe harness error:", e.message); server.close(); process.exit(1); });
