var routes = require('./routes');

module.exports = function(){
  return {
    name: "Todos Samethings",
    active: true,
    router: {
      '/': {
        method: 'get',
        action: routes.index
      }
    }
  }
}
