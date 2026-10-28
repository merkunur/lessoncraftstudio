#!/usr/bin/env node
/**
 * build-level-set-demand-report.js — turns the autocomplete harvest
 * (docs/SEO/level-set-demand/harvest.<loc>.json) into a ranked list of TOPIC clusters
 * worth a landing page: a topic people search after a worksheet type's name, that the
 * site's noindex Level Set decks answer, and that no indexed page answers yet.
 *
 * For each suggestion: the type's head is stripped; what remains is split into words; a
 * word that is not a generic/format word is a topic candidate. Per (type, topic):
 *   demand  = how many distinct suggestions carry it, weighted by their rank in the list
 *             (Google orders completions by popularity: rank 1 = 10 points … rank 10 = 1);
 *   supply  = noindex decks of that type in that language whose title carries the topic;
 *   covered = an indexed landing (frontend/content/seo-landing/<loc>.json) or an indexable
 *             deck of the same type already carries it in its title / h1.
 * A cluster is a CANDIDATE when demand > 0, supply > 0 and it is not covered. Topics with
 * demand but no supply are listed separately (content ideas, not landing candidates).
 *
 * Usage: node scripts/seo-research/build-level-set-demand-report.js --decks=<decks.tsv> [--locale=en|--all]
 *   decks.tsv = language, exercise_type, indexable(t/f), slug, subject_tags, age_range, title-json (one row per published deck)
 * Writes docs/SEO/level-set-demand/report.<loc>.json and report.<loc>.md, plus summary.md for --all.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..', '..');
const DIR = path.join(ROOT, 'docs', 'SEO', 'level-set-demand');
const LOCS = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith(`--${k}=`)); return a ? a.split('=').slice(1).join('=') : d; };

/* generic / format / audience words that never make a topic (per locale, plus shared) */
const GENERIC_ALL = ['pdf', 'png', 'jpg', 'app', 'apps', 'online', 'gratis', 'free', 'printable', 'printables', 'kids', 'children', 'game', 'games', 'book', 'books', 'download', 'ideas', 'answers', 'answer', 'key', 'sheet', 'sheets', 'worksheet', 'worksheets', 'activity', 'activities', 'with', 'and', 'for', 'the', 'of', 'to', 'in', 'on', 'a', 'an', 'near', 'me', 'amazon', 'pinterest', 'youtube', 'tpt', 'teachers', 'pay', 'video', 'videos', 'song', 'songs', 'quiz', 'test', 'meaning', 'definition', 'examples', 'example', 'chart', 'list', 'lists', 'template', 'templates', 'adults', 'adult', 'pages', 'page', 'coloring', 'colouring', 'print', 'pdfs', 'word', 'words', 'simple', 'medium', 'advanced', 'beginner', 'beginners'];
/* difficulty words map onto the Level Set slugs' own English level words (easy / hard) */
const DIFF = { easy: 'easy', difficult: 'hard', hard: 'hard', leicht: 'easy', einfach: 'easy', schwer: 'hard', facile: 'easy', difficile: 'hard', facil: 'easy', dificil: 'hard', faciles: 'easy', dificiles: 'hard', facili: 'easy', difficili: 'hard', makkelijk: 'easy', moeilijk: 'hard', latt: 'easy', svar: 'hard', let: 'easy', 'svær': 'hard', lett: 'easy', vanskelig: 'hard', helppo: 'easy', helppoja: 'easy', vaikea: 'hard', vaikeita: 'hard' };
const GENERIC = {
  en: ['grade', '1st', '2nd', '3rd', '4th', 'first', 'second', 'third', 'kindergarten', 'preschool', 'prek', 'pre', 'toddlers', 'year', 'years', 'old', 'olds', 'math', 'reading', 'writing', 'practice', 'cards', 'flash', 'printable', 'by', 'number', 'numbers'],
  de: ['arbeitsblatt', 'arbeitsblätter', 'arbeitsblaetter', 'zum', 'ausdrucken', 'kostenlos', 'klasse', 'grundschule', 'kindergarten', 'vorschule', 'für', 'kinder', 'mit', 'und', 'der', 'die', 'das', 'lösungen', 'übungen', 'material', 'pdf', 'kita', 'einfach', 'schwer', 'leicht'],
  fr: ['fiche', 'fiches', 'à', 'imprimer', 'gratuit', 'maternelle', 'cp', 'ce1', 'ce2', 'cm1', 'pour', 'enfants', 'de', 'des', 'la', 'le', 'les', 'et', 'en', 'du', 'exercices', 'exercice', 'ms', 'gs', 'ps', 'cycle', 'facile', 'difficile', 'jeux'],
  es: ['ficha', 'fichas', 'para', 'imprimir', 'gratis', 'preescolar', 'primaria', 'grado', 'primer', 'segundo', 'tercer', 'niños', 'de', 'la', 'el', 'los', 'las', 'y', 'con', 'en', 'ejercicios', 'actividades', 'fáciles', 'facil', 'fácil', 'difíciles', 'dificil', 'hojas', 'trabajo'],
  pt: ['atividade', 'atividades', 'para', 'imprimir', 'educação', 'infantil', 'ano', 'º', 'crianças', 'de', 'da', 'do', 'das', 'dos', 'e', 'com', 'em', 'fácil', 'facil', 'difícil', 'exercícios', 'ensino', 'fundamental'],
  it: ['scheda', 'schede', 'didattica', 'didattiche', 'da', 'stampare', 'scuola', 'primaria', 'infanzia', 'classe', 'prima', 'seconda', 'terza', 'per', 'bambini', 'di', 'e', 'con', 'del', 'della', 'delle', 'il', 'la', 'le', 'facili', 'esercizi'],
  nl: ['werkblad', 'werkbladen', 'printen', 'groep', 'kleuters', 'voor', 'kinderen', 'met', 'en', 'de', 'het', 'een', 'gratis', 'oefenen', 'makkelijk', 'moeilijk', 'printable'],
  sv: ['arbetsblad', 'skriva', 'ut', 'åk', 'förskoleklass', 'förskola', 'för', 'barn', 'med', 'och', 'att', 'gratis', 'lätt', 'svår', 'övningar', 'utskrift'],
  da: ['opgaver', 'opgave', 'til', 'print', 'klasse', 'børnehaveklasse', 'for', 'børn', 'med', 'og', 'gratis', 'let', 'svær', 'øvelser', 'printvenlig'],
  no: ['oppgaver', 'oppgave', 'til', 'utskrift', 'trinn', 'for', 'barn', 'med', 'og', 'gratis', 'lett', 'vanskelig', 'øvelser', 'barnehage', 'skriv', 'ut'],
  fi: ['tehtäviä', 'tehtävät', 'tulostettava', 'tulostettavat', 'luokka', 'esikoulu', 'lapsille', 'ja', 'ilmainen', 'helppo', 'vaikea', 'harjoituksia', 'pdf'],
};
/* age / grade words: these make a LEVEL cluster, matched against the deck's age range, not its title */
const LEVEL_WORDS = {
  en: { preschool: '3-5', prek: '3-5', toddlers: '3-5', kindergarten: '5-7', '1st': '6-8', first: '6-8', '2nd': '7-9', second: '7-9', '3rd': '8-10', third: '8-10' },
};
const fold = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^\p{L}\p{N} ]+/gu, ' ').replace(/\s+/g, ' ').trim();
const words = (s) => fold(s).split(' ').filter(Boolean);
/* a crude stem shared across languages: fold, then drop a short plural/case ending */
const stem = (w) => w.length > 5 ? w.replace(/(es|en|er|et|s|n|a|e|i|o)$/u, '') : w;
const hasStem = (textWords, st) => st.length >= 3 && textWords.some((w) => w === st || (st.length >= 4 && w.startsWith(st)));

function loadDecks(file, loc) {
  const rows = [];
  for (const line of fs.readFileSync(file, 'utf8').split('\n')) {
    const p = line.split('\t'); if (p.length < 7 || p[0] !== loc) continue;
    let title = ''; try { const t = JSON.parse(p[6]); title = t[loc] || Object.values(t)[0] || ''; } catch (e) { title = p[6]; }
    rows.push({ type: p[1], indexable: p[2] === 't', slug: p[3], age: p[5], title, tw: words(title + ' ' + p[3].replace(/-/g, ' ')) });
  }
  return rows;
}
function loadLandings(loc) {
  const j = require(path.join(ROOT, 'frontend', 'content', 'seo-landing', loc + '.json'));
  const a = Array.isArray(j) ? j : (j.landings || Object.values(j));
  return a.map((x) => ({ type: x.coordinate && x.coordinate.type, slug: x.slug, tw: words([x.h1, x.title, x.coordinate && x.coordinate.theme ? String(x.coordinate.theme).replace(/_/g, ' ') : ''].join(' ')) }));
}

function report(loc, decksFile) {
  const hf = path.join(DIR, `harvest.${loc}.json`);
  if (!fs.existsSync(hf)) { console.log(loc + ': no harvest yet'); return null; }
  const H = JSON.parse(fs.readFileSync(hf, 'utf8'));
  const decks = loadDecks(decksFile, loc), lands = loadLandings(loc);
  const gen = new Set([...GENERIC_ALL, ...(GENERIC[loc] || [])].map(fold));
  const C = {};
  for (const [, ans] of Object.entries(H.answers)) {
    const headW = words(ans.head);
    ans.s.forEach((sug, i) => {
      const w = words(sug);
      /* the head must open the phrase, or the suggestion is about something else */
      if (headW.some((h, k) => w[k] !== h)) return;
      const rest = w.slice(headW.length);
      /* the topic is the WHOLE remainder minus generic words ("ice cream", "van gogh", "race car"):
         a deck answers it only when its title carries every word, so "van gogh" never matches a van */
      const content = [];
      for (let t of rest) {
        if (DIFF[t]) t = DIFF[t];
        else if (gen.has(t) || /^\d+$/.test(t) || t.length < 3) continue;
        if (!content.includes(t)) content.push(t);
      }
      if (!content.length || content.length > 3) return;
      const stems = content.map(stem), key = ans.type + '|' + stems.slice().sort().join(' ');
      const c = C[key] || (C[key] = { type: ans.type, stems, word: content.join(' '), demand: 0, phrases: new Set() });
      if (!c.phrases.has(sug)) { c.phrases.add(sug); c.demand += 10 - Math.min(i, 9); }
    });
  }
  const all = (tw, stems) => stems.every((s) => hasStem(tw, s));
  const out = [];
  for (const c of Object.values(C)) {
    const typeDecks = decks.filter((d) => d.type === c.type);
    const supply = typeDecks.filter((d) => !d.indexable && all(d.tw, c.stems));
    const coveredDeck = typeDecks.find((d) => d.indexable && all(d.tw, c.stems));
    const coveredLand = lands.find((l) => l.type === c.type && all(l.tw, c.stems));
    out.push({ type: c.type, topic: c.word, stem: c.stems.join(' '), demand: c.demand, phrases: [...c.phrases].slice(0, 6), phraseCount: c.phrases.size,
      supply: supply.length, supplySample: supply.slice(0, 4).map((d) => d.slug + ' — ' + d.title),
      covered: !!(coveredDeck || coveredLand), coveredBy: coveredLand ? 'landing ' + coveredLand.slug : coveredDeck ? 'deck ' + coveredDeck.slug : null });
  }
  out.sort((a, b) => b.demand - a.demand);
  const cand = out.filter((c) => c.supply > 0 && !c.covered);
  const ideas = out.filter((c) => c.supply === 0 && !c.covered && c.phraseCount >= 2);
  const doc = { locale: loc, harvested: Object.keys(H.answers).length, clusters: out.length, candidates: cand, contentIdeas: ideas.slice(0, 80), covered: out.filter((c) => c.covered).length };
  fs.writeFileSync(path.join(DIR, `report.${loc}.json`), JSON.stringify(doc, null, 1));
  let md = `# Level Set demand — ${loc}\n\nHarvested seeds: ${doc.harvested} · topic clusters: ${out.length} · already covered by an indexed page: ${doc.covered} · **landing candidates: ${cand.length}** · content ideas (demand, no decks): ${ideas.length}\n\n`;
  md += '## Landing candidates (demand × noindex decks, not covered)\n\n| # | Type | Topic | Demand | Phrases (sample) | Noindex decks | Example deck |\n|---|---|---|---|---|---|---|\n';
  cand.slice(0, 150).forEach((c, i) => { md += `| ${i + 1} | ${c.type} | ${c.topic} | ${c.demand} | ${c.phrases.slice(0, 3).join('; ')} | ${c.supply} | ${(c.supplySample[0] || '').replace(/\|/g, '/')} |\n`; });
  md += '\n## Content ideas (searched, no decks yet)\n\n| Type | Topic | Demand | Phrases |\n|---|---|---|---|\n';
  ideas.slice(0, 60).forEach((c) => { md += `| ${c.type} | ${c.topic} | ${c.demand} | ${c.phrases.slice(0, 3).join('; ')} |\n`; });
  fs.writeFileSync(path.join(DIR, `report.${loc}.md`), md);
  console.log(`${loc}: ${out.length} clusters, ${cand.length} candidates, ${doc.covered} covered, ${ideas.length} ideas`);
  return doc;
}

module.exports = { fold, words, stem, hasStem, loadDecks, DIFF };
if (require.main === module) {
  const decksFile = arg('decks'); if (!decksFile) { console.error('--decks=<decks.tsv> is required'); process.exit(2); }
  const locs = process.argv.includes('--all') ? LOCS : [arg('locale', 'en')];
  for (const l of locs) report(l, decksFile);
}
