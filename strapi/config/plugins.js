module.exports = ({ env }) => ({
  i18n: {
    enabled: true,
    config: {
      defaultLocale: 'en',
      locales: [
        {
          code: 'en',
          name: 'English (en)',
        },
        {
          code: 'de',
          name: 'German (de)',
        },
        {
          code: 'fr',
          name: 'French (fr)',
        },
        {
          code: 'es',
          name: 'Spanish (es)',
        },
        {
          code: 'pt',
          name: 'Portuguese (pt)',
        },
        {
          code: 'it',
          name: 'Italian (it)',
        },
        {
          code: 'nl',
          name: 'Dutch (nl)',
        },
        {
          code: 'sv',
          name: 'Swedish (sv)',
        },
        {
          code: 'da',
          name: 'Danish (da)',
        },
        {
          code: 'no',
          name: 'Norwegian (no)',
        },
        {
          code: 'fi',
          name: 'Finnish (fi)',
        },
      ],
    },
  },
  // Upload plugin completely disabled - using custom image management
  upload: false,
});