#!/usr/bin/env node
/* Wave 6 FINAL — EN shadow-match/find-shadow × Kindergarten, READINESS-class. Silhouette-matching (perceptual visual
 * discrimination). NO educationalAlignment (no `standard` key). strand "Visual discrimination (readiness)" (REUSED —
 * shared w/ bingo + find-objects). MATCH mechanic (object↔shadow) — SHADOW-LEXICON FENCE: match/shadow/silhouette/
 * outline; NOT sort/group/classify (off picture-sort) or count-framing (off chart-count). NO math/geometry over-claim
 * (perceptual shape-matching, not K.G shape-naming). 8 P1 x 7 P2 = 56 > 48. ALL collapse (~2.9x).
 * Usage: node scripts/seo-landing/gen-wave6-shadowmatch.js
 */
const fs = require('fs');
const EN = 'frontend/content/seo-landing/en.json';
const COORDS = JSON.parse(fs.readFileSync('scripts/seo-landing/wave6-shadowmatch-coordinates.json', 'utf8')).coordinates;
const litA = fs.readFileSync('scripts/seo-landing/gen-wave4-literacyA.js', 'utf8');
const THEMES = (function () { const m = litA.match(/const THEMES = (\{[\s\S]*?\n\});/); if (!m) throw new Error('THEMES extract failed'); return eval('(' + m[1] + ')'); })();

const SKEL = [
  (n,g)=>`This Kindergarten shadow matching worksheet asks a child to pair each ${g} picture with its shadow. On one side are full-color pictures — ${n} and more — and on the other are dark silhouettes; the child draws a line from each picture to the matching outline. Looking past color and detail to match an object to its shape is visual-discrimination practice, a key readiness skill, with nothing to read or count.`,
  (n,g)=>`Match each picture to its shadow! On this sheet a child pairs ${g} pictures with their silhouettes. The child studies the outline of each shadow — a dark shape with no color — and finds the picture that fits it, from ${n} to the rest. Matching an object to its shadow trains a child to recognize shapes by their outline, a foundational visual-discrimination skill for Kindergarten.`,
  (n,g)=>`Which shadow belongs to which picture? This Kindergarten worksheet shows ${g} pictures beside their shadows, and the child connects each one to its matching silhouette. Recognizing an object by its dark outline alone — telling ${n} apart by shape — is visual discrimination, the careful-looking readiness skill young children build. The familiar pictures keep the focus on the shape match.`,
  (n,g)=>`On this shadow matching sheet, a child pairs each ${g} picture with the silhouette that matches it. Looking at a shadow — just an outline, no color or detail — and finding which picture made it asks a child to attend to shape alone. That is foundational visual-discrimination practice, and using familiar ${g} like ${n} keeps every match about the outline. There is nothing to read or count.`,
  (n,g)=>`Find the matching shadow. This Kindergarten worksheet sets ${g} pictures across from their silhouettes, and the child draws a line linking each picture to its dark shape. Recognizing an object by its outline — matching ${n} and others to the right shadow — builds visual discrimination, the readiness skill of looking carefully at shape. Print it or play it online for free.`,
  (n,g)=>`This picture-and-shadow worksheet gives a Kindergarten child practice matching ${g} to their silhouettes. The child compares each shadow's outline to the pictures — ${n} among them — and pairs them up. Telling objects apart by their shape, without the help of color, is careful visual-discrimination work, a foundational readiness skill, and the familiar pictures keep the matching clear and fun.`,
  (n,g)=>`Pair each picture with its shadow. On this Kindergarten worksheet a child matches ${g} pictures to their outlines — the dark silhouettes that show only the shape. Working out which shadow belongs to which picture, from ${n} to the rest, is visual discrimination: looking past color to recognize an object by its outline. It is a key readiness skill, with no letters or numbers.`,
  (n,g)=>`A clean shadow matching worksheet for Kindergarten: ${g} pictures on one side, their silhouettes on the other, and the child links each pair. Recognizing an object from its outline alone — matching ${n} and more to the right dark shape — builds visual discrimination, the careful-looking skill young learners need. The sheet prints cleanly or plays online, with familiar pictures throughout.`,
];
const P2 = [
  (g)=>`Matching an object to its shadow is a focused visual-discrimination task: the child has to look past color and detail and recognize a thing by its outline alone. That careful looking is foundational Kindergarten readiness, the same attention-to-shape that helps with letters and reading later, and a set of familiar ${g} keeps the practice clear and inviting.`,
  (g)=>`Recognizing shapes by their silhouette trains a child to notice outline and form — the visual-discrimination skill underneath so much early learning. A shadow shows only the shape, so the child must compare carefully to find the match. With ${g} pictures, that careful looking stays concrete and approachable, with nothing to read along the way.`,
  (g)=>`The skill a shadow matching worksheet builds is visual discrimination: attending to an object's shape closely enough to pair it with its outline. For Kindergarten that careful-looking is core readiness, and matching ${g} to their silhouettes rehearses it in a clear, hands-on way. The child looks, compares, and links — no letters, no numbers, just the shape match.`,
  (g)=>`Pairing a picture with its shadow asks a child to ignore color and focus on form — a precise kind of looking that builds visual discrimination. That attention to outline is foundational Kindergarten readiness, supporting the shape-awareness reading and writing will need, and a set of familiar ${g} keeps the matching grounded and fun.`,
  (g)=>`Shadow matching is careful-looking practice: the child studies an outline and finds the object that cast it. Recognizing shapes by silhouette alone is genuine visual-discrimination readiness for Kindergarten, the same skill behind telling similar letters apart later. Using familiar ${g} keeps every match about the shape, in a task that feels like a gentle puzzle.`,
  (g)=>`The value of matching pictures to shadows is the close looking it demands — a child compares each silhouette's outline to the pictures and pairs them up. That visual-discrimination work is foundational Kindergarten readiness, built through hands-on practice, and a set of familiar ${g} makes it inviting. There is nothing to read or count, only shapes to match.`,
  (g)=>`Recognizing an object from just its outline is a real visual-discrimination skill, and a shadow matching worksheet rehearses it directly: look at the shape, find the picture that fits. For Kindergarten that careful attention to form is core readiness, and matching familiar ${g} to their silhouettes keeps the practice clear, concrete, and inviting for a young learner.`,
];
function p3(glower, nb){
  return `Children enjoy the click of finding which shadow fits, and a completed matching sheet feels satisfying. When this is easy, match the shadows in ${nb[0]}, or try ${nb[1]}. You can also browse every shadow matching worksheet or the whole kindergarten collection — each sheet prints cleanly or plays online for free, and the more shadows a child matches, the sharper their eye for shape and outline grows, one careful shape-and-shadow match at a time.`;
}

function gcd(a,b){ while(b){ const t=a%b; a=b; b=t; } return a; }
function coprimeStride(cells){ let k=Math.max(2,Math.round(cells*0.6180339887)); for(let d=0;d<cells;d++) for(const cand of [k+d,k-d]) if(cand>1&&cand<cells&&gcd(cand,cells)===1) return cand; return 1; }
function cellAssign(i,S,P){ const cells=S*P, stride=coprimeStride(cells); const c=((i%cells)*stride)%cells; return {skel:c%S, p2:Math.floor(c/S)%P}; }

function landingSlugOf(co){ return co.siblings.length > 1 ? `shadow-match-${co.slugTheme}-kindergarten` : co.canonical; }

const list = COORDS.slice().sort((a,b)=> a.theme<b.theme?-1:1);
const cells = SKEL.length * P2.length;
console.log(cells > list.length ? `  [invariant OK] shadow-match: ${SKEL.length}x${P2.length}=${cells} > breadth ${list.length} — zero forced same-cell collisions` : `  [INVARIANT WARN] ${cells} <= ${list.length}`);
const out=[]; let blocked=0;
list.forEach((co,i)=>{
  const d = THEMES[co.theme];
  if(!d){ console.log(`NO COPY DATA for ${co.theme}`); blocked++; return; }
  const cell = cellAssign(i, SKEL.length, P2.length);
  const nbA=list[(i+1)%list.length], nbB=list[(i+5)%list.length];
  const nb=[ `shadow matching with ${THEMES[nbA.theme].h1.toLowerCase()}`, `shadow matching with ${THEMES[nbB.theme].h1.toLowerCase()}` ];
  const entry = {
    slug: landingSlugOf(co),
    variantShape: co.siblings.length>1 ? 'collapsed' : 'singleton',
    coordinate: { type:'shadow-match', mode:'find-shadow', theme:co.theme, level:'kindergarten' },
    eyebrow: 'Shadow Matching Worksheet',
    h1: `Shadow Matching with ${d.h1}`,
    strand: 'Visual discrimination (readiness)',
    slotTokens: d.nouns.replace(/ and /g,', ').split(', ').map(s=>s.replace(/^(a|an|the) /,'').trim()).concat([d.gen, co.theme.replace(/_/g,' '), 'kindergarten', 'shadow matching', 'silhouette']),
    p1: SKEL[cell.skel](d.nouns, d.gen),
    p2: P2[cell.p2](d.gen),
    p3: p3(d.gen.toLowerCase(), nb),
    canonicalDeckSlug: co.canonical,
    carousel: [
      {label:`Shadow Matching with ${THEMES[list[(i+1)%list.length].theme].h1}`, href: landingSlugOf(list[(i+1)%list.length])},
      {label:`Shadow Matching with ${THEMES[list[(i+2)%list.length].theme].h1}`, href: landingSlugOf(list[(i+2)%list.length])},
      {label:`Shadow Matching with ${THEMES[list[(i+5)%list.length].theme].h1}`, href: landingSlugOf(list[(i+5)%list.length])},
      {label:`Shadow Matching with ${THEMES[list[(i+11)%list.length].theme].h1}`, href: landingSlugOf(list[(i+11)%list.length])},
    ],
  };
  if (co.siblings.length>1) entry.collapseSiblings = co.siblings;
  out.push(entry);
});

const cur = JSON.parse(fs.readFileSync(EN,'utf8'));
const keep = cur.landings.filter(l => l.coordinate.type !== 'shadow-match');
const merged = { _note: cur._note + ' [Wave 6 shadow-match: '+out.length+' /K readiness (Visual discrimination (readiness) reused); silhouette-match pairing; shadow-lexicon fence.]', landings: keep.concat(out) };
fs.writeFileSync(EN, JSON.stringify(merged, null, 2) + '\n');
console.log(`generated ${out.length} shadow-match landings (blocked ${blocked}); total landings now ${merged.landings.length}`);
let short=0, fence=0, banned=0, sortl=0, mg=0, hasStd=0;
const FENCE=['count how','how many','classify and count','tally','count the','count each','chart the','chart each'];
const BAN=['fun and engaging','perfect for','great for','dive into','engaging','captivating','unlock','boost','supercharge','easy and fun','one of the earliest','ideal for'];
const SORTLEAK=['sort','group','categor','classif']; // keep off picture-sort's sorting face
const MATHGEO=['math skill','number sense','counting skill','addition','subtraction','arithmetic','place value','geometry','name the shape','identify shapes','position words'];
out.forEach(e=>{const body=(e.p1+' '+e.p2+' '+e.p3); const lc=body.toLowerCase(); const w=body.split(/\s+/).filter(Boolean).length;
  if(w<200){short++; console.log(`  SHORT ${e.slug}: ${w}`);}
  FENCE.forEach(x=>{if(lc.includes(x)){fence++;console.log(`  FENCE-LEAK ${e.slug}: "${x}"`);}});
  BAN.forEach(x=>{if(lc.includes(x)){banned++;console.log(`  BANNED ${e.slug}: "${x}"`);}});
  SORTLEAK.forEach(x=>{if(lc.includes(x)){sortl++;console.log(`  SORT-LEAK ${e.slug}: "${x}"`);}});
  MATHGEO.forEach(x=>{if(lc.includes(x)){mg++;console.log(`  MATH/GEO-OVERCLAIM ${e.slug}: "${x}"`);}});
  if('standard' in e){hasStd++;console.log(`  HAS-STANDARD ${e.slug}`);}
});
console.log(short?`${short} short`:'all >=200 words', '|', fence?`${fence} count-fence`:'fence clean', '|', banned?`${banned} banned`:'no banned', '|', sortl?`${sortl} sort-leak`:'no sort-leak (off picture-sort face)', '|', mg?`${mg} math/geo-overclaim`:'no math/geo over-claim', '|', hasStd?`${hasStd} HAS-STANDARD`:'all readiness (Visual discrimination)');