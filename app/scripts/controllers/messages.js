'use strict';

/**
 * @ngdoc function
 * @name deepthought.controller:MessagesCtrl
 * @description
 * # MessagesCtrl
 * Controller of the deepthought
 */
angular.module('deepthought')
	.controller('MessagesCtrl', [ 
          '$scope',
          '$rootScope',
          '$timeout',
      function ($scope, $rootScope, $timeout) {

      	$scope.$watch(function() {
          return $rootScope.message;
		    }, function(newValue) { //}, function(newValue, oldValue) {
          $scope.printMessage(newValue);
		    });

      	$scope.printMessage = function(message) {
      		if (message !== undefined && message !== null) {
            $scope.message = message.text;

            if( message.success) {
              $scope.type = 'success';
            } else {
              $scope.type = 'fail';
            }

            $scope.showMessage = true;
            $timeout(function() {
              $timeout(function() {
                $scope.showMessage = false;
              }, 2000);
            }, 2000);
          }
      	};

  }]);
