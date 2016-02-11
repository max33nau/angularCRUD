

var app = angular.module('myApp', ['ngRoute']);

//Setup '.when' routes attached to browser window obj
window.routes = {
    '/': {
        templateUrl: 'home.html'
    }
};
//Checks paths that could be manually navigated to for a jwt token
app.config(['$routeProvider', function($routeProvider) {
    for (var path in window.routes) {
        $routeProvider.when(path, window.routes[path]);
    };
    $routeProvider.otherwise({
        redirectTo: '/'
    });
}])
