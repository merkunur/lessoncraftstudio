#!/usr/bin/env node
/* Wave 5 FINAL — EN matching/letter (RF.K.3.a) + matching/name (RF.K.3.c) × Kindergarten, STANDARD-bearing.
 * The wave's only standard-bearer. letter = match picture to its BEGINNING LETTER (the sound it starts with —
 * RF.K.3.a, sound-based); name = READ the written word and match it to the picture (RF.K.3.c, sight-reading).
 * STANDARD construction = find-and-count shape: `standard` field + strand "Reading: Foundational Skills" (ELA — the
 * non-math signal); route emits the no-targetUrl AlignmentObject + "Common Core" chip. §20.10 code in JSON-LD only.
 * letter↔name differentiate on the SOUND-vs-SIGHT axis; cross-axis leak lint enforces it. matching/letter shares
 * RF.K.3.a with live find-and-count but differs on MECHANIC (match-to-letter vs find-in-scene).
 * 8 P1 x 7 P2 = 56 > 47/44 (coprime + guard). Usage: node scripts/seo-landing/gen-wave5-matching.js
 */
const fs = require('fs');
const EN = 'frontend/content/seo-landing/en.json';
const COORDS = JSON.parse(fs.readFileSync('scripts/seo-landing/wave5-matching-coordinates.json', 'utf8')).coordinates;
const litA = fs.readFileSync('scripts/seo-landing/gen-wave4-literacyA.js', 'utf8');
const THEMES = (function () { const m = litA.match(/const THEMES = (\{[\s\S]*?\n\});/); if (!m) throw new Error('THEMES extract failed'); return eval('(' + m[1] + ')'); })();

// LETTER = match picture to its BEGINNING LETTER (sound it starts with). RF.K.3.a. NOT "read the word". (n)=nouns,(g)=gen.
const SKEL_LETTER = [
  (n,g)=>`This Kindergarten worksheet pairs each picture with the letter it starts with. Down one side are ${g} — pictures like ${n} — and down the other are letters; the child draws a line from each picture to its beginning letter, the one that makes the sound the word starts with. Listening for that first sound and matching it to the right letter builds letter-sound knowledge, the foundation of early reading.`,
  (n,g)=>`What letter does it start with? On this matching sheet a child connects each ${g} picture to its beginning letter. Looking at ${n} and the others, the child says the word, listens for the first sound, and draws a line to the letter that makes it. Matching pictures to their starting letters is beginning letter-sound practice — the core decoding skill Kindergarten readers are building.`,
  (n,g)=>`Match each picture to its first letter. This worksheet lists ${g} — ${n} among them — beside a column of letters, and the child links each picture to the letter its name begins with. Hearing the opening sound of a word and pairing it with the matching letter is foundational phonics, the letter-sound link that early reading depends on. The familiar pictures keep the focus on the sound.`,
  (n,g)=>`On this Kindergarten matching sheet, a child connects ${g} pictures to the letters they start with. For each picture — ${n} and more — the child sounds out the beginning, then draws a line to the letter that makes that sound. Pairing a picture with its starting letter rehearses letter-sound correspondence, the building block of decoding that Kindergarten readers practise on the way to reading words.`,
  (n,g)=>`Which letter makes the first sound? This sheet asks a child to match each ${g} picture to the letter it begins with. Among ${n} and others, the child listens for each word's opening sound and links it to the right letter. That listening-and-matching is beginning letter-sound work — the phonics foundation under early reading — and the familiar pictures keep it all about the starting sound.`,
  (n,g)=>`Draw a line from each picture to its beginning letter. This Kindergarten worksheet sets ${g} — ${n} and more — beside a row of letters, and the child pairs each picture with the letter that starts its name. Connecting a word's first sound to its letter builds the letter-sound knowledge at the heart of learning to read, and the familiar pictures make every match about hearing that opening sound.`,
  (n,g)=>`This matching worksheet builds beginning-sound skills with ${g}. The child looks at each picture — ${n} among them — says its name, and draws a line to the letter that makes its first sound. Matching pictures to their starting letters rehearses letter-sound correspondence, the foundational phonics that early Kindergarten reading is built on. Familiar pictures keep the task about the opening sound, not the spelling.`,
  (n,g)=>`Pair each picture with the letter it starts with. On this Kindergarten sheet a child connects ${g} — ${n} and others — to a set of letters, listening for each word's first sound and matching it to the right one. That beginning letter-sound matching is the core decoding foundation Kindergarten readers build, and the familiar pictures keep every line about the sound a word starts with.`,
];
const P2_LETTER = [
  (g)=>`Matching a picture to its beginning letter rehearses letter-sound correspondence — the link between a sound and the letter that spells it, which Common Core's foundational reading skills put at the heart of Kindergarten. A child who can hear a word's first sound and find its letter is building the decoding foundation that early reading depends on, and pictures make the practice concrete.`,
  (g)=>`This is beginning-sound phonics: the child says a word, isolates its opening sound, and matches it to the letter that makes it. That listen-and-link skill is foundational to learning to read — it is how a Kindergarten child starts to connect spoken language to print — and matching familiar ${g} pictures to letters keeps the practice playful and clear.`,
  (g)=>`Knowing which letter a word starts with — by its sound — is core Kindergarten reading readiness. Pairing each ${g} picture with its beginning letter rehearses that letter-sound link directly, building the phonics foundation a child needs before reading whole words. The pictures keep every match about hearing the first sound.`,
  (g)=>`Letter-sound knowledge is the bedrock of early decoding, and a beginning-letter match builds it one picture at a time: hear the word, catch its first sound, find the letter. For Kindergarten that is foundational reading practice, and using familiar ${g} pictures lets a child focus on the sound-to-letter link without needing to read whole words yet.`,
  (g)=>`The skill here is phonemic and alphabetic at once: a child isolates a word's beginning sound and matches it to its letter. That correspondence is exactly what Common Core's foundational reading skills ask of Kindergarten, and pairing ${g} pictures with letters rehearses it in a clear, confidence-building way. The focus stays on the opening sound.`,
  (g)=>`Connecting pictures to their starting letters teaches a child that letters stand for sounds — the core insight behind reading. A Kindergarten child practises hearing each word's first sound and linking it to print, building decoding readiness. Familiar ${g} pictures keep the task grounded in the sound a word begins with, not in spelling.`,
  (g)=>`Beginning letter-sound matching is foundational Kindergarten reading work: the child listens for a word's opening sound and finds the letter that makes it, building the sound-to-print link reading depends on. Doing it with familiar ${g} pictures keeps the practice concrete and the focus on the first sound, exactly where early phonics begins.`,
];

// NAME = READ the written word and match it to the picture (sight). RF.K.3.c. NOT "beginning letter/sound". (n)=nouns,(g)=gen.
const SKEL_NAME = [
  (n,g)=>`This Kindergarten worksheet asks a child to read short words and match each one to its picture. Down one side are written words; down the other are ${g} — pictures like ${n} — and the child reads each word and draws a line to the picture it names. Reading a familiar word by sight and pairing it with the right picture builds early word-reading, a core Kindergarten skill.`,
  (n,g)=>`Read the word, find the picture. On this matching sheet a child reads each written word and connects it to the matching ${g} picture. With ${n} and others to choose from, the child reads the whole word at a glance and links it to what it shows. Reading familiar words by sight and matching them to pictures is beginning word-recognition, foundational to learning to read.`,
  (n,g)=>`Match each word to its picture. This worksheet lists written words beside ${g} pictures — ${n} among them — and the child reads each word and draws a line to the picture it names. Recognizing a familiar word as a whole and pairing it with its meaning is sight-word reading, the Kindergarten skill of reading common words without working through them letter by letter.`,
  (n,g)=>`On this Kindergarten matching sheet, a child reads short words and connects each to its ${g} picture. Reading the words for ${n} and more, the child links every word to the picture it stands for. Matching written words to pictures rehearses sight-reading — recognizing whole familiar words at a glance — which Common Core's foundational reading skills build in Kindergarten.`,
  (n,g)=>`Can you read it and match it? This sheet asks a child to read each written word and pair it with the right ${g} picture. Among words for ${n} and others, the child reads the whole word and draws a line to what it names. Reading familiar words by sight and matching them to their pictures is core Kindergarten word-recognition, a foundation for reading sentences.`,
  (n,g)=>`Read each word and draw a line to its picture. This Kindergarten worksheet sets written words beside ${g} — ${n} and more — and the child reads every word and connects it to the picture it names. Recognizing common written words at sight and matching them to meaning is foundational reading, the word-reading skill Kindergarten children build toward fluent reading.`,
  (n,g)=>`This matching worksheet builds word-reading with ${g}. The child reads each written word — for ${n} and others — and draws a line to the picture it names. Reading whole familiar words by sight and pairing them with their pictures rehearses word-recognition, the Kindergarten reading skill of knowing common words instantly. The pictures confirm the meaning of each word read.`,
  (n,g)=>`Pair each written word with its picture. On this Kindergarten sheet a child reads short words and connects each to one of the ${g} — ${n} and others. Reading a familiar word as a whole and matching it to the picture it names is sight-word reading, the core Kindergarten skill of recognizing common words on the page, and the pictures keep each match meaningful.`,
];
const P2_NAME = [
  (g)=>`Matching a written word to its picture rehearses sight-reading — recognizing a familiar word as a whole — which Common Core's foundational reading skills build in Kindergarten. A child who reads common words at a glance and links them to meaning is developing the word-recognition that fluent reading depends on, and pictures confirm each word read.`,
  (g)=>`This is word-recognition practice: the child reads each written word and matches it to the picture it names. Reading familiar words by sight — instantly, as whole words — is a core Kindergarten reading skill, the step between knowing letters and reading sentences, and matching them to ${g} pictures keeps the meaning clear and the practice rewarding.`,
  (g)=>`Reading a word and pairing it with its picture builds the sight-word knowledge Kindergarten readers need: recognizing common words at a glance rather than working through each one. That whole-word reading is foundational to fluency, and matching written words to ${g} pictures rehearses it while keeping each word's meaning concrete.`,
  (g)=>`Sight-reading — knowing a familiar word instantly — is what lets early readers move beyond slow decoding, and a word-to-picture match builds it directly: read the word, find what it names. For Kindergarten that word-recognition is foundational reading practice, and ${g} pictures give each word an immediate meaning to match it to.`,
  (g)=>`The skill here is reading whole words: a child recognizes each written word at sight and links it to the picture it stands for. That word-recognition is exactly what Common Core's foundational reading skills ask of Kindergarten, and pairing words with familiar ${g} pictures rehearses it in a clear, meaningful way that builds reading confidence.`,
  (g)=>`Matching words to pictures teaches a child to read common words as wholes — recognizing them instantly rather than puzzling them out. That sight-word reading is the bridge to fluent reading, core Kindergarten work, and using familiar ${g} pictures keeps every word tied to its meaning so the reading stays purposeful.`,
  (g)=>`Word-recognition is foundational Kindergarten reading: the child reads a familiar word by sight and matches it to its picture, building the instant whole-word reading that fluency depends on. Doing it with ${g} pictures keeps each word meaningful and the practice rewarding, exactly the kind of reading early readers are ready for.`,
];

function p3(mode, glower, nb){
  if (mode === 'name')
    return `Children who like reading and matching ${glower} words build their sight vocabulary every time. When this feels easy, read the words in ${nb[0]}, or try ${nb[1]}. You can also browse every word-matching worksheet or the whole kindergarten collection — each sheet prints cleanly or plays online for free, and every match adds to the words a child can read at a glance, steadily growing the sight vocabulary that makes reading sentences feel natural and, in time, unhurried.`;
  return `Children who like matching ${glower} to their beginning letters get quicker at hearing first sounds each time. When this feels easy, match the letters in ${nb[0]}, or try ${nb[1]}. You can also browse every beginning-letter worksheet or the whole kindergarten collection — each sheet prints cleanly or plays online for free, and the more a child matches, the surer their grasp of letter sounds grows, building the phonics foundation that reading words rests on.`;
}

function gcd(a,b){ while(b){ const t=a%b; a=b; b=t; } return a; }
function coprimeStride(cells){ let k=Math.max(2,Math.round(cells*0.6180339887)); for(let d=0;d<cells;d++) for(const cand of [k+d,k-d]) if(cand>1&&cand<cells&&gcd(cand,cells)===1) return cand; return 1; }
function cellAssign(i,S,P){ const cells=S*P, stride=coprimeStride(cells); const c=((i%cells)*stride)%cells; return {skel:c%S, p2:Math.floor(c/S)%P}; }

const MODES = {
  'letter': { SKEL: SKEL_LETTER, P2: P2_LETTER, standard:'RF.K.3.a', strand:'Reading: Foundational Skills', eyebrow:'Beginning Letter Worksheet', h1:(h)=>`Beginning Letter Match with ${h}`, nbVerb:'beginning letters with ', label:(t)=>`Beginning Letter Match with ${t}` },
  'name':   { SKEL: SKEL_NAME, P2: P2_NAME, standard:'RF.K.3.c', strand:'Reading: Foundational Skills', eyebrow:'Word Matching Worksheet', h1:(h)=>`Word Match with ${h}`, nbVerb:'word match with ', label:(t)=>`Word Match with ${t}` },
};
function landingSlugOf(co){ return co.canonical; } // 1:1.

function buildMode(mode){
  const list = COORDS.filter(c=>c.mode===mode).slice().sort((a,b)=> a.theme<b.theme?-1:1);
  const M = MODES[mode];
  const cells = M.SKEL.length * M.P2.length;
  if (cells <= list.length) console.log(`  [INVARIANT WARN] matching/${mode}: ${cells} <= ${list.length}`);
  else console.log(`  [invariant OK] matching/${mode}: ${M.SKEL.length}x${M.P2.length}=${cells} > breadth ${list.length} — zero forced same-cell collisions`);
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
      coordinate: { type:'matching', mode, theme:co.theme, level:'kindergarten' },
      eyebrow: M.eyebrow,
      h1: M.h1(d.h1),
      strand: M.strand,
      standard: M.standard,
      slotTokens: d.nouns.replace(/ and /g,', ').split(', ').map(s=>s.replace(/^(a|an|the) /,'').trim()).concat([d.gen, co.theme.replace(/_/g,' '), 'kindergarten', mode==='name'?'word matching':'beginning letters']),
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
['letter','name'].forEach(m=>{ const r=buildMode(m); generated=generated.concat(r.out); blockedTotal+=r.blocked; });

const cur = JSON.parse(fs.readFileSync(EN,'utf8'));
const keep = cur.landings.filter(l => l.coordinate.type !== 'matching');
const merged = { _note: cur._note + ' [Wave 5 matching: '+generated.length+' letter(RF.K.3.a sound-match) + name(RF.K.3.c sight-read) /K STANDARD (strand Reading: Foundational Skills); sound-vs-sight axis; shares RF.K.3.a w/ find-and-count, differs on mechanic.]', landings: keep.concat(generated) };
fs.writeFileSync(EN, JSON.stringify(merged, null, 2) + '\n');
console.log(`generated ${generated.length} matching landings (blocked ${blockedTotal}); total landings now ${merged.landings.length}`);
let short=0, fence=0, banned=0, leak=0, noStd=0;
const FENCE=['count how','how many','classify and count','tally','count the','count each','chart the','chart each'];
const BAN=['fun and engaging','perfect for','great for','dive into','engaging','captivating','unlock','boost','supercharge','easy and fun','one of the earliest','ideal for'];
const LEAK_LETTER=['read the word','written word',' sight']; // letter must NOT drift to sight-reading
const LEAK_NAME=['beginning letter','beginning sound','first sound','sound it starts','letter sound','sound out']; // name must NOT drift to phonics
generated.forEach(e=>{const body=(e.p1+' '+e.p2+' '+e.p3); const lc=body.toLowerCase(); const w=body.split(/\s+/).filter(Boolean).length;
  if(w<200){short++; console.log(`  SHORT ${e.slug}: ${w}`);}
  FENCE.forEach(x=>{if(lc.includes(x)){fence++;console.log(`  FENCE-LEAK ${e.slug}: "${x}"`);}});
  BAN.forEach(x=>{if(lc.includes(x)){banned++;console.log(`  BANNED ${e.slug}: "${x}"`);}});
  const LK = e.coordinate.mode==='letter'?LEAK_LETTER:LEAK_NAME;
  LK.forEach(x=>{if(lc.includes(x)){leak++;console.log(`  CROSS-AXIS-LEAK ${e.slug} (${e.coordinate.mode}): "${x.trim()}"`);}});
  if(!('standard' in e)||e.strand!=='Reading: Foundational Skills'){noStd++;console.log(`  MISSING-STANDARD/STRAND ${e.slug}`);}
});
console.log(short?`${short} short`:'all >=200 words', '|', fence?`${fence} count-fence`:'fence clean', '|', banned?`${banned} banned`:'no banned', '|', leak?`${leak} cross-axis-leak`:'sound-vs-sight clean (no cross-axis leak)', '|', noStd?`${noStd} MISSING-STANDARD`:'all STANDARD (RF + strand RF)');