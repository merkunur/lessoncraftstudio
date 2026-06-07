#!/usr/bin/env node
/* Wave 6 LEAD — EN pattern-train × {ab(null), aab, aabb, abb, abc} × Kindergarten, READINESS-class.
 * The program's first 5-MODE coupled slice. Pattern-unit ladder: ab=2-elem alternate; aab=3-elem double-FIRST;
 * abb=3-elem double-SECOND (mirror of aab — the closest cousins, must read distinct); aabb=4-elem paired;
 * abc=3-elem all-distinct. NO educationalAlignment (no `standard` key). strand "Patterning (readiness)" (NEW —
 * CCSS-K has no patterning standard, genuinely readiness). Copy varies on the ACTUAL pattern structure per mode,
 * NOT template-swap. Copy-guard: patterning/repeating-unit lexicon, NO math/number/count over-claim.
 * 8 P1 x 7 P2 = 56 > ~49-50 (coprime + guard). Usage: node scripts/seo-landing/gen-wave6-patterntrain.js
 */
const fs = require('fs');
const EN = 'frontend/content/seo-landing/en.json';
const COORDS = JSON.parse(fs.readFileSync('scripts/seo-landing/wave6-patterntrain-coordinates.json', 'utf8')).coordinates;
const litA = fs.readFileSync('scripts/seo-landing/gen-wave4-literacyA.js', 'utf8');
const THEMES = (function () { const m = litA.match(/const THEMES = (\{[\s\S]*?\n\});/); if (!m) throw new Error('THEMES extract failed'); return eval('(' + m[1] + ')'); })();

const SKEL_AB = [
  (n,g)=>`This Kindergarten pattern worksheet builds an AB pattern with ${g}. Two pictures take turns down a train of wagons — first one, then the other, then the first again — and the child works out what comes next and places it. Reading a simple two-part repeat, like ${n} taking turns, then continuing it, is early patterning: noticing the rule a sequence follows and extending it. It is a core readiness skill, with no counting involved.`,
  (n,g)=>`What comes next in the pattern? On this sheet a row of ${g} repeats in an AB rhythm — one picture, then a second, then back to the first — and the child fills the empty wagons to keep the pattern going. Seeing that two pictures alternate and predicting the next is the heart of early patterning, the thinking skill of finding and extending a rule. The familiar pictures keep the focus on the repeat.`,
  (n,g)=>`An AB pattern is the simplest repeating pattern: two pictures alternating, over and over. This worksheet sets up such a pattern with ${g} — like ${n} taking turns — and asks the child to continue it by placing the right picture in each blank wagon. Recognizing the back-and-forth rule and extending it builds pattern-awareness, a foundational Kindergarten readiness skill. There are no numbers, just the repeat.`,
  (n,g)=>`Keep the train going! This Kindergarten worksheet shows an AB pattern of ${g} — two pictures repeating in turn — with some wagons left empty for the child to fill. Working out that the two pictures alternate, and which one comes next, is early patterning: the skill of spotting a rule in a sequence and carrying it on. Familiar pictures like ${n} keep every choice about the pattern itself.`,
  (n,g)=>`This sheet teaches the AB pattern — the first repeating pattern young children learn. Two ${g} pictures take turns along a train, and the child completes the empty wagons by continuing the alternating rule. Noticing that the sequence goes first-second-first-second and predicting what follows is foundational patterning, a Kindergarten readiness skill built on looking and reasoning, not counting.`,
  (n,g)=>`Finish the pattern. On this Kindergarten worksheet two ${g} — say ${n} — repeat in a steady AB rhythm down a row of wagons, and the child fills the blanks to keep it going. Reading a simple alternating pattern and extending it is early pattern-recognition, the thinking that helps a child make sense of order and sequence. The familiar pictures keep the task about the repeat, with nothing to add up.`,
  (n,g)=>`Two pictures, taking turns — that is an AB pattern, and this worksheet builds one with ${g}. The child sees the alternating sequence start, then completes the empty wagons by working out which picture comes next each time. Spotting the simplest repeating rule and continuing it is foundational Kindergarten patterning, a readiness skill the child does by recognizing the rhythm of the pattern.`,
  (n,g)=>`On this Kindergarten pattern sheet, ${g} repeat two-by-two in an AB pattern — one picture, then another, then the first again — and the child places pictures in the blank wagons to extend it. Reading that two-part repeat and predicting the next picture is early patterning, the core readiness skill of finding and following a rule. Familiar pictures like ${n} keep the focus on the alternating pattern.`,
];
const SKEL_AAB = [
  (n,g)=>`This Kindergarten pattern worksheet builds an AAB pattern with ${g}. The repeating unit is three pictures long — the FIRST picture appears twice, then the second once — so the rhythm goes first, first, second, first, first, second. The child fills the empty wagons by continuing that rule. Reading a three-part pattern where one picture doubles is a step up from simple alternation, building deeper pattern-awareness. It is readiness thinking, with no counting.`,
  (n,g)=>`In an AAB pattern, the first picture comes twice before the second — and that is the rule the child extends on this sheet of ${g}. The pattern repeats in threes (picture-one, picture-one, picture-two), and the child completes the blank wagons by keeping the doubling going. Recognizing that the first element repeats before the second changes is patterning a level beyond AB, the kind of rule-finding Kindergarten readiness is built on.`,
  (n,g)=>`What comes next when the first picture doubles? This AAB pattern worksheet sets up a three-picture repeating unit with ${g} — the first appears twice, the second once — and the child continues it down the train. Working out a pattern where one element repeats before the next is deeper pattern-recognition than a simple alternation, a foundational Kindergarten readiness skill. The familiar ${n} keep the focus on the doubling rule.`,
  (n,g)=>`This sheet teaches the AAB pattern: a three-part repeat where the first picture appears twice, then the second once, over and over. Using ${g}, the child reads the rhythm — first, first, second — and fills the empty wagons to keep it going. Noticing that one picture doubles before the pattern moves on builds the rule-finding skill at the heart of early patterning. There are no numbers, just the repeating unit.`,
  (n,g)=>`Keep the AAB pattern going. On this Kindergarten worksheet a unit of three ${g} repeats — the first picture twice, then the second — and the child completes the blanks by extending the rule. Reading a pattern where the opening picture doubles before changing is a meaningful step in patterning, the readiness skill of spotting a rule and carrying it forward. Familiar pictures like ${n} keep it about the pattern.`,
  (n,g)=>`An AAB pattern doubles its first picture: one, one, two, one, one, two. This worksheet builds such a pattern with ${g} and asks the child to fill the empty wagons by continuing the rhythm. Recognizing that the first element repeats before the second arrives — and predicting the sequence — is patterning beyond simple AB, foundational Kindergarten readiness thinking done by looking, not counting.`,
  (n,g)=>`This Kindergarten worksheet shows an AAB pattern of ${g} — the first picture appearing twice for every one of the second — and leaves wagons blank for the child to complete. Working out a three-picture repeating unit where the lead picture doubles builds deeper pattern-awareness, the rule-finding readiness skill. The familiar pictures keep every choice about the doubling pattern.`,
  (n,g)=>`On this sheet the pattern goes first, first, second — an AAB pattern — using ${g} like ${n}. The child reads the three-part repeat, where the first picture comes twice, and fills the empty wagons to extend it. Continuing a pattern with a doubled opening element is foundational Kindergarten patterning, the skill of finding and following a rule, with nothing to count.`,
];
const SKEL_ABB = [
  (n,g)=>`This Kindergarten pattern worksheet builds an ABB pattern with ${g}. The repeating unit is three pictures long — the first picture once, then the SECOND picture twice — so the rhythm goes first, second, second, first, second, second. The child fills the empty wagons by continuing that rule. Reading a three-part pattern where the SECOND picture doubles (the mirror of AAB) builds careful pattern-awareness, a readiness skill done by looking, not counting.`,
  (n,g)=>`In an ABB pattern, the second picture comes twice after the first — and that is the rule the child extends on this sheet of ${g}. The pattern repeats in threes (picture-one, picture-two, picture-two), and the child completes the blank wagons by keeping the second element doubling. Recognizing that it is the SECOND picture that repeats (not the first, as in AAB) is exactly the kind of close pattern-reading Kindergarten readiness builds.`,
  (n,g)=>`What comes next when the second picture doubles? This ABB pattern worksheet sets up a three-picture unit with ${g} — the first once, the second twice — and the child continues it down the train. Working out a pattern where the trailing element repeats is deeper pattern-recognition, and telling it apart from a first-doubled (AAB) pattern sharpens a child's eye for the exact rule. The familiar ${n} keep the focus on the doubling.`,
  (n,g)=>`This sheet teaches the ABB pattern: a three-part repeat where the first picture appears once, then the second twice — first, second, second — over and over. Using ${g}, the child reads the rhythm and fills the empty wagons to keep it going. Noticing that the SECOND picture is the one that doubles builds the precise rule-finding skill at the heart of early patterning, with no numbers involved.`,
  (n,g)=>`Keep the ABB pattern going. On this Kindergarten worksheet a unit of three ${g} repeats — the first picture once, the second twice — and the child completes the blanks by extending the rule. Reading a pattern where the trailing picture doubles, and distinguishing it from one where the lead doubles, is meaningful patterning: the readiness skill of spotting the exact rule and carrying it forward. Familiar pictures like ${n} keep it about the pattern.`,
  (n,g)=>`An ABB pattern doubles its second picture: one, two, two, one, two, two. This worksheet builds such a pattern with ${g} and asks the child to fill the empty wagons by continuing the rhythm. Recognizing that the second element repeats after the first — and that this is the mirror of an AAB pattern — is patterning that rewards careful looking, foundational Kindergarten readiness done without counting.`,
  (n,g)=>`This Kindergarten worksheet shows an ABB pattern of ${g} — the second picture appearing twice for every one of the first — and leaves wagons blank for the child to complete. Working out a three-picture unit where the trailing picture doubles builds deeper pattern-awareness, the rule-finding readiness skill, and keeps a child noticing precisely which element repeats.`,
  (n,g)=>`On this sheet the pattern goes first, second, second — an ABB pattern — using ${g} like ${n}. The child reads the three-part repeat, where the second picture comes twice, and fills the empty wagons to extend it. Continuing a pattern with a doubled trailing element — not a doubled opening one — is foundational Kindergarten patterning, the skill of finding and following the exact rule.`,
];
const SKEL_AABB = [
  (n,g)=>`This Kindergarten pattern worksheet builds an AABB pattern with ${g}. The repeating unit is four pictures long — the first picture twice, then the second twice — so the rhythm goes first, first, second, second, and repeats. The child fills the empty wagons by continuing that paired rule. Reading a four-part pattern where each picture comes in a pair builds richer pattern-awareness, a Kindergarten readiness skill done by looking, not counting.`,
  (n,g)=>`In an AABB pattern, the pictures come in pairs: the first twice, then the second twice. On this sheet of ${g}, the pattern repeats in fours (one, one, two, two), and the child completes the blank wagons by keeping the pairs going. Recognizing that BOTH pictures double — each appearing as a pair — is a step beyond the three-part patterns, the kind of rule-reading Kindergarten readiness builds.`,
  (n,g)=>`What comes next when pictures come in pairs? This AABB pattern worksheet sets up a four-picture unit with ${g} — the first twice, then the second twice — and the child continues it down the train. Working out a paired pattern, where each element repeats together, is deeper pattern-recognition than the shorter units, a foundational Kindergarten readiness skill. The familiar ${n} keep the focus on the pairs.`,
  (n,g)=>`This sheet teaches the AABB pattern: a four-part repeat where the first picture comes twice, then the second twice — first, first, second, second — over and over. Using ${g}, the child reads the paired rhythm and fills the empty wagons to keep it going. Noticing that each picture appears as a pair builds the rule-finding skill at the heart of early patterning, with no counting involved.`,
  (n,g)=>`Keep the AABB pattern going. On this Kindergarten worksheet a unit of four ${g} repeats — the first picture as a pair, then the second as a pair — and the child completes the blanks by extending the rule. Reading a pattern where both pictures come doubled builds richer patterning, the readiness skill of spotting the rule and carrying it forward. Familiar pictures like ${n} keep it about the pattern.`,
  (n,g)=>`An AABB pattern moves in pairs: one, one, two, two, one, one, two, two. This worksheet builds such a pattern with ${g} and asks the child to fill the empty wagons by continuing the rhythm. Recognizing that each picture doubles into a pair before the next — a longer four-part unit — is patterning beyond the three-part rules, foundational Kindergarten readiness done without numbers.`,
  (n,g)=>`This Kindergarten worksheet shows an AABB pattern of ${g} — each picture appearing as a pair — and leaves wagons blank for the child to complete. Working out a four-picture unit, where the first pair gives way to the second pair, builds deeper pattern-awareness, the rule-finding readiness skill. The familiar pictures keep every choice about the paired pattern.`,
  (n,g)=>`On this sheet the pattern goes first, first, second, second — an AABB pattern — using ${g} like ${n}. The child reads the four-part repeat, where each picture comes in a pair, and fills the empty wagons to extend it. Continuing a paired pattern is foundational Kindergarten patterning, the skill of finding and following a rule, with nothing to count.`,
];
const SKEL_ABC = [
  (n,g)=>`This Kindergarten pattern worksheet builds an ABC pattern with ${g}. The repeating unit is three DIFFERENT pictures — a first, a second, and a third — that repeat in order: first, second, third, first, second, third. The child fills the empty wagons by continuing that three-part rule. Reading a pattern made of three distinct pictures, with none repeating within the unit, builds richer pattern-awareness, a Kindergarten readiness skill done by looking, not counting.`,
  (n,g)=>`In an ABC pattern, three different pictures take turns in order — and that is the rule the child extends on this sheet of ${g}. The pattern repeats in threes (one, two, three), each picture distinct, and the child completes the blank wagons by keeping the three-part order going. Recognizing a pattern of three different elements — not a doubled one — is a step up in patterning, the kind of rule-reading Kindergarten readiness builds.`,
  (n,g)=>`What comes next when three different pictures repeat? This ABC pattern worksheet sets up a three-picture unit with ${g} — three distinct pictures in a fixed order — and the child continues it down the train. Working out a pattern where every element is different, repeating as a trio, is deeper pattern-recognition than two-element or doubled patterns, a foundational Kindergarten readiness skill. The familiar ${n} keep the focus on the order.`,
  (n,g)=>`This sheet teaches the ABC pattern: a three-part repeat of three DIFFERENT pictures — first, second, third — over and over. Using ${g}, the child reads the order and fills the empty wagons to keep it going. Noticing that three distinct pictures cycle in sequence, none doubling, builds the rule-finding skill at the heart of early patterning, with no numbers involved.`,
  (n,g)=>`Keep the ABC pattern going. On this Kindergarten worksheet a unit of three different ${g} repeats in order — first, second, third — and the child completes the blanks by extending the rule. Reading a pattern of three distinct pictures, and holding their order in mind, builds richer patterning: the readiness skill of spotting the rule and carrying it forward. Familiar pictures like ${n} keep it about the pattern.`,
  (n,g)=>`An ABC pattern cycles three different pictures: one, two, three, one, two, three. This worksheet builds such a pattern with ${g} and asks the child to fill the empty wagons by continuing the rhythm. Recognizing that three distinct elements repeat in a fixed order — a longer, more varied unit than a doubled pattern — is patterning that rewards careful looking, foundational Kindergarten readiness done without counting.`,
  (n,g)=>`This Kindergarten worksheet shows an ABC pattern of ${g} — three different pictures repeating in order — and leaves wagons blank for the child to complete. Working out a three-picture unit where each element is distinct builds deeper pattern-awareness, the rule-finding readiness skill, and asks a child to track the order of three things at once. The familiar pictures keep every choice about the pattern.`,
  (n,g)=>`On this sheet the pattern goes first, second, third — an ABC pattern of three different ${g} like ${n} — repeating in order. The child reads the three-part sequence and fills the empty wagons to extend it. Continuing a pattern of three distinct pictures, none repeating within the unit, is foundational Kindergarten patterning, the skill of finding and following a rule.`,
];

// Per-mode P2 (pedagogy, weaving the mode's unit so cross-mode stays distinct).
const P2_AB = [
  (g)=>`An AB pattern is the first repeating pattern a child meets, and extending it builds the core idea of patterning: a sequence follows a rule, and you can predict what comes next. For Kindergarten that rule-finding is foundational readiness, and doing it with two alternating ${g} keeps the practice clear and concrete, with nothing to add up.`,
  (g)=>`Recognizing that two pictures alternate, then continuing the rhythm, trains a child to spot order and regularity in what they see. That is genuine Kindergarten readiness, the patterning skill that supports so much early learning, and a simple AB repeat of ${g} makes it approachable. There is nothing to count — just the rule to find and follow.`,
  (g)=>`Patterning begins with the AB pattern: notice the back-and-forth, predict the next. A child who can extend a two-element repeat is building the foundation for harder patterns and for ordered thinking. Using familiar ${g} keeps every choice about the alternating rule, and the task stays a looking-and-reasoning one, never a counting one.`,
  (g)=>`The skill an AB pattern builds is prediction from a rule — the child sees the start of the sequence and works out what must come next. For Kindergarten that is core readiness thinking, and a clean two-picture alternation of ${g} rehearses it without numbers, keeping the focus on the repeating rhythm.`,
  (g)=>`Extending an AB pattern asks a child to hold a simple rule in mind and apply it again and again. That steady rule-following is foundational Kindergarten readiness, the same thinking behind ordered sequences later. A familiar ${g} alternation keeps the task playful and the rule easy to see, with no numbers at all.`,
  (g)=>`An AB pattern teaches a child that order is not random — there is a rule, and the rule predicts. Recognizing and continuing the two-part repeat is early patterning, a readiness skill that reaches across every subject. With ${g} pictures the practice stays concrete and the alternation easy to follow.`,
  (g)=>`The value of an AB pattern is its clarity: two pictures, one simple rule, endlessly extendable. A Kindergarten child practises finding the rule and carrying it forward — the heart of patterning — and the familiar ${g} keep the focus on the rhythm rather than on figuring out the pictures.`,
];
const P2_AAB = [
  (g)=>`In an AAB pattern the opening picture leads twice before the second appears, so the child listens for a "two-then-one" beat and keeps it running. Learning to track a unit where the lead repeats stretches a young child's attention just past simple alternation, and a ${g} version makes the doubled opening easy to follow down the wagons.`,
  (g)=>`The signature of an AAB pattern is the doubled lead: picture-one says itself twice, then picture-two answers once. A child extends it by predicting when the lead returns and when the second finally arrives. That listen-for-the-beat thinking, set on a ${g} train, is the natural next rung after a plain alternating pattern.`,
  (g)=>`An AAB rhythm asks which picture leads, and how often it repeats: here the opener doubles, so a child counts off the beat in their head — first, first, second — and carries it forward. Working a doubled-lead ${g} pattern builds the habit of noticing not just what repeats, but that it is the opening element holding the floor twice.`,
  (g)=>`What makes AAB its own pattern is the front-loaded repeat: the first picture comes as a pair, the second as a single. A child works out the beat and fills the gaps. Practising the doubled-opening rhythm with ${g} sharpens a young learner's ear for where a repeat sits inside a unit — at the very start, in this case.`,
  (g)=>`AAB is the "lead-doubles" pattern: the opening picture twice, then a different one. Extending it means holding the position of the double in mind — it sits in the first slot — and applying that along the train. With ${g}, the front-of-unit repeat stays clear, and a child practises tracking a longer beat than a simple back-and-forth.`,
  (g)=>`The AAB beat runs strong-strong-weak: the opening picture twice, the second once. A child reads that and predicts the next strong-strong-weak. Doing it with ${g} trains a young learner to notice that the doubled element is the one that opens the unit — the first thing the pattern says, said twice over.`,
  (g)=>`An AAB pattern rewards a child who catches that the first picture takes two turns before the second gets one. Filling the empty wagons means re-running that lead-doubled beat. A ${g} train keeps the front-loaded repeat vivid, and a child builds a feel for patterns where the opener — not the closer — is the part that doubles.`,
];
const P2_ABB = [
  (g)=>`An ABB pattern is the mirror of AAB — here the SECOND picture doubles — so the child must read precisely which element repeats. That close pattern-reading is strong Kindergarten readiness, and a doubled-second ${g} sequence rehearses it while keeping the task about the rhythm, not about numbers.`,
  (g)=>`Reading a pattern where the trailing picture comes twice asks a child to track a three-part unit and notice it is the second element that repeats. That precision is genuine patterning readiness, and a doubled-second ${g} pattern keeps the practice concrete — nothing to count, just the rule to extend.`,
  (g)=>`The ABB pattern teaches a child to attend to exactly which picture doubles — the second, not the first. Telling it apart from an AAB pattern sharpens the eye for the precise rule, the rule-finding the Kindergarten mind is building, and familiar ${g} keep every choice about the doubling.`,
  (g)=>`Spotting that the second element repeats after the first trains careful pattern-reading: the child holds a three-part rule and notices where the double falls. For Kindergarten that is meaningful readiness, and a doubled-second ${g} pattern rehearses it cleanly, with no numbers in the task.`,
  (g)=>`An ABB pattern rewards a child who looks closely enough to catch the doubled trailing picture. Continuing it — and keeping it distinct from a first-doubled pattern — is patterning beyond the basics, the readiness skill of following the exact rule, and the familiar ${g} keep the doubling clear.`,
  (g)=>`The skill here is reading a three-part repeat where the second picture comes twice. That precise unit-tracking is foundational Kindergarten readiness, and a doubled-second ${g} sequence keeps it a pure looking-and-reasoning task — the child finds where the double falls, never counts.`,
  (g)=>`Extending an ABB pattern means recognizing that the trailing element repeats and applying that across the wagons. For a Kindergarten child it builds careful pattern-awareness with familiar ${g}, keeping the focus on the doubled-second rhythm and on telling it apart from its mirror.`,
];
const P2_AABB = [
  (g)=>`An AABB pattern travels in twos: a pair of the first picture, then a pair of the second, and around again. A child reads the two-two beat and keeps the blocks coming. Working in pairs — rather than singles — makes a fuller four-beat unit, and a ${g} train keeps the matched blocks easy to see and continue.`,
  (g)=>`The whole shape of AABB is the pair: every picture shows up twice in a row before the next picture's pair begins. A child extends it by completing each block of two. That sense of grouping pictures into twos, practised with ${g}, is a child's step into longer, evenly-blocked patterns.`,
  (g)=>`AABB moves in matched blocks — two of one, two of the other — a balanced four-beat. The child's task is to fill whichever half of a pair is missing and roll the blocks forward. Reading a paired ${g} pattern teaches a young learner to see pictures in twos, the grouping that shows up again in more involved patterns later.`,
  (g)=>`What sets AABB apart is that nothing comes alone: each picture arrives as a couple. The child reads two-of-this, two-of-that, and continues the doubled blocks. A ${g} train keeps the pairs side by side, and a child practises a four-long unit built entirely from blocks of two.`,
  (g)=>`An AABB pattern is two pairs taking turns: the first picture twice, the second twice, repeat. Extending it means completing the pairs in order. With ${g}, the block-of-two structure stays plain to see, and a child builds the habit of reading pictures in balanced couples rather than one at a time.`,
  (g)=>`The AABB beat is even and paired — couple, couple, couple — and a child rides it by finishing each block of two. That grouping-into-twos, set on a ${g} train, carries a young learner from single-picture beats up to a four-long unit where both pictures double up together.`,
  (g)=>`AABB asks a child to think in pairs: the unit is a block of the first picture and a block of the second, each a couple. Filling the wagons means keeping the pairs intact. A ${g} version of the paired pattern lets a child practise grouping and the steady two-two rhythm of evenly-blocked sequences.`,
];
const P2_ABC = [
  (g)=>`An ABC pattern is a trio in order: three different pictures, each taking one turn, looping in the same sequence. No picture repeats inside the unit, so a child holds all three and remembers their order. Running a three-different ${g} sequence is a real step into ordered thinking — position matters here, not just repetition.`,
  (g)=>`The challenge of ABC is keeping three distinct pictures in their right places: first, then second, then third, then back to first. A child extends it by recalling the order, not by spotting a doubled element. Practising a three-in-order ${g} sequence asks a young learner to track a whole trio at once — a fuller memory load than a doubled pattern.`,
  (g)=>`ABC has no repeats within its unit — three different pictures cycle in a fixed order. The child reads the sequence and continues it by remembering which comes after which. That order-keeping, done with three ${g} pictures, builds the sequencing sense a child later uses for the days of the week and for counting order.`,
  (g)=>`What makes ABC distinct is variety: three separate pictures, each appearing once per cycle, in a set order. A child fills the gaps by recalling the sequence — A leads to B leads to C leads back to A. Working a three-different ${g} pattern trains a young learner to hold an ordered set of three in mind and roll it forward.`,
  (g)=>`An ABC pattern cycles three distinct pictures in sequence — there is no doubling, only order. The child's job is to keep the trio in its right order across the wagons. With ${g}, the three-part sequence stays clear, and a child practises remembering and continuing an ordered run of three different things.`,
  (g)=>`ABC is about order more than repetition: three different pictures, always in the same one-two-three sequence. Extending it means a child recalls the trio and its order, then predicts the next in line. A three-different ${g} sequence stretches a young learner to track and continue a longer, more varied unit.`,
  (g)=>`The ABC unit holds three pictures, all different, in a fixed cycling order. A child continues it by remembering the sequence — not by finding which element doubles, because none does. Practising an ordered ${g} trio builds the sequencing skill of keeping several distinct things in their proper order.`,
];

function p3(M, glower, nb){
  return `${M.p3lead} When this feels easy, try the pattern in ${nb[0]}, or ${nb[1]}. You can also browse every pattern worksheet or the whole kindergarten collection — each sheet prints cleanly or plays online for free, and ${M.p3next}`;
}

function gcd(a,b){ while(b){ const t=a%b; a=b; b=t; } return a; }
function coprimeStride(cells){ let k=Math.max(2,Math.round(cells*0.6180339887)); for(let d=0;d<cells;d++) for(const cand of [k+d,k-d]) if(cand>1&&cand<cells&&gcd(cand,cells)===1) return cand; return 1; }
function cellAssign(i,S,P){ const cells=S*P, stride=coprimeStride(cells); const c=((i%cells)*stride)%cells; return {skel:c%S, p2:Math.floor(c/S)%P}; }

const MODES = {
  'null':  { SKEL: SKEL_AB,   P2: P2_AB,   prefix:'pattern-train-',      word:'AB',   eyebrow:'Pattern Worksheet', strand:'Patterning (readiness)', h1:(h)=>`AB Pattern with ${h}`,   label:(t)=>`AB Pattern with ${t}`,
    p3lead:`Children who get the hang of the AB back-and-forth start predicting the next picture at a glance, and finishing a clean alternating train feels satisfying, a small and clear early win.`,
    p3next:`the more two-part patterns a child completes, the readier they are for patterns where a picture starts to double — the natural next step up the ladder.` },
  'aab':   { SKEL: SKEL_AAB,  P2: P2_AAB,  prefix:'pattern-train-aab-',  word:'AAB',  eyebrow:'Pattern Worksheet', strand:'Patterning (readiness)', h1:(h)=>`AAB Pattern with ${h}`,  label:(t)=>`AAB Pattern with ${t}`,
    p3lead:`Children who can hear the AAB beat — the lead picture twice, then one — get quicker at front-loaded patterns, and cracking the front-loaded rhythm feels good and earns a careful ear its reward.`,
    p3next:`once the doubled-lead beat is easy, a child is ready for ABB, where it is the second picture that doubles instead — the mirror image of this one.` },
  'abb':   { SKEL: SKEL_ABB,  P2: P2_ABB,  prefix:'pattern-train-abb-',  word:'ABB',  eyebrow:'Pattern Worksheet', strand:'Patterning (readiness)', h1:(h)=>`ABB Pattern with ${h}`,  label:(t)=>`ABB Pattern with ${t}`,
    p3lead:`Children who catch the ABB beat — one picture, then a doubled second — get sharper at noticing exactly which picture repeats, and a finished train is satisfying, proof that patient, close looking really pays off.`,
    p3next:`the more doubled-pattern trains a child finishes, the readier they are for longer, four-part patterns that build on these doubled beats, one rung further along.` },
  'aabb':  { SKEL: SKEL_AABB, P2: P2_AABB, prefix:'pattern-train-aabb-', word:'AABB', eyebrow:'Pattern Worksheet', strand:'Patterning (readiness)', h1:(h)=>`AABB Pattern with ${h}`, label:(t)=>`AABB Pattern with ${t}`,
    p3lead:`Children who read the AABB pattern in pairs get faster at spotting where each block of two begins, and finishing the matched couples feels satisfying, a reward for thinking in twos.`,
    p3next:`once thinking in twos comes easily, a child is ready for ABC, with its three different pictures in a fixed order — a fresh kind of challenge.` },
  'abc':   { SKEL: SKEL_ABC,  P2: P2_ABC,  prefix:'pattern-train-abc-',  word:'ABC',  eyebrow:'Pattern Worksheet', strand:'Patterning (readiness)', h1:(h)=>`ABC Pattern with ${h}`,  label:(t)=>`ABC Pattern with ${t}`,
    p3lead:`Children who can hold the ABC trio in order get quicker at sequencing three different pictures, and finishing an ordered run feels rewarding, a win for a good memory for order.`,
    p3next:`the more three-in-order patterns a child completes, the stronger their sense of sequence grows — for the days of the week, for counting, and for every ordered list they meet.` },
};
function landingSlugOf(co){ const M=MODES[co.mode]; return co.siblings.length > 1 ? `${M.prefix}${co.slugTheme}-kindergarten` : co.canonical; }

function buildMode(mode){
  const list = COORDS.filter(c=>c.mode===mode).slice().sort((a,b)=> a.theme<b.theme?-1:1);
  const M = MODES[mode];
  const cells = M.SKEL.length * M.P2.length;
  if (cells <= list.length) console.log(`  [INVARIANT WARN] pattern-train/${mode}: ${cells} <= ${list.length}`);
  else console.log(`  [invariant OK] pattern-train/${mode} (${M.word}): ${M.SKEL.length}x${M.P2.length}=${cells} > breadth ${list.length} — zero forced same-cell collisions`);
  const out=[]; let blocked=0;
  list.forEach((co,i)=>{
    const d = THEMES[co.theme];
    if(!d){ console.log(`NO COPY DATA for ${co.theme} (${mode})`); blocked++; return; }
    const cell = cellAssign(i, M.SKEL.length, M.P2.length);
    const nbA=list[(i+1)%list.length], nbB=list[(i+5)%list.length];
    const nb=[ `${M.word.toLowerCase()} pattern with ${THEMES[nbA.theme].h1.toLowerCase()}`, `${M.word.toLowerCase()} pattern with ${THEMES[nbB.theme].h1.toLowerCase()}` ];
    const entry = {
      slug: landingSlugOf(co),
      variantShape: co.siblings.length>1 ? 'collapsed' : 'singleton',
      coordinate: { type:'pattern-train', mode: (mode==='null'?null:mode), theme:co.theme, level:'kindergarten' },
      eyebrow: M.eyebrow,
      h1: M.h1(d.h1),
      strand: M.strand,
      slotTokens: d.nouns.replace(/ and /g,', ').split(', ').map(s=>s.replace(/^(a|an|the) /,'').trim()).concat([d.gen, co.theme.replace(/_/g,' '), 'kindergarten', M.word.toLowerCase()+' pattern']),
      p1: M.SKEL[cell.skel](d.nouns, d.gen),
      p2: M.P2[cell.p2](d.gen),
      p3: p3(M, d.gen.toLowerCase(), nb),
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
['null','aab','aabb','abb','abc'].forEach(m=>{ const r=buildMode(m); generated=generated.concat(r.out); blockedTotal+=r.blocked; });

const cur = JSON.parse(fs.readFileSync(EN,'utf8'));
const keep = cur.landings.filter(l => l.coordinate.type !== 'pattern-train');
const merged = { _note: cur._note + ' [Wave 6 lead pattern-train: '+generated.length+' x5-mode/K readiness (Patterning (readiness), NO alignment); pattern-unit ladder ab/aab/abb/aabb/abc.]', landings: keep.concat(generated) };
fs.writeFileSync(EN, JSON.stringify(merged, null, 2) + '\n');
console.log(`generated ${generated.length} pattern-train landings (blocked ${blockedTotal}); total landings now ${merged.landings.length}`);
let short=0, fence=0, banned=0, math=0, hasStd=0;
const FENCE=['count how','how many','classify and count','tally','count the','count each','chart the','chart each'];
const BAN=['fun and engaging','perfect for','great for','dive into','engaging','captivating','unlock','boost','supercharge','easy and fun','one of the earliest','ideal for'];
const MATHCLAIM=['math skill','maths skill','number sense','counting skill','addition','subtraction','arithmetic','how many','place value']; // patterning is NOT math — no over-claim
generated.forEach(e=>{const body=(e.p1+' '+e.p2+' '+e.p3); const lc=body.toLowerCase(); const w=body.split(/\s+/).filter(Boolean).length;
  if(w<200){short++; console.log(`  SHORT ${e.slug}: ${w}`);}
  FENCE.forEach(x=>{if(lc.includes(x)){fence++;console.log(`  FENCE-LEAK ${e.slug}: "${x}"`);}});
  BAN.forEach(x=>{if(lc.includes(x)){banned++;console.log(`  BANNED ${e.slug}: "${x}"`);}});
  MATHCLAIM.forEach(x=>{if(lc.includes(x)){math++;console.log(`  MATH-OVERCLAIM ${e.slug}: "${x}"`);}});
  if('standard' in e){hasStd++;console.log(`  HAS-STANDARD ${e.slug}`);}
});
console.log(short?`${short} short`:'all >=200 words', '|', fence?`${fence} count-fence`:'fence clean', '|', banned?`${banned} banned`:'no banned', '|', math?`${math} math-overclaim`:'no math over-claim', '|', hasStd?`${hasStd} HAS-STANDARD`:'all readiness (Patterning)');