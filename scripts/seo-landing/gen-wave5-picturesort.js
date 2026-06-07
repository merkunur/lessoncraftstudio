#!/usr/bin/env node
/* Wave 5 — EN picture-sort/(null) "-vs-" PAIRS × Kindergarten, READINESS-class (Sorting & classification (readiness)).
 * SEO-capped 40 natural-contrast demand-bearing pairs. Each page sorts the pictures of TWO themes into 2 bins.
 * -vs- DIFFERENTIATION load-bearing: the body references the CONCRETE NOUNS of BOTH themes (not a template that swaps
 * theme names). NO educationalAlignment (no `standard` key → readiness render). CHART-COUNT FENCE: sort/categorize/
 * group lexicon ONLY, NEVER count-framing (count how many / tally / chart — reserved for chart-count K.MD.B.3).
 * 8 P1 x 7 P2 = 56 > 40 (coprime + guard). Usage: node scripts/seo-landing/gen-wave5-picturesort.js
 */
const fs = require('fs');
const EN = 'frontend/content/seo-landing/en.json';
const COORDS = JSON.parse(fs.readFileSync('scripts/seo-landing/wave5-picturesort-coordinates.json', 'utf8')).coordinates;
const litA = fs.readFileSync('scripts/seo-landing/gen-wave4-literacyA.js', 'utf8');
const THEMES = (function () { const m = litA.match(/const THEMES = (\{[\s\S]*?\n\});/); if (!m) throw new Error('THEMES extract failed'); return eval('(' + m[1] + ')'); })();

// (ln,rn)=left/right nouns, (lg,rg)=left/right gen-label. Both themes' concrete nouns appear → per-pair differentiation.
const SKEL = [
  (ln,rn,lg,rg)=>`This Kindergarten sorting worksheet mixes two kinds of pictures and asks the child to put each one where it belongs. The page shows ${lg} — ${ln} — jumbled together with ${rg} — ${rn} — and the child sorts them into two groups: one for the ${lg} and one for the ${rg}. Deciding which group each picture belongs to is early classifying, a thinking skill young children build by noticing what makes things alike or different. No counting — just looking and grouping.`,
  (ln,rn,lg,rg)=>`Two groups, one rule: each picture goes with its own kind. On this sheet the child sees ${ln} alongside ${rn}, and sorts every picture into the ${lg} pile or the ${rg} pile. Working out where each one belongs — is it one of the ${lg} or one of the ${rg}? — is the heart of early sorting, a readiness skill that helps a child organize the world. The pictures are familiar so the only question is which group.`,
  (ln,rn,lg,rg)=>`Sort the pictures into the right sets. This worksheet jumbles ${lg} (${ln}) with ${rg} (${rn}), and the child separates them into two groups by kind. Looking at each picture and asking "which group does this belong to?" builds classification — noticing the shared features that make the ${lg} one set and the ${rg} another. It is pure sorting, with no counting involved.`,
  (ln,rn,lg,rg)=>`Which pile does it go in? On this Kindergarten sorting page, ${ln} are mixed in with ${rn}, and the child puts each picture into either the ${lg} group or the ${rg} group. Grouping things by what they are — telling the ${lg} apart from the ${rg} — is a foundational thinking skill, and doing it with familiar pictures keeps the focus on the sorting itself rather than anything else.`,
  (ln,rn,lg,rg)=>`This sheet asks a child to tidy a jumble into two neat groups. The ${lg} — ${ln} — and the ${rg} — ${rn} — are all mixed together, and the child sorts each picture to its matching set. Categorizing pictures this way, by deciding what belongs with what, is early classification: a child learns to notice the features that group the ${lg} together and set them apart from the ${rg}. No counting, just careful sorting.`,
  (ln,rn,lg,rg)=>`Put each picture with its own kind. The child looks at a mix of ${ln} and ${rn} and sorts every one into the ${lg} group or the ${rg} group. The skill is grouping by category — recognizing what makes something one of the ${lg} versus one of the ${rg} — which is exactly the kind of organizing thinking Kindergarten builds. Familiar pictures keep the task about the sorting decision, never about counting.`,
  (ln,rn,lg,rg)=>`Two sets to fill, pictures to sort. This Kindergarten worksheet shows ${lg} and ${rg} together — ${ln} mixed with ${rn} — and the child groups each picture where it belongs. Telling the two kinds apart and putting like with like is early classifying, a thinking-readiness skill children use to make sense of everything around them. It is all about grouping, never counting or numbers.`,
  (ln,rn,lg,rg)=>`On this sorting sheet a child separates a jumble of pictures into two groups: the ${lg} and the ${rg}. With ${ln} mixed among ${rn}, the child decides for each picture which set it joins. That sort-by-kind reasoning — noticing what makes the ${lg} alike and different from the ${rg} — is foundational classifying for Kindergarten, and the familiar pictures keep the whole task about grouping.`,
];
const P2 = [
  (lg,rg)=>`Sorting pictures into groups is among the very first thinking skills a child develops, and it is genuine Kindergarten readiness — a child has to notice the features that make things alike and use them to decide what belongs together. Grouping ${lg} apart from ${rg} rehearses exactly that, and using familiar pictures keeps the focus on the sorting decision rather than on anything harder.`,
  (lg,rg)=>`Putting like things together — all the ${lg} in one set, all the ${rg} in another — teaches a child to categorize, the foundation of how we organize information. For Kindergarten that classifying skill matters across every subject, and a picture-sort sheet rehearses it cleanly: look at each one, decide its group, place it. There is nothing to add up — just sorting.`,
  (lg,rg)=>`The skill here is grouping by kind, not adding anything up: the child decides what each picture is and which set it joins. Telling ${lg} from ${rg} builds the noticing-and-categorizing thinking young children are developing, and the pictures keep it concrete and doable. It is sorting practice, pure and simple, a clean readiness exercise.`,
  (lg,rg)=>`Classification begins with simple two-group sorts like this one. A child learns to look past surface details to what really groups the ${lg} together and separates them from the ${rg}. That is core Kindergarten readiness — organizing things by category — and the familiar pictures make every decision about the sorting, not about figuring out what the picture is.`,
  (lg,rg)=>`Deciding whether a picture belongs with the ${lg} or the ${rg} asks a child to compare, notice shared features, and group accordingly. That comparing-and-grouping is real thinking-readiness for Kindergarten, and a two-set sort keeps it simple enough to do confidently. The whole task is the sorting choice — no numbers at all, just two groups to fill with the right pictures.`,
  (lg,rg)=>`A good sort teaches a child to organize: gather the ${lg} into one group, the ${rg} into another, by recognizing what each one is. For Kindergarten that categorizing skill is foundational, used whenever a child makes sense of a mixed-up set of things. The familiar pictures keep the practice grounded in deciding which group, not in anything harder.`,
  (lg,rg)=>`Grouping by category — every one of the ${lg} with the ${lg}, every one of the ${rg} with the ${rg} — is exactly the early classification Kindergarten is meant to build. It asks a child to notice likeness and difference and act on it, which is thinking practice that reaches far beyond this page. Keeping it to two clear sets of familiar pictures makes it a confident, doable sort.`,
];
function p3(lglower, rglower, nb){
  return `Children who like sorting ${lglower} and ${rglower} get the hang of grouping quickly, and a tidy two-set page feels satisfying to finish. When this feels easy, sort the pictures in ${nb[0]}, or try ${nb[1]}. You can also browse every sorting worksheet or the whole kindergarten collection — each sheet prints cleanly or plays online for free, and the more a child sorts, the sharper their eye for what goes together.`;
}

function gcd(a,b){ while(b){ const t=a%b; a=b; b=t; } return a; }
function coprimeStride(cells){ let k=Math.max(2,Math.round(cells*0.6180339887)); for(let d=0;d<cells;d++) for(const cand of [k+d,k-d]) if(cand>1&&cand<cells&&gcd(cand,cells)===1) return cand; return 1; }
function cellAssign(i,S,P){ const cells=S*P, stride=coprimeStride(cells); const c=((i%cells)*stride)%cells; return {skel:c%S, p2:Math.floor(c/S)%P}; }

function lower(h){ return h.toLowerCase(); }
function label(co){ return `Sort ${THEMES[co.left].h1} and ${THEMES[co.right].h1}`; }

const list = COORDS.slice().sort((a,b)=> a.pairKey<b.pairKey?-1:1);
const cells = SKEL.length * P2.length;
if (cells <= list.length) console.log(`  [INVARIANT WARN] picture-sort: ${SKEL.length}x${P2.length}=${cells} <= ${list.length}`);
else console.log(`  [invariant OK] picture-sort: ${SKEL.length}x${P2.length}=${cells} > breadth ${list.length} — zero forced same-cell collisions`);

const out=[]; let blocked=0;
list.forEach((co,i)=>{
  const L=THEMES[co.left], R=THEMES[co.right];
  if(!L||!R){ console.log(`NO COPY DATA for ${co.pairKey}`); blocked++; return; }
  const cell = cellAssign(i, SKEL.length, P2.length);
  const nbA=list[(i+1)%list.length], nbB=list[(i+7)%list.length];
  const nb=[ label(nbA).toLowerCase(), label(nbB).toLowerCase() ];
  const entry = {
    slug: co.canonical,
    variantShape: 'singleton',
    coordinate: { type:'picture-sort', mode:null, theme:co.pairKey, level:'kindergarten' },
    eyebrow: 'Sorting Worksheet',
    h1: `Sort ${L.h1} and ${R.h1}`,
    strand: 'Sorting & classification (readiness)',
    slotTokens: (L.nouns+', '+R.nouns).replace(/ and /g,', ').split(', ').map(s=>s.replace(/^(a|an|the) /,'').trim()).concat([L.gen, R.gen, 'sorting', 'kindergarten']),
    p1: SKEL[cell.skel](L.nouns, R.nouns, L.gen, R.gen),
    p2: P2[cell.p2](L.gen, R.gen),
    p3: p3(lower(L.gen), lower(R.gen), nb),
    canonicalDeckSlug: co.canonical,
    carousel: [
      {label:label(list[(i+1)%list.length]), href: list[(i+1)%list.length].canonical},
      {label:label(list[(i+2)%list.length]), href: list[(i+2)%list.length].canonical},
      {label:label(list[(i+5)%list.length]), href: list[(i+5)%list.length].canonical},
      {label:label(list[(i+11)%list.length]), href: list[(i+11)%list.length].canonical},
    ],
  };
  // NO `standard` key — readiness.
  out.push(entry);
});

const cur = JSON.parse(fs.readFileSync(EN,'utf8'));
const keep = cur.landings.filter(l => l.coordinate.type !== 'picture-sort');
const merged = { _note: cur._note + ' [Wave 5 picture-sort: '+out.length+' -vs- pairs/K readiness (Sorting & classification (readiness), NO alignment); SEO-capped natural-contrast demand-bearing; chart-count fence.]', landings: keep.concat(out) };
fs.writeFileSync(EN, JSON.stringify(merged, null, 2) + '\n');
console.log(`generated ${out.length} picture-sort landings (blocked ${blocked}); total landings now ${merged.landings.length}`);
let short=0, fence=0, banned=0, hasStd=0, missingNoun=0;
const FENCE=['count how','how many','classify and count','tally','count the','count each','chart the','chart each'];
const BAN=['fun and engaging','perfect for','great for','dive into','engaging','captivating','unlock','boost','supercharge','easy and fun'];
out.forEach(e=>{const body=(e.p1+' '+e.p2+' '+e.p3); const lc=body.toLowerCase(); const w=body.split(/\s+/).filter(Boolean).length;
  if(w<200){short++; console.log(`  SHORT ${e.slug}: ${w}`);}
  FENCE.forEach(x=>{if(lc.includes(x)){fence++;console.log(`  FENCE-LEAK ${e.slug}: "${x}"`);}});
  BAN.forEach(x=>{if(lc.includes(x)){banned++;console.log(`  BANNED ${e.slug}: "${x}"`);}});
  if('standard' in e){hasStd++;console.log(`  HAS-STANDARD ${e.slug}`);}
  // both-themes nouns present: at least one distinctive noun-word from each theme in p1
  const co=COORDS.find(c=>c.canonical===e.slug); const ln=THEMES[co.left].nouns.split(/[ ,]+/).filter(x=>x.length>3); const rn=THEMES[co.right].nouns.split(/[ ,]+/).filter(x=>x.length>3);
  if(!ln.some(x=>lc.includes(x.toLowerCase()))||!rn.some(x=>lc.includes(x.toLowerCase()))){missingNoun++;console.log(`  MISSING-THEME-NOUN ${e.slug}`);}
});
console.log(short?`${short} short`:'all >=200 words', '|', fence?`${fence} count-fence leaks`:'no count-framing (fence clean)', '|', banned?`${banned} banned`:'no banned', '|', hasStd?`${hasStd} HAS-STANDARD`:'all readiness (no standard)', '|', missingNoun?`${missingNoun} missing-theme-noun`:'both-themes nouns present');