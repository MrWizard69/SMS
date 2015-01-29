var app = angular.module("newA", ["firebase",'ngRoute']);

app.config(['$routeProvider', function($routeProvider){ //these are the different views
	$routeProvider
	.when('/',{
		controller:'ArticleCtrlr',
		templateUrl:'views/home.html'//home page
	})
	.when("/admin",{
        templateUrl:"views/admin.html",//newsroom page
        controller:"ArticleCtrlr"})
    .when("/add",{
        templateUrl:"views/add_article.html",//add article page
        controller:"ArticleCtrlr"})
    .otherwise({redirectTo:"/"});//if any other address is typed in, go back home
    
}]);

app.run(['$rootScope','$firebase','$firebaseAuth', function ($rootScope,$firebase,$firebaseAuth) {//this function will log a user into facebook
  
  var ref = new Firebase("https://brilliant-torch-737.firebaseio.com/");//my firebase

  $rootScope.authObj = $firebaseAuth(ref);
  
  $rootScope.authObj.$onAuth(function(data)
  {
    console.log('data',data);//displays information about the user logged in
    $rootScope.currentUser = data;//saves the current user into data
    if(data)
    {
      var url = 'https://brilliant-torch-737.firebaseio.com/users/'+data.uid;//puts the user's id into the 'users' section
      var ref = new Firebase(url);
      $rootScope.user = $firebase(ref).$asObject();
    }

  });

}]);

app.controller("ArticleCtrlr", ['$rootScope','$scope', '$firebase' , '$location', '$filter','$http', function($rootScope,$scope, $firebase, $location, $filter, $http) {//The heart of the app
  var ref = new Firebase("https://brilliant-torch-737.firebaseio.com/"); //my firebase
  var sync = $firebase(ref);
  $scope.messages = sync.$asArray(); //makes an array for messages
  $scope.newMessage = {};//makes newMessage into an object
  $scope.newMessage.author = $rootScope.currentUser.facebook.cachedUserProfile.name; //this makes the current user's facebook name the default name as the author
  
  $scope.addMessage = function() {
  	var today = new Date();//automatically puts todays date in each new article
  	
  	$scope.newMessage.date = $filter('date')(today);//this formats the date
  	$scope.messages.$add($scope.newMessage); //This assembles the different parts of each newMessage and puts it onto the server and the site
  	$location.path('/');//after the article has been posted the user is directed back to the home page
  }
  $scope.selected = true;
  
  
importio.init({//this is how the api gets the information it needs to get current news stories
      "auth": {
        "userGuid": "afa41af4-24e1-4135-9be1-54ca5b56c077",//this is my user id
        "apiKey": "mDrbiMOrEXUxHogIkqCNnhkTsjZ7FFVTb4s+BMziB/Y++TnUw4ekLn0qotRL7V8fG375ebYKH2rTZ4M5DVZa8w=="//and my api key for the site
      },
      "host": "import.io"
    });

	$http.get('https://api.import.io/store/data/987e6f66-ce52-477e-8766-efa9abfdb15e/_query?input/webpage/url=http%3A%2F%2Fmashable.com%2F&_user=afa41af4-24e1-4135-9be1-54ca5b56c077&_apikey=mDrbiMOrEXUxHogIkqCNnhkTsjZ7FFVTb4s%2BBMziB%2FY%2B%2BTnUw4ekLn0qotRL7V8fG375ebYKH2rTZ4M5DVZa8w%3D%3D').
	  success(function(data, status, headers, config) {
	    $scope.mashable = data.results;//the information will display if the connection was successful 
	    console.log("Import.io Data: ", $scope.mashable);//shows the different parts of the data
	  }).
	  error(function(data, status, headers, config) {//You get an error message if the connection wasn't successful
	    // called asynchronously if an error occurs
	    // or server returns response with an error status.

	});
  	
	


  	
  
}]);

// app.controller('LoginCtrlr', ['$scope', '$firebaseAuth', function ($scope,$firebaseAuth) {
// 
// 
// 
// }]);
