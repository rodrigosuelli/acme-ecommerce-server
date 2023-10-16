import type { Schema, Attribute } from '@strapi/strapi';

export interface PedidoItemPedido extends Schema.Component {
  collectionName: 'components_componentes_pedido_item_pedidos';
  info: {
    displayName: 'Item_Pedido';
    description: '';
  };
  attributes: {
    qtd: Attribute.Integer &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 1;
      }> &
      Attribute.DefaultTo<1>;
    valor_unitario: Attribute.Decimal &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 0;
      }>;
    valor_subtotal: Attribute.Decimal;
    produto: Attribute.Relation<
      'pedido.item-pedido',
      'oneToOne',
      'api::produto.produto'
    >;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'pedido.item-pedido': PedidoItemPedido;
    }
  }
}
