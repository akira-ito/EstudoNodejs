angular.module('CrudUser', ['ngRoute', 'CrudUserControllers'])
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
  $routeProvider.
    when('/',{
      templateUrl: 'render/home',
      controller: 'homeController'
    }).
    when('/cadastrar',{
      templateUrl: 'render/cadastrar',
      controller: 'cadastrarController'
    }).
    when('/buscar',{
      templateUrl: 'render/buscar',
      controller: 'buscarController'
    }).
    when('/excluir',{
      templateUrl: 'render/excluir',
      controller: 'excluirController'
    }).
    otherwise({
      redirect: '/'
    });

    $locationProvider.html5Mode({
      enabled: true
    });

}]);
