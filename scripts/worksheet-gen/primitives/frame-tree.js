/**
 * frame-tree.js — the OPEN family-tree template of K-370 `family` F5
 * (G1-387 "Family Tree Template"; design docs/worksheet-gen/b5-designs/K-370-family.md
 * §3 F5, design B's frame tree). Pure SVG on the tokens, Node-testable.
 *
 *   frameTree({ meWord, w = 675, shelf = 4 }) -> { treeSvg, shelfSvg, treeH, shelfH, mats, smalls, lines, shelfLines, branches, plate, cords, leafBoxes }
 *
 * A tree drawn as a TEAL OUTLINE on cream (no canopy fill): a tapered trunk up
 * a central corridor, a main bough across, two upper limbs rising through the
 * gaps between the top-tier frames into an arched crown bough, and one low
 * branch. Nine EMPTY picture mats hang by two-line cords (teal 1.5) from the
 * boughs — mat shapes cycle oval, rect, round, arch (every mat's drawing area
 * >= 96 x 96) — each over a 130 x 44 name line (school lines, no text). The
 * `me` mat stands ON the trunk; under it the ONLY printed word on the page, the
 * locale's meWord, on a small plate. Below the tree, in its OWN svg (the page puts a
 * flexible gap between the two — the FILL rule): a shelf line with `shelf` small empty
 * mats (84 x 84) standing on it, each over a short name line. Curved tapered limbs
 * (quadratic, sampled; data-lcs-pts carries the centre line the gate walks) and
 * tealSoft leaf clusters (each stamped with its box; gated clear of every mat / line).
 *
 * THE RULE (lead ruling): no couple bar, no descent line, no rows, no kin
 * label, no connector between two mats — a child in care, with one parent, two
 * mothers, two fathers, grandparents, step-family or friends fills the same
 * frames without meeting a wrong box. The gate (qa/verify-b5-family.js F5 +
 * the spec's verify()) measures it on the render: >= 12 empty mats, no line
 * whose two ends touch two different mats (PR6), no branch through a mat or a
 * name line, the only text = meWord.
 *
 * Geometry (design coordinates are in a 639-wide field; the stage is `w` wide
 * with the field centred, offset (w - 639) / 2). The design's tier y-values
 * were re-laid so the branches can reach every hook without crossing a mat
 * (measured: the design's straight trunk-to-hook branches cross tier-2 mats);
 * every tier keeps its x-columns:
 *   tier 1  mats x 120 / 320 / 520, y 18..114   lines y 118..162   (hooks at the crown bough)
 *   main bough y ~168..178, x 32..608 through the trunk top
 *   tier 2  mats x 90 / 230 / 410 / 550, y 188..284   lines y 288..332
 *   low branch (right) y ~338..346, x 332..604
 *   tier 3  me mat x 320 ON the trunk y 356..452 + the meWord plate 458..488 ;
 *           free mat x 530 y 356..452, line 456..500
 *   ground y 510 ; treeH 520
 *   upper limbs x 220 / 420 (the gaps between the tier-1 name lines 185..255 / 385..455)
 * Stamps: mats [data-lcs-mat][data-lcs-shape] (+ [data-lcs-me-mat] on the me
 * mat), name lines [data-lcs-nameline] (<svg> from primitives/trace-path.js
 * writingRow), branches [data-lcs-branch] (filled tapered polygons), the trunk
 * [data-lcs-trunk], cords [data-lcs-cord], the plate [data-lcs-me] (its <text>
 * is the page's only text), the shelf [data-lcs-shelf].
 */
'use strict';
const tokens = require('./_tokens.js');
const { writingRow } = require('./trace-path.js');
const { esc } = require('./_svg.js');

const T = tokens.color;
const F = tokens.font;
const FIELD = 639;
const MAT_W = 104, MAT_H = 96, LINE_W = 130, LINE_H = 44, LINE_GAP = 4;
const SHAPES = ['oval', 'rect', 'round', 'arch'];
const TREE_H = 520, GROUND_Y = 510;
const SMALL = 84, SMALL_LINE_W = 110, SHELF_LINE_Y_PAD = 4;

const S = (v) => +(+v).toFixed(2);

/** a mat: shape outline, white, teal 3; cx / top in stage coordinates */
function matSvg({ cx, top, w, h, shape, attrs = '' }) {
  const x = cx - w / 2;
  const common = `fill="${T.white}" stroke="${T.teal}" stroke-width="3" data-lcs-mat="" data-lcs-shape="${shape}" data-lcs-box="${S(x)},${S(top)},${w},${h}"${attrs}`;
  if (shape === 'oval') return `<ellipse cx="${S(cx)}" cy="${S(top + h / 2)}" rx="${S(w / 2)}" ry="${S(h / 2)}" ${common}/>`;
  if (shape === 'round') { const r = Math.min(w, h) / 2; return `<circle cx="${S(cx)}" cy="${S(top + h / 2)}" r="${S(r)}" ${common}/>`; }
  if (shape === 'arch') {
    const r = w / 2;
    return `<path d="M ${S(x)} ${S(top + h)} L ${S(x)} ${S(top + r)} A ${S(r)} ${S(r)} 0 0 1 ${S(x + w)} ${S(top + r)} L ${S(x + w)} ${S(top + h)} Z" stroke-linejoin="round" ${common}/>`;
  }
  return `<rect x="${S(x)}" y="${S(top)}" width="${w}" height="${h}" rx="8" ry="8" ${common}/>`;
}

/** the mat's own drawing box (the gate's geometry; a round mat is its circle's box) */
function matBox(shape, cx, top, w, h) {
  if (shape === 'round') { const r = Math.min(w, h) / 2; return { x: cx - r, y: top + h / 2 - r, w: 2 * r, h: 2 * r }; }
  return { x: cx - w / 2, y: top, w, h };
}

/** a curved tapered branch: a quadratic from p0 through control c to p1, width w0 -> w1, as a filled polygon;
 *  pts = the sampled centre line [x, y, w] (the gate walks it) */
function qcurve(p0, c, p1, w0, w1, n = 24) {
  const pts = [];
  for (let i = 0; i <= n; i++) {
    const t = i / n, u = 1 - t;
    pts.push([u * u * p0[0] + 2 * t * u * c[0] + t * t * p1[0], u * u * p0[1] + 2 * t * u * c[1] + t * t * p1[1], w0 + (w1 - w0) * t]);
  }
  const L = [], R = [];
  for (let i = 0; i <= n; i++) {
    const a = pts[Math.max(0, i - 1)], b = pts[Math.min(n, i + 1)];
    const dx = b[0] - a[0], dy = b[1] - a[1], len = Math.hypot(dx, dy) || 1;
    const nx = -dy / len, ny = dx / len, h = pts[i][2] / 2;
    L.push([pts[i][0] + nx * h, pts[i][1] + ny * h]); R.push([pts[i][0] - nx * h, pts[i][1] - ny * h]);
  }
  const ring = [...L, ...R.reverse()];
  return { d: 'M ' + ring.map((q) => `${S(q[0])} ${S(q[1])}`).join(' L ') + ' Z', pts };
}
/** the centre-line y of a sampled branch at x (linear between samples) */
function yAt(pts, x) {
  const s = pts.slice().sort((a, b) => a[0] - b[0]);
  for (let i = 1; i < s.length; i++) if (x >= s[i - 1][0] && x <= s[i][0]) { const t = (x - s[i - 1][0]) / ((s[i][0] - s[i - 1][0]) || 1); return s[i - 1][1] + (s[i][1] - s[i - 1][1]) * t; }
  throw new Error('frameTree: no branch over x ' + x);
}

function frameTree({ meWord, w = 675, shelf = 4 } = {}) {
  if (!meWord || !String(meWord).trim()) throw new Error('frameTree: no meWord (the one printed label)');
  if (w < FIELD) throw new Error(`frameTree: stage ${w} < the ${FIELD} field`);
  const ox = (w - FIELD) / 2;
  const X = (x) => ox + x;
  const mats = [], lines = [], branches = [], cords = [];
  let shapeI = 0;
  const hang = (cx, top, hookY, withLine = true) => {
    const shape = SHAPES[shapeI++ % SHAPES.length];
    mats.push({ cx: X(cx), top, w: MAT_W, h: MAT_H, shape, box: matBox(shape, X(cx), top, MAT_W, MAT_H) });
    if (hookY != null) {
      // each cord lands ON the mat's outline 26 px either side of centre (measured per shape, not guessed)
      const dy = shape === 'oval' ? MAT_H / 2 - (MAT_H / 2) * Math.sqrt(1 - Math.pow(26 / (MAT_W / 2), 2))
        : shape === 'round' ? MAT_H / 2 - Math.sqrt(Math.pow(Math.min(MAT_W, MAT_H) / 2, 2) - 26 * 26)
          : shape === 'arch' ? MAT_W / 2 - Math.sqrt(Math.pow(MAT_W / 2, 2) - 26 * 26) : 0;
      cords.push([X(cx), hookY, X(cx - 26), top + dy]);
      cords.push([X(cx), hookY, X(cx + 26), top + dy]);
    }
    if (withLine) lines.push({ x: X(cx) - LINE_W / 2, y: top + MAT_H + LINE_GAP, w: LINE_W, h: LINE_H });
  };
  /* ---- the tree body (organic: a flared trunk, curved tapered limbs, leaf clusters) */
  const trunk = `M ${S(X(262))} ${GROUND_Y} Q ${S(X(292))} ${GROUND_Y - 8} ${S(X(294))} 470 L ${S(X(308))} 170 L ${S(X(332))} 170 L ${S(X(346))} 470 Q ${S(X(348))} ${GROUND_Y - 8} ${S(X(378))} ${GROUND_Y} Z`;
  const bark = `<path d="M ${S(X(312))} 300 q -4 60 2 120" fill="none" stroke="${T.teal}" stroke-width="1.5" stroke-linecap="round"/>` +
    `<path d="M ${S(X(328))} 250 q 4 50 -1 100" fill="none" stroke="${T.teal}" stroke-width="1.5" stroke-linecap="round"/>`;
  const P = (x, y) => [X(x), y];
  const boughL = qcurve(P(320, 174), P(170, 178), P(18, 164), 12, 4);
  const boughR = qcurve(P(320, 174), P(470, 178), P(622, 164), 12, 4);
  const riserL = qcurve(P(262, 172), P(220, 168), P(218, 10), 10, 6);
  const riserR = qcurve(P(378, 172), P(420, 168), P(422, 10), 10, 6);
  const crownL = qcurve(P(218, 10), P(140, 2), P(62, 16), 7, 4);
  const crownM = qcurve(P(218, 10), P(320, -2), P(422, 10), 7, 7);
  const crownR = qcurve(P(422, 10), P(500, 2), P(578, 16), 7, 4);
  const low = qcurve(P(334, 344), P(470, 350), P(612, 340), 9, 4);
  // review round 1: the old bare twig (300,498 -> 196,452) carried no frame and read as a MISSING frame; the left
  // low branch now mirrors the right one and holds a mat, so every branch bears weight (gated: no orphan branch)
  const lowL = qcurve(P(306, 344), P(170, 350), P(28, 340), 9, 4);
  branches.push(boughL, boughR, riserL, riserR, crownL, crownM, crownR, low, lowL);
  const crownY = (x) => yAt([...crownL.pts, ...crownM.pts, ...crownR.pts], X(x));
  /* ---- the frames */
  for (const cx of [120, 320, 520]) hang(cx, 18, crownY(cx));
  for (const cx of [90, 230, 410, 550]) hang(cx, 188, yAt([...boughL.pts, ...boughR.pts], X(cx)));
  // tier 3: the me mat ON the trunk (no hook; it stands on the trunk) + one free mat on the low branch
  shapeI = 1;   // the me mat is a rect (a clean frame behind the one label)
  const meTop = 356;
  mats.push({ cx: X(320), top: meTop, w: MAT_W, h: MAT_H, shape: 'rect', me: true, box: matBox('rect', X(320), meTop, MAT_W, MAT_H) });
  shapeI = 2;
  hang(530, 356, yAt(low.pts, X(530)));
  shapeI = 3;
  hang(110, 356, yAt(lowL.pts, X(110)));
  // the me mat's OWN name line (one line per frame): ONE white plate under the me mat, "me | ____"
  const ME_LINE_W = 110;
  const mePlateW = Math.max(72, 18 + 12 * [...String(meWord)].length);
  const meX0 = X(320) - (mePlateW + ME_LINE_W + 8) / 2;
  lines.push({ x: meX0 + mePlateW + 4, y: meTop + MAT_H + LINE_GAP, w: ME_LINE_W, h: LINE_H, me: true });
  /* ---- the plate (the ONE label) */
  const plateW = mePlateW;
  // the plate: the WHOLE "me | ____" card (white, teal), the meWord in its left part, the name line in its right part
  const plate = { x: meX0, y: meTop + MAT_H + LINE_GAP - 2, w: mePlateW + ME_LINE_W + 8, h: LINE_H + 4, textW: plateW };
  /* ---- leaf clusters (tealSoft almonds, teal outline; each placed clear of every mat / line — gated) */
  const leafBoxes = [];
  const leafPath = (bx, by, rot, len = 26, wid = 11) => {
    // a leaf grows FROM its base (bx, by) along `rot`: base -> tip, two quadratic sides
    const a = rot * Math.PI / 180, ca = Math.cos(a), sa = Math.sin(a);
    const pt = (u, v) => [bx + u * ca - v * sa, by + u * sa + v * ca];
    const ring = [pt(0, 0), pt(len / 2, -wid), pt(len, 0), pt(len / 2, wid)];
    const xs = ring.map((q) => q[0]), ys = ring.map((q) => q[1]);
    const box = { x: Math.min(...xs), y: Math.min(...ys), w: Math.max(...xs) - Math.min(...xs), h: Math.max(...ys) - Math.min(...ys) };
    leafBoxes.push(box);
    const P2 = (q) => `${S(q[0])} ${S(q[1])}`;
    return `<path d="M ${P2(ring[0])} Q ${P2(ring[1])} ${P2(ring[2])} Q ${P2(ring[3])} ${P2(ring[0])} Z" fill="${T.tealSoft}" stroke="${T.teal}" stroke-width="1.5" stroke-linejoin="round" data-lcs-leaf="" data-lcs-box="${S(box.x)},${S(box.y)},${S(box.w)},${S(box.h)}"/>` +
      `<path d="M ${P2(pt(2, 0))} L ${P2(pt(len - 5, 0))}" fill="none" stroke="${T.teal}" stroke-width="1"/>`;
  };
  const cluster = (cx, cy, base) => [leafPath(X(cx), cy, base - 40), leafPath(X(cx), cy, base + 40), leafPath(X(cx), cy, base)].join('');
  const leaves = [cluster(16, 164, 190), cluster(624, 164, -10), cluster(60, 16, 200), cluster(580, 16, -20),
    cluster(198, 44, 250), cluster(442, 44, -70), cluster(612, 340, 60), cluster(28, 340, 120)];

  /* ---- the shelf (its OWN svg: the page puts a flexible gap between tree and shelf — the FILL rule) */
  const shelfY = SMALL + 2;              // the shelf line the small mats stand on
  const smalls = [], shelfLines = [];
  for (let i = 0; i < shelf; i++) {
    const cx = X(FIELD * (i + 1) / (shelf + 1));
    const shape = SHAPES[(i + 1) % SHAPES.length];
    smalls.push({ cx, top: 2, w: SMALL, h: SMALL, shape, small: true, box: matBox(shape, cx, 2, SMALL, SMALL) });
    shelfLines.push({ x: cx - SMALL_LINE_W / 2, y: shelfY + SHELF_LINE_Y_PAD + 4, w: SMALL_LINE_W, h: LINE_H, small: true });
  }
  const shelfH = shelfY + SHELF_LINE_Y_PAD + 4 + LINE_H;

  /* ---- markup */
  const nameLines = (ls) => ls.map((l) => writingRow({ w: l.w, h: l.h, glyphH: 22 }).svg.replace('<svg ', `<svg x="${S(l.x)}" y="${S(l.y)}" data-lcs-nameline=""${l.me ? ' data-lcs-me-line=""' : ''} `)).join('');
  const parts = [];
  parts.push(`<path d="${trunk}" fill="${T.creamDeep}" stroke="${T.teal}" stroke-width="3" stroke-linejoin="round" data-lcs-trunk=""/>` + bark);
  for (const b of branches) parts.push(`<path d="${b.d}" fill="${T.teal}" stroke="${T.teal}" stroke-width="1" stroke-linejoin="round" data-lcs-branch="" data-lcs-pts="${b.pts.map((q) => S(q[0]) + ',' + S(q[1]) + ',' + S(q[2])).join(';')}"/>`);
  parts.push(...leaves);
  parts.push(`<line x1="0" y1="${GROUND_Y}" x2="${w}" y2="${GROUND_Y}" stroke="${T.teal}" stroke-width="3" stroke-linecap="round" data-lcs-ground=""/>`);
  for (const c of cords) parts.push(`<line x1="${S(c[0])}" y1="${S(c[1])}" x2="${S(c[2])}" y2="${S(c[3])}" stroke="${T.teal}" stroke-width="1.5" stroke-linecap="round" data-lcs-cord=""/>`);
  for (const m of mats) parts.push(matSvg({ cx: m.cx, top: m.top, w: m.w, h: m.h, shape: m.shape, attrs: m.me ? ' data-lcs-me-mat=""' : '' }));
  parts.push(`<rect x="${S(plate.x)}" y="${S(plate.y)}" width="${plate.w}" height="${plate.h}" rx="14" ry="14" fill="${T.white}" stroke="${T.teal}" stroke-width="2.5" data-lcs-me=""/>` +
    `<text x="${S(plate.x + plate.textW / 2)}" y="${S(plate.y + plate.h / 2 + 0.5)}" font-family="${F.display}, cursive" font-size="20" font-weight="700" fill="${T.ink}" text-anchor="middle" dominant-baseline="central" data-lcs-me-text="">${esc(meWord)}</text>`);
  parts.push(nameLines(lines));
  const treeSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${TREE_H}" viewBox="0 0 ${w} ${TREE_H}" role="img" aria-label="" style="display:block;overflow:visible" data-lcs-frame-tree="">${parts.join('')}</svg>`;
  const shelfParts = [`<line x1="${S(X(12))}" y1="${shelfY}" x2="${S(X(FIELD - 12))}" y2="${shelfY}" stroke="${T.teal}" stroke-width="3" stroke-linecap="round" data-lcs-shelf=""/>`];
  for (const m of smalls) shelfParts.push(matSvg({ cx: m.cx, top: m.top, w: m.w, h: m.h, shape: m.shape, attrs: ' data-lcs-small-mat=""' }));
  shelfParts.push(nameLines(shelfLines));
  const shelfSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${S(shelfH)}" viewBox="0 0 ${w} ${S(shelfH)}" role="img" aria-label="" style="display:block;overflow:visible" data-lcs-frame-tree="" data-lcs-shelf-svg="">${shelfParts.join('')}</svg>`;
  return { treeSvg, shelfSvg, width: w, treeH: TREE_H, shelfH: S(shelfH), mats, smalls, lines, shelfLines, branches: branches.map((b) => b.pts), plate, cords, leafBoxes };
}

module.exports = { frameTree, MAT_W, MAT_H, LINE_W, LINE_H, SHAPES, TREE_H };
