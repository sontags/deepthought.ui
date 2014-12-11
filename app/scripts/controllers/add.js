'use strict';

/**
 * @ngdoc function
 * @name deepthought.controller:AddCtrl
 * @description
 * # AddCtrl
 * Controller of the deepthought
 */
angular.module('deepthought')
	.controller('AddCtrl', [ 
          '$scope',
          '$rootScope',
          '$location',
          'Restangular',
      function ($scope, $rootScope, $location, Restangular) {

        $scope.addNode = function() {
          if ($scope.name !== undefined && $scope.name !== '') {
            var baseNodes = Restangular.one('nodes');

            baseNodes.post($scope.name, {}).then(function() {
              $rootScope.message = { text: name + ' added.', success: true };
              $scope.$parent.reloadScope();
              $location.path('/nodes/edit/' + $scope.name);
            }, function errorCallback() {
              $rootScope.message = { text: 'Failed to add Node ' + name + '.', success: false };
            });

          } else {
            $rootScope.message = { text: 'No Name given for Node.' , success: false };
          }
        };

        $scope.addRole = function() {
          if ($scope.name !== undefined && $scope.name !== '') {
            var baseRoles = Restangular.one('roles');

            baseRoles.post($scope.name, {}).then(function() {
              $rootScope.message = { text: name + ' added.', success: true };
              $scope.$parent.reloadScope();
              $location.path('/roles/edit/' + $scope.name);
            }, function errorCallback() {
              $rootScope.message = { text: 'Failed to add Role ' + name + '.', success: false };
            });

          } else {
            $rootScope.message = { text: 'No Name given for Role.' , success: false };
          }
        };

      }]);