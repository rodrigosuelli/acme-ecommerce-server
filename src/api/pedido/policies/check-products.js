const { ApplicationError } = require('@strapi/utils').errors;

module.exports = async (policyContext, config, { strapi }) => {
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

  // Checar qtd pedida e se produto esta ativo
  const productsIdArray = produtos.map((produto) => produto.produto);

  const entries = await strapi.entityService.findMany('api::produto.produto', {
    filters: {
      id: {
        $in: productsIdArray,
      },
    },
    fields: ['id', 'qtd_estoque', 'ativo'],
  });

  entries.forEach((entry) => {
    if (entry.ativo === false) {
      throw new ApplicationError(
        `Não foi possível adicionar o produto de id ${entry.id} pois ele não está 'ativo'`
      );
    }

    const correspondingProduct = produtos.find(
      (produto) => parseInt(produto.produto) === entry.id
    );

    if (entry.qtd_estoque < correspondingProduct.qtd) {
      throw new ApplicationError(
        `Não foi possível adicionar o produto de id ${entry.id} pois não há qtd em estoque suficiente para seu pedido`
      );
    }
  });

  return true; // pass
};
