/*global $ */

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
          '$rootScope',
          '$state',
          '$stateParams',
          'Restangular',
      function ($scope, $rootScope, $state, $stateParams, Restangular) {
    		$scope.name = $stateParams.name;
        
        var baseRole = Restangular.one('roles', $scope.name);
        var baseNodes = Restangular.all('nodes');

        $scope.toggleNode = function(nodeName) {
          window._($scope.nodemap).each(function(n) {
            if(n.name === nodeName) {
              var baseRoleNode = baseRole.one('nodes', n.name);
              if (n.enabled === true) {
                baseRoleNode.remove().then(function() {
                  n.enabled = !n.enabled;
                  $rootScope.message = { text: 'Node ' + n.name + ' removed from role.' , success: true };
                  $scope.$parent.reloadScope();
                }, function errorCallback() {
                  $rootScope.message = { text: 'Failed to removed node from role.' , success: false };
                });
              } else {
                baseRoleNode.post().then(function() {
                  n.enabled = !n.enabled;
                  $rootScope.message = { text: 'Node ' + n.name + ' added to role.' , success: true };
                  $scope.$parent.reloadScope();
                }, function errorCallback() {
                  $rootScope.message = { text: 'Failed to add node to role.' , success: false };
                });
              }
            }
          });
        };

        $scope.deleteRole = function() {
          baseRole.remove().then(function() {
            $scope.$parent.reloadScope();
            $rootScope.message = { text: $scope.name + ' deleted.', success: true };
            $state.go('roles');
          }, function errorCallback() {
            $rootScope.message = { text: 'Failed to delete ' + name + '.', success: false };
          });
        };

        $scope.saveNative = function() {
          var vars = $('#vars_native').val();
          console.log(vars);

          var baseRoleNativeVars = baseRole.all('vars');

          baseRoleNativeVars.customPUT(vars, 'native' ,{d: 'yaml'}, {'Content-Type': 'text/plain'}).then(function() {
            $rootScope.message = { text: 'Native rolevars successfully updated.', success: true };
          }, function errorCallback() {
            $rootScope.message = { text: 'Native rolevars could not be updated.', success: false };
          });
        };

        $scope.retriggerProvider = function(name) {
          console.log(name);
        };

        $scope.reloadScope = function() {
          baseRole.get().then(function(role) {
            baseNodes.getList().then(function(nodes) {
              $scope.nodemap = [];
  
              window._(nodes).each(function(node) {
                var hasNode = false;
                window._(node.roles).each(function(nodeRole) {
                  if (nodeRole === role.id) {
                    hasNode = true;
                  } 
                });
                $scope.nodemap.push({name: node.name, enabled: hasNode});
              });

            }, function errorCallback() {
              console.log('Failed to fetch role from server');
            });

            baseRole.one('vars').get({'f':'yaml'}).then(function(yamlvars) {
              if (typeof yamlvars === 'string') {
                role.mergedyamlvars = yamlvars;
              }
            });

            role.yamlvars = {};
            window._(role.vars).each(function(v) {
              var baseVar = baseRole.one('vars', v.source);
              baseVar.get({'f':'yaml'}).then(function(yamlvar) {
                if (typeof yamlvar === 'string') {
                  role.yamlvars[v.source] = yamlvar;
                }
              });
            });

            $scope.role = role;

          }, function errorCallback() {
            console.log('Failed to fetch nodes from server');
          });
        };

        $scope.reloadScope();
  }]);