#!/usr/bin/env node
/*
 * check-mission.js — the SPEC-side gate for the mission redesign (§24, GAME-DESIGN-LAW.md).
 *
 * Usage:  node _tools/check-mission.js              (every FRAMED spec)
 *         node _tools/check-mission.js 120 019      (only these numbers)
 *         node _tools/check-mission.js --file path/to/spec.md
 *
 * Only specs that declare "- Frame:" in ## Identity are checked. A spec without one is a
 * not-yet-redesigned spec and is none of this gate's business — which is why the count of what it
 * actually examined is printed, and why parsing NOTHING is reported as exit 2, never as a pass.
 * (`check-pools.js` established that refusal and it is the only honest behaviour for a gate whose
 * input may legitimately be absent.)
 *
 * WHAT THIS CANNOT SEE, stated so nobody mistakes its silence for coverage:
 *   - whether the commit handler actually reads a POSITION (the Displacement rule). That lives in
 *     code, not prose; it is the build-side gate's job and the reviewer's.
 *   - whether the walk is load-bearing (Test C, the instant-cut). That needs a running game.
 *   - whether the world is legible, or fun.
 * It checks the things a document CAN be wrong about, and it checks them by counting.
 */

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const REPO = path.resolve(ROOT, "..");
const SPECS = path.join(ROOT, "design", "specs");

let fails = 0, warns = 0, checked = 0;
const readSafe = (p) => { try { return fs.readFileSync(p, "utf8"); } catch (e) { return ""; } };

/* The frame names, read from MISSIONS.md the same way lint-specs reads the patterns. */
const FRAME_NAMES = new Set();
for (const m of readSafe(path.join(ROOT, "design", "MISSIONS.md")).matchAll(/^###\s+FRAME\s+\d+\s+—\s+(.+)$/gm)) {
  FRAME_NAMES.add(m[1].trim());
}

/* ── The banned shapes ────────────────────────────────────────────────────────────────────────────
   GAME-DESIGN-LAW.md §3.1: a mission tempts every one of these and each is a losing state wearing a
   hat. The RATCHET RULE is that nothing in the world may ever decay.
   Each pattern is paired with a NEGATION guard, because a spec is expected to SAY "the cart never
   rolls back" — condemning a spec for promising the right thing is the ban-too-wide trap this
   project has bought four times (`Zufallsbeutel`, `par`, "how many cubes tall", `dessinée en
   volume`). The guard is applied to the sentence, not the file. */
const DECAY = [
  [/\bfalls?\s+(?:off|down|back|into)\b/i, "the character falls"],
  [/\bdrowns?\b|\bsinks?\s+(?:below|under)\b/i, "the character drowns or sinks"],
  [/\b(?:gets?|grows?|becomes?)\s+(?:tired|exhausted|weaker)\b/i, "the character tires"],
  [/\bruns?\s+out\s+of\b/i, "something runs out"],
  [/\bcollapses?\b|\bcrumbles?\b|\btopples?\b/i, "a built thing collapses"],
  [/\b(?:loses?|drops?|forfeits?)\s+(?:a|the|one|its|their)\s+\w+/i, "something already earned is lost"],
  [/\btaken\s+back\b|\btakes?\s+it\s+back\b/i, "something is taken back"],
  [/\bempties\b|\bdrains?\b|\bdepletes?\b/i, "a meter empties"],
  [/\bmoves?\s+(?:further|farther)\s+away\b/i, "the goal moves away"],
  [/\bcloses?\s+behind\b/i, "a path closes behind you"],
  [/\bstarts?\s+(?:over|again from)\b|\bresets?\s+to\s+the\s+start\b/i, "progress resets"],
];
const NEGATED = /\b(?:never|not|no|cannot|can't|without|instead of|rather than|must not|may not|nothing)\b/i;

/* The character is never the consequence (§3). An error changes the APPARATUS. */
const CHARACTER_HURT = [
  [/\bsad\b|\bcries\b|\bcrying\b|\bfrowns?\b|\bupset\b|\bdisappointed\b/i, "the character is sad"],
  [/\bangry\b|\bcross\b|\bscolds?\b|\btells? (?:them|the child) off\b/i, "the character disapproves"],
  [/\bhurts?\b|\binjur\w*\b|\bbumps? (?:its|their) head\b/i, "the character is hurt"],
];

function sentences(text) {
  return text.split(/(?<=[.;:!?])\s+|\n/).filter((s) => s.trim().length);
}

function sectionOf(src, heading) {
  const lines = src.split(/\r?\n/);
  const at = lines.findIndex((l) => l.trim() === heading);
  if (at < 0) return "";
  const out = [];
  for (let i = at + 1; i < lines.length; i++) {
    if (/^##\s/.test(lines[i])) break;
    out.push(lines[i]);
  }
  return out.join("\n");
}

/* Count the numbered misconceptions under ## Learning. The corpus writes them as a numbered list of
   bolded errors, each followed by "Response:". Counting the RESPONSES is the honest measure — the
   promise is that every named error still gets an enacted answer. */
/* ⚠ MEASURED DEFECT, fixed here: the first version returned Math.max(responses, numbered), and a
   max() MASKS the loss it exists to catch. Poison-tested on 199 — deleting one "Response:" left the
   numbered list at 5, so the gate reported "5 → 5" and passed a spec that had just dropped an
   enacted correction. The two counts are different promises and are compared SEPARATELY:
     numbered  = every misconception is still NAMED
     responses = every named misconception still gets an ENACTED answer
   Losing either is losing the thing the corpus is actually worth. */
function countMisconceptions(src) {
  const learning = sectionOf(src, "## Learning");
  const responses = (learning.match(/\bResponse:/g) || []).length;
  const numbered = (learning.match(/^\s{0,3}\d+\.\s+\*\*/gm) || []).length;
  return { responses, numbered };
}

function originalFromGit(rel) {
  try {
    return execFileSync("git", ["-C", REPO, "show", "HEAD:" + rel], { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] });
  } catch (e) { return null; }
}

function check(file) {
  const src = readSafe(file);
  const base = path.basename(file);
  const identity = sectionOf(src, "## Identity");
  const frameM = identity.match(/-\s*Frame:\s*`?([^\n`]+?)`?\s*$/m);
  if (!frameM) return false; /* not a redesigned spec — not this gate's business */
  checked++;

  const bad = [];
  const F = (rule, msg) => { bad.push("  ✗ " + rule + ": " + msg); fails++; };
  const W = (rule, msg) => { bad.push("  ⚠ " + rule + ": " + msg); warns++; };

  const frame = frameM[1].trim();
  if (FRAME_NAMES.size && !FRAME_NAMES.has(frame)) {
    F("FRAME", "'" + frame + "' is not a frame in design/MISSIONS.md");
  }

  /* ── the mission is declared, and declares the thing that makes it a game ── */
  const mission = sectionOf(src, "## Mission");
  const world = sectionOf(src, "## World");
  if (!mission.trim()) F("SCHEMA", "no ## Mission section");
  if (!world.trim()) F("SCHEMA", "no ## World section");
  if (mission && !/single[-\s]state|state variable|\bS\b\s*(?:=|is|:)/i.test(mission)) {
    F("SINGLE-STATE", "## Mission never names the single state variable (MISSIONS.md §1.1)");
  }
  if (mission && !/(mathematic\w*|numeric\w*)[\s\S]{0,120}?(physic\w*|world)|physic\w*[\s\S]{0,120}?mathematic\w*/i.test(mission)) {
    W("SINGLE-STATE", "## Mission does not visibly give BOTH readings of the state (mathematical and physical)");
  }
  if (mission && !/isomorph|moving is solving|the move is|is the height|is the distance|is the position/i.test(mission)) {
    F("ISOMORPHISM", "## Mission never states the isomorphism — how moving IS solving");
  }
  if (world && !/zone\s*W/i.test(world)) F("WORLD", "## World does not lay out zone W (MISSIONS.md §1.4)");

  /* ── the dot rail is off the play surface ── */
  const play = sectionOf(src, "## Screen layout") + "\n" + sectionOf(src, "## Visual specification");
  if (/\bdotEmpty\b|\bdotFull\b/.test(play) || /\brail\b/i.test(play)) {
    F("NO-RAIL", "the dot rail is still on the play surface — progress must be diegetic (BUILD-CONVENTIONS §6, amended)");
  }

  /* ── the ratchet rule, and the banned losing-states-in-costume ── */
  const body = src.replace(/^#.*$/m, "");
  for (const s of sentences(body)) {
    if (NEGATED.test(s)) continue; /* a spec promising the right thing is not a violation */
    for (const [re, what] of DECAY) {
      if (re.test(s)) { F("RATCHET", what + " — \"" + s.trim().slice(0, 96) + "\""); break; }
    }
  }

  /* ── the character is never the consequence ── */
  for (const s of sentences(body)) {
    if (NEGATED.test(s)) continue;
    for (const [re, what] of CHARACTER_HURT) {
      if (re.test(s)) { F("CHARACTER", what + " — an error changes the APPARATUS, never the creature — \"" + s.trim().slice(0, 84) + "\""); break; }
    }
  }

  /* ── the pedagogy did not get thinner: count against the committed original ── */
  const rel = "games/design/specs/" + base;
  const orig = originalFromGit(rel);
  const now = countMisconceptions(src);
  if (orig) {
    const was = countMisconceptions(orig);
    let fell = false;
    if (now.numbered < was.numbered) {
      F("MISCONCEPTIONS", "the number of NAMED misconceptions fell from " + was.numbered + " to " + now.numbered +
        " — the diagnosis is invariant even though the choreography is re-authored (GAME-DESIGN-LAW §3.0)");
      fell = true;
    }
    if (now.responses < was.responses) {
      F("MISCONCEPTIONS", "the number of ENACTED responses fell from " + was.responses + " to " + now.responses +
        " — a misconception that is named but no longer answered has been silently dropped");
      fell = true;
    }
    if (!fell) bad.push("  · misconceptions named " + was.numbered + " → " + now.numbered + ", enacted " + was.responses + " → " + now.responses);
  } else {
    W("MISCONCEPTIONS", "no committed original to compare against (new spec?) — named " + now.numbered + ", enacted " + now.responses);
  }
  if (now.responses < 4) W("MISCONCEPTIONS", "only " + now.responses + " enacted responses; the band floor is 4");

  /* ── the anti-brute-force guard has to be NAMED, because the old one is now impossible ── */
  const rules = sectionOf(src, "## Rules");
  if (rules && !/brute|guess\w*|one-way|cannot be tried|re-?shuffl|varies per item|never counts as first-try/i.test(rules)) {
    W("BRUTE-FORCE", "## Rules names no anti-guessing guard. P1's tile re-shuffle is impossible in a persistent world (a station that jumps when you knock on it destroys the world's constancy), so a replacement must be stated.");
  }

  if (bad.length) {
    console.log((fails ? "" : "") + base + "  [" + frame + "]");
    bad.forEach((b) => console.log(b));
  } else {
    console.log("PASS  " + base + "  [" + frame + "]");
  }
  return true;
}

const args = process.argv.slice(2);
let files = [];
const fileIdx = args.indexOf("--file");
if (fileIdx >= 0) {
  files = [args[fileIdx + 1]];
} else {
  const nums = args.filter((a) => /^\d{3}$/.test(a));
  files = fs.readdirSync(SPECS).filter((f) => /^\d{3}-.*\.md$/.test(f))
    .filter((f) => !nums.length || nums.includes(f.slice(0, 3)))
    .map((f) => path.join(SPECS, f));
}

for (const f of files) check(f);

console.log("");
if (!checked) {
  console.log("no FRAMED specs found (no '- Frame:' line in ## Identity) — nothing was checked, which is NOT a pass");
  process.exit(2);
}
console.log(checked + " framed spec(s), " + fails + " failure(s), " + warns + " warning(s)");
process.exit(fails ? 1 : 0);
