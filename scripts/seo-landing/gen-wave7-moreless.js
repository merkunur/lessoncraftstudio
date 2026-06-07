#!/usr/bin/env node
/* Wave 7 FINAL — EN more-less/image-image × Preschool, READINESS-class. The last of the six W7 coordinates.
 * Mechanic (more-less.html): two groups of pictures; which has MORE / which has FEWER — relative-quantity perception,
 * PRE-COUNTING (no child-seen numeral, no count-to-N). NO educationalAlignment (no `standard` — CCSS begins at K).
 * strand "More & fewer (quantity readiness)". level 'preschool'. COPY-GUARDS: (1) "fewer" not "less" (discrete
 * countable groups); (2) NO count-to-numeral framing (skill is "which group has more," NOT "how many" — would brush
 * K.CC). Also no K.MD measurement. 8 P1 x 7 P2 = 56 > 52 (tightest in wave, +4).
 * Usage: node scripts/seo-landing/gen-wave7-moreless.js
 */
const fs = require('fs');
const EN = 'frontend/content/seo-landing/en.json';
const COORDS = JSON.parse(fs.readFileSync('scripts/seo-landing/wave7-moreless-coordinates.json', 'utf8')).coordinates;
const litA = fs.readFileSync('scripts/seo-landing/gen-wave4-literacyA.js', 'utf8');
const THEMES = (function () { const m = litA.match(/const THEMES = (\{[\s\S]*?\n\});/); if (!m) throw new Error('THEMES extract failed'); return eval('(' + m[1] + ')'); })();

const SKEL = [
  (n,g)=>`This preschool worksheet is about more and fewer: a child looks at two groups of ${g} and decides which group has more. Comparing two bunches at a glance — does this group of ${n} have more, or that one? — is one of a young child's first quantity ideas, the sense of more and fewer that comes long before counting. There is no counting needed, just the comparison of the two groups.`,
  (n,g)=>`Which group has more? On this pre-K worksheet a child compares two sets of ${g} and picks the one with more. Seeing at a glance that one group is bigger than the other — more ${n} here, fewer there — is early quantity perception, a child's first sense of amount. The whole task is comparing the two groups, with no counting and no numbers.`,
  (n,g)=>`More or fewer? This preschool worksheet shows two groups of ${g}, and a child decides which has more and which has fewer. Judging amount by looking — which bunch of ${n} is the bigger one? — is a child's earliest quantity sense, the more-and-fewer idea that comes before a child counts. The familiar pictures keep the comparison clear and playful.`,
  (n,g)=>`This pre-K worksheet asks a child to compare amounts: two groups of ${g}, and the child finds the group with more. Noticing that one set has more and the other has fewer — without counting either — is early quantity perception, a foundation a young child builds by comparing bunches. The task is purely the comparison: which group has more ${n}?`,
  (n,g)=>`Find the group with more. On this preschool worksheet a child looks at two sets of ${g} and picks the one with more in it. Comparing two amounts at a glance — more here, fewer there — is a preschooler's first quantity idea, the sense of more and fewer that comes before any counting. The friendly pictures keep the comparing fun, and there are no numbers.`,
  (n,g)=>`This preschool worksheet helps a child compare more and fewer with ${g}. Two groups appear side by side, and the child decides which has more. Seeing that one bunch of ${n} holds more than the other — judged by looking, not counting — is early quantity perception, a foundational pre-K sense of amount. The worksheet prints cleanly or plays online for free.`,
  (n,g)=>`More and fewer, side by side: this pre-K worksheet shows two groups of ${g}, and a child works out which has more. Comparing the two amounts by eye — is this group of ${n} the bigger bunch? — is a child's earliest sense of quantity, the more-and-fewer idea that comes before counting. The task asks for no numbers, just the comparison of the two groups.`,
  (n,g)=>`A more-and-fewer worksheet for preschoolers: a child compares two groups of ${g} and picks the one with more. Judging which bunch of ${n} has more — at a glance, with no counting — builds the early quantity sense young children develop before they count. It is foundational pre-K perception, with no letters or numbers, just more compared to fewer.`,
];
const P2 = [
  (g)=>`Comparing amounts — seeing which of two groups has more — is one of a child's earliest quantity ideas, and it comes well before counting. A preschooler can look at two bunches of ${g} and tell which is bigger without counting either. That more-and-fewer sense is foundational readiness, the perception of amount that counting later builds on, grown simply by comparing groups.`,
  (g)=>`The idea of more and fewer is where a child's feel for amount begins — before any counting, a preschooler grasps that one group has more than another. Comparing two sets of ${g} by eye sharpens that perception of amount. It is pre-counting quantity readiness, a foundation for the counting and comparing that come later, built by judging which bunch is bigger.`,
  (g)=>`Quantity perception — telling more from fewer at a glance — is a foundational pre-K skill, distinct from and earlier than counting. A child looks at two groups of ${g} and senses which holds more, no numbers required. Making that more-and-fewer judgment again and again builds a young child's first feel for amount, the groundwork beneath later number ideas.`,
  (g)=>`Before a child counts, they can compare amounts — and more-versus-fewer is the first amount comparison of all. Looking at two groups of ${g} and choosing the one with more builds a preschooler's quantity sense, the perception of amount grown by comparing rather than counting. This worksheet makes that judgment a game: which group has more? with familiar pictures keeping it inviting.`,
  (g)=>`Seeing which group has more asks a child to judge amount directly, by eye, without counting a single object. That perception of more and fewer is a preschooler's earliest quantity idea, foundational readiness that later counting and comparing build upon. With ${g} grouped in bunches, the comparison stays concrete, and a child grows the sense of amount by comparing.`,
  (g)=>`The skill a more-and-fewer worksheet builds is quantity perception: judging which of two groups holds more, at a glance. For a preschooler that sense of amount is foundational, the pre-counting idea beneath all later number thinking. The task asks for no counting — just a child's eye for the bigger bunch of ${g} — and it grows with every more-and-fewer comparison made.`,
  (g)=>`Telling more from fewer is concrete quantity reasoning a preschooler can do with confidence, long before counting. Comparing two groups of ${g} and picking the one with more builds the perception of amount, a child's first quantity sense. It is foundational pre-K readiness, grown by comparing bunches rather than counting them, and the friendly pictures keep every comparison clear.`,
];
function p3(nb){ return `Children quickly get a feel for spotting which group has more, and a finished more-and-fewer worksheet is a happy win. When this is easy, compare the groups in ${nb[0]}, or try ${nb[1]}. You can also browse every more-and-fewer worksheet or the whole preschool collection — each sheet prints cleanly or plays online for free, and the more a child compares amounts, the surer their early sense of more and fewer grows.`; }

function gcd(a,b){ while(b){ const t=a%b; a=b; b=t; } return a; }
function coprimeStride(cells){ let k=Math.max(2,Math.round(cells*0.6180339887)); for(let d=0;d<cells;d++) for(const cand of [k+d,k-d]) if(cand>1&&cand<cells&&gcd(cand,cells)===1) return cand; return 1; }
function cellAssign(i,S,P){ const cells=S*P, stride=coprimeStride(cells); const c=((i%cells)*stride)%cells; return {skel:c%S, p2:Math.floor(c/S)%P}; }

function landingSlugOf(co){ return co.siblings.length > 1 ? `more-less-${co.slugTheme}-preschool` : co.canonical; }

const list = COORDS.slice().filter(co=>!!THEMES[co.theme]).sort((a,b)=> a.theme<b.theme?-1:1);
const cells = SKEL.length * P2.length;
console.log(cells > list.length ? `  [invariant OK] more-less: ${SKEL.length}x${P2.length}=${cells} > breadth ${list.length} (tightest in wave, +${cells-list.length})` : `  [INVARIANT WARN] ${cells} <= ${list.length}`);
const out=[];
list.forEach((co,i)=>{
  const d = THEMES[co.theme];
  const cell = cellAssign(i, SKEL.length, P2.length);
  const nbA=list[(i+1)%list.length], nbB=list[(i+5)%list.length];
  const nb=[ `more or fewer with ${THEMES[nbA.theme].h1.toLowerCase()}`, `more or fewer with ${THEMES[nbB.theme].h1.toLowerCase()}` ];
  const entry = {
    slug: landingSlugOf(co), variantShape: co.siblings.length>1?'collapsed':'singleton',
    coordinate: { type:'more-less', mode:'image-image', theme:co.theme, level:'preschool' },
    eyebrow: 'More and Fewer Worksheet',
    h1: `More or Fewer with ${d.h1}`,
    strand: 'More & fewer (quantity readiness)',
    slotTokens: d.nouns.replace(/ and /g,', ').split(', ').map(s=>s.replace(/^(a|an|the) /,'').trim()).concat([d.gen, co.theme.replace(/_/g,' '), 'preschool', 'more and fewer', 'more or fewer']),
    p1: SKEL[cell.skel](d.nouns, d.gen), p2: P2[cell.p2](d.gen), p3: p3(nb),
    canonicalDeckSlug: co.canonical,
    carousel: [1,2,5,11].map(k=>({label:`More or Fewer with ${THEMES[list[(i+k)%list.length].theme].h1}`, href: landingSlugOf(list[(i+k)%list.length])})),
  };
  if (co.siblings.length>1) entry.collapseSiblings = co.siblings;
  out.push(entry);
});

const cur = JSON.parse(fs.readFileSync(EN,'utf8'));
const keep = cur.landings.filter(l => l.coordinate.type !== 'more-less');
const merged = { _note: cur._note + ` [Wave 7 FINAL more-less: ${out.length} /Preschool readiness (More & fewer (quantity readiness)); more-vs-fewer pre-counting; completes W7 authoring.]`, landings: keep.concat(out) };
fs.writeFileSync(EN, JSON.stringify(merged, null, 2) + '\n');
console.log(`generated ${out.length} more-less landings; total landings now ${merged.landings.length}`);
let short=0, fence=0, banned=0, lessLeak=0, cnt=0, meas=0, mg=0, hasStd=0, notPre=0;
const FENCE=['count how','classify and count','tally','chart the','chart each'];
const BAN=['fun and engaging','perfect for','great for','dive into','engaging','captivating','unlock','boost','supercharge','easy and fun','one of the earliest','ideal for'];
const COUNTOVER=['how many','count the','count each','count to','counting to','count how']; // no count-to-numeral over-claim (K.CC)
const MEAS=['measur','length','measurable','k.md','ruler'];
const MATHGEO=['math skill','number sense','addition','subtraction','arithmetic','place value'];
out.forEach(e=>{const body=(e.p1+' '+e.p2+' '+e.p3); const lc=body.toLowerCase(); const w=body.split(/\s+/).filter(Boolean).length;
  if(w<200){short++; console.log(`  SHORT ${e.slug}: ${w}`);}
  FENCE.forEach(x=>{if(lc.includes(x)){fence++;console.log(`  FENCE ${e.slug}: "${x}"`);}});
  BAN.forEach(x=>{if(lc.includes(x)){banned++;console.log(`  BANNED ${e.slug}: "${x}"`);}});
  if(/\bless\b/i.test(body)){lessLeak++;console.log(`  LESS-LEAK ${e.slug} (use "fewer")`);}
  COUNTOVER.forEach(x=>{if(lc.includes(x)){cnt++;console.log(`  COUNT-OVERCLAIM ${e.slug}: "${x}"`);}});
  MEAS.forEach(x=>{if(lc.includes(x)){meas++;console.log(`  MEASUREMENT-LEAK ${e.slug}: "${x}"`);}});
  MATHGEO.forEach(x=>{if(lc.includes(x)){mg++;console.log(`  MATH-OVERCLAIM ${e.slug}: "${x}"`);}});
  if('standard' in e){hasStd++;console.log(`  HAS-STANDARD ${e.slug}`);}
  if(e.coordinate.level!=='preschool'){notPre++;}
});
console.log(short?`${short} short`:'all >=200 words', '|', fence?`${fence} fence`:'fence clean', '|', banned?`${banned} banned`:'no banned', '|', lessLeak?`${lessLeak} LESS-LEAK`:'fewer-not-less clean', '|', cnt?`${cnt} COUNT-OVERCLAIM`:'no count-to-numeral (pre-counting)', '|', meas?`${meas} meas`:'no measurement', '|', mg?`${mg} math`:'no math over-claim', '|', hasStd?`${hasStd} HAS-STD`:'all readiness', '|', notPre?`${notPre} NOT-PRE`:'all level preschool');