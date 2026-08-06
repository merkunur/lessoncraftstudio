"""
Tier 2 Track B Wave 1 (nl) — apply v1 draft + A5 alt-b to frontend/messages/nl.json.

- Replaces homepage namespace wholesale (67 keys; drops 29 stale seller-era)
- Replaces footer namespace wholesale (9 keys; drops 12 stale seller-era)
- Adds topicPage namespace fresh (12 keys; per A5 alt-b phrase form)
- Preserves all 14 other namespaces byte-for-byte by key list.

Run from repo root: python scripts/apply-nl-wave1.py
"""
import json
import io
import sys

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

NL_HOMEPAGE = {
    "meta": {
        "title": "LessonCraftStudio — Werkbladen die in uw tweede taal werkelijk werken",
        "description": "Een gecureerde K-3-illustratiebibliotheek en een vocabulairesysteem in 11 talen — met correcte geslachten, meervoudsvormen en diakrieten. Gebouwd voor tweetalige klassen.",
        "ogTitle": "Werkbladen die in uw tweede taal werkelijk werken.",
        "ogDescription": "Gebouwd voor leerkrachten in tweetalige programma's, bilinguale klassen en internationale scholen.",
        "ogAlt": "LessonCraftStudio — K-3-werkbladen in 11 talen"
    },
    "hero": {
        "title": "Werkbladen die in uw tweede taal werkelijk werken.",
        "subtitle": "Een gecureerde bibliotheek met K-3-illustraties, gekoppeld aan een vocabulairesysteem in 11 talen — met correcte geslachten, meervoudsvormen en diakrieten in elke taal. Gebouwd voor leerkrachten in tweetalige programma's, bilinguale klassen en internationale scholen.",
        "interaction": "De kinderen spelen ze in de browser. Druk ze af als u dat liever heeft."
    },
    "breadthGrid": {
        "sectionTitle": "Decks die leerkrachten op dit moment gebruiken.",
        "intro": "Een paar decks uit de catalogus. Open het eerste om het hier te spelen, of klik op een ander om de volledige pagina te zien.",
        "featuredBadge": "Uitgelicht",
        "playInline": "Dit deck spelen",
        "openDeck": "Deck openen",
        "closeFeatured": "Sluiten",
        "loadingDeck": "Deck wordt geladen…"
    },
    "languageProof": {
        "sectionTitle": "Wat automatische vertaling fout doet — en wat wij goed doen.",
        "intro": "De meeste werkblad-sites vertalen Engelse inhoud met een generieke machine en publiceren het resultaat. Lidwoorden kloppen niet. Meervoudsvormen vallen om. Accenten verdwijnen. Kinderen leren de fouten mee. Wij behandelen elk van onze 11 talen als een eigen catalogus — geen vertaling van het Engels — met een woordenschat die wordt samengesteld door mensen die werkelijk in die taal lesgeven.",
        "subIntro": "Twee voorbeelden, naast elkaar.",
        "german": {
            "heading": "Duits — geslacht, hoofdletters, onregelmatig meervoud",
            "leftAnnotation1": "Automatische vertaling raadt het lidwoord op basis van de Engelse context. Schule is vrouwelijk — de Engelse context vertelt u dat niet.",
            "leftAnnotation2": "Duitse zelfstandige naamwoorden worden altijd met een hoofdletter geschreven. Met kleine letters wordt de verkeerde regel aangeleerd.",
            "leftAnnotation3": "Het meervoud is onregelmatig: Schulen, niet Schules. Automatische vertaling regulariseert; de juiste vorm ontbreekt.",
            "annotation1": "die Schule — telkens het juiste lidwoord. Onze Duitse woordenschat is op geslacht gerubriceerd, niet geraden.",
            "annotation2": "Schule — met hoofdletter, zoals een Duits zelfstandig naamwoord hoort te zijn.",
            "annotation3": "Schulen — het werkelijke meervoud, geen Engelse stijlgok.",
            "ariaLabel": "Vergelijking naast elkaar: een automatisch vertaald Duits werkblad met drie fouten — verkeerd vrouwelijk lidwoord ('der' in plaats van 'die'), kleingeschreven zelfstandig naamwoord ('schule' in plaats van 'Schule') en een Engels-pluralisering ('schules' in plaats van 'Schulen') — naast de LessonCraftStudio-versie waarin 'die Schule' en 'die Schulen' correct zijn weergegeven."
        },
        "french": {
            "heading": "Frans — geslacht, samentrekkingen, accenten",
            "leftAnnotation1": "École is vrouwelijk, en het lidwoord wordt voor een klinker geëlideerd. Automatische vertaling doet geen van beide.",
            "leftAnnotation2": "De é is geen versiering — die hoort bij het woord.",
            "leftAnnotation3": "Voorzetsel + lidwoord trekken samen voor de klinker: à l'école. Automatische vertaling laat ze los.",
            "annotation1": "l'école — correcte elisie en correcte accent.",
            "annotation2": "à l'école — correcte samentrekking met het voorzetsel.",
            "annotation3": "Elk accent in onze Franse catalogus wordt als deel van het woord behandeld.",
            "ariaLabel": "Vergelijking naast elkaar: een automatisch vertaald Frans werkblad met drie fouten — niet-geëlideerd lidwoord ('la école' in plaats van 'l'école'), niet-samengetrokken voorzetsel ('à le école' in plaats van 'à l'école') en ontbrekend acuut accent ('ecole' in plaats van 'école') — naast de LessonCraftStudio-versie waarin 'l'école', 'à l'école' en 'école' correct zijn weergegeven."
        },
        "closingLine": "Kinderen verdienen materialen die passen bij de taal die zij leren. Daar richten wij ons werk op."
    },
    "freeExperience": {
        "sectionTitle": "Gratis voor elke leerkracht.",
        "intro": "Geen account, geen betaalmuur, geen aanmeldverplichting. Bladeren, afdrukken, insluiten en delen — elk deck, in elke taal.",
        "cta": "Naar de catalogus →",
        "browse": {
            "title": "Alle decks doorbladeren.",
            "body": "De volledige catalogus is open. Filter op taal, niveau, onderwerp of oefentype. Geen account nodig om te bladeren, te bekijken of een deck te spelen."
        },
        "pdf": {
            "title": "Een afdrukbare PDF genereren.",
            "body": "Elk deck wordt gedownload als een schone afdrukbare PDF — inclusief antwoordblad. Geen watermerk, geen limiet per deck, niets wat voor de betaalde versie wordt achtergehouden."
        },
        "embed": {
            "title": "Elk deck insluiten op uw klassen-website of blog.",
            "body": "Kopieer een insluit-fragment en plak het in uw klassen-website, uw blog of het leeromgevingssysteem van uw school. De kinderen spelen het interactieve deck precies daar waar zij het vinden. Insluiten blijft gratis."
        },
        "share": {
            "title": "Een deck via een link delen.",
            "body": "Stuur elk deck als een link. De kinderen spelen direct in de browser — geen aanmelding, geen app, geen account. Werkt op een telefoon, een tablet, een Chromebook of een digibord."
        }
    },
    "subscription": {
        "sectionTitle": "Voor leerkrachten die LessonCraftStudio elke week gebruiken.",
        "intro": "De catalogus is gratis en blijft gratis. Het abonnement is voor leerkrachten die LessonCraftStudio een vast onderdeel van hun praktijk hebben gemaakt en hun lesgeven georganiseerd willen hebben — met kant-en-klare lesplannen, themapakketten voor de momenten die elk jaar terugkomen, en een werkruimte gebouwd voor het beheren van duizenden decks.",
        "lessonPlans": {
            "title": "Kant-en-klare lesplannen",
            "body": "Een groeiende bibliotheek van vooraf geschreven lesplannen, elk gekoppeld aan concrete decks. Elk plan volgt een consistente vierstapsstructuur op basis van CLIL-principes — opwarming, inhoud-en-taal-activiteit, taalsteun en oefening, en afsluiting — zodat u de vorm één keer leert en daarna gewoon lesgeeft. De plannen worden per taal natief geschreven, niet automatisch vertaald, en weerspiegelen de conventies van elke klas waarvoor ze geschreven zijn."
        },
        "themedBundles": {
            "title": "Themapakketten voor de momenten die elk jaar terugkomen",
            "body": "Met de hand samengestelde pakketten voor begin van het schooljaar, Halloween, kerstvakantie, Valentijnsdag, einde van het schooljaar en herhaling aan het einde van een thema. Elk pakket combineert een samenhangende reeks decks met een lesplan dat voor het thema van dat pakket is geschreven. Druk het boekje af, volg het plan, geef de week les. Door het jaar heen worden nieuwe pakketten toegevoegd, allemaal inbegrepen in het abonnement."
        },
        "workspace": {
            "title": "Een werkruimte voor de leerkracht die u werkelijk bent",
            "body": "De catalogus zal duizenden decks tellen. Het abonnement geeft u collecties om ze te ordenen, een werkruimte-startpagina om in te landen, geavanceerde filters afgestemd op hoe leerkrachten werkelijk zoeken, leerplankoppeling voor uw eigen thema's, en bulkgereedschap dat taken van vijf minuten in taken van dertig seconden verandert. Uw structuur draagt jaar na jaar door — daar gaat het om."
        },
        "price": "$69 per jaar. Op elk moment opzegbaar.",
        "subscribeCta": "Abonneren →",
        "subscribeSubCopy": "U wordt doorgestuurd naar onze betaalpartner. Na de betaling is uw account direct klaar voor gebruik.",
        "alreadySubscribedCta": "Mijn abonnement bekijken"
    },
    "notify": {
        "aboveField": "Wij zijn de lesplan-bibliotheek aan het afronden en lanceren het abonnement binnenkort. Laat ons uw e-mailadres achter en wij geven u op de openingsdag bericht.",
        "label": "E-mailadres",
        "placeholder": "uw-email@school.nl",
        "submit": "Geef mij bericht →",
        "submitting": "Wordt verzonden…",
        "confirmation": "Dank u — wij sturen u een e-mail wanneer het abonnement opent.",
        "subCopy": "Eén e-mail, alleen wanneer het abonnement opent. Geen marketinglijst, geen vervolgreeks.",
        "errors": {
            "invalid_email": "Voer een geldig e-mailadres in.",
            "server": "Er is iets misgegaan. Probeer het opnieuw."
        }
    }
}

NL_FOOTER = {
    "byLanguage": "Werkbladen per taal",
    "byTopic": "Werkbladen per onderwerp",
    "byExerciseType": "Werkbladen per oefentype",
    "moreLanguagesSoon": "Binnenkort meer talen",
    "moreTopicsSoon": "Binnenkort meer onderwerpen",
    "contact": "Contact",
    "terms": "Voorwaarden",
    "privacy": "Privacy",
    "copyright": "© 2026 LessonCraftStudio."
}

# A5 alt-b applied: heading.exerciseType + meta.title in phrase form
NL_TOPIC_PAGE = {
    "meta": {
        "title": "Werkbladen voor {topic} | LessonCraftStudio",
        "description": "Gratis {topic}-werkbladen en afdrukbare PDFs. Interactieve activiteiten voor klassen in de eerste schooljaren."
    },
    "heading": {
        "exerciseType": "Werkbladen voor {topic}",
        "theme": "Werkbladen met {topic}",
        "educationalLevel": "Werkbladen voor {topic}"
    },
    "intro": {
        "exerciseType": "Interactieve werkbladen en afdrukbare PDFs om {topic} te oefenen.",
        "theme": "Werkbladen met {topic}.",
        "educationalLevel": "Activiteiten voor {topic}."
    },
    "decksCount": "{count, plural, =0 {Nog geen werkbladen} =1 {1 werkblad} other {# werkbladen}}",
    "deckCard": {
        "playLink": "Online spelen",
        "pdfLink": "PDF afdrukken"
    },
    "emptyState": "Nog geen werkbladen in dit onderwerp — kom binnenkort terug."
}


def count_leaves(o):
    if isinstance(o, dict):
        return sum(count_leaves(v) for v in o.values())
    return 1


def main():
    path = 'frontend/messages/nl.json'
    with open(path, encoding='utf-8') as f:
        nl = json.load(f)

    pre_top = list(nl.keys())
    pre_homepage_count = count_leaves(nl.get('homepage', {}))
    pre_footer_count = count_leaves(nl.get('footer', {}))

    # Replace
    nl['homepage'] = NL_HOMEPAGE
    nl['footer'] = NL_FOOTER
    nl['topicPage'] = NL_TOPIC_PAGE

    # Verify counts
    new_homepage_count = count_leaves(nl['homepage'])
    new_footer_count = count_leaves(nl['footer'])
    new_topic_count = count_leaves(nl['topicPage'])

    assert new_homepage_count == 67, f'homepage leaf count {new_homepage_count} != 67'
    assert new_footer_count == 9, f'footer leaf count {new_footer_count} != 9'
    assert new_topic_count == 12, f'topicPage leaf count {new_topic_count} != 12'

    # Verify A5 phrase form applied
    assert nl['topicPage']['heading']['exerciseType'] == 'Werkbladen voor {topic}'
    assert nl['topicPage']['meta']['title'] == 'Werkbladen voor {topic} | LessonCraftStudio'

    # Verify ICU plural rule shape
    decks_count = nl['topicPage']['decksCount']
    assert '{count, plural,' in decks_count
    assert '=0 {' in decks_count and '=1 {' in decks_count and 'other {' in decks_count

    post_top = list(nl.keys())

    # Verify no other namespace was touched (key set)
    pre_set = set(pre_top)
    post_set = set(post_top)
    added = post_set - pre_set
    removed = pre_set - post_set
    assert added == {'topicPage'}, f'unexpected added namespaces: {added}'
    assert removed == set(), f'unexpected removed namespaces: {removed}'

    # Write back
    with open(path, 'w', encoding='utf-8', newline='\n') as f:
        json.dump(nl, f, ensure_ascii=False, indent=2)
        f.write('\n')

    print(f'OK — applied Wave 1 NL to {path}')
    print(f'pre  homepage leaves: {pre_homepage_count}')
    print(f'post homepage leaves: {new_homepage_count}')
    print(f'pre  footer   leaves: {pre_footer_count}')
    print(f'post footer   leaves: {new_footer_count}')
    print(f'post topicPage leaves: {new_topic_count} (newly created)')
    print(f'top-level namespaces: {len(post_top)} (was {len(pre_top)}; +1 topicPage)')

    # Net delta surfacing
    net_delta = (new_homepage_count + new_footer_count + new_topic_count) - (pre_homepage_count + pre_footer_count)
    print(f'net leaf delta on Wave-1 namespaces: {net_delta:+d}')


if __name__ == '__main__':
    main()
