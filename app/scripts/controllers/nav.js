'use strict';

/**
 * @ngdoc function
 * @name deepthought.controller:NavCtrl
 * @description
 * # NavCtrl
 * Controller of the deepthought
 */
angular.module('deepthought')
  .controller('NavCtrl', [ 
                '$scope',
                '$cookieStore',
        function ($scope, $cookieStore) {

        $scope.$watch(function() {
            return $cookieStore.get('authdata');
        }, function() { 
            $scope.reloadScope();
        });

        $scope.reloadScope = function() {
            var authdata = $cookieStore.get('authdata');
            if (authdata) {
                $scope.authenticated = true;
            } else {
                $scope.authenticated = false;
            }
        };

        $scope.reloadScope();
  }]);