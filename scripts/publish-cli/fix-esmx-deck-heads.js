'use strict';
/*
 * es-MX head-metadata fix for live Spanish decks (operator-approved 2026-10-18:
 * "the Spain words inside each deck's <head> ... Fix it." — Mexican Spanish only).
 *
 * Rewrites the SEO text of each live /var/www/lcs-media/decks/es/<slug>/deck.html <head>:
 *   <title>, meta description, og:title / og:description / og:image:alt,
 *   twitter:title / twitter:description / twitter:image:alt, and the string VALUES of
 *   every JSON-LD block (never URLs). Slugs, canonicals and every other byte stay unchanged.
 *
 * Two kinds of replacement:
 *   1. PICTURE LABELS — keyed by the picture the deck actually shows (manifest
 *      vocabulary / image paths), never by the word alone: "Camión" was the old TRUCK and is
 *      now the BUS, "Limón" was the old LEMON and is now the LIME, "Cometa" is still the comet.
 *      Old label -> new label from image-vocabulary.js (c8caf963^..6a7ed5a2).
 *   2. TEXT TERMS — "casilla" -> "recuadro" (with article/adjective agreement),
 *      "céntimos" -> "pesos" where the deck body now shows pesos.
 *
 * Gates (a deck whose rewrite fails any gate is SKIPPED and reported, never half-written):
 *   - meta description stays 120-170 chars; title stays <= 70 displayed chars (or no longer
 *     than it already was);
 *   - new titleHash / descriptionHash (SHA-1 normalized, seo-reconciliation.js) collide with no
 *     other es Deck row (any status) and with no other rewritten deck;
 *   - the hreflang marker/block stays the last thing in <head> (only text values change).
 *
 * Run ON THE SERVER (env from /opt/lessoncraftstudio/.deploy-env + frontend/.env.production):
 *   node scripts/publish-cli/fix-esmx-deck-heads.js [--slugs-file=f] [--out=dir] [--confirm]
 * Without --confirm: dry-run, writes <out>/plan.json + report. With --confirm: atomic
 * temp+rename per deck.html (owner/mode preserved), then DB title_hash/description_hash.
 * Idempotent: a second run finds nothing to change.
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { hashTitleOrDescription } = require('./seo-reconciliation');

const ROOT = '/var/www/lcs-media/decks/es';
const args = process.argv.slice(2);
const CONFIRM = args.includes('--confirm');
const outArg = args.find((a) => a.startsWith('--out='));
const OUT = outArg ? outArg.slice(6) : '/tmp/esmx-head';
const slugArg = args.find((a) => a.startsWith('--slugs-file='));
fs.mkdirSync(OUT, { recursive: true });

// old -> new es labels (image-vocabulary.js c8caf963^..6a7ed5a2) [sgOld, plOld, sgNew, plNew]
const MAP = {
  'baby-bottle': ['Biberón', 'Biberones', 'Mamila', 'Mamilas'],
  'baking-sheet': ['Bandeja para hornear', 'Bandejas para hornear', 'Charola para hornear', 'Charolas para hornear'],
  bathtub: ['Bañera', 'Bañeras', 'Tina', 'Tinas'],
  bun: ['Bollo', 'Bollos', 'Bolillo', 'Bolillos'],
  bus: ['Autobús', 'Autobuses', 'Camión', 'Camiones'],
  'bus-driver': ['Chofer de autobús', 'Choferes de autobús', 'Chofer de camión', 'Choferes de camión'],
  'cement-mixer': ['Mezcladora de cemento', 'Mezcladoras de cemento', 'Revolvedora', 'Revolvedoras'],
  'cinnamon-roll': ['Rollo de canela', 'Rollos de canela', 'Rol de canela', 'Roles de canela'],
  'cookie-sheet': ['Bandeja para galletas', 'Bandejas para galletas', 'Charola para galletas', 'Charolas para galletas'],
  dishwasher: ['Lavavajillas', 'Lavavajillas', 'Lavatrastes', 'Lavatrastes'],
  'double-decker-bus': ['Autobús de dos pisos', 'Autobuses de dos pisos', 'Camión de dos pisos', 'Camiones de dos pisos'],
  faucet: ['Grifo', 'Grifos', 'Llave del agua', 'Llaves del agua'],
  folder: ['Carpeta', 'Carpetas', 'Fólder', 'Fólderes'],
  garage: ['Garaje', 'Garajes', 'Cochera', 'Cocheras'],
  goggles: ['Gafas', 'Gafas', 'Goggles', 'Goggles'],
  grasshopper: ['Saltamontes', 'Saltamontes', 'Chapulín', 'Chapulines'],
  jacket: ['Chaqueta', 'Chaquetas', 'Chamarra', 'Chamarras'],
  'lawn-mower': ['Cortadora de césped', 'Cortadoras de césped', 'Podadora', 'Podadoras'],
  leek: ['Puerro', 'Puerros', 'Poro', 'Poros'],
  lemon: ['Limón', 'Limones', 'Limón amarillo', 'Limones amarillos'],
  'light-switch': ['Interruptor', 'Interruptores', 'Apagador', 'Apagadores'],
  lime: ['Lima', 'Limas', 'Limón', 'Limones'],
  lounger: ['Tumbona', 'Tumbonas', 'Camastro', 'Camastros'],
  minibus: ['Minibús', 'Minibuses', 'Microbús', 'Microbuses'],
  nightstand: ['Mesa de noche', 'Mesas de noche', 'Buró', 'Burós'],
  outlet: ['Enchufe', 'Enchufes', 'Contacto', 'Contactos'],
  plunger: ['Destapacaños', 'Destapacaños', 'Destapador', 'Destapadores'],
  porridge: ['Gachas', 'Gachas', 'Avena cocida', 'Avena cocida'],
  'potato-chips': ['Papas fritas', 'Papas fritas', 'Papitas', 'Papitas'],
  'push-pin': ['Chincheta', 'Chinchetas', 'Tachuela', 'Tachuelas'],
  'race-car': ['Auto de carreras', 'Autos de carreras', 'Carro de carreras', 'Carros de carreras'],
  'school-bus': ['Autobús escolar', 'Autobuses escolares', 'Camión escolar', 'Camiones escolares'],
  squash: ['Calabacín', 'Calabacines', 'Calabacita', 'Calabacitas'],
  stool: ['Taburete', 'Taburetes', 'Banco', 'Bancos'],
  't-shirt': ['Camiseta', 'Camisetas', 'Playera', 'Playeras'],
  'tanker-truck': ['Camión cisterna', 'Camiones cisternas', 'Pipa', 'Pipas'],
  tent: ['Tienda de campaña', 'Tiendas de campaña', 'Casa de campaña', 'Casas de campaña'],
  toaster: ['Tostadora', 'Tostadoras', 'Tostador', 'Tostadores'],
  tomato: ['Tomate', 'Tomates', 'Jitomate', 'Jitomates'],
  'tow-truck': ['Grúa remolque', 'Grúas remolques', 'Grúa', 'Grúas'],
  truck: ['Camión', 'Camiones', 'Camión de carga', 'Camiones de carga'],
  yogurt: ['Yogur', 'Yogur', 'Yogurt', 'Yogurts'],
};
// grammatical gender old -> new (only where it changes; articles are re-agreed)
const GENDER = { 'baby-bottle': ['m', 'f'], faucet: ['m', 'f'], folder: ['f', 'm'], garage: ['m', 'f'], goggles: ['f', 'm'],
  lime: ['f', 'm'], lounger: ['f', 'm'], nightstand: ['f', 'm'], squash: ['m', 'f'], 'tanker-truck': ['m', 'f'], toaster: ['f', 'm'],
  'cement-mixer': ['f', 'f'] };
const ART = { m: ['el', 'un', 'los', 'unos', 'del', 'al'], f: ['la', 'una', 'las', 'unas', 'de la', 'a la'] };
// families whose printed sheet still uses the old word on purpose (rhyme / compound banks)
const KEEP_OLD = { 't-shirt': /^(rhyming-words|compound-words)$/ };
// old truck "Camión" is never the head of a longer label (de bomberos, de la basura, escolar, cisterna ...)
const TRUCK_TAIL = /^\s+(de|del|escolar|escolares|cisterna|cisternas)(?!\p{L})/u;

const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const lc1 = (s) => s.charAt(0).toLowerCase() + s.slice(1);
function variants(oldS, newS) { // case variants: Capitalized, lowercase first, UPPER
  return [[oldS, newS], [lc1(oldS), lc1(newS)], [oldS.toUpperCase(), newS.toUpperCase()]];
}

function deckKeys(man) {
  const keys = new Set();
  const add = (p) => {
    if (!p || typeof p !== 'string') return;
    let b = p.split('/').pop().replace(/\.(png|webp|jpe?g|svg)$/i, '').replace(/@\dx$/, '');
    b = b.replace(/-\d{10,}-[a-z0-9]+$/i, '').replace(/\s+\d+$/, '').trim().toLowerCase().replace(/\s+/g, '-');
    if (MAP[b]) keys.add(b);
  };
  (man.vocabulary || []).forEach((v) => { if (typeof v === 'string' && MAP[v]) keys.add(v); });
  (man.images_used || []).forEach((p) => add(typeof p === 'string' ? p : p && (p.path || p.url)));
  const walk = (o, d) => {
    if (!o || d > 6) return;
    if (Array.isArray(o)) return o.forEach((x) => walk(x, d + 1));
    if (typeof o === 'object') {
      for (const [k, v] of Object.entries(o)) {
        if ((k === 'path' || k === 'url' || k === 'src') && typeof v === 'string' && /\/images\//.test(v)) add(v);
        else walk(v, d + 1);
      }
    }
  };
  walk(man.exercises, 0);
  return keys;
}

// Build the replacer for a deck. bodyData = the deck's on-screen data (body <script> text):
// a word the sheet/screen itself still uses is NOT changed in the head (the head follows the sheet).
// Interactive APP decks whose words are NOT the puzzle (fix-app-decks.js group A): their body labels are
// text-fixed in place, so the body check decides. Every other app deck (word-guess, crossword, wordsearch ...)
// spells the word as the puzzle: until it is regenerated its manifest still holds the old label.
const APP_GROUP_A = new Set(['addition', 'subtraction', 'code-addition', 'math-worksheet', 'big-small', 'more-less', 'sudoku',
  'shadow-match', 'grid-match', 'picture-path', 'pattern-train', 'pattern-worksheet', 'chart-count', 'picture-sort', 'bingo',
  'prepositions', 'find-objects']);
function manifestWords(man) {
  const w = new Set();
  const app = man.generator || {};
  if (/^worksheet-gen/.test(String(app.app_version || '')) || APP_GROUP_A.has(app.app)) return w;
  (man.vocabulary || []).forEach((v) => { if (typeof v === 'string') w.add(v.toUpperCase()); });
  const walk = (o, d) => {
    if (!o || d > 6) return;
    if (Array.isArray(o)) return o.forEach((x) => walk(x, d + 1));
    if (typeof o === 'object') for (const [k, v] of Object.entries(o)) {
      if ((k === 'word' || k === 'name' || k === 'label') && typeof v === 'string') w.add(v.toUpperCase()); else walk(v, d + 1);
    }
  };
  walk(man.exercises, 0);
  return w;
}

function buildRules(keys, family, headText, bodyData, report, manWords) {
  const pairs = []; // [old, new, guard, key]
  let truckOld = keys.has('truck');
  let lemonOld = keys.has('lemon');
  // ambiguity: "Camión" (old truck) vs "Camión" (new bus); "Limón" (old lemon) vs "Limón" (new lime)
  if (truckOld && keys.has('bus') && !/Autob[úu]s/i.test(headText)) { truckOld = false; report.push('AMBIG truck/bus: skip Camión'); }
  if (lemonOld && keys.has('lime') && !/(?<!\p{L})Limas?(?!\p{L})/iu.test(headText)) { lemonOld = false; report.push('AMBIG lemon/lime: skip Limón'); }
  const newWords = [];
  const sheetUses = (w, guard, k) => (manWords && manWords.has(w.toUpperCase())) || new RegExp('(?<!\\p{L})' + esc(w) + '(?!\\p{L})' + (guard ? '(?!' + esc(guard) + ')' : '') +
    (k === 'truck' ? '(?!\\s+(?:de|del|escolar|escolares|cisterna|cisternas)(?!\\p{L}))' : ''), 'iu').test(bodyData);
  for (const k of keys) {
    if (KEEP_OLD[k] && KEEP_OLD[k].test(family)) continue;
    if (k === 'truck' && !truckOld) continue;
    if (k === 'lemon' && !lemonOld) continue;
    const [os, op, ns, np] = MAP[k];
    const guardS = ns.startsWith(os) ? ns.slice(os.length) : null;
    const guardP = np.startsWith(op) ? np.slice(op.length) : null;
    // the screen still shows the old word (and is not just showing it as the head of the new label)
    const keepS = sheetUses(os, guardS, k), keepP = op !== os && sheetUses(op, guardP, k);
    if (keepS) report.push('SHEET-USES ' + k + ' "' + os + '"');
    if (keepP) report.push('SHEET-USES ' + k + ' "' + op + '"');
    const g = GENDER[k];
    const add = (o, n, guard, plural) => {
      for (const [ov, nv] of variants(o, n)) pairs.push([ov, nv, guard, k]);
      if (g && g[0] !== g[1]) {
        const a0 = ART[g[0]], a1 = ART[g[1]];
        const idx = plural ? [2, 3] : [0, 1, 4, 5];
        for (const x of idx) for (const [ov, nv] of variants(o, n)) {
          pairs.push([a0[x] + ' ' + ov, a1[x] + ' ' + nv, guard, k]);
          pairs.push([a0[x].charAt(0).toUpperCase() + a0[x].slice(1) + ' ' + ov, a1[x].charAt(0).toUpperCase() + a1[x].slice(1) + ' ' + nv, guard, k]);
        }
      }
    };
    if (!keepS) { add(os, ns, guardS, false); newWords.push(ns); }
    if (op !== os && !keepP) { add(op, np, guardP, true); newWords.push(np); }
  }
  // longest old first so "Autobús escolar" wins over "Autobús"
  pairs.sort((a, b) => b[0].length - a[0].length);
  const dedup = new Map();
  for (const p of pairs) if (!dedup.has(p[0])) dedup.set(p[0], p);
  const list = [...dedup.values()];
  if (!list.length) return null;
  const re = new RegExp('(?<!\\p{L})(' + list.map((p) => esc(p[0])).join('|') + ')(?!\\p{L})', 'gu');
  // "y"/"e" before the new word ("Tetera e interruptor" -> "Tetera y apagador")
  const conj = newWords.length ? new RegExp('(?<!\\p{L})([ye]) (' + newWords.flatMap((w) => [w, lc1(w)]).map(esc).join('|') + ')(?!\\p{L})', 'gu') : null;
  return function (s) {
    let r = s.replace(re, (m, gg, off, str) => {
      const p = dedup.get(m);
      const after = str.slice(off + m.length);
      if (p[2] && after.toLowerCase().startsWith(p[2].toLowerCase())) return m; // already new
      if (p[3] === 'truck' && TRUCK_TAIL.test(after)) return m;
      return p[1];
    });
    if (conj && r !== s) r = r.replace(conj, (m, c, w) => (/^(i|í|hi(?!e))/i.test(w) ? 'e ' : 'y ') + w);
    return r;
  };
}

// "casilla" -> "recuadro" with agreement; "céntimos" -> "pesos"
const CASILLA = [
  [/(?<!\p{L})casilla correcta(?!\p{L})/gu, () => 'casilla correcto'],
  [/(?<!\p{L})casillas correctas(?!\p{L})/gu, () => 'casillas correctos'],
  [/(?<!\p{L})casillas vacías(?!\p{L})/gu, () => 'casillas vacíos'],
  [/(?<!\p{L})casilla vacía(?!\p{L})/gu, () => 'casilla vacío'],
  [/(?<!\p{L})(una|Una) casilla(?!\p{L})/gu, (m, a) => (a === 'Una' ? 'Un' : 'un') + ' recuadro'],
  [/(?<!\p{L})(la|La) casilla(?!\p{L})/gu, (m, a) => (a === 'La' ? 'El' : 'el') + ' recuadro'],
  [/(?<!\p{L})(las|Las) casillas(?!\p{L})/gu, (m, a) => (a === 'Las' ? 'Los' : 'los') + ' recuadros'],
  [/(?<!\p{L})de el recuadro/gu, () => 'del recuadro'],
  [/(?<!\p{L})a el recuadro/gu, () => 'al recuadro'],
  [/(?<!\p{L})(esta|Esta) casilla(?!\p{L})/gu, (m, a) => (a === 'Esta' ? 'Este' : 'este') + ' recuadro'],
  [/(?<!\p{L})(estas|Estas) casillas(?!\p{L})/gu, (m, a) => (a === 'Estas' ? 'Estos' : 'estos') + ' recuadros'],
  [/(?<!\p{L})(cada|Cada|otra|Otra|una sola|su|sus|tu|tus) casilla(s?)(?!\p{L})/gu, (m, a, s) => (/^(otra|Otra)$/.test(a) ? (a === 'Otra' ? 'Otro' : 'otro') : a.replace('una sola', 'un solo')) + ' recuadro' + s],
  [/(?<!\p{L})Casillas(?!\p{L})/gu, () => 'Recuadros'],
  [/(?<!\p{L})Casilla(?!\p{L})/gu, () => 'Recuadro'],
  [/(?<!\p{L})casillas(?!\p{L})/gu, () => 'recuadros'],
  [/(?<!\p{L})casilla(?!\p{L})/gu, () => 'recuadro'],
];
function textRules(s, bodyHasPesos) {
  for (const [re, f] of CASILLA) s = s.replace(re, f);
  if (bodyHasPesos) s = s.replace(/(?<!\p{L})céntimos(?!\p{L})/gu, 'pesos').replace(/(?<!\p{L})céntimo(?!\p{L})/gu, 'peso');
  return s;
}

const META_KEYS = /^(description|og:title|og:description|og:image:alt|twitter:title|twitter:description|twitter:image:alt)$/;
function transformHead(head, fn) {
  let out = head.replace(/<title>([\s\S]*?)<\/title>/, (m, t) => '<title>' + fn(t) + '</title>');
  out = out.replace(/(<meta\s+(?:name|property)=")([^"]+)("\s+content=")([^"]*)(")/g, (m, a, k, b, v, c) => (META_KEYS.test(k) ? a + k + b + fn(v) + c : m));
  let ldFail = false;
  out = out.replace(/(<script type="application\/ld\+json">)([\s\S]*?)(<\/script>)/g, (m, a, j, c) => {
    let o;
    try { o = JSON.parse(j); } catch (e) { ldFail = true; return m; }
    if (JSON.stringify(o) !== j) { // not compact-stringified: replace inside string literals only
      const r = j.replace(/"((?:[^"\\]|\\.)*)"/g, (q, inner) => (/^(https?:|\/)/.test(inner) ? q : '"' + fn(inner) + '"'));
      return a + r + c;
    }
    const walk = (x, key) => {
      if (typeof x === 'string') return /^(https?:|\/)/.test(x) || /^(url|@id|@type|@context|contentUrl|thumbnailUrl|inLanguage|teaches|educationalLevel)$/.test(key) ? x : fn(x);
      if (Array.isArray(x)) return x.map((y) => walk(y, key));
      if (x && typeof x === 'object') { const r = {}; for (const [k, v] of Object.entries(x)) r[k] = walk(v, k); return r; }
      return x;
    };
    return a + JSON.stringify(walk(o, '')) + c;
  });
  return { out, ldFail };
}

function field(head, re) { const m = re.exec(head); return m ? m[1] : null; }
const getTitle = (h) => { const t = field(h, /<title>([\s\S]*?)<\/title>/i); return t == null ? null : t.trim(); };
const getDesc = (h) => field(h, /<meta\s+name="description"\s+content="([^"]*)"/);
const dispLen = (s) => s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").length;

function psql(sql) {
  return execSync('psql -h localhost -U lcs_user lessoncraftstudio_prod -At -F "\t" -c ' + JSON.stringify(sql), { maxBuffer: 1 << 28, env: process.env }).toString();
}
function busy() {
  try { return execSync('pgrep -af "publish-wave|publish-bulk|restore-update-injections|fix-app-decks" | grep -v pgrep || true').toString().trim(); } catch (e) { return ''; }
}

function main() {
  let slugs;
  if (slugArg) slugs = fs.readFileSync(slugArg.slice(13), 'utf8').split('\n').map((s) => s.trim()).filter(Boolean);
  else slugs = fs.readdirSync(ROOT).filter((e) => { try { return fs.lstatSync(path.join(ROOT, e)).isSymbolicLink(); } catch (_) { return false; } });

  // DB: every es row's hashes (any status) for collision checks
  const rows = psql("select id, slug, status, coalesce(title_hash,''), coalesce(description_hash,''), coalesce(replace(replace(title->>'es',E'\\t',' '),E'\\n',' '),''), coalesce(replace(replace(description->>'es',E'\\t',' '),E'\\n',' '),'') from decks where language='es'").trim().split('\n').map((l) => l.split('\t'));
  const bySlugPub = new Map(), tH = new Map(), dH = new Map();
  for (const [id, slug, st, th, dh, jt, jd] of rows) {
    if (st === 'published') bySlugPub.set(slug, { id, th, dh, jt, jd });
    if (th) { if (!tH.has(th)) tH.set(th, []); tH.get(th).push(id); }
    if (dh) { if (!dH.has(dh)) dH.set(dh, []); dH.get(dh).push(id); }
  }

  if (args.includes('--sync-hashes')) return syncHashes(slugs, bySlugPub, tH, dH);
  const plan = [], skipped = [], notes = [], dbText = [];
  let scanned = 0;
  for (const slug of slugs) {
    const link = path.join(ROOT, slug);
    let real, html, man = {};
    try { real = fs.realpathSync(link); html = fs.readFileSync(path.join(real, 'deck.html'), 'utf8'); } catch (e) { continue; }
    try { man = JSON.parse(fs.readFileSync(path.join(real, 'manifest.json'), 'utf8')); } catch (e) { /* no manifest */ }
    scanned++;
    const hEnd = html.indexOf('</head>');
    if (hEnd < 0) continue;
    const head = html.slice(0, hEnd);
    const body = html.slice(hEnd);
    const family = (man.generator && man.generator.app) || man.exercise_type || '';
    const rep = [];
    const bodyData = (body.match(/<script(?![^>]*ld\+json)[^>]*>[\s\S]*?<\/script>/g) || []).join('\n');
    const keyFn = buildRules(deckKeys(man), String(family), head, bodyData, rep, manifestWords(man));
    const bodyHasPesos = /(?<!\p{L})pesos?(?!\p{L})/iu.test(body) && !/(?<!\p{L})céntimos?(?!\p{L})/iu.test(body);
    const fn = (s) => textRules(keyFn ? keyFn(s) : s, bodyHasPesos);
    const { out, ldFail } = transformHead(head, fn);
    if (rep.length) notes.push(slug + ': ' + rep.join('; '));
    { // the DB Deck.title / Deck.description JSON (es value) gets the same words
      const r0 = bySlugPub.get(slug);
      if (r0) { const nt = r0.jt ? fn(r0.jt) : r0.jt, nd = r0.jd ? fn(r0.jd) : r0.jd;
        if (nt !== r0.jt || nd !== r0.jd) dbText.push({ slug, id: r0.id, titleOld: r0.jt, titleNew: nt, descOld: r0.jd, descNew: nd }); }
    }
    if (out === head) continue;
    let out2 = out;
    { // keep the new title / description inside their bands (same wording, shorter frame)
      const oT0 = getTitle(head), nT0 = getTitle(out2);
      if (nT0 && nT0 !== oT0 && dispLen(nT0) > 70 && dispLen(oT0 || '') <= 70) { // only where the fix itself would make it too long
        const short = nT0.replace(/ — para imprimir \(PDF gratis\)$| — PDF gratis$/, '');
        let t = short;
        // still too long: keep the first picture of a two-picture list, then drop the word "ficha"
        if (dispLen(t) > 70) { // "Type ficha — Theme — A y B — Level": keep picture A
          const seg = t.split(' — ');
          if (seg.length >= 4 && / y /.test(seg[2])) { seg[2] = seg[2].split(' y ')[0]; t = seg.join(' — '); }
        }
        if (dispLen(t) > 70) t = t.replace(/ ficha — /, ' — ');
        if (t !== nT0) out2 = out2.split(nT0).join(t);
      }
      const oD0 = getDesc(head), nD0 = getDesc(out2);
      if (nD0 && nD0 !== oD0 && nD0.length > 170) {
        let d = nD0.replace(/^Hoja interactiva gratuita /, 'Hoja interactiva gratis ');
        if (d.length > 170) d = d.replace(/ Imprimir o jugar en línea/, ' Imprime o juega en línea').replace(/ Descargar el PDF gratis/, ' Descarga el PDF');
        if (d !== nD0) out2 = out2.split(nD0).join(d);
      }
    }
    const oT = getTitle(head), nT = getTitle(out2), oD = getDesc(head), nD = getDesc(out2);
    const ent = { slug, real, family, titleOld: oT, titleNew: nT, descOld: oD, descNew: nD, ldFail, fields: [], notes: rep };
    // which fields changed (for the report)
    for (const k of ['title', 'description', 'og:title', 'og:description', 'og:image:alt', 'twitter:title', 'twitter:description', 'twitter:image:alt', 'ld']) {
      const g = (h) => (k === 'title' ? getTitle(h) : k === 'ld' ? (h.match(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g) || []).join('') : field(h, new RegExp('<meta\\s+(?:name|property)="' + esc(k) + '"\\s+content="([^"]*)"')));
      if (g(head) !== g(out2)) ent.fields.push(k);
    }
    // gates
    const why = [];
    if (nD != null && nD !== oD && (nD.length < 120 || nD.length > 170) && !(oD && (oD.length < 120 || oD.length > 170))) why.push('DESC_LEN ' + nD.length);
    // a correct word beats a short title: report, do not skip
    if (nT != null && nT !== oT && dispLen(nT) > 70 && dispLen(oT || '') <= 70) rep.push('TITLE_NOW_LONG ' + dispLen(nT));
    const row = bySlugPub.get(slug);
    ent.dbId = row ? row.id : null;
    if (row) {
      ent.thOld = row.th; ent.dhOld = row.dh;
      ent.thNew = nT && nT !== oT ? hashTitleOrDescription(nT) : row.th;
      ent.dhNew = nD && nD !== oD ? hashTitleOrDescription(nD) : row.dh;
      if (ent.thNew !== row.th) { const o = (tH.get(ent.thNew) || []).filter((x) => x !== row.id); if (o.length) why.push('TITLE_NON_UNIQUE vs ' + o.join(',')); }
      if (ent.dhNew !== row.dh) { const o = (dH.get(ent.dhNew) || []).filter((x) => x !== row.id); if (o.length) why.push('DESC_NON_UNIQUE vs ' + o.join(',')); }
    }
    ent.newHead = out2; ent.origHead = head;
    if (why.length) { ent.why = why; skipped.push(ent); } else plan.push(ent);
  }
  // within-plan collisions
  const seenT = new Map(), seenD = new Map();
  for (const e of plan.slice()) {
    if (!e.dbId) continue;
    const ct = e.thNew !== e.thOld && seenT.get(e.thNew), cd = e.dhNew !== e.dhOld && seenD.get(e.dhNew);
    if (ct || cd) { e.why = ['WITHIN_PLAN_COLLISION ' + (ct || cd)]; skipped.push(e); plan.splice(plan.indexOf(e), 1); continue; }
    if (e.thNew !== e.thOld) seenT.set(e.thNew, e.slug);
    if (e.dhNew !== e.dhOld) seenD.set(e.dhNew, e.slug);
  }
  const strip = (e) => { const { newHead, origHead, ...r } = e; return r; };
  fs.writeFileSync(path.join(OUT, 'plan.json'), JSON.stringify(plan.map(strip), null, 1));
  fs.writeFileSync(path.join(OUT, 'skipped.json'), JSON.stringify(skipped.map(strip), null, 1));
  fs.writeFileSync(path.join(OUT, 'notes.txt'), notes.join('\n') + '\n');
  fs.writeFileSync(path.join(OUT, 'db-text.json'), JSON.stringify(dbText, null, 1));
  const cnt = (k) => plan.filter((e) => e.fields.includes(k)).length;
  console.log(`scanned ${scanned} | to change ${plan.length} | skipped ${skipped.length} | title ${cnt('title')} desc ${cnt('description')} og:image:alt ${cnt('og:image:alt')} ld ${cnt('ld')} | no-db-row ${plan.filter((e) => !e.dbId).length} | ldFail ${plan.filter((e) => e.ldFail).length} | db title/desc JSON ${dbText.length}`);
  if (!CONFIRM) { console.log('dry-run; plan at ' + OUT); return; }

  // ---- apply ----
  const b = busy();
  if (b) { console.error('BUSY — a publish/injection is running, refusing to write:\n' + b); process.exit(3); }
  // backup of every head + DB hash pair about to change (restore = write origHead back, reset hashes)
  const stamp = new Date().toISOString().replace(/[-:]/g, '').slice(0, 15);
  fs.writeFileSync(path.join(OUT, 'backup-db-text-' + stamp + '.json'), JSON.stringify(dbText));
  fs.writeFileSync(path.join(OUT, 'backup-' + stamp + '.json'), JSON.stringify(plan.map((e) => ({ slug: e.slug, real: e.real, dbId: e.dbId, thOld: e.thOld, dhOld: e.dhOld, origHead: e.origHead }))));
  const changedTitles = [];
  let wrote = 0, dbw = 0, raced = 0;
  for (const e of plan) {
    const link = path.join(ROOT, e.slug);
    let real; try { real = fs.realpathSync(link); } catch (_) { raced++; continue; }
    if (real !== e.real) { raced++; continue; } // a republish swapped the version dir: leave it to the next run
    const f = path.join(real, 'deck.html');
    const cur = fs.readFileSync(f, 'utf8');
    const hEnd = cur.indexOf('</head>');
    if (cur.slice(0, hEnd) !== e.origHead) { raced++; continue; } // changed since planning
    const st = fs.statSync(f);
    const tmp = f + '.esmx-tmp';
    fs.writeFileSync(tmp, e.newHead + cur.slice(hEnd));
    fs.chmodSync(tmp, st.mode & 0o777); fs.chownSync(tmp, st.uid, st.gid);
    fs.renameSync(tmp, f);
    wrote++;
    if (e.dbId && (e.thNew !== e.thOld || e.dhNew !== e.dhOld)) {
      psql(`update decks set title_hash='${e.thNew}', description_hash='${e.dhNew}', updated_at=now() where id='${e.dbId}'`);
      dbw++;
    }
    if (e.titleNew !== e.titleOld) changedTitles.push(e.slug);
  }
  const sq = (x) => "'" + String(x).replace(/'/g, "''") + "'";
  for (const e of dbText) psql(`update decks set title = jsonb_set(title::jsonb, '{es}', to_jsonb(${sq(e.titleNew)}::text)), description = jsonb_set(description::jsonb, '{es}', to_jsonb(${sq(e.descNew)}::text)), updated_at=now() where id='${e.id}'`);
  console.log('db title/description JSON rows ' + dbText.length);
  fs.writeFileSync(path.join(OUT, 'changed-titles.txt'), changedTitles.join('\n') + '\n');
  fs.writeFileSync(path.join(OUT, 'changed-slugs.txt'), plan.map((e) => e.slug).join('\n') + '\n');
  console.log(`wrote ${wrote} deck.html | db rows ${dbw} | raced/skipped ${raced} | titles changed ${changedTitles.length}`);
}
// --sync-hashes: make DB title_hash / description_hash equal the RENDERED head (audit
// TITLE_/DESCRIPTION_HASH_MISMATCH), refusing any value another es row already holds.
function syncHashes(slugs, bySlugPub, tH, dH) {
  const todo = [], refused = [];
  for (const slug of slugs) {
    const row = bySlugPub.get(slug); if (!row) continue;
    let html; try { html = fs.readFileSync(path.join(fs.realpathSync(path.join(ROOT, slug)), 'deck.html'), 'utf8'); } catch (e) { continue; }
    const head = html.slice(0, html.indexOf('</head>'));
    const t = getTitle(head), d = getDesc(head);
    const th = t ? hashTitleOrDescription(t) : row.th, dh = d ? hashTitleOrDescription(d) : row.dh;
    if (th === row.th && dh === row.dh) continue;
    const ct = th !== row.th && (tH.get(th) || []).filter((x) => x !== row.id);
    const cd = dh !== row.dh && (dH.get(dh) || []).filter((x) => x !== row.id);
    if ((ct && ct.length) || (cd && cd.length)) { refused.push({ slug, title: t, desc: d, titleClash: ct || [], descClash: cd || [] }); continue; }
    todo.push({ slug, id: row.id, thOld: row.th, dhOld: row.dh, th, dh });
  }
  fs.writeFileSync(path.join(OUT, 'sync-hashes.json'), JSON.stringify({ todo, refused }, null, 1));
  console.log('hash sync: to update ' + todo.length + ' | refused (collision) ' + refused.length);
  if (!CONFIRM) return;
  const b = busy(); if (b) { console.error('BUSY:\n' + b); process.exit(3); }
  for (const e of todo) psql(`update decks set title_hash='${e.th}', description_hash='${e.dh}', updated_at=now() where id='${e.id}'`);
  console.log('hash sync: updated ' + todo.length);
}
main();
