// userController.js
// For distribution, all controllers
// are concatanated into single app.js file
// by using Gulp
'use strict';

angular.module('mostPopularListingsApp.usercont', ['ngRoute'])

// Routing configuration for this module
.config(['$routeProvider',function($routeprovider){
	$routeprovider.when('/userpage', {
		controller: 'userController',
		templateUrl: 'components/views/userView.html'
	});
}])

// Controller definition for this module
.controller('userController', ['$scope','$location','Page','Auth', function($scope,$location, Page, Auth) {
    if (!Auth.isLoggedIn()) {
            console.log('DENY');
            event.preventDefault();
            $location.path('/login');
        } 
	// Just a housekeeping.
	// In the init method we are declaring all the
	// neccesarry settings and assignments to be run once
	// controller is invoked
	init();

	function init(){
	Page.setTitle($scope.user_obj.user_name);
	console.log("user loaded");
	};
	this.message = "Hello About!";

}]);