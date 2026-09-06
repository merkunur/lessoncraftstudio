#!/usr/bin/env node
/* lint-specs.js — machine checks for every game spec in specs/NNN-slug.md
 *
 * Usage:  node _tools/lint-specs.js            (all specs)
 *         node _tools/lint-specs.js 012 013    (only these numbers)
 *         node _tools/lint-specs.js --file path/to/spec.md   (one file, e.g. a poison spec)
 *
 * Exit 1 when any spec has a FAIL. WARNs never fail the run.
 *
 * What it checks (each is a named rule so a finding is traceable):
 *   H-ORDER    the 13 template headings are present, in order
 *   ID-SLUG    Identity slug is kebab-case and matches the filename
 *   ID-BAND    Age band is one of 5-6 | 6-8 | 8-9
 *   ID-PATTERN Interaction pattern is an id from catalogue/PATTERNS.md
 *   ID-SIZE    Estimated build size is 300-800 lines
 *   EMOJI-REG  emoji characters appear ONLY inside "## Art registry" (the brief's hard rule)
 *   ART-KEYS   every ART.key referenced in the spec is declared in the ART block, and every
 *              declared key is referenced at least once outside the block
 *   THEME-TOK  every THEME.colour.X / THEME.font.X / THEME.size.X / THEME.button.X exists in _lib/theme.js
 *   T-KEYS     every t("key") / GameCore.t("key") exists in _lib/ui-strings.js (en)
 *   RULES      Rules section carries: Item count, Difficulty progression, Adaptation,
 *              correct answer, wrong answer, Retry behaviour, Finish condition
 *   NO-PUNISH  forbidden words: lives, game over, you lose, red X, buzzer, wrong! (as feedback text),
 *              "timer"/"countdown" unless the spec also says "optional" and "justif"
 *   ONE-OBJ    exactly one "- Objective:" line
 *   FINDINGS   at least one F-nn reference (traceability to research/FINDINGS.md), and each exists
 *   CHECKLIST  Testing checklist has the 5 mandatory items (11 languages, narrow width,
 *              keyboard, never auto-starts, no losing state)
 *   STRINGS    Strings section names the t() keys and lists game-specific strings as key + English
 *   SOUND      Sound section mentions sound=off
 *   LEN        spec body is at least 9,000 characters (a thin spec is an under-specified spec; measured in
 *              characters, not lines, because a dense spec packs 12-14k characters into ~140 lines)
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const SPECS = path.join(ROOT, "design", "specs");
const HEADINGS = [
  "## Identity", "## Learning", "## How it plays", "## Art registry", "## Animation registry",
  "## Screen layout", "## Visual specification", "## Content", "## Rules", "## Strings",
  "## Sound", "## Testing checklist"
];

/* ---- reference data ---- */
function readSafe(p) { try { return fs.readFileSync(p, "utf8"); } catch (e) { return ""; } }
const themeSrc = readSafe(path.join(ROOT, "_lib", "theme.js"));
const stringsSrc = readSafe(path.join(ROOT, "_lib", "ui-strings.js"));
const patternsSrc = readSafe(path.join(ROOT, "design", "catalogue", "PATTERNS.md"));
const findingsSrc = readSafe(path.join(ROOT, "design", "research", "FINDINGS.md"));

const THEME_KEYS = new Set();
(function () {
  const sec = (name) => {
    const m = themeSrc.match(new RegExp(name + ":\\s*\\{([\\s\\S]*?)\\n  \\}"));
    if (!m) return;
    for (const k of m[1].matchAll(/^\s*([a-zA-Z0-9_]+)\s*:/gm)) THEME_KEYS.add(name + "." + k[1]);
  };
  ["colour", "font", "size", "button"].forEach(sec);
  ["shadow", "ease"].forEach((k) => THEME_KEYS.add(k));
})();
const T_KEYS = new Set();
(function () {
  const m = stringsSrc.match(/en:\s*\{([\s\S]*?)\n  \},/);
  if (m) for (const k of m[1].matchAll(/([a-z_]+)\s*:\s*"/g)) T_KEYS.add(k[1]);
})();
const PATTERN_IDS = new Set();
for (const m of patternsSrc.matchAll(/^#{2,3}\s+(P\d{1,2})\b/gm)) PATTERN_IDS.add(m[1]);

/* The fourteen mission frames, read from design/MISSIONS.md the same way PATTERN_IDS is read from
   PATTERNS.md. A redesigned spec declares one of these; pattern still says how the finger reaches
   the world. (GAME-DESIGN-LAW.md: frame = the game, pattern = the finger.) */
const missionsSrc = readSafe(path.join(ROOT, "design", "MISSIONS.md"));
const FRAME_NAMES = new Set();
for (const m of missionsSrc.matchAll(/^###\s+FRAME\s+\d+\s+—\s+(.+)$/gm)) FRAME_NAMES.add(m[1].trim());
const FINDING_IDS = new Set();
for (const m of findingsSrc.matchAll(/\bF-(\d{1,3})\b/g)) FINDING_IDS.add("F-" + m[1]);

/* Emoji detection: Extended_Pictographic covers emoji; exclude a few ASCII-ish symbols
   that are legitimately used in prose (©, ®, ™, arrows are not pictographic anyway). */
const EMOJI_RE = /\p{Extended_Pictographic}/u;
const EMOJI_FIND = /\p{Extended_Pictographic}/gu;
const EMOJI_ALLOW = new Set(["©", "®", "™", "‼", "⁉", "ℹ", "↔", "↕", "↖", "↗", "↘", "↙", "↩", "↪", "⌛", "⌚"]);

function lintOne(file) {
  const src = fs.readFileSync(file, "utf8");
  const lines = src.split(/\r?\n/);
  const fails = [], warns = [];
  const F = (rule, msg) => fails.push(rule + ": " + msg);
  const W = (rule, msg) => warns.push(rule + ": " + msg);
  const base = path.basename(file, ".md");
  const numMatch = base.match(/^(\d{3})-(.+)$/);

  /* H-ORDER */
  let last = -1;
  for (const h of HEADINGS) {
    const at = lines.findIndex((l) => l.trim() === h);
    if (at === -1) F("H-ORDER", "missing heading '" + h + "'");
    else if (at < last) F("H-ORDER", "heading out of order '" + h + "'");
    else last = at;
  }
  if (!/^# \d{3} — /m.test(src)) F("H-ORDER", "title line must be '# NNN — Title'");

  /* sections */
  const section = (name) => {
    const i = lines.findIndex((l) => l.trim() === name);
    if (i === -1) return "";
    let j = i + 1;
    while (j < lines.length && !/^## /.test(lines[j])) j++;
    return lines.slice(i + 1, j).join("\n");
  };
  const identity = section("## Identity");
  const art = section("## Art registry");
  const rules = section("## Rules");
  const strings = section("## Strings");
  const sound = section("## Sound");
  const checklist = section("## Testing checklist");
  const learning = section("## Learning");

  /* ID-* */
  const slug = (identity.match(/-\s*Slug:\s*`?([a-z0-9-]+)`?/) || [])[1];
  if (!slug) F("ID-SLUG", "no slug");
  else if (numMatch && slug !== numMatch[2]) F("ID-SLUG", "slug '" + slug + "' != filename '" + numMatch[2] + "'");
  const band = (identity.match(/-\s*Age band:\s*`?(\d-\d)`?/) || [])[1];
  if (!["5-6", "6-8", "8-9"].includes(band)) F("ID-BAND", "band '" + band + "'");
  const pat = (identity.match(/-\s*Interaction pattern:\s*`?(P\d{1,2})\b/) || [])[1];
  if (!pat) F("ID-PATTERN", "no pattern id (expect 'P<n> — name')");
  else if (PATTERN_IDS.size && !PATTERN_IDS.has(pat)) F("ID-PATTERN", pat + " not in PATTERNS.md");
  /* ID-FRAME + MISSION-SCHEMA — a REDESIGNED spec declares a frame from MISSIONS.md and gains two
     headings. CONDITIONAL BY DESIGN: a spec with no "- Frame:" line is a not-yet-redesigned spec and
     is judged by the original schema, so the corpus keeps linting green right through the programme
     instead of turning red on day one and training everyone to ignore it.
     (Operator ruling 2026-09-06 "redesign all 200"; contract in design/GAME-DESIGN-LAW.md.) */
  const frameM = identity.match(/-\s*Frame:\s*`?([A-Z][A-Z ]*[A-Z])`?/);
  if (frameM) {
    const frame = frameM[1].trim();
    if (FRAME_NAMES.size && !FRAME_NAMES.has(frame)) F("ID-FRAME", "frame '" + frame + "' is not a frame in design/MISSIONS.md");
    for (const h of ["## Mission", "## World"]) {
      if (!lines.some((l) => l.trim() === h)) F("MISSION-SCHEMA", "a framed spec must carry the heading '" + h + "'");
    }
    const mission = section("## Mission");
    if (!/single[-\s]state|state variable/i.test(mission)) F("MISSION-SCHEMA", "## Mission must name the single state variable and its two readings (MISSIONS.md 1.1)");
    if (!/isomorph|moving is solving|the move is|transition/i.test(mission)) F("MISSION-SCHEMA", "## Mission must state the isomorphism — how moving IS solving");
    const world = section("## World");
    if (!/zone W|THE WORLD/i.test(world)) F("MISSION-SCHEMA", "## World must lay out zone W per MISSIONS.md 1.4");
    /* The rail is declared in TWO places in a real spec and in neither of them is it called a
       "dot rail": ## Screen layout draws it as circles beside the word "rail", and ## Visual
       specification names ART.dotEmpty. A check that only read one of them, or only looked for the
       phrase, could never fire on an actual file — measured against 120-bar-chart-reader.md, which
       carries it in both. Declaring it in ## Art registry is fine (the Finish screen may keep the
       first-try record); putting it on the PLAY surface is what is banned. */
    const playSurface = section("## Screen layout") + "\n" + section("## Visual specification");
    if (/\bdotEmpty\b|\bdotFull\b/.test(playSurface) || /\brail\b/i.test(playSurface)) {
      F("MISSION-SCHEMA", "a framed spec must not put the dot rail on the play surface (BUILD-CONVENTIONS §6, amended 2026-09-06) — progress is diegetic: the goal is on screen and the distance to it shrinks");
    }
  }

  const size = parseInt((identity.match(/Estimated build size:\s*~?\s*(\d+)/) || [])[1], 10);
  if (!(size >= 300 && size <= 800)) F("ID-SIZE", "estimated size " + size + " (want 300-800)");

  /* EMOJI-REG — emoji allowed only inside the Art registry section */
  const artStart = lines.findIndex((l) => l.trim() === "## Art registry");
  const artEnd = (() => { let j = artStart + 1; while (j < lines.length && !/^## /.test(lines[j])) j++; return j; })();
  lines.forEach((l, i) => {
    if (i > artStart && i < artEnd) return;
    const found = [...l.matchAll(EMOJI_FIND)].map((m) => m[0]).filter((ch) => !EMOJI_ALLOW.has(ch));
    if (found.length) F("EMOJI-REG", "line " + (i + 1) + " has emoji outside the Art registry: " + found.join(" "));
  });

  /* ART-KEYS */
  const declared = new Set();
  for (const m of art.matchAll(/^\s*([a-zA-Z][a-zA-Z0-9_]*)\s*:\s*\{/gm)) declared.add(m[1]);
  const artBlock = art;
  const outside = lines.filter((_, i) => !(i > artStart && i < artEnd)).join("\n");
  const referenced = new Set();
  for (const m of outside.matchAll(/\bART\.([a-zA-Z][a-zA-Z0-9_]*)/g)) referenced.add(m[1]);
  for (const k of referenced) if (!declared.has(k)) F("ART-KEYS", "ART." + k + " used but not declared in the Art registry");
  for (const k of declared) if (!referenced.has(k)) W("ART-KEYS", "ART." + k + " declared but never referenced outside the registry");
  if (declared.size === 0) F("ART-KEYS", "Art registry declares no ART keys");
  if (!/const ART\s*=\s*\{/.test(artBlock)) F("ART-KEYS", "Art registry must contain a 'const ART = {' block");
  if (!/const ANIM\s*=\s*\{/.test(section("## Animation registry"))) F("ANIM", "Animation registry must contain a 'const ANIM = {' block");

  /* THEME-TOK */
  for (const m of src.matchAll(/THEME\.(colour|font|size|button)\.([a-zA-Z0-9_]+)/g)) {
    const key = m[1] + "." + m[2];
    if (THEME_KEYS.size && !THEME_KEYS.has(key)) F("THEME-TOK", "unknown THEME." + key);
  }
  if (!/#[0-9a-fA-F]{6}\b/.test(src)) { /* good: no raw hex */ } else W("THEME-TOK", "raw hex colour present; must be a THEME token in the build");

  /* T-KEYS */
  for (const m of src.matchAll(/\bt\(\s*["']([a-z_]+)["']/g)) {
    if (T_KEYS.size && !T_KEYS.has(m[1])) F("T-KEYS", "t(\"" + m[1] + "\") is not in ui-strings.js");
  }

  /* RULES */
  [["Item count", /Item count/i], ["Difficulty progression", /Difficulty progression/i], ["Adaptation", /Adaptation/i],
   ["correct answer", /correct answer/i], ["wrong answer", /wrong answer/i], ["Retry behaviour", /Retry behaviou?r/i],
   ["Finish condition", /Finish condition/i]].forEach(([n, re]) => { if (!re.test(rules)) F("RULES", "missing '" + n + "'"); });

  /* NO-PUNISH */
  const low = src.toLowerCase();
  [["lives", /\blives\b(?! in| on| at| near| under| with)/], ["game over", /game over/], ["you lose", /you lose/],
   ["red x", /\bred x\b/], ["buzzer", /buzzer(?! \(never)/]].forEach(([n, re]) => {
    const hits = lines.map((l, i) => [l, i]).filter(([l]) => re.test(l.toLowerCase()) && !/never|no |not |forbidden|avoid|without|instead of/i.test(l));
    if (hits.length) F("NO-PUNISH", "'" + n + "' at line " + (hits[0][1] + 1));
  });
  if (/\b(timer|countdown)\b/.test(low) && !(/optional/.test(low) && /justif/.test(low))) F("NO-PUNISH", "timer/countdown mentioned without 'optional' + justification");

  /* ONE-OBJ */
  const objLines = learning.split("\n").filter((l) => /^\s*-\s*Objective:/.test(l));
  if (objLines.length !== 1) F("ONE-OBJ", objLines.length + " Objective lines");

  /* FINDINGS */
  const refs = [...src.matchAll(/\bF-(\d{1,3})\b/g)].map((m) => "F-" + m[1]);
  if (refs.length === 0) F("FINDINGS", "no F-nn reference to research/FINDINGS.md");
  else if (FINDING_IDS.size) refs.forEach((r) => { if (!FINDING_IDS.has(r)) F("FINDINGS", r + " does not exist in FINDINGS.md"); });

  /* CHECKLIST */
  [["11 languages", /11 languages|all eleven|eleven languages/i], ["narrow width", /narrow/i], ["keyboard", /keyboard/i],
   ["never auto-starts", /auto-?start/i], ["no losing state", /losing state|no lose|never lose/i]].forEach(([n, re]) => {
    if (!re.test(checklist)) F("CHECKLIST", "missing '" + n + "'");
  });
  if ((checklist.match(/- \[ \]/g) || []).length < 8) W("CHECKLIST", "fewer than 8 checklist items");

  /* STRINGS */
  if (!/t\(|GameCore\.t/.test(strings)) F("STRINGS", "does not name the GameCore.t() keys used");
  /* SOUND */
  if (!/sound=off/.test(sound)) F("SOUND", "does not mention ?sound=off");
  /* LEN */
  if (src.length < 9000) F("LEN", "only " + src.length + " characters (floor 9000)");

  return { file, fails, warns };
}

/* ---- main ---- */
const args = process.argv.slice(2);
let files = [];
if (args[0] === "--file") files = args.slice(1).map((f) => path.resolve(f));
else {
  const all = fs.existsSync(SPECS) ? fs.readdirSync(SPECS).filter((f) => /^\d{3}-.+\.md$/.test(f)).sort() : [];
  files = (args.length ? all.filter((f) => args.includes(f.slice(0, 3))) : all).map((f) => path.join(SPECS, f));
}
if (!PATTERN_IDS.size) console.log("note: catalogue/PATTERNS.md has no P<n> headings yet — ID-PATTERN membership not enforced");
if (!FINDING_IDS.size) console.log("note: research/FINDINGS.md has no F-nn ids yet — FINDINGS existence not enforced");
let totalFail = 0;
for (const f of files) {
  const r = lintOne(f);
  totalFail += r.fails.length;
  const tag = r.fails.length ? "FAIL" : "PASS";
  console.log(tag + "  " + path.basename(f) + (r.fails.length ? "  (" + r.fails.length + " fail, " + r.warns.length + " warn)" : r.warns.length ? "  (" + r.warns.length + " warn)" : ""));
  r.fails.forEach((m) => console.log("    ✗ " + m));
  r.warns.forEach((m) => console.log("    ~ " + m));
}
console.log("\n" + files.length + " spec(s), " + totalFail + " failure(s)");
process.exit(totalFail ? 1 : 0);
