'use strict';

var app = angular.module('myApp');

app.controller('loginCtrl',['$scope', '$http', '$location', function($scope,$http, $location) {
  $scope.success = '';
  $scope.error = '';
  $scope.login = function() {
    $scope.success = '';
    $scope.error = '';
    if(localStorage.getItem('token')) {
      $scope.error = 'You are already logged in.';
      return;
    } else {
      var authorization = 'Basic ' + btoa($scope.username + ':' + $scope.password);
      $http({
        url: 'user/signin',
        method: 'GET',
        headers: { 'Authorization': authorization}
      })
      .then(function(response){
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', $scope.username);
        $location.path('/searchPlayer');
      })
      .catch(function(error){
        $scope.error = 'Invalid username/password';
      });
    }
  };
}]);
