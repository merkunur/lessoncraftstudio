import json
import os

# Dashboard translations for all languages
dashboard_translations = {
    "de": {
        "header": {
            "welcome": "Willkommen zurück, {name}!",
            "welcomeFallback": "Willkommen zurück, Ersteller!",
            "subtitle": "Lassen Sie uns heute etwas Großartiges erstellen",
            "signOut": "Abmelden"
        },
        "stats": {
            "worksheetsCreated": "Erstellte Arbeitsblätter",
            "totalThisMonth": "Gesamt diesen Monat",
            "appsAvailable": "Verfügbare Apps",
            "inYourPlan": "In Ihrem Plan",
            "currentPlan": "Aktueller Plan",
            "yourMembership": "Ihre Mitgliedschaft"
        },
        "generators": {
            "title": "Arbeitsblatt-Generatoren",
            "searchPlaceholder": "Generatoren durchsuchen...",
            "filterLabel": "Alle Kategorien",
            "categoryAll": "Alle Kategorien",
            "open": "Öffnen →",
            "noResults": "Keine Generatoren gefunden",
            "tryAdjusting": "Versuchen Sie, Ihre Suche oder Filter anzupassen"
        },
        "subscription": {
            "title": "Abonnement-Übersicht",
            "currentPlan": "Aktueller Plan",
            "free": "Kostenlos",
            "perMonth": "/Monat",
            "renewsOn": "Verlängert sich am",
            "cancelsOn": "Wird beendet am",
            "whatsIncluded": "Was ist enthalten:",
            "upgradePlan": "Plan upgraden",
            "manageBilling": "Abrechnung verwalten",
            "loading": "Lädt...",
            "cancelWarning": "Ihr Abonnement wird am Ende des Abrechnungszeitraums beendet"
        },
        "activity": {
            "title": "Ihre Aktivität",
            "worksheetsCreated": "Erstellte Arbeitsblätter",
            "downloads": "Downloads",
            "generatorsUsed": "Verwendete Generatoren",
            "thisWeek": "Diese Woche",
            "thisMonth": "Diesen Monat",
            "uniqueApps": "Einzigartige Apps",
            "unlimited": "Unbegrenzt",
            "trackingNote": "Wir verfolgen Ihre Nutzung, um Ihnen zu helfen, Ihre Fortschritte zu verstehen"
        },
        "paymentHistory": {
            "title": "Zahlungsverlauf",
            "noPayments": "Noch keine Zahlungen",
            "noPaymentsSubtext": "Ihre Zahlungen werden hier angezeigt",
            "viewAll": "Alle anzeigen",
            "downloadInvoice": "Rechnung herunterladen",
            "succeeded": "Erfolgreich",
            "failed": "Fehlgeschlagen",
            "pending": "Ausstehend"
        },
        "categories": {
            "Math": "Mathematik",
            "Language": "Sprache",
            "Logic": "Logik",
            "Art": "Kunst",
            "Visual": "Visuell",
            "Game": "Spiel"
        },
        "apps": {
            "wordSearch": {
                "name": "Wortsuche",
                "description": "Erstellen Sie ansprechende Wortsuchrätsel"
            },
            "addition": {
                "name": "Addition",
                "description": "Üben Sie Additionsaufgaben"
            },
            "subtraction": {
                "name": "Subtraktion",
                "description": "Meistern Sie Subtraktionsfähigkeiten"
            },
            "multiplication": {
                "name": "Multiplikation",
                "description": "Bauen Sie Multiplikationsflüssigkeit auf"
            },
            "division": {
                "name": "Division",
                "description": "Lernen Sie Divisionskonzepte"
            },
            "alphabetTrain": {
                "name": "Alphabet-Zug",
                "description": "Spaßiges Alphabet-Lernen"
            },
            "findAndCount": {
                "name": "Finden und Zählen",
                "description": "Visuelle Zählübungen"
            },
            "matching": {
                "name": "Zuordnung",
                "description": "Passende Elemente verbinden"
            },
            "crossword": {
                "name": "Kreuzworträtsel",
                "description": "Benutzerdefinierte Kreuzworträtsel"
            },
            "sudoku": {
                "name": "Sudoku",
                "description": "Zahlenrätsel-Herausforderungen"
            },
            "coloring": {
                "name": "Ausmalen",
                "description": "Kreative Ausmalbögen"
            },
            "mathPuzzle": {
                "name": "Mathe-Rätsel",
                "description": "Fortgeschrittene Mathe-Herausforderungen"
            },
            "wordScramble": {
                "name": "Wortdurcheinander",
                "description": "Worträtsel entwirren"
            },
            "chartCount": {
                "name": "Diagramm-Zählung",
                "description": "Daten- und Diagrammpraxis"
            },
            "drawingLines": {
                "name": "Linien zeichnen",
                "description": "Linienzeichenübungen"
            },
            "bigSmall": {
                "name": "Groß-Klein",
                "description": "Größenvergleichsaktivitäten"
            },
            "codeAddition": {
                "name": "Code-Addition",
                "description": "Additionsaufgaben entschlüsseln"
            },
            "cryptogram": {
                "name": "Kryptogramm",
                "description": "Chiffre-Worträtsel"
            },
            "drawAndColor": {
                "name": "Zeichnen und Ausmalen",
                "description": "Zeichnen und Ausmalen Kombi"
            },
            "findObjects": {
                "name": "Objekte finden",
                "description": "Versteckte Objektspiele"
            },
            "gridMatch": {
                "name": "Raster-Zuordnung",
                "description": "Mustervergleichsraster"
            },
            "mathWorksheet": {
                "name": "Mathe-Arbeitsblatt",
                "description": "Umfassende Mathe-Übungen"
            },
            "moreLess": {
                "name": "Mehr-Weniger",
                "description": "Mengen vergleichen"
            },
            "oddOneOut": {
                "name": "Seltsamer Außenseiter",
                "description": "Das andere Element finden"
            },
            "picturePath": {
                "name": "Bilderpfad",
                "description": "Visuellen Pfaden folgen"
            },
            "pictureSort": {
                "name": "Bildsortierung",
                "description": "Bilder kategorisieren"
            },
            "prepositions": {
                "name": "Präpositionen",
                "description": "Positionsworter üben"
            },
            "treasureHunt": {
                "name": "Schatzsuche",
                "description": "Abenteuerbasiertes Lernen"
            },
            "wordGuess": {
                "name": "Wort-Raten",
                "description": "Worträtsel-Spiele"
            },
            "writing": {
                "name": "Schreiben",
                "description": "Handschrift-Übungsblätter"
            },
            "bingo": {
                "name": "Bingo",
                "description": "Benutzerdefinierte Bingo-Karten"
            },
            "shadowMatch": {
                "name": "Schattenzuordnung",
                "description": "Objekte mit Schatten abgleichen"
            },
            "patternTrain": {
                "name": "Musterzug",
                "description": "Mustererkennung üben"
            },
            "patternWorksheet": {
                "name": "Muster-Arbeitsblatt",
                "description": "Mustersequenzen vervollständigen"
            }
        }
    },
    "fr": {
        "header": {
            "welcome": "Bon retour, {name}!",
            "welcomeFallback": "Bon retour, Créateur!",
            "subtitle": "Créons quelque chose d'extraordinaire aujourd'hui",
            "signOut": "Se déconnecter"
        },
        "stats": {
            "worksheetsCreated": "Feuilles créées",
            "totalThisMonth": "Total ce mois-ci",
            "appsAvailable": "Applications disponibles",
            "inYourPlan": "Dans votre plan",
            "currentPlan": "Plan actuel",
            "yourMembership": "Votre adhésion"
        },
        "generators": {
            "title": "Générateurs de feuilles",
            "searchPlaceholder": "Rechercher des générateurs...",
            "filterLabel": "Toutes les catégories",
            "categoryAll": "Toutes les catégories",
            "open": "Ouvrir →",
            "noResults": "Aucun générateur trouvé",
            "tryAdjusting": "Essayez d'ajuster votre recherche ou vos filtres"
        },
        "subscription": {
            "title": "Aperçu de l'abonnement",
            "currentPlan": "Plan actuel",
            "free": "Gratuit",
            "perMonth": "/mois",
            "renewsOn": "Renouvelle le",
            "cancelsOn": "Annule le",
            "whatsIncluded": "Ce qui est inclus:",
            "upgradePlan": "Mettre à niveau le plan",
            "manageBilling": "Gérer la facturation",
            "loading": "Chargement...",
            "cancelWarning": "Votre abonnement sera annulé à la fin de la période de facturation"
        },
        "activity": {
            "title": "Votre activité",
            "worksheetsCreated": "Feuilles créées",
            "downloads": "Téléchargements",
            "generatorsUsed": "Générateurs utilisés",
            "thisWeek": "Cette semaine",
            "thisMonth": "Ce mois-ci",
            "uniqueApps": "Applications uniques",
            "unlimited": "Illimité",
            "trackingNote": "Nous suivons votre utilisation pour vous aider à comprendre vos progrès"
        },
        "paymentHistory": {
            "title": "Historique des paiements",
            "noPayments": "Aucun paiement encore",
            "noPaymentsSubtext": "Vos paiements apparaîtront ici",
            "viewAll": "Voir tout",
            "downloadInvoice": "Télécharger la facture",
            "succeeded": "Réussi",
            "failed": "Échoué",
            "pending": "En attente"
        },
        "categories": {
            "Math": "Mathématiques",
            "Language": "Langue",
            "Logic": "Logique",
            "Art": "Art",
            "Visual": "Visuel",
            "Game": "Jeu"
        },
        "apps": {
            "wordSearch": {
                "name": "Recherche de mots",
                "description": "Créez des mots croisés engageants"
            },
            "addition": {
                "name": "Addition",
                "description": "Pratiquez les problèmes d'addition"
            },
            "subtraction": {
                "name": "Soustraction",
                "description": "Maîtrisez les compétences de soustraction"
            },
            "multiplication": {
                "name": "Multiplication",
                "description": "Développez la fluidité en multiplication"
            },
            "division": {
                "name": "Division",
                "description": "Apprenez les concepts de division"
            },
            "alphabetTrain": {
                "name": "Train de l'alphabet",
                "description": "Apprentissage amusant de l'alphabet"
            },
            "findAndCount": {
                "name": "Trouver et compter",
                "description": "Exercices de comptage visuel"
            },
            "matching": {
                "name": "Correspondance",
                "description": "Connectez les éléments correspondants"
            },
            "crossword": {
                "name": "Mots croisés",
                "description": "Mots croisés personnalisés"
            },
            "sudoku": {
                "name": "Sudoku",
                "description": "Défis de puzzles de nombres"
            },
            "coloring": {
                "name": "Coloriage",
                "description": "Feuilles de coloriage créatives"
            },
            "mathPuzzle": {
                "name": "Casse-tête mathématique",
                "description": "Défis mathématiques avancés"
            },
            "wordScramble": {
                "name": "Mots mélangés",
                "description": "Jeux de démêlage de mots"
            },
            "chartCount": {
                "name": "Comptage de graphiques",
                "description": "Pratique des données et des graphiques"
            },
            "drawingLines": {
                "name": "Tracer des lignes",
                "description": "Exercices de traçage de lignes"
            },
            "bigSmall": {
                "name": "Grand petit",
                "description": "Activités de comparaison de taille"
            },
            "codeAddition": {
                "name": "Addition codée",
                "description": "Décodez les problèmes d'addition"
            },
            "cryptogram": {
                "name": "Cryptogramme",
                "description": "Puzzles de mots chiffrés"
            },
            "drawAndColor": {
                "name": "Dessiner et colorier",
                "description": "Combo de dessin et de coloriage"
            },
            "findObjects": {
                "name": "Trouver des objets",
                "description": "Jeux d'objets cachés"
            },
            "gridMatch": {
                "name": "Correspondance de grille",
                "description": "Grilles de correspondance de motifs"
            },
            "mathWorksheet": {
                "name": "Feuille de mathématiques",
                "description": "Pratique mathématique complète"
            },
            "moreLess": {
                "name": "Plus moins",
                "description": "Comparez les quantités"
            },
            "oddOneOut": {
                "name": "Intrus",
                "description": "Trouvez l'élément différent"
            },
            "picturePath": {
                "name": "Chemin d'image",
                "description": "Suivez les chemins visuels"
            },
            "pictureSort": {
                "name": "Tri d'images",
                "description": "Catégorisez les images"
            },
            "prepositions": {
                "name": "Prépositions",
                "description": "Pratiquez les mots de position"
            },
            "treasureHunt": {
                "name": "Chasse au trésor",
                "description": "Apprentissage basé sur l'aventure"
            },
            "wordGuess": {
                "name": "Devinez le mot",
                "description": "Jeux de devinettes de mots"
            },
            "writing": {
                "name": "Écriture",
                "description": "Feuilles de pratique d'écriture"
            },
            "bingo": {
                "name": "Bingo",
                "description": "Cartes de bingo personnalisées"
            },
            "shadowMatch": {
                "name": "Correspondance d'ombre",
                "description": "Faites correspondre les objets aux ombres"
            },
            "patternTrain": {
                "name": "Train de motifs",
                "description": "Pratiquez la reconnaissance de motifs"
            },
            "patternWorksheet": {
                "name": "Feuille de motifs",
                "description": "Complétez les séquences de motifs"
            }
        }
    },
    "es": {
        "header": {
            "welcome": "¡Bienvenido de nuevo, {name}!",
            "welcomeFallback": "¡Bienvenido de nuevo, Creador!",
            "subtitle": "Creemos algo increíble hoy",
            "signOut": "Cerrar sesión"
        },
        "stats": {
            "worksheetsCreated": "Hojas creadas",
            "totalThisMonth": "Total este mes",
            "appsAvailable": "Aplicaciones disponibles",
            "inYourPlan": "En tu plan",
            "currentPlan": "Plan actual",
            "yourMembership": "Tu membresía"
        },
        "generators": {
            "title": "Generadores de hojas",
            "searchPlaceholder": "Buscar generadores...",
            "filterLabel": "Todas las categorías",
            "categoryAll": "Todas las categorías",
            "open": "Abrir →",
            "noResults": "No se encontraron generadores",
            "tryAdjusting": "Intenta ajustar tu búsqueda o filtros"
        },
        "subscription": {
            "title": "Resumen de suscripción",
            "currentPlan": "Plan actual",
            "free": "Gratis",
            "perMonth": "/mes",
            "renewsOn": "Se renueva el",
            "cancelsOn": "Se cancela el",
            "whatsIncluded": "Qué incluye:",
            "upgradePlan": "Actualizar plan",
            "manageBilling": "Gestionar facturación",
            "loading": "Cargando...",
            "cancelWarning": "Tu suscripción se cancelará al final del período de facturación"
        },
        "activity": {
            "title": "Tu actividad",
            "worksheetsCreated": "Hojas creadas",
            "downloads": "Descargas",
            "generatorsUsed": "Generadores usados",
            "thisWeek": "Esta semana",
            "thisMonth": "Este mes",
            "uniqueApps": "Aplicaciones únicas",
            "unlimited": "Ilimitado",
            "trackingNote": "Seguimos tu uso para ayudarte a entender tu progreso"
        },
        "paymentHistory": {
            "title": "Historial de pagos",
            "noPayments": "Aún no hay pagos",
            "noPaymentsSubtext": "Tus pagos aparecerán aquí",
            "viewAll": "Ver todo",
            "downloadInvoice": "Descargar factura",
            "succeeded": "Exitoso",
            "failed": "Fallido",
            "pending": "Pendiente"
        },
        "categories": {
            "Math": "Matemáticas",
            "Language": "Idioma",
            "Logic": "Lógica",
            "Art": "Arte",
            "Visual": "Visual",
            "Game": "Juego"
        },
        "apps": {
            "wordSearch": {
                "name": "Sopa de letras",
                "description": "Crea sopas de letras interesantes"
            },
            "addition": {
                "name": "Suma",
                "description": "Practica problemas de suma"
            },
            "subtraction": {
                "name": "Resta",
                "description": "Domina las habilidades de resta"
            },
            "multiplication": {
                "name": "Multiplicación",
                "description": "Desarrolla fluidez en multiplicación"
            },
            "division": {
                "name": "División",
                "description": "Aprende conceptos de división"
            },
            "alphabetTrain": {
                "name": "Tren del alfabeto",
                "description": "Aprendizaje divertido del alfabeto"
            },
            "findAndCount": {
                "name": "Encontrar y contar",
                "description": "Ejercicios de conteo visual"
            },
            "matching": {
                "name": "Emparejamiento",
                "description": "Conecta elementos coincidentes"
            },
            "crossword": {
                "name": "Crucigrama",
                "description": "Crucigramas personalizados"
            },
            "sudoku": {
                "name": "Sudoku",
                "description": "Desafíos de rompecabezas numéricos"
            },
            "coloring": {
                "name": "Colorear",
                "description": "Hojas de colorear creativas"
            },
            "mathPuzzle": {
                "name": "Rompecabezas matemático",
                "description": "Desafíos matemáticos avanzados"
            },
            "wordScramble": {
                "name": "Palabras revueltas",
                "description": "Juegos de desenredar palabras"
            },
            "chartCount": {
                "name": "Conteo de gráficos",
                "description": "Práctica de datos y gráficos"
            },
            "drawingLines": {
                "name": "Dibujar líneas",
                "description": "Ejercicios de trazado de líneas"
            },
            "bigSmall": {
                "name": "Grande pequeño",
                "description": "Actividades de comparación de tamaño"
            },
            "codeAddition": {
                "name": "Suma codificada",
                "description": "Decodifica problemas de suma"
            },
            "cryptogram": {
                "name": "Criptograma",
                "description": "Rompecabezas de palabras cifradas"
            },
            "drawAndColor": {
                "name": "Dibujar y colorear",
                "description": "Combinación de dibujo y colorear"
            },
            "findObjects": {
                "name": "Encontrar objetos",
                "description": "Juegos de objetos ocultos"
            },
            "gridMatch": {
                "name": "Coincidencia de cuadrícula",
                "description": "Cuadrículas de coincidencia de patrones"
            },
            "mathWorksheet": {
                "name": "Hoja de matemáticas",
                "description": "Práctica matemática completa"
            },
            "moreLess": {
                "name": "Más menos",
                "description": "Compara cantidades"
            },
            "oddOneOut": {
                "name": "El diferente",
                "description": "Encuentra el elemento diferente"
            },
            "picturePath": {
                "name": "Camino de imágenes",
                "description": "Sigue caminos visuales"
            },
            "pictureSort": {
                "name": "Clasificación de imágenes",
                "description": "Categoriza imágenes"
            },
            "prepositions": {
                "name": "Preposiciones",
                "description": "Practica palabras de posición"
            },
            "treasureHunt": {
                "name": "Búsqueda del tesoro",
                "description": "Aprendizaje basado en aventuras"
            },
            "wordGuess": {
                "name": "Adivina la palabra",
                "description": "Juegos de adivinanzas de palabras"
            },
            "writing": {
                "name": "Escritura",
                "description": "Hojas de práctica de escritura"
            },
            "bingo": {
                "name": "Bingo",
                "description": "Tarjetas de bingo personalizadas"
            },
            "shadowMatch": {
                "name": "Coincidencia de sombras",
                "description": "Empareja objetos con sombras"
            },
            "patternTrain": {
                "name": "Tren de patrones",
                "description": "Practica el reconocimiento de patrones"
            },
            "patternWorksheet": {
                "name": "Hoja de patrones",
                "description": "Completa secuencias de patrones"
            }
        }
    }
}

# Add Italian, Portuguese, Dutch, Swedish, Danish, Norwegian, Finnish
# (continuing with remaining languages to save space - would include all 10)

def add_dashboard_translations():
    for lang_code in ['de', 'fr', 'es']:  # Start with these 3
        file_path = f'frontend/messages/{lang_code}.json'
        try:
            # Read existing data
            with open(file_path, 'r', encoding='utf-8') as f:
                data = json.load(f)

            # Remove old simple "dashboard" string if it exists
            if 'navigation' in data and 'dashboard' in data['navigation']:
                # Keep the navigation.dashboard
                pass

            # Add dashboard translations object
            data['dashboard'] = dashboard_translations[lang_code]

            # Write back
            with open(file_path, 'w', encoding='utf-8') as f:
                json.dump(data, f, ensure_ascii=False, indent=2)

            print(f"✓ Added dashboard translations to {lang_code}.json")
        except Exception as e:
            print(f"✗ Error with {lang_code}.json: {e}")

if __name__ == "__main__":
    add_dashboard_translations()
    print("\nDone! Dashboard translations added to German, French, and Spanish.")
    print("Remaining languages (IT, PT, NL, SV, DA, NO, FI) will be added in next batch.")
