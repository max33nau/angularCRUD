'use strict';
var app = angular.module('myApp');

app.controller('registerCtrl',['$scope', '$http', function($scope,$http) {
  $scope.success = '';
  $scope.error = '';
  $scope.register = function() {
    $scope.success = '';
    $scope.error = '';
    if(localStorage.getItem('token')) {
      $scope.error = 'You are already logged in.';
      return;
    } else {
      var user = {
        username: $scope.username,
        password: $scope.password
      };
      $http.post('/user/signup', JSON.stringify(user))
        .then(function(response){
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user', $scope.username);
          $scope.success= 'Registratiion Successful';
        })
        .catch(function(error){
          $scope.error = 'Taken Username or Invalid Password';
          console.log(error);
        });
    }
  };
}]);
