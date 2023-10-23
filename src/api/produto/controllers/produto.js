'use strict';

const api = require('../../../services/api');

/**
 * produto controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController(
  'api::produto.produto',
  ({ env, strapi }) => ({
    executeExternalApi: async (ctx, next) => {
      try {
        console.log(ctx.request);
        const requestBody = ctx.request.body;
        // const authHeader = ctx.request.header['Authorization'];
        // const secret = authHeader && authHeader.split(' ')[1];

        // if (requestBody.model !== 'produto') {
        // throw new Error('Status 400: Model is not produto');
        // }

        // if (secret !== env('NEXT_REVALIDATION_SECRET')) {
        // throw new Error('Status 401: Invalid secret');
        // }

        const response = await api.post(env('FRONTEND_BASE_URL'), requestBody, {
          headers: { Authorization: `Bearer ${secret}` },
        });

        console.log(response.data);

        ctx.body = 'ok';
      } catch (error) {
        ctx.body = error;
        if (error?.response) {
          console.log(error.response);
        } else {
          console.log(error);
        }
      }
    },
  })
);
