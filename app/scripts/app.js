'use strict';

/**
 * @ngdoc overview
 * @name deepthoughtuiApp
 * @description
 * # deepthoughtuiApp
 *
 * Main module of the application.
 */
angular
  .module('deepthought', [
    'ui.router',
    'restangular',
    'ncy-angular-breadcrumb',
    'ngAnimate',
    'jsonFormatter'
  ])
  .config(['$urlRouterProvider', '$stateProvider',  function($urlRouterProvider, $stateProvider) {

    $urlRouterProvider.otherwise('dash');

    $stateProvider
      .state('dash', {
        url: '/dash',
        templateUrl: 'views/dash.html',
        controller: 'DashCtrl',
        ncyBreadcrumb: { label: 'Dashboard' }
      })
      .state('settings', {
        url: '/settings',
        templateUrl: 'views/settings.html',
        controller: 'SettingsCtrl',
        ncyBreadcrumb: { label: 'Settings' }
      })
      .state('nodes', {
        url: '/nodes',
        templateUrl: 'views/nodes/list.html',
        controller: 'NodesCtrl',
        ncyBreadcrumb: { label: 'Nodes' }
      })
      .state('nodes.add', {
        url: '/add',
        templateUrl: 'views/nodes/add.html',
        controller: 'AddCtrl',
        ncyBreadcrumb: { label: 'Add' }
      })
      .state('nodes.view', {
        url: '/view/:name',
        templateUrl: 'views/nodes/view.html',
        controller: 'NodeCtrl',
        ncyBreadcrumb: { label: 'View' }
      })
      .state('nodes.edit', {
        url: '/edit/:name',
        templateUrl: 'views/nodes/edit.html',
        controller: 'NodeCtrl',
        ncyBreadcrumb: { label: 'Edit' }
      })
      .state('nodes.delete', {
        url: '/delete/:name',
        templateUrl: 'views/nodes/delete.html',
        controller: 'NodeCtrl',
        ncyBreadcrumb: { label: 'Delete' }
      })
      .state('roles', {
        url: '/roles',
        templateUrl: 'views/roles/list.html',
        controller: 'RolesCtrl',
        ncyBreadcrumb: { label: 'Roles' }
      })
      .state('roles.add', {
        url: '/add',
        templateUrl: 'views/roles/add.html',
        controller: 'AddCtrl',
        ncyBreadcrumb: { label: 'Add' }
      })
      .state('roles.view', {
        url: '/view/:name',
        templateUrl: 'views/roles/view.html',
        controller: 'RoleCtrl',
        ncyBreadcrumb: { label: 'View' }
      })
      .state('roles.edit', {
        url: '/edit/:name',
        templateUrl: 'views/roles/edit.html',
        controller: 'RoleCtrl',
        ncyBreadcrumb: { label: 'Edit' }
      })
      .state('roles.delete', {
        url: '/delete/:name',
        templateUrl: 'views/roles/delete.html',
        controller: 'RoleCtrl',
        ncyBreadcrumb: { label: 'Delete' }
      });
  }])
  .run(['Restangular', function (Restangular) {
    Restangular.setBaseUrl('http://0.0.0.0:8089');
  }]);

