module.exports = async (policyContext, config, { strapi }) => {
  if (policyContext.state.user.role.name === 'Adm') {
    return true;
  }

  if (policyContext.state.user.role.name === 'Authenticated') {
    const userId = policyContext.state.user.id;

    const entryId = policyContext.params.id
      ? policyContext.params.id
      : undefined;

    if (entryId) {
      const entry = await strapi.entityService.findOne(
        'api::pedido.pedido',
        entryId,
        { fields: ['id'], populate: { user: { fields: ['id'] } } }
      );
      if (entry) {
        if (userId === entry.user.id) {
          return true;
        }
      }
    }
  }

  return false; // block
};
