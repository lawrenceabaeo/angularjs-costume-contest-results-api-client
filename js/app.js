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

// DIRECTIVES
// http://plnkr.co/edit/bLHm2Y?p=preview
myApp.directive('loadingText', ['$interval',
  function ($interval) {
    return function(scope, element, attrs) {
      scope.wordArr = [
        "Loading...", 
        "How *you* doin'? ;) ", 
        "Heroku (our data host), is spinning up a new dyno just for you!", 
        "Do you feel like chicken tonight? Chicken tonight?",
        "Keep on keepin' on...",
        ];

      function updateLoadingText(i) {
        var j=(i+1)%5; //(i+1) to start at the second word, the original author uses modulo so here it is...
        element.text(scope.wordArr[j]);
      }

      element.text(scope.wordArr[0]); // Default start
      stopWord = $interval(updateLoadingText, 3500);

      // listen to DOM destroy (removal) event
      // to prevent updating word after the DOM element was removed.
      element.on('destroy', function() {
        $interval.cancel(stopWord);
      });
    }
}]);
