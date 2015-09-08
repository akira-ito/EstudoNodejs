var crudUserApp = angular.module('CrudUser', [])

crudUserApp.controller('crudUserController', function($scope, $http){
  $scope.cadastrar = function(){
    $http.post('crudUser/cadastrar', this.form)
      .success(function(data, status){
        console.log('suc', data, status);
      }).error(function(err){
        console.log('err', err);
      });
    console.log($scope);
  }
})
