/**
 * FIND OBJECTS TRANSLATION PREPARATION SCRIPT
 * Line-by-line implementation guide for Find Objects app
 *
 * This script provides exact line numbers and changes needed
 * to implement the complete translation system
 */

const FIND_OBJECTS_PREPARATION = {
  app: "find objects.html",
  totalLines: 2647,
  totalTranslatableTexts: 183,
  currentCoverage: "0.5%",
  targetCoverage: "100%",

  criticalItems: {
    background: { line: 569, importance: "USER-MENTIONED", key: "findobjects.background.title" },
    border: { line: 583, importance: "USER-MENTIONED", key: "findobjects.border.title" },
    grayscale: { line: 731, importance: "USER-MENTIONED", key: "common.grayscale" }
  },

  phases: [
    {
      phase: 1,
      name: "Emergency Foundation",
      description: "Add core translation functions and critical items",
      changes: [
        {
          location: "After line ~300 (in script section)",
          action: "ADD",
          code: `// Translation function
function t(key) {
    if (typeof translations === 'undefined') return key;
    const translation = (translations[currentLocale] && translations[currentLocale][key]) ||
                       (translations.en && translations.en[key]) ||
                       key;
    return translation;
}
window.t = t;

function formatTranslation(text, params) {
    let formatted = text;
    for (const [key, value] of Object.entries(params)) {
        formatted = formatted.replace(new RegExp(\`\\\\{\${key}\\\\}\`, 'g'), value);
    }
    return formatted;
}
window.formatTranslation = formatTranslation;`
        },
        {
          line: 569,
          action: "REPLACE",
          old: '<h4>Background</h4>',
          new: '<h4 data-translate="findobjects.background.title">Background</h4>'
        },
        {
          line: 583,
          action: "REPLACE",
          old: '<h4>Border</h4>',
          new: '<h4 data-translate="findobjects.border.title">Border</h4>'
        },
        {
          line: 731,
          action: "REPLACE",
          old: '<button class="action-button" onclick="toggleGrayscale()">Grayscale</button>',
          new: '<button class="action-button" onclick="toggleGrayscale()" data-translate="common.grayscale">Grayscale</button>'
        }
      ]
    },

    {
      phase: 2,
      name: "Core UI Translation",
      description: "Translate main interface elements",
      changes: [
        {
          line: 6,
          action: "REPLACE",
          old: '<title>SpotWorks - Find the Objects Generator</title>',
          new: '<title data-translate="findobjects.page.title">SpotWorks - Find the Objects Generator</title>'
        },
        {
          line: 528,
          action: "REPLACE",
          old: '<h2>SpotWorks</h2>',
          new: '<h2 data-translate="findobjects.title">SpotWorks</h2>'
        },
        {
          line: 533,
          action: "VERIFY",
          current: '<label data-translate-key="language.label">Language:</label>',
          note: "Already has data-translate-key, update to data-translate"
        },
        {
          line: 739,
          action: "REPLACE",
          old: '<button class="tab-button active" data-tab="worksheetTab">Worksheet</button>',
          new: '<button class="tab-button active" data-tab="worksheetTab" data-translate="findobjects.tab.worksheet">Worksheet</button>'
        },
        {
          line: 740,
          action: "REPLACE",
          old: '<button class="tab-button" data-tab="answerKeyTab">Answer Key</button>',
          new: '<button class="tab-button" data-tab="answerKeyTab" data-translate="findobjects.tab.answer">Answer Key</button>'
        }
      ]
    },

    {
      phase: 3,
      name: "Object Selection Translation",
      description: "Translate unique object selection features",
      changes: [
        {
          line: 652,
          action: "REPLACE",
          old: '<button class="accordion-button">Object Selection</button>',
          new: '<button class="accordion-button" data-translate="findobjects.object.selection">Object Selection</button>'
        },
        {
          line: 654,
          action: "REPLACE",
          old: '<h4>Distractors (Select 8–12)</h4>',
          new: '<h4 data-translate="findobjects.distractors.label">Distractors (Select 8–12)</h4>'
        },
        {
          line: 655,
          action: "REPLACE",
          old: '<label>Or Select Theme for Distractors:</label>',
          new: '<label data-translate="findobjects.distractors.theme">Or Select Theme for Distractors:</label>'
        },
        {
          line: 657,
          action: "REPLACE",
          old: '<option value="">-- No Theme (Use Manual Selection) --</option>',
          new: '<option value="" data-translate="findobjects.no.theme.manual">-- No Theme (Use Manual Selection) --</option>'
        },
        {
          line: 661,
          action: "REPLACE",
          old: '<h4>Hidden Objects (Select 1–5)</h4>',
          new: '<h4 data-translate="findobjects.hidden.label">Hidden Objects (Select 1–5)</h4>'
        },
        {
          line: 662,
          action: "REPLACE",
          old: '<label>Or Select Theme for Hidden Objects:</label>',
          new: '<label data-translate="findobjects.hidden.theme">Or Select Theme for Hidden Objects:</label>'
        },
        {
          line: 664,
          action: "REPLACE",
          old: '<option value="">-- No Theme (Use Manual Selection) --</option>',
          new: '<option value="" data-translate="findobjects.no.theme.manual">-- No Theme (Use Manual Selection) --</option>'
        }
      ]
    },

    {
      phase: 4,
      name: "JavaScript Message Replacements",
      description: "Replace all hardcoded JavaScript messages",
      changes: [
        {
          line: 1207,
          action: "REPLACE",
          old: "showMessage(`${type} theme selected. Manual items cleared.`, 'info');",
          new: "showMessage(formatTranslation(t('findobjects.msg.theme.selected'), {type: type}), 'info');"
        },
        {
          line: 1436,
          action: "REPLACE",
          old: "console.error('Error loading themes.');",
          new: "console.error(t('findobjects.msg.themes.error'));"
        },
        {
          line: 1454,
          action: "REPLACE",
          old: "dictionary.innerHTML = '<p class=\"dictionary-message\">Searching...</p>';",
          new: "dictionary.innerHTML = `<p class=\"dictionary-message\">${t('findobjects.msg.searching')}</p>`;"
        },
        {
          line: 1461,
          action: "REPLACE",
          old: 'console.error(`Error searching for "${query}"`);',
          new: "console.error(formatTranslation(t('findobjects.msg.search.error'), {query: query}));"
        },
        {
          line: 1469,
          action: "REPLACE",
          old: "dictionary.innerHTML = `<p class=\"dictionary-message\">Loading theme: ${theme}...</p>`;",
          new: "dictionary.innerHTML = `<p class=\"dictionary-message\">${formatTranslation(t('findobjects.msg.loading.theme'), {theme: theme})}</p>`;"
        },
        {
          line: 1476,
          action: "REPLACE",
          old: "console.error(`Error loading theme: ${theme}`);",
          new: "console.error(formatTranslation(t('findobjects.msg.theme.error'), {theme: theme}));"
        },
        {
          line: 1478,
          action: "REPLACE",
          old: "showMessage('Failed to load theme.', 'error');",
          new: "showMessage(t('findobjects.msg.theme.failed'), 'error');"
        },
        {
          line: 1500,
          action: "REPLACE",
          old: "showMessage(`Loading ${filesToLoad} image(s)...`, 'info');",
          new: "showMessage(formatTranslation(t('findobjects.msg.loading.uploads'), {count: filesToLoad}), 'info');"
        },
        {
          line: 1514,
          action: "REPLACE",
          old: "showMessage(`${uploadedImages.length} custom image(s) available.`, 'info');",
          new: "showMessage(formatTranslation(t('findobjects.msg.uploads.available'), {count: uploadedImages.length}), 'info');"
        },
        {
          line: 1519,
          action: "REPLACE",
          old: "showMessage(`Error reading file: ${file.name}`, 'error');",
          new: "showMessage(formatTranslation(t('findobjects.msg.file.error'), {filename: file.name}), 'error');"
        },
        {
          line: 1533,
          action: "REPLACE",
          old: "dictionary.innerHTML = `<p class='dictionary-message'>No images found${query ? ` for \"${query}\"` : ''}</p>`;",
          new: "dictionary.innerHTML = `<p class='dictionary-message'>${formatTranslation(t('findobjects.msg.no.images'), {query: query ? ` for \"${query}\"` : ''})}</p>`;"
        },
        {
          line: 1565,
          action: "REPLACE",
          old: "showMessage('Image already selected in one of the categories.', 'warning');",
          new: "showMessage(t('findobjects.msg.already.selected'), 'warning');"
        },
        {
          line: 1568,
          action: "REPLACE",
          old: "showMessage(`Cannot add more than ${limit} ${category} images.`, 'warning');",
          new: "showMessage(formatTranslation(t('findobjects.msg.selection.limit'), {limit: limit, category: category}), 'warning');"
        },
        {
          line: 1618,
          action: "REPLACE",
          old: "showMessage('Generating worksheet...', 'info');",
          new: "showMessage(t('findobjects.msg.generating'), 'info');"
        },
        {
          line: 1622,
          action: "REPLACE",
          old: "showMessage('Image preparation failed. Please check selections.', 'error');",
          new: "showMessage(t('findobjects.msg.prep.failed'), 'error');"
        },
        {
          line: 1632,
          action: "REPLACE",
          old: "showMessage('Worksheet generated successfully!', 'success');",
          new: "showMessage(t('findobjects.msg.worksheet.success'), 'success');"
        },
        {
          line: 1635,
          action: "REPLACE",
          old: "showMessage('An unexpected error occurred. Please try again.', 'error');",
          new: "showMessage(t('findobjects.msg.unexpected.error'), 'error');"
        },
        {
          line: 1643,
          action: "REPLACE",
          old: "showMessage('Please generate a worksheet first.', 'error');",
          new: "showMessage(t('findobjects.msg.generate.first'), 'error');"
        },
        {
          line: 1646,
          action: "REPLACE",
          old: "showMessage('Generating Answer Key...', 'info');",
          new: "showMessage(t('findobjects.msg.generating.answer'), 'info');"
        },
        {
          line: 1728,
          action: "REPLACE",
          old: "showMessage('Answer Key Generated.', 'success');",
          new: "showMessage(t('findobjects.msg.answer.generated'), 'success');"
        },
        {
          line: 1746,
          action: "REPLACE",
          old: "showMessage(`Could not load images for ${type} theme.`, 'error');",
          new: "showMessage(formatTranslation(t('findobjects.msg.theme.load.error'), {type: type}), 'error');"
        },
        {
          line: 1754,
          action: "REPLACE",
          old: "showMessage('Distractor theme has fewer than 8 images.', 'warning');",
          new: "showMessage(t('findobjects.msg.distractor.insufficient'), 'warning');"
        },
        {
          line: 1758,
          action: "REPLACE",
          old: "showMessage('Hidden Object theme has fewer than 1 image.', 'warning');",
          new: "showMessage(t('findobjects.msg.hidden.insufficient'), 'warning');"
        },
        {
          line: 2015,
          action: "REPLACE",
          old: "nameText.text = 'Name: _______________________';",
          new: "nameText.text = t('findobjects.name.field');"
        },
        {
          line: 2016,
          action: "REPLACE",
          old: "dateText.text = 'Date: ___________';",
          new: "dateText.text = t('findobjects.date.field');"
        },
        {
          line: 2062,
          action: "REPLACE",
          old: "textContent: 'New Text',",
          new: "textContent: t('findobjects.text.default'),"
        },
        {
          line: 2146,
          action: "REPLACE",
          old: "showMessage('All settings cleared.', 'success');",
          new: "showMessage(t('findobjects.msg.cleared'), 'success');"
        },
        {
          line: 2155,
          action: "REPLACE",
          old: "showMessage('Grayscale conversion failed.', 'error');",
          new: "showMessage(t('findobjects.msg.grayscale.error'), 'error');"
        },
        {
          line: 2164,
          action: "REPLACE",
          old: "showMessage('Canvas is empty. Nothing to download.', 'error');",
          new: "showMessage(t('findobjects.msg.canvas.empty'), 'error');"
        },
        {
          line: 2166,
          action: "REPLACE",
          old: "showMessage('Preparing JPEG download...', 'info');",
          new: "showMessage(t('findobjects.msg.preparing.jpeg'), 'info');"
        },
        {
          line: 2180,
          action: "REPLACE",
          old: "showMessage('Download initiated!', 'success');",
          new: "showMessage(t('findobjects.msg.download.initiated'), 'success');"
        },
        {
          line: 2182,
          action: "REPLACE",
          old: "showMessage('Error preparing JPEG.', 'error');",
          new: "showMessage(t('findobjects.msg.jpeg.error'), 'error');"
        },
        {
          line: 2282,
          action: "REPLACE",
          old: "showMessage('PDF downloaded!', 'success');",
          new: "showMessage(t('findobjects.msg.pdf.success'), 'success');"
        },
        {
          line: 2283,
          action: "REPLACE",
          old: "showMessage('Error preparing PDF.', 'error');",
          new: "showMessage(t('findobjects.msg.pdf.error'), 'error');"
        },
        {
          line: 2404,
          action: "REPLACE",
          old: "borderDictionary.innerHTML = '<p>No borders in this theme.</p>';",
          new: "borderDictionary.innerHTML = `<p>${t('findobjects.msg.no.borders')}</p>`;"
        },
        {
          line: 2415,
          action: "REPLACE",
          old: "borderDictionary.innerHTML = '<p>Error loading border images.</p>';",
          new: "borderDictionary.innerHTML = `<p>${t('findobjects.msg.border.error')}</p>`;"
        },
        {
          line: 2448,
          action: "REPLACE",
          old: "backgroundDictionary.innerHTML = '<p>No backgrounds in this theme.</p>';",
          new: "backgroundDictionary.innerHTML = `<p>${t('findobjects.msg.no.backgrounds')}</p>`;"
        },
        {
          line: 2456,
          action: "REPLACE",
          old: "backgroundDictionary.innerHTML = '<p>Error loading background images.</p>';",
          new: "backgroundDictionary.innerHTML = `<p>${t('findobjects.msg.background.error')}</p>`;"
        }
      ]
    },

    {
      phase: 5,
      name: "Complete HTML Element Translation",
      description: "Add data-translate to all remaining HTML elements",
      htmlElements: {
        languageSection: { lines: "535-545", count: 11 },
        pageSceneSection: { lines: "550-591", count: 18 },
        textContentSection: { lines: "595-621", count: 14 },
        imageLibrary: { lines: "625-636", count: 8 },
        uploadSection: { lines: "640-647", count: 4 },
        toolbar: { lines: "680-712", count: 14 },
        actionButtons: { lines: "717-735", count: 9 },
        fontOptions: { lines: "606-612", count: 7 }
      }
    },

    {
      phase: 6,
      name: "Dynamic Content Updates",
      description: "Handle dynamically updated content",
      changes: [
        {
          line: 2352,
          action: "UPDATE",
          description: "Update None option for border theme",
          old: "noneOption.textContent = 'None';",
          new: "noneOption.textContent = t('common.none');"
        },
        {
          line: 2376,
          action: "UPDATE",
          description: "Update None option for background theme",
          old: "noneOption.textContent = 'None';",
          new: "noneOption.textContent = t('common.none');"
        },
        {
          line: 2388,
          action: "UPDATE",
          description: "Update border selection message",
          old: "borderDictionary.innerHTML = '<p>Select a theme to see borders.</p>';",
          new: "borderDictionary.innerHTML = `<p>${t('findobjects.border.message')}</p>`;"
        },
        {
          line: 2396,
          action: "UPDATE",
          description: "Update border loading message",
          old: "borderDictionary.innerHTML = `<p>Loading ${theme}...</p>`;",
          new: "borderDictionary.innerHTML = `<p>${formatTranslation(t('findobjects.msg.loading.theme'), {theme: theme})}</p>`;"
        },
        {
          line: 2432,
          action: "UPDATE",
          description: "Update background selection message",
          old: "backgroundDictionary.innerHTML = '<p>Select a theme for backgrounds.</p>';",
          new: "backgroundDictionary.innerHTML = `<p>${t('findobjects.background.message')}</p>`;"
        },
        {
          line: 2440,
          action: "UPDATE",
          description: "Update background loading message",
          old: "backgroundDictionary.innerHTML = `<p>Loading ${theme}...</p>`;",
          new: "backgroundDictionary.innerHTML = `<p>${formatTranslation(t('findobjects.msg.loading.theme'), {theme: theme})}</p>`;"
        }
      ]
    },

    {
      phase: 7,
      name: "Shared Message Consolidation",
      description: "Handle duplicated messages with shared keys",
      duplicates: [
        {
          key: "common.none",
          lines: [586, 2352, 2376],
          note: "Used for 'None' option in multiple places"
        },
        {
          key: "findobjects.no.theme.manual",
          lines: [657, 664],
          note: "No theme manual selection option"
        },
        {
          key: "findobjects.border.message",
          lines: [588, 2388],
          note: "Select theme for borders"
        },
        {
          key: "findobjects.background.message",
          lines: [579, 2432],
          note: "Select theme for backgrounds"
        },
        {
          key: "findobjects.msg.loading.theme",
          lines: [1469, 2396, 2440],
          note: "Loading theme messages"
        }
      ]
    },

    {
      phase: 8,
      name: "Testing and Validation",
      description: "Test complete translation implementation",
      tests: [
        "Test with ?locale=de to verify German structure",
        "Test with ?locale=sv to verify Swedish structure",
        "Check distractor selection (8-12 images)",
        "Check hidden object selection (1-5 images)",
        "Verify theme-based selection works",
        "Verify manual selection works",
        "Test child-friendly decorations option",
        "Test all download options",
        "Ensure no English text when using non-English locale",
        "Check console for translation warnings"
      ]
    }
  ],

  summary: {
    totalHTMLChanges: 182,
    totalJSChanges: 47,
    criticalItems: 3,
    estimatedTime: "30-45 minutes",
    complexity: "High - Object selection specific features"
  }
};

// Helper function to generate HTML changes
function generateHTMLChanges() {
  const changes = [];

  // Language options
  for (let i = 535; i <= 545; i++) {
    const languages = ['english', 'german', 'french', 'spanish', 'portuguese', 'italian', 'dutch', 'swedish', 'danish', 'norwegian', 'finnish'];
    const index = i - 535;
    if (languages[index]) {
      changes.push({
        line: i,
        key: `language.${languages[index]}`,
        element: 'option'
      });
    }
  }

  // Font options
  const fonts = ['lexend', 'baloo', 'nunito', 'quicksand', 'fredoka', 'arial', 'verdana'];
  for (let i = 606; i <= 612; i++) {
    const index = i - 606;
    if (fonts[index]) {
      changes.push({
        line: i,
        key: `font.${fonts[index]}`,
        element: 'option'
      });
    }
  }

  return changes;
}

// Export the preparation guide
if (typeof module !== 'undefined' && module.exports) {
  module.exports = FIND_OBJECTS_PREPARATION;
}

console.log(`
📋 FIND OBJECTS TRANSLATION PREPARATION
==========================================
App: ${FIND_OBJECTS_PREPARATION.app}
Current Coverage: ${FIND_OBJECTS_PREPARATION.currentCoverage}
Target Coverage: ${FIND_OBJECTS_PREPARATION.targetCoverage}
Total Changes Needed: ${FIND_OBJECTS_PREPARATION.summary.totalHTMLChanges + FIND_OBJECTS_PREPARATION.summary.totalJSChanges}

🔴 CRITICAL ITEMS (User-mentioned):
- Background (line ${FIND_OBJECTS_PREPARATION.criticalItems.background.line})
- Border (line ${FIND_OBJECTS_PREPARATION.criticalItems.border.line})
- Grayscale (line ${FIND_OBJECTS_PREPARATION.criticalItems.grayscale.line})

⏱️ Estimated Implementation Time: ${FIND_OBJECTS_PREPARATION.summary.estimatedTime}

📌 Implementation Order:
${FIND_OBJECTS_PREPARATION.phases.map((p, i) => `${i + 1}. ${p.name} - ${p.description}`).join('\n')}

✅ Ready for translation implementation!
`);