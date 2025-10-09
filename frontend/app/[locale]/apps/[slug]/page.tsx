import { Metadata } from 'next';
import WebComponentWrapper from '@/components/WebComponentWrapper';
import AppContent from './AppContent';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface PageProps {
  params: {
    locale: string;
    slug: string;
  };
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const appData = await getAppData(params.slug, params.locale);
  
  if (!appData) {
    return {
      title: 'App Not Found - LessonCraftStudio',
      description: 'The requested worksheet generator could not be found.'
    };
  }

  return {
    title: `${appData.name || appData.appId} - LessonCraftStudio`,
    description: appData.description || `Create professional ${appData.name || appData.appId} worksheets for your educational materials`,
    keywords: `${appData.name || appData.appId}, worksheet generator, teachers pay teachers, educational resources, printable worksheets`
  };
}

// Fetch app data from Strapi or use static data
async function getAppData(slug: string, locale: string) {
  // French translations
  const frenchTranslations: Record<string, any> = {
    'image-addition': {
      name: 'Addition avec Images',
      appId: 'image-addition',
      description: 'Créez des fiches d\'addition visuelles avec des images pour l\'apprentissage des mathématiques',
      category: 'Mathématiques',
      requiredTier: 'core',
      features: ['Problèmes mathématiques visuels', 'Difficulté personnalisable', 'Corrigés inclus', 'Format prêt à imprimer']
    },
    'alphabet-train': {
      name: 'Train de l\'Alphabet',
      appId: 'alphabet-train',
      description: 'Aidez les enfants à apprendre les lettres avec des fiches ludiques sur le thème du train',
      category: 'Langue & Lecture',
      requiredTier: 'core',
      features: ['Reconnaissance des lettres', 'Ordre alphabétique', 'Thème amusant du train', 'Plusieurs niveaux de difficulté']
    },
    'big-small-app': {
      name: 'Grand ou Petit',
      appId: 'big-small-app',
      description: 'Créez des fiches de comparaison de tailles avec des exercices visuels pour débutants',
      category: 'Apprentissage Précoce',
      requiredTier: 'full',
      features: ['Comparaisons de tailles', 'Exercices visuels', 'Choix multiples', 'Exercices de séquençage']
    },
    'chart-count-color': {
      name: 'Graphique à Compter',
      appId: 'chart-count-color',
      description: 'Créez des fiches de comptage et de graphiques colorés pour l\'apprentissage des nombres',
      category: 'Mathématiques',
      requiredTier: 'full',
      features: ['Exercices de comptage visuels', 'Graphiques en couleur', 'Apprentissage des nombres', 'Format prêt à imprimer']
    },
    'code-addition': {
      name: 'Addition Codée',
      appId: 'code-addition',
      description: 'Créez des exercices d\'addition avec des codes pour rendre les mathématiques amusantes',
      category: 'Mathématiques',
      requiredTier: 'full',
      features: ['Addition avec codes secrets', 'Activités ludiques', 'Difficulté adaptable', 'Corrigés inclus']
    },
    'coloring': {
      name: 'Pages de Coloriage',
      appId: 'coloring',
      description: 'Créez des pages de coloriage imprimables à partir de notre vaste bibliothèque d\'images',
      category: 'Art & Créativité',
      requiredTier: 'core',
      features: ['Plus de 100 images', 'Thèmes variés', 'Différents niveaux de difficulté', 'Impressions haute qualité']
    },
    'image-crossword': {
      name: 'Mots Croisés avec Images',
      appId: 'image-crossword',
      description: 'Générez des mots croisés illustrés pour enrichir le vocabulaire',
      category: 'Jeux de Mots',
      requiredTier: 'full',
      features: ['Génération automatique', 'Indices personnalisables', 'Différentes tailles de grilles', 'Corrigés inclus']
    },
    'image-cryptogram': {
      name: 'Cryptogramme avec Images',
      appId: 'image-cryptogram',
      description: 'Créez des cryptogrammes illustrés pour développer la logique et le vocabulaire',
      category: 'Énigmes',
      requiredTier: 'full',
      features: ['Cryptogrammes visuels', 'Codes personnalisables', 'Différents niveaux', 'Solutions fournies']
    },
    'draw-and-color': {
      name: 'Dessiner et Colorier',
      appId: 'draw-and-color',
      description: 'Créez des fiches combinant dessin et coloriage pour stimuler la créativité',
      category: 'Art & Créativité',
      requiredTier: 'full',
      features: ['Espaces de dessin libre', 'Zones à colorier', 'Thèmes variés', 'Stimule la créativité']
    },
    'drawing-lines': {
      name: 'Tracer des Lignes',
      appId: 'drawing-lines',
      description: 'Développez la motricité fine par des exercices de traçage de lignes',
      category: 'Motricité Fine',
      requiredTier: 'core',
      features: ['Activités de traçage', 'Reliez les points', 'Suivre un chemin', 'Préparation à l\'écriture']
    },
    'find-and-count': {
      name: 'Chercher et Compter',
      appId: 'find-and-count',
      description: 'Exercices de comptage visuel pour développer la reconnaissance des nombres',
      category: 'Perception Visuelle',
      requiredTier: 'core',
      features: ['Comptage d\'objets', 'Discrimination visuelle', 'Pratique des nombres', 'Images attrayantes']
    },
    'find-objects': {
      name: 'Chercher les Objets',
      appId: 'find-objects',
      description: 'Créez des fiches de recherche d\'objets pour améliorer l\'attention visuelle',
      category: 'Perception Visuelle',
      requiredTier: 'full',
      features: ['Exercices de recherche visuelle', 'Développe l\'attention', 'Thèmes variés', 'Différents niveaux de difficulté']
    },
    'grid-match': {
      name: 'Association sur Grille',
      appId: 'grid-match',
      description: 'Créez des exercices d\'association sur grille pour développer la perception spatiale',
      category: 'Association',
      requiredTier: 'full',
      features: ['Correspondance de motifs', 'Orientation spatiale', 'Perception visuelle', 'Difficulté progressive']
    },
    'matching-app': {
      name: 'Créateur d\'Associations',
      appId: 'matching-app',
      description: 'Créez des activités d\'association pour améliorer la mémoire et les capacités d\'association',
      category: 'Association',
      requiredTier: 'core',
      features: ['Association image à image', 'Association mot à image', 'Jeux de mémoire', 'Paires personnalisables']
    },
    'math-puzzle': {
      name: 'Énigmes Mathématiques',
      appId: 'math-puzzle',
      description: 'Créez des énigmes mathématiques stimulantes pour développer la logique',
      category: 'Mathématiques',
      requiredTier: 'full',
      features: ['Énigmes de calcul', 'Logique mathématique', 'Différents niveaux', 'Solutions incluses']
    },
    'math-worksheet': {
      name: 'Fiches de Mathématiques',
      appId: 'math-worksheet',
      description: 'Générez des fiches de mathématiques personnalisables pour tous les niveaux',
      category: 'Mathématiques',
      requiredTier: 'core',
      features: ['Addition et soustraction', 'Multiplication et division', 'Corrigés inclus', 'Niveaux de difficulté ajustables']
    },
    'missing-pieces': {
      name: 'Pièces Manquantes',
      appId: 'missing-pieces',
      description: 'Créez des exercices de complétion visuelle pour développer la logique',
      category: 'Logique',
      requiredTier: 'full',
      features: ['Identification des éléments manquants', 'Raisonnement logique', 'Exercices visuels', 'Difficulté progressive']
    },
    'more-less': {
      name: 'Plus ou Moins',
      appId: 'more-less',
      description: 'Créez des exercices de comparaison de quantités pour apprendre les concepts mathématiques',
      category: 'Mathématiques',
      requiredTier: 'full',
      features: ['Comparaison de quantités', 'Concepts mathématiques', 'Exercices visuels', 'Apprentissage progressif']
    },
    'odd-one-out': {
      name: 'L\'Intrus',
      appId: 'odd-one-out',
      description: 'Créez des exercices pour identifier l\'élément différent et développer l\'analyse',
      category: 'Logique',
      requiredTier: 'full',
      features: ['Identification de différences', 'Raisonnement logique', 'Catégorisation', 'Exercices variés']
    },
    'pattern-train': {
      name: 'Train des Motifs',
      appId: 'pattern-train',
      description: 'Créez des fiches de séquences sur le thème du train pour reconnaître les motifs',
      category: 'Logique',
      requiredTier: 'full',
      features: ['Reconnaissance de motifs', 'Séquences logiques', 'Thème du train', 'Difficulté progressive']
    },
    'pattern-worksheet': {
      name: 'Fiches de Motifs',
      appId: 'pattern-worksheet',
      description: 'Créez des fiches pour apprendre les séquences et les motifs répétitifs',
      category: 'Logique',
      requiredTier: 'full',
      features: ['Motifs et séquences', 'Reconnaissance visuelle', 'Raisonnement logique', 'Plusieurs niveaux']
    },
    'picture-bingo': {
      name: 'Loto des Images',
      appId: 'picture-bingo',
      description: 'Générez des cartes de loto personnalisées avec des images pour la classe',
      category: 'Jeux',
      requiredTier: 'core',
      features: ['Cartes de loto personnalisées', 'Images thématiques', 'Plusieurs tailles de cartes', 'Feuilles d\'appel incluses']
    },
    'picture-path': {
      name: 'Chemin des Images',
      appId: 'picture-path',
      description: 'Créez des parcours visuels pour développer la logique et le suivi de consignes',
      category: 'Logique',
      requiredTier: 'full',
      features: ['Parcours à suivre', 'Logique séquentielle', 'Exercices visuels', 'Plusieurs niveaux de difficulté']
    },
    'picture-sort': {
      name: 'Tri d\'Images',
      appId: 'picture-sort',
      description: 'Créez des activités de classement d\'images pour développer la catégorisation',
      category: 'Logique',
      requiredTier: 'full',
      features: ['Tri et classification', 'Catégorisation', 'Raisonnement logique', 'Thèmes variés']
    },
    'prepositions': {
      name: 'Prépositions',
      appId: 'prepositions',
      description: 'Créez des exercices visuels pour apprendre les prépositions de manière ludique',
      category: 'Grammaire',
      requiredTier: 'full',
      features: ['Prépositions spatiales', 'Exercices illustrés', 'Apprentissage visuel', 'Facile à comprendre']
    },
    'shadow-match': {
      name: 'Association d\'Ombres',
      appId: 'shadow-match',
      description: 'Créez des exercices d\'association d\'objets avec leurs ombres',
      category: 'Perception Visuelle',
      requiredTier: 'full',
      features: ['Association forme-ombre', 'Perception visuelle', 'Discrimination visuelle', 'Différents niveaux']
    },
    'subtraction': {
      name: 'Soustraction',
      appId: 'subtraction',
      description: 'Créez des fiches de soustraction visuelles pour l\'apprentissage des mathématiques',
      category: 'Mathématiques',
      requiredTier: 'full',
      features: ['Exercices de soustraction', 'Support visuel', 'Difficulté adaptable', 'Corrigés inclus']
    },
    'sudoku': {
      name: 'Sudoku pour Enfants',
      appId: 'sudoku',
      description: 'Sudoku ludiques avec des images au lieu de chiffres pour les enfants',
      category: 'Logique',
      requiredTier: 'core',
      features: ['Sudoku avec images', 'Grilles 4x4 et 6x6', 'Difficulté progressive', 'Solutions incluses']
    },
    'treasure-hunt': {
      name: 'Chasse au Trésor',
      appId: 'treasure-hunt',
      description: 'Créez des fiches de chasse au trésor pour des activités ludiques et éducatives',
      category: 'Jeux Éducatifs',
      requiredTier: 'full',
      features: ['Parcours de recherche', 'Activités ludiques', 'Cartes personnalisables', 'Stimule la réflexion']
    },
    'word-guess': {
      name: 'Deviner les Mots',
      appId: 'word-guess',
      description: 'Créez des fiches pour deviner les mots et enrichir le vocabulaire',
      category: 'Jeux de Mots',
      requiredTier: 'full',
      features: ['Devinettes de mots', 'Indices visuels', 'Enrichissement du vocabulaire', 'Plusieurs niveaux']
    },
    'word-scramble': {
      name: 'Mots Mêlés',
      appId: 'word-scramble',
      description: 'Créez des fiches de mots mêlés pour améliorer le vocabulaire et l\'orthographe',
      category: 'Langue & Lecture',
      requiredTier: 'core',
      features: ['Listes de mots personnalisées', 'Vocabulaire thématique', 'Plusieurs niveaux de difficulté', 'Corrigés inclus']
    },
    'word-search': {
      name: 'Mots Cachés',
      appId: 'word-search',
      description: 'Générez des grilles de mots cachés personnalisables avec vocabulaire thématique',
      category: 'Jeux de Mots',
      requiredTier: 'free',
      features: ['Plusieurs tailles de grilles', 'Options directionnelles', 'Listes de mots thématiques', 'Corrigés inclus']
    },
    'writing-app': {
      name: 'Exercices d\'Écriture',
      appId: 'writing-app',
      description: 'Créez des fiches d\'écriture personnalisées pour développer les compétences rédactionnelles',
      category: 'Compétences Rédactionnelles',
      requiredTier: 'full',
      features: ['Lignes d\'écriture personnalisables', 'Thèmes variés', 'Support visuel', 'Format prêt à imprimer']
    }
  };

  // Spanish translations
  const spanishTranslations: Record<string, any> = {
    'image-addition': {
      name: 'Suma con Imágenes',
      appId: 'image-addition',
      description: 'Crea fichas de sumas visuales con imágenes para el aprendizaje matemático inicial',
      category: 'Matemáticas',
      requiredTier: 'core',
      features: ['Problemas matemáticos visuales', 'Dificultad personalizable', 'Hojas de respuestas', 'Formato listo para imprimir']
    },
    'alphabet-train': {
      name: 'Tren del Alfabeto',
      appId: 'alphabet-train',
      description: 'Ayuda a los niños a aprender las letras con fichas divertidas del tren del alfabeto',
      category: 'Lengua y Lectura',
      requiredTier: 'core',
      features: ['Reconocimiento de letras', 'Orden alfabético', 'Temática divertida de trenes', 'Múltiples niveles de dificultad']
    },
    'big-small-app': {
      name: 'Grande o Pequeño',
      appId: 'big-small-app',
      description: 'Crea fichas de comparación de tamaños con ejercicios visuales para primeros aprendizajes',
      category: 'Aprendizaje Temprano',
      requiredTier: 'full',
      features: ['Comparación de tamaños', 'Ejercicios visuales', 'Opción múltiple', 'Actividades de secuenciación']
    },
    'chart-count-color': {
      name: 'Gráficos para Contar',
      appId: 'chart-count-color',
      description: 'Crea fichas de conteo y gráficos coloridos para el aprendizaje numérico',
      category: 'Matemáticas',
      requiredTier: 'full',
      features: ['Ejercicios de conteo visual', 'Gráficos a color', 'Aprendizaje de números', 'Formato listo para imprimir']
    },
    'code-addition': {
      name: 'Suma con Códigos',
      appId: 'code-addition',
      description: 'Crea ejercicios de suma con códigos secretos para hacer las matemáticas más divertidas',
      category: 'Matemáticas',
      requiredTier: 'full',
      features: ['Sumas con códigos secretos', 'Actividades lúdicas', 'Dificultad ajustable', 'Hojas de respuestas incluidas']
    },
    'coloring': {
      name: 'Páginas para Colorear',
      appId: 'coloring',
      description: 'Diseña páginas para colorear imprimibles desde nuestra amplia biblioteca de imágenes',
      category: 'Arte y Creatividad',
      requiredTier: 'core',
      features: ['Más de 100 imágenes', 'Múltiples temáticas', 'Varios niveles de dificultad', 'Impresiones de alta calidad']
    },
    'image-crossword': {
      name: 'Crucigrama con Imágenes',
      appId: 'image-crossword',
      description: 'Genera crucigramas ilustrados para enriquecer el vocabulario',
      category: 'Juegos de Palabras',
      requiredTier: 'full',
      features: ['Generación automática', 'Pistas personalizables', 'Diferentes tamaños de cuadrícula', 'Hojas de respuestas incluidas']
    },
    'image-cryptogram': {
      name: 'Criptograma con Imágenes',
      appId: 'image-cryptogram',
      description: 'Crea criptogramas ilustrados para desarrollar la lógica y el vocabulario',
      category: 'Acertijos',
      requiredTier: 'full',
      features: ['Criptogramas visuales', 'Códigos personalizables', 'Diferentes niveles', 'Soluciones incluidas']
    },
    'draw-and-color': {
      name: 'Dibujar y Colorear',
      appId: 'draw-and-color',
      description: 'Crea fichas que combinan dibujo y coloreo para estimular la creatividad',
      category: 'Arte y Creatividad',
      requiredTier: 'full',
      features: ['Espacios para dibujo libre', 'Zonas para colorear', 'Temáticas variadas', 'Estimula la creatividad']
    },
    'drawing-lines': {
      name: 'Trazar Líneas',
      appId: 'drawing-lines',
      description: 'Desarrolla la motricidad fina mediante ejercicios de trazado de líneas',
      category: 'Motricidad Fina',
      requiredTier: 'core',
      features: ['Actividades de trazado', 'Une los puntos', 'Seguimiento de caminos', 'Preparación para la escritura']
    },
    'find-and-count': {
      name: 'Buscar y Contar',
      appId: 'find-and-count',
      description: 'Ejercicios de conteo visual para desarrollar el reconocimiento numérico',
      category: 'Percepción Visual',
      requiredTier: 'core',
      features: ['Conteo de objetos', 'Discriminación visual', 'Práctica numérica', 'Imágenes atractivas']
    },
    'find-objects': {
      name: 'Buscar Objetos',
      appId: 'find-objects',
      description: 'Crea fichas de búsqueda de objetos para mejorar la atención visual',
      category: 'Percepción Visual',
      requiredTier: 'full',
      features: ['Ejercicios de búsqueda visual', 'Desarrolla la atención', 'Temáticas variadas', 'Diferentes niveles de dificultad']
    },
    'grid-match': {
      name: 'Asociación en Cuadrícula',
      appId: 'grid-match',
      description: 'Crea ejercicios de asociación en cuadrícula para desarrollar la percepción espacial',
      category: 'Asociación',
      requiredTier: 'full',
      features: ['Correspondencia de patrones', 'Orientación espacial', 'Percepción visual', 'Dificultad progresiva']
    },
    'matching-app': {
      name: 'Creador de Parejas',
      appId: 'matching-app',
      description: 'Crea actividades de asociación para mejorar la memoria y las habilidades de emparejamiento',
      category: 'Asociación',
      requiredTier: 'core',
      features: ['Asociación imagen a imagen', 'Asociación palabra a imagen', 'Juegos de memoria', 'Parejas personalizables']
    },
    'math-puzzle': {
      name: 'Acertijos Matemáticos',
      appId: 'math-puzzle',
      description: 'Crea acertijos matemáticos desafiantes para desarrollar la lógica',
      category: 'Matemáticas',
      requiredTier: 'full',
      features: ['Acertijos de cálculo', 'Lógica matemática', 'Diferentes niveles', 'Soluciones incluidas']
    },
    'math-worksheet': {
      name: 'Fichas de Matemáticas',
      appId: 'math-worksheet',
      description: 'Genera fichas de práctica matemática personalizables para todos los niveles',
      category: 'Matemáticas',
      requiredTier: 'core',
      features: ['Suma y resta', 'Multiplicación y división', 'Hojas de respuestas', 'Niveles de dificultad ajustables']
    },
    'missing-pieces': {
      name: 'Piezas Faltantes',
      appId: 'missing-pieces',
      description: 'Crea ejercicios de completar elementos visuales para desarrollar la lógica',
      category: 'Lógica',
      requiredTier: 'full',
      features: ['Identificación de elementos faltantes', 'Razonamiento lógico', 'Ejercicios visuales', 'Dificultad progresiva']
    },
    'more-less': {
      name: 'Más o Menos',
      appId: 'more-less',
      description: 'Crea ejercicios de comparación de cantidades para aprender conceptos matemáticos',
      category: 'Matemáticas',
      requiredTier: 'full',
      features: ['Comparación de cantidades', 'Conceptos matemáticos básicos', 'Ejercicios visuales', 'Aprendizaje progresivo']
    },
    'odd-one-out': {
      name: 'El Diferente',
      appId: 'odd-one-out',
      description: 'Crea ejercicios para identificar el elemento diferente y desarrollar el análisis',
      category: 'Lógica',
      requiredTier: 'full',
      features: ['Identificación de diferencias', 'Razonamiento lógico', 'Categorización', 'Ejercicios variados']
    },
    'pattern-train': {
      name: 'Tren de Patrones',
      appId: 'pattern-train',
      description: 'Crea fichas de secuencias con temática de trenes para reconocer patrones',
      category: 'Lógica',
      requiredTier: 'full',
      features: ['Reconocimiento de patrones', 'Secuencias lógicas', 'Temática de trenes', 'Dificultad progresiva']
    },
    'pattern-worksheet': {
      name: 'Fichas de Patrones',
      appId: 'pattern-worksheet',
      description: 'Crea fichas para aprender secuencias y patrones repetitivos',
      category: 'Lógica',
      requiredTier: 'full',
      features: ['Patrones y secuencias', 'Reconocimiento visual', 'Razonamiento lógico', 'Múltiples niveles']
    },
    'picture-bingo': {
      name: 'Bingo de Imágenes',
      appId: 'picture-bingo',
      description: 'Genera cartones de bingo personalizados con imágenes para el aula',
      category: 'Juegos',
      requiredTier: 'core',
      features: ['Cartones de bingo personalizados', 'Imágenes temáticas', 'Múltiples tamaños de cartones', 'Hojas de llamado incluidas']
    },
    'picture-path': {
      name: 'Camino de Imágenes',
      appId: 'picture-path',
      description: 'Crea recorridos visuales para desarrollar la lógica y seguimiento de instrucciones',
      category: 'Lógica',
      requiredTier: 'full',
      features: ['Recorridos a seguir', 'Lógica secuencial', 'Ejercicios visuales', 'Múltiples niveles de dificultad']
    },
    'picture-sort': {
      name: 'Clasificar Imágenes',
      appId: 'picture-sort',
      description: 'Crea actividades de clasificación de imágenes para desarrollar la categorización',
      category: 'Lógica',
      requiredTier: 'full',
      features: ['Clasificación y ordenamiento', 'Categorización', 'Razonamiento lógico', 'Temáticas variadas']
    },
    'prepositions': {
      name: 'Preposiciones',
      appId: 'prepositions',
      description: 'Crea ejercicios visuales para aprender las preposiciones de forma lúdica',
      category: 'Gramática',
      requiredTier: 'full',
      features: ['Preposiciones espaciales', 'Ejercicios ilustrados', 'Aprendizaje visual', 'Fácil de comprender']
    },
    'shadow-match': {
      name: 'Asociación de Sombras',
      appId: 'shadow-match',
      description: 'Crea ejercicios de asociación de objetos con sus sombras',
      category: 'Percepción Visual',
      requiredTier: 'full',
      features: ['Asociación forma-sombra', 'Percepción visual', 'Discriminación visual', 'Diferentes niveles']
    },
    'subtraction': {
      name: 'Resta',
      appId: 'subtraction',
      description: 'Crea fichas de resta visuales para el aprendizaje matemático',
      category: 'Matemáticas',
      requiredTier: 'full',
      features: ['Ejercicios de resta', 'Apoyo visual', 'Dificultad ajustable', 'Hojas de respuestas incluidas']
    },
    'sudoku': {
      name: 'Sudoku para Niños',
      appId: 'sudoku',
      description: 'Sudokus lúdicos con imágenes en lugar de números para niños',
      category: 'Lógica',
      requiredTier: 'core',
      features: ['Sudoku con imágenes', 'Cuadrículas 4x4 y 6x6', 'Dificultad progresiva', 'Soluciones incluidas']
    },
    'treasure-hunt': {
      name: 'Búsqueda del Tesoro',
      appId: 'treasure-hunt',
      description: 'Crea fichas de búsqueda del tesoro para actividades lúdicas y educativas',
      category: 'Juegos Educativos',
      requiredTier: 'full',
      features: ['Recorridos de búsqueda', 'Actividades lúdicas', 'Mapas personalizables', 'Estimula el razonamiento']
    },
    'word-guess': {
      name: 'Adivinar Palabras',
      appId: 'word-guess',
      description: 'Crea fichas para adivinar palabras y enriquecer el vocabulario',
      category: 'Juegos de Palabras',
      requiredTier: 'full',
      features: ['Adivinanzas de palabras', 'Pistas visuales', 'Enriquecimiento del vocabulario', 'Múltiples niveles']
    },
    'word-scramble': {
      name: 'Palabras Revueltas',
      appId: 'word-scramble',
      description: 'Crea fichas de palabras revueltas para mejorar el vocabulario y la ortografía',
      category: 'Lengua y Lectura',
      requiredTier: 'core',
      features: ['Listas de palabras personalizadas', 'Vocabulario temático', 'Múltiples niveles de dificultad', 'Hojas de respuestas incluidas']
    },
    'word-search': {
      name: 'Sopa de Letras',
      appId: 'word-search',
      description: 'Genera sopas de letras personalizables con vocabulario temático',
      category: 'Juegos de Palabras',
      requiredTier: 'free',
      features: ['Múltiples tamaños de cuadrícula', 'Opciones direccionales', 'Listas de palabras temáticas', 'Hojas de respuestas incluidas']
    },
    'writing-app': {
      name: 'Ejercicios de Escritura',
      appId: 'writing-app',
      description: 'Crea fichas de escritura personalizadas para desarrollar las habilidades de redacción',
      category: 'Habilidades de Escritura',
      requiredTier: 'full',
      features: ['Líneas de escritura personalizables', 'Temáticas variadas', 'Apoyo visual', 'Formato listo para imprimir']
    }
  };

  // German translations
  const germanTranslations: Record<string, any> = {
    'image-addition': {
      name: 'Bilder-Addition',
      appId: 'image-addition',
      description: 'Erstellen Sie visuelle Additions-Arbeitsblätter mit Bildern für den Mathematik-Einstieg',
      category: 'Mathematik',
      requiredTier: 'core',
      features: ['Anschauliche Rechenaufgaben', 'Einstellbarer Schwierigkeitsgrad', 'Lösungsblätter inklusive', 'Druckfertige Formatierung']
    },
    'alphabet-train': {
      name: 'Alphabet-Zug',
      appId: 'alphabet-train',
      description: 'Spielerisches Buchstabenlernen mit liebevoll gestalteten Zug-Arbeitsblättern',
      category: 'Sprache & Lesen',
      requiredTier: 'core',
      features: ['Buchstabenerkennung', 'Alphabetische Reihenfolge', 'Motivierendes Zug-Design', 'Verschiedene Schwierigkeitsstufen']
    },
    'big-small-app': {
      name: 'Groß oder Klein',
      appId: 'big-small-app',
      description: 'Größenvergleiche kindgerecht vermitteln mit visuellen Übungen für die Frühförderung',
      category: 'Frühförderung',
      requiredTier: 'full',
      features: ['Größenvergleiche', 'Anschauliche Übungen', 'Multiple-Choice-Aufgaben', 'Reihenfolge-Aufgaben']
    },
    'chart-count-color': {
      name: 'Diagramm Zählen & Ausmalen',
      appId: 'chart-count-color',
      description: 'Zählen und Datenvisualisierung spielerisch kombinieren mit farbenfrohen Diagramm-Arbeitsblättern',
      category: 'Datenauswertung',
      requiredTier: 'full',
      features: ['Balkendiagramme erstellen', 'Zählübungen', 'Farbcodierung', 'Dateninterpretation']
    },
    'code-addition': {
      name: 'Geheimcode-Addition',
      appId: 'code-addition',
      description: 'Rechenübungen spannend gestalten mit Geheimcode-Rätseln zur Addition',
      category: 'Mathematik',
      requiredTier: 'full',
      features: ['Verschlüsselte Rechenaufgaben', 'Additions-Training', 'Entschlüsselungs-Spaß', 'Motivierende Rätsel']
    },
    'coloring': {
      name: 'Ausmalbilder',
      appId: 'coloring',
      description: 'Individuelle Ausmalbilder aus unserer umfangreichen Motivbibliothek gestalten',
      category: 'Kunst & Kreativität',
      requiredTier: 'core',
      features: ['Über 100 Motive', 'Vielfältige Themenwelten', 'Unterschiedliche Schwierigkeitsgrade', 'Hochwertige Druckqualität']
    },
    'image-crossword': {
      name: 'Bilder-Kreuzworträtsel',
      appId: 'image-crossword',
      description: 'Kreuzworträtsel mit Bildern als Hinweise für visuelles Vokabeltraining',
      category: 'Wortspiele',
      requiredTier: 'full',
      features: ['Bildbasierte Hinweise', 'Automatische Rätsel-Generierung', 'Flexible Rastergrößen', 'Lösungsschlüssel enthalten']
    },
    'image-cryptogram': {
      name: 'Bilder-Kryptogramm',
      appId: 'image-cryptogram',
      description: 'Knifflige Geheimschrift-Rätsel mit Bildern als Symbole erstellen',
      category: 'Rätsel',
      requiredTier: 'full',
      features: ['Bild-Symbole als Code', 'Entschlüsselungs-Spaß', 'Geheime Botschaften', 'Logisches Denken fördern']
    },
    'draw-and-color': {
      name: 'Zeichnen & Ausmalen',
      appId: 'draw-and-color',
      description: 'Kreativität fördern mit kombinierten Zeichen- und Ausmalvorlagen',
      category: 'Kunst & Kreativität',
      requiredTier: 'full',
      features: ['Schritt-für-Schritt-Anleitungen', 'Ausmalvorlagen', 'Zeichenübungen', 'Kreative Aufgabenstellungen']
    },
    'drawing-lines': {
      name: 'Linien Nachzeichnen',
      appId: 'drawing-lines',
      description: 'Feinmotorik spielerisch trainieren durch abwechslungsreiche Schwungübungen',
      category: 'Feinmotorik',
      requiredTier: 'core',
      features: ['Nachspurübungen', 'Punkteverbinden', 'Linienführung', 'Schreibvorbereitung']
    },
    'find-and-count': {
      name: 'Suchen & Zählen',
      appId: 'find-and-count',
      description: 'Zahlenverständnis aufbauen mit motivierenden Zähl- und Suchübungen',
      category: 'Visuelle Wahrnehmung',
      requiredTier: 'core',
      features: ['Objekte zählen', 'Visuelle Unterscheidung', 'Zahlenübungen', 'Ansprechende Motive']
    },
    'find-objects': {
      name: 'Objekte Finden',
      appId: 'find-objects',
      description: 'Konzentration und visuelle Wahrnehmung mit Suchbild-Arbeitsblättern schulen',
      category: 'Visuelle Wahrnehmung',
      requiredTier: 'full',
      features: ['Versteckte Objekte suchen', 'Wimmelbilder', 'Verschiedene Szenen', 'Aufmerksamkeit trainieren']
    },
    'grid-match': {
      name: 'Raster-Zuordnung',
      appId: 'grid-match',
      description: 'Räumliches Denken entwickeln mit rasterbasierte Zuordnungsübungen',
      category: 'Logik & Denken',
      requiredTier: 'full',
      features: ['Koordinatensystem-Übungen', 'Mustererkennung', 'Räumliche Orientierung', 'Zuordnungsaufgaben']
    },
    'matching-app': {
      name: 'Zuordnungsspiel',
      appId: 'matching-app',
      description: 'Gedächtnis und Assoziationsfähigkeit trainieren mit vielseitigen Zuordnungsaufgaben',
      category: 'Zuordnung',
      requiredTier: 'core',
      features: ['Bild-zu-Bild-Zuordnung', 'Wort-zu-Bild-Zuordnung', 'Memory-Spiele', 'Individuelle Paare']
    },
    'math-puzzle': {
      name: 'Mathe-Rätsel',
      appId: 'math-puzzle',
      description: 'Mathematisches Denken fördern mit abwechslungsreichen Knobel-Aufgaben',
      category: 'Mathematik',
      requiredTier: 'full',
      features: ['Spannende Rechenrätsel', 'Vielfältige Rätseltypen', 'Lösungsschlüssel', 'Anpassbare Schwierigkeit']
    },
    'math-worksheet': {
      name: 'Mathe-Arbeitsblätter',
      appId: 'math-worksheet',
      description: 'Flexible Mathematik-Übungsblätter für alle Klassenstufen und Rechenoperationen erstellen',
      category: 'Mathematik',
      requiredTier: 'core',
      features: ['Addition & Subtraktion', 'Multiplikation & Division', 'Lösungsblätter', 'Einstellbare Schwierigkeit']
    },
    'missing-pieces': {
      name: 'Fehlende Teile',
      appId: 'missing-pieces',
      description: 'Logisches Denken schulen durch Vervollständigungs-Aufgaben mit Mustern und Bildern',
      category: 'Visuelle Wahrnehmung',
      requiredTier: 'full',
      features: ['Muster vervollständigen', 'Bilder ergänzen', 'Sequenz-Übungen', 'Visuelle Analyse']
    },
    'more-less': {
      name: 'Mehr oder Weniger',
      appId: 'more-less',
      description: 'Mengenvergleiche und Zahlenverständnis mit anschaulichen Vergleichsübungen vermitteln',
      category: 'Mathematik',
      requiredTier: 'full',
      features: ['Mengenvergleiche', 'Zahlenvergleiche', 'Visuelle Darstellung', 'Grundrechenarten']
    },
    'odd-one-out': {
      name: 'Was passt nicht?',
      appId: 'odd-one-out',
      description: 'Kritisches Denken fördern mit Aufgaben zum Erkennen von Ausreißern und Unterschieden',
      category: 'Logik & Denken',
      requiredTier: 'full',
      features: ['Unterschiede erkennen', 'Logikrätsel', 'Verschiedene Themen', 'Analytisches Denken']
    },
    'pattern-train': {
      name: 'Muster-Zug',
      appId: 'pattern-train',
      description: 'Mustererkennung spielerisch üben mit motivierenden Zug-Arbeitsblättern',
      category: 'Logik & Denken',
      requiredTier: 'full',
      features: ['Mustersequenzen', 'Liebevolles Zug-Design', 'Fortsetzungsübungen', 'Logisches Denken']
    },
    'pattern-worksheet': {
      name: 'Muster-Arbeitsblätter',
      appId: 'pattern-worksheet',
      description: 'Vielseitige Übungen zur Mustererkennung und -vervollständigung für verschiedene Altersstufen',
      category: 'Logik & Denken',
      requiredTier: 'full',
      features: ['Abwechslungsreiche Muster', 'Sequenz-Übungen', 'Steigende Schwierigkeit', 'Visuelle Logik']
    },
    'picture-bingo': {
      name: 'Bilder-Bingo',
      appId: 'picture-bingo',
      description: 'Individuelle Bingo-Karten mit Bildern für kurzweiligen Lernspaß im Klassenzimmer',
      category: 'Spiele',
      requiredTier: 'core',
      features: ['Individuelle Bingo-Karten', 'Thematische Bilder', 'Verschiedene Kartengrößen', 'Ziehungs-Vorlagen inklusive']
    },
    'picture-path': {
      name: 'Bilderpfad',
      appId: 'picture-path',
      description: 'Wegfindung und Reihenfolgen trainieren mit bilderreichen Pfad-Übungen',
      category: 'Problemlösung',
      requiredTier: 'full',
      features: ['Wegfindungs-Aufgaben', 'Bildbasierte Pfade', 'Reihenfolgen üben', 'Richtungsübungen']
    },
    'picture-sort': {
      name: 'Bilder Sortieren',
      appId: 'picture-sort',
      description: 'Kategorisierung und Klassifizierung mit anschaulichen Sortier-Aufgaben vermitteln',
      category: 'Logik & Denken',
      requiredTier: 'full',
      features: ['Kategorien bilden', 'Sortieraufgaben', 'Klassifizierung', 'Gruppen zuordnen']
    },
    'prepositions': {
      name: 'Präpositionen',
      appId: 'prepositions',
      description: 'Räumliche Präpositionen anschaulich vermitteln mit bildhaften Übungsblättern',
      category: 'Grammatik',
      requiredTier: 'full',
      features: ['Anschauliche Beispiele', 'Positionsübungen', 'Vielfältige Präpositionen', 'Praktische Anwendungen']
    },
    'shadow-match': {
      name: 'Schatten-Zuordnung',
      appId: 'shadow-match',
      description: 'Visuelle Wahrnehmung schärfen durch Schatten-Zuordnungs-Rätsel',
      category: 'Visuelle Wahrnehmung',
      requiredTier: 'full',
      features: ['Schatten-Rätsel', 'Verschiedene Themen', 'Stufenweise Schwierigkeit', 'Visuelles Lernen']
    },
    'subtraction': {
      name: 'Subtraktion',
      appId: 'subtraction',
      description: 'Subtraktionsaufgaben anschaulich üben mit visuellen Hilfsmitteln und Bildern',
      category: 'Mathematik',
      requiredTier: 'full',
      features: ['Visuelle Subtraktionsübungen', 'Einstellbare Zahlenbereiche', 'Bildunterstützung', 'Lösungsschlüssel']
    },
    'sudoku': {
      name: 'Kinder-Sudoku',
      appId: 'sudoku',
      description: 'Altersgerechte Sudoku-Rätsel mit Bildern statt Zahlen für logisches Denken',
      category: 'Logik & Denken',
      requiredTier: 'core',
      features: ['Bild-Sudoku', '4x4 und 6x6 Raster', 'Steigende Schwierigkeit', 'Lösung enthalten']
    },
    'treasure-hunt': {
      name: 'Schatzsuche',
      appId: 'treasure-hunt',
      description: 'Spannende Schatzkarten und Such-Abenteuer für motivierenden Lernspaß gestalten',
      category: 'Spiele',
      requiredTier: 'full',
      features: ['Individuelle Karten', 'Versteckte Objekte', 'Hinweise und Rätsel', 'Abenteuer-Thema']
    },
    'word-guess': {
      name: 'Wörter Raten',
      appId: 'word-guess',
      description: 'Wortschatz und Rechtschreibung mit bildergestützten Ratespiele fördern',
      category: 'Wortspiele',
      requiredTier: 'full',
      features: ['Bildhinweise', 'Buchstabenlücken', 'Thematische Wörter', 'Verschiedene Schwierigkeitsgrade']
    },
    'word-scramble': {
      name: 'Buchstabensalat',
      appId: 'word-scramble',
      description: 'Rechtschreibung und Wortschatz mit abwechslungsreichen Buchstabensalat-Rätseln trainieren',
      category: 'Sprache & Lesen',
      requiredTier: 'core',
      features: ['Eigene Wortlisten', 'Thematischer Wortschatz', 'Verschiedene Schwierigkeitsgrade', 'Lösungsschlüssel']
    },
    'word-search': {
      name: 'Wortsuche',
      appId: 'word-search',
      description: 'Individuelle Wortsuchrätsel mit thematischem Vokabular zum Ausdrucken erstellen',
      category: 'Wortspiele',
      requiredTier: 'free',
      features: ['Flexible Rastergröße', 'Suchrichtungen einstellen', 'Thematische Wortlisten', 'Lösungsblätter']
    },
    'writing-app': {
      name: 'Schreibübungen',
      appId: 'writing-app',
      description: 'Strukturierte Schreibvorlagen und Schreibanlässe für alle Altersstufen erstellen',
      category: 'Schreibfertigkeiten',
      requiredTier: 'full',
      features: ['Schreibanlässe', 'Strukturierte Vorlagen', 'Verschiedene Formate', 'Altersgerechte Übungen']
    }
  };

  // Italian translations
  const italianTranslations: Record<string, any> = {
    'image-addition': {
      name: 'Addizioni con Immagini',
      appId: 'image-addition',
      description: 'Crea schede di addizioni visuali con immagini per l\'apprendimento matematico iniziale',
      category: 'Matematica',
      requiredTier: 'core',
      features: ['Problemi matematici visuali', 'Difficoltà personalizzabile', 'Chiavi di risposta', 'Formato pronto per la stampa']
    },
    'alphabet-train': {
      name: 'Treno dell\'Alfabeto',
      appId: 'alphabet-train',
      description: 'Aiuta i bambini a imparare le lettere con divertenti schede sul tema del trenino',
      category: 'Lingua e Lettura',
      requiredTier: 'core',
      features: ['Riconoscimento delle lettere', 'Ordine alfabetico', 'Tema divertente del trenino', 'Diversi livelli di difficoltà']
    },
    'big-small-app': {
      name: 'Grande o Piccolo',
      appId: 'big-small-app',
      description: 'Crea schede di confronto dimensioni con esercizi visuali per i primi apprendimenti',
      category: 'Apprendimento Precoce',
      requiredTier: 'full',
      features: ['Confronto di dimensioni', 'Esercizi visuali', 'Scelta multipla', 'Attività di sequenza']
    },
    'chart-count-color': {
      name: 'Grafici per Contare',
      appId: 'chart-count-color',
      description: 'Crea schede con grafici colorati per l\'apprendimento dei numeri',
      category: 'Matematica',
      requiredTier: 'full',
      features: ['Esercizi di conteggio visivo', 'Grafici a colori', 'Apprendimento dei numeri', 'Formato pronto per la stampa']
    },
    'code-addition': {
      name: 'Addizioni con Codici',
      appId: 'code-addition',
      description: 'Crea esercizi di addizione con codici segreti per rendere la matematica divertente',
      category: 'Matematica',
      requiredTier: 'full',
      features: ['Addizioni con codici segreti', 'Attività ludiche', 'Difficoltà regolabile', 'Chiavi di risposta incluse']
    },
    'coloring': {
      name: 'Pagine da Colorare',
      appId: 'coloring',
      description: 'Crea pagine da colorare stampabili dalla nostra ampia biblioteca di immagini',
      category: 'Arte e Creatività',
      requiredTier: 'core',
      features: ['Oltre 100 immagini', 'Temi multipli', 'Vari livelli di difficoltà', 'Stampe di alta qualità']
    },
    'image-crossword': {
      name: 'Cruciverba con Immagini',
      appId: 'image-crossword',
      description: 'Genera cruciverba illustrati per arricchire il vocabolario',
      category: 'Giochi di Parole',
      requiredTier: 'full',
      features: ['Generazione automatica', 'Indizi personalizzabili', 'Diverse dimensioni di griglia', 'Chiavi di risposta incluse']
    },
    'image-cryptogram': {
      name: 'Crittogramma con Immagini',
      appId: 'image-cryptogram',
      description: 'Crea crittogrammi illustrati per sviluppare logica e vocabolario',
      category: 'Enigmi',
      requiredTier: 'full',
      features: ['Crittogrammi visuali', 'Codici personalizzabili', 'Diversi livelli', 'Soluzioni incluse']
    },
    'draw-and-color': {
      name: 'Disegna e Colora',
      appId: 'draw-and-color',
      description: 'Crea schede che combinano disegno e colorazione per stimolare la creatività',
      category: 'Arte e Creatività',
      requiredTier: 'full',
      features: ['Spazi per disegno libero', 'Zone da colorare', 'Temi vari', 'Stimola la creatività']
    },
    'drawing-lines': {
      name: 'Tracciare Linee',
      appId: 'drawing-lines',
      description: 'Sviluppa la motricità fine attraverso esercizi di tracciamento di linee',
      category: 'Motricità Fine',
      requiredTier: 'core',
      features: ['Attività di tracciamento', 'Unisci i puntini', 'Seguire percorsi', 'Preparazione alla scrittura']
    },
    'find-and-count': {
      name: 'Trova e Conta',
      appId: 'find-and-count',
      description: 'Esercizi di conteggio visivo per sviluppare il riconoscimento numerico',
      category: 'Percezione Visiva',
      requiredTier: 'core',
      features: ['Conteggio di oggetti', 'Discriminazione visiva', 'Pratica numerica', 'Immagini coinvolgenti']
    },
    'find-objects': {
      name: 'Trova gli Oggetti',
      appId: 'find-objects',
      description: 'Crea schede di ricerca oggetti per migliorare l\'attenzione visiva',
      category: 'Percezione Visiva',
      requiredTier: 'full',
      features: ['Esercizi di ricerca visiva', 'Sviluppa l\'attenzione', 'Temi vari', 'Diversi livelli di difficoltà']
    },
    'grid-match': {
      name: 'Associazione su Griglia',
      appId: 'grid-match',
      description: 'Crea esercizi di associazione su griglia per sviluppare la percezione spaziale',
      category: 'Associazione',
      requiredTier: 'full',
      features: ['Corrispondenza di pattern', 'Orientamento spaziale', 'Percezione visiva', 'Difficoltà progressiva']
    },
    'matching-app': {
      name: 'Creatore di Abbinamenti',
      appId: 'matching-app',
      description: 'Crea attività di abbinamento per migliorare memoria e capacità associative',
      category: 'Associazione',
      requiredTier: 'core',
      features: ['Abbinamento immagine-immagine', 'Abbinamento parola-immagine', 'Giochi di memoria', 'Coppie personalizzabili']
    },
    'math-puzzle': {
      name: 'Enigmi Matematici',
      appId: 'math-puzzle',
      description: 'Crea enigmi matematici stimolanti per sviluppare la logica',
      category: 'Matematica',
      requiredTier: 'full',
      features: ['Enigmi di calcolo', 'Logica matematica', 'Diversi livelli', 'Soluzioni incluse']
    },
    'math-worksheet': {
      name: 'Schede di Matematica',
      appId: 'math-worksheet',
      description: 'Genera schede di esercizi matematici personalizzabili per tutti i livelli',
      category: 'Matematica',
      requiredTier: 'core',
      features: ['Addizioni e sottrazioni', 'Moltiplicazioni e divisioni', 'Chiavi di risposta', 'Livelli di difficoltà regolabili']
    },
    'missing-pieces': {
      name: 'Pezzi Mancanti',
      appId: 'missing-pieces',
      description: 'Crea esercizi di completamento visivo per sviluppare la logica',
      category: 'Logica',
      requiredTier: 'full',
      features: ['Identificazione di elementi mancanti', 'Ragionamento logico', 'Esercizi visuali', 'Difficoltà progressiva']
    },
    'more-less': {
      name: 'Più o Meno',
      appId: 'more-less',
      description: 'Crea esercizi di confronto quantità per apprendere concetti matematici',
      category: 'Matematica',
      requiredTier: 'full',
      features: ['Confronto di quantità', 'Concetti matematici di base', 'Esercizi visuali', 'Apprendimento progressivo']
    },
    'odd-one-out': {
      name: 'L\'Intruso',
      appId: 'odd-one-out',
      description: 'Crea esercizi per identificare l\'elemento diverso e sviluppare l\'analisi',
      category: 'Logica',
      requiredTier: 'full',
      features: ['Identificazione di differenze', 'Ragionamento logico', 'Categorizzazione', 'Esercizi vari']
    },
    'pattern-train': {
      name: 'Treno dei Pattern',
      appId: 'pattern-train',
      description: 'Crea schede di sequenze sul tema del trenino per riconoscere i pattern',
      category: 'Logica',
      requiredTier: 'full',
      features: ['Riconoscimento di pattern', 'Sequenze logiche', 'Tema del trenino', 'Difficoltà progressiva']
    },
    'pattern-worksheet': {
      name: 'Schede di Pattern',
      appId: 'pattern-worksheet',
      description: 'Crea schede per imparare sequenze e pattern ripetitivi',
      category: 'Logica',
      requiredTier: 'full',
      features: ['Pattern e sequenze', 'Riconoscimento visivo', 'Ragionamento logico', 'Livelli multipli']
    },
    'picture-bingo': {
      name: 'Tombola con Immagini',
      appId: 'picture-bingo',
      description: 'Genera cartelle della tombola personalizzate con immagini per la classe',
      category: 'Giochi',
      requiredTier: 'core',
      features: ['Cartelle personalizzate', 'Immagini tematiche', 'Dimensioni multiple delle cartelle', 'Fogli di chiamata inclusi']
    },
    'picture-path': {
      name: 'Percorso delle Immagini',
      appId: 'picture-path',
      description: 'Crea percorsi visuali per sviluppare logica e seguire istruzioni',
      category: 'Logica',
      requiredTier: 'full',
      features: ['Percorsi da seguire', 'Logica sequenziale', 'Esercizi visuali', 'Diversi livelli di difficoltà']
    },
    'picture-sort': {
      name: 'Classifica le Immagini',
      appId: 'picture-sort',
      description: 'Crea attività di classificazione immagini per sviluppare la categorizzazione',
      category: 'Logica',
      requiredTier: 'full',
      features: ['Classificazione e ordinamento', 'Categorizzazione', 'Ragionamento logico', 'Temi vari']
    },
    'prepositions': {
      name: 'Preposizioni',
      appId: 'prepositions',
      description: 'Crea esercizi visuali per imparare le preposizioni in modo ludico',
      category: 'Grammatica',
      requiredTier: 'full',
      features: ['Preposizioni spaziali', 'Esercizi illustrati', 'Apprendimento visivo', 'Facile da comprendere']
    },
    'shadow-match': {
      name: 'Abbina le Ombre',
      appId: 'shadow-match',
      description: 'Crea esercizi di abbinamento oggetti con le loro ombre',
      category: 'Percezione Visiva',
      requiredTier: 'full',
      features: ['Abbinamento forma-ombra', 'Percezione visiva', 'Discriminazione visiva', 'Diversi livelli']
    },
    'subtraction': {
      name: 'Sottrazioni',
      appId: 'subtraction',
      description: 'Crea schede di sottrazioni visuali per l\'apprendimento matematico',
      category: 'Matematica',
      requiredTier: 'full',
      features: ['Esercizi di sottrazione', 'Supporto visivo', 'Difficoltà regolabile', 'Chiavi di risposta incluse']
    },
    'sudoku': {
      name: 'Sudoku per Bambini',
      appId: 'sudoku',
      description: 'Sudoku ludici con immagini al posto dei numeri per bambini',
      category: 'Logica',
      requiredTier: 'core',
      features: ['Sudoku con immagini', 'Griglie 4x4 e 6x6', 'Difficoltà progressiva', 'Soluzioni incluse']
    },
    'treasure-hunt': {
      name: 'Caccia al Tesoro',
      appId: 'treasure-hunt',
      description: 'Crea schede di caccia al tesoro per attività ludiche ed educative',
      category: 'Giochi Educativi',
      requiredTier: 'full',
      features: ['Percorsi di ricerca', 'Attività ludiche', 'Mappe personalizzabili', 'Stimola il ragionamento']
    },
    'word-guess': {
      name: 'Indovina la Parola',
      appId: 'word-guess',
      description: 'Crea schede per indovinare le parole e arricchire il vocabolario',
      category: 'Giochi di Parole',
      requiredTier: 'full',
      features: ['Indovinelli di parole', 'Indizi visuali', 'Arricchimento del vocabolario', 'Livelli multipli']
    },
    'word-scramble': {
      name: 'Parole Mescolate',
      appId: 'word-scramble',
      description: 'Crea schede di parole mescolate per migliorare vocabolario e ortografia',
      category: 'Lingua e Lettura',
      requiredTier: 'core',
      features: ['Liste di parole personalizzate', 'Vocabolario tematico', 'Diversi livelli di difficoltà', 'Chiavi di risposta incluse']
    },
    'word-search': {
      name: 'Crucipuzzle',
      appId: 'word-search',
      description: 'Genera crucipuzzle personalizzabili con vocabolario tematico',
      category: 'Giochi di Parole',
      requiredTier: 'free',
      features: ['Dimensioni multiple della griglia', 'Opzioni direzionali', 'Liste di parole tematiche', 'Chiavi di risposta incluse']
    },
    'writing-app': {
      name: 'Esercizi di Scrittura',
      appId: 'writing-app',
      description: 'Crea schede di scrittura personalizzate per sviluppare le abilità di scrittura',
      category: 'Abilità di Scrittura',
      requiredTier: 'full',
      features: ['Righe di scrittura personalizzabili', 'Temi vari', 'Supporto visivo', 'Formato pronto per la stampa']
    }
  };

  // Portuguese translations
  const portugueseTranslations: Record<string, any> = {
    'image-addition': {
      name: 'Adição com Imagens',
      appId: 'image-addition',
      description: 'Crie fichas de adição visuais com imagens para o aprendizado inicial de matemática',
      category: 'Matemática',
      requiredTier: 'core',
      features: ['Problemas matemáticos visuais', 'Dificuldade personalizável', 'Gabaritos incluídos', 'Formato pronto para impressão']
    },
    'alphabet-train': {
      name: 'Trem do Alfabeto',
      appId: 'alphabet-train',
      description: 'Ajude as crianças a aprender as letras com fichas divertidas no tema do trem',
      category: 'Língua e Leitura',
      requiredTier: 'core',
      features: ['Reconhecimento de letras', 'Ordem alfabética', 'Tema divertido de trem', 'Múltiplos níveis de dificuldade']
    },
    'big-small-app': {
      name: 'Grande ou Pequeno',
      appId: 'big-small-app',
      description: 'Crie fichas de comparação de tamanhos com exercícios visuais para iniciantes',
      category: 'Aprendizagem Inicial',
      requiredTier: 'full',
      features: ['Comparação de tamanhos', 'Exercícios visuais', 'Múltipla escolha', 'Atividades de sequência']
    },
    'chart-count-color': {
      name: 'Gráficos de Contagem',
      appId: 'chart-count-color',
      description: 'Crie fichas de contagem com gráficos coloridos para o aprendizado numérico',
      category: 'Matemática',
      requiredTier: 'full',
      features: ['Exercícios de contagem visual', 'Gráficos coloridos', 'Aprendizado de números', 'Formato pronto para impressão']
    },
    'code-addition': {
      name: 'Adição com Códigos',
      appId: 'code-addition',
      description: 'Crie exercícios de adição com códigos secretos para tornar a matemática divertida',
      category: 'Matemática',
      requiredTier: 'full',
      features: ['Adição com códigos secretos', 'Atividades lúdicas', 'Dificuldade ajustável', 'Gabaritos incluídos']
    },
    'coloring': {
      name: 'Páginas para Colorir',
      appId: 'coloring',
      description: 'Crie páginas para colorir imprimíveis da nossa extensa biblioteca de imagens',
      category: 'Arte e Criatividade',
      requiredTier: 'core',
      features: ['Mais de 100 imagens', 'Múltiplos temas', 'Vários níveis de dificuldade', 'Impressões de alta qualidade']
    },
    'image-crossword': {
      name: 'Palavras Cruzadas com Imagens',
      appId: 'image-crossword',
      description: 'Gere palavras cruzadas ilustradas para enriquecer o vocabulário',
      category: 'Jogos de Palavras',
      requiredTier: 'full',
      features: ['Geração automática', 'Dicas personalizáveis', 'Diferentes tamanhos de grade', 'Gabaritos incluídos']
    },
    'image-cryptogram': {
      name: 'Criptograma com Imagens',
      appId: 'image-cryptogram',
      description: 'Crie criptogramas ilustrados para desenvolver lógica e vocabulário',
      category: 'Enigmas',
      requiredTier: 'full',
      features: ['Criptogramas visuais', 'Códigos personalizáveis', 'Diferentes níveis', 'Soluções incluídas']
    },
    'draw-and-color': {
      name: 'Desenhar e Colorir',
      appId: 'draw-and-color',
      description: 'Crie fichas que combinam desenho e coloração para estimular a criatividade',
      category: 'Arte e Criatividade',
      requiredTier: 'full',
      features: ['Espaços para desenho livre', 'Áreas para colorir', 'Temas variados', 'Estimula a criatividade']
    },
    'drawing-lines': {
      name: 'Traçar Linhas',
      appId: 'drawing-lines',
      description: 'Desenvolva a coordenação motora fina através de exercícios de traçado de linhas',
      category: 'Coordenação Motora Fina',
      requiredTier: 'core',
      features: ['Atividades de traçado', 'Ligue os pontos', 'Seguir caminhos', 'Preparação para a escrita']
    },
    'find-and-count': {
      name: 'Encontrar e Contar',
      appId: 'find-and-count',
      description: 'Exercícios de contagem visual para desenvolver o reconhecimento numérico',
      category: 'Percepção Visual',
      requiredTier: 'core',
      features: ['Contagem de objetos', 'Discriminação visual', 'Prática numérica', 'Imagens atrativas']
    },
    'find-objects': {
      name: 'Encontrar Objetos',
      appId: 'find-objects',
      description: 'Crie fichas de busca de objetos para melhorar a atenção visual',
      category: 'Percepção Visual',
      requiredTier: 'full',
      features: ['Exercícios de busca visual', 'Desenvolve a atenção', 'Temas variados', 'Diferentes níveis de dificuldade']
    },
    'grid-match': {
      name: 'Associação em Grade',
      appId: 'grid-match',
      description: 'Crie exercícios de associação em grade para desenvolver a percepção espacial',
      category: 'Associação',
      requiredTier: 'full',
      features: ['Correspondência de padrões', 'Orientação espacial', 'Percepção visual', 'Dificuldade progressiva']
    },
    'matching-app': {
      name: 'Criador de Pares',
      appId: 'matching-app',
      description: 'Crie atividades de associação para melhorar memória e habilidades de emparelhamento',
      category: 'Associação',
      requiredTier: 'core',
      features: ['Associação imagem-imagem', 'Associação palavra-imagem', 'Jogos de memória', 'Pares personalizáveis']
    },
    'math-puzzle': {
      name: 'Enigmas Matemáticos',
      appId: 'math-puzzle',
      description: 'Crie enigmas matemáticos desafiadores para desenvolver a lógica',
      category: 'Matemática',
      requiredTier: 'full',
      features: ['Enigmas de cálculo', 'Lógica matemática', 'Diferentes níveis', 'Soluções incluídas']
    },
    'math-worksheet': {
      name: 'Fichas de Matemática',
      appId: 'math-worksheet',
      description: 'Gere fichas de prática matemática personalizáveis para todos os níveis',
      category: 'Matemática',
      requiredTier: 'core',
      features: ['Adição e subtração', 'Multiplicação e divisão', 'Gabaritos incluídos', 'Níveis de dificuldade ajustáveis']
    },
    'missing-pieces': {
      name: 'Peças Faltantes',
      appId: 'missing-pieces',
      description: 'Crie exercícios de completar elementos visuais para desenvolver a lógica',
      category: 'Lógica',
      requiredTier: 'full',
      features: ['Identificação de elementos faltantes', 'Raciocínio lógico', 'Exercícios visuais', 'Dificuldade progressiva']
    },
    'more-less': {
      name: 'Mais ou Menos',
      appId: 'more-less',
      description: 'Crie exercícios de comparação de quantidades para aprender conceitos matemáticos',
      category: 'Matemática',
      requiredTier: 'full',
      features: ['Comparação de quantidades', 'Conceitos matemáticos básicos', 'Exercícios visuais', 'Aprendizado progressivo']
    },
    'odd-one-out': {
      name: 'O Diferente',
      appId: 'odd-one-out',
      description: 'Crie exercícios para identificar o elemento diferente e desenvolver a análise',
      category: 'Lógica',
      requiredTier: 'full',
      features: ['Identificação de diferenças', 'Raciocínio lógico', 'Categorização', 'Exercícios variados']
    },
    'pattern-train': {
      name: 'Trem dos Padrões',
      appId: 'pattern-train',
      description: 'Crie fichas de sequências com tema de trem para reconhecer padrões',
      category: 'Lógica',
      requiredTier: 'full',
      features: ['Reconhecimento de padrões', 'Sequências lógicas', 'Tema de trem', 'Dificuldade progressiva']
    },
    'pattern-worksheet': {
      name: 'Fichas de Padrões',
      appId: 'pattern-worksheet',
      description: 'Crie fichas para aprender sequências e padrões repetitivos',
      category: 'Lógica',
      requiredTier: 'full',
      features: ['Padrões e sequências', 'Reconhecimento visual', 'Raciocínio lógico', 'Múltiplos níveis']
    },
    'picture-bingo': {
      name: 'Bingo de Imagens',
      appId: 'picture-bingo',
      description: 'Gere cartelas de bingo personalizadas com imagens para a sala de aula',
      category: 'Jogos',
      requiredTier: 'core',
      features: ['Cartelas de bingo personalizadas', 'Imagens temáticas', 'Múltiplos tamanhos de cartelas', 'Folhas de chamada incluídas']
    },
    'picture-path': {
      name: 'Caminho das Imagens',
      appId: 'picture-path',
      description: 'Crie percursos visuais para desenvolver lógica e seguir instruções',
      category: 'Lógica',
      requiredTier: 'full',
      features: ['Percursos a seguir', 'Lógica sequencial', 'Exercícios visuais', 'Múltiplos níveis de dificuldade']
    },
    'picture-sort': {
      name: 'Classificar Imagens',
      appId: 'picture-sort',
      description: 'Crie atividades de classificação de imagens para desenvolver a categorização',
      category: 'Lógica',
      requiredTier: 'full',
      features: ['Classificação e ordenação', 'Categorização', 'Raciocínio lógico', 'Temas variados']
    },
    'prepositions': {
      name: 'Preposições',
      appId: 'prepositions',
      description: 'Crie exercícios visuais para aprender preposições de forma lúdica',
      category: 'Gramática',
      requiredTier: 'full',
      features: ['Preposições espaciais', 'Exercícios ilustrados', 'Aprendizado visual', 'Fácil de compreender']
    },
    'shadow-match': {
      name: 'Associação de Sombras',
      appId: 'shadow-match',
      description: 'Crie exercícios de associação de objetos com suas sombras',
      category: 'Percepção Visual',
      requiredTier: 'full',
      features: ['Associação forma-sombra', 'Percepção visual', 'Discriminação visual', 'Diferentes níveis']
    },
    'subtraction': {
      name: 'Subtração',
      appId: 'subtraction',
      description: 'Crie fichas de subtração visuais para o aprendizado matemático',
      category: 'Matemática',
      requiredTier: 'full',
      features: ['Exercícios de subtração', 'Apoio visual', 'Dificuldade ajustável', 'Gabaritos incluídos']
    },
    'sudoku': {
      name: 'Sudoku para Crianças',
      appId: 'sudoku',
      description: 'Sudokus lúdicos com imagens em vez de números para crianças',
      category: 'Lógica',
      requiredTier: 'core',
      features: ['Sudoku com imagens', 'Grades 4x4 e 6x6', 'Dificuldade progressiva', 'Soluções incluídas']
    },
    'treasure-hunt': {
      name: 'Caça ao Tesouro',
      appId: 'treasure-hunt',
      description: 'Crie fichas de caça ao tesouro para atividades lúdicas e educativas',
      category: 'Jogos Educativos',
      requiredTier: 'full',
      features: ['Percursos de busca', 'Atividades lúdicas', 'Mapas personalizáveis', 'Estimula o raciocínio']
    },
    'word-guess': {
      name: 'Adivinhar Palavras',
      appId: 'word-guess',
      description: 'Crie fichas para adivinhar palavras e enriquecer o vocabulário',
      category: 'Jogos de Palavras',
      requiredTier: 'full',
      features: ['Adivinhações de palavras', 'Dicas visuais', 'Enriquecimento do vocabulário', 'Múltiplos níveis']
    },
    'word-scramble': {
      name: 'Palavras Embaralhadas',
      appId: 'word-scramble',
      description: 'Crie fichas de palavras embaralhadas para melhorar vocabulário e ortografia',
      category: 'Língua e Leitura',
      requiredTier: 'core',
      features: ['Listas de palavras personalizadas', 'Vocabulário temático', 'Múltiplos níveis de dificuldade', 'Gabaritos incluídos']
    },
    'word-search': {
      name: 'Caça-Palavras',
      appId: 'word-search',
      description: 'Gere caça-palavras personalizáveis com vocabulário temático',
      category: 'Jogos de Palavras',
      requiredTier: 'free',
      features: ['Múltiplos tamanhos de grade', 'Opções direcionais', 'Listas de palavras temáticas', 'Gabaritos incluídos']
    },
    'writing-app': {
      name: 'Exercícios de Escrita',
      appId: 'writing-app',
      description: 'Crie fichas de escrita personalizadas para desenvolver habilidades de redação',
      category: 'Habilidades de Escrita',
      requiredTier: 'full',
      features: ['Linhas de escrita personalizáveis', 'Temas variados', 'Apoio visual', 'Formato pronto para impressão']
    }
  };

  // Dutch translations
  const dutchTranslations: Record<string, any> = {
    'image-addition': {
      name: 'Sommen met Plaatjes',
      appId: 'image-addition',
      description: 'Maak visuele optel-werkbladen met afbeeldingen voor beginnende rekenaars',
      category: 'Rekenen',
      requiredTier: 'core',
      features: ['Visuele rekensommen', 'Aanpasbare moeilijkheid', 'Antwoordbladen', 'Print-klaar formaat']
    },
    'alphabet-train': {
      name: 'Alfabettrein',
      appId: 'alphabet-train',
      description: 'Help kinderen letters leren met leuke werkbladen met het thema trein',
      category: 'Taal',
      requiredTier: 'core',
      features: ['Letterherkenning', 'Alfabetische volgorde', 'Leuk trein thema', 'Meerdere moeilijkheidsniveaus']
    },
    'big-small-app': {
      name: 'Groot of Klein',
      appId: 'big-small-app',
      description: 'Maak werkbladen voor het vergelijken van groottes met visuele oefeningen voor beginners',
      category: 'Begrippen',
      requiredTier: 'full',
      features: ['Grootte vergelijkingen', 'Visuele oefeningen', 'Meerkeuzevragen', 'Volgorde opdrachten']
    },
    'chart-count-color': {
      name: 'Telgrafieken',
      appId: 'chart-count-color',
      description: 'Maak kleurrijke tel- en grafiekwerkbladen voor het leren van getallen',
      category: 'Rekenen',
      requiredTier: 'full',
      features: ['Visuele teloefeningen', 'Kleurrijke grafieken', 'Getallen leren', 'Print-klaar formaat']
    },
    'code-addition': {
      name: 'Sommen in Code',
      appId: 'code-addition',
      description: 'Maak opteloefeningen met geheime codes om rekenen leuk te maken',
      category: 'Rekenen',
      requiredTier: 'full',
      features: ['Optellen met geheime codes', 'Speelse activiteiten', 'Aanpasbare moeilijkheid', 'Antwoordbladen inbegrepen']
    },
    'coloring': {
      name: 'Kleurplaten',
      appId: 'coloring',
      description: 'Ontwerp afdrukbare kleurplaten uit onze uitgebreide afbeeldingenbibliotheek',
      category: 'Kunst & Creativiteit',
      requiredTier: 'core',
      features: ['Meer dan 100 afbeeldingen', 'Meerdere thema\'s', 'Verschillende moeilijkheidsniveaus', 'Hoogwaardige afdrukken']
    },
    'image-crossword': {
      name: 'Kruiswoordpuzzel met Plaatjes',
      appId: 'image-crossword',
      description: 'Genereer geïllustreerde kruiswoordpuzzels om de woordenschat te verrijken',
      category: 'Woordspellen',
      requiredTier: 'full',
      features: ['Automatische generatie', 'Aanpasbare hints', 'Verschillende roostergroottes', 'Antwoordbladen inbegrepen']
    },
    'image-cryptogram': {
      name: 'Cryptogram met Plaatjes',
      appId: 'image-cryptogram',
      description: 'Maak geïllustreerde cryptogrammen om logica en woordenschat te ontwikkelen',
      category: 'Woordspellen',
      requiredTier: 'full',
      features: ['Visuele cryptogrammen', 'Aanpasbare codes', 'Verschillende niveaus', 'Oplossingen inbegrepen']
    },
    'draw-and-color': {
      name: 'Teken en Kleur',
      appId: 'draw-and-color',
      description: 'Maak werkbladen die tekenen en kleuren combineren om creativiteit te stimuleren',
      category: 'Kunst & Creativiteit',
      requiredTier: 'full',
      features: ['Vrij tekenruimte', 'Kleurvlakken', 'Gevarieerde thema\'s', 'Stimuleert creativiteit']
    },
    'drawing-lines': {
      name: 'Lijnen Trekken',
      appId: 'drawing-lines',
      description: 'Ontwikkel fijne motoriek door middel van lijnentrekoefeningen',
      category: 'Fijne Motoriek',
      requiredTier: 'core',
      features: ['Traceeroefeningen', 'Stippen verbinden', 'Paden volgen', 'Schrijfvoorbereiding']
    },
    'find-and-count': {
      name: 'Zoek en Tel',
      appId: 'find-and-count',
      description: 'Visuele teloefeningen om getalherkenning en telvaardigheden te ontwikkelen',
      category: 'Visuele Waarneming',
      requiredTier: 'core',
      features: ['Objecten tellen', 'Visuele discriminatie', 'Getallen oefenen', 'Aantrekkelijke afbeeldingen']
    },
    'find-objects': {
      name: 'Zoek de Voorwerpen',
      appId: 'find-objects',
      description: 'Maak zoekwerkbladen om visuele aandacht te verbeteren',
      category: 'Visuele Waarneming',
      requiredTier: 'full',
      features: ['Visuele zoekoefeningen', 'Ontwikkelt aandacht', 'Gevarieerde thema\'s', 'Verschillende moeilijkheidsniveaus']
    },
    'grid-match': {
      name: 'Raster Koppelen',
      appId: 'grid-match',
      description: 'Maak raster-koppeloefeningen om ruimtelijk inzicht te ontwikkelen',
      category: 'Koppelen',
      requiredTier: 'full',
      features: ['Patronen matchen', 'Ruimtelijke oriëntatie', 'Visuele waarneming', 'Oplopende moeilijkheid']
    },
    'matching-app': {
      name: 'Koppelspel',
      appId: 'matching-app',
      description: 'Maak koppelactiviteiten om geheugen en associatievaardigheden te verbeteren',
      category: 'Koppelen',
      requiredTier: 'core',
      features: ['Afbeelding-afbeelding koppelen', 'Woord-afbeelding koppelen', 'Geheugenspelletjes', 'Aanpasbare paren']
    },
    'math-puzzle': {
      name: 'Rekenraadsels',
      appId: 'math-puzzle',
      description: 'Maak uitdagende rekenpuzzels om logisch denken te ontwikkelen',
      category: 'Rekenen',
      requiredTier: 'full',
      features: ['Rekenpuzzels', 'Wiskundige logica', 'Verschillende niveaus', 'Oplossingen inbegrepen']
    },
    'math-worksheet': {
      name: 'Rekenwerkbladen',
      appId: 'math-worksheet',
      description: 'Genereer aanpasbare rekenoefeningen voor alle niveaus',
      category: 'Rekenen',
      requiredTier: 'core',
      features: ['Optellen en aftrekken', 'Vermenigvuldigen en delen', 'Antwoordbladen', 'Aanpasbare moeilijkheidsniveaus']
    },
    'missing-pieces': {
      name: 'Ontbrekende Stukjes',
      appId: 'missing-pieces',
      description: 'Maak visuele aanvuloefeningen om logisch denken te ontwikkelen',
      category: 'Logica',
      requiredTier: 'full',
      features: ['Ontbrekende elementen identificeren', 'Logisch redeneren', 'Visuele oefeningen', 'Oplopende moeilijkheid']
    },
    'more-less': {
      name: 'Meer of Minder',
      appId: 'more-less',
      description: 'Maak oefeningen voor het vergelijken van hoeveelheden om wiskundige concepten te leren',
      category: 'Rekenen',
      requiredTier: 'full',
      features: ['Hoeveelheden vergelijken', 'Basis wiskundige concepten', 'Visuele oefeningen', 'Geleidelijk leren']
    },
    'odd-one-out': {
      name: 'De Vreemde Eend',
      appId: 'odd-one-out',
      description: 'Maak oefeningen om het afwijkende element te identificeren en analyseren te ontwikkelen',
      category: 'Logica',
      requiredTier: 'full',
      features: ['Verschillen identificeren', 'Logisch redeneren', 'Categoriseren', 'Gevarieerde oefeningen']
    },
    'pattern-train': {
      name: 'Patronentrein',
      appId: 'pattern-train',
      description: 'Maak werkbladen met treinpatronen om patronen te herkennen',
      category: 'Patronen',
      requiredTier: 'full',
      features: ['Patroonherkenning', 'Logische reeksen', 'Trein thema', 'Oplopende moeilijkheid']
    },
    'pattern-worksheet': {
      name: 'Patrooonwerkbladen',
      appId: 'pattern-worksheet',
      description: 'Maak werkbladen om reeksen en herhalende patronen te leren',
      category: 'Patronen',
      requiredTier: 'full',
      features: ['Patronen en reeksen', 'Visuele herkenning', 'Logisch redeneren', 'Meerdere niveaus']
    },
    'picture-bingo': {
      name: 'Plaatjesbingo',
      appId: 'picture-bingo',
      description: 'Genereer aangepaste bingokaarten met afbeeldingen voor in de klas',
      category: 'Spelletjes',
      requiredTier: 'core',
      features: ['Aangepaste bingokaarten', 'Thematische afbeeldingen', 'Meerdere kaartgroottes', 'Trekkingslijsten inbegrepen']
    },
    'picture-path': {
      name: 'Plaatjespad',
      appId: 'picture-path',
      description: 'Maak visuele routes om logica en het volgen van instructies te ontwikkelen',
      category: 'Logica',
      requiredTier: 'full',
      features: ['Routes volgen', 'Opeenvolgende logica', 'Visuele oefeningen', 'Meerdere moeilijkheidsniveaus']
    },
    'picture-sort': {
      name: 'Plaatjes Sorteren',
      appId: 'picture-sort',
      description: 'Maak sorteeractiviteiten met afbeeldingen om categoriseren te ontwikkelen',
      category: 'Sorteren',
      requiredTier: 'full',
      features: ['Sorteren en rangschikken', 'Categoriseren', 'Logisch redeneren', 'Gevarieerde thema\'s']
    },
    'prepositions': {
      name: 'Voorzetsels',
      appId: 'prepositions',
      description: 'Maak visuele oefeningen om voorzetsels op een speelse manier te leren',
      category: 'Taal',
      requiredTier: 'full',
      features: ['Ruimtelijke voorzetsels', 'Geïllustreerde oefeningen', 'Visueel leren', 'Makkelijk te begrijpen']
    },
    'shadow-match': {
      name: 'Schaduwen Koppelen',
      appId: 'shadow-match',
      description: 'Maak oefeningen om objecten met hun schaduwen te koppelen',
      category: 'Visuele Waarneming',
      requiredTier: 'full',
      features: ['Vorm-schaduw koppeling', 'Visuele waarneming', 'Visuele discriminatie', 'Verschillende niveaus']
    },
    'subtraction': {
      name: 'Aftrekken',
      appId: 'subtraction',
      description: 'Maak visuele aftrekwerkbladen voor het leren van rekenen',
      category: 'Rekenen',
      requiredTier: 'full',
      features: ['Aftrekoefeningen', 'Visuele ondersteuning', 'Aanpasbare moeilijkheid', 'Antwoordbladen inbegrepen']
    },
    'sudoku': {
      name: 'Sudoku voor Kinderen',
      appId: 'sudoku',
      description: 'Leuke sudoku puzzels met afbeeldingen in plaats van cijfers voor kinderen',
      category: 'Logica',
      requiredTier: 'core',
      features: ['Sudoku met afbeeldingen', '4x4 en 6x6 roosters', 'Oplopende moeilijkheid', 'Oplossingen inbegrepen']
    },
    'treasure-hunt': {
      name: 'Schattenjacht',
      appId: 'treasure-hunt',
      description: 'Maak speurtochtwerkbladen voor speelse en educatieve activiteiten',
      category: 'Spelletjes',
      requiredTier: 'full',
      features: ['Zoekroutes', 'Speelse activiteiten', 'Aanpasbare kaarten', 'Stimuleert redeneren']
    },
    'word-guess': {
      name: 'Woord Raden',
      appId: 'word-guess',
      description: 'Maak werkbladen voor het raden van woorden en het verrijken van de woordenschat',
      category: 'Woordspellen',
      requiredTier: 'full',
      features: ['Woordraadsels', 'Visuele hints', 'Woordenschat verrijken', 'Meerdere niveaus']
    },
    'word-scramble': {
      name: 'Letterkraker',
      appId: 'word-scramble',
      description: 'Maak letterwisselwerkbladen om woordenschat en spelling te verbeteren',
      category: 'Taal',
      requiredTier: 'core',
      features: ['Aangepaste woordenlijsten', 'Thematische woordenschat', 'Meerdere moeilijkheidsniveaus', 'Antwoordbladen inbegrepen']
    },
    'word-search': {
      name: 'Woordzoeker',
      appId: 'word-search',
      description: 'Genereer aanpasbare woordzoekers met thematische woordenschat',
      category: 'Woordspellen',
      requiredTier: 'free',
      features: ['Meerdere roostergroottes', 'Richtingsopties', 'Thematische woordenlijsten', 'Antwoordbladen inbegrepen']
    },
    'writing-app': {
      name: 'Schrijfoefeningen',
      appId: 'writing-app',
      description: 'Maak aangepaste schrijfwerkbladen om schrijfvaardigheden te ontwikkelen',
      category: 'Fijne Motoriek',
      requiredTier: 'full',
      features: ['Aanpasbare schrijflijnen', 'Gevarieerde thema\'s', 'Visuele ondersteuning', 'Print-klaar formaat']
    }
  };

  // Swedish translations
  const swedishTranslations: Record<string, any> = {
    'image-addition': {
      name: 'Addition med Bilder',
      appId: 'image-addition',
      description: 'Skapa visuella additionsarbetsblad med bilder för tidiga matematikstudier',
      category: 'Matematik',
      requiredTier: 'core',
      features: ['Visuella matteuppgifter', 'Anpassningsbar svårighetsgrad', 'Facit', 'Utskriftsklar formatering']
    },
    'alphabet-train': {
      name: 'Alfabetståget',
      appId: 'alphabet-train',
      description: 'Hjälp barn att lära sig bokstäver med roliga tågtemade alfabetsarbetsblad',
      category: 'Svenska',
      requiredTier: 'core',
      features: ['Bokstavsigenkänning', 'Alfabetisk ordning', 'Roligt tågtema', 'Flera svårighetsnivåer']
    },
    'big-small-app': {
      name: 'Stor eller Liten',
      appId: 'big-small-app',
      description: 'Skapa storleksjämförelsearbetsblad med visuella övningar för nybörjare',
      category: 'Begrepp',
      requiredTier: 'full',
      features: ['Storleksjämförelser', 'Visuella övningar', 'Flervalsfrågor', 'Sekvensuppgifter']
    },
    'chart-count-color': {
      name: 'Räknediagram',
      appId: 'chart-count-color',
      description: 'Skapa färgglada räkne- och diagramarbetsblad för att lära sig siffror',
      category: 'Matematik',
      requiredTier: 'full',
      features: ['Visuella räkneövningar', 'Färgglada diagram', 'Sifferinlärning', 'Utskriftsklar formatering']
    },
    'code-addition': {
      name: 'Addition i Kod',
      appId: 'code-addition',
      description: 'Skapa additionsövningar med hemliga koder för att göra matte roligt',
      category: 'Matematik',
      requiredTier: 'full',
      features: ['Addition med hemliga koder', 'Lekfulla aktiviteter', 'Justerbar svårighetsgrad', 'Facit ingår']
    },
    'coloring': {
      name: 'Målarbilder',
      appId: 'coloring',
      description: 'Designa utskrivbara färgläggningssidor från vårt omfattande bildbibliotek',
      category: 'Konst & Kreativitet',
      requiredTier: 'core',
      features: ['Över 100 bilder', 'Flera teman', 'Varierande svårighetsnivåer', 'Högkvalitativa utskrifter']
    },
    'image-crossword': {
      name: 'Bildkorsord',
      appId: 'image-crossword',
      description: 'Generera illustrerade korsord för att berika ordförrådet',
      category: 'Ordspel',
      requiredTier: 'full',
      features: ['Automatisk generering', 'Anpassningsbara ledtrådar', 'Olika rutnätsstorlekar', 'Facit ingår']
    },
    'image-cryptogram': {
      name: 'Bildkryptogram',
      appId: 'image-cryptogram',
      description: 'Skapa illustrerade kryptogram för att utveckla logik och ordförråd',
      category: 'Ordspel',
      requiredTier: 'full',
      features: ['Visuella kryptogram', 'Anpassningsbara koder', 'Olika nivåer', 'Lösningar ingår']
    },
    'draw-and-color': {
      name: 'Rita och Måla',
      appId: 'draw-and-color',
      description: 'Skapa arbetsblad som kombinerar ritande och färgläggning för att stimulera kreativitet',
      category: 'Konst & Kreativitet',
      requiredTier: 'full',
      features: ['Utrymme för fri teckning', 'Färgläggningsområden', 'Varierade teman', 'Stimulerar kreativitet']
    },
    'drawing-lines': {
      name: 'Rita Linjer',
      appId: 'drawing-lines',
      description: 'Utveckla finmotorik genom linjedragningsövningar',
      category: 'Finmotorik',
      requiredTier: 'core',
      features: ['Spårningsaktiviteter', 'Pricka till pricka', 'Följa stigar', 'Förskrivningsträning']
    },
    'find-and-count': {
      name: 'Hitta och Räkna',
      appId: 'find-and-count',
      description: 'Visuella räkneövningar för att utveckla sifferigenkänning och räkneförmåga',
      category: 'Visuell Uppfattning',
      requiredTier: 'core',
      features: ['Räkna föremål', 'Visuell särskiljning', 'Sifferträning', 'Engagerande bilder']
    },
    'find-objects': {
      name: 'Hitta Föremålen',
      appId: 'find-objects',
      description: 'Skapa sökarbetsblad för att förbättra visuell uppmärksamhet',
      category: 'Visuell Uppfattning',
      requiredTier: 'full',
      features: ['Visuella sökövningar', 'Utvecklar uppmärksamhet', 'Varierade teman', 'Olika svårighetsnivåer']
    },
    'grid-match': {
      name: 'Rutnätsmatchning',
      appId: 'grid-match',
      description: 'Skapa rutnätsmatchningsövningar för att utveckla rumslig uppfattning',
      category: 'Matchning',
      requiredTier: 'full',
      features: ['Mönstermatchning', 'Rumslig orientering', 'Visuell perception', 'Progressiv svårighet']
    },
    'matching-app': {
      name: 'Matchningsspel',
      appId: 'matching-app',
      description: 'Skapa matchningsaktiviteter för att förbättra minne och associationsförmåga',
      category: 'Matchning',
      requiredTier: 'core',
      features: ['Bild-till-bild-matchning', 'Ord-till-bild-matchning', 'Minnesspel', 'Anpassningsbara par']
    },
    'math-puzzle': {
      name: 'Mattepussel',
      appId: 'math-puzzle',
      description: 'Skapa utmanande mattepussel för att utveckla logiskt tänkande',
      category: 'Matematik',
      requiredTier: 'full',
      features: ['Räknepussel', 'Matematisk logik', 'Olika nivåer', 'Lösningar ingår']
    },
    'math-worksheet': {
      name: 'Matteblad',
      appId: 'math-worksheet',
      description: 'Generera anpassningsbara matteövningsblad för alla nivåer',
      category: 'Matematik',
      requiredTier: 'core',
      features: ['Addition och subtraktion', 'Multiplikation och division', 'Facit', 'Justerbara svårighetsnivåer']
    },
    'missing-pieces': {
      name: 'Saknade Bitar',
      appId: 'missing-pieces',
      description: 'Skapa visuella kompletteringsövningar för att utveckla logiskt tänkande',
      category: 'Logik',
      requiredTier: 'full',
      features: ['Identifiera saknade element', 'Logiskt resonemang', 'Visuella övningar', 'Progressiv svårighet']
    },
    'more-less': {
      name: 'Mer eller Mindre',
      appId: 'more-less',
      description: 'Skapa mängdjämförelseövningar för att lära matematiska begrepp',
      category: 'Matematik',
      requiredTier: 'full',
      features: ['Jämföra mängder', 'Grundläggande matematiska begrepp', 'Visuella övningar', 'Progressiv inlärning']
    },
    'odd-one-out': {
      name: 'Den Udda',
      appId: 'odd-one-out',
      description: 'Skapa övningar för att identifiera det avvikande elementet och utveckla analys',
      category: 'Logik',
      requiredTier: 'full',
      features: ['Identifiera skillnader', 'Logiskt resonemang', 'Kategorisering', 'Varierade övningar']
    },
    'pattern-train': {
      name: 'Mönsterstöget',
      appId: 'pattern-train',
      description: 'Skapa sekvensarbetsblad med tågtema för att känna igen mönster',
      category: 'Mönster',
      requiredTier: 'full',
      features: ['Mönsterigenkänning', 'Logiska sekvenser', 'Tågtema', 'Progressiv svårighet']
    },
    'pattern-worksheet': {
      name: 'Mönsterblad',
      appId: 'pattern-worksheet',
      description: 'Skapa arbetsblad för att lära sig sekvenser och upprepande mönster',
      category: 'Mönster',
      requiredTier: 'full',
      features: ['Mönster och sekvenser', 'Visuell igenkänning', 'Logiskt resonemang', 'Flera nivåer']
    },
    'bingo': {
      name: 'Bildbingo',
      appId: 'bingo',
      description: 'Generera anpassade bingobrickor med bilder för klassrummet',
      category: 'Spel',
      requiredTier: 'core',
      features: ['Anpassade bingobrickor', 'Tematiska bilder', 'Flera brickstorlekar', 'Dragningslistor ingår']
    },
    'picture-path': {
      name: 'Bildväg',
      appId: 'picture-path',
      description: 'Skapa visuella stigar för att utveckla logik och instruktionsföljning',
      category: 'Logik',
      requiredTier: 'full',
      features: ['Stigar att följa', 'Sekventiell logik', 'Visuella övningar', 'Flera svårighetsnivåer']
    },
    'picture-sort': {
      name: 'Sortera Bilder',
      appId: 'picture-sort',
      description: 'Skapa bildsorteringsaktiviteter för att utveckla kategorisering',
      category: 'Sortering',
      requiredTier: 'full',
      features: ['Sortering och ordning', 'Kategorisering', 'Logiskt resonemang', 'Varierade teman']
    },
    'prepositions': {
      name: 'Prepositioner',
      appId: 'prepositions',
      description: 'Skapa visuella övningar för att lära sig prepositioner på ett lekfullt sätt',
      category: 'Svenska',
      requiredTier: 'full',
      features: ['Rumsliga prepositioner', 'Illustrerade övningar', 'Visuell inlärning', 'Lätt att förstå']
    },
    'shadow-match': {
      name: 'Skuggmatchning',
      appId: 'shadow-match',
      description: 'Skapa övningar för att matcha föremål med deras skuggor',
      category: 'Visuell Uppfattning',
      requiredTier: 'full',
      features: ['Form-skugga-matchning', 'Visuell perception', 'Visuell särskiljning', 'Olika nivåer']
    },
    'subtraction': {
      name: 'Subtraktion',
      appId: 'subtraction',
      description: 'Skapa visuella subtraktionsarbetsblad för matematikstudier',
      category: 'Matematik',
      requiredTier: 'full',
      features: ['Subtraktionsövningar', 'Visuellt stöd', 'Justerbar svårighetsgrad', 'Facit ingår']
    },
    'sudoku': {
      name: 'Sudoku för Barn',
      appId: 'sudoku',
      description: 'Roliga sudoku-pussel med bilder istället för siffror för barn',
      category: 'Logik',
      requiredTier: 'core',
      features: ['Sudoku med bilder', '4x4 och 6x6 rutnät', 'Progressiv svårighet', 'Lösningar ingår']
    },
    'treasure-hunt': {
      name: 'Skattjakt',
      appId: 'treasure-hunt',
      description: 'Skapa skattjaktsarbetsblad för lekfulla och pedagogiska aktiviteter',
      category: 'Spel',
      requiredTier: 'full',
      features: ['Sökstigar', 'Lekfulla aktiviteter', 'Anpassningsbara kartor', 'Stimulerar resonemang']
    },
    'word-guess': {
      name: 'Gissa Ordet',
      appId: 'word-guess',
      description: 'Skapa arbetsblad för att gissa ord och berika ordförrådet',
      category: 'Ordspel',
      requiredTier: 'full',
      features: ['Ordgåtor', 'Visuella ledtrådar', 'Berika ordförrådet', 'Flera nivåer']
    },
    'word-scramble': {
      name: 'Ordmix',
      appId: 'word-scramble',
      description: 'Skapa ordblandningsarbetsblad för att förbättra ordförråd och stavning',
      category: 'Svenska',
      requiredTier: 'core',
      features: ['Anpassade ordlistor', 'Tematiskt ordförråd', 'Flera svårighetsnivåer', 'Facit ingår']
    },
    'word-search': {
      name: 'Ordletare',
      appId: 'word-search',
      description: 'Generera anpassningsbara ordletare med tematiskt ordförråd',
      category: 'Ordspel',
      requiredTier: 'free',
      features: ['Flera rutnätsstorlekar', 'Riktningsalternativ', 'Tematiska ordlistor', 'Facit ingår']
    },
    'writing-app': {
      name: 'Skrivövningar',
      appId: 'writing-app',
      description: 'Skapa anpassade skrivarbetsblad för att utveckla skrivförmåga',
      category: 'Finmotorik',
      requiredTier: 'full',
      features: ['Anpassningsbara skrivlinjer', 'Varierade teman', 'Visuellt stöd', 'Utskriftsklar formatering']
    }
  };

  // Danish translations
  const danishTranslations: Record<string, any> = {
    'image-addition': {
      name: 'Addition med Billeder',
      appId: 'image-addition',
      description: 'Lav visuelle additions-arbejdsark med billeder til tidlige matematikstuderende',
      category: 'Matematik',
      requiredTier: 'core',
      features: ['Visuelle matematikopgaver', 'Tilpasbar sværhedsgrad', 'Facitlister', 'Printklar formatering']
    },
    'alphabet-train': {
      name: 'Alfabettoget',
      appId: 'alphabet-train',
      description: 'Hjælp børn med at lære bogstaver med sjove togtema-alfabetsark',
      category: 'Dansk',
      requiredTier: 'core',
      features: ['Bogstavgenkendelse', 'Alfabetisk rækkefølge', 'Sjovt togtema', 'Flere sværhedsgrader']
    },
    'big-small-app': {
      name: 'Stor eller Lille',
      appId: 'big-small-app',
      description: 'Lav størrelsessammenligningsark med visuelle øvelser for begyndere',
      category: 'Begreber',
      requiredTier: 'full',
      features: ['Størrelsessammenligninger', 'Visuelle øvelser', 'Multiple choice', 'Rækkefølgeopgaver']
    },
    'chart-count-color': {
      name: 'Tællediagrammer',
      appId: 'chart-count-color',
      description: 'Lav farverige tælle- og diagramark til at lære tal',
      category: 'Matematik',
      requiredTier: 'full',
      features: ['Visuelle tælleøvelser', 'Farverige diagrammer', 'Tallæring', 'Printklar formatering']
    },
    'code-addition': {
      name: 'Addition i Kode',
      appId: 'code-addition',
      description: 'Lav additionsøvelser med hemmelige koder for at gøre matematik sjovt',
      category: 'Matematik',
      requiredTier: 'full',
      features: ['Addition med hemmelige koder', 'Legende aktiviteter', 'Justerbar sværhedsgrad', 'Facitlister inkluderet']
    },
    'coloring': {
      name: 'Malebøger',
      appId: 'coloring',
      description: 'Design udskrivbare farvelægningssider fra vores omfattende billedbibliotek',
      category: 'Kunst & Kreativitet',
      requiredTier: 'core',
      features: ['Over 100 billeder', 'Flere temaer', 'Forskellige sværhedsgrader', 'Høj kvalitet udskrifter']
    },
    'image-crossword': {
      name: 'Billedkrydsord',
      appId: 'image-crossword',
      description: 'Generer illustrerede krydsord for at berige ordforråd',
      category: 'Ordspil',
      requiredTier: 'full',
      features: ['Automatisk generering', 'Tilpassede ledetråde', 'Forskellige gitterstørrelser', 'Facitlister inkluderet']
    },
    'image-cryptogram': {
      name: 'Billedkryptogram',
      appId: 'image-cryptogram',
      description: 'Lav illustrerede kryptogrammer for at udvikle logik og ordforråd',
      category: 'Ordspil',
      requiredTier: 'full',
      features: ['Visuelle kryptogrammer', 'Tilpassede koder', 'Forskellige niveauer', 'Løsninger inkluderet']
    },
    'draw-and-color': {
      name: 'Tegn og Mal',
      appId: 'draw-and-color',
      description: 'Lav ark, der kombinerer tegning og farvelægning for at stimulere kreativitet',
      category: 'Kunst & Kreativitet',
      requiredTier: 'full',
      features: ['Plads til fri tegning', 'Farvelægningsområder', 'Varierede temaer', 'Stimulerer kreativitet']
    },
    'drawing-lines': {
      name: 'Tegn Linjer',
      appId: 'drawing-lines',
      description: 'Udvikl finmotorik gennem linjetegningsøvelser',
      category: 'Finmotorik',
      requiredTier: 'core',
      features: ['Sporingsaktiviteter', 'Forbind prikkerne', 'Følg stier', 'Forskrivetræning']
    },
    'find-and-count': {
      name: 'Find og Tæl',
      appId: 'find-and-count',
      description: 'Visuelle tælleøvelser for at udvikle talgenkendelse og tælleevner',
      category: 'Visuel Opfattelse',
      requiredTier: 'core',
      features: ['Tæl objekter', 'Visuel forskel', 'Talletræning', 'Engagerende billeder']
    },
    'find-objects': {
      name: 'Find Genstandene',
      appId: 'find-objects',
      description: 'Lav søgeark for at forbedre visuel opmærksomhed',
      category: 'Visuel Opfattelse',
      requiredTier: 'full',
      features: ['Visuelle søgeøvelser', 'Udvikler opmærksomhed', 'Varierede temaer', 'Forskellige sværhedsgrader']
    },
    'grid-match': {
      name: 'Gittermatchning',
      appId: 'grid-match',
      description: 'Lav gittermatchingsøvelser for at udvikle rumlig opfattelse',
      category: 'Matchning',
      requiredTier: 'full',
      features: ['Mønstermatching', 'Rumlig orientering', 'Visuel perception', 'Progressiv sværhedsgrad']
    },
    'matching-app': {
      name: 'Parspil',
      appId: 'matching-app',
      description: 'Lav matchingsaktiviteter for at forbedre hukommelse og associationsevner',
      category: 'Matchning',
      requiredTier: 'core',
      features: ['Billede-til-billede-matching', 'Ord-til-billede-matching', 'Hukommelsesspil', 'Tilpassede par']
    },
    'math-puzzle': {
      name: 'Matematikgåder',
      appId: 'math-puzzle',
      description: 'Lav udfordrende matematikgåder for at udvikle logisk tænkning',
      category: 'Matematik',
      requiredTier: 'full',
      features: ['Regngåder', 'Matematisk logik', 'Forskellige niveauer', 'Løsninger inkluderet']
    },
    'math-worksheet': {
      name: 'Matematikark',
      appId: 'math-worksheet',
      description: 'Generer tilpassede matematiktræningsark for alle niveauer',
      category: 'Matematik',
      requiredTier: 'core',
      features: ['Addition og subtraktion', 'Multiplikation og division', 'Facitlister', 'Justerbare sværhedsgrader']
    },
    'missing-pieces': {
      name: 'Manglende Brikker',
      appId: 'missing-pieces',
      description: 'Lav visuelle fuldførelsesøvelser for at udvikle logisk tænkning',
      category: 'Logik',
      requiredTier: 'full',
      features: ['Identificer manglende elementer', 'Logisk ræsonnement', 'Visuelle øvelser', 'Progressiv sværhedsgrad']
    },
    'more-less': {
      name: 'Mere eller Mindre',
      appId: 'more-less',
      description: 'Lav mængdesammenligningsøvelser for at lære matematiske begreber',
      category: 'Matematik',
      requiredTier: 'full',
      features: ['Sammenlign mængder', 'Grundlæggende matematiske begreber', 'Visuelle øvelser', 'Progressiv læring']
    },
    'odd-one-out': {
      name: 'Den Anderledes',
      appId: 'odd-one-out',
      description: 'Lav øvelser til at identificere det afvigende element og udvikle analyse',
      category: 'Logik',
      requiredTier: 'full',
      features: ['Identificer forskelle', 'Logisk ræsonnement', 'Kategorisering', 'Varierede øvelser']
    },
    'pattern-train': {
      name: 'Mønstertoget',
      appId: 'pattern-train',
      description: 'Lav sekvensark med togtema for at genkende mønstre',
      category: 'Mønstre',
      requiredTier: 'full',
      features: ['Mønstergenkendelse', 'Logiske sekvenser', 'Togtema', 'Progressiv sværhedsgrad']
    },
    'pattern-worksheet': {
      name: 'Mønsterark',
      appId: 'pattern-worksheet',
      description: 'Lav ark for at lære sekvenser og gentagne mønstre',
      category: 'Mønstre',
      requiredTier: 'full',
      features: ['Mønstre og sekvenser', 'Visuel genkendelse', 'Logisk ræsonnement', 'Flere niveauer']
    },
    'bingo': {
      name: 'Billedbingo',
      appId: 'bingo',
      description: 'Generer tilpassede bingoplader med billeder til klasseværelset',
      category: 'Spil',
      requiredTier: 'core',
      features: ['Tilpassede bingoplader', 'Tematiske billeder', 'Flere pladestørrelser', 'Trækningslister inkluderet']
    },
    'picture-path': {
      name: 'Billedsti',
      appId: 'picture-path',
      description: 'Lav visuelle stier for at udvikle logik og instruktionsfølgning',
      category: 'Logik',
      requiredTier: 'full',
      features: ['Stier at følge', 'Sekventiel logik', 'Visuelle øvelser', 'Flere sværhedsgrader']
    },
    'picture-sort': {
      name: 'Sortér Billeder',
      appId: 'picture-sort',
      description: 'Lav billedsorteringsaktiviteter for at udvikle kategorisering',
      category: 'Sortering',
      requiredTier: 'full',
      features: ['Sortering og ordning', 'Kategorisering', 'Logisk ræsonnement', 'Varierede temaer']
    },
    'prepositions': {
      name: 'Præpositioner',
      appId: 'prepositions',
      description: 'Lav visuelle øvelser for at lære præpositioner på en legende måde',
      category: 'Dansk',
      requiredTier: 'full',
      features: ['Rumlige præpositioner', 'Illustrerede øvelser', 'Visuel læring', 'Let at forstå']
    },
    'shadow-match': {
      name: 'Skyggematching',
      appId: 'shadow-match',
      description: 'Lav øvelser til at matche genstande med deres skygger',
      category: 'Visuel Opfattelse',
      requiredTier: 'full',
      features: ['Form-skygge-matching', 'Visuel perception', 'Visuel forskel', 'Forskellige niveauer']
    },
    'subtraction': {
      name: 'Subtraktion',
      appId: 'subtraction',
      description: 'Lav visuelle subtraktionsark til matematikstudier',
      category: 'Matematik',
      requiredTier: 'full',
      features: ['Subtraktionsøvelser', 'Visuel støtte', 'Justerbar sværhedsgrad', 'Facitlister inkluderet']
    },
    'sudoku': {
      name: 'Sudoku til Børn',
      appId: 'sudoku',
      description: 'Sjove sudoku-gåder med billeder i stedet for tal til børn',
      category: 'Logik',
      requiredTier: 'core',
      features: ['Sudoku med billeder', '4x4 og 6x6 gitre', 'Progressiv sværhedsgrad', 'Løsninger inkluderet']
    },
    'treasure-hunt': {
      name: 'Skattejagt',
      appId: 'treasure-hunt',
      description: 'Lav skattejagtsark til legende og pædagogiske aktiviteter',
      category: 'Spil',
      requiredTier: 'full',
      features: ['Søgestier', 'Legende aktiviteter', 'Tilpassede kort', 'Stimulerer ræsonnement']
    },
    'word-guess': {
      name: 'Gæt Ordet',
      appId: 'word-guess',
      description: 'Lav ark til at gætte ord og berige ordforråd',
      category: 'Ordspil',
      requiredTier: 'full',
      features: ['Ordgåder', 'Visuelle ledetråde', 'Berig ordforråd', 'Flere niveauer']
    },
    'word-scramble': {
      name: 'Ordforbytter',
      appId: 'word-scramble',
      description: 'Lav ordsambleblandingsark for at forbedre ordforråd og stavning',
      category: 'Dansk',
      requiredTier: 'core',
      features: ['Tilpassede ordlister', 'Tematisk ordforråd', 'Flere sværhedsgrader', 'Facitlister inkluderet']
    },
    'word-search': {
      name: 'Ordsøgning',
      appId: 'word-search',
      description: 'Generer tilpassede ordsøgninger med tematisk ordforråd',
      category: 'Ordspil',
      requiredTier: 'free',
      features: ['Flere gitterstørrelser', 'Retningsvalg', 'Tematiske ordlister', 'Facitlister inkluderet']
    },
    'writing-app': {
      name: 'Skriveøvelser',
      appId: 'writing-app',
      description: 'Lav tilpassede skriveark for at udvikle skrivefærdigheder',
      category: 'Finmotorik',
      requiredTier: 'full',
      features: ['Tilpassede skrivelinjer', 'Varierede temaer', 'Visuel støtte', 'Printklar formatering']
    }
  };

  // Norwegian translations
  const norwegianTranslations: Record<string, any> = {
    'image-addition': {
      name: 'Addisjon med Bilder',
      appId: 'image-addition',
      description: 'Lag visuelle addisjonsregneark med bilder for tidlige matematikkstudenter',
      category: 'Matematikk',
      requiredTier: 'core',
      features: ['Visuelle matematikkoppgaver', 'Tilpassbar vanskelighetsgrad', 'Fasitark', 'Utskriftsklar formatering']
    },
    'alphabet-train': {
      name: 'Alfabettoget',
      appId: 'alphabet-train',
      description: 'Hjelp barn med å lære bokstaver med morsomme togtema-alfabetark',
      category: 'Språk & Lesing',
      requiredTier: 'core',
      features: ['Bokstavgjenkjenning', 'Alfabetisk rekkefølge', 'Morsomt togtema', 'Flere vanskelighetsgrader']
    },
    'big-small-app': {
      name: 'Stor eller Liten',
      appId: 'big-small-app',
      description: 'Lag størrelsessammenligningsark med visuelle øvelser for nybegynnere',
      category: 'Tidlig Læring',
      requiredTier: 'full',
      features: ['Størrelsessammenligninger', 'Visuelle øvelser', 'Flervalg', 'Rekkefølgeoppgaver']
    },
    'chart-count-color': {
      name: 'Tellediagrammer',
      appId: 'chart-count-color',
      description: 'Lag fargerike telle- og diagramark for å lære tall',
      category: 'Matematikk',
      requiredTier: 'full',
      features: ['Visuelle telleøvelser', 'Fargerike diagrammer', 'Tallæring', 'Utskriftsklar formatering']
    },
    'code-addition': {
      name: 'Kodeaddisjon',
      appId: 'code-addition',
      description: 'Lag addisjonsøvelser med hemmelige koder for å gjøre matte morsomt',
      category: 'Matematikk',
      requiredTier: 'full',
      features: ['Addisjon med hemmelige koder', 'Lekende aktiviteter', 'Justerbar vanskelighetsgrad', 'Fasitark inkludert']
    },
    'coloring': {
      name: 'Fargesider',
      appId: 'coloring',
      description: 'Design utskrivbare fargesider fra vårt omfattende bildebibliotek',
      category: 'Kunst & Kreativitet',
      requiredTier: 'core',
      features: ['Over 100 bilder', 'Flere temaer', 'Ulike vanskelighetsgrader', 'Høykvalitets utskrifter']
    },
    'image-crossword': {
      name: 'Bildekryssord',
      appId: 'image-crossword',
      description: 'Generer illustrerte kryssord for å berike ordforrådet',
      category: 'Ordspill',
      requiredTier: 'full',
      features: ['Automatisk generering', 'Tilpassbare ledetråder', 'Ulike rutenettstørrelser', 'Fasitark inkludert']
    },
    'image-cryptogram': {
      name: 'Bildekryptogram',
      appId: 'image-cryptogram',
      description: 'Lag illustrerte kryptogrammer for å utvikle logikk og ordforråd',
      category: 'Gåter',
      requiredTier: 'full',
      features: ['Visuelle kryptogrammer', 'Tilpassbare koder', 'Ulike nivåer', 'Løsninger inkludert']
    },
    'draw-and-color': {
      name: 'Tegn og Fargelegg',
      appId: 'draw-and-color',
      description: 'Lag ark som kombinerer tegning og farging for å stimulere kreativitet',
      category: 'Kunst & Kreativitet',
      requiredTier: 'full',
      features: ['Plass til fri tegning', 'Fargeområder', 'Varierte temaer', 'Stimulerer kreativitet']
    },
    'drawing-lines': {
      name: 'Tegn Linjer',
      appId: 'drawing-lines',
      description: 'Utvikle finmotorikk gjennom linjetegningsøvelser',
      category: 'Finmotorikk',
      requiredTier: 'core',
      features: ['Sporingsaktiviteter', 'Forbind prikkene', 'Følge stier', 'Forskriving']
    },
    'find-and-count': {
      name: 'Finn og Tell',
      appId: 'find-and-count',
      description: 'Visuelle telleøvelser for å utvikle tallgjenkjenning og telleferdigheter',
      category: 'Visuell Persepsjon',
      requiredTier: 'core',
      features: ['Telle objekter', 'Visuell diskriminering', 'Talltrening', 'Engasjerende bilder']
    },
    'find-objects': {
      name: 'Finn Gjenstander',
      appId: 'find-objects',
      description: 'Lag søkeark for å forbedre visuell oppmerksomhet',
      category: 'Visuell Persepsjon',
      requiredTier: 'full',
      features: ['Visuelle søkeøvelser', 'Utvikler oppmerksomhet', 'Varierte temaer', 'Ulike vanskelighetsgrader']
    },
    'grid-match': {
      name: 'Rutenettsmatching',
      appId: 'grid-match',
      description: 'Lag rutenettsmatchingsøvelser for å utvikle romlig oppfatning',
      category: 'Matching',
      requiredTier: 'full',
      features: ['Mønstermatching', 'Romlig orientering', 'Visuell persepsjon', 'Progressiv vanskelighetsgrad']
    },
    'matching-app': {
      name: 'Matchingmaker',
      appId: 'matching-app',
      description: 'Lag matchingsaktiviteter for å forbedre hukommelse og assosiasjonsevner',
      category: 'Matching',
      requiredTier: 'core',
      features: ['Bilde-til-bilde-matching', 'Ord-til-bilde-matching', 'Hukommelsesspill', 'Tilpassbare par']
    },
    'math-puzzle': {
      name: 'Mattegåter',
      appId: 'math-puzzle',
      description: 'Lag utfordrende mattegåter for å utvikle logisk tenkning',
      category: 'Matematikk',
      requiredTier: 'full',
      features: ['Regnegåter', 'Matematisk logikk', 'Ulike nivåer', 'Løsninger inkludert']
    },
    'math-worksheet': {
      name: 'Matteregneark',
      appId: 'math-worksheet',
      description: 'Generer tilpassbare mattetreningsark for alle nivåer',
      category: 'Matematikk',
      requiredTier: 'core',
      features: ['Addisjon og subtraksjon', 'Multiplikasjon og divisjon', 'Fasitark', 'Justerbare vanskelighetsgrader']
    },
    'missing-pieces': {
      name: 'Manglende Deler',
      appId: 'missing-pieces',
      description: 'Lag visuelle fullføringsøvelser for å utvikle logisk tenkning',
      category: 'Logikk',
      requiredTier: 'full',
      features: ['Identifisere manglende elementer', 'Logisk resonnering', 'Visuelle øvelser', 'Progressiv vanskelighetsgrad']
    },
    'more-less': {
      name: 'Mer eller Mindre',
      appId: 'more-less',
      description: 'Lag mengdesammenligningsøvelser for å lære matematiske begreper',
      category: 'Matematikk',
      requiredTier: 'full',
      features: ['Sammenligne mengder', 'Grunnleggende matematiske begreper', 'Visuelle øvelser', 'Progressiv læring']
    },
    'odd-one-out': {
      name: 'Hvilken Passer Ikke',
      appId: 'odd-one-out',
      description: 'Lag øvelser for å identifisere det avvikende elementet og utvikle analyse',
      category: 'Logikk',
      requiredTier: 'full',
      features: ['Identifisere forskjeller', 'Logisk resonnering', 'Kategorisering', 'Varierte øvelser']
    },
    'pattern-train': {
      name: 'Mønstertoget',
      appId: 'pattern-train',
      description: 'Lag sekvensark med togtema for å gjenkjenne mønstre',
      category: 'Logikk',
      requiredTier: 'full',
      features: ['Mønstergjenkjenning', 'Logiske sekvenser', 'Togtema', 'Progressiv vanskelighetsgrad']
    },
    'pattern-worksheet': {
      name: 'Mønsterark',
      appId: 'pattern-worksheet',
      description: 'Lag ark for å lære sekvenser og gjentakende mønstre',
      category: 'Logikk',
      requiredTier: 'full',
      features: ['Mønstre og sekvenser', 'Visuell gjenkjenning', 'Logisk resonnering', 'Flere nivåer']
    },
    'bingo': {
      name: 'Bildebingo',
      appId: 'bingo',
      description: 'Generer tilpassede bingobrett med bilder for klasserommet',
      category: 'Spill',
      requiredTier: 'core',
      features: ['Tilpassede bingobrett', 'Tematiske bilder', 'Flere brettstørrelser', 'Trekningslister inkludert']
    },
    'picture-path': {
      name: 'Bildesti',
      appId: 'picture-path',
      description: 'Lag visuelle stier for å utvikle logikk og instruksjonsfølging',
      category: 'Logikk',
      requiredTier: 'full',
      features: ['Stier å følge', 'Sekvensiell logikk', 'Visuelle øvelser', 'Flere vanskelighetsgrader']
    },
    'picture-sort': {
      name: 'Bildesortering',
      appId: 'picture-sort',
      description: 'Lag bildesorteringsaktiviteter for å utvikle kategorisering',
      category: 'Logikk',
      requiredTier: 'full',
      features: ['Sortering og ordning', 'Kategorisering', 'Logisk resonnering', 'Varierte temaer']
    },
    'prepositions': {
      name: 'Preposisjoner',
      appId: 'prepositions',
      description: 'Lag visuelle øvelser for å lære preposisjoner på en lekende måte',
      category: 'Grammatikk',
      requiredTier: 'full',
      features: ['Romlige preposisjoner', 'Illustrerte øvelser', 'Visuell læring', 'Lett å forstå']
    },
    'shadow-match': {
      name: 'Skyggematching',
      appId: 'shadow-match',
      description: 'Lag øvelser for å matche gjenstander med deres skygger',
      category: 'Visuell Persepsjon',
      requiredTier: 'full',
      features: ['Form-skygge-matching', 'Visuell persepsjon', 'Visuell diskriminering', 'Ulike nivåer']
    },
    'subtraction': {
      name: 'Subtraksjon',
      appId: 'subtraction',
      description: 'Lag visuelle subtraksjonsark for matematikkstudier',
      category: 'Matematikk',
      requiredTier: 'full',
      features: ['Subtraksjonsøvelser', 'Visuell støtte', 'Justerbar vanskelighetsgrad', 'Fasitark inkludert']
    },
    'sudoku': {
      name: 'Sudoku for Barn',
      appId: 'sudoku',
      description: 'Morsomme sudoku-gåter med bilder i stedet for tall for barn',
      category: 'Logikk',
      requiredTier: 'core',
      features: ['Sudoku med bilder', '4x4 og 6x6 rutenett', 'Progressiv vanskelighetsgrad', 'Løsninger inkludert']
    },
    'treasure-hunt': {
      name: 'Skattejakt',
      appId: 'treasure-hunt',
      description: 'Lag skattejaktark for lekende og pedagogiske aktiviteter',
      category: 'Pedagogiske Spill',
      requiredTier: 'full',
      features: ['Søkestier', 'Lekende aktiviteter', 'Tilpassbare kart', 'Stimulerer resonnering']
    },
    'word-guess': {
      name: 'Gjett Ordet',
      appId: 'word-guess',
      description: 'Lag ark for å gjette ord og berike ordforrådet',
      category: 'Ordspill',
      requiredTier: 'full',
      features: ['Ordgåter', 'Visuelle ledetråder', 'Berike ordforrådet', 'Flere nivåer']
    },
    'word-scramble': {
      name: 'Ordsammenblanding',
      appId: 'word-scramble',
      description: 'Lag ordsambleblandingsark for å forbedre ordforråd og stavning',
      category: 'Språk & Lesing',
      requiredTier: 'core',
      features: ['Tilpassede ordlister', 'Tematisk ordforråd', 'Flere vanskelighetsgrader', 'Fasitark inkludert']
    },
    'word-search': {
      name: 'Ordsøk',
      appId: 'word-search',
      description: 'Generer tilpassbare ordsøk med tematisk ordforråd',
      category: 'Ordspill',
      requiredTier: 'free',
      features: ['Flere rutenettstørrelser', 'Retningsvalg', 'Tematiske ordlister', 'Fasitark inkludert']
    },
    'writing-app': {
      name: 'Skriveøvelser',
      appId: 'writing-app',
      description: 'Lag tilpassede skriveark for å utvikle skriveferdigheter',
      category: 'Skriveferdigheter',
      requiredTier: 'full',
      features: ['Tilpassbare skrivelinjer', 'Varierte temaer', 'Visuell støtte', 'Utskriftsklar formatering']
    }
  };

  // Finnish translations
  const finnishTranslations: Record<string, any> = {
    'image-addition': {
      name: 'Yhteenlasku Kuvilla',
      appId: 'image-addition',
      description: 'Luo visuaalisia yhteenlaskutehtäviä kuvineen alkeiden matematiikkaan',
      category: 'Matematiikka',
      requiredTier: 'core',
      features: ['Visuaaliset laskutehtävät', 'Mukautettava vaikeustaso', 'Vastausavaimet', 'Tulostusvalmiit lomakkeet']
    },
    'alphabet-train': {
      name: 'Aaakkosjuna',
      appId: 'alphabet-train',
      description: 'Auta lapsia oppimaan kirjaimia hauskoilla junateemaisilla aakkostehtävillä',
      category: 'Kieli & Lukeminen',
      requiredTier: 'core',
      features: ['Kirjainten tunnistaminen', 'Aakkosjärjestys', 'Hauska junateema', 'Useita vaikeustasoja']
    },
    'big-small-app': {
      name: 'Iso vai Pieni',
      appId: 'big-small-app',
      description: 'Luo kokovertailutehtäviä visuaalisilla harjoituksilla aloittelijoille',
      category: 'Varhaiskehitys',
      requiredTier: 'full',
      features: ['Kokovertailut', 'Visuaaliset harjoitukset', 'Monivalintatehtävät', 'Järjestysharjoitukset']
    },
    'chart-count-color': {
      name: 'Laskukaaviot',
      appId: 'chart-count-color',
      description: 'Luo värikkäitä lasku- ja kaavioharjoituksia numeroiden oppimiseen',
      category: 'Matematiikka',
      requiredTier: 'full',
      features: ['Visuaaliset laskuharjoitukset', 'Värikkäät kaaviot', 'Numeroiden oppiminen', 'Tulostusvalmiit lomakkeet']
    },
    'code-addition': {
      name: 'Koodiyhteenlasku',
      appId: 'code-addition',
      description: 'Luo yhteenlaskutehtäviä salaisilla koodeilla matematiikan tekemiseksi hauskaksi',
      category: 'Matematiikka',
      requiredTier: 'full',
      features: ['Yhteenlasku salaisilla koodeilla', 'Leikkisät aktiviteetit', 'Säädettävä vaikeustaso', 'Vastausavaimet mukana']
    },
    'coloring': {
      name: 'Värityskuvat',
      appId: 'coloring',
      description: 'Suunnittele tulostettavia värityskuvia laajasta kuvakirjastostamme',
      category: 'Taide & Luovuus',
      requiredTier: 'core',
      features: ['Yli 100 kuvaa', 'Useita teemoja', 'Eri vaikeustasoja', 'Korkealaatuiset tulosteet']
    },
    'image-crossword': {
      name: 'Kuvristikko',
      appId: 'image-crossword',
      description: 'Luo kuvitettuja ristisanatehtäviä sanaston rikastamiseen',
      category: 'Sanapelit',
      requiredTier: 'full',
      features: ['Automaattinen luonti', 'Mukautettavat vihjeet', 'Eri ruudukkokoot', 'Vastausavaimet mukana']
    },
    'image-cryptogram': {
      name: 'Kuvakryptogrammi',
      appId: 'image-cryptogram',
      description: 'Luo kuvitettuja kryptogrammeja logiikan ja sanaston kehittämiseen',
      category: 'Arvoitukset',
      requiredTier: 'full',
      features: ['Visuaaliset kryptogrammit', 'Mukautettavat koodit', 'Eri tasoja', 'Ratkaisut mukana']
    },
    'draw-and-color': {
      name: 'Piirrä ja Väritä',
      appId: 'draw-and-color',
      description: 'Luo tehtäviä, jotka yhdistävät piirtämisen ja värityksen luovuuden stimuloimiseksi',
      category: 'Taide & Luovuus',
      requiredTier: 'full',
      features: ['Tilaa vapaalle piirtämiselle', 'Väritysalueet', 'Monipuoliset teemat', 'Edistää luovuutta']
    },
    'drawing-lines': {
      name: 'Viivojen Piirtäminen',
      appId: 'drawing-lines',
      description: 'Kehitä hienomotoriikkaa viivanvetoharjoituksilla',
      category: 'Hienomotoriikka',
      requiredTier: 'core',
      features: ['Jäljitysharjoitukset', 'Yhdistä pisteet', 'Polkujen seuraaminen', 'Esikirjoitusvalmennusta']
    },
    'find-and-count': {
      name: 'Etsi ja Laske',
      appId: 'find-and-count',
      description: 'Visuaaliset laskuharjoitukset numeroiden tunnistamisen ja laskutaitojen kehittämiseen',
      category: 'Visuaalinen Hahmotus',
      requiredTier: 'core',
      features: ['Esineiden laskeminen', 'Visuaalinen erottelu', 'Numeroharjoitukset', 'Kiinnostavat kuvat']
    },
    'find-objects': {
      name: 'Etsi Esineitä',
      appId: 'find-objects',
      description: 'Luo etsintätehtäviä visuaalisen tarkkaavaisuuden parantamiseen',
      category: 'Visuaalinen Hahmotus',
      requiredTier: 'full',
      features: ['Visuaaliset etsintäharjoitukset', 'Kehittää tarkkaavaisuutta', 'Monipuoliset teemat', 'Eri vaikeustasoja']
    },
    'grid-match': {
      name: 'Ruudukon Yhdistäminen',
      appId: 'grid-match',
      description: 'Luo ruudukko-yhdistämisharjoituksia tilallisen hahmotuksen kehittämiseen',
      category: 'Yhdistäminen',
      requiredTier: 'full',
      features: ['Kuvioiden yhdistäminen', 'Tilallinen suuntautuminen', 'Visuaalinen hahmotus', 'Asteittainen vaikeus']
    },
    'matching-app': {
      name: 'Parinmuodostaja',
      appId: 'matching-app',
      description: 'Luo yhdistämistehtäviä muistin ja assosiaatiokyvyn parantamiseen',
      category: 'Yhdistäminen',
      requiredTier: 'core',
      features: ['Kuva-kuvaan-yhdistäminen', 'Sana-kuvaan-yhdistäminen', 'Muistipelit', 'Mukautettavat parit']
    },
    'math-puzzle': {
      name: 'Matematiikkapulmat',
      appId: 'math-puzzle',
      description: 'Luo haastavia matematiikkapulmia loogisen ajattelun kehittämiseen',
      category: 'Matematiikka',
      requiredTier: 'full',
      features: ['Laskupulmat', 'Matemaattinen logiikka', 'Eri tasoja', 'Ratkaisut mukana']
    },
    'math-worksheet': {
      name: 'Matematiikkatehtävät',
      appId: 'math-worksheet',
      description: 'Luo mukautettavia matematiikkaharjoituksia kaikille tasoille',
      category: 'Matematiikka',
      requiredTier: 'core',
      features: ['Yhteen- ja vähennyslasku', 'Kerto- ja jakolasku', 'Vastausavaimet', 'Säädettävät vaikeustasot']
    },
    'missing-pieces': {
      name: 'Puuttuvat Osat',
      appId: 'missing-pieces',
      description: 'Luo visuaalisia täydennysharjoituksia loogisen ajattelun kehittämiseen',
      category: 'Logiikka',
      requiredTier: 'full',
      features: ['Puuttuvien osien tunnistaminen', 'Looginen päättely', 'Visuaaliset harjoitukset', 'Asteittainen vaikeus']
    },
    'more-less': {
      name: 'Enemmän vai Vähemmän',
      appId: 'more-less',
      description: 'Luo määrävertailuharjoituksia matemaattisten käsitteiden oppimiseen',
      category: 'Matematiikka',
      requiredTier: 'full',
      features: ['Määrien vertailu', 'Perusmatematiikan käsitteet', 'Visuaaliset harjoitukset', 'Asteittainen oppiminen']
    },
    'odd-one-out': {
      name: 'Mikä Ei Sovi Joukkoon',
      appId: 'odd-one-out',
      description: 'Luo harjoituksia poikkeavan elementin tunnistamiseen ja analyysikyvyn kehittämiseen',
      category: 'Logiikka',
      requiredTier: 'full',
      features: ['Erojen tunnistaminen', 'Looginen päättely', 'Luokittelu', 'Monipuoliset harjoitukset']
    },
    'pattern-train': {
      name: 'Kuviojuna',
      appId: 'pattern-train',
      description: 'Luo junatetemaisia sekvenssitehtäviä kuvioiden tunnistamiseen',
      category: 'Logiikka',
      requiredTier: 'full',
      features: ['Kuvioiden tunnistaminen', 'Loogiset sekvenssit', 'Junateema', 'Asteittainen vaikeus']
    },
    'pattern-worksheet': {
      name: 'Kuviotehtävät',
      appId: 'pattern-worksheet',
      description: 'Luo tehtäviä sekvenssien ja toistuvien kuvioiden oppimiseen',
      category: 'Logiikka',
      requiredTier: 'full',
      features: ['Kuviot ja sekvenssit', 'Visuaalinen tunnistaminen', 'Looginen päättely', 'Useita tasoja']
    },
    'bingo': {
      name: 'Kuvabingo',
      appId: 'bingo',
      description: 'Luo mukautettuja bingolappuja kuvilla luokkahuonekäyttöön',
      category: 'Pelit',
      requiredTier: 'core',
      features: ['Mukautetut bingolaput', 'Temaattiset kuvat', 'Useita lappujen kokoja', 'Arvontalistat mukana']
    },
    'picture-path': {
      name: 'Kuvapolku',
      appId: 'picture-path',
      description: 'Luo visuaalisia polkuja logiikan ja ohjeiden seuraamisen kehittämiseen',
      category: 'Logiikka',
      requiredTier: 'full',
      features: ['Seurattavat polut', 'Peräkkäinen logiikka', 'Visuaaliset harjoitukset', 'Useita vaikeustasoja']
    },
    'picture-sort': {
      name: 'Kuvien Lajittelu',
      appId: 'picture-sort',
      description: 'Luo kuvien lajittelutehtäviä luokittelukyvyn kehittämiseen',
      category: 'Logiikka',
      requiredTier: 'full',
      features: ['Lajittelu ja järjestäminen', 'Luokittelu', 'Looginen päättely', 'Monipuoliset teemat']
    },
    'prepositions': {
      name: 'Prepositiot',
      appId: 'prepositions',
      description: 'Luo visuaalisia harjoituksia prepositioiden oppimiseen leikkisästi',
      category: 'Kielioppi',
      requiredTier: 'full',
      features: ['Tilalliset prepositiot', 'Kuvitetut harjoitukset', 'Visuaalinen oppiminen', 'Helppo ymmärtää']
    },
    'shadow-match': {
      name: 'Varjojen Yhdistäminen',
      appId: 'shadow-match',
      description: 'Luo harjoituksia esineiden ja niiden varjojen yhdistämiseen',
      category: 'Visuaalinen Hahmotus',
      requiredTier: 'full',
      features: ['Muoto-varjo-yhdistäminen', 'Visuaalinen hahmotus', 'Visuaalinen erottelu', 'Eri tasoja']
    },
    'subtraction': {
      name: 'Vähennyslasku',
      appId: 'subtraction',
      description: 'Luo visuaalisia vähennyslaskutehtäviä matematiikan opiskeluun',
      category: 'Matematiikka',
      requiredTier: 'full',
      features: ['Vähennyslaskuharjoitukset', 'Visuaalinen tuki', 'Säädettävä vaikeustaso', 'Vastausavaimet mukana']
    },
    'sudoku': {
      name: 'Sudoku Lapsille',
      appId: 'sudoku',
      description: 'Hauskoja sudoku-pulmia kuvilla numeroiden sijaan lapsille',
      category: 'Logiikka',
      requiredTier: 'core',
      features: ['Sudoku kuvilla', '4x4 ja 6x6 ruudukot', 'Asteittainen vaikeus', 'Ratkaisut mukana']
    },
    'treasure-hunt': {
      name: 'Aarteenetsintä',
      appId: 'treasure-hunt',
      description: 'Luo aarteenetsintätehtäviä leikkisiin ja opettavaisiin aktiviteetteihin',
      category: 'Opetuspelit',
      requiredTier: 'full',
      features: ['Etsintäpolut', 'Leikkisät aktiviteetit', 'Mukautettavat kartat', 'Edistää päättelykykyä']
    },
    'word-guess': {
      name: 'Arvaa Sana',
      appId: 'word-guess',
      description: 'Luo sanaa-arvaustehtäviä sanaston rikastamiseen',
      category: 'Sanapelit',
      requiredTier: 'full',
      features: ['Sana-arvoitukset', 'Visuaaliset vihjeet', 'Sanaston rikastaminen', 'Useita tasoja']
    },
    'word-scramble': {
      name: 'Sekoitetut Sanat',
      appId: 'word-scramble',
      description: 'Luo sanojen sekoitustehtäviä sanaston ja oikeinkirjoituksen parantamiseen',
      category: 'Kieli & Lukeminen',
      requiredTier: 'core',
      features: ['Mukautetut sanalistat', 'Temaattinen sanasto', 'Useita vaikeustasoja', 'Vastausavaimet mukana']
    },
    'word-search': {
      name: 'Sanaristikko',
      appId: 'word-search',
      description: 'Luo mukautettavia sanaristikoita temaattisella sanastolla',
      category: 'Sanapelit',
      requiredTier: 'free',
      features: ['Useita ruudukkokokoja', 'Suuntavalinnat', 'Temaattiset sanalistat', 'Vastausavaimet mukana']
    },
    'writing-app': {
      name: 'Kirjoitusharjoitukset',
      appId: 'writing-app',
      description: 'Luo mukautettuja kirjoitustehtäviä kirjoitustaitojen kehittämiseen',
      category: 'Kirjoitustaidot',
      requiredTier: 'full',
      features: ['Mukautettavat kirjoitusviivat', 'Monipuoliset teemat', 'Visuaalinen tuki', 'Tulostusvalmiit lomakkeet']
    }
  };

  // Static app data while Strapi is being set up
  const staticAppData: Record<string, any> = {
    'image-addition': {
      name: 'Image Addition',
      appId: 'image-addition',
      description: 'Create visual addition worksheets with images for early math learners',
      category: 'Math',
      requiredTier: 'core',
      features: ['Visual math problems', 'Customizable difficulty', 'Answer keys', 'Print-ready format']
    },
    'word-search': {
      name: 'Word Search',
      appId: 'word-search',
      description: 'Generate customizable word search puzzles with themed vocabulary',
      category: 'Word Games',
      requiredTier: 'free',
      features: ['Multiple grid sizes', 'Directional options', 'Themed word lists', 'Solution keys']
    },
    'coloring': {
      name: 'Coloring Pages',
      appId: 'coloring',
      description: 'Design printable coloring pages from our extensive image library',
      category: 'Art & Creativity',
      requiredTier: 'core',
      features: ['100+ images', 'Multiple themes', 'Various difficulty levels', 'High-quality prints']
    },
    'alphabet-train': {
      name: 'Alphabet Train',
      appId: 'alphabet-train',
      description: 'Help children learn letters with fun train-themed alphabet worksheets',
      category: 'Language Arts',
      requiredTier: 'core',
      features: ['Letter recognition', 'Alphabetical order', 'Fun train theme', 'Multiple difficulty levels']
    },
    'math-worksheet': {
      name: 'Math Worksheets',
      appId: 'math-worksheet',
      description: 'Generate customizable math practice worksheets for all skill levels',
      category: 'Math',
      requiredTier: 'core',
      features: ['Addition & subtraction', 'Multiplication & division', 'Answer keys', 'Difficulty settings']
    },
    'word-scramble': {
      name: 'Word Scramble',
      appId: 'word-scramble',
      description: 'Create word scramble puzzles to improve vocabulary and spelling',
      category: 'Language Arts',
      requiredTier: 'core',
      features: ['Custom word lists', 'Themed vocabulary', 'Multiple difficulty levels', 'Solution keys']
    },
    'find-and-count': {
      name: 'Find and Count',
      appId: 'find-and-count',
      description: 'Visual counting exercises to develop number recognition and counting skills',
      category: 'Visual Perception',
      requiredTier: 'core',
      features: ['Object counting', 'Visual discrimination', 'Number practice', 'Engaging images']
    },
    'matching-app': {
      name: 'MatchUp Maker',
      appId: 'matching-app',
      description: 'Create matching activities to improve memory and association skills',
      category: 'Matching',
      requiredTier: 'core',
      features: ['Image-to-image matching', 'Word-to-image matching', 'Memory games', 'Custom pairs']
    },
    'drawing-lines': {
      name: 'Drawing Lines',
      appId: 'drawing-lines',
      description: 'Fine motor skill development through line drawing exercises',
      category: 'Fine Motor Skills',
      requiredTier: 'core',
      features: ['Tracing activities', 'Connect-the-dots', 'Path following', 'Pre-writing practice']
    },
    'picture-bingo': {
      name: 'Picture Bingo',
      appId: 'picture-bingo',
      description: 'Generate custom bingo cards with images for classroom fun',
      category: 'Games',
      requiredTier: 'core',
      features: ['Custom bingo cards', 'Themed images', 'Multiple card sizes', 'Call sheets included']
    },
    'sudoku': {
      name: 'Sudoku for Kids',
      appId: 'sudoku',
      description: 'Child-friendly sudoku puzzles with images instead of numbers',
      category: 'Logic',
      requiredTier: 'core',
      features: ['Picture sudoku', '4x4 and 6x6 grids', 'Progressive difficulty', 'Solution included']
    },
    'big-small-app': {
      name: 'Big or Small',
      appId: 'big-small-app',
      description: 'Create size comparison worksheets with visual exercises for early learners',
      category: 'Early Learning',
      requiredTier: 'full',
      features: ['Size comparisons', 'Visual exercises', 'Multiple choice', 'Sequencing tasks']
    }
  };

  // Return Spanish translation if locale is 'es' and translation exists
  if (locale === 'es' && spanishTranslations[slug]) {
    return spanishTranslations[slug];
  }

  // Return French translation if locale is 'fr' and translation exists
  if (locale === 'fr' && frenchTranslations[slug]) {
    return frenchTranslations[slug];
  }

  // Return German translation if locale is 'de' and translation exists
  if (locale === 'de' && germanTranslations[slug]) {
    return germanTranslations[slug];
  }

  // Return Italian translation if locale is 'it' and translation exists
  if (locale === 'it' && italianTranslations[slug]) {
    return italianTranslations[slug];
  }

  // Return Portuguese translation if locale is 'pt' and translation exists
  if (locale === 'pt' && portugueseTranslations[slug]) {
    return portugueseTranslations[slug];
  }

  // Return Dutch translation if locale is 'nl' and translation exists
  if (locale === 'nl' && dutchTranslations[slug]) {
    return dutchTranslations[slug];
  }

  // Return Swedish translation if locale is 'sv' and translation exists
  if (locale === 'sv' && swedishTranslations[slug]) {
    return swedishTranslations[slug];
  }

  // Return Danish translation if locale is 'da' and translation exists
  if (locale === 'da' && danishTranslations[slug]) {
    return danishTranslations[slug];
  }

  // Return Norwegian translation if locale is 'no' and translation exists
  if (locale === 'no' && norwegianTranslations[slug]) {
    return norwegianTranslations[slug];
  }

  // Return Finnish translation if locale is 'fi' and translation exists
  if (locale === 'fi' && finnishTranslations[slug]) {
    return finnishTranslations[slug];
  }

  // Return static data for now
  if (staticAppData[slug]) {
    return staticAppData[slug];
  }

  // Define tier mappings for all apps
  const appTiers: Record<string, string> = {
    'word-search': 'free',
    // Core Bundle
    'image-addition': 'core',
    'alphabet-train': 'core',
    'coloring': 'core',
    'math-worksheet': 'core',
    'word-scramble': 'core',
    'find-and-count': 'core',
    'matching-app': 'core',
    'drawing-lines': 'core',
    'picture-bingo': 'core',
    'sudoku': 'core',
    // Full Access
    'big-small-app': 'full',
    'chart-count-color': 'full',
    'code-addition': 'full',
    'draw-and-color': 'full',
    'find-objects': 'full',
    'grid-match': 'full',
    'image-crossword': 'full',
    'image-cryptogram': 'full',
    'math-puzzle': 'full',
    'missing-pieces': 'full',
    'more-less': 'full',
    'odd-one-out': 'full',
    'pattern-train': 'full',
    'pattern-worksheet': 'full',
    'picture-path': 'full',
    'picture-sort': 'full',
    'prepositions': 'full',
    'shadow-match': 'full',
    'story-dice': 'full',
    'subtraction': 'full',
    'treasure-hunt': 'full',
    'word-guess': 'full',
    'writing-app': 'full'
  };
  
  // If not in static data, create a default entry based on slug
  // This ensures ALL apps work even without Strapi
  const defaultAppData = {
    name: slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
    appId: slug,
    description: `Create professional ${slug.replace(/-/g, ' ')} worksheets`,
    category: 'Educational Tools',
    requiredTier: appTiers[slug] || 'full',
    features: ['Easy to use', 'Print ready', 'Professional design', 'Customizable']
  };
  
  // Try Strapi if available (but don't fail if it's not)
  try {
    const strapiUrl = 'http://localhost:1337';
    const response = await fetch(
      `${strapiUrl}/api/app-infos?filters[slug][$eq]=${slug}&populate=*`,
      { 
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    
    if (response.ok) {
      const data = await response.json();
      const strapiData = data.data?.[0]?.attributes;
      if (strapiData) {
        return strapiData;
      }
    }
  } catch (error) {
    // Silently fall back to default data
    console.log('Strapi not available, using default data for:', slug);
  }
  
  // Return default data so the page always works
  return defaultAppData;
}

// Check if user has access to the app
function checkAccess(userTier: string, requiredTier: string): boolean {
  const tierLevels: { [key: string]: number } = {
    'free': 0,
    'core': 1,
    'full': 2
  };
  
  return tierLevels[userTier] >= tierLevels[requiredTier];
}

// Get tier badge color
function getTierColor(tier: string): string {
  switch(tier) {
    case 'free':
      return 'from-green-600 to-green-700';
    case 'core':
      return 'from-blue-600 to-blue-700';
    case 'full':
      return 'from-purple-600 to-purple-700';
    default:
      return 'from-gray-600 to-gray-700';
  }
}

// Get tier label
function getTierLabel(tier: string, locale: string): string {
  const tierLabels: Record<string, Record<string, string>> = {
    'free': {
      'en': 'FREE TIER',
      'de': 'KOSTENLOS',
      'fr': 'GRATUIT',
      'es': 'GRATIS',
      'it': 'GRATUITO',
      'pt': 'GRATUITO',
      'nl': 'GRATIS',
      'sv': 'GRATIS',
      'da': 'GRATIS',
      'no': 'GRATIS',
      'fi': 'ILMAINEN'
    },
    'core': {
      'en': 'CORE BUNDLE',
      'de': 'BASIS-PAKET',
      'fr': 'OFFRE ESSENTIELLE',
      'es': 'PAQUETE BÁSICO',
      'it': 'PACCHETTO BASE',
      'pt': 'PACOTE ESSENCIAL',
      'nl': 'BASISPAKKET',
      'sv': 'BASPAKET',
      'da': 'BASISPAKKE',
      'no': 'BASISPAKKE',
      'fi': 'PERUSPAKETTI'
    },
    'full': {
      'en': 'FULL ACCESS',
      'de': 'VOLLZUGRIFF',
      'fr': 'ACCÈS COMPLET',
      'es': 'ACCESO COMPLETO',
      'it': 'ACCESSO COMPLETO',
      'pt': 'ACESSO COMPLETO',
      'nl': 'VOLLEDIGE TOEGANG',
      'sv': 'FULL ÅTKOMST',
      'da': 'FULD ADGANG',
      'no': 'FULL TILGANG',
      'fi': 'TÄYSI PÄÄSY'
    }
  };

  return tierLabels[tier]?.[locale] || tierLabels[tier]?.['en'] || tier.toUpperCase();
}

export default async function AppPage({ params: { locale, slug } }: PageProps) {
  // Fetch app data from Strapi
  const appData = await getAppData(slug, locale);
  
  // If app not found, show 404
  if (!appData) {
    notFound();
  }
  
  // Check if user is logged in via cookies or headers
  // For development, check if coming from Strapi admin or if there's any auth
  // This is a simple check - in production you'd use proper auth
  const isAdmin = true; // For now, treat all users as admin for testing
  const userTier = isAdmin ? 'full' : (slug === 'word-search' ? 'free' : 'free');
  const hasAccess = isAdmin || checkAccess(userTier, appData.requiredTier || 'core');
  
  // Extract data with fallbacks
  const appName = appData.name || slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  const appDescription = appData.description || `Create professional ${appName} worksheets`;
  
  // Map slug to correct HTML filename
  const htmlFileMap: { [key: string]: string } = {
    'word-search': 'wordsearch.html',
    'image-addition': 'addition.html',
    'alphabet-train': 'alphabet train.html',
    'math-worksheet': 'math worksheet.html',
    'find-and-count': 'find and count.html',
    'matching-app': 'matching.html',
    'drawing-lines': 'drawing lines.html',
    'picture-bingo': 'bingo.html',
    'big-small-app': 'big small.html',
    'chart-count-color': 'chart count.html',
    'code-addition': 'code addition.html',
    'draw-and-color': 'draw and color.html',
    'find-objects': 'find objects.html',
    'grid-match': 'grid match.html',
    'image-crossword': 'crossword.html',
    'image-cryptogram': 'cryptogram.html',
    'math-puzzle': 'math puzzle.html',
    'missing-pieces': 'missing pieces.html',
    'more-less': 'more less.html',
    'odd-one-out': 'odd one out.html',
    'pattern-train': 'pattern train.html',
    'pattern-worksheet': 'pattern worksheet.html',
    'picture-path': 'picture path.html',
    'picture-sort': 'picture sort.html',
    'shadow-match': 'shadow match.html',
    'story-dice': 'story dice.html',
    'treasure-hunt': 'treasure hunt.html',
    'word-guess': 'word guess.html',
    'word-scramble': 'word scramble.html',
    'writing-app': 'writing.html',
    'sudoku': 'sudoku.html',
    'coloring': 'coloring.html',
    'subtraction': 'subtraction.html',
    'prepositions': 'prepositions.html'
  };
  
  const sourceFile = appData.sourceFile || htmlFileMap[slug] || `${slug}.html`;
  const componentName = appData.componentName || slug;
  const appTier = appData.requiredTier || 'core';
  // Ensure features is always an array
  const features = Array.isArray(appData.features) ? appData.features : 
                   appData.features ? [appData.features] : 
                   ['Professional design', 'Easy to use', 'Print ready'];
  const category = appData.category || 'General';
  const icon = appData.icon || '📝';
  
  const tierColor = getTierColor(appTier);
  const tierLabel = getTierLabel(appTier, locale);

  // German translations for UI elements
  const uiTranslations = {
    de: {
      apps: 'Anwendungen',
      tierLabels: {
        free: 'Kostenlos',
        core: 'Kernpaket',
        full: 'Vollzugriff'
      },
      accessRequired: {
        core: 'Diese App erfordert das Kernpaket',
        full: 'Diese App erfordert Vollzugriff'
      },
      upgradeMessage: 'Upgraden Sie Ihren Plan, um auf diesen Arbeitsblatt-Generator und viele weitere professionelle Tools zuzugreifen.',
      viewPricing: 'Preispläne anzeigen',
      browseFreeApps: 'Kostenlose Apps durchsuchen',
      howToUse: 'Anleitung',
      startFreeTrial: 'Jetzt registrieren',
      viewAllPlans: 'Alle Pläne anzeigen',
      exploreMoreApps: 'Mehr Apps erkunden',
      upgradeToAccess: 'Upgrade für Zugriff',
      unlockThisApp: 'Diese App freischalten'
    }
  };

  const t = (key: string, defaultValue: string): string => {
    if (locale === 'de') {
      const value = uiTranslations.de[key as keyof typeof uiTranslations.de];
      if (typeof value === 'string') {
        return value;
      }
    }
    return defaultValue;
  };

  const getLocalizedTierLabel = () => {
    if (locale === 'de' && uiTranslations.de.tierLabels[appTier as keyof typeof uiTranslations.de.tierLabels]) {
      return uiTranslations.de.tierLabels[appTier as keyof typeof uiTranslations.de.tierLabels];
    }
    return tierLabel;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className={`bg-gradient-to-r ${tierColor} text-white py-12`}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-white/80 mb-4">
              <Link href={`/${locale}/apps`} className="hover:text-white transition-colors">
                {t('apps', 'Apps')}
              </Link>
              <span>/</span>
              <span>{category}</span>
              <span>/</span>
              <span>{appName}</span>
            </div>
            
            {/* Title and Description */}
            <div className="flex items-start gap-4 mb-6">
              <div className="text-5xl">{icon}</div>
              <div className="flex-1">
                <h1 className="text-4xl font-bold mb-4">{appName}</h1>
                <p className="text-xl text-white/90">
                  {appDescription}
                </p>
              </div>
            </div>
            
            {/* Features Pills */}
            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-2 bg-white/20 backdrop-blur rounded-full text-sm font-semibold">
                {getLocalizedTierLabel()}
              </span>
              {features.map((feature: any, index: number) => {
                const featureText = typeof feature === 'string' ? feature : feature.text || feature.title || '';
                return (
                  <span key={index} className="px-4 py-2 bg-black/20 backdrop-blur rounded-full text-sm">
                    ✓ {featureText}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* App Container - Full Screen */}
      <section className="flex-1 bg-white">
        {hasAccess ? (
          <div className="h-full">
            <AppContent
              appSlug={slug}
              locale={locale}
              appName={appName}
              requiredTier={appTier}
            />
          </div>
        ) : (
          <div className="flex items-center justify-center h-screen bg-gray-50">
            <div className="bg-white rounded-lg shadow-lg p-12 text-center max-w-md">
              <div className="text-6xl mb-4">🔒</div>
              <h2 className="text-2xl font-semibold mb-4">
                {locale === 'de'
                  ? uiTranslations.de.accessRequired[appTier] || `Diese App erfordert ${getLocalizedTierLabel()}`
                  : `This app requires ${appTier === 'core' ? 'Core Bundle' : 'Full Access'}`}
              </h2>
              <p className="text-gray-600 mb-8">
                {t('upgradeMessage', 'Upgrade your plan to access this worksheet generator and many more professional tools.')}
              </p>
              <div className="space-y-4">
                <Button href={`/${locale}/pricing`} variant="primary" size="lg" fullWidth>
                  {t('viewPricing', 'View Pricing Plans')}
                </Button>
                <Button href={`/${locale}/apps`} variant="ghost" size="lg" fullWidth>
                  {t('browseFreeApps', 'Browse Free Apps')}
                </Button>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Instructions Section */}
      {appData.instructions && hasAccess && (
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-6">{t('howToUse', 'How to Use')}</h2>
              <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: appData.instructions }} />
            </div>
          </div>
        </section>
      )}

      {/* Use Cases Section */}
      {appData.useCases && appData.useCases.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-8 text-center">Perfect For</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {appData.useCases.map((useCase: any, index: number) => (
                  <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
                    <h3 className="font-semibold mb-2">{useCase.title}</h3>
                    <p className="text-sm text-gray-600">{useCase.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      {!hasAccess && (
        <section className="py-12 bg-gradient-to-r from-primary to-primary-dark text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">
                {locale === 'de'
                  ? 'Bereit, erstaunliche Arbeitsblätter zu erstellen?'
                  : 'Ready to Create Amazing Worksheets?'}
              </h2>
              <p className="text-xl mb-8 text-white/90">
                {locale === 'de'
                  ? 'Schließen Sie sich Tausenden von Lehrern an, die professionelle Unterrichtsmaterialien erstellen'
                  : 'Join thousands of teachers creating professional educational materials'}
              </p>
              <div className="flex gap-4 justify-center">
                <Button href={`/${locale}/pricing`} variant="secondary" size="lg">
                  {t('viewAllPlans', 'View All Plans')}
                </Button>
                <Button href={`/${locale}/auth/signup`} variant="ghost" size="lg">
                  {t('startFreeTrial', 'Sign Up Free')}
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

// Generate static params for all apps
export async function generateStaticParams() {
  // List of all app slugs
  const apps = [
    'word-search',
    'image-addition',
    'alphabet-train',
    'coloring',
    'math-worksheet',
    'word-scramble',
    'find-and-count',
    'matching-app',
    'drawing-lines',
    'picture-bingo',
    'sudoku',
    'big-small-app',
    'chart-count-color',
    'code-addition',
    'draw-and-color',
    'find-objects',
    'grid-match',
    'image-crossword',
    'image-cryptogram',
    'math-puzzle',
    'missing-pieces',
    'more-less',
    'odd-one-out',
    'pattern-train',
    'pattern-worksheet',
    'picture-path',
    'picture-sort',
    'prepositions',
    'shadow-match',
    'story-dice',
    'subtraction',
    'treasure-hunt',
    'word-guess',
    'writing-app'
  ];
  
  const locales = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
  
  // Generate params for all combinations
  const params = [];
  for (const locale of locales) {
    for (const slug of apps) {
      params.push({ locale, slug });
    }
  }
  
  return params;
}