const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'frontend', 'config', 'idea-content', 'fr');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const ideas = [
  // ANIMAL THEMES (10)
  {id:'farm-animals-printable-ideas',title:"Id\u00e9es d'Imprimables Animaux de la Ferme",kw:"id\u00e9es imprimables animaux ferme",skw:["fiches animaux ferme","activit\u00e9s ferme maternelle","worksheets ferme enfants","coloriages ferme","puzzles animaux ferme"],lsi:["vache poule cochon","grange","tracteur","campagne","b\u00e9tail","basse-cour","animaux domestiques","ferme p\u00e9dagogique"],apps:['find-and-count','matching','shadow-match','coloring','wordsearch','addition']},
  {id:'ocean-animals-printable-ideas',title:"Id\u00e9es d'Imprimables Animaux Marins",kw:"id\u00e9es imprimables animaux marins",skw:["fiches oc\u00e9an enfants","activit\u00e9s mer maternelle","worksheets sous-marins","coloriages oc\u00e9an","puzzles animaux mer"],lsi:["poisson baleine dauphin","r\u00e9cif corallien","fonds marins","plage","coquillages","m\u00e9duse","requin","tortue marine"],apps:['find-and-count','matching','coloring','wordsearch','maze']},
  {id:'safari-animals-printable-ideas',title:"Id\u00e9es d'Imprimables Animaux Safari",kw:"id\u00e9es imprimables animaux safari",skw:["fiches safari enfants","activit\u00e9s animaux sauvages","worksheets savane","coloriages safari","puzzles animaux afrique"],lsi:["lion z\u00e8bre girafe","\u00e9l\u00e9phant","savane","jungle","animaux exotiques","r\u00e9serve naturelle","faune sauvage","brousse"],apps:['find-and-count','matching','shadow-match','coloring','wordsearch']},
  {id:'forest-animals-printable-ideas',title:"Id\u00e9es d'Imprimables Animaux de la For\u00eat",kw:"id\u00e9es imprimables animaux for\u00eat",skw:["fiches animaux for\u00eat","activit\u00e9s bois maternelle","worksheets for\u00eat","coloriages animaux for\u00eat","puzzles for\u00eat"],lsi:["renard \u00e9cureuil cerf","hibou","lapin","champignons","automne","feuilles","sous-bois","lisi\u00e8re"],apps:['find-and-count','matching','coloring','shadow-match','odd-one-out']},
  {id:'birds-printable-ideas',title:"Id\u00e9es d'Imprimables Oiseaux",kw:"id\u00e9es imprimables oiseaux",skw:["fiches oiseaux enfants","activit\u00e9s oiseaux maternelle","worksheets oiseaux","coloriages oiseaux","puzzles oiseaux"],lsi:["perroquet aigle hibou","moineau","nid","plumes","bec","vol","oiseau migrateur","ornithologie"],apps:['coloring','matching','wordsearch','shadow-match']},
  {id:'insects-printable-ideas',title:"Id\u00e9es d'Imprimables Insectes",kw:"id\u00e9es imprimables insectes",skw:["fiches insectes enfants","activit\u00e9s insectes maternelle","worksheets insectes","coloriages papillons","puzzles insectes"],lsi:["papillon coccinelle abeille","fourmi","scarab\u00e9e","chenille","libellule","bourdon","entomologie","jardin"],apps:['coloring','matching','find-and-count','shadow-match','odd-one-out']},
  {id:'pets-printable-ideas',title:"Id\u00e9es d'Imprimables Animaux Domestiques",kw:"id\u00e9es imprimables animaux domestiques",skw:["fiches animaux compagnie","activit\u00e9s chien chat","worksheets animaux familiers","coloriages animaux domestiques","puzzles animaux compagnie"],lsi:["chien chat hamster","poisson rouge","lapin","tortue","perruche","v\u00e9t\u00e9rinaire","soin animaux","responsabilit\u00e9"],apps:['coloring','matching','wordsearch','find-and-count']},
  {id:'dinosaur-printable-ideas',title:"Id\u00e9es d'Imprimables Dinosaures",kw:"id\u00e9es imprimables dinosaures",skw:["fiches dinosaures enfants","activit\u00e9s dinosaures maternelle","worksheets dino","coloriages dinosaures","puzzles dinosaures"],lsi:["t-rex triceratops","jurassique","fossiles","pal\u00e9ontologie","extinction","herbivore carnivore","pr\u00e9historique","diplodocus"],apps:['coloring','matching','wordsearch','find-and-count','maze']},
  {id:'underwater-printable-ideas',title:"Id\u00e9es d'Imprimables Monde Sous-Marin",kw:"id\u00e9es imprimables monde sous-marin",skw:["fiches sous-marines","activit\u00e9s fonds marins","worksheets oc\u00e9an profond","coloriages sous-marins","puzzles sous-marins"],lsi:["plong\u00e9e","corail","hippocampe","pieuvre","ancre","sous-marin","oc\u00e9anographie","abysse"],apps:['coloring','matching','hidden-objects','find-and-count']},
  {id:'space-printable-ideas',title:"Id\u00e9es d'Imprimables Espace",kw:"id\u00e9es imprimables espace",skw:["fiches espace enfants","activit\u00e9s astronomie maternelle","worksheets plan\u00e8tes","coloriages espace","puzzles astronomie"],lsi:["fus\u00e9e astronaute plan\u00e8te","\u00e9toiles","lune","galaxie","syst\u00e8me solaire","station spatiale","NASA","cosmos"],apps:['coloring','matching','wordsearch','find-and-count','maze']},

  // SEASONAL (8)
  {id:'christmas-printable-ideas',title:"Id\u00e9es d'Imprimables No\u00ebl",kw:"id\u00e9es imprimables no\u00ebl",skw:["fiches no\u00ebl enfants","activit\u00e9s no\u00ebl imprimables","worksheets no\u00ebl","coloriages no\u00ebl","puzzles no\u00ebl"],lsi:["p\u00e8re no\u00ebl sapin cadeaux","renne","bonhomme neige","guirlande","\u00e9toile","hiver","f\u00eates","d\u00e9cembre"],apps:['coloring','wordsearch','matching','find-and-count','maze','bingo']},
  {id:'halloween-printable-ideas',title:"Id\u00e9es d'Imprimables Halloween",kw:"id\u00e9es imprimables halloween",skw:["fiches halloween enfants","activit\u00e9s halloween imprimables","worksheets halloween","coloriages halloween","puzzles halloween"],lsi:["citrouille fant\u00f4me sorci\u00e8re","araign\u00e9e","chauve-souris","monstre","bonbons","d\u00e9guisement","octobre","effrayant"],apps:['coloring','wordsearch','matching','find-and-count','maze','bingo']},
  {id:'easter-printable-ideas',title:"Id\u00e9es d'Imprimables P\u00e2ques",kw:"id\u00e9es imprimables p\u00e2ques",skw:["fiches p\u00e2ques enfants","activit\u00e9s p\u00e2ques imprimables","worksheets p\u00e2ques","coloriages p\u00e2ques","chasse oeufs imprimable"],lsi:["oeufs lapin p\u00e2ques","poussins","chocolat","printemps","panier","d\u00e9coration oeufs","chasse","nid"],apps:['coloring','matching','find-and-count','treasure-hunt','hidden-objects']},
  {id:'valentines-day-printable-ideas',title:"Id\u00e9es d'Imprimables Saint-Valentin",kw:"id\u00e9es imprimables saint-valentin",skw:["fiches saint-valentin enfants","activit\u00e9s amour imprimables","worksheets saint-valentin","coloriages coeurs","puzzles saint-valentin"],lsi:["coeurs amour","rose","cupidon","f\u00e9vrier","affection","amiti\u00e9","carte","romantique"],apps:['coloring','matching','wordsearch','find-and-count']},
  {id:'thanksgiving-printable-ideas',title:"Id\u00e9es d'Imprimables Action de Gr\u00e2ces",kw:"id\u00e9es imprimables action de gr\u00e2ces",skw:["fiches thanksgiving","activit\u00e9s automne imprimables","worksheets thanksgiving","coloriages automne","puzzles thanksgiving"],lsi:["dinde citrouille","r\u00e9colte","automne","feuilles","gratitude","festin","famille","novembre"],apps:['coloring','matching','wordsearch','find-and-count']},
  {id:'spring-printable-ideas',title:"Id\u00e9es d'Imprimables Printemps",kw:"id\u00e9es imprimables printemps",skw:["fiches printemps enfants","activit\u00e9s printemps maternelle","worksheets printemps","coloriages printemps","puzzles printemps"],lsi:["fleurs papillons","bourgeons","pluie","arc-en-ciel","jardinage","abeilles","nids","renouveau"],apps:['coloring','matching','find-and-count','pattern-worksheet','shadow-match']},
  {id:'summer-printable-ideas',title:"Id\u00e9es d'Imprimables \u00c9t\u00e9",kw:"id\u00e9es imprimables \u00e9t\u00e9",skw:["fiches \u00e9t\u00e9 enfants","activit\u00e9s vacances imprimables","worksheets \u00e9t\u00e9","coloriages \u00e9t\u00e9","puzzles vacances"],lsi:["soleil plage","glace","piscine","coquillages","vacances","palmier","sable","tongs"],apps:['coloring','wordsearch','matching','find-and-count','maze']},
  {id:'winter-printable-ideas',title:"Id\u00e9es d'Imprimables Hiver",kw:"id\u00e9es imprimables hiver",skw:["fiches hiver enfants","activit\u00e9s hiver maternelle","worksheets hiver","coloriages hiver","puzzles neige"],lsi:["neige flocons","bonhomme neige","luge","ski","gants","\u00e9charpe","froid","d\u00e9cembre"],apps:['coloring','wordsearch','matching','find-and-count','maze']},

  // GRADE LEVELS (5)
  {id:'preschool-printable-ideas',title:"Id\u00e9es d'Imprimables Maternelle",kw:"id\u00e9es imprimables maternelle",skw:["fiches maternelle","activit\u00e9s petite section","worksheets maternelle","exercices pr\u00e9scolaire","mat\u00e9riel maternelle"],lsi:["graphisme","motricit\u00e9 fine","reconnaissance formes","couleurs","d\u00e9coupage","collage","pr\u00e9-\u00e9criture","pr\u00e9-lecture"],apps:['coloring','matching','big-small','pattern-worksheet','shadow-match','sorting']},
  {id:'kindergarten-printable-ideas',title:"Id\u00e9es d'Imprimables Grande Section",kw:"id\u00e9es imprimables grande section",skw:["fiches grande section","activit\u00e9s GS maternelle","worksheets kindergarten","exercices grande section","mat\u00e9riel GS"],lsi:["pr\u00e9-lecture","phon\u00e8mes","comptage 20","formes g\u00e9om\u00e9triques","pr\u00e9paration CP","graphisme avanc\u00e9","alphabet","sons"],apps:['find-and-count','matching','alphabet-train','pattern-worksheet','coloring','addition']},
  {id:'first-grade-printable-ideas',title:"Id\u00e9es d'Imprimables CP",kw:"id\u00e9es imprimables CP",skw:["fiches CP","activit\u00e9s CP","worksheets premi\u00e8re ann\u00e9e","exercices CP","mat\u00e9riel CP"],lsi:["lecture","\u00e9criture","addition 20","soustraction","phon\u00e8mes complexes","compr\u00e9hension","fluence","calcul mental"],apps:['addition','subtraction','wordsearch','writing','crossword','code-addition']},
  {id:'second-grade-printable-ideas',title:"Id\u00e9es d'Imprimables CE1",kw:"id\u00e9es imprimables CE1",skw:["fiches CE1","activit\u00e9s CE1","worksheets deuxi\u00e8me ann\u00e9e","exercices CE1","mat\u00e9riel CE1"],lsi:["addition retenue","soustraction emprunt","multiplication","mots m\u00eal\u00e9s avanc\u00e9s","lecture fluide","probl\u00e8mes","mesures","g\u00e9om\u00e9trie"],apps:['addition','subtraction','math-puzzle','wordsearch','crossword','math-worksheet']},
  {id:'third-grade-printable-ideas',title:"Id\u00e9es d'Imprimables CE2",kw:"id\u00e9es imprimables CE2",skw:["fiches CE2","activit\u00e9s CE2","worksheets troisi\u00e8me ann\u00e9e","exercices CE2","mat\u00e9riel CE2"],lsi:["multiplication","division","fractions","probl\u00e8mes complexes","vocabulaire \u00e9tendu","r\u00e9daction","conjugaison","grammaire"],apps:['math-puzzle','math-worksheet','wordsearch','crossword','cryptogram']},

  // THEMES & INTERESTS (12)
  {id:'transportation-printable-ideas',title:"Id\u00e9es d'Imprimables Transports",kw:"id\u00e9es imprimables transports",skw:["fiches v\u00e9hicules enfants","activit\u00e9s transports maternelle","worksheets voitures","coloriages v\u00e9hicules","puzzles transports"],lsi:["voiture avion train","bateau","v\u00e9lo","camion","bus","ambulance","m\u00e9tro","h\u00e9licopt\u00e8re"],apps:['coloring','matching','find-and-count','shadow-match','wordsearch']},
  {id:'food-cooking-printable-ideas',title:"Id\u00e9es d'Imprimables Alimentation",kw:"id\u00e9es imprimables alimentation cuisine",skw:["fiches alimentation enfants","activit\u00e9s cuisine maternelle","worksheets nourriture","coloriages fruits l\u00e9gumes","puzzles cuisine"],lsi:["fruits l\u00e9gumes","recettes","nutrition","\u00e9quilibre alimentaire","g\u00e2teau","dessert","repas","ingr\u00e9dients"],apps:['coloring','matching','find-and-count','sorting','wordsearch']},
  {id:'music-printable-ideas',title:"Id\u00e9es d'Imprimables Musique",kw:"id\u00e9es imprimables musique",skw:["fiches musique enfants","activit\u00e9s musique maternelle","worksheets instruments","coloriages musique","puzzles musique"],lsi:["instruments guitare piano","notes","rythme","chant","orchestre","m\u00e9lodie","partition","danse"],apps:['coloring','matching','wordsearch','shadow-match']},
  {id:'sports-printable-ideas',title:"Id\u00e9es d'Imprimables Sports",kw:"id\u00e9es imprimables sports",skw:["fiches sports enfants","activit\u00e9s sports maternelle","worksheets sports","coloriages sports","puzzles sports"],lsi:["football basketball tennis","natation","course","ballon","\u00e9quipe","comp\u00e9tition","m\u00e9daille","athl\u00e9tisme"],apps:['coloring','matching','wordsearch','find-and-count']},
  {id:'fairy-tale-printable-ideas',title:"Id\u00e9es d'Imprimables Contes de F\u00e9es",kw:"id\u00e9es imprimables contes de f\u00e9es",skw:["fiches contes enfants","activit\u00e9s contes maternelle","worksheets contes f\u00e9es","coloriages princesse","puzzles contes"],lsi:["princesse dragon ch\u00e2teau","chevalier","f\u00e9e","magie","licorne","sorcier","for\u00eat enchant\u00e9e","couronne"],apps:['coloring','matching','wordsearch','maze','treasure-hunt']},
  {id:'pirates-printable-ideas',title:"Id\u00e9es d'Imprimables Pirates",kw:"id\u00e9es imprimables pirates",skw:["fiches pirates enfants","activit\u00e9s pirates maternelle","worksheets pirates","coloriages pirates","puzzles pirates"],lsi:["tr\u00e9sor carte bateau","perroquet","\u00eele","coffre","sabre","drapeau","aventure","boussole"],apps:['coloring','matching','wordsearch','maze','treasure-hunt','hidden-objects']},
  {id:'construction-printable-ideas',title:"Id\u00e9es d'Imprimables Construction",kw:"id\u00e9es imprimables construction",skw:["fiches construction enfants","activit\u00e9s chantier maternelle","worksheets construction","coloriages engins","puzzles construction"],lsi:["grue pelleteuse camion","chantier","b\u00e2timent","casque","outils","brique","ciment","architecte"],apps:['coloring','matching','find-and-count','shadow-match','wordsearch']},
  {id:'camping-printable-ideas',title:"Id\u00e9es d'Imprimables Camping",kw:"id\u00e9es imprimables camping",skw:["fiches camping enfants","activit\u00e9s plein air","worksheets camping","coloriages camping","puzzles nature camping"],lsi:["tente feu camp","randonn\u00e9e","for\u00eat","sac dos","boussole","\u00e9toiles","guimauve","lampe"],apps:['coloring','matching','wordsearch','treasure-hunt','hidden-objects']},
  {id:'back-to-school-printable-ideas',title:"Id\u00e9es d'Imprimables Rentr\u00e9e Scolaire",kw:"id\u00e9es imprimables rentr\u00e9e scolaire",skw:["fiches rentr\u00e9e","activit\u00e9s septembre","worksheets rentr\u00e9e","coloriages \u00e9cole","puzzles rentr\u00e9e"],lsi:["cartable crayon cahier","ma\u00eetresse","\u00e9cole","classe","r\u00e8gle","gomme","pupitre","r\u00e9cr\u00e9ation"],apps:['coloring','wordsearch','matching','find-and-count','addition']},
  {id:'summer-learning-printable-ideas',title:"Id\u00e9es d'Imprimables Apprentissage d'\u00c9t\u00e9",kw:"id\u00e9es imprimables apprentissage \u00e9t\u00e9",skw:["fiches vacances \u00e9ducatives","activit\u00e9s \u00e9t\u00e9 p\u00e9dagogiques","worksheets vacances","cahier vacances imprimable","r\u00e9vision \u00e9t\u00e9"],lsi:["r\u00e9vision","maintien acquis","cahier vacances","activit\u00e9s \u00e9ducatives","pr\u00e9paration rentr\u00e9e","exercices \u00e9t\u00e9","jeux \u00e9ducatifs","ludique"],apps:['addition','subtraction','wordsearch','coloring','matching','math-puzzle']},
  {id:'parents-day-printable-ideas',title:"Id\u00e9es d'Imprimables F\u00eate des Parents",kw:"id\u00e9es imprimables f\u00eate parents",skw:["fiches f\u00eate m\u00e8res","activit\u00e9s f\u00eate p\u00e8res","worksheets f\u00eate parents","coloriages f\u00eate m\u00e8res","carte f\u00eate parents imprimable"],lsi:["f\u00eate m\u00e8res","f\u00eate p\u00e8res","cadeau fait main","po\u00e8me","coeur","famille","amour","juin"],apps:['coloring','draw-and-color','wordsearch']},
  {id:'party-supply-printable-ideas',title:"Id\u00e9es d'Imprimables F\u00eates et Anniversaires",kw:"id\u00e9es imprimables f\u00eates anniversaires",skw:["fiches anniversaire","activit\u00e9s f\u00eate imprimables","jeux f\u00eate imprimables","d\u00e9corations anniversaire","invitations imprimables"],lsi:["g\u00e2teau bougies ballons","d\u00e9coration","invitation","jeux","animation","goûter","cadeau","confettis"],apps:['coloring','bingo','treasure-hunt','matching','wordsearch']},

  // BUSINESS MODELS (10)
  {id:'homeschool-printable-ideas',title:"Id\u00e9es d'Imprimables Instruction \u00e0 Domicile",kw:"id\u00e9es imprimables instruction domicile",skw:["fiches IEF","mat\u00e9riel homeschool","worksheets \u00e9cole maison","ressources IEF imprimables","activit\u00e9s instruction domicile"],lsi:["IEF","\u00e9cole \u00e0 la maison","programme personnalis\u00e9","progression","autonomie","p\u00e9dagogie active","Montessori","curriculum"],apps:['addition','wordsearch','coloring','matching','writing','pattern-worksheet']},
  {id:'esl-printable-ideas',title:"Id\u00e9es d'Imprimables FLE/FLS",kw:"id\u00e9es imprimables FLE FLS",skw:["fiches FLE imprimables","mat\u00e9riel FLE","worksheets fran\u00e7ais langue \u00e9trang\u00e8re","ressources FLS","activit\u00e9s FLE"],lsi:["fran\u00e7ais langue \u00e9trang\u00e8re","vocabulaire","communication","grammaire basique","prononciation","immersion","bilingue","DELF"],apps:['wordsearch','crossword','word-scramble','matching','prepositions']},
  {id:'special-education-printable-ideas',title:"Id\u00e9es d'Imprimables \u00c9ducation Sp\u00e9cialis\u00e9e",kw:"id\u00e9es imprimables \u00e9ducation sp\u00e9cialis\u00e9e",skw:["fiches adaptation","mat\u00e9riel ASH","worksheets besoins sp\u00e9ciaux","ressources ULIS","activit\u00e9s adapt\u00e9es"],lsi:["diff\u00e9renciation","adaptation","accessibilit\u00e9","ULIS","SEGPA","TSA","DYS","inclusion"],apps:['matching','coloring','big-small','shadow-match','sorting','pattern-worksheet']},
  {id:'math-facts-printable-ideas',title:"Id\u00e9es d'Imprimables Automatismes Maths",kw:"id\u00e9es imprimables automatismes math\u00e9matiques",skw:["fiches calcul mental","tables addition imprimables","automatismes maths","fluence calcul","fiches drill maths"],lsi:["tables","fluence","rapidit\u00e9","m\u00e9morisation","r\u00e9p\u00e9tition espac\u00e9e","chronom\u00e8tre","benchmark","automatisme"],apps:['addition','subtraction','code-addition','math-worksheet','math-puzzle']},
  {id:'digital-download-printable-ideas',title:"Id\u00e9es de T\u00e9l\u00e9chargements Num\u00e9riques",kw:"id\u00e9es t\u00e9l\u00e9chargements num\u00e9riques \u00e9ducatifs",skw:["produits num\u00e9riques \u00e9ducatifs","digital downloads fiches","PDF \u00e9ducatifs vente","t\u00e9l\u00e9chargement fiches business","produits digitaux etsy"],lsi:["livraison instantan\u00e9e","PDF","digital","passive income","scalable","marketplace","automatique","sans stock"],apps:['wordsearch','coloring','addition','matching']},
  {id:'physical-printable-product-ideas',title:"Id\u00e9es de Produits Physiques Imprim\u00e9s",kw:"id\u00e9es produits physiques imprim\u00e9s",skw:["cahiers imprim\u00e9s \u00e9ducatifs","livres activit\u00e9s physiques","KDP produits","impression demande fiches","produits tangibles \u00e9ducatifs"],lsi:["impression \u00e0 la demande","KDP","cahier broch\u00e9","couverture","reliure","format physique","librairie","distributeur"],apps:['wordsearch','coloring','addition','math-puzzle']},
  {id:'print-on-demand-printable-ideas',title:"Id\u00e9es d'Impression \u00e0 la Demande",kw:"id\u00e9es impression demande \u00e9ducatif",skw:["POD \u00e9ducatif","print on demand fiches","KDP impression demande","impression automatique cahiers","POD worksheets"],lsi:["KDP","IngramSpark","Lulu","pas de stock","z\u00e9ro risque","automatique","redevances","catalogue"],apps:['wordsearch','coloring','addition','matching']},
  {id:'subscription-box-printable-ideas',title:"Id\u00e9es d'Abonnement Imprimables",kw:"id\u00e9es abonnement imprimables \u00e9ducatifs",skw:["box mensuelle \u00e9ducative","abonnement fiches","subscription worksheets","club imprimables","membership \u00e9ducatif"],lsi:["r\u00e9current","mensuel","fid\u00e9lisation","contenu frais","exclusif","membres","communaut\u00e9","pr\u00e9visible"],apps:['wordsearch','coloring','addition','matching','maze']},
  {id:'bulk-licensing-printable-ideas',title:"Id\u00e9es de Licences en Volume",kw:"id\u00e9es licences volume imprimables",skw:["licence \u00e9cole imprimables","licence district worksheets","volume licensing fiches","bulk purchase \u00e9ducatif","licence \u00e9tablissement"],lsi:["licence site","\u00e9tablissement","district","multi-postes","volume","r\u00e9duction","n\u00e9gociation","contrat"],apps:['wordsearch','addition','coloring','matching']},
  {id:'custom-worksheet-service-ideas',title:"Id\u00e9es de Service de Fiches Personnalis\u00e9es",kw:"id\u00e9es service fiches personnalis\u00e9es",skw:["fiches sur commande","service cr\u00e9ation worksheets","fiches custom \u00e9ducatif","service personnalisation","fiches sur mesure"],lsi:["sur mesure","personnalisation","client sp\u00e9cifique","devis","service premium","freelance","consultant","partenariat"],apps:['wordsearch','addition','coloring','matching']},
];

function generateFile(idea) {
  const productIdeas = idea.apps.map((appId, i) => {
    const titles = {
      'find-and-count': "Fiches Cherche et Compte " + idea.title.split(' ').slice(-2).join(' '),
      'matching': "Jeux d'Association " + idea.title.split(' ').slice(-2).join(' '),
      'shadow-match': "Fiches d'Ombres " + idea.title.split(' ').slice(-2).join(' '),
      'coloring': "Pages de Coloriage " + idea.title.split(' ').slice(-2).join(' '),
      'wordsearch': "Mots M\u00eal\u00e9s " + idea.title.split(' ').slice(-2).join(' '),
      'addition': "Fiches d'Addition " + idea.title.split(' ').slice(-2).join(' '),
      'subtraction': "Fiches de Soustraction " + idea.title.split(' ').slice(-2).join(' '),
      'crossword': "Mots Crois\u00e9s " + idea.title.split(' ').slice(-2).join(' '),
      'maze': "Labyrinthes " + idea.title.split(' ').slice(-2).join(' '),
      'bingo': "Cartes de Bingo " + idea.title.split(' ').slice(-2).join(' '),
      'treasure-hunt': "Chasse au Tr\u00e9sor " + idea.title.split(' ').slice(-2).join(' '),
      'hidden-objects': "Objets Cach\u00e9s " + idea.title.split(' ').slice(-2).join(' '),
      'odd-one-out': "Trouvez l'Intrus " + idea.title.split(' ').slice(-2).join(' '),
      'pattern-worksheet': "Fiches de Motifs " + idea.title.split(' ').slice(-2).join(' '),
      'sorting': "Fiches de Tri " + idea.title.split(' ').slice(-2).join(' '),
      'big-small': "Fiches Grand/Petit " + idea.title.split(' ').slice(-2).join(' '),
      'draw-and-color': "Dessiner et Colorier " + idea.title.split(' ').slice(-2).join(' '),
      'writing': "Fiches d'\u00c9criture " + idea.title.split(' ').slice(-2).join(' '),
      'word-scramble': "Lettres M\u00e9lang\u00e9es " + idea.title.split(' ').slice(-2).join(' '),
      'prepositions': "Fiches Pr\u00e9positions " + idea.title.split(' ').slice(-2).join(' '),
      'code-addition': "Code Addition " + idea.title.split(' ').slice(-2).join(' '),
      'math-puzzle': "Puzzles Maths " + idea.title.split(' ').slice(-2).join(' '),
      'math-worksheet': "Fiches de Maths " + idea.title.split(' ').slice(-2).join(' '),
      'picture-sudoku': "Sudoku Images " + idea.title.split(' ').slice(-2).join(' '),
      'alphabet-train': "Train Alphabet " + idea.title.split(' ').slice(-2).join(' '),
      'cryptogram': "Cryptogrammes " + idea.title.split(' ').slice(-2).join(' '),
    };
    const descs = {
      'find-and-count': "Cr\u00e9ez des pages remplies d'images \u00e0 compter. Les enfants cherchent et comptent les \u00e9l\u00e9ments pour d\u00e9velopper la num\u00e9ration.",
      'matching': "Cr\u00e9ez des fiches d'association avec des grilles de difficult\u00e9 progressive, de 4 \u00e0 12 paires.",
      'shadow-match': "G\u00e9n\u00e9rez des fiches o\u00f9 les enfants associent chaque image \u00e0 sa silhouette. D\u00e9veloppe la discrimination visuelle.",
      'coloring': "Produisez des pages de coloriage th\u00e9matiques. Les coloriages ont le plus fort volume de ventes.",
      'wordsearch': "Construisez des grilles de mots m\u00eal\u00e9s avec vocabulaire th\u00e9matique. Diff\u00e9rents niveaux de difficult\u00e9.",
      'addition': "Combinez les images th\u00e9matiques avec des probl\u00e8mes d'addition pour un apprentissage engageant.",
      'subtraction': "Utilisez le mode barrer avec des images th\u00e9matiques pour la soustraction visuelle.",
      'crossword': "Cr\u00e9ez des mots crois\u00e9s avec indices images ou texte autour du vocabulaire th\u00e9matique.",
      'maze': "G\u00e9n\u00e9rez des labyrinthes th\u00e9matiques de difficult\u00e9 progressive.",
      'bingo': "Cr\u00e9ez des sets de cartes de bingo pour activit\u00e9s de groupe et f\u00eates.",
      'treasure-hunt': "Concevez des chasses au tr\u00e9sor th\u00e9matiques avec indices imprimables.",
      'hidden-objects': "Cr\u00e9ez des sc\u00e8nes cherche et trouve avec objets cach\u00e9s \u00e0 retrouver.",
      'odd-one-out': "Cr\u00e9ez des fiches o\u00f9 les enfants identifient l'\u00e9l\u00e9ment qui ne fait pas partie du groupe.",
      'pattern-worksheet': "G\u00e9n\u00e9rez des fiches de suites logiques avec images th\u00e9matiques.",
      'sorting': "Cr\u00e9ez des fiches de classification et de tri par cat\u00e9gorie.",
      'big-small': "Fiches de comparaison de tailles avec images th\u00e9matiques.",
      'draw-and-color': "Fiches combinant dessin guid\u00e9 et coloriage th\u00e9matique.",
      'writing': "Fiches d'\u00e9criture guid\u00e9e avec mots th\u00e9matiques.",
      'word-scramble': "Lettres m\u00e9lang\u00e9es \u00e0 remettre dans l'ordre.",
      'prepositions': "Fiches de pr\u00e9positions spatiales illustr\u00e9es.",
      'code-addition': "R\u00e9solvez des additions pour d\u00e9coder des messages secrets th\u00e9matiques.",
      'math-puzzle': "Grilles de puzzles math\u00e9matiques interconnect\u00e9s.",
      'math-worksheet': "Fiches d'op\u00e9rations classiques avec th\u00e8mes.",
      'picture-sudoku': "Sudoku en images pour d\u00e9velopper la logique.",
      'alphabet-train': "Train de lettres avec images th\u00e9matiques.",
      'cryptogram': "Puzzles de d\u00e9codage avec lettres substitu\u00e9es.",
    };
    return `    { title: ${JSON.stringify(titles[appId] || appId)}, description: ${JSON.stringify(descs[appId] || 'Activit\u00e9 \u00e9ducative th\u00e9matique.')}, appId: ${JSON.stringify(appId)} }`;
  }).join(',\n');

  const themeWord = idea.title.replace(/Id\u00e9es d'Imprimables /, '');
  const tw = themeWord.toLowerCase();

  const heroDescription = 'Le th\u00e8me ' + tw + ' est une niche fiable et \u00e9ternelle dans le monde des imprimables, offrant ' + idea.kw + ' comme une opportunit\u00e9 lucrative pour les entrepreneurs. Avec les bons outils, cr\u00e9ez des centaines de fiches uniques en quelques minutes et construisez un catalogue g\u00e9n\u00e9rant des revenus passifs sur Etsy et Amazon KDP. La demande est constante et les possibilit\u00e9s de produits sont vastes \u2014 des fiches de comptage aux coloriages, des mots m\u00eal\u00e9s aux jeux d\'association.';

  const marketOverview = 'Le march\u00e9 des imprimables ' + tw + ' se situe \u00e0 l\'intersection de deux groupes d\'acheteurs massifs : les parents de jeunes enfants et les enseignants du primaire. La demande est r\u00e9guli\u00e8re tout au long de l\'ann\u00e9e, avec des pics saisonniers pr\u00e9visibles.\n\nLes donn\u00e9es de recherche r\u00e9v\u00e8lent une demande constante. Les termes li\u00e9s aux fiches ' + tw + ' g\u00e9n\u00e8rent des milliers de recherches mensuelles sur Etsy. La beaut\u00e9 de cette niche est son attrait universel et son accessibilit\u00e9 pour tous les \u00e2ges.\n\nLa concurrence existe, mais la plupart des vendeurs proposent des fiches g\u00e9n\u00e9riques con\u00e7ues \u00e0 la main avec peu de vari\u00e9t\u00e9. C\'est votre avantage. En utilisant des g\u00e9n\u00e9rateurs automatis\u00e9s, vous produisez des centaines de fiches uniques garantissant que chaque produit dans votre boutique est frais et diff\u00e9rent.\n\nLes marges b\u00e9n\u00e9ficiaires sont excellentes. Les packs individuels se vendent 3\u20136\u20ac, les bundles complets 12\u201320\u20ac. Le co\u00fbt de production est quasi nul apr\u00e8s l\'achat de la licence.';

  const howToCreate = 'Cr\u00e9er une activit\u00e9 d\'imprimables ' + tw + ' rentable commence par le choix des bons outils et la construction strat\u00e9gique de votre catalogue.\n\nCommencez par les types de produits les plus demand\u00e9s. Le g\u00e9n\u00e9rateur Cherche et Compte et le cr\u00e9ateur de jeux d\'association sont des points de d\u00e9part id\u00e9aux car ils mettent en valeur les illustrations et plaisent au plus grand groupe d\'acheteurs.\n\nOuvrez le g\u00e9n\u00e9rateur et s\u00e9lectionnez les th\u00e8mes correspondants. G\u00e9n\u00e9rez un lot de 15\u201320 fiches uniques en variant la difficult\u00e9. Exportez en PDF haute qualit\u00e9.\n\nAvec vos fiches pr\u00eates, cr\u00e9ez des mockups de listing. Montrez les fiches en situation r\u00e9aliste. Utilisez les 10 emplacements d\'image Etsy.\n\n\u00c9crivez vos descriptions avec le SEO en t\u00eate. Incluez naturellement les termes comme \"' + idea.kw + '\" dans votre titre, tags et description.\n\nFixez des prix comp\u00e9titifs pour d\u00e9marrer. Un pack de 15 pages \u00e0 3,49\u20134,99\u20ac. Un mega-bundle \u00e0 14,99\u201319,99\u20ac. Le bundle doit offrir une valeur \u00e9vidente.\n\nApr\u00e8s vos premi\u00e8res annonces, \u00e9largissez votre catalogue chaque semaine. En un mois, vous pouvez avoir 20+ listings g\u00e9n\u00e9rant des ventes quotidiennes.';

  const pricingIdeas = 'Fixer les prix de vos imprimables ' + tw + ' demande d\'\u00e9quilibrer accessibilit\u00e9 et valeur per\u00e7ue. La niche attire des parents et enseignants sensibles au budget, donc votre point d\'entr\u00e9e compte.\n\nLes packs individuels de 10\u201315 pages fonctionnent bien \u00e0 2,99\u20134,99\u20ac. Ce prix est un achat impulsif. Gardez vos formats les plus populaires \u00e0 ce niveau.\n\nCr\u00e9ez des bundles par comp\u00e9tence \u00e0 7,99\u20139,99\u20ac. Les enseignants pr\u00e9f\u00e8rent ces packs car ils couvrent un type d\'activit\u00e9 complet.\n\nVotre offre premium devrait \u00eatre un mega-bundle \u00e0 14,99\u201324,99\u20ac incluant tous les types de fiches. Positionnez-le comme \"tout ce dont vous avez besoin pour un th\u00e8me ' + tw + ' complet\".\n\nConsid\u00e9rez offrir un \u00e9chantillon gratuit \u2014 une seule fiche de qualit\u00e9 \u2014 comme listing s\u00e9par\u00e9. Cela construit la confiance et dirige les acheteurs vers vos produits payants.';

  const faqAge = 'Les imprimables ' + tw + ' se vendent le mieux pour les 2\u20137 ans. La maternelle et le CP sont les cr\u00e9neaux principaux, mais les coloriages fonctionnent pour les tout-petits et les mots m\u00eal\u00e9s s\'\u00e9tendent jusqu\'au CE1.';

  const appNameMap = {
    'find-and-count': 'Cherche et Compte',
    'matching': "d'Association",
    'shadow-match': "d'Ombres",
    'coloring': 'de Coloriages',
    'wordsearch': 'de Mots M\u00eal\u00e9s',
    'addition': "d'Addition",
  };

  const linksArr = idea.apps.slice(0, 3).map(appId => {
    return '    { slug: ' + JSON.stringify(appId) + ', pageType: \'app\', anchorText: ' + JSON.stringify('G\u00e9n\u00e9rateur ' + (appNameMap[appId] || appId)) + ' }';
  });
  const relatedIdea = ideas.find(x => x.id !== idea.id && x.apps.some(a => idea.apps.includes(a)));
  linksArr.push('    { slug: ' + JSON.stringify(relatedIdea?.id || 'farm-animals-printable-ideas') + ', pageType: \'idea\', anchorText: ' + JSON.stringify(relatedIdea?.title || "Id\u00e9es Animaux de la Ferme") + ' }');

  const lines = [];
  lines.push("import type { NicheIdeaContent } from '../types';");
  lines.push("");
  lines.push("export const content: NicheIdeaContent = {");
  lines.push("  ideaId: " + JSON.stringify(idea.id) + ",");
  lines.push("  locale: 'fr',");
  lines.push("");
  lines.push("  seo: {");
  lines.push("    titleTag: " + JSON.stringify(idea.title + ' \u2014 Vendre sur Etsy & KDP') + ",");
  lines.push("    metaDescription: " + JSON.stringify('D\u00e9couvrez des id\u00e9es rentables d\'imprimables ' + tw + ' pour votre business Etsy ou KDP. Cr\u00e9ez des fiches, coloriages et activit\u00e9s avec nos g\u00e9n\u00e9rateurs th\u00e9matiques.') + ",");
  lines.push("    primaryKeyword: " + JSON.stringify(idea.kw) + ",");
  lines.push("    secondaryKeywords: " + JSON.stringify(idea.skw) + ",");
  lines.push("    lsiKeywords: " + JSON.stringify(idea.lsi) + ",");
  lines.push("  },");
  lines.push("");
  lines.push("  visuals: {");
  lines.push("    heroImages: {");
  lines.push("      primary: '/samples/english/find-and-count/Find and Count Fun 1.jpeg',");
  lines.push("      primaryAlt: " + JSON.stringify('Fiche imprimable ' + tw + ' pour business') + ",");
  lines.push("      secondary: '/samples/english/matching/Matching Fun 1.jpeg',");
  lines.push("      secondaryAlt: " + JSON.stringify('Fiche association ' + tw + ' pr\u00eate pour Etsy') + ",");
  lines.push("    },");
  lines.push("    sampleGallery: [");
  lines.push("      { src: '/samples/english/find-and-count/Find and Count Fun 1.jpeg', alt: " + JSON.stringify('Fiche cherche et compte ' + tw) + ", caption: 'Cherche et Compte' },");
  lines.push("      { src: '/samples/english/matching/Matching Fun 1.jpeg', alt: " + JSON.stringify('Fiche association ' + tw) + ", caption: " + JSON.stringify("Jeux d'Association") + " },");
  lines.push("      { src: '/samples/english/find-and-count/Find and Count Fun 2.jpeg', alt: 'Deuxi\u00e8me fiche cherche et compte', caption: 'Vari\u00e9t\u00e9 de formats' },");
  lines.push("      { src: '/samples/english/matching/Matching Fun 2.jpeg', alt: 'Deuxi\u00e8me fiche association', caption: 'Bundles th\u00e9matiques' },");
  lines.push("    ],");
  lines.push("    youtubeId: '0cOPi7eajLs',");
  lines.push("    videoTitle: " + JSON.stringify('Comment Cr\u00e9er des Imprimables ' + themeWord + ' \u00e0 Vendre') + ",");
  lines.push("  },");
  lines.push("");
  lines.push("  hero: {");
  lines.push("    title: " + JSON.stringify(idea.title + ' pour Votre Business') + ",");
  lines.push("    description: " + JSON.stringify(heroDescription) + ",");
  lines.push("  },");
  lines.push("");
  lines.push("  marketOverview: " + JSON.stringify(marketOverview) + ",");
  lines.push("");
  lines.push("  productIdeas: [");
  lines.push(productIdeas);
  lines.push("  ],");
  lines.push("");
  lines.push("  howToCreate: " + JSON.stringify(howToCreate) + ",");
  lines.push("");
  lines.push("  platformTips: [");
  lines.push("    { platform: 'Etsy', title: " + JSON.stringify('Optimiser pour les Acheteurs ' + themeWord) + ", description: " + JSON.stringify('Les parents et enseignants recherchent des packs th\u00e9matiques complets. Cr\u00e9ez un pack couvrant plusieurs comp\u00e9tences autour du th\u00e8me ' + tw + '. Ces acheteurs d\u00e9pensent plus par achat.') + " },");
  lines.push("    { platform: 'Etsy', title: 'Variations Saisonni\u00e8res', description: " + JSON.stringify('Cr\u00e9ez des versions saisonni\u00e8res de vos produits ' + tw + ' pour capturer les recherches tendance tout en r\u00e9utilisant votre structure de produit de base.') + " },");
  lines.push("    { platform: 'Amazon KDP', title: " + JSON.stringify('Publier des Cahiers ' + themeWord) + ", description: " + JSON.stringify('Compilez vos meilleures fiches ' + tw + ' en cahiers de 50\u2013100 pages pour KDP. Prix 5,99\u20138,99\u20ac. KDP touche des acheteurs qui ne sont pas sur Etsy.') + " },");
  lines.push("    { platform: 'Pinterest', title: 'Tableaux Th\u00e9matiques Pinterest', description: " + JSON.stringify('\u00c9pinglez chaque listing sur des tableaux d\u00e9di\u00e9s au th\u00e8me ' + tw + '. Les \u00e9pingles \u00e9ducatives g\u00e9n\u00e8rent du trafic pendant des mois.') + " },");
  lines.push("  ],");
  lines.push("");
  lines.push("  pricingIdeas: " + JSON.stringify(pricingIdeas) + ",");
  lines.push("");
  lines.push("  faq: [");
  lines.push("    { question: " + JSON.stringify('Pour quel \u00e2ge sont les imprimables ' + tw + ' ?') + ", answer: " + JSON.stringify(faqAge) + " },");
  lines.push("    { question: 'Puis-je vendre sur plusieurs plateformes ?', answer: 'Oui. La licence commerciale vous autorise \u00e0 vendre sur Etsy, Amazon KDP, Teachers Pay Teachers, Gumroad, votre propre site et toute autre marketplace sans restriction.' },");
  lines.push("    { question: 'Combien de fiches par listing ?', answer: " + JSON.stringify('Pour les packs individuels, 10\u201320 pages est id\u00e9al. Assez pour justifier le prix tout en laissant de la place pour des bundles. Les mega-bundles de 50\u2013100+ pages commandent des prix premium.') + " },");
  lines.push("    { question: " + JSON.stringify('Faut-il \u00eatre enseignant pour cr\u00e9er ces fiches ?') + ", answer: " + JSON.stringify('Pas du tout. Les g\u00e9n\u00e9rateurs g\u00e8rent tout le design \u00e9ducatif. Vous choisissez les th\u00e8mes et param\u00e8tres, l\'outil produit des fiches professionnelles.') + " },");
  lines.push("    { question: " + JSON.stringify('Combien co\u00fbtent les outils ?') + ", answer: " + JSON.stringify('Les licences individuelles d\u00e9marrent \u00e0 27\u202f$ (commercial) et 47\u202f$ (acc\u00e8s complet). Les packs cat\u00e9gorie sont \u00e0 79\u202f$ (commercial) et 119\u202f$ (acc\u00e8s complet). Chaque g\u00e9n\u00e9rateur est gratuit \u00e0 tester.') + " },");
  lines.push("    { question: 'Quelle est votre politique de remboursement ?', answer: " + JSON.stringify('Toutes les ventes sont d\u00e9finitives en raison de la nature num\u00e9rique du produit. Une fois qu\'une cl\u00e9 de licence est livr\u00e9e et activ\u00e9e, elle ne peut \u00eatre retourn\u00e9e. Utilisez la version gratuite pour tout tester d\'abord.') + " },");
  lines.push("  ],");
  lines.push("");
  lines.push("  internalLinks: [");
  lines.push(linksArr.join(',\n'));
  lines.push("  ],");
  lines.push("};");

  return lines.join('\n') + '\n';
}

let count = 0;
for (const idea of ideas) {
  const filePath = path.join(outDir, idea.id + '.ts');
  fs.writeFileSync(filePath, generateFile(idea), 'utf8');
  count++;
}
console.log(`Generated ${count} French idea-content files in ${outDir}`);
