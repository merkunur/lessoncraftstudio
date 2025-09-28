/**
 * PREPARE CODE ADDITION FOR TRANSLATION (CATM)
 * Preparation Script for Code Addition App Translation System
 * Version: 1.0.0
 * Generated: December 2024
 *
 * This script documents the EXACT changes needed to implement
 * the complete translation system in the Code Addition app.
 *
 * CRITICAL STATUS: 0.6% coverage (1 of 176 elements have data-translate)
 * PRIORITY ITEMS: Background (line 570), Border (line 583), Grayscale (line 738)
 * SPECIAL REQUIREMENT: Code addition requires exactly 5 images
 */

const CODE_ADDITION_PREPARATION = {
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
        line: "570",
        action: "CRITICAL UPDATE",
        description: "Add data-translate to Background header",
        from: `<h4>Background</h4>`,
        to: `<h4 data-translate="codeaddition.background.title">Background</h4>`
      },
      {
        line: "583",
        action: "CRITICAL UPDATE",
        description: "Add data-translate to Border header",
        from: `<h4>Border</h4>`,
        to: `<h4 data-translate="codeaddition.border.title">Border</h4>`
      },
      {
        line: "738",
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
        line: "6",
        action: "UPDATE",
        description: "Update page title",
        from: `<title>Image Addition Worksheet Generator</title>`,
        to: `<title data-translate="codeaddition.page.title">Image Addition Worksheet Generator</title>`
      },
      {
        line: "523",
        action: "UPDATE",
        description: "Update main title",
        from: `<h2>Image Addition</h2>`,
        to: `<h2 data-translate="codeaddition.title">Image Addition</h2>`
      },
      {
        line: "746",
        action: "UPDATE",
        description: "Update worksheet tab",
        from: `<button class="tab-button active" data-tab="worksheetTab">Worksheet</button>`,
        to: `<button class="tab-button active" data-tab="worksheetTab" data-translate="codeaddition.tab.worksheet">Worksheet</button>`
      },
      {
        line: "747",
        action: "UPDATE",
        description: "Update answer key tab",
        from: `<button class="tab-button" data-tab="answerKeyTab">Answer Key</button>`,
        to: `<button class="tab-button" data-tab="answerKeyTab" data-translate="codeaddition.tab.answer">Answer Key</button>`
      }
    ]
  },

  /**
   * PHASE 3: PAGE SETUP SECTION (HIGH)
   * Translate all page configuration options
   */
  phase3: {
    description: "Page Setup Section - Configuration options",

    changes: [
      {
        line: "547",
        action: "UPDATE",
        description: "Page Setup accordion",
        from: `<button class="accordion-button active">Page Setup</button>`,
        to: `<button class="accordion-button active" data-translate="codeaddition.page.setup">Page Setup</button>`
      },
      {
        line: "528",
        action: "UPDATE",
        description: "Language label (already has data-translate-key)",
        note: "This element already has data-translate-key attribute"
      },
      {
        line: "549",
        action: "UPDATE",
        description: "Page size label",
        from: `<label>Page Size:</label>`,
        to: `<label data-translate="codeaddition.page.size.label">Page Size:</label>`
      },
      {
        line: "551-556",
        action: "UPDATE",
        description: "Page size options",
        from: `<option value="letter-portrait">Letter Portrait (8.5×11")</option>`,
        to: `<option value="letter-portrait" data-translate="page.size.letter.portrait">Letter Portrait (8.5×11")</option>`
      },
      {
        line: "559",
        action: "UPDATE",
        description: "Width label",
        from: `<label>Width (px):</label>`,
        to: `<label data-translate="codeaddition.width.label">Width (px):</label>`
      },
      {
        line: "561",
        action: "UPDATE",
        description: "Height label",
        from: `<label>Height (px):</label>`,
        to: `<label data-translate="codeaddition.height.label">Height (px):</label>`
      },
      {
        line: "566",
        action: "UPDATE",
        description: "Apply Size button",
        from: `<button>Apply Size</button>`,
        to: `<button data-translate="codeaddition.apply.size">Apply Size</button>`
      }
    ]
  },

  /**
   * PHASE 4: IMAGE LIBRARY SECTION (CRITICAL)
   * Translate image selection interface
   */
  phase4: {
    description: "Image Library - Critical for 5-image requirement",

    changes: [
      {
        line: "622",
        action: "UPDATE",
        description: "Image Library accordion",
        from: `<button class="accordion-button">Image Library</button>`,
        to: `<button class="accordion-button" data-translate="codeaddition.image.library">Image Library</button>`
      },
      {
        line: "624",
        action: "UPDATE",
        description: "Upload section header",
        from: `<h4>Upload Your Own</h4>`,
        to: `<h4 data-translate="codeaddition.upload.own">Upload Your Own</h4>`
      },
      {
        line: "626",
        action: "UPDATE",
        description: "File input button text (browser-controlled)",
        note: "Browser controls this text, use wrapper for custom label"
      },
      {
        line: "631",
        action: "UPDATE",
        description: "Theme Images header",
        from: `<h4>Theme Images</h4>`,
        to: `<h4 data-translate="codeaddition.theme.images">Theme Images</h4>`
      },
      {
        line: "632",
        action: "UPDATE",
        description: "Theme label",
        from: `<label>Theme:</label>`,
        to: `<label data-translate="codeaddition.theme.label">Theme:</label>`
      },
      {
        line: "634",
        action: "UPDATE",
        description: "Search label",
        from: `<label>Search Images:</label>`,
        to: `<label data-translate="codeaddition.search.label">Search Images:</label>`
      },
      {
        line: "635",
        action: "UPDATE",
        description: "Search placeholder",
        from: `<input placeholder="e.g., apple, car">`,
        to: `<input placeholder="e.g., apple, car" data-translate-placeholder="codeaddition.search.placeholder">`
      },
      {
        line: "642",
        action: "UPDATE",
        description: "Selected Images header",
        from: `<h4>Selected Images</h4>`,
        to: `<h4 data-translate="codeaddition.selected.images">Selected Images</h4>`
      },
      {
        line: "644",
        action: "UPDATE",
        description: "Selected count display (dynamic)",
        note: "This needs JavaScript update to use formatTranslation()"
      }
    ]
  },

  /**
   * PHASE 5: WORKSHEET CONTENT SECTION (HIGH)
   * Translate worksheet generation options
   */
  phase5: {
    description: "Worksheet Content - Generation options",

    changes: [
      {
        line: "649",
        action: "UPDATE",
        description: "Worksheet Content accordion",
        from: `<button class="accordion-button">Worksheet Content</button>`,
        to: `<button class="accordion-button" data-translate="codeaddition.worksheet.content">Worksheet Content</button>`
      },
      {
        line: "651",
        action: "UPDATE",
        description: "Generation Method label",
        from: `<label>Generation Method:</label>`,
        to: `<label data-translate="codeaddition.generation.method">Generation Method:</label>`
      },
      {
        line: "653",
        action: "UPDATE",
        description: "Use selected images option",
        from: `<option value="manual">Use Manually Selected Images</option>`,
        to: `<option value="manual" data-translate="codeaddition.use.selected">Use Manually Selected Images</option>`
      },
      {
        line: "656",
        action: "UPDATE",
        description: "Exercise count label",
        from: `<label>Number of Exercises:</label>`,
        to: `<label data-translate="codeaddition.exercise.count">Number of Exercises:</label>`
      },
      {
        line: "660",
        action: "UPDATE",
        description: "Generation note",
        from: `<p>Select a theme to randomly generate problems...</p>`,
        to: `<p data-translate="codeaddition.generation.note">Select a theme to randomly generate problems...</p>`
      }
    ]
  },

  /**
   * PHASE 6: ACTION BUTTONS (HIGH)
   * Translate all action buttons
   */
  phase6: {
    description: "Action Buttons - Generate, Download, Clear",

    changes: [
      {
        line: "724",
        action: "UPDATE",
        description: "Generate button",
        from: `<button id="generateBtn" class="action-button accent">Generate</button>`,
        to: `<button id="generateBtn" class="action-button accent" data-translate="codeaddition.generate">Generate</button>`
      },
      {
        line: "726",
        action: "UPDATE",
        description: "Generate worksheet button",
        from: `<span>Generate Worksheet</span>`,
        to: `<span data-translate="codeaddition.generate.worksheet">Generate Worksheet</span>`
      },
      {
        line: "727",
        action: "UPDATE",
        description: "Generate answer key button",
        from: `<span>Generate Answer Key</span>`,
        to: `<span data-translate="codeaddition.generate.answer">Generate Answer Key</span>`
      },
      {
        line: "731",
        action: "UPDATE",
        description: "Download button",
        from: `<button>Download</button>`,
        to: `<button data-translate="codeaddition.download">Download</button>`
      },
      {
        line: "742",
        action: "UPDATE",
        description: "Clear All button",
        from: `<button id="clearBtn" class="action-button danger">Clear All</button>`,
        to: `<button id="clearBtn" class="action-button danger" data-translate="codeaddition.clear.all">Clear All</button>`
      }
    ]
  },

  /**
   * PHASE 7: JAVASCRIPT MESSAGE REPLACEMENT (CRITICAL)
   * Replace all 45 hardcoded messages
   */
  phase7: {
    description: "JavaScript Messages - Replace hardcoded strings",

    errorMessages: [
      {
        line: "890",
        from: `showMessage("Failed to load themes.", "error");`,
        to: `showMessage(t("codeaddition.msg.themes.error"), "error");`
      },
      {
        line: "951",
        from: `showMessage("Failed to load images.", "error");`,
        to: `showMessage(t("codeaddition.msg.images.error"), "error");`
      },
      {
        line: "962",
        from: `showMessage(\`Failed to search for "\${query}"\`, "error");`,
        to: `showMessage(formatTranslation(t("codeaddition.msg.search.error"), {query: query}), "error");`
      },
      {
        line: "1093",
        from: `showMessage("Failed to load images for the selected theme.", "error");`,
        to: `showMessage(t("codeaddition.msg.theme.load.error"), "error");`
      },
      {
        line: "1099",
        from: `showMessage("Could not find 5 images to create the worksheet. Please select a theme or 5 images.", "error");`,
        to: `showMessage(t("codeaddition.msg.insufficient.images"), "error");`
      },
      {
        line: "1412",
        from: `showMessage("Please generate a worksheet first.", "error");`,
        to: `showMessage(t("codeaddition.msg.generate.first"), "error");`
      },
      {
        line: "1985",
        from: `showMessage("Grayscale conversion failed.", "error");`,
        to: `showMessage(t("codeaddition.msg.grayscale.error"), "error");`
      },
      {
        line: "2002",
        from: `showMessage(\`\${name} is empty. Nothing to download.\`, "error");`,
        to: `showMessage(formatTranslation(t("codeaddition.msg.canvas.empty"), {name: name}), "error");`
      },
      {
        line: "2094",
        from: `showMessage("Error creating PDF.", "error");`,
        to: `showMessage(t("codeaddition.msg.pdf.error"), "error");`
      },
      {
        line: "2298",
        from: `console.error("Failed to load border image.");`,
        to: `console.error(t("codeaddition.msg.border.failed"));`
      },
      {
        line: "2380",
        from: `console.error("Failed to load background image.");`,
        to: `console.error(t("codeaddition.msg.background.failed"));`
      },
      {
        line: "2436",
        from: `showMessage(\`Error reading file: \${file.name}\`, "error");`,
        to: `showMessage(formatTranslation(t("codeaddition.msg.file.error"), {filename: file.name}), "error");`
      },
      {
        line: "1043",
        from: `showMessage(\`Maximum of \${MAX_IMAGES} images selected.\`, "warning");`,
        to: `showMessage(formatTranslation(t("codeaddition.msg.max.images"), {MAX_IMAGES: MAX_IMAGES}), "warning");`
      }
    ],

    successMessages: [
      {
        line: "1407",
        from: `showMessage("Worksheet Generated!", "success");`,
        to: `showMessage(t("codeaddition.msg.worksheet.generated"), "success");`
      },
      {
        line: "1546",
        from: `showMessage("Answer Key Generated!", "success");`,
        to: `showMessage(t("codeaddition.msg.answer.generated"), "success");`
      },
      {
        line: "1905",
        from: `showMessage("Cleared all settings.", "success");`,
        to: `showMessage(t("codeaddition.msg.cleared"), "success");`
      },
      {
        line: "2019",
        from: `showMessage("JPEG Download Initiated!", "success");`,
        to: `showMessage(t("codeaddition.msg.jpeg.success"), "success");`
      },
      {
        line: "2093",
        from: `showMessage("PDF Download Initiated!", "success");`,
        to: `showMessage(t("codeaddition.msg.pdf.success"), "success");`
      }
    ],

    statusMessages: [
      {
        line: "877",
        from: `allOption.textContent = "All Themes";`,
        to: `allOption.textContent = t("codeaddition.themes.all");`
      },
      {
        line: "878",
        from: `manualOption.textContent = "Use Manually Selected Images";`,
        to: `manualOption.textContent = t("codeaddition.use.selected");`
      },
      {
        line: "944",
        from: `dictionary.innerHTML = '<p class="dictionary-message">Loading animals...</p>';`,
        to: `dictionary.innerHTML = \`<p class="dictionary-message">\${t("codeaddition.msg.loading.animals")}</p>\`;`
      },
      {
        line: "955",
        from: `dictionary.innerHTML = '<p class="dictionary-message">Searching...</p>';`,
        to: `dictionary.innerHTML = \`<p class="dictionary-message">\${t("codeaddition.msg.searching")}</p>\`;`
      },
      {
        line: "974",
        from: `dictionary.innerHTML = \`<p class='dictionary-message'>No images found\${query ? ' for "' + query + '"' : ''}.</p>\`;`,
        to: `dictionary.innerHTML = \`<p class='dictionary-message'>\${formatTranslation(t("codeaddition.msg.no.images"), {query: query ? ' for "' + query + '"' : ''})}</p>\`;`
      },
      {
        line: "1057",
        from: `selectedCountElement.textContent = \`Selected: \${selectedImages.length} / \${MAX_IMAGES}\`;`,
        to: `selectedCountElement.textContent = formatTranslation(t("codeaddition.selected.count"), {count: selectedImages.length, max: MAX_IMAGES});`
      },
      {
        line: "2005",
        from: `showMessage(\`Preparing \${type} JPEG...\`, "info");`,
        to: `showMessage(formatTranslation(t("codeaddition.msg.preparing.jpeg"), {type: type}), "info");`
      },
      {
        line: "2051",
        from: `showMessage(\`Preparing \${type} PDF...\`, "info");`,
        to: `showMessage(formatTranslation(t("codeaddition.msg.preparing.pdf"), {type: type}), "info");`
      },
      {
        line: "2412",
        from: `showMessage(\`Loading \${filesToLoad} image(s)...\`, "info");`,
        to: `showMessage(formatTranslation(t("codeaddition.msg.loading.uploads"), {count: filesToLoad}), "info");`
      },
      {
        line: "2428",
        from: `showMessage(\`\${uploadedImages.length} custom images loaded.\`, "info");`,
        to: `showMessage(formatTranslation(t("codeaddition.msg.uploads.loaded"), {count: uploadedImages.length}), "info");`
      },
      {
        line: "2238",
        from: `borderDictionary.innerHTML = '<p class="dictionary-message">Select a theme to see borders.</p>';`,
        to: `borderDictionary.innerHTML = \`<p class="dictionary-message">\${t("codeaddition.msg.select.borders")}</p>\`;`
      },
      {
        line: "2246",
        from: `borderDictionary.innerHTML = '<p class="dictionary-message">Loading border theme...</p>';`,
        to: `borderDictionary.innerHTML = \`<p class="dictionary-message">\${t("codeaddition.msg.loading.borders")}</p>\`;`
      },
      {
        line: "2253",
        from: `borderDictionary.innerHTML = '<p class="dictionary-message">No borders available in this theme.</p>';`,
        to: `borderDictionary.innerHTML = \`<p class="dictionary-message">\${t("codeaddition.msg.no.borders")}</p>\`;`
      },
      {
        line: "2327",
        from: `backgroundDictionary.innerHTML = '<p class="dictionary-message">Select a theme to see backgrounds.</p>';`,
        to: `backgroundDictionary.innerHTML = \`<p class="dictionary-message">\${t("codeaddition.msg.select.backgrounds")}</p>\`;`
      },
      {
        line: "2335",
        from: `backgroundDictionary.innerHTML = '<p class="dictionary-message">Loading background theme...</p>';`,
        to: `backgroundDictionary.innerHTML = \`<p class="dictionary-message">\${t("codeaddition.msg.loading.backgrounds")}</p>\`;`
      },
      {
        line: "2342",
        from: `backgroundDictionary.innerHTML = '<p class="dictionary-message">No backgrounds available in this theme.</p>';`,
        to: `backgroundDictionary.innerHTML = \`<p class="dictionary-message">\${t("codeaddition.msg.no.backgrounds")}</p>\`;`
      }
    ],

    otherMessages: [
      {
        line: "1139",
        from: `nameText.text = "Name: _______________________";`,
        to: `nameText.text = t("codeaddition.name.field");`
      },
      {
        line: "1140",
        from: `dateText.text = "Date: ____________";`,
        to: `dateText.text = t("codeaddition.date.field");`
      }
    ]
  },

  /**
   * PHASE 8: COMPLETE HTML COVERAGE (MEDIUM)
   * Add data-translate to ALL remaining elements
   */
  phase8: {
    description: "Complete HTML Coverage - All remaining elements",

    totalElements: 176,
    elementsWithDataTranslate: 1,
    currentCoverage: "0.6%",
    targetCoverage: "100%",

    categories: {
      "Language Selection": 11,
      "Page Size Options": 7,
      "Page Setup": 10,
      "Background Section": 4,
      "Border Section": 4,
      "Text Tools": 11,
      "Font Options": 7,
      "Image Library": 9,
      "Worksheet Content": 5,
      "Optional Settings": 3,
      "Toolbar": 14,
      "Download Options": 6,
      "Remaining Labels": 84
    }
  },

  /**
   * PHASE 9: SPECIAL FEATURES (LOW)
   * Handle Code Addition-specific features
   */
  phase9: {
    description: "Special Features - Code Addition-specific handling",

    features: [
      {
        name: "5-Image Requirement",
        description: "Code addition requires exactly 5 images",
        validation: "Must show clear error when not exactly 5 images selected",
        criticalMessages: [
          "Could not find 5 images to create the worksheet",
          "Maximum of 5 images selected"
        ]
      },
      {
        name: "Manual vs Theme Selection",
        description: "User can choose manual selection or theme-based generation",
        modes: ["manual", "theme-based"]
      },
      {
        name: "Selected Count Display",
        description: "Dynamic display of selected images count (X / 5)",
        implementation: "Update with formatTranslation() for dynamic count"
      },
      {
        name: "Code Addition Logic",
        description: "Generates addition problems using image codes",
        unique: "Creates visual addition exercises"
      }
    ]
  },

  /**
   * VALIDATION REQUIREMENTS
   */
  validation: {
    htmlElements: {
      total: 176,
      mustHaveDataTranslate: 175,
      alreadyHasDataTranslate: 1,
      criticalElements: [
        "Background header (line 570)",
        "Border header (line 583)",
        "Grayscale button (line 738)"
      ]
    },

    javascriptMessages: {
      total: 45,
      categories: {
        error: 13,
        success: 5,
        status: 25,
        fields: 2
      }
    },

    testingChecklist: [
      "Select exactly 5 images manually",
      "Try selecting less than 5 images (should show error)",
      "Try selecting more than 5 images (should prevent)",
      "Test theme-based generation",
      "Generate worksheet with code addition",
      "Generate answer key",
      "Test Name/Date fields",
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
      "Only 0.6% coverage currently - complete overhaul needed",
      "Code addition requires EXACTLY 5 images - critical validation",
      "Selected count display must update dynamically"
    ],

    warnings: [
      "Do not break core addition generation logic",
      "Preserve 5-image validation",
      "Maintain manual vs theme selection functionality",
      "Keep code addition calculation intact"
    ],

    references: [
      "Use wordsearch.html as reference (53% coverage)",
      "Follow patterns from code-addition-translation-master-template.js",
      "Test with German locale for verification"
    ]
  }
};

// Export for documentation
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CODE_ADDITION_PREPARATION;
}

// Log summary
console.log("=== CODE ADDITION TRANSLATION PREPARATION ===");
console.log(`Total Translation Keys: 176`);
console.log(`Current Coverage: 0.6% (1 of 176 elements)`);
console.log(`Critical Items: Background, Border, Grayscale`);
console.log(`\nPhases:`);
console.log("1. Emergency Foundation (Add t() function, critical items)");
console.log("2. Core UI Translation (Headers, navigation)");
console.log("3. Page Setup Section (Configuration options)");
console.log("4. Image Library Section (5-image requirement)");
console.log("5. Worksheet Content Section (Generation options)");
console.log("6. Action Buttons (Generate, Download, Clear)");
console.log("7. JavaScript Messages (45 replacements)");
console.log("8. Complete HTML Coverage (175 elements total)");
console.log("9. Special Features (5-image validation, code addition)");
console.log(`\nREMEMBER: This app requires EXACTLY 5 images for code addition generation!`);