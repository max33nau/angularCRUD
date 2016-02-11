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
    .when('/login', {
      templateUrl: 'login.html',
      controller: 'loginCtrl'
    })
    .when('/register', {
      templateUrl: 'register.html',
      controller: 'registerCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
}])

app.controller('mainCtrl', ['$scope', '$http', function($scope,$http){

}]);
