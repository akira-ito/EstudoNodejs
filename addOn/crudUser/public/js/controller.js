angular.module('CrudUserControllers', [])
.controller('homeController', function($scope, $http){
  $scope.teste = "123";
})
.controller('cadastrarController', function($scope, $http){
  $scope.btnSavar = "Salvar";
  $scope.mensagem = "";
  $scope.cadastrar = function(){
    $scope.btnSavar = "Salvando...";
    $http.post('cadastrar', this.form)
      .success(function(data, status){
        $scope.btnSavar = "Salvar";
        $scope.form = {
          nome:"",
          email:"",
          senha:"",
        };
        $scope.mensagem = "Success! data: "+ JSON.stringify(data)+ " status: " + status;
      }).error(function(err){
        $scope.btnSavar = "Salvar";
        $scope.mensagem = "Error! err: "+err;
      });
  }
})
.controller('buscarController', function($scope, $http){
  $scope.btnBuscar = "Buscar";
  $scope.buscar = function(){
    $scope.btnBuscar = "Buscando...";
    $http.post('buscar', this.form)
      .success(function(data, status){
        $scope.btnBuscar = "Buscar";
        $scope.form = {
          nome:"",
          email:"",
          senha:"",
        };
        $scope.mensagem = "Success! data: "+ JSON.stringify(data) + " status: " + status;
      }).error(function(err){
        $scope.btnBuscar = "Buscar";
        $scope.mensagem = "Error! err: "+err;
      });
    }
})
