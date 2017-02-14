'use strict';

// Defining Angular app model with all other dependent modules
var mostPopularListingsApp = angular.module('mostPopularListingsApp',['ngRoute',
	'mostPopularListingsApp.home','mostPopularListingsApp.about','mostPopularListingsApp.login']);




mostPopularListingsApp.config(function( $routeProvider, $locationProvider, $httpProvider) {
	

	// Declaration of the default route if neither of the controllers
	// is supporting the request path
	$routeProvider.otherwise({ redirectTo: '/'});

	// Settings for http communications
	$httpProvider.defaults.useXDomain = true;
	delete $httpProvider.defaults.headers.common['X-Requested-With'];

	// disabling # in Angular urls
	// $locationProvider.html5Mode({
	// 		enabled: true,
	//      requireBase: false
	// });
});

mostPopularListingsApp.service('Page', function(){
	
  var title = 'default';
  return {
    title: function() { return title; },
    setTitle: function(newTitle) { title = newTitle; }
  };
});

mostPopularListingsApp.factory('Auth',['$http', function($http){
var user

return{
	Login : function(username,password,rememberme,callback){
		if(!rememberme) rememberme=0;
		
		$http.post('/Soliptica/server/index.php', "user_name="+encodeURIComponent(username)+
																		 "&user_password="+encodeURIComponent(password)+
																		 "&user_rememberme="+encodeURIComponent(rememberme)+"&login=Log+in",
																		 {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
       
    }
							)
                .success(function (response) {
                    callback(response);
                })},

		Logout: function(callback){
			$http.get('/Soliptica/server/index.php?logout')
			.success(function(response){
				callback(response);
			})
		},

    setUser : function(aUser){
        user = aUser;
    },
    isLoggedIn : function(){
        return(user)? user : false;
    }
  }
}]);







mostPopularListingsApp.controller("MainController", ['$scope','Page','Auth', function($scope,Page,Auth){
	$scope.Page = Page;
	Page.setTitle("Home");

	$scope.$watch( function () { return Auth.isLoggedIn(); }, function (data) {
    $scope.user_obj = data;
  }, true);

$scope.logout = function(){
	Auth.Logout(function(response){
		Auth.setUser(undefined);
	});
};

}]);