import type { AppContent } from '../types';

const content: AppContent = {
  seo: {
    primaryKeyword: 'fiches d\'ombres à associer pour boutique Etsy',
    secondaryKeywords: [
      'générateur de fiches de silhouettes pour vendeurs Etsy',
      'fiches de discrimination visuelle pour Amazon KDP',
      'puzzles de correspondance d\'ombres licence commerciale',
      'créer des cahiers de perception visuelle pour vendeurs',
    ],
    lsiKeywords: [
      'licence commerciale 300 DPI prêt à imprimer',
      'business d\'imprimables fiches d\'ombres vendeurs Etsy',
      'modes Ombre et Reconstitue l\'Image corrigé automatique',
    ],
    titleTag: 'Fiches d\'ombres à vendre sur Etsy & KDP | LCS',
    metaDescription: 'Créez des fiches d\'ombres à associer pour Etsy & KDP. Modes Ombre et Reconstitue l\'Image, licence commerciale. 49 $ paiement unique.',
  },

  hero: {
    title: 'Créez des fiches d\'ombres à associer pour Etsy & Amazon KDP',
    tagline: 'Deux modes de correspondance en un seul générateur — Trouve l\'Ombre crée des silhouettes noires générées automatiquement à partir de n\'importe quelle image, Reconstitue l\'Image divise les images en moitiés — les deux avec un algorithme de dérangement Fisher-Yates garantissant aucune correspondance triviale, des corrigés auto-générés et 104 collections d\'images thématiques.',
    description:
      'Créez des fiches d\'ombres à associer pour Etsy, Amazon KDP ou La Salle des Maîtres — des fiches où les acheteurs associent des images en couleur à leurs silhouettes ou reconnectent des moitiés d\'images séparées. Le mode Trouve l\'Ombre place 4 images en couleur étiquetées A, B, C, D dans la rangée du haut et 4 silhouettes noires auto-générées étiquetées 1, 2, 3, 4 dans la rangée du bas — les silhouettes sont créées par un traitement d\'images au niveau des pixels qui convertit chaque pixel avec un alpha > 10 en noir pur, produisant des contours précis qui préservent le profil de transparence exact de chaque image. Le mode Reconstitue l\'Image divise les images en moitiés avec une direction de coupe horizontale ou verticale, étiquette les premières moitiés A–D et les secondes moitiés 1–4, et adapte la mise en page selon l\'orientation. Les deux modes utilisent un algorithme de dérangement Fisher-Yates pour garantir qu\'aucun élément n\'apparaît à sa position d\'origine, créant de véritables défis de correspondance à chaque fois. Activez ou désactivez l\'affichage des étiquettes A/B/C/D et 1/2/3/4, ajoutez des champs optionnels nom et date pour l\'utilisation en ligne, et générez des corrigés automatiques qui affichent chaque appariement correct lettre-numéro. Le Générateur de Discrimination Visuelle n\'est PAS sensible à la langue : le résultat est purement visuel, sans contenu textuel localisé sur la fiche elle-même. L\'Accès Complet déverrouille les 104 thèmes avec plus de 3 100 illustrations et les 11 langues d\'interface. Ajoutez des thèmes de fond et de bordure avec des contrôles d\'opacité indépendants, insérez du texte personnalisé avec sept options de police, et exportez des PDF et JPEG prêts à imprimer à 300 DPI en format Letter, A4, Carré (1200×1200) ou dimensions personnalisées. Que vous vendiez des packs de puzzles de silhouettes sur Etsy, compiliez des cahiers de perception visuelle pour Amazon KDP ou créiez des activités rapides de fin de cours pour Gumroad, ce générateur produit des fiches prêtes pour la production en quelques minutes — essai gratuit avec toutes les fonctionnalités, sans inscription, sans carte bancaire. Les téléchargements incluent un filigrane ; achetez une licence pour le supprimer.',
  },

  howItWorks: {
    title: 'Comment Créer des Fiches de Discrimination Visuelle en 5 Étapes',
    steps: [
      {
        title: 'Définissez la Mise en Page',
        description:
          'Ouvrez le panneau Mise en Page et choisissez un format de page : Letter Portrait, Letter Paysage, A4 Portrait, A4 Paysage, Carré (1200×1200) ou toute dimension personnalisée. Sélectionnez une couleur de fond par défaut à l\'aide du sélecteur de couleur. Choisissez un thème de fond et ajustez son opacité (de 0 à 1 par pas de 0,05), puis choisissez un thème de bordure avec son propre contrôle d\'opacité indépendant. Ces choix de mise en page encadrent votre fiche de discrimination visuelle avant de configurer le contenu.',
      },
      {
        title: 'Choisissez le Mode d\'Exercice et Configurez les Options',
        description:
          'Ouvrez le panneau Configuration de l\'Exercice et sélectionnez votre mode : Trouve l\'Ombre ou Reconstitue l\'Image. Le mode Trouve l\'Ombre génère des silhouettes noires à partir de vos images sélectionnées par traitement au niveau des pixels. Le mode Reconstitue l\'Image divise les images en moitiés — choisissez la coupe horizontale (haut/bas) ou verticale (gauche/droite) à l\'aide des boutons radio qui apparaissent dans ce mode. Activez ou désactivez la case \" Afficher les Étiquettes \" (activée par défaut) pour afficher les identifiants A/B/C/D et 1/2/3/4 sur la fiche. Activez \" Inclure les Champs Nom/Date \" pour ajouter des lignes nom et date pour les utilisateurs.',
      },
      {
        title: 'Sélectionnez 4 Images dans la Bibliothèque',
        description:
          'Ouvrez le panneau Bibliothèque d\'Images et parcourez 104 collections thématiques avec plus de 3 100 illustrations colorées — animaux, nourriture, véhicules, nature, fêtes et bien plus. Filtrez par thème à l\'aide du menu déroulant ou recherchez par mot-clé avec un délai de 300 ms. Cliquez sur les images pour les sélectionner — le compteur affiche votre progression vers les 4 images requises. Un aperçu des images sélectionnées confirme vos choix avant la génération. Vous pouvez aussi importer des images personnalisées PNG, JPG ou GIF via le panneau Importer des Images Personnalisées.',
      },
      {
        title: 'Générez la Fiche de Discrimination Visuelle',
        description:
          'Cliquez sur Générer pour créer la fiche de correspondance. En mode Trouve l\'Ombre, l\'application traite chaque image au niveau des pixels — elle la charge sur un canevas, extrait les données de pixels via getImageData, et convertit chaque pixel avec un alpha > 10 en noir pur (R=0, G=0, B=0, A=255) pour produire des silhouettes fidèles. En mode Reconstitue l\'Image, les images sont divisées selon la direction de coupe choisie. Les deux modes appliquent un dérangement Fisher-Yates pour garantir qu\'aucun élément n\'apparaît à sa position d\'origine. Un en-tête stylisé apparaît avec un fond ambre (#FFC107), un conteneur pilule blanc et une bordure ambre de 3 px affichant \" Trouve l\'Ombre \" et les instructions dans la langue sélectionnée.',
      },
      {
        title: 'Générez le Corrigé et Téléchargez',
        description:
          'Passez à l\'onglet Corrigé pour voir le corrigé auto-généré. En mode Trouve l\'Ombre, chaque cellule affiche l\'image originale à côté de sa silhouette avec une étiquette comme \" A → 2 \" indiquant la correspondance correcte. En mode Reconstitue l\'Image, chaque cellule affiche l\'image originale complète avec son étiquette de correspondance. Téléchargez les deux versions à l\'aide de quatre boutons dédiés : Fiche JPEG, Corrigé JPEG, Fiche PDF et Corrigé PDF à 300 DPI. Activez le mode niveaux de gris pour des versions économiques en encre. Chaque export est prêt pour la production pour les boutiques Etsy, les intérieurs Amazon KDP et les fichiers Gumroad.',
      },
    ],
  },

  keyFeatures: {
    title: 'Caractéristiques Clés du Générateur de Discrimination Visuelle',
    features: [
      {
        title: 'Silhouettes Auto-Générées par Traitement d\'Images au Niveau des Pixels',
        description:
          'Le mode Trouve l\'Ombre crée des silhouettes noires par une véritable manipulation au niveau des pixels — pas de filtres CSS ni d\'éléments préfabriqués. L\'application charge chaque image sur un canevas, extrait les données de pixels via getImageData, et convertit chaque pixel dont la valeur alpha est supérieure à 10 en noir pur (R=0, G=0, B=0, A=255). Cela préserve le profil de transparence exact de chaque image, produisant des contours de silhouettes fidèles qui reflètent les détails fins comme les oreilles d\'animaux, les formes de véhicules et les contours d\'objets. La gestion CORS assure le traitement correct des images cross-origin, avec un repli vers un rectangle noir uni si le canevas est corrompu.',
      },
      {
        title: 'Deux Modes d\'Exercice : Trouve l\'Ombre et Reconstitue l\'Image avec Options de Direction de Coupe',
        description:
          'Un seul générateur offre deux activités de correspondance visuelle distinctes. Le mode Trouve l\'Ombre place 4 images en couleur dans la rangée du haut et 4 silhouettes auto-générées dans la rangée du bas — les utilisateurs identifient chaque image par la forme de son contour uniquement. Le mode Reconstitue l\'Image divise 4 images en moitiés et présente les premières et secondes moitiés séparément — les utilisateurs reconnectent les pièces pour compléter chaque image. En mode Reconstitue l\'Image, choisissez la coupe horizontale (moitiés haut/bas) ou la coupe verticale (moitiés gauche/droite). La mise en page s\'adapte automatiquement : les pages paysage utilisent 2 rangées × 4 éléments, les pages portrait utilisent 2 colonnes × 4 éléments.',
      },
      {
        title: 'Algorithme de Dérangement Garantissant Aucune Correspondance Triviale',
        description:
          'Les deux modes d\'exercice utilisent un algorithme de dérangement Fisher-Yates qui garantit qu\'aucun élément n\'apparaît à sa position d\'origine. En mode Trouve l\'Ombre, aucune silhouette ne se trouve directement sous son image correspondante. En mode Reconstitue l\'Image, aucune seconde moitié n\'apparaît adjacente à sa première moitié correspondante. Cela élimine la possibilité de deviner correctement par position seule et assure que chaque fiche présente un véritable défi de correspondance. Le dérangement se recalcule à chaque génération, produisant des arrangements différents à partir du même ensemble d\'images.',
      },
      {
        title: 'Corrigé Auto-Généré avec Étiquettes de Correspondance Lettre-Numéro',
        description:
          'Chaque fiche de discrimination visuelle génère automatiquement un corrigé compagnon sur un onglet canevas séparé. Le corrigé utilise une disposition en grille où chaque cellule affiche l\'image originale à côté de sa silhouette ou de l\'image complète, étiquetée avec la correspondance correcte comme \" A → 2 \". La grille utilise 4 colonnes avec un écart de 50 px avant la deuxième rangée et un espacement vertical de 15 px entre les éléments. Aucune création manuelle de corrigé nécessaire — le corrigé reste synchronisé avec la fiche. Téléchargez-le séparément en answer_key.jpeg ou answer_key.pdf aux côtés de la fiche utilisateur.',
      },
      {
        title: 'Bibliothèque d\'Images avec 104 Collections Thématiques et Plus de 3 100 Illustrations',
        description:
          'Parcourez 104 collections d\'images thématiques couvrant animaux, nourriture, véhicules, nature, professions, fêtes, sports, saisons et bien plus. Chaque thème fournit des illustrations colorées qui produisent des silhouettes distinctives avec des contours reconnaissables — formes d\'animaux, profils de véhicules et contours d\'objets qui stimulent la perception visuelle. Filtrez par thème à l\'aide du menu déroulant ou recherchez des images spécifiques par mot-clé. La Licence Commerciale inclut 10 thèmes colorés pour démarrer ; l\'Accès Complet déverrouille les 104 thèmes pour une variété créative maximale dans les deux modes d\'exercice.',
      },
      {
        title: 'Étiquettes Optionnelles et Champs Nom/Date pour utilisateurs',
        description:
          'Activez ou désactivez la case \" Afficher les Étiquettes \" (activée par défaut) pour afficher les identifiants A, B, C, D sur les images ou premières moitiés et 1, 2, 3, 4 sur les silhouettes ou secondes moitiés. Quand les étiquettes sont masquées, la fiche devient un défi de correspondance purement visuel sans aide alphanumérique — idéal pour les activités avancées ou les cahiers de puzzles où les réponses écrites ne sont pas nécessaires. La case \" Inclure les Champs Nom/Date \" ajoute des lignes nom et date en bas de page pour la responsabilité en ligne et l\'organisation.',
      },
      {
        title: 'Export PDF et JPEG Prêts à Imprimer à 300 DPI avec Bascule Niveaux de Gris',
        description:
          'Téléchargez les fiches de discrimination visuelle et les corrigés en images JPEG haute résolution ou en documents PDF prêts à imprimer rendus à 300 DPI (multiplicateur 6×, qualité JPEG 1.0). Quatre boutons de téléchargement dédiés exportent la fiche et le corrigé séparément. Les formats de page incluent Letter Portrait, Letter Paysage, A4 Portrait, A4 Paysage, Carré (1200×1200) et dimensions entièrement personnalisées. L\'orientation PDF est détectée automatiquement. Activez les niveaux de gris pour des versions économiques en encre. Chaque export est prêt pour la production pour les téléchargements numériques, les cahiers imprimés et les documents de classe.',
      },
      {
        title: 'Édition Complète du Canevas avec Outils Texte, Alignement et Contrôles de Superposition',
        description:
          'Le canevas Fabric.js offre un contrôle complet sur chaque élément de votre fiche de discrimination visuelle. Glissez, redimensionnez, faites pivoter et repositionnez librement les images, le texte et le contenu généré. Les contrôles de couche gèrent l\'ordre d\'empilement — amenez des éléments vers l\'avant ou envoyez-les vers l\'arrière. Verrouillez les éléments terminés pendant que vous en modifiez d\'autres. Ajoutez du texte personnalisé avec sept options de police (Lexend Deca, Baloo 2, Nunito, Quicksand, Fredoka, Arial, Verdana), taille et couleur ajustables, et épaisseur de contour de texte de 0 à 10 par pas de 0,5. Six options d\'alignement plus centrage sur la page maintiennent des mises en page précises. Zoom de 25 % à 300 % pour le travail de détail. Annuler et rétablir avec un historique illimité via Ctrl+Z et Ctrl+Y.',
      },
    ],
  },

  businessUseCases: {
    title: 'Comment Vendre des Fiches de Discrimination Visuelle en Ligne',
    cases: [
      {
        title: 'Packs Thématiques de Correspondance d\'Ombres sur Etsy',
        description:
          'Créez des packs thématiques de correspondance d\'ombres à l\'aide des 104 collections d\'images — puzzles d\'ombres d\'animaux, correspondance de silhouettes de véhicules, défis d\'ombres alimentaires et bien plus. Chaque thème fournit des illustrations avec des contours distinctifs qui créent des activités de silhouettes captivantes. Regroupez 15 à 20 fiches de discrimination visuelle par thème avec corrigés inclus, et vendez à 3–7 € par pack. Mélangez les deux modes dans un seul pack : fiches Trouve l\'Ombre pour la reconnaissance de silhouettes et fiches Reconstitue l\'Image pour le raisonnement spatial. Les silhouettes auto-générées et les corrigés éliminent les parties les plus chronophages de la production.',
        platform: 'Etsy (etsy.com)',
      },
      {
        title: 'Cahiers de Perception Visuelle sur Amazon KDP',
        description:
          'Compilez 50 à 80 fiches de discrimination visuelle dans un cahier imprimé au format Amazon KDP. Structurez votre livre avec des chapitres alternés : les chapitres Trouve l\'Ombre développent la reconnaissance de silhouettes tandis que les chapitres Reconstitue l\'Image développent la conscience spatiale et le raisonnement partie-tout. Incluez les directions de coupe horizontale et verticale dans les sections Reconstitue l\'Image pour la variété. Placez les corrigés à la fin du livre grâce à la fonction de corrigé auto-généré. La bascule niveaux de gris produit des pages économiques en encre prêtes pour les intérieurs de livres en noir et blanc. Les cahiers de puzzles de perception visuelle se vendent bien toute l\'année dans la catégorie cahiers d\'activités.',
        platform: 'Amazon KDP (kdp.amazon.com)',
      },
      {
        title: 'Activités Rapides de Fin de Cours pour Gumroad',
        description:
          'Créez des activités de discrimination visuelle prêtes à l\'emploi avec champs nom/date et corrigés imprimés pour l\'utilisation en ligne. Les vendeurs qui recherchent des exercices de discrimination visuelle apprécient les fiches qui arrivent prêtes à imprimer. Créez des ensembles liés au programme : correspondance d\'ombres d\'animaux pour les cours de sciences, silhouettes de métiers pour les études sociales, puzzles d\'ombres alimentaires pour les cours de nutrition. La bascule des étiquettes vous permet de créer des versions guidées (avec étiquettes A/B/C/D et 1/2/3/4) et des versions défi (étiquettes masquées) dans le même produit pour une instruction différenciée.',
        platform: 'Gumroad (teacherspayteachers.com)',
      },
      {
        title: 'Collections Saisonnières de Correspondance d\'Ombres',
        description:
          'Les 104 collections d\'images thématiques couvrent chaque occasion saisonnière et de fête — Noël, Halloween, Pâques, Saint-Valentin, rentrée scolaire, vacances d\'été et bien plus. Les activités de silhouettes ont un attrait particulier pendant Halloween quand les thèmes d\'ombres et de mystère sont naturellement populaires. Créez des collections de discrimination visuelle en édition limitée alignées sur les périodes de pic d\'achat. Incluez les fiches Trouve l\'Ombre et Reconstitue l\'Image dans chaque ensemble saisonnier pour une valeur et une variété maximales. Les produits saisonniers commandent des prix plus élevés pendant leurs fenêtres de pic.',
        platform: 'Etsy / Amazon KDP / Gumroad (saisonnier)',
      },
      {
        title: 'Packs de Puzzles Multi-Modes en Offre Premium',
        description:
          'Combinez les deux modes d\'exercice dans des packs de puzzles multi-modes premium qui mettent en valeur la polyvalence du générateur. Chaque pack inclut des fiches Trouve l\'Ombre (reconnaissance de silhouettes), des fiches Reconstitue l\'Image avec coupes horizontales (réassemblage haut/bas), et des fiches Reconstitue l\'Image avec coupes verticales (réassemblage gauche/droite) — trois types d\'activités distincts à partir d\'un même ensemble d\'images thématiques. Cette approche trois-en-un justifie un prix premium de 7–12 € par pack. Les corrigés pour chaque fiche sont inclus automatiquement, ajoutant une finition professionnelle qui commande une valeur perçue plus élevée.',
        platform: 'Etsy / Amazon KDP (packs premium)',
      },
    ],
  },

  faq: [
    {
      question: 'Quels sont les deux modes d\'exercice et en quoi diffèrent-ils ?',
      answer:
        'Le générateur propose deux modes distincts. Le mode Trouve l\'Ombre place 4 images en couleur dans la rangée du haut et 4 silhouettes noires auto-générées dans la rangée du bas — les utilisateurs associent chaque image à son ombre en appariant les lettres (A–D) aux numéros (1–4). Le mode Reconstitue l\'Image divise 4 images en moitiés et présente les premières moitiés (A–D) et les secondes moitiés (1–4) séparément — les utilisateurs associent les moitiés pour compléter chaque image. Trouve l\'Ombre teste la reconnaissance de silhouettes tandis que Reconstitue l\'Image développe la conscience spatiale et le raisonnement partie-tout.',
    },
    {
      question: 'Comment les silhouettes sont-elles générées ?',
      answer:
        'Les silhouettes sont créées par un véritable traitement d\'images au niveau des pixels, pas par des filtres CSS ni des éléments d\'ombres préfabriqués. L\'application charge chaque image sur un canevas, extrait chaque pixel via getImageData, et convertit tous les pixels dont la valeur alpha est supérieure à 10 en noir pur (R=0, G=0, B=0, A=255). Cela préserve le profil de transparence exact de chaque image source, produisant des silhouettes noires fidèles qui reflètent les détails fins comme les oreilles, les queues, les poignées et autres contours distinctifs.',
    },
    {
      question: 'Quelles sont les options de direction de coupe en mode Reconstitue l\'Image ?',
      answer:
        'Le mode Reconstitue l\'Image offre deux options de direction de coupe via des boutons radio : la coupe horizontale divise les images en moitiés haut et bas, tandis que la coupe verticale divise les images en moitiés gauche et droite. La direction de coupe s\'applique aux 4 images de la fiche. La mise en page s\'adapte automatiquement selon l\'orientation de la page — les pages paysage disposent les éléments en 2 rangées × 4 éléments, tandis que les pages portrait utilisent 2 colonnes × 4 éléments pour un équilibre visuel optimal.',
    },
    {
      question: 'Comment fonctionne l\'algorithme de dérangement ?',
      answer:
        'Les deux modes utilisent un algorithme de dérangement Fisher-Yates qui garantit qu\'aucun élément n\'apparaît à sa position d\'origine. En mode Trouve l\'Ombre, aucune silhouette ne se trouve directement sous son image correspondante. En mode Reconstitue l\'Image, aucune seconde moitié n\'apparaît adjacente à sa première moitié correspondante. Cela garantit que chaque fiche présente un véritable défi de correspondance — les utilisateurs ne peuvent pas deviner correctement par la position seule. Le dérangement se recalcule à chaque génération, produisant des arrangements différents à partir des mêmes images.',
    },
    {
      question: 'Peut-on activer ou désactiver les étiquettes A/B/C/D et 1/2/3/4 ?',
      answer:
        'Oui. La case \" Afficher les Étiquettes \" dans le panneau Configuration de l\'Exercice (activée par défaut) contrôle si les étiquettes A, B, C, D apparaissent sur les images ou premières moitiés et si les étiquettes 1, 2, 3, 4 apparaissent sur les silhouettes ou secondes moitiés. Quand les étiquettes sont activées, les utilisateurs écrivent des paires lettre-numéro comme réponses. Quand les étiquettes sont désactivées, la fiche devient un défi de correspondance purement visuel sans aide alphanumérique — utile pour les cahiers de puzzles ou les activités avancées.',
    },
    {
      question: 'Pourquoi y a-t-il toujours exactement 4 problèmes par fiche ?',
      answer:
        'La fiche utilise un nombre fixe de 4 problèmes de correspondance (SELECT_COUNT = 4). Ce n\'est pas configurable. Quatre éléments offrent l\'équilibre optimal pour la correspondance de silhouettes et d\'images divisées : suffisamment de variété pour créer un véritable défi de correspondance avec le dérangement, tout en gardant chaque image assez grande pour que les utilisateurs étudient les détails fins des silhouettes et des moitiés divisées. Le format constant de 4 éléments fonctionne aussi bien pour les produits en pack où chaque page a une densité de contenu prévisible.',
    },
    {
      question: 'Comment fonctionnent les champs nom et date ?',
      answer:
        'Activez la case \" Inclure les Champs Nom/Date \" dans le panneau Configuration de l\'Exercice pour ajouter des lignes nom et date en bas de la fiche. Quand cette option est activée, les utilisateurs peuvent écrire leur nom et la date directement sur la page imprimée — essentiel pour la responsabilité en ligne et la notation organisée. Quand elle est désactivée, la fiche utilise toute la surface de la page pour le contenu de correspondance. Cette option fonctionne avec les deux modes Trouve l\'Ombre et Reconstitue l\'Image.',
    },
    {
      question: 'Comment fonctionne le corrigé auto-généré ?',
      answer:
        'Le générateur utilise un système à double canevas avec un onglet Fiche de Travail et un onglet Corrigé. En mode Trouve l\'Ombre, le corrigé affiche une grille où chaque cellule présente l\'image originale à côté de sa silhouette avec une étiquette comme \" A → 2 \". En mode Reconstitue l\'Image, chaque cellule affiche l\'image originale complète avec son étiquette de correspondance. La grille utilise 4 colonnes avec un espacement constant. Les deux versions s\'exportent séparément via quatre boutons de téléchargement dédiés : fiche JPEG, fiche PDF, corrigé JPEG et corrigé PDF.',
    },
    {
      question: 'Y a-t-il un essai gratuit ?',
      answer:
        'Oui. Vous pouvez accéder à chaque fonctionnalité — les deux modes d\'exercice, les silhouettes auto-générées, les options de direction de coupe, le corrigé, la bibliothèque d\'images complète, les thèmes de fond et de bordure, la bascule des étiquettes, les champs nom/date, les outils texte et tous les formats de téléchargement — sans créer de compte, entrer de carte bancaire ni installer de logiciel. Les téléchargements de l\'essai gratuit incluent un petit filigrane. Une licence commerciale supprime le filigrane et accorde les droits de vente complets.',
    },
    {
      question: 'Le Générateur de Discrimination Visuelle est-il sensible à la langue ?',
      answer:
        'Non. La Discrimination Visuelle est purement visuelle — le résultat de la fiche contient uniquement des images, des silhouettes et des moitiés divisées sans contenu textuel localisé. L\'interface de l\'application (menus, boutons, texte de l\'en-tête) prend en charge les 11 langues, mais la fiche générée fonctionne de manière identique quel que soit le choix de langue. Cela rend les fiches de discrimination visuelle universellement vendables sur tous les marchés sans traduction. La Licence Commerciale inclut 10 thèmes colorés ; l\'Accès Complet déverrouille les 104 thèmes et les 11 langues d\'interface.',
    },
    {
      question: 'Puis-je vendre des fiches de discrimination visuelle créées avec cet outil sur Etsy et Amazon KDP ?',
      answer:
        'Oui. Avec une licence commerciale, vous avez tous les droits pour vendre vos fiches de discrimination visuelle comme téléchargements numériques sur Etsy, comme cahiers imprimés sur Amazon KDP, comme ressources imprimables sur Gumroad, ou via tout autre canal de vente. Les deux modes d\'exercice, les silhouettes auto-générées, l\'algorithme de dérangement, les corrigés automatiques et les 104 collections d\'images thématiques vous donnent les outils créatifs pour produire des produits de correspondance visuelle originaux et vendables.',
    },
    {
      question: 'Quelle est la politique de remboursement ?',
      answer:
        'Comme l\'essai gratuit vous donne accès à chaque fonctionnalité, nous n\'offrons pas de remboursements sur les achats de licences commerciales. Vous pouvez tester les deux modes d\'exercice, les silhouettes auto-générées, les options de direction de coupe, le corrigé, la bibliothèque d\'images complète, les thèmes de fond et de bordure, la bascule des étiquettes, les champs nom/date, les outils texte et tous les formats de téléchargement avant d\'acheter. L\'essai gratuit est la politique de remboursement — assurez-vous que l\'outil répond à vos besoins avant d\'acheter une licence.',
    },
  ],

  internalLinks: [
    {
      pageType: 'app',
      slug: 'association-fiches',
      anchorText: 'Générateur de Fiches d\'Association',
    },
    {
      pageType: 'app',
      slug: 'puzzle-grille-fiches',
      anchorText: 'Générateur de Puzzles Grille',
    },
    {
      pageType: 'app',
      slug: 'bingo-images-fiches',
      anchorText: 'Générateur de Bingo d\'Images',
    },
    {
      pageType: 'app',
      slug: 'tri-images-fiches',
      anchorText: 'Générateur de Fiches de Tri d\'Images',
    },
    {
      pageType: 'app',
      slug: 'coloriage-fiches',
      anchorText: 'Générateur de Fiches de Coloriage',
    },
    {
      pageType: 'app',
      slug: 'cherche-objets-fiches',
      anchorText: 'Générateur de Fiches Cherche et Trouve',
    },
    {
      pageType: 'bundle',
      slug: 'pack-association-tri',
      anchorText: 'Pack Association et Tri — Toutes les Applications de Correspondance en Un Seul Package',
    },
    {
      pageType: 'idea',
      slug: 'maternelle-idees-imprimables',
      anchorText: 'Idées d\'imprimables pour la maternelle',
    },
    {
      pageType: 'idea',
      slug: 'grande-section-idees-imprimables',
      anchorText: 'Idées d\'imprimables pour le jardin d\'enfants',
    },
    {
      pageType: 'start',
      slug: 'plan-activite-imprimables',
      anchorText: 'Plan d\'activité pour imprimables',
    },
    {
      pageType: 'guide',
      slug: 'creer-fiches-discrimination-visuelle',
      anchorText: 'Créer des fiches de discrimination visuelle',
    },
  ],

  visuals: {
    heroImages: {
      primary: '/samples/french/shadow match/Trouve l\'Ombre 1.webp',
      primaryAlt: 'Fiche de discrimination visuelle avec images en couleur dans la rangée du haut et silhouettes noires auto-générées dans la rangée du bas avec en-tête ambre',
    },
    sampleGallery: [
      {
        src: '/samples/french/shadow match/Trouve l\'Ombre 1.webp',
        alt: 'Fiche Trouve l\'Ombre montrant quatre images en couleur associées à quatre silhouettes noires avec étiquettes lettres et numéros',
        caption: 'Mode Trouve l\'Ombre — les utilisateurs associent les images à leurs silhouettes auto-générées',
      },
      {
        src: '/samples/french/shadow match/Trouve l\'Ombre 2.webp',
        alt: 'Fiche Reconstitue l\'Image avec des moitiés d\'images séparées que les utilisateurs reconnectent en associant premières et secondes moitiés',
        caption: 'Mode Reconstitue l\'Image — les utilisateurs associent les moitiés d\'images pour compléter les illustrations',
      },
      {
        src: '/samples/french/shadow match/Trouve l\'Ombre 1 answer-key.webp',
        alt: 'Corrigé de discrimination visuelle montrant les images originales avec silhouettes et étiquettes de correspondance lettre-numéro correctes',
        caption: 'Corrigé auto-généré — les étiquettes lettre-numéro indiquent les correspondances correctes',
      },
    ],
    youtubeId: 'TYvUXJeMI98',
    videoTitle: 'Comment Créer des Fiches de Discrimination Visuelle avec Silhouettes et Images Divisées — Tutoriel Étape par Étape',
  },
};

export default content;
