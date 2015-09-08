var testeControllers = angular.module('testeControllers', []);

testeControllers.config(['$routeProvider', function($routeProvider){
	$routeProvider.
	when('/ddd', {
		templateUrl: 'render/teste/home',
		controller: 'testeControllerView'
	}).
	otherwise({
		redirectTo: '/'
	});
}])

.controller('testeControllerView', function($scope){
   $scope.festa = '123213';
})

testeControllers.controller('testeController', ['$scope', function($scope){
	$scope.testeFinal = 'Edson Akira Ito';
}])