/**
 * data/reading/reading-new.js — the Reading maker's new templates' own words (2026-11-02, NEW-TEMPLATES §48), literals
 * per locale, read by a native + pedagogy review:
 *   LOG   the reading-log fields (K-554): the book's title, its author, the date, how I liked it (stars), my favourite
 *         part, a new word, the drawing — the words a Lesetagebuch / carnet de lecture / reading log uses there
 *   PASSAGES  where the reading templates draw their texts: the short bank (data/literacy/reading-passages.js, 8 × 3
 *         questions) and the Reading Comprehension Level Set pools (data/literacy/rc-levels/<loc>.json), by level
 */
'use strict';
const NN = ' ';
const LOG = {
  en: { title: 'Title', author: 'Author', date: 'Date', stars: 'How much did I like it?', fav: 'My favorite part', word: 'A new word', draw: 'Draw your favorite part.' },
  de: { title: 'Buchtitel', author: 'Autorin oder Autor', date: 'Datum', stars: 'So hat mir das Buch gefallen:', fav: 'Meine Lieblingsstelle', word: 'Ein neues Wort', draw: 'Male deine Lieblingsstelle.' },
  fr: { title: 'Titre', author: 'Auteur', date: 'Date', stars: `J'ai aimé ce livre${NN}:`, fav: 'Mon passage préféré', word: 'Un mot nouveau', draw: 'Dessine ton passage préféré.' },
  es: { title: 'Título', author: 'Autor', date: 'Fecha', stars: '¿Cuánto me gustó?', fav: 'Mi parte favorita', word: 'Una palabra nueva', draw: 'Dibuja tu parte favorita.' },
  pt: { title: 'Título', author: 'Autor', date: 'Data', stars: 'Quanto eu gostei?', fav: 'Minha parte favorita', word: 'Uma palavra nova', draw: 'Desenhe sua parte favorita.' },
  it: { title: 'Titolo', author: 'Autore', date: 'Data', stars: 'Quanto mi è piaciuto?', fav: 'La mia parte preferita', word: 'Una parola nuova', draw: 'Disegna la tua parte preferita.' },
  nl: { title: 'Titel', author: 'Schrijver', date: 'Datum', stars: 'Hoe vond ik het boek?', fav: 'Mijn favoriete stukje', word: 'Een nieuw woord', draw: 'Teken je favoriete stukje.' },
  sv: { title: 'Titel', author: 'Författare', date: 'Datum', stars: 'Vad tyckte jag om boken?', fav: 'Det bästa i boken', word: 'Ett nytt ord', draw: 'Rita det bästa i boken.' },
  da: { title: 'Titel', author: 'Forfatter', date: 'Dato', stars: 'Hvad syntes jeg om bogen?', fav: 'Det bedste i bogen', word: 'Et nyt ord', draw: 'Tegn det bedste i bogen.' },
  no: { title: 'Tittel', author: 'Forfatter', date: 'Dato', stars: 'Hva syntes jeg om boka?', fav: 'Det beste i boka', word: 'Et nytt ord', draw: 'Tegn det beste i boka.' },
  fi: { title: 'Kirjan nimi', author: 'Kirjailija', date: 'Päivämäärä', stars: 'Kuinka paljon pidin kirjasta?', fav: 'Kirjan paras kohta', word: 'Uusi sana', draw: 'Piirrä kirjan paras kohta.' },
};

const { READING_PASSAGES } = require('../literacy/reading-passages.js');
/**
 * the passages of a level: [{ id, title, text, questions: [{ q, choices, correct }] }]
 *   1 the short bank (3 questions) · 2 the Level Set's first pools (core + level-1 questions) · 3 its longest pools
 *   (core + level-1 + the level-3 multiple-choice questions)
 */
function passagesFor(locale, level) {
  const L = String(locale || 'en').slice(0, 2);
  if (level === 1) return (READING_PASSAGES[L] || []).map((p) => ({ id: p.id, title: p.title, text: p.text, questions: p.questions }));
  let rc;
  try { rc = require(`../literacy/rc-levels/${L}.json`); } catch (e) { return []; }
  const pools = level === 2 ? ['G2-254', 'G2-269', 'G2-270'] : ['G2-271', 'G2-272', 'G2-273'];
  const out = [];
  for (const k of pools) for (const p of [].concat(rc.pools[k] || [])) {
    const qs = [...(p.core || []), ...(p.l1 || []), ...(level === 3 ? ((p.l3 && p.l3.mc) || []) : [])].filter((q) => q && q.q && Array.isArray(q.choices));
    out.push({ id: p.id, title: p.title, text: p.text, questions: qs });
  }
  return out;
}

// ---- leak-aware picking (native + pedagogy review 2026-11-02): a page never prints the same question twice, and no
// question's stem (or a shown answer, G1-505) holds another question's answer — "Who waves at Theo? → Ruby" beside
// "What does Ruby save for Theo?" lets a child copy without reading. Words are compared by their first four letters
// (Urho / Urhon, Turnbeutel, Schwimmbad / ins Schwimmbad), the small words of each language left out.
const STOP = {
  en: 'the a an and with his her their its to in on at of for from by named',
  de: 'der die das den dem des ein eine einen einem einer und mit ihr ihre ihren ihrem ihrer sein seine seinen seinem seiner ins im am zum zur in an auf aus von vom',
  fr: 'le la les un une des du de d l et avec son sa ses leur au aux à dans sur',
  es: 'el la los las un una unos unas de del y con su sus al en a',
  pt: 'o a os as um uma uns umas de do da dos das e com seu sua seus suas no na nos nas em para ao à',
  it: 'il lo la i gli le un una uno di del della dei delle e con suo sua suoi sue al alla nel nella in a da',
  nl: 'de het een en met zijn haar hun in op naar aan van bij',
  sv: 'en ett och med sin sitt sina hans hennes i på till av den det de',
  da: 'en et og med sin sit sine hans hendes i på til af den det de',
  no: 'en ei et og med sin sitt sine hans hennes i på til av den det de',
  fi: 'ja',
};
const STOPS = {};
const stopOf = (L) => STOPS[L] || (STOPS[L] = new Set((STOP[L] || STOP.en).split(' ')));
const wordsOf = (s, L) => (String(s).toLocaleLowerCase(L).match(/\p{L}+/gu) || []).filter((w) => w.length >= 3 && !stopOf(L).has(w));
/** the keys of a text's content words: the first four letters (a three-letter word whole) */
const keysOf = (s, L) => [...new Set(wordsOf(s, L).map((w) => w.slice(0, 4)))];
const hit = (k, ws) => ws.some((w) => (k.length < 4 ? w === k : w.startsWith(k)));
/** true when a content word of `answer` stands in `text` (any form that starts the same); words the answer repeats
 *  from its own question (`own`: the hero's name in "Who comes with Tim? → Tim's grandma") give nothing away */
function shares(answer, text, L, own) {
  const ws = wordsOf(text, L), ow = own ? wordsOf(own, L) : [];
  const ks = keysOf(answer, L).filter((k) => !hit(k, ow));
  // a short answer (one or two words: a name, a thing, a place) is given away by any of its words; a sentence answer
  // ("she can ride the bike alone") only when half its words stand there
  const need = ks.length <= 2 ? 1 : Math.ceil(ks.length / 2);
  return ks.length > 0 && ks.filter((k) => hit(k, ws)).length >= need;
}
const norm = (q) => String(q).toLocaleLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim();

/** two questions that give each other away: one's right answer (or shown answer) in the other's stem or shown answer */
function leaks(a, b, L) {
  const ra = a.choices[a.correct], rb = b.choices[b.correct];
  if (shares(ra, b.q, L, a.q) || shares(rb, a.q, L, b.q)) return true;
  // G1-505 prints answers too: a right answer printed beside another question gives it away as well
  if ((a.shown != null || b.shown != null) && (shares(ra, rb, L, a.q) || shares(rb, ra, L, b.q))) return true;
  if (a.shown != null && (shares(a.shown, b.q, L, a.q) || shares(rb, a.shown, L, b.q) || shares(a.shown, rb, L, a.q))) return true;
  if (b.shown != null && (shares(b.shown, a.q, L, b.q) || shares(ra, b.shown, L, a.q) || shares(b.shown, ra, L, b.q))) return true;
  return false;
}

/**
 * n questions of passage p that do not give each other away, no question twice, in the passage's order (a different
 * subset per copy where the passage allows). `shownOf(q, rng)` (optional) picks the answer printed with q (G1-505); it
 * is checked too. Returns null when the passage cannot give n.
 */
function pickQuestions(p, n, rng, L, shownOf) {
  const seen = new Set(), uniq = [];
  for (const q of p.questions) { const k = norm(q.q); if (!seen.has(k)) { seen.add(k); uniq.push(q); } }
  if (uniq.length < n) return null;
  for (let t = 0; t < 40; t++) {
    const order = rng.shuffle(uniq.map((_, i) => i)), chosen = [];
    for (const i of order) {
      const q = shownOf ? { ...uniq[i], shown: shownOf(uniq[i], rng) } : uniq[i];
      if (chosen.every((c) => !leaks(c.q, q, L))) chosen.push({ i, q });
      if (chosen.length === n) return chosen.sort((x, y) => x.i - y.i).map((c) => c.q);
    }
  }
  return null;
}

/** true when a title shares a content word with a text (Snowman / snow, Schneetag / Schnee, lapanen / lapasen) */
function titleTouches(title, text, L) { return shares(title, text, L) || shares(text, title, L); }

module.exports = { LOG, passagesFor, pickQuestions, titleTouches };
