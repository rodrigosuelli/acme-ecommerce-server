module.exports = ({ env }) => {
  return {
    upload: {
      config: {
        provider: 'strapi-provider-firebase-storage',
        providerOptions: {
          serviceAccount: require('../firebaseServiceAccountKey.json'),
          // Custom bucket name
          bucket: env('STORAGE_BUCKET_URL'),
          sortInStorage: true, // true | false
          debug: false, // true | false
        },
      },
    },
    email: {
      config: {
        provider: 'sendgrid',
        providerOptions: {
          apiKey: env('SENDGRID_API_KEY'),
        },
        settings: {
          defaultFrom: env('DEFAULT_SENDER_EMAIL'),
          defaultReplyTo: env('DEFAULT_SENDER_EMAIL'),
        },
      },
    },
    'users-permissions': {
      config: {
        register: {
          allowedFields: ['celular', 'data_nasc', 'nome'],
        },
      },
    },
  };
};
