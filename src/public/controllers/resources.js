// function testService($http) {
//   this.get = function(){
//     return $http.get('http://test-routes.herokuapp.com/test/hello')
//       .then(function(res){
//         return res.data.message;
//       })
//   }
//
//   this.post = function(data){
//     return $http.post('http://test-routes.herokuapp.com/test/uppercase', data)
//   }
// }
//
// function TestCtrl(testService) {
//   var self = this;
//   self.getMessage = function(){
//     testService.get().then(function(message){
//       self.message = message;
//     })
//   };
//   self.postData = function(message) {
//     testService.post({message: message})
//       .success(function(body) {
//         self.sendMessage = body.message;
//       })
//   }
// }
//
// function testInterceptor() {
//   return {
//     request: function(config) {
//       if(LocalStorage.getItem('token')) {
//         var token = LocalStorage.getItem('token');
//         config.headers = token;
//       }
//       return config;
//     },
//     requestError: function(config) {
//       return config;
//     },
//     response: function(res) {
//       return res;
//     },
//     responseError: function(res) {
//       return res;
//     }
//   }
// }
