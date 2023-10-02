module.exports = [
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': [
            "'self'",
            'data:',
            'blob:',
            'storage.googleapis.com',
            'dl.airtable.com',
            'https://market-assets.strapi.io',
          ],
          'media-src': [
            "'self'",
            'data:',
            'blob:',
            'storage.googleapis.com',
            'dl.airtable.com',
            'https://market-assets.strapi.io',
          ],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  'strapi::errors',
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
