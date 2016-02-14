var app = angular.module('myApp');

app.controller('adminCtrl',['$scope', '$http', function($scope,$http) {
  $scope.error = '';
  var token = localStorage.getItem('token');
  $scope.admin = {};
  $scope.playerInfo = {};
  $scope.admin.createPlayer = function() {
    $http({
      url: '/players',
      method: 'POST',
      headers: { 'token': token},
      data: $scope.playerInfo
    })
    .then(function(response){
      console.log(response.data);
    })
    .catch(function(error){
      console.log(error);
    })
  }
}]);
