/**
 * AUTOMATED TRANSLATION PIPELINE - COMPLETE INTEGRATION
 * Combines extraction, application, and validation for complete translation workflow
 *
 * @author Senior Software Engineer (20 years experience)
 * @version 1.0.0
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Import pipeline components
const TranslationExtractionEngine = require('./extraction-engine');
const TranslationApplicationEngine = require('./application-engine');

class TranslationPipelineIntegration {
    constructor(config = {}) {
        this.config = {
            baseDir: config.baseDir || path.join(__dirname, '..', 'frontend', 'public', 'worksheet-generators'),
            outputDir: config.outputDir || path.join(__dirname, 'output'),
            translationsFile: config.translationsFile || path.join(__dirname, '..', 'frontend', 'public', 'worksheet-generators', 'js', 'translations.js'),
            targetLocales: config.targetLocales || ['de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'],
            ...config
        };

        // Ensure output directory exists
        if (!fs.existsSync(this.config.outputDir)) {
            fs.mkdirSync(this.config.outputDir, { recursive: true });
        }

        // Load existing translations
        this.translations = this.loadTranslations();
    }

    /**
     * Load translations from translations.js
     */
    loadTranslations() {
        try {
            const content = fs.readFileSync(this.config.translationsFile, 'utf8');

            // Extract translations object from the file
            const match = content.match(/const\s+translations\s*=\s*(\{[\s\S]*?\});/);
            if (!match) {
                console.error('Could not parse translations file');
                return {};
            }

            // Evaluate the translations object (safe in controlled environment)
            const translationsCode = match[1];
            const translations = eval(`(${translationsCode})`);

            return translations;
        } catch (error) {
            console.error('Error loading translations:', error);
            return {};
        }
    }

    /**
     * Run complete pipeline for a single app
     */
    async runPipeline(appFileName, options = {}) {
        const startTime = Date.now();
        console.log('\n' + '='.repeat(80));
        console.log(`🚀 TRANSLATION PIPELINE: ${appFileName}`);
        console.log('='.repeat(80));

        const results = {
            app: appFileName,
            timestamp: new Date().toISOString(),
            stages: {}
        };

        try {
            // Stage 1: Extraction
            console.log('\n📊 STAGE 1: EXTRACTION');
            console.log('-'.repeat(40));

            const extractor = new TranslationExtractionEngine();
            const filePath = path.join(this.config.baseDir, appFileName);
            const inventory = await extractor.extractFromHTML(filePath);

            results.stages.extraction = {
                success: true,
                totalTexts: inventory.summary.totalUniqueTexts,
                htmlTexts: inventory.htmlTexts.length,
                jsTexts: inventory.javascriptTexts.length,
                dynamicTexts: inventory.dynamicTexts.length
            };

            // Save inventory
            const inventoryPath = path.join(
                this.config.outputDir,
                `${path.basename(appFileName, '.html')}_inventory.json`
            );
            fs.writeFileSync(inventoryPath, JSON.stringify(inventory, null, 2));
            console.log(`✅ Extracted ${inventory.summary.totalUniqueTexts} unique texts`);
            console.log(`📁 Inventory saved: ${inventoryPath}`);

            // Stage 2: Translation Analysis
            console.log('\n🔍 STAGE 2: TRANSLATION ANALYSIS');
            console.log('-'.repeat(40));

            const missingTranslations = this.analyzeMissingTranslations(inventory);
            results.stages.analysis = {
                success: true,
                missingKeys: missingTranslations.totalMissing,
                missingByLocale: missingTranslations.byLocale
            };

            console.log(`⚠️ Missing translations: ${missingTranslations.totalMissing}`);
            if (missingTranslations.totalMissing > 0) {
                console.log('Missing by locale:');
                Object.entries(missingTranslations.byLocale).forEach(([locale, count]) => {
                    if (count > 0) {
                        console.log(`  • ${locale}: ${count} missing`);
                    }
                });
            }

            // Stage 3: Application
            console.log('\n🔧 STAGE 3: APPLICATION');
            console.log('-'.repeat(40));

            const applicator = new TranslationApplicationEngine(inventory, this.translations);

            for (const locale of this.config.targetLocales) {
                if (options.skipLocales && options.skipLocales.includes(locale)) {
                    continue;
                }

                console.log(`\n  Applying ${locale.toUpperCase()} translations...`);

                const modifiedContent = await applicator.applyToHTML(filePath, locale);
                const outputPath = path.join(
                    this.config.outputDir,
                    `${path.basename(appFileName, '.html')}_${locale}.html`
                );

                fs.writeFileSync(outputPath, modifiedContent);

                const report = applicator.generateReport();
                results.stages[`application_${locale}`] = {
                    success: true,
                    applied: report.statistics.applied,
                    failed: report.statistics.failed,
                    coverage: report.coverage.percentage
                };

                console.log(`  ✅ Applied: ${report.statistics.applied}/${report.statistics.totalItems}`);
                console.log(`  📊 Coverage: ${report.coverage.percentage}%`);
            }

            // Stage 4: Validation Setup
            console.log('\n✅ STAGE 4: VALIDATION SETUP');
            console.log('-'.repeat(40));

            // Create validation HTML with runtime validator
            const validationHtml = this.createValidationHTML(appFileName, inventory);
            const validationPath = path.join(
                this.config.outputDir,
                `${path.basename(appFileName, '.html')}_validation.html`
            );

            fs.writeFileSync(validationPath, validationHtml);

            results.stages.validation = {
                success: true,
                validationFile: validationPath
            };

            console.log(`📁 Validation file created: ${validationPath}`);
            console.log('🔍 Open in browser to see real-time validation');

            // Stage 5: Report Generation
            console.log('\n📈 STAGE 5: REPORT GENERATION');
            console.log('-'.repeat(40));

            const finalReport = this.generateFinalReport(results, inventory, missingTranslations);
            const reportPath = path.join(
                this.config.outputDir,
                `${path.basename(appFileName, '.html')}_pipeline_report.json`
            );

            fs.writeFileSync(reportPath, JSON.stringify(finalReport, null, 2));

            console.log(`📁 Final report: ${reportPath}`);

            // Summary
            const duration = Date.now() - startTime;
            console.log('\n' + '='.repeat(80));
            console.log('✨ PIPELINE COMPLETE');
            console.log(`⏱️ Total time: ${(duration / 1000).toFixed(2)}s`);
            console.log(`📊 Overall coverage: ${this.calculateOverallCoverage(results)}%`);
            console.log('='.repeat(80));

            return finalReport;

        } catch (error) {
            console.error('\n❌ PIPELINE FAILED:', error);
            results.error = error.message;
            return results;
        }
    }

    /**
     * Analyze missing translations
     */
    analyzeMissingTranslations(inventory) {
        const missing = {
            totalMissing: 0,
            byLocale: {},
            missingKeys: new Set()
        };

        // Initialize locale counters
        this.config.targetLocales.forEach(locale => {
            missing.byLocale[locale] = 0;
        });

        // Check each text in inventory
        [...inventory.htmlTexts, ...inventory.javascriptTexts, ...inventory.dynamicTexts].forEach(item => {
            const key = item.translationKey;

            // Check if key exists in translations
            if (!this.translations.en || !this.translations.en[key]) {
                missing.missingKeys.add(key);
            }

            // Check each locale
            this.config.targetLocales.forEach(locale => {
                if (!this.translations[locale] || !this.translations[locale][key]) {
                    missing.byLocale[locale]++;
                }
            });
        });

        missing.totalMissing = missing.missingKeys.size;
        return missing;
    }

    /**
     * Create validation HTML with runtime validator
     */
    createValidationHTML(appFileName, inventory) {
        const originalPath = path.join(this.config.baseDir, appFileName);
        let content = fs.readFileSync(originalPath, 'utf8');

        // Add runtime validator script
        const validatorScript = `
<!-- TRANSLATION RUNTIME VALIDATOR -->
<script src="../../../translation-pipeline/runtime-validator.js"></script>
<script>
    // Auto-initialize validator with highlighting
    document.addEventListener('DOMContentLoaded', function() {
        const validator = new TranslationRuntimeValidator({
            locale: currentLocale || 'de',
            highlightUntranslated: true,
            logLevel: 'info',
            reportInterval: 3000,
            autoReport: true
        });

        // Add validation controls
        const controlPanel = document.createElement('div');
        controlPanel.style.cssText = 'position: fixed; top: 10px; right: 10px; z-index: 10000; background: white; border: 2px solid #333; padding: 10px; border-radius: 5px;';
        controlPanel.innerHTML = \`
            <h3 style="margin: 0 0 10px 0;">Translation Validator</h3>
            <button onclick="window.validateTranslations()">Validate Now</button>
            <button onclick="window.getTranslationReport()">Get Report</button>
            <button onclick="window.TranslationValidator.exportToConsole()">Export to Console</button>
            <div id="validationStats" style="margin-top: 10px; font-size: 12px;"></div>
        \`;
        document.body.appendChild(controlPanel);

        // Update stats periodically
        setInterval(() => {
            const report = window.getTranslationReport();
            document.getElementById('validationStats').innerHTML = \`
                Coverage: \${report.statistics.coverage}%<br>
                Total: \${report.statistics.totalElements}<br>
                Translated: \${report.statistics.translatedElements}<br>
                Untranslated: \${report.statistics.untranslatedElements}
            \`;
        }, 1000);
    });

    // Expected inventory for comparison
    const expectedInventory = ${JSON.stringify(inventory.summary, null, 4)};
</script>
`;

        // Insert before closing body tag
        content = content.replace('</body>', validatorScript + '\n</body>');

        return content;
    }

    /**
     * Generate final report
     */
    generateFinalReport(results, inventory, missingTranslations) {
        return {
            ...results,
            summary: {
                totalTexts: inventory.summary.totalUniqueTexts,
                translatedTexts: inventory.summary.totalUniqueTexts - missingTranslations.totalMissing,
                coveragePercentage: this.calculateOverallCoverage(results),
                missingTranslations: missingTranslations.totalMissing,
                recommendation: this.getRecommendation(results, missingTranslations)
            },
            inventory: inventory.summary,
            missingAnalysis: missingTranslations,
            nextSteps: this.getNextSteps(missingTranslations)
        };
    }

    /**
     * Calculate overall coverage
     */
    calculateOverallCoverage(results) {
        const coverages = [];
        Object.keys(results.stages).forEach(key => {
            if (key.startsWith('application_') && results.stages[key].coverage) {
                coverages.push(results.stages[key].coverage);
            }
        });

        if (coverages.length === 0) return 0;
        return Math.round(coverages.reduce((a, b) => a + b, 0) / coverages.length);
    }

    /**
     * Get recommendation based on results
     */
    getRecommendation(results, missingTranslations) {
        const coverage = this.calculateOverallCoverage(results);

        if (coverage >= 95) {
            return '✅ READY FOR PRODUCTION - Excellent translation coverage';
        } else if (coverage >= 80) {
            return '⚠️ MOSTLY READY - Add missing translations for better UX';
        } else if (coverage >= 60) {
            return '⚠️ NEEDS WORK - Significant translations missing';
        } else {
            return '❌ NOT READY - Major translation effort required';
        }
    }

    /**
     * Get next steps based on analysis
     */
    getNextSteps(missingTranslations) {
        const steps = [];

        if (missingTranslations.totalMissing > 0) {
            steps.push('1. Add missing translation keys to translations.js');
            steps.push('2. Provide translations for all target locales');
            steps.push('3. Run pipeline again to verify coverage');
        }

        steps.push('4. Test with runtime validator in browser');
        steps.push('5. Perform user acceptance testing');
        steps.push('6. Deploy to production');

        return steps;
    }

    /**
     * Run pipeline for multiple apps
     */
    async runBatch(appFiles, options = {}) {
        const results = [];

        for (const appFile of appFiles) {
            console.log(`\n${'🔄'.repeat(10)}`);
            const result = await this.runPipeline(appFile, options);
            results.push(result);

            // Save batch progress
            const batchPath = path.join(this.config.outputDir, 'batch_progress.json');
            fs.writeFileSync(batchPath, JSON.stringify(results, null, 2));
        }

        // Generate batch summary
        const batchSummary = {
            timestamp: new Date().toISOString(),
            totalApps: appFiles.length,
            processed: results.length,
            averageCoverage: Math.round(
                results.reduce((sum, r) => sum + (r.summary?.coveragePercentage || 0), 0) / results.length
            ),
            results: results.map(r => ({
                app: r.app,
                coverage: r.summary?.coveragePercentage || 0,
                missing: r.summary?.missingTranslations || 0,
                recommendation: r.summary?.recommendation || 'N/A'
            }))
        };

        const summaryPath = path.join(this.config.outputDir, 'batch_summary.json');
        fs.writeFileSync(summaryPath, JSON.stringify(batchSummary, null, 2));

        console.log('\n' + '='.repeat(80));
        console.log('📊 BATCH PIPELINE COMPLETE');
        console.log(`Apps processed: ${batchSummary.processed}/${batchSummary.totalApps}`);
        console.log(`Average coverage: ${batchSummary.averageCoverage}%`);
        console.log(`Summary saved: ${summaryPath}`);
        console.log('='.repeat(80));

        return batchSummary;
    }
}

module.exports = TranslationPipelineIntegration;

// CLI Usage
if (require.main === module) {
    const pipeline = new TranslationPipelineIntegration();

    const args = process.argv.slice(2);
    const command = args[0];

    if (!command) {
        console.log(`
AUTOMATED TRANSLATION PIPELINE - CLI

Usage:
  node pipeline-integration.js <command> [options]

Commands:
  single <app.html>     Run pipeline for single app
  batch                 Run pipeline for all apps
  demo                  Run demo on Picture Bingo app

Examples:
  node pipeline-integration.js single bingo.html
  node pipeline-integration.js batch
  node pipeline-integration.js demo

Options:
  --skip-locales=fr,es  Skip specific locales
  --output-dir=./output  Custom output directory
        `);
        process.exit(0);
    }

    switch (command) {
        case 'single':
            const appFile = args[1];
            if (!appFile) {
                console.error('Please specify an app file');
                process.exit(1);
            }
            pipeline.runPipeline(appFile).then(() => {
                console.log('\n✅ Pipeline complete!');
            }).catch(error => {
                console.error('❌ Pipeline failed:', error);
            });
            break;

        case 'batch':
            const worksheetDir = pipeline.config.baseDir;
            const htmlFiles = fs.readdirSync(worksheetDir)
                .filter(f => f.endsWith('.html') && !f.includes('test') && !f.includes('backup'));

            console.log(`Found ${htmlFiles.length} HTML files to process`);
            pipeline.runBatch(htmlFiles).then(() => {
                console.log('\n✅ Batch pipeline complete!');
            }).catch(error => {
                console.error('❌ Batch pipeline failed:', error);
            });
            break;

        case 'demo':
            console.log('🎯 Running demo on Picture Bingo app...\n');
            pipeline.runPipeline('bingo.html', { skipLocales: ['fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'] })
                .then(report => {
                    console.log('\n📊 DEMO RESULTS:');
                    console.log(`Coverage: ${report.summary.coveragePercentage}%`);
                    console.log(`Recommendation: ${report.summary.recommendation}`);
                    console.log('\n📁 Check the output folder for generated files:');
                    console.log(`  • ${pipeline.config.outputDir}/bingo_inventory.json`);
                    console.log(`  • ${pipeline.config.outputDir}/bingo_de.html`);
                    console.log(`  • ${pipeline.config.outputDir}/bingo_validation.html`);
                    console.log(`  • ${pipeline.config.outputDir}/bingo_pipeline_report.json`);
                    console.log('\n🔍 Open bingo_validation.html in browser to see real-time validation!');
                })
                .catch(error => {
                    console.error('❌ Demo failed:', error);
                });
            break;

        default:
            console.error(`Unknown command: ${command}`);
            process.exit(1);
    }
}