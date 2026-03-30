/**
 * Localized alt text templates for blog visual sections.
 * Each function returns alt text in the correct language for the given locale.
 */

const worksheetAlt: Record<string, string> = {
  en: '{app} worksheet — {variant}',
  de: '{app}-Arbeitsblatt — {variant}',
  fr: 'Fiche {app} — {variant}',
  es: 'Ficha de {app} — {variant}',
  pt: 'Ficha de {app} — {variant}',
  it: 'Scheda {app} — {variant}',
  nl: '{app}-werkblad — {variant}',
  sv: '{app}-arbetsblad — {variant}',
  da: '{app}-arbejdsark — {variant}',
  no: '{app}-arbeidsark — {variant}',
  fi: '{app}-työarkki — {variant}',
};

const answerKeyAlt: Record<string, string> = {
  en: '{app} answer key',
  de: '{app} Lösungsschlüssel',
  fr: 'Corrigé {app}',
  es: 'Clave de respuestas {app}',
  pt: 'Gabarito {app}',
  it: 'Chiave di risposta {app}',
  nl: '{app} antwoordsleutel',
  sv: '{app} facit',
  da: '{app} facit',
  no: '{app} fasit',
  fi: '{app} vastausavain',
};

const difficultyLabels: Record<string, [string, string, string]> = {
  en: ['beginner level', 'intermediate level', 'advanced level'],
  de: ['Anfängerniveau', 'Mittelstufe', 'Fortgeschritten'],
  fr: ['niveau débutant', 'niveau intermédiaire', 'niveau avancé'],
  es: ['nivel principiante', 'nivel intermedio', 'nivel avanzado'],
  pt: ['nível iniciante', 'nível intermediário', 'nível avançado'],
  it: ['livello principiante', 'livello intermedio', 'livello avanzato'],
  nl: ['beginnersniveau', 'gemiddeld niveau', 'gevorderd niveau'],
  sv: ['nybörjarnivå', 'mellannivå', 'avancerad nivå'],
  da: ['begynderniveau', 'mellemniveau', 'avanceret niveau'],
  no: ['nybegynnernivå', 'mellomnivå', 'avansert nivå'],
  fi: ['aloittelija', 'keskitaso', 'edistynyt'],
};

const productShowcaseAlt: Record<string, string> = {
  en: '{app} printable — {theme} theme',
  de: '{app}-Druckvorlage — Thema {theme}',
  fr: 'Imprimable {app} — thème {theme}',
  es: 'Imprimible {app} — tema {theme}',
  pt: 'Imprimível {app} — tema {theme}',
  it: 'Stampabile {app} — tema {theme}',
  nl: '{app} afdrukbaar — thema {theme}',
  sv: '{app} utskrivbar — tema {theme}',
  da: '{app} printbar — tema {theme}',
  no: '{app} utskrivbar — tema {theme}',
  fi: '{app} tulostettava — teema {theme}',
};

const ctaAlt: Record<string, string> = {
  en: 'Sample {app} worksheet — try the generator free',
  de: 'Beispiel {app}-Arbeitsblatt — Generator kostenlos testen',
  fr: 'Exemple de fiche {app} — essayez le générateur gratuitement',
  es: 'Ejemplo de ficha {app} — prueba el generador gratis',
  pt: 'Exemplo de ficha {app} — experimente o gerador grátis',
  it: 'Esempio di scheda {app} — prova il generatore gratis',
  nl: 'Voorbeeld {app}-werkblad — probeer de generator gratis',
  sv: 'Exempel {app}-arbetsblad — prova generatorn gratis',
  da: 'Eksempel {app}-arbejdsark — prøv generatoren gratis',
  no: 'Eksempel {app}-arbeidsark — prøv generatoren gratis',
  fi: 'Esimerkki {app}-työarkki — kokeile generaattoria ilmaiseksi',
};

const beforeAfterAlt: Record<string, string> = {
  en: 'Professional {app} worksheet created with LessonCraftStudio',
  de: 'Professionelles {app}-Arbeitsblatt erstellt mit LessonCraftStudio',
  fr: 'Fiche {app} professionnelle créée avec LessonCraftStudio',
  es: 'Ficha {app} profesional creada con LessonCraftStudio',
  pt: 'Ficha {app} profissional criada com LessonCraftStudio',
  it: 'Scheda {app} professionale creata con LessonCraftStudio',
  nl: 'Professioneel {app}-werkblad gemaakt met LessonCraftStudio',
  sv: 'Professionellt {app}-arbetsblad skapat med LessonCraftStudio',
  da: 'Professionelt {app}-arbejdsark lavet med LessonCraftStudio',
  no: 'Profesjonelt {app}-arbeidsark laget med LessonCraftStudio',
  fi: 'Ammattimainen {app}-työarkki luotu LessonCraftStudiolla',
};

function fill(template: string, vars: Record<string, string>): string {
  let result = template;
  for (const [key, val] of Object.entries(vars)) {
    result = result.replace(`{${key}}`, val);
  }
  return result;
}

/** Generate worksheet alt text */
export function worksheetAltText(locale: string, appName: string, variant: string): string {
  return fill(worksheetAlt[locale] || worksheetAlt.en, { app: appName, variant });
}

/** Generate answer key alt text */
export function answerKeyAltText(locale: string, appName: string): string {
  return fill(answerKeyAlt[locale] || answerKeyAlt.en, { app: appName });
}

/** Get difficulty tier labels for a locale */
export function getDifficultyLabels(locale: string): [string, string, string] {
  return difficultyLabels[locale] || difficultyLabels.en;
}

/** Generate product showcase card alt text */
export function productCardAltText(locale: string, appName: string, theme: string): string {
  return fill(productShowcaseAlt[locale] || productShowcaseAlt.en, { app: appName, theme });
}

/** Generate CTA section alt text */
export function ctaAltText(locale: string, appName: string): string {
  return fill(ctaAlt[locale] || ctaAlt.en, { app: appName });
}

/** Generate before/after comparison alt text */
export function beforeAfterAltText(locale: string, appName: string): string {
  return fill(beforeAfterAlt[locale] || beforeAfterAlt.en, { app: appName });
}

/** Human-readable app name from folder name */
export function appDisplayName(appFolder: string): string {
  return appFolder
    .split(/[\s-]+/)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}
