'use strict';

/**
 * @ngdoc function
 * @name deepthought.controller:NodesCtrl
 * @description
 * # NodesCtrl
 * Controller of the deepthought
 */
angular.module('deepthought')
	.controller('NodesCtrl', [ 
          '$scope',
          'Restangular',
      function ($scope, Restangular) {
    		var baseNodes = Restangular.all('nodes');
    		var baseRoles = Restangular.all('roles');
    		
        $scope.reloadScope = function() {
        	baseRoles.getList().then(function(roles) {
        		$scope.roles = roles;
        		baseNodes.getList().then(function(nodes) {
        			window._(nodes).each(function(node) {
        				node.rolenames = [];
          			window._(node.roles).each(function(role) {
          				window._($scope.roles).each(function(mRole){
          					if(mRole.id === role) {
          						node.rolenames.push(mRole.name);
          					}
          				});
          			});
        			});
        			$scope.nodes = nodes;
        		}, function errorCallback() {
        			console.log('Failed to fetch nodes from server');
        	  });
        	}, function errorCallback() {
        		console.log('Failed to fetch roles from server');
          });
        };

        $scope.reloadScope();
  }]);