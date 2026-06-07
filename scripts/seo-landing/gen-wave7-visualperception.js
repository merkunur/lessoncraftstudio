#!/usr/bin/env node
/* Wave 7 COUPLED K — EN grid-match/(null) + missing-pieces/one-missing × Kindergarten, READINESS-class.
 * BOTH carry the SHARED new label "Visual perception (part-to-whole)" — differentiate on MECHANIC (boilerplate→
 * mode-true): grid-match = complete/fill a picture GRID by matching tiles; missing-pieces = find the ONE MISSING piece
 * that completes the picture. Disjoint mechanic lexicon (grid/fill/tile vs missing/gap/cutout); shared only the bare
 * label + "visual perception / careful looking / part-and-whole" core. NO educationalAlignment (no `standard`). No
 * math/geometry over-claim (perceptual, not K.G); no count/sort leak (off chart-count + picture-sort faces).
 * 8 P1 x 7 P2 EACH = 56 > 47/48. Usage: node scripts/seo-landing/gen-wave7-visualperception.js
 */
const fs = require('fs');
const EN = 'frontend/content/seo-landing/en.json';
const litA = fs.readFileSync('scripts/seo-landing/gen-wave4-literacyA.js', 'utf8');
const THEMES = (function () { const m = litA.match(/const THEMES = (\{[\s\S]*?\n\});/); if (!m) throw new Error('THEMES extract failed'); return eval('(' + m[1] + ')'); })();

// ---- grid-match: GRID-FILL / matching-puzzle ----
const GM_SKEL = [
  (n,g)=>`This Kindergarten matching puzzle worksheet asks a child to complete a picture grid with ${g}. Some squares of the grid are filled and some are empty, and the child works out which tile belongs in each empty square to finish the grid. Reading where each tile sits in the layout — the ${n} and how the grid lines up — is spatial-arrangement practice, a readiness skill, with nothing to read or count.`,
  (n,g)=>`Complete the grid! On this Kindergarten worksheet a child fills a picture grid of ${g}, placing the right tile in each empty square. The task is to take in the layout, see which positions are open, and fit each tile into its place. Filling a grid this way — arranging ${n} into their spots — builds a sense of spatial structure, and the familiar pictures keep the puzzle inviting.`,
  (n,g)=>`Which tile fits where? This Kindergarten matching puzzle lays out a grid of ${g} with some squares empty, and the child completes it by placing each tile in the square where it belongs. Working out where each tile goes in the layout — the ${n} and their positions — is spatial-arrangement practice, the readiness skill of reading a structure. There are no numbers or letters; the task is completing the grid.`,
  (n,g)=>`This Kindergarten worksheet is a picture-grid puzzle with ${g}: the child fills the empty squares of the grid by fitting each tile into its position. Working out where the ${n} belong in the layout builds the spatial sense young children develop by arranging pieces into a structure. It is a hands-on matching puzzle, ready to print or play online, with nothing to count.`,
  (n,g)=>`Fill in the picture grid. On this Kindergarten matching puzzle a child completes a grid of ${g}, placing each tile in the right square. Fitting tiles into their positions — reading where the ${n} belong in the layout — is spatial-arrangement readiness, the skill of completing an ordered structure. The familiar pictures keep the grid fun to complete, and there is nothing to read.`,
  (n,g)=>`This picture-grid puzzle gives a Kindergarten child practice completing a grid of ${g} by fitting tiles into place. The child takes in the layout, finds which positions are open, and places the tile that belongs in each. Filling a grid this way — arranging ${n} into their spots — builds spatial-placement sense, and the cheerful pictures keep the matching puzzle approachable.`,
  (n,g)=>`Complete the matching grid. On this Kindergarten worksheet a child fills a picture grid of ${g}, working out which tile belongs in each empty square. Reading the layout and fitting every tile to its position — the ${n} and where they sit — is spatial-arrangement practice, a foundational readiness skill built on reading structure. The puzzle prints cleanly or plays online, with no numbers involved.`,
  (n,g)=>`A picture-grid matching puzzle for Kindergarten: the child completes a grid of ${g} by placing each tile in the square where it fits. Reading the layout — arranging ${n} into their positions — builds the spatial sense young learners grow by fitting pieces into a structure. The familiar pictures keep the grid inviting, and the task is pure tile-placement, with nothing to read or count.`,
];
const GM_P2 = [
  (g)=>`A grid puzzle is a small lesson in spatial arrangement: a child sees a layout with open squares and works out where each tile belongs within it. Placing tiles into their right spots trains a child to read position and structure — where a piece sits relative to the others around it. A grid of ${g} makes that spatial-completion practice concrete and playful, one well-placed tile at a time.`,
  (g)=>`Completing a grid asks a child to think about layout — to take in the whole arrangement and slot each tile into the position that finishes it. That sense of where things belong in a structured space is an early spatial skill, grown by doing rather than telling, and a grid of ${g} keeps it firmly hands-on. The child reads the layout, places each tile, and the grid comes together.`,
  (g)=>`The grid itself does the teaching: its rows and columns give a child a frame to complete, square by square. Working out which tile fills each open spot — fitting pieces into an ordered layout — builds spatial-arrangement sense, the kind of position-reading that supports later math and map work. With ${g} filling the grid, that structure stays concrete and inviting for a young learner.`,
  (g)=>`Slotting tiles into a grid is all about position: the child reads the layout and decides where each piece sits to complete the arrangement. Placing parts within a whole structure is spatial reasoning a child grows hands-on, and a grid of ${g} gives clear, playful practice in it. Each tile that clicks into its square finishes a little more of the layout.`,
  (g)=>`A grid gives a child a frame to fill — open squares each waiting for the one tile that belongs there. Deciding where every piece goes within that layout builds a feel for spatial structure: how parts arrange into an orderly whole. This grid of ${g} keeps the practice simple and hands-on, and a child completes the arrangement square by square.`,
  (g)=>`Filling a grid trains a child to match a piece to a position — to spot the open square in the layout and place the tile that completes it there. That spatial-placement sense is foundational early-learning, grown through arranging things by hand, and a grid of ${g} makes it approachable. The child reads the structure, fits each tile, and the picture-grid is finished.`,
  (g)=>`Completing a picture grid is hands-on practice in spatial arrangement: taking in a layout and placing each tile where it belongs to finish the structure. For a young child that position-and-layout sense is real readiness, built by arranging pieces, and a grid of ${g} keeps every placement clear. The grid teaches where things go, square by square.`,
];
function gmP3(nb){ return `Children enjoy snapping the last tile into a grid and seeing the picture complete, and a finished puzzle feels satisfying. When this is easy, complete the grid in ${nb[0]}, or try ${nb[1]}. You can also browse every matching puzzle or the whole kindergarten collection — each sheet prints cleanly or plays online for free, and the more grids a child completes, the sharper their eye for how the tiles fit together.`; }

// ---- missing-pieces: MISSING-CUTOUT / what's-missing ----
const MP_SKEL = [
  (n,g)=>`This Kindergarten worksheet asks: what is missing from the picture? A picture of ${g} has one piece cut out, leaving a gap, and the child finds the piece that completes it from a set of choices. Working out which piece fills the gap — imagining the ${n} whole again to see what belongs there — is whole-and-absence practice, a readiness skill, with nothing to read or count.`,
  (n,g)=>`Find the missing piece! On this Kindergarten worksheet a picture of ${g} has a piece missing, and the child picks the cutout that completes it. The task is to picture the whole image, see the gap, and choose what restores it. Completing a picture this way — imagining the ${n} as they should be — builds early inference, and the familiar pictures keep it inviting.`,
  (n,g)=>`Which piece is missing? This Kindergarten worksheet shows a picture of ${g} with one piece removed, and the child finds the cutout that fills the gap. Picturing the whole and working out exactly what is absent from the ${n} is early inference, the readiness skill of reasoning from part to whole. There are no numbers or letters; the task is completing the picture.`,
  (n,g)=>`This Kindergarten worksheet is a what-is-missing puzzle with ${g}: a piece is cut from the picture, and the child chooses the one that completes it. Imagining what belongs in the gap — the absent part of the ${n} — builds the part-from-whole reasoning young children develop by completing broken pictures. It is a hands-on puzzle, ready to print or play online, with nothing to count.`,
  (n,g)=>`What completes the picture? On this Kindergarten worksheet a picture of ${g} is missing a piece, and the child picks the cutout that fills the empty space. Finding the piece that belongs — holding the whole ${n} in mind to sense what is gone — is whole-completion readiness, the skill of restoring an image. The familiar pictures keep the puzzle fun, with nothing to read.`,
  (n,g)=>`This missing-piece puzzle gives a Kindergarten child a picture of ${g} with one piece gone, and asks which cutout completes it. The child pictures the whole, spots the gap, and chooses the matching piece. Restoring what is absent — making the ${n} whole again — builds the inference young children use to sense what is missing, and the cheerful pictures keep the puzzle approachable.`,
  (n,g)=>`Complete the picture. On this Kindergarten worksheet a piece is missing from a picture of ${g}, and the child finds the cutout that fits the gap. Working out what is absent from the empty space — the missing part of the ${n} — is absence-detection practice, a foundational readiness skill built on imagining the whole. The puzzle prints cleanly or plays online, with no numbers.`,
  (n,g)=>`A what-is-missing puzzle for Kindergarten: a picture of ${g} has a piece cut out, and the child chooses the one that completes it. Imagining the gap filled — restoring the absent part of the ${n} — builds the part-from-whole reasoning young learners grow by completing broken pictures. The familiar pictures keep it inviting, and the task is pure find-the-missing-piece, with nothing to read or count.`,
];
const MP_P2 = [
  (g)=>`A missing-piece puzzle is a small lesson in seeing a whole: a child looks at a picture broken by a gap and works out what is no longer there. Picturing the part that is gone — then choosing the cutout that restores it — trains a child to hold a complete image in mind and notice what spoils it. A ${g} picture makes that whole-and-absence thinking concrete for a young learner.`,
  (g)=>`Finding what is gone asks a child to imagine a picture as it should be, then spot the part that is absent. Holding the whole image in mind and recognising the gap is early inference — reasoning from what is present to what is missing — and a ${g} picture keeps it hands-on. The child pictures the complete image, finds the gap, and chooses the piece that makes it whole again.`,
  (g)=>`The gap is the puzzle: a child meets an incomplete picture and has to know what belongs in the empty space. Imagining the absent part and picking the piece that restores the whole builds a child's sense of completeness — what a finished image looks like, and what a hole takes away from it. With a ${g} picture, that absence-and-whole reasoning stays concrete and inviting.`,
  (g)=>`Spotting a missing piece asks a child to compare the broken picture against the whole it should be — to single out the one part that is absent. That whole-versus-part reasoning is early visual inference, grown by puzzling it out, and a ${g} picture gives a young learner clear practice. The child holds the complete image in mind, locates the gap, and fills it back in.`,
  (g)=>`An incomplete picture invites a child to finish it: see the empty space, imagine what is gone, and choose the piece that brings the image back to whole. Reasoning from the part that is present to the part that is missing builds early inference, and a ${g} picture keeps the practice simple and hands-on. Each found piece restores a little more of the whole.`,
  (g)=>`Finding the missing piece trains a child to detect absence — to look at a whole picture, sense that something is gone, and work out exactly what. That noticing-what-is-absent is a genuine reasoning skill, built by completing broken pictures, and a ${g} picture makes it approachable. The child pictures the complete image and restores the part that is missing.`,
  (g)=>`Completing a picture by its missing piece is hands-on inference: imagining the whole, locating the gap, and choosing the part that fills it. For a young child that whole-and-absence thinking is real readiness, grown by puzzling out what is gone, and a ${g} picture keeps every gap clear. The puzzle teaches a child to sense what a complete image needs.`,
];
function mpP3(nb){ return `Children love finding the piece that makes a picture whole again, and completing the puzzle feels satisfying. When this is easy, find the missing piece in ${nb[0]}, or try ${nb[1]}. You can also browse every missing-piece puzzle or the whole kindergarten collection — each sheet prints cleanly or plays online for free, and the more pictures a child completes, the sharper their eye grows for what is missing and what it takes to make a picture whole again.`; }

function gcd(a,b){ while(b){ const t=a%b; a=b; b=t; } return a; }
function coprimeStride(cells){ let k=Math.max(2,Math.round(cells*0.6180339887)); for(let d=0;d<cells;d++) for(const cand of [k+d,k-d]) if(cand>1&&cand<cells&&gcd(cand,cells)===1) return cand; return 1; }
function cellAssign(i,S,P){ const cells=S*P, stride=coprimeStride(cells); const c=((i%cells)*stride)%cells; return {skel:c%S, p2:Math.floor(c/S)%P}; }

function buildType(cfg) {
  const COORDS = JSON.parse(fs.readFileSync(cfg.manifest, 'utf8')).coordinates;
  const list = COORDS.slice().filter(co=>!!THEMES[co.theme]).sort((a,b)=> a.theme<b.theme?-1:1);
  const slugOf = (co)=> co.siblings.length>1 ? `${cfg.prefix}-${co.slugTheme}-kindergarten` : co.canonical;
  const cells = cfg.SKEL.length * cfg.P2.length;
  console.log(cells > list.length ? `  [invariant OK] ${cfg.type}: ${cfg.SKEL.length}x${cfg.P2.length}=${cells} > breadth ${list.length}` : `  [INVARIANT WARN] ${cfg.type} ${cells} <= ${list.length}`);
  return list.map((co,i)=>{
    const d = THEMES[co.theme];
    const cell = cellAssign(i, cfg.SKEL.length, cfg.P2.length);
    const nbA=list[(i+1)%list.length], nbB=list[(i+5)%list.length];
    const nb=[ `${cfg.nbLabel} ${THEMES[nbA.theme].h1.toLowerCase()}`, `${cfg.nbLabel} ${THEMES[nbB.theme].h1.toLowerCase()}` ];
    const entry = {
      slug: slugOf(co), variantShape: co.siblings.length>1?'collapsed':'singleton',
      coordinate: { type:cfg.type, mode:cfg.mode, theme:co.theme, level:'kindergarten' },
      eyebrow: cfg.eyebrow, h1: cfg.h1(d.h1),
      strand: 'Visual perception (part-to-whole)',
      slotTokens: d.nouns.replace(/ and /g,', ').split(', ').map(s=>s.replace(/^(a|an|the) /,'').trim()).concat([d.gen, co.theme.replace(/_/g,' '), 'kindergarten'].concat(cfg.tokens)),
      p1: cfg.SKEL[cell.skel](d.nouns, d.gen), p2: cfg.P2[cell.p2](d.gen), p3: cfg.p3(nb),
      canonicalDeckSlug: co.canonical,
      carousel: [1,2,5,11].map(k=>({label:`${cfg.cLabel}${THEMES[list[(i+k)%list.length].theme].h1}`, href: slugOf(list[(i+k)%list.length])})),
    };
    if (co.siblings.length>1) entry.collapseSiblings = co.siblings;
    return entry;
  });
}

const gm = buildType({ type:'grid-match', mode:null, manifest:'scripts/seo-landing/wave7-gridmatch-coordinates.json', prefix:'grid-match', SKEL:GM_SKEL, P2:GM_P2, p3:gmP3, eyebrow:'Matching Puzzle Worksheet', h1:(h)=>`Grid Matching Puzzle with ${h}`, nbLabel:'grid matching puzzle with', cLabel:'Grid Matching Puzzle with ', tokens:['grid puzzle','matching puzzle'] });
const mp = buildType({ type:'missing-pieces', mode:'one-missing', manifest:'scripts/seo-landing/wave7-missingpieces-coordinates.json', prefix:'missing-pieces', SKEL:MP_SKEL, P2:MP_P2, p3:mpP3, eyebrow:'Missing Pieces Worksheet', h1:(h)=>`What's Missing with ${h}`, nbLabel:"what's missing with", cLabel:"What's Missing with ", tokens:['missing piece','missing pieces'] });
const out = gm.concat(mp);

const cur = JSON.parse(fs.readFileSync(EN,'utf8'));
const keep = cur.landings.filter(l => l.coordinate.type!=='grid-match' && l.coordinate.type!=='missing-pieces');
const merged = { _note: cur._note + ` [Wave 7 coupled-K visual-perception: grid-match ${gm.length} + missing-pieces ${mp.length} /K readiness (Visual perception (part-to-whole)); mode-true grid-fill vs missing-cutout.]`, landings: keep.concat(out) };
fs.writeFileSync(EN, JSON.stringify(merged, null, 2) + '\n');
console.log(`generated grid-match ${gm.length} + missing-pieces ${mp.length} = ${out.length}; total landings now ${merged.landings.length}`);
let short=0, fence=0, banned=0, sortl=0, mg=0, hasStd=0, notK=0;
const FENCE=['count how','how many','classify and count','tally','count the','count each','chart the','chart each'];
const BAN=['fun and engaging','perfect for','great for','dive into','engaging','captivating','unlock','boost','supercharge','easy and fun','one of the earliest','ideal for'];
const SORTLEAK=['sort','group','categor','classif'];
const MATHGEO=['math skill','number sense','counting skill','addition','subtraction','arithmetic','place value','geometry','name the shape','identify shapes','position words'];
out.forEach(e=>{const body=(e.p1+' '+e.p2+' '+e.p3); const lc=body.toLowerCase(); const w=body.split(/\s+/).filter(Boolean).length;
  if(w<200){short++; console.log(`  SHORT ${e.slug}: ${w}`);}
  FENCE.forEach(x=>{if(lc.includes(x)){fence++;console.log(`  FENCE-LEAK ${e.slug}: "${x}"`);}});
  BAN.forEach(x=>{if(lc.includes(x)){banned++;console.log(`  BANNED ${e.slug}: "${x}"`);}});
  SORTLEAK.forEach(x=>{if(lc.includes(x)){sortl++;console.log(`  SORT-LEAK ${e.slug}: "${x}"`);}});
  MATHGEO.forEach(x=>{if(lc.includes(x)){mg++;console.log(`  MATH/GEO ${e.slug}: "${x}"`);}});
  if('standard' in e){hasStd++;console.log(`  HAS-STANDARD ${e.slug}`);}
  if(e.coordinate.level!=='kindergarten'){notK++;}
});
console.log(short?`${short} short`:'all >=200 words', '|', fence?`${fence} count-fence`:'fence clean', '|', banned?`${banned} banned`:'no banned', '|', sortl?`${sortl} sort-leak`:'no sort-leak', '|', mg?`${mg} math/geo`:'no math/geo over-claim', '|', hasStd?`${hasStd} HAS-STD`:'all readiness', '|', notK?`${notK} NOT-K`:'all level kindergarten');