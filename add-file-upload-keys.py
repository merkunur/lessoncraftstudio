import re

# Read the file
with open('frontend/public/worksheet-generators/js/translations-missing-pieces.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Keys to add for each language
keys_to_add = {
    'fr': {
        'chooseFiles': 'Choisir des fichiers',
        'noFileChosen': 'Aucun fichier sélectionné',
        'filesSelected': '{count} fichier(s) sélectionné(s)'
    },
    'es': {
        'chooseFiles': 'Elegir archivos',
        'noFileChosen': 'Ningún archivo seleccionado',
        'filesSelected': '{count} archivo(s) seleccionado(s)'
    },
    'it': {
        'chooseFiles': 'Scegli file',
        'noFileChosen': 'Nessun file scelto',
        'filesSelected': '{count} file selezionato/i'
    },
    'pt': {
        'chooseFiles': 'Escolher arquivos',
        'noFileChosen': 'Nenhum arquivo escolhido',
        'filesSelected': '{count} arquivo(s) selecionado(s)'
    },
    'nl': {
        'chooseFiles': 'Bestanden kiezen',
        'noFileChosen': 'Geen bestand gekozen',
        'filesSelected': '{count} bestand(en) geselecteerd'
    },
    'sv': {
        'chooseFiles': 'Välj filer',
        'noFileChosen': 'Ingen fil vald',
        'filesSelected': '{count} fil(er) valda'
    },
    'da': {
        'chooseFiles': 'Vælg filer',
        'noFileChosen': 'Ingen fil valgt',
        'filesSelected': '{count} fil(er) valgt'
    },
    'no': {
        'chooseFiles': 'Velg filer',
        'noFileChosen': 'Ingen fil valgt',
        'filesSelected': '{count} fil(er) valgt'
    },
    'fi': {
        'chooseFiles': 'Valitse tiedostot',
        'noFileChosen': 'Ei tiedostoa valittu',
        'filesSelected': '{count} tiedosto(a) valittu'
    }
}

# For each language, add the keys after the opening brace
for lang, keys in keys_to_add.items():
    # Find the pattern: "lang": {
    pattern = rf'("{lang}": \{{)\s*\n\s*("common\.)'

    # Build replacement with new keys
    new_keys_str = ''
    for key, value in keys.items():
        value_escaped = value.replace('\\', '\\\\').replace('"', '\\"')
        new_keys_str += f'    "{key}": "{value_escaped}",\n'

    replacement = rf'\1\n{new_keys_str}    \2'

    content = re.sub(pattern, replacement, content)
    print(f"Added keys for {lang}")

# Write back
with open('frontend/public/worksheet-generators/js/translations-missing-pieces.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("\nAll file upload keys added successfully!")