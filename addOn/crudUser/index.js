var routes = require('./routes.js');
var validation = require('./validation.js');

module.exports = function(){
  return {
    name: "CrudUser",
    active: true,
    router: {
      '/': {
        method: 'get',
        action: routes.index
      },
      '/:get': {
        method: 'get',
        action: routes.get
      },
      '/cadastrar': {
        method: 'post',
        action: [validation.cadastrar, routes.cadastrar]
      },
      '/buscar': {
        method: 'post',
        action: routes.buscar
      },
      '/render/:page': {
        method: 'get',
        action: routes.render
      }
    }
  }
}
