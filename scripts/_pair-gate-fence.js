/* Throwaway fence for TOOL #53 noun candidates.
   Builds a per-locale corpus of EVERY shipped string in that locale
   (mini tools/*.js locale-keyed values, *-activities.json, messages/<loc>.json,
   tool-content/<loc>.json, activity-content/<loc>.json) and reports, per
   candidate word, the files + surrounding context where it already appears.
   ⚠ Run per locale, in that locale — the #52 lesson (a fence run in English
   declared "the stone" free when it was taken in ten of eleven). */
'use strict';
var fs = require('fs'), path = require('path');
var ROOT = path.join(__dirname, '..');
var LOCS = ['de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

function walkJson(o, loc, out, file, trail) {
  if (o == null) return;
  if (typeof o === 'string') { out.push({ file: file, key: trail, text: o }); return; }
  if (typeof o !== 'object') return;
  Object.keys(o).forEach(function (k) { walkJson(o[k], loc, out, file, trail + '.' + k); });
}

/* pull `<loc>: '...'` / `<loc>: "..."` values out of a mini-tool js source */
function toolStrings(src, loc, file, out) {
  var re = new RegExp("(?:^|[{,\\s])" + loc + "\\s*:\\s*(['\"])((?:\\\\.|(?!\\1)[^\\\\])*)\\1", 'g');
  var m;
  while ((m = re.exec(src))) out.push({ file: file, key: '(js)', text: m[2] });
}

function corpus(loc) {
  var out = [];
  var mt = path.join(ROOT, 'mini tools');
  fs.readdirSync(mt).forEach(function (f) {
    var p = path.join(mt, f);
    if (!fs.statSync(p).isFile()) return;
    var src;
    try { src = fs.readFileSync(p, 'utf8'); } catch (e) { return; }
    if (/\.js$/.test(f)) { toolStrings(src, loc, 'mini tools/' + f, out); return; }
    if (/\.json$/.test(f)) {
      var j; try { j = JSON.parse(src); } catch (e) { return; }
      /* activities manifests carry per-locale objects too */
      walkJsonLoc(j, loc, out, 'mini tools/' + f, '');
    }
  });
  ['messages/' + loc + '.json', 'messages/tool-content/' + loc + '.json',
   'messages/activity-content/' + loc + '.json', 'messages/maker-content/' + loc + '.json']
    .forEach(function (rel) {
      var p = path.join(ROOT, 'frontend', rel);
      if (!fs.existsSync(p)) return;
      var j; try { j = JSON.parse(fs.readFileSync(p, 'utf8')); } catch (e) { return; }
      walkJson(j, loc, out, rel, '');
    });
  return out;
}

/* in a mixed manifest, only harvest values sitting under the locale key */
function walkJsonLoc(o, loc, out, file, trail) {
  if (o == null || typeof o !== 'object') return;
  Object.keys(o).forEach(function (k) {
    var v = o[k];
    if (k === loc && typeof v === 'string') { out.push({ file: file, key: trail, text: v }); return; }
    if (v && typeof v === 'object') walkJsonLoc(v, loc, out, file, trail + '.' + k);
  });
}

var CANDIDATES = {
  de: ['Rundbogen', 'Torbogen', 'Bogen', 'Durchgang', 'Durchlass', 'Umzug', 'Parade', 'Festzug',
       'Marschierer', 'marschier', 'Schwelle', 'Tor', 'Pforte', 'Reihe', 'Platz', 'Riegel'],
  fr: ['arche', 'arc\\b', 'porche', 'portique', 'défilé', 'cortège', 'marcheur', 'seuil',
       'file', 'rangée', 'barre', 'place', 'passage'],
  es: ['arcada', 'arco', 'pórtico', 'desfile', 'desfilante', 'umbral', 'fila', 'barra',
       'hueco', 'paso', 'sitio'],
  pt: ['arcada', 'arco', 'pórtico', 'desfile', 'desfilante', 'soleira', 'fila', 'barra',
       'vão', 'passagem'],
  it: ['arcata', 'arco', 'portico', 'sfilata', 'corteo', 'marciatori', 'soglia', 'fila',
       'sbarra', 'passaggio', 'posto'],
  nl: ['boog', 'poort', 'doorgang', 'optocht', 'stoet', 'parade', 'lopers', 'drempel',
       'rij', 'balk', 'plek'],
  sv: ['valv', 'båge', 'bågen', 'portal', 'parad', 'tåg', 'optåg', 'marscherare', 'tröskel',
       'rad', 'bom', 'plats', 'led\\b'],
  da: ['hvælving', 'buegang', 'bue\\b', 'buen\\b', 'portal', 'optog', 'parade', 'marcherende',
       'tærskel', 'række', 'bom', 'plads'],
  no: ['hvelv', 'buegang', 'bue\\b', 'buen\\b', 'portal', 'opptog', 'parade', 'marsjerende',
       'terskel', 'rekke', 'bom', 'plass'],
  fi: ['holvi', 'kaari', 'portti', 'kulkue', 'paraati', 'marssi', 'kynnys', 'rivi', 'puomi',
       'paikka', 'aukko']
};

var only = process.argv[2];
LOCS.forEach(function (loc) {
  if (only && only !== loc) return;
  var c = corpus(loc);
  console.log('\n============ ' + loc.toUpperCase() + '  (' + c.length + ' shipped strings) ============');
  CANDIDATES[loc].forEach(function (w) {
    var re = new RegExp('(?<![\\p{L}])' + w + (/\\b$/.test(w) ? '' : '[\\p{L}]*'), 'iu');
    var hits = c.filter(function (r) { return re.test(r.text); });
    var files = {};
    hits.forEach(function (h) { files[h.file] = (files[h.file] || 0) + 1; });
    var fl = Object.keys(files).sort(function (a, b) { return files[b] - files[a]; });
    console.log('\n  ' + w.replace('\\b', '') + '  → ' + hits.length + ' hits in ' + fl.length + ' files');
    fl.slice(0, 6).forEach(function (f) { console.log('      ' + files[f] + '  ' + f); });
    hits.slice(0, 3).forEach(function (h) {
      var m = h.text.match(re);
      var i = h.text.indexOf(m[0]);
      console.log('        …' + h.text.slice(Math.max(0, i - 45), i + m[0].length + 45).replace(/\s+/g, ' ') + '…');
    });
  });
});
