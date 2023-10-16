'use strict';

/**
 * pedido router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::pedido.pedido', {
  config: {
    create: {
      policies: ['api::pedido.is-owner-create', 'api::pedido.check-products'],
    },
    update: {
      policies: ['api::pedido.check-products'],
    },
    findOne: {
      policies: ['api::pedido.is-owner-find-one'],
    },
    find: {
      middlewares: ['api::pedido.is-owner-find'],
    },
  },
});
