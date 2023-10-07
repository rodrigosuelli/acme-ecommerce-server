// @ts-nocheck
module.exports = {
  async afterCreate(event) {
    const { result } = event;
    const idPedido = result.id;

    const pedido = await strapi.entityService.findOne(
      'api::pedido.pedido',
      idPedido,
      { fields: ['id'], populate: { produtos: true } }
    );

    let novoValorTotal = 0;

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
