/**
 * data/hmx/text-src/pt.js — Brazilian Portuguese words of the Maze Puzzles Level Set scenes (2026-10-12).
 * NOUNS: the noun with its definite article ('o ouriço', 'a macieira', 'as uvas'); ao/à, do/da are read off the article.
 * pt-BR usage as in the published face strings (pipa, balde, guincho, "até a" without crase). Templates: strings.pt.json.
 */
'use strict';
const NOUNS = {
  'lamb': 'o cordeirinho', 'haystack': 'o monte de feno', 'pig': 'o porquinho', 'mud puddle': 'a poça de lama', 'ox': 'o boi', 'apple basket': 'a cesta de maçãs',
  'snail': 'o caracol', 'strawberry': 'o morango', 'boy on the bike': 'o menino de bicicleta', 'slide': 'o escorregador', 'duck': 'o pato', 'bread': 'o pão',
  'squirrel': 'o esquilo', 'pine cone': 'a pinha', 'mouse': 'o ratinho', 'pumpkin': 'a abóbora', 'sloth': 'a preguiça', 'tree': 'a árvore',
  'zebra': 'a zebra', 'elephant': 'o elefante', 'camel': 'o camelo', 'palm tree': 'o coqueiro', 'sea turtle': 'a tartaruga-marinha', 'sea': 'o mar',
  'girl on the sled': 'a menina no trenó', 'cabin': 'a cabana', 'seal': 'a foca', 'hole in the ice': 'o buraco no gelo', 'hiker': 'a trilheira', 'tent': 'a barraca',
  'owl': 'a coruja', 'oak tree': 'o carvalho', 'mail carrier': 'o carteiro', 'mailbox': 'a caixa de correio', 'bunny': 'o coelhinho', 'Easter basket': 'a cesta de Páscoa',
  'firefighter': 'o bombeiro', 'fire truck': 'o caminhão de bombeiros', 'seagull': 'a gaivota', 'fish': 'o peixe', 'raccoon': 'o guaxinim', 'cooler': 'a caixa de isopor',
  'triceratops': 'o tricerátopo', 'big tree': 'a árvore grande', 'farmer': 'o fazendeiro', 'tractor': 'o trator', 'astronaut': 'o astronauta', 'rocket': 'o foguete',
  'pufferfish': 'o baiacu', 'shell': 'a concha', 'robot': 'o robô', 'ice cream': 'o sorvete', 'donkey': 'o burro', 'carrot': 'a cenoura',
  'beaver': 'o castor', 'log': 'o tronco', 'turkey': 'o peru', 'corn': 'a espiga de milho', 'skier': 'a esquiadora', 'snowman': 'o boneco de neve',
  'swan': 'o cisne', 'nest': 'o ninho', 'macaw': 'a arara', 'banana': 'a banana', 'fox': 'a raposa', 'lantern': 'a lanterna',
  'hamster': 'o hamster', 'apple': 'a maçã', 'kitten': 'o gatinho', 'milk': 'o leite', 'crab': 'o caranguejo', 'beach ball': 'a bola de praia',
  'ladybug': 'a joaninha', 'sunflower': 'o girassol', 'penguin': 'o pinguim', 'igloo': 'o iglu', 'turtle': 'a tartaruga', 'flower': 'a flor',
  'girl': 'a menina', 'swing': 'o balanço', 'chick': 'o pintinho', 'egg': 'o ovo', 'horse': 'o cavalo', 'hen': 'a galinha',
  'toy dinosaur': 'o dinossauro de brinquedo', 'cake': 'o bolo', 'bird': 'o passarinho', 'birdhouse': 'a casinha de passarinho', 'monkey': 'o macaco', 'rabbit': 'o coelho',
  'cabbage': 'o repolho', 'seahorse': 'o cavalo-marinho', 'seaweed': 'a alga', 'badger': 'o texugo', 'chestnut tree': 'o castanheiro', 'Santa': 'o Papai Noel',
  'sleigh': 'o trenó', 'llama': 'a lhama', 'rhino': 'o rinoceronte', 'hippo': 'o hipopótamo', 'tortoise': 'o jabuti', 'watermelon': 'a melancia',
  'dinosaur': 'o dinossauro', 'bear': 'o urso', 'honey': 'o mel', 'pelican': 'o pelicano', 'boat': 'o barco', 'garbage truck': 'o caminhão de lixo',
  'trash can': 'a lixeira', 'canoe': 'a canoa', 'kayak': 'o caiaque', 'ship': 'o navio', 'lighthouse': 'o farol', 'sailboat': 'o veleiro', 'island': 'a ilha',
  'beach hut': 'a cabana de praia', 'frog': 'o sapo', 'puffin': 'o papagaio-do-mar', 'lifeguard tower': 'o posto do salva-vidas', 'house': 'a casa', 'goose': 'o ganso',
  'cheese': 'o queijo', 'earthworm': 'a minhoca', 'leaf': 'a folha', 'gopher': 'o esquilo-da-terra', 'potato': 'a batata', 'gerbil': 'o gerbil', 'blueberry': 'o mirtilo',
  'meerkat': 'o suricato', 'ferret': 'o furão', 'ball': 'a bola', 'chipmunk': 'o tâmia', 'acorn': 'a bolota', 'ambulance': 'a ambulância', 'doctor': 'o médico',
  'bus': 'o ônibus', 'boy': 'o menino', 'jeep': 'o jipe', 'surfboard': 'a prancha de surfe', 'motorcycle': 'a moto', 'garage': 'a garagem', 'van': 'a van',
  'package': 'o pacote', 'cement mixer': 'a betoneira', 'builder': 'o pedreiro', 'truck': 'o caminhão', 'forklift': 'a empilhadeira', 'race car': 'o carro de corrida',
  'mechanic': 'o mecânico', 'bee': 'a abelha', 'little girl': 'a menininha', 'basket': 'a cesta', 'foal': 'o potro', 'porcupine': 'o porco-espinho', 'apple tree': 'a macieira',
  'hummingbird': 'o beija-flor', 'cherry tree': 'a cerejeira', 'guinea pig': 'o porquinho-da-índia', 'bowl': 'a tigela', 'moon': 'a lua', 'lemur': 'o lêmure', 'elf': 'o duende',
  'sack': 'o saco de presentes', 'sandcastle': 'o castelo de areia', 'duckling': 'o patinho', 'puddle': 'a poça', 'coral': 'o coral', 'planet': 'o planeta',
  'snowboarder': 'o snowboarder', 'hot cocoa': 'o chocolate quente', 'butterfly': 'a borboleta', 'rose': 'a rosa', 'water lily': 'a vitória-régia', 'radish': 'o rabanete',
  'toy car': 'o carrinho', 'little dinosaur': 'o dinossaurinho', 'ant': 'a formiga', 'cookie': 'o biscoito', 'gazelle': 'a gazela', 'baobab tree': 'o baobá',
  'caterpillar': 'a lagarta', 'toad': 'o sapo-cururu', 'dragonfly': 'a libélula', 'Earth': 'a Terra', 'teddy bear': 'o ursinho de pelúcia', 'cupcake': 'o bolinho', 'airplane': 'o avião',
  'rainbow': 'o arco-íris', 'helicopter': 'o helicóptero', 'mountain': 'a montanha', 'submarine': 'o submarino', 'whale': 'a baleia', 'toy train': 'o trenzinho',
  'camper': 'o trailer', 'bike': 'a bicicleta', 'playground': 'o parquinho', 'dragon': 'o dragão', 'campfire': 'a fogueira', 'flying horse': 'o cavalo voador',
  'sun': 'o sol', 'oyster': 'a ostra', 'monster truck': 'a caminhonete gigante', 'big rock': 'a pedra grande', 'octopus': 'o polvo', 'flamingo': 'o flamingo',
  'stork': 'a cegonha', 'parrot': 'o papagaio', 'grapes': 'as uvas', 'koala': 'o coala', 'kangaroo': 'o canguru', 'bull': 'o touro', 'turnip': 'o nabo', 'cow': 'a vaca',
  'clover': 'o trevo', 'deer': 'o cervo', 'bluebells': 'as campânulas', 'dog': 'o cachorro', 'digger': 'a escavadeira', 'rock': 'a pedra', 'scooter': 'a motoneta',
  'jet': 'o jato', 'cloud': 'a nuvem', 'eagle': 'a águia', 'manatee': 'o peixe-boi', 'pineapple': 'o abacaxi', 'Christmas tree': 'a árvore de Natal',
  'toy helicopter': 'o helicóptero de brinquedo', 'blocks': 'os blocos', 'bison': 'o bisão', 'wheat': 'o trigo', 'sheep': 'a ovelha', 'grass': 'a grama',
  'moose': 'o alce', 'birch tree': 'a bétula', 'leopard': 'o leopardo', 'alligator': 'o jacaré', 'goat': 'a cabra', 'lettuce': 'a alface', 'tall tree': 'a árvore alta',
  'peacock': 'o pavão', 'hat': 'o chapéu', 'doll': 'a boneca', 'pudding': 'o pudim', 'reindeer': 'a rena', 'bell': 'o sino', 'chinchilla': 'a chinchila',
  'raspberry': 'a framboesa', 'squid': 'a lula', 'cat': 'o gato', 'walnut tree': 'a nogueira', 'bulldozer': 'o trator de esteira', 'sand pile': 'o monte de areia',
  'toy truck': 'o caminhãozinho', 'ferry': 'a balsa', 'train': 'o trem', 'backpack': 'a mochila', 'banana tree': 'a bananeira', 'orange tree': 'a laranjeira',
  'cherry blossom': 'a cerejeira em flor', 'tiger': 'o tigre', 'toucan': 'o tucano', 'panda': 'o panda', 'barn': 'o celeiro', 'hay': 'o feno', 'mushroom': 'o cogumelo',
  'pyramid': 'a pirâmide', 'umbrella': 'o guarda-chuva', 'starfish': 'a estrela-do-mar', 'vegetables': 'os legumes', 'hedgehog': 'o ouriço',
};
const COLLECT = { // [todas as …, cada …, faltou …]
  'hmx-collect-acorns': ['todas as bolotas', 'cada bolota', 'Faltou uma bolota.'], 'hmx-collect-flowers': ['todos os girassóis', 'cada girassol', 'Faltou um girassol.'],
  'hmx-collect-corn': ['todas as espigas de milho', 'cada espiga de milho', 'Faltou uma espiga de milho.'], 'hmx-collect-fish': ['todos os peixes', 'cada peixe', 'Faltou um peixe.'],
  'hmx-collect-shells': ['todas as conchas', 'cada concha', 'Faltou uma concha.'], 'hmx-collect-strawberries': ['todos os morangos', 'cada morango', 'Faltou um morango.'],
  'hmx-collect-stars': ['todas as estrelas', 'cada estrela', 'Faltou uma estrela.'], 'hmx-collect-bananas': ['todas as bananas', 'cada banana', 'Faltou uma banana.'],
  'hmx-collect-presents': ['todos os presentes', 'cada presente', 'Faltou um presente.'], 'hmx-collect-eggs': ['todos os ovos de Páscoa', 'cada ovo de Páscoa', 'Faltou um ovo de Páscoa.'],
  'hmx-collect-apples': ['todas as maçãs', 'cada maçã', 'Faltou uma maçã.'], 'hmx-collect-hibiscus': ['todas as flores', 'cada flor', 'Faltou uma flor.'],
};
const AVOID = { // [desvia d…, nenhum A nem por nenhum B, um A ou um B]
  'hmx-avoid-duckling': ['da raposa', 'nenhuma raposa nem por nenhuma cobra', 'uma raposa ou uma cobra'], 'hmx-avoid-fish': ['do tubarão', 'nenhum tubarão nem por nenhuma água-viva', 'um tubarão ou uma água-viva'],
  'hmx-avoid-rocket': ['dos asteroides', 'nenhum asteroide nem por nenhum meteoro', 'um asteroide ou um meteoro'], 'hmx-avoid-snowboard': ['das pedras', 'nenhuma pedra nem por nenhuma árvore', 'uma pedra ou uma árvore'],
  'hmx-avoid-butterfly': ['da aranha', 'nenhuma aranha nem por nenhuma vespa', 'uma aranha ou uma vespa'], 'hmx-avoid-frog': ['da garça', 'nenhuma garça nem por nenhum jacaré', 'uma garça ou um jacaré'],
  'hmx-avoid-rabbit': ['do gavião', 'nenhum gavião nem por nenhum lobo', 'um gavião ou um lobo'], 'hmx-avoid-toycar': ['das poças', 'nenhuma poça nem por nenhum monte de pedras', 'uma poça ou um monte de pedras'],
  'hmx-avoid-raptor': ['do tiranossauro', 'nenhum tiranossauro nem por nenhum monte de pedras', 'um tiranossauro ou um monte de pedras'], 'hmx-avoid-penguin': ['da orca', 'nenhuma orca nem por nenhum buraco no gelo', 'uma orca ou um buraco'],
  'hmx-avoid-ant': ['da aranha', 'nenhuma poça nem por nenhuma aranha', 'uma poça ou uma aranha'], 'hmx-avoid-gazelle': ['do leopardo', 'nenhum leopardo nem por nenhuma hiena', 'um leopardo ou uma hiena'],
};
const HOP = { 'hmx-hop-frog': 'pelas folhas da lagoa', 'hmx-hop-penguin': 'pelos blocos de gelo', 'hmx-hop-caterpillar': 'pelas pedras do jardim', 'hmx-hop-astronaut': 'pelo espaço', 'hmx-hop-teddy': 'pelos doces', 'hmx-hop-fox': 'pelas folhas de outono' };
const COLOUR = { 'hmx-colour-pig': ['a fazenda', 'o desenho da fazenda'], 'hmx-colour-horse': ['o campo', 'o desenho do campo'], 'hmx-colour-monkey': ['a selva', 'o desenho da selva'],
  'hmx-colour-penguin': ['o gelo', 'o desenho do gelo'], 'hmx-colour-hedgehog': ['o campinho', 'o desenho do campinho'], 'hmx-colour-turtle': ['a praia', 'o desenho da praia'],
  'hmx-colour-squirrel': ['a floresta', 'o desenho da floresta'], 'hmx-colour-camel': ['o deserto', 'o desenho do deserto'], 'hmx-colour-frog': ['o dia de chuva', 'o desenho da chuva'],
  'hmx-colour-octopus': ['o mar', 'o desenho do mar'], 'hmx-colour-bee': ['o jardim', 'o desenho do jardim'], 'hmx-colour-dog': ['a casa', 'o desenho da casa'],
  'hmx-colour-rocket': ['o espaço', 'o desenho do espaço'], 'hmx-colour-ambulance': ['a cidade', 'o desenho da cidade'], 'hmx-colour-snowman': ['o inverno', 'o desenho de inverno'],
  'hmx-colour-tractor': ['a colheita', 'o desenho da colheita'] };
const BABIES = { 'hmx-babies-meadow': 'no campo', 'hmx-babies-sunset': 'ao pôr do sol', 'hmx-babies-snow': 'na neve', 'hmx-babies-orchard': 'no pomar', 'hmx-babies-spring': 'na primavera', 'hmx-babies-wheat': 'no trigal' };
const STRINGS = { farm: 'na fazenda', beach: 'na praia', snow: 'na neve', savanna: 'na savana', pets: 'no parque', dinos: 'com os dinossauros', forest: 'na floresta', kids: 'no parquinho', jungle: 'na selva' };
const CUE = { 'hmx-sound-leopard': 'leopardo', 'hmx-sound-tiger': 'tigre', 'hmx-sound-toucan': 'tucano', 'hmx-sound-tractor': 'trator', 'hmx-sound-panda': 'panda', 'hmx-sound-pelican': 'pelicano' };

function forms(key) {
  const s = NOUNS[key]; if (!s) throw new Error('pt: no forms for "' + key + '"');
  const [art, ...rest] = s.split(' '); const n = rest.join(' ');
  const A = { o: 'ao', a: 'à', os: 'aos', as: 'às' }[art], D = { o: 'do', a: 'da', os: 'dos', as: 'das' }[art];
  if (!A) throw new Error('pt: no article in "' + s + '"');
  return { def: s, Def: s[0].toUpperCase() + s.slice(1), a: A + ' ' + n, de: D + ' ' + n, ate: 'até ' + s };
}
function build(sk, en) {
  const [hk, gk] = en; const f = sk.face;
  const H = hk && !/^(babies|tangled)/.test(f) ? forms(hk) : null, G = gk && !/^(babies|tangled)/.test(f) ? forms(gk) : null;
  switch (f) {
    case 'base': return { title: `Labirinto infantil: ${H.def} e ${G.def}`, printTitle: `Ajude ${H.def} a chegar ${G.a}`, instruction: `Ajude ${H.def} a chegar ${G.a}. Desenhe uma linha pelo caminho.`, tap: `Comece no círculo verde com a seta. Arraste pelo caminho ${G.ate}.` };
    case 'first-maze': return { title: `Meu primeiro labirinto: ${H.def} e ${G.def}`, printTitle: `Ajude ${H.def} a chegar ${G.a}`, instruction: `Ajude ${H.def} a chegar ${G.a}. Desenhe uma linha no caminho largo sem sair das bordas.`, tap: `Comece no círculo verde. Arraste pelo caminho largo ${G.ate}.` };
    case 'big-maze': return { title: `Labirinto grande 1º ano: ${H.def} e ${G.def}`, printTitle: `Ajude ${H.def} a encontrar ${G.def}`, instruction: `Primeiro olhe o labirinto inteiro. Depois desenhe o caminho ${H.de} ${G.ate}.`, tap: `Olhe primeiro e depois arraste do círculo verde ${G.ate}. Se um caminho acabar, volte.` };
    case 'river': { const swim = en[2] === 'swim'; return { title: `Labirinto do rio: ${H.def} e ${G.def}`, printTitle: swim ? `Ajude ${H.def} a nadar ${G.ate}` : `Leve ${H.def} ${G.ate}`, instruction: `${swim ? `Ajude ${H.def} a nadar` : `Leve ${H.def}`} pela água ${G.ate}. Desenhe uma linha pela água.`, tap: `Comece no círculo verde. Arraste pela água ${G.ate}.` }; }
    case 'burrow': return { title: `Labirinto subterrâneo: ${H.def} e ${G.def}`, printTitle: `Ajude ${H.def} a chegar ${G.a}`, instruction: `Ajude ${H.def} a descer e subir pelos túneis ${G.ate}. Desenhe uma linha pelo caminho.`, tap: `Comece no círculo verde. Arraste pelos túneis ${G.ate}.` };
    case 'shortest-way': return { title: `Labirinto da cidade: ${H.def} e o caminho mais curto`, printTitle: `O caminho mais curto ${G.ate}`, instruction: `Muitas ruas levam ${G.a}. Desenhe o caminho mais curto para ${H.def} e escreva quantos trechos de rua ele percorre.`, tap: `Arraste o caminho mais curto do círculo verde ${G.ate}.` };
    case 'babies-mothers': return { title: `Labirinto: os filhotes e suas mães ${BABIES[sk.id]}`, printTitle: 'Ajude cada filhote a encontrar a mãe', instruction: 'Ajude cada filhote a encontrar a sua própria mãe. Desenhe uma linha de cada filhote até a mãe dele.', tap: 'Arraste de cada filhote até a sua própria mãe.' };
    case 'tangled-lines': {
      const kites = sk.goals.filter((g) => /kite/.test(g.src)).length, balloons = sk.goals.length - kites;
      const what = balloons === 0 ? 'a pipa dele' : kites === 0 ? 'o balão dele' : 'a pipa ou o balão dele'; const whatT = balloons === 0 ? 'a pipa' : kites === 0 ? 'o balão' : 'cada linha';
      const where = STRINGS[sk.id.replace('hmx-strings-', '')]; const kids = /kids/.test(sk.id);
      return { title: `Linhas emaranhadas ${where}: de quem é ${whatT}?`, printTitle: `De quem é ${whatT}?`,
        instruction: kids ? `Siga cada linha de uma criança ou de um brinquedo até ${what}. Escreva o número dele no quadradinho acima.` : `Siga cada linha de um animal até ${what}. Escreva o número do animal no quadradinho acima.`,
        tap: kids ? `Arraste por cada linha, da criança ou do brinquedo até ${what}.` : `Arraste por cada linha, do animal até ${what}.` };
    }
    case 'collect': { const [all, each, missed] = COLLECT[sk.id]; return { title: `Labirinto: ${H.def} pega ${all}`, printTitle: `Ajude ${H.def} a pegar ${all}`, instruction: `Ajude ${H.def} a chegar ${G.a} e pegue ${each} sem passar duas vezes pelo mesmo caminho. Marque um círculo para ${each}.`, tap: `Arraste do círculo verde ${G.ate}. Passe por ${all}.`, missed: missed + ' Olhe o círculo vermelho.' }; }
    case 'avoid': { const [t, none, one] = AVOID[sk.id]; return { title: `Labirinto: ${H.def} desvia ${t}`, printTitle: `Leve ${H.def} ${G.ate} em segurança`, instruction: `Ajude ${H.def} a chegar ${G.a}. Não pegue nenhum caminho que tenha ${one}.`, tap: `Arraste do círculo verde ${G.ate} sem pegar caminho com ${one}.` }; }
    case 'letter-hop': return { title: `Pule as letras em ordem: ${H.def} ${HOP[sk.id]}`, printTitle: `Pule ${HOP[sk.id]} em ordem alfabética`, instruction: 'Comece na casinha para onde a seta aponta. Pinte a próxima letra do alfabeto em uma casinha vizinha, até chegar ao {LAST}.', tap: 'Comece no círculo verde. Arraste de casinha em casinha até a próxima letra do alfabeto.' };
    case 'abc-capitals': return { title: `Labirinto do alfabeto: ${H.def} e ${G.def}`, printTitle: `Leve ${H.def} de A a Z ${G.ate}`, instruction: `Ajude ${H.def} a chegar ${G.a}. Em cada cruzamento, vá até a pedra com a próxima letra do alfabeto.`, tap: 'Comece no círculo verde. Em cada cruzamento, arraste até a próxima letra.' };
    case 'abc-lowercase': return { title: `Labirinto das letras minúsculas: ${H.def}`, printTitle: `Leve ${H.def} de a a z ${G.ate}`, instruction: `Ajude ${H.def} a chegar ${G.a}. Em cada cruzamento, vá até a pedra com a próxima letra minúscula.`, tap: 'Comece no círculo verde. Em cada cruzamento, arraste até a próxima minúscula.' };
    case 'numbers-20': return { title: `Labirinto dos números de 1 a 20: ${H.def} e ${G.def}`, printTitle: `Conte com ${H.def} ${G.ate}`, instruction: `Ajude ${H.def} a chegar ${G.a}. Em cada cruzamento, vá até o próximo número, de 1 a 20.`, tap: 'Comece no círculo verde. Em cada cruzamento, arraste até o próximo número.' };
    case 'skip-5': return { title: `Labirinto de 5 em 5: ${H.def} e ${G.def}`, printTitle: `Conte de 5 em 5 ${G.ate}`, instruction: `Ajude ${H.def} a chegar ${G.a}. Conte de 5 em 5, de pedra em pedra, até 100.`, tap: 'Comece no círculo verde. Arraste de pedra em pedra contando de 5 em 5.' };
    case 'make-10': return { title: `Labirinto das somas que dão 10: ${H.def} e ${G.def}`, printTitle: 'Pise só nas somas que dão 10', instruction: `Ajude ${H.def} a chegar ${G.a}. Pise só nas pedras cuja soma dá 10.`, tap: 'Comece no círculo verde. Arraste só pelas pedras que dão 10.' };
    case 'subtract-20': return { title: `Labirinto de subtração até 20: ${H.def} e ${G.def}`, printTitle: `Ajude ${H.def} a chegar ${G.a}`, instruction: `Olhe o número ao lado ${H.de}. Pise só nas pedras cujo resultado é esse número.`, tap: `Comece no círculo verde. Arraste só pelas pedras que dão o número ${H.de}.` };
    case 'running-total': return { title: `Labirinto de somar e subtrair: ${H.def} e ${G.def}`, printTitle: `Some e subtraia no caminho ${G.ate}`, instruction: `Comece com o número ${H.de} e escreva o novo número em cada quadradinho. Ache o caminho que termina no número ${G.de}.`, tap: `Comece no círculo verde. Arraste pelo caminho que termina no número ${G.de}.` };
    case 'first-sound': { const c = CUE[sk.id]; return { title: `Labirinto dos sons iniciais: como ${c}`, printTitle: `Figuras que começam como ${c}`, instruction: `Diga o nome de cada figura. Pise só nas figuras que começam com o mesmo som de ${c}.`, tap: `Comece no círculo verde. Arraste só pelas figuras que começam como ${c}.` }; }
    case 'maze-colouring': { const [place, des] = COLOUR[sk.id]; return { title: `Labirinto para colorir: ${H.def} e ${G.def}`, printTitle: `Resolva o labirinto e pinte ${place}`, instruction: `Desenhe o caminho ${H.de} ${G.ate} e pinte o caminho todo. Depois pinte ${des}.`, tap: `Comece no círculo verde. Arraste pelo caminho ${G.ate}.` }; }
    default: throw new Error('pt: no template for ' + f);
  }
}
module.exports = { build, NOUNS };
