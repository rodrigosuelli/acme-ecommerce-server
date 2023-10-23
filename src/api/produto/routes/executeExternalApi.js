module.exports = {
  routes: [
    {
      // Path defined with an URL parameter
      method: 'POST',
      path: '/revalidate-frontend',
      handler: 'produto.executeExternalApi',
    },
  ],
};
