"""
Tier 2 Track B Wave 2 (es) — apply v1 draft (defaults A1/A2/A3) to frontend/messages/es.json.

- INSERT 4 new top-level namespaces: collections (53) + workspace (28) + bulk (18) + share (13)
- Total INSERT: 112 keys
- Preserve all 18 other namespaces byte-for-byte
- Key order within each new namespace matches en.json canonical order

Run from repo root: python scripts/apply-es-wave2.py
"""
import json
import io
import sys
import re

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

ES_COLLECTIONS = {
    "meta": {
        "title": "Sus colecciones | LessonCraftStudio",
        "description": "Guarde y organice los decks en colecciones — por clase, por unidad, por semana."
    },
    "list": {
        "title": "Sus colecciones",
        "loading": "Cargando…",
        "newCollection": "+ Nueva colección",
        "emptyStateTitle": "Aún no hay colecciones",
        "emptyStateBody": "Guarde y organice los decks en colecciones — por clase, por unidad, por semana. Pulse + Nueva colección para empezar.",
        "deckCount": "{count, plural, =0 {Sin decks} =1 {1 deck} other {# decks}}",
        "errorGeneric": "Algo salió mal. Por favor, inténtelo de nuevo."
    },
    "create": {
        "title": "Nueva colección",
        "nameLabel": "Nombre",
        "namePlaceholder": "por ejemplo, Vocabulario de primavera",
        "descriptionLabel": "Descripción (opcional)",
        "submit": "Crear",
        "cancel": "Cancelar",
        "submitting": "Creando…",
        "errorRequired": "Por favor, introduzca un nombre.",
        "errorGeneric": "No se pudo crear la colección. Por favor, inténtelo de nuevo."
    },
    "detail": {
        "metaTitle": "{name} | LessonCraftStudio",
        "back": "← Todas las colecciones",
        "renameCta": "Renombrar",
        "renameTitle": "Renombrar colección",
        "renameSubmit": "Guardar",
        "renameCancel": "Cancelar",
        "renameSubmitting": "Guardando…",
        "deleteCta": "Eliminar colección",
        "deleteConfirmTitle": "¿Eliminar esta colección?",
        "deleteConfirmBody": "Los decks no se eliminarán del catálogo.",
        "deleteConfirmCta": "Eliminar",
        "deleteCancel": "Cancelar",
        "deleteSubmitting": "Eliminando…",
        "removeDeck": "Quitar",
        "removeDeckConfirm": "¿Quitar este deck de la colección?",
        "playOnline": "Jugar en línea",
        "pdf": "Imprimir PDF",
        "emptyTitle": "Aún no hay decks en esta colección",
        "emptyBody": "Explore el catálogo y pulse \"Añadir a la colección\" en cualquier tarjeta de deck.",
        "errorGeneric": "Algo salió mal. Por favor, inténtelo de nuevo."
    },
    "gate": {
        "subscribePromptTitle": "Las colecciones forman parte de la suscripción",
        "subscribePromptBody": "Guardar y organizar los decks en colecciones es una de las herramientas del espacio de trabajo que la suscripción de $69 al año desbloquea. Los usuarios gratuitos pueden explorar, imprimir, insertar y compartir cada deck — sin cuenta.",
        "subscribeCta": "Ir a la suscripción",
        "signInPromptTitle": "Inicie sesión para acceder a sus colecciones",
        "signInPromptBody": "Sus colecciones están vinculadas a su cuenta. Inicie sesión para verlas.",
        "signInCta": "Iniciar sesión"
    },
    "addAffordance": {
        "label": "Añadir a la colección",
        "pickerTitle": "Añadir a una colección",
        "pickerLoading": "Cargando colecciones…",
        "pickerEmpty": "Aún no tiene colecciones. Cree una primero.",
        "pickerCreate": "+ Nueva colección",
        "pickerCancel": "Cancelar",
        "added": "Añadido a {collectionName}",
        "alreadyIn": "Ya está en esta colección",
        "errorGeneric": "No se pudo añadir. Por favor, inténtelo de nuevo."
    }
}

ES_WORKSPACE = {
    "metadata": {
        "title": "Su espacio de trabajo | LessonCraftStudio",
        "description": "Su espacio de trabajo de suscriptor — colecciones, actividad reciente y las herramientas para mantener su enseñanza organizada."
    },
    "header": {
        "title": "Espacio de trabajo",
        "welcomeLine": "Sus colecciones y su actividad reciente, todo en un solo lugar."
    },
    "gate": {
        "subscribePromptTitle": "El espacio de trabajo forma parte de la suscripción",
        "subscribePromptBody": "Su espacio de trabajo — colecciones, actividad reciente y decks guardados — es una de las herramientas que la suscripción de $69 al año desbloquea.",
        "subscribeCta": "Ir a la suscripción",
        "signInPromptTitle": "Inicie sesión para acceder a su espacio de trabajo",
        "signInPromptBody": "Su espacio de trabajo está vinculado a su cuenta. Inicie sesión para verlo.",
        "signInCta": "Iniciar sesión"
    },
    "loading": "Cargando…",
    "errorGeneric": "Algo salió mal. Por favor, inténtelo de nuevo.",
    "collections": {
        "heading": "Sus colecciones",
        "viewAll": "Ver todas ({count})",
        "cardDeckCount": "{count, plural, =0 {Sin decks} =1 {1 deck} other {# decks}}",
        "empty": {
            "title": "Aún no hay colecciones",
            "body": "Guarde y organice los decks en colecciones — por clase, por unidad, por semana."
        }
    },
    "recentActivity": {
        "heading": "Actividad reciente",
        "empty": {
            "title": "Todavía no hay nada aquí",
            "body": "La actividad aparecerá aquí a medida que recopile, organice y comparta decks."
        },
        "activityType": {
            "collected": "{deckTitle} añadido a {collectionName}",
            "modified": "{collectionName} actualizada",
            "shared": "{deckTitle} compartido"
        },
        "relativeTime": {
            "justNow": "ahora mismo",
            "minutesAgo": "{count, plural, =1 {hace 1 minuto} other {hace # minutos}}",
            "hoursAgo": "{count, plural, =1 {hace 1 hora} other {hace # horas}}",
            "daysAgo": "{count, plural, =1 {hace 1 día} other {hace # días}}",
            "weeksAgo": "{count, plural, =1 {hace 1 semana} other {hace # semanas}}"
        }
    }
}

ES_BULK = {
    "toggleSelect": "Seleccionar",
    "toggleDone": "Listo",
    "toolbarAria": "Acciones de selección múltiple",
    "selectionCount": "{count, plural, =1 {1 deck seleccionado} other {# decks seleccionados}}",
    "checkboxAria": "Seleccionar {title}",
    "action": {
        "addToCollection": "Añadir a la colección",
        "removeFromCollection": "Quitar",
        "shareLinks": "Compartir enlaces",
        "cancel": "Cancelar"
    },
    "addedConfirmation": "{count, plural, =1 {1 deck añadido a {collectionName}} other {# decks añadidos a {collectionName}}}",
    "removedConfirmation": "{count, plural, =1 {1 deck quitado} other {# decks quitados}}",
    "errorGeneric": "Algo salió mal. Por favor, inténtelo de nuevo.",
    "addToCollectionPicker": {
        "pickerTitle": "{count, plural, =1 {Añadir 1 deck a una colección} other {Añadir # decks a una colección}}",
        "pickerLoading": "Cargando colecciones…",
        "pickerEmpty": "Aún no tiene colecciones. Cree una primero.",
        "pickerCreate": "+ Nueva colección",
        "pickerCancel": "Cancelar",
        "errorGeneric": "No se pudieron cargar las colecciones. Por favor, inténtelo de nuevo."
    }
}

ES_SHARE = {
    "label": "Compartir enlace",
    "singleDeckTitle": "Compartir este deck",
    "singleDeckBody": "Cualquier persona con este enlace puede jugar el deck. El enlace no caduca.",
    "generating": "Generando enlace…",
    "copy": "Copiar",
    "copied": "¡Copiado!",
    "copyAll": "Copiar todo",
    "copiedAll": "¡Todo copiado!",
    "close": "Cerrar",
    "errorGeneric": "No se pudo generar el enlace. Por favor, inténtelo de nuevo.",
    "errorClipboard": "No se pudo acceder al portapapeles. Seleccione el enlace y cópielo manualmente.",
    "bulkResultsTitle": "{count, plural, =1 {1 enlace para compartir} other {# enlaces para compartir}}",
    "bulkResultsSkipped": "{count, plural, =1 {1 deck fue omitido (no publicado)} other {# decks fueron omitidos (no publicados)}}"
}


def count_leaves(o):
    if isinstance(o, dict):
        return sum(count_leaves(v) for v in o.values())
    return 1


def shape_match(en_obj, es_obj, path=''):
    """Recursively verify es_obj has every key path that en_obj has and no extras."""
    errors = []
    if isinstance(en_obj, dict):
        if not isinstance(es_obj, dict):
            errors.append(f'{path}: en is dict, es is not')
            return errors
        en_keys = set(en_obj.keys())
        es_keys = set(es_obj.keys())
        for k in en_keys - es_keys:
            errors.append(f'{path}.{k}: missing in es')
        for k in es_keys - en_keys:
            errors.append(f'{path}.{k}: extra in es')
        for k in en_keys & es_keys:
            errors.extend(shape_match(en_obj[k], es_obj[k], f'{path}.{k}' if path else k))
    return errors


def reorder_to_match(en_obj, es_obj):
    """Reorder es_obj keys to match en_obj order (recursively)."""
    if not isinstance(en_obj, dict) or not isinstance(es_obj, dict):
        return es_obj
    out = {}
    for k in en_obj.keys():
        if k in es_obj:
            out[k] = reorder_to_match(en_obj[k], es_obj[k])
    return out


def main():
    es_path = 'frontend/messages/es.json'
    en_path = 'frontend/messages/en.json'

    with open(en_path, encoding='utf-8') as f:
        en = json.load(f)
    with open(es_path, encoding='utf-8') as f:
        es = json.load(f)

    pre_top = list(es.keys())
    print(f'pre  es top-level: {len(pre_top)} namespaces')

    # Verify shape match for each new namespace against en
    print()
    print('=== Shape match against en.json ===')
    for ns_name, ns_obj in [('collections', ES_COLLECTIONS), ('workspace', ES_WORKSPACE),
                              ('bulk', ES_BULK), ('share', ES_SHARE)]:
        errors = shape_match(en[ns_name], ns_obj, ns_name)
        if errors:
            print(f'  {ns_name}: SHAPE MISMATCH')
            for e in errors:
                print(f'    - {e}')
            sys.exit(1)
        # Reorder to match en
        ns_reordered = reorder_to_match(en[ns_name], ns_obj)
        en_count = count_leaves(en[ns_name])
        es_count = count_leaves(ns_reordered)
        assert en_count == es_count, f'{ns_name}: leaf count mismatch en={en_count} es={es_count}'
        print(f'  {ns_name}: shape ✓ ({es_count} leaves)')
        # Insert into es
        if ns_name == 'collections':
            ES_COLLECTIONS_FINAL = ns_reordered
        elif ns_name == 'workspace':
            ES_WORKSPACE_FINAL = ns_reordered
        elif ns_name == 'bulk':
            ES_BULK_FINAL = ns_reordered
        elif ns_name == 'share':
            ES_SHARE_FINAL = ns_reordered
        # Add to es dict directly
        es[ns_name] = ns_reordered

    post_top = list(es.keys())
    pre_set = set(pre_top)
    post_set = set(post_top)
    added = post_set - pre_set
    removed = pre_set - post_set
    assert added == {'collections', 'workspace', 'bulk', 'share'}, f'unexpected added: {added}'
    assert removed == set(), f'unexpected removed: {removed}'

    # Verify no informal address-form (Castilian formal usted)
    informal = re.compile(r'\b(tú|tus?|ti|contigo|vos|vosotros|os)\b', re.IGNORECASE)
    informal_hits = []
    def walk(o, prefix=''):
        if isinstance(o, dict):
            for k, v in o.items():
                yield from walk(v, f'{prefix}.{k}' if prefix else k)
        elif isinstance(o, str):
            yield prefix, o
    for ns in ['collections', 'workspace', 'bulk', 'share']:
        for path, val in walk(es[ns], ns):
            for m in informal.finditer(val):
                informal_hits.append((path, m.group(0), val[:80]))
    print()
    print(f'=== Informal-address scan: {len(informal_hits)} hits ===')
    for h in informal_hits:
        print(f'  - {h[0]} | {h[1]} | {h[2]!r}')
    if informal_hits:
        sys.exit(1)

    # Empty-string scan
    empties = []
    for ns in ['collections', 'workspace', 'bulk', 'share']:
        for path, val in walk(es[ns], ns):
            if val == '':
                empties.append(path)
    print(f'=== Empty-string scan: {len(empties)} hits ===')
    if empties:
        sys.exit(1)

    # Total new keys
    new_total = sum(count_leaves(es[ns]) for ns in ['collections', 'workspace', 'bulk', 'share'])
    assert new_total == 112, f'total new keys {new_total} != 112'

    # Reorder top-level es to match en + de canonical order pattern
    # Strategy: keep es-only namespaces (dashboard, common, worksheetSamples) in place;
    # insert new 4 in alphabetical position by writing them where en has them in alpha order.
    # Simpler: just write es with a reproducible sort: en's order for shared keys, then
    # es-only namespaces appended.
    en_keys = list(en.keys())
    es_only_keys = [k for k in es.keys() if k not in en_keys]
    final = {}
    # Pass 1: keys that exist in both en + es, in en order
    for k in en_keys:
        if k in es:
            final[k] = es[k]
    # Pass 2: es-only namespaces (after en-shared block)
    for k in es_only_keys:
        final[k] = es[k]

    # Verify nothing lost
    assert set(final.keys()) == set(es.keys()), 'top-level key set diverged during reorder'
    assert len(final) == len(es), 'top-level key count diverged during reorder'

    # Write back
    with open(es_path, 'w', encoding='utf-8', newline='\n') as f:
        json.dump(final, f, ensure_ascii=False, indent=2)
        f.write('\n')

    print()
    print(f'=== Apply OK ===')
    print(f'pre  es top-level: {len(pre_top)} -> post: {len(final)} (+4)')
    print(f'pre  es Wave-2 leaves: 0 -> post: {new_total} (+112)')
    print(f'top-level order: en-shared first ({len([k for k in en_keys if k in final])}), then es-only ({len(es_only_keys)})')


if __name__ == '__main__':
    main()
