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

app.controller("ArticleCtrlr", ['$rootScope','$scope', '$firebase' , '$location', '$filter', function($rootScope,$scope, $firebase, $location, $filter) {
  var ref = new Firebase("https://brilliant-torch-737.firebaseio.com/");
  var sync = $firebase(ref);
  $scope.messages = sync.$asArray();
  $scope.newMessage = {};
  $scope.newMessage.author = $rootScope.currentUser.facebook.cachedUserProfile.name;
 
  //$scope.newMessage.author = currentUser.facebook.cachedUserProfile.name;
  
  $scope.addMessage = function() {
  	var today = new Date();
  	
  	$scope.newMessage.date = $filter('date')(today);
  	//console.log("WHOLE THANG", $scope.newMessage);
  	$scope.messages.$add($scope.newMessage);
  	$location.path('/');
  }
  $scope.selected = true;
  	
  	
  var ref = new Firebase("https://hacker-news.firebaseio.com/v0/");
var itemRef;

ref.child('topstories').child(0).on('value', function(snapshot) {
	if(itemRef) {
		itemRef.off();
	}

	//Get the ID of the top article
	var id = snapshot.val();

	//Get the article details and update in realtime
	itemRef = ref.child('item').child(id);
	itemRef.on('value', function(snapshot) {			
		
        
        var item = snapshot.val();
		//document.getElementById("score").innerHTML = item.score;

		var anchor = document.getElementById("article_a");
		anchor.innerHTML = item.title;
		anchor.href = item.url;

		document.getElementById("comments_a").href = "https://news.ycombinator.com/item?id=" + 'item.id';
        
	});		
});


  	
  
}]);

// app.controller('LoginCtrlr', ['$scope', '$firebaseAuth', function ($scope,$firebaseAuth) {
// 
// 
// 
// }]);
