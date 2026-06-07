#!/usr/bin/env node
/* Wave 5 COUPLED — EN find-objects/i-spy + find-objects/find-odd × Kindergarten, READINESS-class.
 * Both = busy-scene VISUAL SEARCH (tap-to-mark). i-spy = find the NAMED/listed targets in the scene; find-odd = find
 * the one picture that LOOKS DIFFERENT (visual oddity — rotated/recolored/resized), NOT category-exclusion.
 * THE BOUNDARY: find-odd is VISUAL (appearance/scene-scan), odd-one-out (already authored) is CLASSIFICATION
 * (category). find-odd copy is lint-blocked from classification framing (belong/category/group). strand "Visual
 * discrimination (readiness)" (bingo precedent). NO `standard` key. count-fence. 8 P1 x 7 P2 = 56 > 46/47.
 * Usage: node scripts/seo-landing/gen-wave5-findobjects.js
 */
const fs = require('fs');
const EN = 'frontend/content/seo-landing/en.json';
const COORDS = JSON.parse(fs.readFileSync('scripts/seo-landing/wave5-findobjects-coordinates.json', 'utf8')).coordinates;
const litA = fs.readFileSync('scripts/seo-landing/gen-wave4-literacyA.js', 'utf8');
const THEMES = (function () { const m = litA.match(/const THEMES = (\{[\s\S]*?\n\});/); if (!m) throw new Error('THEMES extract failed'); return eval('(' + m[1] + ')'); })();

// I-SPY = scan busy scene for NAMED/listed targets. (n)=nouns,(g)=gen.
const SKEL_ISPY = [
  (n,g)=>`This Kindergarten I Spy worksheet is a busy scene packed with ${g} for a child to hunt through. The page lists a few targets — pictures like ${n} — and the child scans the crowded picture to find and mark each one. Searching a cluttered scene for specific items trains careful looking and visual attention, skills a young child uses every day. It is all about finding what's there, with nothing to count.`,
  (n,g)=>`Can you find them all? On this I Spy sheet a jumble of ${g} fills the scene, and the child searches for the listed pictures — ${n} and a few more — marking each as they spot it. Hunting through a busy picture for particular things builds visual search and attention to detail, foundational looking skills for Kindergarten. The familiar pictures keep it fun and the focus on the hunt.`,
  (n,g)=>`Look closely and find the hidden pictures. This worksheet shows a crowded scene of ${g}, and the child's job is to spot the targets — ${n} among them — tucked in among everything else. Scanning a busy picture to locate specific items is visual-discrimination practice: the child has to look carefully and not be fooled by the clutter. There is nothing to count, just the hunt.`,
  (n,g)=>`A scene full of ${g} hides the pictures a child is looking for. On this I Spy sheet the child searches the busy picture for the listed targets — ${n} and others — and marks each one found. That careful scanning trains visual attention and the looking-skills Kindergarten children are sharpening, and the familiar pictures keep every bit of the task about the search.`,
  (n,g)=>`Spy them out! This Kindergarten worksheet packs a scene with ${g} and asks the child to find the targets hidden in the crowd — pictures like ${n}. Searching a cluttered picture for specific things is real visual-discrimination work: the child looks carefully, scans systematically, and marks what they find. It is pure looking, with no counting along the way.`,
  (n,g)=>`This busy-scene worksheet is a hunt for the eyes. Among a jumble of ${g}, the child searches for the listed pictures — ${n} and more — and marks each one. Finding particular items in a crowded scene builds the careful visual search and attention to detail young children rely on, and the familiar pictures keep the whole task about the hunt rather than anything else.`,
  (n,g)=>`Find and mark each target hidden in the scene. This I Spy sheet fills a picture with ${g}, and the child hunts for the specific ones listed — ${n} among them. Scanning a busy scene for known items is visual-attention practice, a looking-skill that helps a Kindergarten child notice details everywhere. The pictures are familiar so the only challenge is finding them in the crowd.`,
  (n,g)=>`On this Kindergarten I Spy worksheet a child searches a crowded scene of ${g} for the pictures on the list — ${n} and others. Hunting through the clutter to find each target trains careful, systematic looking, the visual-discrimination skill behind so much early learning. The familiar pictures keep the task squarely about the search, with nothing to count.`,
];
const P2_ISPY = [
  (g)=>`An I Spy hunt builds visual attention and careful looking — a child has to scan a cluttered scene, hold the targets in mind, and pick them out from everything around them. That focused searching is real Kindergarten readiness, the looking-skill behind reading, noticing, and paying attention, and the familiar ${g} keep it inviting and the search satisfying.`,
  (g)=>`Searching a busy picture for specific items trains the eyes to work systematically: look across the scene, compare what's there to what's wanted, and spot the matches. For a Kindergarten child that visual-discrimination practice is foundational, and a crowded scene of ${g} gives plenty to hunt through without anything to count.`,
  (g)=>`The skill an I Spy sheet builds is visual search — finding known things hidden among many others. A child practises careful looking and attention to detail, ignoring the clutter to focus on the targets. That is genuine Kindergarten readiness, the kind of looking that supports everything from reading to noticing, and the familiar ${g} keep it fun.`,
  (g)=>`Hunting for targets in a crowded scene rewards patience and a careful eye — exactly the visual attention Kindergarten children are developing. The child scans, compares, and marks, building the systematic looking that helps in every subject. A busy ${g} scene offers a rich hunt, with no numbers involved at all.`,
  (g)=>`Finding specific pictures tucked among many trains a child to look closely and not be fooled by a busy background. That visual-discrimination skill is core Kindergarten readiness, and an I Spy hunt rehearses it in a playful way that keeps a child searching happily. The familiar ${g} make the scene inviting and the targets satisfying to find.`,
  (g)=>`An I Spy puzzle is attention practice disguised as a game: the child must concentrate, scan methodically, and resist the distraction of a crowded scene to find each target. For Kindergarten that focused looking is foundational readiness, and a rich ${g} scene gives a child plenty to hunt through with nothing to count.`,
  (g)=>`Spotting the listed pictures in a jumble teaches a child to search with purpose — eyes moving across the scene, comparing each thing to the targets. That careful visual scanning is real Kindergarten readiness, the looking-skill underneath so much early learning, and the familiar ${g} keep the hunt inviting and doable.`,
];

// FIND-ODD = scan busy scene for the one that LOOKS different (VISUAL oddity). NOT category. (n)=nouns,(g)=gen.
const SKEL_FINDODD = [
  (n,g)=>`This Kindergarten worksheet hides one odd-looking picture in a busy scene and asks the child to find it. The page is filled with ${g} — ${n} and many more — and almost all of them match, but one looks different: turned the wrong way, a different color, or just not quite the same. Scanning the crowd to spot the one that stands out is visual-discrimination practice — careful looking, not counting.`,
  (n,g)=>`Spot the one that looks different. On this sheet a busy scene of ${g} (think ${n}) is nearly all the same, except one picture that doesn't look like the rest — maybe it's flipped, a different shade, or a little off. The child hunts through the clutter and marks the odd-looking one. Noticing a small visual difference in a crowded scene trains a sharp eye, with nothing to count.`,
  (n,g)=>`One of these doesn't look right — find it. This worksheet packs a scene with ${g} — ${n} among them — that nearly all match, but a single picture looks different from the others. The child scans the busy picture and marks the visual odd one. Catching a small difference in appearance among many similar pictures is visual-discrimination work, pure careful looking.`,
  (n,g)=>`In this busy scene of ${g}, almost every picture looks the same — but one is different to look at, and the child's job is to spot it. Among ${n} and more, the odd one might be rotated, recolored, or a slightly different size; the child scans the crowd and marks it. Finding a visual difference in a cluttered scene sharpens a child's eye, with no counting at all.`,
  (n,g)=>`Which picture looks different? On this Kindergarten sheet a crowded scene of ${g} is nearly all matching, with one picture that stands out by how it looks — ${n} fill the scene and one is the visual odd one. The child searches the busy picture and marks it. Spotting an appearance difference among many similar pictures is careful-looking practice, never counting.`,
  (n,g)=>`This sheet asks a sharp pair of eyes: in a scene packed with ${g} that all look alike, one picture is different to look at, and the child finds it. The odd one — somewhere among ${n} and others — might be turned, tinted, or sized a little differently. Scanning the crowd to catch the visual oddity is real visual-discrimination practice for Kindergarten.`,
  (n,g)=>`Find the picture that stands out. This busy-scene worksheet fills a picture with ${g} — ${n} and more — nearly all the same, except one that looks different. The child hunts through the clutter and marks the odd-looking one. Noticing a small visual difference among many matching pictures trains careful looking and attention to detail, with nothing to count.`,
  (n,g)=>`On this Kindergarten worksheet a crowded scene of ${g} is almost entirely matching, with one picture that doesn't look like the rest. Searching among ${n} and others, the child spots the visual odd one — different in how it looks, not what it is. Catching that appearance difference in a busy scene is sharp-eyed visual-discrimination practice, pure looking with no counting.`,
];
const P2_FINDODD = [
  (g)=>`Spotting the one picture that looks different in a busy scene is visual-discrimination practice — the child has to scan carefully and notice a small difference in appearance among many matching pictures. That sharp-eyed looking is real Kindergarten readiness, the attention-to-detail behind reading and noticing, and a crowded ${g} scene makes it a rewarding hunt.`,
  (g)=>`Finding the visual odd one trains a child to look closely and catch what doesn't match by sight — a rotation, a color change, a different size. For Kindergarten that careful visual comparison is foundational, and searching a busy ${g} scene for the one that stands out rehearses it in a playful way, with nothing to count.`,
  (g)=>`The skill here is noticing a difference in how a picture looks, not what it is — the odd one matches the others in kind but stands out by appearance. Scanning a crowded ${g} scene to catch it builds visual discrimination and attention to detail, core Kindergarten readiness, and keeps the whole task about careful looking.`,
  (g)=>`Catching the one picture that looks a little off among many that match asks a child to compare by sight and resist the distraction of a busy scene. That visual attention is genuine Kindergarten readiness, the same careful-looking that supports early reading, and a rich ${g} scene gives plenty to scan with no numbers involved.`,
  (g)=>`Visual odd-one-out — finding the picture that looks different in a crowd — sharpens a child's eye for small appearance differences. The odd one is the same kind of thing as the rest; the child spots it by how it looks, not by reasoning about it. That careful looking among ${g} is foundational Kindergarten readiness, with nothing to count.`,
  (g)=>`This puzzle rewards a sharp, patient eye: in a busy ${g} scene where almost everything matches, the child hunts for the single picture that looks different. Practising that visual scan-and-compare builds the attention to detail Kindergarten children are developing, the looking-skill behind so much early learning, never a counting task.`,
  (g)=>`Noticing a small visual difference in a crowded scene is exactly the kind of careful looking Kindergarten readiness is built on. The child searches a busy ${g} picture, compares by appearance, and marks the one that stands out — sharpening the eye for detail in a playful hunt that keeps the focus on looking, with no counting.`,
];

function p3(mode, glower, nb){
  if (mode === 'find-odd')
    return `Children who like spotting the odd-looking ${glower} love the moment it jumps out at them. When this feels easy, look for the odd one in ${nb[0]}, or try ${nb[1]}. You can also browse every spot-the-difference worksheet or the whole kindergarten collection — each sheet prints cleanly or plays online for free, and every hunt sharpens a child's eye for detail, training the careful, patient looking that supports reading, noticing, and so much more besides.`;
  return `Children who like hunting through a busy ${glower} scene get sharper at spotting hidden things each time. When this feels easy, search ${nb[0]}, or try ${nb[1]}. You can also browse every I Spy worksheet or the whole kindergarten collection — each sheet prints cleanly or plays online for free, and the more a child searches, the keener their eye becomes at picking out small details in any busy picture, a skill that helps with reading and noticing all day long.`;
}

function gcd(a,b){ while(b){ const t=a%b; a=b; b=t; } return a; }
function coprimeStride(cells){ let k=Math.max(2,Math.round(cells*0.6180339887)); for(let d=0;d<cells;d++) for(const cand of [k+d,k-d]) if(cand>1&&cand<cells&&gcd(cand,cells)===1) return cand; return 1; }
function cellAssign(i,S,P){ const cells=S*P, stride=coprimeStride(cells); const c=((i%cells)*stride)%cells; return {skel:c%S, p2:Math.floor(c/S)%P}; }

const MODES = {
  'i-spy':    { SKEL: SKEL_ISPY, P2: P2_ISPY, eyebrow:'I Spy Worksheet', strand:'Visual discrimination (readiness)', h1:(h)=>`I Spy with ${h}`, nbVerb:'i spy with ', label:(t)=>`I Spy with ${t}` },
  'find-odd': { SKEL: SKEL_FINDODD, P2: P2_FINDODD, eyebrow:'Spot the Difference Worksheet', strand:'Visual discrimination (readiness)', h1:(h)=>`Spot the Odd One with ${h}`, nbVerb:'spot the odd one with ', label:(t)=>`Spot the Odd One with ${t}` },
};
function landingSlugOf(co){ return co.canonical; } // slugs carry a unique hash suffix; 1:1.

function buildMode(mode){
  const list = COORDS.filter(c=>c.mode===mode).slice().sort((a,b)=> a.theme<b.theme?-1:1);
  const M = MODES[mode];
  const cells = M.SKEL.length * M.P2.length;
  if (cells <= list.length) console.log(`  [INVARIANT WARN] find-objects/${mode}: ${cells} <= ${list.length}`);
  else console.log(`  [invariant OK] find-objects/${mode}: ${M.SKEL.length}x${M.P2.length}=${cells} > breadth ${list.length} — zero forced same-cell collisions`);
  const out=[]; let blocked=0;
  list.forEach((co,i)=>{
    const d = THEMES[co.theme];
    if(!d){ console.log(`NO COPY DATA for ${co.theme} (${mode})`); blocked++; return; }
    const cell = cellAssign(i, M.SKEL.length, M.P2.length);
    const nbA=list[(i+1)%list.length], nbB=list[(i+5)%list.length];
    const nb=[ `${M.nbVerb}${THEMES[nbA.theme].h1.toLowerCase()}`, `${M.nbVerb}${THEMES[nbB.theme].h1.toLowerCase()}` ];
    const entry = {
      slug: landingSlugOf(co),
      variantShape: co.siblings.length>1 ? 'collapsed' : 'singleton',
      coordinate: { type:'find-objects', mode, theme:co.theme, level:'kindergarten' },
      eyebrow: M.eyebrow,
      h1: M.h1(d.h1),
      strand: M.strand,
      slotTokens: d.nouns.replace(/ and /g,', ').split(', ').map(s=>s.replace(/^(a|an|the) /,'').trim()).concat([d.gen, co.theme.replace(/_/g,' '), 'kindergarten', mode==='find-odd'?'spot the difference':'i spy']),
      p1: M.SKEL[cell.skel](d.nouns, d.gen),
      p2: M.P2[cell.p2](d.gen),
      p3: p3(mode, d.gen.toLowerCase(), nb),
      canonicalDeckSlug: co.canonical,
      carousel: [
        {label:M.label(THEMES[list[(i+1)%list.length].theme].h1), href: landingSlugOf(list[(i+1)%list.length])},
        {label:M.label(THEMES[list[(i+2)%list.length].theme].h1), href: landingSlugOf(list[(i+2)%list.length])},
        {label:M.label(THEMES[list[(i+5)%list.length].theme].h1), href: landingSlugOf(list[(i+5)%list.length])},
        {label:M.label(THEMES[list[(i+11)%list.length].theme].h1), href: landingSlugOf(list[(i+11)%list.length])},
      ],
    };
    if (co.siblings.length>1) entry.collapseSiblings = co.siblings;
    out.push(entry);
  });
  return {out, blocked};
}

let generated=[]; let blockedTotal=0;
['i-spy','find-odd'].forEach(m=>{ const r=buildMode(m); generated=generated.concat(r.out); blockedTotal+=r.blocked; });

const cur = JSON.parse(fs.readFileSync(EN,'utf8'));
const keep = cur.landings.filter(l => l.coordinate.type !== 'find-objects');
const merged = { _note: cur._note + ' [Wave 5 find-objects: '+generated.length+' i-spy + find-odd /K readiness (Visual discrimination (readiness), NO alignment); both busy-scene visual search; find-odd=visual oddity (NOT category) — odd-one-out boundary.]', landings: keep.concat(generated) };
fs.writeFileSync(EN, JSON.stringify(merged, null, 2) + '\n');
console.log(`generated ${generated.length} find-objects landings (blocked ${blockedTotal}); total landings now ${merged.landings.length}`);
let short=0, fence=0, banned=0, classleak=0, hasStd=0;
const FENCE=['count how','how many','classify and count','tally','count the','count each','chart the','chart each'];
const BAN=['fun and engaging','perfect for','great for','dive into','engaging','captivating','unlock','boost','supercharge','easy and fun','one of the earliest','ideal for'];
const CLASS_LEAK=['belong','categor','classif','different group','which group',"doesn't fit the group",'same group']; // find-odd must stay visual, not classification
generated.forEach(e=>{const body=(e.p1+' '+e.p2+' '+e.p3); const lc=body.toLowerCase(); const w=body.split(/\s+/).filter(Boolean).length;
  if(w<200){short++; console.log(`  SHORT ${e.slug}: ${w}`);}
  FENCE.forEach(x=>{if(lc.includes(x)){fence++;console.log(`  FENCE-LEAK ${e.slug}: "${x}"`);}});
  BAN.forEach(x=>{if(lc.includes(x)){banned++;console.log(`  BANNED ${e.slug}: "${x}"`);}});
  if(e.coordinate.mode==='find-odd') CLASS_LEAK.forEach(x=>{if(lc.includes(x)){classleak++;console.log(`  CLASSIFICATION-LEAK ${e.slug}: "${x}" (find-odd must stay visual)`);}});
  if('standard' in e){hasStd++;console.log(`  HAS-STANDARD ${e.slug}`);}
});
console.log(short?`${short} short`:'all >=200 words', '|', fence?`${fence} count-fence`:'fence clean', '|', banned?`${banned} banned`:'no banned', '|', classleak?`${classleak} find-odd classification-leak`:'find-odd stays visual (no classification-leak)', '|', hasStd?`${hasStd} HAS-STANDARD`:'all readiness');