'use strict';

/**
 * `is-owner-find` middleware
 */

module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    if (ctx.state.user.role.name === 'Adm') {
      await next();
    }

    if (ctx.state.user.role.name === 'Authenticated') {
      const userId = ctx.state.user.id;

      ctx.query.filters = {
        ...(ctx.query.filters || {}),
        user: { id: userId },
      };

      // ctx.query.filters = {
      //   ...(ctx.query.filters || {}),
      //   user: { id: { $eq: `${userId}` } },
      // };

      await next();
    }
  };
};
