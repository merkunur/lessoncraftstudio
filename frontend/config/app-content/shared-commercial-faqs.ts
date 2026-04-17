import type { FAQ } from './types';

// Commercial-intent FAQs prepended to every /[locale]/apps/[slug] page's FAQ
// section. These focus on licensing, platforms, refunds, team use, and
// language expansion — topics that differentiate the commercial /apps/*
// pages from the informational /tools/*-maker pages.
//
// Only EN is populated today. Other locales fall back to EN (same question
// text rendered in English). Translations queued in
// docs/seo-translation-queue-2026-04.md.
export const sharedCommercialFAQs: Record<string, FAQ[]> = {
  en: [
    {
      question: 'What does the commercial license include?',
      answer:
        'Every worksheet you generate comes with a full commercial license — no attribution required, no royalties, no unit caps. You can sell the worksheets you create on Etsy, Amazon KDP, Teachers Pay Teachers, Gumroad, Creative Market, Your Own Store, or any other marketplace. The one-time $49 license covers unlimited commercial use for a single seller or business.',
    },
    {
      question: 'Can I sell worksheets on Etsy, Amazon KDP, Teachers Pay Teachers, and Gumroad?',
      answer:
        'Yes, all four platforms are covered under the commercial license. You can sell digital downloads on Etsy, compile worksheets into printed puzzle and activity books for Amazon KDP, offer classroom bundles on Teachers Pay Teachers, and distribute printables via Gumroad or your own ecommerce store. The license does not restrict which marketplace you sell on.',
    },
    {
      question: 'What is your refund policy?',
      answer:
        'We offer a 30-day refund window. If you decide the generator is not the right fit for your product line within the first 30 days, email support and we will process a full refund. After 30 days, refunds are handled case-by-case for material defects or issues with the tool.',
    },
    {
      question: 'Can I share the license with team members or employees?',
      answer:
        'A single license covers one seller account or business. If you operate as a sole proprietor, the license covers you and any virtual assistants working under your business. For teams of 3 or more people generating worksheets independently, contact support about team licensing — we offer discounted multi-seat packages.',
    },
    {
      question: 'Can I sell the same worksheet in 11 languages as separate products?',
      answer:
        'Yes. The generator supports 11 languages (English, German, French, Spanish, Portuguese, Italian, Dutch, Swedish, Danish, Norwegian, Finnish), and each language-specific version counts as a distinct product under your license. Many sellers multiply revenue per theme by exporting the same worksheet in each language and listing them as separate SKUs on Etsy or KDP.',
    },
  ],
  de: [
    {
      question: 'Was umfasst die kommerzielle Lizenz?',
      answer:
        'Jedes Arbeitsblatt, das Sie erstellen, kommt mit einer vollständigen kommerziellen Lizenz — ohne Quellennachweis, ohne Lizenzgebühren, ohne Stückzahl-Obergrenze. Sie dürfen die erstellten Arbeitsblätter auf Etsy, Amazon KDP, Teachers Pay Teachers, Gumroad, Creative Market, in Ihrem eigenen Shop oder auf jedem anderen Marktplatz verkaufen. Die einmalige Lizenz für 49 $ deckt unbegrenzte kommerzielle Nutzung für einen Verkäufer oder ein Unternehmen ab.',
    },
    {
      question: 'Darf ich Arbeitsblätter auf Etsy, Amazon KDP, Teachers Pay Teachers und Gumroad verkaufen?',
      answer:
        'Ja, alle vier Plattformen sind von der kommerziellen Lizenz abgedeckt. Sie können digitale Downloads auf Etsy verkaufen, Arbeitsblätter zu gedruckten Rätsel- und Aktivitätsbüchern für Amazon KDP zusammenstellen, Klassenraum-Bundles auf Teachers Pay Teachers anbieten und Druckvorlagen über Gumroad oder Ihren eigenen Online-Shop vertreiben. Die Lizenz schränkt nicht ein, auf welchem Marktplatz Sie verkaufen.',
    },
    {
      question: 'Wie ist die Rückerstattungsrichtlinie?',
      answer:
        'Wir bieten ein 30-tägiges Rückerstattungsfenster. Falls der Generator innerhalb der ersten 30 Tage nicht zu Ihrer Produktlinie passt, schreiben Sie dem Support und wir erstatten den vollen Betrag zurück. Nach 30 Tagen werden Rückerstattungen im Einzelfall bei materiellen Mängeln oder Problemen mit dem Tool geprüft.',
    },
    {
      question: 'Kann ich die Lizenz mit Teammitgliedern oder Mitarbeitern teilen?',
      answer:
        'Eine einzelne Lizenz deckt ein Verkäuferkonto oder Unternehmen ab. Wenn Sie Einzelunternehmer sind, deckt die Lizenz Sie und alle virtuellen Assistenten ab, die für Ihr Unternehmen arbeiten. Für Teams ab 3 Personen, die unabhängig voneinander Arbeitsblätter erstellen, kontaktieren Sie den Support wegen Team-Lizenzen — wir bieten rabattierte Mehrplatz-Pakete.',
    },
    {
      question: 'Darf ich dasselbe Arbeitsblatt in 11 Sprachen als separate Produkte verkaufen?',
      answer:
        'Ja. Der Generator unterstützt 11 Sprachen (Englisch, Deutsch, Französisch, Spanisch, Portugiesisch, Italienisch, Niederländisch, Schwedisch, Dänisch, Norwegisch, Finnisch), und jede sprachspezifische Version gilt unter Ihrer Lizenz als eigenständiges Produkt. Viele Verkäufer vervielfachen ihren Umsatz pro Thema, indem sie dasselbe Arbeitsblatt in jeder Sprache exportieren und als separate Angebote auf Etsy oder KDP listen.',
    },
  ],
  fr: [
    {
      question: 'Que comprend la licence commerciale ?',
      answer:
        'Chaque fiche générée est accompagnée d\'une licence commerciale complète — aucune attribution requise, aucune redevance, aucune limite d\'unités vendues. Vous pouvez vendre les fiches créées sur Etsy, Amazon KDP, Teachers Pay Teachers, Gumroad, Creative Market, votre propre boutique ou toute autre plateforme. La licence unique à 49 $ couvre un usage commercial illimité pour un vendeur ou une entreprise.',
    },
    {
      question: 'Puis-je vendre les fiches sur Etsy, Amazon KDP, Teachers Pay Teachers et Gumroad ?',
      answer:
        'Oui, ces quatre plateformes sont couvertes par la licence commerciale. Vous pouvez vendre des téléchargements numériques sur Etsy, compiler des fiches en livres d\'activités ou livres de casse-têtes imprimés pour Amazon KDP, proposer des packs de classe sur Teachers Pay Teachers et distribuer des imprimables via Gumroad ou votre propre boutique en ligne. La licence ne restreint pas la plateforme de vente.',
    },
    {
      question: 'Quelle est votre politique de remboursement ?',
      answer:
        'Nous offrons une fenêtre de remboursement de 30 jours. Si le générateur ne correspond pas à votre ligne de produits dans les 30 premiers jours, contactez le support et nous procéderons au remboursement intégral. Après 30 jours, les remboursements sont traités au cas par cas pour les défauts matériels ou les problèmes techniques avec l\'outil.',
    },
    {
      question: 'Puis-je partager la licence avec des membres d\'équipe ou des employés ?',
      answer:
        'Une licence unique couvre un compte vendeur ou une entreprise. Si vous êtes entrepreneur individuel, la licence vous couvre ainsi que les assistants virtuels travaillant pour votre activité. Pour les équipes de 3 personnes ou plus créant des fiches indépendamment, contactez le support concernant les licences d\'équipe — nous proposons des forfaits multi-postes à prix réduit.',
    },
    {
      question: 'Puis-je vendre la même fiche en 11 langues comme produits distincts ?',
      answer:
        'Oui. Le générateur prend en charge 11 langues (anglais, allemand, français, espagnol, portugais, italien, néerlandais, suédois, danois, norvégien, finnois), et chaque version linguistique compte comme un produit distinct sous votre licence. De nombreux vendeurs multiplient leurs revenus par thème en exportant la même fiche dans chaque langue et en les listant comme produits séparés sur Etsy ou KDP.',
    },
  ],
};

export function getSharedCommercialFAQs(locale: string): FAQ[] {
  return sharedCommercialFAQs[locale] || sharedCommercialFAQs.en;
}
