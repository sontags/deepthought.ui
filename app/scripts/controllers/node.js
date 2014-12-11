/*global $ */

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
          '$rootScope',
          '$state',
          '$stateParams',
          'Restangular',
      function ($scope, $rootScope, $state, $stateParams, Restangular) {
        $scope.name = $stateParams.name;
        var baseNode = Restangular.one('nodes', $scope.name);
        var baseRoles = Restangular.all('roles');

        $scope.toggleRole = function(roleName) {
          window._($scope.rolemap).each(function(r) {
            if(r.name === roleName) {
              var baseNodeRole = baseNode.one('roles', r.name);
              if (r.enabled === true) {
                baseNodeRole.remove().then(function() {
                  r.enabled = !r.enabled;
                  $rootScope.message = { text: 'Role ' + r.name + ' removed from node.' , success: true };
                  $scope.$parent.reloadScope();
                }, function errorCallback() {
                  $rootScope.message = { text: 'Failed to removed role from node.' , success: false };
                });
              } else {
                baseNodeRole.post().then(function() {
                  r.enabled = !r.enabled;
                  $rootScope.message = { text: 'Role ' + r.name + ' added to node.' , success: true };
                  $scope.$parent.reloadScope();
                }, function errorCallback() {
                  $rootScope.message = { text: 'Failed to add role to node.' , success: false };
                });
              }
            }
          });
        };

        $scope.saveNative = function() {
          var vars = $('#vars_native').val();
          console.log(vars);

          var baseNodeNativeVars = baseNode.all('vars');

          baseNodeNativeVars.customPUT(vars, 'native' ,{d: 'yaml'}, {'Content-Type': 'text/plain'}).then(function() {
            $rootScope.message = { text: 'Native nodevars successfully updated.', success: true };
          }, function errorCallback() {
            $rootScope.message = { text: 'Native nodevars could not be updated.', success: false };
          });
        };

        $scope.retriggerProvider = function(name) {
          var baseNodeProvider = baseNode.one('providers', name);

          baseNodeProvider.post().then(function() {
            var baseVar = baseNode.one('vars', name);
            baseVar.get({'f':'yaml'}).then(function(yamlvar) {
              if (typeof yamlvar === 'string') {
                $scope.node.yamlvars[name] = yamlvar;
              }
            });

            $rootScope.message = { text: name + ' retriggered.', success: true };
          }, function errorCallback(err) {
            console.log(err);
            $rootScope.message = { text: 'Failed to retrigger ' + name + ': ' + err.data, success: false };
          });
        };

        $scope.deleteNode = function() {
          baseNode.remove().then(function() {
            $scope.$parent.reloadScope();
            $rootScope.message = { text: $scope.name + ' deleted.', success: true };
            $state.go('nodes');
          }, function errorCallback() {
            $rootScope.message = { text: 'Failed to delete ' + name + '.', success: false };
          });
        };

        $scope.reloadScope = function() {
    		  baseRoles.getList().then(function(roles) {
    		  	baseNode.get().then(function(node) {
  
    		  		$scope.rolemap = [];
          		window._(roles).each(function(mRole) {
                var hasRole = false;
          			window._(node.roles).each(function(role){
          				if(mRole.id === role) {
          					hasRole = true;
          				}
          			});
                $scope.rolemap.push({ name: mRole.name, enabled: hasRole });
          		});
  
              node.yamlvars = {};
              window._(node.vars).each(function(v) {
                var baseVar = baseNode.one('vars', v.source);
                baseVar.get({'f':'yaml'}).then(function(yamlvar) {
                  if (typeof yamlvar === 'string') {
                    node.yamlvars[v.source] = yamlvar;
                  }
                });
              });
  
              baseNode.one('vars').get({'f':'yaml'}).then(function(yamlvars) {
                if (typeof yamlvars === 'string') {
                  node.mergedyamlvars = yamlvars;
                }
              });
  
    		  		$scope.node = node;
    		  	}, function errorCallback() {
  			 		  console.log('Failed to fetch nodes from server');
				    });
    		  }, function errorCallback() {
  		      console.log('Failed to fetch roles from server');
          });
        };

        $scope.reloadScope();

      }]);