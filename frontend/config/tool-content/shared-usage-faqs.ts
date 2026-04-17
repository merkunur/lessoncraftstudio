interface FAQ { question: string; answer: string }

// Usage-intent FAQs prepended to every /[locale]/tools/[slug] page's FAQ
// section. These focus on the free browser experience: no signup, file
// formats, device compatibility, print settings, session persistence —
// topics that differentiate the informational /tools/*-maker pages from
// the commercial /apps/* pages.
//
// Only EN is populated today. Other locales fall back to EN. Translations
// queued in docs/seo-translation-queue-2026-04.md.
export const sharedUsageFAQs: Record<string, FAQ[]> = {
  en: [
    {
      question: 'Is there really no signup required?',
      answer:
        'Correct — you can open the generator, pick a theme, customize the page layout, and download a watermarked PDF or JPEG without creating an account. No email, no credit card, no trial period. The watermark is a small label in the corner; the underlying worksheet content is identical to the paid version. A one-time $49 license removes the watermark and unlocks commercial selling rights.',
    },
    {
      question: 'What file formats can I download?',
      answer:
        'Every worksheet exports as a print-ready PDF at 400+ DPI and a high-resolution JPEG. The PDF preserves vector text and sharp images for crisp printing at any size. The JPEG is useful for quick previews, social media posts, and platforms that prefer raster images. Both formats download instantly after you click Export.',
    },
    {
      question: 'Will it work on a tablet, Chromebook, or older browser?',
      answer:
        'The generator runs in any modern browser: Chrome, Safari, Firefox, and Edge — all version 90 or later. It works on Chromebooks, iPads, and Android tablets as well as desktops. Older browsers (Internet Explorer, Chrome pre-90) are not supported because the generator uses modern canvas and font-rendering features. If you hit a rendering issue, updating the browser usually fixes it.',
    },
    {
      question: 'What page sizes are supported? How do I print on A4 vs Letter?',
      answer:
        'The Page Setup panel offers Letter Portrait, Letter Landscape, A4 Portrait, A4 Landscape, Square, and custom dimensions. Pick the size that matches your intended printer or target market (A4 for most of Europe and Asia, Letter for North America). The PDF export preserves the exact dimensions you chose, so it will print true-to-size on any printer.',
    },
    {
      question: 'Do my worksheets save if I close the tab?',
      answer:
        'Your current worksheet layout is held in browser memory only. Closing the tab clears it. To preserve a worksheet across sessions, download the PDF and JPEG before closing — re-importing the exact same configuration is not supported in the free browser version. If you frequently create batches of related worksheets, purchasing a license also gives you access to saved templates.',
    },
  ],
  de: [
    {
      question: 'Muss ich mich wirklich nicht registrieren?',
      answer:
        'Richtig — Sie können den Generator öffnen, ein Thema wählen, das Seitenlayout anpassen und ein PDF oder JPEG mit Wasserzeichen herunterladen, ohne ein Konto zu erstellen. Keine E-Mail, keine Kreditkarte, keine Testphase. Das Wasserzeichen ist ein kleiner Hinweis in der Ecke; der eigentliche Arbeitsblatt-Inhalt ist identisch mit der bezahlten Version. Eine einmalige Lizenz für 49 $ entfernt das Wasserzeichen und schaltet die kommerziellen Verkaufsrechte frei.',
    },
    {
      question: 'In welchen Dateiformaten kann ich herunterladen?',
      answer:
        'Jedes Arbeitsblatt wird als druckfertiges PDF mit 400+ DPI und als hochauflösendes JPEG exportiert. Das PDF bewahrt Vektortext und scharfe Bilder für gestochen scharfen Druck in jeder Größe. Das JPEG eignet sich für schnelle Vorschauen, Social-Media-Posts und Plattformen, die Rasterbilder bevorzugen. Beide Formate werden sofort heruntergeladen, sobald Sie auf Exportieren klicken.',
    },
    {
      question: 'Funktioniert der Generator auf Tablets, Chromebooks oder älteren Browsern?',
      answer:
        'Der Generator läuft in jedem modernen Browser: Chrome, Safari, Firefox und Edge — jeweils Version 90 oder neuer. Er funktioniert auf Chromebooks, iPads und Android-Tablets ebenso wie auf Desktops. Ältere Browser (Internet Explorer, Chrome vor Version 90) werden nicht unterstützt, da der Generator moderne Canvas- und Font-Rendering-Funktionen nutzt. Bei Darstellungsproblemen hilft meist ein Browser-Update.',
    },
    {
      question: 'Welche Seitenformate werden unterstützt? Wie drucke ich A4 vs. Letter?',
      answer:
        'Das Seitenlayout-Panel bietet Letter Hochformat, Letter Querformat, A4 Hochformat, A4 Querformat, Quadrat und benutzerdefinierte Maße. Wählen Sie die Größe, die zu Ihrem Drucker oder Zielmarkt passt (A4 für die meisten europäischen und asiatischen Märkte, Letter für Nordamerika). Der PDF-Export bewahrt die exakten Maße, sodass das Blatt auf jedem Drucker originalgetreu gedruckt wird.',
    },
    {
      question: 'Werden meine Arbeitsblätter gespeichert, wenn ich den Tab schließe?',
      answer:
        'Ihr aktuelles Arbeitsblatt-Layout liegt nur im Browser-Speicher. Beim Schließen des Tabs geht es verloren. Um ein Arbeitsblatt über Sitzungen hinweg zu erhalten, laden Sie das PDF und JPEG vor dem Schließen herunter — das erneute Importieren derselben Konfiguration wird in der kostenlosen Browser-Version nicht unterstützt. Wenn Sie regelmäßig mehrere verwandte Arbeitsblätter erstellen, erhalten Sie mit einer Lizenz auch Zugriff auf gespeicherte Vorlagen.',
    },
  ],
  fr: [
    {
      question: 'Vraiment aucune inscription requise ?',
      answer:
        'Exact — vous pouvez ouvrir le générateur, choisir un thème, personnaliser la mise en page et télécharger un PDF ou JPEG avec filigrane sans créer de compte. Aucun e-mail, aucune carte bancaire, aucune période d\'essai. Le filigrane est une petite mention dans un coin ; le contenu de la fiche est identique à la version payante. Une licence unique à 49 $ supprime le filigrane et active les droits de vente commerciale.',
    },
    {
      question: 'Quels formats de fichiers puis-je télécharger ?',
      answer:
        'Chaque fiche s\'exporte en PDF prêt à l\'impression à 400+ DPI et en JPEG haute résolution. Le PDF conserve le texte vectoriel et les images nettes pour une impression précise à toute taille. Le JPEG est utile pour des aperçus rapides, les publications sur les réseaux sociaux et les plateformes qui préfèrent les images matricielles. Les deux formats se téléchargent instantanément après un clic sur Exporter.',
    },
    {
      question: 'Le générateur fonctionne-t-il sur tablette, Chromebook ou ancien navigateur ?',
      answer:
        'Le générateur fonctionne sur tout navigateur moderne : Chrome, Safari, Firefox et Edge — version 90 ou ultérieure. Il fonctionne sur Chromebooks, iPads et tablettes Android ainsi que sur ordinateurs de bureau. Les anciens navigateurs (Internet Explorer, Chrome antérieur à la version 90) ne sont pas pris en charge car le générateur utilise des fonctions modernes de canvas et de rendu de polices. En cas de problème d\'affichage, une mise à jour du navigateur résout généralement la question.',
    },
    {
      question: 'Quels formats de page sont pris en charge ? Comment imprimer en A4 vs Letter ?',
      answer:
        'Le panneau Mise en page propose Letter Portrait, Letter Paysage, A4 Portrait, A4 Paysage, Carré et des dimensions personnalisées. Choisissez le format qui correspond à votre imprimante ou au marché ciblé (A4 pour la plupart des marchés européens et asiatiques, Letter pour l\'Amérique du Nord). L\'export PDF conserve exactement les dimensions choisies pour une impression fidèle sur toute imprimante.',
    },
    {
      question: 'Mes fiches sont-elles sauvegardées si je ferme l\'onglet ?',
      answer:
        'La mise en page actuelle reste uniquement en mémoire du navigateur. Fermer l\'onglet efface tout. Pour conserver une fiche entre les sessions, téléchargez le PDF et le JPEG avant de fermer — l\'import de la même configuration n\'est pas pris en charge dans la version navigateur gratuite. Si vous créez régulièrement des lots de fiches apparentées, une licence donne aussi accès aux modèles enregistrés.',
    },
  ],
};

export function getSharedUsageFAQs(locale: string): FAQ[] {
  return sharedUsageFAQs[locale] || sharedUsageFAQs.en;
}
