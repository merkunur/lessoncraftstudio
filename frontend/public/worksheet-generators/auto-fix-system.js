/**
 * AUTOMATED FIX SYSTEM
 *
 * This system automatically detects and fixes border/background loading issues
 * in ANY worksheet generator app.
 *
 * @author LessonCraftStudio Team
 * @version 1.0.0
 */

class AutoFixSystem {
    constructor() {
        this.diagnostics = {
            hasTranslationsJS: false,
            hasBorderSelect: false,
            hasBackgroundSelect: false,
            currentLocale: null,
            apiEndpointsWork: false,
            selectsPopulated: false,
            errors: []
        };
    }

    /**
     * Run complete diagnostic on current page
     */
    async runDiagnostics() {
        console.log('🔍 [AutoFix] Running diagnostics...');

        // Check if translations.js is loaded
        this.diagnostics.hasTranslationsJS = typeof window.translations !== 'undefined';

        // Check for select elements
        this.diagnostics.hasBorderSelect = !!document.getElementById('borderThemeSelect');
        this.diagnostics.hasBackgroundSelect = !!document.getElementById('backgroundThemeSelect');

        // Check locale
        const urlParams = new URLSearchParams(window.location.search);
        this.diagnostics.currentLocale = urlParams.get('locale') || 'en';

        // Test API endpoints
        try {
            const borderResponse = await fetch(`/api/borders/themes?locale=${this.diagnostics.currentLocale}`);
            const bgResponse = await fetch(`/api/backgrounds/themes?locale=${this.diagnostics.currentLocale}`);

            this.diagnostics.apiEndpointsWork = borderResponse.ok && bgResponse.ok;

            if (borderResponse.ok) {
                const themes = await borderResponse.json();
                console.log(`✅ Border API works: ${themes.length} themes`);
            }

            if (bgResponse.ok) {
                const themes = await bgResponse.json();
                console.log(`✅ Background API works: ${themes.length} themes`);
            }

        } catch (error) {
            this.diagnostics.apiEndpointsWork = false;
            this.diagnostics.errors.push(error.message);
        }

        // Check if selects are populated
        if (this.diagnostics.hasBorderSelect) {
            const borderSelect = document.getElementById('borderThemeSelect');
            this.diagnostics.selectsPopulated = borderSelect.options.length > 1;
        }

        console.log('📊 Diagnostic Results:', this.diagnostics);
        return this.diagnostics;
    }

    /**
     * Automatically fix the page
     */
    async autoFix() {
        console.log('🔧 [AutoFix] Starting automatic fix...');

        const diag = await this.runDiagnostics();

        // Step 1: Inject BulletproofLoader if not present
        if (typeof window.BulletproofLoader === 'undefined') {
            console.log('💉 Injecting BulletproofLoader...');
            await this.injectBulletproofLoader();
        }

        // Step 2: Fix selects if they exist but aren't populated
        if ((diag.hasBorderSelect || diag.hasBackgroundSelect) && !diag.selectsPopulated) {
            console.log('🔄 Fixing select elements...');
            await this.fixSelects();
        }

        // Step 3: Create selects if they don't exist
        if (!diag.hasBorderSelect && !diag.hasBackgroundSelect) {
            console.log('➕ Creating missing select elements...');
            this.createMissingSelects();
        }

        // Step 4: Initialize everything
        console.log('🚀 Initializing with BulletproofLoader...');
        const success = await window.BulletproofLoader.init();

        if (success) {
            console.log('✅ [AutoFix] FIX SUCCESSFUL!');
            this.showSuccessMessage();
        } else {
            console.log('⚠️ [AutoFix] Fix completed with warnings');
            this.showWarningMessage();
        }

        // Final verification
        const finalReport = await this.runDiagnostics();
        console.log('📊 Final State:', finalReport);

        return finalReport;
    }

    /**
     * Inject BulletproofLoader script
     */
    async injectBulletproofLoader() {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'js/bulletproof-loader.js';
            script.onload = () => {
                console.log('✅ BulletproofLoader injected successfully');
                resolve();
            };
            script.onerror = () => {
                console.error('❌ Failed to inject BulletproofLoader');
                resolve();
            };
            document.head.appendChild(script);
        });
    }

    /**
     * Fix existing select elements
     */
    async fixSelects() {
        const locale = this.diagnostics.currentLocale;

        // Fix border select
        const borderSelect = document.getElementById('borderThemeSelect');
        if (borderSelect) {
            borderSelect.innerHTML = '<option value="none">None</option>';

            try {
                const response = await fetch(`/api/borders/themes?locale=${locale}`);
                if (response.ok) {
                    const themes = await response.json();
                    themes.forEach(theme => {
                        const option = document.createElement('option');
                        option.value = theme.value || theme;
                        option.textContent = theme.displayName || theme.value || theme;
                        borderSelect.appendChild(option);
                    });
                    console.log(`✅ Fixed border select: ${themes.length} themes`);
                }
            } catch (error) {
                console.error('Failed to fix border select:', error);
            }
        }

        // Fix background select
        const bgSelect = document.getElementById('backgroundThemeSelect');
        if (bgSelect) {
            bgSelect.innerHTML = '<option value="none">None</option>';

            try {
                const response = await fetch(`/api/backgrounds/themes?locale=${locale}`);
                if (response.ok) {
                    const themes = await response.json();
                    themes.forEach(theme => {
                        const option = document.createElement('option');
                        option.value = theme.value || theme;
                        option.textContent = theme.displayName || theme.value || theme;
                        bgSelect.appendChild(option);
                    });
                    console.log(`✅ Fixed background select: ${themes.length} themes`);
                }
            } catch (error) {
                console.error('Failed to fix background select:', error);
            }
        }
    }

    /**
     * Create missing select elements
     */
    createMissingSelects() {
        // Find a suitable container
        let container = document.querySelector('.controls, .panel-content, .sidebar, body');

        if (!container) {
            container = document.body;
        }

        // Create wrapper div
        const wrapper = document.createElement('div');
        wrapper.style.cssText = `
            position: fixed;
            top: 10px;
            right: 10px;
            background: white;
            padding: 15px;
            border: 2px solid #4caf50;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            z-index: 10000;
        `;
        wrapper.innerHTML = `
            <h3 style="margin: 0 0 10px 0;">Auto-Fixed Controls</h3>
            <div>
                <label>Border Theme:
                    <select id="borderThemeSelect" style="margin-left: 10px;">
                        <option value="none">None</option>
                    </select>
                </label>
            </div>
            <div style="margin-top: 10px;">
                <label>Background Theme:
                    <select id="backgroundThemeSelect" style="margin-left: 10px;">
                        <option value="none">None</option>
                    </select>
                </label>
            </div>
        `;

        container.appendChild(wrapper);
        console.log('✅ Created missing select elements');
    }

    /**
     * Show success message
     */
    showSuccessMessage() {
        const msg = document.createElement('div');
        msg.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #4caf50;
            color: white;
            padding: 20px 40px;
            border-radius: 8px;
            font-size: 18px;
            font-weight: bold;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            z-index: 100000;
            animation: fadeIn 0.3s ease;
        `;
        msg.textContent = '✅ Borders & Backgrounds Fixed Successfully!';
        document.body.appendChild(msg);

        setTimeout(() => msg.remove(), 3000);
    }

    /**
     * Show warning message
     */
    showWarningMessage() {
        const msg = document.createElement('div');
        msg.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #ff9800;
            color: white;
            padding: 20px 40px;
            border-radius: 8px;
            font-size: 18px;
            font-weight: bold;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            z-index: 100000;
        `;
        msg.textContent = '⚠️ Partial Fix Applied - Check Console';
        document.body.appendChild(msg);

        setTimeout(() => msg.remove(), 3000);
    }
}

// Create global instance
window.AutoFixSystem = new AutoFixSystem();

// Add keyboard shortcut for manual trigger
document.addEventListener('keydown', async (e) => {
    // Ctrl+Shift+F to run auto-fix
    if (e.ctrlKey && e.shiftKey && e.key === 'F') {
        console.log('🚀 Manual AutoFix triggered!');
        await window.AutoFixSystem.autoFix();
    }
});

// Auto-run diagnostics on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.AutoFixSystem.runDiagnostics();
    });
} else {
    window.AutoFixSystem.runDiagnostics();
}

console.log('🛡️ AutoFixSystem loaded. Press Ctrl+Shift+F to fix any issues.');