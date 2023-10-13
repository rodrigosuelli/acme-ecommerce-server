// @ts-nocheck
module.exports = {
  async beforeCreate(event) {
    event.params.data.slug = await strapi
      .service('plugin::content-manager.uid')
      .generateUIDField({
        contentTypeUID: 'api::produto.produto',
        field: 'slug',
        data: event.params.data,
      });
  },

  async beforeUpdate(event) {
    event.params.data.slug = await strapi
      .service('plugin::content-manager.uid')
      .generateUIDField({
        contentTypeUID: 'api::produto.produto',
        field: 'slug',
        data: event.params.data,
      });
  },
};
