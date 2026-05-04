'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

// Tier-weighted language ordering per HOMEPAGE-IMPLEMENTATION-PROMPT.md §5.6 + CLAUDE.md §19.
// Pass 7b F4 honesty discipline: array membership IS the gate — only locales with
// real catalog content link out. Per Section 2 Option D stagger pattern locked at
// Tier 2 i18n recon: per-locale entries are added at the commission that publishes
// that locale's first deck (operator-curated, not runtime content-checked). Tier 2
// Track A registers es + nl in TOPIC_LOCALES + topics-taxonomy.json + middleware
// but does NOT add Footer entries here — those land at Track C Batch 1's first es
// (and later first nl) deck publish.
const FOOTER_LANGUAGES: Array<{ code: string; label: string; tier: 1 | 2 | 3 | 4 }> = [
  { code: 'en', label: 'English', tier: 1 },
  { code: 'de', label: 'German', tier: 1 },
  { code: 'es', label: 'Español', tier: 2 },  // Track C Batch 1 (matching cluster × es); first es deck publish — Tier 2 first-row event
  { code: 'nl', label: 'Nederlands', tier: 2 },  // Track C Batch 1 (matching cluster × nl); first nl deck publish — Tier 2 second-row event
  // Tier 3 + Tier 4 added at the Track C animals-theme publish wave (this commission); 5 locales × 28 decks each landed.
  { code: 'sv', label: 'Svenska', tier: 3 },
  { code: 'da', label: 'Dansk', tier: 4 },
  { code: 'fr', label: 'Français', tier: 4 },
  { code: 'it', label: 'Italiano', tier: 4 },
  { code: 'pt', label: 'Português', tier: 4 },
  // Tier 3 (no, fi) added at the no-fi Track C wave: fi at full-app-set first publish; no at first pattern-worksheet publish (no's only deck so far).
  { code: 'fi', label: 'Suomi', tier: 3 },
  { code: 'no', label: 'Norsk', tier: 3 },
];

// "By topic" + "By exercise type" columns per HOMEPAGE-IMPLEMENTATION-PROMPT.md §5.6:
// "List only the topics that have real pages backing them. Don't fabricate links to
// pages that don't exist yet — they'd 404 and erode trust."
//
// Populated in Pass 7b of the taxonomy expansion arc with the non-empty axis-key
// subset per locale, mirroring the operator-curated FOOTER_LANGUAGES pattern.
// "By topic" surfaces theme + educational-level axes (subject-matter discovery);
// "By exercise type" surfaces the exercise-type axis (mechanic discovery) — the
// split mirrors CLAUDE.md §16.5's three-axis schema.
//
// `slug` and `label` are sourced from `frontend/config/topics-taxonomy.json`
// (per-axis-key slug.<locale> + name.<locale>). Update entries when new axis-keys
// gain decks, when new locales' Tier launches, or when taxonomy slugs change.
type FooterLink = { slug: string; label: string };

const FOOTER_TOPICS_BY_LOCALE: Record<string, FooterLink[]> = {
  en: [
    { slug: 'animals', label: 'animals' },
    { slug: 'preschool', label: 'preschool' },
    { slug: 'kindergarten', label: 'kindergarten' },
    { slug: 'grade-1', label: 'grade 1' },
    { slug: 'grade-2', label: 'grade 2' },
  ],
  de: [
    { slug: 'tiere', label: 'Tiere' },
    { slug: 'vorschule', label: 'Vorschule' },
    { slug: 'kindergarten', label: 'Kindergarten' },
    { slug: '1-klasse', label: '1. Klasse' },
    { slug: '2-klasse', label: '2. Klasse' },
  ],
  es: [
    { slug: 'animales', label: 'animal' },
    { slug: 'preescolar', label: 'preescolar' },
    { slug: 'jardin-infantil', label: 'jardín infantil' },
    { slug: 'grado-1', label: 'grado 1' },
    { slug: 'grado-2', label: 'grado 2' },
  ],
  nl: [
    { slug: 'dieren', label: 'dier' },
    { slug: 'peuterklas', label: 'peuterklas' },
    { slug: 'kleuterklas', label: 'kleuterklas' },
    { slug: 'groep-3', label: 'groep 3' },
    { slug: 'groep-4', label: 'groep 4' },
  ],
  // Track C animals-theme publish wave — fr/it/pt/sv/da × 28 decks each landed.
  // Topic axis-keys: animals (theme) + 4 educational-levels (preschool / kindergarten /
  // grade-1 / grade-2; age-ranges 3-5 / 5-7 / 6-8 / 7-9 per §17.8.6 mapping). Slugs
  // and labels sourced from frontend/config/topics-taxonomy.json axes.theme + axes.educational-level.
  fr: [
    { slug: 'animaux', label: 'Animaux' },
    { slug: 'ecole-maternelle-petite-moyenne-section-3-5-ans', label: 'École maternelle (petite/moyenne section, 3-5 ans)' },
    { slug: 'ecole-maternelle-grande-section-5-7-ans', label: 'École maternelle (grande section, 5-7 ans)' },
    { slug: 'cp-cours-preparatoire', label: 'CP (cours préparatoire)' },
    { slug: 'ce1-cours-elementaire-1', label: 'CE1 (cours élémentaire 1)' },
  ],
  it: [
    { slug: 'animali', label: 'Animali' },
    { slug: 'scuola-dell-infanzia-3-5-anni', label: 'Scuola dell\'infanzia (3-5 anni)' },
    { slug: 'scuola-dell-infanzia-5-7-anni', label: 'Scuola dell\'infanzia (5-7 anni)' },
    { slug: 'scuola-primaria-classe-prima', label: 'Scuola primaria classe prima' },
    { slug: 'scuola-primaria-classe-seconda', label: 'Scuola primaria classe seconda' },
  ],
  pt: [
    { slug: 'animais', label: 'Animais' },
    { slug: 'educacao-infantil-creche-3-5-anos', label: 'Educação infantil (creche, 3-5 anos)' },
    { slug: 'educacao-infantil-pre-escola-5-7-anos', label: 'Educação infantil (pré-escola, 5-7 anos)' },
    { slug: '1-ano-fundamental', label: '1º ano do ensino fundamental' },
    { slug: '2-ano-fundamental', label: '2º ano do ensino fundamental' },
  ],
  sv: [
    { slug: 'djur', label: 'Djur' },
    { slug: 'forskola', label: 'Förskola' },
    { slug: 'forskoleklass', label: 'Förskoleklass' },
    { slug: 'arskurs-1', label: 'Årskurs 1' },
    { slug: 'arskurs-2', label: 'Årskurs 2' },
  ],
  da: [
    { slug: 'dyr', label: 'Dyr' },
    { slug: 'bornehave', label: 'Børnehave' },
    { slug: 'bornehaveklasse', label: 'Børnehaveklasse' },
    { slug: '1-klasse', label: '1. klasse' },
    { slug: '2-klasse', label: '2. klasse' },
  ],
  // Finnish first-deck-publish at no-fi Track C wave: full app set landed (29 decks; 13 animals
  // + 16 themeless across 4 educational-levels). Footer entries match the en+de+es+nl pattern.
  fi: [
    { slug: 'elaimet', label: 'Eläimet' },
    { slug: 'varhaiskasvatus', label: 'Varhaiskasvatus' },
    { slug: 'esiopetus', label: 'Esiopetus' },
    { slug: '1-luokka', label: '1. luokka' },
    { slug: '2-luokka', label: '2. luokka' },
  ],
  // Norwegian first-deck-publish at no-fi Track C wave: ONE deck only (pattern-worksheet,
  // themeless, age-range 6-8 → grade-1 axis). Operator-side gap surfaced: no animals were
  // generated for `no` despite commission framing including no in Wave A. Footer entries
  // reflect what's actually browseable — `1-trinn` only; no animals theme entry until
  // `no` animals are published in a follow-up wave.
  no: [
    { slug: '1-trinn', label: '1. trinn' },
  ],
};

const FOOTER_EXERCISE_TYPES_BY_LOCALE: Record<string, FooterLink[]> = {
  en: [
    { slug: 'addition', label: 'addition' },
    { slug: 'alphabet-train', label: 'alphabet train' },
    { slug: 'big-small', label: 'big or small' },
    { slug: 'bingo', label: 'bingo' },
    { slug: 'chart-count', label: 'chart count' },
    { slug: 'code-addition', label: 'code addition' },
    { slug: 'crossword', label: 'crossword' },
    { slug: 'cryptogram', label: 'cryptogram' },
    { slug: 'find-and-count', label: 'find and count' },
    { slug: 'find-objects', label: 'find objects' },
    { slug: 'grid-match', label: 'grid match' },
    { slug: 'matching', label: 'matching' },
    { slug: 'math-puzzle', label: 'math puzzle' },
    { slug: 'math-worksheet', label: 'math worksheet' },
    { slug: 'missing-pieces', label: 'missing pieces' },
    { slug: 'more-less', label: 'more or less' },
    { slug: 'odd-one-out', label: 'odd one out' },
    { slug: 'pattern-train', label: 'pattern train' },
    { slug: 'pattern-worksheet', label: 'pattern worksheet' },
    { slug: 'picture-sort', label: 'picture sort' },
    { slug: 'picture-sudoku', label: 'picture sudoku' },
    { slug: 'picture-trail', label: 'picture trail' },
    { slug: 'prepositions', label: 'prepositions' },
    { slug: 'shadow-match', label: 'shadow match' },
    { slug: 'subtraction', label: 'subtraction' },
    { slug: 'treasure-hunt', label: 'treasure hunt' },
    { slug: 'word-guess', label: 'word guess' },
    { slug: 'word-scramble', label: 'word scramble' },
    { slug: 'wordsearch', label: 'word search' },
  ],
  de: [
    { slug: 'addition', label: 'Addition' },
    { slug: 'buchstabenzug', label: 'Buchstabenzug' },
    { slug: 'gross-klein', label: 'groß oder klein' },
    { slug: 'bingo', label: 'Bingo' },
    { slug: 'tabelle-zaehlen', label: 'Tabelle zählen' },
    { slug: 'code-addition', label: 'Code-Addition' },
    { slug: 'kreuzwortraetsel', label: 'Kreuzworträtsel' },
    { slug: 'kryptogramm', label: 'Kryptogramm' },
    { slug: 'suchen-und-zaehlen', label: 'Suchen und zählen' },
    { slug: 'objekte-finden', label: 'Objekte finden' },
    { slug: 'gitter-zuordnung', label: 'Gitter-Zuordnung' },
    { slug: 'zuordnung', label: 'Zuordnung' },
    { slug: 'mathe-raetsel', label: 'Mathe-Rätsel' },
    { slug: 'mathe-arbeitsblatt', label: 'Mathe-Arbeitsblatt' },
    { slug: 'was-fehlt', label: 'Was fehlt' },
    { slug: 'mehr-weniger', label: 'mehr oder weniger' },
    { slug: 'was-passt-nicht', label: 'Was passt nicht' },
    { slug: 'muster-zug', label: 'Musterzug' },
    { slug: 'muster-arbeitsblatt', label: 'Musterarbeitsblatt' },
    { slug: 'bildpfad', label: 'Bildpfad' },
    { slug: 'bildersortierung', label: 'Bildersortierung' },
    { slug: 'bilder-sudoku', label: 'Bilder-Sudoku' },
    { slug: 'praepositionen', label: 'Präpositionen' },
    { slug: 'schatten-zuordnen', label: 'Schatten zuordnen' },
    { slug: 'subtraktion', label: 'Subtraktion' },
    { slug: 'schatzsuche', label: 'Schatzsuche' },
    { slug: 'wort-raten', label: 'Wort raten' },
    { slug: 'buchstabensalat', label: 'Buchstabensalat' },
    { slug: 'wortsuche', label: 'Wortsuche' },
  ],
  es: [
    { slug: 'tren-del-abecedario', label: 'tren del abecedario' },
    { slug: 'suma-codificada', label: 'suma codificada' },
    { slug: 'empareja-en-cuadricula', label: 'emparejar en cuadrícula' },
    { slug: 'emparejar', label: 'emparejar' },
    { slug: 'rompecabezas-matematico', label: 'rompecabezas matemático' },
    { slug: 'mas-o-menos', label: 'más o menos' },
    { slug: 'clasificar-imagenes', label: 'clasificar imágenes' },
    { slug: 'empareja-sombras', label: 'emparejar sombras' },
    { slug: 'resta', label: 'resta' },
    { slug: 'preposiciones', label: 'preposiciones' },
    { slug: 'adivina-la-palabra', label: 'adivina la palabra' },
    { slug: 'sopa-de-letras', label: 'sopa de letras' },
    { slug: 'grande-pequeno', label: 'grande o pequeño' },
    { slug: 'contar-en-grafico', label: 'contar en gráfico' },
    { slug: 'piezas-faltantes', label: 'piezas faltantes' },
    { slug: 'ficha-de-patrones', label: 'ficha de patrones' },
    { slug: 'el-intruso', label: 'el intruso' },
    { slug: 'busca-y-cuenta', label: 'busca y cuenta' },
    { slug: 'encuentra-los-objetos', label: 'encuentra los objetos' },
    { slug: 'busqueda-del-tesoro', label: 'búsqueda del tesoro' },
    { slug: 'ficha-matematica', label: 'ficha matemática' },
    { slug: 'sendero-de-imagenes', label: 'sendero de imágenes' },
    { slug: 'suma', label: 'suma' },
    { slug: 'bingo', label: 'bingo' },
    { slug: 'crucigrama', label: 'crucigrama' },
    { slug: 'criptograma', label: 'criptograma' },
    { slug: 'tren-de-patrones', label: 'tren de patrones' },
    { slug: 'sudoku-de-imagenes', label: 'sudoku de imágenes' },
    { slug: 'letras-revueltas', label: 'letras revueltas' },
  ],
  nl: [
    { slug: 'koppelen', label: 'koppelen' },
    { slug: 'rooster-koppelen', label: 'rooster koppelen' },
    { slug: 'schaduw-koppelen', label: 'schaduw koppelen' },
    { slug: 'beelden-sorteren', label: 'beelden sorteren' },
    { slug: 'aftrekken', label: 'aftrekken' },
    { slug: 'code-optellen', label: 'code-optellen' },
    { slug: 'meer-minder', label: 'meer of minder' },
    { slug: 'rekenpuzzel', label: 'rekenpuzzel' },
    { slug: 'alfabettrein', label: 'alfabettrein' },
    { slug: 'voorzetsels', label: 'voorzetsels' },
    { slug: 'woord-raden', label: 'woord raden' },
    { slug: 'woordzoeker', label: 'woordzoeker' },
    { slug: 'groot-klein', label: 'groot of klein' },
    { slug: 'grafiek-tellen', label: 'grafiek tellen' },
    { slug: 'ontbrekende-stukken', label: 'ontbrekende stukken' },
    { slug: 'patroon-werkblad', label: 'patroonwerkblad' },
    { slug: 'welke-hoort-niet-thuis', label: 'welke hoort er niet thuis' },
    { slug: 'zoek-en-tel', label: 'zoek en tel' },
    { slug: 'objecten-zoeken', label: 'objecten zoeken' },
    { slug: 'schatzoektocht', label: 'schatzoektocht' },
    { slug: 'rekenwerkblad', label: 'rekenwerkblad' },
    { slug: 'beeldpad', label: 'beeldpad' },
    { slug: 'optellen', label: 'optellen' },
    { slug: 'bingo', label: 'bingo' },
    { slug: 'kruiswoordraadsel', label: 'kruiswoordraadsel' },
    { slug: 'cryptogram', label: 'cryptogram' },
    { slug: 'patroontrein', label: 'patroontrein' },
    { slug: 'foto-sudoku', label: 'foto-sudoku' },
    { slug: 'woordpuzzel', label: 'woordpuzzel' },
  ],
  // Track C animals-theme publish wave — fr/it/pt/sv/da × 28 decks each landed.
  // 28 exercise-types per locale (§14.10 canonical 29 minus pattern-worksheet, which
  // carries a generator-side defect at this wave: theme-field leaks operator User.id;
  // pattern-worksheet excluded uniformly across all 5 locales pending generator fix).
  fr: [
    { slug: 'addition', label: 'addition' },
    { slug: 'train-de-l-alphabet', label: 'train de l\'alphabet' },
    { slug: 'grand-petit', label: 'grand ou petit' },
    { slug: 'loto', label: 'loto' },
    { slug: 'comptage-graphique', label: 'comptage graphique' },
    { slug: 'addition-codee', label: 'addition codée' },
    { slug: 'mots-croises', label: 'mots croisés' },
    { slug: 'cryptogramme', label: 'cryptogramme' },
    { slug: 'trouve-et-compte', label: 'trouve et compte' },
    { slug: 'trouve-les-objets', label: 'trouve les objets' },
    { slug: 'appariement-en-grille', label: 'appariement en grille' },
    { slug: 'appariement', label: 'appariement' },
    { slug: 'puzzle-mathematique', label: 'puzzle mathématique' },
    { slug: 'fiche-de-mathematiques', label: 'fiche de mathématiques' },
    { slug: 'pieces-manquantes', label: 'pièces manquantes' },
    { slug: 'plus-ou-moins', label: 'plus ou moins' },
    { slug: 'l-intrus', label: 'l\'intrus' },
    { slug: 'train-de-modeles', label: 'train de modèles' },
    { slug: 'fiche-de-modeles', label: 'fiche de modèles' },
    { slug: 'parcours-illustre', label: 'parcours illustré' },
    { slug: 'trier-les-images', label: 'trier les images' },
    { slug: 'prepositions', label: 'prépositions' },
    { slug: 'apparier-les-ombres', label: 'apparier les ombres' },
    { slug: 'soustraction', label: 'soustraction' },
    { slug: 'sudoku-illustre', label: 'sudoku illustré' },
    { slug: 'chasse-au-tresor', label: 'chasse au trésor' },
    { slug: 'devine-le-mot', label: 'devine le mot' },
    { slug: 'lettres-melangees', label: 'lettres mélangées' },
    { slug: 'mots-meles', label: 'mots mêlés' },
  ],
  it: [
    { slug: 'addizione', label: 'addizione' },
    { slug: 'treno-dell-alfabeto', label: 'treno dell\'alfabeto' },
    { slug: 'grande-piccolo', label: 'grande o piccolo' },
    { slug: 'bingo', label: 'bingo' },
    { slug: 'conteggio-grafico', label: 'conteggio grafico' },
    { slug: 'addizione-codificata', label: 'addizione codificata' },
    { slug: 'cruciverba', label: 'cruciverba' },
    { slug: 'crittogramma', label: 'crittogramma' },
    { slug: 'trova-e-conta', label: 'trova e conta' },
    { slug: 'trova-gli-oggetti', label: 'trova gli oggetti' },
    { slug: 'abbinamento-griglia', label: 'abbinamento in griglia' },
    { slug: 'abbinamento', label: 'abbinamento' },
    { slug: 'puzzle-matematico', label: 'puzzle matematico' },
    { slug: 'scheda-di-matematica', label: 'scheda di matematica' },
    { slug: 'pezzi-mancanti', label: 'pezzi mancanti' },
    { slug: 'piu-o-meno', label: 'più o meno' },
    { slug: 'l-intruso', label: 'l\'intruso' },
    { slug: 'treno-dei-modelli', label: 'treno dei modelli' },
    { slug: 'scheda-di-modelli', label: 'scheda di modelli' },
    { slug: 'percorso-illustrato', label: 'percorso illustrato' },
    { slug: 'ordina-immagini', label: 'ordina le immagini' },
    { slug: 'preposizioni', label: 'preposizioni' },
    { slug: 'abbina-le-ombre', label: 'abbina le ombre' },
    { slug: 'sottrazione', label: 'sottrazione' },
    { slug: 'sudoku-illustrato', label: 'sudoku illustrato' },
    { slug: 'caccia-al-tesoro', label: 'caccia al tesoro' },
    { slug: 'indovina-la-parola', label: 'indovina la parola' },
    { slug: 'anagrammi', label: 'anagrammi' },
    { slug: 'cerca-parole', label: 'cerca parole' },
  ],
  pt: [
    { slug: 'adicao', label: 'adição' },
    { slug: 'trem-do-alfabeto', label: 'trem do alfabeto' },
    { slug: 'grande-pequeno', label: 'grande ou pequeno' },
    { slug: 'bingo', label: 'bingo' },
    { slug: 'contagem-em-grafico', label: 'contagem em gráfico' },
    { slug: 'adicao-com-codigo', label: 'adição com código' },
    { slug: 'palavras-cruzadas', label: 'palavras cruzadas' },
    { slug: 'criptograma', label: 'criptograma' },
    { slug: 'encontre-e-conte', label: 'encontre e conte' },
    { slug: 'encontre-os-objetos', label: 'encontre os objetos' },
    { slug: 'pareamento-em-grade', label: 'pareamento em grade' },
    { slug: 'pareamento', label: 'pareamento' },
    { slug: 'quebra-cabeca-matematico', label: 'quebra-cabeça matemático' },
    { slug: 'atividade-de-matematica', label: 'atividade de matemática' },
    { slug: 'pecas-faltantes', label: 'peças faltantes' },
    { slug: 'mais-ou-menos', label: 'mais ou menos' },
    { slug: 'qual-e-diferente', label: 'qual é diferente' },
    { slug: 'trem-de-padroes', label: 'trem de padrões' },
    { slug: 'atividade-de-padroes', label: 'atividade de padrões' },
    { slug: 'caminho-ilustrado', label: 'caminho ilustrado' },
    { slug: 'ordenar-imagens', label: 'ordenar imagens' },
    { slug: 'preposicoes', label: 'preposições' },
    { slug: 'pareamento-de-sombras', label: 'pareamento de sombras' },
    { slug: 'subtracao', label: 'subtração' },
    { slug: 'sudoku-ilustrado', label: 'sudoku ilustrado' },
    { slug: 'caca-ao-tesouro', label: 'caça ao tesouro' },
    { slug: 'adivinhe-a-palavra', label: 'adivinhe a palavra' },
    { slug: 'letras-embaralhadas', label: 'letras embaralhadas' },
    { slug: 'caca-palavras', label: 'caça-palavras' },
  ],
  sv: [
    { slug: 'addition', label: 'addition' },
    { slug: 'alfabetstaget', label: 'alfabetståget' },
    { slug: 'stor-liten', label: 'stor eller liten' },
    { slug: 'bingo', label: 'bingo' },
    { slug: 'rakna-i-diagram', label: 'räkna i diagram' },
    { slug: 'kodaddition', label: 'kodaddition' },
    { slug: 'korsord', label: 'korsord' },
    { slug: 'kryptogram', label: 'kryptogram' },
    { slug: 'hitta-och-rakna', label: 'hitta och räkna' },
    { slug: 'hitta-foremalen', label: 'hitta föremålen' },
    { slug: 'rutmatchning', label: 'rutmatchning' },
    { slug: 'matchning', label: 'matchning' },
    { slug: 'mattepussel', label: 'mattepussel' },
    { slug: 'matteblad', label: 'matteblad' },
    { slug: 'saknade-bitar', label: 'saknade bitar' },
    { slug: 'mer-mindre', label: 'mer eller mindre' },
    { slug: 'vilken-passar-inte', label: 'vilken passar inte' },
    { slug: 'monstertaget', label: 'mönstertåget' },
    { slug: 'monsterblad', label: 'mönsterblad' },
    { slug: 'bildvag', label: 'bildväg' },
    { slug: 'sortera-bilder', label: 'sortera bilder' },
    { slug: 'prepositioner', label: 'prepositioner' },
    { slug: 'matcha-skuggor', label: 'matcha skuggor' },
    { slug: 'subtraktion', label: 'subtraktion' },
    { slug: 'bildsudoku', label: 'bildsudoku' },
    { slug: 'skattjakt', label: 'skattjakt' },
    { slug: 'gissa-ordet', label: 'gissa ordet' },
    { slug: 'bokstavspussel', label: 'bokstavspussel' },
    { slug: 'ordleta', label: 'ordleta' },
  ],
  da: [
    { slug: 'addition', label: 'addition' },
    { slug: 'alfabettoget', label: 'alfabettoget' },
    { slug: 'stor-lille', label: 'stor eller lille' },
    { slug: 'bingo', label: 'bingo' },
    { slug: 'tael-i-diagram', label: 'tæl i diagram' },
    { slug: 'kodeaddition', label: 'kodeaddition' },
    { slug: 'krydsord', label: 'krydsord' },
    { slug: 'kryptogram', label: 'kryptogram' },
    { slug: 'find-og-tael', label: 'find og tæl' },
    { slug: 'find-genstandene', label: 'find genstandene' },
    { slug: 'gittermatch', label: 'gittermatch' },
    { slug: 'matchning', label: 'matchning' },
    { slug: 'matematikpuslespil', label: 'matematikpuslespil' },
    { slug: 'matematikark', label: 'matematikark' },
    { slug: 'manglende-brikker', label: 'manglende brikker' },
    { slug: 'mere-mindre', label: 'mere eller mindre' },
    { slug: 'hvilken-passer-ikke', label: 'hvilken passer ikke' },
    { slug: 'monstertoget', label: 'mønstertoget' },
    { slug: 'monsterark', label: 'mønsterark' },
    { slug: 'billedvej', label: 'billedvej' },
    { slug: 'sorter-billeder', label: 'sortér billeder' },
    { slug: 'praepositioner', label: 'præpositioner' },
    { slug: 'match-skygger', label: 'match skygger' },
    { slug: 'subtraktion', label: 'subtraktion' },
    { slug: 'billedsudoku', label: 'billedsudoku' },
    { slug: 'skattejagt', label: 'skattejagt' },
    { slug: 'gaet-ordet', label: 'gæt ordet' },
    { slug: 'bogstavpuslespil', label: 'bogstavpuslespil' },
    { slug: 'ordsoegning', label: 'ordsøgning' },
  ],
  // Finnish full app coverage at no-fi Track C wave (29 decks across all 29 §14.10 apps
  // including pattern-worksheet, which is published themeless per the post-6d49115b
  // generator's "all themes" → null-theme behavior). Slugs and labels sourced verbatim
  // from frontend/config/topics-taxonomy.json axes.exercise-type.<axis-key>.slug.fi /
  // .name.fi to keep Footer entries in lockstep with topic-page routing.
  fi: [
    { slug: 'yhteenlasku', label: 'yhteenlasku' },
    { slug: 'aakkosjuna', label: 'aakkosjuna' },
    { slug: 'iso-pieni', label: 'iso vai pieni' },
    { slug: 'bingo', label: 'bingo' },
    { slug: 'laske-kaaviossa', label: 'laske kaaviossa' },
    { slug: 'koodattu-yhteenlasku', label: 'koodattu yhteenlasku' },
    { slug: 'ristikko', label: 'ristikko' },
    { slug: 'kryptogrammi', label: 'kryptogrammi' },
    { slug: 'etsi-ja-laske', label: 'etsi ja laske' },
    { slug: 'etsi-esineet', label: 'etsi esineet' },
    { slug: 'ruudukkoyhdistys', label: 'ruudukkoyhdistys' },
    { slug: 'yhdistaminen', label: 'yhdistäminen' },
    { slug: 'matematiikkapulma', label: 'matematiikkapulma' },
    { slug: 'matematiikkatehtava', label: 'matematiikkatehtävä' },
    { slug: 'puuttuvat-palat', label: 'puuttuvat palat' },
    { slug: 'enemman-vahemman', label: 'enemmän vai vähemmän' },
    { slug: 'mika-ei-kuulu', label: 'mikä ei kuulu joukkoon' },
    { slug: 'kuviojuna', label: 'kuviojuna' },
    { slug: 'kuviotehtava', label: 'kuviotehtävä' },
    { slug: 'kuvapolku', label: 'kuvapolku' },
    { slug: 'lajittele-kuvat', label: 'lajittele kuvat' },
    { slug: 'prepositiot', label: 'prepositiot' },
    { slug: 'yhdista-varjot', label: 'yhdistä varjot' },
    { slug: 'vahennyslasku', label: 'vähennyslasku' },
    { slug: 'kuvasudoku', label: 'kuvasudoku' },
    { slug: 'aarteenetsinta', label: 'aarteenetsintä' },
    { slug: 'arvaa-sana', label: 'arvaa sana' },
    { slug: 'kirjainsekoitus', label: 'kirjainsekoitus' },
    { slug: 'sanahaku', label: 'sanahaku' },
  ],
  // Norwegian first-deck-publish at no-fi Track C wave: ONE deck only (pattern-worksheet);
  // no animals or other apps generated. Footer reflects what's actually browseable.
  no: [
    { slug: 'monsterark', label: 'mønsterark' },
  ],
};

export function Footer() {
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';
  const t = useTranslations('footer');

  const topics = FOOTER_TOPICS_BY_LOCALE[locale] ?? [];
  const exerciseTypes = FOOTER_EXERCISE_TYPES_BY_LOCALE[locale] ?? [];

  return (
    <footer id="footer" className="bg-cream-50 border-t border-cream-300 py-16 mt-24">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* By language */}
          <div>
            <h4 className="font-display text-sm font-semibold text-ink-900 mb-4">{t('byLanguage')}</h4>
            <ul className="space-y-2 text-sm">
              {FOOTER_LANGUAGES.map(lang => (
                <li key={lang.code}>
                  <Link href={`/${lang.code}`} className="text-ink-600 hover:text-ink-900">
                    {lang.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="text-xs text-ink-500 mt-4">{t('moreLanguagesSoon')}</p>
          </div>

          {/* By topic */}
          <div>
            <h4 className="font-display text-sm font-semibold text-ink-900 mb-4">{t('byTopic')}</h4>
            <ul className="space-y-2 text-sm">
              {topics.map(topic => (
                <li key={topic.slug}>
                  <Link href={`/${locale}/topic/${topic.slug}/`} className="text-ink-600 hover:text-ink-900">
                    {topic.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="text-xs text-ink-500 mt-4">{t('moreTopicsSoon')}</p>
          </div>

          {/* By exercise type */}
          <div>
            <h4 className="font-display text-sm font-semibold text-ink-900 mb-4">{t('byExerciseType')}</h4>
            <ul className="space-y-2 text-sm">
              {exerciseTypes.map(ex => (
                <li key={ex.slug}>
                  <Link href={`/${locale}/topic/${ex.slug}/`} className="text-ink-600 hover:text-ink-900">
                    {ex.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Brand strip */}
        <div className="mt-16 pt-8 border-t border-cream-300 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-sm text-ink-600">{t('copyright')}</p>
          <ul className="flex items-center gap-4 text-sm text-ink-600">
            <li>
              <Link href={`/${locale}/contact`} className="hover:text-ink-900">
                {t('contact')}
              </Link>
            </li>
            <li aria-hidden="true">·</li>
            <li>
              <Link href={`/${locale}/terms`} className="hover:text-ink-900">
                {t('terms')}
              </Link>
            </li>
            <li aria-hidden="true">·</li>
            <li>
              <Link href={`/${locale}/privacy`} className="hover:text-ink-900">
                {t('privacy')}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
