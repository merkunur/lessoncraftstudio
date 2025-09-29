/**
 * COMPREHENSIVE TEXT ANALYSIS FOR WORDSEARCH.HTML
 * Professional detection without dependencies
 */

const fs = require('fs').promises;
const path = require('path');

class WorksearchTextAnalyzer {
    constructor() {
        this.allTexts = new Map();
        this.categories = {
            htmlHeadings: [],
            htmlLabels: [],
            htmlButtons: [],
            jsMessages: [],
            jsConsole: [],
            jsDOM: [],
            attributes: [],
            checkboxes: [],
            options: [],
            dynamicMessages: [],
            canvasText: [],
            nativeElements: []
        };
    }

    async analyze() {
        console.log('📊 PROFESSIONAL TEXT ANALYSIS FOR WORDSEARCH.HTML');
        console.log('=' .repeat(60));

        const filePath = path.join(__dirname, 'wordsearch.html');
        const content = await fs.readFile(filePath, 'utf-8');

        // 1. Analyze HTML structure
        this.analyzeHTMLStructure(content);

        // 2. Analyze JavaScript code
        this.analyzeJavaScript(content);

        // 3. Analyze specific patterns
        this.analyzeSpecificPatterns(content);

        // 4. Generate comprehensive report
        const report = this.generateReport();

        // 5. Save report
        await this.saveReport(report);

        return report;
    }

    analyzeHTMLStructure(content) {
        // H4 headings - Critical UI sections
        const h4Pattern = /<h4>([^<]+)<\/h4>/g;
        let match;
        while ((match = h4Pattern.exec(content)) !== null) {
            this.recordText(match[1], 'htmlHeadings');
        }

        // Labels (especially checkboxes)
        const labelPattern = /<label[^>]*>([^<]+)<\/label>/g;
        while ((match = labelPattern.exec(content)) !== null) {
            const text = match[1].trim();
            if (text && !text.includes('<')) {
                this.recordText(text, 'htmlLabels');
            }
        }

        // Checkbox patterns with text
        const checkboxPatterns = [
            /<input[^>]+type=["']checkbox["'][^>]*>\s*([^<]+)/g,
            /<label[^>]*><input[^>]+type=["']checkbox["'][^>]*>\s*([^<]+)<\/label>/g
        ];

        checkboxPatterns.forEach(pattern => {
            const regex = new RegExp(pattern.source, pattern.flags);
            while ((match = regex.exec(content)) !== null) {
                const text = match[1].trim();
                if (text) {
                    this.recordText(text, 'checkboxes');
                }
            }
        });

        // Button text
        const buttonPattern = /<button[^>]*>([^<]+)<\/button>/g;
        while ((match = buttonPattern.exec(content)) !== null) {
            this.recordText(match[1], 'htmlButtons');
        }

        // Options
        const optionPattern = /<option[^>]*>([^<]+)<\/option>/g;
        while ((match = optionPattern.exec(content)) !== null) {
            this.recordText(match[1], 'options');
        }
    }

    analyzeJavaScript(content) {
        // showMessage calls - Critical for user feedback
        const showMessagePattern = /showMessage\(["'`]([^"'`]+)["'`]/g;
        let match;
        while ((match = showMessagePattern.exec(content)) !== null) {
            this.recordText(match[1], 'jsMessages');
        }

        // Console messages
        const consolePattern = /console\.(log|error|warn)\(["'`]([^"'`]+)["'`]/g;
        while ((match = consolePattern.exec(content)) !== null) {
            this.recordText(match[2], 'jsConsole');
        }

        // DOM text assignments
        const domPatterns = [
            /\.textContent\s*=\s*["'`]([^"'`]+)["'`]/g,
            /\.innerHTML\s*=\s*["'`]([^"'`]+)["'`]/g,
            /\.innerText\s*=\s*["'`]([^"'`]+)["'`]/g,
            /\.value\s*=\s*["'`]([^"'`]+)["'`]/g
        ];

        domPatterns.forEach(pattern => {
            const regex = new RegExp(pattern.source, pattern.flags);
            while ((match = regex.exec(content)) !== null) {
                this.recordText(match[1], 'jsDOM');
            }
        });

        // Canvas text
        const canvasPattern = /fillText\(["'`]([^"'`]+)["'`]/g;
        while ((match = canvasPattern.exec(content)) !== null) {
            this.recordText(match[1], 'canvasText');
        }
    }

    analyzeSpecificPatterns(content) {
        // Attributes
        const attributePatterns = [
            /placeholder=["']([^"']+)["']/g,
            /title=["']([^"']+)["']/g,
            /alt=["']([^"']+)["']/g
        ];

        attributePatterns.forEach(pattern => {
            let match;
            const regex = new RegExp(pattern.source, pattern.flags);
            while ((match = regex.exec(content)) !== null) {
                this.recordText(match[1], 'attributes');
            }
        });

        // Known problematic texts that users have reported
        const knownProblematicTexts = [
            'Background',
            'Border',
            'Grayscale',
            'Choose files',
            'No file chosen',
            'Select Language',
            'Page Setup',
            'Add New Text',
            'Selected Text Properties',
            'Grid Size',
            'Puzzle Options',
            'Image Source for Puzzle',
            'Individual Image Selection',
            'Allow Diagonal Words',
            'Allow Reverse Words',
            'Show Word/Image List',
            'Worksheet generated successfully!',
            'Answer key generated!',
            'Please generate a worksheet first.',
            'All settings cleared.',
            'Loading theme',
            'Theme needs at least',
            'Please wait for themes to load',
            'No images selected or available',
            'Failed to place any words'
        ];

        // Check if these texts exist in the content
        knownProblematicTexts.forEach(text => {
            if (content.includes(text)) {
                // Find context
                const escapedText = text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                const contextPattern = new RegExp(`.{0,50}${escapedText}.{0,50}`, 'g');
                const match = contextPattern.exec(content);
                if (match) {
                    this.recordText(text, 'dynamicMessages');
                }
            }
        });

        // Browser native elements
        if (content.includes('type="file"')) {
            this.recordText('Choose files', 'nativeElements');
            this.recordText('No file chosen', 'nativeElements');
        }
    }

    recordText(text, category) {
        text = text.trim();
        if (!text) return;

        // Record in category
        if (this.categories[category]) {
            if (!this.categories[category].includes(text)) {
                this.categories[category].push(text);
            }
        }

        // Record in all texts
        if (!this.allTexts.has(text)) {
            this.allTexts.set(text, {
                text: text,
                categories: [],
                count: 0
            });
        }

        const entry = this.allTexts.get(text);
        if (!entry.categories.includes(category)) {
            entry.categories.push(category);
        }
        entry.count++;
    }

    generateReport() {
        const report = {
            timestamp: new Date().toISOString(),
            file: 'wordsearch.html',
            summary: {
                totalUnique: this.allTexts.size,
                categories: {}
            },
            categorizedTexts: {},
            allTexts: [],
            criticalTexts: [],
            recommendations: []
        };

        // Summary by category
        Object.entries(this.categories).forEach(([category, texts]) => {
            report.summary.categories[category] = texts.length;
            if (texts.length > 0) {
                report.categorizedTexts[category] = texts.sort();
            }
        });

        // All unique texts
        report.allTexts = Array.from(this.allTexts.keys()).sort();

        // Critical texts that MUST be translated
        report.criticalTexts = [
            'Background',
            'Border',
            'Grayscale',
            'Choose files',
            'No file chosen',
            'Select Language',
            'Page Setup',
            'Add New Text',
            'Selected Text Properties',
            'Grid Size',
            'Puzzle Options',
            'Image Source for Puzzle',
            'Individual Image Selection',
            'Allow Diagonal Words',
            'Allow Reverse Words',
            'Show Word/Image List',
            'Worksheet generated successfully!',
            'Answer key generated!',
            'Please generate a worksheet first.'
        ].filter(text => this.allTexts.has(text));

        // Recommendations
        report.recommendations = [
            '1. HTML headings need data-translate attributes',
            '2. JavaScript messages need runtime interception',
            '3. File input needs custom UI wrapper',
            '4. Dynamic messages need translation mapping',
            '5. Canvas text needs special handling'
        ];

        return report;
    }

    async saveReport(report) {
        // Save detailed JSON report
        const jsonPath = path.join(__dirname, 'wordsearch-text-analysis.json');
        await fs.writeFile(jsonPath, JSON.stringify(report, null, 2));

        // Save human-readable report
        const readablePath = path.join(__dirname, 'wordsearch-text-analysis.md');
        const markdown = this.generateMarkdownReport(report);
        await fs.writeFile(readablePath, markdown);

        // Print summary
        console.log('\n📊 ANALYSIS COMPLETE\n');
        console.log(`Total unique texts found: ${report.summary.totalUnique}`);
        console.log('\nTexts by category:');
        Object.entries(report.summary.categories).forEach(([category, count]) => {
            if (count > 0) {
                console.log(`  ${category}: ${count}`);
            }
        });
        console.log('\n✅ Reports saved:');
        console.log(`  - ${path.basename(jsonPath)}`);
        console.log(`  - ${path.basename(readablePath)}`);
        console.log('\n' + '='.repeat(60));
    }

    generateMarkdownReport(report) {
        let markdown = `# WORDSEARCH.HTML TEXT ANALYSIS REPORT
Generated: ${report.timestamp}

## Summary
- **Total Unique Texts**: ${report.summary.totalUnique}
- **Critical Texts**: ${report.criticalTexts.length}

## Texts by Category

`;

        Object.entries(report.categorizedTexts).forEach(([category, texts]) => {
            markdown += `### ${category} (${texts.length} texts)\n`;
            texts.forEach(text => {
                markdown += `- "${text}"\n`;
            });
            markdown += '\n';
        });

        markdown += `## Critical Texts That MUST Be Translated

These are the texts specifically mentioned by the user as not translating:

`;
        report.criticalTexts.forEach(text => {
            markdown += `1. **"${text}"**\n`;
        });

        markdown += `\n## All Unique Texts (${report.allTexts.length})

\`\`\`
${report.allTexts.join('\n')}
\`\`\`

## Recommendations

${report.recommendations.join('\n')}

## Next Steps

1. Create translation keys for all ${report.summary.totalUnique} unique texts
2. Implement runtime translation system that intercepts these texts
3. Test with German locale to verify 100% coverage
4. Apply same system to remaining 32 apps
`;

        return markdown;
    }
}

// Run analysis
async function analyzeWordsearch() {
    const analyzer = new WorksearchTextAnalyzer();
    await analyzer.analyze();
}

analyzeWordsearch().catch(console.error);