/**
 * PREPARE BIG SMALL FOR TRANSLATION (BSTM)
 * Preparation Script for Big & Small App Translation System
 * Version: 1.0.0
 * Generated: December 2024
 *
 * This script documents the EXACT changes needed to implement
 * the complete translation system in the Big & Small app.
 *
 * CRITICAL STATUS: 1.1% coverage (2 of 178 elements have data-translate)
 * PRIORITY ITEMS: Background (line 761), Border (line 767), Grayscale (line 917)
 */

const BIG_SMALL_PREPARATION = {
  /**
   * PHASE 1: EMERGENCY FOUNDATION (IMMEDIATE)
   * Add translation infrastructure
   */
  phase1: {
    description: "Emergency Foundation - Add core translation functions",

    changes: [
      {
        line: "~300",
        action: "ADD",
        description: "Add t() and formatTranslation() functions after currentLocale is set",
        code: `
// Translation helper functions
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
        line: "761",
        action: "CRITICAL UPDATE",
        description: "Add data-translate to Background header",
        from: `<h4>Background</h4>`,
        to: `<h4 data-translate="bigsmall.background.title">Background</h4>`
      },
      {
        line: "767",
        action: "CRITICAL UPDATE",
        description: "Add data-translate to Border header",
        from: `<h4>Border</h4>`,
        to: `<h4 data-translate="bigsmall.border.title">Border</h4>`
      },
      {
        line: "917",
        action: "CRITICAL UPDATE",
        description: "Add data-translate to Grayscale button",
        from: `<button>Grayscale</button>`,
        to: `<button data-translate="common.grayscale">Grayscale</button>`
      }
    ]
  },

  /**
   * PHASE 2: CORE UI TRANSLATION (URGENT)
   * Translate main interface elements
   */
  phase2: {
    description: "Core UI Translation - Main headers and navigation",

    changes: [
      {
        line: "5",
        action: "UPDATE",
        description: "Update page title",
        from: `<title>Big & Small Worksheet Generator</title>`,
        to: `<title data-translate="bigsmall.page.title">Big & Small Worksheet Generator</title>`
      },
      {
        line: "700",
        action: "UPDATE",
        description: "Update settings title",
        from: `<h2>Worksheet Settings</h2>`,
        to: `<h2 data-translate="bigsmall.settings.title">Worksheet Settings</h2>`
      },
      {
        line: "924",
        action: "UPDATE",
        description: "Update worksheet tab",
        from: `<button class="tab-button active" data-tab="worksheetTab">Worksheet</button>`,
        to: `<button class="tab-button active" data-tab="worksheetTab" data-translate="bigsmall.tab.worksheet">Worksheet</button>`
      },
      {
        line: "925",
        action: "UPDATE",
        description: "Update answer key tab",
        from: `<button class="tab-button" data-tab="answerKeyTab">Answer Key</button>`,
        to: `<button class="tab-button" data-tab="answerKeyTab" data-translate="bigsmall.tab.answer">Answer Key</button>`
      }
    ]
  },

  /**
   * PHASE 3: ACCORDION SECTIONS (HIGH)
   * Translate all accordion headers and content
   */
  phase3: {
    description: "Accordion Sections - All configuration panels",

    changes: [
      {
        line: "739",
        action: "UPDATE",
        description: "Page Setup accordion",
        from: `<button class="accordion-button active">Page Setup</button>`,
        to: `<button class="accordion-button active" data-translate="bigsmall.page.setup">Page Setup</button>`
      },
      {
        line: "777",
        action: "UPDATE",
        description: "Text Tools accordion",
        from: `<button class="accordion-button">Text Tools</button>`,
        to: `<button class="accordion-button" data-translate="bigsmall.text.tools">Text Tools</button>`
      },
      {
        line: "801",
        action: "UPDATE",
        description: "Exercise Settings accordion",
        from: `<button class="accordion-button">Exercise Settings</button>`,
        to: `<button class="accordion-button" data-translate="bigsmall.exercise.settings">Exercise Settings</button>`
      },
      {
        line: "832",
        action: "UPDATE",
        description: "Image Library accordion",
        from: `<button class="accordion-button">Image Library</button>`,
        to: `<button class="accordion-button" data-translate="bigsmall.image.library">Image Library</button>`
      },
      {
        line: "847",
        action: "UPDATE",
        description: "Upload accordion",
        from: `<button class="accordion-button">Upload Custom Images</button>`,
        to: `<button class="accordion-button" data-translate="bigsmall.upload.title">Upload Custom Images</button>`
      }
    ]
  },

  /**
   * PHASE 4: EXERCISE SETTINGS (CRITICAL)
   * Translate all exercise-specific settings
   */
  phase4: {
    description: "Exercise Settings - Question types and image modes",

    changes: [
      {
        line: "803",
        action: "UPDATE",
        description: "Exercise count label",
        from: `<label>Number of Exercises (1–10):</label>`,
        to: `<label data-translate="bigsmall.exercise.count">Number of Exercises (1–10):</label>`
      },
      {
        line: "805",
        action: "UPDATE",
        description: "Images per exercise label",
        from: `<label>Images per Exercise:</label>`,
        to: `<label data-translate="bigsmall.images.per.exercise">Images per Exercise:</label>`
      },
      {
        line: "807",
        action: "UPDATE",
        description: "Image mode label",
        from: `<label>Image Mode:</label>`,
        to: `<label data-translate="bigsmall.image.mode">Image Mode:</label>`
      },
      {
        line: "809",
        action: "UPDATE",
        description: "Identical images option",
        from: `<option value="identical">Identical Images</option>`,
        to: `<option value="identical" data-translate="bigsmall.mode.identical">Identical Images</option>`
      },
      {
        line: "810",
        action: "UPDATE",
        description: "Different images option",
        from: `<option value="different">Different Images</option>`,
        to: `<option value="different" data-translate="bigsmall.mode.different">Different Images</option>`
      },
      {
        line: "812",
        action: "UPDATE",
        description: "Question type label",
        from: `<label>Question Type:</label>`,
        to: `<label data-translate="bigsmall.question.type">Question Type:</label>`
      },
      {
        line: "814",
        action: "UPDATE",
        description: "Circle small option",
        from: `<option value="small">Circle the small one</option>`,
        to: `<option value="small" data-translate="bigsmall.type.small">Circle the small one</option>`
      },
      {
        line: "815",
        action: "UPDATE",
        description: "Circle big option",
        from: `<option value="big">Circle the big one</option>`,
        to: `<option value="big" data-translate="bigsmall.type.big">Circle the big one</option>`
      },
      {
        line: "816",
        action: "UPDATE",
        description: "Circle medium option",
        from: `<option value="medium">Circle the medium one</option>`,
        to: `<option value="medium" data-translate="bigsmall.type.medium">Circle the medium one</option>`
      },
      {
        line: "817",
        action: "UPDATE",
        description: "Number ascending option",
        from: `<option value="asc">Number 1-2-3 (small to big)</option>`,
        to: `<option value="asc" data-translate="bigsmall.type.asc">Number 1-2-3 (small to big)</option>`
      },
      {
        line: "818",
        action: "UPDATE",
        description: "Number descending option",
        from: `<option value="desc">Number 1-2-3 (big to small)</option>`,
        to: `<option value="desc" data-translate="bigsmall.type.desc">Number 1-2-3 (big to small)</option>`
      }
    ]
  },

  /**
   * PHASE 5: ACTION BUTTONS (HIGH)
   * Translate all action buttons
   */
  phase5: {
    description: "Action Buttons - Generate, Download, Clear",

    changes: [
      {
        line: "904",
        action: "UPDATE",
        description: "Generate button",
        from: `<button id="generateBtn" class="action-button accent">Generate</button>`,
        to: `<button id="generateBtn" class="action-button accent" data-translate="bigsmall.generate">Generate</button>`
      },
      {
        line: "906",
        action: "UPDATE",
        description: "Generate worksheet button",
        from: `<span>Generate Worksheet</span>`,
        to: `<span data-translate="bigsmall.generate.worksheet">Generate Worksheet</span>`
      },
      {
        line: "907",
        action: "UPDATE",
        description: "Generate answer key button",
        from: `<span>Generate Answer Key</span>`,
        to: `<span data-translate="bigsmall.generate.answer">Generate Answer Key</span>`
      },
      {
        line: "911",
        action: "UPDATE",
        description: "Download button",
        from: `<button>Download</button>`,
        to: `<button data-translate="bigsmall.download">Download</button>`
      },
      {
        line: "920",
        action: "UPDATE",
        description: "Clear All button",
        from: `<button id="clearBtn" class="action-button danger">Clear All</button>`,
        to: `<button id="clearBtn" class="action-button danger" data-translate="bigsmall.clear.all">Clear All</button>`
      }
    ]
  },

  /**
   * PHASE 6: JAVASCRIPT MESSAGE REPLACEMENT (CRITICAL)
   * Replace all 41 hardcoded messages
   */
  phase6: {
    description: "JavaScript Messages - Replace hardcoded strings",

    errorMessages: [
      {
        line: "1205",
        from: `showMessage(\`Could not load theme: \${theme}\`, "error");`,
        to: `showMessage(formatTranslation(t("bigsmall.msg.theme.error"), {theme: theme}), "error");`
      },
      {
        line: "1238",
        from: `showMessage("Could not load themes.", "error");`,
        to: `showMessage(t("bigsmall.msg.themes.error"), "error");`
      },
      {
        line: "1238",
        from: `console.error("Error loading themes.");`,
        to: `console.error(t("bigsmall.msg.themes.loading.error"));`
      },
      {
        line: "1270",
        from: `showMessage("Error loading images.", "error");`,
        to: `showMessage(t("bigsmall.msg.images.error"), "error");`
      },
      {
        line: "1368",
        from: `showMessage(\`Error reading file: \${file.name}\`, "error");`,
        to: `showMessage(formatTranslation(t("bigsmall.msg.file.error"), {filename: file.name}), "error");`
      },
      {
        line: "1768",
        from: `showMessage("Image pool is empty. Please select images or a valid theme.", "error");`,
        to: `showMessage(t("bigsmall.msg.pool.empty"), "error");`
      },
      {
        line: "1859",
        from: `console.warn("Warning: Too many exercises for page size. Consider reducing count or using larger page.");`,
        to: `console.warn(t("bigsmall.msg.too.many"));`
      },
      {
        line: "2014",
        from: `showMessage("Please generate a worksheet first.", "error");`,
        to: `showMessage(t("bigsmall.msg.generate.first"), "error");`
      },
      {
        line: "2319",
        from: `showMessage("Canvas is empty.", "error");`,
        to: `showMessage(t("bigsmall.msg.canvas.empty"), "error");`
      },
      {
        line: "2337",
        from: `showMessage(\`JPEG Error: \${error.message}\`, "error");`,
        to: `showMessage(formatTranslation(t("bigsmall.msg.jpeg.error"), {message: error.message}), "error");`
      }
    ],

    successMessages: [
      {
        line: "1408",
        from: `showMessage("Text added.", "success");`,
        to: `showMessage(t("bigsmall.msg.text.added"), "success");`
      },
      {
        line: "2005",
        from: `showMessage("Worksheet generated successfully!", "success");`,
        to: `showMessage(t("bigsmall.msg.worksheet.success"), "success");`
      },
      {
        line: "2253",
        from: `showMessage("Answer Key Generated.", "success");`,
        to: `showMessage(t("bigsmall.msg.answer.generated"), "success");`
      },
      {
        line: "2335",
        from: `showMessage("Download started!", "success");`,
        to: `showMessage(t("bigsmall.msg.download.started"), "success");`
      }
    ],

    statusMessages: [
      {
        line: "1219",
        from: `defaultOption.textContent = "All Themes";`,
        to: `defaultOption.textContent = t("bigsmall.themes.all");`
      },
      {
        line: "1226",
        from: `option.textContent = \`\${theme} (random)\`;`,
        to: `option.textContent = \`\${theme} \${t("bigsmall.theme.random")}\`;`
      },
      {
        line: "1253",
        from: `dictionary.innerHTML = '<p class="dictionary-message">Loading animals theme...</p>';`,
        to: `dictionary.innerHTML = \`<p class="dictionary-message">\${t("bigsmall.msg.loading.animals")}</p>\`;`
      },
      {
        line: "1257",
        from: `dictionary.innerHTML = '<p class="dictionary-message">Searching...</p>';`,
        to: `dictionary.innerHTML = \`<p class="dictionary-message">\${t("bigsmall.msg.searching")}</p>\`;`
      },
      {
        line: "1276",
        from: `dictionary.innerHTML = \`<p class='dictionary-message'>No images found\${query ? ' for "' + query + '"' : ''}.</p>\`;`,
        to: `dictionary.innerHTML = \`<p class='dictionary-message'>\${formatTranslation(t("bigsmall.msg.no.images"), {query: query ? ' for "' + query + '"' : ''})}</p>\`;`
      },
      {
        line: "1358",
        from: `selectedCount.textContent = \`Selected: \${selectedImages.length} images\`;`,
        to: `selectedCount.textContent = formatTranslation(t("bigsmall.selected.count"), {count: selectedImages.length});`
      },
      {
        line: "1364",
        from: `showMessage(\`Loading \${filesToLoad} image(s)...\`, "info");`,
        to: `showMessage(formatTranslation(t("bigsmall.msg.loading.uploads"), {count: filesToLoad}), "info");`
      },
      {
        line: "1373",
        from: `showMessage(\`\${uploadedImages.length} custom image(s) available.\`, "info");`,
        to: `showMessage(formatTranslation(t("bigsmall.msg.uploads.available"), {count: uploadedImages.length}), "info");`
      },
      {
        line: "2322",
        from: `showMessage(\`Preparing \${filename}...\`, "info");`,
        to: `showMessage(formatTranslation(t("bigsmall.msg.preparing"), {filename: filename}), "info");`
      },
      {
        line: "1607",
        from: `dictionary.innerHTML = \`<p class="dictionary-message">Select a theme to see \${type}.</p>\`;`,
        to: `dictionary.innerHTML = \`<p class="dictionary-message">\${formatTranslation(t("bigsmall.asset.select"), {type: type})}</p>\`;`
      },
      {
        line: "1617",
        from: `dictionary.innerHTML = \`<p class="dictionary-message">Loading \${type}...</p>\`;`,
        to: `dictionary.innerHTML = \`<p class="dictionary-message">\${formatTranslation(t("bigsmall.asset.loading"), {type: type})}</p>\`;`
      },
      {
        line: "1625",
        from: `dictionary.innerHTML = \`<p class="dictionary-message">No \${type} available.</p>\`;`,
        to: `dictionary.innerHTML = \`<p class="dictionary-message">\${formatTranslation(t("bigsmall.asset.none"), {type: type})}</p>\`;`
      },
      {
        line: "1637",
        from: `showMessage(\`Error loading \${type}.\`, "error");`,
        to: `showMessage(formatTranslation(t("bigsmall.asset.error"), {type: type}), "error");`
      }
    ],

    otherMessages: [
      {
        line: "1382",
        from: `text.set('text', 'New Text');`,
        to: `text.set('text', t('bigsmall.text.default'));`
      },
      {
        line: "1725",
        from: `nameText.text = "Name: ____________________";`,
        to: `nameText.text = t("bigsmall.name.field");`
      },
      {
        line: "1726",
        from: `dateText.text = "Date: ____________________";`,
        to: `dateText.text = t("bigsmall.date.field");`
      },
      {
        line: "2362",
        from: `watermarkText = "FREE VERSION - LessonCraftStudio.com";`,
        to: `watermarkText = t("bigsmall.watermark.text");`
      },
      {
        line: "2381",
        from: `watermarkText = "FREE VERSION";`,
        to: `watermarkText = t("bigsmall.watermark.short");`
      }
    ]
  },

  /**
   * PHASE 7: COMPLETE HTML COVERAGE (MEDIUM)
   * Add data-translate to ALL remaining elements
   */
  phase7: {
    description: "Complete HTML Coverage - All remaining elements",

    totalElements: 178,
    elementsWithDataTranslate: 2,
    currentCoverage: "1.1%",
    targetCoverage: "100%",

    categories: {
      "Language Selection": 11,
      "Page Size Options": 14,
      "Page Setup": 12,
      "Background Section": 5,
      "Border Section": 5,
      "Text Tools": 13,
      "Font Options": 7,
      "Exercise Settings": 15,
      "Image Library": 9,
      "Upload Section": 4,
      "Toolbar": 16,
      "Download Options": 6,
      "Remaining Labels": 59
    }
  },

  /**
   * PHASE 8: SPECIAL FEATURES (LOW)
   * Handle Big Small-specific features
   */
  phase8: {
    description: "Special Features - Big Small-specific handling",

    features: [
      {
        name: "Exercise Types",
        description: "Different question types for size comparison",
        types: [
          "Circle the small one",
          "Circle the big one",
          "Circle the medium one",
          "Number 1-2-3 (small to big)",
          "Number 1-2-3 (big to small)"
        ]
      },
      {
        name: "Image Modes",
        description: "Identical vs Different images per exercise",
        modes: ["identical", "different"]
      },
      {
        name: "Exercise Count",
        description: "Support 1-10 exercises per worksheet",
        range: "1 to 10"
      },
      {
        name: "Answer Indicators",
        description: "Optional circles/boxes for answers",
        checkbox: "Add answer indicators"
      },
      {
        name: "Exercise Numbers",
        description: "Optional exercise numbering",
        checkbox: "Add exercise numbers"
      }
    ]
  },

  /**
   * VALIDATION REQUIREMENTS
   */
  validation: {
    htmlElements: {
      total: 178,
      mustHaveDataTranslate: 176,
      alreadyHasDataTranslate: 2,
      criticalElements: [
        "Background header (line 761)",
        "Border header (line 767)",
        "Grayscale button (line 917)"
      ]
    },

    javascriptMessages: {
      total: 41,
      categories: {
        error: 10,
        success: 4,
        status: 22,
        watermark: 2,
        fields: 2,
        default: 1
      }
    },

    testingChecklist: [
      "Generate worksheet with different exercise types",
      "Test identical vs different image modes",
      "Generate answer key with indicators",
      "Test all 5 question types",
      "Test exercise numbering",
      "Download as JPEG",
      "Download as PDF",
      "Upload custom images",
      "Test with ?locale=de",
      "Test with ?locale=sv"
    ]
  },

  /**
   * IMPLEMENTATION NOTES
   */
  notes: {
    critical: [
      "Background, Border, and Grayscale MUST be translated (user requirement)",
      "Only 1.1% coverage currently - complete overhaul needed",
      "Exercise types are key to app functionality",
      "Question type descriptions must be clear in all languages"
    ],

    warnings: [
      "Do not break core exercise generation logic",
      "Preserve size comparison functionality",
      "Maintain image mode selection",
      "Keep answer indicator generation intact"
    ],

    references: [
      "Use wordsearch.html as reference (53% coverage)",
      "Follow patterns from big-small-translation-master-template.js",
      "Test with German locale for verification"
    ]
  }
};

// Export for documentation
if (typeof module !== 'undefined' && module.exports) {
  module.exports = BIG_SMALL_PREPARATION;
}

// Log summary
console.log("=== BIG SMALL TRANSLATION PREPARATION ===");
console.log(`Total Translation Keys: 178`);
console.log(`Current Coverage: 1.1% (2 of 178 elements)`);
console.log(`Critical Items: Background, Border, Grayscale`);
console.log(`\nPhases:`);
console.log("1. Emergency Foundation (Add t() function, critical items)");
console.log("2. Core UI Translation (Headers, navigation)");
console.log("3. Accordion Sections (All config panels)");
console.log("4. Exercise Settings (Question types, image modes)");
console.log("5. Action Buttons (Generate, Download, Clear)");
console.log("6. JavaScript Messages (41 replacements)");
console.log("7. Complete HTML Coverage (176 elements total)");
console.log("8. Special Features (Exercise types, image modes)");
console.log(`\nREMEMBER: This app supports 5 different question types for size comparison!`);