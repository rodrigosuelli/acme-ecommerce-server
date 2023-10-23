'use strict';

/**
 * produto controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::produto.produto', ({ strapi }) => ({
  executeExternalApi: async (ctx, next) => {
    try {
      console.log('INICIO');

      const res = await fetch('https://tg-web-ebon.vercel.app/api/revalidate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        },
        body: JSON.stringify({
          model: 'produto',
        }),
      });

      const data = await res.json();

      console.log(data);

      ctx.body = 'ok';
      // @ts-ignore
      let request = ctx.request.body;
      let header = ctx.request.header;
    } catch (err) {
      ctx.body = err;
      console.log(err);
    }
  },
}));
