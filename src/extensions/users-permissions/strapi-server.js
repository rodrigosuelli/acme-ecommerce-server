module.exports = (plugin) => {
  for (let i = 0; i < plugin.routes['content-api'].routes.length; i++) {
    const route = plugin.routes['content-api'].routes[i];
    if (
      route.method === 'GET' &&
      route.path === '/users' &&
      route.handler === 'user.find'
    ) {
      plugin.routes['content-api'].routes[i] = {
        ...route,
        config: {
          ...route.config,
          policies: route.config.policies
            ? [...route.config.policies, 'global::block-authenticated'] // tests if policies were defined
            : ['global::block-authenticated'],
        },
      };
    }
  }

  return plugin;
};
