#!/usr/bin/env node
/* qa-game.js — the RUNTIME gate on a built game (puppeteer, headless Chrome).
 *
 *   node games/_tools/qa-game.js <slug>            full gate on games/<slug>/index.html
 *   node games/_tools/qa-game.js --self-test       runs the harness against _test/demo.html (proves the harness itself)
 *
 * What it proves, per game:
 *   BOOT       the page loads with no console errors and window.LCS_TEST.ready() becomes true (Phaser booted)
 *   NO-AUTO    LCS_TEST.scene() is "Boot" until start() is called — the game never auto-starts
 *   LOCALES    all 11 ?lang= values load; the start-screen strings differ across locales (≥ 7 distinct
 *              among the 11 Start labels — several languages legitimately share "Start")
 *   SESSION    in en: start(); then for every item wrong() then correct() until scene() === "Finish"
 *              (bounded by 400 steps) — a wrong answer on every item still reaches the finish (no losing state)
 *   TARGETS    at a 704-px iframe width every interactive target from LCS_TEST.targets() is ≥ 44 px real
 *   SHOTS      screenshots to games/_qa/<slug>/: <w>-<lang>-start.png for every locale at 704, plus
 *              en at 400/704/1024 for start, item1, wrong, finish — the visual critic and the operator read these
 * Exit 1 on any FAIL. The harness is deliberately blind to WHAT the game teaches — that is the pedagogue's gate.
 *
 * Puppeteer resolves from the repo root (lessoncraftstudio/node_modules/puppeteer) by normal lookup.
 */
const fs = require("fs");
const path = require("path");
const http = require("http");
const ROOT = path.resolve(__dirname, "..");
const LOCALES = ["en", "de", "fr", "it", "es", "pt", "nl", "sv", "da", "no", "fi"];
const WIDTHS = [400, 704, 1024];
const selfTest = process.argv.includes("--self-test");
const slug = selfTest ? "_test" : process.argv[2];
if (!slug) { console.error("usage: qa-game.js <slug> | --self-test"); process.exit(2); }
const page_path = selfTest ? "/_test/demo.html" : "/" + slug + "/index.html";
if (!fs.existsSync(path.join(ROOT, page_path))) { console.error("not found: games" + page_path); process.exit(2); }
const OUT = path.join(ROOT, "_qa", selfTest ? "_demo" : slug);
fs.mkdirSync(OUT, { recursive: true });

const MIME = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css", ".svg": "image/svg+xml", ".png": "image/png", ".json": "application/json" };
const server = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split("?")[0]); if (p === "/favicon.ico") { res.writeHead(204); return res.end(); } if (p.endsWith("/")) p += "index.html";
  const f = path.normalize(path.join(ROOT, p)); if (!f.startsWith(ROOT)) { res.writeHead(403); return res.end(); }
  fs.readFile(f, (e, d) => { if (e) { res.writeHead(404); return res.end(); } res.writeHead(200, { "Content-Type": MIME[path.extname(f)] || "application/octet-stream" }); res.end(d); });
});

const fails = [], notes = [];
const F = (r, m) => { fails.push(r + ": " + m); console.log("  ✗ " + r + ": " + m); };
const OK = (r, m) => { notes.push(r + ": " + m); console.log("  ✓ " + r + ": " + m); };

(async () => {
  const puppeteer = require("puppeteer");
  await new Promise((r) => server.listen(0, "127.0.0.1", r));
  const BASE = "http://127.0.0.1:" + server.address().port;
  const browser = await puppeteer.launch({ headless: "new", args: ["--no-sandbox", "--disable-dev-shm-usage"] });
  const page = await browser.newPage();
  const errors = []; let ctx = "boot";
  // Every error is tagged with WHERE it happened (lang/width/phase) so a failure names its page.
  page.on("console", (m) => { if (m.type() === "error") errors.push("[" + ctx + "] " + m.text()); });
  page.on("pageerror", (e) => errors.push("[" + ctx + "] " + ((e && e.stack) ? e.stack.split(String.fromCharCode(10)).slice(0, 2).join(" ") : String(e))));

  async function open(lang, width) {
    ctx = lang + "/" + width;
    await page.setViewport({ width, height: Math.round(width * 0.9) + 120, deviceScaleFactor: 2 });
    await page.goto(BASE + page_path + "?lang=" + lang, { waitUntil: "networkidle0", timeout: 60000 });
    await page.waitForFunction(() => window.LCS_TEST && window.LCS_TEST.ready(), { timeout: 20000 }).catch(() => {});
    await new Promise((r) => setTimeout(r, 400));
  }
  const evalT = (code) => page.evaluate(code);

  /* BOOT + NO-AUTO + LOCALES */
  const startLabels = {};
  for (const lang of LOCALES) {
    await open(lang, 704);
    const ready = await evalT("!!(window.LCS_TEST && window.LCS_TEST.ready())");
    if (!ready) { F("BOOT", "LCS_TEST.ready() false for lang=" + lang); continue; }
    const scene = await evalT("window.LCS_TEST.scene()");
    if (scene !== "Boot") F("NO-AUTO", "scene is '" + scene + "' before start() (lang=" + lang + ")");
    const strings = await evalT("JSON.stringify(window.LCS_TEST.strings())");
    startLabels[lang] = JSON.parse(strings).start;
    await page.screenshot({ path: path.join(OUT, "704-" + lang + "-start.png") });
  }
  const distinct = new Set(Object.values(startLabels)).size;
  if (distinct >= 7) OK("LOCALES", distinct + " distinct Start labels across 11 locales"); else F("LOCALES", "only " + distinct + " distinct Start labels: " + JSON.stringify(startLabels));
  if (errors.length) F("BOOT", "console errors: " + errors.slice(0, 3).join(" | "));

  /* TARGETS + SESSION + SHOTS (en) */
  for (const w of WIDTHS) {
    await open("en", w);
    await page.screenshot({ path: path.join(OUT, w + "-en-start.png") });
    if (w === 704) {
      const targets = JSON.parse(await evalT("JSON.stringify(window.LCS_TEST.targets ? window.LCS_TEST.targets() : [])"));
      const scale = await evalT("(function(){var c=document.querySelector('canvas');return c?c.getBoundingClientRect().width/720:1})()");
      const small = targets.filter((t) => Math.min(t.w, t.h) * scale < 44);
      if (targets.length === 0) OK("TARGETS", "no targets reported on the start screen (start button is a makeButton)");
      else if (small.length) F("TARGETS", small.length + " target(s) under 44 px real at 704: " + small.map((t) => t.id + " " + Math.round(Math.min(t.w, t.h) * scale)).join(", "));
      else OK("TARGETS", targets.length + " targets ≥ 44 px real at 704");
    }
    if (selfTest) { if (w === 704) { ctx = "en/704/play"; await evalT("window.LCS_TEST.start()"); await new Promise((r) => setTimeout(r, 400)); const sc = await evalT("window.LCS_TEST.scene()"); if (sc === "Play") OK("SESSION", "start() entered Play (self-test)"); else F("SESSION", "start() did not enter Play: " + sc); await page.screenshot({ path: path.join(OUT, w + "-en-item1.png") }); } continue; }
    ctx = "en/" + w + "/play";
    await evalT("window.LCS_TEST.start()");
    await new Promise((r) => setTimeout(r, 600));
    let scene = await evalT("window.LCS_TEST.scene()");
    if (scene !== "Play") { F("SESSION", "after start() scene is '" + scene + "' at " + w); continue; }
    await page.screenshot({ path: path.join(OUT, w + "-en-item1.png") });
    let steps = 0, shotWrong = false;
    while (scene === "Play" && steps < 400) {
      await evalT("window.LCS_TEST.wrong()"); await new Promise((r) => setTimeout(r, 350));
      if (!shotWrong) { await page.screenshot({ path: path.join(OUT, w + "-en-wrong.png") }); shotWrong = true; }
      await evalT("window.LCS_TEST.correct()"); await new Promise((r) => setTimeout(r, 900));
      scene = await evalT("window.LCS_TEST.scene()"); steps++;
    }
    if (scene === "Finish") { OK("SESSION", "finish reached at " + w + " after " + steps + " items with a wrong answer on each"); await new Promise((r) => setTimeout(r, 400)); await page.screenshot({ path: path.join(OUT, w + "-en-finish.png") }); }
    else F("SESSION", "no finish at " + w + " after " + steps + " steps (scene '" + scene + "')");
    const tgt = JSON.parse(await evalT("JSON.stringify(window.LCS_TEST.targets ? window.LCS_TEST.targets() : [])"));
    if (w === 704 && tgt.length) { const scale = await evalT("(function(){var c=document.querySelector('canvas');return c?c.getBoundingClientRect().width/720:1})()"); const small = tgt.filter((t) => Math.min(t.w, t.h) * scale < 44); if (small.length) F("TARGETS", "finish-screen targets under 44 px: " + small.map((t) => t.id).join(",")); }
  }
  if (errors.length) F("BOOT", "console errors during play: " + errors.slice(0, 3).join(" | "));

  await browser.close(); server.close();
  console.log("\n" + (fails.length ? "FAIL" : "PASS") + "  " + slug + "  — " + fails.length + " failure(s); screenshots in " + path.relative(ROOT, OUT));
  process.exit(fails.length ? 1 : 0);
})().catch((e) => { console.error("harness error:", e.message); server.close(); process.exit(1); });
