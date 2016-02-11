var app = angular.module('myApp', ['ngRoute']);

app.config(['$routeProvider', '$httpProvider', function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'home.html',
    })
    .when('/searchPlayer', {
      templateUrl: 'playerSearch.html',
      controller: 'playerCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
}])

app.controller('mainCtrl', ['$scope', '$http', function($scope,$http){
  
}]);
