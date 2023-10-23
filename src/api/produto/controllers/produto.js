'use strict';

const api = require('../../../services/api');

/**
 * produto controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::produto.produto', ({ strapi }) => ({
  executeExternalApi: async (ctx, next) => {
    try {
      const requestBody = ctx.request.body;
      const paramsString = ctx.request.url;

      const searchParams = new URLSearchParams(paramsString);
      const secret = searchParams
        .get('/api/revalidate-frontend?secret')
        .replace(' ', '+');

      if (requestBody.model !== 'produto') {
        console.log('Status 400: Model is not produto');
        return ctx.badRequest('Model is not produto');
      }

      if (secret !== process.env.NEXT_REVALIDATION_SECRET) {
        console.log('Status 401: Invalid secret');
        return ctx.unauthorized('Invalid secret');
      }

      const response = await api.post(
        `${process.env.FRONTEND_BASE_URL}/api/revalidate`,
        requestBody,
        {
          headers: { Authorization: `Bearer ${secret}` },
        }
      );

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
}));
