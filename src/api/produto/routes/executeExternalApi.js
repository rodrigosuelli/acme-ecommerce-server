module.exports = {
  routes: [
    {
      // Path defined with an URL parameter
      method: 'POST',
      path: '/product-update',
      handler: 'produto.executeExternalApi',
    },
  ],
};
