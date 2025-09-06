const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig = {
  images: {
    domains: ['localhost', 'lessoncraftstudio.com'],
  },
};

module.exports = withNextIntl(nextConfig);