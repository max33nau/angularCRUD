var app = angular.module('myApp');

app.controller('playerCtrl',['$scope', '$http', function($scope,$http) {
  var token = localStorage.getItem('token');
  $scope.player = {};
  $scope.player.showAll = function() {
    $http({
      url: '/players',
      method: 'GET',
      headers: { 'token': token}
    })
    .then(function(response){
      console.log(response.data);
    })
    .catch(function(error){
      console.log(error);
    })
  }
}]);
