'use strict';

/**
 * @ngdoc function
 * @name deepthought.controller:RolesCtrl
 * @description
 * # RolesCtrl
 * Controller of the deepthought
 */
angular.module('deepthought')
	.controller('RolesCtrl', [ 
  				'$scope',
  				'Restangular',
  		function ($scope, Restangular) {

    		var baseRoles = Restangular.all('roles');
    		
    		baseRoles.getList().then(function(roles) {
    			$scope.roles = roles;
    		}, function errorCallback() {
  				console.log('Failed to fetch roles from server');
			});
  }]);