var validation = require('./validation.js');
var routes = require('./routes.js')();

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
      '/excluir/:id': {
        method: 'delete',
        action: [validation.excluir, routes.excluir]
      },
      '/alterar/:id': {
        method: 'post',
        action: [validation.alterar, routes.alterar]
      },
      '/render/:page': {
        method: 'get',
        action: routes.render
      }
    }
  }
}
