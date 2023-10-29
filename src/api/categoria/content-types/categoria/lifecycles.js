const slugify = require('slugify').default;

module.exports = {
  async beforeCreate(event) {
    if (event.params.data.titulo) {
      const newSlug = slugify(event.params.data.titulo, {
        lower: true,
        strict: true,
        locale: 'pt',
      });

      const isAvailable = await strapi
        .service('plugin::content-manager.uid')
        .checkUIDAvailability({
          contentTypeUID: 'api::categoria.categoria',
          field: 'slug',
          value: newSlug,
        });

      if (isAvailable) {
        event.params.data.slug = newSlug;
      }
    }
  },

  async beforeUpdate(event) {
    if (event.params.data.titulo) {
      const newSlug = slugify(event.params.data.titulo, {
        lower: true,
        strict: true,
        locale: 'pt',
      });

      const isAvailable = await strapi
        .service('plugin::content-manager.uid')
        .checkUIDAvailability({
          contentTypeUID: 'api::categoria.categoria',
          field: 'slug',
          value: newSlug,
        });

      if (isAvailable) {
        event.params.data.slug = newSlug;
      }
    }
  },
};
