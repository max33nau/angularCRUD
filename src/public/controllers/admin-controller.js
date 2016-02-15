var app = angular.module('myApp');

app.controller('adminCtrl',['$scope', '$http', function($scope,$http) {
  $scope.error = '';
  $scope.success = '';
  var token = localStorage.getItem('token');
  $scope.admin = {};
  $scope.playerInfo = {};
  $scope.players = [];
  $http({
    url: '/players',
    method: 'GET',
    headers: { 'token': token}
  })
  .then(function(response){
    $scope.players = response.data;
  })
  .catch(function(error){
    $scope.error = 'Something went wrong getting players from the database'
  })
  $scope.admin.createPlayer = function() {
    $scope.error = '';
    $scope.success = '';
    $http({
      url: '/players',
      method: 'POST',
      headers: { 'token': token},
      data: $scope.playerInfo
    })
    .then(function(response){
      $scope.success = response.data.name + ' was added to the database.';
    })
    .catch(function(error){
      $scope.error = 'The right criteria was not met for adding a new player';
    })
  }


}]);
