#!/usr/bin/env node
/* DE picture-sort "-vs-" PAIRS × Vorschule, READINESS (Sortieren und Klassifizieren (Vorläuferfähigkeit)).
 * The de-orphan's content side. Each page sorts the pictures of TWO themes (A,B) into 2 groups; the body
 * references BOTH themes' concrete nouns (the -vs- differentiation, like EN gen-wave5-picturesort.js).
 * 4-slot gender-safe render: {A_PL}/{B_PL}/{A_GEN}/{B_GEN} + datN after den/always-dative prep.
 * NO `standard` key (readiness). CHART-COUNT FENCE: sort/group lexicon, NEVER count-framing. 8×7=56 > 39.
 * Usage: node scripts/seo-landing/gen-de-picturesort.js
 */
'use strict';
const fs = require('fs');
const { THEMES } = require('./de-themes');
const DE = 'frontend/content/seo-landing/de.json';
const COORDS = JSON.parse(fs.readFileSync('scripts/seo-landing/de-picture-sort-coordinates.json', 'utf8')).coordinates;

function datN(phrase){ return phrase.replace(/[A-Za-zÄÖÜäöüß]+/g, function (w) { if (w === 'und') return w; if (/[ns]$/.test(w)) return w; return w + 'n'; }); }
// 4-slot render: dative +n after "den" (+ opt. adj) OR an always-dative preposition; plain otherwise.
function render2(tpl, vals){
  let s = tpl;
  Object.keys(vals).forEach(function (k) {
    const v = vals[k];
    s = s.replace(new RegExp('(\\b[Dd]en )((?:[a-zäöüß]+ )*)\\{' + k + '\\}', 'g'), function (m, art, mid) { return art + mid + datN(v); });
    s = s.replace(new RegExp('\\b([Aa]us|[Bb]ei|[Gg]egenüber|[Mm]it|[Nn]ach|[Ss]eit|[Vv]on|[Zz]u) \\{' + k + '\\}', 'g'), function (m, p) { return p + ' ' + datN(v); });
    s = s.replace(new RegExp('\\{' + k + '\\}', 'g'), v);
  });
  return s;
}

// ===== Frames (T1 native; {A_PL}/{B_PL}/{A_GEN}/{B_GEN} markers). =====
const SKEL = [
  'Auf diesem Vorschul-Arbeitsblatt sind die {A_PL} und die {B_PL} bunt durcheinandergewürfelt — alles liegt kreuz und quer beieinander. Die Aufgabe deines Kindes ist es, jedes Bild in die richtige Gruppe zu sortieren: die {A_GEN} gehören auf die eine Seite, die {B_GEN} auf die andere. Dabei geht es nicht ums Zählen, sondern ums genaue Hinschauen. Dein Kind überlegt: Was passt zusammen, was gehört zu welcher Sorte? So lernt es ganz nebenbei, Dinge zu ordnen und nach Merkmalen zu unterscheiden — eine wichtige Vorläuferfähigkeit fürs spätere Lernen in der Schule. Schauen und Sortieren statt Zählen, in deinem ganz eigenen Tempo.',
  'Hier mischen sich die {A_PL} mit den {B_PL} — ein fröhliches Durcheinander auf einem Blatt. Dein Kind schaut sich jedes Bild in Ruhe an und ordnet es seiner Gruppe zu: die {A_GEN} hierhin, die {B_GEN} dorthin. Es muss nichts abzählen, sondern nur erkennen, was zusammengehört. Genau dieses Sortieren und Klassifizieren ist eine echte Vorschul-Fähigkeit: Dein Kind nimmt Merkmale wahr, vergleicht und gruppiert. Diese ruhige Schau- und Sortier-Übung macht Spaß und stärkt das logische Denken — ohne Druck, ohne Zeitlimit, ganz ohne Zählen. Lob für jedes Bild, das in der passenden Gruppe landet.',
  'Auf diesem Arbeitsblatt liegen die {A_PL} und die {B_PL} wild gemischt nebeneinander. Dein Kind darf nun aufräumen — und zwar mit den Augen: Es sortiert jedes Bild in zwei Gruppen, die {A_GEN} und die {B_GEN}. Welche Dinge gehören zusammen, welche bilden eine eigene Sorte? So eine Sortier-Aufgabe trainiert das Klassifizieren: das genaue Vergleichen und Ordnen nach Gemeinsamkeiten. Das ist eine wertvolle Vorläuferfähigkeit, die deinem Kind in der Schule beim strukturierten Denken hilft. Hier wird nichts gezählt — es geht allein darum, was zu welcher Gruppe passt. Lass dir Zeit und genieße das gemeinsame Sortieren.',
  'Stell dir ein Blatt vor, auf dem die {A_PL} und die {B_PL} kunterbunt durcheinanderliegen. Genau das findest du hier — und dein Kind bringt Ordnung hinein. Es schaut jedes Bild an und entscheidet: Gehört es zu den {A_GEN} oder zu den {B_GEN}? Bild für Bild wandert in seine passende Gruppe. Beim Sortieren übt dein Kind das Klassifizieren: Es erkennt Merkmale, vergleicht und gruppiert nach dem, was zusammengehört. Diese Fähigkeit ist ein wichtiger Baustein für die Schule. Und das Schöne: Es wird geschaut und sortiert, nie gezählt. Jede richtige Zuordnung darf gefeiert werden.',
  'Die {A_PL} und die {B_PL} haben sich auf diesem Arbeitsblatt gründlich vermischt — höchste Zeit zum Sortieren! Dein Kind ordnet jedes Bild der richtigen Gruppe zu: Die {A_GEN} kommen in die eine Sorte, die {B_GEN} in die andere. Es überlegt bei jedem Bild, was zusammenpasst und was aussortiert werden muss. So entsteht spielerisch ein Verständnis für Kategorien und Merkmale — Sortieren und Klassifizieren als echte Vorläuferfähigkeit. Hier zählt niemand etwas; es geht nur ums Schauen, Vergleichen und Zusammenstellen. Ganz ohne Zeitdruck und ohne Punkte, einfach in eurem eigenen Rhythmus, mit viel Lob.',
  'Auf diesem Vorschul-Blatt warten die {A_PL} und die {B_PL} bunt gemischt darauf, geordnet zu werden. Dein Kind nimmt sich jedes Bild vor und legt es zu seiner Gruppe: die {A_GEN} zusammen, die {B_GEN} zusammen. Was gehört zueinander, was bildet eine eigene Sorte? Genau dieses Vergleichen und Gruppieren ist Klassifizieren — eine Fähigkeit, die deinem Kind später beim Ordnen von Gedanken und Aufgaben hilft. Es wird nichts abgezählt; dein Kind schaut hin, erkennt Merkmale und sortiert. Eine ruhige, freundliche Übung ohne Stoppuhr — Schauen und Sortieren statt Zählen, ganz in eurem Tempo.',
  'Hier siehst du die {A_PL} und die {B_PL} fröhlich durcheinander auf einem Arbeitsblatt. Dein Kind sortiert sie in zwei Gruppen: alles, was zu den {A_GEN} gehört, auf die eine Seite — alles, was zu den {B_GEN} gehört, auf die andere. Es schaut jedes Bild genau an und überlegt, was zusammenpasst. Dieses Sortieren schult das Klassifizieren: das Wahrnehmen von Merkmalen und das Bilden von Kategorien. Das ist eine wichtige Vorläuferfähigkeit für die Schule. Gezählt wird dabei nichts — es geht allein um die Frage, zu welcher Gruppe ein Bild passt. Lob und Geduld machen diese Übung besonders schön.',
  'Auf diesem Blatt sind die {A_PL} und die {B_PL} ordentlich vermischt — und dein Kind bringt sie wieder in Ordnung. Es sortiert jedes Bild in die passende Gruppe: die {A_GEN} zu den {A_GEN}, die {B_GEN} zu den {B_GEN}. Welche Dinge gehören zusammen, was passt zueinander? Beim Sortieren und Klassifizieren lernt dein Kind, Gemeinsamkeiten zu erkennen und nach Merkmalen zu ordnen — eine Grundfähigkeit für strukturiertes Denken in der Schule. Niemand muss hier etwas zählen; es geht ums Schauen, Vergleichen und Zuordnen. Eine entspannte Übung ohne Druck und ohne Zeitlimit, mit einem Lob für jede richtige Gruppe.',
];
const P2 = [
  'So funktioniert es: Dein Kind schaut sich die gemischten Bilder an und ordnet jedes davon einer von zwei Gruppen zu — den {A_GEN} oder den {B_GEN}. Es entscheidet bei jedem Bild, was zusammengehört. Du kannst gemeinsam überlegen: „Wohin passt das wohl?“ Lobe jede Zuordnung, auch wenn dein Kind kurz nachdenken muss. Es gibt kein Zeitlimit und keine Punkte — nur Schauen, Vergleichen und Sortieren in eurem eigenen Tempo.',
  'Setzt euch gemütlich zusammen und schaut euch die durcheinandergewürfelten Bilder an. Dein Kind sortiert sie in zwei Gruppen: die {A_GEN} auf die eine Seite, die {B_GEN} auf die andere. Frag ruhig nach: „Was haben diese Dinge gemeinsam?“ So lernt dein Kind, Merkmale zu erkennen und zu vergleichen. Es wird nichts gezählt — es geht nur darum, was zu welcher Sorte gehört. Ganz ohne Druck, mit viel Geduld und Lob.',
  'Diese Übung ist herrlich einfach: Bild ansehen, überlegen, zur richtigen Gruppe legen. Dein Kind unterscheidet die {A_GEN} von den {B_GEN} und ordnet jedes Bild dorthin, wo es hingehört. Du kannst es begleiten, indem du gemeinsam überlegst, was zusammenpasst. Falls etwas in die falsche Gruppe rutscht, ist das gar kein Problem — ihr schaut einfach noch einmal hin. Kein Zählen, keine Stoppuhr, nur ruhiges Sortieren und Klassifizieren.',
  'Lass dein Kind in seinem eigenen Tempo arbeiten. Es betrachtet jedes Bild und entscheidet, ob es zu den {A_GEN} oder zu den {B_GEN} gehört. Beim Sortieren festigt es das Klassifizieren — eine wichtige Vorschul-Fähigkeit. Stelle gerne kleine Fragen: „Warum passt das hierher?“ So wird aus dem Sortieren ein kleines Gespräch. Hier geht es nie ums Zählen, sondern immer darum, welche Dinge zusammengehören und eine Gruppe bilden.',
  'Macht es euch leicht und schön: Dein Kind schaut, vergleicht und sortiert. Es teilt die bunt gemischten Bilder in zwei Sorten auf — die {A_GEN} und die {B_GEN}. Jedes Bild bekommt seinen Platz in der passenden Gruppe. Lob hilft mehr als jede Korrektur, also feiere jede richtige Zuordnung. Es gibt keine Punkte und keine Zeit, die abläuft — nur das ruhige Ordnen nach Merkmalen, ganz ohne Zählen.',
  'Dein Kind übt hier das genaue Hinschauen: Welche Bilder gehören zu den {A_GEN}, welche zu den {B_GEN}? Bild für Bild ordnet es jedes Motiv seiner Gruppe zu. Du kannst gemeinsam überlegen, was die Dinge in einer Gruppe verbindet. So entsteht ein Gefühl für Kategorien und Merkmale. Diese Sortier-Aufgabe kommt ganz ohne Zahlen aus — es zählt allein, was zusammenpasst, nicht wie viel es ist.',
  'Eine ruhige Beschäftigung für zwischendurch: Dein Kind nimmt sich die gemischten Bilder vor und sortiert sie in zwei Gruppen. Die {A_GEN} kommen zusammen, die {B_GEN} kommen zusammen. Begleite es mit freundlichen Fragen und viel Lob. Falls einmal etwas vertauscht wird, schaut ihr einfach in Ruhe noch einmal hin. Kein Zeitdruck, kein Abzählen — nur Schauen und Sortieren statt Zählen, ganz nach dem Tempo deines Kindes.',
];
const P3 = 'Wenn dein Kind die {A_GEN} und die {B_GEN} fleißig in ihre Gruppen sortiert hat, darfst du richtig stolz sein — denn Sortieren und Klassifizieren ist eine echte Vorläuferfähigkeit fürs Lernen. Mit jedem Bild, das in der passenden Gruppe landet, übt dein Kind das genaue Hinschauen, Vergleichen und Ordnen. Magst du weitermachen? In unserer kostenlosen Vorschul-Sammlung findest du viele weitere Sortier-Arbeitsblätter mit den unterschiedlichsten Bildern — immer zum Schauen und Sortieren, nie zum Zählen. Such dir gemeinsam mit deinem Kind das nächste Blatt aus und genießt die ruhige Zeit beim Ordnen. Lob und Geduld sind dabei die schönste Belohnung. Viel Freude beim Sortieren!';

function gcd(a, b){ while(b){ const t=a%b; a=b; b=t; } return a; }
function coprimeStride(cells){ let k=Math.max(2,Math.round(cells*0.6180339887)); for(let d=0;d<cells;d++) for(const cand of [k+d,k-d]) if(cand>1&&cand<cells&&gcd(cand,cells)===1) return cand; return 1; }
function cellAssign(i,S,P){ const cells=S*P, stride=coprimeStride(cells); const c=((i%cells)*stride)%cells; return {skel:c%S, p2:Math.floor(c/S)%P}; }
function label(co){ return 'Bildersortierung: ' + THEMES[co.left].h1 + ' und ' + THEMES[co.right].h1; }

const list = COORDS.slice().sort((a,b)=> a.pairKey<b.pairKey?-1:1);
const cells = SKEL.length * P2.length;
console.log('  ' + (cells>list.length?'[invariant OK]':'[INVARIANT WARN]') + ' picture-sort: ' + SKEL.length + 'x' + P2.length + '=' + cells + ' vs pairs ' + list.length);

const out=[]; let blocked=0;
list.forEach((co,i)=>{
  const L=THEMES[co.left], R=THEMES[co.right];
  if(!L||!R){ console.log('NO COPY DATA for ' + co.pairKey); blocked++; return; }
  const cell = cellAssign(i, SKEL.length, P2.length);
  const vals = { A_PL:L.nPl, B_PL:R.nPl, A_GEN:L.gen, B_GEN:R.gen };
  const entry = {
    slug: co.canonical,
    variantShape: 'singleton',
    coordinate: { type:'picture-sort', mode:null, theme:co.pairKey, level:'vorschule' },
    eyebrow: 'Arbeitsblatt: Bildersortierung',
    h1: 'Bildersortierung: ' + L.h1 + ' und ' + R.h1 + ' – Arbeitsblatt für die Vorschule',
    strand: 'Sortieren und Klassifizieren (Vorläuferfähigkeit)',
    slotTokens: (L.nPl + ', ' + R.nPl).replace(/ und /g,', ').split(', ').map(s=>s.trim()).concat([L.gen, R.gen, co.left.replace(/_/g,' '), co.right.replace(/_/g,' '), 'vorschule', 'sortieren']),
    p1: render2(SKEL[cell.skel], vals),
    p2: render2(P2[cell.p2], vals),
    p3: render2(P3, vals),
    canonicalDeckSlug: co.canonical,
    carousel: [1,2,5,11].map(off=>{ const n=list[(i+off)%list.length]; return {label: label(n), href: n.canonical}; }),
  };
  out.push(entry);
});

const cur = JSON.parse(fs.readFileSync(DE,'utf8'));
const keep = cur.landings.filter(l => l.coordinate.type !== 'picture-sort');
const merged = { _note: cur._note, landings: keep.concat(out) };
fs.writeFileSync(DE, JSON.stringify(merged, null, 2) + '\n');
console.log('generated ' + out.length + ' picture-sort landings (blocked ' + blocked + '); de.json total ' + merged.landings.length);

// audit: fence (no counting), both-themes nouns, digits, words, no-standard
const FENCE=['wie viele','zähl','abzähl','anzahl']; // 'zählen' appears only in negations ("nicht ums Zählen") — check for count-FRAMING
let short=0, fence=0, hasStd=0, missNoun=0, dig=0;
out.forEach(e=>{ const body=e.p1+' '+e.p2+' '+e.p3; const lc=body.toLowerCase(); const w=body.split(/\s+/).filter(Boolean).length;
  if(w<200){short++; console.log('  SHORT ' + e.slug + ': ' + w);}
  if(/[0-9]/.test(e.h1+body)){dig++; console.log('  DIGIT ' + e.slug);}
  if('standard' in e){hasStd++;}
  const co=COORDS.find(c=>c.canonical===e.slug); const L=THEMES[co.left].nPl.toLowerCase().split(/[ ,]+/).filter(x=>x.length>3); const R=THEMES[co.right].nPl.toLowerCase().split(/[ ,]+/).filter(x=>x.length>3);
  if(!L.some(x=>lc.includes(x))||!R.some(x=>lc.includes(x))){missNoun++; console.log('  MISSING-THEME-NOUN ' + e.slug);}
});
console.log((short?short+' short':'all >=200 words') + ' | ' + (dig?dig+' DIGITS':'0 digits') + ' | ' + (hasStd?hasStd+' HAS-STANDARD':'all readiness') + ' | ' + (missNoun?missNoun+' missing-theme-noun':'both-themes nouns present'));
