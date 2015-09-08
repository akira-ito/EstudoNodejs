var trancodeApp = angular.module('trancode', []);

trancodeApp.controller('controllerPost', function($scope, $http){
	$scope.books = [{nome: "", tipo: "texto"}];
	$scope.tipos = ["filler", "texto"];

	$scope.parse = function(){
		$scope.loading = "carregando..."
		$http.post('/request', this.form).
		 	success(function(data, status, headers, config) {
				$scope.form = data.form;
				$scope.res_envio = data.form.envio;
				$scope.res_resposta = data.form.resposta;
				$scope.loading = "";
			}).
			error(function(data, status, headers, config) {
				$scope.error = data;
		});
	}

	$scope.add = function(){
		$scope.books.push({nome: "", tipo: "texto"});
	}
})
