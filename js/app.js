// MODULE
var myApp = angular.module('myApp', ['ngResource', 'ngRoute', 'ngAnimate']);

// SERVICES
myApp.service('contestURLService', ['$resource', function($resource) {
  var myURL = "http://rest-api-costume-contest.herokuapp.com/api/v1/contests";

  this.GetAllContests = function() {
    var contestsAPI = 
      $resource(myURL);
    return contestsAPI.get();
  };

  this.GetOneContest = function (contestId) {
    var oneContestAPI = 
      $resource(myURL + '/' + (String(contestId)));
    return oneContestAPI.get();
  }
}]);

// ROUTES
myApp.config(function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'pages/greeting.html',
    controller: 'GreetingController'
  })
  .when('/contests/:id', {
    templateUrl: 'pages/contests.html',
    controller: 'ContestsController'
  });
});

// CONTROLLER
myApp.controller('GreetingController', 
    ['$scope', '$animate', 'contestURLService', function ($scope, $animate, contestURLService) {
  $scope.fullList = contestURLService.GetAllContests();
  $scope.convertToDate = function(dt) {
    return new Date(dt);
  };
}]);

myApp.controller('ContestsController', 
    ['$scope', '$routeParams', '$animate', 'contestURLService', 
      function($scope, $routeParams, $animate, contestURLService) {
        $scope.contestId = $routeParams.id || '0';
        $scope.oneContest = contestURLService.GetOneContest($scope.contestId);
        $scope.convertToDate = function(dt) {
          return new Date(dt);
        };
}]);