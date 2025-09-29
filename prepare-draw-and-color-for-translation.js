/**
 * DRAW AND COLOR TRANSLATION PREPARATION SCRIPT
 * Line-by-line implementation guide for Draw and Color app
 *
 * This script provides exact line numbers and changes needed
 * to implement the complete translation system
 */

const DRAW_COLOR_PREPARATION = {
  app: "draw and color.html",
  totalLines: 2376,
  totalTranslatableTexts: 169,
  currentCoverage: "0.6%",
  targetCoverage: "100%",

  criticalItems: {
    background: { line: 689, importance: "USER-MENTIONED", key: "drawcolor.background.title" },
    border: { line: 698, importance: "USER-MENTIONED", key: "drawcolor.border.title" },
    grayscale: { line: 792, importance: "USER-MENTIONED", key: "common.grayscale" }
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
          line: 689,
          action: "REPLACE",
          old: '<h4>Background</h4>',
          new: '<h4 data-translate="drawcolor.background.title">Background</h4>'
        },
        {
          line: 698,
          action: "REPLACE",
          old: '<h4>Border</h4>',
          new: '<h4 data-translate="drawcolor.border.title">Border</h4>'
        },
        {
          line: 792,
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
          old: '<title>Grid Drawing Worksheet Generator</title>',
          new: '<title data-translate="drawcolor.page.title">Grid Drawing Worksheet Generator</title>'
        },
        {
          line: 589,
          action: "REPLACE",
          old: '<h2>Grid Drawing</h2>',
          new: '<h2 data-translate="drawcolor.title">Grid Drawing</h2>'
        },
        {
          line: 594,
          action: "VERIFY",
          current: '<label data-translate-key="language.label">Language:</label>',
          note: "Already has data-translate-key, update to data-translate"
        }
      ]
    },

    {
      phase: 3,
      name: "Worksheet Setup Section",
      description: "Add translations for grid-specific settings",
      changes: [
        {
          line: 612,
          action: "REPLACE",
          old: '<button class="accordion-button active">Worksheet Setup</button>',
          new: '<button class="accordion-button active" data-translate="drawcolor.worksheet.setup">Worksheet Setup</button>'
        },
        {
          line: 614,
          action: "REPLACE",
          old: '<label>Rows (3-10)</label>',
          new: '<label data-translate="drawcolor.rows.label">Rows (3-10)</label>'
        },
        {
          line: 616,
          action: "REPLACE",
          old: '<label>Columns (3-10)</label>',
          new: '<label data-translate="drawcolor.columns.label">Columns (3-10)</label>'
        },
        {
          line: 618,
          action: "REPLACE",
          old: '<label>Clue Cells (%)</label>',
          new: '<label data-translate="drawcolor.clue.cells">Clue Cells (%)</label>'
        },
        {
          line: 623,
          action: "REPLACE",
          old: '<label>Mirror Clue Cells</label>',
          new: '<label data-translate="drawcolor.mirror.clue">Mirror Clue Cells</label>'
        },
        {
          line: 625,
          action: "REPLACE",
          old: '<option value="none">None (Random)</option>',
          new: '<option value="none" data-translate="drawcolor.mirror.none">None (Random)</option>'
        },
        {
          line: 626,
          action: "REPLACE",
          old: '<option value="horizontal">Horizontal</option>',
          new: '<option value="horizontal" data-translate="drawcolor.mirror.horizontal">Horizontal</option>'
        },
        {
          line: 627,
          action: "REPLACE",
          old: '<option value="vertical">Vertical</option>',
          new: '<option value="vertical" data-translate="drawcolor.mirror.vertical">Vertical</option>'
        },
        {
          line: 630,
          action: "REPLACE",
          old: '<label>Part to Reveal</label>',
          new: '<label data-translate="drawcolor.part.reveal">Part to Reveal</label>'
        },
        {
          line: 636,
          action: "REPLACE",
          old: '<label for="includeNameDate">Include Name/Date Fields</label>',
          new: '<label for="includeNameDate" data-translate="drawcolor.include.name.date">Include Name/Date Fields</label>'
        }
      ]
    },

    {
      phase: 4,
      name: "JavaScript Message Replacements",
      description: "Replace all hardcoded JavaScript messages",
      changes: [
        {
          line: 965,
          action: "REPLACE",
          old: "allOption.textContent = 'All Themes';",
          new: "allOption.textContent = t('drawcolor.themes.all');"
        },
        {
          line: 979,
          action: "REPLACE",
          old: "showMessage('Could not load themes.', 'error');",
          new: "showMessage(t('drawcolor.msg.themes.error'), 'error');"
        },
        {
          line: 1025,
          action: "REPLACE",
          old: "dictionary.innerHTML = '<p class=\"dictionary-message\">Loading default theme...</p>';",
          new: "dictionary.innerHTML = `<p class=\"dictionary-message\">${t('drawcolor.msg.loading.default')}</p>`;"
        },
        {
          line: 1030,
          action: "REPLACE",
          old: "dictionary.innerHTML = '<p class=\"dictionary-message\">Searching...</p>';",
          new: "dictionary.innerHTML = `<p class=\"dictionary-message\">${t('drawcolor.msg.searching')}</p>`;"
        },
        {
          line: 1032,
          action: "REPLACE",
          old: 'showMessage(`Failed to search for "${query}"`, \'error\');',
          new: "showMessage(formatTranslation(t('drawcolor.msg.search.error'), {query: query}), 'error');"
        },
        {
          line: 1047,
          action: "REPLACE",
          old: "dictionary.innerHTML = `<p class='dictionary-message'>No images found${query ? ` for \"${query}\"` : ''}</p>`;",
          new: "dictionary.innerHTML = `<p class='dictionary-message'>${formatTranslation(t('drawcolor.msg.no.images'), {query: query ? ` for \"${query}\"` : ''})}</p>`;"
        },
        {
          line: 1186,
          action: "REPLACE",
          old: "textContent: 'New Text',",
          new: "textContent: t('drawcolor.text.default'),"
        },
        {
          line: 1209,
          action: "REPLACE",
          old: "showMessage('Text added.', 'success');",
          new: "showMessage(t('drawcolor.msg.text.added'), 'success');"
        },
        {
          line: 1541,
          action: "REPLACE",
          old: "showMessage('Please select an image first.', 'error');",
          new: "showMessage(t('drawcolor.msg.select.image'), 'error');"
        },
        {
          line: 1653,
          action: "REPLACE",
          old: "showMessage('Worksheet generated!', 'success');",
          new: "showMessage(t('drawcolor.msg.worksheet.generated'), 'success');"
        },
        {
          line: 1655,
          action: "REPLACE",
          old: "console.error('Failed to load image.');",
          new: "console.error(t('drawcolor.msg.image.error'));"
        },
        {
          line: 1662,
          action: "REPLACE",
          old: "nameText.text = 'Name: _____________________';",
          new: "nameText.text = t('drawcolor.name.field');"
        },
        {
          line: 1663,
          action: "REPLACE",
          old: "dateText.text = 'Date: ___________';",
          new: "dateText.text = t('drawcolor.date.field');"
        },
        {
          line: 1699,
          action: "REPLACE",
          old: "showMessage('All settings cleared.', 'success');",
          new: "showMessage(t('drawcolor.msg.cleared'), 'success');"
        },
        {
          line: 1838,
          action: "REPLACE",
          old: "showMessage('Grayscale conversion failed.', 'error');",
          new: "showMessage(t('drawcolor.msg.grayscale.error'), 'error');"
        },
        {
          line: 1847,
          action: "REPLACE",
          old: "showMessage('Canvas is empty. Nothing to download.', 'error');",
          new: "showMessage(t('drawcolor.msg.canvas.empty'), 'error');"
        },
        {
          line: 1849,
          action: "REPLACE",
          old: "showMessage('Preparing JPEG download...', 'info');",
          new: "showMessage(t('drawcolor.msg.preparing.jpeg'), 'info');"
        },
        {
          line: 1863,
          action: "REPLACE",
          old: "showMessage('Download initiated!', 'success');",
          new: "showMessage(t('drawcolor.msg.download.initiated'), 'success');"
        },
        {
          line: 1865,
          action: "REPLACE",
          old: "showMessage('Error preparing JPEG.', 'error');",
          new: "showMessage(t('drawcolor.msg.jpeg.error'), 'error');"
        },
        {
          line: 1871,
          action: "REPLACE",
          old: "showMessage('Preparing PDF download...', 'info');",
          new: "showMessage(t('drawcolor.msg.preparing.pdf'), 'info');"
        },
        {
          line: 1875,
          action: "REPLACE",
          old: "showMessage('PDF downloaded!', 'success');",
          new: "showMessage(t('drawcolor.msg.pdf.success'), 'success');"
        },
        {
          line: 1877,
          action: "REPLACE",
          old: "showMessage('Error preparing PDF.', 'error');",
          new: "showMessage(t('drawcolor.msg.pdf.error'), 'error');"
        },
        {
          line: 2153,
          action: "REPLACE",
          old: "showMessage('Processing uploaded image...', 'info');",
          new: "showMessage(t('drawcolor.msg.processing.upload'), 'info');"
        },
        {
          line: 2169,
          action: "REPLACE",
          old: "showMessage('Image uploaded successfully.', 'success');",
          new: "showMessage(t('drawcolor.msg.upload.success'), 'success');"
        },
        {
          line: 2174,
          action: "REPLACE",
          old: "showMessage('Error reading uploaded image.', 'error');",
          new: "showMessage(t('drawcolor.msg.upload.error'), 'error');"
        }
      ]
    },

    {
      phase: 5,
      name: "Complete HTML Element Translation",
      description: "Add data-translate to all remaining HTML elements",
      htmlElements: {
        languageSection: { lines: "596-606", count: 11 },
        textTools: { lines: "642-662", count: 11 },
        pageSetup: { lines: "666-706", count: 20 },
        imageLibrary: { lines: "712-724", count: 9 },
        uploadSection: { lines: "728-735", count: 4 },
        toolbar: { lines: "749-781", count: 14 },
        actionButtons: { lines: "785-796", count: 5 },
        fontOptions: { lines: "652-658", count: 7 }
      }
    },

    {
      phase: 6,
      name: "Dynamic Content Updates",
      description: "Handle dynamically updated content",
      changes: [
        {
          line: 1003,
          action: "UPDATE",
          description: "Update uploadedImageDisplay content",
          old: "uploadedImageDisplay.innerHTML = '<p>No image uploaded.</p>';",
          new: "uploadedImageDisplay.innerHTML = `<p>${t('drawcolor.no.upload')}</p>`;"
        },
        {
          line: 1086,
          action: "UPDATE",
          description: "Update selectedImageDisplay content",
          old: "selectedImageDisplay.innerHTML = '<p>No image selected.</p>';",
          new: "selectedImageDisplay.innerHTML = `<p>${t('drawcolor.no.image.selected')}</p>`;"
        },
        {
          line: 1747,
          action: "UPDATE",
          description: "Update asset select message",
          old: "`Select a theme to see ${type}.`",
          new: "formatTranslation(t('drawcolor.asset.select'), {type: type})"
        },
        {
          line: 1758,
          action: "UPDATE",
          description: "Update loading theme message",
          old: "`Loading ${theme}...`",
          new: "formatTranslation(t('drawcolor.msg.loading.theme'), {theme: theme})"
        },
        {
          line: 1767,
          action: "UPDATE",
          description: "Update no assets message",
          old: "`No ${type} in this theme.`",
          new: "formatTranslation(t('drawcolor.asset.none'), {type: type})"
        },
        {
          line: 1782,
          action: "UPDATE",
          description: "Update asset error message",
          old: "`Error loading ${type}.`",
          new: "formatTranslation(t('drawcolor.asset.error'), {type: type})"
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
          lines: [692, 701, 1721],
          note: "Used for 'None' option in multiple places"
        },
        {
          key: "drawcolor.no.upload",
          lines: [734, 1003, 1684, 2163],
          note: "No image uploaded message"
        },
        {
          key: "drawcolor.border.message",
          lines: [706, 1680],
          note: "Select theme for borders"
        },
        {
          key: "drawcolor.background.message",
          lines: [694, 1674],
          note: "Select theme for backgrounds"
        },
        {
          key: "drawcolor.no.image.selected",
          lines: [722, 1086],
          note: "No image selected message"
        },
        {
          key: "drawcolor.msg.canvas.empty",
          lines: [1847, 1869],
          note: "Canvas empty message"
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
        "Check grid drawing functionality works",
        "Test mirror options (horizontal, vertical, none)",
        "Verify image upload workflow",
        "Test clue cells percentage settings",
        "Verify part reveal selection",
        "Test all download options",
        "Ensure no English text when using non-English locale",
        "Check console for translation warnings"
      ]
    }
  ],

  summary: {
    totalHTMLChanges: 168,
    totalJSChanges: 43,
    criticalItems: 3,
    estimatedTime: "30-45 minutes",
    complexity: "High - Grid drawing specific features"
  }
};

// Helper function to generate HTML changes
function generateHTMLChanges() {
  const changes = [];

  // Language options
  for (let i = 596; i <= 606; i++) {
    const languages = ['english', 'german', 'french', 'spanish', 'portuguese', 'italian', 'dutch', 'swedish', 'danish', 'norwegian', 'finnish'];
    const index = i - 596;
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
  for (let i = 652; i <= 658; i++) {
    const index = i - 652;
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
  module.exports = DRAW_COLOR_PREPARATION;
}

console.log(`
📋 DRAW AND COLOR TRANSLATION PREPARATION
==========================================
App: ${DRAW_COLOR_PREPARATION.app}
Current Coverage: ${DRAW_COLOR_PREPARATION.currentCoverage}
Target Coverage: ${DRAW_COLOR_PREPARATION.targetCoverage}
Total Changes Needed: ${DRAW_COLOR_PREPARATION.summary.totalHTMLChanges + DRAW_COLOR_PREPARATION.summary.totalJSChanges}

🔴 CRITICAL ITEMS (User-mentioned):
- Background (line ${DRAW_COLOR_PREPARATION.criticalItems.background.line})
- Border (line ${DRAW_COLOR_PREPARATION.criticalItems.border.line})
- Grayscale (line ${DRAW_COLOR_PREPARATION.criticalItems.grayscale.line})

⏱️ Estimated Implementation Time: ${DRAW_COLOR_PREPARATION.summary.estimatedTime}

📌 Implementation Order:
${DRAW_COLOR_PREPARATION.phases.map((p, i) => `${i + 1}. ${p.name} - ${p.description}`).join('\n')}

✅ Ready for translation implementation!
`);