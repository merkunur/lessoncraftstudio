"""
Tier 2 Track B Wave 2 (nl) — apply v1 draft (defaults A1/A2/A3) to frontend/messages/nl.json.

- INSERT 4 new top-level namespaces: collections (53) + workspace (28) + bulk (18) + share (13)
- Total INSERT: 112 keys
- Preserve all 18 other namespaces byte-for-byte
- Key order within each new namespace matches en.json canonical order

Run from repo root: python scripts/apply-nl-wave2.py
"""
import json
import io
import sys
import re

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

NL_COLLECTIONS = {
    "meta": {
        "title": "Uw verzamelingen | LessonCraftStudio",
        "description": "Bewaar en organiseer decks in verzamelingen — per klas, per eenheid, per week."
    },
    "list": {
        "title": "Uw verzamelingen",
        "loading": "Laden…",
        "newCollection": "+ Nieuwe verzameling",
        "emptyStateTitle": "Nog geen verzamelingen",
        "emptyStateBody": "Bewaar en organiseer decks in verzamelingen — per klas, per eenheid, per week. Klik op + Nieuwe verzameling om te beginnen.",
        "deckCount": "{count, plural, =0 {Geen decks} =1 {1 deck} other {# decks}}",
        "errorGeneric": "Er is iets misgegaan. Probeer het opnieuw."
    },
    "create": {
        "title": "Nieuwe verzameling",
        "nameLabel": "Naam",
        "namePlaceholder": "bijvoorbeeld, Lentewoordenschat",
        "descriptionLabel": "Beschrijving (optioneel)",
        "submit": "Aanmaken",
        "cancel": "Annuleren",
        "submitting": "Bezig met aanmaken…",
        "errorRequired": "Voer een naam in.",
        "errorGeneric": "De verzameling kon niet worden aangemaakt. Probeer het opnieuw."
    },
    "detail": {
        "metaTitle": "{name} | LessonCraftStudio",
        "back": "← Alle verzamelingen",
        "renameCta": "Hernoemen",
        "renameTitle": "Verzameling hernoemen",
        "renameSubmit": "Opslaan",
        "renameCancel": "Annuleren",
        "renameSubmitting": "Opslaan…",
        "deleteCta": "Verzameling verwijderen",
        "deleteConfirmTitle": "Deze verzameling verwijderen?",
        "deleteConfirmBody": "De decks blijven in de catalogus staan.",
        "deleteConfirmCta": "Verwijderen",
        "deleteCancel": "Annuleren",
        "deleteSubmitting": "Verwijderen…",
        "removeDeck": "Verwijderen",
        "removeDeckConfirm": "Dit deck uit de verzameling verwijderen?",
        "playOnline": "Online spelen",
        "pdf": "PDF afdrukken",
        "emptyTitle": "Nog geen decks in deze verzameling",
        "emptyBody": "Doorblader de catalogus en klik op \"Toevoegen aan verzameling\" op een deck-kaart.",
        "errorGeneric": "Er is iets misgegaan. Probeer het opnieuw."
    },
    "gate": {
        "subscribePromptTitle": "Verzamelingen maken deel uit van het abonnement",
        "subscribePromptBody": "Decks bewaren en organiseren in verzamelingen is een van de werkruimte-tools die het abonnement van $69 per jaar ontgrendelt. Gratis gebruikers kunnen elk deck bekijken, afdrukken, insluiten en delen — zonder account.",
        "subscribeCta": "Naar abonnement",
        "signInPromptTitle": "Log in om uw verzamelingen te bekijken",
        "signInPromptBody": "Uw verzamelingen zijn aan uw account gekoppeld. Log in om ze te bekijken.",
        "signInCta": "Inloggen"
    },
    "addAffordance": {
        "label": "Toevoegen aan verzameling",
        "pickerTitle": "Toevoegen aan een verzameling",
        "pickerLoading": "Verzamelingen laden…",
        "pickerEmpty": "U heeft nog geen verzamelingen. Maak er eerst een aan.",
        "pickerCreate": "+ Nieuwe verzameling",
        "pickerCancel": "Annuleren",
        "added": "Toegevoegd aan {collectionName}",
        "alreadyIn": "Zit al in deze verzameling",
        "errorGeneric": "Toevoegen mislukt. Probeer het opnieuw."
    }
}

NL_WORKSPACE = {
    "metadata": {
        "title": "Uw werkruimte | LessonCraftStudio",
        "description": "Uw abonnee-werkruimte — verzamelingen, recente activiteit en de tools om uw lesgeven georganiseerd te houden."
    },
    "header": {
        "title": "Werkruimte",
        "welcomeLine": "Uw verzamelingen en recente activiteit, alles op één plek."
    },
    "gate": {
        "subscribePromptTitle": "De werkruimte maakt deel uit van het abonnement",
        "subscribePromptBody": "Uw werkruimte — verzamelingen, recente activiteit en opgeslagen decks — is een van de tools die het abonnement van $69 per jaar ontgrendelt.",
        "subscribeCta": "Naar abonnement",
        "signInPromptTitle": "Log in om uw werkruimte te openen",
        "signInPromptBody": "Uw werkruimte hoort bij uw account. Log in om hem te bekijken.",
        "signInCta": "Inloggen"
    },
    "loading": "Laden…",
    "errorGeneric": "Er is iets misgegaan. Probeer het opnieuw.",
    "collections": {
        "heading": "Uw verzamelingen",
        "viewAll": "Alle bekijken ({count})",
        "cardDeckCount": "{count, plural, =0 {Geen decks} =1 {1 deck} other {# decks}}",
        "empty": {
            "title": "Nog geen verzamelingen",
            "body": "Bewaar en organiseer decks in verzamelingen — per klas, per eenheid, per week."
        }
    },
    "recentActivity": {
        "heading": "Recente activiteit",
        "empty": {
            "title": "Hier staat nog niets",
            "body": "Activiteit verschijnt hier zodra u decks verzamelt, organiseert en deelt."
        },
        "activityType": {
            "collected": "{deckTitle} toegevoegd aan {collectionName}",
            "modified": "{collectionName} bijgewerkt",
            "shared": "{deckTitle} gedeeld"
        },
        "relativeTime": {
            "justNow": "zojuist",
            "minutesAgo": "{count, plural, =1 {1 minuut geleden} other {# minuten geleden}}",
            "hoursAgo": "{count, plural, =1 {1 uur geleden} other {# uur geleden}}",
            "daysAgo": "{count, plural, =1 {1 dag geleden} other {# dagen geleden}}",
            "weeksAgo": "{count, plural, =1 {1 week geleden} other {# weken geleden}}"
        }
    }
}

NL_BULK = {
    "toggleSelect": "Selecteren",
    "toggleDone": "Klaar",
    "toolbarAria": "Acties voor meervoudige selectie",
    "selectionCount": "{count, plural, =1 {1 deck geselecteerd} other {# decks geselecteerd}}",
    "checkboxAria": "{title} selecteren",
    "action": {
        "addToCollection": "Toevoegen aan verzameling",
        "removeFromCollection": "Verwijderen",
        "shareLinks": "Links delen",
        "cancel": "Annuleren"
    },
    "addedConfirmation": "{count, plural, =1 {1 deck toegevoegd aan {collectionName}} other {# decks toegevoegd aan {collectionName}}}",
    "removedConfirmation": "{count, plural, =1 {1 deck verwijderd} other {# decks verwijderd}}",
    "errorGeneric": "Er is iets misgegaan. Probeer het opnieuw.",
    "addToCollectionPicker": {
        "pickerTitle": "{count, plural, =1 {1 deck aan een verzameling toevoegen} other {# decks aan een verzameling toevoegen}}",
        "pickerLoading": "Verzamelingen laden…",
        "pickerEmpty": "U heeft nog geen verzamelingen. Maak er eerst een aan.",
        "pickerCreate": "+ Nieuwe verzameling",
        "pickerCancel": "Annuleren",
        "errorGeneric": "Verzamelingen konden niet worden geladen. Probeer het opnieuw."
    }
}

NL_SHARE = {
    "label": "Link delen",
    "singleDeckTitle": "Dit deck delen",
    "singleDeckBody": "Iedereen met deze link kan het deck spelen. De link verloopt niet.",
    "generating": "Link wordt aangemaakt…",
    "copy": "Kopiëren",
    "copied": "Gekopieerd!",
    "copyAll": "Alles kopiëren",
    "copiedAll": "Alles gekopieerd!",
    "close": "Sluiten",
    "errorGeneric": "De link kon niet worden aangemaakt. Probeer het opnieuw.",
    "errorClipboard": "Geen toegang tot het klembord. Selecteer de link en kopieer hem handmatig.",
    "bulkResultsTitle": "{count, plural, =1 {1 deel-link} other {# deel-links}}",
    "bulkResultsSkipped": "{count, plural, =1 {1 deck is overgeslagen (niet gepubliceerd)} other {# decks zijn overgeslagen (niet gepubliceerd)}}"
}


def count_leaves(o):
    if isinstance(o, dict):
        return sum(count_leaves(v) for v in o.values())
    return 1


def shape_match(en_obj, nl_obj, path=''):
    errors = []
    if isinstance(en_obj, dict):
        if not isinstance(nl_obj, dict):
            errors.append(f'{path}: en is dict, nl is not')
            return errors
        en_keys = set(en_obj.keys())
        nl_keys = set(nl_obj.keys())
        for k in en_keys - nl_keys:
            errors.append(f'{path}.{k}: missing in nl')
        for k in nl_keys - en_keys:
            errors.append(f'{path}.{k}: extra in nl')
        for k in en_keys & nl_keys:
            errors.extend(shape_match(en_obj[k], nl_obj[k], f'{path}.{k}' if path else k))
    return errors


def reorder_to_match(en_obj, nl_obj):
    if not isinstance(en_obj, dict) or not isinstance(nl_obj, dict):
        return nl_obj
    out = {}
    for k in en_obj.keys():
        if k in nl_obj:
            out[k] = reorder_to_match(en_obj[k], nl_obj[k])
    return out


def main():
    nl_path = 'frontend/messages/nl.json'
    en_path = 'frontend/messages/en.json'

    with open(en_path, encoding='utf-8') as f:
        en = json.load(f)
    with open(nl_path, encoding='utf-8') as f:
        nl = json.load(f)

    pre_top = list(nl.keys())
    print(f'pre  nl top-level: {len(pre_top)} namespaces')

    print()
    print('=== Shape match against en.json ===')
    for ns_name, ns_obj in [('collections', NL_COLLECTIONS), ('workspace', NL_WORKSPACE),
                              ('bulk', NL_BULK), ('share', NL_SHARE)]:
        errors = shape_match(en[ns_name], ns_obj, ns_name)
        if errors:
            print(f'  {ns_name}: SHAPE MISMATCH')
            for e in errors:
                print(f'    - {e}')
            sys.exit(1)
        ns_reordered = reorder_to_match(en[ns_name], ns_obj)
        en_count = count_leaves(en[ns_name])
        nl_count = count_leaves(ns_reordered)
        assert en_count == nl_count, f'{ns_name}: count mismatch en={en_count} nl={nl_count}'
        print(f'  {ns_name}: shape ✓ ({nl_count} leaves)')
        nl[ns_name] = ns_reordered

    post_top = list(nl.keys())
    pre_set = set(pre_top)
    post_set = set(post_top)
    added = post_set - pre_set
    removed = pre_set - post_set
    assert added == {'collections', 'workspace', 'bulk', 'share'}, f'unexpected added: {added}'
    assert removed == set(), f'unexpected removed: {removed}'

    # Informal-pronoun scan (Dutch formal `u`)
    informal = re.compile(r'\b(je|jij|jouw|jullie)\b', re.IGNORECASE)
    informal_hits = []
    def walk(o, prefix=''):
        if isinstance(o, dict):
            for k, v in o.items():
                yield from walk(v, f'{prefix}.{k}' if prefix else k)
        elif isinstance(o, str):
            yield prefix, o
    for ns in ['collections', 'workspace', 'bulk', 'share']:
        for path, val in walk(nl[ns], ns):
            for m in informal.finditer(val):
                informal_hits.append((path, m.group(0), val[:80]))
    print()
    print(f'=== Informal-pronoun scan: {len(informal_hits)} hits ===')
    for h in informal_hits:
        print(f'  - {h[0]} | {h[1]} | {h[2]!r}')
    if informal_hits:
        sys.exit(1)

    # Empty-string scan
    empties = []
    for ns in ['collections', 'workspace', 'bulk', 'share']:
        for path, val in walk(nl[ns], ns):
            if val == '':
                empties.append(path)
    print(f'=== Empty-string scan: {len(empties)} hits ===')
    if empties:
        sys.exit(1)

    new_total = sum(count_leaves(nl[ns]) for ns in ['collections', 'workspace', 'bulk', 'share'])
    assert new_total == 112, f'total new keys {new_total} != 112'

    # Reorder top-level nl: en-shared first (in en order), then nl-only
    en_keys = list(en.keys())
    nl_only_keys = [k for k in nl.keys() if k not in en_keys]
    final = {}
    for k in en_keys:
        if k in nl:
            final[k] = nl[k]
    for k in nl_only_keys:
        final[k] = nl[k]

    assert set(final.keys()) == set(nl.keys()), 'top-level key set diverged during reorder'
    assert len(final) == len(nl), 'top-level count diverged during reorder'

    with open(nl_path, 'w', encoding='utf-8', newline='\n') as f:
        json.dump(final, f, ensure_ascii=False, indent=2)
        f.write('\n')

    print()
    print(f'=== Apply OK ===')
    print(f'pre  nl top-level: {len(pre_top)} -> post: {len(final)} (+4)')
    print(f'pre  nl Wave-2 leaves: 0 -> post: {new_total} (+112)')
    print(f'top-level order: en-shared first ({len([k for k in en_keys if k in final])}), then nl-only ({len(nl_only_keys)})')


if __name__ == '__main__':
    main()
