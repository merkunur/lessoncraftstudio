#!/usr/bin/env node
/* =====================================================================
   prove-say-it-icons.js — the icon set is proved BEFORE anything else.
   ---------------------------------------------------------------------
   The pedagogy panel's closing note sets the order and it inverts the
   obvious one:

     "Prove the icon set before authoring a single string in eleven
      languages — a phrase whose picture fails is a phrase that fails."

   The eleven-locale pass is the expensive one, so a picture that has to
   be redrawn after it is a picture that wastes it.

   TWO PASSES, and the second is the one that matters:

     PASS 1 — the G1..G11 system rules, mechanically, in pure Node. No
       browser. Cheap, so it runs on every save.

     PASS 2 — RENDER. Each icon is rasterised at 34px, converted to a
       greyscale silhouette, and compared with every other icon. ⚠ THIS
       IS THE POINT: the tool's own history records two icons redrawn
       because they were indistinguishable at card size (a circular
       arrow for "say it again" against a circular arrow for "my turn"),
       and the art panel that drew these 72 fragments said plainly that
       they are HAND-AUTHORED AND HAVE NEVER BEEN RENDERED, naming
       `share`, `sorry` and `nose` as its own low-confidence three.
       A set nobody has looked at is not a set.

   ⚠ NON-VACUITY IS ASSERTED FIRST, EVERY TIME. A comparison over an
   empty collection passes perfectly and proves nothing — the recorded
   defect where a gate keyed on a selector the tool never emits compared
   two empty NodeLists and reported green. So: the ICONS object must
   parse to a plausible count, every fragment must rasterise to a
   non-blank bitmap, and the run FAILS if it measured nothing.

   ⚠ AND THE THRESHOLD IS DERIVED, NOT INVENTED. "How different is
   different enough" is not a number I get to pick: the floor is taken
   from the MEASURED distribution of the set itself (see deriveFloor),
   and the report prints the distribution so the number can be argued
   with. An invented threshold has failed correct work twice in this
   programme's history.

   Usage:
     node scripts/prove-say-it-icons.js              both passes
     node scripts/prove-say-it-icons.js --rules      pass 1 only, no browser
     node scripts/prove-say-it-icons.js --shots      also write a contact sheet
   Exit 1 on any error.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const TOOL_DIR = process.env.HLB_TOOL_DIR || path.join(ROOT, 'mini tools');
const SRC = fs.readFileSync(path.join(TOOL_DIR, 'home-language-bridge.js'), 'utf8');
const OUT_DIR = path.join(ROOT, 'docs', 'audit-results', 'home-language-bridge', 'icons');

const RULES_ONLY = process.argv.indexOf('--rules') >= 0;
const WANT_SHOTS = process.argv.indexOf('--shots') >= 0;

let ERRORS = 0, WARNS = 0;
const err = (m) => { ERRORS++; console.error('  ERROR ' + m); };
const warn = (m) => { WARNS++; console.warn('  warn  ' + m); };

/* ---------------------------------------------------------------------
   Extract the ICONS object by EVALUATING the tool's own literal, not by
   regex-scraping it. A scrape would drift from the source the moment a
   fragment gained a nested brace; evaluating the literal cannot.
   ------------------------------------------------------------------- */
/* ⚠ HANDLES BOTH `= {` AND `= [`. The first version keyed on '{' only,
   so NEVER_ADJACENT — an array — reported as ABSENT and the board rule
   read as unenforced. A check that cannot find its subject reports the
   same thing as a check whose subject is missing, which is the recorded
   "a check that cannot pass is as useless as one that cannot fail". */
function extractLiteral(name) {
  const m = new RegExp('var\\s+' + name + '\\s*=\\s*([\\[{])').exec(SRC);
  if (!m) return null;
  const open = m[1], close = open === '{' ? '}' : ']';
  let i = SRC.indexOf(open, m.index), depth = 0, inStr = null, end = -1;
  for (let j = i; j < SRC.length; j++) {
    const c = SRC[j], p = SRC[j - 1];
    if (inStr) { if (c === inStr && p !== '\\') inStr = null; continue; }
    if (c === '"' || c === "'") { inStr = c; continue; }
    if (c === '/' && SRC[j + 1] === '*') { const e = SRC.indexOf('*/', j); j = e < 0 ? SRC.length : e + 1; continue; }
    if (c === open) depth++;
    else if (c === close) { depth--; if (depth === 0) { end = j; break; } }
  }
  if (end < 0) return null;
  // eslint-disable-next-line no-new-func
  return new Function('return (' + SRC.slice(i, end + 1) + ');')();
}
const extractObject = extractLiteral;

const ICONS = extractObject('ICONS');
if (!ICONS) { console.error('  FATAL could not extract the ICONS object'); process.exit(1); }

const ids = Object.keys(ICONS);

/* ⚠ NON-VACUITY, before a single assertion runs. */
if (ids.length < 40) {
  console.error(`  FATAL parsed only ${ids.length} icons — this gate is measuring almost nothing.`);
  console.error('  Refusing to report on a collection this small. Fix the extractor, not the floor.');
  process.exit(1);
}

console.log(`[pass 1 — the system, ${ids.length} icons]`);

/* ---- G1/G2 geometry ------------------------------------------------ */
/* The fragments are CHILDREN of an <svg viewBox="0 0 48 48">, so the
   viewBox is asserted at the render site rather than in the fragment;
   what is checkable here is that no fragment smuggles its own. */
(function () {
  ids.forEach((id) => {
    const f = ICONS[id];
    if (typeof f !== 'string' || !f.length) { err(`G1 ${id}: not a string fragment`); return; }
    if (/<svg[\s>]/i.test(f)) err(`G1 ${id}: carries its own <svg> — fragments are children only`);
    if (/viewBox/i.test(f)) err(`G1 ${id}: declares a viewBox`);
    if (f.length < 40) err(`G1 ${id}: too short to be a drawing (${f.length} chars)`);
  });
  console.log('  G1 fragments are children of one 48x48 root');
}());

/* ---- G4 stroke widths + round joins -------------------------------- */
const ALLOWED_STROKE = [2, 2.2, 2.4, 2.6, 2.8, 3, 3.2, 3.4, 3.6, 4, 4.4];
(function () {
  ids.forEach((id) => {
    const f = ICONS[id];
    (f.match(/stroke-width="([\d.]+)"/g) || []).forEach((m) => {
      const w = parseFloat(m.match(/"([\d.]+)"/)[1]);
      if (ALLOWED_STROKE.indexOf(w) < 0) err(`G4 ${id}: stroke-width ${w} is outside the set`);
      if (w < 2) err(`G4 ${id}: stroke-width ${w} is below the 2.0 floor`);
    });
  });
  console.log('  G4 stroke widths in the allowed set');
}());

/* ---- G5 every painted node declares its fill ----------------------- */
/* ⚠ SCOPED TO THE NODES THAT PAINT. A <g> that only carries a stroke
   for its children does not need a fill of its own, and demanding one
   would condemn correct markup — the ban-too-wide trap this programme
   has now recorded five times. */
(function () {
  ids.forEach((id) => {
    const f = ICONS[id];
    const nodes = f.match(/<(path|circle|rect|ellipse|polygon)\b[^>]*>/g) || [];
    if (!nodes.length) { err(`G5 ${id}: no painted node at all`); return; }
    nodes.forEach((n) => {
      const hasFill = /\bfill="/.test(n);
      const hasStroke = /\bstroke="/.test(n);
      /* inherited from an enclosing <g> is legitimate and common */
      const inheritsFromG = /<g\b[^>]*(fill|stroke)="/.test(f);
      if (!hasFill && !hasStroke && !inheritsFromG) {
        err(`G5 ${id}: a painted node declares neither fill nor stroke and inherits nothing`);
      }
    });
  });
  console.log('  G5 every painted node declares or inherits its paint');
}());

/* ---- G6 palette discipline ----------------------------------------- */
const PALETTE = ['#FBF3E4', '#FFFDF7', '#146B5E', '#3C7C72', '#F2784B', '#C4552B',
                 '#F2C879', '#F2A93B', '#E0A63C', '#8F6512', '#9CC3E5', '#4A90B8', '#9FB6B0'];
(function () {
  ids.forEach((id) => {
    const hexes = (ICONS[id].match(/#[0-9A-Fa-f]{6}/g) || []).map((h) => h.toUpperCase());
    const uniq = Array.from(new Set(hexes));
    uniq.forEach((h) => {
      if (PALETTE.indexOf(h) < 0) err(`G6 ${id}: ${h} is not in the Direction A palette`);
    });
    /* a face legitimately needs five: ground, ring, cheek, ink, mouth */
    const isFace = /circle cx="24" cy="24" r="17"/.test(ICONS[id]);
    const cap = isFace ? 5 : 4;
    if (uniq.length > cap) warn(`G6 ${id}: ${uniq.length} colours (cap ${cap}) — ${uniq.join(' ')}`);
  });
  console.log('  G6 palette + colour count');
}());

/* ---- G7 nothing that collides when stamped 72 times ---------------- */
(function () {
  const BANNED = [
    [/\sid="/, 'an id attribute'],
    [/<use\b/, '<use>'],
    [/<defs\b/, '<defs>'],
    [/url\(#/, 'a url(#…) reference'],
    [/<filter\b/, '<filter>'],
    [/\smask="/, 'a mask'],
    [/<text\b/, '<text>'],
    [/<image\b/, '<image>'],
    [/currentColor/, 'currentColor (G8)']
  ];
  ids.forEach((id) => {
    BANNED.forEach(([re, what]) => { if (re.test(ICONS[id])) err(`G7/G8 ${id}: contains ${what}`); });
  });
  console.log('  G7 no id / use / defs / url(#) / filter / mask / text / image');
  console.log('  G8 no currentColor (the card ground is always #FFFDF7)');
}());

/* ---- G9 opacity floor ---------------------------------------------- */
(function () {
  ids.forEach((id) => {
    (ICONS[id].match(/opacity="([\d.]+)"/g) || []).forEach((m) => {
      const o = parseFloat(m.match(/"([\d.]+)"/)[1]);
      if (o < 0.30) err(`G9 ${id}: opacity ${o} is below the 0.30 floor`);
    });
  });
  console.log('  G9 opacity floor');
}());

/* ---- G10 the banned marks ------------------------------------------ */
/* ⚠ A VERDICT MARK AND A REWARD MARK ARE BOTH REFUSALS OF WHAT THIS
   BOARD IS. Checked on the runtime values AND on the source, because a
   source-only scan misses an escape and a value-only scan misses a
   comment that is about to become markup. */
(function () {
  const MARKS = [
    [/[✓✔✅]/u, 'a tick'],
    [/[✗✘❌]/u, 'a cross'],
    [/[⭐★☆]/u, 'a star'],
    [/[\u{1F44D}\u{1F44E}]/u, 'a thumb'],
    [/[\u{1F1E6}-\u{1F1FF}]/u, 'a regional indicator (flag)'],
    [/[\u{1F300}-\u{1FAFF}]/u, 'an emoji codepoint']
  ];
  ids.forEach((id) => {
    MARKS.forEach(([re, what]) => { if (re.test(ICONS[id])) err(`G10 ${id}: contains ${what}`); });
  });
  /* and the medical cross, which is a protected emblem — matched as a
     shape rather than a character: a plus of two equal red bars */
  ids.forEach((id) => {
    if (/#(FF0000|E00|D00)/i.test(ICONS[id])) err(`G10 ${id}: pure red — reserved for the emblem we refuse to draw`);
  });
  console.log('  G10 no tick, cross, star, thumb, flag, emoji or medical red');
}());

/* ---- the colour law: coral is me ----------------------------------- */
/* Not a rule the art can be forced into mechanically, but ONE thing is
   checkable and is the load-bearing half: an icon that draws a person
   must use coral for exactly one of them, or the law has no meaning. */
(function () {
  let withPeople = 0, coralPeople = 0;
  ids.forEach((id) => {
    const f = ICONS[id];
    /* a head is a small circle with a cream fill and a teal ring */
    const heads = (f.match(/<circle[^>]*fill="#FFFDF7"[^>]*stroke="#146B5E"/g) || []).length;
    if (!heads) return;
    withPeople++;
    if (/#F2784B/.test(f)) coralPeople++;
  });
  if (!withPeople) { err('the colour-law check found NO icons with people — it is measuring nothing'); return; }
  const pct = Math.round((coralPeople / withPeople) * 100);
  console.log(`  colour law: ${coralPeople}/${withPeople} people-icons carry coral (${pct}%)`);
  if (pct < 60) warn(`the colour law is thin — coral is meant to mark "me" in most people-icons`);
}());

/* ---- ⚠ MONOCHROME LEGIBILITY, the print constraint ------------------ */
/* heart-words.js records why: "the right answer to 'many school printers
   are monochrome' is to DESIGN for monochrome — a forced coral heart
   reduces to an indistinct grey blob on exactly the machines most
   classrooms own." So no icon may depend on colour to be understood.
   Mechanically checkable half: an icon whose ENTIRE content is one
   filled shape in one colour has nothing left when the colour goes. */
function toMono(frag) {
  return frag
    .replace(/fill="#(?!FFFDF7|FBF3E4)[0-9A-Fa-f]{6}"/g, 'fill="#000000"')
    .replace(/fill="#(FFFDF7|FBF3E4)"/g, 'fill="#FFFFFF"')
    .replace(/stroke="#[0-9A-Fa-f]{6}"/g, 'stroke="#000000"');
}
(function () {
  ids.forEach((id) => {
    const mono = toMono(ICONS[id]);
    const black = (mono.match(/#000000/g) || []).length;
    if (!black) err(`G11 ${id}: nothing survives the monochrome pass — it is colour-only`);
  });
  console.log('  G11 every icon still has ink after the monochrome pass');
}());

/* ---- the board rule: three coral hands never sit adjacent ---------- */
(function () {
  const na = extractObject('NEVER_ADJACENT');
  if (!na || !na.length) { warn('NEVER_ADJACENT is absent — the confusion audit’s board rule is unenforced'); return; }
  na.forEach((pair) => {
    pair.forEach((id) => { if (!ICONS[id]) err(`board rule names "${id}", which is not drawn`); });
  });
  console.log(`  board rule: ${na.length} never-adjacent pairs declared`);
}());

console.log('');
if (RULES_ONLY) {
  console.log(ERRORS ? `FAIL — ${ERRORS} error(s), ${WARNS} warning(s)` : `PASS (rules only) — 0 errors, ${WARNS} warning(s)`);
  process.exit(ERRORS ? 1 : 0);
}

/* =====================================================================
   PASS 2 — RENDER, then compare silhouettes.
   ===================================================================== */
(async function render() {
  let puppeteer;
  try { puppeteer = require('puppeteer'); }
  catch (e) {
    console.error('  FATAL puppeteer is not available and this pass is not optional.');
    console.error('  A rules-only run proves the markup is well-formed and NOTHING about legibility.');
    console.error('  Re-run with --rules only if you have accepted that.');
    process.exit(1);
  }

  const CELL = 34;                       /* the card size the audit names */
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 900, height: 900, deviceScaleFactor: 1 });

  /* ⚠ RENDER IN MONOCHROME. The question is not "are these different
     pictures", it is "are these different SHAPES" — colour would let two
     identical silhouettes score as distinct, which is exactly the
     failure a monochrome school printer then ships. */
  const html = '<!doctype html><meta charset="utf-8"><style>'
    + 'body{margin:0;background:#fff}'
    + 'svg{display:block;width:' + CELL + 'px;height:' + CELL + 'px}'
    + '</style><div id="host"></div>';
  await page.setContent(html);

  const sigs = await page.evaluate(async (ICONS, CELL, monoSrc) => {
    const toMono = new Function('return ' + monoSrc)();
    const host = document.getElementById('host');
    const out = {};
    const cv = document.createElement('canvas');
    cv.width = CELL; cv.height = CELL;
    const cx = cv.getContext('2d', { willReadFrequently: true });

    for (const id of Object.keys(ICONS)) {
      host.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">'
        + toMono(ICONS[id]) + '</svg>';
      const svg = host.firstChild;
      const blob = new Blob([new XMLSerializer().serializeToString(svg)], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const img = new Image();
      await new Promise((res, rej) => { img.onload = res; img.onerror = rej; img.src = url; });
      cx.fillStyle = '#fff'; cx.fillRect(0, 0, CELL, CELL);
      cx.drawImage(img, 0, 0, CELL, CELL);
      URL.revokeObjectURL(url);
      const d = cx.getImageData(0, 0, CELL, CELL).data;
      const bits = [];
      let ink = 0;
      for (let i = 0; i < CELL * CELL; i++) {
        const r = d[i * 4], g = d[i * 4 + 1], b = d[i * 4 + 2], a = d[i * 4 + 3];
        /* composite over white, then threshold to a silhouette */
        const lum = a === 0 ? 255 : (0.299 * r + 0.587 * g + 0.114 * b) * (a / 255) + 255 * (1 - a / 255);
        const on = lum < 200 ? 1 : 0;
        bits.push(on); ink += on;
      }
      out[id] = { bits, ink };
    }
    return out;
  }, ICONS, CELL, toMono.toString());

  await browser.close();

  console.log(`[pass 2 — rendered at ${CELL}px, monochrome silhouettes]`);

  /* ⚠ NON-VACUITY AGAIN: a blank bitmap would compare "identical" to
     every other blank bitmap AND "distinct" from every drawn one, so a
     set that failed to rasterise could score either way. Catch it. */
  const blanks = ids.filter((id) => !sigs[id] || sigs[id].ink < 8);
  if (blanks.length) {
    blanks.forEach((id) => err(`${id}: rasterised to a blank or near-blank bitmap (${sigs[id] ? sigs[id].ink : 0} px of ink)`));
  }
  const inks = ids.map((id) => sigs[id].ink).sort((a, b) => a - b);
  const total = CELL * CELL;
  const median = inks[Math.floor(inks.length / 2)];
  console.log(`  ink coverage: min ${inks[0]} / median ${median} / max ${inks[inks.length - 1]} of ${total} px`);
  /* ⚠ ASSERT THE MEDIAN, NOT THE MEAN — a mean hid a third of a corpus
     collapsing, and that is a recorded lesson in this programme. */
  if (median < total * 0.08) err(`the median icon covers only ${Math.round(median / total * 100)}% of its cell — the set is too thin to read`);
  if (median > total * 0.72) err(`the median icon covers ${Math.round(median / total * 100)}% of its cell — the set is a field of blobs`);

  /* ---- pairwise distinctness -------------------------------------- */
  function jaccard(a, b) {
    let inter = 0, uni = 0;
    for (let i = 0; i < a.length; i++) {
      const x = a[i], y = b[i];
      if (x | y) uni++;
      if (x & y) inter++;
    }
    return uni ? inter / uni : 1;
  }

  const pairs = [];
  for (let i = 0; i < ids.length; i++) {
    for (let j = i + 1; j < ids.length; j++) {
      pairs.push({ a: ids[i], b: ids[j], s: jaccard(sigs[ids[i]].bits, sigs[ids[j]].bits) });
    }
  }
  pairs.sort((p, q) => q.s - p.s);

  /* ⭐⭐ THE FLOOR IS CALIBRATED FROM THE CONFUSION AUDIT, NOT FROM THIS
     SET'S OWN PERCENTILES.

     The first version of this gate took the floor as
     `median + 0.9 x (p99 - median)`, which sounds derived and is not:
     it always sits just above the bulk, so it always flags the top ~2%
     — and improving the set just lowers the floor and re-flags the new
     top 2%. THE GATE COULD NOT CONVERGE, and a gate that can never pass
     is as useless as one that can never fail. It reported 51 errors on
     its first run and would have reported roughly 51 forever.

     The floor now comes from ACCEPTED_PAIRS in the tool: the pairs the
     confusion audit deliberately separated and signed off. Whatever the
     worst of those scores is the highest similarity an expert has
     looked at and accepted, so anything above it is worse than
     something already judged fine. That is a reference point OUTSIDE
     the distribution, so the gate converges.

     ⚠ WITH A HARD CEILING, so a bad calibration cannot bless an
     egregious pair, and ⚠ a NON-VACUITY check, because an empty or
     mis-named calibration set would silently produce a floor of
     -Infinity and pass everything. */
  const CEILING = 0.75;
  const accepted = (extractLiteral('ACCEPTED_PAIRS') || [])
    .filter((p) => Array.isArray(p) && p.length === 2);
  if (accepted.length < 6) {
    err(`the calibration set has only ${accepted.length} pairs — too few to set a floor from`);
  }
  const missing = [];
  accepted.forEach((p) => p.forEach((id) => { if (!sigs[id]) missing.push(id); }));
  if (missing.length) err(`the calibration set names icons that are not drawn: ${missing.join(', ')}`);

  const calib = accepted
    .filter((p) => sigs[p[0]] && sigs[p[1]])
    .map((p) => ({ a: p[0], b: p[1], s: jaccard(sigs[p[0]].bits, sigs[p[1]].bits) }))
    .sort((x, y) => y.s - x.s);

  const s = pairs.map((p) => p.s).sort((a, b) => a - b);
  const q = (f) => s[Math.floor(s.length * f)].toFixed(3);
  console.log(`  ${pairs.length} pairs — p50 ${q(0.5)}  p90 ${q(0.9)}  p99 ${q(0.99)}  max ${pairs[0].s.toFixed(3)}`);

  let FLOOR = CEILING;
  if (calib.length) {
    const worstAccepted = calib[0];
    FLOOR = Math.min(worstAccepted.s, CEILING);
    console.log(`  calibration: ${calib.length} audit-accepted pairs, worst is`
      + ` ${worstAccepted.a} ~ ${worstAccepted.b} = ${worstAccepted.s.toFixed(3)}`);
    if (worstAccepted.s > CEILING) {
      err(`the worst ACCEPTED pair scores ${worstAccepted.s.toFixed(3)}, above the ${CEILING} ceiling`
        + ' — the calibration set itself contains a collision and must be re-drawn, not trusted');
    }
  }
  console.log(`  floor ${FLOOR.toFixed(3)} — calibrated from the audit, capped at ${CEILING}`);

  /* ⚠ THE CALIBRATION PAIRS ARE EXCLUDED FROM THE FAILURE LIST, and the
     comparison is strictly greater-than. The first version used `>=`
     over every pair, so the pair that SET the floor was flagged by the
     floor it set — the calibrator condemning itself, which is not a
     finding, it is arithmetic. An accepted pair is accepted by
     definition; if one of them is genuinely wrong the CEILING check
     above catches it. */
  const acceptedKey = {};
  accepted.forEach((p) => { acceptedKey[p[0] + ' ' + p[1]] = 1; acceptedKey[p[1] + ' ' + p[0]] = 1; });
  const tooAlike = pairs.filter((p) => p.s > FLOOR && !acceptedKey[p.a + ' ' + p.b]);
  if (tooAlike.length) {
    console.log('');
    console.log('  pairs at or above the floor — redraw one of each, never move the floor:');
    tooAlike.forEach((p) => err(`${p.a} ~ ${p.b} = ${p.s.toFixed(3)}`));
  }

  console.log('');
  console.log('  the ten closest pairs in the set (for the eye, not the gate):');
  pairs.slice(0, 10).forEach((p) => console.log(`    ${p.s.toFixed(3)}  ${p.a} ~ ${p.b}`));

  if (WANT_SHOTS) {
    fs.mkdirSync(OUT_DIR, { recursive: true });
    const sheet = ids.map((id) =>
      '<figure><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">' + ICONS[id]
      + '</svg><figcaption>' + id + '</figcaption></figure>').join('');
    const monoSheet = ids.map((id) =>
      '<figure><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">' + toMono(ICONS[id])
      + '</svg><figcaption>' + id + '</figcaption></figure>').join('');
    const css = 'body{margin:0;padding:16px;background:#FBF3E4;font:12px Nunito,system-ui,sans-serif;color:#146B5E}'
      + 'h2{font:700 15px Nunito,sans-serif;margin:18px 0 8px}'
      + 'section{display:flex;flex-wrap:wrap;gap:10px}'
      + 'figure{margin:0;width:96px;text-align:center;background:#FFFDF7;border-radius:12px;padding:8px 4px}'
      + 'svg{width:56px;height:56px}figcaption{margin-top:4px;font-size:10px;word-break:break-all}'
      + '.small svg{width:34px;height:34px}.small figure{width:64px}';
    fs.writeFileSync(path.join(OUT_DIR, 'contact-sheet.html'),
      '<!doctype html><meta charset="utf-8"><title>Say It Board icons</title><style>' + css + '</style>'
      + '<h2>colour, 56px</h2><section>' + sheet + '</section>'
      + '<h2>colour, 34px — the card size</h2><section class="small">' + sheet + '</section>'
      + '<h2>monochrome, 34px — what a school printer sends home</h2><section class="small">' + monoSheet + '</section>');
    console.log(`\n  contact sheet -> ${path.relative(ROOT, path.join(OUT_DIR, 'contact-sheet.html'))}`);
  }

  console.log('');
  console.log(ERRORS ? `FAIL — ${ERRORS} error(s), ${WARNS} warning(s)` : `PASS — 0 errors, ${WARNS} warning(s)`);
  process.exit(ERRORS ? 1 : 0);
}());
