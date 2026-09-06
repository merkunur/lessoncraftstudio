#!/usr/bin/env node
/* art-sheet.js — render `_lib/art.js` entries LARGE, on the real stage colour,
 * so a person can actually look at them.
 *
 *   node games/_tools/art-sheet.js <slug> <entry,entry,...>
 *   node games/_tools/art-sheet.js feed-the-fox fox.idle,fox.think,fox.happy,fox.oops,fox.munch
 *
 * WHY THIS EXISTS. Every runtime gate renders a mascot at roughly 104 logical
 * px, and the visual critic grades those same game screenshots — so on game 001
 * NOBODY EVER LOOKED AT THE ART ITSELF. At that size the fox passed everything.
 * At full size it had two mismatched dangling legs (one thick, one thin with a
 * grey sock against the other's white), a muzzle that read as a lolling tongue,
 * and ears that read as hollow horns. The operator saw it in a single glance.
 *
 * A game screenshot is not an art review. Each entry is drawn here at 48, 96,
 * 192 and 384 px: 48 is the silhouette test (ART-BIBLE §3 — it must still read),
 * 384 is the honesty test (nothing may fall apart when someone leans in).
 *
 * Writes `_qa/<slug>/art-sheet.png`. Read it before the critic pass.
 *
 *   --from=<file.json>   render a {entryName: svgString} map instead of the
 *                        library, so a DRAFT can be judged at 384 before it is
 *                        written into _lib/art.js. Used for the 2026-09-06 fox
 *                        redraw: four drafts were rejected at 384 that every
 *                        gate would have passed.
 */
const fs = require("fs");
const vm = require("vm");
const path = require("path");
const ROOT = path.resolve(__dirname, "..");

const argv = process.argv.slice(2);
const fromArg = argv.find((a) => a.indexOf("--from=") === 0);
const pos = argv.filter((a) => a.indexOf("--") !== 0);
const draft = fromArg ? JSON.parse(fs.readFileSync(path.resolve(process.cwd(), fromArg.slice(7)), "utf8")) : null;
const slug = pos[0];
const names = (pos[1] || (draft ? Object.keys(draft).join(",") : "")).split(",").map((s) => s.trim()).filter(Boolean);
if (!slug || !names.length) {
  console.error("usage: art-sheet.js <slug> <entry,entry,...> [--from=draft.json]");
  process.exit(2);
}

const ctx = { console };
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(ROOT, "_lib/theme.js"), "utf8"), ctx);
vm.runInContext(fs.readFileSync(path.join(ROOT, "_lib/art.js"), "utf8"), ctx);

const has = (n) => (draft ? Object.prototype.hasOwnProperty.call(draft, n) : ctx.LCSArt.has(n));
const entryOf = (n) => (draft ? { w: 96, h: 96 } : ctx.LCSArt.entry(n));
const svgOf = (n) => (draft ? ctx.LCSArt.resolve(draft[n]) : ctx.LCSArt.get(n));
const missing = names.filter((n) => !has(n));
if (missing.length) { console.error("no such entry: " + missing.join(", ")); process.exit(2); }

const SIZES = [48, 96, 192, 384];
/* theme.js declares `const THEME`, and a top-level `const` in a VM context is a
   lexical binding, NOT a property of the context object — so `ctx.THEME` is
   undefined while `ctx.LCSArt` (a `var`) resolves fine. Read it inside. */
const BG = vm.runInContext("THEME.colour.bg.hex", ctx);
const rows = SIZES.map((px) => {
  const cells = names.map((n) => {
    const e = entryOf(n);
    const w = px, h = Math.round(px * (e.h / e.w));
    const svg = svgOf(n).replace("<svg ", `<svg width="${w}" height="${h}" `);
    return `<div style="width:${w}px;height:${h}px;display:flex;align-items:flex-end">${svg}</div>`;
  }).join("");
  return `<section style="display:flex;gap:28px;align-items:flex-end;padding:18px 24px">
    <div style="font:600 13px system-ui;color:#6B6B78;width:44px">${px}px</div>${cells}</section>`;
}).join("");
const labels = `<section style="display:flex;gap:28px;padding:0 24px 18px 24px">
  <div style="width:44px"></div>${names.map((n) => `<div style="width:384px;font:13px system-ui;color:#2A2A35">${n}</div>`).join("")}</section>`;

const html = `<!doctype html><body style="margin:0;background:${BG}">${rows}${labels}</body>`;

(async () => {
  const puppeteer = require("puppeteer");
  const OUT = path.join(ROOT, "_qa", slug);
  fs.mkdirSync(OUT, { recursive: true });
  const file = path.join(OUT, "art-sheet.png");
  const b = await puppeteer.launch({ headless: "new", args: ["--no-sandbox"] });
  const p = await b.newPage();
  await p.setViewport({ width: 140 + names.length * 412, height: 1100, deviceScaleFactor: 2 });
  await p.setContent(html);
  await new Promise((r) => setTimeout(r, 400));
  await p.screenshot({ path: file, fullPage: true });
  await b.close();
  console.log("wrote " + path.relative(ROOT, file) + "  (" + names.length + " entries at " + SIZES.join("/") + "px)");
  console.log("READ IT. 48px is the silhouette test; 384px is the honesty test.");
})();
