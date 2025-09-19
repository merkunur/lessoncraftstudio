// Complete German translations for ALL homepage content

async function updateAllGermanTranslations() {
    console.log('Loading current content...');
    
    try {
        // Get current content
        const response = await fetch('http://localhost:3000/api/homepage/content?raw=true');
        const content = await response.json();

        console.log('Updating German translations for all sections...');

        // NAVIGATION - Already has German but let's ensure completeness
        content.navigation.menuItems.apps.de = "Apps";
        content.navigation.menuItems.pricing.de = "Preise";
        content.navigation.menuItems.blog.de = "Blog";
        content.navigation.buttons.signIn.de = "Anmelden";
        content.navigation.buttons.startFree.de = "Kostenlos starten";

        // HERO SECTION
        content.hero.title.de = "Erstellen Sie professionelle Arbeitsblätter in Minuten";
        content.hero.subtitle.de = "33 leistungsstarke Arbeitsblatt-Generatoren mit über 100 thematischen Bildern";
        content.hero.cta_primary_text.de = "Wortsuche kostenlos testen";
        content.hero.cta_secondary_text.de = "Alle Apps anzeigen";

        // FEATURES SECTION HEADER
        content.featuresSection.title.de = "Alles was Sie brauchen";
        content.featuresSection.subtitle = content.featuresSection.subtitle || {};
        content.featuresSection.subtitle.de = "Professionelle Werkzeuge für Lehrkräfte und Bildungsverlage";

        // FEATURES - Update all 4 features
        if (content.features && content.features.length >= 4) {
            content.features[0].title.de = "33 Arbeitsblatt-Apps";
            content.features[0].description.de = "Von Mathematik und Lesen bis zu Rätseln und Spielen";
            
            content.features[1].title.de = "100+ Bildthemen";
            content.features[1].description.de = "Kinderfreundliche Illustrationen mit kommerzieller Lizenz";
            
            content.features[2].title.de = "11 Sprachen";
            content.features[2].description.de = "Erstellen Sie Arbeitsblätter in mehreren Sprachen";
            
            content.features[3].title.de = "POD-Lizenz inklusive";
            content.features[3].description.de = "Verkaufen Sie Ihre Arbeitsblätter auf jeder Plattform";
        }

        // SAMPLES SECTION
        content.samplesSection.title.de = "Arbeitsblätter-Beispielgalerie";
        content.samplesSection.subtitle.de = "Klicken Sie auf ein Arbeitsblatt für eine größere Vorschau. Dies sind nur einige Beispiele aus unserer Sammlung von 33 professionellen Arbeitsblatt-Generatoren.";
        content.samplesSection.cta.de = "Alle 33 Arbeitsblatt-Generatoren erkunden →";
        
        // Sample categories
        content.samplesSection.categories.math.de = "Mathematik";
        content.samplesSection.categories.literacy.de = "Lesen & Schreiben";
        content.samplesSection.categories.puzzle.de = "Rätsel";
        content.samplesSection.categories.logic.de = "Logik";
        content.samplesSection.categories.creative.de = "Kreativ";
        
        // Sample difficulties
        content.samplesSection.difficulties.easy.de = "Einfach";
        content.samplesSection.difficulties.medium.de = "Mittel";
        content.samplesSection.difficulties.hard.de = "Schwer";

        // Modal labels (new)
        if (!content.samplesSection.modalLabels) {
            content.samplesSection.modalLabels = {};
        }
        content.samplesSection.modalLabels.ageRange = content.samplesSection.modalLabels.ageRange || {};
        content.samplesSection.modalLabels.difficulty = content.samplesSection.modalLabels.difficulty || {};
        content.samplesSection.modalLabels.category = content.samplesSection.modalLabels.category || {};
        
        content.samplesSection.modalLabels.ageRange.de = "Altersgruppe";
        content.samplesSection.modalLabels.difficulty.de = "Schwierigkeitsgrad";
        content.samplesSection.modalLabels.category.de = "Kategorie";

        // SAMPLE ITEMS - Translate all 6 samples
        if (content.samples && content.samples.length >= 6) {
            content.samples[0].name.de = "Alphabet-Zug";
            content.samples[0].description.de = "Spaßiges Alphabet-Lernen mit bunten Zugwaggons";
            
            content.samples[1].name.de = "Code-Addition";
            content.samples[1].description.de = "Knacke den Code mit Additionsrätseln";
            
            content.samples[2].name.de = "Diagramm & Zählen";
            content.samples[2].description.de = "Lernen Sie Grafiken und Datenvisualisierung";
            
            content.samples[3].name.de = "Versteckte Objekte";
            content.samples[3].description.de = "Finde versteckte Objekte in detaillierten Szenen";
            
            content.samples[4].name.de = "Ich Sehe Was";
            content.samples[4].description.de = "Klassisches Ich-sehe-was Suchspiel";
            
            content.samples[5].name.de = "Muster-Zug";
            content.samples[5].description.de = "Vervollständige die Mustersequenzen";
        }

        // PRICING SECTION
        content.pricingSection.title.de = "Einfache, transparente Preise";
        content.pricingSection.subtitle = content.pricingSection.subtitle || {};
        content.pricingSection.subtitle.de = "Wählen Sie den Plan, der zu Ihnen passt";
        
        // Pricing periods
        content.pricingSection.periods.month.de = "/Monat";
        content.pricingSection.periods.year.de = "/Jahr";

        // PRICING TIERS
        if (content.pricing && content.pricing.length >= 3) {
            // Free tier
            const freeTier = content.pricing.find(p => p.name.en === 'Free' || p.name.en === 'Free Tier');
            if (freeTier) {
                freeTier.name.de = "Kostenlos";
                freeTier.features.de = [
                    "Wortsuche-Generator",
                    "Begrenzte Bildbibliothek",
                    "Mit Wasserzeichen versehene Ausgabe",
                    "Basis-Support"
                ];
                freeTier.cta_text.de = "Kostenlos starten";
            }

            // Core Bundle
            const coreTier = content.pricing.find(p => p.name.en === 'Core Bundle');
            if (coreTier) {
                coreTier.name.de = "Basis-Paket";
                coreTier.features.de = [
                    "10 beliebteste Apps",
                    "Voller Zugriff auf die Bildbibliothek",
                    "Keine Wasserzeichen",
                    "POD-Kommerzielle Lizenz",
                    "Prioritäts-Support"
                ];
                coreTier.cta_text.de = "Basis-Paket wählen";
            }

            // Full Access
            const fullTier = content.pricing.find(p => p.name.en === 'Full Access');
            if (fullTier) {
                fullTier.name.de = "Vollzugriff";
                fullTier.features.de = [
                    "Alle 33 Apps",
                    "Voller Zugriff auf die Bildbibliothek",
                    "Keine Wasserzeichen",
                    "POD-Kommerzielle Lizenz",
                    "Prioritäts-Support",
                    "Frühzeitiger Zugang zu neuen Apps"
                ];
                fullTier.cta_text.de = "Vollzugriff erhalten";
                fullTier.badge_text.de = "Am beliebtesten";
            }
        }

        // FOOTER SECTION
        content.footer.companyName.de = "LessonCraftStudio";
        content.footer.companyTagline.de = "Professionelle Arbeitsblatt-Generatoren für Bildungsverlage.";
        
        // Footer sections
        content.footer.sections.product.title.de = "Produkt";
        content.footer.sections.product.links.apps.de = "Apps";
        content.footer.sections.product.links.pricing.de = "Preise";
        content.footer.sections.product.links.blog.de = "Blog";
        
        content.footer.sections.support.title.de = "Support";
        content.footer.sections.support.links.helpCenter.de = "Hilfezentrum";
        content.footer.sections.support.links.contact.de = "Kontakt";
        content.footer.sections.support.links.faq.de = "FAQ";
        
        content.footer.sections.legal.title.de = "Rechtliches";
        content.footer.sections.legal.links.terms.de = "Nutzungsbedingungen";
        content.footer.sections.legal.links.privacy.de = "Datenschutzrichtlinie";
        content.footer.sections.legal.links.license.de = "Lizenzbedingungen";
        
        content.footer.copyright.de = "© 2024 LessonCraftStudio. Alle Rechte vorbehalten.";

        // COMMON UI TEXTS
        content.commonUI.loading.de = "Laden...";
        content.commonUI.error.de = "Ein Fehler ist aufgetreten";
        content.commonUI.success.de = "Erfolg!";
        content.commonUI.noResults.de = "Keine Ergebnisse gefunden";
        content.commonUI.viewMore.de = "Mehr anzeigen";
        content.commonUI.viewLess.de = "Weniger anzeigen";
        content.commonUI.search = content.commonUI.search || {};
        content.commonUI.filter = content.commonUI.filter || {};
        content.commonUI.search.de = "Suchen";
        content.commonUI.filter.de = "Filtern";

        // SEO SECTION
        content.seo.title.de = "LessonCraftStudio - Professioneller Arbeitsblatt-Generator";
        content.seo.description.de = "33 leistungsstarke Arbeitsblatt-Generatoren mit über 100 thematischen Bildern für Teachers Pay Teachers-Verkäufer und Bildungsverlage";
        content.seo.keywords.de = "Arbeitsblatt-Generator, Teachers Pay Teachers, Bildungsressourcen, druckbare Arbeitsblätter, POD-Lizenz, Lehrmaterial, Unterrichtsmaterial, Bildungsmaterial";

        // Save all content
        console.log('Saving all German translations...');
        const saveResponse = await fetch('http://localhost:3000/api/homepage/content', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                section: 'all',
                content: content
            })
        });

        if (saveResponse.ok) {
            console.log('✅ ALL German translations updated successfully!');
            console.log('📝 Sections updated:');
            console.log('  - Navigation (menu items, buttons)');
            console.log('  - Hero (title, subtitle, CTAs)');
            console.log('  - Features (4 feature cards)');
            console.log('  - Samples (6 sample worksheets + categories/difficulties)');
            console.log('  - Pricing (3 tiers with all features)');
            console.log('  - Footer (all sections and links)');
            console.log('  - Common UI (loading, error, success messages)');
            console.log('  - SEO (title, description, keywords)');
            console.log('\n🌐 Visit http://localhost:3000/de to see the German homepage');
        } else {
            console.error('❌ Failed to save German translations');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Run the update
updateAllGermanTranslations();