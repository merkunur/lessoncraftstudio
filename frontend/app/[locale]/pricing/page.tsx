import { Metadata } from 'next';
import Link from 'next/link';
import { SUPPORTED_LOCALES } from '@/config/locales';
import { getHreflangCode, ogLocaleMap } from '@/lib/schema-generator';
import { ALL_APPS, APP_CATEGORIES, type CategoryId } from '@/config/products';
import { APP_NAME_TRANSLATIONS, CATEGORY_NAME_TRANSLATIONS } from '@/config/app-translations';
import { getCheckoutUrl, getBundleCheckoutUrl } from '@/config/lemonsqueezy-products';
import FAQAccordion from '@/components/FAQAccordion';

const baseUrl = 'https://www.lessoncraftstudio.com';

// ============================================================
// LOCALE CONTENT (11 locales)
// ============================================================

const pricingContent: Record<string, {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  heroBadge: string;
  heroTitle: string;
  heroSubtitle: string;
  freeTier: { name: string; price: string; tagline: string; features: string[]; cta: string };
  individualTier: { name: string; price: string; per: string; tagline: string; features: string[]; cta: string };
  bundleTier: { name: string; price: string; per: string; tagline: string; features: string[]; badge: string; cta: string };
  bundlesTitle: string;
  bundlesSubtitle: string;
  appsIncluded: string;
  oneTime: string;
  perApp: string;
  perBundle: string;
  faq: { question: string; answer: string }[];
  faqTitle: string;
  ctaTitle: string;
  ctaSubtitle: string;
  ctaButton: string;
  comingSoon: string;
  noRefund: string;
  buyApp: string;
  buyBundle: string;
  saveVsIndividual: string;
  catalogTitle: string;
  catalogSubtitle: string;
}> = {
  en: {
    metaTitle: 'Pricing - Professional Printable Generators | LessonCraftStudio',
    metaDescription: 'Try all 33 printable generators free with watermark. Individual apps $49, category bundles $149. One-time payment, commercial license included. Sell on Etsy, KDP & more.',
    keywords: ['printable generator pricing', 'commercial license printables', 'Etsy printable tools pricing', 'worksheet generator buy', 'KDP printable generator cost'],
    heroBadge: '33 Generators | 6 Bundles | One-Time Payment',
    heroTitle: 'Simple Pricing. No Subscriptions.',
    heroSubtitle: 'Try every generator free with watermark. When you\'re ready, unlock clean exports with a one-time purchase.',
    freeTier: {
      name: 'Free Trial',
      price: '$0',
      tagline: 'Try all 33 generators with watermark',
      features: [
        'All 33 printable generators',
        'Full feature access',
        'Watermark on downloads',
        'No signup required',
        '11 languages included',
        '3,000+ theme images',
      ],
      cta: 'Try Generators Now',
    },
    individualTier: {
      name: 'Individual App',
      price: '$49',
      per: 'per app',
      tagline: 'One generator, full commercial license',
      features: [
        'Clean PDFs without watermark',
        'Full commercial license',
        'Sell on Etsy, KDP & anywhere',
        'One-time payment',
        '11 languages included',
        'Answer keys included',
      ],
      cta: 'Browse Apps',
    },
    bundleTier: {
      name: 'Category Bundle',
      price: '$149',
      per: 'per bundle',
      tagline: 'All generators in a category, best value',
      features: [
        'All apps in a category (4-7 apps)',
        'Clean PDFs without watermark',
        'Full commercial license',
        'Save up to 70% vs individual',
        'One-time payment',
        '11 languages included',
      ],
      badge: 'Best Value',
      cta: 'Browse Bundles',
    },
    bundlesTitle: '6 Category Bundles Available',
    bundlesSubtitle: 'Each bundle includes all generators in a category with full commercial license.',
    appsIncluded: 'apps included',
    oneTime: 'One-time payment',
    perApp: 'per app',
    perBundle: 'per bundle',
    faq: [
      { question: 'Is it really free to try?', answer: 'Yes! All 33 generators are free to try with full feature access. Your downloads will include a small watermark. No signup, no credit card, no time limit. Try as many generators as you want before deciding to purchase.' },
      { question: 'Why is there no refund policy?', answer: 'Because you can try everything free with watermark before purchasing. You know exactly what you\'re getting. The paid license simply removes the watermark and grants commercial rights to sell your creations.' },
      { question: 'What does the commercial license include?', answer: 'Full commercial rights to sell the printables you create. Sell on Etsy, Amazon KDP, Gumroad, your own website, or any other platform. No attribution required, no royalties, no limits on sales volume.' },
      { question: 'What\'s the difference between individual and bundle?', answer: 'An individual license covers one specific generator for $49. A bundle covers all generators in a category (4-7 apps) for $149 - saving up to 70% compared to buying individually.' },
      { question: 'What payment methods are accepted?', answer: 'We use Lemon Squeezy for secure payments, which supports all major credit cards, PayPal, and more.' },
      { question: 'How do I access my purchased apps?', answer: 'After purchase, sign in at lessoncraftstudio.com/member with the same email you used to buy. Your apps will be unlocked automatically.' },
    ],
    faqTitle: 'Frequently Asked Questions',
    ctaTitle: 'Try All 33 Generators Free',
    ctaSubtitle: 'No signup needed. See the quality before you buy. Every generator is free to try with watermark.',
    ctaButton: 'Explore Generators',
    comingSoon: 'Coming Soon',
    noRefund: 'No refunds - try free with watermark first',
    buyApp: 'Buy for $49',
    buyBundle: 'Buy Bundle for $149',
    saveVsIndividual: 'Save vs individual',
    catalogTitle: 'Choose Your Apps',
    catalogSubtitle: 'Buy individual apps for $49 each, or save with a category bundle for $149.',
  },
  de: {
    metaTitle: 'Preise - Professionelle Druckvorlagen-Generatoren | LessonCraftStudio',
    metaDescription: 'Alle 33 Generatoren kostenlos mit Wasserzeichen testen. Einzelne Apps 49 $, Kategorie-Pakete 149 $. Einmalzahlung mit Gewerbslizenz.',
    keywords: ['Druckvorlagen Generator Preise', 'Gewerbslizenz Druckvorlagen', 'Etsy Druckvorlagen Kosten', 'Arbeitsblatt Generator kaufen'],
    heroBadge: '33 Generatoren | 6 Pakete | Einmalzahlung',
    heroTitle: 'Klare Preise. Kein Abo.',
    heroSubtitle: 'Testen Sie jeden Generator kostenlos mit Wasserzeichen. Wenn Sie bereit sind, schalten Sie saubere Exporte mit einer Einmalzahlung frei.',
    freeTier: {
      name: 'Kostenlos testen',
      price: '0 $',
      tagline: 'Alle 33 Generatoren mit Wasserzeichen testen',
      features: [
        'Alle 33 Druckvorlagen-Generatoren',
        'Voller Funktionsumfang',
        'Wasserzeichen auf Downloads',
        'Keine Anmeldung nötig',
        '11 Sprachen inklusive',
        '3.000+ Themenbilder',
      ],
      cta: 'Jetzt testen',
    },
    individualTier: {
      name: 'Einzelne App',
      price: '49 $',
      per: 'pro App',
      tagline: 'Ein Generator, volle Gewerbslizenz',
      features: [
        'Saubere PDFs ohne Wasserzeichen',
        'Volle Gewerbslizenz',
        'Verkaufen auf Etsy, KDP & überall',
        'Einmalzahlung',
        '11 Sprachen inklusive',
        'Lösungsschlüssel inklusive',
      ],
      cta: 'Demnächst verfügbar',
    },
    bundleTier: {
      name: 'Kategorie-Paket',
      price: '149 $',
      per: 'pro Paket',
      tagline: 'Alle Generatoren einer Kategorie, bester Wert',
      features: [
        'Alle Apps einer Kategorie (4-7 Apps)',
        'Saubere PDFs ohne Wasserzeichen',
        'Volle Gewerbslizenz',
        'Bis zu 70 % sparen vs. Einzelkauf',
        'Einmalzahlung',
        '11 Sprachen inklusive',
      ],
      badge: 'Bestes Angebot',
      cta: 'Demnächst verfügbar',
    },
    bundlesTitle: '6 Kategorie-Pakete verfügbar',
    bundlesSubtitle: 'Jedes Paket enthält alle Generatoren einer Kategorie mit voller Gewerbslizenz.',
    appsIncluded: 'Apps enthalten',
    oneTime: 'Einmalzahlung',
    perApp: 'pro App',
    perBundle: 'pro Paket',
    faq: [
      { question: 'Ist es wirklich kostenlos zum Testen?', answer: 'Ja! Alle 33 Generatoren sind kostenlos testbar mit vollem Funktionsumfang. Downloads enthalten ein kleines Wasserzeichen. Keine Anmeldung, keine Kreditkarte, kein Zeitlimit.' },
      { question: 'Warum gibt es keine Erstattung?', answer: 'Weil Sie alles kostenlos mit Wasserzeichen testen können, bevor Sie kaufen. Sie wissen genau, was Sie bekommen. Die Lizenz entfernt lediglich das Wasserzeichen und gewährt Gewerberechte.' },
      { question: 'Was beinhaltet die Gewerbslizenz?', answer: 'Volle kommerzielle Rechte zum Verkauf Ihrer erstellten Druckvorlagen. Verkaufen Sie auf Etsy, Amazon KDP, Gumroad oder Ihrer eigenen Website. Keine Namensnennung, keine Tantiemen.' },
      { question: 'Was ist der Unterschied zwischen Einzel und Paket?', answer: 'Eine Einzellizenz deckt einen Generator für 49 $ ab. Ein Paket deckt alle Generatoren einer Kategorie (4-7 Apps) für 149 $ ab - bis zu 70 % Ersparnis.' },
      { question: 'Welche Zahlungsmethoden werden akzeptiert?', answer: 'Wir richten die Zahlung über Lemon Squeezy ein, das alle gängigen Kreditkarten, PayPal und mehr unterstützt. Kaufoptionen sind bald verfügbar.' },
      { question: 'Wann sind Käufe möglich?', answer: 'Wir richten derzeit unser Zahlungssystem ein. Testen Sie in der Zwischenzeit alle 33 Generatoren kostenlos mit Wasserzeichen.' },
    ],
    faqTitle: 'Häufige Fragen',
    ctaTitle: 'Alle 33 Generatoren kostenlos testen',
    ctaSubtitle: 'Keine Anmeldung nötig. Überzeugen Sie sich von der Qualität. Alle Generatoren kostenlos mit Wasserzeichen.',
    ctaButton: 'Generatoren entdecken',
    comingSoon: 'Demnächst verfügbar',
    noRefund: 'Keine Erstattung - erst kostenlos mit Wasserzeichen testen',
    buyApp: 'Kaufen fur $49',
    buyBundle: 'Paket kaufen fur $149',
    saveVsIndividual: 'Sparen vs. einzeln',
    catalogTitle: 'Wahlen Sie Ihre Apps',
    catalogSubtitle: 'Einzelne Apps fur $49 oder sparen Sie mit einem Kategorie-Paket fur $149.',
  },
  fr: {
    metaTitle: 'Tarifs - Générateurs d\'imprimables professionnels | LessonCraftStudio',
    metaDescription: 'Essayez les 33 générateurs gratuitement avec filigrane. Apps individuelles 49 $, packs catégorie 149 $. Achat unique, licence commerciale incluse.',
    keywords: ['tarifs générateur imprimables', 'licence commerciale imprimables', 'outils Etsy imprimables prix', 'générateur fiches achat'],
    heroBadge: '33 générateurs | 6 packs | Achat unique',
    heroTitle: 'Tarifs simples. Sans abonnement.',
    heroSubtitle: 'Essayez chaque générateur gratuitement avec filigrane. Quand vous êtes prêt, débloquez les exports sans filigrane.',
    freeTier: {
      name: 'Essai gratuit',
      price: '0 $',
      tagline: 'Essayez les 33 générateurs avec filigrane',
      features: [
        'Les 33 générateurs d\'imprimables',
        'Accès complet aux fonctions',
        'Filigrane sur les téléchargements',
        'Aucune inscription requise',
        '11 langues incluses',
        '3 000+ images thématiques',
      ],
      cta: 'Essayer maintenant',
    },
    individualTier: {
      name: 'Application individuelle',
      price: '49 $',
      per: 'par application',
      tagline: 'Un générateur, licence commerciale complète',
      features: [
        'PDF sans filigrane',
        'Licence commerciale complète',
        'Vendre sur Etsy, KDP et partout',
        'Achat unique',
        '11 langues incluses',
        'Corrigés inclus',
      ],
      cta: 'Bientôt disponible',
    },
    bundleTier: {
      name: 'Pack catégorie',
      price: '149 $',
      per: 'par pack',
      tagline: 'Tous les générateurs d\'une catégorie, meilleure offre',
      features: [
        'Toutes les apps d\'une catégorie (4-7 apps)',
        'PDF sans filigrane',
        'Licence commerciale complète',
        'Jusqu\'à 70 % d\'économie vs individuel',
        'Achat unique',
        '11 langues incluses',
      ],
      badge: 'Meilleure offre',
      cta: 'Bientôt disponible',
    },
    bundlesTitle: '6 packs catégorie disponibles',
    bundlesSubtitle: 'Chaque pack inclut tous les générateurs d\'une catégorie avec licence commerciale.',
    appsIncluded: 'applications incluses',
    oneTime: 'Achat unique',
    perApp: 'par application',
    perBundle: 'par pack',
    faq: [
      { question: 'C\'est vraiment gratuit à essayer ?', answer: 'Oui ! Les 33 générateurs sont gratuits avec accès complet. Vos téléchargements incluent un filigrane. Aucune inscription, aucune carte bancaire, aucune limite de temps.' },
      { question: 'Pourquoi pas de remboursement ?', answer: 'Parce que vous pouvez tout essayer gratuitement avec filigrane avant d\'acheter. Vous savez exactement ce que vous obtenez. La licence retire simplement le filigrane et accorde les droits commerciaux.' },
      { question: 'Que comprend la licence commerciale ?', answer: 'Droits commerciaux complets pour vendre vos créations. Vendez sur Etsy, Amazon KDP, Gumroad ou votre site. Aucune attribution requise, aucune redevance.' },
      { question: 'Quelle différence entre individuel et pack ?', answer: 'Une licence individuelle couvre un générateur pour 49 $. Un pack couvre tous les générateurs d\'une catégorie (4-7 apps) pour 149 $ - jusqu\'à 70 % d\'économie.' },
      { question: 'Quels moyens de paiement seront acceptés ?', answer: 'Nous mettons en place le paiement via Lemon Squeezy, qui accepte les cartes bancaires, PayPal et plus. Les options d\'achat seront bientôt disponibles.' },
      { question: 'Quand les achats seront-ils disponibles ?', answer: 'Nous configurons notre système de paiement. En attendant, essayez les 33 générateurs gratuitement avec filigrane.' },
    ],
    faqTitle: 'Questions fréquentes',
    ctaTitle: 'Essayez les 33 générateurs gratuitement',
    ctaSubtitle: 'Aucune inscription. Jugez la qualité avant d\'acheter. Chaque générateur est gratuit avec filigrane.',
    ctaButton: 'Explorer les générateurs',
    comingSoon: 'Bientôt disponible',
    noRefund: 'Pas de remboursement - essayez gratuitement avec filigrane d\'abord',
    buyApp: 'Acheter pour $49',
    buyBundle: 'Acheter le pack pour $149',
    saveVsIndividual: 'Economisez vs. individuel',
    catalogTitle: 'Choisissez vos applications',
    catalogSubtitle: 'Achetez des applications individuelles pour $49 ou economisez avec un pack categorie pour $149.',
  },
  es: {
    metaTitle: 'Precios - Generadores de imprimibles profesionales | LessonCraftStudio',
    metaDescription: 'Prueba los 33 generadores gratis con marca de agua. Apps individuales 49 $, paquetes 149 $. Pago único, licencia comercial incluida.',
    keywords: ['precios generador imprimibles', 'licencia comercial imprimibles', 'herramientas Etsy imprimibles precio', 'generador fichas comprar'],
    heroBadge: '33 generadores | 6 paquetes | Pago único',
    heroTitle: 'Precios claros. Sin suscripciones.',
    heroSubtitle: 'Prueba cada generador gratis con marca de agua. Cuando estés listo, desbloquea exportaciones limpias con un pago único.',
    freeTier: {
      name: 'Prueba gratuita',
      price: '0 $',
      tagline: 'Prueba los 33 generadores con marca de agua',
      features: [
        'Los 33 generadores de imprimibles',
        'Acceso completo a funciones',
        'Marca de agua en descargas',
        'Sin registro necesario',
        '11 idiomas incluidos',
        '3.000+ imágenes temáticas',
      ],
      cta: 'Probar ahora',
    },
    individualTier: {
      name: 'App individual',
      price: '49 $',
      per: 'por app',
      tagline: 'Un generador, licencia comercial completa',
      features: [
        'PDFs limpios sin marca de agua',
        'Licencia comercial completa',
        'Vender en Etsy, KDP y donde quieras',
        'Pago único',
        '11 idiomas incluidos',
        'Claves de respuestas incluidas',
      ],
      cta: 'Disponible pronto',
    },
    bundleTier: {
      name: 'Paquete categoría',
      price: '149 $',
      per: 'por paquete',
      tagline: 'Todos los generadores de una categoría, mejor precio',
      features: [
        'Todas las apps de una categoría (4-7 apps)',
        'PDFs limpios sin marca de agua',
        'Licencia comercial completa',
        'Ahorra hasta 70 % vs individual',
        'Pago único',
        '11 idiomas incluidos',
      ],
      badge: 'Mejor precio',
      cta: 'Disponible pronto',
    },
    bundlesTitle: '6 paquetes de categoría disponibles',
    bundlesSubtitle: 'Cada paquete incluye todos los generadores de una categoría con licencia comercial.',
    appsIncluded: 'apps incluidas',
    oneTime: 'Pago único',
    perApp: 'por app',
    perBundle: 'por paquete',
    faq: [
      { question: 'Es realmente gratis para probar?', answer: 'Todos los 33 generadores son gratis para probar con acceso completo. Las descargas incluyen una marca de agua. Sin registro, sin tarjeta, sin límite de tiempo.' },
      { question: 'Por qué no hay reembolso?', answer: 'Porque puedes probar todo gratis con marca de agua antes de comprar. Sabes exactamente lo que obtienes. La licencia simplemente elimina la marca de agua y otorga derechos comerciales.' },
      { question: 'Qué incluye la licencia comercial?', answer: 'Derechos comerciales completos para vender tus creaciones. Vende en Etsy, Amazon KDP, Gumroad o tu propio sitio. Sin atribución, sin regalías.' },
      { question: 'Cuál es la diferencia entre individual y paquete?', answer: 'Una licencia individual cubre un generador por 49 $. Un paquete cubre todos los generadores de una categoría (4-7 apps) por 149 $ - ahorro de hasta 70 %.' },
      { question: 'Qué métodos de pago se aceptarán?', answer: 'Estamos configurando pagos a través de Lemon Squeezy, que acepta tarjetas, PayPal y más. Las opciones de compra estarán disponibles pronto.' },
      { question: 'Cuándo estarán disponibles las compras?', answer: 'Estamos configurando nuestro sistema de pagos. Mientras tanto, prueba los 33 generadores gratis con marca de agua.' },
    ],
    faqTitle: 'Preguntas frecuentes',
    ctaTitle: 'Prueba los 33 generadores gratis',
    ctaSubtitle: 'Sin registro. Comprueba la calidad antes de comprar. Cada generador es gratis con marca de agua.',
    ctaButton: 'Explorar generadores',
    comingSoon: 'Disponible pronto',
    noRefund: 'Sin reembolso - prueba gratis con marca de agua primero',
    buyApp: 'Comprar por $49',
    buyBundle: 'Comprar paquete por $149',
    saveVsIndividual: 'Ahorra vs. individual',
    catalogTitle: 'Elige tus aplicaciones',
    catalogSubtitle: 'Compra aplicaciones individuales por $49 o ahorra con un paquete de categoria por $149.',
  },
  pt: {
    metaTitle: 'Preços - Geradores de imprimíveis profissionais | LessonCraftStudio',
    metaDescription: 'Teste todos os 33 geradores grátis com marca d\'água. Apps individuais 49 $, pacotes 149 $. Pagamento único, licença comercial incluída.',
    keywords: ['preços gerador imprimíveis', 'licença comercial imprimíveis', 'ferramentas Etsy imprimíveis preço', 'gerador fichas comprar'],
    heroBadge: '33 geradores | 6 pacotes | Pagamento único',
    heroTitle: 'Preços simples. Sem assinatura.',
    heroSubtitle: 'Teste cada gerador grátis com marca d\'água. Quando estiver pronto, desbloqueie exportações limpas com pagamento único.',
    freeTier: {
      name: 'Teste grátis',
      price: '0 $',
      tagline: 'Teste todos os 33 geradores com marca d\'água',
      features: [
        'Todos os 33 geradores de imprimíveis',
        'Acesso completo às funções',
        'Marca d\'água nos downloads',
        'Sem cadastro necessário',
        '11 idiomas incluídos',
        '3.000+ imagens temáticas',
      ],
      cta: 'Testar agora',
    },
    individualTier: {
      name: 'App individual',
      price: '49 $',
      per: 'por app',
      tagline: 'Um gerador, licença comercial completa',
      features: [
        'PDFs limpos sem marca d\'água',
        'Licença comercial completa',
        'Vender na Hotmart, Etsy, KDP e mais',
        'Pagamento único',
        '11 idiomas incluídos',
        'Gabaritos incluídos',
      ],
      cta: 'Em breve',
    },
    bundleTier: {
      name: 'Pacote categoria',
      price: '149 $',
      per: 'por pacote',
      tagline: 'Todos os geradores de uma categoria, melhor valor',
      features: [
        'Todas as apps de uma categoria (4-7 apps)',
        'PDFs limpos sem marca d\'água',
        'Licença comercial completa',
        'Economize até 70 % vs individual',
        'Pagamento único',
        '11 idiomas incluídos',
      ],
      badge: 'Melhor valor',
      cta: 'Em breve',
    },
    bundlesTitle: '6 pacotes de categoria disponíveis',
    bundlesSubtitle: 'Cada pacote inclui todos os geradores de uma categoria com licença comercial.',
    appsIncluded: 'apps incluídos',
    oneTime: 'Pagamento único',
    perApp: 'por app',
    perBundle: 'por pacote',
    faq: [
      { question: 'É realmente grátis para testar?', answer: 'Sim! Todos os 33 geradores são grátis com acesso completo. Downloads incluem marca d\'água. Sem cadastro, sem cartão, sem limite de tempo.' },
      { question: 'Por que não há reembolso?', answer: 'Porque você pode testar tudo grátis com marca d\'água antes de comprar. Você sabe exatamente o que está adquirindo.' },
      { question: 'O que a licença comercial inclui?', answer: 'Direitos comerciais completos para vender suas criações. Venda na Hotmart, Etsy, Amazon KDP ou seu próprio site. Sem atribuição, sem royalties.' },
      { question: 'Qual a diferença entre individual e pacote?', answer: 'Uma licença individual cobre um gerador por 49 $. Um pacote cobre todos os geradores de uma categoria (4-7 apps) por 149 $ - economia de até 70 %.' },
      { question: 'Quais métodos de pagamento serão aceitos?', answer: 'Estamos configurando pagamentos via Lemon Squeezy, que aceita cartões, PayPal e mais. Opções de compra disponíveis em breve.' },
      { question: 'Quando as compras estarão disponíveis?', answer: 'Estamos configurando nosso sistema de pagamentos. Enquanto isso, teste os 33 geradores grátis com marca d\'água.' },
    ],
    faqTitle: 'Perguntas frequentes',
    ctaTitle: 'Teste todos os 33 geradores grátis',
    ctaSubtitle: 'Sem cadastro. Veja a qualidade antes de comprar. Cada gerador é grátis com marca d\'água.',
    ctaButton: 'Explorar geradores',
    comingSoon: 'Em breve',
    noRefund: 'Sem reembolso - teste gratis com marca d\'agua primeiro',
    buyApp: 'Comprar por $49',
    buyBundle: 'Comprar pacote por $149',
    saveVsIndividual: 'Economize vs. individual',
    catalogTitle: 'Escolha seus aplicativos',
    catalogSubtitle: 'Compre aplicativos individuais por $49 ou economize com um pacote de categoria por $149.',
  },
  it: {
    metaTitle: 'Prezzi | Generatori di schede da 49 EUR — Pagamento unico',
    metaDescription: 'Prova i 33 generatori gratis con filigrana. App singole a 49 EUR, pacchetti categoria da 99 EUR. Pagamento unico, licenza commerciale, senza abbonamento.',
    keywords: ['prezzi generatore stampabili', 'licenza commerciale stampabili', 'strumenti Etsy stampabili prezzo', 'generatore schede acquista'],
    heroBadge: '33 generatori | 6 pacchetti | Acquisto unico',
    heroTitle: 'Prezzi semplici. Nessun abbonamento.',
    heroSubtitle: 'Prova ogni generatore gratis con filigrana. Quando sei pronto, sblocca le esportazioni pulite con un acquisto unico.',
    freeTier: {
      name: 'Prova gratuita',
      price: '0 $',
      tagline: 'Prova tutti i 33 generatori con filigrana',
      features: [
        'Tutti i 33 generatori di stampabili',
        'Accesso completo alle funzioni',
        'Filigrana sui download',
        'Nessuna registrazione necessaria',
        '11 lingue incluse',
        '3.000+ immagini tematiche',
      ],
      cta: 'Prova ora',
    },
    individualTier: {
      name: 'App singola',
      price: '49 $',
      per: 'per app',
      tagline: 'Un generatore, licenza commerciale completa',
      features: [
        'PDF puliti senza filigrana',
        'Licenza commerciale completa',
        'Vendi su Etsy, KDP e ovunque',
        'Acquisto unico',
        '11 lingue incluse',
        'Soluzioni incluse',
      ],
      cta: 'Prossimamente',
    },
    bundleTier: {
      name: 'Pacchetto categoria',
      price: '149 $',
      per: 'per pacchetto',
      tagline: 'Tutti i generatori di una categoria, miglior valore',
      features: [
        'Tutte le app di una categoria (4-7 app)',
        'PDF puliti senza filigrana',
        'Licenza commerciale completa',
        'Risparmia fino al 70 % vs singolo',
        'Acquisto unico',
        '11 lingue incluse',
      ],
      badge: 'Miglior valore',
      cta: 'Prossimamente',
    },
    bundlesTitle: '6 pacchetti categoria disponibili',
    bundlesSubtitle: 'Ogni pacchetto include tutti i generatori di una categoria con licenza commerciale.',
    appsIncluded: 'app incluse',
    oneTime: 'Acquisto unico',
    perApp: 'per app',
    perBundle: 'per pacchetto',
    faq: [
      { question: 'Si può davvero provare gratis?', answer: 'Tutti i 33 generatori sono gratis da provare con accesso completo. I download includono una filigrana. Nessuna registrazione, nessuna carta di credito.' },
      { question: 'Perché non ci sono rimborsi?', answer: 'Perché puoi provare tutto gratis con filigrana prima di acquistare. Sai esattamente cosa ottieni.' },
      { question: 'Cosa include la licenza commerciale?', answer: 'Diritti commerciali completi per vendere le tue creazioni. Vendi su Etsy, Amazon KDP, Gumroad o il tuo sito. Nessuna attribuzione, nessuna royalty.' },
      { question: 'Qual è la differenza tra singolo e pacchetto?', answer: 'Una licenza singola copre un generatore per 49 $. Un pacchetto copre tutti i generatori di una categoria (4-7 app) per 149 $ - risparmio fino al 70 %.' },
      { question: 'Quali metodi di pagamento saranno accettati?', answer: 'Stiamo configurando i pagamenti tramite Lemon Squeezy, che supporta carte, PayPal e altro. Opzioni di acquisto disponibili a breve.' },
      { question: 'Quando saranno disponibili gli acquisti?', answer: 'Stiamo configurando il nostro sistema di pagamento. Nel frattempo, prova tutti i 33 generatori gratis con filigrana.' },
    ],
    faqTitle: 'Domande frequenti',
    ctaTitle: 'Prova tutti i 33 generatori gratis',
    ctaSubtitle: 'Nessuna registrazione. Verifica la qualità prima dell\'acquisto. Ogni generatore è gratis con filigrana.',
    ctaButton: 'Esplora i generatori',
    comingSoon: 'Prossimamente',
    noRefund: 'Nessun rimborso - prova gratis con filigrana prima',
    buyApp: 'Acquista per $49',
    buyBundle: 'Acquista pacchetto per $149',
    saveVsIndividual: 'Risparmia vs. individuale',
    catalogTitle: 'Scegli le tue app',
    catalogSubtitle: 'Acquista singole app per $49 o risparmia con un pacchetto categoria per $149.',
  },
  nl: {
    metaTitle: 'Prijzen | Werkblad-generatoren vanaf €49 — Eenmalige betaling',
    metaDescription: 'Probeer alle 33 generatoren gratis met watermerk. Individuele apps €49, categoriebundels vanaf €99. Eenmalige betaling, commerciële licentie, geen abonnement.',
    keywords: ['werkblad-generatoren prijzen', 'commerciële licentie werkbladen', 'werkblad generator kopen', 'printables tools prijzen'],
    heroBadge: '33 generators | 6 bundels | Eenmalige betaling',
    heroTitle: 'Duidelijke prijzen. Geen abonnement.',
    heroSubtitle: 'Probeer elke generator gratis met watermerk. Wanneer je klaar bent, ontgrendel je schone exports met een eenmalige betaling.',
    freeTier: {
      name: 'Gratis proberen',
      price: '$ 0',
      tagline: 'Probeer alle 33 generators met watermerk',
      features: [
        'Alle 33 printbare generators',
        'Volledige functietoegang',
        'Watermerk op downloads',
        'Geen registratie nodig',
        '11 talen inbegrepen',
        '3.000+ themaafbeeldingen',
      ],
      cta: 'Nu proberen',
    },
    individualTier: {
      name: 'Individuele app',
      price: '$ 49',
      per: 'per app',
      tagline: 'Eén generator, volledige commerciële licentie',
      features: [
        'Schone PDF\'s zonder watermerk',
        'Volledige commerciële licentie',
        'Verkoop op Etsy, KDP & overal',
        'Eenmalige betaling',
        '11 talen inbegrepen',
        'Antwoordsleutels inbegrepen',
      ],
      cta: 'Binnenkort beschikbaar',
    },
    bundleTier: {
      name: 'Categoriebundel',
      price: '$ 149',
      per: 'per bundel',
      tagline: 'Alle generators van een categorie, beste waarde',
      features: [
        'Alle apps van een categorie (4-7 apps)',
        'Schone PDF\'s zonder watermerk',
        'Volledige commerciële licentie',
        'Bespaar tot 70 % vs individueel',
        'Eenmalige betaling',
        '11 talen inbegrepen',
      ],
      badge: 'Beste waarde',
      cta: 'Binnenkort beschikbaar',
    },
    bundlesTitle: '6 categoriebundels beschikbaar',
    bundlesSubtitle: 'Elke bundel bevat alle generators van een categorie met volledige commerciële licentie.',
    appsIncluded: 'apps inbegrepen',
    oneTime: 'Eenmalige betaling',
    perApp: 'per app',
    perBundle: 'per bundel',
    faq: [
      { question: 'Is het echt gratis om te proberen?', answer: 'Ja! Alle 33 generators zijn gratis te proberen met volledige toegang. Downloads bevatten een watermerk. Geen registratie, geen creditcard, geen tijdslimiet.' },
      { question: 'Waarom geen restitutie?', answer: 'Omdat je alles gratis kunt proberen met watermerk voordat je koopt. Je weet precies wat je krijgt.' },
      { question: 'Wat bevat de commerciële licentie?', answer: 'Volledige commerciële rechten om je creaties te verkopen. Verkoop op Etsy, Amazon KDP, Bol.com of je eigen website. Geen naamsvermelding, geen royalty\'s.' },
      { question: 'Wat is het verschil tussen individueel en bundel?', answer: 'Een individuele licentie dekt één generator voor $ 49. Een bundel dekt alle generators van een categorie (4-7 apps) voor $ 149 - tot 70 % besparing.' },
      { question: 'Welke betaalmethoden worden geaccepteerd?', answer: 'We richten betalingen in via Lemon Squeezy, dat creditcards, PayPal en meer ondersteunt. Koopopties zijn binnenkort beschikbaar.' },
      { question: 'Wanneer zijn aankopen beschikbaar?', answer: 'We zijn ons betalingssysteem aan het opzetten. Probeer in de tussentijd alle 33 generators gratis met watermerk.' },
    ],
    faqTitle: 'Veelgestelde vragen',
    ctaTitle: 'Probeer alle 33 generators gratis',
    ctaSubtitle: 'Geen registratie nodig. Bekijk de kwaliteit voor je koopt. Elke generator is gratis met watermerk.',
    ctaButton: 'Ontdek generators',
    comingSoon: 'Binnenkort beschikbaar',
    noRefund: 'Geen restitutie - probeer eerst gratis met watermerk',
    buyApp: 'Kopen voor $49',
    buyBundle: 'Bundel kopen voor $149',
    saveVsIndividual: 'Bespaar vs. individueel',
    catalogTitle: 'Kies uw apps',
    catalogSubtitle: 'Koop individuele apps voor $49 of bespaar met een categoriebundel voor $149.',
  },
  sv: {
    metaTitle: 'Priser - Professionella utskriftsgeneratorer | LessonCraftStudio',
    metaDescription: 'Prova alla 33 generatorer gratis med vattenstämpel. Enskilda appar 49 $, paket 149 $. Engångsköp, kommersiell licens ingår.',
    keywords: ['utskriftsgenerator priser', 'kommersiell licens utskrifter', 'Etsy utskriftsverktyg pris', 'arbetsblad generator köp'],
    heroBadge: '33 generatorer | 6 paket | Engångsköp',
    heroTitle: 'Enkla priser. Inga prenumerationer.',
    heroSubtitle: 'Prova varje generator gratis med vattenstämpel. När du är redo, lås upp rena exporter med ett engångsköp.',
    freeTier: {
      name: 'Gratis provperiod',
      price: '0 $',
      tagline: 'Prova alla 33 generatorer med vattenstämpel',
      features: [
        'Alla 33 utskriftsgeneratorer',
        'Full funktionsåtkomst',
        'Vattenstämpel på nedladdningar',
        'Ingen registrering krävs',
        '11 språk inkluderade',
        '3 000+ temabilder',
      ],
      cta: 'Prova nu',
    },
    individualTier: {
      name: 'Enskild app',
      price: '49 $',
      per: 'per app',
      tagline: 'En generator, full kommersiell licens',
      features: [
        'Rena PDF:er utan vattenstämpel',
        'Full kommersiell licens',
        'Sälj på Etsy, KDP och överallt',
        'Engångsköp',
        '11 språk inkluderade',
        'Facit inkluderat',
      ],
      cta: 'Kommer snart',
    },
    bundleTier: {
      name: 'Kategoripaket',
      price: '149 $',
      per: 'per paket',
      tagline: 'Alla generatorer i en kategori, bästa värde',
      features: [
        'Alla appar i en kategori (4-7 appar)',
        'Rena PDF:er utan vattenstämpel',
        'Full kommersiell licens',
        'Spara upp till 70 % vs enskilt',
        'Engångsköp',
        '11 språk inkluderade',
      ],
      badge: 'Bästa värde',
      cta: 'Kommer snart',
    },
    bundlesTitle: '6 kategoripaket tillgängliga',
    bundlesSubtitle: 'Varje paket inkluderar alla generatorer i en kategori med full kommersiell licens.',
    appsIncluded: 'appar inkluderade',
    oneTime: 'Engångsköp',
    perApp: 'per app',
    perBundle: 'per paket',
    faq: [
      { question: 'Är det verkligen gratis att prova?', answer: 'Ja! Alla 33 generatorer är gratis att prova med full åtkomst. Nedladdningar innehåller en vattenstämpel. Ingen registrering, inget kreditkort, ingen tidsbegränsning.' },
      { question: 'Varför ingen återbetalning?', answer: 'Eftersom du kan prova allt gratis med vattenstämpel innan du köper. Du vet exakt vad du får.' },
      { question: 'Vad ingår i den kommersiella licensen?', answer: 'Fulla kommersiella rättigheter att sälja dina skapelser. Sälj på Etsy, Amazon KDP, Gumroad eller din egen webbplats. Ingen hänvisning krävs.' },
      { question: 'Vad är skillnaden mellan enskild och paket?', answer: 'En enskild licens täcker en generator för 49 $. Ett paket täcker alla generatorer i en kategori (4-7 appar) för 149 $ - upp till 70 % besparing.' },
      { question: 'Vilka betalningsmetoder accepteras?', answer: 'Vi sätter upp betalningar via Lemon Squeezy, som stöder kreditkort, PayPal och mer. Köpalternativ tillgängliga snart.' },
      { question: 'När blir köp tillgängliga?', answer: 'Vi konfigurerar vårt betalningssystem. Under tiden, prova alla 33 generatorer gratis med vattenstämpel.' },
    ],
    faqTitle: 'Vanliga frågor',
    ctaTitle: 'Prova alla 33 generatorer gratis',
    ctaSubtitle: 'Ingen registrering krävs. Se kvaliteten innan du köper. Varje generator är gratis med vattenstämpel.',
    ctaButton: 'Utforska generatorer',
    comingSoon: 'Kommer snart',
    noRefund: 'Ingen aterbetalning - prova gratis med vattenstampel forst',
    buyApp: 'Kop for $49',
    buyBundle: 'Kop paket for $149',
    saveVsIndividual: 'Spara vs. enskild',
    catalogTitle: 'Valj dina appar',
    catalogSubtitle: 'Kop enskilda appar for $49 eller spara med ett kategoripaket for $149.',
  },
  da: {
    metaTitle: 'Priser | Arbejdsark-generatorer fra 49 $ — Engangsbetaling',
    metaDescription: 'Prøv alle 33 generatorer gratis med vandmærke. Enkelt-apps 49 $, kategoribundler fra 99 $. Engangsbetaling, kommerciel licens, intet abonnement.',
    keywords: ['arbejdsark generator priser', 'kommerciel licens opgaver til print', 'Etsy printable værktøjer pris', 'opgave generator køb', 'engangsbetaling arbejdsark'],
    heroBadge: '33 generatorer | 6 bundler | Engangsbetaling',
    heroTitle: 'Simple priser. Intet abonnement.',
    heroSubtitle: 'Prøv hver generator gratis med vandmærke. Når du er klar, frigør rene eksporter med et engangskøb.',
    freeTier: {
      name: 'Gratis prøveperiode',
      price: '0 $',
      tagline: 'Prøv alle 33 generatorer med vandmærke',
      features: [
        'Alle 33 printbare generatorer',
        'Fuld funktionsadgang',
        'Vandmærke på downloads',
        'Ingen tilmelding nødvendig',
        '11 sprog inkluderet',
        '3.000+ temabilleder',
      ],
      cta: 'Prøv nu',
    },
    individualTier: {
      name: 'Individuel app',
      price: '49 $',
      per: 'per app',
      tagline: 'Én generator, fuld kommerciel licens',
      features: [
        'Rene PDF\'er uden vandmærke',
        'Fuld kommerciel licens',
        'Sælg på Etsy, KDP og overalt',
        'Engangskøb',
        '11 sprog inkluderet',
        'Facit inkluderet',
      ],
      cta: 'Kommer snart',
    },
    bundleTier: {
      name: 'Kategoripakke',
      price: '149 $',
      per: 'per pakke',
      tagline: 'Alle generatorer i en kategori, bedste værdi',
      features: [
        'Alle apps i en kategori (4-7 apps)',
        'Rene PDF\'er uden vandmærke',
        'Fuld kommerciel licens',
        'Spar op til 70 % vs individuel',
        'Engangskøb',
        '11 sprog inkluderet',
      ],
      badge: 'Bedste værdi',
      cta: 'Kommer snart',
    },
    bundlesTitle: '6 kategoripakker tilgængelige',
    bundlesSubtitle: 'Hver pakke inkluderer alle generatorer i en kategori med fuld kommerciel licens.',
    appsIncluded: 'apps inkluderet',
    oneTime: 'Engangskøb',
    perApp: 'per app',
    perBundle: 'per pakke',
    faq: [
      { question: 'Er det virkelig gratis at prøve?', answer: 'Ja! Alle 33 generatorer er gratis at prøve med fuld adgang. Downloads inkluderer et vandmærke. Ingen tilmelding, intet kreditkort, ingen tidsbegrænsning.' },
      { question: 'Hvorfor ingen refusion?', answer: 'Fordi du kan prøve alt gratis med vandmærke før du køber. Du ved præcis, hvad du får.' },
      { question: 'Hvad inkluderer den kommercielle licens?', answer: 'Fulde kommercielle rettigheder til at sælge dine kreationer. Sælg på Etsy, Amazon KDP, Gumroad eller din egen hjemmeside. Ingen kreditering, ingen royalties.' },
      { question: 'Hvad er forskellen mellem individuel og pakke?', answer: 'En individuel licens dækker én generator for 49 $. En pakke dækker alle generatorer i en kategori (4-7 apps) for 149 $ - op til 70 % besparelse.' },
      { question: 'Hvilke betalingsmetoder accepteres?', answer: 'Vi sætter betalinger op via Lemon Squeezy, der understøtter kreditkort, PayPal og mere. Købsmuligheder tilgængelige snart.' },
      { question: 'Hvornår bliver køb tilgængelige?', answer: 'Vi er ved at opsætte vores betalingssystem. I mellemtiden kan du prøve alle 33 generatorer gratis med vandmærke.' },
    ],
    faqTitle: 'Ofte stillede spørgsmål',
    ctaTitle: 'Prøv alle 33 generatorer gratis',
    ctaSubtitle: 'Ingen tilmelding nødvendig. Se kvaliteten før du køber. Hver generator er gratis med vandmærke.',
    ctaButton: 'Udforsk generatorer',
    comingSoon: 'Kommer snart',
    noRefund: 'Ingen refusion - prov gratis med vandmaerke forst',
    buyApp: 'Kob for $49',
    buyBundle: 'Kob pakke for $149',
    saveVsIndividual: 'Spar vs. enkelt',
    catalogTitle: 'Vaelg dine apps',
    catalogSubtitle: 'Kob individuelle apps for $49 eller spar med en kategoripakke for $149.',
  },
  no: {
    metaTitle: 'Priser | Arbeidsark-generatorer fra $49 — Engangsbetaling',
    metaDescription: 'Prøv alle 33 generatorer gratis med vannmerke. Enkelt-apper $49, kategoribundler fra $99. Engangsbetaling, kommersiell lisens, intet abonnement.',
    keywords: ['arbeidsark generator priser', 'kommersiell lisens arbeidsark', 'oppgavegenerator kjøp', 'Etsy arbeidsark verktøy pris'],
    heroBadge: '33 generatorer | 6 pakker | Engangskjøp',
    heroTitle: 'Enkle priser. Ingen abonnement.',
    heroSubtitle: 'Prøv hver generator gratis med vannmerke. Når du er klar, lås opp rene eksporter med et engangskjøp.',
    freeTier: {
      name: 'Gratis prøveperiode',
      price: '0 $',
      tagline: 'Prøv alle 33 generatorer med vannmerke',
      features: [
        'Alle 33 arbeidsark-generatorer',
        'Full funksjonstilgang',
        'Vannmerke på nedlastinger',
        'Ingen registrering nødvendig',
        '11 språk inkludert',
        '3 000+ temabilder',
      ],
      cta: 'Prøv nå',
    },
    individualTier: {
      name: 'Individuell app',
      price: '49 $',
      per: 'per app',
      tagline: 'Én generator, full kommersiell lisens',
      features: [
        'Rene PDF-er uten vannmerke',
        'Full kommersiell lisens',
        'Selg på Etsy, KDP og overalt',
        'Engangskjøp',
        '11 språk inkludert',
        'Fasit inkludert',
      ],
      cta: 'Kommer snart',
    },
    bundleTier: {
      name: 'Kategoripakke',
      price: '149 $',
      per: 'per pakke',
      tagline: 'Alle generatorer i en kategori, best verdi',
      features: [
        'Alle apper i en kategori (4-7 apper)',
        'Rene PDF-er uten vannmerke',
        'Full kommersiell lisens',
        'Spar opptil 70 % vs individuell',
        'Engangskjøp',
        '11 språk inkludert',
      ],
      badge: 'Best verdi',
      cta: 'Kommer snart',
    },
    bundlesTitle: '6 kategoripakker tilgjengelige',
    bundlesSubtitle: 'Hver pakke inkluderer alle generatorer i en kategori med full kommersiell lisens.',
    appsIncluded: 'apper inkludert',
    oneTime: 'Engangskjøp',
    perApp: 'per app',
    perBundle: 'per pakke',
    faq: [
      { question: 'Er det virkelig gratis å prøve?', answer: 'Ja! Alle 33 generatorer er gratis å prøve med full tilgang. Nedlastinger inkluderer et vannmerke. Ingen registrering, ingen kredittkort, ingen tidsbegrensning.' },
      { question: 'Hvorfor ingen refusjon?', answer: 'Fordi du kan prøve alt gratis med vannmerke før du kjøper. Du vet nøyaktig hva du får.' },
      { question: 'Hva inkluderer den kommersielle lisensen?', answer: 'Fulle kommersielle rettigheter til å selge dine kreasjoner. Selg på Etsy, Amazon KDP, Gumroad eller din egen nettside. Ingen kreditering, ingen royalties.' },
      { question: 'Hva er forskjellen mellom individuell og pakke?', answer: 'En individuell lisens dekker én generator for 49 $. En pakke dekker alle generatorer i en kategori (4-7 apper) for 149 $ - opptil 70 % besparelse.' },
      { question: 'Hvilke betalingsmetoder aksepteres?', answer: 'Vi setter opp betalinger via Lemon Squeezy, som støtter kredittkort, PayPal og mer. Kjøpsalternativer tilgjengelige snart.' },
      { question: 'Når blir kjøp tilgjengelige?', answer: 'Vi konfigurerer betalingssystemet vårt. I mellomtiden kan du prøve alle 33 generatorer gratis med vannmerke.' },
    ],
    faqTitle: 'Ofte stilte spørsmål',
    ctaTitle: 'Prøv alle 33 generatorer gratis',
    ctaSubtitle: 'Ingen registrering nødvendig. Se kvaliteten før du kjøper. Hver generator er gratis med vannmerke.',
    ctaButton: 'Utforsk generatorer',
    comingSoon: 'Kommer snart',
    noRefund: 'Ingen refusjon - prov gratis med vannmerke forst',
    buyApp: 'Kjop for $49',
    buyBundle: 'Kjop pakke for $149',
    saveVsIndividual: 'Spar vs. enkelt',
    catalogTitle: 'Velg dine apper',
    catalogSubtitle: 'Kjop individuelle apper for $49 eller spar med en kategoripakke for $149.',
  },
  fi: {
    metaTitle: 'Hinnat | Tehtävägeneraattorit alkaen 49 $ — Kertamaksu',
    metaDescription: 'Kokeile kaikkia 33 generaattoria ilmaiseksi vesileimalla. Yksittäiset sovellukset 49 $, kategoriapakettit alkaen 99 $. Kertamaksu, kaupallinen lisenssi, ei tilausta.',
    keywords: ['tehtävägeneraattori hinnat', 'kaupallinen lisenssi tulosteet', 'Etsy tulostustyökalut hinta', 'tehtävägeneraattori osta', 'kertamaksu'],
    heroBadge: '33 generaattoria | 6 pakettia | Kertaosto',
    heroTitle: 'Selkeät hinnat. Ei tilauksia.',
    heroSubtitle: 'Kokeile jokaista generaattoria ilmaiseksi vesileimalla. Kun olet valmis, avaa puhtaat viennit kertaostolla.',
    freeTier: {
      name: 'Ilmainen kokeilu',
      price: '0 $',
      tagline: 'Kokeile kaikkia 33 generaattoria vesileimalla',
      features: [
        'Kaikki 33 tulostusgeneraattoria',
        'Täysi toimintopääsy',
        'Vesileima latauksissa',
        'Ei rekisteröintiä tarvita',
        '11 kieltä mukana',
        '3 000+ teemakuvaa',
      ],
      cta: 'Kokeile nyt',
    },
    individualTier: {
      name: 'Yksittäinen sovellus',
      price: '49 $',
      per: 'per sovellus',
      tagline: 'Yksi generaattori, täysi kaupallinen lisenssi',
      features: [
        'Puhtaat PDF:t ilman vesileimaa',
        'Täysi kaupallinen lisenssi',
        'Myy Etsyssä, KDP:ssä ja kaikkialla',
        'Kertaosto',
        '11 kieltä mukana',
        'Vastausavaimet mukana',
      ],
      cta: 'Tulossa pian',
    },
    bundleTier: {
      name: 'Kategoriapaketti',
      price: '149 $',
      per: 'per paketti',
      tagline: 'Kaikki kategorian generaattorit, paras arvo',
      features: [
        'Kaikki kategorian sovellukset (4-7 sovellusta)',
        'Puhtaat PDF:t ilman vesileimaa',
        'Täysi kaupallinen lisenssi',
        'Säästä jopa 70 % vs yksittäinen',
        'Kertaosto',
        '11 kieltä mukana',
      ],
      badge: 'Paras arvo',
      cta: 'Tulossa pian',
    },
    bundlesTitle: '6 kategoriapakettia saatavilla',
    bundlesSubtitle: 'Jokainen paketti sisältää kaikki kategorian generaattorit kaupallisella lisenssillä.',
    appsIncluded: 'sovellusta mukana',
    oneTime: 'Kertaosto',
    perApp: 'per sovellus',
    perBundle: 'per paketti',
    faq: [
      { question: 'Onko kokeilu todella ilmaista?', answer: 'Kyllä! Kaikki 33 generaattoria ovat ilmaisia kokeilla täydellä pääsyllä. Lataukset sisältävät vesileiman. Ei rekisteröintiä, ei luottokorttia, ei aikarajaa.' },
      { question: 'Miksi ei palautusta?', answer: 'Koska voit kokeilla kaikkea ilmaiseksi vesileimalla ennen ostoa. Tiedät tarkalleen, mitä saat.' },
      { question: 'Mitä kaupallinen lisenssi sisältää?', answer: 'Täydet kaupalliset oikeudet myydä luomuksiasi. Myy Etsyssä, Amazon KDP:ssä, Gumroadissa tai omalla sivustollasi. Ei mainintavelvoitetta, ei rojalteja.' },
      { question: 'Mikä ero on yksittäisen ja paketin välillä?', answer: 'Yksittäinen lisenssi kattaa yhden generaattorin hintaan 49 $. Paketti kattaa kaikki kategorian generaattorit (4-7 sovellusta) hintaan 149 $ - jopa 70 % säästö.' },
      { question: 'Mitkä maksutavat hyväksytään?', answer: 'Olemme ottamassa käyttöön maksuja Lemon Squeezyn kautta, joka tukee luottokortteja, PayPalia ja muuta. Ostomahdollisuudet saatavilla pian.' },
      { question: 'Milloin ostokset ovat saatavilla?', answer: 'Olemme parhaillaan määrittämässä maksujärjestelmäämme. Sillä välin kokeile kaikkia 33 generaattoria ilmaiseksi vesileimalla.' },
    ],
    faqTitle: 'Usein kysytyt kysymykset',
    ctaTitle: 'Kokeile kaikkia 33 generaattoria ilmaiseksi',
    ctaSubtitle: 'Ei rekisteröintiä tarvita. Näe laatu ennen ostoa. Jokainen generaattori on ilmainen vesileimalla.',
    ctaButton: 'Tutustu generaattoreihin',
    comingSoon: 'Tulossa pian',
    noRefund: 'Ei palautusta - kokeile ensin ilmaiseksi vesileimalla',
    buyApp: 'Osta hintaan $49',
    buyBundle: 'Osta paketti hintaan $149',
    saveVsIndividual: 'Saasta vs. yksittainen',
    catalogTitle: 'Valitse sovelluksesi',
    catalogSubtitle: 'Osta yksittaisia sovelluksia hintaan $49 tai saasta kategoriapaketin hintaan $149.',
  },
};

// ============================================================
// CATEGORY ICONS (SVG paths for inline rendering)
// ============================================================

const categoryIcons: Record<string, string> = {
  math: 'M4 5a1 1 0 0 1 1-1h4a1 1 0 0 1 0 2H6v2h2a1 1 0 0 1 0 2H6v3a1 1 0 0 1-2 0V5zm10.293.293a1 1 0 0 1 1.414 0L17 6.586l1.293-1.293a1 1 0 1 1 1.414 1.414L18.414 8l1.293 1.293a1 1 0 0 1-1.414 1.414L17 9.414l-1.293 1.293a1 1 0 0 1-1.414-1.414L15.586 8l-1.293-1.293a1 1 0 0 1 0-1.414zM4 15a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1zm10 0a1 1 0 0 1 1-1h4a1 1 0 1 1 0 2h-1.5v2.5a1 1 0 1 1-2 0V16H15a1 1 0 0 1-1-1z',
  literacy: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
  visual: 'M4.098 19.902a3.75 3.75 0 0 0 5.304 0l6.401-6.402M6.75 21A3.75 3.75 0 0 1 3 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 0 0 3.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88a1.5 1.5 0 0 1 2.12 0l1.06 1.06M10.5 8.197v-.923a1 1 0 0 1 .293-.707l3-3',
  matching: 'M14.25 6.087c0-.355.313-.642.7-.642.387 0 .7.287.7.642v3.826c0 .355-.313.642-.7.642-.387 0-.7-.287-.7-.642V6.087zM8.35 6.087c0-.355.313-.642.7-.642.387 0 .7.287.7.642v3.826c0 .355-.313.642-.7.642-.387 0-.7-.287-.7-.642V6.087zM5 17h14M5 20h14M5 14h14',
  puzzle: 'M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18',
  search: 'M21 21l-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607z',
};

// ============================================================
// STATIC GENERATION & METADATA
// ============================================================

export const revalidate = 3600;

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map(locale => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale = params.locale;
  const t = pricingContent[locale] || pricingContent.en;

  const alternates: Record<string, string> = {};
  for (const lang of SUPPORTED_LOCALES) {
    alternates[getHreflangCode(lang)] = `${baseUrl}/${lang}/pricing`;
  }
  alternates['x-default'] = `${baseUrl}/en/pricing`;

  return {
    title: t.metaTitle,
    description: t.metaDescription,
    keywords: t.keywords,
    alternates: {
      canonical: `${baseUrl}/${locale}/pricing`,
      languages: alternates,
    },
    openGraph: {
      title: t.metaTitle,
      description: t.metaDescription,
      type: 'website',
      url: `${baseUrl}/${locale}/pricing`,
      siteName: 'LessonCraftStudio',
      locale: ogLocaleMap[locale] || locale,
      alternateLocale: SUPPORTED_LOCALES.filter(l => l !== locale).map(l => ogLocaleMap[l] || l),
    },
  };
}

// ============================================================
// CHECKMARK SVG (reused in feature lists)
// ============================================================

function Check({ className }: { className?: string }) {
  return (
    <svg className={className || 'w-5 h-5 text-emerald-500 flex-shrink-0'} fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}

// ============================================================
// PAGE COMPONENT
// ============================================================

export default async function PricingPage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = params.locale;
  const t = pricingContent[locale] || pricingContent.en;
  type LocaleKey = 'en' | 'de' | 'fr' | 'es' | 'it' | 'pt' | 'nl' | 'da' | 'sv' | 'no' | 'fi';
  const loc = (locale in CATEGORY_NAME_TRANSLATIONS.math ? locale : 'en') as LocaleKey;

  const categories = Object.entries(APP_CATEGORIES) as [CategoryId, typeof APP_CATEGORIES[CategoryId]][];

  // JSON-LD Schemas
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${baseUrl}/${locale}` },
      { '@type': 'ListItem', position: 2, name: t.heroTitle },
    ],
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: t.faq.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* ========== HERO ========== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-950 via-blue-950 to-indigo-950 py-20 md:py-28">
        {/* Decorative orbs */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full opacity-20 blur-[120px]" style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.5), transparent 70%)' }} />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full opacity-15 blur-[100px]" style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.5), transparent 70%)' }} />
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

        <div className="relative container mx-auto px-4 text-center max-w-3xl">
          <div className="hero-fade-in hero-stagger-1 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-sm text-cyan-300 mb-8">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" /></svg>
            {t.heroBadge}
          </div>
          <h1 className="hero-fade-in hero-stagger-2 font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6">
            {t.heroTitle}
          </h1>
          <p className="hero-fade-in hero-stagger-3 text-lg md:text-xl text-blue-100/80 max-w-2xl mx-auto leading-relaxed">
            {t.heroSubtitle}
          </p>
        </div>
      </section>

      {/* ========== PRICING CARDS ========== */}
      <section className="relative -mt-12 pb-16 md:pb-24">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 lg:gap-6 items-start">

            {/* FREE TIER */}
            <div className="hero-fade-in hero-stagger-3 bg-white rounded-2xl border-2 border-dashed border-gray-200 p-6 lg:p-8 shadow-sm md:mt-8">
              <div className="mb-6">
                <h3 className="font-display text-lg font-bold text-gray-900 mb-1">{t.freeTier.name}</h3>
                <p className="text-sm text-gray-500">{t.freeTier.tagline}</p>
              </div>
              <div className="mb-6">
                <span className="font-display text-5xl font-bold text-gray-900">{t.freeTier.price}</span>
              </div>
              <Link
                href={`/${locale}/apps`}
                className="block w-full text-center px-6 py-3 rounded-xl bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition-colors mb-6"
              >
                {t.freeTier.cta}
              </Link>
              <ul className="space-y-3">
                {t.freeTier.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                    <Check />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* BUNDLE TIER (Highlighted - center) */}
            <div className="hero-fade-in hero-stagger-4 relative md:order-last md:order-none">
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-amber-400 via-orange-400 to-orange-500" />
              <div className="relative bg-white rounded-2xl p-6 lg:p-8 shadow-xl">
                {/* Best Value badge */}
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-orange-500/25">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                    {t.bundleTier.badge}
                  </span>
                </div>
                <div className="mb-6 mt-2">
                  <h3 className="font-display text-lg font-bold text-gray-900 mb-1">{t.bundleTier.name}</h3>
                  <p className="text-sm text-gray-500">{t.bundleTier.tagline}</p>
                </div>
                <div className="mb-1">
                  <span className="font-display text-5xl font-bold text-gray-900">{t.bundleTier.price}</span>
                </div>
                <p className="text-sm text-gray-500 mb-6">{t.bundleTier.per} &middot; {t.oneTime}</p>
                <a
                  href="#catalog"
                  className="block w-full text-center px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold shadow-lg shadow-orange-500/20 hover:shadow-xl hover:shadow-orange-500/30 transition-all mb-6"
                >
                  {t.bundleTier.cta}
                </a>
                <ul className="space-y-3">
                  {t.bundleTier.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                      <Check className="w-5 h-5 text-orange-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* INDIVIDUAL TIER */}
            <div className="hero-fade-in hero-stagger-5 bg-white rounded-2xl border border-gray-200 p-6 lg:p-8 shadow-sm md:mt-8">
              <div className="mb-6">
                <h3 className="font-display text-lg font-bold text-gray-900 mb-1">{t.individualTier.name}</h3>
                <p className="text-sm text-gray-500">{t.individualTier.tagline}</p>
              </div>
              <div className="mb-1">
                <span className="font-display text-5xl font-bold text-gray-900">{t.individualTier.price}</span>
              </div>
              <p className="text-sm text-gray-500 mb-6">{t.individualTier.per} &middot; {t.oneTime}</p>
              <a
                href="#catalog"
                className="block w-full text-center px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-sm hover:shadow-md transition-all mb-6"
              >
                {t.individualTier.cta}
              </a>
              <ul className="space-y-3">
                {t.individualTier.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                    <Check />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* No refund note */}
          <p className="text-center text-sm text-gray-400 mt-8">
            {t.noRefund}
          </p>
        </div>
      </section>

      {/* ========== PRODUCT CATALOG ========== */}
      <section id="catalog" className="py-16 md:py-24 bg-white scroll-mt-8">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t.catalogTitle}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              {t.catalogSubtitle}
            </p>
          </div>

          <div className="space-y-12">
            {categories.map(([catId, cat]) => {
              const appIds = cat.apps;
              const catName = CATEGORY_NAME_TRANSLATIONS[catId]?.[loc] || cat.name;
              const iconPath = categoryIcons[catId];
              const savePct = Math.round((1 - 149 / (appIds.length * 49)) * 100);

              return (
                <div key={catId} className="rounded-2xl border border-gray-200 overflow-hidden bg-white shadow-sm">
                  {/* Category header */}
                  <div className="px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4" style={{ backgroundColor: `${cat.color}08`, borderBottom: `2px solid ${cat.color}20` }}>
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${cat.color}15` }}>
                        <svg className="w-5 h-5" style={{ color: cat.color }} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d={iconPath} />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-display text-lg font-bold text-gray-900">{catName}</h3>
                        <span className="text-sm text-gray-500">{appIds.length} {t.appsIncluded}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right hidden sm:block">
                        <span className="text-xs font-medium px-2 py-1 rounded-full bg-emerald-100 text-emerald-700">{t.saveVsIndividual} {savePct}%</span>
                      </div>
                      <a
                        href={getBundleCheckoutUrl(catId as CategoryId)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white shadow-md hover:shadow-lg transition-all whitespace-nowrap"
                        style={{ backgroundColor: cat.color }}
                      >
                        {t.buyBundle}
                      </a>
                    </div>
                  </div>

                  {/* App grid */}
                  <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {appIds.map(appId => {
                      const appName = APP_NAME_TRANSLATIONS[appId]?.[loc] || ALL_APPS[appId].name;
                      return (
                        <div
                          key={appId}
                          className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl border border-gray-100 bg-gray-50/50 hover:border-gray-200 hover:bg-white transition-all"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: cat.color }} />
                            <span className="text-sm font-medium text-gray-800 truncate">{appName}</span>
                          </div>
                          <a
                            href={getCheckoutUrl(appId)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-shrink-0 inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold text-white transition-all hover:opacity-90"
                            style={{ backgroundColor: cat.color }}
                          >
                            $49
                          </a>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========== FAQ ========== */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            {t.faqTitle}
          </h2>
          <FAQAccordion items={t.faq} />
        </div>
      </section>

      {/* ========== CTA ========== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-950 via-blue-950 to-indigo-950 py-16 md:py-24">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10 blur-[120px]" style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.6), transparent 70%)' }} />
        <div className="relative container mx-auto px-4 text-center max-w-2xl">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
            {t.ctaTitle}
          </h2>
          <p className="text-blue-100/70 mb-8 text-lg">
            {t.ctaSubtitle}
          </p>
          <Link
            href={`/${locale}/apps`}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 font-bold rounded-xl hover:bg-gray-100 transition-colors shadow-lg shadow-black/20 text-lg"
          >
            {t.ctaButton}
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
