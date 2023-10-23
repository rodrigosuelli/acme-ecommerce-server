module.exports = (policyContext, config, { strapi }) => {
  if (policyContext.state.user.role.name === 'Adm') {
    return true;
  }

  if (policyContext.state.user.role.name === 'Authenticated') {
    const userId = policyContext.state.user.id;
    const entryUserId = policyContext.request.body.data.user;

    if (userId === entryUserId) {
      return true; // pass
    }
  }

  return false; // block
};
