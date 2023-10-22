module.exports = [
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'http:', 'https:'],
          'img-src': [
            "'self'",
            'data:',
            'http:',
            'https:',
            'blob:',
            'storage.googleapis.com',
            'dl.airtable.com',
            'strapi.io',
          ],
          'media-src': [
            "'self'",
            'data:',
            'http:',
            'https:',
            'blob:',
            'storage.googleapis.com',
            'dl.airtable.com',
            'strapi.io',
          ],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
