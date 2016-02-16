'use strict';
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
    $scope.error = 'Something went wrong getting players from the database';
  });
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
      $scope.players.push(response.data);
      $scope.success = response.data.name + ' was added to the database.';
      $scope.playerInfo = {};
    })
    .catch(function(error){
      $scope.error = 'The right criteria was not met for adding a new player';
    });
  };

  $scope.admin.updatePlayer = function(player,updatePlayer) {
    $scope.admin.error = '';
    $scope.success = '';
    updatePlayer.name = player.name;
    updatePlayer._id = player._id;
    $http({
      url: '/players/'+player._id,
      method: 'PUT',
      headers: { 'token': token},
      data: updatePlayer
    })
    .then(function(response){
      for(var ii = 0; ii < $scope.players.length; ii++){
        if($scope.players[ii].name === player.name) {
          $scope.players[ii] = updatePlayer;
        }
      }
    })
    .catch(function(error){
      $scope.admin.error = 'Update player went wrong';
    });
  };

  $scope.admin.deletePlayer = function(player) {
    $scope.admin.error = '';
    $scope.success = '';
    var areYouSure = prompt("Are you sure you want to delete that player? yes/no");
    if(areYouSure === 'yes') {
      $http({
        url: '/players/'+player._id,
        method: 'DELETE',
        headers: { 'token': token}
      })
      .then(function(response){
        for(var ii = 0; ii < $scope.players.length; ii++){
          if($scope.players[ii].name === player.name) {
            $scope.players.splice(ii,1);
          }
        }
      })
      .catch(function(error){
        console.log(error);
        $scope.admin.error = 'Delete attempt was unsuccessful';
      });
    }
  };
}]);
