/* Shared `pt` THEMES table for the Brazilian-Portuguese landing fan-out (PART PT).
 * theme axis-key -> { nPl: 3-noun plural example list (pt-BR), gen: plural collective,
 *                     genArt: definite plural article (os|as, gender-agreement-correct),
 *                     h1: display name (verbatim from topics-taxonomy.json name.pt) }.
 *
 * Brazilian Portuguese register throughout (caminhão / ônibus / geladeira / trem /
 * suco / time — NOT pt-PT camião / autocarro / frigorífico). h1 copied VERBATIM from
 * taxonomy name.pt. nPl/gen/genArt authored by a native-pt-BR linguist + K-3 educator;
 * every genArt resolved against its own `gen` collective's gender (os = masculine,
 * as = feminine) and every plural checked against pt-BR rules (-ão→-ões/-ães/-ãos,
 * -l→-is, -m→-ns, -r/-z→-es). assertThemeTable() (pt-render.js) gates article validity
 * at generation time. Used only via pt-render PURE SUBSTITUTION: {N_PL} appears in
 * agreement-free slots (after counting verbs / "com"); the article-bearing form is the
 * stored "{GEN_ART} {GEN}" pair (or the contracted {DE_GEN}/{EM_GEN}/{A_GEN}/{POR_GEN})
 * — never computed.  [NSR-FLAG][pt]
 */
'use strict';

const THEMES = {
  accessories:             { nPl: 'chapéus, cintos e cachecóis',                gen: 'acessórios',              genArt: 'os', h1: 'Acessórios' },
  animals:                 { nPl: 'vacas, ovelhas e galinhas',                  gen: 'animais',                 genArt: 'os', h1: 'Animais' },
  around_the_house:        { nPl: 'luminárias, cadeiras e relógios',            gen: 'objetos da casa',         genArt: 'os', h1: 'Pela casa' },
  at_the_supermarket:      { nPl: 'carrinhos, cestas e prateleiras',            gen: 'coisas do supermercado',  genArt: 'as', h1: 'No supermercado' },
  bakery:                  { nPl: 'pãezinhos, rosquinhas e bolos',              gen: 'produtos de padaria',     genArt: 'os', h1: 'Padaria' },
  beach:                   { nPl: 'baldinhos, pazinhas e estrelas-do-mar',      gen: 'coisas da praia',         genArt: 'as', h1: 'Praia' },
  birds:                   { nPl: 'corujas, patos e pardais',                   gen: 'pássaros',                genArt: 'os', h1: 'Pássaros' },
  birds_2:                 { nPl: 'papagaios, cisnes e corvos',                 gen: 'pássaros',                genArt: 'os', h1: 'Pássaros 2' },
  breakfast:               { nPl: 'ovos, panquecas e bananas',                  gen: 'comidas do café da manhã', genArt: 'as', h1: 'Café da manhã' },
  camping:                 { nPl: 'barracas, lanternas e mochilas',             gen: 'coisas de acampamento',   genArt: 'as', h1: 'Acampamento' },
  christmas:               { nPl: 'árvores, bolas e meias',                     gen: 'coisas de Natal',         genArt: 'as', h1: 'Natal' },
  classroom:               { nPl: 'lápis, livros e globos',                     gen: 'coisas da sala de aula',  genArt: 'as', h1: 'Sala de aula' },
  clothing:                { nPl: 'camisas, meias e chapéus',                   gen: 'peças de roupa',          genArt: 'as', h1: 'Roupas' },
  desserts_and_sweets:     { nPl: 'cupcakes, pirulitos e bolos',                gen: 'doces',                   genArt: 'os', h1: 'Sobremesas e doces' },
  dinosaurs:               { nPl: 'estegossauros, tricerátops e velociraptores', gen: 'dinossauros',            genArt: 'os', h1: 'Dinossauros' },
  easter:                  { nPl: 'ovos, coelhinhos e cestas',                  gen: 'coisas de Páscoa',        genArt: 'as', h1: 'Páscoa' },
  farm_animals:            { nPl: 'vacas, porcos e cabras',                     gen: 'animais da fazenda',      genArt: 'os', h1: 'Animais da fazenda' },
  flowers:                 { nPl: 'tulipas, narcisos e rosas',                  gen: 'flores',                  genArt: 'as', h1: 'Flores' },
  forest_creatures:        { nPl: 'raposas, ursos e ouriços',                   gen: 'animais da floresta',     genArt: 'os', h1: 'Criaturas da floresta' },
  fruits:                  { nPl: 'maçãs, bananas e peras',                     gen: 'frutas',                  genArt: 'as', h1: 'Frutas' },
  furniture:               { nPl: 'sofás, mesas e luminárias',                  gen: 'móveis',                  genArt: 'os', h1: 'Móveis' },
  hospital:                { nPl: 'camas, ataduras e estetoscópios',            gen: 'coisas do hospital',      genArt: 'as', h1: 'Hospital' },
  insects_and_bugs:        { nPl: 'formigas, abelhas e joaninhas',              gen: 'insetos',                 genArt: 'os', h1: 'Insetos e bichos' },
  kitchen_tools:           { nPl: 'colheres, batedores e frigideiras',          gen: 'utensílios de cozinha',   genArt: 'os', h1: 'Utensílios de cozinha' },
  miscellaneous:           { nPl: 'chaves, botões e guarda-chuvas',             gen: 'objetos variados',        genArt: 'os', h1: 'Diversos' },
  music:                   { nPl: 'tambores, sinos e flautas',                  gen: 'instrumentos musicais',   genArt: 'os', h1: 'Música' },
  occupations:             { nPl: 'enfermeiros, pilotos e caixas',              gen: 'profissões',              genArt: 'as', h1: 'Profissões' },
  ocean_life:              { nPl: 'peixes, caranguejos e polvos',               gen: 'animais marinhos',        genArt: 'os', h1: 'Vida marinha' },
  pets:                    { nPl: 'gatos, cachorros e coelhos',                 gen: 'animais de estimação',    genArt: 'os', h1: 'Animais de estimação' },
  post_office:             { nPl: 'cartas, selos e pacotes',                    gen: 'coisas do correio',       genArt: 'as', h1: 'Correios' },
  reptiles_and_amphibians: { nPl: 'sapos, cobras e tartarugas',                 gen: 'répteis e anfíbios',      genArt: 'os', h1: 'Répteis e anfíbios' },
  shapes:                  { nPl: 'círculos, quadrados e triângulos',           gen: 'formas',                  genArt: 'as', h1: 'Formas' },
  space:                   { nPl: 'foguetes, planetas e estrelas',              gen: 'coisas do espaço',        genArt: 'as', h1: 'Espaço' },
  thanksgivinng:           { nPl: 'perus, abóboras e tortas',                   gen: 'coisas do Dia de Ação de Graças', genArt: 'as', h1: 'Dia de Ação de Graças' },
  things_that_fly:         { nPl: 'pipas, aviões e balões',                     gen: 'coisas que voam',         genArt: 'as', h1: 'Coisas que voam' },
  tools:                   { nPl: 'martelos, serrotes e chaves de fenda',       gen: 'ferramentas',             genArt: 'as', h1: 'Ferramentas' },
  toys:                    { nPl: 'bolas, bonecas e robôs',                     gen: 'brinquedos',              genArt: 'os', h1: 'Brinquedos' },
  tree:                    { nPl: 'carvalhos, pinheiros e bétulas',             gen: 'árvores',                 genArt: 'as', h1: 'Árvores' },
  vegetables:              { nPl: 'cenouras, ervilhas e abóboras',              gen: 'vegetais',                genArt: 'os', h1: 'Vegetais' },
  vehicles:                { nPl: 'ônibus, caminhões e escavadeiras',           gen: 'veículos',                genArt: 'os', h1: 'Veículos' },
  zoo_animals:             { nPl: 'leões, zebras e girafas',                    gen: 'animais do zoológico',    genArt: 'os', h1: 'Animais do zoológico' },
  colors:                  { nPl: 'vermelhos, azuis e amarelos',                gen: 'cores',                   genArt: 'as', h1: 'Cores' },
  emotions:                { nPl: 'alegrias, medos e surpresas',                gen: 'emoções',                 genArt: 'as', h1: 'Emoções' },
  body_parts:              { nPl: 'mãos, pés e orelhas',                        gen: 'partes do corpo',         genArt: 'as', h1: 'Partes do corpo' },
  weather:                 { nPl: 'sóis, nuvens e gotas de chuva',              gen: 'imagens do tempo',        genArt: 'as', h1: 'Clima' },
  spring:                  { nPl: 'flores, borboletas e brotos',                gen: 'imagens de primavera',    genArt: 'as', h1: 'Primavera' },
  summer:                  { nPl: 'guarda-sóis, castelos de areia e bolas',     gen: 'imagens de verão',        genArt: 'as', h1: 'Verão' },
  winter:                  { nPl: 'flocos de neve, bonecos de neve e trenós',   gen: 'imagens de inverno',      genArt: 'as', h1: 'Inverno' },
  activities:              { nPl: 'corridas, pulos e danças',                   gen: 'atividades',              genArt: 'as', h1: 'Atividades' },
};

module.exports = THEMES; // direct export (matches it-themes; gen-pt-readiness reads the themes object directly)
