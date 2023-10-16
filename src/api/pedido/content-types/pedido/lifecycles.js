// @ts-nocheck
const { ApplicationError } = require('@strapi/utils').errors;

module.exports = {
  async beforeCreate(event) {
    const ctx = strapi.requestContext.get();

    // Check if is request from admin panel and not api
    if (ctx.request.body.data) {
      return;
    }

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

    // Checar qtd pedida e se produto esta ativo
    const productsIdArray = produtos.map(
      (produto) => produto.produto.connect[0].id
    );

    const entries = await strapi.entityService.findMany(
      'api::produto.produto',
      {
        filters: {
          id: {
            $in: productsIdArray,
          },
        },
        fields: ['id', 'titulo', 'qtd_estoque', 'ativo'],
      }
    );

    entries.forEach((entry) => {
      if (entry.ativo === false) {
        throw new ApplicationError(
          `Não foi possível adicionar o produto '${entry.titulo}' pois ele não está 'ativo'`
        );
      }

      const correspondingProduct = produtos.find(
        (produto) => produto.produto.connect[0].id === entry.id
      );

      if (entry.qtd_estoque < correspondingProduct.qtd) {
        throw new ApplicationError(
          `Não foi possível adicionar o produto '${entry.titulo}' pois não há qtd em estoque suficiente para seu pedido`
        );
      }
    });
  },

  async afterCreate(event) {
    const { result } = event;
    const idPedido = result.id;

    const pedido = await strapi.entityService.findOne(
      'api::pedido.pedido',
      idPedido,
      {
        fields: ['id', 'valor_frete'],
        populate: {
          produtos: {
            fields: ['id', 'qtd'],
            populate: {
              produto: {
                fields: ['id', 'preco_real'],
              },
            },
          },
        },
      }
    );

    const produtos = pedido.produtos;

    // Atribui valor_frete inicialmente e soma valor dos produtos
    let novoValorTotal = pedido.valor_frete;

    // Atribuir subtotal e valor unitario a cada produto do pedido
    const produtosValidados = produtos.map((produto) => {
      const { qtd } = produto;

      const novoValorUnitario = produto.produto.preco_real;
      const novoSubtotal = qtd * novoValorUnitario;
      novoValorTotal += novoSubtotal;

      return {
        ...produto,
        qtd,
        valor_unitario: novoValorUnitario,
        valor_subtotal: novoSubtotal,
      };
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
