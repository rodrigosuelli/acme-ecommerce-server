'use strict';

/**
 * pedido router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::pedido.pedido', {
  config: {
    create: {
      policies: ['api::pedido.is-owner-create'],
    },
    findOne: {
      policies: ['api::pedido.is-owner-find-one'],
    },
  },
});
