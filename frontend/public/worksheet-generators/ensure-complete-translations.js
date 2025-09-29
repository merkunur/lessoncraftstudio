/**
 * COMPREHENSIVE TRANSLATION COVERAGE SCRIPT
 * Ensures ALL UI text is translated properly
 */

const fs = require('fs').promises;
const path = require('path');

async function ensureCompleteTranslations() {
    console.log('🔍 Ensuring complete translation coverage...\n');

    // ALL texts that MUST be translated for wordsearch.html
    const requiredTranslations = {
        // Critical missing texts identified by user
        "background_heading": {
            en: "Background",
            de: "Hintergrund",
            sv: "Bakgrund",
            no: "Bakgrunn",
            da: "Baggrund",
            fi: "Tausta",
            fr: "Arrière-plan",
            es: "Fondo",
            pt: "Fundo",
            it: "Sfondo",
            nl: "Achtergrond"
        },
        "border_heading": {
            en: "Border",
            de: "Rahmen",
            sv: "Ram",
            no: "Ramme",
            da: "Ramme",
            fi: "Reunus",
            fr: "Bordure",
            es: "Borde",
            pt: "Borda",
            it: "Bordo",
            nl: "Rand"
        },
        "choose_files_button": {
            en: "Choose files",
            de: "Dateien auswählen",
            sv: "Välj filer",
            no: "Velg filer",
            da: "Vælg filer",
            fi: "Valitse tiedostoja",
            fr: "Choisir des fichiers",
            es: "Elegir archivos",
            pt: "Escolher arquivos",
            it: "Scegli file",
            nl: "Bestanden kiezen"
        },
        "no_file_chosen_text": {
            en: "No file chosen",
            de: "Keine Datei ausgewählt",
            sv: "Ingen fil vald",
            no: "Ingen fil valgt",
            da: "Ingen fil valgt",
            fi: "Ei tiedostoa valittu",
            fr: "Aucun fichier choisi",
            es: "Ningún archivo elegido",
            pt: "Nenhum arquivo escolhido",
            it: "Nessun file scelto",
            nl: "Geen bestand gekozen"
        },
        "grayscale": {
            en: "Grayscale",
            de: "Graustufen",
            sv: "Gråskala",
            no: "Gråtoner",
            da: "Gråtoner",
            fi: "Harmaasävy",
            fr: "Niveaux de gris",
            es: "Escala de grises",
            pt: "Escala de cinza",
            it: "Scala di grigi",
            nl: "Grijstinten"
        },

        // Accordion headings
        "select_language_heading": {
            en: "Select Language",
            de: "Sprache wählen",
            sv: "Välj språk",
            no: "Velg språk",
            da: "Vælg sprog",
            fi: "Valitse kieli",
            fr: "Sélectionner la langue",
            es: "Seleccionar idioma",
            pt: "Selecionar idioma",
            it: "Seleziona lingua",
            nl: "Selecteer taal"
        },
        "page_setup_heading": {
            en: "Page Setup",
            de: "Seiteneinrichtung",
            sv: "Sidinställningar",
            no: "Sideinnstillinger",
            da: "Sideopsætning",
            fi: "Sivun asetukset",
            fr: "Mise en page",
            es: "Configuración de página",
            pt: "Configuração da página",
            it: "Impostazione pagina",
            nl: "Pagina-instelling"
        },
        "add_new_text_heading": {
            en: "Add New Text",
            de: "Neuen Text hinzufügen",
            sv: "Lägg till ny text",
            no: "Legg til ny tekst",
            da: "Tilføj ny tekst",
            fi: "Lisää uusi teksti",
            fr: "Ajouter un nouveau texte",
            es: "Agregar nuevo texto",
            pt: "Adicionar novo texto",
            it: "Aggiungi nuovo testo",
            nl: "Nieuwe tekst toevoegen"
        },
        "selected_text_properties": {
            en: "Selected Text Properties",
            de: "Eigenschaften des ausgewählten Textes",
            sv: "Egenskaper för vald text",
            no: "Egenskaper for valgt tekst",
            da: "Egenskaber for valgt tekst",
            fi: "Valitun tekstin ominaisuudet",
            fr: "Propriétés du texte sélectionné",
            es: "Propiedades del texto seleccionado",
            pt: "Propriedades do texto selecionado",
            it: "Proprietà del testo selezionato",
            nl: "Eigenschappen van geselecteerde tekst"
        },
        "grid_size_heading": {
            en: "Grid Size",
            de: "Rastergröße",
            sv: "Rutnätsstorlek",
            no: "Rutenettsstørrelse",
            da: "Gitterstørrelse",
            fi: "Ruudukon koko",
            fr: "Taille de la grille",
            es: "Tamaño de la cuadrícula",
            pt: "Tamanho da grade",
            it: "Dimensione griglia",
            nl: "Rastergrootte"
        },
        "puzzle_options_heading": {
            en: "Puzzle Options",
            de: "Rätsel-Optionen",
            sv: "Pusselalternativ",
            no: "Puslespillalternativer",
            da: "Puslespilmuligheder",
            fi: "Palapelin asetukset",
            fr: "Options de puzzle",
            es: "Opciones del rompecabezas",
            pt: "Opções do quebra-cabeça",
            it: "Opzioni puzzle",
            nl: "Puzzelopties"
        },
        "image_source_heading": {
            en: "Image Source for Puzzle",
            de: "Bildquelle für Rätsel",
            sv: "Bildkälla för pussel",
            no: "Bildekilde for puslespill",
            da: "Billedkilde til puslespil",
            fi: "Kuvalähde palapeliin",
            fr: "Source d'image pour le puzzle",
            es: "Fuente de imagen para el rompecabezas",
            pt: "Fonte de imagem para o quebra-cabeça",
            it: "Fonte immagine per il puzzle",
            nl: "Afbeeldingsbron voor puzzel"
        },
        "individual_selection_heading": {
            en: "Individual Image Selection",
            de: "Individuelle Bildauswahl",
            sv: "Individuellt bildval",
            no: "Individuelt bildevalg",
            da: "Individuel billedvalg",
            fi: "Yksittäinen kuvavalinta",
            fr: "Sélection d'image individuelle",
            es: "Selección de imagen individual",
            pt: "Seleção de imagem individual",
            it: "Selezione immagine individuale",
            nl: "Individuele afbeeldingsselectie"
        },

        // Puzzle options checkboxes
        "allow_diagonal_words": {
            en: "Allow Diagonal Words",
            de: "Diagonale Wörter erlauben",
            sv: "Tillåt diagonala ord",
            no: "Tillat diagonale ord",
            da: "Tillad diagonale ord",
            fi: "Salli vinot sanat",
            fr: "Autoriser les mots diagonaux",
            es: "Permitir palabras diagonales",
            pt: "Permitir palavras diagonais",
            it: "Consenti parole diagonali",
            nl: "Diagonale woorden toestaan"
        },
        "allow_reverse_words": {
            en: "Allow Reverse Words",
            de: "Rückwärts-Wörter erlauben",
            sv: "Tillåt bakåtord",
            no: "Tillat baklengs ord",
            da: "Tillad omvendte ord",
            fi: "Salli käänteiset sanat",
            fr: "Autoriser les mots inversés",
            es: "Permitir palabras inversas",
            pt: "Permitir palavras inversas",
            it: "Consenti parole inverse",
            nl: "Omgekeerde woorden toestaan"
        },
        "show_word_image_list": {
            en: "Show Word/Image List",
            de: "Wort-/Bildliste anzeigen",
            sv: "Visa ord-/bildlista",
            no: "Vis ord-/bildeliste",
            da: "Vis ord-/billedliste",
            fi: "Näytä sana-/kuvalista",
            fr: "Afficher la liste mot/image",
            es: "Mostrar lista de palabras/imágenes",
            pt: "Mostrar lista de palavras/imagens",
            it: "Mostra lista parole/immagini",
            nl: "Woord-/afbeeldingslijst tonen"
        },

        // Dynamic messages
        "worksheet_generated_successfully": {
            en: "Worksheet generated successfully!",
            de: "Arbeitsblatt erfolgreich erstellt!",
            sv: "Arbetsblad skapades framgångsrikt!",
            no: "Arbeidsark generert vellykket!",
            da: "Arbejdsark genereret succesfuldt!",
            fi: "Tehtäväarkki luotu onnistuneesti!",
            fr: "Feuille de travail générée avec succès!",
            es: "¡Hoja de trabajo generada con éxito!",
            pt: "Folha de trabalho gerada com sucesso!",
            it: "Foglio di lavoro generato con successo!",
            nl: "Werkblad succesvol gegenereerd!"
        },
        "answer_key_generated": {
            en: "Answer key generated!",
            de: "Lösungsschlüssel erstellt!",
            sv: "Facit skapat!",
            no: "Fasit generert!",
            da: "Facit genereret!",
            fi: "Vastausavain luotu!",
            fr: "Corrigé généré!",
            es: "¡Clave de respuesta generada!",
            pt: "Gabarito gerado!",
            it: "Chiave di risposta generata!",
            nl: "Antwoordsleutel gegenereerd!"
        },
        "please_generate_worksheet_first": {
            en: "Please generate a worksheet first.",
            de: "Bitte erstellen Sie zuerst ein Arbeitsblatt.",
            sv: "Vänligen generera ett arbetsblad först.",
            no: "Vennligst generer et arbeidsark først.",
            da: "Generer venligst et arbejdsark først.",
            fi: "Luo ensin tehtäväarkki.",
            fr: "Veuillez d'abord générer une feuille de travail.",
            es: "Por favor, genere primero una hoja de trabajo.",
            pt: "Por favor, gere uma folha de trabalho primeiro.",
            it: "Si prega di generare prima un foglio di lavoro.",
            nl: "Genereer eerst een werkblad."
        }
    };

    try {
        // Load existing translations
        const translationsPath = path.join(__dirname, 'js', 'translations.js');
        let content = await fs.readFile(translationsPath, 'utf-8');

        const match = content.match(/const translations = ({[\s\S]*});/);
        if (!match) {
            console.error('Could not parse translations file');
            return;
        }

        const translations = eval('(' + match[1] + ')');

        // Track statistics
        const stats = {
            added: {},
            updated: {},
            existing: {}
        };

        // Initialize stats for each language
        const languages = ['en', 'de', 'sv', 'no', 'da', 'fi', 'fr', 'es', 'pt', 'it', 'nl'];
        languages.forEach(lang => {
            stats.added[lang] = 0;
            stats.updated[lang] = 0;
            stats.existing[lang] = 0;
            if (!translations[lang]) {
                translations[lang] = {};
            }
        });

        // Add/update all required translations
        Object.entries(requiredTranslations).forEach(([key, langValues]) => {
            languages.forEach(lang => {
                const value = langValues[lang];
                if (value) {
                    if (!translations[lang][key]) {
                        translations[lang][key] = value;
                        stats.added[lang]++;
                        console.log(`✅ Added ${lang.toUpperCase()}: ${key} = "${value}"`);
                    } else if (translations[lang][key] !== value &&
                              (translations[lang][key].includes('[NEEDS_TRANSLATION]') ||
                               translations[lang][key].includes('[TRANSLATE]'))) {
                        translations[lang][key] = value;
                        stats.updated[lang]++;
                        console.log(`📝 Updated ${lang.toUpperCase()}: ${key} = "${value}"`);
                    } else {
                        stats.existing[lang]++;
                    }
                }
            });
        });

        // Generate updated file
        const newContent = `// Translation system for worksheet generators
// Auto-generated on ${new Date().toISOString()}
// Total keys: ${Object.keys(translations.en).length}
// COMPLETE translation coverage for wordsearch.html

const translations = ${JSON.stringify(translations, null, 2)};

// Helper function to get translation
function getTranslation(key, locale = 'en') {
    const localeTranslations = translations[locale] || translations['en'];
    return localeTranslations[key] || key;
}

// Helper function to translate element
function translateElement(element, key, locale = 'en') {
    const translation = getTranslation(key, locale);
    if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
        element.placeholder = translation;
    } else if (element.tagName === 'OPTION' || element.tagName === 'SELECT') {
        element.value = translation;
    } else {
        element.textContent = translation;
    }
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = translations;
}
`;

        await fs.writeFile(translationsPath, newContent);

        console.log('\n' + '='.repeat(60));
        console.log('✅ COMPLETE TRANSLATION COVERAGE ENSURED!');
        console.log('='.repeat(60));

        // Print statistics
        console.log('\n📊 Translation Statistics:\n');
        languages.forEach(lang => {
            const langName = {
                en: 'English', de: 'German', sv: 'Swedish', no: 'Norwegian',
                da: 'Danish', fi: 'Finnish', fr: 'French', es: 'Spanish',
                pt: 'Portuguese', it: 'Italian', nl: 'Dutch'
            }[lang];
            console.log(`${langName}:`.padEnd(12) +
                       `Added: ${stats.added[lang]}`.padEnd(15) +
                       `Updated: ${stats.updated[lang]}`.padEnd(15) +
                       `Existing: ${stats.existing[lang]}`);
        });

        console.log('\n' + '='.repeat(60));
        console.log('🎯 All critical UI elements now have translations!');
        console.log('='.repeat(60));

    } catch (error) {
        console.error('❌ Error:', error);
    }
}

// Run the script
ensureCompleteTranslations();