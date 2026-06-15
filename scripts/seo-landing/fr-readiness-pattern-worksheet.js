'use strict';
module.exports = {
  type: 'pattern-worksheet',
  eyebrow: 'Fiche : Suites logiques',
  strand: 'Premiers outils mathématiques',
  slotWord: 'images',
  level: 'maternelle',
  h1: (mk, theme) => 'Suites logiques : ' + theme.h1Display + ' – fiche pour la maternelle',
  carousel: (mk, h1Display) => 'Suites logiques – ' + h1Display,
  modes: {
    'null': {
      SKEL: [
        // 1 — what the child does
        "Sur cette fiche, votre enfant regarde une suite logique d'images et complète la case vide avec ce qui doit venir ensuite. Les dessins de {LES_PL} se succèdent dans un ordre logique, et il suffit d'observer pour deviner la suite. C'est une activité douce qui invite à raisonner sans se presser : on regarde, on réfléchit, puis on dessine ou on entoure la bonne image. Compléter la suite, c'est apprendre à anticiper ce qui arrive après, une compétence précieuse à la maternelle. Cette fiche à imprimer met en scène {DES_PL} familiers pour que votre enfant se sente en confiance dès le premier coup d'œil et prenne plaisir à trouver la suite.",
        // 2 — why readiness
        "Raisonner sur un ordre logique muscle l'attention et la logique bien avant les nombres. En complétant la suite, votre enfant apprend à observer une régularité, à repérer la logique qui relie les images de {LES_PL}, puis à en déduire ce qui doit venir ensuite. Ce petit effort de raisonnement prépare en douceur les futurs apprentissages de la maternelle. La suite logique invite à regarder de près, à comparer, à anticiper : autant de gestes mentaux que l'on retrouvera plus tard avec les quantités. Ici, pas de calcul ni de chiffre : seulement le plaisir d'observer et de compléter, à son rythme, une séquence d'images claires et rassurantes.",
        // 3 — print-sheet face
        "Voici une fiche prête à imprimer pour s'entraîner aux suites logiques à la maison ou en classe. Votre enfant observe la séquence d'images de {LES_PL}, repère l'ordre logique, puis complète la case vide avec ce qui doit venir ensuite. Imprimez-la, posez-la sur la table, donnez un crayon : tout est prêt. La fiche reste simple et lisible, pensée pour de petites mains de maternelle. On peut la refaire plusieurs fois, car observer et compléter une suite logique se savoure et se rejoue sans lassitude. C'est l'occasion d'un moment calme où l'on prend le temps de raisonner ensemble, sans pression.",
        // 4 — home or class
        "À la maison comme en classe, cette fiche de suites logiques trouve facilement sa place. Sur le coin d'une table, pendant un temps calme ou un atelier de maternelle, votre enfant observe une séquence d'images de {LES_PL} et complète la case vide. L'activité demande peu de matériel : la fiche, un crayon, un peu d'attention. On observe l'ordre logique, on devine ce qui doit venir ensuite, on complète la suite. Les parents apprécient de pouvoir accompagner sans rien préparer, et les enseignants d'avoir une fiche claire à glisser dans un atelier. Partout, le même plaisir tranquille : regarder, raisonner, trouver la suite.",
        // 5 — free + print or online
        "Cette fiche de suites logiques est gratuite : on peut l'imprimer ou la compléter en ligne, comme on préfère. Sur papier, votre enfant entoure ou dessine ce qui doit venir ensuite dans la suite d'images de {LES_PL} ; en ligne, il clique sur la bonne image pour compléter la case vide. Dans les deux cas, le travail reste le même : observer l'ordre logique et trouver la suite. La version imprimée se range dans un cahier, la version en ligne se rejoue à volonté. À vous de choisir le format qui convient le mieux au moment et à l'enfant, sans rien débourser.",
        // 6 — calm pacing
        "Ici, on prend tout son temps. Aucune horloge, aucun score : votre enfant observe la suite logique de {LES_PL} aussi longtemps qu'il le souhaite avant de compléter la case vide. Ce rythme calme aide à raisonner sereinement et à savourer le moment où l'on devine enfin ce qui doit venir ensuite. Si l'enfant hésite, on regarde de nouveau ensemble, on suit l'ordre logique du doigt, on en parle doucement. La suite logique n'est pas une course : c'est une invitation à observer, à réfléchir et à trouver la suite à son rythme. Cette tranquillité fait toute la valeur de la fiche.",
        // 7 — "pour vous" / parent-teacher angle
        "Nous avons préparé cette fiche de suites logiques pour vous, parents et enseignants, afin que vous ayez sous la main une activité simple et solide. Tout est pensé pour la maternelle : des images de {LES_PL} bien lisibles, un ordre logique clair, une seule case vide à compléter. Vous n'avez rien à préparer : vous lancez l'activité, vous laissez votre enfant observer et raisonner, vous l'encouragez quand il trouve la suite. Pour accompagner, il suffit de poser de petites questions : « Que vois-tu ? », « Qu'est-ce qui vient ensuite ? ». La fiche fait le reste et offre un beau moment partagé autour de la logique.",
        // 8 — the complete-the-sequence image
        "Le cœur de cette fiche, c'est l'image à compléter. Une suite de dessins de {LES_PL} se déroule sous les yeux de votre enfant, puis une case reste vide à la fin. À lui d'observer l'ordre logique et de trouver la suite : que doit-il y avoir dans cette case ? En dessinant ou en entourant la bonne image, il complète la séquence et boucle le raisonnement. Ce geste tout simple — compléter la suite logique — concentre toute l'activité. Les images de {N_PL} rendent la tâche concrète et accueillante, et chaque case complétée apporte une petite fierté tranquille, sans note ni pression."
      ],
      P2: [
        // 1
        "Votre enfant observe la suite logique de {LES_PL}, repère l'ordre dans lequel les images se suivent, puis complète la case vide avec ce qui doit venir ensuite. Tout se joue dans le regard : on observe, on raisonne, on trouve la suite. Une activité calme qui prépare en douceur la logique.",
        // 2
        "Compléter la suite, c'est anticiper. En suivant l'ordre logique des images de {N_PL}, votre enfant apprend à deviner ce qui vient après. Ce petit raisonnement, refait plusieurs fois, devient un réflexe utile à la maternelle. La fiche reste simple, lisible et rassurante pour de jeunes apprentis.",
        // 3
        "Imprimez la fiche, posez un crayon, laissez faire. Votre enfant observe la séquence de {LES_PL} et complète la case vide. Rien à préparer : la suite logique est prête à l'emploi, à la maison comme en classe. On peut la rejouer souvent, car observer et raisonner ne lasse jamais les petits.",
        // 4
        "Pas de chrono, pas de note. Sur cette fiche, votre enfant prend le temps d'observer la suite logique de {LES_PL} avant de compléter la case vide. Ce rythme tranquille l'aide à raisonner sereinement et à savourer le moment où il trouve la suite. La logique se construit en douceur, sans aucune pression.",
        // 5
        "À vous de choisir : imprimer la fiche ou la compléter en ligne, c'est gratuit. Dans les deux cas, votre enfant observe l'ordre logique des images de {N_PL} et complète la suite. Sur papier on entoure, en ligne on clique : le raisonnement reste le même, et le plaisir de trouver la suite aussi.",
        // 6
        "La case vide attend ce qui doit venir ensuite. Votre enfant observe la séquence de {LES_PL}, suit la logique du doigt, puis complète. Ce geste tout simple résume l'activité : regarder, raisonner, trouver la suite. Chaque case complétée apporte une petite fierté, à son rythme et sans comparaison.",
        // 7
        "Pour accompagner, posez de petites questions : « Que vois-tu ? », « Qu'est-ce qui vient ensuite ? ». Votre enfant observe alors la suite logique de {LES_PL} et complète la case vide. Vous n'avez rien à préparer : la fiche guide le raisonnement, et vous partagez un moment calme autour de la logique."
      ]
    }
  },
  P3: "Voici donc une jolie fiche de suites logiques à savourer ensemble, sans la moindre pression. {GEN} observe, raisonne et complète à son rythme : il n'y a ni note ni chrono, seulement le plaisir tranquille de trouver la suite. Si un thème lui plaît, n'hésitez pas à essayer {NB1} ou {NB2} : on change d'images, on recommence, on s'amuse encore. Tout est gratuit, à imprimer ou à compléter en ligne, autant de fois que vous le souhaitez. Chaque case complétée est une petite victoire calme, et chaque hésitation, une belle occasion de regarder ensemble et de raisonner doucement. Bonne fiche, et surtout, bon moment partagé."
};
