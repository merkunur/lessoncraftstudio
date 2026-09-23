/**
 * family-tree.js — the ONE place K-370 `family` tree geometry is derived
 * (nt10-E; design docs/worksheet-gen/b5-designs/K-370-family.md §2 "NEW
 * primitives/family-tree.js": design A's placement + design B's grand-pair
 * centring). Pure SVG on the tokens, Node-testable; the gate is
 * qa/verify-b5-family-tree.js (it re-reads the family FROM THE DRAWN LINES).
 *
 *   familyTree({ persons:[{id, path}], frame:{w,h}, nodeW = frame.w, labelH = 0,
 *                coupleGap = 28, sibGap = 24, sepGap = 16, rowGap = 32, pad = 10,
 *                skin:'tree'|'none', badges:{id:n}, egoId, plates:true|false,
 *                ground = 10, w = 675, nodeSvg:(person, box) => svg })
 *     -> { svg, nodes:[{id, path, gen, row, x, y, w, h, cx}], width, height, trunkX,
 *          plate:{cx, y} | null }
 *
 * THE GRAPH is the conventional invented pedigree the design's lead ruling
 * binds (every closed face): a mother M and a father F, their children in the
 * ego row ('' = ego, Z/B older, Zy/By baby), at most ONE grandparent couple
 * (MM+MF or FM+FF) above the `grandSide` parent, that parent's siblings
 * (MZ/MB or FZ/FB) and their children (cousins MZD …). parentsOf(path) is the
 * graph; the drawn lines must say the same thing (the gate).
 *
 * PLACEMENT, in order (design §2): (1) the grandSide parent G at x 0, its
 * siblings on G's OUTWARD side (away from the spouse) at pitch nodeW + sibGap;
 * (2) the grand couple centred over G (or over its sibship's midpoint), the two
 * at pitch nodeW + coupleGap; (3) the in-law parent starts at pitch
 * nodeW + coupleGap from G and is pushed outward until it clears every row-0
 * node by sepGap ("nobody stands above a person they do not descend to");
 * (4) the ego row centred under the parents' couple midpoint at pitch
 * nodeW + sibGap, a cousin centred under its parent; (5) the bbox (incl. the
 * badge discs' 11 px overhang) is centred in `w`; THROWS if it exceeds `w`.
 * With no grandparents (d1) M sits at 0 and F at nodeW + coupleGap.
 *
 * ROWS = generation (grandparents 0, parents + their siblings 1, ego row 2),
 * re-based when a generation is absent. Row top = pad + row * (frame.h + labelH
 * + rowGap). Height = rows' span + the ego plate overhang (13 when plates) +
 * ground.
 *
 * DRAWN (in this order): skin (crown / trunk / ground), connectors (teal 3,
 * round caps), then every node via nodeSvg(person, box) (the picture frames;
 * components-b5/family.js), then the badge discs. Connectors: a COUPLE BAR at
 * frame mid-height between the two inner frame edges; a DESCENT from the bar
 * midpoint straight down, either onto a lone child's frame-top centre (when the
 * child stands under it) or onto a SIBLING BAR 16 px above the children's frame
 * tops, from which a DROP falls into each child's frame-top centre. No junction
 * dot, no heart (no marriage is asserted). Crown = the union of r 64 circles on
 * every row-0 / row-1 frame centre + the two rows' bbox inflated 20 px (rx 60),
 * tealSoft, no stroke; its TOP inflation is clamped so the crown never meets the
 * stage edge (a flat cut reads as a mistake — build record); trunk = 56 wide,
 * creamDeep, teal 2 outline + two 1.5 px bark strokes, centred on the ego row's
 * parent-couple midpoint, from the crown bottom to the ground; ground = a teal
 * 3 line + a 7 px creamDeep band.
 *
 * Stamps: node rects are the caller's; the tree stamps line[data-lcs-conn]
 * (couple | descent | sibling | drop — informational: the gate classifies by
 * geometry), circle[data-lcs-disc] + text[data-lcs-badge-text], the skin
 * [data-lcs-crown] / [data-lcs-trunk] / [data-lcs-ground], and the root
 * <g data-lcs-tree data-lcs-skin>.
 */
'use strict';
const tokens = require('./_tokens.js');

const T = tokens.color;
const F = tokens.font;
const DISC_R = 15, DISC_DX = 4, DISC_DY = 10;
const PLATE_OVERHANG = 13;
const SIB_BAR_ABOVE = 16;
const CROWN_R = 64, CROWN_PAD = 20, CROWN_TOP_MIN = 2;
const TRUNK_W = 56;
const BUMP_R = 26, BUMP_STEP = 48;

/* ---------------------------------------------------------------- the graph */
const GRAND = ['MM', 'MF', 'FM', 'FF'];
const EGO_ROW = /^(|Z|B|Zy|By)$/;
/** the drawn parents of a path under the conventional structure (paths absent from the page drop out) */
function parentsOf(path) {
  if (EGO_ROW.test(path)) return ['M', 'F'];
  if (path === 'M' || /^M[ZB]$/.test(path)) return ['MM', 'MF'];
  if (path === 'F' || /^F[ZB]$/.test(path)) return ['FM', 'FF'];
  if (/^[MF][ZB][DS]$/.test(path)) return [path.slice(0, 2)];
  return [];
}
/** generation: 0 grandX, 1 parents + their siblings, 2 ego row + cousins */
function genOf(path) {
  if (GRAND.includes(path)) return 0;
  if (/^[MF]([ZB])?$/.test(path)) return 1;
  return 2;
}
/** is `a` an ancestor of `b` under the drawn graph (restricted to the persons present) */
function isAncestor(aPath, bPath, present) {
  const stack = parentsOf(bPath).filter((p) => present.has(p));
  const seen = new Set();
  while (stack.length) {
    const p = stack.pop();
    if (p === aPath) return true;
    if (seen.has(p)) continue;
    seen.add(p);
    for (const q of parentsOf(p)) if (present.has(q)) stack.push(q);
  }
  return false;
}

/* ---------------------------------------------------------------- the tree */
function familyTree(o) {
  const { persons, frame, labelH = 0, coupleGap = 28, sibGap = 24, sepGap = 16, rowGap = 32, pad = 10,
    skin = 'tree', badges = {}, egoId, plates = true, ground = 10, w = 675, nodeSvg } = o;
  const nodeW = o.nodeW || frame.w;
  if (!Array.isArray(persons) || !persons.length) throw new Error('familyTree: no persons');
  const byPath = new Map();
  for (const p of persons) {
    if (byPath.has(p.path)) throw new Error(`familyTree: two persons on path "${p.path}"`);
    byPath.set(p.path, p);
  }
  if (!byPath.has('M') || !byPath.has('F')) throw new Error('familyTree: the conventional structure needs M and F (lead ruling: one conventional invented family)');
  const grandPaths = GRAND.filter((g) => byPath.has(g));
  if (grandPaths.length !== 0 && grandPaths.length !== 2) throw new Error(`familyTree: ${grandPaths.length} grandparents (0 or ONE couple)`);
  const grandSide = grandPaths.length ? grandPaths[0][0] : null;
  if (grandPaths.length === 2 && grandPaths[0][0] !== grandPaths[1][0]) throw new Error('familyTree: the two grandparents are not one couple');
  for (const p of persons) {
    if (/^[MF][ZB]/.test(p.path) && p.path[0] !== grandSide) throw new Error(`familyTree: ${p.path} is on the side without grandparents`);
  }

  const pitchSib = nodeW + sibGap, pitchCouple = nodeW + coupleGap;
  const X = new Map();   // path -> centre x
  const gens = [...new Set(persons.map((p) => genOf(p.path)))].sort();
  const rowOfGen = new Map(gens.map((g, i) => [g, i]));
  // (1) G at 0, its siblings outward
  if (!grandSide) { X.set('M', 0); X.set('F', pitchCouple); }
  else {
    const G = grandSide, S = G === 'M' ? 'F' : 'M';
    const out = G === 'M' ? -1 : 1;
    X.set(G, 0);
    const sibs = persons.filter((p) => /^[MF][ZB]$/.test(p.path)).map((p) => p.path);
    sibs.forEach((s, i) => X.set(s, out * pitchSib * (i + 1)));
    // (2) the grand couple over the sibship midpoint
    const ship = [G, ...sibs].map((p) => X.get(p));
    const mid = (Math.min(...ship) + Math.max(...ship)) / 2;
    const [gf, gm] = G === 'M' ? ['MM', 'MF'] : ['FM', 'FF'];
    X.set(gf, mid - pitchCouple / 2); X.set(gm, mid + pitchCouple / 2);
    // (3) the in-law pushed outward until it clears every row-0 node by sepGap
    let sx = -out * pitchCouple;
    const g0 = [X.get(gf), X.get(gm)];
    if (out === -1) { const edge = Math.max(...g0) + nodeW / 2 + sepGap; sx = Math.max(sx, edge + nodeW / 2); }
    else { const edge = Math.min(...g0) - nodeW / 2 - sepGap; sx = Math.min(sx, edge - nodeW / 2); }
    X.set(S, sx);
  }
  // (4) the ego row centred under the couple midpoint; cousins under their parent
  const kids = persons.filter((p) => EGO_ROW.test(p.path));
  const coupleMid = (X.get('M') + X.get('F')) / 2;
  kids.forEach((k, i) => X.set(k.path, coupleMid + (i - (kids.length - 1) / 2) * pitchSib));
  for (const p of persons) if (/^[MF][ZB][DS]$/.test(p.path)) X.set(p.path, X.get(p.path.slice(0, 2)));

  // (5) bbox (incl. the disc overhang) centred in w
  const rowH = frame.h + labelH;
  const nodes0 = persons.map((p) => {
    const row = rowOfGen.get(genOf(p.path));
    return { id: p.id, path: p.path, gen: genOf(p.path), row, cx: X.get(p.path), y: pad + row * (rowH + rowGap), w: frame.w, h: frame.h };
  });
  let minX = Infinity, maxX = -Infinity;
  for (const n of nodes0) {
    const left = n.cx - frame.w / 2 - (badges[n.id] != null ? Math.max(0, DISC_R - DISC_DX) : 0);
    minX = Math.min(minX, left); maxX = Math.max(maxX, n.cx + frame.w / 2);
  }
  const span = maxX - minX;
  if (span > w) throw new Error(`familyTree: the tree is ${span.toFixed(1)} px wide > ${w}`);
  const off = (w - span) / 2 - minX;
  const nodes = nodes0.map((n) => ({ ...n, cx: +(n.cx + off).toFixed(2), x: +(n.cx + off - frame.w / 2).toFixed(2) }));
  const node = new Map(nodes.map((n) => [n.path, n]));
  const rows = gens.length;
  const egoRowTop = pad + (rows - 1) * (rowH + rowGap);
  const height = egoRowTop + rowH + (plates ? PLATE_OVERHANG : 0) + ground;
  const S = (v) => +v.toFixed(2);

  /* ---- connectors */
  const lines = [];
  const L = (x1, y1, x2, y2, kind) => lines.push(`<line x1="${S(x1)}" y1="${S(y1)}" x2="${S(x2)}" y2="${S(y2)}" stroke="${T.teal}" stroke-width="3" stroke-linecap="round" data-lcs-conn="${kind}"/>`);
  const couples = [];
  if (node.has('M') && node.has('F')) couples.push(['M', 'F']);
  if (grandSide) couples.push(grandSide === 'M' ? ['MM', 'MF'] : ['FM', 'FF']);
  for (const [a, b] of couples) {
    const A = node.get(a), B = node.get(b);
    const [l, r] = A.cx < B.cx ? [A, B] : [B, A];
    const by = l.y + frame.h / 2;
    L(l.x + frame.w, by, r.x, by, 'couple');
    const mid = (l.cx + r.cx) / 2;
    const kidsOf = nodes.filter((n) => { const ps = parentsOf(n.path); return ps.length === 2 && ps.includes(a) && ps.includes(b); });
    if (!kidsOf.length) continue;
    const top = kidsOf[0].y;
    if (kidsOf.length === 1 && Math.abs(kidsOf[0].cx - mid) < 0.5) { L(mid, by, mid, top, 'descent'); continue; }
    const sy = top - SIB_BAR_ABOVE;
    const xs = kidsOf.map((k) => k.cx);
    L(Math.min(mid, ...xs), sy, Math.max(mid, ...xs), sy, 'sibling');
    L(mid, by, mid, sy, 'descent');
    for (const k of kidsOf) L(k.cx, sy, k.cx, top, 'drop');
  }
  for (const n of nodes) if (/^[MF][ZB][DS]$/.test(n.path)) { const p = node.get(n.path.slice(0, 2)); L(p.cx, p.y + rowH, n.cx, n.y, 'drop'); }

  /* ---- skin */
  let skinSvg = '';
  let trunkX = null;
  if (skin === 'tree') {
    const upper = nodes.filter((n) => n.row < rows - 1);
    const crown = [];
    let crownBottom = null;
    if (upper.length) {
      const x0 = Math.min(...upper.map((n) => n.x)) - CROWN_PAD, x1 = Math.max(...upper.map((n) => n.x + n.w)) + CROWN_PAD;
      const yTop = Math.max(CROWN_TOP_MIN + BUMP_R, Math.min(...upper.map((n) => n.y)) - CROWN_PAD);
      const yBot = Math.max(...upper.map((n) => n.y + n.h)) + CROWN_PAD;
      crownBottom = yBot;
      crown.push(`<rect x="${S(x0)}" y="${S(yTop)}" width="${S(x1 - x0)}" height="${S(yBot - yTop)}" rx="60" ry="60" fill="${T.tealSoft}" data-lcs-crown=""/>`);
      // leafy bumps along the top edge and down the two sides, so the crown reads as a tree, not a card
      const br = BUMP_R, top = yTop;
      const nTop = Math.max(2, Math.round((x1 - x0 - 2 * br) / BUMP_STEP));
      for (let i = 0; i <= nTop; i++) crown.push(`<circle cx="${S(x0 + br + (x1 - x0 - 2 * br) * i / nTop)}" cy="${S(top)}" r="${br}" fill="${T.tealSoft}" data-lcs-crown=""/>`);
      const nSide = Math.max(1, Math.round((yBot - br - top) / BUMP_STEP));
      for (let i = 1; i <= nSide; i++) {
        const cy = top + (yBot - br - 6 - top) * i / nSide;
        crown.push(`<circle cx="${S(x0 + 4)}" cy="${S(cy)}" r="${br}" fill="${T.tealSoft}" data-lcs-crown=""/>`);
        crown.push(`<circle cx="${S(x1 - 4)}" cy="${S(cy)}" r="${br}" fill="${T.tealSoft}" data-lcs-crown=""/>`);
      }
      for (const n of upper) {
        const cyc = n.y + n.h / 2;
        const r = Math.min(CROWN_R, cyc - CROWN_TOP_MIN);
        crown.push(`<circle cx="${S(n.cx)}" cy="${S(cyc)}" r="${S(r)}" fill="${T.tealSoft}" data-lcs-crown=""/>`);
      }
    }
    trunkX = S(coupleMid + off);
    const gy = height - ground;
    const tTop = crownBottom != null ? crownBottom - 12 : pad;
    const trunk = `<rect x="${S(trunkX - TRUNK_W / 2)}" y="${S(tTop)}" width="${TRUNK_W}" height="${S(gy - tTop)}" fill="${T.creamDeep}" stroke="${T.grid}" stroke-width="2" data-lcs-trunk=""/>` +
      `<path d="M ${S(trunkX - 12)} ${S(tTop + 26)} q -4 ${S((gy - tTop) / 3)} 2 ${S((gy - tTop) * 0.6)}" fill="none" stroke="${T.grid}" stroke-width="1.5" stroke-linecap="round" data-lcs-trunk=""/>` +
      `<path d="M ${S(trunkX + 13)} ${S(tTop + 40)} q 4 ${S((gy - tTop) / 4)} -1 ${S((gy - tTop) * 0.5)}" fill="none" stroke="${T.grid}" stroke-width="1.5" stroke-linecap="round" data-lcs-trunk=""/>`;
    const groundSvg = `<rect x="0" y="${S(gy)}" width="${w}" height="${ground}" fill="${T.creamDeep}" data-lcs-ground=""/>` +
      `<line x1="1.5" y1="${S(gy)}" x2="${w - 1.5}" y2="${S(gy)}" stroke="${T.teal}" stroke-width="3" stroke-linecap="round" data-lcs-ground=""/>`;
    skinSvg = trunk + crown.join('') + groundSvg;
  }

  /* ---- nodes + discs */
  const nodeMarkup = nodes.map((n) => nodeSvg ? nodeSvg(persons.find((p) => p.id === n.id), n) :
    `<rect x="${n.x}" y="${n.y}" width="${n.w}" height="${n.h}" rx="10" fill="${T.white}" stroke="${T.teal}" stroke-width="3" data-lcs-frame="${n.id}"/>`).join('');
  const discs = nodes.filter((n) => badges[n.id] != null).map((n) => {
    const cx = S(n.x + DISC_DX), cy = S(n.y + DISC_DY);
    return `<circle cx="${cx}" cy="${cy}" r="${DISC_R}" fill="${T.teal}" data-lcs-disc="${n.id}"/>` +
      `<text x="${cx}" y="${S(cy + 0.5)}" font-family="${F.display}, cursive" font-size="20" font-weight="700" fill="${T.white}" text-anchor="middle" dominant-baseline="central" data-lcs-badge-text="${n.id}">${badges[n.id]}</text>`;
  }).join('');
  const egoNode = egoId != null ? nodes.find((n) => n.id === egoId) : null;
  const plate = plates && egoNode ? { cx: egoNode.cx, y: egoNode.y + frame.h } : null;
  const svg = `<g data-lcs-tree="" data-lcs-skin="${skin}">${skinSvg}${lines.join('')}${nodeMarkup}${discs}</g>`;
  return { svg, nodes, width: w, height, trunkX, plate, rowH, grandSide, discR: DISC_R };
}

module.exports = { familyTree, parentsOf, genOf, isAncestor, GRAND, DISC_R, DISC_DX, DISC_DY, PLATE_OVERHANG, SIB_BAR_ABOVE };
