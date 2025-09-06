module.exports = (plugin) => {
  // Make upload endpoints public for development
  plugin.routes['content-api'].routes.forEach(route => {
    if (route.method === 'POST' && route.path === '/upload') {
      route.config = {
        ...route.config,
        auth: false
      };
    }
  });
  
  return plugin;
};