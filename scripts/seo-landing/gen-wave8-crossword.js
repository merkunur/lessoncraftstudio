#!/usr/bin/env node
/* Wave 8 FINAL — EN crossword/null Gr2, STANDARD-class (L.2.2.d, Language/ELA). The EN arc's LAST coordinate.
 * Mechanic (crossword.html): spell vocabulary words into an INTERSECTING grid from picture clues; orthographic
 * spell-and-check, NO letter bank. STANDARD: educationalAlignment L.2.2.d (generalize learned spelling patterns;
 * no-targetUrl), strand "Language" (raw l.strand; already wired via word-guess W4; no wiring), level grade-2,
 * "Common Core" chip. ELA NOT math — copy carries ZERO math framing (no within-100/addition/sum/two-digit).
 * 8 P1 x 7 P2 = 56 > 44. Usage: node scripts/seo-landing/gen-wave8-crossword.js
 */
const fs = require('fs');
const EN = 'frontend/content/seo-landing/en.json';
const COORDS = JSON.parse(fs.readFileSync('scripts/seo-landing/wave8-crossword-coordinates.json', 'utf8')).coordinates;
const litA = fs.readFileSync('scripts/seo-landing/gen-wave4-literacyA.js', 'utf8');
const THEMES = (function () { const m = litA.match(/const THEMES = (\{[\s\S]*?\n\});/); if (!m) throw new Error('THEMES extract failed'); return eval('(' + m[1] + ')'); })();

const SKEL = [
  (g)=>`This Grade 2 picture crossword worksheet builds spelling practice into a grid of ${g}. Each picture is a clue, and the child spells its word into the crossing squares — letter by letter, with words sharing letters where they intersect. Spelling familiar words correctly, applying the patterns second graders learn, is real L.2.2.d practice, and the interlocking grid makes a child check every letter. There is no letter bank; the child spells from memory.`,
  (g)=>`Spell the words to fill the crossword! On this Grade 2 worksheet a picture clue points to each word, and the child writes it into the grid square by square. Because the words cross, a letter spelled wrong in one throws off another — so the puzzle rewards careful spelling. Generalizing the spelling patterns of second grade to spell each ${g} word is the genuine skill, dressed as a crossword.`,
  (g)=>`This Grade 2 crossword turns spelling into a grid of ${g}. The child reads each picture clue and spells the word into the crossing boxes, fitting it with the words it intersects. Applying second-grade spelling patterns — and self-checking where words share a letter — is the L.2.2.d skill at work. The interlocking grid means a single misspelling shows up, so a child spells with care.`,
  (g)=>`On this Grade 2 worksheet, a picture crossword of ${g} asks a child to spell each clue's word into the grid. Words cross and share letters, so spelling one correctly helps place the next. That orthographic practice — recalling how a word is spelled and writing it, letter by letter — is the heart of second-grade L.2.2.d, and the crossing grid checks the child's work as it fills in.`,
  (g)=>`Fill the crossword by spelling. This Grade 2 worksheet gives a child picture clues for ${g} and a grid to spell them into, across and down. Each word shares letters with the words it crosses, so accurate spelling is its own check. Generalizing the spelling patterns a second grader knows to write each word is the real L.2.2.d work, and the grid makes the puzzle satisfying to complete.`,
  (g)=>`This Grade 2 picture crossword worksheet hides a grid of ${g} words behind picture clues. The child names each picture and spells its word into the crossing squares. Where two words meet they must share the same letter — so a misspelling will not fit, and the puzzle nudges a child to spell carefully. That self-checking spelling practice is exactly the L.2.2.d skill second grade builds.`,
  (g)=>`Spell across and down! On this Grade 2 worksheet a child completes a crossword of ${g} by spelling the word each picture clue shows. The interlocking grid means letters are shared between crossing words, so spelling accurately matters. Recalling and writing second-grade words letter by letter — applying the spelling patterns of the year — is the genuine L.2.2.d practice behind the puzzle.`,
  (g)=>`A Grade 2 picture crossword for spellers: each clue is a ${g} picture, and the child spells its word into the grid where it crosses the others. Sharing letters at the intersections, the words check one another, so a careful speller finishes a clean grid. Generalizing learned spelling patterns to write each word is the L.2.2.d skill, and the crossword turns spelling practice into a puzzle a child enjoys.`,
];
const P2 = [
  (g)=>`Spelling words correctly is a core second-grade skill, and L.2.2.d asks children to generalize the spelling patterns they have learned to write words on their own. A crossword makes that practice self-checking: where two words cross they share a letter, so a misspelling simply will not fit. Spelling ${g} words into the grid turns careful spelling into a satisfying puzzle.`,
  (g)=>`By second grade, children spell familiar words from memory, applying patterns rather than copying. A picture crossword draws on exactly that: each ${g} clue asks a child to recall a word's spelling and write it letter by letter. The crossing grid rewards accuracy — a word spelled right fits its neighbours, a word spelled wrong does not — so the puzzle quietly trains careful spelling.`,
  (g)=>`The L.2.2.d skill is orthographic: knowing how words are spelled and producing them correctly. A crossword is a natural fit, because the interlocking words check each other — share a letter at every crossing, and an error shows up at once. Spelling ${g} words into the grid gives a second grader real spelling practice with built-in feedback, no answer key needed.`,
  (g)=>`A picture crossword asks a child to do what second-grade spelling is all about: recall a word and spell it accurately. Each ${g} clue is a word to produce from memory, and the crossing grid means letters are shared, so accuracy carries through the whole puzzle. That self-correcting practice — spell it right and it fits — is the L.2.2.d skill made into a game.`,
  (g)=>`Generalizing spelling patterns to write words is the heart of second-grade L.2.2.d, and a crossword exercises it directly: every ${g} clue is a word the child must spell into the grid. Because crossing words share letters, the puzzle checks itself — a clean grid means clean spelling. That immediate feedback makes a child attend to every letter.`,
  (g)=>`Second graders move from copying words to spelling them from memory, applying the patterns they have learned. A picture crossword of ${g} puts that to work: the child names each picture and spells its word into the crossing squares. The shared letters at the intersections turn the grid into its own check, rewarding the careful speller with a puzzle that simply fits together.`,
  (g)=>`What makes a crossword good spelling practice is the interlock: spell one ${g} word correctly and it sets up the next, spell it wrong and the grid will not close. That built-in check is why crosswords suit L.2.2.d so well — they ask a second grader to spell accurately and reward it immediately. Recalling and writing each word, letter by letter, is the genuine skill behind the puzzle.`,
];
function p3(nb){ return `Children enjoy the click of a crossword fitting together, and a clean grid is a satisfying proof of careful spelling. When this is easy, spell the words in ${nb[0]}, or try ${nb[1]}. You can also browse every picture crossword or the whole second-grade collection — each sheet prints cleanly or plays online for free, and the more words a child spells into a grid, the surer their second-grade spelling grows, one crossing word at a time.`; }

function gcd(a,b){ while(b){ const t=a%b; a=b; b=t; } return a; }
function coprimeStride(cells){ let k=Math.max(2,Math.round(cells*0.6180339887)); for(let d=0;d<cells;d++) for(const cand of [k+d,k-d]) if(cand>1&&cand<cells&&gcd(cand,cells)===1) return cand; return 1; }
function cellAssign(i,S,P){ const cells=S*P, stride=coprimeStride(cells); const c=((i%cells)*stride)%cells; return {skel:c%S, p2:Math.floor(c/S)%P}; }

function landingSlugOf(co){ return co.siblings.length > 1 ? `crossword-${co.slugTheme}-grade-2` : co.canonical; }

const list = COORDS.slice().filter(co=>!!THEMES[co.theme]).sort((a,b)=> a.theme<b.theme?-1:1);
const cells = SKEL.length * P2.length;
console.log(cells > list.length ? `  [invariant OK] crossword: ${SKEL.length}x${P2.length}=${cells} > breadth ${list.length}` : `  [INVARIANT WARN] ${cells} <= ${list.length}`);
const out=[];
list.forEach((co,i)=>{
  const d = THEMES[co.theme];
  const cell = cellAssign(i, SKEL.length, P2.length);
  const nbA=list[(i+1)%list.length], nbB=list[(i+5)%list.length];
  const nb=[ `picture crossword with ${THEMES[nbA.theme].h1.toLowerCase()}`, `picture crossword with ${THEMES[nbB.theme].h1.toLowerCase()}` ];
  const entry = {
    slug: landingSlugOf(co), variantShape: co.siblings.length>1?'collapsed':'singleton',
    coordinate: { type:'crossword', mode:null, theme:co.theme, level:'grade-2' },
    eyebrow: 'Crossword Worksheet',
    h1: `Picture Crossword with ${d.h1} — Grade 2`,
    strand: 'Language',
    standard: 'L.2.2.d',
    slotTokens: d.nouns.replace(/ and /g,', ').split(', ').map(s=>s.replace(/^(a|an|the) /,'').trim()).concat([d.gen, co.theme.replace(/_/g,' '), 'grade 2', 'crossword', 'spelling']),
    p1: SKEL[cell.skel](d.gen), p2: P2[cell.p2](d.gen), p3: p3(nb),
    canonicalDeckSlug: co.canonical,
    carousel: [1,2,5,11].map(k=>({label:`Picture Crossword with ${THEMES[list[(i+k)%list.length].theme].h1} — Grade 2`, href: landingSlugOf(list[(i+k)%list.length])})),
  };
  if (co.siblings.length>1) entry.collapseSiblings = co.siblings;
  out.push(entry);
});

const cur = JSON.parse(fs.readFileSync(EN,'utf8'));
const keep = cur.landings.filter(l => l.coordinate.type !== 'crossword');
const merged = { _note: cur._note + ` [Wave 8 FINAL crossword: ${out.length} /Grade-2 STANDARD L.2.2.d (Language/ELA); spell-into-grid; the EN arc's last coordinate.]`, landings: keep.concat(out) };
fs.writeFileSync(EN, JSON.stringify(merged, null, 2) + '\n');
console.log(`generated ${out.length} crossword landings; total landings now ${merged.landings.length}`);
let short=0, banned=0, mathleak=0, gr3leak=0, nospell=0, noStd=0, badStrand=0, notG2=0;
const BAN=['fun and engaging','perfect for','great for','dive into','engaging','captivating','unlock','boost','supercharge','easy and fun','one of the earliest','ideal for'];
const MATHLEAK=['within 100','addition','subtraction',' sum ',' sums ','two-digit','two digit','arithmetic','base ten','base-ten'];
const GR3LEAK=['paragraph','multisyllabic','prefix and suffix','third grade','3rd grade'];
const SPELL=['spell','spelling','crossword'];
out.forEach(e=>{const body=(e.p1+' '+e.p2+' '+e.p3); const lc=body.toLowerCase(); const w=body.split(/\s+/).filter(Boolean).length;
  if(w<200){short++; console.log(`  SHORT ${e.slug}: ${w}`);}
  BAN.forEach(x=>{if(lc.includes(x)){banned++;console.log(`  BANNED ${e.slug}: "${x}"`);}});
  MATHLEAK.forEach(x=>{if(lc.includes(x)){mathleak++;console.log(`  MATH-LEAK ${e.slug}: "${x}"`);}});
  GR3LEAK.forEach(x=>{if(lc.includes(x)){gr3leak++;console.log(`  GR3-DRIFT ${e.slug}: "${x}"`);}});
  if(!SPELL.some(x=>lc.includes(x))){nospell++;console.log(`  MISSING-SPELLING ${e.slug}`);}
  if(e.standard!=='L.2.2.d'){noStd++;}
  if(e.strand!=='Language'){badStrand++;}
  if(e.coordinate.level!=='grade-2'){notG2++;}
});
console.log(short?`${short} short`:'all >=200 words', '|', banned?`${banned} banned`:'no banned', '|', mathleak?`${mathleak} MATH-LEAK`:'no math framing (ELA)', '|', gr3leak?`${gr3leak} GR3-DRIFT`:'no Gr3 drift', '|', nospell?`${nospell} MISSING-spelling`:'all spelling', '|', noStd?`${noStd} STD-BAD`:'all L.2.2.d', '|', badStrand?`${badStrand} STRAND-BAD`:'all Language', '|', notG2?`${notG2} NOT-G2`:'all grade-2');