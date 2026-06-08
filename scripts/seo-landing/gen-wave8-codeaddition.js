#!/usr/bin/env node
/* Wave 8 COUPLED — EN code-addition/{null,secret-word} Gr2, STANDARD-class (2.NBT.B.5). The 2nd breacher set.
 * Mechanic (code-addition.html): legend maps pictures->numbers; solve multi-addend addition (running-sum within 100).
 * Full-corpus re-grade (running-sum, deck-html): 101 coords -> 51 Gr1 + 50 Gr2 (null 18 + secret-word 32) + 0 Gr3 (max
 * sum 40). null = SECRET-CODE (decode a hidden message); secret-word = MYSTERY-WORD (the answers spell a word). STANDARD
 * reuses the math-puzzle-Gr2 wiring (2.NBT.B.5, strand "Number & Operations in Base Ten" raw l.strand, level grade-2).
 * 🚩 Gr1-vs-Gr2 BOUNDARY FENCE: within-100/two-digit; NEVER Gr1 within-20/single-digit. NO Gr3 drift (no >100/multiply).
 * 8 P1 x 7 P2 each = 56 > breadths. Usage: node scripts/seo-landing/gen-wave8-codeaddition.js
 */
const fs = require('fs');
const EN = 'frontend/content/seo-landing/en.json';
const litA = fs.readFileSync('scripts/seo-landing/gen-wave4-literacyA.js', 'utf8');
const THEMES = (function () { const m = litA.match(/const THEMES = (\{[\s\S]*?\n\});/); if (!m) throw new Error('THEMES extract failed'); return eval('(' + m[1] + ')'); })();
const COORDS = JSON.parse(fs.readFileSync('scripts/seo-landing/wave8-codeaddition-coordinates.json', 'utf8')).coordinates;

// ---- null = SECRET-CODE (decode) ----
const CN_SKEL = [
  (g)=>`This Grade 2 secret code math worksheet builds addition within 100 into a code to crack, decorated with ${g}. A legend gives each picture a number, and the child adds the values to solve each clue and break the code. Every correctly added clue decodes another part of a hidden message — and a wrong sum leaves the code unreadable, so the puzzle rewards careful work. The code-cracking carries a child clue by clue.`,
  (g)=>`Crack the code with addition! On this Grade 2 worksheet a legend assigns each ${g} picture a number, and the child adds them — within 100 — to decode the answers. Each sum solved cracks another part of the code, and the concealed message slowly surfaces. A young solver keeps adding carefully because the code will not give up its secret without correct answers.`,
  (g)=>`This Grade 2 secret code worksheet turns addition within 100 into a decoding puzzle with ${g}. Each picture in the legend holds a number, and the child adds them to reveal the code. The fun is in the breaking: a child decodes one clue, then the next, and a hidden answer emerges. Each correct sum brings the message closer, so accuracy is its own reward.`,
  (g)=>`On this Grade 2 worksheet, a secret code of ${g} is solved by adding within 100. The legend turns each picture into a number; the child adds to decode each answer and uncover the message. Cracking the code clue by clue gives every sum a purpose — a child adds carefully because a single mistake garbles what the code is trying to say.`,
  (g)=>`Two-digit addition, one secret code: this Grade 2 worksheet hides a message in a code of ${g} to crack. The legend assigns numbers to pictures; the child adds within 100 to decode. The draw is the reveal — each cracked clue brings the hidden answer into focus, and the half-broken code dares a solver to finish. The decoding, not the adding, is the hook.`,
  (g)=>`This Grade 2 secret code math worksheet hides answers behind sums of ${g} values. Each picture has a number in the legend, and the child adds within 100 to crack the code. A correctly decoded clue reveals part of the message; a wrong one scrambles it. That feedback — decode right, reveal more — keeps a young solver working carefully to crack the whole code.`,
  (g)=>`Break the code by adding! On this Grade 2 worksheet a legend gives each ${g} picture a value, and the child adds within 100 to decode each clue. As the clues fall, a concealed message comes into view, and the urge to read it carries a child onward. Cracking the code proves the arithmetic is done — the secret revealed is the proof.`,
  (g)=>`A Grade 2 secret code built on addition: a legend turns ${g} pictures into numbers, and adding them within 100 decodes the answers. The child solves a sum, cracks a clue, and a hidden message grows clearer. The pleasure of breaking the code — of the secret surfacing one clue at a time — is what makes a young solver want to add every value right.`,
];
const CN_P2 = [
  (g)=>`A secret code gives addition a mission: every sum a child solves cracks another part of a hidden message. That sense of breaking a code — of arithmetic uncovering something hidden — is what makes a child eager to work carefully. The sums sit within 100, the real second-grade skill, but it is the cracked code, not the adding, that keeps a young solver reaching for the next clue.`,
  (g)=>`Code-breaking turns careful addition into detective work. Each within-100 sum a child solves is a clue, and the clues together uncover a concealed answer about ${g}. A solver who slips gets a code that does not quite read, so the puzzle rewards accuracy directly. The decoding is the draw; the two-digit adding is the skill it quietly drills.`,
  (g)=>`The pleasure of a secret code is the reveal: a child adds, decodes a symbol, and a hidden message slowly surfaces. That payoff makes a young solver want every sum right, because a wrong answer garbles the code. The sums stay within 100 — genuine 2.NBT practice — but the code-cracking, not the arithmetic, holds a child's attention to the end.`,
  (g)=>`Decoding is a reason to compute. A legend turns ${g} pictures into numbers, the child adds to find each value, and the answers reveal a coded message. Cracking the code clue by clue gives every within-100 sum an immediate purpose. A child works at careful addition not because it is assigned, but because the code will not break without it.`,
  (g)=>`A secret code rewards a solver who works carefully: each correctly decoded clue brings the hidden message into focus, while a mistake leaves it scrambled. That feedback loop — decode right, reveal more — is what makes code-breaking compelling. The within-100 sums are the engine, but the satisfaction of cracking the whole code is why a child keeps solving.`,
  (g)=>`Breaking a code feels like uncovering a secret, and that is the draw. A child adds within 100 to decode each clue, and as the clues fall the concealed answer about ${g} appears. The thrill of revelation — of the code giving up its message — turns careful addition from a worksheet into a mystery a young solver wants to crack.`,
  (g)=>`What makes a secret code stick is the urge to finish decoding it. A child solves a within-100 sum, decodes a clue, and the partial message begs to be completed. That pull — the half-cracked code daring a solver onward — keeps a child working carefully through the ${g} clues. The decoding is the hook; the second-grade addition is the skill underneath.`,
];
function cnP3(nb){ return `Children love the thrill of cracking a secret code, and a fully decoded message is a satisfying proof of real within-100 skill. When this is easy, crack the code in ${nb[0]}, or try ${nb[1]}. You can also browse every Grade 2 secret code worksheet or the whole second-grade collection — each sheet prints cleanly or plays online for free, and the more within-100 sums a child solves, the surer their two-digit addition grows, one cracked clue at a time, building real second-grade base-ten fluency.`; }

// ---- secret-word = MYSTERY-WORD (the answers spell a word) ----
const SW_SKEL = [
  (g)=>`This Grade 2 secret word math worksheet hides a word behind addition within 100. The child adds ${g}-themed values, and each answer points to a letter, spelling a mystery word. As the letters land the word starts to read, and a child guesses ahead and races to confirm it. The fun is the spelling-out — the arithmetic is the quiet skill that reveals each letter.`,
  (g)=>`What word is hidden? On this Grade 2 worksheet the child adds ${g} values within 100, and each sum reveals a letter — together they spell a secret word. The message uncovers one letter at a time, and a young solver who slips on a sum gets a letter that does not fit. So accuracy spells success, and the half-read word pulls a child to finish it.`,
  (g)=>`This Grade 2 secret word worksheet turns addition into a hidden message with ${g}. Each sum the child solves within 100 gives a letter, and the letters spell a word. The draw is the reveal: three letters in, a child can often guess the rest, and the urge to confirm the guess keeps a young solver adding carefully to the last letter.`,
  (g)=>`On this Grade 2 worksheet, the answers to additions spell a secret word, themed around ${g}. The child adds within 100, and each result reveals a letter. Watching the word fill in gives every sum a purpose — a child adds carefully because a single wrong letter can hide the word, and reading the finished message is the whole point.`,
  (g)=>`Two-digit addition, one hidden word: this Grade 2 worksheet builds a ${g}-themed word for a child to uncover. Each answer reveals a letter; solving the sums within 100 spells the secret word. The reward is recognition — the moment the scattered letters suddenly read as a word — and that payoff makes a young solver want every answer right.`,
  (g)=>`This Grade 2 secret word math worksheet hides a word behind sums of ${g} values. Each answer the child adds reveals a letter, and the letters spell the message. A correct sum lands a letter; a wrong one leaves a blank, so careful adding literally spells the word. The pleasure of completing it carries a child through every within-100 sum.`,
  (g)=>`Spell the secret word by adding! On this Grade 2 worksheet the child adds ${g} values within 100, and each sum reveals a letter of a hidden word. As the letters appear the word takes shape, and the wanting-to-read-it pulls a young solver onward. The finished word proves the arithmetic is done — the message spelled out is the proof.`,
  (g)=>`A Grade 2 word puzzle built on addition: the child adds ${g}-themed values within 100, and the answers spell a secret word. Each solved sum uncovers one more letter, and a half-spelled word is hard to leave alone. A young solver keeps adding carefully, letter by letter, until the mystery word reads clearly from start to finish.`,
];
const SW_P2 = [
  (g)=>`A hidden word gives addition a destination: every sum a child solves turns into a letter, and the letters build toward a word waiting to be read. That reach toward a finished word — of arithmetic spelling something out — is what makes a child work carefully. The sums stay within 100, the real second-grade skill, but it is the emerging word that pulls a solver forward.`,
  (g)=>`Spelling a secret word turns addition into a game a child wants to win. Each within-100 sum reveals one letter, and as letters accumulate a young solver starts to sense the ${g}-themed word before it is finished. That anticipation — almost reading it — keeps a child solving. The two-digit adding is the skill; the word taking shape is the reward.`,
  (g)=>`The draw of a secret word is the unscrambling: a child adds, a letter appears, and a mystery word slowly resolves. Each correct within-100 sum brings one more letter, so accuracy literally spells success. A child works at careful addition because a wrong answer leaves a gap in the word — the spelling, not the arithmetic, is what holds the attention.`,
  (g)=>`Revealing a word letter by letter is a reason to compute. The child adds ${g} values to find each answer, and each answer points to a letter of a concealed word. Watching the word fill in gives every within-100 sum an immediate payoff. A young solver works carefully because a single wrong letter can hide the word, and reading it is the whole point.`,
  (g)=>`A secret word rewards the patient solver: each revealed letter narrows down the answer, and the last few sums often give the word away. That building anticipation — three letters in, guessing the rest — is what makes word-revealing compelling. The within-100 sums drive it, but the satisfaction of spelling out the hidden word is why a child keeps going.`,
  (g)=>`Uncovering a hidden word feels like solving a riddle, and that is the appeal. A child adds within 100 to reveal each letter, and as the letters land the secret ${g}-themed word takes shape. The pleasure of recognition — of the word suddenly readable — turns careful addition from a drill into a message a young solver wants to spell out.`,
  (g)=>`A half-spelled word is hard to leave alone — a child with three letters wants the rest. So a young solver keeps adding within 100, revealing one letter at a time, until the ${g}-themed word reads clearly. The wanting-to-read-it carries a child through the sums; the second-grade addition is the skill the spelling quietly builds.`,
];
function swP3(nb){ return `Children love uncovering a hidden word one letter at a time, and the finished word is a satisfying proof of within-100 skill. When this is easy, spell the word in ${nb[0]}, or try ${nb[1]}. You can also browse every Grade 2 secret word worksheet or the whole second-grade collection — each sheet prints cleanly or plays online for free, and the more within-100 sums a child solves, the surer their two-digit addition grows, one revealed letter at a time, building real and lasting second-grade base-ten fluency.`; }

function gcd(a,b){ while(b){ const t=a%b; a=b; b=t; } return a; }
function coprimeStride(cells){ let k=Math.max(2,Math.round(cells*0.6180339887)); for(let d=0;d<cells;d++) for(const cand of [k+d,k-d]) if(cand>1&&cand<cells&&gcd(cand,cells)===1) return cand; return 1; }
function cellAssign(i,S,P){ const cells=S*P, stride=coprimeStride(cells); const c=((i%cells)*stride)%cells; return {skel:c%S, p2:Math.floor(c/S)%P}; }

function buildMode(cfg) {
  // manifest stores the null submode as the string 'null'; normalize to JS null before comparing to cfg.mode.
  const norm = (m)=> (m==='null' ? null : m);
  const list = COORDS.filter(co => norm(co.mode) === cfg.mode && !!THEMES[co.theme]).sort((a,b)=> a.theme<b.theme?-1:1);
  const slugOf = (co)=> co.siblings.length>1 ? `${cfg.slugPrefix}${co.slugTheme}-grade-2` : co.canonical;
  const cells = cfg.SKEL.length * cfg.P2.length;
  console.log(cells > list.length ? `  [invariant OK] code-addition/${cfg.mode}: ${cfg.SKEL.length}x${cfg.P2.length}=${cells} > breadth ${list.length}` : `  [INVARIANT WARN] ${cfg.mode} ${cells} <= ${list.length}`);
  return list.map((co,i)=>{
    const d = THEMES[co.theme];
    const cell = cellAssign(i, cfg.SKEL.length, cfg.P2.length);
    const nbA=list[(i+1)%list.length], nbB=list[(i+5)%list.length];
    const nb=[ `${cfg.nbLabel} ${THEMES[nbA.theme].h1.toLowerCase()}`, `${cfg.nbLabel} ${THEMES[nbB.theme].h1.toLowerCase()}` ];
    const entry = {
      slug: slugOf(co), variantShape: co.siblings.length>1?'collapsed':'singleton',
      coordinate: { type:'code-addition', mode:cfg.mode, theme:co.theme, level:'grade-2' },
      eyebrow: cfg.eyebrow, h1: `${cfg.h1Prefix} ${d.h1} — Grade 2`,
      strand: 'Number & Operations in Base Ten', standard: '2.NBT.B.5',
      slotTokens: d.nouns.replace(/ and /g,', ').split(', ').map(s=>s.replace(/^(a|an|the) /,'').trim()).concat([d.gen, co.theme.replace(/_/g,' '), 'grade 2', 'within 100'].concat(cfg.tokens)),
      p1: cfg.SKEL[cell.skel](d.gen), p2: cfg.P2[cell.p2](d.gen), p3: cfg.p3(nb),
      canonicalDeckSlug: co.canonical,
      carousel: [1,2,5,11].map(k=>({label:`${cfg.h1Prefix} ${THEMES[list[(i+k)%list.length].theme].h1} — Grade 2`, href: slugOf(list[(i+k)%list.length])})),
    };
    if (co.siblings.length>1) entry.collapseSiblings = co.siblings;
    return entry;
  });
}

const cn = buildMode({ mode:null, slugPrefix:'code-addition-', SKEL:CN_SKEL, P2:CN_P2, p3:cnP3, eyebrow:'Secret Code Math Worksheet', h1Prefix:'Secret Code Math with', nbLabel:'secret code math with', tokens:['secret code','crack the code'] });
const sw = buildMode({ mode:'secret-word', slugPrefix:'code-addition-secret-word-', SKEL:SW_SKEL, P2:SW_P2, p3:swP3, eyebrow:'Secret Word Math Worksheet', h1Prefix:'Secret Word Math with', nbLabel:'secret word math with', tokens:['secret word','mystery word'] });
const out = cn.concat(sw);

const cur = JSON.parse(fs.readFileSync(EN,'utf8'));
const keep = cur.landings.filter(l => !(l.coordinate.type==='code-addition' && l.coordinate.level==='grade-2'));
const merged = { _note: cur._note + ` [Wave 8 coupled code-addition Gr2: null ${cn.length} (secret-code) + secret-word ${sw.length} (mystery-word) /Grade-2 STANDARD 2.NBT.B.5; within-100; full-corpus re-grade 50.]`, landings: keep.concat(out) };
fs.writeFileSync(EN, JSON.stringify(merged, null, 2) + '\n');
console.log(`generated null ${cn.length} + secret-word ${sw.length} = ${out.length}; total landings now ${merged.landings.length}`);
let short=0, banned=0, w100=0, gr1leak=0, gr3leak=0, noStd=0, notG2=0;
const BAN=['fun and engaging','perfect for','great for','dive into','engaging','captivating','unlock','boost','supercharge','easy and fun','one of the earliest','ideal for'];
const W100=['within 100','to 100','two-digit','two digit'];
const GR1LEAK=['within 20','single-digit','single digit'];
const GR3LEAK=['multiplication','multiply','three-digit','three digit','within 1000','hundreds place'];
out.forEach(e=>{const body=(e.p1+' '+e.p2+' '+e.p3); const lc=body.toLowerCase(); const w=body.split(/\s+/).filter(Boolean).length;
  if(w<200){short++; console.log(`  SHORT ${e.slug}: ${w}`);}
  BAN.forEach(x=>{if(lc.includes(x)){banned++;console.log(`  BANNED ${e.slug}: "${x}"`);}});
  if(!W100.some(x=>lc.includes(x))){w100++;console.log(`  MISSING-WITHIN-100 ${e.slug}`);}
  GR1LEAK.forEach(x=>{if(lc.includes(x)){gr1leak++;console.log(`  GR1-LEAK ${e.slug}: "${x}"`);}});
  GR3LEAK.forEach(x=>{if(lc.includes(x)){gr3leak++;console.log(`  GR3-DRIFT ${e.slug}: "${x}"`);}});
  if(e.standard!=='2.NBT.B.5'){noStd++;}
  if(e.coordinate.level!=='grade-2'){notG2++;}
});
console.log(short?`${short} short`:'all >=200 words', '|', banned?`${banned} banned`:'no banned', '|', w100?`${w100} MISSING-within-100`:'all within-100', '|', gr1leak?`${gr1leak} GR1-LEAK`:'no Gr1 leak', '|', gr3leak?`${gr3leak} GR3-DRIFT`:'no Gr3 drift', '|', noStd?`${noStd} STD-MISSING`:'all 2.NBT.B.5', '|', notG2?`${notG2} NOT-G2`:'all grade-2');