#!/usr/bin/env node
/**
 * art-rig.js: the construction check of a person or animal drawing (docs/makers/ART-BRIEF.md, "The construction sheet").
 * A drawing declares what it is made of, and this tool measures the drawing against that declaration, so the faults the owner sees
 * ("the object is just behind the hand", "only one ear", "arms and legs are unproportional") cannot pass on anybody's eye:
 *
 *   <desc id="construction">{ "class": "animal", "view": "profile", "pose": "stand", "ears": 2, "arms": 0, "legs": 4,
 *     "joints": { "shoulder_near": [x, y], "elbow_near": [x, y], "wrist_near": [x, y], ... }, "steps": [["body"], ["head"], ...] }</desc>
 *   <g id="tail">...</g> <g id="leg-hind-far">...</g> <g id="body">...</g> <g id="head">...</g> <g id="ear-near">...</g> <g id="eye">...</g>
 *
 * Every part is one top-level group, back to front. The joints are checked against the limb's own ink, so they cannot be invented.
 *   node scripts/worksheet-gen/tools/art-rig.js --selftest     every rule fires on its own fault, and a sound figure passes
 */
'use strict';
const path = require('path');
const sharp = require('sharp');
const N = 600;

const LIMBS = {
  'arm-near': ['shoulder_near', 'elbow_near', 'wrist_near'], 'arm-far': ['shoulder_far', 'elbow_far', 'wrist_far'],
  'leg-front-near': ['shoulder_near', 'elbow_near', 'wrist_near'], 'leg-front-far': ['shoulder_far', 'elbow_far', 'wrist_far'],
  'leg-near': ['hip_near', 'knee_near', 'ankle_near'], 'leg-far': ['hip_far', 'knee_far', 'ankle_far'],
  'leg-hind-near': ['hip_near', 'knee_near', 'ankle_near'], 'leg-hind-far': ['hip_far', 'knee_far', 'ankle_far'],
  // an insect's middle pair
  'leg-mid-near': ['hip_mid_near', 'knee_mid_near', 'ankle_mid_near'], 'leg-mid-far': ['hip_mid_far', 'knee_mid_far', 'ankle_mid_far'],
};
const PAIRS = [['arm-near', 'arm-far'], ['leg-front-near', 'leg-front-far'], ['leg-near', 'leg-far'], ['leg-hind-near', 'leg-hind-far'], ['leg-mid-near', 'leg-mid-far']];
const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);

/** the top-level groups of a drawing, in document order: [{ id, markup }] */
function groupsOf(src) {
  const out = [], re = /<g\b[^>]*>|<\/g>/g;
  let depth = 0, start = 0, id = null, m;
  while ((m = re.exec(src))) {
    if (m[0].startsWith('</')) { depth--; if (depth === 0 && id) out.push({ id, markup: src.slice(start, m.index + 4) }); continue; }
    if (depth === 0) { const a = /\bid="([^"]+)"/.exec(m[0]); id = a ? a[1] : null; start = m.index; }
    depth++;
  }
  return out;
}
/** a group's ink as a mask: its white fills turned black, so a closed shape counts as solid */
async function maskOf(markup) {
  const solid = markup.replace(/fill="(#fff|#ffffff|white)"/gi, 'fill="#000"');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${N}" height="${N}" viewBox="0 0 600 600">${solid}</svg>`;
  const { data } = await sharp(Buffer.from(svg)).flatten({ background: '#fff' }).greyscale().raw().toBuffer({ resolveWithObject: true });
  const mask = new Uint8Array(N * N);
  for (let i = 0; i < N * N; i++) if (data[i] < 128) mask[i] = 1;
  return mask;
}
const areaOf = (m) => m.reduce((a, v) => a + v, 0);
function boxOf(m) {
  let x0 = N, y0 = N, x1 = -1, y1 = -1;
  for (let i = 0; i < N * N; i++) if (m[i]) { const x = i % N, y = (i / N) | 0; if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
  return x1 < 0 ? null : { x0, y0, x1, y1, w: x1 - x0 + 1, h: y1 - y0 + 1, cx: (x0 + x1) / 2, cy: (y0 + y1) / 2 };
}
const overlap = (a, b) => { let n = 0; for (let i = 0; i < N * N; i++) if (a[i] && b[i]) n++; return n; };
/** is the point on the mask, or within tol pixels of it? */
function near(m, p, tol) {
  const [px, py] = p.map(Math.round);
  for (let y = Math.max(0, py - tol); y <= Math.min(N - 1, py + tol); y++) for (let x = Math.max(0, px - tol); x <= Math.min(N - 1, px + tol); x++) if (m[y * N + x]) return true;
  return false;
}
/** how far the shape is from the plain ellipse that fills its box: 0 = the same shape */
function offEllipse(m) {
  const b = boxOf(m), a = b.w / 2, c = b.h / 2;
  let diff = 0, area = 0;
  for (let y = b.y0; y <= b.y1; y++) for (let x = b.x0; x <= b.x1; x++) {
    const inE = ((x - b.cx) / a) ** 2 + ((y - b.cy) / c) ** 2 <= 1, inM = !!m[y * N + x];
    if (inM) area++;
    if (inE !== inM) diff++;
  }
  return diff / Math.max(1, area);
}

/** the shape with anything thinner than 2r removed (a tuft, a topknot): erode, then grow back */
function opened(m, r) {
  const pass = (src, keep) => {
    const row = new Uint8Array(N * N), out = new Uint8Array(N * N);
    for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
      let v = keep;
      for (let k = -r; k <= r && v === keep; k++) { const q = x + k; const b = q < 0 || q >= N ? 0 : src[y * N + q]; if (b !== keep) v = b; }
      row[y * N + x] = v;
    }
    for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
      let v = keep;
      for (let k = -r; k <= r && v === keep; k++) { const q = y + k; const b = q < 0 || q >= N ? 0 : row[q * N + x]; if (b !== keep) v = b; }
      out[y * N + x] = v;
    }
    return out;
  };
  return pass(pass(m, 1), 0);
}
/** where a point sits across a limb: 0.5 is the middle, 0 the edge, measured along the narrowest of four directions */
function acrossLimb(m, p) {
  let best = null;
  for (const [dx, dy] of [[1, 0], [0, 1], [1, 1], [1, -1]]) {
    const run = (sign) => {
      let k = 0, x = Math.round(p[0]), y = Math.round(p[1]);
      while (k < 400) { x += dx * sign; y += dy * sign; if (x < 0 || y < 0 || x >= N || y >= N || !m[y * N + x]) break; k++; }
      return k;
    };
    const a = run(1), b = run(-1), w = a + b;
    if (!best || w < best.w) best = { w, at: Math.min(a, b) / Math.max(1, w) };
  }
  return best.at;
}

/**
 * The construction faults of a drawing's source: [] when it is sound, null when it declares no construction.
 * A second figure in one drawing has its own sheet, <desc id="construction-<name>">, with "prefix": "gran-" on its parts and
 * "holds": ["bag"] for what it holds. The main sheet's steps cover every part of the drawing.
 */
async function check(src) {
  const found = [...src.matchAll(/<desc id="construction(?:-[\w-]+)?">([\s\S]*?)<\/desc>/g)];
  if (!found.length) return null;
  const sheets = [];
  for (const m of found) { try { sheets.push(JSON.parse(m[1])); } catch (e) { return ['construction: not valid JSON (' + e.message + ')']; } }
  const all = groupsOf(src), seconds = sheets.filter((s) => s.prefix), faults = [];
  const belongs = (s, g) => g.id.startsWith(s.prefix) || (s.holds || []).some((k) => ['palm-', 'held-', 'fingers-'].some((p) => g.id === p + k));
  if (found.length > 1 && seconds.length !== found.length - 1) return ['a second figure needs "prefix" on its sheet'];
  for (const c of sheets) {
    const groups = c.prefix ? all.filter((g) => belongs(c, g)).map((g) => ({ ...g, id: g.id.startsWith(c.prefix) ? g.id.slice(c.prefix.length) : g.id }))
      : all.filter((g) => !seconds.some((s) => belongs(s, g)));
    const own = await figureFaults(c, groups, c.prefix ? groups.map((g) => g.id) : all.map((g) => g.id));
    faults.push(...own.map((x) => (c.prefix ? c.prefix + ' ' + x : x)));
  }
  return faults;
}
/** one figure's faults. stepIds: the parts its steps must cover */
async function figureFaults(c, groups, stepIds) {
  const f = [], ids = groups.map((g) => g.id), has = (id) => ids.includes(id), J = c.joints || {};
  const bodyView = c.bodyView || c.view;
  if (!['animal', 'person'].includes(c.class)) f.push('class must be animal or person');
  if (!['profile', 'front'].includes(c.view)) f.push('view must be profile or front');
  if (!['profile', 'front'].includes(bodyView)) f.push('bodyView must be profile or front');
  for (const id of ['head', 'body']) if (!has(id)) f.push(`no group "${id}"`);
  if (new Set(ids).size !== ids.length) f.push('two groups share an id');
  if (f.length) return f;
  const M = {};
  await Promise.all(groups.map(async (g) => { M[g.id] = await maskOf(g.markup); }));
  const starts = (p) => ids.filter((i) => i.startsWith(p));

  // ears and eyes
  const ears = starts('ear');
  if (ears.length !== c.ears) f.push(`declares ${c.ears} ears, draws ${ears.length}`);
  if (c.ears !== 2 && !c.earsWhy) f.push(`${c.ears} ears: say why in earsWhy (only a species with no visible ears, or hair over them)`);
  const eyes = starts('eye'), wantEyes = c.view === 'profile' ? 1 : 2;
  if (eyes.length !== wantEyes) f.push(`a ${c.view} head shows ${wantEyes} eye(s), this draws ${eyes.length}`);
  // a front view has its nose between the eyes; a nose beside them is a side-on head
  const nose = ['muzzle', 'nose', 'beak'].find(has);
  if (c.view === 'front' && eyes.length === 2 && nose) {
    const [a, b] = eyes.map((e) => boxOf(M[e])), n = boxOf(M[nose]), mid = (a.cx + b.cx) / 2, gap = Math.abs(a.cx - b.cx);
    if (Math.abs(n.cx - mid) > gap * 0.2) f.push(`front view: the ${nose} sits ${Math.round(Math.abs(n.cx - mid))} px off the middle of the eyes`);
  }
  // the head joins the body
  if (!overlap(M.head, M.body) && !(has('neck') && overlap(M.head, M.neck) && overlap(M.neck, M.body))) f.push('the head does not join the body');
  if (c.class === 'animal' && !c.roundHead && Math.min(offEllipse(M.head), offEllipse(opened(M.head, 14))) < 0.05) f.push('the head is a plain disc: shape it to the species (or say why in roundHead)');

  // limbs
  const arms = starts('arm-'), legs = starts('leg-');
  if (arms.length !== (c.arms || 0)) f.push(`declares ${c.arms || 0} arms, draws ${arms.length}`);
  if (legs.length !== (c.legs || 0)) f.push(`declares ${c.legs || 0} legs, draws ${legs.length}`);
  const len = {}, width = {};
  for (const id of [...arms, ...legs]) {
    const names = LIMBS[id];
    if (!names) { f.push(`unknown limb "${id}"`); continue; }
    const pts = names.map((n) => J[n]);
    if (pts.some((p) => !p)) { f.push(`${id}: joints missing (${names.join(', ')})`); continue; }
    for (let i = 0; i < 3; i++) if (!near(M[id], pts[i], 6)) f.push(`${id}: ${names[i]} is not on the limb`);
    if (near(M[id], pts[1], 0) && acrossLimb(M[id], pts[1]) < 0.2) f.push(`${id}: ${names[1]} sits at the edge of the limb, not inside it`);
    const up = dist(pts[0], pts[1]), lo = dist(pts[1], pts[2]);
    len[id] = up + lo; width[id] = areaOf(M[id]) / len[id];
    if (up / lo < 0.5 || up / lo > 2) f.push(`${id}: upper and lower parts are ${Math.round(up)} and ${Math.round(lo)} px, out of proportion`);
    if (!near(M.body, pts[0], 12)) f.push(`${id}: ${names[0]} is not on the body`);
    if (near(M.head, pts[0], 0) && !near(M.body, pts[0], 0)) f.push(`${id}: grows from the head`);
    if (c.class === 'person' && width[id] / len[id] < 0.14) f.push(`${id}: a stick (${Math.round(width[id])} px wide for ${Math.round(len[id])} long)`);
  }
  for (const [a, b] of PAIRS) if (len[a] && len[b]) {
    if (Math.min(len[a], len[b]) / Math.max(len[a], len[b]) < 0.8) f.push(`${a} and ${b} differ: ${Math.round(len[a])} and ${Math.round(len[b])} px long`);
    if (Math.min(width[a], width[b]) / Math.max(width[a], width[b]) < 0.65) f.push(`${a} and ${b} differ in width: ${Math.round(width[a])} and ${Math.round(width[b])} px`);
  }

  // a side-on figure: the far limb and the far ear go behind the near ones
  if (bodyView === 'profile') for (const [n, b] of [['leg-front-near', 'leg-front-far'], ['leg-hind-near', 'leg-hind-far'], ['leg-mid-near', 'leg-mid-far'], ['leg-near', 'leg-far'], ['arm-near', 'arm-far']]) {
    if (has(n) && has(b) && ids.indexOf(b) > ids.indexOf(n)) f.push(`${b} is drawn over ${n}: the far limb goes behind`);
  }
  if (c.view === 'profile' && has('ear-far') && ids.indexOf('ear-far') > ids.indexOf('head')) f.push('ear-far is drawn over the head: the far ear goes behind it');

  // what is held passes through the hand: palm, the thing, fingers over it
  for (const held of starts('held-')) {
    const k = held.slice(5), palm = `palm-${k}`, fingers = `fingers-${k}`;
    if (!has(palm) || !has(fingers)) { f.push(`${held}: needs groups ${palm} and ${fingers}`); continue; }
    if (!(ids.indexOf(palm) < ids.indexOf(held) && ids.indexOf(held) < ids.indexOf(fingers))) f.push(`${held}: order must be palm, held, fingers`);
    if (overlap(M[fingers], M[held]) < 30) f.push(`${held}: the fingers do not close over it`);
    if (overlap(M[palm], M[held]) < 30) f.push(`${held}: it does not lie against the palm`);
    const hb = boxOf(M[held]), fb = boxOf(M[fingers]);
    if ([fb.x0 - hb.x0, hb.x1 - fb.x1, fb.y0 - hb.y0, hb.y1 - fb.y1].filter((d) => d > 6).length < 2) f.push(`${held}: it does not come out of the hand on two sides`);
  }

  // a standing figure stands on one line; a person is about three heads tall
  if (['stand', 'walk'].includes(c.pose) && legs.length) {
    const feet = legs.map((l) => boxOf(M[l]).y1);
    if (Math.max(...feet) - Math.min(...feet) > 45) f.push(`the feet do not stand on one line (${Math.min(...feet)} to ${Math.max(...feet)})`);
  }
  if (c.class === 'person' && ['stand', 'walk'].includes(c.pose)) {
    const all = [M.head, M.body, ...legs.map((l) => M[l])].map(boxOf), top = Math.min(...all.map((b) => b.y0)), bottom = Math.max(...all.map((b) => b.y1)), share = boxOf(M.head).h / (bottom - top);
    if (share < 0.24 || share > 0.42) f.push(`the head is ${Math.round(share * 100)}% of the height (24 to 42% wanted)`);
  }

  // the teaching order: every part in one step
  const steps = c.steps || [], listed = steps.flat();
  if (steps.length < 3 || steps.length > 6) f.push(`steps: ${steps.length} steps (3 to 6 wanted)`);
  for (const id of stepIds) if (listed.filter((x) => x === id).length !== 1) f.push(`steps: "${id}" must appear exactly once`);
  for (const id of listed) if (!stepIds.includes(id)) f.push(`steps: no group "${id}"`);
  return f;
}

/* ---------------------------------------------------------------- the self-test ---------------------------------------------------------------- */
const blob = (id, x, y, w, h) => `<g id="${id}"><path d="M${x} ${y}C${x + w} ${y} ${x + w} ${y} ${x + w} ${y + h / 2}C${x + w} ${y + h} ${x + w} ${y + h} ${x} ${y + h}C${x - 6} ${y + h} ${x - 6} ${y} ${x} ${y}Z" fill="#fff" stroke="#141414" stroke-width="6"/></g>`;
function figure(o = {}) {
  const c = { class: 'person', view: 'front', pose: 'stand', ears: 2, arms: 2, legs: 2,
    joints: { shoulder_near: [230, 260], elbow_near: [208, 312], wrist_near: [160, 340], shoulder_far: [370, 260], elbow_far: [392, 312], wrist_far: [440, 340],
      hip_near: [270, 400], knee_near: [270, 470], ankle_near: [270, 540], hip_far: [330, 400], knee_far: [330, 470], ankle_far: [330, 540] },
    steps: [['body'], ['head', 'ear-a', 'ear-b'], ['arm-near', 'arm-far'], ['leg-near', 'leg-far'], ['palm-x', 'held-x', 'fingers-x', 'eye-a', 'eye-b', 'nose']], ...o.c };
  const parts = o.parts || [
    blob('leg-near', 245, 395, 50, 150), blob('leg-far', 305, 395, 50, 150), blob('body', 220, 240, 160, 170),
    `<g id="arm-near"><path d="M240 250L150 345L180 370L262 285Z" fill="#fff" stroke="#141414" stroke-width="6"/></g>`, `<g id="arm-far"><path d="M360 250L450 345L420 370L338 285Z" fill="#fff" stroke="#141414" stroke-width="6"/></g>`,
    blob('head', 215, 60, 170, 180), blob('ear-a', 200, 130, 20, 40), blob('ear-b', 382, 130, 20, 40), blob('eye-a', 255, 130, 16, 22), blob('eye-b', 330, 130, 16, 22), blob('nose', 292, 170, 18, 14),
    blob('palm-x', 140, 330, 40, 40), blob('held-x', 150, 280, 16, 130), blob('fingers-x', 135, 340, 50, 24),
  ];
  return `<svg viewBox="0 0 600 600"><desc id="construction">${JSON.stringify(c)}</desc>${parts.join('')}</svg>`;
}
const drop = (id) => { const f = figure(); return f.replace(new RegExp(`<g id="${id}">[\\s\\S]*?</g>`), ''); };
async function selftest() {
  const good = await check(figure());
  let bad = 0;
  if (good.length) { console.log('FAIL a sound figure is refused: ' + good.join('; ')); bad++; } else console.log('ok   a sound figure passes');
  const J = figure.bind(null);
  const cases = [
    ['one ear', drop('ear-b').replace('"ear-b"', '"nose2"'), /ears/],
    ['two eyes in a profile', J({ c: { view: 'profile' } }), /profile head shows 1/],
    ['nose beside the eyes', figure().replace('M292 170', 'M420 170'), /off the middle/],
    ['a short arm', J({ c: { joints: { ...JSON.parse(/<desc id="construction">([\s\S]*?)<\/desc>/.exec(figure())[1]).joints, elbow_far: [385, 280], wrist_far: [400, 300] } } }), /differ/],
    ['a joint off the limb', J({ c: { joints: { ...JSON.parse(/<desc id="construction">([\s\S]*?)<\/desc>/.exec(figure())[1]).joints, knee_far: [520, 200] } } }), /not on the limb/],
    ['object behind the whole hand', figure().replace(/(<g id="held-x">[\s\S]*?<\/g>)(<g id="fingers-x">[\s\S]*?<\/g>)/, '$2$1'), /order must be palm/],
    ['fingers off the object', figure().replace(/<g id="fingers-x">[\s\S]*?<\/g>/, blob('fingers-x', 300, 20, 50, 24)), /do not close/],
    ['no fingers group', drop('fingers-x'), /needs groups/],
    ['a step missing', J({ c: { steps: [['body'], ['head'], ['arm-near', 'arm-far']] } }), /exactly once/],
    ['the head as a disc', figure().replace('"class":"person"', '"class":"animal"').replace(/<g id="head">[\s\S]*?<\/g>/, '<g id="head"><ellipse cx="300" cy="150" rx="85" ry="90" fill="#fff" stroke="#141414" stroke-width="6"/></g>'), /plain disc/],
    ['a head too big', figure().replace(/<g id="head">[\s\S]*?<\/g>/, '<g id="head"><ellipse cx="300" cy="170" rx="150" ry="160" fill="#fff" stroke="#141414" stroke-width="6"/></g>'), /of the height/],
    ['the object stops inside the hand', figure().replace(/<g id="held-x">[\s\S]*?<\/g>/, blob('held-x', 150, 335, 16, 40)), /on two sides/],
    ['a disc with a tuft', figure().replace('"class":"person"', '"class":"animal"').replace(/<g id="head">[\s\S]*?<\/g>/, '<g id="head"><path d="M295 60L300 36L305 60Z" fill="#fff" stroke="#141414" stroke-width="6"/><ellipse cx="300" cy="150" rx="85" ry="90" fill="#fff" stroke="#141414" stroke-width="6"/></g>'), /plain disc/],
    ['a far leg over the near one', figure({ parts: [blob('leg-near', 245, 395, 50, 150), blob('leg-far', 305, 395, 50, 150), blob('body', 220, 240, 160, 170), `<g id="arm-far"><path d="M360 250L450 345L420 370L338 285Z" fill="#fff" stroke="#141414" stroke-width="6"/></g>`, `<g id="arm-near"><path d="M240 250L150 345L180 370L262 285Z" fill="#fff" stroke="#141414" stroke-width="6"/></g>`, blob('head', 215, 60, 170, 180), blob('ear-a', 200, 130, 20, 40), blob('ear-b', 382, 130, 20, 40), blob('eye-a', 255, 130, 16, 22), blob('eye-b', 330, 130, 16, 22), blob('nose', 292, 170, 18, 14), blob('palm-x', 140, 330, 40, 40), blob('held-x', 150, 280, 16, 130), blob('fingers-x', 135, 340, 50, 24)], c: { bodyView: 'profile' } }), /far limb goes behind/],
    ['a second figure with no prefix', figure().replace('</svg>', '<desc id="construction-two">{"class":"person"}</desc></svg>'), /needs "prefix"/],
    ['feet off one line', figure().replace(/<g id="leg-far">[\s\S]*?<\/g>/, blob('leg-far', 305, 395, 50, 80)).replace('"knee_far":[330,470],"ankle_far":[330,540]', '"knee_far":[330,430],"ankle_far":[330,465]'), /one line/],
  ];
  for (const [name, src, want] of cases) {
    const got = await check(src);
    if (got.some((x) => want.test(x))) console.log(`ok   fires: ${name}`);
    else { console.log(`FAIL did not fire: ${name} (${got.join('; ') || 'nothing'})`); bad++; }
  }
  console.log(bad ? `art-rig selftest: ${bad} failing` : 'art-rig selftest: all pass');
  process.exitCode = bad ? 1 : 0;
}
module.exports = { check, groupsOf };
if (require.main === module && process.argv.includes('--selftest')) selftest();
