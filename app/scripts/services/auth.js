'use strict';

angular
	.module('HTTPBasicAuth')
	.factory('Auth', ['$cookieStore', '$http', function ($cookieStore, $http) {
	    $http.defaults.headers.common.Authorization = 'Basic ' + $cookieStore.get('authdata');

	    return {
	    	login: function (username, password, check) {
	            var encoded = window.btoa(username + ':' + password);
	            $http.defaults.headers.common.Authorization = 'Basic ' + encoded;
            	return $http.get(check);
        	},
	        setCredentials: function (username, password) {
	            var encoded = window.btoa(username + ':' + password);
	            $http.defaults.headers.common.Authorization = 'Basic ' + encoded;
	            $cookieStore.put('authdata', encoded);
	        },
	        clearCredentials: function () {
	            document.execCommand('ClearAuthenticationCache');
	            $cookieStore.remove('authdata');
	            $http.defaults.headers.common.Authorization = 'Basic ';
	        }
	    };
}]);