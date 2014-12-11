'use strict';

/**
 * @ngdoc function
 * @name deepthought.controller:SettingsCtrl
 * @description
 * # SettingsCtrl
 * Controller of the deepthought
 */
angular.module('deepthought')
  .controller('SettingsCtrl', [ 
  				'$scope',
  				'Restangular',
  		function ($scope, Restangular) {

    	var baseConfig = Restangular.one('_config');

      $scope.reloadScope = function() {
    		baseConfig.get({f : 'yaml'}).then(function(config) {
				  $scope.config = config;
        }, function errorCallback() {
          console.log('Failed to fetch roles from server');
        });
      };

      $scope.reloadScope();
  }]);