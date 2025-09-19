// Script to update all German translations

async function updateGermanTranslations() {
    try {
        // Get current content
        const response = await fetch('http://localhost:3000/api/homepage/content?raw=true');
        const content = await response.json();

        // Update Hero Section
        content.hero.title.de = "Erstellen Sie professionelle Arbeitsblätter in Minuten";
        content.hero.subtitle.de = "33 leistungsstarke Arbeitsblatt-Generatoren mit über 100 thematischen Bildern";
        content.hero.cta_primary_text.de = "Wortsuche kostenlos testen";
        content.hero.cta_secondary_text.de = "Alle Apps anzeigen";

        // Update Features
        content.features[0].title.de = "33 Arbeitsblatt-Apps";
        content.features[0].description.de = "Von Mathematik und Lesen bis zu Rätseln und Spielen";
        content.features[1].title.de = "100+ Bildthemen";
        content.features[1].description.de = "Kinderfreundliche Illustrationen mit kommerzieller Lizenz";
        content.features[2].title.de = "11 Sprachen";
        content.features[2].description.de = "Erstellen Sie Arbeitsblätter in mehreren Sprachen";
        content.features[3].title.de = "POD-Lizenz inklusive";
        content.features[3].description.de = "Verkaufen Sie Ihre Arbeitsblätter auf jeder Plattform";

        // Update Pricing
        content.pricing[0].name.de = "Kostenlos";
        content.pricing[0].features.de = [
            "Wortsuche-Generator",
            "Begrenzte Bildbibliothek",
            "Mit Wasserzeichen versehene Ausgabe",
            "Basis-Support"
        ];
        content.pricing[0].cta_text.de = "Kostenlos starten";

        content.pricing[1].name.de = "Basis-Paket";
        content.pricing[1].features.de = [
            "10 beliebteste Apps",
            "Voller Zugriff auf die Bildbibliothek",
            "Keine Wasserzeichen",
            "POD-Kommerzielle Lizenz",
            "Prioritäts-Support"
        ];
        content.pricing[1].cta_text.de = "Basis-Paket wählen";

        content.pricing[2].name.de = "Vollzugriff";
        content.pricing[2].features.de = [
            "Alle 33 Apps",
            "Voller Zugriff auf die Bildbibliothek",
            "Keine Wasserzeichen",
            "POD-Kommerzielle Lizenz",
            "Prioritäts-Support",
            "Frühzeitiger Zugang zu neuen Apps"
        ];
        content.pricing[2].cta_text.de = "Vollzugriff erhalten";
        content.pricing[2].badge_text.de = "Am beliebtesten";

        // Update SEO
        content.seo.title.de = "LessonCraftStudio - Professioneller Arbeitsblatt-Generator";
        content.seo.description.de = "33 leistungsstarke Arbeitsblatt-Generatoren mit über 100 thematischen Bildern für Teachers Pay Teachers-Verkäufer und Bildungsverlage";
        content.seo.keywords.de = "Arbeitsblatt-Generator, Teachers Pay Teachers, Bildungsressourcen, druckbare Arbeitsblätter, POD-Lizenz, Lehrmaterial, Unterrichtsmaterial";

        // Save all content
        const saveResponse = await fetch('http://localhost:3000/api/homepage/content', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                section: 'all',
                content: content
            })
        });

        if (saveResponse.ok) {
            console.log('✅ German translations updated successfully!');
        } else {
            console.error('❌ Failed to save translations');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Run the update
updateGermanTranslations();