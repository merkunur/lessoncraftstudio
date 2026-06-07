#!/usr/bin/env node
/* Wave 4 STANDALONES — EN prepositions/multiplechoice (L.K.1.e, Language) + bingo/null (readiness, NO alignment) × K.
 *   prepositions = pick the picture showing the spatial relationship (in/on/under/next-to). Copy: positional language;
 *     NEVER reading-comprehension / sight-word framing.
 *   bingo = Picture Bingo, caller names it, child marks the matching picture (auditory->visual). NO `standard` →
 *     readiness rendering (strand chip + dashed coming-soon). Copy: honest listen-and-match; NEVER over-claim
 *     phonics/spelling/letter-sound. Thin-intent → 18 themes held, NOT padded.
 * 8 P1 x 7 P2 = 56 > 50 (prepositions binding, +6) / > 18 (bingo sparse). Reuses literacyA THEMES.
 * Usage: node scripts/seo-landing/gen-wave4-literacyB.js
 */
const fs = require('fs');
const { validateCoordinate } = require('./validity-gate');
const EN = 'frontend/content/seo-landing/en.json';
const COORDS = JSON.parse(fs.readFileSync('scripts/seo-landing/wave4-literacyB-coordinates.json', 'utf8')).coordinates;

// reuse the THEMES table from gen-wave4-literacyA (eval its const to avoid duplication)
const litA = fs.readFileSync('scripts/seo-landing/gen-wave4-literacyA.js', 'utf8');
const THEMES = (function () {
  const m = litA.match(/const THEMES = (\{[\s\S]*?\n\});/);
  if (!m) throw new Error('could not extract THEMES from gen-wave4-literacyA.js');
  return eval('(' + m[1] + ')');
})();

// PREPOSITIONS = pick the picture showing the spatial relationship (L.K.1.e). Positional; never reading/sight-word.
const SKEL_PR = [
  (n,g)=>`This Kindergarten worksheet builds position words. Each row asks a spatial question — which picture shows the ${n} IN the box, ON the shelf, or UNDER the table? — and the child picks the image that matches. Prepositions like in, on, under, and next to are the small words that tell us where things are, and choosing the right picture shows a child understands them. The familiar ${g} keep every scene clear so the only question is the position.`,
  (n,g)=>`Where is it? That is what this sheet asks. For each row the child is shown a position — the ${n} next to, behind, or in front of something — and chooses the picture that shows it. These prepositions are core Kindergarten language: the words that pin down where one thing sits in relation to another. Using clear ${g} means a child can focus entirely on the spatial relationship, not on figuring out what the objects are.`,
  (n,g)=>`Each question on this worksheet turns on a single position word. The child looks at the choices of ${n} and marks the one where the object is in, on, under, or beside the right place. Understanding and using prepositions is exactly the Kindergarten language skill here — knowing that "under the table" and "on the table" describe two different pictures. The everyday ${g} keep the scenes simple so the position is the whole point.`,
  (n,g)=>`This sheet practises the little words that carry big meaning: in, on, under, beside, in front of. For each row the child picks the picture of the ${n} that matches the stated position. Matching a position to the right image is how Kindergarten children show they grasp prepositions — the language of where. Clear ${g} pictures keep the choice about the relationship between objects, nothing else.`,
  (n,g)=>`Position words come to life here. The child is told where something should be — the ${n} on top, underneath, or next to — and chooses the picture that shows it. Prepositions are a Kindergarten language standard because they let a child describe and understand space precisely, and picking the matching image proves they can. The ${g} are familiar and uncluttered, so each question is purely about the position.`,
  (n,g)=>`Which picture is right? Each row gives a position — in, on, under, behind, or in front — and the child marks the image of the ${n} that fits. Choosing correctly shows the child understands the preposition, the Kindergarten skill of knowing the words that describe where things are. Using simple ${g} keeps the scenes readable so a child weighs only the spatial relationship, not the objects themselves.`,
  (n,g)=>`This Kindergarten worksheet asks a child to see a position word and choose the picture that shows it — the ${n} inside, on top of, or below something. Prepositions are the language of place, and matching a stated position to the correct image is exactly how a child demonstrates they understand them. The everyday ${g} make every scene clear, so the question is always the position word, never what the picture shows.`,
  (n,g)=>`Knowing where is a Kindergarten language skill, and this sheet rehearses it one position word at a time. For each row the child picks the picture where the ${n} sits in the right place — in, on, under, next to, or in front of. Choosing the matching image shows the child can use prepositions to understand space. Clear, familiar ${g} keep the focus on the relationship between the objects, which is the whole task.`,
];
const P2_PR = [
  (g)=>`Prepositions are small but load-bearing words — in, on, under, beside — and using them correctly is a named Kindergarten language standard. A picture-choice sheet rehearses them directly: the child is given a position and shows they understand it by choosing the matching scene. Familiar ${g} keep each question about the relationship between objects, so the position word is the whole focus, and a child who can pick the right scene can also follow a spoken direction that uses the same word.`,
  (g)=>`Understanding position words lets a child describe and follow directions about space — where to put something, where to find it. That is exactly the Kindergarten skill this practises: matching a position to the picture that shows it. Using clear ${g} means the child weighs only the spatial relationship, building confidence with the words that tell us where — the words a child leans on to give directions and describe their own world.`,
  (g)=>`Choosing the right picture for "under the table" versus "on the table" proves a child grasps the preposition, not just the nouns. That precise understanding of position words is core Kindergarten language, and a multiple-choice sheet rehearses it cleanly. The everyday ${g} keep the scenes simple so the only decision is the spatial one, which is exactly where a child's real understanding of position shows itself.`,
  (g)=>`Prepositions are how a child first puts the relationship between two things into words. This worksheet practises that by asking the child to recognize a position and pick the matching image — in, on, under, beside, in front of. Keeping the ${g} familiar means the child's whole attention is on the position, exactly the Kindergarten language target, and a skill that quietly supports following classroom instructions all day.`,
  (g)=>`Matching a position word to a picture is concrete, doable Kindergarten language work: no sentences to work through, just understanding where one thing is relative to another. The sheet rehearses the common prepositions a child needs, and clear ${g} keep each question focused on the spatial relationship rather than on anything else, so even a child who cannot yet read can show a full grasp of position.`,
  (g)=>`The Kindergarten skill here is using and understanding prepositions — the words that locate things in space. Picking the picture that shows the stated position rehearses it repeatedly across familiar ${g}, so a child builds a solid grasp of in, on, under, next to, and in front of through pictures alone, with no reading or writing required to demonstrate the understanding.`,
  (g)=>`Position words are everyday language a Kindergarten child uses and hears constantly, and pinning them down precisely is the standard this targets. A picture-choice format rehearses it directly: take in the position, choose the matching scene. The familiar ${g} keep every question about the spatial relationship, building reliable understanding of the small words that mean where — words a child relies on constantly in speech and play.`,
];

// BINGO = Picture Bingo (readiness; auditory->visual match). Honest listen-and-match; no phonics/spell over-claim.
const SKEL_BG = [
  (n,g)=>`This Kindergarten picture-bingo sheet is a listen-and-match game. A caller names one of the ${n}, and the child finds and marks that picture on their bingo card. It is simple but real practice: hearing a word and matching it to the right image trains careful listening and visual matching, the everyday skills a young child uses all day. The familiar ${g} make a friendly, low-pressure card to play again and again.`,
  (n,g)=>`Listen and find. In this picture bingo, a grown-up or caller says the name of one of the ${n}, and the child scans the card to mark the matching picture. There are no letters to work out — just listen to the word and find the image, which builds the attention and visual-matching skills Kindergarten children are growing. The ${g} card is colorful and clear, made to be played in a small group or one-on-one.`,
  (n,g)=>`Picture bingo turns listening into a game. The caller names one of the ${n}; the child hunts the card and marks the picture that matches. Matching a spoken word to the right image is straightforward, satisfying practice in listening and looking carefully — readiness skills that come well before reading. The ${g} make a familiar, friendly card a Kindergarten child can play happily over and over.`,
  (n,g)=>`This is a listen-and-cover bingo card. A caller says one of the ${n}, and the child finds it among the pictures and marks it. The skill is simple and useful: connect a heard word to the picture it names, building the careful listening and visual scanning a young child relies on. With familiar ${g}, the card stays simple and inviting, ready to run as a quick group game.`,
  (n,g)=>`Play picture bingo by ear. The caller names one of the ${n} and the child marks the matching picture on their card — listen, look, cover. It is gentle Kindergarten practice in matching a spoken word to an image, the kind of listening-and-looking that comes before reading. The ${g} card is clear and friendly, designed to be played again and again without pressure.`,
  (n,g)=>`A caller names a picture; a child finds it. That is the whole, happy loop of this Kindergarten picture bingo with ${n}. Hearing a word and marking the matching image practises listening and visual matching — no letters, just attention and recognition. The familiar ${g} make a welcoming card for a small group or a one-on-one game, easy to play many times.`,
  (n,g)=>`This picture-bingo card is built for listening. The caller says one of the ${n}, and the child scans, finds, and marks the matching picture. Connecting a spoken word to its image is a simple readiness skill — careful listening and looking — that suits a Kindergarten child perfectly. The ${g} keep the card friendly and familiar, so it stays fun across many rounds.`,
  (n,g)=>`Listen, look, and mark. In this Kindergarten picture bingo, the caller names one of the ${n} and the child covers the matching picture on their card. It is uncomplicated on purpose: matching a heard word to an image builds the listening and visual-matching skills young children use before they read. A clear ${g} card makes it easy and enjoyable to play in a group or together.`,
];
const P2_BG = [
  (g)=>`Picture bingo is readiness practice, not academic drill, and that is exactly its value for Kindergarten: it trains careful listening and visual matching — hearing a word and finding the picture it names. Those attention skills underlie everything a child does in a busy classroom. The familiar ${g} keep the card friendly and the game easy to repeat, and a child who plays often grows quicker at both listening and finding.`,
  (g)=>`Matching a spoken word to its picture is a small but genuine skill: it asks a child to listen closely and scan a field of images for the right one. Picture bingo rehearses it in a fun, low-pressure way that suits Kindergarten, building listening and visual attention. The ${g} card is colorful and clear for group or solo play, and every round is one more chance to listen closely and look carefully.`,
  (g)=>`The strength of picture bingo is its simplicity — a child only has to hear a word and find the matching picture. That is real listening-and-looking practice for Kindergarten, the readiness skills that come before letters. Using familiar ${g} keeps the card welcoming, so a child plays happily and practises attention without noticing — which is exactly how readiness skills are best built at this age.`,
  (g)=>`Listening for a named picture and covering it builds two everyday skills at once: careful listening and visual matching. For a Kindergarten child those are foundational, and picture bingo rehearses them in a game format that feels like play, not work. The ${g} make a clear, friendly card that holds up to many rounds in a small group, and the gentle repetition is what makes the listening stick.`,
  (g)=>`Picture bingo keeps things honest and age-right: no letters to work out — just hear a word and find its picture. That listen-and-match loop is solid Kindergarten readiness practice, training the attention a child needs across the whole school day. The familiar ${g} make a card that is easy to play again and again, building steady attention one friendly round at a time.`,
  (g)=>`Connecting a heard word to the right image is the simple core of picture bingo, and it is genuinely useful Kindergarten practice in listening and visual scanning. The game format keeps it light and repeatable, which is how young children build attention best. A clear ${g} card works for a small group or a quiet one-on-one game, and either way the child rehearses the same listen-and-match loop.`,
  (g)=>`What picture bingo teaches is attention: listen to the named picture, scan the card, mark the match. For Kindergarten that listening-and-looking practice is real readiness, the groundwork beneath later school skills rather than reading itself. The friendly ${g} card invites a child to play it over and over, turning simple attention practice into something a child happily asks to do again.`,
];

function p3(type, h1lower, g, nb){
  if (type === 'prepositions')
    return `Children who like ${h1lower} enjoy spotting where everything sits, and choosing the right picture feels like a small puzzle. When this feels easy, find the positions in ${nb[0]}, or try ${nb[1]}. You can also browse every preposition worksheet or the whole ${g} collection for kindergarten — each sheet prints cleanly or plays online for free, and every position a child names aloud makes the next one quicker to spot.`;
  return `Children who like ${h1lower} enjoy the listen-and-find rhythm, and a friendly card keeps a small group playing together. When this feels easy, play a round of ${nb[0]}, or try ${nb[1]}. You can also browse every picture bingo worksheet or the whole ${g} collection for kindergarten — each card prints cleanly or plays online for free, and the more rounds a child plays, the sharper their listening and quick-looking become.`;
}

function gcd(a,b){ while(b){ const t=a%b; a=b; b=t; } return a; }
function coprimeStride(cells){ let k=Math.max(2,Math.round(cells*0.6180339887)); for(let d=0;d<cells;d++) for(const cand of [k+d,k-d]) if(cand>1&&cand<cells&&gcd(cand,cells)===1) return cand; return 1; }
function cellAssign(i,S,P){ const cells=S*P, stride=coprimeStride(cells); const c=((i%cells)*stride)%cells; return {skel:c%S, p2:Math.floor(c/S)%P}; }

const MODES = {
  'prepositions': { mode:'multiplechoice', SKEL: SKEL_PR, P2: P2_PR, prefix:'prepositions-multiplechoice-', eyebrow:'Preposition Worksheet', strand:'Language', standard:'L.K.1.e', h1:(h)=>`Prepositions with ${h}`, nbVerb:'prepositions with ', label:(t)=>`Prepositions with ${t}` },
  'bingo':        { mode:null, SKEL: SKEL_BG, P2: P2_BG, prefix:'bingo-', eyebrow:'Picture Bingo Worksheet', strand:'Visual discrimination (matching)', standard:null, h1:(h)=>`Picture Bingo with ${h}`, nbVerb:'picture bingo with ', label:(t)=>`Picture Bingo with ${t}` },
};
function landingSlugOf(co){ const M=MODES[co.type]; return co.siblings.length > 1 ? `${M.prefix}${co.slugTheme}-kindergarten` : co.canonical; }

function buildType(type){
  const list = COORDS.filter(c=>c.type===type).slice().sort((a,b)=> a.theme<b.theme?-1:1);
  const M = MODES[type];
  const cells = M.SKEL.length * M.P2.length;
  if (cells <= list.length) console.log(`  [INVARIANT WARN] ${type}: ${M.SKEL.length}x${M.P2.length}=${cells} <= ${list.length}`);
  else console.log(`  [invariant OK] ${type}: ${M.SKEL.length}x${M.P2.length}=${cells} > breadth ${list.length} — zero forced same-cell collisions${list.length<20?' (sparse fill: '+list.length+' of '+cells+')':''}`);
  const out=[]; let blocked=0;
  list.forEach((co,i)=>{
    const d = THEMES[co.theme];
    if(!d){ console.log(`NO COPY DATA for ${co.theme} (${type})`); blocked++; return; }
    const v = validateCoordinate(type, M.mode, co.theme, {});
    if(!v.valid){ console.log(`BLOCKED ${type}/${co.theme}: ${v.reason}`); blocked++; return; }
    const cell = cellAssign(i, M.SKEL.length, M.P2.length);
    const nbA=list[(i+1)%list.length], nbB=list[(i+ (list.length>7?5:3))%list.length];
    const nb=[ `${M.nbVerb}${THEMES[nbA.theme].h1.toLowerCase()}`, `${M.nbVerb}${THEMES[nbB.theme].h1.toLowerCase()}` ];
    const entry = {
      slug: landingSlugOf(co),
      variantShape: co.siblings.length>1 ? 'collapsed' : 'singleton',
      coordinate: { type, mode: M.mode, theme:co.theme, level:'kindergarten' },
      eyebrow: M.eyebrow,
      h1: M.h1(d.h1),
      strand: M.strand,
      slotTokens: d.nouns.replace(/ and /g,', ').split(', ').map(s=>s.replace(/^(a|an|the) /,'').trim()).concat([d.gen, co.theme.replace(/_/g,' '), 'kindergarten']),
      p1: M.SKEL[cell.skel](d.nouns, d.gen),
      p2: M.P2[cell.p2](d.gen),
      p3: p3(type, d.h1.toLowerCase(), d.gen, nb),
      canonicalDeckSlug: co.canonical,
      carousel: [
        {label:M.label(THEMES[list[(i+1)%list.length].theme].h1), href: landingSlugOf(list[(i+1)%list.length])},
        {label:M.label(THEMES[list[(i+2)%list.length].theme].h1), href: landingSlugOf(list[(i+2)%list.length])},
        {label:M.label(THEMES[list[(i+ (list.length>5?5:3))%list.length].theme].h1), href: landingSlugOf(list[(i+ (list.length>5?5:3))%list.length])},
        {label:M.label(THEMES[list[(i+ (list.length>11?11:4))%list.length].theme].h1), href: landingSlugOf(list[(i+ (list.length>11?11:4))%list.length])},
      ],
    };
    if (M.standard) entry.standard = M.standard; // bingo (readiness) → no standard key
    if (co.siblings.length>1) entry.collapseSiblings = co.siblings;
    out.push(entry);
  });
  return {out, blocked};
}

let generated=[]; let blockedTotal=0;
['prepositions','bingo'].forEach(t=>{ const r=buildType(t); generated=generated.concat(r.out); blockedTotal+=r.blocked; });

const cur = JSON.parse(fs.readFileSync(EN,'utf8'));
const keep = cur.landings.filter(l => l.coordinate.type !== 'prepositions' && l.coordinate.type !== 'bingo');
const merged = { _note: cur._note + ' [Wave 4 standalones: '+generated.length+' prepositions/multiplechoice (L.K.1.e Language) + bingo/null (readiness, Visual discrimination matching) /K via gen-wave4-literacyB.js — completes Wave-4 authoring.]', landings: keep.concat(generated) };
fs.writeFileSync(EN, JSON.stringify(merged, null, 2) + '\n');
console.log(`generated ${generated.length} (prepositions+bingo) landings (blocked ${blockedTotal}); total landings now ${merged.landings.length}`);
let short=0, intent=0, banned=0;
const PR_DRIFT=['read the word','sight word','sight-word','reading comprehension'];
const BG_OVERCLAIM=['phonics','spelling','spell the','sight word','letter sound','letter-sound'];
const BAN=['fun and engaging','perfect for','dive into','engaging','captivating','unlock','boost','supercharge'];
generated.forEach(e=>{const body=(e.p1+' '+e.p2+' '+e.p3).toLowerCase(); const w=body.split(/\s+/).filter(Boolean).length; if(w<200){short++; console.log(`  SHORT ${e.slug}: ${w}`);}
  const guards = e.coordinate.type==='prepositions'?PR_DRIFT:BG_OVERCLAIM;
  guards.forEach(x=>{if(body.includes(x)){intent++;console.log(`  INTENT-LEAK ${e.slug}: "${x}"`);}});
  BAN.forEach(x=>{if(body.includes(x)){banned++;console.log(`  BANNED ${e.slug}: "${x}"`);}});
});
const bingoNoStd = generated.filter(e=>e.coordinate.type==='bingo').every(e=>!('standard' in e));
console.log(short?`${short} short`:'all >=200 words', '|', intent?`${intent} intent-leaks`:'no intent leaks', '|', banned?`${banned} banned`:'no banned', '|', bingoNoStd?'bingo: no standard key (readiness)':'BINGO HAS STANDARD KEY — BUG');