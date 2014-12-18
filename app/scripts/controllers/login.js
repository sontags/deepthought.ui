'use strict';
 
angular
    .module('HTTPBasicAuth')
    .controller('LoginCtrl', ['$scope', '$rootScope', '$state', 'Auth', 'Restangular', function ($scope, $rootScope, $state, Auth, Restangular) {
        Auth.clearCredentials();

        $scope.login = function() {
            $scope.dataLoading = true;
            Auth.login($scope.username, $scope.password, $rootScope.baseUrl + "/_config")
                .success(function () {
                    Auth.setCredentials($scope.username, $scope.password);
                    $rootScope.message = { text: $scope.username + ' successfully logged in.' , success: true };
                    $state.go('dash');
                })
                .error(function () {
                    $scope.password = "";
                    $rootScope.message = { text: 'Login failed.' , success: false };
                    $scope.dataLoading = false;
                });
        };
    }]);