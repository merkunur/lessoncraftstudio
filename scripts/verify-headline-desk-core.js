#!/usr/bin/env node
/* =====================================================================
   verify-headline-desk-core.js — the gate of ACTIVITY #173 "Marina's
   Headline Desk" → THE STAPLER (headline-desk-core.js + -data.js +
   marina-headline-desk-activity.js).
   Ground truth is the DESIGN (docs/activities-rebuild/designs/173-marina-headline-desk.md)
   and this file's own reading of it, never the core's:
     · the design's EN card table (text + the strips each card covers),
       retyped here;
     · the kept Level 1 articles (en de fr es pt it nl), frozen here
       byte for byte from the old manifest;
     · its own staple rule (which strips a card binds, which blow away,
       when the stapler jams) and its own answer;
     · its own shortcut bots (longest, shortest, most / fewest article
       words, pick / avoid a question-word start) in every locale with 3
       and 4 cards: ≤ 3 of 8 (Levels 1–2) and ≤ 6 of 16 (Level 3);
     · the card rules: a detail never copies a strip, a neighbour shares
       a word with the article but covers none, question-word starts on
       ≥ 2 roles per level, the miss-2 thread words are in their strips.
   Usage: node scripts/verify-headline-desk-core.js
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools');
const CORE = process.env.HD_CORE || path.join(MINI, 'headline-desk-core.js');
const DATA = process.env.HD_DATA || path.join(MINI, 'headline-desk-data.js');
const ACT = process.env.HD_ACT || path.join(MINI, 'marina-headline-desk-activity.js');
const MAN = process.env.HD_MAN || path.join(MINI, 'marina-headline-desk-activities.json');
const C = require(CORE), D = require(DATA);
let pass = 0, fail = 0; const fails = [];
const is = (c, m) => { if (c) pass++; else { fail++; if (fails.length < 50) fails.push(m); } };
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const LEVELS = ['story', 'two', 'one'];
const same = (a, b) => a.length === b.length && a.every((x) => b.includes(x));

/* ---------- the design's EN Level 1 / 2 tables (§6) ---------- */
const EN_L1 = [
  ['Bees and the honey they make', ['Visiting flowers for nectar', 1], 'How flowers grow from seeds', ['Living in a busy hive', 0]],
  ['Where the rain comes from', ['How the sun warms the sea', 0], 'Rain boots for puddles', ['Clouds that get heavy', 2]],
  ['From a tiny egg to a frog', ['The egg hatching into a tadpole', 1], 'Where frogs sleep in winter', ['A tadpole growing legs', 2]],
  ['Why we brush our teeth', ['Bits of food and sugar', 1], 'How a dentist fixes your teeth', ['Chewing and smiling', 2]],
  ['A volcano erupting', ['Pressure building up', 1], 'Rocks at the beach', ['Glowing hot lava', 2]],
  ['Borrowing books from a library', ['Taking a book home to read', 1], 'How books are printed', ['Bringing a book back', 2]],
  ['What the wind can do', ['A sailboat on a lake', 1], 'Why lakes freeze in winter', ['Turning a windmill', 2]],
  ['What a seed needs to grow', ['Where roots reach down for a drink', 1], 'Sun hats for hot days', ['A shoot reaching for the light', 2]]
];
const EN_L2 = [
  ['Penguins at sea and on land', ['Birds that swim but cannot fly', 0], 'Why some birds fly south', ['Taking turns on the outside', 3]],
  ['How snowflakes form and look', ['How water freezes in a cloud', 0], 'Sledding down a snowy hill', ['Six sides on every flake', 3]],
  ['The heart that keeps you going', ['How blood moves around your body', 1], 'Strong muscles in your legs', ['As big as your fist', 0]],
  ['How ants live together', ['Who does what in an ant nest', 1], 'A queen in her castle', ['One nest for thousands', 1]],
  ['Facts about the Moon in our sky', ['Why the Moon seems to shine', 1], 'How stars twinkle at night', ['About one month', 1]],
  ['From flour to fresh bread', ['Getting the dough ready', 0], 'A crunchy apple for lunch', ['A crunchy crust', 3]],
  ['Why sleep is so important', ['What the brain does at night', 1], 'Bedtime stories for children', ['Ten hours each night', 1]],
  ['Why trees help us all', ['Animal homes in trees', 1], 'Picking apples from trees', ['The oxygen we breathe', 1]]
];
const EN_L3 = [['Great swimmers that never fly', 'Huddling against the cold wind', ['Short wings like flippers', 1], ['Taking turns on the outside', 3]],
  ['How snow forms in a cold cloud', 'No two flakes are the same', ['Water drops that freeze', 1], ['Six sides on every flake', 3]],
  ['A muscle that never stops', 'Sending blood all around you', ['As big as your fist', 0], ['Food and air in your blood', 3]],
  ['Living in huge groups', 'A job for every ant', ['One nest for thousands', 1], ['The queen lays the eggs', 3]],
  ['The Moon’s trip around Earth', 'Why the Moon seems to glow', ['About one month', 1], ['Light reaching our eyes', 2]],
  ['Making the dough grow', 'Baking the loaf', ['Flour, water and yeast', 0], ['A crunchy crust', 3]],
  ['Rest for a growing body', 'Sleep helps you remember', ['Ten hours each night', 1], ['Your brain sorts the day', 2]],
  ['Leaves that clean the air', 'Homes in the branches', ['The oxygen we breathe', 1], ['Squirrels hiding in holes', 3]]];
const KEPT = /*KEPT*/{"en":[["Bees live together in a busy hive.","They fly from flower to flower for nectar.","Back home, they turn the nectar into honey."],["The sun warms the water in lakes and seas.","The water rises up and makes clouds.","When the clouds get heavy, rain falls down."],["A frog starts life as a tiny egg.","The egg hatches into a tadpole that swims.","The tadpole slowly grows legs and becomes a frog."],["Brushing keeps your teeth clean and strong.","It wipes away bits of food and sugar.","Clean teeth help you chew and smile."],["Deep under a volcano, hot melted rock waits.","Pressure builds up until it pushes upward.","The rock bursts out as glowing hot lava."],["A library is full of books to borrow.","You pick a book and take it home to read.","When you finish, you bring it back for others."],["Moving air is what we call wind.","Wind can push a sailboat across a lake.","It can also turn the blades of a windmill."],["A seed needs sun, water, and soil to grow.","Its roots reach down for a drink.","Then a green shoot pushes up to the light."]],"de":[["Bienen leben zusammen in einem Bienenstock.","Sie fliegen von Blüte zu Blüte.","Zu Hause machen sie aus dem Nektar Honig."],["Die Sonne wärmt das Wasser in den Seen.","Das Wasser steigt hoch und wird zu Wolken.","Sind die Wolken schwer, fällt der Regen."],["Ein Frosch beginnt als kleines Ei.","Aus dem Ei schlüpft eine Kaulquappe, die schwimmt.","Die Kaulquappe bekommt Beine und wird ein Frosch."],["Zähneputzen hält die Zähne sauber und stark.","Es wischt Reste von Essen und Zucker weg.","Saubere Zähne helfen beim Kauen und Lächeln."],["Tief unter dem Vulkan wartet heißes Gestein.","Der Druck steigt und drückt es nach oben.","Das Gestein bricht als glühende Lava heraus."],["Eine Bücherei ist voll mit Büchern.","Du suchst ein Buch aus und nimmst es mit.","Bist du fertig, bringst du es zurück."],["Bewegte Luft nennen wir Wind.","Wind kann ein Segelboot über den See schieben.","Er kann auch die Flügel einer Windmühle drehen."],["Ein Samen braucht Sonne, Wasser und Erde.","Seine Wurzeln reichen nach unten zum Trinken.","Dann wächst ein grüner Trieb nach oben."]],"fr":[["Les abeilles vivent ensemble dans une ruche.","Elles volent de fleur en fleur pour le nectar.","À la ruche, elles transforment le nectar en miel."],["Le soleil réchauffe l'eau des lacs et des mers.","L'eau monte et forme des nuages.","Quand les nuages sont lourds, la pluie tombe."],["Une grenouille commence sa vie comme un petit œuf.","L'œuf éclot en un têtard qui nage.","Le têtard grandit, ses pattes poussent et il devient une grenouille."],["Se brosser les dents les garde propres et solides.","Cela enlève les restes de nourriture et le sucre.","Des dents propres aident à mâcher et à sourire."],["Sous le volcan, de la roche brûlante et fondue attend.","La pression monte jusqu'à la pousser vers le haut.","La roche jaillit sous forme de lave brûlante."],["Une bibliothèque est pleine de livres à emprunter.","Tu choisis un livre et tu l'emportes chez toi pour le lire.","Quand tu as fini, tu le rapportes pour les autres."],["L'air qui bouge, c'est ce qu'on appelle le vent.","Le vent peut pousser un voilier sur un lac.","Il peut aussi faire tourner les ailes d'un moulin."],["Une graine a besoin de soleil, d'eau et de terre pour pousser.","Ses racines descendent pour boire.","Puis une pousse verte monte vers la lumière."]],"es":[["Las abejas viven juntas en una colmena muy ocupada.","Vuelan de flor en flor para juntar néctar.","En casa convierten el néctar en miel."],["El sol calienta el agua de los lagos y los mares.","El agua sube y forma las nubes.","Cuando las nubes se ponen pesadas, cae la lluvia."],["Una rana empieza su vida como un huevito.","Del huevo sale un renacuajo que nada.","Poco a poco al renacuajo le salen patas y se convierte en rana."],["Cepillarte los dientes los deja limpios y fuertes.","Quita los restos de comida y de azúcar.","Los dientes limpios te ayudan a masticar y a sonreír."],["Muy adentro de un volcán espera roca caliente y derretida.","La presión crece hasta que la empuja hacia arriba.","La roca sale disparada como lava caliente y brillante."],["Una biblioteca está llena de libros para pedir prestados.","Escoges un libro y te lo llevas a casa a leer.","Cuando terminas, lo regresas para los demás."],["Al aire que se mueve le decimos viento.","El viento puede empujar un velero por un lago.","También puede mover las aspas de un molino de viento."],["Una semilla necesita sol, agua y tierra para crecer.","Sus raíces bajan a buscar agua.","Luego un brote verde empuja hacia la luz."]],"pt":[["As abelhas vivem juntas numa colmeia.","Elas voam de flor em flor para juntar néctar.","Com o néctar, elas fazem o mel."],["A chuva cai das nuvens do céu.","As gotas molham as plantas e a terra.","Depois da chuva, tudo fica mais verde."],["Você escova os dentes todos os dias.","A escova tira a sujeira dos dentes.","Dentes limpos ficam fortes e saudáveis."],["As formigas moram embaixo da terra.","Elas trabalham juntas para achar comida.","Cada formiga carrega migalhas para o formigueiro."],["A semente é plantada na terra.","Com água e sol, ela começa a crescer.","Aos poucos, vira uma plantinha verde."],["O sapo nasce dentro da água.","No começo, ele é um girino com rabo.","Depois cria pernas e vira sapo."],["A lua aparece no céu à noite.","A lua não tem luz própria.","Ela brilha porque reflete a luz do sol."],["A tartaruga carrega um casco nas costas.","O casco duro protege o corpo dela.","Quando sente perigo, ela se esconde dentro dele."]],"it":[["Le api vivono insieme in un alveare.","Volano di fiore in fiore per raccogliere il nettare.","A casa trasformano il nettare in miele."],["Il sole scalda l’acqua del mare.","L’acqua sale in alto e forma le nuvole.","Quando le nuvole sono piene, l’acqua cade come pioggia."],["La rana depone le uova nello stagno.","Dalle uova nascono i girini con la coda.","I girini diventano rane con quattro zampe."],["Ogni giorno mangiamo tanti cibi diversi.","I piccoli resti di cibo restano sui denti.","Laviamo i denti per tenerli puliti e sani."],["Dentro il vulcano fa molto caldo.","La roccia si scioglie e diventa lava.","La lava esce e scende lungo i fianchi."],["In biblioteca ci sono tanti libri.","Scegli un libro e lo porti al banco.","Puoi tenerlo a casa e poi lo riporti."],["Il vento è aria che si muove.","Può spingere le barche a vela sul mare.","A volte solleva le foglie e le fa volare."],["Il seme piccolo dorme sotto la terra.","Ha bisogno di acqua, sole e terra buona.","Con il tempo spunta e diventa una pianta."]],"nl":[["Bijen leven samen in een korf.","Ze vliegen van bloem naar bloem voor nectar.","Thuis maken ze honing van de nectar."],["De zon warmt het water in de meren.","Het water stijgt op en wordt wolken.","Zware wolken laten de regen vallen."],["Een kikker begint als een klein ei.","Uit het ei komt een kikkervisje dat zwemt.","Het krijgt pootjes en wordt een kikker."],["Poetsen houdt je tanden schoon en sterk.","Het veegt resten van eten en suiker weg.","Schone tanden helpen bij kauwen en lachen."],["Diep onder de vulkaan zit heet gesteente.","De druk stijgt en duwt het omhoog.","Het breekt naar buiten als gloeiende lava."],["Een bibliotheek staat vol met boeken.","Je zoekt een boek uit en neemt het mee.","Als je klaar bent, breng je het terug."],["De wind kan zacht of hard waaien.","Hij kan een zeilboot over het meer duwen.","Hij kan zelfs een vlieger laten vliegen."],["Een zaadje heeft water, zon en warmte nodig.","Zijn worteltjes reiken omlaag om te drinken.","Dan groeit er langzaam een plantje uit."]]}/*KEPT-END*/;

/* ---------- my staple rule (design §5/§7) ---------- */
function myPress(level, nStrips, lit, covers) {
  const all = [...Array(nStrips).keys()], yellow = lit == null ? null : (lit ? [2, 3] : [0, 1]);
  if (level !== 'one') return { stapled: covers.slice().sort(), blown: all.filter((i) => !covers.includes(i)), jam: false, ok: same(covers, all) };
  if (!covers.length || !covers.every((i) => yellow.includes(i))) return { stapled: [], blown: [], jam: covers.length > 0, ok: false };
  return { stapled: covers.slice().sort(), blown: yellow.filter((i) => !covers.includes(i)), jam: false, ok: same(covers, yellow) };
}

/* ---------- 1. the EN rounds are the design's ---------- */
{
  const r1 = C.rounds('en', 'story', D), r2 = C.rounds('en', 'two', D), r3 = C.rounds('en', 'one', D);
  EN_L1.forEach((d, k) => {
    const r = r1[k], c = r.cards;
    is(c[0].text === d[0] && same(c[0].covers, [0, 1, 2]), `en L1 ${r.id}: the topic card is the design's and covers all three strips`);
    is(c[1].text === d[1][0] && same(c[1].covers, [d[1][1]]), `en L1 ${r.id}: the detail «${d[1][0]}» covers strip ${d[1][1] + 1}`);
    is(c[2].text === d[2] && c[2].covers.length === 0, `en L1 ${r.id}: the neighbour «${d[2]}» covers none`);
    is(c[3].text === d[3][0] && same(c[3].covers, [d[3][1]]), `en L1 ${r.id}: the 4th card «${d[3][0]}» covers strip ${d[3][1] + 1}`);
  });
  EN_L2.forEach((d, k) => {
    const r = r2[k], c = r.cards;
    is(c[0].text === d[0] && same(c[0].covers, [0, 1, 2, 3]), `en L2 ${r.id}: the topic covers all four strips`);
    is(c[1].text === d[1][0] && same(c[1].covers, d[1][1] ? [2, 3] : [0, 1]), `en L2 ${r.id}: the paragraph card covers ¶${d[1][1] + 1}`);
    is(c[2].text === d[2] && c[2].covers.length === 0, `en L2 ${r.id}: the neighbour covers none`);
    is(c[3].text === d[3][0] && same(c[3].covers, [d[3][1]]), `en L2 ${r.id}: the 4th card covers strip ${d[3][1] + 1}`);
  });
  EN_L3.forEach((d, a) => [0, 1].forEach((p) => {
    const r = r3[a * 2 + p], c = r.cards, mine = p ? [2, 3] : [0, 1];
    is(r.lit === p && c[0].text === d[p] && same(c[0].covers, mine), `en L3 ${r.id}: the fit «${d[p]}» covers the yellow paragraph`);
    is(c[1].text === d[2 + p][0] && same(c[1].covers, [d[2 + p][1]]) && mine.includes(d[2 + p][1]), `en L3 ${r.id}: the detail covers one yellow strip`);
    is(c[2].text === d[1 - p] && same(c[2].covers, p ? [0, 1] : [2, 3]), `en L3 ${r.id}: the other card is the other paragraph's fit`);
    is(c[3].text === EN_L2[a][0] && c[3].covers.length === 4, `en L3 ${r.id}: the 4th card is the whole-article topic`);
  }));
}

/* ---------- 2. every locale: shape, kept articles, roles, my staple rule ---------- */
const QW = { en: 'How|Why|What|Where|When|Who', de: 'Wie|Warum|Was|Woher|Wo|Wer|Wann|Wozu|Wofür', fr: 'Comment|Pourquoi|Où|D’où|Quand|Qui|Que|Qu’|Quel|Quelle', es: '¿?Cómo|¿?Por qué|¿?Dónde|¿?Qué|¿?Cuándo|¿?Quién|¿?De dónde', pt: 'Como|Por que|Onde|O que|Quando|Quem|De onde', it: 'Come|Perché|Dove|Che cosa|Cosa|Quando|Chi|Da dove', nl: 'Hoe|Waarom|Waar|Wat|Wanneer|Wie', sv: 'Hur|Varför|Var|Vad|När|Vem|Varifrån', da: 'Hvordan|Hvorfor|Hvor|Hvad|Hvornår|Hvem', no: 'Hvordan|Hvorfor|Hvor|Hva|Når|Hvem', fi: 'Miten|Miksi|Mistä|Mitä|Mikä|Missä|Milloin|Kuka|Mihin|Millainen' };
const qStart = (l, s) => new RegExp('^(' + QW[l] + ')(?!\\p{L})', 'u').test(s);
const words = (s) => (s.toLowerCase().match(/\p{L}+/gu) || []).filter((w) => w.length > 3);
/* two words are the same word in another form when, accents folded, they are equal or share their first 4 letters (Frosch / Frösche, roca / rocas) */
const fold = (w) => w.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/ø/g, 'o').replace(/æ/g, 'a');
const cwords = (s) => (s.toLowerCase().match(/\p{L}+/gu) || []).filter((w) => w.length >= 3).map(fold);
/* …or a 3-letter word begins a longer one (sjö / sjön, sol / solhattar, sne / sneen); Finnish changes the stem in its cases,
   so there 3 shared first letters are enough (lumi / lumessa, lintuja / linnut) */
const kin = (a, b, fi) => a === b || (a.length >= 4 && b.length >= 4 && a.slice(0, 4) === b.slice(0, 4)) ||
  (Math.min(a.length, b.length) >= 3 && (a.startsWith(b) || b.startsWith(a))) || (fi && a.length >= 4 && b.length >= 4 && a.slice(0, 3) === b.slice(0, 3));
const STOP = /^(the|and|for|with|from|der|die|das|und|les|des|une|pour|los|las|una|para|con|ela|ele|das|dos|che|per|con|een|het|van|voor|och|för|med|som|det|den|til|med|for|med|som|ja|että|tai)$/;
for (const l of LOCALES) {
  is(!!D[l] && D[l].L1.length === 8 && D[l].L2.length === 8, `${l}: 8 Level-1 and 8 Level-2 articles`);
  if (!D[l]) continue;
  D[l].L1.forEach((a) => is(a.strips.length === 3, `${l} L1 ${a.id}: three strips`));
  D[l].L2.forEach((a) => is(a.p1.length === 2 && a.p2.length === 2, `${l} L2 ${a.id}: two paragraphs of two strips`));
  if (KEPT[l]) KEPT[l].forEach((s, k) => is(JSON.stringify(D[l].L1[k].strips) === JSON.stringify(s), `${l} L1 #${k + 1}: the kept article is byte-equal to the old one`));
  for (const lev of LEVELS) {
    const rs = C.rounds(l, lev, D), qRoles = {};
    is(rs.length === (lev === 'one' ? 16 : 8), `${l} ${lev}: ${rs.length} rounds`);
    rs.forEach((r) => {
      const tag = `${l} ${lev} ${r.id}`, art = (r.level === 'one' ? r.target.map((i) => r.strips[i]) : r.strips);
      /* exactly one card is right — by my rule */
      const rights = r.cards.map((c) => myPress(lev, r.strips.length, r.lit, c.covers).ok);
      is(rights.filter(Boolean).length === 1 && rights[0], `${tag}: exactly one right card, the ${r.cards[0].role}`);
      r.cards.forEach((c, i) => { const mine = myPress(lev, r.strips.length, r.lit, c.covers), core = C.press(r, c); is(same(core.stapled, mine.stapled) && same(core.blown, mine.blown) && core.jam === mine.jam && core.ok === mine.ok, `${tag}: the core staples «${c.text}» as I do`); });
      /* roles */
      const byRole = {}; r.cards.forEach((c) => { byRole[c.role] = c; });
      if (lev === 'story') { is(byRole.detail.covers.length === 1 && byRole.fourth.covers.length === 1 && byRole.detail.covers[0] !== byRole.fourth.covers[0], `${tag}: detail and 4th card each cover one different strip`); }
      if (lev === 'two') { is(same(byRole.paragraph.covers, [0, 1]) || same(byRole.paragraph.covers, [2, 3]), `${tag}: the paragraph card covers one whole paragraph`); is(byRole.fourth.covers.length === 1, `${tag}: the 4th card covers one strip`); }
      if (lev === 'one') { is(byRole.detail.covers.length === 1 && r.target.includes(byRole.detail.covers[0]), `${tag}: the detail covers one yellow strip`); is(byRole.other.covers.every((i) => !r.target.includes(i)) && byRole.other.covers.length === 2, `${tag}: the other card covers the other paragraph`); }
      if (byRole.neighbour) {
        is(byRole.neighbour.covers.length === 0, `${tag}: the neighbour covers no strip`);
        const A = cwords(r.strips.join(' ')).filter((w) => !STOP.test(w)), shared = cwords(byRole.neighbour.text).filter((w) => !STOP.test(w) && A.some((x) => kin(w, x, l === 'fi')));
        is(shared.length > 0, `${tag}: the neighbour «${byRole.neighbour.text}» shares a word with the article`);
      }
      /* a detail is a paraphrase, never a copy of a strip */
      r.cards.filter((c) => c.covers.length === 1).forEach((c) => {
        const norm = (s) => s.toLowerCase().replace(/[^\p{L}\s]/gu, '').replace(/\s+/g, ' ').trim();
        /* a copy of a STRIP: the card holds most of one sentence (≥ 70 % of its words, in order); a short phrase is fine (the design's own "Ten hours each night") */
        is(!r.strips.some((s) => norm(s).includes(norm(c.text)) && norm(c.text).split(' ').length >= 0.7 * norm(s).split(' ').length), `${tag}: «${c.text}» is not a copy of a strip`);
      });
      /* headline form: sentence case, no full stop */
      r.cards.forEach((c) => is(!/[.]$/.test(c.text) && /^[¿]?\p{Lu}/u.test(c.text), `${tag}: «${c.text}» is a headline (capital, no full stop)`));
      r.cards.slice(0, 3).forEach((c) => { if (qStart(l, c.text)) qRoles[c.role] = 1; });
      /* miss-2 thread words stand in their strips */
      r.hl.forEach((ws, i) => { is(ws.length > 0, `${tag}: strip ${i + 1} has thread words`); ws.forEach((w) => is(new RegExp('(^|[^\\p{L}])' + w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(?![\\p{L}])', 'u').test(r.strips[i]), `${tag}: thread word «${w}» stands in strip ${i + 1}`)); });
    });
    if (lev !== 'one') is(Object.keys(qRoles).length >= 2, `${l} ${lev}: question-word starts on ≥ 2 card roles (${Object.keys(qRoles)})`);
  }
}

/* ---------- 3. the shortcut bots, every locale, 3 and 4 cards ---------- */
function bot(rs, n, pick) {
  let hits = 0;
  rs.forEach((r) => {
    const cards = C.order(r.level, r.k, n, 0).map((i) => r.cards[i]), vals = cards.map((c) => pick(c, r)), best = Math.max(...vals);
    const tie = vals.map((v, i) => (v === best ? i : -1)).filter((i) => i >= 0), right = cards.findIndex((c) => myPress(r.level, r.strips.length, r.lit, c.covers).ok);
    if (tie.includes(right)) hits += 1 / tie.length;
  });
  return hits;
}
for (const l of LOCALES) for (const lev of LEVELS) for (const n of [3, 4]) {
  const rs = C.rounds(l, lev, D), lim = lev === 'one' ? 6 : 3;
  const ov = (c, r) => { const A = new Set(words((r.level === 'one' ? r.target.map((i) => r.strips[i]) : r.strips).join(' '))); return words(c.text).filter((w) => A.has(w)).length; };
  const B = { longest: (c) => c.text.length, shortest: (c) => -c.text.length, mostWords: ov, fewestWords: (c, r) => -ov(c, r), pickQ: (c) => (qStart(l, c.text) ? 1 : 0), avoidQ: (c) => (qStart(l, c.text) ? 0 : 1) };
  for (const b of Object.keys(B)) { const s = bot(rs, n, B[b]); is(s <= lim + 1e-9, `${l} ${lev} ${n} cards: the "${b}" bot scores ${s.toFixed(2)} ≤ ${lim}`); }
}

/* ---------- 4. answer position: the balanced tables, rotated per pass ---------- */
for (const lev of LEVELS) for (const n of [3, 4]) for (let pass = 0; pass < n; pass++) {
  const rs = C.rounds('en', lev, D), cnt = {};
  rs.forEach((r) => { const o = C.order(lev, r.k, n, pass), slot = o.indexOf(0); cnt[slot] = (cnt[slot] || 0) + 1; is(o.slice().sort().join() === [...Array(n).keys()].join(), `${lev} ${n}c pass ${pass} r${r.k}: the order is a permutation`); });
  const max = Math.max(...Object.values(cnt)), lim = lev === 'one' ? 6 : 3;
  is(max <= lim && Object.keys(cnt).length === n, `${lev} ${n} cards pass ${pass}: the right card's slots ${JSON.stringify(cnt)} — no slot over ${lim}, every slot used`);
}
for (const lev of LEVELS) for (const n of [3, 4]) { const a = C.rounds('en', lev, D).map((r) => C.order(lev, r.k, n, 0).indexOf(0)), b = C.rounds('en', lev, D).map((r) => C.order(lev, r.k, n, 1).indexOf(0)); is(a.some((x, i) => x !== b[i]), `${lev} ${n}c: the slots move from pass to pass`); }

/* ---------- 5. the hand and Check ---------- */
{
  const st = C.newState('en', 'story', 0, 3, 0, D);
  let r = C.check(st); is(r.result === 'note' && r.key === 'hintEmpty' && st.misses === 0, 'Check with no headline: a reminder, no miss');
  const iDet = st.cards.findIndex((c) => c.role === 'detail'), iNb = st.cards.findIndex((c) => c.role === 'neighbour'), iTop = st.cards.findIndex((c) => c.role === 'topic');
  C.choose(st, iDet); r = C.check(st);
  is(r.result === 'miss' && C.hint(st, r) === 'hintDetail' && st.verdict.stapled.length === 1 && st.verdict.blown.length === 2, 'a detail staples one strip, two blow away, the detail hint');
  C.choose(st, iNb); is(st.verdict === null && !st.help, 'a new card clears the showing');
  r = C.check(st); is(r.result === 'miss' && st.help && C.hint(st, r) === 'hintMiss2' && st.verdict.stapled.length === 0, 'second miss (a neighbour staples nothing): help, the underline hint');
  C.choose(st, iTop); is(!st.help, 'a new card clears the help');
  r = C.check(st); is(r.result === 'ok' && st.done && st.verdict.stapled.length === 3, 'the topic staples all three strips: solved');
  is(!C.choose(st, iDet), 'no card moves after success');
  const s1 = C.newState('en', 'story', 0, 3, 0, D); C.choose(s1, s1.cards.findIndex((c) => c.role === 'neighbour')); r = C.check(s1); is(C.hint(s1, r) === 'hintNeighbour', 'a first neighbour miss: the neighbour hint');
  const s2 = C.newState('en', 'two', 0, 3, 0, D); C.choose(s2, s2.cards.findIndex((c) => c.role === 'paragraph')); r = C.check(s2); is(C.hint(s2, r) === 'hintPara' && s2.verdict.stapled.length === 2 && s2.verdict.blown.length === 2, 'Level 2: the one-paragraph card staples two, two blow away, the paragraph hint');
  const s3 = C.newState('en', 'one', 0, 4, 0, D);
  C.choose(s3, s3.cards.findIndex((c) => c.role === 'other')); r = C.check(s3); is(C.hint(s3, r) === 'hintL3other' && s3.verdict.jam && s3.verdict.stapled.length === 0, 'Level 3: the other paragraph jams the stapler, the other-paragraph hint');
  const s4 = C.newState('en', 'one', 0, 4, 0, D); C.choose(s4, s4.cards.findIndex((c) => c.role === 'whole')); r = C.check(s4); is(C.hint(s4, r) === 'hintL3whole' && s4.verdict.jam, 'Level 3: the whole-article card jams the stapler, the whole hint');
  const s5 = C.newState('en', 'one', 0, 3, 0, D); C.choose(s5, s5.cards.findIndex((c) => c.role === 'detail')); r = C.check(s5); is(C.hint(s5, r) === 'hintL3detail' && s5.verdict.stapled.length === 1 && s5.verdict.blown.length === 1, 'Level 3: a detail staples one yellow strip, the other blows off');
  is(C.newState('en', 'story', 0, 4, 0, D).cards.length === 4 && C.newState('en', 'story', 0, 3, 0, D).cards.length === 3, 'the cards setting deals 3 or 4 cards');
}
for (const lev of LEVELS) { const fixed = () => 0.37, a = C.plan(lev, fixed, null), b = C.plan(lev, fixed, a); is(a.join() !== b.join() && a.slice().sort((x, y) => x - y).join() === b.slice().sort((x, y) => x - y).join() && a.length === C.passSize(lev), `${lev}: a repeating generator still gets a fresh order of every round`); }

/* ---------- 6. the words ---------- */
const src = fs.readFileSync(ACT, 'utf8');
const S = Function('return ' + src.slice(src.indexOf('/*STRINGS-BEGIN*/') + 17, src.indexOf(',/*STRINGS-END*/')).replace(/^strings:\s*/, ''))();
const ph = (s) => (String(s).match(/\{\w+\}/g) || []).sort().join();
for (const k of Object.keys(S)) for (const l of LOCALES) {
  const v = S[k][l];
  is(typeof v === 'string' && v.trim().length > 0, `${k}.${l} is written`);
  is(ph(v) === ph(S[k].en), `${k}.${l} carries the en placeholders`);
  if (l === 'fr') is(!/ [!?:;]/.test(v), `fr ${k}: no plain space before ! ? : ;`);
  if (l !== 'en') is(!/Common Core|CCSS|RI\.2/.test(v), `${k}.${l}: no Common Core on the screen`);
}
const body = src.slice(src.indexOf(',/*STRINGS-END*/')) + fs.readFileSync(CORE, 'utf8');
for (const k of Object.keys(S)) is(['title', 'instruction', 'instrBubble', 'okBubble'].includes(k) || body.includes("'" + k + "'"), `${k} is used`);
is(/OK_MS: 500,/.test(src), 'Next appears 0.5 s after the result');
for (const l of LOCALES) {
  const j = JSON.parse(fs.readFileSync(path.join(REPO, 'frontend', 'messages', 'activity-content', l + '.json'), 'utf8')), p = (j.prose || j)['marina-headline-desk.main-topic.ri-2-2'];
  is(!!p && p.about && p.about.length === 3 && p.practices.length >= 3 && p.howToPlay.length >= 3 && p.learningGoals.length >= 3, `${l}: the page prose is written`);
  if (p && l !== 'en') is(!/Common Core|CCSS/.test(JSON.stringify(p)), `${l} prose: no Common Core`);
}
{
  const m = JSON.parse(fs.readFileSync(MAN, 'utf8')), row = (Array.isArray(m) ? m : [m]).find((x) => x.id === 'marina-headline-desk.main-topic.ri-2-2');
  is(row && row.tool === 'marina-headline-desk-activity' && JSON.stringify(row.params) === '{}', 'the manifest row points at the activity with no params');
  is(row && row.alignment.code === 'RI.2.2' && LOCALES.every((l) => row.slug[l] && row.page_title[l] && row.page_intro[l]), 'the row keeps RI.2.2 and has a slug, title and intro in all 11 locales');
  const html = fs.readFileSync(path.join(MINI, 'marina-headline-desk-activity.html'), 'utf8');
  is(/headline-desk-data\.js\?v=\d+/.test(html) && /headline-desk-core\.js\?v=\d+/.test(html) && /marina-headline-desk-activity\.js\?v=\d+/.test(html) && !/main-topic-core/.test(html), 'the html loads the data, the core and the activity');
  is(!/#lcs-root\s*\{[^}]*height:\s*100%/.test(html) && !/#lcs-root\s*\{\s*height/.test(html) && !/html, body, #lcs-root/.test(html), 'the html does not pin the root to 100 % height');
}

if (fails.length) console.log(fails.map((f) => '  FAIL: ' + f).join('\n'));
console.log(`verify-headline-desk-core: ${pass} pass, ${fail} fail`);
process.exit(fail ? 1 : 0);
