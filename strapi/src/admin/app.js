export default {
  config: {
    locales: ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'],
    translations: {
      en: {
        "app.components.LeftMenu.navbrand.title": "LessonCraftStudio",
        "app.components.LeftMenu.navbrand.workplace": "Admin Panel",
        "Settings.application.title": "Overview",
        "Settings.application.description": "Manage your application settings",
        "Settings.locales.title": "Languages",
        "Settings.locales.description": "Manage the languages for your content",
      },
      de: {
        "app.components.LeftMenu.navbrand.title": "LessonCraftStudio",
        "app.components.LeftMenu.navbrand.workplace": "Admin-Panel",
        "Settings.locales.title": "Sprachen",
        "Settings.locales.description": "Verwalten Sie die Sprachen für Ihre Inhalte",
      },
      fr: {
        "app.components.LeftMenu.navbrand.title": "LessonCraftStudio",
        "app.components.LeftMenu.navbrand.workplace": "Panneau d'administration",
        "Settings.locales.title": "Langues",
        "Settings.locales.description": "Gérer les langues de votre contenu",
      },
      es: {
        "app.components.LeftMenu.navbrand.title": "LessonCraftStudio",
        "app.components.LeftMenu.navbrand.workplace": "Panel de administración",
        "Settings.locales.title": "Idiomas",
        "Settings.locales.description": "Gestionar los idiomas de tu contenido",
      },
    },
    theme: {
      colors: {
        primary100: '#f0f0ff',
        primary200: '#d0d0ff',
        primary500: '#4945ff',
        primary600: '#3838ff',
        primary700: '#2525ff',
        danger700: '#b72b1a',
      },
    },
    menu: {
      logo: '/images/logo.png',
    },
  },
  bootstrap(app) {
    console.log('🎨 LessonCraftStudio Admin Panel Loaded');
    console.log('🌍 Available languages: en, de, fr, es, pt, it, nl, sv, da, no, fi');
    
    // Add a custom menu item for language settings
    app.injectContentManagerComponent('editView', 'right-links', {
      name: 'language-switcher',
      Component: () => null, // Will be replaced with actual component
    });
  },
};