// @ts-nocheck
const { ApplicationError } = require('@strapi/utils').errors;

module.exports = {
  async beforeCreate(event) {
    const ctx = strapi.requestContext.get();

    // Check if is request from admin panel and not api
    if (!ctx.request.body.data) {
      if (!ctx.request.body.user.connect.length) {
        throw new ApplicationError('User is required');
      }

      if (!ctx.request.body.produtos.length) {
        throw new ApplicationError('Produtos is required');
      }

      const produtos = ctx.request.body.produtos;

      let seen = new Set();
      const hasDuplicateProducts = produtos.some((currentObject) => {
        if (!currentObject.produto.connect.length) {
          throw new ApplicationError(
            'Adding the produto relation field is required'
          );
        }

        return (
          seen.size ===
          seen.add(parseInt(currentObject.produto.connect[0].id)).size
        );
      });

      if (hasDuplicateProducts) {
        throw new ApplicationError(
          'Adding the same product multiple times is not allowed'
        );
      }
    }
  },

  async afterCreate(event) {
    const { result } = event;
    const idPedido = result.id;

    const pedido = await strapi.entityService.findOne(
      'api::pedido.pedido',
      idPedido,
      { fields: ['id', 'valor_frete'], populate: { produtos: true } }
    );

    // Atribui valor_frete inicialmente e soma valor dos produtos
    let novoValorTotal = pedido.valor_frete;

    const produtos = pedido.produtos;
    const produtosValidados = produtos.map((produto) => {
      const { qtd, valor_unitario } = produto;

      const novoSubtotal = qtd * valor_unitario;
      novoValorTotal += novoSubtotal;

      return { ...produto, qtd, valor_unitario, valor_subtotal: novoSubtotal };
    });

    // Update produtos array
    await strapi.entityService.update('api::pedido.pedido', idPedido, {
      data: {
        valor_total: novoValorTotal,
        produtos: produtosValidados,
      },
    });
  },
};
