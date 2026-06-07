#!/usr/bin/env node
/* Wave 5 COUPLED — EN odd-one-out/same-theme + odd-one-out/cross-theme × Kindergarten, READINESS-class.
 * Tap the picture that doesn't belong. same = WITHIN-category outlier (subtle, harder); cross = CROSS-category
 * outlier (one from a different group, clearer). NO educationalAlignment (no `standard` key). strand "Logical
 * reasoning — classification (readiness)" — DISTINCT from sudoku's "Logical reasoning (readiness)".
 * CHART-COUNT FENCE: doesn't-belong / different lexicon, NEVER count-framing. CLASSIFICATION-centered (which doesn't
 * belong to the CATEGORY), NOT visual-search (so find-objects/find-odd can later differentiate on the visual axis).
 * 8 P1 x 7 P2 = 56 > 50/49 (coprime + guard). Usage: node scripts/seo-landing/gen-wave5-oddoneout.js
 */
const fs = require('fs');
const EN = 'frontend/content/seo-landing/en.json';
const COORDS = JSON.parse(fs.readFileSync('scripts/seo-landing/wave5-oddoneout-coordinates.json', 'utf8')).coordinates;
const litA = fs.readFileSync('scripts/seo-landing/gen-wave4-literacyA.js', 'utf8');
const THEMES = (function () { const m = litA.match(/const THEMES = (\{[\s\S]*?\n\});/); if (!m) throw new Error('THEMES extract failed'); return eval('(' + m[1] + ')'); })();

// SAME-THEME = within-category outlier (subtle). (n)=nouns,(g)=gen.
const SKEL_SAME = [
  (n,g)=>`This Kindergarten odd-one-out worksheet sharpens a child's eye for what belongs together. Each row shows a small set of ${g} — pictures like ${n} — but one of them does not belong with the rest, and the child finds and marks the odd one. Working out which picture is different asks a child to compare and classify, deciding what the others share and which one breaks the pattern. It is pure thinking, with nothing to count.`,
  (n,g)=>`Find the one that doesn't belong. On this sheet every row is a group of ${g} that go together — except one. The child studies ${n} and friends, decides what the matching pictures have in common, and marks the picture that is different. Spotting the odd one within a group of similar things is classification thinking, a Kindergarten readiness skill, and the familiar pictures keep the focus on the difference.`,
  (n,g)=>`Which picture is the odd one out? Each row gathers ${g} — ${n} among them — that share something, and one that doesn't fit. The child compares the pictures, works out the rule the group follows, and finds the one that breaks it. Noticing how things are alike and which one is different is early classifying, the kind of careful reasoning Kindergarten builds. There is nothing to count, only to compare.`,
  (n,g)=>`This row-by-row puzzle asks a child to spot the picture that doesn't belong with the others. The pictures are all ${g} — ${n} and more — but in each row one is different in a way that sets it apart from the group. Deciding what the rest have in common and which one is the exception is classification reasoning, a foundational Kindergarten thinking skill. Familiar pictures keep every choice about the difference, not about anything else.`,
  (n,g)=>`Same, same, same — different! That is the pattern of this odd-one-out sheet. Each row of ${g} (think ${n}) holds pictures that belong together and one that does not, and the child marks the odd one. Working out the shared feature and finding the exception trains a child to classify and compare, core Kindergarten readiness. It is all about noticing the difference, with no counting involved.`,
  (n,g)=>`Spot the picture that doesn't fit. On this Kindergarten worksheet each row shows ${g} — ${n} among them — that go together except for one, and the child finds the odd one out. Comparing the pictures and deciding which one breaks the group's rule is classification thinking, a readiness skill children use to make sense of how things are grouped. The familiar pictures keep the task about the difference.`,
  (n,g)=>`Each row hides one picture that doesn't belong, and the child's job is to find it. The pictures are ${g} — ${n} and others — and one in each row is the exception that doesn't fit with the rest. Working out the rule the group shares and spotting what breaks it is early classifying, the careful comparing-and-grouping thinking Kindergarten is meant to build. Nothing to count — just find the different one.`,
  (n,g)=>`This odd-one-out sheet trains a child to notice what doesn't belong. In every row of ${g} — ${n} and friends — the pictures share something except one, and the child marks the odd one. Deciding what the group has in common and which picture is different is classification reasoning, a foundational Kindergarten skill, and the familiar pictures keep the whole task about spotting the difference rather than anything else.`,
];
const P2_SAME = [
  (g)=>`Finding the odd one within a group of similar pictures is genuine classification practice: a child has to work out what the matching pictures share, then spot the one that breaks the rule. That comparing-and-reasoning is core Kindergarten readiness, and a same-group puzzle makes it a real thinking challenge — the difference is subtle enough to reward careful looking.`,
  (g)=>`Spotting which picture doesn't belong asks a child to notice features and group by them — the foundation of classifying. When all the pictures are the same kind except one, the child must look closely to find what sets the odd one apart, which is exactly the careful comparison Kindergarten thinking is built on. The familiar ${g} keep it about the difference.`,
  (g)=>`Within-group odd-one-out is the harder, more rewarding version of the skill: the odd picture is the same kind as the rest, so the child can't rely on an obvious category jump and has to reason about a finer difference. That deeper comparing is excellent classification practice for a Kindergarten child ready to look closely at ${g}, with no counting involved.`,
  (g)=>`Classification begins with noticing how things are alike and different, and a same-group odd-one-out puzzle rehearses both at once: find the shared feature, then find the exception. For Kindergarten that comparing-and-grouping is foundational thinking, used to make sense of any set of things, and the familiar ${g} keep the focus on the reasoning.`,
  (g)=>`Deciding which picture is the odd one in a group of similar things trains a child to compare carefully and reason about categories. That is real Kindergarten readiness — the same noticing-and-grouping skill behind sorting and matching — and the same-group format makes it a genuine challenge rather than an obvious pick. It is all comparison, nothing to count.`,
  (g)=>`A same-theme odd-one-out asks a child to look past the obvious: the ${g} all belong to one kind, so the difference that sets one apart is finer and takes real attention. Working it out builds the close-looking, classify-and-compare thinking Kindergarten is meant to develop, and the familiar pictures keep every choice about the difference itself.`,
  (g)=>`The value of finding the odd one within a group is the careful reasoning it demands — the child can't just spot a different category, they have to notice a subtler feature that breaks the pattern. That is strong classification practice for Kindergarten, the comparing-and-grouping skill that underlies so much early thinking, and there is nothing to count along the way.`,
];

// CROSS-THEME = cross-category outlier (clearer). (n)=nouns,(g)=gen.
const SKEL_CROSS = [
  (n,g)=>`This Kindergarten odd-one-out worksheet uses a clear, satisfying contrast: most pictures in each row belong to one group, and one comes from a completely different group. With ${g} — ${n} — filling the row and a single picture from elsewhere, the child finds the one that doesn't belong. Recognizing that one picture is from a different category altogether is early classification, a thinking-readiness skill. There is nothing to count, just the odd one to spot.`,
  (n,g)=>`One of these is not like the others — and it's from a different group entirely. On this sheet each row is mostly ${g} (like ${n}) with one picture that belongs to a completely different kind of thing, and the child marks it. Telling that one picture comes from another category is classification thinking, clearer than spotting a subtle difference, and a strong Kindergarten readiness skill. The familiar pictures keep it about the group.`,
  (n,g)=>`Find the picture from a different group. Each row gathers ${g} — ${n} and more — with one outsider that belongs to an entirely different category, and the child spots it. Recognizing that most pictures share a kind and one does not is foundational classifying for Kindergarten, and the cross-group contrast makes the odd one clear to find. It is pure comparing, with no counting.`,
  (n,g)=>`This odd-one-out sheet contrasts two kinds of things. Most of each row is ${g} — ${n} among them — but one picture comes from a completely different group, and the child marks the one that doesn't belong. Knowing that one picture is from another category is classification reasoning, a Kindergarten readiness skill, and the clear cross-group difference makes it an approachable, confidence-building puzzle. Nothing to count here.`,
  (n,g)=>`Most belong, one doesn't — and the odd one is from a whole different group. On this Kindergarten sheet each row is mostly ${g} (such as ${n}) plus a single picture from another category, and the child finds the outsider. Sorting the matching group from the one that doesn't fit is early classification, the comparing-and-grouping thinking Kindergarten builds. The contrast is clear, and there is nothing to count.`,
  (n,g)=>`Which picture comes from a different group? Each row of this worksheet shows ${g} — ${n} and others — with one picture that belongs to a completely different kind of thing. The child compares and marks the odd one. Recognizing that one picture is from another category altogether is classification reasoning, a clear and confidence-building version of the skill for Kindergarten. It is all comparing, never counting.`,
  (n,g)=>`This sheet makes the odd one easy to enjoy finding: most pictures in a row are ${g} — ${n} — and one is from a completely different group. The child spots the one that doesn't belong. Telling apart two categories — the group most pictures share and the single outsider — is foundational Kindergarten classifying, and the cross-group contrast keeps it clear. There is nothing to count, just the different one to find.`,
  (n,g)=>`On this Kindergarten odd-one-out sheet each row is built from one group of pictures plus a single picture from a different group entirely. With ${g} — ${n} — mostly filling the row, the child finds the outsider that doesn't belong. Recognizing that one picture comes from another category is classification thinking, made clear and approachable by the cross-group contrast. The whole task is the comparison, with no counting.`,
];
const P2_CROSS = [
  (g)=>`A cross-group odd-one-out is a clear, confidence-building way into classification: most pictures belong to one kind and one is from a different category, so the child practises recognizing categories and spotting the outsider. For Kindergarten that grouping-and-comparing is foundational thinking, and the obvious contrast lets a child succeed while building the skill. Nothing to count, just the odd one to find.`,
  (g)=>`Recognizing that one picture comes from a completely different group is the most approachable form of classifying, well suited to a Kindergarten child building the skill. The child sorts the matching group from the single outsider, which rehearses categorizing — the foundation of how we organize things — in a clear, satisfying way. The familiar ${g} keep the focus on the difference.`,
  (g)=>`Cross-group odd-one-out rehearses category recognition: the child sees that most pictures share a kind and one belongs elsewhere entirely. That is core classification readiness for Kindergarten, and because the difference is a whole-category jump, it is clear enough to build confidence while the comparing-and-grouping habit forms. There is nothing to count here.`,
  (g)=>`Telling apart two categories — the group most pictures belong to and the single one that doesn't — is foundational Kindergarten classifying. The cross-group format makes the odd one clear, so a child practises recognizing what makes a group a group and noticing the outsider without the puzzle becoming frustrating. It is all comparison, never counting.`,
  (g)=>`Spotting the picture from a different group teaches a child to recognize categories and exceptions — the heart of classification. For Kindergarten, the clear cross-group contrast is the right starting point: it lets a child succeed at comparing-and-grouping while the skill is still new, building toward the subtler same-group version. Nothing to add up, just the odd one to find.`,
  (g)=>`A cross-category odd-one-out builds the early classifying skill in its clearest form: the child recognizes the group most pictures share and the single picture that belongs to a different kind. That category-noticing is real Kindergarten readiness, used to organize and make sense of mixed sets of things, and the obvious contrast keeps the puzzle confident and doable with familiar ${g}.`,
  (g)=>`Because the odd picture is from a completely different group, this puzzle makes classification approachable: a child compares the matching pictures to the outsider and marks the one that doesn't belong. That comparing-and-categorizing is foundational Kindergarten thinking, and the clear cross-group difference lets a child practise it successfully, with no counting involved.`,
];

function p3(mode, glower, nb){
  const opener = mode === 'cross-theme'
    ? `Children who like finding the picture from a different group enjoy the clear "that one's not like the others" moment. When this feels easy, spot the odd one in ${nb[0]}, or try ${nb[1]}.`
    : `Children who like spotting the odd ${glower} get sharper at noticing fine differences each time. When this feels easy, find the odd one in ${nb[0]}, or try ${nb[1]}.`;
  const tail = mode === 'cross-theme' ? ' and every round builds a child’s eye for categories and a feel for what makes a group a group.' : ' and the more a child compares, the quicker they spot what doesn’t fit.';
  return `${opener} You can also browse every odd-one-out worksheet or the whole kindergarten collection — each sheet prints cleanly or plays online for free,${tail}`;
}

function gcd(a,b){ while(b){ const t=a%b; a=b; b=t; } return a; }
function coprimeStride(cells){ let k=Math.max(2,Math.round(cells*0.6180339887)); for(let d=0;d<cells;d++) for(const cand of [k+d,k-d]) if(cand>1&&cand<cells&&gcd(cand,cells)===1) return cand; return 1; }
function cellAssign(i,S,P){ const cells=S*P, stride=coprimeStride(cells); const c=((i%cells)*stride)%cells; return {skel:c%S, p2:Math.floor(c/S)%P}; }

const MODES = {
  'same-theme':  { SKEL: SKEL_SAME, P2: P2_SAME, prefix:'odd-one-out-', eyebrow:'Odd One Out Worksheet', strand:'Logical reasoning — classification (readiness)', h1:(h)=>`Odd One Out with ${h}`, nbVerb:'odd one out with ', label:(t)=>`Odd One Out with ${t}` },
  'cross-theme': { SKEL: SKEL_CROSS, P2: P2_CROSS, prefix:'odd-one-out-cross-theme-', eyebrow:'Odd One Out Worksheet', strand:'Logical reasoning — classification (readiness)', h1:(h)=>`Odd One Out with ${h} — Different Group`, nbVerb:'odd one out with ', label:(t)=>`Odd One Out with ${t} — Different Group` },
};
function landingSlugOf(co){ const M=MODES[co.mode]; return co.siblings.length > 1 ? `${M.prefix}${co.slugTheme}-kindergarten` : co.canonical; }

function buildMode(mode){
  const list = COORDS.filter(c=>c.mode===mode).slice().sort((a,b)=> a.theme<b.theme?-1:1);
  const M = MODES[mode];
  const cells = M.SKEL.length * M.P2.length;
  if (cells <= list.length) console.log(`  [INVARIANT WARN] odd-one-out/${mode}: ${cells} <= ${list.length}`);
  else console.log(`  [invariant OK] odd-one-out/${mode}: ${M.SKEL.length}x${M.P2.length}=${cells} > breadth ${list.length} — zero forced same-cell collisions`);
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
      coordinate: { type:'odd-one-out', mode, theme:co.theme, level:'kindergarten' },
      eyebrow: M.eyebrow,
      h1: M.h1(d.h1),
      strand: M.strand,
      slotTokens: d.nouns.replace(/ and /g,', ').split(', ').map(s=>s.replace(/^(a|an|the) /,'').trim()).concat([d.gen, co.theme.replace(/_/g,' '), 'kindergarten', 'odd one out']),
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
    // NO `standard` key — readiness.
    if (co.siblings.length>1) entry.collapseSiblings = co.siblings;
    out.push(entry);
  });
  return {out, blocked};
}

let generated=[]; let blockedTotal=0;
['same-theme','cross-theme'].forEach(m=>{ const r=buildMode(m); generated=generated.concat(r.out); blockedTotal+=r.blocked; });

const cur = JSON.parse(fs.readFileSync(EN,'utf8'));
const keep = cur.landings.filter(l => l.coordinate.type !== 'odd-one-out');
const merged = { _note: cur._note + ' [Wave 5 odd-one-out: '+generated.length+' same+cross /K readiness (Logical reasoning - classification (readiness), NO alignment); same=within-category, cross=cross-category; chart-count fence; category-centered.]', landings: keep.concat(generated) };
fs.writeFileSync(EN, JSON.stringify(merged, null, 2) + '\n');
console.log(`generated ${generated.length} odd-one-out landings (blocked ${blockedTotal}); total landings now ${merged.landings.length}`);
let short=0, fence=0, banned=0, vis=0, hasStd=0;
const FENCE=['count how','how many','classify and count','tally','count the','count each','chart the','chart each'];
const BAN=['fun and engaging','perfect for','great for','dive into','engaging','captivating','unlock','boost','supercharge','easy and fun','one of the earliest'];
const VISUAL=['busy scene','hidden in the','search the scene','look around the picture','find it in the scene']; // visual-search leak (must stay category-centered)
generated.forEach(e=>{const body=(e.p1+' '+e.p2+' '+e.p3); const lc=body.toLowerCase(); const w=body.split(/\s+/).filter(Boolean).length;
  if(w<200){short++; console.log(`  SHORT ${e.slug}: ${w}`);}
  FENCE.forEach(x=>{if(lc.includes(x)){fence++;console.log(`  FENCE-LEAK ${e.slug}: "${x}"`);}});
  BAN.forEach(x=>{if(lc.includes(x)){banned++;console.log(`  BANNED ${e.slug}: "${x}"`);}});
  VISUAL.forEach(x=>{if(lc.includes(x)){vis++;console.log(`  VISUAL-SEARCH-LEAK ${e.slug}: "${x}"`);}});
  if('standard' in e){hasStd++;console.log(`  HAS-STANDARD ${e.slug}`);}
});
console.log(short?`${short} short`:'all >=200 words', '|', fence?`${fence} count-fence`:'fence clean', '|', banned?`${banned} banned`:'no banned', '|', vis?`${vis} visual-search-leak`:'category-centered (no visual-search)', '|', hasStd?`${hasStd} HAS-STANDARD`:'all readiness');