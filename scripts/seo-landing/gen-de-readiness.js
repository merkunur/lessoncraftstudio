#!/usr/bin/env node
/* Generic DE readiness landing generator — STEP 2 bulk engine.
 * Config-driven: reads a per-type config (de-readiness-<type>.js) + de-<type>-coordinates.json + de-themes
 * + the shared de-render (datN/render). READINESS: no `standard`, no educationalAlignment; raw l.strand =
 * the §6 Vorläuferfähigkeit label; level='vorschule'. Gender-safe plural-only frames; 8×7 coprime cells.
 *
 * Config shape (de-readiness-<type>.js):
 *   { type, eyebrow, strand, slotWord, modes:{'<modeKey>':{SKEL:[..8],P2:[..7]}}, P3,
 *     h1:(modeKey,nplDat)=>string, carousel:(modeKey,themeH1)=>string }
 *   modeKey 'null' = the null exerciseMode.
 *
 * Usage: node scripts/seo-landing/gen-de-readiness.js --type=grid-match
 */
'use strict';
const fs = require('fs');
const { THEMES } = require('./de-themes');
const { datN, render } = require('./de-render');
const { validateCoordinate } = require('./validity-gate');

const argv = process.argv.slice(2);
const arg = (k, d) => { const a = argv.find(s => s.indexOf('--' + k + '=') === 0); return a ? a.slice(k.length + 3) : d; };
const TYPE = arg('type', null);
if (!TYPE) { console.error('--type required'); process.exit(1); }
const cfg = require('./de-readiness-' + TYPE);
const DE = 'frontend/content/seo-landing/de.json';
const COORDS = JSON.parse(fs.readFileSync('scripts/seo-landing/de-' + TYPE + '-coordinates.json', 'utf8')).coordinates;

function gcd(a, b){ while(b){ const t=a%b; a=b; b=t; } return a; }
function coprimeStride(cells){ let k = Math.max(2, Math.round(cells * 0.6180339887)); for (let d=0; d<cells; d++) for (const cand of [k+d, k-d]) if (cand>1 && cand<cells && gcd(cand,cells)===1) return cand; return 1; }
function cellAssign(i, S, P){ const cells = S*P, stride = coprimeStride(cells); const c = ((i % cells) * stride) % cells; return { skel: c % S, p2: Math.floor(c / S) % P }; }

function p3de(gen, nb1, nb2){
  return cfg.P3.replace(/mit den \{NB2\}/g, 'mit den ' + datN(nb2)).replace(/\{NB1\}/g, nb1).replace(/\{NB2\}/g, nb2).replace(/\{GEN\}/g, gen);
}

const modeKey = (m) => (m === null ? 'null' : m);
const onlyArg = arg('only', null);
const MODES = onlyArg ? [onlyArg] : Object.keys(cfg.modes);

function buildMode(mk){
  const wantMode = (mk === 'null') ? null : mk;
  const raw = COORDS.filter(c => modeKey(c.mode) === mk).slice().sort((a,b)=> a.theme<b.theme?-1:1);
  const dropped=[]; let blocked=0;
  const list = raw.filter(co=>{
    if(!THEMES[co.theme]){ console.log('NO COPY DATA for theme ' + co.theme + ' (' + mk + ')'); blocked++; return false; }
    const v = validateCoordinate(TYPE, wantMode, co.theme, {});
    if(!v.valid){ dropped.push(co.theme); blocked++; return false; }
    return true;
  });
  const sk = cfg.modes[mk].SKEL, p2 = cfg.modes[mk].P2, cells = sk.length*p2.length;
  console.log('  ' + (cells>list.length?'[invariant OK]':'[INVARIANT WARN]') + ' ' + TYPE + '/' + mk + ': cells ' + sk.length + 'x' + p2.length + '=' + cells + ' vs themes ' + list.length);
  const out=[];
  list.forEach((co,i)=>{
    const d = THEMES[co.theme];
    const c = cellAssign(i, sk.length, p2.length);
    const nb1 = list[(i+1)%list.length], nb2 = list[(i+7)%list.length];
    const entry = {
      slug: co.canonical,
      variantShape: co.siblings.length>1 ? 'collapsed' : 'singleton',
      coordinate: { type:TYPE, mode: wantMode, theme:co.theme, level: co.level || cfg.level || 'vorschule' },
      eyebrow: cfg.eyebrow,
      h1: cfg.h1(mk, datN(d.nPl), co.level || cfg.level),
      strand: (typeof cfg.strand === 'function' ? cfg.strand(mk, co.level || cfg.level) : cfg.strand),
      slotTokens: d.nPl.replace(/ und /g,', ').split(', ').map(s=>s.trim()).concat([d.gen, co.theme.replace(/_/g,' '), (co.level || cfg.level || 'vorschule'), cfg.slotWord]),
      p1: render(sk[c.skel], d.nPl, d.gen),
      p2: render(p2[c.p2], d.nPl, d.gen),
      p3: p3de(d.gen, THEMES[nb1.theme].gen, THEMES[nb2.theme].gen),
      canonicalDeckSlug: co.canonical,
      carousel: [1,2,5,11].map(off=>{ const n=list[(i+off)%list.length]; return {label: cfg.carousel(mk, THEMES[n.theme].h1), href: n.canonical}; }),
    };
    if (co.siblings.length>1) entry.collapseSiblings = co.siblings;
    // optional CCSS standard (framework-bearing types); omitted entirely for readiness/no-standard types.
    if (cfg.standard) entry.standard = (typeof cfg.standard === 'function' ? cfg.standard(mk, co.level || cfg.level) : cfg.standard);
    out.push(entry);
  });
  if (dropped.length) console.log('  dropped ' + dropped.length + ': ' + dropped.join(', '));
  return {out, blocked};
}

let generated=[], blockedTotal=0;
MODES.forEach(m=>{ const r=buildMode(m); generated=generated.concat(r.out); blockedTotal+=r.blocked; });

let cur = { _note: 'DE landing copy.', landings: [] };
try { cur = JSON.parse(fs.readFileSync(DE,'utf8')); } catch (e) {}
const keep = (cur.landings||[]).filter(l => l.coordinate.type!==TYPE);
const merged = { _note: cur._note, landings: keep.concat(generated) };
fs.writeFileSync(DE, JSON.stringify(merged, null, 2) + '\n');
console.log('generated ' + generated.length + ' (' + TYPE + ', modes ' + MODES.join('+') + '); blocked ' + blockedTotal + '; de.json total ' + merged.landings.length);

// gender-lint: flag "ein/eine <Cap>" not in the broad frame-noun whitelist (a slotted theme noun singular = FAIL).
const WHITE = /^(Bild|Bilder|Reihe|Muster|Gruppe|Dreiergruppe|Vierergruppe|Regel|Einheit|Reihenfolge|Takt|Rhythmus|Wechsel|Echo|Auftakt|Klang|Nachklang|Päckchen|Viererschritt|Denkschritt|Sequenz|Baustein|Grundfähigkeit|Vorübung|Vorbereitung|Erfolgserlebnis|Gespür|Vorläuferfähigkeit|Fortschritt|Schritt|Hin|Auge|Kind|Tempo|Ordnung|Motiv|Druck|Wertung|Wettbewerb|Vorschul|Anfang|Sammlung|Online|Übung|Übungsblatt|Vorlage|Druckvorlage|Blatt|Gitter|Bildgitter|Feld|Quadrat|Stelle|Lücke|Teil|Ganzes|Reihe|Hälfte|Auswahl|Beobachter|Karte|Spiel|Runde|Marker|Knopf|Stein|Kreuz|Wegweiser|Anker|Klassiker|Stift|Detail|Wort|Wortschatz|Bingo|Schauen|Beziehung|Welt|Halt|Sicht|Sache|Idee|Klick|Familie|Treffer|Entdeckerfreude|Spielprinzip|Spielzeit|Bilderwelt|Möglichkeit|Frage|Versuch|Variante|Version|Zeile|Aufgabe|Prinzip|Moment|Küchentisch|Schulalltag|Schulstart|Selbstvertrauen|Zutrauen|Können|Beschäftigung|Konzentration|Geduld|Ausdauer|Leistung|Fähigkeit|Ziel|Grundlage|Sprachübung|Entdeckungsreise|Rätsel|Rechenrätsel|Knobelaufgabe|Schlüssel|Code|Buchstabe|Lösungswort|Geheimnis|Überraschung|Schatzsuche|Hinweis|Rätsellöser|Detektiv|Sieg|Erfolg|Rechnung|Miete|Aha|Rätselfieber|Mengen|Zahlen|Zahl|Ziffer|Anzahl|Summe|Kopf|Stück|Symbol|Zahlsymbol|Gedanke|Begreifen|Antwort|Gewand|Neugier|Anhaltspunkt|Bedeutung|Schreibweise|Zahlverständnis|Zahlgefühl|Zahlenraum)$/;
let lintFail=0;
generated.forEach(e=>{
  const text = e.h1 + ' ' + e.p1 + ' ' + e.p2 + ' ' + e.p3;
  (text.match(/\b(ein|eine)\s+([A-ZÄÖÜ][a-zäöüß]+)/g) || []).forEach(hit=>{
    const noun = hit.split(/\s+/)[1];
    if(WHITE.test(noun)) return;
    console.log('  GENDER-LINT ? ' + e.slug + ' :: "' + hit + '"'); lintFail++;
  });
});
console.log(lintFail? ('gender-lint: ' + lintFail + ' to eyeball') : 'gender-lint: clean');
let short=0; generated.forEach(e=>{const w=(e.p1+' '+e.p2+' '+e.p3).split(/\s+/).filter(Boolean).length; if(w<200){short++; if(short<=12)console.log('  SHORT ' + e.slug + ': ' + w);}});
console.log(short? (short+' short (<200)') : ('all ' + generated.length + ' >=200 words'));
