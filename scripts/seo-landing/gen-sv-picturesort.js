#!/usr/bin/env node
/* SV picture-sort "-vs-" PAIRS × förskola, READINESS (Visuell perception och logiskt tänkande).
 * The de-orphan's content side, ported to Swedish. Each page sorts the pictures of TWO themes
 * (A,B) into two groups; the body references BOTH themes' concrete nouns (the -vs- differentiation).
 *
 * Swedish has NO case system (no de datN dative) — render2 is PURE SUBSTITUTION (sv-render.js spirit):
 *   {A_PL}/{B_PL} -> plIndef   ("med {A_PL} och {B_PL}")
 *   {A_DEF}/{B_DEF} -> plDef    ("lägg {A_DEF} för sig")
 *   {A_H1}/{B_H1} -> h1Display  (display)
 *
 * NO `standard` key (readiness). CHART-COUNT FENCE: sort/group lexicon, NEVER count-framing
 * (no räkna/antal/hur många/diagram as an instruction; negated "titta och sortera, inte räkna" OK).
 * 16×12=192 cells > 151 pairs (§22.1 cell-space invariant): the coprime bijection gives every pair
 * a DISTINCT (SKEL,P2) cell, so no two pairs share a template and the identical-cell collisions vanish.
 * Usage: node scripts/seo-landing/gen-sv-picturesort.js
 */
'use strict';
const fs = require('fs');
const { THEMES } = require('./sv-themes');
const SV = 'frontend/content/seo-landing/sv.json';
const COORDS = JSON.parse(fs.readFileSync('scripts/seo-landing/sv-picture-sort-coordinates.json', 'utf8')).coordinates;

// PURE SUBSTITUTION — Swedish has no noun case, so no datN; literal placeholder->value.
function render2(tpl, vals) {
  let s = tpl;
  Object.keys(vals).forEach(function (k) {
    s = s.replace(new RegExp('\\{' + k + '\\}', 'g'), vals[k]);
  });
  return s;
}

// ===== Frames (T1 native sv; {A_PL}/{B_PL}/{A_DEF}/{B_DEF} markers). Warm du-register "ditt barn", förskola.
// Both themes referenced in every frame. SORT/GROUP mechanic; counting only as the negated divergence. =====
const SKEL = [
  'På det här arbetsbladet för förskolan ligger {A_PL} och {B_PL} blandade om varandra — allt är huller om buller på samma sida. Ditt barns uppgift är att sortera varje bild i rätt grupp: lägg {A_DEF} för sig och {B_DEF} för sig. Här handlar det inte om att räkna, utan om att titta och sortera. Ditt barn funderar: vilken grupp hör bilden till, vad är samma sort och vad hör ihop? På så vis lär det sig att dela in saker i två grupper och att klassificera efter vad bilderna har gemensamt — en viktig förmåga inför skolan. Titta och sortera, inte räkna, i ditt barns alldeles egna takt.',
  'Här har {A_PL} och {B_PL} hamnat huller om buller — ett glatt virrvarr av bilder på ett enda blad. Ditt barn tittar lugnt på varje bild och grupperar den där den hör hemma: {A_DEF} hit och {B_DEF} dit. Det behöver inte räkna någonting, bara känna igen vad som hör ihop och vad som är samma sort. Just det här att sortera och klassificera är en riktig förskoleförmåga: ditt barn ser likheter, jämför och delar in i två grupper. Den här lugna titta-och-sortera-övningen är rolig och stärker det logiska tänkandet — utan press, utan tidtagning, helt utan att räkna. Beröm varje bild som hamnar i rätt grupp.',
  'På arbetsbladet ligger {A_PL} och {B_PL} vilt blandade sida vid sida. Nu får ditt barn städa — med ögonen: det sorterar varje bild i två grupper, {A_DEF} för sig och {B_DEF} för sig. Vilka saker hör ihop, och vilka bildar en egen sort? En sådan sorteringsuppgift tränar att klassificera: att jämföra noga och dela in efter likheter. Det är en värdefull förmåga som hjälper ditt barn att tänka strukturerat i skolan. Här räknas ingenting — det handlar bara om vilken grupp varje bild hör till. Ta god tid på er och njut av att sortera tillsammans.',
  'Tänk dig ett blad där {A_PL} och {B_PL} ligger huller om buller om varandra. Precis det hittar du här — och ditt barn skapar ordning. Det tittar på varje bild och bestämmer: hör den till {A_DEF} eller till {B_DEF}? Bild för bild vandrar till sin rätta grupp. När ditt barn sorterar övar det att klassificera: det känner igen vad som är samma sort, jämför och grupperar efter vad som hör ihop. Den förmågan är en viktig byggsten inför skolan. Och det fina: här tittar och sorterar man, man räknar aldrig. Varje rätt placerad bild får gärna firas.',
  '{A_PL} och {B_PL} har blandat sig grundligt på det här arbetsbladet — hög tid att sortera! Ditt barn grupperar varje bild i rätt grupp: {A_DEF} bildar en sort och {B_DEF} en annan. Det funderar vid varje bild på vad som hör ihop och vad som ska läggas för sig. Så växer det fram en förståelse för kategorier och kännetecken — att sortera och klassificera som en äkta förmåga inför skolan. Här räknar ingen någonting; det handlar bara om att titta, jämföra och lägga ihop. Helt utan tidspress och utan poäng, i er alldeles egna takt, med massor av beröm.',
  'På det här förskolebladet väntar {A_PL} och {B_PL} blandade på att få bli ordnade. Ditt barn tar sig an varje bild och lägger den i sin grupp: {A_DEF} tillsammans och {B_DEF} tillsammans. Vad hör ihop, och vad bildar en egen sort? Just det här att jämföra och gruppera är att klassificera — en förmåga som senare hjälper ditt barn att ordna både tankar och uppgifter. Ingenting räknas; ditt barn tittar, känner igen vad som är samma sort och sorterar. En lugn och vänlig övning utan stoppur — titta och sortera, inte räkna, helt i ditt barns takt.',
  'Här ser du {A_PL} och {B_PL} glatt om varandra på ett arbetsblad. Ditt barn sorterar dem i två grupper: allt som hör till {A_DEF} på den ena sidan, allt som hör till {B_DEF} på den andra. Det tittar noga på varje bild och funderar på vad som hör ihop. Den här sorteringen övar att klassificera: att lägga märke till kännetecken och att bilda kategorier. Det är en viktig förmåga inför skolan. Här räknas ingenting — det handlar bara om frågan vilken grupp en bild hör till. Beröm och tålamod gör övningen extra fin.',
  'På bladet är {A_PL} och {B_PL} ordentligt blandade — och ditt barn skapar ordning igen. Det sorterar varje bild i rätt grupp: lägg {A_DEF} för sig och {B_DEF} för sig. Vilka saker hör ihop, vad är samma sort? När ditt barn sorterar och klassificerar lär det sig att känna igen likheter och att dela in i två grupper efter kännetecken — en grundförmåga för strukturerat tänkande i skolan. Ingen behöver räkna här; det handlar om att titta, jämföra och placera rätt. En avspänd övning utan press och utan tidsgräns, med ett beröm för varje rätt grupp.',
  'Ett glatt myller möter ditt barn på det här förskolebladet: {A_PL} och {B_PL} ligger om vartannat och vill bli ordnade. Med ögonen som verktyg delar ditt barn in dem i två grupper — {A_DEF} samlas på ett ställe, {B_DEF} på ett annat. Vid varje bild stannar det upp och frågar sig vad som hör ihop och vad som bildar en egen sort. Att sortera så här är att klassificera: ditt barn lägger märke till kännetecken, jämför och grupperar efter likhet. Det stärker det logiska tänkandet steg för steg inför skolan. Något räknande blir det aldrig — bara lugnt tittande och sorterande, helt i ditt barns egen takt och med beröm för varje träff.',
  'Föreställ dig en sida full av {A_PL} och {B_PL} om varandra, helt utan ordning. Här får ditt barn bli den som reder ut det hela. Lugnt och metodiskt flyttar det varje bild dit den hör: {A_DEF} i sin grupp, {B_DEF} i sin. Vad förenar sakerna i en grupp, och vad skiljer dem från den andra? Den här sorteringsleken tränar förmågan att klassificera — att se mönster, jämföra och dela in efter kännetecken. Det är en byggsten som bär ditt barn långt i skolan. Ingenting ska räknas på det här bladet; det viktiga är bara vilken grupp varje bild tillhör. Sitt gärna nära, ställ små frågor och fira varje rätt placerad bild.',
  'Det här arbetsbladet börjar i en härlig röra: {A_PL} och {B_PL} ligger blandade kors och tvärs. Ditt barn skapar ordning genom att sortera bild för bild i två tydliga grupper, {A_DEF} för sig och {B_DEF} för sig. Vad är samma sort, och vad hör inte ihop? När ditt barn grupperar på det här viset övar det att klassificera — att känna igen gemensamma drag och dela in efter dem. Den förmågan hjälper ditt barn att tänka ordnat i förskolan och senare i skolan. Här tittar och sorterar man, man räknar aldrig. Låt övningen ta den tid den behöver, utan stoppur och utan poäng, och ge gott om uppmuntran på vägen.',
  'Två sorters bilder, ett enda rörigt blad: {A_PL} och {B_PL} ligger huller om buller och väntar på ditt barn. Med blicken plockar ditt barn isär röran och sorterar varje bild i sin grupp — {A_DEF} hör hemma på ett ställe, {B_DEF} på ett annat. Det funderar vid varje motiv: hör den hit eller dit, vad är samma sort? Att sortera och klassificera så här lägger grunden för logiskt tänkande, och det är en riktig förskoleförmåga inför skolstarten. Inget behöver räknas; det enda som gäller är att titta, jämföra och lägga rätt. En vänlig och lugn stund tillsammans, helt utan press och med beröm för varje grupp som blir klar.',
  'På den här sidan har {A_PL} och {B_PL} blandat sig rejält, och nu är det dags att reda ut det. Ditt barn tittar lugnt på en bild i taget och avgör vilken grupp den hör till: allt som tillhör {A_DEF} läggs ihop, allt som tillhör {B_DEF} samlas för sig. Vilka saker hör ihop, och vad bildar en egen kategori? När ditt barn sorterar övar det att klassificera — att jämföra, se likheter och ordna efter kännetecken. Det är en värdefull förmåga som förbereder för skolan. Här räknas ingenting alls; uppgiften handlar bara om vad som hör ihop. Ta er god tid, prata om bilderna och beröm varje rätt placering.',
  'Vilken blandning! På det här förskolebladet ligger {A_PL} och {B_PL} om vartannat, helt utan ordning. Ditt barn får i uppdrag att städa med ögonen och sortera varje bild i rätt grupp — {A_DEF} samlas, {B_DEF} samlas. Vid varje bild tänker ditt barn efter: vad hör ihop, vad är samma sort? Den här övningen i att sortera och klassificera tränar logiskt tänkande och förmågan att dela in i två grupper efter gemensamma drag — viktiga steg inför skolan. Räkna behöver man inte göra här; allt handlar om att titta, jämföra och placera rätt. En lugn syssla utan tidsgräns och utan poäng, där ditt barn får arbeta i sin egen takt med mycket beröm.',
  'Här ligger {A_PL} och {B_PL} blandade i en enda glad röra på arbetsbladet. Ditt barn skapar ordning genom att gruppera varje bild där den hör hemma: {A_DEF} bildar en sort och {B_DEF} en annan. Vad förenar sakerna inom en grupp? När ditt barn sorterar tränar det att klassificera — att lägga märke till kännetecken, jämföra och dela in efter likhet. Det stärker det logiska tänkandet och är en fin förberedelse inför skolan. På det här bladet räknar man aldrig; det viktiga är bara vilken grupp varje bild tillhör, inte hur stort något är. Sitt nära ditt barn, fundera tillsammans och fira lugnt varje bild som hamnar rätt.',
  'På det här bladet ligger {A_PL} och {B_PL} blandade om varandra, och ditt barn blir den som ordnar upp. Bild för bild bestämmer det vilken grupp som passar: {A_DEF} hör till den ena sorten, {B_DEF} till den andra. Vad har sakerna i en grupp gemensamt, och vad gör att de andra hamnar för sig? Att sortera och klassificera på det här viset övar ditt barn i att se likheter, jämföra och dela in efter kännetecken — en grundläggande förmåga som bär ända in i skolan. Här tittar och sorterar man bara, man räknar aldrig. Låt det ta sin tid, utan stoppur och utan poäng, och ge ett varmt beröm för varje bild som hittar sin grupp.',
];
const P2 = [
  'Så här går det till: ditt barn tittar på de blandade bilderna och lägger var och en i en av två grupper — {A_DEF} eller {B_DEF}. Det avgör vid varje bild vad som hör ihop. Ni kan fundera tillsammans: ”Vilken grupp hör den till?” Beröm varje placering, även när ditt barn behöver tänka en stund. Det finns ingen tidsgräns och inga poäng — bara titta, jämföra och sortera i er egen takt.',
  'Slå er ner tillsammans i lugn och ro och titta på de blandade bilderna. Ditt barn sorterar dem i två grupper: {A_DEF} på den ena sidan, {B_DEF} på den andra. Fråga gärna: ”Vad har de här sakerna gemensamt?” Så lär sig ditt barn att känna igen och jämföra kännetecken. Ingenting räknas — det handlar bara om vad som är samma sort. Helt utan press, med mycket tålamod och beröm.',
  'Den här övningen är härligt enkel: titta på bilden, fundera, lägg i rätt grupp. Ditt barn skiljer {A_DEF} från {B_DEF} och placerar varje bild där den hör hemma. Du kan följa med genom att fundera tillsammans på vad som hör ihop. Råkar något hamna i fel grupp är det inget problem — ni tittar bara en gång till. Inget räknande, inget stoppur, bara lugnt sorterande och klassificerande.',
  'Låt ditt barn arbeta i sin egen takt. Det tittar på varje bild och bestämmer om den hör till {A_DEF} eller till {B_DEF}. När det sorterar befäster det att klassificera — en viktig förskoleförmåga. Ställ gärna små frågor: ”Varför passar den här?” Då blir sorteringen ett litet samtal. Här handlar det aldrig om att räkna, utan alltid om vilka saker som hör ihop och bildar en grupp.',
  'Gör det lätt och fint för er: ditt barn tittar, jämför och sorterar. Det delar in de blandade bilderna i två sorter — {A_DEF} och {B_DEF}. Varje bild får sin plats i rätt grupp. Beröm hjälper mer än rättelser, så fira varje rätt placering. Det finns inga poäng och ingen tid som rinner ut — bara det lugna ordnandet efter kännetecken, helt utan att räkna.',
  'Ditt barn övar här på att titta noga: vilka bilder hör till {A_DEF}, vilka hör till {B_DEF}? Bild för bild grupperar det varje motiv i sin grupp. Ni kan fundera tillsammans på vad som förenar sakerna i en grupp. Så växer en känsla för kategorier och kännetecken fram. Den här sorteringsuppgiften klarar sig helt utan siffror — det enda som gäller är vad som hör ihop, inte hur stort något är.',
  'En lugn syssla för en stund: ditt barn tar sig an de blandade bilderna och sorterar dem i två grupper. {A_DEF} läggs ihop, {B_DEF} läggs ihop. Följ med med vänliga frågor och mycket beröm. Skulle något bli förväxlat tittar ni bara i lugn och ro en gång till. Ingen tidspress, inget räknande — bara titta och sortera, inte räkna, helt i ditt barns takt.',
  'Börja med att titta på bladet tillsammans: bilderna ligger blandade, och uppgiften är att lägga var och en i rätt grupp. Ditt barn skiljer {A_DEF} från {B_DEF} och placerar varje bild där den hör hemma. Prata gärna om vad sakerna i en grupp har gemensamt — så blir sorterandet ett litet samtal om likheter. Hamnar något fel tittar ni bara en gång till, helt utan stress. Här gäller inget stoppur och inga poäng, bara lugnt ordnande efter vad som hör ihop.',
  'Sätt er bekvämt och låt ditt barn leda. Det väljer en bild, funderar en stund och lägger den hos {A_DEF} eller hos {B_DEF}. Du kan stötta med små frågor som ”Vad tror du att den här hör till?” Varje placering förtjänar beröm, även de som tar lite längre tid. Det handlar aldrig om att räkna här, bara om att känna igen vad som är samma sort och dela in i två grupper i ditt barns egen takt.',
  'Den här delen är som en lugn lek: ditt barn tittar, jämför och sorterar. Bilderna delas in i två sorter — {A_DEF} på ett ställe och {B_DEF} på ett annat. Följ med och fundera tillsammans på vad som gör att en bild passar i sin grupp. Misstag är inget att oroa sig för; ni rättar bara mjukt och tittar igen. Ingen tid rinner ut och ingenting räknas — det enda som gäller är glädjen i att ordna tillsammans.',
  'Låt ditt barn ta en bild i taget och bestämma: hör den till {A_DEF} eller till {B_DEF}? Steg för steg växer två tydliga grupper fram på bladet. Du kan göra det till ett samtal genom att fråga varför en bild passar där den passar. Så övar ditt barn att klassificera utan att det känns som en uppgift. Här är det aldrig fråga om att räkna, utan alltid om vilka saker som hör ihop — i lugn takt och med gott om uppmuntran.',
  'Ta fram bladet och titta på röran tillsammans: nu ska allt få sin plats. Ditt barn lägger varje bild i rätt grupp — {A_DEF} samlas på ett ställe och {B_DEF} på ett annat. Stötta gärna med en lugn fråga: ”Vad är det som gör att de här hör ihop?” Så blir sorterandet både en lek och ett litet samtal om likheter. Blir det fel någon gång tittar ni bara mjukt en gång till. Ingen tid som rinner ut, inget räknande — bara titta och sortera, inte räkna, i ditt barns egen takt.',
];
const P3 = 'När ditt barn flitigt har sorterat {A_DEF} och {B_DEF} i sina grupper får du vara riktigt stolt — för att sortera och klassificera är en äkta förmåga inför skolan. Med varje bild som hamnar i rätt grupp övar ditt barn på att titta noga, jämföra och ordna. Vill ni fortsätta? I vår kostnadsfria förskolesamling finns många fler sorteringsblad med de mest olika bilderna — alltid att titta och sortera, aldrig att räkna. Välj nästa blad tillsammans med ditt barn och njut av den lugna stunden vid sorterandet. Beröm och tålamod är den finaste belöningen. Mycket nöje med att sortera!';

function gcd(a, b) { while (b) { const t = a % b; a = b; b = t; } return a; }
function coprimeStride(cells) { let k = Math.max(2, Math.round(cells * 0.6180339887)); for (let d = 0; d < cells; d++) for (const cand of [k + d, k - d]) if (cand > 1 && cand < cells && gcd(cand, cells) === 1) return cand; return 1; }
function cellAssign(i, S, P) { const cells = S * P, stride = coprimeStride(cells); const c = ((i % cells) * stride) % cells; return { skel: c % S, p2: Math.floor(c / S) % P }; }

const list = COORDS.slice().sort((a, b) => a.pairKey < b.pairKey ? -1 : 1);
const cells = SKEL.length * P2.length;
console.log('  ' + (cells > list.length ? '[invariant OK]' : '[invariant: cells<pairs -> coprime bijection wraps via i%cells]') + ' picture-sort: ' + SKEL.length + 'x' + P2.length + '=' + cells + ' vs pairs ' + list.length);

const out = []; let blocked = 0;
list.forEach((co, i) => {
  const L = THEMES[co.left], R = THEMES[co.right];
  if (!L || !R) { console.log('NO COPY DATA for ' + co.pairKey); blocked++; return; }
  const cell = cellAssign(i, SKEL.length, P2.length);
  const vals = {
    A_PL: L.plIndef, B_PL: R.plIndef,
    A_DEF: L.plDef, B_DEF: R.plDef,
    A_H1: L.h1Display, B_H1: R.h1Display,
  };
  const entry = {
    slug: co.canonical,
    variantShape: co.siblings.length > 1 ? 'collapsed' : 'singleton',
    coordinate: { type: 'picture-sort', mode: null, theme: co.pairKey, level: 'forskola' },
    eyebrow: 'Arbetsblad: Bildsortering',
    h1: 'Sortera bilder: ' + L.h1Display + ' och ' + R.h1Display + ' – arbetsblad för förskolan',
    strand: 'Visuell perception och logiskt tänkande',
    slotTokens: [L.plIndef, R.plIndef, L.h1Display, R.h1Display, co.left.replace(/_/g, ' '), co.right.replace(/_/g, ' '), 'forskola', 'sortera'],
    p1: render2(SKEL[cell.skel], vals),
    p2: render2(P2[cell.p2], vals),
    p3: render2(P3, vals),
    canonicalDeckSlug: co.canonical,
    carousel: [1, 2, 5, 11].map(off => {
      const n = list[(i + off) % list.length];
      const nL = THEMES[n.left], nR = THEMES[n.right];
      return { label: 'Bildsortering: ' + nL.h1Display + ' och ' + nR.h1Display, href: n.canonical };
    }),
  };
  if (co.n > 1) entry.collapseSiblings = co.siblings;
  out.push(entry);
});

const cur = JSON.parse(fs.readFileSync(SV, 'utf8'));
const keep = cur.landings.filter(l => !(l.coordinate && l.coordinate.type === 'picture-sort'));
const merged = { _note: cur._note, landings: keep.concat(out) };
fs.writeFileSync(SV, JSON.stringify(merged, null, 2) + '\n');
console.log('generated ' + out.length + ' picture-sort landings (blocked ' + blocked + '); sv.json total ' + merged.landings.length);

// ===== audit: >=200 words, 0 digits in BODY (h1 display labels like "4 juli"/"Fåglar 2" are taxonomy-
// allowed per sv-render A3), no `standard` key, BOTH themes' nouns present, no count-FRAMING leak.
// FENCE: count-framing as an INSTRUCTION is forbidden; the negated/anti-count divergence is the only allowed
// use of any count word ("inte räkna", "ingenting räknas", "inte hur stort något är"). Every räkna/räknas
// occurrence and every "hur stort/många" must sit inside a negation window.
const FENCE_HARD = ['hur många', 'antal', 'diagram']; // count-framing tokens forbidden even negated
function inNegationWindow(lc, idx) {
  // negator BEFORE: "inte/aldrig/utan ... räkna", "ingenting/inget/ingen ... räkna(s)"
  const pre = lc.slice(Math.max(0, idx - 28), idx);
  if (/(inte|aldrig|utan|ingen|inget|ingenting)\b[^.!?]*$/.test(pre)) return true;
  // negator AFTER (Swedish V2 inversion): "här räknas ingenting", "man räknar aldrig", "räknar ingen"
  const post = lc.slice(idx, idx + 24);
  return /^räkn\w*[^.!?]*\b(inte|aldrig|ingen|inget|ingenting)\b/.test(post);
}
let short = 0, fence = 0, hasStd = 0, missNoun = 0, dig = 0;
out.forEach(e => {
  const body = e.p1 + ' ' + e.p2 + ' ' + e.p3;
  const lc = body.toLowerCase();
  const w = body.split(/\s+/).filter(Boolean).length;
  if (w < 200) { short++; console.log('  SHORT ' + e.slug + ': ' + w); }
  if (/[0-9]/.test(body)) { dig++; console.log('  BODY-DIGIT ' + e.slug); } // h1 excluded: display labels may carry digits
  if ('standard' in e) { hasStd++; console.log('  HAS-STANDARD ' + e.slug); }
  // FENCE: hard count-framing tokens are forbidden outright
  FENCE_HARD.forEach(f => { if (lc.includes(f)) { fence++; console.log('  FENCE-LEAK "' + f + '" ' + e.slug); } });
  // any "räkna*" or "räknas" must sit in a negation window (the sort-not-count divergence)
  let p = 0, m;
  while ((m = lc.indexOf('räkn', p)) >= 0) {
    if (!inNegationWindow(lc, m)) { fence++; console.log('  RÄKNA-NOT-NEGATED ' + e.slug + ' @"' + lc.slice(Math.max(0, m - 18), m + 8).trim() + '"'); }
    p = m + 4;
  }
  // "hur stort" allowed only negated ("inte hur stort något är")
  let h = lc.indexOf('hur stort');
  if (h >= 0 && !inNegationWindow(lc, h)) { fence++; console.log('  HUR-STORT-NOT-NEGATED ' + e.slug); }
  const co = COORDS.find(c => c.canonical === e.slug);
  const Lkey = THEMES[co.left].plIndef.toLowerCase();
  const Rkey = THEMES[co.right].plIndef.toLowerCase();
  const Ldef = THEMES[co.left].plDef.toLowerCase();
  const Rdef = THEMES[co.right].plDef.toLowerCase();
  const hasL = lc.includes(Lkey) || lc.includes(Ldef);
  const hasR = lc.includes(Rkey) || lc.includes(Rdef);
  if (!hasL || !hasR) { missNoun++; console.log('  MISSING-THEME-NOUN ' + e.slug + ' (L:' + hasL + ' R:' + hasR + ')'); }
});
console.log(
  (short ? short + ' short' : 'all >=200 words') + ' | ' +
  (dig ? dig + ' DIGITS' : '0 digits') + ' | ' +
  (hasStd ? hasStd + ' HAS-STANDARD' : 'all readiness (no standard)') + ' | ' +
  (missNoun ? missNoun + ' missing-theme-noun' : 'both-themes nouns present') + ' | ' +
  (fence ? fence + ' FENCE-LEAK' : 'no count-framing leak')
);
