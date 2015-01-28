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

app.run(['$rootScope','$firebase','$firebaseAuth', function ($rootScope,$firebase,$firebaseAuth) {
  
  var ref = new Firebase("https://brilliant-torch-737.firebaseio.com/");

  $rootScope.authObj = $firebaseAuth(ref);
  
  $rootScope.authObj.$onAuth(function(data)
  {
    console.log('data',data);
    $rootScope.currentUser = data;
    if(data)
    {
      var url = 'https://brilliant-torch-737.firebaseio.com/users/'+data.uid;
      var ref = new Firebase(url);
      $rootScope.user = $firebase(ref).$asObject();
    }

  });

}]);

app.controller("ArticleCtrlr", ['$rootScope','$scope', '$firebase' , '$location', '$filter','$http', function($rootScope,$scope, $firebase, $location, $filter, $http) {
  var ref = new Firebase("https://brilliant-torch-737.firebaseio.com/");
  var sync = $firebase(ref);
  $scope.messages = sync.$asArray();
  $scope.newMessage = {};
  //console.log("User name ", $rootScope.currentUser);
//   console.log("User name ", $rootScope.currentUser.facebook.cachedUserProfile.name);
  // if ($rootScope.currentUser == null){
//   	console.log("sign in!!!");
//   }else{
//   $scope.newMessage.author = $rootScope.currentUser.facebook.cachedUserProfile.name;
//   }
	$scope.newMessage.author = $rootScope.currentUser.facebook.cachedUserProfile.name;
  
  $scope.addMessage = function() {
  	var today = new Date();
  	
  	$scope.newMessage.date = $filter('date')(today);
  	//console.log("WHOLE THANG", $scope.newMessage);
  	$scope.messages.$add($scope.newMessage);
  	$location.path('/');
  }
  $scope.selected = true;
  
  
importio.init({
      "auth": {
        "userGuid": "afa41af4-24e1-4135-9be1-54ca5b56c077",
        "apiKey": "mDrbiMOrEXUxHogIkqCNnhkTsjZ7FFVTb4s+BMziB/Y++TnUw4ekLn0qotRL7V8fG375ebYKH2rTZ4M5DVZa8w=="
      },
      "host": "import.io"
    });

	$http.get('https://api.import.io/store/data/987e6f66-ce52-477e-8766-efa9abfdb15e/_query?input/webpage/url=http%3A%2F%2Fmashable.com%2F&_user=afa41af4-24e1-4135-9be1-54ca5b56c077&_apikey=mDrbiMOrEXUxHogIkqCNnhkTsjZ7FFVTb4s%2BBMziB%2FY%2B%2BTnUw4ekLn0qotRL7V8fG375ebYKH2rTZ4M5DVZa8w%3D%3D').
	  success(function(data, status, headers, config) {
	    $scope.mashable = data.results;
	    console.log("Import.io Data: ", $scope.mashable);
	  }).
	  error(function(data, status, headers, config) {
	    // called asynchronously if an error occurs
	    // or server returns response with an error status.
	    console.log("FAREALZ");
	    // console.error("Import.io Data?: ", data);
	    // console.error("Import.io Status: ", status);
	    // console.error("Import.io Header: ", headers);
	    // console.error("Import.io Config: ", config);
	});
  	

	// var apiURL = "https://api.import.io/store/data/22240d37-57b6-44c5-bc59-a1c0826ba66c/_query?input/webpage/url=http%3A%2F%2Fwww.nytimes.com%2F&_user=91b071cb-2c94-4dcd-a0e6-1ba9ecec6488&_apikey=";
// 	var json = JSON.parse(apiURL);
// 	
// 	for(i=0; i < 3; i++){
// 		var story = [];
//     	story += "<a href="+ json.results[i].link_1 +">"+ json.results[i].link_1/_text +"</a>";
//         console.log(story);
//     }
	


  	
  
}]);

// app.controller('LoginCtrlr', ['$scope', '$firebaseAuth', function ($scope,$firebaseAuth) {
// 
// 
// 
// }]);
