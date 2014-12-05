'use strict';

/**
 * @ngdoc function
 * @name deepthought.controller:RoleCtrl
 * @description
 * # RoleCtrl
 * Controller of the deepthought
 */
angular.module('deepthought')
	.controller('RoleCtrl', [ 
  				'$scope',
          '$stateParams',
  				'Restangular',
  		function ($scope, $stateParams, Restangular) {
    		$scope.name = $stateParams.name;
        
        var baseRole = Restangular.one('roles', $scope.name);
        var baseNodes = Restangular.all('nodes');

        baseRole.get().then(function(role) {
          $scope.role = role;
          baseNodes.getList().then(function(nodes) {
            $scope.nodes = [];

            window._(nodes).each(function(node) {
              window._(node.roles).each(function(nodeRole) {
                if (nodeRole === role.id) {
                  $scope.nodes.push(node.name);
                }
              });
            });


          }, function errorCallback() {
            console.log('Failed to fetch role from server');
          });
        }, function errorCallback() {
          console.log('Failed to fetch nodes from server');
        });
  }]);