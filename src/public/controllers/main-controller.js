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
    .when('/admin', {
      templateUrl: 'admin.html',
      controller: 'adminCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
}]).run(['$rootScope', '$location', function($rootScope,$location) {
  $rootScope.$on('$locationChangeStart', function(event,newUrl) {
    $rootScope.root = {};
    var token = localStorage.getItem('token');
    var currentUser = localStorage.getItem('user');
    var urlArray = newUrl.split('#');
    var nextPath = urlArray[1];
    if(nextPath === '/searchPlayer' && !token) {
      $rootScope.root.notAuthorized = true;
    } else if (token && currentUser) {
      $rootScope.root.notAuthorized = false;
      $rootScope.root.userLoggedIn = true;
      $rootScope.root.user = currentUser;
    } else {
      $rootScope.root.notAuthorized = false;
      $rootScope.root.user = '';
      $rootScope.root.userLoggedIn = false;
    }
  });
}]);

app.controller('mainCtrl', ['$rootScope','$scope', '$http', function($rootScope,$scope,$http){
  $scope.logout = function() {
    $rootScope.root.user = '';
    $rootScope.root.userLoggedIn = false;
    localStorage.clear();
  }
}]);
