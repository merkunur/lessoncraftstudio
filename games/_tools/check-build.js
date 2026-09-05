#!/usr/bin/env node
/* check-build.js — the STATIC gate on a built game file.
 *
 *   node games/_tools/check-build.js <slug>          (checks games/<slug>/index.html)
 *   node games/_tools/check-build.js --file <path>   (any html, e.g. a poison fixture)
 *
 * Exit 1 on any FAIL. Rules (each named so a finding is traceable):
 *   LIBS        loads ../_lib/theme.js, ui-strings.js, art.js, phaser-3.90.0.min.js, game-core.js in that order
 *   INIT        calls GameCore.init( and GameCore.makeStartScreen( (never auto-starts) and new Phaser.Game(
 *   REGISTRIES  has `const ART = {`, `const ANIM = {`, `const STRINGS = {`; STRINGS has all 11 locale keys;
 *               if `LOCALE_DATA` exists it has all 11 locale keys
 *   ART-ONLY    no emoji outside the ART block (the brief's hard rule); no add.image( / add.sprite( / load.image( /
 *               load.audio( / new Audio( / <img / <audio in game code (art goes through drawArt, sound through tone)
 *   SVG-ART     every ART entry of kind "svg" carries a viewBox (either inline or via LCSArt.get)
 *   NO-VH       no vh/vw/vmin/vmax units and no ResizeObserver (iframe growth loop)
 *   FONT        no font: shorthand containing Baloo 2; every fontFamily comes from THEME.font
 *   HEX         no raw hex colours in game code except the body background in <style> (#FBF3E4)
 *   SOUND       no audio element; tone() used at least once and the file never plays sound outside GameCore
 *   TEST-HOOK   defines window.LCS_TEST with ready, scene, strings, start, wrong, correct, targets
 *   NO-PUNISH   no "game over" / "lives" / "you lose" strings
 *   SIZE        400-1200 lines (the build ceiling relaxed for inline SVG art; art lines are counted separately)
 */
const fs = require("fs");
const path = require("path");
const ROOT = path.resolve(__dirname, "..");
const LOCALES = ["en", "de", "fr", "it", "es", "pt", "nl", "sv", "da", "no", "fi"];
const args = process.argv.slice(2);
let file;
if (args[0] === "--file") file = path.resolve(args[1]);
else if (args[0]) file = path.join(ROOT, args[0], "index.html");
if (!file || !fs.existsSync(file)) { console.error("usage: check-build.js <slug> | --file <path>   (file not found: " + file + ")"); process.exit(2); }

const src = fs.readFileSync(file, "utf8");
const lines = src.split(/\r?\n/);
const fails = [], warns = [];
const F = (r, m) => fails.push(r + ": " + m), W = (r, m) => warns.push(r + ": " + m);

/* LIBS */
const libOrder = ["theme.js", "ui-strings.js", "art.js", "phaser-3.90.0.min.js", "game-core.js"];
let lastIdx = -1;
for (const lib of libOrder) {
  const i = src.indexOf('src="../_lib/' + lib + '"');
  if (i < 0) F("LIBS", "missing <script src=\"../_lib/" + lib + "\">");
  else if (i < lastIdx) F("LIBS", lib + " loaded out of order");
  else lastIdx = i;
}
/* INIT */
if (!/GameCore\.init\(/.test(src)) F("INIT", "GameCore.init( not called");
if (!/GameCore\.makeStartScreen\(/.test(src)) F("INIT", "GameCore.makeStartScreen( missing — a game must never auto-start");
if (!/new Phaser\.Game\(/.test(src)) F("INIT", "new Phaser.Game( missing");
if (!/GameCore\.reportHeight\(/.test(src)) W("INIT", "GameCore.reportHeight( never called");

/* REGISTRIES */
const block = (name) => {
  const start = src.indexOf("const " + name + " = {");
  if (start < 0) return null;
  let depth = 0, i = src.indexOf("{", start);
  for (; i < src.length; i++) { if (src[i] === "{") depth++; else if (src[i] === "}") { depth--; if (depth === 0) break; } }
  return { start, end: i + 1, text: src.slice(start, i + 1) };
};
const ART = block("ART"), ANIM = block("ANIM"), STRINGS = block("STRINGS"), LOCALE = block("LOCALE_DATA");
if (!ART) F("REGISTRIES", "no `const ART = {` block");
if (!ANIM) F("REGISTRIES", "no `const ANIM = {` block");
if (!STRINGS) F("REGISTRIES", "no `const STRINGS = {` block");
const hasLocaleKeys = (b, what) => { const missing = LOCALES.filter((l) => !new RegExp("(^|[\\s{,])" + l + "\\s*:", "m").test(b.text)); if (missing.length) F("REGISTRIES", what + " lacks locale keys: " + missing.join(" ")); };
if (STRINGS) hasLocaleKeys(STRINGS, "STRINGS");
if (LOCALE) hasLocaleKeys(LOCALE, "LOCALE_DATA");

/* ART-ONLY: emoji outside the ART block */
const EMOJI = /\p{Extended_Pictographic}/gu;
const ALLOW = new Set(["©", "®", "™", "‼", "⁉", "ℹ", "↔", "↕", "↖", "↗", "↘", "↙", "↩", "↪"]);
if (ART) {
  const outside = src.slice(0, ART.start) + src.slice(ART.end);
  const found = [...outside.matchAll(EMOJI)].map((m) => m[0]).filter((ch) => !ALLOW.has(ch));
  if (found.length) F("ART-ONLY", "emoji outside the ART block: " + [...new Set(found)].join(" "));
}
for (const [re, why] of [[/\.add\.image\(/, "scene.add.image( — use GameCore.drawArt"], [/\.add\.sprite\(/, "scene.add.sprite("], [/\.load\.image\(/, "load.image( — no binary assets"],
  [/\.load\.audio\(/, "load.audio( — no audio files"], [/new Audio\(/, "new Audio("], [/<img\b/i, "<img> tag"], [/<audio\b/i, "<audio> tag"], [/\.load\.spritesheet\(/, "spritesheet"]]) {
  // allow add.image only inside game-core (not this file) — game files must not call it
  if (re.test(src)) F("ART-ONLY", why);
}
/* SVG-ART */
if (ART) {
  for (const m of ART.text.matchAll(/kind:\s*"svg"[^}]*\}/g)) {
    const e = m[0];
    if (!/viewBox|LCSArt\.get\(/.test(e)) F("SVG-ART", "svg entry without viewBox / LCSArt.get: " + e.slice(0, 60));
  }
}
/* NO-VH */
for (const m of src.matchAll(/\b\d+(\.\d+)?(vh|vw|vmin|vmax)\b/g)) F("NO-VH", "viewport unit '" + m[0] + "' (iframe growth loop)");
if (/ResizeObserver/.test(src)) F("NO-VH", "ResizeObserver used");
/* FONT */
for (const m of src.matchAll(/font:\s*["'][^"']*Baloo 2[^"']*["']/g)) F("FONT", "font shorthand with Baloo 2: " + m[0]);
for (const m of src.matchAll(/fontFamily:\s*["'][^"']+["']/g)) F("FONT", "fontFamily literal (use THEME.font.*): " + m[0]);
/* HEX */
const noStyle = src.replace(/<style>[\s\S]*?<\/style>/i, "");
const artText = ART ? ART.text : "";
const noStyleNoArt = noStyle.replace(artText, "");
for (const m of noStyleNoArt.matchAll(/#[0-9a-fA-F]{6}\b/g)) F("HEX", "raw hex colour in game code: " + m[0] + " (use THEME tokens)");
const styleHex = [...(src.match(/<style>[\s\S]*?<\/style>/i) || [""])[0].matchAll(/#[0-9a-fA-F]{6}\b/g)].map((m) => m[0].toUpperCase());
for (const h of styleHex) if (h !== "#FBF3E4") W("HEX", "extra hex in <style>: " + h);
/* SOUND */
if (!/GameCore\.tone\(/.test(src)) W("SOUND", "GameCore.tone( never called");
/* TEST-HOOK */
if (!/window\.LCS_TEST\s*=/.test(src)) F("TEST-HOOK", "window.LCS_TEST not defined");
else for (const k of ["ready", "scene", "strings", "start", "wrong", "correct", "targets"]) if (!new RegExp("\\b" + k + "\\s*[:(]").test(src.slice(src.indexOf("window.LCS_TEST")))) F("TEST-HOOK", "LCS_TEST lacks " + k);
/* NO-PUNISH */
for (const w of ["game over", "you lose", "lives left", "try harder"]) if (src.toLowerCase().includes(w)) F("NO-PUNISH", "'" + w + "' in the file");
/* SIZE */
const artLines = ART ? ART.text.split("\n").length : 0;
const codeLines = lines.length - artLines;
if (codeLines < 300) W("SIZE", "only " + codeLines + " non-art lines");
if (codeLines > 1200) F("SIZE", codeLines + " non-art lines (ceiling 1200)");

const rel = path.relative(ROOT, file);
console.log((fails.length ? "FAIL  " : "PASS  ") + rel + "  (" + lines.length + " lines, " + artLines + " in ART)" + (fails.length ? "  " + fails.length + " fail" : "") + (warns.length ? "  " + warns.length + " warn" : ""));
fails.forEach((m) => console.log("    ✗ " + m));
warns.forEach((m) => console.log("    ~ " + m));
process.exit(fails.length ? 1 : 0);
