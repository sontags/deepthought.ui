'use strict';

/**
 * @ngdoc function
 * @name deepthought.controller:NodeCtrl
 * @description
 * # NodeCtrl
 * Controller of the deepthought
 */
angular.module('deepthought')
	.controller('NodeCtrl', [ 
          '$scope',
          '$stateParams',
          'Restangular',
      function ($scope, $stateParams, Restangular) {
        $scope.name = $stateParams.name;

    		var baseNode = Restangular.one('nodes', $scope.name);
    		var baseRoles = Restangular.all('roles');
    		
    		baseRoles.getList().then(function(roles) {
    			$scope.roles = roles;
    			baseNode.get().then(function(node) {

    				node.rolenames = [];
        		window._(node.roles).each(function(role) {
        			window._($scope.roles).each(function(mRole){
        				if(mRole.id === role) {
        					node.rolenames.push(mRole.name);
        				}
        			});
        		});

            node.yamlvars = {};
            window._(node.vars).each(function(v) {
              var baseVar = baseNode.one('vars', v.source);
              baseVar.get({'f':'yaml'}).then(function(yamlvar) {
                node.yamlvars[v.source] = yamlvar;
              });
            });

            baseNode.one('vars').get({'f':'yaml'}).then(function(yamlvars) {
              node.mergedyamlvars = yamlvars;
            });

    				$scope.node = node;
    			}, function errorCallback() {
  					console.log('Failed to fetch nodes from server');
				});
    		}, function errorCallback() {
  				console.log('Failed to fetch roles from server');
			});
  }]);