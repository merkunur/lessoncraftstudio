const strapi = require('@strapi/strapi');

// Disable the upload plugin temporarily
const strapiInstance = strapi({
  appDir: __dirname,
});

strapiInstance.start();