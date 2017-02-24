// AboutController.js
// For distribution, all controllers
// are concatanated into single app.js file
// by using Gulp

'use strict';

angular.module('mostPopularListingsApp.admin', ['ngRoute'])

	// Routing configuration for this module
	.config(['$routeProvider', function ($routeprovider) {
		$routeprovider.when('/admin', {
			controller: 'AdminController',
			templateUrl: 'components/views/adminView.html'
		});
	}])

	// Controller definition for this module
	.controller('AdminController', ['$scope', 'Page', 'Auth','$location', 'Request', function ($scope, Page, Auth, $location, Request) {
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

		function init() {
			Page.setTitle('Admin Page');

			$('input.autocomplete').autocomplete({
				data: {
					"Lorenzo Lancia - 50": null,
					"Tizio Inkognito - 75": null,
					"Francesco Rossi - 65": 'http://placehold.it/250x250'
				},
				limit: 20, // The max amount of results that can be shown at once. Default: Infinity.
			});

		};

		$scope.createEvent = function(event){
			Request.post("test",event,function(response){
				console.log(response);
			})
		};

	}]);