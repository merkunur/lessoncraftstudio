/**
 * Guide Page Slug Configuration
 *
 * This file maps each guide to its language-specific SEO slugs for /guides/ pages.
 * Covers 65 "Create X" guides across 3 subcategories:
 * Platform Guides (20), Product Creation Guides (25), Business Strategy Guides (20).
 *
 * Example:
 * - English: /en/guides/create-addition-worksheets
 */

import { getHreflangCode } from '@/lib/schema-generator';
import { SUPPORTED_LOCALES, SupportedLocale } from '@/config/product-page-slugs';

export { SUPPORTED_LOCALES };
export type { SupportedLocale };

export interface GuideSlugConfig {
  guideId: string;  // Internal guide identifier (= English slug)
  slugs: {
    en: string;
    de?: string;
    fr?: string;
    es?: string;
    it?: string;
    pt?: string;
    nl?: string;
    da?: string;
    sv?: string;
    no?: string;
    fi?: string;
  };
}

/**
 * Guide page slug configuration for all 65 guides.
 * Add language-specific slugs as guide pages are created for each language.
 */
export const guidePageSlugs: GuideSlugConfig[] = [
  // === Platform Guides (20) ===
  { guideId: 'sell-math-worksheets-etsy', slugs: { en: 'sell-math-worksheets-etsy', de: 'mathe-arbeitsblaetter-verkaufen-etsy', fr: 'vendre-fiches-maths-etsy', es: 'vender-fichas-matematicas-etsy', pt: 'vender-fichas-matematica-etsy', it: 'vendere-schede-matematica-etsy', nl: 'reken-werkbladen-verkopen-etsy', sv: 'saelja-mattearbetsblad-etsy' } },
  { guideId: 'sell-word-search-etsy', slugs: { en: 'sell-word-search-etsy', de: 'wortsuche-verkaufen-etsy', fr: 'vendre-mots-caches-etsy', es: 'vender-sopas-letras-etsy', pt: 'vender-caca-palavras-etsy', it: 'vendere-cerca-parole-etsy', nl: 'woordzoekers-verkopen-etsy', sv: 'saelja-ordsoek-etsy' } },
  { guideId: 'start-etsy-printable-shop', slugs: { en: 'start-etsy-printable-shop', de: 'etsy-druckvorlagen-shop-starten', fr: 'ouvrir-boutique-etsy-imprimables', es: 'abrir-tienda-etsy-imprimibles', pt: 'abrir-loja-etsy-imprimiveis', it: 'aprire-negozio-etsy-stampabili', nl: 'etsy-printables-shop-starten', sv: 'starta-etsy-printables-butik' } },
  { guideId: 'create-etsy-coloring-pages', slugs: { en: 'create-etsy-coloring-pages', de: 'etsy-malvorlagen-erstellen', fr: 'creer-coloriages-etsy', es: 'crear-paginas-colorear-etsy', pt: 'criar-paginas-colorir-etsy', it: 'creare-pagine-colorare-etsy', nl: 'etsy-kleurplaten-maken', sv: 'skapa-maelarsidor-etsy' } },
  { guideId: 'sell-educational-printables-etsy', slugs: { en: 'sell-educational-printables-etsy', de: 'lernmaterial-verkaufen-etsy', fr: 'vendre-materiel-pedagogique-etsy', es: 'vender-material-educativo-etsy', pt: 'vender-material-educativo-etsy', it: 'vendere-materiale-didattico-etsy', nl: 'educatief-materiaal-verkopen-etsy', sv: 'saelja-pedagogiskt-material-etsy' } },
  { guideId: 'price-etsy-printables', slugs: { en: 'price-etsy-printables', de: 'etsy-druckvorlagen-preise', fr: 'tarification-imprimables-etsy', es: 'precios-imprimibles-etsy', pt: 'precos-imprimiveis-etsy', it: 'prezzi-stampabili-etsy', nl: 'etsy-printables-prijzen', sv: 'etsy-printables-prissaettning' } },
  { guideId: 'etsy-seo-educational-printables', slugs: { en: 'etsy-seo-educational-printables', de: 'etsy-seo-lernmaterial', fr: 'seo-etsy-materiel-pedagogique', es: 'seo-etsy-material-educativo', pt: 'seo-etsy-material-educativo', it: 'seo-etsy-materiale-didattico', nl: 'seo-etsy-educatief-materiaal', sv: 'seo-etsy-pedagogiskt-material' } },
  { guideId: 'create-etsy-worksheet-bundles', slugs: { en: 'create-etsy-worksheet-bundles', de: 'etsy-arbeitsblatt-pakete-erstellen', fr: 'creer-packs-fiches-etsy', es: 'crear-paquetes-fichas-etsy', pt: 'criar-pacotes-fichas-etsy', it: 'creare-pacchetti-schede-etsy', nl: 'etsy-werkblad-pakketten-maken', sv: 'skapa-etsy-arbetsblad-paket' } },
  { guideId: 'math-activity-books-kdp', slugs: { en: 'math-activity-books-kdp', de: 'mathe-aktivitaetsbuecher-kdp', fr: 'livres-activites-maths-kdp', es: 'libros-actividades-matematicas-kdp', pt: 'livros-atividades-matematica-kdp', it: 'libri-attivita-matematica-kdp', nl: 'reken-activiteitenboeken-kdp', sv: 'matte-aktivitetsboecker-kdp' } },
  { guideId: 'publish-puzzle-books-kdp', slugs: { en: 'publish-puzzle-books-kdp', de: 'raetselbuecher-veroeffentlichen-kdp', fr: 'publier-livres-puzzles-kdp', es: 'publicar-libros-puzzles-kdp', pt: 'publicar-livros-puzzles-kdp', it: 'pubblicare-libri-puzzle-kdp', nl: 'puzzelboeken-uitgeven-kdp', sv: 'publicera-pusselboecker-kdp' } },
  { guideId: 'word-search-books-kdp', slugs: { en: 'word-search-books-kdp', de: 'wortsuchbuecher-kdp', fr: 'livres-mots-caches-kdp', es: 'libros-sopas-letras-kdp', pt: 'livros-caca-palavras-kdp', it: 'libri-cerca-parole-kdp', nl: 'woordzoeker-boeken-kdp', sv: 'ordsoeksboecker-kdp' } },
  { guideId: 'make-money-kdp-activity-books', slugs: { en: 'make-money-kdp-activity-books', de: 'geld-verdienen-kdp-aktivitaetsbuecher', fr: 'gagner-argent-kdp-livres-activites', es: 'ganar-dinero-kdp-libros-actividades', pt: 'ganhar-dinheiro-kdp-livros-atividades', it: 'guadagnare-kdp-libri-attivita', nl: 'geld-verdienen-kdp-activiteitenboeken', sv: 'tjaena-pengar-kdp-aktivitetsboecker' } },
  { guideId: 'kdp-formatting-worksheets', slugs: { en: 'kdp-formatting-worksheets', de: 'kdp-formatierung-arbeitsblaetter', fr: 'formatage-kdp-fiches', es: 'formato-kdp-fichas', pt: 'formatacao-kdp-fichas', it: 'formattazione-kdp-schede', nl: 'kdp-opmaak-werkbladen', sv: 'kdp-formatering-arbetsblad' } },
  { guideId: 'best-kdp-activity-book-niches', slugs: { en: 'best-kdp-activity-book-niches', de: 'beste-kdp-aktivitaetsbuch-nischen', fr: 'meilleures-niches-kdp-livres-activites', es: 'mejores-nichos-kdp-libros-actividades', pt: 'melhores-nichos-kdp-livros-atividades', it: 'migliori-nicchie-kdp-libri-attivita', nl: 'beste-kdp-activiteitenboek-niches', sv: 'baesta-kdp-aktivitetsbok-nischer' } },
  { guideId: 'sudoku-books-kdp', slugs: { en: 'sudoku-books-kdp', de: 'sudoku-buecher-kdp', fr: 'livres-sudoku-kdp', es: 'libros-sudoku-kdp', pt: 'livros-sudoku-kdp', it: 'libri-sudoku-kdp', nl: 'sudoku-boeken-kdp', sv: 'sudoku-boecker-kdp' } },
  { guideId: 'kdp-vs-etsy-printables', slugs: { en: 'kdp-vs-etsy-printables', de: 'kdp-oder-etsy-druckvorlagen', fr: 'kdp-ou-etsy-imprimables', es: 'kdp-o-etsy-imprimibles', pt: 'kdp-ou-etsy-imprimiveis', it: 'kdp-o-etsy-stampabili', nl: 'kdp-of-etsy-printables', sv: 'kdp-eller-etsy-printables' } },
  { guideId: 'create-sell-tpt-resources', slugs: { en: 'create-sell-tpt-resources', de: 'tpt-materialien-erstellen-verkaufen', fr: 'creer-vendre-ressources-tpt', es: 'crear-vender-recursos-tpt', pt: 'criar-vender-recursos-tpt', it: 'creare-vendere-risorse-tpt', nl: 'tpt-materialen-maken-verkopen', sv: 'skapa-saelja-tpt-resurser' } },
  { guideId: 'tpt-store-optimization', slugs: { en: 'tpt-store-optimization', de: 'tpt-shop-optimierung', fr: 'optimisation-boutique-tpt', es: 'optimizacion-tienda-tpt', pt: 'otimizacao-loja-tpt', it: 'ottimizzazione-negozio-tpt', nl: 'tpt-winkel-optimalisatie', sv: 'tpt-butik-optimering' } },
  { guideId: 'sell-printables-gumroad', slugs: { en: 'sell-printables-gumroad', de: 'druckvorlagen-verkaufen-gumroad', fr: 'vendre-imprimables-gumroad', es: 'vender-imprimibles-gumroad', pt: 'vender-imprimiveis-gumroad', it: 'vendere-stampabili-gumroad', nl: 'printables-verkopen-gumroad', sv: 'saelja-printables-gumroad' } },
  { guideId: 'sell-creative-fabrica', slugs: { en: 'sell-creative-fabrica', de: 'verkaufen-creative-fabrica', fr: 'vendre-creative-fabrica', es: 'vender-creative-fabrica', pt: 'vender-creative-fabrica', it: 'vendere-creative-fabrica', nl: 'verkopen-creative-fabrica', sv: 'saelja-creative-fabrica' } },

  // === Product Creation Guides (25) ===
  { guideId: 'create-addition-worksheets', slugs: { en: 'create-addition-worksheets', de: 'additions-arbeitsblaetter-erstellen', fr: 'creer-fiches-addition', es: 'crear-fichas-suma', pt: 'criar-fichas-adicao', it: 'creare-schede-addizione', nl: 'optellen-werkbladen-maken', sv: 'skapa-additions-arbetsblad' } },
  { guideId: 'create-subtraction-worksheets', slugs: { en: 'create-subtraction-worksheets', de: 'subtraktions-arbeitsblaetter-erstellen', fr: 'creer-fiches-soustraction', es: 'crear-fichas-resta', pt: 'criar-fichas-subtracao', it: 'creare-schede-sottrazione', nl: 'aftrekken-werkbladen-maken', sv: 'skapa-subtraktions-arbetsblad' } },
  { guideId: 'create-word-search-puzzles', slugs: { en: 'create-word-search-puzzles', de: 'wortsuche-raetsel-erstellen', fr: 'creer-mots-caches', es: 'crear-sopas-letras', pt: 'criar-caca-palavras', it: 'creare-cerca-parole', nl: 'woordzoekers-maken', sv: 'skapa-ordsoek-pussel' } },
  { guideId: 'create-crossword-puzzles', slugs: { en: 'create-crossword-puzzles', de: 'kreuzwortraetsel-erstellen', fr: 'creer-mots-croises', es: 'crear-crucigramas', pt: 'criar-palavras-cruzadas', it: 'creare-cruciverba', nl: 'kruiswoordpuzzels-maken', sv: 'skapa-korsord' } },
  { guideId: 'create-math-puzzle-worksheets', slugs: { en: 'create-math-puzzle-worksheets', de: 'mathe-raetsel-arbeitsblaetter-erstellen', fr: 'creer-fiches-puzzles-maths', es: 'crear-fichas-puzzles-matematicos', pt: 'criar-fichas-puzzles-matematicos', it: 'creare-schede-puzzle-matematici', nl: 'rekenpuzzel-werkbladen-maken', sv: 'skapa-mattepussel-arbetsblad' } },
  { guideId: 'create-handwriting-sheets', slugs: { en: 'create-handwriting-sheets', de: 'schreibuebungen-erstellen', fr: 'creer-fiches-ecriture', es: 'crear-fichas-escritura', pt: 'criar-fichas-escrita', it: 'creare-schede-scrittura', nl: 'schrijfoefeningen-maken', sv: 'skapa-skrivoevningar' } },
  { guideId: 'create-coloring-pages', slugs: { en: 'create-coloring-pages', de: 'malvorlagen-erstellen', fr: 'creer-pages-coloriage', es: 'crear-paginas-colorear', pt: 'criar-paginas-colorir', it: 'creare-pagine-colorare', nl: 'kleurplaten-maken', sv: 'skapa-maelarsidor' } },
  { guideId: 'create-bingo-cards', slugs: { en: 'create-bingo-cards', de: 'bingo-karten-erstellen', fr: 'creer-cartes-bingo', es: 'crear-tarjetas-bingo', pt: 'criar-cartelas-bingo', it: 'creare-cartelle-bingo', nl: 'bingokaarten-maken', sv: 'skapa-bingokort' } },
  { guideId: 'create-matching-worksheets', slugs: { en: 'create-matching-worksheets', de: 'zuordnungs-arbeitsblaetter-erstellen', fr: 'creer-fiches-association', es: 'crear-fichas-asociacion', pt: 'criar-fichas-associacao', it: 'creare-schede-abbinamento', nl: 'koppel-werkbladen-maken', sv: 'skapa-matchnings-arbetsblad' } },
  { guideId: 'create-pattern-worksheets', slugs: { en: 'create-pattern-worksheets', de: 'muster-arbeitsblaetter-erstellen', fr: 'creer-fiches-sequences-logiques', es: 'crear-fichas-patrones', pt: 'criar-fichas-padroes', it: 'creare-schede-sequenze-logiche', nl: 'patronen-werkbladen-maken', sv: 'skapa-moenster-arbetsblad' } },
  { guideId: 'create-picture-sudoku', slugs: { en: 'create-picture-sudoku', de: 'bilder-sudoku-erstellen', fr: 'creer-sudoku-images', es: 'crear-sudoku-imagenes', pt: 'criar-sudoku-imagens', it: 'creare-sudoku-immagini', nl: 'plaatjes-sudoku-maken', sv: 'skapa-bild-sudoku' } },
  { guideId: 'create-maze-worksheets', slugs: { en: 'create-maze-worksheets', de: 'labyrinth-arbeitsblaetter-erstellen', fr: 'creer-fiches-labyrinthes', es: 'crear-fichas-laberintos', pt: 'criar-fichas-labirintos', it: 'creare-schede-labirinti', nl: 'doolhof-werkbladen-maken', sv: 'skapa-labyrint-arbetsblad' } },
  { guideId: 'create-hidden-object-worksheets', slugs: { en: 'create-hidden-object-worksheets', de: 'suchbilder-arbeitsblaetter-erstellen', fr: 'creer-fiches-objets-caches', es: 'crear-fichas-objetos-ocultos', pt: 'criar-fichas-objetos-ocultos', it: 'creare-schede-oggetti-nascosti', nl: 'zoek-voorwerpen-werkbladen-maken', sv: 'skapa-hitta-foeremaalen-arbetsblad' } },
  { guideId: 'create-size-comparison-worksheets', slugs: { en: 'create-size-comparison-worksheets', de: 'groessenvergleich-arbeitsblaetter-erstellen', fr: 'creer-fiches-comparaison-tailles', es: 'crear-fichas-comparacion-tamanos', pt: 'criar-fichas-comparacao-tamanhos', it: 'creare-schede-confronto-dimensioni', nl: 'groottevergelijking-werkbladen-maken', sv: 'skapa-storleksjaemfoerelse-arbetsblad' } },
  { guideId: 'create-counting-worksheets', slugs: { en: 'create-counting-worksheets', de: 'zaehl-arbeitsblaetter-erstellen', fr: 'creer-fiches-comptage', es: 'crear-fichas-conteo', pt: 'criar-fichas-contagem', it: 'creare-schede-conteggio', nl: 'tel-werkbladen-maken', sv: 'skapa-raekne-arbetsblad' } },
  { guideId: 'create-drawing-worksheets', slugs: { en: 'create-drawing-worksheets', de: 'zeichen-arbeitsblaetter-erstellen', fr: 'creer-fiches-dessin', es: 'crear-fichas-dibujo', pt: 'criar-fichas-desenho', it: 'creare-schede-disegno', nl: 'teken-werkbladen-maken', sv: 'skapa-ritnings-arbetsblad' } },
  { guideId: 'create-sorting-worksheets', slugs: { en: 'create-sorting-worksheets', de: 'sortier-arbeitsblaetter-erstellen', fr: 'creer-fiches-tri', es: 'crear-fichas-clasificacion', pt: 'criar-fichas-classificacao', it: 'creare-schede-classificazione', nl: 'sorteer-werkbladen-maken', sv: 'skapa-sorterings-arbetsblad' } },
  { guideId: 'create-shadow-matching-worksheets', slugs: { en: 'create-shadow-matching-worksheets', de: 'schatten-zuordnung-arbeitsblaetter-erstellen', fr: 'creer-fiches-discrimination-visuelle', es: 'crear-fichas-discriminacion-visual', pt: 'criar-fichas-discriminacao-visual', it: 'creare-schede-discriminazione-visiva', nl: 'schaduw-koppelen-werkbladen-maken', sv: 'skapa-skuggmatchning-arbetsblad' } },
  { guideId: 'create-odd-one-out-puzzles', slugs: { en: 'create-odd-one-out-puzzles', de: 'was-passt-nicht-raetsel-erstellen', fr: 'creer-fiches-intrus', es: 'crear-fichas-intruso', pt: 'criar-fichas-intruso', it: 'creare-schede-intruso', nl: 'wat-hoort-er-niet-bij-maken', sv: 'skapa-hitta-udda-pussel' } },
  { guideId: 'create-missing-pieces-puzzles', slugs: { en: 'create-missing-pieces-puzzles', de: 'fehlende-teile-raetsel-erstellen', fr: 'creer-puzzles-pieces-manquantes', es: 'crear-puzzles-piezas-faltantes', pt: 'criar-puzzles-pecas-faltantes', it: 'creare-puzzle-pezzi-mancanti', nl: 'ontbrekende-stukjes-puzzels-maken', sv: 'skapa-saknade-bitar-pussel' } },
  { guideId: 'create-treasure-hunt-worksheets', slugs: { en: 'create-treasure-hunt-worksheets', de: 'schatzsuche-arbeitsblaetter-erstellen', fr: 'creer-fiches-chasse-au-tresor', es: 'crear-fichas-busqueda-tesoro', pt: 'criar-fichas-caca-tesouro', it: 'creare-schede-caccia-tesoro', nl: 'schattenjacht-werkbladen-maken', sv: 'skapa-skattjakt-arbetsblad' } },
  { guideId: 'create-alphabet-worksheets', slugs: { en: 'create-alphabet-worksheets', de: 'alphabet-arbeitsblaetter-erstellen', fr: 'creer-fiches-alphabet', es: 'crear-fichas-abecedario', pt: 'criar-fichas-alfabeto', it: 'creare-schede-alfabeto', nl: 'alfabet-werkbladen-maken', sv: 'skapa-alfabet-arbetsblad' } },
  { guideId: 'create-preposition-worksheets', slugs: { en: 'create-preposition-worksheets', de: 'praepositionen-arbeitsblaetter-erstellen', fr: 'creer-fiches-prepositions', es: 'crear-fichas-preposiciones', pt: 'criar-fichas-preposicoes', it: 'creare-schede-preposizioni', nl: 'voorzetsels-werkbladen-maken', sv: 'skapa-prepositioner-arbetsblad' } },
  { guideId: 'create-cryptogram-puzzles', slugs: { en: 'create-cryptogram-puzzles', de: 'kryptogramm-raetsel-erstellen', fr: 'creer-cryptogrammes', es: 'crear-criptogramas', pt: 'criar-criptogramas', it: 'creare-crittogrammi', nl: 'cryptogrammen-maken', sv: 'skapa-kryptogram' } },
  { guideId: 'create-chart-count-worksheets', slugs: { en: 'create-chart-count-worksheets', de: 'bilddiagramm-arbeitsblaetter-erstellen', fr: 'creer-fiches-graphiques-images', es: 'crear-fichas-graficos-imagenes', pt: 'criar-fichas-graficos-imagens', it: 'creare-schede-grafici-immagini', nl: 'telgrafiek-werkbladen-maken', sv: 'skapa-bilddiagram-arbetsblad' } },

  // === Business Strategy Guides (20) ===
  { guideId: 'create-worksheet-bundles', slugs: { en: 'create-worksheet-bundles', de: 'arbeitsblatt-pakete-erstellen', fr: 'creer-packs-fiches-exercices', es: 'crear-paquetes-fichas-ejercicios', pt: 'criar-pacotes-fichas-exercicios', it: 'creare-pacchetti-schede-esercizi', nl: 'werkblad-pakketten-maken', sv: 'skapa-arbetsblad-paket' } },
  { guideId: 'niche-selection-printables', slugs: { en: 'niche-selection-printables', de: 'nischen-auswahl-druckvorlagen', fr: 'choix-niche-imprimables', es: 'seleccion-nicho-imprimibles', pt: 'selecao-nicho-imprimiveis', it: 'selezione-nicchia-stampabili', nl: 'niche-selectie-printables', sv: 'nischval-printables' } },
  { guideId: 'create-printable-product-line', slugs: { en: 'create-printable-product-line', de: 'druckvorlagen-produktlinie-erstellen', fr: 'creer-gamme-produits-imprimables', es: 'crear-linea-productos-imprimibles', pt: 'criar-linha-produtos-imprimiveis', it: 'creare-linea-prodotti-stampabili', nl: 'printable-productlijn-maken', sv: 'skapa-utskriftsbar-produktlinje' } },
  { guideId: 'pricing-educational-printables', slugs: { en: 'pricing-educational-printables', de: 'preisgestaltung-lernmaterial', fr: 'tarification-materiel-pedagogique', es: 'precios-material-educativo', pt: 'precos-material-educativo', it: 'prezzi-materiale-didattico', nl: 'prijzen-educatief-materiaal', sv: 'prissaettning-pedagogiskt-material' } },
  { guideId: 'scale-printable-business-guide', slugs: { en: 'scale-printable-business-guide', de: 'druckvorlagen-geschaeft-skalieren-anleitung', fr: 'guide-developper-activite-imprimables', es: 'guia-escalar-negocio-imprimibles', pt: 'guia-escalar-negocio-imprimiveis', it: 'guida-scalare-attivita-stampabili', nl: 'gids-printable-bedrijf-opschalen', sv: 'guide-skala-upp-printable-foeretag' } },
  { guideId: 'passive-income-worksheets', slugs: { en: 'passive-income-worksheets', de: 'passives-einkommen-arbeitsblaetter', fr: 'revenus-passifs-fiches-exercices', es: 'ingresos-pasivos-fichas-ejercicios', pt: 'rendimentos-passivos-fichas', it: 'reddito-passivo-schede-esercizi', nl: 'passief-inkomen-werkbladen', sv: 'passiv-inkomst-arbetsblad' } },
  { guideId: 'understanding-commercial-licenses', slugs: { en: 'understanding-commercial-licenses', de: 'kommerzielle-lizenzen-verstehen', fr: 'comprendre-licences-commerciales', es: 'entender-licencias-comerciales', pt: 'entender-licencas-comerciais', it: 'comprendere-licenze-commerciali', nl: 'commerciele-licenties-begrijpen', sv: 'foerstaa-kommersiella-licenser' } },
  { guideId: 'research-profitable-niches', slugs: { en: 'research-profitable-niches', de: 'profitable-nischen-recherchieren', fr: 'rechercher-niches-rentables', es: 'investigar-nichos-rentables', pt: 'pesquisar-nichos-rentaveis', it: 'ricercare-nicchie-redditizie', nl: 'winstgevende-niches-onderzoeken', sv: 'undersoek-loenesamma-nischer' } },
  { guideId: 'multilingual-printable-business', slugs: { en: 'multilingual-printable-business', de: 'mehrsprachiges-druckvorlagen-geschaeft', fr: 'activite-imprimables-multilingue', es: 'negocio-imprimibles-multilingue', pt: 'negocio-imprimiveis-multilingue', it: 'attivita-stampabili-multilingue', nl: 'meertalig-printable-bedrijf', sv: 'flersprakigt-printable-foeretag' } },
  { guideId: 'worksheets-multiple-languages', slugs: { en: 'worksheets-multiple-languages', de: 'arbeitsblaetter-mehrere-sprachen', fr: 'fiches-exercices-plusieurs-langues', es: 'fichas-ejercicios-varios-idiomas', pt: 'fichas-exercicios-varios-idiomas', it: 'schede-esercizi-piu-lingue', nl: 'werkbladen-meerdere-talen', sv: 'arbetsblad-flera-spraak' } },
  { guideId: 'copyright-printable-sellers', slugs: { en: 'copyright-printable-sellers', de: 'urheberrecht-druckvorlagen-verkaeufer', fr: 'droits-auteur-vendeurs-imprimables', es: 'derechos-autor-vendedores-imprimibles', pt: 'direitos-autor-vendedores-imprimiveis', it: 'diritto-autore-venditori-stampabili', nl: 'auteursrecht-printable-verkopers', sv: 'upphovsraett-printable-saeljare' } },
  { guideId: 'customer-support-digital-products', slugs: { en: 'customer-support-digital-products', de: 'kundensupport-digitale-produkte', fr: 'support-client-produits-numeriques', es: 'soporte-cliente-productos-digitales', pt: 'suporte-cliente-produtos-digitais', it: 'supporto-clienti-prodotti-digitali', nl: 'klantenservice-digitale-producten', sv: 'kundsupport-digitala-produkter' } },
  { guideId: 'automate-printable-business', slugs: { en: 'automate-printable-business', de: 'druckvorlagen-geschaeft-automatisieren', fr: 'automatiser-activite-imprimables', es: 'automatizar-negocio-imprimibles', pt: 'automatizar-negocio-imprimiveis', it: 'automatizzare-attivita-stampabili', nl: 'printable-bedrijf-automatiseren', sv: 'automatisera-printable-foeretag' } },
  { guideId: 'social-media-printable-marketing', slugs: { en: 'social-media-printable-marketing', de: 'social-media-druckvorlagen-marketing', fr: 'marketing-reseaux-sociaux-imprimables', es: 'marketing-redes-sociales-imprimibles', pt: 'marketing-redes-sociais-imprimiveis', it: 'marketing-social-media-stampabili', nl: 'social-media-printable-marketing', sv: 'sociala-medier-printable-marknadsforing' } },
  { guideId: 'pinterest-marketing-worksheets', slugs: { en: 'pinterest-marketing-worksheets', de: 'pinterest-marketing-arbeitsblaetter', fr: 'marketing-pinterest-fiches', es: 'marketing-pinterest-fichas', pt: 'marketing-pinterest-fichas', it: 'marketing-pinterest-schede', nl: 'pinterest-marketing-werkbladen', sv: 'pinterest-marknadsforing-arbetsblad' } },
  { guideId: 'email-marketing-printables', slugs: { en: 'email-marketing-printables', de: 'email-marketing-druckvorlagen', fr: 'email-marketing-imprimables', es: 'email-marketing-imprimibles', pt: 'email-marketing-imprimiveis', it: 'email-marketing-stampabili', nl: 'email-marketing-printables', sv: 'epost-marknadsforing-printables' } },
  { guideId: 'get-reviews-printable-products', slugs: { en: 'get-reviews-printable-products', de: 'bewertungen-druckvorlagen-produkte', fr: 'obtenir-avis-produits-imprimables', es: 'obtener-resenas-productos-imprimibles', pt: 'obter-avaliacoes-produtos-imprimiveis', it: 'ottenere-recensioni-prodotti-stampabili', nl: 'reviews-printable-producten', sv: 'faa-recensioner-printable-produkter' } },
  { guideId: 'seasonal-marketing-printables', slugs: { en: 'seasonal-marketing-printables', de: 'saisonales-marketing-druckvorlagen', fr: 'marketing-saisonnier-imprimables', es: 'marketing-estacional-imprimibles', pt: 'marketing-sazonal-imprimiveis', it: 'marketing-stagionale-stampabili', nl: 'seizoensmarketing-printables', sv: 'saesongs-marknadsforing-printables' } },
  { guideId: 'digital-vs-physical-printables', slugs: { en: 'digital-vs-physical-printables', de: 'digital-oder-physisch-druckvorlagen', fr: 'numerique-ou-physique-imprimables', es: 'digital-o-fisico-imprimibles', pt: 'digital-ou-fisico-imprimiveis', it: 'digitale-o-fisico-stampabili', nl: 'digitaal-of-fysiek-printables', sv: 'digitalt-eller-fysiskt-printables' } },
  { guideId: 'quality-standards-worksheets', slugs: { en: 'quality-standards-worksheets', de: 'qualitaetsstandards-arbeitsblaetter', fr: 'normes-qualite-fiches-exercices', es: 'estandares-calidad-fichas-ejercicios', pt: 'padroes-qualidade-fichas-exercicios', it: 'standard-qualita-schede-esercizi', nl: 'kwaliteitsnormen-werkbladen', sv: 'kvalitetsstandard-arbetsblad' } },
];

/**
 * Get the slug for a specific guide and locale
 */
export function getGuideSlugForLocale(guideId: string, locale: SupportedLocale): string | undefined {
  const config = guidePageSlugs.find(c => c.guideId === guideId);
  if (!config) return undefined;
  return config.slugs[locale] || config.slugs.en; // Fallback to English
}

/**
 * Get the guide config from any slug (in any language)
 */
export function getGuideConfigBySlug(slug: string): { guideId: string; locale: SupportedLocale } | undefined {
  for (const config of guidePageSlugs) {
    for (const [locale, localeSlug] of Object.entries(config.slugs)) {
      if (localeSlug === slug) {
        return { guideId: config.guideId, locale: locale as SupportedLocale };
      }
    }
  }
  return undefined;
}

/**
 * Get all slugs for all locales (for generateStaticParams)
 */
export function getAllGuidePageSlugs(): { locale: SupportedLocale; slug: string }[] {
  const result: { locale: SupportedLocale; slug: string }[] = [];

  for (const config of guidePageSlugs) {
    for (const [locale, slug] of Object.entries(config.slugs)) {
      if (slug) {
        result.push({ locale: locale as SupportedLocale, slug });
      }
    }
  }

  return result;
}

/**
 * Get alternate language URLs for hreflang tags
 * Uses regional hreflang codes for pt-BR and es-MX
 */
export function getGuideAlternateUrls(guideId: string, baseUrl: string = 'https://www.lessoncraftstudio.com'): Record<string, string> {
  const config = guidePageSlugs.find(c => c.guideId === guideId);
  if (!config) return {};

  const alternates: Record<string, string> = {};
  for (const [locale, slug] of Object.entries(config.slugs)) {
    if (slug) {
      const hreflangCode = getHreflangCode(locale);
      alternates[hreflangCode] = `${baseUrl}/${locale}/guides/${slug}`;
    }
  }

  // Add x-default pointing to English version for unspecified regions
  if (alternates['en']) {
    alternates['x-default'] = alternates['en'];
  }

  return alternates;
}

/**
 * Check if a slug exists for a specific locale
 */
export function hasGuidePage(slug: string, locale: SupportedLocale): boolean {
  const config = getGuideConfigBySlug(slug);
  if (!config) return false;

  const guideConfig = guidePageSlugs.find(c => c.guideId === config.guideId);
  return guideConfig?.slugs[locale] === slug;
}
