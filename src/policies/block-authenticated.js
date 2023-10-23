module.exports = (policyContext, config, { strapi }) => {
  if (policyContext.state.user.role.name === 'Authenticated') {
    return false; // block
  }

  return true; // pass
};
