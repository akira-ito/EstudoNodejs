var homeApp = angular.module('home', ['ngRoute', 'trancode', 'testeControllers']);

homeApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	$routeProvider.
	  when('/', {
	    templateUrl: 'render/index/home',
	    controller: HomeController
	  }).
	  when('/trancode', {
	    templateUrl: 'trancode/',
	    controller: 'controllerPost'
	  }).
	  when('/codigoBarra', {
	    templateUrl: 'codigoBarra/',
	    controller: 'controllerPost'
	  }).
	  when('/teste', {
	    templateUrl: 'teste/',
	    controller: 'testeController'
	  }).
	  otherwise({
	    redirectTo: '/'
	  });
	
}]);
