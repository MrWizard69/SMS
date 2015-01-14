var app = angular.module("newA", ["firebase",'ngRoute']);

app.config(['$routeProvider', function($routeProvider){
	$routeProvider
	.when('/',{
		controller:'ArticleCtrlr',
		templateUrl:'views/home.html'
	})
	.when("/admin",{
        templateUrl:"views/admin.html",
        controller:"ArticleCtrlr"})
    .when("/add",{
        templateUrl:"views/add_article.html",
        controller:"ArticleCtrlr"})
    .otherwise({redirectTo:"/"});
    
}]);

app.controller("ArticleCtrlr", ['$scope', '$firebase' , '$location', '$filter', function($scope, $firebase, $location, $filter) {
  var ref = new Firebase("https://brilliant-torch-737.firebaseio.com/");
  var sync = $firebase(ref);
  $scope.messages = sync.$asArray();
  // $scope.newMessage = {};
//   $scope.newMessage.date = new Date();
  
  $scope.addMessage = function() {
  	var today = new Date();
  	// var snap = today.toString();
  	$scope.newMessage.date = $filter('date')(today);
  	console.log("WHOLE THANG", $scope.newMessage);
  	$scope.messages.$add($scope.newMessage);
  	$location.path('/');
  }
}]);

