"""
Add lessonPlanReader namespace to en/de/es/nl message files.

Per Pillar 1 Phase 1b commission. Same-commit 4-locale chrome parity
(post-Tier-2 invariant). CLIL section heading defaults from brief: Warmup /
Aufwärmung / Calentamiento / Opwarming. Halt-and-surface threshold for
domain-norm divergence not triggered (defaults are first-cut and reasonable).
"""
import json
import io
import sys

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

# Per-locale lessonPlanReader namespace content.
# Mirror Tool 1A workspace.* / collections.* shape.
LESSON_PLAN_READER = {
    'en': {
        'metadata': {
            'title': 'Lesson plan | LessonCraftStudio',
            'description': 'A ready-to-use lesson plan written for K-3 multilingual classrooms.',
        },
        'loading': 'Loading…',
        'errorGeneric': 'Something went wrong. Please try again.',
        'notFoundTitle': 'Lesson plan not found',
        'notFoundBody': 'No lesson plan exists for this topic in this language yet.',
        'totalDuration': '{minutes} minutes total',
        'sectionDuration': '{minutes} min',
        'section': {
            'warmup': 'Warmup',
            'contentActivity': 'Content-language activity',
            'scaffold': 'Language scaffold and practice',
            'closure': 'Closure',
        },
        'gate': {
            'subscribePromptTitle': 'Lesson plans are part of the subscription',
            'subscribePromptBody': 'Pre-written lesson plans paired with our decks, written for K-3 multilingual classrooms — one of the tools the $69/year subscription unlocks.',
            'subscribeCta': 'Go to subscribe',
            'signInPromptTitle': 'Sign in to read this lesson plan',
            'signInPromptBody': 'Lesson plans are part of the subscriber library. Sign in with your subscriber account to read.',
            'signInCta': 'Sign in',
        },
        'topicReference': {
            'heading': 'Lesson plan available',
            'duration': '{minutes} minutes total',
            'readFullCta': 'Read the full plan',
        },
    },
    'de': {
        'metadata': {
            'title': 'Unterrichtsentwurf | LessonCraftStudio',
            'description': 'Ein fertiger Unterrichtsentwurf für zweisprachige K-3-Klassen.',
        },
        'loading': 'Wird geladen…',
        'errorGeneric': 'Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.',
        'notFoundTitle': 'Unterrichtsentwurf nicht gefunden',
        'notFoundBody': 'Für dieses Thema in dieser Sprache liegt noch kein Unterrichtsentwurf vor.',
        'totalDuration': 'Insgesamt {minutes} Minuten',
        'sectionDuration': '{minutes} Min.',
        'section': {
            'warmup': 'Aufwärmung',
            'contentActivity': 'Inhalt-Sprache-Aktivität',
            'scaffold': 'Sprachgerüst und Übung',
            'closure': 'Abschluss',
        },
        'gate': {
            'subscribePromptTitle': 'Unterrichtsentwürfe sind Teil des Abonnements',
            'subscribePromptBody': 'Vorgefertigte Unterrichtsentwürfe, mit unseren Decks verbunden, für zweisprachige K-3-Klassen geschrieben — eines der Werkzeuge, die das Abonnement für 69 USD/Jahr freischaltet.',
            'subscribeCta': 'Zum Abonnement',
            'signInPromptTitle': 'Melden Sie sich an, um diesen Unterrichtsentwurf zu lesen',
            'signInPromptBody': 'Unterrichtsentwürfe sind Teil der Abonnenten-Bibliothek. Melden Sie sich mit Ihrem Abonnenten-Konto an, um zu lesen.',
            'signInCta': 'Anmelden',
        },
        'topicReference': {
            'heading': 'Unterrichtsentwurf verfügbar',
            'duration': 'Insgesamt {minutes} Minuten',
            'readFullCta': 'Den vollständigen Entwurf lesen',
        },
    },
    'es': {
        'metadata': {
            'title': 'Plan de clase | LessonCraftStudio',
            'description': 'Un plan de clase listo para usar, escrito para aulas K-3 bilingües.',
        },
        'loading': 'Cargando…',
        'errorGeneric': 'Algo salió mal. Por favor, inténtelo de nuevo.',
        'notFoundTitle': 'Plan de clase no encontrado',
        'notFoundBody': 'Aún no hay un plan de clase para este tema en este idioma.',
        'totalDuration': '{minutes} minutos en total',
        'sectionDuration': '{minutes} min',
        'section': {
            'warmup': 'Calentamiento',
            'contentActivity': 'Actividad de contenido y lengua',
            'scaffold': 'Andamiaje lingüístico y práctica',
            'closure': 'Cierre',
        },
        'gate': {
            'subscribePromptTitle': 'Los planes de clase forman parte de la suscripción',
            'subscribePromptBody': 'Planes de clase ya escritos enlazados con nuestros decks, escritos para aulas K-3 bilingües — una de las herramientas que la suscripción de $69 al año desbloquea.',
            'subscribeCta': 'Ir a la suscripción',
            'signInPromptTitle': 'Inicie sesión para leer este plan de clase',
            'signInPromptBody': 'Los planes de clase forman parte de la biblioteca de suscriptores. Inicie sesión con su cuenta de suscriptor para leer.',
            'signInCta': 'Iniciar sesión',
        },
        'topicReference': {
            'heading': 'Plan de clase disponible',
            'duration': '{minutes} minutos en total',
            'readFullCta': 'Leer el plan completo',
        },
    },
    'nl': {
        'metadata': {
            'title': 'Lesplan | LessonCraftStudio',
            'description': 'Een kant-en-klaar lesplan, geschreven voor tweetalige K-3-klassen.',
        },
        'loading': 'Laden…',
        'errorGeneric': 'Er is iets misgegaan. Probeer het opnieuw.',
        'notFoundTitle': 'Lesplan niet gevonden',
        'notFoundBody': 'Er is nog geen lesplan voor dit onderwerp in deze taal.',
        'totalDuration': 'In totaal {minutes} minuten',
        'sectionDuration': '{minutes} min.',
        'section': {
            'warmup': 'Opwarming',
            'contentActivity': 'Inhoud-taal-activiteit',
            'scaffold': 'Taalsteun en oefening',
            'closure': 'Afsluiting',
        },
        'gate': {
            'subscribePromptTitle': 'Lesplannen maken deel uit van het abonnement',
            'subscribePromptBody': 'Vooraf geschreven lesplannen gekoppeld aan onze decks, geschreven voor tweetalige K-3-klassen — een van de tools die het abonnement van $69 per jaar ontgrendelt.',
            'subscribeCta': 'Naar abonnement',
            'signInPromptTitle': 'Log in om dit lesplan te lezen',
            'signInPromptBody': 'Lesplannen maken deel uit van de abonnee-bibliotheek. Log in met uw abonnee-account om te lezen.',
            'signInCta': 'Inloggen',
        },
        'topicReference': {
            'heading': 'Lesplan beschikbaar',
            'duration': 'In totaal {minutes} minuten',
            'readFullCta': 'Lees het volledige plan',
        },
    },
}


def insert_namespace(messages_path, locale, namespace_value):
    """Insert lessonPlanReader namespace into the locale's message file.
    Position: alongside other Pillar 3 namespaces (workspace, collections, bulk, share).
    """
    with open(messages_path, encoding='utf-8') as f:
        d = json.load(f)
    if 'lessonPlanReader' in d:
        print(f'  {locale}: lessonPlanReader already present, skipping')
        return
    d['lessonPlanReader'] = namespace_value
    with open(messages_path, 'w', encoding='utf-8', newline='\n') as f:
        json.dump(d, f, ensure_ascii=False, indent=2)
        f.write('\n')
    print(f'  {locale}: lessonPlanReader inserted')


def main():
    for locale, value in LESSON_PLAN_READER.items():
        path = f'frontend/messages/{locale}.json'
        print(f'=== {locale} ===')
        insert_namespace(path, locale, value)


if __name__ == '__main__':
    main()
