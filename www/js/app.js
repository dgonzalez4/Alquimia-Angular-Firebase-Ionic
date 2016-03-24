angular.module('starter', ['ionic'])
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.config(function($stateProvider, $urlRouterProvider, $compileProvider) {
  $stateProvider
    .state('tabs', {
      url: '/tab',
      abstract: true,
      templateUrl: 'templates/tabs.html'
    })

    .state('tabs.home', {
      url: '/home',
      views: {
        'home-tab' : {
          templateUrl: 'templates/home.html',
          controller: 'HomeController'
        }
      }
    })

    .state('tabs.list', {
      url: '/list',
      views: {
        'list-tab' : {
          templateUrl: 'templates/list.html',
          controller: 'ListController'
        }
      }
    })

    .state('tabs.detail', {
      url: '/list/:aId',
      views: {
        'list-tab' : {
          templateUrl: 'templates/detail.html',
          controller: 'ListController'
        }
      }
    })

.state('tabs.settings', {
      url: '/settings',
      views: {
        'settings-tab' : {
          templateUrl: 'templates/settings.html',
        }
      }
    })

.state('tabs.contact', {
      url: '/contact',
      views: {
        'contact-tab' : {
          templateUrl: 'templates/contact.html',
          controller: 'ContactController'
        }
      }
    })

    .state('tabs.calendar', {
      url: '/calendar',
      views: {
        'calendar-tab' : {
          templateUrl: 'templates/calendar.html',
          controller: 'CalendarController'
        }
      }
    });
  $urlRouterProvider.otherwise('/tab/home');
  //$compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|file|tel):/);
})
.controller('CalendarController', ['$scope', '$http', '$state',
    function($scope, $http, $state) {
    $http.get('js/calendar.json').success(function(data) {
      $scope.calendar = data.calendar;

      $scope.onItemDelete = function(dayIndex, item) {
        $scope.calendar[dayIndex].schedule.splice($scope.calendar[dayIndex].schedule.indexOf(item), 1);
      }

      $scope.doRefresh =function() {
      $http.get('js/calendar.json').success(function(data) {
          $scope.calendar = data.calendar;
          $scope.$broadcast('scroll.refreshComplete');
        });
      }

      $scope.toggleStar = function(item) {
        item.star = !item.star;
      }

    });
}])
.controller('ContactController', ['$scope', '$http', '$state',
    function($scope, $http, $state) {
    $http.get('js/contacts.json').success(function(data) {
      $scope.artists = data.artists;
      $scope.whichartist=$state.params.aId;
      $scope.data = { showDelete: false, showReorder: false };

      $scope.onItemDelete = function(item) {
        $scope.artists.splice($scope.artists.indexOf(item), 1);
      }

      $scope.doRefresh =function() {
      $http.get('js/contacts.json').success(function(data) {
          $scope.artists = data;
          $scope.$broadcast('scroll.refreshComplete'); 
        });
      }

      $scope.toggleStar = function(item) {
        item.star = !item.star;
      }

      $scope.moveItem = function(item, fromIndex, toIndex) {
        $scope.artists.splice(fromIndex, 1);
        $scope.artists.splice(toIndex, 0, item);
      };
    });
}])

.controller('HomeController', ['$scope', '$http', '$state',
    function($scope, $http, $state) {

      $scope.register = function() {
      $scope.message = 'Service Request Submited ';
  };
}])


.controller('ListController', ['$scope', '$http', '$state',
    function($scope, $http, $state) {
    $http.get('js/reports.json').success(function(data) {
      $scope.reports = data.reports;
      $scope.whichartist=$state.params.aId;
      $scope.data = { showDelete: false, showReorder: false };

      $scope.onItemDelete = function(item) {
        $scope.reports.splice($scope.reports.indexOf(item), 1);
      }

      $scope.doRefresh =function() {
      $http.get('js/reports.json').success(function(data) {
          $scope.reports = data;
          $scope.$broadcast('scroll.refreshComplete'); 
        });
      }

      $scope.toggleStar = function(item) {
        item.star = !item.star;
      }

      $scope.moveItem = function(item, fromIndex, toIndex) {
        $scope.reports.splice(fromIndex, 1);
        $scope.reports.splice(toIndex, 0, item);
      };
    });
}]);