#!/usr/bin/env node
/* Wave 7 COUPLED PRESCHOOL — EN big-small/findBig + big-small/orderAsc × Preschool, READINESS-class.
 * DISTINCT sub-skills (mode-true from the start — proactive, no shared "size readiness" boilerplate):
 *   findBig  = size COMPARISON (find the bigger/biggest)  → strand "Size comparison (readiness)"
 *   orderAsc = size SERIATION  (order smallest→biggest)   → strand "Size seriation (readiness)"
 * NO educationalAlignment (no `standard` — CCSS begins at K). NOT K.MD.A.2 "Comparing Length" (separate E2 activity) —
 * copy carries ZERO measurement vocabulary (no measure/length/ruler), the fence is positive. 8 P1 x 7 P2 each = 56 >
 * 51/50. Usage: node scripts/seo-landing/gen-wave7-bigsmall.js
 */
const fs = require('fs');
const EN = 'frontend/content/seo-landing/en.json';
const litA = fs.readFileSync('scripts/seo-landing/gen-wave4-literacyA.js', 'utf8');
const THEMES = (function () { const m = litA.match(/const THEMES = (\{[\s\S]*?\n\});/); if (!m) throw new Error('THEMES extract failed'); return eval('(' + m[1] + ')'); })();

// ---- findBig: size COMPARISON (bigger/biggest) ----
const FB_SKEL = [
  (n,g)=>`This preschool worksheet is all about big and small: a child looks at ${g} shown at different sizes and finds the bigger one in each pair. Comparing two pictures and deciding which is larger — is this ${n} bigger, or that one? — is one of a young child's first thinking moves. Weighing two sizes against each other and picking the larger is a quick, two-way comparison, with nothing to order and nothing to count.`,
  (n,g)=>`Which one is bigger? On this pre-K worksheet a child compares ${g} shown large and small, and picks the bigger one each time. Setting two sizes against each other and choosing the larger is a direct comparison — a child noticing that one ${n} takes up more space than the other. The whole task is that single bigger-or-smaller judgment, made again and again.`,
  (n,g)=>`Find the big one! This preschool worksheet shows ${g} at different sizes, and a child spots the biggest. Weighing the sizes and picking the largest — which ${n} is the big one? — is the simplest size judgment there is, a comparison a child makes well before counting. Each pick sharpens a young child's eye for the bigger of two pictures.`,
  (n,g)=>`Big or small? On this pre-K worksheet a child looks at pairs of ${g} and decides which is bigger. That simple comparison — holding two sizes side by side and choosing the larger ${n} — is one of the first ways a child sorts the world. The task is a single two-way call, bigger or smaller, with nothing to read and nothing to put in order.`,
  (n,g)=>`This preschool worksheet helps a child tell big from small with ${g}. Two pictures appear at different sizes, and the child finds the bigger one. Comparing the two — is this ${n} the big one or the small one? — is a quick, two-way size judgment a child sharpens by choosing the larger each time. The friendly pictures keep the comparing fun, and there is nothing to count.`,
  (n,g)=>`Spot the bigger picture. On this preschool worksheet a child compares ${g} shown large and small and picks the bigger one each time. Deciding which of two ${n} is larger is a direct, two-way comparison — weighing one size against the other and choosing. The worksheet keeps that single bigger-or-smaller call clear, and it prints cleanly or plays online for free.`,
  (n,g)=>`This pre-K worksheet asks a child to compare sizes: ${g} appear big and small, and the child finds the bigger one. Looking at two pictures and judging which ${n} is larger is one of a preschooler's first comparison moves, the bigger-versus-smaller call that comes before counting. The whole task is weighing the two and picking the larger, every time.`,
  (n,g)=>`A big-and-small worksheet for preschoolers: a child looks at ${g} at different sizes and chooses the bigger one. Comparing two sizes — which ${n} is big, which is small? — sharpens the quick, two-way judgment a child builds by choosing the larger of a pair. It needs no letters and no numbers, just the simple comparison of big and small.`,
];
const FB_P2 = [
  (g)=>`Comparing sizes is one of a child's earliest reasoning moves: holding two things side by side and judging which is bigger. A preschooler can tell a big ${g} from a small one well before counting, and picking the larger each time sharpens that judgment. The whole task is a single, clear comparison — bigger or smaller — repeated until a child's eye for which of two things is larger is quick and sure.`,
  (g)=>`Telling big from small is how a young child first weighs the world. Picking the bigger of two ${g} asks a preschooler to set one size against another and decide — a direct, two-way judgment. That bigger-versus-smaller call is a child's first step toward thinking about more and less, and it grows sharper every time a child chooses the larger picture of the two.`,
  (g)=>`Size comparison is the perfect first judgment task: a child looks at two ${g}, sees that one is bigger, and chooses it. There is nothing to order and nothing to count — just two sizes weighed against each other. Making that bigger-or-smaller call again and again builds the comparison sense, a preschooler's quick eye for which of two things is larger.`,
  (g)=>`Choosing the bigger picture trains a child to weigh one quality — size — between exactly two things. That focused, two-way comparison is a call a preschooler makes naturally and sharpens with practice. With ${g} shown big and small, the question stays simple: which of these two is larger? Each correct pick grows a child's confidence in judging size at a glance.`,
  (g)=>`Before a child counts, they compare — and bigger-versus-smaller is the very first comparison. Looking at two ${g} and deciding which is larger sharpens a preschooler's eye for size, the two-way judgment that comes before sequencing or counting. This worksheet makes that single comparison a game: weigh the two, pick the bigger one, every time.`,
  (g)=>`The skill a big-and-small worksheet builds is the comparison itself: judging which of two ${g} is bigger. For a preschooler that direct, two-way size call is a first step toward thinking about quantity. The task asks for no ordering and no counting — only a child's eye for the larger of two pictures — and it sharpens with every comparison made.`,
  (g)=>`Deciding which ${g} is bigger is concrete, two-way reasoning a preschooler can do with confidence. Setting two sizes against each other and picking the larger sharpens a child's comparison sense — the quick judgment of bigger and smaller. It is the simplest size call there is, repeated until a child reads which of two pictures is larger at a single glance.`,
];
function fbP3(nb){ return `Children feel clever spotting the bigger picture every time, and a finished big-and-small worksheet is a small win. When this is easy, compare the sizes in ${nb[0]}, or try ${nb[1]}. You can also browse every big-and-small worksheet or the whole preschool collection — each sheet prints cleanly or plays online for free, and the more a child compares big and small, the surer their eye for size grows, one comparison at a time.`; }

// ---- orderAsc: size SERIATION (smallest→biggest) ----
const OA_SKEL = [
  (n,g)=>`This preschool worksheet is about putting things in order by size: a child sees ${g} of different sizes and arranges them from smallest to biggest. Building a row by size — smallest first, then bigger, then biggest — asks a child to look across the whole set and decide what comes next as the sizes climb. Lining up ${n} in a size sequence is a step beyond comparing two, with nothing to read or count.`,
  (n,g)=>`Smallest to biggest! On this pre-K worksheet a child puts ${g} in order by size, from the smallest up to the largest. Arranging the whole set in a size sequence — working out which ${n} comes next as the row grows — asks a child to hold the order in mind, not just compare a pair. Building the size row, end to end, is ordering at its most concrete, with no numbers involved.`,
  (n,g)=>`Put them in size order. This preschool worksheet shows ${g} of different sizes, and a child arranges them from small to big. Building the row so it climbs steadily — placing each ${n} a step larger than the last — is sequencing a whole set, the move beyond a single bigger-or-smaller call. The child constructs the size order one placement at a time, with the pictures keeping it clear.`,
  (n,g)=>`From small to big. On this pre-K worksheet a child orders ${g} by size, building a row that climbs from the smallest to the largest. Deciding which ${n} comes next as the sizes grow asks a child to think about the whole sequence at once. Arranging the row in order is a richer move than comparing two, with nothing to read, just a set to place in sequence.`,
  (n,g)=>`This preschool worksheet helps a child arrange ${g} in order of size, smallest to biggest. The child looks across the whole set, finds the smallest, then the next, building the size sequence step by step. Constructing an ordered row of ${n} asks a child to hold the sequence in mind, the move past a single comparison. The friendly pictures keep the ordering fun, and there is nothing to count.`,
  (n,g)=>`Line them up by size. On this preschool worksheet a child puts ${g} in order from small to big, building the whole row in sequence. Placing each ${n} so the sizes climb in order asks a child to arrange a set, not just compare two — sequencing at its most concrete. The child constructs the size row end to end, and the worksheet prints cleanly or plays online for free.`,
  (n,g)=>`This pre-K worksheet asks a child to order by size: ${g} of different sizes, arranged smallest to biggest. Building the size sequence — placing each ${n} so the row grows step by step — asks a child to think across the whole set, the move beyond a two-way comparison. Constructing the ordered row is concrete sequencing, and the pictures keep every row clear.`,
  (n,g)=>`A size-ordering worksheet for preschoolers: a child arranges ${g} from smallest to biggest, building an orderly row. Sequencing the whole set — which ${n} comes next as the row grows? — asks a child to hold the order in mind, a step past comparing a pair. It needs no letters and no numbers, just a set to place in size sequence end to end.`,
];
const OA_P2 = [
  (g)=>`Putting things in order by size is a child's first experience of arranging a whole set along a sequence. Lining up ${g} from smallest to biggest asks a preschooler to look across the entire row — not just two items — and decide what comes next as the sizes climb. That ordering is a richer move than a single comparison: it builds the sense of a sequence, each item one step larger than the last.`,
  (g)=>`Arranging a set by size asks more of a child than comparing two: it asks them to hold the whole sequence in mind. Ordering ${g} from small to big means finding the smallest, then the next, then the next, building the row step by step. That sense of an ordered sequence is the groundwork for ordering numbers later, grown by arranging a whole row from one end to the other.`,
  (g)=>`Ordering by size teaches a child that a set can be laid out as a sequence, each item larger than the one before. Building a row of ${g} from smallest to biggest is sequencing in its most concrete form — the child decides where every item sits so the whole row climbs in order. That arranging-in-sequence move is a real step beyond a single bigger-or-smaller call.`,
  (g)=>`Arranging a set from small to big asks a child to think about a whole row at once — weighing each item against the others and placing it in its spot in the sequence. That is ordering, a meaningful step past comparing just two: it builds the sense of a graded sequence. With ${g} of different sizes, the child constructs the size row from smallest to largest, one placement at a time.`,
  (g)=>`Before a child orders numbers, they can order sizes — and arranging things smallest to biggest is sequencing at its most concrete. Lining up ${g} by size asks a preschooler to build a whole ordered row, deciding what comes next as it grows. That sequence-building is a step up from a two-way comparison, and the child grows it by arranging the row from one end to the other.`,
  (g)=>`The skill a size-ordering worksheet builds is sequencing: arranging a set in order by size. For a preschooler that is a clear step up from comparing two things — it asks a child to order a whole row, ${g} from smallest to biggest. Building that graded sequence is the groundwork for ordering and patterning, grown by placing each item in its spot along the row.`,
  (g)=>`Lining ${g} up from small to big is concrete sequencing a preschooler can watch take shape. Ordering a whole set by size builds the sense of a graded row — each item one step larger than the last — the arranging-in-order move that comes before counting sequences. The child constructs the row from smallest to biggest, each placement growing the sequence.`,
];
function oaP3(nb){ return `Children love building a neat row that climbs from smallest to biggest, and finishing the size order feels satisfying. When this is easy, put the sizes in order in ${nb[0]}, or try ${nb[1]}. You can also browse every size-ordering worksheet or the whole preschool collection — each sheet prints cleanly or plays online for free, and the more a child orders things by size, the surer their sense of sequence grows.`; }

function gcd(a,b){ while(b){ const t=a%b; a=b; b=t; } return a; }
function coprimeStride(cells){ let k=Math.max(2,Math.round(cells*0.6180339887)); for(let d=0;d<cells;d++) for(const cand of [k+d,k-d]) if(cand>1&&cand<cells&&gcd(cand,cells)===1) return cand; return 1; }
function cellAssign(i,S,P){ const cells=S*P, stride=coprimeStride(cells); const c=((i%cells)*stride)%cells; return {skel:c%S, p2:Math.floor(c/S)%P}; }

function buildMode(cfg) {
  const COORDS = JSON.parse(fs.readFileSync(cfg.manifest, 'utf8')).coordinates;
  const list = COORDS.slice().filter(co=>!!THEMES[co.theme]).sort((a,b)=> a.theme<b.theme?-1:1);
  const slugOf = (co)=> co.siblings.length>1 ? `big-small-${cfg.modeSlug}-${co.slugTheme}-preschool` : co.canonical;
  const cells = cfg.SKEL.length * cfg.P2.length;
  console.log(cells > list.length ? `  [invariant OK] big-small/${cfg.mode}: ${cfg.SKEL.length}x${cfg.P2.length}=${cells} > breadth ${list.length}` : `  [INVARIANT WARN] big-small/${cfg.mode} ${cells} <= ${list.length}`);
  return list.map((co,i)=>{
    const d = THEMES[co.theme];
    const cell = cellAssign(i, cfg.SKEL.length, cfg.P2.length);
    const nbA=list[(i+1)%list.length], nbB=list[(i+5)%list.length];
    const nb=[ `${cfg.nbLabel} ${THEMES[nbA.theme].h1.toLowerCase()}`, `${cfg.nbLabel} ${THEMES[nbB.theme].h1.toLowerCase()}` ];
    const entry = {
      slug: slugOf(co), variantShape: co.siblings.length>1?'collapsed':'singleton',
      coordinate: { type:'big-small', mode:cfg.mode, theme:co.theme, level:'preschool' },
      eyebrow: cfg.eyebrow, h1: cfg.h1(d.h1),
      strand: cfg.strand,
      slotTokens: d.nouns.replace(/ and /g,', ').split(', ').map(s=>s.replace(/^(a|an|the) /,'').trim()).concat([d.gen, co.theme.replace(/_/g,' '), 'preschool'].concat(cfg.tokens)),
      p1: cfg.SKEL[cell.skel](d.nouns, d.gen), p2: cfg.P2[cell.p2](d.gen), p3: cfg.p3(nb),
      canonicalDeckSlug: co.canonical,
      carousel: [1,2,5,11].map(k=>({label:`${cfg.cLabel}${THEMES[list[(i+k)%list.length].theme].h1}`, href: slugOf(list[(i+k)%list.length])})),
    };
    if (co.siblings.length>1) entry.collapseSiblings = co.siblings;
    return entry;
  });
}

const fb = buildMode({ mode:'findBig', modeSlug:'findbig', manifest:'scripts/seo-landing/wave7-bigsmallfindbig-coordinates.json', SKEL:FB_SKEL, P2:FB_P2, p3:fbP3, strand:'Size comparison (readiness)', eyebrow:'Big and Small Worksheet', h1:(h)=>`Big and Small with ${h}`, nbLabel:'big and small with', cLabel:'Big and Small with ', tokens:['big and small','bigger'] });
const oa = buildMode({ mode:'orderAsc', modeSlug:'orderasc', manifest:'scripts/seo-landing/wave7-bigsmallorderasc-coordinates.json', SKEL:OA_SKEL, P2:OA_P2, p3:oaP3, strand:'Size seriation (readiness)', eyebrow:'Size Ordering Worksheet', h1:(h)=>`Order by Size with ${h}`, nbLabel:'order by size with', cLabel:'Order by Size with ', tokens:['size ordering','seriation'] });
const out = fb.concat(oa);

const cur = JSON.parse(fs.readFileSync(EN,'utf8'));
const keep = cur.landings.filter(l => l.coordinate.type!=='big-small');
const merged = { _note: cur._note + ` [Wave 7 coupled-Preschool big-small: findBig ${fb.length} (Size comparison) + orderAsc ${oa.length} (Size seriation) /Preschool readiness; comparison vs seriation.]`, landings: keep.concat(out) };
fs.writeFileSync(EN, JSON.stringify(merged, null, 2) + '\n');
console.log(`generated findBig ${fb.length} + orderAsc ${oa.length} = ${out.length}; total landings now ${merged.landings.length}`);
let short=0, fence=0, banned=0, meas=0, mg=0, hasStd=0, notPre=0;
const FENCE=['count how','how many','classify and count','tally','count the','count each'];
const BAN=['fun and engaging','perfect for','great for','dive into','engaging','captivating','unlock','boost','supercharge','easy and fun','one of the earliest','ideal for'];
const MEAS=['measur','length','measurable','k.md','ruler',' units','centimet',' inches']; // no K.MD measurement over-claim
const MATHGEO=['math skill','number sense','counting skill','addition','subtraction','arithmetic','place value'];
out.forEach(e=>{const body=(e.p1+' '+e.p2+' '+e.p3); const lc=body.toLowerCase(); const w=body.split(/\s+/).filter(Boolean).length;
  if(w<200){short++; console.log(`  SHORT ${e.slug}: ${w}`);}
  FENCE.forEach(x=>{if(lc.includes(x)){fence++;console.log(`  FENCE-LEAK ${e.slug}: "${x}"`);}});
  BAN.forEach(x=>{if(lc.includes(x)){banned++;console.log(`  BANNED ${e.slug}: "${x}"`);}});
  MEAS.forEach(x=>{if(lc.includes(x)){meas++;console.log(`  MEASUREMENT-LEAK ${e.slug}: "${x}"`);}});
  MATHGEO.forEach(x=>{if(lc.includes(x)){mg++;console.log(`  MATH-OVERCLAIM ${e.slug}: "${x}"`);}});
  if('standard' in e){hasStd++;console.log(`  HAS-STANDARD ${e.slug}`);}
  if(e.coordinate.level!=='preschool'){notPre++;}
});
console.log(short?`${short} short`:'all >=200 words', '|', fence?`${fence} count-fence`:'fence clean', '|', banned?`${banned} banned`:'no banned', '|', meas?`${meas} MEASUREMENT-LEAK`:'no measurement-leak (off K.MD)', '|', mg?`${mg} math`:'no math', '|', hasStd?`${hasStd} HAS-STD`:'all readiness', '|', notPre?`${notPre} NOT-PRESCHOOL`:'all level preschool');