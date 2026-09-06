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
  /* POINTER — a REAL mouse click, not a synthetic emit.
     Two assertions, because they fail independently:
       (a) every interactive object carries a callable hitAreaCallback. A
           missing one makes Phaser throw on every pointer move and nothing
           is touchable, while emit() still works.
       (b) a real click on the biggest interactive target (the Start button)
           actually enters Play.
     Poison-tested against Phaser.Geom.Rectangle.contains (lowercase, which
     does not exist in 3.90): both assertions fail, and the whole existing
     suite passes. */
  await open("en", 704);
  const hitAreas = JSON.parse(await evalT(`(function () {
    var probe = null;
    // any interactive object gives us its scene
    function findScene(list) {
      for (var i = 0; i < list.length; i++) {
        if (list[i].input) return list[i].scene;
        if (list[i].list && list[i].list.length) { var s = findScene(list[i].list); if (s) return s; }
      }
      return null;
    }
    var g = document.querySelector("canvas");
    var sc = null, objs = [], bad = 0;
    try {
      // walk every active scene's display list
      var mgr = window.__phaserGameForQA || null;
      if (!mgr && window.LCS_TEST && window.__startBtn) sc = window.__startBtn.scene;
      if (!sc) return JSON.stringify({ err: "no scene handle" });
      (function walk(arr) {
        for (var i = 0; i < arr.length; i++) {
          var o = arr[i];
          if (o.input) {
            var ok = typeof o.input.hitAreaCallback === "function";
            if (!ok) bad++;
            objs.push({ ok: ok, w: o.width || 0, h: o.height || 0, x: o.x, y: o.y });
          }
          if (o.list && o.list.length) walk(o.list);
        }
      })(sc.children.list);
      return JSON.stringify({ total: objs.length, bad: bad, objs: objs });
    } catch (e) { return JSON.stringify({ err: String(e.message) }); }
  })()`));
  if (hitAreas.err) F("POINTER", "could not inspect hit areas: " + hitAreas.err);
  else if (hitAreas.bad > 0) F("POINTER", hitAreas.bad + " of " + hitAreas.total +
    " interactive objects have no callable hitAreaCallback — Phaser throws on every pointer move and NOTHING is tappable by a real finger (a synthetic emit still works, which is why the rest of this suite can pass)");
  else OK("POINTER", hitAreas.total + " interactive objects all carry a callable hit area");

  /* ALIGNMENT — every control must respond where it is DRAWN.
     Measured, not modelled: take the control's drawn box from getBounds(),
     move the REAL mouse to four interior points, and require Phaser's own
     hitTestPointer to return that control. Modelling the transform here would
     repeat the very assumption that breaks the code (an earlier version did,
     and condemned a correct control whose art is drawn from its top-left).
     A centre-only click passes a hit area displaced by half the control — the
     child then has to hunt for the live corner, which is the reported bug. */
  const boxes = JSON.parse(await evalT(`(function () {
    var sc = window.__startBtn && window.__startBtn.scene;
    if (!sc) return JSON.stringify({ err: "no scene" });
    var cam = sc.cameras && sc.cameras.main, out = [];
    (function walk(arr, vis) {
      for (var i = 0; i < arr.length; i++) {
        var o = arr[i];
        // willRender() only reports the object own visibility, not its
        // ancestors, so the language panel pills (inside a hidden container)
        // looked live and were reported as dead controls. Carry visibility down.
        var shown = vis && o.visible !== false && (o.alpha == null || o.alpha > 0.05);
        if (shown && o.input && o.input.enabled && o.width > 8 && o.height > 8) {
          var b = o.getBounds ? o.getBounds() : null;
          if (b && b.width > 4 && b.height > 4) {
            out.push({ id: out.length, x: b.x, y: b.y, w: b.width, h: b.height });
          }
        }
        if (o.list && o.list.length) walk(o.list, shown);
      }
    })(sc.children.list, true);
    window.__alignTargets = out;
    return JSON.stringify({ n: out.length, boxes: out });
  })()`));
  if (boxes.err) F("ALIGNMENT", "could not inspect: " + boxes.err);
  else {
    const cbox = JSON.parse(await evalT(`(function(){var c=document.querySelector("canvas");var r=c.getBoundingClientRect();return JSON.stringify({x:r.x,y:r.y,w:r.width,h:r.height});})()`));
    const toScreen = (lx, ly) => [cbox.x + (lx / 720) * cbox.w, cbox.y + (ly / 560) * cbox.h];
    const dead = [];
    for (const b of boxes.boxes) {
      const pts = [[0.25, 0.25], [0.75, 0.25], [0.25, 0.75], [0.75, 0.75]];
      let miss = 0;
      for (const [fx, fy] of pts) {
        const lx = b.x + fx * b.w, ly = b.y + fy * b.h;
        await page.mouse.move(...toScreen(lx, ly));
        await new Promise((r) => setTimeout(r, 18));
        const hit = await evalT(`(function(){
          var sc = window.__startBtn.scene, p = sc.input.activePointer;
          var hits = sc.input.hitTestPointer(p);
          var t = window.__alignTargets[${b.id}];
          for (var i = 0; i < hits.length; i++) {
            var g = hits[i].getBounds ? hits[i].getBounds() : null;
            if (g && Math.abs(g.x - t.x) < 2 && Math.abs(g.y - t.y) < 2) return true;
          }
          return false;
        })()`);
        if (!hit) miss++;
      }
      if (miss) dead.push(Math.round(b.w) + "x" + Math.round(b.h) + " at " +
        Math.round(b.x) + "," + Math.round(b.y) + " (" + miss + "/4 corners dead)");
    }
    if (dead.length) F("ALIGNMENT", dead.length + " of " + boxes.n +
      " controls do not respond across the area they are drawn in — a child has to hunt for the live part: " + dead.slice(0, 3).join("; "));
    else OK("ALIGNMENT", boxes.n + " controls respond across their whole drawn area");
  }

  /* the real click */
  const canvasBox = JSON.parse(await evalT(`(function () {
    var c = document.querySelector("canvas"); var r = c.getBoundingClientRect();
    return JSON.stringify({ x: r.x, y: r.y, w: r.width, h: r.height });
  })()`));
  let biggest = null;
  (hitAreas.objs || []).forEach((o) => {
    if (!biggest || o.w * o.h > biggest.w * biggest.h) biggest = o;
  });
  if (!biggest) F("POINTER", "no interactive target found on the start screen");
  else {
    const sx = canvasBox.x + (biggest.x / 720) * canvasBox.w;
    const sy = canvasBox.y + (biggest.y / 560) * canvasBox.h;
    const before = await evalT("window.LCS_TEST.scene()");
    await page.mouse.click(sx, sy);
    await new Promise((r) => setTimeout(r, 1200));
    const after = await evalT("window.LCS_TEST.scene()");
    if (before === "Boot" && after === "Play") OK("POINTER", "a REAL mouse click on Start entered Play");
    else F("POINTER", "a REAL mouse click on the largest target (" + Math.round(biggest.w) + "x" +
      Math.round(biggest.h) + " at " + Math.round(biggest.x) + "," + Math.round(biggest.y) +
      ") did not start the game: scene went '" + before + "' -> '" + after + "'. Synthetic emit() may still work — that is the trap.");
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
