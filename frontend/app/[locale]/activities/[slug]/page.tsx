import fs from 'fs';
import path from 'path';
import { Metadata } from 'next';
import { INDEXABLE_ROBOTS } from '@/lib/seo/robots';
import { PublisherJsonLd } from '@/components/seo/PublisherJsonLd';
import { ORGANIZATION_ID } from '@/lib/seo/organization-schema';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { TOPIC_ENABLED_LOCALES, TopicEnabledLocale } from '@/config/topic-locales';

/* Map manifest `alignment.grade` ("K"/"1"/"2"/"3") to the localized
   `seo.educational_level.*` key. Reused across activities of all engines. */
const GRADE_KEY_MAP: Record<string, string> = {
  'PK': 'preschool',
  'K': 'kindergarten',
  '1': 'grade_1',
  '2': 'grade_2',
  '3': 'grade_3',
  '4': 'grade_4',
};

/* Per-locale grade override — the visible grade chip + JSON-LD level normally come
   from the shared `alignment.grade` (= the US CCSS grade). Where a national curriculum
   places the content in a DIFFERENT grade (e.g. German grades by Zahlenraum: bis-1000
   arithmetic is Klasse 3, not the CCSS-Grade-2 of 2.NBT.B.7), map activity-id → locale →
   grade here. EN + any locale/activity without an entry are unaffected. Sits beside the
   route's other localization maps (EDUCATIONAL_FRAMEWORK_BY_LOCALE, strand-names). */
const GRADE_OVERRIDE: Record<string, Record<string, string>> = {
  'mango-animal-groups.collective-nouns.l-2-1-a': { es: '3' },           // ES 3.º de primaria (override del manifest '2'): los sustantivos colectivos son tema canónico de Español 3.º (NEM Fase 4; el subtipo *colectivo* como clase de palabra se nombra en Fase 4, y cardumen/enjambre/manada es léxico de baja frecuencia) — el escalón MÁS ALTO de la familia vocab es (antónimos 1.º → categorías/matices/sinónimos/contexto 2.º → colectivos 3.º). Diverge HACIA ARRIBA de en/de Grade 2 (rebuild-not-translate); en/de/fr sin cambio (manifest '2')
  'comparison-creek.river-steer.k-cc-c-7': { es: 'PK' },               // Preescolar (chip via GRADE_KEY_MAP['PK']='preschool' → seo.educational_level.preschool es "Preescolar") — pedagogue: comparar numerales 1–10 (mayor/menor/igual) es un aprendizaje de Pensamiento matemático de 3.º de educación preescolar en México (etapa escolar formal, ≠ guardería alemana); "Preescolar" (término SEP) > el "Kínder" coloquial del default K. FIJA EL PRECEDENTE es K-cluster: K escolar-formal → es:'PK'/"Preescolar". en Kindergarten, de/fr sin cambios (US K.CC.C.7)
  'numbers-court.judge-balance.1-oa-d-7': { es: '2' },                   // 2º primaria — la lectura RELACIONAL del signo igual (la misma cantidad de los dos lados; juzgar igualdades verdaderas/falsas como 3+2=2+3) es de 2º en México; 1º usa "=" de forma operacional (resultado). en/de Grade 1, fr CP sin cambios (US 1.OA.D.7 → MX 2º de primaria)
  'ten-stones.add-sub-within-20.1-oa-c-6': { es: '2' },                  // 2º primaria — la estrategia de formar/pasar por el diez para sumar y restar hasta 20 es de 2º en México (1º trabaja dentro del 10); en/de Grade 1 sin cambios (US 1.OA.C.6 → MX 2º de primaria)
  'wake-up-pip.retell-story.rl-k-2': { de: '2', fr: '1', es: '2' },              // CP — reconstruire un récit DE MÉMOIRE (le modèle disparaît) + chaîne causale 4 temps + restituer les détails clés + écarter l'intrus = attendus cycle 2 (« comprendre l'enchaînement / la relation de cause à effet / restituer l'essentiel »); plus exigeant que le « remettre dans l'ordre » GS (modèle présent); parité DE Klasse 2; US RL.K.2 → FR CP
  'opposites.antonyms.k-l-5-b': { de: '1', fr: '1', es: '1' },                   // ES 1.º de primaria (override del native 'K'): la cláusula de escape del es-K-cluster (#82) en pleno. (1) Calendario vs demanda-de-contenido: Francia TIENE GS y SÍ es escuela, y aun así movió esto a CP argumentando «la maternelle travaille les contraires à l'ORAL» = demanda de CONTENIDO → el razonamiento fr transfiere; el Klasse-1 alemán solo, no. (2) «Lo contrario» SÍ es competencia ORAL de preescolar en SEP — y por eso mismo esto es 1.º: la Fase 2 USA los contrarios en interacción oral/cuentos/juegos, nunca los NOMBRA como relación; la Fase 3 añade la operación explícita (identificar palabras de significado contrario y distinguirlas de otras parecidas). La actividad no enseña la capa oral: la ESCRIBE y la vuelve reflexiva = el patrón de 2 capas de #74. (3) El contraargumento del glyph, considerado y RECHAZADO: sí, un no-lector podría rutear negro→blanco por el swatch en las rondas `pick`, PERO la ronda `oddpair` pregunta cuál de dos PAREJAS escritas NO es de contrarios = un juicio sobre una RELACIÓN, y **ningún glyph entrega una relación**; y `route` exige leer las etiquetas de las puertas (texto sin voz = el criterio de #82). «Más apoyo ≠ menor grado cuando la superficie de respuesta no cambia». (4) La pared de hermanos lo sella: jasper #77 (L.1.5.c, también con apoyo de imagen) es 1.º = «la capa más concreta del vocabulario = el piso de primaria»; los antónimos son MÁS reflexivos (exigen sostener la DIMENSIÓN y elegir el POLO) → no puede shipear por debajo de jasper. Colocación: 1.º junto a jasper < fern #76/olive #27 (2.º) < booker #75 (3.º); igual que de (explícitamente por debajo de ziggy/olive) y fr (CP). // CP — relier un mot à son contraire (antonymes) + discriminer le contraire d'un mot de la même sorte = opération métalinguistique explicite « trouver un mot de sens contraire » du cycle 2 « Étude de la langue » (la maternelle travaille les contraires à l'oral); parité DE Klasse 1; US K.L.5.b K-cluster → FR CP
  'bingo-word-hunt.read-match.rf-k-3-d': { fr: '1' },                    // CP — lire des mots réguliers imprimés et discriminer des mots proches par la lettre/le son qui change = décodage graphophonologique du CP (la maternelle travaille la conscience phono à l'oral); US RF.K.3.d K-cluster → FR CP
  'mosaic-menders.area-match.3-md-c-6': { fr: '4' },                     // CM1: mesurer une aire par comptage d'une unité (le carreau) = compétence CM1 dans les repères de progression, pas la comparaison perceptive de CE2; en Grade 3 / de Klasse 3 unchanged
  'patchwork-meadow.tile.3-md-c-6': { fr: '4' },                         // CM1: mesurer une aire par pavage/recouvrement d'une surface avec le carreau + compter les carreaux = attendu cycle 3/CM1 (« déterminer la mesure d'une aire à partir d'un pavage »), pas la comparaison perceptive de CE2; sibling of mosaic-menders; en Grade 3 / de Klasse 3 unchanged
  'sound-boxes.phoneme-position.rf-k-2-d': { de: '1' },                  // Klasse 1 (Schuleingangsphase): Lautanalyse (An-/In-/Auslaut heraushören) = Kern der phonologischen Bewusstheit (US RF.K.2.d; K-cluster → Klasse 1)
  'choice-board.read-cvc-word.rf-k-3': { de: '1' },                      // Klasse 1 — Erstlesen: Wörter erlesen (synthetisierendes Lesen) = Kern des Anfangsunterrichts (US RF.K.3; K-cluster → Klasse 1)
  'choice-board.onset-rime-blend.rf-k-2-c': { de: '1' },                 // Klasse 1 — Lautsynthese (Anlaut + Reim zusammenschleifen) = Vorstufe des Erlesens, Anfangsunterricht (US RF.K.2.c; K-cluster → Klasse 1)
  'fraction-equiv.same-amount.3-nf-a-3': { de: '4', fr: '4' },           // Klasse 4 — äquivalente Brüche (Bruch-Symbolik + Gleichwertigkeit + Nenner 6/8) = Klasse-4-Propädeutik (educator-ruled, NOT Klasse 3); operator-approved grade_4 support (US Grade 3 → DE Klasse 4). FR CM1 (operator-ruled): les fractions (notation a/b + équivalence) sont un sujet du cycle 3 introduit au CM1; le CE2 ne fait pas a/b → native '3'→CE2 trop bas; de Klasse-4 ≈ fr CM1
  'fox-forge.fraction.3-nf-a-1': { fr: '4' },                            // FR CM1 (operator-ruled): les fractions (a/b comme a copies de 1/b) = cycle 3 introduit au CM1; le CE2 ne fait pas a/b → native '3'→CE2 trop bas. DE keeps native Klasse 3 (basic Bruchteile ok Klasse 3; the de Klasse-3-vs-Klasse-4 split across the two fraction siblings does NOT map to a FR CE2/CM1 split — France has no CE2 fractions → both siblings CM1)
  'mending-fences.mend-board.3-md-d-8': { fr: '4' },                     // FR CM1 (operator-ruled): « calculer le périmètre d'un polygone » = attendu du cycle 3 (CM1, Grandeurs et mesures); le CE2 fait des longueurs mais pas le périmètre calculé → native '3'→CE2 trop bas. DE keeps native Klasse 3 (Umfang ok Klasse 3-4). STRAND: fr falls through to « Grandeurs et mesures » (périmètre = measurement in FR, NOT the de « Raum und Form » geometry) — leave the de STRAND override untouched
  'daisy-plate-stack.plurals.l-k-1-c': { de: '2', fr: '2' },             // Klasse 2 — Einzahl/Mehrzahl (Numerus/Pluralbildung) = systematische Grammatik (educator-ruled; US L.K.1.c K-cluster → DE Klasse 2). FR CE1: la marque écrite du pluriel des noms (-s qu'on n'entend pas, -x pour -eau/-eu) = orthographe grammaticale, attendu CE1; parité DE Klasse 2. STRAND = fr auto-maps « Étude de la langue » (Language:fr in strand-names.ts) → PAS d'override fr (le {de:...} au :156 reste de-only)
  'penny-alphabet-trace.letter-formation.l-k-1-a': { de: '1', es: '1' },  // es 1.º: el trazo sistemático de las 26 letras convencionales (ambos casos, dirección correcta) = NEM Fase 3 (1.º, apropiación del sistema de escritura convencional); preescolar (Fase 2) es grafomotricidad de readiness (trazos libres + el propio nombre), NO la formación deliberada del alfabeto; content-drives-higher (= de Klasse 1 / fr CP); en Kindergarten // Klasse 1 — Erstschreiben: formgerechtes Nachspuren der Druckbuchstaben = Kern des Anfangsunterrichts (US L.K.1.a; K-cluster → Klasse 1)
  'rhyme-shop.rhyme.rf-k-2-a': { de: '1', es: 'PK' },                    // es Preescolar ('PK'→«Preescolar»): la conciencia fonológica (rimas/sílabas/sonidos) es la firma del trabajo de Lenguajes en preescolar SEP/NEM (Fase 2); un niño de 5 años = 3.º preescolar; rebuild-not-translate la coloca donde vive en México = preescolar, NO el push-up de/fr a Klasse 1/CP (allá el Kindergarten no es escuela); precedente comparison-creek/nesting-pots es:'PK' // Klasse 1 — Reime/phonologische Bewusstheit = Kernkompetenz des Anfangsunterrichts (US RF.K.2.a; K-cluster → Klasse 1)
  'sock-and-shadow.puppet-speak.sl-k-6': { de: '1', fr: '1', es: '1' },  // es 1.º: comunicación referencial con criterio de éxito (SEP/NEM Fase 3, campo Lenguajes, componente Oralidad) — por encima de la oralidad abierta de preescolar; paridad DE Klasse 1 / FR CP // Klasse 1 — KMK Sprechen und Zuhören: verständlich/adressatenbezogen beschreiben (US SL.K.6; K-cluster → Klasse 1). FR CP: décrire un objet avec précision (taille/couleur/place) pour se faire comprendre = production orale claire → CP (parité DE Klasse 1; précédent sunny-side-diner L.K.1.f production orale → CP)
  'contraction.apostrophe.l-2-2-c': { de: '3' },                         // Präposition-Artikel-Verschmelzung (in dem → im) — bewusste Analyse setzt Präposition+Artikel als Wortarten voraus (Klasse-3-Lehrplan) → DE Klasse 3 (en Grade 2)
  'hattie-whose-is-it.possessive.l-1-1-b': { de: '3' },                  // Namen-Genitiv OHNE Apostroph + Deppenapostroph-Erkennung = Rechtschreib-Regel/Apostroph-Bewusstheit → DE Klasse 3 (en Grade 1)
  'otto-picture-book.which-picture.rl-k-7': { de: '1', es: '1' },        // Bild-Text-Bezug: vorgelesenen Satz dem passenden Bild einer Bildergeschichte zuordnen (bildgestützt, gehört-nicht-gelesen) = Klasse-1-Kerngeschäft; en stays Kindergarten (K-cluster K-label) // es 1.º: relacionar oración e imagen = reconocimiento concreto (SEP/NEM Fase 3, PDA «relaciona el texto con las ilustraciones»); mismo peldaño que picture-story #82/story-spine #92; paridad DE Klasse 1
  'two-tales.compare.rl-1-9': { de: '2', fr: '2', es: '2' },             // zwei erzählende Geschichtenvergleichen (Gemeinsamkeiten/Unterschiede, same-vs-only-one set-logic) = intertextueller Textvergleich → DE Klasse 2 (en Grade 1). FR CE1: comparer/mettre-en-relation DEUX textes LUS = attendu CE1 (le CP = décodage + comprendre UN texte court); native '1' does NOT auto-map to CP; un cran au-dessus de willow #45 (RL.K.9, GS, ENTENDU)
  'linc-fact-chain.connect.ri-k-3': { de: '2', fr: '2', es: '2' },       // Sachverhalte verknüpfen (Reihenfolge + Ursache-Wirkung) — Kausalschluss über zwei Sachtext-Aussagen = DE Klasse 2 (en Kindergarten); K-cluster content-drives-higher. FR CE1: relier deux faits (séquence/cause) sur 3 options-phrases LUES, aucune image = mettre en relation deux informations + raisonnement causal → CE1; parité DE Klasse 2 (contraste wake-up-pip RL → CP, étayé par images/mémoire)
  'marlo-magnifier.trait-evidence.rl-1-3': { de: '3', fr: '2', es: '3' },  // Charaktereigenschaft aus einer Handlung erschließen + mit Textstelle belegen = schlussfolgerndes Lesen/Textbeleg → DE Klasse 3 (en Grade 1); #84/#91/#93 evidence-ladder; FR CE1: inférer un trait + justifier par un indice = attendu CE1 (« formuler des inférences / justifier son interprétation en s'appuyant sur le texte »), PAS la compréhension littérale CP
  'marina-headline-desk.main-topic.ri-2-2': { de: '3', fr: '3', es: '3' },  // Hauptthema eines Sachtexts — topic-vs-detail is the metatextual/higher-order skill (Wesentliches vom Detail unterscheiden) → DE Klasse 3 (en Grade 2). FR CE2: identifier le sujet principal + le distinguer d'un détail (le foil « détail » cite le texte exprès) = « distinguer l'essentiel du détail », compétence métatextuelle → CE2; parité DE Klasse 3
  'wobble-museum.catch-drift.w-k-2': { de: '2', fr: '2', es: '2' },      // beim Thema bleiben / Textfokus — reading-on-text-level load (4 sentences/room) → DE Klasse 2 (en Kindergarten); Vorlesen-button mitigates but doesn't drop to Klasse 1. FR CE1: lire 4 phrases + juger la cohérence thématique (« rester dans le thème / repérer la phrase hors-sujet ») = cohérence textuelle, un cran au-dessus de la compréhension littérale CP d'un seul texte court; parité DE Klasse 2
  'point-of-view.who-told.rl-1-6': { de: '2', fr: '2' },                 // ⚠ NO es KEY — ES ships 1.º de primaria on the NATIVE '1' (auto-map), diverging de BOTH de (Klasse 2) y fr (CE1). Operator-ruled. 🔎 LA CONCORDANCIA de/fr NO ES INDEPENDIENTE — es UN artefacto alemán citado dos veces: el comentario fr de ESTA línea termina literalmente «… la forme abstraite/réflexive du narrateur = CE2+; PARITÉ DE KLASSE 2» — Francia argumenta por qué NO es CE2, dice que la forma concreta es «accessible au CE1» (afirmación de TECHO), y NUNCA argumenta por qué no CP: su razón para el +1 ES la paridad alemana. Y la razón alemana es «Klasse 1 = still decoding» = el artefacto de calendario del Erstlesen que la maestra ya reventó en #84 (author-purpose) y #85 (juniper). Bajo #82 no transfiere ninguno. 🔎 Y LEER EL MOTOR lo volteó: de y fr REESCRIBIERON la `instruction` para ENUNCIAR LA REGLA („Von ganz oben sieht alles winzig und weit weg aus") — el inglés NO lo hace. Con la regla dada, el niño hace un CALCE LÉXICO: «winzig und weit weg» ↔ «winziger Punkt, weit weg» → «ganz oben». EL DISEÑO PREMIA LA SUPERFICIE — el inverso exacto de juniper, donde la moraleja no reusa ninguna palabra del cuento y el `detalle` CASTIGA el calce léxico → 3.º es imposible. El muro: no puede ser 3.º (booker exige un SISTEMA; gabby/juniper tienen el significado FUERA de la superficie — aquí está máximamente EN ella), y va DEBAJO de author-purpose (2.º) porque NO es metatextual: se queda dentro del mundo del cuento, juzgando desde dónde miraba un observador, no qué ES el texto ni PARA QUÉ. El canal de texto mudo fija el PISO de primaria (el criterio #86 que movió inky K→1.º) pero no llega a 2.º. Queda a la par de picture-story (RL.K.1 — también «lee una oración corta, toca la respuesta»), su hermano natural. // Erzählperspektive/Standpunkt — DE Klasse 2 (Klasse 1 = still decoding; Klasse 3 = the reflective form; the concrete high/low viewpoint mechanic sits at Klasse 2) → en Grade 1. FR CE1: le point de vue SPATIAL concret (en haut → minuscule/lointain, en bas → énorme/proche) = accessible au CE1; la forme abstraite/réflexive du narrateur = CE2+; parité DE Klasse 2
  'pim-comma-mail.letter-commas.l-2-2-b': { de: '3', fr: '3', es: '3' },           // ES 3.º de primaria (override del native '2'). ⚠ NO se hereda de Alemania — el ancla está en CÓDIGO SHIPEADO, verificada: `wally-capital-crane` (L.2.2.a, MAYÚSCULAS, manifest "2") shipea es 2.º SIN override, mientras `cleo-packing-list` (L.1.2.b, LA COMA, manifest "1") shipea es:'3' — un salto de +2. La frontera ya está trazada: PUNTO + MAYÚSCULA ≤2.º; cualquier otro signo ≥3.º. Los dos puntos caen adentro. Segunda ruta independiente: el RECADO es 1.º-2.º, LA CARTA es 3.º. Converge con de/fr SIN heredar (#82 satisfecho: el peldaño es contenido, no su calendario). ⚠ El comentario fr de esta línea es OBSOLETO: llama "CP" a cleo, pero cleo shipea fr:'3' (CE2) — no cambia fr='3', pero NADIE debe razonar desde esa frase. // das Komma in der Anrede — Kommasetzung is a Klasse-3 topic in DE (Klasse 1-2 = Satzschlusszeichen only) → DE Klasse 3 (en Grade 2). FR CE2: la virgule après l'appel + la formule d'amitié = ponctuation de la lettre indissociable de la structure épistolaire (production d'écrit structuré, fin de cycle 2), un cran au-dessus de cleo #30 (virgules d'énumération, CP) = de Klasse 3; native '2' does NOT auto-map to CE1
  'inky-book-workshop.author-illustrator.rl-k-6': { de: '1', fr: '1', es: '1' },   // ES 1.º de primaria (override del native 'K', que auto-mapearía a «Kínder» = falso). Converge con de+fr pero por una razón MEXICANA más fuerte. #82: el bump alemán K→Klasse 1 es artefacto de sistema puro (el Kindergarten alemán no es escuela) → no transfiere solo; pero Francia tiene GS, que SÍ es escuela, y aun así lo subió a CP → demanda de contenido → transfiere. 🚨 LA PRUEBA DECISIVA, y salió de LEER EL MOTOR, no el plan: `speak()` sólo dispara en el handler del tap (:116, feedback DESPUÉS de elegir) y NO existe afordancia 🔊 en ninguna parte del motor (verificado: grep = 0) → NADA se lee en voz alta ANTES de responder. Y la respuesta vive ENTERAMENTE en el verbo del prompt ESCRITO (ESCRIBIÓ/DIBUJÓ/LEYENDO): el niño no puede acertar sin descifrar SOLO una oración escrita. Todo el canal es TEXTO MUDO. picture-story se ruleó 1.º aunque su 🔊 SÍ leía el cuento, bajo «el audio baja la carga del ESTÍMULO, nunca de la RESPUESTA»; aquí no hay audio en absoluto → A FORTIORI: si picture-story no es alcanzable en Fase 2, ésta lo es menos. La Fase 2 de SEP espera LECTURA NO CONVENCIONAL (la docente lee en voz alta; el niño responde oral/gestual/pictóricamente) — una actividad cuyo único portador de respuesta es una oración escrita sin voz NO es diseñable para preescolar, por muy preescolar que suene su tema. CONTRA-ARGUMENTO DEL EMOJI, planteado y RECHAZADO (línea #83): (1) ✍️🎨📖 desambiguan la TARJETA, no la RONDA — aunque el niño mapee ✍️→«el que escribe», sigue sin saber QUÉ se le pregunta, porque el prompt es la pista y el prompt es texto mudo; (2) en promptRead el emoji ESTORBA: 📖 es icono de un LIBRO (objeto) mientras ✍️ y 🎨 son MANOS HACIENDO (acciones) — el set no es autodescriptivo; (3) «más apoyo ≠ menor grado cuando la superficie de respuesta no cambia». Cláusula de escape del K-cluster ACTIVADA: el contenido NOMINAL (autor/ilustrador) sí existe en preescolar SEP, pero ORAL y ACOMPAÑADO (la docente muestra la portada y pregunta); el DISEÑO de aquí (leer solo, elegir entre tres palabras escritas) es contenido de primaria formal. ⚠ Contraste comparison-creek → 'PK': bajó porque comparar numerales 1-10 es preescolar mexicano Y SU SUPERFICIE DE RESPUESTA ERAN NUMERALES; aquí la superficie son PALABRAS. Ambos precedentes obedecen un criterio: MANDA LA SUPERFICIE DE RESPUESTA. // Buchrollen Autor/Illustrator (Klasse-1 Buch-/Medienkunde) → DE Klasse 1 (en Kindergarten); K-cluster K-label. FR CP: « identifier l'auteur et l'illustrateur » = culture du livre, attendu cycle-2 (« Lecture et compréhension de l'écrit », domaine CP) + parité DE Klasse 1 + précédent K-cluster picture-story/atlas → CP; native 'K' ne mappe PAS en GS (pas de domaine maternelle « rôles du livre »)
  'field-guide.text-features.1-ri-5': { de: '2', fr: '2', es: '2' },      // ES 2.º de primaria (override del native '1'; maestra-decisive, converge de+fr): 1.º es el año de la alfabetización inicial — el SEP de 1.º sí EXPLORA las partes del libro, pero eso es reconocer que el índice existe, no hojearlo estratégicamente; aquí se requiere lectura silenciosa de ~9 renglones/ronda + sostener la pregunta + comparar 3 glosas = lectura autónoma al servicio de una tarea. El override es DENTRO de la Fase 3 (1.º-2.º) → colocación honesta, no salto curricular. Escalera: atlas #78=1.º (solo LEE 2 oraciones) < ésta (leer + navegar) < booker #75=3.º (exige el SISTEMA alfabético; aquí no se alfabetiza nada). // USE text features (Inhaltsverzeichnis/Glossar nutzen) presupposes automatized reading → DE Klasse 2 (en Grade 1; also_teaches 2.RI.5). FR CE1: utiliser les outils/organisateurs d'un documentaire (sommaire/glossaire/index/titres) pour LOCALISER une info présuppose un décodage automatisé (BO 2020 « Pratiquer différentes formes de lecture », repères CE1); native '1' does NOT auto-map to CP
  'picture-story.read.rl-k-1': { de: '1', fr: '1', es: '1' },             // ES 1.º de primaria (override del native 'K'): el criterio NO es «la superficie de respuesta es texto» sino **¿hay texto que el niño DEBE descifrar SIN apoyo de audio?** — la 🔊 lee EL CUENTO; NO lee la pregunta ni las 3 tarjetas de respuesta: ésas son texto SIN VOZ. El audio baja la carga del ESTÍMULO, nunca de la RESPUESTA → aun usando todos los apoyos, el niño tiene que leer. En SEP la Fase 2 responde oral/gestual/pictóricamente y NO se espera que descifre un set de opciones escritas → la actividad NO es alcanzable en Fase 2 tal como está diseñada. ⚠ el es-K-cluster NO la protege, y por qué importa: el K-cluster bloquea un DESFASE DE SISTEMA ESCOLAR (el Kindergarten alemán NO es escuela → todo lo escolar se empuja) = artefacto de calendario ajeno que con razón NO heredamos; pero FRANCIA tiene GS y SÍ es escuela, y aun así movió esto a CP → ése override es DEMANDA DE CONTENIDO, no calendario. México está en la posición de Francia (nuestro kínder ES escuela) → el razonamiento francés SÍ transfiere, el alemán solo NO. Lo sella el hermano: atlas #78 (RI.K.1, el gemelo informativo, misma superficie) es 1.º — ésta tiene MÁS andamiaje pero la MISMA demanda de respuesta; shipear el gemelo RL en Kínder con su gemelo RI en 1.º sería incoherente. **Más apoyo ≠ menor grado cuando la superficie de respuesta no cambia.** // story key-detail comprehension w/ read-aloud support → DE Klasse 1 (en Kindergarten); K-cluster K-label. FR CP: la surface-réponse est des cartes-réponses en TEXTE que l'enfant LIT (lu-vs-entendu = atlas #57 → CP; l'audio 🔊 est un étayage optionnel, pas la surface-réponse) → native 'K' ne mappe PAS en GS; le jumeau RL d'atlas RI
  'atlas-fact-files.key-detail.ri-k-1': { de: '1', fr: '1', es: '1' },    // Sachtext-Leseverständnis (late-Klasse-1 Erstleser) → DE Klasse 1 (en Kindergarten); K-cluster K-label. FR CP: prélever une info explicite dans un COURT TEXTE AFFICHÉ (lu par soi-même) = attendu cycle-2 « Lecture et compréhension de l'écrit »; native 'K' does NOT auto-map to GS here — the GS/CP split is lu-vs-entendu, not difficulty (contrast nila-pond #47 RI.K.2 = idée principale ENTENDUE → GS). ES 1.º de primaria (override upward del native 'K'; operator-ruled): el preescolar SEP solo espera lectura NO convencional (la docente lee en voz alta) — aquí el niño DESCODIFICA SOLO 2 oraciones + 3 opciones escritas = lectura convencional → Fase 3 (1.º-2.º primaria); el corte lee-vs-escucha es decisivo en SEP igual que en fr (preescolar «escucha/comenta/interpreta» vs primaria «lee y localiza»); el es-K-cluster NO aplica — su cláusula de escape (contenido de primaria formal) se cumple; precedente #67 native-K→es '1'; converge de+fr
  'nila-pond.main-idea-net.ri-k-2': { de: '1' },                          // Hauptaussage eines VORGELESENEN Sachtexts (Hörverstehen, mit Hilfestellung) → DE Klasse 1; sitzt unter marina RI.2.2/Klasse 3 (Selberlesen); K-cluster K-label
  'booker-glossary-desk.guide-words.l-2-4-e': { de: '3', fr: '3', es: '3' },        // systematische Wörterbucharbeit (Leitwörter, 2nd/3rd-letter) → DE Klasse 3 / FR CE2 « usage du dictionnaire » (en Grade 2). ES 3.º primaria (maestra-decisive #75, override del manifest "2"): 1.º-2.º = abecedario + ordenar por 1ª letra, pero comparar 2ª/3ª letra + palabras guía + uso sistemático del diccionario = competencia de 3.º; converge con de/fr
  'clock-digital.read-hour.1-md-b-3': { fr: '2' },                       // FR CE1 — lire l'horloge à aiguilles (heures) = CE1 attendu; en Grade 1 / de Klasse 1
  'clock-digital.read-half-hour.1-md-b-3': { fr: '2', es: '2' },         // FR CE1 / ES 2º — heures+demi-heures; media hora = segundo grado en México (la hora en punto sola = 1º); en Grade 1 / de Klasse 1
  'clock-digital.read-quarter-hour.2-md-c-7': { fr: '3' },               // FR CE2 — « moins le quart » (référence à l'heure suivante) = attendu CE2, un cran au-dessus des demi-heures CE1; en Grade 2 unchanged
  'clock-digital.read-five-minute.2-md-c-7': { fr: '3' },                // FR CE2 — lire l'heure de 5 en 5 = repère CE2 (la granularité fixe le niveau, lecture digitale « 3 h 20 »); en Grade 2 unchanged
  'clock-digital.match-clocks.2-md-c-7': { fr: '3' },                    // FR CE2 — associer numérique↔aiguilles : l'attendu est fixé par la granularité de lecture (« moins le quart », 5 min), pas par le sens; cohérent avec read-quarter/five-minute CE2; en Grade 2 unchanged
  'place-value-regroup.subtract-decompose.2-nbt-b-7': { de: '3', fr: '3', es: '3' },        // bis-1000 subtraction (borrow) → DE Klasse 3 / FR CE2 / ES 3er grado (grade_3; el canje = contenido de 3º en México)
  'place-value-regroup.add-compose-hundred.2-nbt-b-7': { de: '3', fr: '3', es: '3' },       // bis-1000 add (carry to hundreds) → DE Klasse 3 / FR CE2 / ES 3er grado (grade_3)
  'place-value-regroup.subtract-decompose-hundred.2-nbt-b-7': { de: '3', fr: '3', es: '3' },// bis-1000 borrow across zero → DE Klasse 3 / FR CE2 / ES 3er grado (grade_3)
  'pond-juice.pour-measure.3-md-a-2': { de: '2', fr: '2', es: '2' },      // Hohlmaße/Liter (whole-l 0-10, no ml) → DE Klasse 2 (ml/Umrechnung = Klasse 3); FR CE1 (le litre introduced CE1, mL/conversions = cycle 3); MX 2.º (el litro se introduce en 2.º; ml/conversiones = 3.º-4.º); en Grade 3 unchanged
  'bundle-bot.bundle-machine.1-nbt-b-2-a': { de: '2' },                   // two-digit Stellenwert (20-49, multiple tens) → DE Klasse 2 (Klasse 1 = ZR bis 20)
  'tense.past-present-future.l-1-1-e': { de: '2', fr: '2', es: '2' },     // Zeitformen 3-way contrast + werden-future → DE Klasse 2 (Klasse 1 = nur Gegenwart); FR CE1 (présent seul = CP, la conjugaison systématique imparfait+futur simple = attendu CE1). MX 2.º: el contraste sistemático presente/pretérito/futuro CON futuro = reflexión sobre la lengua de 2.º (en 1.º el verbo se usa de forma incidental); espeja de/fr
  'sentence-builder.build-a-sentence.l-1-1-j': { de: '2', fr: '2', es: '2' },  // Satzbau/Wortreihenfolge reorder task → DE Klasse 2 (mastery by end of Klasse 2); FR CE1 (l'accord dans le groupe nominal — le chat noir — = attendu CE1, past CP word-order-only). MX 2.º: construcción de oraciones + orden de palabras + concordancia (el perro café / la flor roja) + mayúscula/punto = trabajo metalingüístico de 2.º (1.º es decodificación); espeja de/fr
  'pronoun.case.l-1-1-d': { de: '3', fr: '3', es: '3' },                  // case-correct pronoun-form choice (er/ihn) → DE Klasse 3 (Fall-arbeit is Klasse 3/4); FR CE2 (les pronoms sujets = CE1, but the COD/object form me/te/le is the CE2 attendu — the activity's central difficulty). MX 3.º: los pronombres de sujeto son 2.º, pero el contraste sujeto/objeto-clítico (Mamá me ve) + posesivo es habilidad de 3.º (misma lógica que fr CE2/de Klasse 3); espeja de/fr
  'olive-kind-of.category-attribute.l-1-5-b': { de: '2', fr: '2', es: '2' },  // Oberbegriff/Hyperonym abstraction → DE Klasse 2 (EN Grade 1 placement doesn't transfer); FR CE1 (catégoriser / le mot générique vs particulier = attendu CE1, réflexif, past CP naming). MX 2.º: subsumir un referente concreto en su término general (categorizar/agrupar) es competencia de 2.º NEM (1.º es nombrar concreto); espeja de/fr
  'vera-verb-match.be-agreement.l-1-1-c': { de: '2', fr: '2', es: '2' },  // reflective Subjekt-Verb-Kongruenz (bin/ist/sind) → DE Klasse 2 (K-1 kids speak it; the grammar task is Klasse 2); FR CE1 (l'accord sujet-verbe / conjuguer être au présent = attendu CE1, réflexif, past CP oral use); ES 2.º (concordancia sujeto-verbo con estar = reflexión metalingüística 2.º NEM; kids speak estoy/está/están at 1.º)
  'hazel-word-bridge.joining-words.l-1-1-g': { de: '3', fr: '3', es: '3' },  // selection-by-meaning across 4 Bindewörter incl. causal „denn" + Pflichtkomma → DE Klasse 3; FR: coordination + car + comma-before-mais/car → CE2; ES 3.º (selección por sentido de 4 nexos incl. causal porque + coma-ante-pero = 3.º NEM Lenguajes)
  'cleo-packing-list.series-commas.l-1-2-b': { de: '3', fr: '3', es: '3' },  // Komma bei Aufzählung = first comma rule, DE Klasse 3; FR: la virgule d'énumération = premier attendu interne → CE2; ES 3.º (la coma en enumeraciones = primera regla de coma; 1.º-2.º solo punto/mayúscula)
  'robin-mirror.reflexive.l-2-1-c': { de: '3', fr: '3', es: '3' },        // Reflexivpronomen → DE Klasse 3; FR: le pronom réfléchi qui varie avec le sujet = consolidation CE2; ES 3.º (pronombres reflexivos como categoría metalingüística = 3.º NEM; uso oral desde preescolar)
  'rusty-yesterday.irregular-past.l-2-1-d': { de: '3', fr: '3', es: '3' }, // starke Verben Präteritum → DE Klasse 3; FR: passé composé irrégulier (résister à « faisé ») = consolidation CE2; ES 3.º (estudio consciente del pretérito de verbos irregulares + rechazar la sobrerregularización = 3.º NEM; uso oral desde preescolar)
  'roary-roar-meter.shades.l-2-5-b': { de: '3', fr: '3', es: '3' },        // Bedeutungsnuancen → DE Klasse 3; FR: classer des synonymes par intensité = CE2; ES 3.º (graduar matices de significado dentro de un mismo sentido = tarea léxica fina de 3.º NEM; los opuestos claros son 1.º-2.º)
  'wren-question-window.question-words.l-k-1-d': { de: '1', fr: '2', es: '1' },    // Fragewörter = DE Klasse 1 (mechanical K→1); FR: emploi écrit des 6 mots interrogatifs = CE1 attendu (maternelle=oral, CP=déchiffrage) — deliberately one notch above the DE bump; ES: palabras interrogativas = tarea de lengua escrita → 1.º primaria (frontera preescolar→primaria; el niño RECONOCE la tilde, no la produce → no 2.º)
  'wordclass.adjective-adverb.l-2-1-e': { fr: '3' },                     // FR CE2: l'adverbe comme classe nommée + le CHOIX fonctionnel adjectif/adverbe = attendu de fin de cycle 2 (l'adjectif seul = CE1); the CCSS-Grade-2→CE1 auto-map under-levels it. en Grade 2 unchanged
  'sunny-side-diner.compound-order.l-k-1-f': { fr: '1' },                // FR CP: produire une phrase complète + coordonner deux groupes avec « et » = charnière oral→écrit CP (au-dessus de la production orale GS, en deçà de l'analyse CE1); native 'K'→« Grande section » too low; en Kindergarten unchanged
  'echo-grove.match-the-rune.3-oa-a-1': { de: '2', fr: '2', es: '2' },    // Multiplikation als gleiche Gruppen / kleines Einmaleins = DE Klasse 2 (US Grade 3 a year higher). FR CE1 (operator-ruled): le sens de la multiplication (groupes égaux, petits nombres, avant les tables) = attendu CE1 (CE2 = tables + multiplication posée); native '3'→CE2 too high; de Klasse-2 ≈ fr-CE1; twin of maple-bakery division-sens; « Nombres et calcul » auto-map → NO STRAND override. ES: la multiplicación como grupos iguales / suma de sumandos iguales = 2.º primaria en SEP/NEM (las tablas formales → 3.º); espeja numbers-court/ten-stones es:'2'. Strand auto "Sentido numérico" → NO STRAND override
  'maple-bakery.share.3-oa-a-2': { de: '2', fr: '2' },                    // Division (Verteilen/Aufteilen, ohne Rest) introduced alongside Einmaleins = DE Klasse 2. FR CE1 (operator-ruled): division-SENS (partage/groupement, petits nombres, sans reste, imagé) = l'approche de la division au CE1 (CE2 formalise le quotient/reste); native '3'→CE2 too high; de Klasse-2 re-grade ≈ fr CE1; « Nombres et calcul » auto-map → NO STRAND override. ES: NO override — en MX la división (reparto/agrupamiento) entra en 3.º primaria, un año DESPUÉS de la multiplicación (#38 echo-grove es:'2'); grado nativo 3 → "3.º de primaria" (asimetría deliberada mult 2.º / div 3.º — NO igualar a echo-grove). Strand auto "Sentido numérico" → NO STRAND override
  'comet-kangaroo.tens-hundreds.2-nbt-b-8': { de: '3', es: '3' },         // 10/100 mehr-weniger im ZR bis 1000 = DE Klasse 3 (Tausenderraum; Klasse 2 = bis 100). ES: números hasta 1000 / valor posicional de 3 cifras = 3.º primaria en MX; espeja place-value-regroup 2-nbt-b-7 es:'3' (bis-1000 = 3º)
  'track-repair.count-to-120.1-nbt-a-1': { de: '2', fr: '1' },            // Orientierung am Zahlenstrahl bis 100 + skip-counting = DE Klasse 2 (ZR bis 20 = Klasse 1); US Grade 1 offset. FR CP (operator-ruled): la ligne numérique + compter en avant/arrière + de 5 en 5 / de 10 en 10 + placer les nombres jusqu'à ~100 = attendus du CP; la France fait 100 au CP (là où l'Allemagne a besoin de Klasse 2 — posy #71 precedent); le franchissement de la centaine (~103) = extension de fin de CP, pas le CE1 (jusqu'à 1000); CP → l'auto-map « Nombres et calcul » est correct → NO fr STRAND override
  'bos-berry-pantry.slingshot-tens.1-nbt-b-2': { de: '2' },               // read/match two-digit Stellenwert (values to 85, multiple tens, ZR bis 100) → DE Klasse 2 (Klasse 1 = ZR bis 20); bundle-bot precedent
  'vet-diagnosis.word-problems.1-oa-a-1': { de: '2', fr: '2', es: '2' },  // Sachaufgaben ZR bis 20 BUT grade follows STRUCTURE: Anfang-unbekannt + additiver Vergleich = schwierigste Klasse-2 Sachaufgabentypen; length-sibling precedent. fr → CE1 (same structural logic). es → 2.º primaria (SEP: incógnita-al-inicio reversa + comparación aditiva = tipos más difíciles, 2.º; converge con de/fr); en stays Grade 1 native; strand falls through auto-map (es « Sentido numérico »)
  'bramble.holds-more.k-md-a-2': { de: '1' },                             // K capacity: German „Kindergarten"=daycare (not a school stage) → Klasse 1; direkter Größenvergleich is Klasse-1 Lehrplan; en stays Kindergarten (the K-cluster K-label pattern)
  'pip-museum.curate-wing.k-g-a-2': { de: '1', fr: '1' },                 // K geometry shape-naming → Klasse 1 (Formen erkennen/benennen = Kern-Geometrie Klasse 1); en stays Kindergarten (K-cluster pattern). FR CP (operator-ruled, content-drives): reconnaître/nommer les figures INDÉPENDAMMENT de l'orientation/la taille + distinguer carré/rectangle/losange par leurs propriétés + hexagone (au-delà des « figures usuelles » de maternelle) = attendu du CP; DIVERGES from the basic-shape-naming GS framing (parking-tower #75 was GS); CP → the auto-map « Espace et géométrie » is correct → NO STRAND override
  'chuffer.rail-decompose.k-oa-a-3': { de: '1', fr: '1' },                // K number-decompose (Zahlzerlegung bis 10) → Klasse 1 (Kernstoff erste Wochen); en stays Kindergarten (K-cluster pattern). fr → CP (content-drives-CP: les décompositions du nombre jusqu'à 10 + compléments à 10 + notation additive 5=2+3 = calcul CP, matches the compose sibling clunks #98); strand falls through auto-map « Nombres et calcul »
  'friendship-bridge.compare-balance.k-cc-c-6': { de: '1' },              // K compare-sets-by-matching (Mengen vergleichen mehr/weniger/gleich viel) → Klasse 1; en stays Kindergarten (K-cluster pattern)
  'necklace.bead-string.k-cc-b-4': { de: '1' },                           // K count-to-cardinality (Anzahl durch Zählen + Anzahlinvarianz) → Klasse 1; en stays Kindergarten (K-cluster pattern)
  'star-stitcher.connect-sequence.k-cc-a-2': { de: '1' },                 // K count-forward-from-N (Weiterzählen ab einer Zahl) → Klasse 1; en stays Kindergarten (K-cluster pattern)
  'mochi-feast.count-out.k-cc-b-5': { de: '1' },                          // K count-out-N / Menge herstellen (eine vorgegebene Anzahl abzählen) → Klasse 1; en stays Kindergarten (K-cluster pattern)
  'ten-tank.ten-frame-tank.k-nbt-a-1': { de: '1', fr: '1', es: '1' },              // K teen numbers 11-19 as ten+ones (Bündeln) → Klasse 1; en stays Kindergarten (K-cluster pattern). FR CP (operator-ruled): « une dizaine et des unités » structured-tens decomposition of 11-19 = début-CP attendu; native 'K'→GS too low (posy #71: la GS s'arrête vers 30, sans dizaines structurées); CP → « Nombres et calcul » auto-map correct → NO STRAND override. ES 1.º primaria (maestra-decisive #58): unitizar diez→una decena + valor posicional = entrada de primaria (preescolar no tiene decena); alinea los hermanos base-ten es (track-repair/bundle-bot='1'); strand auto «Sentido numérico» → NO es STRAND override
  'wondering-jar.estimate-jar.k-cc-b-5': { de: '1' },                     // K estimate-then-count (Anzahlen schätzen) → Klasse 1; en stays Kindergarten (K-cluster pattern)
  'pips-round.mail-route.k-cc-a-3': { de: '1', fr: '1', es: '1' },                 // K numeral reading/recognition (Zahlen lesen bis 20) → Klasse 1; en stays Kindergarten (K-cluster pattern). fr → CP (content-drives-CP: lire les nombres jusqu'à 20 en chiffres + teen-reversal 13/31 = numération CP, NOT GS; contrast the WRITING sibling digby :180 which stays GS 0-9); strand auto-maps « Nombres et calcul » (no override). ES 1.º primaria (maestra-decisive + operator-ruled #60): la inversión 13/31 = posición de cifra cambia el valor = valor posicional naciente = primaria formal (misma lógica que #58); leer numerales 0-20 aislados. strand auto «Sentido numérico» (no override)
  'digby-number-trace.numeral-formation.k-cc-a-3': { de: '1' },           // K numeral WRITING (Ziffern schreiben) → Klasse 1; en stays Kindergarten (K-cluster pattern)
  'clock-ampm.morning-or-night.2-md-c-7': { de: '1', fr: '1', es: '1' },           // a.m./p.m.→Tageszeit/moments-de-la-journée/partes-del-día rebuild: Klasse 1 (de) / CP (fr) / 1.º primaria (es — lectura de la hora en punto = medición del tiempo formal de 1.º; maestra-decisive); en stays Grade 2
  'nesting-pots.seriate.k-cc-c-7': { de: '1', fr: '1', es: 'PK' },                  // K seriate/order numbers → Klasse 1; en stays Kindergarten (K-cluster pattern). FR CP (operator-ruled, content-drives): comparer/ranger/encadrer des nombres écrits + un round à deux chiffres (12-40) + la seriation d'une suite = attendus du CP (« comparer, ranger, encadrer les nombres jusqu'à 100 »); DIVERGES from the K.CC.C.7 sibling comparison-creek (all 1-10 → GS) on content difficulty (posy #71 pattern); CP → the auto-map « Nombres et calcul » is correct → NO STRAND override. ES Preescolar ('PK' → «Preescolar»): seriar/ordenar numerales 1-10 = misma banda de preescolar que comparar (maestra-decisive); ESPEJA el hermano comparison-creek es:'PK' (mismo estándar K.CC.C.7); el reto de 2 cifras es UN round, no define el grado; el Klasse-1 alemán NO transfiere; strand auto «Sentido numérico» → NO es STRAND override
  'clunks-lost-lunch.make-total.k-oa-a-3': { de: '1', fr: '1', es: '1' },          // K make-a-total-many-ways (Zahlen zusammensetzen) → Klasse 1; en stays Kindergarten (chuffer precedent). fr → CP (content-drives-CP: composer/décomposer un total jusqu'à 14 + compléments = calcul CP, NOT pure maternelle); strand falls through auto-map « Nombres et calcul ». ES 1.º primaria ('1', operator-ruled): componer hasta 14 CRUZANDO la decena + suma mental de varios sumandos = composición aditiva formal de 1.º (preescolar es concreto, ≤10); alinea ten-tank #58 (cruzar la decena→1.º); DIVERGE del hermano chuffer K.OA.A.3 (≤10→Kínder) por dificultad de contenido; strand auto «Sentido numérico» → NO es STRAND override
  'posy-egg-cartons.count-tens.k-cc-a-1': { de: '2', fr: '1', es: '1' },           // K count-by-tens but CONTENT bis 100 → Klasse 2 (ZR bis 100 = Klasse 2; content drives the grade, the pond-juice/bundle-bot precedent); en stays Kindergarten. FR CP: compter de 10 en 10 jusqu'à 100 / les nombres jusqu'à 100 (groupements par dizaines) = attendu de CP (le domaine des nombres jusqu'à 100 débute au CP en France) → native 'K' does NOT auto-map to GS (la GS s'arrête vers 30, sans dizaines structurées); the FIRST cycle-2 counting fan, DIVERGES from de Klasse 2; strand auto-map « Nombres et calcul » is correct for CP → NO STRAND override. ES 1.º primaria (maestra-decisive #61, "no escalation"): 1.º mexicano trabaja hasta 100 + la decena + contar de 10 en 10; la Klasse-2 alemana NO transfiere (artefacto de estratificación DE); alinea los hermanos base-ten es within-100 (bundle-bot/track-repair/ten-tank='1'). strand auto «Sentido numérico» (no override)
  'twinsies.count-twin.k-cc-b-5': { de: '1' },                            // K count + make a gleich-große Menge (Anzahlinvarianz, ZR bis 12) → Klasse 1; en stays Kindergarten (K-cluster pattern)
  'rivets-number-forge.numeral-album.k-cc-a-3': { de: '1', fr: '1' },     // K count-enacted numeral production (Anzahl bis 20 + passende Ziffer) → Klasse 1 (ZR bis 20); en stays Kindergarten (K-cluster; digby/pips siblings precedent). fr → CP (RANGE-driven like the READ sibling pips #99: producing two-digit teen numerals 10-14 = « écrire les nombres jusqu'à 20 en chiffres » CP, not the GS 0-9 digby ceiling); strand auto-maps « Nombres et calcul »
  'mamas-roll-call.numeral-trace.k-cc-b-5': { de: '1' },                  // K count-out (self-stop) + Ziffer formen (Anzahl bis 9) → Klasse 1; en stays Kindergarten (K-cluster; mochi/twinsies K.CC.B.5 precedent)
  'parking-tower.place-by-relation.k-g-a-1': { de: '1' },                 // K Lagebeziehungen über/unter/neben/zwischen → Klasse 1 Geometrie; en stays Kindergarten (K-cluster)
  'clock-convert.12-24.2-md-c-7': { es: '3' },                           // ES 3.º primaria (override del manifest '2'): leer el reloj de 24h + la conversión +12 + mapear a la parte del día es un paso ARRIBA de los hermanos — clock-ampm (a.m./p.m., 1.º) < clock-read (analógico hasta cuartos, 2.º) < clock-convert (24h+conversión, 3.º); maestra-decisive (tema SEP real: horarios/transporte/dispositivos); strand auto «Magnitudes y medida» (no override); en/de/fr manifest '2'
  'clock-read.tell-time.1-md-b-3': { es: '2' },                        // ES 2.º primaria (operator-ruled #73, maestra-decisive): leer/poner el reloj analógico es PRIMARIA (no preescolar); dentro de primaria el SEP «Magnitudes y medida» separa 1.º=en punto+y media, 2.º=cuartos («y cuarto»/«cuarto para las…»); el techo de la actividad es "cuarto para las…" = objetivo de 2.º → override deliberado del manifest "1" + de Klasse 1 (de/fr caen al grado 1 del manifest); strand auto «Magnitudes y medida» (no override)
  'author-purpose.why-wrote.ri-2-6': { de: '3', fr: '3' },                // ⚠ NO es KEY — ES ships 2.º de primaria on the NATIVE '2' (auto-maps to «2.º de primaria»), diverging DOWNWARD from de+fr. Operator-ratified. La maestra halló que la premisa del CE2 francés es FALSA: el comentario fr dice «un cran au-dessus du genre (bea #50 CE1)», pero bea NO está en CE1 — no tiene fila en GRADE_OVERRIDE, su manifest es grade:'1', el auto-map fr es identidad, y su propio slug lo grita («histoire-ou-documentaire-cp»). La aritmética que Francia MISMA declara (género +1) aterriza en CE1, no en CE2; el escalón extra vino sólo de «repères annuels … fin de cycle 2» = CALENDARIO PURO. El Klasse 3 alemán es igual: ahí PONE la KMK el Bereich (Klasse 1-2 se la come el Erstlesen) = calendario. Bajo #82 ninguno de los dos escalones transfiere — la RELACIÓN +1 sí. Muro es: bea 1.º → propósito 2.º. Contra los hermanos de 3.º: booker exige un SISTEMA (alfabético) y gabby tiene el significado FUERA de la superficie; aquí la respuesta ESTÁ en la superficie — el diseño prohíbe la inferencia (la forma Fase-4 con inferencia, persuadir-vs-informar, es OTRA actividad). A la par de field-guide (2.º) a propósito: aquél fue un fallo de CARGA DE DECODIFICACIÓN (~9 renglones/ronda); esto lee 2 oraciones + 🔊 = el descriptor de atlas (1.º) — ambos vectores caen dentro de 2.º. SEP decisivo: informar/entretener/instruir son exactamente las tres familias que la Fase 3 YA trabaja (cuento · instructivo · texto informativo); nombrar PARA QUÉ sirve cada una es la CONSOLIDACIÓN de la Fase 3, y 2.º es su año de cierre. México corre MÁS TEMPRANO aquí que Alemania o Francia — #82 corta en ambos sentidos. // judging Textfunktion/Autorintention (informieren/unterhalten/anleiten) = metatextual Klasse-3/4 (one step up from field-guide's Klasse 2); en stays Grade 2. FR CE2: identifier la VISÉE/l'intention de l'auteur (le POURQUOI) = un cran d'abstraction au-dessus du genre (bea #50 CE1); repères annuels situent « identifier la visée d'un texte » en fin de cycle 2 = CE2 → native '2' does NOT auto-map to CE1
  'juniper-story-lantern.central-message.rl-1-2': { de: '3', fr: '2', es: '3' },    // ES 3.º de primaria (override del native '1' — SALTO DE DOS PELDAÑOS, el mayor del fan-out; operator-ruled). ⚠ La bifurcación de/fr NO ES REAL — #84 la disuelve, verificado en el código shipeado: Francia shipea author-purpose en CE2 y juniper en CE1, o sea coloca «identificar el propósito del autor» (respuesta EN la superficie) un año COMPLETO ARRIBA de «inferir la moraleja» (respuesta FUERA de ella) = una INVERSIÓN en su propio muro; no es un juicio rival sino un residuo aritmético (+1 desde el piso literal CP, saltándose el peldaño metatextual porque el suyo está en CE2) → no transfiere. #82 sobre Alemania = híbrido: «abstraction + inference, Tiere stellvertretend» = CONTENIDO → transfiere; «die Fabel ist eine fest verortete Klasse-3/4-TEXTSORTE» = dónde COLOCA la KMK el género = CALENDARIO → no transfiere (Klasse 1-2 se la come el Erstlesen — la misma forma que la maestra ya reventó en author-purpose). Aritmética desde el piso mexicano: picture-story 1.º (literal, en superficie) → author-purpose 2.º (metatextual, AÚN en superficie) → juniper 3.º (metatextual + FUERA de la superficie + una trampa anti-superficie activa) = author-purpose MÁS inferencia. El muro: los dos hermanos de 3.º lo son por exactamente dos razones — booker «exige un SISTEMA», gabby «el significado NO está en la superficie» — y ese segundo criterio ES el mecanismo de esta actividad por diseño (la moraleja no reusa ninguna palabra del cuento; el `detail` premia el calce léxico); author-purpose se sostuvo en 2.º PRECISAMENTE porque «la respuesta ESTÁ en la superficie — el diseño prohíbe la inferencia», así que no puede empatar; field-guide (2.º) cayó por CARGA DE DECODIFICACIÓN (~9 renglones) — 3 renglones + 🔊 no engancha ese vector → no jala hacia abajo. SEP decisivo e independiente: introduce «la fábula» y «la moraleja» como contenido curricular NOMBRADO en 3.º (ámbito de Literatura); en 2.º la actividad tendría que INTRODUCIR su propio término técnico = violación de #82. Ancla literal defendible: la práctica social «Comparar el contenido de fábulas y refranes» (Español 3.º) — que PRESUPONE la moraleja como categoría ya poseída en 3.º. #82 no se rompe: el calendario de México es el DESTINO, no una transferencia — igual que cortó HACIA ABAJO a 2.º en author-purpose, aquí corta hacia arriba. // die Lehre/Moral einer Fabel = abstraction + inference (Tiere stellvertretend), Klasse-3/4 Textsorte; en stays Grade 1; FR CE1: dégager la morale = inférer l'implicite (attendu CE1, PAS la compréhension littérale CP)
  'story-spine.role.rl-k-3': { de: '1', es: '1' },                        // Erzählstruktur / Anfang-Problem-Lösung = früheste Erzählkompetenz, bildgestützt + Vorlesehilfe = Klasse 1 (picture-story #82 precedent); en stays Kindergarten (K-cluster K-label). ES 1.º de primaria (maestra decisiva, Fase 2 NEM): el emparejamiento concreto viñeta↔rol con soporte de imagen = competencia narrativa temprana de 1.º; la terminología consciente de estructura sería 2.º pero esta forma NO la introduce → regla #82 satisfecha en 1.º; coincide con picture-story #82 es 1.º
  'pearl-opinion-page.back-it-up.ri-2-8': { de: '3', fr: '3', es: '3' },  // Begründung — einen echten Grund von einer bloßen Wiederholung unterscheiden = metasprachlich-argumentatives Denken, Klasse 3 (Meinung begründen/Aussagen belegen); en stays Grade 2. FR CE2: distinguer une RAISON (qui ajoute un pourquoi) d'une REDITE (qui répète l'avis) = pensée métatextuelle sur la fonction argumentative (un cran au-dessus du RI.2 littéral) = author-purpose #61 + de Klasse 3; native '2' does NOT auto-map to CE1
};
function effGrade(row: ActivityRow, locale: string): string {
  return (locale !== 'en' && GRADE_OVERRIDE[row.id] && GRADE_OVERRIDE[row.id][locale]) || row.alignment.grade;
}

/* Per-activity strand/domain override — the shared `localizeStrand` maps the CCSS
   strand, but where a national curriculum files the content under a DIFFERENT domain
   (e.g. German splits CCSS "Measurement & Data": a bar-graph is „Daten und Häufigkeit",
   NOT „Größen und Messen"), map activity-id → locale → domain name here. Other locales/
   activities fall through to localizeStrand unchanged. Display-only (chip + JSON-LD
   teaches/targetDescription); related-activity matching keeps the raw alignment.strand. */
const STRAND_OVERRIDE: Record<string, Record<string, string>> = {
  'mosaic-menders.area-match.3-md-c-6': { de: 'Raum und Form', es: 'Forma, espacio y medida' },  // DE: Flächeninhalt = Raum und Form in KMK, not Größen und Messen. MX 3.º: el área (superficie) es una magnitud GEOMÉTRICA ligada a figuras → eje "Forma, espacio y medida" (el eje mexicano que fusiona geometría + medida), NO el default "Magnitudes y medida" (reservado para magnitudes puras: longitud/masa/capacidad/tiempo/dinero). FIJA EL PRECEDENTE es geometría-medida (área/perímetro/superficie/figuras → este eje). en/fr fall through. [merged: was a duplicate key with the de-only entry — #20 fold-fix]
  'numbers-court.judge-balance.1-oa-d-7': { es: 'Número, álgebra y variación' }, // MX 2º: el significado RELACIONAL del signo igual (igualdades/equilibrio entre los dos lados) es propedéutica del álgebra → eje "Número, álgebra y variación" (SEP/NEM); el default es "Sentido numérico" (colapso de sentido numérico) descarta la dimensión algebraica que nombra el pedagogo. Distinto de #9 ten-stones (fluidez de suma/resta → Sentido numérico): un mismo strand OA de EE. UU. se divide legítimamente entre ejes mexicanos por contenido. en/de/fr fall through
  'marlo-magnifier.trait-evidence.rl-1-3': { fr: 'Comprendre et interpréter', es: 'Comprensión de textos literarios' }, // ES «Comprensión de textos literarios» (STRAND_OVERRIDE por-actividad; NO strand-names.ts): regla RL de 2 compuertas → (1) comprende (sin aparato de búsqueda); (2) LEE (el cuento se MUESTRA como texto + los detalles se leen; el 🔊 es apoyo — precedente story-spine #92: texto mostrado + audio-apoyo = LEE, NO «Escucha»). Texto literario (personaje/rasgo) → mismo chip que picture-story #82 / juniper #85 / story-spine #92. // FR CE1: inférer un trait de personnage + le justifier par un indice du texte = interprétation (attribuer un trait + le fonder sur le texte), NOT littéral; = retell #49 / fable-morale #52; "Reading: Literature" has no fr in strand-names.ts; en/de fall through
  'juniper-story-lantern.central-message.rl-1-2': { fr: 'Comprendre et interpréter', es: 'Comprensión de textos literarios' }, // ES «Comprensión de textos literarios» — override POR ACTIVIDAD; ⚠ strand-names.ts NO SE TOCA: 'Reading: Literature' tiene sólo en+de y CINCO actividades vivas comparten ese strand, ya localizadas de TRES maneras distintas por actividad (picture-story→«Comprensión de textos literarios», bea→«Diversidad textual», story-spine/otto/willow→el eje narrado de escucha, precedente fr « Écouter de l'écrit et comprendre ») → una fila es en la tabla ETIQUETARÍA MAL a cuatro de ellas (en SEP el eje lo decide la MODALIDAD DE ACCESO = propiedad de la ACTIVIDAD; Alemania puede usar la tabla porque en la KMK el Bereich es propiedad del STRAND). Compuertas: 0 → la prueba del frell SE ROMPE («El frell se glomió porque era mucho más zibo que el grobo…» — quita los sustantivos de contenido y NADA rutea) → el objeto es CONTENIDO, no forma → NO «Diversidad textual» (el instrumento se valida solo: bea y author-purpose frelleados SÍ siguen ruteando por marcadores de forma — por eso ELLOS son compuerta 0 y éste no); 1 → literario → «Comprensión de textos literarios»; 2 → sin aparato de búsqueda → no «Búsqueda y manejo de información». Modalidad: el niño LEE (el 🔊 lee el CUENTO; las 3 tarjetas son texto SIN VOZ) → no «Escucha y comprensión de textos». ⚠ NO existe un eje SEP de interpretación — acuñar «Comprensión e interpretación» sería CALCAR a Francia (« Comprendre et interpréter » es un dominio francés REAL, por eso Francia pudo overridear; SEP no separa comprensión de interpretación) → RECHAZAR. Compartir el chip de picture-story es CORRECTO y un agente futuro se lo preguntará: el eje es un ÁREA CURRICULAR, no un peldaño de dificultad — la dificultad la carga el chip de GRADO (1.º vs 3.º); ambas hacen comprensión de un texto literario leído: mismo eje, distinta Fase, distinta profundidad. Que la misma práctica social reaparezca a través de las Fases con demanda creciente ES cómo funciona SEP. // FR CE1: dégager la morale d'une fable = interpréter le sens/le message au-delà du littéral (cycle-2 Lecture et compréhension de l'écrit); NOT « Écouter de l'écrit et comprendre » (maternelle/GS pré-lecteur); "Reading: Literature" has no fr in strand-names.ts; en/de fall through
  'contraction.apostrophe.l-2-2-c': { fr: 'L’orthographe' }, // FR CE1: l'apostrophe d'élision = une marque orthographique (comme la majuscule #32 wally-capital-crane, l'accent, la cédille) — NOT grammaire/lexique; "Language" has no fr in strand-names.ts; en/de fall through
  'field-guide.text-features.1-ri-5': { de: 'Lesen – mit Texten und Medien umgehen', fr: 'Lecture et compréhension de l’écrit', es: 'Búsqueda y manejo de información' }, // ES: SPLIT del chip de comprensión (modelo ALEMÁN, no francés). El fr colapsó PORQUE el francés no tiene dominio de medios/textos aparte; el ESPAÑOL SÍ lo tiene: el ámbito de ESTUDIO del SEP lleva la práctica social «búsqueda y manejo de información», que es literalmente usar el índice/los títulos/el glosario para LOCALIZAR — y abarca fuentes impresas Y DIGITALES (cubre la ronda del menú de forma nativa). Colapsar a «Comprensión de textos informativos» etiquetaría mal: el niño NUNCA tiene que entender qué ES un frell, solo operar el aparato de búsqueda del libro. NO «Estrategias de lectura» (demasiado amplio: predecir/inferir → se traslaparía con comprensión y perdería la especificidad de localizar). ⚠ ESTO AMPLÍA la regla RI/RL es fijada en atlas #78 (que tenía UN eje: modalidad) — regla vigente de 2 compuertas, EN ORDEN: (1) ¿COMPRENDER o LOCALIZAR? localizar → «Búsqueda y manejo de información» (sin importar modalidad); comprender → (2) ¿LEE o ESCUCHA? lee → «Comprensión de textos informativos» (RL: «…de textos literarios»); escucha → «Escucha y comprensión de textos». Aditiva: no altera ningún hermano ya shipeado. 🚩 Candidato de reconciliación futuro (NO relitigar aquí): booker #75 shipeó «Ortografía» pero consultar el diccionario para ENCONTRAR una palabra es localizar. // FR CE1: utiliser les outils d'un texte documentaire (sommaire/glossaire/index/titres) pour trouver une information = stratégie de lecture (« Pratiquer différentes formes de lecture / se repérer dans un texte ») au sein du domaine cycle-2 « Lecture et compréhension de l'écrit »; le français n'a PAS de domaine « manipuler textes et médias » séparé (contrairement à l'allemand « Lesen – mit Texten und Medien umgehen »); = atlas #57 / bea #50; "Reading: Informational Text" has no fr in strand-names.ts; en/de fall through
  'atlas-fact-files.key-detail.ri-k-1': { fr: 'Lecture et compréhension de l’écrit', es: 'Comprensión de textos informativos' }, // FR CP: prélever une information explicite dans un court texte documentaire AFFICHÉ (lu par soi-même) = compréhension LITTÉRALE, attendu cycle-2 « Lecture et compréhension de l'écrit »; NOT « Comprendre et interpréter » (sur-revendique l'inférence — ici récupération verbatim, aucune interprétation); NOT « Écouter de l'écrit et comprendre » (label GS/pré-lecteur — willow/nila/story-spine, texte ENTENDU); "Reading: Informational Text" has no fr in strand-names.ts (would leak EN); en/de fall through. ES (operator-ruled): per-activity override como el fr, NO entry en strand-names.ts — en SEP el eje lo decide la MODALIDAD DE ACCESO al texto (leído vs escuchado), una propiedad de la ACTIVIDAD, no del strand; una entry de tabla etiquetaría mal a los hermanos narrados (nila-pond RI.K.2 = texto LEÍDO EN VOZ ALTA → «Escucha y comprensión de textos»). REGLA para las ~6 RI/RL futuras es: clasificar lee-vs-escucha primero → lee = «Comprensión de textos informativos» (RL: «…de textos literarios»); escucha = «Escucha y comprensión de textos». NO usar «Comprensión lectora»: ya es el chip es de "Reading: Foundational Skills" (fonética) en 5 actividades vivas — colisión + ese mapeo RF está MAL (debería ser «Alfabetización inicial»; comisión aparte, 5 actividades)
  'bea-two-bookshelves.story-or-fact.rl-1-5': { de: 'Lesen – mit Texten und Medien umgehen', fr: 'Lecture et compréhension de l’écrit', es: 'Diversidad textual' }, // ES: NUEVA cubeta. El tell decisivo: la compuerta 2 de la regla pregunta «¿el niño LEE o ESCUCHA EL TEXTO?» — en singular; aquí hay TRES textos de DOS clases y la CLASE es el aprendizaje. NO «Comprensión de textos literarios» (en la mitad de las rondas lo correcto es RECHAZAR el libro literario); NO «Comprensión de textos informativos» (el niño nunca aprende nada de lo que dice el libro de datos); NO «Búsqueda y manejo de información» (la respuesta tentadora + el patrón alemán literal: elegir una fuente SÍ es práctica del ámbito de Estudio, pero solo en las 4 rondas de datos — las 4 de cuento son Literatura pura → cruza AMBOS ámbitos y no pertenece a la práctica social de ninguno; además #80 ya posee ese chip para un acto distinto); NO «Estrategias de lectura» (ya rechazado en #80 por amplio). «Diversidad textual» = el término SEP/NEM vivo de este campo (los textos vienen en clases, cada una con un propósito; el niño arma su repertorio textual desde el acervo), se lee como EJE para una maestra mexicana y es consistente con el léxico de chips. ⚠ AMPLÍA la regla es RI/RL otra vez — regla vigente de 3 COMPUERTAS, EN ORDEN: (0) ¿el objeto del aprendizaje es el TEXTO MISMO (qué tipo es, para qué sirve) o su CONTENIDO? el texto mismo → «Diversidad textual»; el contenido → (1). 🔒 GUARDRAIL de la compuerta 0: solo dispara cuando el niño NO necesita entender lo que el texto DICE — clasifica por pistas de superficie (título/portada/formato); si hace falta entender el contenido, es la compuerta 1 (esto es lo que mantiene a #80 en la 1). La 0 va PRIMERO: puesta al final nunca se alcanzaría — «clasificar por tipo» se colaría en la 1 como un «comprender» difuso y etiquetaría mal. (1) ¿COMPRENDER o LOCALIZAR? localizar → «Búsqueda y manejo de información». (2) ¿LEE o ESCUCHA? lee → «Comprensión de textos informativos» (RL: «…de textos literarios»); escucha → «Escucha y comprensión de textos». ⚠ «Comprensión de textos literarios» queda SIN USAR — reservado para la primera actividad de comprensión de CUENTO real (personajes/trama/mensaje); bea NO la consume. ⚠ NO añadir `es` a la fila `Reading: Literature` de strand-names.ts: etiquetaría mal a bea Y a todo hermano narrado futuro. // FR CP: reconnaître le type d'un livre — distinguer un récit d'un texte documentaire (« reconnaître les principaux genres de textes ») = compétence cycle-2 dès le CP, domaine « Lecture et compréhension de l'écrit »; NOT « Comprendre et interpréter » (= extraire/interpréter le SENS dans un texte; ici on CLASSE le texte par genre depuis les indices de couverture); "Reading: Literature" has no fr in strand-names.ts; en/de fall through
  'two-tales.compare.rl-1-9': { fr: 'Lecture et compréhension de l’écrit', es: 'Comprensión de textos literarios' }, // ES «Comprensión de textos literarios» (STRAND_OVERRIDE por-actividad; NO strand-names.ts): 2 compuertas → (1) comprende (COMPARA dos cuentos, no localiza); (2) LEE (los dos cuentos se muestran como texto + audio-apoyo — precedente story-spine #92). Ambos cuentos literarios → mismo chip que picture-story #82/juniper #85/story-spine #92/marlo #94. // FR CE1: comparer deux histoires (ce qui est pareil / ce qui arrive dans une seule) = mise-en-relation sur indices EXPLICITES (« a perdu… retrouvé » → « Perdu, puis retrouvé »), reconnaissance/classification d'un événement narré, PAS de l'inférence → domaine cycle-2 « Lecture et compréhension de l'écrit » (= bea #50/atlas #57/field-guide #58/author-purpose #61); NOT « Comprendre et interpréter » (retell #49/fable #52/portrait #56); "Reading: Literature" has no fr in strand-names.ts; en/de fall through
  'picture-story.read.rl-k-1': { fr: 'Lecture et compréhension de l’écrit', es: 'Comprensión de textos literarios' }, // ES: **el chip RESERVADO por fin DISPARA.** Recorrido de las 3 compuertas: (0) ¿el TEXTO MISMO o su CONTENIDO? → CONTENIDO (el niño debe entender lo que el cuento DICE; el guardrail es explícito) → NO «Diversidad textual». (1) ¿COMPRENDER o LOCALIZAR? → COMPRENDER; la respuesta tentadora es «localizar» porque quién/qué/dónde parecen recuperación literal — se rechaza: «Búsqueda y manejo de información» es la práctica del ámbito de Estudio de operar el APARATO DE BÚSQUEDA de una fuente (índice/glosario/menú), que posee #80; aquí NO hay aparato ni fuente que navegar y el material es literario. **Tell decisivo: el set incluye ORDEN, POR QUÉ y EMOCIÓN — ninguna es escaneable; cada una exige sostener el cuento completo.** (2) ¿LEE o ESCUCHA? → LEE (ver GRADE_OVERRIDE) → «Comprensión de textos literarios». 1.ª actividad es que aterriza limpia en el ámbito de LITERATURA (atlas #78 y field-guide #80 viven en ESTUDIO) — por eso la cubeta reservada dispara ahora y no antes. ⚠ **Per-activity override; strand-names.ts queda BYTE-IDÉNTICO para es.** El alemán SÍ metió entry de tabla (`Reading: Literature`→de); es NO puede — y produciría un MISLABEL VIVO, no hipotético: el strand `Reading: Literature` ya contiene `story-spine.role.rl-k-3` y `willow-story-corner.compare-tales.rl-k-9`, actividades NARRADAS donde el niño ESCUCHA y sin override es → una entry las estamparía «Comprensión de textos literarios» cuando pertenecen a «Escucha y comprensión de textos» [⚠ SUPERSEDED 2026-07-21 para story-spine: #92 shipeó es LEE=«Comprensión de textos literarios» (operator-ratificado, modalidad de LECTURA — pies mostrados + barajado que obliga a leer); story-spine NO es «Escucha». otto/willow se clasifican por su propia modalidad al construirse] (y también contiene bea #81, protegida por su propio override — lo que prueba que strand ≠ eje). Razón estructural (ratificada en #78): en SEP el eje lo decide la MODALIDAD DE ACCESO, propiedad de la ACTIVIDAD, no del strand; el alemán puede permitirse la tabla porque en KMK el Bereich SÍ es propiedad del strand. El fr hizo exactamente esto. // FR CP: lire une courte histoire en 3 vignettes (texte affiché + audio d'appui) et répondre à des questions de détail clé en LISANT les 3 cartes-réponses = compréhension de l'écrit lu (surface-réponse textuelle → CP, le jumeau RL d'atlas #57 RI); NOT « Écouter de l'écrit et comprendre » (GS/pré-lecteur, réponse non-textuelle — otto #59/story-spine/willow/nila); "Reading: Literature" has no fr in strand-names.ts (would leak EN); en/de fall through
  'pearl-opinion-page.back-it-up.ri-2-8': { fr: 'Lecture et compréhension de l’écrit', es: 'Comprensión de textos argumentativos' }, // ES «Comprensión de textos argumentativos» (STRAND_OVERRIDE por-actividad; NO strand-names.ts) — OPERATOR-RATIFICADO 2026-07-21 (chip es NUEVO). pearl es un texto de OPINIÓN + RAZÓN (argumentativo/persuasivo), NO informativo neutro. Las 2 compuertas dan comprende+lee, PERO la TIPOLOGÍA argumentativa manda: el campo Lenguajes de la NEM clasifica los textos por su función y separa informar de convencer/opinar → NO «Comprensión de textos informativos» (marina #91/atlas #78). DIVERGE de marina/atlas + del alemán (que colapsó lo argumentativo en Sachtexte); precedente: author-purpose #84 ya diverge a «Diversidad textual» cuando la tipología lo exige. // FR CE2: reconnaître la RAISON qui justifie un avis (« parce que » + une info nouvelle) vs la REDITE (répète les mots de l'avis) vs le HORS-SUJET = reconnaissance de la fonction argumentative sur indices EXPLICITES de surface, PAS de l'inférence → domaine cycle-2 « Lecture et compréhension de l'écrit » (= author-purpose #61/atlas #57/field-guide #58/bea #50/two-tales #62); NOT « Comprendre et interpréter » (retell #49/fable #52/portrait #56); "Reading: Informational Text" has no fr in strand-names.ts (would leak EN); en/de fall through
  'wake-up-pip.retell-story.rl-k-2': { fr: 'Comprendre et interpréter', es: 'Comprensión de textos literarios' }, // es 2.º: comprende (reconstruye+recuenta) + LEE (captions mostrados + audio-apoyo, regla story-spine #92) → RL literaria; misma familia RL-es; strand-names.ts NO tocado (RL solo en/de → fuga inglés) // FR CP: reconstruire/raconter un récit dans l'ordre avec les détails clés = compréhension de la structure/l'ordre d'un récit → « Comprendre et interpréter » (cycle 2, Lecture et compréhension de l'écrit); NOT « Écouter de l'écrit et comprendre » (maternelle/GS — misplace le niveau CP); the child REORDERS pictures (n'oralise pas) → comprehension not oral production; "Reading: Literature" has no fr in strand-names.ts
  'story-spine.role.rl-k-3': { fr: 'Écouter de l’écrit et comprendre', es: 'Comprensión de textos literarios' }, // ES «Comprensión de textos literarios» (STRAND_OVERRIDE por-actividad; NO strand-names.ts) — OPERATOR-RATIFICADO 2026-07-21. La maestra corrió la regla RI/RL de 2 compuertas sobre la actividad REAL: (1) comprende (sin aparato de búsqueda); (2) LEE — los pies de las viñetas están MOSTRADOS como texto y el barajado OBLIGA a leer; el 🔊 es apoyo de decodificación → LEE, y es un CUENTO → literario. MISMA modalidad + chip que picture-story #82. ⚠ DIVERGE de — y SUPERSEDE — la nota-adelantada de #82 (:138) que preclasificaba a story-spine como del trío «narrado» → «Escucha»; esa nota fue una conjetura previa a la construcción y la actividad construida es de LECTURA. es/fr divergen COHERENTEMENTE por grado: fr envía story-spine en GS/pré-lecteur (ESCUCHA) mientras es lo envía en 1.º/lector (LEE). otto/willow se clasifican por SU PROPIA modalidad cuando se construyan (NO heredan). // GS/maternelle: repérer début/problème/solution d'un récit lu à voix haute + images = compréhension d'un récit (domaine « Mobiliser le langage », partie « L'écrit ») — the child LISTENS (pré-lecteur); genre-neutral label shared with the RL-comparison (willow) + RI-main-idea (nila) siblings; "Reading: Literature" has no fr in strand-names.ts; en/de fall through to Reading: Literature / Literarische Texte verstehen
  'nila-pond.main-idea-net.ri-k-2': { de: 'Sprechen und Zuhören', fr: 'Écouter de l’écrit et comprendre' }, // GS/maternelle: écouter un texte documentaire narré + dégager l'idée principale = compréhension de l'oral (domaine « Mobiliser le langage », partie « L'écrit ») — the child LISTENS (pré-lecteur), genre-neutral label shared with the RL narrative sibling (willow); "Reading: Informational Text" has no fr in strand-names.ts (would leak EN); en/de fall through to Reading: Informational Text / Sachtexte verstehen
  'opposites.antonyms.k-l-5-b': { de: 'Wortschatz untersuchen', fr: 'Le lexique', es: 'Ampliación del vocabulario' }, // ES: el auto-map «Language» → «Reflexión sobre la lengua» es el eje de GRAMÁTICA; esto tiene CERO gramática — los antónimos son una relación de significado entre palabras = léxico puro, y son posiblemente el miembro MÁS canónico de la familia vocab es registrada (sage #26 · olive #27 · roary #34 · ziggy #35 · fern #76 · jasper #77 · gabby #79 — las siete llevan este chip). La regla RI/RL de 3 compuertas es un instrumento de strands de LECTURA y no aplica aquí. // FR CP: les contraires/antonymes = travail sur le vocabulaire → sous-domaine cycle-2 « Le lexique » (comme ziggy/olive/roary/sage); "Language" has no fr in strand-names.ts (would leak EN); en/de fall through to Language / (de sibling label)
  'otto-picture-book.which-picture.rl-k-7': { fr: 'Écouter de l’écrit et comprendre', es: 'Comprensión de textos literarios' }, // es 1.º: comprende (relaciona oración↔ilustración) + LEE (la oración se muestra como texto + audio-apoyo, regla story-spine #92); cuentos literarios → mismo chip que toda la familia RL-es; strand-names.ts NO tocado (RL solo en/de → fuga inglés) // GS/maternelle: écouter une petite histoire narrée + relier UN moment entendu à son illustration (RL.K.7 lien texte↔image) = compréhension de l'oral (domaine « Mobiliser le langage », partie « L'écrit », attendu GS « établir des relations entre le texte entendu et les illustrations ») — the child LISTENS (pré-lecteur; the written caption is doubled by audio, the answer surface is the image); native 'K' auto-maps to GS (NO grade override); genre-neutral label shared with willow/story-spine/nila; distinct from atlas #57 CP (displayed documentary text READ); "Reading: Literature" has no fr in strand-names.ts; en/de fall through
  'willow-story-corner.compare-tales.rl-k-9': { fr: 'Écouter de l’écrit et comprendre' }, // GS/maternelle: écouter deux récits narrés + comparer les personnages = compréhension de l'oral (domaine « Mobiliser le langage », partie « L'écrit ») — the child LISTENS (pré-lecteur), NOT « Lecture et compréhension de l'écrit » (CP décodage); "Reading: Literature" has no fr in strand-names.ts (would leak EN); en/de fall through to Reading: Literature / Literarische Texte verstehen
  'comparison-creek.river-steer.k-cc-c-7': { fr: 'Découvrir les nombres et leurs utilisations' }, // GS-anchored: the maternelle domain (programmes cycle 1) — the cycle-2 auto-map „Nombres et calcul" reads a year off next to the « Grande section » chip; en/de fall through to Counting & Cardinality / Zählen und Mengen
  'friendship-bridge.compare-balance.k-cc-c-6': { fr: 'Découvrir les nombres et leurs utilisations' }, // GS-anchored (comparison-creek K.CC.C.7 sibling): comparer des collections (plus/moins/autant) par correspondance terme à terme + dénombrer, ≤10, aucune numération à 2 chiffres = attendu de fin de GS (maternelle) → native 'K' auto-maps to GS (NO fr grade override; ⚠ diverges from the de Klasse-1 fan at :90); the maternelle number domain, NOT the cycle-2 « Nombres et calcul » auto-map (a year off beside the GS chip); en/de fall through to Counting & Cardinality / de sibling label
  'wondering-jar.estimate-jar.k-cc-b-5': { fr: 'Découvrir les nombres et leurs utilisations' }, // GS-anchored (mochi/twinsies/necklace precedent): deviner (estimer) une quantité puis dénombrer pour vérifier — attendus de fin de GS, aucune opération (« ton estimation n'est jamais fausse »); la bande numérique à 20 n'est qu'un support d'estimation, pas de la numération → native 'K' auto-maps to GS (NO fr grade override; ⚠ diverges from the de Klasse-1 fan); the maternelle number domain, NOT the cycle-2 « Nombres et calcul » auto-map; en/de fall through
  'mamas-roll-call.numeral-trace.k-cc-b-5': { fr: 'Découvrir les nombres et leurs utilisations' }, // GS-anchored (mochi/twinsies count-out + digby numeral-writing-0-9 precedent): constituer une collection ≤9 + dénombrer + écrire le chiffre 0-9 = attendus de GS (maternelle), calls ≤9 no calcul → native 'K' auto-maps to GS (NO fr grade override; ⚠ diverges from the de Klasse-1 fan at :104); the maternelle number domain, NOT the cycle-2 « Nombres et calcul » auto-map (a year off beside the GS chip); en/de fall through
  'mochi-feast.count-out.k-cc-b-5': { fr: 'Découvrir les nombres et leurs utilisations' }, // GS-anchored (twinsies/necklace/comparison-creek precedent): compter OUT une quantité donnée — constituer une collection dont le cardinal est donné (« donne-moi 5 fraises ») = attendu de GS (« construire le nombre », maternelle), nombres 2-10 sans calcul → native 'K' auto-maps to GS (NO fr grade override; ⚠ diverges from the de Klasse-1 fan); the maternelle number domain, NOT the cycle-2 « Nombres et calcul » auto-map (a year off beside the GS chip); en/de fall through
  'twinsies.count-twin.k-cc-b-5': { fr: 'Découvrir les nombres et leurs utilisations' }, // GS-anchored (necklace/comparison-creek precedent): dénombrer combien, puis constituer une collection de même cardinal (« autant que », collection équipotente) = attendu de fin de GS (« construire le nombre / donner autant que », maternelle) → native 'K' auto-maps to GS (NO fr grade override; ⚠ diverges from the de Klasse-1 fan); the maternelle number domain, NOT the cycle-2 « Nombres et calcul » auto-map (a year off beside the GS chip); en/de fall through
  'necklace.bead-string.k-cc-b-4': { fr: 'Découvrir les nombres et leurs utilisations' }, // GS-anchored (comparison-creek precedent): dénombrer + le cardinal + la CONSERVATION du nombre (le nombre ne change pas quand on cache/secoue/éparpille) = attendu de fin de GS (« construire le nombre », maternelle) → native 'K' auto-maps to GS (NO fr grade override; ⚠ legitimately diverges from the de Klasse-1 fan — FR builds l'invariance en maternelle); the maternelle number domain, NOT the cycle-2 « Nombres et calcul » auto-map (a year off beside the GS chip); en/de fall through
  'star-stitcher.connect-sequence.k-cc-a-2': { fr: 'Découvrir les nombres et leurs utilisations' }, // GS-anchored (comparison-creek/necklace precedent): compter à partir d'un nombre donné (surcomptage) — dire la suite orale à partir de n'importe quel nombre, à ≤18 = attendu de GS (maternelle) → native 'K' auto-maps to GS (NO fr grade override; ⚠ diverges from the de Klasse-1 fan); the maternelle number domain, NOT the cycle-2 « Nombres et calcul » auto-map; NO two-digit/tens content so it does NOT escalate to CP (contrast posy/nesting-pots); en/de fall through
  'parking-tower.place-by-relation.k-g-a-1': { fr: 'Se repérer dans l’espace' }, // GS-anchored: les mots de position (au-dessus/en dessous/à côté/entre) = vocabulaire spatial = « se repérer dans l'espace » = attendu de la maternelle (GS) → native 'K' auto-maps to GS (NO fr grade override; ⚠ diverges from the de Klasse-1 fan); the maternelle spatial-orientation domain, NOT the cycle-2 « Espace et géométrie » auto-map (a year off beside the GS chip); the Geometry-strand analog of the counting siblings' number-domain override; en/de fall through
  'bramble.holds-more.k-md-a-2': { fr: 'Explorer des formes, des grandeurs, des suites organisées' }, // GS-anchored: comparer des contenances qualitativement (lequel contient le plus/le moins/autant) = comparer des grandeurs = attendu de la maternelle → native 'K' auto-maps to GS (NO fr grade override; ⚠ diverges from the de Klasse-1 fan); the maternelle grandeurs domain, NOT the cycle-2 « Grandeurs et mesures » auto-map (a year off beside the GS chip); the Measurement-strand analog of the counting/spatial GS overrides; en/de fall through
  'sage-root-garden.roots.l-2-4-c': { fr: 'Le lexique', es: 'Ampliación del vocabulario' }, // familles de mots / radical = morphologie dérivationnelle → LE LEXIQUE (programmes cycle 2), beside the affix activity; the German sibling files word-families under grammar („Sprache untersuchen") but that placement is DE-specific — en/de fall through to Language / Sprache untersuchen unchanged. MX: familias de palabras = estrategia de vocabulario (L.2.4.c en el cluster Vocabulary de CCSS; SEP la enseña como inferencia de significado) → "Ampliación del vocabulario", MISMO eje que #22 afijos (morfología derivativa); espeja el fr, NO el de
  'sound-boxes.phoneme-position.rf-k-2-d': { de: 'Sprache und Sprachgebrauch untersuchen' }, // Lautanalyse = metalinguistische Analyse der Lautstruktur (KMK); distinct from #102 Reime „Sprechen und Zuhören" (holistic listening)
  'stretch-giraffe.long-short-vowel.rf-1-2-a': { de: 'Sprache und Sprachgebrauch untersuchen' }, // Vokallaenge = analytische Isolation+Klassifikation des betonten Selbstlauts nach dem Merkmal Quantitaet (metasprachlich, wie #106); NOT #102 „Sprechen und Zuhören"; RF hat keinen de-Eintrag in strand-names.ts -> Override setzt den Chip
  'choice-board.read-cvc-word.rf-k-3': { de: 'Lesen – mit Texten und Medien umgehen' }, // Erstlesen = rezeptiv-lesende Kompetenz (KMK Kompetenzbereich Lesen, „über Lesefaehigkeiten verfuegen"); distinct from #106/#107 „untersuchen"; RF hat keinen de-Eintrag in strand-names.ts -> Override setzt den Chip
  'choice-board.onset-rime-blend.rf-k-2-c': { de: 'Lesen – mit Texten und Medien umgehen' }, // Lautsynthese = graphem-gestuetzte Leseanbahnung (Vorstufe von #108); nicht #102 auditives „Zuhören" noch #106/#107 „untersuchen"; RF hat keinen de-Eintrag in strand-names.ts -> Override setzt den Chip
  'domino-two-part.two-syllable.rf-1-3-e': { de: 'Lesen – mit Texten und Medien umgehen' }, // Silbenlesen = silbenweises Erlesen zweisilbiger Woerter (Silbenmethode, rezeptives Lesen); Bridge von #108 CVC zum fluessigen Lesen, distinct from #109 sub-syllabic; RF hat keinen de-Eintrag -> Override setzt den Chip
  'fraction-equiv.same-amount.3-nf-a-3': { de: 'Zahlen und Operationen', fr: 'Nombres et calcul' }, // KMK Mathematik Kompetenzbereich — Bruchteile = Zahlvorstellung; Number&Operations—Fractions hat keinen de/fr-Eintrag in strand-names.ts -> Override setzt Chip+JSON-LD (effStrand routes all surfaces through it; fr = domaine « Nombres et calcul »)
  'fox-forge.fraction.3-nf-a-1': { fr: 'Nombres et calcul' },           // Number&Operations—Fractions has no fr in strand-names.ts (only en+de); effStrand routes the fr chip+JSON-LD through this override → strand-names.ts stays byte-identical. de keeps its strand-names.ts route (Zahlen und Operationen)
  'daisy-plate-stack.plurals.l-k-1-c': { de: 'Sprache und Sprachgebrauch untersuchen' }, // Numerus/Pluralbildung = grammatisch-morphologisch (nicht olive „Wortschatz"=semantisch); Language hat keinen de-Eintrag in strand-names.ts -> Override setzt den Chip
  'coin-stall.money.2-md-c-8': { de: 'Größen und Messen' }, // Geld = KMK-Standardgröße (Rechnen mit Euro und Cent); Measurement&Data hat keinen de-Eintrag in strand-names.ts -> Override setzt den Chip
  'clock-convert.12-24.2-md-c-7': { de: 'Größen und Messen' },          // Zeit ist eine Größe — KMK-Leitidee „Größen und Messen"; „Measurement & Data" auto-map is wrong
  'penny-alphabet-trace.letter-formation.l-k-1-a': { de: 'Schreiben – Schreibfertigkeiten', es: 'Escritura: trazo de letras' }, // es: la mecánica de la ESCRITURA (formar las letras con dirección correcta) → «Escritura: trazo de letras» (espeja el de "Schreiben – Schreibfertigkeiten"); «trazo de letras» = la frase exacta de la maestra MX, distinta de «Ortografía» (spelling) y «Reflexión sobre la lengua» (gramática); el auto-map «Language» sería gramática // Handwriting/letter formation = KMK „Schreiben" (über Schreibfertigkeiten verfügen), NOT Rechtschreibung („Richtig schreiben") and NOT the grammar Bereich
  'mango-animal-groups.collective-nouns.l-2-1-a': { de: 'Wortschatz untersuchen und erweitern', fr: 'Le lexique', es: 'Ampliación del vocabulario' }, // ES: el chip describe lo que el niño HACE = recuperación léxica pura (ve el animal → toca el colectivo), NO análisis gramatical → «Ampliación del vocabulario», MISMO chip que toda la familia vocab es (opposites/olive/roary/ziggy/fern/gabby); el auto-map «Language»→«Reflexión sobre la lengua» es el eje de GRAMÁTICA // Sammelnamen = Wortschatzarbeit, not the grammar Bereich (olive/roary/ziggy precedent); „Language" auto-map would read as „Sprache untersuchen"; FR CE1: nommer une collection = trouver le mot juste = « Le lexique » (facette lexicale; l'accord=cycle-3, hors scope; = antonymes/nuances #27/#34/#35/#46/#53)
  'rhyme-shop.rhyme.rf-k-2-a': { de: 'Sprechen und Zuhören', es: 'Conciencia fonológica' }, // es: el término SEP exacto para el trabajo de rima/sílaba/sonido (aural); el default es de RF en strand-names.ts = «Comprensión lectora» es FALSO para una actividad de rima (no comprende texto) → override por-actividad, misma razón que el de 'Sprechen und Zuhören' // Reime hören = auditive Vorläuferfertigkeit des Lesens; strand-names.ts has no „Reading: Foundational Skills" de entry, so the override sets the chip
  'sock-and-shadow.puppet-speak.sl-k-6': { de: 'Sprechen und Zuhören', fr: 'Langage oral', es: 'Oralidad' }, // es: componente «Oralidad» del campo Lenguajes (NEM Plan 2022) — el término literal del strand oral; strand-names.ts no tiene «Speaking & Listening» es → override por-actividad // first SL activity in DE; strand-names.ts has no „Speaking & Listening" entry, so the override sets the chip (hattie „Richtig schreiben" precedent). FR CP: produire une description orale claire pour se faire comprendre → domaine cycle-2 « Langage oral » (= sunny-side-diner production orale)
  'hattie-whose-is-it.possessive.l-1-1-b': { de: 'Richtig schreiben' }, // Namen-Genitiv-s ohne Apostroph = Apostroph-Rechtschreibung, not the grammar Bereich (wally-capital-crane Nomen-Großschreibung precedent)
  'pim-comma-mail.letter-commas.l-2-2-b': { de: 'Richtig schreiben', fr: 'L’orthographe', es: 'Ortografía y puntuación' }, // ES «Ortografía y puntuación» — REQUERIDO: sin override, "Language" auto-mapea a «Reflexión sobre la lengua» (el eje de GRAMÁTICA). ⚠ La regla es de 3 compuertas es un instrumento de la banda de LECTURA (RI/RL) y NO aplica a una actividad de Language (precedente `opposites`). El chip es el mismo de booker + cleo + wally; el comentario shipeado de cleo da la razón es verbatim: «ES puntuación = ortografía, not "Reflexión sobre la lengua" (grammar)». 🚨 ESTA ACTIVIDAD ES UNA RECONSTRUCCIÓN, NO UNA LOCALIZACIÓN: en español el SALUDO lleva DOS PUNTOS, no coma («Querida abuela:») — RAE, Ortografía §3.4.3, que además declara que la coma ahí es «costumbre anglosajona, que debe evitarse»; la DESPEDIDA sí lleva coma. O sea que el objetivo de en/de/fr es un ERROR en español, y nuestro distractor «Querida abuela,» es literalmente la cadena que las otras tres locales enseñan como correcta. Por eso el slug es NO nombra la coma (de/fr sí lo hacen). ⚠ El mazo es MIXTO (5 saludos «:» / 3 despedidas «,») — lo exige `kindMix` del verificador Y es pedagógicamente necesario: sólo-saludos autorizaría la sobregeneralización «las cartas en español no llevan comas», un error que causaríamos nosotros. ⚠⚠ TRAMPA DEL VERIFICADOR: `verify-letter-comma-core.js:43` asertaba `okHasComma` («the correct form has no comma») = FALSO para el español; sólo no disparaba porque :31 leía `params.rounds` (EN) y nunca `roundsL10n`. Arreglado con una tabla de signo-esperado POR LOCALE (§A.13.62: se arregla QUÉ mide la compuerta, nunca el umbral) — para que «corregir» el español de vuelta a comas sea estructuralmente imposible. // Kommasetzung bei der Anrede = Zeichensetzung/Rechtschreibung → „Richtig schreiben" (cleo/wally precedent), not the grammar Bereich. FR CE2: le placement de la virgule dans la lettre = marque d'écrire-correctement → « L'orthographe » par cohérence de plateforme (cleo #30 = LE MÊME signe, la virgule, déjà sous « L'orthographe »; wally majuscule + hattie possessif idem); une étiquette « La ponctuation » dédiée fragmenterait la carte; "Language" has no fr in strand-names.ts; en/de fall through
  'compound-meaning.predict.l-2-4-d': { de: 'Wortschatz untersuchen' }, // Komposita-Bedeutung erschließen = vocabulary (the L.2.4 family — affix/sage-root precedent), not the grammar Bereich „Sprache untersuchen"
  'inky-book-workshop.author-illustrator.rl-k-6': { de: 'Lesen – mit Texten und Medien umgehen', fr: 'Lecture et compréhension de l’écrit', es: 'Diversidad textual' }, // 🚨 ES «Diversidad textual» — COLOCADA FUERA DE LA REGLA DE 3 COMPUERTAS (ratificado por el operador). ⚠⚠ UN AGENTE FUTURO QUE CORRA LAS COMPUERTAS **NO** REPRODUCIRÁ ESTA COLOCACIÓN — está fuera de ellas A PROPÓSITO. NO LA "CORRIJAS" DE VUELTA. Corridas honestamente, las TRES fallan: (0) ¿el objeto es el TIPO del texto (eso es bea) o su PROPÓSITO (eso es author-purpose)? NINGUNO — el objeto es QUIÉN HIZO EL LIBRO, una TERCERA cosa que la compuerta ratificada no nombra → no dispara; (1) ¿el CONTENIDO? NO — la prueba del frell PASA: sustituye «un cuento sobre un frell que glomea» y las 8 rondas siguen ruteando, porque el blurb es 100% DECORATIVO (la respuesta está entera en el verbo del prompt); (2) ¿aparato de búsqueda? NINGUNO (eso es field-guide). → CAE POR LAS TRES. La regla de 3 compuertas es un instrumento de COMPRENSIÓN LECTORA y la cultura del libro es su LÍMITE CONOCIDO, no un defecto. El chip es correcto igual, por TRES patas independientes: (a) EXCLUSIÓN SEP (~95%, la que carga): autor e ilustrador son indudablemente contenido SEP y la única pregunta es qué categoría los tiene — comprensión está excluida estructuralmente (el niño no aprende nada de lo que el libro DICE) y búsqueda también (sin aparato) → queda la categoría TEXTO-COMO-OBJETO, «Propiedades y tipos de textos», que es lo que este chip renombra. ⚠ La maestra estratificó su propia confianza: la categoría existe ~95%; que SEP archive ahí «las partes del libro» ~95% (la EXCLUSIÓN, la más difícil de falsear); pero la enumeración canónica «portada/título/autor/ilustrador/editorial» sólo ~75-80% → 🚩 FRASEO FIEL, NO TRANSCRIPCIÓN: NO shipear como verbatim. El fallo descansa en la EXCLUSIÓN, no en la enumeración. (b) EL SET DE CHIPS es ESTÁ CERRADO: compuertas 1+2 fuera; Ortografía/Reflexión-sobre-la-lengua/Ampliación-del-vocabulario son absurdas aquí → «Diversidad textual» es la ÚNICA sobreviviente. (c) LA PARTICIÓN de/fr (verificada en código): el par de overrides de+fr de inky es BYTE-IDÉNTICO al de bea y al de author-purpose — las dos actividades que YA están en la cubeta es — mientras que las dos de «Comprensión de textos literarios» (picture-story, juniper) llevan otra firma (de auto-mapea; fr difiere). Alemania y Francia, independientemente, particionan estas cinco igual que es. 🔎 CÓMO CASI SE HIZO MAL — el error fue del COORDINADOR: la maestra ruleó primero que la compuerta 0 SÍ dispara vía una tercera cláusula «cómo se reconoce», afirmando que «está en la compuerta desde el principio». NO EXISTE — el texto shipeado dice «(qué tipo es, para qué sirve)» y la enmienda #84 dice «la FORMA/PROPÓSITO del texto vs su MENSAJE». El coordinador la había metido en su propio brief por error y la maestra la citó de vuelta como doctrina shipeada. Ella verificó la corrección ELLA MISMA («ésa es toda la lección de #84»), la retractó, y encontró la frase que la mata: el :177 ratificado dice «el «(título/portada/formato)» de #81 era la LISTA DE EJEMPLOS de bea, NO LA DEFINICIÓN» → la cláusula inventada no sólo añadía algo ausente: RE-PROMOVÍA justo lo que #84 tumbó. Su tell, que vale guardar: «cuando una regla tiene que crecer para alcanzar tu respuesta, la respuesta suele estar fuera de la regla». POR QUÉ NO SE ENMIENDA: una enmienda redactada en el mismo aliento que el caso que rescata es un RETROFIT — la de #84 fue legítima porque DISCIPLINÓ la compuerta (objeto sobre ubicación-de-la-pista) a costa de más rigor; una cláusula «quién lo hizo» la AFLOJARÍA para alcanzar una conclusión ya elegida. NO 4.ª CUBETA — 4 candidatas rechazadas: «Acceso a la cultura escrita» (frase real del discurso curricular MX pero NO es eje ni tema de reflexión → acuñar); «Apropiación de las culturas a través de la lectura y la escritura» (real, pero es EJE ARTICULADOR = transversal a los 4 campos; ningún otro chip lo es → rompe la taxonomía del muro); «Intercambio de experiencias de lectura» (práctica social real, pero el niño NO intercambia nada → etiqueta falsa); «Propiedades y tipos de textos» (el nombre SEP, EL MÁS HONESTO — pero renombrar ahora CHURNEA bea + author-purpose → declinada; ANOTADA como la conversión correcta si algún día se hace una pasada de renombrado del muro). 📋 TRIGGER PERMANENTE: cuando llegue una SEGUNDA actividad de cultura del libro (editorial, dedicatoria, portada-como-objeto, quién publica), ENTONCES hay dos miembros y se puede nombrar la cubeta honestamente — tercera cláusula genuina, 4.ª cubeta, o el renombrado. Con UN SOLO miembro, no: así fue construida la cubeta (bea la fundó #81; author-purpose entró por enmienda ratificada #84 — se nombró bien sólo al tener un SEGUNDO miembro), y un solo miembro es cómo se acaba con un chip cuyas dos palabras no cuadran con su extensión (la enfermedad que «Diversidad textual» YA tiene). ⚠ NO tocar strand-names.ts (precedente juniper :130): 5 actividades vivas comparten 'Reading: Literature' localizadas de TRES maneras por actividad; una fila es etiquetaría mal a cuatro. // who MAKES a book (Autor/Illustrator) = Buch-/Medienkunde, NOT literary comprehension → overrides the „Reading: Literature"→„Literarische Texte verstehen" auto-map (field-guide/bea/author-purpose precedent). FR: le français n'a PAS de domaine médias séparé → collapse au domaine cycle-2 « Lecture et compréhension de l'écrit » (author-purpose #61/field-guide #58 precedent); "Reading: Literature" has no fr in strand-names.ts (would leak EN)
  'jasper-just-right.real-life.l-1-5-c': { de: 'Wortschatz untersuchen', fr: 'Le lexique', es: 'Ampliación del vocabulario' }, // real-life word use = vocabulary, not the grammar Bereich (fern/olive precedent); FR CP: relier un mot à son usage réel = « Construction du lexique » → « Le lexique » (= antonymes/nuances/noms-collectifs #27/#34/#35/#46/#53/#54); ES: léxico puro, NO la gramática de «Reflexión sobre la lengua» — reusa el chip de la familia vocab (#26/#27/#34/#35/#76)
  'fern-clue-garden.context-clues.l-2-4-a': { de: 'Wortschatz untersuchen', fr: 'Le lexique', es: 'Ampliación del vocabulario' }, // Teekesselwörter/Wortbedeutung = vocabulary, not the grammar Bereich (affix/olive/roary/ziggy precedent); FR CE1: comprendre le sens d'un mot à plusieurs sens grâce au contexte = travail lexical → « Le lexique » (= opposites/roary/olive/ziggy/mango/jasper/gabby/sage); native '2' auto-maps to CE1 (BO 2020 « trouver le sens d'un mot en fonction du contexte » = repère CE1) → NO grade override. ES: palabras con varios significados / significado por contexto = vocabulario, NO gramática («Reflexión sobre la lengua») → «Ampliación del vocabulario», MISMO chip que la familia de vocabulario es (sage #26/olive #27/roary #34/ziggy #35); grado 2.º de primaria auto (manifest "2", NO override — maestra: estrategia léxico-semántica de 2.º, más bajo que booker #75)
  'booker-glossary-desk.guide-words.l-2-4-e': { de: 'Richtig schreiben', es: 'Ortografía y puntuación' }, // Wörterbuch nachschlagen = Rechtschreib-Arbeitstechnik, not Sprache untersuchen (cleo/wally precedent). ES: uso del diccionario / orden alfabético = conocimiento del sistema de escritura y ortografía (herramienta de consulta ortográfica), NOT «Reflexión sobre la lengua» (grammar); reusa el chip establecido de la familia ortografía (cleo #30 / wally #32)
  'gabby-sayings.idioms.l-3-5-a': { de: 'Wortschatz untersuchen', fr: 'Le lexique', es: 'Ampliación del vocabulario' }, // Redewendungen = feste Bedeutungseinheit / Wortbedeutung = vocabulary (roary/fern/olive L.5 precedent), not the grammar Bereich; FR CE2: le sens figuré / les expressions imagées = travail sur le sens des mots/expressions → « Le lexique » (= antonymes/nuances #27/#34/#35/#46); ES: una expresión es una UNIDAD LÉXICA FIJA — su significado se recupera entero, no se calcula desde la gramática → NO «Reflexión sobre la lengua» (el eje de gramática); reusa el chip de la familia vocab es (#26/#27/#34/#35/#76/#77). La maestra pesó la alternativa real (en SEP los refranes y dichos viven en el ámbito de Literatura) y la rechazó: la tarea es recuperación de significado de una frase fija, no apreciación literaria
  'author-purpose.why-wrote.ri-2-6': { de: 'Lesen – mit Texten und Medien umgehen', fr: 'Lecture et compréhension de l’écrit', es: 'Diversidad textual' }, // ES «Diversidad textual» — OBLIGATORIO, no opcional: strand-names.ts 'Reading: Informational Text' sólo tiene en+de → sin override el chip shipea una FUGA EN INGLÉS (§20.10); la pregunta era cuál, no si. Dispara la COMPUERTA 0 de la regla de 3 compuertas, con la enmienda RATIFICADA POR EL OPERADOR: la compuerta 0 gira sobre el OBJETO del aprendizaje (la FORMA/PROPÓSITO del texto vs su MENSAJE), NO sobre la UBICACIÓN de la pista — superficie ≠ paratexto; el «(título/portada/formato)» de #81 era la LISTA DE EJEMPLOS de bea, no la definición. Instrumento = la prueba del frell: sustituye todo sustantivo de contenido por un sinsentido y las 9 rondas SIGUEN ruteando bien (las pistas son el tiempo verbal, «!», el personaje con nombre, las palabras de paso) — la respuesta SOBREVIVE a la destrucción total del contenido = la definición operativa de «no necesita entender lo que el texto DICE». 2.º miembro de la cubeta que abrió bea #81 — y que la maestra de #81 PRENOMBRÓ con esta pregunta exacta («¿Para qué sirve este texto?»); sin la enmienda la cubeta se congela en bea para siempre y jamás recibe al miembro que su propia carta fundacional nombró. Rechazos: compuerta 1 ETIQUETA MAL (6 de 9 rondas no son informativas — una nota-cuento no es un texto informativo; ésa es la MISMA objeción que sacó a de+fr de su Bereich informativo); «Comprensión de textos literarios» la consume picture-story; compuerta 2 no tiene aparato de búsqueda (eso es field-guide). Diverge de de/fr, que colapsaron a su Bereich amplio de lectura porque sus lenguas no tienen el término — el español sí lo tiene y la cubeta está abierta. // Textfunktion/Lesabsicht spanning Textsorten (the activity sorts a story + a how-to alongside facts) → the KMK Bereich, NOT „Sachtexte verstehen" (a story note isn't a Sachtext); field-guide/bea precedent. FR CE2: reconnaître la visée de l'auteur = reconnaissance-classification sur indices de surface (faits / « ! » / mots d'étape), PAS de l'inférence → domaine cycle-2 « Lecture et compréhension de l'écrit » (= bea #50/atlas #57/field-guide #58); NOT « Comprendre et interpréter » (retell #49/fable #52/portrait #56); le français n'a pas de domaine médias séparé; en/de fall through
  'wobble-museum.catch-drift.w-k-2': { fr: 'Écriture' }, // FR: rester dans le thème (repérer la phrase hors-sujet) = compétence d'écriture (produire/réviser un texte cohérent, « maintenir une cohérence thématique ») → domaine cycle-2 « Écriture »; honore le standard W (Writing) + le parallèle DE « Texte verfassen »; "Writing" has no fr in strand-names.ts (would leak EN); en/de fall through to Writing / Texte verfassen
  'marina-headline-desk.main-topic.ri-2-2': { fr: 'Lecture et compréhension de l’écrit', es: 'Comprensión de textos informativos' }, // ES «Comprensión de textos informativos» (STRAND_OVERRIDE por-actividad; NO strand-names.ts): regla RI/RL es de 2 compuertas (atlas #78/field-guide #80) → (1) COMPRENDE (sin índice/glosario/menú = sin aparato de búsqueda) → no «Búsqueda y manejo de información»; (2) LEE (el texto se muestra + las tarjetas se leen; el 🔊 es apoyo de decodificación) → no «Escucha…». Mismo chip que atlas #78 (RI, comprende+lee). // FR CE2: identifier le sujet principal d'un texte documentaire = synthèse de surface sur l'écrit (PAS de l'inférence narrative) → domaine cycle-2 « Lecture et compréhension de l'écrit » (= atlas #57/field-guide #58/author-purpose #61/pearl, la frontière RI-vs-RL); NOT « Comprendre et interpréter » (réservé au RL narratif); "Reading: Informational Text" has no fr in strand-names.ts (would leak EN); en/de fall through
  'linc-fact-chain.connect.ri-k-3': { fr: 'Comprendre et interpréter', es: 'Comprensión de textos informativos' }, // ES «Comprensión de textos informativos» (STRAND_OVERRIDE por-actividad; NO strand-names.ts): 2 compuertas → (1) comprende (RELACIONA dos hechos, no localiza — sin aparato de búsqueda); (2) LEE (hechos mostrados como texto + audio-apoyo). Hechos informativos/expositivos, NO argumentativos (≠ pearl #93) NO localizar (≠ field-guide #80) → mismo chip que atlas #78 / marina #91. // FR CE1: relier deux faits par un lien séquentiel/causal = établir une relation / faire une inférence (cause à effet) → « Comprendre et interpréter » (= le précédent chaîne-causale wake-up-pip #49 « comprendre l'enchaînement / la relation de cause à effet »); le strand suit la COMPÉTENCE (inférence-vs-littéral), pas seulement le label RI — NOT « Lecture et compréhension de l'écrit » (le seau RI de récupération littérale); "Reading: Informational Text" has no fr in strand-names.ts; en/de fall through
  'point-of-view.who-told.rl-1-6': { fr: 'Comprendre et interpréter', es: 'Comprensión de textos literarios' }, // ES — override OBLIGATORIO: 'Reading: Literature' sólo tiene en+de en strand-names.ts → sin es el chip shipea una FUGA EN INGLÉS. ⚠ NO añadir fila a strand-names.ts (precedente juniper #85): CINCO actividades vivas comparten ese strand, ya localizadas de TRES maneras por actividad → una fila etiquetaría mal a cuatro. Las 3 compuertas, corridas sobre el texto VERBATIM: (0) ¿el objeto es el TEXTO MISMO (qué tipo es, para qué sirve) o su CONTENIDO? → CONTENIDO (no es ni el tipo ni el propósito del texto) → no dispara; (1) ¿COMPRENDER o LOCALIZAR? → COMPRENDER (sin aparato de búsqueda); (2) ¿LEE o ESCUCHA? → LEE (`speak(` = 0; la oración es texto mudo) → rama RL → «Comprensión de textos literarios». Corroborado por la PRUEBA DE PARTICIÓN (#86): la firma de strand de esta actividad es IDÉNTICA a la de juniper y picture-story — SIN override de (auto-mapea) + un override fr — y su fr es «Comprendre et interpréter», el MISMO valor que carga juniper; el propio comentario fr la agrupa con «tous les frères RL d'inférence narrative … fable #52» (= juniper). Ambas shipean es «Comprensión de textos literarios». 📋 REFINAMIENTO DE DOCTRINA (anotado, sin actuar): la PRUEBA DEL FRELL, tal como está redactada, da un FALSO POSITIVO aquí — sustituir los SUSTANTIVOS (barco/ola/pez) sigue ruteando, porque el mensaje de este texto vive en sus PREDICADOS («puntito», «muy lejos»). La prueba SUB-LEE cualquier texto cargado por adjetivos/adverbios; lo corrige el GUARDRAIL de la compuerta 0 («solo dispara cuando el niño NO necesita entender lo que el texto DICE» — aquí sí lo necesita). // FR CE1: identifier de quel point de vue une phrase est racontée = interpréter la perspective narrative → « Comprendre et interpréter » (= tous les frères RL d'inférence narrative retell #49/fable #52/trait #56/wake-up-pip); "Reading: Literature" has no fr in strand-names.ts (would leak EN); en/de fall through
  'graph-it.bar-graph.2-md-d-10': { de: 'Daten und Häufigkeit', fr: 'Organisation et gestion de données', es: 'Análisis de datos' },   // bar graph = data, not Größen / Grandeurs et mesures / Magnitudes y medida (ES: eje Análisis de datos, Aprendizajes clave)
  'line-plot.read.2-md-d-9': { de: 'Daten und Häufigkeit', fr: 'Organisation et gestion de données', es: 'Análisis de datos' },        // line plot of measured lengths = data, not Größen / Grandeurs et mesures / Magnitudes y medida (ES: eje "Análisis de datos", igual que graph-it — la habilidad evaluada es leer frecuencias, no medir)
  'hoppers-number-line.jump-sums.2-md-b-6': { de: 'Zahlen und Rechnen im Zehnersystem', fr: 'Nombres et calcul', es: 'Sentido numérico' }, // add/sub on a number line = arithmetic, not Größen / Grandeurs et mesures / Magnitudes y medida (ES: eje "Sentido numérico" — la recta numérica es solo el modelo; igual que el skip-count Hopper #3, NO "Número, álgebra y variación")
  'patchwork-meadow.tile.3-md-c-6': { de: 'Raum und Form', es: 'Forma, espacio y medida' },        // Flächeninhalt durch Auslegen = Raum und Form (sibling of mosaic-menders); es área/superficie = geometría-medida → «Forma, espacio y medida» (espeja mosaic-menders/mending-fences es, NO «Magnitudes y medida»)
  'digby-number-trace.numeral-formation.k-cc-a-3': { de: 'Zahlen und Operationen', fr: 'Découvrir les nombres et leurs utilisations' },  // numeral WRITING = Zahldarstellung (NOT the reading sibling pips-round's „Zählen und Mengen"). FR GS-anchored (necklace/twinsies/mochi/wondering-jar precedent): écrire/tracer les chiffres 0-9 = attendu de GS (« écrire les nombres avec les chiffres », le geste graphique du chiffre, plage 0-9 = maternelle) → native 'K' auto-maps to GS (NO fr grade override; ⚠ diverges from the de Klasse-1 fan); the maternelle number domain, NOT the cycle-2 « Nombres et calcul » auto-map (a year off beside the GS chip), and NOT « Écriture » (that's for LETTER formation — here the CCSS strand is the math C&C domain); en/de fall through
  'olive-kind-of.category-attribute.l-1-5-b': { de: 'Wortschatz untersuchen', fr: 'Le lexique', es: 'Ampliación del vocabulario' }, // Oberbegriffe = Wortschatzarbeit, not Grammatik („Sprache untersuchen"); FR catégoriser/le mot générique = LE LEXIQUE (vocabulaire), beside affix/sage; en falls through to Language. MX: categorizar = trabajo de vocabulario, MISMO eje que #22 afijos + #26 familias de palabras → "Ampliación del vocabulario", NO gramática
  'cleo-packing-list.series-commas.l-1-2-b': { de: 'Richtig schreiben', es: 'Ortografía y puntuación' }, // Zeichensetzung = orthography/Rechtschreiben, not „Sprache untersuchen"; ES puntuación = ortografía, not "Reflexión sobre la lengua" (grammar)
  'wally-capital-crane.special-names.l-2-2-a': { de: 'Richtig schreiben', fr: 'L’orthographe', es: 'Ortografía y puntuación' }, // Nomen-Großschreibung = orthography/Rechtschreiben; FR: la majuscule d'un nom propre = orthographe lexicale (divergence from #30 ponctuation → étude de la langue); ES mayúsculas = ortografía (same label as #30 comma), NOT "Reflexión sobre la lengua"
  'sunny-side-diner.compound-order.l-k-1-f': { fr: 'Langage oral' }, // FR: écouter la commande + la redire en jeu de rôle = production orale → « Langage oral » (composante cycle 2), NOT the grammar Bereich; the child PRODUCES the sentence, doesn't analyse it. en falls through to Language
  'snippy.letter-formation.l-k-1-a': { fr: 'Écriture' }, // FR: former/tracer les lettres = le geste graphique/geste d'écriture → domaine « Écriture » (calque le frère allemand « Schreiben »), NOT « Étude de la langue » (grammaire). en falls through to Language
  'rusty-yesterday.irregular-past.l-2-1-d': { fr: 'La conjugaison' },      // FR: le passé composé = conjugaison, its own named strand at l'école élémentaire (finer than the « Étude de la langue » umbrella; DE stays default « Sprache untersuchen »)
  'roary-roar-meter.shades.l-2-5-b': { de: 'Wortschatz untersuchen', fr: 'Le lexique', es: 'Ampliación del vocabulario' }, // Bedeutungsnuancen = vocabulary work, not grammar; FR: les nuances de sens = le lexique; ES matices de significado = léxico (like #22 affix / #26 sage / #27 olive), NOT "Reflexión sobre la lengua"
  'ziggy-odd-one-out.category.l-1-5-a': { de: 'Wortschatz untersuchen', fr: 'Le lexique', es: 'Ampliación del vocabulario' }, // Wortfelder/Kategorien = vocabulary work, not grammar; FR: trouver l'intrus = le lexique; ES categorización/campos semánticos = léxico (like #22/#26/#27/#34), NOT "Reflexión sobre la lengua"
  'halfway-harbors.nearest.3-nbt-a-1': { de: 'Zahlen und Operationen' },  // Runden = KMK Leitidee „Zahlen und Operationen", broader than the auto-localized „…Zehnersystem"
  'echo-grove.match-the-rune.3-oa-a-1': { de: 'Zahlen und Operationen' }, // Multiplikation = KMK Leitidee „Zahlen und Operationen"; literal „Rechnen und algebraisches Denken" reads wrong (Sekundarstufe term)
  'maple-bakery.share.3-oa-a-2': { de: 'Zahlen und Operationen' },        // Division = same KMK Leitidee „Zahlen und Operationen" (pairs with multiplication)
  'winter-piles.draw-partition.2-oa-c-4': { de: 'Zahlen und Operationen' }, // Punktefeld/wiederholte Addition = foundation of multiplication, same Leitidee
  'comet-kangaroo.tens-hundreds.2-nbt-b-8': { de: 'Zahlen und Operationen' }, // Stellenwert/Orientierung im Tausenderraum lives inside KMK Leitidee „Zahlen und Operationen" (not the base-ten calque)
  'mending-fences.mend-board.3-md-d-8': { de: 'Raum und Form', es: 'Forma, espacio y medida' },  // Umfang+Fläche = geometric figure property (KMK „Raum und Form"), like the area activity — not the free-measured Längen of „Größen und Messen". ES: el perímetro es una propiedad GEOMÉTRICA de la figura (el contorno) → eje "Forma, espacio y medida" (fusiona geometría+medida), NO el auto "Magnitudes y medida" (reservado a magnitudes puras); espeja mosaic-menders área es
  'track-repair.count-to-120.1-nbt-a-1': { de: 'Zahlen und Operationen' }, // Orientierung am Zahlenstrahl / Zahlvorstellung lives inside KMK Leitidee „Zahlen und Operationen" (not the base-ten calque)
  'gus-snack-cart.within-100.2-nbt-b-5': { de: 'Zahlen und Operationen' }, // add/sub within 100 = Rechnen/Operationen → KMK Leitidee „Zahlen und Operationen" (not the base-ten calque)
  'bos-berry-pantry.slingshot-tens.1-nbt-b-2': { de: 'Zahlen und Operationen' }, // Stellenwert (Zehner+Einer lesen) lives inside KMK Leitidee „Zahlen und Operationen" (not the base-ten calque)
  'vet-diagnosis.word-problems.1-oa-a-1': { de: 'Zahlen und Operationen' }, // Sachaufgaben add/sub = KMK Leitidee „Zahlen und Operationen"; „algebraisches Denken" is Sek-I framing, not a Primarstufe Leitidee
  'chuffer.rail-decompose.k-oa-a-3': { de: 'Zahlen und Operationen' }, // Zahlzerlegung = KMK Leitidee „Zahlen und Operationen" (OA calque „algebraisches Denken" is Sek-I)
  'clunks-lost-lunch.make-total.k-oa-a-3': { de: 'Zahlen und Operationen' }, // make-a-total = same KMK Leitidee (mirrors chuffer; OA calque is Sek-I)
  'ten-tank.ten-frame-tank.k-nbt-a-1': { de: 'Zahlen und Operationen' }, // teen numbers as Zehner+Einer (Bündeln) lives inside KMK Leitidee „Zahlen und Operationen" (not the base-ten calque)
  'fix-it-corner.missing-part.1-oa-d-8': { de: 'Zahlen und Operationen' }, // missing-number in add/sub = KMK Leitidee „Zahlen und Operationen" (OA calque „algebraisches Denken" is Sek-I; mirrors chuffer/clunks)
};
function effStrand(row: ActivityRow, locale: string): string {
  return (STRAND_OVERRIDE[row.id] && STRAND_OVERRIDE[row.id][locale]) || localizeStrand(row.alignment.strand, locale);
}
import {
  resolveActivitySlug,
  listActivitySitemapEntries,
  hreflangAlternatesForRow,
  listRelatedActivities,
  otherLocalesForRow,
  ActivityRow,
} from '@/lib/activities';
import BreadcrumbTrail from '@/components/breadcrumbs/BreadcrumbTrail';
import { ActivityIframe } from '@/components/activities/ActivityIframe';
import ActivityShareButton from '@/components/activities/ActivityShareButton';
import TopicFaq from '@/components/catalog/TopicFaq';
import { CANONICAL_HOST, canonicalUrl, localePath } from '@/lib/seo/url';
import { buildBreadcrumbSchema, BreadcrumbCrumb } from '@/lib/seo/breadcrumb-schema';
import { localizeStrand } from '@/lib/seo/strand-names';
import { getHreflangCode } from '@/lib/seo/hreflang';
import { getActivityContent, gradeToAgeRange } from '@/lib/seo/activity-content';
import { LOCALE_NAMES, SupportedLocale } from '@/config/locales';
import { ogLocaleMap } from '@/lib/schema-generator';

// Internal-link-mesh strip headings (Part 2). Per-locale nav labels, inlined
// here following the ACTIVITIES_SECTION_LABEL precedent (single-consumer
// chrome). `{code}` in PRACTICE_HEADING is interpolated with the CC code.
const RELATED_HEADING: Record<string, string> = {
  en: 'More activities to try',
  de: 'Weitere Aufgaben zum Ausprobieren',
  es: 'Más actividades para probar',
  fr: 'Plus d\'activités à essayer',
  it: 'Altre attività da provare',
  pt: 'Mais atividades para experimentar',
  nl: 'Meer activiteiten om te proberen',
  sv: 'Fler aktiviteter att prova',
  da: 'Flere aktiviteter at prøve',
  no: 'Flere aktiviteter å prøve',
  fi: 'Lisää tehtäviä kokeiltavaksi',
};

const PRACTICE_HEADING: Record<string, string> = {
  en: 'Practice this standard',
  de: 'Diesen Standard üben',
  es: 'Practica este estándar',
  fr: 'Travailler ce standard',
  it: 'Esercita questo standard',
  pt: 'Pratique este padrão',
  nl: 'Oefen deze standaard',
  sv: 'Öva på denna standard',
  da: 'Øv denne standard',
  no: 'Øv på denne standarden',
  fi: 'Harjoittele tätä standardia',
};

const PRACTICE_LINK: Record<string, string> = {
  en: 'See all {code} activities',
  de: 'Alle {code}-Aufgaben ansehen',
  es: 'Ver todas las actividades de {code}',
  fr: 'Voir toutes les activités {code}',
  it: 'Vedi tutte le attività {code}',
  pt: 'Ver todas as atividades de {code}',
  nl: 'Bekijk alle {code}-activiteiten',
  sv: 'Se alla {code}-aktiviteter',
  da: 'Se alle {code}-aktiviteter',
  no: 'Se alle {code}-aktiviteter',
  fi: 'Katso kaikki {code}-tehtävät',
};

const OTHER_LANGS_HEADING: Record<string, string> = {
  en: 'Available in other languages',
  de: 'In anderen Sprachen verfügbar',
  es: 'Disponible en otros idiomas',
  fr: 'Disponible dans d\'autres langues',
  it: 'Disponibile in altre lingue',
  pt: 'Disponível em outros idiomas',
  nl: 'Beschikbaar in andere talen',
  sv: 'Tillgängligt på andra språk',
  da: 'Tilgængelig på andre sprog',
  no: 'Tilgjengelig på andre språk',
  fi: 'Saatavilla muilla kielillä',
};

// "Activities" section label per locale — used for the middle breadcrumb
// crumb on individual activity landing pages. Same string as the title of
// /<locale>/activities/. Inlined here (not next-intl) since it's read by
// one consumer; promote to a message file when a second consumer appears.
const ACTIVITIES_SECTION_LABEL: Record<string, string> = {
  en: 'Activities',
  de: 'Aufgaben',
  es: 'Actividades',
  fr: 'Activités',
  it: 'Attività',
  pt: 'Atividades',
  nl: 'Activiteiten',
  sv: 'Aktiviteter',
  da: 'Aktiviteter',
  no: 'Aktiviteter',
  fi: 'Tehtävät',
};

/**
 * Activity landing page route — one URL per (manifest row × locale).
 *
 * Mirrors the topic-page pattern:
 *   - ISR with revalidate=3600
 *   - generateStaticParams for build-time static generation
 *   - generateMetadata for per-locale title/description/hreflang
 *   - SSR'd content + iframe-embedded mini-tool
 *
 * Common Core code is metadata only — never in the URL slug (native-language
 * slugs across all 11 locales per CLAUDE.md §17.4), never visible to kids.
 * Surfaced in a subtle "Grade K · Counting & Cardinality · K.CC.B.4" chip
 * on the landing page (teacher-facing) and in JSON-LD educationalAlignment
 * for SEO / structured-data search.
 */
export const revalidate = 3600;

// SEO URLs go through `canonicalUrl()` / `localePath()` from `@/lib/seo/url`
// to enforce the no-trailing-slash invariant. `BASE_URL` retained as alias
// of `CANONICAL_HOST` for the activity-sitemap-entries helper which builds
// hreflang URLs from a base argument.
const BASE_URL = CANONICAL_HOST;

/* Which per-(activity, locale) og:image composites exist (generated by
   scripts/generate-activity-og-images.js → /mini-tools/og/<id>.<locale>.png,
   1200×630 PNG per §17.8.19). Same file-existence gate as the index's
   loadPreviewIds: read once per server lifetime; candidate paths cover local
   dev + the release model (public/mini-tools is symlinked to served storage).
   Missing → callers fall back to the generic og-homepage.png. */
let _ogSet: Set<string> | null = null;
function loadOgIds(): Set<string> {
  if (_ogSet) return _ogSet;
  const cwd = process.cwd();
  const candidates = [
    path.join(cwd, 'public', 'mini-tools', 'og'),
    path.join(cwd, '..', 'public', 'mini-tools', 'og'),
    path.join(cwd, 'frontend', 'public', 'mini-tools', 'og'),
  ];
  const set = new Set<string>();
  for (const dir of candidates) {
    try {
      for (const f of fs.readdirSync(dir)) {
        if (f.endsWith('.png')) set.add(f.slice(0, -4));
      }
      if (set.size) break;
    } catch {
      /* try next candidate */
    }
  }
  _ogSet = set;
  return set;
}

/* Per-activity og:image URL for the given locale (locale composite → en
   composite → null; null = caller uses the og-homepage.png fallback). */
function activityOgImage(rowId: string, locale: string): string | null {
  const s = loadOgIds();
  if (s.has(`${rowId}.${locale}`)) return `${CANONICAL_HOST}/mini-tools/og/${rowId}.${locale}.png`;
  if (s.has(`${rowId}.en`)) return `${CANONICAL_HOST}/mini-tools/og/${rowId}.en.png`;
  return null;
}

interface PageParams {
  locale: string;
  slug: string;
}

function isTopicLocale(l: string): l is TopicEnabledLocale {
  return (TOPIC_ENABLED_LOCALES as readonly string[]).includes(l);
}

export async function generateStaticParams(): Promise<PageParams[]> {
  try {
    const entries = await listActivitySitemapEntries();
    return entries.map(({ locale, slug }) => ({ locale, slug }));
  } catch (err) {
    console.warn('[activities/[slug]] generateStaticParams failed:', (err as Error).message);
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: PageParams;
}): Promise<Metadata> {
  if (!isTopicLocale(params.locale)) return {};
  const row = await resolveActivitySlug(params.slug, params.locale);
  if (!row) return {};
  const canonical = canonicalUrl(localePath(params.locale, 'activities', params.slug));
  const ogUrl = activityOgImage(row.id, params.locale) || `${CANONICAL_HOST}/og-homepage.png`;
  const ogAlt = row.page_title[params.locale] || row.page_title.en || 'LessonCraftStudio — K-3 worksheets in 11 languages';
  return {
    title: row.page_title[params.locale],
    description: row.page_intro[params.locale],
    alternates: {
      canonical,
      languages: await hreflangAlternatesForRow(row, BASE_URL),
    },
    openGraph: {
      title: row.page_title[params.locale],
      description: row.page_intro[params.locale],
      url: canonical,
      siteName: 'LessonCraftStudio',
      // og:locale / og:locale:alternate kept consistent with the hreflang set:
      // the alternates mirror otherLocalesForRow (the same honest-filtered sibling
      // locales emitted by hreflangAlternatesForRow), mapped to OG locale codes.
      locale: ogLocaleMap[params.locale] || params.locale,
      alternateLocale: (await otherLocalesForRow(row, params.locale)).map(
        ({ locale }) => ogLocaleMap[locale] || locale,
      ),
      type: 'article',
      images: [
        {
          url: ogUrl,
          width: 1200,
          height: 630,
          type: 'image/png',
          alt: ogAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: row.page_title[params.locale],
      description: row.page_intro[params.locale],
      images: [{ url: ogUrl, alt: ogAlt }],
    },
    robots: INDEXABLE_ROBOTS,
  };
}

// Per-locale curriculum-framework NAME for the human-/crawler-facing
// `educationalFramework`. The internal CCSS code (row.alignment.code) stays the
// machine anchor in `targetName` + the /standards/<code> hub. EN keeps Common
// Core; non-EN cite each country's national framework (§A.13.49). Names only —
// no national code (operator decision 2026-05-31).
const EDUCATIONAL_FRAMEWORK_BY_LOCALE: Record<string, string> = {
  en: 'Common Core State Standards',
  de: 'Lehrplan',
  fr: 'Programmes officiels',
  es: 'Planes y programas de estudio (SEP)',
  pt: 'BNCC',
  it: 'Indicazioni nazionali',
  nl: 'SLO-kerndoelen',
  sv: 'Lgr22',
  da: 'Fælles Mål',
  no: 'LK20',
  fi: 'OPS 2014',
};

function jsonLdFor(row: ActivityRow, locale: string): string {
  const canonical = canonicalUrl(localePath(locale, 'activities', row.slug[locale]));
  const grade = effGrade(row, locale);
  const ageRange = gradeToAgeRange(grade);
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'LearningResource',
    name: row.page_title[locale],
    description: row.page_intro[locale],
    inLanguage: locale,
    learningResourceType: 'Interactive activity',
    educationalUse: 'interactive activity',
    educationalLevel: grade,
    teaches: effStrand(row, locale),
    isAccessibleForFree: true,
    image: activityOgImage(row.id, locale) || `${CANONICAL_HOST}/og-homepage.png`,
    educationalAlignment: {
      '@type': 'AlignmentObject',
      alignmentType: 'educationalSubject',
      targetName: row.alignment.code,
      targetDescription: effStrand(row, locale),
      educationalFramework: EDUCATIONAL_FRAMEWORK_BY_LOCALE[locale] || 'Common Core State Standards',
    },
    audience: {
      '@type': 'EducationalAudience',
      educationalRole: 'student',
    },
    creator: {
      '@type': 'Organization',
      '@id': ORGANIZATION_ID,
      name: 'LessonCraftStudio',
      url: CANONICAL_HOST,
    },
    publisher: { '@id': ORGANIZATION_ID },
    url: canonical,
  };
  if (ageRange) data.typicalAgeRange = ageRange;
  return JSON.stringify(data);
}

export default async function ActivityPage({ params }: { params: PageParams }) {
  if (!isTopicLocale(params.locale)) notFound();
  const row = await resolveActivitySlug(params.slug, params.locale);
  if (!row) notFound();

  /* Teacher-chip grade label: reuse the existing seo.educational_level.*
     table (complete in all 11 locales). The manifest's alignment.grade is
     a literal "K"/"1"/"2"/"3"; lookup the localized phrase via the map.
     The CC code (RF.K.2.B and siblings) stays English — it's a CCSS
     identifier; the strand NAME is localized via localizeStrand (below,
     §A.13.56 / curriculum-domain fix). */
  const tSeo = await getTranslations({ locale: params.locale, namespace: 'seo' });
  const effectiveGrade = effGrade(row, params.locale);
  const gradeKey = GRADE_KEY_MAP[effectiveGrade];
  const localizedGrade = gradeKey
    ? tSeo(`educational_level.${gradeKey}`)
    : `Grade ${effectiveGrade}`;

  // v7.5 cache buster: bump on any mini tools/*-activity.html change so
  // browsers fetch fresh wrapper HTML on every navigation. Defends
  // against iOS Safari + Android WebView page-cache/bfcache quirks that
  // can ignore upstream Cache-Control: max-age=0 under back-forward
  // restoration. Same discipline as §A.13.42 lcs-shell.css?v=N bump
  // applied here to the iframe-loaded wrapper URL (the only un-busted
  // link in the activity-page → mini-tool chain). The wrapper reads
  // only `activity` / `lang` / `embed` params; `v` is harmless to it.
  const ACTIVITY_WRAPPER_VERSION = '9.335';

  const iframeSrc =
    `/mini-tools/${row.tool}.html?v=${ACTIVITY_WRAPPER_VERSION}` +
    `&activity=${encodeURIComponent(row.id)}` +
    `&lang=${encodeURIComponent(params.locale)}` +
    `&embed=1`;

  const sectionLabel =
    ACTIVITIES_SECTION_LABEL[params.locale] ?? ACTIVITIES_SECTION_LABEL.en;

  // Crawlable editorial body (3-tier resolve, mirrors topic-prose). Returns
  // null for locales without an activity-content file (non-EN until Part 3),
  // in which case the page keeps its intro-only shape — never English prose
  // on a non-EN page.
  const content = await getActivityContent(params.locale, row);

  // Internal-link mesh (Part 2) — ships for all 11 locales (navigation).
  const related = await listRelatedActivities(row, params.locale);
  const otherLangs = await otherLocalesForRow(row, params.locale);
  const standardsHref = localePath(params.locale, 'standards', row.alignment.code);
  const relatedHeading = RELATED_HEADING[params.locale] ?? RELATED_HEADING.en;
  // Localized CCSS strand name (R4 / §20.8) — the raw English domain name
  // (e.g. "Counting & Cardinality") was leaking into the chip + FAQ on non-EN
  // pages. Feeds the visible chip + TopicFaq (FAQPage JSON-LD) below.
  const localizedStrand = effStrand(row, params.locale);

  // BreadcrumbList JSON-LD (R12) — mirrors the visible BreadcrumbTrail
  // (Home › Activities › title).
  const tBreadcrumb = await getTranslations({ locale: params.locale, namespace: 'topicPage.breadcrumb' });
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: tBreadcrumb('home'), path: localePath(params.locale) },
    { name: sectionLabel, path: localePath(params.locale, 'activities') },
    { name: row.page_title[params.locale], path: localePath(params.locale, 'activities', params.slug) },
  ] as BreadcrumbCrumb[]);
  const practiceHeading = PRACTICE_HEADING[params.locale] ?? PRACTICE_HEADING.en;
  const practiceLink = (PRACTICE_LINK[params.locale] ?? PRACTICE_LINK.en).replace(
    '{code}',
    row.alignment.code,
  );
  const otherLangsHeading =
    OTHER_LANGS_HEADING[params.locale] ?? OTHER_LANGS_HEADING.en;

  // v7 cascade (post-K.NBT.A.1 prototype approval): all activities render
  // the operator-locked sage-field layout. The v6.x prototype gate
  // (`isTenFramePrototype` check on alignment.code) was removed once the
  // design was approved. Card height = 2/3 of viewport via the inline
  // <style> below + the iframe-side rules now in lcs-shell.css scoped to
  // .lcs-app.activity. Engine-specific cell/tile scaling stays per-wrapper.
  return (
    <main className="bg-cream-50 pt-4 pb-4 px-4 md:pt-6 md:pb-6 md:px-8 lg:pt-8">
      <article className="mx-auto">
        <BreadcrumbTrail
          locale={params.locale}
          trail={[
            { href: `/${params.locale}/activities/`, label: sectionLabel },
            { label: row.page_title[params.locale] },
          ]}
        />
        <section
          className="lcs-prototype-play-area relative overflow-hidden mt-3 md:mt-4 rounded-2xl md:rounded-3xl bg-[#DBE7DF] px-4 pt-5 pb-12 md:px-8 md:pt-7 md:pb-16 shadow-[0_2px_8px_rgba(20,30,28,0.08),_0_28px_64px_rgba(20,30,28,0.12)]"
          aria-label={row.page_title[params.locale]}
        >
          {/* Adult chrome — tightened, sits ON the sage field. Header
              feels integrated with the play area rather than stacked
              above it. */}
          <header className="relative z-10 mb-4 md:mb-5 text-center">
            <h1 className="font-display font-semibold text-base md:text-lg text-teal-800 leading-tight mb-0.5">
              {row.page_title[params.locale]}
            </h1>
            <p className="hidden lg:block text-xs text-ink-600/70 max-w-2xl mx-auto leading-snug mb-2">
              {row.page_intro[params.locale]}
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-cream-100/80 text-teal-800 text-xs font-medium backdrop-blur-sm">
              <span>{localizedGrade}</span>
              <span className="text-teal-800/40">·</span>
              <span className="hidden sm:inline">{localizedStrand}</span>
              <span className="hidden sm:inline text-teal-800/40">·</span>
              {/* Code is clickable: navigates to the per-standard landing
                  page (/[locale]/standards/<code>) which aggregates every
                  activity aligned to this code. Internal-linking surface
                  per external SEO audit 2026-05-27. */}
              <Link
                href={`/${params.locale}/standards/${row.alignment.code}`}
                className="font-mono underline decoration-dotted underline-offset-2 hover:decoration-solid"
              >
                {row.alignment.code}
              </Link>
            </div>
            {/* Subscriber share — mint a clean student-play link + QR for this
                activity. Gated client-side (signed-out → sign-up, no-plan →
                pricing); the API is the real gate. */}
            <div>
              <ActivityShareButton
                activityId={row.id}
                locale={params.locale}
                title={row.page_title[params.locale]}
              />
            </div>
          </header>

          {/* Desktop keeps the 66.67vh floor (fills the wide card nicely).
              MOBILE FIT (mobile-QA standard §A.13.55, 2026-06-02): the old
              85vh mobile floor forced the iframe far taller than short
              activities, leaving a big blank band below the card (audit
              emptyBand 150-264px on phones). Lower to a small px floor so
              ActivityIframe's postMessage auto-resize (§20.3) sizes the
              iframe to the card's real content height; pairs with
              lcs-shell.css dropping the card's mobile min-height. */}
          <style dangerouslySetInnerHTML={{ __html:
            '.lcs-prototype-iframe-wrapper iframe { min-height: 66.67vh !important; }' +
            '@media (max-width: 767px) { .lcs-prototype-iframe-wrapper iframe { min-height: 360px !important; } }'
          }} />
          <div className="lcs-prototype-iframe-wrapper relative z-10">
            <ActivityIframe src={iframeSrc} title={row.page_title[params.locale]} />
          </div>

          {/* Soft cream wave at the base of the field — gentle "foam"
              that gives the field life without becoming a graphic.
              Absolutely positioned over the field's bottom padding;
              pointer-events:none so it never blocks the iframe. */}
          <svg
            aria-hidden="true"
            viewBox="0 0 1200 80"
            preserveAspectRatio="none"
            className="absolute bottom-0 left-0 right-0 w-full h-[60px] md:h-[72px] pointer-events-none"
          >
            <path
              d="M0,50 C200,15 380,75 600,40 C820,5 1000,70 1200,35 L1200,80 L0,80 Z"
              fill="#FCFAF4"
              opacity="0.62"
            />
            <path
              d="M0,60 C220,30 420,80 640,52 C860,24 1040,76 1200,50 L1200,80 L0,80 Z"
              fill="#FCFAF4"
              opacity="0.45"
            />
          </svg>
        </section>

        {/* Crawlable editorial body below the play surface. The interactive
            engine lives in an iframe (invisible to crawlers), so this SSR'd
            prose is the activity's SEO surface: an always-rendered intro
            paragraph, then the 3-tier content sections (when available for
            the locale), then a 3-item FAQ with FAQPage JSON-LD. */}
        <section className="activity-detail mx-auto max-w-2xl mt-8 px-1">
          <p className="text-base text-ink-700 leading-relaxed">
            {row.page_intro[params.locale]}
          </p>

          {content && (
            <div className="mt-8 space-y-8">
              {content.proseParagraphs.length > 0 && (
                <div>
                  <h2 className="font-display text-xl md:text-2xl font-semibold text-ink-900 mb-3">
                    {content.labels.about}
                  </h2>
                  {content.proseParagraphs.map((para, i) => (
                    <p
                      key={i}
                      className={
                        i === 0
                          ? 'text-base text-ink-700 leading-relaxed'
                          : 'text-base text-ink-700 leading-relaxed mt-3'
                      }
                    >
                      {para}
                    </p>
                  ))}
                </div>
              )}

              {content.whatsInside.length > 0 && (
                <div>
                  <h2 className="font-display text-xl md:text-2xl font-semibold text-ink-900 mb-3">
                    {content.labels.whatsInside}
                  </h2>
                  <ul className="list-disc pl-5 space-y-1 text-base text-ink-700 leading-relaxed">
                    {content.whatsInside.map((it, i) => (
                      <li key={i}>{it}</li>
                    ))}
                  </ul>
                </div>
              )}

              {content.howToPlay.length > 0 && (
                <div>
                  <h2 className="font-display text-xl md:text-2xl font-semibold text-ink-900 mb-3">
                    {content.labels.howToPlay}
                  </h2>
                  {content.howToPlay.map((para, i) => (
                    <p
                      key={i}
                      className={
                        i === 0
                          ? 'text-base text-ink-700 leading-relaxed'
                          : 'text-base text-ink-700 leading-relaxed mt-2'
                      }
                    >
                      {para}
                    </p>
                  ))}
                </div>
              )}

              {content.practices.length > 0 && (
                <div>
                  <h2 className="font-display text-xl md:text-2xl font-semibold text-ink-900 mb-3">
                    {content.labels.practices}
                  </h2>
                  <ul className="list-disc pl-5 space-y-1 text-base text-ink-700 leading-relaxed">
                    {content.practices.map((it, i) => (
                      <li key={i}>{it}</li>
                    ))}
                  </ul>
                </div>
              )}

              {content.learningGoals.length > 0 && (
                <div>
                  <h2 className="font-display text-xl md:text-2xl font-semibold text-ink-900 mb-3">
                    {content.labels.learningGoals}
                  </h2>
                  {content.learningGoals.map((para, i) => (
                    <p
                      key={i}
                      className={
                        i === 0
                          ? 'text-base text-ink-700 leading-relaxed'
                          : 'text-base text-ink-700 leading-relaxed mt-2'
                      }
                    >
                      {para}
                    </p>
                  ))}
                </div>
              )}
            </div>
          )}
        </section>
        <div className="mx-auto max-w-2xl px-1">
          <TopicFaq
            locale={params.locale}
            variant="activity"
            title={row.page_title[params.locale]}
            grade={localizedGrade}
            strand={localizedStrand}
            pageUrl={canonicalUrl(localePath(params.locale, 'activities', params.slug))}
          />
        </div>

        {/* Internal-link mesh (Part 2) — crawlable <a> lists tying every
            activity to its siblings, its Common Core standard hub, and its
            own translations. Real anchors (not JS buttons) so they feed the
            internal link graph. Ships for all 11 locales. */}
        <div className="mx-auto max-w-2xl px-1 mt-10 space-y-10">
          {/* Practice this standard — explicit crawl-bait anchor to the hub. */}
          <section aria-labelledby="activity-practice-heading">
            <h2
              id="activity-practice-heading"
              className="font-display text-xl md:text-2xl font-semibold text-ink-900 mb-3"
            >
              {practiceHeading}
            </h2>
            <Link
              href={standardsHref}
              className="inline-flex items-center gap-1 text-teal-700 hover:text-teal-800 font-semibold underline decoration-2 underline-offset-2"
            >
              {practiceLink}
              <span aria-hidden="true">→</span>
            </Link>
          </section>

          {/* Related activities — same strand, then same grade. */}
          {related.length > 0 && (
            <section aria-labelledby="activity-related-heading">
              <h2
                id="activity-related-heading"
                className="font-display text-xl md:text-2xl font-semibold text-ink-900 mb-4"
              >
                {relatedHeading}
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {related.map((r) => {
                  const rTitle = r.page_title[params.locale];
                  const rSlug = r.slug[params.locale];
                  if (!rTitle || !rSlug) return null;
                  return (
                    <li key={r.id}>
                      <Link
                        href={localePath(params.locale, 'activities', rSlug)}
                        className="flex items-center gap-2 rounded-2xl bg-cream-50 hover:bg-teal-50 px-4 py-3 text-teal-800 font-medium shadow-sm transition-colors"
                      >
                        <span className="font-mono text-xs text-teal-500">
                          {r.alignment.code}
                        </span>
                        <span>{rTitle}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          )}

          {/* Available in other languages — visible hreflang siblings. */}
          {otherLangs.length > 0 && (
            <section aria-labelledby="activity-langs-heading">
              <h2
                id="activity-langs-heading"
                className="font-display text-xl md:text-2xl font-semibold text-ink-900 mb-3"
              >
                {otherLangsHeading}
              </h2>
              <ul className="flex flex-wrap gap-2">
                {otherLangs.map(({ locale, href }) => (
                  <li key={locale}>
                    <a
                      href={href}
                      hrefLang={getHreflangCode(locale)}
                      className="inline-flex items-center px-3 py-1.5 rounded-full bg-cream-50 hover:bg-teal-50 text-teal-800 text-sm transition-colors"
                    >
                      {LOCALE_NAMES[locale as SupportedLocale] ?? locale}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* LearningResource structured data — plain <script> so it is present
            in the server-rendered HTML (crawlable without JS execution),
            unlike next/script's afterInteractive injection. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdFor(row, params.locale) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        <PublisherJsonLd locale={params.locale} />
      </article>
    </main>
  );
}
