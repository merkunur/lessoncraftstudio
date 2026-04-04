/**
 * Localized fallback meta descriptions for all page types.
 * Used when content files are missing or don't have seo.metaDescription.
 * Every description is seller-focused, <=155 chars, in the correct language.
 */

const appFallback: Record<string, (name: string) => string> = {
  en: (n) => `${n} — create printable worksheets to sell on Etsy & Amazon KDP. Commercial license included. Try free with watermark.`,
  de: (n) => `${n} — druckbare Arbeitsblätter erstellen und auf Etsy & Amazon KDP verkaufen. Kommerzielle Lizenz inklusive. Kostenlos testen.`,
  fr: (n) => `${n} — créez des fiches imprimables à vendre sur Etsy & Amazon KDP. Licence commerciale incluse. Essai gratuit avec filigrane.`,
  es: (n) => `${n} — crea fichas imprimibles para vender en Etsy & Amazon KDP. Licencia comercial incluida. Prueba gratis con marca de agua.`,
  pt: (n) => `${n} — crie fichas imprimíveis para vender no Etsy & Amazon KDP. Licença comercial incluída. Teste grátis com marca d\'água.`,
  it: (n) => `${n} — crea schede stampabili da vendere su Etsy & Amazon KDP. Licenza commerciale inclusa. Prova gratis con filigrana.`,
  nl: (n) => `${n} — maak printbare werkbladen om te verkopen op Etsy & Amazon KDP. Commerciële licentie inbegrepen. Gratis proberen.`,
  sv: (n) => `${n} — skapa utskrivbara arbetsblad att sälja på Etsy & Amazon KDP. Kommersiell licens ingår. Testa gratis med vattenstämpel.`,
  da: (n) => `${n} — opret printbare opgaveark til salg på Etsy & Amazon KDP. Kommerciel licens inkluderet. Prøv gratis med vandmærke.`,
  no: (n) => `${n} — lag utskrivbare arbeidsark for salg på Etsy & Amazon KDP. Kommersiell lisens inkludert. Prøv gratis med vannmerke.`,
  fi: (n) => `${n} — luo tulostettavia työarkkeja myytäväksi Etsyssä & Amazon KDP:ssä. Kaupallinen lisenssi sisältyy. Kokeile ilmaiseksi.`,
};

const toolFallback: Record<string, (name: string) => string> = {
  en: (n) => `${n} — try free with watermark. No signup required. Export print-ready PDF worksheets instantly.`,
  de: (n) => `${n} — kostenlos mit Wasserzeichen testen. Keine Anmeldung. Druckfertige PDF-Arbeitsblätter sofort exportieren.`,
  fr: (n) => `${n} — essai gratuit avec filigrane. Sans inscription. Exportez des fiches PDF prêtes à imprimer.`,
  es: (n) => `${n} — prueba gratis con marca de agua. Sin registro. Exporta fichas PDF listas para imprimir.`,
  pt: (n) => `${n} — teste grátis com marca d\'água. Sem registo. Exporte fichas PDF prontas para impressão.`,
  it: (n) => `${n} — prova gratis con filigrana. Nessuna registrazione. Esporta schede PDF pronte per la stampa.`,
  nl: (n) => `${n} — gratis proberen met watermerk. Geen registratie nodig. Exporteer printklare PDF-werkbladen.`,
  sv: (n) => `${n} — testa gratis med vattenstämpel. Ingen registrering. Exportera utskriftsklara PDF-arbetsblad.`,
  da: (n) => `${n} — prøv gratis med vandmærke. Ingen tilmelding. Eksportér printklare PDF-opgaveark.`,
  no: (n) => `${n} — prøv gratis med vannmerke. Ingen registrering. Eksporter utskriftsklare PDF-arbeidsark.`,
  fi: (n) => `${n} — kokeile ilmaiseksi vesileimalla. Ei rekisteröitymistä. Vie tulostuskelpoisia PDF-työarkkeja.`,
};

const bundleFallback: Record<string, (name: string) => string> = {
  en: (n) => `${n} — all generators included. Create printables to sell on Etsy & KDP. Commercial license. Try free with watermark.`,
  de: (n) => `${n} — alle Generatoren inklusive. Druckvorlagen für Etsy & KDP erstellen. Kommerzielle Lizenz. Kostenlos testen.`,
  fr: (n) => `${n} — tous les générateurs inclus. Créez des imprimables à vendre sur Etsy & KDP. Licence commerciale. Essai gratuit.`,
  es: (n) => `${n} — todos los generadores incluidos. Crea imprimibles para vender en Etsy & KDP. Licencia comercial. Prueba gratis.`,
  pt: (n) => `${n} — todos os geradores incluídos. Crie imprimíveis para vender no Etsy & KDP. Licença comercial. Teste grátis.`,
  it: (n) => `${n} — tutti i generatori inclusi. Crea stampabili da vendere su Etsy & KDP. Licenza commerciale. Prova gratis.`,
  nl: (n) => `${n} — alle generatoren inbegrepen. Maak printables om te verkopen op Etsy & KDP. Commerciële licentie. Gratis proberen.`,
  sv: (n) => `${n} — alla generatorer ingår. Skapa utskrivbara produkter att sälja på Etsy & KDP. Kommersiell licens. Testa gratis.`,
  da: (n) => `${n} — alle generatorer inkluderet. Opret printbare produkter til salg på Etsy & KDP. Kommerciel licens. Prøv gratis.`,
  no: (n) => `${n} — alle generatorer inkludert. Lag utskrivbare produkter for salg på Etsy & KDP. Kommersiell lisens. Prøv gratis.`,
  fi: (n) => `${n} — kaikki generaattorit mukana. Luo tulostettavia tuotteita myytäväksi Etsyssä & KDP:ssä. Kaupallinen lisenssi. Kokeile ilmaiseksi.`,
};

const guideFallback: Record<string, string> = {
  en: 'Step-by-step guide for printable sellers. Learn how to create, list, and sell on Etsy & Amazon KDP.',
  de: 'Schritt-für-Schritt-Anleitung für Printable-Verkäufer. Auf Etsy & Amazon KDP erstellen, listen und verkaufen.',
  fr: 'Guide étape par étape pour les vendeurs d\'imprimables. Créez, publiez et vendez sur Etsy & Amazon KDP.',
  es: 'Guía paso a paso para vendedores de imprimibles. Crea, publica y vende en Etsy & Amazon KDP.',
  pt: 'Guia passo a passo para vendedores de imprimíveis. Crie, publique e venda no Etsy & Amazon KDP.',
  it: 'Guida passo passo per venditori di stampabili. Crea, pubblica e vendi su Etsy & Amazon KDP.',
  nl: 'Stapsgewijze gids voor printable-verkopers. Maak, publiceer en verkoop op Etsy & Amazon KDP.',
  sv: 'Steg-för-steg-guide för försäljare av utskrivbara produkter. Skapa, publicera och sälj på Etsy & Amazon KDP.',
  da: 'Trin-for-trin-guide til printbare produkter. Opret, publicer og sælg på Etsy & Amazon KDP.',
  no: 'Steg-for-steg-guide for selgere av utskrivbare produkter. Lag, publiser og selg på Etsy & Amazon KDP.',
  fi: 'Vaiheittainen opas tulostettavien tuotteiden myyjille. Luo, julkaise ja myy Etsyssä & Amazon KDP:ssä.',
};

const ideaFallback: Record<string, string> = {
  en: 'Printable business ideas for Etsy & Amazon KDP sellers. Niche inspiration, product ideas, and market tips.',
  de: 'Geschäftsideen für Druckvorlagen auf Etsy & Amazon KDP. Nischen-Inspiration, Produktideen und Markttipps.',
  fr: 'Idées de business imprimables pour Etsy & Amazon KDP. Inspiration de niches, idées de produits et conseils.',
  es: 'Ideas de negocio de imprimibles para Etsy & Amazon KDP. Inspiración de nichos, ideas de productos y consejos.',
  pt: 'Ideias de negócio de imprimíveis para Etsy & Amazon KDP. Inspiração de nichos, ideias de produtos e dicas.',
  it: 'Idee di business per stampabili su Etsy & Amazon KDP. Ispirazione di nicchia, idee di prodotto e consigli.',
  nl: 'Zakelijke ideeën voor printables op Etsy & Amazon KDP. Niche-inspiratie, productideeën en markttips.',
  sv: 'Affärsidéer för utskrivbara produkter på Etsy & Amazon KDP. Nischinspiration, produktidéer och marknadstips.',
  da: 'Forretningsidéer for printbare produkter på Etsy & Amazon KDP. Nicheinspiration, produktidéer og markedstips.',
  no: 'Forretningsidéer for utskrivbare produkter på Etsy & Amazon KDP. Nisjeinspirason, produktidéer og markedstips.',
  fi: 'Liiketoimintaideoita tulostettaville tuotteille Etsyssä & Amazon KDP:ssä. Nicheinspiraatiota, tuoteideoita ja markkinavinkkejä.',
};

const startFallback: Record<string, string> = {
  en: 'Start your printable business. A complete beginner\'s guide to selling worksheets on Etsy & Amazon KDP.',
  de: 'Starten Sie Ihr Printable-Geschäft. Komplette Anleitung für Anfänger zum Verkauf auf Etsy & Amazon KDP.',
  fr: 'Lancez votre business d\'imprimables. Guide complet pour débutants pour vendre sur Etsy & Amazon KDP.',
  es: 'Inicia tu negocio de imprimibles. Guía completa para principiantes para vender en Etsy & Amazon KDP.',
  pt: 'Inicie o seu negócio de imprimíveis. Guia completo para iniciantes para vender no Etsy & Amazon KDP.',
  it: 'Avvia il tuo business di stampabili. Guida completa per principianti per vendere su Etsy & Amazon KDP.',
  nl: 'Start uw printable-bedrijf. Complete beginnersgids voor verkopen op Etsy & Amazon KDP.',
  sv: 'Starta ditt företag med utskrivbara produkter. Komplett nybörjarguide för försäljning på Etsy & Amazon KDP.',
  da: 'Start din printbare forretning. Komplet begynderguide til salg på Etsy & Amazon KDP.',
  no: 'Start din utskrivbare virksomhet. Komplett nybegynnerguide for salg på Etsy & Amazon KDP.',
  fi: 'Aloita tulostettavien tuotteiden liiketoiminta. Täydellinen aloittelijan opas myyntiin Etsyssä & Amazon KDP:ssä.',
};

export function getAppFallbackDescription(appName: string, locale: string): string {
  const fn = appFallback[locale] || appFallback.en;
  return fn(appName);
}

export function getToolFallbackDescription(toolName: string, locale: string): string {
  const fn = toolFallback[locale] || toolFallback.en;
  return fn(toolName);
}

export function getBundleFallbackDescription(bundleName: string, locale: string): string {
  const fn = bundleFallback[locale] || bundleFallback.en;
  return fn(bundleName);
}

export function getGuideFallbackDescription(locale: string): string {
  return guideFallback[locale] || guideFallback.en;
}

export function getIdeaFallbackDescription(locale: string): string {
  return ideaFallback[locale] || ideaFallback.en;
}

export function getStartFallbackDescription(locale: string): string {
  return startFallback[locale] || startFallback.en;
}
