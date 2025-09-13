module.exports = ({ env }) => ({
  // Disable upload plugin completely
  upload: false,
  
  // Keep i18n enabled
  i18n: {
    enabled: true,
    config: {
      defaultLocale: 'en',
      locales: [
        'en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'
      ],
    },
  },
});