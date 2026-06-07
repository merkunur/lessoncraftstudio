#!/usr/bin/env node
/* Wave 6 — EN picture-trail/pathway × Kindergarten, READINESS-class. The EN emission of picture-path (§15.10).
 * pathway = trace a path/trail from start to finish through a grid (path-finding; NOT a walled maze). NO
 * educationalAlignment (no `standard` key). strand "Spatial reasoning (readiness)" (REUSED). Copy-guard: maze/path/
 * trace/route lexicon; NO over-claim into a math OR geometry (K.G) skill — it is path-finding, not shapes/positions.
 * 8 P1 x 7 P2 = 56 > 48 (coprime + guard). Usage: node scripts/seo-landing/gen-wave6-picturetrail.js
 */
const fs = require('fs');
const EN = 'frontend/content/seo-landing/en.json';
const COORDS = JSON.parse(fs.readFileSync('scripts/seo-landing/wave6-picturetrail-coordinates.json', 'utf8')).coordinates;
const litA = fs.readFileSync('scripts/seo-landing/gen-wave4-literacyA.js', 'utf8');
const THEMES = (function () { const m = litA.match(/const THEMES = (\{[\s\S]*?\n\});/); if (!m) throw new Error('THEMES extract failed'); return eval('(' + m[1] + ')'); })();

const SKEL = [
  (n,g)=>`This Kindergarten maze worksheet asks a child to trace a path through a grid of ${g}, following the trail from start to finish. The child uses a finger or a pencil to find the way along the route, moving from picture to picture — past ${n} and more — without lifting off the path. Tracing a route like this builds spatial reasoning and fine-motor control, foundational readiness skills, and there is nothing to read or count.`,
  (n,g)=>`Find the way from start to finish! On this picture maze a child traces a path through ${g}, following the trail one step at a time. Working out which way to go — and keeping a finger or pencil on the route past ${n} and others — builds spatial reasoning and careful tracing, key early-readiness skills. The familiar pictures make the path inviting, and the sheet prints cleanly or plays online for free.`,
  (n,g)=>`Can you trace the path? This Kindergarten maze worksheet lays out a trail through ${g}, and the child follows it from the start, step by step, to the finish. Tracing a route across a grid — moving past pictures like ${n} along the way — develops spatial reasoning and hand control, foundational readiness. There are no numbers and no letters; the task is finding and following the way.`,
  (n,g)=>`A simple picture maze for Kindergarten: a winding path through ${g} that the child traces from start to end. Following the route — keeping on the trail past ${n} and more — builds spatial-reasoning and fine-motor skills, the kind of readiness a young child develops through hands-on practice. The maze prints cleanly or plays online, and the familiar pictures keep the path fun to follow.`,
  (n,g)=>`Trace the trail through the pictures. This Kindergarten maze worksheet sets a path through ${g}, and the child finds the way from start to finish, following it without straying off. That route-finding and tracing — past pictures like ${n} — grows spatial reasoning and pencil control, foundational early-readiness skills, with nothing to count or read. Print it or play it online for free.`,
  (n,g)=>`This picture maze gives a Kindergarten child a path to trace through ${g}, from a clear start to a finish. Following the winding route — keeping a finger or pencil on the trail past ${n} and others — builds the spatial reasoning and careful tracing young learners practise on the way to writing and reading. The maze is no-prep, ready to print or play online, with familiar pictures throughout.`,
  (n,g)=>`Follow the path from beginning to end. On this Kindergarten maze worksheet a child traces a route through ${g}, working out the way and staying on the trail. Tracing a path across a grid — past pictures like ${n} — develops spatial reasoning and fine-motor control, foundational readiness skills, and the task is pure finding-the-way, with no letters or numbers involved.`,
  (n,g)=>`A winding picture maze for Kindergarten: the child traces a path through ${g}, from the start to the finish, following the trail past ${n} and more. Working out the route and keeping on the path builds spatial reasoning and hand control — early-readiness skills a child grows through doing. The maze prints cleanly or plays online for free, with familiar pictures making the way inviting.`,
];
const P2 = [
  (g)=>`Tracing a path through a maze is one of the classic readiness activities, and for good reason: it builds spatial reasoning — working out a route — alongside the fine-motor control a child needs for writing. Following a trail through ${g} gives a Kindergarten learner both at once, in a hands-on task that feels like play rather than work.`,
  (g)=>`Finding the way through a picture maze develops spatial thinking: the child plans a route, follows it, and adjusts. That route-finding is foundational readiness, the kind of problem-solving young children grow through doing, and a ${g} trail makes it concrete and inviting. There is nothing to read or count — just the path to trace.`,
  (g)=>`A maze worksheet trains two skills together: spatial reasoning (figuring out the way) and pencil control (staying on the path). For Kindergarten that pairing is valuable readiness practice, and a trail through familiar ${g} keeps a child engaged while building both. The hands-on tracing is exactly the kind of activity that prepares small hands for writing.`,
  (g)=>`Following a route from start to finish asks a child to think ahead and control their movement — spatial reasoning and fine-motor skill in one task. For Kindergarten that is core readiness, developed through doing rather than instruction, and a ${g} maze makes the practice playful. The familiar pictures keep the path clear and the child focused on finding the way.`,
  (g)=>`The value of a picture maze is how much it builds while feeling like a game: a child plans a path, traces it carefully, and reaches the end. That route-finding and hand control are foundational Kindergarten readiness, and a trail through ${g} gives a young learner hands-on practice with both. No letters, no numbers — just spatial thinking and careful tracing.`,
  (g)=>`Tracing through a maze develops the spatial reasoning a child uses to make sense of space and direction, plus the steady hand control writing will need. A ${g} trail offers that practice in an inviting, no-prep form, and a Kindergarten learner builds both skills simply by following the path from start to finish. It is readiness through play.`,
  (g)=>`A good maze gives a Kindergarten child practice in two foundational readiness skills at once — planning a route (spatial reasoning) and staying on the path (fine-motor control) — without a single number or letter. Following a trail through familiar ${g} keeps the task concrete and fun, and the hands-on tracing builds the kind of readiness young children grow best through doing.`,
];
function p3(glower, nb){
  return `Children love finding their way to the end of a maze, and reaching the finish feels like a win. When this is easy, trace the path in ${nb[0]}, or try ${nb[1]}. You can also browse every maze worksheet or the whole kindergarten collection — each sheet prints cleanly or plays online for free, and the more paths a child traces, the surer their sense of route and direction grows, one traced path at a time.`;
}

function gcd(a,b){ while(b){ const t=a%b; a=b; b=t; } return a; }
function coprimeStride(cells){ let k=Math.max(2,Math.round(cells*0.6180339887)); for(let d=0;d<cells;d++) for(const cand of [k+d,k-d]) if(cand>1&&cand<cells&&gcd(cand,cells)===1) return cand; return 1; }
function cellAssign(i,S,P){ const cells=S*P, stride=coprimeStride(cells); const c=((i%cells)*stride)%cells; return {skel:c%S, p2:Math.floor(c/S)%P}; }

function landingSlugOf(co){ return co.siblings.length > 1 ? `picture-trail-${co.slugTheme}-kindergarten` : co.canonical; }

const list = COORDS.slice().sort((a,b)=> a.theme<b.theme?-1:1);
const cells = SKEL.length * P2.length;
console.log(cells > list.length ? `  [invariant OK] picture-trail: ${SKEL.length}x${P2.length}=${cells} > breadth ${list.length} — zero forced same-cell collisions` : `  [INVARIANT WARN] ${cells} <= ${list.length}`);
const out=[]; let blocked=0;
list.forEach((co,i)=>{
  const d = THEMES[co.theme];
  if(!d){ console.log(`NO COPY DATA for ${co.theme}`); blocked++; return; }
  const cell = cellAssign(i, SKEL.length, P2.length);
  const nbA=list[(i+1)%list.length], nbB=list[(i+5)%list.length];
  const nb=[ `picture maze with ${THEMES[nbA.theme].h1.toLowerCase()}`, `picture maze with ${THEMES[nbB.theme].h1.toLowerCase()}` ];
  const entry = {
    slug: landingSlugOf(co),
    variantShape: co.siblings.length>1 ? 'collapsed' : 'singleton',
    coordinate: { type:'picture-trail', mode:'pathway', theme:co.theme, level:'kindergarten' },
    eyebrow: 'Maze Worksheet',
    h1: `Picture Maze with ${d.h1}`,
    strand: 'Spatial reasoning (readiness)',
    slotTokens: d.nouns.replace(/ and /g,', ').split(', ').map(s=>s.replace(/^(a|an|the) /,'').trim()).concat([d.gen, co.theme.replace(/_/g,' '), 'kindergarten', 'maze', 'picture maze']),
    p1: SKEL[cell.skel](d.nouns, d.gen),
    p2: P2[cell.p2](d.gen),
    p3: p3(d.gen.toLowerCase(), nb),
    canonicalDeckSlug: co.canonical,
    carousel: [
      {label:`Picture Maze with ${THEMES[list[(i+1)%list.length].theme].h1}`, href: landingSlugOf(list[(i+1)%list.length])},
      {label:`Picture Maze with ${THEMES[list[(i+2)%list.length].theme].h1}`, href: landingSlugOf(list[(i+2)%list.length])},
      {label:`Picture Maze with ${THEMES[list[(i+5)%list.length].theme].h1}`, href: landingSlugOf(list[(i+5)%list.length])},
      {label:`Picture Maze with ${THEMES[list[(i+11)%list.length].theme].h1}`, href: landingSlugOf(list[(i+11)%list.length])},
    ],
  };
  if (co.siblings.length>1) entry.collapseSiblings = co.siblings;
  out.push(entry);
});

const cur = JSON.parse(fs.readFileSync(EN,'utf8'));
const keep = cur.landings.filter(l => l.coordinate.type !== 'picture-trail');
const merged = { _note: cur._note + ' [Wave 6 picture-trail: '+out.length+' /K readiness (Spatial reasoning (readiness)); maze/path-trace; EN emission of picture-path.]', landings: keep.concat(out) };
fs.writeFileSync(EN, JSON.stringify(merged, null, 2) + '\n');
console.log(`generated ${out.length} picture-trail landings (blocked ${blocked}); total landings now ${merged.landings.length}`);
let short=0, fence=0, banned=0, mg=0, hasStd=0;
const FENCE=['count how','how many','classify and count','tally','count the','count each','chart the','chart each'];
const BAN=['fun and engaging','perfect for','great for','dive into','engaging','captivating','unlock','boost','supercharge','easy and fun','one of the earliest','ideal for'];
const MATHGEO=['math skill','number sense','counting skill','addition','subtraction','arithmetic','place value','geometry','name the shape','identify shapes','position words','above and below'];
out.forEach(e=>{const body=(e.p1+' '+e.p2+' '+e.p3); const lc=body.toLowerCase(); const w=body.split(/\s+/).filter(Boolean).length;
  if(w<200){short++; console.log(`  SHORT ${e.slug}: ${w}`);}
  FENCE.forEach(x=>{if(lc.includes(x)){fence++;console.log(`  FENCE-LEAK ${e.slug}: "${x}"`);}});
  BAN.forEach(x=>{if(lc.includes(x)){banned++;console.log(`  BANNED ${e.slug}: "${x}"`);}});
  MATHGEO.forEach(x=>{if(lc.includes(x)){mg++;console.log(`  MATH/GEO-OVERCLAIM ${e.slug}: "${x}"`);}});
  if('standard' in e){hasStd++;console.log(`  HAS-STANDARD ${e.slug}`);}
});
console.log(short?`${short} short`:'all >=200 words', '|', fence?`${fence} count-fence`:'fence clean', '|', banned?`${banned} banned`:'no banned', '|', mg?`${mg} math/geo-overclaim`:'no math/geometry over-claim', '|', hasStd?`${hasStd} HAS-STANDARD`:'all readiness (Spatial reasoning)');