// @ts-nocheck
const { ApplicationError } = require('@strapi/utils').errors;

module.exports = (policyContext, config, { strapi }) => {
  if (!policyContext.request.body.data.user) {
    return false; // block
  }

  if (!policyContext.request.body.data.produtos) {
    return false; // block
  }

  const produtos = policyContext.request.body.data.produtos;

  let seen = new Set();
  const hasDuplicateProducts = produtos.some((currentObject) => {
    if (!currentObject.produto) {
      throw new ApplicationError('Adding the produto id is required');
    }

    return seen.size === seen.add(parseInt(currentObject.produto)).size;
  });

  if (hasDuplicateProducts) {
    throw new ApplicationError(
      'Adding the same product multiple times is not allowed'
    );
  }

  return true; // pass
};
