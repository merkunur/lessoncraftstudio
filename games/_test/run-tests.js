/* Test harness for game-core.js. Mocks Phaser + DOM and checks the
   pure logic and the Phaser-facing behaviour without a browser. */
const fs = require("fs");
const vm = require("vm");
const path = require("path");

const LIB = path.join(__dirname, "..", "_lib"); // anchored on this file, not the cwd — runs from the repo root too
const themeSrc = fs.readFileSync(path.join(LIB, "theme.js"), "utf8");
const stringsSrc = fs.readFileSync(path.join(LIB, "ui-strings.js"), "utf8");
const coreSrc = fs.readFileSync(path.join(LIB, "game-core.js"), "utf8");
const artSrc = fs.readFileSync(path.join(LIB, "art.js"), "utf8");

let pass = 0, fail = 0;
function check(name, cond) {
  if (cond) { pass++; console.log("PASS  " + name); }
  else { fail++; console.log("FAIL  " + name); }
}

/* ---- Mock Phaser / DOM ---- */
class Emitter {
  constructor() { this._h = {}; }
  on(e, f) { (this._h[e] = this._h[e] || []).push(f); return this; }
  once(e, f) { const w = (...a) => { this.off(e, w); f(...a); }; (this._h[e] = this._h[e] || []).push(w); return this; }
  off(e, f) { if (this._h[e]) this._h[e] = this._h[e].filter((x) => x !== f); }
  emit(e, ...a) { (this._h[e] || []).slice().forEach((f) => f(...a)); }
}
function chain(obj) {
  ["setSize", "setInteractive", "setScale", "setOrigin", "setVisible", "setResolution",
    "setAlpha", "setDepth", "setPosition", "setAngle", "setBlendMode", "setTint"].forEach((m) => {
    obj[m] = function () { return obj; };
  });
}
class GameObject extends Emitter {
  constructor(scene) { super(); this.scene = scene; this.active = true; chain(this); }
  setText(s) { this.text = s; return this; }
  destroy() { this.active = false; this.emit("destroy"); }
}
class Graphics extends GameObject {
  constructor(scene, x, y) { super(scene); this.x = x || 0; this.y = y || 0; this.calls = [];
    ["fillRect","strokeRect","fillCircle","strokeCircle","fillEllipse","strokeEllipse","fillPoints","strokePoints","lineBetween","beginPath","arc","strokePath","fillPath"].forEach((m) => { this[m] = (...a) => { this.calls.push(m); return this; }; });
    this._lastFill = null; this._lastStroke = null;
    ["clear", "fillStyle", "lineStyle"].forEach((m) => { this[m] = function () { return this; }; });
    this["fillRoundedRect"] = function (rx, ry, rw, rh) { this._lastFill = [rx, ry, rw, rh]; return this; };
    this["strokeRoundedRect"] = function (rx, ry, rw, rh) { this._lastStroke = [rx, ry, rw, rh]; return this; }; }
}
class Text extends GameObject {
  constructor(scene, x, y, str, style) {
    super(scene); this.x = x; this.y = y; this.text = str;
    var fs = style && style.fontSize ? parseInt(style.fontSize, 10) : 16;
    this.fontSize = fs || 16;
    this.width = (str == null ? 0 : String(str).length) * 8;
    this.height = this.fontSize;
  }
  setText(s) { this.text = s; this.width = (s == null ? 0 : String(s).length) * 8; return this; }
  setFontSize(n) { this.fontSize = n; this.height = n; return this; }
}
class Container extends GameObject {
  constructor(scene, x, y, children) { super(scene); this.x = x; this.y = y; this.list = (children || []).slice(); }
  add(c) { if (Array.isArray(c)) this.list.push(...c); else this.list.push(c); return this; }
}
function makeScene() {
  const scene = {
    scale: { width: 800, height: 600 },
    input: { keyboard: new Emitter() },
    events: new Emitter(),
    bringToTop: function (obj) { return obj; },
    load: { svg: (key, url, cfg) => { scene.loaded.push({ key, url, cfg }); } },
    loaded: [],
    textures: { exists: (k) => scene.loaded.some((l) => l.key === k) },
    add: {
      image: (x, y, key) => { const o = new GameObject(scene); o.x = x; o.y = y; o.key = key; o.setDisplaySize = (w, h) => { o.dw = w; o.dh = h; return o; }; return o; },
      container: (x, y, ch) => new Container(scene, x, y, ch),
      graphics: (x, y) => new Graphics(scene, x, y),
      text: (x, y, s, st) => new Text(scene, x, y, s, st)
    },
    tweens: {
      add: (cfg) => { if (cfg.onComplete) cfg.onComplete(); return {}; },
      chain: (cfg) => { if (cfg.onComplete) cfg.onComplete(); return {}; }
    }
  };
  return scene;
}

/* Build an isolated GameCore with a given URL query and html lang. */
function makeCore(opts) {
  opts = opts || {};
  const posted = [];
  const win = {
    location: { search: opts.search || "" },
    parent: { postMessage: (msg) => posted.push(msg) }
  };
  const doc = {
    documentElement: { _lang: opts.htmlLang || null,
      getAttribute(k) { return k === "lang" ? this._lang : null; },
      setAttribute(k, v) { if (k === "lang") this._lang = v; } },
    body: { scrollHeight: opts.bodyHeight == null ? 600 : opts.bodyHeight }
  };
  const ctx = {
    window: win, document: doc, URLSearchParams,
    Phaser: { Geom: { Rectangle: function (x, y, w, h) { this.x = x; this.y = y; this.width = w; this.height = h; }, } },
    console
  };
  ctx.Phaser.Geom.Rectangle.contains = function () { return true; };
  vm.createContext(ctx);
  vm.runInContext(themeSrc, ctx);
  vm.runInContext(stringsSrc, ctx);
  vm.runInContext(artSrc, ctx);
  vm.runInContext(coreSrc, ctx);
  return { GameCore: ctx.GameCore, ctx, posted };
}

/* ---------- Language resolution ---------- */
let c = makeCore({ search: "?lang=de", htmlLang: "fr" });
check("query beats html+options", c.GameCore.init({ lang: "it" }) === "de");

c = makeCore({ search: "", htmlLang: "de" });
check("options beats html", c.GameCore.init({ lang: "fr" }) === "fr");

c = makeCore({ search: "", htmlLang: "de" });
check("html used when no query/options", c.GameCore.init({}) === "de");

c = makeCore({ search: "", htmlLang: null });
check("default en", c.GameCore.init({}) === "en");

c = makeCore({ search: "?lang=xx", htmlLang: "es" });
check("invalid query falls to html", c.GameCore.init({}) === "es");

c = makeCore({ search: "?lang=xx", htmlLang: "xx" });
check("invalid everywhere -> en", c.GameCore.init({ lang: "zz" }) === "en");

c = makeCore({ search: "?lang=de-DE" });
check("sub-tag trimmed", c.GameCore.init({}) === "de");

c = makeCore({ search: "?lang=EN" });
check("case-insensitive", c.GameCore.init({}) === "en");

/* ---------- t() and placeholders ---------- */
c = makeCore({}); c.GameCore.init({});
check("t start en", c.GameCore.t("start") === "Start");
check("t placeholder", c.GameCore.t("question_x_of_y", { n: 3, total: 10 }) === "Question 3 of 10");
check("t missing key returns key", c.GameCore.t("nope_nope") === "nope_nope");

/* ---------- setLanguage ---------- */
c.GameCore.setLanguage("fr");
check("setLanguage changes t", c.GameCore.t("start") === "Commencer");
check("setLanguage placeholder fr", c.GameCore.t("question_x_of_y", { n: 2, total: 5 }) === "Question 2 sur 5");
c.GameCore.setLanguage("klingon");
check("setLanguage ignores unknown", c.GameCore.t("start") === "Commencer");
check("setLanguage sub-tag works", (c.GameCore.setLanguage("de-AT"), c.GameCore.t("start") === "Start" && c.GameCore.lang === "de"));

/* ---------- embed + sound ---------- */
c = makeCore({ search: "?embed=1" }); c.GameCore.init({});
check("isEmbedded true on embed=1", c.GameCore.isEmbedded === true);
c = makeCore({ search: "?embed=0" }); c.GameCore.init({});
check("isEmbedded false on embed=0", c.GameCore.isEmbedded === false);
c = makeCore({ search: "?sound=off" }); c.GameCore.init({});
check("soundEnabled false on sound=off", c.GameCore.soundEnabled === false);
c = makeCore({ search: "" }); c.GameCore.init({});
check("soundEnabled default true", c.GameCore.soundEnabled === true);

/* ---------- reportHeight ---------- */
c = makeCore({ bodyHeight: 100 }); c.GameCore.init({});
c.GameCore.reportHeight();
check("reportHeight min clamp 320", c.posted.length === 1 && c.posted[0].height === 320);
c = makeCore({ bodyHeight: 900 }); c.GameCore.init({});
c.GameCore.reportHeight();
check("reportHeight real height", c.posted[0].height === 900 && c.posted[0].type === "lcs-activity-resize");

/* ---------- makeButton ---------- */
c = makeCore({}); c.GameCore.init({});
let scene = makeScene();
let clicked = 0;
let btn = c.GameCore.makeButton(scene, 100, 100, "start", () => clicked++);
check("makeButton returns container", btn instanceof Container);
// simulate a tap
btn.emit("pointerdown");
btn.emit("pointerup");
check("button tap runs onClick", clicked === 1);
check("button label translated", btn.list.some((o) => o instanceof Text && o.text === "Start"));
// language change re-labels the button
c.GameCore.setLanguage("de");
check("button relabels on language change", btn.list.some((o) => o instanceof Text && o.text === "Start"));
c.GameCore.setLanguage("fr");
check("button relabels to Commencer", btn.list.some((o) => o instanceof Text && o.text === "Commencer"));
// destroy removes from keyboard list
btn.destroy();
check("destroyed button pruned", c.GameCore._state.buttons.length === 0);

/* ---------- keyboard ---------- */
scene = makeScene();
let b1 = c.GameCore.makeButton(scene, 10, 10, "start", () => clicked++);
let b2 = c.GameCore.makeButton(scene, 10, 40, "next", () => clicked++);
// Tab should focus the first button; Enter should activate it.
scene.input.keyboard.emit("keydown", { key: "Tab", preventDefault() {} });
check("Tab focuses a button", c.GameCore._state.focusIndex === 0);
scene.input.keyboard.emit("keydown", { key: "Enter", preventDefault() {} });
check("Enter activates focused button", clicked >= 1);

/* ---------- makeLanguagePicker ---------- */
c = makeCore({ search: "?lang=en" }); c.GameCore.init({});
scene = makeScene();
let pick = c.GameCore.makeLanguagePicker(scene, 20, 20);
check("picker returns container", pick instanceof Container);
// find the option pill for "es" by locating its interactive container child.
let optionContainers = pick.list.filter((o) => o instanceof Container && o !== pick);
// header is one container, panel is one container holding pills.
let panel = pick.list.find((o) => o instanceof Container && o.list.some((x) => x instanceof Container));
let pills = panel ? panel.list.filter((o) => o instanceof Container) : [];
check("picker has 11 language pills", pills.length === 11);
// click a pill: the pill containers carry pointerup handlers.
// We cannot know which is "es" directly, so click each until lang changes.
let before = c.GameCore.lang;
pills.forEach((p) => { p.emit("pointerdown"); p.emit("pointerup"); });
check("clicking a pill changes language", c.GameCore.lang !== before);

/* ---------- makeLanguagePicker: header shares one coordinate space ----------
   The header rectangle (Graphics) and the globe+label (Text) must live in a
   single container frame so they move as one unit. Regression guard for the
   bug where the rectangle drew centred on (0,0) while the Text was offset by
   the container's own (headerW/2, headerH/2), throwing them apart. */
function worldOf(rootObj, target) {
  function dfs(node, ax, ay) {
    var nx = ax + (node.x || 0), ny = ay + (node.y || 0);
    if (node === target) return { x: nx, y: ny };
    if (node.list) {
      for (var i = 0; i < node.list.length; i++) {
        var r = dfs(node.list[i], nx, ny);
        if (r) return r;
      }
    }
    return null;
  }
  return dfs(rootObj, 0, 0);
}

c = makeCore({ search: "?lang=en" }); c.GameCore.init({});
scene = makeScene();
var headerPick = c.GameCore.makeLanguagePicker(scene, 20, 20);
var headerBox = headerPick.list.find(function (o) {
  return o instanceof Container &&
    o.list.some(function (x) { return x instanceof Text; }) &&
    o.list.some(function (x) { return x instanceof Graphics; });
});
var hdrText = headerBox && headerBox.list.find(function (x) { return x instanceof Text; });
var hdrBg = headerBox && headerBox.list.find(function (x) { return x instanceof Graphics; });
check("header rectangle and label live in one container",
  !!headerBox && !!hdrBg && !!hdrText);
check("header background drawn from container origin (0,0)",
  !!hdrBg && hdrBg._lastFill && hdrBg._lastFill[0] === 0 && hdrBg._lastFill[1] === 0);
var hw = hdrBg._lastFill[2], hh = hdrBg._lastFill[3];
check("globe+label centred on the rectangle (same frame)",
  hdrText.x === hw / 2 && hdrText.y === hh / 2);
check("rectangle and label are siblings under the header container",
  headerBox.list.indexOf(hdrBg) !== -1 && headerBox.list.indexOf(hdrText) !== -1);
// Move the whole picker: rectangle centre and label must shift by the exact
// same delta (they travel together, nothing drifts outside the box).
var bgCenterBefore = (function (w) { return { x: w.x + hw / 2, y: w.y + hh / 2 }; })(worldOf(headerPick, hdrBg));
var labelBefore = worldOf(headerPick, hdrText);
headerPick.x += 40; headerPick.y += 25;
var bgCenterAfter = (function (w) { return { x: w.x + hw / 2, y: w.y + hh / 2 }; })(worldOf(headerPick, hdrBg));
var labelAfter = worldOf(headerPick, hdrText);
check("rectangle and label move together when the container moves",
  bgCenterAfter.x - bgCenterBefore.x === 40 && bgCenterAfter.y - bgCenterBefore.y === 25 &&
  labelAfter.x - labelBefore.x === 40 && labelAfter.y - labelBefore.y === 25);
check("label stays centred on rectangle after the move",
  Math.abs(labelAfter.x - bgCenterAfter.x) === 0 && Math.abs(labelAfter.y - bgCenterAfter.y) === 0);

/* ---------- makeStartScreen ---------- */
c = makeCore({ search: "?lang=en" }); c.GameCore.init({});
scene = makeScene();
let started = 0;
let ss = c.GameCore.makeStartScreen(scene, "My Game", () => started++);
check("start screen returns start button", !!ss.startButton);
check("start screen shows title", ss.titleText.text === "My Game");
ss.startButton.emit("pointerdown");
ss.startButton.emit("pointerup");
check("start button runs onStart", started === 1);

/* ---------- showPraise ---------- */
scene = makeScene();
let textsBefore = 0;
c.GameCore.showPraise(scene, "great_job");
check("showPraise runs without throwing", true);

/* ---------- makeTile ---------- */
c = makeCore({ search: "?lang=en" }); c.GameCore.init({});
scene = makeScene();
let tapped = 0, tappedApi = null;
let tile = c.GameCore.makeTile(scene, 100, 100, 80, 80, { label: "7", onTap: (a) => { tapped++; tappedApi = a; } });
check("makeTile returns api with container", !!tile && tile.container instanceof Container);
check("makeTile draws the label", tile.container.list.some((o) => o instanceof Text && o.text === "7"));
tile.container.emit("pointerdown"); tile.container.emit("pointerup");
check("tile tap runs onTap with api", tapped === 1 && tappedApi === tile);
check("tile tap takes keyboard focus", tile.focused === true && c.GameCore._state.focusIndex === 0);
tile.setSelected(true);
check("tile setSelected flips state", tile.selected === true);
tile.setLabel("12");
check("tile setLabel updates text", tile.container.list.some((o) => o instanceof Text && o.text === "12"));
tile.setEnabled(false);
tile.container.emit("pointerdown"); tile.container.emit("pointerup");
check("disabled tile ignores taps", tapped === 1);
tile.setEnabled(true);
// keyboard: a second tile, Tab to it, Enter activates it
let tapped2 = 0;
let tile2 = c.GameCore.makeTile(scene, 200, 100, 80, 80, { label: "8", onTap: () => tapped2++ });
check("tiles are keyboard-registered", c.GameCore._state.buttons.length === 2);
scene.input.keyboard.emit("keydown", { key: "Tab", preventDefault() {} });
check("Tab moves focus to the second tile", tile2.focused === true && tile.focused === false);
scene.input.keyboard.emit("keydown", { key: "Enter", preventDefault() {} });
check("Enter taps the focused tile", tapped2 === 1);
// long label shrinks to fit
let wide = c.GameCore.makeTile(scene, 300, 100, 60, 60, { label: "Muodosta sana tavuista" });
let wideText = wide.container.list.find((o) => o instanceof Text);
check("long tile label shrinks to fit", wideText.width <= 60 - 12 || wideText.fontSize === 10);
// destroy drops it from Tab order
wide.destroy();
check("destroyed tile pruned from keyboard list", c.GameCore._state.buttons.indexOf(wide) === -1);
// a tile with no THEME token override uses the surface token (regression guard: never a hex)
let plain = c.GameCore.makeTile(scene, 10, 10, 50, 50, {});
check("tile default fill draws from the origin-centred rect", (function () {
  const g = plain.container.list.find((o) => o instanceof Graphics);
  return g && g._lastFill && g._lastFill[0] === -25 && g._lastFill[2] === 50;
})());

/* ---------- playAnim ---------- */
scene = makeScene();
let captured = null;
scene.tweens.add = (cfg) => { captured = cfg; if (cfg.onComplete) cfg.onComplete(); return { cfg }; };
let done = 0;
let tw = c.GameCore.playAnim(scene, "TARGET", { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "on correct", note: "doc" }, () => done++);
check("playAnim returns a tween", !!tw);
check("playAnim passes targets + tween keys", captured && captured.targets === "TARGET" && captured.scale === 1.12 && captured.duration === 140 && captured.yoyo === true);
check("playAnim strips documentation keys", captured && !("trigger" in captured) && !("note" in captured));
check("playAnim onComplete wired", done === 1);
check("playAnim null spec returns null", c.GameCore.playAnim(scene, "T", null) === null);

/* ---------- tone + setSoundEnabled ---------- */
c = makeCore({ search: "?sound=off" }); c.GameCore.init({});
check("tone silent when ?sound=off", c.GameCore.tone("correct") === false);
c = makeCore({ search: "" }); c.GameCore.init({});
check("tone returns false with no AudioContext", c.GameCore.tone("correct") === false);
// fake AudioContext: count oscillators started
let oscStarted = 0;
function FakeAC() {
  this.currentTime = 0; this.state = "running"; this.destination = {};
  this.createOscillator = () => ({ frequency: {}, connect() {}, start() { oscStarted++; }, stop() {} });
  this.createGain = () => ({ gain: { setValueAtTime() {}, exponentialRampToValueAtTime() {} }, connect() {} });
}
c.ctx.window.AudioContext = FakeAC;
check("tone correct schedules 2 notes", c.GameCore.tone("correct") === true && oscStarted === 2);
oscStarted = 0; c.GameCore.tone("finish");
check("tone finish schedules 3 notes", oscStarted === 3);
oscStarted = 0; c.GameCore.tone("nudge");
check("tone nudge schedules 1 note", oscStarted === 1);
check("setSoundEnabled(false) mutes", c.GameCore.setSoundEnabled(false) === false && c.GameCore.tone("tap") === false && c.GameCore.soundEnabled === false);
check("setSoundEnabled(true) unmutes", c.GameCore.setSoundEnabled(true) === true && c.GameCore.tone("tap") === true);

// pitch step: the i-th note is 2^(i/12) times the base frequency
let freqs = [];
function FakeAC2() {
  this.currentTime = 0; this.state = "running"; this.destination = {};
  this.createOscillator = () => { const o = { frequency: {}, connect() {}, start() { freqs.push(o.frequency.value); }, stop() {} }; return o; };
  this.createGain = () => ({ gain: { setValueAtTime() {}, exponentialRampToValueAtTime() {} }, connect() {} });
}
c = makeCore({ search: "" }); c.GameCore.init({}); c.ctx.window.AudioContext = FakeAC2;
c.GameCore.tone("tap", 0); c.GameCore.tone("tap", 12);
check("tone step raises pitch (12 semitones = double)", freqs.length === 2 && Math.abs(freqs[1] - freqs[0] * 2) < 1e-6);
freqs = []; c.GameCore.tone("tap");
check("tone without step is base pitch", freqs[0] === 440);

/* ---------- LCSArt ---------- */
c = makeCore({}); c.GameCore.init({});
check("LCSArt has the probe entry", c.ctx.LCSArt.has("_probe.dot"));
check("LCSArt.get resolves THEME tokens to hex", /#146B5E/.test(c.ctx.LCSArt.get("_probe.dot")) && !/var\(/.test(c.ctx.LCSArt.get("_probe.dot")));
let threw = false; try { c.ctx.LCSArt.get("nope.nope"); } catch (e) { threw = true; }
check("LCSArt.get throws on an unknown name", threw);
threw = false; try { c.ctx.LCSArt.register("bad", { svg: "<svg></svg>" }); } catch (e) { threw = true; }
check("LCSArt.register refuses an SVG without viewBox", threw);
check("LCSArt.dataUrl encodes", /^data:image\/svg\+xml/.test(c.ctx.LCSArt.dataUrl("<svg viewBox='0 0 1 1'/>")));
check("LCSArt.dataUrl is base64 (Phaser runs atob on every data: URL)", /^data:image\/svg\+xml;base64,[A-Za-z0-9+\/]+=*$/.test(c.ctx.LCSArt.dataUrl("<svg viewBox='0 0 1 1'/>")));
check("LCSArt.dataUrl round-trips UTF-8", Buffer.from(c.ctx.LCSArt.dataUrl("<svg viewBox='0 0 1 1'><title>ä€</title></svg>").split(",")[1], "base64").toString("utf8") === "<svg viewBox='0 0 1 1'><title>ä€</title></svg>");

/* ---------- drawArt ---------- */
scene = makeScene();
const ART = {
  fox:   { kind: "svg", value: c.ctx.LCSArt.get("_probe.dot"), size: 96 },
  berry: { kind: "emoji", value: "X", size: 56 },
  q:     { kind: "text", value: "?", size: 40, font: "display", color: "structure" },
  tile:  { kind: "shape", shape: "roundRect", w: 80, h: 80, fill: "surface", stroke: "line" },
  ring:  { kind: "shape", shape: "circle", r: 18, fill: "structure" },
  tri:   { kind: "shape", shape: "polygon", points: [[0,-10],[10,10],[-10,10]], fill: "accent" }
};
c.GameCore.preloadArt(scene, ART);
check("preloadArt registers only svg entries", scene.loaded.length === 1 && scene.loaded[0].key === "art:fox");
check("preloadArt rasterises at 2x size", scene.loaded[0].cfg.width === 192);
c.GameCore.preloadArt(scene, ART);
check("preloadArt is idempotent", scene.loaded.length === 1);
let im = c.GameCore.drawArt(scene, ART, "fox", 10, 20);
check("drawArt svg -> image at declared size", im.key === "art:fox" && im.dw === 96 && im.x === 10);
let tx = c.GameCore.drawArt(scene, ART, "q", 0, 0);
check("drawArt text -> Text object", tx instanceof Text && tx.text === "?");
let sh = c.GameCore.drawArt(scene, ART, "tile", 0, 0);
check("drawArt roundRect draws fill and stroke", sh instanceof Graphics && sh._lastFill && sh._lastFill[2] === 80);
let ci = c.GameCore.drawArt(scene, ART, "ring", 0, 0);
check("drawArt circle uses fillCircle", ci.calls.includes("fillCircle"));
let pg = c.GameCore.drawArt(scene, ART, "tri", 0, 0);
check("drawArt polygon uses fillPoints", pg.calls.includes("fillPoints"));
threw = false; try { c.GameCore.drawArt(scene, ART, "missing", 0, 0); } catch (e) { threw = true; }
check("drawArt throws on an unknown ART key", threw);

/* ---------- summary ---------- */
console.log("\n" + pass + " passed, " + fail + " failed");
process.exit(fail ? 1 : 0);
